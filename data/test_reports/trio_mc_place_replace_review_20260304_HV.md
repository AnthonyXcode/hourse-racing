# Trio review — MC Place% + replacement rule | Happy Valley | 2026-03-04

**Rule**

- **Banker**: horse with **highest MC Place%** (raw **MC Place%** from the report).
- **Legs (base)**: other runners with **MC Place% > 20%** (excluding banker), ordered high → low by Place%.
- **Replacement**: each runner with **Win odds < 10** and **MC Place% < 20%** replaces the **lowest MC Place%** among current legs (ascending odds order). **Odds = 10** does not qualify.
- **Approx `~` Place%** is **not** treated as >20% unless numeric strictly >20.
- **Bet**: 膽拖 C(N,2) × $10 per race; **hit** if official top 3 ⊆ {banker} ∪ {legs}.

**Data**: MC from **ADJUSTMENTS APPLIED** / **RAW MC** / **HORSE RANKINGS**; Win odds from **SCMP**, **Odds Movement**, or **Race card**; **Role** from HORSE RANKINGS. Missing: **—**.

**`role` column**: from the strategy report (often **Adj Win%** order); may differ from MC Place% banker.

**Tables**: full field from results; rows sorted by **MC Place%** (high → low).

**Results**: `data/historical/results_20260304_HV.json`

---

## Race 1

- **Banker**: #12 **DRAGON SUNRISE** — MC Place **46.6%**.
- **Swaps**: none.
- **Final legs**: #4, #2, #7, #3, #1 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 7-9-5 | Trio **$1** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 12 | DRAGON SUNRISE | 18.9% | 46.6% | 6.7 | ✅ | ✅ | Banker | ★ 膽 (Banker) | 6th |
| 4 | HAILTOTHEVICTORS | 15.8% | 40.6% | 8.5 | ✅ | ✅ | Leg | 腳 (Leg) | 8th |
| 2 | ON THE LASH | 10.9% | 32.3% | 23.0 | ✅ | — | Leg | 腳 (Leg) | 5th |
| 7 | SUPER SICARIO | 10.8% | 32.3% | 4.9 | ✅ | ✅ | Leg | 腳 (Leg) | 1st |
| 3 | CONSPIRACY WITNESS | 11.2% | 32.1% | 8.4 | ✅ | ✅ | Leg | 腳 (Leg) | 4th |
| 1 | KASA PAPA | 8.7% | 27.9% | 4.2 | ✅ | ✅ | Leg | 腳 (Leg) | 10th |
| 9 | ALL ARE MINE | ~6.3% | ~20% | 8.4 | — | ✅ | — | 腳 (Leg) | 2nd |
| 5 | PERFECT PAIRING | — | — | — | — | — | — | — | 3rd |
| 6 | ROSEWOOD FLEETFOOT | — | — | — | — | — | — | — | 9th |
| 8 | SMILING EMPEROR | — | — | — | — | — | — | — | 11th |
| 10 | JOLLY JUMPER | — | — | — | — | — | — | — | 7th |
| 11 | PERPETUAL POWER | — | — | — | — | — | — | — | 12th |

## Race 2

- **Banker**: #6 **ONLY U** — MC Place **56.8%**.
- **Swaps**: none.
- **Final legs**: #10, #3, #2, #4, #5 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 11-6-2 | Trio **$924** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 6 | ONLY U | 25.0% | 56.8% | 4.1 | ✅ | ✅ | Banker | ★ 膽 (Banker) | 2nd |
| 10 | ORIENTAL SURPRISE | 21.5% | 52.3% | 4.9 | ✅ | ✅ | Leg | 腳 (Leg) | 5th |
| 3 | STERLING WONGCHOY | 12.4% | 37.1% | 8.2 | ✅ | ✅ | Leg | 腳 (Leg) | 4th |
| 2 | CALL TO COMMAND | 9.1% | 28.8% | 9.4 | ✅ | ✅ | Leg | 腳 (Leg) | 3rd |
| 4 | THOUSAND CUPS | 7.0% | 24.8% | 6.0 | ✅ | ✅ | Leg | 腳 (Leg) | 8th |
| 5 | CONCORDE STAR | 7.0% | 24.4% | 10.0 | ✅ | — | Leg | 腳 (Leg) | 7th |
| 1 | POWER SUMMIT | — | — | 16.0 | — | — | — | — | 10th |
| 7 | RACINGRACE | — | — | 58.0 | — | — | — | — | 9th |
| 8 | NOBLE DELUXE | — | — | 21.0 | — | — | — | — | 12th |
| 9 | CHEER FOR SOUTH | — | — | 21.0 | — | — | — | — | 6th |
| 11 | VERBIER | — | — | 14.0 | — | — | — | — | 1st |
| 12 | SHINE BRIGHT | — | — | 31.0 | — | — | — | — | 11th |

