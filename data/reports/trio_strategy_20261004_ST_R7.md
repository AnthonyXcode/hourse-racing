# Trio (單T) Strategy — Sha Tin 2026-10-04 Race 7

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-04 | Race 7
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey + trainer stats loaded) | Going: Good | Scratchings: none among the 14 declared runners
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds look mis-parsed; Q/QP matrix not returned)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261004_ST.json, captured 10:22 HKT 04-Oct)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R7 — Class 4 (60-40) | 1400m | Turf "B" Course | Good | 14 runners — SHAM TSENG HANDICAP (Sec 1)
CLASSIFICATION: Dominant (top Adj Win% 48.6%) | POOL SIZE: 6
MODE: A: Tight Pool (5), expanded to 6 by the Adj Place% ≥ 25% must-include rule
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-04 | Going: Good | Surface: Turf ("B" Course)
Target Race(s): R7 (Class 4 | 1400m | 14 runners)
Scratchings: none among runners (reserves ISLAND HIGHFLYER, QUANTUM WUKONG not running)
Odds coverage: 14 horses with HKJC win + place odds
SCMP data: ⚠️ partial
Form gaps: #4 STEADFAST FORT has 1 start. #5 KINGMAN REEF and #6 JOLLY BONUS have 2 starts each. #1 WELL ENOUGH has 3 starts. MC flagged 3 runners as sparse (<3 form lines).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 3 | LADY'S LOVE | 47.6% | 77.9% | 4.3 | ✅ | ✅ | 3/9/10/6/13/10 | ★ 膽 (Banker) | 3-7: 12.0% (8.3) |
| 7 | GENIUS BABY | 9.9% | 35.3% | 20 | ✅ | ❌ | 9/3/4/4/4/6 | 腳 (Leg) | 3-7: 12.0% (8.3) |
| 13 | FORZA LEADER | 9.4% | 34.9% | 14 | ✅ | ❌ | 4/3/2/6/4/4 | 腳 (Leg) | 3-13: 11.3% (8.9) |
| 2 | CALIFORNIA WAVES | 8.0% | 31.4% | 12 | ✅ | ❌ | 5/8/5/5/7/3 | 腳 (Leg) | 2-3: 9.8% (10.2) |
| 10 | NEXT FORTUNE | 7.7% | 30.3% | 32 | ✅ | ❌ | 8/5/2/10/9/8 | 腳 (Leg) | 3-10: 9.3% (10.7) |
| 9 | MIGHTY FIGHTER | 5.3% | 23.1% | 10 | ✅ | ❌ | 6/8/3/5/11 | 腳 (Leg) | 3-9: 7.0% (14.3) |
| 8 | GOLDEN WIN | 2.9% | 16.4% | 5.5 | ❌ | ✅ | 5/2/9/9/8/14 | 腳 (Leg, added) | — (replacement candidate) |
| 6 | JOLLY BONUS | 2.8% | 12.7% | 34 | ❌ | ❌ | 12/11 | — | — |
| 11 | HAPPY PROMISE | 2.6% | 13.3% | 9 | ❌ | ✅ | 5/11/4/4 | 腳 (Leg, added) | — (replacement candidate) |
| 5 | KINGMAN REEF | 1.3% | 7.7% | 24 | ❌ | ❌ | 13/13 | — | — |
| 12 | POLAR PATCH | 1.2% | 7.7% | 12 | ❌ | ❌ | 9/4/3/3/11/12 | — | — |
| 14 | QUICK CONTRIBUTION | 0.8% | 5.4% | 5.7 | ❌ | ✅ | 3/2/2/7/4/8 | 腳 (Leg, added) | — (replacement candidate) |
| 4 | STEADFAST FORT | 0.3% | 2.3% | 42 | ❌ | ❌ | 11 | — | — |
| 1 | WELL ENOUGH | 0.2% | 1.7% | 48 | ❌ | ❌ | 13/13/10 | — | — |

Market: overround 23.4%, favourite bias +104.7%. MC agrees with the market on #3 LADY'S LOVE as favourite but makes it far stronger (47.6% vs about 19% implied at 4.3; MC rates it undervalued by 105%). MC also likes #10 NEXT FORTUNE (undervalued by 146%) and #7 GENIUS BABY (+99%). The sharpest disagreement is the market's 2nd and 3rd favourites, #8 GOLDEN WIN (5.5) and #14 QUICK CONTRIBUTION (5.7). MC gives them only 16.4% and 5.4% place.

