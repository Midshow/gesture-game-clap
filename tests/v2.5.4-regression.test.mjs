import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const archive = path.join(root, "合掌网页版-正式版本存档");
const v253 = fs.readFileSync(path.join(archive, "合掌网页版v2.5.3.html"), "utf8");
const v254 = fs.readFileSync(path.join(archive, "合掌网页版v2.5.4.html"), "utf8");
const script = v254.match(/<script>([\s\S]*)<\/script>/)?.[1];

assert.ok(script, "v2.5.4 必须包含内嵌脚本");
assert.doesNotThrow(() => new Function(script), "v2.5.4 内嵌脚本必须通过语法检查");
assert.match(v253, /APP_VERSION = "2\.5\.3"/, "v2.5.3 存档版本号不得改变");
assert.match(v254, /APP_VERSION = "2\.5\.4"/, "v2.5.4 必须使用新版本号");
assert.match(v254, /basicRoundShouldReset/, "无技能受伤重开规则必须保留");
assert.match(v254, /temporarySkills/, "盗贼必须使用临时技能状态");
assert.match(v254, /finishSoloRoundState/, "回合临时状态必须统一收尾");
assert.match(v254, /pioneerActiveProtection/, "先驱主动免伤必须与被动扣血分离");
assert.match(v254, /singularityAttackPenalty/, "奇点的本回合攻击修正必须可复原");
assert.match(v254, /saintDamageTaken/, "圣斗士护盾效果必须进入伤害事件链");
assert.match(v254, /restoreSoloOpeningState/, "黑夜必须恢复本轮开局状态");
assert.match(v254, /占卜家：选择初始秘偶/, "玩家必须能自主选择占卜家秘偶");

console.log("通过：v2.5.3 存档冻结与 v2.5.4 双人技能回归检查。");
