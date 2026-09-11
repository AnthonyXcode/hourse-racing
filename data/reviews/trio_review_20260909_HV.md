# Trio Post-Race Review — Happy Valley | 2026-09-09

*First meeting produced end-to-end by the scheduled `trio-daily-run` agent loop (8 races, 8 agents).*

## Summary

| Metric | Value |
|--------|-------|
| Races played | **8 (R1–R8)** |
| Hit rate | **0/8 (0.0%)** |
| Total staked | $640 |
| Total returned | $0 |
| **Net P&L** | **−$640** |
| **ROI** | **−100.0%** |
| Session Result | **LOSS** |

A total wipeout for Strategy A — the first 0-for-meeting in the record. The banker rule, not
pool construction, is the headline: **4 of 8 bankers missed the top 3**, and every one of those
races was dead the moment the banker was beaten. But the deeper and more actionable finding is
in the other four races, where the banker *did* place and the ticket still lost.

---

## Section 2: Race-by-Race Cross-Reference

| Race | Class | Mode | Banker | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|--------|------|----------------|------|--------|--------|-----|-------------|
| R1 | Cl5 1200 | A (1膽+4腳) | #7 | 6,9,5,10 | **12**→**11**→5 | MISS ❌ | $1,074 | $0 | −$60 | Banker fail (#7 7th) + pool gap ×2 (#12 MC6, #11 MC11) |
| R2 | Cl4 1650 | A (1膽+4腳) | #1 | 6,3,7,4 | 1→7→**10** | MISS ❌ | $2,460 | $0 | −$60 | Banker won; pool gap (#10 at 32, MC rank 10) |
| R3 | Cl5 1200 | B (1膽+5腳) | #1 | 10,8,4,2,3 | **6**→1→**11** | MISS ❌ | $1,552 | $0 | −$100 | Banker 2nd; pool gap ×2 (#6 at 49 won, #11 MC7) |
| R4 | Cl4 1650 | A (1膽+4腳) | #1 | 3,4,2,11 | **10**→4→**6** | MISS ❌ | $535 | $0 | −$60 | Banker fail (#1 9th) + pool gap ×2 (#10 MC8, #6 MC7) |
| R5 | Cl3 1650 | B (1膽+5腳) | #10 | 1,8,4,6,3 | 10→**9**→3 | MISS ❌ | $2,774 | $0 | −$100 | Banker won at 17-1; **single pool gap (#9, MC rank 7)** |
| R6 | Cl4 1000 | B (1膽+5腳) | #2 | 6,5,1,3,4 | 6→3→5 | MISS ❌ | $197 | $0 | −$100 | **Banker fail — all 3 placers were in the legs** (#2 12th at 2.6) |
| R7 | Cl4 1200 | B (1膽+5腳) | #2 | 4,1,3,6,5 | 1→2→**12** | MISS ❌ | $344 | $0 | −$100 | Banker 2nd; pool gap (#12 at 7.1, MC rank 7) |
| R8 | Cl3 1200 | A (1膽+4腳) | #2 | 1,10,3,11 | 11→**4**→1 | MISS ❌ | $316 | $0 | −$60 | Banker fail (#2 6th) + pool gap (#4 at 4.2, MC rank 8) |

Bold = horse **not** in the Strategy A pool.

---

## Section 3: Hits Analysis

**None.** First zero-hit meeting on record.

The closest call was **R5**, which failed by exactly one horse. Banker #10 FORTUNATE SON — the
17-to-1 shot the model loved and the market did not — **won the race**, vindicating the single
largest model-vs-market divergence of the meeting (MC flagged it undervalued by 215%). #3 CHINA
WIN, a leg, ran 3rd. The only horse missing was **#9 WINDLORD in 2nd**, MC rank 7 at 16-1.
A 6-leg ticket instead of 5 would have returned **$2,774 on a $150 stake**.

Worth recording precisely because the model was *right* about the hard part and still lost.

---

## Section 4: Miss Classification

| Pattern | Count | Races |
|---------|-------|-------|
| **A — Banker fail, all 3 placers in legs** | 1 | R6 |
| **B — Banker hit, pool gap** | 4 | R2, R3, R5, R7 |
| **C — Banker fail + pool gap** | 3 | R1, R4, R8 |

### Pattern A: R6 — the expensive one

