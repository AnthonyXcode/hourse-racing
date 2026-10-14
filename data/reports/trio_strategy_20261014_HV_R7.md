# Trio (單T) Strategy — Happy Valley 2026-10-14 Race 7

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-14 | Race 7
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, 12 jockey + 12 trainer profiles loaded) | Going: Good | Scratchings: none (2 reserves not running)
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork loaded; odds columns unlabelled; Q/QP matrix not machine-readable)
ODDS SOURCE: HKJC early-morning win pool (fetch-odds.ts, data/odds/odds_20261014_HV.json, captured 11:00 HKT 14-Oct)
             The MC run's live odds give the same favourite and only small moves (#5 2.9, #1 9.9, #2 11, #4 9.6, #6 8.3, #12 8.3)
             SCMP odds: ⚠️ loaded but ambiguous (cross-reference only) | HKJC: ✅ loaded

RACE: R7 — Class 4 | 1200m | Turf ("A" course) | Good | 12 runners — FINANCE HANDICAP
CLASSIFICATION: Dominant (top Adj Win% 37.1%) | POOL SIZE: 7
MODE: A: Tight Pool (5), expanded to 7 (Adj Place% ≥ 25% must-include + Rule 8 Adj Place% ≥ 20%)
BET STRUCTURE (A): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15  (2nd-ranked #6 Adj Place% 46.7% < 63%, so no 雙膽拖)
BET STRUCTURE (B): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-14 | Going: Good | Surface: Turf
Target Race(s): R7 (Class 4 | 1200m | 12 runners)
Scratchings: none. Reserves R1 RISING FROM ASHES and R2 LUCKY MCQUEEN are not in the field.
Odds coverage: 12 horses with HKJC win odds (the MC tool estimated place odds from the win odds)
SCMP data: ⚠️ partial
Form gaps:
  #3 FLASHING FIGHTER: only 3 career runs, last ran 03-Jun (about 133 days off). Was lame (right fore) on 04-Jun and passed the vet on 07-Sep.
  #7 GOLDEN ELITE: only 2 form records.
  #9 CLASSIC TRIPLE: 3 form records.
  #10 PERFECT TRIUMPH: last ran 15-Jul (about 91 days off).
  #4 GAMEPLAYER ELITE: last ran 24-Jun (about 112 days off).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6, oldest→newest) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------------------------------|-------------------|--------------------------|
| 5 | CLOUD NINE | 37.1% | 71.0% | 3.0 | ✅ | ✅ | 2/4/12/2/4/2 | ★ 膽 (Banker) | 5-6: 14.2% (7.0) |
| 6 | BITS SUPERSTAR | 16.1% | 45.7% | 8.0 | ✅ | ✅ | 2/5/10/5/11/1 | 腳 (Leg) | 5-6: 14.2% (7.0) |
| 1 | SPEEDY SMARTIE | 15.3% | 45.2% | 10 | ✅ | ❌ | 2/2/3/2/4/2 | 腳 (Leg) | 1-5: 13.2% (7.6) |
| 8 | A TIME FOR US | 7.7% | 28.1% | 19 | ✅ | ❌ | 9/7/8/3/10/8 | — (replaced by #12) | 5-8: 6.8% (14.8) |
| 4 | GAMEPLAYER ELITE | 6.3% | 25.4% | 9.5 | ✅ | ✅ | 3/5/1/2/1/2 | 腳 (Leg) | 4-5: 6.2% (16.0) |
| 3 | FLASHING FIGHTER | 5.5% | 23.5% | 8.2 | ✅ | ✅ | 1/9/8 | 腳 (Leg) | — |
| 10 | PERFECT TRIUMPH | 4.1% | 18.0% | 12 | ❌ | ❌ | 11/4/13/10/13/3 | — | — |
| 11 | HAPPY UNITED | 2.5% | 13.5% | 31 | ❌ | ❌ | 6/8/7/1/9/7 | — | — |
| 7 | GOLDEN ELITE | 2.4% | 10.6% | 43 | ❌ | ❌ | 13/11 | — | — |
| 12 | LEGEND STAR | 1.5% | 9.1% | 8.4 | ❌ | ✅ | 7/6/12/10/9/2 | 腳 (Leg, replacement) | — (replacement candidate) |
| 2 | OUTGATE | 1.0% | 5.7% | 10 | ❌ | ❌ | 6/6/11/10/13/8 | — | — |
| 9 | CLASSIC TRIPLE | 0.6% | 4.2% | 30 | ❌ | ❌ | 13/14/10 | — | — |

Form = up to six runs from data/historical (both venues).

Market: overround 23.3%, favourite bias +7.5%. MC agrees with the market on the favourite, #5 CLOUD NINE (3.0, rating 72, 7 points clear of the next horse).
- **Biggest overlay:** #1 SPEEDY SMARTIE. MC has it 3rd (15.3% win / 45.2% place), but it is only the 6th market choice at 10. Its Place bet shows a 45% edge.
- **Other overlay:** #6 BITS SUPERSTAR, MC 2nd at 8.0. The tool recommends Place bets on #1 and #6.
- **Biggest underlays:** #12 LEGEND STAR (8.4, joint 3rd favourite) is MC 10th, overvalued by 87%. #2 OUTGATE (10) is overvalued by 89%, and #9 by 83%.
- **Other MC/market gap:** #3 FLASHING FIGHTER is the 2nd market pick (8.2) but MC 6th. It has sparse form (3 runs).

The top MC quinellas are 5-6 (14.2%) and 1-5 (13.2%), roughly double the next pair, 5-8 (6.8%).

Finish-time projection note: the speed-figure projection has #1 SPEEDY SMARTIE fastest (1:09.83), with #5 next at +0.70s. It puts #6 BITS SUPERSTAR 11th of 12, which is a different view from the MC's #2 ranking.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 5 | CLOUD NINE | 37.1% | 71.0% | 0 | 0 | 37.1% | 71.0% | 3.0 | Z Purton | 5 | 128 | Stalker (box seat) | — | ★ 膽 (Banker) |
| 2 | 6 | BITS SUPERSTAR | 16.1% | 45.7% | +form +1 | +form +1 | 17.1% | 46.7% | 8.0 | C L Chau (-2) | 2 | 126 | Midfield | +form | 腳 (Leg) |
| 3 | 1 | SPEEDY SMARTIE | 15.3% | 45.2% | 0 | 0 | 15.3% | 45.2% | 10 | K Teetan | 10 | 135 | On-pace/Stalker | — | 腳 (Leg) |
| 4 | 8 | A TIME FOR US | 7.7% | 28.1% | 0 | 0 | 7.7% | 28.1% | 19 | J Orman | 7 | 124 | — | — | 腳 (Leg) |
| 5 | 3 | FLASHING FIGHTER | 5.5% | 23.5% | trial +2 | trial +2 | 7.5% | 25.5% | 8.2 | H Y Yuen (-7) | 4 | 133 | Midfield | +trial | 腳 (Leg) |
| 6 | 4 | GAMEPLAYER ELITE | 6.3% | 25.4% | 0 | 0 | 6.3% | 25.4% | 9.5 | H Bentley | 6 | 130 | — | — | 腳 (Leg, ≥25%) |
| 7 | 10 | PERFECT TRIUMPH | 4.1% | 18.0% | excuses +2 | excuses +2 | 6.1% | 20.0% | 12 | C Y Ho | 11 | 121 | Midfield | +excuses (held up) | 腳 (Leg, Rule 8) |
| 8 | 7 | GOLDEN ELITE | 2.4% | 10.6% | excuses +2 | excuses +2 | 4.4% | 12.6% | 43 | E C W Wong (-3) | 12 | 125 | — | +excuses (tightened) | — |
| 9 | 12 | LEGEND STAR | 1.5% | 9.1% | 0 | 0 | 1.5% | 9.1% | 8.4 | L Hewitson | 3 | 117 | Closer | — | — |
| 10 | 2 | OUTGATE | 1.0% | 5.7% | 0 | 0 | 1.0% | 5.7% | 10 | Y L Chung (-2) | 8 | 134 | — | — | — |
| 11 | 9 | CLASSIC TRIPLE | 0.6% | 4.2% | 0 | 0 | 0.6% | 4.2% | 30 | M L Yeung | 1 | 122 | Front | — | — |
| 12 | 11 | HAPPY UNITED | 2.5% | 13.5% | -notRO −2 | 0 | 0.5% | 13.5% | 31 | A Badel | 9 | 119 | On-pace | -notRO | — |

Factor labels used here:
- +form +1: won its most recent run
- trial +2: positive trackwork/trial note
- excuses +2: held up, or tightened
- -notRO −2: stewards reminded the rider to ride out fully

Positive flags apply equally to Win% and Place%. The -notRO flag is a Win%-only reducer per the skill table. No horse reached the ±8 / ±10 per-horse limits or the 50% / 85% caps. Banker eligibility: #5 has 9 HK form records, so it is eligible.

SCMP adjustments applied:
- **#6 BITS SUPERSTAR**: "Won from midfield after a riding change" in its latest run (1st, 23-Sep). That gives +form +1.
- **#3 FLASHING FIGHTER**: Trackwork says it ran "third at Conghua" and "should go well fresh", so trial +2. The vet report shows it was lame on 04-Jun and passed on 07-Sep. That is 37 days before the race, so it falls outside the <30-day window and gets no -injury30d (it is noted as a risk below).
- **#10 PERFECT TRIUMPH**: TIR says it was "held up between the 250m and 150m for clear running", which is a steadied/crowded equivalent, so excuses +2. Its latest run was 3rd at $33.
- **#7 GOLDEN ELITE**: TIR says it was "bumped at start, eased when tightened", so excuses +2. This is still well outside the pool.
- **#11 HAPPY UNITED**: Stewards found a judgement error, and the rider was reminded to ride out fully, so -notRO −2 (win). An earlier "lame after first-up defeat" has no dated vet entry, so no -injury30d.
- **#1 SPEEDY SMARTIE**: TIR "contact with a runner near the 350m" was not crowded/steadied (it still ran 2nd). No adjustment.
- **#4 GAMEPLAYER ELITE**: "Became unbalanced after contact while shifting out" was self-inflicted. No adjustment.
- **#12 LEGEND STAR**: "Came from near last for second" does not meet the improved/rallied/made-all bar (the same treatment as R6). "Shifted across early" is not a scoring flag. No adjustment.
- **#9 CLASSIC TRIPLE**: "Hung out" is a single note, and the vet found nothing significant. No adjustment.
- **#2 OUTGATE** ("lacked pace"), **#5**, **#8**: no scoring flags.

Reasoning: #5 CLOUD NINE is a clear MC #1 (rating 72 vs 65 for the next). It is Zac Purton's ride, with a mid gate (5), a short-head 2nd last start after a box-seat run, and six placings last term. Adj Win% of 37.1% makes the race Dominant, so Mode A applies.

The base 5 is the banker + 4 by Adj Place%: #6 (46.7), #1 (45.2), #8 (28.1) and #3 (25.5). The ≥25% must-include rule adds #4 (25.4). Rule 8 (Adj Place% ≥ 20%) adds #10 (20.0, just on the line). That gives a 7-horse pool, in line with the skill's Happy Valley "wider pool" note.

#6's Adj Place% is 46.7%, below 63%, so this is a single-banker 膽拖.

Left out:
- **#12 LEGEND STAR (8.4)**: market 3rd favourite but only 9.1% place. It has no negative flags, so Rule 9 does not apply. It is excluded on low Adj Place%, consistent with Rule 8 thresholds.
- **#2 OUTGATE (10)**: 5.7% place. MC flags it as 89% overvalued.
- **#7, #9, #11**: all below 14% place and priced 30+.

Pace: HV 1,200m has a front-runner/on-pace bias. #9 (gate 1) led last time and could go forward again. #1 (gate 10) is consistently on or near the speed and the fastest on speed figures. #5 can take the box seat from gate 5, and #6 from gate 2 should get cover in midfield. #10 (gate 11) and #12 (closer) need pace and luck.

## TRIO POOL (Strategy A, any order)

```
POOL: #5, #6, #1, #8, #3, #4, #10
MODE: A (Dominant, #5 Adj Win% 37.1% ≥ 35%), expanded 5 → 7 | POOL SIZE: 7
  Banker + top 4 by Adj Place%: #5 (71.0), #6 (46.7), #1 (45.2), #8 (28.1), #3 (25.5)
  + must-include Adj Place% ≥ 25%: #4 (25.4)
  + Rule 8 (Adj Place% ≥ 20%): #10 (20.0)

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #5 CLOUD NINE (Adj Win% 37.1%, Adj Place% 71.0%) ← locked in every combo
腳 (Legs):  #6, #1, #8, #3, #4, #10
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #5, #6, #1 | 12.1% | $83 per $10 |
| 2 | #5, #6, #8 | 5.6% | $180 per $10 |
| 3 | #5, #6, #3 | 5.4% | $185 per $10 |
| 4 | #5, #1, #8 | 4.8% | $206 per $10 |
| 5 | #5, #1, #3 | 4.7% | $212 per $10 |
| 6 | #5, #6, #4 | 4.5% | $223 per $10 |
| 7 | #5, #6, #10 | 4.3% | $231 per $10 |
| 8 | #5, #1, #4 | 3.9% | $256 per $10 |

Estimated chance the Strategy A ticket hits (sum of 15 combos): about 60%. Harville gives #5 a top-3 chance of about 78%, which is a little above MC's direct 71.0% place figure, so treat 60% as an upper bound. A more realistic figure is about 55%.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

TICKET: 膽 #5 | 腳 #6, #1, #8, #3, #4, #10

TOP COMBINATIONS (highest value):
  5-6-1 (12.1%), 5-6-8 (5.6%), 5-6-3 (5.4%), 5-1-8 (4.8%), 5-1-3 (4.7%), 5-6-4 (4.5%), 5-6-10 (4.3%), 5-1-4 (3.9%)
```

Value note: #5 is the 3.0 favourite, but the next pair are MC overlays: #1 at 10 (6th in the market) and #6 at 8.0. The most likely outcome, 5-6-1, should pay above a "chalky" trio. The market has #3 (8.2) and #12 (8.4) as joint 2nd/3rd choices, and MC rates both lowly. If they miss the frame, the pool's MC-preferred combos gain value.

PASS CONDITIONS:
- If #5 CLOUD NINE (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going changes to Yielding/Soft or worse → re-run the MC.
- If #5 drifts beyond ~6 in late betting (market losing faith in the banker) → consider PASS.
- If a leg is scratched → drop it (C(5,2) = 10 combos, $100).

CONFIDENCE: MEDIUM.
- Strengths: the banker is clear (MC 71.0% place, a 7-point rating gap, Purton, consistent placings). The top two quinellas (5-6, 1-5) dominate, and the pool covers 7 of 12 runners.
- Risk: in a 12-runner HV Class 4, the banker misses the frame about 29% of the time on MC. #6 is ranked 11th on the speed-figure projection. Three pool members (#3, #4, #10) are coming back from 90+ day breaks.

CAVEATS:
- **SCMP data is partial.** Star Form, TIR, Vet and Trackwork were read. Each horse shows three unlabelled odds figures (for example #5 2.7 / 2.9 / 1.4 and #12 7.9 / 8.3 / 3.0). They are consistent with the HKJC order but cannot be mapped to win/place with certainty. The Q/QP matrix is on the page but flattened, so no QP cross-reference was done.
- #3 FLASHING FIGHTER: about 133 days off, and lame on 04-Jun (passed 07-Sep, 37 days before the race, just outside the -injury30d window). It has only 3 runs. It is in the pool via the trial +2 and ≥25% rules, so treat it as a fitness risk.
- #4 (about 112 days) and #10 (about 91 days) are also returning from breaks.
- #10 makes the pool on exactly 20.0% Adj Place% (18.0% raw + excuses +2), so it is a marginal leg.
- The finish-time projection, based on average speed figures, ranks #6 near last. This contradicts its MC #2 ranking.
- The Harville hit rates come from normalised win probabilities and overstate the banker's top-3 chance compared with the MC place figure.
- Odds are from the 11:00 HKT early pool. The pool will move before the jump.
- Historical sync was not re-run in this session (already done per instruction). Races 10/11 in the odds file are phantom duplicates of R1 and were ignored.
```

## STRATEGY B (MC-only)

```
Banker: #5 CLOUD NINE (MC Win% 37.1%, MC Place% 71.0%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6 (45.7%), #1 (45.2%), #8 (28.1%), #4 (25.4%), #3 (23.5%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #8 A TIME FOR US (MC Place% 28.1%, Win odds 19)
  (#4 is 25.4% but at 9.5, and #3 is 23.5% but at 8.2, so neither is > 10.)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #12 LEGEND STAR (Win odds 8.4, MC Place% 9.1%)
  (#2 OUTGATE is 10 early and 11 live, so it is not < 10. #10 is 12.)
Action: #12 replaced #8 (1-for-1 swap)
Final legs: #6, #1, #4, #3, #12
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #5 | 腳 #6, #1, #4, #3, #12
  5-6-1, 5-6-4, 5-6-3, 5-6-12, 5-1-4, 5-1-3, 5-1-12, 5-4-3, 5-4-12, 5-3-12

Top combos (Harville, raw MC): 5-6-1 13.9% | 5-6-4 5.1% | 5-1-4 4.8% | 5-6-3 4.4% | 5-1-3 4.1% | 5-4-3 1.5%
Est. ticket hit chance (sum of 10 combos, raw MC): ~37% (upper bound; MC banker place is 71.0%)
  (Before the #12 swap, the primary-leg ticket would have been ~50%. The swap trades MC probability for market signal.)
```

Comparison: both strategies use banker #5 and share legs #6, #1, #4 and #3. Strategy A also has #8 (MC 28.1% place) and #10 (Rule 8, 20.0%), for 15 combos and $150. Strategy B drops #8 for the market-backed #12 LEGEND STAR (8.4), which MC rates at only 9.1% place, for 10 combos and $100. So Strategy B is cheaper but has a much lower model hit rate (~37% vs ~60%). This race is a clean test of whether the market's view of #12 beats MC's view of #8.
