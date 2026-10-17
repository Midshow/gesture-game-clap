import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const html = fs.readFileSync(new URL("../合掌网页版-正式版本存档/合掌网页版v2.5.7.html", import.meta.url), "utf8");
const script = html.slice(html.indexOf("<script>") + 8, html.lastIndexOf("</script>"));
assert.doesNotThrow(() => new vm.Script(script), "v2.5.7 内嵌脚本必须能完整解析");

assert.doesNotMatch(html, /id="mpTargetRule"|选择目标队伍/, "多人普通攻击不得再提供指定目标队伍入口");
assert.match(html, /targetRule: "global"/, "多人默认且固定为所有敌对阵营共同判刀");
assert.match(html, /撤销\$\{formatNumber\(commit\.whiteTowerRefund\)\}锻返还[\s\S]*MIRACLE_PREVENT_ESTABLISHMENT/, "奇迹阻止武器建立时必须撤销白塔返还");
assert.match(html, /function soloOwnsSkill[\s\S]*function soloTargetAllowed/, "双人指定目标限制不得因先驱技能暂时失效而旁路");
assert.match(html, /const legalTargets=aliveMp\(\)\.filter\(x=>!hasMpSkill\(x,"pioneer"\)\)/, "母亲不能指定任何先驱，包括技能发动者自己");
assert.match(html, /chooseAiSkillTarget\(f,aliveMp\(\),"heal"\)/, "母亲与牧羊人 AI 应按全场而非仅友方选择合法治疗目标");

assert.match(html, /function registerSoloField/, "双人领域需要独立登记与冲突处理");
assert.match(html, /领域冲突：双方均展开领域，本回合所有领域失效；次数不返还/, "双人领域冲突必须失效且不返还次数");
assert.match(html, /applySoloSunFieldDamage\(damage,roundReset,skillEvents\)/, "双人太阳领域必须在回合结束进入伤害结算");
assert.match(html, /fighter\.roundSkillLock/, "双人奇点领域必须禁用普通主动与被动技能");
assert.doesNotMatch(html, /skillEnabledMp\(f,"(?:night|sun|bulwark)","field"\)[^\n]*await mpActiveAllowed/, "多人领域不能被渔夫当作主动技能挑战");

assert.match(html, /playerAbsorb\.dealt\?\?damage\.player/, "双人伤害记录必须统计龙和秘偶实际承受的伤害");
assert.match(html, /function applyMpSkillDamage/, "多人技能伤害必须进入统一伤害入口");
assert.doesNotMatch(html, /while\(guard\+\+<(?:8|32)\)/, "魔术师连续改写不得被任意安全次数截断");
assert.match(html, /rewritten\.attacker=replacement/, "多人魔术师改写必须替换最终攻击者");
assert.match(html, /afterMpDamage\(timing\.attack\.attacker/, "多人魔术师改写后，后续技能与伤害归属必须使用最终攻击者");
assert.match(html, /roundEvent\.damageBySource=\{player:0,ai:0\}/, "双人魔术师改写后必须按最终攻击者记录实际伤害");
assert.doesNotMatch(html, /do\{crypto\.getRandomValues/, "怪兽猜拳随机数不得使用理论上无界的拒绝循环");
assert.doesNotMatch(html, /\.map\(fn=>fn\.toString\(\)\)/, "引擎隔离检查不得依赖函数源码字符串");

assert.match(html, /item\.skillEvents\.map\(text => `<span class="skill-event">\$\{escapeHtml\(text\)\}<\/span>`\)/, "双人战报中的动态事件必须转义");
assert.match(html, /if\(item\.system\)return/, "回合开始技能造成死亡时必须使用可渲染的系统战报项");

assert.match(html, /none:\s*\{\s*name:\s*"无技能",\s*hp:\s*2,\s*attack:\s*1/, "多人无技能角色必须使用基础2血1攻属性");
assert.match(html, /mpPlayerSkill"\)\.innerHTML\s*=\s*`<option value="random">随机<\/option><option value="none">无技能/, "多人玩家必须同时提供随机与无技能选项");
assert.match(html, /<option value="random">随机技能<\/option><option value="none">无技能<\/option>/, "每名多人AI必须提供无技能选项");
assert.match(html, /if\(key==="random"\|\|key==="none"\)return/, "无技能可重复选择，不得触发同角色重复校验");
assert.match(html, /skills:skill==="none"\?\[\]:\[skill\]/, "无技能不得进入角色已拥有技能列表");
assert.match(html, /filter\(key=>key&&key!=="none"\)/, "盗贼、学徒与秘偶系统不得把无技能当成可取得技能");
assert.match(html, /if\(f\.skill==="none"\)continue;/, "占卜家死亡继承不得把无技能当成可取得技能");

console.log("通过：v2.5.7 全面审查修复、双人领域、统一伤害记录与安全回归检查。");
