# Trio backtest — MC Place% rule | Happy Valley | 4 Mar 2026

**Rule tested**

- **Banker**: horse with **highest MC Place%** among runners that have a numeric **MC Place%** in the strategy report (if two tie, take the higher % in the table).
- **Legs**: all other horses with **MC Place% > 20%** OR **HKJC Win odds < 10** (odds column from each `trio_strategy` report’s pool table — `Odds` or `HKJC Win`).
- **Bet**: 膽拖 — 1 banker + N legs → **C(N, 2)** combinations × **$10**.
- **Hit**: the official top-3 finishers ⊆ **{banker} ∪ {legs}** (Trio any order; same interpretation as the Sha Tin 8 Mar note).

**Sources**

- **Results & Trio dividends**: **`data/historical/results_20260304_HV.json`** (Races 1–9).  
  *Note: you referenced `results_20260204_HV.json` — that filename implies **2026-02-04**; these strategy reports are **`20260304`**, so the matching results file is **`results_20260304_HV.json`**. Use Feb 4 results only if you intentionally want a different meeting.*
- **MC Place%**: from `data/reports/trio_strategy_20260304_HV_R1.md` … **R9.md** (HORSE RANKINGS tables with **MC Place%** column).

**Convention (edge cases)**

- **Place% rule**: treat **strictly > 20%** where the report gives an exact number; **`~20%`** is **not** counted as >20% unless **HKJC Win < 10** also applies.
- **Odds rule**: **strictly < 10** (so **10.0** does **not** qualify).

**Per-race table (below)** — same layout as `trio_mc_place_replace_review_*`: **Win% / Place%** = raw **MC** columns from the report’s HORSE RANKINGS table; **Place%>20%** = strict **> 20%** (approx **~20%** is **not** ✅); **odds<10** = strict **< 10**; **Role** = report column (may differ from mechanical banker); **Picked** = **Banker** (max MC Place%) or **✅ leg** under the rule above; **Finished** = official placing.

---

## 1. Race-by-race (R1–R9, all have MC Place% in report)

### R1 — `trio_strategy_20260304_HV_R1.md`

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Role | Picked | Finished |
|---|-------|------|--------|------|------------|---------|------|--------|----------|
| 12 | DRAGON SUNRISE | 18.9% | 46.6% | 6.7 | ✅ | ✅ | ★ 膽 (Banker) | Banker | 6th |
| 4 | HAILTOTHEVICTORS | 15.8% | 40.6% | 8.5 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 8th |
| 2 | ON THE LASH | 10.9% | 32.3% | 23.0 | ✅ | — | 腳 (Leg) | ✅ leg | 5th |
| 7 | SUPER SICARIO | 10.8% | 32.3% | 4.9 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 1st |
| 3 | CONSPIRACY WITNESS | 11.2% | 32.1% | 8.4 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 4th |
| 1 | KASA PAPA | 8.7% | 27.9% | 4.2 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 10th |
| 9 | ALL ARE MINE | ~6.3% | ~20% | 8.4 | — | ✅ | 腳 (Leg) | ✅ leg | 2nd |
| 5 | PERFECT PAIRING | ~5% | ~18% | 17.0 | — | — | (reserve) | — | 3rd |
| 6 | ROSEWOOD FLEETFOOT | — | — | — | — | — | — | — | 9th |
| 8 | SMILING EMPEROR | — | — | — | — | — | — | — | 11th |
| 10 | JOLLY JUMPER | — | — | — | — | — | — | — | 7th |
| 11 | PERPETUAL POWER | — | — | — | — | — | — | — | 12th |

- **Banker**: **#12** DRAGON SUNRISE (46.6%).
- **Legs**: Place% > 20% → **#1, #2, #3, #4, #7**; **#9** via **odds 8.4 < 10** (not via ~20% Place).  
  **Legs**: **#1, #2, #3, #4, #7, #9** → **N = 6** → C(6,2) = **15** · **Stake $150**
- **Actual**: **7-9-5** → **#5** not in pool → **MISS**
- **Trio $1** → **P&L −$150**

