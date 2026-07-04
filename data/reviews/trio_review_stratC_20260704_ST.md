# Trio Strategy B (stratC) Review — Sha Tin | 2026-07-04

## Rules (Strategy B, MC-only)
- **Banker** = horse ranked #1 by raw **MC Win%** (no debutant rule).
- **Primary legs** = all horses with **MC Place% > 20%** (excl banker).
- **Win-odds step**: any horse with MC Place% ≤ 20% AND Win odds < 10 replaces the weakest primary leg in the 20–30% / odds>10 band (1-for-1), else added directly.
- Unit **$10/combo**, 膽拖 → C(N,2) combos.

## Summary

| Strategy | Races | Hits | Staked | Returned | P&L | ROI |
|----------|-------|------|--------|----------|-----|-----|
| A (pipeline) | 11 | 2/11 | $710 | $380 | -$330 | -46.5% |
| B (report, Place%>20 + odds-swap) | 11 | 4/11 | $1,120 | $875 | -$245 | -21.9% |
| B (MC top-6, §11) | 11 | 3/11 | $1,100 | $808 | -$292 | -26.5% |

**Strategy B won** (4 hits vs 2). B hit R3 (single-banker #12, where A's 雙膽 needed #8 too and failed) and R10 (B added #7, which won). Both A-only tightening rules (雙膽拖, tight Mode-A pools) misfired.

## Race-by-Race — Strategy B (report)

| R | Class | Dist | Banker (MC#1) | Final legs | Combos | Stake | Result | Bnkr top3? | Hit? | Trio $ | P&L |
|---|-------|------|---------------|-----------|--------|-------|--------|-----------|------|--------|-----|
| 1 | Griffin | 1200 | #1 | 2,3,5,9,8 | 10 | $100 | 2-1-9 | ✅(2nd) | ✅ | 36 | -$64 |
| 2 | C5 | 1200 | #5 | 10,9,7,2 | 6 | $60 | 9-11-5 | ✅(3rd) | ❌ | 1581 | -$60 |
| 3 | C5 | 1200 | #12 | 8,11,3,4,1 | 10 | $100 | 3-11-12 | ✅(3rd) | ✅ | 428 | +$328 |
| 4 | C2 | 1200 | #4 | 3,1,5,6,2 | 10 | $100 | 4-6-3 | ✅(1st) | ✅ | 344 | +$244 |
| 5 | C4 | 1400 | #4 | 1,8,9,13,5,12 | 15 | $150 | 11-4-13 | ✅(2nd) | ❌ | 980 | -$150 |
| 6 | C4 | 1200 | #1 | 2,4,7,5 | 6 | $60 | 7-6-11 | ❌(11th) | ❌ | 3515 | -$60 |
| 7 | C4 | 1200 | #4 | 5,6,1,8,2 | 10 | $100 | 5-12-6 | ❌ | ❌ | 131 | -$100 |
| 8 | C4 | 1800 | #2 | 9,6,10,12,3,14 | 15 | $150 | 6-9-3 | ❌(8th) | ❌ | 1942 | -$150 |
| 9 | C4 | 1200 | #3 | 2,4,1,5,8 | 10 | $100 | 3-6-1 | ✅(1st) | ❌ | 1872 | -$100 |
| 10 | C3 | 1200 | #6 | 1,2,12,4,7 | 10 | $100 | 7-6-12 | ✅(2nd) | ✅ | 67 | -$33 |
| 11 | C3 | 1400 | #3 | 1,4,2,11,8 | 10 | $100 | 1-5-11 | ❌(5th) | ❌ | 206 | -$100 |

## B Miss Pattern Summary (report-B)
- **Pattern A** (banker fail, all 3 in legs): **R11** (1-5-11 all in legs, bk #3 5th).
- **Pattern B** (banker hit, pool gap): R2 (#11 gap, $1,581), R5 (#11/#13 gap), R9 (#6 gap, $1,872).
- **Pattern C** (banker fail): R6, R7, R8.

Key: B's single-banker structure beat A's 雙膽拖 on R3, and B's extra odds-swap leg (#7) caught R10. But B still lost overall (-21.9%) — the fat frames (R2 $1,581, R9 $1,872, R6 $3,515) all had a placer outside even B's 5-6 leg pools.

## Full MC Place% Table — Per Race
### R1 — Griffin 1200m | Result 2→1→9 | banker #1
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 1 | JEDI SPURS | 38.1 | 74.1 | 1.1 | ✅ | 膽 | 2 |
| L1 | 2 | ALMIGHTY WARRIOR | 19.0 | 54.6 | 7.8 | ✅ | 腳 | 1 |
| L2 | 3 | CHANCHENG SPARKLE | 15.5 | 49.1 | 25 | ✅ | 腳 | 4 |
| L3 | 5 | DRAGON GENERATION | 9.3 | 35.1 | 62 | ✅ | 腳 | 5 |
| L4 | 9 | QUANTUM WUKONG | 7.5 | 30.3 | 15 | ✅ | 腳 | 3 |
| — | 6 | GOLDEN GUNNERS | 4.0 | 17.7 | 52 | ❌ | — | 7 |
| — | 4 | COOGEE BAY | 2.6 | 14.3 | 131 | ❌ | — | 8 |
| L5 | 8 | EVER WEALTH | 1.8 | 12.4 | 19 | ✅ | 腳 | 6 |
| — | 7 | KYOTO SPRING | 1.4 | 7.5 | 104 | ❌ | — | 9 |
| — | 10 | ULTRA BOLT | 0.7 | 4.9 | 56 | ❌ | — | 10 |

### R2 — Class 5 1200m | Result 9→11→5 | banker #5
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 5 | VERBIER | 50.9 | 84.0 | 1.8 | ✅ | 膽 | 3 |
| L1 | 10 | SUPREME WINNER | 14.5 | 50.0 | 8.9 | ✅ | 腳 | 7 |
| L2 | 9 | NOBLE FANS | 10.9 | 40.5 | 21 | ✅ | 腳 | 1 |
| L3 | 7 | BLUE BARON | 10.1 | 40.0 | 5.1 | ✅ | 腳 | 8 |
| L4 | 2 | PERIDOT | 4.2 | 22.1 | 10 | ✅ | 腳 | 6 |
| — | 8 | SPARKLE AND GOLD | 2.6 | 16.4 | 68 | ❌ | — | 11 |
| — | 4 | VIGOR ELLEEGANT | 1.7 | 11.1 | 20 | ❌ | — | 5 |
| — | 6 | MONEY TYCOON | 1.6 | 9.7 | 108 | ❌ | — | 9 |

### R3 — Class 5 1200m | Result 3→11→12 | banker #12
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 12 | VIVA CHALEUR | 32.8 | 72.2 | 3.5 | ✅ | 膽 | 3 |
| L1 | 8 | HAPPY ACTION | 29.6 | 66.7 | 7.7 | ✅ | 腳 | 9 |
| L2 | 11 | MACANESE MASTER | 13.6 | 46.6 | 8.6 | ✅ | 腳 | 2 |
| L3 | 3 | NOBLE DELUXE | 12.0 | 42.2 | 16 | ✅ | 腳 | 1 |
| L4 | 4 | ROBOT KNIGHT | 4.4 | 23.9 | 11 | ✅ | 腳 | 10 |
| L5 | 1 | DAILY TROPHY | 3.3 | 17.7 | 4.1 | ✅ | 腳 | 4 |
| — | 5 | BULLISH PRIDE | 1.2 | 8.2 | 12 | ❌ | — | 5 |

### R4 — Class 2 1200m | Result 4→6→3 | banker #4
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 4 | RISING FORCE | 41.2 | 80.3 | 2.3 | ✅ | 膽 | 1 |
| L1 | 3 | YOUNG CHAMPION | 18.2 | 57.9 | 5.4 | ✅ | 腳 | 3 |
| L2 | 1 | SKY TRUST | 17.2 | 56.5 | 8.3 | ✅ | 腳 | 5 |
| L3 | 5 | TURQUOISE VELOCITY | 14.1 | 51.6 | 2.8 | ✅ | 腳 | 6 |
| L4 | 6 | PAKISTAN LEGACY | 4.9 | 24.3 | 19 | ✅ | 腳 | 2 |
| L5 | 2 | MUGEN | 3.7 | 20.8 | 51 | ✅ | 腳 | 4 |
| — | 7 | SO NAIVE | 0.8 | 8.5 | 24 | ❌ | — | 7 |

### R5 — Class 4 1400m | Result 11→4→13 | banker #4
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 4 | SUNDAY'S SERENADE | 31.6 | 65.3 | 15 | ✅ | 膽 | 2 |
| L1 | 1 | ROBOT STAR | 19.5 | 51.2 | 16 | ✅ | 腳 | 4 |
| L2 | 8 | DECISION LINK | 15.0 | 45.6 | 7.8 | ✅ | 腳 | 12 |
| L3 | 9 | GOLDEN EMPIRE | 13.7 | 41.1 | 35 | ✅ | 腳 | 5 |
| L6 | 12 | LET'S HAVE FUN | 4.0 | 16.3 | 18 | ✅ | 腳 | 9 |
| L5 | 5 | SUNNY DA BEST | 3.9 | 17.0 | 12 | ✅ | 腳 | 11 |
| L4 | 13 | QUICK CONTRIBUTION | low | low | 2.5 | ✅ | 腳 | 3 |

### R6 — Class 4 1200m | Result 7→6→11 | banker #1
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 1 | PEJIBAYE | 37.4 | 77.1 | 3.1 | ✅ | 膽 | 11 |
| L1 | 2 | SPEEDY SMARTIE | 32.3 | 72.3 | 8.2 | ✅ | 腳 | 4 |
| L2 | 4 | GOOD CHAP | 13.7 | 48.6 | 16 | ✅ | 腳 | 7 |
| — | 3 | NATURAL HIGH | 4.4 | 21.5 | 38 | ❌ | — | 9 |
| L3 | 7 | BUSTLING CITY | 3.8 | 19.9 | 4 | ✅ | 腳 | 1 |
| L4 | 5 | TIN FOOK | 2.2 | 14.6 | 6.5 | ✅ | 腳 | 12 |
| — | 8 | DAILY FUN | 2.5 | 15.2 | 18 | ❌ | — | 10 |

### R7 — Class 4 1200m | Result 5→12→6 | banker #4
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 4 | A TIME FOR US | 20.8 | 52.2 | 6.9 | ✅ | 膽 | 10 |
| L1 | 5 | HEALTHY HEALTHY | 20.7 | 51.1 | 7.7 | ✅ | 腳 | 1 |
| L2 | 6 | GROUPER | 16.8 | 46.1 | 3 | ✅ | 腳 | 3 |
| L3 | 1 | RUN RUN SUNRISE | 14.0 | 41.7 | 18 | ✅ | 腳 | 11 |
| L4 | 8 | PRIVATE WEALTH | 10.4 | 33.0 | 21 | ✅ | 腳 | 5 |
| L5 | 2 | ONESHOT | 7.6 | 28.6 | 9.5 | ✅ | 腳 | 8 |
| — | 3 | ONE MORE | 4.3 | 17.5 | — | ❌ | — | - |

### R8 — Class 4 1800m | Result 6→9→3 | banker #2
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 2 | MR COOL | 29.4 | 62.3 | 5 | ✅ | 膽 | 8 |
| L1 | 9 | FIREFOOT | 27.9 | 61.5 | 11 | ✅ | 腳 | 2 |
| L2 | 6 | VICTOR SUPREME | 10.6 | 36.2 | 3.7 | ✅ | 腳 | 1 |
| L3 | 10 | SMART FAT CAT | 5.8 | 23.2 | 3.4 | ✅ | 腳 | 4 |
| L4 | 12 | GRAND TURBO | 5.3 | 20.6 | 17 | ✅ | 腳 | 7 |
| — | 7 | BRIGHT INHERITANCE | 5.3 | 20.0 | 82 | ❌ | — | 10 |
| L5 | 3 | INNO SUPER | 4.5 | 20.1 | 50 | ✅ | 腳 | 3 |
| L6 | 14 | KINGLY DEMEANOR | ~5 | ~19 | 10 | ✅ | 腳 | 9 |

### R9 — Class 4 1200m | Result 3→6→1 | banker #3
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 3 | LUCRATIVE EIGHT | 51.9 | 84.7 | 1.6 | ✅ | 膽 | 1 |
| L1 | 2 | SIGHT DREAMER | 14.1 | 50.0 | 11 | ✅ | 腳 | 12 |
| L2 | 4 | MABUBU | 11.5 | 43.8 | 8.1 | ✅ | 腳 | 10 |
| L3 | 1 | ISLAND BUDDY | 10.8 | 44.0 | 15 | ✅ | 腳 | 3 |
| L4 | 5 | LEADING DRAGON | 4.8 | 26.0 | 8.2 | ✅ | 腳 | 4 |
| L5 | 8 | NEXT FORTUNE | 3.3 | 19.1 | 8.9 | ✅ | 腳 | 5 |

### R10 — Class 3 1200m | Result 7→6→12 | banker #6
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 6 | SUPERB SPIRIT | 48.7 | 83.6 | 1.9 | ✅ | 膽 | 2 |
| L1 | 1 | PERFECT GENERAL | 15.7 | 54.3 | 9.5 | ✅ | 腳 | 4 |
| L2 | 2 | ALL OUT FOR SIX | 15.8 | 53.3 | 17 | ✅ | 腳 | 5 |
| L3 | 12 | SPICY STANDARD | 10.6 | 43.7 | 4 | ✅ | 腳 | 3 |
| L4 | 4 | HARMONY N BLESSED | 3.4 | 20.8 | 24 | ✅ | 腳 | 8 |
| — | 5 | RED SEA | 2.9 | 18.4 | 21 | ❌ | — | 10 |
| L5 | 7 | SOLID STATE | 0.6 | 6.3 | 7.5 | ✅ | 腳 | 1 |

### R11 — Class 3 1400m | Result 1→5→11 | banker #3
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 3 | GREATER BAE | 34.5 | 66.9 | 7.8 | ✅ | 膽 | 5 |
| L1 | 1 | CHILL EASY | 13.9 | 41.7 | 2.7 | ✅ | 腳 | 1 |
| L2 | 4 | SAVVY BRILLIANT | 12.6 | 37.0 | 16 | ✅ | 腳 | 6 |
| L3 | 2 | STAY COSMIC | 9.6 | 32.6 | 38 | ✅ | 腳 | 12 |
| L4 | 11 | TANG HEART | 9.2 | 32.1 | 5.2 | ✅ | 腳 | 3 |
| — | 5 | ENDEARED | 6.2 | 24.7 | 11 | ❌ | — | 2 |
| L5 | 8 | ALL'S WELL | 3.9 | 16.5 | 4.6 | ✅ | 腳 | 7 |
## B Banker Performance (= MC #1)

| R | B Banker | MC Win% | Placed? | Position | Place $ |
|---|----------|---------|---------|----------|---------|
| 1 | #1 JEDI SPURS | 38.1 | ✅ | 2nd | 10.1 |
| 2 | #5 VERBIER | 50.9 | ✅ | 3rd | 11 |
| 3 | #12 VIVA CHALEUR | 32.8 | ✅ | 3rd | 14 |
| 4 | #4 RISING FORCE | 41.2 | ✅ | 1st | 10.1 |
| 5 | #4 SUNDAY'S SERENADE | 31.6 | ✅ | 2nd | 34 |
| 6 | #1 PEJIBAYE | 37.4 | ❌ | 11th | — |
| 7 | #4 A TIME FOR US | 20.8 | ❌ | 10th | — |
| 8 | #2 MR COOL | 29.4 | ❌ | 8th | — |
| 9 | #3 LUCRATIVE EIGHT | 51.9 | ✅ | 1st | 10.5 |
| 10 | #6 SUPERB SPIRIT | 48.7 | ✅ | 2nd | 11.5 |
| 11 | #3 GREATER BAE | 34.5 | ❌ | 5th | — |

**B banker top-3: 7/11 = 63.6%** | **B banker win: 3/11 = 27.3%** (R4, R9, ... R1 #1 2nd).

Pattern analysis: MC#1 banker placed 7/11 (a strong 5-in-a-row R1–R5) — the model's top pick is reliable at PLACING. The failure was coverage: the fat-dividend frames (R2 #11, R5 #11, R9 #6, R6 #7/#11) had a placer outside even a 5-6 horse pool in these deep C4/C5 fields. Single-banker B converted 4 vs A's 2 because it avoided the 雙膽拖 second-banker trap (R3, R6, R8) and kept an extra odds-swap leg that caught R10's #7.
