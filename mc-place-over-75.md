# Races where the top-rated horse's MC place% > 75%

Generated 2026-09-14 from saved racecards with results.

- **Top-rated horse** = form #1 by overall rating (the `diff: 0` row in `analyze-race`).
- **MC place%** = share of 5,000 Monte Carlo runs where that horse finishes top 3. The simulation is unseeded, so horses near 75% can flip between runs.
- **Bet / Skip** = decision under the command shown for each venue (`--mc-min=75` plus the other skip rules).
- **Place div** = place dividend per $10 stake from the results file. ROI counts a placed horse with no dividend as stake back.

## Summary

| Venue | Races | MC place% > 75% | Bets | Placed | ROI (place) | Skipped by other rules |
|---|---|---|---|---|---|---|
| HV Turf | 330 | 33 | 29 | 24/29 (82.8%) | +13.6% | 4 (4 would have placed) |
| ST (Turf + AWT) | 557 | 168 | 65 | 39/65 (60.0%) | -8.6% | 103 (58 would have placed) |

## HV Turf

Command: `npx tsx tools/backtest-differentiation.ts --sparse=3 --close=3 --avgdiff=15 --gap=3 --form=all --mc-min=75 --venue=HV --surface=Turf`

| Race | Surface | Class | Dist | Horse | # | MC place% | Bet | Skip reason | Finish | Placed | Place div |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 20250910_HV_R5 | Turf | Class 3 | 1650 | HIGHLAND RAHY | 2 | 75.8 | BET |  | 2 | ✅ | $13.5 |
| 20251008_HV_R9 | Turf | Class 3 | 1200 | BIENVENUE | 5 | 79.8 | BET |  | 2 | ✅ | $14.0 |
| 20251015_HV_R6 | Turf | Class 4 | 1200 | TOURBILLON GOLFER | 3 | 79.1 | SKIP | 4 horses w/ <3 form | 3 | – | $14.0 |
| 20251102_HV_R6 | Turf | Class 4 | 1800 | HAKKA RADIANCE | 10 | 77.9 | BET |  | 1 | ✅ | $17.5 |
| 20251105_HV_R1 | Turf | Class 5 | 2200 | STORM RUNNER | 1 | 90.3 | BET |  | 2 | ✅ | $11.5 |
| 20251105_HV_R5 | Turf | Class 4 | 1200 | LUNAR DASH | 2 | 82.7 | SKIP | 4 horses w/ <3 form | 2 | – | $10.5 |
| 20251112_HV_R2 | Turf | Class 5 | 1200 | TALENTS SUPREMO | 8 | 82.6 | BET |  | 7 | ❌ | – |
| 20251112_HV_R5 | Turf | Class 4 | 1200 | ROBOT LUCKY STAR | 2 | 77.7 | BET |  | 2 | ✅ | $13.0 |
| 20251203_HV_R3 | Turf | Class 5 | 1800 | STORM RUNNER | 2 | 80.2 | BET |  | 2 | ✅ | $14.5 |
| 20251203_HV_R6 | Turf | Class 4 | 1200 | LUNAR DASH | 1 | 79.2 | BET |  | 7 | ❌ | – |
| 20251210_HV_R5 | Turf | Class 4 | 1650 | CORLEONE | 3 | 76.4 | BET |  | 1 | ✅ | $12.0 |
| 20251217_HV_R1 | Turf | Class 5 | 2200 | STORM RUNNER | 2 | 81.0 | BET |  | 3 | ✅ | $14.5 |
| 20260107_HV_R1 | Turf | Class 5 | 1800 | STORM RUNNER | 3 | 89.2 | BET |  | 3 | ✅ | $13.0 |
| 20260107_HV_R9 | Turf | Class 3 | 1650 | CORLEONE | 7 | 77.1 | BET |  | 2 | ✅ | $12.5 |
| 20260114_HV_R9 | Turf | Class 3 | 1200 | PERFECTDAY | 6 | 84.0 | BET |  | 2 | ✅ | $19.0 |
| 20260204_HV_R8 | Turf | Class 2 | 1200 | STORM RIDER | 2 | 79.1 | BET |  | 7 | ❌ | – |
| 20260211_HV_R6 | Turf | Class 3 | 1650 | MAX QUE | 2 | 77.6 | BET |  | 2 | ✅ | $12.0 |
| 20260325_HV_R7 | Turf | Class 4 | 1200 | GIANT BALLON | 2 | 79.5 | BET |  | 1 | ✅ | $13.5 |
| 20260422_HV_R8 | Turf | Class 3 | 1800 | ACE WAR | 11 | 79.2 | BET |  | 2 | ✅ | $14.5 |
| 20260422_HV_R9 | Turf | Class 3 | 1200 | AURIO | 1 | 76.7 | BET |  | 2 | ✅ | $13.5 |
| 20260429_HV_R2 | Turf | Class 4 | 1200 | HONEST WITNESS | 4 | 75.6 | BET |  | 1 | ✅ | $13.0 |
| 20260429_HV_R4 | Turf | Class 4 | 1200 | CROSSBORDERDUDE | 1 | 77.1 | BET |  | 3 | ✅ | $13.5 |
| 20260429_HV_R8 | Turf | Class 4 | 1200 | GIANT BALLON | 4 | 80.6 | BET |  | 1 | ✅ | $14.5 |
| 20260513_HV_R5 | Turf | Class 3 | 1800 | ACE WAR | 8 | 76.3 | SKIP | avgDiff=13 | 3 | – | $12.5 |
| 20260520_HV_R8 | Turf | Class 3 | 1200 | GIANT BALLON | 3 | 79.8 | BET |  | 2 | ✅ | $15.0 |
| 20260527_HV_R5 | Turf | Class 3 | 1650 | ARMOR GOLDEN EAGLE | 2 | 82.4 | BET |  | 1 | ✅ | $10.5 |
| 20260527_HV_R6 | Turf | Class 4 | 1200 | CROSSBORDERDUDE | 1 | 77.7 | BET |  | 5 | ❌ | – |
| 20260527_HV_R8 | Turf | Class 3 | 1000 | HORSEPOWER | 1 | 75.8 | SKIP | 4 horses w/ <3 form | 2 | – | $18.0 |
| 20260527_HV_R9 | Turf | Class 3 | 1200 | HONEST WITNESS | 9 | 78.7 | BET |  | 12 | ❌ | – |
| 20260603_HV_R1 | Turf | Class 5 | 1650 | FAMILY FORTUNE | 3 | 76.5 | BET |  | 1 | ✅ | $13.0 |
| 20260624_HV_R4 | Turf | Class 4 | 1650 | VIVACIOUS WIN | 5 | 79.0 | BET |  | 3 | ✅ | $13.0 |
| 20260624_HV_R8 | Turf | Class 3 | 1200 | THE HEIR | 7 | 75.5 | BET |  | 3 | ✅ | $14.0 |
| 20260909_HV_R2 | Turf | Class 4 | 1650 | MIGHTY STEED | 1 | 80.5 | BET |  | 1 | ✅ | $14.5 |

