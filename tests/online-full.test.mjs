import test from 'node:test';
import assert from 'node:assert/strict';
import {createEngine} from '../online-server/engine.mjs';
import {Rooms} from '../online-server/rooms.mjs';
import {createServer} from '../online-server/server.mjs';
const tick=()=>new Promise(r=>setImmediate(r));
let serial=0;
const cmd=(service,code,secret,action,body={})=>service.command(code,secret,{action,turn:service.room(code).turn,requestId:'test-command-'+(++serial),...body});
async function declineVolunteers(service,code,tokens){
  for(let n=0;n<20;n++){
    await tick();const r=service.room(code),q=[...r.prompts.values()].find(q=>q.title.startsWith('主动承受'));
    if(!q)return;await cmd(service,code,tokens[q.playerId],'answer',{promptId:q.id,value:'no'});
  }
  throw Error('过多主动承受提示');
}
async function setup(roles=['none','none'],teamCount=roles.length,teamSize=1) {
  const service=new Rooms();
  const first=service.create({name:'玩家1',role:roles[0],teamCount,teamSize}),code=first.room.code,tokens=[first.token];
  for(let i=1;i<roles.length;i++)tokens.push(service.join(code,{name:'玩家'+(i+1),role:roles[i]}).token);
  await cmd(service,code,tokens[0],'start');await tick();return {service,code,tokens,r:service.room(code)};
}
test('全角色引擎载入并由所属真人接收开局选择',async()=>{
  const asks=[];const engine=createEngine(async(id,title,options)=>{asks.push({id,title});return options[0]?.value??null;});
  await engine.start({teamCount:2,teamSize:1,players:[{name:'甲',role:'diviner'},{name:'乙',role:'secretKeeper'}]});
  assert.equal(Object.keys(engine.roles).length,39);
  assert.ok(asks.some(p=>p.id===0&&p.title.includes('秘偶')));
  assert.ok(asks.some(p=>p.id===1&&p.title.includes('窥秘')));
});
test('38角色分别由真人控制，完成攻击与受击流程',async()=>{
  const roleKeys=Object.keys(createEngine(()=>null).roles).filter(k=>k!=='none');
  for(const role of roleKeys) {
    const engine=createEngine(async(id,title,options)=>{
      if(title.includes('手势'))return title.includes('受击者')?'布':'石头';
      return options.find(o=>['no','skip','keep'].includes(o.value))?.value??null;
    });
    await engine.start({teamCount:2,teamSize:1,players:[{name:'角色',role},{name:'对手',role:'none'}]});
    const state=engine.state();state.fighters.forEach(f=>f.energy=8);
    const move=engine.moves(0).includes('knife')?'knife':engine.moves(0)[0];
    await engine.resolve([[0,move],[1,'forge']]);
    if(!state.over){state.fighters.forEach(f=>f.energy=8);await engine.resolve([[0,engine.moves(0).includes('forge')?'forge':'guard'],[1,'void']]);}
    for(const f of state.fighters){assert.ok(Number.isFinite(f.energy),role);assert.ok(Number.isFinite(f.hp),role);}
  }
});

test('每个角色的开局主动操作交给其本人，执行后状态有效',async()=>{
  const roles=Object.keys(createEngine(()=>null).roles).filter(k=>k!=='none');
  let checked=0;
  for(const role of roles) {
    const prompts=[];
    const engine=createEngine(async(id,title,options)=>{prompts.push(id);return options[0]?.value??null;});
    await engine.start({teamCount:2,teamSize:1,players:[{name:'旁观玩家',role:'none'},{name:'技能玩家',role}]});
    const actions=Array.from(engine.skills(1),([key])=>key);
    for(const key of actions){
      if(!engine.skills(1).some(([k])=>k===key))continue;
      await engine.skill(1,key);checked++;
      for(const f of engine.state().fighters){assert.ok(Number.isFinite(f.hp),role+'/'+key);assert.ok(Number.isFinite(f.energy),role+'/'+key);}
    }
    assert.ok(prompts.every(id=>id===1),'交互不得发给默认一号位：'+role);
  }
  assert.ok(checked>=15,'应覆盖足够多的主动技能分支');
});

test('十二名真人同步结算，持原凭据重连，房主可以结束房间',async()=>{
  const {service,code,tokens,r}=await setup(Array(12).fill('none'),3,4);
  assert.throws(()=>service.join(code,{name:'第十三人',role:'none'}),/开始|满/);
  for(const secret of tokens)await cmd(service,code,secret,'ready');
  for(const secret of tokens)await cmd(service,code,secret,'move',{move:'forge'});
  await tick();
  assert.equal(r.turn,2);assert.deepEqual(Array.from(r.engine.state().fighters,f=>f.energy),Array(12).fill(1));
  const {p}=service.auth(code,tokens[7]);assert.equal(p.id,7);assert.equal(service.view(r,p.id).turn,2);
  await assert.rejects(cmd(service,code,tokens[7],'close'),/房主/);
  await cmd(service,code,tokens[0],'close');assert.throws(()=>service.auth(code,tokens[7]),/不存在/);
});

