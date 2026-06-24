# Trio Strategy B (stratC) Review — Happy Valley | 2026-06-24

## Rules (Strategy B, MC-only)
- **Banker** = horse ranked #1 by raw **MC Win%** (no debutant rule).
- **Primary legs** = all horses with **MC Place% > 20%** (excl banker).
- **Win-odds step**: any horse with MC Place% ≤ 20% AND Win odds < 10 replaces the weakest primary leg in the 20–30% / odds>10 band (1-for-1), else added directly.
- Unit **$10/combo**, 膽拖 → C(N,2) combos.

## Summary

| Strategy | Races | Hits | Staked | Returned | P&L | ROI |
|----------|-------|------|--------|----------|-----|-----|
| A (pipeline) | 9 | 1/9 | $930 | $227 | -$703 | -75.6% |
| B (report, Place%>20 + odds-swap) | 9 | 1/9 | $1,180 | $227 | -$953 | -80.8% |
| B (MC top-6, §11) | 9 | 2/9 | $900 | $2,150 | +$1,250 | +138.9% |

Brutal meeting for both A and report-B (each 1 hit = R9 $227). **MC-top-6 B won** by catching R2 ($1,923) — its plain MC#1 banker (#11) + un-swapped pool kept #2, which placed 3rd. Both A (SCMP banker swap to #6) and report-B (odds-swap dropped #2 for #1) lost that hit. The win-odds replacement actively removed the eventual 3rd-placer in R2.

## Race-by-Race — Strategy B (report)

