// Strict comparison by default; the explicit flag permits multiplayer policy changes only.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const args=process.argv.slice(2),allowMpAiChanges=args.includes('--allow-multiplayer-ai-changes');
const [before,after]=args.filter(arg=>arg!=='--allow-multiplayer-ai-changes');
if(!before||!after)throw Error('Usage: node tools/check-game-equivalence.cjs before.html after.html');
function load(file){
 const html=fs.readFileSync(file,'utf8'),script=html.slice(html.indexOf('<script>')+8,html.lastIndexOf('</script>'));
 const node=()=>({innerHTML:'',textContent:'',value:'',open:false,children:[],style:{setProperty(){}},classList:{add(){},remove(){},toggle(){}},addEventListener(){},removeEventListener(){},showModal(){this.open=true;},close(){this.open=false;},querySelectorAll(){return[];},querySelector(){return node();}});
 const nodes=new Map(),document={getElementById(id){if(!nodes.has(id))nodes.set(id,node());return nodes.get(id);},querySelectorAll(){return[];},querySelector(){return node();},documentElement:node(),body:node(),addEventListener(){}};
 const c=vm.createContext({console,document,navigator:{},localStorage:{getItem(){return null;},setItem(){}},structuredClone,setTimeout(){return 1;},clearTimeout(){},setInterval(){return 1;},clearInterval(){},URL,Blob,performance:{now:()=>0},Math:Object.create(Math),Date:class extends Date{static now(){return 1000}}});
 vm.runInContext(script.slice(0,script.lastIndexOf('\ninit();')),c);
 vm.runInContext('var rngSeed=1,rngCalls=0;Math.random=()=>{rngCalls++;return ((rngSeed=(1664525*rngSeed+1013904223)>>>0)/4294967296)};render=()=>{};renderMp=()=>{};showToast=()=>{};showMonsterRpsResult=async()=>{};chooseUse258=async()=>true;chooseMpOption=async()=>null;beat=async()=>{};',c);
 return code=>vm.runInContext(code,c);
}
const runs=[load(before),load(after)];let comparisons=0;
function same(label,code){const values=runs.map(g=>g(`JSON.stringify((()=>{${code}})())`));assert.equal(values[1],values[0],label);comparisons++;}
(async()=>{
 same('static rules, UI descriptions and stored defaults','return {MOVES,SKILLS,ABILITIES,LEVELS,EMBEDDED_RULEBOOK_MD,data}');
 same('all role pairs: combined costs and action sets',`const out=[];for(const skill of SKILL_KEYS)for(const extra of SKILL_KEYS){rngSeed=1;const f=createFighter(skill);f.extraSkills=[extra];f.attackDiscount=2;f.stormDiscount=1;f.dragonCatch=4;for(const sealed of [false,true]){f.roundSkillLock=sealed;out.push([skill,extra,sealed,availableMoveKeys(skill,f,true),MOVE_KEYS.map(k=>moveCost(k,skill,f))]);}}return out;`);
 same('all roles and move pairs: combat results and damage previews',`const out=[];for(const skill of SKILL_KEYS){rngSeed=8;data.settings.skillsEnabled=true;data.settings.playerSkill=skill;data.settings.aiSkill='none';state=newState();for(const p of MOVE_KEYS)for(const a of MOVE_KEYS){const r=resolveWithSkills(p,a,skill,'none',state.player,state.ai);out.push([r,previewSkillDamage(r,p,a,skill,'none',state.player,state.ai)]);}}return out;`);
 same('history weighting',`const out=[];for(const skill of ['generalist','prisoner','guardian'])for(const energy of [0,1,2,3,4,5,7]){const context={aiEnergy:3,afterReset:true,decisionHistory:Array.from({length:60},(_,i)=>({playerEnergy:i%6,aiEnergy:i%5,move:MOVE_KEYS[i%11],previousPlayer:'forge',afterReset:i%2===0}))};for(const level of Object.values(LEVELS))out.push(playerMoveWeights(energy,Array.from({length:100},(_,i)=>MOVE_KEYS[i%11]),level.history,skill,createFighter(skill),true,context,level));}return out;`);
 for(const role of ['generalist','prisoner','guardian','storm','whiteTower','diviner']){
  same('duel AI '+role,`const out=[];for(const difficulty of Object.keys(LEVELS))for(const skillsEnabled of [false,true]){rngSeed=45;rngCalls=0;data.settings.skillsEnabled=skillsEnabled;data.settings.playerSkill='none';data.settings.aiSkill=${JSON.stringify(role)};state=newState();const c={aiEnergy:3,playerEnergy:2,history:['forge','guard','forge'],aiMoveHistory:['catch','forge'],decisionHistory:[],afterReset:false,mode:'standard',winScore:3,aiScore:0,playerScore:1,skillsEnabled,playerSkill:'none',aiSkill:${JSON.stringify(role)},playerFighter:state.player,aiFighter:state.ai,weaponHistory:[],scissorsEnabled:true};out.push([chooseAiMove(difficulty,c),chooseAiMove(difficulty,c,'knife'),rngCalls]);}return out;`);
 }
 if(!allowMpAiChanges)same('multiplayer AI scores, choices and random draw counts',`const out=[];for(const role of SKILL_KEYS){mpState={fighters:Array.from({length:12},(_,i)=>createMpFighter(i,i%3,false,i===0?role:SKILL_KEYS[(i+6)%38])),round:3,log:[],global:{disabledSkillTeams:new Set(),friendlyFireTeams:new Set(),multiHitTeams:new Set(),damageReductionTeams:new Map()}};mpState.fighters.forEach((f,i)=>{f.energy=i%6;f.hp=.5+i%3});const f=mpState.fighters[0];f.energy=5;for(const difficulty of Object.keys(LEVELS)){data.settings.difficulty=difficulty;rngSeed=991;rngCalls=0;out.push([mpLegalMoves(f).map(k=>scoreMpAiMove(f,k)),chooseMpAiMove(f),...['harm','heal','shield','recharge'].map(p=>chooseAiSkillTarget(f,mpState.fighters,p)?.id),rngCalls]);}}return out;`);
 // Run the exact same game-regression suite against both builds, including async skills.
 const testSource=fs.readFileSync('tests/v2.5.8-third-edition.test.mjs','utf8');
 const {spawnSync}=require('node:child_process'),path=require('node:path'),os=require('node:os');
 const {pathToFileURL}=require('node:url');
 for(const file of [before,after]){
  const temp=path.join(os.tmpdir(),`hezhang-equivalence-${process.pid}.mjs`);
  try{
   // Keep release-rule references absolute when moving the test into the temp directory.
   const text=testSource.replace(/new URL\('([^']+)',import.meta.url\)/g,(_,relative)=>`new URL(${JSON.stringify(pathToFileURL(relative.endsWith('.html')?path.resolve(file):path.resolve('tests',relative)).href)})`);
   fs.writeFileSync(temp,text);
   const result=spawnSync(process.execPath,['--test',temp],{encoding:'utf8'});
   if(result.status!==0)throw Error(file+' regression failure\n'+result.stdout+result.stderr);
  }finally{if(fs.existsSync(temp))fs.unlinkSync(temp);}
 }
 console.log(JSON.stringify({comparisons,regressionBuilds:2,multiplayerAiComparison:!allowMpAiChanges,passed:true},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
