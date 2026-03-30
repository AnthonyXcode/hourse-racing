# Trio strategy review — MC Place% + replacement rule | Sha Tin | 2026-02-22

**Rule (retrospective)**

- **Banker**: **MC Place% leader** (highest raw **MC Place%** in the MC table).
- **Legs (base)**: all other runners with **MC Place% > 20%** (excluding banker), ordered high → low by Place%.
- **Replacement**: each runner with **Win odds < 10** and **MC Place% < 20%** **replaces the current lowest-Place% leg**. Process in **ascending odds** order. **Odds = 10** does **not** qualify.
- **Reference bet**: 膽拖 1 banker + N legs → **C(N,2)** × **$10**; **hit** if top 3 ⊆ {banker} ∪ {legs}.

**Odds source**: **Win** column from **`HKJC LIVE ODDS`** or **`SCMP ODDS TABLE` / `SCMP KEY ODDS`** (first block before MC narrative), not blended ranking rows.

**Inputs**: `data/reports/trio_strategy_20260222_ST_R*.md`, `data/historical/results_20260222_ST.json`

---

## Race 1

- **Banker**: #1 **MASTER LUCKY** — MC Place **69.0%**.
- **Swap**: out **#11** (LEADING DRAGON) → in **#13** (CONSPIRATOR, Win **8.1**).
- **Final legs**: #6, #3, #4, #13 (**N = 4**) → C(4,2) = **6** → **Stake $60**.
- **Result**: 5-9-3 | Trio **$1** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | MASTER LUCKY | 34.0% | 69.0% | 6.2 | ✅ | ✅ | Banker | 4th |
| 3 | FUN ELITE | 11.7% | 40.4% | 9.1 | ✅ | ✅ | ✅ leg | 3rd |
| 4 | SPICY SPEEDY | 12.0% | 39.9% | 14.0 | ✅ | — | ✅ leg | 10th |
| 6 | HONEST WITNESS | 21.3% | 55.1% | 7.9 | ✅ | ✅ | ✅ leg | 11th |
| 11 | LEADING DRAGON | 8.0% | 30.2% | 19.0 | ✅ | — | — | 5th |
| 13 | CONSPIRATOR | 4.1% | 18.6% | 8.1 | — | ✅ | ✅ swap-in | 13th |

## Race 2

- **Banker**: #1 **EMBRACE ABERDEEN** — MC Place **54.4%**.
- **Swaps**: none.
- **Final legs**: #5, #2, #3, #11, #9 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 1-2-10 | Trio **$804** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | EMBRACE ABERDEEN | 21.3% | 54.4% | 11.0 | ✅ | — | Banker | 1st |
| 2 | THOUSAND SPIRIT | 17.5% | 49.3% | 7.5 | ✅ | ✅ | ✅ leg | 2nd |
| 3 | SEA CHARIOT | 15.3% | 44.0% | 9.4 | ✅ | ✅ | ✅ leg | 8th |
| 5 | GIANT BALLON | 21.2% | 53.7% | 2.6 | ✅ | ✅ | ✅ leg | 5th |
| 9 | STORMY KNIGHT | 5.4% | 22.0% | 11.0 | ✅ | — | ✅ leg | 6th |
| 11 | MONTA FRUTTA | 12.0% | 38.4% | 25.0 | ✅ | — | ✅ leg | 13th |

## Race 3

- **Banker**: #13 **HARRY'S HERO** — MC Place **49.6%**.
- **Swaps**: none.
- **Final legs**: #11, #4, #8, #2, #6 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 11-6-2 | Trio **$149** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 2 | BEAUTY MISSILE | 9.9% | 30.2% | 4.5 | ✅ | ✅ | ✅ leg | 3rd |
| 4 | ON THE LASH | 12.3% | 35.8% | 9.7 | ✅ | ✅ | ✅ leg | 8th |
| 6 | ROMANTIC FANTASY | 7.9% | 26.2% | 6.7 | ✅ | ✅ | ✅ leg | 2nd |
| 8 | FAMILY FORTUNE | 12.4% | 35.0% | 12.0 | ✅ | — | ✅ leg | 7th |
| 11 | COOL BLUE | 15.2% | 40.0% | 4.9 | ✅ | ✅ | ✅ leg | 1st |
| 13 | HARRY'S HERO | 20.6% | 49.6% | 13.0 | ✅ | — | Banker | 6th |

## Race 4

*No `trio_strategy_20260222_ST_R4.md` in repo — skipped.*

## Race 5

