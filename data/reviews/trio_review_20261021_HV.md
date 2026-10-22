# Trio Post-Race Review — Happy Valley | 2026-10-21

**Meeting 13 of the 2026/27 season.** A 9-race Wednesday night card on the Turf "B" course, going **Good** throughout. Results: `data/historical/results_20261021_HV.json`. Bet records: `data/reports/trio_strategy_20261021_HV_R1–R9.md`.

> **Data notes for this meeting — read first**
> - **This was a live pre-race run.** All 9 reports were generated on race day, before R1, with **SCMP loaded** (Star Form, TIR, Vet and Trackwork parsed). SCMP odds columns were unlabelled and the QP/Q matrix could not be mapped in any race, so the QP cross-check was skipped. **Unlike 19-Oct, this card does test Strategy A's SCMP adjustment layer.**
> - **Odds in the reports are the HKJC 11:00–11:01 HKT morning pool**, not SP. Every "Win odds < 10" decision (B-trio Step B, Rule 9) used those morning prices. This review shows both the **11:00 odds** and the **final SP** from the results file. Market-rank figures marked "(SP)" are hindsight.
> - **Results were scraped fresh** (`tools/scrape-meeting.ts --date=2026-10-21 --venue=HV`, DT ✓, TT —). Trio (per $10): R1 $800 · R2 $7,587 · R3 $408 · R4 $2,228 · R5 $1,613 · R6 $556 · R7 $213 · R8 $910 · R9 $469. **Every comma-thousands Trio value parsed in full**, and the Tierce/Trio ratios (3.3–6.6) fit the finishing SPs. R2 went 49/4.7/24, R4 2.1/22/48 and R5 9.6/3.4/31. No Trio dividend looks unrealistically low, so no HKJC cross-check was needed.
> - **Scraper anomaly in another pool (not used here, not edited):** R2 Quinella **$1**. This is a truncated comma-thousands value: the race had a 49/1 winner and a $491.50 Win dividend.
> - **Scoring.** **Strategy A** is scored exactly as written in each report. **R9 was a Mode D PASS ($0)**, and its Mode C shadow ticket is tracked separately. **Strategy B** follows the review-skill definition: MC top 6 by raw Win%, MC #1 banker, 1膽+5腳, $100/race, all 9 races. The reports' own "Strategy B (MC-only)" ticket is tracked separately as **B-trio**. "Banker top 3" counts a race only if **every** banker placed (R6 was 雙膽拖). There were no scratchings.

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played | **8 (R1–R8; R9 PASS)** |
| Hit rate | **0/8 (0.0%)** |
| Total staked | $790 |
| Total returned | $0 |
| **Net P&L** | **−$790** |
| **ROI** | **−100.0%** |
| Session Result | **LOSS** |

