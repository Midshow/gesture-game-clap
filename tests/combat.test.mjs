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
assert.equal(resolveCombat("katana", "katana").playerHit, false, "同级抵刀时玩家不应受伤");
assert.equal(resolveCombat("katana", "katana").aiHit, false, "同级抵刀时AI不应受伤");
assert.equal(resolveCombat("shuriken", "knife").aiHit, true, "高级应压制低级");
assert.equal(resolveCombat("scissors", "knife").aiHit, true, "剪刀应克制小刀");
assert.equal(resolveCombat("scissors", "katana").aiHit, true, "剪刀应克制武士刀");
assert.equal(resolveCombat("scissors", "shuriken").aiHit, true, "剪刀应克制手里剑");
assert.equal(resolveCombat("scissors", "catch").aiHit, true, "剪刀应克制接");
assert.equal(resolveCombat("scissors", "guard").aiHit, false, "防应挡住剪刀");
assert.equal(resolveCombat("scissors", "flash").reset, true, "闪掉剪刀后应重置");
assert.equal(resolveCombat("scissors", "forge").playerHit, true, "锻造应克制剪刀");
assert.equal(resolveCombat("scissors", "kunai").playerHit, true, "苦无应克制剪刀");
assert.equal(resolveCombat("scissors", "dragonFang").playerHit, true, "龙牙应克制剪刀");
assert.equal(resolveCombat("scissors", "void").playerHit, true, "虚无应克制剪刀");

for (const player of MOVE_KEYS) {
  for (const ai of MOVE_KEYS) {
    const result = resolveCombat(player, ai);
    assert.equal(typeof result.playerHit, "boolean");
    assert.equal(typeof result.aiHit, "boolean");
    assert.ok(MOVES[player] && MOVES[ai]);
  }
}

console.log(`通过：${MOVE_KEYS.length ** 2} 组招式组合与核心规则测试。`);
