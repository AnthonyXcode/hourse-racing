# Trio (單T) Strategy — Happy Valley 2026-10-07 Race 7

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-07 | Race 7
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey + trainer stats loaded) | Going: Good to Firm | Scratchings: none confirmed by HKJC (see caveat on #1)
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork loaded; SCMP Win/Place columns look mis-parsed; Q/QP matrix not extractable)
ODDS SOURCE: HKJC pool, live win odds pulled by analyze-race.ts (~11:15 HKT 07-Oct). Place odds were estimated from win odds by the tool.
             Meeting file data/odds/odds_20261007_HV.json (11:01 HKT) is close: #2 5.8, #5 4.3, #11 4.2, #6 18, #8 20; all other horses are the same.
             SCMP odds: ⚠️ mis-parsed (not used) | HKJC live: ✅ loaded

RACE: R7 — Class 3 | 1200m | Turf ("C+3" course) | Good to Firm | 12 runners — YIP FAT HANDICAP
CLASSIFICATION: Dominant (top Adj Win% 40.6%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-07 | Going: Good to Firm (SCMP header says "Good") | Surface: Turf
Target Race(s): R7 (Class 3 | 1200m | 12 runners)
Scratchings: none on the HKJC racecard or in the HKJC win pool. SCMP's TIR line for #1 AURORA LADY reads "withdrawn on
             raceday morning by order of the Stewards on vet's advice (lame left fore)". This appears to be a historical
             stewards' entry (it ties to the 06/01/2026 failed vet exam), because #1 is still trading at 18 in the HKJC pool. See caveats.
             Reserves: EMBRACES, LEADING AGILITY.
Odds coverage: 12 horses with odds (HKJC win; place estimated by the tool)
SCMP data: ⚠️ partial
Form gaps: #1 AURORA LADY last raced 30-Nov-2025 (311 days, layoff >90; fetlock surgery, vet passed 24/08/2026).
           #4 LUCKY PLANET last raced 13-Jun (116 days). #10 QUANTUM CLOUD has only 3 starts (off since 01-Jul, 98 days).
           #5 TARGET AUDIENCE last raced 08-Jul (91 days; resumes off a dirt trial).
           Banker #9 BRIGHT DAY has 10+ starts (eligible).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 9 | BRIGHT DAY | 38.6% | 74.1% | 10 | ✅ | ❌ | 1/4/7/1/4/5 | ★ 膽 (Banker) | 2-9: 17.2% (5.8) |
| 2 | FLYING WROTE | 18.9% | 53.1% | 5.4 | ✅ | ✅ | 4/9/2/1/2/5 | 腳 (Leg) | 2-9: 17.2% (5.8) |
| 12 | YOUNG ARROW | 14.0% | 45.9% | 16 | ✅ | ❌ | 1/3/5/3/3/7 | 腳 (Leg) | 9-12: 13.4% (7.5) |
| 5 | TARGET AUDIENCE | 10.6% | 37.6% | 4.4 | ✅ | ✅ | 2/1/5/5/1/5 | 腳 (Leg) | 5-9: 10.2% (9.8) |
| 6 | POWER KOEPP | 5.1% | 22.1% | 19 | ✅ | ❌ | 8/5/4/1/6/6 | — (replaced by #11) | 6-9: 5.2% (19.3) |
| 7 | SAVVY BRILLIANT | 3.4% | 17.0% | 16 | ❌ | ❌ | 5/6/8/9/7/14 | — | — |
| 3 | JUBILANT WINNER | 3.1% | 14.5% | 17 | ❌ | ❌ | 5/9/5/10/1/4 | — | — |
| 8 | MATTERS MOST | 2.8% | 14.6% | 21 | ❌ | ❌ | 4/10/6/7/2/9 | — | — |
| 11 | DARYL FLASH | 1.8% | 10.0% | 4.4 | ❌ | ✅ | 2/8/6/13/8/8 | 腳 (Leg) — replaced #6 | — (replacement candidate) |
| 4 | LUCKY PLANET | 1.0% | 6.0% | 16 | ❌ | ❌ | 12/7/12/6/1/2 | — | — |
| 10 | QUANTUM CLOUD | 0.4% | 3.3% | 11 | ❌ | ❌ | 4/8/4 | — | — |
| 1 | AURORA LADY | 0.2% | 1.6% | 18 | ❌ | ❌ | 11/12/3/4/6/6 | — | — |

Market: overround 23.3%. MC strongly prefers #9 BRIGHT DAY (10.0 in the market, 38.6% / 74.1% from MC, "undervalued by 286%") and #12 YOUNG ARROW (16, "undervalued by 124%"). The market's co-favourites are #5 TARGET AUDIENCE (4.4; MC 10.6%) and #11 DARYL FLASH (4.4; MC only 1.8% / 10.0%). #2 FLYING WROTE (5.4) is fairly priced by MC (value 1.02). The tool's own bets are Place #9 and Place #12. The MC finish-time projection has #12 (1:08.92), #2 (+0.14s) and #9 (+0.28s) clustered at the front.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 9 | BRIGHT DAY | 38.6% | 74.1% | excuses +2 | excuses +2 | 40.6% | 76.1% | 10 | K C Leung | 1 | 119 | Stalk/On-pace | +excuses | ★ 膽 (Banker) |
| 2 | 2 | FLYING WROTE | 18.9% | 53.1% | excuses +2 | excuses +2 | 20.9% | 55.1% | 5.4 | H Y Yuen (-7) | 5 | 130 | Midfield | +excuses | 腳 (Leg) |
| 3 | 12 | YOUNG ARROW | 14.0% | 45.9% | excuses +2 | excuses +2 | 16.0% | 47.9% | 16 | M Chadwick | 8 | 117 | Midfield (keen) | +excuses | 腳 (Leg) |
| 4 | 5 | TARGET AUDIENCE | 10.6% | 37.6% | trial +2, +form +1, excuses +2 | trial +2, +form +1, excuses +2 | 15.6% | 42.6% | 4.4 | A Badel | 7 | 128 | Front | +trial, +form, +excuses | 腳 (Leg) |
| 5 | 7 | SAVVY BRILLIANT | 3.4% | 17.0% | +form +1, excuses +2 | +form +1, excuses +2 | 6.4% | 20.0% | 16 | A Atzeni | 10 | 121 | Midfield/Back | +form, +excuses | — |
| 6 | 3 | JUBILANT WINNER | 3.1% | 14.5% | +form +1 | +form +1 | 4.1% | 15.5% | 17 | P N Wong (-7) | 4 | 129 | Front | +form | — |
| 7 | 8 | MATTERS MOST | 2.8% | 14.6% | +form +1 | +form +1 | 3.8% | 15.6% | 21 | E C W Wong (-3) | 12 | 120 | Front | +form | — |
| 8 | 6 | POWER KOEPP | 5.1% | 22.1% | -age −2 | -age −2 | 3.1% | 20.1% | 19 | L Ferraris | 11 | 123 | Midfield | -age | 腳 (Leg) |
| 9 | 10 | QUANTUM CLOUD | 0.4% | 3.3% | excuses +2 | excuses +2 | 2.4% | 5.3% | 11 | L Hewitson | 2 | 118 | Closer | +excuses | — |
| 10 | 11 | DARYL FLASH | 1.8% | 10.0% | 0 | 0 | 1.8% | 10.0% | 4.4 | Y L Chung (-2) | 6 | 117 | — | — | — |
| 11 | 1 | AURORA LADY | 0.2% | 1.6% | 0 | 0 | 0.2% | 1.6% | 18 | M L Yeung | 9 | 135 | — | (withdrawal history) | — |
| 12 | 4 | LUCKY PLANET | 1.0% | 6.0% | -perf −2 | -perf −2 | 0.0% (floored) | 4.0% | 16 | M F Poon | 3 | 129 | Front | -perf | — |

Factor labels: excuses +2 (steadied/crowded/held up/wide trip), trial +2 (positive trial), +form +1 (made all/improved), -age −2 (8yo in C3+), -perf −2 (unacceptable performance). Caps are ±8 win / ±10 place, and none were reached. Following the R6 convention, factors are mirrored on Place%. Banker eligibility: #9 has 10+ starts, so it is eligible.

SCMP adjustments applied:
- **#9 BRIGHT DAY**: TIR "Near the 50M rider dropped his right rein. Raced wide and without cover for the majority", so excuses +2 (wide trip). Star Form "Built on a second… with a win three runs later" is positive but has no scoring keyword. No vet/trackwork notes. Age 7.
- **#2 FLYING WROTE**: TIR "Approaching the 200M had difficulty obtaining clear running", so excuses +2.
- **#12 YOUNG ARROW**: TIR "raced keenly… Near the 550M got its head up when steadied", so excuses +2 (steadied).
- **#5 TARGET AUDIENCE**: Trackwork "Made giant late strides into third… in his latest Sha Tin dirt trial" gives trial +2. This is a judgment call because the wording isn't a literal "travelled well/looks ready". Star Form "Made all" gives +form +1. TIR "checked when crowded… steadied" gives excuses +2. Total +5.
- **#7 SAVVY BRILLIANT**: Star Form "improved sixth… three luckless runs" gives +form +1. TIR "steadied… bumped" gives excuses +2. "Jumped only fairly" appears once, so there is no -barrier flag.
- **#3 JUBILANT WINNER**: "making all at the Valley in April", so +form +1.
- **#8 MATTERS MOST**: "Made all in November", so +form +1.
- **#6 POWER KOEPP**: 8yo (HKJC racecard) in a Class 3, so -age −2. SCMP lists no vet note, so this is a judgment call. Without it #6 stays at 5.1% / 22.1% and still takes the 5th pool slot. TIR "slow to begin" appears once, so there is no -barrier flag.
- **#10 QUANTUM CLOUD**: TIR "Bumped… raced wide and without cover", so excuses +2.
- **#4 LUCKY PLANET**: Vet "13/06/2026 Unacceptable performance (passed 18/09/2026)" covers its last run, so -perf −2 (Win floored at 0). The January wire-to-wire win is too old for +form.
- **#11 DARYL FLASH**: "went OK in back-to-back Valley 1,200m runs" has no keyword, so 0.
- **#1 AURORA LADY**: Vet fetlock surgery passed 24/08/2026, 44 days ago (>30), so no -injury30d. 0.

Reasoning: #9 BRIGHT DAY is clear MC #1 (38.6% win / 74.1% place, rating 75 vs 69 for the next). It is drawn 1 with a light 119 lb and is coming off a 1st and a 4th. It won at HV 1,200m three runs after a 2nd at the trip, and its last run had excuses (wide, no cover). At Adj Win% 40.6% the race is Dominant, so Mode A applies: banker plus the 4 best by Adj Place% (#2 55.1, #12 47.9, #5 42.6, #6 20.1). Every horse with Adj Place% ≥ 25% (#9, #2, #12, #5) is in the pool. The 5th slot is razor-thin: #6 20.1% vs #7 20.0%. Pace: HV 1,200m favours on-pace runners. Likely leaders are #5 TARGET AUDIENCE, #3 JUBILANT WINNER, #4 LUCKY PLANET and #8 MATTERS MOST. #9 from gate 1 should get the rail run/box seat. #2 races midfield and needs luck, and #12 is keen and wants cover.

## TRIO POOL (Strategy A, any order)

```
POOL: #9, #2, #12, #5, #6
MODE: A (Dominant, #9 Adj Win% 40.6% ≥ 35%) | POOL SIZE: 5
  Mode A = banker + 4 by Adj Place% (#2 55.1, #12 47.9, #5 42.6, #6 20.1)
  Must-include (Adj Place% ≥ 25%): #9, #2, #12, #5 — all in pool

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #9 BRIGHT DAY (Adj Win% 40.6%, Adj Place% 76.1%) ← locked in every combo
腳 (Legs):  #2, #12, #5, #6
雙膽拖 check: 2nd-ranked #2 Adj Place% 55.1% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #9, #2, #12 | 13.3% | $75 per $10 |
| 2 | #9, #2, #5 | 12.9% | $78 per $10 |
| 3 | #9, #12, #5 | 9.2% | $108 per $10 |
| 4 | #9, #2, #6 | 2.2% | $445 per $10 |
| 5 | #9, #12, #6 | 1.6% | $622 per $10 |
| 6 | #9, #5, #6 | 1.6% | $641 per $10 |

Estimated chance that the Strategy A ticket hits (sum of the 6 combos): about 41% (raw MC Harville: about 49%).

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 6 (膽拖: C(4,2), 4 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

TICKET: 膽 #9 | 腳 #2, #12, #5, #6
  9-2-12, 9-2-5, 9-12-5, 9-2-6, 9-12-6, 9-5-6
```

Value note: the banker is the 4th choice at 10.0, not the favourite, so even the "chalky" combos (9-2-5 with the 5.4 and 4.4 shots) should pay above a favourite-anchored Trio. 9-2-12 matches MC's top two quinella pairs (2-9 17.2%, 9-12 13.4%), and #12 is 16 in the market, so that combo is the value play.

PASS CONDITIONS:
- If #9 BRIGHT DAY (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If #1 AURORA LADY is confirmed scratched → no change (not in any pool; MC 0.2%).
- If going changes to Yielding/Soft or worse → re-run the MC.
- If #9 firms below ~4 in late betting → the ticket still holds, but dividends shrink. Consider whether the $60 is still worth it.

CONFIDENCE: MEDIUM-HIGH. The banker is a clear MC standout (74% place) with gate 1 and an excuse last start, but MC and the market disagree sharply on it (10.0 vs MC fair ~2.6). HV 1,200m Class 3 is upset-prone, and a 5-horse pool is tight for the Valley.

CAVEATS:
- SCMP is partial. The SCMP "Win/Place" columns (e.g. #1 21/17, #5 3.9/4.3, #11 4.8/4.2) have place > win in several rows and look mis-parsed, so they were not used. The Q/QP matrix could not be extracted, so the Q/QP cross-reference was not done.
- **#1 AURORA LADY scratching conflict**: SCMP shows "withdrawn on raceday morning by order of the Stewards on vet's advice (lame left fore)". The HKJC racecard lists no scratching, and the HKJC win pool still quotes #1 at 18. This is treated as a historical stewards' note. Either way it does not affect either ticket.
- **Model vs market conflict**: co-favourite #11 DARYL FLASH (4.4) has MC 1.8% / 10.0% and is outside the Strategy A pool. Rule 9 prevents hard exclusion but does not force inclusion. If #11 places, Strategy A misses, but Strategy B covers it. The market also rates #9 much lower (10.0) than MC does.
- Strategy A's 5th slot is a coin flip: #6 POWER KOEPP 20.1% vs #7 SAVVY BRILLIANT 20.0% Adj Place%. Rule 8's "≥20% must be in pool" would technically include #7 too. This report follows the R6 convention (Mode A size, ≥25% must-include). Adding #7 would make it 1膽+5腳 = 10 combos / $100.
- Venue guidance says HV races favour wider pools (Mode B/C). Mode A was used because the classification rule (Adj Win% ≥ 35%) is explicit.
- Judgment calls: #5 trial +2 (wording not a literal keyword match) and #6 -age −2 (age from the HKJC card, not an SCMP vet note). Neither changes the pool.
- Going: HKJC/MC uses Good to Firm, while the SCMP header shows "Good". The difference is minor.
- Odds were captured around 11:00–11:15 HKT on 07-Oct, many hours before the race. The pool will move.
- Historical sync and the meeting odds fetch were not re-run in this session (already done per instruction). analyze-race.ts saved the enriched racecard to data/racecards/racecard_20261007_HV_R7.json.
```

## STRATEGY B (MC-only)

```
Banker: #9 BRIGHT DAY (MC Win% 38.6%, MC Place% 74.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #2 (53.1%), #12 (45.9%), #5 (37.6%), #6 (22.1%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
  #6 POWER KOEPP (22.1%, Win odds 19)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10):
  #11 DARYL FLASH (Win odds 4.4, MC Place% 10.0%)
Action: #11 replaced #6 POWER KOEPP (the only replaceable leg)
Final legs: #2, #12, #5, #11
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

STRATEGY B TICKET: 膽 #9 | 腳 #2, #12, #5, #11
  9-2-12 (16.6%), 9-2-5 (12.0%), 9-12-5 (8.2%), 9-2-11 (1.8%), 9-12-11 (1.3%), 9-5-11 (0.9%)
  Est. hit chance (Harville, raw MC): about 41%
```

Comparison: both strategies use the same banker (#9), the same cost (6 combos, $60) and share three legs (#2, #12, #5). The only difference is the 4th leg: Strategy A takes #6 POWER KOEPP (MC 22.1% place, 19 odds), while Strategy B swaps in co-favourite #11 DARYL FLASH (MC 10.0% place, 4.4 odds). Strategy B covers the market's view of #11, and Strategy A trusts the model.

═══════════════════════════════════════════════════════════