- **Banker**: #4 **GALLANT DESIGN** — MC Place **68.8%**.
- **Swaps**: none.
- **Final legs**: #1, #3, #2, #7, #13 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 1-3-11 | Trio **$396** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | SMART GOLF | 20.6% | 54.6% | 3.0 | ✅ | ✅ | ✅ leg | 1st |
| 2 | QUARTZ LEGEND | 6.8% | 26.3% | 16.0 | ✅ | — | ✅ leg | 5th |
| 3 | KING PROFIT | 17.3% | 49.3% | 12.0 | ✅ | — | ✅ leg | 2nd |
| 4 | GALLANT DESIGN | 34.1% | 68.8% | 5.8 | ✅ | ✅ | Banker | 7th |
| 7 | SEA DIAMOND | 5.1% | 22.2% | 14.0 | ✅ | — | ✅ leg | 11th |
| 13 | SAME TO YOU | 5.1% | 22.1% | 14.0 | ✅ | — | ✅ leg | 10th |
| 14 | WORLD HERO | 2.0% | 8.0% | 12.0 | — | — | — | 4th |

## Race 6

- **Banker**: #1 **ALL ROUND WINNER** — MC Place **67.0%**.
- **Swaps**: none.
- **Final legs**: #4, #11, #14, #3, #7 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 4-14-1 | Trio **$124** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | ALL ROUND WINNER | 33.6% | 67.0% | 4.2 | ✅ | ✅ | Banker | 3rd |
| 3 | STAR SATYR | 9.7% | 32.7% | 5.5 | ✅ | ✅ | ✅ leg | 6th |
| 4 | AEROVOLANIC | 16.2% | 46.5% | 5.4 | ✅ | ✅ | ✅ leg | 1st |
| 7 | LUCKY BALERION | 6.1% | 24.8% | 18.0 | ✅ | — | ✅ leg | 9th |
| 11 | SMART FAT CAT | 12.1% | 38.0% | 6.5 | ✅ | ✅ | ✅ leg | 5th |
| 14 | SHOTGUN | 10.9% | 37.2% | 9.8 | ✅ | ✅ | ✅ leg | 2nd |

## Race 7

- **Banker**: #1 **TURIN CHAMPIONS** — MC Place **57.9%**.
- **Swap**: out **#12** (PERIDOT) → in **#8** (TOP PEAK, Win **8.0**).
- **Final legs**: #2, #13, #9, #6, #8 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 3-13-9 | Trio **$2** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | TURIN CHAMPIONS | 28.3% | 57.9% | 3.3 | ✅ | ✅ | Banker | 9th |
| 2 | MABUBU | 11.6% | 33.6% | 10.0 | ✅ | — | ✅ leg | 13th |
| 6 | JOLLY BRILLIANT | 7.6% | 25.5% | 5.4 | ✅ | ✅ | ✅ leg | 6th |
| 8 | TOP PEAK | 7.1% | 18.0% | 8.0 | — | ✅ | ✅ swap-in | 12th |
| 9 | BIG RETURN | 10.0% | 29.3% | 10.0 | ✅ | — | ✅ leg | 3rd |
| 12 | PERIDOT | 6.0% | 20.8% | 16.0 | ✅ | — | — | 11th |
| 13 | YODA'S CHOICE | 11.1% | 33.1% | 36.0 | ✅ | — | ✅ leg | 2nd |

## Race 8

- **Banker**: #1 **KA YING RISING** — MC Place **64.3%**.
- **Swap**: out **#6** (SUNLIGHT POWER) → in **#4** (RED LION, Win **9.7**).
- **Final legs**: #2, #8, #3, #4 (**N = 4**) → C(4,2) = **6** → **Stake $60**.
- **Result**: 1-3-2 | Trio **$30** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | KA YING RISING | 29.0% | 64.3% | 1.0 | ✅ | ✅ | Banker | 1st |
| 2 | LUCKY SWEYNESSE | 21.1% | 54.7% | 4.0 | ✅ | ✅ | ✅ leg | 3rd |
| 3 | HELIOS EXPRESS | 13.9% | 43.6% | 3.9 | ✅ | ✅ | ✅ leg | 2nd |
| 4 | RED LION | 2.5% | 12.0% | 9.7 | — | ✅ | ✅ swap-in | 9th |
| 6 | SUNLIGHT POWER | 6.6% | 25.7% | 13.0 | ✅ | — | — | 7th |
| 7 | COPARTNER PRANCE | 1.8% | 8.0% | 16.0 | — | — | — | 6th |
| 8 | PATCH OF THETA | 16.9% | 49.1% | 9.1 | ✅ | ✅ | ✅ leg | 8th |
| 10 | PACKING HERMOD | 2.0% | 9.0% | 12.0 | — | — | — | 10th |

## Race 9

