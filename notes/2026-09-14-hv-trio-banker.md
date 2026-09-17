---
title: HV Trio banker — bank form #1 at MC Place% ≥ 75 with 6 legs by form rating
date: 2026-09-14
tags: [backtest, trio, banker, mc-ranking, happy-valley]
status: confirmed-directional
sample: 330 HV Turf races; 33–37 bets per run (3 runs) | Sep 2025 – Sep 2026 | Happy Valley
tools: [tools/backtest-trio-banker.ts]
data: data/racecards/racecard_*_HV_R*.json, data/historical/results_*_HV.json
---

## Question
At Happy Valley the form #1 finishes top 3 more than 80% of the time when its MC Place% is ≥ 75.
Can it be a Trio banker with 5–6 legs, skipping every race where it is below 75%?

## Method
- Universe: 330 HV Turf races with a results file (Sep 2025 – Sep 2026), `--form=all`.
- Banker = form #1 (top overall rating) among numbered runners. Bet only when its MC Place% ≥ 75
  (5,000-run Monte Carlo, HV spread 11 rating points); otherwise skip. No other skip rules.
- Legs = the next N runners by form rating rank or by MC win% rank. Banker + N legs = C(N,2)
  combos at $10: 5 legs = 10 combos ($100), 6 legs = 15 combos ($150).
- Settled on the results-file Trio dividend per $10. A dead-heat for 3rd pays on either winning combo.
- No odds anywhere. Standby horses (saddle-cloth number 0) are never banker or leg.
- The MC is unseeded, so the whole backtest was run 3 times. Halves: before / from 2026-03-01.

## Result
Banker check at MC ≥ 75: top 3 in 31/37, 30/35, 28/33 = **84–86%** (premise holds).

Leg choice at MC ≥ 75 (ROI, runs 1 / 2 / 3):

| Legs | Combos | Legs by form rating | Legs by MC win% |
|---|---|---|---|
| 5 | 10 | −40.4% / −37.0% / −33.2% | −45.9% / −37.0% / −29.6% |
| 6 | 15 | **+15.4% / +22.0% / +14.6%** | +0.5% / +8.0% / +0.3% |

Recommended rule (6 legs by form rating, MC ≥ 75):

| Run | Bets | Banker top 3 | Trio hits | Stake | Return | ROI | Sep–Feb | Mar–Sep |
|---|---|---|---|---|---|---|---|---|
| 1 | 37 | 31 (84%) | 15 (41%) | $5,550 | $6,404 | +15.4% | −4.1% | +33.8% |
| 2 | 35 | 30 (86%) | 15 (43%) | $5,250 | $6,404 | +22.0% | −4.1% | +49.6% |
| 3 | 33 | 28 (85%) | 14 (42%) | $4,950 | $5,672 | +14.6% | −27.1% | +58.9% |

Banker threshold (6 legs by form rating, ROI runs 1 / 2 / 3):

| MC ≥ | Bets | ROI |
|---|---|---|
| none (every race) | 330 | +1.9% (same every run: no MC involved) |
| 70 | 73–79 | +26.5% / −1.0% / +31.5% |
| 75 | 33–37 | +15.4% / +22.0% / +14.6% |
| 80 | 11–13 | +59.2% / +53.2% / +56.5% |

Concentration: the largest dividend, $1,475 (20260422_HV_R9, banker AURIO), is in every run.
Without it ROI is −11.2% / −6.1% / −15.2%. Run 1 by month: 7 of 11 months lost money; April alone
made +$1,915. Longest run without a Trio hit: 8 / 7 / 6 bets.

Leg trip rule (`--leg-trip=N`: legs with fewer than N past runs at the race distance go behind
proven runners; 6 legs by form rating; 3 further runs, so the "off" row repeats the rule above):

