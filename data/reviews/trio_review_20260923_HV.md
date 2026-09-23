# Trio Post-Race Review — Happy Valley | 2026-09-23

**Meeting 5 of the 2026/27 season.** 9-race Wednesday night card, Turf (course letter not recorded in the racecard), going **Good** throughout. No scratchings. Results: `data/historical/results_20260923_HV.json`. Bet records: `data/reports/trio_strategy_20260923_HV_R1–R9.md`.

> **Caveats for this meeting — read before comparing with other cards**
> - **Blind run after the meeting had finished.** The nine reports were generated post-meeting with `--hide-actual`. Nothing was bet live.
> - **SCMP was skipped**, so Step 3c (form flags, TIR, vet, trackwork) never ran. **Strategy A = raw MC**: every Adj factor is 0, there is no SCMP-driven jockey or flag adjustment, and every A pool equals the MC top 6 by Win%. §7d has no data.
> - **Odds:** R1/R2 used **racecard win odds with no place odds**. R3–R9 used the **last momentum-collector snapshot before the off**. Several of those snapshots still differ a lot from the HKJC final odds in the results file (R7 #11 16→8.1, R8 #10 23→9, R9 #10 5.5→3.1). "SP" below = final odds from the results file. "Snap" = the odds the report used.
> - **Dividends verified.** All 9 Trio, Quinella and Win dividends match HKJC's official GraphQL dividends. R9 quinellaDividend was a scrape truncation ($1) and has been corrected to $1,090.5. Trio (per $10): R1 $408 · R2 $2,397 · R3 $775 · R4 $117 · R5 $2,378 · R6 $50 · R7 $402 · R8 $300 · R9 $1,065.
> - **Scoring:** A and the report's Strategy B (**B-trio**) are scored exactly as written: banker + legs, combos × $10. §10e and §11 also carry the **review-spec B** (MC top 6, 1膽+5腳, $100 flat), the same convention as the 16-Sep review. Because A = raw MC this meeting, **review-spec B is identical to A in all 9 races**.

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played | **9 (R1–R9)** |
| Hit rate | **2/9 (22.2%)** |
| Total staked | $900 |
| Total returned | $1,115 |
| **Net P&L** | **+$215** |
| **ROI** | **+23.9%** |
| Session Result | **WIN** |

**This is the season's first winning card.** It rests on one race: R9, a LOW-confidence ticket that paid $1,065. The other hit (R6, $50) returned half its stake. Bankers placed 5/9. B-trio (the reports' Strategy B) also hit twice but lost **−$1,063**, because its Win-odds swap removed R9's 2nd-placer.

## Section 2: Race-by-Race Cross-Reference

Result column: **bold** = top-3 finisher NOT in the Strategy A pool.

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
| R1 | C5 1650m | A+R8 (1膽+5腳) | #3 | 8, 11, 9, 1, 6 | **4**→11→**10** | MISS ❌ | $408 | $0 | −$100 | Banker fail (#3 5th, mkt 3rd) + 2 gaps (#4 won, 9→4.5; #10 at 13) |
| R2 | C4 1200m | B (1膽+5腳) | #4 | 7, 10, 3, 12, 1 | 10→**11**→**8** | MISS ❌ | $2,397 | $0 | −$100 | Banker fail (#4 10th, jt fav) + 2 gaps (#11 at 20, #8 at 12) |
| R3 | C4 1650m | B (1膽+5腳) | #5 | 2, 7, 3, 6, 9 | **8**→2→**12** | MISS ❌ | $775 | $0 | −$100 | Banker fail (#5 6th, fav 2.7) + 2 gaps (#8 won at 4.4, MC 1.0%; #12 at 26) |
| R4 | C4 1200m | B (1膽+5腳) | #6 | 9, 8, 11, 4, 5 | 4→6→**1** | MISS ❌ | $117 | $0 | −$100 | **Banker hit (#6 2nd)**, pool gap (#1 at 8.3 snap / 5.5 SP) |
| R5 | C4 1650m | B (1膽+5腳) | #1 | 8, 6, 4, 5, 9 | 6→**12**→1 | MISS ❌ | $2,378 | $0 | −$100 | **Banker hit (#1 3rd at 15)**, pool gap (#12 at 13, MC 7.6%) |
| R6 | C4 1000m | A+R8 (1膽+5腳) | #1 | 4, 5, 11, 3, 9 | 1→5→4 | **HIT ✅** | $50 | $50 | −$50 | — (chalk trio, paid below stake) |
| R7 | C3 1200m | B (1膽+5腳) | #6 | 3, 4, 11, 10, 7 | 11→**12**→**8** | MISS ❌ | $402 | $0 | −$100 | Banker fail (#6 8th, mkt 10th) + 2 gaps (#12 fav 3.5, #8 at 5.9) |
| R8 | C3 1200m | B (1膽+5腳) | #11 | 10, 3, 2, 1, 8 | 8→11→**6** | MISS ❌ | $300 | $0 | −$100 | **Banker hit (#11 2nd)**, pool gap (#6 at 22, MC 13.0%) |
| R9 | C3 1800m | B (1膽+5腳) | #6 | 3, 7, 2, 12, 5 | 6→5→2 | **HIT ✅** | $1,065 | $1,065 | **+$965** | — |

