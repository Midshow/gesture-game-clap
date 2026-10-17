"""QQ 网关中不依赖网络和配置的纯逻辑，供运行时与测试共同使用。"""

import re


def resolve_room_args(parts, default_room=None):
    """返回 ``(room_id, normalized_parts)``，显式房间号不留在动作参数中。"""
    if len(parts) >= 2 and re.fullmatch(r"\d{6}", parts[1]):
        return parts[1], parts[:1] + parts[2:]
    if default_room:
        return str(default_room), list(parts)
    return None, list(parts)


def should_remind_player(players, index):
    """仅当本人待出招且至少一名其他存活玩家已出招时返回 True。"""
    if index < 0 or index >= len(players):
        return False
    player = players[index]
    if not player.get("alive") or player.get("submitted"):
        return False
    return any(
        i != index and other.get("alive") and other.get("submitted")
        for i, other in enumerate(players)
    )
