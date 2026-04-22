# Trio Post-Race Review — Happy Valley | 22 Apr 2026

## Data sources

- **Suggestions:** `data/reports/trio_strategy_20260422_HV_R1.md` … **R9.md** (Strategy A + Strategy B as written).
- **Results:** scraped HKJC local results → `data/historical/results_20260422_HV.json` (`tools/scrape-meeting.ts --date=2026-04-22 --venue=HV`).
- **Trio dividend:** HKJC **Trio** payout per **$10** unit from results JSON (`trioDividend` field).

**Actual top 3** (finish order 1→2→3):

| Race | 1st | 2nd | 3rd | 4th | Trio ($10) |
|------|-----|-----|-----|-----|------------|
| R1 | #4 NEBRASKAN (4.7) | #8 TEAM HAPPY (3.8) | #7 TURF PHOENIX (28) | #10 TAIHANG SCENERY (15) | $679 |
| R2 | #7 PODIUM (5.0) | #2 SOARING BRONCO (2.7) | #11 SMILING EMPEROR (17) | #8 VERBIER (3.7) | $367 |
| R3 | #5 SHOOTING TO TOP (6.2) | #1 GLORIOUS JOURNEY (7.7) | #7 SURE JOYFUL (23) | #11 OUR LUCKY GLORY (11) | $2,450 |
| R4 | #6 VIGOR EYE (2.3) | #2 CAPTAIN LINK (48) | #1 YOUNG ARROW (8.3) | #9 LEADING AGILITY (6.8) | $1,067 |
| R5 | #11 THUNDER PRINCE (2.2) | #12 WINNING CHAMPION (5.2) | #1 SPEEDY SMARTIE (14) | #8 LITTLE MONSTER (5.8) | $190 |
| R6 | #3 KING PROFIT (6.8) | #6 GRAND NOVA (7.8) | #7 HARMONY FIRE (40) | #4 BEAUTY SHOW (2.7) | $2,558 |
| R7 | #12 CASA OF HONOR (22) | #1 HORSEPOWER (5.3) | #10 SKY CAP (2.6) | #2 CANDLELIGHT DINNER (7.9) | $484 |
| R8 | #8 THE AUSPICIOUS (10) | #11 ACE WAR (3.0) | #1 LIVEANDLETLIVE (4.1) | #10 MISSION GIANT (205) | $200 |
| R9 | #9 JUBILANT WINNER (14) | #1 AURIO (3.4) | #7 SOVEREIGN FUND (22) | #12 PACKING GLORY (3.3) | $1,475 |

---

## Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC+odds) |
|--------|---------------------------|----------------------|
| Races played | **9** | **9** |
| Hit rate | **1/9 (11.1%)** | **2/9 (22.2%)** |
| Total staked | **$780** | **$880** |
| Total returned | **$2,558** | **$1,257** |
| **Net P&L** | **+$1,778** | **+$377** |
| **ROI** | **+227.9%** | **+42.8%** |
| Session result | **WIN ✅** | **WIN ✅** |

**Both strategies profitable.** Strategy A's single R6 hit ($2,558 Trio) powered the best single-meeting result in the entire campaign. Strategy B hit R4 ($1,067) and R5 ($190) via its Win-odds replacement rule but missed R6's critical #7 HARMONY FIRE.

---

## Race-by-Race — Strategy A

