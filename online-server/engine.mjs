import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';

const html = fs.readFileSync(new URL('../合掌网页版-正式版本存档/合掌网页版v2.5.8.2.html', import.meta.url), 'utf8');
const source = html.slice(html.indexOf('<script>') + 8, html.lastIndexOf('\ninit();'));
export const sourceHash = crypto.createHash('sha256').update(html).digest('hex');

// Only UI prompts are adapted. Combat, skill timing and damage code stay intact.
// Every replacement is bounded to a named function and fails closed on drift.
const routes = {
  chooseUse258:'actor', initNightMp258:'night', audienceMp258:'actor',
  assignInitialMpDolls:'diviner', chooseMpTargetInteractive:'actor', activateMpSkill:'h',
  applyHangedBoost:'attacker', chooseMpDefenseHelpers:'fighter', chooseMpVolunteers:'fighter',
  resolveMpMagicianChain:'magician', chooseMpRpsGesture:'f', wantsMpJudge:'judge', chooseMpJudgeOpponent:'judge'
};
function adapt(script) {
  for(const [name,actor] of Object.entries(routes)) {
    const re = new RegExp(`((?:async )?function ${name}\\([^]*?)(?=\\n(?:async )?function |$)`);
    let count = 0;
    script = script.replace(re, block => block.replace(/chooseMpOption\(/g, () => {count++;return `__ask(${actor},`;}));
    if(!count) throw new Error('联机交互适配失效：'+name);
  }
  const replace = (from,to) => {if(!script.includes(from))throw new Error('联机交互边界变化：'+from);script=script.replace(from,to);};
  replace('chooseMpOption("窥秘人：','__ask(keeper,"窥秘人：');
  replace('chooseMpOption("母亲：','__ask(f,"母亲：');
  replace('chooseMpOption(`${f.name}·猎人：','__ask(f,`${f.name}·猎人：');
  replace('chooseMpOption(`占卜家：是否将当前秘偶','__ask(diviner,`占卜家：是否将当前秘偶');
  return script;
}
const adapted = adapt(source);
const overrides = `
render=()=>{};renderMp=()=>{};renderMpJudgeDuel=()=>{};showToast=()=>{};beat=async()=>{};
showMonsterRpsResult=async()=>{};showMpGameOver=()=>{};scheduleMpAutoPlay=()=>{};
chooseMpOption=()=>{throw Error('发现未指定玩家的联机交互');};
getHuman=()=>mpState.fighters[__actor];
chooseMpJudgeDuelAction=async(side,title)=>{
  const legal=MOVE_KEYS.filter(key=>key!=='scissors'&&MOVES[key].cost<=side.energy);
  if(!side.fighter.human)return chooseMpJudgeAiMove({...side.fighter,energy:side.energy});
  return __ask(side.fighter,title+'（当前'+side.energy+'锻）',legal.map(value=>({value,label:MOVES[value].name+' · '+MOVES[value].cost+'锻'})),{required:true});
};
// The offline winner banner speaks from slot 0; online exposes the winning team.
checkMpWinner=()=>{
  const teams=[...new Set(aliveMp().map(f=>f.team))];
  if(teams.length>1)return false;
  if(!mpState.over)logMp(teams.length?'阵营'+(teams[0]+1)+'获胜':'所有阵营同时淘汰，平局','hit');
  mpState.over=true;mpState.winnerTeam=teams.length?teams[0]:null;return true;
};
globalThis.api={
  roles:SKILLS,
  async start(config){
    data.settings.difficulty=config.difficulty||'normal';
    const requested=config.players.map(p=>p.role),valid=validateMpRoleSelection(requested,requested.length);
    if(!valid.ok)throw Error(valid.message);
    const roles=assignUniqueMpSkills(requested);
    mpState={format:deriveMpFormat(config.teamCount,config.teamSize),targetRule:'global',teamCount:config.teamCount,teamSize:config.teamSize,
      fighters:config.players.map((p,i)=>({...createMpFighter(i,Math.floor(i/config.teamSize),!p.bot,roles[i]),name:p.name})),
      scene:'paper',round:1,step:1,log:[],over:false,pendingSkill:null,weaponHistory:[],fieldDeclarations:[],fieldConflict:false,
      spectator:{paused:true,speed:1},global:{friendlyFireTeams:new Set(),multiHitTeams:new Set(),disabledSkillTeams:new Set(),damageReductionTeams:new Map()}};
    await assignInitialMpDolls();await beginMpRound(true);
  },
  state:()=>mpState,
  active:()=>aliveMp().filter(f=>!f.skipped).map(f=>f.id),
  moves:id=>mpLegalMoves(mpState.fighters[id]),
  skills:id=>getMpActiveActions(mpState.fighters[id]),
  bots(){const world=createMpAiWorld();return world.active.filter(f=>!f.human).map(f=>[f.id,chooseMpAiMove(f,world)]);},
  async skill(id,key){__actor=id;await activateMpSkill(key);},
  async resolve(entries){await MULTIPLAYER_ENGINE.resolveActions(new Map(entries));},
  snapshot:()=>captureMpTransaction(),
  restore:snapshot=>restoreMpTransaction(snapshot)
};
`;

export function createEngine(ask, random = Math.random) {
  const node = () => ({innerHTML:'',textContent:'',value:'2',open:false,children:[],style:{setProperty(){}},classList:{add(){},remove(){},toggle(){}},addEventListener(){},removeEventListener(){},showModal(){this.open=true;},close(){this.open=false;},querySelectorAll(){return[];},querySelector(){return node();}});
  const nodes = new Map();
  const document = {getElementById(id){if(!nodes.has(id))nodes.set(id,node());return nodes.get(id);},querySelectorAll(){return[];},documentElement:node(),body:node()};
  const context = vm.createContext({console,document,navigator:{},localStorage:{getItem(){return null;},setItem(){}},structuredClone,
    setTimeout,clearTimeout,setInterval,clearInterval,performance,Math:Object.assign(Object.create(Math),{random}),__actor:0,
    __ask(actor,title,options,meta={}) {
      if(!actor || !Number.isInteger(actor.id))throw new Error('技能交互缺少玩家归属');
      return ask(actor.id,title,JSON.parse(JSON.stringify(options)),{...meta,required:meta.required||meta.cancelText==='必须选择一个手势'});
    }});
  vm.runInContext(adapted + '\n' + overrides,context,{timeout:5000});
  return context.api;
}

export function encode(value) {
  return JSON.parse(JSON.stringify(value,(key,v)=>{
    if(Object.prototype.toString.call(v)==='[object Set]')return {$set:[...v]};
    if(Object.prototype.toString.call(v)==='[object Map]')return {$map:[...v]};
    return v;
  }));
}
