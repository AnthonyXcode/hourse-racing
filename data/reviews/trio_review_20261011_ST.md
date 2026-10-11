# Trio Post-Race Review — Sha Tin | 2026-10-11

**Meeting 10 of the 2026/27 season.** An 11-race Sunday card. **R1, R4 and R5 were on the All Weather Track** and the other eight on Turf (R10 on the "C" course). Going was **Good** on both surfaces. There were no scratchings. **R6 had a dead heat for 2nd** (#2 GALLANT DESIGN and #7 NOBLE SUPERIOR), so three horses still filled the Trio (2-7-12). Results: `data/historical/results_20261011_ST.json`. Bet records: `data/reports/trio_strategy_20261011_ST_R1–R11.md`.

> **Data notes for this meeting**
> - **Results scraped first time** (`tools/scrape-meeting.ts`, DT ✓, TT —). **Trio dividends were checked against the HKJC results page for R1, R6, R7 and R10.** All four match on finishing order, Win, Place, Tierce, Trio and First 4. Trio (per $10): R1 $2,260 · R2 $711 · R3 $227 · R4 $43 · R5 $632 · R6 $212 · R7 $8,829 · R8 $171 · R9 $367 · R10 $1,135 · R11 $146. Trio/Tierce ratios (3.7–12.3) look normal. R1's ratio (12.3) is high because the winner was 40/1.
> - **The comma-truncation bug hit non-Trio dividends again.** R1 Quinella was scraped as $1 (official **$1,848.50**). R7 Quinella Place was scraped as `[55.5, 2, 10, 1]` (official 5-10 $55.50, **5-13 $2,116**, **10-13 $1,032**). The R6 dead-heat second Quinella (7-12, **$184**) and second Tierce (12-7-2, $1,103) were not captured. **The results JSON was not edited in this review.** No Trio dividend was affected.
> - **R8 was a PASS for Strategy A** (Mode D, wide open, top Adj Win% 18.2%). The report's Mode C shadow ticket (膽 #12, $150) is shown for reference and **is not counted** in A's P&L. Strategy B plays all races, so B has 11 races and A has 10.
> - **Pre-race odds** are the HKJC pool snapshot captured **11:23–11:24 HKT**. R11's MC used live odds fetched during the run. "SP" = final win odds from the results file. Big moves: R3 banker #1 **5.8→10** (8th), R4 #8 **12→5.7** (won), R7 #10 **7.4→2.9** (2nd), R10 #10 7.3→3.5 (7th), R2 #14 23→6.5 (12th), R6 banker #2 4.4→**1.9** (2nd=).
> - **SCMP place odds were mis-parsed and the Q/QP matrix was unreliable** in every report. No ticket used the Q/QP cross-reference. Star Form, TIR, vet and trackwork were scored.
> - **Scoring.** **Strategy A** is scored exactly as written in each report. **Strategy B** follows the **review-skill definition**: MC top 6 by raw Win%, MC #1 banker, 1膽+5腳, $100/race. The reports' own "Strategy B" (Place% > 20% legs + Win-odds < 10 swap/add) is shown separately as **B-trio**. There were no MC Win% ties at the #6/#7 boundary.
> - **Banker counting.** "Banker top 3" counts a race only if **every** banker placed. There were three 雙膽拖 tickets (R2, R4, R11). **A's first banker was MC #1 in every race**, so the SCMP adjustments never changed the banker this card.

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played | **10 (R1–R11, R8 PASS)** |
| Hit rate | **3/10 (30.0%)** |
| Total staked | $1,060 |
| Total returned | $622 |
| **Net P&L** | **−$438** |
| **ROI** | **−41.3%** |
| Session Result | **LOSS** |

**Pool selection was the best of the season, but the bankers were the worst.** All three placers were inside A's pool in **7 of 10** races. **No A banker won.** The MC #1 banker placed in only 3 races (R4, R6, R9), and in **four races (R3, R5, R10, R11) the banker missed while every placer sat in the legs**: $2,140 of Trios lost to Pattern A. **Strategy B (MC top 6) hit 2/11 and lost −$845.** A won the session by $407: Rule 8 put R9's runner-up #1 SWIFT ASCEND (MC #7) into A's pool, the R8 PASS saved $100, and the three 雙膽拖 tickets were cheap. In hindsight the MC #2 horse placed in **10 of 11 races**, against 27/77 over the previous eight cards.

## Section 2: Race-by-Race Cross-Reference

Result column: **bold** = top-3 finisher NOT in the Strategy A pool.

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
| R1 | C5 1200m AWT | B (1膽+5腳) | #4 | 5, 3, 10, 7, 11 | **8**→**9**→7 | MISS ❌ | $2,260 | $0 | −$100 | Banker fail (#4 11th) + 2 gaps (#8 MC #11 at 40; #9 MC #9 at 12) |
| R2 | C5 1000m Turf | A 雙膽拖 (2膽+3腳) | #4, #2 | 1, 6, 8 | 1→**13**→2 | MISS ❌ | $711 | $0 | −$30 | Banker #4 fail (5th; #2 3rd ✅) + gap #13 (MC #7, 25) |
| R3 | C4 1200m Turf | B+ (1膽+6腳) | #1 | 7, 2, 6, 8, 4, 10 | 4→2→7 | MISS ❌ | $227 | $0 | −$150 | **Banker fail (all 3 in legs!)** #1 drifted 5.8→10, 8th |
| R4 | C3 1200m AWT | A+ 雙膽拖 (2膽+4腳) | #2, #8 | 4, 9, 7, 1 | 8→2→1 | **HIT ✅** | $43 | $43 | **+$3** | — |
| R5 | C4 1200m AWT | B+ (1膽+6腳) | #2 | 6, 1, 8, 9, 3, 12 | 6→8→1 | MISS ❌ | $632 | $0 | −$150 | **Banker fail (all 3 in legs!)** #2 (2.7 fav) 4th |
| R6 | C4 1200m Turf | A++ (1膽+6腳) | #2 | 7, 3, 6, 12, 9, 10 | 12→2=7 | **HIT ✅** | $212 | $212 | **+$62** | — (dead heat 2nd) |
| R7 | C4 1400m Turf | A++ (1膽+6腳) | #3 | 5, 6, 2, 14, 9, 10 | 5→10→**13** | MISS ❌ | $8,829 | $0 | −$150 | Banker fail (#3 4th) + gap #13 (MC #11, **142/1**) |
| R8 | C4 1600m Turf | **D PASS** (shadow C: 1膽 #12 + 6腳) | (#12) | (1, 4, 11, 7, 2, 5) | 1→7→11 | PASS | $171 | — | $0 | Shadow would have missed: banker #12 (77/1) 13th |
| R9 | C3 1200m Turf | A++ (1膽+6腳) | #3 | 8, 4, 2, 6, 7, 1 | 8→1→3 | **HIT ✅** | $367 | $367 | **+$217** | — |
| R10 | C3 1400m Turf "C" | B (1膽+5腳) | #3 | 7, 2, 9, 10, 1 | 9→1→7 | MISS ❌ | $1,135 | $0 | −$100 | **Banker fail (all 3 in legs!)** #3 9th |
| R11 | C2 1200m Turf | A+ 雙膽拖 (2膽+4腳) | #11, #2 | 1, 3, 4, 6 | 3→6→2 | MISS ❌ | $146 | $0 | −$40 | **Banker #11 fail (4th; all 3 in pool!)**, #2 3rd ✅ |

"+" in Mode = pool extended beyond the mode's nominal size: R3 (#4, #10), R4 (#7), R5 (#3/#12), R9 (#6, #1) and R11 (#6) by Rule 8 (Adj Place% ≥ 20%). R6 (#9 Rule 8, #10 Rule 9) and R7 (#9, #10 Rule 9) were extended by two each.

## Section 3: Hits Analysis

### R4 — 8→2→1 · Trio $43 (Class 3, 1200m AWT, 8 runners)

| Horse | Role | Pre / SP | MC Win% | MC Rating (Place%) | Adj Place% | Result |
|-------|------|----------|---------|--------------------|------------|--------|
| #2 BUSTLING CITY | 膽 Banker 1 | 1.5 / 1.4 (fav) | 63.9% | 93.1% | 85.0% (`+form`, capped) | **2nd** |
| #8 KEMPES | 膽 Banker 2 | 12 / **5.7** | 18.8% | 68.9% | 69.9% (`+form`) | **1st** |
| #1 LUCY IN THE SKY | 腳 | 9.2 / 7.8 | 2.6% | 24.6% | 25.6% (`+form`) | **3rd** |

**What made it work:** MC #1 and #2 ran 1-2. MC called #8 "undervalued by 126%" at 12, and it was backed to 5.7 and won. The 2nd-banker rule (Adj Place% ≥ 63%) cut the ticket to 4 combos. **Return $43 on $40 = +$3.** B's 10-combo ticket on the same frame lost $57.

### R6 — 12→2=7 · Trio $212 (Class 4, 1200m Turf, dead heat for 2nd)

| Horse | Role | Pre / SP | MC Win% | MC Rating (Place%) | Adj Place% | Result |
|-------|------|----------|---------|--------------------|------------|--------|
| #2 GALLANT DESIGN | 膽 Banker | 4.4 / **1.9** (fav) | 40.2% | 73.4% | 77.4% (`+trial`, `+excuses`) | **2nd=** |
| #12 LET'S HAVE FUN | 腳 | 6.8 / 11 | 6.7% | 26.0% | 28.0% (`+excuses`) | **1st** |
| #7 NOBLE SUPERIOR | 腳 | 5.5 / 7.7 | 17.4% | 49.6% | 49.6% | **2nd=** |

**What made it work:** MC #1 and #2 both placed, and MC #4 #12 won. All three were inside A's nominal 5-horse Mode A pool, so the two extra legs (#9 Rule 8, #10 Rule 9) added $90 for nothing. **Return $212 on $150 = +$62.** B (same 3 horses, $100) made +$112.

### R9 — 8→1→3 · Trio $367 (Class 3, 1200m Turf)

| Horse | Role | Pre / SP | MC Win% | MC Rating (Place%) | Adj Place% | Result |
|-------|------|----------|---------|--------------------|------------|--------|
| #3 HAPPY INDEX | 膽 Banker | 4.1 / 4.0 (fav) | 35.5% | 67.9% | 71.9% (`+trial`, `+excuses`) | **3rd** |
| #8 MEGASTAR HEART | 腳 | 7.9 / 5.0 | 15.2% | 42.9% | 44.9% (`+trial`) | **1st** |
| #1 SWIFT ASCEND | 腳 (7th horse, **Rule 8**) | 9.8 / 7.2 | 5.2% | 21.0% | 21.0% (217-day layoff) | **2nd** |

**What made it work:** **Rule 8.** #1 was MC #7 with Adj Place% 21.0%, just over the 20% line, so it was added as the 7th horse in a Dominant race. It was backed from 9.8 to 7.2 and ran 2nd. B's MC top 6 stopped at #6 ELITE GOLF (9th) and missed. **Return $367 on $150 = +$217**, the best result of the card.

## Section 4: Miss Classification

7 misses. **4 Pattern A, 0 Pattern B, 3 Pattern C.** (R8 PASS not counted.)

### Pattern A: Banker Fail — All 3 Placers Already in Legs (4/7)

| Race | Banker (pre → SP) | Finished | Result | Root cause | Missed Trio |
|------|-------------------|----------|--------|------------|-------------|
| R3 | #1 CROSSBORDERDUDE (5.8 → **10**) | 8th | 4→2→7 | MC #1 by 0.5pp over #7 (24.0% vs 23.5%), drifted to 5th in the market. MC #2 #7 ran 3rd, and the 2.5 favourite #4 (MC 3.5%, 1 start) won from the legs | $227 |
| R5 | #2 MEGA CAPTAIN (2.5 → 2.7 fav) | 4th | 6→8→1 | Co-top with #6 on MC (26.8% vs 26.5%). Resuming after 120 days. MC #2 #6 won | $632 |
| R10 | #3 FIT FOR BEAUTY (8.0 → 8.0) | 9th | 9→1→7 | MC #1 (32.7%) at 5th in the market, "undervalued by 165%". MC #2 #7 ran 3rd | $1,135 |
| R11 | #11 JUMBO TREASURE (3.9 → 3.3 fav) + #2 | #11 4th, #2 3rd | 3→6→2 | 雙膽拖: the strong favourite banker (43.2% / 82.9%) ran 4th, the 2nd banker placed | $146 |

**Combined Pattern A missed return: $2,140.** Two of the four (R3, R5) had a near-tie at the top of MC (gap ≤ 0.5pp). Three of the four bankers were MC #1 below 35% Win%.

### Pattern B: Banker Hit — Pool Gap (0/7)

None. **This is the first card this season with no Pattern B miss.** When the banker placed, the pool held the frame every time (R4, R6, R9).

### Pattern C: Banker Fail + Pool Gap (3/7)

| Race | Banker (pos, pre → SP) | Gap horse(s) | Gap MC rank (Win%) | Gap SP | Note |
|------|------------------------|--------------|--------------------|--------|------|
| R1 | #4 (11th, 5.9 → 5.5) | #8 1st, #9 2nd | #11 (0.9%), #9 (2.5%) | **40**, 12 | Only #7 (3rd, SP fav) was held. Genuine upset |
| R2 | #4 (5th, 6.8 → 5.5) + #2 (3rd ✅) | #13 2nd | #7 (1.2%) | 25 | #1 (won) was a leg. `+excuses` on #13 |
| R7 | #3 (4th, 4.6 → 5.6) | #13 3rd | #11 (0.7%) | **142** | #5 (won) and #10 (2nd, Rule 9) were legs |

**Combined Pattern C missed Trio value: $11,800** (R1 $2,260 + R2 $711 + R7 $8,829). Every gap horse was MC #7 or lower, and two were 40/1+.

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R1 | 1膽 #4 + 5腳 | Anything plausible | ❌ (#8 MC #11 at 40, #9 MC #9) | — |
| R2 | 2膽 #4/#2 + 3腳 | 1膽 #2 + legs incl. #13 | ✅ $711, but #13 was MC #7 at 25; no rule picks it | — |
| R3 | 1膽 #1 + 6腳 | Bank MC #2 #7 (3rd), same 7-horse pool | ✅ $227 | $0 → +$77 net |
| R3 | 1膽 #1 + 6腳 | Full box of the 7-horse pool (35 combos) | ✅ $227 | +$200 → −$123 net |
| R5 | 1膽 #2 + 6腳 | Bank MC #2 #6 (won), same pool | ✅ $632 | $0 → +$482 net |
| R5 | 1膽 #2 + 6腳 | Full box of 7 (35 combos) | ✅ $632 | +$200 → +$282 net |
| R7 | 1膽 #3 + 6腳 | Add #13 (142/1) | ✅ $8,829, but no rule would pick it | — |
| R8 | PASS | Shadow ticket (banker #12) | ❌ (banker 13th) | PASS saved $150 |
| R10 | 1膽 #3 + 5腳 | Full box of 6 (20 combos) | ✅ $1,135 | +$100 → +$935 net |
| R10 | 1膽 #3 + 5腳 | Bank MC #2 #7 (3rd) | ✅ $1,135 | $0 → +$1,035 net |
| R11 | 2膽 #11/#2 + 4腳 | 1膽 #2 + 5腳 (#11, 1, 3, 4, 6) | ✅ $146 | +$60 → +$46 net |

**Whole-card test of "full box of A's pool" (all 10 played races):** $2,650 staked, 7 hits (R3, R4, R5, R6, R9, R10, R11), $2,762 returned, **+$112** (vs −$438 as bet). It only works on a card where the pools were good and the bankers bad. Over the season the banker has placed ~49% of the time, and a box costs 2–3.5× a 膽拖, so this is a backtest candidate, not a rule.

**Whole-card test of "MC #2 as banker, same A pool":** $1,210 staked, 7 hits (R3, R4, R5, R6, R9, R10, R11), $2,762 returned, **+$1,552**. This is pure hindsight. MC #2 placed **27/77 (35.1%) over the previous eight cards**, against MC #1 at 39/77 (50.6%) (parsed from the stratC per-race tables, 09-Sep to 07-Oct). Today's 10/11 for MC #2 is an outlier.

- **Fixable misses** (with a rule we could actually write): **none cleanly.** R3 and R5 point at a "near-tie at MC #1/#2 (gap ≤ 1pp) → 雙膽拖 or switch to a 2-banker 'either' structure" idea. With #1/#7 and #2/#6 both as 2膽, R3 and R5 would still miss (one banker failed in each). The full-box alternative recovers R3, R5, R10 and R11 ($2,140) for $660 extra stake on those four races.
- **Unfixable misses**: **R1** (40/1 winner MC #11, 2nd MC #9), **R2** (#13 MC #7 at 25 plus a banker fail), **R7** (142/1 3rd).

## Section 6: Key Moments

- **Best Bet**: **R9 — +$217 on $150 (Trio $367).** Rule 8 added #1 SWIFT ASCEND (MC #7, Adj Place 21.0%) as the 7th horse, and it ran 2nd. B's MC top 6 left it out. The banker #3 (MC #1, fav) held 3rd.
- **Worst Bet**: **R3 — −$150 on a drifting banker.** #1 CROSSBORDERDUDE was MC #1 by only 0.5pp over #7, drifted from 5.8 to 10 and ran 8th. All three placers (#4, #2, #7) were among the 6 legs. It was the card's largest stake and was lost on the one horse that did not need to be there.
- **Most Frustrating**: **R10 — Trio $1,135, all three placers in the legs.** #9 (won), #1 (2nd) and #7 (3rd) were all legs. The banker #3 FIT FOR BEAUTY (MC 32.7%, fastest projected time, 8.0) ran 9th of 14.
- **Biggest Surprise**: **R7 — Trio $8,829.** #13 SOO KOO (MC 0.7%, **142/1**) ran 3rd behind #5 and #10. The Tierce paid $44,567 and the Quartet $213,822.
- **Best MC Call**: **R5 #6 ARMOUR WAR EAGLE.** MC had it level with the favourite (26.5% vs 26.8%, fastest projected time, "undervalued by 162%") at 9.7. It won at 8.9. **R4 #8 KEMPES** ("undervalued by 126%" at 12) also won, backed to 5.7.

## Section 7: Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 0 | — |
| Banker 2nd-3rd | 3 | R4 (#2 2nd, #8 1st), R6 (2nd=), R9 (3rd) |
| Banker out of top 3 | 7 | R1 (11th), R2 (#4 5th; #2 3rd), R3 (8th), R5 (4th), R7 (4th), R10 (9th), R11 (#11 4th; #2 3rd) |

**Banker strike rate (top 3): 3/10 = 30.0%** · **Banker win rate: 0/10 = 0.0%** (first banker; R4's 2nd banker #8 won)
**All bankers placed (season convention): 3/10 = 30.0%**, level with 13-Sep as the season's worst. The **2nd-banker rule went 3/3 on the 2nd banker** (R2 #2, R4 #8, R11 #2 all placed). The first banker failed in R2 and R11. Season 2nd-banker record: **7/11**.

**Banker by market rank at SP:** rank 1–2: **3/6** (R4, R6, R9 ✅; R2, R5, R11 ❌) · rank 3: **0/2** (R1, R7) · rank 4+: **0/3** (R3 10, R8 77 shadow, R10 8.0). **MC #1 ≥ 35% Win% placed 3/6; below 35% it placed 0/5** (R1, R3, R5, R8, R10). The two near-ties at the top of MC (R3 0.5pp, R5 0.3pp) both failed.

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | 3/10 (R4, R6, R9) |
| All 3 placers in pool (banker hit or not) | **7/10** (+ R3, R5, R10, R11) |
| At least 2 placers in pool | 9/10 (all except R1) |
| Banker hit + pool gap | 0/10 |

**The pool was not the problem.** The three gaps were MC #7 (25/1), #9/#11 (12/1, 40/1) and #11 (142/1).

### 7c. MC-Market Divergence Outcomes

Each report's "Market" paragraph lists its biggest MC-vs-market gaps. "Correct" = an undervalued horse placed, or an overvalued horse did not.

| Race | Undervalued (MC > mkt) → finish | Overvalued (MC < mkt) → finish |
|------|-------------------------------|------------------------------|
| R1 | #5 149% → 4th ❌ | **#7 (mkt fav, MC 4th) → 3rd ❌** · #1 → 9th ✅ · #9 → **2nd** ❌ |
| R2 | #4 157% → 5th ❌ · #6 → 11th ❌ | #8 → 13th ✅ · #10 → 6th ✅ · #12 → 8th ✅ · #3 → 10th ✅ |
| R3 | #7 → **3rd** ✅ · #6 → 12th ❌ | **#4 fav 2.5, 91% → 1st ❌** |
| R4 | **#8 126% → 1st ✅** | #7 → 5th ✅ · #10 → 8th ✅ · #9 (mkt 2nd) → 6th ✅ · #1 (mkt 3rd) → **3rd** ❌ |
| R5 | **#6 162% → 1st ✅** | #11 97% → 5th ✅ · #5 97% → 8th ✅ |
| R6 | #2 (76% place edge) → **2nd** ✅ · #6 201% → 12th ❌ | #3 (2nd fav) → 4th ✅ · #10 81% → 11th ✅ |
| R7 | #5 → **1st** ✅ · #3 → 4th ❌ · #2 100% → 9th ❌ | #14 → 8th ✅ · **#10 → 2nd ❌** · #1 97% → 6th ✅ |
| R8 | #12 485% → 13th ❌ · #4 363% → 7th ❌ | **#11 fav 2.6 → 3rd ❌** · #3 → 9th ✅ · #13 84% → 6th ✅ |
| R9 | #7 191% → 12th ❌ | #10 (2nd fav) 92% → 7th ✅ |
| R10 | #3 165% → 9th ❌ | #2 fav 3.6 → 5th ✅ |
| R11 | #2 → **3rd** ✅ · #1 → 5th ❌ | **#6 (2nd fav) → 2nd ❌** |

**MC divergence accuracy: 24/43 (55.8%).** Undervalued **6/18 (33.3%)**. Overvalued **18/25 (72.0%)**. **Claimed edge > 200%: 0/3** (R6 #6, R8 #12, R8 #4), making the **season 2/19**. **When MC opposed a horse the market had 1st–3rd at SP, that horse placed 5/7** (R1 #7, R3 #4, R7 #10, R8 #11, R11 #6 ✅; R6 #3, R10 #2 ❌). Two-card total: **10/15**. **Near-zero blind spot:** MC Win% < 4% at SP ≤ 6 placed **3/3** (R3 #4 3.5% won; R7 #10 1.7% 2nd; R11 #6 3.4% 2nd). Under the < 3% definition: 1/1 (R7 #10), season **13/19**.

### 7d. SCMP +Excuses Flag Performance

44 `+excuses` flags across 136 runners (field base rate 33/136 = 24.3%).

| Segment | Placed | Rate |
|---------|--------|------|
| All `+excuses` | 12/44 | **27.3%** |
| `+excuses` AND pre-race odds ≤ 8 | 7/12 | **58.3%** |
| `+excuses` AND pre-race odds > 8 | 5/32 | 15.6% |

The ≤ 8 placers were R2 #2, R3 #2, R3 #4, R6 #2, R6 #12, R9 #3 and R10 #9. The ≤ 8 non-placers were R1 #3, R3 #1 (banker), R5 #2 (banker, 4th), R6 #3 (4th) and R9 #4. **Four-card ≤ 8 record: 25/47 (53.2%)**, about twice the base rate. The > 8 placers were R1 #8 (40/1 winner), R2 #13 (gap), R5 #1, R7 #13 (142/1 gap) and R10 #1. **+Excuses hit rate (top 3): 12/44 (27.3%).**

**Other flags:** `+trial` **6/17** (6/11 at pre-race ≤ 10). Three-card ≤ 10 record: **16/30 (53.3%)**. `+form` **6/15**. **Negative flags 2/16** (`-injury30d` 0/9, `-age` 0/2, `-draw` 0/1, `-perf` 1/3, `-notRO` 1/1). Both negative-flag placers were market favourites at ≤ 3.0 SP (R7 #10 `-perf` 2nd at 2.9; R8 #11 `-notRO` 3rd at 2.0). Rule 9 kept R7 #10 in A's pool.

### 7e. Divergence Override Assessment

**No discretionary override was applied.** All tickets are rule output. The rules that changed tickets:

| Rule | Race | Effect | Result |
|------|------|--------|--------|
| Mode D PASS (top Adj Win% < 20%) | R8 | No bet ($150 shadow) | **Shadow banker #12 (MC #1, 33→77) ran 13th. PASS saved $150** |
| 2nd banker (Adj Place ≥ 63%) → 雙膽拖 | R2, R4, R11 | 3, 4, 4 combos ($110 total) | R4 **HIT** (+$3). 2nd bankers 3/3 placed; 1st bankers failed in R2/R11. Cheap losses ($70 vs $200 for 1膽+5腳) |
| Rule 8 extensions (Adj Place ≥ 20%) | R3 (#4, #10), R4 (#7), R5 (#3/#12), R6 (#9), R9 (#6, #1), R11 (#6) | +1 to +2 legs each | **R9 #1 2nd → the $367 hit.** R3 #4 won and R11 #6 ran 2nd, but both bankers failed |
| Rule 9 (negative flag at ≤ 15 not excluded) | R6 (#10), R7 (#9, #10) | +1–2 legs | R7 #10 (`-perf`, 7.4→2.9) **ran 2nd**; R6 #10 11th, R7 #9 7th |
| SCMP banker swap | — | Did not fire (A banker = MC #1 in all races) | — |

**Lesson:** pool-widening rules (8 and 9) put a placer in the pool **four times** (R3 #4, R7 #10, R9 #1, R11 #6) for about $390 of extra stake. They converted once (R9, $367), so they roughly broke even, and they are the reason A beat B. The PASS rule went 1/1. The leftover problem is purely the banker.

## Section 8: Learnings

### What Worked

- **Pool construction.** All three placers were in A's pool in 7/10 races, the season best, and there was no Pattern B miss for the first time.
- **Rule 8 / Rule 9 extensions.** They added four placers (R3 #4, R7 #10, R9 #1, R11 #6). R9's #1 (MC #7, Adj Place 21.0%) produced the card's best return, and B missed that race.
- **Mode D PASS.** R8's shadow banker (MC #1 at 33/1, "undervalued by 485%") ran 13th. PASS saved $150 and B lost $100 there.
- **Dominant races.** Mode A went **3/6, $560 → $622, +$62**. Competitive (Mode B) went **0/4, −$500**. Five-card Dominant: **10/28, +$859**. Five-card non-Dominant: **3/24, −$2,193**.
- **`+excuses` at pre-race ≤ 8 placed 7/12 (58.3%)**, and `+trial` at ≤ 10 placed 6/11. Both are about twice the base rate, for the fourth and third card in a row.

### What Didn't Work

- **The MC #1 banker placed only 3/11 (27.3%)**, against a mean MC Place% of 68.5%, which overstates the actual rate by ~41pp. **No A banker won.** Below 35% MC Win% the banker went 0/5.
- **Near-ties at the top of MC.** R3 (#1 24.0% vs #7 23.5%) and R5 (#2 26.8% vs #6 26.5%) bankered the wrong one of a coin-flip pair. MC #2 placed in both.
- **Market-favourite near-zeros.** MC Win% < 4% at SP ≤ 6 placed 3/3 (R3 #4 won, R7 #10 2nd, R11 #6 2nd). MC keeps under-rating heavily backed horses with sparse or poor recent form. Market top-3 horses MC opposed placed 5/7.
- **"Undervalued > 200%" calls went 0/3** (season 2/19). They are noise, not signal.
- **Negative SCMP flags on short favourites.** `-perf` R7 #10 (2.9) and `-notRO` R8 #11 (2.0) both placed. All 14 other negative flags were correct.

### Strategy Adjustments

- [ ] **Backtest a "near-tie banker" rule:** when MC #1 and #2 are within 1pp of MC Win% (R3, R5 this card), score both "1膽 MC #1", "1膽 MC #2" and "full box of the pool" across the season's stratC tables. This card: banking MC #2 hits both. Season MC #2 rate (35.1%) argues against a blind swap.
- [ ] **Backtest "box the pool" for Competitive races only** (where A is 3/24, −$2,193 over five cards). This card's four Competitive races boxed: $1,100 staked (R1 $200, R3 $350, R5 $350, R10 $200), $1,994 returned (R3, R5, R10).
- [ ] **Consider PASS or reduced stake on Competitive races with MC #1 < 30%** (R1 27.0%, R3 24.0%, R5 26.8% this card, all banker fails). Check the season record first.
- [ ] **Add a market floor for Rule 8:** a horse with MC Win% < 4% at pre-race ≤ 6 counts as Adj Place% ≥ 20% (must-include). This card it would have added nothing new (R3 #4 and R11 #6 were already in through Rule 8; R7 #10 through Rule 9). Season < 3% at SP ≤ 6: 13/19.
- [ ] **Do not penalise `-perf` / `-notRO` horses at ≤ 3.0 in the market.** This card 2/2 placed. Keep Rule 9 as is.
- [ ] **Run the momentum poller on race days** and re-check banker odds near the off. R3 banker #1 drifted 5.8→10 and ran 8th. Season drifters ≥ 1.5× as banker should be tallied before a rule.
- [ ] **Fix the scraper's comma truncation** (R1 QN $1,848.50 read as $1; R7 QP split into `2, 10, 1`) **and dead-heat second dividends** (R6 QN 7-12 and Tierce 12-7-2 missing). Code change, not part of this review.

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH (banker) / MEDIUM (ticket) | R4 | 1/1 | $40 | $43 | +$3 | +7.5% |
| MEDIUM-HIGH | R6, R7, R11 | 1/3 | $340 | $212 | −$128 | −37.6% |
| MEDIUM | R1, R2, R3, R5, R9, R10 | 1/6 | $680 | $367 | −$313 | −46.0% |
| LOW | R8 (PASS) | — | $0 | $0 | $0 | — |
| **TOTAL** | **10** | **3/10** | **$1,060** | **$622** | **−$438** | **−41.3%** |

**Each confidence band produced exactly one hit.** Confidence did not separate winners from losers this card: MEDIUM-HIGH R7 and R11 lost on favourite bankers (4th both), and MEDIUM R9 produced the biggest hit. **By classification**, Dominant (Mode A: R2, R4, R6, R7, R9, R11) went **3/6, $560 → $622, +$62**, and Competitive (R1, R3, R5, R10) went **0/4, $500 → $0, −$500**. Over five cards, Dominant is **10/28, +$859** and non-Dominant is **3/24, −$2,193**. That split is now the strongest structural finding of the season.

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
| **10** | **2026-10-11** | **ST** | **10** | **3** | **$1,060** | **$622** | **−$438** | **−41.3%** |
| **TOTAL** | | | **96** | **18** | **$8,850** | **$5,768** | **−$3,082** | **−34.8%** |

> The 06-Sep figures use the §10e convention (9 races / 2 hits / $870). Meeting 5 was a post-meeting blind run (no SCMP) and is included for tracking. Meeting 9 stake is net of the $30 R9 refund. Meeting 10 excludes the R8 PASS (11 races on the card).

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
| **2026-10-11 ST** | **3/10** | **30.0%** |
| **Combined** | **45/96** | **46.9%** |

### 10c. Venue Breakdown

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
|-------|----------|-------|------|--------|----------|-----|-----|--------------|
| **Sha Tin** | **6** | **62** | **14** | **$5,670** | **$4,423** | **−$1,247** | **−22.0%** | **25/62 (40.3%)** |
| Happy Valley | 4 | 34 | 4 | $3,180 | $1,345 | −$1,835 | −57.7% | 20/34 (58.8%) |

Sha Tin keeps the better ROI (−22.0% vs −57.7%) and the worse banker rate (40.3% vs 58.8%). At Sha Tin the pool usually holds the frame and the banker decides the race. At Happy Valley the banker places more often, but the gaps come from deep in the MC ranking.

### 10d. Season Trajectory

| Metric | 09-06 | 09-09 | 09-13 | 09-16 | 09-23 | 09-27 | 10-01 | 10-04 | 10-07 | **10-11** | Trend |
|--------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-----------|-------|
| Hit rate (meeting) | 22.2% | 0.0% | 10.0% | 0.0% | 22.2% | 18.2% | 36.4% | 18.2% | 22.2% | **30.0%** | ↑ |
| Hit rate (cumulative) | 22.2% | 11.8% | 11.1% | 8.6% | 11.4% | 12.7% | 16.7% | 16.9% | 17.4% | **18.8%** | ↑ |
| Cumulative P&L | −$79 | −$719 | −$1,113 | −$1,963 | −$1,748 | −$2,315 | −$2,218 | −$2,084 | −$2,644 | **−$3,082** | ↓ |
| Cumulative ROI | −9.1% | −47.6% | −46.8% | −60.8% | −42.3% | −45.6% | −37.8% | −29.8% | −33.9% | **−34.8%** | ↓ |
| Banker top 3 (meeting) | 33.3% | 50.0% | 30.0% | 75.0% | 55.6% | 45.5% | 45.5% | 54.5% | 55.6% | **30.0%** | ↓ |
| Banker top 3 (cumulative) | 33.3% | 41.2% | 37.0% | 45.7% | 47.7% | 47.3% | 47.0% | 48.1% | 48.8% | **46.9%** | ↓ |

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
| **10** | **2026-10-11** | **ST** | **3/10** | **−$438** | **−41.3%** | **2/11** | **−$845** | **−76.8%** | **A (R9 hit + PASS + 雙膽拖, $407)** |
| **TOTAL** | | | **18/96** | **−$3,082** | **−34.8%** | **17/97** | **−$4,163** | **−43.1%** | **A** |

*B = review-spec Strategy B (MC top 6, 1膽+5腳, $100 flat; 07-Oct R9 $60 net of refund). B-trio (the reports' own Strategy B) this meeting: **3/11 (R4, R6, R9), $1,120 staked, $622 returned, −$498, −44.5%**. Season B-trio: **23/97, $12,170 staked, $5,374 returned, −$6,796, −55.8%**.*

| Cumulative Metric | Strategy A | Strategy B | Delta (B − A) |
|-------------------|-----------|-----------|---------------|
| Total meetings | 10 | 10 | — |
| Total races | 96 | 97 | +1 |
| Hits (rate) | 18/96 (18.8%) | 17/97 (17.5%) | −1 |
| Total staked | $8,850 | $9,660 | +$810 |
| Total returned | $5,768 | $5,497 | −$271 |
| **Cumulative P&L** | **−$3,082** | **−$4,163** | **−$1,081** |
| **Cumulative ROI** | **−34.8%** | **−43.1%** | **−8.3 pp** |
| Banker top 3 rate | 45/96 (46.9%) | 45/97 (46.4%) | 0 |

This card takes cumulative ROI from −33.9% to **−34.8%**. Cumulative hit rate rose to 18.8%, the best since the opening card. **A regained the hit lead (18 vs 17) and won on returns as well as stake for the first time since 01-Oct**: Rule 8 found R9's runner-up, and the PASS and 雙膽拖 rules cut stake where the banker was doubtful. A's lead is now **$1,081**, about $810 from stake and $271 from returns. The A/B data still leans to A, but both strategies share the same banker in nearly every race, so they win and lose together. **The banker is the season's bottleneck** (46.9% top 3 against a typical MC Place% of 65–70%), and neither strategy addresses it.

## Section 11: A/B Strategy Comparison

### 11a. How Strategy B was derived

For each race, the **MC SIMULATION (raw)** table in `trio_strategy_20261011_ST_RN.md` was sorted by MC Win%. The first 6 horses form the pool and MC #1 is the banker: 1膽+5腳, 10 combos, $100, every race (including R8, which A passed). A hit needs the banker in the top 3 and all 3 placers in the 6-horse pool. No race had a tie at MC #6/#7. **This is not the same as the "STRATEGY B (MC-only)" block in each report**, which uses Place% > 20% legs and a Win-odds < 10 swap/add (4–6 legs, $60–$150). That block is tracked here as B-trio.

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | Strat A Banker | Strat B Pool (MC top 6) | Strat B Banker (MC #1) | Result (1→2→3) | A Hit? | B Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|--------------|----------------|-------------------------|------------------------|----------------|--------|--------|--------|----------|----------|---------|---------|----------------|
| R1 | 4,5,3,10,7,11 | #4 | 4,5,3,7,10,11 | #4 | 8→9→7 | ❌ | ❌ | $2,260 | $0 | $0 | $100 | $100 | Same pool & banker |
| R2 | 4,2 / 1,6,8 | #4 + #2 | 4,2,1,6,9,8 | #4 | 1→13→2 | ❌ | ❌ | $711 | $0 | $0 | $30 | $100 | A 雙膽拖 3 combos (−$70); #13 (MC #7) in neither |
| R3 | 1,7,2,6,8,4,10 | #1 | 1,7,2,8,6,10 | #1 | 4→2→7 | ❌ | ❌ | $227 | $0 | $0 | $150 | $100 | A +#4 (Rule 8/9, **won**); banker 8th so both miss |
| R4 | 2,8 / 4,9,7,1 | #2 + #8 | 2,8,4,9,1,7 | #2 | 8→2→1 | ✅ | ✅ | $43 | $43 | $43 | $40 | $100 | Same 6; A 雙膽拖 4 combos (−$60) |
| R5 | 2,6,1,8,9,3,12 | #2 | 2,6,1,8,9,3 | #2 | 6→8→1 | ❌ | ❌ | $632 | $0 | $0 | $150 | $100 | A +#12 (Rule 8, 11th); banker 4th |
| R6 | 2,7,3,6,12,9,10 | #2 | 2,7,6,12,9,3 | #2 | 12→2=7 | ✅ | ✅ | $212 | $212 | $212 | $150 | $100 | A +#10 (Rule 9, 11th), +$50 |
| R7 | 3,5,6,2,14,9,10 | #3 | 3,5,6,2,9,14 | #3 | 5→10→13 | ❌ | ❌ | $8,829 | $0 | $0 | $150 | $100 | A +#10 (Rule 9, **2nd**); banker 4th + #13 at 142 |
| R8 | PASS (shadow 12 / 1,4,11,7,2,5) | (#12) | 12,1,11,4,7,2 | #12 | 1→7→11 | PASS | ❌ | $171 | — | $0 | $0 | $100 | **A PASS (Mode D)**; B banker 77/1 13th |
| R9 | 3,8,4,2,6,7,1 | #3 | 3,8,4,7,2,6 | #3 | 8→1→3 | ✅ | ❌ | $367 | $367 | $0 | $150 | $100 | **A +#1 (Rule 8, MC #7) ran 2nd** |
| R10 | 3,7,2,9,10,1 | #3 | 3,7,10,9,2,1 | #3 | 9→1→7 | ❌ | ❌ | $1,135 | $0 | $0 | $100 | $100 | Same pool & banker (Pattern A in both) |
| R11 | 11,2 / 1,3,4,6 | #11 + #2 | 11,2,1,3,4,6 | #11 | 3→6→2 | ❌ | ❌ | $146 | $0 | $0 | $40 | $100 | Same 6; A 雙膽拖 4 combos (−$60) |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | 10 | 11 | +1 |
| Hits | 3/10 (30.0%) | 2/11 (18.2%) | −1 |
| Total staked | $1,060 | $1,100 | +$40 |
| Total returned | $622 | $255 | −$367 |
| **Net P&L** | **−$438** | **−$845** | **−$407** |
| **ROI** | −41.3% | −76.8% | −35.5 pp |
| Banker top 3 rate | 3/10 (30.0%) | 3/11 (27.3%) | 0 |

*B-trio (report's own B, for reference): 3/11 (R4 $43, R6 $212, R9 $367), $1,120 staked, $622 returned, −$498, −44.5%, banker 3/11. It hit R9 because #1 (MC Place% 21.0%) was a primary leg. Its Win-odds < 10 step added R3's winner #4 (banker failed) and swapped R7's #2 out for #14 (8th); R8's swap brought in #3 (9th).*

### 11d. Where A and B Diverged

| Race | What Differed | A Result | B Result | Impact | Root cause |
|------|---------------|----------|----------|--------|------------|
| R9 | Pool: A had #1 (MC #7), B had only MC top 6 | HIT ✅ | MISS ❌ | **A +$317** | Rule 8 (Adj Place 21.0% ≥ 20%) in a Dominant race |
| R8 | A PASS, B played | PASS | MISS ❌ | A +$100 | Mode D (top Adj Win% 18.2% < 20%) |
| R2 | Structure: A 雙膽拖 3 combos | MISS ❌ | MISS ❌ | A +$70 | 2nd-banker rule (#2 Adj Place 73.4%) |
| R4 | Structure: A 雙膽拖 4 combos | HIT ✅ | HIT ✅ | A +$60 | 2nd-banker rule (#8 69.9%) |
| R11 | Structure: A 雙膽拖 4 combos | MISS ❌ | MISS ❌ | A +$60 | 2nd-banker rule (#2 71.6%) |
| R3 | Pool: A +#4 (won) | MISS ❌ | MISS ❌ | B +$50 | Rule 8/9 via `+excuses` + `+trial` on the 2.5 favourite |
| R5 | Pool: A +#12 | MISS ❌ | MISS ❌ | B +$50 | Rule 8 extension |
| R6 | Pool: A +#10 | HIT ✅ | HIT ✅ | B +$50 | Rule 9 (`-injury30d` at 8.3) |
| R7 | Pool: A +#10 (2nd) | MISS ❌ | MISS ❌ | B +$50 | Rule 9 (`-perf` at 7.4) |

Net: **A +$407 vs B**. R9 alone accounts for $317. The PASS and 雙膽拖 rules saved $290, and the four extensions in losing or already-covered races cost $200.

### 11e. Session Verdict

**A won by $407 (−$438 vs −$845).** One race decided most of it: in R9, Rule 8 added MC #7 #1 SWIFT ASCEND (Adj Place 21.0%), which ran 2nd behind a placed banker. That is **systematic rather than lucky**. It is the mirror image of 07-Oct R3, where a Mode A pool without a 20% extension cost A the race. The rest of the margin came from A's stake rules: the R8 PASS (+$100) and three 雙膽拖 tickets (+$190), all of them in races both strategies lost or hit equally. The two strategies shared the same MC #1 banker in all 11 races, so they **failed together in seven**. Four of those failures (R3, R5, R10, R11) had every placer in both pools, and **neither A's SCMP adjustments nor B's raw ranking would have changed the banker**. The banker, not the pool, is where the next improvement has to come from.
