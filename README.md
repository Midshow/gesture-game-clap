# 合掌

一个面向手机和桌面的合掌教学与 AI 练习游戏。无需账号，可离线运行。

## 本地运行

请通过任意静态服务器打开目录，例如：

```powershell
python -m http.server 8080
```

然后访问 `http://localhost:8080`。Service Worker 和 ES Modules 不能稳定地通过 `file://` 直接运行。

## 结构

- `index.html`：页面语义结构
- `styles.css`：视觉与响应式布局
- `js/moves.js`：唯一的招式与规则数据源
- `js/combat.js`：战斗判定
- `js/ai.js`：AI 决策
- `js/storage.js`：本机设置和战绩
- `js/ui.js`：界面渲染
- `js/app.js`：游戏流程
- `service-worker.js`：离线缓存
- `tests/combat.test.mjs`：规则测试

## 验证

```powershell
node tests/combat.test.mjs
```
