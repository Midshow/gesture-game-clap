import unittest

from gateway_logic import resolve_room_args, should_remind_player


class GatewayLogicTests(unittest.TestCase):
    def test_explicit_room_is_removed_before_move_parsing(self):
        room, parts = resolve_room_args(["出招", "123456", "武士刀"], "999999")
        self.assertEqual(room, "123456")
        self.assertEqual(parts, ["出招", "武士刀"])

    def test_default_room_preserves_move_argument(self):
        room, parts = resolve_room_args(["出招", "闪"], "654321")
        self.assertEqual(room, "654321")
        self.assertEqual(parts, ["出招", "闪"])

    def test_no_reminder_before_any_opponent_submits(self):
        players = [
            {"alive": True, "submitted": False},
            {"alive": True, "submitted": False},
        ]
        self.assertFalse(should_remind_player(players, 0))
        self.assertFalse(should_remind_player(players, 1))

    def test_only_waiting_player_is_reminded_after_opponent_submits(self):
        players = [
            {"alive": True, "submitted": True},
            {"alive": True, "submitted": False},
        ]
        self.assertFalse(should_remind_player(players, 0))
        self.assertTrue(should_remind_player(players, 1))

    def test_dead_or_out_of_range_player_is_not_reminded(self):
        players = [
            {"alive": False, "submitted": False},
            {"alive": True, "submitted": True},
        ]
        self.assertFalse(should_remind_player(players, 0))
        self.assertFalse(should_remind_player(players, 2))


if __name__ == "__main__":
    unittest.main()