- **Banker**: #4 **COOL BOY** — MC Place **63.5%**.
- **Swaps**: none.
- **Final legs**: #7, #2, #3, #1, #10 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 4-3-7 | Trio **$117** | **HIT**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | YOUNG EMPEROR | 10.3% | 33.4% | 17.0 | ✅ | — | ✅ leg | 4th |
| 2 | ETERNAL FORTUNE | 13.9% | 42.0% | 11.0 | ✅ | — | ✅ leg | 9th |
| 3 | LIFELINE EXPRESS | 11.2% | 37.8% | 6.4 | ✅ | ✅ | ✅ leg | 2nd |
| 4 | COOL BOY | 28.4% | 63.5% | 3.0 | ✅ | ✅ | Banker | 1st |
| 5 | LADY'S LOVE | 1.5% | 8.0% | 24.0 | — | — | — | 5th |
| 7 | PACKING GLORY | 16.8% | 48.5% | 6.2 | ✅ | ✅ | ✅ leg | 3rd |
| 9 | FUN N FUN TOGETHER | 3.0% | 12.0% | 24.0 | — | — | — | 6th |
| 10 | EVER LUCK | 9.2% | 31.8% | 4.8 | ✅ | ✅ | ✅ leg | 7th |

## Race 10

- **Banker**: #2 **FLYING LUCK** — MC Place **49.3%**.
- **Swaps**: none.
- **Final legs**: #3, #4, #5, #14, #8, #1 (**N = 6**) → C(6,2) = **15** → **Stake $150**.
- **Result**: 9-5-3 | Trio **$6** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | BEAUTY ALLIANCE | 6.0% | 21.0% | 6.6 | ✅ | ✅ | ✅ leg | 7th |
| 2 | FLYING LUCK | 21.4% | 49.3% | 13.0 | ✅ | — | Banker | 13th |
| 3 | LOVERO | 15.3% | 40.0% | 8.6 | ✅ | ✅ | ✅ leg | 3rd |
| 4 | BLAZING WUKONG | 9.9% | 30.9% | 5.7 | ✅ | ✅ | ✅ leg | 12th |
| 5 | THE RED HARE | 10.2% | 30.6% | 7.9 | ✅ | ✅ | ✅ leg | 2nd |
| 6 | WINNING GOLD | 2.0% | 8.0% | 28.0 | — | — | — | 14th |
| 7 | SUPERB KID | 3.0% | 12.0% | 27.0 | — | — | — | 5th |
| 8 | WITHOUT COMPARE | 8.3% | 26.8% | 4.5 | ✅ | ✅ | ✅ leg | 4th |
| 9 | POWER OF VITAM | 2.0% | 8.0% | 28.0 | — | — | — | 1st |
| 10 | SHAMZ | 1.0% | 4.0% | 47.0 | — | — | — | 9th |
| 14 | CHARITY GAIN | 10.5% | 30.5% | 16.0 | ✅ | — | ✅ leg | 11th |

## Race 11

- **Banker**: #1 **SIX PACK** — MC Place **50.8%**.
- **Swaps**: none.
- **Final legs**: #9, #6, #3, #7, #12 (**N = 5**) → C(5,2) = **10** → **Stake $100**.
- **Result**: 9-12-11 | Trio **$778** | **MISS**

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Picked | Finished |
|---|-------|------|--------|------|------------|---------|--------|----------|
| 1 | SIX PACK | 22.1% | 50.8% | 6.7 | ✅ | ✅ | Banker | 4th |
| 2 | SKY HEART | 5.5% | 20.0% | 14.0 | — | — | — | 6th |
| 3 | THE BOOM BOX | 9.8% | 30.3% | 23.0 | ✅ | — | ✅ leg | 8th |
| 5 | BRILLIANT EXPRESS | 6.5% | 20.0% | 9.5 | — | ✅ | — | 7th |
| 6 | KA YING ATTACK | 10.3% | 31.4% | 10.0 | ✅ | — | ✅ leg | 5th |
| 7 | HEAVING | 8.4% | 26.3% | 6.5 | ✅ | ✅ | ✅ leg | 10th |
| 9 | SALON S | 17.1% | 45.0% | 2.8 | ✅ | ✅ | ✅ leg | 1st |
| 11 | HAROLD WIN | 4.5% | 17.0% | 25.0 | — | — | — | 3rd |
| 12 | GHORGAN | 8.6% | 26.2% | 14.0 | ✅ | — | ✅ leg | 2nd |

---

## Meeting summary

| Metric | Value |
|--------|-------|
| Races with reports | **10** / 11 |
| Hits | **4** / 10 |
| Total stake | **$970** |
| Return (on hits) | **$420** |
| Net | **$-550** |
