const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const webpack = require('webpack');
const esbuild = require('esbuild');
const {JSDOM} = require('jsdom');
const MpPlugin = require('mp-webpack-plugin');
const root = path.resolve(__dirname, '../..');
const source = path.join(root, '合掌网页版-正式版本存档/合掌网页版v2.5.8.2.html');
const dest = path.join(root, 'wechat-minigame');
const work = path.join(root, '.cache/wechat-full-build');
fs.mkdirSync(work, {recursive:true});
const html = fs.readFileSync(source, 'utf8');
const dom = new JSDOM(html);
const initialControls = [...dom.window.document.querySelectorAll('select[id]')].filter(s=>s.options.length).map(s=>[s.id,s.value]);
const body = html.slice(html.indexOf('<body') + html.slice(html.indexOf('<body')).indexOf('>') + 1, html.indexOf('<script>'));
let script = html.slice(html.indexOf('<script>')+8,html.lastIndexOf('</script>')).replace(/data-cancel(?=\s|>)/g,'data-cancel="true"');
for(const name of ['shareResultCard','shareMpResultCard']) {
  const re=new RegExp(`async function ${name}\\([^]*?(?=\\nfunction )`);
  let matched=false;
  script=script.replace(re,block=>{matched=true;return block.replace(/const ctx\s*=\s*canvas.getContext/,()=>`canvas.setAttribute('type','2d');canvas.style.position='fixed';canvas.style.left='-2000px';document.body.appendChild(canvas);await canvas.$$prepare();\n  const ctx=canvas.getContext`)
    .replace(/\s+const blob\s*=[^]*/,`\n  await window.__saveWechatCard(canvas);\n}\n`);});
  if(!matched)throw Error('战报导出适配边界发生变化：'+name);
}
const css = ([...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n') + '\n' + fs.readFileSync(path.join(__dirname,'adapt.css'),'utf8'))
  .replace(/:has\(input:checked\)/g,'.wx-selected')
  .replace(/(^|[\s,>])dialog(?=[\s.,:{>])/g,'$1.h5-dialog');
const onlinePath = path.join(__dirname,'online-client.js');
const online = fs.existsSync(onlinePath) ? fs.readFileSync(onlinePath,'utf8') : '';
const compat = fs.readFileSync(path.join(__dirname,'compat.js'),'utf8').replace('export default function install', 'function install');
const entry = `${compat}\nexport default function createApp(){\ninstall(window,document,wx);\nconst globalThis=window;const structuredClone=window.structuredClone;const AudioContext=function(){return wx.createWebAudioContext();};\ndocument.body.innerHTML=${JSON.stringify(body)};\ndocument.querySelectorAll('form button').forEach(button=>{if(!button.getAttribute('type'))button.setAttribute('type','submit');});\n${JSON.stringify(initialControls)}.forEach(([id,value])=>document.getElementById(id).value=value);\n${script}\n${online}\nwindow.__hezhangApp={startGame,startMultiplayer,playMpStep,activateMpSkill,chooseMpOption,getData:()=>data,getDuel:()=>state,getMp:()=>mpState,roles:SKILLS};\n}`;
const entryPath = path.join(work, 'entry.js');
fs.writeFileSync(entryPath, esbuild.transformSync(entry,{target:'es2018',format:'esm'}).code);
// Attach the original CSS before kbone's tag-selector conversion runs.
class Styles { apply(compiler) { compiler.hooks.emit.tap('HezhangStyles', compilation => {
  compilation.assets['full.wxss'] = {source:()=>css,size:()=>Buffer.byteLength(css)};
  for(const chunk of compilation.chunks) if(chunk.name==='full') chunk.files.push('full.wxss');
}); } }
const config = {
  mode:'production',entry:{full:entryPath},output:{path:path.join(work,'common'),filename:'[name].js',library:'createApp',libraryExport:'default',libraryTarget:'window'},
  target:'web',devtool:false,node:{global:false},optimization:{minimize:false,runtimeChunk:false,splitChunks:false},
  plugins:[new Styles(),new MpPlugin({origin:'https://hezhang.local',entry:'/',router:{full:['/']},
    generate:{autoBuildNpm:false},global:{rem:true,pageStyle:true},
    app:{navigationBarTitleText:'合掌 v2.5.8.2',backgroundColor:'#f5f0e7'},
    projectConfig:{appid:'wx01fee00acfaa4d5e',projectname:'hezhang-wechat'},
    optimization:{elementMultiplexing:false},runtime:{extraStyleList:['gap','backdrop-filter','aspect-ratio']}
  })]
};
webpack(config, (error, stats) => {
  if(error || stats.hasErrors()) {console.error(error || stats.toString({all:false,errors:true})); process.exitCode=1;return;}
  for(const dir of ['common','pages']) fs.cpSync(path.join(work,dir),path.join(dest,dir),{recursive:true});
  for(const name of ['miniprogram-render','miniprogram-element']) {
    const packageDir = path.dirname(require.resolve(name+'/package.json'));
    fs.cpSync(path.join(packageDir,'dist'),path.join(dest,'miniprogram_npm',name),{recursive:true});
    fs.copyFileSync(path.join(packageDir,'LICENSE'),path.join(dest,'miniprogram_npm',name,'LICENSE'));
  }
  const generated = JSON.parse(fs.readFileSync(path.join(work,'app.json')));
  fs.writeFileSync(path.join(dest,'app.json'),JSON.stringify({...generated,pages:[...generated.pages,'pages/index/index']},null,2)+'\n');
  fs.copyFileSync(path.join(work,'app.js'),path.join(dest,'app.js'));
  fs.copyFileSync(path.join(work,'app.wxss'),path.join(dest,'app.wxss'));
  fs.copyFileSync(path.join(work,'config.js'),path.join(dest,'config.js'));
  const manifest = {source:path.relative(root,source),sha256:crypto.createHash('sha256').update(html).digest('hex'),version:'2.5.8.2'};
  fs.writeFileSync(path.join(dest,'source-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  console.log('完整HTML适配构建完成：'+dest);
});
