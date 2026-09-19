# Happy Valley place bets on the simulation's #1 — 12-month review

**Period:** 17 Sep 2025 – 16 Sep 2026 · **37 Happy Valley meetings, 330 races** · Sha Tin shown only for comparison.

**Bet:** $10 place on the #1 horse by simulation win % in each Happy Valley race.

**Method:**
- Picks re-computed from the saved race cards in `data/racecards/` with the current code, as `analyze-race -f all` does (form analysis → Monte Carlo, 10,000 runs, noise 11 at Happy Valley, 8 at Sha Tin). Live picks were only recorded from 18 Mar 2026, so earlier months had to be re-run.
- The simulation is random, so it was run **3 times**; tables use run 1 and the headline shows the range. The #1 pick was identical in all 3 runs in **306/330 races (93%)**.
- Check against live picks: for the 142 races recorded in `mc_top1_place_allup_summary.md`, the re-computed #1 matches the live #1 in **103 (73%)**. Differences come from simulation randomness, code changes since, and card updates (scratchings, going) made after the live run.
- Results, place dividends and final win odds from `data/historical/results_*.json`. Races with 6 or fewer runners pay 2 places. Dead-heats use the dividend order in the results file.
- "Market rank" and "market place %" use **final** win odds (Harville top-3 with a 0.8 discount for 2nd/3rd). Final odds are not available at bet time, so market-based rules look slightly better here than they would live.

## Headline

| | Happy Valley | Sha Tin (comparison) |
|---|---|---|
| Races bet | 330 | 537 |
| #1 placed | **167 (50.6%)** | 255 (47.5%) |
| Stake / return | $3,300 / $3,027 | $5,370 / $4,307 |
| **P&L, ROI** | **−$273, −8.3%** | −$1,063, −19.8% |
| ROI 95% range (bootstrap) | −20.1% to 3.4% | −25.6% to −10.1% |
| ROI across 3 simulation runs | −8.3% / −12.3% / −11.9% | −19.8% / −19.9% / −22.2% |
| Places expected — simulation | 201.6 (avg 61.1%) | 370.0 (avg 68.9%) |
| Places expected — market | 157.6 (avg 47.7%) | 256.3 (avg 47.7%) |
| Market favourite, same bet | 202/330 placed (61.2%), −$324, −9.8% | 325/537 (60.5%), −$594, −11.1% |
| 2-leg all-ups (back-to-back races) | 71/293 won, −$552, −18.8% | 111/485, −$1,793, −37.0% |
| 3-leg all-ups | 34/256 won, −$422, −16.5% | 49/433, −$2,166, −50.0% |

## Key findings

1. **Betting the #1 to place at Happy Valley loses about 8–12%.** 330 bets, 167 placed (50.6%), −$273 on $3,300 (ROI −8.3%; −12.3% and −11.9% in the other two simulation runs). The 95% range (−20% to +3%) includes break-even, but no run was profitable.
2. **Dropping Sha Tin helps.** The same bet at Sha Tin lost about 20% (537 bets, 46–47% placed) in all three runs, so Happy Valley-only halves the loss rate. It does not turn it into a profit.
3. **Betting the market favourite instead is about the same** (202/330 placed, 61.2%, ROI −9.8%). Higher hit rate, lower dividends.
4. **The simulation's place % is over-confident on average** (expected 201.6 places, got 167) **— except at the top.** Picks shown at 75% or more placed 87% (34 of 39) and made +20.0%. Picks shown at 55–65% placed only 39% and lost 25%.
5. **A 70–75% place gate is the one filter that holds up.** ≥75%: ROI +20.0% / +19.6% / +23.1% over three simulation runs, positive in Sep–Feb (+13.2%) and Mar–Sep (+26.5%). ≥70%: +5% to +8%, also positive in both halves. The same gates lose 14–19% at Sha Tin, so this is Happy Valley-specific. Caveats: only ~39 bets a year (about 3 a month), the 95% range is +1% to +34%, and it was first noticed on this same season's data.
6. **Market-rank filters don't help over 12 months.** "Skip market rank 5+" (−10.0%) and "only market top-2" (−6.4%) are both within noise of betting every race (−8.3%). The improvement seen in the last 10 meetings did not hold in Sep 2025 – Feb 2026 (−17.9% and −15.6%).
7. **Months swing widely:** from −32% (Oct 2025, May 2026) to +42% (Jul 2026). 13 of 37 meetings were profitable. Only 4 meetings were unusual under market prices — lucky 14 Jan, 15 Apr and 16 Sep, unlucky 3 Dec.
8. **All-ups lose more:** 2-leg back-to-back all-ups −18.8% (71/293 won), 3-leg −16.5% (34/256).

