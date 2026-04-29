# Strategy B Review — MC #1 banker + MC top 6 pool (trio SKILL) | Happy Valley | 29 Apr 2026

## Rules

- **Banker**: MC **#1** by MC Win% (same as "MC #1" in reports).
- **Pool**: Always first **6** horses by raw MC Win% descending.
- **Bet type**: Trio (單T) — top 3 in **any** order.
- **Unit**: **$10** per combination; structure **膽拖** 1 banker + 5 legs → **C(5, 2) = 10** combos.
- **Stake**: **$100 fixed per race**, all 9 races played (no PASS).
- **No SCMP, no jockey boost, no debutant rule.**

**Results source:** `data/historical/results_20260429_HV.json`.
**Pre-race definitions:** `data/reports/trio_strategy_20260429_HV_R1.md` … `R9.md` (MC SIMULATION raw tables).

---

## Summary

| Metric | Strategy B | Strategy A |
|--------|-----------|-----------|
| Races played | **9 (R1–R9)** | **9 (R1–R9)** |
| Hit rate | **1/9 (11.1%)** | **2/9 (22.2%)** |
| Total staked | **$900** | **$730** |
| Total returned | **$409** | **$620** |
| **Net P&L** | **−$491** | **−$110** |
| **ROI** | **−54.6%** | **−15.1%** |
| Session Result | **LOSS (both)** | **A outperforms by +$381** |

---

## Race-by-Race Results

### Strategy B

