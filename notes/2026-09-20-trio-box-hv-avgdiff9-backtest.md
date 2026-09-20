---
title: HV 12-runner Trio box (MC top N, no banker) — loses at every avgDiff threshold; the avgDiff < 9 subset rests on one race
date: 2026-09-20
tags: [backtest, trio, hv, monte-carlo, rejected]
status: rejected
sample: 283 HV 12-runner races with results, 2025-09-10 → 2026-09-16 (49 of them avgDiff < 9)
tools: [tmp/trio-box.ts, tmp/trio-box-49.ts]
data: data/racecards/racecard_*_HV_R*.json, data/historical/results_*_HV.json
---

# HV Trio box, MC top N, no banker — 12 runners, avgDiff filters

## Question

Betting a Trio box (no banker) on the MC top N in Happy Valley 12-runner races: does filtering
by avgDiff (< 15, < 13, < 11, < 9) or changing the number of legs (6, 7, 8, 9) turn it profitable?

## Method

- Universe: every `data/racecards/racecard_*_HV_R*.json` with a finish order in `data/historical/`.
- Field size: exactly 12 non-scratched runners with saddle-cloth > 0 (283 races qualify).
- avgDiff: `round(mean(|topRating − rating|))` over `FormAnalyzer.analyzeRace`, same definition as
  `backtest-differentiation` — filter is avgDiff **<** threshold (the CLI's `--avgdiff` is the opposite way round).
- Selection: top N by Monte Carlo win probability (5,000 runs, `performanceStdDev: 11`, form from all venues).
- Bet: Trio box, no banker — C(N,3) combos × $10. 6 legs = $200, 7 = $350, 8 = $560, 9 = $840 per race.
- Hit: all three placed finishers inside the N picks (`winningCombos(order, 3)`, dead-heat aware).
- Payout: actual `trioDividend` from the results file (quoted per $10). Missing dividend counts as $0.
- Every race is simulated once and then filtered, so all thresholds and leg counts share identical picks.
- RNG seeded (mulberry32, seed 42) so the tables reproduce.

## Result

ROI by legs × threshold (same races, same picks):

| Filter | Races | 6 legs ($200) | 7 legs ($350) | 8 legs ($560) | 9 legs ($840) |
|---|---|---|---|---|---|
| no filter | 283 | −22.1% | −24.0% | −32.2% | −27.6% |
| avgDiff < 15 | 218 | −17.5% | −26.5% | −32.0% | −25.7% |
| avgDiff < 13 | 175 | — | −22.9% | — | — |
| avgDiff < 11 | 118 | −12.8% | −19.9% | −32.3% | −23.0% |
| avgDiff < 9 | 49 | **+52.3%** | **+11.8%** | −12.7% | −0.7% |

Hit rate by legs (avgDiff < 11): 6 legs 27/118 = 22.9%, 7 legs 41/118 = 34.7%,
8 legs 59/118 = 50.0%, 9 legs 82/118 = 69.5%.

avgDiff < 9, 7 legs — the headline cell: 16/49 = 32.7% hit rate, stake $17,150, payout $19,173,
P&L +$2,023, ROI +11.8%. Full race-by-race table in the appendix.

Dividend economics at avgDiff < 11: 7 legs median hit $653 / mean $807 vs $1,007 needed to break even;
8 legs median $544 / mean $758 vs $1,120 needed.

## Interpretation

- **Every configuration loses except the 49-race avgDiff < 9 subset**, and that subset's profit is one race:
  running P&L is negative from race 5 to race 48, bottoming at −$2,838, and only turns positive on
  2026-09-09 R5 ($2,774). Without that race: −$751 = −4.4% ROI.
- **More legs is strictly worse.** Going 7 → 8 legs at avgDiff < 11 lifts the hit rate 34.7% → 50.0% but ROI
  falls −19.9% → −32.3%: combinations grow faster than winners, and the races newly caught are the
  obvious ones that pay least (median hit dividend drops $653 → $544).
- **The filter buys volume reduction, not accuracy.** Hit rate barely moves across thresholds (33–37% at
  7 legs); tightening avgDiff mostly cuts races.
- **The misses hold the money**: $6,466, $6,319, $5,437, $4,149, $4,010 all landed outside the MC top 7.
  6 of 16 hits at avgDiff < 9 paid less than the $350 stake.

## Caveats

- avgDiff < 9 is 49 races / 16 hits, and flips negative without a single race — not a usable edge.
- The 6-leg +52.3% at avgDiff < 9 concentrates in the avgDiff = 6 bucket (11 races, 6 hits); likely noise.
- Seed-sensitive: re-simulating moved avgDiff < 15 / 7 legs between −24.0% and −26.5%. Treat gaps of a
  few points as noise. No multi-seed run was done.
- Scratchings as recorded on the saved racecard; no re-pricing for late scratches.
- MC used `performanceStdDev: 11`; [2026-09-15-hv-mc-place-calibration.md](2026-09-15-hv-mc-place-calibration.md)
  found sd=11 over-confident for HV place%, which may also inflate top-N coverage here.

## Action taken

None — no code or strategy change. Recorded as a rejection.

## Recommendation (open)

- Test 4 and 5 legs on the same race set; the trend says fewer legs is better.
- Re-run across ~20 seeds to size the noise before trusting any cell.
- Compare against the banker structure in [2026-09-14-hv-trio-banker.md](2026-09-14-hv-trio-banker.md).
- Retest with the calibrated sd from the MC place-calibration note.

## Reproduce

Script is `tmp/trio-box-49.ts` (not committed — `tmp/` is gitignored). It runs with:

```bash
npx tsx tmp/trio-box-49.ts    # seed 42, HV, 12 runners, avgDiff < 9, 7 legs
```

Parameters are constants at the top of the file: `PICKS`, `RUNNERS`, `MAX_AVG_DIFF`, `UNIT`.

## Appendix — race by race (avgDiff < 9, 7 legs)

| # | Date | Race | Class | Dist | Going | AvgDiff | Picks (MC top 7) | Actual 1-2-3 | Hit | Trio div | P&L | Running |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2025-09-10 | R6 | Class 4 | 1650m | Good | 8 | 5,4,1,2,9,11,7 | 7-1-8 | – | $1638 | −$350 | −$350 |
| 2 | 2025-09-17 | R2 | Class 4 | 1200m | Good | 8 | 2,6,3,7,9,10,5 | 2-6-10 | **HIT** | $1649 | +$1299 | +$949 |
| 3 | 2025-09-17 | R3 | Class 4 | 1800m | Good to Firm | 4 | 9,4,1,3,8,12,11 | 8-2-3 | – | $1812 | −$350 | +$599 |
| 4 | 2025-09-17 | R6 | Class 4 | 1200m | Good to Firm | 7 | 3,5,6,10,2,7,4 | 2-3-9 | – | $1418 | −$350 | +$249 |
| 5 | 2025-10-08 | R3 | Class 4 | 1200m | Good to Firm | 7 | 12,10,2,4,5,8,3 | 5-10-11 | – | $395 | −$350 | −$101 |
| 6 | 2025-10-08 | R8 | Class 3 | 1200m | Good to Firm | 4 | 8,5,6,2,10,3,11 | 7-10-6 | – | $751 | −$350 | −$451 |
| 7 | 2025-10-15 | R3 | Class 4 | 1200m | Good to Firm | 7 | 6,3,5,1,12,7,8 | 1-10-9 | – | $254 | −$350 | −$801 |
| 8 | 2025-10-22 | R3 | Class 4 | 1200m | Good | 8 | 3,2,6,1,12,7,5 | 10-5-2 | – | $3629 | −$350 | −$1151 |
| 9 | 2025-10-22 | R7 | Class 4 | 1200m | Good | 8 | 5,8,3,4,2,1,11 | 8-10-1 | – | $386 | −$350 | −$1501 |
| 10 | 2025-11-05 | R2 | Class 5 | 1000m | Good | 8 | 1,7,11,4,8,12,10 | 1-7-4 | **HIT** | $363 | +$13 | −$1488 |
| 11 | 2025-11-05 | R6 | Class 4 | 1650m | Good to Firm | 8 | 7,6,2,5,11,3,9 | 3-2-10 | – | $4149 | −$350 | −$1838 |
| 12 | 2025-11-05 | R9 | Class 3 | 1650m | Good to Firm | 7 | 6,2,10,4,1,5,12 | 10-5-4 | **HIT** | $1067 | +$717 | −$1121 |
| 13 | 2025-11-19 | R1 | Class 4 | 1200m | Good | 5 | 4,1,6,12,3,8,7 | 12-11-3 | – | $2196 | −$350 | −$1471 |
| 14 | 2025-11-26 | R1 | Class 5 | 1200m | Good to Firm | 8 | 5,9,1,4,8,10,11 | 5-4-10 | **HIT** | $2138 | +$1788 | +$317 |
| 15 | 2025-11-26 | R4 | Class 4 | 1200m | Good to Firm | 8 | 10,8,5,1,12,3,11 | 4-8-7 | – | $1112 | −$350 | −$33 |
| 16 | 2025-12-10 | R4 | Class 4 | 1000m | Good | 8 | 11,5,8,2,10,1,4 | 11-8-1 | **HIT** | $1213 | +$863 | +$830 |
| 17 | 2025-12-10 | R8 | Class 3 | 1200m | Good | 6 | 8,9,2,1,5,12,7 | 7-12-11 | – | $2688 | −$350 | +$480 |
| 18 | 2025-12-17 | R6 | Class 4 | 1800m | Good | 7 | 8,5,10,2,4,6,12 | 7-8-3 | – | $3130 | −$350 | +$130 |
| 19 | 2025-12-17 | R8 | Class 3 | 1000m | Good | 7 | 6,2,9,7,5,3,1 | 9-7-3 | **HIT** | $831 | +$481 | +$611 |
| 20 | 2025-12-23 | R3 | Class 4 | 1650m | Good | 7 | 10,2,6,1,3,11,8 | 2-12-11 | – | $1419 | −$350 | +$261 |
| 21 | 2025-12-23 | R6 | Class 3 | 2200m | Good | 7 | 2,4,6,1,7,3,12 | 12-3-11 | – | $726 | −$350 | −$89 |
| 22 | 2025-12-23 | R7 | Class 4 | 1200m | Good | 6 | 4,9,8,6,3,12,1 | 10-8-1 | – | $2489 | −$350 | −$439 |
| 23 | 2026-01-28 | R2 | Class 5 | 1650m | Good to Firm | 6 | 5,2,4,3,1,8,7 | 4-11-2 | – | $693 | −$350 | −$789 |
| 24 | 2026-01-28 | R6 | Class 4 | 1200m | Good to Firm | 6 | 5,10,4,2,7,6,1 | 5-1-10 | **HIT** | $248 | −$102 | −$891 |
| 25 | 2026-01-28 | R8 | Class 3 | 1800m | Good to Firm | 5 | 12,3,2,6,1,8,7 | 12-4-6 | – | $193 | −$350 | −$1241 |
| 26 | 2026-01-28 | R9 | Class 3 | 1200m | Good to Firm | 6 | 1,3,10,7,11,9,12 | 10-7-11 | **HIT** | $1315 | +$965 | −$276 |
| 27 | 2026-02-11 | R3 | Class 4 | 1650m | Good to Firm | 7 | 3,6,4,8,2,12,11 | 8-2-6 | **HIT** | $723 | +$373 | +$97 |
| 28 | 2026-02-25 | R1 | Class 5 | 1200m | Good | 7 | 6,11,10,12,5,4,7 | 9-11-3 | – | $1167 | −$350 | −$253 |
| 29 | 2026-02-25 | R5 | Class 4 | 1200m | Good | 8 | 3,6,4,2,5,7,8 | 8-2-10 | – | $1343 | −$350 | −$603 |
| 30 | 2026-02-25 | R9 | Class 3 | 1200m | Good | 6 | 1,5,3,7,8,10,6 | 12-5-6 | – | $1953 | −$350 | −$953 |
| 31 | 2026-03-04 | R1 | Class 5 | 1800m | Good to Yielding | 6 | 2,4,7,9,5,12,1 | 7-9-5 | **HIT** | $1372 | +$1022 | +$69 |
| 32 | 2026-03-11 | R3 | Class 4 | 1650m | Good to Firm | 8 | 3,5,4,6,2,7,12 | 11-8-9 | – | $6319 | −$350 | −$281 |
| 33 | 2026-03-11 | R9 | Class 3 | 1800m | Good to Firm | 8 | 11,7,2,4,1,6,9 | 8-11-4 | – | $316 | −$350 | −$631 |
| 34 | 2026-03-18 | R4 | Class 4 | 1200m | Good to Firm | 8 | 9,2,3,4,1,6,5 | 12-2-4 | – | $491 | −$350 | −$981 |
| 35 | 2026-04-08 | R5 | Class 4 | 1200m | Good | 8 | 9,2,10,7,6,11,8 | 9-5-6 | – | $454 | −$350 | −$1331 |
| 36 | 2026-04-08 | R8 | Class 3 | 1200m | Good | 7 | 4,2,1,10,7,3,6 | 4-12-6 | – | $248 | −$350 | −$1681 |
| 37 | 2026-04-22 | R5 | Class 4 | 1200m | Good to Firm | 7 | 1,11,9,7,4,5,3 | 11-12-1 | – | $190 | −$350 | −$2031 |
| 38 | 2026-05-13 | R1 | Class 5 | 1650m | Good to Firm | 8 | 11,1,7,9,5,6,8 | 1-3-12 | – | $4010 | −$350 | −$2381 |
| 39 | 2026-05-20 | R9 | Class 2 | 1200m | Good | 8 | 10,9,2,1,11,12,7 | 8-7-1 | – | $6466 | −$350 | −$2731 |
| 40 | 2026-06-03 | R3 | Class 4 | 1200m | Good to Firm | 8 | 4,3,7,5,12,6,9 | 7-12-4 | **HIT** | $388 | +$38 | −$2693 |
| 41 | 2026-06-10 | R1 | Class 5 | 1800m | Good | 5 | 8,7,1,9,10,4,2 | 2-1-10 | **HIT** | $555 | +$205 | −$2488 |
| 42 | 2026-06-10 | R3 | Class 4 | 1200m | Good | 6 | 5,10,2,3,9,4,1 | 8-11-5 | – | $2281 | −$350 | −$2838 |
| 43 | 2026-06-24 | R2 | Class 5 | 1650m | Good | 6 | 6,11,8,2,7,9,10 | 9-11-2 | **HIT** | $1923 | +$1573 | −$1265 |
| 44 | 2026-06-24 | R3 | Class 4 | 1650m | Good | 8 | 2,5,8,1,6,9,11 | 5-2-12 | – | $665 | −$350 | −$1615 |
| 45 | 2026-06-24 | R5 | Class 4 | 1200m | Good | 7 | 2,4,8,6,9,3,7 | 2-4-5 | – | $442 | −$350 | −$1965 |
| 46 | 2026-07-15 | R1 | Class 5 | 1650m | Good | 7 | 9,3,5,11,7,8,10 | 3-11-10 | **HIT** | $672 | +$322 | −$1643 |
| 47 | 2026-07-15 | R3 | Class 4 | 1800m | Good | 6 | 5,10,3,4,9,8,1 | 10-4-5 | **HIT** | $1942 | +$1592 | −$51 |
| 48 | 2026-07-15 | R6 | Class 4 | 1200m | Good | 7 | 7,1,5,2,8,9,11 | 6-11-9 | – | $5437 | −$350 | −$401 |
| 49 | 2026-09-09 | R5 | Class 3 | 1650m | Good | 6 | 10,8,1,6,4,9,3 | 10-9-3 | **HIT** | $2774 | +$2424 | +$2023 |

**Totals: 49 races | 16 hits (32.7%) | stake $17,150 | payout $19,173 | P&L +$2,023 | ROI +11.8%**
