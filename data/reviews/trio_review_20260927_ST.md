# Trio Post-Race Review — Sha Tin | 2026-09-27

**Meeting 6 of the 2026/27 season.** 11-race Sunday card. Turf races (R2–R4, R6, R8–R11) ran on **Good to Firm**, AWT races (R1, R5, R7) on **Good**. No scratchings. Results: `data/historical/results_20260927_ST.json`. Bet records: `data/reports/trio_strategy_20260927_ST_R1–R11.md`.

> **Data notes for this meeting**
> - **Results scraped successfully first time** (`tools/scrape-meeting.ts`, DT/TT enrichment ✓). The finish order, SP and Win/Place/Trio dividends for all 11 races were cross-checked against the local momentum API (`/api/momentum/race/2026-09-27-ST-N`). **All 11 Trio dividends match.** Trio (per $10): R1 $3,117 · R2 $226 · R3 $1,543 · R4 $802 · R5 $720 · R6 $3,406 · R7 $137 · R8 $773 · R9 $173 · R10 $881 · R11 $246.
> - **Scraper truncated two Quinella dividends**: R1 came back as $1 and R6 as $2. The API has **$1,670 and $2,087**. Both were corrected in the results JSON. The Trio figures were not affected.
> - **R6 used SCMP race-card odds.** HKJC odds were unavailable before the race, so R6's MC ran **with no market-odds input** and its "odds" column shows SCMP figures. R6 market-divergence numbers are therefore less reliable.
> - **Pre-race odds** are the HKJC early pool captured at 09:03 HKT. That was hours before the off, and several moved a lot: R4 #2 10→22, R2 #12 5.2→9.9, R4 #11 13→4.3, R5 #1 10→5.4. "SP" below = final win odds from the results file.
> - **Scoring.** **Strategy A** is scored exactly as written in each report (banker(s) + legs, combos × $10). **Strategy B** = the **review-skill definition**: MC top 6 by raw Win%, MC #1 banker, 1膽+5腳 = 10 combos, $100/race, every race. The reports' own "Strategy B" section used a different rule (Place% > 20% legs + Win-odds < 10 swap/add, variable stake). It is shown as **B-trio** in a note only (§10e, §11). Ties at the 6th MC slot (R9 #6/#7 at 2.2%, R11 #5/#8 at 1.0%) were broken by report table order. Neither tied horse placed, so the tie-break doesn't change any result.

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played | **11 (R1–R11)** |
| Hit rate | **2/11 (18.2%)** |
| Total staked | $950 |
| Total returned | $383 |
| **Net P&L** | **−$567** |
| **ROI** | **−59.7%** |
| Session Result | **LOSS** |

Both hits were **Dominant/HIGH** races with a low Trio dividend: R7 paid $137 and R11 paid $246. Bankers placed only **5/11**. Six races had a big dividend ($720–$3,406), and every one of them missed. In all six, at least one placer was a horse the MC rated **≤ 3.9% win**. Strategy B (MC top 6) hit the same two races and lost **−$717**. A's smaller tickets in Dominant races saved **$150**.

## Section 2: Race-by-Race Cross-Reference

Result column: **bold** = top-3 finisher NOT in the Strategy A pool.

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
| R1 | C5 1200m AWT | B→8 (1膽+7腳) | #6 | 4, 2, 7, 5, 3, 9, 10 | **8**→9→3 | MISS ❌ | $3,117 | $0 | −$210 | Banker fail (#6 4th, drifted 2.7→4.9) + pool gap (#8 won at 35, MC 0.1%) |
| R2 | C4 1200m | B (1膽+5腳) | #12 | 4, 6, 8, 9, 7 | 8→4→7 | MISS ❌ | $226 | $0 | −$100 | **Banker fail (#12 last, 5.2→9.9) — all 3 placers in legs!** |
| R3 | C5 1400m | B (1膽+5腳) | #11 | 1, 2, 3, 9, 14 | **12**→**10**→1 | MISS ❌ | $1,543 | $0 | −$100 | Banker fail (#11 fav, 5th) + 2 gaps (#12 at 13, #10 at 6.2; both MC 3.9%) |
| R4 | C4 1000m | A (1膽+4腳) | #2 | 1, 5, 4, 13 | **6**→**11**→**12** | MISS ❌ | $802 | $0 | −$60 | Banker fail (#2 12th, drifted 10→22) + 3 gaps (#6 4.5, #11 4.3, #12 14) |
| R5 | C4 1200m AWT | A (1膽+4腳) | #5 | 10, 6, 2, 4 | **1**→5→**11** | MISS ❌ | $720 | $0 | −$60 | Banker hit (#5 2nd), 2 gaps (#1 10→5.4 MC 1.0%; #11 at 19) |
| R6 | C4 1400m | B (1膽+5腳) | #13 | 4, 1, 2, 12, 8 | **10**→13→**9** | MISS ❌ | $3,406 | $0 | −$100 | Banker hit (#13 2nd), 2 gaps (#10 won at 20, MC 0.4%; #9 at 5.2) |
| R7 | C3 1200m AWT | A (1膽+4腳) | #1 | 8, 9, 12, 2 | 8→12→1 | **HIT ✅** | $137 | $137 | **+$77** | — |
| R8 | G3 1400m | B (1膽+5腳) | #6 | 3, 4, 5, 8, 1 | 3→1→**7** | MISS ❌ | $773 | $0 | −$100 | Banker fail (#6 fav 1.9, 6th) + pool gap (#7 at 15, MC last of 9) |
| R9 | C3 1600m | A (2膽+3腳) | #8, #1 | 13, 4, 2 | 8→1→**11** | MISS ❌ | $173 | $0 | −$30 | Both bankers hit (1st/2nd), pool gap (#11 21→10, MC 0.0%) |
| R10 | C2 1200m | A→6 (1膽+5腳) | #3 | 4, 1, 10, 9, 7 | 7→9→**8** | MISS ❌ | $881 | $0 | −$100 | Banker fail (#3 7th, mkt 2nd) + pool gap (#8 SALON S 3rd, 5.8→7.8, MC 1.1%) |
| R11 | C3 1400m | A (2膽+3腳) | #6, #3 | 1, 2, 10 | 3→6→1 | **HIT ✅** | $246 | $246 | **+$216** | — |

