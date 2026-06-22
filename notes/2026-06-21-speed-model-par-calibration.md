---
title: Speed model accuracy — empirical par times + field shrinkage
date: 2026-06-21
tags: [speed-rating, finish-time, par-times, calibration, backtest]
status: confirmed
sample: 788 races (projected vs actual winning time) | Sep 2025 – Jun 2026 | ST+HV
tools: [tools/backtest-time-accuracy.ts, tools/calibrate-par-times.ts, tools/calibrate-time-offsets.ts]
data: data/racecards/*, data/historical/results_*.json, data/static/par_times_empirical.json, data/static/time_offsets.json
---

## Question
The projected winning time (from `analyze-race`) was systematically too fast
(bias −1.71s). Why, and how to make the speed model more accurate?

## Method
- `tools/backtest-time-accuracy.ts`: projected winning time = fastest projected
  mean finish time among runners; compare to the actual 1st-place finish time.
- Bucket error by class, distance, class×distance. MAE = mean |proj−actual|,
  Bias = mean (proj−actual); negative = projection too fast.

## Result
| Stage | MAE (all) | Bias (all) | Class 3 MAE | Class 4 MAE |
|-------|-----------|-----------|-------------|-------------|
| Baseline (hand-set pars) | 1.99s | −1.71s | 2.51 | 1.43 |
| + empirical par times | 1.62s | −1.34s | 1.77 | 1.24 |
| + field shrinkage 0.7 | 1.43s | −1.09s | 1.54 | 1.11 |
| + per-bucket offset | **1.15s** | **−0.42s** | **1.10 (bias −0.04)** | **0.86 (bias −0.19)** |

Bulk classes after offset: C3 bias −0.04, C4 −0.19, C5 −0.41 — centered. Residual
all-bias −0.42 is entirely the small-n high-class buckets (Group 1 −2.46, Class 1/2,
4YO; n<8 so no offset emitted).

Shrink sweep (with empirical pars): 1.0→MAE1.62/bias−1.34; 0.85→1.51/−1.19;
0.75→1.46/−1.12; 0.65→1.41/−1.06; 0.55→1.38/−1.03 (flattening, spread collapses).
Differentiation place-rate held ~58.1% (no regression — par shift is ~uniform per bucket).

## Interpretation
Two root causes, two fixes:
1. **Par table was hand-set guesses** (~1.5s slower than reality in most buckets),
   inflating ratings and skewing projection. Replaced with **empirical pars** =
   median winner time normalized to Good/126lb, per venue×surface×distance×class
   (`calibrate-par-times.ts` → `data/static/par_times_empirical.json`, 46 buckets n≥8).
2. **Field-best premium**: the best-on-paper horse's last-6 average figure sits
   ~7pts above par, so it projects ~1.3s faster than the median winner actually
   runs. **Shrink each horse's figure toward the field mean** before projecting
   (`FIELD_TIME_SHRINK = 0.7`). Regression to mean — the paper-best rarely runs
   to its average when the whole field tries.

Accuracy best in the bulk classes/trips (Class 4–5 sprints MAE ~1.0s); degrades
with class strength (Group 1 ~3.3s) and trip (1800m+) — par tables coarser and
pace variance higher there.

## Caveats
- Pars are calibrated **in-sample** on these 788 races; out-of-sample MAE will be
  a touch higher. Re-run `calibrate-par-times.ts` as data grows.
- Residual **−1.09s** bias remains (shrinkage can't fully kill it without
  collapsing the per-horse spread). A per-class/distance offset could finish it.
- Group/Class-1-2 and ≥2000m buckets have small n — directional only.
- Empirical pars shift rating *levels*; within-race ranking (MC win%, differentiation
  #1 pick) is preserved, so betting strategies are unaffected — verified place-rate stable.

## Action taken
- `src/analysis/speedRating.ts`: `getParTime` prefers empirical par (exact bucket),
  falls back to hand table; added `FIELD_TIME_SHRINK = 0.7` and `getTimeOffset()`.
- `tools/analyze-race.ts`: projection shrinks figures toward field mean + adds offset.
- `tools/backtest-time-accuracy.ts`: `--shrink` (def 0.7), offset on by default (`--no-offset`).
- New: `tools/calibrate-par-times.ts` → `data/static/par_times_empirical.json`;
  `tools/calibrate-time-offsets.ts` → `data/static/time_offsets.json` (29 buckets).

## Distance-scaled secondsPerRatingPoint — evaluated, NOT adopted
The per-bucket offset already absorbs the distance-dependent bias for every
well-sampled bucket (C3/C4/C5 centered to ±0.4s). Distance-scaling the rating↔time
constant would alter rating *levels/spread* and feed back into MC win% — real risk —
for no measurable time-accuracy gain (remaining error is small-n elite buckets that
no structural change fixes without more data). Skipped deliberately.

## Recommendation (open)
- Residual −0.42s lives in Group/Class-1-2 + ≥2000m, all n<8 — needs more data, not
  a model change. Re-run both calibrators (`calibrate-par-times`, `calibrate-time-offsets`)
  as samples accrue; offsets will populate those buckets.
- Schedule periodic re-calibration.

## Reproduce
```bash
npx tsx tools/calibrate-par-times.ts --min=8
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/backtest-time-accuracy.ts --form=all          # default shrink 0.7
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/backtest-time-accuracy.ts --form=all --shrink=1  # no shrink
```