Finish-time projection (MC): #3 and #7 share the fastest projected time (1:22.84). #5 is +0.28s, #6 +0.42s, and #2, #9, #10 are +0.70s. #13 is +1.40s, #14 +2.24s and #8 +2.94s (slowest).

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 3 | LADY'S LOVE | 47.6% | 77.9% | +draw +1 | +draw +1 | 48.6% | 78.9% | 4.3 | Z Purton | 1 | 129 | Closer (closing 3rd) | +draw | ★ 膽 (Banker) |
| 2 | 7 | GENIUS BABY | 9.9% | 35.3% | excuses +2 | excuses +2 | 11.9% | 37.3% | 20 | L Hewitson | 8 | 125 | Midfield / back | +excuses | 腳 (Leg) |
| 3 | 13 | FORZA LEADER | 9.4% | 34.9% | 0 | 0 | 9.4% | 34.9% | 14 | A Badel | 12 | 120 | Closer | — | 腳 (Leg) |
| 4 | 2 | CALIFORNIA WAVES | 8.0% | 31.4% | 0 | 0 | 8.0% | 31.4% | 12 | B Avdulla | 10 | 130 | Midfield / closer | — | 腳 (Leg) |
| 5 | 10 | NEXT FORTUNE | 7.7% | 30.3% | 0 | 0 | 7.7% | 30.3% | 32 | C Y Ho | 14 | 123 | Stalker (box seat) | — | 腳 (Leg) |
| 6 | 9 | MIGHTY FIGHTER | 5.3% | 23.1% | trial +2 | trial +2 | 7.3% | 25.1% | 10 | R Kingscote | 5 | 123 | Closer | +trial | 腳 (Leg) |
| 7 | 8 | GOLDEN WIN | 2.9% | 16.4% | excuses +2 | excuses +2 | 4.9% | 18.4% | 5.5 | K C Leung | 6 | 123 | On-pace (keen) | +excuses | — |
| 8 | 5 | KINGMAN REEF | 1.3% | 7.7% | excuses +2 | excuses +2 | 3.3% | 9.7% | 24 | M Chadwick | 4 | 127 | — | +excuses | — |
| 9 | 12 | POLAR PATCH | 1.2% | 7.7% | excuses +2 | excuses +2 | 3.2% | 9.7% | 12 | C L Chau (-2) | 9 | 121 | Closer | +excuses | — |
| 10 | 6 | JOLLY BONUS | 2.8% | 12.7% | 0 | 0 | 2.8% | 12.7% | 34 | K Teetan | 2 | 126 | — | — | — |
| 11 | 11 | HAPPY PROMISE | 2.6% | 13.3% | 0 | 0 | 2.6% | 13.3% | 9 | A Atzeni | 7 | 121 | Closer (rallying) | — | — |
| 12 | 1 | WELL ENOUGH | 0.2% | 1.7% | excuses +2 | excuses +2 | 2.2% | 3.7% | 48 | M L Yeung | 11 | 135 | — | +excuses | — |
| 13 | 4 | STEADFAST FORT | 0.3% | 2.3% | 0 | 0 | 0.3% | 2.3% | 42 | J Orman | 13 | 128 | — | — | — |
| 14 | 14 | QUICK CONTRIBUTION | 0.8% | 5.4% | -injury30d −3, trial +2 | -injury30d −4, trial +2 | 0.1% (floor) | 3.4% | 5.7 | M F Poon | 3 | 119 | On-pace | -injury30d, +trial | — |

Factor labels: excuses +2 (crowded/steadied/held up/wide), trial +2, +draw +1, +form +1, -perf −2, -injury30d −3 win / −4 place, -barrier −1, -notRO −2, -age −2 (8yo+ in C3 and above only). Caps are ±8 win / ±10 place. Banker eligibility: #3 has 7 starts, so it is eligible.

