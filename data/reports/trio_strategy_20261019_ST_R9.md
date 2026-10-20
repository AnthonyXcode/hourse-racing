# Trio (單T) Strategy — Sha Tin | 2026-10-19 | Race 9

> Retrospective run (generated 2026-10-20, blind to results; odds = final SP)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-19 | Race 9
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good to Firm | 1 scratching (#7 not in snapshot)
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --use-saved, --hide-actual)
SCMP DATA: ❌ Unavailable (retrospective run — SCMP racecard pages now show the 21-Oct Happy Valley card)
ODDS SOURCE: Final starting prices (SP) from saved race-card snapshot, as loaded by analyze-race.ts
             SCMP odds: ❌ not available | HKJC live: ❌ no longer available (meeting completed)

RACE: R9 — Class 3 | 1200m | Turf | Good to Firm | 11 runners (LEK YUEN HANDICAP)
CLASSIFICATION: Competitive (top Adj Win% 29.6%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos (2nd-ranked #8 Adj Place% 49.6% < 63%, so no 雙膽拖)
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Sha Tin 2026-10-19 | Going: Good to Firm | Surface: Turf
Target Race(s): R9 (Class 3 | 1200m | 11 runners)
Scratchings: #7 (absent from the race-day snapshot; field numbered 1–12 with 11 runners)
Odds coverage: 11 horses with odds (final SP)
SCMP data: ❌ unavailable (retrospective run)
```

- ≥3 starters ✅ | Odds populated for all 11 ✅ | Jockey/trainer stats loaded ✅
- **Debutant (no race form):** #5 PRECISION TIME (37). MC rates it from rating/connections only.
- **Sparse form:** #8 GLORYSPEED (1 run, 4th on 1-Oct) and #6 GRAND EAGLE (3 runs: 8-7-11). Both have short form lines, so their MC figures carry more uncertainty.
- **Layoffs:** #2 SMART GOLF (last run 31-May, ~141 days), #4 MAKE YOU SMILE (7-Jun, ~134 days), #1 MR INCREDIBLE (27-Jun, ~114 days).
- `careerStarts` is 0 for every horse in the snapshot (field not populated), so banker eligibility uses the form lines instead. #10 has 10 recorded runs, so it is eligible.

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 10 | HAPPY SHOOTER | 29.6% | 65.3% | 5.3 | ✅ | ✅ | 1-3-6-2-8-2 | ★ 膽 (Banker) | 1-10: 12.1% (8.3) |
| 8 | GLORYSPEED | 17.7% | 49.6% | 3.4 | ✅ | ✅ | 4 | 腳 (Leg) | 8-10: 12.0% (8.3) |
| 1 | MR INCREDIBLE | 17.1% | 49.8% | 3.0 | ✅ | ✅ | 1-1-6-1 | 腳 (Leg) | 1-8: 7.0% (14.2) |
| 3 | MOTOR | 12.5% | 39.5% | 32 | ✅ | ❌ | 8-12-1-3-1-3 | 腳 (Leg) | 3-10: 9.1% (11.0) |
| 6 | GRAND EAGLE | 10.6% | 34.3% | 9.3 | ✅ | ✅ | 8-7-11 | 腳 (Leg) | 6-10: 7.1% (14.0) |
| 11 | THOUSAND SPIRIT | 5.2% | 22.5% | 16 | ✅ | ❌ | 3-8-8-9-10-2 | — (replaced by #2) | — |
| 9 | LA FORZA | 2.6% | 13.5% | 119 | ❌ | ❌ | 8-12-9-12-3-7 | — | — |
| 4 | MAKE YOU SMILE | 2.3% | 11.5% | 70 | ❌ | ❌ | 12-4-10-7 | — | — |
| 2 | SMART GOLF | 1.8% | 10.2% | 7.9 | ❌ | ✅ | 14-4-1-1-3-1 | 腳 (Leg) (replacement for #11) | — |
| 5 | PRECISION TIME | 0.4% | 2.9% | 37 | ❌ | ❌ | debut | — | — |
| 12 | HONEST WITNESS | 0.1% | 0.9% | 44 | ❌ | ❌ | 7-11-12-2-12-1 | — | — |

Market: Overround 21.6%. The market has #1 MR INCREDIBLE (3.0) and #8 GLORYSPEED (3.4) as co-favourites, with #10 HAPPY SHOOTER third (5.3). MC makes #10 a clear top pick at 29.6% (about 19% implied at 5.3). The analyzer flags #3 MOTOR as undervalued by 301% (12.5% MC vs 32 SP) and #9 LA FORZA as undervalued by 207%. It flags #12 HONEST WITNESS as overvalued by 96%. #2 SMART GOLF is the 4th favourite (7.9) but MC rates it at only 1.8% win. The analyzer's own bets were Place #10 @2.47 and Place #3 @3.63 (HK$500 each).

---

## STRATEGY A

### HORSE RANKINGS

SCMP was unavailable, so all factors are 0 and Adj% = MC%.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 10 | HAPPY SHOOTER | 29.6% | 65.3% | 0 | 0 | 29.6% | 65.3% | 5.3 | L Hewitson | — | — (n/a) | ★ 膽 (Banker) |
| 8 | GLORYSPEED | 17.7% | 49.6% | 0 | 0 | 17.7% | 49.6% | 3.4 | Z Purton | — | — (n/a) | 腳 (Leg) |
| 1 | MR INCREDIBLE | 17.1% | 49.8% | 0 | 0 | 17.1% | 49.8% | 3.0 | K Teetan | — | — (n/a) | 腳 (Leg) |
| 3 | MOTOR | 12.5% | 39.5% | 0 | 0 | 12.5% | 39.5% | 32 | K C Leung | — | — (n/a) | 腳 (Leg) |
| 6 | GRAND EAGLE | 10.6% | 34.3% | 0 | 0 | 10.6% | 34.3% | 9.3 | C L Chau | — | — (n/a) | 腳 (Leg) |
| 11 | THOUSAND SPIRIT | 5.2% | 22.5% | 0 | 0 | 5.2% | 22.5% | 16 | H Y Yuen | — | — (n/a) | 腳 (Leg) |
| 9 | LA FORZA | 2.6% | 13.5% | 0 | 0 | 2.6% | 13.5% | 119 | B Avdulla | — | — (n/a) | — |
| 4 | MAKE YOU SMILE | 2.3% | 11.5% | 0 | 0 | 2.3% | 11.5% | 70 | L Ferraris | — | — (n/a) | — |
| 2 | SMART GOLF | 1.8% | 10.2% | 0 | 0 | 1.8% | 10.2% | 7.9 | H Bentley | — | — (n/a) | — |
| 5 | PRECISION TIME | 0.4% | 2.9% | 0 | 0 | 0.4% | 2.9% | 37 | M Chadwick | — | — (n/a) | — |
| 12 | HONEST WITNESS | 0.1% | 0.9% | 0 | 0 | 0.1% | 0.9% | 44 | P N Wong | — | — (n/a) | — |

Note: ★ 膽 = Banker (1st by Adj Win%; #10 has 10 form lines, so it is eligible). #8 has Adj Place% 49.6%, below the 63% needed for 雙膽拖.

**Reasoning:** The top Adj Win% is 29.6% (#10 HAPPY SHOOTER), which makes the race Competitive, so it uses Mode B. The pool is the top 3 by Adj Win% (#10, #8, #1) plus the next 3 by Adj Place% (#3 39.5%, #6 34.3%, #11 22.5%). Every horse with Adj Place% ≥ 25% is in the pool, and so is the only other horse at ≥ 20% (#11).

- **#10 HAPPY SHOOTER** won its last start (13-Sep), has a 1-3-6-2-8-2 form line, 9 runs at the trip and draw 1. It carries 120 lb.
- **#8 GLORYSPEED** has only one run (4th, 1-Oct), but has Purton (22% from 102 rides) and draw 4. Its single form line makes its 17.7% fragile.
- **#1 MR INCREDIBLE** has won 3 of its last 4 and is the top-rated horse (CR 80). It carries top weight of 135 lb from draw 11 and returns from ~114 days off.
- **#3 MOTOR** has 1-3-1-3 earlier in its form line but finished 8-12 in its last two. MC strongly prefers it to the market (32 SP).
- **#6 GRAND EAGLE** (draw 2, 121 lb) and **#11 THOUSAND SPIRIT** (110 lb, 3rd last start) fill the last two slots.

The projected finish time puts #4 MAKE YOU SMILE fastest (1:08.07), but MC rates it at 2.3% win. It is outside the pool on Place%, because the MC also weighs its 0 trip runs and its ~134-day layoff. #2 SMART GOLF (7.9) is a market horse outside the Strategy A pool on MC. No pace read is available without SCMP Star Form.

### TRIO POOL (any order)

```
POOL: #10, #8, #1, #3, #6, #11
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #10 HAPPY SHOOTER (Adj Place% 65.3%) ← locked in every combo
腳 (Legs):  #8, #1, #3, #6, #11
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville approximation from MC Win%):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #10, #8, #1 | 12.3% | $8.1 |
| 2 | #10, #8, #3 | 8.4% | $11.9 |
| 3 | #10, #1, #3 | 8.1% | $12.4 |
| 4 | #10, #8, #6 | 7.0% | $14.3 |
| 5 | #10, #1, #6 | 6.7% | $15.0 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: banker #10, legs 8, 1, 3, 6, 11 → C(5,2))
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

ALL COMBINATIONS (est. prob):
  10-8-1 12.3% | 10-8-3 8.4% | 10-1-3 8.1% | 10-8-6 7.0% | 10-1-6 6.7%
  10-3-6 4.6%  | 10-8-11 3.2% | 10-1-11 3.1% | 10-3-11 2.1% | 10-6-11 1.7%
  Ticket coverage (sum): ~57.1%
  Banker #10 top 3 (MC Place%): 65.3%

PASS CONDITIONS:
- If #10 HAPPY SHOOTER (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good to Firm)

CONFIDENCE: MEDIUM (clear MC #1 with 65% place. The two market favourites #1 and #8 are both legs, but #8 has one run and #1 is off a layoff with top weight.)
```

---

## STRATEGY B (MC-only)

```
Banker: #10 HAPPY SHOOTER (MC Win% 29.6%, MC Place% 65.3%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #8 (49.6%), #1 (49.8%), #3 (39.5%), #6 (34.3%), #11 (22.5%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #11 THOUSAND SPIRIT (MC Place% 22.5%, Win odds 16)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #2 SMART GOLF (Win odds 7.9, MC Place% 10.2%)
Action: #2 replaced #11 (1-for-1 swap)
Final legs: #8, #1, #3, #6, #2
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #10 / 腳 #8, #1, #3, #6, #2
  10-8-1 12.3% | 10-8-3 8.4% | 10-1-3 8.1% | 10-8-6 7.0% | 10-1-6 6.7%
  10-3-6 4.6%  | 10-8-2 1.1%  | 10-1-2 1.0%  | 10-3-2 0.7% | 10-6-2 0.6%
  Ticket coverage (sum): ~50.4%
```

Comparison: Both strategies use the same banker, the same cost ($100) and 6 of the same 7 combos. The only difference is the last leg. Strategy A uses #11 THOUSAND SPIRIT (MC Place% 22.5%, 16 SP) and Strategy B swaps in market-backed #2 SMART GOLF (MC Place% 10.2%, 7.9 SP). By MC, Strategy A has the higher coverage (~57.1% vs ~50.4%). Strategy B is the better ticket if the market is right about #2 returning from its ~141-day layoff.

---

## CAVEATS

- **Retrospective run:** generated 2026-10-20, blind to results. The scheduled pre-race run was missed.
- **Odds are final SP, not morning odds.** They include late market moves that a pre-race run would not have seen. That affects the Strategy B win-odds candidate (#2 at 7.9) and the replaceable-leg test (#11 at 16), as well as the undervalued/overvalued flags.
- **SCMP unavailable (retrospective run).** There are no Star Form, TIR, vet, trackwork, QP/Q matrix or running-style inputs. Strategy A adjustments are all 0, so Adj% = MC%. Strategy B is unaffected.
- **#7 is absent from the snapshot** (presumed scratched). The field is 11 runners.
- **Sparse form on key legs:** #8 GLORYSPEED (1 run) and #6 GRAND EAGLE (3 runs) are high-weight legs whose MC figures rest on very little data.
- **Model/market disagreement:** MC rates #3 MOTOR at 12.5% win against 32 SP, and #2 SMART GOLF at 1.8% against 7.9 SP. #10's jockey L Hewitson is only 2% from 62 rides in the historical data, but MC still ranks the horse first on form.
- **Projection conflict:** the finish-time projection has #4 MAKE YOU SMILE fastest and #1 second, ahead of #10. MC ranks #4 only 8th.
- **Layoffs:** #1 (~114 days, 135 lb top weight, draw 11), #4 (~134 days) and #2 (~141 days).
- Trio combination probabilities are a Harville approximation from MC Win%, not direct MC trio counts.
- Historical sync, odds fetch and racecard scrape were intentionally not run. The data is the prepared leak-free snapshot. `careerStarts` is unpopulated in the snapshot, so banker eligibility used the form lines.
```
═══════════════════════════════════════════════════════════
```