Banker **#2 BEAUTY SHOW**, the 2.6 favourite and MC #1 at 31.2% win / 69.9% place,
finished **12th of 12**. Result 6→3→5 — **all three were legs in the Strategy A pool.**
Any structure without a banker would have collected. Missed return: **$197** (a small
dividend, but a free one).

There is a second lesson buried here, and the pre-race report called it in advance.
Strategy B-trio's mandated Win-odds swap removed **#3 SUPERB KING** (MC place 24.1%, 14-1)
in favour of #9 (MC place 5.5%, 7.6). The R6 report flagged the swap as value-destroying
before the race — *"#3 SUPERB KING has filled the frame 9 times from 12 Valley starts…
the MC's 24.1% may well be the better number than the market's 14.0"*. **#3 finished 2nd.**
The rule was applied exactly as written and it was wrong.

### Pattern B: R2, R3, R5, R7 — the dominant pattern

Banker placed; one or two excluded horses filled the frame. MC rank of the missing horses:

| Race | Missing | MC rank | SP | Finished |
|------|---------|---------|-----|----------|
| R2 | #10 | 10 | 32 | 3rd |
| R3 | #6 / #11 | 9 / 7 | 49 / 6.9 | 1st / 3rd |
| R5 | #9 | **7** | 16 | 2nd |
| R7 | #12 | **7** | 7.1 | 3rd |

**Pattern B at 4/8 is the structural signal: the pool is one horse too tight.**

### Pattern C: R1, R4, R8 — double failure

Both the banker failed and the pool leaked. R8 is the most instructive: **#4 TYCOON RESOURCES
was the market's 2nd choice at 4.2 and MC rank 8** (10.2% place) — a 93% model-vs-market
disagreement that the market won. Strategy B-trio's Win-odds rule caught it; Strategy A did not.

