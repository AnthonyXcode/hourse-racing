# Happy Valley review — last 10 meetings (13 May – 16 Sep 2026)

**Subject:** place bet on the simulation's #1 pick (top win % in `analyze-race`, 10,000 runs, `-f all`), as recorded before each meeting in `data/test_reports/mc_top1_place_allup_summary.md`.

**Data:** picks and simulation win/place % from that summary; finishing positions, place dividends and final win odds from `data/historical/results_YYYYMMDD_HV.json`. "Market place %" is the market's implied top-3 chance, computed from final win odds (Harville with a 0.8 discount for 2nd/3rd, the value fitted in the Trio walk-forward). Final odds are not known at bet time, so market figures are slightly optimistic.

**Stakes:** $10 per place bet. All-ups use consecutive races within a meeting, $10 per ticket, return = product of place dividends ÷ 10^(legs−1).

## Headline

| Measure | Result |
|---|---|
| Races | 88 over 10 meetings |
| Sim #1 placed | **42 / 88 (47.7%)** |
| Expected places — simulation | 56.0 (avg place % 63.7%) |
| Expected places — market | 38.8 (avg 44.1%) |
| Single place bets | $880 staked, $752 returned, **−$128 (ROI −14.5%)** |
| Market favourite placed (comparison) | 56 / 88 (63.6%); place bets $880 staked, $817 returned, −$63 (ROI −7.2%) |
| Sim #1 was a market top-2 choice | 49 races → placed **31 (63%)** |
| Sim #1 was market 3rd choice or worse | 39 races → placed **11 (28%)** |

## Key findings

1. **The simulation's place % is over-confident by about 16 points.** It expected 56.0 places (avg 63.7%); the picks placed 42 (47.7%). The market expected 38.8 (44.1%), so the actual result was close to — slightly above — what the market implied.
2. **The market favourite was the better place bet.** It placed 56/88 (63.6%) and lost 7.2%, against 42/88 (47.7%) and −14.5% for the sim #1. In the 62 races where the sim #1 was *not* the favourite, the sim pick placed 23 (37%, −$138) and the favourite placed 37 (60%, −$73).
3. **Agreement with the market decides the hit rate, not the simulation's own confidence.**
   - By market rank of the pick: favourite 70% placed, 2nd choice 55%, 3rd–4th 41%, 5th–6th 27%, 7th or worse **0 of 7**.
   - By simulation place %: under 55% → 48% placed, 55–65% → 38%, 65–75% → 46%, 75%+ → 65%. Apart from the top band, a higher simulation place % did not mean a higher hit rate.
   - The simulation gave market 7th-choice-or-worse picks 57% place on average; they placed none.
4. **Longer-priced picks lose most.** Picks under 5.0 odds placed 67% (−$6 on $430); picks 8.0 or longer placed 22% (−$90 on $270).
5. **Meeting-to-meeting swings are mostly luck.** No losing meeting was unusually unlucky under market prices (worst: 3 Jun, 17% chance of doing that badly). 16 Sep was the only unusual one — a 6% chance of placing 6 or more — i.e. lucky. 9 Sep had the weakest picks (market expected 2.5 places) and did better than expected.
6. **Good to Firm going looks bad (10/27 placed, −47%) but is not a finding.** All 27 races come from three meetings (13 May, 27 May, 3 Jun), so it cannot be separated from those meetings' picks.
7. **All-ups magnify the losses.** 2-leg consecutive all-ups: 17/78 won, ROI −31.3%. 3-leg: 8/68 won, ROI −41.7%.
8. **A "market top-2 only" filter helps but is not proven.** Single place bets: 49 bets, 63% placed, ROI −4.7% (vs −14.5%). 2-leg all-ups on those legs: +4.6% — but +$101 of that came from 16 Sep; without it, 12/34 won and −$83 (−24%). The rule was proposed after seeing 9 and 16 Sep, both in this sample, and it uses final odds.

## Recommendations