## Section 3: Hits Analysis

### R7 — 8→12→1 · Trio $137

| Horse | Role | Pre / SP | MC Win% | MC Rating (Place%) | Adj Place% | Result |
|-------|------|----------|---------|--------------------|------------|--------|
| #1 AURORA PATCH | 膽 Banker | 8.1 / 4.9 | 48.7% | 84.1% | 85.0% (+draw) | **3rd** |
| #8 BUSTLING CITY | 腳 | 1.8 / 1.7 (fav) | 19.3% | 59.1% | 61.1% (+trial) | **1st** |
| #12 SPEEDY SMARTIE | 腳 | 19 / 15 | 9.8% | 43.1% | 43.1% | **2nd** |

**What made it work:** the MC's top 3 by Win% were exactly the top 3 finishers. The Dominant banker (card-high 84% place) was backed from 8.1 into 4.9 and hung on for 3rd. The Mode A tight pool (5 horses, 6 combos) kept the stake at $60. **Return $137 on $60 = +$77.** The same trio on a 10-combo B ticket makes only +$37.

### R11 — 3→6→1 · Trio $246

| Horse | Role | Pre / SP | MC Win% | MC Rating (Place%) | Adj Place% | Result |
|-------|------|----------|---------|--------------------|------------|--------|
| #6 CIRCUIT CHAMPION | 膽 Banker | 3.3 / 2.0 (fav) | 47.3% | 83.6% | 85.0% (+trial, +draw) | **2nd** |
| #3 AEROINVINCIBLE | 膽 2nd Banker | 5.9 / 5.8 | 26.0% | 69.8% | 71.8% (+draw, +form) | **1st** |
| #1 LUCKY SAM GOR | 腳 | 16 / 25 | 12.0% | 50.0% | 52.0% (+excuses) | **3rd** |

**What made it work:** the **雙膽拖 rule** (2nd banker when Adj Place% ≥ 63%) fired, and both bankers placed. #1 LUCKY SAM GOR is an MC value call: 50% MC place against a 25 SP, the report's one "undervalued" flag, and he ran 3rd. **Return $246 on $30 = +$216 (ROI +720%).** This is the best stake efficiency of the season.

## Section 4: Miss Classification

| Pattern | Count | Races |
|---------|-------|-------|
| **A** — Banker fail, all 3 placers already in legs | **1/9** | R2 |
| **B** — Banker hit, pool gap | **3/9** | R5, R6, R9 |
| **C** — Banker fail **and** pool gap | **5/9** | R1, R3, R4, R8, R10 |

### Pattern A: Banker Fail — All 3 Placers Already in Legs (1/9)

| Race | Banker | Pre / SP | Pos | Result horses (all legs) | Root cause | Missed return |
|------|--------|----------|-----|--------------------------|------------|---------------|
| R2 | #12 GLACIATED (MC 25.6%, +form) | 5.2 / 9.9 | **12th (last)** | #8 APEX GLORY (fav 3.0), #4 LITTLE MONSTER (4.6), #7 NAVAS G (12) | MC #1 at market 5th after a big drift; MC–market divergence (report flagged fav #8 at MC 12.3%) | **$226** |

A's SCMP layer did its job in R2. `+excuses` lifted #7 NAVAS G to Adj Place 22.5% and into the pool in place of #2 DAILY FUN, and #7 ran 3rd. The only thing wrong was the banker.

### Pattern B: Banker Hit — Pool Gap (3/9)

| Race | Banker | Pos | Other placer in pool | Pool gap(s) | Gap Pre / SP | Gap MC Win% (MC rank) | Missed return |
|------|--------|-----|----------------------|-------------|--------------|-----------------------|---------------|
| R5 | #5 ARMOUR WAR EAGLE | 2nd | — | **#1 CAUSEWAY KING** (1st), **#11 RAGING WARRIOR** (3rd) | 10 / 5.4; 18 / 19 | 1.0% (9th); 1.8% (8th) | $720 |
| R6 | #13 SUPER LOVE | 2nd | — | **#10 CHIU CHOW GOLF** (1st), **#9 GHORGAN** (3rd) | 28 / 20; 6.1 / 5.2 | 0.4% (13th); 2.7% (7th) | $3,406 |
| R9 | #8 PACKING FIGHTER + #1 AMAZING PARTNERS | 1st / 2nd | both bankers | **#11 SHAMUS STORM** (3rd) | 21 / 10 | 0.0% (14th of 14) | $173 |

