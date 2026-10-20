# Trio Strategy B (stratC) Review — Sha Tin | 2026-10-19

**Meeting 12 of the 2026/27 season.** An 11-race Monday card, all Turf, with going **Good** (R1–R8) and **Good to Firm** (R9–R11). Results: `data/historical/results_20261019_ST.json` (already scraped, DT ✓, TT ✓, not re-scraped). Every Trio dividend parsed in full, and the Tierce/Trio ratios (3.3–11.3) fit the finishing SPs. The Win/Quinella fields have truncated comma-thousands values (R1 Q $1, R2 Q $2, R3 Win $1). Those fields are not used here and were not edited. No scratchings.

> **Caveat: retrospective blind run.** The scheduled pre-race run was missed. All 11 reports were generated on **2026-10-20, blind to results**, from the saved race-card snapshot. **Odds are final SP**, not the 11:00 HKT pool. **SCMP was unavailable**, so Strategy A's adjustments are **0 in every race** (Adj% = MC%). Strategy B (review-spec) uses only raw MC Win%, so its ticket is unaffected. **B-trio's Win-odds < 10 step is affected**: it selected candidates on SP, which a live run could not have seen. Treat B-trio's two hits as an upper bound.

> **Convention for this review.** **Strategy B** = the **post-race-review skill definition**: MC top 6 by raw MC Win%, MC #1 = banker, 1膽+5腳 = 10 combos = **$100/race**, all races. **The reports' own "STRATEGY B (MC-only)" ticket is a different strategy.** It uses Place% > 20% legs plus a Win-odds < 10 swap/add, with variable stake, and is kept below as **B-trio**. Since the reports used SP, there is a single **SP** odds column and no "Pre odds" column.

**Strategy B hit 0/11 and lost −$1,100 (−100%). Strategy A also hit 0/11 and lost −$880.** B's MC #1 banker placed **5/11** (R3, R5, R6, R7, R10), and in all five races the pool missed at least one horse MC rated at ≤ 3.0% to win. Three of those gaps were 20/1 to 102/1. Both remaining banker failures with a full pool (R8, R9) came from **MC #1 below 30%**. **B-trio hit 2/11 (R5 $207, R6 $857) and lost only −$26**, its best card of the season, through Win-odds < 10 candidates at SP 5.2, 9.4 and 9.5.

## Rules

**Strategy B (review-spec, used for the headline numbers):**
- **Banker** = MC #1 by raw MC Win% (no debutant rule, no SCMP, no jockey boost)
- **Legs** = MC #2–#6 by raw MC Win%
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
| Hits | **0/11 (0.0%)** | **0/11 (0.0%)** | **2/11 (18.2%)** |
| Combos | 110 | 88 | 109 |
| Staked | $1,100 | $880 | $1,090 |
| Returned | $0 | $0 | $1,064 |
| **Net P&L** | **−$1,100** | **−$880** | **−$26** |
| **ROI** | **−100.0%** | **−100.0%** | **−2.4%** |
| Banker top 3 | 5/11 (45.5%) | 5/11 (45.5%) | 5/11 (45.5%) |

Season Strategy B (review-spec): **17/117, $11,590 staked, $5,497 returned, −$6,093, −52.6%**. Season Strategy A: **18/116, $10,850, $5,768, −$5,082, −46.8%**. Season B-trio: **28/117, $14,370, $7,032, −$7,338, −51.1%**.

## Race-by-Race Results — Strategy B

