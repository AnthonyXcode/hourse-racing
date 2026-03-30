# Trio review — MC Place% + replacement rule | Sha Tin | 2026-03-01

**Rule**

- **Banker**: horse with **highest MC Place%** (raw **MC Place%** from the report).
- **Legs (base)**: other runners with **MC Place% > 20%** (excluding banker), ordered high → low by Place%.
- **Replacement**: each runner with **Win odds < 10** and **MC Place% < 20%** replaces the **lowest MC Place%** among current legs (ascending odds order). **Odds = 10** does not qualify.
- **Approx `~` Place%** is **not** treated as >20% unless numeric strictly >20.
- **Bet**: 膽拖 C(N,2) × $10 per race; **hit** if official top 3 ⊆ {banker} ∪ {legs}.

**Data**: MC Win% / MC Place% from **ADJUSTMENTS APPLIED** (or RAW MC OUTPUT); Win odds from **SCMP DATA** table; **Role** from HORSE RANKINGS. Missing cells: **—**.

**Tables**: all declared runners; rows sorted by **MC Place%** (high → low), missing Place% last.

**Results**: `data/historical/results_20260301_ST.json`

---

## Race 1

- **Banker**: #1 **AUDACIOUS PURSUIT** — MC Place **48.2%**.
- **Swap**: out **#5** (THE LION KING) → in **#12** (KINGLY DEMEANOR, Win **8.7**).
- **Swap**: out **#12** (KINGLY DEMEANOR) → in **#2** (SUPREME MASTERMIND, Win **9.9**).
- **Final legs**: #9, #7, #4, #8, #2 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 9-7-3 | Trio **$827** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 1 | AUDACIOUS PURSUIT | 19.4% | 48.2% | 5.4 | ✅ | ✅ | Banker | 腳 (Leg) | 13th |
| 9 | STORM RUNNER | 19.4% | 47.2% | 14.0 | ✅ | — | Leg | ★ 膽 (Banker) | 1st |
| 7 | CHARITY TOGETHER | 13.5% | 38.1% | 5.3 | ✅ | ✅ | Leg | 腳 (Leg) | 2nd |
| 4 | OCEAN IMPACT | 11.1% | 33.3% | 11.0 | ✅ | — | Leg | 腳 (Leg) | 4th |
| 8 | VOLCANIC SPARK | 8.9% | 27.7% | 7.5 | ✅ | ✅ | Leg | (reserve) | 8th |
| 5 | THE LION KING | 7.8% | 25.5% | 20.0 | ✅ | — | — (out) | (reserve) | 10th |
| 2 | SUPREME MASTERMIND | ~4% | ~16% | 9.9 | — | ✅ | Swap-in | 腳 (Leg) | 9th |
| 3 | AMAZING GAZE | ~4% | ~14% | 12.0 | — | — | — | 腳 (Leg) | 3rd |
| 6 | GOOD GOOD | ~3% | ~14% | 12.0 | — | — | — | — | 7th |
| 12 | KINGLY DEMEANOR | ~3% | ~12% | 8.7 | — | ✅ | — (out) | — | 6th |
| 14 | MAZING GRACE | ~2% | ~10% | 25.0 | — | — | — | — | 14th |
| 10 | FORTUNE KINGO | ~2% | ~8% | 25.0 | — | — | — | — | 11th |
| 11 | JOYFUL PROSPERITY | ~2% | ~7% | 40.0 | — | — | — | — | 12th |
| 13 | MANAGEMENT FOLKS | ~1% | ~5% | 50.0 | — | — | — | — | 5th |

## Race 2