Combined Pattern B missed return: **$4,299**. **Pattern B was 3/9 misses, and two of the three were double gaps.** A bigger pool would not fix them: every gap horse was MC 7th or worse. In R5 and R6 the gaps included a market-backed horse the MC rated below 3% (R5 #1 at 5.4 won; R6 #9 at 5.2 ran 3rd).

### Pattern C: Banker Fail + Pool Gap (5/9)

| Race | Banker | Pre / SP | Mkt rank (SP) | Pos | Pool gap(s) | Gap SP (MC Win%) |
|------|--------|----------|---------------|-----|-------------|------------------|
| R1 | #6 ONLY U | 2.7 / 4.9 | 2nd | 4th | #8 WAVE GARDEN (1st) | 35 (0.1%) |
| R3 | #11 DRACO | 4.9 / 4.2 | **1st (fav)** | 5th | #12 VIGOR ELLEEGANT (1st), #10 AQUAMAN (2nd) | 13 (3.9%), 6.2 (3.9%) |
| R4 | #2 RUN RUN SUNRISE | 10 / 22 | 9th | 12th | #6 FLOWING RICHES (1st), #11 ZOUPER FELLOW (2nd), #12 SUPREME VOYAGER (3rd) | 4.5 (3.0%), 4.3 (0.6%), 14 (0.9%) |
| R8 | #6 LITTLE PARADISE | 1.9 / 1.9 | **1st (fav)** | 6th | #7 STORMY GROVE (3rd) | 15 (5.0%, 9th of 9) |
| R10 | #3 RISING FORCE | 3.2 / 3.7 | 2nd | 7th | #8 SALON S (3rd) | 7.8 (1.1%) |

Three of the five failed bankers were **market 1st–2nd** (R3, R8, R10) and one more was the pre-race favourite (R1 #6 at 2.7). The rank 1–2 profile, which had been reliable (80% over three meetings), went **3/7** on this card. R4 is the extreme case: the banker drifted from 10 to 22, and all three placers came from the MC's bottom half. The top two, #6 and #11, were both **steamers** (≥ 1.6× shorter than the 09:03 odds).

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R1 | 膽拖 #6 + 7腳, $210 | No fix — winner #8 was MC 12th of 12 (0.1%) at 35 | ❌ | — |
| R2 | 膽拖 #12 + 5腳, $100 | **Bank market fav #8 (or #4) with the same 5 other horses** | **✅ $226** | $0 |
| R2 | 膽拖 #12 + 5腳, $100 | Full box of A's 6 horses, C(6,3) = 20 | ✅ $226 | +$100 (net +$26) |
| R3 | 膽拖 #11 + 5腳, $100 | No fix — two gaps both MC 3.9% (7th/8th by MC), banker 5th | ❌ | — |
| R4 | 膽拖 #2 + 4腳, $60 | No fix — 0/3 placers in pool | ❌ | — |
| R5 | 膽拖 #5 + 4腳, $60 | Add #1 (10 pre-race, Win-odds ≤ 10) — still missing #11 (19) | ❌ | — |
| R6 | 膽拖 #13 + 5腳, $100 | Add #9 (6.1 SCMP, < 10) — still missing #10 (20, MC 0.4%) | ❌ | — |
| R8 | 膽拖 #6 + 5腳, $100 | Box all 9 runners (84 combos, $840) | ✅ $773 but a net loss | +$740 |
| R9 | 雙膽拖 3 combos, $30 | No fix — #11 was MC 14th of 14 (0.0%) and 21 pre-race | ❌ | — |
| R10 | 膽拖 #3 + 5腳, $100 | Add #8 (5.8 < 10) **and** bank #9 (the eventual fav) | ✅ $881 (needs 2 changes) | +$50 |

**Fixable misses:** R2 only. A banker switch to the market favourite would have returned **$226 for no extra stake**, and the card would go from −$567 to −$341. R10 needs two simultaneous changes, so it doesn't count.

**Unfixable misses:** R1, R3, R4, R5, R6, R8, R9. Each had at least one placer rated MC 7th or worse, at a double-digit price or on a late plunge that the 09:03 odds didn't show.

**Candidate rules carried from 23-Sep, tested here:**

| Candidate rule | Effect on this card | Net vs A as bet |
|----------------|---------------------|-----------------|
| Must-include any horse < 10 at pre-race snapshot (add-only) | Adds legs in 9 races. Catches R4 #6, R5 #1, R6 #9 and R10 #8, but none of those races hits (banker fail or a second gap) | **Negative** (≈ +$700 stake, $0 extra return) |
| Don't bank MC #1 at market rank ≥ 4 (PASS) | At 09:03 odds, only R4 qualifies (#2 was 5th at 10); R7's #1 was 3rd at 8.1. At SP it would PASS R2, R4 and R6, but SP rank isn't known when the bet is placed | **+$60** at 09:03 odds (+$260 if near-off odds had been used) |
| Chalk-trio guard (MC top 3 = market top 3 and banker ≥ 50%) | Not triggered (R7 market top 3 was 8/1/9, not 8/1/12) | $0 |

## Section 6: Key Moments

- **Best Bet — R11 雙膽拖 #6 + #3.** Both bankers placed (2nd and 1st) and MC value leg #1 LUCKY SAM GOR (25 SP, 50% MC place) ran 3rd. **$246 back on $30.**

- **Worst Bet — R1.** $210 staked, the largest ticket of the card, after the Adj Place ≥ 25% rule expanded the pool to 8. The favourite banker #6 ONLY U drifted from 2.7 to 4.9 and ran 4th. The winner was #8 WAVE GARDEN, MC 0.1% at 35. The expansion did catch the 2nd-placer #9 GIMME FIVE.

- **Most Frustrating — R2.** All three placers (#8, #4, #7) were in A's legs, and #7 was only there because of the SCMP `+excuses` flag. Banker #12 GLACIATED drifted from 5.2 to 9.9 and **ran last**. The report had flagged the divergence: "MC #1 #12 vs market favourite #8 APEX GLORY (MC 12.3%)". #8 won.

- **Biggest Surprise — R9 #11 SHAMUS STORM.** MC rated him **0.0% win / 0.2% place**, last of 14. He was 21 at 09:03 and **10 at the off**, and ran 3rd, breaking a 雙膽拖 whose two bankers ran 1–2. Honourable mention: R6 #10 CHIU CHOW GOLF (MC 0.4%, 2 career starts, SCMP `+excuses`) won at 20, making a $3,406 Trio.

- **Best MC Call — R7 and R6.** In R7 the MC's top 3 by Win% (#1, #8, #12) were exactly the top 3, and #12 at 15 was not in the market's top 4. In R6 the MC #1 #13 SUPER LOVE drifted to 11 (market 8th) and still ran 2nd.

## Section 7: Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 1 | R9 (#8) |
| Banker 2nd–3rd | 4 | R5 (#5, 2nd), R6 (#13, 2nd), R7 (#1, 3rd), R11 (#6, 2nd) |
| Banker out of top 3 | 6 | R1 (#6, 4th), R2 (#12, 12th), R3 (#11, 5th), R4 (#2, 12th), R8 (#6, 6th), R10 (#3, 7th) |

**Banker strike rate (top 3): 5/11 = 45.5%**
**Banker win rate: 1/11 = 9.1%**

Second bankers (雙膽拖): **2/2 placed** (R9 #1 2nd, R11 #3 1st). Mean banker MC Place% was **70.2%** against 45.5% actual, **over-stated by ~25pp**. That is the worst gap since 13-Sep (+36pp). Season to date: **26/55 = 47.3%**.

By confidence: HIGH/Dominant bankers placed **4/6**. MEDIUM/Competitive bankers placed **1/5**.

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | **2/11** (R7, R11) |
| All 3 in pool OR banker + 2 legs | 3/11 (R2, R7, R11) |
| At least 2 placers in pool | **7/11** (R1, R2, R7, R8, R9, R10, R11) |
| Banker hit + pool gap | **3/11** (R5, R6, R9) |
| Top-3 slots captured by pool (of 33) | **20/33 = 60.6%** |

Random baseline for these pools (5–8 horses in 9–14 runner fields) ≈ **15.3/33 = 46.3%**, so the A pool ran at **~1.31× random**. That is a bit better than 16-Sep and 23-Sep (1.2×), but it came from the bigger R1/R10 pools and the SCMP swap in R2. Strategy B's pool caught 18/33 (vs 15.9 random, 1.13×).

### 7c. MC-Market Divergence Outcomes

| Race | MC #1 | SP | Mkt rank | Fin | Market fav (SP) | Fin | Divergence | MC correct? |
|------|-------|----|----------|-----|-----------------|-----|------------|-------------|
| R1 | #6 ONLY U | 4.9 | 2 | 4th | #1 ROBOT KNIGHT (4.7, MC 1.4%) | 8th | MC prefers mkt-2nd | ❌ (neither placed) |
| R2 | #12 GLACIATED | 9.9 | 5 | 12th | #8 APEX GLORY (3.0) | **1st** | MC prefers mkt-5th | ❌ |
| R3 | #11 DRACO | 4.2 | 1 | 5th | same | 5th | agree | — |
| R4 | #2 RUN RUN SUNRISE | 22 | 9 | 12th | #11 ZOUPER FELLOW (4.3, MC 0.6%) | **2nd** | MC prefers mkt-9th | ❌ |
| R5 | #5 ARMOUR WAR EAGLE | 5.2 | 3 | **2nd** | #6 BRIGHT MORTAR (3.4) | 5th | MC prefers mkt-3rd | ✅ |
| R6 | #13 SUPER LOVE | 11 | 8 | **2nd** | #4 HAROLD WIN (4.6) | 7th | MC prefers mkt-8th | ✅ |
| R7 | #1 AURORA PATCH | 4.9 | 2 | **3rd** | #8 BUSTLING CITY (1.7) | **1st** | MC prefers mkt-2nd | ✅ (both placed) |
| R8 | #6 LITTLE PARADISE | 1.9 | 1 | 6th | same | 6th | agree | — |
| R9 | #8 PACKING FIGHTER | 1.7 | 1 | **1st** | same | 1st | agree | — |
| R10 | #3 RISING FORCE | 3.7 | 2 | 7th | #9 TURQUOISE VELOCITY (3.6) | **2nd** | MC prefers mkt-2nd | ❌ |
| R11 | #6 CIRCUIT CHAMPION | 2.0 | 1 | **2nd** | same | 2nd | agree | — |

**MC divergence accuracy: 3/7 cases MC was correct (43%).** Market favourite top 3: **6/11**. MC #1 top 3: **5/11**.

**The report's own "MC undervalued" flags went 3/14 top 3**: R5 #5 2nd, R7 #1 3rd, R11 #1 3rd. The misses were R1 #4, #7; R2 #6, #2; R4 #2, #5; R5 #10; R7 #2; R8 #4, #9; and R10 #1. The flags that claimed the biggest edges (> 200%: R1 #4, R4 #2, R4 #5, R8 #4, R10 #1) went **0/5**.

**Market-rank split, four meetings combined:**

| MC #1 market rank at SP | 13-Sep ST | 16-Sep HV | 23-Sep HV | **27-Sep ST** | Combined |
|-------------------------|-----------|-----------|-----------|---------------|----------|
| 1–2 | 3/4 | 6/6 | 3/5 | **3/7** (R1 ❌, R3 ❌, R8 ❌, R10 ❌) | **15/22 (68.2%)** |
| 3 | 0/1 | — | 0/1 | **1/1** (R5) | 1/3 |
| 4+ | 0/5 | 0/2 | 2/3 | **1/3** (R6 ✅; R2, R4 ❌) | **3/13 (23.1%)** |

Rank 1–2 is still the best profile, but it has dropped from 80% to 68%. **Sha Tin rank 1–2 bankers: 6/11 over two ST meetings, against 9/11 at HV.**

**MC blind spot (continued from 23-Sep): market-backed horses the MC rates near zero.**

| Race | Horse | MC Win% | MC Place% | Pre → SP | Finished |
|------|-------|---------|-----------|----------|----------|
| R1 | #1 ROBOT KNIGHT | 1.4% | 8.5% | 5.5 → 4.7 | 8th |
| R4 | #11 ZOUPER FELLOW | 0.6% | 4.1% | 13 → 4.3 | **2nd** |
| R5 | #1 CAUSEWAY KING | 1.0% | 7.6% | 10 → 5.4 | **1st** |
| R6 | #9 GHORGAN | 2.7% | 12.3% | 6.1 → 5.2 | **3rd** |

**MC Win% < 3% with SP ≤ 6: 3/4 placed this card; 7/9 over two meetings.** The **late steamers** matter just as much. Seventeen horses shortened to ≤ 1/1.6 of their 09:03 price, and **9/17 (53%) placed**, against a ~24% base rate. Among them were R3 #12 25→13 (won), R3 #10 11→6.2 (2nd), R4 #6 8.6→4.5 (won), R4 #11, R5 #1 and R9 #11 21→10 (3rd). **Three of the six banker failures had drifted ≥ 1.6× after 09:03** (R1 2.7→4.9, R2 5.2→9.9, R4 10→22). The other three held their price: R3 4.9→4.2, R8 1.9→1.9, R10 3.2→3.7. At 09:03, **9 of 11 bankers were market 1st–2nd**, and only 5 placed.

### 7d. SCMP +Excuses Flag Performance

| Race | Horse | +Excuses For | Finished | Verdict |
|------|-------|--------------|----------|---------|
| R1 | #6 ONLY U (banker) | steadied last start | 4th | ❌ |
| R1 | #9 GIMME FIVE | bad luck last start | **2nd** | ✅ |
| R1 | #8 WAVE GARDEN | bad luck last start | **1st** | ✅ |
| R1 | #4, #2, #7, #5 | hampered/crowded | 9th, 6th, 10th, 7th | ❌ ×4 |
| R2 | #4 LITTLE MONSTER | bad luck | **2nd** | ✅ |
| R2 | #7 NAVAS G (added to pool) | bad luck | **3rd** | ✅ |
| R3 | #1 FOREVER FANCY | bad luck | **3rd** | ✅ |
| R3 | #10 AQUAMAN / #12 VIGOR ELLEEGANT | bad luck | **2nd / 1st** | ✅ ✅ |
| R4 | #12 SUPREME VOYAGER | bad luck | **3rd** | ✅ |
| R5 | #1 CAUSEWAY KING | bad luck | **1st** | ✅ |
| R6 | #9 GHORGAN / #10 CHIU CHOW GOLF | bad luck | **3rd / 1st** | ✅ ✅ |
| R8 | #3 INVINCIBLE IBIS | bad luck | **1st** | ✅ |
| R8 | #6 LITTLE PARADISE (banker) | bad luck | 6th | ❌ |
| R11 | #1 LUCKY SAM GOR | bad luck | **3rd** | ✅ |
| All others (26 horses) | — | — | none placed | ❌ |

**+Excuses hit rate (top 3): 13/44 (29.5%)**, against a ~23.7% base rate for this card (33 placers / 139 runners). The flag was applied to 44 of 139 runners, so it is only weakly selective. Its most useful effect was **R2**, where it put #7 into A's pool. The flags on R3 #12 and #10, R5 #1 and R6 #9/#10 marked horses that won or placed at big prices. But +2% on a 0.4–3.9% MC base still left every one of them outside the pool. Other flags: `+trial` 8/25 (32%), `+form` 7/18 (39%), `+draw` 3/7, `-notRO` 0/3 ✅ (a correct negative), `-injury30d` 1/2 (R8 #7 STORMY GROVE placed 3rd despite the penalty).

### 7e. Divergence Override Assessment

**No discretionary override was applied.** All tickets are rule output. The rules that changed tickets:

| Rule | Race | Effect | Result |
|------|------|--------|--------|
| Adj Place% ≥ 25% must-include (pool expansion) | R1 | Pool 6 → 8 (+#9, +#10), 21 combos | #9 ran 2nd; still a miss (winner MC 0.1%) — cost +$110 |
| Adj Place% ≥ 25% must-include | R10 | Mode A 5 → 6 (+#7 VICTOR THE WINNER, 27.0%) | #7 **won**; still a miss (banker 7th, #8 gap) — cost +$40 |
| 2nd banker (Adj Place% ≥ 63%) → 雙膽拖 | R9, R11 | 3 combos, $30 | **2/2 both bankers placed**; R11 hit ($246), R9 missed on a 0.0% MC horse |
| SCMP `+excuses` promotion | R2 | #7 NAVAS G in, #2 DAILY FUN out | #7 ran 3rd (Pattern A instead of C; still miss) |

**Lesson:** the Adj-Place expansion rule has now caught a placer in both races it expanded (R1 #9, R10 #7 won), but both races failed on the banker. The 2nd-banker rule cut stake by 70% in two races that both would have been lost or won anyway, and it went 2/2 on bankers.

## Section 8: Learnings

### What Worked

- **Tight tickets on Dominant races.** HIGH/Dominant races: **2/6 hits, $340 staked, $383 returned, +$43**. The same races as B (all $100) returned the same $383 on $600. The **2nd-banker rule** was 2/2 on bankers and made R11 +$216 on a $30 ticket.
- **MC's best races were the ones where it agreed with the market.** R7, R9 and R11 (MC #1 at market rank 1–2, MC ≥ 35%) produced 2 hits and one near miss (R9 bankers 1–2).
- **SCMP `+excuses` added a placer** (R2 #7 NAVAS G, 3rd). A's pool held all three placers in R2, where B did not.
- **The Adj-Place ≥ 25% expansion rule caught a placer both times it fired** (R1 #9 2nd, R10 #7 1st).

### What Didn't Work

- **Market-rank-1–2 bankers failed at Sha Tin**: R3 #11 (fav), R8 #6 (1.9 fav), R10 #3 (3.7) and R1 #6 (pre-race fav) all missed the frame. That makes 3/7 this card, and Sha Tin rank 1–2 is 6/11 across two meetings.
- **Big-dividend races were uncatchable.** All six Trios ≥ $720 (R1, R3, R4, R5, R6, R10) had a placer rated ≤ 3.9% MC win, and the market-backed ones (R4 #11, R5 #1, R6 #9) were 3/4 to place.
- **Early (09:03) odds hid the signal.** Nine of 17 late steamers placed. Three of the six failed bankers had drifted (R1, R2, R4). With odds refreshed near the off, the drift was visible before the jump.
- **The MC "undervalued" flags were 3/14 top 3**, and 0/5 where the MC claimed a > 200% edge. Big MC-vs-market gaps were mostly model error this card, not value.
- **Competitive/MEDIUM races: 0/5, −$610**, with bankers 1/5.

### Strategy Adjustments

- [ ] **Re-fetch odds within ~15 min of each race and add a "banker drift" check.** If the banker has drifted ≥ 1.6× from the snapshot the MC was run on (R1 2.7→4.9, R2 5.2→9.9, R4 10→22), switch the banker to MC #2 or PASS. Backtest on the season's odds snapshots before adopting. Evidence: 1/4 drifting bankers placed (R6), against 4/7 for the rest.
- [ ] **Investigate the MC near-zero-rating blind spot (now 7/9 placed across two meetings).** Pull every runner with MC Win% < 3% and SP ≤ 6 across all 2026/27 meetings and measure the place rate. If it holds above 50%, blend MC with market-implied probability (e.g. a floor at 0.5× market-implied Win%) before ranking.
- [ ] **Downweight the report's "undervalued > 200%" flag.** It went 0/5 here. Test whether MC-vs-market edges > 200% should *reduce* confidence rather than raise it.
- [ ] **For Competitive races where MC #1 ≠ market favourite, test "bank the market favourite, keep MC #1 as a leg".** At 09:03 odds, only R2 qualified among this card's Competitive races (#8 at 4.6 vs MC #1 #12 at 5.2), and the switch would have hit ($226, stake unchanged). One race is not evidence, so this needs the season backtest.
- [ ] **Keep the 2nd-banker (雙膽拖) rule and the Adj-Place ≥ 25% expansion rule**, and log their records: 2nd banker 2/2 this card; expansion leg placed 2/2.
- [ ] **Fix the scraper's Quinella truncation** (R1 $1670 → "1" and R6 $2087 → "2"; 23-Sep R9 had the same bug). It looks like a comma/thousands parse. Until it's fixed, always cross-check against the momentum API.

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | R4, R5, R7, R9, R10, R11 | 2/6 | $340 | $383 | **+$43** | **+12.6%** |
| MEDIUM-HIGH | — | — | — | — | — | — |
| MEDIUM | R1, R2, R3, R6, R8 | 0/5 | $610 | $0 | −$610 | −100.0% |
| **TOTAL** | **11** | **2/11** | **$950** | **$383** | **−$567** | **−59.7%** |

**For the first time this season, confidence carried signal.** Every HIGH race was a "Dominant" classification. HIGH made the only profit, and its bankers placed 4/6 against 1/5 for MEDIUM. This is the reverse of 23-Sep, where the profit came from LOW. It's one card, but it supports keeping the Dominant/Competitive split.

## Section 10: Running Total (Season Cumulative)

### 10a. Meeting-by-Meeting P&L

| Meeting | Date | Venue | Races | Hits | Staked | Returned | P&L | ROI |
|---------|------|-------|-------|------|--------|----------|-----|-----|
| 1 | 2026-09-06 | ST | 9 | 2 | $870 | $791 | −$79 | −9.1% |
| 2 | 2026-09-09 | HV | 8 | 0 | $640 | $0 | −$640 | −100.0% |
| 3 | 2026-09-13 | ST | 10 | 1 | $870 | $476 | −$394 | −45.3% |
| 4 | 2026-09-16 | HV | 8 | 0 | $850 | $0 | −$850 | −100.0% |
| 5 | 2026-09-23 | HV | 9 | 2 | $900 | $1,115 | +$215 | +23.9% |
| **6** | **2026-09-27** | **ST** | **11** | **2** | **$950** | **$383** | **−$567** | **−59.7%** |
| **TOTAL** | | | **55** | **7** | **$5,080** | **$2,765** | **−$2,315** | **−45.6%** |

> The 06-Sep figures carried forward from prior reviews use the §10e convention (9 races / 2 hits / $870); the §10a/§10e discrepancy noted in earlier reviews is still unreconciled. Meeting 5 was a post-meeting blind run (no SCMP) and is included for tracking.

### 10b. Cross-Meeting Banker Performance

| Meeting | Banker Top 3 | Rate |
|---------|--------------|------|
| 2026-09-06 ST | 3/9 | 33.3% |
| 2026-09-09 HV | 4/8 | 50.0% |
| 2026-09-13 ST | 3/10 | 30.0% |
| 2026-09-16 HV | 6/8 | 75.0% |
| 2026-09-23 HV | 5/9 | 55.6% |
| **2026-09-27 ST** | **5/11** | **45.5%** |
| **Combined** | **26/55** | **47.3%** |

### 10c. Venue Breakdown

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
|-------|----------|-------|------|--------|----------|-----|-----|--------------|
| **Sha Tin** | **3** | **30** | **5** | **$2,690** | **$1,650** | **−$1,040** | **−38.7%** | **11/30 (36.7%)** |
| Happy Valley | 3 | 25 | 2 | $2,390 | $1,115 | −$1,275 | −53.3% | 15/25 (60.0%) |

Sha Tin has the better ROI but the much worse banker rate (36.7% vs 60.0%). ST's hits come from occasional mid-priced Trios. HV bankers place but the pools miss.

### 10d. Season Trajectory

| Metric | 09-06 (M1) | 09-09 (M2) | 09-13 (M3) | 09-16 (M4) | 09-23 (M5) | **09-27 (M6)** | Trend |
|--------|------------|------------|------------|------------|------------|----------------|-------|
| Hit rate (meeting) | 22.2% | 0.0% | 10.0% | 0.0% | 22.2% | **18.2%** | ↓ |
| Hit rate (cumulative) | 22.2% | 11.8% | 11.1% | 8.6% | 11.4% | **12.7%** | ↑ |
| Cumulative P&L | −$79 | −$719 | −$1,113 | −$1,963 | −$1,748 | **−$2,315** | ↓ |
| Cumulative ROI | −9.1% | −47.6% | −46.8% | −60.8% | −42.3% | **−45.6%** | ↓ |
| Banker top 3 (meeting) | 33.3% | 50.0% | 30.0% | 75.0% | 55.6% | **45.5%** | ↓ |
| Banker top 3 (cumulative) | 33.3% | 41.2% | 37.0% | 45.7% | 47.7% | **47.3%** | → |

### 10e. Cumulative A/B Comparison

| Meeting | Date | Venue | A Hits | A P&L | A ROI | B Hits | B P&L | B ROI | Winner |
|---------|------|-------|--------|-------|-------|--------|-------|-------|--------|
| 1 | 2026-09-06 | ST | 2/9 | −$79 | −9.1% | 2/9 | −$109 | −12.1% | A |
| 2 | 2026-09-09 | HV | 0/8 | −$640 | −100.0% | 0/8 | −$800 | −100.0% | Tie |
| 3 | 2026-09-13 | ST | 1/10 | −$394 | −45.3% | 1/10 | −$524 | −52.4% | A |
| 4 | 2026-09-16 | HV | 0/8 | −$850 | −100.0% | 0/8 | −$800 | −100.0% | B (stake only) |
| 5 | 2026-09-23 | HV | 2/9 | +$215 | +23.9% | 2/9 | +$215 | +23.9% | Tie (identical tickets) |
| **6** | **2026-09-27** | **ST** | **2/11** | **−$567** | **−59.7%** | **2/11** | **−$717** | **−65.2%** | **A** (stake only) |
| **TOTAL** | | | **7/55** | **−$2,315** | **−45.6%** | **7/55** | **−$2,735** | **−49.7%** | **A** |

*B = review-spec Strategy B (MC top 6, 1膽+5腳, $100 flat). B-trio (the reports' own Strategy B, as written) this meeting: **2/11 (R7 $137, R11 $246), $1,390 staked, $383 returned, −$1,007, −72.4%**. Season B-trio: **10/55, $6,960 staked, $2,674 returned, −$4,286, −61.6%**.*

| Cumulative Metric | Strategy A | Strategy B | Delta (B − A) |
|-------------------|-----------|-----------|---------------|
| Total meetings | 6 | 6 | — |
| Total races | 55 | 55 | 0 |
| Hits (rate) | 7/55 (12.7%) | 7/55 (12.7%) | 0 |
| Total staked | $5,080 | $5,500 | +$420 |
| Total returned | $2,765 | $2,765 | $0 |
| **Cumulative P&L** | **−$2,315** | **−$2,735** | **−$420** |
| **Cumulative ROI** | **−45.6%** | **−49.7%** | **−4.1 pp** |
| Banker top 3 rate | 26/55 (47.3%) | 26/55 (47.3%) | 0 |

This card gives back more than 23-Sep's gain. The season is now **−$2,315 (−45.6%)** for A. After six meetings, **A and B have hit exactly the same races every time**: 7/55, same bankers in every race, same returns. A's whole $420 lead comes from **stake sizing**: Mode A tight pools and 雙膽拖 in Dominant races, partly offset by the R1 8-horse expansion. The SCMP layer changed a pool membership that mattered only once (R2 #7), and that race still missed on the banker. **The data has converged on "A ≈ B on selection, A better on sizing".** The open question is not A vs B but the shared MC weakness: market-backed near-zero horses and drifting bankers.

## Section 11: A/B Strategy Comparison

### 11a. How Strategy B was derived

For each race, the **MC SIMULATION (raw)** table in the report was sorted by MC Win% (descending). The first 6 horses form the pool, and #1 is the banker. The ticket is 1膽 + 5腳, 10 combos × $10 = $100, and every race is played. **Every B banker equalled A's (first) banker this meeting**, because no debutant or jockey-cap rule changed the MC #1.

| Race | MC top-6 pool (Win% order) | B Banker | B-trio (report's B) ticket | B-trio stake |
|------|----------------------------|----------|----------------------------|--------------|
| R1 | 6, 4, 2, 3, 7, 5 | #6 | 6 / 4, 2, 3, 7, 5, 1, 9 | $210 |
| R2 | 12, 6, 8, 4, 9, 2 | #12 | 12 / 6, 8, 4, 9, 10, 7, 11 | $210 |
| R3 | 11, 2, 1, 3, 9, 14 | #11 | 11 / 2, 1, 3, 8 | $60 |
| R4 | 2, 1, 5, 4, 13, 9 | #2 | 2 / 1, 5, 6, 3, 12 | $100 |
| R5 | 5, 10, 6, 2, 4, 8 | #5 | 5 / 10, 6, 2, 8 | $60 |
| R6 | 13, 4, 1, 2, 8, 12 | #13 | 13 / 4, 1, 9, 8, 12, 5 | $150 |
| R7 | 1, 8, 12, 9, 2, 3 | #1 | 1 / 8, 12, 9, 2, 5 | $100 |
| R8 | 6, 3, 4, 5, 8, 1 | #6 | 6 / 3, 4, 5, 8, 1, 9, 2, 7 | $280 |
| R9 | 8, 1, 13, 4, 2, 6 | #8 | 8 / 1, 13, 4, 2 | $60 |
| R10 | 3, 4, 10, 1, 7, 9 | #3 | 3 / 4, 10, 1, 8, 9 | $100 |
| R11 | 6, 3, 1, 2, 10, 5 | #6 | 6 / 3, 1, 2, 10 | $60 |

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | Strat A Banker | Strat B Pool (MC top 6) | Strat B Banker (MC #1) | Result (1→2→3) | A Hit? | B Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|--------------|----------------|-------------------------|------------------------|----------------|--------|--------|--------|----------|----------|---------|---------|----------------|
| R1 | 6,4,2,7,5,3,9,10 | #6 | 6,4,2,3,7,5 | #6 | 8→9→3 | ❌ | ❌ | $3,117 | $0 | $0 | $210 | $100 | A expanded to 8 (Adj Place ≥ 25%): caught #9 (2nd), cost +$110 |
| R2 | 12,4,6,8,9,7 | #12 | 12,6,8,4,9,2 | #12 | 8→4→7 | ❌ | ❌ | $226 | $0 | $0 | $100 | $100 | A swapped #2→#7 (+excuses); #7 3rd → A Pattern A, B Pattern C |
| R3 | 11,1,2,3,9,14 | #11 | 11,2,1,3,9,14 | #11 | 12→10→1 | ❌ | ❌ | $1,543 | $0 | $0 | $100 | $100 | Same pool & banker |
| R4 | 2,1,5,4,13 | #2 | 2,1,5,4,13,9 | #2 | 6→11→12 | ❌ | ❌ | $802 | $0 | $0 | $60 | $100 | A Mode A 5-horse pool (−$40) |
| R5 | 5,10,6,2,4 | #5 | 5,10,6,2,4,8 | #5 | 1→5→11 | ❌ | ❌ | $720 | $0 | $0 | $60 | $100 | A Mode A 5-horse pool (−$40) |
| R6 | 13,4,1,2,12,8 | #13 | 13,4,1,2,8,12 | #13 | 10→13→9 | ❌ | ❌ | $3,406 | $0 | $0 | $100 | $100 | Same pool & banker |
| R7 | 1,8,9,12,2 | #1 | 1,8,12,9,2,3 | #1 | 8→12→1 | ✅ | ✅ | $137 | $137 | $137 | $60 | $100 | Both hit; A 6 combos (+$77) vs B 10 (+$37) |
| R8 | 6,3,4,5,8,1 | #6 | 6,3,4,5,8,1 | #6 | 3→1→7 | ❌ | ❌ | $773 | $0 | $0 | $100 | $100 | Same pool & banker |
| R9 | 8,1 / 13,4,2 | #8 + #1 | 8,1,13,4,2,6 | #8 | 8→1→11 | ❌ | ❌ | $173 | $0 | $0 | $30 | $100 | A 雙膽拖 3 combos (−$70) |
| R10 | 3,4,1,10,9,7 | #3 | 3,4,10,1,7,9 | #3 | 7→9→8 | ❌ | ❌ | $881 | $0 | $0 | $100 | $100 | Same set (A reached 6 via expansion) |
| R11 | 6,3 / 1,2,10 | #6 + #3 | 6,3,1,2,10,5 | #6 | 3→6→1 | ✅ | ✅ | $246 | $246 | $246 | $30 | $100 | Both hit; A 雙膽拖 3 combos (+$216) vs B (+$146) |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | 11 | 11 | 0 |
| Hits | 2/11 (18.2%) | 2/11 (18.2%) | 0 |
| Total staked | $950 | $1,100 | +$150 |
| Total returned | $383 | $383 | $0 |
| **Net P&L** | **−$567** | **−$717** | **−$150** |
| **ROI** | −59.7% | −65.2% | −5.5 pp |
| Banker top 3 rate | 5/11 (45.5%) | 5/11 (45.5%) | 0 |

*B-trio (report's own B, for reference): 2/11, $1,390 staked, $383 returned, −$1,007, −72.4%, banker 5/11.*

### 11d. Where A and B Diverged

| Race | What Differed | A Result | B Result | Impact | Root cause |
|------|---------------|----------|----------|--------|------------|
| R1 | Pool: A 8 horses (+#9, #10), 21 combos | MISS ❌ | MISS ❌ | A −$110 | Adj Place ≥ 25% must-include expansion |
| R2 | Pool: A had #7 (3rd) instead of #2 | MISS ❌ (Pattern A) | MISS ❌ (Pattern C) | Same | SCMP `+excuses` +2% lifted #7 above #2 |
| R4, R5 | Pool: A 5 horses (6 combos) | MISS ❌ | MISS ❌ | A +$40 each | Mode A tight pool (Dominant) |
| R7 | Pool: A 5 horses (dropped #3) | HIT ✅ | HIT ✅ | A +$40 | Mode A tight pool |
| R9 | Structure: A 雙膽拖 (#8+#1), 3 combos | MISS ❌ | MISS ❌ | A +$70 | 2nd-banker rule (Adj Place ≥ 63%) |
| R11 | Structure: A 雙膽拖 (#6+#3), 3 combos | HIT ✅ | HIT ✅ | A +$70 | 2nd-banker rule |

Net: **A +$150 vs B**, all from stake size. No race changed from hit to miss or the reverse.

### 11e. Session Verdict

**A won by $150 (−$567 vs −$717), and the edge was entirely systematic stake sizing.** Dominant races got 3–6 combo tickets and the 雙膽拖 rule cut R9/R11 to $30. The hits were the same, so there was no variance in outcomes between the strategies. The one A-only rule that cost money was the Adj Place ≥ 25% pool expansion in R1 (+$110 for no return). The one A-only rule that changed pool membership in a way that mattered was SCMP `+excuses` in R2: it put the 3rd-placer in the pool, but the shared banker ran last. B-trio (the report's MC-only ticket) did worse than both at −$1,007. Its Win-odds < 10 rule brought in placers in R4 (#6, #12), R6 (#9) and R10 (#8), but each of those races still missed. The R10 swap also **removed the winner** #7 VICTOR THE WINNER, the third meeting running in which the swap has dropped a placer. On the season, A leads B by $420, all from sizing. The two strategies have now hit identical races across 55.