| R | Class | Dist | Surf | Banker (MC#1) | Final legs | Combos | Stake | Result | Banker top 3? | Hit? | Trio $ | Return | P&L |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1800m | Turf | #2 | 8, 6, 1, 4, 5 | 10 | $100 | 6→**11**→**13** | ❌ 7th | MISS ❌ | $5,611 | $0 | −100 |
| R2 | Class 4 | 1400m | Turf | #10 | 9, 2, 8, 11, 3 | 10 | $100 | **7**→2→**5** | ❌ 6th | MISS ❌ | $15,215 | $0 | −100 |
| R3 | Class 4 | 1800m | Turf | #2 | 5, 3, 11, 9, 6 | 10 | $100 | **13**→2→5 | ✅ 2nd | MISS ❌ | $3,767 | $0 | −100 |
| R4 | Class 4 | 1400m | Turf | #7 | 4, 13, 3, 11, 10 | 10 | $100 | **14**→11→4 | ❌ 5th | MISS ❌ | $412 | $0 | −100 |
| R5 | Class 4 | 1200m | Turf | #12 | 6, 2, 11, 4, 10 | 10 | $100 | **8**→10→12 | ✅ 3rd | MISS ❌ | $207 | $0 | −100 |
| R6 | Class 4 | 1000m | Turf | #10 | 3, 1, 6, 2, 11 | 10 | $100 | **12**→**5**→10 | ✅ 3rd | MISS ❌ | $857 | $0 | −100 |
| R7 | Class 4 | 1200m | Turf | #4 | 3, 1, 2, 8, 6 | 10 | $100 | 4→**7**→3 | ✅ 1st | MISS ❌ | $358 | $0 | −100 |
| R8 | Group 2 | 1600m | Turf | #10 | 8, 2, 7, 6, 11 | 10 | $100 | 7→6→2 | ❌ 4th | MISS ❌ | $663 | $0 | −100 |
| R9 | Class 3 | 1200m | Turf | #10 | 8, 1, 3, 6, 11 | 10 | $100 | 6→1→8 | ❌ 5th | MISS ❌ | $155 | $0 | −100 |
| R10 | Class 3 | 1600m | Turf | #1 | 7, 4, 2, 14, 3 | 10 | $100 | 1→**11**→**5** | ✅ 1st | MISS ❌ | $1,018 | $0 | −100 |
| R11 | Class 3 | 1400m | Turf | #6 | 13, 8, 10, 5, 9 | 10 | $100 | 8→13→**7** | ❌ 4th | MISS ❌ | $483 | $0 | −100 |
| **TOTAL** | | | | | | **110** | **$1,100** | | **5/11** | **0/11** | | **$0** | **−1,100** |

## Race-by-Race Results — Strategy A

| R | Class | Mode | Banker(s) | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | C5 | B (6) | #2 | 8,6,1,4,5 | 10 | $100 | 6→11→13 | MISS ❌ | $5,611 | $0 | −100 | Banker 7th + gaps #11 (MC #8), #13 (MC #12) |
| R2 | C4 | A (5) | #10 | 9,2,8,11 | 6 | $60 | 7→2→5 | MISS ❌ | $15,215 | $0 | −60 | Banker 6th + gaps #7 (MC #9), #5 (MC #11) |
| R3 | C4 | A (5) | #2 | 5,3,11,9 | 6 | $60 | 13→2→5 | MISS ❌ | $3,767 | $0 | −60 | Banker 2nd, gap #13 (MC #13, 102) |
| R4 | C4 | A (5) | #4 (debutant swap) | 7,13,3,11 | 6 | $60 | 14→11→4 | MISS ❌ | $412 | $0 | −60 | Banker 3rd, gap #14 (MC #12, 9.3) |
| R5 | C4 | B+ (7) | #12 | 6,2,11,4,10,7 | 15 | $150 | 8→10→12 | MISS ❌ | $207 | $0 | −150 | Banker 3rd, gap #8 (MC #9, 5.2) |
| R6 | C4 | A 雙膽拖 (5) | #10 + #3 | 1,6,2 | 3 | $30 | 12→5→10 | MISS ❌ | $857 | $0 | −30 | #3 4th (#10 3rd) + gaps #12, #5 |
| R7 | C4 | A (5) | #3 (debutant swap) | 4,1,2,8 | 6 | $60 | 4→7→3 | MISS ❌ | $358 | $0 | −60 | Banker 3rd, gap #7 (MC #9, 20) |
| R8 | G2 | B (6) | #10 | 8,2,7,11,6 | 10 | $100 | 7→6→2 | MISS ❌ | $663 | $0 | −100 | Banker 4th, all 3 in legs |
| R9 | C3 | B (6) | #10 | 8,1,3,6,11 | 10 | $100 | 6→1→8 | MISS ❌ | $155 | $0 | −100 | Banker 5th, all 3 in legs |
| R10 | C3 | A (5) | #1 | 7,4,2,14 | 6 | $60 | 1→11→5 | MISS ❌ | $1,018 | $0 | −60 | Banker won, gaps #11 (MC #7), #5 (MC #9) |
| R11 | C3 | B (6) | #6 | 13,8,10,5,9 | 10 | $100 | 8→13→7 | MISS ❌ | $483 | $0 | −100 | Banker 4th + gap #7 (MC #12, 40) |

## B-trio (report's MC-only ticket) — Race-by-Race, for reference

| R | Banker | Final legs | Step B action | Stake | Hit? | Pattern |
|---|---|---|---|---|---|---|
| R1 | #2 | 8,6,1,4 | none (#13 at 11) | $60 | ❌ | C — missed #11, #13; banker 7th |
| R2 | #10 | 9,2,8,11 | none | $60 | ❌ | C — missed #7, #5; banker 6th |
| R3 | #2 | 5,3,11,9,6 | add #6 (9.0) | $100 | ❌ | B — missed #13 (102) |
| R4 | #7 | 4,13,12,14 | #12 replaced #11; #14 replaced #3 | $60 | ❌ | C — banker 5th; **the swap removed #11 (2nd)** |
| R5 | #12 | 6,2,11,4,10,8 | #8 replaced #7 | $150 | ✅ $207 | — (#8 won) |
| R6 | #10 | 3,1,8,5,12,4 | add #8, #5, #12, #4 | $150 | ✅ $857 | — (#12 won, #5 2nd) |
| R7 | #4 | 3,1,2,8,10 | #10 replaced #6 | $100 | ❌ | B — missed #7 (20) |
| R8 | #10 | 8,2,7,11,6,3 | none | $150 | ❌ | **A — all 3 in legs**, banker 4th |
| R9 | #10 | 8,1,3,6,2 | #2 replaced #11 | $100 | ❌ | **A — all 3 in legs**, banker 5th |
| R10 | #1 | 7,4,2,14 | none | $60 | ❌ | B — missed #11, #5 |
| R11 | #6 | 13,8,10,5,1 | #1 replaced #9 | $100 | ❌ | C — missed #7; banker 4th |
| **TOTAL** | | | | **$1,090** | **2/11** | $1,064 returned, −$26 |

**Step B placed 4 of its 11 candidates** (R4 #14, R5 #8, R6 #5, R6 #12; misses R3 #6, R4 #12, R6 #8, R6 #4, R7 #10, R9 #2, R11 #1). **It converted twice (R5, R6), both times in a race where the banker held.** Its swaps removed R4 #11 (**2nd**) and #3 (6th), R5 #7 (6th), R7 #6 (8th), R9 #11 (8th) and R11 #9 (12th). So **one swap removed a placer**, and that race was lost to the banker anyway. All candidate prices were SP. R6 #5 (9.4) and #12 (9.5) sat just under the 10 line, so a live 11:00 run may not have selected them.

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| A — Banker fail, all 3 placers in legs | **2/11** | R8, R9 |
| B — Banker hit, pool gap | **5/11** | R3 (#13 MC #13), R5 (#8 MC #9), R6 (#12 MC #9, #5 MC #8), R7 (#7 MC #9), R10 (#11 MC #7, #5 MC #9) |
| C — Banker fail + pool gap | **4/11** | R1 (#11 MC #8, #13 MC #12), R2 (#7 MC #9, #5 MC #11), R4 (#14 MC #12), R11 (#7 MC #12) |

**All 13 B gap horses were MC #7 to #13, with MC Win% between 0.1% and 3.0%.** Only **4 went off under 10** (R4 #14 9.3, R5 #8 5.2, R6 #5 9.4, R6 #12 9.5). **Eight were 20/1 or longer** (R1 #11 57, R2 #7 34, R2 #5 71, R3 #13 102, R7 #7 20, R10 #11 20, R10 #5 50, R11 #7 40). **A 7th leg (B7, 1膽+6腳 = $150) would have added nothing:** MC #7 placed only in R10 (#11), and that race had a second gap. **Noteworthy:** on 14-Oct the gaps were the market's 2nd–4th choices. Today, in the five Pattern B races, only R5's gap was a market top-3 horse. B's Pattern A misses (R8, R9) were both sub-30% bankers.

## Full MC Place% Table — Per Race

Seq: ★ = 膽 (MC #1 banker), L1–L5 = 腳 by MC Win% rank, — = outside the Strategy B pool. SP = final win odds from results (also the odds the retrospective reports used). Mkt rk = rank by SP (ties share rank). Pool = in the Strategy B (MC top 6) ticket. In A? = in Strategy A's pool (R6 includes both 雙膽拖 bankers).

### R1 — Class 5 | 1800m Turf | Good | Trio $5,611

| Seq | # | Horse | Win% | Place% | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----|-------------|------|------|-------|----------|
| ★ | 2 | GOLDEN FORTUNE | 34.8% | 70.5% | 9 | 5 | ✅ | 膽 (Banker, MC #1) | ✅ | 7 |
| L1 | 8 | FORTUNE KINGO | 21.0% | 55.2% | 4.6 | 2 | ✅ | 腳 (Leg) | ✅ | 6 |
| L2 | 6 | I EXCELLE | 14.5% | 46.1% | 5.1 | 3 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L3 | 1 | STAR BROSE | 12.3% | 40.1% | 4.1 | 1 | ✅ | 腳 (Leg) | ✅ | 5 |
| L4 | 4 | KINGLY DEMEANOR | 5.9% | 25.6% | 5.5 | 4 | ✅ | 腳 (Leg) | ✅ | 4 |
| L5 | 5 | YOUNG FIGHTER | 3.6% | 16.9% | 37 | 10 | ✅ | 腳 (Leg) | ✅ | 12 |
| — | 3 | CAN'T GO WONG | 2.6% | 13.6% | 27 | 8 | ❌ | — | ❌ | 8 |
| — | 11 | SMART CITY | 1.5% | 8.1% | 57 | 12 | ❌ | — | ❌ | 2 ✅ |
| — | 12 | SPECIAL HEDGE | 1.4% | 8.2% | 25 | 7 | ❌ | — | ❌ | 10 |
| — | 9 | CIRCUIT DUFFY | 1.2% | 6.9% | 87 | 13 | ❌ | — | ❌ | 9 |
| — | 10 | YOUNG STRIKER | 0.6% | 3.7% | 31 | 9 | ❌ | — | ❌ | 13 |
| — | 13 | PERFECT PAIRING | 0.4% | 2.9% | 11 | 6 | ❌ | — | ❌ | 3 ✅ |
| — | 7 | FIGHTING MACHINE | 0.3% | 2.3% | 53 | 11 | ❌ | — | ❌ | 11 |

**Top 3:** 6–11–13 · **Outside B pool:** #11, #13 · **Banker #2 finished 7**

**Pattern analysis — Pattern C (two gaps).** MC #1 #2 GOLDEN FORTUNE (34.8%, "undervalued 213%", only 5th in the market at 9.0, jockey 4% strike rate) ran **7th**. L2 #6 I EXCELLE (MC #3, 3rd favourite) won. The gaps were **#11 SMART CITY, MC #8 (1.5%) at 57**, which ran 2nd, and **#13 PERFECT PAIRING, MC #12 (0.4%) at 11**, which ran 3rd. #13's recent form (4-7-13-4-4-2) was better than its MC figure, and the report flagged it only as "overvalued by the market". **Signals missed:** the market ranked the banker 5th, and every MC #1 outside market rank 1–2 failed on this card. No rule reaches a 57/1 runner-up. Trio $5,611.

### R2 — Class 4 | 1400m Turf | Good | Trio $15,215

| Seq | # | Horse | Win% | Place% | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----|-------------|------|------|-------|----------|
| ★ | 10 | INVICTUS | 43.6% | 76.0% | 4.4 | 3 | ✅ | 膽 (Banker, MC #1) | ✅ | 6 |
| L1 | 9 | JOKER ORBIT | 13.2% | 42.5% | 45 | 9 | ✅ | 腳 (Leg) | ✅ | 8 |
| L2 | 2 | CHILL PARTNERS | 11.4% | 38.1% | 16 | 4 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L3 | 8 | GHORGAN | 8.9% | 33.4% | 2.3 | 1 | ✅ | 腳 (Leg) | ✅ | 10 |
| L4 | 11 | SHOTGUN | 8.5% | 32.6% | 3.7 | 2 | ✅ | 腳 (Leg) | ✅ | 5 |
| L5 | 3 | POSITIVE SMILE | 4.0% | 17.7% | 33 | 7 | ✅ | 腳 (Leg) | ❌ | 12 |
| — | 6 | PEGASUS ELITE | 3.0% | 15.6% | 16 | 4 | ❌ | — | ❌ | 4 |
| — | 4 | ISLAND HIGHFLYER | 2.3% | 12.0% | 89 | 12 | ❌ | — | ❌ | 13 |
| — | 7 | SHANNON GLOW | 2.1% | 12.5% | 34 | 8 | ❌ | — | ❌ | 1 🏆 |
| — | 12 | TRENDY RUSH | 1.8% | 10.3% | 22 | 6 | ❌ | — | ❌ | 7 |
| — | 5 | LEAN GENERAL | 0.7% | 4.9% | 71 | 10 | ❌ | — | ❌ | 3 ✅ |
| — | 14 | HEALTHY PONY | 0.2% | 1.6% | 193 | 14 | ❌ | — | ❌ | 9 |
| — | 13 | ILLUMINOUS | 0.2% | 1.6% | 79 | 11 | ❌ | — | ❌ | 11 |
| — | 1 | TRUE BROTHERS | 0.1% | 1.3% | 123 | 13 | ❌ | — | ❌ | 14 |

**Top 3:** 7–2–5 · **Outside B pool:** #7, #5 · **Banker #10 finished 6**

**Pattern analysis — Pattern C (two gaps).** MC #1 #10 INVICTUS (43.6%, still a maiden after 5 starts, 3rd in the market at 4.4) ran **6th**. The market's 2.3 favourite #8 GHORGAN (L3) ran 10th. L2 #2 CHILL PARTNERS (MC #3 at 16) ran 2nd. The winner was **#7 SHANNON GLOW, MC #9 (2.1%) at 34**, and the 3rd was **#5 LEAN GENERAL, MC #11 (0.7%) at 71**. **Signals missed:** a maiden banker at market rank 3. Otherwise this was a longshot frame (Trio $15,215) that neither model nor market saw. MC's overlay #9 JOKER ORBIT (+101% Place edge at 45) ran 8th.

### R3 — Class 4 | 1800m Turf | Good | Trio $3,767

| Seq | # | Horse | Win% | Place% | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----|-------------|------|------|-------|----------|
| ★ | 2 | VICTOR SUPREME | 43.4% | 78.4% | 3.8 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 2 ✅ |
| L1 | 5 | AMAZING GAZE | 22.5% | 60.5% | 4.3 | 3 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L2 | 3 | DOUBLE WIN | 12.7% | 45.1% | 22 | 7 | ✅ | 腳 (Leg) | ✅ | 11 |
| L3 | 11 | SUPREME MASTERMIND | 7.5% | 31.2% | 16 | 5 | ✅ | 腳 (Leg) | ✅ | 10 |
| L4 | 9 | LUCKY YEAR | 4.4% | 22.4% | 3.3 | 1 | ✅ | 腳 (Leg) | ✅ | 9 |
| L5 | 6 | LUCKY BALERION | 3.2% | 18.4% | 9 | 4 | ✅ | 腳 (Leg) | ❌ | 6 |
| — | 12 | KING OF SELECTION | 2.3% | 11.8% | 19 | 6 | ❌ | — | ❌ | 4 |
| — | 4 | SUGAR GOODSON | 1.0% | 7.4% | 129 | 14 | ❌ | — | ❌ | 13 |
| — | 7 | VOLCANIC SPARK | 0.9% | 6.4% | 31 | 9 | ❌ | — | ❌ | 14 |
| — | 8 | ROMANTIC FANTASY | 0.8% | 6.1% | 48 | 11 | ❌ | — | ❌ | 12 |
| — | 10 | BIG BIG WORLD | 0.6% | 4.4% | 94 | 12 | ❌ | — | ❌ | 8 |
| — | 1 | DREAMING TOGETHER | 0.5% | 4.9% | 31 | 9 | ❌ | — | ❌ | 5 |
| — | 13 | GOOD GOOD | 0.3% | 2.3% | 102 | 13 | ❌ | — | ❌ | 1 🏆 |
| — | 14 | ON THE LASH | 0.0% | 0.7% | 22 | 7 | ❌ | — | ❌ | 7 |

**Top 3:** 13–2–5 · **Outside B pool:** #13 · **Banker #2 finished 2**

**Pattern analysis — Pattern B.** MC #1 #2 VICTOR SUPREME (43.4%, 2nd favourite at 3.8) ran **2nd** and L1 #5 AMAZING GAZE (MC #2) ran 3rd. The gap was **#13 GOOD GOOD, MC #13 of 14 (0.3% / 2.3%) at 102**, which **won** after finishing 14th, 14th and 12th in its previous three runs. **Signals missed:** none that any rule could use. MC correctly opposed the 3.3 favourite #9 LUCKY YEAR (L4, "overvalued 86%"), which ran 9th, and its big overlay #3 DOUBLE WIN (179%) ran 11th. Trio $3,767.

### R4 — Class 4 | 1400m Turf | Good | Trio $412

| Seq | # | Horse | Win% | Place% | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----|-------------|------|------|-------|----------|
| ★ | 7 | NOT USUAL DOUBLE | 49.2% | 80.3% | 4.7 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 5 |
| L1 | 4 | CALIFORNIA WAVES | 12.7% | 43.1% | 3 | 1 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L2 | 13 | LAKESHORE HERO | 8.1% | 33.1% | 12 | 5 | ✅ | 腳 (Leg) | ✅ | 8 |
| L3 | 3 | CHIU CHOW GOLF | 7.3% | 29.0% | 15 | 7 | ✅ | 腳 (Leg) | ✅ | 6 |
| L4 | 11 | HOT AIR BALLON | 6.8% | 28.0% | 19 | 8 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L5 | 10 | DRAGON GENERATION | 3.9% | 19.1% | 51 | 11 | ✅ | 腳 (Leg) | ❌ | 11 |
| — | 12 | JUST FOLLOW ME | 3.3% | 17.2% | 6 | 3 | ❌ | — | ❌ | 7 |
| — | 6 | MR INVINCIBLE | 2.8% | 14.5% | 12 | 5 | ❌ | — | ❌ | 4 |
| — | 8 | LESLIE | 1.9% | 11.0% | 60 | 12 | ❌ | — | ❌ | 9 |
| — | 9 | COOGEE BAY | 1.7% | 9.3% | 119 | 14 | ❌ | — | ❌ | 10 |
| — | 5 | COMIC | 1.3% | 7.9% | 48 | 10 | ❌ | — | ❌ | 13 |
| — | 14 | STAR SATYR | 0.5% | 4.0% | 9.3 | 4 | ❌ | — | ❌ | 1 🏆 |
| — | 2 | WATCH LEGEND | 0.2% | 1.7% | 23 | 9 | ❌ | — | ❌ | 14 |
| — | 1 | EXCELLENCE VALUE | 0.2% | 1.9% | 85 | 13 | ❌ | — | ❌ | 12 |

**Top 3:** 14–11–4 · **Outside B pool:** #14 · **Banker #7 finished 5**

**Pattern analysis — Pattern C.** MC #1 #7 NOT USUAL DOUBLE (49.2%, **only 1 career start**, 2nd favourite at 4.7) ran **5th**. Strategy A's debutant rule moved its banker to L1 #4 CALIFORNIA WAVES (3.0 favourite), which placed 3rd. L4 #11 HOT AIR BALLON (MC #5 at 19) ran 2nd. The winner was **#14 STAR SATYR, MC #12 (0.5% / 4.0%) at 9.3**, which the report flagged as overvalued by the market. **Signals missed:** the debutant banker (the A rule handled that), plus a sub-10 horse MC rated near zero. B-trio's Win-odds < 10 step brought in #14 and #12, **but it swapped out #11 (2nd)** and kept the debutant banker, so it missed too. Trio $412.

### R5 — Class 4 | 1200m Turf | Good | Trio $207

| Seq | # | Horse | Win% | Place% | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----|-------------|------|------|-------|----------|
| ★ | 12 | CIRRUS SPEED | 31.6% | 63.6% | 2.2 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 3 ✅ |
| L1 | 6 | SMILING SKY | 13.1% | 39.2% | 39 | 9 | ✅ | 腳 (Leg) | ✅ | 7 |
| L2 | 2 | WOLF COMING | 10.9% | 33.7% | 4.9 | 2 | ✅ | 腳 (Leg) | ✅ | 8 |
| L3 | 11 | THUNDER PRINCE | 9.6% | 30.6% | 32 | 7 | ✅ | 腳 (Leg) | ✅ | 5 |
| L4 | 4 | HAPPY SPECIAL | 8.8% | 29.0% | 34 | 8 | ✅ | 腳 (Leg) | ✅ | 9 |
| L5 | 10 | NAVAS G | 8.4% | 28.5% | 11 | 5 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| — | 7 | VOYAGE CAPTAIN | 6.8% | 24.8% | 14 | 6 | ❌ | — | ✅ | 6 |
| — | 9 | NEVER SETTLE | 3.3% | 14.7% | 10 | 4 | ❌ | — | ❌ | 4 |
| — | 8 | GUTSY BRAVO | 2.7% | 12.8% | 5.2 | 3 | ❌ | — | ❌ | 1 🏆 |
| — | 5 | SHARP PLANET | 1.9% | 8.8% | 91 | 11 | ❌ | — | ❌ | 10 |
| — | 1 | REAL GENTLEMAN | 1.8% | 9.1% | 68 | 10 | ❌ | — | ❌ | 12 |
| — | 3 | COSMO DRAGON | 1.0% | 5.2% | 111 | 12 | ❌ | — | ❌ | 11 |

**Top 3:** 8–10–12 · **Outside B pool:** #8 · **Banker #12 finished 3**

**Pattern analysis — Pattern B.** MC #1 #12 CIRRUS SPEED (31.6%, 2.2 favourite) ran **3rd** and L5 #10 NAVAS G (MC #6 at 11) ran 2nd. The winner was **#8 GUTSY BRAVO, MC #9 (2.7% / 12.8%)**, the **3rd favourite at 5.2**. It was returning from a break, and the report noted it had one of the two fastest-looking speed profiles. MC's top-6 L1 #6 SMILING SKY ("undervalued 411%" at 39) ran 7th. **Signals missed:** a market top-3 horse MC rated under 3%. B-trio swapped #7 → #8 and **hit $207 on $150**. The 5.2 price is SP; the 11:00 price is unknown.

### R6 — Class 4 | 1000m Turf | Good | Trio $857

| Seq | # | Horse | Win% | Place% | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----|-------------|------|------|-------|----------|
| ★ | 10 | SUNNY Q | 37.8% | 78.0% | 4.8 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 3 ✅ |
| L1 | 3 | RUBY THRIVE | 31.6% | 74.0% | 4.8 | 2 | ✅ | 腳 (Leg) | ✅ | 4 |
| L2 | 1 | ARGENTO OCEAN | 18.4% | 59.1% | 22 | 8 | ✅ | 腳 (Leg) | ✅ | 6 |
| L3 | 6 | BREAK HEAVEN | 2.4% | 15.0% | 12 | 7 | ✅ | 腳 (Leg) | ✅ | 7 |
| L4 | 2 | HIGH PRAISE | 2.1% | 13.5% | 70 | 12 | ✅ | 腳 (Leg) | ✅ | 14 |
| L5 | 11 | PRECISION MIND | 1.5% | 10.7% | 23 | 9 | ✅ | 腳 (Leg) | ❌ | 12 |
| — | 7 | EVER WEALTH | 1.3% | 10.3% | 36 | 11 | ❌ | — | ❌ | 13 |
| — | 5 | AURORA PHOENIX | 1.1% | 8.2% | 9.4 | 4 | ❌ | — | ❌ | 2 ✅ |
| — | 12 | SUPREME VOYAGER | 1.0% | 8.3% | 9.5 | 5 | ❌ | — | ❌ | 1 🏆 |
| — | 8 | ZOUPER FELLOW | 1.0% | 7.9% | 4.6 | 1 | ❌ | — | ❌ | 11 |
| — | 9 | DAILY FUN | 0.9% | 7.5% | 83 | 14 | ❌ | — | ❌ | 8 |
| — | 13 | GOLDENTRONICMIGHTY | 0.5% | 4.6% | 34 | 10 | ❌ | — | ❌ | 5 |
| — | 14 | ZETA HEDGE | 0.2% | 1.2% | 71 | 13 | ❌ | — | ❌ | 9 |
| — | 4 | SPARKLING FELLOW | 0.1% | 1.8% | 9.5 | 5 | ❌ | — | ❌ | 10 |

**Top 3:** 12–5–10 · **Outside B pool:** #12, #5 · **Banker #10 finished 3**

**Pattern analysis — Pattern B (two gaps).** MC #1 #10 SUNNY Q (37.8%, joint 2nd favourite at 4.8) ran **3rd**. L1 #3 RUBY THRIVE (31.6% / 74.0%, A's 2nd banker) ran 4th. MC's 3-horse core (#10, #3, #1 = 87.8% win) produced one placer. The winner was **#12 SUPREME VOYAGER, MC #9 (1.0%) at 9.5**, and the 2nd was **#5 AURORA PHOENIX, MC #8 (1.1%) at 9.4**. MC was right about the 4.6 favourite #8 ZOUPER FELLOW (1.0%, 11th). **Signals missed:** two sub-10 horses that MC rated near zero. B-trio added all four Win-odds < 10 candidates and **hit $857 on $150**. Both winners were within 0.6 of the < 10 line at SP.

### R7 — Class 4 | 1200m Turf | Good | Trio $358

| Seq | # | Horse | Win% | Place% | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----|-------------|------|------|-------|----------|
| ★ | 4 | ACE EAGLE | 36.8% | 70.6% | 2.2 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 3 | SOLID CAR | 19.3% | 51.8% | 8.4 | 4 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L2 | 1 | ISLAND BUDDY | 11.7% | 38.0% | 14 | 6 | ✅ | 腳 (Leg) | ✅ | 4 |
| L3 | 2 | FLOWING RICHES | 8.8% | 32.6% | 6.4 | 2 | ✅ | 腳 (Leg) | ✅ | 10 |
| L4 | 8 | DANCING BLAZE | 7.3% | 28.0% | 21 | 9 | ✅ | 腳 (Leg) | ✅ | 5 |
| L5 | 6 | PRIME ACE | 5.2% | 23.4% | 15 | 7 | ✅ | 腳 (Leg) | ❌ | 8 |
| — | 10 | KA YING RADIANCE | 3.5% | 16.5% | 6.7 | 3 | ❌ | — | ❌ | 11 |
| — | 9 | GREEN FIELD PEARL | 3.3% | 15.7% | 91 | 11 | ❌ | — | ❌ | 7 |
| — | 7 | INCREDIBLE MOMENT | 3.0% | 14.5% | 20 | 8 | ❌ | — | ❌ | 2 ✅ |
| — | 12 | HEROIC VANGUARD | 0.9% | 5.7% | 84 | 10 | ❌ | — | ❌ | 9 |
| — | 11 | STAR FIGURE | 0.4% | 3.0% | 13 | 5 | ❌ | — | ❌ | 6 |
| — | 5 | FLYING HUNTER | 0.0% | 0.2% | 139 | 12 | ❌ | — | ❌ | 12 |

**Top 3:** 4–7–3 · **Outside B pool:** #7 · **Banker #4 finished 1**

**Pattern analysis — Pattern B.** MC #1 #4 ACE EAGLE (36.8%, 2.2 favourite, 1 career start) **won**. L1 #3 SOLID CAR (MC #2, value 1.62 at 8.4, A's banker) ran 3rd. The gap was **#7 INCREDIBLE MOMENT, MC #9 (3.0% / 14.5%) at 20**, off a > 90-day layoff, which ran 2nd. B-trio swapped L5 #6 for the 6.7 3rd favourite #10 KA YING RADIANCE, which ran 11th. **Signals missed:** none usable. #7 was 8th in the market. MC was right about #10 (3rd favourite, 11th) and #2 (2nd favourite, 10th).

### R8 — Group 2 | 1600m Turf | Good | Trio $663

| Seq | # | Horse | Win% | Place% | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----|-------------|------|------|-------|----------|
| ★ | 10 | SKY JEWELLERY | 22.4% | 53.3% | 2.5 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 4 |
| L1 | 8 | STORMY GROVE | 22.2% | 53.2% | 12 | 4 | ✅ | 腳 (Leg) | ✅ | 9 |
| L2 | 2 | MY WISH | 14.7% | 41.9% | 2.8 | 2 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L3 | 7 | LIGHT YEARS CHARM | 8.7% | 28.6% | 8.8 | 3 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L4 | 6 | PATCH OF THETA | 7.9% | 25.2% | 29 | 7 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L5 | 11 | SAGACIOUS LIFE | 7.2% | 25.4% | 31 | 8 | ✅ | 腳 (Leg) | ✅ | 10 |
| — | 3 | HELIOS EXPRESS | 5.6% | 20.8% | 14 | 5 | ❌ | — | ❌ | 6 |
| — | 1 | VOYAGE BUBBLE | 3.6% | 14.8% | 33 | 10 | ❌ | — | ❌ | 11 |
| — | 9 | SOLEIL FIGHTER | 3.4% | 15.1% | 57 | 11 | ❌ | — | ❌ | 7 |
| — | 5 | BEAUTY JOY | 2.5% | 11.9% | 21 | 6 | ❌ | — | ❌ | 5 |
| — | 12 | WINNING WING | 2.0% | 9.8% | 31 | 8 | ❌ | — | ❌ | 8 |

**Top 3:** 7–6–2 · **Outside B pool:** none · **Banker #10 finished 4**

**Pattern analysis — Pattern A (all 3 placers in legs).** MC #1 #10 SKY JEWELLERY (22.4% / 53.3%, 2.5 favourite, up from Class 2) ran **4th**. It led MC #2 #8 STORMY GROVE (22.2%) by only 0.2pp, and #8 ran 9th. **L3 #7 LIGHT YEARS CHARM (MC #4, 8.8) won, L4 #6 PATCH OF THETA (MC #5 at 29, "undervalued 128%") ran 2nd and L2 #2 MY WISH (MC #3, 2nd favourite) ran 3rd.** Trio $663. **Signals missed:** a sub-25% MC #1 in a Group 2 race, with no clear banker. A full box of B's six would have paid $663 for $200.

### R9 — Class 3 | 1200m Turf | Good to Firm | Trio $155

| Seq | # | Horse | Win% | Place% | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----|-------------|------|------|-------|----------|
| ★ | 10 | HAPPY SHOOTER | 29.6% | 65.3% | 5.3 | 3 | ✅ | 膽 (Banker, MC #1) | ✅ | 5 |
| L1 | 8 | GLORYSPEED | 17.7% | 49.6% | 3.4 | 2 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L2 | 1 | MR INCREDIBLE | 17.1% | 49.8% | 3 | 1 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L3 | 3 | MOTOR | 12.5% | 39.5% | 32 | 7 | ✅ | 腳 (Leg) | ✅ | 6 |
| L4 | 6 | GRAND EAGLE | 10.6% | 34.3% | 9.3 | 5 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L5 | 11 | THOUSAND SPIRIT | 5.2% | 22.5% | 16 | 6 | ✅ | 腳 (Leg) | ✅ | 8 |
| — | 9 | LA FORZA | 2.6% | 13.5% | 119 | 11 | ❌ | — | ❌ | 9 |
| — | 4 | MAKE YOU SMILE | 2.3% | 11.5% | 70 | 10 | ❌ | — | ❌ | 10 |
| — | 2 | SMART GOLF | 1.8% | 10.2% | 7.9 | 4 | ❌ | — | ❌ | 11 |
| — | 5 | PRECISION TIME | 0.4% | 2.9% | 37 | 8 | ❌ | — | ❌ | 7 |
| — | 12 | HONEST WITNESS | 0.1% | 0.9% | 44 | 9 | ❌ | — | ❌ | 4 |

**Top 3:** 6–1–8 · **Outside B pool:** none · **Banker #10 finished 5**

**Pattern analysis — Pattern A (all 3 placers in legs).** MC #1 #10 HAPPY SHOOTER (29.6%, 3rd in the market at 5.3) ran **5th**. **L4 #6 GRAND EAGLE (MC #5, 9.3) won. L2 #1 MR INCREDIBLE (MC #3, 3.0 co-favourite) and L1 #8 GLORYSPEED (MC #2, 3.4 co-favourite, 1 career start) ran 2nd and 3rd.** Trio $155. **Signals missed:** a sub-30% banker at market rank 3 against two co-favourites that MC itself rated at 49–50% place. The < 30% PASS rule would have saved $100.

### R10 — Class 3 | 1600m Turf | Good to Firm | Trio $1,018

| Seq | # | Horse | Win% | Place% | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----|-------------|------|------|-------|----------|
| ★ | 1 | PACKING FIGHTER | 59.0% | 89.4% | 1.9 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 7 | JOYFUL JOY | 13.9% | 55.5% | 4.5 | 2 | ✅ | 腳 (Leg) | ✅ | 4 |
| L2 | 4 | MISTER DAPPER | 11.6% | 50.5% | 43 | 9 | ✅ | 腳 (Leg) | ✅ | 9 |
| L3 | 2 | SMART AVENUE | 7.8% | 39.6% | 79 | 11 | ✅ | 腳 (Leg) | ✅ | 13 |
| L4 | 14 | MASTER LUCKY | 3.8% | 25.2% | 6.1 | 3 | ✅ | 腳 (Leg) | ✅ | 8 |
| L5 | 3 | WINDLORD | 2.1% | 15.8% | 28 | 7 | ✅ | 腳 (Leg) | ❌ | 10 |
| — | 11 | SHAMUS STORM | 0.5% | 6.0% | 20 | 5 | ❌ | — | ❌ | 2 ✅ |
| — | 12 | NATURAL NUMBERS | 0.4% | 4.8% | 15 | 4 | ❌ | — | ❌ | 5 |
| — | 5 | COMPLETE UNKNOWN | 0.4% | 4.5% | 50 | 10 | ❌ | — | ❌ | 3 ✅ |
| — | 9 | SONIC LINER | 0.3% | 3.2% | 130 | 14 | ❌ | — | ❌ | 11 |
| — | 13 | HYMNBOOK | 0.1% | 2.9% | 30 | 8 | ❌ | — | ❌ | 6 |
| — | 10 | PRIME SUCCESS | 0.1% | 1.4% | 123 | 12 | ❌ | — | ❌ | 14 |
| — | 8 | FORTUNE BOY | 0.0% | 0.9% | 22 | 6 | ❌ | — | ❌ | 7 |
| — | 6 | SO NAIVE | 0.0% | 0.5% | 128 | 13 | ❌ | — | ❌ | 12 |

**Top 3:** 1–11–5 · **Outside B pool:** #11, #5 · **Banker #1 finished 1**

**Pattern analysis — Pattern B (two gaps).** MC #1 #1 PACKING FIGHTER (59.0% / 89.4%, 1.9 favourite) **won**. B's top 6 included MC's big overlays L3 #4 MISTER DAPPER (43, "+398%") and L4 #2 SMART AVENUE (79, "+518%"), which ran 9th and 13th. MC #2 #7 JOYFUL JOY (4.5) ran 4th. The placers were **#11 SHAMUS STORM, MC #7 (0.5%) at 20** and **#5 COMPLETE UNKNOWN, MC #9 (0.4%) at 50**. **Signals missed:** none usable. MC's overlay ranking pushed the 20/1 shot out of the top 6, but adding a 7th leg (B7) would still have missed #5. Trio $1,018.

### R11 — Class 3 | 1400m Turf | Good to Firm | Trio $483

| Seq | # | Horse | Win% | Place% | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----|-------------|------|------|-------|----------|
| ★ | 6 | AEROINVINCIBLE | 34.7% | 71.5% | 11 | 4 | ✅ | 膽 (Banker, MC #1) | ✅ | 4 |
| L1 | 13 | NYX GLUCK | 19.8% | 56.7% | 3.1 | 2 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L2 | 8 | BABY SAKURA | 15.2% | 46.7% | 3 | 1 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L3 | 10 | CHILL BUDDY | 14.1% | 46.6% | 18 | 7 | ✅ | 腳 (Leg) | ✅ | 10 |
| L4 | 5 | ENDUED | 6.5% | 28.1% | 15 | 6 | ✅ | 腳 (Leg) | ✅ | 9 |
| L5 | 9 | GENEVA | 6.4% | 27.7% | 18 | 7 | ✅ | 腳 (Leg) | ✅ | 12 |
| — | 12 | AKASHVANI | 1.8% | 10.1% | 54 | 11 | ❌ | — | ❌ | 7 |
| — | 14 | KING OF FIGHTERS | 0.4% | 3.0% | 87 | 13 | ❌ | — | ❌ | 11 |
| — | 1 | BEAUTY BOLT | 0.3% | 2.9% | 9.8 | 3 | ❌ | — | ❌ | 5 |
| — | 3 | MIGHTY MASTS | 0.3% | 2.8% | 13 | 5 | ❌ | — | ❌ | 6 |
| — | 4 | EMBLAZON | 0.2% | 1.9% | 77 | 12 | ❌ | — | ❌ | 13 |
| — | 7 | GARRIX | 0.1% | 1.0% | 40 | 10 | ❌ | — | ❌ | 3 ✅ |
| — | 11 | SKY HEART | 0.1% | 1.0% | 18 | 7 | ❌ | — | ❌ | 8 |

**Top 3:** 8–13–7 · **Outside B pool:** #7 · **Banker #6 finished 4**

**Pattern analysis — Pattern C.** MC #1 #6 AEROINVINCIBLE (34.7%, "undervalued 281%", 4th in the market at 11) ran **4th**. L1 #13 NYX GLUCK and L2 #8 BABY SAKURA, the 3.1 and 3.0 co-favourites, ran 2nd and 1st. The 3rd was **#7 GARRIX, MC #12 (0.1%) at 40**. **Signals missed:** a banker the market rated 4th. MC #1 at market rank 4+ was 0/2 on this card. B-trio's Win-odds swap brought in #1 BEAUTY BOLT (9.8), which ran 5th. Trio $483.

## B Banker Performance

| Race | B banker (MC #1) | MC Win% | MC Place% | SP | Mkt rank (SP) | Placed? | Position |
|------|------------------|---------|-----------|----|---------------|---------|----------|
| R1 | #2 GOLDEN FORTUNE | 34.8% | 70.5% | 9.0 | 5 | ❌ | 7th |
| R2 | #10 INVICTUS | 43.6% | 76.0% | 4.4 | 3 | ❌ | 6th |
| R3 | #2 VICTOR SUPREME | 43.4% | 78.4% | 3.8 | 2 | ✅ | 2nd |
| R4 | #7 NOT USUAL DOUBLE (1 start) | 49.2% | 80.3% | 4.7 | 2 | ❌ | 5th |
| R5 | #12 CIRRUS SPEED | 31.6% | 63.6% | 2.2 | 1 | ✅ | 3rd |
| R6 | #10 SUNNY Q | 37.8% | 78.0% | 4.8 | 2= | ✅ | 3rd |
| R7 | #4 ACE EAGLE (1 start) | 36.8% | 70.6% | 2.2 | 1 | ✅ | 1st |
| R8 | #10 SKY JEWELLERY | 22.4% | 53.3% | 2.5 | 1 | ❌ | 4th |
| R9 | #10 HAPPY SHOOTER | 29.6% | 65.3% | 5.3 | 3 | ❌ | 5th |
| R10 | #1 PACKING FIGHTER | 59.0% | 89.4% | 1.9 | 1 | ✅ | 1st |
| R11 | #6 AEROINVINCIBLE | 34.7% | 71.5% | 11 | 4 | ❌ | 4th |

**Banker top 3: 5/11 (45.5%). Banker win: 2/11 (18.2%).**
Mean MC Win% of bankers was **38.4%** and mean MC Place% **72.4%**, against an actual place rate of **45.5%**: overstated by ~27pp (14-Oct: +33pp; 11-Oct: +41pp; 07-Oct: +22pp; 04-Oct: +18pp; 01-Oct: +12pp; 27-Sep: +25pp; 23-Sep: +7pp; 16-Sep: −8pp). MC #1 ≥ 35% placed **4/6** (R3, R6, R7, R10 ✅; R2, R4 ❌). Below 35% it placed **1/5** (R5 ✅). **Below 30% it placed 0/2** (R8, R9; three-card **0/10**). The two 1-start MC #1s split: R4 #7 5th, R7 #4 won.

**Market-rank split (SP), ten meetings.** 19-Oct ranks are SP, which is also what the reports used.

| Banker profile (MC #1 market rank at SP) | 13-Sep ST | 16-Sep HV | 23-Sep HV | 27-Sep ST | 01-Oct ST | 04-Oct ST | 07-Oct HV | 11-Oct ST | 14-Oct HV | 19-Oct ST | Combined |
|------------------------------------------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|----------|
| Market rank 1–2 | 3/4 | 6/6 | 3/5 | 3/7 | 5/6 | 4/6 | 2/7 | 3/6 | 2/6 | **5/7** | **36/60 (60.0%)** |
| Market rank 3 | 0/1 | — | 0/1 | 1/1 | 1/3 | 1/3 | 1/1 | 0/2 | 1/2 | **0/2** | 5/16 (31.3%) |
| Market rank 4+ | 0/5 | 0/2 | 2/3 | 1/3 | 0/2 | 1/2 | 1/1 | 0/3 | 0/1 | **0/2** | **5/24 (20.8%)** |

**This card split cleanly on market rank.** At rank 1–2 the banker placed 5/7. The two failures were R4 (a 1-start debutant) and R8 (22.4%, near-tie). At rank 3+ it placed **0/4** (R1, R2, R9, R11). Over ten cards, a banker at market rank 3 or worse has placed **10/40 (25.0%)**, against **36/60 (60.0%)** at rank 1–2. Three of today's four rank 3+ failures were MC "big overlay" bankers (R1 213%, R11 281%, R2 a maiden).

**MC #2 placement (hindsight check):** **5/11** this card (R3 #5 3rd, R4 #4 3rd, R7 #3 3rd, R9 #8 3rd, R11 #13 2nd). Season-to-date: MC #1 **50/108 (46.3%)**, MC #2 **44/107 (41.1%)**.

**Near-zero market horses:** MC Win% < 4% at SP < 10 placed **4/12** this card (R4 #14, R5 #8, R6 #5, R6 #12 ✅; R3 #6, R4 #12, R6 #4, R6 #8, R7 #10, R9 #2, R10 #14, R11 #1 ❌). At SP ≤ 8 they placed **1/6**, against 6/7 on 14-Oct. **None of the four placers was in B's pool.** **MC-opposed market top-3 horses placed 2/12** (R5 #8, R8 #7), against 7/7 on 14-Oct. The market signal that worked at HV did not hold here.

## Conclusions for Strategy B

1. **B lost $220 more than A purely on stake.** Both went 0/11, and the bankers differed only in R4 and R7, where A's debutant rule applied. In R4 that rule placed A's banker, but the pool missed #14 in both strategies.
2. **B's gaps this card were mostly not fixable.** 8 of the 13 gap horses were 20/1+, all at MC ≤ 3.0%. B's top 6 again carried MC's big overlays (R5 #6 at 39, R10 #4 at 43 and #2 at 79, R2 #9 at 45), and none of them placed. A rule that drops "> 200% undervalued" legs priced above 30 would cost nothing on this card, but it would not have added a hit either.
3. **B-trio's Win-odds < 10 step was again the only thing that hit (2 hits, −$26).** It now has two straight cards where it beats both A and B. This card's evidence is **SP-based**, so it cannot settle the question. Backtest the swap-only market rule on cards with real 11:00 snapshots (14-Oct and earlier) before adopting it.
4. **A 7th leg (B7) would not have helped.** It would have added only R10 #11, in a race with a second gap.
5. **The banker filters are the clearest signal.** MC #1 below 30% is **0/10 over three cards**, and MC #1 at market rank 3+ is **10/40 over ten cards**. A PASS on either condition would have saved $500 this card (R1, R2, R8, R9, R11) for no lost hits. That figure is optimistic, because the R1/R2/R11 market ranks are SP.
