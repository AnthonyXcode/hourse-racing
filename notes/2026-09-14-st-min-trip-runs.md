---
title: ST place bet — require 3+ past runs at the race distance (--min-trip-runs=3)
date: 2026-09-14
tags: [backtest, place-bet, differentiation, distance-form, sha-tin]
status: confirmed-directional
sample: 557 ST races (477 Turf, 80 AWT), 72 bets baseline, 31 bets recommended | Sep 2025 – Sep 2026 | Sha Tin
tools: [tools/backtest-differentiation.ts]
data: data/racecards/racecard_*_ST_R*.json, data/historical/results_*.json
---

## Question
Using only information known before the race (no win odds), how can the ST place bet on the
form #1 be improved from the current flags `--sparse=3 --close=3 --avgdiff=15 --gap=1 --form=all`?

## Method
- Universe: every ST racecard with a results file (557 races). Bet = PLACE on the form #1
  (`overallRating`). Place return = result place dividend; miss = −stake.
- Ran the backtest once per form source with every skip rule off, joined racecard features onto
  each race (draw, weight, days since last run, last-start finish, class/distance change, runs at
  the trip), and applied skip rules in memory.
- **Out-of-sample check:** train = Sep 2025 – Feb 2026, test = Mar 2026 onward.
- Grid over existing flags: sparse {2,3,4,off} × close {1,2,3,4,6,off} × avgdiff {10–18} ×
  gap {0,1,2,3,4,6} × ratingchange {off,−1,0} × mc-min {0,60–80} × surface {both,Turf,AWT}.
- "Trip runs" = past performances with `distance == race.distance` exactly, in the chosen
  `--form` source (any surface). `tripRunCount` in `src/backtest/differentiationBacktest.ts`.
- No odds used anywhere (no `--odds`, no favourite).

## Result
Baseline (current flags, venue ST): **43/72 = 59.7% placed, ROI −9.1%**
(Turf 33/52 −7.1%, AWT 10/20 −14.2%).

Breakdown of those 72 bets by runs at the trip:

| Past runs at race distance | Placed | Hit | ROI |
|---|---|---|---|
| 0 | 5/8 | 63% | −18.8% |
| 1–2 | 6/15 | 40% | −39.6% |
| 3+ | 32/49 | 65% | +1.9% |

Tuning existing flags alone does **not** generalise — settings chosen on train collapse on test:

| Chosen on train | Train | Test |
|---|---|---|
| best train ROI, no trip filter | 38/53 +10.8% | 25/61 −32.0% |
| best train ROI, trip runs ≥ 3 required | 24/30 +30.8% | 15/35 −30.3% |

`--min-trip-runs=3` improves every ST base tried, on both halves:

| ST base | Filter | Train | Test | Full |
|---|---|---|---|---|
| current flags (Turf+AWT) | — | 26/40 −2.2% | 17/32 −17.7% | 43/72 −9.1% |
| current flags (Turf+AWT) | trip ≥ 3 | 18/26 +6.2% | 14/23 −3.0% | 32/49 +1.9% |
| current flags, Turf | trip ≥ 3 | – | – | 22/31 +5.7% |
| B: Turf, s3 c4 a12 g4 r0 | — | 21/30 +0.3% | 15/21 +8.6% | 36/51 +3.8% |
| **B: Turf, s3 c4 a12 g4 r0** | **trip ≥ 3** | **15/19 +20.4%** | **9/12 +15.8%** | **24/31 +18.6%** |

Threshold sweep on base B (dose-response):

| --min-trip-runs | Bets | Placed | Hit | ROI |
|---|---|---|---|---|
| 0 | 51 | 36 | 70.6% | +3.8% |
| 1 | 44 | 31 | 70.5% | +6.0% |
| 2 | 40 | 29 | 72.5% | +10.3% |
| 3 | 31 | 24 | 77.4% | +18.6% |
| 4 | 21 | 16 | 76.2% | +20.8% |

Cross-venue check — HV Turf, current flags: 42/62 −2.8% → with trip ≥ 3: **29/45 −9.0%** (worse).

Other pre-race filters tried on the ST bases and **rejected**: weight < 130 lb (test swings to −32%),
top gap ≤ 10 and distance ≤ 1400 (train-only gains), same surface as last run and last run ≤ 60 days
(small, inconsistent effects). `--mc-min` does not discriminate on ST: 63 of 72 baseline bets are
already at MC Place% ≥ 80.

## Interpretation
- On ST the form #1 is unreliable when it has not proven itself at the exact trip: 1–2 runs at the
  distance placed only 6/15. Requiring 3+ runs removes those picks.
- The effect is monotonic in N (more trip runs → higher ROI), holds on both train and test for every
  base, and agrees with [MC#1 distance debutants](2026-06-21-mc1-distance-debutant-place.md)
  (trip-unproven MC#1 places less often). That makes it the most credible ST lever found.
- It is **ST-specific**: on HV it hurts. Keep HV on `--mc-min=75`
  ([HV Turf note](2026-09-14-hv-turf-market-agreement-gate.md)).
- Turf beats AWT on ST; the recommended setup is Turf only.

## Caveats
- **Small sample:** 31 bets in a season (about one per ST meeting); test half is 12 bets.
- Base B (`--close=4 --avgdiff=12 --gap=4 --ratingchange=0 --surface=Turf`) was picked by
  min(train, test) ROI, so its test numbers are optimistic. The trip filter itself is better
  supported: it lifts the unchanged current flags on both halves too (−9.1% → +1.9%).
- One season of racecards only.
- Trip runs count any surface at the same distance (a Turf 1200 and an AWT 1200 both count).

## Action taken
- Added `--min-trip-runs=N`: skip unless the bet pick has ≥ N past runs at the race distance.
  `tripRunCount` + skip in `runDifferentiationBacktest` (`src/backtest/differentiationBacktest.ts`),
  mirrored in `src/backtest/upcomingBetSuggestions.ts` and the API (`minTripRuns` in
  `src/server/routes/backtests.ts`). Off by default — no change to existing results.

## Recommendation (open)
- Paper-trade ST with the command below through the 2026/27 season before staking.
- Test a surface-specific count (Turf-only runs for Turf races) once the sample grows.
- If a second season confirms it, consider a small trip-experience weight in `formAnalysis.ts`
  for ST instead of a hard skip.

## Reproduce
```bash
# Recommended ST setup (24/31, +18.6%)
npx tsx tools/backtest-differentiation.ts --sparse=3 --close=4 --avgdiff=12 --gap=4 --ratingchange=0 --venue=ST --surface=Turf --form=all --min-trip-runs=3
# Train half only (15/19, +20.4%); test = full minus train
npx tsx tools/backtest-differentiation.ts --sparse=3 --close=4 --avgdiff=12 --gap=4 --ratingchange=0 --venue=ST --surface=Turf --form=all --min-trip-runs=3 --ignore-after=2026-03-01
# Current flags with the trip filter (32/49, +1.9%)
npx tsx tools/backtest-differentiation.ts --sparse=3 --close=3 --avgdiff=15 --gap=1 --venue=ST --form=all --min-trip-runs=3
```
