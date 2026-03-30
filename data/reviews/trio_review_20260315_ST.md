# Trio Post-Race Review — Sha Tin | 15 Mar 2026 | R1–R11 (All Races)

**Results source:** `data/historical/results_20260315_ST.json`  
**Suggestions:** `data/reports/trio_strategy_20260315_ST_R1.md` … `_R11.md`

---

## Summary

| Metric | Value |
|--------|--------|
| Races played | **11 (R1–R11)** |
| Hit rate | **2/11 (18.2%)** |
| Total staked | $1,060 |
| Total returned | $290 |
| **Net P&L** | **−$770** |
| **ROI** | **−72.6%** |
| Session result | **LOSS** |

**膽拖 rule:** Every combination is **banker + 2 legs**. The actual top 3 must therefore **include the banker** for any ticket to win. If the banker is not in the first three, we cannot hit even when all three placers are in our legs (R8, R11).

---

## Race-by-race

| Race | Mode | Banker | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss reason |
|------|------|--------|------|----------------|------|--------|--------|-----|-------------|
| R1 | B | #2 COURIER MAGIC | 5,6,9,7,13 | **13**→9→**14** | ❌ MISS | 2,479 | $0 | −$100 | Banker 7th; pool gap #14 (37x) |
| R2 | B | #8 YEE CHEONG RAIDER | 9,5,3,4,6 | 9→8→3 | ✅ **HIT** | 168 | $168 | +$68 | — |
| R3 | A | #1 CROSSBORDERDUDE | 8,5,2,7 | **4**→**9**→1 | ❌ MISS | 6,971 | $0 | −$60 | Banker 3rd; pool gap #4 (23x), #9 (124x) |
| R4 | B | #1 NYX GLUCK | 4,12,2,9,11 | **5**→12→4 | ❌ MISS | 744 | $0 | −$100 | Banker not in frame; pool gap #5 (5x) |
| R5 | B | #5 CALIFORNIA STAR | 13,12,11,7,10 | **1**→5→11 | ❌ MISS | 3,390 | $0 | −$100 | Banker 2nd; pool gap #1 NEZHA (28x) |
| R6 | B | #8 MUST GO | 2,6,5,12,1 | **3**→**10**→2 | ❌ MISS | 2,099 | $0 | −$100 | Banker not in frame; pool gap #3 (21x), #10 (2.7x, DH 1st) |
| R7 | B | #10 THUNDER PRINCE | 2,12,7,1,4 | 1→12→2 | ❌ MISS | 183 | $0 | −$100 | **Banker 4th; all 3 placers in legs** |
| R8 | B | #2 DRAGON AIR FORCE | 4,7,5,12,8 | 8→7→4 | ❌ MISS | 765 | $0 | −$100 | **Banker 4th** — result 8-7-4 all in legs but 膽拖 needs banker in top 3 |
| R9 | B | #9 AMAZING DUCK | 3,12,10,5,2 | 5→3→**13** | ❌ MISS | 701 | $0 | −$100 | Banker not in frame; pool gap #13 PERIDOT (11x) |
| R10 | B | #4 SMART GOLF | 3,9,2,7,6 | 4→9→3 | ✅ **HIT** | 122 | $122 | +$22 | — |
| R11 | B | #1 RIDING TOGETHER | 7,8,2,11,4 | 7→2→11 | ❌ MISS | 182 | $0 | −$100 | **Banker not in frame** — result 7-2-11 all in legs but 膽拖 needs banker in top 3 |

