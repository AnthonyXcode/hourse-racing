# Trio Post-Race Review — Sha Tin | 2026-10-19

**Meeting 12 of the 2026/27 season.** An 11-race Monday card, all on Turf. Going was **Good** for R1–R8 and **Good to Firm** for R9–R11. Results: `data/historical/results_20261019_ST.json`. Bet records: `data/reports/trio_strategy_20261019_ST_R1–R11.md`.

> **Data notes for this meeting — read first**
> - **The bet records are retrospective. Treat them as a paper trade.** The scheduled 11:00 HKT run was missed. All 11 reports were generated on **2026-10-20, blind to results**, using the saved leak-free race-card snapshot (`analyze-race.ts --use-saved --hide-actual`).
> - **Odds in every report are final SP, not 11:00 pool odds.** Any rule that reads Win odds (Rule 9, the B-trio "Win odds < 10" step, and every market-rank and divergence figure in this review) therefore saw closing prices that a live run could not have seen. **This favours the market-based rules.** It matters most for B-trio's two hits, which both depended on horses at SP 5.2, 9.4 and 9.5. At least the 9.4 and 9.5 could easily have been above 10 at 11:00.
> - **SCMP was unavailable** (SCMP racecard/1 already showed the 21-Oct HV card). There were no Star Form, TIR, vet, trackwork, running-style or Q/QP inputs. **Every Strategy A adjustment factor is 0, so Adj% = MC% in all 11 races.** As a result **this card does not test the SCMP layer at all.** A differs from B here only through structure: Mode A/B pool size, Rule 8, the debutant banker rule and 雙膽拖. Section 7d (+Excuses) has no data.
> - **Results were already scraped** (`tools/scrape-meeting.ts`, DT ✓, TT ✓) and were not re-scraped. Trio (per $10): R1 $5,611 · R2 $15,215 · R3 $3,767 · R4 $412 · R5 $207 · R6 $857 · R7 $358 · R8 $663 · R9 $155 · R10 $1,018 · R11 $483. **Every comma-thousands Trio value parsed in full**, and the Tierce/Trio ratios (3.3–11.3) are consistent with the finishing SPs: R2 was 34/16/71, R3 102/3.8/4.3. No Trio dividend looks unrealistically low, so no HKJC cross-check was needed. No ticket hit a race with a four-figure Trio anyway.
> - **Scraper anomalies in other pools (not used here, not edited):** R1 Quinella **$1**, R2 Quinella **$2** with four QP values, R3 Win **$1** (the 102 winner) and R3 Quinella **$2**. These are comma-thousands values truncated in the Win/Quinella fields. The results file labels R8 (THE SHA TIN TROPHY) **Group 2**, while the report header says Group 1. Group 2 is used below.
> - **Scoring.** **Strategy A** is scored exactly as written in each report. **Strategy B** follows the review-skill definition: MC top 6 by raw Win%, MC #1 banker, 1膽+5腳, $100/race. The reports' own "Strategy B (MC-only)" ticket is tracked separately as **B-trio**. "Banker top 3" counts a race only if **every** banker placed (R6 was 雙膽拖). No scratchings and no PASS.

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played | **11 (R1–R11)** |
| Hit rate | **0/11 (0.0%)** |
| Total staked | $880 |
| Total returned | $0 |
| **Net P&L** | **−$880** |
| **ROI** | **−100.0%** |
| Session Result | **LOSS** |

