# Trio Strategy B (stratC) Review — Happy Valley | 2026-09-23

**Meeting 5 of the 2026/27 season.** 9-race Wednesday night card, Turf, going **Good** throughout, no scratchings. Results: `data/historical/results_20260923_HV.json` (all Trio/Quinella/Win dividends verified against HKJC GraphQL; R9 quinella corrected from a $1 truncation to $1,090.5).

> **Blind run caveats.** The reports were generated after the meeting had finished (`--hide-actual`), and nothing was bet live. **SCMP was skipped**, so Strategy A = raw MC. **Odds:** R1/R2 = racecard win odds (no place odds); R3–R9 = last momentum-collector snapshot before the off (`data/odds/odds_20260923_HV.json`). Strategy B below is the **Strategy B written in each report (B-trio)**, scored exactly as written. That is the same convention as `trio_review_stratC_20260916_HV.md`. The review-spec "MC top 6, $100 flat" variant is identical to Strategy A this meeting. It is reported in `trio_review_20260923_HV.md` §11.

**B-trio hit 2 races (R4 $117, R6 $50) and lost −$1,063. Strategy A hit R6 and R9 ($1,065) and made +$215.** The whole gap is the Step B swap in R9, which removed #5 FIVEFORTWO (ran 2nd) for #10 WINDLORD (ran 5th).

## Rules

- **Banker** = MC #1 by raw MC Win%
- **Primary legs** = every other horse with MC Place% > 20%
- **Step B** = any horse with MC Place% ≤ 20% AND Win odds < 10 replaces the lowest-Place% primary leg that is 20–30% with odds > 10; if no such leg exists, it is **added** instead
- **Unit** $10, structure 膽拖, combos = C(N,2)
- **No SCMP adjustments, no jockey boost, all races played**

## Summary

| Metric | Strategy B (MC-only, as bet) | Strategy A (raw MC, as bet) |
|---|---|---|
| Live races | 9 | 9 |
| Hits | **2/9 (22.2%)** | **2/9 (22.2%)** |
| Combos | 123 | 90 |
| Staked | $1,230 | $900 |
| Returned | $167 | $1,115 |
| **Net P&L** | **−$1,063** | **+$215** |
| **ROI** | **−86.4%** | **+23.9%** |
| Banker top 3 | 5/9 (55.6%) | 5/9 (55.6%) |

