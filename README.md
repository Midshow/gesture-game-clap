# 🖐️ 合掌 · The Clap

**合掌（The Clap）** 是一款源于中国重点高中的回合制博弈游戏，围绕 **能量管理与出招博弈** 展开。每回合双方同时选择行动，锤炼玩家的 **预判力、资源规划与心理博弈**。

**The Clap** is a turn-based strategy game originating from a leading high school in China. Centered on **energy management and move prediction**, players choose their actions simultaneously each round, honing **foresight, resource planning, and psychological gameplay**.

---

## 📖 规则 · Rules

### 基础规则 · Core Mechanics

每回合，玩家和对手同时选择一个行动。能量（上限 **6 格**）通过锻造积累，用于出招攻击。

Each round, both players select an action simultaneously. Energy (max **6 bars**) is accumulated through forging and spent on attacks.

> **攻击等级 = 消耗能量数**。同级攻击互相抵刀，双方均不受伤。高级攻击压制低级。
>
> **Attack level = Energy spent**. Same-level attacks clash — neither side takes damage. Higher level overpowers lower level.

### 行动总览 · Action Overview

| 行动 Action | 图标 | 消耗 | 效果 Effect |
|------------|------|------|------------|
| **锻造** Forge | 🔨 | 0 | +1 能量，无防御 / Gain 1 energy, no defense |
| **防** Guard | 🛡️ | 0 | 挡住 1–2 级攻击 / Blocks level 1–2 attacks |
| **接** Catch | 🤲 | 0 | 挡住 2–3 级攻击，双方能量归零 / Blocks level 2–3, resets both energy |
| **闪** Flash | 💨 | 2 | 挡住 2–5 级攻击，双方能量归零 / Blocks level 2–5, resets both energy |
| **小刀** Knife | 🔪 | 1 | 1 级攻击 / Level 1 attack |
| **武士刀** Katana | ⚔️ | 2 | 2 级攻击 / Level 2 attack |
| **手里剑** Shuriken | 🥷 | 3 | 3 级攻击 / Level 3 attack |
| **苦无** Kunai | 🗡️ | 4 | 4 级攻击 / Level 4 attack |
| **龙牙** Dragon Fang | 🐉 | 5 | 5 级攻击 / Level 5 attack |
| **虚无** Void | 👻 | 6 | 6 级攻击，不可防御 / Level 6, undefendable |
| **剪刀** Scissors | ✂️ | 1 | 特殊攻击（选修模式）/ Special attack (optional mode) |

### 交互规则 · Interaction Rules

| 场景 Scenario | 结果 Outcome |
|--------------|-------------|
| 攻击 vs 锻造 | 攻击命中 / Attack hits |
| 同等级攻击 | 抵刀，双方不伤 / Clash, no damage |
| 高级攻击 vs 低级攻击 | 高级压制 / Higher level wins |
| 防（1–2）vs 对应攻击 | 防住 / Blocked |
| 接（2–3）vs 对应攻击 | 接住 + 能量归零 / Caught + energy reset |
| 闪（2–5）vs 对应攻击 | 闪过 + 能量归零 / Dodged + energy reset |
| 虚无 vs 任何防御 | 不可防御 / Undefendable |

---

## ⚙️ 游戏模式 · Game Modes

| 模式 Mode | 说明 Description |
|----------|----------------|
| **标准 Standard** | 先达到目标胜场（1/3/5/7）者胜 / First to target wins |
| **无尽 Endless** | 持续记录连胜 / Continuous streak tracking |
| **禅 Zen** | 隐藏能量的无尽模式 / Endless with hidden energy |

### AI 难度 · AI Difficulty

| 难度 | 策略 |
|------|------|
| 简单 Easy | 基础策略 / Basic strategy |
| 普通 Normal | 稳健应对 / Balanced responses |
| 困难 Hard | 深度预判 / Deep prediction |
| 地狱 Hell | 极限博弈 / Maximum gameplay |

---

## ⚡ 技能系统 · Skill System

启用后，双方拥有 **生命值（HP）与攻击力（Attack）**，并携带一个角色技能。每个角色提供独特的战术维度。

When enabled, both sides gain **HP and Attack power**, along with a character skill. Each character offers a unique tactical dimension.

