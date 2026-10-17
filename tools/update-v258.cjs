const fs = require('node:fs');
const path = '合掌网页版-正式版本存档/合掌网页版v2.5.8.html';
let html = fs.readFileSync('合掌网页版-正式版本存档/合掌网页版v2.5.7.html','utf8').replace(/\r\n/g,'\n');
function replace(a,b){if(!html.includes(a))throw Error('Missing: '+a.slice(0,150));html=html.replaceAll(a,b);}
function fn(name,body){const re=new RegExp('(?:async )?function '+name+'\\([^\\n]*');const m=html.match(re);if(!m)throw Error(name);const start=m.index;const end=m[0].trimEnd().endsWith('}')?start+m[0].length:html.indexOf('\n}',start)+2;html=html.slice(0,start)+body+html.slice(end);}
function write(){fs.writeFileSync(path,html);}
// Preserve the previous release. This migration is used only to prepare the new snapshot.
replace('2.5.7','2.5.8');
const paragraphs=JSON.parse(fs.readFileSync('output/v2.5.8-work/third.json','utf8')).map(s=>s.trim()).filter(Boolean);
const keys={通识者:'generalist',白塔:'whiteTower',死神:'reaper',暴君:'tyrant',倒吊人:'hangedMan',审判者:'judge',怪兽:'monster',母亲:'mother',猎人:'hunter',战士:'warrior',刺客:'assassin',窥秘人:'secretKeeper',囚徒:'prisoner',盗贼:'thief',黑皇帝:'blackEmperor',恶魔:'demon',观众:'audience',黑夜:'night',太阳:'sun',学徒:'apprentice',占卜家:'diviner',守卫:'guardian',月亮:'moon',先驱:'pioneer',梦魇:'nightmare',奇迹:'miracle',壁垒:'bulwark',极光:'aurora',风暴:'storm',魔术师:'magician',观者:'observer',渔夫:'fisherman',龙骑士:'dragonKnight',圣斗士:'saint',奇点:'singularity',牧羊人:'shepherd',苦修:'ascetic',暗影:'shadow'};
const defs={none:{name:'无技能',hp:2,attack:1,description:'基础2血1攻，无角色技能。'}};let def;
for(const p of paragraphs){const m=p.match(/^(.+?)（([\d.]+)血([\d.]+)攻(?:(\d+)护盾)?）$/);if(m){def=defs[keys[m[1]]]={name:m[1],hp:Number(m[2]),attack:Number(m[3]),description:''};if(m[4])def.shields=Number(m[4]);}else if(def)def.description+=(def.description?' ':'')+p;}
html=html.replace(/const SKILLS = \{[\s\S]*?\n};/,'const SKILLS = '+JSON.stringify(defs,null,2)+';');
replace('SKILL_KEYS.length===36','SKILL_KEYS.length===38');
replace('36名','38名');
// The new edition is reproduced verbatim; legacy digital adjudication remains historical.
const oldMd=fs.readFileSync('docs/rules/unified/合掌网页版统一规则（2026-08-03）.md','utf8').replace(/\r\n/g,'\n');
const rulebook='# 合掌 v2.5.8 规则\n\n技能条文以《合掌技能版（第三版）》为准。以下为第三版全文；基础动作及未被第三版改变的多人判刀沿用 v2.5.7。旧版技能描述不再适用。\n\n'+paragraphs.join('\n\n')+'\n\n# 基础动作与多人判刀（沿用）\n\n'+oldMd.slice(oldMd.indexOf('## 核心术语'),oldMd.indexOf('# 第四编')).replace('| 大盾 | 1 |','| 大盾 | 首次2，其后0 |').trimEnd()+'\n';
html=html.replace(/const EMBEDDED_RULEBOOK_MD = .*?;\n/,'const EMBEDDED_RULEBOOK_MD = '+JSON.stringify(rulebook)+';\n');
fs.mkdirSync('docs/rules/releases',{recursive:true});fs.writeFileSync('docs/rules/releases/合掌v2.5.8规则.md',rulebook);
replace('guardian:{filterMoves:keys=>keys.filter(key=>key!=="forge")}','guardian:{filterMoves:keys=>keys.filter(key=>key!=="forge"),modifyCost:({moveKey,cost})=>moveKey==="flash"?cost-1:cost}');
replace('if (moveKey === "bigShield") return 1;','if (moveKey === "bigShield") return fighter.bigShieldUsed?0:2;');
replace('if(key==="bigShield")return 1;','if(key==="bigShield")return f.bigShieldUsed?0:2;');
replace('cost: 1, summary: "挡1～5级 · 1能量"','cost: 2, summary: "挡1～5级 · 首次2锻，本回合随后免费"');
html=html.split('\n').filter(l=>!l.includes('keys.push("exit")')&&!l.includes('keys=[...keys,"exit"]')&&!l.includes('list.push(["fisherman"')&&!l.includes('buttons.push(["hook"')&&!l.includes('buttons.push(["saintTarget"')&&!l.includes('buttons.push(["bulwark"')&&!l.includes('f.hp-=.5;f.hook=true;')&&!l.includes('mpState.fishHookOwner==null && f.hp>0')).join('\n');
replace('singularityUses:3','singularityUses:Infinity');replace('singularityFieldUses:1','singularityFieldUses:2');
replace('singularity:3','singularity:Infinity');replace('aurora:1,singularity:1','aurora:1,singularity:2');
replace('boostForge: false, generalistBoostPending: false,','lastMove:null,bigShieldUsed:false,observerStance:"calm",tyrantUses:2,tyrantRestore:null,asceticUses:1,saintBonus:0,passiveSeals:[],attackLethal:false, boostForge: false, generalistBoostPending: false,');
replace('night:[{id:"night-rewind",type:"active",name:"黑夜回溯",limit:1}','night:[{id:"night-seal",type:"active",name:"封印被动"}');
replace('bulwark:[{id:"bulwark-shield",type:"active",name:"大盾"},{id:"bulwark-field",type:"field",name:"援护领域",limit:2}]','bulwark:[{id:"bulwark-shield",type:"active",name:"大盾"}]');
replace('name:"易伤",limit:3','name:"易伤"');replace('name:"技能封锁",limit:1','name:"技能封锁",limit:2');
replace('const ABILITIES=defineModule("abilities",{','const ABILITIES=defineModule("abilities",{\n  tyrant:[{id:"tyrant-passive",type:"passive",name:"暴怒"},{id:"tyrant-active",type:"active",name:"记录生命",limit:2}],\n  ascetic:[{id:"ascetic-passive",type:"passive",name:"禁止回血"},{id:"ascetic-active",type:"active",name:"免于致命伤害",limit:1}],');
// Passive suppression is independent of active and field suppression.
replace('function fighterHasSoloSkill(skillKey, fighter, wanted) {','function fighterHasSoloSkill(skillKey, fighter, wanted, type="normal") {\n  if(fighter.hp<=0||fighter.skipped)return false;\n  if(type!=="active"&&type!=="field"&&hasPassive258(wanted)&&(fighter.passiveSeals||[]).some(side=>state[side]?.hp>0))return false;');
fn('skillEnabledMp',`function skillEnabledMp(f,key=f.skill,abilityType="normal") {
  if(f.skipped)return false;
  if(abilityType!=="active"&&abilityType!=="field"&&hasPassive258(key)&&(f.passiveSeals||[]).some(id=>mpState.fighters[id]?.alive))return false;
  return hasMpSkill(f,key)&&!f.roundFlags.skillStolen&&(abilityType==="field"||!mpState.global.disabledSkillTeams.has(f.team));
}`);
fn('maybeUseSoloNightAtRoundEnd','async function maybeUseSoloNightAtRoundEnd(){\n  return false;\n}');
fn('maybeUseMpNightAtRoundEnd','async function maybeUseMpNightAtRoundEnd(){\n  return false;\n}');
fn('applySoloSunFieldDamage','function applySoloSunFieldDamage(){\n  // Third edition forbids the declared weapon instead of dealing delayed damage.\n}');
// Generalist remembers the preceding gesture across round boundaries.
replace('&&state[who].boostForge','&&state[who].lastMove==="forge"');
replace('&&f.boostForge','&&f.previousMove==="forge"');
replace('const key=actions.get(f.id); f.lastMove=key;','const key=actions.get(f.id); if(!key)continue; f.previousMove=f.lastMove; f.lastMove=key;');
replace('  return events;\n}\n\nfunction endGame()', '  state[who].lastMove=moveKey;\n  if(moveKey==="bigShield")state[who].bigShieldUsed=true;\n  return events;\n}\n\nfunction endGame()');
replace('const cost=mpMoveCost(f,key); f.energy=Math.max(0,f.energy-cost);','const cost=mpMoveCost(f,key); f.energy=Math.max(0,f.energy-cost); if(key==="bigShield")f.bigShieldUsed=true;');
html=html.split('\n').filter(l=>!l.includes('generalistBoostPending=true')&&!l.includes('generalistBoostPending = true')&&!l.includes('if(fighterHasSoloSkill(skill,state[who],"generalist")&&state[who].generalistBoostPending)')&&!l.includes('if(skillEnabledMp(f,"generalist")&&f.generalistBoostPending)')).join('\n');
replace('if(key==="catch")f.energy+=.5','if(key==="catch")f.energy+=.25');
replace('if (moveKey === "catch") { state[who].energy += .5;','if (moveKey === "catch") { state[who].energy += .25;');replace('接返还0.5能量','接返还0.25能量');
replace('state[who].energy+=.5;state[who].observerCatch=true;','state[who].energy+=1;state[who].observerStance="rage";');
replace('使用接获得0.5能量','使用接获得1锻并进入暴怒');
replace('f.energy+=.5;f.observerCatch=true;','f.energy+=1;f.observerStance="rage";');
replace('if(skillEnabledMp(attacker,"observer")&&attacker.observerCatch)damage+=.5;','if(skillEnabledMp(attacker,"observer"))damage*=attacker.observerStance==="rage"?2:.5;');
replace('if(victim.observerCatch)damage+=.5;','if(attack.key&&skillEnabledMp(victim,"observer"))damage*=victim.observerStance==="rage"?2:.5;');
replace('  if(state.player.observerCatch){if(damage.player>0)damage.player+=.5;if(damage.ai>0)damage.ai+=.5;}\n  if(state.ai.observerCatch){if(damage.ai>0)damage.ai+=.5;if(damage.player>0)damage.player+=.5;}',`  for(const who of ["player","ai"]){
    const skill=who==="player"?ps:as;
    if(fighterHasSoloSkill(skill,state[who],"observer")){const factor=state[who].observerStance==="rage"?2:.5;damage.player*=factor;damage.ai*=factor;}
  }`);
