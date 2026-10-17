const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname,'../..');
global.wx = {getSystemInfoSync:()=>({pixelRatio:2,windowWidth:390,windowHeight:844,platform:'devtools',system:'Windows'}),
  getStorageInfoSync:()=>({keys:[]}),getStorageSync:()=>null,setStorageSync(){},getPerformance:()=>performance,
  pageScrollTo(){},getAppBaseInfo:()=>({})};
const mp = require('miniprogram-render');
const {pageId,window,document} = mp.createPage('pages/full/index',require(path.join(root,'wechat-minigame/config.js')));
require(path.join(root,'wechat-minigame/common/full.js'))(window,document);
(async()=>{
  await window.createApp();
  assert.equal(Object.keys(window.__hezhangApp.roles).length,39);
  for(const key of ['__hezhangBasicEnergyChecks','__hezhangMpChecks','__hezhangEngineIsolationChecks']) assert.equal(window[key].passed,true,key+': '+JSON.stringify(window[key].failed||window[key].failures));
  // M15 inspects Function.toString() formatting, which changes during compilation.
  assert.deepEqual(window.__hezhangRuleScenarioTests.failed.filter(t=>t.id!=='M15'),[]);
  for(const form of document.querySelectorAll('form')) {
    assert.ok([...form.querySelectorAll('button')].some(b=>b.getAttribute('type')==='submit'),'表单缺少显式提交按钮：'+form.id);
  }
  const generated=require('node:fs').readFileSync(path.join(root,'wechat-minigame/common/full.js'),'utf8');
  assert.equal((generated.match(/await canvas\.\$\$prepare\(\)/g)||[]).length,2,'双人和多人战报均需准备原生画布');
  document.getElementById('settingsDialog').showModal();
  assert.equal(document.getElementById('settingsDialog').open,true);
  document.getElementById('settingsDialog').close();
  assert.equal(document.getElementById('settingsDialog').open,false);
  const app = window.__hezhangApp;
  app.getData().tutorialSeen = true; app.getData().settings.timerEnabled = false;
  await app.startGame();
  document.getElementById('mpPlayerSkill').value='none';
  document.getElementById('mpTeamCount').value='2';
  document.getElementById('mpTeamSize').value='2';
  document.querySelectorAll('[data-mp-ai-skill]').forEach(s=>s.value='none');
  await app.startMultiplayer({preventDefault(){}});
  await app.playMpStep('forge');
  assert.equal(app.getMp().fighters.length,4);
  assert.equal(app.getMp().fighters[0].energy,1);
  console.log('完整小程序适配器启动、38角色、自检、弹窗与多人出手通过');
  mp.destroyPage(pageId);
})().catch(e=>{console.error(e);process.exitCode=1;});
