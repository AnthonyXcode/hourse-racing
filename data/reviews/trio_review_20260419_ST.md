# Trio suggestions review — Sha Tin | 19 Apr 2026

## Data sources

- **Suggestions:** `data/reports/trio_strategy_20260419_ST_R1.md` … **R11.md** (Strategy A + Strategy B as written).
- **Results:** scraped HKJC local results → `data/historical/results_20260419_ST.json` (`tools/scrape-meeting.ts --date=2026-04-19 --venue=ST`).
- **Trio dividend:** HKJC **Trio** payout per **$10** unit from results page.

**Actual top 3** (finish order 1→2→3):

| Race | 1st | 2nd | 3rd | Trio ($10) |
|------|-----|-----|-----|------------|
| R1 | #1 FOREMOST TEDDY (5.2) | #4 FIREFOOT (3.7) | #11 ALL ARE MINE (6.1) | $272 |
| R2 | #7 NOBLE DELUXE (14) | #9 VIVA CHALEUR (2.0) | #8 TRIUMPHANT WARRIOR (18) | $575 |
| R3 | #4 PARENTS' LOVE (22) | #7 MASTER PAYMENT (16) | #1 RUN RUN SUNRISE (3.3) | $1,292 |
| R4 | #11 PROUD BOX (7.7) | #10 DECISION LINK (3.8) | #4 LET'S HAVE FUN (12) | $724 |
| R5 | #11 ABSOLUTE HONOUR (2.3) | #3 MEGA MASTERMIND (5.7) | #6 PRESTIGE RICKY (13) | $243 |
| R6 | #9 BLOSSOMY (22) | #11 BULL ATTITUDE (5.5) | #8 SHOTGUN (4.5) | $929 |
| R7 | #5 TARGET AUDIENCE (13) | #1 ARMOUR WAR EAGLE (2.8) | #8 LIGHT YEARS GLORY (18) | $792 |
| R8 | #9 MUST GO (14) | #3 AURORA PATCH (3.1) | #11 TIN FOOK (3.7) | $170 |
| R9 | #1 SKY JEWELLERY (4.8) | #3 EVERYONE'S STAR (4.9) | #8 CHILL EASY (10) | $305 |
| R10 | #5 GOLD PATCH (3.9) | #7 THOUSAND SPIRIT (11) | #3 KA YING ATTACK (5.5) | $225 |
| R11 | #14 NAUTICAL FORCE (15) | #12 KA YING GENERATION (14) | #8 JOY OF SPRING (6.6) | $3,094 |

---

## P&L summary

Assumptions: **$10** per listed combination; one winning line pays the **full** Trio dividend for that race (standard HKJC 單T). For races with dual-banker (雙膽拖) primary + single-banker alt, the **primary recommendation** is used.

| Metric | Strategy A (primary) | Strategy B (MC+odds) |
|--------|---------------------|---------------------|
| Races played | **11** | **11** |
| Hit rate | **2/11 (18.2%)** | **4/11 (36.4%)** |
| Total staked | **$650** | **$1,890** |
| Total returned | **$818** | **$1,835** |
| **Net P&L** | **+$168** | **−$55** |
| **ROI** | **+25.8%** | **−2.9%** |
| Session result | WIN ✅ | LOSS ❌ |

**Note — R10 alt scenario:** If Strategy A played the 膽拖 alt ($60) instead of the 雙膽拖 primary ($30), R10 becomes a **HIT** ($225). Alt total: stake $680, return $1,043, P&L **+$363**, ROI **+53.4%**.

---

## Race-by-race — Strategy A