test('真人主动技能改变属性后清除其他人的准备状态',async()=>{
  const {service,code,tokens,r}=await setup(['none','tyrant']);
  await cmd(service,code,tokens[0],'ready');assert.equal(r.ready.has(0),true);
  await cmd(service,code,tokens[1],'skill',{skill:'tyrant'});await tick();
  assert.equal(r.ready.size,0);assert.equal(r.engine.state().fighters[1].hp,1);
  assert.equal(service.view(r,0).canReady,true);assert.equal(r.stage,'prepare');
});
test('房间秘招隔离、重复提交、旧回合请求、重开归零',async()=>{
  const {service,code,tokens,r}=await setup();
  await cmd(service,code,tokens[0],'ready');await cmd(service,code,tokens[1],'ready');
  const b={action:'move',turn:r.turn,move:'forge',requestId:'retry-move-0001'};
  await service.command(code,tokens[0],b);await service.command(code,tokens[0],b);
  const other=JSON.stringify(service.view(r,1));assert.ok(!other.includes('"move":"forge"'));assert.equal(r.moves.size,1);
  await cmd(service,code,tokens[1],'move',{move:'forge'});await tick();assert.equal(r.engine.state().fighters[0].energy,1);
  await assert.rejects(cmd(service,code,tokens[0],'ready',{turn:1}),/更新/);
  await cmd(service,code,tokens[0],'ready');await cmd(service,code,tokens[1],'ready');
  await cmd(service,code,tokens[0],'move',{move:'knife'});await cmd(service,code,tokens[1],'move',{move:'forge'});await declineVolunteers(service,code,tokens);
  assert.deepEqual(Array.from(r.engine.state().fighters,f=>f.energy),[0,0]);assert.equal(r.engine.state().fighters[1].hp,1);
});
test('帮接问题只发给帮助者，非本人无法代选，成功后全员清锻',async()=>{
  const {service,code,tokens,r}=await setup(['none','none','none','none'],2,2);
  r.engine.state().fighters.forEach(f=>f.energy=6);
  for(const t of tokens)await cmd(service,code,t,'ready');
  for(const [i,move] of ['forge','catch','katana','guard'].entries())await cmd(service,code,tokens[i],'move',{move});
  await tick();const prompt=service.view(r,1).prompts.find(p=>p.title.includes('帮助防御'));
  assert.ok(prompt);assert.equal(service.view(r,0).prompts.length,0);
  await assert.rejects(cmd(service,code,tokens[0],'answer',{promptId:prompt.id,value:'yes'}),/不属于/);
  await cmd(service,code,tokens[1],'answer',{promptId:prompt.id,value:'yes'});await tick();
  assert.deepEqual(Array.from(r.engine.state().fighters,f=>f.energy),[0,0,0,0]);assert.equal(r.engine.state().round,2);
});
test('技能必须可用，发动后重新准备，猜拳双方选择不泄露',async()=>{
  const {service,code,tokens,r}=await setup(['monster','none']);
  await assert.rejects(cmd(service,code,tokens[1],'skill',{skill:'thief'}),/不可用/);
  r.engine.state().fighters.forEach(f=>f.energy=1);
  for(const t of tokens)await cmd(service,code,t,'ready');
  await cmd(service,code,tokens[0],'move',{move:'forge'});await cmd(service,code,tokens[1],'move',{move:'knife'});await declineVolunteers(service,code,tokens);
  const q1=service.view(r,0).prompts[0];assert.ok(q1);await cmd(service,code,tokens[0],'answer',{promptId:q1.id,value:'石头'});await tick();
  const v2=service.view(r,1);assert.equal(v2.prompts.length,1);assert.ok(!JSON.stringify(v2.game.log).includes('出石头'));
  await cmd(service,code,tokens[1],'answer',{promptId:v2.prompts[0].id,value:'剪刀'});await tick();
  assert.equal(r.engine.state().fighters[0].hp,2);
});
test('HTTP实际双客户端鉴权与非法访问',async()=>{
  const {server}=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));
  try {
    const base='http://127.0.0.1:'+server.address().port;
    const create=await fetch(base+'/rooms',{method:'POST',body:JSON.stringify({name:'甲'})}).then(r=>r.json());
    assert.equal(create.ok,true);const {token,room}=create.result;
    const bad=await fetch(base+'/rooms/'+room.code).then(r=>r.json());assert.equal(bad.ok,false);
    const good=await fetch(base+'/rooms/'+room.code,{headers:{authorization:'Bearer '+token}}).then(r=>r.json());assert.equal(good.result.you,0);
  }finally{await new Promise(r=>server.close(r));}
});
