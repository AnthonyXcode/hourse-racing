# Trio (單T) Strategy — Happy Valley 2026-10-14 Race 3

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-14 | Race 3
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (10 starters ≥ 3, odds for 10/10, 10 jockey + 10 trainer profiles loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork loaded; odds columns unlabelled; Q/QP matrix not machine-readable)
ODDS SOURCE: HKJC early-morning win pool (fetch-odds.ts, data/odds/odds_20261014_HV.json, captured 11:00 HKT 14-Oct).
             The MC run's live win odds give the same market order.
             SCMP odds: ⚠️ loaded but ambiguous (cross-reference only) | HKJC: ✅ loaded

RACE: R3 — Class 4 | 1650m | Turf ("A" course) | Good | 10 runners — ELGIN HANDICAP
CLASSIFICATION: Dominant (top Adj Win% 45.9%) | POOL SIZE: 8
MODE: A: Tight Pool (5), expanded to 8 by Rule 8 (Adj Place% ≥ 20%) and Rule 9 (negative-flag horse at ≤ 15 odds)
BET STRUCTURE (A): 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21  (2nd-ranked #9 Adj Place% 53.8% < 63%, so no 雙膽拖)
BET STRUCTURE (B): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-14 | Going: Good | Surface: Turf
Target Race(s): R3 (Class 4 | 1650m | 10 runners)
Scratchings: none
Odds coverage: 10 horses with HKJC win odds (the MC tool estimated place odds from the win odds)
SCMP data: ⚠️ partial
Form gaps: #7 KYOTO SPRING has only 3 HK starts and 0 runs at 1650m (its first try at the course and distance).
           #4 RAINBOW SEVEN has 1 run at the trip, and #8 FAMILY KNIGHT has 1.
           All other horses have 8–10 form records.
           #8 FAMILY KNIGHT had colic: withdrawn 21-Sep, passed the vet 30-Sep (14 days ago).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 2 | SHOOTING TO TOP | 42.9% | 76.9% | 2.8 | ✅ | ✅ | 2/6/2/4/5/1 | ★ 膽 (Banker) | 2-9: 19.2% (5.2) |
| 9 | RED BRICK WARRIOR | 18.6% | 52.8% | 9.6 | ✅ | ✅ | 1/9/5/7/7/4 | 腳 (Leg) | 2-9: 19.2% (5.2) |
| 6 | DECISION LINK | 9.0% | 34.8% | 4.9 | ✅ | ✅ | 2/5/5/12/4/1 | 腳 (Leg) | 2-6: 10.0% (10.0) |
| 4 | RAINBOW SEVEN | 7.8% | 31.1% | 25 | ✅ | ❌ | 10/8/4/2/1/11 | 腳 (Leg) | 2-4: 8.6% (11.6) |
| 7 | KYOTO SPRING | 5.4% | 23.3% | 20 | ✅ | ❌ | 9/9/7 | 腳 (Leg) | 2-7: 6.2% (16.0) |
| 5 | THE AZURE | 4.9% | 22.4% | 25 | ✅ | ❌ | 7/6/6/1/8/6 | — (replaced by #10) | 2-5: 5.7% (17.7) |
| 1 | EXCEED THE LIMIT | 4.3% | 21.4% | 8.7 | ✅ | ✅ | 6/4/5/2/8/11 | 腳 (Leg) | — |
| 10 | PRESTIGE RICKY | 3.4% | 16.7% | 7.4 | ❌ | ✅ | 5/3/7/6/6/3 | 腳 (Leg, replacement) | — (replacement candidate) |
| 3 | CALIFORNIA MOXIE | 2.6% | 13.7% | 11 | ❌ | ❌ | 9/9/7/7/7/4 | — | — |
| 8 | FAMILY KNIGHT | 1.1% | 7.0% | 10 | ❌ | ❌ | 8/4/12/4/5/8 | — | — |

Market: overround 23.6%. MC agrees with the market on the favourite, #2 SHOOTING TO TOP (2.8, rating 74, 42.9% win / 76.9% place). The big disagreements are elsewhere:
- MC's main overlay is #9 RED BRICK WARRIOR. It is 5th in the market at 9.6, but MC has it 2nd (18.6% / 52.8%). The tool flags it as undervalued by 78%, and its Place bet shows a +47% edge.
- #4 RAINBOW SEVEN at 25 is undervalued by 95%.
- MC rates three of the market's top six well below their prices: #10 PRESTIGE RICKY (3rd favourite at 7.4, 16.7% place), #1 EXCEED THE LIMIT (4th at 8.7), and #8 FAMILY KNIGHT (6th at 10, overvalued by 89%).

The top MC quinella is 2-9 at 19.2%, almost double the next pair (2-6 at 10.0%).

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 2 | SHOOTING TO TOP | 42.9% | 76.9% | excuses +2, +draw +1 | excuses +2, +draw +1 | 45.9% | 79.9% | 2.8 | Z Purton | 2 | 134 | On-pace | +excuses, +draw | ★ 膽 (Banker) |
| 2 | 9 | RED BRICK WARRIOR | 18.6% | 52.8% | +form +1 | +form +1 | 19.6% | 53.8% | 9.6 | A Atzeni | 6 | 120 | Front (slow to start) | +form | 腳 (Leg) |
| 3 | 6 | DECISION LINK | 9.0% | 34.8% | 0 | 0 | 9.0% | 34.8% | 4.9 | L Ferraris | 7 | 128 | Midfield/Closer | — | 腳 (Leg) |
| 4 | 4 | RAINBOW SEVEN | 7.8% | 31.1% | 0 | 0 | 7.8% | 31.1% | 25 | C Y Ho | 9 | 131 | Midfield | — (single bump only) | 腳 (Leg) |
| 5 | 5 | THE AZURE | 4.9% | 22.4% | excuses +2 | excuses +2 | 6.9% | 24.4% | 25 | C L Chau (-2) | 10 | 129 | Closer | +excuses | 腳 (Leg) |
| 6 | 1 | EXCEED THE LIMIT | 4.3% | 21.4% | excuses +2 | excuses +2 | 6.3% | 23.4% | 8.7 | L Hewitson | 8 | 135 | Closer | +excuses | 腳 (Leg, Rule 8) |
| 7 | 7 | KYOTO SPRING | 5.4% | 23.3% | 0 | 0 | 5.4% | 23.3% | 20 | K C Leung | 4 | 124 | Back | — | 腳 (Leg, Rule 8) |
| 8 | 10 | PRESTIGE RICKY | 3.4% | 16.7% | excuses +2 | excuses +2 | 5.4% | 18.7% | 7.4 | K Teetan | 1 | 119 | Midfield/Closer | +excuses | — |
| 9 | 3 | CALIFORNIA MOXIE | 2.6% | 13.7% | 0 | 0 | 2.6% | 13.7% | 11 | B Avdulla | 3 | 131 | — | — | — |
| 10 | 8 | FAMILY KNIGHT | 1.1% | 7.0% | -injury30d −3, trial +2 | -injury30d −4, trial +2 | 0.1% | 5.0% | 10 | M L Yeung | 5 | 122 | On-pace (chased speed in trial) | -injury30d, +trial | 腳 (Leg, Rule 9) |

Factor labels: excuses +2 (wide without cover / checked / crowded / steadied), +draw +1, +form +1 (made all / won its most recent run), trial +2, -injury30d (−3 win / −4 place). As in earlier reports, positive flags are applied equally to Win% and Place%. No horse reached the caps (±8 win / ±10 place). Banker eligibility: #2 has 8 HK form records, so it is eligible.

SCMP adjustments applied:
- **#2 SHOOTING TO TOP**: TIR "raced wide and without cover for the majority of the event", so excuses +2. Star Form "Does finally draw a gate" (gate 2), so +draw +1. It is a course-and-distance winner (Valley 1,650m in April).
- **#9 RED BRICK WARRIOR**: Star Form "resumed as a front-running winner over 1,650m", so +form +1. The TIR note "laid out under pressure" and the trainer's comment that it is slow to start are not scoring flags.
- **#5 THE AZURE**: TIR "Jumped only fairly and was steadied when crowded shortly after the start", so excuses +2.
- **#1 EXCEED THE LIMIT**: TIR says it raced keenly and "had to check and shift when close to a runner", so excuses +2. It drew wide (gates 11/12) in its last two runs and has gate 8 today.
- **#10 PRESTIGE RICKY**: TIR "Crowded after travelling a short distance... steadied near the 1000M", so excuses +2.
- **#8 FAMILY KNIGHT**: Vet report shows colic on 21-Sep, passed 30-Sep (14 days, under 30), so -injury30d. Trackwork says it "Kept on well for second" in a Conghua trial and calls it "one to consider", so trial +2.
- **#4 RAINBOW SEVEN**: TIR "jumped awkwardly and then was bumped" is a single note, so no -barrier penalty, and the post-race vet check was clear. No adjustment.
- **#6, #3, #7**: no TIR, vet or trackwork flags. #6 "ran on for second" last start, which does not meet the improved/rallied/made-all bar. No adjustment.

Reasoning: #2 SHOOTING TO TOP is a clear MC #1 (rating 74, 7 points clear of the next). It is a course-and-distance winner, has Purton aboard, and finally has an inside gate after a wide trip last start. Adj Win% 45.9% makes the race Dominant, so Mode A applies.

The base 5 is the banker + 4 by Adj Place%: #9 (53.8), #6 (34.8), #4 (31.1) and #5 (24.4). Rule 8 (Adj Place% ≥ 20%) adds #1 (23.4) and #7 (23.3). Rule 9 adds #8 FAMILY KNIGHT: it has a negative flag (-injury30d) but the market still has it at 10 (≤ 15), matching the precedent where Rule 9 forced in a -injury30d horse. That gives an 8-horse pool, which also suits the skill's Happy Valley "wider pool" note.

#9's Adj Place% is 53.8%, below 63%, so this is a single-banker 膽拖.

Left out:
- **#10 PRESTIGE RICKY (7.4, 3rd favourite)**: Adj Place% is 18.7%. Its only flag is positive, so neither Rule 8 nor Rule 9 forces it in. It is the most notable omission and the main difference from Strategy B.
- **#3 CALIFORNIA MOXIE (11)**: no flags, 13.7% place.

Pace: #9 made all last start but is a slow beginner from gate 6, and #2 should be handy from gate 2. HV 1,650m has a stalker bias, which favours #2 sitting just off the speed. The closers #6, #1 and #5 need the pace to hold up.

## TRIO POOL (Strategy A, any order)

```
POOL: #2, #9, #6, #4, #5, #1, #7, #8
MODE: A (Dominant, #2 Adj Win% 45.9% ≥ 35%), expanded 5 → 8 | POOL SIZE: 8
  Banker + top 4 by Adj Place%: #2 (79.9), #9 (53.8), #6 (34.8), #4 (31.1), #5 (24.4)
  + Rule 8 (Adj Place% ≥ 20%): #1 (23.4), #7 (23.3)
  + Rule 9 (negative flag, odds ≤ 15): #8 (10)

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #2 SHOOTING TO TOP (Adj Win% 45.9%, Adj Place% 79.9%) ← locked in every combo
腳 (Legs):  #9, #6, #4, #5, #1, #7, #8
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #2, #6, #9 | 10.1% | $99 per $10 |
| 2 | #2, #4, #9 | 8.7% | $115 per $10 |
| 3 | #2, #5, #9 | 7.6% | $132 per $10 |
| 4 | #2, #1, #9 | 6.9% | $145 per $10 |
| 5 | #2, #7, #9 | 5.8% | $171 per $10 |
| 6 | #2, #4, #6 | 3.4% | $292 per $10 |
| 7 | #2, #5, #6 | 3.0% | $333 per $10 |

Estimated chance the Strategy A ticket hits (sum of 21 combos): about 63% on Adj Win%, or about 67% on raw MC. Harville gives #2 a top-3 chance of about 85%, which is higher than MC's direct 76.9% place figure. Treat these hit rates as upper bounds.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 21 (膽拖: C(7,2), 7 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $210

TICKET: 膽 #2 | 腳 #9, #6, #4, #5, #1, #7, #8

TOP COMBINATIONS (highest value):
  2-6-9 (10.1%), 2-4-9 (8.7%), 2-5-9 (7.6%), 2-1-9 (6.9%), 2-7-9 (5.8%), 2-4-6 (3.4%), 2-5-6 (3.0%)
```

Value note: #2 is the 2.8 favourite, so the dividend depends on who fills the frame with it. MC's 2nd pick, #9 (9.6), is only the 5th market choice. The 25-shots #4 and #5 also appear in the top combos. If the 3rd favourite #10 and the 4th favourite #1 miss the frame, combos such as 2-4-9 and 2-5-9 should pay well above fair. 2-6-9 is the "chalky" outcome, with #6 as the 4.9 second favourite.

PASS CONDITIONS:
- If #2 SHOOTING TO TOP (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going changes to Yielding/Soft or worse → re-run the MC.
- If #2 drifts beyond ~6 in late betting (market losing faith in the banker) → consider PASS.
- If #8 FAMILY KNIGHT is scratched (it has a recent colic history) → drop it from the legs (C(6,2) = 15 combos, $150).

CONFIDENCE: MEDIUM. The banker is strong (MC 76.9% place, clear rating gap, and an excuse last start). The 2-9 quinella is dominant. Cost is high for a single race ($210) because Rules 8 and 9 widen the pool to 8.

CAVEATS:
- **SCMP data is partial.** Star Form, TIR, Vet and Trackwork were read. Each horse shows three unlabelled odds figures (for example #2 2.6 / 2.7 / 1.2 and #1 11 / 9.1 / 2.8). They are consistent with the HKJC order but cannot be mapped to win/place with certainty. The Q/QP matrices are on the page but could not be read into pairs, so no QP cross-reference was done.
- **#8 FAMILY KNIGHT**: SCMP notes say it was withdrawn for colic on 21-Sep and passed the vet on 30-Sep. Confirm it is still a starter. It is in the pool only because of Rule 9, and MC has it at 7.0% place.
- **#10 PRESTIGE RICKY (7.4, 3rd favourite) is not in Strategy A.** If it places, the A ticket misses that frame. Strategy B covers it.
- #7 KYOTO SPRING has thin form (3 starts) and is trying the course and distance for the first time. Its MC figures are less reliable.
- During the MC run, the scraper log line printed "distance=1200m". The enriched racecard and the MC header both use 1650m, which matches the HKJC and SCMP cards. Treat this as cosmetic, but note it.
- The Harville hit rates come from normalised win probabilities and overstate the banker's top-3 chance compared with the MC place figure.
- Odds are from the 11:00 HKT early pool. The pool will move before the jump.
- Historical sync was not re-run in this session (already done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #2 SHOOTING TO TOP (MC Win% 42.9%, MC Place% 76.9%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #9 (52.8%), #6 (34.8%), #4 (31.1%), #7 (23.3%), #5 (22.4%), #1 (21.4%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
  #7 KYOTO SPRING (MC Place% 23.3%, Win odds 20)
  #5 THE AZURE (MC Place% 22.4%, Win odds 25)
  (#1 is 21.4% but at 8.7, which is not > 10. #4 is 31.1%, which is outside 20–30%.)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10):
  #10 PRESTIGE RICKY (Win odds 7.4, MC Place% 16.7%)
  (#8 at 10.0 is not < 10. #3 is at 11.)
Action: #10 replaced #5 THE AZURE (the lowest MC Place% among the replaceable legs)
Final legs: #9, #6, #4, #7, #1, #10
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #2 | 腳 #9, #6, #4, #7, #1, #10
  2-9-6, 2-9-4, 2-9-7, 2-9-1, 2-9-10, 2-6-4, 2-6-7, 2-6-1, 2-6-10,
  2-4-7, 2-4-1, 2-4-10, 2-7-1, 2-7-10, 2-1-10

Top combos (Harville, raw MC): 2-6-9 12.1% | 2-4-9 10.4% | 2-7-9 7.0% | 2-1-9 5.5% | 2-4-6 4.3% | 2-9-10 4.3%
Est. ticket hit chance (sum of 15 combos, raw MC): ~60%
```

Comparison: Both strategies use the same banker (#2) and share five legs (#9, #6, #4, #7, #1).
- **Strategy A** adds #5 THE AZURE (excuses +2 lifted it to 24.4% Adj Place) and #8 FAMILY KNIGHT (Rule 9). That makes 7 legs: 21 combos, $210, about 63–67% estimated hit.
- **Strategy B** swaps #5 for the market-backed #10 PRESTIGE RICKY (7.4) and has no Rule 9 addition. That makes 6 legs: 15 combos, $150, about 60%.

Robustness: SCMP's figures for #1 (11 / 9.1) put it near the 10-odds line. If #1 goes off above 10, it also becomes a replaceable leg (21.4%, the lowest). #10 would then replace #1 instead of #5, and the Strategy B legs would be #9, #6, #4, #7, #5, #10.

```
═══════════════════════════════════════════════════════════
```
