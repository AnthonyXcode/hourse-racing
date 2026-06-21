---
title: MC#1 place hit rate — distance debutants step up vs step down
date: 2026-06-21
tags: [backtest, place-bet, mc-ranking, distance-form, form-analysis]
status: confirmed-directional
sample: 590 MC#1 horses (777 races, 187 sparse-skipped) | Sep 2025 – Jun 2026 | ST+HV
tools: [tools/backtest-mc1-neverdist.ts, tools/backtest-mc-place-compare.ts, tools/backtest-mc-place-distance.ts]
data: data/racecards/*, data/historical/results_*.json
---

## Question
For a PLACE bet on MC #1, does it matter whether the horse has run the race
distance before? And does stepping UP vs DOWN in trip change the place rate?

## Method
- Universe: every `data/racecards/racecard_*_*.json` with a matching results file.
- Rank by MC **win%** (monteCarlo.ts:187 sorts by winProbability). MC#1 = results[0].
- Skip race if **>3 horses have <3 past records** (sparse field).
- "Never ran distance" = no past performance with exact `distance == race.distance`.
- Up/Down = race distance vs the horse's **most recent prior run** distance.
- Place = MC#1 finishes top 3. Place payout = result place dividend.

## Result
| MC#1 group | n | placed | hit rate |
|---|---|---|---|
| Has run the distance before | 517 | 247 | **47.8%** |
| Never run the distance | 73 | 31 | **42.5%** (ROI −22.2%) |

Never-ran-distance split:
| Direction | n | placed | hit rate |
|---|---|---|---|
| Stepping UP | 58 | 28 | **48.3%** |
| Stepping DOWN | 15 | 3 | **20.0%** |

Side checks:
- Rank by win% vs place% for the top place pick → **identical** (same horse 97.5%, 46.9% both).
- Distance-demotion strategy (MC#1 needs ≥2 of last 6 at trip, else MC#2, else skip) → 46.6% place, −12.7% ROI; the MC#2 fallback hit only 36% (demotion hurts).

## Interpretation
- Trip-unproven MC#1 underperforms proven (42.5% vs 47.8%), but the **entire**
  shortfall is in **steppers-DOWN (20%)**. Steppers-UP (48.3%) ≈ proven.
- Actionable subset = "**never ran the trip AND dropping in distance**" → avoid as a place/banker pick.
- Win% vs place% ranking is irrelevant at the top of the field.

## Caveats
- **Down-stepper sample is only 15 races** — directional, not conclusive. Treat as soft flag.
- MC backtest uses 5,000 iterations (engine default) vs 10,000 live.
- Place dividend only for top-3 finishers; 0-div fallback = stake (no profit).

## Action taken
- Fixed the **inverted sign** in `formAnalysis.ts` `calculateDistancePreference`
  no-match branch: was penalising UP harder (−0.2) than DOWN (−0.1); now DOWN −0.35,
  UP −0.05 (matches evidence direction).
- **Impact at ranking level ≈ nil**: `distancePreference` weight is 0.01–0.08, so the
  penalty moves the composite by <0.01 rating points — too small to re-rank MC#1.

## Recommendation (open)
The real lever is a **selection/banker guard**, not the rating weight:
> MC#1 with zero runs at the trip AND stepping down (race dist < recent avg − 300m)
> → demote to MC#2 (mirror the debutant-banker rule). Gate as soft flag until sample grows.

## Reproduce
```bash
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/backtest-mc1-neverdist.ts --form=all
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/backtest-mc-place-compare.ts --form=all
PLAYWRIGHT_BROWSERS_PATH=0 npx tsx tools/backtest-mc-place-distance.ts --form=all
```
