# Trio Post-Race Review — Happy Valley | 2026-09-16

**Meeting 4 of the 2026/27 season.** 8-race Wednesday night card, Turf "B" course, going **Good** throughout. One late scratching: **R8 #5 HUGE WAVE** (not in any pool; field 11). Results: `data/historical/results_20260916_HV.json`. Bet records: `data/reports/trio_strategy_20260916_HV_R1–R8.md`. All eight reports used the **17:55 HKT** odds snapshot.

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played | **8 (R1–R8)** |
| Hit rate | **0/8 (0.0%)** |
| Total staked | $850 |
| Total returned | $0 |
| **Net P&L** | **−$850** |
| **ROI** | **−100.0%** |
| Session Result | **LOSS** |

**Bankers placed 6/8 — the best banker card of the season — and the ticket still went 0/8.** Six misses were one horse short of the frame.

## Section 2: Race-by-Race Cross-Reference

Result column: **bold** = top-3 finisher NOT in the Strategy A pool.

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
| R1 | C5 1000m | B (1膽+5腳) | #2 | 9, 11, 4, 7, 10 | 11→**12**→**6** | MISS ❌ | $1,674 | $0 | −$100 | Banker fail (#2 8th, gate 12) + 2 pool gaps (#12 at 18, #6 at 16) |
| R2 | C4 1200m | A+R8 (1膽+5腳) | #3 | 11, 5, 9, 7, 8 | 3→8→**4** | MISS ❌ | $3,312 | $0 | −$100 | **Banker hit (#3 won)**, pool gap (#4 at 90, mkt last) |
| R3 | C4 1800m | A 雙膽拖 (2膽+4腳) | #8, #6 | 1, 3, 5, 10 | **7**→6→10 | MISS ❌ | $380 | $0 | −$40 | Banker 1 fail (#8 5th, SP 24) + pool gap (#7 at 12) |
| R4 | C4 1200m | A+R8 (1膽+5腳) | #3 | 2, 1, 4, 5, 12 | 3→**11**→12 | MISS ❌ | $315 | $0 | −$100 | **Banker hit (#3 won)**, pool gap (#11 at 6, mkt 3rd) |
| R5 | C4 1200m | B (1膽+5腳) | #7 | 6, 5, 10, 9, 11 | 6→**4**→7 | MISS ❌ | $315 | $0 | −$100 | **Banker hit (#7 3rd)**, pool gap (#4 at 9.5, 11 at snapshot) |
| R6 | C3 1650m | B (1膽+5腳) | #1 | 12, 8, 10, 6, 3 | **2**→1→10 | MISS ❌ | $198 | $0 | −$100 | **Banker hit (#1 2nd)**, pool gap (#2 at 4.2 — **the favourite**) |
| R7 | C3 1000m | B (1膽+5腳) | #1 | 5, 4, 8, 3, 2 | 4→**11**→1 | MISS ❌ | $1,154 | $0 | −$100 | **Banker hit (#1 3rd)**, pool gap (#11 at 17) |
| R8 | C2 1650m | A+R8 (1膽+7腳) | #12 | 1, 7, 11, 6, 4, 9, 8 | 12→**3**→4 | MISS ❌ | $2,356 | $0 | −$210 | **Banker hit (#12 won)**, pool gap (#3 at 11, Adj Place% 19.4%) |

## Section 3: Hits Analysis