**Notes:** R6 = dead heat for 1st (#3, #10). With 膽拖, every ticket = banker + 2 legs; if banker is not in the actual top 3, we cannot collect even when the three placers are all in our pool (R8, R11).

---

## Hit analysis

### R2 — HIT ✅
- **Result:** 9→8→3. Trio $168. Banker #8 2nd; legs 9, 3 filled 1st and 3rd. Our tickets include (8,9,3) so we win.
- **P&L:** +$68 (stake $100).

### R10 — HIT ✅
- **Result:** 4→9→3. Trio $122. Banker #4 won; legs 9, 3 completed the frame. Our tickets include (4,9,3) so we win.
- **P&L:** +$22 (stake $100).

### Why R8 and R11 did NOT hit
- **R8:** Result 8-7-4. Banker #2 was 4th. Our 膽拖 tickets are all of the form (2, leg, leg), e.g. (2,4,7), (2,4,8), (2,7,8). The winning Trio is (4,7,8). No ticket has (4,7,8) because every ticket has #2. So **miss**.
- **R11:** Result 7-2-11. Banker #1 was not in top 3. Our tickets are all (1, leg, leg). Winning Trio (2,7,11) does not contain #1. So **miss**.
- **Rule:** With 膽拖, the banker must be one of the top 3 finishers for any combination to win.

---

## Miss classification

### Pattern A: Banker fail — all 3 placers in legs (3 misses)
| Race | Banker | Banker pos | Result (1-2-3) | Missed return |
|------|--------|------------|----------------|----------------|
| **R7** | #10 THUNDER PRINCE | 4th | 1→12→2 | $183 |
| **R8** | #2 DRAGON AIR FORCE | 4th | 8→7→4 | $765 |
| **R11** | #1 RIDING TOGETHER | not in top 3 | 7→2→11 | $182 |

In each case the three placers were in our pool (legs), but with 膽拖 we need the banker in the top 3, so we collect nothing.

### Pattern B: Banker hit — pool gap (2 misses)
| Race | Banker | Gap horse(s) | Trio $ |
|------|--------|--------------|--------|
| **R3** | #1 (3rd) | #4 (1st), #9 (2nd) | 6,971 |
| **R5** | #5 (2nd) | #1 NEZHA (1st) | 3,390 |

### Pattern C: Banker fail + pool gap (4 misses)
| Race | Banker | Gap horse(s) | Trio $ |
|------|--------|--------------|--------|
| **R1** | #2 (7th) | #14 (3rd) | 2,479 |
| **R4** | #1 (not in frame) | #5 (1st) | 744 |
| **R6** | #8 (not in frame) | #3, #10 (DH 1st) | 2,099 |
| **R9** | #9 (not in frame) | #13 PERIDOT (3rd) | 701 |

---

## What-if (if banker had placed or pool had included gap)

| Race | Would pool have hit if … | Trio $ |
|------|---------------------------|--------|
| R1 | #14 in pool | 2,479 |
| R3 | #4 and/or #9 in pool | 6,971 |
| R4 | #5 in pool | 744 |
| R5 | #1 in pool | 3,390 |
| R6 | #3 and #10 in pool | 2,099 |
| R7 | Banker #10 3rd (all already in pool) | 183 |
| R8 | Banker #2 in top 3 (result 8-7-4 already in legs) | 765 |
| R9 | #13 in pool | 701 |
| R11 | Banker #1 in top 3 (result 7-2-11 already in legs) | 182 |

---

## Learnings

1. **膽拖 = banker must be in top 3:** With 1膽+5腳, every ticket is (banker + 2 legs). If the banker is not in the actual 1-2-3, we cannot win even when all three placers are in our legs (R8, R11). So R8 and R11 were painful Pattern A misses: we had the right six horses but the banker just missed the frame.
2. **R6 — Favourite #10:** We excluded TURQUOISE VELOCITY (MC “overvalued 86%”). It dead-heated for 1st. In Class 3 sprints, consider keeping a strong market favourite in the pool when MC is uncertain.
3. **R9 — #13 PERIDOT:** Third at 11x was outside our 6 (we had 9,3,12,10,5,2). Wide-open race; 7-horse pool or extra “value” leg might have included #13.
4. **R5 — #1 NEZHA:** MC 0.7% win; won at 28x. AWT 1650 longshots may need a second look.
5. **R3 — Mode A tight pool:** Excluding #4 and #9 cost a 6,971 Trio despite banker #1 placing 3rd. Mode A is cheaper but more exposed to one or two gaps.
6. **R7 — Pattern A:** Banker #10 4th; 1-12-2 all in legs. Only a banker placement away from a hit.

---

## Recommendations for next time

- **Pool width in wide-open races (e.g. R9):** Consider 7-horse pool or adding one “next by Adj Place%” leg when no horse has Adj Win% ≥ 20%.
- **Market favourite in sprints:** When MC heavily overvalues the favourite but form is credible, consider including as a leg (e.g. R6 #10).
- **AWT / low-MC longshots:** Consider a rule for one longshot leg when top MC win% is modest and field is open (e.g. R4 #5, R5 #1).
- **Pattern A:** Continue tracking “banker 4th, all three in legs”; no change to banker rule — variance.
