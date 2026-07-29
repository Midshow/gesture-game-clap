import { MOVES, canAfford } from "./moves.js";
import { resolveCombat } from "./combat.js";
import { availableMoveKeys, moveCost, previewSkillDamage, resolveWithSkills, skillMove, whiteTowerRefunds } from "./skills.js";

const legalMoves = (energy, scissorsEnabled = false) => Object.keys(MOVES).filter(key => (scissorsEnabled || key !== "scissors") && canAfford(key, energy));
const legalSkillMoves = (energy, skill, fighter, scissorsEnabled = false) => availableMoveKeys(skill, scissorsEnabled).filter(key => moveCost(key, skill, fighter) <= energy);

const LEVELS = {
  easy:   { history: .35, noise: .9, explore: .10, responseRate: .15, risk: .12 },
  normal: { history: .70, noise: .35, explore: .03, responseRate: .30, risk: .24 },
  hard:   { history: 1.05, noise: .12, explore: .01, responseRate: .45, risk: .40 },
  hell:   { history: 1.35, noise: .03, explore: 0, responseRate: .65, risk: .58 }
};

function playerMoveWeights(playerEnergy, history, historyStrength, skill = null, fighter = {}, scissorsEnabled = false) {
  const candidates = skill ? legalSkillMoves(playerEnergy, skill, fighter, scissorsEnabled) : legalMoves(playerEnergy, scissorsEnabled);
  const recent = history.slice(-14);
  const counts = Object.fromEntries(candidates.map(key => [key, 0]));
  recent.forEach(key => {
    if (key in counts) counts[key]++;
  });

  return candidates.map(key => {
    const move = skillMove(key);
    let weight = 1;
    if (key === "forge") weight += playerEnergy <= 1 ? 2.4 : playerEnergy >= 5 ? -.45 : .55;
    if (move.type === "attack") {
      weight += playerEnergy >= move.cost ? .35 : 0;
      if (move.cost === playerEnergy) weight += .25;
    }
    if (key === "guard") weight += playerEnergy <= 1 ? .7 : .15;
    if (key === "catch" && playerEnergy >= 2) weight += .2;
    if (key === "flash" && playerEnergy >= 4) weight += .35;
    if (recent.length) weight += (counts[key] / recent.length) * 5 * historyStrength;
    return { key, weight: Math.max(.08, weight) };
  });
}

function futureEnergy(energy, moveKey) {
  const move = skillMove(moveKey);
  return Math.max(0, energy - move.cost + (move.gain || 0));
}

function scoreMatchup(playerKey, aiKey, aiEnergy, playerEnergy, context) {
  const result = context.skillsEnabled
    ? resolveWithSkills(playerKey, aiKey, context.playerSkill, context.aiSkill)
    : resolveCombat(playerKey, aiKey);
  let score = 0;
  if (context.skillsEnabled) {
    const damage = previewSkillDamage(
      result, playerKey, aiKey, context.playerSkill, context.aiSkill,
      context.playerFighter, context.aiFighter
    );
    score += damage.player * 5.5;
    score -= damage.ai * 6.5;
    if (damage.player >= context.playerFighter.hp) score += 28;
    if (damage.ai >= context.aiFighter.hp) score -= 34;
    if (damage.player === 0 && damage.ai === 0) score += .45;
    score += skillStrategyValue(aiKey, playerKey, damage, context);
  } else if (result.playerHit && !result.aiHit) score += 12;
  else if (result.aiHit && !result.playerHit) score -= 14;
  else score += .8;
  if (result.reset) score += aiEnergy < playerEnergy ? 2.2 : -.8;
  score += projectedEnergy("ai", aiEnergy, aiKey, context) * .32;
  score -= projectedEnergy("player", playerEnergy, playerKey, context) * .14;
  if (aiKey === "forge" && playerEnergy > 0) score -= .45;
  return score;
}

function projectedEnergy(who, energy, moveKey, context) {
  const move = skillMove(moveKey);
  if (!context.skillsEnabled) return futureEnergy(energy, moveKey);
  const skill = who === "ai" ? context.aiSkill : context.playerSkill;
  const fighter = who === "ai" ? context.aiFighter : context.playerFighter;
  let value = Math.max(0, energy - moveCost(moveKey, skill, fighter) + (move.gain || 0));
  if (skill === "whiteTower" && whiteTowerRefunds(moveKey, context.weaponHistory || [])) {
    value += moveCost(moveKey, skill, fighter);
  }
  if (skill === "generalist" && moveKey === "forge" && fighter.boostForge) value++;
  if (skill === "guardian" && moveKey === "guard") value += .25;
  if (skill === "guardian" && moveKey === "catch") value += .5;
  return value;
}

