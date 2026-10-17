const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
global.wx={getSystemInfoSync:()=>({SDKVersion:'3.17.4',pixelRatio:2,windowWidth:390,windowHeight:844,platform:'devtools',system:'Windows'}),
  getStorageInfoSync:()=>({keys:[]}),getStorageSync:()=>null,setStorageSync(){},getPerformance:()=>performance,pageScrollTo(){}};
global.Behavior=value=>value;
const mp=require('miniprogram-render');
const componentRoot=path.dirname(require.resolve('miniprogram-element/package.json'));
const behavior=require(path.join(componentRoot,'src/base.js'));
const renderTools=require(path.join(componentRoot,'src/util/tool.js'));
const {pageId,window,document}=mp.createPage('pages/full/index',require(path.join(root,'wechat-minigame/config.js')));
require(path.join(root,'wechat-minigame/common/full.js'))(window,document);
const component={...behavior.methods,pageId,document,data:{},setData(){}};
let stamp=1000;
const delay=ms=>new Promise(r=>setTimeout(r,ms));
async function until(fn,label){for(let i=0;i<100;i++){if(fn())return;await delay(25);}throw Error('操作未完成：'+label);}
function eventFor(el,type='tap',detail={}){const target={dataset:{privateNodeId:el.$$nodeId,privatePageId:pageId}};return{type,timeStamp:++stamp,target,currentTarget:target,touches:[],changedTouches:[],detail};}
function tap(selector){const el=typeof selector==='string'?document.querySelector(selector):selector;assert.ok(el,String(selector));component.onTap(eventFor(el));}
function choose(selector,value){const el=document.querySelector(selector);assert.ok(el,selector);const index=el.options.findIndex(o=>o.value===value);assert.ok(index>=0,selector+' '+value);component.onPickerChange(eventFor(el,'change',{value:index}));}
(async()=>{
  await window.createApp();const app=window.__hezhangApp;
  app.getData().settings.timerEnabled=false;app.getData().settings.sound=false;
  for(const select of document.querySelectorAll('select'))if(select.options.length)assert.ok(select.value!==undefined,'选择框须有默认值：'+select.id);
  tap('[data-action="start-game"]');await until(()=>document.getElementById('tutorialDialog').open,'新手教程');
  for(let i=0;i<10&&document.getElementById('tutorialDialog').open;i++){tap('#tutorialNext');await delay(5);}
  assert.equal(document.getElementById('tutorialDialog').open,false);
  tap(document.querySelector('[data-move="forge"]').querySelector('.move-icon'));await until(()=>app.getDuel().log.length>0,'点击锻造后的双人结算');
  assert.equal(app.getDuel().busy,false);assert.equal(app.getDuel().log[0].player,'forge');
  tap('#homeButton');
  tap('#multiplayerButton');
  await until(()=>document.getElementById('multiplayerSetupDialog').open,'多人设置');
  const select=document.getElementById('mpPlayerSkill');
  const rendered=renderTools.filterNodes(select,1,component);
  assert.equal(rendered.length,1,'角色选择框必须有可见且可点击的已选项');
  choose('#mpPlayerSkill','guardian');choose('#mpTeamCount','2');choose('#mpTeamSize','2');
  document.querySelectorAll('[data-mp-ai-skill]').forEach(s=>choose('[data-mp-ai-skill="'+s.dataset.mpAiSkill+'"]','none'));
  tap('#mpSetupForm button[type="submit"]');await until(()=>app.getMp()?.fighters.length===4,'提交多人设置');
  assert.equal(app.getMp().fighters[0].skill,'guardian');
  await until(()=>document.querySelector('[data-mp-move="guard"]'),'多人出招面板');
  tap('[data-mp-move="guard"]');await until(()=>app.getMp().fighters[0].energy===.25,'点击多人防御并触发守护者回锻');
  await until(()=>app.getMp().step===2&&!app.getMp().responsePending,'多人结算结束');
  console.log('原生组件事件：教程、双人出招、角色选择、表单提交、多人出招通过');
  mp.destroyPage(pageId);
})().catch(e=>{console.error(e);console.error('debug',JSON.stringify({mp:window.__hezhangApp?.getMp()?.fighters.map(f=>({skill:f.skill,human:f.human})),dialogs:Array.from(document.querySelectorAll('dialog')).filter(d=>d.open).map(d=>d.textContent.slice(0,200)),grid:document.getElementById('mpMoveGrid').innerHTML.slice(0,200)}));mp.destroyPage(pageId);process.exitCode=1;});
