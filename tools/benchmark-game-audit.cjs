const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const files=process.argv.slice(2);if(files.length!==2)throw Error('Usage: node tools/benchmark-game-audit.cjs before.html after.html');
const p75=a=>a.sort((x,y)=>x-y)[Math.ceil(a.length*.75)-1];
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const pages=[],samples=[[],[]],errors=[];
  for(const file of files){const p=await browser.newPage({viewport:{width:390,height:844}});p.on('pageerror',e=>errors.push(e.message));pages.push(p);}
  for(let round=0;round<14;round++)for(const i of round%2?[1,0]:[0,1]){
   const page=pages[i];await page.goto(pathToFileURL(path.resolve(files[i])).href);
   const result=await page.evaluate(()=>{
    data.settings.skillsEnabled=true;data.settings.playerSkill='generalist';data.settings.aiSkill='prisoner';state=newState();
    state.player.energy=2;state.ai.energy=3;const c=createAiContext();
    const start=performance.now();for(let n=0;n<5;n++)chooseAiMove('hell',c);const duel=performance.now();
    mpState={fighters:Array.from({length:12},(_,n)=>createMpFighter(n,n%3,n===0,SKILL_KEYS[n])),round:1,step:1,phase:'combat',log:[],global:{disabledSkillTeams:new Set(),friendlyFireTeams:new Set(),multiHitTeams:new Set(),damageReductionTeams:new Map()}};
    mpState.fighters.forEach(f=>f.energy=5);const mpStart=performance.now();
    for(let n=0;n<100;n++)for(const f of mpState.fighters)chooseMpAiMove(f);
    const mpEnd=performance.now();
    return {startup:performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,duelAi:(duel-start)/5,multiplayerAi12:(mpEnd-mpStart)/100};
   });
   if(round>=4)samples[i].push(result);
  }
  const report=samples.map(values=>Object.fromEntries(Object.keys(values[0]).map(key=>[key,p75(values.map(v=>v[key]))])));
  const duelLogs=[[],[]];
  for(const page of pages)await page.evaluate(()=>{
   data.settings.skillsEnabled=false;state=newState();
   state.log=Array.from({length:500},(_,i)=>({round:500-i,system:true,title:'测试记录',detail:'无伤害，继续当前回合',skillEvents:['规则说明']}));
   setView('game');render();document.getElementById('battleLog').open=true;
  });
  for(let round=0;round<14;round++)for(const i of round%2?[1,0]:[0,1]){
   const duration=await pages[i].evaluate(()=>{
    const t=performance.now();render();document.getElementById('logList').getBoundingClientRect();return performance.now()-t;
   });
   if(round>=4)duelLogs[i].push(duration);
  }
  const logChecks=await pages[1].evaluate(()=>{
   const list=document.getElementById('logList'),row=list.firstElementChild;row.querySelector('details').open=true;render();
   const retained=list.firstElementChild===row&&row.querySelector('details').open;
   state.log.unshift({round:501,system:true,title:'<unsafe>',detail:'& text'});render();
   const prepend=list.children.length===501&&list.children[1]===row&&list.firstElementChild.textContent.includes('<unsafe>')&&!list.querySelector('unsafe');
   state.log=structuredClone(state.log.slice(1));render();
   const rollback=list.children.length===500&&!list.textContent.includes('<unsafe>');
   state=newState();render();return {retained,prepend,rollback,reset:list.children.length===0};
  });
  assert.deepEqual(logChecks,{retained:true,prepend:true,rollback:true,reset:true});
  // Allow only 2/255 channel rounding in composited backdrop blur; layout changes fail.
  let screenshots=0,maxScreenshotDelta=0;
  for(const viewport of [{width:390,height:844},{width:1365,height:900}]){
   for(let i=0;i<2;i++){
    await pages[i].setViewportSize(viewport);await pages[i].goto(pathToFileURL(path.resolve(files[i])).href);
   }
   for(const action of ['home','settings','rules','duel']){
    const images=[];
    for(const page of pages){
     await page.evaluate(async action=>{
      document.querySelectorAll('dialog[open]').forEach(d=>d.close());
      if(action==='settings')document.getElementById('settingsButton').click();
      if(action==='rules')document.getElementById('rulesButton').click();
      if(action==='duel'){data.tutorialSeen=true;await startGame();stopTimer();}
     },action);
     await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
     images.push(await page.screenshot({animations:'disabled'}));
    }
    if(!images[0].equals(images[1])){
     const delta=await pages[1].evaluate(async urls=>{
      const pixels=[];
      for(const src of urls){const image=new Image();image.src=src;await image.decode();const canvas=document.createElement('canvas');canvas.width=image.width;canvas.height=image.height;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);pixels.push(ctx.getImageData(0,0,canvas.width,canvas.height).data);}
      let max=0;for(let i=0;i<pixels[0].length;i++)max=Math.max(max,Math.abs(pixels[0][i]-pixels[1][i]));return max;
     },images.map(b=>'data:image/png;base64,'+b.toString('base64')));
     maxScreenshotDelta=Math.max(maxScreenshotDelta,delta);
     if(delta>2){fs.writeFileSync('output/performance/visual-before.png',images[0]);fs.writeFileSync('output/performance/visual-after.png',images[1]);}
     assert.ok(delta<=2,'visual difference: '+action+' '+viewport.width+' delta '+delta);
    }
    screenshots++;
   }
  }
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({bytes:files.map(f=>fs.statSync(f).size),samples:10,before:report[0],after:report[1],duel500LogRefresh:duelLogs.map(p75),logChecks,screenshotPairs:screenshots,maxScreenshotDelta,browserErrors:errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
