# Trio (單T) Strategy — Happy Valley | 2026-09-23 | Race 2

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-23 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --use-saved, --hide-actual)
SCMP DATA: ❌ Skipped (post-meeting blind run) — no form adjustments applied
ODDS SOURCE: HKJC racecard win odds (data/odds/odds_20260923_HV.json, saved pre-off; R1/R2 = racecard snapshot)
             SCMP odds: ❌ not used | HKJC live: ❌ not fetched (blind run) | Place odds: ❌ none (estimated from win odds by MC tool)

RACE: R2 — Class 4 | 1200m | Turf | Good | 12 runners (DEEP WATER BAY HANDICAP)
CLASSIFICATION: Competitive (top Adj Win% 25.6%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

### Data summary (Step 2)

```
Meeting: Happy Valley 2026-09-23 | Going: Good | Surface: Turf
Target Race(s): R2 (Class 4 | 1200m | 12 runners)
Scratchings: none
Odds coverage: 12 horses with win odds (no place odds)
SCMP data: ❌ unavailable (skipped — post-meeting blind run)
```

- ✅ ≥3 starters (12) | ✅ odds for all 12 | ✅ jockey/trainer stats loaded from historical data
- ⚠️ Sparse form: #6 GOLDEN ELITE (1 run), #8 COUNTRY PRIDE (2 runs), #2 VIGOR HAPPINESS (3 runs)
- ⚠️ Layoffs >90 days: #1 FIND MY LOVE (last run 15-Jul, 70 days — OK), #5 TOURBILLON GOLFER & #8 COUNTRY PRIDE (last run 27-May, 119 days)

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 4 | MATZDEN | 25.6% | 60.2% | 3.9 | ✅ | ✅ | 2-4-5-2-4-6 | ★ 膽 (Banker) | 4-7: 13.0% (7.7) |
| 7 | SILVER SPURS | 24.1% | 57.6% | 8.5 | ✅ | ✅ | 8-12-1-12-2-11 | 腳 (Leg) | 4-10: 12.1% (8.2) |
| 10 | BITS SUPERSTAR | 20.5% | 53.0% | 5.5 | ✅ | ✅ | 11-5-10-5-2-2 | 腳 (Leg) | 7-10: 11.4% (8.8) |
| 3 | LOOKING BRIGHT | 11.3% | 38.6% | 9.2 | ✅ | ✅ | 10-2-5-11-8-5 | 腳 (Leg) | 3-4: 7.0% (14.4) |
| 12 | MAJESTIC DELIGHT | 4.7% | 20.4% | 33 | ✅ | ❌ | 12-11-1-4-5-4 | — (replaced by #9) | — |
| 1 | FIND MY LOVE | 4.0% | 18.3% | 19 | ❌ | ❌ | 8-9-1-6-8-4 | — | — |
| 9 | GOOD LUCK BABE | 3.8% | 17.6% | 3.9 | ❌ | ✅ | 3-4-12-10-12-8 | 腳 (Leg) — replacement | — |
| 11 | LEGEND STAR | 2.5% | 12.1% | 22 | ❌ | ❌ | 9-10-12-6-7-1 | — | — |
| 8 | COUNTRY PRIDE | 1.2% | 7.4% | 17 | ❌ | ❌ | 12-3 | — | — |
| 6 | GOLDEN ELITE | 1.1% | 7.4% | 57 | ❌ | ❌ | 13 | — | — |
| 5 | TOURBILLON GOLFER | 0.7% | 4.7% | 15 | ❌ | ❌ | 10-4-7-3-6-9 | — | — |
| 2 | VIGOR HAPPINESS | 0.4% | 2.6% | 31 | ❌ | ❌ | 14-10-14 | — | — |

Market: Overround 22.5%. MC agrees with the market on #4 MATZDEN (joint favourite 3.9). MC rates #7 SILVER SPURS (8.5) as undervalued by about 105% (tool flagged a Place edge on #7 and #10). The main disagreement is joint favourite #9 GOOD LUCK BABE (3.9): MC gives it only 3.8% Win / 17.6% Place. #5 and #2 look overvalued by the market.

---

## STRATEGY A — HORSE RANKINGS

SCMP was skipped, so every factor is `0` and Adj% = raw MC%. Strategy A is therefore the raw MC ranking run through the Mode A–D pool rules.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw/Wt | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|---------|------------|------|
| 4 | MATZDEN | 25.6% | 60.2% | 0 | 0 | 25.6% | 60.2% | 3.9 | A Atzeni | 7 / 132 | — | ★ 膽 (Banker) |
| 7 | SILVER SPURS | 24.1% | 57.6% | 0 | 0 | 24.1% | 57.6% | 8.5 | E C W Wong | 1 / 128 | — | 腳 (Leg) |
| 10 | BITS SUPERSTAR | 20.5% | 53.0% | 0 | 0 | 20.5% | 53.0% | 5.5 | Z Purton | 5 / 119 | — | 腳 (Leg) |
| 3 | LOOKING BRIGHT | 11.3% | 38.6% | 0 | 0 | 11.3% | 38.6% | 9.2 | K Teetan | 8 / 132 | — | 腳 (Leg) |
| 12 | MAJESTIC DELIGHT | 4.7% | 20.4% | 0 | 0 | 4.7% | 20.4% | 33 | H Bentley | 3 / 118 | — | 腳 (Leg) |
| 1 | FIND MY LOVE | 4.0% | 18.3% | 0 | 0 | 4.0% | 18.3% | 19 | M L Yeung | 12 / 135 | — | 腳 (Leg) |
| 9 | GOOD LUCK BABE | 3.8% | 17.6% | 0 | 0 | 3.8% | 17.6% | 3.9 | Y L Chung | 4 / 123 | — | — |
| 11 | LEGEND STAR | 2.5% | 12.1% | 0 | 0 | 2.5% | 12.1% | 22 | L Hewitson | 9 / 118 | — | — |
| 8 | COUNTRY PRIDE | 1.2% | 7.4% | 0 | 0 | 1.2% | 7.4% | 17 | B Avdulla | 10 / 127 | — | — |
| 6 | GOLDEN ELITE | 1.1% | 7.4% | 0 | 0 | 1.1% | 7.4% | 57 | R Kingscote | 6 / 128 | — | — |
| 5 | TOURBILLON GOLFER | 0.7% | 4.7% | 0 | 0 | 0.7% | 4.7% | 15 | M F Poon | 11 / 130 | — | — |
| 2 | VIGOR HAPPINESS | 0.4% | 2.6% | 0 | 0 | 0.4% | 2.6% | 31 | M Chadwick | 2 / 134 | — | — |

Reasoning: The top horse has 25.6% Adj Win%, so the race is Competitive and uses Mode B (6-horse pool). The pool takes the top 3 by Adj Win% (#4, #7, #10) plus the next 3 by Adj Place% (#3, #12, #1). All horses with Adj Place% ≥ 25% (#4, #7, #10, #3) are included. Three horses (#4, #7, #10) clearly lead the model, each above 53% Place%, and #3 is a solid fourth. #4 MATZDEN has 9 starts, so it is eligible as banker, and its form is consistent (2-4-5-2-4-6). The second-ranked horse, #7, has an Adj Place% of 57.6%, below the 63% threshold, so this is a single-banker 膽拖, not 雙膽拖. The 1200m trip at HV favours on-pace runners, and #7 drawing gate 1 helps. #1 FIND MY LOVE has the fastest projected finish time (1:09.70) but only 18.3% MC Place%, so it takes the last pool slot.

## STRATEGY A — TRIO POOL (any order)

```
POOL: #4, #7, #10, #3, #12, #1
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #4 MATZDEN (Adj Place% 60.2%) ← locked in every combo
腳 (Legs):  #7, #10, #3, #12, #1
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS. "Combined Place%" is the product of the three Adj Place% values. It is an independence-approximation index, not a true joint probability.

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|-------------------|-----------------|----------------|
| 1 | #4, #7, #10 | 18.4% | $5.4 |
| 2 | #4, #7, #3 | 13.4% | $7.5 |
| 3 | #4, #10, #3 | 12.3% | $8.1 |
| 4 | #4, #7, #12 | 7.1% | $14.1 |
| 5 | #4, #10, #12 | 6.5% | $15.4 |

## STRATEGY A — TICKET SUMMARY

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKET: 4 膽 × 7, 10, 3, 12, 1 腳
  4-7-10, 4-7-3, 4-10-3, 4-7-12, 4-10-12, 4-7-1, 4-10-1, 4-3-12, 4-3-1, 4-12-1

PASS CONDITIONS:
- If #4 MATZDEN (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (on-pace bias at HV 1200m)

CONFIDENCE: MEDIUM (three-horse top tier clear; banker is joint favourite; no SCMP confirmation)
```

---

## STRATEGY B (MC-only)

```
Banker: #4 MATZDEN (MC Win% 25.6%, MC Place% 60.2%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #7, #10, #3, #12
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #12 MAJESTIC DELIGHT (MC Place% 20.4%, Win odds 33)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #9 GOOD LUCK BABE (Win odds 3.9, MC Place% 17.6%)
Action: #9 replaced #12
Final legs: #7, #10, #3, #9
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

STRATEGY B TICKET: 4 膽 × 7, 10, 3, 9 腳
  4-7-10, 4-7-3, 4-10-3, 4-7-9, 4-10-9, 4-3-9
```

Comparison: Both strategies use the same banker (#4) and the same top-3 legs (#7, #10, #3). Strategy B is cheaper ($60 vs $100). It covers the market co-favourite #9 GOOD LUCK BABE and drops the MC longshots #12 and #1. Strategy A has more legs, and they follow the model more closely.

---

## CAVEATS

- **SCMP skipped (post-meeting blind run).** There are no Star Form, TIR, Vet or trackwork adjustments, so Strategy A equals the raw MC ranking.
- **Odds are racecard snapshot win odds, not live pool odds, and there are no place odds.** R1/R2 in `odds_20260923_HV.json` come from the racecard. The MC tool estimated place odds from win odds, so its Place-bet edges (#7, #10) are less reliable.
- The historical sync and live odds fetch were intentionally not run (blind run). The MC used historical data already on disk.
- #9 GOOD LUCK BABE is the joint favourite (3.9) but ranks only 7th in MC (17.6% Place). Under Mode B rules it is left out of the Strategy A pool, which is the largest model-vs-market disagreement in this race. Strategy B covers it.
- Sparse form: #6 (1 run), #8 (2 runs), #2 (3 runs). #5 and #8 are returning from about 119-day breaks.
- The finish-time projection is inconsistent with the MC ranking (#1 fastest; #7/#10 projected about 2.4s slower). The MC ranking is used, as per the skill.
- HV venue note: upsets are more common here. The race is competitive, not dominant, and the banker's MC Place% is about 60%.
