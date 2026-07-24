import assert from "node:assert/strict";
import { whiteTowerRefunds } from "../js/skills.js";

const previousWeapons = [];
assert.equal(
  whiteTowerRefunds("katana", previousWeapons),
  true,
  "双方本回合同时首次使用武士刀时，白塔仍应按先前回合记录获得返还"
);

previousWeapons.push("katana");
assert.equal(
  whiteTowerRefunds("katana", previousWeapons),
  false,
  "武士刀在先前回合出现后，白塔连续使用不应再次返还"
);

assert.equal(whiteTowerRefunds("forge", previousWeapons), false, "锻造不是武器");
assert.equal(whiteTowerRefunds("knife", previousWeapons), true, "其他尚未出现的武器仍应返还");

console.log("通过：白塔跨双方、跨回合的首次武器判定。");
