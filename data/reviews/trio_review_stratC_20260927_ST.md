# Trio Strategy B (stratC) Review — Sha Tin | 2026-09-27

**Meeting 6 of the 2026/27 season.** 11-race Sunday card: Turf (R2–R4, R6, R8–R11) on **Good to Firm**, AWT (R1, R5, R7) on **Good**, no scratchings. Results: `data/historical/results_20260927_ST.json`. All 11 Trio dividends were cross-checked against the momentum API and match. The scraper truncated the R1 and R6 Quinella dividends ($1 → $1,670, $2 → $2,087), and both have been corrected.

> **Convention for this review.** **Strategy B** = the **post-race-review skill definition**: MC top 6 by raw MC Win%, MC #1 = banker, 1膽+5腳 = 10 combos = **$100/race**, all races. This differs from the 16-Sep and 23-Sep stratC files, which scored the reports' own MC-only ticket. That ticket (**B-trio**: Place% > 20% legs + Win-odds < 10 swap/add, variable stake) is kept below for continuity. **The hit set is identical under both definitions this meeting (R7, R11)**, so the segment statistics are unaffected. Pre-race odds = HKJC early pool at 09:03 HKT. **R6 used SCMP race-card odds** (HKJC odds unavailable; its MC ran without market input).

**Strategy B hit 2/11 (R7 $137, R11 $246) and lost −$717. Strategy A hit the same two races and lost −$567.** Every B banker was also A's banker. Bankers placed 5/11. The six big-dividend races ($720–$3,406) all had a placer rated ≤ 3.9% MC win.

## Rules

**Strategy B (review-spec, used for the headline numbers):**
- **Banker** = MC #1 by raw MC Win% (no debutant rule, no SCMP, no jockey boost)
- **Legs** = MC #2–#6 by raw MC Win% (ties broken by report table order)
- **Unit** $10, structure 膽拖 1膽 + 5腳, C(5,2) = **10 combos = $100**, all races played
- **Hit** = banker top 3 AND all 3 placers in the 6-horse pool

