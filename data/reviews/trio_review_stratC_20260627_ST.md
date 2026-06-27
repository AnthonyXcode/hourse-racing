# Trio Strategy B (stratC) Review — Sha Tin | 2026-06-27

## Rules (Strategy B, MC-only)
- **Banker** = horse ranked #1 by raw **MC Win%** (no debutant rule).
- **Primary legs** = all horses with **MC Place% > 20%** (excl banker).
- **Win-odds step**: any horse with MC Place% ≤ 20% AND Win odds < 10 replaces the weakest primary leg in the 20–30% / odds>10 band (1-for-1), else added directly.
- Unit **$10/combo**, 膽拖 → C(N,2) combos.

## Summary

| Strategy | Races | Hits | Staked | Returned | P&L | ROI |
|----------|-------|------|--------|----------|-----|-----|
| A (pipeline) | 11 | 2/11 | $910 | $1,022 | +$112 | +12.3% |
| B (report, Place%>20 + odds-swap) | 11 | 3/11 | $1,490 | $1,230 | -$260 | -17.4% |
| B (MC top-6, §11) | 11 | 2/11 | $1,100 | $1,022 | -$78 | -7.1% |

**Strategy A won.** Report-B caught one extra race (R7 $208) but its wide odds-swap legs (R1 7-leg $210, R3 8-leg $280, R8 7-leg $210) bled stake without extra return. MC-top-6 matched A's hits (R8, R11) at higher fixed cost.

## Race-by-Race — Strategy B (report)

