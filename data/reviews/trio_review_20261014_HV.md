# Trio Post-Race Review — Happy Valley | 2026-10-14

**Meeting 11 of the 2026/27 season.** A 9-race Wednesday night card, all on Turf (A course), going **Good**. Results: `data/historical/results_20261014_HV.json`. Bet records: `data/reports/trio_strategy_20261014_HV_R1–R9.md`.

> **Data notes for this meeting**
> - **Results scraped first time** (`tools/scrape-meeting.ts`, DT ✓, TT ✓). Trio (per $10): R1 $246 · R2 $66 · R3 $206 · R4 $762 · R5 $395 · R6 $1,133 · R7 $322 · R8 $524 · R9 $445. Trio/Tierce ratios (3.7–7.0) look normal, and R6's comma-thousands value ($1,133) parsed correctly. **R5 dividends were checked against the HKJC results page.** Win $115, Place 34/18.5/15, QN $318, Tierce $2,746 and Trio $395 all match.
> - **Late scratchings in R5: #4 RUN RUN SUNRISE and #7 VICTOR THE RAPID.** The HKJC racecard marks both "(Scratched)". They had no SP and no placing. The 11:00 HKT reports listed no scratchings, so both horses were on every ticket. **#7 was MC #2 and A's #2-ranked leg. #4 was MC #3.** Trio combos that include a scratched horse are refunded, so **all R5 stakes are net of refunds**: A $150 → **$60** (6 live combos: 1 >< 2, 3, 5, 6), B $100 → **$30** (3 live combos), and B-trio $150 → **$60**. The results JSON simply omits the two horses and carries no scratched flag. It was not edited.
> - **No PASS this card.** No race was Mode D, because R8 (24.9%) and R9 (22.3%) were both above the 20% PASS line. A and B both played all 9 races.
> - **Pre-race odds** are the HKJC pool snapshot captured **11:00–11:01 HKT**. "SP" = final win odds from the results file. Big moves: R4 #12 **9.9→3.8** (2nd), R8 #10 **14→6.4** (3rd), R9 #6 **13→4.6** (2nd), R9 banker #8 8.8→**4.6** (11th), R3 #10 7.4→5.1 (2nd), R3 #9 9.6→3.5 (4th), R1 banker #5 6.3→**10** (10th).
> - **SCMP odds columns were unlabelled and the Q/QP matrix was unreadable** in every report, so no ticket used the Q/QP cross-check. Star Form, TIR, vet and trackwork were scored.
> - **Scoring.** **Strategy A** is scored exactly as written in each report. **Strategy B** follows the review-skill definition: MC top 6 by raw Win%, MC #1 banker, 1膽+5腳, $100/race. The reports' own "Strategy B (MC-only)" ticket (Place% > 20% legs plus a Win-odds < 10 swap/add) is tracked separately as **B-trio**. **A's banker was MC #1 in all 9 races.**

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played | **9 (R1–R9)** |
| Hit rate | **0/9 (0.0%)** |
| Total staked | $1,120 (net of the $90 R5 refund) |
| Total returned | $0 |
| **Net P&L** | **−$1,120** |
| **ROI** | **−100.0%** |
| Session Result | **LOSS** |

**A blank card, the third of the season. All three blanks were at Happy Valley** (09-Sep, 16-Sep and today). **The bankers placed 3/9.** In the three races where the banker did place (R2 and R3 won, R7 2nd), **the pool missed a market-backed horse that MC rated at 1–2% to win**: R2 #8 GAZELEY (5.6), R3 #10 PRESTIGE RICKY (7.4) and R7 #12 LEGEND STAR (8.4). The reports' own B-trio ticket covered all three through its "Win odds < 10" rule and **hit all three ($594)**. B-trio lost −$516, against −$1,120 for A and −$830 for B (MC top 6). **R6 was the costliest miss:** all three placers (Trio $1,133) were A legs, and the 2.3 favourite banker #7 LE ZONDA (MC 49.0% / 82.6%) ran 5th.

## Section 2: Race-by-Race Cross-Reference

Result column: **bold** = top-3 finisher NOT in the Strategy A pool.

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
| R1 | C5 1650m | B (1膽+5腳) | #5 | 6, 10, 1, 11, 8 | 1→**12**→11 | MISS ❌ | $246 | $0 | −$100 | Banker fail (#5 drifted 6.3→10, 10th) + gap #12 (MC #8, 8.7) |
| R2 | C4 1650m | A+ (1膽+5腳) | #3 | 4, 6, 7, 1, 10 | 3→**8**→10 | MISS ❌ | $66 | $0 | −$100 | Banker hit (won), gap #8 (MC #8, 1.9%, 5.6→7.1) |
| R3 | C4 1650m | A++ (1膽+7腳) | #2 | 9, 6, 4, 5, 1, 7, 8 | 2→**10**→1 | MISS ❌ | $206 | $0 | −$210 | Banker hit (won), gap #10 (MC #8, 3.4%, 3rd fav 7.4→5.1) |
| R4 | C4 1200m | A+ (1膽+6腳) | #2 | 4, 10, 5, 7, 3, 6 | 4→**12**→10 | MISS ❌ | $762 | $0 | −$150 | Banker fail (#2 6th) + gap #12 (MC #10, 1.1%, 9.9→**3.8**) |
| R5 | C4 1200m | B+ (1膽+6腳; live 1膽+4腳) | #1 | 7*, 4*, 6, 2, 5, 3 | 5→6→2 | MISS ❌ | $395 | $0 | −$60 | **Banker fail (all 3 in legs!)** #1 (3.7 fav) 4th. *#4/#7 scratched, $90 refunded |
| R6 | C2 1800m | A+ (1膽+6腳) | #7 | 5, 3, 4, 1, 9, 2 | 2→3→1 | MISS ❌ | $1,133 | $0 | −$150 | **Banker fail (all 3 in legs!)** #7 (2.3 fav, MC 49.0%) 5th |
| R7 | C4 1200m | A+ (1膽+6腳) | #5 | 6, 1, 8, 3, 4, 10 | 3→5→**12** | MISS ❌ | $322 | $0 | −$150 | Banker hit (2nd), gap #12 (MC #10, 1.5%, 8.4→12) |
| R8 | C3 1800m | B (1膽+5腳) | #1 | 9, 3, 2, 7, 12 | 9→2→**10** | MISS ❌ | $524 | $0 | −$100 | Banker fail (#1 6th) + gap #10 (MC #8, 14→**6.4**) |
| R9 | C3 1200m | B (1膽+5腳) | #8 | 5, 2, 1, 4, 10 | 5→**6**→**7** | MISS ❌ | $445 | $0 | −$100 | Banker fail (#8 11th) + 2 gaps (#6 MC #7, 13→4.6; #7 MC #9, 7.3) |