- **Stop treating simulation place % as a probability.** Read it as a ranking only; it overstates the real chance by about 16 points at Happy Valley (consistent with `notes/2026-09-15-hv-mc-place-calibration.md`).
- **Don't place-bet a sim #1 that the market ranks 5th or worse** (22 races here: 4 placed, −$96). If betting at all, restrict to picks that are the market's top-2 choice about 5 minutes before the off.
- **Avoid all-ups built from sim #1 legs.** Losses compound; only one meeting (16 Sep) produced a meaningful all-up profit.
- **Validate the market top-2 filter out of sample** before using it: apply it to the Sha Tin meetings in the summary and to the next 10 Happy Valley meetings using odds captured before the off, not final odds.
- **Log bet-time odds** for each suggested pick so future reviews measure what was actually bettable.

## Meeting by meeting

| Meeting | Races | Placed | Sim expects | Market expects | Chance of this many or fewer / more* | Sim #1 in market top 2 | Place P&L | Place ROI | Longest place run | 2-leg all-ups | 3-leg all-ups |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 13 May | 9 | 4 (44%) | 6.2 | 4.3 | 57% (≤4) — below market | 5 (placed 4) | −$38 | −42% | 2 | 1/8, −$61 | 0/7, −$70 |
| 20 May | 9 | 2 (22%) | 5.6 | 3.3 | 28% (≤2) — below market | 5 (placed 2) | −$59 | −66% | 1 | 0/8, −$80 | 0/7, −$70 |
| 27 May | 9 | 4 (44%) | 6.3 | 4.2 | 58% (≤4) — below market | 5 (placed 3) | −$35 | −39% | 1 | 0/8, −$80 | 0/7, −$70 |
| 3 Jun | 9 | 2 (22%) | 5.8 | 3.8 | 17% (≤2) — below market | 4 (placed 1) | −$53 | −59% | 1 | 0/8, −$80 | 0/7, −$70 |
| 10 Jun | 9 | 4 (44%) | 5.6 | 3.6 | 51% (≥4) — above market | 3 (placed 1) | −$1 | −2% | 2 | 1/8, $0 | 0/7, −$70 |
| 24 Jun | 9 | 6 (67%) | 5.3 | 4.6 | 26% (≥6) — above market | 7 (placed 5) | +$6 | 6% | 4 | 4/8, +$16 | 2/7, +$10 |
| 8 Jul | 9 | 6 (67%) | 5.5 | 4.5 | 23% (≥6) — above market | 5 (placed 4) | +$18 | 19% | 4 | 4/8, +$40 | 2/7, +$38 |
| 15 Jul | 9 | 4 (44%) | 5.0 | 4.6 | 48% (≤4) — below market | 6 (placed 3) | −$23 | −26% | 3 | 2/8, −$11 | 1/7, −$22 |
| 9 Sep | 8 | 4 (50%) | 5.5 | 2.5 | 21% (≥4) — above market | 3 (placed 2) | +$36 | 44% | 2 | 1/7, −$40 | 0/6, −$60 |
| 16 Sep | 8 | 6 (75%) | 5.3 | 3.5 | 6% (≥6) — above market | 6 (placed 6) | +$24 | 30% | 5 | 4/7, +$52 | 3/6, +$100 |

\* Probability, under market prices, of the sim #1 picks placing this many times or fewer (when below the market's expectation) or this many or more (when above). Under 10% = unusually unlucky/lucky.

**All-ups over 10 meetings:** 2-leg 17/78 won, $780 staked, −$244 (ROI −31.3%); 3-leg 8/68 won, $680 staked, −$284 (ROI −41.7%).

## What separates hits from misses

### By market rank of the sim #1 pick

| Group | Races | Placed | Avg sim place % | Avg market place % | P&L ($10 place) | ROI |
|---|---|---|---|---|---|---|
| Market rank 1 (favourite) | 27 | 19 (70%) | 66% | 62% | $0 | 0% |
| Market rank 2 | 22 | 12 (55%) | 63% | 50% | −$23 | −10% |
| Market rank 3–4 | 17 | 7 (41%) | 66% | 35% | −$9 | −6% |
| Market rank 5–6 | 15 | 4 (27%) | 61% | 26% | −$25 | −17% |
| Market rank 7+ | 7 | 0 (0%) | 57% | 20% | −$70 | −100% |

### By simulation place %

