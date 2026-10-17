const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const storage=new Map(),errors=[];
global.wx={getSystemInfoSync:()=>({pixelRatio:2,windowWidth:390,windowHeight:844,platform:'devtools',system:'Windows'}),
  getStorageInfoSync:()=>({keys:[...storage.keys()]}),getStorageSync:k=>storage.get(k),setStorageSync:(k,v)=>storage.set(k,v),
  pageScrollTo(){},getPerformance:()=>performance,
  request(o){fetch(o.url,{method:o.method,headers:o.header,body:o.method==='GET'?undefined:JSON.stringify(o.data)})
    .then(async r=>o.success({statusCode:r.status,data:await r.json()})).catch(o.fail);}};
const mp=require('miniprogram-render'),config=require(path.join(root,'wechat-minigame/config.js'));
const boot=require(path.join(root,'wechat-minigame/common/full.js'));
const delay=ms=>new Promise(r=>setTimeout(r,ms));
async function until(fn,label){for(let i=0;i<300;i++){if(fn())return;await delay(20);}throw Error('等待失败：'+label);}
function click(c,selector){const el=c.document.querySelector(selector);assert.ok(el,selector);el.dispatchEvent(new c.window.CustomEvent('click',{bubbles:true}));}
(async()=>{
  const {createServer}=await import('../../online-server/server.mjs');const {server,rooms}=createServer();
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port;
  const clients=[];
  try{
    for(let i=0;i<2;i++){
      const c=mp.createPage('pages/full/index',config);clients.push(c);boot(c.window,c.document);await c.window.createApp();
      const button=[...c.document.querySelectorAll('button')].find(b=>b.textContent==='真人联机');
      assert.ok(button);button.dispatchEvent(new c.window.CustomEvent('click',{bubbles:true}));
      c.document.getElementById('onlineUrl').value=url;c.document.getElementById('onlineName').value='玩家'+(i+1);
      c.document.getElementById('onlineRole').value='none';
    }
    const [a,b]=clients;click(a,'#onlineCreate');await until(()=>rooms.rooms.size===1,'创建房间');
    const room=[...rooms.rooms.values()][0];
    b.document.getElementById('onlineCode').value=room.code;click(b,'#onlineJoin');await until(()=>room.players.length===2,'加入房间');
    await until(()=>a.document.getElementById('onlineStart'),'开局按钮');click(a,'#onlineStart');
    await until(()=>a.document.getElementById('onlineReady')&&b.document.getElementById('onlineReady'),'双方准备');
    click(a,'#onlineReady');click(b,'#onlineReady');
    await until(()=>clients.every(c=>c.document.querySelector('[data-online-move="forge"]')),'双方出招');
    for(const c of clients)click(c,'[data-online-move="forge"]');
    await until(()=>room.turn===2&&!room.task,'服务端结算');
    await until(()=>clients.every(c=>c.window.__hezhangApp.getMp().fighters[0].energy===1),'客户端同步');
    assert.deepEqual(Array.from(room.engine.state().fighters,f=>f.energy),[1,1]);
    click(a,'#onlineClose');await until(()=>rooms.rooms.size===0,'房主结束房间');
    await until(()=>a.document.getElementById('onlineCreate'),'结束后可创建新房间');
    console.log('两个独立小程序适配环境通过真实HTTP完成建房、加入、准备、同时出招与状态同步');
  }finally{
    for(const c of clients){click(c,'#homeButton');mp.destroyPage(c.pageId);}
    await new Promise(r=>server.close(r));
  }
})().catch(e=>{console.error(e);process.exitCode=1;});
