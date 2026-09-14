---
title: HV Turf place bet — May/Jun/Sep losses are model/market disagreement; gate on favourite + MC place%
date: 2026-09-14
tags: [backtest, place-bet, differentiation, market-odds, mc-ranking, seasonality]
status: confirmed-directional
sample: 330 HV Turf races, 62 bets (baseline) | Sep 2025 – Sep 2026 | HV Turf; all-venue check 134 bets
tools: [tools/backtest-differentiation.ts]
data: data/racecards/racecard_*_HV_R*.json, data/historical/results_*.json
---

## Question
With `--sparse=3 --close=3 --avgdiff=15 --gap=1 --venue=HV --surface=Turf --form=all`, why do
May, June and Sep 2026 lose money, and which skip rule fixes it without fitting to the months?

## Method
- Universe: every HV Turf racecard with a results file (330 races). Bet = PLACE on the form #1
  (`overallRating`), skip rules as in `computeSkipDecision`.
- Joined racecard features onto each bet: market favourite (shortest final win odds), win odds,
  MC Place% (5,000 runs), draw, days since last run, last-start finish, Rtg+/-.
- Compared the losing months (2026-05, 2026-06, 2026-09) against the rest.
- Market check: HV Turf favourite place rate by month over every results file (2023/24 – 2025/26),
  model-free.
- All numbers after the dead-heat fix (commit c0b4e11: a dead-heat for 3rd now counts as placed).

## Result
Baseline by period:

| Group | Bets | Placed | Hit | ROI (place) |
|---|---|---|---|---|
| 2026-05 | 6 | 3 | 50% | −35.0% |
| 2026-06 | 8 | 3 | 38% | −50.0% |
| 2026-09 | 5 | 1 | 20% | −71.0% |
| All other months | 43 | 35 | 81% | +18% |
| **Total** | **62** | **42** | **67.7%** | **−2.8%** |

What the losing-month picks had in common (other months in brackets):

| Pick was… | Losing months | Other months |
|---|---|---|
| Not the market favourite | 2/10 | 8/11 |
| MC Place% < 75% | 1/11 | 16/21 |
| Win odds > 3 | 3/13 | 15/20 |

- Sep 2026: all 5 picks last ran 56–67 days earlier (summer break); market had three of them at 11, 11, 22.
- Market favourite place rate, HV Turf: May 2026 21/27 (78%), Jun 2026 15/27 (56%). Past seasons show
  no consistent May/June dip (May 50% / 56%, Jun 67% / 41%).

Skip-rule comparison (HV Turf; `tools/backtest-differentiation.ts`):

| Extra flags | Bets | Placed | Hit | ROI (place) | May | Jun | Sep26 |
|---|---|---|---|---|---|---|---|
| — (baseline) | 62 | 42 | 67.7% | −2.8% | 3/6 | 3/8 | 1/5 |
| `--fav=on` | 44 | 34 | 77.3% | +6.0% | 3/3 | 2/6 | 0/1 |
| `--mc-min=75` | 31 | 26 | 83.9% | +14.5% | 3/5 | 3/3 | 1/1 |
| `--gap=4 --odds=4` | 44 | 36 | 81.8% | +10.9% | 3/4 | 2/5 | – |
| **`--fav=on --mc-min=75`** | **24** | **22** | **91.7%** | **+22.5%** | 3/3 | 2/2 | – |

All venues and surfaces, same base flags:

| Extra flags | Bets | Placed | Hit | ROI (place) |
|---|---|---|---|---|
| — (baseline) | 134 | 85 | 63.4% | −6.2% |
| `--gap=4 --odds=4` | 87 | 66 | 75.9% | +2.0% |
| `--fav=on --mc-min=75` | 62 | 49 | 79.0% | +8.2% |

## Interpretation
- The bad months are **model failure, not random racing**: the market favourite placed at a normal
  rate (78% in May 2026) while the form #1 disagreed with the market and lost.
- Season start (Sep): form lines are 2+ months stale; the market prices barrier trials and
  trackwork the model cannot see.
- Actionable subset: bet the form #1 only when the **market agrees** (favourite, or win odds ≤ 4)
  **and MC agrees** (Place% ≥ 75). The gate helps every month, not just the bad ones, so it is not
  a month filter in disguise.
- A days-since-last-run guard (≤ 35) adds nothing once the market gate is on: the market already
  prices the stale September horses long.

## Caveats
- **One season of racecards** (Sep 2025 – Sep 2026); earlier seasons have results but no racecards,
  so the model cannot be replayed on past May/Junes.
- Thresholds (fav, 75%, odds 4, gap 4) were picked after seeing this data. `--fav=on --mc-min=75`
  keeps only 24 HV Turf bets — expect shrinkage.
- MC is unseeded (5,000 runs): picks near 75% Place% flip between runs (26/31 vs an earlier 24/30).
- `--fav` uses final win odds from the results file, which are not known when the bet is placed.
  Live use needs the odds a few minutes before the off.
- Place ROI uses the result place dividend; a placed horse with no dividend returns the stake.

## Action taken
- Added `--fav=on` and `--mc-min=N` skip gates: `src/backtest/differentiationBacktest.ts`
  (`isMarketFavourite`, applied after the MC run in `runDifferentiationBacktest`), mirrored in
  `src/backtest/upcomingBetSuggestions.ts` and the API (`favOnly`, `mcMin` in
  `src/server/routes/backtests.ts`). Off by default — no change to existing results.
- Fixed dead-heats settled as misses and `--months` ignoring 2025 (commit c0b4e11).
  Impact on the baseline above: 41/62 → 42/62, ROI −5.1% → −2.8%.

## Recommendation (open)
- Paper-trade `--fav=on --mc-min=75` and `--gap=4 --odds=4` through the 2026/27 season before staking.
- Re-test with pre-race odds (not final) once odds snapshots are stored per race.
- Seed the MC simulator in backtests so MC-threshold results are reproducible.
- Re-run on HV Turf May/June 2027 to confirm the late-season pattern holds in a second season.

## Reproduce
```bash
B="--sparse=3 --close=3 --avgdiff=15 --gap=1 --venue=HV --surface=Turf --form=all"
npx tsx tools/backtest-differentiation.ts $B
npx tsx tools/backtest-differentiation.ts $B --fav=on --mc-min=75
npx tsx tools/backtest-differentiation.ts --sparse=3 --close=3 --avgdiff=15 --gap=4 --odds=4 --venue=HV --surface=Turf --form=all
```
(zsh: use `${=B}` so the flags split.)
