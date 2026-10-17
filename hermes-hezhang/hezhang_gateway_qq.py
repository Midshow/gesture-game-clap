# -*- coding: utf-8 -*-
"""合掌助手 QQ 网关：连 QQ WS -> 解析 /合掌 指令 -> 调 Node 裁判服务 -> 回复
架构：独立守护进程（不经 LLM/Hermes 中转），低延迟直连。
参照 bili_bridge_qq.py 的 QQ WS 模式；规则裁判由 hermes-hezhang Node 服务承担。
"""
import asyncio, json, logging, os, re, time
import requests, websockets
from gateway_logic import resolve_room_args, should_remind_player

HERE = os.path.dirname(os.path.abspath(__file__))
CONFIG = json.load(open(os.path.join(HERE, "hezhang-gateway.json"), encoding="utf-8"))
APP_ID = CONFIG["qq_app_id"]
APP_SECRET = CONFIG["qq_app_secret"]
API_BASE = CONFIG["api_base"]
ADMIN_TOKEN = CONFIG["admin_token"]
STATE_FILE = os.path.join(HERE, "data", "hezhang-gateway-state.json")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(os.path.join(HERE, CONFIG.get("log_file", "hezhang_gateway.log")), encoding="utf-8"),
        logging.StreamHandler(),
    ],
)
log = logging.getLogger("hezhang-gw")

TOKEN_URL = "https://bots.qq.com/app/getAppAccessToken"
GW_API = "https://api.sgroup.qq.com"
INTENTS = 1 << 25  # GROUP_AND_C2C_EVENT：群 @ 消息 + C2C 私聊

OP_DISPATCH = 0
OP_HEARTBEAT = 1
OP_IDENTIFY = 2
OP_RECONNECT = 7
OP_INVALID_SESSION = 9
OP_HELLO = 10
OP_HEARTBEAT_ACK = 11

_token, _token_exp = None, 0.0

def get_token(force=False):
    global _token, _token_exp
    if not force and _token and time.time() < _token_exp - 60:
        return _token
    r = requests.post(TOKEN_URL, json={"appId": APP_ID, "clientSecret": APP_SECRET}, timeout=15)
    j = r.json()
    if "access_token" not in j:
        raise RuntimeError(f"qq token failed: {r.status_code} {j}")
    _token = j["access_token"]
    _token_exp = time.time() + int(j.get("expires_in", 7200))
    return _token

def get_gateway():
    token = get_token()
    r = requests.get(f"{GW_API}/gateway", headers={"Authorization": f"QQBot {token}"}, timeout=15)
    j = r.json()
    url = j.get("url", "")
    if not url:
        log.error("gateway no url: HTTP %s body=%s", r.status_code, r.text[:300])
        raise RuntimeError("gateway empty")
    return url, token

# ---- 调用 Node 裁判服务 ----
def api(method, path, body=None):
    headers = {"Authorization": f"Bearer {ADMIN_TOKEN}", "Content-Type": "application/json"}
    if method == "POST":
        r = requests.post(API_BASE + path, json=body or {}, headers=headers, timeout=10)
    elif method == "DELETE":
        r = requests.delete(API_BASE + path, json=body or {}, headers=headers, timeout=10)
    else:
        r = requests.get(API_BASE + path, headers=headers, timeout=10)
    j = r.json()
    if not j.get("ok"):
        raise RuntimeError(j.get("error") or f"HTTP {r.status_code}")
    return j.get("result")

# ---- QQ 发送 ----
def build_keyboard(rows):
    """构造 C2C 指令按钮键盘。rows: [[(label, data), ...], ...] → KeyboardContent
    按钮 type=2（指令按钮）+ enter=True：点击后直接自动发送 data（仅单聊可用）"""
    return {
        "content": {
            "rows": [
                {"buttons": [
                    {
                        "id": f"b{ri}-{bi}",
                        "render_data": {"label": label, "style": 1},
                        "action": {"type": 2, "permission": {"type": 2}, "data": data, "enter": True, "reply": True},
                    } for bi, (label, data) in enumerate(row)
                ]} for ri, row in enumerate(rows)
            ]
        }
    }