### R2 — `trio_strategy_20260304_HV_R2.md`

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Role | Picked | Finished |
|---|-------|------|--------|------|------------|---------|------|--------|----------|
| 6 | ONLY U | 25.0% | 56.8% | 4.1 | ✅ | ✅ | ★ 膽 (Banker) | Banker | 2nd |
| 10 | ORIENTAL SURPRISE | 21.5% | 52.3% | 4.9 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 5th |
| 3 | STERLING WONGCHOY | 12.4% | 37.1% | 8.2 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 4th |
| 2 | CALL TO COMMAND | 9.1% | 28.8% | 9.4 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 3rd |
| 4 | THOUSAND CUPS | 7.0% | 24.8% | 6.0 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 8th |
| 5 | CONCORDE STAR | 7.0% | 24.4% | 10.0 | ✅ | — | 腳 (Leg) | ✅ leg | 7th |
| 1 | POWER SUMMIT | ~5% | ~18% | 16.0 | — | — | (reserve) | — | 10th |
| 7 | RACINGRACE | — | — | 58.0 | — | — | — | — | 9th |
| 8 | NOBLE DELUXE | — | — | 21.0 | — | — | — | — | 12th |
| 9 | CHEER FOR SOUTH | — | — | 21.0 | — | — | — | — | 6th |
| 11 | VERBIER | — | — | 14.0 | — | — | — | — | 1st |
| 12 | SHINE BRIGHT | — | — | 31.0 | — | — | — | — | 11th |

- **Banker**: **#6** ONLY U (56.8%).
- **Legs**: Place% > 20% → **#2, #3, #4, #5, #10** (#5 stays via **24.4% > 20%**, not via odds **= 10**).  
  **N = 5** → C(5,2) = **10** · **Stake $100**
- **Actual**: **11-6-2** → **#11** has **no MC Place%** in the published table and **odds 14** → **MISS**
- **Trio $924** → **P&L −$100**

### R3 — `trio_strategy_20260304_HV_R3.md`

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Role | Picked | Finished |
|---|-------|------|--------|------|------------|---------|------|--------|----------|
| 6 | ACE WAR | 21.1% | 50.0% | 5.5 | ✅ | ✅ | ★ 膽 (Banker) | Banker | 1st |
| 2 | SERANGOON | 17.1% | 44.3% | 8.4 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 7th |
| 1 | YOUNG BRAVO | 14.4% | 40.6% | 9.1 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 11th |
| 11 | STAR BROSE | 10.7% | 33.7% | 4.2 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 2nd |
| 3 | DOUBLE WIN | 10.0% | 31.1% | 9.4 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 3rd |
| 9 | SMART CITY | 8.2% | 26.2% | 8.7 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 4th |
| 4 | SHARPEN BRIGHT | ~5% | ~18% | 10.0 | — | — | 腳 (Leg) | — | 5th |
| 12 | VIVA TASTE | ~4% | ~16% | 14.0 | — | — | (reserve) | — | 10th |
| 5 | SURE JOYFUL | — | — | 37.0 | — | — | — | — | 6th |
| 7 | YIU CHEUNG VICTORY | — | — | 23.0 | — | — | — | — | 8th |
| 8 | PING HAI COMET | — | — | 13.0 | — | — | — | — | 9th |
| 10 | MEGA FORCE | — | — | 25.0 | — | — | — | — | 12th |

- **Banker**: **#6** ACE WAR (**50.0%**).
- **Legs**: Place% > 20% → **#1, #2, #3, #9, #11**; **#4** ~18% excluded; odds **10** not <10.  
  **N = 5** → C(5,2) = **10** · **Stake $100**
- **Actual**: **6-11-3** → all in pool → **HIT**
- **Trio $327** → **P&L +$227**

### R4 — `trio_strategy_20260304_HV_R4.md`

MC Place% max is **#2 GENIUS BABY 45.3%** (above #7 FLASH STAR 44.6%). *Report Role still tags #7 as ★ 膽; mechanical banker here is #2 by raw MC Place%.*

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Role | Picked | Finished |
|---|-------|------|--------|------|------------|---------|------|--------|----------|
| 2 | GENIUS BABY | 16.4% | 45.3% | 7.3 | ✅ | ✅ | 腳 (Leg) | Banker | 2nd |
| 7 | FLASH STAR | 16.8% | 44.6% | 15.0 | ✅ | — | ★ 膽 (Banker) | ✅ leg | 5th |
| 8 | STAR PERFORMER | 13.9% | 40.2% | 8.0 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 9th |
| 12 | GAMEPLAYER ELITE | 14.7% | 39.9% | 4.9 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 1st |
| 4 | SKY CAP | 12.5% | 36.2% | 3.6 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 3rd |
| 3 | HOLMES A COURT | 10.7% | 32.8% | 4.5 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 4th |
| 11 | GIDDY UP | ~4% | ~15% | 17.0 | — | — | (excluded) | — | 7th |
| 1 | TACTICAL VICTORY | — | — | 36.0 | — | — | — | — | 11th |
| 6 | VIVA BOSS | — | — | 34.0 | — | — | — | — | 6th |
| 9 | ETERNAL RICHNESS | — | — | 43.0 | — | — | — | — | 10th |
| 10 | HAPPY ALLIANCE | — | — | 45.0 | — | — | — | — | 8th |

