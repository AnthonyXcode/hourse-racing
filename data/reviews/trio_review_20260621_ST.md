# Trio Post-Race Review — Sha Tin | 2026-06-21

Results: `data/historical/results_20260621_ST.json` (scraped HKJC, going GOOD, 11 races). Trio dividends cross-checked vs HKJC per-race pages.

## Section 1: Summary

| Metric | Value |
|--------|-------|
| Races played | **11 (R1–R11)** |
| Hit rate | **2/11 (18.2%)** |
| Total staked | $900 |
| Total returned | $3,312 |
| **Net P&L** | **+$2,412** |
| **ROI** | **+268.0%** |
| Session Result | **WIN** |

Profit driven entirely by R6 (#3 COME FAST banker, Trio $3,146).

## Section 2: Race-by-Race Cross-Reference

| Race | Class | Mode | Banker | Legs | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|--------|------|----------------|------|--------|--------|-----|-------------|
| R1 | C4 1000 | A | #8 | 7,5,13,10 | 5→7→**9** | MISS ❌ | 1196 | $0 | -$60 | Banker fail (#8 out) + pool gap (#9 @18) |
| R2 | C5 1400 | A | #2 | 9,8,7,13 | 2→9→**12** | MISS ❌ | 564 | $0 | -$60 | Banker hit, pool gap (#12 @26) |
| R3 | C4 1200 | B | #2 | 10,13,14,1,5 | **1**→5→**8** | MISS ❌ | 253 | $0 | -$100 | Banker fail (#2 out), #8 gap |
| R4 | C4 1200 | A | #3 | 2,11,6,9 | 2→3→11 | **HIT ✅** | 166 | $166 | +$106 | — |
| R5 | C4 1600 | A | #2 | 3,12,10,8 | 3→**4**→12 | MISS ❌ | 119 | $0 | -$60 | Banker fail (#2 out), #4 gap |
| R6 | C4 1400 | B | #3 | 8,5,6,12,4 | 3→12→4 | **HIT ✅** | 3146 | $3,146 | +$3,046 | — |
| R7 | G3 1400 | B | #9 | 2,10,3,8,6 | **6**→**1**→**7** | MISS ❌ | 3597 | $0 | -$100 | Banker fail + triple pool gap (upset) |
| R8 | C3 2000 | B | #8 | 4,6,11,2,5 | **10**→5→**1** | MISS ❌ | 10297 | $0 | -$100 | Banker fail + #10@64,#1 gaps (upset) |
| R9 | G3 1800 | A | #3 | 7,6,11,4 | **5**→3→11 | MISS ❌ | 1318 | $0 | -$60 | Banker hit, pool gap (#5 @5.3) |
| R10 | C3 1200 | B | #1 | 5,13,6,7,3 | 7→**4**→13 | MISS ❌ | 2394 | $0 | -$100 | Banker fail (#1 out), #4 gap (#7,#13 in legs) |
| R11 | C3 1400 | B | #10 | 2,4,11,6,3 | **14**→**9**→**1** | MISS ❌ | 5872 | $0 | -$100 | Banker fail + triple pool gap (upset) |

Note R10: #7 is in legs and finished 1st, but banker #1 finished out of top 3 and #4 (3rd→2nd) was not in pool — banker fail + pool gap.

## Section 3: Hits Analysis

**R4 — Trio $166** (2→3→11). Banker #3 OLDTOWN (MC Win 44.9%, Adj Place 76.4%) ran 2nd; legs #2 ABSOLUTE HEART (1st) and #11 MASTER PHOENIX (3rd) filled the frame. Dominant-race Mode A tight pool worked — all three came from the top of the MC ranking (ranks 1,2,3). Return $166 on $60 = +$106.

**R6 — Trio $3,146** (3→12→4). Banker #3 COME FAST FAY FAY (MC Win 27.8% — narrowly MC #1 over #8 27.5%) **won**; legs #12 QUICK CONTRIBUTION (2nd) and #4 GRAND PATCH (3rd) — both lower-ranked legs (MC ranks ~6 and ~5) at 12.0 and 32.0 odds. This is the meeting. Return $3,146 on $100 = +$3,046. **Critical:** the banker was #3 only because the duplicate-results-file bug was fixed earlier — the contaminated run banked #8, which finished out of the top 3.

## Section 4: Miss Classification

**Pattern A — Banker Fail, all 3 placers already in legs:** none. (No race had all three placers in the leg pool with only the banker failing.)

**Pattern B — Banker Hit, Pool Gap:** R2 (#2 won, #12 gap @26), R9 (#3 2nd, #5 gap @5.3). 2 races. Combined missed return: $564 + $1,318 = $1,882. R9 #5 BEAUTY JOY @5.3 was a market-fancied horse MC under-pooled.

**Pattern C — Banker Fail + Pool Gap:** R1, R3, R5, R7, R8, R10, R11 = 7 races. R7/R8/R11 were genuine upsets (winners/placers at 64, 47, 16+ odds outside any reasonable pool). R8 #10 CALL ME MAGNIFIQUE @64 (MC 0.2% win) → Trio $10,297.

## Section 5: What-If Analysis

| Race | Current | Alternative | Would Hit? | Cost Change |
|------|---------|-------------|------------|-------------|
| R2 | A 5-horse pool | add #12 (MC 1.6%, @26) | ✅ | +$ (wider) |
| R9 | A pool excl #5 | include #5 (market 5.3) | ✅ | A Mode A→B |
| R5 | banker #2 | #4 not in pool at all | ❌ | n/a (genuine) |
| R7/R8/R11 | — | full box | ❌ (deep longshots) | prohibitive |

- **Fixable misses:** R2, R9 (both market-signal pool gaps — #12@26 borderline, #5@5.3 clear). Recoverable $1,882, modest extra stake.
- **Unfixable:** R7 ($3,597), R8 ($10,297), R11 ($5,872) — genuine upsets, deep longshots; R1/R3/R5/R10 banker fails on competitive races.

## Section 6: Key Moments

- **Best Bet:** R6 — banker #3 won, Trio $3,146 carried the meeting to +268% ROI.
- **Worst Bet:** R7 (G3, $100 on low-conviction) — flagged LOW-MED, triple pool gap.
- **Most Frustrating:** R9 — banker #3 placed 2nd, two legs needed but #5 BEAUTY JOY (market 5.3) was left out of the tight Mode A pool. $1,318 missed.
- **Biggest Surprise:** R8 #10 CALL ME MAGNIFIQUE @64 win → Trio $10,297.
- **Best MC Call:** R6 — MC split #3/#8 at the top (27.8/27.5); the marginal #3 banker won. R4 — MC's top-3 (3,2,11 = ranks 1/2/3) filled the exact frame.

## Section 7: Model Calibration

### 7a. Banker Performance

| Result | Count | Races |
|--------|-------|-------|
| Banker 1st | 2 | R2, R6 |
| Banker 2nd-3rd | 2 | R4, R9 |
| Banker out of top 3 | 7 | R1, R3, R5, R7, R8, R10, R11 |

**Banker strike rate (top 3): 4/11 = 36.4%** | **Banker win rate: 2/11 = 18.2%** — a poor banker day (vs ~56% season norm).

### 7b. Pool Coverage

| Metric | Count |
|--------|-------|
| All 3 placers in pool (full hit) | 2/11 (R4, R6) |
| Banker + 2 legs (= full hit) | 2/11 |
| At least 2 placers in pool | 5/11 (R2, R4, R6, R9, R10) |
| Banker hit + pool gap | 2/11 (R2, R9) |

### 7c. MC-Market Divergence Outcomes

| Race | Divergence | Result |
|------|-----------|--------|
| R8 | Market fav #5 ENTHUSIUM @4.3; MC faded (16.8% plc) | ✅ MC right — #5 ran 4th-ish, but winner #10 @64 unforecast by either |
| R9 | Market fav #10 NAUTICAL @3.4; MC faded (9.8% plc) | ✅ MC right — #10 out of top 3 |
| R7 | MC top #9 @2.8; market #6 @4.1 | ❌ Market right — #6 LITTLE PARADISE won |
| R3 | Market fav #1 @2.9; MC mid | ❌ Market right — #1 won |

**MC divergence accuracy: 2/4 cases MC correct (50%).**

### 7d. SCMP +Excuses Flag Performance

| Race | Horse | +Excuses | Finished | Verdict |
|------|-------|----------|----------|---------|
| R6 | #12 QUICK CONTRIBUTION | +excuses | 2nd ✅ | ✅ |
| R10 | #7 CHICKEN DINNER | +trial/+excuses | 1st ✅ | ✅ |
| R1 | #13 COMET RADIANCE | +excuses | ~mid ❌ | ❌ |
| R7 | #6 LITTLE PARADISE | +excuses/+trial | 1st ✅ | ✅ |
| R9 | #6 CALIFORNIATOTALITY | +excuses | out ❌ | ❌ |

**+Excuses hit rate (top 3): 3/5 sampled (60%)** — #12 (R6) and #7 (R10) were materially correct calls; #6 (R7) won but was outside our banker.

### 7e. Divergence Override Assessment

No manual divergence override applied this meeting. The R6 banker selection (#3 over #8) was a *data-correction* effect (duplicate file removed), not a discretionary override — and it was decisive (loss → +$3,146).

## Section 8: Learnings

**What Worked**
- Mode A dominant-race tight pool nailed R4 (top-3 MC = exact frame).
- Banker #3 R6 — the clean MC re-run (post data-fix) put the eventual winner on top; the fix earned the meeting.
- +Excuses flags hit 3/5 (#12 R6, #7 R10, #6 R7).

**What Didn't Work**
- Banker top-3 only 36.4% — six of seven Pattern-C misses were banker fails on competitive/Group races.
- Tight Mode A pools dropped market-fancied placers: R9 #5 @5.3 (clear), R2 #12 @26 (borderline).
- Group races R7/R9 low yield — open fields, banker @2.8/14 didn't deliver.

**Strategy Adjustments**
- [ ] On Mode A races, force-include any non-pool horse with **market odds ≤ 6** even if Adj Place% below threshold (would have caught R9 #5 @5.3).
- [ ] Group 3 races (R7, R9): consider PASS or wider Mode C — banker hit 1/2 and both low ROI.
- [ ] Re-confirm no duplicate/contaminated historical files before each meeting's MC run (R6 lesson).

## Section 9: P&L by Confidence Level

| Confidence | Races | Hits | Staked | Returned | P&L | ROI |
|------------|-------|------|--------|----------|-----|-----|
| HIGH | R1,R2,R4,R5,R10 | 1 (R4) | $380 | $166 | -$214 | -56.3% |
| MEDIUM-HIGH | R8,R9 | 0 | $160 | $0 | -$160 | -100% |
| MEDIUM | R3,R6,R11 | 1 (R6) | $300 | $3,146 | +$2,846 | +948.7% |
| LOW-MEDIUM | R7 | 0 | $100 | $0 | -$100 | -100% |

The single MEDIUM hit (R6) carried the session; HIGH-confidence races returned only R4.

## Section 10: Running Total (Season Cumulative)

### 10a. This Meeting — Strategy A

| Date | Venue | Races staked | Hits | Staked | Returned | P&L | ROI |
|------|-------|--------------|------|--------|----------|-----|-----|
| **21 Jun 2026** | **ST** | **11** (0 PASS) | **2/11** | **$900** | **$3,312** | **+$2,412** | **+268.0%** |

_Full season cumulative tables: see prior reviews in `data/reviews/trio_review_*.md` and segment stats in `data/static/`. Prior meeting (13 Jun ST): A 1/11 -$413._

### 10e. This Meeting — A/B Comparison

| Strategy | Races | Hits | Staked | Returned | P&L | ROI |
|----------|-------|------|--------|----------|-----|-----|
| **A (pipeline)** | 11 | 2/11 | $900 | $3,312 | +$2,412 | +268.0% |
| **B (MC top-6)** | 11 | 2/11 | $1,100 | $3,312 | +$2,212 | +201.1% |

**Session winner (P&L):** **A (pipeline)** — same hits, lower stake (Mode A tight pools on dominant races).

## Section 11: A/B Strategy Comparison

### 11b. Race-by-Race A/B Table

| Race | Strat A Pool | A Banker | Strat B Pool (MC top 6) | B Banker | Result | A Hit? | B Hit? | Trio $ | A Ret | B Ret | A Stake | B Stake | Key Difference |
|------|-------------|----------|-------------------------|----------|--------|--------|--------|--------|-------|-------|---------|---------|----------------|
| R1 | 8,7,5,13,10 | #8 | 8,7,5,13,11,10 | #8 | 5→7→9 | ❌ | ❌ | 1196 | $0 | $0 | $60 | $100 | Same banker; B adds #11 |
| R2 | 2,9,8,7,13 | #2 | 2,9,8,7,13,10 | #2 | 2→9→12 | ❌ | ❌ | 564 | $0 | $0 | $60 | $100 | B adds #10; #12 gap both |
| R3 | 2,10,13,14,1,5 | #2 | 2,10,13,14,1,5 | #2 | 1→5→8 | ❌ | ❌ | 253 | $0 | $0 | $100 | $100 | Same; #8 gap both |
| R4 | 3,2,11,6,9 | #3 | 3,11,2,6,9,12 | #3 | 2→3→11 | ✅ | ✅ | 166 | $166 | $166 | $60 | $100 | Same core; both hit |
| R5 | 2,3,12,10,8 | #2 | 2,3,12,10,8,11 | #2 | 3→4→12 | ❌ | ❌ | 119 | $0 | $0 | $60 | $100 | #4 gap both |
| R6 | 3,8,5,6,12,4 | #3 | 3,8,6,5,4,12 | #3 | 3→12→4 | ✅ | ✅ | 3146 | $3,146 | $3,146 | $100 | $100 | Same set; both hit |
| R7 | 9,2,10,3,8,6 | #9 | 9,10,2,3,8,6 | #9 | 6→1→7 | ❌ | ❌ | 3597 | $0 | $0 | $100 | $100 | Same; upset both |
| R8 | 8,4,6,11,2,5 | #8 | 8,4,6,11,2,5 | #8 | 10→5→1 | ❌ | ❌ | 10297 | $0 | $0 | $100 | $100 | Same; upset both |
| R9 | 3,7,6,11,4 | #3 | 3,7,6,11,4,2 | #3 | 5→3→11 | ❌ | ❌ | 1318 | $0 | $0 | $60 | $100 | B adds #2; #5 gap both |
| R10 | 1,5,13,6,7,3 | #1 | 1,5,13,6,3,7 | #1 | 7→4→13 | ❌ | ❌ | 2394 | $0 | $0 | $100 | $100 | Same; #4 gap both |
| R11 | 10,2,4,11,6,3 | #10 | 10,2,4,11,6,3 | #10 | 14→9→1 | ❌ | ❌ | 5872 | $0 | $0 | $100 | $100 | Same; upset both |

### 11c. A/B Summary

| Metric | Strategy A (Full Pipeline) | Strategy B (MC Top 6) | Delta (B − A) |
|--------|---------------------------|----------------------|---------------|
| Races played | 11 | 11 | 0 |
| Hits | 2/11 (18.2%) | 2/11 (18.2%) | 0 |
| Total staked | $900 | $1,100 | +$200 |
| Total returned | $3,312 | $3,312 | $0 |
| **Net P&L** | **+$2,412** | **+$2,212** | **-$200** |
| **ROI** | +268.0% | +201.1% | -66.9 pp |
| Banker top 3 | 4/11 (36.4%) | 4/11 (36.4%) | 0 |

### 11d. Where A and B Diverged

No **outcome** divergence — A and B hit the same races (R4, R6) and missed the same. **Bankers identical every race** (MC #1 = Adj #1 throughout). Pools differed only in size (A Mode-A 5 vs B fixed 6) on R1, R2, R4, R5, R9 — the extra B leg never captured a placer, so B only added cost.

| Race | What Differed | A Result | B Result | Impact |
|------|--------------|----------|----------|--------|
| R1,R2,R5,R9 | B adds 6th MC leg | MISS | MISS | none (extra cost) |
| R4 | A 5-pool vs B 6-pool | HIT | HIT | same |

### 11e. Session Verdict

**Strategy A won on P&L (+$2,412 vs +$2,212)** — identical hits and returns, but A's Mode-A tight pools on the four dominant races (R1,R2,R4,R5) cost $60 vs B's flat $100, saving $200 with zero coverage loss. The result was **variance-driven** (one R6 hit at $3,146 swung the meeting positive for both), not a systematic edge gap. The A-only Mode-A sizing is the structural saver here; no A-only rule cost money this session because bankers never diverged from MC #1.