---

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R1 | 1膽+4腳 $60 | Any realistic pool | ❌ (#11 was MC 11th of 12) | — |
| R2 | 1膽+4腳 $60 | Any realistic pool | ❌ (#10 was MC 10th at 32) | — |
| R3 | 1膽+5腳 $100 | +#11 (MC 7) as 6th leg | ❌ (#6 also missing, MC 9 at 49) | +$50 |
| R4 | 1膽+4腳 $60 | Any realistic pool | ❌ (banker 9th) | — |
| R5 | 1膽+5腳 $100 | **+#9 (MC 7) as 6th leg** | ✅ **$2,774** | +$50 |
| R6 | 1膽+5腳 $100 | **Full box C(6,3)** | ✅ **$197** | +$100 |
| R7 | 1膽+5腳 $100 | **+#12 (MC 7) as 6th leg** | ✅ **$344** | +$50 |
| R8 | 1膽+4腳 $60 | Any (banker 6th) | ❌ | — |

**Fixable misses:** R5, R7 (one extra MC-ranked leg) and R6 (drop the banker). Combined
recoverable return **$3,315** for **+$200** of extra stake.

**Unfixable misses:** R1, R2, R3, R4, R8 — genuine upsets or deep-longshot frames
(#11 at MC rank 11 of 12, #10 at 32-1, #6 at 49-1) plus two outright banker failures.

### The headline what-if

Adding **one extra leg — simply the next MC-ranked horse not already in the pool** — to every
Strategy A ticket:

| | Strategy A as bet | A + 1 extra MC leg |
|---|---|---|
| Hits | 0/8 | **2/8** |
| Staked | $640 | $1,000 |
| Returned | $0 | **$3,118** |
| **P&L** | **−$640** | **+$2,118** |
| **ROI** | **−100.0%** | **+211.8%** |

⚠️ **Treat this number with suspicion.** It is a one-meeting retrofit chosen with full knowledge
of the results, and its entire margin comes from a single $2,774 dividend in R5. The
*directional* finding — Pattern B at 4/8, missing horses clustering at MC rank 7 — is real and
consistent with the pool being too tight. The +211.8% is not a forecast. It needs a backtest
across meetings before any rule changes.

---

## Section 6: Key Moments

- **Best Bet** — none landed. The best *call* was R5's banker #10 FORTUNATE SON: MC had it #1
  at 18.5% against a 17-1 market price and it won.
- **Worst Bet** — R6. $100 on a pool that contained all three placers, lost because the 2.6
  favourite ran last of 12.
- **Most Frustrating** — R5. The model won the hard argument (a 17-1 banker), and the ticket
  died on #9 WINDLORD, one rank outside the pool, costing a $2,774 return.
- **Biggest Surprise** — R6 #2 BEAUTY SHOW, 2.6 favourite and MC #1 on both metrics,
  beaten 12th of 12. No pre-race flag anywhere in the pipeline.
- **Best MC Call** — R5 #10 (undervalued by 215%, won). **Worst MC Call** — R8 #4 TYCOON
  RESOURCES, MC rank 8 and dismissed at 10.2% place, ran 2nd at 4.2. The market was right.

---

## Section 7: Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 2 | R2, R5 |
| Banker 2nd–3rd | 2 | R3, R7 |
| Banker out of top 3 | 4 | R1 (7th), R4 (9th), R6 (12th), R8 (6th) |

**Banker strike rate (top 3): 4/8 = 50.0%** · **Banker win rate: 2/8 = 25.0%**

Every banker was MC #1. 50% is better than 06-Sep's 33.3% but far below the ~82% top-3 rate
the always-banker rule is calibrated on.

**The regenerated season statistics settle this question.** Across
`data/static/mc_top1_place_hit_rate_by_segment_20260910.md` — **359 race legs over 36 meetings** —
MC #1 receives a place dividend just **51.0%** of the time (HV 53.7%, ST 49.3%).

That reframes this meeting entirely. **50% was not bad luck — it was the model performing
exactly to its long-run average.** The always-banker rule is not misfiring occasionally; it is
built on an assumption (~82%) that the model has never met over 359 legs. Every 膽拖 structure
in the pipeline inherits a roughly coin-flip failure at its single point of failure, before
leg selection is even considered.

This is the single most important number in the review, and it is a *structural* finding, not
a variance one.

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | 1/8 (R6 — banker failed) |
| Banker in top 3 | 4/8 |
| At least 2 placers in pool | 7/8 |
| Banker hit + pool gap | 4/8 |

Coverage is not far off — 7 of 8 races had two of three placers. The tickets keep dying on
the third horse.

### 7c. MC-Market Divergence Outcomes

| Race | Divergence | Who was right |
|------|-----------|---------------|
| R1 | MC #7 undervalued 184% (8.0) | ❌ Market (7th) |
| R2 | MC #1 undervalued 109% (4.6) | ✅ MC (won) |
| R3 | MC on #10/#8 vs market #7/#11 | ❌ Market (#11 3rd, #10 unplaced) |
| R5 | MC #10 undervalued 215% (17) | ✅ **MC (won)** |
| R6 | MC/market agree on #2 | ❌ Both (12th) |
| R7 | MC #2 undervalued 343% (13) | ✅ MC (2nd) |
| R8 | MC dismisses #4 at 4.2 | ❌ **Market (#4 2nd)** |

**MC divergence accuracy: 3/7 = 42.9%.** No edge demonstrated this meeting. The two wins
were large (R5, R7) and the losses were cheap, which is the right shape — but the sample
is far too small to claim anything.

### 7d. SCMP +Excuses Flag Performance

| Race | Horse | Flag | Finished | Verdict |
|------|-------|------|----------|---------|
| R1 | #12 TEAM HAPPY | +excuses +2 (raced wide, blundered) | **1st** | ✅ |
| R1 | #11 VON BAER | +excuses +2 (steadied) | **2nd** | ✅ |
| R1 | #2 MARVEL AND GOLD | +excuses +2 | 8th | ❌ |
| R1 | #4 STORMY KNIGHT | +excuses +2 | 6th | ❌ |
| R1 | #3 FORTUNE SUPERNOVA | +excuses +2 | 11th | ❌ |
| R6 | #1 BLUE ILLUSION | +excuses | 5th | ❌ |

**+Excuses hit rate (top 3): 2/6 (33.3%).**

R1 deserves attention: the flag correctly identified **both** the winner and the runner-up
(#12 and #11) — and the +2 adjustment was **too small to lift either into the pool.**
#12 got to Adj Place% 12.8% and #11 to 7.0%; the Mode A cut was 45.5%. The signal fired
and the pool ignored it. That is a sizing problem, not a signal problem.

---

## Section 8: Learnings

### What Worked

- **The R5 banker call.** MC rated a 17-1 shot as the best horse in the race and it won.
  This is exactly the divergence the pipeline exists to find.
- **The R7 Win-odds swap (Strategy B-trio).** Swapping #5 PRESTIGE WIN (36-1) for
  #12 FORZA LEADER (7.1) produced the meeting's only hit, +$244.
- **Pre-race risk flagging was accurate.** R6's report predicted the swap would cost
  coverage and named #3 SUPERB KING specifically; #3 ran 2nd. R2's report named #9 as the
  ticket's biggest risk. R3 and R7 both flagged their bankers as speculative. The reports
  were honest about what could go wrong, and it did.
- **The scheduled agent loop delivered.** 8 races, 8 agents, complete reports before racing,
  no failures — the automation itself worked.

### What Didn't Work

- **The banker rule.** 4/8 failures, wiping out three races where the pool was otherwise fine.
  Two meetings running, banker top-3 is 41.2% against a ~82% assumption.
- **Mode A's 5-horse pool.** Used in R1, R2, R4, R8 — zero hits, and three of the four leaked
  a placer. Dominant classification is buying cheapness the strike rate cannot support.
- **The Win-odds swap rule, net.** Cost R6, gained R7. 1–1 and not yet demonstrably profitable.
- **The +excuses adjustment is too small.** R1 flagged the winner and runner-up and moved
  neither into contention.
- **Ignoring short-priced horses the MC hates.** R8 #4 at 4.2 (MC rank 8) ran 2nd.
  A 4.2 shot dismissed at 10.2% place is a claim that needs more evidence than the MC has.

### Strategy Adjustments

- [ ] **Backtest a 6-leg minimum** (drop Mode A's 5-horse pool) across all logged meetings.
      Do not adopt on this meeting alone.
- [ ] **Backtest the banker rule against a full-box alternative** at equal stake. At a
      **51.0% MC #1 place rate over 359 legs**, 膽拖 is very likely structurally wrong for this
      model — this is now the highest-priority open question, ahead of any leg-selection tuning.
- [ ] **Add a banker-confidence floor**: if MC #1's Adj Place% < 50%, or the field is Class 5
      / 1000m (highest-variance segments), consider a full box or pass.
- [ ] **Re-examine the Win-odds swap rule** — replace 1-for-1 swapping with pure addition.
      R6's forced swap is the clearest single-race case against it.
- [ ] **Raise the +excuses adjustment or make it a pool override** when the flag fires on a
      horse at Win odds < 10 (R1 #12 at 8.1 won).
- [ ] **Add a market-respect floor**: any horse at Win odds < 5 should be pool-eligible
      regardless of MC rank (R8 #4 at 4.2 ran 2nd from MC rank 8).
- [ ] **Fix the R3 quinella scraping bug** (see Data Quality below).

---

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| MEDIUM–HIGH | R1, R2, R4, R8 | 0 | $240 | $0 | −$240 | −100% |
| MEDIUM | R3, R6, R7 | 0 | $300 | $0 | −$300 | −100% |
| SPECULATIVE | R5 | 0 | $100 | $0 | −$100 | −100% |

No confidence level outperformed. Notably, the **speculative** ticket (R5) was the one that
came closest and had by far the largest available dividend — the pipeline's confidence
labelling showed no discriminating power this meeting.

---

## Section 10: Running Total (Season Cumulative)

### 10a. Meeting-by-Meeting P&L

| Meeting | Date | Venue | Races | Hits | Staked | Returned | P&L | ROI |
|---------|------|-------|-------|------|--------|----------|-----|-----|
| 1 | 2026-09-06 | ST | 9 | 2 | $870 | $791 | −$79 | −9.1% |
| **2** | **2026-09-09** | **HV** | **8** | **0** | **$640** | **$0** | **−$640** | **−100.0%** |
| **TOTAL** | | | **17** | **2** | **$1,510** | **$791** | **−$719** | **−47.6%** |

> **Note:** the 06-Sep review is internally inconsistent — its §10a records 6 races / 1 hit /
> $700 staked while its §10e records 9 races / 2 hits / $870. The §10e figures are carried
> forward here for continuity with the A/B table. Worth reconciling.

### 10b. Cross-Meeting Banker Performance

| Meeting | Banker Top 3 | Rate |
|---------|--------------|------|
| 2026-09-06 ST | 3/9 | 33.3% |
| **2026-09-09 HV** | **4/8** | **50.0%** |
| **Combined** | **7/17** | **41.2%** |

### 10c. Venue Breakdown

| Venue | Meetings | Races | Hits | Staked | Returned | P&L | ROI | Banker Top 3 |
|-------|----------|-------|------|--------|----------|-----|-----|--------------|
| Sha Tin | 1 | 9 | 2 | $870 | $791 | −$79 | −9.1% | 3/9 (33.3%) |
| **Happy Valley** | **1** | **8** | **0** | **$640** | **$0** | **−$640** | **−100.0%** | **4/8 (50.0%)** |

### 10d. Season Trajectory

| Metric | 2026-09-06 (M1) | **2026-09-09 (M2)** | Trend |
|--------|-----------------|---------------------|-------|
| Hit rate | 22.2% | **0.0%** | ↓↓ |
| Cumulative P&L | −$79 | **−$719** | ↓↓ |
| Cumulative ROI | −9.1% | **−47.6%** | ↓↓ |
| Banker top 3 | 33.3% | **50.0%** | ↑ |

### 10e. Cumulative A/B Comparison

| Meeting | Date | Venue | A Hits | A P&L | A ROI | B Hits | B P&L | B ROI | Winner |
|---------|------|-------|--------|-------|-------|--------|-------|-------|--------|
| 1 | 2026-09-06 | ST | 2/9 | −$79 | −9.1% | 2/9 | −$109 | −12.1% | A |
| **2** | **2026-09-09** | **HV** | **0/8** | **−$640** | **−100.0%** | **0/8** | **−$800** | **−100.0%** | **Tie** |
| **TOTAL** | | | **2/17** | **−$719** | **−47.6%** | **2/17** | **−$909** | **−53.5%** | **A** |

*B = review-spec Strategy B (MC top 6). See §11a for the naming collision with B-trio.*

| Cumulative Metric | Strategy A | Strategy B (review-spec) | Delta (B − A) |
|-------------------|-----------|--------------------------|---------------|
| Total meetings | 2 | 2 | — |
| Total races | 17 | 17 | 0 |
| Hits (rate) | 2/17 (11.8%) | 2/17 (11.8%) | 0 |
| Total staked | $1,510 | $1,700 | +$190 |
| Total returned | $791 | $791 | $0 |
| **Cumulative P&L** | **−$719** | **−$909** | **−$190** |
| **Cumulative ROI** | **−47.6%** | **−53.5%** | **−5.9 pp** |
| Banker top 3 rate | 7/17 (41.2%) | 7/17 (41.2%) | 0 |

Two meetings in, the season is **−$719 at −47.6% ROI**, and this meeting did the damage.
A and B remain separated only by stake sizing — they have still never diverged on a *selection*
under the review spec, because both anchor on MC #1 and both died on the same four bankers.
The A/B question is not the interesting one. **The structural finding is that MC #1 places
51.0% of the time across 359 logged legs, against a banker rule calibrated for ~82% — and no
pool-sizing choice on either side survives that gap.**

---

## Section 11: A/B Strategy Comparison

### 11a. Strategy B derivation and the naming collision

> **Two different things are called "Strategy B".** The *review* skill (§11a) defines it as
> **MC top 6, banker MC #1, 10 combos, $100 flat**. The *trio-strategy* skill defines its own
> Strategy B as **banker MC #1, legs = MC Place% > 20%, plus a Win-odds swap/add rule**, with
> variable stake. The reports actually generated — and therefore what was "bet" — use the
> trio-skill version. Both are reported below; the trio-skill version is labelled **B-trio**.
> This collision was first flagged in the 06-Sep review and is still unresolved in the skills.

### 11b. Race-by-Race A/B Table

| Race | A Pool | A Banker | B Pool (MC top-6) | B-trio Pool | Result | A | B | B-trio | Trio $ | A Stake | B Stake | B-trio Stake | Key Difference |
|------|--------|----------|-------------------|-------------|--------|---|---|--------|--------|---------|---------|--------------|----------------|
| R1 | 7,6,9,5,10 | #7 | 7,6,5,9,10,12 | 7,6,5,9,10,12,8 | 12→11→5 | ❌ | ❌ | ❌ | $1,074 | $60 | $100 | $150 | B/B-trio hold #12 (winner); #11 outside all |
| R2 | 1,6,3,7,4 | #1 | 1,6,3,7,4,9 | 1,6,3,7,4,9 | 1→7→10 | ❌ | ❌ | ❌ | $2,460 | $60 | $100 | $100 | #10 (32-1) outside all |
| R3 | 1,10,8,4,2,3 | #1 | 1,10,8,4,2,3 | 1,10,8,4,2,7,11,9,3 | 6→1→11 | ❌ | ❌ | ❌ | $1,552 | $100 | $100 | $280 | B-trio holds #11; #6 (49-1) outside all |
| R4 | 1,3,4,2,11 | #1 | 1,3,4,2,11,7 | 1,3,4,2,11,10 | 10→4→6 | ❌ | ❌ | ❌ | $535 | $60 | $100 | $100 | B-trio holds #10 (winner); banker 9th anyway |
| R5 | 10,1,8,4,6,3 | #10 | 10,8,1,6,4,3 | 10,8,1,6,4,3,5,2 | 10→9→3 | ❌ | ❌ | ❌ | $2,774 | $100 | $100 | $210 | **#9 outside all three** |
| R6 | 2,6,5,1,3,4 | #2 | 2,6,5,1,3,4 | 2,6,5,1,9 | 6→3→5 | ❌ | ❌ | ❌ | $197 | $100 | $100 | $60 | B-trio **swapped out #3** (2nd); banker failed regardless |
| R7 | 2,4,1,3,6,5 | #2 | 2,4,3,1,6,5 | 2,4,1,3,12,7 | 1→2→12 | ❌ | ❌ | **✅** | $344 | $100 | $100 | $100 | **B-trio's swap #5→#12 is the meeting's only hit** |
| R8 | 2,1,10,3,11 | #2 | 2,1,10,3,11,12 | 2,1,10,3,11,4 | 11→4→1 | ❌ | ❌ | ❌ | $316 | $60 | $100 | $100 | B-trio holds #4 (2nd); banker 6th anyway |

### 11c. A/B Summary

| Metric | Strategy A | Strategy B (MC top-6) | B-trio (as bet) |
|--------|-----------|----------------------|-----------------|
| Races played | 8 | 8 | 8 |
| Hits | 0/8 (0.0%) | 0/8 (0.0%) | **1/8 (12.5%)** |
| Total staked | $640 | $800 | $1,100 |
| Total returned | $0 | $0 | $344 |
| **Net P&L** | **−$640** | **−$800** | **−$756** |
| **ROI** | −100.0% | −100.0% | **−68.7%** |
| Banker top 3 | 4/8 (50.0%) | 4/8 (50.0%) | 4/8 (50.0%) |

### 11d. Where the strategies diverged

| Race | What differed | A | B-trio | Impact |
|------|--------------|---|--------|--------|
| R6 | B-trio swapped #3 → #9 | MISS | MISS | Swap was wrong (#3 ran 2nd) but banker failed, so **no P&L impact** |
| R7 | B-trio swapped #5 → #12 | MISS | **HIT** | **B-trio +$244** — the swap rule's one win |
| R8 | B-trio added #4 (odds 4.2) | MISS | MISS | Correct read (#4 2nd), wasted by banker failure |
| R4 | B-trio added #10 (odds 6.6) | MISS | MISS | Correct read (#10 won), wasted by banker failure |

The Win-odds rule made **four** correct market-respect calls (#12 R7, #4 R8, #10 R4, #12 R1) and
one bad one (#3 R6). **Three of the four correct calls were wasted because the banker failed.**

### 11e. Session Verdict

B-trio won the session on the only metric that paid — one hit, −$756 against A's −$640 on a
larger stake — but both are catastrophic and the difference is a single race. This was
**variance layered on a systematic problem**, not a strategy separation: all three variants
share the same banker in all 8 races, and the same 4 banker failures killed all three in
R1, R4, R6 and R8.

The genuinely useful finding is about the **Win-odds rule**, and it cuts against how it is
currently written. The rule's *market-respect* instinct was right four times out of five —
it repeatedly caught short-priced horses the MC had dismissed (#4 at 4.2, #10 at 6.6, #12 at 7.1)
and those horses kept filling frames. But its *swap* mechanism is destructive: in R6 it removed
a 24.1%-place horse that ran 2nd. **Addition good, replacement bad** — that is the single
clearest actionable result of this meeting.

---

## Data Quality

⚠️ **R3 quinella dividend scraped as `$1`** (`quinellaDividend: 1` in
`data/historical/results_20260909_HV.json`). The race was won by #6 at 49-1 with #1 at 4.8 in
2nd — the true quinella is certainly in the hundreds or low thousands, and the value looks
**truncated at a thousands comma**, exactly the failure mode the review skill warns about.
It does not affect any Trio calculation in this review, but the scraper should be fixed
before the value pollutes a backtest.
