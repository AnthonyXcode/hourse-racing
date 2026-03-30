# Trio strategy review — MC Place% + replacement rule | Sha Tin | 2026-03-15

**Rule (retrospective)**

- **Banker**: **MC Place% leader** (highest raw **MC Place%** in the MC table).
- **Legs (base)**: all other runners with **MC Place% > 20%** (excluding banker), ordered high → low by Place%.
- **Replacement**: each runner with **Win odds < 10** and **MC Place% < 20%** **replaces the current lowest-Place% leg**. Process in **ascending odds** order. **Odds = 10** does **not** qualify.
- **Reference bet**: 膽拖 1 banker + N legs → **C(N,2)** × **$10**; **hit** if top 3 ⊆ {banker} ∪ {legs}.

**Odds source**: **Win** column from **`HKJC LIVE ODDS`** or **`SCMP ODDS TABLE` / `SCMP KEY ODDS`** (first block before MC narrative), not blended ranking rows.

**Inputs**: `data/reports/trio_strategy_20260315_ST_R*.md`, `data/historical/results_20260315_ST.json`

---

## Race 1

- **Banker**: #2 **COURIER MAGIC** — MC Place **50.6%**.
- **Swap**: out **#11** (BRILLIANT FIRE) → in **#1** (CELESTIAL HARMONY, Win **5.2**).
- **Final legs**: #6, #5, #12, #7, #13, #9, #1 (**N = 7**) → C(7,2) = **21** → **Stake $210**.
- **Result**: 13-9-14 | Trio **$2479** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | CELESTIAL HARMONY | 4.9% | 17.6% | 5.2 | — | ✅ | ✅ swap-in | 6th |
| 2 | COURIER MAGIC | 22.9% | 50.6% | 7.4 | ✅ | ✅ | Banker | 7th |
| 3 | MAGIC COSMOS | 0.0% | 0.3% | — | — | — | — | 12th |
| 4 | SPEEDY TRIDENT | 3.9% | 14.7% | 22.0 | — | — | — | 9th |
| 5 | PERFECT PEACH | 13.0% | 36.6% | 21.0 | ✅ | — | ✅ leg | 10th |
| 6 | WISEMAN | 15.7% | 41.1% | 14.0 | ✅ | — | ✅ leg | 14th |
| 7 | FAMILY FORTUNE | 7.0% | 23.6% | 13.0 | ✅ | — | ✅ leg | 5th |
| 8 | ATOMIC BEAUTY | 3.2% | 13.4% | 19.0 | — | — | — | 11th |
| 9 | MEEPMEEP | 6.1% | 20.9% | 5.0 | ✅ | ✅ | ✅ leg | 2nd |
| 10 | SMART BEAUTY | 1.5% | 6.6% | 34.0 | — | — | — | 8th |
| 11 | BRILLIANT FIRE | 5.8% | 20.3% | — | ✅ | — | — | 13th |
| 12 | PHANTOM CYCLONE | 7.8% | 24.4% | 4.6 | ✅ | ✅ | ✅ leg | 4th |
| 13 | GO GO GO | 7.0% | 23.5% | 14.0 | ✅ | — | ✅ leg | 1st |
| 14 | ALL EYES ON ME | 1.3% | 6.2% | — | — | — | — | 3rd |

## Race 2

- **Banker**: #8 **YEE CHEONG RAIDER** — MC Place **58.7%**.
- **Swaps**: none.
- **Final legs**: #9, #5, #3, #4 (**N = 4**) → C(4,2) = **6** → **Stake $60**.
- **Result**: 9-8-3 | Trio **$168** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | WINNING CIGAR | 2.8% | 13.2% | — | — | — | — | 11th |
| 2 | BASIC INSTINCT | 1.2% | 6.0% | — | — | — | — | 8th |
| 3 | DASH | 9.4% | 32.8% | — | ✅ | — | ✅ leg | 3rd |
| 4 | SPARKLE AND GOLD | 8.4% | 29.8% | — | ✅ | — | ✅ leg | 10th |
| 5 | REWARDING TWINKLE | 20.3% | 53.2% | 8.0 | ✅ | ✅ | ✅ leg | 6th |
| 6 | CIRCUIT VICTORY | 4.4% | 18.9% | 17.0 | — | — | — | 5th |
| 7 | TRIUMPHANT WARRIOR | 0.0% | 0.4% | 10.0 | — | — | — | 4th |
| 8 | YEE CHEONG RAIDER | 25.2% | 58.7% | 4.5 | ✅ | ✅ | Banker | 2nd |
| 9 | MAJESTIC DELIGHT | 21.6% | 54.2% | 3.9 | ✅ | ✅ | ✅ leg | 1st |
| 10 | MULTIDUTCH | 0.9% | 5.6% | — | — | — | — | 12th |
| 11 | VERBIER | 2.5% | 11.5% | 12.0 | — | — | — | 9th |
| 12 | RICH HORSE | 3.3% | 15.7% | — | — | — | — | 7th |