| Group | Races | Placed | Avg sim place % | Avg market place % | P&L ($10 place) | ROI |
|---|---|---|---|---|---|---|
| Sim place under 55% | 21 | 10 (48%) | 49% | 40% | −$15 | −7% |
| Sim place 55–65% | 26 | 10 (38%) | 60% | 43% | −$73 | −28% |
| Sim place 65–75% | 24 | 11 (46%) | 70% | 42% | −$27 | −11% |
| Sim place 75%+ | 17 | 11 (65%) | 79% | 54% | −$12 | −7% |

### By final odds of the pick

| Group | Races | Placed | Avg sim place % | Avg market place % | P&L ($10 place) | ROI |
|---|---|---|---|---|---|---|
| Odds under 3.5 | 25 | 18 (72%) | 69% | 65% | −$5 | −2% |
| Odds 3.5–5 | 18 | 11 (61%) | 61% | 49% | −$1 | −1% |
| Odds 5–8 | 18 | 7 (39%) | 63% | 39% | −$33 | −18% |
| Odds 8–13 | 18 | 5 (28%) | 62% | 28% | −$46 | −26% |
| Odds 13+ | 9 | 1 (11%) | 60% | 18% | −$42 | −47% |

### By class

| Group | Races | Placed | Avg sim place % | Avg market place % | P&L ($10 place) | ROI |
|---|---|---|---|---|---|---|
| Class 2 | 6 | 2 (33%) | 63% | 37% | −$20 | −34% |
| Class 3 | 24 | 14 (58%) | 68% | 49% | −$15 | −6% |
| Class 4 | 44 | 21 (48%) | 63% | 45% | −$55 | −13% |
| Class 5 | 14 | 5 (36%) | 59% | 35% | −$37 | −27% |

### By distance

| Group | Races | Placed | Avg sim place % | Avg market place % | P&L ($10 place) | ROI |
|---|---|---|---|---|---|---|
| 1000m | 11 | 6 (55%) | 65% | 41% | +$19 | 17% |
| 1200m | 39 | 18 (46%) | 64% | 44% | −$68 | −17% |
| 1650m | 29 | 15 (52%) | 64% | 48% | −$39 | −14% |
| 1800m | 7 | 3 (43%) | 60% | 40% | −$19 | −27% |
| 2200m | 2 | 0 (0%) | 62% | 24% | −$20 | −100% |

### By going

| Group | Races | Placed | Avg sim place % | Avg market place % | P&L ($10 place) | ROI |
|---|---|---|---|---|---|---|
| Good | 61 | 32 (52%) | 62% | 43% | −$2 | 0% |
| Good to Firm | 27 | 10 (37%) | 68% | 46% | −$126 | −47% |

## What-if: only bet when the sim #1 is a market top-2 choice

In-sample check — the rule was suggested after looking at 9, 13 and 16 Sep, and two of those meetings are in this sample. Uses final odds; bet-time odds will differ.

| Meeting | All picks: placed / P&L | Market top-2 only: bets, placed / P&L | 2-leg all-ups (top-2 legs, consecutive bets) |
|---|---|---|---|
| 13 May | 4/9, −$38 | 5 bets, 4 placed, +$2 | 3/4, +$11 |
| 20 May | 2/9, −$59 | 5 bets, 2 placed, −$19 | 0/4, −$40 |
| 27 May | 4/9, −$35 | 5 bets, 3 placed, −$13 | 1/4, −$23 |
| 3 Jun | 2/9, −$53 | 4 bets, 1 placed, −$27 | 0/3, −$30 |
| 10 Jun | 4/9, −$1 | 3 bets, 1 placed, −$15 | 0/2, −$20 |
| 24 Jun | 6/9, +$6 | 7 bets, 5 placed, +$12 | 3/6, +$17 |
| 8 Jul | 6/9, +$18 | 5 bets, 4 placed, +$7 | 3/4, +$20 |
| 15 Jul | 4/9, −$23 | 6 bets, 3 placed, −$18 | 1/5, −$30 |
| 9 Sep | 4/8, +$36 | 3 bets, 2 placed, +$6 | 1/2, +$10 |
| 16 Sep | 6/8, +$24 | 6 bets, 6 placed, +$44 | 5/5, +$101 |
| **Total** | **42/88, −$128 (−14.5%)** | **49 bets, 31 placed (63%), −$23 (−4.7%)** | **17/39, +$18 (4.6%)** |