| R | Class | Dist | Banker (MC#1) | Final legs | Combos | Stake | Result | Bnkr top3? | Hit? | Trio $ | P&L |
|---|-------|------|---------------|-----------|--------|-------|--------|-----------|------|--------|-----|
| 1 | C5 | 1200 | #3 | 9,5,2,1,7,13,14 | 21 | $210 | 10-4-3 | ✅(3rd) | ❌ | 1653 | -$210 |
| 2 | C5 | 1200 | #3 | 12,2,7,8,1 | 10 | $100 | 12-1-2 | ❌(14th) | ❌ | 209 | -$100 |
| 3 | C4 | 1200 | #6 | 5,11,10,3,1,8,2,7 | 28 | $280 | 2-5-8 | ❌(4th) | ❌ | 3775 | -$280 |
| 4 | C4 | 2000 | #2 | 4,3,7,14,9 | 10 | $100 | 7-14-4 | ❌(8th) | ❌ | 247 | -$100 |
| 5 | C4 | 1650 | #5 | 1,2,8,12,4 | 10 | $100 | 10-12-4 | ❌(6th) | ❌ | 272 | -$100 |
| 6 | C4 | 1200 | #3 | 2,4,10,9,1,8 | 15 | $150 | 8-4-1 | ❌(10th) | ❌ | 663 | -$150 |
| 7 | C4 | 1400 | #1 | 5,6,4,3 | 6 | $60 | 6-3-1 | ✅(3rd) | ✅ | 208 | +$148 |
| 8 | C1 | 1000 | #4 | 3,10,2,9,7,11,1 | 21 | $210 | 4-7-3 | ✅(1st) | ✅ | 168 | -$42 |
| 9 | C3 | 1650 | #1 | 2,6,9,13,5,8 | 15 | $150 | 1-14-12 | ✅(1st) | ❌ | 1149 | -$150 |
| 10 | C3 | 1200 | #6 | 2,1,8 | 3 | $30 | 6-11-7 | ✅(1st) | ❌ | 582 | -$30 |
| 11 | C3 | 1400 | #6 | 2,4,5,7,10 | 10 | $100 | 5-2-6 | ✅(3rd) | ✅ | 854 | +$754 |

## B Miss Pattern Summary (report-B)
- **Pattern A** (banker fail, all 3 in legs): **R2** (12-1-2 all in pool, banker #3 14th). Missed $209.
- **Pattern B** (banker hit, pool gap): R1 (#10/#4 gap), R9 (#14/#12 gap), R10 (#11/#7 gap). Missed $1653+$1149+$582.
- **Pattern C** (banker fail + pool gap): R3, R4, R5, R6. R3 $3,775 (#8 8th-rated placed, bk #6 4th).

Key: report-B's R8 hit was **banker #4 = MC#1 = actual winner**; R7 hit banked the debutant #1 (placed 3rd) and had #3 via odds-swap. But its wide legs on losing races (R1/R3/R8) cost ~$700 in dead stake vs Strategy A.

## Full MC Place% Table — Per Race
### R1 — Class 5 1200m | Result 10→4→3 | banker #3
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 3 | ALWAYS FLUKE | 27 | 57.2 | 5.2 | ✅ | 膽 | 3 |
| L1 | 9 | WINNING DIAMOND | 18.4 | 46.5 | 11 | ✅ | 腳 | 9 |
| L2 | 5 | SOLAR RIVER | 10.4 | 31.7 | 6.5 | ✅ | 腳 | 12 |
| L3 | 2 | HEROIC MASTER | 10.3 | 32.6 | 11 | ✅ | 腳 | 8 |
| L4 | 1 | AUTUMN VIBES | 9.9 | 32.3 | 5.3 | ✅ | 腳 | 13 |
| L5 | 7 | NO OTHER CHOICE | 6.7 | 23.8 | 10 | ✅ | 腳 | 14 |
| — | 8 | DASH | 4.3 | 16.9 | 23 | ❌ | — | 6 |
| — | 4 | LAKESHORE HERO | 4.3 | 18 | 10 | ❌ | — | 2 |
| — | 11 | ISLAND BREEZES | 3.5 | 14.6 | 52 | ❌ | — | 10 |
| L6 | 13 | SONIC BOOM | 1.7 | 8.2 | 9.6 | ✅ | 腳 | 5 |
| L7 | 14 | TAIHANG SCENERY | 1.4 | 7.6 | 19 | ✅ | 腳 | 11 |
| — | 10 | CIRCUIT VICTORY | 1.4 | 6.4 | 15 | ❌ | — | 1 |
| — | 12 | MULTIDUTCH | 0.4 | 2.4 | 119 | ❌ | — | 4 |
| — | 6 | AQUAMAN | 0.3 | 1.9 | 63 | ❌ | — | 7 |

### R2 — Class 5 1200m | Result 12→1→2 | banker #3
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 3 | BASIC INSTINCT | 22.3 | 51.4 | 19 | ✅ | 膽 | 14 |
| L1 | 12 | VERBIER | 17.6 | 46 | 2.9 | ✅ | 腳 | 1 |
| L2 | 2 | COUNTRY DANCER | 15.8 | 42.1 | 11 | ✅ | 腳 | 3 |
| L3 | 7 | ONLY U | 10.5 | 32 | 15 | ✅ | 腳 | 4 |
| L4 | 8 | CALL TO COMMAND | 10.2 | 31.9 | 11 | ✅ | 腳 | 13 |
| — | 11 | EXCEED THE WISH | 5.8 | 20.7 | 52 | ❌ | — | 6 |
| L5 | 1 | SUNNY Q | 4.7 | 19.2 | 5.7 | ✅ | 腳 | 2 |
| — | 9 | HAPPY BOYS | 4.6 | 16.8 | 40 | ❌ | — | 10 |
| — | 5 | RUNJEET | 3.8 | 15.2 | 23 | ❌ | — | 9 |
| — | 10 | VON BAER | 2.7 | 12.6 | 13 | ❌ | — | 7 |
| — | 13 | BINGO BABE | 0.8 | 4.7 | 9.4 | ❌ | — | 5 |
| — | 14 | SMART TRIO | 0.5 | 3.4 | 27 | ❌ | — | 8 |
| — | 6 | GOOD FORTUNE | 0.5 | 2.9 | 42 | ❌ | — | 12 |
| — | 4 | RUBY SAILING | 0.2 | 1.3 | 12 | ❌ | — | 11 |

### R3 — Class 4 1200m | Result 2→5→8 | banker #6
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 6 | GENIUS BABY | 31 | 63.7 | 15 | ✅ | 膽 | 4 |
| L1 | 5 | HAYDAY | 17.7 | 48.2 | 17 | ✅ | 腳 | 2 |
| L2 | 11 | KA YING RADIANCE | 15.3 | 42.3 | 2.3 | ✅ | 腳 | 5 |
| L3 | 10 | LITTLE MONSTER | 12 | 38 | 4.2 | ✅ | 腳 | 7 |
| L7 | 2 | ANODE | 5.2 | 19.4 | 11 | ✅ | 腳 | 1 |
| L5 | 1 | ARMOUR WAR EAGLE | 4.1 | 17.7 | 17 | ✅ | 腳 | 13 |
| L6 | 8 | COPARTNER A I | 3.5 | 15.3 | 16 | ✅ | 腳 | 3 |
| L4 | 3 | GHORGAN | 2.8 | 12.3 | 7.4 | ✅ | 腳 | 8 |
| — | 9 | TURF QUEST | 2.7 | 11.9 | 121 | ❌ | — | 10 |
| L8 | 7 | CALIFORNIA BAY | 2.4 | 12.1 | 27 | ✅ | 腳 | 12 |
| — | 4 | IRON SECURITY | 1.5 | 7.5 | 104 | ❌ | — | 6 |
| — | 14 | SYNERGY EXPRESS | 0.8 | 4 | 134 | ❌ | — | 14 |
| — | 13 | FALCON HUNTER | 0.6 | 3.8 | 80 | ❌ | — | 9 |
| — | 12 | GLORIOUS RYDER | 0.5 | 3.7 | 159 | ❌ | — | 11 |

### R4 — Class 4 2000m | Result 7→14→4 | banker #2
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 2 | DOUBLE WIN | 44.9 | 79.8 | 17 | ✅ | 膽 | 8 |
| L1 | 4 | ENTHRALLED | 20.2 | 57.7 | 4.9 | ✅ | 腳 | 3 |
| L2 | 3 | CHARITY TOGETHER | 12.4 | 42.5 | 85 | ✅ | 腳 | 14 |
| L3 | 7 | SUPER GOLDENDRAGON | 5.9 | 26.7 | 7.3 | ✅ | 腳 | 1 |
| — | 6 | VOLCANIC SPARK | 5.9 | 27 | 28 | ❌ | — | 11 |
| — | 10 | OCEAN IMPACT | 3.5 | 17.1 | 15 | ❌ | — | 6 |
| L5 | 9 | RELIABLE DAD | 1.8 | 11.7 | 7.7 | ✅ | 腳 | 4 |
| — | 12 | JOYFUL PROSPERITY | 1.3 | 8.1 | 18 | ❌ | — | 10 |
| L4 | 14 | STAR BROSE | 1.1 | 7.4 | 5.7 | ✅ | 腳 | 2 |
| — | 8 | MASSIVE GLORY | 0.9 | 5.7 | 90 | ❌ | — | 9 |
| — | 5 | FAST SPEED | 0.7 | 5.1 | 76 | ❌ | — | 13 |
| — | 13 | ON THE LASH | 0.5 | 3.9 | 34 | ❌ | — | 12 |
| — | 11 | ROMANTIC FANTASY | 0.4 | 3.5 | 36 | ❌ | — | 5 |
| — | 1 | NOISY BOY | 0.4 | 3.8 | 3.7 | ❌ | — | 7 |

### R5 — Class 4 1650m | Result 10→12→4 | banker #5
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 5 | PERFECT TEAM | 29.8 | 62.5 | 5.7 | ✅ | 膽 | 6 |
| L1 | 1 | HAPPY UNIVERSE | 19.9 | 51.8 | 10 | ✅ | 腳 | 13 |
| L2 | 2 | SUPREME AGILITY | 14.2 | 42.5 | 8.2 | ✅ | 腳 | 5 |
| L3 | 8 | NEVER PETER OUT | 11.9 | 36.8 | 24 | ✅ | 腳 | 10 |
| — | 11 | FOREMOST TEDDY | 5.2 | 20.7 | 16 | ❌ | — | 14 |
| L4 | 12 | BULL ATTITUDE | 5.1 | 20.9 | 5.7 | ✅ | 腳 | 2 |
| — | 6 | CALIFORNIA STAR | 4.2 | 18.3 | 20 | ❌ | — | 11 |
| L5 | 4 | CHILL KAKA | 3.4 | 14.6 | 4.4 | ✅ | 腳 | 3 |
| — | 10 | NIGHT PUROSANGUE | 2.4 | 12 | 7.1 | ❌ | — | 1 |
| — | 13 | CONRAD THE GREAT | 1.7 | 8.1 | 28 | ❌ | — | 7 |
| — | 7 | LESLIE | 1.1 | 6.2 | 36 | ❌ | — | 8 |
| — | 3 | PRESTIGE WIN | 0.8 | 3.9 | 89 | ❌ | — | 12 |
| — | 14 | FASHION LEGEND | 0.1 | 1.2 | 20 | ❌ | — | 9 |
| — | 9 | KING OF SELECTION | 0.1 | 0.7 | 106 | ❌ | — | 4 |

### R6 — Class 4 1200m | Result 8→4→1 | banker #3
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 3 | ELEGANT LIFE | 30.7 | 62.3 | 10 | ✅ | 膽 | 10 |
| L1 | 2 | AMAZING VICTORY | 19.4 | 48.6 | 60 | ✅ | 腳 | 12 |
| L2 | 4 | GROUPER | 12.6 | 38.6 | 7.7 | ✅ | 腳 | 2 |
| — | 6 | UNSTOPPABLE | 8.7 | 29.5 | 19 | ❌ | — | 6 |
| — | 5 | KING'S ARROW | 7.3 | 25.9 | 36 | ❌ | — | 11 |
| L3 | 10 | ENJOY GOLF | 5.2 | 20.2 | 5.1 | ✅ | 腳 | 5 |
| L4 | 9 | PHOENIX LIGHT | 4.8 | 18.5 | 9.4 | ✅ | 腳 | 4 |
| L5 | 1 | YEE CHEONG GLORY | 2.8 | 13.1 | 5.6 | ✅ | 腳 | 3 |
| — | 13 | SAME TO YOU | 2.3 | 12.2 | 21 | ❌ | — | 14 |
| L6 | 8 | KA YING RESILIENCE | 2 | 9.7 | 4.8 | ✅ | 腳 | 1 |
| — | 12 | GLACIATED | 1.8 | 8.9 | 9.9 | ❌ | — | 9 |
| — | 11 | FOREVER FANCY | 1.4 | 6.2 | 119 | ❌ | — | 7 |
| — | 7 | NAVAS G | 0.6 | 3.8 | 30 | ❌ | — | 8 |
| — | 14 | THE CONCENTRATION | 0.3 | 2.4 | 81 | ❌ | — | 13 |

### R7 — Class 4 1400m | Result 6→3→1 | banker #1
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 1 | JOYFUL JOY | 36.9 | 72.5 | 2.6 | ✅ | 膽 | 3 |
| L1 | 5 | GALLANT DESIGN | 22.1 | 57.4 | 3.3 | ✅ | 腳 | 4 |
| L2 | 6 | MASTER LUCKY | 15.8 | 46.8 | 7.7 | ✅ | 腳 | 1 |
| L3 | 4 | LIGHT YEARS GLORY | 8.1 | 32.2 | 13 | ✅ | 腳 | 6 |
| — | 7 | SOLID CAR | 5.3 | 23.6 | 14 | ❌ | — | 5 |
| — | 2 | LUNAR DASH | 3.6 | 17.7 | 25 | ❌ | — | 11 |
| — | 8 | THE ABSOLUTE | 2.5 | 12.4 | 55 | ❌ | — | 12 |
| L4 | 3 | HAROLD WIN | 1.6 | 9.3 | 10 | ✅ | 腳 | 2 |
| — | 12 | TURBO JEFFERIES | 1.3 | 7.7 | 46 | ❌ | — | 8 |
| — | 10 | STAR SATYR | 1.1 | 7 | 46 | ❌ | — | 10 |
| — | 9 | WORD OF KINDNESS | 1 | 7.2 | 91 | ❌ | — | 9 |
| — | 14 | KING GLORIOSO | 0.6 | 4.1 | 87 | ❌ | — | 13 |
| — | 13 | VIEW ALL THINGS | 0.1 | 1.6 | 30 | ❌ | — | 7 |
| — | 11 | VIEW OF COSMOS | 0 | 0.4 | 201 | ❌ | — | 14 |

### R8 — Class 1 1000m | Result 4→7→3 | banker #4
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 4 | COLOURFUL KING | 23.6 | 55.2 | 4.9 | ✅ | 膽 | 1 |
| L1 | 3 | BOTTOMUPTOGETHER | 23 | 55.2 | 6.5 | ✅ | 腳 | 3 |
| L2 | 10 | SUPERB CAPITALIST | 11.5 | 36.3 | 47 | ✅ | 腳 | 9 |
| L5 | 7 | MAGIC CONTROL | 9.6 | 30.8 | 3.4 | ✅ | 腳 | 2 |
| L4 | 9 | ROMANTIC SON | 9.5 | 31.1 | 43 | ✅ | 腳 | 4 |
| L3 | 2 | STELLAR EXPRESS | 9.3 | 31.8 | 4.8 | ✅ | 腳 | 5 |
| — | 5 | INVINCIBLE SAGE | 5.6 | 20.9 | 14 | ❌ | — | 8 |
| L7 | 1 | BEAUTY WAVES | 2.7 | 12.3 | 23 | ✅ | 腳 | 10 |
| — | 8 | BRAVE STAR | 2.4 | 11 | 84 | ❌ | — | 11 |
| L6 | 11 | GLOWING PRAISES | 2.2 | 10.8 | 6.1 | ✅ | 腳 | 6 |
| — | 6 | SING DRAGON | 0.7 | 4.6 | 35 | ❌ | — | 7 |

### R9 — Class 3 1650m | Result 1→14→12 | banker #1
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 1 | TALENTS AMBITION | 44.9 | 80 | 4.1 | ✅ | 膽 | 1 |
| L1 | 2 | VICTORY SKY | 23.2 | 64.4 | 20 | ✅ | 腳 | 13 |
| L2 | 6 | GLITTERING LEGEND | 17.6 | 54.6 | 12 | ✅ | 腳 | 11 |
| L6 | 8 | RUN RUN SMART | 2.7 | 17.3 | 6 | ✅ | 腳 | 5 |
| — | 7 | MUST GO | 2.5 | 15.1 | 40 | ❌ | — | 10 |
| L5 | 5 | SWORD POINT | 1.7 | 11.7 | 7.2 | ✅ | 腳 | 7 |
| — | 10 | ALL ROUND WINNER | 1.7 | 12.7 | 24 | ❌ | — | 6 |
| — | 3 | KAHOLO ANGEL | 1.4 | 9.5 | 31 | ❌ | — | 4 |
| L3 | 9 | NEZHA | 1.3 | 9.9 | 7.3 | ✅ | 腳 | 9 |
| L4 | 13 | KING DANCE | 1.1 | 8.6 | 8.0 | ✅ | 腳 | - |
| — | 4 | LO RIDER | 0.9 | 6.2 | 127 | ❌ | — | 8 |
| — | 14 | PRAY FOR JUSTICE | 0.5 | 4.4 | 11 | ❌ | — | 2 |
| — | 12 | TURIN MASCOT | 0.5 | 4.3 | 12 | ❌ | — | 3 |
| — | 11 | TELECOM FIGHTERS | 0.1 | 1.1 | 61 | ❌ | — | 12 |

### R10 — Class 3 1200m | Result 6→11→7 | banker #6
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 6 | MR INCREDIBLE | 32.4 | 67 | 1.2 | ✅ | 膽 | 1 |
| L1 | 2 | HAPPY INDEX | 20.8 | 51.9 | 10 | ✅ | 腳 | 6 |
| L2 | 1 | GUSTOSISIMO | 13.7 | 41.1 | 8.1 | ✅ | 腳 | 10 |
| L3 | 8 | LIFELINE EXPRESS | 9.8 | 32.3 | 28 | ✅ | 腳 | 9 |
| — | 4 | ROYAL BLITZ | 4.5 | 20 | 34 | ❌ | — | 5 |
| — | 3 | CHATEAUNEUF | 4.5 | 18.7 | 124 | ❌ | — | 7 |
| — | 9 | THOUSAND SPIRIT | 4.4 | 17.2 | 37 | ❌ | — | 8 |
| — | 7 | THUNDER KIT | 3.3 | 16.7 | 25 | ❌ | — | 3 |
| — | 5 | CITY GOLD BANNER | 2.4 | 12.2 | 41 | ❌ | — | 4 |
| — | 11 | EMBRACE ABERDEEN | 2.1 | 11.3 | 53 | ❌ | — | 2 |
| — | 14 | SUGAR SUGAR | 2 | 10.1 | 83 | ❌ | — | 13 |
| — | 10 | DOUBLE MONEY | 0.1 | 0.4 | 177 | ❌ | — | 12 |
| — | 13 | VIGOR HAPPINESS | 0.1 | 0.6 | 295 | ❌ | — | 14 |
| — | 12 | STANLEY EXPRESS | 0 | 0.4 | 235 | ❌ | — | 11 |

### R11 — Class 3 1400m | Result 5→2→6 | banker #6
| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Fin |
|-----|---|-------|------|--------|----|----|------|-----|
| ★ | 6 | CIRCUIT CHAMPION | 30.8 | 64.1 | 2.3 | ✅ | 膽 | 3 |
| L1 | 2 | AEROINVINCIBLE | 21 | 53.4 | 9.8 | ✅ | 腳 | 2 |
| L2 | 4 | FIT FOR BEAUTY | 14.4 | 41.9 | 5.4 | ✅ | 腳 | 7 |
| L3 | 5 | SOVEREIGN FUND | 8.5 | 29.7 | 51 | ✅ | 腳 | 1 |
| L4 | 7 | DO YOUR PART | 6.8 | 27.4 | 4.2 | ✅ | 腳 | 4 |
| L5 | 10 | STORMING DRAGON | 6 | 23.7 | 44 | ✅ | 腳 | 13 |
| — | 8 | WINDLORD | 3.8 | 16 | 69 | ❌ | — | 9 |
| — | 9 | MEGASTAR HEART | 3.4 | 15.4 | 13 | ❌ | — | 5 |
| — | 3 | CHIU CHOW SPIRIT | 3.1 | 13.4 | 29 | ❌ | — | 8 |
| — | 1 | CONTINENT EXPRESS | 0.8 | 4.4 | 68 | ❌ | — | 11 |
| — | 13 | THUNDER ACTION | 0.6 | 4.1 | 29 | ❌ | — | 10 |
| — | 11 | GOLDEN CHAMP | 0.6 | 3.8 | 133 | ❌ | — | 6 |
| — | 12 | THRIVING BROTHERS | 0.2 | 2.3 | 27 | ❌ | — | 12 |
| — | 14 | GRIT SPIRIT | 0 | 0.4 | 133 | ❌ | — | 14 |
## B Banker Performance (= MC #1)

| R | B Banker | MC Win% | SP | Placed? | Position |
|---|----------|---------|----|---------|----------|
| 1 | #3 ALWAYS FLUKE | 27.0 | 18.5* | ✅ | 3rd |
| 2 | #3 BASIC INSTINCT | 22.3 | — | ❌ | 14th |
| 3 | #6 GENIUS BABY | 31.0 | — | ❌ | 4th |
| 4 | #2 DOUBLE WIN | 44.9 | — | ❌ | 8th |
| 5 | #5 PERFECT TEAM | 29.8 | — | ❌ | 6th |
| 6 | #3 ELEGANT LIFE | 30.7 | — | ❌ | 10th |
| 7 | #1 JOYFUL JOY | 36.9 | 14* | ✅ | 3rd |
| 8 | #4 COLOURFUL KING | 23.6 | 18.5* | ✅ | 1st |
| 9 | #1 TALENTS AMBITION | 44.9 | 17* | ✅ | 1st |
| 10 | #6 MR INCREDIBLE | 32.4 | 10.1* | ✅ | 1st |
| 11 | #6 CIRCUIT CHAMPION | 30.8 | 12.5* | ✅ | 3rd |

(*place dividend, not SP.)

**B banker top-3: 6/11 = 54.5%** | **B banker win: 3/11 = 27.3%** (R8, R9, R10).

Pattern analysis: MC#1 banker placed 6/11 — fine — but report-B converted only 3 of those into hits because the pool either flopped on the banker (R2/R3/R4/R5/R6 bankers out) or had gaps on the placing-banker races (R9 #14/#12, R10 #11/#7 outside the legs). Where the banker held AND the legs covered (R7, R8, R11) it hit. The 33-1 winner in R11 (#5, a leg) delivered the meeting's biggest dividend for both A and B.
