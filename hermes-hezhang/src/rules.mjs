import crypto from "node:crypto";

export const MOVES = Object.freeze({
  forge:{name:"锻造",cost:0,kind:"forge"}, defend:{name:"防",cost:0,kind:"defense",covers:[1,2]},
  catch:{name:"接",cost:0,kind:"response",covers:[2,3]}, flash:{name:"闪",cost:2,kind:"response",covers:[2,3,4,5]},
  knife:{name:"小刀",cost:1,kind:"attack",level:1}, katana:{name:"武士刀",cost:2,kind:"attack",level:2},
  scissors:{name:"剪刀",cost:1,kind:"attack",level:1.5,special:"scissors"},
  shuriken:{name:"手里剑",cost:3,kind:"attack",level:3}, kunai:{name:"苦无",cost:4,kind:"attack",level:4},
  dragon:{name:"龙牙",cost:5,kind:"attack",level:5}, void:{name:"虚无",cost:6,kind:"attack",level:6,allTargets:true}
});

export function publicRoom(room){
  const owner=room.players.find(p=>p.id===room.ownerId);
  return {
    id:room.id,status:room.status,round:room.round,step:room.step,ownerName:owner?.name||"房主",
    settings:room.settings,
    players:room.players.map(({name,team,energy,attack,shield,hp,alive,submitted})=>({name,team,energy,attack,shield,hp,alive,submitted:Boolean(submitted)})),
    pending:room.players.filter(p=>p.alive&&!p.submitted).length,
    log:room.log.slice(-50),ruleset:"base-online-v3"
  };
}

export function roomRecipients(room){return room.players.map(({id,name})=>({id,name}));}