## Section 3: Hits Analysis

### R6 — 1→5→4 · Trio $50

| Horse | Role | Snap / SP | MC Win% | Adj Place% (= MC) | Result |
|-------|------|-----------|---------|-------------------|--------|
| #1 JUMBO BLESSING | 膽 Banker | 3.1 / 3.5 | 55.9% | 85.4% | **1st** |
| #5 GEORGIAN SIGMA | 腳 | 7.7 / 4.0 | 8.8% | 37.3% | **2nd** |
| #4 SUPERB KING | 腳 | 2.9 / 2.6 (fav) | 10.0% | 41.3% | **3rd** |

The Dominant-race banker (card-high 55.9% / 85.4%) won, and the market's top 3 filled the frame. MC's top 3 by Win% were the same three horses. **Return $50 on $100 = −$50.** A 10-combo 膽拖 cannot make money when the trio is the chalk combination. This is the first "losing hit" of the season.

### R9 — 6→5→2 · Trio $1,065

| Horse | Role | Snap / SP | MC Win% | Adj Place% (= MC) | Result |
|-------|------|-----------|---------|-------------------|--------|
| #6 FORTUNATE SON | 膽 Banker | 11 / 11 (mkt 4th) | 21.8% | 50.1% | **1st** |
| #5 FIVEFORTWO | 腳 (6th pool slot) | 20 / 24 (mkt 11th) | 7.7% | 27.6% | **2nd** |
| #2 SERAPH GABRIEL | 腳 | 3.0 / 4.4 (mkt 2nd) | 11.1% | 33.2% | **3rd** |

**What made it work:** the MC call on a banker the market had at 11 (≈7% implied vs MC 21.8%), plus **#5 FIVEFORTWO taking the last Mode B slot** as 3rd by Adj Place% after the top 3 by Win%. The report's independent finish-time projection had #5 fastest. **B-trio swapped #5 out** (Place% 27.6% in the 20–30% band, odds 20 > 10) for #10 WINDLORD (5.5 → 3.1 fav, ran 5th) and missed. The report rated this race **LOW confidence** and suggested "consider a stake cut or PASS". **Return $1,065 on $100 = +$965.**

## Section 4: Miss Classification

| Pattern | Count | Races |
|---------|-------|-------|
| **A** — Banker fail, all 3 placers already in legs | **0/7** | — |
| **B** — Banker hit, pool gap | **3/7** | R4, R5, R8 |
| **C** — Banker fail **and** pool gap | **4/7** | R1, R2, R3, R7 |

### Pattern A: Banker Fail — All 3 Placers Already in Legs