- **Banker**: #2 **MR COOL** — MC Place **64.6%**.
- **Swaps**: none.
- **Final legs**: #7, #14, #3, #1, #12 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 3-7-2 | Trio **$361** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 2 | MR COOL | 32.0% | 64.6% | 11.0 | ✅ | — | Banker | ★ 膽 (Banker) | 3rd |
| 7 | CALIFORNIA BAY | 15.9% | 43.8% | 3.3 | ✅ | ✅ | Leg | 腳 (Leg) | 2nd |
| 14 | WIN SPEED | 10.9% | 34.8% | 11.0 | ✅ | — | Leg | 腳 (Leg) | 11th |
| 3 | CHILL PARTNERS | 10.5% | 34.4% | 9.2 | ✅ | ✅ | Leg | 腳 (Leg) | 1st |
| 1 | THE ABSOLUTE | 7.7% | 26.8% | 6.1 | ✅ | ✅ | Leg | 腳 (Leg) | 9th |
| 12 | GASTRONOMIQUE | 7.4% | 26.0% | 8.5 | ✅ | ✅ | Leg | 腳 (Leg) | 4th |
| 4 | SHOOTING TO TOP | ~2% | ~8% | 10.0 | — | — | — | — | 7th |
| 10 | WINNING CHAMPION | ~2% | ~8% | 15.0 | — | — | — | — | 6th |
| 11 | DECISION LINK | ~2% | ~8% | 12.0 | — | — | — | — | 8th |
| 13 | FIGHT TIME | ~2% | ~8% | 24.0 | — | — | — | — | 5th |
| 8 | FIGHTING MACHINE | ~2% | ~6% | 29.0 | — | — | — | — | 10th |
| 5 | REGROWTH WINNER | ~1% | ~3% | 94.0 | — | — | — | — | 13th |
| 6 | WHOWROTETHATSONG | ~1% | ~3% | 70.0 | — | — | — | — | 12th |
| 9 | MAGIC SUPER | ~1% | ~3% | 76.0 | — | — | — | — | 14th |

## Race 3

- **Banker**: #8 **CIRCUIT FIERY** — MC Place **59.2%**.
- **Swaps**: none.
- **Final legs**: #2, #10, #1, #6 (**N = 4**) → C(4,2) = **6** → **Stake $60**.
- **Result**: 8-14-2 | Trio **$530** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 8 | CIRCUIT FIERY | 26.1% | 59.2% | 3.0 | ✅ | ✅ | Banker | ★ 膽 (Banker) | 1st |
| 2 | REZEKI | 23.4% | 56.3% | 8.5 | ✅ | ✅ | Leg | 腳 (Leg) | 3rd |
| 10 | SWAGGER BRO | 19.1% | 50.1% | 14.0 | ✅ | — | Leg | 腳 (Leg) | 6th |
| 1 | RYUI KOKOROE | 7.1% | 26.0% | 5.6 | ✅ | ✅ | Leg | 腳 (Leg) | 12th |
| 6 | FRANCIS MEYNELL | 6.7% | 23.6% | 8.8 | ✅ | ✅ | Leg | 腳 (Leg) | 4th |
| 12 | BLAZING BEAM | 3.9% | 16.9% | 18.0 | — | — | — | — | 10th |
| 5 | TYCOON EXPRESS | ~2% | ~8% | 11.0 | — | — | — | — | 5th |
| 11 | AQUAMAN | ~2% | ~8% | 14.0 | — | — | — | — | 7th |
| 9 | MONEY TYCOON | ~1% | ~4% | 41.0 | — | — | — | — | 14th |
| 3 | GAZELEY | — | — | 26.0 | — | — | — | — | 13th |
| 4 | KINGDOM OF RICHES | — | — | 33.0 | — | — | — | — | 8th |
| 7 | MULTISUPERSTAR | — | — | 37.0 | — | — | — | — | 11th |
| 13 | ONE LOVE | — | — | 21.0 | — | — | — | — | 9th |
| 14 | THE ALL ROUNDER | — | — | 30.0 | — | — | — | — | 2nd |

## Race 4

- **Banker**: #3 **GOLD PATCH** — MC Place **59.3%**.
- **Swaps**: none.
- **Final legs**: #8, #2, #14, #11, #4 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 11-1-3 | Trio **$1** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 3 | GOLD PATCH | 25.9% | 59.3% | 2.4 | ✅ | ✅ | Banker | 腳 (Leg) | 3rd |
| 8 | GLACIATED | 25.4% | 59.2% | 8.5 | ✅ | ✅ | Leg | ★ 膽 (Banker) | 12th |
| 2 | FIND MY LOVE | 12.1% | 38.8% | 9.6 | ✅ | ✅ | Leg | 腳 (Leg) | 8th |
| 14 | ALWAYS FLUKE | 11.9% | 38.7% | 14.0 | ✅ | — | Leg | 腳 (Leg) | 6th |
| 11 | WARRIORS DREAM | 7.2% | 26.0% | 7.8 | ✅ | ✅ | Leg | 腳 (Leg) | 1st |
| 4 | MOTOR | 5.6% | 22.1% | 20.0 | ✅ | — | Leg | 腳 (Leg) | 11th |
| 10 | VICTORY CHAMPION | ~5% | ~20% | 11.0 | — | — | — | — | 9th |
| 1 | ALSONSO | ~2% | ~8% | 16.0 | — | — | — | — | 2nd |
| 6 | DAILY ACCLAIM | ~1% | ~5% | 18.0 | — | — | — | — | 4th |
| 9 | PRECISION HOPE | ~1% | ~5% | 40.0 | — | — | — | — | 5th |
| 5 | BEST FARM | — | — | 34.0 | — | — | — | — | 7th |
| 7 | RISING FROM EAST | — | — | 41.0 | — | — | — | — | 14th |
| 12 | YOUNG LEGACY | — | — | 33.0 | — | — | — | — | 13th |
| 13 | SUPER MASTERMIND | — | — | 56.0 | — | — | — | — | 10th |