function hashSeed(text){return crypto.createHash("sha256").update(text).digest();}
function rng(seed){let i=0;return ()=>{if(i+4>seed.length){seed=hashSeed(seed);i=0;}const v=seed.readUInt32BE(i);i+=4;return v/0x100000000;};}
function shuffled(items,random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const covers=(move,level)=>Array.isArray(move.covers)&&move.covers.includes(level);

export function legalMoves(player,{scissors=true}={}){return Object.entries(MOVES).filter(([key,m])=>(key!=="scissors"||scissors)&&m.cost<=player.energy).map(([key,m])=>({key,name:m.name,cost:m.cost}));}

const scissorsWins=new Set(["knife","katana","shuriken","catch"]);
const scissorsLoses=new Set(["forge","kunai","dragon","void"]);

function damageTarget(attacker,move,victim,hitIds,events){
  hitIds.add(victim.id);
  const configured=Number(attacker.attack),dmg=Number.isFinite(configured)?Math.max(0,configured):1;
  if(dmg>0&&victim.shield>0){victim.shield=Math.max(0,victim.shield-1);events.push(`${attacker.name}的${move.name}命中${victim.name}：被护盾挡下（护盾-1）`);}
  else{victim.hp=Math.max(0,victim.hp-dmg);victim.alive=victim.hp>0;events.push(`${attacker.name}的${move.name}命中${victim.name}：生命-${dmg}${victim.alive?"":`，${victim.name}死亡`}`);}
}

function resolveScissorsDuel(actors,actions,hitIds,events){
  const scissorsActor=actors.find(p=>p.submitted.move==="scissors");
  const opponent=actors.find(p=>p.id!==scissorsActor.id);
  const opponentKey=opponent.submitted.move,opponentMove=actions.get(opponent.id);
  if(opponentKey==="scissors"){events.push("双方剪刀相抵，均不受伤");return false;}
  if(scissorsWins.has(opponentKey)){
    events.push(`剪刀特殊克制${opponentMove.name}`);
    damageTarget(scissorsActor,actions.get(scissorsActor.id),opponent,hitIds,events);
    return true;
  }
  if(scissorsLoses.has(opponentKey)){
    events.push(`${opponentMove.name}特殊克制剪刀`);
    damageTarget(opponent,opponentMove,scissorsActor,hitIds,events);
    return true;
  }
  if(opponentKey==="defend"){events.push(`${opponent.name}以防挡住剪刀，双方均不受伤`);return false;}
  if(opponentKey==="flash"){events.push(`${opponent.name}闪过剪刀：闪成功`);return true;}
  events.push("剪刀特殊判定没有产生命中");
  return false;
}

export function resolveStep(room){
  const actors=room.players.filter(p=>p.alive);
  if(!actors.length||actors.some(p=>!p.submitted))throw new Error("仍有存活玩家未提交行动");
  const seedText=actors.map(p=>`${p.id}:${p.submitted.move}:${p.submitted.nonce}`).sort().join("|")+`|${room.id}|${room.round}|${room.step}`;
  const random=rng(hashSeed(seedText));
  const actions=new Map(); const events=[];
  for(const p of actors){const move=MOVES[p.submitted.move];if(!move)throw new Error(`${p.name}提交了未知行动`);if(p.energy<move.cost)throw new Error(`${p.name}锻数不足`);p.energy-=move.cost;actions.set(p.id,move);events.push(`${p.name}打出${move.name}${move.cost?`，支付${move.cost}锻`:""}`);}
  const attacks=actors.filter(p=>actions.get(p.id).kind==="attack").map(p=>({attacker:p,move:actions.get(p.id)}));
  const hitIds=new Set(); let restart=false;
  const hasScissors=actors.some(p=>p.submitted.move==="scissors");
  if(hasScissors){
    if(room.settings.mode!=="duo"||actors.length!==2)throw new Error("剪刀仅限双人对局");
    if(room.settings.scissors===false)throw new Error("本房间未开启剪刀模式");
    restart=resolveScissorsDuel(actors,actions,hitIds,events);
  }
  const levels=hasScissors?[]:[...new Set(attacks.map(a=>a.move.level))].sort((a,b)=>b-a);
  for(const level of levels){
    const batch=attacks.filter(a=>a.move.level===level);
    const teams=new Set(batch.map(a=>a.attacker.team));
    if(level>=3&&teams.size>=2){events.push(`${level}级抵刀：敌对阵营同时打出同级攻击，本等级全员不受伤`);continue;}
    for(const attack of shuffled(batch,random)){
      let candidates=actors.filter(v=>v.alive&&v.team!==attack.attacker.team&&!hitIds.has(v.id));
      candidates=candidates.filter(v=>{
        const action=actions.get(v.id);
        if(action.kind==="attack"&&action.level>=level){events.push(`${v.name}的攻击动作防御等级覆盖${level}级，排除出候选`);return false;}
        if(action.kind==="defense"&&covers(action,level)){events.push(`${v.name}以防挡住${level}级攻击，不进入候选`);return false;}
        return true;
      });
      if(!candidates.length){events.push(`${attack.attacker.name}的${attack.move.name}没有合法目标`);continue;}
      const targets=attack.move.allTargets?shuffled(candidates,random):[candidates[Math.floor(random()*candidates.length)]];
      for(const victim of targets){
        const response=actions.get(victim.id);
        if(response.kind==="response"&&covers(response,level)){
          events.push(`${victim.name}在平等判刀中被选中，${response.name}成功防住${attack.attacker.name}的${attack.move.name}`);restart=true;continue;
        }
        restart=true;damageTarget(attack.attacker,attack.move,victim,hitIds,events);
      }
    }
  }
  for(const p of actors){if(actions.get(p.id).kind==="forge"){if(hitIds.has(p.id))events.push(`${p.name}锻造时被攻击命中，不获得锻`);else{p.energy+=1;events.push(`${p.name}锻造成功，锻数+1`);}}}
  if(restart){for(const p of room.players.filter(p=>p.alive))p.energy=0;room.round+=1;room.step=1;events.push("发生攻击命中或接／闪成功：重开，存活角色锻数清零");}
  else room.step+=1;
  for(const p of room.players)p.submitted=null;
  const aliveTeams=[...new Set(room.players.filter(p=>p.alive).map(p=>p.team))];
  if(aliveTeams.length<=1){room.status="finished";events.push(aliveTeams.length?`对局结束：队伍${aliveTeams[0]+1}获胜`:"对局结束：平局");}
  room.log.push(...events.map(text=>({at:new Date().toISOString(),text})));
  if(room.log.length>1000)room.log=room.log.slice(-1000);
  return {events,room:publicRoom(room)};
}