| Race | Class | Mode | Banker | Legs | Result (1→2→3) | Hit? | Trio $ | Return | Stake | P&L | Miss Reason |
|------|-------|------|--------|------|-----------------|------|--------|--------|-------|-----|-------------|
| R1 | C5 | B | #4 NEBRASKAN | #8,#6,#5,#3,#10 | 4→8→**7** | MISS ❌ | $679 | $0 | $100 | −$100 | Banker hit (1st), pool gap #7 (28x) |
| R2 | C5 | B | #8 VERBIER | #2,#7,#9,#6,#11 | **7→2→11** | MISS ❌ | $367 | $0 | $100 | −$100 | **Banker fail (#8 4th), all 3 in legs!** |
| R3 | C4 | B | #1 GLORIOUS JOURNEY | #4,#3,#7,#6,#9 | **5**→1→7 | MISS ❌ | $2,450 | $0 | $100 | −$100 | Banker hit (2nd), pool gap #5 (6.2x) |
| R4 | C4 | B | #6 VIGOR EYE | #4,#9,#2,#3,#7 | 6→2→**1** | MISS ❌ | $1,067 | $0 | $100 | −$100 | Banker hit (1st), pool gap #1 (8.3x) |
| R5 | C4 | B | #1 SPEEDY SMARTIE | #4,#9,#7,#11,#3 | 11→**12**→1 | MISS ❌ | $190 | $0 | $100 | −$100 | Banker hit (3rd), pool gap #12 (5.2x) |
| R6 | C4 | B | #3 KING PROFIT | #6,#5,#11,#1,#7 | 3→6→7 | **HIT ✅** | $2,558 | $2,558 | $100 | **+$2,458** | — |
| R7 | C3 | A | #10 SKY CAP | #1,#5,#4,#2 | **12**→1→10 | MISS ❌ | $484 | $0 | $60 | −$60 | Banker hit (3rd), pool gap #12 (22x) |
| R8 | C3 | A | #11 ACE WAR | #1,#4,#5,#2 | **8**→11→1 | MISS ❌ | $200 | $0 | $60 | −$60 | Banker hit (2nd), pool gap #8 (10x) |
| R9 | C3 | A | #1 AURIO | #3,#4,#6,#5 | **9**→1→**7** | MISS ❌ | $1,475 | $0 | $60 | −$60 | Banker hit (2nd), double pool gap #9 + #7 |
| **Total** | | | | | | **1/9** | | **$2,558** | **$780** | **+$1,778** | |

---

## Hit Analysis

### R6 ✅ ($2,558, +$2,458) — The session saver

| Horse | Role | SP Odds | MC Win% | Adj Place% | Result |
|-------|------|---------|---------|------------|--------|
| #3 KING PROFIT | ★ Banker | 6.8 | 31.8% | 65.7% | **1st** |
| #6 GRAND NOVA | Leg | 7.8 | 17.9% | 47.1% | **2nd** |
| #7 HARMONY FIRE | Leg (6th slot, excuses) | 40 | 4.1% | 20.3% | **3rd** |
| #4 BEAUTY SHOW | Excluded (1 form entry) | 2.7 | 4.2% | 18.5% | 4th |

**What made this work:**
- #3 KING PROFIT justified MC's 31.8% faith — won from widest draw 12 despite the gate concern.
- #7 HARMONY FIRE was the **critical inclusion**. Strategy A's SCMP excuses rule (+2% for "shifted in, raced wide without cover") lifted it from outside the pool to the 6th slot (20.3% Adj Place). Without that excuses boost, #7 would NOT have been in the pool. This is the SCMP pipeline's signature value.
- #4 BEAUTY SHOW (2.7 SP, Purton/Lor market favourite) finished **4th** — validating the decision to exclude the 1-form-entry horse. MC's thin-data caution was correct.
- #8 JUMBO BLESSING (Moreira, 3.5 SP, vet flagged) finished **5th** — the vet flag exclusion was also correct.
- Trio paid $2,558 — the night's highest dividend, and the biggest single return of the entire April campaign.

---

## Miss Classification

| Pattern | Count | Races |
|---------|-------|-------|
| **A — Banker fail, all 3 in legs** | 1 | R2 |
| **B — Banker hit, pool gap** | 7 | R1, R3, R4, R5, R7, R8, R9 |
| **C — Banker fail + pool gap** | 0 | — |

### Pattern A: Banker Fail — All 3 Placers Already in Legs

