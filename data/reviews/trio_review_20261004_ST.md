# Trio Post-Race Review — Sha Tin | 2026-10-04

**Meeting 8 of the 2026/27 season.** 11-race Sunday card on a **mixed surface**: R1, R3, R5 and R9 on the AWT (Good), and the rest on Turf (**Good to Firm** officially; the reports modelled "Good"). R7 was run on the "B" course. **#3 RELIABLE PROFIT was withdrawn from R9**, leaving 11 runners; there were no other scratchings. Results: `data/historical/results_20261004_ST.json`. Bet records: `data/reports/trio_strategy_20261004_ST_R1–R11.md`.

> **Data notes for this meeting**
> - **Results scraped first time** (`tools/scrape-meeting.ts`, DT/TT enrichment ✓). Every race was cross-checked against the local momentum API (`/api/momentum/race/2026-10-04-ST-N`, HKJC official dividends). **All 11 Trio, Win, Place and Tierce dividends match, and so does every finishing position and SP.** Trio (per $10): R1 $182 · R2 $108 · R3 $116 · R4 $1,873 · R5 $2,470 · R6 $146 · R7 $383 · R8 $5,528 · R9 $2,441 · R10 $6,135 · R11 $1,148. Trio/Tierce ratios (3.6–10.5) look normal.
> - **The comma-truncation bug came back for three non-Trio dividends.** R4 Quinella was scraped as $1 (official **$1,200**), R10 Quinella as $2 (official **$2,884.5**), and R8 QP 10-11 as $1 (official **$1,002.5**). All three were corrected in the results JSON. No Trio dividend was affected.
> - **Pre-race odds** are the HKJC pool snapshot captured **~10:22–10:35 HKT**. R5 and R9–R11 used a live refresh around 10:30–10:35, and the rest the 10:22 meeting file. That is 2–5 hours before the off. "Snap" = the last momentum snapshot before the scheduled post time. "SP" = final win odds from the results file. Big moves: R5 banker #4 **9.8→5.3** (ran 10th), R9 banker #8 **4.9→7.6** (7th), R4 #12 22→9.8 (won), R8 #8 12→4.8 (won), R11 #10 8.9→4.4 (5th).
> - **SCMP place odds and Q/QP figures were garbled in every race** (place odds at or above win odds, impossible Q values like "1-12 = 1"). No report used the Q/QP cross-reference. Star Form, TIR, vet and trackwork text parsed well enough to score.
> - **Scoring.** **Strategy A** is scored exactly as written in each report. **Strategy B** follows the **review-skill definition**: MC top 6 by raw Win%, MC #1 banker, 1膽+5腳, $100/race. **The reports' own "Strategy B" is a different ticket**: Place% > 20% legs plus a Win-odds < 10 swap/add, with variable stake ($30–$280). It is shown separately as **B-trio**. There were no ties at the 6th MC slot.
> - **Banker counting.** "Banker top 3" counts a race only if **every** banker placed. The only 雙膽拖 race this card was R3, and both bankers placed. In every race the A primary banker was also MC #1 (no debutant swaps), so A and B bankers are identical this card.

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played | **11 (R1–R11)** |
| Hit rate | **2/11 (18.2%)** |
| Total staked | $1,130 |
| Total returned | $1,264 |
| **Net P&L** | **+$134** |
| **ROI** | **+11.9%** |
| Session Result | **WIN** |

**This is the second profitable card in a row, and it rests on one race.** R11 returned **$1,148 on a $60 ticket**, the biggest single Trio hit of the season. R3 added a low $116 on a $40 雙膽拖. The other nine races lost $1,070. **Strategy B (MC top 6) hit the same two races and made +$164.** It won the session by $30, purely on stake: A's extended 7–8 horse pools in R8–R10 cost $510 and returned nothing. The report's own MC-only ticket (B-trio) hit 3/11 but lost −$863, because its 1-for-1 swap removed R11's 3rd-placed horse.

## Section 2: Race-by-Race Cross-Reference

