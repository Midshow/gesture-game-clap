import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const html = fs.readFileSync(new URL("../合掌网页版-正式版本存档/合掌网页版v2.5.7.html", import.meta.url), "utf8");
const script = html.slice(html.indexOf("<script>") + 8, html.lastIndexOf("</script>"));

assert.doesNotThrow(() => new vm.Script(script), "修改后的 v2.5.7 内嵌脚本必须能完整解析");

assert.match(html, /id="timerSeconds" type="number" min="0\.5" max="15" step="0\.5"/, "计时输入下限必须为0.5秒");
assert.match(html, /timerSeconds=Math\.max\(\.5,Math\.min\(15/, "读取旧存档时必须把计时秒数提升到至少0.5秒");
assert.match(html, /timerSeconds: Math\.min\(15, Math\.max\(\.5,/, "保存设置时必须把计时秒数限制在0.5至15秒");

const volunteerSource = html.match(/async function chooseMpVolunteers[\s\S]*?\n}/)?.[0] || "";
const settleSource = html.match(/async function settleMpVolunteer[\s\S]*?\n}/)?.[0] || "";
const defenseHelpSource = html.match(/async function chooseMpDefenseHelpers[\s\S]*?\n}/)?.[0] || "";
const ordinaryKnifeSource = html.match(/async function resolveOrdinaryMpKnife[\s\S]*?\n}/)?.[0] || "";
assert.match(volunteerSource, /if\(preview\.blocked\)continue/, "能以自身接闪防住当前刀者不进入主动承受候选");
assert.match(defenseHelpSource, /本次出手不再保护自己/, "普通攻击的帮接帮闪必须明确以放弃自我保护为代价");
assert.match(defenseHelpSource, /fighter\.selfDefenseForfeited=true/, "声明帮接帮闪后必须立即记录自我保护丧失");
assert.match(ordinaryKnifeSource, /selfDefenders[\s\S]*unblocked=unblocked\.filter/, "不帮助的有效接闪必须保护自己并退出其余承受者随机范围");
assert.match(html, /当前刀被完整防住，无人受伤/, "帮接帮闪必须完整防住当前刀并确保无人受伤");
assert.match(html, /不帮助时自己必定安全/, "内置规则必须明确不帮接闪时使用者本人不会受伤");
assert.match(settleSource, /volunteers\[Math\.floor\(Math\.random\(\)\*volunteers\.length\)\]/, "多名主动承受者必须等概率随机");
assert.match(settleSource, /resolveMpConfirmedHit\(selected/, "选中主动承受者后必须直接执行命中管线并占用判刀名额");
assert.doesNotMatch(html, /hostileAttackCount>forgeCount/, "不得恢复旧主动承受门槛");

const judgementSource = html.match(/async function judgeMpAttack[\s\S]*?\n}/)?.[0] || "";
assert.match(judgementSource, /const copies=enemiesOf\(attack\.attacker\)\.filter\(f=>!f\.skipped\)\.length/, "极光复制攻击数量必须等于敌方人数");
assert.match(judgementSource, /for\(let copy=1;copy<=copies;copy\+\+\)[\s\S]*?mpBaseAttackCandidates/, "每把极光复制攻击都必须在命中前重新取得候选范围");
assert.match(judgementSource, /resolveOrdinaryMpKnife\(attack,current,actions,events,\{allowDefenseHelp:false\}\)/, "极光复制攻击必须明确关闭帮接帮闪窗口");
assert.doesNotMatch(judgementSource, /AURORA_EXPAND[\s\S]*?resolveFixedMpTarget/, "极光不得展开固定目标刀");

assert.doesNotMatch(html, /buttons\.push\(\["hunterTarget"|猎人：预选死亡伤害目标/, "猎人不得在死亡前预选技能目标");
assert.match(html, /猎人：死亡后选择1点真实伤害目标/, "真人猎人必须在死亡后当场选择目标");
assert.match(html, /else if\(targets\.length\)t=chooseAiSkillTarget\(f,targets,"harm"\)/, "AI猎人必须在死亡后由AI选择目标");

assert.match(html, /const won=teams\[0\]===getHuman\(\)\.team/, "玩家阵营胜利不得要求真人仍然存活");
assert.match(html, /if\(item\.system\)\{[\s\S]*?系统结算/, "分享战报必须支持系统日志项");
assert.match(html, /if\(item\.player&&skillMove\(item\.player\)\)/, "常用招式统计必须忽略系统日志项");
assert.match(html, /ensureDuelRoundStarted[\s\S]*?state\.player\.score>=data\.settings\.winScore[\s\S]*?setTimeout\(endGame,0\)/, "回合开始效果产生决胜分后必须结束标准赛");

console.log("通过：v2.5.7 帮接帮闪赌博、主动承受、极光未定目标攻击、猎人死亡选人与稳定性修复检查。");
