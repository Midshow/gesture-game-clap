import { MOVES } from "./moves.js";
import { resolveCombat } from "./combat.js";

export const SKILLS = {
  generalist: { name: "通识者", hp: 2, attack: 1, description: "造成或受到伤害后，下一次锻造获得2格能量。" },
  whiteTower: { name: "白塔", hp: 2, attack: 1, description: "使用此前双方均未出过的武器时，返还该武器的能量花费；双方同时首次使用仍可触发。" },
  reaper: { name: "死神", hp: 1, attack: 1, description: "造成伤害后，生命与攻击力各增加1。" },
  tyrant: { name: "暴君", hp: 3, attack: 1, description: "生命不高于1时，造成的伤害变为10。" },
  mother: { name: "母亲", hp: 1, attack: 1, description: "上一回合造成过伤害时，回合开始恢复0.5生命。" },
  hunter: { name: "猎人", hp: 2, attack: 1, description: "死亡时，对对手造成1点真实伤害。" },
  warrior: { name: "战士", hp: 2, attack: 1, description: "武士刀可突破“防”，但因此造成的伤害为0.5。" },
  assassin: { name: "刺客", hp: 2, attack: 1, description: "每条生命首次小刀命中时伤害+0.5；你的“防”可挡手里剑。" },
  secretKeeper: { name: "窥秘人", hp: 2, attack: 1, description: "龙牙和虚无花费-1；对手受伤时恢复1生命。" },
  prisoner: { name: "囚徒", hp: 2, attack: 1, description: "闪免费、攻击花费+1；每成功闪两次，攻击花费永久-1（最低1）。" },
  demon: { name: "恶魔", hp: 3, attack: 0, description: "每回合结束攻击力+0.5。" },
  sun: { name: "太阳", hp: 2, attack: 1, description: "造成的伤害均为真实伤害。" },
  guardian: { name: "守卫", hp: 2, attack: 1, description: "无法锻造；使用防获得0.25能量，使用接获得0.5能量。" },
  moon: { name: "月亮", hp: 3, attack: 1, description: "闪变为防反：成功时按对手攻击力反击。" },
  bulwark: { name: "壁垒", hp: 2, attack: 1, description: "可花费1能量使用大盾，抵挡除虚无外的攻击。" },
  storm: { name: "风暴", hp: 2, attack: 1, description: "武士刀变为1.5级风暴之刃；未命中时下次花费-1。" }
};

export const SKILL_KEYS = Object.keys(SKILLS);

export function createFighter(skillKey) {
  const skill = SKILLS[skillKey] || SKILLS.generalist;
  return {
    energy: 0, score: 0, hp: skill.hp, maxHp: skill.hp, attack: skill.attack,
    boostForge: false, assassinUsed: false, flashSuccesses: 0,
    attackDiscount: 0, stormDiscount: 0, dealtDamageLastRound: false
  };
}

export function moveCost(moveKey, skillKey, fighter) {
  if (moveKey === "bigShield") return 1;
  let cost = MOVES[moveKey].cost;
  if (skillKey === "secretKeeper" && (moveKey === "dragonFang" || moveKey === "void")) cost--;
  if (skillKey === "prisoner") {
    if (moveKey === "flash") return 0;
    if (MOVES[moveKey].type === "attack") cost = Math.max(1, cost + 1 - (fighter.attackDiscount || 0));
  }
  if (skillKey === "storm" && moveKey === "katana") cost = Math.max(1, cost - (fighter.stormDiscount || 0));
  return Math.max(0, cost);
}

export function whiteTowerRefunds(moveKey, weaponHistory) {
  return skillMove(moveKey).type === "attack" && !weaponHistory.includes(moveKey);
}

export function availableMoveKeys(skillKey, scissorsEnabled = false) {
  const keys = Object.keys(MOVES).filter(key => scissorsEnabled || key !== "scissors");
  if (skillKey === "guardian") keys.splice(keys.indexOf("forge"), 1);
  if (skillKey === "bulwark") keys.splice(4, 0, "bigShield");
  return keys;
}

export function skillMove(moveKey) {
  if (moveKey === "bigShield") return { name: "大盾", type: "basic", icon: "▣", cost: 1, summary: "挡1～5级 · 1能量" };
  return MOVES[moveKey];
}