## Race 3

- **Banker**: #1 **CROSSBORDERDUDE** — MC Place **72.1%**.
- **Swaps**: none.
- **Final legs**: #8, #2, #5, #12, #7 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 4-9-1 | Trio **$6971** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | CROSSBORDERDUDE | 38.2% | 72.1% | 2.6 | ✅ | ✅ | Banker | 3rd |
| 2 | MASTER PHOENIX | 11.2% | 37.1% | 11.0 | ✅ | — | ✅ leg | 4th |
| 3 | BRILLIANT WINNER | 0.1% | 0.7% | — | — | — | — | 10th |
| 4 | CALL ME SPARKLE | 0.0% | 0.6% | — | — | — | — | 1st |
| 5 | MALPENSA | 11.3% | 36.9% | — | ✅ | — | ✅ leg | 5th |
| 6 | PERFECT TRIUMPH | 0.1% | 0.5% | — | — | — | — | 11th |
| 7 | RUSSET GLOW | 8.9% | 32.7% | 10.0 | ✅ | — | ✅ leg | 8th |
| 8 | SEA CHARIOT | 11.4% | 38.4% | 19.0 | ✅ | — | ✅ leg | 7th |
| 9 | SUPREME VOYAGER | 3.1% | 15.5% | — | — | — | — | 2nd |
| 10 | BULLISH PRIDE | 3.0% | 14.8% | — | — | — | — | 12th |
| 11 | RUBY SAILING | 3.7% | 17.8% | — | — | — | — | 9th |
| 12 | CIRRUS SPEED | 9.0% | 32.9% | — | ✅ | — | ✅ leg | 6th |

## Race 4

- **Banker**: #1 **NYX GLUCK** — MC Place **67.9%**.
- **Swaps**: none.
- **Final legs**: #4, #12, #2, #9, #11, #10 (**N = 6**) → C(6,2) = **15** → **Stake $150**.
- **Result**: 5-12-4 | Trio **$744** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | NYX GLUCK | 31.7% | 67.9% | 10.0 | ✅ | — | Banker | 10th |
| 2 | PHOENIX LIGHT | 9.0% | 32.8% | 10.0 | ✅ | — | ✅ leg | 9th |
| 3 | FLYING SNIPER | 0.1% | 0.6% | — | — | — | — | 7th |
| 4 | HAPPY BRETHREN | 22.3% | 56.5% | 3.5 | ✅ | ✅ | ✅ leg | 3rd |
| 5 | MR INCREDIBLE | 0.0% | 0.5% | — | — | — | — | 1st |
| 6 | TOP MAESTRO | 0.4% | 2.2% | — | — | — | — | 12th |
| 7 | CHATER FLASH | 2.8% | 12.8% | — | — | — | — | 5th |
| 8 | GOLDEN WIN | 1.1% | 6.5% | — | — | — | — | 8th |
| 9 | GET FRIENDLY | 6.6% | 26.9% | — | ✅ | — | ✅ leg | 11th |
| 10 | ALABAMA SONG | 5.7% | 24.5% | — | ✅ | — | ✅ leg | 6th |
| 11 | SO MY FOLKS | 7.2% | 26.8% | — | ✅ | — | ✅ leg | 4th |
| 12 | COME FAST FAY FAY | 13.1% | 41.9% | 13.0 | ✅ | — | ✅ leg | 2nd |

## Race 5

