---
title: HV Trio box on MC top 7 in every race — 40.2% hit rate but −25.4% ROI; only avgDiff <= 8 pays
date: 2026-09-20
tags: [backtest, trio, hv, monte-carlo, market-baseline, rejected]
status: rejected
sample: 336 HV races with results, 2025-09-10 → 2026-09-16 (all field sizes ≥ 8; 2 races skipped with ≤ 7 runners)
tools: [tmp/trio-all-hv.ts]
data: data/racecards/racecard_*_HV_R*.json, data/historical/results_*_HV.json
---

# HV Trio box on the MC top 7 — every race, no filters

## Question

Bet a Trio box on the Monte Carlo top 7 in **every** HV race, with no avgDiff or field-size filter.
What are the hit rate and ROI, how do they compare with backing the market's seven shortest prices,
and with picking 7 horses at random?

## Method

- Universe: every `data/racecards/racecard_*_HV_R*.json` with a finish order in `data/historical/`
  (338 races; 2 skipped for having ≤ 7 runners → **336**).
- Selection: top 7 by Monte Carlo win probability (5,000 runs, `performanceStdDev: 11`, form from all
  venues, seeded mulberry32 seed 42).
- Market baseline: the 7 shortest starting prices (results-file SP, else racecard snapshot; ties by
  saddle-cloth number).
- Random baseline: analytic, `C(7,3) / C(field,3)` coverage per race — 15.9% in a 12-runner field.
- Bet: Trio box, no banker — C(7,3) = 35 combos × $10 = **$350 per race** ($117,600 total).
- Hit: all three placed finishers inside the 7 (`winningCombos(order, 3)`, dead-heat aware).
- Payout: actual `trioDividend` (per $10); missing dividend counts as $0.
- "ROI ex-best" recomputes ROI with the single largest winning dividend removed.

## Result

| Selection | Races | Hits | Hit rate | P&L | ROI | Mean dividend on hits |
|---|---|---|---|---|---|---|
| **MC top 7** | 336 | 135 | **40.2%** | −$29,922 | **−25.4%** | $649 |
| Market top 7 (shortest prices) | 336 | 190 | **56.5%** | −$25,782 | −21.9% | $483 |
| Random 7 | 336 | 17.6% (expected) | — | — | −36.5% | — |

Break-even needs a mean dividend of $871 at 40.2%; the MC collects $649.
Mean trio dividend across all 336 races: $1,335.

### By avgDiff — the filter changes price, not accuracy

| avgDiff | Races | Hits | Hit rate | ROI | ROI ex-best | Mean dividend |
|---|---|---|---|---|---|---|
| **≤ 8** | 60 | 24 | 40.0% | **+17.2%** | **+4.0%** | $1,026 |
| 9–10 | 84 | 33 | 39.3% | −26.6% | −40.5% | $654 |
| 11–13 | 92 | 38 | 41.3% | −40.3% | −49.8% | $506 |
| 14+ | 100 | 40 | 40.0% | −36.4% | −44.6% | $556 |

Hit rate is flat at 39–41% across every band. Only the dividend moves: $1,026 in tight races vs $506
in spread-out ones.

### By field size

| Runners | Races | Hits | Hit rate | ROI | Random hit rate |
|---|---|---|---|---|---|
| 8 | 2 | 2 | 100.0% | +39.1% | 62.5% |
| 9 | 5 | 3 | 60.0% | −86.7% | 41.7% |
| 10 | 12 | 8 | 66.7% | −16.3% | 29.2% |
| 11 | 34 | 18 | 52.9% | −15.6% | 21.2% |
| 12 | 283 | 104 | 36.7% | −26.4% | 15.9% |

Small-field hit rates are mechanical: a 7-horse box covers far more of the field.

### By class

| Class | Races | Hits | Hit rate | ROI |
|---|---|---|---|---|
| Class 2 | 17 | 8 | 47.1% | −3.2% |
| Class 3 | 91 | 34 | 37.4% | −30.2% |
| Class 4 | 175 | 72 | 41.1% | −28.0% |
| Class 5 | 52 | 20 | 38.5% | −16.1% |

