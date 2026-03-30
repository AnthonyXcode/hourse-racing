#!/usr/bin/env python3
"""
Generate trio_mc_place_replace_review_<date>_<venue>.md from trio_strategy reports + results JSON.

Rule: MC Place% #1 banker; legs = Place%>20; replace lowest leg with each odds<10 & Place%<20 runner (asc odds).
Odds: SCMP Win column from SCMP ODDS / KEY ODDS block only (not 'SCMP DATA:' header).
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


def parse_pct(s: str | None) -> float | None:
    if s is None:
        return None
    s = str(s).strip().replace("%", "").replace("~", "")
    try:
        return float(s)
    except ValueError:
        return None


def parse_mc_simulation(text: str) -> dict[int, dict]:
    horses: dict[int, dict] = {}
    lines = text.splitlines()
    for i, line in enumerate(lines):
        if "MC SIMULATION" not in line.upper():
            continue
        j = i
        while j < min(i + 45, len(lines)):
            ln = lines[j]
            if re.match(r"^\|\s*#\s*\|", ln) and ("MC Win" in ln or "Win%" in ln):
                j += 1
                while j < len(lines):
                    ln2 = lines[j]
                    if not ln2.strip().startswith("|"):
                        break
                    if ln2.strip().startswith("|---"):
                        j += 1
                        continue
                    m = re.match(
                        r"^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([\d.]+)\s*%?\s*\|\s*([\d.]+)\s*%?",
                        ln2,
                    )
                    if m:
                        num = int(m.group(1))
                        horses[num] = {
                            "name": m.group(2).strip(),
                            "mc_win": float(m.group(3)),
                            "mc_place": float(m.group(4)),
                            "odds": None,
                        }
                    j += 1
                break
            j += 1
    return horses


def fill_odds_scmp(text: str, horses: dict[int, dict]) -> None:
    """Fill Win odds from HKJC live block or SCMP odds table (first occurrence)."""
    low = text.lower()
    start = -1
    for marker in (
        "hkjc live odds",
        "scmp key odds",
        "scmp odds table",
        "scmp data table",
        "scmp data (extract)",  # e.g. RACE N SCMP DATA (extract) | Win | Place |
    ):
        i = low.find(marker)
        if i != -1:
            start = i
            break
    if start == -1:
        return
    rest = text[start:]
    end = len(rest)
    # Prefer stopping before MC block / odds narrative
    hard_stops = (
        "\n## mc simulation",
        "\n## mc ",
        "\nodds movement",
        "key qp",
        "philip woo",
        "woo's formline",
        "trackwork highlight",
        "vet concerns",
        "horse rankings",
        "step 4",
        "data summary",
        "race analysis",
    )
    for stop in hard_stops:
        j = rest.lower().find(stop)
        if j != -1 and j < end and (j > 20 or stop.startswith("\n")):
            end = j
    chunk = rest[:end]
    for m in re.finditer(
        r"^\|\s*(\d+)\s*\|\s*[^|]+\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|",
        chunk,
        re.MULTILINE,
    ):
        num = int(m.group(1))
        win = float(m.group(2))
        if num not in horses:
            continue
        if win > 50:
            continue
        horses[num]["odds"] = win


def parse_rankings_mc_pl(text: str) -> dict[int, dict]:
    horses: dict[int, dict] = {}
    lines = text.splitlines()
    in_table = False
    hdr_idx: dict[str, int] = {}
    for line in lines:
        if "HORSE RANKINGS" in line and "sorted" in line.lower():
            in_table = True
            hdr_idx = {}
            continue
        if not in_table:
            continue
        if (
            line.strip().startswith("|")
            and ("MC Pl%" in line or "MC Place%" in line)
            and "Horse" in line
        ):
            cells = [c.strip() for c in line.split("|")]
            for idx, c in enumerate(cells):
                cl = c.lower()
                if c.strip() == "#":
                    hdr_idx["num"] = idx
                if "mc win" in cl and "mkt" not in cl and "blend" not in cl:
                    hdr_idx["mc_win"] = idx
                if "mc pl" in cl or cl == "mc place%":
                    hdr_idx["mc_place"] = idx
                if cl == "odds":
                    hdr_idx["odds"] = idx
            continue
        if in_table and hdr_idx and line.strip().startswith("|"):
            if line.strip().startswith("|---"):
                continue
            cells = [c.strip() for c in line.split("|")]
            if len(cells) < max(hdr_idx.values(), default=0) + 1:
                continue
            mnum = re.match(r"^(\d+)", cells[1].strip())
            if not mnum:
                continue
            num = int(mnum.group(1))
            try:
                mw = parse_pct(cells[hdr_idx["mc_win"]])
                mp = parse_pct(cells[hdr_idx["mc_place"]])
                od = cells[hdr_idx["odds"]].replace("**", "").strip()
                mod = re.match(r"([\d.]+)", od)
                odds = float(mod.group(1)) if mod else None
            except (KeyError, IndexError, AttributeError, TypeError):
                continue
            if mw is None or mp is None:
                continue
            horses[num] = {
                "name": re.sub(r"\s+", " ", cells[2].replace("**", "").strip()),
                "mc_win": mw,
                "mc_place": mp,
                "odds": odds,
            }
        if in_table and line.strip() and not line.strip().startswith("|") and hdr_idx:
            if "SCMP FORM" in line or "RACE ANALYSIS" in line or "PACE SCENARIO" in line:
                break
    return horses


def parse_rankings_rank_table(text: str) -> dict[int, dict]:
    """Parse | Rank | # | Horse | MC Win% | ... | MC Place% | ... | SCMP Win | (trio_strategy R5+ layout)."""
    horses: dict[int, dict] = {}
    lines = text.splitlines()
    in_table = False
    for line in lines:
        # Note: do not test "| #" in line.replace(" ", "")" — stripping spaces removes the space.
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
        if len(parts) < 10:
            continue
        rnk = parts[1].strip()
        if rnk.upper() in ("R", "RANK") or rnk == "":
            continue
        try:
            num = int(parts[2])
        except (ValueError, IndexError):
            continue
        mw = parse_pct(parts[4])
        mp = parse_pct(parts[6])
        if mw is None or mp is None:
            continue
        raw_odds = parts[8].replace("**", "").strip()
        mod = re.match(r"([\d.]+)", raw_odds)
        odds = float(mod.group(1)) if mod else None
        if odds is not None and odds > 150:
            odds = None
        horses[num] = {
            "name": re.sub(r"\s+", " ", parts[3]),
            "mc_win": mw,
            "mc_place": mp,
            "odds": odds,
        }
    return horses


