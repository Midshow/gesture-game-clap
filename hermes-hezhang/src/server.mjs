import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {JsonStore} from "./store.mjs";
import {GameService} from "./game.mjs";

const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const configPath=process.env.HEZHANG_CONFIG||path.join(root,"config.json");
if(!fs.existsSync(configPath)){console.error("缺少config.json；请复制config.example.json并修改adminToken");process.exit(1);}
const config=JSON.parse(fs.readFileSync(configPath,"utf8"));
if(!config.adminToken||config.adminToken.includes("请替换")){console.error("必须在config.json中设置adminToken");process.exit(1);}
const store=new JsonStore(path.resolve(root,config.dataFile||"./data/hezhang-state.json")).load();
const game=new GameService(store,{roomIdleHours:config.roomIdleHours});
const json=(res,status,body)=>{res.writeHead(status,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"});res.end(JSON.stringify(body));};
const read=async req=>{let s="";for await(const chunk of req){s+=chunk;if(s.length>65536)throw new Error("请求过大");}return s?JSON.parse(s):{};};
const server=http.createServer(async(req,res)=>{try{
  if(req.url==="/health")return json(res,200,{ok:true,ruleset:"base-online-v3",rooms:Object.keys(store.state.rooms).length});
  if(req.headers.authorization!==`Bearer ${config.adminToken}`)return json(res,401,{ok:false,error:"未授权"});
  const body=await read(req),parts=req.url.split("?")[0].split("/").filter(Boolean);
  let result;
  if(req.method==="POST"&&req.url==="/rooms")result=await game.create(body);
  else if(req.method==="POST"&&parts[0]==="rooms"&&parts[2]==="join")result=await game.join(parts[1],body);
  else if(req.method==="POST"&&parts[0]==="rooms"&&parts[2]==="start")result=await game.start(parts[1],body.userId);
  else if(req.method==="POST"&&parts[0]==="rooms"&&parts[2]==="submit")result=await game.submit(parts[1],body);
  else if(req.method==="POST"&&parts[0]==="rooms"&&parts[2]==="view")result=game.view(parts[1],body.userId);
  else if(req.method==="GET"&&parts[0]==="rooms"&&parts[2]==="recipients")result=game.recipients(parts[1]);
  else if(req.method==="DELETE"&&parts[0]==="rooms"&&parts.length===2)result=await game.deleteRoom(parts[1],body.userId);
  else if(req.method==="GET"&&parts[0]==="rooms"&&parts.length===1)result=game.listRooms();
  else if(req.method==="GET"&&parts[0]==="rooms"&&parts[2]==="export")result=game.exportRoom(parts[1]);
  else return json(res,404,{ok:false,error:"接口不存在"});
  json(res,200,{ok:true,result});
}catch(error){json(res,400,{ok:false,error:error.message});}});
server.listen(config.port||3217,config.host||"127.0.0.1",()=>console.log(`合掌服务已启动：http://${config.host||"127.0.0.1"}:${config.port||3217}`));