Both strategies used the **same banker in all 9 races**. Step B changed the ticket in every race. It turned a miss into a hit once (R4 +#1 FRIENDS OF SHAJING, 3rd) and a hit into a miss once (R9 swap, −$1,065). It also caught two winners in races that still missed (R1 #4, R3 #8) and added $330 of stake overall. Season B-trio: **8/44, $5,570 staked, $2,291 returned, −$3,279, −58.9%**.

## Race-by-Race — Strategy B (as bet)

| R | Class | Dist | Surf | Banker (MC#1) | Final legs | Combos | Stake | Result | Bk top3? | Hit? | Trio $ | Return | P&L |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1650m | Turf | #3 | 8, 11, 9, 6, 4 | 10 | $100 | 4→11→10 | ❌ 5th | MISS ❌ | $408 | $0 | −100 |
| R2 | Class 4 | 1200m | Turf | #4 | 7, 10, 3, 9 | 6 | $60 | 10→11→8 | ❌ 10th | MISS ❌ | $2,397 | $0 | −60 |
| R3 | Class 4 | 1650m | Turf | #5 | 2, 7, 3, 6, 8 | 10 | $100 | 8→2→12 | ❌ 6th | MISS ❌ | $775 | $0 | −100 |
| R4 | Class 4 | 1200m | Turf | #6 | 9, 8, 11, 4, 5, 1 | 15 | $150 | 4→6→1 | ✅ 2nd | **HIT ✅** | $117 | $117 | **117−150 = −33** |
| R5 | Class 4 | 1650m | Turf | #1 | 8, 6, 4, 5, 9, 7 | 15 | $150 | 6→12→1 | ✅ 3rd | MISS ❌ | $2,378 | $0 | −150 |
| R6 | Class 4 | 1000m | Turf | #1 | 4, 5, 11, 3, 12 | 10 | $100 | 1→5→4 | ✅ 1st | **HIT ✅** | $50 | $50 | **50−100 = −50** |
| R7 | Class 3 | 1200m | Turf | #6 | 3, 4, 11, 10, 8, 12, 1 | 21 | $210 | 11→12→8 | ❌ 8th | MISS ❌ | $402 | $0 | −210 |
| R8 | Class 3 | 1200m | Turf | #11 | 10, 3, 2, 1, 8, 4 | 15 | $150 | 8→11→6 | ✅ 2nd | MISS ❌ | $300 | $0 | −150 |
| R9 | Class 3 | 1800m | Turf | #6 | 3, 7, 2, 12, 10, 1, 9 | 21 | $210 | 6→5→2 | ✅ 1st | MISS ❌ | $1,065 | $0 | −210 |

## Race-by-Race — Strategy A

| R | Class | Mode | Banker(s) | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | C5 | A (+Rule 8) | #3 | 8,11,9,1,6 | 10 | $100 | 4→11→10 | MISS ❌ | $408 | $0 | −100 | Banker 5th + gaps #4 (4.5), #10 (13) |
| R2 | C4 | B | #4 | 7,10,3,12,1 | 10 | $100 | 10→11→8 | MISS ❌ | $2,397 | $0 | −100 | Banker 10th + gaps #11 (20), #8 (12) |
| R3 | C4 | B | #5 | 2,7,3,6,9 | 10 | $100 | 8→2→12 | MISS ❌ | $775 | $0 | −100 | Banker 6th + gaps #8 (4.4), #12 (26) |
| R4 | C4 | B | #6 | 9,8,11,4,5 | 10 | $100 | 4→6→1 | MISS ❌ | $117 | $0 | −100 | Banker 2nd, gap #1 (5.5) |
| R5 | C4 | B | #1 | 8,6,4,5,9 | 10 | $100 | 6→12→1 | MISS ❌ | $2,378 | $0 | −100 | Banker 3rd, gap #12 (13) |
| R6 | C4 | A (+Rule 8) | #1 | 4,5,11,3,9 | 10 | $100 | 1→5→4 | **HIT ✅** | $50 | $50 | −50 | — |
| R7 | C3 | B | #6 | 3,4,11,10,7 | 10 | $100 | 11→12→8 | MISS ❌ | $402 | $0 | −100 | Banker 8th + gaps #12 (3.5), #8 (5.9) |
| R8 | C3 | B | #11 | 10,3,2,1,8 | 10 | $100 | 8→11→6 | MISS ❌ | $300 | $0 | −100 | Banker 2nd, gap #6 (22) |
| R9 | C3 | B | #6 | 3,7,2,12,5 | 10 | $100 | 6→5→2 | **HIT ✅** | $1,065 | $1,065 | +965 | — |

## B Miss Pattern Summary

| Pattern | Count | Races |
|---|---|---|
| **A** — Banker fail, all 3 placers already in legs | **1/7** | R7 |
| **B** — Banker hit, pool gap | **3/7** | R5, R8, R9 |
| **C** — Banker fail + pool gap | **3/7** | R1, R2, R3 |

Bankers placed 5/9, between 13-Sep's 3/10 and 16-Sep's 6/8. Two of the four banker failures were market 1st–2nd (R2 #4 jt-fav 10th, R3 #5 fav 6th), so this card doesn't repeat the clean "market rank 1–2 always places" split from 16-Sep.

**Noteworthy misses:**

- **R9 — the swap cost a $1,065 hit.** #5 FIVEFORTWO was the only replaceable leg (27.6%, 20 odds). Step B swapped it for #10 WINDLORD (5.5 → 3.1 favourite), who ran 5th. #5 ran 2nd. With add-only the ticket would have had 8 legs (C(8,2) = 28, $280) and hit: −$210 becomes +$785. This is the **second meeting running** where a swap removed a placer (16-Sep R8 #4 HELENE FEELING).
- **R7 — Pattern A with $210 on it.** Step B added the market's top three (#8, #12, #1, all < 5), and #12 and #8 ran 2nd/3rd behind leg #11. Banker #6 POWER KOEPP (market 10th, 22) ran 8th. Every placer was on the ticket; the banker wasn't.
- **R1 / R3 — the swap caught the winner and still missed.** R1 #4 RED BRICK WARRIOR (9.0 → 4.5, MC 1.4%) and R3 #8 AKERMANIS GOLD (6.0 → 4.4, MC 1.0%) both **won** after being swapped in. Both races still missed on a failed banker plus a second outsider (R1 #10 at 13, R3 #12 at 26).

## Full MC Place% Table — Per Race

Seq: ★ = 膽 (MC #1 banker), L1–L7 = 腳 in the report's final-leg order, — = outside pool. Snap odds = odds used by the report (R1/R2 racecard; R3–R9 last pre-off snapshot). SP = final win odds from results. Mkt rk = rank by SP (ties share rank). Pool = in B-trio ticket.
### R1 — Class 5 | 1650m Turf | Good | Trio $408

| Seq | # | Horse | MC Win% | MC Place% | Snap odds | SP | Mkt rk (SP) | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----------|----|-------------|------|------|----------|
| ★ | 3 | SOARING BRONCO | 43.3% | 77.4% | 5.2 | 4.8 | 3 | ✅ | 膽 (Banker, MC #1) | 5 |
| L1 | 8 | TELECOM POWER | 16.7% | 50.5% | 4.3 | 5.8 | 4 | ✅ | 腳 (Leg) | 9 |
| L2 | 11 | ORIENTAL SURPRISE | 15.0% | 47.1% | 3.3 | 3.8 | 1 | ✅ | 腳 (Leg) | 2 ✅ |
| L3 | 9 | KOLACHI | 6.3% | 26.9% | 21 | 16 | 7 | ✅ | 腳 (Leg) | 10 |
| — | 1 | SUPER SICARIO | 5.6% | 26.8% | 15 | 18 | 8 | ❌ | — | 6 |
| L4 | 6 | ALL ARE MINE | 4.3% | 22.2% | 10 | 11 | 5 | ✅ | 腳 (Leg) | 4 |
| — | 12 | PERFECT PAIRING | 3.4% | 17.6% | 33 | 52 | 10 | ❌ | — | 7 |
| — | 10 | WINDICATOR FAMILY | 2.9% | 14.0% | 17 | 13 | 6 | ❌ | — | 3 ✅ |
| L5 | 4 | RED BRICK WARRIOR | 1.4% | 8.6% | 9 | 4.5 | 2 | ✅ | 腳 (Leg) | 1 🏆 |
| — | 5 | TO INFINITY | 0.9% | 6.0% | 21 | 29 | 9 | ❌ | — | 11 |
| — | 2 | SMILING ONE | 0.3% | 2.3% | 44 | 77 | 11 | ❌ | — | 12 |
| — | 7 | CIRCUIT DUFFY | 0.0% | 0.6% | 64 | 114 | 12 | ❌ | — | 8 |

**Top 3:** 4–10–11 · **Outside pool:** #10 · **Banker #3 finished 5**

**Pattern analysis — Pattern C.** MC #1 #3 SOARING BRONCO (43.3% / 77.4%, flagged +125% undervalued) was the market's 3rd choice at 4.8 and ran 5th. The winner was **#4 RED BRICK WARRIOR**: MC 1.4% win / 8.6% place, 9.0 on the racecard and **4.5 at the off**. Step B swapped him in for #1 SUPER SICARIO, who ran 6th, so B-trio covered the winner. 2nd was the favourite #11 (L2). 3rd was **#10 WINDICATOR FAMILY at 13** (MC 14.0%, 8th by MC, market 6th). **Signals missed:** the heavy late support for #4 (racecard odds only, no live refresh) and nothing on #10. It would have needed both a banker switch and #10.

### R2 — Class 4 | 1200m Turf | Good | Trio $2,397

| Seq | # | Horse | MC Win% | MC Place% | Snap odds | SP | Mkt rk (SP) | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----------|----|-------------|------|------|----------|
| ★ | 4 | MATZDEN | 25.6% | 60.2% | 3.9 | 4.5 | 2 | ✅ | 膽 (Banker, MC #1) | 10 |
| L1 | 7 | SILVER SPURS | 24.1% | 57.6% | 8.5 | 9.5 | 5 | ✅ | 腳 (Leg) | 12 |
| L2 | 10 | BITS SUPERSTAR | 20.5% | 53.0% | 5.5 | 6.2 | 3 | ✅ | 腳 (Leg) | 1 🏆 |
| L3 | 3 | LOOKING BRIGHT | 11.3% | 38.6% | 9.2 | 8.9 | 4 | ✅ | 腳 (Leg) | 8 |
| — | 12 | MAJESTIC DELIGHT | 4.7% | 20.4% | 33 | 27 | 10 | ❌ | — | 5 |
| — | 1 | FIND MY LOVE | 4.0% | 18.3% | 19 | 25 | 9 | ❌ | — | 7 |
| L4 | 9 | GOOD LUCK BABE | 3.8% | 17.6% | 3.9 | 3.1 | 1 | ✅ | 腳 (Leg) | 4 |
| — | 11 | LEGEND STAR | 2.5% | 12.1% | 22 | 20 | 8 | ❌ | — | 2 ✅ |
| — | 8 | COUNTRY PRIDE | 1.2% | 7.4% | 17 | 12 | 6 | ❌ | — | 3 ✅ |
| — | 6 | GOLDEN ELITE | 1.1% | 7.4% | 57 | 110 | 12 | ❌ | — | 11 |
| — | 5 | TOURBILLON GOLFER | 0.7% | 4.7% | 15 | 16 | 7 | ❌ | — | 6 |
| — | 2 | VIGOR HAPPINESS | 0.4% | 2.6% | 31 | 56 | 11 | ❌ | — | 9 |

**Top 3:** 8–10–11 · **Outside pool:** #11, #8 · **Banker #4 finished 10**

**Pattern analysis — Pattern C.** Banker #4 MATZDEN (MC 25.6%, joint favourite at 3.9 → 4.5) ran **10th**, and MC #2 #7 SILVER SPURS (24.1%) ran last. #10 BITS SUPERSTAR (L2, MC #3) won. The frame was filled by **#11 LEGEND STAR (20, MC 2.5%)** and **#8 COUNTRY PRIDE (12, MC 1.2%, 2 career starts)**, 8th and 9th by MC. Step B swapped #12 MAJESTIC DELIGHT (5th) for favourite #9 GOOD LUCK BABE (4th): neutral. **Signal missed: none.** Two unfancied placers and a failed co-favourite banker. Unfixable.

### R3 — Class 4 | 1650m Turf | Good | Trio $775

| Seq | # | Horse | MC Win% | MC Place% | Snap odds | SP | Mkt rk (SP) | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----------|----|-------------|------|------|----------|
| ★ | 5 | AMAZING GAZE | 24.9% | 58.3% | 2.8 | 2.7 | 1 | ✅ | 膽 (Banker, MC #1) | 6 |
| L1 | 2 | SHOOTING TO TOP | 24.8% | 59.1% | 4.8 | 6.6 | 3 | ✅ | 腳 (Leg) | 2 ✅ |
| L2 | 7 | DECISION LINK | 14.5% | 44.0% | 10 | 6.8 | 4 | ✅ | 腳 (Leg) | 5 |
| L3 | 3 | RAINBOW SEVEN | 11.3% | 36.9% | 29 | 43 | 11 | ✅ | 腳 (Leg) | 10 |
| L4 | 6 | CASA ROCHESTER | 9.5% | 33.1% | 15 | 17 | 7 | ✅ | 腳 (Leg) | 7 |
| — | 9 | LUCKY TOGETHER | 7.4% | 26.6% | 12 | 15 | 5 | ❌ | — | 11 |
| — | 1 | EXCEED THE LIMIT | 3.4% | 16.0% | 26 | 32 | 9 | ❌ | — | 4 |
| — | 4 | MEGA MASTERMIND | 1.5% | 7.8% | 13 | 15 | 5 | ❌ | — | 8 |
| — | 10 | CALIFORNIA MOXIE | 1.2% | 6.8% | 24 | 35 | 10 | ❌ | — | 9 |
| L5 | 8 | AKERMANIS GOLD | 1.0% | 5.9% | 6 | 4.4 | 2 | ✅ | 腳 (Leg) | 1 🏆 |
| — | 12 | SURE JOYFUL | 0.4% | 3.5% | 22 | 26 | 8 | ❌ | — | 3 ✅ |
| — | 11 | BRIGHT INHERITANCE | 0.1% | 2.0% | 52 | 65 | 12 | ❌ | — | 12 |

**Top 3:** 2–8–12 · **Outside pool:** #12 · **Banker #5 finished 6**

**Pattern analysis — Pattern C.** Banker #5 AMAZING GAZE was both the MC #1 (24.9%, level with #2 at 24.8%) and the **2.7 favourite**, and ran **6th**. MC #2 #2 SHOOTING TO TOP (L1) ran 2nd. The winner was **#8 AKERMANIS GOLD: MC 1.0% win / 5.9% place (11th of 12), 6.0 at the snapshot → 4.4 at the off**. Step B swapped him in for #9 LUCKY TOGETHER (11th), so B-trio covered the winner. Third was **#12 SURE JOYFUL at 26** (MC 0.4%, lowest-weighted runner). **Signals missed:** market support for #8 (MC's worst miss of the card), and nothing on #12. Banking #2 instead of #5 would still miss #12.

### R4 — Class 4 | 1200m Turf | Good | Trio $117

| Seq | # | Horse | MC Win% | MC Place% | Snap odds | SP | Mkt rk (SP) | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----------|----|-------------|------|------|----------|
| ★ | 6 | CLOUD NINE | 34.7% | 69.1% | 1.7 | 1.7 | 1 | ✅ | 膽 (Banker, MC #1) | 2 ✅ |
| L1 | 9 | INVICTUS | 16.5% | 48.2% | 6.6 | 6.1 | 3 | ✅ | 腳 (Leg) | 4 |
| L2 | 8 | CHANCHENG SPARKLE | 11.9% | 40.3% | 23 | 31 | 6 | ✅ | 腳 (Leg) | 8 |
| L3 | 11 | PODIUM | 10.8% | 37.8% | 12 | 12 | 5 | ✅ | 腳 (Leg) | 7 |
| L4 | 4 | BROWNNEEDSFURTHER | 10.6% | 36.8% | 7.5 | 10 | 4 | ✅ | 腳 (Leg) | 1 🏆 |
| L5 | 5 | JOKER ORBIT | 8.3% | 30.4% | 34 | 51 | 8 | ✅ | 腳 (Leg) | 5 |
| L6 | 1 | FRIENDS OF SHAJING | 4.1% | 18.6% | 8.3 | 5.5 | 2 | ✅ | 腳 (Leg) | 3 ✅ |
| — | 12 | FREE PONY | 1.4% | 8.3% | 38 | 56 | 9 | ❌ | — | 6 |
| — | 2 | TACTICAL ACE | 1.3% | 7.4% | 29 | 41 | 7 | ❌ | — | 9 |
| — | 10 | LUCKY XANDER | 0.5% | 3.1% | 53 | 79 | 10 | ❌ | — | 10 |

**Top 3:** 1–4–6 · **Outside pool:** none · **Banker #6 finished 2** · **HIT ✅ $117**

**Pattern analysis — HIT.** MC #1 and the market agreed on #6 CLOUD NINE (1.7). He ran 2nd, beaten by L4 #4 BROWNNEEDSFURTHER (7.5 → 10). The hit was made by **Step B**: #1 FRIENDS OF SHAJING had MC Place% only 18.6% (7th by MC) but was **8.3 at the snapshot (< 10)**. No primary leg was replaceable (#5 JOKER ORBIT at 30.4% was just above the 30% ceiling), so #1 was **added** as a 6th leg. He firmed to 5.5 (market 2nd) and ran 3rd. Strategy A excluded #1 and missed. Return $117 on $150 = **−$33**. The add rescued the race but the chalk-heavy dividend didn't cover the 15-combo ticket.

### R5 — Class 4 | 1650m Turf | Good | Trio $2,378

| Seq | # | Horse | MC Win% | MC Place% | Snap odds | SP | Mkt rk (SP) | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----------|----|-------------|------|------|----------|
| ★ | 1 | GLORIOUS JOURNEY | 22.6% | 56.7% | 12 | 15 | 9 | ✅ | 膽 (Banker, MC #1) | 3 ✅ |
| L1 | 8 | LUCK IS BACK | 20.9% | 53.5% | 7.1 | 5.1 | 2 | ✅ | 腳 (Leg) | 5 |
| L2 | 6 | HAPPY SMILE | 20.8% | 54.4% | 6.5 | 8.7 | 4 | ✅ | 腳 (Leg) | 1 🏆 |
| L3 | 4 | VERMILION TEMPEST | 18.5% | 50.4% | 14 | 9.3 | 5 | ✅ | 腳 (Leg) | 7 |
| L4 | 5 | INNO SUPER | 5.2% | 22.2% | 4 | 5.3 | 3 | ✅ | 腳 (Leg) | 6 |
| L5 | 9 | VIVA FIRECRACKER | 4.1% | 19.8% | 7 | 5 | 1 | ✅ | 腳 (Leg) | 12 |
| — | 3 | IVY LEAGUE | 2.9% | 13.6% | 10 | 9.5 | 6 | ❌ | — | 11 |
| — | 2 | CLASS | 1.5% | 8.1% | 18 | 25 | 10 | ❌ | — | 8 |
| — | 12 | GAZELEY | 1.4% | 7.6% | 13 | 13 | 8 | ❌ | — | 2 ✅ |
| L6 | 7 | DASHING MAURISON | 1.4% | 8.7% | 9 | 10 | 7 | ✅ | 腳 (Leg) | 10 |
| — | 10 | KING OF SELECTION | 0.4% | 2.8% | 30 | 44 | 11 | ❌ | — | 4 |
| — | 11 | HEALTHY PONY | 0.2% | 2.0% | 68 | 101 | 12 | ❌ | — | 9 |

**Top 3:** 1–6–12 · **Outside pool:** #12 · **Banker #1 finished 3**

**Pattern analysis — Pattern B.** MC #1 #1 GLORIOUS JOURNEY (22.6%) was **market 9th at 15** and ran 3rd, a good MC call. L2 #6 HAPPY SMILE (MC 20.8%) won. Second was **#12 GAZELEY at 13** (MC 1.4% / 7.6%, 9th by MC, market 8th). Step B added #9 VIVA FIRECRACKER (the 5.0 favourite at the off, MC 19.8%) and #7 DASHING MAURISON (9.0): they ran 12th and 10th, so $50 of dead stake. **Signal missed: none.** #12 had no model or market support. Trio $2,378.

### R6 — Class 4 | 1000m Turf | Good | Trio $50

| Seq | # | Horse | MC Win% | MC Place% | Snap odds | SP | Mkt rk (SP) | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----------|----|-------------|------|------|----------|
| ★ | 1 | JUMBO BLESSING | 55.9% | 85.4% | 3.1 | 3.5 | 2 | ✅ | 膽 (Banker, MC #1) | 1 🏆 |
| L1 | 4 | SUPERB KING | 10.0% | 41.3% | 2.9 | 2.6 | 1 | ✅ | 腳 (Leg) | 3 ✅ |
| L2 | 5 | GEORGIAN SIGMA | 8.8% | 37.3% | 7.7 | 4 | 3 | ✅ | 腳 (Leg) | 2 ✅ |
| L3 | 11 | HAPPY UNITED | 8.7% | 36.7% | 19 | 27 | 6 | ✅ | 腳 (Leg) | 9 |
| L4 | 3 | BLUE ILLUSION | 4.3% | 22.4% | 27 | 42 | 7 | ✅ | 腳 (Leg) | 6 |
| — | 9 | HARMONY FIRE | 4.0% | 21.5% | 14 | 19 | 5 | ❌ | — | 7 |
| — | 2 | COPPER CORE | 2.6% | 16.0% | 59 | 96 | 11 | ❌ | — | 8 |
| — | 6 | DOUBLE ALPHA | 2.3% | 14.4% | 28 | 44 | 8 | ❌ | — | 5 |
| L5 | 12 | MAPOGO | 1.6% | 10.4% | 6.2 | 8.4 | 4 | ✅ | 腳 (Leg) | 4 |
| — | 8 | FLYING TING LOK | 1.2% | 9.4% | 43 | 49 | 9 | ❌ | — | 10 |
| — | 7 | SECRET INGREDIENT | 0.5% | 3.7% | 47 | 78 | 10 | ❌ | — | 12 |
| — | 10 | CASA BUDDY | 0.1% | 1.4% | 74 | 122 | 12 | ❌ | — | 11 |

**Top 3:** 1–4–5 · **Outside pool:** none · **Banker #1 finished 1** · **HIT ✅ $50**

**Pattern analysis — HIT.** Banker #1 JUMBO BLESSING (MC 55.9% / 85.4%, the card's strongest rating) won. The market's 1st and 3rd choices, #4 SUPERB KING (L1) and #5 GEORGIAN SIGMA (L2), filled the frame. These were MC's #2 and #3 by Win%. Step B swapped #9 HARMONY FIRE (7th) for #12 MAPOGO (4th): neutral. **Chalk trio: $50 on $100 = −$50.** The ticket was right, but no 10-combo ticket profits on this dividend.

### R7 — Class 3 | 1200m Turf | Good | Trio $402

| Seq | # | Horse | MC Win% | MC Place% | Snap odds | SP | Mkt rk (SP) | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----------|----|-------------|------|------|----------|
| ★ | 6 | POWER KOEPP | 21.2% | 53.1% | 22 | 19 | 10 | ✅ | 膽 (Banker, MC #1) | 8 |
| L1 | 3 | AKASHVANI | 18.5% | 48.3% | 7.2 | 9.3 | 5 | ✅ | 腳 (Leg) | 7 |
| L2 | 4 | YOUNG EMPEROR | 16.0% | 44.4% | 17 | 16 | 7 | ✅ | 腳 (Leg) | 11 |
| L3 | 11 | PRESTIGE ALWAYS | 14.9% | 41.4% | 16 | 8.1 | 4 | ✅ | 腳 (Leg) | 1 🏆 |
| L4 | 10 | ANODE | 14.3% | 41.3% | 32 | 17 | 8 | ✅ | 腳 (Leg) | 12 |
| — | 7 | CALIFORNIA BLITZ | 4.5% | 19.9% | 19 | 17 | 8 | ❌ | — | 6 |
| — | 2 | SYMBOL OF STRENGTH | 2.8% | 12.5% | 11 | 14 | 6 | ❌ | — | 5 |
| L7 | 1 | FLYING WROTE | 2.6% | 13.1% | 5 | 5.6 | 2 | ✅ | 腳 (Leg) | 4 |
| L5 | 8 | WUKONG JEWELLERY | 2.6% | 11.5% | 4.2 | 5.9 | 3 | ✅ | 腳 (Leg) | 3 ✅ |
| — | 5 | PASS LINE | 0.9% | 4.9% | 42 | 82 | 12 | ❌ | — | 9 |
| L6 | 12 | DARYL FLASH | 0.9% | 4.7% | 4.4 | 3.5 | 1 | ✅ | 腳 (Leg) | 2 ✅ |
| — | 9 | KING MILES | 0.8% | 4.9% | 16 | 25 | 11 | ❌ | — | 10 |

**Top 3:** 8–11–12 · **Outside pool:** none · **Banker #6 finished 8**

**Pattern analysis — Pattern A (B-trio) / Pattern C (A).** MC #1 #6 POWER KOEPP (21.2%) was **22 at the snapshot, 19 at the off, market 10th**, and ran 8th. Leg #11 PRESTIGE ALWAYS (16 → 8.1) won. The market's top three, **#12 DARYL FLASH (0.9% MC win), #8 WUKONG JEWELLERY (2.6%) and #1 FLYING WROTE (2.6%)**, ran **2nd, 3rd and 4th**. Step B added all three (no replaceable leg), so B-trio held every placer, but the banker failed. **Signal missed:** the market. The report flagged 'MC's top 5 and the market's top 3 do not overlap' and rated it LOW. The model had no view on the three horses the market wanted.

### R8 — Class 3 | 1200m Turf | Good | Trio $300

| Seq | # | Horse | MC Win% | MC Place% | Snap odds | SP | Mkt rk (SP) | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----------|----|-------------|------|------|----------|
| ★ | 11 | LEADING AGILITY | 22.4% | 55.4% | 5.1 | 6.5 | 2 | ✅ | 膽 (Banker, MC #1) | 2 ✅ |
| L1 | 10 | MEOWTH | 20.5% | 52.1% | 23 | 9 | 4 | ✅ | 腳 (Leg) | 7 |
| L2 | 3 | SKY CAP | 17.4% | 48.3% | 15 | 23 | 8 | ✅ | 腳 (Leg) | 10 |
| L3 | 2 | STRAIGHT TO GLORY | 15.3% | 44.0% | 17 | 25 | 9 | ✅ | 腳 (Leg) | 9 |
| L4 | 1 | HARMONY N BLESSED | 10.3% | 34.3% | 17 | 19 | 5 | ✅ | 腳 (Leg) | 12 |
| L5 | 8 | DANICA'S CHOICE | 5.8% | 22.0% | 2.6 | 2 | 1 | ✅ | 腳 (Leg) | 1 🏆 |
| — | 6 | THRIVING BROTHERS | 2.7% | 13.0% | 17 | 22 | 7 | ❌ | — | 3 ✅ |
| L6 | 4 | STAR RISE | 2.6% | 13.2% | 4.9 | 6.8 | 3 | ✅ | 腳 (Leg) | 11 |
| — | 5 | PEGAS | 1.0% | 5.8% | 37 | 34 | 11 | ❌ | — | 4 |
| — | 7 | STORMING DRAGON | 0.9% | 5.6% | 28 | 32 | 10 | ❌ | — | 6 |
| — | 9 | KING LOTUS | 0.9% | 5.3% | 14 | 19 | 5 | ❌ | — | 5 |
| — | 12 | OUTGATE | 0.1% | 1.0% | 40 | 47 | 12 | ❌ | — | 8 |

**Top 3:** 6–8–11 · **Outside pool:** #6 · **Banker #11 finished 2**

**Pattern analysis — Pattern B.** Banker #11 LEADING AGILITY (MC 22.4%, market 2nd at 6.5) ran 2nd. L5 #8 DANICA'S CHOICE, the **2.0 favourite** that MC rated only 5.8% win / 22.0% place, won. It was in the pool only because it cleared the 20% Place bar. Third was **#6 THRIVING BROTHERS at 22** (MC 13.0%, 7th by MC, market 7th). Step B added #4 STAR RISE (4.9, ran 11th). **Signal missed: none** for #6. Note that MC L1 #10 MEOWTH was backed from 23 to 9 and ran 7th.

### R9 — Class 3 | 1800m Turf | Good | Trio $1,065

| Seq | # | Horse | MC Win% | MC Place% | Snap odds | SP | Mkt rk (SP) | Pool | Role | Finished |
|-----|---|-------|---------|-----------|-----------|----|-------------|------|------|----------|
| ★ | 6 | FORTUNATE SON | 21.8% | 50.1% | 11 | 11 | 4 | ✅ | 膽 (Banker, MC #1) | 1 🏆 |
| L1 | 3 | WITHOUT COMPARE | 18.3% | 46.6% | 15 | 14 | 7 | ✅ | 腳 (Leg) | 12 |
| L2 | 7 | ROMANTIC GLADIATOR | 14.6% | 40.2% | 26 | 22 | 10 | ✅ | 腳 (Leg) | 11 |
| L3 | 2 | SERAPH GABRIEL | 11.1% | 33.2% | 3 | 4.4 | 2 | ✅ | 腳 (Leg) | 3 ✅ |
| L4 | 12 | FLYING FORTUNE | 9.6% | 30.3% | 18 | 16 | 9 | ✅ | 腳 (Leg) | 7 |
| — | 5 | FIVEFORTWO | 7.7% | 27.6% | 20 | 24 | 11 | ❌ | — | 2 ✅ |
| L7 | 9 | CHINA WIN | 4.4% | 19.1% | 8.9 | 12 | 6 | ✅ | 腳 (Leg) | 4 |
| L5 | 10 | WINDLORD | 4.3% | 16.3% | 5.5 | 3.1 | 1 | ✅ | 腳 (Leg) | 5 |
| — | 4 | LO RIDER | 3.1% | 12.4% | 16 | 10 | 3 | ❌ | — | 8 |
| — | 8 | THE AUSPICIOUS | 2.4% | 10.7% | 12 | 11 | 4 | ❌ | — | 6 |
| L6 | 1 | KA YING GENERATION | 2.0% | 9.3% | 8.5 | 14 | 7 | ✅ | 腳 (Leg) | 10 |
| — | 11 | KEEFY | 0.7% | 4.4% | 33 | 34 | 12 | ❌ | — | 9 |

**Top 3:** 2–5–6 · **Outside pool:** #5 · **Banker #6 finished 1**

**Pattern analysis — Pattern B (swap-induced).** Banker #6 FORTUNATE SON (MC 21.8%, **market 4th at 11**) **won**. L3 #2 SERAPH GABRIEL (3.0 → 4.4) ran 3rd. Second was **#5 FIVEFORTWO at 24**, a *primary* leg at MC Place% 27.6% (6th by MC). The report's finish-time projection had him fastest. **Step B swapped him out** for #10 WINDLORD (5.5 → 3.1 favourite, MC 16.3%), who ran 5th, and also added #1 (10th) and #9 (4th). **The swap rule directly cost a $1,065 Trio.** Strategy A kept #5 and hit. This is the second meeting in a row where the swap removed a horse that placed.

## B Banker Performance

| Race | B banker (MC #1) | MC Win% | MC Place% | SP | Mkt rank | Placed? | Position |
|------|------------------|---------|-----------|----|----------|---------|----------|
| R1 | #3 SOARING BRONCO | 43.3% | 77.4% | 4.8 | 3 | ❌ | 5th |
| R2 | #4 MATZDEN | 25.6% | 60.2% | 4.5 | 2 | ❌ | 10th |
| R3 | #5 AMAZING GAZE | 24.9% | 58.3% | 2.7 | 1 | ❌ | 6th |
| R4 | #6 CLOUD NINE | 34.7% | 69.1% | 1.7 | 1 | ✅ | 2nd |
| R5 | #1 GLORIOUS JOURNEY | 22.6% | 56.7% | 15 | 9 | ✅ | 3rd |
| R6 | #1 JUMBO BLESSING | 55.9% | 85.4% | 3.5 | 2 | ✅ | 1st |
| R7 | #6 POWER KOEPP | 21.2% | 53.1% | 19 | 10 | ❌ | 8th |
| R8 | #11 LEADING AGILITY | 22.4% | 55.4% | 6.5 | 2 | ✅ | 2nd |
| R9 | #6 FORTUNATE SON | 21.8% | 50.1% | 11 | 4 | ✅ | 1st |

**Banker top 3: 5/9 (55.6%). Banker win: 2/9 (22.2%).**
Mean MC Win% of bankers **30.3%** and mean MC Place% **62.9%**, against an actual place rate of **55.6%**: over-stated by ~7pp (16-Sep: under-stated by ~8pp; 13-Sep: over-stated by ~36pp).

**The market-rank split, now across three meetings:**

| Banker profile (MC #1 market rank at SP) | 13-Sep ST | 16-Sep HV | 23-Sep HV | Combined |
|------------------------------------------|-----------|-----------|-----------|----------|
| Market rank 1–2 | 3/4 | 6/6 | **3/5** | **12/15 (80%)** |
| Market rank 3 | 0/1 | — | **0/1** | 0/2 |
| Market rank 4+ | 0/5 | 0/2 | **2/3** | **2/10 (20%)** |

Rank 1–2 is still the reliable profile. Rank 4+ is poor on strike rate, but its two placers this card included the $1,065 winner (R9). A rule that PASSes rank-4+ bankers needs to be judged on P&L, not strike rate.

## Conclusions for Strategy B

1. **Drop the Step B swap; keep add-only.** The swap has now removed a placer in back-to-back meetings (16-Sep R8 #4 3rd; 23-Sep R9 #5 2nd, costing a $1,065 hit). Two swaps this card brought in winners (R1 #4, R3 #8) but neither race could be hit. Add-only on this card: R9 hits (+$1,065 for +$70 over the swap ticket), and R1/R3 still miss.
2. **Adds are expensive when they don't hit.** This card's adds cost $210 of dead stake (R5 #9/#7, R7 ×3, R8 #4) against one $117 hit (R4). On 16-Sep adds produced both hits. Net over two meetings they are still positive, but thin.
3. **MC's blind spot is market-backed horses it rates near zero.** Runners with MC Win% < 3% and SP ≤ 6 went **4/5 top 3, 2 winners** (R1 #4, R3 #8, R7 #12, R7 #8). Step B is the only thing that covers them, which is the case *for* the add rule. Fixing the MC rating would be better than patching legs.
4. **Chalk races don't pay.** R4 ($117 on $150) and R6 ($50 on $100) were both hits that lost money. On this card, B-trio's hits returned less than their stake.
