const { MOVES, MOVE_KEYS, resolveDuelCombat, basicRoundShouldReset, basicEnergyAfterRound } = require('./core');

function settings(value) {
  value = value || {};
  return { winScore: [1, 3, 5].includes(value.winScore) ? value.winScore : 3,
    scissors: value.scissors === true, difficulty: value.difficulty === 'easy' ? 'easy' : 'normal' };
}
function createMatch(options) {
  return { settings: settings(options), playerEnergy: 0, aiEnergy: 0, playerScore: 0,
    aiScore: 0, round: 1, step: 1, over: false, history: [], log: [] };
}
function legalMoves(energy, scissors) {
  return MOVE_KEYS.filter(key => (scissors || key !== 'scissors') && MOVES[key].cost <= energy);
}
// Initial mobile AI: uses only public resources and previous moves. The current
// human choice is deliberately not an argument. It commits before input opens.
function chooseAi(state, random = Math.random) {
  if (state.aiEnergy === 0 && state.playerEnergy === 0) return 'forge';
  if (state.aiEnergy >= 6) return 'void';
  const own = legalMoves(state.aiEnergy, state.settings.scissors);
  if (state.settings.difficulty === 'easy') return own[Math.min(own.length - 1, Math.floor(random() * own.length))];
  const opponents = legalMoves(state.playerEnergy, state.settings.scissors);
  const recent = state.history.slice(-12);
  const candidates = own.map(key => {
    let score = 0, total = 0;
    for (const other of opponents) {
      const weight = 1 + recent.filter(move => move === other).length + (other === 'forge' ? 1.5 : 0);
      const r = resolveDuelCombat(other, key), reset = basicRoundShouldReset(r);
      const energy = basicEnergyAfterRound(state.aiEnergy, key, r.aiHit, reset);
      score += weight * ((r.playerHit ? 10 : 0) - (r.aiHit ? 12 : 0) + energy * .55);
      total += weight;
    }
    return { key, score: score / total };
  });
  const best = Math.max(...candidates.map(c => c.score));
  const weights = candidates.map(c => Math.exp((c.score - best) / .9));
  let roll = random() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < candidates.length; i++) { roll -= weights[i]; if (roll <= 0) return candidates[i].key; }
  return candidates[candidates.length - 1].key;
}
function settle(state, player, ai) {
  if (state.over) throw new Error('对局已经结束');
  if (!legalMoves(state.playerEnergy, state.settings.scissors).includes(player) ||
      !legalMoves(state.aiEnergy, state.settings.scissors).includes(ai)) throw new Error('锻数不足或行动不可用');
  const result = resolveDuelCombat(player, ai);
  const reset = basicRoundShouldReset(result);
  const entry = { round: state.round, step: state.step, player, ai, title: result.title,
    detail: result.detail, reset, playerHit: result.playerHit, aiHit: result.aiHit };
  state.playerEnergy = basicEnergyAfterRound(state.playerEnergy, player, result.playerHit, reset);
  state.aiEnergy = basicEnergyAfterRound(state.aiEnergy, ai, result.aiHit, reset);
  if (result.aiHit && !result.playerHit) state.playerScore++;
  if (result.playerHit && !result.aiHit) state.aiScore++;
  state.history.push(player); state.history = state.history.slice(-24);
  state.log.unshift(entry); state.log = state.log.slice(0, 100);
  if (reset) { state.round++; state.step = 1; } else state.step++;
  state.over = Math.max(state.playerScore, state.aiScore) >= state.settings.winScore;
  return entry;
}
module.exports = { settings, createMatch, legalMoves, chooseAi, settle };