## Recommendations

- **Don't bet every race's #1.** At Happy Valley it loses ~8–12% a year; at Sha Tin ~20%.
- **If you bet, use the ≥75% place gate at Happy Valley only**, with single place bets, not all-ups. Expect about 3 bets a month.
- **Paper-trade the ≥75% gate for the rest of the 2026–27 season before staking.** It has not been tested on data outside this season, and 39 bets is too few to trust +20%. Record the live place % and the odds at bet time.
- **Watch the boundary.** Simulation randomness moves 1–3 races a year across 75%; round the place % from a single live run and don't re-run to "check".
- **Don't use market-rank filters as a replacement** — they did not improve the 12-month result.

> **Recent-meeting context:** `hv_last10_mc_top1_place_review_20260917.md` covers only 13 May – 16 Sep. Some of its conclusions (the market-rank filters) do not hold over the full 12 months — see Filters below.


## Filters (Happy Valley)

| Rule | Bets | Placed | P&L | ROI [95% range] | ROI in 3 sim runs | Sep–Feb | Mar–Sep | 2-leg all-ups |
|---|---|---|---|---|---|---|---|---|
| All #1 picks | 330 | 167 (51%) | −$273 | −8.3% [−20% to 3%] | −8.3% / −12.3% / −11.9% | 170 bets, 46% placed, −15.4% | 160 bets, 56% placed, −0.8% | 71/293, −18.8% |
| Skip if market rank 5+ | 271 | 150 (55%) | −$271 | −10.0% [−19% to −1%] | −10.0% / −12.5% / −11.1% | 143 bets, 50% placed, −17.9% | 128 bets, 62% placed, −1.2% | 68/234, −23.8% |
| Only market top-2 | 200 | 125 (63%) | −$128 | −6.4% [−17% to 4%] | −6.4% / −7.6% / −6.7% | 104 bets, 56% placed, −15.6% | 96 bets, 70% placed, 3.5% | 63/163, −10.8% |
| Market favourite instead | 330 | 202 (61%) | −$324 | −9.8% | — | 170 bets, 57% placed, −14.9% | 160 bets, 66% placed, −4.5% | — |

"Skip if market rank 5+" and "Only market top-2" were proposed from the 13 May – 16 Sep meetings, which are part of this sample; the Sep–Feb column is the cleanest out-of-sample check.

## Simulation place % gate (Happy Valley)

Bet the #1 only when its simulation place % is at or above the threshold. Earlier notes (`notes/2026-09-15-hv-mc-place-calibration.md`, `--mc-min=75` in `notes/2026-09-14-hv-turf-market-agreement-gate.md`) found the same pattern on this season's data, so this is a consistency check, not independent proof.

| Gate | Bets (3 runs) | Placed | P&L (run 1) | ROI in 3 runs | ROI 95% range (run 1) | Sep–Feb | Mar–Sep | Sha Tin, same gate | 2-leg all-ups |
|---|---|---|---|---|---|---|---|---|---|
| ≥60% | 172 / 173 / 172 | 57% | −$131 | −7.6% / −10.0% / −9.0% | −21% to 7% | 83 bets, 55%, −11.1% | 89 bets, 58%, −4.4% | 399 bets, 52%, −16.1% | 41/135, −23.9% |
| ≥65% | 117 / 118 / 116 | 66% | +$45 | 3.8% / 3.3% / 1.8% | −14% to 20% | 52 bets, 65%, 1.3% | 65 bets, 66%, 5.9% | 327 bets, 53%, −16.8% | 34/80, 7.2% |
| ≥70% | 73 / 77 / 74 | 74% | +$57 | 7.7% / 6.5% / 5.3% | −6% to 22% | 32 bets, 78%, 14.5% | 41 bets, 71%, 2.4% | 244 bets, 55%, −18.5% | 20/40, 9.1% |
| **≥75%** | 39 / 37 / 40 | 87% | +$78 | 20.0% / 19.6% / 23.1% | 1% to 34% | 19 bets, 84%, 13.2% | 20 bets, 90%, 26.5% | 164 bets, 58%, −18.9% | 9/15, 7.2% |
| ≥80% | 13 / 16 / 14 | 77% | +$7 | 5.0% / 10.6% / 7.9% | −30% to 38% | 7 bets, 71%, −2.1% | 6 bets, 83%, 13.3% | 117 bets, 62%, −13.6% | 1/2, −39.6% |

