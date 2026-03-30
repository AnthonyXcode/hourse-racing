# Trio strategy review — MC Place% + replacement rule | Sha Tin | 2026-02-19

**Rule (retrospective)**

- **Banker**: **MC Place% leader** (highest raw **MC Place%** in the MC table).
- **Legs (base)**: all other runners with **MC Place% > 20%** (excluding banker), ordered high → low by Place%.
- **Replacement**: each runner with **Win odds < 10** and **MC Place% < 20%** **replaces the current lowest-Place% leg**. Process in **ascending odds** order. **Odds = 10** does **not** qualify.
- **Reference bet**: 膽拖 1 banker + N legs → **C(N,2)** × **$10**; **hit** if top 3 ⊆ {banker} ∪ {legs}.

**Odds source**: **Win** column from **`HKJC LIVE ODDS`** or **`SCMP ODDS TABLE` / `SCMP KEY ODDS`** (first block before MC narrative), not blended ranking rows.

**Inputs**: `data/reports/trio_strategy_20260219_ST_R*.md`, `data/historical/results_20260219_ST.json`

---

## Race 1

- **Banker**: #6 **YEE CHEONG RAIDER** — MC Place **43.5%**.
- **Swaps**: none.
- **Final legs**: #2, #12, #8, #9, #5 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 2-8-12 | Trio **$667** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 2 | COME FAST FAY FAY | 13.1% | 35.7% | 6.8 | ✅ | ✅ | ✅ leg | 1st |
| 5 | NOBLE DELUXE | 8.4% | 26.2% | 8.4 | ✅ | ✅ | ✅ leg | 13th |
| 6 | YEE CHEONG RAIDER | 17.7% | 43.5% | 9.1 | ✅ | ✅ | Banker | 4th |
| 8 | MAJESTIC DELIGHT | 10.3% | 29.5% | 5.1 | ✅ | ✅ | ✅ leg | 2nd |
| 9 | RUN YES RUN | 8.0% | 26.5% | 15.0 | ✅ | — | ✅ leg | 14th |
| 12 | HE WAS ME | 12.4% | 35.0% | 20.0 | ✅ | — | ✅ leg | 3rd |

## Race 2

- **Banker**: #1 **HAYDAY** — MC Place **50.1%**.
- **Swaps**: none.
- **Final legs**: #9, #2, #3, #5, #12 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 6-9-14 | Trio **$479** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | HAYDAY | 21.8% | 50.1% | 11.0 | ✅ | — | Banker | 5th |
| 2 | YEE CHEONG GLORY | 10.9% | 30.9% | 12.0 | ✅ | — | ✅ leg | 4th |
| 3 | FREE PONY | 9.8% | 30.6% | 18.0 | ✅ | — | ✅ leg | 7th |
| 5 | NEVER SETTLE | 9.0% | 27.7% | 7.1 | ✅ | ✅ | ✅ leg | 11th |
| 9 | PRESTIGE HALL | 15.6% | 40.5% | 2.4 | ✅ | ✅ | ✅ leg | 2nd |
| 12 | WATCH THIS ONE | 6.9% | 23.9% | 15.0 | ✅ | — | ✅ leg | 8th |

## Race 3

- **Banker**: #10 **FLYING BOOM** — MC Place **35.3%**.
- **Swaps**: none.
- **Final legs**: #12, #14, #11, #1, #9 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 10-6-13 | Trio **$1** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | BUCEPHALAS | 10.4% | 30.1% | 16.0 | ✅ | — | ✅ leg | 12th |
| 9 | TIME TO FIRE | 9.0% | 26.8% | 7.8 | ✅ | ✅ | ✅ leg | 8th |
| 10 | FLYING BOOM | 13.0% | 35.3% | 8.9 | ✅ | ✅ | Banker | 1st |
| 11 | PING HAI COMET | 11.1% | 30.4% | 22.0 | ✅ | — | ✅ leg | 9th |
| 12 | GLORIASTAR | 10.9% | 30.8% | 16.0 | ✅ | — | ✅ leg | 13th |
| 14 | DASHING MAURISON | 10.8% | 30.5% | 5.7 | ✅ | ✅ | ✅ leg | 6th |