## Race detail

### 13 May 2026

| Race | Class | Dist | Going | Runners | Sim #1 | Sim win % | Sim place % | Final odds | Market rank | Market place % | Finished | Place $ | Market favourite (odds) → finished |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1650 | Good to Firm | 12 | #11 DRAGON SUNRISE | 18.7% | 46.8% | 4.4 | 2 | 47% | ❌ 10th | — | #5 (3.6) → 4th |
| R2 | Class 4 | 1200 | Good to Firm | 12 | #12 NEBRASKAN | 53.5% | 83.8% | 2.9 | 1 | 63% | ✅ 1st | 13.5 | same horse |
| R3 | Class 3 | 1650 | Good to Firm | 9 | #4 ALL ROUND WINNER | 41.7% | 77.8% | 4.7 | 2 | 53% | ✅ 3rd | 14 | #7 (2) → 1st |
| R4 | Class 4 | 1650 | Good to Firm | 12 | #1 MIGHTY STEED | 31.8% | 63.6% | 5.6 | 3 | 41% | ❌ 12th | — | #10 (3.6) → 2nd |
| R5 | Class 3 | 1800 | Good to Firm | 9 | #8 ACE WAR | 37.7% | 77.1% | 2.8 | 2 | 69% | ✅ 3rd | 12.5 | #1 (2.6) → 1st |
| R6 | Class 4 | 1650 | Good to Firm | 12 | #1 HARMONY GALAXY | 29.5% | 61.3% | 16 | 8 | 18% | ❌ 9th | — | #12 (3.6) → 6th |
| R7 | Class 4 | 1200 | Good to Firm | 12 | #6 VIGOR EYE | 33.4% | 64.4% | 8.5 | 5 | 32% | ❌ 12th | — | #9 (2.7) → 7th |
| R8 | Class 3 | 1200 | Good to Firm | 12 | #2 AURIO | 33.6% | 68.7% | 2.2 | 1 | 73% | ✅ 3rd | 12 | same horse |
| R9 | Class 2 | 1650 | Good to Firm | 11 | #8 SILVERY BREEZE | 42.9% | 75.8% | 8.4 | 5 | 30% | ❌ 4th | — | #4 (5.1) → 2nd |

### 20 May 2026

| Race | Class | Dist | Going | Runners | Sim #1 | Sim win % | Sim place % | Final odds | Market rank | Market place % | Finished | Place $ | Market favourite (odds) → finished |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1000 | Good | 12 | #3 MAJESTIC DELIGHT | 25.8% | 58.7% | 15 | 6 | 21% | ❌ 4th | — | #7 (2.6) → 1st |
| R2 | Class 4 | 1650 | Good | 12 | #3 NEVER TOO SOON | 25.9% | 58.6% | 20 | 6 | 18% | ❌ 9th | — | #10 (1.9) → 1st |
| R3 | Class 4 | 1200 | Good | 12 | #10 CAPTAIN LINK | 24.3% | 54.3% | 10 | 5 | 27% | ❌ 6th | — | #4 (2.8) → 3rd |
| R4 | Class 4 | 1650 | Good | 12 | #6 FORTUNE STAR | 32.5% | 64.4% | 7.8 | 2 | 37% | ❌ 5th | — | #8 (1.7) → 1st |
| R5 | Class 4 | 1000 | Good | 12 | #4 BEAUTY SHOW | 24.1% | 55.8% | 5.3 | 2 | 50% | ❌ 7th | — | #2 (1.6) → 1st |
| R6 | Class 4 | 1200 | Good | 12 | #3 SUPERB KING | 29.6% | 62.7% | 3.7 | 2 | 55% | ✅ 2nd | 15.5 | #8 (3.4) → 11th |
| R7 | Class 3 | 1650 | Good | 12 | #3 LOVERO | 35.6% | 70.4% | 5.3 | 2 | 43% | ❌ 9th | — | #11 (4.4) → 1st |
| R8 | Class 3 | 1200 | Good | 12 | #3 GIANT BALLON | 45.0% | 80.0% | 3.3 | 1 | 58% | ✅ 2nd | 15 | same horse |
| R9 | Class 2 | 1200 | Good | 12 | #10 GENEVA | 23.5% | 53.7% | 10 | 7 | 26% | ❌ 4th | — | #7 (4.4) → 2nd |

