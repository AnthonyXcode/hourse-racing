---
title: Trio leg coverage by MC rank — place rate per rank + top-half box
date: 2026-06-21
tags: [backtest, trio, mc-ranking, place-rate, banker]
status: confirmed
sample: 777 races | Sep 2025 – Jun 2026 | ST+HV | MC 5,000 iters
tools: [tools/backtest-place-by-mcrank.ts, tools/backtest-trio-tophalf.ts]
data: data/racecards/*, data/historical/results_*.json
---

## Question
For Trio leg selection: (a) how often does the horse at each MC win% rank finish
top 3, and (b) if we box the top half of the field (all legs, no banker), what is
the trio hit rate and ROI?

## Method
- Rank by MC win% (monteCarlo.ts:187). 777 races with results.
- (a) For each rank r, count how often that horse is in the actual top 3.
- (b) Pool = round(N/2) top MC horses, full box C(pool,3) @ $10. Hit = all 3
  placegetters inside the pool. ROI from result `trioDividend` (per $10 unit).

## Result

### (a) Place (top-3) hit rate by MC rank
| MC rank | races | hit rate | cum. top-3 captured (ranks 1..r) |
|---|---|---|---|
| 1 | 777 | 47.0% | 0.47 |
| 2 | 777 | 37.8% | 0.85 |
| 3 | 777 | 34.7% | 1.20 |
| 4 | 777 | 30.4% | 1.50 |
| 5 | 777 | 23.8% | 1.74 |
| 6 | 777 | 23.2% | 1.97 |
| 7 | 773 | 21.3% | 2.18 |
| 8 | 764 | 19.0% | 2.37 |
| 9 | 759 | 18.4% | 2.56 |
| 10 | 747 | 12.7% | 2.68 |
| 11 | 721 | 16.5% | 2.85 |
| 12 | 675 | 10.8% | 2.96 |
| 13 | 312 | 7.7% | 3.03 |
| 14 | 293 | 9.2% | 3.13 |

### (b) Trio box over top-half MC runners (no banker) — hit 206/777 = 26.5%, ROI −36.1%
| N | legs | races | hit rate | combos | cost/race | ROI |
|---|---|---|---|---|---|---|
| 7 | 4 | 9 | 33.3% | 4 | $40 | −60.3% |
| 9 | 5 | 12 | 33.3% | 10 | $100 | −57.0% |
| 10 | 5 | 21 | 42.9% | 10 | $100 | −11.9% |
| 11 | 6 | 37 | 21.6% | 20 | $200 | −70.3% |
| 12 | 6 | 372 | 25.0% | 20 | $200 | −36.2% |
| 13 | 7 | 15 | 46.7% | 35 | $350 | −20.6% |
| 14 | 7 | 303 | 27.1% | 35 | $350 | −34.5% |
(N=6, 8 had 0 hits on tiny samples → −100%.)

## Interpretation
- MC rank is well-calibrated and monotonic through ~rank 10: #1 47% → #2 38% →
  #3 35% → #4 30% → #5/#6 ~23% place.
- **Leg value concentrates in ranks 1–6** — top-6 captures ~2.0 of 3 placegetters
  (cum 1.97). Ranks 7+ add ≤21% each; getting cum to 3.0 needs ~rank 13 (near-full field).
- Full top-half **box hits ~27% but loses ~36%** — combos ($200–350 on the dominant
  12/14-runner fields) outrun the trio dividends. This is the quantitative case for
  the skill's **banker** structure (cuts combos 40–57% for nearly the same coverage).

## Caveats
- MC 5,000 iters (engine default) vs 10,000 live; ~±1% run-to-run noise (hit 206 vs 207 across runs).
- Tail ranks (11–14) only appear in large/odd fields → small, noisy samples; ignore the up-wobbles.
- N=10 (−11.9%) and N=13 (−20.6%) look least-bad but n=21 and n=15 — not actionable alone.

## Recommendation (open)
- Test **banker(#1) + legs from ranks 2–6** (膽拖) on this pool — expected far better
  ROI than the box. Compare 5-leg vs 6-leg.
- Consider capping legs at MC rank ≤6; ranks 7+ rarely justify the added combos.

## Reproduce
```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/backtest-place-by-mcrank.ts --form=all --max-rank=14
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/backtest-trio-tophalf.ts --form=all --half=round
```