## Race 4

- **Banker**: #6 **GOOD LUCK HAPPY** — MC Place **65.3%**.
- **Swaps**: none.
- **Final legs**: #1, #14, #4, #12, #5 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 7-1-9 | Trio **$3** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | ELITE GOLF | 15.8% | 44.4% | 17.0 | ✅ | — | ✅ leg | 2nd |
| 4 | MASTER PHOENIX | 9.1% | 31.1% | 7.8 | ✅ | ✅ | ✅ leg | 9th |
| 5 | SUPERB BOY | 5.3% | 20.6% | 18.0 | ✅ | — | ✅ leg | 14th |
| 6 | GOOD LUCK HAPPY | 33.7% | 65.3% | 2.8 | ✅ | ✅ | Banker | 13th |
| 12 | KIAMA | 7.1% | 26.6% | 11.0 | ✅ | — | ✅ leg | 7th |
| 14 | BETTER AND BETTER | 11.1% | 34.7% | 7.0 | ✅ | ✅ | ✅ leg | 4th |

## Race 5

- **Banker**: #1 **CROSSBORDERDUDE** — MC Place **61.0%**.
- **Swaps**: none.
- **Final legs**: #3, #9, #11, #14, #10 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 3-1-14 | Trio **$133** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | CROSSBORDERDUDE | 27.8% | 61.0% | 2.8 | ✅ | ✅ | Banker | 2nd |
| 3 | CIRCUIT CHAMPION | 26.9% | 60.9% | 3.2 | ✅ | ✅ | ✅ leg | 1st |
| 9 | LAKESHORE HERO | 8.9% | 30.6% | 40.0 | ✅ | — | ✅ leg | 8th |
| 10 | SUNNY Q | 5.8% | 23.1% | 28.0 | ✅ | — | ✅ leg | 9th |
| 11 | THUNDER PRINCE | 8.7% | 30.1% | 10.0 | ✅ | — | ✅ leg | 5th |
| 14 | RIDING HIGH | 8.6% | 30.0% | 19.0 | ✅ | — | ✅ leg | 3rd |

## Race 6

- **Banker**: #6 **SOLEIL FIGHTER** — MC Place **65.5%**.
- **Swaps**: none.
- **Final legs**: #10, #11, #9, #1 (**N = 4**) → C(4,2) = **6** → **Stake $60**.
- **Result**: 10-11-9 | Trio **$210** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | ENCOUNTERED | 8.0% | 31.0% | 9.0 | ✅ | ✅ | ✅ leg | 8th |
| 3 | BEAUTY ETERNAL | 3.9% | 18.0% | 10.0 | — | — | — | 5th |
| 6 | SOLEIL FIGHTER | 29.0% | 65.5% | 5.9 | ✅ | ✅ | Banker | 6th |
| 9 | REGAL GEM | 14.5% | 46.1% | 13.0 | ✅ | — | ✅ leg | 3rd |
| 10 | STUNNING PEACH | 21.7% | 56.1% | 6.1 | ✅ | ✅ | ✅ leg | 1st |
| 11 | TOP DRAGON | 16.4% | 50.4% | 2.6 | ✅ | ✅ | ✅ leg | 2nd |

## Race 7

- **Banker**: #1 **GALLANT EPOCH** — MC Place **52.4%**.
- **Swaps**: none.
- **Final legs**: #4, #9, #10, #12, #8 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 4-11-1 | Trio **$420** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | GALLANT EPOCH | 23.6% | 52.4% | 6.1 | ✅ | ✅ | Banker | 3rd |
| 4 | AEROINVINCIBLE | 18.9% | 46.8% | 3.6 | ✅ | ✅ | ✅ leg | 1st |
| 8 | BROWNNEEDSFURTHER | 7.5% | 24.1% | 22.0 | ✅ | — | ✅ leg | 11th |
| 9 | LUCKY MCQUEEN | 8.8% | 28.1% | 9.2 | ✅ | ✅ | ✅ leg | 4th |
| 10 | AMAZING FUN | 7.5% | 24.5% | 10.0 | ✅ | — | ✅ leg | 14th |
| 12 | GOLDEN LUCK | 7.4% | 24.4% | 17.0 | ✅ | — | ✅ leg | 5th |

