// Browser Canvas smoke test with a small wx adapter. Does not replace a device test.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const modules = ['core', 'match', 'app'].map(name =>
  `factories['./${name}']=function(require,module,exports){\n${fs.readFileSync(path.join(root, 'wechat-minigame/js', name + '.js'), 'utf8')}\n};`).join('\n');
const pageSource = fs.readFileSync(path.join(root, 'wechat-minigame/pages/index/index.js'), 'utf8').replace("require('../../js/app')", "require('./app')");
const html = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;overflow:hidden}canvas{width:100vw;height:100vh;touch-action:none}</style><canvas></canvas><script>
const factories={},cache={}; ${modules}
function require(k){if(!cache[k]){const m={exports:{}};cache[k]=m;factories[k](require,m,m.exports);}return cache[k].exports;}
const c=document.querySelector('canvas'),ctx=c.getContext('2d'),events={};window.labels=[];
const ft=ctx.fillText.bind(ctx),fr=ctx.fillRect.bind(ctx);
ctx.fillText=(t,x,y,...a)=>{labels.push({text:String(t),x,y});ft(t,x,y,...a);};
ctx.fillRect=(x,y,w,h)=>{if(x===0&&y===0)labels=[];fr(x,y,w,h);};
const info=()=>({windowWidth:innerWidth,windowHeight:innerHeight,pixelRatio:devicePixelRatio,safeArea:{top:24,bottom:innerHeight-20}});
const wx={createCanvas:()=>c,getWindowInfo:info,getMenuButtonBoundingClientRect:()=>({bottom:52}),
getStorageSync:k=>JSON.parse(localStorage.getItem(k)||'null'),setStorageSync:(k,v)=>localStorage.setItem(k,JSON.stringify(v)),
showToast:()=>{},showModal:o=>o.success({confirm:true}),onTouchStart:f=>events.start=f,onTouchMove:f=>events.move=f,
onTouchEnd:f=>events.end=f,onTouchCancel:f=>events.cancel=f,onWindowResize:f=>addEventListener('resize',f),offWindowResize:f=>removeEventListener('resize',f),onShow:()=>{}};
let miniPage;
function Page(definition){miniPage=definition;miniPage.setData=d=>{if(d.error)throw Error(d.error);};
miniPage.createSelectorQuery=()=>{const q={select:()=>q,fields:()=>q,exec:f=>f([{node:c,width:innerWidth,height:innerHeight}])};return q;};miniPage.onReady();}
${pageSource}
for(const [dom,method]of [['pointerdown','onCanvasStart'],['pointermove','onCanvasMove'],['pointerup','onCanvasEnd']])c.addEventListener(dom,e=>miniPage[method]({touches:[{x:e.clientX,y:e.clientY}],changedTouches:[{x:e.clientX,y:e.clientY}]}));
</script>`;

(async () => {
  const server = http.createServer((req, res) => { res.setHeader('Content-Type', 'text/html; charset=utf-8'); res.end(html); });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: {width:390,height:844}, deviceScaleFactor:2 });
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}`);
    const tap = async text => {
      const p = await page.evaluate(t => { const l=labels.find(l=>l.text===t); if(!l)throw Error('Missing '+t);return {x:l.x*innerWidth/390,y:(l.y+8)*innerWidth/390}; }, text);
      await page.mouse.click(p.x,p.y);
    };
    const has = async text => assert.ok(await page.evaluate(t=>labels.some(l=>l.text===t),text),text);
    const out = path.join(root,'output/wechat'); fs.mkdirSync(out,{recursive:true});
    await has('开始对战'); await page.screenshot({path:path.join(out,'home.png')});
    await tap('对局设置'); await tap('剪刀模式：关闭'); await tap('5 分');
    await page.reload(); await tap('对局设置'); await has('剪刀模式：开启');
    await tap('首页'); await tap('开始对战'); await has('先得 5 分'); await has('剪刀');
    await tap('锻造'); await has('双方锻造'); await tap('继续出招'); await has('1 锻');
    await page.screenshot({path:path.join(out,'battle.png')});
    await tap('小刀'); await tap('查看战报'); await has('第1回合 · 出手1'); await tap('返回对局');
    await tap('首页'); await has('开始对战');
    for (const [width,height] of [[320,568],[768,1024]]) {
      await page.setViewportSize({width,height}); await page.waitForTimeout(100);
      await tap('开始对战'); await tap('锻造'); await has('双方锻造');
      await tap('继续出招'); await page.screenshot({path:path.join(out,`battle-${width}.png`)});
      // A swipe scrolls short screens without accidentally choosing a move.
      await page.mouse.move(width/2,height*.8); await page.mouse.down();
      await page.mouse.move(width/2,height*.45,{steps:10}); await page.mouse.up();
      await has('选择本次行动'); await tap('首页');
    }
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({settingsPersistence:true,playAndLog:true,viewports:[390,320,768],errors}));
  } finally { await browser.close(); await new Promise(r=>server.close(r)); }
})().catch(e=>{console.error(e);process.exitCode=1;});