Result column: **bold** = top-3 finisher NOT in the Strategy A pool.

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
| R1 | C5 1650m AWT | A (1膽+4腳) | #2 | 12, 4, 1, 7 | 1→**14**→12 | MISS ❌ | $182 | $0 | −$60 | Banker fail (#2 6th) + gap #14 (market fav 3.6→3.1, MC 0.0%) |
| R2 | C4 1200m | B (1膽+5腳) | #13 | 3, 7, 5, 9, 1 | 13→**2**→3 | MISS ❌ | $108 | $0 | −$100 | Banker **won**, gap #2 (MC #14, 0.6%, `+trial`, 6.4→4.4) |
| R3 | C2 1650m AWT | A (2膽+4腳) | #2, #6 | 7, 5, 8, 3 | 6→2→7 | **HIT ✅** | $116 | $116 | **+$76** | — |
| R4 | C5 1400m | A (1膽+4腳) | #4 | 13, 8, 9, 6 | **12**→**14**→8 | MISS ❌ | $1,873 | $0 | −$60 | Banker fail (#4 12th) + 2 gaps (#12 MC #8, 22→9.8; #14 MC #5, 23) |
| R5 | C4 1650m AWT | A+ (1膽+5腳) | #4 | 2, 8, 10, 1, 6 | **5**→8→2 | MISS ❌ | $2,470 | $0 | −$100 | Banker fail (#4 steamed 9.8→5.3, ran 10th) + gap #5 (MC #10, `+trial`, 14) |
| R6 | C4 1400m | B (1膽+5腳) | #2 | 11, 6, 3, 8, 1 | 6→2→**9** | MISS ❌ | $146 | $0 | −$100 | Banker 2nd, gap #9 (MC #9, 1.7%, `+trial`, 10→7.4) |
| R7 | C4 1400m "B" | A+ (1膽+5腳) | #3 | 7, 13, 2, 10, 9 | 3→**14**→9 | MISS ❌ | $383 | $0 | −$100 | Banker **won**, gap #14 (MC #12, 0.8%, 2nd fav 3.8, `+trial`/`-injury30d`) |
| R8 | C3 1800m | A+ (1膽+6腳) | #5 | 10, 1, 9, 8, 4, 2 | 8→10→**11** | MISS ❌ | $5,528 | $0 | −$150 | Banker fail (#5, 2.4 fav, 6th) + gap #11 (MC #9, 0.6%, 61) |
| R9 | C3 1650m AWT | A+ (1膽+6腳) | #8 | 12, 7, 2, 4, 1, 9 | **10**→**5**→1 | MISS ❌ | $2,441 | $0 | −$150 | Banker fail (#8 drifted 4.9→7.6, 7th) + 2 gaps (#10 MC #8; #5 MC #10, 7.2) |
| R10 | C3 1000m straight | B+ (1膽+7腳) | #1 | 2, 9, 4, 8, 13, 3, 10 | 1→**7**→**14** | MISS ❌ | $6,135 | $0 | −$210 | Banker **won at 18**, 2 gaps (#7 MC #12, 0.7%, 20; #14 MC #9, 12→6.7) |
| R11 | C3 1200m | A (1膽+4腳) | #2 | 4, 1, 5, 3 | 5→2→3 | **HIT ✅** | $1,148 | $1,148 | **+$1,088** | — |

"+" in Mode = pool extended beyond the mode's nominal size by the Adj Place% ≥ 25% must-include rule or Rule 8 (≥ 20%).

## Section 3: Hits Analysis

### R3 — 6→2→7 · Trio $116 (Class 2, 1650m AWT, 8 runners)

| Horse | Role | Pre / SP | MC Win% | MC Rating (Place%) | Adj Place% | Result |
|-------|------|----------|---------|--------------------|------------|--------|
| #2 TALENTS AMBITION | 膽 Banker 1 | 2.3 / 3.3 (2nd fav) | 62.8% | 93.1% | 85.0% (`+trial`, capped) | **2nd** |
| #6 DEFINITIVE | 膽 Banker 2 | 11 / 8.7 | 14.8% | 65.4% | 68.4% (`+excuses`, `+form`) | **1st** |
| #7 SKY VINO | 腳 | 5.7 / 2.9 (fav) | 13.3% | 62.4% | 64.4% (`+excuses`) | **3rd** |

**What made it work:** MC #1–#3 filled the frame in an 8-runner race. The 2nd-banker rule (Adj Place ≥ 63%) chose #6 over #7 by 4pp, and SCMP flags supplied the margin: `+excuses` and `+form` lifted #6 from 65.4% to 68.4%. #6 then won. The report called the #6/#7 choice a "coin-flip"; it went the right way. **Return $116 on $40 = +$76.** A 1膽+5腳 ticket on the same 6 horses makes only +$16.

### R11 — 5→2→3 · Trio $1,148 (Class 3, 1200m Turf)

| Horse | Role | Pre / Snap / SP | MC Win% | MC Rating (Place%) | Adj Place% | Result |
|-------|------|-----------------|---------|--------------------|------------|--------|
| #2 SOLID STATE | 膽 Banker | 1.9 / 2.0 / 2.1 (fav) | 49.2% | 81.8% | 82.8% (`+form`) | **2nd** |
| #5 BUNTA BABY | 腳 | 22 / 25 / **39** | 10.5% | 39.8% | 41.8% (`+excuses`) | **1st** |
| #3 LUCY IN THE SKY | 腳 (4th leg) | 20 / 21 / 11 | 4.5% | 22.4% | 22.4% | **3rd** |