SCMP adjustments applied:
- **#3 LADY'S LOVE**: SCMP says "Ideal draw" (gate 1), so +draw +1. It resumed with a closing 3rd at $59 from gate 10. "Closing" is not one of the "improved/rallied/made all" keywords, so no +form credit.
- **#7 GENIUS BABY**: bumped at the start and "did not travel well" when 9th first-up, and may appreciate the step up in distance. That counts as excuses +2. Post-race vet clear.
- **#9 MIGHTY FIGHTER**: "Looked top order in dirt gallop Friday; can improve second-up", so trial +2. This lifts it to 25.1% Adj Place%, which crosses the must-include line.
- **#8 GOLDEN WIN**: steadied near 900m when racing keenly, and was wide early in a pleasing 5th, so excuses +2.
- **#5 KINGMAN REEF**: checked at the start when crowded and held up over the final 100m, so excuses +2.
- **#12 POLAR PATCH**: unbalanced when bumped after the start and settled further back than intended, so excuses +2. Post-race vet clear.
- **#1 WELL ENOUGH**: caught wide early, then eased, so excuses +2 (still negligible).
- **#14 QUICK CONTRIBUTION**: vet report shows lame in the right front leg on 05/07, and it passed the official exam on 08/09. That is 26 days before race day (<30), so -injury30d. It has "now trialled well", so trial +2. The net is −1 win (floored at 0.1%) and −2 place.
- #6 JOLLY BONUS was bumped near 450m. That is minor, so no excuses credit. #10's wide trip was two runs back, so no credit.

Reasoning: #3 LADY'S LOVE dominates the race: MC gives it 47.6% win and 77.9% place, it has the fastest projected time, it draws gate 1 ("ideal"), and Purton rides. The race classifies as Dominant (48.6% ≥ 35%), so Mode A applies: banker plus the top 4 by Adj Place% (#7 37.3%, #13 34.9%, #2 31.4%, #10 30.3%). #9 MIGHTY FIGHTER (25.1% after trial +2) also clears the ≥25% must-include threshold, so the pool goes to 6. The skill allows pool sizes of 5–7, and must-include takes priority over Mode A's nominal 5.
Pace: #8 (keen, on-pace) and #14 are the likely forward types. #10 NEXT FORTUNE from gate 14 will need luck to find cover. Most of the pool (#3, #13, #2, #9) are closers or midfield types, which suits a fair tempo over 1400m on "B" Course.

## TRIO POOL (Strategy A, any order)

```
POOL: #3, #7, #13, #2, #10, #9
MODE: A (Dominant) | POOL SIZE: 6 (5 + must-include #9)
Selection: banker #3 + top 4 by Adj Place% (#7, #13, #2, #10) + must-include #9 (Adj Place% 25.1% ≥ 25%)
Must-include (Adj Place% ≥ 25%): #3, #7, #13, #2, #10, #9 — all included

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #3 LADY'S LOVE (Adj Win% 48.6%, Adj Place% 78.9%) ← locked in every combo
腳 (Legs):  #7, #13, #2, #10, #9
雙膽拖 check: 2nd-ranked #7 Adj Place% 37.3% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #3, #7, #13 | 5.7% | $175 per $10 |
| 2 | #3, #7, #2 | 4.8% | $209 per $10 |
| 3 | #3, #7, #10 | 4.6% | $218 per $10 |
| 4 | #3, #7, #9 | 4.3% | $231 per $10 |
| 5 | #3, #13, #2 | 3.7% | $273 per $10 |
| 6 | #3, #13, #10 | 3.5% | $285 per $10 |
| 7 | #3, #13, #9 | 3.3% | $302 per $10 |
| 8 | #3, #2, #10 | 2.9% | $340 per $10 |
| 9 | #3, #2, #9 | 2.8% | $360 per $10 |
| 10 | #3, #10, #9 | 2.7% | $376 per $10 |

Estimated chance that the Strategy A ticket hits (sum of the 10 combos): about 38%. The banker places in about 79% of simulations, and the main risk is the second and third places going to horses outside the pool.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKET: 膽 #3 | 腳 #7, #13, #2, #10, #9
  3-7-13, 3-7-2, 3-7-10, 3-7-9, 3-13-2, 3-13-10, 3-13-9, 3-2-10, 3-2-9, 3-10-9
```