**None for Strategy A.** (B-trio had one: R7, where all three placers were in its legs and banker #6 ran 8th. See §11.)

### Pattern B: Banker Hit — Pool Gap (3/7)

| Race | Banker | Pos | Other placer in pool | Pool gap | Gap Snap / SP | Gap mkt rank (SP) | Gap MC Place% | Missed return |
|------|--------|-----|----------------------|----------|---------------|-------------------|---------------|---------------|
| R4 | #6 CLOUD NINE | 2nd | #4 BROWNNEEDSFURTHER (1st) | **#1 FRIENDS OF SHAJING** (3rd) | 8.3 / 5.5 | 2nd | 18.6% | $117 |
| R5 | #1 GLORIOUS JOURNEY | 3rd | #6 HAPPY SMILE (1st) | **#12 GAZELEY** (2nd) | 13 / 13 | 8th | 7.6% | $2,378 |
| R8 | #11 LEADING AGILITY | 2nd | #8 DANICA'S CHOICE (1st) | **#6 THRIVING BROTHERS** (3rd) | 17 / 22 | 7th | 13.0% | $300 |

Combined Pattern B missed return: **$2,795**. Only R4 was reachable: its gap horse was under 10 at the snapshot and the market's 2nd choice at the off. R5 and R8's gaps were mid-market outsiders the MC rated 7.6% and 13.0%.

### Pattern C: Banker Fail + Pool Gap (4/7)

| Race | Banker | Snap / SP | Mkt rank (SP) | Pos | Pool gap(s) | Gap SP (MC Win%) |
|------|--------|-----------|---------------|-----|-------------|------------------|
| R1 | #3 SOARING BRONCO | 5.2 / 4.8 | 3rd | 5th | #4 RED BRICK WARRIOR (1st), #10 WINDICATOR FAMILY (3rd) | 4.5 (1.4%), 13 (2.9%) |
| R2 | #4 MATZDEN | 3.9 / 4.5 | 2nd | 10th | #11 LEGEND STAR (2nd), #8 COUNTRY PRIDE (3rd) | 20 (2.5%), 12 (1.2%) |
| R3 | #5 AMAZING GAZE | 2.8 / 2.7 | **1st (fav)** | 6th | #8 AKERMANIS GOLD (1st), #12 SURE JOYFUL (3rd) | 4.4 (1.0%), 26 (0.4%) |
| R7 | #6 POWER KOEPP | 22 / 19 | 10th | 8th | #12 DARYL FLASH (2nd), #8 WUKONG JEWELLERY (3rd) | 3.5 fav (0.9%), 5.9 (2.6%) |

All four Pattern C races had **two** gaps, so no single-horse fix rescues them. The common thread: **in three of the four (R1, R3, R7) a market top-3 horse the MC rated ≤ 2.6% win placed**, and in R1 and R3 that horse won.

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R1 | 膽拖 #3 + 5腳, $100 | Add #4 (9.0 snap < 10) — still missing #10 (13) and banker 5th | ❌ | — |
| R2 | 膽拖 #4 + 5腳, $100 | No fix — banker 10th, gaps at 20 and 12 | ❌ | — |
| R3 | 膽拖 #5 + 5腳, $100 | Add #8 (6.0 snap) — still missing #12 (26) and banker 6th | ❌ | — |
| R4 | 膽拖 #6 + 5腳, $100 | **Add #1 (8.3 snap < 10) as 6th leg → C(6,2)=15** (= B-trio ticket) | **✅ $117** | **+$50** |
| R5 | 膽拖 #1 + 5腳, $100 | No realistic fix — #12 at 13, MC 9th | ❌ | — |
| R6 | HIT | Cut to fewer combos around the chalk trio | — | Trio $50 < $100 stake in any 10-combo structure |
| R7 | 膽拖 #6 + 5腳, $100 | Bank a market top-3 horse (#12 or #8) with #11 in legs; or full box of MC top 6 + market top 3 (84 combos, $840) | ✅ only at ≥ $840 (loss) or with a banker swap the rules don't allow | — |
| R8 | 膽拖 #11 + 5腳, $100 | No fix — #6 at 22, MC 7th | ❌ | — |
| R9 | HIT | — (B-trio's swap of #5 → #10 would have **lost** this race) | — | — |

**Fixable misses:** R4 only — **$117 recoverable for $50 extra stake** (+$67 net). The card would go **+$215 → +$282**.

**Unfixable misses:** R1, R2, R3, R5, R7, R8. Four were double-gap Pattern C races and two were Pattern B with outsiders at 13 and 22.

**The 16-Sep candidate rules, tested on this card:**

| Candidate rule (from 16-Sep §8) | Effect here | Net vs A as bet |
|---------------------------------|-------------|-----------------|
| Must-include any horse < 10 at snapshot (add-only) | Adds 1–3 legs in every race; stake $1,610; hits R4, R6, R9 ($1,232) | **−$593** (P&L −$378 vs +$215) |
| Don't bank MC #1 at market rank ≥ 4 (PASS) | PASS R5 (snap rank 7), R7 (10), R9 (5) | **−$765** (saves $200, loses R9's $1,065 return) |
| Lower Rule 8 to 17.5% | Adds R1 #12 (17.6%), R4 #1 (18.6%), R9 #9 (19.1%); R2 #1 / R5 #9 / R7 #7 already in | **−$33** (R4 hit +$117 for +$150 extra stake) |

**Both headline rules from 16-Sep would have lost money on this card.** That does not settle them: it is one meeting against two. It does show that neither rule is a free lunch and that both need a full-season backtest before adoption.

## Section 6: Key Moments

- **Best Bet — R9 banker #6 FORTUNATE SON.** MC 21.8% against an 11 SP (market 4th, ≈7% implied). He won. The 6th-slot leg #5 FIVEFORTWO (24) ran 2nd, and the Trio paid $1,065 on a LOW-confidence ticket that the report half-suggested passing.

- **Worst Bet — R7.** Banker #6 POWER KOEPP was the market's 10th choice at 19–22 and ran 8th. The market's top three (#12 3.5, #8 5.9, #1 5.6), which MC rated at 0.9%, 2.6% and 2.6% win, ran **2nd, 3rd and 4th**. Winner #11 was an A leg.

- **Most Frustrating — B-trio R9.** The Step B swap rule removed #5 FIVEFORTWO (MC Place 27.6%, the only replaceable leg) for #10 WINDLORD (5.5 → 3.1 favourite, ran 5th). #5 ran 2nd. **That swap cost a $1,065 Trio.** It is the second meeting running where the swap removed a placer (16-Sep R8: #4 HELENE FEELING).

- **Biggest Surprise — R3 #8 AKERMANIS GOLD.** MC 1.0% win / 5.9% place, 11th of 12 by MC. He was 6.0 at the snapshot, 4.4 at the off, and **won**. R1 was similar: #4 RED BRICK WARRIOR (MC 1.4%, 9.0 on the racecard → 4.5 SP) won.

- **Best MC Call — R5 #1 GLORIOUS JOURNEY.** MC #1 (22.6%) at an SP of 15, 9th in the market, ran 3rd. MC's other top-4 horse #6 HAPPY SMILE (20.8%) won. The market favourite #9 VIVA FIRECRACKER (5.0) ran last. The MC read the race, but #12 GAZELEY (13) broke the ticket.

## Section 7: Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 2 | R6 (#1), R9 (#6) |
| Banker 2nd–3rd | 3 | R4 (#6, 2nd), R5 (#1, 3rd), R8 (#11, 2nd) |
| Banker out of top 3 | 4 | R1 (#3, 5th), R2 (#4, 10th), R3 (#5, 6th), R7 (#6, 8th) |

**Banker strike rate (top 3): 5/9 = 55.6%**
**Banker win rate: 2/9 = 22.2%**

Mean banker MC Place% was **62.9%** against 55.6% actual, an over-statement of ~7pp. Season to date: **21/44 = 47.7%**.

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | **2/9** (R6, R9) |
| All 3 in pool OR banker + 2 legs | 2/9 |
| At least 2 placers in pool | **5/9** (R4, R5, R6, R8, R9) |
| Banker hit + pool gap | **3/9** (R4, R5, R8) |
| Top-3 slots captured by pool (of 27) | **16/27 = 59.3%** |

Random baseline for these pools (six horses in eight 12-runner fields and one 10-runner field) ≈ **51.1%** of top-3 slots. At 59.3% the pool is **~1.16× random**, about the same as 16-Sep (1.2×).

### 7c. MC-Market Divergence Outcomes

| Race | MC #1 | SP | Mkt rank | Fin | Market fav (SP) | Fin | Divergence | MC correct? |
|------|-------|----|----------|-----|-----------------|-----|------------|-------------|
| R1 | #3 SOARING BRONCO | 4.8 | 3 | 5th | #11 ORIENTAL SURPRISE (3.8) | **2nd** | MC prefers mkt-3rd | ❌ |
| R2 | #4 MATZDEN | 4.5 | 2 | 10th | #9 GOOD LUCK BABE (3.1) | 4th | MC prefers mkt-2nd | ❌ (neither placed) |
| R3 | #5 AMAZING GAZE | 2.7 | 1 | 6th | #5 (same) | 6th | agree | — |
| R4 | #6 CLOUD NINE | 1.7 | 1 | **2nd** | #6 (same) | 2nd | agree | — |
| R5 | #1 GLORIOUS JOURNEY | 15 | 9 | **3rd** | #9 VIVA FIRECRACKER (5.0) | 12th | MC prefers mkt-9th | ✅ |
| R6 | #1 JUMBO BLESSING | 3.5 | 2 | **1st** | #4 SUPERB KING (2.6) | **3rd** | MC prefers mkt-2nd | ✅ (both placed) |
| R7 | #6 POWER KOEPP | 19 | 10 | 8th | #12 DARYL FLASH (3.5) | **2nd** | MC prefers mkt-10th | ❌ |
| R8 | #11 LEADING AGILITY | 6.5 | 2 | **2nd** | #8 DANICA'S CHOICE (2.0) | **1st** | MC prefers mkt-2nd | ✅ (both placed) |
| R9 | #6 FORTUNATE SON | 11 | 4 | **1st** | #10 WINDLORD (3.1) | 5th | MC prefers mkt-4th | ✅ |

**MC divergence accuracy: 4/7 cases MC was correct (57%).** Market favourite top 3: **5/9**. MC #1 top 3: **5/9**.

**The market-rank split from 16-Sep did not hold on this card:**

| MC #1 market rank at SP | 13-Sep ST | 16-Sep HV | **23-Sep HV** | Combined (3 meetings) |
|-------------------------|-----------|-----------|---------------|-----------------------|
| 1–2 | 3/4 | 6/6 | **3/5** (R2 ❌, R3 ❌) | **12/15 (80%)** |
| 3 | 0/1 | — | **0/1** (R1) | 0/2 |
| 4+ | 0/5 | 0/2 | **2/3** (R5 ✅, R9 ✅, R7 ❌) | **2/10 (20%)** |

Rank 1–2 is still clearly better (80% vs 20%). But the "0/7 at rank 4+" record broke here, and one of the breaks was the card's $1,065 winner.

**The new MC blind spot: market-backed horses the MC rates near zero.**

| Race | Horse | MC Win% | MC Place% | Snap → SP | Finished |
|------|-------|---------|-----------|-----------|----------|
| R1 | #4 RED BRICK WARRIOR | 1.4% | 8.6% | 9.0 → 4.5 | **1st** |
| R3 | #8 AKERMANIS GOLD | 1.0% | 5.9% | 6.0 → 4.4 | **1st** |
| R7 | #12 DARYL FLASH | 0.9% | 4.7% | 4.4 → 3.5 | **2nd** |
| R7 | #8 WUKONG JEWELLERY | 2.6% | 11.5% | 4.2 → 5.9 | **3rd** |
| R7 | #1 FLYING WROTE | 2.6% | 13.1% | 5.0 → 5.6 | 4th |

**MC Win% < 3% with SP ≤ 6: 4/5 placed, 2 won.** If the MC had rated those horses correctly they would carry ~50–70% place. n=5 on one card, so this needs checking against the season, but it is the single largest calibration error on the card.

### 7d. SCMP +Excuses Flag Performance

**Not applicable.** SCMP was skipped for this blind run, so no `+excuses`, `+form`, `+trial` or negative flag was applied. The running flag tallies from 13-Sep and 16-Sep carry forward unchanged.

### 7e. Divergence Override Assessment

**No override was applied.** All tickets are rule output. The rules that fired:

| Rule | Race | Horse added | Result |
|------|------|-------------|--------|
| Rule 8 (Adj Place% ≥ 20% must be in pool) | R1 | #6 ALL ARE MINE (22.2%) | 4th ❌ |
| Rule 8 | R6 | #9 HARMONY FIRE (21.5%) | 7th ❌ |
| "No hard exclusion at odds ≤ 15" | R5 | #5 INNO SUPER (22.2%, 4.0) | 6th ❌ |

Rule 8 went **0/2** this card, after 4/4 on 16-Sep (season 4/6). In both races it filled the 6th Mode A slot, so it did not add stake.

## Section 8: Learnings

### What Worked

- **R9: MC over the market on a mid-priced banker.** #6 won at 11. #5 (MC 27.6% place, 24 SP) held the last Mode B slot and ran 2nd. The +$965 turned the card and the season's first profitable meeting.
- **A's plain 6-horse pool beat B-trio's odds rules by $1,278.** A + $215 vs B-trio −$1,063, with the same bankers. The only B-trio-exclusive hit was R4 ($117). The swap cost R9 ($1,065), and the adds cost $210 of extra stake across R5, R7 and R8 with nothing back.
- **Dominant banker R6 #1 (85.4% MC place) won**, the second meeting running where the card-high MC banker won (16-Sep R8 #12).
- **Bankers at market rank 1–2 remain the most reliable profile:** 12/15 (80%) over three meetings.

### What Didn't Work

- **Market-backed horses the MC rates near zero.** 4/5 placed (R1 #4 won, R3 #8 won, R7 #12 2nd, R7 #8 3rd). Four Pattern C misses; three of them involved one of these horses.
- **Double-gap Pattern C races (4/9).** Two bankers were market 1st–2nd (R2 #4, R3 #5) and still ran 10th and 6th. Nothing structural rescues a race with a failed banker and two outside placers.
- **Chalk hits don't pay a 10-combo ticket.** R6 hit for $50 on $100.
- **B-trio's Step B swap removed a placer for the second meeting running** (R9 #5 ran 2nd; 16-Sep R8 #4 ran 3rd). Swaps over the last two meetings: 2 gained a winner without converting a hit (R1, R3), 3 neutral (16-Sep R2, 23-Sep R2, R6), 2 lost a placer (one of which lost a $1,065 hit).
- **Odds snapshots still aren't final.** R1/R2 racecard odds missed R1 #4's 9.0 → 4.5 plunge. "Last pre-off snapshot" odds for R7–R9 still moved materially (R7 #11 16→8.1, R8 #10 23→9).

### Strategy Adjustments

- [ ] **Make B-trio's Step B add-only (drop the swap).** Two consecutive meetings where the swap removed a placer, one of which cost a $1,065 hit. Add-only on R9 = 8 legs / $280 → hit. Backtest the season: count swap wins vs swap losses before changing the skill.
- [ ] **Do NOT adopt "don't bank MC #1 at market rank ≥ 4" yet.** It would have PASSed R9 (+$965). Combined record at rank 4+ is 2/10: poor for placing, but the two hits pay long. Evaluate by **P&L**, not strike rate, across all meetings.
- [ ] **Do NOT adopt blanket "< 10 must-include" in A yet.** On this card it adds $710 of stake for +$117 return (−$593 net). On 16-Sep it was +$263. Test a narrower version: add a < 10 horse only when it is **market top 3** *and* the pool has no other market top-3 horse outside the banker.
- [ ] **Investigate MC's near-zero ratings on market-backed horses.** Pull every runner with MC Win% < 3% and SP ≤ 6 across the season and measure their place rate. If it holds near this card's 4/5, add a floor or blend MC with market-implied probability for those runners.
- [ ] **Chalk-trio guard:** when a race's MC top 3 by Win% = the market top 3 and the banker is ≥ 50% MC Win%, the trio will pay < $100 on a 10-combo ticket (R6: $50). Consider a smaller ticket or PASS.
- [ ] **Keep refreshing odds right up to the off and log the timestamp per race.** Racecard odds (R1/R2) are not usable for the < 10 rules.
- [ ] **For blind-run meetings, keep SCMP skipped as a pure-MC control.** This card shows what raw MC does with no Step 3c adjustments (+$215). Compare to SCMP-adjusted cards once there are enough of each.

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | — | — | — | — | — | — |
| MEDIUM-HIGH | R6 | 1/1 | $100 | $50 | −$50 | −50.0% |
| MEDIUM | R1, R2, R3, R4, R5 | 0/5 | $500 | $0 | −$500 | −100.0% |
| LOW-MEDIUM | R8 | 0/1 | $100 | $0 | −$100 | −100.0% |
| LOW | R7, R9 | 1/2 | $200 | $1,065 | **+$865** | **+432.5%** |
| **TOTAL** | **9** | **2/9** | **$900** | **$1,115** | **+$215** | **+23.9%** |

**Confidence was inversely useful on this card.** The only profit came from a LOW ticket. The only MEDIUM-HIGH race hit but lost money on a chalk dividend. The five MEDIUM races went 0/5. The 13-Sep suggestion to "PASS on LOW" would have turned +$215 into −$650. Confidence labels have now carried no usable signal across three meetings.

## Section 10: Running Total (Season Cumulative)

### 10a. Meeting-by-Meeting P&L

| Meeting | Date | Venue | Races | Hits | Staked | Returned | P&L | ROI |
|---------|------|-------|-------|------|--------|----------|-----|-----|
| 1 | 2026-09-06 | ST | 9 | 2 | $870 | $791 | −$79 | −9.1% |
| 2 | 2026-09-09 | HV | 8 | 0 | $640 | $0 | −$640 | −100.0% |
| 3 | 2026-09-13 | ST | 10 | 1 | $870 | $476 | −$394 | −45.3% |
| 4 | 2026-09-16 | HV | 8 | 0 | $850 | $0 | −$850 | −100.0% |
| **5** | **2026-09-23** | **HV** | **9** | **2** | **$900** | **$1,115** | **+$215** | **+23.9%** |
| **TOTAL** | | | **44** | **5** | **$4,130** | **$2,382** | **−$1,748** | **−42.3%** |

> The 06-Sep inconsistency carried forward from prior reviews (§10a 6 races / 1 hit / $700 vs §10e 9 races / 2 hits / $870) is **still unreconciled**; §10e figures are used. Meeting 5 was a post-meeting blind run (no SCMP) and was not bet live. It is included for model tracking.

### 10b. Cross-Meeting Banker Performance

| Meeting | Banker Top 3 | Rate |
|---------|--------------|------|
| 2026-09-06 ST | 3/9 | 33.3% |
| 2026-09-09 HV | 4/8 | 50.0% |
| 2026-09-13 ST | 3/10 | 30.0% |
| 2026-09-16 HV | 6/8 | 75.0% |
| **2026-09-23 HV** | **5/9** | **55.6%** |
| **Combined** | **21/44** | **47.7%** |

### 10c. Venue Breakdown

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
|-------|----------|-------|------|--------|----------|-----|-----|--------------|
| Sha Tin | 2 | 19 | 3 | $1,740 | $1,267 | −$473 | −27.2% | 6/19 (31.6%) |
| **Happy Valley** | **3** | **25** | **2** | **$2,390** | **$1,115** | **−$1,275** | **−53.3%** | **15/25 (60.0%)** |

HV's first hits came in the meeting where A was plain raw MC. HV bankers remain far better than ST's (60.0% vs 31.6%).

### 10d. Season Trajectory

| Metric | 09-06 (M1) | 09-09 (M2) | 09-13 (M3) | 09-16 (M4) | **09-23 (M5)** | Trend |
|--------|------------|------------|------------|------------|----------------|-------|
| Hit rate (meeting) | 22.2% | 0.0% | 10.0% | 0.0% | **22.2%** | ↑ |
| Hit rate (cumulative) | 22.2% | 11.8% | 11.1% | 8.6% | **11.4%** | ↑ |
| Cumulative P&L | −$79 | −$719 | −$1,113 | −$1,963 | **−$1,748** | ↑ (first gain) |
| Cumulative ROI | −9.1% | −47.6% | −46.8% | −60.8% | **−42.3%** | ↑ |
| Banker top 3 (meeting) | 33.3% | 50.0% | 30.0% | 75.0% | **55.6%** | ↓ |
| Banker top 3 (cumulative) | 33.3% | 41.2% | 37.0% | 45.7% | **47.7%** | ↑ |

### 10e. Cumulative A/B Comparison

| Meeting | Date | Venue | A Hits | A P&L | A ROI | B Hits | B P&L | B ROI | Winner |
|---------|------|-------|--------|-------|-------|--------|-------|-------|--------|
| 1 | 2026-09-06 | ST | 2/9 | −$79 | −9.1% | 2/9 | −$109 | −12.1% | A |
| 2 | 2026-09-09 | HV | 0/8 | −$640 | −100.0% | 0/8 | −$800 | −100.0% | Tie |
| 3 | 2026-09-13 | ST | 1/10 | −$394 | −45.3% | 1/10 | −$524 | −52.4% | A |
| 4 | 2026-09-16 | HV | 0/8 | −$850 | −100.0% | 0/8 | −$800 | −100.0% | B (stake only) |
| **5** | **2026-09-23** | **HV** | **2/9** | **+$215** | **+23.9%** | **2/9** | **+$215** | **+23.9%** | **Tie** (identical tickets) |
| **TOTAL** | | | **5/44** | **−$1,748** | **−42.3%** | **5/44** | **−$2,018** | **−45.9%** | **A** |

*B = review-spec Strategy B (MC top 6, 1膽+5腳, $100 flat), the same convention as the 16-Sep review. B-trio (the reports' Strategy B, as bet) this meeting: **2/9, $1,230 staked, $167 returned, −$1,063, −86.4%**. Season B-trio: **8/44, $5,570 staked, $2,291 returned, −$3,279, −58.9%**. See §11.*

| Cumulative Metric | Strategy A | Strategy B (review-spec) | Delta (B − A) |
|-------------------|-----------|--------------------------|---------------|
| Total meetings | 5 | 5 | — |
| Total races | 44 | 44 | 0 |
| Hits (rate) | 5/44 (11.4%) | 5/44 (11.4%) | 0 |
| Total staked | $4,130 | $4,400 | +$270 |
| Total returned | $2,382 | $2,382 | $0 |
| **Cumulative P&L** | **−$1,748** | **−$2,018** | **−$270** |
| **Cumulative ROI** | **−42.3%** | **−45.9%** | **−3.6 pp** |
| Banker top 3 rate | 21/44 (47.7%) | 21/44 (47.7%) | 0 |

The first winning card lifts the season from −$1,963 to **−$1,748 (−42.3%)**. The whole improvement came from one $1,065 Trio. A and review-spec B have now produced **the same hits in all five meetings** and differ only by $270 of stake. This card was the cleanest test so far: with SCMP skipped, A literally was MC top 6. The comparison that separates strategies is now **pool construction**, not the SCMP layer. On that front B-trio's market-odds rules helped on 16-Sep (+$453 vs A) and hurt here (−$1,278 vs A). Over the season B-trio is **−$1,531 behind A**. The evidence is converging on "plain MC pool beats MC + blanket odds adjustments", but the sample is still five meetings.

## Section 11: A/B Strategy Comparison

### 11a. How Strategy B was derived

> **Two Strategy Bs, same convention as 16-Sep.** The **review-spec B** (skill definition) = MC top 6 by raw Win%, banker MC #1, 1膽+5腳, $100 flat. It is used in §10e and in the "B" columns below. **B-trio** = the Strategy B actually written in each report (the trio-strategy skill's MC-only ticket): banker MC #1, legs = MC Place% > 20%, then the Step B Win-odds < 10 swap/add, variable stake. B-trio is scored exactly as written and is the subject of `trio_review_stratC_20260923_HV.md`. The two differ, so both are shown.

| Race | MC top-6 pool (Win% order) | B Banker | B-trio pool (banker first) | B-trio stake | Step B action |
|------|----------------------------|----------|----------------------------|--------------|---------------|
| R1 | 3, 8, 11, 9, 1, 6 | #3 | 3 / 8, 11, 9, 6, 4 | $100 | swap #1 → #4 |
| R2 | 4, 7, 10, 3, 12, 1 | #4 | 4 / 7, 10, 3, 9 | $60 | swap #12 → #9 (#1 < 20% not a leg) |
| R3 | 5, 2, 7, 3, 6, 9 | #5 | 5 / 2, 7, 3, 6, 8 | $100 | swap #9 → #8 |
| R4 | 6, 9, 8, 11, 4, 5 | #6 | 6 / 9, 8, 11, 4, 5, 1 | $150 | add #1 |
| R5 | 1, 8, 6, 4, 5, 9 | #1 | 1 / 8, 6, 4, 5, 9, 7 | $150 | add #9, #7 |
| R6 | 1, 4, 5, 11, 3, 9 | #1 | 1 / 4, 5, 11, 3, 12 | $100 | swap #9 → #12 |
| R7 | 6, 3, 4, 11, 10, 7 | #6 | 6 / 3, 4, 11, 10, 8, 12, 1 | $210 | add #8, #12, #1 |
| R8 | 11, 10, 3, 2, 1, 8 | #11 | 11 / 10, 3, 2, 1, 8, 4 | $150 | add #4 |
| R9 | 6, 3, 7, 2, 12, 5 | #6 | 6 / 3, 7, 2, 12, 10, 1, 9 | $210 | swap #5 → #10; add #1, #9 |

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | A Banker | Strat B Pool (MC top 6) | B Banker (MC #1) | Result (1→2→3) | A Hit? | B Hit? | B-trio Hit? | Trio $ | A Return | B Return | B-trio Return | A Stake | B Stake | B-trio Stake | Key Difference |
|------|--------------|----------|-------------------------|------------------|----------------|--------|--------|-------------|--------|----------|----------|---------------|---------|---------|--------------|----------------|
| R1 | 3,8,11,9,1,6 | #3 | 3,8,11,9,1,6 | #3 | 4→11→10 | ❌ | ❌ | ❌ | $408 | $0 | $0 | $0 | $100 | $100 | $100 | Identical A/B. B-trio swap caught winner #4, still missed #10 |
| R2 | 4,7,10,3,12,1 | #4 | 4,7,10,3,12,1 | #4 | 10→11→8 | ❌ | ❌ | ❌ | $2,397 | $0 | $0 | $0 | $100 | $100 | $60 | Identical A/B. B-trio 4 legs |
| R3 | 5,2,7,3,6,9 | #5 | 5,2,7,3,6,9 | #5 | 8→2→12 | ❌ | ❌ | ❌ | $775 | $0 | $0 | $0 | $100 | $100 | $100 | Identical A/B. B-trio swap caught winner #8, still missed #12 |
| R4 | 6,9,8,11,4,5 | #6 | 6,9,8,11,4,5 | #6 | 4→6→1 | ❌ | ❌ | **✅** | $117 | $0 | $0 | $117 | $100 | $100 | $150 | **B-trio add #1 (8.3) hit** |
| R5 | 1,8,6,4,5,9 | #1 | 1,8,6,4,5,9 | #1 | 6→12→1 | ❌ | ❌ | ❌ | $2,378 | $0 | $0 | $0 | $100 | $100 | $150 | Identical A/B. B-trio +#7 (10th) |
| R6 | 1,4,5,11,3,9 | #1 | 1,4,5,11,3,9 | #1 | 1→5→4 | ✅ | ✅ | ✅ | $50 | $50 | $50 | $50 | $100 | $100 | $100 | All hit; chalk dividend < stake |
| R7 | 6,3,4,11,10,7 | #6 | 6,3,4,11,10,7 | #6 | 11→12→8 | ❌ | ❌ | ❌ | $402 | $0 | $0 | $0 | $100 | $100 | $210 | B-trio had all 3 placers in legs; banker 8th (Pattern A) |
| R8 | 11,10,3,2,1,8 | #11 | 11,10,3,2,1,8 | #11 | 8→11→6 | ❌ | ❌ | ❌ | $300 | $0 | $0 | $0 | $100 | $100 | $150 | Identical A/B. B-trio +#4 (11th) |
| R9 | 6,3,7,2,12,5 | #6 | 6,3,7,2,12,5 | #6 | 6→5→2 | ✅ | ✅ | ❌ | $1,065 | $1,065 | $1,065 | $0 | $100 | $100 | $210 | **B-trio swapped out #5 (2nd) for #10 (5th)** |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline*) | Strategy B (MC Top 6) | Delta (B − A) | B-trio (as bet) |
|--------|-----------------------------|-----------------------|---------------|-----------------|
| Races played | 9 | 9 | 0 | 9 |
| Hits | 2/9 (22.2%) | 2/9 (22.2%) | 0 | 2/9 (22.2%) |
| Total staked | $900 | $900 | $0 | $1,230 |
| Total returned | $1,115 | $1,115 | $0 | $167 |
| **Net P&L** | **+$215** | **+$215** | **$0** | **−$1,063** |
| **ROI** | **+23.9%** | **+23.9%** | **0.0 pp** | **−86.4%** |
| Banker top 3 rate | 5/9 (55.6%) | 5/9 (55.6%) | 0 | 5/9 (55.6%) |
| Combinations | 90 | 90 | 0 | 123 |

*\*Full pipeline without SCMP: Adj = raw MC this meeting.*

### 11d. Where A and B Diverged

**A vs review-spec B: no divergence.** Same banker, same six horses and same $100 in all nine races. With SCMP skipped and every Adj factor at 0, Mode A (5) + Rule 8 and Mode B (6) both reduced to the MC top 6 by Win%.

**A vs B-trio:**

| Race | What Differed | A Result | B-trio Result | Impact | Root cause |
|------|---------------|----------|---------------|--------|------------|
| R4 | B-trio added #1 FRIENDS OF SHAJING (8.3, MC Place 18.6%) | MISS ❌ | HIT ✅ | **B-trio +$67** ($117 − $50 extra) | Win-odds < 10 add |
| R9 | B-trio swapped #5 FIVEFORTWO (27.6%, 20) → #10 WINDLORD (5.5); added #1, #9 | HIT ✅ | MISS ❌ | **B-trio −$1,175** (−$1,065 return, +$110 stake) | Step B swap removed the 2nd-placer |
| R7 | B-trio added #8, #12, #1 (all < 10) | MISS ❌ | MISS ❌ (Pattern A) | B-trio −$110 | Adds covered the placers, but the banker failed |
| R5, R8 | B-trio added #9/#7 and #4 | MISS ❌ | MISS ❌ | B-trio −$100 | Adds ran 12th, 10th, 11th |
| R2 | B-trio used 4 legs (only 4 primaries after swap) | MISS ❌ | MISS ❌ | B-trio +$40 | Smaller ticket |
| R1, R3, R6 | 1-for-1 swaps | same | same | $0 | R1/R3 swaps caught the winner but other gaps remained |

Net: **B-trio −$1,278 vs A**, and −$1,175 of that is the R9 swap.

### 11e. Session Verdict

**A (= review-spec B this meeting) won the session at +$215 against B-trio's −$1,063.** A and review-spec B were literally the same tickets, so their tie says nothing about the SCMP layer; it only confirms that raw MC top 6 is what A becomes without it. The A vs B-trio gap is **mostly one race (variance)**: the R9 swap cost $1,175. But it sits on a **systematic** issue, since this is the second meeting running where the swap removed a placer. The odds-add rule was the opposite of last week. On 16-Sep it made B-trio's two hits. Here it made one small hit (R4, +$67 net) and cost $210 of dead stake elsewhere. No A-only rule changed a ticket this meeting: Rule 8 filled a slot that Mode B would have filled anyway, and there were no debutant or SCMP overrides.
