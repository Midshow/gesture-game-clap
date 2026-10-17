// NODE_PATH must provide Playwright; the offline game remains dependency-free.
const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const assert=require('node:assert/strict');
const files=process.argv.slice(2);
if(!files.length)throw Error('Pass one or more HTML files to benchmark.');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const results=[];
  for(const file of files){
   const page=await browser.newPage(),errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   await page.goto(pathToFileURL(path.resolve(file)).href);
   assert.equal(await page.evaluate(()=>__hezhangMpChecks.passed),true);
   await page.locator('#multiplayerButton').click();
   await page.locator('#mpTeamCount').selectOption('6');
   await page.locator('#mpTeamSize').selectOption('2');
   await page.locator('#mpPlayerSkill').selectOption('none');
   for(const select of await page.locator('[data-mp-ai-skill]').all())await select.selectOption('none');
   await page.locator('#mpSetupForm .primary-button').click();
   await page.locator('[data-mp-move="forge"]').click();
   await page.waitForFunction(()=>mpState.step>1&&!mpState.responsePending);
   assert.equal(await page.evaluate(()=>mpState.fighters.length),12);
   const timings=await page.evaluate(()=>{
    const original=mpState.fighters,results=[];
    for(const skills of [false,true])for(const energy of [1,5]){
     mpState.fighters=Array.from({length:12},(_,i)=>createMpFighter(i,Math.floor(i/2),false,skills?['moon','storm','guardian','secretKeeper','observer','aurora','prisoner','dragonKnight','generalist','whiteTower','warrior','bulwark'][i]:'none'));
     mpState.fighters.forEach(f=>{f.energy=energy;f.lastMove='forge'});
     const samples=[];
     for(let i=0;i<34;i++){
      const start=performance.now(),world=typeof createMpAiWorld==='function'?createMpAiWorld():undefined;
      const moves=mpState.fighters.map(f=>chooseMpAiMove(f,world));
      if(i>=10)samples.push(performance.now()-start);
      if(!moves.every((key,index)=>mpLegalMoves(mpState.fighters[index]).includes(key)))throw Error('illegal AI move');
     }
     samples.sort((a,b)=>a-b);results.push({skills,energy,p75Ms:samples[17]});
    }
    mpState.fighters=original;return results;
   });
   assert.deepEqual(errors,[]);
   results.push({file,twelvePlayerUi:true,errors,timings});
   await page.close();
  }
  console.log(JSON.stringify(results,null,2));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
