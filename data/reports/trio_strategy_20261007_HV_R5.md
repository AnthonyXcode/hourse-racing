# Trio (單T) Strategy — Happy Valley 2026-10-07 Race 5

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-07 | Race 5
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey + trainer stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds look mis-parsed; Q/QP matrix not available)
ODDS SOURCE: HKJC pool (data/odds/odds_20261007_HV.json, captured 11:01 HKT 07-Oct; same win odds used by analyze-race.ts)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R5 — Class 4 | 1000m | Turf | Good to Firm | 12 runners — THE CHINESE GENERAL CHAMBER OF COMMERCE CUP (HANDICAP)
CLASSIFICATION: Dominant (top Adj Win% 43.3%) | POOL SIZE: 6 (Mode A 5 + #9 forced in by Rule 9)
MODE: A: Tight Pool (5) + Rule 9 inclusion
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
BET STRUCTURE (B): 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-07 | Going: Good to Firm | Surface: Turf
Target Race(s): R5 (Class 4 | 1000m | 12 runners)
Scratchings: none (SCMP lists R. FLYING HUNTER as reserve only)
Odds coverage: 12 horses with odds (HKJC win; place estimated from win by the tool)
SCMP data: ⚠️ partial
Form gaps: #7 BRILLIANT TURN is a debutant (0 starts, 6 trials). Not banker-eligible; MC uses default rating.
           #9 GOLDEN ACE has 1 start (3rd on debut, ST straight 1000m, 01-Jul, 98 days ago — layoff >90 days).
           #11 JACKSON HABIT 3 starts. #1, #5, #11 last ran 08-Jul (91 days).
           Banker #4 SUPERB KING has 6+ recorded starts (eligible).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 4 | SUPERB KING | 41.3% | 72.2% | 3.2 | ✅ | ✅ | 3/2/6/4/2/2 | ★ 膽 (Banker) | 4-6: 11.6% (8.6) |
| 6 | BEAUTY SHOW | 11.9% | 36.6% | 12 | ✅ | ❌ | 12/2/2/7/4/2 | 腳 (Leg) | 4-6: 11.6% (8.6) |
| 12 | MAPOGO | 6.6% | 23.7% | 20 | ✅ | ❌ | 4/5/11/7/6/4 | 腳 (Leg) | 4-12: 5.9% (16.8) |
| 8 | GEORGIAN SIGMA | 6.0% | 23.5% | 3.9 | ✅ | ✅ | 2/3/7/3/3/3 | 腳 (Leg) | 4-8: 6.3% (16.0) |
| 1 | GRAND NOVA | 5.9% | 23.7% | 10 | ✅ | ❌ | 4/1/7/2/12/2 | 腳 (Leg) | 1-4: 6.7% (14.9) |
| 7 | BRILLIANT TURN | 5.9% | 23.7% | 18 | ✅ | ❌ | debut | 腳 (Leg) | 4-7: 6.0% (16.5) |
| 3 | COPPER CORE | 5.2% | 21.3% | 28 | ✅ | ❌ | 8/11/10/10/11 | 腳 (Leg) | — |
| 9 | GOLDEN ACE | 4.7% | 20.4% | 6.7 | ✅ | ✅ | 3 | 腳 (Leg) | — |
| 5 | VIGOR EYE | 4.6% | 19.3% | 15 | ❌ | ❌ | 10/3/12/1/2/9 | — | — |
| 2 | MASTER CHAMPION | 4.3% | 17.7% | 32 | ❌ | ❌ | 14/12/10/12/4/12 | — | — |
| 11 | JACKSON HABIT | 2.3% | 10.8% | 20 | ❌ | ❌ | 6/13/12 | — | — |
| 10 | IRON SECURITY | 1.1% | 7.0% | 23 | ❌ | ❌ | 10/10/6/9/10/10 | — | — |

Market: overround 22.7%. MC agrees with the market on the favourite #4 SUPERB KING (3.2, Purton, MC 41.3% win / 72.2% place, rating 71 vs next-best 61, fastest projected time 56.34s). MC disagrees on the next two in the market: #8 GEORGIAN SIGMA (3.9, "overvalued by 76%") and #9 GOLDEN ACE (6.7, "overvalued by 67%"). MC's clear 2nd is #6 BEAUTY SHOW (12) at 36.6% place. Below #6 the field is flat: 7 horses sit between 20% and 24% place, so leg selection is close to a coin toss. Finish-time projection order: #4, #1 (+0.28s), #8 (+0.56s), #6 (+0.70s), #5 (+0.98s).

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 4 | SUPERB KING | 41.3% | 72.2% | excuses +2 | excuses +2 | 43.3% | 74.2% | 3.2 | Z Purton | 4 | 131 | Stalk | +excuses | ★ 膽 (Banker) |
| 2 | 6 | BEAUTY SHOW | 11.9% | 36.6% | -perf −2 | -perf −2 | 9.9% | 34.6% | 12 | A Atzeni | 11 | 130 | Front | -perf | 腳 (Leg) |
| 3 | 1 | GRAND NOVA | 5.9% | 23.7% | excuses +2 | excuses +2 | 7.9% | 25.7% | 10 | R Kingscote | 1 | 135 | Midfield | +excuses | 腳 (Leg) |
| 4 | 3 | COPPER CORE | 5.2% | 21.3% | excuses +2 | excuses +2 | 7.2% | 23.3% | 28 | K C Leung | 8 | 131 | Midfield | +excuses | — |
| 5 | 12 | MAPOGO | 6.6% | 23.7% | 0 | 0 | 6.6% | 23.7% | 20 | K Teetan | 12 | 118 | Front | — | 腳 (Leg) |
| 6 | 5 | VIGOR EYE | 4.6% | 19.3% | trial +2 | trial +2 | 6.6% | 21.3% | 15 | H Bentley | 2 | 131 | Stalk (box seat) | +trial | — |
| 7 | 2 | MASTER CHAMPION | 4.3% | 17.7% | excuses +2 | excuses +2 | 6.3% | 19.7% | 32 | H Y Yuen (-7) | 10 | 133 | Midfield | +excuses | — |
| 8 | 8 | GEORGIAN SIGMA | 6.0% | 23.5% | 0 | 0 | 6.0% | 23.5% | 3.9 | Y L Chung (-2) | 7 | 128 | Stalk | — | — |
| 9 | 7 | BRILLIANT TURN | 5.9% | 23.7% | 0 | 0 | 5.9% | 23.7% | 18 | J Orman | 6 | 128 | Front (trial) | debutant | 腳 (Leg) |
| 10 | 11 | JACKSON HABIT | 2.3% | 10.8% | 0 | 0 | 2.3% | 10.8% | 20 | A Badel | 5 | 122 | Stalk | — | — |
| 11 | 9 | GOLDEN ACE | 4.7% | 20.4% | -injury30d −3 | -injury30d −4 | 1.7% | 16.4% | 6.7 | B Avdulla | 9 | 128 | Closer | -injury30d | 腳 (Leg) — Rule 9 |
| 12 | 10 | IRON SECURITY | 1.1% | 7.0% | 0 | 0 | 1.1% | 7.0% | 23 | P N Wong (-7) | 3 | 124 | Front/keen | — | — |

Factor labels: excuses +2 (crowded/checked/hampered/wide), trial +2, -perf −2 (unacceptable performance), -injury30d −3 win / −4 place. Caps are ±8 win / ±10 place, and none were reached. Banker eligibility: #4 has 6+ starts, so it is eligible.

SCMP adjustments applied:
- **#4 SUPERB KING**: TIR "Jumped only fairly and then was crowded", so excuses +2. Star Form ("placed five times without winning from final 12 at the Valley") has no scoring keyword.
- **#6 BEAUTY SHOW**: Vet "Unacceptable performance (passed on 25/09/2026)", so -perf −2. Star Form "Set the pace for second three times" marks it as a front-runner, but it has no scoring keyword. Odds of 12 (≤ 15) keep it eligible under Rule 9, and it is in the pool anyway.
- **#1 GRAND NOVA**: TIR "Bumped leaving 300M; crowded and made contact", and Star Form "hampered 200m out", so excuses +2. The earlier Valley 1,000m win was not scored as +form (no improved/rallied/made-all keyword), which matches the R3 convention.
- **#3 COPPER CORE**: TIR "checked when crowded", so excuses +2. Star Form is negative ("did not make an impression four times") but has no scoring flag.
- **#5 VIGOR EYE**: Trackwork "Stayed on well for second in a recent trial and looks in good nick", so trial +2. TIR "Shifted in and blundered" was self-inflicted, so it is not scored as an excuse.
- **#2 MASTER CHAMPION**: TIR "Raced wide without cover from 800M", so excuses +2.
- **#9 GOLDEN ACE**: Vet "Abrasions to both hind legs (passed on 19/09/2026)", 18 days before the race (< 30), so -injury30d −3 win / −4 place. A single contact-on-jumping note does not earn a -barrier penalty.
- **#10 IRON SECURITY**: TIR "raced keenly and got its head up when being steadied". The steadying was caused by the horse's own keenness, so it was not treated as bad luck (0). The plate adjustment and vet pass are not scored.
- **#7, #8, #11, #12**: no scoring flags. #7's trial placings ("front-running third") do not match the trial keywords.

Reasoning: #4 SUPERB KING is a clear standout. It is MC #1 by a wide margin (rating 71, 10 points clear), has Purton aboard, consistent placings (3/2/6/4/2/2), the fastest projected time, gate 4, and is also the market favourite. At Adj Win% 43.3% the race is Dominant, so Mode A applies: the banker plus the top 4 by Adj Place%. #6 (34.6%) and #1 (25.7%) clear the ≥25% must-include line. The last two slots fall in a near-tie cluster: #12 23.7%, #7 23.7%, #8 23.5%, #3 23.3%. #12 and #7 take them (ties broken by Adj Win%: #12 6.6% > #7 5.9%; #7 ranks above #8 by Adj Place%). **Rule 9** then forces #9 GOLDEN ACE into the pool: it carries a negative flag (-injury30d), but the market still has it at 6.7 (≤ 15). That gives a 6-horse pool. Pace: #6 (gate 11), #12 (gate 12) and debutant #7 are the likely leaders. HV 1,000m favours on-pace horses, and #4 from gate 4 should get the box seat or sit just off the speed. #1 from gate 1 has the best draw. The 2nd favourite #8 GEORGIAN SIGMA (3.9) misses the pool by 0.2% Adj Place%, and it has no negative flag, so Rule 9 does not force it in. Strategy B covers it.

## TRIO POOL (Strategy A, any order)

```
POOL: #4, #6, #1, #12, #7, #9
MODE: A (Dominant, #4 Adj Win% 43.3% ≥ 35%) | POOL SIZE: 6
  Mode A = banker #4 + top 4 by Adj Place% (#6 34.6, #1 25.7, #12 23.7, #7 23.7)
  Must-include (Adj Place% ≥ 25%): #4, #6, #1 — all in pool
  Rule 9 (negative flag but odds ≤ 15): #9 GOLDEN ACE (6.7, -injury30d) added

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #4 SUPERB KING (Adj Win% 43.3%, Adj Place% 74.2%) ← locked in every combo
腳 (Legs):  #6, #1, #12, #7, #9
雙膽拖 check: 2nd-ranked #6 Adj Place% 34.6% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #4, #6, #1 | 4.1% | $247 per $10 |
| 2 | #4, #6, #12 | 3.3% | $300 per $10 |
| 3 | #4, #6, #7 | 3.0% | $338 per $10 |
| 4 | #4, #1, #12 | 2.6% | $385 per $10 |
| 5 | #4, #1, #7 | 2.3% | $435 per $10 |
| 6 | #4, #12, #7 | 1.9% | $529 per $10 |
| 7 | #4, #6, #9 | 0.8% | $1229 per $10 |
| 8 | #4, #1, #9 | 0.6% | $1580 per $10 |
| 9 | #4, #12, #9 | 0.5% | $1923 per $10 |
| 10 | #4, #7, #9 | 0.5% | $2170 per $10 |

Estimated chance that the Strategy A ticket hits (sum of the 10 combos): about 20% on Adj Win%, or about 27% on raw MC. The SCMP adjustments push #9 down and spread win% to non-pool horses (#3, #5, #2), which lowers the Adj figure.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKET: 膽 #4 | 腳 #6, #1, #12, #7, #9
  4-6-1, 4-6-12, 4-6-7, 4-6-9, 4-1-12, 4-1-7, 4-1-9, 4-12-7, 4-12-9, 4-7-9
```

Value note: the banker is the favourite (3.2), so combos with #9 will pay "chalk-ish" dividends. Value sits in 4-6-x and 4-1-x with #12/#7 (both 18–20 odds). The 4-6 pair is MC's top quinella (11.6%, fair 8.6).

PASS CONDITIONS:
- If #4 SUPERB KING (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If going changes to Yielding/Soft or worse → re-run the MC.
- If #4 drifts beyond ~6 in late betting (market losing faith in the banker) → consider PASS.

CONFIDENCE: MEDIUM. The banker is strong (74% Adj place, Purton, gate 4, consistent placings, top MC rating). However, legs 3–5 come from a near-flat 23–24% cluster, and the 2nd favourite #8 is outside the pool.

CAVEATS:
- SCMP is partial. SCMP win odds match HKJC closely (#4 3.1 vs 3.2, #8 3.7 vs 3.9, #9 6.7 vs 6.7, #1 11 vs 10). SCMP "Place" odds are near or above win odds (e.g. #4 3.1/3.1), so they look mis-parsed. No Q/QP matrix was available, so the Q/QP cross-reference was not done.
- **Pool-miss risk from #8 GEORGIAN SIGMA** (2nd favourite, 3.9, frame in 5 of 6 recent runs). It misses Strategy A by 0.2% Adj Place% (23.5% vs 23.7%). If you want it covered, widen Strategy A to 膽 #4 + 6 legs (#6, #1, #12, #7, #9, #8) = 15 combos / $150 (est. hit ~29% on Adj). HV venue guidance favours wider pools, which supports this.
- The 23–24% Adj Place% cluster (#12, #7, #8, #3) is within MC noise. Leg selection among them depends on tie-breaks.
- #7 BRILLIANT TURN is a debutant (trials only). MC gives it a default/neutral rating (23.7% place), which is unreliable either way. It is a leg only, never the banker.
- #9 GOLDEN ACE has 1 start, a 98-day layoff and a recent vet abrasion (passed 19/09). It is included only because of Rule 9 (market 6.7).
- #6 BEAUTY SHOW carries an "Unacceptable performance" vet flag (passed 25/09) and is drawn 11 at HV 1,000m. It is still MC's clear #2.
- SCMP adjustment judgment calls: #10 "steadied" (caused by keenness) → 0; #1 win note not scored as +form; #5 blunder not scored as an excuse. None of these change the pool.
- Odds were captured at 11:01 HKT on 07-Oct. The HKJC pool will move before the jump.
- Historical sync was not re-run in this session (already done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #4 SUPERB KING (MC Win% 41.3%, MC Place% 72.2%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6 (36.6%), #12 (23.7%), #1 (23.7%), #7 (23.7%), #8 (23.5%), #3 (21.3%), #9 (20.4%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
  #12 MAPOGO (23.7%, 20), #7 BRILLIANT TURN (23.7%, 18), #3 COPPER CORE (21.3%, 28)
  (#1 GRAND NOVA is at exactly 10, not > 10; #8 3.9 and #9 6.7 are < 10)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
  (#5 VIGOR EYE 19.3% is at 15 odds; all other sub-20% horses are 20+)
Action: none (no candidates, so no replacements or additions)
Final legs: #6, #12, #1, #7, #8, #3, #9
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 (fixed)
TOTAL STAKE: $210

STRATEGY B TICKET: 膽 #4 | 腳 #6, #12, #1, #7, #8, #3, #9
  4-6-12, 4-6-1, 4-6-7, 4-6-8, 4-6-3, 4-6-9,
  4-12-1, 4-12-7, 4-12-8, 4-12-3, 4-12-9,
  4-1-7, 4-1-8, 4-1-3, 4-1-9,
  4-7-8, 4-7-3, 4-7-9,
  4-8-3, 4-8-9,
  4-3-9

Top combos (Harville, raw MC): 4-6-12 4.6% | 4-6-8 4.2% | 4-6-7 4.1% | 4-6-1 4.1% | 4-6-3 3.6% | 4-6-9 3.2%
Est. ticket hit chance (sum of 21 combos, raw MC): ~50%
```

Comparison: both strategies use the same banker (#4). Strategy B has 2 more legs (#8, #3) and costs $210 vs $100. The flat 20–24% MC place cluster puts 7 horses over the 20% line, and no Win-odds swaps apply. Strategy B covers the 2nd favourite #8, which Strategy A misses by 0.2%. Strategy A is cheaper but carries a higher pool-miss risk.

```
═══════════════════════════════════════════════════════════
```
