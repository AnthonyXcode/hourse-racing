# Trio (單T) Strategy — Sha Tin | 2026-10-19 | Race 8

> Retrospective run (generated 2026-10-20, blind to results; odds = final SP)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-19 | Race 8
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | #4 not in saved card (11 runners)
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --use-saved, --hide-actual)
SCMP DATA: ❌ Unavailable (retrospective run — SCMP racecard pages now show the 21-Oct Happy Valley card)
ODDS SOURCE: Final starting prices (SP) from saved race-card snapshot, as loaded by analyze-race.ts
             SCMP odds: ❌ not available | HKJC live: ❌ no longer available (meeting completed)

RACE: R8 — Group 1 | 1600m | Turf | Good | 11 runners (THE SHA TIN TROPHY)
CLASSIFICATION: Competitive (top Adj Win% 22.4%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos (2nd-ranked #8 Adj Place% 53.2% < 63%, so no 雙膽拖)
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Sha Tin 2026-10-19 | Going: Good | Surface: Turf
Target Race(s): R8 (Group 1 | 1600m | 11 runners)
Scratchings: none flagged in snapshot; #4 is absent from the saved card (11 runners, numbers 1-3, 5-12)
Odds coverage: 11 horses with odds (final SP)
SCMP data: ❌ unavailable (retrospective run)
```

- ≥3 starters ✅ | Odds populated for all 11 ✅ | Jockey/trainer stats loaded ✅ | Every runner has 9–10 form lines (no debutants).
- **Long layoffs (>90 days):** #2 MY WISH and #1 VOYAGE BUBBLE (last run 26-Apr, ~176 days), #12 WINNING WING (24-May, ~148 days), #7 LIGHT YEARS CHARM (21-Jun, ~120 days), #5 BEAUTY JOY (12-Jul, ~99 days). This is a season-opening Group 1, so many runners are first-up.
- **Trip experience:** #3 HELIOS EXPRESS has no recorded 1600m runs; #12 has one; #7 has two.
- **Class rise:** banker #10 SKY JEWELLERY (rating 101, 115 lb) last won a Class 2 1400m on 1-Oct (1-4-1-1-1-2). Its prior Group 3 1600m run was a 4th.

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 10 | SKY JEWELLERY | 22.4% | 53.3% | 2.5 | ✅ | ✅ | 1-4-1-1-1-2 | ★ 膽 (Banker) | 8-10: 10.6% (9.5) |
| 8 | STORMY GROVE | 22.2% | 53.2% | 12 | ✅ | ❌ | 3-8-3-1-1-4 | 腳 (Leg) | 2-10: 7.2% (13.9) |
| 2 | MY WISH | 14.7% | 41.9% | 2.8 | ✅ | ✅ | 1-2-4-4-6-4 | 腳 (Leg) | 2-8: 7.1% (14.0) |
| 7 | LIGHT YEARS CHARM | 8.7% | 28.6% | 8.8 | ✅ | ✅ | 2-1-12-4-9-3 | 腳 (Leg) | 7-8: 4.5% (22.1) |
| 11 | SAGACIOUS LIFE | 7.2% | 25.4% | 31 | ✅ | ❌ | 2-7-3-12-14-4 | 腳 (Leg) | — |
| 6 | PATCH OF THETA | 7.9% | 25.2% | 29 | ✅ | ❌ | 7-10-10-5-8-1 | 腳 (Leg) | — |
| 3 | HELIOS EXPRESS | 5.6% | 20.8% | 14 | ✅ | ❌ | 8-6-2-2-2-5 | 腳 (Leg) | — |
| 9 | SOLEIL FIGHTER | 3.4% | 15.1% | 57 | ❌ | ❌ | 5-7-4-1-7-2 | — | — |
| 1 | VOYAGE BUBBLE | 3.6% | 14.8% | 33 | ❌ | ❌ | 5-3-5-3-1-2 | — | — |
| 5 | BEAUTY JOY | 2.5% | 11.9% | 21 | ❌ | ❌ | 1-1-2-5-11-6 | — | — |
| 12 | WINNING WING | 2.0% | 9.8% | 31 | ❌ | ❌ | 5-3-8-3-1-5 | — | — |

Market: Overround 22.0%. MC and market agree on the favourite #10 (2.5) but split on the rest. MC has #8 STORMY GROVE as a near co-top pick (22.2% vs ~8% implied at 12; flagged undervalued 166%) and rates the 2nd favourite #2 MY WISH (2.8) well below the market (14.7% vs ~36% implied). #6 (+128%) and #11 (+122%) are also flagged undervalued. The analyzer's own bet was Place #8 @3.14 (HK$500, 67% edge).

---

## STRATEGY A

### HORSE RANKINGS

SCMP was unavailable, so all factors are 0 and Adj% = MC%.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 10 | SKY JEWELLERY | 22.4% | 53.3% | 0 | 0 | 22.4% | 53.3% | 2.5 | A Badel | — | — (n/a) | ★ 膽 (Banker) |
| 8 | STORMY GROVE | 22.2% | 53.2% | 0 | 0 | 22.2% | 53.2% | 12 | K C Leung | — | — (n/a) | 腳 (Leg) |
| 2 | MY WISH | 14.7% | 41.9% | 0 | 0 | 14.7% | 41.9% | 2.8 | Z Purton | — | — (n/a) | 腳 (Leg) |
| 7 | LIGHT YEARS CHARM | 8.7% | 28.6% | 0 | 0 | 8.7% | 28.6% | 8.8 | K Teetan | — | — (n/a) | 腳 (Leg) |
| 6 | PATCH OF THETA | 7.9% | 25.2% | 0 | 0 | 7.9% | 25.2% | 29 | M F Poon | — | — (n/a) | 腳 (Leg) |
| 11 | SAGACIOUS LIFE | 7.2% | 25.4% | 0 | 0 | 7.2% | 25.4% | 31 | E C W Wong | — | — (n/a) | 腳 (Leg) |
| 3 | HELIOS EXPRESS | 5.6% | 20.8% | 0 | 0 | 5.6% | 20.8% | 14 | A Atzeni | — | — (n/a) | — |
| 1 | VOYAGE BUBBLE | 3.6% | 14.8% | 0 | 0 | 3.6% | 14.8% | 33 | C L Chau | — | — (n/a) | — |
| 9 | SOLEIL FIGHTER | 3.4% | 15.1% | 0 | 0 | 3.4% | 15.1% | 57 | H Bentley | — | — (n/a) | — |
| 5 | BEAUTY JOY | 2.5% | 11.9% | 0 | 0 | 2.5% | 11.9% | 21 | B Avdulla | — | — (n/a) | — |
| 12 | WINNING WING | 2.0% | 9.8% | 0 | 0 | 2.0% | 9.8% | 31 | M L Yeung | — | — (n/a) | — |

Note: ★ 膽 = Banker. #10 has 9 form lines, so it is an eligible banker (≥2 starts). The 2nd-ranked #8 has Adj Place% 53.2%, below the 63% needed for 雙膽拖, so the structure is single-banker 膽拖.

**Reasoning:** The top Adj Win% is 22.4% (#10), which makes the race Competitive, so it uses Mode B. The pool is the top 3 by Adj Win% (#10, #8, #2) plus the next 3 by Adj Place% (#7 28.6%, #11 25.4%, #6 25.2%). That includes every horse with Adj Place% ≥ 25%.

- **#10 SKY JEWELLERY** has won 4 of its last 6 and is the market favourite. However, this is a big step up from a Class 2 win, and its only recent Group-level 1600m run was a 4th.
- **#8 STORMY GROVE** is level with #10 on MC (22.2% / 53.2%) at 12 on the board, and the top MC quinella is 8-10 (10.6%). It is the main value leg.
- **#2 MY WISH** has Purton (22% from 102 rides), 7 runs at the trip, and won its last start, which was a Group 1 1600m. MC still rates it well under its 2.8 price, partly because of the 131 lb weight and ~176-day layoff.
- **#7, #11, #6** fill the pool on Place% at 25–29%. #6 has the fastest projected time (1:32.52) from draw 1. #7 has the 2nd-best projected time from draw 2.
- **#3 HELIOS EXPRESS** (14, MC Place% 20.8%) misses the 6-horse pool by Place% rank. It has no recorded 1600m form. Rule 8 in the reminders says ≥20% Adj Place% must be in the pool, but section 4c sets the must-include threshold at 25% with a 6-horse cap for Mode B. This report follows 4c. Strategy B covers #3.

No pace read is available without SCMP Star Form.

### TRIO POOL (any order)

```
POOL: #10, #8, #2, #7, #11, #6
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #10 SKY JEWELLERY (Adj Place% 53.3%) ← locked in every combo
腳 (Legs):  #8, #2, #7, #11, #6
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville approximation from MC Win%):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #10, #8, #2 | 9.0% | $11.1 |
| 2 | #10, #8, #7 | 5.0% | $20.2 |
| 3 | #10, #8, #6 | 4.5% | $22.4 |
| 4 | #10, #8, #11 | 4.0% | $24.8 |
| 5 | #10, #2, #7 | 2.9% | $34.0 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), banker #10, legs 8, 2, 7, 11, 6)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

ALL COMBINATIONS (est. prob):
  10-8-2 9.0% | 10-8-7 5.0% | 10-8-6 4.5% | 10-8-11 4.0% | 10-2-7 2.9%
  10-2-6 2.6% | 10-2-11 2.4% | 10-7-6 1.4% | 10-7-11 1.3% | 10-11-6 1.2%
  Ticket coverage (sum): ~34.4%
  Banker top 3 (MC): 53.3%

PASS CONDITIONS:
- If #10 SKY JEWELLERY (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good)

CONFIDENCE: LOW (Competitive Group 1. The banker has only a 53% MC place rate and is stepping up from Class 2, and ticket coverage is ~34%.)
```

---

## STRATEGY B (MC-only)

```
Banker: #10 SKY JEWELLERY (MC Win% 22.4%, MC Place% 53.3%) ← 1st by MC Win% (#8 is 22.2%, a near tie)
Primary legs (MC Place% > 20%): #8 (53.2%), #2 (41.9%), #7 (28.6%), #11 (25.4%), #6 (25.2%), #3 (20.8%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #11 (25.4%, 31), #6 (25.2%, 29), #3 (20.8%, 14)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none (all horses at <10 odds — #10, #2, #7 — are already above 20% Place)
Action: no replacement or addition
Final legs: #8, #2, #7, #11, #6, #3
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #10 / 腳 #8, #2, #7, #11, #6, #3
  10-8-2 9.0% | 10-8-7 5.0% | 10-8-6 4.5% | 10-8-11 4.0% | 10-8-3 3.1%
  10-2-7 2.9% | 10-2-6 2.6% | 10-2-11 2.4% | 10-2-3 1.8% | 10-7-6 1.4%
  10-7-11 1.3% | 10-11-6 1.2% | 10-7-3 1.0% | 10-6-3 0.9% | 10-11-3 0.8%
  Ticket coverage (sum): ~42.0%
```

Comparison: Strategy B has the same banker and the same five legs as Strategy A, plus #3 HELIOS EXPRESS (MC Place% 20.8%). The extra leg adds 5 combos and $50 (Strategy B $150 vs Strategy A $100) for about +7.6 points of estimated coverage (42.0% vs 34.4%). The two tickets differ only when #3 finishes in the top 3 with #10.

---

## CAVEATS

- **Retrospective run:** generated 2026-10-20, blind to results. The scheduled pre-race run was missed.
- **Odds are final SP, not morning odds.** They include late market moves that a pre-race run would not have seen, so the Win-odds<10 flags and the undervalued/overvalued reads reflect closing prices.
- **SCMP unavailable (retrospective run).** There are no Star Form, TIR, vet, trackwork, QP/Q matrix or running-style inputs. Strategy A adjustments are all 0, so Adj% = MC%. Strategy B is unaffected.
- **Banker is a near coin-flip with #8.** #10 (22.4%) is ahead of #8 (22.2%) by only 0.2 points of MC Win%. MC rates both at ~53% to place, so the banker has about a 47% chance of missing and losing the whole ticket.
- **Model/market split on #2 MY WISH** (2.8, MC 14.7% win) and #8 STORMY GROVE (12, MC 22.2% win). Both are legs in both strategies.
- **First-up runners:** #2, #1, #12, #7 and #5 are returning from 99–176 day layoffs, which adds form uncertainty.
- **#4 absent** from the saved race card (11 runners). It was treated as a non-runner.
- **Pool-threshold ambiguity:** #3 (MC Place% 20.8%) is excluded from Strategy A under the 4c ≥25% / 6-horse Mode B rule, but would qualify under Reminder 8's ≥20% wording.
- Trio combination probabilities are a Harville approximation from MC Win%, not direct MC trio counts.
- Historical sync, odds fetch and racecard scrape were intentionally not run. The data is the prepared leak-free snapshot.

```
═══════════════════════════════════════════════════════════
```