**What made it work:** a strongly Dominant race (MC #1 at 49%) with a clear break after the MC top 4. Mode A took the banker plus the four best Adj Place% horses. The 4th leg, #3 (22.4%), beat the market's 2nd favourite #10 (18.2%, 8.9→4.4, ran 5th) by threshold alone. **#5 was MC #4 and one of the report's "undervalued 124–132%" calls**; it drifted to 39 and won. The B-trio ticket made exactly the opposite choice: its Win-odds < 10 swap put #10 in for #3, and it missed. **Return $1,148 on $60 = +$1,088**, the season's biggest single hit.

## Section 4: Miss Classification

9 misses. **0 Pattern A, 4 Pattern B, 5 Pattern C.**

### Pattern A: Banker Fail — All 3 Placers Already in Legs (0/9)

None. In every race where the banker failed, at least one placer was also outside the pool.

### Pattern B: Banker Hit — Pool Gap (4/9)

| Race | Banker | Pool gap | Gap pre / SP | Gap MC rank (Win%) | SCMP flag on gap | Missed Trio |
|------|--------|----------|--------------|--------------------|------------------|-------------|
| R2 | #13 KOL **won** | #2 WOLF COMING (2nd) | 6.4 / 4.4 | #14 of 14 (0.6%) | `+trial`, `+form` | $108 |
| R6 | #2 GRAND PATCH 2nd | #9 SHOTGUN (3rd) | 10 / 7.4 | #9 (1.7%) | `+trial` | $146 |
| R7 | #3 LADY'S LOVE **won** | #14 QUICK CONTRIBUTION (2nd) | 5.7 / 3.8 | #12 (0.8%) | `+trial`, `-injury30d` | $383 |
| R10 | #1 HORSEPOWER **won** | #7 CASA OF HONOR (2nd), #14 LAHORE (3rd) | 23 / 20; 12 / 6.7 | #12 (0.7%), #9 (2.7%) | `+excuses`; `+form` | $6,135 |

**Pattern B was 4/9, and in R2, R6 and R7 the only gap was a single `+trial` horse at pre-race odds ≤ 10.** Each of the three was rated ≤ 1.7% by MC, so no Adj Place% threshold could reach them (+2 on a 0.6–1.7% base is still far below 20%). R10 needed two deep outsiders and could not realistically be fixed.

### Pattern C: Banker Fail + Pool Gap (5/9)

| Race | Banker (pos, pre → SP) | Gap horse(s) | Gap MC Win% | Gap SP | Note |
|------|------------------------|--------------|-------------|--------|------|
| R1 | #2 (6th, 6.6 → 6.8) | #14 2nd | 0.0% | 3.1 | **Market favourite rated 0.0% by MC**; #1 and #12 (1st, 3rd) were legs |
| R4 | #4 (12th, 11 → 13) | #12 1st, #14 2nd | 3.2%, 4.3% | 9.8, 23 | MC "301% undervalued" banker; #12 (steamed 22→9.8) was A's rank-6 by Adj Win, just outside the 5-horse pool |
| R5 | #4 (10th, 9.8 → **5.3**) | #5 1st | 2.6% | 14 | Banker was backed into favouritism and ran 10th; #8 and #2 (2nd, 3rd) were legs |
| R8 | #5 (6th, 2.5 → 2.4 fav) | #11 3rd | 0.6% | 61 | #8 (MC #6, 12→4.8) won and #10 (MC #2) ran 2nd, both legs |
| R9 | #8 (7th, 4.9 → 7.6) | #10 1st, #5 2nd | 3.5%, 2.6% | 11, 7.2 | Two gaps; #1 (3rd) was in only because `+trial` + Rule 8 pulled it in |

**Combined Pattern C missed Trio value: $12,494** (R1 $182 + R4 $1,873 + R5 $2,470 + R8 $5,528 + R9 $2,441).

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R1 | 1膽 #2 + 4腳 | Add market fav #14 (pre 3.6) as a 5th leg (= B-trio leg set + #7) | ❌ (banker 6th) | +$40 |
| R1 | 1膽 #2 + 4腳 | Box A pool + #14 (6 horses, C(6,3) = 20) | ✅ $182 | +$140 → −$18 net |
| R2 | 1膽 #13 + 5腳 | Add `+trial` #2 (pre 6.4) as a 6th leg (15 combos) | ✅ $108 | +$50 → −$42 net |
| R4 | 1膽 #4 + 4腳 | Box A pool + #14, #12 (7 horses, 35 combos) | ✅ $1,873 | +$290 → +$1,523 net |
| R5 | 1膽 #4 + 5腳 | Box A pool + `+trial` #5 (7 horses, 35 combos) | ✅ $2,470 | +$250 → +$2,120 net |
| R6 | 1膽 #2 + 5腳 | Add `+trial` #9 (pre 10) as a 6th leg | ✅ $146 | +$50 → −$4 net |
| R7 | 1膽 #3 + 5腳 | Add `+trial` #14 (pre 5.7) as a 6th leg (B-trio had it) | ✅ $383 | +$50 → +$233 net |
| R8 | 1膽 #5 + 6腳 | Anything plausible | ❌ (#11 at 61, MC 0.6%; banker 6th) | — |
| R9 | 1膽 #8 + 6腳 | Anything plausible | ❌ (banker 7th; placers MC #7, #8, #10) | — |
| R10 | 1膽 #1 + 7腳 | Anything plausible | ❌ (#7 MC #12 at 20, #14 MC #9) | — |

**Whole-card test of a "`+trial` AND pre-race ≤ 10 → must-include leg" rule:** it adds R2 #2, R6 #9, R7 #14 and R8 #3 (7th). **5/11 hits, $1,340 staked, $1,901 returned, +$561**, against +$134 as bet.

- **Fixable misses** (with a rule we could actually write): **R2, R6, R7**. That recovers $637 for +$210 extra stake across the card (including the wasted R8 add). R4 and R5 could only be fixed with 35-combo boxes ($350 each), which would lose heavily on other cards.
- **Unfixable misses**: **R1** (banker fail and MC 0.0% on the placed favourite), **R8** (61-shot), **R9** (three placers ranked MC #7, #8, #10), **R10** (MC #12 at 20).

## Section 6: Key Moments

- **Best Bet**: **R11 — +$1,088 on $60.** The tight Mode A ticket (6 combos) held the MC top 4 plus #3. The banker ran 2nd, the 39-shot MC #4 won, and the 4th leg ran 3rd. It was the season's biggest single return.
- **Worst Bet**: **R10 — −$210, the card's biggest stake.** In a LOW–MEDIUM Competitive race, must-include pushed the pool to 8 horses (21 combos). The banker then **won at 18**, but the 2nd and 3rd (MC #12 and #9) were outside even that wide pool. Wide pools paid for coverage the result never needed.
- **Most Frustrating**: **R7 — the banker won, and the only gap was #14 QUICK CONTRIBUTION at 3.8**, the market's 2nd favourite. MC rated it 0.8%. The report's `-injury30d` (−3/−4) cancelled out its `+trial` (+2), so it stayed out of A. B-trio had it and hit the $383 Trio.
- **Biggest Surprise**: **R8.** MC #1 #5 FLOW WATER FLOW (45.0% MC, 2.4 favourite, Purton) ran 6th, and #11 DREAMING TOGETHER (MC 0.6%, 61) ran 3rd. Trio $5,528.
- **Best MC Call**: **R10 #1 HORSEPOWER.** MC had it at 23.8% (fair ~4.2) against 13 pre-race and **18 SP (10th in the market)**, and it won. This was the only one of six "undervalued > 200%" calls this card that placed. **R3 #6 DEFINITIVE** gets an honourable mention: MC #2 at 11, it won as the 2nd banker.

## Section 7: Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 3 | R2, R7, R10 |
| Banker 2nd-3rd | 3 | R3 (co-banker #6 won), R6, R11 |
| Banker out of top 3 | 5 | R1 (6th), R4 (12th), R5 (10th), R8 (6th), R9 (7th) |

**Banker strike rate (top 3): 6/11 = 54.5%** · **Banker win rate: 3/11 = 27.3%**
**All bankers placed (season convention): 6/11 = 54.5%.** R3's 2nd banker #6 won, so the 2nd-banker rule went **1/1** this card (4/7 over three cards).

**Banker MC strength did not help this card:** MC #1 ≥ 35% Win placed **3/7** (R3, R7, R11; failed R1, R4, R5, R8). Below 35% it placed **3/4** (R2, R6, R10; failed R9).
**Banker market rank at SP:** rank 1–2: **4/6** (R2, R3, R6, R11 ✅; R5, R8 ❌) · rank 3: **1/3** (R7 ✅) · rank 4+: **1/2** (R10 ✅ at 10th in the market; R4 ❌).

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | 2/11 (R3, R11) |
| All 3 in pool OR banker + 2 legs | 2/11 |
| At least 2 placers in pool | 8/11 (+ R1, R2, R5, R6, R7, R8) |
| Banker hit + pool gap | 4/11 (R2, R6, R7, R10) |

At least 2 of 3 placers were in the pool in 8 races, but only 2 converted. The banker and a single gap horse decided every other race.

### 7c. MC-Market Divergence Outcomes

Each report's "Market" paragraph lists its biggest MC-vs-market gaps. "Correct" = an undervalued horse placed, or an overvalued horse did not.

| Race | Undervalued (MC > mkt) → finish | Overvalued (MC < mkt) → finish |
|------|-------------------------------|------------------------------|
| R1 | **#2 202% → 6th ❌** · #4 189% → 4th ❌ | #14 (fav 3.6, MC 0.0%) → **2nd** ❌ |
| R2 | **#9 323% → 11th ❌** · #7 162% → 12th ❌ · #1 146% → 10th ❌ | #2 → **2nd** ❌ · #14 → 9th ✅ · #11 → 6th ✅ |
| R3 | #2 → **2nd** ✅ · #6 → **1st** ✅ | #3 → 6th ✅ · #4 → 5th ✅ · #1 → 8th ✅ |
| R4 | **#4 301% → 12th ❌** | #8 → **3rd** ❌ · #6 → 9th ✅ · #2 → 8th ✅ · #11 → 7th ✅ |
| R5 | **#4 248% → 10th ❌** · #10 → 8th ❌ | #7 → 11th ✅ · #6 → 9th ✅ · #12 → 4th ✅ |
| R6 | **#11 283% → 11th ❌** | #3 → 9th ✅ · #9 → **3rd** ❌ |
| R7 | #3 105% → **1st** ✅ · #10 146% → 13th ❌ · #7 99% → 9th ❌ | #8 → 14th ✅ · #14 → **2nd** ❌ |
| R8 | #10 123% → **2nd** ✅ | #9 → 5th ✅ · #3 → 7th ✅ · #6 → 11th ✅ |
| R9 | #8 (34.5% vs ~17%) → 7th ❌ | #5 81% → **2nd** ❌ · #6 → 9th ✅ · #11 → 5th ✅ |
| R10 | **#1 210% → 1st ✅** | #12 → 5th ✅ · #11 → 11th ✅ |
| R11 | #4 132% → 10th ❌ · #5 124% → **1st** ✅ | #10 → 5th ✅ · #7 → 8th ✅ |

**MC divergence accuracy: 28/47 (59.6%).** Undervalued **6/19 (31.6%)**. **Claimed edge > 200%: 1/6** (R10 #1 won; R1 #2, R2 #9, R4 #4, R5 #4 and R6 #11 all unplaced), making the **season 1/14**. Overvalued 22/28. **All six overvalued misses were at SP ≤ 7.4** (R1 #14 3.1, R2 #2 4.4, R4 #8 3.5, R6 #9 7.4, R7 #14 3.8, R9 #5 7.2). When the market backs a horse the MC dismisses, the market keeps winning the argument.

### 7d. SCMP +Excuses Flag Performance

51 `+excuses` flags across 141 runners (field base rate 33/141 = 23.4%).

| Segment | Placed | Rate |
|---------|--------|------|
| All `+excuses` | 11/51 | **21.6%** |
| `+excuses` AND pre-race odds ≤ 8 | 4/9 | **44.4%** |
| `+excuses` AND pre-race odds > 8 | 7/42 | 16.7% |

The ≤ 8 placers were R3 #7, R4 #8, R6 #2 and R9 #5. The ≤ 8 non-placers were R4 #13 (6th), R4 #6 (9th), R7 #8 (14th), R8 #5 (6th, banker) and R9 #12 (6th). **Two-card ≤ 8 record: 12/21 (57.1%)**, still well above the base rate. The flag did not decide a race this card: every ≤ 8 placer except R9 #5 was already in A's pool, and R9's banker failed anyway. **+Excuses hit rate (top 3): 11/51 (21.6%)**, no better than the field.

**The `+trial` flag was the card's best SCMP signal: 10/17 placed (58.8%)**, and **8/12 at pre-race ≤ 10**. Four `+trial` horses outside A's pool placed: R2 #2, R5 #5, R6 #9 and R7 #14. Three of them were the only gap in their race. Other flags: `+form` 10/26 (38.5%), `-injury30d` 1/6 (the one that placed was R7 #14, 2nd), `-perf` 0/3, `+draw` 1/2.

### 7e. Divergence Override Assessment

**No discretionary override was applied.** All tickets are rule output. The rules that changed tickets:

| Rule | Race | Effect | Result |
|------|------|--------|--------|
| 2nd banker (Adj Place ≥ 63%) → 雙膽拖 | R3 | #6 co-banked over #7 (68.4% vs 64.4%), 4 combos | **Both bankers placed (1st, 2nd) → HIT $116**, +$60 better than 1膽 |
| Mode A tight pool (5) | R1, R4, R11 | 6 combos each | R11 **HIT $1,148**. R4 left out #14 (MC #5, 2nd) by 0.2pp of Adj Place%, but the banker failed anyway |
| Must-include ≥ 25% / Rule 8 ≥ 20% extensions | R3, R5, R7, R8, R9, R10 | Pools grew to 6–8 | Extra placers caught: R7 #9 (3rd), R8 #8 (won), R9 #1 (3rd), none converted. **R8–R10 alone cost $510 for $0** |
| `-injury30d` | R7 #14 | Cancelled its `+trial`, Adj 3.4% place | **Ran 2nd at 3.8 → cost the $383 Trio** |
| SCMP `+trial` / `+excuses` pool swaps vs raw MC | R2 (#1 for #14), R9 (+#1), R10 (+#13, #3) | Different 6th+ legs | No outcome change |

**Lesson:** the SCMP layer helped once (R3 co-banker choice) and hurt once (R7 injury penalty on a horse that had since trialled well). The must-include extensions are now the biggest stake drain: in R8–R10 the pool grew to 7–8 horses, while the actual gaps sat at MC #8–#12.

## Section 8: Learnings

### What Worked

- **Tight Dominant tickets carried the card.** R11 (6 combos, $1,148) and R3 (4 combos, $116) returned $1,264 on $100. The four Mode A races with 4–6 combos (R1, R3, R4, R11) made **+$1,044 on $220**.
- **The MC's top tier was right more often than the market thought.** 6 of 11 MC #1 horses placed, including R10 #1 at 18 SP (won) and R7 #3 (won). R11 #5 (MC #4 at 22→39) and R3 #6 (MC #2 at 11) won.
- **`+trial` was the strongest single signal on the card**: 10/17 placed, 8/12 at pre-race ≤ 10.
- **Dividends verified cleanly.** The momentum API confirmed all 11 Trios, and caught the three truncated quinella/QP values.

### What Didn't Work

- **Pool extensions bought coverage in the wrong place.** R8–R10 took 7–8 horse pools ($510, 0 hits). The gaps in those races were MC #9, #8/#10 and #9/#12, far below any threshold.
- **The market-backed near-zero blind spot hit again.** MC Win% < 3% at SP ≤ 6 placed **3/5** (R1 #14 fav, R2 #2, R7 #14), **12/16 across four meetings**. In R2 and R7, that horse was the only thing between the banker win and a hit.
- **Strong MC bankers failed when the market moved against or past them.** R5 #4 was backed 9.8→5.3 and ran 10th. R9 #8 drifted 4.9→7.6 and ran 7th. R8 #5 (2.4 fav) ran 6th. MC #1 ≥ 35% placed only 3/7.
- **"Undervalued > 200%" calls: 1/6** (season **1/14**). Four of the six were bankers (R1 #2, R4 #4, R5 #4, R10 #1), and only R10 placed.
- **`-injury30d` overrode recent good work.** R7 #14 had passed its vet exam 26 days before and "now trialled well". The penalty kept it out, and it ran 2nd at 3.8.

### Strategy Adjustments

- [ ] **Backtest "`+trial` AND pre-race ≤ 10 → must-include leg"** across 06-Sep–01-Oct. This card: 8/12 placed, and the rule would have turned R2, R6 and R7 into hits (5/11, **+$561 vs +$134**). Adopt only if it holds on at least two more cards.
- [ ] **Cap must-include extensions at 7 horses / $150, and test dropping Rule 8 (20–25%) extensions in Competitive / ≤ MEDIUM races.** R8–R10's extensions cost $510 for $0. Rule 8 did catch R9 #1 (3rd), so measure both sides before cutting it.
- [ ] **Waive `-injury30d` when SCMP reports a good trial after the vet pass** (`+trial` present). Evidence: R7 #14 (2nd at 3.8). Check the season's other `-injury30d` horses first. They placed only 1/6 this card, so the penalty is broadly right.
- [ ] **Carry forward: prototype the market-floor blend** for MC < 3% horses at pre-race ≤ 6 (floor at 0.5× market-implied). Season record 12/16 at SP ≤ 6. At pre-race ≤ 6 this card it was 2/3 (R1 #14 ✅, R7 #14 ✅, R7 #8 ❌).
- [ ] **Re-fetch odds within 30 minutes of the off, and flag bankers moving ≥ 1.5×.** This card's 10:22–10:35 snapshot missed R5 #4 (9.8→5.3, 10th), R9 #8 (4.9→7.6, 7th), R4 #12 (22→9.8, won) and R8 #8 (12→4.8, won).
- [ ] **Refresh the official going on race morning.** Every Turf race was modelled on "Good", but the official going was Good to Firm.

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | — | — | — | — | — | — |
| MEDIUM-HIGH | R1, R3, R7, R8, R11 | 2/5 | $410 | $1,264 | **+$854** | **+208.3%** |
| MEDIUM | R4, R6, R9 | 0/3 | $310 | $0 | −$310 | −100.0% |
| MEDIUM-LOW / LOW–MEDIUM | R2, R5, R10 | 0/3 | $410 | $0 | −$410 | −100.0% |
| **TOTAL** | **11** | **2/11** | **$1,130** | **$1,264** | **+$134** | **+11.9%** |

**Both hits came from MEDIUM-HIGH**, the top tier on this card (no report used HIGH). By classification, Dominant went **2/8, $720 → $1,264, +$544**, and Competitive went **0/3, −$410**. Three-card Dominant: **6/18, +$959**. Three-card non-Dominant: **2/15, −$1,295**. The Dominant/Competitive split now holds across three cards.

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
| **8** | **2026-10-04** | **ST** | **11** | **2** | **$1,130** | **$1,264** | **+$134** | **+11.9%** |
| **TOTAL** | | | **77** | **13** | **$7,000** | **$4,916** | **−$2,084** | **−29.8%** |

> The 06-Sep figures carried forward use the §10e convention (9 races / 2 hits / $870). Meeting 5 was a post-meeting blind run (no SCMP) and is included for tracking.

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
| **2026-10-04 ST** | **6/11** | **54.5%** |
| **Combined** | **37/77** | **48.1%** |

### 10c. Venue Breakdown

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
|-------|----------|-------|------|--------|----------|-----|-----|--------------|
| **Sha Tin** | **5** | **52** | **11** | **$4,610** | **$3,801** | **−$809** | **−17.5%** | **22/52 (42.3%)** |
| Happy Valley | 3 | 25 | 2 | $2,390 | $1,115 | −$1,275 | −53.3% | 15/25 (60.0%) |

Sha Tin has 11 of the season's 13 hits and is now within $809 of break-even. Happy Valley has the better banker rate but much the worse ROI.

### 10d. Season Trajectory

| Metric | 09-06 | 09-09 | 09-13 | 09-16 | 09-23 | 09-27 | 10-01 | **10-04** | Trend |
|--------|-------|-------|-------|-------|-------|-------|-------|-----------|-------|
| Hit rate (meeting) | 22.2% | 0.0% | 10.0% | 0.0% | 22.2% | 18.2% | 36.4% | **18.2%** | ↓ |
| Hit rate (cumulative) | 22.2% | 11.8% | 11.1% | 8.6% | 11.4% | 12.7% | 16.7% | **16.9%** | → |
| Cumulative P&L | −$79 | −$719 | −$1,113 | −$1,963 | −$1,748 | −$2,315 | −$2,218 | **−$2,084** | ↑ |
| Cumulative ROI | −9.1% | −47.6% | −46.8% | −60.8% | −42.3% | −45.6% | −37.8% | **−29.8%** | ↑ |
| Banker top 3 (meeting) | 33.3% | 50.0% | 30.0% | 75.0% | 55.6% | 45.5% | 45.5% | **54.5%** | ↑ |
| Banker top 3 (cumulative) | 33.3% | 41.2% | 37.0% | 45.7% | 47.7% | 47.3% | 47.0% | **48.1%** | → |

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
| **8** | **2026-10-04** | **ST** | **2/11** | **+$134** | **+11.9%** | **2/11** | **+$164** | **+14.9%** | **B (stake only, $30)** |
| **TOTAL** | | | **13/77** | **−$2,084** | **−29.8%** | **12/77** | **−$3,042** | **−39.5%** | **A** |

*B = review-spec Strategy B (MC top 6, 1膽+5腳, $100 flat). B-trio (the reports' own Strategy B) this meeting: **3/11 (R2, R3, R7), $1,470 staked, $607 returned, −$863, −58.7%**. Season B-trio: **17/77, $9,840 staked, $4,168 returned, −$5,672, −57.6%**.*

| Cumulative Metric | Strategy A | Strategy B | Delta (B − A) |
|-------------------|-----------|-----------|---------------|
| Total meetings | 8 | 8 | — |
| Total races | 77 | 77 | 0 |
| Hits (rate) | 13/77 (16.9%) | 12/77 (15.6%) | −1 |
| Total staked | $7,000 | $7,700 | +$700 |
| Total returned | $4,916 | $4,658 | −$258 |
| **Cumulative P&L** | **−$2,084** | **−$3,042** | **−$958** |
| **Cumulative ROI** | **−29.8%** | **−39.5%** | **−9.7 pp** |
| Banker top 3 rate | 37/77 (48.1%) | 38/77 (49.4%) | +1 |

Two profitable cards in a row lift cumulative ROI from −37.8% to **−29.8%**, the best point of the season. R11 alone moved the season by $1,088. **A and B hit the same races and used the same bankers on this card.** B won by $30 only because A's must-include rule pushed R8–R10 to $150–$210 tickets. Over eight meetings A leads by **$958**: $700 from stake sizing and $258 from the one race (01-Oct R6) where A's selection differed and hit. The cumulative data still favours A, but only through its stake sizing and one race on selection. The A/B gap now depends on whether the pool-extension rules are tightened.

## Section 11: A/B Strategy Comparison

### 11a. How Strategy B was derived

For each race, the **MC SIMULATION (raw)** table in `trio_strategy_20261004_ST_RN.md` was sorted by MC Win%. The first 6 horses form the pool and MC #1 is the banker: 1膽+5腳, 10 combos, $100, every race. A hit needs the banker in the top 3 and all 3 placers in the 6-horse pool. There were no ties at the 6th slot. R9's withdrawn #3 was not in the MC table. **This is not the same as the "STRATEGY B (MC-only)" block in each report.** That block uses Place% > 20% legs and a Win-odds < 10 swap/add rule, giving 4–8 legs and $30–$280 stakes. It is tracked here as B-trio.

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | Strat A Banker | Strat B Pool (MC top 6) | Strat B Banker (MC #1) | Result (1→2→3) | A Hit? | B Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|--------------|----------------|-------------------------|------------------------|----------------|--------|--------|--------|----------|----------|---------|---------|----------------|
| R1 | 2,12,4,1,7 | #2 | 2,12,4,1,7,13 | #2 | 1→14→12 | ❌ | ❌ | $182 | $0 | $0 | $60 | $100 | A Mode A 5-horse pool (−$40); B adds MC #6 #13 (7th) |
| R2 | 13,3,7,5,9,1 | #13 | 13,3,7,9,5,14 | #13 | 13→2→3 | ❌ | ❌ | $108 | $0 | $0 | $100 | $100 | A #1 (`+excuses`), B #14; neither placed. Both miss #2 |
| R3 | 2,6 / 7,5,8,3 | #2 + #6 | 2,6,7,5,8,3 | #2 | 6→2→7 | ✅ | ✅ | $116 | $116 | $116 | $40 | $100 | Same 6; A 雙膽拖 4 combos (+$76) vs B (+$16) |
| R4 | 4,13,8,9,6 | #4 | 4,13,8,9,14,6 | #4 | 12→14→8 | ❌ | ❌ | $1,873 | $0 | $0 | $60 | $100 | B had #14 (2nd); banker 12th so both miss. A −$40 |
| R5 | 4,2,8,10,1,6 | #4 | 4,2,10,8,1,6 | #4 | 5→8→2 | ❌ | ❌ | $2,470 | $0 | $0 | $100 | $100 | Same pool & banker |
| R6 | 2,11,6,3,8,1 | #2 | 2,6,11,3,8,1 | #2 | 6→2→9 | ❌ | ❌ | $146 | $0 | $0 | $100 | $100 | Same pool & banker |
| R7 | 3,7,13,2,10,9 | #3 | 3,7,13,2,10,9 | #3 | 3→14→9 | ❌ | ❌ | $383 | $0 | $0 | $100 | $100 | Same pool & banker |
| R8 | 5,10,1,9,8,4,2 | #5 | 5,10,1,9,4,8 | #5 | 8→10→11 | ❌ | ❌ | $5,528 | $0 | $0 | $150 | $100 | A +#2 (Rule 8), 15 combos (+$50) |
| R9 | 8,12,7,2,4,1,9 | #8 | 8,12,7,4,2,9 | #8 | 10→5→1 | ❌ | ❌ | $2,441 | $0 | $0 | $150 | $100 | A +#1 (`+trial`, ran 3rd), +$50; banker 7th |
| R10 | 1,2,9,4,8,13,3,10 | #1 | 1,2,8,4,9,10 | #1 | 1→7→14 | ❌ | ❌ | $6,135 | $0 | $0 | $210 | $100 | A +#13, #3 (must-include), 21 combos (+$110) |
| R11 | 2,4,1,5,3 | #2 | 2,1,4,5,3,10 | #2 | 5→2→3 | ✅ | ✅ | $1,148 | $1,148 | $1,148 | $60 | $100 | Both hit; A 6 combos (+$1,088) vs B (+$1,048) |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | 11 | 11 | 0 |
| Hits | 2/11 (18.2%) | 2/11 (18.2%) | 0 |
| Total staked | $1,130 | $1,100 | −$30 |
| Total returned | $1,264 | $1,264 | $0 |
| **Net P&L** | **+$134** | **+$164** | **+$30** |
| **ROI** | +11.9% | +14.9% | +3.0 pp |
| Banker top 3 rate | 6/11 (54.5%) | 6/11 (54.5%) | 0 |

*B-trio (report's own B, for reference): 3/11 (R2 $108, R3 $116, R7 $383), $1,470 staked, $607 returned, −$863, −58.7%, banker 6/11. Its Win-odds < 10 rule added the gap horse in R2 (#2) and R7 (#14). Its 1-for-1 swap removed R11's #3 (3rd) for #10 (5th), which cost the $1,148 Trio. It also removed R8's winner #8.*

### 11d. Where A and B Diverged

| Race | What Differed | A Result | B Result | Impact | Root cause |
|------|---------------|----------|----------|--------|------------|
| R3 | Structure: A 雙膽拖 4 combos | HIT ✅ | HIT ✅ | A +$60 | 2nd-banker rule (#6 Adj Place 68.4% ≥ 63%) |
| R11 | Pool: A 5 horses (6 combos) | HIT ✅ | HIT ✅ | A +$40 | Mode A tight pool |
| R1, R4 | Pool: A 5 horses; B also had #13 / #14 | MISS ❌ | MISS ❌ | A +$80 | Mode A tight pool (R4 B's #14 ran 2nd, but banker 12th) |
| R2 | Pool: A #1, B #14 | MISS ❌ | MISS ❌ | Same | SCMP `+excuses` on #1 |
| R8, R9 | Pool: A 7 horses (+#2 / +#1) | MISS ❌ | MISS ❌ | B +$100 | Rule 8 / must-include extension |
| R10 | Pool: A 8 horses (+#13, #3) | MISS ❌ | MISS ❌ | B +$110 | Must-include (Adj Place ≥ 25%) extension |

Net: **B +$30 vs A**. A's tight tickets saved $180 (R1, R3, R4, R11), and its extensions cost $210 (R8–R10).

### 11e. Session Verdict

**B won by $30 (+$164 vs +$134), and the gap is entirely stake sizing.** Both strategies picked the same banker in all 11 races and hit the same two. A's pools differed from B's in six races, and none of those differences changed a result. The difference has two sides. A's tight Dominant tickets (R1, R3, R4, R11) saved $180, and the R3 雙膽拖 earned an extra $60 on a hit. A's must-include extensions in R8–R10 added $210 of stake in races where the placers were MC #8–#12. That is a **systematic** cost of the extension rules, not variance: it will recur whenever the frame comes from deep in the MC ranking. The A-only rules that mattered were the 2nd-banker rule (+$60, R3) and the `-injury30d` penalty on R7 #14. That penalty did not separate A from B (raw MC also had #14 at 0.8%), but it is the one SCMP adjustment that clearly pointed the wrong way. Neither A nor B could have caught the `+trial` gap horses in R2, R6 and R7. That is the main structural finding of the card.