def qq_send_group(group_openid, text, msg_id=""):
    try:
        token = get_token()
        body = {"content": text, "msg_type": 0, "msg_seq": int(time.time() * 1000) % 100000, "group_openid": group_openid}
        r = requests.post(f"{GW_API}/v2/groups/{group_openid}/messages", json=body, headers={"Authorization": f"QQBot {token}"}, timeout=15)
        if r.status_code >= 400:
            log.error("group send HTTP %s: %s | body=%s", r.status_code, r.text[:200], json.dumps(body, ensure_ascii=False)[:200])
            return False
        return True
    except Exception as e:
        log.error("group send exc: %s", e)
        return False

def qq_send_c2c(openid, text, msg_id="", keyboard=None):
    try:
        token = get_token()
        msg_seq = int(time.time() * 1000) % 100000
        if keyboard:
            # 按钮只能挂在 markdown 消息上（msg_type=2）；纯文本+keyboard 会被平台忽略
            body = {"msg_type": 2, "markdown": {"content": text}, "msg_seq": msg_seq, "openid": openid, "keyboard": keyboard}
        else:
            body = {"content": text, "msg_type": 0, "msg_seq": msg_seq, "openid": openid}
        if msg_id:
            body["msg_id"] = msg_id
        r = requests.post(f"{GW_API}/v2/users/{openid}/messages", json=body, headers={"Authorization": f"QQBot {token}"}, timeout=15)
        if r.status_code >= 400:
            log.error("c2c send HTTP %s: %s | body=%s", r.status_code, r.text[:200], json.dumps(body, ensure_ascii=False)[:200])
            return False
        return True
    except Exception as e:
        log.error("c2c send exc: %s", e)
        return False

# ---- 招式映射（中文/数字 -> 行动键）----
MOVE_ALIAS = {
    "锻造": "forge", "锻": "forge", "0": "forge",
    "防": "defend", "7": "defend", "防御": "defend",
    "接": "catch", "8": "catch", "格挡": "catch",
    "闪": "flash", "9": "flash", "闪避": "flash",
    "小刀": "knife", "1": "knife",
    "剪刀": "scissors", "✂": "scissors", "✂️": "scissors",
    "武士刀": "katana", "2": "katana",
    "手里剑": "shuriken", "3": "shuriken",
    "苦无": "kunai", "4": "kunai",
    "龙牙": "dragon", "5": "dragon",
    "虚无": "void", "6": "void",
}

# ---- 房间 -> 群 映射（结算广播用）----
def load_state():
    try:
        if os.path.exists(STATE_FILE):
            return json.load(open(STATE_FILE, encoding="utf-8"))
    except Exception as e:
        log.warning("state load fail: %s", e)
    return {"room_group": {}}

def save_state(state):
    try:
        os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
        tmp = STATE_FILE + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(state, f, ensure_ascii=False, indent=2)
        os.replace(tmp, STATE_FILE)
    except Exception as e:
        log.warning("state save fail: %s", e)

STATE = load_state()
if "greeted" not in STATE: STATE["greeted"] = []
if "default_room" not in STATE: STATE["default_room"] = {}
ROOM_GROUP = STATE.get("room_group", {})

def mark_greeted(openid):
    if openid not in STATE["greeted"]:
        STATE["greeted"].append(openid)
        save_state(STATE)

def set_default_room(openid, rid):
    if STATE["default_room"].get(openid) != rid:
        STATE["default_room"][openid] = rid
        save_state(STATE)

def get_default_room(openid):
    return STATE["default_room"].get(openid)

def remember_room_group(room_id, group_openid):
    if group_openid and ROOM_GROUP.get(str(room_id)) != group_openid:
        ROOM_GROUP[str(room_id)] = group_openid
        STATE["room_group"] = ROOM_GROUP
        save_state(STATE)

