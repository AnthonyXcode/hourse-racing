# Trio Post-Race Review — Happy Valley | 4 Mar 2026

## Summary

| Metric | Value |
|--------|-------|
| Races played | **9 (R1–R9)** |
| Hit rate | **2/9 (22.2%)** |
| Total staked | $1,050 |
| Total returned | $501 |
| **Net P&L** | **-$549** |
| **ROI** | **-52.3%** |
| Session Result | **LOSS** |

---

## Race-by-Race Cross-Reference

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|-----------------|------|--------|--------|-----|-------------|
| R1 | C5 1800m | C (1膽+6腳) | **#12** DRAGON SUNRISE | 4,7,1,3,2,9 | 7→9→**5** | MISS ❌ | $1 ⚠️ | $0 | -$150 | Banker fail + pool gap (#5 at 26x) |
| R2 | C5 1200m | B (1膽+5腳) | **#6** ONLY U | 10,3,2,5,4 | **11**→6→2 | MISS ❌ | $924 | $0 | -$100 | Pool gap (#11 at 6.3x) |
| R3 | C4 2200m | C (1膽+6腳) | **#6** ACE WAR | 2,1,11,3,9,4 | **6**→11→3 | **HIT** ✅ | $327 | $327 | +$177 | — |
| R4 | C4 1200m | B (1膽+5腳) | **#7** FLASH STAR | 2,12,8,3,4 | 12→2→4 | MISS ❌ | $133 | $0 | -$100 | Banker fail (all 3 in legs!) |
| R5 | C4 1200m | B (1膽+5腳) | **#5** GIANT BALLON | 10,4,2,6,12 | **5**→**1**→12 | MISS ❌ | $393 | $0 | -$100 | Pool gap (#1 at 8.6x, reserve) |
| R6 | C3 1200m | B (1膽+5腳) | **#2** SPORTS LEGEND | 7,3,8,9,4 | 3→7→4 | MISS ❌ | $524 | $0 | -$100 | Banker fail (all 3 in legs!) |
| R7 | C4 1650m | B (1膽+5腳) | **#1** RAGGA BOMB | 9,3,5,4,7 | 3→5→**1** | **HIT** ✅ | $174 | $174 | +$74 | — |
| R8 | C3 1200m | B (1膽+5腳) | **#1** LUCKY PLANET | 9,3,8,6,7 | 9→6→8 | MISS ❌ | $404 | $0 | -$100 | Banker fail (all 3 in legs!) |
| R9 | C3 1650m | B+ (1膽+6腳) | **#3** CORLEONE | 1,5,11,6,7,4 | 7→**9**→6 | MISS ❌ | $4 ⚠️ | $0 | -$150 | Banker fail + pool gap (#9 at 28x) |

⚠️ R1 Trio $1 and R9 Trio $4 appear to be scraping anomalies — actual HKJC dividends likely higher given the longshots involved.

---

## Hits Analysis (2 races)

### R3 HIT — Banker nailed it ✅
- #6 ACE WAR (banker) won at $2.8 — massive steam from 8.3→5.5→2.8 confirmed. Purton Elite boost + SCMP +trial ("flown through gallops") justified.
- #11 STAR BROSE (2nd, $5.3) and #3 DOUBLE WIN (3rd, $8.4) both legs in the 7-horse pool.
- MC ranked #6 at 26.1% Adj Win% — contrarian pick that the market eventually backed.
- 4th-placed #9 SMART CITY was also a leg. Near-perfect pool coverage.
- **Return: $327 on $150 stake = +$177**

### R7 HIT — Banker held on at 3rd ✅
- #3 CALIFORNIA MOXIE (Purton) won at $6.0 — the +excuses boost (kicked rail, jumped awkward) was spot-on.
- #5 GLORIOUS JOURNEY (2nd, $5.5) from gate 3 (Lor stable, +draw adjustment) ran as expected.
- #1 RAGGA BOMB (banker) was anchored by 135lb but held 3rd at $3.2 — as SCMP warned "big weight may anchor."
- This was our Rank #3 predicted combination (#1, #3, #5) — model accuracy validated.
- **Return: $174 on $100 stake = +$74**

---

## Miss Classification (7 races)

### Pattern A: Banker Fail — All 3 Placers Already in Legs (R4, R6, R8) — 3 misses

The most frustrating pattern. All three actual top-3 finishers were in our leg pool, but the banker didn't make top 3. The 膽拖 structure killed us.