The ≥75% bets average final odds of 3.21; 27 of 39 were the market favourite and 35 were a market top-2 choice. About 3.3 bets a month.

| Date | Race | Pick | Sim place % | Final odds | Market rank | Finished | Place $ |
|---|---|---|---|---|---|---|---|
| 8 Oct 2025 | R9 | #5 BIENVENUE | 80% | 3.1 | 1 | ✅ 2 | 14 |
| 15 Oct 2025 | R6 | #3 TOURBILLON GOLFER | 79% | 3.1 | 2 | ✅ 3 | 14 |
| 22 Oct 2025 | R8 | #5 SOUTH STAR | 75% | 1.8 | 1 | ✅ 1 | 12 |
| 2 Nov 2025 | R6 | #10 HAKKA RADIANCE | 78% | 3.9 | 1 | ✅ 1 | 17.5 |
| 5 Nov 2025 | R1 | #1 STORM RUNNER | 89% | 1.7 | 1 | ✅ 2 | 11.5 |
| 5 Nov 2025 | R5 | #2 LUNAR DASH | 83% | 1.7 | 1 | ✅ 2 | 10.5 |
| 5 Nov 2025 | R7 | #2 THUNDER PRINCE | 76% | 2.2 | 1 | ✅ 3 | 11.5 |
| 12 Nov 2025 | R1 | #4 APOLAR FIGHTER | 75% | 3.7 | 2 | ✅ 2 | 13.5 |
| 12 Nov 2025 | R2 | #8 TALENTS SUPREMO | 83% | 3.6 | 1 | ❌ 7 | — |
| 12 Nov 2025 | R5 | #2 ROBOT LUCKY STAR | 78% | 2.3 | 1 | ✅ 2 | 13 |
| 3 Dec 2025 | R3 | #2 STORM RUNNER | 80% | 3.1 | 1 | ✅ 2 | 14.5 |
| 3 Dec 2025 | R6 | #1 LUNAR DASH | 80% | 4.1 | 3 | ❌ 7 | — |
| 10 Dec 2025 | R5 | #3 CORLEONE | 77% | 1.8 | 1 | ✅ 1 | 12 |
| 17 Dec 2025 | R1 | #2 STORM RUNNER | 81% | 3.2 | 1 | ✅ 3 | 14.5 |
| 7 Jan 2026 | R1 | #3 STORM RUNNER | 89% | 2.4 | 1 | ✅ 3 | 13 |
| 7 Jan 2026 | R9 | #7 CORLEONE | 77% | 2 | 1 | ✅ 2 | 12.5 |
| 14 Jan 2026 | R9 | #6 PERFECTDAY | 84% | 4.8 | 2 | ✅ 2 | 19 |
| 4 Feb 2026 | R8 | #2 STORM RIDER | 81% | 2.8 | 1 | ❌ 7 | — |
| 11 Feb 2026 | R6 | #2 MAX QUE | 80% | 2 | 1 | ✅ 2 | 12 |
| 18 Mar 2026 | R9 | #1 MAX QUE | 75% | 2.5 | 1 | ✅ 3 | 12.5 |
| 25 Mar 2026 | R7 | #2 GIANT BALLON | 81% | 2.6 | 1 | ✅ 1 | 13.5 |
| 22 Apr 2026 | R8 | #11 ACE WAR | 80% | 3 | 1 | ✅ 2 | 14.5 |
| 22 Apr 2026 | R9 | #1 AURIO | 76% | 3.4 | 2 | ✅ 2 | 13.5 |
| 29 Apr 2026 | R2 | #4 HONEST WITNESS | 76% | 2.5 | 1 | ✅ 1 | 13 |
| 29 Apr 2026 | R4 | #1 CROSSBORDERDUDE | 76% | 2.8 | 1 | ✅ 3 | 13.5 |
| 29 Apr 2026 | R8 | #4 GIANT BALLON | 81% | 2.7 | 1 | ✅ 1 | 14.5 |
| 13 May 2026 | R2 | #12 NEBRASKAN | 76% | 2.9 | 1 | ✅ 1 | 13.5 |
| 13 May 2026 | R5 | #8 ACE WAR | 76% | 2.8 | 2 | ✅ 3 | 12.5 |
| 20 May 2026 | R8 | #3 GIANT BALLON | 80% | 3.3 | 1 | ✅ 2 | 15 |
| 27 May 2026 | R5 | #2 ARMOR GOLDEN EAGLE | 82% | 2 | 1 | ✅ 1 | 10.5 |
| 27 May 2026 | R6 | #1 CROSSBORDERDUDE | 82% | 6.9 | 4 | ❌ 5 | — |
| 27 May 2026 | R8 | #1 HORSEPOWER | 76% | 5.9 | 4 | ✅ 2 | 18 |
| 27 May 2026 | R9 | #9 HONEST WITNESS | 78% | 3.3 | 2 | ❌ 12 | — |
| 3 Jun 2026 | R1 | #3 FAMILY FORTUNE | 76% | 2.7 | 1 | ✅ 1 | 13 |
| 24 Jun 2026 | R4 | #5 VIVACIOUS WIN | 79% | 1.5 | 1 | ✅ 3 | 13 |
| 24 Jun 2026 | R8 | #7 THE HEIR | 76% | 8.4 | 5 | ✅ 3 | 14 |
| 9 Sep 2026 | R2 | #1 MIGHTY STEED | 81% | 4.9 | 2 | ✅ 1 | 14.5 |
| 16 Sep 2026 | R2 | #3 BRIGHT DAY | 76% | 4.7 | 2 | ✅ 1 | 18.5 |
| 16 Sep 2026 | R8 | #12 LE ZONDA | 75% | 3 | 1 | ✅ 1 | 15.5 |
## By month (Happy Valley)