## Race 8

- **Banker**: #1 **HAPPY INDEX** — MC Place **56.2%**.
- **Swaps**: none.
- **Final legs**: #8, #7, #5, #4, #2 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 14-1-9 | Trio **$436** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | HAPPY INDEX | 25.5% | 56.2% | 2.5 | ✅ | ✅ | Banker | 2nd |
| 2 | JUMBO TREASURE | 5.5% | 20.1% | 25.0 | ✅ | — | ✅ leg | 4th |
| 4 | THE UNIQUE STAR | 9.7% | 30.6% | 6.3 | ✅ | ✅ | ✅ leg | 7th |
| 5 | TOGETHER WE VALUE | 10.4% | 32.1% | 15.0 | ✅ | — | ✅ leg | 8th |
| 7 | VULCANUS | 12.9% | 36.4% | — | ✅ | — | ✅ leg | 6th |
| 8 | FIT FOR BEAUTY | 17.8% | 46.3% | 12.0 | ✅ | — | ✅ leg | 9th |

## Race 9

- **Banker**: #8 **LIVEANDLETLIVE** — MC Place **50.5%**.
- **Swaps**: none.
- **Final legs**: #4, #12, #14, #10, #1 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 1-8-14 | Trio **$394** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | GENTLEMEN LEGACY | 8.1% | 25.8% | 9.6 | ✅ | ✅ | ✅ leg | 1st |
| 4 | PRESTIGE GOOD | 15.9% | 42.0% | 9.6 | ✅ | ✅ | ✅ leg | 10th |
| 8 | LIVEANDLETLIVE | 21.6% | 50.5% | 5.1 | ✅ | ✅ | Banker | 2nd |
| 10 | RELIABLE PROFIT | 8.5% | 27.6% | — | ✅ | — | ✅ leg | 6th |
| 12 | THE AUSPICIOUS | 14.5% | 41.2% | 5.7 | ✅ | ✅ | ✅ leg | 7th |
| 14 | ENTHRALLED | 11.9% | 35.4% | 10.0 | ✅ | — | ✅ leg | 3rd |

## Race 10

- **Banker**: #13 **HOT DELIGHT** — MC Place **50.1%**.
- **Swaps**: none.
- **Final legs**:  (**N = 0**) → C(0,2) = **0** → **Stake $0**.
- **Result**: 13-9-5 | Trio **$96** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | HELENE SUPAFEELING | 7.6% | 6.4% | — | — | — | — | 4th |
| 2 | GLOWING PRAISES | 16.1% | 5.7% | — | — | — | — | 5th |
| 5 | THRIVING BROTHERS | 11.2% | 6.4% | — | — | — | — | 3rd |
| 7 | MOUNT EVEREST | 9.0% | 5.0% | — | — | — | — | 9th |
| 9 | ARMOUR WAR EAGLE | 12.9% | 9.8% | — | — | — | — | 2nd |
| 13 | HOT DELIGHT | 33.5% | 50.1% | — | ✅ | — | Banker | 1st |

## Race 11

- **Banker**: #2 **SUPER EXPRESS** — MC Place **28.3%**.
- **Swaps**: none.
- **Final legs**:  (**N = 0**) → C(0,2) = **0** → **Stake $0**.
- **Result**: 6-2-5 | Trio **$908** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 2 | SUPER EXPRESS | 17.1% | 28.3% | — | ✅ | — | Banker | 2nd |
| 4 | AURIO | 15.4% | 13.2% | — | — | — | — | 4th |
| 5 | DO YOUR PART | 14.8% | 8.5% | — | — | — | — | 3rd |
| 11 | RISING PHOENIX | 12.8% | 4.6% | — | — | — | — | 9th |
| 13 | POSITIVE SMILE | 18.5% | 14.1% | — | — | — | — | 6th |

---

## Meeting summary

| Metric | Value |
|--------|-------|
| Races with reports | **11** / 11 |
| Hits | **4** / 11 |
| Total stake | **$860** |
| Return (on hits) | **$1404** |
| Net | **$+544** |