| Leg rule | MC ≥ 75 (33–36 bets), ROI per run | Trio hits | Every race (330 bets), ROI |
|---|---|---|---|
| off | +24.7% / +28.5% / +18.6% | 14 / 14 / 15 | +1.9% |
| trip ≥ 1 | +4.1% / +7.3% / −0.9% | 11 / 11 / 12 | +5.3% |
| trip ≥ 2 | +17.5% / +21.1% / +11.8% | 13 / 13 / 14 | +12.0% |
| trip ≥ 3 | +0.0% / +3.0% / −4.8% | 13 / 13 / 14 | −2.0% |

Every race with trip ≥ 2: the largest dividend ($4,458, 20260715_HV_R4) and July (+$6,569) carry
it. Without that dividend ROI is +3.0%; without July the season loses $612.

## Interpretation
- The banker holds up (84–86% top 3), so the Trio result depends on the legs.
- 5 legs loses in every run and with either ranking: when the banker places, the other two
  top-3 finishers too often come from outside the next 5.
- 6 legs by **form rating** is the best tested setup and is positive in all 3 runs. Form-rating
  legs beat MC-win% legs in every run.
- With no MC filter at all, 6 form-rating legs is about break-even (+1.9%); the MC ≥ 75 filter adds
  ROI but with high run-to-run noise. MC ≥ 80 looks best but keeps only 11–13 bets.
- **Trip runs for legs: rejected.** Every trip rule lowers ROI for the MC ≥ 75 strategy in all 3
  runs (fewer Trio hits). Over every race, trip ≥ 2 looks better (+12.0%), but it rests on one July
  dividend and is not monotonic in N (1 and 3 do worse), so it reads as noise.

## Caveats
- **Small and lumpy:** 33–37 bets a season, profit rests on a few big dividends; removing the
  largest turns every run negative.
- **First half is flat or losing** in every run (−4.1 / −4.1 / −27.1%); the gain is all Mar–Sep.
- **In-sample choice:** 6 legs and form-rating legs were picked from 4 compared setups on this data.
- **Unseeded MC:** 2–4 races near 75% change between runs.
- One season of racecards.
- Standby horses: 14/338 HV and 30/564 ST racecards list number-0 horses not marked scratched.
  This tool never picks them, but they still count in the form metrics and the MC field.

## Action taken
- Added `tools/backtest-trio-banker.ts` (defaults = recommended rule) and `src/backtest/trioBanker.ts`
  (banker and leg selection, dead-heat settlement), tests in `src/backtest/__tests__/trioBanker.test.ts`.
- `loadMeetingResults` (`src/backtest/differentiationBacktest.ts`) now also returns `trioDividendMap`.
- Added `--leg-trip=N` (`legMinTripRuns` in `src/backtest/trioBanker.ts`, `tripRuns` on
  `McAccuracyPick`) and a LEG TRIP RULE table in the tool. Default off — tested, not adopted.
- The race-by-race table shows Picks (banker + legs) and Cost; UPCOMING SUGGESTIONS applies the
  rule to saved racecards with no results file yet (`loadUpcomingTrioBankerRaces`, 10,000 MC runs).

## Recommendation (open)
- Paper-trade through 2026/27 before staking; track P&L per meeting.
- Seed the MC in backtests so the bet list is reproducible.
- Treat number-0 standby horses as non-runners at racecard load, so metrics and MC exclude them.

## Reproduce
```bash
# Recommended rule (banker MC ≥ 75, 6 legs by form rating) + full grid
npx tsx tools/backtest-trio-banker.ts --venue=HV --surface=Turf --form=all
# 5 legs by MC win%
npx tsx tools/backtest-trio-banker.ts --venue=HV --surface=Turf --form=all --legs=5 --leg-rank=mc
# Leg trip rule over every race (no MC filter), legs with 2+ runs at the trip first
npx tsx tools/backtest-trio-banker.ts --venue=HV --surface=Turf --form=all --banker-mc=0 --leg-trip=2
```
