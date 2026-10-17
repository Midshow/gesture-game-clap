import assert from 'node:assert/strict';
import test from 'node:test';
import {loadGame, multiplayer} from './helpers/offline-game.mjs';

function choices(g, count=240) {
  return JSON.parse(g(`JSON.stringify((()=>{const world=createMpAiWorld(),out={};for(let i=0;i<${count};i++){const k=chooseMpAiMove(mpState.fighters[0],world);out[k]=(out[k]||0)+1;}return out;})())`));
}

test('crowded low-energy games retain offensive and development choices at every difficulty',()=>{
  const g=loadGame();
  for(const count of [4,8,12])for(const difficulty of ['easy','normal','hard','hell']){
    multiplayer(g,{count,difficulty});
    const out=choices(g);
    assert.ok((out.knife||0)+(out.forge||0)>140,JSON.stringify({count,difficulty,out}));
    assert.ok(out.knife>20,JSON.stringify({count,difficulty,out}));
    assert.ok(Object.keys(out).length>1,'identical states must retain mixed choices');
  }
});

test('continued forging is punished in actual 8/12-player team settlement',async()=>{
  const g=loadGame();
  for(const count of [8,12])for(const teamSize of [2,4]){
    let reachedSix=0,damaged=0;
    for(let seed=1;seed<=12;seed++){
      multiplayer(g,{count,teamSize,seed,energy:0});
      const result=JSON.parse(await g(`(async()=>{let reached=false;for(let i=0;i<16&&!mpState.over&&mpState.fighters[0].alive;i++){
        const world=createMpAiWorld(),actions=new Map(world.active.map(f=>[f.id,f.id===0?'forge':chooseMpAiMove(f,world)]));
        await resolveMpActions(actions);reached ||= mpState.fighters[0].energy>=6;
      }return JSON.stringify({reached,hp:mpState.fighters[0].hp});})()`));
      reachedSix+=Number(result.reached);damaged+=Number(result.hp<2);
    }
    assert.ok(reachedSix<=2,`${count}/${teamSize}: ${reachedSix} reached six`);
    assert.ok(damaged>=10,`${count}/${teamSize}: forging remained unpunished`);
  }
});

test('all-AI games progress instead of synchronizing into endless low-level attacks',async()=>{
  const g=loadGame();
  let completed=0;
  for(let seed=1;seed<=12;seed++){
    multiplayer(g,{count:12,teamSize:2,seed,energy:0,difficulty:'hell'});
    await g(`(async()=>{for(let i=0;i<100&&!mpState.over;i++){const world=createMpAiWorld();await resolveMpActions(new Map(world.active.map(f=>[f.id,chooseMpAiMove(f,world)])));}})()`);
    completed+=Number(g('mpState.over'));
  }
  assert.ok(completed>=10,`${completed}/12 games completed within 100 gestures`);
});

test('unrevealed choices cannot influence AI; decisions do not mutate fighters',()=>{
  const g=loadGame();multiplayer(g);
  const before=g('JSON.stringify(mpState.fighters)');
  g('Object.defineProperty(mpState,"currentActions",{get(){throw Error("unrevealed actions accessed")}})');
  choices(g);
  assert.equal(g('JSON.stringify(mpState.fighters)'),before);
});

test('skipped opponents do not inflate threat or alter random choices',()=>{
  const g=loadGame();multiplayer(g,{count:4,seed:33});
  const before=choices(g);
  g('rngSeed=33;for(let id=4;id<12;id++){const f=createMpFighter(id,id,false,"none");f.energy=6;f.skipped=true;mpState.fighters.push(f)}');
  assert.deepEqual(choices(g),before);
});

test('zero-energy AI can defend against a lethal knife instead of always forging',()=>{
  const g=loadGame();multiplayer(g,{count:2,teamSize:1,difficulty:'hell',energy:0});
  g('mpState.fighters[0].hp=1;Object.assign(mpState.fighters[1],{energy:1,lastMove:"knife",previousMove:"knife"})');
  const out=choices(g);
  assert.ok(out.guard>120,JSON.stringify(out));
});

test('actual skill costs and levels drive forecasts, including cost-free flash and storm blade',()=>{
  const g=loadGame();multiplayer(g,{count:3,teamSize:1,roles:['prisoner','storm','secretKeeper'],energy:2});
  g('mpState.fighters[0].energy=0;mpState.fighters[1].stormDiscount=1;mpState.fighters[1].energy=1;mpState.fighters[2].energy=5');
  assert.equal(g('mpAiForecast(mpState.fighters[0]).some(m=>m.key==="flash")'),true);
  assert.equal(g('mpAiForecast(mpState.fighters[1]).find(m=>m.key==="katana").attack.level'),1.5);
  assert.equal(g('mpAiCanHit(mpState.fighters[0],"catch",makeMpAttack(mpState.fighters[1],"katana"))'),true);
  assert.equal(g('mpAiForecast(mpState.fighters[2]).some(m=>m.key==="void")'),true);
  assert.equal(g('mpAiCanHit(mpState.fighters[0],"flash",makeMpAttack(mpState.fighters[2],"dragonFang"))'),true);
});