function skillStrategyValue(aiKey, playerKey, damage, context) {
  const skill = context.aiSkill;
  let value = 0;
  if (skill === "reaper" && damage.player > 0) value += 4;
  if (skill === "secretKeeper" && damage.player > 0) value += 2.5;
  if (skill === "generalist" && (damage.player > 0 || damage.ai > 0)) value += 1.2;
  if (skill === "mother" && damage.player > 0) value += .7;
  if (skill === "prisoner" && aiKey === "flash" && damage.ai === 0 && skillMove(playerKey).type === "attack") value += 2;
  if (skill === "storm" && aiKey === "katana" && damage.player === 0) value += .7;
  if (skill === "whiteTower" && whiteTowerRefunds(aiKey, context.weaponHistory || [])) {
    value += moveCost(aiKey, skill, context.aiFighter) * .7;
  }
  if (skill === "hunter" && context.aiFighter.hp <= 1 && context.playerFighter.hp <= 1) value += 3;
  if (skill === "tyrant" && context.aiFighter.hp <= 1 && damage.player > 0) value += 8;
  if (skill === "bulwark" && aiKey === "bigShield" && context.aiFighter.hp <= 1) value += 2;
  return value;
}

function weightedChoice(scored, temperature) {
  const max = Math.max(...scored.map(item => item.score));
  const weighted = scored.map(item => ({ ...item, weight: Math.exp((item.score - max) / temperature) }));
  let roll = Math.random() * weighted.reduce((sum, item) => sum + item.weight, 0);
  for (const item of weighted) {
    roll -= item.weight;
    if (roll <= 0) return item.key;
  }
  return weighted[weighted.length - 1].key;
}

export function chooseAiMove(difficulty, context, playerMove = null) {
  // Absolute rules requested by the game design. They intentionally run before
  // skill costs or strategic evaluation.
  if (context.aiEnergy === 0 && context.playerEnergy === 0) return "forge";
  if (context.aiEnergy === 6) return "void";

  const level = LEVELS[difficulty] || LEVELS.normal;
  const aiMoves = context.skillsEnabled
    ? legalSkillMoves(context.aiEnergy, context.aiSkill, context.aiFighter, context.scissorsEnabled)
    : legalMoves(context.aiEnergy, context.scissorsEnabled);
  const playerWeights = playerMoveWeights(
    context.playerEnergy, context.history, level.history,
    context.skillsEnabled ? context.playerSkill : null, context.playerFighter, context.scissorsEnabled
  );
  if (playerMove && Math.random() < level.responseRate) {
    return chooseReactiveMove(aiMoves, playerMove, context, level);
  }
  const totalWeight = playerWeights.reduce((sum, item) => sum + item.weight, 0);

  const scored = aiMoves.map(aiKey => {
    const matchupScores = playerWeights.map(player => ({
      score: scoreMatchup(player.key, aiKey, context.aiEnergy, context.playerEnergy, context),
      weight: player.weight
    }));
    const expected = matchupScores.reduce((sum, item) => sum + item.score * item.weight, 0) / totalWeight;
    const worstCase = Math.min(...matchupScores.map(item => item.score));
    const riskAdjusted = expected * (1 - level.risk) + worstCase * level.risk;
    return { key: aiKey, score: riskAdjusted + (Math.random() - .5) * level.noise };
  }).sort((a, b) => b.score - a.score);

  if (level.explore && Math.random() < level.explore) {
    return weightedChoice(scored, 2.5);
  }
  return weightedChoice(scored.slice(0, difficulty === "hell" ? 2 : 4), difficulty === "hell" ? .16 : .65);
}

function chooseReactiveMove(aiMoves, playerMove, context, level) {
  const scored = aiMoves.map(aiKey => ({
    key: aiKey,
    score: scoreMatchup(playerMove, aiKey, context.aiEnergy, context.playerEnergy, context)
      + (Math.random() - .5) * level.noise * .18
  })).sort((a, b) => b.score - a.score);

  const margin = level.responseRate >= .6 ? .12 : level.responseRate >= .4 ? .35 : .7;
  const nearBest = scored.filter(item => scored[0].score - item.score <= margin);
  return weightedChoice(nearBest, Math.max(.08, 1 - level.responseRate));
}
