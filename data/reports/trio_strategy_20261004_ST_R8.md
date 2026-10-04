# Trio (單T) Strategy — Sha Tin 2026-10-04 Race 8

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-04 | Race 8
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (11 starters ≥ 3, odds for 11/11, 11 jockey + 9 trainer profiles loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Win odds / Star Form / TIR / Vet / Trackwork loaded; Place odds look mis-parsed; Q/QP matrix not returned)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261004_ST.json, captured 10:22 HKT 04-Oct)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R8 — Class 3 | 1800m | Turf | Good | 11 runners — THE CHINESE RECREATION CLUB CHALLENGE CUP
CLASSIFICATION: Dominant (top Adj Win% 48.0%) | POOL SIZE: 7 (Mode A 5 + #8 forced by Adj Place% ≥ 25% + #2 forced by Adj Place% ≥ 20% Rule 8)
MODE: A: Tight Pool (extended to 7)
BET STRUCTURE (A): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-04 | Going: Good | Surface: Turf
Target Race(s): R8 (Class 3 | 1800m | 11 runners)
Scratchings: none
Odds coverage: 11 horses with HKJC win + place odds
SCMP data: ⚠️ partial
Form gaps: #3 CALL ME MAGNIFIQUE and #7 KING EQUINE have only 3 starts each in the historical data. #6 MIGHTY STRENGTH has been off since 21-Jun (~105 days). #10 FOREVER FOLKS has been off since 13-Jun (~113 days) and is 8 years old.
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 5 | FLOW WATER FLOW | 45.0% | 79.4% | 2.5 | ✅ | ✅ | 4/5/1/1/2/2 | ★ 膽 (Banker) | 5-10: 18.9% (5.3) |
| 10 | FOREVER FOLKS | 17.1% | 50.5% | 13 | ✅ | ❌ | 1/8/11/7/1/4 | 腳 (Leg) | 5-10: 18.9% (5.3) |
| 1 | SMART AVENUE | 9.3% | 36.9% | 21 | ✅ | ❌ | 9/5/1/11/2/2 | 腳 (Leg) | 1-5: 11.1% (9.0) |
| 9 | HYMNBOOK | 7.7% | 32.3% | 5.5 | ✅ | ✅ | 3/8/3/6/5/12 | 腳 (Leg) | 5-9: 9.3% (10.8) |
| 4 | GLITTERING LEGEND | 7.4% | 32.0% | 13 | ✅ | ❌ | 3/11/3/9/2/9 | 腳 (Leg) | 4-5: 9.0% (11.0) |
| 8 | BIG RETURN | 5.7% | 27.3% | 12 | ✅ | ❌ | 5/7/3/2/1/1 | — (replaced by #6) | 5-8: 7.4% (13.5) |
| 2 | POCKETING | 5.3% | 23.7% | 15 | ✅ | ❌ | 8/4/7/10/9/7 | — (replaced by #3) | — |
| 7 | KING EQUINE | 1.5% | 9.0% | 32 | ❌ | ❌ | 7/3/11 | — | — |
| 11 | DREAMING TOGETHER | 0.6% | 4.5% | 31 | ❌ | ❌ | 10/11/6/7/13/10 | — | — |
| 3 | CALL ME MAGNIFIQUE | 0.3% | 3.0% | 8.1 | ❌ | ✅ | 1/12/13 | 腳 (Leg) — replacement for #2 | — |
| 6 | MIGHTY STRENGTH | 0.1% | 1.3% | 9.6 | ❌ | ✅ | 7/1/5/11/4/6 | 腳 (Leg) — replacement for #8 | — |

Market: overround 22.3%, favourite bias +12.5%. MC agrees with the market on #5 as a clear favourite (value 1.13). The biggest gap is #10 FOREVER FOLKS (13 in the market vs MC 17.1% win), which MC rates undervalued by 123%. The market is far keener than MC on #9 HYMNBOOK (2nd favourite at 5.5, MC value 0.42), #3 CALL ME MAGNIFIQUE (8.1, MC 0.3%) and #6 MIGHTY STRENGTH (9.6, MC 0.1%). MC flags #3 and #6 as overvalued by about 98–99%.

Finish-time projection (MC): #1 SMART AVENUE is fastest at 1:47.71. #10 is +0.70s, #4 +1.40s, #5 +1.54s and #2 +1.68s. #9 HYMNBOOK is +2.94s, and #3 and #6 are almost 4s back. #5's ranking comes from form, rating (70, best by 6) and Purton rather than raw speed figures.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 5 | FLOW WATER FLOW | 45.0% | 79.4% | excuses +2, +form +1 | excuses +2, +form +1 | 48.0% | 82.4% | 2.5 | Z Purton | 7 | 126 | Stalk | +excuses, +form | ★ 膽 (Banker) |
| 2 | 10 | FOREVER FOLKS | 17.1% | 50.5% | +form +1, -age −2 | +form +1, -age −2 | 16.1% | 49.5% | 13 | K C Leung | 3 | 118 | Stalk | +form, -age | 腳 (Leg) |
| 3 | 1 | SMART AVENUE | 9.3% | 36.9% | excuses +2, +form +1 | excuses +2, +form +1 | 12.3% | 39.9% | 21 | H Bentley | 5 | 135 | Midfield / closer (rallies) | +excuses, +form | 腳 (Leg) |
| 4 | 9 | HYMNBOOK | 7.7% | 32.3% | +form +1 | +form +1 | 8.7% | 33.3% | 5.5 | C Y Ho | 11 | 119 | Midfield / closer | +form | 腳 (Leg) |
| 5 | 8 | BIG RETURN | 5.7% | 27.3% | excuses +2, +form +1 | excuses +2, +form +1 | 8.7% | 30.3% | 12 | A Badel | 1 | 120 | Stalk | +excuses, +form | 腳 (Leg) |
| 6 | 4 | GLITTERING LEGEND | 7.4% | 32.0% | 0 | 0 | 7.4% | 32.0% | 13 | C L Chau (-2) | 8 | 128 | Stalk | — | 腳 (Leg) |
| 7 | 2 | POCKETING | 5.3% | 23.7% | 0 | 0 | 5.3% | 23.7% | 15 | B Avdulla | 10 | 130 | Closer | — | 腳 (Leg) |
| 8 | 11 | DREAMING TOGETHER | 0.6% | 4.5% | excuses +2, +form +1 | excuses +2, +form +1 | 3.6% | 7.5% | 31 | K Teetan | 4 | 116 | Midfield / closer | +excuses, +form | — |
| 9 | 7 | KING EQUINE | 1.5% | 9.0% | excuses +2 | excuses +2 | 3.5% | 11.0% | 32 | R Kingscote | 6 | 122 | Midfield | +excuses | — |
| 10 | 3 | CALL ME MAGNIFIQUE | 0.3% | 3.0% | trial +2, +form +1 | trial +2, +form +1 | 3.3% | 6.0% | 8.1 | M F Poon | 2 | 128 | Closer | +trial, +form | — |
| 11 | 6 | MIGHTY STRENGTH | 0.1% | 1.3% | +form +1 | +form +1 | 1.1% | 2.3% | 9.6 | H T Mo (-2) | 9 | 126 | — | +form (layoff ~105d) | — |

Factor labels: excuses +2 (crowded/steadied/hampered/lacked room), trial +2, +form +1 (winner/rallied/improved in Star Form), -age −2 (8yo+ in C3 and above), -perf −2, -injury30d −3/−4, -barrier −1 (≥2 runs), -notRO −2. Caps are ±8 win / ±10 place, and none were reached. Banker eligibility: #5 has 7 starts, so it is eligible.

SCMP adjustments applied:
- **#5 FLOW WATER FLOW**: lacked clear running from 350m to 100m and raced tight last start (4th at 1400m), so excuses +2. Star Form highlights a well-timed 1600m win, so +form +1. It is up in grade and trip here.
- **#10 FOREVER FOLKS**: resumed to win at Valley 1800m (Star Form), so +form +1. The vet notes it is aged 8+, and this is Class 3, so -age −2. Vet passed 18/08 (47 days ago), which is more than 30 days, so no injury penalty. Note it is rising from Class 4.
- **#1 SMART AVENUE**: hampered near 400m and taken wider last start, so excuses +2. Rallying win and seconds at 1600–1800m, so +form +1.
- **#9 HYMNBOOK**: rallying 3rd in cheek pieces, so +form +1. Being shifted across from the wide gate is tactical, so no excuses credit. Gate 11 again.
- **#8 BIG RETURN**: bumped at the start, crowded near 900m and hampered near 350m, so excuses +2. Won three in a row earlier, so +form +1.
- **#11 DREAMING TOGETHER**: shifted in at the start and steadied when crowded, so excuses +2. Rallying 6th in May, so +form +1.
- **#7 KING EQUINE**: checked when crowded near 700m, so excuses +2.
- **#3 CALL ME MAGNIFIQUE**: ran powerfully from well back to win its latest trial, so trial +2. $64 upset winner last start at 2000m, so +form +1.
- **#6 MIGHTY STRENGTH**: comfortable May win at ST 1800m, so +form +1. It has been off ~105 days; no penalty in the table, but this is noted.
- **#2 POCKETING / #4 GLITTERING LEGEND**: no qualifying flags. #4's two 3rds in blinkers at 1800m are consistent rather than "improved".

Reasoning: This is a Class 3 1800m turf handicap. #5 FLOW WATER FLOW is the MC standout (rating 70, 6 points clear), clear favourite, has Purton, has won at ST 1800m (Feb) and has an excuse from its last run. The race is Dominant, so Mode A applies. The 4 contenders by Adj Place% are #10 (49.5%), #1 (39.9%), #9 (33.3%) and #4 (32.0%). #8 BIG RETURN (30.3%) is forced in by the Adj Place% ≥ 25% must-include rule. #2 POCKETING (23.7%) is forced in by Rule 8 (≥ 20% must be in the pool), matching how R3 was handled. That gives a 7-horse pool. The market's 3rd and 4th favourites, #3 (8.1) and #6 (9.6), stay out of Strategy A on thresholds (Adj Place% 6.0% and 2.3%). Rule 9 does not force them in, and Strategy B covers both.
Pace: there is no clear habitual leader in the field. #8 from gate 1 and #10 from gate 3 should be handy, and #5 from gate 7 should sit just off them. A moderate tempo over 1800m suits the stalkers (#5, #10, #8) over the back-markers (#2, #9 wide, #3).

## TRIO POOL (Strategy A, any order)

```
POOL: #5, #10, #1, #9, #8, #4, #2
MODE: A (Dominant, #5 Adj Win% 48.0% ≥ 35%) | POOL SIZE: 7
  Mode A default = banker + 4 by Adj Place% (#10 49.5, #1 39.9, #9 33.3, #4 32.0);
  #8 added because Adj Place% 30.3% ≥ 25% must-include;
  #2 added because Adj Place% 23.7% ≥ 20% (Rule 8).

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #5 FLOW WATER FLOW (Adj Win% 48.0%, Adj Place% 82.4%) ← locked in every combo
腳 (Legs):  #10, #1, #9, #8, #4, #2
雙膽拖 check: 2nd-ranked #10 Adj Place% 49.5% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #5, #10, #1 | 8.6% | $116 per $10 |
| 2 | #5, #10, #9 | 5.9% | $170 per $10 |
| 3 | #5, #10, #8 | 5.9% | $170 per $10 |
| 4 | #5, #10, #4 | 4.9% | $202 per $10 |
| 5 | #5, #1, #9 | 4.3% | $233 per $10 |
| 6 | #5, #1, #8 | 4.3% | $233 per $10 |
| 7 | #5, #1, #4 | 3.6% | $278 per $10 |
| 8 | #5, #10, #2 | 3.5% | $289 per $10 |
| 9 | #5, #9, #8 | 2.9% | $343 per $10 |
| 10 | #5, #1, #2 | 2.5% | $396 per $10 |

Estimated chance that the Strategy A ticket hits (sum of 15 combos): about 56%. Without #2 (strict Mode A plus the 25% rule, 10 combos) it would be about 45%. Harville from win% overstates how concentrated the finish is, so treat this as an upper bound.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

TICKET: 膽 #5 | 腳 #10, #1, #9, #8, #4, #2
  5-10-1, 5-10-9, 5-10-8, 5-10-4, 5-1-9, 5-1-8, 5-1-4, 5-10-2,
  5-9-8, 5-1-2, 5-9-4, 5-8-4, 5-9-2, 5-8-2, 5-4-2
```

Value note: #5 is a 2.5 favourite and #9 is 5.5, so 5-9-x combos will pay modestly. The value is in combos with #10 FOREVER FOLKS (13, MC undervalued 123%), #1 SMART AVENUE (21) and #8 BIG RETURN (12). The 5-10 quinella (MC 18.9%, fair 5.3) is the structural core.

PASS CONDITIONS:
- If #5 FLOW WATER FLOW (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going turns Yielding/Soft → #1 (won on Good to Yielding) and #10 (won on Good to Yielding) hold up; keep the ticket. Recheck #5, whose wins came on Good.
- If #10 drifts sharply (>20) on fitness concerns after ~113 days off → keep it (still Adj Place% 49.5%), but note the downside risk.

CONFIDENCE: MEDIUM-HIGH. The race is Dominant (48% top horse), and MC and the market agree on the banker. The leg order is uncertain, because MC and the market disagree on #9, #3 and #6.

CAVEATS:
- SCMP is partial. SCMP Win odds broadly match HKJC (#5 1.9 vs 2.5, #9 7.4 vs 5.5, #6 9.6 vs 9.6). SCMP Place odds are equal to or above Win odds for several runners (e.g. #1 18/19), so they look mis-parsed. No Q/QP matrix was returned, so the Q/QP cross-reference was not done. Some Star Form details came back from a summarised fetch (e.g. a "Dec 1400m win" for #1 that does not appear in our last-10 form), so the adjustments were kept to clear flags.
- Big MC-vs-market gaps: #3 CALL ME MAGNIFIQUE (8.1, MC 3.0% place) and #6 MIGHTY STRENGTH (9.6, MC 1.3% place) are the 3rd and 4th favourites but are not in Strategy A. MC has #3 on only 3 starts. #6 has ~105 days off but has won at ST 1800m. If either places, Strategy A misses. This is a known pool-miss risk, and Strategy B covers it.
- #9 HYMNBOOK is the 2nd favourite (5.5) but MC values it at 0.42. It has no runs at 1800m and is drawn 11 of 11.
- #10 FOREVER FOLKS is 8 years old, has been off since 13-Jun and is rising from Class 4 to Class 3. MC still rates it the clear 2nd pick.
- The analyzer's raw scrape log printed "distance=1200m". The saved race card, MC header and SCMP all confirm 1800m, and the simulation ran at 1800m.
- The HKJC place odds in the analyzer were estimated from win odds. The odds file holds actual place odds captured at 10:22 HKT, and the pool will move before the jump.
- Historical sync was not re-run in this session (already done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #5 FLOW WATER FLOW (MC Win% 45.0%, MC Place% 79.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #10 (50.5%), #1 (36.9%), #9 (32.3%), #4 (32.0%), #8 (27.3%), #2 (23.7%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
  #8 BIG RETURN (MC Place% 27.3%, Win odds 12)
  #2 POCKETING (MC Place% 23.7%, Win odds 15)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by Win odds ascending:
  #3 CALL ME MAGNIFIQUE (Win odds 8.1, MC Place% 3.0%)
  #6 MIGHTY STRENGTH (Win odds 9.6, MC Place% 1.3%)
Action: #3 replaced #2 (lowest replaceable, 23.7%); then #6 replaced #8 (next lowest, 27.3%)
Final legs: #10, #1, #9, #4, #3, #6
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #5 | 腳 #10, #1, #9, #4, #3, #6
  5-10-1 (12.5%), 5-10-9 (10.2%), 5-10-4 (9.7%), 5-1-9 (4.9%), 5-1-4 (4.7%),
  5-9-4 (3.8%), 5-10-3 (0.4%), 5-1-3 (0.2%), 5-9-3 (0.1%), 5-4-3 (0.1%),
  5-10-6 (0.1%), 5-1-6 (0.1%), 5-9-6 (<0.1%), 5-4-6 (<0.1%), 5-3-6 (<0.1%)
  Est. hit chance (Harville, raw MC): about 47%. Almost all of it comes from the 6 combos among #10/#1/#9/#4.
```

Comparison: both strategies use the same banker (#5) and the same cost ($150, 15 combos), and they share four core legs (#10, #1, #9, #4). Strategy A keeps #8 BIG RETURN and #2 POCKETING on model and SCMP strength (Adj Place% 30.3% and 23.7%). Strategy B swaps both out for the market's 3rd and 4th favourites, #3 and #6, which MC rates near zero (3.0% and 1.3% place). On the model, A has the higher estimated hit rate. B is a hedge against the market being right about #3 and #6.

═══════════════════════════════════════════════════════════