**B-trio (reports' own MC-only ticket, for continuity):**
- **Banker** = MC #1; **primary legs** = every other horse with MC Place% > 20%
- **Step B** = any horse with MC Place% ≤ 20% AND Win odds < 10 replaces the lowest-Place% primary leg that is 20–30% with odds > 10; otherwise it is **added**
- **Unit** $10, 膽拖, combos = C(N,2)

## Summary

| Metric | Strategy B (MC top 6) | Strategy A (as bet) | B-trio (report's B) |
|---|---|---|---|
| Races | 11 | 11 | 11 |
| Hits | **2/11 (18.2%)** | **2/11 (18.2%)** | 2/11 (18.2%) |
| Combos | 110 | 95 | 139 |
| Staked | $1,100 | $950 | $1,390 |
| Returned | $383 | $383 | $383 |
| **Net P&L** | **−$717** | **−$567** | **−$1,007** |
| **ROI** | **−65.2%** | **−59.7%** | **−72.4%** |
| Banker top 3 | 5/11 (45.5%) | 5/11 (45.5%) | 5/11 (45.5%) |

Season Strategy B (review-spec): **7/55, $5,500 staked, $2,765 returned, −$2,735, −49.7%**. Season B-trio: **10/55, $6,960, $2,674, −$4,286, −61.6%**.

## Race-by-Race — Strategy B

| R | Class | Dist | Surf | Banker (MC#1) | Final legs | Combos | Stake | Result | Banker top 3? | Hit? | Trio $ | Return | P&L |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1200m | AWT | #6 | 4, 2, 3, 7, 5 | 10 | $100 | 8→9→3 | ❌ 4th | MISS ❌ | $3,117 | $0 | −100 |
| R2 | Class 4 | 1200m | Turf | #12 | 6, 8, 4, 9, 2 | 10 | $100 | 8→4→7 | ❌ 12th | MISS ❌ | $226 | $0 | −100 |
| R3 | Class 5 | 1400m | Turf | #11 | 2, 1, 3, 9, 14 | 10 | $100 | 12→10→1 | ❌ 5th | MISS ❌ | $1,543 | $0 | −100 |
| R4 | Class 4 | 1000m | Turf | #2 | 1, 5, 4, 13, 9 | 10 | $100 | 6→11→12 | ❌ 12th | MISS ❌ | $802 | $0 | −100 |
| R5 | Class 4 | 1200m | AWT | #5 | 10, 6, 2, 4, 8 | 10 | $100 | 1→5→11 | ✅ 2nd | MISS ❌ | $720 | $0 | −100 |
| R6 | Class 4 | 1400m | Turf | #13 | 4, 1, 2, 8, 12 | 10 | $100 | 10→13→9 | ✅ 2nd | MISS ❌ | $3,406 | $0 | −100 |
| R7 | Class 3 | 1200m | AWT | #1 | 8, 12, 9, 2, 3 | 10 | $100 | 8→12→1 | ✅ 3rd | **HIT ✅** | $137 | $137 | **+37** |
| R8 | Group 3 | 1400m | Turf | #6 | 3, 4, 5, 8, 1 | 10 | $100 | 3→1→7 | ❌ 6th | MISS ❌ | $773 | $0 | −100 |
| R9 | Class 3 | 1600m | Turf | #8 | 1, 13, 4, 2, 6 | 10 | $100 | 8→1→11 | ✅ 1st | MISS ❌ | $173 | $0 | −100 |
| R10 | Class 2 | 1200m | Turf | #3 | 4, 10, 1, 7, 9 | 10 | $100 | 7→9→8 | ❌ 7th | MISS ❌ | $881 | $0 | −100 |
| R11 | Class 3 | 1400m | Turf | #6 | 3, 1, 2, 10, 5 | 10 | $100 | 3→6→1 | ✅ 2nd | **HIT ✅** | $246 | $246 | **+146** |
| **TOTAL** | | | | | | **110** | **$1,100** | | **5/11** | **2/11** | | **$383** | **−717** |

## Race-by-Race — Strategy A

| R | Class | Mode | Banker(s) | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | C5 | B → 8 (Adj Place ≥ 25%) | #6 | 4,2,7,5,3,9,10 | 21 | $210 | 8→9→3 | MISS ❌ | $3,117 | $0 | −210 | Banker 4th + gap #8 (35, MC 0.1%) |
| R2 | C4 | B | #12 | 4,6,8,9,7 | 10 | $100 | 8→4→7 | MISS ❌ | $226 | $0 | −100 | **Banker last — all 3 placers in legs** |
| R3 | C5 | B | #11 | 1,2,3,9,14 | 10 | $100 | 12→10→1 | MISS ❌ | $1,543 | $0 | −100 | Banker 5th + gaps #12 (13), #10 (6.2) |
| R4 | C4 | A | #2 | 1,5,4,13 | 6 | $60 | 6→11→12 | MISS ❌ | $802 | $0 | −60 | Banker 12th + 3 gaps |
| R5 | C4 | A | #5 | 10,6,2,4 | 6 | $60 | 1→5→11 | MISS ❌ | $720 | $0 | −60 | Banker 2nd, gaps #1 (5.4), #11 (19) |
| R6 | C4 | B | #13 | 4,1,2,12,8 | 10 | $100 | 10→13→9 | MISS ❌ | $3,406 | $0 | −100 | Banker 2nd, gaps #10 (20), #9 (5.2) |
| R7 | C3 | A | #1 | 8,9,12,2 | 6 | $60 | 8→12→1 | **HIT ✅** | $137 | $137 | +77 | — |
| R8 | G3 | B | #6 | 3,4,5,8,1 | 10 | $100 | 3→1→7 | MISS ❌ | $773 | $0 | −100 | Banker 6th (fav 1.9) + gap #7 (15) |
| R9 | C3 | A (雙膽拖) | #8 + #1 | 13,4,2 | 3 | $30 | 8→1→11 | MISS ❌ | $173 | $0 | −30 | Bankers 1st/2nd, gap #11 (10, MC 0.0%) |
| R10 | C2 | A → 6 (Adj Place ≥ 25%) | #3 | 4,1,10,9,7 | 10 | $100 | 7→9→8 | MISS ❌ | $881 | $0 | −100 | Banker 7th + gap #8 (7.8) |
| R11 | C3 | A (雙膽拖) | #6 + #3 | 1,2,10 | 3 | $30 | 3→6→1 | **HIT ✅** | $246 | $246 | +216 | — |

## B-trio (report's MC-only ticket) — Race-by-Race, for reference

| R | Banker | Final legs | Step B action | Stake | Hit? | Pattern |
|---|---|---|---|---|---|---|
| R1 | #6 | 4,2,3,7,5,1,9 | #1 replaced #10 | $210 | ❌ | C (#8 gap) — held #9 |
| R2 | #12 | 6,8,4,9,10,7,11 | #10 replaced #2 | $210 | ❌ | **A** (all 3 in legs) |
| R3 | #11 | 2,1,3,8 | — | $60 | ❌ | C |
| R4 | #2 | 1,5,6,3,12 | #3→#13, #6→#4 swaps; add #12 | $100 | ❌ | C — held #6 (1st), #12 (3rd), missed #11 (13 at 09:03) |
| R5 | #5 | 10,6,2,8 | — | $60 | ❌ | B |
| R6 | #13 | 4,1,9,8,12,5 | #9 replaced #2; add #5 | $150 | ❌ | B — held #9 (3rd), missed #10 |
| R7 | #1 | 8,12,9,2,5 | add #5 | $100 | ✅ $137 | — |
| R8 | #6 | 3,4,5,8,1,9,2,7 | none (all 8 > 20% Place) | $280 | ❌ | **A** (all 3 in legs) |
| R9 | #8 | 1,13,4,2 | — | $60 | ❌ | B |
| R10 | #3 | 4,10,1,8,9 | **#8 replaced #7** | $100 | ❌ | C — swap brought in #8 (3rd) but **removed #7 (won)**; banker 7th |
| R11 | #6 | 3,1,2,10 | — | $60 | ✅ $246 | — |

## B Miss Pattern Summary

| Pattern | Count | Races |
|---|---|---|
| **A** — Banker fail, all 3 placers already in legs | **0/9** | — (A had R2; B-trio had R2, R8) |
| **B** — Banker hit, pool gap | **3/9** | R5, R6, R9 |
| **C** — Banker fail + pool gap | **6/9** | R1, R2, R3, R4, R8, R10 |

Bankers placed 5/11. That's worse than 23-Sep (5/9) and 16-Sep (6/8) and close to 13-Sep ST (3/10). **At 09:03 odds, 9 of 11 B bankers were market 1st–2nd, and 4 of those 9 still failed** (R1, R3, R8, R10). Sha Tin bankers are now 11/30 (36.7%) on the season against 60% at HV.

**Noteworthy misses:**

- **R2: the most avoidable miss.** B's 6th slot went to #2 DAILY FUN (5.7% MC, ran 8th) instead of #7 NAVAS G (5.3%, ran 3rd). A's SCMP `+excuses` got that one right, but it made no difference because banker #12 (5.2 → 9.9) ran last. The favourite #8 won, and banking him would have hit $226.
- **R4: 0/3 in pool.** Banker #2 (the report's "+266% undervalued") drifted from 10 to 22. The top two were steamers the MC rated 3.0% and 0.6% (#6 8.6→4.5, #11 13→4.3).
- **R9: a 0.0% horse broke a two-banker race.** #8 and #1 ran 1–2. #11 SHAMUS STORM, MC 14th of 14 and backed from 21 to 10, ran 3rd.
- **R5 and R6: the banker placed and the double gap was unfixable.** Each had a market-backed MC < 3% horse (R5 #1 at 5.4 won; R6 #9 at 5.2, 3rd) plus a genuine outsider (R5 #11 at 19; R6 #10 at 20, MC 0.4%).
- **B-trio's Step B brought in 5 placers in races that still missed**: R4 #6 (won) and #12, R6 #9, R10 #8, plus R1's #9 via its wider primary-leg list. None of those races hit, because either the banker failed or another gap remained. **The swap removed a placer for the third meeting running**: R10 #7 VICTOR THE WINNER (Place 28.0%, 17) was swapped out and **won**. B-trio's R2 and R8 tickets were Pattern A.

## Full MC Place% Table — Per Race

Seq: ★ = 膽 (MC #1 banker), L1–L5 = 腳 by MC Win% rank, — = outside the Strategy B pool. "Pre odds" = the HKJC early-pool odds the report used (09:03); R6 = SCMP race-card odds. SP = final win odds from results. Mkt rk = rank by SP (ties share rank). Pool = in the Strategy B (MC top 6) ticket. In A? = in Strategy A's pool.

### R1 — Class 5 | 1200m AWT | Good | Trio $3,117

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 6 | ONLY U | 30.7% | 64.3% | 2.7 | 4.9 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 4 |
| L1 | 4 | RISING ELITE | 18.0% | 49.4% | 21 | 39 | 10 | ✅ | 腳 (Leg) | ✅ | 9 |
| L2 | 2 | SO MY FOLKS | 10.4% | 34.7% | 7.7 | 6.6 | 5 | ✅ | 腳 (Leg) | ✅ | 6 |
| L3 | 3 | DAILY TROPHY | 9.2% | 30.8% | 9.1 | 6.2 | 4 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L4 | 7 | MR GOOD VIBES | 9.0% | 30.9% | 32 | 57 | 11 | ✅ | 腳 (Leg) | ✅ | 10 |
| L5 | 5 | HAPPY ACTION | 7.4% | 27.0% | 13 | 6.1 | 3 | ✅ | 腳 (Leg) | ✅ | 7 |
| — | 10 | VON BAER | 6.9% | 26.1% | 18 | 12 | 7 | ❌ | — | ✅ | 11 |
| — | 9 | GIMME FIVE | 6.4% | 23.4% | 6.9 | 7.8 | 6 | ❌ | — | ✅ | 2 ✅ |
| — | 1 | ROBOT KNIGHT | 1.4% | 8.5% | 5.5 | 4.7 | 1 | ❌ | — | ❌ | 8 |
| — | 12 | TURF PHOENIX | 0.4% | 3.2% | 35 | 27 | 8 | ❌ | — | ❌ | 5 |
| — | 11 | HANDSOME BLOND | 0.1% | 1.0% | 44 | 72 | 12 | ❌ | — | ❌ | 12 |
| — | 8 | WAVE GARDEN | 0.1% | 0.8% | 34 | 35 | 9 | ❌ | — | ❌ | 1 🏆 |

**Top 3:** 3–8–9 · **Outside B pool:** #8, #9 · **Banker #6 finished 4**

**Pattern analysis — Pattern C.** MC #1 #6 ONLY U (30.7%, the 2.7 favourite at 09:03) **drifted to 4.9** and ran 4th. The winner was **#8 WAVE GARDEN: MC 0.1% win / 0.8% place, 12th of 12, SP 35** (SCMP `+excuses`). 2nd was #9 GIMME FIVE (MC 8th, 6.9 → 7.8), which was in A's expanded 8-horse pool but not B's top 6. L3 #3 DAILY TROPHY ran 3rd. **Signals missed:** the banker drift, plus #9's short price (< 10 and MC Place 23.4%). Nothing pointed to #8. The MC's 'undervalued' #4 RISING ELITE (21 → 39) ran 9th.

### R2 — Class 4 | 1200m Turf | Good to Firm | Trio $226

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 12 | GLACIATED | 25.6% | 55.7% | 5.2 | 9.9 | 5 | ✅ | 膽 (Banker, MC #1) | ✅ | 12 |
| L1 | 6 | KYOTO SPRING | 14.3% | 38.0% | 20 | 52 | 11 | ✅ | 腳 (Leg) | ✅ | 9 |
| L2 | 8 | APEX GLORY | 12.3% | 36.1% | 4.6 | 3 | 1 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L3 | 4 | LITTLE MONSTER | 11.8% | 36.3% | 7 | 4.6 | 2 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L4 | 9 | RYUI KOKOROE | 8.8% | 28.8% | 13 | 21 | 7 | ✅ | 腳 (Leg) | ✅ | 6 |
| L5 | 2 | DAILY FUN | 5.7% | 20.9% | 37 | 29 | 9 | ✅ | 腳 (Leg) | ❌ | 8 |
| — | 1 | NOT USUAL DOUBLE | 5.6% | 19.7% | 15 | 34 | 10 | ❌ | — | ❌ | 4 |
| — | 7 | NAVAS G | 5.3% | 20.5% | 9.9 | 12 | 6 | ❌ | — | ✅ | 3 ✅ |
| — | 11 | SUPER DRAGON | 5.1% | 20.3% | 8.4 | 9.3 | 4 | ❌ | — | ❌ | 7 |
| — | 10 | JUST FOLLOW ME | 3.2% | 13.1% | 6.1 | 4.9 | 3 | ❌ | — | ❌ | 5 |
| — | 3 | ULTRA BOLT | 1.8% | 7.2% | 75 | 145 | 12 | ❌ | — | ❌ | 10 |
| — | 5 | SOO KOO | 0.6% | 3.4% | 21 | 27 | 8 | ❌ | — | ❌ | 11 |

**Top 3:** 4–7–8 · **Outside B pool:** #7 · **Banker #12 finished 12**

**Pattern analysis — Pattern C (B) / Pattern A (A).** Banker #12 GLACIATED (MC 25.6%) drifted from **5.2 to 9.9** and **ran last**. The market favourite #8 APEX GLORY (3.0, MC 12.3%, L2) won, and #4 LITTLE MONSTER (4.6, L3) was 2nd. Third was **#7 NAVAS G at 12** (MC 5.3% / 20.5%, 8th by MC). B's 6th slot went to #2 DAILY FUN (5.7%), who ran 8th. A's SCMP `+excuses` lifted #7 into its pool, so A held all three placers. **Signals missed:** the report's explicit divergence note ('MC #1 #12 vs market favourite #8 at MC 12.3%') and #12's drift. Banking #8 with the same legs would have hit $226.

### R3 — Class 5 | 1400m Turf | Good to Firm | Trio $1,543

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 11 | DRACO | 27.2% | 60.3% | 4.9 | 4.2 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 5 |
| L1 | 2 | DOUBLE BINGO | 18.5% | 49.3% | 8.1 | 10 | 4 | ✅ | 腳 (Leg) | ✅ | 10 |
| L2 | 1 | FOREVER FANCY | 16.6% | 44.6% | 4.9 | 5.7 | 2 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L3 | 3 | FORTUNE SUPERNOVA | 9.6% | 30.5% | 13 | 19 | 10 | ✅ | 腳 (Leg) | ✅ | 8 |
| L4 | 9 | ALWAYS FLUKE | 8.8% | 29.8% | 15 | 15 | 9 | ✅ | 腳 (Leg) | ✅ | 12 |
| L5 | 14 | PRINCE ALEX | 4.9% | 19.6% | 35 | 56 | 13 | ✅ | 腳 (Leg) | ✅ | 6 |
| — | 10 | AQUAMAN | 3.9% | 16.9% | 11 | 6.2 | 3 | ❌ | — | ❌ | 2 ✅ |
| — | 12 | VIGOR ELLEEGANT | 3.9% | 16.0% | 25 | 13 | 6 | ❌ | — | ❌ | 1 🏆 |
| — | 7 | SWAGGER BRO | 3.5% | 15.8% | 13 | 27 | 12 | ❌ | — | ❌ | 14 |
| — | 4 | STORMY KNIGHT | 2.4% | 11.2% | 11 | 11 | 5 | ❌ | — | ❌ | 13 |
| — | 13 | BLUE BARON | 0.4% | 2.6% | 29 | 24 | 11 | ❌ | — | ❌ | 7 |
| — | 5 | LEAN MASTER | 0.2% | 1.6% | 15 | 13 | 6 | ❌ | — | ❌ | 9 |
| — | 8 | SILVER UP | 0.1% | 1.7% | 9.3 | 13 | 6 | ❌ | — | ❌ | 11 |
| — | 6 | PRESTIGE SUPERIOR | 0.0% | 0.2% | 54 | 74 | 14 | ❌ | — | ❌ | 4 |

**Top 3:** 1–10–12 · **Outside B pool:** #12, #10 · **Banker #11 finished 5**

**Pattern analysis — Pattern C.** Banker #11 DRACO (MC 27.2%) was the **4.2 favourite** and ran 5th. L2 #1 FOREVER FANCY (5.7) ran 3rd. The two placers ahead of him were **#12 VIGOR ELLEEGANT (25 → 13, won)** and **#10 AQUAMAN (11 → 6.2, 2nd)**. Both were MC 3.9% win / 16–17% place (7th/8th by MC), both carried SCMP `+excuses`, and both were **steamers**. **Signal missed:** the late money on #10 and #12. At 09:03 neither was under 10, so no odds rule would have added them.

### R4 — Class 4 | 1000m Turf | Good to Firm | Trio $802

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 2 | RUN RUN SUNRISE | 36.6% | 68.9% | 10 | 22 | 9 | ✅ | 膽 (Banker, MC #1) | ✅ | 12 |
| L1 | 1 | RAPID PHANTOM | 21.4% | 55.7% | 4.8 | 4.9 | 3 | ✅ | 腳 (Leg) | ✅ | 4 |
| L2 | 5 | HERO MASTERMIND | 9.2% | 31.6% | 36 | 66 | 13 | ✅ | 腳 (Leg) | ✅ | 10 |
| L3 | 4 | KINGMAN REEF | 8.5% | 28.6% | 14 | 37 | 10 | ✅ | 腳 (Leg) | ✅ | 13 |
| L4 | 13 | LET'S HAVE FUN | 5.6% | 23.2% | 14 | 7.9 | 4 | ✅ | 腳 (Leg) | ✅ | 5 |
| L5 | 9 | THUNDER PRINCE | 4.6% | 19.6% | 13 | 12 | 6 | ✅ | 腳 (Leg) | ❌ | 7 |
| — | 6 | FLOWING RICHES | 3.0% | 13.6% | 8.6 | 4.5 | 2 | ❌ | — | ❌ | 1 🏆 |
| — | 3 | HARVEST MOON | 2.6% | 12.9% | 5.1 | 11 | 5 | ❌ | — | ❌ | 8 |
| — | 10 | SHOW ME YOUR LOVE | 2.4% | 11.4% | 35 | 53 | 12 | ❌ | — | ❌ | 11 |
| — | 14 | COMET RADIANCE | 2.1% | 11.3% | 15 | 18 | 8 | ❌ | — | ❌ | 6 |
| — | 8 | GIANT SPIRIT | 1.8% | 9.9% | 19 | 41 | 11 | ❌ | — | ❌ | 9 |
| — | 12 | SUPREME VOYAGER | 0.9% | 5.0% | 9.1 | 14 | 7 | ❌ | — | ❌ | 3 ✅ |
| — | 7 | FLYING TING LOK | 0.7% | 4.2% | 33 | 71 | 14 | ❌ | — | ❌ | 14 |
| — | 11 | ZOUPER FELLOW | 0.6% | 4.1% | 13 | 4.3 | 1 | ❌ | — | ❌ | 2 ✅ |

**Top 3:** 6–11–12 · **Outside B pool:** #6, #11, #12 · **Banker #2 finished 12**

**Pattern analysis — Pattern C (0/3 in pool).** Banker #2 RUN RUN SUNRISE (MC 36.6%, the report's '+266% undervalued' horse) went from **10 to 22** (market 9th) and ran 12th. **All three placers came from MC's bottom half:** #6 FLOWING RICHES (MC 3.0%, **8.6 → 4.5**, won), **#11 ZOUPER FELLOW (MC 0.6% / 4.1%, 13 → 4.3, the SP favourite)** 2nd, and #12 SUPREME VOYAGER (MC 0.9%, 9.1 → 14) 3rd. This is the clearest case on the card of the MC disagreeing with a strong market move and being wrong. **Signals missed:** the banker's drift and two steamers.

### R5 — Class 4 | 1200m AWT | Good | Trio $720

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 5 | ARMOUR WAR EAGLE | 51.1% | 84.0% | 6.6 | 5.2 | 3 | ✅ | 膽 (Banker, MC #1) | ✅ | 2 ✅ |
| L1 | 10 | NOBLE DELUXE | 19.8% | 60.9% | 14 | 19 | 6 | ✅ | 腳 (Leg) | ✅ | 12 |
| L2 | 6 | BRIGHT MORTAR | 10.3% | 44.8% | 2.2 | 3.4 | 1 | ✅ | 腳 (Leg) | ✅ | 5 |
| L3 | 2 | CENTRAL BANK | 6.3% | 31.8% | 9.3 | 4.5 | 2 | ✅ | 腳 (Leg) | ✅ | 4 |
| L4 | 4 | NATURAL HIGH | 4.4% | 23.5% | 19 | 24 | 9 | ✅ | 腳 (Leg) | ✅ | 10 |
| L5 | 8 | LUCKY DOCTOR | 2.9% | 17.4% | 9.9 | 15 | 5 | ✅ | 腳 (Leg) | ❌ | 6 |
| — | 7 | M M CONCORD | 1.9% | 13.8% | 16 | 21 | 8 | ❌ | — | ❌ | 9 |
| — | 11 | RAGING WARRIOR | 1.8% | 11.1% | 18 | 19 | 6 | ❌ | — | ❌ | 3 ✅ |
| — | 1 | CAUSEWAY KING | 1.0% | 7.6% | 10 | 5.4 | 4 | ❌ | — | ❌ | 1 🏆 |
| — | 9 | JOLTIN | 0.3% | 2.8% | 32 | 30 | 10 | ❌ | — | ❌ | 7 |
| — | 12 | DASHING PEACH | 0.2% | 1.4% | 56 | 36 | 11 | ❌ | — | ❌ | 11 |
| — | 3 | WATCH LEGEND | 0.1% | 0.9% | 67 | 89 | 12 | ❌ | — | ❌ | 8 |

**Top 3:** 1–5–11 · **Outside B pool:** #1, #11 · **Banker #5 finished 2**

**Pattern analysis — Pattern B.** Banker #5 ARMOUR WAR EAGLE (MC 51.1% / 84.0%, the card's highest MC #1) ran 2nd at 5.2. The winner was **#1 CAUSEWAY KING (MC 1.0% / 7.6%, 10 → 5.4)**, and 3rd was **#11 RAGING WARRIOR (MC 1.8%, 18 → 19, 0 starts / `+trial`)**. The favourite #6 BRIGHT MORTAR (L2, 3.4) ran 5th. **Signal missed:** #1's steam from 10 to 5.4, which a near-off odds refresh would have shown. #11 had no support from either the model or the market.

### R6 — Class 4 | 1400m Turf | Good to Firm | Trio $3,406

| Seq | # | Horse | Win% | Place% | SCMP odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 13 | SUPER LOVE | 28.9% | 62.5% | 6 | 11 | 8 | ✅ | 膽 (Banker, MC #1) | ✅ | 2 ✅ |
| L1 | 4 | HAROLD WIN | 23.9% | 58.0% | 8.2 | 4.6 | 1 | ✅ | 腳 (Leg) | ✅ | 7 |
| L2 | 1 | ETALON OR | 19.1% | 52.4% | 7.6 | 6 | 3 | ✅ | 腳 (Leg) | ✅ | 4 |
| L3 | 2 | TURIN CHAMPIONS | 5.0% | 20.5% | 17 | 9.8 | 5 | ✅ | 腳 (Leg) | ✅ | 10 |
| L4 | 8 | LUCKY MAN | 4.9% | 20.9% | 7.8 | 9.9 | 6 | ✅ | 腳 (Leg) | ✅ | 8 |
| L5 | 12 | HOT AIR BALLON | 4.9% | 20.2% | 10 | 9.7 | 4 | ✅ | 腳 (Leg) | ✅ | 5 |
| — | 9 | GHORGAN | 2.7% | 12.3% | 6.1 | 5.2 | 2 | ❌ | — | ❌ | 3 ✅ |
| — | 3 | CIRCUIT FIERY | 2.4% | 11.7% | 16 | 20 | 9 | ❌ | — | ❌ | 9 |
| — | 5 | BUCEPHALAS | 2.3% | 11.1% | 8 | 10 | 7 | ❌ | — | ❌ | 6 |
| — | 7 | HEY BROS | 2.2% | 10.7% | 50 | 144 | 14 | ❌ | — | ❌ | 14 |
| — | 11 | GOLDEN GUNNERS | 1.8% | 8.5% | 37 | 110 | 13 | ❌ | — | ❌ | 13 |
| — | 6 | GREEN AUTUMN | 1.4% | 7.1% | 16 | 52 | 11 | ❌ | — | ❌ | 11 |
| — | 10 | CHIU CHOW GOLF | 0.4% | 2.5% | 28 | 20 | 9 | ❌ | — | ❌ | 1 🏆 |
| — | 14 | WORD OF KINDNESS | 0.2% | 1.7% | 37 | 92 | 12 | ❌ | — | ❌ | 12 |

**Top 3:** 9–10–13 · **Outside B pool:** #10, #9 · **Banker #13 finished 2**

**Pattern analysis — Pattern B.** *HKJC odds were unavailable, so MC ran with no market input and the odds column shows SCMP race-card prices.* Banker #13 SUPER LOVE (MC 28.9%) drifted from **6.0 (SCMP) to 11** and still ran 2nd. The winner was **#10 CHIU CHOW GOLF at 20**: MC 0.4% / 2.5%, 13th of 14, only 2 career starts (sparse-form caveat), SCMP `+excuses`. Third was **#9 GHORGAN** (MC 2.7% / 12.3%, 6.1 SCMP → 5.2 SP, market 2nd), which the report had called 'SCMP favourite-ish'. **Signals missed:** #9's market position. #10 was a sparse-form outlier. Trio $3,406.

### R7 — Class 3 | 1200m AWT | Good | Trio $137

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 1 | AURORA PATCH | 48.7% | 84.1% | 8.1 | 4.9 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 3 ✅ |
| L1 | 8 | BUSTLING CITY | 19.3% | 59.1% | 1.8 | 1.7 | 1 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L2 | 12 | SPEEDY SMARTIE | 9.8% | 43.1% | 19 | 15 | 5 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L3 | 9 | PACKING KING | 8.9% | 38.4% | 10 | 11 | 3 | ✅ | 腳 (Leg) | ✅ | 12 |
| L4 | 2 | MIGHTY COMMANDER | 8.6% | 38.0% | 25 | 19 | 6 | ✅ | 腳 (Leg) | ✅ | 7 |
| L5 | 3 | RIDING TOGETHER | 2.4% | 15.5% | 23 | 33 | 8 | ✅ | 腳 (Leg) | ❌ | 6 |
| — | 10 | DEVAS TWELVE | 1.3% | 10.1% | 46 | 84 | 11 | ❌ | — | ❌ | 11 |
| — | 6 | NOTTHESILLYONE | 0.4% | 4.4% | 13 | 21 | 7 | ❌ | — | ❌ | 8 |
| — | 4 | ALL'S WELL | 0.3% | 3.8% | 33 | 38 | 9 | ❌ | — | ❌ | 10 |
| — | 11 | ENDURANCE EXPRESS | 0.1% | 1.6% | 41 | 57 | 10 | ❌ | — | ❌ | 5 |
| — | 5 | FOUR STARS ALIGN | 0.1% | 1.8% | 7.1 | 11 | 3 | ❌ | — | ❌ | 4 |
| — | 7 | HOTT SHOTT | 0.0% | 0.2% | 41 | 96 | 12 | ❌ | — | ❌ | 9 |

**Top 3:** 1–8–12 · **Outside B pool:** none · **Banker #1 finished 3** · **HIT ✅ $137**

**Pattern analysis — HIT.** MC's top 3 by Win% (#1, #8, #12) were exactly the top 3. Banker #1 AURORA PATCH (48.7% / 84.1%) was backed from **8.1 to 4.9** and ran 3rd. L1 #8 BUSTLING CITY (1.7 fav) won and L2 #12 SPEEDY SMARTIE (15) was 2nd. The MC and the market agreed on the shape. $137 on the $100 B ticket = +$37 (A: +$77 on $60).

### R8 — Group 3 | 1400m Turf | Good to Firm | Trio $773

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 6 | LITTLE PARADISE | 30.6% | 63.7% | 1.9 | 1.9 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 6 |
| L1 | 3 | INVINCIBLE IBIS | 15.3% | 44.2% | 5.4 | 8.8 | 4 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L2 | 4 | PATCH OF THETA | 13.7% | 40.2% | 24 | 31 | 8 | ✅ | 腳 (Leg) | ✅ | 7 |
| L3 | 5 | COPARTNER PRANCE | 8.7% | 30.4% | 17 | 6.6 | 3 | ✅ | 腳 (Leg) | ✅ | 4 |
| L4 | 8 | LUCKY WITH YOU | 8.7% | 30.2% | 18 | 23 | 7 | ✅ | 腳 (Leg) | ✅ | 9 |
| L5 | 1 | GALAXY PATCH | 7.0% | 26.3% | 8.6 | 5.7 | 2 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| — | 9 | SOLEIL FIGHTER | 5.7% | 22.4% | 32 | 52 | 9 | ❌ | — | ❌ | 5 |
| — | 2 | HELIOS EXPRESS | 5.3% | 21.5% | 6.4 | 10 | 5 | ❌ | — | ❌ | 8 |
| — | 7 | STORMY GROVE | 5.0% | 21.1% | 21 | 15 | 6 | ❌ | — | ❌ | 3 ✅ |

**Top 3:** 1–3–7 · **Outside B pool:** #7 · **Banker #6 finished 6**

**Pattern analysis — Pattern C.** In the 9-runner Group 3, banker #6 LITTLE PARADISE (MC 30.6%, **1.9 favourite**, `+excuses +trial`) ran 6th. L1 #3 INVINCIBLE IBIS (5.4 → 8.8) won and L5 #1 GALAXY PATCH (8.6 → 5.7) was 2nd. Third was **#7 STORMY GROVE at 15**: MC 5.0% / 21.1%, **last of 9 by MC**, and carrying a `-injury30d` penalty. In a 9-runner field, the 3 horses outside the MC top 6 all had MC Place% ≥ 21%, so the model rated the field as very flat. **Signal missed:** none specific. The Group 3 favourite simply failed.

### R9 — Class 3 | 1600m Turf | Good to Firm | Trio $173

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 8 | PACKING FIGHTER | 35.7% | 73.0% | 2.4 | 1.7 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 1 | AMAZING PARTNERS | 26.2% | 64.7% | 5.1 | 9 | 2 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L2 | 13 | FLYING KNIGHT | 12.7% | 45.1% | 15 | 12 | 4 | ✅ | 腳 (Leg) | ✅ | 13 |
| L3 | 4 | SOLID WIN | 11.0% | 39.2% | 18 | 33 | 8 | ✅ | 腳 (Leg) | ✅ | 7 |
| L4 | 2 | MISTER DAPPER | 7.0% | 29.8% | 25 | 33 | 8 | ✅ | 腳 (Leg) | ✅ | 4 |
| L5 | 6 | ALL OUT FOR SIX | 2.2% | 13.0% | 28 | 43 | 12 | ✅ | 腳 (Leg) | ❌ | 9 |
| — | 7 | VIOLET STAR | 2.2% | 12.6% | 18 | 34 | 10 | ❌ | — | ❌ | 12 |
| — | 9 | BIG RETURN | 1.2% | 8.0% | 15 | 25 | 7 | ❌ | — | ❌ | 5 |
| — | 3 | FALLON | 1.0% | 7.5% | 16 | 45 | 13 | ❌ | — | ❌ | 10 |
| — | 5 | FLYING LUCK | 0.7% | 4.9% | 17 | 42 | 11 | ❌ | — | ❌ | 11 |
| — | 14 | QUANTUM LEGEND | 0.1% | 1.4% | 22 | 12 | 4 | ❌ | — | ❌ | 6 |
| — | 10 | NUCLEOZOR | 0.1% | 0.6% | 13 | 19 | 6 | ❌ | — | ❌ | 8 |
| — | 12 | VOYAGE HORIZON | 0.0% | 0.1% | 45 | 131 | 14 | ❌ | — | ❌ | 14 |
| — | 11 | SHAMUS STORM | 0.0% | 0.2% | 21 | 10 | 3 | ❌ | — | ❌ | 3 ✅ |

**Top 3:** 1–8–11 · **Outside B pool:** #11 · **Banker #8 finished 1**

**Pattern analysis — Pattern B.** MC #1 #8 PACKING FIGHTER (1.7 fav) won and L1 #1 AMAZING PARTNERS was 2nd. Third was **#11 SHAMUS STORM: MC 0.0% win / 0.2% place, 14th of 14**, backed from **21 to 10**. No rule based on the MC or the 09:03 odds could have included him. The MC's 'overvalued 100%' flag on #11 was the single worst calibration miss of the card.

### R10 — Class 2 | 1200m Turf | Good to Firm | Trio $881

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 3 | RISING FORCE | 38.9% | 72.3% | 3.2 | 3.7 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 7 |
| L1 | 4 | SKY TRUST | 12.5% | 38.4% | 15 | 26 | 10 | ✅ | 腳 (Leg) | ✅ | 11 |
| L2 | 10 | GENEVA | 11.4% | 38.2% | 7 | 5.7 | 3 | ✅ | 腳 (Leg) | ✅ | 4 |
| L3 | 1 | STORM RIDER | 10.0% | 33.6% | 30 | 20 | 7 | ✅ | 腳 (Leg) | ✅ | 5 |
| L4 | 7 | VICTOR THE WINNER | 7.7% | 28.0% | 17 | 14 | 5 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L5 | 9 | TURQUOISE VELOCITY | 7.3% | 28.5% | 8.8 | 3.6 | 1 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| — | 6 | YOUNG CHAMPION | 3.7% | 17.2% | 11 | 22 | 8 | ❌ | — | ❌ | 8 |
| — | 2 | MUGEN | 3.4% | 15.7% | 16 | 40 | 12 | ❌ | — | ❌ | 10 |
| — | 5 | AERIS NOVA | 3.1% | 15.1% | 14 | 14 | 5 | ❌ | — | ❌ | 9 |
| — | 8 | SALON S | 1.1% | 7.7% | 5.8 | 7.8 | 4 | ❌ | — | ❌ | 3 ✅ |
| — | 11 | PAKISTAN LEGACY | 0.7% | 4.3% | 16 | 34 | 11 | ❌ | — | ❌ | 12 |
| — | 12 | GLOWING PRAISES | 0.1% | 0.9% | 21 | 24 | 9 | ❌ | — | ❌ | 6 |

**Top 3:** 7–8–9 · **Outside B pool:** #8 · **Banker #3 finished 7**

**Pattern analysis — Pattern C.** Banker #3 RISING FORCE (MC 38.9%, the 3.2 favourite at 09:03 → 3.7) ran 7th. L4 #7 VICTOR THE WINNER (14, `-age +form`) won, and L5 #9 TURQUOISE VELOCITY (**8.8 → 3.6**, the SP favourite) was 2nd. Third was **#8 SALON S (MC 1.1% / 7.7%, 5.8 → 7.8)**, on a four-race winning streak, whom the report explicitly excluded ('class rise / gate 11 bites'). The report's 'undervalued' #1 STORM RIDER ran 5th. **Signals missed:** #8's short price (< 10) and #9's steam.

### R11 — Class 3 | 1400m Turf | Good to Firm | Trio $246

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 6 | CIRCUIT CHAMPION | 47.3% | 83.6% | 3.3 | 2 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 2 ✅ |
| L1 | 3 | AEROINVINCIBLE | 26.0% | 69.8% | 5.9 | 5.8 | 2 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L2 | 1 | LUCKY SAM GOR | 12.0% | 50.0% | 16 | 25 | 7 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L3 | 2 | THE RED HARE | 5.5% | 29.4% | 9.4 | 9.7 | 4 | ✅ | 腳 (Leg) | ✅ | 7 |
| L4 | 10 | FORZA TORO | 5.1% | 29.1% | 9.3 | 17 | 5 | ✅ | 腳 (Leg) | ✅ | 9 |
| L5 | 5 | THUNDER BLAZE | 1.0% | 7.8% | 24 | 42 | 10 | ✅ | 腳 (Leg) | ❌ | 4 |
| — | 8 | ENDEARED | 1.0% | 9.7% | 13 | 29 | 9 | ❌ | — | ❌ | 10 |
| — | 12 | THE BOOM BOX | 0.7% | 7.3% | 22 | 62 | 11 | ❌ | — | ❌ | 5 |
| — | 9 | NORTHERN FIRE BALL | 0.5% | 5.2% | 35 | 92 | 12 | ❌ | — | ❌ | 14 |
| — | 7 | COMPLETE UNKNOWN | 0.3% | 4.0% | 12 | 6.9 | 3 | ❌ | — | ❌ | 12 |
| — | 4 | BEAUTY CRESCENT | 0.2% | 1.8% | 12 | 18 | 6 | ❌ | — | ❌ | 6 |
| — | 13 | VULCANUS | 0.1% | 0.9% | 34 | 139 | 14 | ❌ | — | ❌ | 11 |
| — | 14 | DRAGON JOY | 0.1% | 0.7% | 17 | 27 | 8 | ❌ | — | ❌ | 13 |
| — | 11 | PRIME SUCCESS | 0.1% | 0.7% | 33 | 102 | 13 | ❌ | — | ❌ | 8 |

**Top 3:** 1–3–6 · **Outside B pool:** none · **Banker #6 finished 2** · **HIT ✅ $246**

**Pattern analysis — HIT.** MC #1 #6 CIRCUIT CHAMPION (47.3% / 83.6%, 3.3 → 2.0 fav) ran 2nd. MC #2 #3 AEROINVINCIBLE (5.8) won and MC #3 #1 LUCKY SAM GOR (**25**, MC 50% place, the report's 'undervalued' flag) was 3rd. The MC top 3 by Win% were exactly the top 3. $246 on B's $100 = +$146 (A 雙膽拖 $30 → +$216).

## B Banker Performance

| Race | B banker (MC #1) | MC Win% | MC Place% | Pre odds | SP | Mkt rank (SP) | Placed? | Position |
|------|------------------|---------|-----------|----------|----|---------------|---------|----------|
| R1 | #6 ONLY U | 30.7% | 64.3% | 2.7 | 4.9 | 2 | ❌ | 4th |
| R2 | #12 GLACIATED | 25.6% | 55.7% | 5.2 | 9.9 | 5 | ❌ | 12th |
| R3 | #11 DRACO | 27.2% | 60.3% | 4.9 | 4.2 | 1 | ❌ | 5th |
| R4 | #2 RUN RUN SUNRISE | 36.6% | 68.9% | 10 | 22 | 9 | ❌ | 12th |
| R5 | #5 ARMOUR WAR EAGLE | 51.1% | 84.0% | 6.6 | 5.2 | 3 | ✅ | 2nd |
| R6 | #13 SUPER LOVE | 28.9% | 62.5% | 6.0 (SCMP) | 11 | 8 | ✅ | 2nd |
| R7 | #1 AURORA PATCH | 48.7% | 84.1% | 8.1 | 4.9 | 2 | ✅ | 3rd |
| R8 | #6 LITTLE PARADISE | 30.6% | 63.7% | 1.9 | 1.9 | 1 | ❌ | 6th |
| R9 | #8 PACKING FIGHTER | 35.7% | 73.0% | 2.4 | 1.7 | 1 | ✅ | 1st |
| R10 | #3 RISING FORCE | 38.9% | 72.3% | 3.2 | 3.7 | 2 | ❌ | 7th |
| R11 | #6 CIRCUIT CHAMPION | 47.3% | 83.6% | 3.3 | 2.0 | 1 | ✅ | 2nd |

**Banker top 3: 5/11 (45.5%). Banker win: 1/11 (9.1%).**
Mean MC Win% of bankers **36.5%** and mean MC Place% **70.2%**, against an actual place rate of **45.5%**: over-stated by ~25pp (23-Sep: +7pp; 16-Sep: −8pp; 13-Sep: +36pp). Bankers with MC Win% ≥ 45% (R5, R7, R11) placed **3/3**. Bankers at 25–40% placed **2/8**.

**Market-rank split (SP), four meetings:**

| Banker profile (MC #1 market rank at SP) | 13-Sep ST | 16-Sep HV | 23-Sep HV | 27-Sep ST | Combined |
|------------------------------------------|-----------|-----------|-----------|-----------|----------|
| Market rank 1–2 | 3/4 | 6/6 | 3/5 | **3/7** | **15/22 (68.2%)** |
| Market rank 3 | 0/1 | — | 0/1 | **1/1** | 1/3 |
| Market rank 4+ | 0/5 | 0/2 | 2/3 | **1/3** | **3/13 (23.1%)** |

**Banker drift (09:03 → SP ≥ 1.6×):** R1, R2, R4 and R6 drifted, and only R6 placed (1/4). The bankers that held or shortened placed 4/7.

## Conclusions for Strategy B

1. **Selection is the same as A and sizing is worse.** Across six meetings B and A have hit identical races (7/55). B's flat $100 costs $420 more than A's mode-sized tickets, and $150 of that came this card, mostly from Dominant races where A used 3–6 combos.
2. **MC #1 ≥ 45% Win% is the one reliable banker profile on this card (3/3).** The 25–40% bankers went 2/8. Test a rule that plays B only when MC #1 ≥ 40%, or sizes the stake by MC #1 strength.
3. **The MC's near-zero ratings on market-backed horses are the main leak.** Runners with MC Win% < 3% and SP ≤ 6 placed 3/4 this card and 7/9 over two meetings. Late steamers (≥ 1.6× shorter than at 09:03) placed 9/17. Both need near-off odds, which the 09:03 snapshot doesn't provide.
4. **Don't read the report's "undervalued" flag as value.** It went 3/14 top 3 this card, and 0/5 where the claimed edge was > 200%.