replace('{...attack,damage:.5}:attack','{...attack,damage:.5,trueDamage:true}:attack');
replace('fighterHasSoloSkill(playerSourceSkill,state[finalAttacker.player],"sun"),events','(fighterHasSoloSkill(playerSourceSkill,state[finalAttacker.player],"sun")||(aiKey==="katana"&&playerKey==="guard"&&fighterHasSoloSkill(playerSourceSkill,state[finalAttacker.player],"warrior"))),events');
replace('fighterHasSoloSkill(aiSourceSkill,state[finalAttacker.ai],"sun"),events','(fighterHasSoloSkill(aiSourceSkill,state[finalAttacker.ai],"sun")||(playerKey==="katana"&&aiKey==="guard"&&fighterHasSoloSkill(aiSourceSkill,state[finalAttacker.ai],"warrior"))),events');
replace('if (fighterHasSoloSkill(item.skill,fighter,"reaper") && dealtEvent)','if (false)');
html=html.split('\n').filter(l=>!l.includes('if(skillEnabledMp(attacker,"reaper"))')&&!l.includes('if(skillEnabledMp(attacker,"apprentice"))')).join('\n');
// Remove the old damage-triggered apprentice branch; on-hit acquisition is centralized below.
html=html.replace(/    if\(didDeal&&fighterHasSoloSkill\(item.skill,f,"apprentice"\)\)\{[\s\S]*?\n    }/,'');
replace('  const damage=timing.prevented?0:await applyMpDamage', '  await hitSkills258(timing.attack.attacker,victim,attack.key,events,true);\n  const damage=timing.prevented?0:await applyMpDamage');
replace('  roundEvent.phase="before-damage";',`  for(const target of ["player","ai"])if(roundEvent.hit[target])await hitSkills258(finalAttacker[target],target,target==="player"?aiKey:playerKey,events,false);
  roundEvent.phase="before-damage";`);
