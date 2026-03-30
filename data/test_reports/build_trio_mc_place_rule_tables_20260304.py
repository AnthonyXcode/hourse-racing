#!/usr/bin/env python3
"""Build full-field, MC-Place%-sorted tables for trio_mc_place_rule_review_20260304_HV.md."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from generate_trio_mc_place_replace_review import fill_odds_scmp, parse_mc_simulation

BASE = Path(__file__).resolve().parents[1]
REPORTS = BASE / "reports"
RES_PATH = BASE / "historical/results_20260304_HV.json"


def parse_pct_cell(s: str):
    if s is None or not str(s).strip():
        return None, False
    s = str(s)
    approx = "~" in s
    t = s.strip().replace("%", "").replace("~", "").strip()
    try:
        return float(t), approx
    except ValueError:
        return None, approx


def parse_rankings_all_rows(text: str) -> dict:
    horses: dict = {}
    in_table = False
    for line in text.splitlines():
        if "| Rank |" in line and "MC Place%" in line and "Adj Win%" in line:
            in_table = True
            continue
        if not in_table:
            continue
        if line.strip().startswith("|---"):
            continue
        if not line.strip().startswith("|"):
            break
        parts = [p.strip() for p in line.split("|")]
        if len(parts) < 11:
            continue
        rnk = parts[1]
        if rnk.upper() in ("R", "RANK") or rnk == "":
            continue
        try:
            num = int(parts[2])
        except ValueError:
            continue
        mw, _ = parse_pct_cell(parts[4])
        mp, mp_approx = parse_pct_cell(parts[6])
        raw_odds = parts[8].replace("**", "").strip()
        m = re.match(r"([\d.]+)", raw_odds)
        odds = float(m.group(1)) if m else None
        if odds is not None and odds > 150:
            odds = None
        tail = [p for p in parts[9:] if p != ""]
        role = tail[-1] if tail else "—"
        horses[num] = {
            "name": re.sub(r"\s+", " ", parts[3]),
            "mc_win": mw,
            "raw_win": parts[4].strip(),
            "mc_place": mp,
            "raw_place": parts[6].strip(),
            "mp_approx": mp_approx,
            "odds": odds,
            "role": role,
        }
    return horses


def parse_win_odds_movement(text: str) -> dict[int, float]:
    """HKJC Win from Odds Movement table (current / New Win column)."""
    odds_map: dict[int, float] = {}
    low = text.lower()
    start = low.find("odds movement")
    if start == -1:
        return odds_map
    sec = text[start : start + 25000].splitlines()
    win_col = 4  # default: | # | Name | col3 | col4 (current win)
    for line in sec[:25]:
        if "| #" not in line or "horse" not in line.lower():
            continue
        hdr = [p.strip().lower() for p in line.split("|")]
        for j, h in enumerate(hdr):
            if "new win" in h or h == "updated":
                win_col = j
                break
        else:
            continue
        break
    for line in sec:
        if not line.strip().startswith("|"):
            continue
        parts = [p.strip() for p in line.split("|")]
        # Stop at a second header row (e.g. SCMP | # | Horse | Win | Place | …).
        if (
            len(parts) > 3
            and parts[1] == "#"
            and parts[2].lower() == "horse"
            and "win" in line.lower()
            and "place" in line.lower()
            and "old win" not in line.lower()
            and "early am" not in line.lower()
            and "adj win" not in line.lower()
        ):
            break
        if len(parts) < 5:
            continue
        try:
            num = int(parts[1])
        except ValueError:
            continue
        if win_col < len(parts):
            cell = parts[win_col].split()[0] if parts[win_col] else ""
            cell = cell.replace("↓", "").replace("↑", "").replace("→", "").strip()
            if re.match(r"^[\d.]+$", cell):
                try:
                    v = float(cell)
                    if 1.0 <= v <= 400:
                        odds_map[num] = v
                except ValueError:
                    pass
    return odds_map


def parse_race_card_win_odds(text: str) -> dict[int, float]:
    """| # | Horse | Win | Place | from RACE CARD DATA TABLE (fallback)."""
    odds_map: dict[int, float] = {}
    low = text.lower()
    if "race card data table" not in low:
        return odds_map
    start = low.find("race card data table")
    sec = text[start : start + 12000]
    in_table = False
    for line in sec.splitlines():
        if "| #" in line and "horse" in line.lower() and "win" in line.lower():
            in_table = True
            continue
        if not in_table:
            continue
        if line.strip().startswith("|---"):
            continue
        if not line.strip().startswith("|"):
            break
        parts = [p.strip() for p in line.split("|")]
        if len(parts) < 5:
            continue
        try:
            num = int(parts[1])
        except ValueError:
            continue
        cell = parts[3].split()[0] if len(parts) > 3 and parts[3] else ""
        if re.match(r"^[\d.]+$", cell):
            try:
                v = float(cell)
                if 1.0 <= v <= 400:
                    odds_map[num] = v
            except ValueError:
                pass
    return odds_map


def fmt_win(d: dict) -> str:
    if d.get("mc_win") is None:
        return "—"
    r = d.get("raw_win", "")
    if "~" in r:
        return r if "%" in r else r + "%"
    return f"{d['mc_win']:.1f}%"


def fmt_place(d: dict) -> str:
    if d.get("mc_place") is None:
        return "—"
    r = d.get("raw_place", "")
    if "~" in r:
        return r if "%" in r else r + "%"
    return f"{d['mc_place']:.1f}%"


def is_leg_place_rule(mp, mp_approx) -> bool:
    if mp is None:
        return False
    if mp_approx:
        return False
    return mp > 20.0


