# Trio (單T) Strategy — Happy Valley | 2026-10-14 | Race 2

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-14 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, 10/10 horses enriched)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork / Odds parsed (Q/QP matrix not parseable)
ODDS SOURCE: HKJC early pool (fetch-odds.ts → data/odds/odds_20261014_HV.json, captured 11:01 HKT 14-Oct)
             SCMP odds: ✅ loaded (consistent with HKJC) | HKJC live: ✅ loaded (morning snapshot)

RACE: R2 — ELGIN HANDICAP | Class 4 | 1650m | Turf | Good | 10 runners
CLASSIFICATION: Dominant (top Adj Win% 35.4%) | POOL SIZE: 6
MODE: A (Tight Pool) expanded to 6 — Rule 8 (every Adj Place% ≥ 20% must be in pool) + HV wider-pool guidance
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Step 1–2: Data Summary

```
Meeting: HV 2026-10-14 | Going: Good | Surface: Turf
Target Race(s): R2 (Class 4 | 1650m | 10 runners)
Scratchings: none
Odds coverage: 10/10 horses with odds
SCMP data: ✅ loaded (Q/QP matrix ⚠️ not parseable)
```

| # | Horse | Draw | Wt | Rtg | Last 6 (recent first) | Jockey | Trainer | Win | Place |
|---|-------|------|----|-----|-----------------------|--------|---------|-----|-------|
| 1 | SHAMZ | 7 | 135 | 59 | 9/1/8/11/14/7 | L Ferraris | A S Cruz | 9.3 | 3.1 |
| 2 | DRAGON ON SNOW | 8 | 131 | 55 | 12/9/14/10/8 | A Atzeni | D Eustace | 40 | 8.5 |
| 3 | AKERMANIS GOLD | 1 | 130 | 54 | 1/5/9/6/9/6 | C L Chau (-2) | D Eustace | 3.3 | 1.5 |
| 4 | CASA ROCHESTER | 9 | 126 | 50 | 7/6/4/4/6/6 | Z Purton | M Newnham | 7.2 | 2.3 |
| 5 | IVY LEAGUE | 2 | 126 | 50 | 11/10/9/5/5/10 | R Kingscote | D J Whyte | 11 | 2.9 |
| 6 | VERMILION TEMPEST | 6 | 126 | 50 | 7/11/2/8/10/6 | C Y Ho | C Fownes | 10 | 3.3 |
| 7 | LUCKY TOGETHER | 5 | 122 | 46 | 11/5/12/9/4/11 | K C Leung | F C Lor | 18 | 4.8 |
| 8 | GAZELEY | 10 | 119 | 43 | 2/6/10/10/11/11 | M Chadwick | K W Lui | 5.6 | 1.8 |
| 9 | MASSIVE REWARD | 4 | 119 | 43 | 14/11/4/11/11 | Y L Chung (-2) | C S Shum | 21 | 5.0 |
| 10 | SURE JOYFUL | 3 | 118 | 42 | 3/10/3/10/3/6 | K Teetan | P F Yiu | 5.7 | 1.9 |

### SCMP Data (R2) — tipster picks ignored

| # | Horse | SCMP Win / Place | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|------------------|------------------|----------|----------|-----------|---------------|
| 1 | SHAMZ | 9.2 / 3.3 | won at $38 (wet, 1650m) then non-factor | clear | clear | — | Closer (early move from rear) |
| 2 | DRAGON ON SNOW | 41 / 8.8 | never featured; tired 12th | jumped only fairly (1x) | clear | — | — |
| 3 | AKERMANIS GOLD | 3.1 / 1.4 | +form: won last start from midfield (crossed nose band) | crowded/checked, taken out (in winning run) | clear | — | Stalker / midfield |
| 4 | CASA ROCHESTER | 7.9 / 2.3 | 7th after late progress | +excuses: held up, disappointed for clear running, eased | clear | +trial: "worked nicely… can improve" | Closer / midfield |
| 5 | IVY LEAGUE | 11 / 2.8 | faded 11th after hot pace | clear | clear | — | On-pace |
| 6 | VERMILION TEMPEST | 10 / 3.4 | one-paced 7th from midfield | — | clear | — | Midfield |
| 7 | LUCKY TOGETHER | 18 / 4.8 | faded 11th after prominent run on fence | jumped fairly, raced keenly (1x) | clear | — | On-pace |
| 8 | GAZELEY | 6.0 / 2.0 | +form: close 2nd last start (one-out one-back) | — | clear | — | Stalker |
| 9 | MASSIVE REWARD | 21 / 5.1 | faded last; deemed a roarer | shifted in at start | -injury30d: roarer diagnosed 22/09/2026 | — | — |
| 10 | SURE JOYFUL | 5.5 / 1.8 | front-running 3rd last start | — | clear | — | Front-runner |

