import http from 'node:http';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {Rooms} from './rooms.mjs';
import {sourceHash} from './engine.mjs';

export function createServer() {
  const rooms=new Rooms(),limits=new Map();
  const send=(res,status,body)=>{res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'});res.end(JSON.stringify(body));};
  const server=http.createServer(async(req,res)=>{
    try {
      const ip=req.socket.remoteAddress,now=Date.now();let rate=limits.get(ip);
      if(!rate||now-rate.time>60000){rate={time:now,count:0};limits.set(ip,rate);}
      if(++rate.count>1800)return send(res,429,{ok:false,error:'请求过于频繁'});
      const url=new URL(req.url,'http://localhost');
      if(req.method==='GET'&&url.pathname==='/health')return send(res,200,{ok:true,rules:'2.5.8.2',sourceHash});
      const parts=url.pathname.split('/').filter(Boolean);
      let body={};
      if(req.method==='POST') {
        let size=0,chunks=[];for await(const c of req){size+=c.length;if(size>16384){send(res,413,{ok:false,error:'请求过大'});return;}chunks.push(c);}
        body=JSON.parse(Buffer.concat(chunks).toString()||'{}');
      }
      let result;
      if(req.method==='POST'&&url.pathname==='/rooms') result=rooms.create(body);
      else if(req.method==='POST'&&parts[0]==='rooms'&&parts[2]==='join')result=rooms.join(parts[1],body);
      else if(parts[0]==='rooms'&&parts.length===2&&req.method==='GET'){
        const {r,p}=rooms.auth(parts[1],req.headers.authorization?.replace(/^Bearer /,''));result=rooms.view(r,p.id);
      } else if(parts[0]==='rooms'&&parts[2]==='command'&&req.method==='POST') result=await rooms.command(parts[1],req.headers.authorization?.replace(/^Bearer /,''),body);
      else return send(res,404,{ok:false,error:'接口不存在'});
      send(res,200,{ok:true,result});
    } catch(error){send(res,400,{ok:false,error:error.message});}
  });
  server.requestTimeout=15000;server.headersTimeout=10000;
  const timer=setInterval(()=>{rooms.prune();const now=Date.now();for(const [ip,r] of limits)if(now-r.time>120000)limits.delete(ip);},60000);timer.unref();
  server.on('close',()=>{clearInterval(timer);for(const r of rooms.rooms.values())rooms.close(r);});
  return {server,rooms};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const host=process.env.HEZHANG_HOST||'127.0.0.1',port=Number(process.env.HEZHANG_PORT||3238);
  createServer().server.listen(port,host,()=>console.log(`合掌全技能联机测试服务：http://${host}:${port}（关闭进程将结束所有房间）`));
}