- **Banker**: **#2** GENIUS BABY (45.3%).
- **Legs** (exclude #2): **#3, #4, #7, #8, #12** (all >20% or odds <10 in table).  
  **N = 5** → C(5,2) = **10** · **Stake $100**
- **Actual**: **12-2-4** → all in pool → **HIT**
- **Trio $133** → **P&L +$33**

### R5 — `trio_strategy_20260304_HV_R5.md`

MC Place% peak is **#10 YEE CHEONG SPIRIT 48.3%** (above **#5 GIANT BALLON 44.7%**). *Report tags #5 as ★ 膽; mechanical banker is #10.*

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Role | Picked | Finished |
|---|-------|------|--------|------|------------|---------|------|--------|----------|
| 10 | YEE CHEONG SPIRIT | 20.7% | 48.3% | 24.0 | ✅ | — | 腳 (Leg) | Banker | 12th |
| 5 | GIANT BALLON | 17.3% | 44.7% | 2.6 | ✅ | ✅ | ★ 膽 (Banker) | ✅ leg | 1st |
| 2 | TACTICAL COMMAND | 11.9% | 34.7% | 13.0 | ✅ | — | 腳 (Leg) | ✅ leg | 9th |
| 4 | FORTUNE WHISKEY | 9.9% | 30.8% | 4.8 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 5th |
| 6 | DUKE OF ORANGE | 8.2% | 26.7% | 7.4 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 4th |
| 7 | RISING ELITE | 8.2% | 24.5% | 137.0 | ✅ | — | (excluded) | ✅ leg | 10th |
| 11 | CIRRUS SPEED | ~4% | ~16% | 21.0 | — | — | (reserve) | — | 8th |
| 12 | ENJOY GOLF | ~3% | ~14% | 9.7 | — | ✅ | 腳 (Leg) | ✅ leg | 3rd |
| 1 | GIANT LEAP | ~3% | ~12% | 8.6 | — | ✅ | ⚠️ Reserve | ✅ leg | 2nd |
| 3 | TOP THRONE | — | — | — | — | — | — | — | 7th |
| 8 | HAPPY UNITED | — | — | — | — | — | — | — | 6th |
| 9 | BRAVE WIN | — | — | — | — | — | — | — | 11th |

- **Banker**: **#10** YEE CHEONG SPIRIT (**48.3%**).
- **Legs** (exclude #10): Place% > 20% → **#2, #4, #5, #6**; **#1** (8.6), **#12** (9.7) via **odds < 10**.  
  **N = 6** → C(6,2) = **15** · **Stake $150**
- **Actual**: **5-1-12** → all in pool (**#10** finished last; top 3 are all legs) → **HIT**
- **Trio $393** → **P&L +$243**

### R6 — `trio_strategy_20260304_HV_R6.md`

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Role | Picked | Finished |
|---|-------|------|--------|------|------------|---------|------|--------|----------|
| 2 | SPORTS LEGEND | 25.1% | 58.0% | 3.0 | ✅ | ✅ | ★ 膽 (Banker) | Banker | 9th |
| 7 | FLYING WROTE | 20.5% | 53.7% | 4.9 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 2nd |
| 3 | SYMBOL OF STRENGTH | 17.2% | 48.6% | 5.2 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 1st |
| 8 | EVERSTAR | 10.1% | 33.6% | 23.0 | ✅ | — | 腳 (Leg) | ✅ leg | 10th |
| 9 | TOURBILLON GOLFER | 9.6% | 33.2% | 7.4 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 6th |
| 4 | POWER KOEPP | 8.0% | 29.2% | 22.0 | ✅ | — | 腳 (Leg) | ✅ leg | 3rd |
| 5 | ROMANTIC GLADIATOR | ~3% | ~14% | 11.0 | — | — | (reserve) | — | 4th |
| 1 | HARMONY N BLESSED | ~2.5% | ~12% | 15.0 | — | — | (excluded) | — | 5th |
| 6 | HEY BROS | ~2.5% | ~12% | 10.0 | — | — | (reserve) | — | 8th |
| 10 | FAMILY KNIGHT | ~1% | ~5% | 54.0 | — | — | (excluded) | — | 7th |

- **Banker**: **#2** SPORTS LEGEND (**58.0%**).
- **Legs**: **#3, #4, #7, #8, #9** (all >20% MC Place; banker excluded).  
  **N = 5** → C(5,2) = **10** · **Stake $100**
- **Actual**: **3-7-4** → top 3 ⊆ pool (**#2** banker out of frame but all three placegetters are legs) → **HIT**
- **Trio $524** → **P&L +$424**

### R7 — `trio_strategy_20260304_HV_R7.md`

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Role | Picked | Finished |
|---|-------|------|--------|------|------------|---------|------|--------|----------|
| 1 | RAGGA BOMB | 26.5% | 58.1% | 3.6 | ✅ | ✅ | ★ 膽 (Banker) | Banker | 3rd |
| 9 | TAKE ACTION | 17.8% | 47.6% | 4.7 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 8th |
| 5 | GLORIOUS JOURNEY | 11.7% | 36.6% | 8.0 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 2nd |
| 3 | CALIFORNIA MOXIE | 10.5% | 32.7% | 8.8 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 1st |
| 4 | NOBLE PURSUIT | 8.6% | 27.9% | 7.6 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 9th |
| 7 | TURIN WARRIOR | 6.7% | 23.9% | 21.0 | ✅ | — | 腳 (Leg) | ✅ leg | 4th |
| 8 | NORTHERN BEAST | ~3% | ~13% | 18.0 | — | — | (excluded) | — | 11th |
| 10 | KOLACHI | ~3% | ~12% | 12.0 | — | — | (reserve) | — | 10th |
| 12 | LEGENDARY IMPACT | ~3% | ~12% | 15.0 | — | — | ⚠️ Reserve | — | 7th |
| 2 | AESTHETICISM | — | — | 5.1 | — | — | — | — | 6th |
| 6 | SHANGHAI STYLE | — | — | 5.3 | — | — | — | — | 5th |
| 11 | MASTER OF HUMOR | — | — | 5.7 | — | — | — | — | 12th |

- **Banker**: **#1** RAGGA BOMB (**58.1%**).
- **Legs**: **#3, #4, #5, #7, #9**.  
  **N = 5** → C(5,2) = **10** · **Stake $100**
- **Actual**: **3-5-1** → all in pool → **HIT**
- **Trio $174** → **P&L +$74**

### R8 — `trio_strategy_20260304_HV_R8.md`

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Role | Picked | Finished |
|---|-------|------|--------|------|------------|---------|------|--------|----------|
| 1 | LUCKY PLANET | 25.8% | 59.2% | 5.3 | ✅ | ✅ | ★ 膽 (Banker) | Banker | 6th |
| 9 | AMAZING KID | 21.6% | 53.5% | 9.0 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 1st |
| 3 | PEGAS | 10.6% | 34.3% | 4.4 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 4th |
| 7 | BEAUTY GLORY | 9.4% | 30.1% | 10.0 | ✅ | — | 腳 (Leg) | ✅ leg | 8th |
| 6 | METRO POWER | 8.8% | 29.7% | 17.0 | ✅ | — | 腳 (Leg) | ✅ leg | 2nd |
| 8 | STORMING DRAGON | 8.5% | 29.6% | 3.9 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 3rd |
| 5 | WINGS OF WAR | ~5% | ~20% | 7.7 | — | ✅ | ⚠️ Reserve | ✅ leg | 5th |
| 4 | SPICY GOLD | ~4% | ~17% | 12.0 | — | — | ⚠️ Reserve | — | 10th |
| 2 | MATTERS MOST | ~3% | ~12% | 21.0 | — | — | (excluded) | — | 7th |
| 10 | INVINCIBLE STARR | ~1% | ~5% | 46.0 | — | — | (excluded) | — | 9th |

- **Banker**: **#1** LUCKY PLANET (**59.2%**).
- **Legs**: **#3, #5, #6, #7, #8, #9** (#5 **WINGS OF WAR**: **~20%** Place not counted as >20%, but **7.7 < 10**).  
  **N = 6** → C(6,2) = **15** · **Stake $150**
- **Actual**: **9-6-8** → all in pool → **HIT**
- **Trio $404** → **P&L +$254**

### R9 — `trio_strategy_20260304_HV_R9.md`

| # | Horse | Win% | Place% | Odds | Place%>20% | odds<10 | Role | Picked | Finished |
|---|-------|------|--------|------|------------|---------|------|--------|----------|
| 3 | CORLEONE | 23.0% | 53.8% | 5.0 | ✅ | ✅ | ★ 膽 (Banker) | Banker | 8th |
| 5 | FORTUNATE SON | 16.8% | 45.1% | 26.0 | ✅ | — | 腳 (Leg) | ✅ leg | 11th |
| 1 | SILVERY BREEZE | 13.6% | 38.0% | 4.3 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 4th |
| 11 | WITHALLMYFAITH | 10.8% | 34.0% | 4.4 | ✅ | ✅ | 腳 (Leg) | ✅ leg | 5th |
| 6 | SUPER UNICORN | 11.0% | 33.8% | 25.0 | ✅ | — | 腳 (Leg) | ✅ leg | 3rd |
| 10 | CHILL KAKA | 6.5% | 23.3% | 25.0 | ✅ | — | ⚠️ Reserve | ✅ leg | 7th |
| 4 | VIVA GRACIOUSNESS | ~5% | ~20% | 9.9 | — | ✅ | 腳 (Leg) | ✅ leg | 9th |
| 7 | FIVEFORTWO | ~5% | ~20% | 4.8 | — | ✅ | 腳 (Leg) | ✅ leg | 1st |
| 9 | SAMARKAND | ~3% | ~13% | 21.0 | — | — | (reserve) | — | 2nd |
| 2 | A AMERIC TE SPECSO | ~2% | ~10% | 26.0 | — | — | (excluded) | — | 10th |
| 12 | ANOTHER ZONDA | ~2% | ~10% | 29.0 | — | — | (excluded) | — | 6th |
| 8 | HAPPY TERCENTENARY | ~1% | ~5% | 61.0 | — | — | (excluded) | — | 12th |

- **Banker**: **#3** CORLEONE (**53.8%**).
- **Legs**: **#1, #4, #5, #6, #7, #11** (#**7** / #**4** included via **odds < 10** where Place is **~20%**).  
  **#9** SAMARKAND: **~13%** Place, **odds 21** → **not** a leg.
- **N = 6** → C(6,2) = **15** · **Stake $150**
- **Actual**: **7-9-6** → **#9** not in pool → **MISS**
- **Trio $4** → **P&L −$150**

---

## 2. Summary

| Race | Banker (MC Place #1) | N legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L |
|------|----------------------|--------|--------|-------|--------|------|--------|--------|-----|
| R1 | #12 | 6 | 15 | $150 | 7-9-5 | ❌ | $1 | $0 | −$150 |
| R2 | #6 | 5 | 10 | $100 | 11-6-2 | ❌ | $924 | $0 | −$100 |
| R3 | #6 | 5 | 10 | $100 | 6-11-3 | ✅ | $327 | $327 | +$227 |
| R4 | #2 | 5 | 10 | $100 | 12-2-4 | ✅ | $133 | $133 | +$33 |
| R5 | #10 | 6 | 15 | $150 | 5-1-12 | ✅ | $393 | $393 | +$243 |
| R6 | #2 | 5 | 10 | $100 | 3-7-4 | ✅ | $524 | $524 | +$424 |
| R7 | #1 | 5 | 10 | $100 | 3-5-1 | ✅ | $174 | $174 | +$74 |
| R8 | #1 | 6 | 15 | $150 | 9-6-8 | ✅ | $404 | $404 | +$254 |
| R9 | #3 | 6 | 15 | $150 | 7-9-6 | ❌ | $4 | $0 | −$150 |
| **Total** | | | **110** | **$1,100** | | **7 / 9** | | **$1,955** | **+$855** |

**ROI (R1–R9):** +$855 / $1,100 ≈ **+77.7%**.

---

## 3. Notes

1. **R1**: Favourite/longshot frame (**#7 / #9 / #5**) vs MC banker **#12** (6th); **#5** was reserve with **~18%** Place — outside the mechanical leg rules.
2. **R2**: **#11** won but was **not** in the six-row MC ranking — the rule cannot “see” him without full-field MC output.
3. **R4**: Banker by **MC Place%** is **#2**, not **#7** (Adj Win% order in the PDF differs).
4. **R5**: MC Place leader is **#10** (48.3%), not market-style banker **#5**; **#10** ran 12th but the Trio still **hit** on **#5 / #1 / #12** as legs.
5. **R6**: Banker **#2** ran 9th, but the Trio **hit** because all three placegetters were **legs** (same pattern as “banker fails, legs fill the frame”).
6. **R9**: **#9** ran 2nd at **21** odds with **~13%** MC Place — **miss** under Place% + odds rules.

---

## 4. Comparison to `trio_review_20260304_HV.md` (if present)

The mechanical **MC Place% #1** banker often matches the report’s **Adj Win% / blend** banker, but **R4** (**#2** vs **#7**) and **R5** (**#10** vs **#5**) show differences. Use this file for **rule backtests**; use the meeting review for narrative pool performance.