| Race | Structure | Stake | Actual top 3 | Hit? | Return | P&L |
|------|-----------|-------|-------------|------|--------|-----|
| R1 | 膽拖 1B+4L (#2 + #10,#11,#12,#13) | $60 | {1,4,11} | ❌ | $0 | −$60 |
| R2 | 膽拖 1B+4L (#7 + #4,#9,#8,#6) | $60 | {7,9,8} | ✅ | $575 | +$515 |
| R3 | 雙膽拖 2B+3L (#3+#1 + #11,#13,#2) | $30 | {4,7,1} | ❌ | $0 | −$30 |
| R4 | 膽拖 1B+5L (#8 + #4,#3,#2,#10,#7) | $100 | {11,10,4} | ❌ | $0 | −$100 |
| R5 | 膽拖 1B+5L (#3 + #8,#6,#11,#5,#9) | $100 | {11,3,6} | ✅ | $243 | +$143 |
| R6 | 膽拖 1B+4L (#1 + #4,#11,#5,#9) | $60 | {9,11,8} | ❌ | $0 | −$60 |
| R7 | 膽拖 1B+5L (#8 + #3,#7,#9,#10,#1) | $100 | {5,1,8} | ❌ | $0 | −$100 |
| R8 | 膽拖 1B+4L (#3 + #1,#5,#6,#8) | $60 | {9,3,11} | ❌ | $0 | −$60 |
| R9 | 雙膽拖 2B+2L (#4+#3 + #7,#9) | $20 | {1,3,8} | ❌ | $0 | −$20 |
| R10 | 雙膽拖 2B+3L (#7+#2 + #1,#5,#3) | $30 | {5,7,3} | ❌ | $0 | −$30 |
| R11 | 雙膽拖 2B+3L (#6+#13 + #8,#4,#3) | $30 | {14,12,8} | ❌ | $0 | −$30 |
| **Total** | | **$650** | | **2/11** | **$818** | **+$168** |

### Strategy A hit analysis

**R2 ✅ ($575, +$515):** Banker #7 NOBLE DELUXE won at 14 odds (MC's top pick at 49.6% Win). Both other placers (#9, #8) covered in the 4-leg pool. Model-market alignment worked perfectly — MC saw #7 as dominant, market had it at 14. Biggest profit driver of the day.

**R5 ✅ ($243, +$143):** Banker #3 MEGA MASTERMIND 2nd at 5.7 (MC 35.8%). #11 ABSOLUTE HONOUR (2.3 SP, Purton) won; #6 PRESTIGE RICKY 3rd at 13. Both in the 5-leg pool. Solid coverage of a race with clear top runners.

### Strategy A miss classification

| Pattern | Count | Races |
|---------|-------|-------|
| **A — Banker hit, all 3 in pool** | 0 | — |
| **B — Banker hit, pool gap** | 2 | R7, R8 |
| **C — Banker fail** | 7 | R1, R3, R4, R6, R9, R10, R11 |

**Pattern B details (banker hit, pool gap):**
- **R7:** Banker #8 LIGHT YEARS GLORY 3rd ✅. Gap: **#5 TARGET AUDIENCE** (13 odds, 0 form — returning from tendon injury). Explicitly flagged in caveats as high-risk exclusion. Moreira rode. #1 ARMOUR WAR EAGLE 2nd was in pool.
- **R8:** Banker #3 AURORA PATCH 2nd ✅. Gaps: **#9 MUST GO** (won at 14, MC 0.8%, Size-trained) and **#11 TIN FOOK** (3rd at 3.7, 0% MC but caveats flagged trial form). TIN FOOK was explicitly noted as a watch candidate.

**Pattern C details (banker fail):**
- **R1:** #2 HAILTOTHEVICTORS 4th (MC 41.7% Win at 28 odds — massive model-market discrepancy, biggest risk flagged).
- **R3:** #3 ALSONSO 4th (MC 66.2% — extremely confident model, 21 SP). Winner #4 PARENTS' LOVE (22 SP) and #7 MASTER PAYMENT (debutant, 16 SP) were both outside MC's top picks.
- **R4:** #8 VOYAGE BOSS 4th (MC 41.0%). Winner #11 PROUD BOX not in pool (7.7 SP, Adj 1.8%).
- **R6:** #1 SUPREME AGILITY 4th (MC 34.7%). Returned from bleed — fitness concern noted.
- **R9:** #4 AEROVOLANIC 6th (MC 48.9%, 2.4 SP — huge favourite bomb!). Champion Griffin #1 SKY JEWELLERY won.
- **R10:** #7 hit (2nd) but dual banker #2 SUPER EXPRESS 6th (MC 33.1%, 2.8 SP — another favourite bomb).
- **R11:** #6 GENTLEMEN LEGACY 4th (MC 54.5%, 7.8 SP). Import #14 NAUTICAL FORCE won at 15 (Size-trained, 0 form, 0.1% MC).

---

## Race-by-race — Strategy B

| Race | Structure | Stake | Actual top 3 | Hit? | Return | P&L |
|------|-----------|-------|-------------|------|--------|-----|
| R1 | 膽拖 1B+7L (#2 + #1,#4,#5,#10,#11,#12,#13) | $210 | {1,4,11} | ❌ Banker #2 4th | $0 | −$210 |
| R2 | 膽拖 1B+7L (#7 + #1,#3,#4,#6,#8,#9,#11) | $210 | {7,9,8} | ✅ | $575 | +$365 |
| R3 | 膽拖 1B+7L (#3 + #1,#2,#4,#6,#10,#11,#13) | $210 | {4,7,1} | ❌ Banker #3 4th | $0 | −$210 |
| R4 | 膽拖 1B+7L (#8 + #1,#2,#3,#4,#7,#10,#13) | $210 | {11,10,4} | ❌ Banker #8 4th | $0 | −$210 |
| R5 | 膽拖 1B+6L (#3 + #5,#6,#8,#9,#10,#11) | $150 | {11,3,6} | ✅ | $243 | +$93 |
| R6 | 膽拖 1B+8L (#1 + #2,#3,#4,#5,#8,#9,#11,#12) | $280 | {9,11,8} | ❌ **Pattern A** | $0 | −$280 |
| R7 | 膽拖 1B+7L (#8 + #1,#3,#5,#7,#9,#10,#12) | $210 | {5,1,8} | ✅ | $792 | +$582 |
| R8 | 膽拖 1B+5L (#3 + #1,#5,#6,#8,#11) | $100 | {9,3,11} | ❌ Pool gap #9 | $0 | −$100 |
| R9 | 膽拖 1B+4L (#4 + #1,#3,#7,#8) | $60 | {1,3,8} | ❌ **Pattern A** | $0 | −$60 |
| R10 | 膽拖 1B+5L (#7 + #1,#2,#3,#5,#10) | $100 | {5,7,3} | ✅ | $225 | +$125 |
| R11 | 膽拖 1B+6L (#6 + #2,#3,#4,#8,#12,#13) | $150 | {14,12,8} | ❌ Banker #6 4th | $0 | −$150 |
| **Total** | | **$1,890** | | **4/11** | **$1,835** | **−$55** |

### Strategy B hit analysis

**R2 ✅ ($575, +$365):** Same as A — banker #7, #9+#8 in pool.
**R5 ✅ ($243, +$93):** Same as A — banker #3, #11+#6 in pool.
**R7 ✅ ($792, +$582):** Key B-only hit. #5 TARGET AUDIENCE added via Win-odds < 10 rule (7.7 odds, 0 form). Strategy A excluded #5 due to 0% MC. Won at 13.
**R10 ✅ ($225, +$125):** B-only hit. Single banker #7 ✅; #5+#3 in pool. Strategy A's dual-banker (#7+#2) failed because #2 finished 6th.

### Strategy B miss classification

| Pattern | Count | Races |
|---------|-------|-------|
| **A — Banker hit, all 3 in pool** | 2 | R6, R9 |
| **B — Banker hit, pool gap** | 1 | R8 |
| **C — Banker fail (+ pool gap)** | 4 | R1, R3, R4, R11 |

**Pattern A (most painful — ticket had all 3 but wrong banker):**
- **R6:** Banker #1 SUPREME AGILITY 4th. All 3 placers (#9, #11, #8) were legs. If ANY of those were banker instead, B hits $929. Pool cost was $280 — the widest B ticket of the day, wasted by banker selection.
- **R9:** Banker #4 AEROVOLANIC 6th (massive 2.4 SP favourite bomb). ALL 3 placers (#1, #3, #8) were legs. $60 wasted — if #3 or #1 was banker, easy hit of $305.

---

## What-If analysis

| Scenario | Change | Effect |
|----------|--------|--------|
| A: R10 play alt (膽拖 $60) instead of primary (雙膽拖 $30) | +$30 stake, +$225 return | A total: $680 staked, $1,043 returned, **+$363 (+53.4%)** |
| A: R7 swap #5 for weakest leg (#1 ARMOUR WAR EAGLE) | Same $100 stake | A hits R7 ($792). But loses #1 as leg — still hits since #5 replaces a different leg. Net: depends on structure. |
| B: R6 use #9 or #11 as banker | Same $280 stake | B hits $929. Total: $1,890 staked, $2,764 returned, **+$874 (+46.2%)** |
| B: R9 use #3 as banker | Same $60 stake | B hits $305. Total: $1,890 staked, $2,140 returned, **+$250 (+13.2%)** |
| B: R6 + R9 correct banker | Both banker fixes | B total: $1,890 staked, $3,069 returned, **+$1,179 (+62.4%)** |

---

## Key moments

1. **R9 — AEROVOLANIC bomb (2.4 SP → 6th):** The most confident pick of the day (MC 48.9%, market favourite) bombed. Both strategies built around #4 as banker. #1 SKY JEWELLERY (Champion Griffin, Size-trained, 0 local form) won at 4.8 — exactly the scenario flagged in caveats.

2. **R7 — Strategy B's Win-odds rule vindicated:** #5 TARGET AUDIENCE (0 form, returning from tendon injury, Moreira) won at 13. B's Win-odds < 10 rule forced its inclusion despite 0% MC. Strategy A's caveats explicitly suggested swapping for #5 but the primary ticket excluded it. **This is the signature B advantage.**

3. **R6 — Pattern A heartbreak for B:** $280 bet with ALL three placers in the leg pool, but banker #1 failed. Returned from a bleed — the fitness concern flagged in caveats was real.

4. **R11 — Size import surprise ($3,094 Trio):** #14 NAUTICAL FORCE (Size debut, 0 form, 15 SP) won the Class 2 feature. Neither strategy had coverage. Trio paid $3,094 — a structural miss against both pools.

5. **R10 — Dual-banker trap:** Strategy A's primary 雙膽拖 with #7+#2 missed because #2 SUPER EXPRESS (2.8 SP, Size-trained, MC #2 pick) finished 6th. The 膽拖 alt with only #7 as banker would have hit. **Dual-banker adds 4th-finisher risk on a second horse.**

---

## Model calibration

| Metric | Observation |
|--------|-------------|
| Banker success rate (A) | 4/11 (36.4%) — banker placed top 3 in R2, R5, R7, R8 |
| Banker success rate (B) | Same bankers as A = same 36.4% |
| MC #1 pick finishing top 3 | 4/11 — better than 15 Apr (3/9) |
| MC #1 pick winning | 2/11 — R2 (#7), R5 (#3 2nd but #11 won at 2.3) |
| Dual-banker both placing | 0/4 races with 雙膽拖 — second banker failed every time |
| Caveats-flagged horses hitting | R7 #5 (flagged as alt swap), R8 #11 (flagged to monitor), R9 #1 (flagged Griffin risk) |
| Favourite bombs (top 2 SP finishing 5th+) | R9 #4 (2.4→6th), R10 #2 (2.8→6th), R6 #5 (3.4→6th) |

---

## Learnings

1. **Dual-banker (雙膽拖) is high-risk:** 0/4 dual-banker races hit today (R3, R9, R10, R11). The second banker adds extra failure risk for marginal savings. Today would have been +$195 better on A if all 雙膽拖 were played as 膽拖 (at roughly double the stake). **Consider defaulting to single-banker (膽拖) unless the dual banker pair are both >90% MC Place%.**

2. **Win-odds < 10 rule (Strategy B) adds genuine value when it adds comeback/form horses the MC can't see:** R7 #5 TARGET AUDIENCE is the poster child — 0 form but Moreira/Fownes + short price. The rule correctly forces coverage.

3. **Banker selection remains the bottleneck:** 7/11 Strategy A misses were Pattern C (banker fail). Both strategies share the same banker = same vulnerability. No amount of pool widening fixes a wrong banker.

4. **Fitness red flags predict banker failure:** R1 #2 (lame, passed vet 24 days), R6 #1 (returned from bleed), R9 #4 (2.4 SP but beaten 0.36s for 6th — possibly not at peak). **Weight vet/fitness flags more heavily when selecting banker.**

5. **Size imports at double-digit odds are structural blind spots:** R9 #1 SKY JEWELLERY (Griffin, Size), R11 #14 NAUTICAL FORCE (Size debut, 0 form). Neither MC nor Win-odds rule captures these unless odds drop below 10. **Consider a "Size import at C2+ with good trials" override.**

6. **R3/R11 — debutant/import chaos:** Both races saw debutant-adjacent or import runners with near-zero MC blow up the Trio. MC requires 2+ form entries for reliability. In fields with 3+ debutants, MC accuracy degrades significantly.

---

## P&L by confidence level (Strategy A)

| Confidence | Races | Staked | Returned | P&L | ROI |
|------------|-------|--------|----------|-----|-----|
| HIGH | R2, R8, R9 | $140 | $575 | +$435 | +310.7% |
| MEDIUM-HIGH | R4, R5, R10 | $230 | $243 | +$13 | +5.7% |
| MEDIUM | R1, R3, R6, R7, R11 | $280 | $0 | −$280 | −100% |

**HIGH confidence delivered strongly** (+310.7% ROI), driven by the R2 $575 hit. MEDIUM-HIGH broke even. MEDIUM confidence was a wipeout.

---

## Running total (April 2026)

| Meeting | Strat A P&L | Strat B P&L |
|---------|-------------|-------------|
| 01 Apr ST | −$177 | −$860 |
| 06 Apr ST | −$588 | −$379 |
| 08 Apr HV | −$870 | −$596 |
| 12 Apr ST | −$392 | +$63 |
| 15 Apr HV | −$415 | −$270 |
| **19 Apr ST** | **+$168** | **−$55** |
| **April cumulative** | **−$2,274** | **−$2,097** |

**Best single-meeting result this month** for Strategy A. First profitable A session in April. Strategy B continues to edge A on cumulative P&L by $177.

---

## A/B Strategy comparison

| Metric | Strategy A | Strategy B | Delta |
|--------|-----------|-----------|-------|
| Hits today | 2 | 4 | B +2 |
| Hit rate today | 18.2% | 36.4% | B +18.2pp |
| Today P&L | +$168 | −$55 | A +$223 |
| Today ROI | +25.8% | −2.9% | A +28.7pp |
| Avg stake/race | $59 | $172 | B costs 2.9× more |

**Today's A/B story:** B found 2 extra hits (R7, R10) that A missed, but those hits paid $792 + $225 = $1,017 against an extra $1,240 in total B stake. B's wider nets caught more fish, but the net cost more than the fish were worth. **A won this session by being cheaper, not smarter.**

B's structural advantage (Win-odds rule adding #5 in R7) is real, but cost-efficiency remains the challenge. B needs bigger dividends on its extra hits to justify 2.9× the stake.

---

## Files

- Results: `data/historical/results_20260419_ST.json`
- Strategy reports: `data/reports/trio_strategy_20260419_ST_R1.md` … `R11.md`
- Scraper: `tools/scrape-meeting.ts`
- Previous review: `data/reviews/trio_review_20260415_HV.md`

*Generated after meeting — for post-race learning, not betting advice.*