| R | Class | Dist | Surf | Banker (MC#1) | Final legs | Combos | Stake | Result | Bnkr top3? | Hit? | Trio $ | Return | P&L |
|---|-------|------|------|---------------|-----------|--------|-------|--------|-----------|------|--------|--------|-----|
| 1 | C5 | 2200 | Turf | #2 | 3,6,5,7,8 | 10 | $100 | 3-4-10 | ❌ | ❌ | 1410 | $0 | -$100 |
| 2 | C5 | 1650 | Turf | #11 | 6,9,8,7,10,1,12 | 21 | $210 | 9-11-2 | ✅ | ❌ | 1923 | $0 | -$210 |
| 3 | C4 | 1650 | Turf | #5 | 2,1,8,6,9,11 | 15 | $150 | 5-2-12 | ✅ | ❌ | 665 | $0 | -$150 |
| 4 | C4 | 1650 | Turf | #5 | 4,2,10,1 | 6 | $60 | 8-3-5 | ✅ | ❌ | 563 | $0 | -$60 |
| 5 | C4 | 1200 | Turf | #4 | 2,8,6,3,9,7 | 15 | $150 | 2-4-5 | ✅ | ❌ | 442 | $0 | -$150 |
| 6 | C4 | 1200 | Turf | #1 | 12,4,8,7,5,6,3 | 21 | $210 | 2-6-3 | ❌ | ❌ | 2461 | $0 | -$210 |
| 7 | C3 | 1000 | Turf | #4 | 1,9,5,12,7 | 10 | $100 | 9-7-5 | ❌ | ❌ | 693 | $0 | -$100 |
| 8 | C3 | 1200 | Turf | #7 | 4,11,2,9,6 | 10 | $100 | 3-11-2=7 | ✅(DH3) | ❌ | 318 | $0 | -$100 |
| 9 | C3 | 1650 | Turf | #5 | 2,1,8,10,3 | 10 | $100 | 3-5-1 | ✅ | ✅ | 227 | $227 | +$127 |

## Race-by-Race — Strategy A (pipeline)

| R | Class | Mode | Banker(s) | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|---|-------|------|-----------|------|--------|-------|--------|------|--------|--------|-----|-------------|
| 1 | C5 | B | #2 | 3,5,6,7,8 | 10 | $100 | 3-4-10 | ❌ | 1410 | $0 | -$100 | C: bk out + #4,#10 gap |
| 2 | C5 | C | #6 | 11,9,8,7,2,10 | 15 | $210 | 9-11-2 | ❌ | 1923 | $0 | -$210 | A: all 3 in legs, bk #6 5th |
| 3 | C4 | B | #5 | 1,2,6,8,9 | 10 | $100 | 5-2-12 | ❌ | 665 | $0 | -$100 | B: bk 1st, #12 gap |
| 4 | C4 | A | #5 | 4,2,10,8 | 6 | $60 | 8-3-5 | ❌ | 563 | $0 | -$60 | B: bk 3rd, #8/#3 gap |
| 5 | C4 | B | #4 | 2,8,6,3,9 | 10 | $100 | 2-4-5 | ❌ | 442 | $0 | -$100 | B: bk 2nd, #5 gap |
| 6 | C4 | B | #1 | 12,4,7,8,5 | 10 | $100 | 2-6-3 | ❌ | 2461 | $0 | -$100 | C: bk out + top-3 outside |
| 7 | C3 | B | #4 | 1,9,5,3,12 | 10 | $100 | 9-7-5 | ❌ | 693 | $0 | -$100 | C: bk out + #7 gap |
| 8 | C3 | A | #7 | 4,11,2,1 | 6 | $60 | 3-11-2=7 | ❌ | 318 | $0 | -$60 | B: bk DH3, #3 won (gap) |
| 9 | C3 | B | #5 | 2,1,8,10,3 | 10 | $100 | 3-5-1 | ✅ | 227 | $227 | +$127 | HIT |

## B Miss Pattern Summary (report-B)
- **Pattern A** (banker fail, all 3 in legs): **R7** (#9-#7-#5 all in pool, banker #4 6th). Missed: $693.
- **Pattern B** (banker hit, pool gap): **R2** (#2 3rd, swapped out for #1!), **R3** (#12 @13), **R4** (#8/#3 gap), **R5** (#5 @22), **R8** (#3 won, banker DH3). Missed: $1923+$665+$563+$442+$318 = $3,911.
- **Pattern C** (banker fail + pool gap): R1, R6. R6 (#2-#6-#3 vs banker #1 6th) genuine upset.

Key: report-B's **odds-swap cost R2** — it dropped #2 (Plc24.1/odds high) for market #1, and #2 finished 3rd. The plain MC-top-6 B (no swap) kept #2 and hit $1,923.

## Full MC Place% Table — Per Race
### R1 — Class 5 2200m Turf | Result 3→4→10 | banker #2
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 2 | HAILTOTHEVICTORS | 27.1 | 61.9 | 9.4 | ✅ | 膽 | 8 |
| L1 | 3 | ROSEWOOD FLEETFOOT | 24.7 | 58.1 | 3.2 | ✅ | 腳 | 1 |
| L2 | 6 | CARRYON SMILING | 13.7 | 41.6 | 6.6 | ✅ | 腳 | 7 |
| L3 | 5 | TELECOM POWER | 13.1 | 42.2 | 9.5 | ✅ | 腳 | 5 |
| L4 | 7 | SUPER HONG KONG | 8.8 | 32.4 | 16 | ✅ | 腳 | 11 |
| L5 | 8 | PERFECT PAIRING | 4.3 | 18.6 | 6.8 | ✅ | 腳 | 4 |
| — | 9 | SMART BEAUTY | 2.6 | 13.1 | 12 | ❌ | — | 9 |
| — | 10 | DRAGON SUNRISE | 2.1 | 11.2 | 10 | ❌ | — | 3 |
| — | 4 | GOLDEN FORTUNE | 2.1 | 10.7 | 22 | ❌ | — | 2 |
| — | 11 | CHATEAU LE PECHE | 0.8 | 5.1 | 18 | ❌ | — | 6 |
| — | 1 | FOREVER GLORIOUS | 0.4 | 2.5 | 27 | ❌ | — | 12 |
| — | 12 | MR ALADDIN | 0.3 | 2.6 | 44 | ❌ | — | 10 |

### R2 — Class 5 1650m Turf | Result 9→11→2 | banker #11
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 11 | ORIENTAL SURPRISE | 18.4 | 43.9 | 6.3 | ✅ | 膽 | 2 |
| L1 | 6 | ZETTA FORCE | 17.5 | 44 | 10 | ✅ | 腳 | 11 |
| L2 | 9 | ALL ARE MINE | 12 | 33.1 | 4.2 | ✅ | 腳 | 1 |
| L3 | 8 | WINDICATOR FAMILY | 11.2 | 32.8 | 7.1 | ✅ | 腳 | 5 |
| L4 | 7 | POWER SUMMIT | 9.7 | 30 | 21 | ✅ | 腳 | 6 |
| — | 2 | IRON LEGION | 7.1 | 24.1 | 50 | ❌ | — | 3 |
| L5 | 10 | SMILING EMPEROR | 6 | 21.3 | 8.5 | ✅ | 腳 | 4 |
| L6 | 1 | MATSU VICTOR | 4.5 | 16.6 | 9.3 | ✅ | 腳 | 8 |
| L7 | 12 | THE WAY WE WIN | 4.4 | 17.1 | 7.4 | ✅ | 腳 | 12 |
| — | 5 | MEGA FORCE | 4.1 | 16.1 | 42 | ❌ | — | 9 |
| — | 3 | SMART CITY | 3.1 | 12.4 | 14 | ❌ | — | 10 |
| — | 4 | SPANGLE FORTUNE | 2 | 8.6 | 17 | ❌ | — | 7 |

### R3 — Class 4 1650m Turf | Result 5→2→12 | banker #5
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 5 | FLYING FORTUNE | 18.5 | 45.6 | 4.6 | ✅ | 膽 | 1 |
| L1 | 2 | MIGHTY STEED | 15.5 | 41.9 | 6.3 | ✅ | 腳 | 2 |
| L2 | 1 | CASA ROCHESTER | 14 | 38 | 4.7 | ✅ | 腳 | 6 |
| L4 | 6 | TAKE ACTION | 11.9 | 34.9 | 19 | ✅ | 腳 | 4 |
| L3 | 8 | NOBLE PURSUIT | 11.6 | 35.4 | 7.9 | ✅ | 腳 | 7 |
| L5 | 9 | TURIN WARRIOR | 8 | 25.3 | 16 | ✅ | 腳 | 10 |
| L6 | 11 | NORTHERN BEAST | 5.8 | 20.5 | 7.5 | ✅ | 腳 | 5 |
| — | 4 | VICTOR THE RAPID | 4.2 | 15.7 | 58 | ❌ | — | 8 |
| — | 7 | LUCKY TOGETHER | 3.8 | 14.1 | 22 | ❌ | — | 12 |
| — | 3 | IVY LEAGUE | 3.4 | 14 | 8.7 | ❌ | — | 9 |
| — | 12 | STAR FIGURE | 2.6 | 10.5 | 15 | ❌ | — | 3 |
| — | 10 | HEALTHY PONY | 0.8 | 4 | 63 | ❌ | — | 11 |

### R4 — Class 4 1650m Turf | Result 8→3→5 | banker #5
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 5 | VIVACIOUS WIN | 49.5 | 80.4 | 1.5 | ✅ | 膽 | 3 |
| L1 | 4 | GLORIOUS JOURNEY | 14.7 | 47 | 12 | ✅ | 腳 | 6 |
| L2 | 2 | CALIFORNIA MOXIE | 5 | 23.9 | 14 | ✅ | 腳 | 7 |
| L3 | 10 | COLOURFUL GAN | 5 | 21.5 | 25 | ✅ | 腳 | 9 |
| — | 8 | BLOSSOMY | 4.8 | 21.2 | 15 | ❌ | — | 1 |
| — | 7 | SHOOTING TO TOP | 4.6 | 19.8 | 11 | ❌ | — | 4 |
| — | 6 | STAR MAC | 4.3 | 20.6 | 45 | ❌ | — | 12 |
| — | 9 | STORM RUNNER | 3.8 | 18.3 | 27 | ❌ | — | 8 |
| L4 | 1 | EXCEED THE LIMIT | 3.5 | 18.4 | 17 | ✅ | 腳 | 5 |
| — | 3 | CHARMING LEGEND | 2.5 | 14.6 | 17 | ❌ | — | 2 |
| — | 11 | GAZELEY | 1.5 | 8.8 | 62 | ❌ | — | 10 |
| — | 12 | WHOWROTETHATSONG | 0.8 | 5.4 | 84 | ❌ | — | 11 |

### R5 — Class 4 1200m Turf | Result 2→4→5 | banker #4
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 4 | GAMEPLAYER ELITE | 19.5 | 47.7 | 4.3 | ✅ | 膽 | 2 |
| L1 | 2 | MEOWTH | 17.2 | 44.3 | 2.7 | ✅ | 腳 | 1 |
| L2 | 8 | QUARTZ LEGEND | 15.6 | 41.2 | 13 | ✅ | 腳 | 7 |
| L3 | 6 | WORLD HERO | 14.2 | 40.3 | 23 | ✅ | 腳 | 12 |
| L4 | 3 | SMART FIGHTER | 7.5 | 24.8 | 54 | ✅ | 腳 | 11 |
| L5 | 9 | FORZA LEADER | 6.8 | 24.7 | 12 | ✅ | 腳 | 6 |
| L6 | 7 | WARRIORS DREAM | 6.7 | 23.5 | 8.8 | ✅ | 腳 | 4 |
| — | 11 | LEAN MASTER | 3.5 | 14.5 | 16 | ❌ | — | 8 |
| — | 12 | WINNING NOW | 3 | 13 | 8.3 | ❌ | — | 9 |
| — | 10 | KWAI CHUNG TALENTS | 3 | 12.8 | 16 | ❌ | — | 5 |
| — | 1 | TACTICAL HORIZONS | 2.5 | 10 | 87 | ❌ | — | 10 |
| — | 5 | GRATIFIDE | 0.5 | 3.1 | 28 | ❌ | — | 3 |

### R6 — Class 4 1200m Turf | Result 2→6→3 | banker #1
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 1 | SPIRIT OF PEACE | 24.6 | 55.5 | 3.4 | ✅ | 膽 | 6 |
| L1 | 12 | KING ALLOY | 19.5 | 47.7 | 11 | ✅ | 腳 | 9 |
| L2 | 4 | GEORGIAN SIGMA | 11.4 | 34.5 | 4.4 | ✅ | 腳 | 7 |
| L3 | 8 | GRACEFUL HEART | 8.6 | 27.5 | 8.5 | ✅ | 腳 | 4 |
| L4 | 7 | BITS SUPERSTAR | 7.1 | 24.9 | 29 | ✅ | 腳 | 5 |
| — | 2 | DANICA'S CHOICE | 6.4 | 21.8 | 6.2 | ❌ | — | 1 |
| L5 | 5 | RYUI KOKOROE | 6.2 | 22.1 | 26 | ✅ | 腳 | 10 |
| L6 | 6 | CLOUD NINE | 5.9 | 21.9 | 12 | ✅ | 腳 | 2 |
| — | 9 | FREE PONY | 4.6 | 17.1 | 57 | ❌ | — | 8 |
| L7 | 3 | GOOD LUCK HAPPY | 2.6 | 12.8 | 11 | ✅ | 腳 | 3 |
| — | 11 | JOY STAR | 1.8 | 7.9 | 16 | ❌ | — | 11 |
| — | 10 | FUN ELITE | 1.2 | 6.3 | 74 | ❌ | — | 12 |

### R7 — Class 3 1000m Turf | Result 9→7→5 | banker #4
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 4 | TOGETHER WE VALUE | 23.6 | 54.9 | 3.4 | ✅ | 膽 | 6 |
| L1 | 1 | HORSEPOWER | 21.4 | 51.1 | 21 | ✅ | 腳 | 8 |
| L2 | 9 | SKY CAP | 15.9 | 43.6 | 7.1 | ✅ | 腳 | 1 |
| — | 3 | METRO POWER | 8.8 | 29.7 | 6 | ❌ | — | 4 |
| L3 | 5 | BUNTA BABY | 8.5 | 29.8 | 9.6 | ✅ | 腳 | 3 |
| L4 | 12 | ROBOT LUCKY STAR | 7.9 | 26.7 | 5.4 | ✅ | 腳 | 5 |
| — | 6 | RED ELEGANCE | 3.9 | 15.3 | 62 | ❌ | — | 11 |
| L5 | 7 | PEGAS | 3.8 | 16.1 | 6.7 | ✅ | 腳 | 2 |
| — | 2 | LA FORZA | 2.8 | 13 | 92 | ❌ | — | 12 |
| — | 11 | BLUE ILLUSION | 1.5 | 8.3 | 50 | ❌ | — | 9 |
| — | 8 | CENTRAL BANK | 1.5 | 8.1 | 13 | ❌ | — | 7 |
| — | 10 | COPPER CORE | 0.5 | 3.4 | 119 | ❌ | — | 10 |

### R8 — Class 3 1200m Turf | Result 3→11→2→7 | banker #7
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 7 | THE HEIR | 42 | 73.5 | 8.4 | ✅ | 膽 | 3 |
| L1 | 4 | AMAZING KID | 12.1 | 38.1 | 9.6 | ✅ | 腳 | 10 |
| L2 | 11 | HONEST WITNESS | 10.2 | 35.6 | 9.5 | ✅ | 腳 | 2 |
| L3 | 2 | YOUNG EMPEROR | 7.2 | 27.7 | 5.5 | ✅ | 腳 | 3 |
| — | 1 | SYMBOL OF STRENGTH | 7.1 | 27.6 | 29 | ❌ | — | 5 |
| L4 | 9 | ACE CHAMPION | 6.6 | 25.1 | 4.8 | ✅ | 腳 | 11 |
| — | 12 | DO YOU JUST | 3.6 | 16.6 | 28 | ❌ | — | 9 |
| L5 | 6 | KING LOTUS | 3.5 | 16 | 18 | ✅ | 腳 | 7 |
| — | 3 | JUMBO TREASURE | 2.5 | 11.5 | 7.2 | ❌ | — | 1 |
| — | 5 | DARYL FLASH | 2.5 | 12.2 | 21 | ❌ | — | 6 |
| — | 8 | ENDURANCE EXPRESS | 1.4 | 8.3 | 5.9 | ❌ | — | 8 |
| — | 10 | TRIPLE FORTUNE | 1.3 | 7.8 | 48 | ❌ | — | 12 |

### R9 — Class 3 1650m Turf | Result 3→5→1 | banker #5
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 5 | ROMANTIC GLADIATOR | 32.9 | 68.9 | 2.5 | ✅ | 膽 | 2 |
| L1 | 2 | MIGHTY COMMANDER | 21 | 54.8 | 6 | ✅ | 腳 | 7 |
| L2 | 1 | FIVEFORTWO | 19.6 | 54.6 | 10 | ✅ | 腳 | 3 |
| L3 | 8 | LEGEND WINNER | 7.2 | 29.5 | 5.5 | ✅ | 腳 | 11 |
| L4 | 10 | STORMI | 5.3 | 22.5 | 11 | ✅ | 腳 | 6 |
| L5 | 3 | DEFINITIVE | 4.4 | 20.4 | 13 | ✅ | 腳 | 1 |
| — | 4 | KEEFY | 4.2 | 18.3 | 28 | ❌ | — | 8 |
| — | 6 | VIOLET STAR | 3.4 | 17.7 | 8 | ❌ | — | 5 |
| — | 7 | SAMARKAND | 1 | 6 | 51 | ❌ | — | 4 |
| — | 12 | CLASS | 0.5 | 3.6 | 27 | ❌ | — | - |
| — | 9 | ANOTHER WORLD | 0.4 | 2.7 | 99 | ❌ | — | 9 |
| — | 11 | VECU | 0.1 | 1 | 62 | ❌ | — | 10 |

## B Banker Performance (= MC #1)

| R | B Banker | MC Win% | SP | Placed? | Position |
|---|----------|---------|----|---------|----------|
| 1 | #2 HAILTOTHEVICTORS | 27.1 | 9.4 | ❌ | 8th |
| 2 | #11 ORIENTAL | 18.4 | 6.3 | ✅ | 2nd |
| 3 | #5 FLYING FORTUNE | 18.5 | 4.6 | ✅ | 1st |
| 4 | #5 VIVACIOUS WIN | 49.5 | 1.5 | ✅ | 3rd |
| 5 | #4 GAMEPLAYER ELITE | 19.5 | 4.3 | ✅ | 2nd |
| 6 | #1 SPIRIT OF PEACE | 24.6 | 3.4 | ❌ | 6th |
| 7 | #4 TOGETHER WE VALUE | 23.6 | 3.4 | ❌ | 6th |
| 8 | #7 THE HEIR | 42.0 | 8.4 | ✅ | 3rd (dead-heat) |
| 9 | #5 ROMANTIC GLADIATOR | 32.9 | 2.5 | ✅ | 2nd |

**B banker top-3: 6/9 = 66.7%** | **B banker win: 1/9 = 11.1%** (R3).

Pattern analysis: MC#1 banker placed 6/9 — strong — yet report-B hit only once because the **leg construction** (odds-swap + Place%>20 cut-offs) repeatedly excluded the eventual placer (R2 #2, R3 #12, R5 #5, R8 #3). The banker is not the problem; the pool is too tight/market-biased. MC-top-6 (keep raw top 6, no swap) converts the same bankers into 2 hits. THE HEIR (R8, MC 42% vs market 8.4) dead-heated 3rd — MC's high rating was vindicated on placing, though #3 still beat the pool.
