# Trio Strategy B (stratC) Review — Sha Tin | 2026-10-01

**Meeting 7 of the 2026/27 season.** 11-race National Day card, all Turf on **Good to Firm**, no scratchings. Results: `data/historical/results_20261001_ST.json` (scraped first time, DT/TT ✓). No Quinella truncation this card; the momentum API was not cross-checked.

> **Convention for this review.** **Strategy B** = the **post-race-review skill definition**: MC top 6 by raw MC Win%, MC #1 = banker, 1膽+5腳 = 10 combos = **$100/race**, all races. The reports' own MC-only ticket (**B-trio**: Place% > 20% legs + Win-odds < 10 swap/add, variable stake) is kept below for continuity. **The hit sets differ this card:** B-trio also hit R6 (its Win-odds < 10 rule added #8), and B did not. Pre-race odds = HKJC pool snapshot at 09:55 HKT.

**Strategy B hit 3/11 (R3 $109, R5 $107, R10 $413) and lost −$471. Strategy A hit 4/11 (+R6 $258) and made +$97.** B bankers placed 6/11. The four big dividends (R1, R7, R8, R11, $1,115–$6,019) each had a placer rated ≤ 1.3% MC win.

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
| Hits | **3/11 (27.3%)** | **4/11 (36.4%)** | 4/11 (36.4%) |
| Combos | 110 | 79 | 141 |
| Staked | $1,100 | $790 | $1,410 |
| Returned | $629 | $887 | $887 |
| **Net P&L** | **−$471** | **+$97** | **−$523** |
| **ROI** | **−42.8%** | **+12.3%** | **−37.1%** |
| Banker top 3 | 6/11 (54.5%) | 5/11 (45.5%) all bankers · 6/11 primary | 6/11 (54.5%) |

Season Strategy B (review-spec): **10/66, $6,600 staked, $3,394 returned, −$3,206, −48.6%**. Season B-trio: **14/66, $8,370, $3,561, −$4,809, −57.5%**.

## Race-by-Race — Strategy B

