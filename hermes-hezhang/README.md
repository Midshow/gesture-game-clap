# Hermes 合掌QQ联机服务

这是合掌QQ联机服务：Python网关负责QQ私聊命令与消息发送，零第三方依赖的Node.js服务负责确定性规则裁判和状态持久化。当前规则集为`base-online-v3`，开放双人基础对局与可选剪刀模式。

## 快速运行

```powershell
Copy-Item config.example.json config.json
Copy-Item hezhang-gateway.example.json hezhang-gateway.json
notepad config.json
notepad hezhang-gateway.json
python -m pip install -r requirements.txt
npm start
# 另开终端：python hezhang_gateway_qq.py
```

Node端无需执行`npm install`；Python网关需要`requests`和`websockets`。详细交接、运维与接口说明见[HANDOFF.md](./HANDOFF.md)和[HERMES_INSTRUCTIONS.md](./HERMES_INSTRUCTIONS.md)。

## 数据

默认状态保存在`data/hezhang-state.json`。写入采用临时文件替换，避免服务意外退出时留下半写文件。请定期备份`data`目录。

服务会按`config.json`中的`roomIdleHours`清理长期无活动的房间和事件去重记录，并把单房间持久化日志限制为最近1000条。

`config.json`、`hezhang-gateway.json`与`data/`不得提交到公开仓库。

## 运行检查

```powershell
npm test
Invoke-RestMethod http://127.0.0.1:3217/health
```

`npm test`会同时执行Node服务回归和Python网关纯逻辑回归。

## 版本范围

当前版本为`0.2.0`：支持四属性建房、护盾、确定性基础结算、结束后重开、战报导出，以及双人可选剪刀模式。剪刀默认开启，可用`/创建 [HP 攻 锻 盾] 剪刀关`关闭。多人及36角色技能尚未开放。多人规则中，普通攻击不帮时接／闪使用者本人必定安全、其余角色继续判刀；选择帮接／帮闪则当前刀完整防住、无人受伤并统一重开，但帮助者失去自保。极光复制攻击禁止帮接／帮闪，但仍允许主动承受。

QQ网关支持出招按钮、默认房间、搜房、加入通知、纯房间号加入确认和精确出招提醒。`/删除`只允许房主删除仍在大厅状态的房间。
