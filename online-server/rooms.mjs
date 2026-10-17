import crypto from 'node:crypto';
import {createEngine,encode,sourceHash} from './engine.mjs';
const token = () => crypto.randomBytes(24).toString('base64url');
const validName = name => typeof name==='string' && /^[\p{L}\p{N} _·-]{1,16}$/u.test(name.trim());
const assert = (value,message) => {if(!value)throw Error(message);};
const roles = createEngine(()=>null).roles;

export class Rooms {
  constructor(){this.rooms=new Map();}
  create({name,teamCount=2,teamSize=1,role='random'}) {
    assert(this.rooms.size<100,'测试服务房间已满');
    assert(Number.isInteger(teamCount)&&teamCount>=2&&teamCount<=6&&Number.isInteger(teamSize)&&teamSize>=1&&teamSize<=4&&teamSize*teamCount<=12,'队伍设置不合法');
    let code;do{code=String(crypto.randomInt(100000,1000000));}while(this.rooms.has(code));
    const room={code,teamCount,teamSize,players:[],stage:'lobby',turn:1,ready:new Set(),moves:new Map(),prompts:new Map(),requests:new Map(),task:null,error:null,updated:Date.now()};
    this.rooms.set(code,room);
    try {return this.join(code,{name,role});}catch(e){this.rooms.delete(code);throw e;}
  }
  join(code,{name,role='random'}) {
    const r=this.room(code);assert(r.stage==='lobby','对局已开始');
    assert(validName(name),'昵称仅支持1—16个汉字、字母、数字、空格和短横线');
    assert(r.players.length<r.teamCount*r.teamSize,'房间已满');
    assert(role==='random'||Object.hasOwn(roles,role),'角色不存在');
    assert(['random','none'].includes(role)||!r.players.some(p=>p.role===role),'该角色已被选择');
    const p={id:r.players.length,name:name.trim(),role,token:token(),bot:false};r.players.push(p);
    return {token:p.token,room:this.view(r,p.id)};
  }
  room(code){const r=this.rooms.get(String(code));assert(r,'房间不存在或已过期');return r;}
  auth(code,secret){const r=this.room(code),p=r.players.find(p=>p.token===secret&&!p.bot);assert(p,'身份凭据无效');r.updated=Date.now();return {r,p};}
  async command(code,secret,body) {
    const {r,p}=this.auth(code,secret);
    assert(typeof body.requestId==='string'&&/^[\w-]{8,80}$/.test(body.requestId),'请求编号无效');
    const reqKey=p.id+':'+body.requestId;
    const signature=JSON.stringify([body.action,body.turn,body.move,body.skill,body.promptId,body.value]);
    if(r.requests.has(reqKey)){assert(r.requests.get(reqKey)===signature,'重复请求编号对应不同操作');return this.view(r,p.id);}
    if(body.action==='answer') {
      const pending=r.prompts.get(body.promptId);assert(pending&&pending.playerId===p.id,'选择已失效或不属于你');
      assert(body.value===null&&!pending.required||pending.options.some(o=>o.value===body.value),'选择不合法');
      r.prompts.delete(body.promptId);pending.resolve(body.value);
    } else if(body.action==='close') {
      assert(p.id===0,'只有房主可以关闭房间');this.close(r);return {closed:true};
    } else {
      assert(!r.task,'正在等待技能选择或结算，请稍后');
      assert(body.turn===r.turn,'出手已更新，请刷新后重试');
      if(body.action==='start') {
        assert(p.id===0&&r.stage==='lobby','只有房主可从等待大厅开局');
        assert(r.players.length>=2,'至少需要两名真人加入');
        const full=r.teamCount*r.teamSize;
        while(r.players.length<full)r.players.push({id:r.players.length,name:'AI '+(r.players.length+1),role:'random',bot:true});
        r.engine=createEngine((...args)=>this.ask(r,...args));
        this.run(r,()=>r.engine.start(r),()=>this.prepare(r));
      } else if(body.action==='skill') {
        assert(r.stage==='prepare'&&!r.ready.has(p.id),'已准备或不在技能准备阶段');
        assert(r.engine.active().includes(p.id),'你当前不能发动技能');
        assert(r.engine.skills(p.id).some(([key])=>key===body.skill),'技能不可用');
        // A successful skill can change other players' resources or eligibility.
        r.ready.clear();
        this.run(r,()=>r.engine.skill(p.id,body.skill),()=>{if(r.engine.state().over)r.stage='over';});
      } else if(body.action==='ready') {
        assert(r.stage==='prepare','当前不在准备阶段');assert(r.engine.active().includes(p.id),'你当前无需出手');
        r.ready.add(p.id);this.maybeChoose(r);
      } else if(body.action==='move') {
        assert(r.stage==='choose','尚未全员准备');assert(r.engine.active().includes(p.id),'你当前不能出手');
        assert(!r.moves.has(p.id),'本次行动已经锁定');
        assert(r.engine.moves(p.id).includes(body.move),'锻数不足或行动不可用');
        r.moves.set(p.id,body.move);
        if(r.engine.active().every(id=>r.moves.has(id))) {
          const entries=[...r.moves];r.stage='resolving';
          this.run(r,()=>r.engine.resolve(entries),()=>{r.turn++;this.prepare(r);});
        }
      } else throw Error('未知操作');
    }
    r.requests.set(reqKey,signature);
    if(r.requests.size>1000)r.requests.delete(r.requests.keys().next().value);
    return this.view(r,p.id);
  }
  ask(r,playerId,title,options,meta={}) {
    const p=r.players[playerId];assert(p&&!p.bot,'问题没有对应真人');
    const id=token();
    return new Promise((resolve,reject)=>{r.prompts.set(id,{id,playerId,title,options,required:!!meta.required,cancelText:meta.cancelText||'取消',resolve,reject});});
  }
  run(r,work,done) {
    const task=Promise.resolve().then(work).then(()=>{done();}).catch(error=>{r.stage='error';r.error='结算已暂停：'+error.message;console.error('房间结算异常',r.code,error);}).finally(()=>{if(r.task===task)r.task=null;});
    r.task=task;
  }
  prepare(r) {
    r.moves.clear();r.ready.clear();r.stage=r.engine.state().over?'over':'prepare';
    if(r.stage==='prepare')this.maybeChoose(r);
  }
  maybeChoose(r) {
    if(!r.engine.active().filter(id=>!r.players[id].bot).every(id=>r.ready.has(id)))return;
    r.stage='choose';r.moves=new Map(r.engine.bots());
    // A human may be eliminated or retired; let remaining bots complete the step.
    if(r.engine.active().every(id=>r.moves.has(id))) {
      const entries=[...r.moves];r.stage='resolving';
      // Schedule after the current task releases its lock.
      setTimeout(()=>{if(this.rooms.has(r.code))this.run(r,()=>r.engine.resolve(entries),()=>{r.turn++;this.prepare(r);});},20);
    }
  }
  view(r,id) {
    const state=r.engine?.state();
    let game=null;
    if(state) {
      game=encode({format:state.format,targetRule:'global',teamCount:r.teamCount,teamSize:r.teamSize,round:state.round,step:state.step,phase:state.phase,
        over:state.over,winnerTeam:state.winnerTeam,global:state.global,weaponHistory:state.weaponHistory,fieldDeclarations:state.fieldDeclarations,fieldConflict:state.fieldConflict,
        spectator:{paused:true,speed:1},fighters:state.fighters.map(f=>{const clean={...f};delete clean.judgeMove;delete clean.monsterGesture;if(f.id!==id)delete clean.magicianTarget;return clean;}),
        log:state.log.slice(0,150).map(item=>({text:item.text,kind:item.kind}))});
    }
    const playable=state&&!state.over&&r.engine.active().includes(id);
    return {code:r.code,you:id,teamCount:r.teamCount,teamSize:r.teamSize,stage:r.stage,turn:r.turn,busy:!!r.task,error:r.error,sourceHash,
      players:r.players.map(({id,name,role,bot})=>({id,name,role,bot,team:Math.floor(id/r.teamSize),ready:r.ready.has(id),submitted:r.moves.has(id)})),
      game,moves:playable&&r.stage==='choose'&&!r.moves.has(id)?Array.from(r.engine.moves(id)):[],
      skills:playable&&r.stage==='prepare'&&!r.ready.has(id)&&!r.task?encode(r.engine.skills(id)):[],
      canReady:!!(playable&&r.stage==='prepare'&&!r.ready.has(id)&&!r.task),
      prompts:[...r.prompts.values()].filter(q=>q.playerId===id).map(({resolve,reject,...q})=>q),waitingFor:[...r.prompts.values()].map(q=>r.players[q.playerId].name)};
  }
  close(r) {this.rooms.delete(r.code);r.stage='closed';for(const p of r.prompts.values())p.reject(Error('房间已关闭'));r.prompts.clear();}
  prune(now=Date.now()){for(const r of this.rooms.values())if(now-r.updated>2*60*60*1000)this.close(r);}
}