## Race 3

- **Banker**: #6 **ACE WAR** — MC Place **50.0%**.
- **Swaps**: none.
- **Final legs**: #2, #1, #11, #3, #9 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 6-11-3 | Trio **$327** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 6 | ACE WAR | 21.1% | 50.0% | 5.5 | ✅ | ✅ | Banker | ★ 膽 (Banker) | 1st |
| 2 | SERANGOON | 17.1% | 44.3% | 8.4 | ✅ | ✅ | Leg | 腳 (Leg) | 7th |
| 1 | YOUNG BRAVO | 14.4% | 40.6% | 9.1 | ✅ | ✅ | Leg | 腳 (Leg) | 11th |
| 11 | STAR BROSE | 10.7% | 33.7% | 4.2 | ✅ | ✅ | Leg | 腳 (Leg) | 2nd |
| 3 | DOUBLE WIN | 10.0% | 31.1% | 9.4 | ✅ | ✅ | Leg | 腳 (Leg) | 3rd |
| 9 | SMART CITY | 8.2% | 26.2% | 8.7 | ✅ | ✅ | Leg | 腳 (Leg) | 4th |
| 4 | SHARPEN BRIGHT | ~5% | ~18% | 10.0 | — | — | — | 腳 (Leg) | 5th |
| 5 | SURE JOYFUL | — | — | 37.0 | — | — | — | — | 6th |
| 7 | YIU CHEUNG VICTORY | — | — | 23.0 | — | — | — | — | 8th |
| 8 | PING HAI COMET | — | — | 13.0 | — | — | — | — | 9th |
| 10 | MEGA FORCE | — | — | 25.0 | — | — | — | — | 12th |
| 12 | VIVA TASTE | — | — | 14.0 | — | — | — | — | 10th |

## Race 4

- **Banker**: #2 **GENIUS BABY** — MC Place **45.3%**.
- **Swaps**: none.
- **Final legs**: #7, #8, #12, #4, #3 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 12-2-4 | Trio **$133** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 2 | GENIUS BABY | 16.4% | 45.3% | 7.3 | ✅ | ✅ | Banker | 腳 (Leg) | 2nd |
| 7 | FLASH STAR | 16.8% | 44.6% | 15.0 | ✅ | — | Leg | ★ 膽 (Banker) | 5th |
| 8 | STAR PERFORMER | 13.9% | 40.2% | 8.0 | ✅ | ✅ | Leg | 腳 (Leg) | 9th |
| 12 | GAMEPLAYER ELITE | 14.7% | 39.9% | 4.9 | ✅ | ✅ | Leg | 腳 (Leg) | 1st |
| 4 | SKY CAP | 12.5% | 36.2% | 3.6 | ✅ | ✅ | Leg | 腳 (Leg) | 3rd |
| 3 | HOLMES A COURT | 10.7% | 32.8% | 4.5 | ✅ | ✅ | Leg | 腳 (Leg) | 4th |
| 1 | TACTICAL VICTORY | — | — | 36.0 | — | — | — | — | 11th |
| 6 | VIVA BOSS | — | — | 34.0 | — | — | — | — | 6th |
| 9 | ETERNAL RICHNESS | — | — | 43.0 | — | — | — | — | 10th |
| 10 | HAPPY ALLIANCE | — | — | 45.0 | — | — | — | — | 8th |
| 11 | GIDDY UP | — | — | 17.0 | — | — | — | — | 7th |

## Race 5