### 27 May 2026

| Race | Class | Dist | Going | Runners | Sim #1 | Sim win % | Sim place % | Final odds | Market rank | Market place % | Finished | Place $ | Market favourite (odds) → finished |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1200 | Good to Firm | 12 | #10 EXCEED THE WISH | 28.5% | 61.8% | 3.7 | 1 | 54% | ✅ 3rd | 14.5 | same horse |
| R2 | Class 5 | 2200 | Good to Firm | 12 | #4 KASA PAPA | 27.9% | 62.2% | 15 | 5 | 21% | ❌ 6th | — | #7 (2.9) → 1st |
| R3 | Class 4 | 1650 | Good to Firm | 12 | #1 WITHALLMYFAITH | 26.4% | 58.4% | 2.5 | 1 | 69% | ✅ 2nd | 12 | same horse |
| R4 | Class 4 | 1200 | Good to Firm | 12 | #1 FIND MY LOVE | 36.4% | 69.4% | 6.2 | 2 | 41% | ❌ 9th | — | #5 (2.1) → 1st |
| R5 | Class 3 | 1650 | Good to Firm | 10 | #2 ARMOR GOLDEN EAGLE | 49.8% | 83.4% | 2 | 1 | 78% | ✅ 1st | 10.5 | same horse |
| R6 | Class 4 | 1200 | Good to Firm | 11 | #1 CROSSBORDERDUDE | 49.1% | 80.8% | 6.9 | 4 | 40% | ❌ 5th | — | #9 (4.1) → 1st |
| R7 | Class 4 | 1200 | Good to Firm | 11 | #2 HAPPY SHOOTER | 18.6% | 46.2% | 13 | 6 | 22% | ❌ 6th | — | #9 (3.3) → 1st |
| R8 | Class 3 | 1000 | Good to Firm | 12 | #1 HORSEPOWER | 54.0% | 84.3% | 5.9 | 4 | 38% | ✅ 2nd | 18 | #10 (4.9) → 7th |
| R9 | Class 3 | 1200 | Good to Firm | 12 | #9 HONEST WITNESS | 49.2% | 81.4% | 3.3 | 2 | 60% | ❌ 12th | — | #11 (2.9) → 4th |

### 3 Jun 2026

| Race | Class | Dist | Going | Runners | Sim #1 | Sim win % | Sim place % | Final odds | Market rank | Market place % | Finished | Place $ | Market favourite (odds) → finished |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1650 | Good to Firm | 12 | #3 FAMILY FORTUNE | 43.3% | 76.6% | 2.7 | 1 | 66% | ✅ 1st | 13 | same horse |
| R2 | Class 5 | 1200 | Good to Firm | 12 | #2 ALWAYS MY FOLKS | 37.5% | 70.6% | 4.2 | 1 | 48% | ❌ 5th | — | same horse |
| R3 | Class 4 | 1200 | Good to Firm | 12 | #3 CAPTAIN LINK | 19.5% | 47.1% | 8.8 | 7 | 29% | ❌ 10th | — | #1 (4.3) → 5th |
| R4 | Class 4 | 1650 | Good to Firm | 12 | #10 RUN RUN TIMING | 26.1% | 58.0% | 2.4 | 1 | 69% | ❌ 12th | — | same horse |
| R5 | Class 4 | 1200 | Good to Firm | 12 | #10 PODIUM | 43.6% | 77.3% | 10 | 4 | 29% | ❌ 4th | — | #7 (2.6) → 1st |
| R6 | Class 4 | 1200 | Good to Firm | 12 | #7 NEBRASKAN | 33.6% | 69.2% | 4.5 | 2 | 49% | ❌ 6th | — | #1 (2.8) → 1st |
| R7 | Class 3 | 1200 | Good to Firm | 12 | #1 HAPPY INDEX | 25.1% | 56.7% | 11 | 7 | 24% | ❌ 9th | — | #10 (4.2) → 3rd |
| R8 | Class 2 | 1800 | Good to Firm | 11 | #6 SILVERY BREEZE | 22.2% | 55.0% | 7.5 | 4 | 34% | ✅ 1st | 24 | #9 (3.4) → 5th |
| R9 | Class 3 | 1650 | Good to Firm | 12 | #1 SMART AVENUE | 31.6% | 65.4% | 7.4 | 4 | 33% | ❌ 5th | — | #4 (3.9) → 1st |

