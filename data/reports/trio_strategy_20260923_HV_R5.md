# Trio (單T) Strategy — Happy Valley | 2026-09-23 | Race 5

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-23 | Race 5
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all --use-saved --hide-actual)
SCMP DATA: ❌ Unavailable — SCMP skipped (post-meeting blind run); step 3c not applied
ODDS SOURCE: Momentum collector DB, last snapshot at or before post time
             (data/odds/odds_20260923_HV.json, file written 23:05 HKT 23-Sep; values are pre-off)
             SCMP odds: ❌ skipped | HKJC live: ❌ not fetched (blind run)

RACE: R5 — THE HONG KONG COUNTRY CLUB CHALLENGE CUP | Class 4 | 1650m | Turf | Good | 12 runners
CLASSIFICATION: Competitive (top Adj Win% 22.6%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Validation Summary

```
Meeting: Happy Valley 2026-09-23 | Going: Good | Surface: Turf
Target Race(s): R5 (Class 4 | 1650m | 12 runners)
Scratchings: none (all 12 racecard runners present in saved odds file)
Odds coverage: 12 horses with win odds (place odds also present in the snapshot; the MC used estimated place odds)
SCMP data: ❌ unavailable (skipped by design, post-meeting blind run)
```

- ✅ ≥3 starters (12)
- ✅ Odds for every runner
- ✅ Jockey and trainer stats loaded from historical data
- ✅ Going (Good) and surface (Turf) parsed
- ⚠️ #6 HAPPY SMILE has only 4 form runs and 1 at this trip (still ≥2 starts, so it can be a banker)
- ⚠️ #11 HEALTHY PONY has 5 form runs. #2 CLASS has 6.
- Historical sync (1b) and live odds fetch (1c) were **not run**, on purpose. The historical data and the pre-off odds were already saved.

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 1 | GLORIOUS JOURNEY | 22.6% | 56.7% | 12.0 | ✅ | ❌ | 10 | ★ 膽 (Banker) | 1-8: 10.6% (9.4) |
| 8 | LUCK IS BACK | 20.9% | 53.5% | 7.1 | ✅ | ✅ | 10 | 腳 (Leg) | 1-6: 10.4% (9.6) |
| 6 | HAPPY SMILE | 20.8% | 54.4% | 6.5 | ✅ | ✅ | 4 | 腳 (Leg) | 6-8: 9.9% (10.1) |
| 4 | VERMILION TEMPEST | 18.5% | 50.4% | 14.0 | ✅ | ❌ | 9 | 腳 (Leg) | 1-4: 9.7% (10.3) |
| 5 | INNO SUPER | 5.2% | 22.2% | 4.0 | ✅ | ✅ | 10 | 腳 (Leg) | — |
| 9 | VIVA FIRECRACKER | 4.1% | 19.8% | 7.0 | ❌ | ✅ | 10 | 腳 (Leg), added (replacement candidate) | — |
| 3 | IVY LEAGUE | 2.9% | 13.6% | 10.0 | ❌ | ❌ | 10 | — | — |
| 2 | CLASS | 1.5% | 8.1% | 18.0 | ❌ | ❌ | 6 | — | — |
| 12 | GAZELEY | 1.4% | 7.6% | 13.0 | ❌ | ❌ | 10 | — | — |
| 7 | DASHING MAURISON | 1.4% | 8.7% | 9.0 | ❌ | ✅ | 10 | 腳 (Leg), added (replacement candidate) | — |
| 10 | KING OF SELECTION | 0.4% | 2.8% | 30.0 | ❌ | ❌ | 8 | — | — |
| 11 | HEALTHY PONY | 0.2% | 2.0% | 68.0 | ❌ | ❌ | 5 | — | — |

Market: overround 23.9%. The MC and the market disagree sharply. The MC's top four (#1, #8, #6, #4) are all rated above their odds: #8 is undervalued by 130%, #1 by 126% and #4 by 103%. The market favourite, #5 INNO SUPER at 4.0, is only 5th in the MC (5.2% win). Its jockey has 0 wins from 24 rides in the data. The finish-time projection ranks #1 first (~1:39.75), with #3 IVY LEAGUE (+0.42s) and #4 (+0.84s) next.

---

## STRATEGY A — HORSE RANKINGS

SCMP was skipped, so every Adj factor is `0` and Adj% = raw MC%. Strategy A is therefore the raw MC ranking run through the Mode A–D pool rules.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 1 | GLORIOUS JOURNEY | 22.6% | 56.7% | 0 | 0 | 22.6% | 56.7% | 12.0 | C Y Ho | — | — (SCMP skipped) | ★ 膽 (Banker) |
| 8 | LUCK IS BACK | 20.9% | 53.5% | 0 | 0 | 20.9% | 53.5% | 7.1 | E C W Wong | — | — | 腳 (Leg) |
| 6 | HAPPY SMILE | 20.8% | 54.4% | 0 | 0 | 20.8% | 54.4% | 6.5 | K C Leung | — | — | 腳 (Leg) |
| 4 | VERMILION TEMPEST | 18.5% | 50.4% | 0 | 0 | 18.5% | 50.4% | 14.0 | L Ferraris | — | — | 腳 (Leg) |
| 5 | INNO SUPER | 5.2% | 22.2% | 0 | 0 | 5.2% | 22.2% | 4.0 | C L Chau | — | — | 腳 (Leg) |
| 9 | VIVA FIRECRACKER | 4.1% | 19.8% | 0 | 0 | 4.1% | 19.8% | 7.0 | K Teetan | — | — | 腳 (Leg) |
| 3 | IVY LEAGUE | 2.9% | 13.6% | 0 | 0 | 2.9% | 13.6% | 10.0 | R Kingscote | — | — | — |
| 7 | DASHING MAURISON | 1.4% | 8.7% | 0 | 0 | 1.4% | 8.7% | 9.0 | H Bentley | — | — | — |
| 2 | CLASS | 1.5% | 8.1% | 0 | 0 | 1.5% | 8.1% | 18.0 | J Orman | — | — | — |
| 12 | GAZELEY | 1.4% | 7.6% | 0 | 0 | 1.4% | 7.6% | 13.0 | M Chadwick | — | — | — |
| 10 | KING OF SELECTION | 0.4% | 2.8% | 0 | 0 | 0.4% | 2.8% | 30.0 | M F Poon | — | — | — |
| 11 | HEALTHY PONY | 0.2% | 2.0% | 0 | 0 | 0.2% | 2.0% | 68.0 | M L Yeung | — | — | — |

Note: ★ 膽 = Banker, the 1st-ranked horse by Adj Win%. #1 has 10 form runs, so it is banker-eligible. The 2nd-ranked horse, #8, has Adj Place% 53.5%, which is below 63%, so 雙膽拖 does not apply.

Reasoning: The top Adj Win% is 22.6%, which falls in the 20–35% band. That makes the race **Competitive → Mode B** (6-horse pool). The top 3 by Adj Win% are #1, #8 and #6. The next 3 by Adj Place% are #4 (50.4%), #5 (22.2%) and #9 (19.8%). Every horse with Adj Place% ≥ 25% (#1, #8, #6, #4) is in the pool. The MC puts a clear four-horse top tier (Place% 50–57%) well clear of the rest. #5 is the market favourite at 4.0 but only 5th in the MC. It is kept in the pool under the "no hard exclusion at odds ≤15" rule. #9 (7.0) fills the last slot. #1 GLORIOUS JOURNEY is proven over the trip: 10 of its 10 form runs were at 1650m HV, with 2nd places in March, April and May 2026. It is also the fastest horse in the time projection. With no SCMP data, I could not assess pace or running style. The race is at 1650m, where the skill notes a stalker bias at HV.

---

## TRIO POOL (any order) — Strategy A

```
POOL: #1, #8, #6, #4, #5, #9
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #1 GLORIOUS JOURNEY (Adj Place% 56.7%) ← locked in every combo
腳 (Legs):  #8, #6, #4, #5, #9
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville trio probability from MC Win%; fair odds = 1/p):

| Rank | Horses (any order) | Est. Trio Prob | Est. Fair Odds |
|------|--------------------|----------------|----------------|
| 1 | #1, #8, #6 | 13.2% | $8 |
| 2 | #1, #8, #4 | 11.3% | $9 |
| 3 | #1, #6, #4 | 11.3% | $9 |
| 4 | #1, #8, #5 | 2.7% | $37 |
| 5 | #1, #6, #5 | 2.7% | $37 |

---

## TICKET SUMMARY — Strategy A

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
Estimated ticket hit probability (Harville, sum of 10 combos): ~49.8%

TOP COMBINATIONS:
  1-6-8  13.2%
  1-4-8  11.3%
  1-4-6  11.3%
  1-5-8   2.7%
  1-5-6   2.7%
  1-4-5   2.3%
  1-8-9   2.1%
  1-6-9   2.1%
  1-4-9   1.8%
  1-5-9   0.4%
```

PASS CONDITIONS:
- If #1 GLORIOUS JOURNEY (banker) is scratched → VOID the ticket
- If the field drops below 3 → pool refunded
- If the going changes to Yielding/Heavy → reconsider (the MC was run for Good)

CONFIDENCE: MEDIUM. The MC's top four are clearly separated from the rest, but the banker's MC Place% is only 56.7% and the model disagrees strongly with the market (the market's #1 and #3 are ranked 5th and 6th by the MC). The top-trio fair odds of $8–9 also suggest limited dividend value if the MC's favourites fill the frame.

CAVEATS:
- SCMP skipped (post-meeting blind run). No Star Form, TIR, vet or trackwork adjustments, and no QP/Q cross-check. Strategy A equals the raw MC.
- Historical sync and live odds fetch were intentionally not run. Odds are the last momentum-collector snapshot before the off. The MC used place odds estimated from win odds.
- The MC and the market diverge heavily: favourite bias −75.5%, and the MC rates the market favourite #5 at only 5.2% win. The model's edge depends on its speed-figure form read being right.
- The banker's trainer (F C Lor) has 0 wins from 21 runners in the data. #5's jockey (C L Chau) has 0 wins from 24 rides.
- #6 HAPPY SMILE has thin form (4 runs, 1 at this trip).
- The trio probabilities use Harville from MC Win%, so they are approximations and not a direct MC trio output.

---

## STRATEGY B (MC-only)

```
Banker: #1 GLORIOUS JOURNEY (MC Win% 22.6%, MC Place% 56.7%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #8 (53.5%), #6 (54.4%), #4 (50.4%), #5 (22.2%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
  (#5 has MC Place% 22.2% but Win odds 4.0, so it is not replaceable)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #9 VIVA FIRECRACKER (Win odds 7.0, MC Place% 19.8%)
  #7 DASHING MAURISON (Win odds 9.0, MC Place% 8.7%)
Action: no replaceable leg, so #9 and #7 are both added directly
Final legs: #8, #6, #4, #5, #9, #7
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150
Estimated ticket hit probability (Harville): ~52.1%
```

STRATEGY B TICKET: 膽 #1 / 腳 #4, #5, #6, #7, #8, #9 → 15 combos:
1-4-5, 1-4-6, 1-4-7, 1-4-8, 1-4-9, 1-5-6, 1-5-7, 1-5-8, 1-5-9, 1-6-7, 1-6-8, 1-6-9, 1-7-8, 1-7-9, 1-8-9

Comparison: Strategy B has the same banker and the same five legs as Strategy A, plus #7 DASHING MAURISON. #7 qualifies only on its market price (9.0) and has an MC Place% of just 8.7%. Adding it costs +$50 (15 vs 10 combos) for about +2.3 points of estimated hit probability.

```
═══════════════════════════════════════════════════════════
```
