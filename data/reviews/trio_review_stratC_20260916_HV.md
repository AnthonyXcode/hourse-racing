# Trio Strategy B (stratC) Review — Happy Valley | 2026-09-16

**Meeting 4 of the 2026/27 season.** 8-race Wednesday night card, Turf "B" course, going **Good** throughout. One late scratching: **R8 #5 HUGE WAVE** (11 starters; not in any ticket). Results: `data/historical/results_20260916_HV.json`. Odds snapshot for all 8 reports: **17:55 HKT** (75 min before R1, ~4h55m before R8).

**B-trio hit 2 races (R4, R6) where Strategy A and the review-spec MC top-6 hit none.** Both hits were made by the Step B Win-odds rule adding a horse the MC rated below 20% Place.

## Rules

- **Banker** = MC #1 by raw MC Win%
- **Primary legs** = every other horse with MC Place% > 20%
- **Step B** = any horse with MC Place% ≤ 20% AND Win odds < 10 replaces the lowest-Place% primary leg that is 20–30% with odds > 10; if no such leg exists, it is **added** instead
- **Unit** $10, structure 膽拖, combos = C(N,2)
- **No SCMP adjustments, no jockey boost, all races played**

## Summary

| Metric | Strategy B (MC-only, as bet) | Strategy A (full pipeline) |
|---|---|---|
| Live races | 8 | 8 |
| Hits | **2/8 (25.0%)** | **0/8 (0.0%)** |
| Combos | 91 | 85 |
| Staked | $910 | $850 |
| Returned | $513 | $0 |
| **Net P&L** | **−$397** | **−$850** |
| **ROI** | **−43.6%** | **−100.0%** |
| Banker top 3 | 6/8 (75.0%) | 6/8 (75.0%) |