"+" in Mode = pool extended beyond the mode's nominal size: R2 (#10, Rule 8 + HV note), R3 (#1, #7 Rule 8; #8 Rule 9), R4 (#6, #3 Rule 8), R5 (#3 Rule 8), R6 (#2, #9 Rule 8), R7 (#4 ≥ 25%, #10 Rule 8).

## Section 3: Hits Analysis

**No hits.** The closest calls were the three Pattern B races, where the banker placed and one leg-slot was wrong:

| Race | Banker → finish | Legs that placed | Missing horse | Its MC rank (Win% / Place%) | Pre → SP | Trio |
|------|-----------------|------------------|---------------|-----------------------------|----------|------|
| R2 | #3 AKERMANIS GOLD (2.3 fav, MC 34.4%) → **1st** | #10 3rd (Rule 8 leg) | #8 GAZELEY 2nd | MC #8 (1.9% / 11.1%) | 5.6 → 7.1 | $66 |
| R3 | #2 SHOOTING TO TOP (MC 42.9%) → **1st** | #1 3rd (Rule 8 leg) | #10 PRESTIGE RICKY 2nd | MC #8 (3.4% / 16.7%) | 7.4 → 5.1 | $206 |
| R7 | #5 CLOUD NINE (2.2 fav, MC 37.1%) → **2nd** | #3 1st | #12 LEGEND STAR 3rd | MC #10 (1.5% / 9.1%) | 8.4 → 12 | $322 |

In each race the report named the missing horse as "the main omission risk". **All three were at pre-race odds under 10 with MC Place% under 20%**, which is exactly the B-trio Win-odds candidate rule. B-trio collected $594 from these three races.

## Section 4: Miss Classification

9 misses. **2 Pattern A, 3 Pattern B, 4 Pattern C.**

### Pattern A: Banker Fail — All 3 Placers Already in Legs (2/9)

| Race | Banker (pre → SP) | Finished | Result | Root cause | Missed Trio |
|------|-------------------|----------|--------|------------|-------------|
| R5 | #1 BROWNNEEDSFURTHER (6.2 → **3.7 fav**) | 4th | 5→6→2 | MC #1 at only 29.5% in a Competitive race, carrying top weight (135). MC's finish-time projection had #7 and #4 faster, and both were scratched. Legs #5 (MC #7, 6th by Adj Place%), #6 and #2 filled the frame | $395 |
| R6 | #7 LE ZONDA (2.4 → 2.3 fav) | 5th | 2→3→1 | The strongest banker of the card (49.0% / 82.6%, capped Adj 50%/85%, 3 straight wins). The speed-figure projection preferred #1 and #4, and #1 ran 3rd. #2 MASSIVE SOVEREIGN, which MC called "overvalued by 76%", won from a Rule 8 slot | $1,133 |

**Combined Pattern A missed return: $1,528.** R6 is the second card running in which a ≥ 40% MC #1 favourite failed with every placer in the legs (11-Oct R11, 43.2%).

### Pattern B: Banker Hit — Pool Gap (3/9)

| Race | Banker | Placed legs | Pool gap | Gap MC rank | Gap pre → SP | Reserve status |
|------|--------|-------------|----------|-------------|--------------|----------------|
| R2 | #3 1st | #10 3rd | **#8 GAZELEY 2nd** | #8 (1.9%) | 5.6 → 7.1 (2nd fav pre-race) | Named "main omission risk", Adj Place% 12.1%. In B-trio |
| R3 | #2 1st | #1 3rd | **#10 PRESTIGE RICKY 2nd** | #8 (3.4%) | 7.4 → 5.1 (3rd fav pre-race) | Named "most notable omission", Adj Place% 18.7% (1.3pp under Rule 8). In B-trio |
| R7 | #5 2nd | #3 1st | **#12 LEGEND STAR 3rd** | #10 (1.5%) | 8.4 → 12 (joint 3rd fav pre-race) | Named in "Left out", Adj Place% 9.1%. In B-trio |

**Pattern B was the dominant pattern among races where the banker placed (3/3).** The 8-horse R3 pool still missed. Pool size was not the problem. The problem was that **pool selection ignores the market**: every gap horse was a top-3 or top-4 market choice at 11:00 HKT.

### Pattern C: Banker Fail + Pool Gap (4/9)

