# Trio Strategy B (stratC) Review — Sha Tin | 2026-10-04

**Meeting 8 of the 2026/27 season.** 11-race mixed card: AWT (Good) for R1, R3, R5 and R9, Turf (Good to Firm) for the rest. **#3 RELIABLE PROFIT was withdrawn from R9.** Results: `data/historical/results_20261004_ST.json` (scraped first time, DT/TT ✓). All 11 Trio dividends match the momentum API. Three truncated non-Trio dividends were corrected: R4 QN $1→$1,200, R10 QN $2→$2,884.5, R8 QP 10-11 $1→$1,002.5.

> **Convention for this review.** **Strategy B** = the **post-race-review skill definition**: MC top 6 by raw MC Win%, MC #1 = banker, 1膽+5腳 = 10 combos = **$100/race**, all races. **The reports' own "STRATEGY B (MC-only)" ticket is a different strategy.** It uses Place% > 20% legs plus a Win-odds < 10 swap/add, with variable stake. It is kept below as **B-trio** for continuity, and **its hit set differs this card**: B-trio hit R2 and R7, which B missed, and missed R11, which B hit. Pre-race odds = HKJC pool snapshot captured ~10:22–10:35 HKT. SCMP place/Q/QP odds were garbled for every race and were not used.

**Strategy B hit 2/11 (R3 $116, R11 $1,148) and made +$164 (+14.9%). Strategy A hit the same two races and made +$134.** B bankers (identical to A's primary bankers this card) placed 6/11. The four Trios above $2,400 (R5, R8, R9, R10) each had a placer ranked MC #9 or lower.

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
| Hits | **2/11 (18.2%)** | **2/11 (18.2%)** | 3/11 (27.3%) |
| Combos | 110 | 113 | 147 |
| Staked | $1,100 | $1,130 | $1,470 |
| Returned | $1,264 | $1,264 | $607 |
| **Net P&L** | **+$164** | **+$134** | **−$863** |
| **ROI** | **+14.9%** | **+11.9%** | **−58.7%** |
| Banker top 3 | 6/11 (54.5%) | 6/11 (54.5%) | 6/11 (54.5%) |

Season Strategy B (review-spec): **12/77, $7,700 staked, $4,658 returned, −$3,042, −39.5%**. Season B-trio: **17/77, $9,840, $4,168, −$5,672, −57.6%**.

## Race-by-Race Results — Strategy B

| R | Class | Dist | Surf | Banker (MC#1) | Final legs | Combos | Stake | Result | Banker top 3? | Hit? | Trio $ | Return | P&L |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1650m | AWT | #2 | 12, 4, 1, 7, 13 | 10 | $100 | 1→14→12 | ❌ 6th | MISS ❌ | $182 | $0 | −100 |
| R2 | Class 4 | 1200m | Turf | #13 | 3, 7, 9, 5, 14 | 10 | $100 | 13→2→3 | ✅ 1st | MISS ❌ | $108 | $0 | −100 |
| R3 | Class 2 | 1650m | AWT | #2 | 6, 7, 5, 8, 3 | 10 | $100 | 6→2→7 | ✅ 2nd | **HIT ✅** | $116 | $116 | **+16** |
| R4 | Class 5 | 1400m | Turf | #4 | 13, 8, 9, 14, 6 | 10 | $100 | 12→14→8 | ❌ 12th | MISS ❌ | $1,873 | $0 | −100 |
| R5 | Class 4 | 1650m | AWT | #4 | 2, 10, 8, 1, 6 | 10 | $100 | 5→8→2 | ❌ 10th | MISS ❌ | $2,470 | $0 | −100 |
| R6 | Class 4 | 1400m | Turf | #2 | 6, 11, 3, 8, 1 | 10 | $100 | 6→2→9 | ✅ 2nd | MISS ❌ | $146 | $0 | −100 |
| R7 | Class 4 | 1400m | Turf | #3 | 7, 13, 2, 10, 9 | 10 | $100 | 3→14→9 | ✅ 1st | MISS ❌ | $383 | $0 | −100 |
| R8 | Class 3 | 1800m | Turf | #5 | 10, 1, 9, 4, 8 | 10 | $100 | 8→10→11 | ❌ 6th | MISS ❌ | $5,528 | $0 | −100 |
| R9 | Class 3 | 1650m | AWT | #8 | 12, 7, 4, 2, 9 | 10 | $100 | 10→5→1 | ❌ 7th | MISS ❌ | $2,441 | $0 | −100 |
| R10 | Class 3 | 1000m | Turf | #1 | 2, 8, 4, 9, 10 | 10 | $100 | 1→7→14 | ✅ 1st | MISS ❌ | $6,135 | $0 | −100 |
| R11 | Class 3 | 1200m | Turf | #2 | 1, 4, 5, 3, 10 | 10 | $100 | 5→2→3 | ✅ 2nd | **HIT ✅** | $1,148 | $1,148 | **+1,048** |
| **TOTAL** | | | | | | **110** | **$1,100** | | **6/11** | **2/11** | | **$1,264** | **+164** |

## Race-by-Race Results — Strategy A

| R | Class | Mode | Banker(s) | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | C5 | A | #2 | 12,4,1,7 | 6 | $60 | 1→14→12 | MISS ❌ | $182 | $0 | −60 | Banker 6th + gap #14 (fav, MC 0.0%) |
| R2 | C4 | B | #13 | 3,7,5,9,1 | 10 | $100 | 13→2→3 | MISS ❌ | $108 | $0 | −100 | Banker won, gap #2 (MC #14, `+trial`) |
| R3 | C2 | A (雙膽拖) | #2 + #6 | 7,5,8,3 | 4 | $40 | 6→2→7 | **HIT ✅** | $116 | $116 | +76 | — |
| R4 | C5 | A | #4 | 13,8,9,6 | 6 | $60 | 12→14→8 | MISS ❌ | $1,873 | $0 | −60 | Banker 12th + gaps #12, #14 |
| R5 | C4 | A (6) | #4 | 2,8,10,1,6 | 10 | $100 | 5→8→2 | MISS ❌ | $2,470 | $0 | −100 | Banker 10th (steamed 9.8→5.3) + gap #5 |
| R6 | C4 | B | #2 | 11,6,3,8,1 | 10 | $100 | 6→2→9 | MISS ❌ | $146 | $0 | −100 | Banker 2nd, gap #9 (MC #9, `+trial`) |
| R7 | C4 | A (6) | #3 | 7,13,2,10,9 | 10 | $100 | 3→14→9 | MISS ❌ | $383 | $0 | −100 | Banker won, gap #14 (MC #12, 3.8 SP) |
| R8 | C3 | A (7) | #5 | 10,1,9,8,4,2 | 15 | $150 | 8→10→11 | MISS ❌ | $5,528 | $0 | −150 | Banker 6th + gap #11 (61) |
| R9 | C3 | A (7) | #8 | 12,7,2,4,1,9 | 15 | $150 | 10→5→1 | MISS ❌ | $2,441 | $0 | −150 | Banker 7th + gaps #10, #5 |
| R10 | C3 | B (8) | #1 | 2,9,4,8,13,3,10 | 21 | $210 | 1→7→14 | MISS ❌ | $6,135 | $0 | −210 | Banker won, gaps #7 (MC #12), #14 (MC #9) |
| R11 | C3 | A | #2 | 4,1,5,3 | 6 | $60 | 5→2→3 | **HIT ✅** | $1,148 | $1,148 | +1,088 | — |

## B-trio (report's MC-only ticket) — Race-by-Race, for reference

| R | Banker | Final legs | Step B action | Stake | Hit? | Pattern |
|---|---|---|---|---|---|---|
| R1 | #2 | 12,4,1,14 | #14 replaced #7 | $60 | ❌ | C — held #14 (2nd), #1, #12; banker 6th |
| R2 | #13 | 3,7,2,14,11 | #2 replaced #5; #14 replaced #9; add #11 | $100 | ✅ $108 | — (#2 added via Win-odds < 10) |
| R3 | #2 | 6,7,5,8,3 | — | $100 | ✅ $116 | — |
| R4 | #4 | 13,8,6 | #6 replaced #9 | $30 | ❌ | C — missed #12, #14 |
| R5 | #4 | 2,10,8,6,7,12,3 | #7 replaced #1; add #12, #3 | $210 | ❌ | C — missed #5 |
| R6 | #2 | 6,11,3,8 | — | $60 | ❌ | B — missed #9 (pre 10, not < 10) |
| R7 | #3 | 7,13,2,10,9,8,14,11 | add #8, #14, #11 | $280 | ✅ $383 | — (#14 added via Win-odds < 10) |
| R8 | #5 | 10,1,9,4,3,6 | #3 replaced #2; **#6 replaced #8** | $150 | ❌ | C — **swap removed the winner #8**; missed #11 |
| R9 | #8 | 12,7,4,2,5,6,11 | #5 replaced #9; add #6, #11 | $210 | ❌ | C — held #5 (2nd); missed #10, #1 |
| R10 | #1 | 2,8,4,9,10,13,6 | #6 replaced #3 | $210 | ❌ | B — missed #7, #14 |
| R11 | #2 | 1,4,5,10 | **#10 replaced #3** | $60 | ❌ | B — **swap removed #3 (3rd)**; Trio $1,148 lost |
| **TOTAL** | | | | **$1,470** | **3/11** | $607 returned, −$863 |

Step B **added a placer in four races** (R1 #14, R2 #2, R7 #14, R9 #5) and converted two (R2, R7). **The 1-for-1 swap removed a placer in two races**: R8 #8 (won) and R11 #3 (3rd). The R11 swap alone cost a $1,148 Trio, more than B-trio's whole return for the card. That makes four of the last five meetings where the swap dropped a placer. The "add" half of Step B has value. The "replace" half keeps costing money.

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| A — Banker fail, all 3 placers in legs | 0/9 | — |
| B — Banker hit, pool gap | 4/9 | R2 (#2 MC #14), R6 (#9 MC #9), R7 (#14 MC #12), R10 (#7 MC #12, #14 MC #9) |
| C — Banker fail + pool gap | 5/9 | R1 (#14 MC #14), R4 (#12 MC #8), R5 (#5 MC #10), R8 (#11 MC #9), R9 (#10 MC #8, #5 MC #10, #1 MC #7) |

**The pool gaps were deep this card.** Every gap horse was MC #7 or lower, and 9 of the 12 were MC #9 or lower. Last card's cheap fix (a 7th leg = MC #7) would have rescued nothing here: B7 goes 2/11, $1,650 staked, **−$386**. **Noteworthy:** the three single-gap Pattern B misses (R2, R6, R7) all had a **`+trial` horse at pre-race ≤ 10** as the gap, and two of them (R2 #2, R7 #14) were near-zero MC horses that the market backed to SP ≤ 4.4. B uses no SCMP input, so it cannot see the trial signal. The market signal is visible to B in principle, but only through a market-floor blend.

## Full MC Place% Table — Per Race

Seq: ★ = 膽 (MC #1 banker), L1–L5 = 腳 by MC Win% rank, — = outside the Strategy B pool. "Pre odds" = the HKJC pool odds the report used (~10:22–10:35 HKT). "Snap" = last momentum snapshot before the scheduled post. SP = final win odds from results. Mkt rk = rank by SP (ties share rank). Pool = in the Strategy B (MC top 6) ticket. In A? = in Strategy A's pool.

### R1 — Class 5 | 1650m AWT | Good | Trio $182

| Seq | # | Horse | Win% | Place% | Pre odds | Snap | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|------|----|-------------|------|------|-------|----------|
| ★ | 2 | HAILTOTHEVICTORS | 45.7% | 81.6% | 6.6 | 6.2 | 6.8 | 3 | ✅ | 膽 (Banker, MC #1) | ✅ | 6 |
| L1 | 12 | ORIENTAL SURPRISE | 20.5% | 59.7% | 4.6 | 4.2 | 3.7 | 2 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L2 | 4 | SOARING BRONCO | 14.4% | 49.8% | 20 | 20 | 16 | 6 | ✅ | 腳 (Leg) | ✅ | 4 |
| L3 | 1 | DOUBLE BINGO | 9.3% | 38.9% | 8.3 | 8.8 | 11 | 5 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L4 | 7 | CELESTIAL HARMONY | 3.9% | 22.3% | 21 | 22 | 22 | 8 | ✅ | 腳 (Leg) | ✅ | 11 |
| L5 | 13 | GO GO GO | 1.4% | 11.0% | 17 | 15 | 18 | 7 | ✅ | 腳 (Leg) | ❌ | 7 |
| — | 5 | RISING ELITE | 1.3% | 8.8% | 38 | 50 | 79 | 13 | ❌ | — | ❌ | 8 |
| — | 9 | BLUE BARON | 1.0% | 7.4% | 36 | 51 | 37 | 11 | ❌ | — | ❌ | 14 |
| — | 11 | MAZING GRACE | 0.9% | 7.4% | 10 | 8.6 | 10 | 4 | ❌ | — | ❌ | 5 |
| — | 6 | SWAGGER BRO | 0.8% | 5.9% | 30 | 35 | 28 | 9 | ❌ | — | ❌ | 9 |
| — | 3 | FORTUNE SUPERNOVA | 0.4% | 3.4% | 26 | 37 | 48 | 12 | ❌ | — | ❌ | 13 |
| — | 10 | KOLACHI | 0.3% | 2.6% | 66 | 79 | 116 | 14 | ❌ | — | ❌ | 12 |
| — | 8 | VIVA TASTE | 0.1% | 0.7% | 16 | 23 | 34 | 10 | ❌ | — | ❌ | 10 |
| — | 14 | HAPPYDEARHAPPYDEER | 0.0% | 0.6% | 3.6 | 3.6 | 3.1 | 1 | ❌ | — | ❌ | 2 ✅ |

**Top 3:** 1–14–12 · **Outside B pool:** #14 · **Banker #2 finished 6**

**Pattern analysis — Pattern C.** MC #1 #2 HAILTOTHEVICTORS (45.7%, "202% undervalued") stayed at 6.6–6.8 and ran 6th. The market favourite **#14 HAPPYDEARHAPPYDEER (3.6→3.1) was rated 0.0% win / 0.6% place by MC**, last of 14, and ran 2nd. Its visor + tongue-tie gear change and 7lb claim were invisible to the model. L3 #1 DOUBLE BINGO (MC #4) won and L1 #12 (MC #2, `+trial`) ran 3rd. **Signals missed:** the market's strong support for #14 against the model's lowest possible rating. B-trio's Win-odds swap added #14, but the banker failed anyway.

### R2 — Class 4 | 1200m Turf | Good to Firm | Trio $108

| Seq | # | Horse | Win% | Place% | Pre odds | Snap | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|------|----|-------------|------|------|-------|----------|
| ★ | 13 | KOL | 31.4% | 62.3% | 2.7 | 2 | 1.9 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 3 | COPARTNER A I | 17.9% | 47.1% | 8.5 | 8.8 | 8.9 | 3 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L2 | 7 | SILVER SPURS | 13.1% | 39.2% | 20 | 20 | 24 | 7 | ✅ | 腳 (Leg) | ✅ | 12 |
| L3 | 9 | GOOD POWER | 7.8% | 26.2% | 54 | 105 | 158 | 14 | ✅ | 腳 (Leg) | ✅ | 11 |
| L4 | 5 | LEAN ERA | 6.8% | 24.9% | 15 | 20 | 26 | 9 | ✅ | 腳 (Leg) | ✅ | 13 |
| L5 | 14 | SAME TO YOU | 5.3% | 20.0% | 8.1 | 9.1 | 12 | 4 | ✅ | 腳 (Leg) | ❌ | 9 |
| — | 1 | TEN LOVES | 4.7% | 18.7% | 52 | 59 | 78 | 11 | ❌ | — | ✅ | 10 |
| — | 11 | TRENDY RUSH | 4.3% | 17.3% | 8.3 | 11 | 15 | 5 | ❌ | — | ❌ | 6 |
| — | 4 | FAITHFUL WARRIOR | 2.5% | 11.8% | 44 | 68 | 109 | 13 | ❌ | — | ❌ | 14 |
| — | 12 | E HOPEFUL | 1.8% | 8.6% | 30 | 39 | 55 | 10 | ❌ | — | ❌ | 7 |
| — | 6 | HAPPY SPECIAL | 1.5% | 7.5% | 15 | 21 | 25 | 8 | ❌ | — | ❌ | 4 |
| — | 10 | SHANDONG SPIRIT | 1.4% | 7.0% | 34 | 45 | 21 | 6 | ❌ | — | ❌ | 8 |
| — | 8 | SMILING SKY | 0.9% | 5.2% | 42 | 81 | 105 | 12 | ❌ | — | ❌ | 5 |
| — | 2 | WOLF COMING | 0.6% | 4.1% | 6.4 | 6.2 | 4.4 | 2 | ❌ | — | ❌ | 2 ✅ |

**Top 3:** 13–2–3 · **Outside B pool:** #2 · **Banker #13 finished 1**

**Pattern analysis — Pattern B.** MC #1 #13 KOL (31.4%, 2.7→1.9 fav, Purton) won, and L1 #3 ran 3rd. 2nd was **#2 WOLF COMING, MC #14 of 14 (0.6%)**, the 2nd favourite at 6.4 pre-race, backed to 4.4. SCMP had `+trial` and `+form` on it. **Signals missed:** the market (2nd favourite, steaming) and the trial note. B-trio's Win-odds < 10 rule took #2 in for #5 and hit. MC's "undervalued" legs #9 (323%) and #7 (162%) ran 11th and 12th.

### R3 — Class 2 | 1650m AWT | Good | Trio $116

| Seq | # | Horse | Win% | Place% | Pre odds | Snap | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|------|----|-------------|------|------|-------|----------|
| ★ | 2 | TALENTS AMBITION | 62.8% | 93.1% | 2.3 | 2.3 | 3.3 | 2 | ✅ | 膽 (Banker, MC #1) | ✅ | 2 ✅ |
| L1 | 6 | DEFINITIVE | 14.8% | 65.4% | 11 | 12 | 8.7 | 4 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L2 | 7 | SKY VINO | 13.3% | 62.4% | 5.7 | 5.2 | 2.9 | 1 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L3 | 5 | AWESOME FLUKE | 3.7% | 27.1% | 19 | 19 | 30 | 8 | ✅ | 腳 (Leg) | ✅ | 7 |
| L4 | 8 | LOCH TAY | 2.9% | 26.1% | 7.6 | 6 | 4.9 | 3 | ✅ | 腳 (Leg) | ✅ | 4 |
| L5 | 3 | SING DRAGON | 2.3% | 21.4% | 7.1 | 6.6 | 8.9 | 5 | ✅ | 腳 (Leg) | ✅ | 6 |
| — | 1 | CHANCHENG GLORY | 0.1% | 2.3% | 11 | 13 | 15 | 6 | ❌ | — | ❌ | 8 |
| — | 4 | GORGEOUS WIN | 0.1% | 2.1% | 10 | 16 | 25 | 7 | ❌ | — | ❌ | 5 |

**Top 3:** 6–2–7 · **Outside B pool:** none · **Banker #2 finished 2**

**Pattern analysis — HIT.** MC #1–#3 filled the frame in an 8-runner race. MC #2 #6 DEFINITIVE (14.8%, 11→8.7) won, the banker #2 TALENTS AMBITION (62.8%) ran 2nd at 3.3, and L2 #7 SKY VINO (backed 5.7→2.9 fav) ran 3rd. B's 10 combos returned $116 (+$16). A's 4-combo 雙膽拖 on the same six returned +$76.

### R4 — Class 5 | 1400m Turf | Good to Firm | Trio $1,873

| Seq | # | Horse | Win% | Place% | Pre odds | Snap | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|------|----|-------------|------|------|-------|----------|
| ★ | 4 | RATTAN GALAXY | 36.5% | 69.6% | 11 | 9.9 | 13 | 6 | ✅ | 膽 (Banker, MC #1) | ✅ | 12 |
| L1 | 13 | SUPERB GUY | 17.8% | 48.9% | 6.2 | 5.7 | 8 | 3 | ✅ | 腳 (Leg) | ✅ | 6 |
| L2 | 8 | THE ALL ROUNDER | 17.6% | 47.7% | 3 | 2.7 | 3.5 | 1 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L3 | 9 | COLOURFUL WINNER | 6.3% | 26.0% | 12 | 9 | 5 | 2 | ✅ | 腳 (Leg) | ✅ | 5 |
| L4 | 14 | SUPREME WINNER | 4.3% | 19.0% | 19 | 26 | 23 | 10 | ✅ | 腳 (Leg) | ❌ | 2 ✅ |
| L5 | 6 | PERIDOT | 3.7% | 16.2% | 7.4 | 7.7 | 9.3 | 4 | ✅ | 腳 (Leg) | ✅ | 9 |
| — | 3 | SEA DIAMOND | 3.5% | 15.7% | 21 | 29 | 37 | 13 | ❌ | — | ❌ | 14 |
| — | 12 | TEAM HAPPY | 3.2% | 15.8% | 22 | 21 | 9.8 | 5 | ❌ | — | ❌ | 1 🏆 |
| — | 7 | SPEEDY TRIDENT | 2.2% | 10.7% | 13 | 19 | 28 | 11 | ❌ | — | ❌ | 13 |
| — | 2 | LIGHTNING ACE | 1.3% | 7.2% | 14 | 18 | 15 | 7 | ❌ | — | ❌ | 8 |
| — | 1 | TURBO JEFFERIES | 1.3% | 7.6% | 23 | 28 | 31 | 12 | ❌ | — | ❌ | 11 |
| — | 5 | MADE FOR LIFE | 1.2% | 7.0% | 24 | 29 | 17 | 8 | ❌ | — | ❌ | 4 |
| — | 11 | MY FLYING ANGEL | 0.7% | 5.2% | 26 | 35 | 18 | 9 | ❌ | — | ❌ | 7 |
| — | 10 | SMART CITY | 0.4% | 3.3% | 66 | 76 | 80 | 14 | ❌ | — | ❌ | 10 |

**Top 3:** 12–14–8 · **Outside B pool:** #12 · **Banker #4 finished 12**

**Pattern analysis — Pattern C.** MC #1 #4 RATTAN GALAXY (36.5%, "301% undervalued" at 11) ran 12th from gate 10. Winner **#12 TEAM HAPPY was MC #8 (3.2%)**. It was steamed from 22 to 9.8 and carried SCMP `+excuses` and `+form`. L4 #14 SUPREME WINNER (MC #5, 23) ran 2nd, and L2 #8 (fav) ran 3rd. **Signals missed:** #12's late steam, which was invisible at 10:22 (still 21 at the last snapshot), and the banker's wide draw.

### R5 — Class 4 | 1650m AWT | Good | Trio $2,470

| Seq | # | Horse | Win% | Place% | Pre odds | Snap | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|------|----|-------------|------|------|-------|----------|
| ★ | 4 | VIVACIOUS WIN | 35.5% | 67.5% | 9.8 | 7.3 | 5.3 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 10 |
| L1 | 2 | HAPPY UNIVERSE | 12.6% | 37.7% | 9 | 12 | 18 | 10 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L2 | 10 | PERFECT TEAM | 10.9% | 34.8% | 23 | 35 | 50 | 13 | ✅ | 腳 (Leg) | ✅ | 8 |
| L3 | 8 | FIREFOOT | 10.0% | 33.2% | 10 | 9.2 | 7.4 | 4 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L4 | 1 | GENERAL REDWOOD | 8.3% | 28.3% | 21 | 21 | 35 | 11 | ✅ | 腳 (Leg) | ✅ | 13 |
| L5 | 6 | NIGHT PUROSANGUE | 6.9% | 24.7% | 5.7 | 4.3 | 5.5 | 2 | ✅ | 腳 (Leg) | ✅ | 9 |
| — | 11 | NEVER PETER OUT | 3.4% | 14.9% | 12 | 17 | 10 | 6 | ❌ | — | ❌ | 12 |
| — | 7 | CHILL KAKA | 3.3% | 14.8% | 5.1 | 4.7 | 6.7 | 3 | ❌ | — | ❌ | 11 |
| — | 12 | BULL ATTITUDE | 3.0% | 14.6% | 8.7 | 9.2 | 7.7 | 5 | ❌ | — | ❌ | 4 |
| — | 5 | SUPREME AGILITY | 2.6% | 11.8% | 13 | 16 | 14 | 8 | ❌ | — | ❌ | 1 🏆 |
| — | 3 | ANOTHER WORLD | 2.5% | 11.2% | 9.9 | 13 | 12 | 7 | ❌ | — | ❌ | 6 |
| — | 9 | LEAPING STAR | 0.8% | 5.2% | 26 | 21 | 16 | 9 | ❌ | — | ❌ | 7 |
| — | 13 | JOLTIN | 0.2% | 1.3% | 26 | 44 | 40 | 12 | ❌ | — | ❌ | 5 |

**Top 3:** 5–8–2 · **Outside B pool:** #5 · **Banker #4 finished 10**

**Pattern analysis — Pattern C.** MC #1 #4 VIVACIOUS WIN (35.5%) was **backed from 9.8 to 5.3 (SP favourite) and ran 10th**. Winner **#5 SUPREME AGILITY was MC #10 (2.6%)** at 13→14, with SCMP `+trial` ("won one of three trials"). L3 #8 FIREFOOT and L1 #2 HAPPY UNIVERSE (MC #4, #2) ran 2nd and 3rd. **Signals missed:** #5's trial. Nothing in the market pointed to it. The banker's steam was a false signal.

### R6 — Class 4 | 1400m Turf | Good to Firm | Trio $146

| Seq | # | Horse | Win% | Place% | Pre odds | Snap | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|------|----|-------------|------|------|-------|----------|
| ★ | 2 | GRAND PATCH | 27.0% | 59.7% | 2.6 | 2.2 | 2.7 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 2 ✅ |
| L1 | 6 | MR COOL | 18.8% | 49.0% | 6.5 | 6.9 | 3.5 | 2 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L2 | 11 | TOP TO SKY | 18.2% | 48.7% | 21 | 20 | 14 | 6 | ✅ | 腳 (Leg) | ✅ | 11 |
| L3 | 3 | POSITIVE SMILE | 13.2% | 40.3% | 5.6 | 4.8 | 6.9 | 3 | ✅ | 腳 (Leg) | ✅ | 9 |
| L4 | 8 | HERO RISING | 7.2% | 26.5% | 11 | 11 | 13 | 5 | ✅ | 腳 (Leg) | ✅ | 5 |
| L5 | 1 | SUGAR GOODSON | 4.6% | 17.6% | 27 | 69 | 125 | 13 | ✅ | 腳 (Leg) | ✅ | 13 |
| — | 4 | COPARTNER FLEET | 3.0% | 13.7% | 43 | 61 | 107 | 12 | ❌ | — | ❌ | 4 |
| — | 10 | SUPERB KID | 2.5% | 12.3% | 28 | 45 | 77 | 10 | ❌ | — | ❌ | 7 |
| — | 9 | SHOTGUN | 1.7% | 8.7% | 10 | 11 | 7.4 | 4 | ❌ | — | ❌ | 3 ✅ |
| — | 5 | PEGASUS ELITE | 1.3% | 7.3% | 19 | 22 | 16 | 7 | ❌ | — | ❌ | 10 |
| — | 12 | GOLDENTRONICMIGHTY | 1.1% | 6.0% | 39 | 67 | 93 | 11 | ❌ | — | ❌ | 12 |
| — | 7 | LESLIE | 0.7% | 4.6% | 26 | 36 | 68 | 9 | ❌ | — | ❌ | 14 |
| — | 14 | VIEW ALL THINGS | 0.6% | 4.5% | 21 | 31 | 41 | 8 | ❌ | — | ❌ | 6 |
| — | 13 | APOLAR FIGHTER | 0.1% | 1.1% | 58 | 91 | 157 | 14 | ❌ | — | ❌ | 8 |

**Top 3:** 6–2–9 · **Outside B pool:** #9 · **Banker #2 finished 2**

**Pattern analysis — Pattern B.** MC #2 #6 MR COOL (backed 6.5→3.5) won, and the banker #2 GRAND PATCH ran 2nd. 3rd was **#9 SHOTGUN, MC #9 (1.7%)**, at 10 pre-race and 7.4 SP, with SCMP `+trial` ("two good trials"). The report's caveat named exactly this risk. #9 was the 4th-shortest in the market but sat outside both pools. **Signals missed:** #9's trial plus its late support. B-trio's Win-odds < 10 test missed it at exactly 10.

### R7 — Class 4 | 1400m Turf "B" | Good to Firm | Trio $383

| Seq | # | Horse | Win% | Place% | Pre odds | Snap | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|------|----|-------------|------|------|-------|----------|
| ★ | 3 | LADY'S LOVE | 47.6% | 77.9% | 4.3 | 3.3 | 5.1 | 3 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 7 | GENIUS BABY | 9.9% | 35.3% | 20 | 27 | 41 | 10 | ✅ | 腳 (Leg) | ✅ | 9 |
| L2 | 13 | FORZA LEADER | 9.4% | 34.9% | 14 | 16 | 27 | 9 | ✅ | 腳 (Leg) | ✅ | 12 |
| L3 | 2 | CALIFORNIA WAVES | 8.0% | 31.4% | 12 | 14 | 9.7 | 5 | ✅ | 腳 (Leg) | ✅ | 4 |
| L4 | 10 | NEXT FORTUNE | 7.7% | 30.3% | 32 | 35 | 16 | 8 | ✅ | 腳 (Leg) | ✅ | 13 |
| L5 | 9 | MIGHTY FIGHTER | 5.3% | 23.1% | 10 | 10 | 13 | 7 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| — | 8 | GOLDEN WIN | 2.9% | 16.4% | 5.5 | 6.4 | 8.5 | 4 | ❌ | — | ❌ | 14 |
| — | 6 | JOLLY BONUS | 2.8% | 12.7% | 34 | 49 | 90 | 13 | ❌ | — | ❌ | 11 |
| — | 11 | HAPPY PROMISE | 2.6% | 13.3% | 9 | 10 | 10 | 6 | ❌ | — | ❌ | 10 |
| — | 5 | KINGMAN REEF | 1.3% | 7.7% | 24 | 44 | 76 | 12 | ❌ | — | ❌ | 7 |
| — | 12 | POLAR PATCH | 1.2% | 7.7% | 12 | 8.1 | 5 | 2 | ❌ | — | ❌ | 6 |
| — | 14 | QUICK CONTRIBUTION | 0.8% | 5.4% | 5.7 | 5.9 | 3.8 | 1 | ❌ | — | ❌ | 2 ✅ |
| — | 4 | STEADFAST FORT | 0.3% | 2.3% | 42 | 62 | 58 | 11 | ❌ | — | ❌ | 8 |
| — | 1 | WELL ENOUGH | 0.2% | 1.7% | 48 | 92 | 171 | 14 | ❌ | — | ❌ | 5 |

**Top 3:** 3–14–9 · **Outside B pool:** #14 · **Banker #3 finished 1**

**Pattern analysis — Pattern B.** MC #1 #3 LADY'S LOVE (47.6%) won, and L5 #9 MIGHTY FIGHTER ran 3rd. 2nd was **#14 QUICK CONTRIBUTION, MC #12 (0.8%)**, 5.7 pre-race and **3.8 SP (2nd favourite)**. It had placed 4 times from 7 last term, with consecutive 2nds over 1400m. It was back from lameness (vet pass 26 days before) and had "trialled well". **Signals missed:** the market and the trial. MC's speed-figure-led rating could not see its form. B-trio added #14 by Win-odds < 10 and hit.

### R8 — Class 3 | 1800m Turf | Good to Firm | Trio $5,528

| Seq | # | Horse | Win% | Place% | Pre odds | Snap | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|------|----|-------------|------|------|-------|----------|
| ★ | 5 | FLOW WATER FLOW | 45.0% | 79.4% | 2.5 | 2.1 | 2.4 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 6 |
| L1 | 10 | FOREVER FOLKS | 17.1% | 50.5% | 13 | 19 | 22 | 9 | ✅ | 腳 (Leg) | ✅ | 2 ✅ |
| L2 | 1 | SMART AVENUE | 9.3% | 36.9% | 21 | 24 | 16 | 6 | ✅ | 腳 (Leg) | ✅ | 10 |
| L3 | 9 | HYMNBOOK | 7.7% | 32.3% | 5.5 | 5.3 | 6.9 | 3 | ✅ | 腳 (Leg) | ✅ | 5 |
| L4 | 4 | GLITTERING LEGEND | 7.4% | 32.0% | 13 | 15 | 8.4 | 4 | ✅ | 腳 (Leg) | ✅ | 8 |
| L5 | 8 | BIG RETURN | 5.7% | 27.3% | 12 | 8.5 | 4.8 | 2 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| — | 2 | POCKETING | 5.3% | 23.7% | 15 | 24 | 41 | 10 | ❌ | — | ✅ | 4 |
| — | 7 | KING EQUINE | 1.5% | 9.0% | 32 | 38 | 19 | 8 | ❌ | — | ❌ | 9 |
| — | 11 | DREAMING TOGETHER | 0.6% | 4.5% | 31 | 51 | 61 | 11 | ❌ | — | ❌ | 3 ✅ |
| — | 3 | CALL ME MAGNIFIQUE | 0.3% | 3.0% | 8.1 | 8.8 | 13 | 5 | ❌ | — | ❌ | 7 |
| — | 6 | MIGHTY STRENGTH | 0.1% | 1.3% | 9.6 | 10 | 16 | 6 | ❌ | — | ❌ | 11 |

**Top 3:** 8–10–11 · **Outside B pool:** #11 · **Banker #5 finished 6**

**Pattern analysis — Pattern C.** MC #1 #5 FLOW WATER FLOW (45.0%, 2.4 fav, Purton) ran 6th. L5 #8 BIG RETURN (MC #6, 12→**4.8**) won, and L1 #10 FOREVER FOLKS (MC #2, 22) ran 2nd. 3rd was **#11 DREAMING TOGETHER, MC #9 (0.6%) at 61**. **Signals missed:** #8's late steam supported a leg rather than the banker. #11 was unforecastable. The quinella 8-10 alone would have paid $583.5.

### R9 — Class 3 | 1650m AWT | Good | Trio $2,441

| Seq | # | Horse | Win% | Place% | Pre odds | Snap | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|------|----|-------------|------|------|-------|----------|
| ★ | 8 | BLOSSOMY | 34.5% | 68.2% | 4.9 | 5.6 | 7.6 | 3 | ✅ | 膽 (Banker, MC #1) | ✅ | 7 |
| L1 | 12 | QUANTUM LEGEND | 12.6% | 39.7% | 6.2 | 4.6 | 3 | 1 | ✅ | 腳 (Leg) | ✅ | 6 |
| L2 | 7 | KEEFY | 12.2% | 35.2% | 13 | 13 | 10 | 5 | ✅ | 腳 (Leg) | ✅ | 8 |
| L3 | 4 | THRIVING BROTHERS | 9.8% | 33.0% | 7.6 | 5.9 | 9.3 | 4 | ✅ | 腳 (Leg) | ✅ | 11 |
| L4 | 2 | CORLEONE | 9.7% | 32.8% | 13 | 19 | 20 | 10 | ✅ | 腳 (Leg) | ✅ | 10 |
| L5 | 9 | KING DANCE | 5.4% | 21.7% | 13 | 17 | 20 | 10 | ✅ | 腳 (Leg) | ✅ | 4 |
| — | 1 | DRAGON AIR FORCE | 5.0% | 19.4% | 12 | 13 | 16 | 9 | ❌ | — | ✅ | 3 ✅ |
| — | 10 | ALL ROUND WINNER | 3.5% | 15.5% | 19 | 15 | 11 | 6 | ❌ | — | ❌ | 1 🏆 |
| — | 6 | STORMI | 3.4% | 15.8% | 8.3 | 7.9 | 12 | 7 | ❌ | — | ❌ | 9 |
| — | 5 | NEZHA | 2.6% | 12.1% | 7.4 | 9.8 | 7.2 | 2 | ❌ | — | ❌ | 2 ✅ |
| — | 11 | TURIN MASCOT | 1.3% | 6.6% | 9.1 | 10 | 12 | 7 | ❌ | — | ❌ | 5 |

**Top 3:** 10–5–1 · **Outside B pool:** #10, #5, #1 · **Banker #8 finished 7**

**Pattern analysis — Pattern C (no placer in the B pool).** MC #1 #8 BLOSSOMY (34.5%) **drifted 4.9→7.6 and ran 7th** from the "tricky" gate 10. The frame was **MC #8 #10 ALL ROUND WINNER (19→11)**, **MC #10 #5 NEZHA (7.4, `+excuses`)** and **MC #7 #1 DRAGON AIR FORCE (`+trial`, blinkers, 16)**. A had #1 through `+trial` and Rule 8. B-trio had #5. Neither had #10. **Signals missed:** the banker's drift, and #10's late support (19→11).

### R10 — Class 3 | 1000m straight Turf | Good to Firm | Trio $6,135

| Seq | # | Horse | Win% | Place% | Pre odds | Snap | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|------|----|-------------|------|------|-------|----------|
| ★ | 1 | HORSEPOWER | 23.8% | 53.4% | 13 | 10 | 18 | 10 | ✅ | 膽 (Banker, MC #1) | ✅ | 1 🏆 |
| L1 | 2 | ALPHA STRIKE | 13.2% | 37.5% | 8.2 | 8.5 | 8.9 | 4 | ✅ | 腳 (Leg) | ✅ | 14 |
| L2 | 8 | MICKLEY | 11.9% | 33.6% | 9 | 15 | 21 | 12 | ✅ | 腳 (Leg) | ✅ | 6 |
| L3 | 4 | CELESTIAL HERO | 11.3% | 33.1% | 14 | 11 | 5.4 | 1 | ✅ | 腳 (Leg) | ✅ | 8 |
| L4 | 9 | CONGHUA GALAXY | 8.9% | 29.5% | 8.3 | 7.3 | 6.5 | 2 | ✅ | 腳 (Leg) | ✅ | 9 |
| L5 | 10 | INVINCIBLE STEED | 8.7% | 28.4% | 9.4 | 7.8 | 9.1 | 5 | ✅ | 腳 (Leg) | ✅ | 10 |
| — | 13 | LUCKY CANDY | 7.5% | 24.8% | 8.2 | 7.3 | 10 | 7 | ❌ | — | ✅ | 12 |
| — | 3 | METRO POWER | 7.1% | 24.6% | 12 | 11 | 9.9 | 6 | ❌ | — | ✅ | 7 |
| — | 14 | LAHORE | 2.7% | 11.8% | 12 | 9.5 | 6.7 | 3 | ❌ | — | ❌ | 3 ✅ |
| — | 6 | SMART OINK | 2.1% | 9.6% | 8.1 | 9.6 | 16 | 8 | ❌ | — | ❌ | 13 |
| — | 5 | ETERNAL FORTUNE | 1.5% | 7.1% | 14 | 20 | 16 | 8 | ❌ | — | ❌ | 4 |
| — | 7 | CASA OF HONOR | 0.7% | 3.5% | 23 | 27 | 20 | 11 | ❌ | — | ❌ | 2 ✅ |
| — | 11 | NOTTHESILLYONE | 0.5% | 2.4% | 17 | 31 | 47 | 13 | ❌ | — | ❌ | 11 |
| — | 12 | JIN SHENG | 0.1% | 0.7% | 29 | 37 | 52 | 14 | ❌ | — | ❌ | 5 |

**Top 3:** 1–7–14 · **Outside B pool:** #7, #14 · **Banker #1 finished 1**

**Pattern analysis — Pattern B.** MC #1 #1 HORSEPOWER (23.8%, "210% undervalued") **won at 18, 10th in the market**. This was the best MC call of the card. 2nd was **#7 CASA OF HONOR, MC #12 (0.7%, 20, `+excuses`)**, and 3rd **#14 LAHORE, MC #9 (2.7%)**, backed 12→6.7 with back-to-back Sha Tin wins (`+form`). All five B legs ran 6th or worse, including L1 #2 (8.9) last. **Signals missed:** #14's steam and recent wins. #7 was unforecastable.

### R11 — Class 3 | 1200m Turf | Good to Firm | Trio $1,148

| Seq | # | Horse | Win% | Place% | Pre odds | Snap | SP | Mkt rk (SP) | Pool | Role | In A? | Finished |
|-----|---|-------|------|--------|----------|------|----|-------------|------|------|-------|----------|
| ★ | 2 | SOLID STATE | 49.2% | 81.8% | 1.9 | 2 | 2.1 | 1 | ✅ | 膽 (Banker, MC #1) | ✅ | 2 ✅ |
| L1 | 1 | HELENE SUPAFEELING | 13.2% | 45.5% | 13 | 8.7 | 12 | 4 | ✅ | 腳 (Leg) | ✅ | 4 |
| L2 | 4 | GOLD PATCH | 10.7% | 40.7% | 21 | 23 | 18 | 7 | ✅ | 腳 (Leg) | ✅ | 10 |
| L3 | 5 | BUNTA BABY | 10.5% | 39.8% | 22 | 25 | 39 | 10 | ✅ | 腳 (Leg) | ✅ | 1 🏆 |
| L4 | 3 | LUCY IN THE SKY | 4.5% | 22.4% | 20 | 21 | 11 | 3 | ✅ | 腳 (Leg) | ✅ | 3 ✅ |
| L5 | 10 | PACKING GLORY | 3.6% | 18.2% | 8.9 | 5.2 | 4.4 | 2 | ✅ | 腳 (Leg) | ❌ | 5 |
| — | 9 | ALMIGHTY LIGHTNING | 2.7% | 15.3% | 15 | 20 | 13 | 5 | ❌ | — | ❌ | 9 |
| — | 8 | CITY GOLD BANNER | 2.5% | 14.1% | 22 | 27 | 16 | 6 | ❌ | — | ❌ | 7 |
| — | 14 | MASTER PAYMENT | 2.0% | 13.1% | 20 | 19 | 26 | 9 | ❌ | — | ❌ | 14 |
| — | 13 | LIFELINE EXPRESS | 0.4% | 2.8% | 24 | 43 | 62 | 11 | ❌ | — | ❌ | 11 |
| — | 7 | GRAND EAGLE | 0.4% | 3.4% | 10 | 12 | 18 | 7 | ❌ | — | ❌ | 8 |
| — | 6 | RADIANT PATH | 0.3% | 2.6% | 31 | 63 | 104 | 12 | ❌ | — | ❌ | 12 |
| — | 11 | SHANGHAI WARRIOR | 0.0% | 0.2% | 40 | 93 | 130 | 13 | ❌ | — | ❌ | 6 |
| — | 12 | VULCANUS | 0.0% | 0.1% | 39 | 94 | 156 | 14 | ❌ | — | ❌ | 13 |

**Top 3:** 5–2–3 · **Outside B pool:** none · **Banker #2 finished 2**

**Pattern analysis — HIT.** MC #4 #5 BUNTA BABY (10.5%, drifted 22→**39**) won. The banker #2 SOLID STATE (49.2%, 2.1 fav) ran 2nd, and MC #5 #3 LUCY IN THE SKY (20→11) ran 3rd. **The 6-horse MC pool caught a $1,148 Trio with two placers at 11 and 39.** B-trio swapped #3 out for the market's #10 (8.9→4.4, ran 5th) and missed. MC #6 #10 was B's only leg the market liked, and it was the one that failed.

## B Banker Performance

| Race | B banker (MC #1) | MC Win% | MC Place% | Pre odds | SP | Mkt rank (SP) | Placed? | Position |
|------|------------------|---------|-----------|----------|----|---------------|---------|----------|
| R1 | #2 HAILTOTHEVICTORS | 45.7% | 81.6% | 6.6 | 6.8 | 3 | ❌ | 6th |
| R2 | #13 KOL | 31.4% | 62.3% | 2.7 | 1.9 | 1 | ✅ | 1st |
| R3 | #2 TALENTS AMBITION | 62.8% | 93.1% | 2.3 | 3.3 | 2 | ✅ | 2nd |
| R4 | #4 RATTAN GALAXY | 36.5% | 69.6% | 11 | 13 | 6 | ❌ | 12th |
| R5 | #4 VIVACIOUS WIN | 35.5% | 67.5% | 9.8 | 5.3 | 1 | ❌ | 10th |
| R6 | #2 GRAND PATCH | 27.0% | 59.7% | 2.6 | 2.7 | 1 | ✅ | 2nd |
| R7 | #3 LADY'S LOVE | 47.6% | 77.9% | 4.3 | 5.1 | 3 | ✅ | 1st |
| R8 | #5 FLOW WATER FLOW | 45.0% | 79.4% | 2.5 | 2.4 | 1 | ❌ | 6th |
| R9 | #8 BLOSSOMY | 34.5% | 68.2% | 4.9 | 7.6 | 3 | ❌ | 7th |
| R10 | #1 HORSEPOWER | 23.8% | 53.4% | 13 | 18 | 10 | ✅ | 1st |
| R11 | #2 SOLID STATE | 49.2% | 81.8% | 1.9 | 2.1 | 1 | ✅ | 2nd |

**Banker top 3: 6/11 (54.5%). Banker win: 3/11 (27.3%).**
Mean MC Win% of bankers was **39.9%** and mean MC Place% **72.2%**, against an actual place rate of **54.5%**: overstated by ~18pp (01-Oct: +12pp; 27-Sep: +25pp; 23-Sep: +7pp; 16-Sep: −8pp). **MC #1 ≥ 35% placed only 3/7**, while 23–35% placed 3/4, the reverse of 01-Oct. When the B banker placed, it won 3 of 6 times.

**Market-rank split (SP), six meetings:**

| Banker profile (MC #1 market rank at SP) | 13-Sep ST | 16-Sep HV | 23-Sep HV | 27-Sep ST | 01-Oct ST | 04-Oct ST | Combined |
|------------------------------------------|-----------|-----------|-----------|-----------|-----------|-----------|----------|
| Market rank 1–2 | 3/4 | 6/6 | 3/5 | 3/7 | 5/6 | **4/6** | **24/34 (70.6%)** |
| Market rank 3 | 0/1 | — | 0/1 | 1/1 | 1/3 | **1/3** | 3/9 |
| Market rank 4+ | 0/5 | 0/2 | 2/3 | 1/3 | 0/2 | **1/2** | **4/17 (23.5%)** |

Rank 1–2 failures this card: R5 #4, which steamed from 9.8 into SP favouritism and ran 10th, and R8 #5 (2.4 fav, 6th). Rank 3: R7 #3 won; R1 #2 and R9 #8 (drifted 4.9→7.6) missed. Rank 4+: R10 #1 (10th in the market) won; R4 #4 (6th in the market) ran 12th.

## Conclusions for Strategy B

1. **B matched A on selection and beat it on stake by $30.** Both hit R3 and R11 with the same bankers. B's flat $100 was cheaper than A's 15–21 combo tickets in R8–R10, though dearer than A's tight Mode A tickets. Over eight meetings B still trails A by **$958**, and B has never hit a race that A missed.
2. **The market-rank filter on the banker is still the most robust B finding.** Rank 1–2 at SP: **24/34 (70.6%)** over six meetings. Rank 4+: **4/17 (23.5%)**. The SP problem remains: R5's banker only became favourite late. Test the filter with near-off snapshot odds.
3. **The pool gaps were MC #8–#14 this card, so no pool-size tweak helps.** A 7th leg (B7) would have lost −$386. Three of the four Pattern B misses had a `+trial` horse at pre-race ≤ 10 as the single gap, and two were market-backed near-zero MC horses (season **12/16** placed at SP ≤ 6). Pure MC cannot see either signal. The candidates are a market-floor blend and an SCMP trial flag.
4. **For B-trio, keep the "add" step and drop the "replace" step.** Adds caught placers in four races and converted R2 and R7. Replacements removed R8's winner and R11's 3rd, which cost $1,148.
