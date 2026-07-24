import { ATTACK_KEYS, MOVES, canAfford } from "./moves.js";

const randomItem = items => items[Math.floor(Math.random() * items.length)];
const legalMoves = energy => Object.keys(MOVES).filter(key => canAfford(key, energy));

function counterMove(playerMove, energy) {
  const move = MOVES[playerMove];
  if (playerMove === "forge") return energy >= 1 ? "knife" : "forge";
  if (move.type === "attack") {
    const stronger = ATTACK_KEYS.find(key => MOVES[key].level === move.level + 1 && canAfford(key, energy));
    if (stronger) return stronger;
    if (move.level <= 2) return "guard";
    if ([2, 3].includes(move.level)) return "catch";
    if (move.level <= 5 && energy >= 2) return "flash";
    return canAfford(playerMove, energy) ? playerMove : "forge";
  }
  if (playerMove === "guard") return energy >= 3 ? "shuriken" : "forge";
  if (playerMove === "catch" || playerMove === "flash") return energy >= 1 ? "knife" : "forge";
  return "forge";
}

function strategicMove(context, strength) {
  const { aiEnergy, playerEnergy, history } = context;
  if (aiEnergy === 6) return "void";
  if (playerEnergy === 0 && aiEnergy > 0 && Math.random() < .5 + strength * .3) return "knife";
  const recent = history.slice(-8);
  const forgeRate = recent.length ? recent.filter(move => move === "forge").length / recent.length : .45;
  if (aiEnergy > 0 && forgeRate > .45 && Math.random() < strength) return aiEnergy >= 3 ? "shuriken" : "knife";
  if (playerEnergy >= 4 && aiEnergy >= 2 && Math.random() < .25 + strength * .3) return "flash";
  if (aiEnergy >= 3 && aiEnergy > playerEnergy && Math.random() < .35 + strength * .25) return "shuriken";
  if (aiEnergy < 2 && Math.random() < .72) return "forge";
  const weighted = [...legalMoves(aiEnergy), "forge", "guard"];
  return randomItem(weighted);
}

export function chooseAiMove(difficulty, context, playerMove) {
  if (context.aiEnergy === 0 && context.playerEnergy === 0) return "forge";
  if (difficulty === "mindreader" && Math.random() < .75) return counterMove(playerMove, context.aiEnergy);
  if (difficulty === "easy") {
    const pool = legalMoves(context.aiEnergy);
    return Math.random() < .28 ? "forge" : randomItem(pool);
  }
  return strategicMove(context, difficulty === "hard" ? .9 : .55);
}