**No Strategy A hits.** B-trio (the trio-strategy skill's MC-only ticket) hit R4 ($315) and R6 ($198) — see §11 and `trio_review_stratC_20260916_HV.md`. Both hits came from horses A's Adj Place% ranked out and B-trio's Win-odds < 10 rule added:

| Race | Horse | A Adj Place% | Snapshot odds | SP | Finished | Trio $ |
|------|-------|--------------|---------------|----|----------|--------|
| R4 | #11 KWAI CHUNG TALENTS | 15.7% | 8.1 | 6 (mkt 3rd) | 2nd | $315 |
| R6 | #2 POPE CODY | 15.3% (`+form`) | 8.0 | 4.2 (fav) | **1st** | $198 |

## Section 4: Miss Classification

| Pattern | Count | Races |
|---------|-------|-------|
| **A** — Banker fail, all 3 placers already in legs | **0/8** | — |
| **B** — Banker hit, pool gap | **6/8** | R2, R4, R5, R6, R7, R8 |
| **C** — Banker fail **and** pool gap | **2/8** | R1, R3 |

### Pattern A: Banker Fail — All 3 Placers Already in Legs

**None.**

### Pattern B: Banker Hit — Pool Gap (6/8)

| Race | Banker | Pos | Other placer in pool | Pool gap | Gap SP (snapshot) | Gap mkt rank | Gap A Adj Place% | Missed return |
|------|--------|-----|----------------------|----------|-------------------|--------------|------------------|---------------|
| R2 | #3 BRIGHT DAY | 1st | #8 DAN ATTACK (2nd) | **#4 GRIT SPIRIT** (3rd) | 90 (50) | 12th of 12 | 5.9% | $3,312 |
| R4 | #3 LIVE WIRE | 1st | #12 SAME TO YOU (3rd) | **#11 KWAI CHUNG TALENTS** (2nd) | 6 (8.1) | 3rd | 15.7% | $315 |
| R5 | #7 WINNING MONEY | 3rd | #6 YOUNG ARROW (1st) | **#4 LUCKY MCQUEEN** (2nd) | 9.5 (11) | 6th | 18.6% | $315 |
| R6 | #1 DAZZLING FIT | 2nd | #10 HYMNBOOK (3rd) | **#2 POPE CODY** (1st) | 4.2 (8.0) | **1st** | 15.3% | $198 |
| R7 | #1 LOVE TOGETHER | 3rd | #4 DANCING CLASSICS (1st) | **#11 RED ELEGANCE** (2nd) | 17 (20) | 9th | 4.3% | $1,154 |
| R8 | #12 LE ZONDA | 1st | #4 HELENE FEELING (3rd) | **#3 SAGACIOUS LIFE** (2nd) | 11 (10) | 6th= | 19.4% | $2,356 |

Combined Pattern B missed return: **$7,650**. **Pattern B was the dominant miss pattern at 6/8 — pool needs expansion.** Four of the six gap horses (R4, R5, R6, R8) were at **≤ 11 at snapshot or SP** with Adj Place% between 15% and 20% — the band just below Rule 8's 20% must-include line.

### Pattern C: Banker Fail + Pool Gap (2/8)

| Race | Banker | SP | Mkt rank | Pos | Pool gap(s) | Gap SP |
|------|--------|----|----------|-----|-------------|--------|
| R1 | #2 ALWAYS MY FOLKS | 9.4 | 4th | 8th | #12 SOLAR RIVER (2nd), #6 ICONICAL (3rd) | 18, 16 |
| R3 | #8 FAMILY FORTUNE (+ #6 placed 2nd) | 24 | 8th | 5th | #7 ROMANTIC FANTASY (1st) | 12 |

Both failed bankers were MC #1 picks the market rated **outside its top 3**. R1's report flagged gate 12 of 12 as "the single biggest risk on both tickets".

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R1 | 膽拖 #2 + 5腳, $100 | No structural fix — banker 8th, two gaps at 16–18 | ❌ | — |
| R2 | 膽拖 #3 + 5腳, $100 | No realistic fix — gap #4 was 90, market last | ❌ | — |
| R3 | 雙膽拖 #8+#6 + 4腳, $40 | No fix — #7 (Adj 11.2%) outside pool; banker #8 5th | ❌ | — |
| R4 | 膽拖 #3 + 5腳, $100 | **Add #11 (snapshot 8.1 < 10) as 6th leg → C(6,2)=15** | **✅ $315** | **+$50** |
| R5 | 膽拖 #7 + 5腳, $100 | **Add #4 (9.5 at the off) as 6th leg → 15 combos** — needs a near-post odds refresh | **✅ $315** | **+$50** |
| R6 | 膽拖 #1 + 5腳, $100 | **Add #2 (snapshot 8.0 < 10) as 6th leg → 15 combos** | **✅ $198** | **+$50** |
| R7 | 膽拖 #1 + 5腳, $100 | No fix — #11 at 17, MC 11th | ❌ | — |
| R8 | 膽拖 #12 + 7腳, $210 | **Add #3 (Adj Place% 19.4%) as 8th leg → C(8,2)=28** | **✅ $2,356** | **+$70** |

**Fixable misses:** 4 races (R4, R5, R6, R8) — **$3,184 recoverable for $220 extra stake**; the card would have gone **−$850 → +$2,114**. That is a retrofit. The narrower, pre-registered rule that only uses information available at 17:55 — **"any horse < 10 at snapshot must be in the pool"** — would have added R2 #2, R4 #11, R5 #8, R6 #2, R7 #10 (+$250) and returned $513 (R4, R6): **−$850 → −$587**. That rule already exists in B-trio and is the only thing separating it from A this meeting.

**Unfixable misses:** R1, R2, R3, R7 — two banker failures and two genuine longshots (#4 GRIT SPIRIT at 90, #11 RED ELEGANCE at 17).

## Section 6: Key Moments

- **Best Bet — R8 banker #12 LE ZONDA.** MC 44.2% / 76.6% (card high), 3.0 favourite, won by the book. Rule 8 dragged #4 HELENE FEELING (35) into the pool, and he ran 3rd. Everything the pipeline added was right; it stopped 0.6pp short.

- **Worst Bet — R6.** Excluded **#2 POPE CODY, who shortened 8.0 → 4.2 and won as favourite**. A's `+form` flag lifted him only to 15.3% Adj Place%. B-trio included him on odds alone and hit.

- **Most Frustrating — R8.** Card's largest stake ($210, 21 combos, 8-horse pool). Banker won. The pool held the 3rd-placer. Second was #3 SAGACIOUS LIFE at **Adj Place% 19.4% — 0.6pp below Rule 8's 20% bar** — and exactly 10 at snapshot, one tick above B-trio's < 10 rule. Trio $2,356.

- **Biggest Surprise — R2 #4 GRIT SPIRIT.** 90-1, last in the betting, MC 3.9% place, ran 3rd behind the MC banker and a pool leg. Trio $3,312.

- **Best MC Call — R2 #3 BRIGHT DAY.** MC 41.7% win (fair ~2.4) vs a 4.7 SP (~21% implied). Won. Runner-up: R8 #4 HELENE FEELING — MC 23.0% place at 35-1, ran 3rd.

## Section 7: Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 3 | R2 (#3), R4 (#3), R8 (#12) |
| Banker 2nd–3rd | 3 | R5 (#7, 3rd), R6 (#1, 2nd), R7 (#1, 3rd) |
| Banker out of top 3 | 2 | R1 (#2, 8th), R3 (#8, 5th; Banker 2 #6 ran 2nd) |

**Banker strike rate (top 3): 6/8 = 75.0%**
**Banker win rate: 3/8 = 37.5%**

For R3's 雙膽拖, both bankers needed to place: #6 ✅ 2nd, #8 ❌ 5th. Season to date: **16/35 = 45.7%**.

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | **0/8** |
| All 3 in pool OR banker + 2 legs | 0/8 |
| At least 2 placers in pool | **7/8** |
| Banker hit + pool gap | **6/8** |
| Top-3 slots captured by pool (of 24) | **15/24 = 62.5%** |

Random baseline for these pools (50 pool slots across 95 runners) ≈ **52.6%** of top-3 slots. At 62.5% the pool is only **~1.2× random** (13-Sep: 1.6×). HV's 12-runner fields with 6-horse pools leave little room: covering all three placers needs the pool to be right about half the field.

### 7c. MC-Market Divergence Outcomes

| Race | MC #1 | SP | Mkt rank | Fin | Market fav | SP | Fin | Divergence | MC correct? |
|------|-------|----|----------|-----|------------|----|-----|------------|-------------|
| R1 | #2 ALWAYS MY FOLKS | 9.4 | 4 | 8th | #7 MACANESE MASTER | 3.7 | 7th | MC prefers mkt-4th | ❌ |
| R2 | #3 BRIGHT DAY | 4.7 | 2 | **1st** | #11 LOVING VIBES | 3.7 | 4th | MC prefers mkt-2nd | ✅ |
| R3 | #8 FAMILY FORTUNE | 24 | 8 | 5th | #6 ROSEWOOD FLEETFOOT | 2.9 | **2nd** | MC prefers mkt-8th | ❌ |
| R4 | #3 LIVE WIRE | 3.1 | 1 | **1st** | #3 (same) | 3.1 | 1st | agree | — |
| R5 | #7 WINNING MONEY | 5.4 | 2 | **3rd** | #6 YOUNG ARROW | 3.1 | **1st** | MC prefers mkt-2nd | ✅ (both placed) |
| R6 | #1 DAZZLING FIT | 4.9 | 2 | **2nd** | #2 POPE CODY | 4.2 | **1st** | MC prefers mkt-2nd | ✅ (both placed) |
| R7 | #1 LOVE TOGETHER | 3.4 | 1 | **3rd** | #1 (same) | 3.4 | 3rd | agree | — |
| R8 | #12 LE ZONDA | 3.0 | 1 | **1st** | #12 (same) | 3.0 | 1st | agree | — |

**MC divergence accuracy: 3/5 cases MC was correct (60%).** The split is by distance from the market, not by divergence itself: MC #1 at market rank 2 went **3/3**; MC #1 at market rank 4+ went **0/2**.

Combined with 13-Sep (bankers at market rank 1: 3/4; rank 3: 0/1; rank 4+: 0/5):

| MC #1 market rank at SP | Placed (2 meetings) |
|-------------------------|---------------------|
| 1–2 | **9/10 (90%)** |
| 3 | 0/1 |
| 4+ | **0/7 (0%)** |

Market favourite top 3 this card: **6/8**. MC #1 top 3: **6/8**.

### 7d. SCMP Flag Performance

`+excuses` was applied to **27 of 95 runners (28%)** — far fewer than 13-Sep's 53%.

| Race | Horse | +Excuses For | Finished | Verdict |
|------|-------|--------------|----------|---------|
| R1 | #12 SOLAR RIVER | steadied, crowded near 50M | 2nd | ✅ |
| R2 | #4 GRIT SPIRIT | interference received | 3rd | ✅ |
| R3 | #6 ROSEWOOD FLEETFOOT | interference received | 2nd | ✅ |
| R3 | #7 ROMANTIC FANTASY | interference received | 1st | ✅ |
| R5 | #6 YOUNG ARROW | interference received | 1st | ✅ |
| R6 | #1 DAZZLING FIT | interference received | 2nd | ✅ |
| R6 | #10 HYMNBOOK | interference received | 3rd | ✅ |
| R8 | #12 LE ZONDA | interference received | 1st | ✅ |
| R8 | #3 SAGACIOUS LIFE | interference received | 2nd | ✅ |
| — | *(18 further flagged runners)* | — | 4th or worse | ❌ |

**+Excuses hit rate (top 3): 9/27 (33.3%)** — against a base rate of 24 places ÷ 95 runners = **25.3%** (+8.0pp). Two meetings combined: **24/101 = 23.8%**, still roughly base rate.

| Flag | Flagged | Top 3 | Rate | vs 25.3% base |
|------|---------|-------|------|---------------|
| `+excuses` (+2) | 27 | 9 | 33.3% | +8.0pp |
| `+form` (+1) | 19 | 7 | **36.8%** | **+11.5pp** |
| `+trial` (+2) | 12 | 3 | 25.0% | −0.3pp |
| negative (`−injury30d`, `−age`) | 7 | 3 | 42.9% | +17.6pp (wrong direction) |

Negative flags placed at a higher rate than base: R1 #6 ICONICAL (`−injury30d`, 3rd), R2 #8 DAN ATTACK (`−age`, 2nd), R4 #12 SAME TO YOU (`−age`, 3rd). n=7 is too small to act on, but it points the wrong way.

### 7e. Divergence Override Assessment

**No discretionary override was applied.** All eight tickets were rule output. The rule worth assessing is **Rule 8 (Adj Place% ≥ 20% must be in pool)**, which fired in R2, R3, R4, R8:

| Race | Rule 8 addition(s) | Result |
|------|--------------------|--------|
| R2 | #8 DAN ATTACK (21.7%) | **2nd** ✅ |
| R3 | #10 STAR BROSE (24.1%) | **3rd** ✅ |
| R4 | #12 SAME TO YOU (23.4%) | **3rd** ✅ |
| R8 | #4 (23.0%), #9 (21.2%), #8 (20.2%) | #4 **3rd** ✅, #9 4th, #8 11th |

**Rule 8 added a placer in 4 of 4 races where it fired** — the best-performing rule on the card. Its failure mode is the edge: R8 #3 at 19.4% was the missing horse.

## Section 8: Learnings

### What Worked

- **Banker selection: 6/8 top 3, 3/8 wins.** Every MC #1 at market rank 1–2 placed (6/6).
- **Rule 8 (≥ 20% Adj Place% must-include) added a placer in 4/4 races it fired** (R2 #8, R3 #10, R4 #12, R8 #4).
- **B-trio's Win-odds < 10 rule caught the two horses that mattered** (R4 #11, R6 #2) and turned 0/8 into 2/8.
- **`+form` flag: 7/19 = 36.8%** top 3 (+11.5pp over base).

### What Didn't Work

- **Pool width at HV.** 6/8 Pattern B. Four gaps were at 9.5–11 SP with Adj Place% 15–19.4%.
- **A ignores the market inside the pool.** R6 excluded the eventual favourite; R4 excluded the market's 3rd choice. The 13-Sep review already asked for a market-rank must-include rule; not yet implemented.
- **Stale odds.** One 17:55 snapshot for a card finishing ~22:50. Late moves that decided races: R5 #4 11→9.5, R6 #2 8.0→4.2, R7 #1 8.5→3.4, R4 #11 8.1→6.
- **Banking MC #1s the market doesn't rate.** R1 (#2 mkt 4th, gate 12) and R3 (#8 mkt 8th). Season: 0/7 at market rank 4+.
- **R8's 21-combo, $210 ticket** — 25% of card stake on one race — still missed.

### Strategy Adjustments

- [ ] **Must-include any horse < 10 in the latest odds**, regardless of Adj Place%. This card: +$250 stake, +$513 return (R4, R6). Backtest across the season before adopting.
- [ ] **Lower Rule 8 from 20% to ~17.5% Adj Place%** *or* combine with the odds rule — would have covered R8 #3 (19.4%) and R5 #4 (18.6%). Measure combo inflation first; R8 was already 21 combos.
- [ ] **Do not bank MC #1 at market rank ≥ 4** — PASS or re-bank on MC #2 if that horse is market top 2. Two meetings: 0/7 vs 9/10 at rank 1–2. On this card: PASS R1, R3 saves $140, loses no hits.
- [ ] **Refetch odds ≤ 30 min before each race** and re-apply the < 10 rules. Flagged on 13-Sep too; R5 is the second concrete miss.
- [ ] **Review B-trio's Step B *swap*** (as opposed to *add*): R8 swapped out #4 (23.0% MC place, ran 3rd) for #8 (ran 11th). Consider add-only.
- [ ] **Keep tracking `+form` separately** (36.8%, n=19); **`+trial` fell to base** (25.0%, n=12) after 33.3% on 13-Sep — combined 11/36 = 30.6%.
- [ ] **Check late scratchings before bets are placed** — R8 #5 was scratched after the report said "0 scratchings" (no impact this time).

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | — | — | — | — | — | — |
| MEDIUM-HIGH | R2 | 0/1 | $100 | $0 | −$100 | −100.0% |
| MEDIUM | R1, R8 | 0/2 | $310 | $0 | −$310 | −100.0% |
| MEDIUM-LOW | R3, R4, R6, R7 | 0/4 | $340 | $0 | −$340 | −100.0% |
| LOW-MEDIUM | R5 | 0/1 | $100 | $0 | −$100 | −100.0% |
| **TOTAL** | **8** | **0/8** | **$850** | **$0** | **−$850** | **−100.0%** |

No tier produced a hit, so confidence labels carried no information this card. The 13-Sep "PASS on LOW" rule would have skipped nothing here (no race was rated plain LOW). R2 — the only MEDIUM-HIGH — was the most accurate race on the card (banker won, 2nd was a pool leg) and lost to a 90-1 shot.

## Section 10: Running Total (Season Cumulative)

### 10a. Meeting-by-Meeting P&L

| Meeting | Date | Venue | Races | Hits | Staked | Returned | P&L | ROI |
|---------|------|-------|-------|------|--------|----------|-----|-----|
| 1 | 2026-09-06 | ST | 9 | 2 | $870 | $791 | −$79 | −9.1% |
| 2 | 2026-09-09 | HV | 8 | 0 | $640 | $0 | −$640 | −100.0% |
| 3 | 2026-09-13 | ST | 10 | 1 | $870 | $476 | −$394 | −45.3% |
| **4** | **2026-09-16** | **HV** | **8** | **0** | **$850** | **$0** | **−$850** | **−100.0%** |
| **TOTAL** | | | **35** | **3** | **$3,230** | **$1,267** | **−$1,963** | **−60.8%** |

> The 06-Sep internal inconsistency carried forward from prior reviews (§10a 6 races / 1 hit / $700 vs §10e 9 races / 2 hits / $870) is **still unreconciled**; §10e figures are used.

### 10b. Cross-Meeting Banker Performance

| Meeting | Banker Top 3 | Rate |
|---------|--------------|------|
| 2026-09-06 ST | 3/9 | 33.3% |
| 2026-09-09 HV | 4/8 | 50.0% |
| 2026-09-13 ST | 3/10 | 30.0% |
| **2026-09-16 HV** | **6/8** | **75.0%** |
| **Combined** | **16/35** | **45.7%** |

### 10c. Venue Breakdown

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
|-------|----------|-------|------|--------|----------|-----|-----|--------------|
| Sha Tin | 2 | 19 | 3 | $1,740 | $1,267 | −$473 | −27.2% | 6/19 (31.6%) |
| **Happy Valley** | **2** | **16** | **0** | **$1,490** | **$0** | **−$1,490** | **−100.0%** | **10/16 (62.5%)** |

**The venue split is inverted:** HV has the better bankers (62.5% vs 31.6%) and zero hits; ST has poor bankers and all three hits. At HV the problem is the pool, at ST it is the banker.

### 10d. Season Trajectory

| Metric | 09-06 (M1) | 09-09 (M2) | 09-13 (M3) | **09-16 (M4)** | Trend |
|--------|------------|------------|------------|----------------|-------|
| Hit rate (meeting) | 22.2% | 0.0% | 10.0% | **0.0%** | ↓ |
| Cumulative P&L | −$79 | −$719 | −$1,113 | **−$1,963** | ↓↓ |
| Cumulative ROI | −9.1% | −47.6% | −46.8% | **−60.8%** | ↓ |
| Banker top 3 (meeting) | 33.3% | 50.0% | 30.0% | **75.0%** | ↑↑ |
| Banker top 3 (cumulative) | 33.3% | 41.2% | 37.0% | **45.7%** | ↑ |

### 10e. Cumulative A/B Comparison

| Meeting | Date | Venue | A Hits | A P&L | A ROI | B Hits | B P&L | B ROI | Winner |
|---------|------|-------|--------|-------|-------|--------|-------|-------|--------|
| 1 | 2026-09-06 | ST | 2/9 | −$79 | −9.1% | 2/9 | −$109 | −12.1% | A |
| 2 | 2026-09-09 | HV | 0/8 | −$640 | −100.0% | 0/8 | −$800 | −100.0% | Tie |
| 3 | 2026-09-13 | ST | 1/10 | −$394 | −45.3% | 1/10 | −$524 | −52.4% | A |
| **4** | **2026-09-16** | **HV** | **0/8** | **−$850** | **−100.0%** | **0/8** | **−$800** | **−100.0%** | **B** (stake only) |
| **TOTAL** | | | **3/35** | **−$1,963** | **−60.8%** | **3/35** | **−$2,233** | **−63.8%** | **A** |

*B = review-spec Strategy B (MC top 6, 1膽+5腳, $100 flat). B-trio (as bet) this meeting: **2/8, −$397, −43.6%** — see §11.*

| Cumulative Metric | Strategy A | Strategy B (review-spec) | Delta (B − A) |
|-------------------|-----------|--------------------------|---------------|
| Total meetings | 4 | 4 | — |
| Total races | 35 | 35 | 0 |
| Hits (rate) | 3/35 (8.6%) | 3/35 (8.6%) | 0 |
| Total staked | $3,230 | $3,500 | +$270 |
| Total returned | $1,267 | $1,267 | $0 |
| **Cumulative P&L** | **−$1,963** | **−$2,233** | **−$270** |
| **Cumulative ROI** | **−60.8%** | **−63.8%** | **−3.0 pp** |
| Banker top 3 rate | 16/35 (45.7%) | 16/35 (45.7%) | 0 |

Four meetings in, the season stands at **−$1,963 / −60.8%**. This card was the worst result so far despite the best banker performance, which moves the diagnosis: **on HV cards the pool is too narrow, on ST cards the banker is wrong.** A and review-spec B are still indistinguishable on selection (identical pools and bankers in 7 of 8 races here) and differ only in stake. The one variant that separated from the pack this meeting was **B-trio**, and only because of its market-odds inclusion rule. That rule, plus "don't bank MC #1 at market rank ≥ 4", is where the next backtest should go.

## Section 11: A/B Strategy Comparison

### 11a. Strategy B derivation

> **Naming collision still unresolved:** review-spec **B** = MC top 6 by raw Win%, banker MC #1, 1膽+5腳, $100 flat. The trio-strategy skill's own Strategy B (**B-trio**) = banker MC #1, legs = MC Place% > 20% plus Win-odds < 10 swap/add, variable stake. B-trio is what the reports priced.

| Race | MC top-6 pool (Win% order) | B Banker | B-trio pool | B-trio stake |
|------|----------------------------|----------|-------------|--------------|
| R1 | 2, 9, 11, 4, 7, 10 | #2 | 2, 9, 11, 4, 7 | $60 |
| R2 | 3, 11, 5, 9, 8, 7 | #3 | 3, 11, 5, 9, 8, 2 | $100 |
| R3 | 8, 6, 3, 1, 5, 10 | #8 | 8, 6, 3, 1, 5, 10 | $100 |
| R4 | 3, 2, 1, 4, 5, 12 | #3 | 3, 2, 1, 4, 5, 12, 11 | $150 |
| R5 | 7, 6, 5, 10, 9, 11 | #7 | 7, 6, 5, 10, 9, 11, 8 | $150 |
| R6 | 1, 8, 12, 6, 10, 3 | #1 | 1, 8, 12, 6, 10, 3, 2 | $150 |
| R7 | 1, 5, 4, 8, 3, 2 | #1 | 1, 5, 4, 8, 3, 10 | $100 |
| R8 | 12, 1, 7, 11, 6, 4 | #12 | 12, 1, 7, 11, 6, 8 | $100 |

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | A Banker | Strat B Pool (MC top 6) | B Banker (MC #1) | Result (1→2→3) | A Hit? | B Hit? | B-trio Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|--------------|----------|-------------------------|------------------|----------------|--------|--------|-------------|--------|----------|----------|---------|---------|----------------|
| R1 | 2,9,11,4,7,10 | #2 | 2,9,11,4,7,10 | #2 | 11→12→6 | ❌ | ❌ | ❌ | $1,674 | $0 | $0 | $100 | $100 | **Identical pool and banker** |
| R2 | 3,11,5,9,7,8 | #3 | 3,11,5,9,8,7 | #3 | 3→8→4 | ❌ | ❌ | ❌ | $3,312 | $0 | $0 | $100 | $100 | **Identical pool and banker** |
| R3 | 8,6,1,3,5,10 | #8, #6 | 8,6,3,1,5,10 | #8 | 7→6→10 | ❌ | ❌ | ❌ | $380 | $0 | $0 | $40 | $100 | Same 6; A 雙膽拖 (4 combos) saved $60 |
| R4 | 3,2,1,4,5,12 | #3 | 3,2,1,4,5,12 | #3 | 3→11→12 | ❌ | ❌ | **✅** | $315 | $0 | $0 | $100 | $100 | Identical; **B-trio added #11 (8.1) and hit** |
| R5 | 7,6,5,10,9,11 | #7 | 7,6,5,10,9,11 | #7 | 6→4→7 | ❌ | ❌ | ❌ | $315 | $0 | $0 | $100 | $100 | **Identical pool and banker** |
| R6 | 1,12,8,10,6,3 | #1 | 1,8,12,6,10,3 | #1 | 2→1→10 | ❌ | ❌ | **✅** | $198 | $0 | $0 | $100 | $100 | Identical; **B-trio added #2 (8.0) and hit** |
| R7 | 1,5,4,8,3,2 | #1 | 1,5,4,8,3,2 | #1 | 4→11→1 | ❌ | ❌ | ❌ | $1,154 | $0 | $0 | $100 | $100 | **Identical pool and banker** |
| R8 | 12,1,7,11,6,4,9,8 | #12 | 12,1,7,11,6,4 | #12 | 12→3→4 | ❌ | ❌ | ❌ | $2,356 | $0 | $0 | $210 | $100 | A +#9, #8 via Rule 8 (+$110); both missed #3 |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) | B-trio (as bet) |
|--------|----------------------------|-----------------------|---------------|-----------------|
| Races played | 8 | 8 | 0 | 8 |
| Hits | 0/8 (0.0%) | 0/8 (0.0%) | 0 | **2/8 (25.0%)** |
| Total staked | $850 | $800 | −$50 | $910 |
| Total returned | $0 | $0 | $0 | $513 |
| **Net P&L** | **−$850** | **−$800** | **+$50** | **−$397** |
| **ROI** | **−100.0%** | **−100.0%** | **0.0 pp** | **−43.6%** |
| Banker top 3 rate | 6/8 (75.0%) | 6/8 (75.0%) | 0 | 6/8 (75.0%) |
| Combinations | 85 | 80 | −5 | 91 |

### 11d. Where A and B Diverged

| Race | What Differed | A Result | B Result | Impact | Root cause |
|------|---------------|----------|----------|--------|------------|
| R3 | Structure: A 雙膽拖 #8+#6 (4 combos) vs B 膽拖 #8 (10) | MISS ❌ | MISS ❌ | **A +$60** (smaller losing stake) | Banker-2 rule fired at Adj Place% 70.1%; #6 placed, #8 didn't |
| R8 | Pool: A 8 horses (+#9, #8 via Rule 8) vs B 6 | MISS ❌ | MISS ❌ | **A −$110** | Rule 8 at 20% pulled in #9 (21.2%) and #8 (20.2%); neither placed |
| R4, R6 | vs **B-trio**: Win-odds < 10 add | MISS ❌ | B-trio **HIT ✅** | **B-trio +$513** | A's Adj Place% (15.7%, 15.3%) ignores price |

**The SCMP/jockey layer did not change a single banker or pool membership** versus raw MC top 6. A and review-spec B differ only by Rule 8 width (R8) and 雙膽拖 (R3).

### 11e. Session Verdict

**Review-spec B beat A by $50 (−$800 vs −$850) on stake alone; both went 0/8 with the same horses. B-trio beat both by ~$400–450** with the same bankers and near-identical pools, thanks to one rule: *add any horse under 10 in the market*. That is **systematic, not variance** — it is the second meeting running where a market-price inclusion would have rescued a race (13-Sep: R3 #10, R6 #5, R8 #10, R9 #1 were all market top 3 and excluded). The one A-only rule that saved money was 雙膽拖 in R3 (+$60); the one that cost was Rule 8 over-widening R8 (−$110 on horses that finished 4th and 11th) while still missing the 19.4% horse that ran 2nd.