## ST (Turf + AWT)

Command: `npx tsx tools/backtest-differentiation.ts --sparse=3 --close=3 --avgdiff=15 --gap=3 --form=all --mc-min=75 --venue=ST`

| Race | Surface | Class | Dist | Horse | # | MC place% | Bet | Skip reason | Finish | Placed | Place div |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 20250907_ST_R3 | Turf | Class 1 | 1200 | KA YING RISING | 1 | 78.4 | SKIP | avgDiff=12 | 1 | – | $10.1 |
| 20250907_ST_R4 | Turf | Class 4 | 1000 | SUPER STRONG KID | 3 | 87.9 | SKIP | 6 horses w/ <3 form | 1 | – | $11.5 |
| 20250907_ST_R8 | Turf | Class 2 | 1400 | FAST NETWORK | 1 | 79.9 | SKIP | avgDiff=13 | 4 | – | – |
| 20250907_ST_R9 | Turf | Class 3 | 1200 | BULB GENERAL | 11 | 75.8 | SKIP | close<8=4 | 1 | – | $10.5 |
| 20250914_ST_R1 | Turf | Class 5 | 1400 | WINDICATOR FAMILY | 2 | 83.3 | BET |  | 3 | ✅ | $28.5 |
| 20250914_ST_R3 | AWT | Class 4 | 1200 | GIMME FIVE | 4 | 81.4 | SKIP | avgDiff=14 | 8 | – | – |
| 20250914_ST_R7 | Turf | Class 3 | 1000 | LIGHTNESS OF MUSIC | 11 | 92.2 | SKIP | 4 horses w/ <3 form | 8 | – | – |
| 20250921_ST_R3 | Turf | Class 4 | 1200 | PERIDOT | 4 | 82.9 | SKIP | 6 horses w/ <3 form | 5 | – | – |
| 20250921_ST_R5 | Turf | Class 4 | 1600 | BEAUTY VIVA | 3 | 88.9 | SKIP | Rtg+/-=-3 | 5 | – | – |
| 20250921_ST_R6 | Turf | Class 3 | 1200 | SKY TRUST | 1 | 90.7 | SKIP | 6 horses w/ <3 form | 1 | – | $14.0 |
| 20250928_ST_R8 | Turf | Group 1 | 1400 | LIGHT YEARS CHARM | 12 | 90.4 | BET |  | 7 | ❌ | – |
| 20251001_ST_R1 | Turf | Class 5 | 1400 | WINDICATOR FAMILY | 4 | 89.6 | BET |  | 8 | ❌ | – |
| 20251001_ST_R3 | Turf | Class 5 | 1200 | RAGNARR | 6 | 82.3 | BET |  | 1 | ✅ | $16.5 |
| 20251001_ST_R5 | Turf | Class 4 | 1800 | BEAUTY VIVA | 4 | 79.6 | BET |  | 2 | ✅ | $15.5 |
| 20251001_ST_R6 | Turf | Class 4 | 1400 | INVINCIBLE IBIS | 3 | 76.2 | SKIP | 4 horses w/ <3 form | 1 | – | $14.0 |
| 20251001_ST_R7 | Turf | Group 1 | 1000 | FAST NETWORK | 5 | 86.4 | SKIP | avgDiff=12 | 1 | – | $16.0 |
| 20251004_ST_R2 | Turf | Class 5 | 1400 | CIRCUIT FIERY | 2 | 83.0 | BET |  | 2 | ✅ | $14.5 |
| 20251004_ST_R3 | AWT | Class 4 | 1650 | FASHION LEGEND | 5 | 82.0 | BET |  | 5 | ❌ | – |
| 20251004_ST_R9 | Turf | Class 3 | 1200 | BULB GENERAL | 3 | 76.3 | SKIP | avgDiff=14 | 1 | – | $11.5 |
| 20251012_ST_R1 | Turf | Class 5 | 1200 | NOBLE DELUXE | 7 | 88.9 | BET |  | 3 | ✅ | $12.0 |
| 20251012_ST_R2 | Turf | Class 4 | 1200 | JUBILANT WINNER | 3 | 80.2 | SKIP | avgDiff=14 | 1 | – | $10.1 |
| 20251012_ST_R7 | Turf | Class 3 | 1200 | SUPER STRONG KID | 3 | 93.7 | BET |  | 2 | ✅ | $11.0 |
| 20251019_ST_R1 | Turf | Class 5 | 1400 | RAGNARR | 1 | 90.5 | BET |  | 4 | ❌ | – |
| 20251019_ST_R3 | Turf | Class 4 | 1800 | BEAUTY VIVA | 3 | 95.1 | BET |  | 7 | ❌ | – |
| 20251019_ST_R6 | Turf | Class 4 | 1200 | PACKING PHOENIX | 3 | 88.1 | SKIP | 5 horses w/ <3 form | 5 | – | – |
| 20251019_ST_R8 | Turf | Class 3 | 1200 | PATCH OF STARS | 2 | 82.2 | BET |  | 1 | ✅ | $11.5 |
| 20251026_ST_R3 | Turf | Class 4 | 1200 | DO YOUR PART | 1 | 77.2 | SKIP | 7 horses w/ <3 form | 3 | – | $12.5 |
| 20251026_ST_R7 | Turf | Class 3 | 2000 | GENTLEMEN LEGACY | 2 | 84.9 | BET |  | 4 | ❌ | – |
| 20251026_ST_R8 | Turf | Group 1 | 1200 | PACKING HERMOD | 5 | 81.6 | BET |  | 3 | ✅ | $14.0 |
| 20251030_ST_R4 | AWT | Class 4 | 1800 | RELIABLE PROFIT | 1 | 94.6 | BET |  | 1 | ✅ | $19.5 |
| 20251030_ST_R6 | AWT | Class 4 | 1650 | FASHION LEGEND | 6 | 91.0 | SKIP | Rtg+/-=-1 | 8 | – | – |
| 20251030_ST_R7 | AWT | Class 3 | 1200 | FUN N FUN TOGETHER | 7 | 76.4 | SKIP | avgDiff=14 | 3 | – | $22.5 |
| 20251109_ST_R3 | Turf | Class 5 | 1400 | CIRCUIT FIERY | 1 | 95.9 | BET |  | 4 | ❌ | – |
| 20251109_ST_R4 | Turf | Class 4 | 1600 | BEAUTY VIVA | 3 | 79.0 | SKIP | avgDiff=14 | 7 | – | – |
| 20251115_ST_R7 | Turf | Class 2 | 1200 | PATCH OF STARS | 9 | 87.7 | BET |  | 1 | ✅ | $15.0 |
| 20251115_ST_R9 | AWT | Class 3 | 1650 | RELIABLE PROFIT | 7 | 88.2 | BET |  | 3 | ✅ | $19.5 |
| 20251123_ST_R3 | Turf | Class 4 | 1400 | DO YOUR PART | 1 | 75.4 | SKIP | 4 horses w/ <3 form | 1 | – | $16.5 |
| 20251123_ST_R5 | Turf | Class 3 | 1400 | INVINCIBLE IBIS | 7 | 85.5 | BET |  | 1 | ✅ | $11.0 |
| 20251123_ST_R7 | Turf | Group 1 | 1600 | LIGHT YEARS CHARM | 13 | 79.1 | SKIP | avgDiff=13 | 8 | – | – |
| 20251123_ST_R8 | Turf | Group 1 | 2000 | VOYAGE BUBBLE | 2 | 92.7 | BET |  | 2 | ✅ | $10.1 |
| 20251123_ST_R9 | Turf | Class 3 | 1200 | SZERYNG | 8 | 76.5 | SKIP | 7 horses w/ <3 form | 5 | – | – |
| 20251130_ST_R10 | Turf | Class 3 | 1600 | BEAUTY BOLT | 1 | 84.4 | BET |  | 2 | ✅ | $17.0 |
| 20251130_ST_R3 | AWT | Class 4 | 1200 | THUNDER PRINCE | 3 | 76.4 | SKIP | 1st-2nd gap=0 | 3 | – | $22.0 |
| 20251130_ST_R4 | Turf | Class 4 | 1200 | EVER LUCK | 1 | 90.4 | SKIP | 9 horses w/ <3 form | 2 | – | $11.5 |
| 20251130_ST_R9 | Turf | Class 3 | 1200 | SUPER STRONG KID | 6 | 85.3 | SKIP | 7 horses w/ <3 form | 3 | – | $13.0 |
| 20251207_ST_R1 | AWT | Class 5 | 1650 | COURIER MAGIC | 1 | 92.8 | BET |  | 8 | ❌ | – |
| 20251207_ST_R5 | Turf | Class 4 | 1400 | WITH A SMILE | 2 | 77.2 | SKIP | avgDiff=14 | 1 | – | $15.0 |
| 20251214_ST_R5 | Turf | Group 1 | 1200 | KA YING RISING | 1 | 85.3 | BET |  | 1 | ✅ | $10.1 |
| 20251214_ST_R6 | Turf | Class 3 | 1800 | GENTLEMEN LEGACY | 2 | 85.1 | BET |  | 10 | ❌ | – |
| 20251214_ST_R8 | Turf | Group 1 | 2000 | ROMANTIC WARRIOR | 1 | 94.7 | SKIP | 4 horses w/ <3 form | 1 | – | $10.1 |
| 20251214_ST_R9 | Turf | Class 3 | 1400 | JUNEAU PRIDE | 1 | 76.9 | SKIP | 1st-2nd gap=1 | 5 | – | – |
| 20251220_ST_R1 | Turf | Class 5 | 1400 | CIRCUIT FIERY | 1 | 95.5 | BET |  | 1 | ✅ | $14.0 |
| 20251220_ST_R10 | Turf | Class 3 | 1400 | DO YOUR PART | 7 | 84.3 | BET |  | 3 | ✅ | $14.5 |
| 20251220_ST_R11 | Turf | Class 3 | 1600 | INVINCIBLE IBIS | 5 | 83.9 | BET |  | 1 | ✅ | $13.5 |
| 20251220_ST_R4 | Turf | Class 4 | 1000 | PACKING GLORY | 2 | 87.7 | SKIP | 9 horses w/ <3 form | 5 | – | – |
| 20251220_ST_R9 | Turf | Class 2 | 1200 | PATCH OF STARS | 7 | 86.7 | BET |  | 4 | ❌ | – |
| 20251227_ST_R5 | Turf | Class 4 | 1200 | PACKING PHOENIX | 1 | 82.5 | SKIP | 7 horses w/ <3 form | 8 | – | – |
| 20251227_ST_R7 | AWT | Class 4 | 1650 | STAR FIGURE | 4 | 78.9 | SKIP | avgDiff=14 | 8 | – | – |
| 20251227_ST_R8 | Turf | Class 3 | 1000 | SUPER STRONG KID | 4 | 81.2 | SKIP | 4 horses w/ <3 form | 5 | – | – |
| 20260101_ST_R10 | Turf | Class 3 | 1400 | WITH A SMILE | 9 | 94.8 | SKIP | 10 horses w/ <3 form | 4 | – | – |
| 20260101_ST_R3 | Turf | Class 5 | 1200 | RIDING HIGH | 6 | 84.7 | BET |  | 1 | ✅ | $14.0 |
| 20260104_ST_R10 | Turf | Class 3 | 1200 | POWER KOEPP | 1 | 79.6 | SKIP | 7 horses w/ <3 form | 9 | – | – |
| 20260104_ST_R11 | Turf | Class 3 | 1600 | EVERYONE'S STAR | 1 | 84.7 | SKIP | 6 horses w/ <3 form | 5 | – | – |
| 20260104_ST_R3 | AWT | Class 4 | 1200 | NOTTHESILLYONE | 6 | 85.3 | SKIP | 6 horses w/ <3 form | 10 | – | – |
| 20260104_ST_R6 | Turf | Class 4 | 1400 | MR COOL | 2 | 86.2 | SKIP | 9 horses w/ <3 form | 3 | – | $12.5 |
| 20260104_ST_R7 | Turf | Class 2 | 1600 | SOLEIL FIGHTER | 2 | 80.6 | SKIP | 5 horses w/ <3 form | 2 | – | $16.0 |
| 20260104_ST_R8 | Turf | Group 1 | 1000 | COLOURFUL KING | 6 | 79.0 | SKIP | avgDiff=13 | 2 | – | $11.0 |
| 20260104_ST_R9 | AWT | Class 3 | 1200 | VICTORY SKY | 5 | 85.8 | BET |  | 1 | ✅ | $15.5 |
| 20260111_ST_R10 | Turf | Group 1 | 1600 | INVINCIBLE IBIS | 1 | 76.8 | SKIP | 7 horses w/ <3 form | 1 | – | $14.5 |
| 20260111_ST_R2 | Turf | Class 4 | 1200 | MAJESTIC VALOUR | 1 | 81.3 | SKIP | 6 horses w/ <3 form | 1 | – | $13.5 |
| 20260111_ST_R3 | Turf | Class 4 | 1200 | EVER LUCK | 1 | 86.8 | SKIP | 8 horses w/ <3 form | 3 | – | $10.5 |
| 20260111_ST_R4 | Turf | Class 4 | 1400 | CIRCUIT FIERY | 11 | 87.3 | BET |  | 3 | ✅ | $17.5 |
| 20260111_ST_R7 | Turf | Class 3 | 1200 | SZERYNG | 6 | 77.7 | SKIP | 5 horses w/ <3 form | 12 | – | – |
| 20260111_ST_R8 | Turf | Class 2 | 1400 | LITTLE PARADISE | 8 | 88.6 | BET |  | 1 | ✅ | $11.5 |
| 20260118_ST_R6 | Turf | Class 4 | 1400 | TOP TIME | 1 | 90.9 | BET |  | 6 | ❌ | – |
| 20260118_ST_R8 | Turf | Class 3 | 1200 | AURIO | 4 | 76.5 | SKIP | 6 horses w/ <3 form | 2 | – | $13.0 |
| 20260121_ST_R1 | AWT | Class 5 | 1200 | GENERAL SMART | 4 | 81.9 | SKIP | Rtg+/-=-2 | 6 | – | – |
| 20260121_ST_R4 | AWT | Class 2 | 1650 | NEW FOREST | 6 | 98.5 | SKIP | 1st-2nd gap=1 | 1 | – | – |
| 20260121_ST_R5 | AWT | Class 4 | 1200 | SUPREME SEA | 1 | 84.6 | SKIP | 4 horses w/ <3 form | 2 | – | $10.5 |
| 20260121_ST_R8 | AWT | Class 3 | 1200 | BLAZING WIND | 9 | 87.7 | SKIP | 4 horses w/ <3 form | 1 | – | $12.5 |
| 20260125_ST_R11 | Turf | Class 3 | 1600 | BEAUTY ALLIANCE | 1 | 88.4 | SKIP | 7 horses w/ <3 form | 5 | – | – |
| 20260125_ST_R4 | Turf | Class 4 | 1200 | PACKING GLORY | 1 | 84.1 | SKIP | 8 horses w/ <3 form | 2 | – | $13.5 |
| 20260125_ST_R6 | Turf | Group 1 | 1200 | KA YING RISING | 1 | 87.6 | SKIP | avgDiff=11 | 1 | – | $10.1 |
| 20260125_ST_R7 | Turf | Class 4 | 1400 | STERLING WONGCHOY | 14 | 77.8 | SKIP | avgDiff=14 | 5 | – | – |
| 20260125_ST_R9 | Turf | Class 2 | 1200 | PATCH OF STARS | 4 | 85.9 | BET |  | 3 | ✅ | $14.5 |
| 20260201_ST_R11 | Turf | Class 3 | 1400 | SIX PACK | 2 | 90.9 | SKIP | 7 horses w/ <3 form | 2 | – | $18.0 |
| 20260208_ST_R2 | AWT | Class 4 | 1200 | MR COOL | 3 | 90.8 | BET |  | 4 | ❌ | – |
| 20260208_ST_R6 | Turf | Class 4 | 1200 | VOYAGE BOSS | 1 | 77.5 | SKIP | 4 horses w/ <3 form | 5 | – | – |
| 20260208_ST_R8 | Turf | Group 1 | 1800 | SPEED DRAGON | 5 | 88.9 | SKIP | avgDiff=12 | 2 | – | $14.0 |
| 20260214_ST_R5 | AWT | Class 3 | 1650 | DRAGON AIR FORCE | 2 | 78.4 | BET |  | 2 | ✅ | $20.5 |
| 20260214_ST_R7 | Turf | Class 2 | 1200 | PATCH OF STARS | 0 | 81.0 | SKIP | 1st-2nd gap=1 | – | – | – |
| 20260214_ST_R8 | Turf | Class 4 | 1400 | SOLID CAR | 4 | 82.5 | SKIP | 4 horses w/ <3 form | 8 | – | – |
| 20260214_ST_R9 | Turf | Class 3 | 1000 | CITY GOLD BANNER | 2 | 76.3 | SKIP | 5 horses w/ <3 form | 7 | – | – |
| 20260219_ST_R10 | Turf | Class 3 | 1200 | HOT DELIGHT | 13 | 79.9 | SKIP | 8 horses w/ <3 form | 1 | – | $10.1 |
| 20260219_ST_R6 | Turf | Class 2 | 1600 | SOLEIL FIGHTER | 6 | 85.7 | BET |  | 6 | ❌ | – |
| 20260222_ST_R10 | Turf | Class 3 | 1600 | BEAUTY ALLIANCE | 1 | 91.3 | SKIP | 4 horses w/ <3 form | 7 | – | – |
| 20260222_ST_R2 | Turf | Class 4 | 1200 | GIANT BALLON | 5 | 79.3 | SKIP | 5 horses w/ <3 form | 5 | – | – |
| 20260222_ST_R4 | Turf | Class 2 | 1000 | COLOURFUL KING | 2 | 78.5 | SKIP | avgDiff=8 | 2 | – | $10.1 |
| 20260222_ST_R8 | Turf | Group 1 | 1400 | KA YING RISING | 1 | 85.1 | SKIP | avgDiff=14 | 1 | – | $10.1 |
| 20260301_ST_R11 | Turf | Class 2 | 1400 | JUNEAU PRIDE | 10 | 79.7 | SKIP | avgDiff=14 | 2 | – | $14.5 |
| 20260301_ST_R2 | Turf | Class 4 | 1400 | CALIFORNIA BAY | 7 | 75.7 | SKIP | 4 horses w/ <3 form | 2 | – | $15.0 |
| 20260301_ST_R3 | Turf | Class 4 | 1400 | CIRCUIT FIERY | 8 | 91.5 | SKIP | 4 horses w/ <3 form | 1 | – | $12.0 |
| 20260301_ST_R4 | Turf | Class 4 | 1200 | GOLD PATCH | 3 | 76.6 | SKIP | 6 horses w/ <3 form | 3 | – | $12.0 |
| 20260301_ST_R7 | Turf | Group 1 | 2000 | VOYAGE BUBBLE | 2 | 79.6 | SKIP | 1st-2nd gap=2 | 5 | – | – |
| 20260301_ST_R8 | Turf | Class 3 | 1200 | AURIO | 6 | 79.9 | SKIP | 4 horses w/ <3 form | 4 | – | – |
| 20260308_ST_R3 | AWT | Class 4 | 1200 | ONE MAN SHOW | 2 | 93.6 | BET |  | 5 | ❌ | – |
| 20260315_ST_R10 | Turf | Class 3 | 1200 | RED SEA | 3 | 84.3 | SKIP | 4 horses w/ <3 form | 3 | – | $17.0 |
| 20260315_ST_R3 | Turf | Class 4 | 1200 | CROSSBORDERDUDE | 1 | 82.6 | SKIP | 5 horses w/ <3 form | 3 | – | $10.5 |
| 20260315_ST_R5 | AWT | Class 4 | 1650 | CALIFORNIA STAR | 5 | 88.7 | BET |  | 2 | ✅ | $21.5 |
| 20260315_ST_R7 | Turf | Class 4 | 1400 | PAPAYA BROSE | 2 | 75.9 | SKIP | avgDiff=14 | 3 | – | $14.5 |
| 20260315_ST_R8 | AWT | Class 3 | 1650 | DRAGON AIR FORCE | 2 | 83.0 | SKIP | avgDiff=14 | 11 | – | – |
| 20260322_ST_R6 | Turf | Class 3 | 1200 | COOL BOY | 3 | 78.7 | SKIP | close<8=4 | 4 | – | – |
| 20260322_ST_R9 | Turf | Class 3 | 1400 | AEROVOLANIC | 9 | 86.8 | BET |  | 1 | ✅ | $14.0 |
| 20260329_ST_R6 | Turf | Class 4 | 1400 | CIRCUIT FIERY | 3 | 80.6 | BET |  | 3 | ✅ | $17.5 |
| 20260329_ST_R9 | Turf | Class 2 | 1200 | MAGNIFIQUE | 6 | 89.9 | BET |  | 9 | ❌ | – |
| 20260401_ST_R1 | AWT | Class 5 | 1200 | ONLY U | 3 | 90.9 | BET |  | 10 | ❌ | – |
| 20260401_ST_R4 | AWT | Class 4 | 1200 | SPEEDY SMARTIE | 2 | 80.0 | SKIP | avgDiff=14 | 2 | – | $12.0 |
| 20260401_ST_R5 | AWT | Class 4 | 1800 | CALIFORNIA STAR | 2 | 83.7 | BET |  | 7 | ❌ | – |
| 20260401_ST_R6 | AWT | Class 4 | 1200 | ONE MAN SHOW | 3 | 82.3 | SKIP | Rtg+/-=-2 | 5 | – | – |
| 20260401_ST_R7 | AWT | Class 4 | 1200 | GOOD CHAP | 6 | 77.1 | SKIP | avgDiff=14 | 7 | – | – |
| 20260401_ST_R8 | AWT | Class 3 | 1200 | VICTORY SKY | 4 | 83.8 | BET |  | 1 | ✅ | $12.0 |
| 20260406_ST_R1 | Turf | Class 4 | 1000 | ALMIGHTY LIGHTNING | 1 | 86.9 | SKIP | 9 horses w/ <3 form | 2 | – | $10.1 |
| 20260406_ST_R10 | Turf | Class 2 | 1400 | SIX PACK | 8 | 86.6 | BET |  | 3 | ✅ | $12.0 |
| 20260406_ST_R3 | Turf | Class 4 | 1600 | MR COOL | 1 | 81.9 | BET |  | 3 | ✅ | $16.5 |
| 20260406_ST_R5 | Turf | Class 4 | 1200 | MR INCREDIBLE | 1 | 81.5 | SKIP | 5 horses w/ <3 form | 6 | – | – |
| 20260406_ST_R6 | Turf | Class 3 | 1000 | GLOWING PRAISES | 1 | 80.3 | SKIP | 4 horses w/ <3 form | 2 | – | $15.5 |
| 20260406_ST_R7 | Turf | Group 2 | 1200 | KA YING RISING | 1 | 80.5 | SKIP | avgDiff=8 | 1 | – | $10.1 |
| 20260412_ST_R6 | Turf | Class 4 | 1200 | BABY SAKURA | 1 | 80.0 | SKIP | 5 horses w/ <3 form | 3 | – | $10.1 |
| 20260419_ST_R1 | AWT | Class 5 | 1800 | HAILTOTHEVICTORS | 2 | 83.6 | BET |  | 4 | ❌ | – |
| 20260419_ST_R11 | Turf | Class 2 | 1800 | GENTLEMEN LEGACY | 6 | 79.6 | BET |  | 4 | ❌ | – |
| 20260419_ST_R6 | AWT | Class 4 | 1650 | CALIFORNIA STAR | 4 | 81.1 | SKIP | close<8=4 | 12 | – | – |
| 20260426_ST_R3 | Turf | Class 4 | 1200 | ABSOLUTE HEART | 1 | 77.6 | SKIP | 8 horses w/ <3 form | 8 | – | – |
| 20260426_ST_R5 | Turf | Group 1 | 1200 | KA YING RISING | 1 | 82.8 | SKIP | avgDiff=12 | 1 | – | $10.1 |
| 20260426_ST_R9 | Turf | Group 1 | 2000 | ROMANTIC WARRIOR | 2 | 80.9 | SKIP | 5 horses w/ <3 form | 1 | – | $10.1 |
| 20260503_ST_R6 | Turf | Group 3 | 2400 | GENTLEMEN LEGACY | 3 | 87.0 | SKIP | avgDiff=10 | 2 | – | $13.5 |
| 20260503_ST_R8 | Turf | Class 2 | 1600 | SKY JEWELLERY | 8 | 87.1 | BET |  | 1 | ✅ | $10.5 |
| 20260506_ST_R1 | AWT | Class 5 | 1650 | HAILTOTHEVICTORS | 1 | 78.1 | SKIP | 1st-2nd gap=2 | 4 | – | – |
| 20260506_ST_R3 | AWT | Class 4 | 1200 | JUICY DRAGON | 7 | 80.5 | SKIP | avgDiff=14 | 1 | – | $13.5 |
| 20260506_ST_R5 | AWT | Class 4 | 1200 | LIGHT YEARS GLORY | 2 | 79.6 | SKIP | 1st-2nd gap=2 | 3 | – | $16.0 |
| 20260506_ST_R6 | AWT | Class 4 | 1650 | NEVER PETER OUT | 6 | 81.8 | BET |  | 5 | ❌ | – |
| 20260509_ST_R8 | Turf | Class 3 | 1200 | GOLD PATCH | 3 | 80.7 | SKIP | 1st-2nd gap=2 | 3 | – | $14.5 |
| 20260517_ST_R4 | Turf | Class 4 | 1200 | PAPAYA BROSE | 1 | 76.9 | SKIP | 5 horses w/ <3 form | 4 | – | – |
| 20260517_ST_R8 | Turf | Class 4 | 1800 | VERMILION TEMPEST | 4 | 82.4 | BET |  | 11 | ❌ | – |
| 20260531_ST_R3 | Turf | Class 4 | 1200 | PAPAYA BROSE | 1 | 80.8 | SKIP | 6 horses w/ <3 form | 1 | – | $14.0 |
| 20260531_ST_R7 | Turf | Group 3 | 1600 | WINNING OVATION | 6 | 83.7 | SKIP | 1st-2nd gap=2 | 5 | – | – |
| 20260607_ST_R1 | AWT | Class 5 | 1800 | MEEPMEEP | 4 | 83.0 | SKIP | 1st-2nd gap=1 | 6 | – | – |
| 20260607_ST_R2 | Turf | Class 5 | 1400 | WINNING MACHINE | 1 | 84.6 | BET |  | 2 | ✅ | $14.5 |
| 20260607_ST_R3 | Turf | Class 4 | 1200 | MASTER PAYMENT | 2 | 91.8 | BET |  | 1 | ✅ | $13.5 |
| 20260613_ST_R7 | Turf | Class 4 | 1200 | SUPERB SPIRIT | 3 | 81.0 | SKIP | avgDiff=14 | 1 | – | $12.0 |
| 20260621_ST_R10 | Turf | Class 3 | 1200 | CROSSBORDERPEGASUS | 1 | 75.9 | SKIP | 6 horses w/ <3 form | 4 | – | – |
| 20260621_ST_R2 | Turf | Class 5 | 1400 | WINNING MACHINE | 2 | 83.6 | BET |  | 1 | ✅ | $17.5 |
| 20260621_ST_R5 | Turf | Class 4 | 1600 | SKY DEEP | 2 | 77.6 | SKIP | avgDiff=14 | 5 | – | – |
| 20260627_ST_R4 | Turf | Class 4 | 2000 | DOUBLE WIN | 2 | 79.8 | BET |  | 8 | ❌ | – |
| 20260627_ST_R9 | AWT | Class 3 | 1650 | TALENTS AMBITION | 1 | 79.8 | BET |  | 1 | ✅ | $17.0 |
| 20260701_ST_R3 | Turf | Class 4 | 1400 | WINNING MACHINE | 14 | 89.3 | SKIP | 4 horses w/ <3 form | 3 | – | $15.5 |
| 20260704_ST_R10 | Turf | Class 3 | 1200 | SUPERB SPIRIT | 6 | 83.6 | BET |  | 2 | ✅ | $11.5 |
| 20260704_ST_R2 | Turf | Class 5 | 1200 | VERBIER | 5 | 84.4 | BET |  | 3 | ✅ | $11.0 |
| 20260704_ST_R4 | Turf | Class 2 | 1200 | RISING FORCE | 4 | 79.6 | SKIP | close<8=4 | 1 | – | $10.1 |
| 20260704_ST_R6 | AWT | Class 4 | 1200 | PEJIBAYE | 1 | 76.6 | SKIP | 1st-2nd gap=1 | 11 | – | – |
| 20260704_ST_R9 | Turf | Class 4 | 1200 | LUCRATIVE EIGHT | 3 | 85.1 | BET |  | 1 | ✅ | $10.5 |
| 20260712_ST_R1 | Turf | Class 5 | 1800 | HAILTOTHEVICTORS | 2 | 85.1 | BET |  | 3 | ✅ | $33.5 |
| 20260712_ST_R11 | Turf | Class 3 | 1400 | SUPER EXPRESS | 1 | 79.1 | BET |  | 5 | ❌ | – |
| 20260906_ST_R3 | Turf | Group 3 | 1200 | KA YING RISING | 1 | 76.0 | SKIP | 1st-2nd gap=2 | 1 | – | – |
| 20260906_ST_R4 | Turf | Class 5 | 1600 | HAILTOTHEVICTORS | 2 | 87.1 | BET |  | 9 | ❌ | – |
| 20260913_ST_R1 | Turf | Class 5 | 1400 | RATTAN GALAXY | 10 | 92.7 | SKIP | Rtg+/-=-1 | 1 | – | $16.5 |
| 20260913_ST_R10 | Turf | Class 3 | 1400 | NYX GLUCK | 12 | 76.0 | SKIP | avgDiff=14 | 1 | – | $13.0 |
| 20260913_ST_R5 | Turf | Class 4 | 1200 | ROAD TO GLORY | 9 | 83.9 | BET |  | 8 | ❌ | – |
| 20260913_ST_R6 | Turf | Class 4 | 1600 | VICTOR SUPREME | 1 | 79.7 | BET |  | 9 | ❌ | – |
