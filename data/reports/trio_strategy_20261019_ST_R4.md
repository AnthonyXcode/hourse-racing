# Trio (單T) Strategy — Sha Tin | 2026-10-19 | Race 4

> Retrospective run (generated 2026-10-20, blind to results; odds = final SP)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-19 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --use-saved, --hide-actual)
SCMP DATA: ❌ Unavailable (retrospective run — SCMP racecard pages now show the 21-Oct Happy Valley card)
ODDS SOURCE: Final starting prices (SP) from saved race-card snapshot, as loaded by analyze-race.ts
             SCMP odds: ❌ not available | HKJC live: ❌ no longer available (meeting completed)

RACE: R4 — Class 4 | 1400m | Turf | Good | 14 runners (SUN CHUI HANDICAP)
CLASSIFICATION: Dominant (top Adj Win% 49.2%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE: 膽拖 1膽 + 4腳 → C(4,2) = 6 (banker moved to #4: #7 has only 1 start)
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Sha Tin 2026-10-19 | Going: Good | Surface: Turf
Target Race(s): R4 (Class 4 | 1400m | 14 runners)
Scratchings: none
Odds coverage: 14 horses with odds (final SP)
SCMP data: ❌ unavailable (retrospective run)
```

- ≥3 starters ✅ | Odds populated for all 14 ✅ | Jockey/trainer stats loaded ✅
- Sparse form (<3 runs, flagged by the analyzer for 5 runners). #5 COMIC and #6 MR INVINCIBLE are HK debutants. #7 NOT USUAL DOUBLE has 1 start. #9 COOGEE BAY and #10 DRAGON GENERATION have 2 starts each (last run 4-Jul Griffin race, ~107-day layoff).

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 7 | NOT USUAL DOUBLE | 49.2% | 80.3% | 4.7 | ✅ | ✅ | 4 | ★ 膽 (Banker) | 4-7: 15.8% (6.3) |
| 4 | CALIFORNIA WAVES | 12.7% | 43.1% | 3.0 | ✅ | ✅ | 4-5-8-5-5-7 | 腳 (Leg) | 7-13: 11.0% (9.1) |
| 13 | LAKESHORE HERO | 8.1% | 33.1% | 12 | ✅ | ❌ | 8-2-2-7-10-3 | 腳 (Leg) | 3-7: 9.3% (10.7) |
| 3 | CHIU CHOW GOLF | 7.3% | 29.0% | 15 | ✅ | ❌ | 1-11-12 | — (replaced by #14) | 7-11: 8.9% (11.3) |
| 11 | HOT AIR BALLON | 6.8% | 28.0% | 19 | ✅ | ❌ | 5-4-10-5-4 | — (replaced by #12) | — |
| 10 | DRAGON GENERATION | 3.9% | 19.1% | 51 | ❌ | ❌ | 5-5 | — | 7-10: 5.7% (17.6) |
| 12 | JUST FOLLOW ME | 3.3% | 17.2% | 6.0 | ❌ | ✅ | 5-10-7-2-2-4 | 腳 (Leg) — replacement | — |
| 6 | MR INVINCIBLE | 2.8% | 14.5% | 12 | ❌ | ❌ | debut | — | — |
| 8 | LESLIE | 1.9% | 11.0% | 60 | ❌ | ❌ | 14-8-11-1-11-7 | — | — |
| 9 | COOGEE BAY | 1.7% | 9.3% | 119 | ❌ | ❌ | 8-11 | — | — |
| 5 | COMIC | 1.3% | 7.9% | 48 | ❌ | ❌ | debut | — | — |
| 14 | STAR SATYR | 0.5% | 4.0% | 9.3 | ❌ | ✅ | 4-7-6-10-13-4 | 腳 (Leg) — replacement | — |
| 2 | WATCH LEGEND | 0.2% | 1.7% | 23 | ❌ | ❌ | 8-12-14-14 | — | — |
| 1 | EXCELLENCE VALUE | 0.2% | 1.9% | 85 | ❌ | ❌ | 8-9-12-13-9-11 | — | — |

Market: Overround 22.7%, favourite bias +34.6%. MC makes #7 NOT USUAL DOUBLE a clear top pick (49.2% vs ~21% implied at 4.7, flagged undervalued 131%) over the market favourite #4 CALIFORNIA WAVES (3.0). MC is much lower than the market on #12 JUST FOLLOW ME (3rd favourite at 6.0, 17.2% place) and #14 STAR SATYR (9.3, 4.0% place). It flags #9 and #10 as undervalued longshots. Analyzer's own bets: Place #7 @2.66 (HK$500), #13 @3.79 (HK$316), #11 @4.21 (HK$184).

---

## STRATEGY A

### HORSE RANKINGS

SCMP was unavailable, so all factors are 0 and Adj% = MC%.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 7 | NOT USUAL DOUBLE | 49.2% | 80.3% | 0 | 0 | 49.2% | 80.3% | 4.7 | Z Purton | — | — (n/a) | 腳 (Leg) — 1 start, banker-ineligible |
| 4 | CALIFORNIA WAVES | 12.7% | 43.1% | 0 | 0 | 12.7% | 43.1% | 3.0 | B Avdulla | — | — (n/a) | ★ 膽 (Banker) |
| 13 | LAKESHORE HERO | 8.1% | 33.1% | 0 | 0 | 8.1% | 33.1% | 12 | A Atzeni | — | — (n/a) | 腳 (Leg) |
| 3 | CHIU CHOW GOLF | 7.3% | 29.0% | 0 | 0 | 7.3% | 29.0% | 15 | H Bentley | — | — (n/a) | 腳 (Leg) |
| 11 | HOT AIR BALLON | 6.8% | 28.0% | 0 | 0 | 6.8% | 28.0% | 19 | J Orman | — | — (n/a) | 腳 (Leg) |
| 10 | DRAGON GENERATION | 3.9% | 19.1% | 0 | 0 | 3.9% | 19.1% | 51 | L Hewitson | — | — (n/a) | — |
| 12 | JUST FOLLOW ME | 3.3% | 17.2% | 0 | 0 | 3.3% | 17.2% | 6.0 | K Teetan | — | — (n/a) | — |
| 6 | MR INVINCIBLE | 2.8% | 14.5% | 0 | 0 | 2.8% | 14.5% | 12 | C L Chau | — | — (n/a) | — |
| 8 | LESLIE | 1.9% | 11.0% | 0 | 0 | 1.9% | 11.0% | 60 | R Kingscote | — | — (n/a) | — |
| 9 | COOGEE BAY | 1.7% | 9.3% | 0 | 0 | 1.7% | 9.3% | 119 | E C W Wong | — | — (n/a) | — |
| 5 | COMIC | 1.3% | 7.9% | 0 | 0 | 1.3% | 7.9% | 48 | M F Poon | — | — (n/a) | — |
| 14 | STAR SATYR | 0.5% | 4.0% | 0 | 0 | 0.5% | 4.0% | 9.3 | Y L Chung | — | — (n/a) | — |
| 2 | WATCH LEGEND | 0.2% | 1.7% | 0 | 0 | 0.2% | 1.7% | 23 | M Chadwick | — | — (n/a) | — |
| 1 | EXCELLENCE VALUE | 0.2% | 1.9% | 0 | 0 | 0.2% | 1.9% | 85 | H T Mo | — | — (n/a) | — |

Note: #7 NOT USUAL DOUBLE is 1st by Adj Win%, but it has only 1 race start. Under banker eligibility rule 1 (no horses with fewer than 2 starts), it stays in the pool as a leg. The banker passes to the next-ranked eligible horse, #4 CALIFORNIA WAVES (10 starts). 雙膽拖 does not apply because #7 cannot be a banker in any form, and no other horse reaches Adj Place% 63%.

**Reasoning:** The top Adj Win% is 49.2%, which makes this a Dominant race, so it uses Mode A (5-horse pool). The pool is the dominant horse #7 plus the 4 best remaining by Adj Place%: #4 43.1%, #13 33.1%, #3 29.0% and #11 28.0%. That covers every horse with Adj Place% ≥ 25%, and no other horse reaches the 20% line (#10 has 19.1%).
- **#7 NOT USUAL DOUBLE** ran 4th on debut (C4 1200m, 27-Sep). It steps up to 1400m with Purton (22% from 102 rides) and has the best projected time (1:22.15). However, its rating of 70 comes from a single form line.
- **#4 CALIFORNIA WAVES** is the market favourite with a solid draw (5). Its form is a consistent 4-5-8-5-5-7, with 8 runs at the trip, but it has no recent win, and Avdulla is 4%.
- **#13 LAKESHORE HERO** has placed often (2-2-3 in its last 6) but is drawn 14.
- **#3 CHIU CHOW GOLF** won its last start at C4 1400m (27-Sep) but is drawn 13.
- **#11 HOT AIR BALLON** finishes in the frame regularly (5-4-10-5-4).

No pace or running-style read is available without SCMP Star Form.

### TRIO POOL (any order)

```
POOL: #7, #4, #13, #3, #11
MODE: A | POOL SIZE: 5

膽拖 STRUCTURE (1st eligible-ranked horse = Banker):
膽 (Banker): #4 CALIFORNIA WAVES (Adj Place% 43.1%) ← locked in every combo
腳 (Legs):  #7, #13, #3, #11
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS (Harville approximation from MC Win%):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #4, #7, #13 | 9.2% | $10.8 |
| 2 | #4, #7, #3 | 8.2% | $12.1 |
| 3 | #4, #7, #11 | 7.6% | $13.1 |
| 4 | #4, #13, #3 | 0.6% | $163 |
| 5 | #4, #13, #11 | 0.6% | $176 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 6 (膽拖: C(4,2), banker #4 + legs 7,13,3,11)
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

ALL COMBINATIONS (est. prob):
  4-7-13 9.2% | 4-7-3 8.2% | 4-7-11 7.6% | 4-13-3 0.6% | 4-13-11 0.6% | 4-3-11 0.5%
  Ticket coverage (sum): ~26.8%

PASS CONDITIONS:
- If #4 CALIFORNIA WAVES (banker) is scratched → VOID ticket
- If #7 NOT USUAL DOUBLE is scratched → restructure (3 of 6 combos rely on it)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good)

CONFIDENCE: LOW-MEDIUM (the debutant rule forces a banker with only 12.7% MC win / 43.1% place)
```

---

## STRATEGY B (MC-only)

```
Banker: #7 NOT USUAL DOUBLE (MC Win% 49.2%, MC Place% 80.3%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #4 (43.1%), #13 (33.1%), #3 (29.0%), #11 (28.0%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
  #11 HOT AIR BALLON (MC Place% 28.0%, Win odds 19)
  #3 CHIU CHOW GOLF (MC Place% 29.0%, Win odds 15)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #12 JUST FOLLOW ME (Win odds 6.0, MC Place% 17.2%)
  #14 STAR SATYR (Win odds 9.3, MC Place% 4.0%)
Action: #12 replaced #11 (lowest replaceable, 28.0%); #14 replaced #3 (next lowest, 29.0%)
Final legs: #4, #13, #12, #14
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

STRATEGY B TICKET: 膽 #7 / 腳 #4, #13, #12, #14
  7-4-13 9.2% | 7-4-12 3.5% | 7-13-12 2.1% | 7-4-14 0.5% | 7-13-14 0.3% | 7-12-14 0.1%
  Ticket coverage (sum): ~15.8%
```

Comparison: both tickets cost $60, but they are built very differently.
- **Strategy A** cannot bank #7 because of the 1-start rule. It banks the market favourite #4 instead and keeps #7 as a leg.
- **Strategy B** banks #7 (it has no debutant rule). The Win-odds swap rule then removes the MC-preferred #3 and #11 in favour of the market-backed #12 and #14. That lowers its model coverage to ~15.8%, against ~26.8% for A.
- The two tickets share only one combo: 4-7-13.

---

## CAVEATS

- **Retrospective run:** generated 2026-10-20, blind to results. The scheduled pre-race run was missed.
- **Odds are final SP, not morning odds.** They include late market moves that a pre-race run would not have seen. This matters most for Strategy B: the #12 (6.0) and #14 (9.3) Win-odds swaps depend on closing prices.
- **SCMP unavailable (retrospective run).** As a result there are no Star Form, TIR, vet, trackwork, QP/Q matrix or running-style inputs. Strategy A adjustments are all 0, so Adj% = MC%. Strategy B is unaffected.
- **The top MC rating rests on very little form.** #7 NOT USUAL DOUBLE's 49.2% win comes from a single run (4th on debut), so the Dominant classification and Mode A are fragile. Five runners have sparse form (<3 runs), including two HK debutants (#5, #6) whose MC numbers are close to priors.
- **Banker eligibility applied (Strategy A).** #7 has fewer than 2 starts, so it was demoted to a leg and #4 became banker. Any overseas starts for #7 are not visible in the racecard data.
- Rule 9 (no hard exclusion at ≤15 odds) was not triggered because there were no negative SCMP flags. #12 (6.0), #14 (9.3), #6 (12) sit outside Strategy A's pool on MC Place% alone.
- Trio combination probabilities are a Harville approximation from MC Win%, not direct MC trio counts.
- Historical sync, odds fetch and racecard scrape were intentionally not run. The data is the prepared leak-free snapshot (`data/racecards/racecard_20261019_ST_R4.json`).
```
═══════════════════════════════════════════════════════════
```