def parse_file(path: Path) -> dict[int, dict]:
    text = path.read_text(encoding="utf-8")
    h = parse_mc_simulation(text)
    if h:
        fill_odds_scmp(text, h)
    if not h:
        h = parse_rankings_mc_pl(text)
    if not h:
        h = parse_rankings_rank_table(text)
    return h


def build_pool(horses: dict[int, dict], odds_lt: float = 10.0):
    if not horses:
        return None, [], None, []
    bnum = max(horses.items(), key=lambda x: x[1]["mc_place"])[0]
    bdat = horses[bnum]
    pool_nums = [n for n, d in horses.items() if d["mc_place"] > 20 and n != bnum]
    pool_nums.sort(key=lambda n: -horses[n]["mc_place"])
    pool_data = {n: dict(horses[n]) for n in pool_nums}
    replacers = [
        (n, horses[n])
        for n in horses
        if horses[n]["odds"] is not None
        and horses[n]["odds"] < odds_lt
        and horses[n]["mc_place"] < 20
    ]
    replacers.sort(key=lambda x: x[1]["odds"])
    log = []
    for n, d in replacers:
        if not pool_nums:
            break
        pool_nums.sort(key=lambda x: -pool_data[x]["mc_place"])
        victim = pool_nums[-1]
        pool_nums.remove(victim)
        del pool_data[victim]
        pool_nums.append(n)
        pool_data[n] = dict(d)
        log.append((victim, n))
    return bnum, pool_nums, bdat, log


def pos_map(race: dict) -> dict[int, int]:
    return {h["horseNumber"]: h["finishPosition"] for h in race["finishOrder"]}


def pos_label(pm: dict[int, int], num: int) -> str:
    if num not in pm:
        return "—"
    p = pm[num]
    suf = {1: "st", 2: "nd", 3: "rd"}.get(p, "th")
    return f"{p}{suf}"


