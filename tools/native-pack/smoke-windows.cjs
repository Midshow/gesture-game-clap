// NODE_PATH must provide Playwright. This launches only the EXE passed by the caller.
const {chromium} = require('playwright');
const {spawn, spawnSync} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const net = require('node:net');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  const exe = path.resolve(process.argv[2] || 'dist/apps/2.5.8.2/Hezhang-2.5.8.2-windows-x64.exe');
  assert.ok(fs.existsSync(exe), 'EXE not found');
  const server = net.createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  await new Promise(resolve => server.close(resolve));
  const profile = path.resolve('.cache/native-pack/smoke-profile-' + Date.now());
  const processHandle = spawn(exe, [], {windowsHide:true, stdio:'ignore', env:{...process.env,
    WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS:`--remote-debugging-port=${port}`,
    WEBVIEW2_USER_DATA_FOLDER:profile}});
  let browser;
  try {
    for (let attempt=0; attempt<80; attempt++) {
      if (processHandle.exitCode !== null) throw Error('EXE exited before WebView2 initialized');
      try {
        const response = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (response.ok) break;
      } catch {}
      await delay(250);
    }
    browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
    let page;
    for (let attempt=0; attempt<80; attempt++) {
      page=browser.contexts().flatMap(c=>c.pages()).find(p=>p.url().startsWith('https://hezhang.local/'));
      if (page) break;
      await delay(250);
    }
    if (!page) {
      const details=[];
      for (const p of browser.contexts().flatMap(c=>c.pages())) details.push({url:p.url(),body:await p.locator('body').innerText().catch(()=>'' )});
      throw Error('No game page: '+JSON.stringify(details));
    }
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.waitForFunction(()=>typeof runBasicEnergyChecks==='function');
    const dpiCheck = spawnSync('powershell.exe', ['-NoProfile','-ExecutionPolicy','Bypass','-File',path.join(__dirname,'check-window-dpi.ps1'),'-TargetProcessId',String(processHandle.pid)], {windowsHide:true, encoding:'utf8'});
    assert.equal(dpiCheck.status,0,dpiCheck.stderr);
    const nativeDpi = JSON.parse(dpiCheck.stdout.trim());
    assert.equal(nativeDpi.perMonitorV2,true,'EXE must opt out of blurry Windows bitmap scaling');
    const pixelRatio = await page.evaluate(()=>window.devicePixelRatio);
    assert.ok(Math.abs(pixelRatio-nativeDpi.dpi/96)<0.01,'WebView pixels must match native window DPI');
    assert.equal(await page.evaluate(()=>runBasicEnergyChecks().passed && runEngineIsolationChecks().passed && __hezhangMpChecks.passed),true);
    await page.evaluate(()=>localStorage.setItem('native-smoke','saved'));
    await page.reload();
    assert.equal(await page.evaluate(()=>localStorage.getItem('native-smoke')),'saved');
    await page.locator('#multiplayerButton').click();
    await page.locator('#mpTeamCount').selectOption('3');
    await page.locator('#mpTeamSize').selectOption('1');
    await page.locator('#mpPlayerSkill').selectOption('none');
    for (const select of await page.locator('[data-mp-ai-skill]').all()) await select.selectOption('none');
    await page.locator('#mpSetupForm .primary-button').click();
    await page.evaluate(()=>{
      mpState.fighters.forEach(f=>f.energy=6);
      chooseMpAiMove=f=>f.id===1?'katana':'forge';
      renderMp();
    });
    await page.locator('[data-mp-move="flash"]').click();
    await page.locator('dialog[open] [data-value="yes"]').click();
    await page.waitForFunction(()=>mpState.round===2&&!mpState.responsePending);
    assert.deepEqual(await page.evaluate(()=>mpState.fighters.map(f=>f.energy)),[0,0,0]);
    assert.deepEqual(errors,[]);
    fs.mkdirSync('output/native-pack',{recursive:true});
    await page.screenshot({path:'output/native-pack/windows.png'});
    console.log(JSON.stringify({exe,nativeDpi,pixelRatio,checks:true,storageReload:true,multiplayerHelpReset:true,errors}));
  } finally {
    if (browser) await browser.close();
    processHandle.kill();
  }
})().catch(e=>{console.error(e);process.exitCode=1;});