| R | Class | Dist | Surf | Banker (MC#1) | Final legs | Combos | Stake | Result | Banker top 3? | Hit? | Trio $ | Return | P&L |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1200m | Turf | #5 | 6, 1, 4, 12, 14 | 10 | $100 | 7→2→1 | ❌ 14th | MISS ❌ | $1,252 | $0 | −100 |
| R2 | Class 5 | 1600m | Turf | #11 | 6, 1, 10, 9, 13 | 10 | $100 | 9→10→7 | ❌ 8th | MISS ❌ | $801 | $0 | −100 |
| R3 | Group 3 | 1000m | Turf | #4 | 6, 2, 1, 5, 7 | 10 | $100 | 4→7→6 | ✅ 1st | **HIT ✅** | $109 | $109 | **+9** |
| R4 | Class 4 | 1400m | Turf | #7 | 5, 10, 12, 8, 13 | 10 | $100 | 7→6→3 | ✅ 1st | MISS ❌ | $593 | $0 | −100 |
| R5 | Class 4 | 1000m | Turf | #3 | 1, 4, 6, 11, 7 | 10 | $100 | 3→1→6 | ✅ 1st | **HIT ✅** | $107 | $107 | **+7** |
| R6 | Class 4 | 1800m | Turf | #1 | 3, 6, 4, 7, 5 | 10 | $100 | 3→1→8 | ✅ 2nd | MISS ❌ | $258 | $0 | −100 |
| R7 | Class 4 | 1200m | Turf | #2 | 6, 14, 4, 1, 13 | 10 | $100 | 7→10→11 | ❌ 4th | MISS ❌ | $3,358 | $0 | −100 |
| R8 | Class 4 | 1200m | Turf | #1 | 3, 5, 2, 4, 8 | 10 | $100 | 9→4→11 | ❌ 13th | MISS ❌ | $1,115 | $0 | −100 |
| R9 | Class 2 | 1400m | Turf | #3 | 2, 12, 9, 4, 1 | 10 | $100 | 1→2→11 | ❌ 6th | MISS ❌ | $407 | $0 | −100 |
| R10 | Class 3 | 1400m | Turf | #3 | 9, 7, 14, 1, 4 | 10 | $100 | 3→1→7 | ✅ 1st | **HIT ✅** | $413 | $413 | **+313** |
| R11 | Class 3 | 1200m | Turf | #6 | 4, 8, 9, 10, 2 | 10 | $100 | 6→11→13 | ✅ 1st | MISS ❌ | $6,019 | $0 | −100 |
| **TOTAL** | | | | | | **110** | **$1,100** | | **6/11** | **3/11** | | **$629** | **−471** |

## Race-by-Race — Strategy A

| R | Class | Mode | Banker(s) | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | C5 | B | #5 | 6,1,4,12,14 | 10 | $100 | 7→2→1 | MISS ❌ | $1,252 | $0 | −100 | Banker 14th + gaps #7 (12), #2 (10) |
| R2 | C5 | B (雙膽拖) | #11 + #6 | 1,10,9,13 | 4 | $40 | 9→10→7 | MISS ❌ | $801 | $0 | −40 | Both bankers out (8th, 13th) + gap #7 |
| R3 | G3 | A (雙膽拖) | #4 + #6 | 2,1,7 | 3 | $30 | 4→7→6 | **HIT ✅** | $109 | $109 | +79 | — |
| R4 | C4 | A (雙膽拖) | #7 + #5 | 10,12,8 | 3 | $30 | 7→6→3 | MISS ❌ | $593 | $0 | −30 | #7 won, #5 6th + gaps #6, #3 |
| R5 | C4 | B | #1 | 3,4,6,11,7 | 10 | $100 | 3→1→6 | **HIT ✅** | $107 | $107 | +7 | — |
| R6 | C4 | B | #1 | 3,6,4,7,8 | 10 | $100 | 3→1→8 | **HIT ✅** | $258 | $258 | +158 | — |
| R7 | C4 | A (雙膽拖) | #2 + #6 | 14,4,1 | 3 | $30 | 7→10→11 | MISS ❌ | $3,358 | $0 | −30 | Both bankers out + 3 gaps (MC ≤ 0.7%) |
| R8 | C4 | B | #1 | 5,3,2,4,6 | 10 | $100 | 9→4→11 | MISS ❌ | $1,115 | $0 | −100 | Banker 13th + gaps #9 (50), #11 (4.1) |
| R9 | C2 | B | #3 | 2,12,9,4,1 | 10 | $100 | 1→2→11 | MISS ❌ | $407 | $0 | −100 | Banker 6th + gap #11 (15→5) |
| R10 | C3 | A | #3 | 9,7,14,1 | 6 | $60 | 3→1→7 | **HIT ✅** | $413 | $413 | +353 | — |
| R11 | C3 | B | #6 | 4,8,9,10,2 | 10 | $100 | 6→11→13 | MISS ❌ | $6,019 | $0 | −100 | Banker won, gaps #11 (7.3), #13 (81) |

## B-trio (report's MC-only ticket) — Race-by-Race, for reference

| R | Banker | Final legs | Step B action | Stake | Hit? | Pattern |
|---|---|---|---|---|---|---|
| R1 | #5 | 6,1,4,12,2,10 | add #2, #10 | $150 | ❌ | C — held #2 (2nd), #1 (3rd); missed #7 |
| R2 | #11 | 6,1,10,9,8 | add #8 | $100 | ❌ | C — missed #7 |
| R3 | #4 | 6,2,1,5,7 | — | $100 | ✅ $109 | — |
| R4 | #7 | 5,10,14 | add #14 | $30 | ❌ | B — missed #6, #3 |
| R5 | #3 | 1,6,4,11,7 | — | $100 | ✅ $107 | — |
| R6 | #1 | 3,6,4,7,8,13 | add #8, #13 | $150 | ✅ $258 | — (#8 added via Win-odds < 10) |
| R7 | #2 | 6,14,4,10 | #10 replaced #1 | $60 | ❌ | C — held #10 (2nd); missed #7, #11 |
| R8 | #1 | 3,5,2,4,6,8,11 | add #11 | $210 | ❌ | C — held #11 (3rd), #4 (2nd); missed #9 (50) |
| R9 | #3 | 2,12,9,4,1,5 | — | $150 | ❌ | C — missed #11 |
| R10 | #3 | 9,7,14,1,8,4 | add #8, #4 | $150 | ✅ $413 | — |
| R11 | #6 | 4,8,9,10,1,3,7 | #1 replaced #2; add #3, #7 | $210 | ❌ | B — missed #11, #13 |
| **TOTAL** | | | | **$1,410** | **4/11** | $887 returned, −$523 |

Step B this card **added a placer in four races** (R1 #2, R6 #8, R7 #10, R8 #11) and converted one of them (R6). For the first time in four meetings, the swap did not remove a placer (R7 dropped #1, 14th; R11 dropped #2, 12th).

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| A — Banker fail, all 3 placers in legs | 0/8 | — |
| B — Banker hit, pool gap | 3/8 | R4 (#6 MC #7, #3 MC #9), R6 (#8 MC #7), R11 (#11 MC #7, #13 MC #11) |
| C — Banker fail + pool gap | 5/8 | R1, R2, R7, R8, R9 |

**MC #7 was the pool gap in four of the eight misses** (R2 #7, R4 #6, R6 #8, R11 #11). Two of them steamed (R4 #6 18→8.5, R11 #11 11→7.3) and one had a short price plus an excuse (R6 #8). A 7-horse pool (1膽+6腳 = 15 combos, $150) would have converted **R6** (+$258) on this card, for +$550 stake across 11 races. That is a net loss this card, so it is not adopted. In R4 and R11 a second gap blocked the hit. **Noteworthy:** R7 and R8 both had a near-zero MC horse at SP ≤ 4.1 in the frame (R7 #10 3.4, R8 #11 4.1), which keeps the "market-floor" idea alive (9/11 season).

## Full MC Place% Table — Per Race

Seq: ★ = 膽 (MC #1 banker), L1–L5 = 腳 by MC Win% rank, — = outside the Strategy B pool. "Pre odds" = the HKJC pool odds the report used (09:55 HKT). SP = final win odds from results. Mkt rk = rank by SP (ties share rank). Pool = in the Strategy B (MC top 6) ticket. In A? = in Strategy A's pool.

### R1 — Class 5 | 1200m Turf | Good to Firm | Trio $1,252

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 5 | GOOD FORTUNE | 24.9% | 56.5% | 3.5 | 2.1 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 14 |
| L1 | 6 | NOBLE FANS | 18.1% | 46.3% | 10 | 18 | 6 | ✅ | 腳 (Leg) | ✅ | 5 |
| L2 | 1 | SUNNY Q | 14.8% | 41.3% | 6.2 | 6.6 | 2 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L3 | 4 | POWER PATCH | 10.3% | 31.8% | 23 | 10 | 3 | ✅ | 腳 (Leg) | ✅ | 4 |
| L4 | 12 | YEE CHEONG RAIDER | 10.0% | 31.7% | 9.5 | 13 | 5 | ✅ | 腳 (Leg) | ✅ | 13 |
| L5 | 14 | EXCEED THE WISH | 4.5% | 17.6% | 45 | 81 | 11 | ✅ | 腳 (Leg) | ✅ | 9 |
| — | 9 | LEGENDARY IMPACT | 4.1% | 15.8% | 44 | 90 | 12 | ❌ | — | ❌ | 12 |
| — | 3 | FLASH STAR | 3.9% | 14.4% | 25 | 30 | 7 | ❌ | — | ❌ | 8 |
| — | 13 | WINNING DIAMOND | 3.7% | 15.0% | 43 | 40 | 8 | ❌ | — | ❌ | 6 |
| — | 10 | VIVA CHALEUR | 2.1% | 10.8% | 8 | 12 | 4 | ❌ | — | ❌ | 7 |
| — | 8 | GROOVY FEELING | 1.8% | 8.2% | 24 | 56 | 10 | ❌ | — | ❌ | 10 |
| — | 7 | CIRRUS SPEED | 1.3% | 6.5% | 13 | 12 | 4 | ❌ | — | ❌ | 1 🏆 |
| — | 2 | FALCON HUNTER | 0.5% | 2.6% | 7.1 | 10 | 3 | ❌ | — | ❌ | 2 ✅ |
| — | 11 | QUICK MONEY | 0.2% | 1.6% | 26 | 49 | 9 | ❌ | — | ❌ | 11 |

**Top 3:** 7–2–1 · **Outside B pool:** #7, #2 · **Banker #5 finished 14**

**Pattern analysis — Pattern C.** MC #1 #5 GOOD FORTUNE (24.9%) was the favourite, steamed 3.5→2.1, and finished **last of 14**. With no stewards' report pulled, this reads as an incident or a bad run, not a model signal. The winner #7 CIRRUS SPEED (MC 1.3%, 12th of 14 by MC) and 2nd #2 FALCON HUNTER (MC 0.5%, **7.1 pre-race**, recently gelded) both carried SCMP `+excuses`. L2 #1 SUNNY Q ran 3rd. **Signals missed:** #2's short price with an excuse (B-trio added it via Win-odds < 10). Nothing pointed to #7 except the excuse flag.

### R2 — Class 5 | 1600m Turf | Good to Firm | Trio $801

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 11 | SETANTA | 29.8% | 66.0% | 21 | 37 | 7 | ✅ | 膽 (Banker, MC #1) | ✅ | 8 |
| L1 | 6 | GENERAL SMART | 24.5% | 61.3% | 4.7 | 3.7 | 2 | ✅ | 腳 (Leg) | ✅ | 13 |
| L2 | 1 | AMAZING DUCK | 17.1% | 50.0% | 3.1 | 3.4 | 1 | ✅ | 腳 (Leg) | ✅ | 4 |
| L3 | 10 | FORTUNE KINGO | 11.9% | 39.7% | 10 | 12 | 4 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L4 | 9 | ALL ARE MINE | 6.6% | 26.4% | 8 | 4.6 | 3 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L5 | 13 | HAPPY BUDDIES | 4.1% | 19.3% | 37 | 13 | 5 | ✅ | 腳 (Leg) | ✅ | 10 |
| — | 7 | I EXCELLE | 1.5% | 8.8% | 13 | 12 | 4 | ❌ | — | ❌ | 3 ✅ |
| — | 5 | THE CONCENTRATION | 1.4% | 7.9% | 31 | 71 | 9 | ❌ | — | ❌ | 12 |
| — | 2 | CIRCUIT MARSHAL | 1.0% | 6.6% | 16 | 27 | 6 | ❌ | — | ❌ | 7 |
| — | 4 | SUPER SICARIO | 0.8% | 4.7% | 39 | 60 | 8 | ❌ | — | ❌ | 11 |
| — | 8 | MULTISUPERSTAR | 0.5% | 4.0% | 7.6 | 12 | 4 | ❌ | — | ❌ | 9 |
| — | 14 | MANYTHANKS FOREVER | 0.5% | 3.8% | 51 | 95 | 11 | ❌ | — | ❌ | 5 |
| — | 12 | SPECIAL HEDGE | 0.2% | 1.4% | 52 | 109 | 12 | ❌ | — | ❌ | 6 |
| — | 3 | PEARL OF PANG'S | 0.0% | 0.2% | 34 | 76 | 10 | ❌ | — | ❌ | 14 |

**Top 3:** 9–10–7 · **Outside B pool:** #7 · **Banker #11 finished 8**

**Pattern analysis — Pattern C.** MC #1 #11 SETANTA (29.8%) was the MC's **526% 'undervalued'** call at 21 pre-race. It drifted to **37** and ran 8th. L4 #9 ALL ARE MINE (8→4.6, steamer) won and L3 #10 FORTUNE KINGO ran 2nd, so both were in the pool. The 3rd, #7 I EXCELLE, was **MC #7** (1.5%) at 12 with `+excuses` (steadied). **Signals missed:** the banker's market rejection (21→37), and the winner's steam.

### R3 — Group 3 | 1000m Turf | Good to Firm | Trio $109

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 4 | COLOURFUL KING | 42.2% | 81.4% | 2.9 | 2.2 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 6 | BOTTOMUPTOGETHER | 25.9% | 70.9% | 11 | 6.6 | 4 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L2 | 2 | CRIMSON FLASH | 15.0% | 55.1% | 3.9 | 5.6 | 3 | ✅ | 腳 (Leg) | ✅ | 5 |
| L3 | 1 | RAGING BLIZZARD | 8.6% | 39.1% | 5.6 | 11 | 5 | ✅ | 腳 (Leg) | ✅ | 4 |
| L4 | 5 | TOMODACHI KOKOROE | 3.9% | 22.9% | 23 | 15 | 6 | ✅ | 腳 (Leg) | ❌ | 7 |
| L5 | 7 | MAGIC CONTROL | 3.4% | 21.6% | 6.1 | 4.8 | 2 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| — | 3 | BEAUTY WAVES | 1.0% | 7.8% | 11 | 25 | 7 | ❌ | — | ❌ | 8 |
| — | 8 | JOHANNES BRAHMS | 0.0% | 1.2% | 18 | 29 | 8 | ❌ | — | ❌ | 6 |

**Top 3:** 4–7–6 · **Outside B pool:** none · **Banker #4 finished 1**

**Pattern analysis — HIT.** MC #1 #4 COLOURFUL KING (42.2%, fav) won. L1 #6 BOTTOMUPTOGETHER (MC 25.9%, steamed 11→6.6) ran 3rd. L5 #7 MAGIC CONTROL (MC 3.4%, but 2nd favourite at 4.8) ran 2nd, as the last horse in. On this 8-runner card the MC top 6 covered 75% of the field.

### R4 — Class 4 | 1400m Turf | Good to Firm | Trio $593

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 7 | SOLID CAR | 38.2% | 75.6% | 3.4 | 1.9 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 5 | NOBLE PATCH | 28.4% | 66.1% | 13 | 27 | 7 | ✅ | 腳 (Leg) | ✅ | 6 |
| L2 | 10 | VOYAGE BOSS | 15.8% | 51.6% | 4.5 | 5.1 | 2 | ✅ | 腳 (Leg) | ✅ | 14 |
| L3 | 12 | FRANCIS MEYNELL | 3.1% | 16.9% | 16 | 22 | 6 | ✅ | 腳 (Leg) | ✅ | 7 |
| L4 | 8 | SILVERY KNIGHT | 2.7% | 15.3% | 40 | 108 | 12 | ✅ | 腳 (Leg) | ✅ | 10 |
| L5 | 13 | DIAMOND SPARKLE | 2.7% | 14.9% | 28 | 66 | 9 | ✅ | 腳 (Leg) | ❌ | 9 |
| — | 6 | PRESTIGE COME | 2.5% | 14.6% | 18 | 8.5 | 3 | ❌ | — | ❌ | 2 ✅ |
| — | 2 | TRUE BROTHERS | 1.5% | 9.3% | 37 | 109 | 13 | ❌ | — | ❌ | 13 |
| — | 3 | CHILL PARTNERS | 1.5% | 9.1% | 20 | 31 | 8 | ❌ | — | ❌ | 3 ✅ |
| — | 4 | JOY TOGETHER | 1.1% | 8.0% | 23 | 82 | 11 | ❌ | — | ❌ | 11 |
| — | 9 | PRESIDENT PEGASUS | 1.0% | 6.5% | 26 | 18 | 5 | ❌ | — | ❌ | 12 |
| — | 11 | ALABAMA SONG | 0.9% | 6.1% | 10 | 18 | 5 | ❌ | — | ❌ | 5 |
| — | 14 | STAR SATYR | 0.4% | 3.5% | 6.4 | 11 | 4 | ❌ | — | ❌ | 4 |
| — | 1 | EXCELLENCE VALUE | 0.3% | 2.4% | 26 | 69 | 10 | ❌ | — | ❌ | 8 |

**Top 3:** 7–6–3 · **Outside B pool:** #6, #3 · **Banker #7 finished 1**

**Pattern analysis — Pattern B.** MC #1 #7 SOLID CAR (38.2%, backed 3.4→1.9) **won**. L1 #5 NOBLE PATCH (MC 28.4%, 269% 'undervalued', 2 starts) drifted 13→27 and ran 6th. The 2nd and 3rd were **#6 PRESTIGE COME (MC #7, 2.5%; steamed 18→8.5)** and **#3 CHILL PARTNERS (MC #9, 1.5%; 20→31, `+excuses` held up)**. **Signals missed:** #6's steam. Nothing pointed to #3 except the TIR excuse.

### R5 — Class 4 | 1000m Turf | Good to Firm | Trio $107

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 3 | KA YING LIGHTNING | 26.4% | 59.8% | 5.9 | 4.7 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 1 | JEDI SPURS | 22.9% | 55.0% | 2.3 | 2 | 1 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L2 | 4 | CHARMING BABE | 13.8% | 39.5% | 9.1 | 24 | 6 | ✅ | 腳 (Leg) | ✅ | 8 |
| L3 | 6 | HANDSOME HERO | 13.3% | 39.7% | 14 | 9.5 | 4 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L4 | 11 | DOUBLE ALPHA | 5.8% | 22.2% | 11 | 9.4 | 3 | ✅ | 腳 (Leg) | ✅ | 5 |
| L5 | 7 | HOWEVER | 5.6% | 21.9% | 23 | 66 | 11 | ✅ | 腳 (Leg) | ✅ | 12 |
| — | 14 | CHAMP'S DOMAIN | 3.1% | 13.8% | 21 | 70 | 12 | ❌ | — | ❌ | 13 |
| — | 5 | CELESTIAL ZOUS | 2.6% | 12.8% | 31 | 59 | 10 | ❌ | — | ❌ | 9 |
| — | 12 | PRECISION MIND | 1.8% | 9.1% | 12 | 26 | 7 | ❌ | — | ❌ | 6 |
| — | 2 | YEE CHEONG GLORY | 1.8% | 8.7% | 25 | 14 | 5 | ❌ | — | ❌ | 4 |
| — | 8 | SUPREME DATA | 1.4% | 7.6% | 30 | 28 | 8 | ❌ | — | ❌ | 11 |
| — | 13 | HEROIC VANGUARD | 0.9% | 5.2% | 47 | 52 | 9 | ❌ | — | ❌ | 7 |
| — | 9 | TALENTS CHAMPION | 0.5% | 3.6% | 42 | 79 | 13 | ❌ | — | ❌ | 14 |
| — | 10 | CLASSIC TRIPLE | 0.1% | 1.2% | 37 | 24 | 6 | ❌ | — | ❌ | 10 |

**Top 3:** 3–1–6 · **Outside B pool:** none · **Banker #3 finished 1**

**Pattern analysis — HIT.** MC #1 #3 KA YING LIGHTNING (26.4%) won. L1 #1 JEDI SPURS (fav 2.0) ran 2nd and L3 #6 HANDSOME HERO (MC 13.3%, 86% 'undervalued', 14→9.5) ran 3rd. MC top 4 and the market top 3 agreed.

### R6 — Class 4 | 1800m Turf | Good to Firm | Trio $258

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 1 | VICTOR SUPREME | 28.6% | 62.7% | 4.7 | 3.9 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 2 ✅ |
| L1 | 3 | SUPER GOLDENDRAGON | 20.0% | 52.9% | 3.4 | 5 | 3 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L2 | 6 | ROMANTIC FANTASY | 17.0% | 48.2% | 11 | 9.3 | 5 | ✅ | 腳 (Leg) | ✅ | 9 |
| L3 | 4 | ROMANTIC LAOS | 13.9% | 43.0% | 21 | 31 | 10 | ✅ | 腳 (Leg) | ✅ | 4 |
| L4 | 7 | LUCKY YEAR | 7.3% | 28.6% | 9 | 4.6 | 2 | ✅ | 腳 (Leg) | ✅ | 6 |
| L5 | 5 | FLUORESCENCE | 4.5% | 18.6% | 56 | 94 | 12 | ✅ | 腳 (Leg) | ❌ | 10 |
| — | 8 | SUPREME MASTERMIND | 4.3% | 19.1% | 6.8 | 10 | 6 | ❌ | — | ✅ | 3 ✅ |
| — | 13 | STAR BROSE | 2.3% | 11.8% | 8.9 | 8.3 | 4 | ❌ | — | ❌ | 7 |
| — | 10 | GOOD GOOD | 1.4% | 7.7% | 27 | 48 | 11 | ❌ | — | ❌ | 14 |
| — | 14 | CIRCUIT CENTURY | 0.3% | 2.7% | 20 | 22 | 8 | ❌ | — | ❌ | 13 |
| — | 9 | FAST SPEED | 0.2% | 1.8% | 39 | 24 | 9 | ❌ | — | ❌ | 5 |
| — | 11 | MASSIVE GLORY | 0.2% | 1.2% | 67 | 97 | 13 | ❌ | — | ❌ | 11 |
| — | 12 | ON THE LASH | 0.1% | 1.0% | 23 | 21 | 7 | ❌ | — | ❌ | 8 |
| — | 2 | DRAGON ON SNOW | 0.0% | 0.6% | 50 | 116 | 14 | ❌ | — | ❌ | 12 |

**Top 3:** 3–1–8 · **Outside B pool:** #8 · **Banker #1 finished 2**

**Pattern analysis — Pattern B.** MC #1 #1 VICTOR SUPREME (28.6%) ran 2nd and L1 #3 SUPER GOLDENDRAGON won. 3rd was **#8 SUPREME MASTERMIND, MC #7 (4.3%)**, 6.8 pre-race with `+excuses` (raced tight). L5 #5 (MC 6.1%) ran 10th. **Strategy A included #8 via the excuses bump and hit $258.** B-trio added it via Win-odds < 10 and also hit. **Signals missed by raw MC:** short price plus excuse — the exact profile that placed 8/12 this card.

### R7 — Class 4 | 1200m Turf | Good to Firm | Trio $3,358

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 2 | LIGHT YEARS GLORY | 35.9% | 73.8% | 5.6 | 3.7 | 3 | ✅ | 膽 (Banker, MC #1) | ✅ | 4 |
| L1 | 6 | SPIRITED STEED | 30.1% | 69.2% | 3.3 | 3.5 | 2 | ✅ | 腳 (Leg) | ✅ | 10 |
| L2 | 14 | LAKESHORE HERO | 12.1% | 45.0% | 15 | 12 | 4 | ✅ | 腳 (Leg) | ✅ | 8 |
| L3 | 4 | JOKER ORBIT | 10.9% | 39.4% | 15 | 21 | 6 | ✅ | 腳 (Leg) | ✅ | 6 |
| L4 | 1 | MASTER CHAMPION | 4.2% | 20.7% | 18 | 31 | 7 | ✅ | 腳 (Leg) | ✅ | 14 |
| L5 | 13 | VICTORY CHAMPION | 2.6% | 15.8% | 19 | 16 | 5 | ✅ | 腳 (Leg) | ❌ | 13 |
| — | 5 | RISING FROM ASHES | 1.4% | 9.1% | 27 | 81 | 10 | ❌ | — | ❌ | 5 |
| — | 7 | CAVAMAZING | 0.7% | 5.4% | 18 | 38 | 9 | ❌ | — | ❌ | 1 🏆 |
| — | 3 | EVER WEALTH | 0.5% | 5.1% | 30 | 32 | 8 | ❌ | — | ❌ | 11 |
| — | 11 | RIDING HIGH | 0.5% | 5.1% | 17 | 16 | 5 | ❌ | — | ❌ | 3 ✅ |
| — | 10 | KA YING RADIANCE | 0.5% | 4.4% | 3.9 | 3.4 | 1 | ❌ | — | ❌ | 2 ✅ |
| — | 8 | MY WYNDFALL | 0.3% | 3.3% | 49 | 132 | 11 | ❌ | — | ❌ | 9 |
| — | 9 | HIGH RISE VICTORY | 0.2% | 2.6% | 43 | 162 | 13 | ❌ | — | ❌ | 7 |
| — | 12 | LUCKY GIBS | 0.1% | 1.1% | 47 | 159 | 12 | ❌ | — | ❌ | 12 |

**Top 3:** 7–10–11 · **Outside B pool:** #7, #10, #11 · **Banker #2 finished 4**

**Pattern analysis — Pattern C.** MC #1 #2 LIGHT YEARS GLORY (35.9%, backed 5.6→3.7) ran 4th. L1 #6 SPIRITED STEED (30.1%, 4 starts) ran 10th. **All three placers were rated ≤ 0.7%**: #7 CAVAMAZING (MC #8, 0.7%, 18→38) won, #10 KA YING RADIANCE (MC #11, 0.5%, **3.9→3.4, 2nd fav**, `+excuses` severely checked) ran 2nd, and #11 RIDING HIGH (MC #10, 0.5%, 17→16) ran 3rd. **Signals missed:** #10, a market-backed near-zero horse. B-trio swapped it in (for #1) and still missed.

### R8 — Class 4 | 1200m Turf | Good to Firm | Trio $1,115

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 1 | ALMIGHTY WARRIOR | 26.0% | 59.7% | 7.8 | 5.9 | 3 | ✅ | 膽 (Banker, MC #1) | ✅ | 13 |
| L1 | 3 | OLDTOWN | 21.6% | 54.8% | 21 | 51 | 11 | ✅ | 腳 (Leg) | ✅ | 7 |
| L2 | 5 | PRIME ACE | 20.9% | 54.3% | 6 | 12 | 5 | ✅ | 腳 (Leg) | ✅ | 9 |
| L3 | 2 | HEALTHY HEALTHY | 10.0% | 34.6% | 29 | 59 | 12 | ✅ | 腳 (Leg) | ✅ | 14 |
| L4 | 4 | VIRTUS GLORY | 6.5% | 26.2% | 4.5 | 3.4 | 1 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L5 | 8 | BETTER AND BETTER | 5.9% | 22.3% | 10 | 9.9 | 4 | ✅ | 腳 (Leg) | ❌ | 4 |
| — | 6 | PRIVATE WEALTH | 5.2% | 22.6% | 9.7 | 16 | 6 | ❌ | — | ✅ | 11 |
| — | 12 | TYCOON EXPRESS | 1.0% | 5.6% | 34 | 30 | 8 | ❌ | — | ❌ | 8 |
| — | 7 | GOLDEN TRIUMPH | 0.8% | 5.1% | 51 | 17 | 7 | ❌ | — | ❌ | 5 |
| — | 14 | CASA PRIMO | 0.7% | 4.7% | 12 | 12 | 5 | ❌ | — | ❌ | 10 |
| — | 13 | MONTA FRUTTA | 0.5% | 3.6% | 13 | 33 | 9 | ❌ | — | ❌ | 6 |
| — | 10 | LUCKY BID | 0.3% | 2.7% | 59 | 118 | 13 | ❌ | — | ❌ | 12 |
| — | 11 | SPEEDY POWER | 0.3% | 2.1% | 5.6 | 4.1 | 2 | ❌ | — | ❌ | 3 ✅ |
| — | 9 | E HO HO | 0.2% | 1.7% | 64 | 50 | 10 | ❌ | — | ❌ | 1 🏆 |

**Top 3:** 9–4–11 · **Outside B pool:** #9, #11 · **Banker #1 finished 13**

**Pattern analysis — Pattern C.** MC #1 #1 ALMIGHTY WARRIOR (26.0%, Purton, 7.8→5.9) ran 13th. The winner was **#9 E HO HO: MC 0.2%, 14th of 14, SP 50**. 3rd was **#11 SPEEDY POWER: MC 0.3%, 13th of 14, 5.6→4.1 (2nd fav)**. L4 #4 VIRTUS GLORY (SP fav 3.4, `+excuses`) ran 2nd. L1 #3 (MC 354% 'undervalued', 51 SP) ran 7th. **Signals missed:** #11's short price. Nothing pointed to #9.

### R9 — Class 2 | 1400m Turf | Good to Firm | Trio $407

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 3 | CHILL EASY | 24.7% | 56.1% | 8.1 | 8.3 | 6 | ✅ | 膽 (Banker, MC #1) | ✅ | 6 |
| L1 | 2 | HOT DELIGHT | 16.9% | 45.1% | 3.2 | 3.9 | 1 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L2 | 12 | PUBLIC ATTENTION | 14.2% | 39.0% | 9.5 | 5.9 | 3 | ✅ | 腳 (Leg) | ✅ | 8 |
| L3 | 9 | INFINITE RESOLVE | 10.3% | 31.8% | 9.4 | 20 | 8 | ✅ | 腳 (Leg) | ✅ | 4 |
| L4 | 4 | TOP DRAGON | 9.2% | 30.0% | 10 | 6.5 | 4 | ✅ | 腳 (Leg) | ✅ | 7 |
| L5 | 1 | SKY JEWELLERY | 7.1% | 25.6% | 6.7 | 8.1 | 5 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| — | 5 | VICTORY SKY | 6.0% | 22.6% | 24 | 51 | 10 | ❌ | — | ❌ | 10 |
| — | 11 | DROMBEG BANNER | 5.1% | 19.9% | 15 | 5 | 2 | ❌ | — | ❌ | 3 ✅ |
| — | 10 | REGAL GEM | 3.3% | 13.7% | 18 | 44 | 9 | ❌ | — | ❌ | 5 |
| — | 8 | BRAVEFIELD | 2.2% | 9.7% | 19 | 66 | 11 | ❌ | — | ❌ | 11 |
| — | 6 | BEAUTY BOLT | 0.9% | 4.9% | 12 | 14 | 7 | ❌ | — | ❌ | 9 |
| — | 7 | EMBLAZON | 0.1% | 1.5% | 30 | 73 | 12 | ❌ | — | ❌ | 12 |

**Top 3:** 1–2–11 · **Outside B pool:** #11 · **Banker #3 finished 6**

**Pattern analysis — Pattern C.** MC #1 #3 CHILL EASY (24.7%, 8.1→8.3) ran 6th. L5 #1 SKY JEWELLERY (6.7→8.1) won and L1 #2 HOT DELIGHT (fav 3.2) ran 2nd. 3rd was **#11 DROMBEG BANNER, MC #8 (5.1%), steamed 15→5.0**. **Signals missed:** #11's steam (invisible at 09:55). The favourite #2 would have been the right banker.

### R10 — Class 3 | 1400m Turf | Good to Firm | Trio $413

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 3 | AEROVOLANIC | 39.9% | 76.4% | 6 | 5.6 | 3 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 9 | PAPAYA BROSE | 20.2% | 57.7% | 12 | 16 | 7 | ✅ | 腳 (Leg) | ✅ | 8 |
| L2 | 7 | SUPERB SPIRIT | 16.5% | 52.2% | 6.2 | 3.8 | 2 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L3 | 14 | MASTER LUCKY | 9.6% | 37.6% | 5.1 | 2.9 | 1 | ✅ | 腳 (Leg) | ✅ | 4 |
| L4 | 1 | CHILL BUDDY | 7.4% | 32.9% | 7.8 | 15 | 6 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L5 | 4 | FLYING FORTRESS | 3.1% | 17.6% | 8.1 | 8 | 4 | ✅ | 腳 (Leg) | ❌ | 11 |
| — | 8 | MONEY GAMES | 1.1% | 8.1% | 6.4 | 13 | 5 | ❌ | — | ❌ | 10 |
| — | 2 | JOYFIELD | 1.1% | 7.8% | 23 | 96 | 12 | ❌ | — | ❌ | 14 |
| — | 13 | KING OF FIGHTERS | 0.4% | 3.0% | 30 | 66 | 10 | ❌ | — | ❌ | 9 |
| — | 5 | SONIC LINER | 0.2% | 2.2% | 54 | 158 | 14 | ❌ | — | ❌ | 12 |
| — | 12 | NATURAL NUMBERS | 0.2% | 2.1% | 39 | 38 | 8 | ❌ | — | ❌ | 6 |
| — | 10 | SAMARKAND | 0.1% | 1.7% | 43 | 117 | 13 | ❌ | — | ❌ | 5 |
| — | 11 | LEATHER HERO | 0.0% | 0.4% | 28 | 94 | 11 | ❌ | — | ❌ | 13 |
| — | 6 | FORTUNE BOY | 0.0% | 0.2% | 43 | 44 | 9 | ❌ | — | ❌ | 7 |

**Top 3:** 3–1–7 · **Outside B pool:** none · **Banker #3 finished 1**

**Pattern analysis — HIT.** MC #1 #3 AEROVOLANIC (39.9%, 6.0→5.6) won against the favourite #14 (5.1→2.9, 4th). L4 #1 CHILL BUDDY (drifted 7.8→15) ran 2nd and L2 #7 SUPERB SPIRIT (6.2→3.8) ran 3rd. The MC top 5 contained all three placers.

### R11 — Class 3 | 1200m Turf | Good to Firm | Trio $6,019

| Seq | # | Horse | Win% | Place% | Pre odds | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|----|-------------|------|------|-------|----------|
| ★ | 6 | ABSOLUTE HEART | 25.3% | 59.0% | 6.5 | 5.5 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 4 | SUPER STRONG KID | 17.4% | 46.3% | 8.9 | 9.4 | 5 | ✅ | 腳 (Leg) | ✅ | 6 |
| L2 | 8 | SPICY STANDARD | 16.8% | 46.2% | 9.6 | 3.9 | 1 | ✅ | 腳 (Leg) | ✅ | 11 |
| L3 | 9 | THE HEIR | 14.1% | 42.3% | 15 | 15 | 7 | ✅ | 腳 (Leg) | ✅ | 5 |
| L4 | 10 | LUCRATIVE EIGHT | 9.4% | 31.2% | 11 | 11 | 6 | ✅ | 腳 (Leg) | ✅ | 7 |
| L5 | 2 | PERFECT GENERAL | 6.4% | 24.3% | 30 | 63 | 12 | ✅ | 腳 (Leg) | ✅ | 12 |
| — | 11 | MAJESTIC VALOUR | 4.1% | 17.0% | 11 | 7.3 | 4 | ❌ | — | ❌ | 2 ✅ |
| — | 5 | RED SEA | 3.1% | 12.9% | 23 | 39 | 10 | ❌ | — | ❌ | 10 |
| — | 3 | EFFORTLESS WIN | 1.8% | 9.0% | 8.9 | 19 | 8 | ❌ | — | ❌ | 14 |
| — | 1 | PI LEGEND | 0.6% | 3.8% | 5.4 | 7.1 | 3 | ❌ | — | ❌ | 8 |
| — | 13 | THOUSAND SPIRIT | 0.5% | 4.0% | 14 | 81 | 13 | ❌ | — | ❌ | 3 ✅ |
| — | 12 | MR DESIRA | 0.4% | 2.3% | 36 | 20 | 9 | ❌ | — | ❌ | 9 |
| — | 7 | GLORYSPEED | 0.1% | 1.0% | 9.8 | 15 | 7 | ❌ | — | ❌ | 4 |
| — | 14 | MOUNT EVEREST | 0.1% | 0.8% | 25 | 54 | 11 | ❌ | — | ❌ | 13 |

**Top 3:** 6–11–13 · **Outside B pool:** #11, #13 · **Banker #6 finished 1**

**Pattern analysis — Pattern B.** MC #1 #6 ABSOLUTE HEART (25.3%, 6.5→5.5) **won**. 2nd was **#11 MAJESTIC VALOUR, MC #7 (4.1%), backed 11→7.3 (Purton)**, and 3rd was **#13 THOUSAND SPIRIT, MC #11 (0.5%), 14→81**. The five legs ran 5th–12th, including SP favourite #8 (3.9, 11th). **Signals missed:** #11's steam and jockey. #13 was unforecastable. Trio $6,019.

## B Banker Performance

| Race | B banker (MC #1) | MC Win% | MC Place% | Pre odds | SP | Mkt rank (SP) | Placed? | Position |
|------|------------------|---------|-----------|----------|----|---------------|---------|----------|
| R1 | #5 GOOD FORTUNE | 24.9% | 56.5% | 3.5 | 2.1 | 1 | ❌ | 14th |
| R2 | #11 SETANTA | 29.8% | 66.0% | 21 | 37 | 7 | ❌ | 8th |
| R3 | #4 COLOURFUL KING | 42.2% | 81.4% | 2.9 | 2.2 | 1 | ✅ | 1st |
| R4 | #7 SOLID CAR | 38.2% | 75.6% | 3.4 | 1.9 | 1 | ✅ | 1st |
| R5 | #3 KA YING LIGHTNING | 26.4% | 59.8% | 5.9 | 4.7 | 2 | ✅ | 1st |
| R6 | #1 VICTOR SUPREME | 28.6% | 62.7% | 4.7 | 3.9 | 1 | ✅ | 2nd |
| R7 | #2 LIGHT YEARS GLORY | 35.9% | 73.8% | 5.6 | 3.7 | 3 | ❌ | 4th |
| R8 | #1 ALMIGHTY WARRIOR | 26.0% | 59.7% | 7.8 | 5.9 | 3 | ❌ | 13th |
| R9 | #3 CHILL EASY | 24.7% | 56.1% | 8.1 | 8.3 | 6 | ❌ | 6th |
| R10 | #3 AEROVOLANIC | 39.9% | 76.4% | 6 | 5.6 | 3 | ✅ | 1st |
| R11 | #6 ABSOLUTE HEART | 25.3% | 59.0% | 6.5 | 5.5 | 2 | ✅ | 1st |

**Banker top 3: 6/11 (54.5%). Banker win: 5/11 (45.5%).**
Mean MC Win% of bankers was **31.1%** and mean MC Place% **66.1%**, against an actual place rate of **54.5%**: over-stated by ~12pp (27-Sep: +25pp; 23-Sep: +7pp; 16-Sep: −8pp). MC #1 ≥ 35% (R3, R4, R7, R10) placed **3/4**; 24–30% placed **3/7**. **When the B banker placed, it won 5 of 6 times.**

**Market-rank split (SP), five meetings:**

| Banker profile (MC #1 market rank at SP) | 13-Sep ST | 16-Sep HV | 23-Sep HV | 27-Sep ST | 01-Oct ST | Combined |
|------------------------------------------|-----------|-----------|-----------|-----------|-----------|----------|
| Market rank 1–2 | 3/4 | 6/6 | 3/5 | 3/7 | **5/6** | **20/28 (71.4%)** |
| Market rank 3 | 0/1 | — | 0/1 | 1/1 | **1/3** | 2/6 |
| Market rank 4+ | 0/5 | 0/2 | 2/3 | 1/3 | **0/2** | **3/15 (20.0%)** |

Rank 1–2 this card failed only in R1 (#5, SP fav 2.1, last). Rank 3: R10 #3 won; R7 #2 (4th) and R8 #1 (13th) missed. Rank 4+: R2 #11 (37) and R9 #3 (8.3), both unplaced.

## Conclusions for Strategy B

1. **A beat B on selection for the first time.** In R6, SCMP `+excuses` put MC #7 #8 into A's pool and it ran 3rd. Over seven meetings B trails A by **$988**: $730 from stake and $258 from that one race. B has never hit a race A missed.
2. **The market-rank filter on the banker is now the most robust B finding.** Rank 1–2 at SP: **20/28 (71.4%)** over five meetings. Rank 4+: **3/15 (20.0%)**. The open problem is that SP isn't known when the bet goes in. Test it with near-off odds.
3. **MC #7 is the most common pool gap** (4/8 misses this card). The cheap fix (a 7th leg) costs more than it returns at this sample size. A targeted add — MC #7 only if steaming or `+excuses` at ≤ 8 — would have taken R4 #6 and R6 #8 and is worth backtesting.
4. **The near-zero blind spot persists**: MC Win% < 3% at SP ≤ 6 placed 2/2 here (R7 #10, R8 #11), **9/11 season**. B-trio's Win-odds < 10 add catches some of these but buys 15–21 combo tickets.