- **Banker**: #12 **YODA'S CHOICE** — MC Place **45.4%**.
- **Swaps**: none.
- **Final legs**: #13, #11, #5, #7, #10, #4 (**N = 6**) → C(6,2) = **15** → **Stake $150**.
- **Result**: 1-5-11 | Trio **$3390** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | NEZHA | 0.7% | 3.7% | — | — | — | — | 1st |
| 2 | SUPER LOVE | 1.2% | 6.3% | — | — | — | — | 14th |
| 3 | ARIEL | 2.3% | 10.3% | 38.0 | — | — | — | 10th |
| 4 | FOREVER FOLKS | 6.5% | 22.1% | — | ✅ | — | ✅ leg | 11th |
| 5 | CALIFORNIA STAR | 14.1% | 40.0% | 4.9 | ✅ | ✅ | ✅ leg | 2nd |
| 6 | NEVER PETER OUT | 1.6% | 7.5% | 11.0 | — | — | — | 5th |
| 7 | HAPPY UNIVERSE | 11.9% | 34.8% | 4.4 | ✅ | ✅ | ✅ leg | 6th |
| 8 | DAILY TROPHY | 0.4% | 2.2% | — | — | — | — | 7th |
| 9 | GOOD GOOD | 2.4% | 11.7% | — | — | — | — | 12th |
| 10 | BULL ATTITUDE | 9.4% | 30.3% | 8.3 | ✅ | ✅ | ✅ leg | 4th |
| 11 | NIGHT PUROSANGUE | 15.4% | 40.8% | — | ✅ | — | ✅ leg | 3rd |
| 12 | YODA'S CHOICE | 17.5% | 45.4% | — | ✅ | — | Banker | 9th |
| 13 | FIREFOOT | 16.5% | 44.9% | 8.7 | ✅ | ✅ | ✅ leg | 8th |
| 14 | PRINCE ALEX | 0.0% | 0.0% | — | — | — | — | 13th |

## Race 6

- **Banker**: #8 **MUST GO** — MC Place **52.5%**.
- **Swaps**: none.
- **Final legs**: #2, #5, #12, #1, #7, #6, #10 (**N = 7**) → C(7,2) = **21** → **Stake $210**.
- **Result**: 3-10-2 | Trio **$2099** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | YOUTHFUL SPIRITS | 10.5% | 32.2% | — | ✅ | — | ✅ leg | 10th |
| 2 | GLOWING PRAISES | 18.0% | 47.0% | 15.0 | ✅ | — | ✅ leg | 3rd |
| 3 | WE ARE HERO | 3.3% | 14.9% | — | — | — | — | 1st |
| 4 | WHIZZ KID | 0.4% | 2.3% | — | — | — | — | 9th |
| 5 | THE UNIQUE STAR | 9.7% | 32.9% | 6.0 | ✅ | ✅ | ✅ leg | 8th |
| 6 | TOGETHER WE VALUE | 8.6% | 28.6% | — | ✅ | — | ✅ leg | 7th |
| 7 | FAST RESPONDER | 10.1% | 31.3% | — | ✅ | — | ✅ leg | 4th |
| 8 | MUST GO | 23.5% | 52.5% | 28.0 | ✅ | — | Banker | 13th |
| 9 | TACTICAL ACE | 0.1% | 0.3% | — | — | — | — | 11th |
| 10 | TURQUOISE VELOCITY | 5.0% | 20.4% | 3.2 | ✅ | ✅ | ✅ leg | 1st |
| 11 | GIANT SPIRIT | 0.3% | 1.8% | — | — | — | — | 12th |
| 12 | LOOKING BRIGHT | 10.2% | 32.7% | 5.9 | ✅ | ✅ | ✅ leg | 5th |
| 13 | LUCKY CANDY | 0.5% | 2.8% | — | — | — | — | 6th |

## Race 7