### Month by month — MC top 7, every race

| Month | Races | Hits | Hit rate | Stake | Payout | P&L | ROI | Running |
|---|---|---|---|---|---|---|---|---|
| 2025-09 | 16 | 9 | 56.3% | $5,600 | $7,117 | +$1,517 | +27.1% | +$1,517 |
| 2025-10 | 27 | 9 | 33.3% | $9,450 | $4,635 | −$4,815 | −51.0% | −$3,298 |
| 2025-11 | 45 | 20 | 44.4% | $15,750 | $16,177 | +$427 | +2.7% | −$2,871 |
| 2025-12 | 35 | 10 | 28.6% | $12,250 | $6,890 | −$5,360 | −43.8% | −$8,231 |
| 2026-01 | 27 | 13 | 48.1% | $9,450 | $8,872 | −$578 | −6.1% | −$8,809 |
| 2026-02 | 26 | 11 | 42.3% | $9,100 | $8,885 | −$215 | −2.4% | −$9,024 |
| 2026-03 | 36 | 16 | 44.4% | $12,600 | $6,926 | −$5,674 | −45.0% | −$14,698 |
| 2026-04 | 36 | 13 | 36.1% | $12,600 | $6,087 | −$6,513 | −51.7% | −$21,211 |
| 2026-05 | 27 | 9 | 33.3% | $9,450 | $2,975 | −$6,475 | −68.5% | −$27,686 |
| 2026-06 | 27 | 10 | 37.0% | $9,450 | $5,956 | −$3,494 | −37.0% | −$31,180 |
| 2026-07 | 18 | 11 | 61.1% | $6,300 | $7,487 | +$1,187 | +18.8% | −$29,993 |
| 2026-09 | 16 | 4 | 25.0% | $5,600 | $5,671 | +$71 | +1.3% | −$29,922 |
| **TOTAL** | **336** | **135** | **40.2%** | **$117,600** | **$87,678** | **−$29,922** | **−25.4%** | |

Losing in 8 of 12 months; the running total never recovers after October.

### Month by month — MC top 7, avgDiff <= 8 only

| Month | Races | Hits | Hit rate | P&L | ROI | Running |
|---|---|---|---|---|---|---|
| 2025-09 | 7 | 4 | 57.1% | +$2,306 | +94.1% | +$2,306 |
| 2025-10 | 6 | 1 | 16.7% | −$1,106 | −52.7% | +$1,200 |
| 2025-11 | 6 | 3 | 50.0% | +$1,468 | +69.9% | +$2,668 |
| 2025-12 | 7 | 2 | 28.6% | −$406 | −16.6% | +$2,262 |
| 2026-01 | 4 | 2 | 50.0% | +$163 | +11.6% | +$2,425 |
| 2026-02 | 6 | 2 | 33.3% | −$715 | −34.0% | +$1,710 |
| 2026-03 | 7 | 3 | 42.9% | −$705 | −28.8% | +$1,005 |
| 2026-04 | 4 | 0 | 0.0% | −$1,400 | −100.0% | −$395 |
| 2026-05 | 2 | 0 | 0.0% | −$700 | −100.0% | −$1,095 |
| 2026-06 | 6 | 3 | 50.0% | +$766 | +36.5% | −$329 |
| 2026-07 | 4 | 3 | 75.0% | +$1,526 | +109.0% | +$1,197 |
| 2026-09 | 1 | 1 | 100.0% | +$2,424 | +692.6% | +$3,621 |
| **TOTAL** | **60** | **24** | **40.0%** | **+$3,621** | **+17.2%** | |

### Month by month — market top 7, every race

