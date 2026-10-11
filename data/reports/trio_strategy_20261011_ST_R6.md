# Trio (單T) Strategy — Sha Tin 2026-10-11 Race 6

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-11 | Race 6
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, 12 jockey + 12 trainer profiles loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds look mis-parsed; only a 6-pair Q sample, no full Q/QP matrix)
ODDS SOURCE: HKJC pool (data/odds/odds_20261011_ST.json, R6 captured 11:23 HKT 11-Oct; same win odds used by analyze-race.ts)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R6 — Class 4 | 1200m | Turf | Good | 12 runners — THE POK OI CUP (HANDICAP)
CLASSIFICATION: Dominant (top Adj Win% 44.2% >= 35%) | POOL SIZE: 7
MODE: A: Tight Pool (5), expanded to 7 under Rule 8 (Adj Place% >= 20% must be in pool) and Rule 9 (negatively flagged horse at odds <= 15 not excluded)
BET STRUCTURE (A): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
BET STRUCTURE (B): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-11 | Going: Good | Surface: Turf
Target Race(s): R6 (Class 4 | 1200m | 12 runners)
Scratchings: none among the 12 declared runners (reserves HOLMES A COURT and MR INVINCIBLE are not in the field)
Odds coverage: 12 horses with odds (HKJC win and place)
SCMP data: ⚠️ partial
Form gaps: 9/12 horses enriched with form data.
  First-starters (no race form, trials only): #4 GLORY PATCH, #5 SASSPHIRE, #6 TELECOM FORTUNE. None is eligible as banker.
  #3 DRAGON SKY FORCE has 1 run in the historical data. SCMP says it also won at Conghua "six days ago", which is not in the data.
  #7 NOBLE SUPERIOR has 3 runs in the data.
  Layoffs: #2 GALLANT DESIGN last ran 27-Jun (106 days, >90). #9 HAPPY BRETHREN last ran 21-Jun (112 days, >90).
  #1 / #11 last ran 12-Jul (91 days).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 2 | GALLANT DESIGN | 40.2% | 73.4% | 4.4 | ✅ | ✅ | 4/2/3/3/5/7 | ★ 膽 (Banker) | 2-7: 16.3% (6.1) |
