import { MOVES, canAfford } from "./moves.js";
import { resolveCombat } from "./combat.js";

const legalMoves = energy => Object.keys(MOVES).filter(key => canAfford(key, energy));

const LEVELS = {
  easy:   { history: .20, noise: 1.8, explore: .18 },
  normal: { history: .55, noise: .8, explore: .08 },
  hard:   { history: .85, noise: .3, explore: .03 },
  hell:   { history: 1.15, noise: .08, explore: 0 }
};

function playerMoveWeights(playerEnergy, history, historyStrength) {
  const candidates = legalMoves(playerEnergy);
  const recent = history.slice(-14);
  const counts = Object.fromEntries(candidates.map(key => [key, 0]));
  recent.forEach(key => {
    if (key in counts) counts[key]++;
  });

  return candidates.map(key => {
    const move = MOVES[key];
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
  const move = MOVES[moveKey];
  return Math.max(0, energy - move.cost + (move.gain || 0));
}

function scoreMatchup(playerKey, aiKey, aiEnergy, playerEnergy) {
  const result = resolveCombat(playerKey, aiKey);
  let score = 0;
  if (result.playerHit && !result.aiHit) score += 12;
  else if (result.aiHit && !result.playerHit) score -= 14;
  else if (result.aiHit && result.playerHit) score -= 2.5;
  else score += .8;
  if (result.reset) score += aiEnergy < playerEnergy ? 2.2 : -.8;
  score += futureEnergy(aiEnergy, aiKey) * .28;
  score -= futureEnergy(playerEnergy, playerKey) * .12;
  if (aiKey === "forge" && playerEnergy > 0) score -= .45;
  return score;
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

export function chooseAiMove(difficulty, context) {
  const level = LEVELS[difficulty] || LEVELS.normal;
  const aiMoves = legalMoves(context.aiEnergy);
  const playerWeights = playerMoveWeights(context.playerEnergy, context.history, level.history);
  const totalWeight = playerWeights.reduce((sum, item) => sum + item.weight, 0);

  const scored = aiMoves.map(aiKey => {
    const expected = playerWeights.reduce(
      (sum, player) => sum + scoreMatchup(player.key, aiKey, context.aiEnergy, context.playerEnergy) * player.weight,
      0
    ) / totalWeight;
    return { key: aiKey, score: expected + (Math.random() - .5) * level.noise };
  }).sort((a, b) => b.score - a.score);

  if (level.explore && Math.random() < level.explore) {
    return weightedChoice(scored, 2.5);
  }
  return weightedChoice(scored.slice(0, difficulty === "hell" ? 2 : 4), difficulty === "hell" ? .16 : .65);
}
