# 《合掌》工作区导航

本文件是`D:\chy\合掌`的目录地图。规则与开发约束以`AGENTS.md`为准。

## 核心入口

- `合掌网页版-正式版本存档/合掌网页版v2.5.8.1.html`：当前技能第三版反馈修订游戏，原名 v2.5.8。
- `hermes-hezhang/`：当前QQ/Hermes联机服务正式开发目录。
- `docs/rules/unified/合掌网页版统一规则（2026-08-03）.md`：v2.5.7 数字实现基线，第三版技能改动需另参照第三版原典。
- `README.md`：面向玩家与普通开发者的项目入口。

- `docs/rules/sources/合掌技能版（第三版）.docx`：当前技能更新原典。
- `docs/rules/releases/合掌v2.5.8规则.md` 与 `docs/reviews/v2.5.8-update.md`：当前适配规则与更新说明，保留更名前的版本号。
- `合掌网页版-正式版本存档/各版本说明.txt`：历代存档功能介绍。

## 目录职责

| 目录 | 内容 | 是否直接运行 |
| --- | --- | --- |
| `合掌网页版-正式版本存档/` | 历代正式单HTML版本 | 是 |
| `hermes-hezhang/` | QQ网关、Node裁判、联机测试和交接文档 | 是 |
| `docs/rules/sources/` | 权威原典、技能规则版本、速成攻略 | 否 |
| `docs/rules/unified/` | 当前统一规则及历史规则稿 | 否 |
| `docs/rules/releases/` | 各次规则适配文本 | 否 |
| `docs/reviews/` | 规则审计、裁定与版本审查 | 否 |
| `tests/` | 正式HTML规则与回归测试 | 是 |
| `tools/` | 构建、同步和文档辅助脚本 | 是 |
| `research/source/` | 博弈研究的原始PDF及渲染图 | 否 |
| `output/research/` | 博弈解析报告 | 否 |
| `output/reviews/` | 研究或规则审查成品 | 否 |
| `output/diagrams/` | 流程图等图形交付物 | 否 |
| `legacy/standalone/` | 早期独立HTML与模块化离线构建 | 历史参考 |
| `assets/scenes/` | 场景原图；正式单HTML内部已有嵌入副本 | 资源 |
| `dist/` | 可重新生成的发布包，Git忽略 | 生成物 |
| `local-archive/` | 外部交接包、解压对照及错位历史快照，Git忽略 | 本地追溯 |

根目录的`index.html`、`styles.css`、`js/`、`assets/`、`manifest.webmanifest`和`service-worker.js`共同组成早期PWA，因相对路径关系保留在根目录。

## 规则文献优先级

最高权威原典：

1. `docs/rules/sources/《合掌学基础》.docx`
2. `docs/rules/sources/合掌技能版（第二版）-谢氏原典.docx`
3. `docs/rules/sources/合掌游戏-速成攻略-终稿 (1).docx`

当前技能更新以 `docs/rules/sources/合掌技能版（第三版）.docx` 为准；其明确修改的条款优先于第二版与旧统一规则。

旧版网页程序的直接蓝本位于`docs/rules/unified/`。审查稿和研究报告不能覆盖原典或当前统一规则。

## 常用验证

```powershell
node --test tests/*.test.mjs
Set-Location hermes-hezhang
npm test
```

整理或发布前先运行`git status --short`。未跟踪文件也可能是尚未提交的正式工作，不能仅凭Git状态删除。

## 文章参考入口

docs/rules/sources/龚君文集（部分）.docx：维护者手动复制的五篇知乎文章，暂存于规则来源目录，作为群史、教学与研究参考。目录及规则歧义见 docs/README.md，不自动作为游戏规则变更依据。