| Month | Meetings | Races | Placed | Sim expected | Market expected | P&L | ROI | Skip rank 5+: P&L (ROI) | Market favourite: P&L (ROI) |
|---|---|---|---|---|---|---|---|---|---|
| Sep 2025 | 1 | 8 | 3 (38%) | 4.4 | 3.6 | −$18 | −23% | −$18 (−23%) | −$28 (−36%) |
| Oct 2025 | 3 | 27 | 11 (41%) | 16.0 | 12.1 | −$85 | −32% | −$48 (−24%) | +$45 (16%) |
| Nov 2025 | 5 | 46 | 23 (50%) | 28.8 | 23.2 | −$40 | −9% | −$78 (−19%) | −$79 (−17%) |
| Dec 2025 | 4 | 35 | 12 (34%) | 20.5 | 16.7 | −$110 | −31% | −$113 (−40%) | −$59 (−17%) |
| Jan 2026 | 3 | 27 | 17 (63%) | 16.3 | 12.9 | +$31 | 11% | +$46 (21%) | −$12 (−4%) |
| Feb 2026 | 3 | 27 | 12 (44%) | 16.5 | 13.3 | −$38 | −14% | −$44 (−19%) | −$118 (−44%) |
| Mar 2026 | 4 | 36 | 17 (47%) | 21.5 | 17.3 | −$98 | −27% | −$38 (−14%) | +$22 (6%) |
| Apr 2026 | 4 | 36 | 27 (75%) | 22.8 | 19.2 | +$109 | 30% | +$38 (13%) | −$30 (−8%) |
| May 2026 | 3 | 27 | 12 (44%) | 17.1 | 12.5 | −$87 | −32% | −$47 (−20%) | +$25 (9%) |
| Jun 2026 | 3 | 27 | 13 (48%) | 16.5 | 12.2 | −$37 | −14% | −$11 (−5%) | −$55 (−21%) |
| Jul 2026 | 2 | 18 | 11 (61%) | 10.5 | 8.7 | +$75 | 42% | +$4 (3%) | −$49 (−27%) |
| Sep 2026 | 2 | 16 | 9 (56%) | 10.8 | 6.0 | +$27 | 17% | +$40 (40%) | +$17 (11%) |