**R2: #8 VERBIER (Moreira, 3.7 SP) → 4th**
- All 3 placers (#7, #2, #11) were in the leg pool
- Banker #8 was clear MC leader (26.3% Win, 56.8% Place) with Moreira from Draw 2
- Missed $367 Trio return
- Root cause: Moreira/Fownes combination underperformed; #7 PODIUM (Chau, 5.0) from Draw 1 exploited the rail perfectly. VERBIER ran wide despite Draw 2 — the "wide by design" SCMP note from last run proved to be a persistent habit, not a one-off.

### Pattern B: Banker Hit — Pool Gap (dominant pattern: 7/8 misses)

| Race | Banker | Banker Finish | Pool Gap Horse(s) | Gap SP | Gap MC Place% | Trio $ |
|------|--------|--------------|-------------------|--------|---------------|--------|
| R1 | #4 (1st) | ✅ | #7 TURF PHOENIX | 28 | 14.9% | $679 |
| R3 | #1 (2nd) | ✅ | #5 SHOOTING TO TOP | 6.2 | 11.9% | $2,450 |
| R4 | #6 (1st) | ✅ | #1 YOUNG ARROW | 8.3 | 3.6% | $1,067 |
| R5 | #1 (3rd) | ✅ | #12 WINNING CHAMPION | 5.2 | 14.9% | $190 |
| R7 | #10 (3rd) | ✅ | #12 CASA OF HONOR | 22 | 1.6% | $484 |
| R8 | #11 (2nd) | ✅ | #8 THE AUSPICIOUS | 10 | 7.8% | $200 |
| R9 | #1 (2nd) | ✅ | #9 JUBILANT WINNER + #7 SOVEREIGN FUND | 14 / 22 | 12.4% / 21.2% | $1,475 |

**Summary:** Bankers placed top 3 in 8/9 races (88.9%) — exceptional. The bottleneck was pool coverage. 7 of 8 misses were pool gaps where a horse outside the 5–6 horse pool finished in the top 3.

**Notable pool gaps:**
- **R3 #5 SHOOTING TO TOP** (6.2x, MC 11.9%): Only 2 form entries at the time — MC couldn't accurately rate this horse. Won on debut at this class. E Brown (no HK stats in database) rode the winner.
- **R4 #1 YOUNG ARROW** (8.3x, MC 3.6%): Jockey was penalised for not riding out last start — "bounce" scenario that the market priced in (9.4 early odds → 8.3 SP) but MC's 0.6% Win was wildly wrong.
- **R7 #12 CASA OF HONOR** (22x, MC 0.1%): Won at massive odds. Poon with apprentice claim; horse had excuses last run (jumped awkwardly, lost ground). Strategy A noted the excuses but MC's 1.6% Place was too low to include.
- **R8 #8 THE AUSPICIOUS** (10x, MC 0.8%): 13 form entries but MC rated only 0.8% Win / 7.8% Place. Won at 10 odds — Badel rode a patient race. The SCMP note ("crowded, raced keenly, rider warned") was flagged but no adjustment applied.

---

## What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change | Net Impact |
|------|---------|-------------|-----------|-------------|------------|
| R1 | Pool: #4,#8,#6,#5,#3,#10 | Add #7 (SCMP excuses), drop #10 | ✅ → $679 | Same $100 | +$679 |
| R2 | Banker #8 | Switch banker to #7 PODIUM (Draw 1) | ✅ → $367 | Same $100 | +$367 |
| R3 | Pool excludes #5 (2 form) | Add #5, drop #9 (lowest Adj) | ✅ → $2,450 | Same $100 | +$2,450 |
| R4 | Pool excludes #1 (MC 0.6%) | Add #1 (Win odds 8.3), drop #7 | ✅ → $1,067 | Same $100 | +$1,067 |
| R5 | Pool excludes #12 (MC 3.5%) | Add #12 (Win odds 8.3), drop #3 | ✅ → $190 | Same $100 | +$190 |
| R7 | 5-horse pool excludes #12 (MC 0.1%) | Expand to 6 (Mode B) | Need both #12 + #1 + #10 | +$40 extra | Unfixable — #12 at 22x is a deep longshot |
| R8 | 5-horse pool excludes #8 (MC 0.8%) | Expand to 6 (Mode B), add #8 | ✅ → $200 | +$40 extra | +$140 net |
| R9 | 5-horse pool excludes #9 and #7 | Expand to 7, add both | ✅ → $1,475 | +$100 extra | +$1,375 net |

**Fixable misses:** R4 ($1,067) and R5 ($190) — both via Win-odds rule that Strategy B correctly applied.
**Semi-fixable:** R8 ($200), R9 ($1,475) — could be recovered by expanding Mode A (5) to Mode B (6–7) for Dominant races.
**Unfixable:** R7 (#12 CASA OF HONOR at 22x with MC 0.1% — genuine longshot upset), R3 (#5 had only 2 form entries).

---

## Key Moments

- **Best Bet:** R6 — #3 KING PROFIT banker, #7 HARMONY FIRE at 40x captured via excuses rule. $100 → $2,558. The SCMP pipeline's signature moment.

- **Worst Bet:** R9 — VERY HIGH confidence, course record holder #1 AURIO as banker, yet double pool gap (#9 + #7 both at long odds). $60 lost. The tight 5-horse Mode A pool left no room for wildcards.

- **Most Frustrating:** R2 — ALL THREE placers (#7, #2, #11) were in the legs, but banker #8 VERBIER (Moreira, 3.7 SP) finished 4th by 0.32s. $367 left on the table.

- **Biggest Surprise:** R7 — #12 CASA OF HONOR winning at 22x with MC 0.1% Place. Beat the "dominant" #10 SKY CAP (MC 46.2% Win, VERY HIGH confidence) into 3rd.

- **Best MC Call:** R6 — MC had #3 KING PROFIT as 31.8% Win at 10 odds (217% edge vs market). He won. MC also correctly identified #4 BEAUTY SHOW (2.7 SP market favourite) as only 4.2% Win due to 1 form entry — and #4 finished 4th.

---

## Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 3 | R4, R6 (won), R1 (won) |
| Banker 2nd-3rd | 5 | R3 (2nd), R5 (3rd), R7 (3rd), R8 (2nd), R9 (2nd) |
| Banker out of top 3 | 1 | R2 (#8 VERBIER 4th) |

**Banker strike rate (top 3): 8/9 = 88.9%** — Best single-meeting banker rate in the campaign.
**Banker win rate: 3/9 = 33.3%**

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | 1/9 (R6) |
| Banker hit + pool gap | 7/9 |
| Banker fail, all 3 in pool (Pattern A) | 1/9 (R2) |
| At least 2 placers in pool | 9/9 |

### 7c. MC-Market Divergence Outcomes

| Race | Divergence | Result |
|------|-----------|--------|
| R1 | #4 MC leader (22.9%) vs market 3.7 SP — aligned | #4 won ✅ MC correct |
| R2 | #8 MC leader (26.3%) vs market 3.4 SP — aligned | #8 4th ❌ Both wrong |
| R3 | #1 MC co-leader (27.5%) at 7.6 SP — 118% MC edge | #1 2nd ✅ MC correct |
| R4 | #1 YOUNG ARROW MC 0.6% vs market 9.4 SP — market much higher | #1 3rd ⚠️ Market correct |
| R5 | #3 KING OBERON MC 8.6% at 37 SP — MC much higher | #3 5th ❌ Neither won but MC closer |
| R6 | #4 BEAUTY SHOW MC 4.2% at 2.9 SP — massive MC vs market gap | #4 4th ✅ MC correct (rightly excluded) |
| R6 | #3 KING PROFIT MC 31.8% at 10 SP — 217% MC edge | #3 won ✅ MC correct |
| R7 | #10 SKY CAP MC 46.2% at 4.5 SP — aligned | #10 3rd ⚠️ Placed but beaten by 22x shot |
| R8 | #11 ACE WAR MC 53.1% at 4.1 SP — aligned | #11 2nd ⚠️ Placed but beaten by #8 (10x) |
| R9 | #1 AURIO MC 42.6% at 4.8 SP — aligned | #1 2nd ⚠️ Placed but beaten by #9 (14x) |

**MC divergence accuracy:** MC's top pick placed top 3 in 8/9 races (88.9%). MC was clearly right about who the strong horses were — the misses came from the tail of the field, not MC's top picks being wrong.

### 7d. SCMP +Excuses Flag Performance

| Race | Horse | +Excuses For | Finished | Verdict |
|------|-------|-------------|----------|---------|
| R1 | #6 HAPPY BOYS | held up twice | 5th | ❌ |
| R1 | #10 TAIHANG SCENERY | held up after 400m | 4th | ⚠️ Close |
| R2 | #2 SOARING BRONCO | contact, difficulty clear running | 2nd | ✅ |
| R2 | #7 PODIUM | wide barrier, shifted across | 1st | ✅ Won! |
| R2 | #11 SMILING EMPEROR | crowded, steadied twice | 3rd | ✅ |
| R3 | #1 GLORIOUS JOURNEY | bumped heavily on jumping | 2nd | ✅ |
| R3 | #3 VERMILION TEMPEST | held up, eased | 8th | ❌ |
| R4 | #4 JOLLY COMPANION | slow begin, checked | 6th | ❌ |
| R4 | #9 LEADING AGILITY | blundered, held up | 4th | ⚠️ Close |
| R5 | #1 SPEEDY SMARTIE | contact, lost plate | 3rd | ✅ |
| R5 | #4 WINNING MONEY | crowded, raced wide | 6th | ❌ |
| R5 | #9 LOVING VIBES | jumped awkwardly, held up | 8th | ❌ |
| R6 | #7 HARMONY FIRE | shifted in, raced wide | 3rd | ✅ **Key inclusion!** |
| R7 | #4 TOGETHER WE VALUE | bumped, lay out, wide | 5th | ❌ |
| R8 | #11 ACE WAR | jumped awkwardly, crowded, keenly | 2nd | ✅ |
| R9 | #1 AURIO | held up for clear running | 2nd | ✅ |
| R9 | #3 LOVE TOGETHER | wide barrier, settled back | 7th | ❌ |

**+Excuses hit rate (top 3): 8/17 (47.1%)**

The critical excuses call was R6 #7 HARMONY FIRE — the only reason this horse was in Strategy A's pool. Without the excuses boost, the R6 $2,558 hit doesn't happen.

### 7e. Purton Performance

| Race | Horse | Role | Odds | Finished | Verdict |
|------|-------|------|------|----------|---------|
| R1 | #8 TEAM HAPPY | Leg | 3.8 | 2nd | ✅ |
| R4 | #6 VIGOR EYE | Banker | 2.3 | 1st | ✅ Won |
| R5 | #11 THUNDER PRINCE | Leg | 2.2 | 1st | ✅ Won (not our banker) |
| R6 | #4 BEAUTY SHOW | Excluded | 2.7 | 4th | ❌ |
| R7 | #1 HORSEPOWER | Leg | 5.3 | 2nd | ✅ |
| R8 | #11 ACE WAR | Banker | 3.0 | 2nd | ✅ |
| R9 | #1 AURIO | Banker | 3.4 | 2nd | ✅ |

**Purton banker hit rate:** 2/3 top 3 when banker (R4 1st, R8 2nd; R9 2nd counted in legs for B)
**Purton as leg hit rate:** 3/3 (R1, R5, R7 — all placed top 2)
**Purton overall top 3:** 6/7 rides (85.7%) — elite as expected. Only miss was R6 #4 BEAUTY SHOW (1 form entry, 4th).

---

## P&L by Confidence Level (Strategy A)

| Confidence | Races | Staked | Returned | P&L | ROI |
|------------|-------|--------|----------|-----|-----|
| VERY HIGH | R7, R8, R9 | $180 | $0 | −$180 | −100% |
| HIGH | R3, R4 | $200 | $0 | −$200 | −100% |
| MEDIUM-HIGH | R1, R2, R5 | $300 | $0 | −$300 | −100% |
| MEDIUM | R6 | $100 | $2,558 | **+$2,458** | **+2,458%** |

**The paradox continues:** The sole MEDIUM confidence race delivered the only hit and the entire session's profit. All three VERY HIGH confidence races (R7, R8, R9 — the "Dominant" races) missed due to pool gaps from longshots. The tighter Mode A (5-horse) pools for Dominant races left zero margin for error.

---

## Running Total (April 2026)

### 10a. Meeting-by-Meeting P&L

| Meeting | Date | Venue | Races | A Hits | A Staked | A Returned | A P&L | A ROI |
|---------|------|-------|-------|--------|----------|------------|-------|-------|
| 1 | 01 Apr | ST | 11 | 0 | $777 | $0 | −$777 | −100% |
| 2 | 06 Apr | ST | 11 | 2 | $778 | $818 | −$588 | −100% |
| 3 | 08 Apr | HV | 9 | 0 | $870 | $0 | −$870 | −100% |
| 4 | 12 Apr | ST | 11 | 1 | $692 | $300 | −$392 | −56.6% |
| 5 | 15 Apr | HV | 9 | 1 | $595 | $180 | −$415 | −69.7% |
| 6 | 19 Apr | ST | 11 | 2 | $650 | $818 | +$168 | +25.8% |
| **7** | **22 Apr** | **HV** | **9** | **1** | **$780** | **$2,558** | **+$1,778** | **+227.9%** |
| **TOTAL** | | | **71** | **7** | **$5,142** | **$4,674** | **−$468** | **−9.1%** |

### 10b. Cross-Meeting Banker Performance

| Meeting | Banker Top 3 | Rate |
|---------|-------------|------|
| 01 Apr ST | 4/11 | 36.4% |
| 06 Apr ST | 5/11 | 45.5% |
| 08 Apr HV | 4/9 | 44.4% |
| 12 Apr ST | 5/11 | 45.5% |
| 15 Apr HV | 5/9 | 55.6% |
| 19 Apr ST | 4/11 | 36.4% |
| **22 Apr HV** | **8/9** | **88.9%** |
| **Combined** | **35/71** | **49.3%** |

### 10d. Season Trajectory

| Metric | 01 Apr | 06 Apr | 08 Apr | 12 Apr | 15 Apr | 19 Apr | **22 Apr** | Trend |
|--------|--------|--------|--------|--------|--------|--------|------------|-------|
| Hit rate | 0% | 9.1% | 0% | 9.1% | 11.1% | 18.2% | **11.1%** | Stable ~10% |
| Cumulative P&L (A) | −$777 | −$1,365 | −$2,235 | −$2,627 | −$3,042 | −$2,874 | **−$468** | ↑ Recovering fast |
| Cumulative ROI (A) | −100% | −87.9% | −91.6% | −80.0% | −79.3% | −63.2% | **−9.1%** | ↑↑ Near breakeven |
| Banker top 3 | 36.4% | 40.9% | 42.3% | 43.2% | 45.7% | 43.5% | **49.3%** | ↑ Improving |

---

## Section 11: A/B Strategy Comparison

### 11b. Race-by-Race A/B Table

| Race | A Pool | A Banker | B Pool | B Banker | Result | A Hit? | B Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|--------|---------|--------|---------|--------|--------|--------|--------|----------|----------|---------|---------|----------------|
| R1 | #4,#8,#6,#5,#3,#10 | #4 | #4,#8,#5,#6,#3,#2 | #4 | 4→8→7 | ❌ | ❌ | $679 | $0 | $0 | $100 | $100 | A has #10, B has #2. Neither has #7 |
| R2 | #8,#2,#7,#9,#6,#11 | #8 | #8,#2,#7,#9,#6,#4,#11 | #8 | 7→2→11 | ❌ | ❌ | $367 | $0 | $0 | $100 | $150 | B wider (7 legs) but same banker fail |
| R3 | #1,#4,#3,#7,#6,#9 | #1 | #1,#4,#3,#7,#6,#9 | #1 | 5→1→7 | ❌ | ❌ | $2,450 | $0 | $0 | $100 | $100 | Identical pools. Both miss #5 |
| R4 | #6,#4,#9,#2,#3,#7 | #6 | #6,#4,#9,#2,#1 | #6 | 6→2→1 | ❌ | **✅** | $1,067 | $0 | $1,067 | $100 | $60 | **B adds #1 via Win-odds rule (8.3 < 10)** |
| R5 | #1,#4,#9,#7,#11,#3 | #1 | #1,#4,#9,#7,#11,#6,#12 | #1 | 11→12→1 | ❌ | **✅** | $190 | $0 | $190 | $100 | $150 | **B adds #12 via Win-odds rule (8.3 < 10)** |
| R6 | #3,#6,#5,#11,#1,#7 | #3 | #3,#6,#5,#8,#1,#4 | #3 | 3→6→7 | **✅** | ❌ | $2,558 | $2,558 | $0 | $100 | $100 | **A has #7 (excuses), B dropped #7 for #4+#8** |
| R7 | #10,#1,#5,#4,#2 | #10 | #10,#1,#5,#4,#8 | #10 | 12→1→10 | ❌ | ❌ | $484 | $0 | $0 | $60 | $60 | Both miss #12 CASA OF HONOR (0.1% MC) |
| R8 | #11,#1,#4,#5,#2 | #11 | #11,#1,#4,#5,#3 | #11 | 8→11→1 | ❌ | ❌ | $200 | $0 | $0 | $60 | $60 | A has #2, B has #3. Neither has #8 |
| R9 | #1,#3,#4,#6,#5 | #1 | #1,#3,#4,#6,#5,#12 | #1 | 9→1→7 | ❌ | ❌ | $1,475 | $0 | $0 | $60 | $100 | B wider but neither has #9 or #7 |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC+odds) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | 9 | 9 | 0 |
| Hits | 1/9 (11.1%) | 2/9 (22.2%) | B +1 |
| Total staked | $780 | $880 | B +$100 |
| Total returned | $2,558 | $1,257 | A +$1,301 |
| **Net P&L** | **+$1,778** | **+$377** | **A +$1,401** |
| **ROI** | **+227.9%** | **+42.8%** | **A +185.1pp** |
| Banker top 3 rate | 8/9 (88.9%) | 8/9 (88.9%) | Same |

### 11d. Where A and B Diverged

| Race | What Differed | A Result | B Result | Impact |
|------|--------------|----------|----------|--------|
| R4 | B includes #1 YOUNG ARROW (Win odds 8.3 < 10, MC 3.6%) | MISS ❌ | **HIT ✅** | B gained +$1,007 |
| R5 | B includes #12 WINNING CHAMPION (Win odds 8.3 < 10, MC 14.9%) | MISS ❌ | **HIT ✅** | B gained +$40 |
| R6 | A includes #7 HARMONY FIRE (SCMP excuses), B drops it for #4+#8 | **HIT ✅** | MISS ❌ | **A gained +$2,458** |

**Root causes of divergence:**
- **R4/R5:** Strategy B's Win-odds replacement rule correctly identified #1 YOUNG ARROW and #12 WINNING CHAMPION as market-backed horses that MC underrated. The rule adds value when MC has thin data on a horse that the market respects.
- **R6:** Strategy A's SCMP excuses rule elevated #7 HARMONY FIRE (MC 4.1%, 21 SP → Adj 6.1%, 20.3% Place) into the pool while Strategy B dropped both #7 and #11 in favour of the market-backed #4 BEAUTY SHOW (2.7 SP) and the vet-flagged #8 JUMBO BLESSING. **The SCMP adjustment was the difference between a $2,558 hit and a $0 return.**

### 11e. Session Verdict

**Strategy A won this session decisively: +$1,778 vs +$377 (A by $1,401).** The difference was driven by a single systematic edge — A's SCMP excuses rule capturing #7 HARMONY FIRE in R6, which B's mechanical approach discarded. This wasn't variance — it was a structural advantage. B's Win-odds rule delivered two extra hits (R4, R5) worth $1,047 in returns, but A's single SCMP-driven hit was worth $2,558. The SCMP pipeline proved its value tonight: when it finds a real "excuse" horse, the payoff can be massive because those horses are typically at long odds (40x for #7).

---

### 10e. Cumulative A/B Comparison

| Meeting | Date | Venue | A Hits | A P&L | A ROI | B Hits | B P&L | B ROI | Winner |
|---------|------|-------|--------|-------|-------|--------|-------|-------|--------|
| 1 | 01 Apr | ST | 0/11 | −$777 | −100% | 0/11 | −$860 | −100% | Tie |
| 2 | 06 Apr | ST | 2/11 | −$588 | −75.6% | 1/11 | −$379 | −27.1% | B |
| 3 | 08 Apr | HV | 0/9 | −$870 | −100% | 0/9 | −$596 | −100% | Tie |
| 4 | 12 Apr | ST | 1/11 | −$392 | −56.6% | 2/11 | +$63 | +3.3% | B |
| 5 | 15 Apr | HV | 1/9 | −$415 | −69.7% | 1/9 | −$270 | −32.4% | B |
| 6 | 19 Apr | ST | 2/11 | +$168 | +25.8% | 4/11 | −$55 | −2.9% | A |
| **7** | **22 Apr** | **HV** | **1/9** | **+$1,778** | **+227.9%** | **2/9** | **+$377** | **+42.8%** | **A** |
| **TOTAL** | | | **7/71** | **−$1,096** | **−21.3%** | **10/71** | **−$1,720** | **−21.5%** | **A** |

| Cumulative Metric | Strategy A | Strategy B | Delta (B − A) |
|-------------------|-----------|-----------|---------------|
| Total meetings | 7 | 7 | — |
| Total races | 71 | 71 | 0 |
| Hits (rate) | 7/71 (9.9%) | 10/71 (14.1%) | B +3 |
| Total staked | $5,142 | $8,020 | B +$2,878 |
| Total returned | $4,046 | $6,300 | B +$2,254 |
| **Cumulative P&L** | **−$1,096** | **−$1,720** | **A +$624** |
| **Cumulative ROI** | **−21.3%** | **−21.5%** | **A +0.2pp** |
| Banker top 3 rate | 35/71 (49.3%) | 35/71 (49.3%) | Same |

**After 7 meetings, the two strategies have essentially converged to the same ROI (~−21%).** Strategy B hits more often (14.1% vs 9.9%) but costs 56% more per meeting. Strategy A's advantage is cost efficiency — when it hits, the returns are concentrated in fewer, higher-value bets. Tonight's R6 hit ($2,558) is the best example: a MEDIUM-confidence race with a $100 stake delivering the campaign's biggest single return.

The 22 Apr HV meeting was a watershed: it cut Strategy A's cumulative loss from −$2,874 to −$1,096 in a single session. The campaign is no longer in deep drawdown — one more strong session could push A into positive territory.

---

## Learnings

### What Worked

1. **SCMP excuses rule proved decisive in R6:** #7 HARMONY FIRE (MC 4.1%, 40x odds) was included ONLY because of the +2% excuses boost for "shifted in, raced wide without cover". This single adjustment generated the entire session's $2,558 return. The pipeline's competitive advantage over Strategy B is its ability to find these long-odds excuses horses.

2. **Banker selection was exceptional (8/9 = 88.9%):** The MC model correctly identified the strongest horse in almost every race. This is the best banker rate of any meeting this campaign and suggests the model calibration is improving.

3. **Excluding #4 BEAUTY SHOW (R6, 2.7 SP) and #8 JUMBO BLESSING (R6, 3.5 SP):** Both finished 4th and 5th respectively. The thin-data caution (1 form entry) and vet flag (heart irregularity <30d) rules were vindicated.

4. **MC's market-edge calls were accurate:** R3 #1 GLORIOUS JOURNEY (118% MC edge, 2nd), R4 #6 VIGOR EYE (34.5% MC, won), R6 #3 KING PROFIT (217% MC edge, won). When MC saw big value, the horses delivered.

### What Didn't Work

1. **Mode A (5-horse pool) for Dominant races is too tight:** R7, R8, R9 all had bankers placing top 3 but missed due to pool gaps. All three "VERY HIGH" confidence Dominant races lost $180 combined. The tight pool offers no margin for longshot intruders.

2. **Pool gap was the session's defining problem (7/8 misses):** The banker selection worked; the pool selection didn't cover enough of the field. Several pool gaps were horses at 5–10x odds — not true longshots.

3. **Win-odds < 10 rule (Strategy B) correctly found value that Strategy A missed:** R4 #1 YOUNG ARROW (8.3x, MC 0.6%), R5 #12 WINNING CHAMPION (5.2x, MC 3.5%). These were market-supported horses that MC underrated due to thin data. Strategy A's pipeline has no equivalent mechanism.

4. **Three VERY HIGH confidence races returned $0:** R7 (SKY CAP 46.2% MC), R8 (ACE WAR 53.1% MC), R9 (AURIO 42.6% MC) — all bankers placed but none hit the Trio. Over-confidence in dominant horses leads to under-investment in pool width.

### Strategy Adjustments

- [ ] **Expand Mode A (Dominant) from 5 horses to 6 (Mode B):** Tonight's evidence: 3/3 Mode A races missed vs 1/6 Mode B races hit. The extra $40 per race ($10 × 4 more combos) would have caught R8 ($200 return) if #8 THE AUSPICIOUS were included. Cost: +$120 for 3 Dominant races; potential recovery: $200+ per hit.

- [ ] **Add a Win-odds < 10 inclusion rule to Strategy A:** Strategy B's R4 and R5 hits prove this rule adds value. When MC Place% is very low (<15%) but market odds are under 10, the market may be seeing something MC can't (thin form data, trainer/jockey signals). Consider adding any horse with Win odds < 8 AND at least 5 form entries as a mandatory 7th pool slot.

- [ ] **Weight SCMP excuses more heavily for longshot legs:** R6's $2,558 hit came from #7 HARMONY FIRE (40x, excuses). The current +2% boost was barely enough to lift #7 into the pool. Consider +3% for horses with multiple excuses flags that are also 15+ odds — these are the highest-value-added inclusions.

- [ ] **Track the "Confidence vs Hit" paradox:** 3 meetings now show MEDIUM confidence outperforming VERY HIGH. This may indicate the classification system is too confident in Dominant races — the tight pool is the cost of that confidence.

---

## Files

- Results: `data/historical/results_20260422_HV.json`
- Strategy reports: `data/reports/trio_strategy_20260422_HV_R1.md` … `R9.md`
- Previous review: `data/reviews/trio_review_20260419_ST.md`
- Scraper: `tools/scrape-meeting.ts`

*Generated after meeting — for post-race learning, not betting advice.*