# ---- 指令处理 ----
CMD = CONFIG.get("cmd_prefix", "/合掌")  # 旧前缀（兼容）

ACTION_ALIAS = {
    "创建": "创建", "create": "创建",
    "加入": "加入", "join": "加入",
    "开始": "开始", "start": "开始",
    "状态": "状态", "status": "状态", "view": "状态",
    "出招": "出招", "submit": "出招",
    "记录": "记录", "export": "记录", "log": "记录",
    "房间": "房间", "搜索": "房间", "find": "房间", "list": "房间",
    "删除": "删除", "解散": "删除", "del": "删除", "remove": "删除",
    "取消": "取消", "cancel": "取消",
    "规则": "规则", "help": "规则", "帮助": "规则",
}

def parse_cmd(text):
    """全私聊命令解析：/创建 /加入 <房间号> /开始 <房间号> /出招 <房间号> <招式> /状态 <房间号> /规则
    兼容旧式：/合掌 创建 2队；兼容指令按钮可能带 @bot 前缀"""
    t = text.strip()
    t = re.sub(r"^@\S+\s*", "", t)  # 防御性：剥离 @bot 前缀（C2C 指令按钮一般不带，但保险）
    if not t.startswith("/"):
        return None
    if t.startswith(CMD) and len(t) > len(CMD):
        rest = t[len(CMD):].strip()
        if rest:
            return rest
        return None
    m = re.match(r"^/(\S+)(?:\s+(.*))?$", t)
    if m:
        act = m.group(1)
        rest = (m.group(2) or "").strip()
        if act in ACTION_ALIAS:
            return (ACTION_ALIAS[act] + (" " + rest if rest else "")).strip()
    return None

def short_name(openid):
    return "玩家" + str(openid)[-4:]

def fmt_room(room):
    lines = [f"🏠 房间 {room['id']}（{room['status']}）第 {room['round']} 回合 · {room['ruleset']}"]
    settings = room.get("settings", {})
    lines.append(f"  配置：HP{settings.get('hp', 1)}/攻{settings.get('attack', 1)}/锻{settings.get('energy', 0)}/盾{settings.get('shield', 0)} · 剪刀{'开' if settings.get('scissors', True) else '关'}")
    for p in room["players"]:
        lines.append(f"  {p['name']}（队{p['team'] + 1}）HP{p['hp']} 攻{p.get('attack', 1)} 盾{p.get('shield', 0)} 锻{p['energy']} {'存活' if p['alive'] else '💀'} {'✓已出招' if p['submitted'] else '待出招'}")
    lines.append(f"⏳ 待出招 {room['pending']} 人")
    return "\n".join(lines)

def move_buttons(rid, scissors=True):
    """出招指令按钮：点击自动发送 /出招 <房间号> <招式>"""
    rows = [
        [("锻造", f"/出招 {rid} 锻造"), ("防", f"/出招 {rid} 防"), ("接", f"/出招 {rid} 接"), ("闪", f"/出招 {rid} 闪")],
        [("小刀", f"/出招 {rid} 小刀"), ("武士刀", f"/出招 {rid} 武士刀"), ("手里剑", f"/出招 {rid} 手里剑")],
        [("苦无", f"/出招 {rid} 苦无"), ("龙牙", f"/出招 {rid} 龙牙"), ("虚无", f"/出招 {rid} 虚无")],
    ]
    if scissors:
        rows[1].insert(1, ("剪刀", f"/出招 {rid} 剪刀"))
    return build_keyboard(rows)

# 出招时间戳：{rid:index} -> epoch 秒（超时提醒用）
MOVE_TS = {}

def resolve_rid(parts, sender):
    """解析显式或默认房间，并从后续参数中移除显式房间号。"""
    return resolve_room_args(parts, get_default_room(sender))

def greeting_text():
    return ("🎮 欢迎使用合掌助手！双人对局 · 全私聊操作。\n"
            "/创建 — 建房\n"
            "/房间 — 找有人的房间\n"
            "/规则 — 全部指令")

