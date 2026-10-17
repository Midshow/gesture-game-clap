// Run with Playwright available through NODE_PATH; no dependency in the game itself.
const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const assert=require('node:assert/strict');
const [before,after]=process.argv.slice(2);
if(!before||!after)throw Error('Usage: node tools/benchmark-multiplayer.cjs before.html after.html');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
 const pages=[];const errors=[];
 for(const file of [before,after]){
  const page=await browser.newPage({viewport:{width:390,height:844}});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.resolve(file)).href);
  pages.push(page);
 }
 const report=[];
 for(const size of [150,10000]){
  for(const page of pages)await page.evaluate(size=>{
   mpState={fighters:Array.from({length:12},(_,i)=>createMpFighter(i,i%3,i===0,'none')),format:'multi',teamCount:3,teamSize:4,round:1,step:1,phase:'combat',weaponHistory:[],log:[],fieldDeclarations:[],global:{disabledSkillTeams:new Set(),friendlyFireTeams:new Set(),multiHitTeams:new Set(),damageReductionTeams:new Map()},currentActions:new Map()};
   mpState.fighters.forEach(f=>f.energy=5);
   for(let i=0;i<size;i++)logMp('测试判刀 '+i,'trace',{trace:[{summary:'攻击建立',detail:'普通攻击由敌方共同判刀'},{summary:'防御判定',detail:'记录能量与技能状态'}]});
   setView('multiplayer');renderMp();
  },size);
  const samples=[[],[]];
  for(let round=0;round<24;round++)for(const index of round%2?[1,0]:[0,1]){
   const result=await pages[index].evaluate(()=>{
    const start=performance.now();const snap=captureMpTransaction();const captured=performance.now();
    restoreMpTransaction(snap);const restored=performance.now();
    const observer=new MutationObserver(()=>{});observer.observe(document.getElementById('mpLogList'),{childList:true,subtree:true});
    renderMp();document.getElementById('mpArena').getBoundingClientRect();
    const rendered=performance.now();const mutations=observer.takeRecords().length;observer.disconnect();
    logMp('新增一条测量记录');const appendStart=performance.now();renderMp();document.getElementById('mpArena').getBoundingClientRect();
    return {capture:captured-start,restore:restored-captured,render:rendered-restored,appendRender:performance.now()-appendStart,mutations};
   });
   if(round>=4)samples[index].push(result);
  }
  const p75=values=>values.sort((a,b)=>a-b)[Math.ceil(values.length*.75)-1];
  report.push({logs:size,before:Object.fromEntries(Object.keys(samples[0][0]).map(k=>[k,p75(samples[0].map(s=>s[k]))])),after:Object.fromEntries(Object.keys(samples[1][0]).map(k=>[k,p75(samples[1].map(s=>s[k]))]))});
 }
 // Browser regression: preserve expanded trace, prepend only a new row, cap DOM size.
 const page=pages[1];
 const checks=await page.evaluate(()=>{
  const list=document.getElementById('mpLogList'),row=list.querySelector('.mp-trace-entry');
  row.querySelector('details').open=true;renderMp();
  const unchanged=list.contains(row)&&row.querySelector('details').open;
  logMp('新增记录');renderMp();
  const preserved=list.contains(row)&&row.querySelector('details').open;
  const count=list.children.length;
  const snapshot=captureMpTransaction(),hp=mpState.fighters[0].hp,length=mpState.log.length;
  logMp('回滚记录');mpState.fighters[0].hp=0;restoreMpTransaction(snapshot);renderMp();
  const rollback=mpState.fighters[0].hp===hp&&mpState.log.length===length&&!list.textContent.includes('回滚记录');
  return {unchanged,preserved,count,rollback};
 });
 assert.deepEqual(checks,{unchanged:true,preserved:true,count:151,rollback:true});
 // Compare actual settlement and logs under the same deterministic random stream.
 const outcomes=[];
 for(const p of pages)outcomes.push(await p.evaluate(async()=>{
  let seed=12345;Math.random=()=>((seed=(1664525*seed+1013904223)>>>0)/4294967296);Date.now=()=>1000;
  beat=async()=>{};chooseMpOption=async()=>"yes";autoMpActive=async()=>{};
  mpState.log=[];mpState.over=false;mpState.round=1;mpState.step=1;
  mpState.fighters=Array.from({length:12},(_,i)=>createMpFighter(i,i%3,i===1,'none'));
  for(let step=0;step<6;step++){
   mpState.fighters.forEach(f=>f.energy=6);
   await resolveMpActions(new Map(mpState.fighters.map(f=>[f.id,f.id===0?'kunai':f.id===1?'flash':'forge'])));
  }
  renderMp();
  return JSON.stringify({fighters:mpState.fighters,round:mpState.round,step:mpState.step,log:mpState.log});
 }));
 assert.equal(outcomes[0],outcomes[1]);
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({viewport:'390x844',samples:20,report,checks,settlementEquivalent:true},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