| Race | Class | Dist | Surf | Banker (MC#1) | Final legs (MC #2–#6) | Combos | Stake | Result (1→2→3) | Banker top 3? | Hit? | Trio $ | Return | P&L |
|------|-------|------|------|---------------|----------------------|--------|-------|----------------|---------------|------|--------|--------|-----|
| R1 | C5 | 1800m | Turf | #5 FAMILY FORTUNE (30.6W/70.3P) | #7,#1,#8,#6,#9 | 10 | $100 | 4→3→5 | 3rd ✅ | ❌ | $1,674 | $0 | −$100 |
| R2 | C4 | 1200m | Turf | #6 THE PERFECT MATCH (37.9W/71.6P) | #4,#9,#3,#10,#2 | 10 | $100 | 4→12→6 | 3rd ✅ | ❌ | $613 | $0 | −$100 |
| R3 | C4 | 2200m | Turf | #2 NOBLE PURSUIT (31.5W/66.2P) | #3,#11,#5,#9,#8 | 10 | $100 | 10→5→8 | ❌ | ❌ | $15,142 | $0 | −$100 |
| R4 | C4 | 1200m | Turf | #1 CROSSBORDERDUDE (47.6W/82.5P) | #3,#2,#5,#7,#4 | 10 | $100 | 3→11→1 | 3rd ✅ | ❌ | $117 | $0 | −$100 |
| R5 | C4 | 1200m | Turf | #2 SUPERB KING (37.4W/69.3P) | #5,#8,#7,#3,#9 | 10 | $100 | 8→2→12 | 2nd ✅ | ❌ | $148 | $0 | −$100 |
| R6 | C4 | 1650m | Turf | #3 BEAUTY VIVA (27.7W/60.9P) | #1,#9,#8,#2,#6 | 10 | $100 | 4→1→6 | ❌ | ❌ | $4,108 | $0 | −$100 |
| R7 | C2 | 1000m | Turf | #2 COLOURFUL KING (40.5W/78.3P) | #8,#3,#10,#1,#9 | 10 | $100 | 3→8→2 | 3rd ✅ | **✅** | $409 | $409 | +$309 |
| R8 | C3 | 1200m | Turf | #4 GIANT BALLON (44.8W/81.2P) | #2,#8,#12,#3,#6 | 10 | $100 | 4→6→11 | 1st ✅ | ❌ | $577 | $0 | −$100 |
| R9 | C3 | 1650m | Turf | #6 ARMOR GOLDEN EAGLE (34.3W/71.0P) | #5,#2,#1,#9,#4 | 10 | $100 | 6→12→5 | 1st ✅ | ❌ | $211 | $0 | −$100 |
| **TOTAL** | | | | | | **90** | **$900** | | **7/9 ✅** | **1/9** | | **$409** | **−$491** |

### Strategy A

| Race | Class | Mode | Banker(s) | Legs | Combos | Stake | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|--------|-------|----------------|------|--------|--------|-----|-------------|
| R1 | C5 | 雙膽拖 2+4 | #5,#7 | #1,#6,#8,#4 | 4 | $40 | 4→3→5 | ❌ | $1,674 | $0 | −$40 | Co-banker #7 4th + pool gap #3 |
| R2 | C4 | A (tight 5) | #6 | #4,#9,#3,#10 | 6 | $60 | 4→12→6 | ❌ | $613 | $0 | −$60 | Banker hit, pool gap #12 (15x) |
| R3 | C4 | B (6) | #2 | #3,#11,#5,#9,#8 | 10 | $100 | 10→5→8 | ❌ | $15,142 | $0 | −$100 | Banker fail + pool gap #10 (88x upset) |
| R4 | C4 | A* (6) | #1 | #2,#3,#4,#5,#7 | 10 | $100 | 3→11→1 | ❌ | $117 | $0 | −$100 | Banker hit, pool gap #11 (4.6x) |
| R5 | C4 | A* (6) | #2 | #5,#8,#7,#3,#9 | 10 | $100 | 8→2→12 | ❌ | $148 | $0 | −$100 | Banker hit, pool gap #12 (9.6x) |
| R6 | C4 | B (6) | #3 | #1,#9,#8,#2,#10 | 10 | $100 | 4→1→6 | ❌ | $4,108 | $0 | −$100 | Banker fail + pool gap #4 (11x vet-excluded) |
| R7 | C2 | 雙膽拖 2+3 | #2,#8 | #3,#10,#1 | 3 | $30 | 3→8→2 | **✅** | $409 | $409 | +$379 | 雙膽拖 converts — campaign first |
| R8 | C3 | A* (6) | #4 | #2,#8,#12,#3,#6 | 10 | $100 | 4→6→11 | ❌ | $577 | $0 | −$100 | Banker hit, pool gap #11 (16x) |
| R9 | C3 | B (6) | #6 | #5,#2,#1,#11,#12 | 10 | $100 | 6→12→5 | **✅** | $211 | $211 | +$111 | **SCMP +excuses #12 inclusion pays off** |
| **TOTAL** | | | | | **73** | **$730** | | **2/9** | | **$620** | **−$110** | |

---

## Banker Performance (MC #1)

| Race | MC #1 | MC Win% | MC Place% | SP | Finish | Top 3? |
|------|-------|---------|-----------|-----|--------|--------|
| R1 | #5 FAMILY FORTUNE | 30.6% | 70.3% | 10x | 3rd | ✅ |
| R2 | #6 THE PERFECT MATCH | 37.9% | 71.6% | 12x | 3rd | ✅ |
| R3 | #2 NOBLE PURSUIT | 31.5% | 66.2% | 7.6x | Unplaced | ❌ |
| R4 | #1 CROSSBORDERDUDE | 47.6% | 82.5% | 2.8x | 3rd | ✅ |
| R5 | #2 SUPERB KING | 37.4% | 69.3% | 3.7x | 2nd | ✅ |
| R6 | #3 BEAUTY VIVA | 27.7% | 60.9% | — | Unplaced | ❌ |
| R7 | #2 COLOURFUL KING | 40.5% | 78.3% | 3.2x | 3rd | ✅ |
| R8 | #4 GIANT BALLON | 44.8% | 81.2% | 2.7x | 1st | ✅ |
| R9 | #6 ARMOR GOLDEN EAGLE | 34.3% | 71.0% | 2.8x | 1st | ✅ |

**MC #1 banker top-3 rate: 7/9 (77.8%)** — campaign best meeting.

---

## Miss Analysis

### Strategy B Miss Patterns

| Pattern | Count | Races | Missed $ |
|---------|-------|-------|----------|
| B — Banker hit, pool gap | 5 | R1, R2, R4, R5, R8 | $3,129 |
| C — Banker fail + pool gap | 2 | R3, R6 | — |
| B — Banker hit, pool gap (A-only hit) | 1 | R9 | $211 |
| Hit | 1 | R7 | +$409 |

Strategy B's persistent weakness: 5 of 7 misses had the banker in the top 3 — the pool just couldn't cover the third placer. The most impactful was R9 where the pool gap (#12 WITH ALL MY FAITH, MC 0.2%) was structurally unreachable by MC top 6.

---

## A vs B Divergence

| Race | What Differed | A Result | B Result | Impact |
|------|--------------|----------|----------|--------|
| R1 | A: 雙膽拖 $40, pool incl. #4. B: 膽拖 $100, pool incl. #9 not #4. | MISS | MISS | A saved $60 |
| R2 | A: tight 5-pool $60. B: 6-pool $100. | MISS | MISS | A saved $40 |
| R6 | A: swaps #6→#10. B: keeps #6. | MISS | MISS | Same outcome (banker fail); A's pool worse |
| R7 | A: 雙膽拖 $30. B: 膽拖 $100. | **HIT** | **HIT** | A saved **$70** |
| R9 | **A: SCMP includes #12. B: MC top 6 has #9,#4 instead.** | **HIT** | MISS | **A gained $211** |

**Net impact of divergence:** A saved $170 in stake across losing races + gained $211 on R9 hit = **+$381 advantage**.

---

## Session Verdict

Strategy A decisively outperformed Strategy B this session (−$110 vs −$491, +$381 delta). The edge came from two sources: **structural savings** (雙膽拖 at $30 vs $100 in R7, plus tighter pools in R1/R2) and **SCMP intelligence** (R9's #12 inclusion was the only path to the $211 Trio). This is the strongest single-session validation of the full pipeline's SCMP overlay over pure MC ranking. Strategy B's MC top 6 cannot mechanically include horses ranked 7th or below — and when those horses place (as #12 did in R9), the gap is unbridgeable.