Both strategies used the **same banker in all 8 races** (A added #6 as 2nd banker in R3). The whole $453 gap between them is **two Step B additions**: #11 KWAI CHUNG TALENTS in R4 and #2 POPE CODY in R6, both < 10 at snapshot, both excluded by A's Adj Place%. The canonical review-spec B (MC top-6, 1膽+5腳, $100 flat) used the same 6-horse pool as A in 7 of 8 races and also went **0/8: $800 staked, −$800, −100.0%**.

## Race-by-Race — Strategy B (as bet)

| R | Class | Dist | Surf | Banker (MC#1) | Final legs | Combos | Stake | Result | Bk top3? | Hit? | Trio $ | Return | P&L |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1000m | Turf | #2 | 9, 11, 4, 7 | 6 | $60 | 11→12→6 | ❌ 8th | MISS ❌ | $1,674 | $0 | −60 |
| R2 | Class 4 | 1200m | Turf | #3 | 11, 5, 9, 8, 2 | 10 | $100 | 3→8→4 | ✅ 1st | MISS ❌ | $3,312 | $0 | −100 |
| R3 | Class 4 | 1800m | Turf | #8 | 6, 3, 1, 5, 10 | 10 | $100 | 7→6→10 | ❌ 5th | MISS ❌ | $380 | $0 | −100 |
| R4 | Class 4 | 1200m | Turf | #3 | 2, 1, 4, 5, 12, 11 | 15 | $150 | 3→11→12 | ✅ 1st | **HIT ✅** | $315 | $315 | **+315−150 = +165** |
| R5 | Class 4 | 1200m | Turf | #7 | 6, 5, 10, 9, 11, 8 | 15 | $150 | 6→4→7 | ✅ 3rd | MISS ❌ | $315 | $0 | −150 |
| R6 | Class 3 | 1650m | Turf | #1 | 8, 12, 6, 10, 3, 2 | 15 | $150 | 2→1→10 | ✅ 2nd | **HIT ✅** | $198 | $198 | **+198−150 = +48** |
| R7 | Class 3 | 1000m | Turf | #1 | 5, 4, 8, 3, 10 | 10 | $100 | 4→11→1 | ✅ 3rd | MISS ❌ | $1,154 | $0 | −100 |
| R8 | Class 2 | 1650m | Turf | #12 | 1, 7, 11, 6, 8 | 10 | $100 | 12→3→4 | ✅ 1st | MISS ❌ | $2,356 | $0 | −100 |

## Race-by-Race — Strategy A

| R | Class | Mode | Banker(s) | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | C5 | B | #2 | 9,11,4,7,10 | 10 | $100 | 11→12→6 | MISS ❌ | $1,674 | $0 | −100 | Banker 8th + gaps #12 (18), #6 (16) |
| R2 | C4 | A (+Rule 8) | #3 | 11,5,9,7,8 | 10 | $100 | 3→8→4 | MISS ❌ | $3,312 | $0 | −100 | Banker won, gap #4 (90) |
| R3 | C4 | A 雙膽拖 | #8, #6 | 1,3,5,10 | 4 | $40 | 7→6→10 | MISS ❌ | $380 | $0 | −40 | Banker 1 5th + gap #7 (12) |
| R4 | C4 | A (+Rule 8) | #3 | 2,1,4,5,12 | 10 | $100 | 3→11→12 | MISS ❌ | $315 | $0 | −100 | Banker won, gap #11 (6, mkt 3rd) |
| R5 | C4 | B | #7 | 6,5,10,9,11 | 10 | $100 | 6→4→7 | MISS ❌ | $315 | $0 | −100 | Banker 3rd, gap #4 (9.5) |
| R6 | C3 | B | #1 | 12,8,10,6,3 | 10 | $100 | 2→1→10 | MISS ❌ | $198 | $0 | −100 | Banker 2nd, gap #2 (4.2 fav) |
| R7 | C3 | B | #1 | 5,4,8,3,2 | 10 | $100 | 4→11→1 | MISS ❌ | $1,154 | $0 | −100 | Banker 3rd, gap #11 (17) |
| R8 | C2 | A (+Rule 8) | #12 | 1,7,11,6,4,9,8 | 21 | $210 | 12→3→4 | MISS ❌ | $2,356 | $0 | −210 | Banker won, gap #3 (11) |

## B Miss Pattern Summary

| Pattern | Count | Races |
|---|---|---|
| **A** — Banker fail, all 3 placers already in legs | **0/6** | — |
| **B** — Banker hit, pool gap | **4/6** | R2, R5, R7, R8 |
| **C** — Banker fail + pool gap | **2/6** | R1, R3 |

**The reverse of 13-Sep.** Bankers placed 6/8 (vs 3/10 on Sunday) and Pattern B dominated. Both Pattern C races had an MC #1 the market rated **outside its top 3** (R1 #2 market 4th, R3 #8 market 8th). Every MC #1 inside the market top 2 placed (6/6).

**Noteworthy misses:**

- **R8** — the Step B swap **removed** primary leg #4 HELENE FEELING (MC Place 23.0%, 23 odds) to add #8 MAX QUE (3.8, 19.2%). #4 ran 3rd; #8 ran 11th. With the unswapped legs, B-trio still misses on #3 SAGACIOUS LIFE (exactly 10 at snapshot, not < 10). The swap rule is not free: this is its first clear cost in the log.
- **R5** — #4 LUCKY MCQUEEN was **11 at 17:55 and 9.5 at the off**. A near-post odds refresh would have added him and hit $315. Second meeting running where stale odds are the named miss cause.
- **R2 / R7** — genuine longshots in 3rd/2nd (#4 GRIT SPIRIT 90, #11 RED ELEGANCE 17), rated out by both MC and market.

## Full MC Place% Table — Per Race

Seq: ★ = 膽 (MC #1 banker), L1–L6 = 腳 in leg order, — = outside pool. SP = starting price. Mkt rk = rank by SP (ties share rank). Pool = in B-trio ticket.

### R1 — Class 5 | 1000m Turf | Good | Trio $1,674

| Seq | # | Horse | MC Win% | MC Place% | SP | Mkt rk | Pool | Role | Finished |
|-----|---|-------|---------|-----------|----|--------|------|------|----------|
| ★ | 2 | ALWAYS MY FOLKS | 28.9% | 65.2% | 9.4 | 4 | ✅ | 膽 (Banker, MC #1) | 8 |
| L1 | 9 | RUNJEET | 22.4% | 58.1% | 5.6 | 3 | ✅ | 腳 (Leg) | 6 |
| L2 | 11 | SPICY SPANGLE | 20.3% | 55.1% | 4.5 | 2 | ✅ | 腳 (Leg) | 1 🏆 |
| L3 | 4 | JOLLY COMPANION | 11.8% | 41.0% | 10 | 5 | ✅ | 腳 (Leg) | 9 |
| L4 | 7 | MACANESE MASTER | 10.8% | 39.7% | 3.7 | 1 | ✅ | 腳 (Leg) | 7 |
| — | 10 | SMART CITY | 2.2% | 12.6% | 59 | 11 | ❌ | — | 10 |
| — | 6 | ICONICAL | 1.1% | 8.8% | 16 | 8 | ❌ | — | 3 ✅ |
| — | 12 | SOLAR RIVER | 0.9% | 6.9% | 18 | 9 | ❌ | — | 2 ✅ |
| — | 3 | BEAUTY GEMINI | 0.6% | 4.3% | 11 | 6 | ❌ | — | 4 |
| — | 8 | DIRIYA | 0.5% | 4.2% | 12 | 7 | ❌ | — | 5 |
| — | 5 | SWEET BRIAR | 0.3% | 2.0% | 27 | 10 | ❌ | — | 12 |
| — | 1 | TOPSPIN KING | 0.2% | 2.2% | 81 | 12 | ❌ | — | 11 |

**Top 3:** 6–11–12 · **Outside pool:** #6, #12 · **Banker #2 finished 8**

**Pattern analysis — Pattern C.** MC #1 #2 ALWAYS MY FOLKS (28.9% / 65.2%) was only the market's **4th** choice (7.8 at snapshot, drifted to 9.4) and was drawn **12 of 12** over the Valley 1000m — the report named the gate as the single biggest risk and bet it anyway. He ran 8th. Winner #11 SPICY SPANGLE (L2, gate 3, front-runner) got exactly the trip the pace read predicted. The frame was completed by #12 SOLAR RIVER (18, MC 6.9%) and #6 ICONICAL (16, MC 8.8%, `−injury30d`). **Signal missed:** the analyzer's own finish-time projection ranked #12 3rd; the MC ranked it 8th. No market signal pointed at #6 or #12 (market 8th and 9th). Unfixable by leg rules.

### R2 — Class 4 | 1200m Turf | Good | Trio $3,312

| Seq | # | Horse | MC Win% | MC Place% | SP | Mkt rk | Pool | Role | Finished |
|-----|---|-------|---------|-----------|----|--------|------|------|----------|
| ★ | 3 | BRIGHT DAY | 41.7% | 75.1% | 4.7 | 2 | ✅ | 膽 (Banker, MC #1) | 1 🏆 |
| L1 | 11 | LOVING VIBES | 16.0% | 48.0% | 3.7 | 1 | ✅ | 腳 (Leg) | 4 |
| L2 | 5 | HOLMES A COURT | 12.2% | 40.7% | 5.5 | 4 | ✅ | 腳 (Leg) | 8 |
| L3 | 9 | VERY GRATEFUL | 10.4% | 36.7% | 21 | 7 | ✅ | 腳 (Leg) | 5 |
| L4 | 8 | DAN ATTACK | 5.6% | 23.7% | 5.3 | 3 | ✅ | 腳 (Leg) | 2 ✅ |
| — | 7 | CALIFORNIA BAY | 5.0% | 22.0% | 7.8 | 5 | ❌ | — | 10 |
| — | 10 | LEGEND STAR | 2.4% | 13.4% | 43 | 9 | ❌ | — | 9 |
| — | 6 | KANSAS | 2.1% | 12.2% | 52 | 10 | ❌ | — | 11 |
| — | 1 | GLORIOUS DYNASTY | 2.0% | 11.1% | 75 | 11 | ❌ | — | 6 |
| — | 12 | TACTICAL COMMAND | 1.6% | 9.3% | 23 | 8 | ❌ | — | 7 |
| L5 | 2 | TRUE BROTHERS | 0.5% | 4.0% | 12 | 6 | ✅ | 腳 (Leg) | 12 |
| — | 4 | GRIT SPIRIT | 0.5% | 3.9% | 90 | 12 | ❌ | — | 3 ✅ |

**Top 3:** 3–4–8 · **Outside pool:** #4 · **Banker #3 finished 1**

**Pattern analysis — Pattern B.** Banker #3 BRIGHT DAY (MC 41.7%, market 2nd at 4.7) won, and #8 DAN ATTACK (L4, MC 23.7% — only 3.7pp over the leg bar) ran 2nd. Third was **#4 GRIT SPIRIT at 90, the rank-outsider of the field** (MC 3.9%). Step B swapped #7 CALIFORNIA BAY (22.0%, 12) for #2 TRUE BROTHERS (9.0 at snapshot) — both ran 10th/12th, a neutral swap. **Signal missed: none.** Genuine longshot; Trio paid $3,312.

### R3 — Class 4 | 1800m Turf | Good | Trio $380

| Seq | # | Horse | MC Win% | MC Place% | SP | Mkt rk | Pool | Role | Finished |
|-----|---|-------|---------|-----------|----|--------|------|------|----------|
| ★ | 8 | FAMILY FORTUNE | 34.0% | 70.0% | 24 | 8 | ✅ | 膽 (Banker, MC #1) | 5 |
| L1 | 6 | ROSEWOOD FLEETFOOT | 30.3% | 67.1% | 2.9 | 1 | ✅ | 腳 (Leg) | 2 ✅ |
| L2 | 3 | SERANGOON | 9.3% | 34.7% | 23 | 7 | ✅ | 腳 (Leg) | 10 |
| L3 | 1 | NOISY BOY | 8.6% | 33.9% | 4.3 | 2 | ✅ | 腳 (Leg) | 12 |
| L4 | 5 | ROMANTIC LAOS | 6.5% | 27.5% | 9.4 | 5 | ✅ | 腳 (Leg) | 4 |
| L5 | 10 | STAR BROSE | 5.2% | 24.1% | 7 | 3 | ✅ | 腳 (Leg) | 3 ✅ |
| — | 4 | FLUORESCENCE | 1.6% | 9.3% | 97 | 12 | ❌ | — | 9 |
| — | 7 | ROMANTIC FANTASY | 1.4% | 9.2% | 12 | 6 | ❌ | — | 1 🏆 |
| — | 12 | OCEAN IMPACT | 1.3% | 7.6% | 7.2 | 4 | ❌ | — | 7 |
| — | 11 | SMILING ONE | 0.8% | 4.9% | 62 | 11 | ❌ | — | 11 |
| — | 9 | CAN'T GO WONG | 0.7% | 6.0% | 25 | 9 | ❌ | — | 8 |
| — | 2 | JUMBO STEPS | 0.6% | 5.7% | 33 | 10 | ❌ | — | 6 |

**Top 3:** 6–7–10 · **Outside pool:** #7 · **Banker #8 finished 5**

**Pattern analysis — Pattern C.** MC #1 #8 FAMILY FORTUNE was rated 34.0% win / 70.0% place but was **19 at snapshot and 24 at the off — market 8th of 12**. The model's biggest disagreement with the market on the card; he ran 5th. MC #2 #6 ROSEWOOD FLEETFOOT, the 2.9 favourite, ran 2nd, and #10 STAR BROSE (market 3rd) ran 3rd. Winner **#7 ROMANTIC FANTASY at 12 (market 6th)** was MC 8th at 9.2% Place. **Signal missed:** the market. Banking #6 (MC #2, market #1) with the same six horses still misses on #7. Unfixable without #7, but the banker choice alone is the second season instance of an MC #1 outside market top 3 failing.

### R4 — Class 4 | 1200m Turf | Good | Trio $315

| Seq | # | Horse | MC Win% | MC Place% | SP | Mkt rk | Pool | Role | Finished |
|-----|---|-------|---------|-----------|----|--------|------|------|----------|
| ★ | 3 | LIVE WIRE | 34.0% | 67.8% | 3.1 | 1 | ✅ | 膽 (Banker, MC #1) | 1 🏆 |
| L1 | 2 | SOMELOVEFROMABOVE | 16.1% | 45.7% | 17 | 8 | ✅ | 腳 (Leg) | 11 |
| L2 | 1 | FRIENDS OF SHAJING | 15.6% | 45.5% | 8.7 | 4 | ✅ | 腳 (Leg) | 10 |
| L3 | 4 | GIANT LEAP | 10.5% | 34.7% | 4.8 | 2 | ✅ | 腳 (Leg) | 4 |
| L4 | 5 | STARRY SHOW | 6.6% | 25.8% | 12 | 6 | ✅ | 腳 (Leg) | 5 |
| L5 | 12 | SAME TO YOU | 6.4% | 25.4% | 10 | 5 | ✅ | 腳 (Leg) | 3 ✅ |
| — | 7 | A TIME FOR US | 3.3% | 15.4% | 19 | 9 | ❌ | — | 8 |
| L6 | 11 | KWAI CHUNG TALENTS | 3.2% | 15.7% | 6 | 3 | ✅ | 腳 (Leg) | 2 ✅ |
| — | 6 | VICTOR THE RAPID | 2.9% | 14.3% | 12 | 6 | ❌ | — | 6 |
| — | 8 | JOLLY BONUS | 0.6% | 3.8% | 121 | 12 | ❌ | — | 12 |
| — | 9 | EVERSTAR | 0.5% | 4.0% | 106 | 11 | ❌ | — | 9 |
| — | 10 | LIGHTNESS OF BEING | 0.2% | 2.0% | 40 | 10 | ❌ | — | 7 |

**Top 3:** 3–11–12 · **Outside pool:** none · **Banker #3 finished 1** · **HIT ✅ $315**

**Pattern analysis — HIT.** MC #1 and market favourite agreed on #3 LIVE WIRE (3.1), who won. #12 SAME TO YOU (L5, 25.4%) ran 3rd. The hit was made by **Step B**: #11 KWAI CHUNG TALENTS had MC Place% only 15.7% (8th by MC) but was **8.1 at snapshot (<10)**; the two 20–30% primary legs (#5 at 9.2, #12 at 8.8) were both under 10 so neither was replaceable, and #11 was **added** as a 6th leg. He firmed to 6 (market 3rd) and ran 2nd. Strategy A excluded #11 (Adj Place% 15.7%) and missed. Cost of the extra leg: $50. Return $315.

### R5 — Class 4 | 1200m Turf | Good | Trio $315

| Seq | # | Horse | MC Win% | MC Place% | SP | Mkt rk | Pool | Role | Finished |
|-----|---|-------|---------|-----------|----|--------|------|------|----------|
| ★ | 7 | WINNING MONEY | 22.3% | 52.1% | 5.4 | 2 | ✅ | 膽 (Banker, MC #1) | 3 ✅ |
| L1 | 6 | YOUNG ARROW | 20.2% | 49.0% | 3.1 | 1 | ✅ | 腳 (Leg) | 1 🏆 |
| L2 | 5 | ELEGANT LIFE | 13.7% | 38.6% | 20 | 9 | ✅ | 腳 (Leg) | 7 |
| L3 | 10 | GENIUS BABY | 11.0% | 33.9% | 8.2 | 5 | ✅ | 腳 (Leg) | 9 |
| L4 | 9 | STAR OF HEARTS | 10.0% | 31.6% | 53 | 11 | ✅ | 腳 (Leg) | 5 |
| L5 | 11 | FORZA LEADER | 6.3% | 22.9% | 7.7 | 3 | ✅ | 腳 (Leg) | 4 |
| — | 3 | ARMOUR WAR EAGLE | 4.5% | 17.7% | 16 | 7 | ❌ | — | 8 |
| — | 4 | LUCKY MCQUEEN | 3.8% | 16.6% | 9.5 | 6 | ❌ | — | 2 ✅ |
| — | 1 | GRATIFIDE | 3.5% | 14.7% | 19 | 8 | ❌ | — | 12 |
| L6 | 8 | GROUPER | 2.4% | 11.1% | 7.8 | 4 | ✅ | 腳 (Leg) | 6 |
| — | 2 | JUICY DRAGON | 1.8% | 8.5% | 56 | 12 | ❌ | — | 10 |
| — | 12 | GOLDEN FRIENDSHIP | 0.6% | 3.4% | 36 | 10 | ❌ | — | 11 |

**Top 3:** 4–6–7 · **Outside pool:** #4 · **Banker #7 finished 3**

**Pattern analysis — Pattern B.** Banker #7 WINNING MONEY (MC 22.3%, market 2nd) ran 3rd and L1 #6 YOUNG ARROW (the 3.1 favourite) won — model and market agreed on the top two. Second was **#4 LUCKY MCQUEEN**: MC Place% 16.6%, `+trial`, **11 at the 17:55 snapshot → 9.5 at the off**. Step B added #8 GROUPER (5.6 snapshot, ran 6th) instead. **Signal missed:** late market support. A re-fetch of odds near post time would have put #4 under 10 and into the ticket. Stale-odds miss worth $315.

### R6 — Class 3 | 1650m Turf | Good | Trio $198

| Seq | # | Horse | MC Win% | MC Place% | SP | Mkt rk | Pool | Role | Finished |
|-----|---|-------|---------|-----------|----|--------|------|------|----------|
| ★ | 1 | DAZZLING FIT | 27.7% | 58.1% | 4.9 | 2 | ✅ | 膽 (Banker, MC #1) | 2 ✅ |
| L1 | 8 | SUPER UNICORN | 13.1% | 37.5% | 18 | 9 | ✅ | 腳 (Leg) | 10 |
| L2 | 12 | REFUSETOBEENGLISH | 12.3% | 36.0% | 12 | 5 | ✅ | 腳 (Leg) | 12 |
| L3 | 6 | CALL ME TOPSEED | 11.2% | 34.0% | 21 | 10 | ✅ | 腳 (Leg) | 8 |
| L4 | 10 | HYMNBOOK | 9.6% | 29.8% | 5 | 3 | ✅ | 腳 (Leg) | 3 ✅ |
| L5 | 3 | ROMANTIC GLADIATOR | 9.3% | 29.7% | 12 | 5 | ✅ | 腳 (Leg) | 9 |
| — | 5 | HIGHLAND RAHY | 4.6% | 18.7% | 12 | 5 | ❌ | — | 4 |
| — | 11 | VIVA GRACIOUSNESS | 3.5% | 14.9% | 21 | 10 | ❌ | — | 5 |
| L6 | 2 | POPE CODY | 3.3% | 14.3% | 4.2 | 1 | ✅ | 腳 (Leg) | 1 🏆 |
| — | 7 | EMBRACES | 2.3% | 11.1% | 13 | 8 | ❌ | — | 6 |
| — | 9 | ALL ROUND WINNER | 2.3% | 11.0% | 11 | 4 | ❌ | — | 7 |
| — | 4 | WROTE A NEW PAGE | 0.8% | 5.0% | 31 | 12 | ❌ | — | 11 |

**Top 3:** 1–2–10 · **Outside pool:** none · **Banker #1 finished 2** · **HIT ✅ $198**

**Pattern analysis — HIT.** Banker #1 DAZZLING FIT (MC 27.7%, market 2nd) ran 2nd; #10 HYMNBOOK (L4, market 3rd) ran 3rd. Winner **#2 POPE CODY** was MC 9th at 14.3% Place but **8.0 at snapshot → 4.2 favourite at the off**. Step B added it as the 6th leg. Strategy A kept #2 out (Adj Place% 15.3% despite `+form`) and missed the race on the market favourite. Return $198 on $150 — a thin +$48, but the only way to cover the result.

### R7 — Class 3 | 1000m Turf | Good | Trio $1,154

| Seq | # | Horse | MC Win% | MC Place% | SP | Mkt rk | Pool | Role | Finished |
|-----|---|-------|---------|-----------|----|--------|------|------|----------|
| ★ | 1 | LOVE TOGETHER | 32.4% | 69.1% | 3.4 | 1 | ✅ | 膽 (Banker, MC #1) | 3 ✅ |
| L1 | 5 | BUNTA BABY | 25.4% | 61.7% | 5.6 | 2 | ✅ | 腳 (Leg) | 5 |
| L2 | 4 | DANCING CLASSICS | 17.4% | 51.0% | 10 | 4 | ✅ | 腳 (Leg) | 1 🏆 |
| L3 | 8 | NOTTHESILLYONE | 9.6% | 36.3% | 20 | 10 | ✅ | 腳 (Leg) | 8 |
| L4 | 3 | HORSEPOWER | 6.8% | 29.2% | 8.8 | 3 | ✅ | 腳 (Leg) | 4 |
| — | 2 | CANDLELIGHT DINNER | 2.8% | 15.2% | 11 | 6 | ❌ | — | 10 |
| — | 9 | HONEST WITNESS | 2.2% | 11.9% | 15 | 8 | ❌ | — | 11 |
| L5 | 10 | PARENTS' LOVE | 1.0% | 6.5% | 10 | 4 | ✅ | 腳 (Leg) | 6 |
| — | 6 | ETERNAL FORTUNE | 0.9% | 6.8% | 11 | 6 | ❌ | — | 9 |
| — | 12 | DRAGON FOUR SEAS | 0.6% | 4.1% | 21 | 12 | ❌ | — | 12 |
| — | 11 | RED ELEGANCE | 0.6% | 4.3% | 17 | 9 | ❌ | — | 2 ✅ |
| — | 7 | CASA OF HONOR | 0.4% | 4.0% | 20 | 10 | ❌ | — | 7 |

**Top 3:** 1–4–11 · **Outside pool:** #11 · **Banker #1 finished 3**

**Pattern analysis — Pattern B.** Banker #1 LOVE TOGETHER — MC #1 (32.4%) and the favourite after firming from 8.5 to 3.4 — ran 3rd. #4 DANCING CLASSICS (L2) won at 10. Second was **#11 RED ELEGANCE at 17 (market 9th, MC 11th at 4.3%)**. Step B added #10 PARENTS' LOVE (6.8 snapshot, drifted to 10, ran 6th). **Signal missed: none.** Neither model nor market rated #11. Unfixable.

### R8 — Class 2 | 1650m Turf | Good | Trio $2,356

| Seq | # | Horse | MC Win% | MC Place% | SP | Mkt rk | Pool | Role | Finished |
|-----|---|-------|---------|-----------|----|--------|------|------|----------|
| ★ | 12 | LE ZONDA | 44.2% | 76.6% | 3 | 1 | ✅ | 膽 (Banker, MC #1) | 1 🏆 |
| L1 | 1 | SPEED DRAGON | 12.8% | 41.3% | 22 | 8 | ✅ | 腳 (Leg) | 7 |
| L2 | 7 | SILVERY BREEZE | 10.9% | 37.3% | 11 | 6 | ✅ | 腳 (Leg) | 9 |
| L3 | 11 | ARMOR GOLDEN EAGLE | 6.9% | 27.7% | 5.7 | 3 | ✅ | 腳 (Leg) | 8 |
| L4 | 6 | PACKING ANGEL | 6.1% | 25.2% | 9.9 | 4 | ✅ | 腳 (Leg) | 6 |
| — | 4 | HELENE FEELING | 5.1% | 23.0% | 35 | 10 | ❌ | — | 3 ✅ |
| L5 | 8 | MAX QUE | 4.1% | 19.2% | 4.9 | 2 | ✅ | 腳 (Leg) | 11 |
| — | 3 | SAGACIOUS LIFE | 3.8% | 17.4% | 11 | 6 | ❌ | — | 2 ✅ |
| — | 9 | CALIFORNIATOTALITY | 3.7% | 17.2% | 10 | 5 | ❌ | — | 4 |
| — | 5 | HUGE WAVE | 2.0% | 11.1% | — | — | ❌ | — | SCR |
| — | 10 | AWESOME FLUKE | 0.4% | 2.8% | 31 | 9 | ❌ | — | 10 |
| — | 2 | MASSIVE SOVEREIGN | 0.1% | 1.1% | 39 | 11 | ❌ | — | 5 |

**Top 3:** 3–4–12 · **Outside pool:** #3, #4 · **Banker #12 finished 1**

**Pattern analysis — Pattern B (double gap).** Banker #12 LE ZONDA (MC 44.2%, the card's top rating; 3.0 favourite) won. The frame was filled by **#3 SAGACIOUS LIFE (11, market 6th=, MC 17.4%)** and **#4 HELENE FEELING (35, MC 23.0%)**. #4 was a *primary* leg at 23.0% Place, but Step B **swapped it out** for #8 MAX QUE (3.8 snapshot, 19.2% Place), who ran 11th. **The Win-odds swap rule directly cost this race** — it removed a horse the MC had above the bar and added the market's 2nd favourite, who ran last-but-one. #3 was exactly 10 at snapshot (not < 10). Strategy A kept #4 (Rule 8) but also missed #3 (Adj Place% 19.4%, 0.6pp under Rule 8's 20% bar). Trio $2,356. Late scratching: #5 HUGE WAVE (11 starters).

## B Banker Performance

| Race | B banker (MC #1) | MC Win% | MC Place% | SP | Mkt rank | Placed? | Position |
|------|------------------|---------|-----------|----|----------|---------|----------|
| R1 | #2 ALWAYS MY FOLKS | 28.9% | 65.2% | 9.4 | 4 | ❌ | 8th |
| R2 | #3 BRIGHT DAY | 41.7% | 75.1% | 4.7 | 2 | ✅ | 1st |
| R3 | #8 FAMILY FORTUNE | 34.0% | 70.0% | 24 | 8 | ❌ | 5th |
| R4 | #3 LIVE WIRE | 34.0% | 67.8% | 3.1 | 1 | ✅ | 1st |
| R5 | #7 WINNING MONEY | 22.3% | 52.1% | 5.4 | 2 | ✅ | 3rd |
| R6 | #1 DAZZLING FIT | 27.7% | 58.1% | 4.9 | 2 | ✅ | 2nd |
| R7 | #1 LOVE TOGETHER | 32.4% | 69.1% | 3.4 | 1 | ✅ | 3rd |
| R8 | #12 LE ZONDA | 44.2% | 76.6% | 3.0 | 1 | ✅ | 1st |

**Banker top 3: 6/8 (75.0%). Banker win: 3/8 (37.5%).**
Mean MC Win% of bankers **33.2%**, mean MC Place% **66.8%** — against an actual place rate of **75.0%**. On this card the model *under*-stated its bankers by ~8pp (13-Sep: over-stated by ~36pp).

**The market-rank split, now across two meetings:**

| Banker profile (MC #1 market rank at SP) | 13-Sep ST | 16-Sep HV | Combined |
|------------------------------------------|-----------|-----------|----------|
| Market rank 1–2 | 3/4 | **6/6** | **9/10 (90%)** |
| Market rank 3 | 0/1 | — | 0/1 |
| Market rank 4+ | 0/5 | **0/2** | **0/7 (0%)** |

## Conclusions for Strategy B

1. **The Step B Win-odds rule produced the meeting's entire return.** Additions: R4 #11 (ran 2nd, **hit**), R6 #2 (won, **hit**), R5 #8 (6th), R7 #10 (6th). Swaps: R2 #7→#2 (neutral, 10th vs 12th), R8 #4→#8 (**cost a placer**). Net for the rule: +$513 return for +$200 extra stake, minus the R8 swap damage. Keep the *add*; review the *swap*.
2. **Bank only MC #1s in the market top 2.** 9/10 placed across two meetings; market rank 4+ went 0/7. On this card that PASSes R1 and R3 (−$160 stake, no hits lost).
3. **Pool width, not banker, was the binding constraint at HV.** 4 of 6 misses were Pattern B. Two of those (R5 #4, R8 #3) were market-rank 6 horses sitting at 9.5–11 — right on the < 10 boundary.
4. **Refresh odds near post.** The 17:55 snapshot was ~5h stale for R8. Moves that mattered: R5 #4 11→9.5, R6 #2 8.0→4.2, R7 #1 8.5→3.4, R4 #11 8.1→6.