def run_review(
    base: Path,
    date_yyyymmdd: str,
    venue: str,
    title_line: str,
    inputs_line: str,
) -> Path:
    results_path = base / "historical" / f"results_{date_yyyymmdd}_{venue}.json"
    out_path = base / "test_reports" / f"trio_mc_place_replace_review_{date_yyyymmdd}_{venue}.md"
    races = {r["raceNumber"]: r for r in json.loads(results_path.read_text())}

    lines_out: list[str] = []
    lines_out.append(
        f"# Trio strategy review — MC Place% + replacement rule | {title_line}\n\n"
    )
    lines_out.append("**Rule (retrospective)**\n\n")
    lines_out.append(
        "- **Banker**: **MC Place% leader** (highest raw **MC Place%** in the MC table).\n"
    )
    lines_out.append(
        "- **Legs (base)**: all other runners with **MC Place% > 20%** (excluding banker), ordered high → low by Place%.\n"
    )
    lines_out.append(
        "- **Replacement**: each runner with **Win odds < 10** and **MC Place% < 20%** **replaces the current lowest-Place% leg**. Process in **ascending odds** order. **Odds = 10** does **not** qualify.\n"
    )
    lines_out.append(
        "- **Reference bet**: 膽拖 1 banker + N legs → **C(N,2)** × **$10**; **hit** if top 3 ⊆ {banker} ∪ {legs}.\n\n"
    )
    lines_out.append(
        "**Odds source**: **Win** column from **`HKJC LIVE ODDS`** or **`SCMP ODDS TABLE` / `SCMP KEY ODDS`** (first block before MC narrative), not blended ranking rows.\n\n"
    )
    lines_out.append(f"**Inputs**: {inputs_line}\n\n---\n\n")

    total_stake = total_ret = 0
    hits = 0
    races_done = 0

    for rn in range(1, 12):
        path = base / "reports" / f"trio_strategy_{date_yyyymmdd}_{venue}_R{rn}.md"
        if not path.exists():
            lines_out.append(f"## Race {rn}\n\n")
            lines_out.append(
                f"*No `trio_strategy_{date_yyyymmdd}_{venue}_R{rn}.md` in repo — skipped.*\n\n"
            )
            continue
        h = parse_file(path)
        b, legs, bd, rep_log = build_pool(h)
        if not b or not bd:
            lines_out.append(f"## Race {rn}\n\n")
            lines_out.append("*Could not parse MC table — skipped.*\n\n")
            continue
        races_done += 1
        race = races[rn]
        pm = pos_map(race)
        t3 = sorted(race["finishOrder"], key=lambda x: x["finishPosition"])[:3]
        top3 = [x["horseNumber"] for x in t3]
        trio = race["trioDividend"]
        n = len(legs)
        combos = n * (n - 1) // 2 if n >= 2 else 0
        stake = combos * 10
        hit = bool(b) and set(top3).issubset({b} | set(legs))
        if hit:
            hits += 1
            total_ret += trio
        total_stake += stake

        lines_out.append(f"## Race {rn}\n\n")
        lines_out.append(
            f"- **Banker**: #{b} **{bd['name']}** — MC Place **{bd['mc_place']:.1f}%**.\n"
        )
        if rep_log:
            for vic, ins in rep_log:
                lines_out.append(
                    f"- **Swap**: out **#{vic}** ({h[vic]['name']}) → in **#{ins}** ({h[ins]['name']}, Win **{h[ins]['odds']}**).\n"
                )
        else:
            lines_out.append("- **Swaps**: none.\n")
        lines_out.append(
            f"- **Final legs**: {', '.join(f'#{x}' for x in legs)} (**N = {n}**) → C({n},2) = **{combos}** → **Stake ${stake}**.\n"
        )
        lines_out.append(
            f"- **Result**: {'-'.join(map(str, top3))} | Trio **${trio}** | **{'HIT' if hit else 'MISS'}**\n\n"
        )

        lines_out.append(
            "| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |\n"
        )
        lines_out.append(
            "|---|-------|------|--------|------|------------|---------|--------|----------|\n"
        )
        victims = {v for v, _ in rep_log}
        swap_ins = {ins for _, ins in rep_log}
        for num in sorted(h.keys()):
            d = h[num]
            od = d.get("odds")
            odds_s = f"{od:.1f}" if od is not None else "—"
            p20 = "✅" if d["mc_place"] > 20 else "—"
            o10 = "✅" if od is not None and od < 10 else "—"
            if b == num:
                pk = "Banker"
            elif num in legs:
                if num in victims:
                    pk = "— (out)"
                elif num in swap_ins:
                    pk = "✅ swap-in"
                else:
                    pk = "✅ leg"
            else:
                pk = "—"
            fin = pos_label(pm, num)
            lines_out.append(
                f"| {num} | {d['name'][:34]} | {d['mc_win']:.1f}% | {d['mc_place']:.1f}% | {odds_s} | {p20} | {o10} | {pk} | {fin} |\n"
            )
        lines_out.append("\n")

    lines_out.append("---\n\n## Meeting summary\n\n")
    lines_out.append("| Metric | Value |\n|--------|-------|\n")
    lines_out.append(f"| Races with reports | **{races_done}** / 11 |\n")
    lines_out.append(f"| Hits | **{hits}** / {races_done} |\n")
    lines_out.append(f"| Total stake | **${total_stake}** |\n")
    lines_out.append(f"| Return (on hits) | **${total_ret}** |\n")
    lines_out.append(f"| Net | **${total_ret - total_stake:+d}** |\n")

    out_path.write_text("".join(lines_out), encoding="utf-8")
    print(f"Wrote {out_path}")
    print(f"Hits {hits}/{races_done}, stake ${total_stake}, return ${total_ret}")
    return out_path


def main():
    base = Path(__file__).resolve().parents[1]
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--date", default="20260219", help="YYYYMMDD")
    p.add_argument("--venue", default="ST", help="ST or HV")
    p.add_argument(
        "--title",
        default="",
        help='Title subtitle, e.g. "Sha Tin | 19 Feb 2026"',
    )
    args = p.parse_args()
    d = args.date
    v = args.venue.upper()
    title = args.title or (
        f"{'Sha Tin' if v == 'ST' else 'Happy Valley'} | {d[:4]}-{d[4:6]}-{d[6:8]}"
    )
    inputs = (
        f"`data/reports/trio_strategy_{d}_{v}_R*.md`, "
        f"`data/historical/results_{d}_{v}.json`"
    )
    run_review(base, d, v, title, inputs)


if __name__ == "__main__":
    main()
