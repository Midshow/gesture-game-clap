import assert from "node:assert/strict";
import fs from "node:fs";

const htmlPath = new URL("../合掌网页版-正式版本存档/合掌网页版v2.5.7.html", import.meta.url);
const mdPath = new URL("../docs/rules/unified/合掌网页版统一规则（2026-08-03）.md", import.meta.url);
const html = fs.readFileSync(htmlPath, "utf8");
const md = fs.readFileSync(mdPath, "utf8");

const moonStart = html.indexOf("async function resolveMoonCountersBeforeResistance");
const resistanceStart = html.indexOf("async function resolveMultiplayerAttackQueue");
assert.ok(moonStart >= 0 && resistanceStart > moonStart, "月亮防反预处理必须存在");
const queue = html.slice(resistanceStart, resistanceStart + 1200);
assert.ok(queue.indexOf("await resolveMoonCountersBeforeResistance(context)") < queue.indexOf("mpShouldResist"), "防反必须先于抵刀");

const moonFn = html.slice(moonStart, resistanceStart);
assert.match(moonFn, /const reflected=attacks\.filter/, "一次防反应收集本次出手中的全部合法攻击");
assert.doesNotMatch(moonFn, /attack\.level>=2&&attack\.level<=5/, "防反不得沿用普通闪的等级限制");
assert.match(moonFn, /for\(const attack of reflected\)/, "全部合法攻击应逐把反弹");
assert.match(moonFn, /attack\.done=true;attack\.moonCountered=true/, "被反弹的刀不能再参与抵刀");
assert.match(moonFn, /applyMpDamage\(attack\.attacker/, "防反伤害必须进入统一伤害管线");

assert.match(html, /if\(damage<=0\)\{events\.push\(`\$\{victim\.name\}受到0伤害：不消耗本体、龙或秘偶的护盾`\);return 0;\}/, "多人0伤害不得消耗护盾");
assert.match(html, /if\(damage<=0\)\{events\.push\(`\$\{label\}受到0伤害，不消耗任何护盾`\);return \{damage:0,dealt:0,absorbedBy:null\};\}/, "双人0伤害不得消耗护盾且实际伤害记为0");
assert.match(html, /MIRACLE_PREVENT_ESTABLISHMENT/, "奇迹同级禁用应阻止攻击建立");
assert.match(html, /dragonShields:0,dollShields:0,damageOrder:\["dragon","doll"\]/, "龙和秘偶应独立持盾并支持动态顺序");

assert.match(md, /一次防反同时防住并分别反弹本次出手中所有可能命中自己的攻击/, "规则须明确一次防反反弹所有攻击");
assert.match(md, /小刀、虚无/, "规则须明确小刀和虚无也能被防反");
assert.match(md, /两把手里剑均已被防反处理，不再进入三级抵刀/, "规则须包含两个三级刀均被反弹的示例");
assert.match(md, /该武器在攻击建立前即被阻止：不能建立/, "规则须明确奇迹阻止攻击建立");
assert.match(md, /0伤害不会消耗任一护盾/, "规则须明确0伤害不减盾");
assert.match(md, /先驱是明确例外[\s\S]*算作先驱受到1点伤害/, "规则须明确先驱失去生命属于受到伤害");
assert.match(html, /afterMpPioneerDamage\(victim,events\)/, "多人先驱失血必须进入受到伤害响应");
assert.match(html, /pioneerDamageTaken=true/, "双人先驱失血必须记录受到伤害事件");

const embeddedLiteral = html.match(/const EMBEDDED_RULEBOOK_MD = (.*?);\n\nconst MOVES/s);
assert.ok(embeddedLiteral, "HTML必须内置规则文档");
assert.equal(JSON.parse(embeddedLiteral[1]), md, "HTML内置规则必须与MD完全一致");

console.log("通过：v2.5.7 最新规则裁决与内置规则一致性检查。");