- **Banker**: #10 **YEE CHEONG SPIRIT** — MC Place **48.3%**.
- **Swap**: out **#7** (RISING ELITE) → in **#1** (GIANT LEAP, Win **6.3**).
- **Swap**: out **#1** (GIANT LEAP) → in **#11** (CIRRUS SPEED, Win **9.5**).
- **Swap**: out **#11** (CIRRUS SPEED) → in **#12** (ENJOY GOLF, Win **9.7**).
- **Final legs**: #5, #2, #4, #6, #12 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 5-1-12 | Trio **$393** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 10 | YEE CHEONG SPIRIT | 20.7% | 48.3% | 24.0 | ✅ | — | Banker | 腳 (Leg) | 12th |
| 5 | GIANT BALLON | 17.3% | 44.7% | 2.6 | ✅ | ✅ | Leg | ★ 膽 (Banker) | 1st |
| 2 | TACTICAL COMMAND | 11.9% | 34.7% | 13.0 | ✅ | — | Leg | 腳 (Leg) | 9th |
| 4 | FORTUNE WHISKEY | 9.9% | 30.8% | 4.8 | ✅ | ✅ | Leg | 腳 (Leg) | 5th |
| 6 | DUKE OF ORANGE | 8.2% | 26.7% | 7.4 | ✅ | ✅ | Leg | 腳 (Leg) | 4th |
| 7 | RISING ELITE | 8.2% | 24.5% | 137.0 | ✅ | — | — (out) | (excluded) | 10th |
| 11 | CIRRUS SPEED | ~4% | ~16% | 9.5 | — | ✅ | — (out) | — | 8th |
| 12 | ENJOY GOLF | ~3% | ~14% | 9.7 | — | ✅ | Swap-in | 腳 (Leg) | 3rd |
| 1 | GIANT LEAP | ~3% | ~12% | 6.3 | — | ✅ | — (out) | — | 2nd |
| 3 | TOP THRONE | — | — | 25.0 | — | — | — | — | 7th |
| 8 | HAPPY UNITED | — | — | 19.0 | — | — | — | — | 6th |
| 9 | BRAVE WIN | — | — | 20.0 | — | — | — | — | 11th |

## Race 6

- **Banker**: #2 **SPORTS LEGEND** — MC Place **58.0%**.
- **Swap**: out **#4** (POWER KOEPP) → in **#5** (ROMANTIC GLADIATOR, Win **8.9**).
- **Swap**: out **#5** (ROMANTIC GLADIATOR) → in **#1** (HARMONY N BLESSED, Win **9.0**).
- **Final legs**: #7, #3, #8, #9, #1 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 3-7-4 | Trio **$524** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 2 | SPORTS LEGEND | 25.1% | 58.0% | 3.0 | ✅ | ✅ | Banker | ★ 膽 (Banker) | 9th |
| 7 | FLYING WROTE | 20.5% | 53.7% | 4.9 | ✅ | ✅ | Leg | 腳 (Leg) | 2nd |
| 3 | SYMBOL OF STRENGTH | 17.2% | 48.6% | 5.2 | ✅ | ✅ | Leg | 腳 (Leg) | 1st |
| 8 | EVERSTAR | 10.1% | 33.6% | 23.0 | ✅ | — | Leg | 腳 (Leg) | 10th |
| 9 | TOURBILLON GOLFER | 9.6% | 33.2% | 7.4 | ✅ | ✅ | Leg | 腳 (Leg) | 6th |
| 4 | POWER KOEPP | 8.0% | 29.2% | 22.0 | ✅ | — | — (out) | 腳 (Leg) | 3rd |
| 5 | ROMANTIC GLADIATOR | ~3% | ~14% | 8.9 | — | ✅ | — (out) | — | 4th |
| 1 | HARMONY N BLESSED | ~2.5% | ~12% | 9.0 | — | ✅ | Swap-in | — | 5th |
| 6 | HEY BROS | ~2.5% | ~12% | 12.0 | — | — | — | — | 8th |
| 10 | FAMILY KNIGHT | ~1% | ~5% | 23.0 | — | — | — | — | 7th |

## Race 7

- **Banker**: #1 **RAGGA BOMB** — MC Place **58.1%**.
- **Swaps**: none.
- **Final legs**: #9, #5, #3, #4, #7 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 3-5-1 | Trio **$174** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 1 | RAGGA BOMB | 26.5% | 58.1% | 3.6 | ✅ | ✅ | Banker | ★ 膽 (Banker) | 3rd |
| 9 | TAKE ACTION | 17.8% | 47.6% | 4.7 | ✅ | ✅ | Leg | 腳 (Leg) | 8th |
| 5 | GLORIOUS JOURNEY | 11.7% | 36.6% | 8.0 | ✅ | ✅ | Leg | 腳 (Leg) | 2nd |
| 3 | CALIFORNIA MOXIE | 10.5% | 32.7% | 8.8 | ✅ | ✅ | Leg | 腳 (Leg) | 1st |
| 4 | NOBLE PURSUIT | 8.6% | 27.9% | 7.6 | ✅ | ✅ | Leg | 腳 (Leg) | 9th |
| 7 | TURIN WARRIOR | 6.7% | 23.9% | 21.0 | ✅ | — | Leg | 腳 (Leg) | 4th |
| 8 | NORTHERN BEAST | ~3% | ~13% | 18.0 | — | — | — | — | 11th |
| 10 | KOLACHI | ~3% | ~12% | 11.0 | — | — | — | — | 10th |
| 12 | LEGENDARY IMPACT | ~3% | ~12% | 15.0 | — | — | — | — | 7th |
| 2 | AESTHETICISM | ~2% | ~10% | 24.0 | — | — | — | — | 6th |
| 6 | SHANGHAI STYLE | ~2% | ~10% | 16.0 | — | — | — | — | 5th |
| 11 | MASTER OF HUMOR | ~1% | ~5% | 23.0 | — | — | — | — | 12th |