### 10 Jun 2026

| Race | Class | Dist | Going | Runners | Sim #1 | Sim win % | Sim place % | Final odds | Market rank | Market place % | Finished | Place $ | Market favourite (odds) → finished |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1800 | Good | 12 | #9 SMILING EMPEROR | 14.2% | 37.3% | 26 | 9 | 13% | ❌ 8th | — | #2 (3.9) → 1st |
| R2 | Class 4 | 1650 | Good | 10 | #5 NOBLE PURSUIT | 33.5% | 67.2% | 7.2 | 3 | 38% | ❌ 5th | — | #1 (2.4) → 1st |
| R3 | Class 4 | 1200 | Good | 12 | #5 KING OBERON | 23.1% | 53.0% | 8 | 3 | 31% | ✅ 3rd | 27.5 | #10 (3.3) → 12th |
| R4 | Class 4 | 1000 | Good | 12 | #5 BEAUTY SHOW | 24.5% | 55.7% | 8.7 | 4 | 30% | ✅ 2nd | 29 | #10 (3) → 6th |
| R5 | Class 4 | 1650 | Good | 12 | #5 DECISION LINK | 39.0% | 74.5% | 3 | 1 | 61% | ❌ 4th | — | same horse |
| R6 | Class 4 | 1200 | Good | 12 | #8 LIVE WIRE | 29.1% | 60.5% | 6.3 | 3 | 42% | ✅ 1st | 17.5 | #2 (2.4) → 4th |
| R7 | Class 3 | 1800 | Good | 12 | #10 AUDACIOUS PURSUIT | 51.2% | 81.6% | 3.2 | 1 | 58% | ❌ 7th | — | same horse |
| R8 | Class 3 | 1200 | Good | 12 | #1 AURIO | 41.0% | 78.9% | 10 | 4 | 30% | ❌ 5th | — | #8 (1.9) → 1st |
| R9 | Class 3 | 1200 | Good | 12 | #1 FLYING WROTE | 22.6% | 53.6% | 3.8 | 1 | 54% | ✅ 2nd | 14.5 | same horse |

### 24 Jun 2026

| Race | Class | Dist | Going | Runners | Sim #1 | Sim win % | Sim place % | Final odds | Market rank | Market place % | Finished | Place $ | Market favourite (odds) → finished |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 2200 | Good | 12 | #2 HAILTOTHEVICTORS | 27.1% | 61.9% | 9.4 | 4 | 27% | ❌ 8th | — | #3 (3.2) → 1st |
| R2 | Class 5 | 1650 | Good | 12 | #11 ORIENTAL | 18.4% | 43.9% | 6.3 | 2 | 37% | ✅ 2nd | 23.5 | #9 (4.2) → 1st |
| R3 | Class 4 | 1650 | Good | 12 | #5 FLYING FORTUNE | 18.5% | 45.6% | 4.6 | 1 | 46% | ✅ 1st | 15.5 | same horse |
| R4 | Class 4 | 1650 | Good | 12 | #5 VIVACIOUS WIN | 49.5% | 80.4% | 1.5 | 1 | 87% | ✅ 3rd | 13 | same horse |
| R5 | Class 4 | 1200 | Good | 12 | #4 GAMEPLAYER ELITE | 19.5% | 47.7% | 4.3 | 2 | 50% | ✅ 2nd | 16 | #2 (2.7) → 1st |
| R6 | Class 4 | 1200 | Good | 12 | #1 SPIRIT OF PEACE | 24.6% | 55.5% | 3.4 | 1 | 56% | ❌ 6th | — | same horse |
| R7 | Class 3 | 1000 | Good | 12 | #4 TOGETHER WE VALUE | 23.6% | 54.9% | 3.4 | 1 | 57% | ❌ 6th | — | same horse |
| R8 | Class 3 | 1200 | Good | 12 | #7 THE HEIR | 42.0% | 73.5% | 8.4 | 5 | 30% | ✅ 3rd | 14 | #9 (4.8) → 11th |
| R9 | Class 3 | 1650 | Good | 11 | #5 ROMANTIC GLADIATOR | 32.9% | 68.9% | 2.5 | 1 | 69% | ✅ 2nd | 13.5 | same horse |

