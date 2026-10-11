# Trio Strategy B (stratC) Review — Sha Tin | 2026-10-11

**Meeting 10 of the 2026/27 season.** An 11-race card: R1, R4 and R5 on the All Weather Track, the rest on Turf (R10 on the "C" course). Going Good throughout. No scratchings. **R6 had a dead heat for 2nd** (#2 and #7), so the Trio was 2-7-12. Results: `data/historical/results_20261011_ST.json` (scraped first time, DT ✓). Trio dividends for R1, R6, R7 and R10 were checked against the HKJC results page and match. Truncated non-Trio dividends (not edited in the JSON): R1 QN $1 → official $1,848.50; R7 QP 5-13 $2,116 and 10-13 $1,032 scraped as `2, 10, 1`; R6 dead-heat second QN (7-12 $184) missing.

> **Convention for this review.** **Strategy B** = the **post-race-review skill definition**: MC top 6 by raw MC Win%, MC #1 = banker, 1膽+5腳 = 10 combos = **$100/race**, all races (including R8, which Strategy A passed). **The reports' own "STRATEGY B (MC-only)" ticket is a different strategy.** It uses Place% > 20% legs plus a Win-odds < 10 swap/add, with variable stake. It is kept below as **B-trio** for continuity. Pre-race odds = HKJC pool snapshot captured 11:23–11:24 HKT (R11: live odds fetched during the MC run). **No near-off momentum snapshots** are available, so there is no "Snap" column.

**Strategy B hit 2/11 (R4 $43, R6 $212) and lost −$845 (−76.8%), its worst result since 16-Sep. Strategy A hit 3/10 and lost −$438.** The difference was R9, where the runner-up #1 SWIFT ASCEND was MC #7 (Place% 21.0%). A included it through Rule 8, and B's Win%-ranked top 6 did not. **B bankers placed only 3/11.** In four races (R5, R8, R10, R11) all three placers were B legs and the banker missed. **MC #2 placed in 10 of 11 races.**

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
| Races | 11 | 10 (R8 PASS) | 11 |
| Hits | **2/11 (18.2%)** | **3/10 (30.0%)** | 3/11 (27.3%) |
| Combos | 110 | 106 | 112 |
| Staked | $1,100 | $1,060 | $1,120 |
| Returned | $255 | $622 | $622 |
| **Net P&L** | **−$845** | **−$438** | **−$498** |
| **ROI** | **−76.8%** | **−41.3%** | **−44.5%** |
| Banker top 3 | 3/11 (27.3%) | 3/10 (30.0%) | 3/11 (27.3%) |

Season Strategy B (review-spec): **17/97, $9,660 staked, $5,497 returned, −$4,163, −43.1%**. Season Strategy A: **18/96, $8,850, $5,768, −$3,082, −34.8%**. Season B-trio: **23/97, $12,170, $5,374, −$6,796, −55.8%**.

## Race-by-Race Results — Strategy B

| R | Class | Dist | Surf | Banker (MC#1) | Final legs | Combos | Stake | Result | Banker top 3? | Hit? | Trio $ | Return | P&L |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1200m | AWT | #4 | 5, 3, 7, 10, 11 | 10 | $100 | 8→9→7 | ❌ 11th | MISS ❌ | $2,260 | $0 | −100 |
| R2 | Class 5 | 1000m | Turf | #4 | 2, 1, 6, 9, 8 | 10 | $100 | 1→13→2 | ❌ 5th | MISS ❌ | $711 | $0 | −100 |
| R3 | Class 4 | 1200m | Turf | #1 | 7, 2, 8, 6, 10 | 10 | $100 | 4→2→7 | ❌ 8th | MISS ❌ | $227 | $0 | −100 |
| R4 | Class 3 | 1200m | AWT | #2 | 8, 4, 9, 1, 7 | 10 | $100 | 8→2→1 | ✅ 2nd | **HIT ✅** | $43 | $43 | **−57** |
| R5 | Class 4 | 1200m | AWT | #2 | 6, 1, 8, 9, 3 | 10 | $100 | 6→8→1 | ❌ 4th | MISS ❌ | $632 | $0 | −100 |
| R6 | Class 4 | 1200m | Turf | #2 | 7, 6, 12, 9, 3 | 10 | $100 | 12→2=7 | ✅ 2nd= | **HIT ✅** | $212 | $212 | **+112** |
| R7 | Class 4 | 1400m | Turf | #3 | 5, 6, 2, 9, 14 | 10 | $100 | 5→10→13 | ❌ 4th | MISS ❌ | $8,829 | $0 | −100 |
| R8 | Class 4 | 1600m | Turf | #12 | 1, 11, 4, 7, 2 | 10 | $100 | 1→7→11 | ❌ 13th | MISS ❌ | $171 | $0 | −100 |
| R9 | Class 3 | 1200m | Turf | #3 | 8, 4, 7, 2, 6 | 10 | $100 | 8→1→3 | ✅ 3rd | MISS ❌ | $367 | $0 | −100 |
| R10 | Class 3 | 1400m | Turf | #3 | 7, 10, 9, 2, 1 | 10 | $100 | 9→1→7 | ❌ 9th | MISS ❌ | $1,135 | $0 | −100 |
| R11 | Class 2 | 1200m | Turf | #11 | 2, 1, 3, 4, 6 | 10 | $100 | 3→6→2 | ❌ 4th | MISS ❌ | $146 | $0 | −100 |
| **TOTAL** | | | | | | **110** | **$1,100** | | **3/11** | **2/11** | | **$255** | **−845** |

## Race-by-Race Results — Strategy A

| R | Class | Mode | Banker(s) | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | C5 | B | #4 | 5,3,10,7,11 | 10 | $100 | 8→9→7 | MISS ❌ | $2,260 | $0 | −100 | Banker 11th + gaps #8 (MC #11), #9 (MC #9) |
| R2 | C5 | A (雙膽拖) | #4 + #2 | 1,6,8 | 3 | $30 | 1→13→2 | MISS ❌ | $711 | $0 | −30 | #4 5th (#2 3rd) + gap #13 (MC #7) |
| R3 | C4 | B (7) | #1 | 7,2,6,8,4,10 | 15 | $150 | 4→2→7 | MISS ❌ | $227 | $0 | −150 | Banker 8th, all 3 in legs |
| R4 | C3 | A (6, 雙膽拖) | #2 + #8 | 4,9,7,1 | 4 | $40 | 8→2→1 | **HIT ✅** | $43 | $43 | +3 | — |
| R5 | C4 | B (7) | #2 | 6,1,8,9,3,12 | 15 | $150 | 6→8→1 | MISS ❌ | $632 | $0 | −150 | Banker 4th, all 3 in legs |
| R6 | C4 | A (7) | #2 | 7,3,6,12,9,10 | 15 | $150 | 12→2=7 | **HIT ✅** | $212 | $212 | +62 | — |
| R7 | C4 | A (7) | #3 | 5,6,2,14,9,10 | 15 | $150 | 5→10→13 | MISS ❌ | $8,829 | $0 | −150 | Banker 4th + gap #13 (142/1) |
| R8 | C4 | D (PASS) | (#12) | (1,4,11,7,2,5) | — | $0 | 1→7→11 | PASS | $171 | — | 0 | Shadow banker 13th |
| R9 | C3 | A (7) | #3 | 8,4,2,6,7,1 | 15 | $150 | 8→1→3 | **HIT ✅** | $367 | $367 | +217 | — |
| R10 | C3 | B | #3 | 7,2,9,10,1 | 10 | $100 | 9→1→7 | MISS ❌ | $1,135 | $0 | −100 | Banker 9th, all 3 in legs |
| R11 | C2 | A (6, 雙膽拖) | #11 + #2 | 1,3,4,6 | 4 | $40 | 3→6→2 | MISS ❌ | $146 | $0 | −40 | #11 4th (#2 3rd), all 3 in pool |

## B-trio (report's MC-only ticket) — Race-by-Race, for reference

| R | Banker | Final legs | Step B action | Stake | Hit? | Pattern |
|---|---|---|---|---|---|---|
| R1 | #4 | 5,3,7,10,11 | — | $100 | ❌ | C — missed #8, #9; banker 11th |
| R2 | #4 | 2,1,6,8,10 | add #8, #10 | $100 | ❌ | C — missed #13; banker 5th |
| R3 | #1 | 7,2,8,6,4 | add #4 | $100 | ❌ | **A — all 3 placers in legs** (#4 added by Step B), banker 8th |
| R4 | #2 | 8,4,9,1 | — | $60 | ✅ $43 | — |
| R5 | #2 | 6,1,8,9,12,3 | — | $150 | ❌ | **A — all 3 in legs**, banker 4th |
| R6 | #2 | 7,6,12,3,10 | #10 replaced #9 | $100 | ✅ $212 | — |
| R7 | #3 | 5,6,14,10 | #14 replaced #2 | $60 | ❌ | C — held #5, #10; missed #13; banker 4th |
| R8 | #12 | 1,11,4,7,3 | #3 replaced #2 | $100 | ❌ | **A — all 3 in legs**, banker 13th |
| R9 | #3 | 8,4,7,2,1,10 | #10 replaced #6 | $150 | ✅ $367 | — |
| R10 | #3 | 7,10,9,2,1 | add #1 | $100 | ❌ | **A — all 3 in legs**, banker 9th |
| R11 | #11 | 2,1,3,4,6 | — | $100 | ❌ | **A — all 3 in legs**, banker 4th |
| **TOTAL** | | | | **$1,120** | **3/11** | $622 returned, −$498 |

Step B **added a placer in R3** (#4, the winner) and kept R7's 2nd #10. Neither converted, because both bankers failed. Its swaps removed no placer (#9 R6 8th, #2 R7 9th, #2 R8 8th, #6 R9 9th). **B-trio beat B by $347 because its Place% > 20% rule kept R9's #1 as a primary leg.**

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| A — Banker fail, all 3 placers in legs | **4/9** | R5, R8, R10, R11 |
| B — Banker hit, pool gap | 1/9 | R9 (#1 MC #7) |
| C — Banker fail + pool gap | 4/9 | R1 (#8 MC #11, #9 MC #9), R2 (#13 MC #7), R3 (#4 MC #7), R7 (#10 MC #8, #13 MC #11) |

**The banker failed in 8 of B's 9 misses.** Pattern A alone cost $2,084 of Trios (R5 $632 + R8 $171 + R10 $1,135 + R11 $146). **Three of the seven gap horses were MC #7** (R2 #13, R3 #4, R9 #1), so a 7th leg (B7 = 1膽+6腳, $150) would have added R9 only: B7 = 3/11, $1,650 staked, $622 returned, **−$1,028**, worse than B's −$845. **Noteworthy:** MC #2 placed 10/11 (only R1 #5 4th). In the eight previous cards it placed 27/77 (35.1%), so this is not a pattern yet. MC #1 below 35% Win% went 0/5 (R1, R3, R5, R8, R10).

## Full MC Place% Table — Per Race

Seq: ★ = 膽 (MC #1 banker), L1–L5 = 腳 by MC Win% rank, — = outside the Strategy B pool. "Pre odds" = the HKJC pool odds the report used (11:23–11:24 HKT). SP = final win odds from results. Mkt rk = rank by SP (ties share rank). Pool = in the Strategy B (MC top 6) ticket. In A? = in Strategy A's pool (R8 = PASS).

### R1 — Class 5 | 1200m AWT | Good | Trio $2,260

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 4 | JOLLY COMPANION | 27.0% | 59.4% | 5.9 | 5.5 | 3 | ✅ | 膽 (Banker, MC #1) | ✅ | 11 |
| L1 | 5 | DAILY TROPHY | 22.7% | 54.1% | 11 | 16 | 9 | ✅ | 腳 (Leg) | ✅ | 4 |
| L2 | 3 | SO MY FOLKS | 10.9% | 35.0% | 6.3 | 5.2 | 2 | ✅ | 腳 (Leg) | ✅ | 7 |
| L3 | 7 | WAVE GARDEN | 9.2% | 31.2% | 4.9 | 4.6 | 1 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L4 | 10 | HAPPY ACTION | 8.8% | 30.6% | 13 | 8.8 | 5 | ✅ | 腳 (Leg) | ✅ | 8 |
| L5 | 11 | GIMME FIVE | 8.6% | 30.6% | 6.6 | 6.7 | 4 | ✅ | 腳 (Leg) | ✅ | 10 |
| — | 2 | MARVEL AND GOLD | 4.4% | 19.0% | 15 | 26 | 10 | ❌ | — | ❌ | 6 |
| — | 12 | THOUSAND CUPS | 2.8% | 12.8% | 18 | 15 | 8 | ❌ | — | ❌ | 5 |
| — | 9 | CONRAD THE GREAT | 2.5% | 11.3% | 10 | 12 | 6 | ❌ | — | ❌ | 2 ✅ |
| — | 1 | FLYING SNIPER | 2.1% | 10.5% | 10 | 13 | 7 | ❌ | — | ❌ | 9 |
| — | 8 | SHINYU KOKOROE | 0.9% | 5.1% | 26 | 40 | 11 | ❌ | — | ❌ | 1 🏆 |
| — | 6 | MAGIC SUPER | 0.1% | 0.4% | 42 | 66 | 12 | ❌ | — | ❌ | 12 |

**Top 3:** 8–9–7 · **Outside B pool:** #8, #9 · **Banker #4 finished 11**

**Pattern analysis — Pattern C.** MC #1 #4 JOLLY COMPANION (27.0%, Purton, gate 11 of 12) ran **11th**. Its MC edge rested on dirt record and jockey, and its raw form (9/6/9/6/5/6) was modest. L3 #7 WAVE GARDEN, the market favourite MC rated only 4th, ran 3rd. The winner **#8 SHINYU KOKOROE was MC #11 (0.9%)**: 158 days off, drifted 26→40, with a SCMP `+excuses` note. 2nd was **#9 CONRAD THE GREAT, MC #9 (2.5%) at 10→12**. **Signals missed:** none usable. The market itself had #8 11th of 12. MC's value horse #5 DAILY TROPHY ("undervalued by 149%") drifted 11→16 and ran 4th.

### R2 — Class 5 | 1000m Turf (straight) | Good | Trio $711

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 4 | SPICY SPANGLE | 37.8% | 76.8% | 6.8 | 5.5 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 5 |
| L1 | 2 | AUTUMN VIBES | 31.9% | 71.4% | 4.3 | 6 | 3 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L2 | 1 | SUNNY Q | 13.1% | 46.9% | 7.6 | 4.3 | 1 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L3 | 6 | VERBIER | 7.0% | 32.1% | 15 | 27 | 11 | ✅ | 腳 (Leg) | ✅ | 11 |
| L4 | 9 | CONCORDE STAR | 2.2% | 14.2% | 31 | 32 | 12 | ✅ | 腳 (Leg) | ❌ | 9 |
| L5 | 8 | DIRIYA | 2.1% | 12.6% | 8.4 | 11 | 5 | ✅ | 腳 (Leg) | ✅ | 13 |
| — | 13 | VON BAER | 1.2% | 8.3% | 20 | 25 | 10 | ❌ | — | ❌ | 2 ✅ |
| — | 11 | DASH | 1.2% | 8.3% | 19 | 16 | 8 | ❌ | — | ❌ | 4 |
| — | 10 | SOLAR RIVER | 0.9% | 7.9% | 9.4 | 14 | 7 | ❌ | — | ❌ | 6 |
| — | 7 | BEAUTY GEMINI | 0.8% | 6.5% | 10 | 21 | 9 | ❌ | — | ❌ | 7 |
| — | 5 | TOPSPIN KING | 0.7% | 4.7% | 57 | 119 | 14 | ❌ | — | ❌ | 14 |
| — | 12 | QUICK MONEY | 0.5% | 4.9% | 10 | 12 | 6 | ❌ | — | ❌ | 8 |
| — | 14 | ISLAND BREEZES | 0.5% | 3.8% | 23 | 6.5 | 4 | ❌ | — | ❌ | 12 |
| — | 3 | MAJESTIC LIFE | 0.2% | 1.7% | 39 | 42 | 13 | ❌ | — | ❌ | 10 |

**Top 3:** 1–13–2 · **Outside B pool:** #13 · **Banker #4 finished 5**

**Pattern analysis — Pattern C.** MC #1 #4 SPICY SPANGLE (37.8%, "undervalued by 157%") ran **5th**. L1 #2 AUTUMN VIBES (MC #2) ran 3rd and L2 #1 SUNNY Q (MC #3, backed 7.6→4.3) won. The gap was **#13 VON BAER, MC #7 (1.2%, tied with #11) at 20→25**, with a SCMP `+excuses` note (caught wide, steadied). A 7th leg would have caught it, but the banker still failed. **Signals missed:** #1 was backed in from 7.6 to 4.3, the biggest move among the top MC horses.

### R3 — Class 4 | 1200m Turf | Good | Trio $227

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 1 | CROSSBORDERDUDE | 24.0% | 55.5% | 5.8 | 10 | 5 | ✅ | 膽 (Banker, MC #1) | ✅ | 8 |
| L1 | 7 | MABUBU | 23.5% | 55.2% | 14 | 18 | 7 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L2 | 2 | CALL ME SPARKLE | 13.1% | 40.0% | 5.3 | 3.1 | 2 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L3 | 8 | LITTLE MONSTER | 11.6% | 36.5% | 6.9 | 8.4 | 3 | ✅ | 腳 (Leg) | ✅ | 5 |
| L4 | 6 | HOLMES A COURT | 11.1% | 35.4% | 37 | 49 | 9 | ✅ | 腳 (Leg) | ✅ | 12 |
| L5 | 10 | WARRIORS DREAM | 4.7% | 19.4% | 26 | 45 | 8 | ✅ | 腳 (Leg) | ✅ | 6 |
| — | 4 | MIGHTY PROFIT | 3.5% | 16.2% | 2.5 | 2.8 | 1 | ❌ | — | ✅ | 1 🏆 |
| — | 5 | SILVER BLAZE | 3.2% | 14.5% | 31 | 72 | 10 | ❌ | — | ❌ | 10 |
| — | 11 | SUPER DRAGON | 2.3% | 11.3% | 28 | 12 | 6 | ❌ | — | ❌ | 4 |
| — | 9 | LUCKY DOCTOR | 2.0% | 9.8% | 14 | 9.5 | 4 | ❌ | — | ❌ | 9 |
| — | 12 | BEST FARM | 0.7% | 3.9% | 59 | 113 | 12 | ❌ | — | ❌ | 7 |
| — | 3 | INVINCIBLE STARR | 0.3% | 2.3% | 41 | 81 | 11 | ❌ | — | ❌ | 11 |

**Top 3:** 4–2–7 · **Outside B pool:** #4 · **Banker #1 finished 8**

**Pattern analysis — Pattern C.** MC #1 #1 CROSSBORDERDUDE (24.0%) led #7 MABUBU (23.5%) by only 0.5pp. It **drifted 5.8→10 and ran 8th**. L1 #7 (MC #2) ran 3rd at 18 and L2 #2 CALL ME SPARKLE (MC #3, 5.3→3.1) ran 2nd. The winner was **#4 MIGHTY PROFIT, MC #7 (3.5%, 1 career start)**, the 2.5 favourite that MC called "overvalued by 91%". B-trio's Win-odds < 10 step added #4, and A's Rule 8/9 included it (`+excuses` + `+trial` lifted it to Adj Place 20.2%). **Signals missed:** the market favourite with sparse data (MC < 4% at SP ≤ 6: 3/3 this card) and the banker's drift.

### R4 — Class 3 | 1200m AWT | Good | Trio $43

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 2 | BUSTLING CITY | 63.9% | 93.1% | 1.5 | 1.4 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 2 ✅ |
| L1 | 8 | KEMPES | 18.8% | 68.9% | 12 | 5.7 | 2 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L2 | 4 | SKY CAP | 7.2% | 43.8% | 19 | 44 | 7 | ✅ | 腳 (Leg) | ✅ | 4 |
| L3 | 9 | ZHUANG YUAN GLORY | 3.9% | 29.8% | 6.6 | 17 | 5 | ✅ | 腳 (Leg) | ✅ | 6 |
| L4 | 1 | LUCY IN THE SKY | 2.6% | 24.6% | 9.2 | 7.8 | 3 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L5 | 7 | TOGETHER WE VALUE | 1.8% | 18.8% | 13 | 13 | 4 | ✅ | 腳 (Leg) | ✅ | 5 |
| — | 6 | CALA DEI MORI | 1.2% | 11.9% | 25 | 27 | 6 | ❌ | — | ❌ | 7 |
| — | 10 | DRAGON JOY | 0.6% | 9.2% | 30 | 67 | 8 | ❌ | — | ❌ | 8 |

**Top 3:** 8–2–1 · **Outside B pool:** none · **Banker #2 finished 2**

**Pattern analysis — HIT.** MC #1 #2 BUSTLING CITY (63.9%, 1.4 fav) ran 2nd. **L1 #8 KEMPES (MC #2, "undervalued by 126%") was backed 12→5.7 and won.** L4 #1 LUCY IN THE SKY (MC #5, 2.6% win but 24.6% place in an 8-runner field) ran 3rd. Trio paid only $43, so B's 10-combo ticket lost $57. A's 雙膽拖 (4 combos) made +$3.

### R5 — Class 4 | 1200m AWT | Good | Trio $632

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 2 | MEGA CAPTAIN | 26.8% | 61.5% | 2.5 | 2.7 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 4 |
| L1 | 6 | ARMOUR WAR EAGLE | 26.5% | 60.7% | 9.7 | 8.9 | 4 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L2 | 1 | JUICY DRAGON | 15.3% | 45.1% | 11 | 7.1 | 3 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L3 | 8 | GIANT LEAP | 8.9% | 32.4% | 13 | 9.2 | 5 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L4 | 9 | GROUPER | 6.9% | 27.2% | 10 | 23 | 7 | ✅ | 腳 (Leg) | ✅ | 12 |
| L5 | 3 | SOMELOVEFROMABOVE | 4.8% | 20.3% | 13 | 34 | 11 | ✅ | 腳 (Leg) | ✅ | 9 |
| — | 12 | NOBLE DELUXE | 4.6% | 20.4% | 22 | 26 | 9 | ❌ | — | ✅ | 11 |
| — | 4 | CENTRAL BANK | 3.6% | 16.7% | 11 | 6.1 | 2 | ❌ | — | ❌ | 7 |
| — | 7 | GOOD CHAP | 1.9% | 10.7% | 12 | 26 | 9 | ❌ | — | ❌ | 6 |
| — | 10 | GIANT SPIRIT | 0.3% | 2.4% | 22 | 25 | 8 | ❌ | — | ❌ | 10 |
| — | 11 | KING'S ARROW | 0.2% | 1.6% | 12 | 9.2 | 5 | ❌ | — | ❌ | 5 |
| — | 5 | TACTICAL ACE | 0.2% | 1.3% | 18 | 45 | 12 | ❌ | — | ❌ | 8 |

**Top 3:** 6–8–1 · **Outside B pool:** none · **Banker #2 finished 4**

**Pattern analysis — Pattern A (all 3 placers in legs).** MC #1 #2 MEGA CAPTAIN (26.8%, 2.5 fav, resuming after 120 days) ran **4th**. **L1 #6 ARMOUR WAR EAGLE (26.5%, only 0.3pp behind, "undervalued by 162%") won at 8.9.** L3 #8 GIANT LEAP (MC #4) ran 2nd and L2 #1 JUICY DRAGON (MC #3, backed 11→7.1) ran 3rd. **Signals missed:** a near-tie at the top of MC, and a banker returning from a long layoff.

### R6 — Class 4 | 1200m Turf | Good | Trio $212

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 2 | GALLANT DESIGN | 40.2% | 73.4% | 4.4 | 1.9 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 2= ✅ |
| L1 | 7 | NOBLE SUPERIOR | 17.4% | 49.6% | 5.5 | 7.7 | 3 | ✅ | 腳 (Leg) | ✅ | 2= ✅ |
| L2 | 6 | TELECOM FORTUNE | 9.7% | 34.1% | 31 | 73 | 12 | ✅ | 腳 (Leg) | ✅ | 12 |
| L3 | 12 | LET'S HAVE FUN | 6.7% | 26.0% | 6.8 | 11 | 5 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L4 | 9 | HAPPY BRETHREN | 6.5% | 25.8% | 17 | 17 | 7 | ✅ | 腳 (Leg) | ✅ | 8 |
| L5 | 3 | DRAGON SKY FORCE | 6.4% | 25.5% | 5.0 | 7.6 | 2 | ✅ | 腳 (Leg) | ✅ | 4 |
| — | 4 | GLORY PATCH | 3.4% | 16.0% | 14 | 42 | 11 | ❌ | — | ❌ | 5 |
| — | 8 | PARROT BLESSING | 3.3% | 15.5% | 16 | 36 | 10 | ❌ | — | ❌ | 9 |
| — | 10 | ENJOY GOLF | 2.3% | 12.1% | 8.3 | 16 | 6 | ❌ | — | ✅ | 11 |
| — | 5 | SASSPHIRE | 2.0% | 11.1% | 23 | 35 | 9 | ❌ | — | ❌ | 10 |
| — | 11 | AMO ERGO SUM | 1.1% | 6.1% | 32 | 10 | 4 | ❌ | — | ❌ | 6 |
| — | 1 | STANLEY EXPRESS | 0.9% | 4.8% | 20 | 30 | 8 | ❌ | — | ❌ | 7 |

**Top 3:** 12–2–7 · **Outside B pool:** none · **Banker #2 finished 2**

**Pattern analysis — HIT.** MC #1 #2 GALLANT DESIGN (40.2%, Purton, backed 4.4→1.9) dead-heated for 2nd with **L1 #7 NOBLE SUPERIOR** (MC #2). **L3 #12 LET'S HAVE FUN (MC #4) won at 11.** MC #1, #2 and #4 filled the frame. B returned $212 on $100 (+$112).

### R7 — Class 4 | 1400m Turf | Good | Trio $8,829

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 3 | ABSOLUTE AWAKENED | 42.4% | 76.4% | 4.6 | 5.6 | 3 | ✅ | 膽 (Banker, MC #1) | ✅ | 4 |
| L1 | 5 | STORM MIRROR | 18.7% | 55.0% | 8.3 | 8.9 | 4 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L2 | 6 | CAVA PIONEER | 18.1% | 52.9% | 5.4 | 5.3 | 2 | ✅ | 腳 (Leg) | ✅ | 10 |
| L3 | 2 | LUNAR DASH | 6.1% | 26.0% | 32 | 50 | 11 | ✅ | 腳 (Leg) | ✅ | 9 |
| L4 | 9 | STUNNING BUNDLE | 3.9% | 18.9% | 11 | 27 | 8 | ✅ | 腳 (Leg) | ✅ | 7 |
| L5 | 14 | GOOD LUCK BABE | 2.7% | 15.3% | 7.0 | 8.9 | 4 | ✅ | 腳 (Leg) | ✅ | 8 |
| — | 11 | DAILY FUN | 1.8% | 11.4% | 39 | 93 | 12 | ❌ | — | ❌ | 13 |
| — | 10 | TIN FOOK | 1.7% | 10.9% | 7.4 | 2.9 | 1 | ❌ | — | ✅ | 2 ✅ |
| — | 12 | FLUORESCENCE | 1.4% | 9.8% | 64 | 145 | 14 | ❌ | — | ❌ | 14 |
| — | 8 | M M CONCORD | 1.4% | 9.4% | 20 | 29 | 10 | ❌ | — | ❌ | 11 |
| — | 13 | SOO KOO | 0.7% | 4.5% | 67 | 142 | 13 | ❌ | — | ❌ | 3 ✅ |
| — | 7 | TYCOON EXPRESS | 0.6% | 4.8% | 23 | 11 | 6 | ❌ | — | ❌ | 5 |
| — | 4 | ONE MORE | 0.3% | 2.6% | 15 | 28 | 9 | ❌ | — | ❌ | 12 |
| — | 1 | HAPPY TERCENTENARY | 0.2% | 2.1% | 11 | 24 | 7 | ❌ | — | ❌ | 6 |

**Top 3:** 5–10–13 · **Outside B pool:** #10, #13 · **Banker #3 finished 4**

**Pattern analysis — Pattern C.** MC #1 #3 ABSOLUTE AWAKENED (42.4%, 4.6→5.6) ran **4th**. **L1 #5 STORM MIRROR (MC #2) won at 8.9.** 2nd was **#10 TIN FOOK, MC #8 (1.7%)**, the 7.4 4th favourite that was backed to **2.9 SP favourite**. SCMP flagged it `-perf`, and A kept it in under Rule 9. 3rd was **#13 SOO KOO, MC #11 (0.7%) at 142/1**. **Signals missed:** #10's market support (MC < 3% at SP ≤ 6). #13 was unforecastable.

### R8 — Class 4 | 1600m Turf | Good | Trio $171

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 12 | FAMILY FORTUNE | 17.2% | 42.3% | 33 | 77 | 13 | ✅ | 膽 (Banker, MC #1) | PASS | 13 |
| L1 | 1 | JOLLY BRILLIANT | 13.8% | 36.9% | 6.5 | 5.6 | 2 | ✅ | 腳 (Leg) | PASS | 1 🏆 |
| L2 | 11 | GORGEOUS VICTORY | 13.7% | 36.6% | 2.6 | 2 | 1 | ✅ | 腳 (Leg) | PASS | 3 ✅ |
| L3 | 4 | MEGA MASTERMIND | 11.9% | 32.5% | 38 | 16 | 5 | ✅ | 腳 (Leg) | PASS | 7 |
| L4 | 7 | FLYING BOOM | 11.2% | 32.5% | 9.7 | 14 | 4 | ✅ | 腳 (Leg) | PASS | 2 ✅ |
| L5 | 2 | ACE | 7.4% | 23.8% | 19 | 32 | 9 | ✅ | 腳 (Leg) | PASS | 8 |
| — | 5 | BEAUTY VIVA | 5.4% | 17.9% | 19 | 84 | 14 | ❌ | — | PASS | 14 |
| — | 6 | BUCEPHALAS | 4.6% | 15.1% | 17 | 34 | 11 | ❌ | — | PASS | 10 |
| — | 10 | AUTOMATED | 3.9% | 14.8% | 24 | 26 | 8 | ❌ | — | PASS | 5 |
| — | 9 | BLING BLING GENIUS | 2.9% | 12.0% | 24 | 20 | 7 | ❌ | — | PASS | 4 |
| — | 3 | MASTER TRILLION | 2.6% | 11.2% | 9.7 | 18 | 6 | ❌ | — | PASS | 9 |
| — | 8 | BEST WORLD | 2.3% | 9.5% | 19 | 32 | 9 | ❌ | — | PASS | 11 |
| — | 14 | BRIGHT INHERITANCE | 1.6% | 7.4% | 34 | 60 | 12 | ❌ | — | PASS | 12 |
| — | 13 | SMART FAT CAT | 1.6% | 7.4% | 10 | 6.8 | 3 | ❌ | — | PASS | 6 |

**Top 3:** 1–7–11 · **Outside B pool:** none · **Banker #12 finished 13**

**Pattern analysis — Pattern A (all 3 placers in legs).** MC #1 #12 FAMILY FORTUNE (17.2%, "undervalued by 485%") drifted 33→77 and ran **13th**. The rest of the MC top 6 filled the frame: **L1 #1 JOLLY BRILLIANT (MC #2) won at 5.6**, L4 #7 FLYING BOOM (MC #5) ran 2nd and L2 #11 GORGEOUS VICTORY (MC #3, 2.0 fav) ran 3rd. Strategy A passed this race (Mode D). **Signals missed:** a 33/1 MC #1 in a flat-rated field is not a banker. The market had it 12th.

### R9 — Class 3 | 1200m Turf | Good | Trio $367

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 3 | HAPPY INDEX | 35.5% | 67.9% | 4.1 | 4 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 3 ✅ |
| L1 | 8 | MEGASTAR HEART | 15.2% | 42.9% | 7.9 | 5 | 2 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L2 | 4 | COOL BOY | 13.9% | 42.3% | 7.6 | 6.1 | 3 | ✅ | 腳 (Leg) | ✅ | 6 |
| L3 | 7 | EVER LUCK | 10.0% | 34.8% | 29 | 35 | 10 | ✅ | 腳 (Leg) | ✅ | 12 |
| L4 | 2 | GALACTIC VOYAGE | 6.3% | 25.4% | 10 | 13 | 7 | ✅ | 腳 (Leg) | ✅ | 5 |
| L5 | 6 | ELITE GOLF | 6.1% | 24.2% | 12 | 13 | 7 | ✅ | 腳 (Leg) | ✅ | 9 |
| — | 1 | SWIFT ASCEND | 5.2% | 21.0% | 9.8 | 7.2 | 4 | ❌ | — | ✅ | 2 ✅ |
| — | 9 | SILK MASTER | 2.3% | 10.8% | 17 | 37 | 11 | ❌ | — | ❌ | 4 |
| — | 10 | EMBRACE ABERDEEN | 1.7% | 9.7% | 4.4 | 8.1 | 5 | ❌ | — | ❌ | 7 |
| — | 5 | ON THE WAY | 1.3% | 7.1% | 28 | 76 | 12 | ❌ | — | ❌ | 8 |
| — | 11 | SHANGHAI WARRIOR | 1.2% | 7.2% | 24 | 12 | 6 | ❌ | — | ❌ | 10 |
| — | 12 | ENDURANCE EXPRESS | 1.1% | 6.7% | 21 | 22 | 9 | ❌ | — | ❌ | 11 |

**Top 3:** 8–1–3 · **Outside B pool:** #1 · **Banker #3 finished 3**

**Pattern analysis — Pattern B.** MC #1 #3 HAPPY INDEX (35.5%, 4.0 fav) ran 3rd. **L1 #8 MEGASTAR HEART (MC #2) won.** The gap was **#1 SWIFT ASCEND, MC #7 (5.2% win, 21.0% place)**, backed 9.8→7.2 after a 217-day layoff, which ran 2nd. A (Rule 8) and B-trio (Place% > 20% primary leg) both included #1 and hit $367. **Signals missed:** #1's MC Place% was above 20%, and B's strict top-6 cut-off by Win% left it out. MC's overlay #7 EVER LUCK ("undervalued by 191%") ran 12th.

### R10 — Class 3 | 1400m Turf "C" | Good | Trio $1,135

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 3 | FIT FOR BEAUTY | 32.7% | 64.4% | 8.0 | 8 | 4 | ✅ | 膽 (Banker, MC #1) | ✅ | 9 |
| L1 | 7 | CHIU CHOW SPIRIT | 16.6% | 43.4% | 7.4 | 12 | 6 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L2 | 10 | DO YOUR PART | 8.7% | 29.6% | 7.3 | 3.5 | 1 | ✅ | 腳 (Leg) | ✅ | 7 |
| L3 | 9 | CELESTIAL HERO | 8.1% | 26.7% | 8.0 | 7.2 | 3 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L4 | 2 | TITAN PEGASUS | 7.1% | 26.3% | 3.6 | 4 | 2 | ✅ | 腳 (Leg) | ✅ | 5 |
| L5 | 1 | BEAUTY CRESCENT | 5.5% | 19.5% | 9.3 | 8.4 | 5 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| — | 14 | TANG HEART | 4.5% | 18.4% | 15 | 37 | 10 | ❌ | — | ❌ | 11 |
| — | 12 | GULU GOGO | 4.4% | 18.6% | 22 | 22 | 8 | ❌ | — | ❌ | 10 |
| — | 8 | STAY COSMIC | 3.7% | 14.7% | 41 | 108 | 14 | ❌ | — | ❌ | 6 |
| — | 11 | ANOTHER ZONDA | 3.5% | 15.2% | 43 | 94 | 13 | ❌ | — | ❌ | 13 |
| — | 4 | EVERYONE'S STAR | 3.1% | 13.1% | 30 | 16 | 7 | ❌ | — | ❌ | 4 |
| — | 13 | SUPER UNICORN | 1.5% | 7.0% | 38 | 93 | 12 | ❌ | — | ❌ | 12 |
| — | 5 | FORTUNE LINK | 0.6% | 3.0% | 15 | 23 | 9 | ❌ | — | ❌ | 8 |
| — | 6 | SO NAIVE | 0.0% | 0.1% | 29 | 80 | 11 | ❌ | — | ❌ | 14 |

**Top 3:** 9–1–7 · **Outside B pool:** none · **Banker #3 finished 9**

**Pattern analysis — Pattern A (all 3 placers in legs).** MC #1 #3 FIT FOR BEAUTY (32.7%, fastest projected time, "undervalued by 165%" at 8.0) ran **9th**. **L4 #9 CELESTIAL HERO (MC #4) won**, L5 #1 BEAUTY CRESCENT (MC #6) ran 2nd and L1 #7 CHIU CHOW SPIRIT (MC #2) ran 3rd. The market favourite #10 (backed 7.3→3.5) ran 7th and #2 (3.6) ran 5th. **Signals missed:** MC #1 was 4th–5th in the market. MC #1 at SP rank 4+ is now 5/21 over eight cards.

### R11 — Class 2 | 1200m Turf | Good | Trio $146

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 11 | JUMBO TREASURE | 43.2% | 82.9% | 3.9 | 3.3 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 4 |
| L1 | 2 | RISING FORCE | 26.1% | 71.6% | 7.5 | 5.7 | 4 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L2 | 1 | STORM RIDER | 16.8% | 56.5% | 9.2 | 14 | 5 | ✅ | 腳 (Leg) | ✅ | 5 |
| L3 | 3 | KA YING ATTACK | 5.6% | 30.5% | 7.1 | 5 | 3 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L4 | 4 | YOUNG CHAMPION | 3.8% | 23.1% | 14 | 16 | 6 | ✅ | 腳 (Leg) | ✅ | 9 |
| L5 | 6 | TURQUOISE VELOCITY | 3.4% | 22.6% | 4.1 | 3.9 | 2 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| — | 9 | BLAZING WIND | 0.8% | 6.9% | 14 | 17 | 7 | ❌ | — | ❌ | 11 |
| — | 7 | JOHANNES BRAHMS | 0.1% | 1.8% | 25 | 30 | 8 | ❌ | — | ❌ | 8 |
| — | 12 | PAKISTAN LEGACY | 0.1% | 1.5% | 29 | 55 | 10 | ❌ | — | ❌ | 7 |
| — | 10 | BRAVE STAR | 0.1% | 1.4% | 37 | 109 | 11 | ❌ | — | ❌ | 12 |
| — | 8 | SON PAK FU | 0.1% | 0.9% | 16 | 38 | 9 | ❌ | — | ❌ | 6 |
| — | 5 | SELF IMPROVEMENT | 0.0% | 0.5% | 33 | 118 | 12 | ❌ | — | ❌ | 10 |

**Top 3:** 3–6–2 · **Outside B pool:** none · **Banker #11 finished 4**

**Pattern analysis — Pattern A (all 3 placers in legs).** MC #1 #11 JUMBO TREASURE (43.2% / 82.9%, 3.3 fav) ran **4th**. L3 #3 KA YING ATTACK (MC #4) won, **L5 #6 TURQUOISE VELOCITY (MC #6, 3.4%) — the 4.1 2nd favourite MC rated "overvalued" — ran 2nd**, and L1 #2 RISING FORCE (MC #2) ran 3rd. **Signals missed:** MC again under-rated a short-priced market horse (#6), but it was still inside the top 6. This was purely a banker failure.

## B Banker Performance

| Race | B banker (MC #1) | MC Win% | MC Place% | Pre odds | SP | Mkt rank (SP) | Placed? | Position |
|------|------------------|---------|-----------|----------|----|---------------|---------|----------|
| R1 | #4 JOLLY COMPANION | 27.0% | 59.4% | 5.9 | 5.5 | 3 | ❌ | 11th |
| R2 | #4 SPICY SPANGLE | 37.8% | 76.8% | 6.8 | 5.5 | 2 | ❌ | 5th |
| R3 | #1 CROSSBORDERDUDE | 24.0% | 55.5% | 5.8 | 10 | 5 | ❌ | 8th |
| R4 | #2 BUSTLING CITY | 63.9% | 93.1% | 1.5 | 1.4 | 1 | ✅ | 2nd |
| R5 | #2 MEGA CAPTAIN | 26.8% | 61.5% | 2.5 | 2.7 | 1 | ❌ | 4th |
| R6 | #2 GALLANT DESIGN | 40.2% | 73.4% | 4.4 | 1.9 | 1 | ✅ | 2nd= |
| R7 | #3 ABSOLUTE AWAKENED | 42.4% | 76.4% | 4.6 | 5.6 | 3 | ❌ | 4th |
| R8 | #12 FAMILY FORTUNE | 17.2% | 42.3% | 33 | 77 | 13 | ❌ | 13th |
| R9 | #3 HAPPY INDEX | 35.5% | 67.9% | 4.1 | 4.0 | 1 | ✅ | 3rd |
| R10 | #3 FIT FOR BEAUTY | 32.7% | 64.4% | 8.0 | 8.0 | 4 | ❌ | 9th |
| R11 | #11 JUMBO TREASURE | 43.2% | 82.9% | 3.9 | 3.3 | 1 | ❌ | 4th |

**Banker top 3: 3/11 (27.3%). Banker win: 0/11.**
Mean MC Win% of bankers was **35.5%** and mean MC Place% **68.5%**, against an actual place rate of **27.3%**: overstated by ~41pp, the biggest gap of the season (07-Oct: +22pp; 04-Oct: +18pp; 01-Oct: +12pp; 27-Sep: +25pp; 23-Sep: +7pp; 16-Sep: −8pp). MC #1 ≥ 35% placed **3/6** (R4, R6, R9 ✅; R2, R7, R11 ❌). Below 35% it placed **0/5**. Three bankers ran exactly 4th (R5, R7, R11).

**Market-rank split (SP), eight meetings:**

| Banker profile (MC #1 market rank at SP) | 13-Sep ST | 16-Sep HV | 23-Sep HV | 27-Sep ST | 01-Oct ST | 04-Oct ST | 07-Oct HV | 11-Oct ST | Combined |
|------------------------------------------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|----------|
| Market rank 1–2 | 3/4 | 6/6 | 3/5 | 3/7 | 5/6 | 4/6 | 2/7 | **3/6** | **29/47 (61.7%)** |
| Market rank 3 | 0/1 | — | 0/1 | 1/1 | 1/3 | 1/3 | 1/1 | **0/2** | 4/12 (33.3%) |
| Market rank 4+ | 0/5 | 0/2 | 2/3 | 1/3 | 0/2 | 1/2 | 1/1 | **0/3** | **5/21 (23.8%)** |

Rank 1–2 went 3/6, and the three failures were all favourites (R2 #4 5.5, R5 #2 2.7, R11 #11 3.3). Rank 3+ went 0/5. Over eight cards, a banker the market rates 3rd or worse has placed **9/33 (27.3%)**, against **29/47 (61.7%)** at rank 1–2. That is still the clearest B banker filter in the data.

**MC #2 placement (hindsight check):** 10/11 this card (R2 #2, R3 #7, R4 #8, R5 #6, R6 #7, R7 #5, R8 #1, R9 #8, R10 #7, R11 #2; only R1 #5 failed). Over the previous eight cards (09-Sep to 07-Oct, parsed from the per-race tables) MC #2 placed **27/77 (35.1%)** and MC #1 **39/77 (50.6%)**. Season-to-date: MC #1 **42/88 (47.7%)**, MC #2 **37/88 (42.0%)**.

## Conclusions for Strategy B

1. **A beat B by $407, mostly on R9.** B's Win%-ranked top 6 left out MC #7 #1 SWIFT ASCEND (Place% 21.0%), which ran 2nd behind a placed banker. A (Rule 8) and B-trio (Place% > 20% primary) both had it. A Place%-based 6th leg would have suited B better than a Win%-based one here, and it is worth testing across the stratC history.
2. **The banker lost B this card: it failed in 8 of 9 misses, and in four of them every placer was a leg** (R5, R8, R10, R11; $2,084 of Trios). MC #1 below 35% went 0/5, and MC #1 at market rank 3+ went 0/5.
3. **Pool size is still not B's lever.** B7 (1膽+6腳) would have caught R9 but lost more overall (−$1,028 vs −$845), because R2 and R3's MC #7 placers came with failed bankers.
4. **MC #2 placed 10/11, but only 35% over the previous eight cards.** This is a single-card spike, not a reason to swap bankers. The near-tie cases (R3 gap 0.5pp, R5 gap 0.3pp) are the narrow sub-case worth backtesting as "bank MC #2" or "box".
5. **The near-zero market blind spot repeated:** MC Win% < 4% at SP ≤ 6 placed 3/3 (R3 #4 won, R7 #10 2nd, R11 #6 2nd). Only R11 #6 was inside B's top 6.