| 7 | NOBLE SUPERIOR | 17.4% | 49.6% | 5.5 | ✅ | ✅ | 2/11/9 | 腳 (Leg) | 2-7: 16.3% (6.1) |
| 6 | TELECOM FORTUNE | 9.7% | 34.1% | 31 | ✅ | ❌ | debut | 腳 (Leg) | 2-6: 9.3% (10.7) |
| 12 | LET'S HAVE FUN | 6.7% | 26.0% | 6.8 | ✅ | ✅ | 5/3/9/9/3/7 | 腳 (Leg) | 2-12: 7.0% (14.4) |
| 9 | HAPPY BRETHREN | 6.5% | 25.8% | 17 | ✅ | ❌ | 10/3/12/5/3/4 | — (replaced by #10) | 2-9: 6.3% (15.8) |
| 3 | DRAGON SKY FORCE | 6.4% | 25.5% | 5.0 | ✅ | ✅ | 4 | 腳 (Leg) | 2-3: 6.3% (15.9) |
| 4 | GLORY PATCH | 3.4% | 16.0% | 14 | ❌ | ❌ | debut | — | — |
| 8 | PARROT BLESSING | 3.3% | 15.5% | 16 | ❌ | ❌ | 7/7/14 | — | — |
| 10 | ENJOY GOLF | 2.3% | 12.1% | 8.3 | ❌ | ✅ | 9/2/5/3/1/4 | 腳 (Leg, replacement) | — (replacement candidate) |
| 5 | SASSPHIRE | 2.0% | 11.1% | 23 | ❌ | ❌ | debut | — | — |
| 11 | AMO ERGO SUM | 1.1% | 6.1% | 32 | ❌ | ❌ | 12/6/10/9/8/14 | — | — |
| 1 | STANLEY EXPRESS | 0.9% | 4.8% | 20 | ❌ | ❌ | 8/11/14/14/11/10 | — | — |

Market: overround 22.8%. MC agrees with the market favourite: #2 GALLANT DESIGN (4.4, Purton) is MC #1 at 40.2% win / 73.4% place, rating 65, and has the fastest projected time (1:09.68, 4.2L clear). The tool shows a 76% place edge on #2. MC's biggest disagreement is #6 TELECOM FORTUNE (31): the tool flags it "undervalued by 201%", but it is a first-starter with 0 form records, so its 34.1% place comes from rating and connections alone (see caveats). The market rates #3 DRAGON SKY FORCE (5.0, 2nd fav) and #10 ENJOY GOLF (8.3) much higher than MC does. MC says #10 is "overvalued by 81%". MC's top quinella is 2-7 (16.3%, fair 6.1).

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 2 | GALLANT DESIGN | 40.2% | 73.4% | trial +2, excuses +2 | trial +2, excuses +2 | 44.2% | 77.4% | 4.4 | Z Purton | 12 | 133 | Stalk / wide | +trial, +excuses | ★ 膽 (Banker) |
| 2 | 7 | NOBLE SUPERIOR | 17.4% | 49.6% | 0 | 0 | 17.4% | 49.6% | 5.5 | M L Yeung | 4 | 129 | Front | — | 腳 (Leg) |
| 3 | 3 | DRAGON SKY FORCE | 6.4% | 25.5% | trial +2, excuses +2 | trial +2, excuses +2 | 10.4% | 29.5% | 5.0 | M Chadwick | 3 | 131 | Midfield / closer | +trial, +excuses | 腳 (Leg) |
| 4 | 6 | TELECOM FORTUNE | 9.7% | 34.1% | 0 | 0 | 9.7% | 34.1% | 31 | J Orman | 2 | 131 | — (debut) | — | 腳 (Leg) |
| 5 | 12 | LET'S HAVE FUN | 6.7% | 26.0% | excuses +2 | excuses +2 | 8.7% | 28.0% | 6.8 | M F Poon | 5 | 119 | Closer | +excuses | 腳 (Leg) |
| 6 | 9 | HAPPY BRETHREN | 6.5% | 25.8% | excuses +2 | excuses +2 | 8.5% | 27.8% | 17 | C Y Ho | 10 | 126 | On-pace | +excuses | 腳 (Leg) |
| 7 | 4 | GLORY PATCH | 3.4% | 16.0% | 0 | 0 | 3.4% | 16.0% | 14 | A Atzeni | 11 | 131 | — (debut) | — | — |
| 8 | 8 | PARROT BLESSING | 3.3% | 15.5% | 0 | 0 | 3.3% | 15.5% | 16 | H T Mo (-2) | 6 | 127 | — | — | — |
| 9 | 11 | AMO ERGO SUM | 1.1% | 6.1% | excuses +2 | excuses +2 | 3.1% | 8.1% | 32 | K Teetan | 1 | 119 | Handy | +excuses | — |
| 10 | 5 | SASSPHIRE | 2.0% | 11.1% | 0 | 0 | 2.0% | 11.1% | 23 | L Hewitson | 9 | 131 | — (debut) | — | — |
| 11 | 1 | STANLEY EXPRESS | 0.9% | 4.8% | 0 | 0 | 0.9% | 4.8% | 20 | B Avdulla | 7 | 135 | — | — | — |
| 12 | 10 | ENJOY GOLF | 2.3% | 12.1% | -injury30d −3 | -injury30d −4 | 0.0% | 8.1% | 8.3 | H Bentley | 8 | 125 | Front | -injury30d | 腳 (Leg, Rule 9) |

Factor labels: trial +2, excuses +2 (steadied / hampered / wide without cover / crowded), -injury30d −3 win / −4 place. Caps are ±8 win / ±10 place, and none were reached. #10 Adj Win% was floored at 0%. Banker eligibility: #2 has 7 recorded starts, so it is eligible.

SCMP adjustments applied:
- **#2 GALLANT DESIGN**: Star Form "Has trialled well", so trial +2. Last start was "a ground-covering fourth from gate 14", and TIR (Race 811) says it "jumped only fairly and then was hampered when bumped", so excuses +2. That is a single jumping note, so no -barrier.
- **#3 DRAGON SKY FORCE**: Trackwork "looked to be moving better than before when taking a Conghua turf trial", so trial +2. TIR (Race 819) "Near the 250M was steadied and shifted out to continue into clear running", so excuses +2. It was also "fractious in the barriers" and shifted out at the start in the same race, but has since passed a stalls test. That is one race, so no -barrier. The Conghua win "six days ago" is a win only, so no +form (same convention as earlier reports).
- **#12 LET'S HAVE FUN**: TIR (Race 049) "Near the 400M was steadied and shifted in to obtain clear running", so excuses +2.
- **#9 HAPPY BRETHREN**: TIR (Race 787) "Disadvantaged by racing wide and without cover for majority of event", so excuses +2 (wide trip).
- **#11 AMO ERGO SUM**: TIR (Race 853) "Shortly after start was badly crowded and became unbalanced", so excuses +2.
- **#10 ENJOY GOLF**: Vet "13/09/2026 Substantial blood in trachea noted on post-race scoping (passed on 29/09/2026)". That is 12 days before the race (< 30), so -injury30d −3 win / −4 place.
- **#7 NOBLE SUPERIOR**: "Resumed a front-running second at $36" identifies a front-runner but has no scoring keyword, so 0.
- **#8 PARROT BLESSING**: "Niggled along to win a recent dirt trial" means it had to be pushed along, which does not match "travelled well / looks ready", so 0. TIR "shifted out at start and was bumped" is a single note, so 0.
- **#1 STANLEY EXPRESS**: the blood in its trachea was on its local debut long ago, not recent, so 0.
- **#4, #5, #6** (first-starters): trial comments only ("hard-ridden fourth", "mixed results", "kept on for thirds in two of six trials"). None has a scoring keyword, so 0.

Reasoning: #2 GALLANT DESIGN is clear on every measure. It is MC #1 (40.2% win, rating 65, 5-point gap to the next horse), the market favourite, and has Purton (21% strike rate in the data). It has placed 4 times from 7 starts, including a 2nd over this C&D, has positive trial and excuse notes, and has the fastest projected time by 0.7s. At Adj Win% 44.2% the race is **Dominant → Mode A**. Mode A's 5-horse pool (banker + top 4 by Adj Place%: #7 49.6, #6 34.1, #3 29.5, #12 28.0) has to grow, because:
  (a) **Rule 8 / must-include**: #9 HAPPY BRETHREN has Adj Place% 27.8% (≥ 25% and ≥ 20%), so it must be in the pool (same convention as R3 today).
  (b) **Rule 9**: #10 ENJOY GOLF has a negative flag (-injury30d), but it is 8.3 in the market (5th favourite, ≤ 15), so it cannot be excluded. The market already knows about the bleed and still makes it a top-5 chance.
That gives a 7-horse pool, the maximum. No other horse reaches 20% (the next best are #4 16.0% and #8 15.5%). #4 GLORY PATCH at 14 has no negative flag, so Rule 9 does not apply to it. Pace: #7 (gate 4) and #10 (gate 8) are front-runners, and #9 races handy. #2 from gate 12 is likely to race wide or settle back. Closers #12 and #3 suit a genuine tempo.

## TRIO POOL (Strategy A, any order)

```
POOL: #2, #7, #3, #6, #12, #9, #10
MODE: A (Dominant, #2 Adj Win% 44.2% ≥ 35%), expanded 5 → 7 under Rules 8 and 9 | POOL SIZE: 7
  Banker + top 4 by Adj Place%: #2 (77.4), #7 (49.6), #6 (34.1), #3 (29.5), #12 (28.0)
  + Must-include (Adj Place% ≥ 20%): #9 (27.8)
  + Rule 9 (negative flag, odds ≤ 15): #10 (8.3)

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #2 GALLANT DESIGN (Adj Win% 44.2%, Adj Place% 77.4%) ← locked in every combo
腳 (Legs):  #7, #3, #6, #12, #9, #10
雙膽拖 check: 2nd-ranked #7 Adj Place% 49.6% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #2, #7, #3 | 8.5% | $118 per $10 |
| 2 | #2, #7, #6 | 7.9% | $127 per $10 |
| 3 | #2, #7, #12 | 7.0% | $143 per $10 |
| 4 | #2, #7, #9 | 6.8% | $147 per $10 |
| 5 | #2, #6, #3 | 4.3% | $233 per $10 |
| 6 | #2, #3, #12 | 3.8% | $262 per $10 |
| 7 | #2, #3, #9 | 3.7% | $269 per $10 |
| 8 | #2, #6, #12 | 3.5% | $284 per $10 |
| 9 | #2, #6, #9 | 3.4% | $291 per $10 |
| 10 | #2, #12, #9 | 3.0% | $328 per $10 |

The 5 combos that include #10 score 0% on Adj Win% (floored), or 0.7–2.3% each on raw MC.
Estimated chance that the Strategy A ticket hits (sum of 15 combos): about 52% on Adj Win%, or about 54% on raw MC.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

TICKET: 膽 #2 | 腳 #7, #3, #6, #12, #9, #10
  2-7-3, 2-7-6, 2-7-12, 2-7-9, 2-7-10, 2-3-6, 2-3-12, 2-3-9, 2-3-10,
  2-6-12, 2-6-9, 2-6-10, 2-12-9, 2-12-10, 2-9-10

TOP COMBINATIONS (highest value):
  2-7-3 (8.5%), 2-7-6 (7.9%), 2-7-12 (7.0%), 2-7-9 (6.8%), 2-6-3 (4.3%)
```

Value note: the banker is a short favourite (4.4), so 2-7-3 (the three shortest in the market: 4.4 / 5.5 / 5.0) will pay low. The value is in combos with #6 TELECOM FORTUNE (31) or #9 HAPPY BRETHREN (17). The SCMP Q sample shows 2-3 at 9, which is close to MC fair odds (15.9 for the 2-3 quinella), so there is no clear Q-pool overlay on that pair. The 2-7 Q odds were not captured.

PASS CONDITIONS:
- If #2 GALLANT DESIGN (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going changes to Yielding / Soft or worse → re-run the MC (draw 12 becomes a bigger concern, and front-runner bias changes).
- If #2 drifts beyond ~8 in late betting (market losing faith in the banker) → consider PASS.

CONFIDENCE: MEDIUM-HIGH. The banker is the strongest in any race so far today on raw MC (73.4% place). It has a clear rating gap, the top jockey, a C&D placing and trial plus excuse notes. The risks are gate 12 of 12, a 106-day layoff, and top weight 133 among the main chances. The leg group is soft: a first-starter (#6), a horse returning from a bleed (#10), and four horses in a tight 26–30% place band.

CAVEATS:
- SCMP is partial. SCMP win odds broadly match HKJC (#2 4.7 vs 4.4, #3 5 vs 5, #7 5.3 vs 5.5, #12 8 vs 6.8, #10 7.2 vs 8.3; #8 13 vs 16, #1 27 vs 20). SCMP "Place" odds are near or above win odds (e.g. #1 27/23), so they look mis-parsed. Only a 6-pair Q sample was shown (1-2 20, 1-3 28, 1-4 62, 2-3 9, 2-4 33, 3-4 11), and the extractor reported Q and QP values as identical, so a full Q/QP cross-reference was not possible.
- #6 TELECOM FORTUNE is a first-starter (trials only) with 0 form records in the data. Its MC 34.1% place (MC #3) and the "undervalued by 201%" flag come from rating, jockey and trainer (P C Ng 18%) priors, not race form. The market has it at 31. It is in both pools on MC numbers, as the skill requires (no narrative exclusion), but treat it as the weakest-evidence leg.
- #3 DRAGON SKY FORCE (5.0, 2nd favourite) has only 1 run in the historical data. SCMP reports a recent Conghua win that MC did not see, so MC (25.5% place) likely underrates it.
- #10 ENJOY GOLF had substantial blood in its trachea on 13-Sep and was passed on 29-Sep, 12 days ago. It is in Strategy A only because of Rule 9 (odds 8.3 ≤ 15), and in Strategy B through the Win-odds swap.
- The banker #2 is drawn 12 of 12 and has been off 106 days. Gate penalties are reducers only, and SCMP says it "has trialled well".
- Judgment calls on SCMP adjustments: #2 "has trialled well" scored as trial +2. #8 "niggled along to win a trial" not scored. #3's Conghua win not scored as +form. None of these change the pool.
- Odds were captured at 11:23 HKT on 11-Oct. The HKJC pool will move before the off.
- Historical sync was not re-run in this session (already done per instruction). analyze-race.ts saved its enriched race card to data/racecards/racecard_20261011_ST_R6.json as a normal tool side effect.
```

## STRATEGY B (MC-only)

```
Banker: #2 GALLANT DESIGN (MC Win% 40.2%, MC Place% 73.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #7 (49.6%), #6 (34.1%), #12 (26.0%), #9 (25.8%), #3 (25.5%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #9 HAPPY BRETHREN (MC Place% 25.8%, Win odds 17)
  (#12 26.0% is 6.8 and #3 25.5% is 5.0, so neither is replaceable. #6 is 34.1%, above 30%)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #10 ENJOY GOLF (Win odds 8.3, MC Place% 12.1%)
Action: #10 replaced #9 (1-for-1 swap; #9 was the lowest MC Place% among the replaceable legs, and the only one)
Final legs: #7, #6, #12, #3, #10
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #2 | 腳 #7, #6, #12, #3, #10
  2-7-6, 2-7-12, 2-7-3, 2-7-10, 2-6-12, 2-6-3, 2-6-10, 2-12-3, 2-12-10, 2-3-10

Top combos (Harville, raw MC): 2-7-6 10.6% | 2-7-12 7.0% | 2-7-3 6.7% | 2-6-12 3.5% | 2-6-3 3.3% | 2-7-10 2.3%
Est. ticket hit chance (sum of 10 combos, raw MC): ~38%
```

Comparison: both strategies use the same banker (#2) and share legs #7, #6, #12, #3 and #10. Strategy A also keeps #9 HAPPY BRETHREN (Adj Place% 27.8% after the wide-trip excuse, a must-include), so it is 15 combos / $150. Strategy B swaps #9 out for the market-backed #10 (8.3), so it is 10 combos / $100. Strategy A covers about 54% on raw MC, against about 38% for Strategy B. The 5 extra combos (all with #9) add about 15 points of hit chance for $50.

```
═══════════════════════════════════════════════════════════
```