**A second blank card in a row, and the first blank at Sha Tin this season.** Both tickets that mattered went 0/11. **The A banker placed in 5/11 races (R3, R4, R5, R7, R10), but in all five the pool missed a horse MC rated at 3.0% or less.** In three of those five races the gap horses were 20/1 to 102/1 (R3 #13 GOOD GOOD won at 102, R7 #7 at 20, R10 #11 at 20 and #5 at 50). **Two Pattern A misses came from sub-30% bankers** (R8 22.4%, R9 29.6%). In both races every placer was in the legs. R1–R3 paid $5,611, $15,215 and $3,767 on placers MC had at #8–#13. **B-trio was the only ticket that hit: 2/11 (R5 $207, R6 $857), −$26.** That is its best card of the season, but the result relies on SP-based Win-odds candidates (see the data notes).

## Section 2: Race-by-Race Cross-Reference

Result column: **bold** = top-3 finisher NOT in the Strategy A pool.

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
| R1 | C5 1800m | B (1膽+5腳) | #2 | 8, 6, 1, 4, 5 | 6→**11**→**13** | MISS ❌ | $5,611 | $0 | −$100 | Banker fail (#2 7th at 9.0) + 2 gaps (#11 MC #8 at 57; #13 MC #12 at 11) |
| R2 | C4 1400m | A (1膽+4腳) | #10 | 9, 2, 8, 11 | **7**→2→**5** | MISS ❌ | $15,215 | $0 | −$60 | Banker fail (#10 6th) + 2 gaps (#7 MC #9 at 34; #5 MC #11 at 71) |
| R3 | C4 1800m | A (1膽+4腳) | #2 | 5, 3, 11, 9 | **13**→2→5 | MISS ❌ | $3,767 | $0 | −$60 | Banker hit (2nd), gap #13 (MC #13, 0.3%, **102/1 winner**) |
| R4 | C4 1400m | A (1膽+4腳, debutant swap) | #4 | 7, 13, 3, 11 | **14**→11→4 | MISS ❌ | $412 | $0 | −$60 | Banker hit (3rd), gap #14 (MC #12, 0.5%, 9.3) |
| R5 | C4 1200m | B+ (1膽+6腳) | #12 | 6, 2, 11, 4, 10, 7 | **8**→10→12 | MISS ❌ | $207 | $0 | −$150 | Banker hit (3rd), gap #8 (MC #9, 2.7%, 3rd fav 5.2) |
| R6 | C4 1000m | A 雙膽拖 (2膽+3腳) | #10, #3 | 1, 6, 2 | **12**→**5**→10 | MISS ❌ | $857 | $0 | −$30 | Banker #3 fail (4th; #10 3rd ✅) + 2 gaps (#12 MC #9 at 9.5; #5 MC #8 at 9.4) |
| R7 | C4 1200m | A (1膽+4腳, debutant swap) | #3 | 4, 1, 2, 8 | 4→**7**→3 | MISS ❌ | $358 | $0 | −$60 | Banker hit (3rd), gap #7 (MC #9, 3.0%, 20) |
| R8 | G2 1600m | B (1膽+5腳) | #10 | 8, 2, 7, 11, 6 | 7→6→2 | MISS ❌ | $663 | $0 | −$100 | **Banker fail (all 3 in legs!)** #10 (2.5 fav, MC 22.4%) 4th |
| R9 | C3 1200m | B (1膽+5腳) | #10 | 8, 1, 3, 6, 11 | 6→1→8 | MISS ❌ | $155 | $0 | −$100 | **Banker fail (all 3 in legs!)** #10 (5.3, MC 29.6%) 5th |
| R10 | C3 1600m | A (1膽+4腳) | #1 | 7, 4, 2, 14 | 1→**11**→**5** | MISS ❌ | $1,018 | $0 | −$60 | Banker hit (won at 1.9), 2 gaps (#11 MC #7 at 20; #5 MC #9 at 50) |
| R11 | C3 1400m | B (1膽+5腳) | #6 | 13, 8, 10, 5, 9 | 8→13→**7** | MISS ❌ | $483 | $0 | −$100 | Banker fail (#6 4th at 11) + gap #7 (MC #12, 0.1%, 40) |

"Debutant swap" = MC #1 had only 1 start, so it was demoted to a leg (R4 #7, R7 #4) and the next eligible horse became banker. "+" in Mode = R5 pool extended from 6 to 7 by Rule 8 (#7, Adj Place 24.8%). R6 used 雙膽拖 because #3 had Adj Place 74.0% (≥ 63%).

## Section 3: Hits Analysis

**No hits.** The five Pattern B races, where the banker placed and the pool missed one or two horses, were the closest:

| Race | Banker → finish | Legs that placed | Missing horse(s) | MC rank (Win% / Place%) | SP | Trio |
|------|-----------------|------------------|------------------|-------------------------|----|------|
| R3 | #2 VICTOR SUPREME (MC 43.4%) → **2nd** | #5 3rd | #13 GOOD GOOD **won** | #13 (0.3% / 2.3%) | **102** | $3,767 |
| R4 | #4 CALIFORNIA WAVES (3.0 fav) → **3rd** | #11 2nd (MC #5 at 19) | #14 STAR SATYR **won** | #12 (0.5% / 4.0%) | 9.3 | $412 |
| R5 | #12 CIRRUS SPEED (2.2 fav, MC 31.6%) → **3rd** | #10 2nd (MC #6 at 11) | #8 GUTSY BRAVO **won** | #9 (2.7% / 12.8%) | 5.2 | $207 |
| R7 | #3 SOLID CAR (MC #2) → **3rd** | #4 won (MC #1 debutant, leg) | #7 INCREDIBLE MOMENT 2nd | #9 (3.0% / 14.5%) | 20 | $358 |
| R10 | #1 PACKING FIGHTER (MC 59.0%, 1.9) → **1st** | — | #11 SHAMUS STORM 2nd, #5 COMPLETE UNKNOWN 3rd | #7 (0.5%), #9 (0.4%) | 20, 50 | $1,018 |

**Two of these gaps (R4 #14 at 9.3, R5 #8 at 5.2) were under 10 and MC rated both under 3%.** That is the "market-backed near-zero" profile from 14-Oct, and the B-trio Win-odds < 10 step picked up both. The other three races (R3, R7, R10) were beaten by genuine 20/1+ horses that no MC- or market-based rule would have selected.

## Section 4: Miss Classification

11 misses. **2 Pattern A, 5 Pattern B, 4 Pattern C.**

### Pattern A: Banker Fail — All 3 Placers Already in Legs (2/11)

| Race | Banker (SP) | Finished | Result | Root cause | Missed Trio |
|------|-------------|----------|--------|------------|-------------|
| R8 | #10 SKY JEWELLERY (2.5 fav) | 4th | 7→6→2 | **MC #1 at only 22.4%, a near-tie with #8 (22.2%)** in a Group 2 race. The report rated it LOW confidence: the banker was stepping up from Class 2, with 53% MC place. Legs #7 (MC #4, 8.8) won, #6 (MC #5 at 29, "undervalued 128%") ran 2nd and #2 (2nd fav) ran 3rd. Mode D did not fire, because 22.4% is above the 20% PASS line | $663 |
| R9 | #10 HAPPY SHOOTER (5.3, 3rd fav) | 5th | 6→1→8 | **MC #1 below 30% (29.6%)** while the market preferred the co-favourites #1 (3.0) and #8 (3.4). Both co-favourites were legs and both placed. #6 GRAND EAGLE (MC #5, 9.3) won | $155 |

**Combined Pattern A missed return: $818.** Both bankers were below 30%. **MC #1 below 30% is now 0/10 over three cards** (11-Oct 0/4, 14-Oct 0/4, 19-Oct 0/2).

### Pattern B: Banker Hit — Pool Gap (5/11)

| Race | Banker | Placed legs | Pool gap | Gap MC rank | Gap SP | Reserve status |
|------|--------|-------------|----------|-------------|--------|----------------|
| R3 | #2 2nd | #5 3rd | **#13 GOOD GOOD 1st** | #13 of 14 (0.3%) | 102 | Not mentioned beyond the MC table. Last six runs 14-14-12-7-9-2 (most recent first) |
| R4 | #4 3rd | #11 2nd | **#14 STAR SATYR 1st** | #12 (0.5%) | 9.3 (4th fav) | Report named it as overvalued by the market (4.0% place). In B-trio via Win odds < 10 |
| R5 | #12 3rd | #10 2nd | **#8 GUTSY BRAVO 1st** | #9 (2.7%) | 5.2 (3rd fav) | Report flagged it as the market's 3rd choice with "the fastest-looking speed profile". In B-trio via Win odds < 10 |
| R7 | #3 3rd | #4 1st | **#7 INCREDIBLE MOMENT 2nd** | #9 (3.0%) | 20 | Listed only as a > 90-day layoff (last run 1-Jul) |
| R10 | #1 1st | — | **#11 2nd, #5 3rd** | #7 (0.5%), #9 (0.4%) | 20, 50 | Not mentioned. MC top 6 included #4 (43) and #2 (79) as "undervalued 398% / 518%"; they ran 9th and 13th |

**Pattern B was the dominant miss pattern at 5/11 — but unlike 14-Oct, pool expansion would only have fixed two of them.** R4 and R5 had gaps under 10. R3, R7 and R10 were beaten by 20/1 to 102/1 horses with MC Win% ≤ 3.0%.

### Pattern C: Banker Fail + Pool Gap (4/11)

| Race | Banker (pos, SP) | Gap horse(s) | Gap MC rank (Win%) | Gap SP | Note |
|------|------------------|--------------|--------------------|--------|------|
| R1 | #2 (7th, 9.0) | #11 2nd, #13 3rd | #8 (1.5%), #12 (0.4%) | 57, 11 | MC "undervalued 213%" banker against the market. #6 (MC #3) won. Trio $5,611 |
| R2 | #10 (6th, 4.4) | #7 1st, #5 3rd | #9 (2.1%), #11 (0.7%) | 34, 71 | MC 43.6% maiden banker. The 2.3 favourite #8 ran 10th. Trio $15,215 |
| R6 | #10 3rd ✅ / #3 4th | #12 1st, #5 2nd | #9 (1.0%), #8 (1.1%) | 9.5, 9.4 | 雙膽拖 second banker #3 (74% place) ran 4th. The gaps alone would have beaten a single-banker ticket |
| R11 | #6 (4th, 11) | #7 3rd | #12 (0.1%) | 40 | MC "undervalued 281%" banker. The co-favourites #8 and #13 (both legs) ran 1–2 |

**Combined Pattern C Trio value: $22,166**, of which R1 and R2 make up $20,826. Three of the four were longshot frames that are unreachable by design.

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R1 | 1膽 #2 + 5腳 | Any MC/market rule | ❌ (#11 at 57, #13 at 11; banker 7th) | — |
| R2 | 1膽 #10 + 4腳 | Any MC/market rule | ❌ (#7 at 34, #5 at 71; banker 6th) | — |
| R3 | 1膽 #2 + 4腳 | Add #13 | ✅ $3,767, but #13 was MC #13 at 102 | Not rule-reachable |
| R4 | 1膽 #4 + 4腳 | **Add Win-odds < 10 candidates #12, #14** = 1膽+6腳 | ✅ $412 | +$90 → **+$262 net** (vs −$60) |
| R4 | 1膽 #4 + 4腳 | Bank MC #1 #7 (no debutant rule) | ❌ (#7 5th) | — |
| R5 | 1膽 #12 + 6腳 | **Add #8 (Win odds < 10)** = 1膽+7腳 | ✅ $207 | +$60 → −$3 net (vs −$150) |
| R5 | 1膽 #12 + 6腳 | B-trio ticket (swap #7 → #8) | ✅ $207 | $0 → **+$57 net** |
| R6 | 雙膽 #10 + #3, 3腳 | Single banker #10 + B-trio legs (3, 1, 8, 5, 12, 4) | ✅ $857 | +$120 → **+$707 net** |
| R6 | 雙膽 #10 + #3, 3腳 | Single banker #10, A's 4 legs (1膽+4腳) | ❌ (#12, #5 not in pool) | +$30 |
| R7 | 1膽 #3 + 4腳 | Add #7 | ✅ $358, but #7 was MC #9 at 20 | Not rule-reachable |
| R8 | 1膽 #10 + 5腳 | Full box of 6 (20 combos) | ✅ $663 | +$100 → **+$463 net** |
| R8 | 1膽 #10 + 5腳 | PASS (MC #1 < 30%, near-tie with #2) | — | **+$100 saved** |
| R9 | 1膽 #10 + 5腳 | Full box of 6 (20 combos) | ✅ $155 | +$100 → −$45 net |
| R9 | 1膽 #10 + 5腳 | PASS (MC #1 < 30%) | — | **+$100 saved** |
| R10 | 1膽 #1 + 4腳 | Add #11 and #5 | ✅ $1,018, but MC #7/#9 at 20/50 | Not rule-reachable |
| R11 | 1膽 #6 + 5腳 | Any rule | ❌ (banker 4th, #7 at 40) | — |

**Whole-card test of "add every Win-odds < 10 candidate (MC Place% ≤ 20%) to A's pool"** (R3 #6, R4 #12 + #14, R5 #8, R6 #8 + #5 + #12 + #4, R7 #10, R9 #2, R11 #1): $1,250 staked, 2 hits (R4, R5), $619 returned, **−$631** (vs −$880). R6 still misses because A's 雙膽拖 second banker #3 ran 4th. **All of this uses SP, not 11:00 odds.**

**Whole-card test of "full box of A's pool"**: $1,950 staked, 2 hits (R8, R9), $818 returned, **−$1,132**. Boxing helps only on Pattern A.

**Whole-card test of "PASS when MC #1 < 30%"** (R8, R9): saves $200 and loses no hits. A would have finished at **−$680**.

- **Fixable misses** (with a rule we could write): **R4 and R5** via the Win-odds < 10 rule ($619 for $150 extra stake), **R6** via B-trio's single-banker ticket with the same rule ($857), and **R8/R9** only as savings (a < 30% PASS, $200). All three market fixes are SP-contaminated on this card.
- **Unfixable misses**: **R1, R2** (longshot frames, $20,826 of Trio), **R3** (102/1 winner), **R7** (20/1 runner-up), **R10** (20/1 and 50/1 behind a winning banker) and **R11** (banker 4th + 40/1).

## Section 6: Key Moments

- **Best Bet**: **None hit. The best ticket on the card was B-trio R6: $857 on $150.** It banked MC #1 #10 SUNNY Q (3rd) and added all four Win-odds < 10 candidates (#8, #5, #12, #4). Two of them, #12 SUPREME VOYAGER (9.5) and #5 AURORA PHOENIX (9.4), ran 1–2. For A, the **least-bad call was the R4 debutant banker rule**. MC #1 #7 NOT USUAL DOUBLE (49.2%, 1 start) ran 5th, and A's replacement banker #4 CALIFORNIA WAVES (3.0 fav) placed 3rd.
- **Worst Bet**: **R5 −$150, the card's biggest stake, on a race the banker placed in.** Rule 8 extended the pool to 7 horses with #7 VOYAGE CAPTAIN (24.8% place, 14), which ran 6th. The 3rd favourite #8 GUTSY BRAVO (5.2) stayed out on MC 2.7% and won. The report itself said #8 had "the fastest-looking speed profile". B-trio swapped #7 for #8 and returned $207 on the same $150.
- **Most Frustrating**: **R8, the Sha Tin Trophy (G2): all three placers were legs, and Trio paid $663.** #7 LIGHT YEARS CHARM (MC #4) won, #6 PATCH OF THETA (MC #5 at 29) ran 2nd and #2 MY WISH (MC #3) ran 3rd. The 2.5 favourite banker #10 SKY JEWELLERY (MC 22.4%, 0.2pp clear of MC #2) finished 4th.
- **Biggest Surprise**: **R3 #13 GOOD GOOD won at 102/1.** MC rated it 0.3% to win, 13th of 14. MC's 43.4% banker #2 VICTOR SUPREME ran 2nd and the 2nd pick #5 ran 3rd. One horse cost a $3,767 Trio. Honourable mention: **R2 paid $15,215**, with 34/1, 16/1 and 71/1 placers, while the 2.3 favourite #8 ran 10th and MC's 43.6% banker ran 6th.
- **Best MC Call**: **R10 #1 PACKING FIGHTER**, MC 59.0% / 89.4%, won at 1.9. MC and the market agreed there. The best *divergent* call was **R8 #6 PATCH OF THETA**: MC called it 128% undervalued at 29 and it ran 2nd. It was the only one of 17 "> 100% undervalued" claims to place.

## Section 7: Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 1 | R10 (#1) |
| Banker 2nd-3rd | 4 | R3 (#2 2nd), R4 (#4 3rd), R5 (#12 3rd), R7 (#3 3rd) |
| Banker out of top 3 | 6 | R1 (7th), R2 (6th), R6 (#3 4th; #10 3rd), R8 (4th), R9 (5th), R11 (4th) |

**Banker strike rate (top 3): 5/11 = 45.5%** · **Banker win rate: 1/11 = 9.1%**

The MC #1 horses (the B banker) also placed **5/11** (R3, R5, R6, R7, R10), with **2 wins** (R7, R10). Their mean MC Win% was **38.4%** and mean MC Place% **72.4%**, against an actual place rate of 45.5%. **MC overstated the banker by ~27pp** (14-Oct +33pp, 11-Oct +41pp). **MC #1 ≥ 35% placed 4/6** (R3, R6, R7, R10 ✅; R2, R4 ❌, and R4 was a 1-start debutant). **Below 35% it placed 1/5** (R5 ✅). **Below 30% it went 0/2** (R8 22.4%, R9 29.6%). **The three-card record below 30% is 0/10.**

**The A banker differed from MC #1 in R4 and R7 (debutant rule) and R6 (2nd banker).** R4: A's #4 placed and MC #1 #7 ran 5th (**A +1**). R7: A's #3 ran 3rd and MC #1 #4 won (both placed). R6: MC #1 #10 placed, but the added 2nd banker #3 ran 4th (**A −1** on the banker count).

**MC #1 by market rank at SP:** rank 1–2: **5/7** (R3, R5, R6, R7, R10 ✅; R4, R8 ❌) · rank 3: **0/2** (R2, R9) · rank 4+: **0/2** (R1 at 9.0, R11 at 11). **The rank filter worked again: every MC #1 that the market did not have in its top 2 failed.** The ten-meeting totals are in the stratC review. **MC #2 placed 5/11** (R3, R4, R7, R9, R11).

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | 0/11 |
| All 3 in pool OR banker + 2 legs | 2/11 (R8, R9; both banker fails) |
| At least 2 placers in pool | 7/11 (R3, R4, R5, R7, R8, R9, R11) |
| Banker hit + pool gap | 5/11 (R3, R4, R5, R7, R10) |

**The pool held the frame in only 2/11 races**, the same failure as 14-Oct (2/9). The cause was different, though. **The 13 gap horses were MC #7–#13, with MC Win% 0.1–3.0%.** **Only 4 were under 10 at SP** (R4 #14 9.3, R5 #8 5.2, R6 #5 9.4, R6 #12 9.5). **Nine were 11/1 or longer, and eight were 20/1 or longer.** On 14-Oct the gaps were the market's 2nd–4th choices. Today most were outsiders that both the model and the market got wrong.

### 7c. MC-Market Divergence Outcomes

From each report's "Market" paragraph. "Correct" = an undervalued horse placed, or an overvalued horse did not. All prices are SP.

| Race | Undervalued (MC > mkt) → finish | Overvalued (MC < mkt) → finish |
|------|-------------------------------|------------------------------|
| R1 | #2 213% → 7th ❌ | **#13 → 3rd ❌** · #7 → 11th ✅ · #1 (fav) → 5th ✅ |
| R2 | #10 → 6th ❌ · #9 101% → 8th ❌ · **#2 → 2nd ✅** | #8 (2.3 fav) → 10th ✅ · #11 (2nd fav) → 5th ✅ |
| R3 | #3 179% → 11th ❌ | #9 (3.3 fav) 86% → 9th ✅ · #14 → 7th ✅ |
| R4 | #7 131% → 5th ❌ · #9 → 10th ❌ · #10 → 11th ❌ | #12 (3rd fav) → 7th ✅ · **#14 → 1st ❌** |
| R5 | #6 411% → 7th ❌ · #11 208% → 5th ❌ · #4 200% → 9th ❌ | **#12 (fav, "over-bet") → 3rd ❌** · **#8 → 1st ❌** · #9 → 4th ✅ |
| R6 | #1 305% → 6th ❌ | #8 (4.6 fav) 95% → 11th ✅ · #4 99% → 10th ✅ |
| R7 | **#3 (value 1.62) → 3rd ✅** · #1 (value 1.64) → 4th ❌ | **#4 (fav, value 0.81) → 1st ❌** · #10 (3rd fav) → 11th ✅ · #11 → 6th ✅ |
| R8 | #8 166% → 9th ❌ · **#6 128% → 2nd ✅** · #11 122% → 10th ❌ | **#2 (2nd fav) → 3rd ❌** |
| R9 | #10 → 5th ❌ · #3 301% → 6th ❌ · #9 207% → 9th ❌ | #12 96% → 4th ✅ · #2 (4th fav) → 11th ✅ |
| R10 | #4 398% → 9th ❌ · #2 518% → 13th ❌ | #14 (3rd fav) → 8th ✅ · #12 → 5th ✅ |
| R11 | #6 281% → 4th ❌ · #10 155% → 10th ❌ | #11 99% → 8th ✅ · **#13 (co-fav) → 2nd ❌** · **#8 (co-fav) → 1st ❌** · #1 → 5th ✅ |

**MC divergence accuracy: 21/50 (42.0%)**, up from 36.2% on 14-Oct. **Undervalued: 3/24 (12.5%).** **Overvalued: 18/26 (69.2%).** **Claimed edge > 100%: 1/17** (R8 #6). **Claimed edge > 200%: 0/9**, so the season record is **2/28**. **When MC opposed a horse the market had 1st–3rd at SP, that horse placed only 2/12** (R5 #8, R8 #7). This reverses 14-Oct's 7/7, and the three-card total is **14/26**. The market's favourites failed as often as MC's did today. SP favourites placed 6/11, and the 2.3, 3.3 and 4.6 favourites in R2, R3 and R6 ran 10th, 9th and 11th. **Near-zero blind spot:** MC Win% < 4% at SP ≤ 6 placed **1/3** (R5 #8 ✅; R4 #12, R6 #8 ❌). At SP ≤ 8 it placed **1/6**, and at SP < 10 **4/12** (R4 #14, R5 #8, R6 #5, R6 #12 ✅). Under the < 3% / SP ≤ 6 definition: 1/2, season **15/22**.

### 7d. SCMP +Excuses Flag Performance

**No data. SCMP was unavailable for this retrospective run**, so no `+excuses`, `+trial`, `+form`, `+draw` or negative flags were scored. **+Excuses hit rate (top 3): n/a (0 flags).** The five-card ≤ 8 record stays at **31/57 (54.4%)**.

### 7e. Divergence Override Assessment

**No discretionary override was applied.** All tickets are rule output, and with all SCMP factors at 0 the only rules that changed tickets were structural:

| Rule | Race | Effect | Result |
|------|------|--------|--------|
| Debutant banker rule (< 2 starts) | R4 (#7 → #4), R7 (#4 → #3) | Banker moved to the next eligible horse | R4: **saved the banker** (#7 5th, #4 3rd). R7: neutral (#4 won, #3 3rd). Both still missed on gaps |
| 雙膽拖 (2nd horse Adj Place ≥ 63%) | R6 (#10 + #3) | 3 combos, $30 | #3 ran 4th. A single-banker ticket with A's legs also misses (gaps #12, #5), so the rule **cost nothing and saved $30** |
| Rule 8 (Adj Place ≥ 20%) | R5 (+#7) | +$50 | #7 6th. The gap was #8, at 12.8% place |
| Mode A tight pool (5) | R2, R3, R4, R7, R10 | $60 tickets vs B's $100 | **Saved $200** against B. No race outcome changed |
| Mode D PASS (< 20%) | — | Did not fire (R8 22.4% was lowest) | R8 banker failed, −$100 |
| Rule 9 (no hard exclusion at ≤ 15) | R2 (checked) | No extension | — |

**Cost/benefit:** structure saved $220 against B, and every outcome was the same. **Lesson:** without SCMP, Strategy A is just "MC top 5–7 with a debutant filter". This card shows the debutant filter working (R4) but no edge in pool selection.

## Section 8: Learnings

### What Worked

- **Strong MC #1s held.** MC #1 ≥ 35% placed **4/6**, and the MC #1 that was also market rank 1–2 placed **5/7**. R10 #1 (59.0%) won at 1.9, R7 #4 (36.8%) won, R3 #2 (43.4%) ran 2nd and R6 #10 (37.8%) ran 3rd.
- **The debutant banker rule earned its keep in R4.** MC #1 #7 (49.2%, 1 start) ran 5th, and the replacement banker #4 placed. In R7 the demoted debutant #4 won, but the replacement #3 also placed, so the rule cost nothing.
- **MC was right to oppose the market's short-priced horses it rated poorly.** Overvalued calls went **18/26 (69%)**: R2 #8 (2.3 fav) 10th, R3 #9 (3.3 fav) 9th, R6 #8 (4.6 fav) 11th, R10 #14 (6.1) 8th.
- **B-trio's Win-odds < 10 step: 4/11 candidates placed** (R4 #14, R5 #8, R6 #5, R6 #12). That produced 2 hits and −$26, B-trio's best card of the season. The evidence is **SP-contaminated** (see the caveat).
- **Smaller tickets limited the damage.** Mode A's 5-horse pools and the R6 雙膽拖 kept A at −$880 against B's −$1,100.

### What Didn't Work

- **0/11, the second blank card in a row and the first at Sha Tin.** Cumulative ROI fell from −42.1% to **−46.8%**.
- **Sub-30% bankers failed again: R8 (22.4%) and R9 (29.6%) were both Pattern A**, with every placer in the legs. The three-card record is **0/10**.
- **Pool gaps were mostly deep outsiders.** 9 of 13 gap horses were 11/1+, and all had MC Win% ≤ 3.0%. Three frames paid $3,767–$15,215 on placers MC ranked #8–#13, and nothing in either model reaches them.
- **MC "undervalued" calls went 3/24.** "> 200%" calls went 0/9 (season **2/28**). The analyzer's own Place bets on these overlays (R5 #6, R6 #1, R9 #3, R10 #4/#2, R11 #6/#10) all lost.
- **R5's Rule 8 extension (+$50) added a 24.8% horse that ran 6th** and left out the 3rd favourite, which won.
- **The process broke down.** The scheduled run was missed, so the card was played without SCMP and on SP. This review cannot tell us whether Strategy A's adjustment layer helps.

### Strategy Adjustments

- [ ] **Make the pre-race run fail loudly.** A missed cron run costs the SCMP layer permanently, because SCMP rolls to the next card. Add a check (for example, the 23:45 review job flags any meeting with no `trio_strategy_*` reports timestamped before the first race) so the gap is noticed the same day.
- [ ] **PASS Competitive races where MC #1 < 30%.** The three-card record is **0/10** (11-Oct R1, R3, R5, R8; 14-Oct R1, R5, R8, R9; 19-Oct R8, R9), and this card it would have saved $200 for no lost hits. Count the full-season record from the stratC banker tables before turning it into a rule.
- [ ] **Treat a near-tie at MC #1 (gap ≤ 1pp) as no banker.** R8 (22.4% vs 22.2%) is the third such case after 11-Oct R3/R5. Test "PASS or full box" against the season.
- [ ] **Backtest Rule 10 (Win-odds < 10 must-include) on 11:00 odds only.** On this card the add version scores −$631 against −$880 and the B-trio swap version −$26, but both use SP. Score 14-Oct, 11-Oct and earlier cards, which had real 11:00 snapshots, before adopting it. Exclude 19-Oct from the backtest.
- [ ] **Do not chase longshot frames.** R1–R3 ($24,593 of Trio) would need 11/1–102/1 horses with MC < 2%. No pool-widening rule should be tuned to these.
- [ ] **Scraper: Win/Quinella comma-thousands truncation** (R1 Q $1, R2 Q $2, R3 Win $1) and the R8 class label. These are code changes and not part of this review.

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | R10 | 0/1 | $60 | $0 | −$60 | −100.0% |
| MEDIUM-HIGH | R3 | 0/1 | $60 | $0 | −$60 | −100.0% |
| MEDIUM | R1, R2, R6, R9, R11 | 0/5 | $390 | $0 | −$390 | −100.0% |
| LOW / LOW-MEDIUM / MEDIUM-LOW | R4, R5, R7, R8 | 0/4 | $370 | $0 | −$370 | −100.0% |
| **TOTAL** | **11** | **0/11** | **$880** | **$0** | **−$880** | **−100.0%** |

**No confidence band hit.** The HIGH (R10) and MEDIUM-HIGH (R3) races both had the banker placing and lost to 20/1–102/1 horses. **By classification**, Dominant (Mode A: R2, R3, R4, R6, R7, R10) went **0/6, −$330**, and Competitive (R1, R5, R8, R9, R11) went **0/5, −$550**. Over seven cards, Dominant is **10/39, −$231** and non-Dominant is **3/33, −$3,103**. Dominant is now below break-even for the first time.

## Section 10: Running Total (Season Cumulative)

### 10a. Meeting-by-Meeting P&L

| Meeting | Date | Venue | Races | Hits | Staked | Returned | P&L | ROI |
|---------|------|-------|-------|------|--------|----------|-----|-----|
| 1 | 2026-09-06 | ST | 9 | 2 | $870 | $791 | −$79 | −9.1% |
| 2 | 2026-09-09 | HV | 8 | 0 | $640 | $0 | −$640 | −100.0% |
| 3 | 2026-09-13 | ST | 10 | 1 | $870 | $476 | −$394 | −45.3% |
| 4 | 2026-09-16 | HV | 8 | 0 | $850 | $0 | −$850 | −100.0% |
| 5 | 2026-09-23 | HV | 9 | 2 | $900 | $1,115 | +$215 | +23.9% |
| 6 | 2026-09-27 | ST | 11 | 2 | $950 | $383 | −$567 | −59.7% |
| 7 | 2026-10-01 | ST | 11 | 4 | $790 | $887 | +$97 | +12.3% |
| 8 | 2026-10-04 | ST | 11 | 2 | $1,130 | $1,264 | +$134 | +11.9% |
| 9 | 2026-10-07 | HV | 9 | 2 | $790 | $230 | −$560 | −70.9% |
| 10 | 2026-10-11 | ST | 10 | 3 | $1,060 | $622 | −$438 | −41.3% |
| 11 | 2026-10-14 | HV | 9 | 0 | $1,120 | $0 | −$1,120 | −100.0% |
| **12** | **2026-10-19** | **ST** | **11** | **0** | **$880** | **$0** | **−$880** | **−100.0%** |
| **TOTAL** | | | **116** | **18** | **$10,850** | **$5,768** | **−$5,082** | **−46.8%** |

> The 06-Sep figures use the §10e convention (9 races / 2 hits / $870). Meeting 5 was a post-meeting blind run (no SCMP) and is included for tracking. Meeting 9 stake is net of the $30 R9 refund. Meeting 10 excludes the R8 PASS. Meeting 11 stake is net of the $90 R5 refund. **Meeting 12 is a retrospective blind run (generated 20-Oct, final-SP odds, no SCMP).** Like Meeting 5, it is included for tracking.

### 10b. Cross-Meeting Banker Performance

| Meeting | Banker Top 3 | Rate |
|---------|--------------|------|
| 2026-09-06 ST | 3/9 | 33.3% |
| 2026-09-09 HV | 4/8 | 50.0% |
| 2026-09-13 ST | 3/10 | 30.0% |
| 2026-09-16 HV | 6/8 | 75.0% |
| 2026-09-23 HV | 5/9 | 55.6% |
| 2026-09-27 ST | 5/11 | 45.5% |
| 2026-10-01 ST | 5/11 | 45.5% |
| 2026-10-04 ST | 6/11 | 54.5% |
| 2026-10-07 HV | 5/9 | 55.6% |
| 2026-10-11 ST | 3/10 | 30.0% |
| 2026-10-14 HV | 3/9 | 33.3% |
| **2026-10-19 ST** | **5/11** | **45.5%** |
| **Combined** | **53/116** | **45.7%** |

### 10c. Venue Breakdown

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
|-------|----------|-------|------|--------|----------|-----|-----|--------------|
| **Sha Tin** | **7** | **73** | **14** | **$6,550** | **$4,423** | **−$2,127** | **−32.5%** | **30/73 (41.1%)** |
| Happy Valley | 5 | 43 | 4 | $4,300 | $1,345 | −$2,955 | −68.7% | 23/43 (53.5%) |

**Sha Tin's first blank.** The ST hit rate falls from 22.6% to 19.2%. ST remains far better than HV on ROI, but its banker rate (41.1%) is still the weaker of the two.

### 10d. Season Trajectory

| Metric | 09-06 | 09-09 | 09-13 | 09-16 | 09-23 | 09-27 | 10-01 | 10-04 | 10-07 | 10-11 | 10-14 | **10-19** | Trend |
|--------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-----------|-------|
| Hit rate (meeting) | 22.2% | 0.0% | 10.0% | 0.0% | 22.2% | 18.2% | 36.4% | 18.2% | 22.2% | 30.0% | 0.0% | **0.0%** | → |
| Hit rate (cumulative) | 22.2% | 11.8% | 11.1% | 8.6% | 11.4% | 12.7% | 16.7% | 16.9% | 17.4% | 18.8% | 17.1% | **15.5%** | ↓ |
| Cumulative P&L | −$79 | −$719 | −$1,113 | −$1,963 | −$1,748 | −$2,315 | −$2,218 | −$2,084 | −$2,644 | −$3,082 | −$4,202 | **−$5,082** | ↓ |
| Cumulative ROI | −9.1% | −47.6% | −46.8% | −60.8% | −42.3% | −45.6% | −37.8% | −29.8% | −33.9% | −34.8% | −42.1% | **−46.8%** | ↓ |
| Banker top 3 (meeting) | 33.3% | 50.0% | 30.0% | 75.0% | 55.6% | 45.5% | 45.5% | 54.5% | 55.6% | 30.0% | 33.3% | **45.5%** | ↑ |
| Banker top 3 (cumulative) | 33.3% | 41.2% | 37.0% | 45.7% | 47.7% | 47.3% | 47.0% | 48.1% | 48.8% | 46.9% | 45.7% | **45.7%** | → |

### 10e. Cumulative A/B Comparison

| Meeting | Date | Venue | A Hits | A P&L | A ROI | B Hits | B P&L | B ROI | Winner |
|---------|------|-------|--------|-------|-------|--------|-------|-------|--------|
| 1 | 2026-09-06 | ST | 2/9 | −$79 | −9.1% | 2/9 | −$109 | −12.1% | A |
| 2 | 2026-09-09 | HV | 0/8 | −$640 | −100.0% | 0/8 | −$800 | −100.0% | Tie |
| 3 | 2026-09-13 | ST | 1/10 | −$394 | −45.3% | 1/10 | −$524 | −52.4% | A |
| 4 | 2026-09-16 | HV | 0/8 | −$850 | −100.0% | 0/8 | −$800 | −100.0% | B (stake only) |
| 5 | 2026-09-23 | HV | 2/9 | +$215 | +23.9% | 2/9 | +$215 | +23.9% | Tie (identical tickets) |
| 6 | 2026-09-27 | ST | 2/11 | −$567 | −59.7% | 2/11 | −$717 | −65.2% | A (stake only) |
| 7 | 2026-10-01 | ST | 4/11 | +$97 | +12.3% | 3/11 | −$471 | −42.8% | A (R6 hit + stake) |
| 8 | 2026-10-04 | ST | 2/11 | +$134 | +11.9% | 2/11 | +$164 | +14.9% | B (stake only, $30) |
| 9 | 2026-10-07 | HV | 2/9 | −$560 | −70.9% | 3/9 | −$276 | −32.1% | B (R3 hit, $284) |
| 10 | 2026-10-11 | ST | 3/10 | −$438 | −41.3% | 2/11 | −$845 | −76.8% | A (R9 hit + PASS + 雙膽拖, $407) |
| 11 | 2026-10-14 | HV | 0/9 | −$1,120 | −100.0% | 0/9 | −$830 | −100.0% | B (stake only, $290) |
| **12** | **2026-10-19** | **ST** | **0/11** | **−$880** | **−100.0%** | **0/11** | **−$1,100** | **−100.0%** | **A (stake only, $220)** |
| **TOTAL** | | | **18/116** | **−$5,082** | **−46.8%** | **17/117** | **−$6,093** | **−52.6%** | **A** |

*B = review-spec Strategy B (MC top 6, 1膽+5腳, $100 flat; 07-Oct R9 $60 and 14-Oct R5 $30 net of refunds). B-trio (the reports' own Strategy B) this meeting: **2/11 (R5 $207, R6 $857), $1,090 staked, $1,064 returned, −$26, −2.4%**. It was the best of the three tickets for the second card running, but on SP-based candidates. Season B-trio: **28/117, $14,370 staked, $7,032 returned, −$7,338, −51.1%**.*

| Cumulative Metric | Strategy A | Strategy B | Delta (B − A) |
|-------------------|-----------|-----------|---------------|
| Total meetings | 12 | 12 | — |
| Total races | 116 | 117 | +1 |
| Hits (rate) | 18/116 (15.5%) | 17/117 (14.5%) | −1 |
| Total staked | $10,850 | $11,590 | +$740 |
| Total returned | $5,768 | $5,497 | −$271 |
| **Cumulative P&L** | **−$5,082** | **−$6,093** | **−$1,011** |
| **Cumulative ROI** | **−46.8%** | **−52.6%** | **−5.8 pp** |
| Banker top 3 rate | 53/116 (45.7%) | 53/117 (45.3%) | 0 |

This card takes cumulative ROI from −42.1% to **−46.8%**. It is the second consecutive blank and the first at Sha Tin. A won the session by $220 purely on stake, so **A's season lead returns to $1,011**: about $740 from stake and $271 from returns. The A/B comparison now leans to A on every metric, but it is still not a test of the SCMP layer, and this card had no SCMP at all. Both strategies share the same banker in almost every race, and **the banker (45.7% top 3 over 116 races against an MC Place% near 70%) remains the season's bottleneck**. **The structural finding of this card is a warning against over-fitting 14-Oct.** The market-backed near-zero gap pattern appeared in only 3 races (R4, R5, R6). In the other five gap races the placers were 11/1 to 102/1 outsiders that no rule reaches. The one cheap, evidence-backed fix is the sub-30% banker PASS (0/10 over three cards).

## Section 11: A/B Strategy Comparison

### 11a. How Strategy B was derived

For each race, the **MC SIMULATION (raw)** table in `trio_strategy_20261019_ST_RN.md` was sorted by MC Win%. The first 6 horses form the pool and MC #1 is the banker: 1膽+5腳, 10 combos, $100, every race. A hit needs the banker in the top 3 and all 3 placers in the 6-horse pool. No race had a tie at MC #6/#7. There were no scratchings. **R8 had a near-tie at MC #1** (#10 22.4%, #8 22.2%). #10 is the banker by rank. This is not the same as the "STRATEGY B (MC-only)" block in each report, which is tracked as B-trio.

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | Strat A Banker | Strat B Pool (MC top 6) | Strat B Banker (MC #1) | Result (1→2→3) | A Hit? | B Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|--------------|----------------|-------------------------|------------------------|----------------|--------|--------|--------|----------|----------|---------|---------|----------------|
| R1 | 2,8,6,1,4,5 | #2 | 2,8,6,1,4,5 | #2 | 6→11→13 | ❌ | ❌ | $5,611 | $0 | $0 | $100 | $100 | Same pool & banker |
| R2 | 10,9,2,8,11 | #10 | 10,9,2,8,11,3 | #10 | 7→2→5 | ❌ | ❌ | $15,215 | $0 | $0 | $60 | $100 | A Mode A 5-horse pool; B +#3 (12th) |
| R3 | 2,5,3,11,9 | #2 | 2,5,3,11,9,6 | #2 | 13→2→5 | ❌ | ❌ | $3,767 | $0 | $0 | $60 | $100 | A Mode A; B +#6 (6th); #13 in neither |
| R4 | 7,4,13,3,11 | #4 | 7,4,13,3,11,10 | #7 | 14→11→4 | ❌ | ❌ | $412 | $0 | $0 | $60 | $100 | **Banker: A=#4 (debutant swap, 3rd), B=#7 (5th)**; #14 in neither |
| R5 | 12,6,2,11,4,10,7 | #12 | 12,6,2,11,4,10 | #12 | 8→10→12 | ❌ | ❌ | $207 | $0 | $0 | $150 | $100 | A +#7 (Rule 8, 6th); #8 in neither |
| R6 | 10,3 / 1,6,2 | #10 + #3 | 10,3,1,6,2,11 | #10 | 12→5→10 | ❌ | ❌ | $857 | $0 | $0 | $30 | $100 | A 雙膽拖 3 combos; #3 4th. #12, #5 in neither |
| R7 | 4,3,1,2,8 | #3 | 4,3,1,2,8,6 | #4 | 4→7→3 | ❌ | ❌ | $358 | $0 | $0 | $60 | $100 | **Banker: A=#3 (debutant swap, 3rd), B=#4 (won)**; #7 in neither |
| R8 | 10,8,2,7,11,6 | #10 | 10,8,2,7,6,11 | #10 | 7→6→2 | ❌ | ❌ | $663 | $0 | $0 | $100 | $100 | Same pool & banker; both Pattern A |
| R9 | 10,8,1,3,6,11 | #10 | 10,8,1,3,6,11 | #10 | 6→1→8 | ❌ | ❌ | $155 | $0 | $0 | $100 | $100 | Same pool & banker; both Pattern A |
| R10 | 1,7,4,2,14 | #1 | 1,7,4,2,14,3 | #1 | 1→11→5 | ❌ | ❌ | $1,018 | $0 | $0 | $60 | $100 | A Mode A; B +#3 (10th) |
| R11 | 6,13,8,10,5,9 | #6 | 6,13,8,10,5,9 | #6 | 8→13→7 | ❌ | ❌ | $483 | $0 | $0 | $100 | $100 | Same pool & banker |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | 11 | 11 | 0 |
| Hits | 0/11 (0.0%) | 0/11 (0.0%) | 0 |
| Total staked | $880 | $1,100 | +$220 |
| Total returned | $0 | $0 | $0 |
| **Net P&L** | **−$880** | **−$1,100** | **−$220** |
| **ROI** | −100.0% | −100.0% | 0.0 pp |
| Banker top 3 rate | 5/11 (45.5%) | 5/11 (45.5%) | 0 |

*B-trio (report's own B, for reference): **2/11 (R5 $207, R6 $857), $1,090 staked, $1,064 returned, −$26, −2.4%**. Its banker was MC #1 in all races, and it placed 5/11. Its Win-odds < 10 step swapped R5 #7 → #8 (won) and added R6 #8, #5, #12 and #4 (#12 won, #5 2nd). It also swapped R4 #11 → #12 and #3 → #14. #14 won, **but the swap removed #11, which ran 2nd**. B-trio's R4 banker #7 failed anyway.*

### 11d. Where A and B Diverged

| Race | What Differed | A Result | B Result | Impact | Root cause |
|------|---------------|----------|----------|--------|------------|
| R2 | Pool: A 5 horses, B +#3 | MISS ❌ | MISS ❌ | A +$40 | Mode A tight pool (Dominant, 43.6%) |
| R3 | Pool: A 5 horses, B +#6 | MISS ❌ | MISS ❌ | A +$40 | Mode A tight pool (Dominant, 43.4%) |
| R4 | Banker: A=#4, B=#7; B +#10 | MISS ❌ (Pattern B) | MISS ❌ (Pattern C) | A +$40 | Debutant banker rule. A's banker placed, B's did not. Both missed #14 |
| R5 | Pool: A +#7 (7 horses) | MISS ❌ | MISS ❌ | B +$50 | Rule 8 (#7 Adj Place 24.8%) |
| R6 | Structure: A 雙膽拖 #10 + #3, 3 legs | MISS ❌ (Pattern C) | MISS ❌ (Pattern B) | A +$70 | 2nd-banker rule (#3 74.0%). #3 ran 4th, but B also missed (#12, #5) |
| R7 | Banker: A=#3, B=#4; B +#6 | MISS ❌ | MISS ❌ | A +$40 | Debutant banker rule. Both bankers placed; both missed #7 |
| R10 | Pool: A 5 horses, B +#3 | MISS ❌ | MISS ❌ | A +$40 | Mode A tight pool (Dominant, 59.0%) |

Net: **A +$220**, all from stake. No divergence changed an outcome. R1, R8, R9 and R11 were identical tickets.

### 11e. Session Verdict

**A won by $220 (−$880 vs −$1,100), purely on stake.** Neither ticket hit. With SCMP missing, A's adjustment layer was switched off, so the only differences were structure: Mode A's 5-horse pools (+$200), the 雙膽拖 in R6 (+$70) and the R5 Rule 8 leg (−$50). **The one rule that changed a banker outcome was the debutant rule in R4,** where A's banker placed and B's MC #1 debutant ran 5th. That race still missed on the 9.3 gap #14. So the result is **structure, not prediction**: A's tighter tickets lose less when nothing hits. **Variance played a large part.** Five frames (R1, R2, R3, R7, R10) included 20/1+ horses that MC rated at ≤ 3%, and $24,593 of Trio in R1–R3 was unreachable. The **systematic** element is the banker. Both Pattern A misses (R8, R9) came from MC #1 horses below 30%, and that group is now 0/10 over three cards.