def is_leg(d: dict, bnum: int | None, num: int) -> bool:
    if bnum is None or num == bnum:
        return False
    od = d.get("odds")
    pl = d.get("mc_place")
    ap = d.get("mp_approx", False)
    if pl is None:
        return False
    if is_leg_place_rule(pl, ap):
        return True
    if od is not None and od < 10.0:
        return True
    return False


def pos_label(pm: dict, num: int) -> str:
    if num not in pm:
        return "—"
    p = pm[num]
    suf = {1: "st", 2: "nd", 3: "rd"}.get(p, "th")
    return f"{p}{suf}"


def build_race_table(rn: int, races: dict, text: str) -> str:
    race = races[rn]
    pm = {x["horseNumber"]: x["finishPosition"] for x in race["finishOrder"]}
    names = {x["horseNumber"]: x["horseName"] for x in race["finishOrder"]}
    field = sorted(pm.keys())

    ranked = parse_rankings_all_rows(text)
    mc_full = parse_mc_simulation(text)
    if mc_full:
        fill_odds_scmp(text, mc_full)

    odds_move = parse_win_odds_movement(text)
    odds_card = parse_race_card_win_odds(text)

    rows: list[tuple[int, dict]] = []
    for num in field:
        nm = names.get(num, "?")
        if num in ranked:
            d = dict(ranked[num])
        elif num in mc_full:
            d = {
                "name": mc_full[num]["name"],
                "mc_win": mc_full[num]["mc_win"],
                "raw_win": f"{mc_full[num]['mc_win']:.1f}%",
                "mc_place": mc_full[num]["mc_place"],
                "raw_place": f"{mc_full[num]['mc_place']:.1f}%",
                "mp_approx": False,
                "odds": mc_full[num].get("odds"),
                "role": "—",
            }
            if d["odds"] is None:
                d["odds"] = odds_move.get(num) or odds_card.get(num)
        else:
            d = {
                "name": nm,
                "mc_win": None,
                "raw_win": "",
                "mc_place": None,
                "raw_place": "",
                "mp_approx": False,
                "odds": odds_move.get(num) or odds_card.get(num),
                "role": "—",
            }
        if d.get("odds") is None:
            d["odds"] = odds_move.get(num) or odds_card.get(num)
        rows.append((num, d))

    with_place = [(n, d) for n, d in rows if d.get("mc_place") is not None]
    bnum = max(with_place, key=lambda x: x[1]["mc_place"])[0] if with_place else None

    out: list[str] = []
    out.append(
        "| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Role | Picked | Finished |\n"
    )
    out.append(
        "|---|-------|------|--------|------|------------|---------|------|--------|----------|\n"
    )

    def sort_key(item: tuple[int, dict]):
        n, d = item
        mp = d.get("mc_place")
        if mp is None:
            return (-1.0, -n)
        return (mp, 0)

    for num, d in sorted(rows, key=sort_key, reverse=True):
        od = d.get("odds")
        odds_s = f"{od:.1f}" if od is not None else "—"
        mp, ap = d.get("mc_place"), d.get("mp_approx", False)
        if mp is None:
            p20, o10, pk = "—", "—", "—"
        else:
            p20 = "✅" if is_leg_place_rule(mp, ap) else "—"
            o10 = "✅" if od is not None and od < 10.0 else "—"
            if bnum is None:
                pk = "—"
            elif num == bnum:
                pk = "Banker"
            elif is_leg(d, bnum, num):
                pk = "✅ leg"
            else:
                pk = "—"
        role = (d.get("role") or "—").replace("|", "/")[:44]
        nm = (d.get("name") or names.get(num, "?"))[:34]
        out.append(
            f"| {num} | {nm} | {fmt_win(d)} | {fmt_place(d)} | {odds_s} | {p20} | {o10} | {role} | {pk} | {pos_label(pm, num)} |\n"
        )
    return "".join(out)


REVIEW_MD = BASE / "test_reports/trio_mc_place_rule_review_20260304_HV.md"


def patch_review_md() -> None:
    import re

    races = {r["raceNumber"]: r for r in json.loads(RES_PATH.read_text())}
    text = REVIEW_MD.read_text(encoding="utf-8")
    tbl_pat = re.compile(
        r"\n\| # \| Horse \| Win% \| Place% \| Odds \| Place%>20% \| odds<10 \| Role \| Picked \| Finished \|\n\|---[^\n]*\n[\s\S]*?(?=\n\n- \*\*Banker\*\*)"
    )
    for rn in range(1, 10):
        rep_path = REPORTS / f"trio_strategy_20260304_HV_R{rn}.md"
        rep_text = rep_path.read_text(encoding="utf-8")
        tbl = build_race_table(rn, races, rep_text)
        if rn < 9:
            sec_pat = re.compile(rf"(### R{rn} —[\s\S]*?)(?=### R{rn + 1} —|\n## 2\.)", re.MULTILINE)
        else:
            sec_pat = re.compile(rf"(### R{rn} —[\s\S]*?)(?=\n## 2\.)", re.MULTILINE)
        m = sec_pat.search(text)
        if not m:
            raise SystemExit(f"Could not find section R{rn} in {REVIEW_MD}")
        section = m.group(1)
        new_section, n = tbl_pat.subn("\n" + tbl.rstrip("\n"), section, count=1)
        if n != 1:
            raise SystemExit(f"Table replace failed for R{rn} (matches={n})")
        text = text[: m.start()] + new_section + text[m.end() :]
    REVIEW_MD.write_text(text, encoding="utf-8")
    print(f"Updated {REVIEW_MD}")


def main():
    patch_review_md()


if __name__ == "__main__":
    main()