test('38 roles keep legal finite choices with suppression and all energy levels',()=>{
  const g=loadGame();
  const roles=JSON.parse(g('JSON.stringify(SKILL_KEYS)'));
  for(const role of roles){
    multiplayer(g,{count:4,roles:[role,'storm','guardian','secretKeeper']});
    g(`for(const energy of [0,.25,1,2,3,5,6])for(const sealed of [false,true]){
      const f=mpState.fighters[0];f.energy=energy;f.roundFlags.skillStolen=sealed;
      const context=createMpAiContext(f),legal=mpLegalMoves(f);
      for(const key of legal)if(!Number.isFinite(scoreMpAiMove(f,key,context)))throw Error('non-finite score: '+f.skill+'/'+key);
      for(let i=0;i<5;i++)if(!legal.includes(chooseMpAiMove(f)))throw Error('illegal move: '+f.skill);
    }`);
  }
});

test('friendly fire lowers willingness to attack when a vulnerable teammate enters the pool',()=>{
  const g=loadGame();multiplayer(g,{count:4,teamSize:2,energy:1});
  g('mpState.fighters[1].hp=1;mpState.fighters[1].energy=0');
  const safe=g('scoreMpAiMove(mpState.fighters[0],"knife")');
  g('mpState.global.friendlyFireTeams.add(0)');
  assert.ok(g('scoreMpAiMove(mpState.fighters[0],"knife")')<safe);
});

test('shared public analysis gives identical choices to individual analysis under the same seed',()=>{
  const g=loadGame();multiplayer(g,{count:12,energy:5,roles:['moon','prisoner','storm','guardian','secretKeeper','aurora','observer']});
  const before=g('JSON.stringify(mpState.fighters.map(f=>chooseMpAiMove(f)))');
  g('rngSeed=1;var world=createMpAiWorld()');
  assert.equal(g('JSON.stringify(mpState.fighters.map(f=>chooseMpAiMove(f,world)))'),before);
});

test('AI does not spend help or volunteer its life for free-for-all opponents',async()=>{
  const g=loadGame();multiplayer(g,{count:3,teamSize:1,energy:4});
  g('Math.random=()=>0;var attack=makeMpAttack(mpState.fighters[0],"kunai"),actions=new Map([[0,"kunai"],[1,"flash"],[2,"forge"]]);mpState.fighters[1].defenseQuota=1');
  assert.equal((await g('chooseMpDefenseHelpers(mpState.fighters.slice(1),attack,actions)')).length,0);
  g('actions.set(1,"forge")');
  assert.equal((await g('chooseMpVolunteers(mpState.fighters.slice(1),attack,actions)')).length,0);
});

test('AI helps an exposed teammate and reserves volunteering for survivable rescues',async()=>{
  const g=loadGame();multiplayer(g,{count:3,teamSize:1,energy:4});
  g('Math.random=()=>0;mpState.fighters[2].team=1;mpState.fighters[2].hp=1;mpState.fighters[1].defenseQuota=1;var attack=makeMpAttack(mpState.fighters[0],"kunai"),actions=new Map([[0,"kunai"],[1,"flash"],[2,"forge"]])');
  assert.equal((await g('chooseMpDefenseHelpers(mpState.fighters.slice(1),attack,actions)'))[0].id,1);
  g('actions.set(1,"forge")');
  assert.deepEqual(Array.from(await g('chooseMpVolunteers(mpState.fighters.slice(1),attack,actions)'),f=>f.id),[1]);
  g('mpState.fighters[1].hp=1;mpState.fighters[1].shields=1;attack.trueDamage=true');
  assert.equal((await g('chooseMpVolunteers(mpState.fighters.slice(1),attack,actions)')).length,0);
});

test('magician reduces allied damage, increases enemy damage, and saves uses without improvement',async()=>{
  const g=loadGame();multiplayer(g,{count:4,teamSize:2,roles:['magician'],energy:2});
  g('Math.random=()=>0;mpState.fighters[0].attack=.5;mpState.fighters[3].attack=4;var events=[]');
  const protectedAttack=await g('resolveMpMagicianChain(makeMpAttack(mpState.fighters[2],"knife"),mpState.fighters[1],events)');
  assert.equal(protectedAttack.damage,.5);
  assert.equal(g('mpState.fighters[0].activeUses.magician'),1);
  const harmfulAttack=await g('resolveMpMagicianChain(makeMpAttack(mpState.fighters[1],"knife"),mpState.fighters[2],events)');
  assert.equal(harmfulAttack.damage,4);
  g('mpState.fighters[0].activeUses.magician=2');
  await g('resolveMpMagicianChain(makeMpAttack(mpState.fighters[3],"knife"),mpState.fighters[2],events)');
  assert.equal(g('mpState.fighters[0].activeUses.magician'),2);
});