def handle_command(sender, text, is_group, group_openid, msg_id=""):
    cmd = parse_cmd(text)
    if cmd is None:
        return
    reply = None
    kb = None
    if is_group:
        # 全私聊模式：群内命令一律引导私聊
        qq_send_group(group_openid,
                      "🤫 合掌助手已切换为「全私聊」模式，群内不处理指令。\n"
                      "请私聊机器人（点头像→发消息）使用：\n"
                      "/创建 · /加入 <房间号> · /开始 <房间号> · /出招 <房间号> <招式> · /状态 <房间号>",
                      msg_id)
        return
    try:
        parts = cmd.split()
        action = parts[0] if parts else ""
        if action in ("创建", "create"):
            # 参数：/创建 [HP 攻 锻 盾] [剪刀开|剪刀关]，缺省 1 1 0 0 剪刀开
            nums = []
            for pt in parts[1:]:
                m = re.match(r"^(\d+)$", pt)
                if m:
                    nums.append(int(m.group(1)))
            hp, atk, eng, shd = nums[0] if len(nums) >= 1 else 1, nums[1] if len(nums) >= 2 else 1, nums[2] if len(nums) >= 3 else 0, nums[3] if len(nums) >= 4 else 0
            scissors = not any(pt in ("剪刀关", "无剪刀", "关闭剪刀", "关") for pt in parts[1:])
            room = api("POST", "/rooms", {"ownerId": sender, "ownerName": short_name(sender), "teams": 2, "mode": "duo", "hp": hp, "attack": atk, "energy": eng, "shield": shd, "scissors": scissors})
            set_default_room(sender, room["id"])
            reply = (f"✅ 房间 {room['id']} 已创建（双人对局 · HP{room['settings']['hp']}/攻{room['settings']['attack']}/锻{room['settings']['energy']}/盾{room['settings']['shield']} · 剪刀{'开' if room['settings'].get('scissors', True) else '关'}）。\n"
                     + fmt_room(room)
                     + f"\n📣 把房间号发给对手，让 TA 私聊机器人发送：/加入 {room['id']}，或发 /房间 找对手")
            kb = build_keyboard([[("📋 状态", f"/状态 {room['id']}"), ("🗑️ 解散", f"/删除 {room['id']}")]])
        elif action in ("加入", "join"):
            if len(parts) < 2:
                reply = "用法：/加入 <房间号>"
                return
            rid = parts[1]
            # 双人对局：自动选未占用的队伍（房主队1 → 加入者自动队2）
            team = 0
            try:
                vr = api("POST", f"/rooms/{rid}/view", {"userId": sender})
                occupied = set(p.get("team", 0) for p in vr.get("room", {}).get("players", []))
                for t in range(2):
                    if t not in occupied:
                        team = t
                        break
            except Exception:
                team = 0
            room = api("POST", f"/rooms/{rid}/join", {"userId": sender, "name": short_name(sender), "team": team})
            set_default_room(sender, rid)
            reply = f"✅ 已加入房间 {rid}（队{team + 1}）。\n" + fmt_room(room) + "\n📣 等房主点「开始」或私聊发送：/开始 " + rid
            kb = build_keyboard([[("📋 状态", f"/状态 {rid}"), ("📖 规则", "/规则")]])
            # A：通知房主（recipients[0] 为房主，创建者先加入）
            try:
                rec = api("GET", f"/rooms/{rid}/recipients")
                if rec and rec[0]["id"] != sender:
                    qq_send_c2c(rec[0]["id"],
                                f"🎉 {short_name(sender)} 已加入房间 {rid}，人齐可开局！",
                                keyboard=build_keyboard([[("▶️ 开始对局", f"/开始 {rid}")]]))
            except Exception as e:
                log.warning("join notify owner fail: %s", e)
        elif action in ("开始", "start"):
            rid, parts = resolve_rid(parts, sender)
            if not rid:
                reply = "用法：/开始 <房间号>（或先 /创建 /加入 记住房间）"
                return
            room = api("POST", f"/rooms/{rid}/start", {"userId": sender})
            set_default_room(sender, rid)
            start_text = ("🎮 对局开始！双人各自私聊秘密出招：\n"
                          f"/出招 {room['id']} <招式>\n"
                          "（招式：小刀/剪刀/武士刀/手里剑/苦无/龙牙/虚无/锻造/防/接/闪）\n\n"
                          + fmt_room(room))
            kb = move_buttons(room["id"], room.get("settings", {}).get("scissors", True))
            # 初始化超时时间戳：该房间所有存活位置置当前时间
            rec_all = api("GET", f"/rooms/{rid}/recipients")
            for i in range(len(rec_all)):
                MOVE_TS[f"{rid}:{i}"] = time.time()
            # 开局广播：给每一位房内玩家发招式按钮
            for pl in rec_all:
                if pl.get("id") != sender:
                    qq_send_c2c(pl["id"], start_text, keyboard=kb)
            reply = start_text
        elif action in ("状态", "status", "view"):
            rid, parts = resolve_rid(parts, sender)
            if not rid:
                reply = "用法：/状态 <房间号>（或先操作过房间后直接 /状态）"
                return
            v = api("POST", f"/rooms/{rid}/view", {"userId": sender})
            set_default_room(sender, rid)
            reply = fmt_room(v["room"])
            if v.get("you"):
                reply += f"\n👤 你：锻{v['you']['energy']} HP{v['you']['hp']}"
            if v.get("legal") is not None:
                reply += f"\n可用：{' '.join(m['name'] for m in v['legal'])}"
                # 对局中且存活未提交 → 附出招按钮
                if v["room"]["status"] == "playing" and v["you"] and v["you"].get("alive") and not v["you"].get("submitted"):
                    kb = move_buttons(rid, v["room"].get("settings", {}).get("scissors", True))
        elif action in ("出招", "submit"):
            rid, parts = resolve_rid(parts, sender)
            if not rid:
                reply = "用法：/出招 <房间号> <招式>（或先操作过房间后直接 /出招 <招式>）"
                return
            move_text = parts[1] if len(parts) >= 2 else None
            if not move_text:
                reply = "用法：/出招 <房间号> <招式>（小刀/剪刀/武士刀/手里剑/苦无/龙牙/虚无/锻造/防/接/闪）"
                return
            move = MOVE_ALIAS.get(move_text)
            if not move:
                reply = f"❓ 未知招式：{move_text}（可用：小刀/剪刀/武士刀/手里剑/苦无/龙牙/虚无/锻造/防/接/闪）"
                return
            set_default_room(sender, rid)
            event_id = f"qq-{msg_id}" if msg_id else f"qq-{sender}-{rid}-{time.time_ns()}"
            sub = api("POST", f"/rooms/{rid}/submit", {"userId": sender, "move": move, "eventId": event_id})
            # 记录本方提交时间（超时提醒用）
            try:
                rec_now = api("GET", f"/rooms/{rid}/recipients")
                me_idx = next(i for i, p in enumerate(rec_now) if p.get("id") == sender)
                MOVE_TS[f"{rid}:{me_idx}"] = time.time()
            except Exception as e:
                log.warning("move ts update fail: %s", e)
            if sub.get("resolution") is not None:
                res = sub["resolution"]
                settle_text = "🗡️ 回合结算：\n" + "\n".join(res.get("events", []))
                if res.get("room", {}).get("status") == "finished":
                    settle_text += "\n🏁 对局结束！"
                    # 结束后：房主可重开，双方可导出记录
                    kb = build_keyboard([[("📜 记录", f"/记录 {rid}"), ("🔄 重开", f"/开始 {rid}")]])
                else:
                    # B：未结束 → 附下一轮出招按钮，双方均带
                    kb = move_buttons(rid, res.get("room", {}).get("settings", {}).get("scissors", True))
                reply = settle_text
                # 新一轮从本次结算完成时重新计时，避免沿用上一轮的旧时间戳。
                try:
                    rec_after = api("GET", f"/rooms/{rid}/recipients")
                    now = time.time()
                    for i in range(len(rec_after)):
                        MOVE_TS[f"{rid}:{i}"] = now
                except Exception as e:
                    log.warning("round timer reset fail: %s", e)
                # 全私聊：结算只私聊发给所有参战玩家（对手）
                for pl in api("GET", f"/rooms/{rid}/recipients"):
                    if pl.get("id") != sender:
                        qq_send_c2c(pl["id"], settle_text, keyboard=kb if res.get("room", {}).get("status") != "finished" else None)
            else:
                reply = f"🤫 行动已秘密提交，等待 {sub.get('waiting', '?')} 人出招。"
                # C：通知未提交对手"对方已出招"+出招按钮
                try:
                    view_players = sub.get("view", {}).get("room", {}).get("players", [])
                    rec_now = api("GET", f"/rooms/{rid}/recipients")
                    for i, pl in enumerate(view_players):
                        if pl.get("alive") and not pl.get("submitted") and i < len(rec_now) and rec_now[i].get("id") != sender:
                            # 120秒从“对手已经提交”这一刻开始计算，而非从本轮开局计算。
                            MOVE_TS[f"{rid}:{i}"] = time.time()
                            qq_send_c2c(rec_now[i]["id"],
                                        "🤫 对方已秘密出招，等你出手！",
                                        keyboard=move_buttons(rid, sub.get("view", {}).get("room", {}).get("settings", {}).get("scissors", True)))
                except Exception as e:
                    log.warning("notify opponent fail: %s", e)
        elif action in ("记录", "export", "log"):
            rid, parts = resolve_rid(parts, sender)
            if not rid:
                reply = "用法：/记录 <房间号>（对局结束后导出战斗记录）"
                return
            exp = api("GET", f"/rooms/{rid}/export")
            lines = [f"📜 战斗记录 · 房间 {exp['id']}（{exp['status']}）",
                     f"配置：HP{exp['settings']['hp']} 攻{exp['settings']['attack']} 锻{exp['settings']['energy']} 盾{exp['settings']['shield']} 剪刀{'开' if exp['settings'].get('scissors', True) else '关'}",
                     "───"]
            for p in exp.get("players", []):
                lines.append(f"  {p['name']}（队{p['team'] + 1}）")
            lines.append("───")
            for e in exp.get("log", []):
                lines.append(f"[{str(e.get('at', ''))[11:19]}] {e.get('text', '')}")
            content = "\n".join(lines)
            CHUNK = 1500
            if len(content) <= CHUNK:
                reply = content
            else:
                for i in range(0, len(content), CHUNK):
                    qq_send_c2c(sender, content[i:i + CHUNK])
                reply = None
        elif action in ("房间", "search", "find", "list"):
            rooms = api("GET", "/rooms")
            joinable = [r for r in rooms if r["status"] == "lobby" and len(r["players"]) < 2]
            if not joinable:
                reply = "🏠 当前没有可加入的房间。发 /创建 开一间吧！"
                kb = build_keyboard([[("🎮 创建房间", "/创建")]])
            else:
                lines = ["🔍 当前可加入的房间："]
                btns = []
                for r in joinable[:5]:
                    owner = r["players"][0]["name"] if r["players"] else "?"
                    s = r["settings"]
                    lines.append(f"  {r['id']} · {owner} · {len(r['players'])}/2人 · HP{s['hp']}/攻{s['attack']}/锻{s['energy']}/盾{s['shield']} · 剪刀{'开' if s.get('scissors', True) else '关'}")
                    btns.append((f"加入 {r['id']}", f"/加入 {r['id']}"))
                if len(joinable) > 5:
                    lines.append(f"  …还有 {len(joinable) - 5} 间（直接发房间号即可加入）")
                reply = "\n".join(lines)
                kb = build_keyboard([btns]) if btns else None
        elif action in ("删除", "del", "remove"):
            rid, parts = resolve_rid(parts, sender)
            if not rid:
                reply = "用法：/删除 <房间号>（仅房主可删大厅房间）"
                return
            api("DELETE", f"/rooms/{rid}", {"userId": sender})
            if get_default_room(sender) == rid:
                STATE["default_room"].pop(sender, None)
                save_state(STATE)
            reply = f"🗑️ 房间 {rid} 已解散。"
        elif action in ("取消", "cancel"):
            reply = "👌 已取消。"
        elif action in ("规则", "help"):
            reply = ("🎮 合掌助手（全私聊 · 双人对局）\n"
                     "━━━━━━━━━━\n"
                     "可用指令：\n"
                     "/创建 [HP 攻 锻 盾] [剪刀开|剪刀关] — 创建房间（缺省 1 1 0 0 剪刀开）\n"
                     "/房间 — 搜索可加入的房间\n"
                     "/加入 <房间号> — 加入对手房间（也可直接发房间号）\n"
                     "/开始 <房间号> — 房主开始对局（全员广播）\n"
                     "/出招 <房间号> <招式> — 秘密出招\n"
                     "/状态 <房间号> — 查看房间\n"
                     "/记录 <房间号> — 对局结束后导出战斗记录\n"
                     "/删除 <房间号> — 房主解散大厅房间\n"
                     "/规则 — 本帮助\n"
                     "━━━━━━━━━━\n"
                     "操作过房间后，<房间号> 可省略（自动用最近房间）。\n"
                     "招式：小刀/剪刀/武士刀/手里剑/苦无/龙牙/虚无/锻造/防/接/闪\n"
                     "攻击命中扣对方生命（攻击力点）；护盾可挡一次攻击；重开时锻数清零。")
            kb = build_keyboard([[("🎮 创建房间", "/创建"), ("🔍 找房间", "/房间")]])
        else:
            reply = ("📖 可用指令：\n"
                     "/创建 | /加入 <房间号> | /开始 <房间号> | /出招 <房间号> <招式> | /状态 <房间号> | /规则")
            kb = build_keyboard([[("📖 规则", "/规则"), ("🎮 创建房间", "/创建")]])
        if reply:
            qq_send_c2c(sender, reply, msg_id, kb)
    except Exception as e:
        log.error("handle err: %s", e)
        qq_send_c2c(sender, f"⚠️ {e}", msg_id)