## Race 8

- **Banker**: #1 **LUCKY PLANET** — MC Place **59.2%**.
- **Swaps**: none.
- **Final legs**: #9, #3, #7, #6, #8 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 9-6-8 | Trio **$404** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 1 | LUCKY PLANET | 25.8% | 59.2% | 5.3 | ✅ | ✅ | Banker | ★ 膽 (Banker) | 6th |
| 9 | AMAZING KID | 21.6% | 53.5% | 9.0 | ✅ | ✅ | Leg | 腳 (Leg) | 1st |
| 3 | PEGAS | 10.6% | 34.3% | 4.4 | ✅ | ✅ | Leg | 腳 (Leg) | 4th |
| 7 | BEAUTY GLORY | 9.4% | 30.1% | 10.0 | ✅ | — | Leg | 腳 (Leg) | 8th |
| 6 | METRO POWER | 8.8% | 29.7% | 17.0 | ✅ | — | Leg | 腳 (Leg) | 2nd |
| 8 | STORMING DRAGON | 8.5% | 29.6% | 3.9 | ✅ | ✅ | Leg | 腳 (Leg) | 3rd |
| 5 | WINGS OF WAR | ~5% | ~20% | 7.6 | — | ✅ | — | — | 5th |
| 4 | SPICY GOLD | ~4% | ~17% | 10.0 | — | — | — | — | 10th |
| 2 | MATTERS MOST | ~3% | ~12% | 16.0 | — | — | — | — | 7th |
| 10 | INVINCIBLE STARR | ~1% | ~5% | 31.0 | — | — | — | — | 9th |

## Race 9

- **Banker**: #3 **CORLEONE** — MC Place **53.8%**.
- **Swaps**: none.
- **Final legs**: #5, #1, #11, #6, #10 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 7-9-6 | Trio **$4** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 3 | CORLEONE | 23.0% | 53.8% | 5.0 | ✅ | ✅ | Banker | ★ 膽 (Banker) | 8th |
| 5 | FORTUNATE SON | 16.8% | 45.1% | 26.0 | ✅ | — | Leg | 腳 (Leg) | 11th |
| 1 | SILVERY BREEZE | 13.6% | 38.0% | 4.3 | ✅ | ✅ | Leg | 腳 (Leg) | 4th |
| 11 | WITHALLMYFAITH | 10.8% | 34.0% | 4.4 | ✅ | ✅ | Leg | 腳 (Leg) | 5th |
| 6 | SUPER UNICORN | 11.0% | 33.8% | 25.0 | ✅ | — | Leg | 腳 (Leg) | 3rd |
| 10 | CHILL KAKA | 6.5% | 23.3% | 20.0 | ✅ | — | Leg | — | 7th |
| 4 | VIVA GRACIOUSNESS | ~5% | ~20% | 9.9 | — | ✅ | — | 腳 (Leg) | 9th |
| 7 | FIVEFORTWO | ~5% | ~20% | 4.8 | — | ✅ | — | 腳 (Leg) | 1st |
| 9 | SAMARKAND | ~3% | ~13% | 16.0 | — | — | — | — | 2nd |
| 2 | A AMERIC TE SPECSO | ~2% | ~10% | 18.0 | — | — | — | — | 10th |
| 8 | HAPPY TERCENTENARY | — | — | 29.0 | — | — | — | — | 12th |
| 12 | ANOTHER ZONDA | — | — | 22.0 | — | — | — | — | 6th |

---

## Meeting summary

| Metric | Value |
|--------|-------|
| Races parsed | **9** / 9 |
| Hits | **4** / 9 |
| Total stake | **$900** |
| Return (hits) | **$1038** |
| Net | **$+138** |
