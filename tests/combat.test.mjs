import assert from "node:assert/strict";
import { resolveCombat } from "../js/combat.js";
import { MOVE_KEYS, MOVES } from "../js/moves.js";

assert.equal(resolveCombat("forge", "knife").playerHit, true, "锻造应被攻击命中");
assert.equal(resolveCombat("knife", "guard").aiHit, false, "防应挡住小刀");
assert.equal(resolveCombat("shuriken", "guard").aiHit, true, "防不应挡住手里剑");
assert.equal(resolveCombat("katana", "catch").reset, true, "接住武士刀后应重置");
assert.equal(resolveCombat("knife", "catch").aiHit, true, "接不应挡住小刀");
assert.equal(resolveCombat("dragonFang", "flash").reset, true, "闪应挡住龙牙");
assert.equal(resolveCombat("void", "flash").aiHit, true, "闪不应挡住虚无");
assert.equal(resolveCombat("katana", "katana").playerHit, true, "同级应互杀");
assert.equal(resolveCombat("katana", "katana").aiHit, true, "同级应互杀");
assert.equal(resolveCombat("shuriken", "knife").aiHit, true, "高级应压制低级");

for (const player of MOVE_KEYS) {
  for (const ai of MOVE_KEYS) {
    const result = resolveCombat(player, ai);
    assert.equal(typeof result.playerHit, "boolean");
    assert.equal(typeof result.aiHit, "boolean");
    assert.ok(MOVES[player] && MOVES[ai]);
  }
}

console.log(`通过：${MOVE_KEYS.length ** 2} 组招式组合与核心规则测试。`);