- **Banker**: #2 **PAPAYA BROSE** — MC Place **55.7%**.
- **Swap**: out **#1** (ENDEARED) → in **#4** (LIGHT YEARS GLORY, Win **7.4**).
- **Final legs**: #10, #12, #7, #4 (**N = 4**) → C(4,2) = **6** → **Stake $60**.
- **Result**: 1-12-2 | Trio **$183** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | ENDEARED | 6.9% | 22.5% | 5.9 | ✅ | ✅ | — | 1st |
| 2 | PAPAYA BROSE | 25.5% | 55.7% | 4.2 | ✅ | ✅ | Banker | 3rd |
| 3 | GREY CHARGER | 2.4% | 10.7% | — | — | — | — | 13th |
| 4 | LIGHT YEARS GLORY | 5.5% | 19.9% | 7.4 | — | ✅ | ✅ swap-in | 7th |
| 5 | NOVA KNIGHT | 0.9% | 4.2% | — | — | — | — | 14th |
| 6 | BLOSSOMY | 4.2% | 14.5% | — | — | — | — | 10th |
| 7 | CALIFORNIA BAY | 10.3% | 30.6% | — | ✅ | — | ✅ leg | 5th |
| 8 | KINGDOM OF RICHES | 3.0% | 12.2% | — | — | — | — | 12th |
| 9 | LAKESHORE HERO | 1.8% | 9.1% | — | — | — | — | 8th |
| 10 | THUNDER PRINCE | 15.3% | 40.3% | — | ✅ | — | ✅ leg | 4th |
| 11 | AMAZING FUN | 2.8% | 11.5% | — | — | — | — | 11th |
| 12 | JUST FOLLOW ME | 12.8% | 35.8% | 5.9 | ✅ | ✅ | ✅ leg | 2nd |
| 13 | PROUD BOX | 4.0% | 15.6% | — | — | — | — | 6th |
| 14 | SUPERB GUY | 4.6% | 17.3% | — | — | — | — | 9th |

## Race 8

- **Banker**: #2 **DRAGON AIR FORCE** — MC Place **44.3%**.
- **Swap**: out **#11** (ALLCASH) → in **#1** (TALENTS AMBITION, Win **9.1**).
- **Final legs**: #4, #5, #7, #12, #8, #1 (**N = 6**) → C(6,2) = **15** → **Stake $150**.
- **Result**: 8-7-4 | Trio **$765** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | TALENTS AMBITION | 3.3% | 13.1% | 9.1 | — | ✅ | ✅ swap-in | 4th |
| 2 | DRAGON AIR FORCE | 16.6% | 44.3% | 5.2 | ✅ | ✅ | Banker | 11th |
| 3 | TELECOM FIGHTERS | 0.1% | 0.9% | — | — | — | — | 7th |
| 4 | DEFINITIVE | 17.3% | 44.1% | 14.0 | ✅ | — | ✅ leg | 3rd |
| 5 | SKY VINO | 12.4% | 35.1% | — | ✅ | — | ✅ leg | 6th |
| 6 | SUPER JOY N FUN | 4.5% | 16.4% | 20.0 | — | — | — | 10th |
| 7 | ROMANTIC THOR | 11.5% | 33.6% | 3.2 | ✅ | ✅ | ✅ leg | 2nd |
| 8 | THUNDER BLAZE | 9.3% | 29.4% | — | ✅ | — | ✅ leg | 1st |
| 9 | THRIVING BROTHERS | 2.9% | 12.5% | — | — | — | — | 5th |
| 10 | STURDY RUBY | 4.5% | 16.3% | — | — | — | — | 9th |
| 11 | ALLCASH | 6.3% | 21.1% | 13.0 | ✅ | — | — | 8th |
| 12 | OSI HONOUR | 11.2% | 33.2% | — | ✅ | — | ✅ leg | 12th |

## Race 9

- **Banker**: #9 **AMAZING DUCK** — MC Place **44.0%**.
- **Swap**: out **#2** (RUN RUN SMART) → in **#6** (FLYING KNIGHT, Win **9.2**).
- **Final legs**: #10, #3, #12, #5, #6 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 5-3-13 | Trio **$701** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | EIGHTY LIGHT YEARS | 3.8% | 14.6% | 11.0 | — | — | — | 8th |
| 2 | RUN RUN SMART | 7.4% | 24.9% | 14.0 | ✅ | — | — | 14th |
| 3 | HAPPY BOSS | 14.7% | 38.8% | 5.1 | ✅ | ✅ | ✅ leg | 2nd |
| 4 | LET'S HAVE FUN | 2.1% | 8.2% | 18.0 | — | — | — | 13th |
| 5 | DEVAS TWELVE | 10.0% | 29.8% | 5.5 | ✅ | ✅ | ✅ leg | 1st |
| 6 | FLYING KNIGHT | 4.0% | 15.9% | 9.2 | — | ✅ | ✅ swap-in | 12th |
| 7 | BRIGHT DAY | 4.5% | 16.3% | — | — | — | — | 9th |
| 8 | SMART FIGHTER | 0.0% | 0.1% | — | — | — | — | 11th |
| 9 | AMAZING DUCK | 18.1% | 44.0% | — | ✅ | — | Banker | 5th |
| 10 | BIG RETURN | 14.7% | 39.5% | — | ✅ | — | ✅ leg | 4th |
| 11 | MADE FOR LIFE | 2.2% | 9.2% | 33.0 | — | — | — | 10th |
| 12 | SPECIAL HEDGE | 12.6% | 34.5% | 32.0 | ✅ | — | ✅ leg | 7th |
| 13 | PERIDOT | 3.3% | 13.4% | — | — | — | — | 3rd |
| 14 | THE ALL ROUNDER | 2.7% | 10.8% | — | — | — | — | 6th |

