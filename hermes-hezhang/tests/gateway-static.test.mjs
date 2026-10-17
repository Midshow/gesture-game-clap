import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const gateway=fs.readFileSync(path.join(root,"hezhang_gateway_qq.py"),"utf8");

test("QQ网关使用入站消息ID去重并通过专用接口取得收件人",()=>{
  assert.match(gateway,/event_id = f"qq-\{msg_id\}" if msg_id/);
  assert.match(gateway,/api\("GET", f"\/rooms\/\{rid\}\/recipients"\)/);
  assert.doesNotMatch(gateway,/for pl in (?:room|res\.get\("room"[^\n]*)\.get\("players"/);
});

test("QQ网关部署模板与敏感文件忽略规则齐全",()=>{
  assert.equal(fs.existsSync(path.join(root,"hezhang-gateway.example.json")),true);
  assert.equal(fs.existsSync(path.join(root,"requirements.txt")),true);
  const ignore=fs.readFileSync(path.join(root,".gitignore"),"utf8");
  assert.match(ignore,/^hezhang-gateway\.json$/m);
});

test("联机包规则副本包含最新帮助赌博、极光与猎人裁定",()=>{
  const rules=fs.readFileSync(path.join(root,"docs","合掌网页版统一规则.md"),"utf8");
  assert.doesNotMatch(rules,/tokens truncated|Warning: truncated output/);
  assert.match(rules,/帮助是一种赌博/);
  assert.match(rules,/不帮助时自己必定安全/);
  assert.match(rules,/当前刀被完整防住、无人受伤/);
  assert.match(rules,/极光复制攻击不能帮接或帮闪/);
  assert.match(rules,/复制出数量等于敌方人数的多把相同攻击/);
  assert.match(rules,/死亡后，由猎人本人当场选择/);
});

test("QQ网关指令按钮使用完整命令并由纯逻辑正确剥离房间号",()=>{
  assert.match(gateway,/def build_keyboard/);
  assert.match(gateway,/"type": 2/);
  assert.match(gateway,/"enter": True/);
  assert.match(gateway,/f"\/出招 \{rid\} 锻造"/);
  assert.match(gateway,/from gateway_logic import resolve_room_args, should_remind_player/);
  assert.match(gateway,/return resolve_room_args\(parts, get_default_room\(sender\)\)/);
});

test("QQ网关流程优化包含默认房间、搜房、加入通知与精确超时提醒",()=>{
  assert.match(gateway,/def set_default_room/);
  assert.match(gateway,/join notify owner fail/);
  assert.match(gateway,/对方已秘密出招，等你出手/);
  assert.match(gateway,/当前可加入的房间/);
  assert.match(gateway,/def handle_join_hint/);
  assert.match(gateway,/def send_greeting/);
  assert.match(gateway,/async def reminder_loop/);
  assert.match(gateway,/should_remind_player\(r\["players"\], i\)/);
  assert.match(gateway,/MOVE_TS\[f"\{rid\}:\{i\}"\] = time\.time\(\)[\s\S]*对方已秘密出招/);
  assert.match(gateway,/round timer reset fail/);
});

test("QQ网关支持剪刀房间开关、别名和条件按钮",()=>{
  assert.match(gateway,/"剪刀": "scissors"/);
  assert.match(gateway,/def move_buttons\(rid, scissors=True\)/);
  assert.match(gateway,/\("剪刀", f"\/出招 \{rid\} 剪刀"\)/);
  assert.match(gateway,/"scissors": scissors/);
  assert.match(gateway,/剪刀开\|剪刀关/);
});