// Removed old sun retaliation and shield-sharing field.
html=html.replace(/  for\(const f of aliveMp\(\).filter\(x=>x.roundFlags.sunDeclare\)\)\{[\s\S]*?\n  }/,'');
html=html.split('\n').filter(l=>!l.includes('skillEnabledMp(f,"bulwark","field")')&&!l.includes('if(d.type==="bulwark")')&&!l.includes('const shieldHelper=')&&!l.includes('if(shieldHelper&&')).join('\n');
// Singularity is once at each round opening, with two domain uses per game.
replace('f.singularityUses--;','');replace('h.activeUses.singularity--;','h.roundFlags.singularityUsed=true;');replace('f.activeUses.singularity--;','f.roundFlags.singularityUsed=true;');
replace('&&h.activeUses.singularity>0','&&!h.roundFlags.singularityUsed');replace('&& f.activeUses.singularity>0','&& !f.roundFlags.singularityUsed');
replace('&&f.singularityUses>0&&state.player.vulnerable<1.5','&&!f.singularityUsedThisRound&&(state.roundActionCount||0)===1');
replace('if(fighterHasSoloSkill(skill,f,"singularity")&&f.singularityUses>0','if(opening&&fighterHasSoloSkill(skill,f,"singularity","active")');
replace('f.emperorGifted=false;f.shepherdReduction=0;','f.bigShieldUsed=false;f.emperorGifted=false;f.shepherdReduction=0;');
replace('f.damagedThisRound=false;f.judgementHitThisRound=false;', 'f.bigShieldUsed=false;f.damagedThisRound=false;f.judgementHitThisRound=false;');
// Only allied deaths can replace the diviner doll.
replace('aliveMp().filter(x=>skillEnabledMp(x,"diviner"))','aliveMp().filter(x=>x.team===f.team&&skillEnabledMp(x,"diviner","active"))');
// Do not conjure a replacement dragon while the current dragon still exists.
replace('if(skillEnabledMp(timing.attack.attacker,"dragonKnight")&&attack.key==="dragonFang")','if(skillEnabledMp(timing.attack.attacker,"dragonKnight")&&attack.key==="dragonFang"&&timing.attack.attacker.dragon<=0)');
replace('if(fighterHasSoloSkill(sourceSkill,state[source],"dragonKnight"))','if(fighterHasSoloSkill(sourceSkill,state[source],"dragonKnight")&&state[source].dragon<=0)');
replace('if(fighter.hp<=0||fighter.skipped)return false;','if(fighter.skipped)return false;');
// New opening actions and one-shot windows are shared by human and AI paths.
replace('  const list=[];\n  const opening=', '  const list=[];\n  const opening=');
replace('  if(opening&&fighterOwnsSoloSkill(skill,f,"sun")', '  if(opening&&fighterHasSoloSkill(skill,f,"tyrant","active")&&f.tyrantUses>0&&!f.tyrantRestore)list.push(["tyrant","暴君：记录生命并降至1"]);\n  if(opening&&fighterOwnsSoloSkill(skill,f,"sun")');
replace('  if(key==="pioneer"){f.pioneerUses--;','  if(key==="tyrant")activateTyrant258(f,state.round);\n  if(key==="pioneer"){f.pioneerUses--;');
replace('  const buttons=[];\n  const opening=mpState?.phase==="round-start";', '  const buttons=[];\n  if(h.skipped)return buttons;\n  const opening=mpState?.phase==="round-start";\n  if(opening&&skillEnabledMp(h,"tyrant","active")&&h.tyrantUses>0&&!h.tyrantRestore)buttons.push(["tyrant","记录生命并降至1"]);');
replace('  const h=getHuman(); if(!h?.alive)return;', '  const h=getHuman(); if(!h?.alive||h.skipped||!getMpActiveActions(h).some(([action])=>action===key))return;');
replace('  if(state.busy)return;const f=state.player;', '  if(state.busy)return;const f=state.player;\n  if(!getSoloActiveActions(data.settings.playerSkill,f).some(([action])=>action===key))return;');
replace('  if(key==="nightField"){h.fieldUses.night--;','  if(key==="tyrant")activateTyrant258(h,mpState.round);\n  if(key==="nightField"){h.fieldUses.night--;');
replace('  if(!f.alive)return;\n  if(skillEnabledMp(f,"magician")','  if(!f.alive||f.skipped)return;\n  if(skillEnabledMp(f,"tyrant","active")&&f.tyrantUses>0&&!f.tyrantRestore&&aiUsesSkill(.45)&&await mpActiveAllowed(f))activateTyrant258(f,mpState.round);\n  if(skillEnabledMp(f,"magician")');
replace('  const hasUsableActive=', '  if((state.roundActionCount||0)===1&&fighterHasSoloSkill(skill,f,"tyrant","active")&&f.tyrantUses>0&&!f.tyrantRestore&&useSkill(.5)&&await soloActiveAllowed("ai"))activateTyrant258(f,state.round);\n  const hasUsableActive=');
replace('    if(roundReset){\n      if(f.singularityAttackPenalty)', '    if(roundReset){\n      restoreTyrant258(f,state.round,events);\n      if(f.singularityAttackPenalty)');
replace('  for(const f of aliveMp()){\n    if(skillEnabledMp(f,"demon"))','  for(const f of aliveMp()){\n    restoreTyrant258(f,mpState.round,events);\n    if(skillEnabledMp(f,"demon"))');
// Black Night chooses a target at game initialization; it never rewinds the game.
replace('  clearScoreFeedback();\n  render();', '  if(data.settings.skillsEnabled)await initNightSolo258();\n  clearScoreFeedback();\n  render();');
replace('  if(initial){\n    for(const keeper', '  if(initial){\n    await initNightMp258();\n    for(const keeper');
// A Sun declaration changes the legal move list (and validates already collected input).
replace('  return keys;\n}\n\nfunction skillMove', '  if(typeof state!=="undefined"){const other=fighter===state.player?state.ai:fighter===state.ai?state.player:null;if(other?.hp>0&&other.sunDeclare)keys=keys.filter(key=>key!==other.sunDeclare);}\n  return keys;\n}\n\nfunction skillMove');
replace('  return keys.filter(k=>k==="exit"?f.energy>=2:mpMoveCost(f,k)<=f.energy);','  return keys.filter(k=>mpMoveCost(f,k)<=f.energy&&!sunBannedMp258(f,k));');
replace('  const aiKey = chooseAiMove(data.settings.difficulty, createAiContext(), playerKey);\n  await prepareSoloAiActive(playerKey,aiKey);', '  let aiKey = chooseAiMove(data.settings.difficulty, createAiContext(), playerKey);\n  await prepareSoloAiActive(playerKey,aiKey);\n  if(data.settings.skillsEnabled){if(state.ai.sunDeclare===playerKey){state.roundActionCount--;state.busy=false;render();showToast("太阳领域禁止该武器，请重新选择");return;}if(!legalSkillMoves(state.ai.energy,data.settings.aiSkill,state.ai,data.settings.scissorsEnabled).includes(aiKey))aiKey=legalSkillMoves(state.ai.energy,data.settings.aiSkill,state.ai,data.settings.scissorsEnabled)[0];}');
replace('  if (state.busy || playerCost > state.player.energy) return;', '  if (state.busy || playerCost > state.player.energy || (data.settings.skillsEnabled&&!availableMoveKeys(data.settings.playerSkill,state.player,data.settings.scissorsEnabled).includes(playerKey))) return;');
replace('    const key=actions.get(f.id); if(!key)continue;', '    const key=actions.get(f.id); if(!key)continue; if(f.skipped||!mpLegalMoves(f).includes(key))throw new Error("非法或被太阳领域禁止的行动");');
// Keeper guaranteed hits still obey the established same-level resistance rule.
replace('  if (playerKey === "bigShield" || aiKey === "bigShield") return resolveBigShield(playerKey, aiKey);', '  if (playerKey === "bigShield" || aiKey === "bigShield") {const r=resolveBigShield(playerKey,aiKey);return keeperHit258(r,playerKey,aiKey,playerSkill,aiSkill,playerFighter,aiFighter);}');
replace('  return result;\n}\n\nfunction previewSkillDamage', '  return keeperHit258(result,playerKey,aiKey,playerSkill,aiSkill,playerFighter,aiFighter);\n}\n\nfunction previewSkillDamage');
replace('function mpDefensePreview(victim,key,attack) {','function mpDefensePreview(victim,key,attack) {\n  if(keeperAttack258(attack))return {blocked:false,reset:false};');
replace('async function mpDefenseResult(victim,key,attack) {','async function mpDefenseResult(victim,key,attack) {\n  if(keeperAttack258(attack))return {blocked:false,reset:false,text:"窥秘必定命中"};');
replace('!attack.done&&!attack.declared&&attack.attacker.id!==moon.id', '!attack.done&&!attack.declared&&!keeperAttack258(attack)&&attack.attacker.team!==moon.team');
replace('    .filter(f=>!mpActionDefenseCoversAttack(f,attack.level,attacks))','    .filter(f=>keeperAttack258(attack)||!mpActionDefenseCoversAttack(f,attack.level,attacks))');
// Judge / Fisher challenges decide success without transferring duel damage to the main game.
fn('resolveSoloJudgeTriggers',`async function resolveSoloJudgeTriggers(damage,events){
  if(!damage.roundEvent?.reset||!(state.damageThisRound||Object.values(damage.roundEvent.damageDealt||{}).some(x=>x>0)))return;
  for(const who of ["player","ai"]){const other=who==="player"?"ai":"player",f=state[who];
    if(f.hp<=0||state[other].hp<=0||!soloHas258(who,"judge","active")||f.judgeUses<=0||!soloTargetAllowed(other))continue;
    if(!await chooseUse258(who,"审判者：本回合有伤害，是否发动无技能对局？"))continue;
    if(!await soloActiveAllowed(who))continue;f.judgeUses--;
    if(await resolveNoSkillChallenge(soloSide258(who),soloSide258(other)))await soloSkillDamage258(who,other,f.attack,events);
  }
}`);
fn('resolveMpJudgeDuel',`async function resolveMpJudgeDuel(judge,opponent,events){
  if(!await mpActiveAllowed(judge))return;
  judge.activeUses.judge--;judge.judgeArmed=false;
  if(await resolveNoSkillChallenge(judge,opponent)){await applyMpSkillDamage(judge,opponent,judge.attack,events,{allowJudge:false});events.push(judge.name+"·审判者：挑战获胜，造成一次伤害");}
}`);
html=html.replace(/  if\(allowJudge&&skillEnabledMp\(attacker,"judge"\)[\s\S]*?\n  }\n  if\(allowJudge&&skillEnabledMp\(victim,"judge"\)[\s\S]*?\n  }/,'');
html=html.split('\n').filter(l=>!l.includes('if(skillEnabledMp(victim,"judge")&&victim.activeUses.judge>0&&await wantsMpJudge(victim))')).join('\n');
replace('if(shouldReset&&new Set(aliveMp().map(f=>f.team)).size>1){settleMultiplayerRoundEndSkills(context);await settleMpDeaths(events);}', 'if(shouldReset&&new Set(aliveMp().map(f=>f.team)).size>1){await roundJudgesMp258(events);settleMultiplayerRoundEndSkills(context);await settleMpDeaths(events);}');
fn('soloActiveAllowed',`async function soloActiveAllowed(who){
  const other=who==="player"?"ai":"player";
  if(state[who].hp<=0||state[who].skipped)return false;
  if(!soloHas258(other,"fisherman","active")||state[other].hp<=0)return true;
  if(!await chooseUse258(other,"渔夫：是否挑战正在发动的主动技能？"))return true;
  if(await resolveNoSkillChallenge(soloSide258(other),soloSide258(who))){await soloSkillDamage258(other,who,1,state.pendingStartEvents);return false;}
  return true;
}`);
fn('mpActiveAllowed',`async function mpActiveAllowed(actor){
  if(!actor.alive||actor.hp<=0||actor.skipped)return false;
  for(const fisher of shuffleMp(aliveMp().filter(f=>f.id!==actor.id&&!f.skipped&&skillEnabledMp(f,"fisherman","active")))){
    if(!await chooseUse258(fisher,"渔夫：是否挑战"+actor.name+"的主动技能？"))continue;
    if(await resolveNoSkillChallenge(fisher,actor)){const events=[];await applyMpSkillDamage(fisher,actor,1,events,{allowJudge:false});await settleMpDeaths(events);events.forEach(s=>logMp(s,"skill"));return false;}
  }
  return actor.alive&&actor.hp>0;
}`);
// Saint stores a bonus for the next actual damage event. Body shields only trigger this skill.
html=html.replace(/    if\(fighterHasSoloSkill\(skill,f,"saint"\)\)\{[\s\S]*?\n    }\n    return \{damage:0,dealt,absorbedBy:"shield"\};/, '    if(fighterHasSoloSkill(skill,f,"saint","active"))f.saintPending=(f.saintPending||0)+1;\n    return {damage:0,dealt,absorbedBy:"shield"};');
fn('saintShieldLost',`async function saintShieldLost(victim,events){
  if(!skillEnabledMp(victim,"saint","active")||!await chooseUse258(victim,"圣斗士：失去护盾，是否令下次伤害+0.5？")||!await mpActiveAllowed(victim))return;
  victim.saintBonus=(victim.saintBonus||0)+.5;events.push(victim.name+"·圣斗士：下次造成的伤害+0.5");
}`);
replace('  let damage=attack.damage+(victim.vulnerable||0);','  let damage=attack.damage+(victim.vulnerable||0)+(attack.attacker.saintBonus||0);');
replace('  victim.hp-=damage;dealt+=damage;if(damage>0)', '  victim.hp-=damage;dealt+=damage;if(victim.hp<=0)victim.attackLethal=Boolean(attack.key);if(dealt>0)attack.attacker.saintBonus=0;if(damage>0)');
replace('return dealt;}\n  }\n  victim.hp-=damage;', 'if(dealt>0)attack.attacker.saintBonus=0;return dealt;}\n  }\n  victim.hp-=damage;');
replace('  const playerSourceSkill=finalAttacker.player', '  for(const who of ["player","ai"]){const source=finalAttacker[who];if(damage[who]>0)damage[who]+=state[source].saintBonus||0;damage[who]=await asceticPreventSolo258(who,damage[who],events);}\n  const playerSourceSkill=finalAttacker.player');
replace('  state.ai.hp -= damage.ai;', '  state.ai.hp -= damage.ai;\n  for(const who of ["player","ai"]){if(state[who].hp<=0)state[who].attackLethal=Boolean(roundEvent.hit[who]);const absorb=who==="player"?playerAbsorb:aiAbsorb;if(absorb.dealt>0)state[finalAttacker[who]].saintBonus=0;await saintSolo258(who,events);}');
replace('  if(!attack.trueDamage){','  if(await asceticPreventMp258(victim,damage,attack.trueDamage,events))return 0;\n  if(!attack.trueDamage){');
// Shadow resolves before death batches. Only a lethal weapon hit bypasses its safeguard.
replace('  const dead=new Set();\n  while(true){','  const dead=new Set();\n  while(true){\n    for(const who of ["player","ai"])if(state[who].hp<=0&&!state[who].attackLethal&&soloHas258(who,"shadow")){state[who].hp=1;events.push("暗影：非攻击命中导致的死亡被替换为1血");}');
replace('  while(true){\n    const batch=mpState.fighters.filter(x=>x.alive&&x.hp<=0);','  while(true){\n    for(const f of aliveMp())if(f.hp<=0&&!f.attackLethal&&skillEnabledMp(f,"shadow")){f.hp=1;events.push(f.name+"·暗影：非攻击命中导致的死亡被替换为1血");}\n    const batch=mpState.fighters.filter(x=>x.alive&&x.hp<=0);');
replace('async function resolveSoloMonsterDuel(victim,attacker,owner,events){','async function resolveSoloMonsterDuel(victim,attacker,owner,events){\n  if(soloHas258(victim,"shadow")||soloHas258(attacker,"shadow")){events.push("暗影：猜拳视为胜利");return {prevented:soloHas258(victim,"shadow")};}');
replace('async function resolveMpMonsterDuel(victim,attacker,owner,events){','async function resolveMpMonsterDuel(victim,attacker,owner,events){\n  if(skillEnabledMp(victim,"shadow")||skillEnabledMp(attacker,"shadow")){events.push("暗影：猜拳视为胜利");return {prevented:skillEnabledMp(victim,"shadow")};}');
replace('victim.hp=0;const base=', 'victim.attackLethal=false;victim.hp=0;const base=');
replace('target.hp=0;target.lastDamageSource=f.id;', 'target.attackLethal=false;target.hp=0;target.lastDamageSource=f.id;');
// Any positive HP increment uses one guard, including copied skills and death healing.
html=html.replace(/((?:state\[[^\]]+\]|state\.(?:player|ai)|[a-zA-Z]+))\.hp\s*\+=\s*([^;]+);/g,'gainHp258($1,$2);');
html=html.replace(/\b(keeper|attacker)\.hp\+\+;/g,'gainHp258($1,1);');
// No finite recharge options for removed/unlimited skills; include field effects and new limited actives.
html=html.replace(/add\("(?:audience|night|singularity)",[^;]+;/g,'');
replace('  if(fighterHasSoloSkill(base,fighter,"shepherd"))', '  add("tyrant","tyrantUses","暴君·记录生命");add("ascetic","asceticUses","苦修·免死");add("sun","sunFieldUses","太阳·领域");add("singularity","singularityFieldUses","奇点·领域");\n  if(fighterHasSoloSkill(base,fighter,"shepherd"))');
replace('  if(hasMpSkill(f,"shepherd"))', '  add("sun","fieldUses","sun","太阳·领域");add("night","fieldUses","night","黑夜·领域");add("aurora","fieldUses","aurora","极光·领域");add("singularity","fieldUses","singularity","奇点·领域");\n  for(const [skill,field] of [["tyrant","tyrantUses"],["ascetic","asceticUses"]])if(hasMpSkill(f,skill))entries.push({value:field,label:SKILLS[skill].name,remaining:f[field],apply:()=>f[field]++});\n  if(hasMpSkill(f,"shepherd"))');
// Timing: opening-only actions are not offered between gestures.
for(const key of ['pioneer','blackEmperor','shepherd'])html=html.replaceAll('if(fighterHasSoloSkill(skill,f,"'+key+'")','if(opening&&fighterHasSoloSkill(skill,f,"'+key+'","active")');
// The preceding replacement only belongs to the action-list function; AI has its own opening variable.
replace('  const f=state.ai,skill=data.settings.aiSkill;', '  const f=state.ai,skill=data.settings.aiSkill,opening=(state.roundActionCount||0)===1;');
replace('  const fieldAction=key==="sunField"||key==="singularityField";', '  const fieldAction=key==="sunField"||key==="singularityField"||key==="shepherdDomain";');
// UI must never permit a retired combatant to submit actions.
replace('if(!mpState||mpState.over||getHuman()?.alive||mpState.autoTimer)return;', 'if(!mpState||mpState.over||(getHuman()?.alive&&!getHuman()?.skipped)||mpState.autoTimer||mpState.responsePending)return;');
replace('if (!h?.alive || mpState.over)', 'if (!h?.alive || h.skipped || mpState.over)');
replace('你已被淘汰，比赛由存活AI自动继续。','你暂不参与，比赛由在场AI自动继续。');
replace(' f.skipped=false; f.roundFlags={};', ' f.skipped=Boolean(f.retreatUntil>=mpState.round); f.roundFlags={};');
// Preserve the paid attack queue; retirement starts at the next round boundary.
replace('  damage.events=events;damage.roundEvent=roundEvent;', '  await resolveSoloAudience258(roundEvent,playerKey,aiKey,events);\n  damage.events=events;damage.roundEvent=roundEvent;');
replace('  await afterMpDamage(timing.attack.attacker,victim,damage,events);','  await afterMpDamage(timing.attack.attacker,victim,damage,events);\n  await audienceMp258(timing.attack.attacker,attack.key,events);');
replace('  return keys;\n}\n\nfunction skillMove', '  return keys;\n}\n\nfunction skillMove');
// Keep passive Pioneer replacement separate from its opening-only active skill.
replace('if(opening&&fighterHasSoloSkill(skill,f,"pioneer","active")){f.hp-=1;', 'if(fighterHasSoloSkill(skill,f,"pioneer")){f.hp-=1;');
replace('reset:Boolean(result.reset)','reset:basicRoundShouldReset(result)');
// Optional Assassin activation happens after final attribution, before the damage modifiers.
html=html.split('\n').filter(l=>!l.includes('if (aiDamage > 0 && fighterHasSoloSkill(playerSkill,player,"assassin")')&&!l.includes('if (playerDamage > 0 && fighterHasSoloSkill(aiSkill,ai,"assassin")')).join('\n');
replace('const assassinBonus=skillEnabledMp(attacker,"assassin")&&key==="knife"&&!attacker.assassinUsed;', 'const assassinBonus=false;');
html=html.replace(/if\(attackKey==="knife"&&fighterHasSoloSkill\(replacementSkill,state\[replacement\],"assassin"\)&&!state\[replacement\].assassinUsed\)damage\+=.5;/g,'');
html=html.replace(/rewritten.assassinBonus=skillEnabledMp\(replacement,"assassin"\)&&rewritten.key==="knife"&&!replacement.assassinUsed;if\(rewritten.assassinBonus\)rewritten.damage\+=.5;/g,'rewritten.assassinBonus=false;');
html=html.replace(/    if\(hit&&key==="knife"&&fighterHasSoloSkill\(sourceSkill,state\[source\],"assassin"\)&&!state\[source\].assassinUsed\)state\[source\].assassinUsed=true;/g,'');
replace('  for(const who of ["player","ai"]){\n    const skill=who==="player"?ps:as;', '  for(const target of ["player","ai"])if(roundEvent.hit[target])damage[target]+=await assassin258(finalAttacker[target],target==="player"?aiKey:playerKey,events,false);\n  for(const who of ["player","ai"]){\n    const skill=who==="player"?ps:as;');
replace('  await hitSkills258(timing.attack.attacker,victim,attack.key,events,true);','  timing.attack.damage+=await assassin258(timing.attack.attacker,attack.key,events,true);\n  await hitSkills258(timing.attack.attacker,victim,attack.key,events,true);');
replace('      magician.magicianUses--;','      if(!await soloActiveAllowed(magicianWho))continue;\n      magician.magicianUses--;');
replace('      magician.activeUses.magician--;','      if(!await mpActiveAllowed(magician))continue;\n      magician.activeUses.magician--;');
replace('  if(sacrifice>=.5){','  if(sacrifice>=.5&&await mpActiveAllowed(attacker)){');
// True damage lethal prevention must not count shields or summons as protection.
replace('damage[who]=await asceticPreventSolo258(who,damage[who],events);','const key=who==="player"?aiKey:playerKey,defense=who==="player"?playerKey:aiKey;const truth=soloHas258(source,"sun")||(key==="katana"&&defense==="guard"&&soloHas258(source,"warrior"));damage[who]=await asceticPreventSolo258(who,damage[who],events,truth);');
// All skill damage uses Sun/Tyrant; a zero damage event can still be replaced by Tyrant.
replace('  let damage=attack.damage+(victim.vulnerable||0)+(attack.attacker.saintBonus||0);', '  let damage=attack.damage+(victim.vulnerable||0)+(attack.attacker.saintBonus||0);\n  if(!attack.key&&skillEnabledMp(attack.attacker,"tyrant")&&attack.attacker.hp<=1)damage=10;\n  if(skillEnabledMp(attack.attacker,"sun"))attack={...attack,trueDamage:true};');
// Existing game snapshots copy counts; the recipient never receives a fresh set of spent charges.
replace('  f.thiefUses--;f.thiefBorrowed=', '  const previousExtras=[...f.extraSkills];copyRemaining258(f,victim,false);f.extraSkills=previousExtras;\n  f.thiefUses--;f.thiefBorrowed=');
replace('h.skills.push(...added);t.roundFlags.skillStolen=true;', 'const previousSkills=[...h.skills];copyRemaining258(h,t,true);h.skills=previousSkills;h.skills.push(...added);t.roundFlags.skillStolen=true;');
replace('f.skills.push(...added);t.roundFlags.skillStolen=true;', 'const previousSkills=[...f.skills];copyRemaining258(f,t,true);f.skills=previousSkills;f.skills.push(...added);t.roundFlags.skillStolen=true;');
// Third-edition self-check expectations replace the previous shield price.
replace('    if(f.thiefBorrowed){','    if(f.thiefBorrowed&&(roundReset||deaths[other])){');
replace('if(!fighterHasSoloSkill(skill,attacker,"hangedMan")||attacker.hp<=0)', 'if(!fighterHasSoloSkill(skill,attacker,"hangedMan","active")||attacker.hp<=0)');
replace('if(amount>0){const paid=commitHangedSacrifice', 'if(amount>0&&await soloActiveAllowed(attackerWho)){const paid=commitHangedSacrifice');
replace('!skillEnabledMp(attacker,"hangedMan")','!skillEnabledMp(attacker,"hangedMan","active")');
replace('skillEnabledMp(payload.attack.attacker,"hangedMan")','skillEnabledMp(payload.attack.attacker,"hangedMan","active")');
replace('state[payload.attacker],"hangedMan")','state[payload.attacker],"hangedMan","active")');
replace('skillEnabledMp(h,"pioneer")','skillEnabledMp(h,"pioneer","active")');
replace('skillEnabledMp(f,"pioneer") && f.activeUses.pioneer','skillEnabledMp(f,"pioneer","active") && f.activeUses.pioneer');
// Black Night must not disable Mother, Ascetic and other active components.
replace('    if (fighterHasSoloSkill(skill,state[who],"mother") && state.damageLastRound)', '    if (state[who].hp>0&&fighterHasSoloSkill(skill,state[who],"mother","active") && state.damageLastRound)');
replace('if(target==="skip")continue;', 'if(target==="skip"||!await soloActiveAllowed(who))continue;');
replace('      if(target){gainHp258(target,.5);','      if(target&&await mpActiveAllowed(f)){gainHp258(target,.5);');
// Correct stale projection/description text that would otherwise advertise removed skills.
replace('太阳宣言：选择本回合监视的攻击','太阳宣言：选择本回合禁止敌方使用的攻击');
replace('补充主动次数','补充限次技能次数');
replace('fighter.energy=1;mpState={fighters:[fighter]', 'fighter.energy=2;mpState={fighters:[fighter]');
replace('mpMoveCost(fighter,"bigShield")===1','mpMoveCost(fighter,"bigShield")===2');
// Track low-HP inactivity through complete rounds in the duel path.
replace('    fighter.dealtDamageLastRound = dealtEvent;', '    fighter.dealtDamageLastRound = fighter.dealtDamageLastRound||dealtEvent;\n    fighter.tookDamageLastRound = fighter.tookDamageLastRound||takenEvent;');
replace('async function applyStartOfRoundSkills() {\n  const events = [];','async function applyStartOfRoundSkills() {\n  const events = [];\n  for(const who of ["player","ai"]){const f=state[who];if(state.round>1&&!f.skipped&&mpDiesFromInactivity(f)){f.hp=0;f.attackLethal=false;events.push("回合开始前：低于1血且上一回合未造成或受到伤害，直接死亡");}f.dealtDamageLastRound=false;f.tookDamageLastRound=false;}');
replace('for(const f of aliveMp())if(mpDiesFromInactivity(f))', 'for(const f of aliveMp())if(!f.skipped&&mpDiesFromInactivity(f))');
// Death removes the owner's retirement effects and marks.
replace('  const remainingFields=mpState.fieldDeclarations.filter', '  for(const f of aliveMp()){if(f.retreatOwner!=null&&!mpState.fighters[f.retreatOwner]?.alive){f.retreatUntil=0;f.skipped=false;}if(f.markedBy!=null&&!mpState.fighters[f.markedBy]?.alive)f.markedBy=null;}\n  const remainingFields=mpState.fieldDeclarations.filter');
// Retreat is simulated for one complete subsequent round in a duel; omitted fighters do not act.
replace('  state.pendingStartEvents=[...(state.pendingStartEvents||[]),...await applyStartOfRoundSkills()];','  await advanceSoloRetreat258();\n  state.pendingStartEvents=[...(state.pendingStartEvents||[]),...await applyStartOfRoundSkills()];');
replace('  state.preparedRound=state.round;', '  state.preparedRound=state.round;\n  await initNightSolo258();');
replace('  if(openingEvents.length)checkMpWinner();', '  if(openingEvents.length&&checkMpWinner())return;\n  if(aliveMp().some(f=>f.skipped)&&new Set(aliveMp().filter(f=>!f.skipped).map(f=>f.team)).size<=1){const events=[];settleMultiplayerRoundEndSkills({events});await settleMpDeaths(events);events.forEach(s=>logMp(s,"skill"));if(checkMpWinner())return;mpState.round++;mpState.step=1;await beginMpRound();}');
// Update AI projections for changed cheap defense and consecutive forge.
replace('state[who].usedMovesThisRound.push(key);','(state[who].usedMovesThisRound||=[]).push(key);');
replace('if (skillEnabledMp(f,"blackEmperor") && f.shields>0 && !f.human)', 'if (skillEnabledMp(f,"blackEmperor","active") && f.shields>0 && !f.human&&await mpActiveAllowed(f))');
replace('if(replace){diviner.doll=1;', 'if(replace&&await mpActiveAllowed(diviner)){diviner.doll=1;');
// A storm blade is level 1.5 in duel defense comparisons as well as attack comparisons.
replace('  if (fighterHasSoloSkill(playerSkill,playerFighter,"warrior")', '  if(playerStorm&&["catch","flash"].includes(aiKey))result={playerHit:false,aiHit:true,reset:false,title:"风暴之刃命中",detail:"1.5级不在接、普通闪的防御范围内。"};\n  if(aiStorm&&["catch","flash"].includes(playerKey))result={playerHit:true,aiHit:false,reset:false,title:"风暴之刃命中",detail:"1.5级不在接、普通闪的防御范围内。"};\n  if (fighterHasSoloSkill(playerSkill,playerFighter,"warrior")');
// Attribute observer multipliers to the final weapon source only, not counter-skill damage.
html=html.replace(/  for\(const who of \["player","ai"\]\)\{\n    const skill=who==="player"\?ps:as;\n    if\(fighterHasSoloSkill\(skill,state\[who\],"observer"\)\)\{const factor=state\[who\].observerStance==="rage"\?2:.5;damage.player\*=factor;damage.ai\*=factor;}\n  }/,`  for(const target of ["player","ai"])if(roundEvent.hit[target]){const source=finalAttacker[target];if(soloHas258(source,"observer"))damage[target]*=state[source].observerStance==="rage"?2:.5;if(soloHas258(target,"observer"))damage[target]*=state[target].observerStance==="rage"?2:.5;}`);
replace('skill === "generalist" && fighter.boostForge','skill === "generalist" && fighter.lastMove==="forge"');
replace('if (skill === "guardian" && moveKey === "catch") value += .5;','if (skill === "guardian" && moveKey === "catch") value += .25;');
// Remove dead legacy entry points; neither UI nor scripted callers can activate them.
html=html.split('\n').filter(l=>!l.includes('if(key==="hook"&&')&&!l.includes('if(key==="bulwark"){')&&!l.includes('if(key==="fisherman"&&')).join('\n');
html=html.replace('/* js/storage.js */',fs.readFileSync('output/v2.5.8-work/helpers.js','utf8')+'\n/* js/storage.js */');
write();
console.log('Created '+path);