## Race 10

- **Banker**: #4 **SMART GOLF** — MC Place **66.2%**.
- **Swaps**: none.
- **Final legs**: #2, #9, #3, #7, #6 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 4-9-3 | Trio **$122** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | ALL OUT FOR SIX | 0.1% | 1.1% | — | — | — | — | 5th |
| 2 | HELENE SUPAFEELING | 15.6% | 45.0% | 7.9 | ✅ | ✅ | ✅ leg | 6th |
| 3 | RED SEA | 12.1% | 40.8% | 4.3 | ✅ | ✅ | ✅ leg | 3rd |
| 4 | SMART GOLF | 32.5% | 66.2% | 4.8 | ✅ | ✅ | Banker | 1st |
| 5 | ANODE | 4.0% | 17.2% | — | — | — | — | 7th |
| 6 | QUANTUM CLOUD | 6.9% | 26.6% | — | ✅ | — | ✅ leg | 8th |
| 7 | THUNDER KIT | 7.1% | 27.1% | 7.0 | ✅ | ✅ | ✅ leg | 4th |
| 8 | CASA OF HONOR | 2.9% | 14.0% | — | — | — | — | 12th |
| 9 | WUKONG JEWELLERY | 15.7% | 44.6% | — | ✅ | — | ✅ leg | 2nd |
| 10 | CORNERSTONE | 1.4% | 7.0% | — | — | — | — | 9th |
| 11 | E HO HO | 0.5% | 3.3% | — | — | — | — | 11th |
| 12 | LO PAN SPIRIT | 1.3% | 7.2% | — | — | — | — | 10th |

## Race 11

- **Banker**: #1 **RIDING TOGETHER** — MC Place **57.7%**.
- **Swaps**: none.
- **Final legs**: #7, #8, #2, #11, #4 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 7-2-11 | Trio **$182** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | RIDING TOGETHER | 23.5% | 57.7% | — | ✅ | — | Banker | 11th |
| 2 | MIGHTY MASTS | 13.6% | 41.4% | 7.1 | ✅ | ✅ | ✅ leg | 2nd |
| 3 | DO YOU JUST | 1.2% | 6.6% | — | — | — | — | 5th |
| 4 | NEW FUTURE FOLKS | 7.2% | 28.2% | — | ✅ | — | ✅ leg | 9th |
| 5 | SUPER UNICORN | 0.0% | 0.4% | — | — | — | — | 6th |
| 6 | DRAGON ON SNOW | 0.0% | 0.4% | — | — | — | — | 8th |
| 7 | FIT FOR BEAUTY | 19.6% | 53.0% | 5.4 | ✅ | ✅ | ✅ leg | 1st |
| 8 | GHORGAN | 19.9% | 52.2% | 4.5 | ✅ | ✅ | ✅ leg | 7th |
| 9 | KA YING SUPERB | 0.8% | 5.1% | 14.0 | — | — | — | 10th |
| 10 | JOLTIN | 1.0% | 6.1% | — | — | — | — | 12th |
| 11 | PACKING GLORY | 10.9% | 37.0% | — | ✅ | — | ✅ leg | 3rd |
| 12 | NEVER TOO SOON | 2.1% | 11.9% | — | — | — | — | 4th |

---

## Meeting summary

| Metric | Value |
|--------|-------|
| Races with reports | **11** / 11 |
| Hits | **4** / 11 |
| Total stake | **$1390** |
| Return (on hits) | **$1237** |
| Net | **$-153** |