- **R4**: Banker #7 FLASH STAR (MC #1 at 15.8%, 15 odds) finished 5th. Result: #12→#2→#4 — all legs.
  - Root cause: **Model error** — MC rated #7 as #1 (15.8% Adj Win% at 15 odds) but this was a pure MC contrarian pick. Market top 3 (#4 at 3.6, #3 at 4.5, #12 at 3.4) all placed. MC disagreed with market and was wrong.
  - Wide open race (top horse only 15.8%) → banker Adj Place% 43.1% was fragile.
  - **Missed Trio: $133**

- **R6**: Banker #2 SPORTS LEGEND (MC #1 at 26.1%, 3.0 odds, claim jockey Y L Chung) finished 9th. Result: #3→#7→#4 — all legs.
  - Root cause: **Model error** — MC rated the claim-jockey favourite as strong banker. #2 collapsed completely. All 3 result horses were ranked #3, #2, #6 in our model — the pool was perfect, the banker was wrong.
  - #3 SYMBOL OF STRENGTH (+excuses, Ferraris) won at $8.5.
  - **Missed Trio: $524**

- **R8**: Banker #1 LUCKY PLANET (MC #1 at 26.8%, front-runner, 135lb from gate 8) finished 6th. Result: #9→#6→#8 — all legs.
  - Root cause: **Model error** — MC overrated the top-weight front-runner. Pace was hot (as we predicted) and closers ran over the top. #9 AMAZING KID (MC's ★ BEST VALUE pick, undervalued 110%) won — the model's value identification was excellent but the banker was wrong.
  - **Missed Trio: $404**

**Root cause summary**: The model selects good pools (all 3 result horses included in 3/9 races as legs) but the 1st-ranked horse as banker is not reliable enough at HV. Banker Adj Place% ranged 43–61% in these failures — below the ~82% top-3 rate assumed in the skill.

---

### Pattern B: Banker Hit — Pool Gap (R2, R5) — 2 misses

Banker placed but an excluded horse also placed.

- **R2**: Banker #6 ONLY U placed 2nd (Purton). #2 CALL TO COMMAND (leg) came 3rd. But **#11 VERBIER won at $6.3 — not in pool**.
  - Root cause: **Pool miss** — #11 had MC ~3% (excluded) but market Place shortened from 3.7→2.4. At 14 HKJC odds (≤15), Rule 2 says it should not be hard-excluded. However MC Adj Place% was ~12% (<20%), so it didn't trigger the mandatory inclusion threshold either. This was a genuine market signal we missed.
  - **Missed Trio: $924**

- **R5**: Banker #5 GIANT BALLON won (Purton, 2.6 odds). #12 ENJOY GOLF (leg) came 3rd. But **#1 GIANT LEAP came 2nd at $8.6 — flagged as reserve but not included**.
  - Root cause: **Pool miss** — #1 had MC ~3% (overvalued 64% per MC) but was at 8.6 odds (≤15). Two C&D wins last year. MC was simply wrong on this horse's probability. Rule 2 protected #1 from hard exclusion, but MC Adj Place% ~12% didn't meet the 20% threshold.
  - **Missed Trio: $393**

---

### Pattern C: Banker Fail + Pool Gap (R1, R9) — 2 misses

Both banker failed AND an excluded horse placed. Double failure.

