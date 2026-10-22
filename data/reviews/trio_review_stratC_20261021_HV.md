# Trio Strategy B (stratC) Review — Happy Valley | 2026-10-21

**Meeting 13 of the 2026/27 season.** A 9-race Wednesday night card, all on the Turf "B" course, going **Good** throughout. Results: `data/historical/results_20261021_HV.json` (scraped fresh, DT ✓, TT —). Every Trio dividend parsed in full, and the Tierce/Trio ratios (3.3–6.6) fit the finishing SPs. The R2 Quinella field is truncated (**$1**; comma-thousands). It is not used here and was not edited. No scratchings.

> **Live pre-race run.** All 9 reports were generated on race day with **SCMP loaded** and **HKJC 11:00–11:01 HKT morning odds**. Strategy B (review-spec) uses only raw MC Win%, so neither factor affects it. **B-trio's Win-odds < 10 step used the 11:00 odds**, so today's B-trio result is a clean, non-hindsight test of that step, unlike 19-Oct. The per-race tables show both the 11:00 odds and the SP.

> **Convention for this review.** **Strategy B** = the **post-race-review skill definition**: MC top 6 by raw MC Win%, MC #1 = banker, 1膽+5腳 = 10 combos = **$100/race**, all races (including R9, which A passed). **The reports' own "STRATEGY B (MC-only)" ticket is a different strategy.** It uses Place% > 20% legs plus a Win-odds < 10 swap/add, with variable stake, and is kept below as **B-trio**. Ties at MC Win% are broken on MC Place%.

**Strategy B hit 0/9 and lost −$900 (−100%). Strategy A hit 0/8 and lost −$790. It passed R9, where its Mode C shadow would have hit $469.** B's MC #1 banker placed **5/9** with **4 wins** (R4, R6, R8, R9), and in all five of those races the pool missed a horse. **Four of the six gap horses in those races were MC #7 or #8.** **B-trio hit 1/9 (R6 $556) and lost −$704.** Its Step B added R6's #9 but swapped out two placers (R4 #7, R9 #5).

## Rules

**Strategy B (review-spec, used for the headline numbers):**
- **Banker** = MC #1 by raw MC Win% (no debutant rule, no SCMP, no jockey boost)
- **Legs** = MC #2–#6 by raw MC Win%
- **Unit** $10, structure 膽拖 1膽 + 5腳, C(5,2) = **10 combos = $100**, all races played
- **Hit** = banker top 3 AND all 3 placers in the 6-horse pool

