# Trio Strategy B (stratC) Review — Sha Tin | 2026-07-01

## Rules (Strategy B, MC-only)
- **Banker** = horse ranked #1 by raw **MC Win%** (no debutant rule).
- **Primary legs** = all horses with **MC Place% > 20%** (excl banker).
- **Win-odds step**: any horse with MC Place% ≤ 20% AND Win odds < 10 replaces the weakest primary leg in the 20–30% / odds>10 band (1-for-1), else added directly.
- Unit **$10/combo**, 膽拖 → C(N,2) combos.

## Summary

| Strategy | Races | Hits | Staked | Returned | P&L | ROI |
|----------|-------|------|--------|----------|-----|-----|
| A (pipeline) | 11 | 2/11 | $920 | $1,057 | +$137 | +14.9% |
| B (report, Place%>20 + odds-swap) | 11 | 2/11 | $1,160 | $1,057 | -$103 | -8.9% |
| B (MC top-6, §11) | 11 | 2/11 | $1,100 | $1,057 | -$43 | -3.9% |

**Strategy A won** — all three caught the same 2 races (R2, R8); A staked least. R11 the killer: unbeaten fav #2 (banker) ran 12th while legs held 7-4-3.

## Race-by-Race — Strategy B (report)

| R | Class | Dist | Banker (MC#1) | Final legs | Combos | Stake | Result | Bnkr top3? | Hit? | Trio $ | P&L |
|---|-------|------|---------------|-----------|--------|-------|--------|-----------|------|--------|-----|
| 1 | C5 | 1600 | #7 | 4,6,9,11,10 | 10 | $100 | 3-10-7 | ✅(3rd) | ❌ | 1523 | -$100 |
| 2 | C5 | 1400 | #4 | 12,2,13,9,5 | 10 | $100 | 2-13-4 | ✅(3rd) | ✅ | 271 | +$171 |
| 3 | C4 | 1400 | #14 | 1,13,7,2 | 6 | $60 | 2-11-14 | ✅(3rd) | ❌ | 4352 | -$60 |
| 4 | C4 | 1000 | #3 | 4,1,2,13,9 | 10 | $100 | 2-3-7 | ✅(2nd) | ❌ | 2801 | -$100 |
| 5 | C2 | 1400 | #3 | 9,2,6,10,7 | 10 | $100 | 9-7-8 | ❌(6th) | ❌ | 863 | -$100 |
| 6 | C4 | 1200 | #6 | 2,4,3,7,1 | 10 | $100 | 10-6-7 | ✅(2nd) | ❌ | 367 | -$100 |
| 7 | C3 | 1000 | #3 | 2,5,6,10,12,7 | 15 | $150 | 6-12-2 | ❌ | ❌ | 413 | -$150 |
| 8 | C4 | 1400 | #3 | 8,2,4,7,10 | 10 | $100 | 3-4-7 | ✅(1st) | ✅ | 786 | +$686 |
| 9 | C4 | 1600 | #13 | 7,5,6,8,12 | 10 | $100 | 8-11-12 | ❌ | ❌ | 175 | -$100 |
| 10 | C3 | 1600 | #4 | 2,3,6,5,7,1 | 15 | $150 | 3-2-13 | ❌ | ❌ | 765 | -$150 |
| 11 | C3 | 1200 | #2 | 4,8,3,7,1 | 10 | $100 | 7-4-3 | ❌(12th) | ❌ | 754 | -$100 |

## B Miss Pattern Summary (report-B)
- **Pattern A** (banker fail, all 3 in legs): **R7** (6-12-2 all in legs, bk #3 out), **R11** (7-4-3 all in legs, bk #2 12th). Missed $413 + $754.
- **Pattern B** (banker hit, pool gap): R1 (#10 gap), R3 (#11 gap, $4,352), R4 (#7 gap), R6 (#10 gap).
- **Pattern C** (banker fail + pool gap): R5 (#3 6th), R9, R10.

## Full MC Place% Table — Per Race
### R1 — Class 5 1600m | Result 3→10→7 | banker #7
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 7 | GENERAL SMART | 26.5 | 58.7 | 17 | ✅ | 膽 | 3 |
| L1 | 4 | GALE SAGA | 22.3 | 53.1 | 10 | ✅ | 腳 | 14 |
| L2 | 6 | SUPERB GUY | 17.9 | 48.0 | 13 | ✅ | 腳 | 11 |
| — | 5 | LUCKY BLESSING | 8.9 | 29.9 | 13 | ❌ | — | 8 |
| L3 | 9 | HAPPYDEARHAPPYDEER | 5.3 | 21.3 | 14 | ✅ | 腳 | 5 |
| — | 1 | RED BRICK WARRIOR | 5.5 | 21.0 | 12 | ❌ | — | 9 |
| — | 8 | ZETTA FORCE | 3.8 | 15.6 | 30 | ❌ | — | 7 |
| L4 | 11 | PERFECTO MOMENTS | 3.1 | 14.7 | 3.3 | ✅ | 腳 | 4 |
| — | 12 | HARRY'S HERO | 1.9 | 9.7 | 11 | ❌ | — | 10 |
| — | 3 | FRANTANCK | 1.5 | 8.3 | 8.2 | ❌ | — | 1 |
| L5 | 10 | ORIENTAL SURPRISE | 1.4 | 7.8 | 6.9 | ✅ | 腳 | 2 |
| — | 2 | PING HAI COMET | 1.1 | 6.0 | 32 | ❌ | — | 12 |
| — | 14 | CASA LEGEND | 0.6 | 3.8 | 47 | ❌ | — | 13 |
| — | 13 | GOLD TACK | 0.3 | 2.2 | 46 | ❌ | — | 6 |

### R2 — Class 5 1400m | Result 2→13→4 | banker #4
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 4 | HE WAS ME | 21.6 | 49.6 | 6.8 | ✅ | 膽 | 3 |
| L1 | 12 | MANYTHANKS FOREVER | 18.2 | 46.0 | 10 | ✅ | 腳 | 9 |
| L2 | 2 | TOP TO SKY | 15.2 | 40.1 | 7.2 | ✅ | 腳 | 1 |
| L3 | 13 | SPEEDY TRIDENT | 7.0 | 23.1 | 4.5 | ✅ | 腳 | 2 |
| L4 | 9 | MAZING GRACE | 6.9 | 23.0 | 10 | ✅ | 腳 | 5 |
| — | 1 | BRAVE WIN | 6.0 | 19.6 | 37 | ❌ | — | 12 |
| — | 7 | JOLLY JUMPER | 5.0 | 18.3 | 4.5 | ❌ | — | 11 |
| — | 8 | PRINCE ALEX | 4.8 | 16.8 | 80 | ❌ | — | 4 |
| — | 10 | DOUBLE SHOW | 4.0 | 15.9 | 16 | ❌ | — | 8 |
| — | 6 | FIGHT TIME | 3.8 | 14.2 | 14 | ❌ | — | 10 |
| — | 14 | MEGA FORCE | 3.4 | 14.4 | 22 | ❌ | — | 7 |
| — | 11 | TAI VICTORY | 1.8 | 8.5 | 89 | ❌ | — | 13 |
| L5 | 5 | WAVE GARDEN | 1.6 | 6.6 | 20 | ✅ | 腳 | 14 |
| — | 3 | FORTUNE KINGO | 0.8 | 4.0 | 55 | ❌ | — | 6 |

### R3 — Class 4 1400m | Result 2→11→14 | banker #14
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 14 | WINNING MACHINE | 61.1 | 89.0 | 4 | ✅ | 膽 | 3 |
| L1 | 1 | GALLANT EPOCH | 14.3 | 54.2 | 7.6 | ✅ | 腳 | 6 |
| L2 | 13 | FLYING SNIPER | 5.6 | 30.3 | 3.6 | ✅ | 腳 | 5 |
| — | 9 | CALL ME SUCCESS | 4.5 | 25.1 | 17 | ❌ | — | 13 |
| L3 | 7 | GOOD LUCK BABE | 3.7 | 22.4 | 6.7 | ✅ | 腳 | 4 |
| L4 | 2 | KING OF FIGHTERS | 2.9 | 18.4 | 8.8 | ✅ | 腳 | 1 |
| — | 10 | ARIEL | 2.5 | 16.0 | 11 | ❌ | — | 8 |
| — | 3 | JOY TOGETHER | 2.1 | 15.5 | 17 | ❌ | — | 9 |
| — | 11 | TRENDY RUSH | 1.5 | 11.3 | 89 | ❌ | — | 2 |
| — | 8 | LUCK IS BACK | 1.2 | 9.8 | 88 | ❌ | — | 7 |

### R4 — Class 4 1000m | Result 2→3→7 | banker #3
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 3 | BEAUTY THUNDER | 27.1 | 62.8 | 22 | ✅ | 膽 | 2 |
| L1 | 4 | DOUBLE ALPHA | 23.2 | 58.0 | 3.5 | ✅ | 腳 | 8 |
| L2 | 1 | JUICY DRAGON | 16.8 | 47.7 | 17 | ✅ | 腳 | 6 |
| L3 | 2 | LAHORE | 16.0 | 46.9 | 4.3 | ✅ | 腳 | 1 |
| L4 | 13 | BETTER AND BETTER | 7.1 | 27.6 | 3.7 | ✅ | 腳 | 10 |
| — | 6 | FLOWING RICHES | 2.4 | 12.1 | 6.5 | ❌ | — | 11 |
| — | 14 | SUPREME VOYAGER | 1.6 | 8.4 | 33 | ❌ | — | 5 |
| L5 | 9 | HANDSOME HERO | 1.2 | 6.8 | — | ✅ | 腳 | - |
| — | 10 | KING ZOOM | 1.3 | 7.9 | 62 | ❌ | — | 13 |

### R5 — Class 2 1400m | Result 9→7→8 | banker #3
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 3 | STORM RIDER | 29.1 | 65.7 | 17 | ✅ | 膽 | 6 |
| L1 | 9 | KA YING ATTACK | 28.8 | 66.7 | 3.1 | ✅ | 腳 | 1 |
| L2 | 2 | INVINCIBLE SHIELD | 19.4 | 56.1 | 10 | ✅ | 腳 | 5 |
| L3 | 6 | TOP DRAGON | 7.4 | 32.0 | 4.1 | ✅ | 腳 | 9 |
| L4 | 10 | PUBLIC ATTENTION | 3.9 | 19.6 | 4 | ✅ | 腳 | 4 |
| — | 1 | PACKING HERMOD | 4.0 | 18.1 | 22 | ❌ | — | 10 |
| L5 | 7 | BEAUTY BOLT | 2.7 | 14.3 | 12 | ✅ | 腳 | 2 |
| — | 8 | REGAL GEM | 2.6 | 14.3 | 18 | ❌ | — | 3 |
| — | 4 | GORGEOUS WIN | 1.7 | 10.6 | 54 | ❌ | — | 8 |
| — | 5 | EMBLAZON | 0.3 | 2.5 | 21 | ❌ | — | 7 |

### R6 — Class 4 1200m | Result 10→6→7 | banker #6
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 6 | STORM MIRROR | 39.5 | 72.6 | 3.2 | ✅ | 膽 | 2 |
| L2 | 4 | BULLISH NOVA | 12.3 | 38.9 | 11 | ✅ | 腳 | 10 |
| L1 | 2 | GLORY B | 12.5 | 38.8 | 99 | ✅ | 腳 | 12 |
| L3 | 3 | INCREDIBLE MOMENT | 11.2 | 37.6 | 5.1 | ✅ | 腳 | 8 |
| L4 | 7 | STUNNING BUNDLE | 6.8 | 25.5 | 4.9 | ✅ | 腳 | 3 |
| L5 | 1 | POSITIVE SMILE | 4.3 | 18.6 | 12 | ✅ | 腳 | 7 |
| — | 12 | INCANTO STAR | 4.1 | 18.8 | 7.7 | ❌ | — | 6 |
| — | 10 | SILVER SPURS | 2.7 | 13.2 | 11 | ❌ | — | 1 |
| — | 11 | SWAGGER BRO | 2.3 | 12.0 | 13 | ❌ | — | 5 |

### R7 — Class 3 1000m | Result 6→12→2 | banker #3
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 3 | MICKLEY | 31.6 | 64.5 | 10 | ✅ | 膽 | 10 |
| L1 | 2 | FAST RESPONDER | 22.4 | 54.6 | 8.4 | ✅ | 腳 | 3 |
| L2 | 5 | METRO POWER | 10.5 | 35.5 | 3.4 | ✅ | 腳 | 4 |
| L3 | 6 | STRAIGHT TO GLORY | 8.3 | 29.7 | 11 | ✅ | 腳 | 1 |
| L4 | 10 | DANCING CLASSICS | 7.4 | 26.6 | 10 | ✅ | 腳 | 12 |
| L5 | 12 | LUCKY CANDY | 5.2 | 21.7 | 4 | ✅ | 腳 | 2 |
| L6 | 7 | TOGETHER WE VALUE | 5.2 | 22.2 | 7.3 | ✅ | 腳 | 8 |
| — | 9 | DRAGON FOUR SEAS | 3.1 | 12.3 | 156 | ❌ | — | 5 |
| — | 14 | PARENTS' LOVE | 2.7 | 13.3 | 21 | ❌ | — | 6 |
| — | 8 | RED ELEGANCE | 1.6 | 8.3 | 58 | ❌ | — | 13 |

### R8 — Class 4 1400m | Result 3→4→7 | banker #3
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 3 | NYX GLUCK | 32.3 | 65.1 | 3 | ✅ | 膽 | 1 |
| L1 | 8 | FRANCIS MEYNELL | 16.5 | 44.8 | 7.3 | ✅ | 腳 | 9 |
| L2 | 2 | CALL ME SPARKLE | 11.1 | 34.0 | 9 | ✅ | 腳 | 6 |
| — | 1 | CIRCUIT FIERY | 8.4 | 30.5 | 11 | ❌ | — | 11 |
| L3 | 4 | BEAUTY AWARD | 7.7 | 26.4 | 9 | ✅ | 腳 | 2 |
| L4 | 7 | STRATHPEFFER | 6.2 | 22.5 | 25 | ✅ | 腳 | 3 |
| — | 11 | TACTICAL COMMANDER | 4.7 | 19.1 | 70 | ❌ | — | 10 |
| L5 | 10 | HONORARY | 2.4 | 10.9 | 3.7 | ✅ | 腳 | 5 |
| — | 9 | ACA FAST | 4.2 | 16.9 | 24 | ❌ | — | 12 |

### R9 — Class 4 1600m | Result 8→11→12 | banker #13
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 13 | FAMILY FORTUNE | 36.6 | 68.0 | 37 | ✅ | 膽 | 8 |
| L1 | 7 | BEAUTY VIVA | 15.5 | 43.6 | 31 | ✅ | 腳 | 12 |
| L2 | 5 | PRESTIGE HALL | 8.4 | 28.9 | 11 | ✅ | 腳 | 14 |
| L3 | 6 | ACE | 8.4 | 28.6 | 8.4 | ✅ | 腳 | 10 |
| L4 | 8 | JOLLY BRILLIANT | 7.6 | 28.5 | 3.3 | ✅ | 腳 | 1 |
| — | 4 | MEGA MASTERMIND | 8.1 | 28.5 | 15 | ❌ | — | 9 |
| — | 10 | FLYING BOOM | 4.2 | 17.8 | 22 | ❌ | — | 4 |
| L5 | 12 | AMAZING DUCK | 3.3 | 15.0 | 3.5 | ✅ | 腳 | 3 |

### R10 — Class 3 1600m | Result 3→2→13 | banker #4
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 4 | POWER OF VITAM | 29.3 | 63.9 | 2.7 | ✅ | 膽 | 7 |
| L1 | 2 | AMAZING PARTNERS | 20.4 | 54.8 | 5.6 | ✅ | 腳 | 2 |
| L2 | 3 | LUCKY SAM GOR | 17.6 | 49.3 | 8 | ✅ | 腳 | 1 |
| L3 | 6 | FLOW WATER FLOW | 9.3 | 34.4 | 5.8 | ✅ | 腳 | 5 |
| L4 | 5 | YUEN LONG ELITE | 8.5 | 30.0 | 10 | ✅ | 腳 | 8 |
| L5 | 7 | EMBRACES | 6.3 | 25.0 | 17 | ✅ | 腳 | 6 |
| L6 | 1 | SKY VINO | 5.9 | 24.5 | 22 | ✅ | 腳 | 4 |
| — | 8 | SHANWAH | 1.3 | 6.7 | 122 | ❌ | — | 9 |

### R11 — Class 3 1200m | Result 7→4→3 | banker #2
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 2 | TYCOON RESOURCES | 33.4 | 68.9 | 2.5 | ✅ | 膽 | 12 |
| L1 | 4 | SUPER STRONG KID | 17.4 | 50.0 | 16 | ✅ | 腳 | 2 |
| L2 | 8 | INVINCIBLE STEED | 14.0 | 44.2 | 12 | ✅ | 腳 | 5 |
| L3 | 3 | EFFORTLESS WIN | 13.6 | 43.2 | 3.8 | ✅ | 腳 | 3 |
| L4 | 7 | MOTOR | 9.4 | 33.9 | 11 | ✅ | 腳 | 1 |
| — | 6 | MATTERS MOST | 5.1 | 21.8 | 10 | ❌ | — | 10 |
| L5 | 1 | LADY'S CHOICE | 3.4 | 16.1 | 9.8 | ✅ | 腳 | 9 |
| — | 9 | MR DESIRA | 2.0 | 11.1 | 51 | ❌ | — | 7 |
## B Banker Performance (= MC #1)

| R | B Banker | MC Win% | Placed? | Position | Place $ |
|---|----------|---------|---------|----------|---------|
| 1 | #7 GENERAL SMART | 26.5 | ✅ | 3rd | 50 |
| 2 | #4 HE WAS ME | 21.6 | ✅ | 3rd | 21 |
| 3 | #14 WINNING MACHINE | 61.1 | ✅ | 3rd | 15.5 |
| 4 | #3 BEAUTY THUNDER | 27.1 | ✅ | 2nd | 46.5 |
| 5 | #3 STORM RIDER | 29.1 | ❌ | 6th | — |
| 6 | #6 STORM MIRROR | 39.5 | ✅ | 2nd | 14 |
| 7 | #3 MICKLEY | 31.6 | ❌ | 10th | — |
| 8 | #3 NYX GLUCK | 32.3 | ✅ | 1st | 15 |
| 9 | #13 FAMILY FORTUNE | 36.6 | ❌ | 8th | — |
| 10 | #4 POWER OF VITAM | 29.3 | ❌ | 7th | — |
| 11 | #2 TYCOON RESOURCES | 33.4 | ❌ | 12th | — |

**B banker top-3: 6/11 = 54.5%** | **B banker win: 1/11 = 9.1%** (R8).

Pattern analysis: MC#1 banker placed 6/11 (streak R1–R4), yet only 2 of those became hits because the leg pool kept missing one placer (R1 #10, R3 #11, R4 #7, R6 #10 — all crashed the frame from outside a 5-6 horse pool in 14-runner fields). The two Pattern-A misses (R7, R11) had all three placers among the legs but the banker itself failed — most painfully R11, where unbeaten 2.5-fav #2 ran 12th.