| Month | Races | Hits | Hit rate | P&L | ROI | Running |
|---|---|---|---|---|---|---|
| 2025-09 | 16 | 9 | 56.3% | +$372 | +6.6% | +$372 |
| 2025-10 | 27 | 19 | 70.4% | −$258 | −2.7% | +$114 |
| 2025-11 | 45 | 23 | 51.1% | −$1,862 | −11.8% | −$1,748 |
| 2025-12 | 35 | 15 | 42.9% | −$4,885 | −39.9% | −$6,633 |
| 2026-01 | 27 | 16 | 59.3% | −$3,002 | −31.8% | −$9,635 |
| 2026-02 | 26 | 14 | 53.8% | −$1,410 | −15.5% | −$11,045 |
| 2026-03 | 36 | 21 | 58.3% | −$4,169 | −33.1% | −$15,214 |
| 2026-04 | 36 | 24 | 66.7% | −$4,890 | −38.8% | −$20,104 |
| 2026-05 | 27 | 13 | 48.1% | −$5,278 | −55.9% | −$25,382 |
| 2026-06 | 27 | 17 | 63.0% | −$105 | −1.1% | −$25,487 |
| 2026-07 | 18 | 9 | 50.0% | −$1,143 | −18.1% | −$26,630 |
| 2026-09 | 16 | 10 | 62.5% | +$848 | +15.1% | −$25,782 |
| **TOTAL** | **336** | **190** | **56.5%** | **−$25,782** | **−21.9%** | |

## Interpretation

- **The MC predicts, but cannot beat the price.** 40.2% vs 17.6% random is a large, real edge in accuracy
  over 336 races. It earns nothing: the races it gets right are the predictable ones, paying $649 against
  the $871 needed.
- **The market is the better predictor.** Backing the seven shortest prices hits 56.5% — well above the
  model's 40.2%. The MC top 7 is not finding anything the odds do not already know, so its selection edge
  over the market is negative.
- **The only lever that works is the race filter, not the selection.** Hit rate is flat at 39–41% across
  all avgDiff bands while the mean dividend doubles from $506 (spread) to $1,026 (tight). avgDiff ≤ 8 is
  the only band clearing the takeout (+17.2%, and +4.0% after removing its best race).
- **Small fields flatter the hit rate without helping ROI** — 10-runner races hit 66.7% only because the
  box covers 29.2% of trios there.
- The takeout is the thing to beat: a random 7-horse box is −36.5%, so every method above is "less bad"
  rather than profitable, except the avgDiff ≤ 8 subset.

## Caveats

- avgDiff ≤ 8 is 60 races / 24 hits; strip its best race (2026-09-09 R5, $2,774) and the year is
  +$1,197 on $20,650 = +5.8%. It sat under water from April to June.
- Seeded MC; a different seed shuffles borderline 7th picks. Treat gaps of a few points as noise.
- Trio dividends missing from a results file count as $0 payout, understating some hits.
- Field-size and class rows rest on 2–52 races each; only the 12-runner row (283) is substantial.
- MC used `performanceStdDev: 11`; [2026-09-15-hv-mc-place-calibration.md](2026-09-15-hv-mc-place-calibration.md)
  found sd=11 over-confident for HV place%, which may inflate top-7 coverage here.

## Action taken

None — recorded as a rejection of the unfiltered rule.

## Recommendation (open)

- Test **avgDiff ≤ 8 across all HV races** at 5, 6, 7 and 8 legs with the ex-best column — this is the
  one consistent signal across three separate tests (here, and the two Trio box notes of 2026-09-20).
- Use the MC to filter races rather than pick horses: e.g. bet only when no horse has a high MC win
  probability (no standout), which is closer to what avgDiff is proxying.
- Re-test with the calibrated sd from the MC place-calibration note.
- Related: [2026-09-20-hv-trio-market-4-10.md](2026-09-20-hv-trio-market-4-10.md) (fading the market's
  top 3 on the same races) and
  [2026-09-20-trio-box-hv-avgdiff9-backtest.md](2026-09-20-trio-box-hv-avgdiff9-backtest.md).

## Reproduce

Script is `tmp/trio-all-hv.ts` (not committed — `tmp/` is gitignored):

```bash
npx tsx tmp/trio-all-hv.ts
```

Constants at the top: `PICKS`, `UNIT`. Month tables print after the breakdowns.