## By meeting (Happy Valley)

| Meeting | Races | Placed | Market expected | How unusual* | #1 in market top 2 | P&L | ROI | Longest place run | 2-leg all-ups |
|---|---|---|---|---|---|---|---|---|---|
| 17 Sep 2025 | 8 | 3 (38%) | 3.6 | 48% ≤3 | 5 (placed 2) | −$18 | −23% | 2 | 1/7, −$24 |
| 8 Oct 2025 | 9 | 4 (44%) | 3.8 | 58% ≥4 | 5 (placed 4) | −$25 | −28% | 2 | 1/8, −$55 |
| 15 Oct 2025 | 9 | 3 (33%) | 3.7 | 44% ≤3 | 4 (placed 2) | −$27 | −30% | 1 | 0/8, −$80 |
| 22 Oct 2025 | 9 | 4 (44%) | 4.6 | 48% ≤4 | 5 (placed 3) | −$33 | −37% | 2 | 1/8, −$64 |
| 2 Nov 2025 | 10 | 6 (60%) | 4.7 | 29% ≥6 | 6 (placed 4) | +$27 | 27% | 4 | 3/9, +$28 |
| 5 Nov 2025 | 9 | 5 (56%) | 5.3 | 56% ≤5 | 6 (placed 4) | −$21 | −23% | 3 | 2/8, −$25 |
| 12 Nov 2025 | 9 | 5 (56%) | 4.5 | 49% ≥5 | 7 (placed 4) | −$10 | −11% | 3 | 2/8, −$23 |
| 19 Nov 2025 | 9 | 3 (33%) | 4.2 | 31% ≤3 | 6 (placed 3) | −$47 | −52% | 2 | 1/8, −$61 |
| 26 Nov 2025 | 9 | 4 (44%) | 4.6 | 47% ≤4 | 6 (placed 3) | +$12 | 13% | 2 | 1/8, −$53 |
| 3 Dec 2025 | 8 | 2 (25%) | 4.6 | 6% ≤2 — unlucky | 7 (placed 2) | −$49 | −61% | 1 | 0/7, −$70 |
| 10 Dec 2025 | 9 | 2 (22%) | 3.7 | 20% ≤2 | 3 (placed 1) | −$50 | −56% | 2 | 1/8, −$47 |
| 17 Dec 2025 | 9 | 4 (44%) | 4.9 | 39% ≤4 | 7 (placed 4) | −$30 | −33% | 3 | 2/8, −$37 |
| 23 Dec 2025 | 9 | 4 (44%) | 3.6 | 52% ≥4 | 3 (placed 1) | +$20 | 22% | 2 | 1/8, +$51 |
| 7 Jan 2026 | 9 | 5 (56%) | 5.3 | 56% ≤5 | 7 (placed 5) | −$20 | −22% | 2 | 1/8, −$57 |
| 14 Jan 2026 | 9 | 7 (78%) | 3.7 | 3% ≥7 — lucky | 5 (placed 5) | +$58 | 64% | 5 | 4/8, +$50 |
| 28 Jan 2026 | 9 | 5 (56%) | 3.9 | 34% ≥5 | 5 (placed 4) | −$6 | −7% | 5 | 4/8, +$35 |
| 4 Feb 2026 | 9 | 4 (44%) | 4.6 | 46% ≤4 | 8 (placed 3) | −$17 | −19% | 3 | 2/8, −$27 |
| 11 Feb 2026 | 9 | 6 (67%) | 4.5 | 23% ≥6 | 5 (placed 4) | +$19 | 21% | 4 | 3/8, −$25 |
| 25 Feb 2026 | 9 | 2 (22%) | 4.2 | 12% ≤2 | 4 (placed 0) | −$40 | −44% | 1 | 0/8, −$80 |
| 4 Mar 2026 | 9 | 4 (44%) | 3.8 | 58% ≥4 | 5 (placed 4) | −$27 | −30% | 3 | 2/8, −$36 |
| 11 Mar 2026 | 9 | 4 (44%) | 4.6 | 48% ≤4 | 5 (placed 3) | −$28 | −31% | 2 | 1/8, −$58 |
| 18 Mar 2026 | 9 | 5 (56%) | 4.8 | 59% ≥5 | 6 (placed 5) | −$24 | −27% | 2 | 2/8, −$49 |
| 25 Mar 2026 | 9 | 4 (44%) | 4.1 | 60% ≤4 | 5 (placed 3) | −$19 | −21% | 1 | 0/8, −$80 |
| 8 Apr 2026 | 9 | 6 (67%) | 4.5 | 25% ≥6 | 7 (placed 5) | +$8 | 8% | 6 | 5/8, +$53 |
| 15 Apr 2026 | 9 | 7 (78%) | 4.6 | 10% ≥7 — lucky | 5 (placed 5) | +$31 | 34% | 4 | 5/8, +$66 |
| 22 Apr 2026 | 9 | 7 (78%) | 4.9 | 13% ≥7 | 7 (placed 5) | +$36 | 40% | 3 | 4/8, +$35 |
| 29 Apr 2026 | 9 | 7 (78%) | 5.1 | 17% ≥7 | 7 (placed 5) | +$35 | 38% | 4 | 4/8, +$34 |
| 13 May 2026 | 9 | 4 (44%) | 4.3 | 57% ≤4 | 5 (placed 4) | −$38 | −42% | 2 | 1/8, −$61 |
| 20 May 2026 | 9 | 4 (44%) | 3.8 | 59% ≥4 | 6 (placed 3) | −$20 | −22% | 2 | 1/8, −$41 |
| 27 May 2026 | 9 | 4 (44%) | 4.4 | 53% ≤4 | 5 (placed 2) | −$29 | −32% | 1 | 0/8, −$80 |
| 3 Jun 2026 | 9 | 4 (44%) | 4.1 | 62% ≤4 | 5 (placed 3) | −$19 | −21% | 1 | 0/8, −$80 |
| 10 Jun 2026 | 9 | 4 (44%) | 4.1 | 61% ≤4 | 4 (placed 2) | −$5 | −6% | 2 | 1/8, $0 |
| 24 Jun 2026 | 9 | 5 (56%) | 4.0 | 34% ≥5 | 4 (placed 3) | −$12 | −14% | 3 | 3/8, −$13 |
| 8 Jul 2026 | 9 | 6 (67%) | 4.5 | 23% ≥6 | 5 (placed 4) | +$18 | 19% | 4 | 4/8, +$40 |
| 15 Jul 2026 | 9 | 5 (56%) | 4.2 | 42% ≥5 | 6 (placed 3) | +$58 | 64% | 4 | 3/8, +$271 |
| 9 Sep 2026 | 8 | 3 (38%) | 2.5 | 47% ≥3 | 3 (placed 2) | +$3 | 4% | 2 | 1/7, −$40 |
| 16 Sep 2026 | 8 | 6 (75%) | 3.5 | 6% ≥6 — lucky | 6 (placed 6) | +$24 | 30% | 5 | 4/7, +$52 |

