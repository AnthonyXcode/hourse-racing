# Trio (單T) Strategy — Sha Tin 2026-10-11 Race 7

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-11 | Race 7
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, 14 jockey + 14 trainer profiles loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds look mis-parsed; Q/QP matrix values look unreliable)
ODDS SOURCE: HKJC pool (data/odds/odds_20261011_ST.json, R7 captured 11:23 HKT 11-Oct; same win odds used by analyze-race.ts)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R7 — Class 4 | 1400m | Turf | Good | 14 runners — NAM SANG WAI HANDICAP
CLASSIFICATION: Dominant (top Adj Win% 43.4% >= 35%) | POOL SIZE: 7
MODE: A: Tight Pool (5), expanded to 7 under Rule 9 (negatively flagged horses at odds <= 15 not excluded)
BET STRUCTURE (A): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
BET STRUCTURE (B): 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-11 | Going: Good | Surface: Turf
Target Race(s): R7 (Class 4 | 1400m | 14 runners)
Scratchings: none among the 14 declared runners (reserve EXCELLENCE VALUE is not in the field)
Odds coverage: 14 horses with odds (HKJC win and place)
SCMP data: ⚠️ partial
Form gaps: 14/14 horses enriched with form data.
  Sparse form (<3 runs in data): #6 CAVA PIONEER (1 run), #9 STUNNING BUNDLE (2), #11 DAILY FUN (2).
  Layoffs >90 days: #4 ONE MORE last ran 31-May (133 days; withdrawn lame at the start on 04-Jul).
    #10 TIN FOOK last ran 04-Jul (99 days).
  The scraper log printed "distance=1200m" while parsing, but the saved race card, the MC run and SCMP all say 1400m. 1400m is used.
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 3 | ABSOLUTE AWAKENED | 42.4% | 76.4% | 4.6 | ✅ | ✅ | 1/7/6/7/10/5 | ★ 膽 (Banker) | 3-5: 19.2% (5.2) |
| 5 | STORM MIRROR | 18.7% | 55.0% | 8.3 | ✅ | ✅ | 11/2/3/7 | 腳 (Leg) | 3-5: 19.2% (5.2) |
| 6 | CAVA PIONEER | 18.1% | 52.9% | 5.4 | ✅ | ✅ | 7 | 腳 (Leg) | 3-6: 18.6% (5.4) |
| 2 | LUNAR DASH | 6.1% | 26.0% | 32 | ✅ | ❌ | 11/3/11/7/13/7 | — (replaced by #14) | 2-3: 6.7% (15.0) |
| 9 | STUNNING BUNDLE | 3.9% | 18.9% | 11 | ❌ | ❌ | 12/3 | — | 3-9: 4.8% (20.7) |
| 14 | GOOD LUCK BABE | 2.7% | 15.3% | 7.0 | ❌ | ✅ | 4/3/4/12/10/12 | 腳 (Leg, replacement) | — (replacement candidate) |
| 11 | DAILY FUN | 1.8% | 11.4% | 39 | ❌ | ❌ | 8/10 | — | — |
| 10 | TIN FOOK | 1.7% | 10.9% | 7.4 | ❌ | ✅ | 12/5/4/11/3/12 | 腳 (Leg, added) | — (replacement candidate) |
| 12 | FLUORESCENCE | 1.4% | 9.8% | 64 | ❌ | ❌ | 10/9/11/7/14/12 | — | — |
| 8 | M M CONCORD | 1.4% | 9.4% | 20 | ❌ | ❌ | 9/6/4/12/5/8 | — | — |
| 13 | SOO KOO | 0.7% | 4.5% | 67 | ❌ | ❌ | 11/11/11 | — | — |
| 7 | TYCOON EXPRESS | 0.6% | 4.8% | 23 | ❌ | ❌ | 8/12/10/5/6 | — | — |
| 4 | ONE MORE | 0.3% | 2.6% | 15 | ❌ | ❌ | 11/9/9/6/5/3 | — | — |
| 1 | HAPPY TERCENTENARY | 0.2% | 2.1% | 11 | ❌ | ❌ | 8/10/12/13 | — | — |

Market: overround 23.6%. MC agrees with the market favourite. #3 ABSOLUTE AWAKENED (4.6) is MC #1 at 42.4% win / 76.4% place. It has rating 70, a 5-point gap to the next horse, and the tool shows a 104% place edge on it. MC rates #5 STORM MIRROR (8.3, 5th fav) about level with #6 CAVA PIONEER (5.4, 2nd fav), and is far stronger than the market on #2 LUNAR DASH (32, "undervalued by 100%"). The tool projects #2 as the fastest horse (1:21.92). The market rates #14 GOOD LUCK BABE (7.0, 3rd fav) and #10 TIN FOOK (7.4, 4th fav) far above MC (15.3% and 10.9% place). #1 HAPPY TERCENTENARY (11) is flagged "overvalued by 97%". MC's top quinellas are 3-5 (19.2%) and 3-6 (18.6%).

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 3 | ABSOLUTE AWAKENED | 42.4% | 76.4% | +form +1 | +form +1 | 43.4% | 77.4% | 4.6 | K C Leung | 2 | 130 | Closer (from behind midfield) | +form | ★ 膽 (Banker) |
| 2 | 5 | STORM MIRROR | 18.7% | 55.0% | 0 | 0 | 18.7% | 55.0% | 8.3 | C Y Ho | 5 | 130 | On-pace / handy | — | 腳 (Leg) |
| 3 | 6 | CAVA PIONEER | 18.1% | 52.9% | 0 | 0 | 18.1% | 52.9% | 5.4 | Z Purton | 7 | 129 | Closer (rear on debut) | — | 腳 (Leg) |
| 4 | 2 | LUNAR DASH | 6.1% | 26.0% | excuses +2 | excuses +2 | 8.1% | 28.0% | 32 | K Teetan | 14 | 134 | Stalker | +excuses | 腳 (Leg) |
| 5 | 8 | M M CONCORD | 1.4% | 9.4% | excuses +2 | excuses +2 | 3.4% | 11.4% | 20 | M Chadwick | 13 | 129 | Front | +excuses | — |
| 6 | 14 | GOOD LUCK BABE | 2.7% | 15.3% | 0 | 0 | 2.7% | 15.3% | 7.0 | C L Chau (-2) | 10 | 123 | — | — | 腳 (Leg) |
| 7 | 13 | SOO KOO | 0.7% | 4.5% | excuses +2 | excuses +2 | 2.7% | 6.5% | 67 | M L Yeung | 6 | 124 | Midfield | +excuses | — |
| 8 | 7 | TYCOON EXPRESS | 0.6% | 4.8% | excuses +2 | excuses +2 | 2.6% | 6.8% | 23 | H Bentley | 11 | 119 | — | +excuses | — |
| 9 | 11 | DAILY FUN | 1.8% | 11.4% | 0 | 0 | 1.8% | 11.4% | 39 | L Ferraris | 9 | 126 | Prominent | — | — |
| 10 | 12 | FLUORESCENCE | 1.4% | 9.8% | 0 | 0 | 1.4% | 9.8% | 64 | E C W Wong (-3) | 8 | 124 | Prominent | — | — |
| 11 | 9 | STUNNING BUNDLE | 3.9% | 18.9% | -injury30d −3 | -injury30d −4 | 0.9% | 14.9% | 11 | A Atzeni | 4 | 129 | Stalker (box seat) | -injury30d | 腳 (Leg, Rule 9) |
| 12 | 1 | HAPPY TERCENTENARY | 0.2% | 2.1% | 0 | 0 | 0.2% | 2.1% | 11 | A Badel | 12 | 135 | Closer | — | — |
| 13 | 10 | TIN FOOK | 1.7% | 10.9% | -perf −2 | -perf −2 | 0.0% | 8.9% | 7.4 | B Avdulla | 1 | 129 | — | -perf | 腳 (Leg, Rule 9) |
| 14 | 4 | ONE MORE | 0.3% | 2.6% | trial +2, -injury30d −3 | trial +2, -injury30d −4 | 0.0% | 0.6% | 15 | H T Mo (-2) | 3 | 130 | — | +trial, -injury30d | — (see caveats) |

Factor labels: +form +1 ("rallied"), excuses +2 (steadied / impeded / wide without cover), trial +2, -injury30d −3 win / −4 place, -perf −2. Caps are ±8 win / ±10 place, and none were reached. Adj Win% for #10 and #4 was floored at 0%. Banker eligibility: #3 has 10 recorded starts, so it is eligible.

SCMP adjustments applied:
- **#3 ABSOLUTE AWAKENED**: Star Form "Resumed a rallying winner at $24 from behind midfield over 1,400m", so +form +1. No TIR or vet flags.
- **#2 LUNAR DASH**: TIR "near the 800M was steadied", so excuses +2. The same report says "Rider could offer no explanation for his mount's disappointing performance". That is not a formal stewards' "unacceptable performance" finding, so no -perf.
- **#8 M M CONCORD**: TIR "Raced wide and without cover for the majority of the event", so excuses +2 (wide trip). "Shifted out at the start and was bumped" is a single note, so no -barrier.
- **#13 SOO KOO**: Star Form "fading 11th ... after a wide trip without cover", so excuses +2.
- **#7 TYCOON EXPRESS**: Star Form "impeded 250m out" on its latest run, so excuses +2. "Jumped awkwardly and lost ground" is a single note, so no -barrier.
- **#9 STUNNING BUNDLE**: Vet "23/09/2026 ... sustained multiple abrasions to both hind legs. Withdrawn (passed on 02/10/2026)". That is 9 days before the race (< 30), so -injury30d −3 win / −4 place.
- **#10 TIN FOOK**: Vet "04/07/2026 Unacceptable performance (passed on 28/09/2026)", so -perf −2. Applied to Place as well, following the R6 convention. Rider also said it did not handle the wet-fast AWT. That excuse is specific to the surface and not scored.
- **#4 ONE MORE**: Vet "04/07/2026 ... found to be lame in its left front leg. Withdrawn (passed on 15/09/2026)". That is 26 days before the race (< 30), so -injury30d −3 / −4. Trackwork "won his most recent Conghua turf trial and has caught the eye in the mornings", so trial +2. (The SCMP extractor first attached this line to #10, but the text names One More.)
- **#5 STORM MIRROR**: TIR "jumped only fairly. Raced keenly" is a single note and is not in the flag table. The "luckless seventh" was on debut, not the last run. Score 0.
- **#6 CAVA PIONEER**: TIR "raced keenly, shifted out and then made contact" was self-inflicted, so it is not an excuse. Score 0.
- **#14 GOOD LUCK BABE**: TIR "made contact with a rail on entering the track, was examined by the vet at the Start and passed suitable to race". This happened at the start of a race and was not an injury and withdrawal, so 0.
- **#1, #11, #12**: single jumping notes or no keywords, so 0.

Reasoning: #3 ABSOLUTE AWAKENED is clear on every measure. It is MC #1 (42.4% win, rating 70, 5-point gap), the market favourite (4.6 HKJC, 3.3 on SCMP's later odds), a last-start C&D winner ("rallying winner ... over 1,400m"), and drawn 2. At Adj Win% 43.4% the race is **Dominant → Mode A**. Mode A's 5-horse pool is the banker + top 4 by Adj Place%: #5 55.0, #6 52.9, #2 28.0, #14 15.3. #2 is also a must-include at ≥ 25%. No other horse reaches 20% Adj Place%. The pool grows under **Rule 9**:
  (a) #9 STUNNING BUNDLE (11, 6th fav) has an injury flag. Without the flag its raw MC 18.9% place would rank 5th, above #14, so the flag alone is what would exclude it. Odds ≤ 15, so it is included.
  (b) #10 TIN FOOK (7.4, 4th fav) has a -perf flag and odds ≤ 15, so it is included (same treatment as #10 ENJOY GOLF in R6).
  (c) #4 ONE MORE is also flagged at exactly 15. It is **not added**, because the pool is already at the 7-horse maximum, its raw MC is 2.6% place (13th of 14), it is the weakest of the three flagged horses in the market (8th fav), and it has been off 133 days. Adding it would cost +$60 (21 combos) for about +0.9 pts of raw-MC hit chance. See caveats.
Pace: #8 (gate 13) is the likely leader. #5, #11, #12 race handy, and #9 sat box-seat on debut. #3 and #6 come from midfield or behind, so a genuine tempo suits the banker.

## TRIO POOL (Strategy A, any order)

```
POOL: #3, #5, #6, #2, #14, #9, #10
MODE: A (Dominant, #3 Adj Win% 43.4% ≥ 35%), expanded 5 → 7 under Rule 9 | POOL SIZE: 7
  Banker + top 4 by Adj Place%: #3 (77.4), #5 (55.0), #6 (52.9), #2 (28.0), #14 (15.3)
  + Rule 9 (negative flag, odds ≤ 15): #9 (11), #10 (7.4)

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #3 ABSOLUTE AWAKENED (Adj Win% 43.4%, Adj Place% 77.4%) ← locked in every combo
腳 (Legs):  #5, #6, #2, #14, #9, #10
雙膽拖 check: 2nd-ranked #5 Adj Place% 55.0% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%; fair odds per $10):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #3, #5, #6 | 23.8% | $42 |
| 2 | #3, #5, #2 | 9.3% | $107 |
| 3 | #3, #6, #2 | 8.9% | $112 |
| 4 | #3, #5, #14 | 2.9% | $341 |
| 5 | #3, #6, #14 | 2.8% | $356 |
| 6 | #3, #2, #14 | 1.1% | $924 |
| 7 | #3, #5, #9 | 1.0% | $1,042 |
| 8 | #3, #6, #9 | 0.9% | $1,088 |

The 5 combos with #10 score 0% on Adj Win% (floored). On raw MC they score 0.2–2.1% each.
Estimated chance that the Strategy A ticket hits (sum of 15 combos): about 51% on Adj Win%, or about 66% on raw MC. (The raw MC figure is higher because the Adj boosts to outsiders #8 / #13 / #7 dilute the normalised top three.)

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

TICKET: 膽 #3 | 腳 #5, #6, #2, #14, #9, #10
  3-5-6, 3-5-2, 3-5-14, 3-5-9, 3-5-10, 3-6-2, 3-6-14, 3-6-9, 3-6-10,
  3-2-14, 3-2-9, 3-2-10, 3-14-9, 3-14-10, 3-9-10

TOP COMBINATIONS (highest value):
  3-5-6 (23.8%), 3-5-2 (9.3%), 3-6-2 (8.9%), 3-5-14 (2.9%), 3-6-14 (2.8%)
```

Value note: 3-5-6 is MC's dominant trio (about 24–27%, fair ~$37–42). The market has #5 only 5th favourite (8.3), so that trio may pay above fair. Combos with #2 LUNAR DASH (32, MC 26% place) carry the overlay. SCMP Q shows 3-5 at 22 against MC fair 5.2, and 2-3 at 25 against fair 15.0. Both would be strong Q overlays, but the matrix values look unreliable (see caveats), so do not lean on them.

PASS CONDITIONS:
- If #3 ABSOLUTE AWAKENED (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going changes to Yielding / Soft or worse → re-run the MC.
- If #3 drifts beyond ~8 in late betting (market losing faith in the banker) → consider PASS.

CONFIDENCE: MEDIUM-HIGH. The banker is MC 76.4% place from gate 2, the market favourite, and a last-start C&D winner with 10 runs of form. The risks: its earlier form before that win was modest (7/6/7/10/5), it won at $24, and it goes up in the weights. #6 CAVA PIONEER is MC #3 on a single run of form.

CAVEATS:
- SCMP is partial. SCMP win odds are later than or different from the HKJC 11:23 capture: #3 3.3 vs 4.6, #5 10 vs 8.3, #6 5.9 vs 5.4, #14 6.8 vs 7.0, #10 10 vs 7.4, #9 10 vs 11. SCMP "Place" odds are about equal to win odds (e.g. #1 12/11), so they look mis-parsed (same issue as R6). The Q/QP matrix values look internally inconsistent: QP 5-6 at 4.3 is lower than QP 3-6 at 5.0, and 3-14 shows 274 even though #3 and #14 are top-3 favourites. They were not used for adjustments.
- #6 CAVA PIONEER (2nd fav) has only 1 run in the data (7th on debut). Its MC 52.9% place leans on rating, the Purton booking and priors. Trainer C H Yip shows 0% from 38 in the data.
- #4 ONE MORE (15, -injury30d after being lame, +trial) was left out of Strategy A's pool to keep the 7-horse maximum. Taken literally, Rule 9 (odds ≤ 15) would include it. To follow it strictly, add #4 as a 7th leg: 21 combos / $210.
- #9 STUNNING BUNDLE and #10 TIN FOOK are in Strategy A only because of Rule 9. #9 had a transport injury passed 9 days ago, and #10 has an unacceptable-performance vet flag and has been off 99 days.
- Judgment calls on SCMP adjustments: #7 "impeded" scored as excuses +2. #2's "no explanation for disappointing performance" not scored as -perf. #4's trial scored +2. None of these change Strategy A's pool except as noted.
- Odds were captured at 11:23 HKT on 11-Oct. The HKJC pool will move before the off. SCMP already shows #3 shortening to 3.3.
- Historical sync was not re-run in this session (already done per instruction). analyze-race.ts saved its enriched race card to data/racecards/racecard_20261011_ST_R7.json as a normal tool side effect.
```

## STRATEGY B (MC-only)

```
Banker: #3 ABSOLUTE AWAKENED (MC Win% 42.4%, MC Place% 76.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #5 (55.0%), #6 (52.9%), #2 (26.0%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #2 LUNAR DASH (MC Place% 26.0%, Win odds 32)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #14 GOOD LUCK BABE (Win odds 7.0, MC Place% 15.3%)
  #10 TIN FOOK (Win odds 7.4, MC Place% 10.9%)
  (#9 at 11 does not qualify)
Action: #14 replaced #2 (1-for-1 swap; #2 was the only replaceable leg).
        #10 added directly (no replaceable leg remained).
Final legs: #5, #6, #14, #10
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

STRATEGY B TICKET: 膽 #3 | 腳 #5, #6, #14, #10
  3-5-6, 3-5-14, 3-5-10, 3-6-14, 3-6-10, 3-14-10

Top combos (Harville, raw MC): 3-5-6 27.3% | 3-5-14 3.3% | 3-6-14 3.2% | 3-5-10 2.1% | 3-6-10 2.0% | 3-14-10 0.2%
Est. ticket hit chance (sum of 6 combos, raw MC): ~38%
```

Comparison: both strategies use the same banker (#3) and share legs #5, #6, #14 and #10. Strategy A also keeps #2 LUNAR DASH (MC 26% place, the model's biggest overlay at 32) and the Rule-9 horse #9, so it is 15 combos / $150. Strategy B swaps #2 out for the market-backed #14, so it is 6 combos / $60. On raw MC, Strategy A covers about 66% against about 38% for Strategy B. Most of the gap comes from 3-5-2 and 3-6-2 (about 15 pts together), which Strategy B does not cover.

```
═══════════════════════════════════════════════════════════
```