- **R1**: Banker #12 DRAGON SUNRISE (MC #1 at 20.9%, 1800m debut) finished 6th. #7 SUPER SICARIO (leg) won. #9 ALL ARE MINE (leg) came 2nd. But **#5 PERFECT PAIRING came 3rd at $26 — not in pool** (~19% Adj Place%).
  - Root cause: **Banker fail** (1800m debut too far) + **Pool miss** (#5 at 26 odds — borderline. Adj Place% 19% just below 20% threshold).
  - **Missed Trio: $1** ⚠️ (scraping anomaly)

- **R9**: Banker #3 CORLEONE (gate 10, +7lb rise) finished 8th. #7 FIVEFORTWO (leg) won. #6 SUPER UNICORN (leg) came 3rd. But **#9 SAMARKAND came 2nd at $28 — not in pool**.
  - Root cause: **Banker fail** (gate 10 + weight as warned) + **Genuine upset** (#9 Samarkand at 28 odds with MC ~3% — veteran with new trainer trial win, but no reasonable model would include at 28x).
  - **Missed Trio: $4** ⚠️ (scraping anomaly)

---

## What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|------------|-----------|-------------|
| R1 | 1膽+6腳 (#12 banker) | Switch banker to #7 | Still MISS — #5 at 26x not in pool | No fix possible |
| R2 | 1膽+5腳 (#6 banker) | Add #11 to pool (7 horses) | **HIT** — #6 banker ✅, #2 and #11 legs | +$924, cost +$50 |
| R3 | ✅ Already hit | — | — | — |
| R4 | 1膽+5腳 (#7 banker) | Full pool C(6,3) = 20 combos | **HIT** — #12, #2, #4 all in pool | +$133, cost +$100 |
| R5 | 1膽+5腳 (#5 banker) | Add #1 to pool (7 horses) | **HIT** — #5 banker ✅, #1 and #12 legs | +$393, cost +$50 |
| R6 | 1膽+5腳 (#2 banker) | Full pool C(6,3) = 20 combos | **HIT** — #3, #7, #4 all in pool | +$524, cost +$100 |
| R7 | ✅ Already hit | — | — | — |
| R8 | 1膽+5腳 (#1 banker) | Full pool C(6,3) = 20 combos | **HIT** — #9, #6, #8 all in pool | +$404, cost +$100 |
| R9 | 1膽+6腳 (#3 banker) | Add #9 to pool (8 horses) | Only partial — banker still failed + need #9 | No easy fix |

**Fixable misses: R2, R4, R5, R6, R8 — would recover +$2,378 for +$400 extra stake**
**Unfixable misses: R1, R9 — genuine upsets or deep longshots**

---

## Key Moments

### Best Bet
- **R3**: #6 ACE WAR (banker) at $2.8 → **+$177**. Massive steam from 8.3→2.8. Purton + SCMP +trial was the model's best call.

### Worst Bet
- **R1**: Banker #12 DRAGON SUNRISE at 1800m debut → **-$150**. Distance experiment as banker was high-risk.

### Biggest Surprise
- **R8**: #9 AMAZING KID (MC's ★ BEST VALUE, undervalued 110% at 9 odds) won at $8.8. MC value identification was perfect but banker failed.

### Most Frustrating
- **R6**: All 3 result horses (#3, #7, #4) were legs but banker #2 SPORTS LEGEND (market favourite at 3.0) collapsed to 9th. $524 Trio left on the table.

---

## Model Calibration

### Banker Performance
| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 2 | R3, R5 |
| Banker 2nd-3rd | 2 | R2 (2nd), R7 (3rd) |
| Banker out of top 3 | 5 | R1, R4, R6, R8, R9 |

**Banker strike rate (top 3): 4/9 = 44.4%**
**Banker win rate: 2/9 = 22.2%**

### Pool Coverage
| Metric | Count |
|--------|-------|
| All 3 placers in full pool | 5/9 (55.6%) — R3, R4, R6, R7, R8 |
| At least 2 placers in pool | 8/9 (88.9%) |
| 0-1 placer in pool | 1/9 (R1) |

### MC-Market Divergence Outcomes
| Race | Divergence Direction | Result |
|------|---------------------|--------|
| R3 | MC favoured #6 Ace War over market | #6 WON ✅ — MC correct |
| R4 | MC favoured #7 Flash Star over market | #7 failed (5th) — Market correct |
| R5 | MC favoured #10 Yee Cheong Spirit over market | #10 LAST (12th) — Market correct |
| R7 | MC favoured #3 Cal Moxie (+excuses) | #3 WON ✅ — MC correct |
| R8 | MC favoured #9 Amazing Kid over market | #9 WON ✅ — MC correct |
| R9 | MC favoured #5 Fortunate Son over market | #5 11th — Market correct |

**MC divergence accuracy: 3/6 cases MC was correct (50%)**

### SCMP +Excuses Flag Performance
| Race | Horse | +Excuses For | Finished | Verdict |
|------|-------|-------------|----------|---------|
| R6 | #3 Symbol Of Strength | Jumped awkward, tightened | **1st** ★ | ✅ |
| R7 | #3 California Moxie | Kicked rail, jumped awkward, keen | **1st** ★ | ✅ |
| R8 | #9 Amazing Kid | Raced wide, no cover | **1st** ★ | ✅ |
| R8 | #8 Storming Dragon | Crowded at start | **3rd** | ✅ |
| R5 | #10 Yee Cheong Spirit | Slow begin, crowded | 12th | ❌ |
| R6 | #6 Duke Of Orange | Green, no room 300-150M | 4th | Marginal |

**+Excuses hit rate (top 3): 4/6 (67%)** — strongest predictive signal of the night.

---

## Learnings

### What Worked
1. **Pool selection was excellent**: 5/9 races had ALL 3 result horses in the pool (55.6%). At least 2 placers in pool for 88.9% of races. The MC model + SCMP adjustments identify the right horses.
2. **SCMP +excuses flag was the night's best signal**: Horses with TIR excuses that bounced back WON 3 races (R6, R7, R8). The +2% Win / +3% Place adjustment was justified.
3. **Purton Elite boost justified**: 75% frame rate across 4 rides (R2 2nd, R3 1st, R5 1st, R7 1st).
4. **MC value picks on mid-tier horses delivered**: R8 #9 Amazing Kid (won), R9 #6 Super Unicorn (3rd), R7 #3 California Moxie (won).
5. **Late market moves informed good pool changes**: R5 adding #12 Enjoy Golf (24→9.7 plunge) proved correct (3rd).

### What Didn't Work
1. **Banker dependency was catastrophic**: 5/9 bankers failed (56%). In 3 of those (R4, R6, R8), ALL 3 result horses were legs. The 膽拖 structure cost $1,061 in combined Trio dividends.
2. **HV banker top-3 rate is only 44.4%** — far below the skill's assumed ~82% (from 19-Feb ST). The tight HV track creates more volatility that the MC model struggles to capture.
3. **MC overrates form-based top picks as bankers**: #7 Flash Star (R4, 15 odds), #2 Sports Legend (R6, claim jockey), #1 Lucky Planet (R8, 135lb front-runner) — MC's #1 picks couldn't deliver.
4. **Ferraris missed by jockey tier**: L Ferraris (8.24%) rode 2 winners (R6 #3, R9 #7). Below the 10% boost threshold.
5. **Big-weight 135lb+ horses underperformed as bankers**: R7 #1 just held 3rd, R8 #1 failed 6th.

### Strategy Adjustments
- [ ] **Dual banker or full-pool threshold at HV**: If banker Adj Place% < 60% at HV, use full-pool C(n,3) instead of 膽拖. Evidence: R4 (43.1%), R6 (59.5%), R8 (60.7%) — all failed.
- [ ] **Increase +excuses weight**: Current +2% Win / +3% Place was correct but conservative. Three +excuses horses won. Consider +3% Win / +4% Place.
- [ ] **Add Ferraris to "Good" jockey tier**: Tonight's 2-win performance (67% frame rate) suggests promotion. Monitor next meeting.
- [ ] **Big-weight penalty at HV**: Apply -2% Win / -3% Place for 135lb+ at HV.
- [ ] **Trust market Place odds for borderline pool edges**: Horses with Place odds shortened >30% late (R2 #11, R5 #1) should be forced into pool even if MC underrates them.
- [ ] **Lower ~82% banker assumption at HV**: Across 2 HV meetings, banker top-3 rate is 8/18 = 44.4%. The skill's 82% figure (from 19-Feb ST) does not apply to HV.

---

## P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | 1 (R6) | 0 | $100 | $0 | -$100 | -100% |
| MEDIUM-HIGH | 2 (R2, R7) | 1 | $200 | $174 | -$26 | -13.0% |
| MEDIUM | 5 (R1, R3, R5, R8, R9) | 1 | $650 | $327 | -$323 | -49.7% |
| LOW-MEDIUM | 1 (R4) | 0 | $100 | $0 | -$100 | -100% |

Note: The HIGH confidence race (R6) missed due to banker failure — #2 Sports Legend at 3.0 collapsed to 9th. MEDIUM tier produced the only profit (R3 +$177).

---

## Running Total (Season Trio Betting)

### Current Strategy (膽拖)

| Meeting | Date | Venue | Races | Hits | Staked | Returned | P&L | ROI |
|---------|------|-------|-------|------|--------|----------|-----|-----|
| Meeting 1 | 19 Feb 2026 | ST | 11 | 4 | $860 | $875 | +$15 | +1.7% |
| Meeting 2 | 22 Feb 2026 | ST | 10 | 4 | $1,160 | $420 | -$740 | -63.8% |
| Meeting 3 | 25 Feb 2026 | HV | 9 | 2 | $1,000 | $130 | -$870 | -87.0% |
| Meeting 4 | 1 Mar 2026 | ST | 11 | 5 | $1,200 | $4,169 | +$2,969 | +247.4% |
| **Meeting 5** | **4 Mar 2026** | **HV** | **9** | **2** | **$1,050** | **$501** | **-$549** | **-52.3%** |
| **TOTAL** | | | **50** | **17** | **$5,270** | **$6,095** | **+$825** | **+15.7%** |

### Cross-Meeting Banker Performance

| Meeting | Banker Top 3 | Rate |
|---------|-------------|------|
| 19-Feb ST | 9/11 | 81.8% |
| 22-Feb ST | 5/10 | 50.0% |
| 25-Feb HV | 4/9 | 44.4% |
| 1-Mar ST | 5/11 | 45.5% |
| 4-Mar HV | 4/9 | 44.4% |
| **Combined** | **27/50** | **54.0%** |

### Venue Breakdown

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
|-------|----------|-------|------|--------|----------|-----|-----|--------------|
| Sha Tin | 3 | 32 | 13 | $3,220 | $5,464 | +$2,244 | +69.7% | 19/32 (59.4%) |
| Happy Valley | 2 | 18 | 4 | $2,050 | $631 | -$1,419 | -69.2% | 8/18 (44.4%) |

---

## Season Trajectory

| Metric | 19-Feb | 22-Feb | 25-Feb | 1-Mar | **4-Mar** | Trend |
|--------|--------|--------|--------|-------|-----------|-------|
| Hit rate | 36.4% | 40.0% | 22.2% | 45.5% | **22.2%** | HV struggles |
| Cumulative P&L | +$15 | -$725 | -$1,595 | +$1,374 | **+$825** | Still positive |
| Cumulative ROI | +1.7% | -35.9% | -52.8% | +32.6% | **+15.7%** | Declining |
| Banker top 3 | 81.8% | 50.0% | 44.4% | 45.5% | 44.4% | Stable ~45% |

The 4-Mar HV meeting eroded the gains from the excellent 1-Mar ST session. Happy Valley continues to be the weaker venue: 4/18 hit rate (22.2%) vs Sha Tin 13/32 (40.6%). HV banker strike rate (44.4%) is notably lower than ST (59.4%). The tight HV track with draw-dependent results and more upsets creates volatility that the MC model struggles to capture. The critical structural finding remains: **banker dependency in 膽拖 is the single biggest drag on HV performance** — 3 of 7 misses had perfect leg pools destroyed by banker failure.

---

## Banker Place Bet Analysis

If the banker (Adj Win% #1) was used as a flat $10 Place bet each race:

| Race | Banker | Adj Win% | Odds | Finished | Placed? | Place Div |
|------|--------|----------|------|----------|---------|-----------|
| R1 | #12 DRAGON SUNRISE | 20.9% | — | 6th | ❌ | $0 |
| R2 | #6 ONLY U | — | — | 2nd | ✅ | $18.5 |
| R3 | #6 ACE WAR | 26.1% | 2.8 | 1st | ✅ | $16.0 |
| R4 | #7 FLASH STAR | 15.8% | 15 | 5th | ❌ | $0 |
| R5 | #5 GIANT BALLON | — | 2.6 | 1st | ✅ | $13.5 |
| R6 | #2 SPORTS LEGEND | 26.1% | 3.0 | 9th | ❌ | $0 |
| R7 | #1 RAGGA BOMB | — | 3.2 | 3rd | ✅ | $16.5 |
| R8 | #1 LUCKY PLANET | 26.8% | — | 6th | ❌ | $0 |
| R9 | #3 CORLEONE | — | — | 8th | ❌ | $0 |

| Metric | Value |
|--------|-------|
| Place strike rate | 4/9 (44.4%) |
| Total staked | $90 |
| Total returned | $64.5 |
| **Net P&L** | **-$25.5** |
| **ROI** | **-28.3%** |

### Cross-Meeting Banker Place Bet Cumulative

| Meeting | Races | Placed | Rate | Staked | Returned | P&L | ROI |
|---------|-------|--------|------|--------|----------|-----|-----|
| 19 Feb ST | 11 | 9/11 | 81.8% | $110 | $124.1 | +$14.1 | +12.8% |
| 22 Feb ST | 10 | 5/10 | 50.0% | $100 | $74.1 | -$25.9 | -25.9% |
| 25 Feb HV | 9 | 4/9 | 44.4% | $90 | $67.0 | -$23.0 | -25.6% |
| 1 Mar ST | 11 | 6/11 | 54.5% | $110 | $130.0 | +$20.0 | +18.2% |
| 4 Mar HV | 9 | 4/9 | 44.4% | $90 | $64.5 | -$25.5 | -28.3% |
| **Cumulative** | **50** | **28/50** | **56.0%** | **$500** | **$459.7** | **-$40.3** | **-8.1%** |
