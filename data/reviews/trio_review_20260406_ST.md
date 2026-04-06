# Trio Post-Race Review — Sha Tin | 6 April 2026

**Results source:** HKJC verified (`tools/scrape-meeting.ts`, `data/historical/results_20260406_ST.json`). Trio dividends confirmed from HKJC results pages.
**Strategy tickets:** Strategy A (full pipeline) and Strategy B (MC-only pools per strategy reports).

---

## Section 1: Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (Report MC-based) |
|--------|---------------------------|-------------------------------|
| Races played | **11 (R1–R11)** | **11 (R1–R11)** |
| Hit rate | **1/11 (9.1%)** | **3/11 (27.3%)** |
| Total staked | **$620** | **$930** |
| Total returned | **$32** | **$551** |
| **Net P&L** | **−$588** | **−$379** |
| **ROI** | **−94.8%** | **−40.8%** |
| Session result | **LOSS** | **LOSS** |

**膽拖 rule:** Each combo is **banker + two legs**. The banker (or **both** bankers in 雙膽拖) must finish in the top three, and **all three** official placers must sit inside the declared pool (banker + legs).

---

## Section 2: Race-by-Race Cross-Reference (Strategy A)

| Race | Class | Mode | Banker(s) | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|----------------|------|--------|--------|-----|-------------|
| R1 | C4 | 膽拖 6cb | #1 | 2,12,10,4 | 12→1→**9** | MISS ❌ | $297 | $0 | −$60 | Pattern B — banker 2nd; pool gap **#9** ($11) |
| R2 | C5 | 雙膽拖 3cb | #8,#5 | 10,1,11 | **14**→1→10 | MISS ❌ | — | $0 | −$30 | Pattern C — banker #8 4th + pool gap **#14** ($6.6) |
| R3 | C4 | 雙膽拖 3cb | #1,#2 | 3,8,13 | **7**→8→1 | MISS ❌ | $1,062 | $0 | −$30 | Pattern B — banker #1 3rd; pool gap **#7** ($13) |
| R4 | C4 | 雙膽拖 3cb | #3,#1 | 2,8,5 | **14**→3→**9** | MISS ❌ | — | $0 | −$30 | Pattern B — banker #3 2nd; pool gaps **#14** ($14), **#9** ($105) |
| R5 | C4 | 膽拖 6cb | #3 | 1,8,12,10 | 3→**14**→**6** | MISS ❌ | — | $0 | −$60 | Pattern B — banker won; pool gaps **#14** ($10), **#6** ($15) |
| R6 | C3 | 膽拖 6cb | #1 | 2,4,5,3 | 4→1→**12** | MISS ❌ | $222 | $0 | −$60 | Pattern B — banker 2nd; pool gap **#12** ($12) |
| R7 | G2 | 膽拖 10cb | #1 | 4,7,5,2,3 | 1→2→3 | **HIT ✅** | $32 | $32 | −$68 | — |
| R8 | C3 | 膽拖 6cb | #1 | 6,10,2,4 | 2→4→6 | MISS ❌ | — | $0 | −$60 | **Pattern A** — banker fail; **all 3 placers in legs** |
| R9 | G2 | 膽拖 10cb | #12 | 13,5,9,8,3 | 3→8→**1** | MISS ❌ | — | $0 | −$100 | Pattern C — banker #12 fail + pool gap **#1** ($9.3) |
| R10 | C2 | 膽拖 6cb | #8 | 10,4,9,1 | **6**→4→8 | MISS ❌ | — | $0 | −$60 | Pattern B — banker 3rd; pool gap **#6** ($44) |
| R11 | C3 | 雙膽拖 3cb | #3,#2 | 5,4,1 | 4→3→**9** | MISS ❌ | — | $0 | −$30 | Pattern B — banker #3 2nd; pool gap **#9** ($14) |
| **TOTAL** | | **62 combos** | | | | **1/11** | | **$32** | **−$588** | |

*Bold numerals in Result = horse NOT in Strategy A pool (banker + legs).*

**Critical finding:** R7's only hit returned $32 on a $100 stake — a **net loss of −$68** on the winning bet. This is the first session where every race produced a net loss for Strategy A, including the hit.

---

## Section 3: Hits Analysis

