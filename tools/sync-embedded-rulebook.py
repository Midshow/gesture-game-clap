"""Replace the v2.5.7 embedded Markdown rulebook from the repository source."""

from __future__ import annotations

import json
import re
from pathlib import Path


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    markdown_path = root / "docs" / "rules" / "unified" / "合掌网页版统一规则（2026-08-03）.md"
    html_path = root / "合掌网页版-正式版本存档" / "合掌网页版v2.5.7.html"
    with markdown_path.open("r", encoding="utf-8-sig", newline="") as source:
        markdown = source.read()
    with html_path.open("r", encoding="utf-8", newline="") as source:
        html = source.read()
    replacement = f"const EMBEDDED_RULEBOOK_MD = {json.dumps(markdown, ensure_ascii=False)};\n\nconst MOVES"
    updated, count = re.subn(
        r"const EMBEDDED_RULEBOOK_MD = .*?;\n\nconst MOVES",
        lambda _: replacement,
        html,
        count=1,
        flags=re.DOTALL,
    )
    if count != 1:
        raise RuntimeError("Could not locate exactly one embedded rulebook literal")
    with html_path.open("w", encoding="utf-8", newline="") as destination:
        destination.write(updated)
    print(f"Embedded {len(markdown)} Markdown characters into {html_path}")


if __name__ == "__main__":
    main()