export function resolveWithSkills(playerKey, aiKey, playerSkill, aiSkill) {
  if (playerKey === "bigShield" || aiKey === "bigShield") return resolveBigShield(playerKey, aiKey);
  let result = resolveCombat(playerKey, aiKey);

  const playerStorm = playerSkill === "storm" && playerKey === "katana";
  const aiStorm = aiSkill === "storm" && aiKey === "katana";
  if ((playerStorm || aiStorm) && playerKey !== "scissors" && aiKey !== "scissors" && MOVES[playerKey].type === "attack" && MOVES[aiKey].type === "attack") {
    const playerLevel = playerStorm ? 1.5 : MOVES[playerKey].level;
    const aiLevel = aiStorm ? 1.5 : MOVES[aiKey].level;
    result = playerLevel === aiLevel
      ? { playerHit: false, aiHit: false, reset: false, title: "抵刀", detail: `${playerLevel}级对${aiLevel}级，双方均不受伤。` }
      : playerLevel > aiLevel
        ? { playerHit: false, aiHit: true, reset: false, title: "攻击压制", detail: `${playerLevel}级压制${aiLevel}级。` }
        : { playerHit: true, aiHit: false, reset: false, title: "攻击压制", detail: `${aiLevel}级压制${playerLevel}级。` };
  }

  if (playerSkill === "warrior" && playerKey === "katana" && aiKey === "guard") {
    result = { playerHit: false, aiHit: true, reset: false, title: "武士刀突破防", detail: "战士造成0.5点伤害。", playerDamage: 0, aiDamage: .5 };
  }
  if (aiSkill === "warrior" && aiKey === "katana" && playerKey === "guard") {
    result = { playerHit: true, aiHit: false, reset: false, title: "武士刀突破防", detail: "战士造成0.5点伤害。", playerDamage: .5, aiDamage: 0 };
  }
  if (playerSkill === "assassin" && playerKey === "guard" && aiKey === "shuriken") result = blocked("刺客识破手里剑");
  if (aiSkill === "assassin" && aiKey === "guard" && playerKey === "shuriken") result = blocked("刺客识破手里剑");
  return result;
}

export function previewSkillDamage(result, playerKey, aiKey, playerSkill, aiSkill, player, ai) {
  let playerDamage = result.playerDamage ?? (result.playerHit ? ai.attack : 0);
  let aiDamage = result.aiDamage ?? (result.aiHit ? player.attack : 0);

  if (playerDamage > 0 && aiSkill === "tyrant" && ai.hp <= 1) playerDamage = 10;
  if (aiDamage > 0 && playerSkill === "tyrant" && player.hp <= 1) aiDamage = 10;
  if (aiDamage > 0 && playerSkill === "assassin" && playerKey === "knife" && !player.assassinUsed) aiDamage += .5;
  if (playerDamage > 0 && aiSkill === "assassin" && aiKey === "knife" && !ai.assassinUsed) playerDamage += .5;

  const playerMove = skillMove(playerKey);
  const aiMove = skillMove(aiKey);
  if (playerSkill === "moon" && playerKey === "flash" && aiMove.type === "attack" && !result.playerHit) aiDamage += ai.attack;
  if (aiSkill === "moon" && aiKey === "flash" && playerMove.type === "attack" && !result.aiHit) playerDamage += player.attack;

  return { player: playerDamage, ai: aiDamage };
}

function resolveBigShield(playerKey, aiKey) {
  const p = skillMove(playerKey);
  const a = skillMove(aiKey);
  if (playerKey === "bigShield" && a.type === "attack") {
    if (a.level === 6) return { playerHit: true, aiHit: false, reset: false, title: "虚无击穿大盾", detail: "虚无不可防御。" };
    return blocked("大盾挡住攻击");
  }
  if (aiKey === "bigShield" && p.type === "attack") {
    if (p.level === 6) return { playerHit: false, aiHit: true, reset: false, title: "虚无击穿大盾", detail: "虚无不可防御。" };
    return blocked("大盾挡住攻击");
  }
  return blocked("双方相互试探");
}

function blocked(title) {
  return { playerHit: false, aiHit: false, reset: false, title, detail: "没有造成伤害。" };
}
