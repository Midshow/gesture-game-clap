import fs from 'node:fs';
import vm from 'node:vm';

export const currentGame = new URL('../../合掌网页版-正式版本存档/合掌网页版v2.5.8.2.html', import.meta.url);
export function loadGame(file = currentGame) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.slice(html.indexOf('<script>') + 8, html.lastIndexOf('</script>'));
  const node = () => ({innerHTML:'',textContent:'',value:'',open:false,children:[],style:{setProperty(){}},classList:{add(){},remove(){},toggle(){}},addEventListener(){},removeEventListener(){},showModal(){this.open=true;},close(){this.open=false;},querySelectorAll(){return[];},querySelector(){return node();}});
  const nodes = new Map();
  const document = {getElementById(id){if(!nodes.has(id))nodes.set(id,node());return nodes.get(id);},querySelectorAll(){return[];},querySelector(){return node();},documentElement:node(),body:node(),addEventListener(){}};
  const context = vm.createContext({console,document,navigator:{},localStorage:{getItem(){return null;},setItem(){}},structuredClone,setTimeout(){return 1;},clearTimeout(){},setInterval(){return 1;},clearInterval(){},URL,Blob,performance,Math:Object.create(Math)});
  vm.runInContext(script.slice(0, script.lastIndexOf('\ninit();')), context);
  vm.runInContext(`render=()=>{};renderMp=()=>{};showToast=()=>{};showMonsterRpsResult=async()=>{};chooseUse258=async()=>false;chooseMpOption=async()=>null;beat=async()=>{};showMpGameOver=()=>{};
    var rngSeed=1;Math.random=()=>((rngSeed=(1664525*rngSeed+1013904223)>>>0)/4294967296);`, context);
  return code => vm.runInContext(code, context);
}

export function multiplayer(g, {count=12, teamSize=2, difficulty='hard', roles=[], seed=1, energy=1} = {}) {
  g(`rngSeed=${seed};data.settings.difficulty=${JSON.stringify(difficulty)};
    mpState={fighters:Array.from({length:${count}},(_,i)=>createMpFighter(i,Math.floor(i/${teamSize}),false,${JSON.stringify(roles)}[i]||'none')),format:'multi',teamCount:Math.ceil(${count}/${teamSize}),teamSize:${teamSize},round:1,step:1,phase:'combat',over:false,weaponHistory:[],log:[],fieldDeclarations:[],spectator:{paused:true,speed:1},global:{disabledSkillTeams:new Set(),friendlyFireTeams:new Set(),multiHitTeams:new Set(),damageReductionTeams:new Map()},currentActions:new Map()};
    mpState.fighters.forEach(f=>{f.energy=${energy};f.lastMove='forge'});`);
}