Value note: every leg is 10 or longer in the market (#9 10, #2 12, #13 14, #7 20, #10 32). If the banker places and the market's 2nd and 3rd favourites (#8, #14) miss, Trio dividends should be generous.

PASS CONDITIONS:
- If #3 LADY'S LOVE (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If going turns Yielding/Soft → reconsider. #1 and #3 have wet-track form lines, so check market moves.
- If #8 GOLDEN WIN and #14 QUICK CONTRIBUTION firm sharply (both under 5), the market is signalling strongly against the MC read. Consider Strategy B's wider ticket instead.

CONFIDENCE: MEDIUM-HIGH. The banker is very strong (MC 77.9% place, gate 1, Purton). The legs are an open group of 30–37% place horses.

CAVEATS:
- SCMP is partial. Win odds broadly match HKJC (#3 4.0 vs 4.3, #8 6.2 vs 5.5, #14 6.5 vs 5.7). SCMP Place odds are equal to or above Win odds for most runners (e.g. #1 59/58), so they look mis-parsed. The Q/QP matrix was not returned, so the Q/QP cross-reference was not done.
- Pool-miss risk: the market's 2nd and 3rd favourites, #8 GOLDEN WIN (5.5) and #14 QUICK CONTRIBUTION (5.7), plus #11 HAPPY PROMISE (9), are all outside the Strategy A pool. MC rates them 16.4% / 5.4% / 13.3% place. #14 is coming back from lameness (exam passed 26 days ago) but was placed 4 times from 7 starts last term, with consecutive 2nds over 1400m. MC may underrate it because its speed figures are poor. Strategy B covers all three.
- The MC strength of #3 (47.6% win) is far above the market (about 19%). Its last 6 runs are 3/9/10/6/13/10, so the model is leaning on rating, speed figure and 1400m trip data. This deserves a sanity check.
- #10 NEXT FORTUNE draws gate 14 (the widest). MC does not model draw bias heavily, so its 30.3% place may be optimistic.
- A scraper log line reported "distance=1200m" while parsing, but the saved race card, MC header and SCMP all confirm 1400m. The simulation ran at 1400m.
- Odds were captured at 10:22 HKT; the HKJC pool will move before the jump (3:35pm).
- Historical sync was not re-run in this session (it had already been done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #3 LADY'S LOVE (MC Win% 47.6%, MC Place% 77.9%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #7 (35.3%), #13 (34.9%), #2 (31.4%), #10 (30.3%), #9 (23.1%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
  (#9 is at 23.1% but its Win odds are exactly 10, which is not > 10. #10 at 30.3% is above the 20–30% band.)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #8 GOLDEN WIN (Win odds 5.5, MC Place% 16.4%)
  #14 QUICK CONTRIBUTION (Win odds 5.7, MC Place% 5.4%)
  #11 HAPPY PROMISE (Win odds 9, MC Place% 13.3%)
Action: no replaceable leg, so all 3 candidates are added directly
Final legs: #7, #13, #2, #10, #9, #8, #14, #11
BET STRUCTURE: 膽拖 | 1膽 + 8腳 | COMBINATIONS: C(8,2) = 28
UNIT BET: $10 (fixed)
TOTAL STAKE: $280

STRATEGY B TICKET: 膽 #3 | 腳 #7, #13, #2, #10, #9, #8, #14, #11
  Top combos (Harville, raw MC): 3-7-13 (7.5%), 3-7-2 (6.2%), 3-7-10 (6.0%), 3-13-2 (5.9%),
  3-13-10 (5.6%), 3-2-10 (4.7%), 3-7-9 (4.0%), 3-13-9 (3.8%), 3-2-9 (3.1%), 3-10-9 (3.0%)
  + 18 combos involving #8 / #11 / #14 (each ≤ 2.1%)
  Est. hit chance (Harville, raw MC): about 69%
```

Comparison: both strategies use the same banker (#3) and the same five core legs. Strategy B adds the market's 2nd, 3rd and 4th favourites (#8, #14, #11) as Win-odds additions. That takes it from 10 to 28 combos ($100 → $280) and covers the main pool-miss risk, but the 18 extra combos mostly pair the banker with short-priced horses and should pay less. Strategy A is the value ticket, and B is the coverage ticket.

═══════════════════════════════════════════════════════════