**B-trio (reports' own MC-only ticket, for continuity):**
- **Banker** = MC #1; **primary legs** = every other horse with MC Place% > 20%
- **Step B** = any horse with MC Place% ≤ 20% AND Win odds < 10 (11:00 odds) replaces the lowest-Place% primary leg that is 20–30% with odds > 10; otherwise it is **added**
- **Unit** $10, 膽拖, combos = C(N,2)

## Summary

| Metric | Strategy B (MC top 6) | Strategy A (as bet) | B-trio (report's B) |
|---|---|---|---|
| Races | 9 | 8 (R9 PASS) | 9 |
| Hits | **0/9 (0.0%)** | **0/8 (0.0%)** | **1/9 (11.1%)** |
| Combos | 90 | 79 | 126 |
| Staked | $900 | $790 | $1,260 |
| Returned | $0 | $0 | $556 |
| **Net P&L** | **−$900** | **−$790** | **−$704** |
| **ROI** | **−100.0%** | **−100.0%** | **−55.9%** |
| Banker top 3 | 5/9 (55.6%) | 3/8 (37.5%) | 5/9 (55.6%) |

Season Strategy B (review-spec): **17/126, $12,490 staked, $5,497 returned, −$6,993, −56.0%**. Season Strategy A: **18/124, $11,640, $5,768, −$5,872, −50.4%**. Season B-trio: **29/126, $15,630, $7,588, −$8,042, −51.5%**.

## Race-by-Race Results — Strategy B

| R | Class | Dist | Surf | Banker (MC#1) | Final legs | Combos | Stake | Result | Banker top 3? | Hit? | Trio $ | Return | P&L |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 4 | 1650m | Turf | #2 | 6, 7, 11, 1, 10 | 10 | $100 | 6→11→**5** | ❌ 4th | MISS ❌ | $800 | $0 | −100 |
| R2 | Class 5 | 1200m | Turf | #5 | 11, 4, 3, 1, 10 | 10 | $100 | **6**→4→**2** | ❌ 9th | MISS ❌ | $7,587 | $0 | −100 |
| R3 | Class 4 | 1650m | Turf | #4 | 3, 8, 1, 6, 5 | 10 | $100 | 3→8→**10** | ❌ 9th | MISS ❌ | $408 | $0 | −100 |
| R4 | Class 4 | 1200m | Turf | #4 | 3, 1, 5, 7, 10 | 10 | $100 | 4→7→**8** | ✅ 1st | MISS ❌ | $2,228 | $0 | −100 |
| R5 | Class 4 | 1000m | Turf | #3 | 1, 2, 4, 10, 11 | 10 | $100 | 10→3→**6** | ✅ 2nd | MISS ❌ | $1,613 | $0 | −100 |
| R6 | Class 2 | 1000m | Turf | #1 | 4, 8, 2, 10, 5 | 10 | $100 | 1→4→**9** | ✅ 1st | MISS ❌ | $556 | $0 | −100 |
| R7 | Class 4 | 1200m | Turf | #5 | 3, 10, 9, 4, 2 | 10 | $100 | 2→10→**11** | ❌ 7th | MISS ❌ | $213 | $0 | −100 |
| R8 | Class 3 | 1200m | Turf | #12 | 2, 1, 8, 6, 3 | 10 | $100 | 12→**5**→**4** | ✅ 1st | MISS ❌ | $910 | $0 | −100 |
| R9 | Class 3 | 1650m | Turf | #4 | 10, 1, 2, 3, 9 | 10 | $100 | 4→**5**→2 | ✅ 1st | MISS ❌ | $469 | $0 | −100 |
| **TOTAL** | | | | | | **90** | **$900** | | **5/9** | **0/9** | | **$0** | **−900** |

## Race-by-Race Results — Strategy A

| R | Class | Mode | Banker(s) | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | C4 | A→6 | #2 | 6,11,7,10,1 | 10 | $100 | 6→11→5 | MISS ❌ | $800 | $0 | −100 | Banker 4th + gap #5 (MC #8) |
| R2 | C5 | B (6) | #5 | 11,1,4,3,10 | 10 | $100 | 6→4→2 | MISS ❌ | $7,587 | $0 | −100 | Banker 9th + gaps #6 (MC #8), #2 (MC #11) |
| R3 | C4 | A→6 | #4 | 3,8,1,6,5 | 10 | $100 | 3→8→10 | MISS ❌ | $408 | $0 | −100 | Banker 9th + gap #10 (MC #7) |
| R4 | C4 | B (6) | #4 | 3,1,5,10,7 | 10 | $100 | 4→7→8 | MISS ❌ | $2,228 | $0 | −100 | Banker won, gap #8 (MC #12, 48) |
| R5 | C4 | B+ (7) | #3 | 1,2,4,9,11,10 | 15 | $150 | 10→3→6 | MISS ❌ | $1,613 | $0 | −150 | Banker 2nd, gap #6 (MC #8 debutant) |
| R6 | C2 | B 雙膽拖 | #1 + #4 | 8,2,10,5 | 4 | $40 | 1→4→9 | MISS ❌ | $556 | $0 | −40 | Both bankers 1–2, gap #9 (MC #8, 6.8) |
| R7 | C4 | A+R9 (6) | #5 | 3,10,9,4,2 | 10 | $100 | 2→10→11 | MISS ❌ | $213 | $0 | −100 | Banker 7th + gap #11 (MC #9) |
| R8 | C3 | B (6) | #2 (SCMP flip) | 12,1,8,6,3 | 10 | $100 | 12→5→4 | MISS ❌ | $910 | $0 | −100 | Banker 4th (MC #1 #12 won) + gaps #5, #4 |
| R9 | C3 | D: PASS | (#4) | (10,1,2,9,3,5) | (15) | $0 | 4→5→2 | PASS | $469 | $0 | 0 | Shadow would have HIT ($469 on $150) |

## B-trio (report's MC-only ticket) — Race-by-Race, for reference

| R | Banker | Final legs | Step B action (11:00 odds) | Stake | Hit? | Pattern |
|---|---|---|---|---|---|---|
| R1 | #2 | 6,7,11,1,10,3 | #3 (7.5) replaced #4 | $150 | ❌ | C — missed #5; banker 4th |
| R2 | #5 | 11,4,3,1,10,8 | none | $150 | ❌ | C — missed #6, #2; banker 9th |
| R3 | #4 | 3,8,1,6,5 | none (#10 at exactly 10.0) | $100 | ❌ | C — missed #10; banker 9th |
| R4 | #4 | 3,1,5,11,12 | #11 replaced #10; #12 replaced #7 | $100 | ❌ | B — missed #8; **the swap removed #7 (2nd)** |
| R5 | #3 | 1,2,10,11,12,7 | #12 replaced #9; #7 replaced #4 | $150 | ❌ | B — missed #6 |
| R6 | #1 | 4,8,2,3,9 | #3 replaced #10; #9 added | $100 | ✅ $556 | — (#9 3rd) |
| R7 | #5 | 3,10,9,4,2,11 | #11 replaced #1 | $150 | ❌ | C — banker 7th (#11 3rd was in) |
| R8 | #12 | 2,1,8,7,9,5 | #7 replaced #3; #9 replaced #6; #5 added | $150 | ❌ | B — missed #4 (#5 2nd was in) |
| R9 | #4 | 10,2,1,3,9,11,6 | #11 replaced #5; #6 added | $210 | ❌ | B — **the swap removed #5 (2nd)** |
| **TOTAL** | | | | **$1,260** | **1/9** | $556 returned, −$704 |

**Step B placed 3 of its 13 candidates** (R6 #9, R7 #11, R8 #5). The misses were R1 #3, R4 #11 and #12, R5 #12 and #7, R6 #3, R8 #7 and #9, and R9 #11 and #6. **It converted once (R6).** In R7 its banker failed, and in R8 #4 (MC #9) was still out. **Its swaps removed two placers:** R4 #7 (2nd) and R9 #5 (2nd). The R9 swap cost a $469 hit. Its other swaps removed R1 #4 (6th), R4 #10 (12th), R5 #9 (10th) and #4 (7th), R6 #10 (8th), R7 #1 (11th) and R8 #3 (5th) and #6 (10th). **This is the first fully live (11:00 odds) test of Step B since 14-Oct.** Candidates placed 23%, and the swap-only part was net negative.

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| A — Banker fail, all 3 placers in legs | **0/9** | — |
| B — Banker hit, pool gap | **5/9** | R4 (#8 MC #12), R5 (#6 MC #8), R6 (#9 MC #8), R8 (#5 MC #7, #4 MC #9), R9 (#5 MC #7) |
| C — Banker fail + pool gap | **4/9** | R1 (#5 MC #8), R2 (#6 MC #8, #2 MC #11), R3 (#10 MC #7), R7 (#11 MC #9) |

**The 11 B gap horses were concentrated just outside the pool.** By MC rank: #7 ×3 (R3 #10, R8 #5, R9 #5), #8 ×4 (R1 #5, R2 #6, R5 #6, R6 #9), #9 ×2 (R7 #11, R8 #4), #11 ×1 (R2 #2) and #12 ×1 (R4 #8). **A 7th leg (B7, 1膽+6腳 = $150) would have fixed R9 ($469).** **An 8-horse pool (B8, 1膽+7腳 = $210) would have fixed R5 ($1,613), R6 ($556) and R9 ($469), for +$748 on the card.** On 19-Oct, by contrast, B7 added nothing and the gaps ran MC #7–#13. **Noteworthy:** four of the five Pattern B races had a winning banker (R4, R6, R8, R9), and the 5th was 2nd (R5). The pool, not the banker, cost B this card.

## Full MC Place% Table — Per Race

Seq: ★ = 膽 (MC #1 banker), L1–L5 = 腳 by MC Win% rank, — = outside the Strategy B pool. 11:00 odds = the HKJC morning pool used by the reports. SP = final win odds from results. Mkt rk = rank by SP (ties share rank). Pool = in the Strategy B (MC top 6) ticket. In A? = in Strategy A's pool (R6 includes both 雙膽拖 bankers; R9 is A's **shadow** pool, since A passed).

### R1 — Class 4 | 1650m Turf | Good | Trio $800

| Seq | # | Horse | Win% | Place% | 11:00 odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|------------|----|-------------|------|------|-------|----------|
| ★ | 2 | GLORIOUS JOURNEY | 46.5% | 80.3% | 4.4 | 5.6 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 4 |
| L1 | 6 | ACE | 20.4% | 58.8% | 6.2 | 2.9 | 1 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L2 | 7 | JUMBO STEPS | 7.9% | 33.2% | 12 | 8.1 | 5 | ✅ | 腳 (Leg) | ✅ | 7 |
| L3 | 11 | HAPPY PROMISE | 6.1% | 27.0% | 7.2 | 6.8 | 3 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L4 | 1 | REFUSETOBEENGLISH | 6.1% | 26.6% | 5.1 | 7.1 | 4 | ✅ | 腳 (Leg) | ✅ | 5 |
| L5 | 10 | I AM BACK | 4.8% | 24.5% | 12 | 17 | 8 | ✅ | 腳 (Leg) | ✅ | 9 |
| — | 4 | RAGGA BOMB | 4.0% | 21.2% | 15 | 35 | 10 | ❌ | — | ❌ | 6 |
| — | 5 | WELL ENOUGH | 1.9% | 12.4% | 11 | 21 | 9 | ❌ | — | ❌ | 3 ✅ |
| — | 8 | MISSION GIANT | 1.4% | 10.1% | 22 | 16 | 7 | ❌ | — | ❌ | 10 |
| — | 3 | VIVA GRACIOUSNESS | 1.0% | 6.1% | 7.5 | 11 | 6 | ❌ | — | ❌ | 8 |

**Top 3:** 6–11–5 · **Outside B pool:** #5 · **Banker #2 finished 4**

**Pattern analysis — Pattern C.** MC #1 #2 GLORIOUS JOURNEY (46.5%, "undervalued 105%", 11:00 favourite at 4.4) **drifted to 5.6 and ran 4th**. L1 #6 ACE (MC #2) firmed from 6.2 to 2.9 and won, and L3 #11 HAPPY PROMISE (+trial, +draw) ran 2nd. The gap was **#5 WELL ENOUGH, MC #8 (1.9%), 11 → 21**. It had a +excuses flag (steadied near the 250m) and was trying 1650m for the first time. **Signals missed:** the banker drift, and the market's firm support for #6 over #2. No MC rule reaches #5. Trio $800.

### R2 — Class 5 | 1200m Turf | Good | Trio $7,587

| Seq | # | Horse | Win% | Place% | 11:00 odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|------------|----|-------------|------|------|-------|----------|
| ★ | 5 | ALWAYS MY FOLKS | 18.1% | 44.8% | 22 | 45 | 11 | ✅ | 膽 (Banker, MC #1) | ✅ | 9 |
| L1 | 11 | CHILL MASTER | 16.0% | 40.9% | 6.8 | 3.6 | 1 | ✅ | 腳 (Leg) | ✅ | 5 |
| L2 | 4 | FALCON HUNTER | 11.8% | 33.3% | 3.5 | 4.7 | 2 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L3 | 3 | AUTUMN VIBES | 10.0% | 30.2% | 6.1 | 6.5 | 3 | ✅ | 腳 (Leg) | ✅ | 7 |
| L4 | 1 | GOLDEN FRIENDSHIP | 9.9% | 29.8% | 4.9 | 6.5 | 3 | ✅ | 腳 (Leg) | ✅ | 4 |
| L5 | 10 | RUNJEET | 8.2% | 26.8% | 23 | 38 | 10 | ✅ | 腳 (Leg) | ✅ | 10 |
| — | 8 | NOBLE FANS | 7.5% | 24.0% | 10 | 14 | 6 | ❌ | — | ❌ | 8 |
| — | 6 | VERBIER | 5.2% | 18.9% | 23 | 49 | 12 | ❌ | — | ❌ | 1 🏆 |
| — | 12 | HAPPY BUDDIES | 4.1% | 14.7% | 33 | 16 | 7 | ❌ | — | ❌ | 12 |
| — | 9 | WINNING NOW | 4.0% | 14.9% | 11 | 6.6 | 5 | ❌ | — | ❌ | 6 |
| — | 2 | CASA PRIMO | 2.9% | 12.4% | 32 | 24 | 8 | ❌ | — | ❌ | 3 ✅ |
| — | 7 | ICONICAL | 2.2% | 9.2% | 21 | 33 | 9 | ❌ | — | ❌ | 11 |

**Top 3:** 6–4–2 · **Outside B pool:** #6, #2 · **Banker #5 finished 9**

**Pattern analysis — Pattern C (two gaps).** MC #1 #5 ALWAYS MY FOLKS (18.1%, "undervalued 299%") was **8th in the 11:00 market at 22, drifted to 45 and ran 9th**. Ratings were tightly bunched, with 7 horses within 8 points. The winner was **#6 VERBIER, MC #8 (5.2%), 23 → 49**, and **#2 CASA PRIMO, MC #11 (2.9%), 32 → 24**, ran 3rd. Only L2 #4 FALCON HUNTER (the 3.5 favourite) placed. **Signals missed:** raw MC #1 under 20% (Wide open), and a banker the market rated 8th that then drifted. Trio $7,587, unreachable.

### R3 — Class 4 | 1650m Turf | Good | Trio $408

| Seq | # | Horse | Win% | Place% | 11:00 odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|------------|----|-------------|------|------|-------|----------|
| ★ | 4 | HAPPY SMILE | 34.3% | 71.3% | 5.6 | 8.4 | 4 | ✅ | 膽 (Banker, MC #1) | ✅ | 9 |
| L1 | 3 | TURIN CHAMPIONS | 22.0% | 57.4% | 9.5 | 10 | 5 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L2 | 8 | LUCK IS BACK | 18.4% | 54.7% | 4.3 | 2.6 | 1 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L3 | 1 | URANUS STAR | 8.4% | 32.5% | 4.8 | 3.9 | 2 | ✅ | 腳 (Leg) | ✅ | 8 |
| L4 | 6 | STRANGE ALERT | 6.9% | 29.0% | 5 | 7.3 | 3 | ✅ | 腳 (Leg) | ✅ | 5 |
| L5 | 5 | TAKE ACTION | 5.5% | 25.8% | 15 | 26 | 8 | ✅ | 腳 (Leg) | ✅ | 7 |
| — | 10 | FORTUNE STAR | 2.5% | 13.9% | 10 | 10 | 5 | ❌ | — | ❌ | 3 ✅ |
| — | 9 | AESTHETICISM | 1.8% | 11.3% | 15 | 15 | 7 | ❌ | — | ❌ | 4 |
| — | 2 | LUCKY MY WAY | 0.4% | 3.8% | 21 | 40 | 9 | ❌ | — | ❌ | 6 |
| — | 7 | RISING FROM EAST | 0.1% | 0.4% | 47 | 73 | 10 | ❌ | — | ❌ | 10 |

**Top 3:** 3–8–10 · **Outside B pool:** #10 · **Banker #4 finished 9**

**Pattern analysis — Pattern C.** MC #1 #4 HAPPY SMILE (34.3%, 4th in the market at 5.6) **drifted to 8.4 and ran 9th**. L1 #3 TURIN CHAMPIONS (MC #2, "undervalued 109%") won, and L2 #8 LUCK IS BACK (the 4.3 → 2.6 favourite) ran 2nd. The gap was **#10 FORTUNE STAR, MC #7 (2.5%), exactly 10.0 at 11:00 and at SP**, which ran 3rd. The report flagged it as the B-trio knife-edge horse. **Signals missed:** the banker drift. The MC #2–#3 pair was right. Trio $408.

### R4 — Class 4 | 1200m Turf | Good | Trio $2,228

| Seq | # | Horse | Win% | Place% | 11:00 odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|------------|----|-------------|------|------|-------|----------|
| ★ | 4 | VIRTUS GLORY | 28.8% | 62.3% | 3.1 | 2.1 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 3 | MATZDEN | 23.4% | 55.8% | 7.5 | 12 | 4 | ✅ | 腳 (Leg) | ✅ | 6 |
| L2 | 1 | LUCKY MCQUEEN | 11.3% | 36.8% | 11 | 5 | 2 | ✅ | 腳 (Leg) | ✅ | 5 |
| L3 | 5 | HARVEST MOON | 9.0% | 30.0% | 19 | 20 | 6 | ✅ | 腳 (Leg) | ✅ | 11 |
| L4 | 7 | MASTER PHOENIX | 6.1% | 24.2% | 13 | 22 | 8 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L5 | 10 | HIGH RISE VICTORY | 5.6% | 21.3% | 12 | 27 | 9 | ✅ | 腳 (Leg) | ✅ | 12 |
| — | 11 | LIGHTNESS OF BEING | 4.5% | 18.6% | 7.3 | 6.3 | 3 | ❌ | — | ❌ | 7 |
| — | 2 | MASTER RESOLUTE | 4.4% | 19.0% | 11 | 20 | 6 | ❌ | — | ❌ | 4 |
| — | 9 | SHOW ME YOUR LOVE | 2.3% | 10.6% | 35 | 60 | 12 | ❌ | — | ❌ | 8 |
| — | 12 | FREE PONY | 2.1% | 9.4% | 7.8 | 16 | 5 | ❌ | — | ❌ | 9 |
| — | 6 | VIGOR FLY | 1.8% | 8.1% | 43 | 55 | 11 | ❌ | — | ❌ | 10 |
| — | 8 | FLYING TING LOK | 0.8% | 3.9% | 19 | 48 | 10 | ❌ | — | ❌ | 3 ✅ |

**Top 3:** 4–7–8 · **Outside B pool:** #8 · **Banker #4 finished 1**

**Pattern analysis — Pattern B.** MC #1 #4 VIRTUS GLORY firmed from 3.1 to 2.1 and **won**. L4 #7 MASTER PHOENIX (MC #5, −injury30d, 13 → 22) ran 2nd. The 3rd was **#8 FLYING TING LOK, MC #12 of 12 (0.8%), 19 → 48**, with last six runs 14-10-12-5-12-14. **No signal reaches it.** B-trio swapped #7 out for #12 FREE PONY (7.8 → 16, 9th), so it would have missed even if #8 had run 4th. Trio $2,228.

### R5 — Class 4 | 1000m Turf | Good | Trio $1,613

| Seq | # | Horse | Win% | Place% | 11:00 odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|------------|----|-------------|------|------|-------|----------|
| ★ | 3 | GEORGIAN SIGMA | 25.2% | 55.5% | 5.9 | 3.4 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 2 ✅ |
| L1 | 1 | GRAND NOVA | 20.0% | 48.4% | 10 | 16 | 7 | ✅ | 腳 (Leg) | ✅ | 6 |
| L2 | 2 | MASTER CHAMPION | 14.2% | 38.7% | 10 | 15 | 6 | ✅ | 腳 (Leg) | ✅ | 4 |
| L3 | 4 | COPPER CORE | 7.6% | 25.5% | 11 | 24 | 8 | ✅ | 腳 (Leg) | ✅ | 7 |
| L4 | 10 | SUPER SIXTY | 6.5% | 22.7% | 8.4 | 9.6 | 4 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L5 | 11 | KING ALLOY | 5.5% | 22.0% | 7.8 | 7 | 3 | ✅ | 腳 (Leg) | ✅ | 11 |
| — | 9 | SYNERGY IN ACTION | 5.5% | 20.6% | 21 | 31 | 9 | ❌ | — | ✅ | 10 |
| — | 6 | FLOW RIDER | 4.2% | 16.6% | 18 | 31 | 9 | ❌ | — | ❌ | 3 ✅ |
| — | 7 | IRON SECURITY | 3.6% | 15.1% | 6.1 | 10 | 5 | ❌ | — | ❌ | 9 |
| — | 12 | MAPOGO | 3.3% | 14.7% | 6 | 3.3 | 1 | ❌ | — | ❌ | 5 |
| — | 5 | COLOURFUL GOLD | 3.3% | 14.7% | 22 | 50 | 12 | ❌ | — | ❌ | 8 |
| — | 8 | LEAN FLYER | 1.1% | 5.5% | 17 | 31 | 9 | ❌ | — | ❌ | 12 |

**Top 3:** 10–3–6 · **Outside B pool:** #6 · **Banker #3 finished 2**

**Pattern analysis — Pattern B.** MC #1 #3 GEORGIAN SIGMA firmed from 5.9 to 3.4 and ran **2nd**. L4 #10 SUPER SIXTY (MC #5, 8.4 → 9.6, fetlock surgery passed 15 days earlier) **won**. The 3rd was **#6 FLOW RIDER, MC #8 (4.2%), a debutant with a "good 2nd in Conghua trial" (+trial), 18 → 31**. MC had no race form for it. The market's 2nd and 3rd choices at 11:00, #12 MAPOGO (6.0 → 3.3 fav, 5th) and #7 IRON SECURITY (6.1 → 10, 9th), both missed, so B-trio's swap gained nothing. **Signals missed:** a debutant with a positive trial note. MC top 8 has it. Trio $1,613.

### R6 — Class 2 | 1000m Turf | Good | Trio $556

| Seq | # | Horse | Win% | Place% | 11:00 odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|------------|----|-------------|------|------|-------|----------|
| ★ | 1 | BOTTOMUPTOGETHER | 32.9% | 71.1% | 6.9 | 6.9 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 4 | HORSEPOWER | 30.0% | 67.9% | 6.7 | 9.9 | 6 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L2 | 8 | LOVE TOGETHER | 13.4% | 45.1% | 3.7 | 2.2 | 1 | ✅ | 腳 (Leg) | ✅ | 7 |
| L3 | 2 | VICTORY SKY | 10.0% | 38.7% | 12 | 18 | 7 | ✅ | 腳 (Leg) | ✅ | 9 |
| L4 | 10 | CANDLELIGHT DINNER | 4.9% | 25.0% | 12 | 19 | 8 | ✅ | 腳 (Leg) | ✅ | 8 |
| L5 | 5 | SIGHT HERMOSO | 3.3% | 17.4% | 20 | 31 | 9 | ✅ | 腳 (Leg) | ✅ | 5 |
| — | 7 | AURORA LADY | 2.7% | 14.9% | 10 | 7.4 | 3 | ❌ | — | ❌ | 4 |
| — | 9 | GLOWING PRAISES | 1.3% | 8.9% | 6.8 | 7.4 | 3 | ❌ | — | ❌ | 3 ✅ |
| — | 3 | SUPERB CAPITALIST | 1.0% | 7.6% | 6.2 | 9.8 | 5 | ❌ | — | ❌ | 6 |
| — | 6 | BRAVE STAR | 0.4% | 3.4% | 25 | 65 | 10 | ❌ | — | ❌ | 10 |

**Top 3:** 1–4–9 · **Outside B pool:** #9 · **Banker #1 finished 1**

**Pattern analysis — Pattern B.** MC #1 #1 BOTTOMUPTOGETHER ("undervalued 120%") **won**, and L1 #4 HORSEPOWER ("undervalued 104%") ran **2nd**. The 3.7 → 2.2 favourite #8 LOVE TOGETHER (L2) ran 7th. The 3rd was **#9 GLOWING PRAISES, MC #8 (1.3%), 6.8 → 7.4**, the 4th favourite at 11:00, with a +excuses flag. **B-trio added #9 through the Win-odds < 10 step and hit ($556).** Its other candidate, #3 SUPERB CAPITALIST (6.2 → 9.8), ran 6th. **Signals missed:** a market-backed MC near-zero, the same profile as 14-Oct. Trio $556.

### R7 — Class 4 | 1200m Turf | Good | Trio $213

| Seq | # | Horse | Win% | Place% | 11:00 odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|------------|----|-------------|------|------|-------|----------|
| ★ | 5 | KOL | 37.8% | 69.6% | 5.8 | 4.8 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 7 |
| L1 | 3 | COPARTNER FLEET | 12.2% | 37.4% | 5.3 | 9.4 | 6 | ✅ | 腳 (Leg) | ✅ | 4 |
| L2 | 10 | QUICK CONTRIBUTION | 10.6% | 33.2% | 5.7 | 3.5 | 1 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L3 | 9 | TOP TO SKY | 9.0% | 31.1% | 26 | 60 | 11 | ✅ | 腳 (Leg) | ✅ | 5 |
| L4 | 4 | GOLDEN ACE | 6.9% | 27.2% | 6.7 | 8.2 | 5 | ✅ | 腳 (Leg) | ✅ | 6 |
| L5 | 2 | MALPENSA | 6.9% | 24.6% | 10 | 6.5 | 3 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| — | 1 | HEALTHY HEALTHY | 5.3% | 22.0% | 27 | 49 | 10 | ❌ | — | ❌ | 11 |
| — | 12 | MONTA FRUTTA | 3.2% | 14.2% | 12 | 10 | 7 | ❌ | — | ❌ | 9 |
| — | 11 | FORZA LEADER | 3.1% | 14.5% | 6.8 | 7.5 | 4 | ❌ | — | ❌ | 3 ✅ |
| — | 8 | ENJOY GOLF | 2.3% | 11.4% | 22 | 41 | 9 | ❌ | — | ❌ | 12 |
| — | 7 | HERO MASTERMIND | 1.8% | 9.3% | 37 | 92 | 12 | ❌ | — | ❌ | 10 |
| — | 6 | SPICY BONUS | 0.9% | 5.5% | 16 | 20 | 8 | ❌ | — | ❌ | 8 |

**Top 3:** 2–10–11 · **Outside B pool:** #11 · **Banker #5 finished 7**

**Pattern analysis — Pattern C.** MC #1 #5 KOL (37.8%, "undervalued 127%", 3rd in the market) firmed from 5.8 to 4.8 but **ran 7th**. L5 #2 MALPENSA (MC #6, −injury30d, 10 → 6.5) **won** and L2 #10 QUICK CONTRIBUTION (5.7 → 3.5 fav) ran 2nd. The 3rd was **#11 FORZA LEADER, MC #9 (3.1%), 6.8 → 7.5**, the 5th favourite at 11:00. B-trio had it (swapped in for #1), but its banker was the same #5. The report noted that the speed-figure projection ranked #5 only 8th. **Signals missed:** the projection–MC conflict on the banker. This is the only firming MC #1 on the card that failed. Trio $213.

### R8 — Class 3 | 1200m Turf | Good | Trio $910

| Seq | # | Horse | Win% | Place% | 11:00 odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|------------|----|-------------|------|------|-------|----------|
| ★ | 12 | LEADING AGILITY | 20.0% | 50.1% | 8 | 4.7 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 2 | PERFECT GENERAL | 19.5% | 49.5% | 12 | 9.1 | 5 | ✅ | 腳 (Leg) | ✅ | 4 |
| L2 | 1 | PERFECTDAY | 19.4% | 48.2% | 10 | 16 | 7 | ✅ | 腳 (Leg) | ✅ | 7 |
| L3 | 8 | PEGAS | 11.0% | 33.7% | 4.8 | 5.5 | 4 | ✅ | 腳 (Leg) | ✅ | 6 |
| L4 | 6 | ROYAL BLITZ | 8.0% | 28.8% | 15 | 11 | 6 | ✅ | 腳 (Leg) | ✅ | 10 |
| L5 | 3 | KYRUS DRAGON | 7.2% | 25.7% | 27 | 26 | 9 | ✅ | 腳 (Leg) | ✅ | 5 |
| — | 5 | GREATER BAE | 5.3% | 19.5% | 7.5 | 4.7 | 2 | ❌ | — | ❌ | 2 ✅ |
| — | 9 | SMART OINK | 4.0% | 15.2% | 6.9 | 36 | 10 | ❌ | — | ❌ | 12 |
| — | 4 | JUBILANT WINNER | 3.7% | 16.5% | 18 | 24 | 8 | ❌ | — | ❌ | 3 ✅ |
| — | 7 | LUCKY RIVER | 0.9% | 6.3% | 5 | 4.6 | 1 | ❌ | — | ❌ | 8 |
| — | 11 | KING MILES | 0.7% | 4.0% | 35 | 64 | 11 | ❌ | — | ❌ | 9 |
| — | 10 | DUKE ATREIDES | 0.4% | 2.4% | 20 | 67 | 12 | ❌ | — | ❌ | 11 |

**Top 3:** 12–5–4 · **Outside B pool:** #5, #4 · **Banker #12 finished 1**

**Pattern analysis — Pattern B (two gaps).** MC #1 #12 LEADING AGILITY (20.0%, a 0.5pp tie with #2) firmed from 8.0 to 4.7 and **won**. Strategy A's SCMP-adjusted banker #2 ran 4th. The gaps were **#5 GREATER BAE, MC #7 (5.3%), 7.5 → 4.7, 2nd** (+excuses, and joint-fastest on the finish-time projection), and **#4 JUBILANT WINNER, MC #9 (3.7%), 18 → 24, 3rd**. B-trio added #5 but not #4. The 11:00 market's #7 LUCKY RIVER (5.0) and #9 SMART OINK (6.9 → 36) ran 8th and 12th. **Signals missed:** #5's projection ranking. #4 needs a 9-horse pool. Trio $910.

### R9 — Class 3 | 1650m Turf | Good | Trio $469

| Seq | # | Horse | Win% | Place% | 11:00 odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|------------|----|-------------|------|------|-------|----------|
| ★ | 4 | SOLID WIN | 17.2% | 43.6% | 11 | 6.4 | 3 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 10 | FORZA TORO | 14.3% | 40.8% | 9.9 | 8.5 | 4 | ✅ | 腳 (Leg) | ✅ | 6 |
| L2 | 1 | LUCKY SAM GOR | 13.1% | 36.7% | 12 | 19 | 9 | ✅ | 腳 (Leg) | ✅ | 5 |
| L3 | 2 | POPE CODY | 12.8% | 36.9% | 5.6 | 3.1 | 1 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L4 | 3 | THE RED HARE | 12.7% | 36.4% | 15 | 21 | 10 | ✅ | 腳 (Leg) | ✅ | 10 |
| L5 | 9 | EMBRACES | 12.6% | 36.3% | 5.3 | 4.5 | 2 | ✅ | 腳 (Leg) | ✅ | 4 |
| — | 5 | RIDING TOGETHER | 8.6% | 26.9% | 16 | 15 | 6 | ❌ | — | ✅ | 2 ✅ |
| — | 7 | WROTE A NEW PAGE | 2.5% | 11.4% | 33 | 48 | 11 | ❌ | — | ❌ | 9 |
| — | 6 | HIGHLAND RAHY | 1.8% | 9.0% | 7.7 | 15 | 6 | ❌ | — | ❌ | 7 |
| — | 12 | WIN METHOD | 1.7% | 9.0% | 10 | 12 | 5 | ❌ | — | ❌ | 8 |
| — | 11 | I CAN | 1.5% | 7.6% | 6.3 | 16 | 8 | ❌ | — | ❌ | 12 |
| — | 8 | PASS LINE | 1.0% | 5.3% | 22 | 87 | 12 | ❌ | — | ❌ | 11 |

**Top 3:** 4–5–2 · **Outside B pool:** #5 · **Banker #4 finished 1**

**Pattern analysis — Pattern B.** MC #1 #4 SOLID WIN (17.2%, 7th in the 11:00 market at 11, "undervalued 89%", fastest on the projection) firmed to 6.4 and **won**. L3 #2 POPE CODY (5.6 → 3.1 fav) ran 3rd. The 2nd was **#5 RIDING TOGETHER, MC #7 (8.6%), 16 → 15**, with a +excuses flag. **Strategy A's Mode C shadow (7 horses) had #5 and would have hit $469, but A passed the race (Mode D).** B-trio swapped #5 out for #11 I CAN (6.3 → 16, 12th). **Signals missed:** none in MC. In the flattest race of the card (seven horses at 8.6–17.2%), a 6-horse pool was one horse short. Trio $469.

## B Banker Performance

| Race | B banker (MC #1) | MC Win% | MC Place% | 11:00 odds | SP | Mkt rank (SP) | Placed? | Position |
|------|------------------|---------|-----------|------------|----|---------------|---------|----------|
| R1 | #2 GLORIOUS JOURNEY | 46.5% | 80.3% | 4.4 | 5.6 | 2 | ❌ | 4th |
| R2 | #5 ALWAYS MY FOLKS | 18.1% | 44.8% | 22 | 45 | 11 | ❌ | 9th |
| R3 | #4 HAPPY SMILE | 34.3% | 71.3% | 5.6 | 8.4 | 4 | ❌ | 9th |
| R4 | #4 VIRTUS GLORY | 28.8% | 62.3% | 3.1 | 2.1 | 1 | ✅ | 1st |
| R5 | #3 GEORGIAN SIGMA | 25.2% | 55.5% | 5.9 | 3.4 | 2 | ✅ | 2nd |
| R6 | #1 BOTTOMUPTOGETHER | 32.9% | 71.1% | 6.9 | 6.9 | 2 | ✅ | 1st |
| R7 | #5 KOL | 37.8% | 69.6% | 5.8 | 4.8 | 2 | ❌ | 7th |
| R8 | #12 LEADING AGILITY | 20.0% | 50.1% | 8.0 | 4.7 | 2= | ✅ | 1st |
| R9 | #4 SOLID WIN | 17.2% | 43.6% | 11 | 6.4 | 3 | ✅ | 1st |

**Banker top 3: 5/9 (55.6%). Banker win: 4/9 (44.4%).**
Mean MC Win% of bankers was **29.0%** and mean MC Place% **61.0%**, against an actual place rate of **55.6%**: overstated by only ~5pp (19-Oct: +27pp; 14-Oct: +33pp; 11-Oct: +41pp; 07-Oct: +22pp; 04-Oct: +18pp; 01-Oct: +12pp; 27-Sep: +25pp; 23-Sep: +7pp; 16-Sep: −8pp). **The strength split inverted.** MC #1 ≥ 35% placed **0/2** (R1, R7). 30–35% placed **1/2** (R6 ✅, R3 ❌). **Below 30% placed 4/5** (R4, R5, R8, R9 ✅; R2 ❌). The four-card record below 30% is now **4/15**.

**Market-rank split (SP), eleven meetings.** The 21-Oct ranks are SP. The reports used 11:00 odds (see below).

| Banker profile (MC #1 market rank at SP) | 13-Sep ST | 16-Sep HV | 23-Sep HV | 27-Sep ST | 01-Oct ST | 04-Oct ST | 07-Oct HV | 11-Oct ST | 14-Oct HV | 19-Oct ST | 21-Oct HV | Combined |
|------------------------------------------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|----------|
| Market rank 1–2 | 3/4 | 6/6 | 3/5 | 3/7 | 5/6 | 4/6 | 2/7 | 3/6 | 2/6 | 5/7 | **4/6** | **40/66 (60.6%)** |
| Market rank 3 | 0/1 | — | 0/1 | 1/1 | 1/3 | 1/3 | 1/1 | 0/2 | 1/2 | 0/2 | **1/1** | 6/17 (35.3%) |
| Market rank 4+ | 0/5 | 0/2 | 2/3 | 1/3 | 0/2 | 1/2 | 1/1 | 0/3 | 0/1 | 0/2 | **0/2** | **5/26 (19.2%)** |

**At SP the filter held again: rank 1–2 placed 4/6 and rank 4+ placed 0/2.** **At the 11:00 odds the reports actually used, it inverts.** MC #1 at morning rank 1–2 placed **2/3** (R4, R5 ✅; R1 ❌). At rank 3–4 it placed **0/2** (R3, R7). At **rank 5+ it placed 3/4** (R6 rank 5, R8 rank 5 and R9 rank 7 all won; R2 rank 8 ❌). **The SP market rank partly encodes the result.** Three of today's winning MC #1s were shortened from 5th–7th in the 11:00 market into the top 3 by SP. A live filter on morning rank would have discarded them.

**Banker drift (11:00 → SP):** MC #1s that drifted placed **0/3** (R1 4.4→5.6, R2 22→45, R3 5.6→8.4). Those that firmed or held placed **5/6** (R4, R5, R6, R8, R9 ✅; R7 ❌). This is the cleanest banker signal on the card. It needs late odds to use live.

**MC #2 placement (hindsight check):** **3/9** this card (R1 #6 won, R3 #3 won, R6 #4 2nd). Season-to-date: MC #1 **55/117 (47.0%)**, MC #2 **47/116 (40.5%)**.

**Near-zero market horses:** MC Win% < 4% at 11:00 odds < 10 placed **2/10** this card (R6 #9, R7 #11 ✅; R1 #3, R4 #12, R5 #12 and #7, R6 #3, R8 #7, R9 #11 and #6 ❌). Several drifted heavily: R8 #9 went from 6.9 to 36, and R9 #11 from 6.3 to 16. At SP < 10 they placed **2/6**. **Neither placer was in B's pool.** **MC-opposed horses in the 11:00 market top 3 placed 1/10** (R2 #4 only), similar to 19-Oct (2/12) and unlike 14-Oct (7/7).

## Conclusions for Strategy B

1. **B lost $110 more than A purely on stake.** Both went 0 hits. The bankers differed only in R8, where A's SCMP flip moved off MC #1 #12, which won. **B's banker beat A's on this card (5/9 vs 3/8).**
2. **B's gaps were mostly fixable by width, not by a market rule.** 9 of 11 gap horses were MC #7–#9. **B8 (MC top 8, $210) would have gone 3/9, +$748. B7 ($150) would have gone 1/9, −$881.** One card is not enough evidence. Backtest B7 and B8 on every stratC table this season, separately for ST and HV, before changing B.
3. **B-trio's Win-odds < 10 step was mixed on live 11:00 odds.** It added the R6 hit ($556), but its swaps removed two placers (R4 #7, R9 #5), and 10 of 13 candidates missed. **Make Step B add-only.** Swap-removal has now cost placers on two consecutive cards.
4. **The < 30% MC #1 PASS idea from 19-Oct failed its first live test.** Bankers below 30% placed 4/5, and three of them won. The SP market-rank filter also looks hindsight-biased against the 11:00 ranks. **Banker drift from 11:00 to SP (0/3 drifted vs 5/6 firmed/held) is the candidate signal worth testing.** It needs a near-jump odds snapshot to be usable.
5. **Pattern A was 0/9**, after two Pattern A misses on 19-Oct (R8, R9). On this card, B's losses came from the pool rather than the banker.
