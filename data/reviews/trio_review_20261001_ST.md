# Trio Post-Race Review — Sha Tin | 2026-10-01

**Meeting 7 of the 2026/27 season.** 11-race National Day (Wednesday) card, all Turf on **Good to Firm**. No scratchings. R3 was the Group 3 National Day Cup (1000m, 8 runners). Results: `data/historical/results_20261001_ST.json`. Bet records: `data/reports/trio_strategy_20261001_ST_R1–R11.md`.

> **Data notes for this meeting**
> - **Results scraped first time** (`tools/scrape-meeting.ts`, DT/TT enrichment ✓). Trio (per $10): R1 $1,252 · R2 $801 · R3 $109 · R4 $593 · R5 $107 · R6 $258 · R7 $3,358 · R8 $1,115 · R9 $407 · R10 $413 · R11 $6,019. All Quinella dividends are ≥ $46.5, so the comma truncation seen on 23-Sep and 27-Sep did not recur. Trio/Tierce ratios look normal. **The momentum API was not cross-checked this time.**
> - **Pre-race odds** are the HKJC pool snapshot at 09:55 HKT (01:55Z). "SP" = final win odds from the results file. Big moves: R2 #11 21→37 (MC #1), R4 #6 18→8.5, R11 #13 14→81, R1 #5 3.5→2.1 (banker, ran 14th).
> - **Scoring.** **Strategy A** is scored exactly as written in each report. **Strategy B** = the **review-skill definition**: MC top 6 by raw Win%, MC #1 banker, 1膽+5腳, $100/race. The reports' own MC-only ticket (Place% > 20% legs + Win-odds < 10 swap/add) is shown as **B-trio**. There were no ties at the 6th MC slot.
> - **Banker counting.** "Banker top 3" counts a race only if **every** banker placed, the same rule as prior reviews. The 雙膽拖 races R2, R4 and R7 each had at least one banker fail. Primary banker alone (Adj Win% #1): **6/11**.

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played | **11 (R1–R11)** |
| Hit rate | **4/11 (36.4%)** |
| Total staked | $790 |
| Total returned | $887 |
| **Net P&L** | **+$97** |
| **ROI** | **+12.3%** |
| Session Result | **WIN** |

This is the best meeting of the season on hit rate (4/11), and the second profitable one. **Every hit was a low-to-mid Trio** (R3 $109, R5 $107, R6 $258, R10 $413). In all four hits, the banker was in the SP top 3 and won or ran 2nd. Two big Trios ($3,358 in R7, $6,019 in R11) and two mid ones (R1 $1,252, R8 $1,115) all had a placer rated ≤ 1.3% MC win. **Strategy B (MC top 6) hit 3/11 and lost −$471.** A beat B by **$568**: R6 was a hit for A only (an SCMP `+excuses` leg), and A's tight Dominant tickets used less stake.

## Section 2: Race-by-Race Cross-Reference

Result column: **bold** = top-3 finisher NOT in the Strategy A pool.

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
| R1 | C5 1200m | B (1膽+5腳) | #5 | 6, 1, 4, 12, 14 | **7**→**2**→1 | MISS ❌ | $1,252 | $0 | −$100 | Banker fail (#5 steamed 3.5→2.1, ran **14th**) + 2 gaps (#7 at 12, MC 1.3%; #2 at 10, MC 0.5%) |
| R2 | C5 1600m | B (2膽+4腳) | #11, #6 | 1, 10, 9, 13 | 9→10→**7** | MISS ❌ | $801 | $0 | −$40 | Both bankers fail (#11 8th, drifted 21→37; #6 13th) + gap #7 (MC #7, 12) |
| R3 | G3 1000m | A (2膽+3腳) | #4, #6 | 2, 1, 7 | 4→7→6 | **HIT ✅** | $109 | $109 | **+$79** | — |
| R4 | C4 1400m | A (2膽+3腳) | #7, #5 | 10, 12, 8 | 7→**6**→**3** | MISS ❌ | $593 | $0 | −$30 | #7 won; co-banker #5 6th (13→27) + 2 gaps (#6 18→8.5; #3 at 31) |
| R5 | C4 1000m | B (1膽+5腳) | #1 | 3, 4, 6, 11, 7 | 3→1→6 | **HIT ✅** | $107 | $107 | **+$7** | — |
| R6 | C4 1800m | B (1膽+5腳) | #1 | 3, 6, 4, 7, 8 | 3→1→8 | **HIT ✅** | $258 | $258 | **+$158** | — |
| R7 | C4 1200m | A (2膽+3腳) | #2, #6 | 14, 4, 1 | **7**→**10**→**11** | MISS ❌ | $3,358 | $0 | −$30 | Both bankers fail (#2 4th, #6 10th) + 3 gaps (MC 0.7% / 0.5% / 0.5%; #10 at 3.4) |
| R8 | C4 1200m | B (1膽+5腳) | #1 | 5, 3, 2, 4, 6 | **9**→4→**11** | MISS ❌ | $1,115 | $0 | −$100 | Banker fail (#1 13th) + 2 gaps (#9 at 50, MC last; #11 at 4.1, MC 0.3%) |
| R9 | C2 1400m | B (1膽+5腳) | #3 | 2, 12, 9, 4, 1 | 1→2→**11** | MISS ❌ | $407 | $0 | −$100 | Banker fail (#3 6th) + gap #11 (MC #8, steamed 15→5) |
| R10 | C3 1400m | A (1膽+4腳) | #3 | 9, 7, 14, 1 | 3→1→7 | **HIT ✅** | $413 | $413 | **+$353** | — |
| R11 | C3 1200m | B (1膽+5腳) | #6 | 4, 8, 9, 10, 2 | 6→**11**→**13** | MISS ❌ | $6,019 | $0 | −$100 | Banker **won**, 2 gaps (#11 MC #7 at 7.3; #13 at 81, MC 0.5%) |

## Section 3: Hits Analysis

### R3 — 4→7→6 · Trio $109 (Group 3 National Day Cup)

| Horse | Role | Pre / SP | MC Win% | MC Rating (Place%) | Adj Place% | Result |
|-------|------|----------|---------|--------------------|------------|--------|
| #4 COLOURFUL KING | 膽 Banker 1 | 2.9 / 2.2 (fav) | 42.2% | 81.4% | 81.4% | **1st** |
| #6 BOTTOMUPTOGETHER | 膽 Banker 2 | 11 / 6.6 | 25.9% | 70.9% | 70.9% | **3rd** |
| #7 MAGIC CONTROL | 腳 | 6.1 / 4.8 | 3.4% | 22.4% | — | **2nd** |

**What made it work:** in an 8-runner Group race, the 2nd-banker rule (Adj Place ≥ 63%) put both MC #1 and MC #2 in every combo. Both placed. #6 was the MC's biggest "undervalued" call (185%), and it was backed 11→6.6. #7 was MC #6 of 8 but the 2nd favourite, and it was the last horse into the 5-horse pool. **Return $109 on $30 = +$79.** A B-style 10-combo ticket on the same race makes only +$9.

### R5 — 3→1→6 · Trio $107

| Horse | Role | Pre / SP | MC Win% | MC Rating (Place%) | Adj Place% | Result |
|-------|------|----------|---------|--------------------|------------|--------|
| #1 JEDI SPURS | 膽 Banker | 2.3 / 2.0 (fav) | 22.9% | 55.0% | 55.0% | **2nd** |
| #3 KA YING LIGHTNING | 腳 | 5.9 / 4.7 | 26.4% | 59.8% | 61.8% (+excuses) | **1st** |
| #6 HANDSOME HERO | 腳 | 14 / 9.5 | 13.3% | — | — | **3rd** |

**What made it work:** MC #1–#2 and MC #4 filled the frame. A banked #1 (MC #2, the favourite) because #3 had only **1 form record** (no-debutant-as-banker rule). Both horses placed, so the swap did not matter. #6 was MC "undervalued" (86%) and ran 3rd. **Return $107 on $100 = +$7.** The favourite-heavy result paid little.

### R6 — 3→1→8 · Trio $258

| Horse | Role | Pre / SP | MC Win% | MC Rating (Place%) | Adj Place% | Result |
|-------|------|----------|---------|--------------------|------------|--------|
| #1 VICTOR SUPREME | 膽 Banker | 4.7 / 3.9 | 28.6% | 62.7% | 62.7% | **2nd** |
| #3 SUPER GOLDENDRAGON | 腳 | 3.4 / 5.0 | 20.0% | — | +excuses | **1st** |
| #8 SUPREME MASTERMIND | 腳 | 6.8 / 10 | 4.3% | — | 6.3% Adj Win (+excuses) | **3rd** |

**What made it work:** **#8 was MC #7** (4.3%), outside the raw top 6. SCMP noted it "raced tight", and the `+excuses` +2 lifted it to Adj Win 6.3%, above #5 (MC #6, no flag). #5 finished 10th and #8 ran 3rd. **This was the only race where an SCMP adjustment turned a miss into a hit.** Strategy B (raw top 6, with #5) missed. **Return $258 on $100 = +$158.**

### R10 — 3→1→7 · Trio $413

| Horse | Role | Pre / SP | MC Win% | MC Rating (Place%) | Adj Place% | Result |
|-------|------|----------|---------|--------------------|------------|--------|
| #3 AEROVOLANIC | 膽 Banker | 6.0 / 5.6 | 39.9% | 76.4% | 76.4% | **1st** |
| #1 CHILL BUDDY | 腳 | 7.8 / 15 | 7.4% | — | — | **2nd** |
| #7 SUPERB SPIRIT | 腳 | 6.2 / 3.8 | 16.5% | — | — | **3rd** |

**What made it work:** this was a Dominant race in which **MC #1 was not the favourite** (#14 at 2.9 SP ran 4th). The MC's 143% "undervalued" call on #3 was right. #1 drifted 7.8→15 and still ran 2nd. The Mode A pool (5 horses, 6 combos) held the MC top 5 exactly. **Return $413 on $60 = +$353**, the best bet of the meeting.

## Section 4: Miss Classification

7 misses. **0 Pattern A, 1 Pattern B, 6 Pattern C.**

### Pattern A: Banker Fail — All 3 Placers Already in Legs (0/7)

None. In every race where a banker failed, at least one placer was also outside the pool.

### Pattern B: Banker Hit — Pool Gap (1/7)

| Race | Banker | Hit horses | Pool gap | Gap odds (pre / SP) | Gap MC rank | Missed Trio |
|------|--------|-----------|----------|---------------------|-------------|-------------|
| R11 | #6 ABSOLUTE HEART **won** | #6 | #11 MAJESTIC VALOUR (2nd), #13 THOUSAND SPIRIT (3rd) | 11 / 7.3; 14 / 81 | #7 (4.1%), #11 (0.5%) | $6,019 |

R11 was the meeting's biggest dividend. The banker won from gate 1, but the legs failed: L1 #4 ran 6th, L2 #8 (backed 9.6→3.9, SP favourite) 11th, and #9 / #10 / #2 ran 5th / 7th / 12th. #11 was backed 11→7.3 and was the next horse below the pool cut (MC #7, 4.1% win). #13, drifting 14→81, was unforecastable.

### Pattern C: Banker Fail + Pool Gap (6/7)

| Race | Banker(s) (pos) | Gap horse(s) | Gap MC Win% | Gap SP | Note |
|------|-----------------|--------------|-------------|--------|------|
| R1 | #5 (14th, SP fav 2.1) | #7 1st, #2 2nd | 1.3%, 0.5% | 12, 10 | Both gaps had SCMP `+excuses`; #2 was also in B-trio's Win-odds < 10 add |
| R2 | #11 (8th), #6 (13th) | #7 3rd | 1.5% | 12 | #9 and #10 (1st, 2nd) were legs. #11 was MC "526% undervalued" at 21 and drifted to 37 |
| R4 | #7 (1st ✅), #5 (6th) | #6 2nd, #3 3rd | 2.5%, 1.5% | 8.5, 31 | Co-banker #5 (2 starts, 13→27) failed. #6 steamed 18→8.5 |
| R7 | #2 (4th), #6 (10th) | #7, #10, #11 | 0.7%, 0.5%, 0.5% | 38, 3.4, 16 | **All 3 placers rated ≤ 0.7%**. #10 was the 2nd favourite at SP |
| R8 | #1 (13th) | #9 1st, #11 3rd | 0.2%, 0.3% | 50, 4.1 | #11 was a market-backed near-zero horse (5.6→4.1) |
| R9 | #3 (6th) | #11 3rd | 5.1% | 5.0 | #11 steamed 15→5. #1 and #2 (1st/2nd) were legs, so with banker #2 this race needed only #11 |

**Combined Pattern C missed Trio value: $7,526** (R1 $1,252 + R2 $801 + R4 $593 + R7 $3,358 + R8 $1,115 + R9 $407).

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R1 | 1膽 #5 + 5腳 | Add every pre-race < 10 horse (#2, #10) as legs (= B-trio) | ❌ (#7 still out, banker 14th) | +$110 |
| R2 | 2膽 #11/#6 + 4腳 | Box MC top 7 (C(7,3) = 35) | ✅ $801 | +$310 → +$451 net |
| R2 | 2膽 #11/#6 | 1膽 market fav #1 + MC top 6 | ❌ (#1 ran 4th) | +$60 |
| R4 | 2膽 #7/#5 + 3腳 | 1膽 #7 + MC #2–#9 (8 legs, C(8,2) = 28) | ✅ $593 | +$250 → +$313 net |
| R7 | 2膽 #2/#6 + 3腳 | Anything plausible | ❌ (placers MC #8, #10, #11) | — |
| R8 | 1膽 #1 + 5腳 | Bank market fav #4 (2nd) + add #11 (pre 5.6) | ❌ (#9 at 50 still out) | +$50 |
| R9 | 1膽 #3 + 5腳 | Bank market fav #2 (2nd) + MC top 8 as legs (7 legs, 21 combos) | ✅ $407 | +$110 → +$197 net |
| R9 | 1膽 #3 + 5腳 | Keep #3 banker, add #11 (pre 15) | ❌ (banker 6th) | +$50 |
| R11 | 1膽 #6 + 5腳 | Add MC #7 #11 (6 legs) | ❌ (#13 at 81 still out) | +$50 |

- **Fixable misses** (with structural change): **R2, R4, R9** — recoverable $1,801 for about +$670 extra stake. None of these follows from a rule we already have. R2 needs a 35-combo box, R4 an 8-leg pool reaching MC #9, R9 a market-favourite banker *and* a 7-leg pool. Each would have cost money on the other races where it fired.
- **Unfixable misses**: **R1, R7, R8, R11** — winners or placers at MC ≤ 1.3% (R1 #7, R7 all three, R8 #9 at 50, R11 #13 at 81).

## Section 6: Key Moments

- **Best Bet**: **R10 — +$353 on $60.** The Dominant call on #3 AEROVOLANIC (MC 39.9%) was right against a 2.9 favourite that ran 4th. The tight 6-combo ticket made a 6.9× return.
- **Worst Bet**: **R1 — −$100 on #5 GOOD FORTUNE.** It was MC #1, the market favourite, and steamed 3.5→2.1, then ran **14th of 14**. Every signal agreed, and it ran the worst race on the card. (We have no stewards' report to explain it. Check the incident report before reading anything into it.)
- **Most Frustrating**: **R11 — banker won, Trio $6,019.** #11 MAJESTIC VALOUR (MC #7, 4.1%) was one place outside the pool and ran 2nd at 7.3. Even with it in, #13 at 81 still blocks the hit, so this one hurts more than it costs.
- **Biggest Surprise**: **R7 — all three placers rated ≤ 0.7% MC win**, in a race the model classed as *Dominant / HIGH* (MC #1 35.9%, #2 30.1%). #7 CAVAMAZING won at 38. #10 KA YING RADIANCE (SCMP "severely checked") was 2nd at 3.4 SP on MC 0.5%.
- **Best MC Call**: **R10 #3 AEROVOLANIC.** The MC made it 39.9% (fair ~2.5) against a market 6.0 / 5.6 SP; it won. **R3 #6 BOTTOMUPTOGETHER** gets an honourable mention: MC 25.9% against 11 pre-race, and it ran 3rd as the 2nd banker.

## Section 7: Model Calibration

### 7a. Banker Performance

Primary banker (Adj Win% #1) per race:

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 4 | R3, R4, R10, R11 |
| Banker 2nd-3rd | 2 | R5, R6 |
| Banker out of top 3 | 5 | R1 (14th), R2 (8th), R7 (4th), R8 (13th), R9 (6th) |

**Primary banker strike rate (top 3): 6/11 = 54.5%** · **Banker win rate: 4/11 = 36.4%**
**All bankers placed (season convention): 5/11 = 45.5%.** R4 failed on co-banker #5.

**2nd banker (雙膽拖) rule: 1/4 this card.** R3 #6 3rd ✅; R2 #6 13th, R4 #5 6th and R7 #6 10th ❌. Last card it went 2/2. R4's #5 NOBLE PATCH had **only 2 starts**, which passes the debutant rule by a single run. The rule still cut stake: those four races cost $130 against $400 for 1膽+5腳.

**Primary banker market rank at SP:** rank 1–2: **5/6** (R3, R4, R5, R6, R11 ✅; R1 ❌) · rank 3+: **1/5** (R10 ✅; R2, R7, R8, R9 ❌).

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | 4/11 (R3, R5, R6, R10) |
| All 3 in pool OR banker + 2 legs | 4/11 |
| At least 2 placers in pool | 6/11 (+ R2, R9) |
| Banker hit + pool gap | 2/11 (R4 primary #7, R11) |

### 7c. MC-Market Divergence Outcomes

Each report lists the 3 biggest MC-vs-market gaps. "Correct" = an undervalued horse placed, or an overvalued horse did not.

| Race | Undervalued (MC > mkt) → finish | Overvalued (MC < mkt) → finish |
|------|-------------------------------|------------------------------|
| R1 | #4 136% → 4th ❌ · #14 102% → 9th ❌ | #2 97% → **2nd** ❌ |
| R2 | **#11 526% → 8th ❌** | #3 → 14th ✅ · #8 → 9th ✅ |
| R3 | #6 185% → **3rd** ✅ | #8 → 6th ✅ · #3 → 8th ✅ |
| R4 | **#5 269% → 6th ❌** | #14 → 4th ✅ · #1 → 8th ✅ |
| R5 | #6 86% → **3rd** ✅ | #10 → 10th ✅ · #9 → 14th ✅ |
| R6 | #4 191% → 4th ❌ · #5 155% → 10th ❌ | #12 → 8th ✅ |
| R7 | #2 112% → 4th ❌ | #10 98% → **2nd** ❌ · #12 → 12th ✅ |
| R8 | **#3 354% → 7th ❌** · #2 189% → 14th ❌ | #11 99% → **3rd** ❌ |
| R9 | #3 112% → 6th ❌ | #7 → 12th ✅ · #6 → 9th ✅ |
| R10 | #3 143% → **1st** ✅ · #9 143% → 8th ❌ | #11 → 13th ✅ |
| R11 | #9 111% → 5th ❌ · #2 98% → 12th ❌ | #7 → 4th ✅ |

**MC divergence accuracy: 17/33 (51.5%).** Undervalued **3/16 (18.8%)**, and **0/3 where the claimed edge was > 200%** (season: 0/8). Overvalued 14/17. That number is inflated because most horses don't place. **All 3 overvalued misses were horses at SP ≤ 10 that the MC rated ≤ 0.5%** (R1 #2, R7 #10, R8 #11).

### 7d. SCMP +Excuses Flag Performance

47 `+excuses` flags across 146 runners. Every horse with a flag is listed in each report's Strategy A table.

| Segment | Placed | Rate |
|---------|--------|------|
| All `+excuses` | 12/47 | **25.5%** (field base rate 33/146 = 22.6%) |
| `+excuses` AND pre-race odds ≤ 8 | **8/12** | **66.7%** |
| `+excuses` AND pre-race odds > 8 | 4/35 | 11.4% |

The flag placers at ≤ 8 were R1 #1 ✅, R1 #2 ✅, R4 #7 ✅, R5 #3 ✅, R6 #3 ✅, R6 #8 ✅, R7 #10 ✅ and R8 #4 ✅. The ≤ 8 non-placers were R2 #8 (7.6, 9th), R3 #1 (5.6, 4th), R4 #14 (6.4, 4th) and R8 #5 (6.0, 9th). Two of those four ran 4th. **Two of the eight (R1 #2 and R7 #10) were outside A's pool**, because their MC base (0.5%) was too low for +2 to matter. Neither would have turned its race into a hit, because the banker failed in both. **+Excuses hit rate (top 3): 12/47 (25.5%), but 8/12 when the horse is also ≤ 8 in the market.**

### 7e. Divergence Override Assessment

**No discretionary override was applied.** All tickets are rule output. The rules that changed tickets:

| Rule | Race | Effect | Result |
|------|------|--------|--------|
| No debutant banker (< 2 starts) | R5 | Banker #3 (1 form record) → #1 JEDI SPURS | Both placed (1st, 2nd); hit either way |
| 2nd banker (Adj Place ≥ 63%) → 雙膽拖 | R2, R3, R4, R7 | 4 / 3 / 3 / 3 combos | **1/4** 2nd bankers placed; R3 hit (+$79). Saved $270 of stake on the three misses |
| SCMP `+excuses` promotion | R6 | #8 (MC #7) in, #5 (MC #6) out | **#8 ran 3rd → HIT $258** (B missed) |
| Mode A tight pool (Dominant) | R3, R4, R7, R10 | 3–6 combos | 2/4 hit, +$372 on $150 |

**Lesson:** the SCMP layer finally changed a result. It was worth **+$258** this card. The 2nd-banker rule was saved by its low stake, but its placement record dropped to **3/6** over two cards. Co-bankers with few starts (R4 #5, 2 starts) or MC/market splits (R2 #6 at 4.7 against MC #1 #11 at 21) look weak.

## Section 8: Learnings

### What Worked

- **Dominant/HIGH races: 2/4, +$372 on $150 (+248%).** Tight Mode A tickets (3–6 combos) made R10 +$353 and R3 +$79. Across two cards, HIGH is now **4/10, +$415**.
- **Bankers at market rank 1–2 (SP) placed 5/6**, and three of the four hits had that profile (R10 was rank 3). Last card's rank 1–2 failures (3/7) did not repeat.
- **SCMP `+excuses` delivered a hit** (R6 #8 promoted over #5 → $258). At pre-race odds ≤ 8 the flag placed **8/12**.
- **MC's best value calls were right when the market partly agreed**: R10 #3 (6.0 → won) and R3 #6 (11 → 6.6, 3rd).

### What Didn't Work

- **"Undervalued > 200%" bankers failed again**: R2 #11 (526%, 21→37, 8th), R4 co-banker #5 (269%, 13→27, 6th), R8 #3 (354%, 7th). That is **0/3 here and 0/8 across the season**.
- **The market-backed near-zero blind spot is still open.** MC Win% < 3% with SP ≤ 6 placed **2/2** (R7 #10, R8 #11), making **9/11 over three meetings**. Neither the 09:55 snapshot nor the MC caught them.
- **R7 "Dominant" was a false read.** The MC had #2 and #6 at 66% combined, and both missed while three ≤ 0.7% horses filled the frame. With 2 bankers, that was a $30 loss on a $3,358 Trio.
- **The 2nd-banker rule went 1/4.** In each failure the 2nd banker had a weak profile: few starts (R4 #5), or the 2nd banker was the market horse while MC #1 was not (R2).
- **The MEDIUM/Competitive card made −$275 on 7 races.** Its two hits paid only $107 and $258.

### Strategy Adjustments

- [ ] **Demote "undervalued > 200%" horses from banker eligibility.** If MC Win% > 3× market-implied, keep the horse as a leg only, and bank MC #2 (or the market favourite if it is in the MC top 3). Evidence: 0/8 season. R2 would have banked #6 (13th) or #1 (4th), so no hit is gained this card, but the season backtest should show where it helps.
- [ ] **Prototype a "market-floor" blend for near-zero MC horses.** For runners at SP/pre ≤ 6, floor MC Win% at 0.5× market-implied before ranking. Evidence: 9/11 placed over three meetings. Backtest across all 2026/27 meetings with the pre-race snapshot odds, not SP.
- [ ] **Test "`+excuses` AND pre-race ≤ 8 → must-include leg".** It placed 8/12 this card. It would have added R1 #2 and R7 #10, both placed, but neither race changes to a hit. Check whether it holds on 13/16/23/27-Sep before adopting.
- [ ] **Tighten the 2nd-banker rule**: require ≥ 4 starts **and** pre-race odds ≤ 8 for the 2nd banker. That would have blocked R4 #5 (2 starts, 13) and kept R3 #6 (10 starts, 11). R3 needs a check, since at 11 the odds part would block it too. Try an odds cap of ≤ 12, or apply only the starts requirement.
- [ ] **Keep Mode A tight pools for Dominant races.** HIGH is +$415 over two cards, against −$885 for MEDIUM.
- [ ] **Re-fetch odds near the off.** This card's late steamers that placed: R4 #6 (18→8.5), R9 #11 (15→5), R11 #11 (11→7.3), R3 #6 (11→6.6). Plain banker-drift checks wouldn't have helped this card (R2 #11 drifted and failed, but R1 #5 *steamed* and failed).

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | R3, R4, R7, R10 | 2/4 | $150 | $522 | **+$372** | **+248.0%** |
| MEDIUM-HIGH | — | — | — | — | — | — |
| MEDIUM | R1, R2, R5, R6, R8, R9, R11 | 2/7 | $640 | $365 | −$275 | −43.0% |
| **TOTAL** | **11** | **4/11** | **$790** | **$887** | **+$97** | **+12.3%** |

**HIGH (= Dominant classification) made the profit again**, for the second card running. Two-card HIGH: 4/10, $490 → $905, **+$415 (+84.7%)**. Two-card MEDIUM: 2/12, $1,250 → $365, **−$885**. The split is holding up, but with only 10 HIGH races it could still be variance.

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
| **7** | **2026-10-01** | **ST** | **11** | **4** | **$790** | **$887** | **+$97** | **+12.3%** |
| **TOTAL** | | | **66** | **11** | **$5,870** | **$3,652** | **−$2,218** | **−37.8%** |

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
| **2026-10-01 ST** | **5/11** | **45.5%** (primary banker 6/11) |
| **Combined** | **31/66** | **47.0%** |

### 10c. Venue Breakdown

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
|-------|----------|-------|------|--------|----------|-----|-----|--------------|
| **Sha Tin** | **4** | **41** | **9** | **$3,480** | **$2,537** | **−$943** | **−27.1%** | **16/41 (39.0%)** |
| Happy Valley | 3 | 25 | 2 | $2,390 | $1,115 | −$1,275 | −53.3% | 15/25 (60.0%) |

Sha Tin now has 9 of the season's 11 hits and the clearly better ROI, despite the worse banker rate. ST pools reach further down the MC ranking, so a placed banker converts more often.

### 10d. Season Trajectory

| Metric | 09-06 | 09-09 | 09-13 | 09-16 | 09-23 | 09-27 | **10-01** | Trend |
|--------|-------|-------|-------|-------|-------|-------|-----------|-------|
| Hit rate (meeting) | 22.2% | 0.0% | 10.0% | 0.0% | 22.2% | 18.2% | **36.4%** | ↑ |
| Hit rate (cumulative) | 22.2% | 11.8% | 11.1% | 8.6% | 11.4% | 12.7% | **16.7%** | ↑ |
| Cumulative P&L | −$79 | −$719 | −$1,113 | −$1,963 | −$1,748 | −$2,315 | **−$2,218** | ↑ |
| Cumulative ROI | −9.1% | −47.6% | −46.8% | −60.8% | −42.3% | −45.6% | **−37.8%** | ↑ |
| Banker top 3 (meeting) | 33.3% | 50.0% | 30.0% | 75.0% | 55.6% | 45.5% | **45.5%** | → |
| Banker top 3 (cumulative) | 33.3% | 41.2% | 37.0% | 45.7% | 47.7% | 47.3% | **47.0%** | → |

### 10e. Cumulative A/B Comparison

| Meeting | Date | Venue | A Hits | A P&L | A ROI | B Hits | B P&L | B ROI | Winner |
|---------|------|-------|--------|-------|-------|--------|-------|-------|--------|
| 1 | 2026-09-06 | ST | 2/9 | −$79 | −9.1% | 2/9 | −$109 | −12.1% | A |
| 2 | 2026-09-09 | HV | 0/8 | −$640 | −100.0% | 0/8 | −$800 | −100.0% | Tie |
| 3 | 2026-09-13 | ST | 1/10 | −$394 | −45.3% | 1/10 | −$524 | −52.4% | A |
| 4 | 2026-09-16 | HV | 0/8 | −$850 | −100.0% | 0/8 | −$800 | −100.0% | B (stake only) |
| 5 | 2026-09-23 | HV | 2/9 | +$215 | +23.9% | 2/9 | +$215 | +23.9% | Tie (identical tickets) |
| 6 | 2026-09-27 | ST | 2/11 | −$567 | −59.7% | 2/11 | −$717 | −65.2% | A (stake only) |
| **7** | **2026-10-01** | **ST** | **4/11** | **+$97** | **+12.3%** | **3/11** | **−$471** | **−42.8%** | **A** (R6 hit + stake) |
| **TOTAL** | | | **11/66** | **−$2,218** | **−37.8%** | **10/66** | **−$3,206** | **−48.6%** | **A** |

*B = review-spec Strategy B (MC top 6, 1膽+5腳, $100 flat). B-trio (the reports' own Strategy B) this meeting: **4/11 (R3, R5, R6, R10), $1,410 staked, $887 returned, −$523, −37.1%**. Season B-trio: **14/66, $8,370 staked, $3,561 returned, −$4,809, −57.5%**.*

| Cumulative Metric | Strategy A | Strategy B | Delta (B − A) |
|-------------------|-----------|-----------|---------------|
| Total meetings | 7 | 7 | — |
| Total races | 66 | 66 | 0 |
| Hits (rate) | 11/66 (16.7%) | 10/66 (15.2%) | −1 |
| Total staked | $5,870 | $6,600 | +$730 |
| Total returned | $3,652 | $3,394 | −$258 |
| **Cumulative P&L** | **−$2,218** | **−$3,206** | **−$988** |
| **Cumulative ROI** | **−37.8%** | **−48.6%** | **−10.8 pp** |
| Banker top 3 rate | 31/66 (47.0%) | 32/66 (48.5%) | +1 |

Best card of the season: **+$97, 4 hits**, and cumulative ROI back up from −45.6% to −37.8%. **For the first time A and B hit different races.** R6 hit for A only, because the SCMP `+excuses` flag promoted MC #7 #8 into the pool, and #8 ran 3rd. A's lead is now **$988**: $730 from stake sizing and $258 from the R6 hit. The data now leans clearly toward A. A is never worse on selection, and it is better on sizing. The shared weakness is unchanged: market-backed horses the MC rates near zero (9/11 placed) and over-confident "undervalued" calls (0/8).

## Section 11: A/B Strategy Comparison

### 11a. How Strategy B was derived

For each race, the **MC SIMULATION (raw)** table in `trio_strategy_20261001_ST_RN.md` was sorted by MC Win%. The first 6 horses form the pool and MC #1 is the banker: 1膽+5腳, 10 combos, $100, every race. A hit needs the banker in the top 3 and all 3 placers in the 6-horse pool. There were no ties at the 6th slot.

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | Strat A Banker | Strat B Pool (MC top 6) | Strat B Banker (MC #1) | Result (1→2→3) | A Hit? | B Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|--------------|----------------|-------------------------|------------------------|----------------|--------|--------|--------|----------|----------|---------|---------|----------------|
| R1 | 5,6,1,4,12,14 | #5 | 5,6,1,4,12,14 | #5 | 7→2→1 | ❌ | ❌ | $1,252 | $0 | $0 | $100 | $100 | Same pool & banker |
| R2 | 11,6 / 1,10,9,13 | #11 + #6 | 11,6,1,10,9,13 | #11 | 9→10→7 | ❌ | ❌ | $801 | $0 | $0 | $40 | $100 | A 雙膽拖 4 combos (−$60) |
| R3 | 4,6 / 2,1,7 | #4 + #6 | 4,6,2,1,5,7 | #4 | 4→7→6 | ✅ | ✅ | $109 | $109 | $109 | $30 | $100 | Both hit; A 3 combos (+$79) vs B (+$9) |
| R4 | 7,5 / 10,12,8 | #7 + #5 | 7,5,10,12,8,13 | #7 | 7→6→3 | ❌ | ❌ | $593 | $0 | $0 | $30 | $100 | A 雙膽拖 3 combos (−$70) |
| R5 | 1,3,4,6,11,7 | #1 | 3,1,4,6,11,7 | #3 | 3→1→6 | ✅ | ✅ | $107 | $107 | $107 | $100 | $100 | Banker: A #1 (debutant rule), B #3. Both placed |
| R6 | 1,3,6,4,7,**8** | #1 | 1,3,6,4,7,**5** | #1 | 3→1→8 | **✅** | ❌ | $258 | $258 | $0 | $100 | $100 | **A had #8 (+excuses), B had #5** |
| R7 | 2,6 / 14,4,1 | #2 + #6 | 2,6,14,4,1,13 | #2 | 7→10→11 | ❌ | ❌ | $3,358 | $0 | $0 | $30 | $100 | A 雙膽拖 3 combos (−$70) |
| R8 | 1,5,3,2,4,6 | #1 | 1,3,5,2,4,8 | #1 | 9→4→11 | ❌ | ❌ | $1,115 | $0 | $0 | $100 | $100 | A #6 (+excuses), B #8; neither placed |
| R9 | 3,2,12,9,4,1 | #3 | 3,2,12,9,4,1 | #3 | 1→2→11 | ❌ | ❌ | $407 | $0 | $0 | $100 | $100 | Same pool & banker |
| R10 | 3,9,7,14,1 | #3 | 3,9,7,14,1,4 | #3 | 3→1→7 | ✅ | ✅ | $413 | $413 | $413 | $60 | $100 | Both hit; A Mode A 6 combos (+$353) vs B (+$313) |
| R11 | 6,4,8,9,10,2 | #6 | 6,4,8,9,10,2 | #6 | 6→11→13 | ❌ | ❌ | $6,019 | $0 | $0 | $100 | $100 | Same pool & banker |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | 11 | 11 | 0 |
| Hits | 4/11 (36.4%) | 3/11 (27.3%) | −1 |
| Total staked | $790 | $1,100 | +$310 |
| Total returned | $887 | $629 | −$258 |
| **Net P&L** | **+$97** | **−$471** | **−$568** |
| **ROI** | +12.3% | −42.8% | −55.1 pp |
| Banker top 3 rate | 5/11 (45.5%) | 6/11 (54.5%) | +1 |

*B-trio (report's own B, for reference): 4/11, $1,410 staked, $887 returned, −$523, −37.1%, banker 6/11. B-trio also hit R6, because its Win-odds < 10 rule added #8 (6.8).*

### 11d. Where A and B Diverged

| Race | What Differed | A Result | B Result | Impact | Root cause |
|------|---------------|----------|----------|--------|------------|
| R6 | Pool: A #8, B #5 | **HIT ✅** | MISS ❌ | **A +$258** | SCMP `+excuses` (+2) lifted MC #7 #8 above MC #6 #5 |
| R5 | Banker: A #1, B #3 | HIT ✅ | HIT ✅ | Same | No-debutant-banker rule (#3 had 1 form record) |
| R8 | Pool: A #6, B #8 | MISS ❌ | MISS ❌ | Same | SCMP `+excuses` on #6 |
| R2, R4, R7 | Structure: A 雙膽拖 (3–4 combos) | MISS ❌ | MISS ❌ | A +$200 | 2nd-banker rule (Adj Place ≥ 63%) |
| R3 | Structure: A 雙膽拖 3 combos | HIT ✅ | HIT ✅ | A +$70 | 2nd-banker rule |
| R10 | Pool: A 5 horses (6 combos) | HIT ✅ | HIT ✅ | A +$40 | Mode A tight pool |

Net: **A +$568 vs B**: $258 from the R6 hit and $310 from stake size.

### 11e. Session Verdict

**A won by $568 (+$97 vs −$471).** For the first time this season, part of the edge came from **selection** and not only from sizing. In R6 the SCMP `+excuses` flag ("raced tight") promoted #8 SUPREME MASTERMIND from MC #7 into the pool, and it ran 3rd for a $258 Trio that B missed. The remaining $310 is systematic sizing: Mode A and the 2nd-banker rule put $30 tickets on R2, R3, R4 and R7. One R6 race is a small sample, so the selection edge could still be variance. But the excuses flag at short odds placed 8/12 this card, which suggests a real signal underneath. The only A-only rule that could have cost money, the no-debutant banker swap in R5, was neutral because both horses placed. B-trio matched A's hits but staked $620 more, because its Win-odds < 10 adds made 15–21 combo tickets in R8, R10 and R11.