### 8 Jul 2026

| Race | Class | Dist | Going | Runners | Sim #1 | Sim win % | Sim place % | Final odds | Market rank | Market place % | Finished | Place $ | Market favourite (odds) → finished |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1000 | Good | 11 | #1 COUNTRY DANCER | 26.8% | 59.8% | 9.7 | 6 | 29% | ✅ 2nd | 30.5 | #3 (3) → 1st |
| R2 | Class 4 | 1650 | Good | 12 | #6 SHOOTING TO TOP | 22.6% | 52.4% | 4 | 2 | 53% | ✅ 2nd | 17 | #2 (3) → 9th |
| R3 | Class 4 | 1000 | Good | 12 | #4 BEAUTY SHOW | 38.5% | 74.3% | 3.3 | 2 | 61% | ✅ 2nd | 14.5 | #11 (2.8) → 1st |
| R4 | Class 4 | 1650 | Good | 8 | #1 FORZA TORO | 25.2% | 61.7% | 3 | 2 | 67% | ✅ 1st | 13.5 | #5 (2.8) → 4th |
| R5 | Class 4 | 1200 | Good | 12 | #3 SUPERB KING | 27.8% | 59.3% | 4.9 | 3 | 44% | ❌ 6th | — | #9 (4.4) → 1st |
| R6 | Class 4 | 1200 | Good | 12 | #4 LEADING AGILITY | 25.6% | 55.9% | 1.7 | 1 | 83% | ✅ 1st | 12 | same horse |
| R7 | Class 3 | 1000 | Good | 12 | #3 BUNTA BABY | 37.2% | 69.6% | 7.2 | 4 | 35% | ✅ 3rd | 20 | #11 (3.2) → 7th |
| R8 | Class 2 | 1800 | Good | 12 | #2 BEAUTY ALLIANCE | 23.3% | 54.4% | 9.1 | 6 | 29% | ❌ 12th | — | #3 (3.5) → 9th |
| R9 | Class 3 | 1200 | Good | 12 | #7 KING PROFIT | 27.5% | 60.8% | 4.5 | 2 | 49% | ❌ 8th | — | #1 (3.8) → 7th |

### 15 Jul 2026

| Race | Class | Dist | Going | Runners | Sim #1 | Sim win % | Sim place % | Final odds | Market rank | Market place % | Finished | Place $ | Market favourite (odds) → finished |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1650 | Good | 12 | #9 KASA PAPA | 18.3% | 44.8% | 7.5 | 5 | 32% | ❌ 5th | — | #10 (4) → 3rd |
| R2 | Class 4 | 1200 | Good | 12 | #2 WINNING MONEY | 21.1% | 51.0% | 5.7 | 3 | 41% | ❌ 4th | — | #9 (3.5) → 2nd |
| R3 | Class 4 | 1800 | Good | 12 | #10 KYRUS TREASURE | 18.3% | 43.6% | 3 | 1 | 61% | ✅ 1st | 14.5 | same horse |
| R4 | Class 4 | 1650 | Good | 12 | #1 SKY DEEP | 37.1% | 70.9% | 7.2 | 3 | 36% | ✅ 2nd | 24.5 | #8 (2.5) → 8th |
| R5 | Class 4 | 1200 | Good | 12 | #1 PEJIBAYE | 38.5% | 72.2% | 2.6 | 1 | 68% | ✅ 3rd | 13.5 | same horse |
| R6 | Class 4 | 1200 | Good | 12 | #7 DOUBLE ALPHA | 17.6% | 44.5% | 4.3 | 2 | 49% | ❌ 10th | — | #8 (3.2) → 11th |
| R7 | Class 3 | 1650 | Good | 12 | #10 SOMELOVEFROMABOVE | 28.9% | 59.7% | 3 | 1 | 61% | ❌ 5th | — | same horse |
| R8 | Class 2 | 1200 | Good | 11 | #2 BOTTOMUPTOGETHER | 29.0% | 59.8% | 5.1 | 2 | 44% | ❌ 4th | — | #5 (4.4) → 6th |
| R9 | Class 3 | 1200 | Good | 12 | #11 DANICA'S CHOICE | 22.2% | 51.7% | 2.7 | 1 | 64% | ✅ 2nd | 14 | same horse |