### R7 — THE SPRINT CUP (Group 2) | 1200m Turf | 7 runners | HIT ✅

**Result:** #1 KA YING RISING → #2 HELIOS EXPRESS → #3 RAGING BLIZZARD | Trio: **$32**

| Horse | Role | Odds | MC Win% | Adj Place% | Result |
|-------|------|------|---------|------------|--------|
| #1 KA YING RISING | ★ Banker | $1.0 | 23.4% | 64.0% | **1st** |
| #2 HELIOS EXPRESS | Leg | $70 | 11.3% | 42.6% | **2nd** |
| #3 RAGING BLIZZARD | Leg | $176 | 7.6% | 33.4% | **3rd** |

**What made it hit:** The 7-runner Group 2 field was shallow enough for the 6-horse pool (Mode B) to cover 6/7 runners. Ka Ying Rising was the prohibitive $1.0 favourite and delivered. However, the $32 Trio reflects extreme favourite dominance — the payout was less than half the $100 stake.

**Return:** $32 on $100 staked = **−$68 net loss** on this hit.

---

## Section 4: Miss Classification

### Pattern A: Banker Fail — All 3 Placers Already in Legs (1 race)

**R8** — Banker #1 LUCY IN THE SKY (MC 48.4%, Adj Win% 51.9%) failed to place top 3. All three result horses (#2 MIGHTY MASTS, #4 FIT FOR BEAUTY, #6 THE RED HARE) were in the leg pool.
- #1 SP: not top 4 (implied mid-field or worse)
- Root cause: MC overestimated #1's 1400m form. #1 had dominant MC profile but was beaten by three "next tier" horses all priced $2.6–$5.5.
- Combined Pattern A missed return: Trio dividend unknown (Tierce was $488, Trio est. ~$80–$120).

### Pattern B: Banker Hit — Pool Gap (7 races)

| Race | Banker | Banker Finish | Pool Gap Horse | Gap Odds | Pool Gap MC Win% | Trio $ |
|------|--------|--------------|----------------|----------|-----------------|--------|
| R1 | #1 | 2nd | #9 RAPID PHANTOM | $11 | 0.7% | $297 |
| R3 | #1 | 3rd | #7 BIG RETURN | $13 | 1.7% | $1,062 |
| R4 | #3 | 2nd | #14 LUCKY MAN ($14) + #9 ILLUMINOUS ($105) | $14/$105 | <1% / <1% | — |
| R5 | #3 | 1st | #14 RIDING HIGH ($10) + #6 LUCRATIVE EIGHT ($15) | $10/$15 | <1% / <1% | — |
| R6 | #1 | 2nd | #12 LUCKY CANDY | $12 | <1% | $222 |
| R10 | #8 | 3rd | #6 MUGEN | $44 | <1% | — |
| R11 | #3 | 2nd | #9 ENTHUSIUM | $14 | <1% | — |

**Pattern B was the dominant miss pattern at 7/10 misses (70%).** The banker selection was correct (all 7 bankers placed top 3), but the 5-horse tight pools consistently missed one placer.

### Pattern C: Banker Fail + Pool Gap (2 races)

| Race | Banker | Banker Finish | Pool Gap | Gap Odds |
|------|--------|--------------|----------|----------|
| R2 | #8 KING ALLOY | 4th | #14 SUPREME WINNER | $6.6 |
| R9 | #12 PATCH OF THETA | outside top 3 | #1 VOYAGE BUBBLE | $9.3 |