def handle_join_hint(sender, digits, msg_id=""):
    """F：收到纯 6 位房间号 → 确认加入"""
    qq_send_c2c(sender,
                f"🏠 是否加入房间 {digits}？",
                keyboard=build_keyboard([[("✅ 加入", f"/加入 {digits}"), ("❌ 取消", "/取消")]]),
                msg_id=msg_id)

def send_greeting(openid):
    """D：新玩家首次私聊引导"""
    qq_send_c2c(openid, greeting_text(),
                keyboard=build_keyboard([[("🎮 创建房间", "/创建"), ("🔍 找房间", "/房间")]]))

async def reminder_loop():
    """H：出招超时提醒——playing 房间未提交存活玩家超 120s 私聊提醒"""
    while True:
        try:
            rooms = api("GET", "/rooms")
            now = time.time()
            for r in rooms:
                if r["status"] != "playing":
                    continue
                try:
                    rec = api("GET", f"/rooms/{r['id']}/recipients")
                except Exception:
                    continue
                for i, p in enumerate(r["players"]):
                    if i >= len(rec) or not should_remind_player(r["players"], i):
                        continue
                    key = f"{r['id']}:{i}"
                    last = MOVE_TS.get(key)
                    if last is None:
                        MOVE_TS[key] = now
                    elif now - last > 120:
                        qq_send_c2c(rec[i]["id"],
                                    "⏰ 对手已出招，等你出手！别让对方久等～",
                                    keyboard=move_buttons(r["id"], r.get("settings", {}).get("scissors", True)))
                        MOVE_TS[key] = now
        except Exception as e:
            log.warning("reminder loop err: %s", e)
        await asyncio.sleep(30)