### 9 Sep 2026

| Race | Class | Dist | Going | Runners | Sim #1 | Sim win % | Sim place % | Final odds | Market rank | Market place % | Finished | Place $ | Market favourite (odds) → finished |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1200 | Good | 12 | #7 NOBLE FANS | 35.9% | 72.8% | 11 | 5 | 24% | ❌ 7th | — | #10 (3.2) → 4th |
| R2 | Class 4 | 1650 | Good | 10 | #1 MIGHTY STEED | 45.5% | 79.2% | 4.9 | 2 | 49% | ✅ 1st | 14.5 | #9 (2.3) → 4th |
| R3 | Class 5 | 1200 | Good | 12 | #1 LAKESHORE HERO | 30.9% | 66.0% | 4.8 | 1 | 44% | ✅ 2nd | 21 | same horse |
| R4 | Class 4 | 1650 | Good | 11 | #1 SHAMZ | 35.0% | 70.9% | 11 | 5 | 25% | ❌ 9th | — | #10 (2.9) → 1st |
| R5 | Class 3 | 1650 | Good | 12 | #10 FORTUNATE SON | 18.5% | 44.9% | 9.4 | 5 | 27% | ✅ 1st | 32.5 | #4 (4.1) → 6th |
| R6 | Class 4 | 1000 | Good | 12 | #2 BEAUTY SHOW | 31.2% | 69.9% | 4.5 | 1 | 48% | ❌ 12th | — | #3 (4.5) → 2nd |
| R7 | Class 4 | 1200 | Good | 12 | #2 FORERUNNER | 34.0% | 67.9% | 20 | 6 | 17% | ✅ 2nd | 47.5 | #1 (2) → 1st |
| R8 | Class 3 | 1200 | Good | 12 | #2 HARMONY N BLESSED | 39.2% | 73.4% | 22 | 9 | 14% | ❌ 6th | — | #4 (3.9) → 2nd |

### 16 Sep 2026

| Race | Class | Dist | Going | Runners | Sim #1 | Sim win % | Sim place % | Final odds | Market rank | Market place % | Finished | Place $ | Market favourite (odds) → finished |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R1 | Class 5 | 1000 | Good | 12 | #2 ALWAYS MY FOLKS | 28.9% | 65.2% | 9.4 | 4 | 28% | ❌ 8th | — | #7 (3.7) → 7th |
| R2 | Class 4 | 1200 | Good | 12 | #3 BRIGHT DAY | 41.7% | 75.1% | 4.7 | 2 | 47% | ✅ 1st | 18.5 | #11 (3.7) → 4th |
| R3 | Class 4 | 1800 | Good | 12 | #8 FAMILY FORTUNE | 34.0% | 70.0% | 24 | 8 | 14% | ❌ 5th | — | #6 (2.9) → 2nd |
| R4 | Class 4 | 1200 | Good | 12 | #3 LIVE WIRE | 34.0% | 67.8% | 3.1 | 1 | 60% | ✅ 1st | 16 | same horse |
| R5 | Class 4 | 1200 | Good | 12 | #7 WINNING MONEY | 22.3% | 52.1% | 5.4 | 2 | 42% | ✅ 3rd | 19.5 | #6 (3.1) → 1st |
| R6 | Class 3 | 1650 | Good | 12 | #1 DAZZLING FIT | 27.7% | 58.1% | 4.9 | 2 | 43% | ✅ 2nd | 18 | #2 (4.2) → 1st |
| R7 | Class 3 | 1000 | Good | 12 | #1 LOVE TOGETHER | 32.4% | 69.1% | 3.4 | 1 | 54% | ✅ 3rd | 16.5 | same horse |
| R8 | Class 2 | 1650 | Good | 11 | #12 LE ZONDA | 44.2% | 76.6% | 3 | 1 | 61% | ✅ 1st | 15.5 | same horse |