```
───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 3 | AKERMANIS GOLD | 34.4% | 69.9% | 3.3 | ✅ | ✅ | 1/5/9/6/9/6 | ★ 膽 (Banker) | 3-4: 16.9% (5.9) |
| 4 | CASA ROCHESTER | 20.3% | 56.3% | 7.2 | ✅ | ✅ | 7/6/4/4/6/6 | 腳 (Leg) | 3-4: 16.9% (5.9) |
| 6 | VERMILION TEMPEST | 14.4% | 44.5% | 10 | ✅ | ❌ | 7/11/2/8/10/6 | 腳 (Leg) | 3-6: 11.4% (8.7) |
| 7 | LUCKY TOGETHER | 10.7% | 37.2% | 18 | ✅ | ❌ | 11/5/12/9/4/11 | 腳 (Leg) | 3-7: 9.0% (11.0) |
| 1 | SHAMZ | 9.0% | 33.2% | 9.3 | ✅ | ✅ | 9/1/8/11/14/7 | 腳 (Leg) | 1-3: 7.3% (13.6) |
| 10 | SURE JOYFUL | 4.5% | 21.6% | 5.7 | ✅ | ✅ | 3/10/3/10/3/6 | 腳 (Leg) | — |
| 5 | IVY LEAGUE | 3.0% | 15.0% | 11 | ❌ | ❌ | 11/10/9/5/5/10 | — | — |
| 8 | GAZELEY | 1.9% | 11.1% | 5.6 | ❌ | ✅ | 2/6/10/10/11/11 | 腳 (Leg) — added (replacement candidate, no replaceable leg) | — |
| 2 | DRAGON ON SNOW | 1.3% | 8.0% | 40 | ❌ | ❌ | 12/9/14/10/8 | — | — |
| 9 | MASSIVE REWARD | 0.5% | 3.3% | 21 | ❌ | ❌ | 14/11/4/11/11 | — | — |

Next quinella: 4-6: 6.7% (15.0).

Market: Overround 22.3%. MC agrees #3 is the right favourite and rates #4 (20.3% vs 7.2 odds) and #7 (10.7% vs 18) as undervalued. Big disagreement on #8 GAZELEY (2nd fav at 5.6, MC 1.9% win) and #10 SURE JOYFUL (3rd fav at 5.7, MC 4.5%). The MC flags #8 and #9 as overvalued.

```
───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 3 | AKERMANIS GOLD | 34.4% | 69.9% | +form +1 | +form +1 | 35.4% | 70.9% | 3.3 | C L Chau | Stalk | +form | ★ 膽 (Banker) |
| 4 | CASA ROCHESTER | 20.3% | 56.3% | excuses +2, trial +2 | excuses +2, trial +2 | 24.3% | 60.3% | 7.2 | Z Purton | Close | +excuses, +trial | 腳 (Leg) |
| 6 | VERMILION TEMPEST | 14.4% | 44.5% | 0 | 0 | 14.4% | 44.5% | 10 | C Y Ho | Mid | — | 腳 (Leg) |
| 7 | LUCKY TOGETHER | 10.7% | 37.2% | 0 | 0 | 10.7% | 37.2% | 18 | K C Leung | On-pace | — | 腳 (Leg) |
| 1 | SHAMZ | 9.0% | 33.2% | 0 | 0 | 9.0% | 33.2% | 9.3 | L Ferraris | Close | — | 腳 (Leg) |
| 10 | SURE JOYFUL | 4.5% | 21.6% | 0 | 0 | 4.5% | 21.6% | 5.7 | K Teetan | Front | — | 腳 (Leg) |
| 5 | IVY LEAGUE | 3.0% | 15.0% | 0 | 0 | 3.0% | 15.0% | 11 | R Kingscote | On-pace | — | — |
| 8 | GAZELEY | 1.9% | 11.1% | +form +1 | +form +1 | 2.9% | 12.1% | 5.6 | M Chadwick | Stalk | +form | — |
| 2 | DRAGON ON SNOW | 1.3% | 8.0% | 0 | 0 | 1.3% | 8.0% | 40 | A Atzeni | — | — | — |
| 9 | MASSIVE REWARD | 0.5% | 3.3% | -injury30d −3 | -injury30d −4 | 0.0% (floored) | 0.0% (floored) | 21 | Y L Chung | — | -injury30d (roarer 22/09) | — |