| 技能 Skill | 生命 HP | 攻击 ATK | 特性 Trait |
|-----------|---------|---------|-----------|
| 通识者 Generalist | 2 | 1 | 受伤后下次锻造 +1 能量 / Next forge gains +1 after damage |
| 白塔 White Tower | 2 | 1 | 用新武器时返还能量 / New weapon refunds cost |
| 死神 Reaper | 1 | 1 | 造成伤害后 +1 HP & ATK / +1 HP & ATK on dealing damage |
| 暴君 Tyrant | 3 | 1 | HP≤1 时伤害 ×10 / Damage ×10 when HP≤1 |
| 母亲 Mother | 1 | 1 | 上回合造成伤害则恢复 0.5 HP / Heal 0.5 if dealt damage last turn |
| 猎人 Hunter | 2 | 1 | 死亡时造成 1 点真实伤害 / Deals 1 true damage on death |
| 战士 Warrior | 2 | 1 | 武士刀可突破防（伤害 0.5）/ Katana pierces Guard (0.5 dmg) |
| 刺客 Assassin | 2 | 1 | 首刀小刀 +0.5；防可挡手里剑 / First Knife +0.5; Guard blocks Shuriken |
| 窥秘人 Secret Keeper | 2 | 1 | 龙牙/虚无消费 -1；对手受伤时回血 1 / Dragon Fang/Void cost -1; heal 1 on enemy hit |
| 囚徒 Prisoner | 2 | 1 | 闪免费；攻击消费 +1 但每次成功减消耗 / Flash free; attacks cost +1 but reduce with dodges |
| 恶魔 Demon | 3 | 0 | 每回合 ATK +0.5 / +0.5 ATK each turn |
| 太阳 Sun | 2 | 1 | 所有伤害为真实伤害 / All damage is true damage |
| 守卫 Guardian | 2 | 1 | 不能锻造；防获得 0.25 能量，接获得 0.5 / Cannot forge; Guard gives 0.25 energy, Catch gives 0.5 |
| 月亮 Moon | 3 | 1 | 闪变为防反：成功时按对手 ATK 反击 / Flash becomes counter: reflects ATK on success |
| 壁垒 Bulwark | 2 | 1 | 消耗 1 能量用大盾，挡除虚无外所有攻击 / Spend 1 energy on Big Shield, blocks all but Void |
| 风暴 Storm | 2 | 1 | 武士刀变为 1.5 级风暴之刃；未命中下次消费 -1 / Katana becomes level-1.5 Storm Blade |

---

## 🗺️ 游戏流程 · How to Play

1. **锻造攒能** → 选择"锻造"获取能量
2. **出招博弈** → 消耗能量出招攻击，同时猜对手的行动
3. **防御抉择** → 根据对手可能的攻击等级选择防/接/闪
4. **攻防循环** → 重复至一方达到目标胜场

> 提示："防"免费但仅挡 1–2 级；"接"免费但挡 2–3 级 + 重置能量；
> "闪"消耗 2 能量但挡 2–5 级；虚无无解。

---

## 📦 版本历史 · Version History

| 版本 | 类型 | 说明 |
|------|------|------|
| **v2.4** | 正式版 | 双人对战，含第二版部分技能 |
| **v2.5.0** | 快照 | 🆕 多人对战 + 全技能系统 |
| **v2.5.1** | 快照 | 多人对战规则修订 |
| **v2.5.2** | 快照 | 程序优化，规则同 v2.5.1 |

---

## 🗂️ 仓库结构 · Repository Structure

```
gesture-game-clap/
├── README.md
├── 合掌技能版（第二版）_1784612320126.docx   ← 技能系统完整规则
├── 合掌游戏-速成攻略-终稿 (1).docx           ← 新手速成指南
├── 合掌网页版v2.4.html                       ← v2.4 正式版
├── 合掌网页版v2.5.0.html                     ← v2.5.0 快照
├── 合掌网页版v2.5.1.html                     ← v2.5.1 快照
└── 合掌网页版v2.5.2.html                     ← v2.5.2 快照（最新）
```

---

## 🚀 快速开始 · Quick Start

1. 下载任一 `.html` 文件
2. 在浏览器中打开（Chrome / Edge / Firefox）
3. 开始游戏！

无需安装、无需编译、无需服务器。

No installation, no compilation, no server required.

---

## 📝 许可 · License

开源项目，仅供学习与交流使用。

Open-source project for educational and recreational use.

---

> **合掌——拍两下，见真招。**
>
> **The Clap — a couple of claps, and the real moves show.**