## Race 5

- **Banker**: #3 **ISLAND BUDDY** — MC Place **52.9%**.
- **Swap**: out **#12** (INVICTUS DRAGON) → in **#11** (ALABAMA SONG, Win **6.6**).
- **Final legs**: #6, #13, #4, #5, #11 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 6-4-12 | Trio **$210** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 3 | ISLAND BUDDY | 22.4% | 52.9% | 12.0 | ✅ | — | Banker | ★ 膽 (Banker) | 4th |
| 6 | CONRAD PATCH | 15.2% | 42.1% | 5.1 | ✅ | ✅ | Leg | 腳 (Leg) | 1st |
| 13 | ACE | 15.1% | 41.2% | 25.0 | ✅ | — | Leg | 腳 (Leg) | 8th |
| 4 | HAPPY SHOOTER | 11.8% | 37.0% | 3.8 | ✅ | ✅ | Leg | 腳 (Leg) | 2nd |
| 5 | VOYAGE BOSS | 11.8% | 36.2% | 8.6 | ✅ | ✅ | Leg | 腳 (Leg) | 7th |
| 12 | INVICTUS DRAGON | 7.4% | 24.5% | 7.4 | ✅ | ✅ | — (out) | 腳 (Leg) | 3rd |
| 11 | ALABAMA SONG | ~3% | ~12% | 6.6 | — | ✅ | Swap-in | — | 10th |
| 8 | RELENTLESS PURSUIT | ~2% | ~7% | 10.0 | — | — | — | — | 6th |
| 1 | REAL GENTLEMAN | — | — | — | — | — | — | — | 13th |
| 2 | JOY CAPITAL | — | — | — | — | — | — | — | 9th |
| 7 | HEALTHY PONY | — | — | — | — | — | — | — | 14th |
| 9 | MAJESTIC LIFE | — | — | — | — | — | — | — | 11th |
| 10 | MY TRIUMPH | — | — | — | — | — | — | — | 12th |
| 14 | GOOD FORTUNE | — | — | — | — | — | — | — | 5th |

## Race 6

- **Banker**: #3 **GALACTIC VOYAGE** — MC Place **54.6%**.
- **Swaps**: none.
- **Final legs**: #6, #1, #4, #2, #10 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 3-2-4 | Trio **$197** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 3 | GALACTIC VOYAGE | 23.2% | 54.6% | 4.4 | ✅ | ✅ | Banker | 腳 (Leg) | 1st |
| 6 | PERFECTDAY | 16.8% | 45.3% | 5.4 | ✅ | ✅ | Leg | ★ 膽 (Banker) | 5th |
| 1 | CELESTIAL HERO | 15.7% | 44.5% | 6.1 | ✅ | ✅ | Leg | 腳 (Leg) | 4th |
| 4 | SIGHT HERMOSO | 12.6% | 40.1% | 8.2 | ✅ | ✅ | Leg | 腳 (Leg) | 3rd |
| 2 | MICKLEY | 12.8% | 39.2% | 4.5 | ✅ | ✅ | Leg | 腳 (Leg) | 2nd |
| 10 | ONE MORE | 10.7% | 34.9% | 8.2 | ✅ | ✅ | Leg | 腳 (Leg) | 9th |
| 5 | WONDERSTAR | — | — | 18.0 | — | — | — | — | 6th |
| 7 | CHEAHA | — | — | 30.0 | — | — | — | — | 7th |
| 8 | JOLTIN | — | — | 28.0 | — | — | — | — | 10th |
| 9 | LUCKY DOCTOR | — | — | 36.0 | — | — | — | — | 8th |
| 11 | ORIGIN OF FORM | — | — | 38.0 | — | — | — | — | 11th |

## Race 7

