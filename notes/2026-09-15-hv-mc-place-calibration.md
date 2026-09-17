---
title: HV MC place% is over-confident at sd=11; sd=17 is calibrated and scores better on both halves
date: 2026-09-15
tags: [backtest, calibration, mc-simulation, place-bet, happy-valley, market-odds]
status: rejected
sample: 3,895 runners, 330 HV races (37 meetings) | Sep 2025 – Sep 2026 | HV (all Turf)
tools: [tools/backtest-place-calibration.ts]
data: data/racecards/racecard_*_HV_R*.json, data/historical/results_*.json
---

## Question
When `tools/analyze-race.ts` prints "NN% place" for an HV runner, how often does that horse
actually finish top 3? And does the MC performance std dev (11 at HV, `raceAnalysis.ts:371`)
explain any gap?

## Method
- Universe: every HV racecard with a results file, every runner, **no skip rules**.
- Predicted = MC `placeProbability` (share of 5,000 runs finishing top 3; live uses 10,000).
- Actual = placed per results file (dead-heat for 3rd counts as placed).
- Buckets of predicted place%, actual rate with 95% CI.
- Scores: Brier and log loss, over all runners and split early/late at the median meeting date
  (2026-02-11: early n=1,894, late n=2,001).
- Baselines: naive 3 / field size; market = Harville top-3 probability from normalised final
  win odds (runners where the whole field has odds, n=3,727).
- Swept MC `performanceStdDev` 11 / 14 / 17 / 20 / 24 with `--form=all`; 11 and 17 also with
  `--form=HV` (the `analyze-race` default without `-f all`).

## Result
Calibration at the live value (sd=11, `--form=all`):

| Tool shows | n | Actually placed |
|---|---|---|
| 0–10% | 745 | 10.3% |
| 10–20% | 1,047 | 19.7% |
| 20–30% | 807 | 25.4% |
| 30–40% | 547 | 31.8% |
| 40–50% | 359 | 37.0% |
| 50–60% | 201 | 43.8% |
| 60–70% | 111 | 49.5% |
| 70–75% | 44 | 59.1% |
| 75–90% | 34 | 29/34 = 85.3% |

MC #1 (by win%): shows 60.6%, placed 162/330 = 49.1%; market gave the same horses 51.2%.

Std dev sweep (`--form=all`, Brier lower = better):

| sd | Brier all | early | late | log loss | MC #1 shown → actual | Form #1 with MC ≥ 75 |
|---|---|---|---|---|---|---|
| 11 (live) | 0.1782 | 0.1803 | 0.1761 | 0.5502 | 60.6% → 49.1% | 29/34 |
| 14 | 0.1760 | 0.1778 | 0.1742 | 0.5437 | 53.9% → 49.7% | 3/3 |
| **17** | **0.1755** | **0.1772** | **0.1739** | **0.5427** | **49.1% → 50.0%** | 1/1 |
| 20 | 0.1761 | 0.1777 | 0.1746 | 0.5444 | 45.6% → 51.2% | 0/0 |
| 24 | 0.1770 | 0.1783 | 0.1757 | 0.5469 | 42.3% → 49.4% | 0/0 |

Calibration at sd=17 (`--form=all`): every bucket 0–60% is within 2pt of actual
(e.g. 40–50%: 322 runners, 44.1% shown, 43.5% placed). 60–70%: 31 runners, 62.7% shown, 83.9% placed.

HV-only form (`--form=HV`):

| sd | Brier all | early | late | MC #1 shown → actual | Form #1 with MC ≥ 75 |
|---|---|---|---|---|---|
| 11 | 0.1827 | 0.1852 | 0.1803 | 63.0% → 49.1% | 32/47 = 68.1% |
| 17 | 0.1781 | 0.1802 | 0.1762 | 50.8% → 51.2% | 1/1 |

Baselines (same for every sd): naive 3/field Brier 0.1896; market 0.1589.

## Interpretation
- At sd=11 the HV place% is **over-confident**. Above ~35% it overstates the real rate by 5–15pt,
  and below 20% it understates it by ~5pt. The simulated races have too little randomness, so the
  model's favourites look safer than they are.
- **sd=17 fixes calibration** up to 60% and gives the best Brier on the early and the late half
  alike, so it is not an artefact of picking on one period. sd 14–20 are all close.
- Bigger sd does not improve *ranking* much: Brier 0.1782 → 0.1755, while the market is 0.1589.
  The model's place% is a weaker predictor than the final odds whatever the sd.
- The top of the sd=11 scale is the exception: shown ≥ 75% placed 85%. Those are the same ~30
  strongest horses that land in the 60–70% bucket at sd=17 (83.9%). The `--mc-min=75` gate
  ([2026-09-14-hv-turf-market-agreement-gate.md](2026-09-14-hv-turf-market-agreement-gate.md))
  works because it catches these horses, and its threshold is tied to sd=11.
- `-f all` form is better calibrated and better scored than HV-only form at both sd values. With
  HV-only form, the ≥ 75 gate drops to 32/47 = 68.1%. Use `-f all` when reading place% or applying
  the gate.

## Caveats
- One season of racecards; the sd was picked on the same data (early/late split agrees, but both
  halves are in-sample for the sweep as a whole).
- MC is unseeded, 5,000 runs in the backtest vs 10,000 live. This adds noise to single-horse
  percentages, not bias.
- Market baseline uses final win odds, which are not known at bet time; it flatters the market
  a little. Harville also ignores the known favourite–longshot bias.
- Buckets above 60% at sd ≥ 14 hold < 35 runners, so the CIs are wide.
- HV only. ST (sd=8) was not tested.

## Action taken
- **Rejected 2026-09-15.** The gain is too small to justify the switch: Brier 0.1782 → 0.1755,
  while the market is 0.1589, and the switch would force a re-derived `--mc-min` threshold.
- Removed the experiment code: the `mcStdDev` backtest option and
  `tools/backtest-place-calibration.ts` (both were never committed).
- **Live sd not changed.** `analyze-race`, the differentiation backtest and the `--mc-min=75` gate
  still use sd=11. Measured impact on current outputs: nil.

## Recommendation (open)
- (Rejected 2026-09-15, not doing.) Switch HV `performanceStdDev` 11 → 17 in `src/pipeline/raceAnalysis.ts:371` and the
  differentiation backtest (`differentiationBacktest.ts:515`, `:826`), **together with** a new gate
  threshold. At sd=17 the ≥ 75 gate selects almost nothing; re-derive it (≈ 60 looks equivalent)
  and re-run the HV Turf gate backtest before switching.
- `mc-place-over-75.md` at the repo root is on the sd=11 scale; regenerate it if sd changes.
- Run the same sweep for ST (`--venue=ST`, sd around 8).
- Consider blending with the market (the odds are far better calibrated) instead of only tuning sd.
- Seed the MC in backtests so single-horse percentages are reproducible.

## Reproduce
The tool and the `mcStdDev` option were removed when the change was rejected. To rerun, restore
both from this note's Method: an MC std dev override in `runMcAccuracyBacktest`, and a report of
bucketed place% vs actual plus Brier over every runner.
```bash
npx tsx tools/backtest-place-calibration.ts --form=all            # live sd=11
for sd in 11 14 17 20 24; do npx tsx tools/backtest-place-calibration.ts --form=all --sd=$sd | grep ^SUMMARY; done
npx tsx tools/backtest-place-calibration.ts --form=HV --sd=17
```
