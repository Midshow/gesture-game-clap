import assert from "node:assert/strict";
import fs from "node:fs";

const html = fs.readFileSync(new URL("../合掌网页版-正式版本存档/合掌网页版v2.5.7.html", import.meta.url), "utf8");

assert.doesNotMatch(html, /攻击者保护|天然保护|mpHasAttackProtection/, "规则解释不得再使用‘攻击者保护’术语");
assert.match(html, /function mpActionDefenseCoversAttack\(/, "多人判刀应按攻击动作的防御等级排除候选");
assert.match(html, /倒吊人【亡者回生】/, "倒吊人的死亡回血必须写入解释性战报");
assert.match(html, /function hangedRecoveryForDeaths\(/, "双人与多人应共享倒吊人每名死者回复0.5的计算口径");
assert.match(html, /function chooseMpJudgeOpponent\(/, "多人审判者应允许自主选择合法的追加对局对象");
assert.match(html, /将护盾交给哪名其他角色/, "黑皇帝应能选择任意合法的其他角色，而非仅限友方");
assert.match(html, /if\(opening&&skillEnabledMp\(h,"fisherman"\).*h\.hp>0\)/, "渔夫应能在0.5血时放置鱼钩并因此死亡");
assert.match(html, /for\(const owner of owners\).*resolveSoloMonsterDuel/s, "双人双方怪兽时应分别发动两份怪兽被动");
assert.match(html, /resolveMpMonsterInterception[\s\S]*for\(const owner of owners\)[\s\S]*resolveMpMonsterDuel/, "多人双方怪兽时应分别完成两次猜拳");
assert.doesNotMatch(html, /const flashes=helpers\.filter|flashes\.length\?flashes:helpers/, "普通闪不得在多人判刀中优先于接或其他帮助者");
assert.match(html, /const moonCounters=helpers\.filter/, "月亮防反应作为独立的最高优先级防御响应");

const skillKeys = [
  "generalist","whiteTower","reaper","tyrant","mother","hunter","warrior","assassin","secretKeeper","prisoner",
  "demon","sun","guardian","moon","bulwark","storm","hangedMan","judge","monster","thief","blackEmperor",
  "audience","night","apprentice","diviner","pioneer","nightmare","miracle","aurora","magician","observer",
  "fisherman","dragonKnight","saint","singularity","shepherd"
];
for (const key of skillKeys) assert.match(html, new RegExp(`\\b${key}\\b`), `缺少技能实现入口：${key}`);

console.log("通过：v2.5.7 技能合规、倒吊人死亡回复与动作防御等级术语检查。");
