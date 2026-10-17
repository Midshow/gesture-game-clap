// Seeded decision and real settlement comparisons; no game/browser dependencies added.
import {loadGame, multiplayer, currentGame} from '../tests/helpers/offline-game.mjs';

const files = process.argv.slice(2);
if (!files.length) files.push(currentGame);
const results = [];
for (const file of files) {
  const g = loadGame(file), scenarios = [];
  for (const count of [4, 8, 12]) for (const difficulty of ['normal', 'hard', 'hell']) {
    multiplayer(g, {count, teamSize:2, difficulty});
    const decisions = JSON.parse(g(`JSON.stringify((()=>{
      const counts={};const start=performance.now();
      const world=typeof createMpAiWorld==='function'?createMpAiWorld():undefined;
      for(let i=0;i<200;i++){const move=chooseMpAiMove(mpState.fighters[1],world);counts[move]=(counts[move]||0)+1;}
      const msPerDecision=(performance.now()-start)/200,batches=[];
      for(let i=0;i<24;i++){
        const begin=performance.now(),batch=typeof createMpAiWorld==='function'?createMpAiWorld():undefined;
        mpState.fighters.forEach(f=>chooseMpAiMove(f,batch));
        if(i>=4)batches.push(performance.now()-begin);
      }
      batches.sort((a,b)=>a-b);
      return {counts,msPerDecision,batchP75:batches[14]};
    })())`));
    let reachedSix = 0, survived = 0, hits = 0, attacks = 0, steps = 0;
    for (let seed = 1; seed <= 40; seed++) {
      multiplayer(g, {count, teamSize:2, difficulty, seed, energy:0});
      const run = JSON.parse(await g(`(async()=>{
        let reachedSix=false,hits=0,attacks=0,steps=0;
        for(;steps<18&&!mpState.over&&mpState.fighters[0].alive;steps++){
          const world=typeof createMpAiWorld==='function'?createMpAiWorld():undefined;
          const actions=new Map(aliveMp().filter(f=>!f.skipped).map(f=>[f.id,f.id===0?'forge':chooseMpAiMove(f,world)]));
          attacks+=[...actions.values()].filter(k=>skillMove(k).type==='attack').length;
          const context=await resolveMpActions(actions);
          hits+=(context.ruleTrace||[]).filter(r=>r.code==='ATTACK_HIT').length;
          reachedSix ||= mpState.fighters[0].energy>=6;
        }
        return JSON.stringify({reachedSix,hits,attacks,steps,survived:mpState.fighters[0].alive});
      })()`));
      reachedSix += Number(run.reachedSix); survived += Number(run.survived);
      hits += run.hits; attacks += run.attacks; steps += run.steps;
    }
    scenarios.push({count,difficulty,decisions,alwaysForge:{games:40,reachedSix,survived,hits,attacks,steps}});
  }
  results.push({file:String(file),scenarios});
}
console.log(JSON.stringify(results,null,2));