**R2:** #8 was 4th (beaten a length), #14 won at $6.6. Neither the market favourite nor #8 could fill the frame.
**R9:** Group 2 race where both MC co-favourites (#12, #13) failed entirely. Winner #3 LUCKY SWEYNESSE was MC #5 (4.2% Win) — a major MC blind spot.

---

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|------------|------------|-------------|
| R1 | 膽拖 5-horse pool | Expand to 6 horses (+#9 via win-odds logic, as report B did) | **YES** — {1,12,9} all in expanded pool | +$40 → $100 |
| R3 | 雙膽拖 5-horse pool | Expand to 6 horses (+#7 BIG RETURN, MC rank 5) | **YES** — {7,8,1} all in pool | +$70 → $100 |
| R4 | 雙膽拖 5-horse pool | Any expansion | **NO** — #9 at $105 is unfixable | — |
| R5 | 膽拖 5-horse pool | Any expansion | **NO** — need 2 extra horses (#14 + #6) | — |
| R6 | 膽拖 5-horse pool | Expand to 6 (+#12 LUCKY CANDY) | **YES** — {4,1,12} all in pool | +$40 → $100 |
| R8 | 膽拖 5-horse (banker fail) | Full box C(5,3) = 10 combos | **YES** — {2,4,6} all in pool | +$40 → $100 |
| R9 | 膽拖 6-horse pool | Switch banker to #3 or #8 | Partially — still need #1 in pool | Complex |
| R10 | 膽拖 5-horse pool | Expand to 6 (+#6 MUGEN) | Would need #6 at MC <1% — unreasonable | — |
| R11 | 雙膽拖 5-horse pool | Expand to 6 (+#9 ENTHUSIUM) | **YES** — {4,3,9} all in pool | +$70 → $100 |

**Fixable misses:** R1, R3, R6, R8, R11 — 5 races. Recoverable return: $297 + $1,062 + $222 + est.$100 (R8) + est.$450 (R11) ≈ **$2,131**. Extra stake: ~$260 total.
**Unfixable misses:** R4, R5, R10 — genuine upsets with longshots ($105, dual gaps, $44 winner).
**Structural miss:** R2 (banker 4th by a length), R9 (MC co-favourites both failed).

---

## Section 6: Key Moments

- **Best Bet:** R7 — Ka Ying Rising delivered as $1.0 favourite in the Group 2 Sprint Cup. MC correctly identified the pool. Unfortunately, the $32 Trio made it unprofitable at $100 stake.

- **Worst Bet:** R9 — $100 staked on 膽拖 with #12 PATCH OF THETA as banker (MC 32% Win). Both MC co-favourites (#12, #13) failed entirely. Winner LUCKY SWEYNESSE was MC #5 (4.2%). A Group 2 race where MC's model was structurally wrong.

- **Most Frustrating:** R8 — Pattern A miss. All three placers (#2, #4, #6) were legs, but banker #1 LUCY IN THE SKY (MC 48.4%) failed. A simple full box of the same 5 horses would have hit. The $60 stake was effectively thrown away by the banker restriction.

- **Biggest Surprise:** R4 — #9 ILLUMINOUS finished 3rd at $105. Combined with #14 LUCKY MAN winning at $14, this produced a Tierce of $58,061. No model could reasonably predict a $105 shot in the frame.

- **Best MC Call:** R5 — MC correctly identified #3 THOUSAND SPIRIT (50.7% Win) as dominant. #3 won at $15 (market implied ~6.7%), vindicating MC's assessment. The market heavily backed #7 SUPERB SPIRIT at $2.4 (Purton ride) which finished 4th. MC was right, market was wrong.

---

## Section 7: Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 2 | R5, R7 |
| Banker 2nd-3rd | 6 | R1(2nd), R3(3rd), R4(2nd), R6(2nd), R10(3rd), R11(2nd) |
| Banker out of top 3 | 3 | R2(4th), R8, R9 |

**Banker strike rate (top 3): 8/11 = 72.7%** — strongest performance of the season.
**Banker win rate: 2/11 = 18.2%**

Despite excellent banker placement, the tight pool construction turned these into losses.

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | 1/11 (R7) |
| Banker hit + at least 2 legs placed | 7/11 (R1,R3,R4,R5,R6,R10,R11) |
| At least 2 placers in pool | 10/11 (all except R2) |
| Banker hit + pool gap | 7/11 |

**The pool correctly covered 2/3 placers in 10 of 11 races.** The consistent failure was the 5th/6th horse — the pool was always one horse short.

### 7c. MC-Market Divergence Outcomes

| Race | MC Top Pick | MC Win% | Market Odds | Finished | MC Correct? |
|------|------------|---------|-------------|----------|-------------|
| R1 | #1 ALMIGHTY LIGHTNING | 78.6% | $1.8 | 2nd | Partial ✅ (top 3) |
| R2 | #8 KING ALLOY | 41.3% | $3.9 | 4th | ❌ |
| R3 | #1 MR COOL | 60.7% | $3.7 | 3rd | Partial ✅ (top 3) |
| R4 | #3 ROBOT STAR | 39.0% | $13 | 2nd | ✅ (market undervalued) |
| R5 | #3 THOUSAND SPIRIT | 50.7% | $15 | 1st | **✅ (MC hero call)** |
| R6 | #1 GLOWING PRAISES | 52.7% | $4.0 | 2nd | ✅ |
| R7 | #1 KA YING RISING | 23.4% | $1.0 | 1st | ✅ |
| R8 | #1 LUCY IN THE SKY | 48.4% | ~$5.5? | Not top 3 | ❌ |
| R9 | #12 PATCH OF THETA | 32.0% | ~$3.9? | Not top 3 | ❌ |
| R10 | #8 SIX PACK | 63.8% | $2.6 | 3rd | ✅ |
| R11 | #3 LIVEANDLETLIVE | 38.1% | $3.9 | 2nd | ✅ |

**MC top pick in top 3: 8/11 (72.7%)** — very strong for banker selection. MC failed on R2, R8, R9.
**MC top pick won: 3/11** (R5, R7, R10... wait #8 was 3rd in R10). Let me recount: R5 (#3 won) and R7 (#1 won) = 2/11.

### 7d. SCMP +Excuses Flag Performance

Data on individual +excuses flags not fully tracked for this meeting. Key observations:
- R3 #7 BIG RETURN: SCMP Phillip Woo noted "could surprise" — did surprise (won at $13). Not flagged as +excuses in our pipeline but should have been.
- R1 #9 RAPID PHANTOM: SCMP trial form highlighted — placed 3rd at $11. The report's Strategy B correctly captured this via win-odds rule.

### 7e. Purton Performance

| Race | Horse | Role | Odds | Finished | Verdict |
|------|-------|------|------|----------|---------|
| R1 | #1 ALMIGHTY LIGHTNING | Banker | $1.5 | 2nd | ✅ top 3 |
| R3 | #3 VICTOR SUPREME | In pool (leg) | $5.4 | 4th | ❌ |
| R5 | #7 SUPERB SPIRIT | Not in pool | $2.4 | 4th | ❌ |
| R6 | #1 GLOWING PRAISES | Banker | $4.0 | 2nd | ✅ top 3 |
| R7 | #1 KA YING RISING | Banker | $1.0 | 1st | ✅ won |
| R8 | #6 THE RED HARE | Leg | $2.6 | 3rd | ✅ top 3 |
| R11 | #4 AERODYNAMICS | Leg | $7.5 | 1st | ✅ won |

**Purton as banker: 3/3 top 3 (100%)** — R1(2nd), R6(2nd), R7(1st). Perfect.
**Purton overall: 5/7 in top 3 (71.4%)**, 2 wins (R7, R11).
Purton rode 2 winners outside the banker role — both placed well. His 4th-place finishes (R3, R5) were on horses our model also didn't favour for frame positions.

### 7f. Divergence Override Assessment

No explicit divergence overrides were applied this meeting. All pools followed the standard pipeline rules.

---

## Section 8: Learnings

### What Worked

1. **Banker selection was excellent (72.7% top 3)** — the best rate of the season. The Adj Win% ranking correctly identified horses that placed in the frame 8 out of 11 times. The model's core ranking logic is sound.

2. **R5 MC hero call validated** — MC rated THOUSAND SPIRIT at 50.7% Win while the market had it at $15 (~6.7%). The horse won. This is the clearest MC-beats-market case this season.

3. **R7 pool coverage in small field** — the 6-horse Mode B pool naturally covered a 7-runner Group 2 field (6/7 horses). The approach to extend pool size in competitive races works.

4. **Report's Strategy B win-odds rule worked on R1** — adding #9 RAPID PHANTOM ($8.5, MC Place% 9.3%) via the win-odds replacement captured a $297 Trio that Strategy A's model-pure pool missed.

### What Didn't Work

1. **Mode A tight pools (5 horses) failed systematically** — 7 of 8 Mode A races were Pattern B misses (banker hit, pool gap). A 5-horse pool consistently missed the 3rd placer. The model correctly finds the top 2 but not the top 3.

2. **雙膽拖 produced false economy** — R2, R3, R4, R11 used 雙膽拖 (3 combos, $30) to save money. All missed. The $120 "saved" across 4 races meant nothing because the tight legs (only 3) had even less coverage. Meanwhile, Strategy B's wider legs caught R1 and R6.

3. **MC completely misjudged Group 2 milers (R9)** — both MC co-favourites (#12 PATCH OF THETA, #13 FLAMING FERRARI) failed. Winner LUCKY SWEYNESSE was MC #5 (4.2%). The model struggles with international-class mile races where form lines cross jurisdictions.

4. **Single profitable hit impossible with $1.0 favourite** — R7's $32 Trio on a $100 stake means the ONLY hit this meeting lost money. When the banker is a prohibitive favourite, the Trio dividend compresses below the staking threshold.

5. **SCMP form data didn't prevent exclusions** — R3's #7 BIG RETURN had a positive SCMP comment but was excluded from Strategy A because MC Place% was 19.5% (just under 20%). A 0.5% margin cost a $1,062 Trio.

### Strategy Adjustments

- [ ] **Expand Mode A from 5 to 6 horses** — Pattern B dominated at 70% of misses. The 5th-ranked horse by Adj Place% is consistently the one that's missing. Adding one more leg costs $40/race but would have captured R1, R3, R6 (combined $1,581 in Trios).
- [ ] **Reduce 雙膽拖 usage** — 0/4 雙膽拖 bets hit this meeting. The cost saving is illusory when the 3-leg restriction halves pool coverage. Prefer 膽拖 with wider legs.
- [ ] **Lower MC Place% inclusion threshold from 20% to 18%** — R3's #7 (MC Place% 19.5%) missed the cut by 0.5%. A lower threshold would capture borderline horses that frequently place.
- [ ] **Cap prohibitive favourite Trio stakes** — when the banker is $2.0 or shorter, the expected Trio dividend may not cover a $100 stake. Consider $50 max stake when banker odds < $2.0.
- [ ] **Review Group 2+ mile race approach** — R9 showed the MC model struggles with elite-level milers. Consider using market-only pools (no MC banker) for G1/G2 1600m+ races.

---

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | 8 (R1,R2,R3,R4,R5,R7,R10,R11) | 1/8 (R7) | $400 | $32 | −$368 | −92.0% |
| MEDIUM-HIGH | 1 (R8) | 0/1 | $60 | $0 | −$60 | −100.0% |
| MEDIUM | 2 (R6,R9) | 0/2 | $160 | $0 | −$160 | −100.0% |
| **TOTAL** | **11** | **1/11** | **$620** | **$32** | **−$588** | **−94.8%** |

HIGH confidence produced the only hit (R7) but still returned −92.0% ROI. Every confidence tier was deep in the red. The issue is structural (tight pools), not confidence calibration.

---

## Section 10: Running Total (Season Cumulative)

### 10a. Meeting-by-Meeting P&L (Strategy A)

| Meeting | Date | Venue | Races | Hits | Staked | Returned | P&L | ROI |
|---------|------|-------|-------|------|--------|----------|-----|-----|
| 1 | 19 Feb 2026 | ST | 11 | 4 | $860 | $875 | +$15 | +1.7% |
| 2 | 22 Feb 2026 | ST | 10 | 4 | $1,160 | $420 | −$740 | −63.8% |
| 3 | 25 Feb 2026 | HV | 9 | 2 | $1,000 | $130 | −$870 | −87.0% |
| 4 | 1 Mar 2026 | ST | 11 | 5 | $1,200 | $4,169 | +$2,969 | +247.4% |
| 5 | 4 Mar 2026 | HV | 9 | 2 | $1,050 | $501 | −$549 | −52.3% |
| 6 | 8 Mar 2026 | ST | 11 | 2 | $1,410 | $694 | −$716 | −50.8% |
| 7 | 11 Mar 2026 | HV | 8 | 1 | $900 | $446 | −$454 | −50.4% |
| 8 | 15 Mar 2026 | ST | 11 | 2 | $1,060 | $290 | −$770 | −72.6% |
| 9 | 29 Mar 2026 | ST | 11 | 2 | $800 | $299 | −$501 | −62.6% |
| 10 | 1 Apr 2026 | ST | 9 | 1 | $440 | $263 | −$177 | −40.2% |
| **11** | **6 Apr 2026** | **ST** | **11** | **1** | **$620** | **$32** | **−$588** | **−94.8%** |
| **TOTAL** | | | **111** | **26** | **$10,500** | **$8,119** | **−$2,381** | **−22.7%** |

### 10b. Cross-Meeting Banker Performance (Strategy A)

| Meeting | Banker Top 3 (individual) | Rate |
|---------|--------------------------|------|
| 29 Mar ST | 7/11 | 63.6% |
| 1 Apr ST | 6/14 | 42.9% |
| **6 Apr ST** | **8/11** | **72.7%** |

### 10c. Venue Breakdown (Strategy A, cumulative)

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI |
|-------|----------|-------|------|--------|----------|-----|-----|
| Sha Tin | 8 | 85 | 21/85 | $7,550 | $7,042 | −$508 | −6.7% |
| Happy Valley | 3 | 26 | 5/26 | $2,950 | $1,077 | −$1,873 | −63.5% |
| **Total** | **11** | **111** | **26/111** | **$10,500** | **$8,119** | **−$2,381** | **−22.7%** |

### 10d. Season Trajectory (Strategy A, cumulative through 6 Apr)

| Metric | Through 15 Mar | Through 29 Mar | Through 1 Apr | **Through 6 Apr** | Trend |
|--------|----------------|----------------|---------------|-------------------|-------|
| Hit rate | 22/80 = 27.5% | 24/91 = 26.4% | 25/100 = 25.0% | **26/111 = 23.4%** | Declining ↘ |
| Cumulative P&L | −$1,115 | −$1,616 | −$1,793 | **−$2,381** | Deeper drawdown ↘ |
| Cumulative ROI | −12.9% | −17.1% | −18.1% | **−22.7%** | Worse ↘ |
| Session ROI | — | −62.6% | −40.2% | **−94.8%** | Worst session ↘ |

### 10e. Cumulative A/B Comparison

| Meeting | Date | Venue | A Hits | A P&L | A ROI | B Hits | B P&L | B ROI | Winner |
|---------|------|-------|--------|-------|-------|--------|-------|-------|--------|
| 1–8 | Feb–15 Mar 2026 | ST/HV | 22/80 | −$1,115 | −12.9% | *N/R* | *N/R* | *N/R* | — |
| 9 | 29 Mar 2026 | ST | 2/11 | −$501 | −62.6% | 2/11 | −$1,171 | −79.7% | **A** |
| 10 | 1 Apr 2026 | ST | 1/9 | −$177 | −40.2% | 2/9 | −$860 | −71.7% | **A** |
| **11** | **6 Apr 2026** | **ST** | **1/11** | **−$588** | **−94.8%** | **3/11** | **−$379** | **−40.8%** | **B** |
| **A TOTAL (1–11)** | | | **26/111** | **−$2,381** | **−22.7%** | | | | |

| Cumulative Metric | Strategy A (meetings 1–11) | Strategy B (Meetings 9–11) | Note |
|-------------------|---------------------------|---------------------------|------|
| Total races | 111 | 31 | B history incomplete (meetings 1–8 not tracked) |
| Hits (rate) | 26/111 (23.4%) | 7/31 (22.6%) | Nearly identical hit rate |
| Total staked | $10,500 | $3,600 | B stakes ~2.4× more per race |
| Total returned | $8,119 | $1,190 | |
| **P&L** | **−$2,381** | **−$2,410** | |
| **ROI** | **−22.7%** | **−66.9%** | A structurally better due to lower stakes |

**Narrative:** A remains the better strategy in ROI terms (−22.7% vs −66.9%) over the tracked window. However, this meeting was B's best session (−40.8% ROI vs −94.8% for A), driven by B's win-odds replacement rule capturing R1 and R6. The cumulative A/B data is starting to suggest A's advantage is primarily **cost efficiency** (lower stakes) rather than superior pool construction. B's wider pools find more Trios but at higher cost.

---

## Section 11: A/B Strategy Comparison

### 11a. Strategy B derivation

For each race: sort by raw **MC Win%** descending. Primary legs are horses with **MC Place% > 20%**. Win-odds candidates (MC Place% ≤20% AND Win odds < 10) replace the weakest primary leg (MC Place% 20–30% AND Win odds > 10) or are added directly if no such replaceable leg exists. Banker = MC #1. 膽拖 structure with variable pool size per replacement count.

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | A Banker | Strat B Pool | B Banker | Result (1→2→3) | A Hit? | B Hit? | Trio $ | A Ret | B Ret | A Stake | B Stake | Key Difference |
|------|-------------|----------|-------------|----------|----------------|--------|--------|--------|-------|-------|---------|---------|----------------|
| R1 | 1,2,12,10,4 | #1 | 1,2,12,4,9 | #1 | 12→1→9 | ❌ | **✅** | $297 | $0 | $297 | $60 | $60 | **B added #9 via win-odds; A had #10 instead** |
| R2 | 8,5,10,1,11 | #8 | 8,5,10,1,11 | #8 | 14→1→10 | ❌ | ❌ | — | $0 | $0 | $30 | $60 | Same pool; A used 雙膽 ($30), B 膽拖 ($60) |
| R3 | 1,2,3,8,13 | #1 | 1,2,3,8,5 | #1 | 7→8→1 | ❌ | ❌ | $1,062 | $0 | $0 | $30 | $60 | A has #13, B has #5; neither has #7 |
| R4 | 3,1,2,8,5 | #3 | 3,1,2,8 | #3 | 14→3→9 | ❌ | ❌ | — | $0 | $0 | $30 | $30 | Similar pools; neither has #14 or #9 |
| R5 | 3,1,8,12,10 | #3 | 3,1,8,12,7,14 | #3 | 3→14→6 | ❌ | ❌ | — | $0 | $0 | $60 | $100 | B has #14 (2nd) but not #6 (3rd) |
| R6 | 1,2,4,5,3 | #1 | 1,2,4,8,12 | #1 | 4→1→12 | ❌ | **✅** | $222 | $0 | $222 | $60 | $60 | **B has #12 (3rd); A has #5,#3 instead** |
| R7 | 1,4,7,5,2,3 | #1 | 1,4,5,7,2,3 | #1 | 1→2→3 | **✅** | **✅** | $32 | $32 | $32 | $100 | $100 | Same pool & banker |
| R8 | 1,6,10,2,4 | #1 | 1,10,2,6,4,8 | #1 | 2→4→6 | ❌ | ❌ | — | $0 | $0 | $60 | $100 | Same banker fail; B wider but doesn't help |
| R9 | 12,13,5,9,8,3 | #12 | 12,13,5,9,3,8,1 | #12 | 3→8→1 | ❌ | ❌ | — | $0 | $0 | $100 | $150 | B has #1 (3rd) but banker fail |
| R10 | 8,10,4,9,1 | #8 | 8,4,10,9,5 | #8 | 6→4→8 | ❌ | ❌ | — | $0 | $0 | $60 | $60 | B drops #1 for #5; neither has #6 |
| R11 | 3,2,5,4,1 | #3 | 3,2,5,4,7,6,10 | #3 | 4→3→9 | ❌ | ❌ | — | $0 | $0 | $30 | $150 | B much wider (7 legs) but still misses #9 |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (Report MC-based) | Delta (B − A) |
|--------|---------------------------|------------------------------|---------------|
| Races played | 11 | 11 | 0 |
| Hits | 1/11 (9.1%) | 3/11 (27.3%) | +2 |
| Total staked | $620 | $930 | +$310 |
| Total returned | $32 | $551 | +$519 |
| **Net P&L** | **−$588** | **−$379** | **+$209** |
| **ROI** | −94.8% | −40.8% | +54.0 pp |
| Banker top 3 rate | 8/11 (72.7%) | 8/11 (72.7%) | 0 |

### 11d. Where A and B Diverged

| Race | What Differed | A Result | B Result | Impact |
|------|--------------|----------|----------|--------|
| R1 | Pool: A has #10 SEA DIAMOND, B has #9 RAPID PHANTOM (win-odds swap) | MISS ❌ | **HIT ✅** | B gained $297 (extra $0 cost) |
| R6 | Pool: A has #5 ALPHA STRIKE + #3 KANSAS, B has #8 LOOKING BRIGHT + #12 LUCKY CANDY | MISS ❌ | **HIT ✅** | B gained $222 (same $60 cost) |
| R5 | Pool: B wider (+#7, #14); B has #14 (2nd) but not #6 (3rd) | MISS ❌ | MISS ❌ | B $40 extra wasted |
| R9 | Pool: B wider (+#1); B has all 3 placers as legs but banker fail | MISS ❌ | MISS ❌ | B $50 extra wasted |
| R11 | Pool: B 7 legs vs A 3 legs; neither has #9 | MISS ❌ | MISS ❌ | B $120 extra wasted |

**Root causes of divergence:**
- **R1:** The win-odds rule correctly identified #9 RAPID PHANTOM ($8.5) as a market-backed debutant that MC undervalued (0.7% Win). This is the win-odds rule's strongest validation.
- **R6:** B's MC Place% criteria brought in different horses. #12 LUCKY CANDY's inclusion was driven by the report's specific replacement logic, not pure MC ranking.
- **R5, R9, R11:** B's wider pools added cost without converting — the missed horses were deep longshots neither approach could catch.

### 11e. Session Verdict

**Strategy B won this session by $209** (−$379 vs −$588, or −40.8% vs −94.8% ROI). The difference was driven by **two structural hits** (R1, R6) where B's win-odds replacement rule and different leg composition captured horses that Strategy A's tighter pool excluded. Both hits came at the **same stake level** ($60 each), so B's advantage was pure pool construction, not cost.

However, B also wasted $210 in extra stakes on wider pools (R5, R8, R9, R11) that didn't convert. The session result is **variance-amplified** — if either of B's two unique hits had missed (e.g., if #9 ran 4th in R1), B would have been worse than A. The win-odds replacement rule shows genuine value but needs a larger sample to confirm its edge.

**Notable:** A third "shadow" Strategy B approach — pure MC top 6 by Win% with no adjustments (10 combos × $10 = $100/race, all races) — would have hit R3 ($1,062 Trio) and R7 ($32) for a near-breakeven session: $1,094 returned on $1,100 staked = **−$6 P&L (−0.5% ROI)**. This approach captured R3 because #7 BIG RETURN was MC Win% rank 5 (1.7%), naturally included in the top 6 despite having MC Place% 19.5% — below the 20% threshold both A and B used. This suggests the MC Win% ranking alone may be a better pool selector than Place%-based cutoffs.

---

## Appendix: Pure MC Top 6 Performance (Shadow Strategy C)

For reference, the simplest possible Strategy B — top 6 by MC Win%, no adjustments, fixed 10 combos @ $10 = $100/race:

| Race | MC Top 6 Pool | Banker | Result | Hit? | Trio $ | Return |
|------|-------------|--------|--------|------|--------|--------|
| R1 | 1,2,11,12,10,4 | #1 | 12→1→9 | ❌ (#9 not in pool) | $297 | $0 |
| R2 | 8,5,10,1,11,9 | #8 | 14→1→10 | ❌ (banker fail + #14) | — | $0 |
| R3 | 1,2,3,13,7,8 | #1 | 7→8→1 | **✅** | $1,062 | $1,062 |
| R4 | 3,1,2,5,8,7 | #3 | 14→3→9 | ❌ | — | $0 |
| R5 | 3,1,8,12,10,9 | #3 | 3→14→6 | ❌ | — | $0 |
| R6 | 1,2,4,5,3,10 | #1 | 4→1→12 | ❌ (#12 not in pool) | $222 | $0 |
| R7 | 1,4,5,7,2,3 | #1 | 1→2→3 | **✅** | $32 | $32 |
| R8 | 1,10,2,6,4,8 | #1 | 2→4→6 | ❌ (banker fail) | — | $0 |
| R9 | 12,13,5,9,3,8 | #12 | 3→8→1 | ❌ (#1 not in pool) | — | $0 |
| R10 | 8,4,10,9,1,5 | #8 | 6→4→8 | ❌ (#6 not in pool) | — | $0 |
| R11 | 3,2,5,4,1,8 | #3 | 4→3→9 | ❌ (#9 not in pool) | — | $0 |
| **Total** | | | | **2/11** | | **$1,094** |

**Shadow C: 2/11 hits, $1,100 staked, $1,094 returned, −$6 P&L, −0.5% ROI.**

The R3 hit alone (Trio $1,062) nearly covered the entire session's $1,100 stake. This was possible because pure MC Win% ranking naturally includes horses that Place%-based criteria exclude. The simplest approach was the most profitable this session.

---

*Report generated: 6 April 2026. Next meeting review will carry forward this cumulative data.*
