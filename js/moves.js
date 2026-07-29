export const MAX_ENERGY = 6;

export const MOVES = {
  forge: { name: "锻造", type: "basic", icon: "✊", cost: 0, gain: 1, summary: "+1 能量 · 无防御", rule: "获得1格能量；锻造时被任意攻击命中。" },
  guard: { name: "防", type: "basic", icon: "🛡️", cost: 0, blocks: [1, 2], summary: "挡 1～2 级 · 免费", rule: "挡住小刀和武士刀；挡不住3级以上攻击。" },
  catch: { name: "接", type: "basic", icon: "🤲", cost: 0, blocks: [2, 3], resets: true, summary: "挡 2～3 级 · 重置", rule: "接住武士刀或手里剑后，双方能量归零。" },
  flash: { name: "闪", type: "basic", icon: "💨", cost: 2, blocks: [2, 3, 4, 5], resets: true, summary: "挡 2～5 级 · 2 能量", rule: "躲开2～5级攻击并重置能量；挡不了小刀和虚无。" },
  scissors: { name: "剪刀", type: "attack", icon: "✂️", cost: 1, level: 1.5, summary: "特殊攻击 · 1 能量", rule: "克制小刀、武士刀、手里剑和接；被防、闪、锻造、苦无、龙牙和虚无克制。" },
  knife: { name: "小刀", type: "attack", icon: "🔪", cost: 1, level: 1, summary: "1 级攻击", rule: "最低消耗的攻击，可击中锻造、接和闪。" },
  katana: { name: "武士刀", type: "attack", icon: "⚔️", cost: 2, level: 2, summary: "2 级攻击", rule: "强于小刀，但会被防、接和闪挡住。" },
  shuriken: { name: "手里剑", type: "attack", icon: "✦", cost: 3, level: 3, summary: "3 级攻击", rule: "能够突破防，但会被接或闪挡住。" },
  kunai: { name: "苦无", type: "attack", icon: "🗡️", cost: 4, level: 4, summary: "4 级攻击", rule: "只有闪能防住；高级攻击会压制低级攻击。" },
  dragonFang: { name: "龙牙", type: "attack", icon: "🐉", cost: 5, level: 5, summary: "5 级攻击", rule: "只有闪能防住，威力仅次于虚无。" },
  void: { name: "虚无", type: "attack", icon: "◉", cost: 6, level: 6, summary: "6 级 · 不可防御", rule: "终极攻击，任何防御都无法抵挡。" }
};

export const MOVE_KEYS = Object.keys(MOVES);
export const ATTACK_KEYS = MOVE_KEYS.filter(key => MOVES[key].type === "attack");

export function canAfford(moveKey, energy) {
  return MOVES[moveKey].cost <= energy;
}