**This is the third blank card in a row, and Happy Valley's fourth blank in six meetings.** **The one race where A's pool held the whole frame was R9, and A passed it.** The Mode D shadow ticket (banker #4 + 6 legs, $150) would have returned **$469**. In the eight races A played, the frame always contained at least one horse outside the pool. **8 of the 10 gap horses were MC #7–#9, at MC Win% 1.3–5.3%.** On 19-Oct the gaps were 20/1–102/1 outsiders, but today most were the next horses in MC's own list. MC #1 placed **5/9** with **4 wins**, but **both MC #1s above 35% failed** (R1 46.5% 4th, R7 37.8% 7th). Meanwhile **four of the five below 30% placed**. **B-trio hit R6 ($556)**, the only hit on any ticket, and finished 1/9, −$704.

## Section 2: Race-by-Race Cross-Reference

Result column: **bold** = top-3 finisher NOT in the Strategy A pool. Odds are 11:00 → SP.

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
| R1 | C4 1650m | A→6 (1膽+5腳) | #2 | 6, 11, 7, 10, 1 | 6→11→**5** | MISS ❌ | $800 | $0 | −$100 | Banker fail (#2 4th, MC 46.5%) + gap #5 (MC #8, 11→21) |
| R2 | C5 1200m | B (1膽+5腳) | #5 | 11, 1, 4, 3, 10 | **6**→4→**2** | MISS ❌ | $7,587 | $0 | −$100 | Banker fail (#5 9th, 22→45) + 2 gaps (#6 MC #8 at 49; #2 MC #11 at 24) |
| R3 | C4 1650m | A→6 (1膽+5腳) | #4 | 3, 8, 1, 6, 5 | 3→8→**10** | MISS ❌ | $408 | $0 | −$100 | Banker fail (#4 9th, MC 34.3%) + gap #10 (MC #7, 10.0→10) |
| R4 | C4 1200m | B (1膽+5腳) | #4 | 3, 1, 5, 10, 7 | 4→7→**8** | MISS ❌ | $2,228 | $0 | −$100 | Banker hit (won at 2.1), gap #8 (MC #12, 0.8%, 19→48) |
| R5 | C4 1000m | B+ (1膽+6腳) | #3 | 1, 2, 4, 9, 11, 10 | 10→3→**6** | MISS ❌ | $1,613 | $0 | −$150 | Banker hit (2nd), gap #6 (MC #8, debutant +trial, 18→31) |
| R6 | C2 1000m | B 雙膽拖 (2膽+4腳) | #1, #4 | 8, 2, 10, 5 | 1→4→**9** | MISS ❌ | $556 | $0 | −$40 | **Both bankers 1–2**, gap #9 (MC #8, 1.3%, 6.8→7.4, +excuses) |
| R7 | C4 1200m | A+R9 (1膽+5腳) | #5 | 3, 10, 9, 4, 2 | 2→10→**11** | MISS ❌ | $213 | $0 | −$100 | Banker fail (#5 7th, MC 37.8%) + gap #11 (MC #9, 6.8→7.5) |
| R8 | C3 1200m | B (1膽+5腳) | #2 | 12, 1, 8, 6, 3 | 12→**5**→**4** | MISS ❌ | $910 | $0 | −$100 | Banker fail (#2 4th; **MC #1 #12 won as a leg**) + 2 gaps (#5 MC #7, 7.5→4.7; #4 MC #9, 18→24) |
| R9 | C3 1650m | **D: PASS** | (#4 shadow) | (10, 1, 2, 9, 3, 5) | 4→5→2 | PASS | $469 | $0 | $0 | **Shadow ticket would have HIT ($469 on $150)** |

"A→6" = Mode A widened to 6 by the Adj Place% ≥ 25% must-include rule. "B+" = R5 Mode B widened to 7 by Reminder 9 (#10 SUPER SIXTY, 8.4, kept out only by its −injury30d flag). "A+R9" = R7 Mode A 5 plus #2 MALPENSA through Rule 9 (−injury30d at 10). R6 used 雙膽拖 because #4 had Adj Place% 70.9% (≥ 63%). R9 was Wide open (top Adj Win% 19.2% < 20%).

## Section 3: Hits Analysis

**No hits.** The R9 shadow ticket is the one A ticket that would have paid. The three Pattern B races, where the banker placed, were the closest live tickets:

| Race | Banker → finish | Legs that placed | Missing horse | MC rank (Win% / Place%) | 11:00 → SP | SCMP flag | Trio |
|------|-----------------|------------------|---------------|-------------------------|------------|-----------|------|
| R4 | #4 VIRTUS GLORY (3.1 fav) → **1st** | #7 MASTER PHOENIX 2nd (MC #5, −injury30d, 13→22) | #8 FLYING TING LOK **3rd** | #12 (0.8% / 3.9%) | 19 → **48** | — | $2,228 |
| R5 | #3 GEORGIAN SIGMA → **2nd** | #10 SUPER SIXTY **won** (Reminder 9 add) | #6 FLOW RIDER **3rd** | #8 (4.2% / 16.6%) | 18 → 31 | **+trial** (debutant, "good 2nd in Conghua trial") | $1,613 |
| R6 | #1 BOTTOMUPTOGETHER → **1st** · #4 HORSEPOWER → **2nd** | — (雙膽拖) | #9 GLOWING PRAISES **3rd** | #8 (1.3% / 8.9%) | **6.8** → 7.4 | **+excuses** (steadied 900m) | $556 |

**R9 shadow (not bet):**

| Horse | Role | 11:00 → SP | MC Win% (rank) | Adj Place% | Result |
|-------|------|------------|----------------|------------|--------|
| #4 SOLID WIN | 膽 (Banker) | 11 → 6.4 | 17.2% (#1) | 45.6% | **1st** |
| #5 RIDING TOGETHER | 腳 (7th horse, Mode C) | 16 → 15 | 8.6% (#7) | 28.9% | **2nd** |
| #2 POPE CODY | 腳 | 5.6 → 3.1 | 12.8% (#4) | 38.9% | **3rd** |

The shadow worked because Mode C uses a 7-horse pool, which kept MC #7 #5 (+excuses). Both B's top 6 and B-trio's swap (#11 for #5) lost it. **Shadow return: $469 on $150, +$319.** The PASS rule cost A that profit.

## Section 4: Miss Classification

8 misses in played races. **0 Pattern A, 3 Pattern B, 5 Pattern C.** R9 (PASS) is excluded.

### Pattern A: Banker Fail — All 3 Placers Already in Legs (0/8)

**None.** In every race where A's banker failed, at least one placer was also outside the pool. **Combined Pattern A missed return: $0.**

### Pattern B: Banker Hit — Pool Gap (3/8)

| Race | Banker | Placed legs | Pool gap | Gap MC rank | Gap 11:00 → SP | Reserve status |
|------|--------|-------------|----------|-------------|----------------|----------------|
| R4 | #4 1st | #7 2nd | **#8 FLYING TING LOK 3rd** | #12 of 12 (0.8%) | 19 → 48 | Not considered. Last six runs 14-10-12-5-12-14 |
| R5 | #3 2nd | #10 1st | **#6 FLOW RIDER 3rd** | #8 (4.2%) | 18 → 31 | Debutant, +trial (Adj Place 18.6%). Ranked 7th by Adj Win%, just outside the 7-horse pool |
| R6 | #1 1st, #4 2nd | — | **#9 GLOWING PRAISES 3rd** | #8 (1.3%) | 6.8 → 7.4 | 4th favourite at 11:00. **B-trio Win-odds < 10 candidate (added)**. +excuses |

**Pattern B was 3/8, and two of the three gaps were MC #8.** R6 is the cheapest fix on the card: a 5th leg in the 雙膽拖 costs $10.

### Pattern C: Banker Fail + Pool Gap (5/8)

| Race | Banker (pos, 11:00 → SP) | Gap horse(s) | Gap MC rank (Win%) | Gap 11:00 → SP | Note |
|------|--------------------------|--------------|--------------------|----------------|------|
| R1 | #2 (4th, 4.4 → 5.6) | #5 WELL ENOUGH 3rd | #8 (1.9%) | 11 → 21 | MC 46.5% banker, "undervalued 105%". Legs #6 (won) and #11 (+trial, 2nd) placed. #5 had +excuses |
| R2 | #5 (9th, 22 → 45) | #6 VERBIER 1st, #2 CASA PRIMO 3rd | #8 (5.2%), #11 (2.9%) | 23 → 49, 32 → 24 | **MC "299% undervalued" banker at 22** was Wide open on raw MC (18.1%). **+excuses (+2) lifted it into Competitive**, so the race was played. Trio $7,587 |
| R3 | #4 (9th, 5.6 → 8.4) | #10 FORTUNE STAR 3rd | #7 (2.5%) | 10 → 10 | Legs #3 (MC #2, "undervalued 109%") won and #8 ran 2nd. The banker drifted 50% |
| R7 | #5 (7th, 5.8 → 4.8) | #11 FORZA LEADER 3rd | #9 (3.1%) | 6.8 → 7.5 | Rule 9 leg #2 (−injury30d) **won** and #10 ran 2nd. #11 was in B-trio's pool, but its banker was the same #5 |
| R8 | #2 (4th, 12 → 9.1) | #5 GREATER BAE 2nd, #4 JUBILANT WINNER 3rd | #7 (5.3%), #9 (3.7%) | 7.5 → 4.7, 18 → 24 | **+excuses moved the banker from MC #1 #12 (won) to #2.** #5 was the report's "20%-variant" leg (Adj Place 21.5%) |

**Combined Pattern C Trio value: $9,918**, of which R2 is $7,587. **R1, R3, R7 and R8 all failed on the banker, and each also had a gap at MC #7–#9.** Fixing the gap alone would not have saved any of them.

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R1 | 1膽 #2 + 5腳 | Bank MC #2 #6 (won), same legs | ❌ (#5 still out) | — |
| R1 | 1膽 #2 + 5腳 | Full box of MC top 8 (56 combos) | ✅ $800 | +$460 → +$240 net. Not a sensible rule |
| R2 | 1膽 #5 + 5腳 | **PASS on raw MC (18.1% < 20%)** | — | **+$100 saved** |
| R3 | 1膽 #4 + 5腳 | Add #10 (10.0, MC #7) | ❌ (banker 9th) | — |
| R3 | 1膽 #4 + 5腳 | Full box of 7 (35 combos) | ✅ $408 | +$250 → +$58 net |
| R4 | 1膽 #4 + 5腳 | Add #8 | ✅ $2,228, but #8 was MC #12 at 19→48 | Not rule-reachable |
| R5 | 1膽 #3 + 6腳 | **Add #6 FLOW RIDER (+trial debutant, MC #8)** = 1膽+7腳 | ✅ $1,613 | +$60 → **+$1,403 net** (vs −$150) |
| R5 | 1膽 #3 + 6腳 | MC top 8 (B8: 3, 1, 2, 4, 10, 11, 9, 6) | ✅ $1,613 | +$60 → **+$1,403 net** |
| R6 | 雙膽 #1 + #4, 4腳 | **Add #9 (Win odds < 10, 6.8)** = 2膽+5腳 | ✅ $556 | +$10 → **+$506 net** (vs −$40) |
| R6 | 雙膽 #1 + #4, 4腳 | B-trio ticket (1膽 #1 + 4, 8, 2, 3, 9) | ✅ $556 | +$60 → **+$456 net** |
| R7 | 1膽 #5 + 5腳 | Any MC/market rule | ❌ (banker 7th; #11 MC #9) | — |
| R8 | 1膽 #2 + 5腳 | **Bank raw MC #1 #12** + add 20%-variant #5 | ❌ (#4 MC #9 still out) | +$50 |
| R8 | 1膽 #2 + 5腳 | B-trio (#12 banker, legs 2, 1, 8, 7, 9, 5) | ❌ (#4 out) | +$50 |
| R9 | PASS | **Play the Mode C shadow** (1膽 #4 + 6腳) | ✅ $469 | +$150 → **+$319 net** |

**Whole-card test of "add every Win-odds < 10 candidate (MC Place% ≤ 20%, 11:00 odds) to A's pool"** (R1 #3, R4 #11 + #12, R5 #12 + #7, R6 #9 + #3, R7 #11, R8 #7 + #9 + #5; R9 PASS): $1,330 staked, 1 hit (R6 $556), **−$774** (vs −$790). **This is the first clean 11:00-odds test of that rule. It placed 3/13 candidates** (R6 #9, R7 #11, R8 #5), and two of those were in races where the banker failed.

**Whole-card test of "MC top 8, 1膽+7腳" (B8, $210/race)**: $1,890 staked, **3 hits (R5 $1,613, R6 $556, R9 $469)**, $2,638 returned, **+$748**. MC top 7 (B7, $150) hit only R9: −$881.

**Whole-card test of "play every Mode D race"**: R9 shadow +$319, so A would have finished at **−$471**.

- **Fixable misses** (with a rule we could write): **R5** (+trial debutant / MC #8, $1,613 for +$60), **R6** (Win-odds < 10 add, $556 for +$10), **R9** (no PASS, $469 for +$150). Recoverable **$2,638 for $220 extra stake**. **R2** is a saving ($100) under a raw-MC Mode D rule.
- **Unfixable misses**: **R1, R3, R7, R8** (the banker failed and there was also a gap), and **R4** (a 48/1 MC #12 ran 3rd behind a winning banker).

## Section 6: Key Moments

- **Best Bet**: **No A hit. The best ticket on the card was B-trio R6: $556 on $100.** It banked MC #1 #1 BOTTOMUPTOGETHER (won) and added the 4th favourite #9 GLOWING PRAISES (6.8, MC 1.3%) through Step B. #9 ran 3rd. For A, **the best call was R6's 雙膽拖**. MC rated #1 and #4 as 120% and 104% undervalued at 6.9 and 6.7, and they finished 1–2. Only a 5th leg was missing.
- **Worst Bet**: **The R9 PASS.** It was the only race on the card where A's pool held all three placers *and* its banker. Mode D's 20% line (Adj Win% 19.2%) kept A out, and the shadow ticket would have paid $469 for $150. A close second was **R8**, where SCMP's +2 excuses made #2 PERFECT GENERAL the banker over raw MC #1 #12 LEADING AGILITY (20.0% vs 19.5%). #12 won and #2 ran 4th.
- **Most Frustrating**: **R6, The Longines Cup.** Both bankers ran 1–2 (Quinella $232), and the 3rd was #9, the 4th favourite at 11:00, which B-trio had and A did not. A 雙膽拖 ticket with one more leg costs $10.
- **Biggest Surprise**: **R2 #6 VERBIER won at 49/1** (MC #8, 5.2%). The 2.3-implied favourite mix of #11 and #4 held only 2nd, and 24/1 #2 CASA PRIMO (MC #11) ran 3rd. Trio paid $7,587. MC's 299% overlay banker #5 ALWAYS MY FOLKS drifted from 22 to 45 and ran 9th. Honourable mention: **R4 #8 FLYING TING LOK** (MC 0.8%, last six 14-10-12-5-12-14) ran 3rd at 48/1.
- **Best MC Call**: **R6 #1 and #4.** The market had #8 LOVE TOGETHER as favourite (3.7 → 2.2), and MC had it 3rd at 13.4%. MC called #1 and #4 clear, they ran 1–2, and #8 ran 7th. Runner-up: **R9 #4 SOLID WIN**, MC #1 at 11 (7th in the 11:00 market, "undervalued 89%"), which won at 6.4. **R3 #3 TURIN CHAMPIONS** (MC #2, "undervalued 109%" at 9.5) also won.

## Section 7: Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 2 | R4 (#4), R6 (#1 1st and #4 2nd, 雙膽拖) |
| Banker 2nd-3rd | 1 | R5 (#3 2nd) |
| Banker out of top 3 | 5 | R1 (#2 4th), R2 (#5 9th), R3 (#4 9th), R7 (#5 7th), R8 (#2 4th) |

**Banker strike rate (top 3): 3/8 = 37.5%** · **Banker win rate: 2/8 = 25.0%** (R9 PASS excluded; its shadow banker #4 won)

The MC #1 horses (the B banker) placed **5/9** (R4, R5, R6, R8, R9), with **4 wins** (R4, R6, R8, R9). Their mean MC Win% was **29.0%** and mean MC Place% **61.0%**, against an actual place rate of 55.6%. **MC overstated the banker by only ~5pp**, the smallest gap since tracking began on 16-Sep (19-Oct +27pp, 14-Oct +33pp, 23-Sep +7pp, 16-Sep −8pp). **The usual strength split reversed: MC #1 ≥ 35% placed 0/2** (R1 46.5%, R7 37.8%), **30–35% placed 1/2** (R6 ✅, R3 ❌) and **< 30% placed 4/5** (R4 28.8%, R5 25.2%, R8 20.0%, R9 17.2% ✅; R2 18.1% ❌). **The three-card "MC #1 < 30% = 0/10" record is now 4/15 over four cards.**

**The A banker differed from MC #1 only in R8**, where +excuses made #2 the banker over #12. #12 won and #2 ran 4th (**A −1**). In R6 A added #4 as a 2nd banker, and it placed.

**MC #1 by market rank at SP:** rank 1–2: **4/6** (R4, R5, R6, R8 ✅; R1, R7 ❌) · rank 3: **1/1** (R9) · rank 4+: **0/2** (R2, R3). **At 11:00 odds, the split that a live rule could actually see, the result was the reverse.** At rank 1–2 the MC #1 placed 2/3 (R4, R5 ✅; R1 ❌). At rank 3–4 it placed 0/2 (R3, R7). At **rank 5+ it placed 3/4** (R6 rank 5, R8 rank 5 and R9 rank 7 won; R2 rank 8 ❌). **The SP-rank filter from earlier reviews reads hindsight. At 11:00 it would have removed three winning bankers.**

**Banker drift (11:00 → SP) was the clearest signal on the card.** MC #1s that drifted placed **0/3**: R1 4.4→5.6, R2 22→45 and R3 5.6→8.4. Those that firmed or held placed **5/6**: R4 3.1→2.1, R5 5.9→3.4, R6 6.9→6.9, R8 8.0→4.7 and R9 11→6.4 ✅, with R7 5.8→4.8 ❌. **MC #2 placed 3/9** (R1 #6 won, R3 #3 won, R6 #4 2nd).

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | 0/8 (R9 shadow: 1/1) |
| All 3 in pool OR banker + 2 legs | 0/8 |
| At least 2 placers in pool | 6/8 (R1, R3, R4, R5, R6, R7) |
| Banker hit + pool gap | 3/8 (R4, R5, R6) |

**The pool held 2 of 3 placers in 6/8 races, but never all 3.** **The 10 gap horses were mostly just outside MC's top 6.** By MC rank: #7 ×2 (R3 #10, R8 #5), #8 ×5 (R1 #5, R2 #6, R5 #6, R6 #9) and #9 ×2 (R7 #11, R8 #4). Only two were deep: R2 #2 (MC #11) and R4 #8 (MC #12). **Three gaps were under 10 at 11:00** (R6 #9 6.8, R7 #11 6.8, R8 #5 7.5), and R3 #10 sat on 10.0. **Four of the ten carried a positive SCMP flag** (R1 #5, R6 #9 and R8 #5 +excuses; R5 #6 +trial). That is the opposite of 19-Oct, where 8 of 13 gaps were 20/1+ and MC #7–#13.

### 7c. MC-Market Divergence Outcomes

From each report's "Market" paragraph. "Correct" = an undervalued horse placed, or an overvalued horse did not. Market ranks are at 11:00.

| Race | Undervalued (MC > mkt) → finish | Overvalued (MC < mkt) → finish |
|------|-------------------------------|------------------------------|
| R1 | #2 105% → 4th ❌ | #3 93% → 8th ✅ · **#5 80% → 3rd ❌** · #1 (2nd fav, MC 5th) → 5th ✅ |
| R2 | #5 299% → 9th ❌ · #10 89% → 10th ❌ | **#4 (fav) 59% → 2nd ❌** |
| R3 | #4 (34% vs ~18% implied) → 9th ❌ · **#3 109% → 1st ✅** | #1 (8.4% vs ~20%) → 8th ✅ · #6 (6.9% vs ~20%) → 5th ✅ |
| R4 | #3 78% → 6th ❌ | #11 (2nd fav, MC 7th) → 7th ✅ · #12 84% → 9th ✅ · **#8 85% → 3rd ❌** |
| R5 | #1 ~100% → 6th ❌ | #12 (2nd fav) → 5th ✅ · #7 (3rd fav) → 9th ✅ |
| R6 | **#1 120% → 1st ✅** · **#4 104% → 2nd ✅** | #3 (2nd fav) 93% → 6th ✅ · **#9 (4th fav) → 3rd ❌** |
| R7 | #5 127% → 7th ❌ · #9 134% → 5th ❌ | #6 84% → 8th ✅ · **#11 (5th fav, 14.5% place) → 3rd ❌** |
| R8 | #2 134% → 4th ❌ · #1 94% → 7th ❌ | #7 95% → 8th ✅ · #9 (one local run) → 12th ✅ |
| R9 | **#4 89% → 1st ✅** · #3 91% → 10th ❌ | #11 90% → 12th ✅ · #6 (4th fav) → 7th ✅ |

**MC divergence accuracy: 18/34 (52.9%)**, up from 42.0% on 19-Oct and 36.2% on 14-Oct. **Undervalued: 4/15 (26.7%).** **Overvalued: 14/19 (73.7%).** **Claimed edge > 100%: 3/8** (R3 #3, R6 #1, R6 #4 ✅; R1 #2, R2 #5, R7 #5, R7 #9, R8 #2 ❌). **Claimed edge > 200%: 0/1** (R2 #5), so the season record is **2/29**. **MC-opposed horses in the 11:00 market top 3 placed 1/10** (R2 #4 fav ✅; R1 #1, R3 #1 and #6, R4 #11, R5 #12 and #7, R6 #3, R8 #7 and #9 ❌). That is in line with 19-Oct's 2/12, and the four-card total is 15/36. **Near-zero blind spot:** MC Win% < 4% at 11:00 odds < 10 placed **2/10** (R6 #9, R7 #11 ✅). On the season definition (< 3% at SP ≤ 6) it placed **0/1** (R8 #7 LUCKY RIVER, 5.0 → 4.6, 8th), so the season is now **15/23**. **The morning "market horses" that MC rated near zero mostly drifted:** R8 #9 6.9 → 36, R4 #12 7.8 → 16, R9 #11 6.3 → 16 and R9 #6 7.7 → 15.

### 7d. SCMP +Excuses Flag Performance

| Race | Horse | +Excuses For | 11:00 odds | Finished | Verdict |
|------|-------|--------------|------------|----------|---------|
| R1 | #10 I AM BACK | crowded after start | 12 | 9th | ❌ |
| R1 | #5 WELL ENOUGH | steadied 250m | 11 | **3rd** | ✅ |
| R1 | #8 MISSION GIANT | hampered 300m | 22 | 10th | ❌ |
| R1 | #3 VIVA GRACIOUSNESS | hampered 300m | 7.5 | 8th | ❌ |
| R2 | #5 ALWAYS MY FOLKS | wide, no cover | 22 | 9th | ❌ |
| R2 | #11 CHILL MASTER | no clear running | 6.8 | 5th | ❌ |
| R2 | #1 GOLDEN FRIENDSHIP | steadied, crowded | 4.9 | 4th | ❌ |
| R3 | #3 TURIN CHAMPIONS | hampered, taken wider | 9.5 | **1st** | ✅ |
| R3 | #8 LUCK IS BACK | steadied near finish | 4.3 | **2nd** | ✅ |
| R3 | #1 URANUS STAR | steadied 1000m | 4.8 | 8th | ❌ |
| R3 | #6 STRANGE ALERT | (12-month-old run) | 5.0 | 5th | ❌ |
| R3 | #5 TAKE ACTION | steadied, crowded | 15 | 7th | ❌ |
| R3 | #10 FORTUNE STAR | checked, held up (net 0 with −notRO) | 10 | **3rd** | ✅ |
| R3 | #2 LUCKY MY WAY | badly crowded on jumping | 21 | 6th | ❌ |
| R4 | #9 SHOW ME YOUR LOVE | eased for clear running | 35 | 8th | ❌ |
| R4 | #12 FREE PONY | wide, no cover | 7.8 | 9th | ❌ |
| R5 | #1 GRAND NOVA | steadied 550m | 10 | 6th | ❌ |
| R5 | #2 MASTER CHAMPION | wide trip | 10 | 4th | ❌ |
| R5 | #4 COPPER CORE | held up, restricted room | 11 | 7th | ❌ |
| R5 | #12 MAPOGO | boxed in, wide | 6.0 | 5th | ❌ |
| R5 | #10 SUPER SIXTY | no clear run (May) | 8.4 | **1st** | ✅ |
| R6 | #4 HORSEPOWER | held up after 400m | 6.7 | **2nd** | ✅ |
| R6 | #8 LOVE TOGETHER | crowded after start | 3.7 | 7th | ❌ |
| R6 | #2 VICTORY SKY | steadied 100m | 12 | 9th | ❌ |
| R6 | #10 CANDLELIGHT DINNER | rough trip, lost a plate | 12 | 8th | ❌ |
| R6 | #9 GLOWING PRAISES | steadied 900m | 6.8 | **3rd** | ✅ |
| R6 | #6 BRAVE STAR | steadied, crowded | 25 | 10th | ❌ |
| R7 | #4 GOLDEN ACE | steadied after start | 6.7 | 6th | ❌ |
| R7 | #8 ENJOY GOLF | forced wide | 22 | 12th | ❌ |
| R7 | #7 HERO MASTERMIND | no clear running | 37 | 10th | ❌ |
| R7 | #6 SPICY BONUS | awkward jump, steadied | 16 | 8th | ❌ |
| R8 | #2 PERFECT GENERAL | wide trip | 12 | 4th | ❌ |
| R8 | #5 GREATER BAE | (TIR excuse) | 7.5 | **2nd** | ✅ |
| R8 | #10 DUKE ATREIDES | (TIR excuse) | 20 | 11th | ❌ |
| R9 | #1 LUCKY SAM GOR | (TIR excuse) | 12 | 5th | ❌ |
| R9 | #2 POPE CODY | (TIR excuse) | 5.6 | **3rd** | ✅ |
| R9 | #9 EMBRACES | (TIR excuse) | 5.3 | 4th | ❌ |
| R9 | #5 RIDING TOGETHER | (TIR excuse) | 16 | **2nd** | ✅ |
| R9 | #11 I CAN | (TIR excuse) | 6.3 | 12th | ❌ |

**+Excuses hit rate (top 3): 10/39 (25.6%).** At 11:00 odds ≤ 8 the rate was **5/16 (31.3%)**, and the six-card ≤ 8 record falls to **36/73 (49.3%)**. The flag is spread so widely (39 of 102 runners) that it now acts almost as a uniform +2. **Other flags:** `+trial` placed **4/13** (R1 #11, R5 #6, R7 #2, R9 #4), and 2/7 at ≤ 10. **Negative flags placed 5/11 and produced 3 winners:** R1 #6 (−notRO) won, R3 #10 (−notRO) ran 3rd, R4 #7 (−injury30d) ran 2nd, and R5 #10 and R7 #2 (both −injury30d) won. **−injury30d alone placed 3/5.** On 14-Oct negative flags placed 2/12.

### 7e. Divergence Override Assessment

**No discretionary override was applied.** These rule outcomes changed tickets:

| Rule | Race | Effect | Result |
|------|------|--------|--------|
| SCMP +excuses lift across a classification line | R2 (#5 18.1% → 20.1%) | Wide open (PASS) → Competitive, $100 played | Banker 9th. **Cost $100** |
| SCMP banker flip (+2 excuses) | R8 (#12 → #2) | Banker changed, same pool | #12 won, #2 4th. Banker count −1; no $ effect (#4 gap) |
| Mode D PASS (< 20% Adj Win%) | R9 | $0 instead of the $150 shadow | **Shadow hit $469. Cost $319 net** |
| 雙膽拖 (2nd horse ≥ 63%) | R6 (#1 + #4) | 4 combos, $40 | Both placed. A single-banker ticket with A's legs also misses (#9), so **saved $60** |
| Reminder 9 / Rule 9 (include ≤ 15 despite negative flag) | R5 (+#10), R7 (+#2) | +$50 in R5, $0 in R7 (5th leg) | **Both won.** B's top 6 also had both, so there was no A/B outcome change |
| SCMP +trial lift into pool | R5 (#9 Adj Place 22.6%) | Pool 7 instead of 6 | #9 ran 10th. **The debutant +trial #6 (Adj Place 18.6%) ran 3rd and missed the cut** |

**Cost/benefit:** these rules net **−$359** against the raw-MC version of the same structure. That is the R2 lift (−$100) plus the R9 PASS (−$319), offset by the R6 雙膽拖 (+$60). **Lesson:** the SCMP flags that A uses most (+excuses, ±2) are small and frequent. Today they did not improve ranking. They decided borderline structural questions (Wide vs Competitive, the banker in a 0.5pp tie), and both of those went the wrong way.

## Section 8: Learnings

### What Worked

- **MC #1 placed 5/9 (55.6%) with 4 wins, its best rate since 23-Sep** (R4 #4 2.1, R6 #1 6.9, R8 #12 4.7, R9 #4 6.4). Calibration was close: 61.0% predicted against 55.6% actual.
- **MC beat the market on R6 and R9.** It made #1 and #4 its top two over the 3.7 favourite #8, and they ran 1–2 while #8 ran 7th. In R9 it rated the 11/1 #4 SOLID WIN 1st, and #4 won. Overvalued calls went **14/19 (73.7%)**, and MC-opposed morning top-3 horses placed only **1/10**.
- **Rule 9 / Reminder 9 kept two winners in A's pool** (R5 #10 SUPER SIXTY, R7 #2 MALPENSA), even though both carried −injury30d.
- **雙膽拖 worked as designed in R6.** Both bankers placed, on a $40 ticket. It missed only because of the leg count.
- **Mode C's 7-horse shadow was the right structure for R9.** MC #7 #5 RIDING TOGETHER ran 2nd.

### What Didn't Work

- **0/8 for a third straight blank.** HV is now 4/51 for the season (−73.6% ROI), and cumulative ROI fell from −46.8% to **−50.4%**.
- **Pools were one or two horses short.** 8 of 10 gaps were MC #7–#9. MC top 8 (B8) would have hit R5, R6 and R9 (+$748). MC top 6 hit nothing.
- **The strong MC bankers failed.** R1 #2 (46.5%, fav) ran 4th, R7 #5 (37.8%) 7th and R3 #4 (34.3%) 9th. **All three drifted or were the 'big overlay' type.** Meanwhile the sub-30% MC #1s went 4/5, which contradicts the three-card 0/10 record and the proposed < 30% PASS rule.
- **The SCMP layer hurt at the margins.** It lifted R2 into play (−$100), flipped the R8 banker away from the eventual winner, and Mode D on a 19.2% Adj figure passed the card's only winning frame (R9).
- **B-trio's swap removed placers again**: R4 #7 MASTER PHOENIX (2nd) and R9 #5 RIDING TOGETHER (2nd). The R9 swap cost a $469 hit. Over two cards, swaps have removed three placers (19-Oct R4 #11 as well).
- **Negative SCMP flags went 5/11 placed, with 3 winners.** −injury30d went 3/5.

### Strategy Adjustments

- [ ] **Do NOT adopt the "PASS when MC #1 < 30%" rule proposed on 19-Oct.** Today the sub-30% MC #1s placed **4/5** (four-card 4/15). Settle it with a full-season count from the stratC banker tables, not a three-card streak.
- [ ] **Score every Mode D shadow ticket season-to-date before keeping the < 20% PASS.** R9 shadow was +$319. Also check 11-Oct R8. If shadows are net positive, play Mode C instead of PASS.
- [ ] **Run classification on raw MC Win%, not Adj Win%.** Do not let SCMP factors alone move a race across the 20% / 35% lines. R2 was lifted from 18.1% to 20.1% by a debatable +2 excuse and lost $100. Backtest on the season's reports.
- [ ] **Keep raw MC #1 as banker when SCMP flips the order and the raw gap is ≤ 1pp.** In R8, #12 (20.0%) won and #2 (19.5% + 2) ran 4th. This is one race, so track it, don't adopt it yet.
- [ ] **Backtest MC top 8 (1膽+7腳, $210) and "A pool + MC #7–#8" on every stratC table.** Today B8 went +$748 against B −$900. Check 19-Oct, where gaps were MC #7–#13, and the HV cards, where pools have run short.
- [ ] **Add a pre-jump banker drift check.** Today MC #1s that drifted from 11:00 to SP went **0/3**, while those that firmed or held went **5/6**. Score "banker drifted > 25% → PASS or switch to MC #2" across the season, using 11:00 odds from the reports and SP from the results files. It needs a ~30-minute-before-jump odds fetch to be usable live.
- [ ] **Change B-trio's Step B from swap to add-only.** Swaps removed a placer in R4 and R9 today and in R4 on 19-Oct. Add-only on 11:00 odds placed 3/13 today and scored −$774 vs −$790 when applied to A. That is neutral, not an edge.
- [ ] **Review −injury30d (−3/−4).** It placed 3/5 today with two winners. Count the season record. If it is ≥ 40%, drop the penalty when the horse has passed the vet and has a positive trial.

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | — | — | — | — | — | — |
| MEDIUM-HIGH | R1 | 0/1 | $100 | $0 | −$100 | −100.0% |
| MEDIUM | R3, R6, R7 | 0/3 | $240 | $0 | −$240 | −100.0% |
| LOW / LOW-MEDIUM / MEDIUM-LOW | R2, R4, R5, R8 | 0/4 | $450 | $0 | −$450 | −100.0% |
| LOW (PASS) | R9 | — | $0 | $0 | $0 | — (shadow +$319) |
| **TOTAL** | **8** | **0/8** | **$790** | **$0** | **−$790** | **−100.0%** |

**No confidence band hit.** **The MEDIUM-HIGH race (R1) had the strongest banker on the card (46.5%), and it ran 4th.** The three banker-placed races were MEDIUM-LOW (R4), LOW–MEDIUM (R5) and MEDIUM (R6). **The only winning frame was the LOW-confidence PASS.** **By classification**, Dominant (Mode A: R1, R3, R7) went **0/3, −$300**: all three bankers failed. Competitive (R2, R4, R5, R6, R8) went **0/5, −$490**. Over eight cards, Dominant is **10/42, −$531** and non-Dominant is **3/38, −$3,593**.

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
| 12 | 2026-10-19 | ST | 11 | 0 | $880 | $0 | −$880 | −100.0% |
| **13** | **2026-10-21** | **HV** | **8** | **0** | **$790** | **$0** | **−$790** | **−100.0%** |
| **TOTAL** | | | **124** | **18** | **$11,640** | **$5,768** | **−$5,872** | **−50.4%** |

> The 06-Sep figures use the §10e convention (9 races / 2 hits / $870). Meeting 5 was a post-meeting blind run (no SCMP) and is included for tracking. Meeting 9 stake is net of the $30 R9 refund. Meeting 10 excludes the R8 PASS. Meeting 11 stake is net of the $90 R5 refund. Meeting 12 is a retrospective blind run (generated 20-Oct, final-SP odds, no SCMP). **Meeting 13 excludes the R9 PASS** (the shadow ticket would have returned $469 on $150).

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
| 2026-10-19 ST | 5/11 | 45.5% |
| **2026-10-21 HV** | **3/8** | **37.5%** |
| **Combined** | **56/124** | **45.2%** |

### 10c. Venue Breakdown

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
|-------|----------|-------|------|--------|----------|-----|-----|--------------|
| Sha Tin | 7 | 73 | 14 | $6,550 | $4,423 | −$2,127 | −32.5% | 30/73 (41.1%) |
| **Happy Valley** | **6** | **51** | **4** | **$5,090** | **$1,345** | **−$3,745** | **−73.6%** | **26/51 (51.0%)** |

**HV's fourth blank in six meetings.** Its hit rate is 7.8%, against 19.2% at ST, even though the HV banker rate is ten points higher. **At HV the problem is the pool, not the banker.** Today 8 of 10 gaps were MC #7–#9, and on 14-Oct the gaps were market-backed MC near-zeros.

### 10d. Season Trajectory

| Metric | 09-06 | 09-09 | 09-13 | 09-16 | 09-23 | 09-27 | 10-01 | 10-04 | 10-07 | 10-11 | 10-14 | 10-19 | **10-21** | Trend |
|--------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-----------|-------|
| Hit rate (meeting) | 22.2% | 0.0% | 10.0% | 0.0% | 22.2% | 18.2% | 36.4% | 18.2% | 22.2% | 30.0% | 0.0% | 0.0% | **0.0%** | → |
| Hit rate (cumulative) | 22.2% | 11.8% | 11.1% | 8.6% | 11.4% | 12.7% | 16.7% | 16.9% | 17.4% | 18.8% | 17.1% | 15.5% | **14.5%** | ↓ |
| Cumulative P&L | −$79 | −$719 | −$1,113 | −$1,963 | −$1,748 | −$2,315 | −$2,218 | −$2,084 | −$2,644 | −$3,082 | −$4,202 | −$5,082 | **−$5,872** | ↓ |
| Cumulative ROI | −9.1% | −47.6% | −46.8% | −60.8% | −42.3% | −45.6% | −37.8% | −29.8% | −33.9% | −34.8% | −42.1% | −46.8% | **−50.4%** | ↓ |
| Banker top 3 (meeting) | 33.3% | 50.0% | 30.0% | 75.0% | 55.6% | 45.5% | 45.5% | 54.5% | 55.6% | 30.0% | 33.3% | 45.5% | **37.5%** | ↓ |
| Banker top 3 (cumulative) | 33.3% | 41.2% | 37.0% | 45.7% | 47.7% | 47.3% | 47.0% | 48.1% | 48.8% | 46.9% | 45.7% | 45.7% | **45.2%** | ↓ |

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
| 12 | 2026-10-19 | ST | 0/11 | −$880 | −100.0% | 0/11 | −$1,100 | −100.0% | A (stake only, $220) |
| **13** | **2026-10-21** | **HV** | **0/8** | **−$790** | **−100.0%** | **0/9** | **−$900** | **−100.0%** | **A (stake only, $110)** |
| **TOTAL** | | | **18/124** | **−$5,872** | **−50.4%** | **17/126** | **−$6,993** | **−56.0%** | **A** |

*B = review-spec Strategy B (MC top 6, 1膽+5腳, $100 flat; 07-Oct R9 $60 and 14-Oct R5 $30 net of refunds). B-trio (the reports' own Strategy B) this meeting: **1/9 (R6 $556), $1,260 staked, $556 returned, −$704, −55.9%**. Season B-trio: **29/126, $15,630 staked, $7,588 returned, −$8,042, −51.5%**.*

| Cumulative Metric | Strategy A | Strategy B | Delta (B − A) |
|-------------------|-----------|-----------|---------------|
| Total meetings | 13 | 13 | — |
| Total races | 124 | 126 | +2 |
| Hits (rate) | 18/124 (14.5%) | 17/126 (13.5%) | −1 |
| Total staked | $11,640 | $12,490 | +$850 |
| Total returned | $5,768 | $5,497 | −$271 |
| **Cumulative P&L** | **−$5,872** | **−$6,993** | **−$1,121** |
| **Cumulative ROI** | **−50.4%** | **−56.0%** | **−5.6 pp** |
| Banker top 3 rate | 56/124 (45.2%) | 58/126 (46.0%) | +2 |

This card takes cumulative ROI past −50% for the first time since 16-Sep (**−50.4%**). It is the third straight blank. **A beat B by $110, again purely on stake.** A's season lead is **$1,121**, made up of $850 less staked and $271 more returned. B now leads on banker count (58 vs 56) because of today's R8 flip. **The cumulative A/B data is still not converging on a prediction edge for A.** After 13 cards, A's advantage is mostly that it stakes less, and the SCMP layer cost money at the margins today. **The structural finding of this card is pool width at HV.** Eight of ten gaps were MC #7–#9, and an MC top 8 ticket would have been +$748. That is one card, against 19-Oct where the gaps were deep. It needs a full-season backtest before any rule changes.

## Section 11: A/B Strategy Comparison

### 11a. How Strategy B was derived

For each race, the **MC SIMULATION (raw)** table in `trio_strategy_20261021_HV_RN.md` was sorted by MC Win%. The first 6 horses form the pool and MC #1 is the banker: 1膽+5腳, 10 combos, $100, every race, including R9, which A passed. A hit needs the banker in the top 3 and all 3 placers in the 6-horse pool. **Ties were broken on MC Place%:** R1 #11 and #1 (6.1%), R5 #11 and #9 (5.5%; #11 took the 6th slot), and R7 #4 and #2 (6.9%; both in). The R5 tie did not change the outcome, because the gap was #6. There were no scratchings. This is not the same as the "STRATEGY B (MC-only)" block in each report, which is tracked as B-trio.

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | Strat A Banker | Strat B Pool (MC top 6) | Strat B Banker (MC #1) | Result (1→2→3) | A Hit? | B Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|--------------|----------------|-------------------------|------------------------|----------------|--------|--------|--------|----------|----------|---------|---------|----------------|
| R1 | 2,6,11,7,10,1 | #2 | 2,6,7,11,1,10 | #2 | 6→11→5 | ❌ | ❌ | $800 | $0 | $0 | $100 | $100 | Same pool & banker |
| R2 | 5,11,1,4,3,10 | #5 | 5,11,4,3,1,10 | #5 | 6→4→2 | ❌ | ❌ | $7,587 | $0 | $0 | $100 | $100 | Same pool & banker (A played only because +excuses lifted #5 over 20%) |
| R3 | 4,3,8,1,6,5 | #4 | 4,3,8,1,6,5 | #4 | 3→8→10 | ❌ | ❌ | $408 | $0 | $0 | $100 | $100 | Same pool & banker |
| R4 | 4,3,1,5,10,7 | #4 | 4,3,1,5,7,10 | #4 | 4→7→8 | ❌ | ❌ | $2,228 | $0 | $0 | $100 | $100 | Same pool & banker |
| R5 | 3,1,2,4,9,11,10 | #3 | 3,1,2,4,10,11 | #3 | 10→3→6 | ❌ | ❌ | $1,613 | $0 | $0 | $150 | $100 | A +#9 (+trial, 10th); #6 in neither |
| R6 | 1,4 / 8,2,10,5 | #1 + #4 | 1,4,8,2,10,5 | #1 | 1→4→9 | ❌ | ❌ | $556 | $0 | $0 | $40 | $100 | A 雙膽拖 4 combos; same 6 horses; #9 in neither |
| R7 | 5,3,10,9,4,2 | #5 | 5,3,10,9,4,2 | #5 | 2→10→11 | ❌ | ❌ | $213 | $0 | $0 | $100 | $100 | Same pool & banker |
| R8 | 2,12,1,8,6,3 | #2 | 12,2,1,8,6,3 | #12 | 12→5→4 | ❌ | ❌ | $910 | $0 | $0 | $100 | $100 | **Banker: A=#2 (+excuses, 4th), B=#12 (MC #1, won)**; #5, #4 in neither |
| R9 | PASS (shadow 4,10,1,2,9,3,5) | (#4) | 4,10,1,2,3,9 | #4 | 4→5→2 | PASS | ❌ | $469 | $0 | $0 | $0 | $100 | A Mode D PASS (its 7-horse shadow would have hit); B missed #5 (MC #7) |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | 8 | 9 | +1 |
| Hits | 0/8 (0.0%) | 0/9 (0.0%) | 0 |
| Total staked | $790 | $900 | +$110 |
| Total returned | $0 | $0 | $0 |
| **Net P&L** | **−$790** | **−$900** | **−$110** |
| **ROI** | −100.0% | −100.0% | 0.0 pp |
| Banker top 3 rate | 3/8 (37.5%) | 5/9 (55.6%) | +2 |

*B-trio (report's own B, for reference): **1/9 (R6 $556), $1,260 staked, $556 returned, −$704, −55.9%**. Its banker was MC #1 in every race and placed 5/9. Step B added R6 #9 (3rd) and swapped R7 #1 → #11 (3rd), R8 #3 → #7 and #6 → #9 (+#5 added, 2nd). **It also swapped out two placers: R4 #7 (2nd) for #12, and R9 #5 (2nd) for #11.** Without the R9 swap, B-trio would have hit R9 ($469) as well.*

### 11d. Where A and B Diverged

| Race | What Differed | A Result | B Result | Impact | Root cause |
|------|---------------|----------|----------|--------|------------|
| R5 | Pool: A +#9 (7 horses) | MISS ❌ | MISS ❌ | B +$50 | SCMP +trial (#9 Adj Place 20.6% → 22.6%) plus Reminder 9 (#10, also in B) |
| R6 | Structure: A 雙膽拖 #1 + #4, 4 legs | MISS ❌ (Pattern B) | MISS ❌ (Pattern B) | A +$60 | 2nd-banker rule (#4 70.9%). Both bankers placed; #9 missing in both |
| R8 | Banker: A=#2, B=#12 | MISS ❌ (Pattern C) | MISS ❌ (Pattern B) | $0 | **SCMP +excuses (+2) flipped a 0.5pp raw MC tie.** B's banker won, A's ran 4th. Both missed #5 and #4 |
| R9 | A PASS, B played | PASS ($0; shadow would HIT) | MISS ❌ (Pattern B) | A +$100 | Mode D (Adj 19.2% < 20%). B's 6-horse pool missed MC #7 #5; A's 7-horse shadow had it |

Net: **A +$110**, all from stake. No divergence changed a played outcome. R1–R4 and R7 were identical tickets. R2 was identical, but on raw MC alone A would have passed it.

### 11e. Session Verdict

**A won by $110 (−$790 vs −$900), purely on stake. Neither strategy hit.** A's savings came from the R9 PASS (+$100) and the R6 雙膽拖 (+$60), less the R5 +trial leg (−$50). **The difference was structure, not prediction.** The two A-only judgements that touched prediction both went wrong. In **R8**, the SCMP +excuses banker flip lost the banker: MC #1 #12 won, and A's #2 ran 4th. In **R2**, the same +2 lifted a sub-20% race into play. **The A-only rule that cost the most was Mode D.** Its 7-horse shadow in R9 was the only ticket of A's, B's or B-trio's whose pool held all three placers *and* the banker. That rule cost $319 net. **Variance played a part too.** R2's 49/1 and R4's 48/1 placers were unreachable. **But the systematic finding is pool width:** 8 of the 10 gaps were MC #7–#9, so both A's 6-horse and B's 6-horse pools were one or two horses short at HV. MC top 8 would have hit three races.
