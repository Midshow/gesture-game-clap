// NODE_PATH must provide Playwright. Runs the actual multiplayer buttons and help dialog.
const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
  for(const defense of ['catch','flash']) {
   const page=await browser.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
   await page.goto(pathToFileURL(path.resolve('合掌网页版-正式版本存档/合掌网页版v2.5.8.2.html')).href);
   await page.locator('#multiplayerButton').click();
   await page.locator('#mpTeamCount').selectOption('3');
   await page.locator('#mpTeamSize').selectOption('1');
   await page.locator('#mpPlayerSkill').selectOption('none');
   for(const select of await page.locator('[data-mp-ai-skill]').all())await select.selectOption('none');
   await page.locator('#mpSetupForm .primary-button').click();
   await page.evaluate(()=>{
    mpState.fighters.forEach(f=>f.energy=6);mpState.step=3;
    chooseMpAiMove=f=>f.id===1?'katana':'forge';
    renderMp();
   });
   await page.locator(`[data-mp-move="${defense}"]`).click();
   await page.locator('dialog[open] [data-value="yes"]').click();
   await page.waitForFunction(()=>mpState.round===2&&!mpState.responsePending);
   const result=await page.evaluate(()=>({round:mpState.round,step:mpState.step,energy:mpState.fighters.map(f=>f.energy),hp:mpState.fighters.map(f=>f.hp),cards:Array.from(document.querySelectorAll('.mp-bars')).map(x=>x.textContent),status:document.querySelector('#mpStatus').textContent,help:mpState.log.some(x=>x.text.includes('帮')&&x.text.includes('成功'))}));
   assert.deepEqual(result.energy,[0,0,0]);assert.deepEqual(result.hp,[2,2,2]);assert.equal(result.step,1);assert.equal(result.help,true);
   assert.ok(result.cards.every(x=>x.includes('能量 0')));assert.deepEqual(errors,[]);
   console.log(JSON.stringify({defense,...result}));
   await page.close();
  }
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