\* Chance, under final-odds market prices, of the picks placing this many times or fewer (if below the market's expectation) or this many or more (if above). Under 10% is flagged.

## What drives hits and misses (Happy Valley)

### Market rank of the #1 pick

| Group | Bets | Placed | Avg sim place % | Avg market place % | P&L | ROI |
|---|---|---|---|---|---|---|
| Favourite | 129 | 85 (66%) | 65% | 63% | −$69 | −5% |
| 2nd choice | 71 | 40 (56%) | 61% | 50% | −$59 | −8% |
| 3rd–4th | 71 | 25 (35%) | 58% | 36% | −$143 | −20% |
| 5th–6th | 41 | 13 (32%) | 57% | 28% | −$26 | −6% |
| 7th or worse | 18 | 4 (22%) | 51% | 18% | +$24 | 13% |

### Simulation place %

| Group | Bets | Placed | Avg sim place % | Avg market place % | P&L | ROI |
|---|---|---|---|---|---|---|
| under 55% | 103 | 47 (46%) | 49% | 40% | −$44 | −4% |
| 55–65% | 110 | 43 (39%) | 60% | 48% | −$274 | −25% |
| 65–75% | 78 | 43 (55%) | 70% | 50% | −$33 | −4% |
| 75% or more | 39 | 34 (87%) | 79% | 63% | +$78 | 20% |

### Final odds of the pick

| Group | Bets | Placed | Avg sim place % | Avg market place % | P&L | ROI |
|---|---|---|---|---|---|---|
| under 3.5 | 103 | 68 (66%) | 66% | 68% | −$119 | −12% |
| 3.5–5 | 83 | 50 (60%) | 61% | 51% | −$3 | -0% |
| 5–8 | 76 | 29 (38%) | 59% | 38% | −$151 | −20% |
| 8–13 | 51 | 14 (27%) | 57% | 28% | −$115 | −23% |
| 13 or more | 17 | 6 (35%) | 52% | 17% | +$116 | 68% |

### Class

| Group | Bets | Placed | Avg sim place % | Avg market place % | P&L | ROI |
|---|---|---|---|---|---|---|
| Class 2 | 18 | 5 (28%) | 63% | 42% | −$79 | −44% |
| Class 3 | 89 | 45 (51%) | 62% | 49% | −$162 | −18% |
| Class 4 | 171 | 91 (53%) | 60% | 49% | −$18 | −1% |
| Class 5 | 51 | 25 (49%) | 61% | 44% | −$23 | −5% |
| Group 1 | 1 | 1 (100%) | 71% | 41% | +$10 | 100% |

### Distance

| Group | Bets | Placed | Avg sim place % | Avg market place % | P&L | ROI |
|---|---|---|---|---|---|---|
| 1000m | 39 | 21 (54%) | 61% | 46% | $0 | -0% |
| 1200m | 152 | 82 (54%) | 61% | 48% | −$22 | −1% |
| 1650m | 101 | 44 (44%) | 61% | 49% | −$270 | −27% |
| 1800m | 29 | 17 (59%) | 62% | 45% | +$66 | 23% |
| 2200m | 9 | 3 (33%) | 62% | 47% | −$46 | −51% |

### Going

| Group | Bets | Placed | Avg sim place % | Avg market place % | P&L | ROI |
|---|---|---|---|---|---|---|
| Good | 188 | 95 (51%) | 61% | 47% | −$119 | −6% |
| Good to Firm | 136 | 68 (50%) | 61% | 48% | −$170 | −13% |
| Good to Yielding | 6 | 4 (67%) | 63% | 47% | +$16 | 26% |

### Field size

| Group | Bets | Placed | Avg sim place % | Avg market place % | P&L | ROI |
|---|---|---|---|---|---|---|
| 10 or fewer | 20 | 9 (45%) | 69% | 55% | −$75 | −38% |
| 11 | 32 | 18 (56%) | 62% | 47% | +$7 | 2% |
| 12 | 278 | 140 (50%) | 60% | 47% | −$205 | −7% |

### Average rating gap to #1 (Avg differentiation)

| Group | Bets | Placed | Avg sim place % | Avg market place % | P&L | ROI |
|---|---|---|---|---|---|---|
| under 10 | 119 | 53 (45%) | 50% | 41% | −$92 | −8% |
| 10–13 | 100 | 40 (40%) | 61% | 48% | −$254 | −25% |
| 13–16 | 70 | 42 (60%) | 70% | 51% | +$38 | 5% |
| 16 or more | 41 | 32 (78%) | 78% | 61% | +$36 | 9% |

### Race number

| Group | Bets | Placed | Avg sim place % | Avg market place % | P&L | ROI |
|---|---|---|---|---|---|---|
| R1 | 37 | 19 (51%) | 60% | 42% | +$36 | 10% |
| R2 | 37 | 18 (49%) | 61% | 50% | −$63 | −17% |
| R3 | 37 | 19 (51%) | 57% | 42% | +$64 | 17% |
| R4 | 37 | 20 (54%) | 62% | 48% | −$1 | -0% |
| R5 | 37 | 20 (54%) | 62% | 55% | −$69 | −19% |
| R6 | 37 | 22 (59%) | 61% | 51% | −$3 | −1% |
| R7 | 37 | 15 (41%) | 62% | 47% | −$88 | −24% |
| R8 | 37 | 17 (46%) | 63% | 47% | −$108 | −29% |
| R9 | 33 | 17 (52%) | 61% | 48% | −$29 | −9% |
| R10 | 1 | 0 (0%) | 58% | 70% | −$10 | −100% |
