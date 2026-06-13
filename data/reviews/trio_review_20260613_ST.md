# Trio Post-Race Review — Sha Tin | 13 Jun 2026

**Venue:** Sha Tin | **Date:** 13 Jun 2026 | **Races:** 11 (R1–R11) | **Going:** Good to Yielding

**Strategy reports:** `data/reports/trio_strategy_20260613_ST_R1.md` … **R11`

**Results:** `data/historical/results_20260613_ST.json`

**Note:** SCMP data **loaded** for all races (form flags, TIR, vet, trackwork). Strategy A used MC + SCMP adjustments + jockey boost.

---

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played (Strategy A) | **11 (R1–R11)** |
| Hit rate | **1/11 (9.1%)** |
| Total staked | **$820** |
| Total returned | **$407** |
| **Net P&L** | **$-413** |
| **ROI** | **-50.4%** |
| Session Result | **LOSS** |

**Strategy B (report tickets, MC#1 + Place% legs):** 4/11 hits | $1300 staked | $1266 returned | **$-34** | -2.6% ROI

**Strategy B benchmark (MC top 6 + MC#1 banker, $100/race):** 3/11 | $1100 staked | **+$127** | 11.5% ROI

---

## Section 2: Race-by-Race Cross-Reference

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
| R1 | Griffin 1000m | — | **#5** | #1, #4, #7, #6 | 6→1→7 | MISS ❌ | $39 | $0 | $-60 | Pattern A: banker fail (all 3 in legs) |
| R2 | Class 5 1200m | A (expanded) | **#4** | #12, #8, #10, #3, #9 | 8→4→12 | **HIT ✅** | $407 | $407 | +$307 | — |
| R3 | Class 4 1400m | A | **#5** | #9, #11, #4, #13 | **12**→4→5 | MISS ❌ | $759 | $0 | $-60 | Pattern B: pool gap (#12) |
| R4 | Class 4 1800m | B | **#5** | #9, #1, #6, #2, #14 | **3**→**12**→2 | MISS ❌ | $3087 | $0 | $-100 | Pattern C: banker fail + pool gap (#3, #12) |
| R5 | Class 4 1200m | B | **#1** | #5, #3, #7, #2, #8 | 7→2→3 | MISS ❌ | $460 | $0 | $-100 | Pattern A: banker fail (all 3 in legs) |
| R6 | Class 4 1400m | B | **#6** | #3, #9, #1, #7, #11 | 1→11→9 | MISS ❌ | $164 | $0 | $-100 | Pattern A: banker fail (all 3 in legs) |
| R7 | Class 4 1200m | A | **#null** | #5, #4, #2 | **3**→**6**→**1** | MISS ❌ | $61 | $0 | $-30 | Pattern C: banker fail + pool gap (#3, #6, #1) |
| R8 | Class 2 1600m | A (expanded) | **#2** | #3, #5, #4, #8, #7 | 2→7→**1** | MISS ❌ | $1081 | $0 | $-100 | Pattern B: pool gap (#1) |
| R9 | Class 3 1200m | B | **#null** | #4, #11, #6, #3 | **10**→3→**9** | MISS ❌ | $3274 | $0 | $-40 | Pattern C: banker fail + pool gap (#10, #9) |
| R10 | Class 3 1600m | A | **#null** | #4, #3, #9 | **2**→**8**→**11** | MISS ❌ | $245 | $0 | $-30 | Pattern C: banker fail + pool gap (#2, #8, #11) |
| R11 | Class 3 1400m | B | **#3** | #7, #14, #13, #12, #9 | 12→3→**4** | MISS ❌ | $275 | $0 | $-100 | Pattern B: pool gap (#4) |

---

## Section 3: Hits Analysis

### R2 — HIT ✅

**Result:** 8→4→12 | **Trio:** $407 | **Stake:** $100 | **P&L:** +$307

| Horse | Role | SP | MC Win% | MC Place% | Result |
|-------|------|-----|---------|-----------|--------|
| #4 ALWAYS FLUKE | ★ Banker | 5.8 | 34% | 70.5% | **2** |
| #12 VERBIER | Leg | 11 | 21.1% | 57.8% | **3** |
| #8 COUNTRY DANCER | Leg | 7.5 | 18% | 51.3% | **1** |
| #10 VON BAER | Leg | 8.9 | 9.8% | 36.9% | 10 |
| #3 ROBOT KNIGHT | Leg | 5.8 | 5.9% | 27.1% | 8 |
| #9 VIVA CHALEUR | Leg | 11 | 6% | 26.4% | 5 |

**Return:** $407 − $100 = **+$307**


---

## Section 4: Miss Classification

| Pattern | Count (A) | Races |
|---------|-------------|-------|
| **A** — Banker fail, all 3 in legs | 3 | R1, R5, R6 |
| **B** — Banker hit, pool gap | 3 | R3, R8, R11 |
| **C** — Banker fail + pool gap | 4 | R4, R7, R9, R10 |
| **PASS** | 0 | — |

**Strategy B (report) hits:** R1, R2, R3, R7

### Notable misses

- **Pattern A (×3):** R1, R5, R6 — all three placers in pool but banker missed top 3.
- **Pattern B (×3):** R3, R8, R11 — banker placed but excluded horse(s) in the frame.
- **R9 (Trio $3,274):** Pattern C: banker fail + pool gap (#10, #9).
- **MC top-6 would have hit:** R3 ($759), R7 ($61).

---

## Section 5: What-If Analysis

| Race | Current miss | Alternative | Would Hit? | Cost Change |
|------|--------------|-------------|------------|-------------|
| R1 | Pattern A: banker fail (all 3 in legs) | Switch banker | ❌ | +$40–90 |
| R3 | Pattern B: pool gap (#12) | Add **#12** or expand to Mode B/C | ✅ (MC top-6 would hit) | +$40–90 |
| R4 | Pattern C: banker fail + pool gap (#3, #12) | Add **#3, #12** or expand to Mode B/C | ❌ | +$40–90 |
| R5 | Pattern A: banker fail (all 3 in legs) | Switch banker | ❌ | +$40–90 |
| R6 | Pattern A: banker fail (all 3 in legs) | Switch banker | ❌ | +$40–90 |
| R7 | Pattern C: banker fail + pool gap (#3, #6, #1) | Add **#3, #6, #1** or expand to Mode B/C | ✅ (MC top-6 would hit) | +$40–90 |
| R8 | Pattern B: pool gap (#1) | Add **#1** or expand to Mode B/C | Maybe | +$40–90 |
| R9 | Pattern C: banker fail + pool gap (#10, #9) | Add **#10, #9** or expand to Mode B/C | ❌ | +$40–90 |

**Fixable (structural):** R1, R3, R7 — expanded pool / MC top-6 would capture **~$859** in missed Trio dividends.

**Unfixable / variance:** R4 (3→12→2, Trio $3087); R5 (7→2→3, Trio $460); R6 (1→11→9, Trio $164).

---

## Section 6: Key Moments

- **Best Bet:** **R2** — only Strategy A hit; Trio **$407**; **+$307** on $100 stake.
- **Worst Bet:** **R7** — **$-30** stake; missed **$61** Trio (3→6→1).
- **Most Frustrating:** **R1** — Pattern A: banker fail (all 3 in legs); result **6→1→7**.
- **Biggest Surprise:** **R9** — MC #1 **#2** (32.7% Win) upset; winner **#10**; Trio **$3,274**.
- **Best MC Call:** **R8** — MC #1 **#2** won (56.8% Win).

---

## Section 7: Model Calibration

### 7a. Banker Performance (Strategy A)

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 1 | R8 |
| Banker 2nd–3rd | 3 | R2, R3, R11 |
| Banker out of top 3 | 7 | R1, R4, R5, R6, R7, R9, R10 |

**Banker strike rate (top 3):** 4/11 = **36.4%**  
**Banker win rate:** 1/11 = **9.1%**

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool | 4/11 |
| Banker hit + pool gap (Pattern B) | 3/11 |
| MC top-6 full coverage hits | 3/11 |

### 7c. MC–Market Divergence

| Race | MC #1 | MC Win% | Winner | Outcome |
|------|-------|---------|--------|---------|
| R1 | #1 | 37.4% | #6 | ❌ Upset |
| R2 | #4 | 34.0% | #8 | ❌ Upset |
| R3 | #5 | 37.2% | #12 | ❌ Upset |
| R4 | #5 | 21.1% | #3 | ❌ Upset |
| R5 | #1 | 27.5% | #7 | ❌ Upset |
| R6 | #6 | 25.7% | #1 | ❌ Upset |
| R7 | #3 | 38.3% | #3 | ✅ MC #1 won |
| R8 | #2 | 56.8% | #2 | ✅ MC #1 won |
| R9 | #2 | 32.7% | #10 | ❌ Upset |
| R10 | #2 | 36.4% | #2 | ✅ MC #1 won |
| R11 | #3 | 26.4% | #12 | ❌ Upset |

**MC #1 win rate:** 3/11 = **27.3%**

### 7d. SCMP +Excuses Flag Performance

| Race | Horse | +Excuses For | Finished | Verdict |
|------|-------|--------------|----------|---------|
| R1 | #1, #4, #5, #7 | +excuses +2% | 2nd, 4th, 4th, 3rd | ✅ #1/#7 placed |
| R2 | (none flagged) | — | — | — |
| R3 | #5, #9 | +excuses | 3rd, 5th | ✅ #5 placed |
| R4 | #5, #9 | +excuses | 10th, 4th | ❌ |
| R5 | #1, #3, #7 | +excuses | 4th, 3rd, 1st | ✅ #3/#7 placed |
| R6 | #6, #9 | +excuses | 7th, 3rd | ✅ #9 placed |
| R7 | #3, #1 | +excuses | 1st, 3rd | ✅ both placed |
| R8 | #2, #3 | +excuses | 1st, 4th | ✅ #2 won |
| R9 | #2, #4 | +excuses | 4th, 3rd | ✅ #4 placed |
| R10 | #2, #8 | +excuses | 1st, 2nd | ✅ both placed |
| R11 | #3, #7 | +excuses | 2nd, 4th | ✅ #3 placed |

**+Excuses hit rate (top 3):** 12/22 flagged horses placed (multiple per race) — flags broadly aligned with frame horses.

### 7e. Divergence Override

No manual override applied.

---

## Section 8: Learnings

**What Worked**
- **Strategy A hit R2** — 1/11 staked races (9.1%).
- **Strategy B (report)** outperformed A (**$-34** vs **$-413**) with **4** hit(s): R1, R2, R3, R7.
- **Banker top-3 rate** 36.4% (4/11) — frame often correct even when Trio missed.


**What Didn't Work**
- **Hit rate 9.1%** on 11 staked races — **$-413** session P&L.
- **Pattern B ×3** — banker placed but pool too tight (R3, R8, R11).
- **Pattern C ×4** — banker and pool both missed (R4, R7, R9, R10).
- **MC #1 won only 3/11** races — upset-heavy card.

**Strategy Adjustments**
- [ ] **R1:** Debutant-banker rule left **#5** (26x) as banker while **#1** (MC #1, 2nd) was a leg — Pattern A miss; B hit with #1 banker.
- [ ] **R3:** Winner **#12** outside A's 5-horse Mode A pool — expand or add MC rank-6 horse.
- [ ] **R7:** 雙膽拖 $30 stake; **#3** won but **#6** gap — B hit with wider pool.
- [ ] Track B vs A divergence — **B (MC top-6)** won P&L this session.

---

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | 6 | 1/6 | $360 | $407 | +$47 | 13.1% |
| MEDIUM | 3 | 0/3 | $260 | $0 | $-260 | -100.0% |
| MEDIUM-HIGH | 2 | 0/2 | $200 | $0 | $-200 | -100.0% |

---

## Section 10: Running Total (Season Cumulative)

### 10a. This Meeting — Strategy A

| Date | Venue | Races staked | Hits | Staked | Returned | P&L | ROI |
|------|-------|--------------|------|--------|----------|-----|-----|
| **13 Jun 2026** | **ST** | **11** (0 PASS) | **1/11** | **$820** | **$407** | **$-413** | **-50.4%** |

_Full season cumulative tables: see prior reviews in `data/reviews/trio_review_*.md` and segment stats in `data/static/`._

### 10e. This Meeting — A/B Comparison

| Strategy | Races | Hits | Staked | Returned | P&L | ROI |
|----------|-------|------|--------|----------|-----|-----|
| **A (pipeline)** | 11 | 1/11 | $820 | $407 | $-413 | -50.4% |
| **B (report)** | 11 | 4/11 | $1300 | $1266 | $-34 | -2.6% |
| **B (MC top-6)** | 11 | 3/11 | $1100 | $1227 | +$127 | 11.5% |

**Session winner (P&L):** **B (MC top-6)**

---

## Section 11: A/B Strategy Comparison

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | Strat A Banker | Strat B Pool (MC top 6) | Strat B Banker | Result | A Hit? | B Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|-------------|----------------|-------------------------|----------------|--------|--------|--------|--------|----------|----------|---------|---------|----------------|
| R1 | #1,#4,#5,#6,#7 | #5 | #1,#5,#4,#7,#2,#3 | #1 | 6→1→7 | ❌ | ❌ | $39 | $0 | $0 | $60 | $100 | Banker A=#5 B=#1 |
| R2 | #3,#4,#8,#9,#10,#12 | #4 | #4,#12,#8,#10,#9,#3 | #4 | 8→4→12 | ✅ | ✅ | $407 | $407 | $407 | $100 | $100 | Pool size/members differ |
| R3 | #4,#5,#9,#11,#13 | #5 | #5,#9,#11,#4,#13,#12 | #5 | 12→4→5 | ❌ | ✅ | $759 | $0 | $759 | $60 | $100 | Pool size/members differ |
| R4 | #1,#2,#5,#6,#9,#14 | #5 | #5,#1,#9,#6,#2,#14 | #5 | 3→12→2 | ❌ | ❌ | $3087 | $0 | $0 | $100 | $100 | Pool size/members differ |
| R5 | #1,#2,#3,#5,#7,#8 | #1 | #1,#5,#3,#7,#2,#8 | #1 | 7→2→3 | ❌ | ❌ | $460 | $0 | $0 | $100 | $100 | Pool size/members differ |
| R6 | #1,#3,#6,#7,#9,#11 | #6 | #6,#3,#9,#1,#7,#11 | #6 | 1→11→9 | ❌ | ❌ | $164 | $0 | $0 | $100 | $100 | Pool size/members differ |
| R7 | #null,#2,#4,#5 | #null | #3,#1,#5,#4,#2,#6 | #3 | 3→6→1 | ❌ | ✅ | $61 | $0 | $61 | $30 | $100 | Banker A=#null B=#3 |
| R8 | #2,#3,#4,#5,#7,#8 | #2 | #2,#3,#5,#4,#8,#7 | #2 | 2→7→1 | ❌ | ❌ | $1081 | $0 | $0 | $100 | $100 | Pool size/members differ |
| R9 | #null,#3,#4,#6,#11 | #null | #2,#1,#4,#11,#6,#5 | #2 | 10→3→9 | ❌ | ❌ | $3274 | $0 | $0 | $40 | $100 | Banker A=#null B=#2 |
| R10 | #null,#3,#4,#9 | #null | #2,#8,#4,#3,#1,#9 | #2 | 2→8→11 | ❌ | ❌ | $245 | $0 | $0 | $30 | $100 | Banker A=#null B=#2 |
| R11 | #3,#7,#9,#12,#13,#14 | #3 | #3,#7,#14,#13,#12,#9 | #3 | 12→3→4 | ❌ | ❌ | $275 | $0 | $0 | $100 | $100 | Pool size/members differ |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | 11 | 11 | 0 |
| Hits | 1/11 (9.1%) | 3/11 (27.3%) | +2 |
| Total staked | $820 | $1100 | +$280 |
| Total returned | $407 | $1227 | $820 |
| **Net P&L** | **$-413** | **+$127** | **+$540** |
| **ROI** | -50.4% | 11.5% | — |
| Banker top 3 | 4/11 | — | — |

### 11d. Where A and B Diverged

| R3 | A MISS ❌ vs B HIT ✅ | B +$659 | — |
| R7 | A MISS ❌ vs B HIT ✅ | B +$-39 | — |

### 11e. Session Verdict

**B (MC top-6)** led P&L this session: Strategy A **1/11** hits (**$-413**), B report **4/11** (**$-34**), MC top-6 **3/11** (**+$127**). B report’s extra hits (R1, R3, R7) came from MC #1 banker and wider pools. Key A-only losses: R1 debutant-banker swap (#5 vs #1), R3 tight Mode A pool (#12 gap). MC #1 won only **3/11** races but **placed 7/11** (63.6%).

---

*Generated by `tools/generate-trio-review-markdown.ts` from `data/temp/trio_review_data_20260613_ST.json`*