- **Banker**: #6 **WINNING WING** — MC Place **83.3%**.
- **Swaps**: none.
- **Final legs**: #1, #2, #4, #3, #5 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 1-5-6 | Trio **$296** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 6 | WINNING WING | 40.9% | 83.3% | 15.0 | ✅ | — | Banker | ★ 膽 (Banker 1) | 3rd |
| 1 | ROMANTIC WARRIOR | 31.1% | 76.7% | 1.0 | ✅ | ✅ | Leg | ★ 膽 (Banker 2) | 1st |
| 2 | VOYAGE BUBBLE | 12.5% | 52.5% | 14.0 | ✅ | — | Leg | 腳 (Leg) | 5th |
| 4 | MY WISH | 8.2% | 41.3% | 28.0 | ✅ | — | Leg | 腳 (Leg) | 4th |
| 3 | BEAUTY JOY | 4.0% | 24.6% | 64.0 | ✅ | — | Leg | 腳 (Leg) | 6th |
| 5 | ENSUED | 3.2% | 21.5% | 55.0 | ✅ | — | Leg | 腳 (Leg) | 2nd |

## Race 8

- **Banker**: #9 **WUKONG JEWELLERY** — MC Place **53.1%**.
- **Swaps**: none.
- **Final legs**: #4, #6, #11, #10, #3 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 3-4-2 | Trio **$715** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 9 | WUKONG JEWELLERY | 21.0% | 53.1% | 19.0 | ✅ | — | Banker | 腳 (Leg) | 5th |
| 4 | RISING FORCE | 20.5% | 52.4% | 1.8 | ✅ | ✅ | Leg | 腳 (Leg) | 2nd |
| 6 | AURIO | 17.1% | 47.1% | 1.0 | ✅ | ✅ | Leg | ★ 膽 (Banker) | 4th |
| 11 | SUPERB KING | 12.2% | 37.2% | 16.0 | ✅ | — | Leg | 腳 (Leg) | 8th |
| 10 | ARMOUR WAR EAGLE | 11.0% | 37.0% | 8.1 | ✅ | ✅ | Leg | 腳 (Leg) | 6th |
| 3 | PAKISTAN LEGACY | 7.8% | 28.3% | 16.0 | ✅ | — | Leg | 腳 (Leg) | 1st |
| 1 | LUCY IN THE SKY | — | — | 9.9 | — | ✅ | — | — | 9th |
| 2 | GENEVA | — | — | 8.9 | — | ✅ | — | — | 3rd |
| 5 | HOTT SHOTT | — | — | 43.0 | — | — | — | — | 10th |
| 7 | ANODE | — | — | 18.0 | — | — | — | — | 7th |
| 8 | IRON SECURITY | — | — | 25.0 | — | — | — | — | 11th |

## Race 9

- **Banker**: #2 **NUMBERS** — MC Place **48.3%**.
- **Swaps**: none.
- **Final legs**: #3, #1, #6, #4, #11 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 14-4-7 | Trio **$5** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 2 | NUMBERS | 21.4% | 48.3% | 4.5 | ✅ | ✅ | Banker | ★ 膽 (Banker) | 4th |
| 3 | SAGACIOUS LIFE | 10.2% | 29.5% | 9.5 | ✅ | ✅ | Leg | 腳 (Leg) | 14th |
| 1 | LITTLE PARADISE | 9.7% | 29.1% | 1.8 | ✅ | ✅ | Leg | 腳 (Leg) | 8th |
| 6 | BEAUTY BOLT | 9.6% | 28.0% | 9.1 | ✅ | ✅ | Leg | 腳 (Leg) | 7th |
| 4 | INVINCIBLE IBIS | 7.8% | 24.6% | 9.5 | ✅ | ✅ | Leg | 腳 (Leg) | 2nd |
| 11 | DAZZLING FIT | 7.9% | 24.1% | 24.0 | ✅ | — | Leg | 腳 (Leg) | 5th |
| 12 | LUCKY SAM GOR | est ~6% | est ~21% | 12.0 | — | — | — | 腳 (Leg) | 13th |
| 5 | INFINITE RESOLVE | — | — | 21.0 | — | — | — | — | 9th |
| 7 | PATCH OF COSMO | — | — | 30.0 | — | — | — | — | 3rd |
| 8 | AKASHVANI | — | — | 36.0 | — | — | — | — | 11th |
| 9 | CIRCUIT GRAND SLAM | — | — | 45.0 | — | — | — | — | 12th |
| 10 | WINDLORD | — | — | 63.0 | — | — | — | — | 10th |
| 13 | POPE CODY | — | — | 28.0 | — | — | — | — | 6th |
| 14 | STORMY GROVE | — | — | 28.0 | — | — | — | — | 1st |

