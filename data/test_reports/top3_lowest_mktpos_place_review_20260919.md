# Place bet on the lowest market position inside the analysis top 3 — backtest review

**Date:** 2026-09-19
**Strategy under test:** for each race, take the 3 horses with the highest MC win% (the top 3 rows of
`analyze-race`'s Win Probability Rankings), then bet PLACE on the one with the **lowest market position**
(shortest win odds, `mkt:` column).
**Stake:** flat $10 place, one bet per race. Returns from HKJC place dividends in `data/historical/results_*.json`.
**Pool:** 895 races with both a saved racecard and results — Sep 2025 → Sep 2026 (295 races 2025, 600 races 2026),
HV + ST, form source `all`.
**Tooling:** `npx tsx tools/backtest-mc-odds.ts --max-rank=3` (this strategy already exists there as "MC top-x →
lowest win odds"); per-race dump + breakdowns via a scratch script (`scratchpad/mktpos-backtest.ts`, `agg.py`).

---

## 1. Headline

| Variant | Bets | Hits | Hit rate | ROI | ROI 95% CI (bootstrap) |
|---|---:|---:|---:|---:|---|
| **No filters (bet every race)** | 895 | 520 | **58.1%** | **−12.6%** | [−17.6%, −7.2%] |
| Existing differentiation gates (`sparse≤3, close≤4, avgDiff≥14, Rtg+/−>−1`) | 188 | 125 | **66.5%** | **−3.2%** | [−13.8%, +6.8%] |

Break-even hit rate at the average place dividend actually collected (1.51) is **66.2%**. The ungated strategy
hits 58.1% — roughly 8 points short. It loses money, but it loses **less than the ~17.5% HKJC win/place takeout**,
i.e. it is riding the favourite–longshot bias, not beating the market.

The gated version is statistically indistinguishable from break-even (CI spans 0) on only 188 bets — promising,
not proven.

## 2. Against the obvious baselines (ungated, same 895 races)

| Strategy | Bets | Hits | Hit rate | ROI | Avg SP of pick |
|---|---:|---:|---:|---:|---:|
| top 3 → lowest mkt position (**the strategy**) | 895 | 520 | 58.1% | −12.6% | 3.9 |
| **Field favourite, model ignored** | 895 | 541 | **60.4%** | **−11.4%** | 3.1 |
| Rating-top3 → lowest mkt position | 895 | 525 | 58.7% | −11.7% | 3.8 |
| MC #1 (model's own top pick) | 895 | 421 | 47.0% | −19.1% | 6.8 |
| top 3 → **highest** mkt position (value reading) | 895 | 215 | 24.0% | −26.4% | 19.0 |
| All 3 legs flat ($10 × 3) | 2685 | 1074 | 40.0% | −20.1% | 10.4 |

Two things fall out:

1. **The odds filter rescues the model.** MC #1 alone is −19.1%; letting the market pick among the model's top 3
   lifts it to −12.6%. Where the two disagree (423 races) our pick beats MC #1 57.4% vs 34.0% (ROI −9.8% vs −23.7%).
2. **But the model adds nothing on top of the market.** The pick *is* the field favourite in **69.9%** of races.
   On the 269 races where it is not:

   | On the 269 "disagree" races | Hit rate | ROI |
   |---|---:|---:|
   | Our pick (top-3 constraint) | 45.4% | −15.0% |
   | Plain field favourite | 53.2% | −11.2% |

   So when the top-3 filter pushes you off the favourite, it costs money. Ungated, this strategy is a slightly
   worse-executed "back the favourite to place".

   Under the differentiation gates the sign flips (33 disagree races: ours −3.0% vs favourite −13.3%), but 33 bets
   is noise.

## 3. Breakdowns (ungated, 895 bets)

**By market position of the horse actually backed** — the strategy backs the favourite most of the time, and that
is where the hits are:

| mkt pos of pick | Bets | Hit rate | ROI |
|---|---:|---:|---:|
| 1 (favourite) | 626 | 63.6% | −11.5% |
| 2 | 161 | 53.4% | −8.5% |
| 3 | 58 | 43.1% | −9.2% |
| 4 | 32 | 25.0% | −33.0% |
| 5+ | 18 | 16.7% | −59.2% |

**By SP of the pick:**

| SP band | Bets | Hit rate | ROI |
|---|---:|---:|---:|
| <2.5 | 188 | 76.1% | −11.3% |
| 2.5–4 | 386 | 59.3% | −14.0% |
| 4–6 | 209 | 53.1% | −4.7% |
| 6–9 | 90 | 36.7% | −18.1% |
| 9–14 | 19 | 15.8% | −53.4% |
| 14+ | 3 | 33.3% | −30.0% |

**By MC rank of the pick:** rank 1 → 58.7% / −15.0%; rank 2 → 62.2% / **−6.6%**; rank 3 → 50.3% / −14.6%.
(The market preferring the model's #2 is the least-bad cell; on 254 bets this is suggestive, not actionable.)

**By venue:** HV 57.1% / −11.8% (338), ST 58.7% / −13.0% (557) — no venue edge.

**By field size:** ≤8 runners 81.0% / −17.1% (21 bets — short prices eat the dividend); 9–11 62.6% / −13.0% (115);
12+ 56.8% / −12.4% (759).

**By MC place% of the pick:** ≥70% → 67.1% / −8.1% (225); 60–70% → 58.5% / −14.4%; 50–60% → 59.2% / −8.5%;
<50% → 50.6% / −17.2% (310). Requiring the market pick to also carry decent model place probability trims the
worst third of bets.

**Stability over time** — the result is not stationary:

| | Bets | Hit rate | ROI |
|---|---:|---:|---:|
| 2025 (Sep–Dec) | 295 | 50.8% | −22.5% |
| 2026 (Jan–Sep) | 600 | 61.7% | −7.7% |

Monthly ROI swings from −28.9% (Dec 2025) to +4.4% (Mar 2026). Four of twelve months are positive. That spread is
consistent with a flat-negative edge plus variance, not with a regime that turned profitable.

## 4. What would have to change to make it pay

- Need ~66% place strike at current average dividend (1.51) to break even. Gap is ~8 points ungated, ~0 points with
  the differentiation gates.
- The only cuts that reached positive ROI were small and post-hoc: gated + SP 4–6 (35 bets, +11.7%), gated + mkt pos 3
  (9 bets, +20.0%). Treat as noise until forward-tested.
- Best honest candidate for paper trading: **gated + pick's MC place% ≥ 60% + SP 2.5–6** → 93 bets, 68.8%, +3.7% ROI.
  93 bets is far too few to conclude anything; log it forward rather than sizing it up.

## 5. Caveats

1. **Odds used are final SP.** Racecard snapshots in `data/racecards/` match result SP in 772/774 sampled runners
   (99.7%), so "market position" here is the closing market. Executing this needs bets placed at the off; an
   early-morning market position will sometimes name a different horse.
2. **MC is stochastic** (5000 runs, no fixed seed). Rerunning the whole backtest picks the same horse in 96.6% of
   races and gives 58.4% / −11.7% (vs 58.1% / −12.6%), so run-to-run noise is ≈1 ROI point.
3. Place dividends missing for 5 of 520 hits; those bets are excluded from ROI (cost and return both).
4. Pool is only races with a saved racecard — Sep 2025 onwards, not a full multi-season sample.
5. Takeout ~17.5% is the HKJC published win/place rate; rebates are not modelled.

## 6. Verdict

The rule works as a *repair* for the model's win-probability ranking (+6.5 ROI points over betting MC #1), but it
does not beat the market: 70% of the time it backs the favourite anyway, and when it does not, it underperforms the
favourite. Ungated it loses ~12.6% of turnover. Only under the existing differentiation gates does it approach
break-even (−3.2%, CI −13.8% to +6.8%), and that sample is 188 bets.

Recommendation: do not deploy ungated. If you want to carry it forward, run the gated version with the
MC place% ≥ 60% and SP 2.5–6 screens as a paper-trade log and re-review after ~150 more bets.