| Race | Banker (pos, pre → SP) | Gap horse(s) | Gap MC rank (Win%) | Gap pre → SP | Note |
|------|------------------------|--------------|--------------------|--------------|------|
| R1 | #5 (10th, 6.3 → 10) | #12 2nd | #8 (2.0%) | 14 → 8.7 | Banker drifted. #1 (won, MC #3) and #11 (3rd, MC #5) were legs |
| R4 | #2 (6th, 4.9 → 5.2) | #12 2nd | #10 (1.1%) | **9.9 → 3.8 (SP fav)** | #4 (won, MC #3 at 13) and #10 (3rd) were legs. Banker MC 41.9% |
| R8 | #1 (6th, 4.0 → 6.2) | #10 3rd | #8 (3.8%) | **14 → 6.4** | #9 (won) and #2 (2nd, `+trial`) were legs. Speed figures had the banker 11th of 12 |
| R9 | #8 (11th, 8.8 → 4.6) | #6 2nd, #7 3rd | #7 (3.4%), #9 (2.9%) | 13 → **4.6**, 7.3 → 7.6 | Only #5 (won, MC #2) held. Banker was backed in and still ran 11th |

**Combined Pattern C Trio value: $1,977.** Every Pattern C gap horse was **shortened by the market** (R4 #12, R8 #10, R9 #6) or already short (R9 #7 at 7.3).

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R1 | 1膽 #5 + 5腳 | Add #12 (14 pre-race, MC #8) | ❌ (banker 10th) | — |
| R1 | 1膽 #5 + 5腳 | Bank MC #3 / market fav #1 (won) + add #12 | ✅ $246, but no rule picks #12 at 14 | — |
| R2 | 1膽 #3 + 5腳 | **Add #8 (Win odds < 10 rule)** = 1膽+6腳 | ✅ $66 | +$50 → −$84 net (vs −$100) |
| R3 | 1膽 #2 + 7腳 | **Add #10 (Win odds < 10 rule)** = 1膽+8腳 | ✅ $206 | +$70 → −$74 net (vs −$210) |
| R3 | 1膽 #2 + 7腳 | B-trio ticket (swap #5 for #10, drop #8) = 1膽+6腳 | ✅ $206 | −$60 → **+$56 net** |
| R4 | 1膽 #2 + 6腳 | Add #12 | ❌ (banker 6th) | — |
| R4 | 1膽 #2 + 6腳 | Full box of 8 (A pool + #12, 56 combos) | ✅ $762 | +$410 → +$202 net. Not a realistic rule |
| R5 | 1膽 #1 + 4 live legs | Full box of the live 5-horse pool (10 combos) | ✅ $395 | +$40 → **+$295 net** |
| R6 | 1膽 #7 + 6腳 | Full box of 7 (35 combos) | ✅ $1,133 | +$200 → **+$783 net** |
| R6 | 1膽 #7 + 6腳 | Bank MC #2 #5 | ❌ (#5 6th) | — |
| R7 | 1膽 #5 + 6腳 | **Add #12 (Win odds < 10 rule)** = 1膽+7腳 | ✅ $322 | +$60 → +$112 net |
| R7 | 1膽 #5 + 6腳 | B-trio ticket (swap #8 → #12, drop #10) | ✅ $322 | −$50 → **+$222 net** |
| R8 | 1膽 #1 + 5腳 | Add #10 | ❌ (banker 6th) | — |
| R9 | 1膽 #8 + 5腳 | Add #6 and #7 | ❌ (banker 11th) | — |

**Whole-card test of "add every Win-odds < 10 candidate to A's pool"** (R1 #3, R2 #8, R3 #10, R4 #12, R5 #12, R7 #12, R9 #7 + #12): $1,560 staked, 3 hits (R2, R3, R7), $594 returned, **−$966** (vs −$1,120). Adding these horses fixes Pattern B but costs about $440 extra. B-trio's **swap** version (drop the weakest > 10 leg instead of adding) got the same three hits for $1,110 (−$516).

**Whole-card test of "full box of A's pool"**: $2,510 staked, 2 hits (R5, R6), $1,528 returned, **−$982**. Boxing helps only on Pattern A.

- **Fixable misses** (with a rule we can write): **R2, R3, R7** via the Win-odds < 10 candidate rule. That recovers $594 for about $180 extra stake (add) or about $40 less stake (B-trio swap). **R5 and R6** need a box or a different banker, and no tested rule picks them cleanly. The full-box alternative recovers $1,528 for $240 extra on those two races.
- **Unfixable misses**: **R1** (banker drifted to 10; #12 at 14 pre-race), **R4** (banker 6th + a 9.9→3.8 plunge horse), **R8** (banker 6th + 14→6.4 gap), **R9** (banker 11th + two gaps).

## Section 6: Key Moments

- **Best Bet**: **None hit. The least-bad was R7 (−$150):** banker #5 CLOUD NINE (2.2 fav) ran 2nd and leg #3 FLASHING FIGHTER (MC #6, kept in by the ≥ 25% rule) won. Only #12 LEGEND STAR (MC 1.5%) was missing. B-trio's swap put #12 in place of #8 and returned **$322 on $100**, the best single result on the card across all three tickets.
- **Worst Bet**: **R3: −$210, the card's biggest stake, on a race the banker won.** Rules 8 and 9 widened the pool to 8 horses (#5 25/1, #7 20/1, #8 colic case), but the 3rd favourite #10 PRESTIGE RICKY (7.4, Adj Place 18.7%) was left out and ran 2nd. The report flagged it as "the most notable omission". B-trio had it and returned $206 on $150.
- **Most Frustrating**: **R6: Trio $1,133, all three placers in the legs.** #2 (won, Rule 8 leg), #3 (2nd) and #1 (3rd) were all on the ticket. Banker #7 LE ZONDA, the 2.3 favourite with capped Adj 50% / 85% and three straight wins, ran 5th.
- **Biggest Surprise**: **R4 #12 SAME TO YOU.** MC rated it 1.1% to win (MC #10, "overvalued by 89%"). It was 9.9 at 11:00, was **backed to 3.8 SP favourite**, and ran 2nd. Meanwhile the MC #1 #2 FORERUNNER (41.9%, top 4 in six straight runs) ran 6th. Trio $762.
- **Best MC Call**: **R4 #4 ELEGANT LIFE.** MC had it 3rd (11.5% / 38.9%) while it was 8th in the market at 13. It won at 11. Honourable mention: **R3 #2 SHOOTING TO TOP**, MC 42.9%, drifted 2.8→4.0 and still won.

## Section 7: Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 2 | R2 (#3), R3 (#2) |
| Banker 2nd-3rd | 1 | R7 (#5 2nd) |
| Banker out of top 3 | 6 | R1 (10th), R4 (6th), R5 (4th), R6 (5th), R8 (6th), R9 (11th) |

**Banker strike rate (top 3): 3/9 = 33.3%** · **Banker win rate: 2/9 = 22.2%**

Mean banker MC Win% was **33.9%** and mean MC Place% **66.6%**, against an actual place rate of 33.3%. **MC overstated the banker by ~33pp** (11-Oct: +41pp). **MC #1 ≥ 35% placed 2/4** (R3, R7 ✅; R4, R6 ❌). **Below 35% it placed 1/5** (R2 ✅). **Below 30%** it went **0/4** (R1 24.5%, R5 29.5%, R8 23.9%, R9 22.3%). All four were Competitive races. Two-card record below 30%: **0/8**.

**Banker by market rank at SP:** rank 1–2: **2/6** (R2, R7 ✅; R5, R6, R8, R9 ❌) · rank 3: **1/2** (R3 ✅; R4 ❌) · rank 4+: **0/1** (R1, drifted to 10). Four of the six failures were the SP favourite or joint favourite (R5 3.7, R6 2.3, R9 4.6=). **MC #2 placed 2/8** (R8 #9 won, R9 #5 won; R5's MC #2 #7 was scratched), back to its pre-11-Oct norm.

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | 0/9 |
| All 3 in pool OR banker + 2 legs | 2/9 (R5, R6; both banker fails) |
| At least 2 placers in pool | 8/9 (all except R9) |
| Banker hit + pool gap | 3/9 (R2, R3, R7) |

**Both the pool and the banker failed this card.** On 11-Oct the pool held the frame in 7/10 races. Today it held 2/9. **The 8 gap horses had MC ranks #7–#10 and pre-race odds of 5.6–14**, and five of them were under 10. MC's Win% ranking does not see the horses the market likes.

### 7c. MC-Market Divergence Outcomes

From each report's "Market" paragraph. "Correct" = an undervalued horse placed, or an overvalued horse did not. R5 #4 (scratched) excluded.

| Race | Undervalued (MC > mkt) → finish | Overvalued (MC < mkt) → finish |
|------|-------------------------------|------------------------------|
| R1 | #6 121% → 9th ❌ · #5 → 10th ❌ | **#1 (fav) → 1st ❌** · **#11 → 3rd ❌** · #3 → 6th ✅ · #7 → 4th ✅ |
| R2 | #4 → 5th ❌ · #7 → 6th ❌ | **#8 (2nd fav) → 2nd ❌** · **#10 (3rd fav) → 3rd ❌** · #9 → 9th ✅ |
| R3 | #9 78% → 4th ❌ · #4 95% → 10th ❌ | **#10 (3rd fav) → 2nd ❌** · **#1 → 3rd ❌** · #8 89% → 7th ✅ |
| R4 | #2 93% → 6th ❌ · **#4 (MC 3rd at 13) → 1st ✅** | **#10 → 3rd ❌** · **#12 89% → 2nd ❌** |
| R5 | #1 83% → 4th ❌ | **#6 → 2nd ❌** · **#2 → 3rd ❌** · #8 98% → 8th ✅ |
| R6 | #5 → 6th ❌ · **#3 → 2nd ✅** · #4 → 9th ❌ | **#2 76% → 1st ❌** · #8 96% → 8th ✅ · #6 69% → 4th ✅ |
| R7 | #1 → 4th ❌ · #6 → 5th ❌ | **#12 87% → 3rd ❌** · **#3 (2nd mkt) → 1st ❌** · #2 89% → 6th ✅ · #9 83% → 7th ✅ |
| R8 | #1 → 6th ❌ · **#2 (value 1.48) → 2nd ✅** | #11 85% → 7th ✅ · #6 74% → 9th ✅ · #8 62% → 12th ✅ |
| R9 | #1 153% → 6th ❌ · #2 137% → 7th ❌ · #8 96% → 11th ❌ | #10 (fav) → 10th ✅ · **#7 → 3rd ❌** · #12 → 5th ✅ |

**MC divergence accuracy: 17/47 (36.2%)**, the worst of the season (11-Oct: 55.8%). Undervalued: **3/19 (15.8%)**. Overvalued: **14/28 (50.0%)**. **Claimed edge > 100%: 0/3** (R1 #6, R9 #1, R9 #2). There were no > 200% claims this card, so the season stays at 2/19. **When MC opposed a horse the market had 1st–3rd at SP, that horse placed 7/7** (R1 #1, #11; R2 #10; R4 #12; R5 #6, #2; R7 #3). Two-card total: **12/14**. **Near-zero blind spot:** MC Win% < 4% at SP ≤ 6 placed **3/4** (R3 #10, R4 #12, R9 #6 ✅; R6 #9 7th ❌). Widened to SP ≤ 8, it placed **6/7** (adds R2 #8, R8 #10, R9 #7). Under the < 3% / SP ≤ 6 definition: 1/1 (R4 #12), season **14/20**.

### 7d. SCMP +Excuses Flag Performance

29 `+excuses` flags across 99 runners (field base rate 27/99 = 27.3%).

| Race | Horse | +Excuses For | Pre odds | Finished | Verdict |
|------|-------|--------------|----------|----------|---------|
| R1 | #5 THE ALL ROUNDER (banker) | held up 500–400M | 6.3 | 10th | ❌ |
| R1 | #8 SETANTA | steadied 250M | 10 | 8th | ❌ |
| R1 | #3 WHOWROTETHATSONG | tight, no clear run | 9.8 | 6th | ❌ |
| R1 | #4 FLASH STAR | wide, no cover | 38 | 7th | ❌ |
| R1 | #7 OUR LUCKY GLORY | steadied | 18 | 4th | ❌ |
| R2 | #4 CASA ROCHESTER | held up, eased | 7.2 | 5th | ❌ |
| R3 | #2 SHOOTING TO TOP (banker) | wide, no cover | 2.8 | **1st** | ✅ |
| R3 | #5 THE AZURE | steadied when crowded | 25 | 6th | ❌ |
| R3 | #1 EXCEED THE LIMIT | checked and shifted | 8.7 | **3rd** | ✅ |
| R3 | #10 PRESTIGE RICKY | crowded, steadied | 7.4 | **2nd** | ✅ |
| R4 | #4 ELEGANT LIFE | steadied 200M | 13 | **1st** | ✅ |
| R4 | #10 COUNTRY PRIDE | wide, no cover | 4.9 | **3rd** | ✅ |
| R4 | #7 THE PERFECT MATCH | eased, shifted | 6.6 | 4th | ❌ |
| R4 | #3 FIND MY LOVE | badly held up | 11 | 7th | ❌ |
| R4 | #1 DRAGON FOUR SEAS | checked at start | 10 | 5th | ❌ |
| R5 | #6 DAN ATTACK | restricted room | 5.9 | **2nd** | ✅ |
| R5 | #10 EVERSTAR | unbalanced after contact | 20 | 9th | ❌ |
| R5 | #7 / #4 | — | — | scratched | — |
| R6 | #3 HELENE FEELING | wide early | 12 | **2nd** | ✅ |
| R6 | #9 CALIFORNIATOTALITY | steadied | 8.2 | 7th | ❌ |
| R7 | #10 PERFECT TRIUMPH | held up 250–150M | 12 | 8th | ❌ |
| R7 | #7 GOLDEN ELITE | tightened | 43 | 12th | ❌ |
| R8 | #9 CHINA WIN | wide, bumped | 4.7 | **1st** | ✅ |
| R8 | #10 VIOLET STAR | blundered, crowded | 14 | **3rd** | ✅ |
| R9 | #2 STRAIGHT TO GLORY | steadied | 14 | 7th | ❌ |
| R9 | #1 AURORA PATCH | crowded early | 17 | 6th | ❌ |
| R9 | #4 SYMBOL OF STRENGTH | bumped, tight | 15 | 4th | ❌ |
| R9 | #10 WUKONG JEWELLERY | wide, no cover | 4.5 | 10th | ❌ |
| R9 | #3 MY DAY MY WAY | caught wide | 15 | 8th | ❌ |
| R9 | #7 FOUR STARS ALIGN | 4-wide | 7.3 | **3rd** | ✅ |

| Segment | Placed | Rate |
|---------|--------|------|
| All `+excuses` | 10/29 | **34.5%** |
| `+excuses` AND pre-race odds ≤ 8 | 6/10 | **60.0%** |
| `+excuses` AND pre-race odds > 8 | 4/19 | 21.1% |

**+Excuses hit rate (top 3): 10/29 (34.5%).** **Five-card ≤ 8 record: 31/57 (54.4%)**, about twice the base rate for the fifth card in a row. Two of the ≤ 8 placers (R3 #10 MC #8, R9 #7 MC #9) were outside MC's top 6 and were A pool gaps.

**Other flags:** `+trial` **4/10** (2/7 at pre-race ≤ 10; four-card ≤ 10 record **18/37**). `+form` **5/12**. `+draw` 2/3. **Negative flags 2/12** (`-injury30d` 0/5, `-perf` 0/1, `-age` 0/2, `-notRO` 2/4). Both negative-flag placers were `-notRO` horses at pre-race ≤ 7.3 (R5 #6 2nd, R9 #7 3rd). The injury and age flags were correct 7/7.

### 7e. Divergence Override Assessment

**No discretionary override was applied.** All tickets are rule output. The rules that changed tickets:

| Rule | Race | Effect | Result |
|------|------|--------|--------|
| Rule 8 extensions (Adj Place ≥ 20%) | R2 (#10), R3 (#1, #7), R4 (#6, #3), R5 (#3), R6 (#2, #9), R7 (#10) | +1 to +2 legs each | Put **three placers** in the pool (R2 #10 3rd, R3 #1 3rd, R6 #2 won). **None converted**: R2/R3 still had a market gap, R6's banker failed |
| Rule 9 (negative flag at ≤ 15) | R3 (#8 colic, 10) | +1 leg (+$70) | 7th |
| ≥ 25% must-include | R7 (#4) | +1 leg | 9th. The other ≥ 25% leg, #3, **won** |
| Mode D PASS | — | Did not fire (R8 24.9%, R9 22.3% ≥ 20%) | Both banker fails, −$200 |
| 雙膽拖 | — | Did not fire (no 2nd horse ≥ 63%) | — |
| SCMP banker swap | — | Did not fire (A banker = MC #1 in all races) | — |

**Cost/benefit:** pool widening (Rules 8 and 9 and the ≥ 25% extension) added about **$490 of stake** (R2 +$40, R3 +$150, R4 +$90, R5 +$30 net after refund, R6 +$90, R7 +$90) and returned nothing. **Lesson:** extending the pool on MC Place% adds horses MC already partly rates. The horses that beat the pool today were the ones **MC rated near zero and the market rated in its top 4**. The extension rule widens the pool in the wrong direction.

## Section 8: Learnings

### What Worked

- **The B-trio "Win odds < 10" candidate rule.** Of its 8 candidates, **5 placed** (R2 #8, R3 #10, R4 #12, R7 #12 and R9 #7 ✅; R1 #3, R5 #12 and R9 #12 ❌). They filled three of A's Pattern B gaps, and B-trio returned **$594 against A's $0**.
- **Some strong MC calls were right.** R3 #2 (MC 42.9%) won despite drifting 2.8→4.0, R2 #3 (MC 34.4%) won, and R4 #4 (MC #3, 8th in the market at 13) won. MC #1 ≥ 35% still placed only 2/4.
- **Pools still held ≥ 2 placers in 8/9 races.** Low-ranked legs paid off: R7 #3 (MC #6) won, R6 #2 (Rule 8) won, and R5 #5 (MC #7, A's 6th horse by Adj Place) won.
- **`+excuses` at pre-race ≤ 8 placed 6/10 (60%)**, the fifth straight card at about twice the base rate.
- **Negative injury/age/perf flags were 7/7 correct** (none placed).

### What Didn't Work

- **Bankers 3/9 (33.3%)**, with MC overstating banker Place% by ~33pp. **MC #1 below 30% went 0/4** (two-card 0/8). Favourite bankers R5 (3.7), R6 (2.3) and R9 (4.6=) all failed.
- **Pool selection is blind to the market.** All 8 gap horses were MC #7–#10. Six were at SP ≤ 8.7, and five were under 10 pre-race. **Market top-3 horses that MC opposed placed 7/7.**
- **MC "undervalued" calls went 3/19.** All three > 100% claims failed (R1 #6, R9 #1, R9 #2).
- **Rule 8/9 extensions cost ~$490 and returned $0.** R3's 8-horse, $210 pool still missed the 3rd favourite.
- **Late scratchings went unseen.** R5 lost MC #2 and #3 after the 11:00 snapshot, and the ticket was not re-thought. The refund limited the loss to $60, but the banker's 29.5% was computed against a field that no longer existed.

### Strategy Adjustments

- [ ] **Backtest a "market must-include" rule for A (Rule 10):** any horse at pre-race win odds < 10 with MC Place% ≤ 20% enters the pool, as a **swap** for the lowest Adj Place% leg priced > 10 (the B-trio mechanic) rather than an add. This card: swap version $1,110 → $594 (−$516), add version $1,560 → $594 (−$966), as bet −$1,120. Score it across all stratC per-race tables before adopting. Season B-trio is still −55.1%, so the swap only pays when the banker holds.
- [ ] **PASS (or box) Competitive races where MC #1 < 30%.** Two-card record 0/8 (11-Oct R1, R3, R5, R8; 14-Oct R1, R5, R8, R9). Count the full season record from the stratC banker tables before turning it into a rule.
- [ ] **Stop Rule 8 extensions above 7 horses.** R3's 8-horse pool ($210) is the season's largest single-race stake on a race that missed. Cap Mode A at 7, and spend the slot on the Rule 10 market horse instead.
- [ ] **Re-check scratchings and odds about 30 minutes before each race.** If an MC top-3 horse is scratched, re-run the MC and rebuild the ticket. R5 lost MC #2 and #3.
- [ ] **Keep `-notRO` out of the exclusion logic for short-priced horses.** This card: 2/2 placed at pre-race ≤ 7.3 (R5 #6, R9 #7). On 11-Oct both negative-flag placers (`-perf` R7 #10, `-notRO` R8 #11) were also market-backed.
- [ ] **Treat Happy Valley separately.** HV is now **4/43 hits, −68.7% ROI** over 5 meetings, and three of those meetings were blanks. Consider half stakes at HV until a structural fix (Rule 10 or the < 30% PASS) is backtested.
- [ ] **Scraper: mark scratched horses in the results JSON** (R5 #4/#7 are silently missing). Code change, not part of this review.

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | — | — | $0 | $0 | $0 | — |
| MEDIUM-HIGH | R2, R6 | 0/2 | $250 | $0 | −$250 | −100.0% |
| MEDIUM | R1, R3, R4, R5, R7 | 0/5 | $670 | $0 | −$670 | −100.0% |
| LOW-MEDIUM / MEDIUM-LOW | R8, R9 | 0/2 | $200 | $0 | −$200 | −100.0% |
| **TOTAL** | **9** | **0/9** | **$1,120** | **$0** | **−$1,120** | **−100.0%** |

**No confidence band hit.** The two MEDIUM-HIGH races split the failure modes: R2 was a banker win with a market gap, and R6 a favourite banker failure. **By classification**, Dominant (Mode A: R2, R3, R4, R6, R7) went **0/5, −$760**, and Competitive (R1, R5, R8, R9) went **0/4, −$360**. Over six cards, Dominant is **10/33, +$99** and non-Dominant is **3/28, −$2,553**. Dominant is still the only band near break-even, but today removed most of its profit.

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
| **11** | **2026-10-14** | **HV** | **9** | **0** | **$1,120** | **$0** | **−$1,120** | **−100.0%** |
| **TOTAL** | | | **105** | **18** | **$9,970** | **$5,768** | **−$4,202** | **−42.1%** |

> The 06-Sep figures use the §10e convention (9 races / 2 hits / $870). Meeting 5 was a post-meeting blind run (no SCMP) and is included for tracking. Meeting 9 stake is net of the $30 R9 refund. Meeting 10 excludes the R8 PASS. **Meeting 11 stake is net of the $90 R5 refund (two late scratchings).**

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
| **2026-10-14 HV** | **3/9** | **33.3%** |
| **Combined** | **48/105** | **45.7%** |

### 10c. Venue Breakdown

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
|-------|----------|-------|------|--------|----------|-----|-----|--------------|
| Sha Tin | 6 | 62 | 14 | $5,670 | $4,423 | −$1,247 | −22.0% | 25/62 (40.3%) |
| **Happy Valley** | **5** | **43** | **4** | **$4,300** | **$1,345** | **−$2,955** | **−68.7%** | **23/43 (53.5%)** |

**The HV gap widened.** HV has a 9.3% hit rate against 22.6% at Sha Tin, and three of five HV cards were blanks. The HV banker places more often (53.5% vs 40.3%), so the HV problem is the pool. **HV Pattern B/C gap horses keep coming from MC #7–#10 with market support.**

### 10d. Season Trajectory

| Metric | 09-06 | 09-09 | 09-13 | 09-16 | 09-23 | 09-27 | 10-01 | 10-04 | 10-07 | 10-11 | **10-14** | Trend |
|--------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-----------|-------|
| Hit rate (meeting) | 22.2% | 0.0% | 10.0% | 0.0% | 22.2% | 18.2% | 36.4% | 18.2% | 22.2% | 30.0% | **0.0%** | ↓ |
| Hit rate (cumulative) | 22.2% | 11.8% | 11.1% | 8.6% | 11.4% | 12.7% | 16.7% | 16.9% | 17.4% | 18.8% | **17.1%** | ↓ |
| Cumulative P&L | −$79 | −$719 | −$1,113 | −$1,963 | −$1,748 | −$2,315 | −$2,218 | −$2,084 | −$2,644 | −$3,082 | **−$4,202** | ↓ |
| Cumulative ROI | −9.1% | −47.6% | −46.8% | −60.8% | −42.3% | −45.6% | −37.8% | −29.8% | −33.9% | −34.8% | **−42.1%** | ↓ |
| Banker top 3 (meeting) | 33.3% | 50.0% | 30.0% | 75.0% | 55.6% | 45.5% | 45.5% | 54.5% | 55.6% | 30.0% | **33.3%** | → |
| Banker top 3 (cumulative) | 33.3% | 41.2% | 37.0% | 45.7% | 47.7% | 47.3% | 47.0% | 48.1% | 48.8% | 46.9% | **45.7%** | ↓ |

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
| **11** | **2026-10-14** | **HV** | **0/9** | **−$1,120** | **−100.0%** | **0/9** | **−$830** | **−100.0%** | **B (stake only, $290)** |
| **TOTAL** | | | **18/105** | **−$4,202** | **−42.1%** | **17/106** | **−$4,993** | **−47.6%** | **A** |

*B = review-spec Strategy B (MC top 6, 1膽+5腳, $100 flat; 07-Oct R9 $60 and 14-Oct R5 $30 net of refunds). B-trio (the reports' own Strategy B) this meeting: **3/9 (R2 $66, R3 $206, R7 $322), $1,110 staked, $594 returned, −$516, −46.5%**. It was the best of the three tickets. Season B-trio: **26/106, $13,280 staked, $5,968 returned, −$7,312, −55.1%**.*

| Cumulative Metric | Strategy A | Strategy B | Delta (B − A) |
|-------------------|-----------|-----------|---------------|
| Total meetings | 11 | 11 | — |
| Total races | 105 | 106 | +1 |
| Hits (rate) | 18/105 (17.1%) | 17/106 (16.0%) | −1 |
| Total staked | $9,970 | $10,490 | +$520 |
| Total returned | $5,768 | $5,497 | −$271 |
| **Cumulative P&L** | **−$4,202** | **−$4,993** | **−$791** |
| **Cumulative ROI** | **−42.1%** | **−47.6%** | **−5.5 pp** |
| Banker top 3 rate | 48/105 (45.7%) | 48/106 (45.3%) | 0 |

This card takes cumulative ROI from −34.8% to **−42.1%**, the largest single-card loss of the season, and it was the third HV blank. B won the session only on stake. Both strategies used the same MC #1 banker in all nine races and both went 0/9. **A's season lead narrows to $791, and all of it is now stake and rule-driven, not returns** (A has returned $271 more than B over 11 cards). The cumulative A/B data still leans to A, but the gap is closing and it does not test the real weakness. **The structural finding of this card is that the third ticket, B-trio, was the only one that hit, because it alone lets market prices into the pool.** The next experiment should be a Win-odds < 10 must-include in A, not more MC-based extensions.

## Section 11: A/B Strategy Comparison

### 11a. How Strategy B was derived

For each race, the **MC SIMULATION (raw)** table in `trio_strategy_20261014_HV_RN.md` was sorted by MC Win%. The first 6 horses form the pool and MC #1 is the banker: 1膽+5腳, 10 combos, $100, every race. A hit needs the banker in the top 3 and all 3 placers in the 6-horse pool. No race had a tie at MC #6/#7. **R5: MC #2 (#7) and #3 (#4) were late scratchings**, so 7 of B's 10 combos were refunded and B's net R5 stake is **$30** (live ticket 1 >< 2, 3, 6). This is not the same as the "STRATEGY B (MC-only)" block in each report, which is tracked as B-trio.

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | Strat A Banker | Strat B Pool (MC top 6) | Strat B Banker (MC #1) | Result (1→2→3) | A Hit? | B Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|--------------|----------------|-------------------------|------------------------|----------------|--------|--------|--------|----------|----------|---------|---------|----------------|
| R1 | 5,6,10,1,11,8 | #5 | 5,6,1,10,11,8 | #5 | 1→12→11 | ❌ | ❌ | $246 | $0 | $0 | $100 | $100 | Same pool & banker |
| R2 | 3,4,6,7,1,10 | #3 | 3,4,6,7,1,10 | #3 | 3→8→10 | ❌ | ❌ | $66 | $0 | $0 | $100 | $100 | Same pool & banker (A's Mode A 5 + Rule 8 = MC top 6) |
| R3 | 2,9,6,4,5,1,7,8 | #2 | 2,9,6,4,7,5 | #2 | 2→10→1 | ❌ | ❌ | $206 | $0 | $0 | $210 | $100 | A +#1 (Rule 8, **3rd**), +#8 (Rule 9); #10 in neither |
| R4 | 2,4,10,7,5,3,6 | #2 | 2,5,4,10,7,6 | #2 | 4→12→10 | ❌ | ❌ | $762 | $0 | $0 | $150 | $100 | A +#3 (Rule 8); #12 in neither; banker 6th |
| R5 | 1,7*,4*,6,2,5,3 | #1 | 1,7*,4*,6,2,3 | #1 | 5→6→2 | ❌ | ❌ | $395 | $0 | $0 | $60 | $30 | A had #5 (MC #7, 6th by Adj Place) → all 3 in A; B missed #5. Banker 4th in both. *scratched |
| R6 | 7,5,3,4,1,9,2 | #7 | 7,5,3,4,1,2 | #7 | 2→3→1 | ❌ | ❌ | $1,133 | $0 | $0 | $150 | $100 | A +#9 (Rule 8); both Pattern A |
| R7 | 5,6,1,8,3,4,10 | #5 | 5,6,1,8,4,3 | #5 | 3→5→12 | ❌ | ❌ | $322 | $0 | $0 | $150 | $100 | A +#10 (Rule 8); #12 in neither |
| R8 | 1,9,3,2,7,12 | #1 | 1,9,3,12,2,7 | #1 | 9→2→10 | ❌ | ❌ | $524 | $0 | $0 | $100 | $100 | Same pool & banker |
| R9 | 8,5,2,1,4,10 | #8 | 8,5,2,1,4,10 | #8 | 5→6→7 | ❌ | ❌ | $445 | $0 | $0 | $100 | $100 | Same pool & banker |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | 9 | 9 | 0 |
| Hits | 0/9 (0.0%) | 0/9 (0.0%) | 0 |
| Total staked | $1,120 | $830 | −$290 |
| Total returned | $0 | $0 | $0 |
| **Net P&L** | **−$1,120** | **−$830** | **+$290** |
| **ROI** | −100.0% | −100.0% | 0.0 pp |
| Banker top 3 rate | 3/9 (33.3%) | 3/9 (33.3%) | 0 |

*B-trio (report's own B, for reference): **3/9 (R2 $66, R3 $206, R7 $322), $1,110 staked, $594 returned, −$516, −46.5%**, banker 3/9. Its Win-odds < 10 step added R2 #8, swapped R3 #5 → #10 and R7 #8 → #12. All three of those horses placed in races where the banker also placed. It also swapped R4 #6 → #12 (#12 2nd, banker failed) and added R9 #7 (3rd, banker failed).*

### 11d. Where A and B Diverged

| Race | What Differed | A Result | B Result | Impact | Root cause |
|------|---------------|----------|----------|--------|------------|
| R3 | Pool: A +#1, +#8 (8 horses) | MISS ❌ | MISS ❌ | B +$110 | Rule 8 (#1 Adj Place 23.4%) and Rule 9 (#8 `-injury30d` at 10). #1 ran 3rd but #10 was missing from both |
| R4 | Pool: A +#3 | MISS ❌ | MISS ❌ | B +$50 | Rule 8 (#3 Adj Place 20.2% via `+excuses`) |
| R5 | Pool: A had #5 (won), B had only MC top 6 | MISS ❌ (Pattern A) | MISS ❌ (Pattern C) | B +$30 | A's Mode B takes 3 by Adj Place% after the top 3 Adj Win%, which reached #5 (MC #7). Banker failed in both |
| R6 | Pool: A +#9 | MISS ❌ | MISS ❌ | B +$50 | Rule 8 (#9 22.8% via `+excuses`) |
| R7 | Pool: A +#10 | MISS ❌ | MISS ❌ | B +$50 | Rule 8 (#10 exactly 20.0% via `+excuses`) |

Net: **B +$290**, all from stake. No divergence changed an outcome. R1, R2, R8 and R9 were identical tickets.

### 11e. Session Verdict

**B won by $290 (−$830 vs −$1,120), purely on stake.** Neither ticket hit, the bankers were identical in all nine races, and the result frames that beat them were the same for both. So **this is not evidence that SCMP adjustments or Rule 8 hurt prediction.** They only cost money, adding ~$490 of legs (three of which placed) in races lost for other reasons. The day's structural lesson sits outside the A/B frame. **Both A and B rank horses only by MC, and MC rated every gap horse at 1–4% to win.** The only ticket that hit was B-trio, which forces in horses the market prices under 10. It went 3/9 and recovered $594. Variance played a part (R5 and R6 were Pattern A misses worth $1,528 on favourite bankers), but the three Pattern B misses were **systematic**: the reports named each missing horse as the main omission risk before the race.