Note: ★ 膽 = Banker (1st by Adj Win%; #3 has 10 starts, so it is eligible). The 2nd-ranked horse, #4, has Adj Place% 60.3%, below the 63% threshold, so 雙膽拖 does not apply.

Adjustment notes:
- #3: the crowding/checking in its TIR happened in the race it **won**, so it is not a bad-luck excuse and no bounce credit was given. Only +form +1 (won from midfield).
- #4: two flags apply. TIR says it was held up and eased after being denied a clear run (excuses +2). Trackwork says it "worked nicely on the dirt, can improve" (trial +2).
- #8: close 2nd last start (+form +1). Still far below 20% Adj Place%.
- #9: diagnosed a roarer on 22/09 (<30 days), treated as -injury30d. Floored at 0.
- #2 and #7 each have one "jumped only fairly" note. The -barrier flag needs ≥2, so neither gets it.
- #10 is 8 years old, but SCMP lists no vet age note and this is a Class 4 race, so no -age adjustment.

Reasoning: #3 is the clear anchor. It is MC #1 and market favourite, has the inside gate (1) at HV 1650m, which favours stalkers, and won last start. #4 is the strongest second-in after adjustments: Purton rides, it had a luckless run, and it worked well in trackwork. #6, #7 and #1 all clear the 25% Adj Place% must-include threshold. #10 (21.6%) is in under Rule 8 (≥20% must be in the pool). Its front-running style from gate 3 also suits HV, and its market price is 5.7. #8 GAZELEY is the main omission risk: 2nd favourite in the market but only 12.1% Adj Place%. It is covered in Strategy B.

```
───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #3, #4, #6, #7, #1, #10
MODE: A (Dominant) expanded to 6 per Rule 8 / HV | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #3 AKERMANIS GOLD (Adj Place% 70.9%) ← locked in every combo
腳 (Legs):  #4, #6, #7, #1, #10
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville trio probability from normalised Adj Win%; fair odds per $10):

| Rank | Horses (any order) | Trio Prob. | Est. Fair Div ($10) |
|------|--------------------|-----------|---------------------|
| 1 | #3, #4, #6 | 16.2% | $62 |
| 2 | #3, #4, #7 | 11.5% | $87 |
| 3 | #3, #4, #1 | 9.5% | $105 |
| 4 | #3, #6, #7 | 5.9% | $170 |
| 5 | #3, #6, #1 | 4.8% | $206 |

```
───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
Estimated ticket hit probability (Harville): ~61%

TOP COMBINATIONS (highest value):
  3-4-6 (16.2%), 3-4-7 (11.5%), 3-4-1 (9.5%), 3-6-7 (5.9%), 3-6-1 (4.8%),
  3-4-10 (4.5%), 3-7-1 (3.4%), 3-6-10 (2.3%), 3-7-10 (1.6%), 3-1-10 (1.3%)

PASS CONDITIONS:
- If #3 AKERMANIS GOLD (banker) is scratched → VOID ticket (do not restructure)
- If #4 CASA ROCHESTER is scratched → keep 膽拖 with 4 legs (6 combos, $60)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider; #1 SHAMZ won its only wet-track 1650m run (upgrade it), front-runner #10 less reliable

CONFIDENCE: MEDIUM-HIGH (dominant MC banker that the market agrees with; HV C4 upset risk)

CAVEATS:
- SCMP Q/QP matrix could not be parsed into a reliable grid, so no quinella-pool cross-check was done (MC top quinella 3-4 at fair 5.9 noted).
- The scraper log briefly reported "distance=1200m" for R2, but the enriched race card and the MC run both used 1650m, which matches SCMP and HKJC.
- Odds are an 11:01 HKT morning snapshot. Prices will move before the off.
- The market (#8 5.6, #10 5.7) disagrees strongly with the MC. #8 is outside the Strategy A pool.
- Combo probabilities are Harville approximations from Adj Win%, not direct MC trio counts.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: #3 AKERMANIS GOLD (MC Win% 34.4%, MC Place% 69.9%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #4 (56.3%), #6 (44.5%), #7 (37.2%), #1 (33.2%), #10 (21.6%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none (#10 is 21.6% but its Win odds of 5.7 are below 10)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #8 GAZELEY (Win odds 5.6, MC Place% 11.1%)
Action: #8 added directly (no replaceable leg)
Final legs: #4, #6, #7, #1, #10, #8
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150
Estimated ticket hit probability (Harville, raw MC): ~67%

STRATEGY B TICKET: 3 膽 / 4, 6, 7, 1, 10, 8 腳
  3-4-6 (15.2%), 3-4-7 (10.8%), 3-4-1 (8.9%), 3-6-7 (7.0%), 3-6-1 (5.7%),
  3-4-10 (4.2%), 3-7-1 (4.0%), 3-6-10 (2.7%), 3-7-10 (1.9%), 3-4-8 (1.7%),
  3-1-10 (1.6%), 3-6-8 (1.1%), 3-7-8 (0.8%), 3-1-8 (0.6%), 3-10-8 (0.3%)

Comparison: Both strategies use the same banker and the same five core legs. Strategy B adds
market 2nd-favourite #8 GAZELEY (5 extra combos, +$50) to cover the market-vs-MC disagreement.
Strategy A leaves #8 out on model grounds (Adj Place% 12.1%).
═══════════════════════════════════════════════════════════
```
