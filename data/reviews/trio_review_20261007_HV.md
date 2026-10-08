# Trio Post-Race Review — Happy Valley | 2026-10-07

**Meeting 9 of the 2026/27 season.** A 9-race Wednesday night card, all on Turf (**Good to Firm**). R3 and R7 were run on the "C+3" course. **#6 PRESTIGE ALWAYS was withdrawn at the barriers in R9** (lame left fore), so 11 ran. There were no other scratchings. Results: `data/historical/results_20261007_HV.json`. Bet records: `data/reports/trio_strategy_20261007_HV_R1–R9.md`.

> **Data notes for this meeting**
> - **Results scraped first time** (`tools/scrape-meeting.ts`, DT ✓, TT —). **The local momentum DB has no 07-Oct data** (`horse-racing-training/data/momentum.sqlite` was last written 04-Oct and the server was not running), so there is no "Snap" column this card. Dividends were cross-checked against the HKJC results page for R5, R8 and R9 instead. All three match on finishing order, Win, Place, Tierce, Trio and First 4. Trio (per $10): R1 $797 · R2 $2,641 · R3 $354 · R4 $142 · R5 $5,817 · R6 $708 · R7 $960 · R8 $10,361 · R9 $88. Trio/Tierce ratios (2.4–7.1) look normal.
> - **The comma-truncation bug hit three non-Trio dividends.** R8 Quinella was scraped as $2 (official **$2,910**), R8 QP 3-8 as $1 (official **$1,265.5**) and R5 QP 2-10 as $1 (official **$1,107.5**). All three were corrected in the results JSON. No Trio dividend was affected.
> - **R9 withdrawal = refund.** #6 was a leg in A, B and B-trio. Trio combinations that include a withdrawn horse are refunded. A's R9 ticket was 6 combos ($60), and the 3 combos with #6 were refunded, so **A's net R9 stake is $30**. B's R9 ticket loses 4 of 10 combos, so **B's net stake is $60**. All stakes below are **net of refunds**.
> - **Pre-race odds** are the HKJC pool snapshot captured **11:01–11:19 HKT**, 7–11 hours before the off. "SP" = final win odds from the results file. Big moves: R2 banker #4 **11→5.4** (ran 7th), R8 banker #2 **6.9→3.0** (4th), R4 #8 9.8→3.6 (won), R8 #9 17→10 (won), R9 #7 4.7→2.0 (won), R6 #4 9.3→16 (2nd).
> - **SCMP place odds were mis-parsed and the Q/QP matrix was missing** in every race. No report used the Q/QP cross-reference. Star Form, TIR, vet and trackwork were scored.
> - **Scoring.** **Strategy A** is scored exactly as written in each report. **Strategy B** follows the **review-skill definition**: MC top 6 by raw Win%, MC #1 banker, 1膽+5腳, $100/race. The reports' own "Strategy B" (Place% > 20% legs + Win-odds < 10 swap/add) is shown separately as **B-trio**. R5 had a tie at MC #5/#6 (#1 and #7, both 5.9%). Both are inside the top 6, so it does not matter.
> - **Banker counting.** "Banker top 3" counts a race only if **every** banker placed. R8 was the only 雙膽拖 (#2 + #1), and neither placed. **A's banker differed from MC #1 only in R1** (#9 over #1, through SCMP `+trial`/`+excuses`).

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played | **9 (R1–R9)** |
| Hit rate | **2/9 (22.2%)** |
| Total staked | $790 (net of the $30 R9 refund) |
| Total returned | $230 |
| **Net P&L** | **−$560** |
| **ROI** | **−70.9%** |
| Session Result | **LOSS** |

**The two hits were the two cheapest Trios on the card**: R4 $142 and R9 $88. Banker top 3 was 5/9, but three of those five banker hits (R1, R3, R7) were spoiled by a single horse outside the pool. **Strategy B (MC top 6) hit 3/9 and lost only −$276.** It won the session by $284 because its sixth horse in R3, #3 CLASS (MC #6), ran 3rd. A's Mode A 5-horse pool had cut #3 out. Both short-priced HV favourites that MC also backed as banker (R5 #4 at 2.5, R6 #9 at 2.1) failed to place.

## Section 2: Race-by-Race Cross-Reference

Result column: **bold** = top-3 finisher NOT in the Strategy A pool.

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
| R1 | C5 1800m | B+ (1膽+6腳) | #9 | 1, 10, 5, 6, 11, 3 | 9→**4**→**8** | MISS ❌ | $797 | $0 | −$150 | Banker **won**, 2 gaps (#4 2nd fav 4.9, MC #10 1.7%; #8 MC #8, 11) |
| R2 | C4 1200m | B+ (1膽+6腳) | #4 | 2, 10, 5, 6, 12, 8 | **7**→5→**9** | MISS ❌ | $2,641 | $0 | −$150 | Banker fail (#4 steamed 11→5.4, 7th) + 2 gaps (#7 MC #8; #9 MC #11) |
| R3 | C4 1650m "C+3" | A (1膽+4腳) | #4 | 6, 1, 8, 2 | 4→6→**3** | MISS ❌ | $354 | $0 | −$60 | Banker **won**, gap #3 (MC #6, Adj Place 23.9%, cut by the Mode A 5-horse limit) |
| R4 | C4 1650m | B (1膽+5腳) | #2 | 8, 10, 3, 11, 4 | 8→2→10 | **HIT ✅** | $142 | $142 | **+$42** | — |
| R5 | C4 1000m | A+ (1膽+5腳) | #4 | 6, 1, 12, 7, 9 | **8**→**10**→**2** | MISS ❌ | $5,817 | $0 | −$100 | Banker fail (#4, 2.5 fav, 5th) + 3 gaps (#8 2nd fav, MC #4, 0.2pp short of the pool) |
| R6 | C4 1200m | B (1膽+5腳) | #9 | 4, 2, 10, 3, 7 | 10→4→**5** | MISS ❌ | $708 | $0 | −$100 | Banker fail (#9, 2.1 fav, **12th of 12**) + gap #5 (MC #11, 3rd fav 7.4) |
| R7 | C3 1200m "C+3" | A (1膽+4腳) | #9 | 2, 12, 5, 6 | 9→5→**10** | MISS ❌ | $960 | $0 | −$60 | Banker **won**, gap #10 (MC #11, 0.4%, 11) |
| R8 | C3 1650m | B 雙膽拖 (2膽+4腳) | #2, #1 | 10, 12, 5, 9 | 9→**8**→**3** | MISS ❌ | $10,361 | $0 | −$40 | Both bankers fail (#2 4th, #1 9th) + 2 gaps (#8 at 66; #3 MC #12) |
| R9 | C3 1200m | A (1膽+4腳) | #1 | ~~6~~, 2, 9, 7 | 7→9→1 | **HIT ✅** | $88 | $88 | **+$58** | — (stake $30 net; #6 withdrawn) |

"+" in Mode = pool extended beyond the mode's nominal size: R1 (#3) and R2 (#8) by Rule 8 (Adj Place ≥ 20%), and R5 (#9) by Rule 9.

## Section 3: Hits Analysis

### R4 — 8→2→10 · Trio $142 (Class 4, 1650m)

| Horse | Role | Pre / SP | MC Win% | MC Rating (Place%) | Adj Place% | Result |
|-------|------|----------|---------|--------------------|------------|--------|
| #2 SKY DEEP | 膽 Banker | 4.7 (fav) / 6.3 | 31.7% | 64.9% | 66.9% (`+excuses`) | **2nd** |
| #8 ABSOLUTE HONOUR | 腳 | 9.8 / **3.6** | 16.7% | 46.8% | 47.8% (`+form`) | **1st** |
| #10 PRECISION HOPE | 腳 | 4.9 / 3.3 (SP fav) | 14.8% | 43.2% | 43.2% | **3rd** |

**What made it work:** MC #1–#3 filled the frame. The report called #8 (Purton) one of MC's two "likes" over the market at 9.8, and it was backed into 3.6 and won. A's pool was exactly the MC top 6, so A, B and B-trio all hit. **Return $142 on $100 = +$42.**

### R9 — 7→9→1 · Trio $88 (Class 3, 1200m, 11 ran)

| Horse | Role | Pre / SP | MC Win% | MC Rating (Place%) | Adj Place% | Result |
|-------|------|----------|---------|--------------------|------------|--------|
| #1 AURIO | 膽 Banker | 5.3 / 4.4 | 36.9% | 72.7% | 72.7% | **3rd** |
| #7 THE HEIR | 腳 (4th leg) | 4.7 (fav) / **2.0** | 7.5% | 31.6% | 31.6% | **1st** |
| #9 LIVE WIRE | 腳 | 11 / 6.2 | 14.5% | 47.3% | 48.3% (`+form`) | **2nd** |
| #6 PRESTIGE ALWAYS | 腳 | 6.6 | 19.1% | 54.7% | 55.7% | **Withdrawn** (combos refunded) |

**What made it work:** the market favourite #7 was MC "overvalued", but it still made the 5-horse pool on Adj Place% (31.6%, 5th). It was backed to 2.0 and won. The banker held on for 3rd under top weight. **Return $88 on $30 net = +$58.** The Trio paid less than the $10 × 6 gross ticket; only the withdrawal refund made it a profit.

## Section 4: Miss Classification

7 misses. **0 Pattern A, 3 Pattern B, 4 Pattern C.**

### Pattern A: Banker Fail — All 3 Placers Already in Legs (0/7)

None in A. (B-trio had one: R6, where its 7 legs held #10, #4 and #5 but banker #9 ran last.)

### Pattern B: Banker Hit — Pool Gap (3/7)

| Race | Banker | Pool gap | Gap pre / SP | Gap MC rank (Win%) | SCMP flag on gap | Missed Trio |
|------|--------|----------|--------------|--------------------|------------------|-------------|
| R1 | #9 GOLDEN FORTUNE **won** | #4 KINGLY DEMEANOR (2nd), #8 GOOD LUCK WIN (3rd) | 4.9 / 6.6; 11 / 10 | #10 (1.7%), #8 (2.9%) | none | $797 |
| R3 | #4 SUNDAY'S SERENADE **won** | #3 CLASS (3rd) | 8.3 / 14 | #6 (5.4%), Adj Place 23.9% | `+excuses` | $354 |
| R7 | #9 BRIGHT DAY **won** | #10 QUANTUM CLOUD (3rd) | 11 / 11 | #11 (0.4%) | `+excuses` | $960 |

**Pattern B was 3/7, and every banker in it won.** R3 is the only one a rule could fix: #3 was MC #6 and sat in the 20–25% Adj Place% band. Rule 8 would have pulled it in under Mode B, but Mode A stops at 5 horses. R1 needed two horses that MC rated below 3%. R7's gap was MC 0.4%.

### Pattern C: Banker Fail + Pool Gap (4/7)

| Race | Banker (pos, pre → SP) | Gap horse(s) | Gap MC Win% | Gap SP | Note |
|------|------------------------|--------------|-------------|--------|------|
| R2 | #4 (7th, **11 → 5.4**) | #7 1st, #9 3rd | 2.6%, 1.1% | 9.9, 24 | Banker heavily backed and failed. #5 (2nd) was a leg |
| R5 | #4 (5th, 3.2 → **2.5 fav**) | #8 1st, #10 2nd, #2 3rd | 6.0%, 1.1%, 4.3% | 3.1, 23, 71 | **No placer in the pool.** #8 (2nd fav, MC #4) missed the 5-horse cut by 0.2pp of Adj Place% |
| R6 | #9 (**12th of 12**, 3.0 → **2.1 fav**) | #5 3rd | 3.3% | 9.4 | #10 (won) and #4 (2nd) were both legs |
| R8 | #2 (4th, 6.9 → 3.0) + #1 (9th, 4.7 → 5.3) | #8 2nd, #3 3rd | 2.0%, 0.4% | **66**, 15 | #9 (won, MC #6) was a leg. Deep longshots |

**Combined Pattern C missed Trio value: $19,527** (R2 $2,641 + R5 $5,817 + R6 $708 + R8 $10,361). Three of the four failed bankers were favourites or steamers at SP (R5 2.5, R6 2.1, R8 3.0).

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R1 | 1膽 #9 + 6腳 | Add #4 (2nd fav) and #8 as 7th/8th legs (28 combos) | ✅ $797 | +$130 → +$517 net |
| R1 | 1膽 #9 + 6腳 | B-trio's swap (#4 for #11), same banker | ❌ (#8 still out) | $0 |
| R2 | 1膽 #4 + 6腳 | Anything plausible | ❌ (banker 7th; #7 MC #8, #9 MC #11) | — |
| R3 | 1膽 #4 + 4腳 | Add #3 (Adj Place 23.9%, pre 8.3) as a 5th leg (= B pool) | ✅ $354 | +$40 → +$254 net |
| R3 | 1膽 #4 + 4腳 | Report's own "Mode B-style widening" (+#3, #9: 6 legs) | ✅ $354 | +$90 → +$204 net |
| R5 | 1膽 #4 + 5腳 | Add #8 (2nd fav, Adj Place 23.5%) | ❌ (banker 5th; #10, #2 deep) | +$50 |
| R6 | 1膽 #9 + 5腳 | Box A pool + #5 (7 horses, 35 combos) | ✅ $708 | +$250 → +$358 net |
| R6 | 1膽 #9 + 5腳 | B-trio legs (+#8, #5) with #10 as banker instead | ✅ $708 | needs a banker switch no rule supports |
| R7 | 1膽 #9 + 4腳 | Add #10 (MC 0.4%, 11) | ✅ $960 | +$40, but no rule would pick it |
| R8 | 2膽 + 4腳 | Anything plausible | ❌ (both bankers out; #8 at 66) | — |

**Whole-card test of "Mode A: add the best 20–25% Adj Place% horse at pre-race ≤ 10 as a 5th/6th leg":** it adds R3 #3 (3rd ✅) and R5 #8 (won, but banker failed). R7's 20–25% horse #7 is 16, so it is not added. **3/9 hits, $880 staked, $584 returned, −$296**, against −$560 as bet.

- **Fixable misses** (with a rule we could actually write): **R3** only. That recovers $354 for +$40 (or +$90 including R5's add).
- **Unfixable misses**: **R1** (two placers at MC < 3%), **R2** (banker 7th, placers MC #8 and #11), **R5** (no placer in pool, two at 23 and 71), **R6** (2.1 favourite banker ran last), **R7** (MC 0.4% gap), **R8** (66-shot and MC #12).

## Section 6: Key Moments

- **Best Bet**: **R4 — +$42, the card's biggest return ($142).** Pool = MC top 6. Banker 2nd; the two legs MC liked over the market (#8 Purton at 9.8, #10 2nd fav) filled 1st and 3rd. R9 (+$58 on $30 net) had the better ROI but only because of the refund.
- **Worst Bet**: **R6 — −$100 on a 2.1 favourite banker that finished 12th of 12.** MC (60.5% place) and the market agreed, the report called the banker "solid", and two legs (#10, #4) ran 1-2. A banker that ran last cost a race where 2 of 3 placers were held.
- **Most Frustrating**: **R3 — banker won, leg #6 2nd, and #3 CLASS ran 3rd from just outside the pool.** #3 was MC #6 with Adj Place 23.9%. The report itself noted that a Mode B-style widening would add #3. Strategy B and B-trio both had it and collected $354.
- **Biggest Surprise**: **R8 — Trio $10,361, the biggest of the season.** #8 RISING PHOENIX (MC 2.0%, drifted 20→**66**) ran 2nd, and #3 PRESTIGE GOOD (MC 0.4%, "overvalued by 96%") ran 3rd. Both MC bankers missed.
- **Best MC Call**: **R7 #9 BRIGHT DAY.** MC had it at 38.6% win (fair ~2.6, "undervalued by 286%") against 10.0 pre-race, 4th in the market at SP. It won at 7.2. It is only the second "undervalued > 200%" call this season to place.

## Section 7: Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 3 | R1, R3, R7 |
| Banker 2nd-3rd | 2 | R4 (2nd), R9 (3rd) |
| Banker out of top 3 | 4 | R2 (7th), R5 (5th), R6 (12th), R8 (#2 4th, #1 9th) |

**Banker strike rate (top 3): 5/9 = 55.6%** · **Banker win rate: 3/9 = 33.3%**
**All bankers placed (season convention): 5/9 = 55.6%.** The 2nd-banker rule went **0/1** this card (R8 #1 ran 9th); **4/8 over four cards**.

**Banker by market rank at SP:** rank 1–2: **2/7** (R3, R9 ✅; R1, R2, R5, R6, R8 ❌) · rank 3: **1/1** (R4 ✅) · rank 4+: **1/1** (R7 ✅). **Short HV favourites failed**: SP ≤ 3.0 bankers went 0/3 (R5 2.5, R6 2.1, R8 3.0). Bankers that steamed ≥ 2× from the morning price (R2 11→5.4, R8 6.9→3.0) both missed.
**The SCMP banker swap was right:** R1 A banker #9 (MC #2, `+trial` + `+excuses`) won; MC #1 #1 CAN'T GO WONG ran 8th.

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | 2/9 (R4, R9) |
| All 3 in pool OR banker + 2 legs | 2/9 |
| At least 2 placers in pool | 5/9 (+ R3, R6, R7) |
| Banker hit + pool gap | 3/9 (R1, R3, R7) |

R5 was the only race with **no** placer in the pool. In R3, R6 and R7 the pool held 2 of 3 placers. One horse decided each of those races (R3 and R7 the gap, R6 the banker).

### 7c. MC-Market Divergence Outcomes

Each report's "Market" paragraph lists its biggest MC-vs-market gaps. "Correct" = an undervalued horse placed, or an overvalued horse did not.

| Race | Undervalued (MC > mkt) → finish | Overvalued (MC < mkt) → finish |
|------|-------------------------------|------------------------------|
| R1 | #10 118% → 10th ❌ · #6 94% → 7th ❌ | **#4 (2nd fav 4.9, MC 1.7%) → 2nd ❌** |
| R2 | **#4 206% → 7th ❌** | #10 fav 2.7 → 9th ✅ · #7 → **1st** ❌ · #9 → **3rd** ❌ |
| R3 | #4 99% → **1st** ✅ | #10 fav 3.3 → 5th ✅ · #5 → 10th ✅ |
| R4 | #8 → **1st** ✅ · #3 → 6th ❌ | #1 95% → 11th ✅ · #12 → 5th ✅ |
| R5 | #6 (MC clear 2nd, 12) → 12th ❌ | **#8 76% (2nd fav) → 1st ❌** · #9 67% → 6th ✅ |
| R6 | #4 → **2nd** ✅ · #3 → 8th ❌ | **#10 59% (2nd fav) → 1st ❌** · #5 75% → **3rd** ❌ |
| R7 | **#9 286% → 1st ✅** · #12 124% → 10th ❌ | #11 (co-fav 4.4, MC 1.8%) → 9th ✅ · #5 (co-fav 4.4) → **2nd** ❌ |
| R8 | #2 110% → 4th ❌ | #4 → 12th ✅ · #12 → 7th ✅ · #11 96% → 8th ✅ · #3 96% → **3rd** ❌ |
| R9 | #1 110% → **3rd** ✅ | **#7 fav 4.7 → 1st ❌** |

**MC divergence accuracy: 15/32 (46.9%).** Undervalued **5/13 (38.5%)**. Overvalued **10/19 (52.6%)**. **Claimed edge > 200%: 1/2** (R7 #9 won; R2 #4 7th), making the **season 2/16**. **When MC opposed a horse the market had 1st–3rd in betting at SP, that horse placed 5/8** (R1 #4, R5 #8, R6 #10, R7 #5, R9 #7 ✅; R2 #10, R3 #10, R7 #11 ❌). Three of those five won.

### 7d. SCMP +Excuses Flag Performance

44 `+excuses` flags across 107 runners (field base rate 27/107 = 25.2%).

| Segment | Placed | Rate |
|---------|--------|------|
| All `+excuses` | 13/44 | **29.5%** |
| `+excuses` AND pre-race odds ≤ 8 | 6/14 | **42.9%** |
| `+excuses` AND pre-race odds > 8 | 7/30 | 23.3% |

The ≤ 8 placers were R1 #9, R2 #5, R3 #6, R4 #2, R6 #10 and R7 #5. The ≤ 8 non-placers were R2 #2 (4th), R3 #10 (5th), R3 #5, R4 #12, R5 #4 (banker, 5th), R7 #2, R8 #12 and R8 #4. **Three-card ≤ 8 record: 18/35 (51.4%)**, about twice the base rate. Four `+excuses` gap horses placed at > 8 (R2 #7, R2 #9, R3 #3, R7 #10), so the flag again had some value outside the pool, but too diffusely to use. **+Excuses hit rate (top 3): 13/44 (29.5%).**

**Other flags:** `+trial` **2/9** (2/7 at pre-race ≤ 10; both placers, R1 #9 and R7 #5, were already in the pool), against 10/17 last card. `+form` 3/16 (one `+form` horse withdrawn). **Negative flags 0/12** (`-injury30d` 0/4, `-perf` 0/3, `-notRO` 0/4, `-age` 0/1). The negatives were all correct this card.

### 7e. Divergence Override Assessment

**No discretionary override was applied.** All tickets are rule output. The rules that changed tickets:

| Rule | Race | Effect | Result |
|------|------|--------|--------|
| SCMP banker swap (`+trial` +2, `+excuses` +2) | R1 | #9 bankered over MC #1 #1 | **#9 won, #1 ran 8th.** Right call, but the pool missed #4 and #8 |
| 2nd banker (Adj Place ≥ 63%) → 雙膽拖 | R8 | #1 co-banked (64.2%), 4 combos | Both bankers failed. Cheap loss ($40 vs $100 for 1膽+5腳) |
| Mode A tight pool (5) | R3, R7, R9 | 6 combos each | R9 **HIT**. R3 cut #3 (3rd, Adj Place 23.9%) → cost the $354 Trio |
| Mode A + Rule 9 | R5 | #9 (`-injury30d`, 2nd fav pre 6.7) forced in | #9 ran 6th. #8 (2nd fav, 23.5%) was cut by 0.2pp and won |
| Rule 8 extensions (≥ 20%) | R1 (+#3), R2 (+#8) | 7-horse pools, +$50 each | #3 6th, #8 5th → **$100 for nothing** |

**Lesson:** Rule 8 is applied in Mode B races but not in Mode A races. This card it cost $100 where it fired (R1, R2) and cost the R3 Trio where it did not. The 20–25% band needs one consistent rule, not two. The SCMP banker swap went 1/1.

## Section 8: Learnings

### What Worked

- **The SCMP banker swap in R1.** `+trial` + `+excuses` moved #9 above MC #1 #1. #9 won and #1 ran 8th. Season banker top-3 is now 42/86 (48.8%).
- **MC's top tier filled two frames**: R4 (MC #1–#3) and R9 (MC #1, #4, #5). R7 #9 BRIGHT DAY ("undervalued by 286%", 10.0) won.
- **Negative SCMP flags were 0/12 placed.** `-injury30d`, `-perf` and `-notRO` all pointed the right way.
- **`+excuses` at pre-race ≤ 8 placed 6/14 (42.9%)**, three-card 18/35 (51.4%) against a ~25% base rate.

### What Didn't Work

- **Short-priced HV favourite bankers.** R5 #4 (2.5) ran 5th, R6 #9 (2.1) ran last, and R8 #2 (backed 6.9→3.0) ran 4th. Banker market rank 1–2 at SP placed only **2/7**, against 24/34 over the previous six meetings.
- **Mode A cut-off inside the 20–25% band.** R3 #3 (23.9%, 3rd) and R5 #8 (23.5%, won) were both cut, while Rule 8 extended R1 and R2 for nothing.
- **MC kept losing to the market on horses it opposed.** Market top-3 horses MC called overvalued placed 5/8 (three won: R5 #8, R6 #10, R9 #7).
- **`+trial` reversed.** 2/9 this card after 10/17 last card. The proposed "`+trial` at ≤ 10 → must-include" rule would have added R3 #10 (5th) and R8 #4 (12th) for nothing.
- **Morning odds only.** The 11:01 HKT snapshot was 7+ hours before the off, and the momentum poller was not running, so there is no near-off price for any race.

### Strategy Adjustments

- [ ] **Unify the 20–25% Adj Place% band across modes.** Backtest "Mode A: add the best 20–25% horse with pre-race ≤ 10 as an extra leg", with Rule 8 in Mode B limited to the same ≤ 10 filter. This card: R3 becomes a hit, R1/R2 extensions (#3 at 9.8 stays; #8 at 23 drops) save $50. Net **−$296 → about −$246** vs −$560 as bet.
- [ ] **Flag (do not auto-pass) bankers at SP ≤ 3.0 at HV.** This card 0/3. Check the season's HV record for MC #1 at ≤ 3.0 before adding any rule.
- [ ] **Run the momentum poller on race days**, and re-check banker odds within 30 minutes of the off. Flag bankers that move ≥ 2× (R2 11→5.4, R8 6.9→3.0, both unplaced; 04-Oct R5 9.8→5.3, unplaced).
- [ ] **Hold the `+trial` must-include rule.** Two-card record at pre-race ≤ 10 is now 10/19 (52.6%). The rule's marginal adds were 0/2 this card. Needs two more cards.
- [ ] **Downgrade the market-floor blend.** MC < 3% at pre-race ≤ 6 placed 1/5 this card (R1 #4 ✅; R3 #10, R4 #1, R7 #11, R8 #4 ❌) and 0/2 at SP ≤ 6. Season at SP ≤ 6: **12/18**. Keep it as research, not a rule.
- [ ] **Fix the scraper's comma truncation for Quinella/QP** (three more values this card; R8 QN $2,910 read as $2). Code change, not part of this review.

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | — | — | — | — | — | — |
| MEDIUM-HIGH | R7, R9 | 1/2 | $90 | $88 | −$2 | −2.2% |
| MEDIUM | R2, R3, R4, R5, R6, R8 | 1/6 | $550 | $142 | −$408 | −74.2% |
| MEDIUM-LOW | R1 | 0/1 | $150 | $0 | −$150 | −100.0% |
| **TOTAL** | **9** | **2/9** | **$790** | **$230** | **−$560** | **−70.9%** |

**MEDIUM-HIGH broke even; MEDIUM produced most of the loss.** By classification, Dominant (Mode A: R3, R5, R7, R9) went **1/4, $250 → $88, −$162**, and Competitive (R1, R2, R4, R6, R8) went **1/5, $540 → $142, −$398**. Four-card Dominant: **7/22, +$797**. Four-card non-Dominant: **3/20, −$1,693**. The Dominant/Competitive split still holds, but the Dominant edge depends on a handful of big hits (04-Oct R11 $1,148).

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
| **9** | **2026-10-07** | **HV** | **9** | **2** | **$790** | **$230** | **−$560** | **−70.9%** |
| **TOTAL** | | | **86** | **15** | **$7,790** | **$5,146** | **−$2,644** | **−33.9%** |

> The 06-Sep figures use the §10e convention (9 races / 2 hits / $870). Meeting 5 was a post-meeting blind run (no SCMP) and is included for tracking. Meeting 9 stake is net of the $30 R9 refund.

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
| **2026-10-07 HV** | **5/9** | **55.6%** |
| **Combined** | **42/86** | **48.8%** |

### 10c. Venue Breakdown

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
|-------|----------|-------|------|--------|----------|-----|-----|--------------|
| Sha Tin | 5 | 52 | 11 | $4,610 | $3,801 | −$809 | −17.5% | 22/52 (42.3%) |
| **Happy Valley** | **4** | **34** | **4** | **$3,180** | **$1,345** | **−$1,835** | **−57.7%** | **20/34 (58.8%)** |

Happy Valley keeps the better banker rate (58.8% vs 42.3%) and the much worse ROI. HV Trios are cheap when the frame is MC-friendly (R4 $142, R9 $88), and the gaps come from deep in the MC ranking when it is not.

### 10d. Season Trajectory

| Metric | 09-06 | 09-09 | 09-13 | 09-16 | 09-23 | 09-27 | 10-01 | 10-04 | **10-07** | Trend |
|--------|-------|-------|-------|-------|-------|-------|-------|-------|-----------|-------|
| Hit rate (meeting) | 22.2% | 0.0% | 10.0% | 0.0% | 22.2% | 18.2% | 36.4% | 18.2% | **22.2%** | ↑ |
| Hit rate (cumulative) | 22.2% | 11.8% | 11.1% | 8.6% | 11.4% | 12.7% | 16.7% | 16.9% | **17.4%** | → |
| Cumulative P&L | −$79 | −$719 | −$1,113 | −$1,963 | −$1,748 | −$2,315 | −$2,218 | −$2,084 | **−$2,644** | ↓ |
| Cumulative ROI | −9.1% | −47.6% | −46.8% | −60.8% | −42.3% | −45.6% | −37.8% | −29.8% | **−33.9%** | ↓ |
| Banker top 3 (meeting) | 33.3% | 50.0% | 30.0% | 75.0% | 55.6% | 45.5% | 45.5% | 54.5% | **55.6%** | → |
| Banker top 3 (cumulative) | 33.3% | 41.2% | 37.0% | 45.7% | 47.7% | 47.3% | 47.0% | 48.1% | **48.8%** | → |

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
| **9** | **2026-10-07** | **HV** | **2/9** | **−$560** | **−70.9%** | **3/9** | **−$276** | **−32.1%** | **B (R3 hit, $284)** |
| **TOTAL** | | | **15/86** | **−$2,644** | **−33.9%** | **15/86** | **−$3,318** | **−38.8%** | **A** |

*B = review-spec Strategy B (MC top 6, 1膽+5腳, $100 flat; R9 $60 net of refund). B-trio (the reports' own Strategy B) this meeting: **3/9 (R3, R4, R9), $1,210 staked, $584 returned, −$626, −51.7%**. Season B-trio: **20/86, $11,050 staked, $4,752 returned, −$6,298, −57.0%**.*

| Cumulative Metric | Strategy A | Strategy B | Delta (B − A) |
|-------------------|-----------|-----------|---------------|
| Total meetings | 9 | 9 | — |
| Total races | 86 | 86 | 0 |
| Hits (rate) | 15/86 (17.4%) | 15/86 (17.4%) | 0 |
| Total staked | $7,790 | $8,560 | +$770 |
| Total returned | $5,146 | $5,242 | +$96 |
| **Cumulative P&L** | **−$2,644** | **−$3,318** | **−$674** |
| **Cumulative ROI** | **−33.9%** | **−38.8%** | **−4.9 pp** |
| Banker top 3 rate | 42/86 (48.8%) | 42/86 (48.8%) | 0 |

The loss on this card takes cumulative ROI from −29.8% back to **−33.9%** and ends a two-card winning run. **This is the first meeting where B hit a race that A missed** (R3), and B now matches A on hits (15/86 each) and has returned slightly more ($5,242 vs $5,146). A's $674 lead is now entirely stake sizing ($770 less staked). The A/B data is converging: A's selection rules have not shown a consistent hit-rate edge over raw MC top 6, and its advantage is that it bets less.

## Section 11: A/B Strategy Comparison

### 11a. How Strategy B was derived

For each race, the **MC SIMULATION (raw)** table in `trio_strategy_20261007_HV_RN.md` was sorted by MC Win%. The first 6 horses form the pool and MC #1 is the banker: 1膽+5腳, 10 combos, $100, every race. A hit needs the banker in the top 3 and all 3 placers in the 6-horse pool. R5's #1 and #7 tied at 5.9% for MC #5/#6; both are in. R9's withdrawn #6 was MC #2, so B's R9 ticket lost 4 combos to refund ($60 net). **This is not the same as the "STRATEGY B (MC-only)" block in each report**, which uses Place% > 20% legs and a Win-odds < 10 swap/add (4–7 legs, $60–$210). That block is tracked here as B-trio.

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | Strat A Banker | Strat B Pool (MC top 6) | Strat B Banker (MC #1) | Result (1→2→3) | A Hit? | B Hit? | Trio $ | A Return | B Return | A Stake | B Stake | Key Difference |
|------|--------------|----------------|-------------------------|------------------------|----------------|--------|--------|--------|----------|----------|---------|---------|----------------|
| R1 | 9,1,10,5,6,11,3 | #9 | 1,9,10,6,5,11 | #1 | 9→4→8 | ❌ | ❌ | $797 | $0 | $0 | $150 | $100 | **Banker: A #9 (SCMP swap, won), B #1 (8th)**; A +#3 (Rule 8) |
| R2 | 4,2,10,5,6,12,8 | #4 | 4,2,10,5,6,12 | #4 | 7→5→9 | ❌ | ❌ | $2,641 | $0 | $0 | $150 | $100 | A +#8 (Rule 8), +$50 |
| R3 | 4,6,1,8,2 | #4 | 4,6,1,8,2,3 | #4 | 4→6→3 | ❌ | ✅ | $354 | $0 | $354 | $60 | $100 | **B's 6th horse #3 ran 3rd**; A Mode A 5-horse pool |
| R4 | 2,8,10,3,11,4 | #2 | 2,8,10,3,11,4 | #2 | 8→2→10 | ✅ | ✅ | $142 | $142 | $142 | $100 | $100 | Same pool & banker |
| R5 | 4,6,1,12,7,9 | #4 | 4,6,12,8,1,7 | #4 | 8→10→2 | ❌ | ❌ | $5,817 | $0 | $0 | $100 | $100 | A #9 (Rule 9), B #8 (won); banker 5th so both miss |
| R6 | 9,4,2,10,3,7 | #9 | 9,4,2,10,3,7 | #9 | 10→4→5 | ❌ | ❌ | $708 | $0 | $0 | $100 | $100 | Same pool & banker |
| R7 | 9,2,12,5,6 | #9 | 9,2,12,5,6,7 | #9 | 9→5→10 | ❌ | ❌ | $960 | $0 | $0 | $60 | $100 | A 5-horse pool (−$40); B's #7 ran 7th |
| R8 | 2,1 / 10,12,5,9 | #2 + #1 | 2,1,10,5,12,9 | #2 | 9→8→3 | ❌ | ❌ | $10,361 | $0 | $0 | $40 | $100 | Same 6; A 雙膽拖 4 combos (−$60) |
| R9 | 1,6,2,9,7 | #1 | 1,6,2,9,7,5 | #1 | 7→9→1 | ✅ | ✅ | $88 | $88 | $88 | $30 | $60 | Both hit; A 5-horse pool (net $30 vs $60) |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | 9 | 9 | 0 |
| Hits | 2/9 (22.2%) | 3/9 (33.3%) | +1 |
| Total staked | $790 | $860 | +$70 |
| Total returned | $230 | $584 | +$354 |
| **Net P&L** | **−$560** | **−$276** | **+$284** |
| **ROI** | −70.9% | −32.1% | +38.8 pp |
| Banker top 3 rate | 5/9 (55.6%) | 4/9 (44.4%) | −1 |

*B-trio (report's own B, for reference): 3/9 (R3 $354, R4 $142, R9 $88), $1,210 staked, $584 returned, −$626, −51.7%, banker 4/9. Its Win-odds < 10 rule added R3's market favourite #10 (5th) but also kept #3. In R6 its 7 legs held all three placers, but banker #9 ran last (Pattern A). In R1 it swapped #11 for #4 (2nd), but banker #1 ran 8th.*

### 11d. Where A and B Diverged

| Race | What Differed | A Result | B Result | Impact | Root cause |
|------|---------------|----------|----------|--------|------------|
| R3 | Pool: A 5 horses; B also had #3 (MC #6) | MISS ❌ | HIT ✅ | **B +$314** | Mode A tight pool (Rule 8 not applied in Mode A) |
| R1 | Banker: A #9 (won), B #1 (8th); A +#3 | MISS ❌ | MISS ❌ | B +$50 | SCMP `+trial`/`+excuses` banker swap (right, but pool gaps) + Rule 8 |
| R2 | Pool: A +#8 | MISS ❌ | MISS ❌ | B +$50 | Rule 8 extension (#8 5th) |
| R5 | Pool: A #9, B #8 | MISS ❌ | MISS ❌ | Same | Rule 9 forced #9 in; MC #4 #8 cut by Adj Place 0.2pp |
| R7 | Pool: A 5 horses | MISS ❌ | MISS ❌ | A +$40 | Mode A tight pool |
| R8 | Structure: A 雙膽拖 4 combos | MISS ❌ | MISS ❌ | A +$60 | 2nd-banker rule (#1 Adj Place 64.2%) |
| R9 | Pool: A 5 horses | HIT ✅ | HIT ✅ | A +$30 | Mode A tight pool |

Net: **B +$284 vs A**. R3 alone accounts for $314. A's cheaper tickets saved $130 (R7, R8, R9), and its Rule 8 extensions cost $100 (R1, R2).

### 11e. Session Verdict

**B won by $284 (−$276 vs −$560), and one race decided it.** In R3 the Mode A 5-horse limit left out MC #6 #3 CLASS (Adj Place 23.9%), which ran 3rd behind a winning banker. Without R3, A would have beaten B by $30 on stake alone. That looks like **variance in which horse sits 6th**, but it points at a **systematic** inconsistency: Rule 8 (≥ 20%) widens Mode B pools (R1, R2: +$100, no return) but not Mode A pools (R3: a $354 Trio lost for want of a $40 leg). The A-only rule that worked was the SCMP banker swap in R1: #9 won while MC #1 ran 8th. It did not pay because two sub-3% horses filled 2nd and 3rd. The 2nd-banker rule in R8 lost cheaply ($40 vs B's $100). Neither strategy could have survived the two failed short-priced favourite bankers (R5, R6), and those are the card's real problem.