# ---- QQ WS 主循环 ----
async def run():
    asyncio.create_task(reminder_loop())
    attempt = 0
    while True:
        try:
            url, token = get_gateway()
            log.info("gateway=%s", url)
            async with websockets.connect(url, max_size=8 * 1024 * 1024, ping_interval=None) as ws:
                attempt = 0
                seq = 0
                hb_task = None

                async def recv_loop():
                    nonlocal seq
                    async for raw in ws:
                        try:
                            msg = json.loads(raw)
                        except Exception:
                            continue
                        op = msg.get("op")
                        d = msg.get("d") or {}
                        t = msg.get("t", "")
                        if op == OP_HELLO:
                            interval = int(d.get("heartbeat_interval", 41250)) / 1000.0
                            await ws.send(json.dumps({"op": OP_IDENTIFY, "d": {"shard": [0, 1], "token": f"QQBot {token}", "intents": INTENTS}}))
                            log.info("identify sent")

                            async def hb():
                                try:
                                    while True:
                                        await asyncio.sleep(max(interval, 5.0))
                                        await ws.send(json.dumps({"op": OP_HEARTBEAT, "d": seq}))
                                except Exception:
                                    pass

                            hb_task = asyncio.create_task(hb())
                        elif op == OP_HEARTBEAT_ACK:
                            pass
                        elif op == OP_RECONNECT:
                            log.info("server reconnect requested")
                            raise ConnectionError("reconnect")
                        elif op == OP_INVALID_SESSION:
                            await ws.send(json.dumps({"op": OP_IDENTIFY, "d": {"shard": [0, 1], "token": f"QQBot {token}", "intents": INTENTS}}))
                        elif op == OP_DISPATCH:
                            seq = d.get("seq", seq)
                            if t == "READY":
                                log.info("READY session=%s", str(d.get("session_id", ""))[:8])
                            elif t == "C2C_MESSAGE_CREATE":
                                await handle_dispatch(d, is_group=False)
                            elif t == "GROUP_MESSAGE_CREATE":
                                await handle_dispatch(d, is_group=True)
                            elif t == "GROUP_AT_MESSAGE_CREATE":
                                await handle_dispatch(d, is_group=True)
                            else:
                                log.info("EVT other t=%s", t)

                async def handle_dispatch(d, is_group):
                    mid = str(d.get("id") or d.get("msg_id") or "")
                    content = str(d.get("content") or "").strip()
                    author = d.get("author") or {}
                    openid = author.get("user_openid") or author.get("id") or ""
                    group_openid = d.get("group_openid", "") if is_group else ""
                    if not content or not openid:
                        return
                    log.info("EVT %s mid=%s from %s group=%s: %s", "group" if is_group else "c2c", str(mid)[:24], openid[:8], group_openid[:8] if group_openid else "-", content[:80])
                    if not content.startswith("/"):
                        # 非命令消息：纯房间号 → 加入确认；未引导用户 → 欢迎引导
                        if not is_group and re.fullmatch(r"\d{6}", content):
                            await asyncio.to_thread(handle_join_hint, openid, content, mid)
                        elif not is_group and openid not in STATE["greeted"]:
                            mark_greeted(openid)
                            await asyncio.to_thread(send_greeting, openid)
                        return
                    log.info("cmd from %s group=%s: %s", openid[:8], group_openid[:8] if group_openid else "-", content[:60])
                    await asyncio.to_thread(handle_command, openid, content, is_group, group_openid, mid)

                await recv_loop()
        except asyncio.CancelledError:
            break
        except Exception as e:
            delay = [2, 5, 10, 30, 60][min(attempt, 4)]
            attempt += 1
            log.warning("ws error (%s), reconnect in %ss (attempt %d)", e, delay, attempt)
            try:
                await asyncio.sleep(delay)
            except asyncio.CancelledError:
                break

def main():
    log.info("════ 合掌助手 QQ 网关启动 ════")
    try:
        asyncio.run(run())
    except KeyboardInterrupt:
        log.info("stopped")

if __name__ == "__main__":
    main()
