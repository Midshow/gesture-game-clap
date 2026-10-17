const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'../..'),project=path.join(root,'wechat-minigame');
const devtools=process.env.WECHAT_DEVTOOLS||path.join(process.env['ProgramFiles(x86)']||'C:/Program Files (x86)','Tencent/微信web开发者工具');
const bin=path.join(devtools,'resources/app.asar.unpacked/node_modules/wcc-exec');
if(!fs.existsSync(path.join(bin,'wcsc.exe')))throw Error('未找到微信编译器，请将 WECHAT_DEVTOOLS 环境变量设为微信开发者工具安装目录');
const files=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,e.name);if(e.isDirectory())walk(full);else files.push('./'+path.relative(project,full).replaceAll('\\','/'));}}
walk(project);
for(const [tool,ext] of [['wcsc','.wxss'],['wcc','.wxml']]) {
  const output=path.join(root,'.cache/wechat-'+tool+'-check.js');
  try {execFileSync(path.join(bin,tool+'.exe'),['-o',output,...files.filter(f=>f.endsWith(ext))],{cwd:project,windowsHide:true,stdio:'pipe'});}
  catch(error){console.error(error.stdout?.toString()||'',error.stderr?.toString()||'');throw error;}
}
console.log('微信原生 WXSS / WXML 编译通过');