## Race 10

- **Banker**: #1 **GENTLEMEN LEGACY** — MC Place **46.0%**.
- **Swap**: out **#12** (THE AUSPICIOUS) → in **#5** (AERODYNAMICS, Win **8.8**).
- **Final legs**: #3, #10, #14, #11, #5 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 1-11-10 | Trio **$2** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 1 | GENTLEMEN LEGACY | 18.5% | 46.0% | 12.0 | ✅ | — | Banker | ★ 膽 (Banker) | 1st |
| 3 | LIVEANDLETLIVE | 18.9% | 45.5% | 1.9 | ✅ | ✅ | Leg | 腳 (Leg) | 12th |
| 10 | MONEY CATCHER | 12.8% | 35.1% | 14.0 | ✅ | — | Leg | 腳 (Leg) | 3rd |
| 14 | AGENDA | 8.5% | 26.8% | 9.7 | ✅ | ✅ | Leg | 腳 (Leg) | 9th |
| 11 | FORTUNE BOY | 8.1% | 25.9% | 11.0 | ✅ | — | Leg | 腳 (Leg) | 2nd |
| 12 | THE AUSPICIOUS | 6.8% | 22.7% | 8.8 | ✅ | ✅ | — (out) | 腳 (Leg) | 5th |
| 5 | AERODYNAMICS | est ~4.5% | est ~17% | 8.8 | — | ✅ | Swap-in | 腳 (Leg) | 4th |
| 2 | KARMA | — | — | 7.3 | — | ✅ | — | — | 8th |
| 4 | SHANWAH | — | — | 33.0 | — | — | — | — | 14th |
| 6 | NOISY BOY | — | — | 21.0 | — | — | — | — | 10th |
| 7 | BRAVEHEARTS | — | — | 23.0 | — | — | — | — | 11th |
| 8 | DREAMING TOGETHER | — | — | 18.0 | — | — | — | — | 13th |
| 9 | SKY VINO | — | — | 18.0 | — | — | — | — | 7th |
| 13 | PACKING FIGHTER | — | — | 20.0 | — | — | — | — | 6th |

## Race 11

- **Banker**: #9 **EMBLAZON** — MC Place **63.2%**.
- **Swaps**: none.
- **Final legs**: #3, #10, #7, #2, #1 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 9-10-4 | Trio **$198** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds < 10 | picked | role | Finished |
|---|-------|------|--------|------|------------|------------|--------|------|----------|
| 9 | EMBLAZON | 29.3% | 63.2% | 1.4 | ✅ | ✅ | Banker | ★ 膽 (Banker) | 1st |
| 3 | NEW FOREST | 21.5% | 53.7% | 24.0 | ✅ | — | Leg | 腳 (Leg) | 11th |
| 10 | JUNEAU PRIDE | 12.7% | 39.1% | 4.6 | ✅ | ✅ | Leg | 腳 (Leg) | 2nd |
| 7 | GUSTOSISIMO | 9.3% | 33.6% | 6.8 | ✅ | ✅ | Leg | 腳 (Leg) | 4th |
| 2 | BEAUTY ETERNAL | 8.3% | 29.6% | 13.0 | ✅ | — | Leg | 腳 (Leg) | 8th |
| 1 | HEALTHY HAPPY | 8.1% | 29.3% | 17.0 | ✅ | — | Leg | 腳 (Leg) | 7th |
| 4 | MUGEN | est ~3% | est ~12% | 11.0 | — | — | — | 腳 (Leg) | 3rd |
| 5 | LADY'S CHOICE | — | — | 19.0 | — | — | — | — | 9th |
| 6 | SON PAK FU | — | — | 21.0 | — | — | — | — | 6th |
| 8 | ALL OUT FOR SIX | — | — | 10.0 | — | — | — | — | 5th |
| 12 | MR ASCENDENCY | — | — | 18.0 | — | — | — | — | 10th |

---

## Meeting summary

| Metric | Value |
|--------|-------|
| Races parsed | **11** / 11 |
| Hits | **4** / 11 |
| Total stake | **$1060** |
| Return (hits) | **$856** |
| Net | **$-204** |
