# Strategy B Review — MC #1 banker + primary Place%>20% + win-odds add/swap (trio SKILL) | Happy Valley | 22 Apr 2026

## Rules

- **Banker**: MC **#1** by MC Win% (same as "MC #1" in reports).
- **Primary legs**: all other runners with **MC Place% > 20%** (banker excluded).
- **Step B (win odds < 10, Place% ≤ 20%)**: **replace** one primary leg when the SKILL swap rule fires; otherwise **add** short-priced tails (see each `trio_strategy_20260422_HV_R*.md`).
- **Data**: `--form-data all` (all-venue history); HKJC win odds from reports at generation time.
- **Bet type**: Trio (單T) — top 3 in **any** order.
- **Unit**: **$10** per combination; structure **膽拖** 1 banker + N legs → **C(N, 2)** combos.

**Stake convention (this review):** **Full Strategy B** = the published **final legs** after Step B in each report.

**Note:** This is the **trio-strategy SKILL** Strategy B pipeline (**MC-only**), **not** Strategy A (Adj Win/Place + jockey + SCMP + Modes A–B).

**Pre-race definitions:** `data/reports/trio_strategy_20260422_HV_R1.md` … **R9.md`.

**Results source:** `tools/scrape-meeting.ts --date=2026-04-22 --venue=HV` → `data/historical/results_20260422_HV.json`. **Finished** + **SP** = `winOdds` on each finisher row. **MC % / odds** from the trio reports.

---

## Summary

| Metric | Value |
|--------|-------|
| Races played | **9 (R1–R9)** |
| Hit rate | **2/9 (22.2%)** |
| Total staked | **$880** (full Strategy B) |
| Total returned | **$1,257** |
| **Net P&L** | **+$377** |
| **ROI** | **+42.8%** |
| Session Result | **WIN** |

---

## Race-by-Race Results

Banker = MC Win% **#1**. Legs = **final Strategy B legs** after Step B add/swap (see per-race reports).

| Race | Class | Dist | Surf | Banker (MC#1) | Final legs (after Step B) | Structure | Combos | Stake | Result (1→2→3) | Banker placed? | Hit? | Trio $ | Return | P&L |
|------|-------|------|------|---------------|---------------------------|-----------|--------|-------|----------------|----------------|------|--------|--------|-----|
| R1 | C5 | 1200m | Turf | #4(22.9W/53.9P) | #8,#5,#6,#3,#2 | 膽拖 1B+5L | 10 | $100 | 4→8→7 | 1st ✅ | ❌ | $679 | $0 | −$100 |
| R2 | C5 | 1650m | Turf | #8(26.3W/56.8P) | #2,#7,#9,#6,#4,#11 | 膽拖 1B+6L | 15 | $150 | 7→2→11 | **4th ❌** | ❌ | $367 | $0 | −$150 |
| R3 | C4 | 1650m | Turf | #1(27.5W/62.0P) | #4,#3,#7,#6,#9 | 膽拖 1B+5L | 10 | $100 | 5→1→7 | 2nd ✅ | ❌ | $2,450 | $0 | −$100 |
| R4 | C4 | 1200m | Turf | #6(34.5W/68.2P) | #4,#9,#2,#1 | 膽拖 1B+4L | 6 | $60 | 6→2→1 | 1st ✅ | **✅** | $1,067 | $1,067 | +$1,007 |
| R5 | C4 | 1200m | Turf | #1(25.7W/56.6P) | #4,#9,#7,#11,#6,#12 | 膽拖 1B+6L | 15 | $150 | 11→12→1 | 3rd ✅ | **✅** | $190 | $190 | +$40 |
| R6 | C4 | 1000m | Turf | #3(31.8W/65.7P) | #6,#5,#8,#1,#4 | 膽拖 1B+5L | 10 | $100 | 3→6→7 | 1st ✅ | ❌ | $2,558 | $0 | −$100 |
| R7 | C3 | 1000m | Turf | #10(46.2W/82.3P) | #1,#5,#4,#8 | 膽拖 1B+4L | 6 | $60 | 12→1→10 | 3rd ✅ | ❌ | $484 | $0 | −$60 |
| R8 | C3 | 1800m | Turf | #11(53.1W/85.7P) | #1,#4,#5,#3 | 膽拖 1B+4L | 6 | $60 | 8→11→1 | 2nd ✅ | ❌ | $200 | $0 | −$60 |
| R9 | C3 | 1200m | Turf | #1(42.6W/75.6P) | #3,#4,#6,#5,#12 | 膽拖 1B+5L | 10 | $100 | 9→1→7 | 2nd ✅ | ❌ | $1,475 | $0 | −$100 |
| **TOTAL** | | | | | | | **88** | **$880** | | **8/9** bank in frame | **2/9** | | **$1,257** | **+$377** |

---

## Full MC Place% Table (ticket horses + field)

*Odds* = pre-race HKJC win odds from `data/reports/trio_strategy_20260422_HV_R*.md`. **Finished** + **SP** from `data/historical/results_20260422_HV.json`.

**Row order:** **★** banker, then legs **L1, L2, …** in **final Strategy B leg order**, then **—** other starters by saddle #.

**Column "Pool":** **✅** = on final Strategy B ticket (primary **P>20%** or Step B add/swap).

### R1 — Class 5 | 1200m Turf | Actual: 4→8→7 ❌

**Ticket:** ★ **#4** + legs **#8 → #5 → #6 → #3 → #2** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | #   | Horse           | Win%  | Place% | Odds | Pool                  | Form | Role     | Finished         |
| --- | --- | --------------- | ----- | ------ | ---- | --------------------- | ---- | -------- | ---------------- |
| ★   | 4   | NEBRASKAN       | 22.9% | 53.9%  | 3.7  | ✅                     | 8    | ★ Banker | **1st** (SP 4.7) |
| L1  | 8   | TEAM HAPPY      | 18.1% | 47.6%  | 6.0  | ✅                     | 9    | Leg      | **2nd** (SP 3.8) |
| L2  | 5   | THOUSAND CUPS   | 15.0% | 42.4%  | 8.3  | ✅                     | 8    | Leg      | 11th (SP 11)     |
| L3  | 6   | HAPPY BOYS      | 14.1% | 39.5%  | 8.8  | ✅                     | 9    | Leg      | 5th (SP 10)      |
| L4  | 3   | CONCORDE STAR   | 9.2%  | 29.3%  | 9.4  | ✅                     | 7    | Leg      | 8th (SP 14)      |
| L5  | 2   | GIDDY UP        | 2.6%  | 11.1%  | 9.1  | ✅ (w<10 swap for #10) | 8    | Leg      | 12th (SP 12)     |
| —   | 10  | TAIHANG SCENERY | 6.7%  | 23.7%  | 15   | ❌ (swapped out)       | 4    | —        | **4th** (SP 15)  |
| —   | 7   | TURF PHOENIX    | 3.6%  | 14.9%  | 15   | ❌                     | 6    | —        | **3rd** (SP 28)  |
| —   | 11  | RICH HORSE      | 2.9%  | 13.1%  | 41   | ❌                     | 7    | —        | 7th (SP 56)      |
| —   | 1   | HAPPY ALLIANCE  | 2.4%  | 10.8%  | 35   | ❌                     | 7    | —        | 9th (SP 95)      |
| —   | 9   | BRILLIANT FIRE  | 1.8%  | 9.4%   | 17   | ❌                     | 6    | —        | 10th (SP 7.8)    |
| —   | 12  | BINGO BABE      | 0.7%  | 4.3%   | 11   | ❌                     | 9    | —        | 6th (SP 6.5)     |

**Banker hit (1st); pool gap.** **#4** won and **#8** (2nd) is a primary leg ✅ — but **#7** TURF PHOENIX ran **3rd** at 28 SP (MC 14.9% Place, below 20% threshold, odds 15 > 10 so not Step B eligible). The Step B swap dropped #10 TAIHANG SCENERY for #2 GIDDY UP — #10 ran 4th so the swap didn't cost a placer. Pool gap on #7 is a clean miss: MC rated it correctly as a tail horse but it outperformed.

### R2 — Class 5 | 1650m Turf | Actual: 7→2→11 ❌

**Ticket:** ★ **#8** + legs **#2 → #7 → #9 → #6 → #4 → #11** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 8 | VERBIER | 26.3% | 56.8% | 3.4 | ✅ | 10 | ★ Banker | **4th** (SP 3.7) |
| L1 | 2 | SOARING BRONCO | 15.6% | 41.8% | 7.7 | ✅ | 9 | Leg | **2nd** (SP 2.7) |
| L2 | 7 | PODIUM | 13.3% | 37.6% | 11 | ✅ | 8 | Leg | **1st** (SP 5.0) |
| L3 | 9 | DOUBLE SHOW | 10.9% | 35.1% | 21 | ✅ | 5 | Leg | 9th (SP 20) |
| L4 | 6 | DOUBLE BINGO | 9.9% | 32.0% | 4.9 | ✅ | 6 | Leg | — |
| L5 | 4 | TELECOM POWER | 5.6% | 20.1% | 13 | ✅ | 10 | Leg | 10th (SP 9.7) |
| L6 | 11 | SMILING EMPEROR | 5.4% | 20.6% | 13 | ✅ | 8 | Leg | **3rd** (SP 17) |
| — | 1 | LUCKY BLESSING | 4.5% | 18.6% | 43 | ❌ | 9 | — | 7th (SP 67) |
| — | 10 | ATOMIC BEAUTY | 4.3% | 17.7% | 13 | ❌ | 7 | — | 11th (SP 23) |
| — | 5 | SPARKLE AND GOLD | 2.9% | 12.4% | 14 | ❌ | 7 | — | 8th (SP 26) |
| — | 3 | NOBLE FANS | 1.0% | 5.1% | 23 | ❌ | 7 | — | 5th (SP 28) |
| — | 12 | CASA LEGEND | 0.4% | 2.1% | 10 | ❌ | 4 | — | 6th (SP 23) |

**Pattern A — all 3 in pool, wrong banker.** Banker **#8** VERBIER (Moreira, 3.7 SP) finished **4th** — missed by 0.08s. **All three** placers (**#7**, **#2**, **#11**) are on the B ticket as legs. If **#7** or **#2** were banker instead, B collects **$367**. The wider 6-leg pool correctly captured every placer but the MC #1 pick couldn't hold the frame.

### R3 — Class 4 | 1650m Turf | Actual: 5→1→7 ❌

**Ticket:** ★ **#1** + legs **#4 → #3 → #7 → #6 → #9** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 1 | GLORIOUS JOURNEY | 27.5% | 62.0% | 7.6 | ✅ | 8 | ★ Banker | **2nd** (SP 7.7) |
| L1 | 4 | FORTUNE STAR | 27.4% | 62.0% | 4.3 | ✅ | 9 | Leg | 5th (SP 5.9) |
| L2 | 3 | VERMILION TEMPEST | 16.7% | 47.3% | 9.8 | ✅ | 6 | Leg | 8th (SP 10) |
| L3 | 7 | SURE JOYFUL | 9.1% | 32.1% | 15 | ✅ | 9 | Leg | **3rd** (SP 23) |
| L4 | 6 | STAR ELEGANCE | 3.6% | 16.6% | 6.4 | ✅ (w<10 add) | 6 | Leg | 6th (SP 7.4) |
| L5 | 9 | YIU CHEUNG VICTORY | 3.9% | 18.4% | 9.9 | ✅ (w<10 add) | 14 | Leg | 10th (SP 6.9) |
| — | 5 | SHOOTING TO TOP | 2.3% | 11.9% | 12 | ❌ | 2 | — | **1st** (SP 6.2) |
| — | 11 | OUR LUCKY GLORY | 3.3% | 16.0% | 12 | ❌ | 7 | — | 4th (SP 11) |
| — | 2 | GAZELEY | 2.3% | 11.2% | 16 | ❌ | 3 | — | 11th (SP 51) |
| — | 8 | TO INFINITY | 1.5% | 8.3% | 14 | ❌ | 9 | — | 9th (SP 17) |
| — | 12 | GOOD LUCK WIN | 1.3% | 7.6% | 10 | ❌ | 8 | — | 12th (SP 6.5) |
| — | 10 | APOLAR FIGHTER | 1.2% | 6.6% | 25 | ❌ | 8 | — | 7th (SP 41) |

**Banker hit (2nd); pool gap.** **#1** placed 2nd ✅; **#7** SURE JOYFUL (primary leg) ran 3rd ✅. But winner **#5** SHOOTING TO TOP (6.2 SP, MC 11.9% Place, only 2 form entries, E Brown) was outside the pool. Odds at generation were 12 (above Step B threshold); SP drifted down to 6.2 on race day. Had the SP been available pre-race, Step B would have forced #5 in. **This is a timing miss** — eve-of-race odds vs post-time SP.

### R4 — Class 4 | 1200m Turf | Actual: 6→2→1 ✅

**Ticket:** ★ **#6** + legs **#4 → #9 → #2 → #1** | 膽拖 C(4,2) = 6 × $10 = $60

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 6 | VIGOR EYE | 34.5% | 68.2% | 3.1 | ✅ | 5 | ★ Banker | **1st** (SP 2.3) |
| L1 | 4 | JOLLY COMPANION | 18.7% | 51.5% | 7.4 | ✅ | 11 | Leg | 6th (SP 10) |
| L2 | 9 | LEADING AGILITY | 13.8% | 43.2% | 5.2 | ✅ | 4 | Leg | 4th (SP 6.8) |
| L3 | 2 | CAPTAIN LINK | 10.3% | 34.0% | 13 | ✅ | 5 | Leg | **2nd** (SP 48) |
| L4 | 1 | YOUNG ARROW | 0.6% | 3.6% | 9.4 | ✅ (w<10 swap for #3) | 7 | Leg | **3rd** (SP 8.3) |
| — | 3 | LUCKY MCQUEEN | 7.7% | 29.5% | 17 | ❌ (swapped out) | 9 | — | 5th (SP 4.5) |
| — | 7 | FLYING SNIPER | 3.5% | 16.6% | 23 | ❌ | 2 | — | 7th (SP 15) |
| — | 10 | YEUX DE LIFELINE | 3.0% | 14.3% | 14 | ❌ | 3 | — | 8th (SP 17) |
| — | 8 | KWAI CHUNG TALENTS | 2.5% | 12.8% | 21 | ❌ | 3 | — | 9th (SP 79) |
| — | 5 | LUCKY XANDER | 3.5% | 15.3% | 27 | ❌ | 8 | — | 12th (SP 159) |
| — | 11 | SOLAR RIVER | 1.2% | 8.1% | 15 | ❌ | 0 | — | 10th (SP 34) |
| — | 12 | ZHOU GONGJIN | 0.4% | 3.0% | 13 | ❌ | 4 | — | 11th (SP 126) |

**Hit.** Banker **#6** won at 2.3 SP. **#2** CAPTAIN LINK (primary leg, 48 SP — massive drift from 13 early) ran 2nd; **#1** YOUNG ARROW (Step B swap for #3 LUCKY MCQUEEN) ran **3rd** at 8.3. Line **6-2-1** pays **$1,067**. The Step B swap was **critical**: #3 LUCKY MCQUEEN (the replaced horse) finished 5th, while #1 YOUNG ARROW placed. MC rated #1 at only 0.6% Win / 3.6% Place but Step B forced it in at 9.4 odds. **This is the Step B win-odds rule at its best** — capturing a market-backed horse that MC had no data confidence on. Strategy A missed this entirely (had #3 in pool instead of #1). Best P&L of the session (+$1,007).

### R5 — Class 4 | 1200m Turf | Actual: 11→12→1 ✅

**Ticket:** ★ **#1** + legs **#4 → #9 → #7 → #11 → #6 → #12** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 1 | SPEEDY SMARTIE | 25.7% | 56.6% | 7.0 | ✅ | 8 | ★ Banker | **3rd** (SP 14) |
| L1 | 4 | WINNING MONEY | 13.1% | 37.1% | 9.0 | ✅ | 6 | Leg | 6th (SP 11) |
| L2 | 9 | LOVING VIBES | 12.6% | 37.3% | 7.1 | ✅ | 9 | Leg | 8th (SP 17) |
| L3 | 7 | SILVER SPURS | 10.0% | 30.3% | 8.0 | ✅ | 8 | Leg | 7th (SP 17) |
| L4 | 11 | THUNDER PRINCE | 9.4% | 29.7% | 4.0 | ✅ | 10 | Leg | **1st** (SP 2.2) |
| L5 | 6 | FUN ELITE | 6.1% | 21.6% | 9.6 | ✅ | 6 | Leg | 12th (SP 38) |
| L6 | 12 | WINNING CHAMPION | 3.5% | 14.9% | 8.3 | ✅ (w<10 swap for #3) | 9 | Leg | **2nd** (SP 5.2) |
| — | 3 | KING OBERON | 8.6% | 27.5% | 37 | ❌ (swapped out) | 8 | — | 5th (SP 61) |
| — | 8 | LITTLE MONSTER | 3.9% | 16.4% | 11 | ❌ | 8 | — | 4th (SP 5.8) |
| — | 2 | SUPER LOVE | 5.4% | 19.6% | 38 | ❌ | 7 | — | 11th (SP 55) |
| — | 5 | TURBO JEFFERIES | 1.2% | 6.2% | 19 | ❌ | 1 | — | 9th (SP 25) |
| — | 10 | BLAZING BEAM | 0.5% | 2.6% | 30 | ❌ | 7 | — | 10th (SP 43) |

**Hit.** Banker **#1** placed 3rd. **#11** THUNDER PRINCE (primary leg, Purton, 2.2 SP) won; **#12** WINNING CHAMPION (Step B swap for #3 KING OBERON) ran **2nd** at 5.2. Line **1-11-12** pays **$190**. Second Step B swap hit of the session: #3 KING OBERON (the swapped-out horse at 37 early → 61 SP) finished 5th. Step B correctly identified that the market strongly opposed #3 despite MC's 27.5% Place. Net P&L only +$40 due to $150 stake on 15 combos.

### R6 — Class 4 | 1000m Turf | Actual: 3→6→7 ❌

**Ticket:** ★ **#3** + legs **#6 → #5 → #8 → #1 → #4** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 3 | KING PROFIT | 31.8% | 65.7% | 10 | ✅ | 4 | ★ Banker | **1st** (SP 6.8) |
| L1 | 6 | GRAND NOVA | 17.9% | 47.1% | 5.9 | ✅ | 4 | Leg | **2nd** (SP 7.8) |
| L2 | 5 | DAY DAY VICTORY | 17.4% | 46.3% | 19 | ✅ | 8 | Leg | 7th (SP 30) |
| L3 | 8 | JUMBO BLESSING | 6.0% | 23.0% | 4.7 | ✅ | 2 | Leg | 5th (SP 3.5) |
| L4 | 1 | HEALTHY HEALTHY | 5.3% | 20.7% | 10 | ✅ | 8 | Leg | 8th (SP 9.9) |
| L5 | 4 | BEAUTY SHOW | 4.2% | 18.5% | 2.9 | ✅ (w<10 swap for #11) | 1 | Leg | 4th (SP 2.7) |
| — | 11 | HAPPY UNITED | 5.6% | 22.9% | 15 | ❌ (swapped out) | 6 | — | 6th (SP 17) |
| — | 7 | HARMONY FIRE | 4.1% | 18.3% | 21 | ❌ | 7 | — | **3rd** (SP 40) |
| — | 9 | TOPSPIN KING | 2.9% | 13.5% | 33 | ❌ | 2 | — | 10th (SP 158) |
| — | 12 | CRYSTAL POWERFUL | 2.7% | 12.7% | 33 | ❌ | 6 | — | 12th (SP 83) |
| — | 10 | HYANNIS STAR | 1.1% | 6.2% | 33 | ❌ | 2 | — | 9th (SP 26) |
| — | 2 | E HO HO | 0.9% | 5.1% | 22 | ❌ | 5 | — | 11th (SP 126) |

**Banker hit (1st); pool gap — and the session's critical A vs B divergence.** **#3** won, **#6** (primary leg) 2nd — but **#7** HARMONY FIRE ran **3rd** at 40 SP (MC 18.3% Place, 21 odds — neither above 20% threshold nor below 10 odds for Step B). Strategy B swapped #11 HAPPY UNITED for #4 BEAUTY SHOW (2.9 odds), which ran 4th. **Strategy A included #7** via SCMP excuses boost (+2% → 20.3% Adj Place) and collected **$2,558**. This is the most expensive Strategy B miss of the session and the sharpest A vs B divergence: A's qualitative SCMP data captured a 40x longshot that B's mechanical rules couldn't see.

### R7 — Class 3 | 1000m Turf | Actual: 12→1→10 ❌

**Ticket:** ★ **#10** + legs **#1 → #5 → #4 → #8** | 膽拖 C(4,2) = 6 × $10 = $60

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 10 | SKY CAP | 46.2% | 82.3% | 4.5 | ✅ | 8 | ★ Banker | **3rd** (SP 2.6) |
| L1 | 1 | HORSEPOWER | 23.6% | 65.4% | 4.8 | ✅ | 6 | Leg | **2nd** (SP 5.3) |
| L2 | 5 | BUNTA BABY | 12.4% | 46.5% | 8.8 | ✅ | 7 | Leg | 6th (SP 9.2) |
| L3 | 4 | TOGETHER WE VALUE | 6.5% | 31.4% | 6.5 | ✅ | 4 | Leg | 5th (SP 7.5) |
| L4 | 8 | COPPER CORE | 0.4% | 4.0% | 7.9 | ✅ (w<10 swap for #2) | 0 | Leg | 11th (SP 20) |
| — | 2 | CANDLELIGHT DINNER | 5.4% | 28.2% | 19 | ❌ (swapped out) | 8 | — | 4th (SP 7.9) |
| — | 12 | CASA OF HONOR | 0.1% | 1.6% | 24 | ❌ | 7 | — | **1st** (SP 22) |
| — | 11 | SPARKLING FELLOW | 2.3% | 15.5% | 11 | ❌ | 6 | — | 8th (SP 28) |
| — | 7 | BLUE ILLUSION | 1.1% | 8.9% | 14 | ❌ | 7 | — | 9th (SP 45) |
| — | 3 | RED ELEGANCE | 1.0% | 7.8% | 15 | ❌ | 8 | — | 7th (SP 32) |
| — | 6 | CENTRAL BANK | 0.5% | 4.8% | 23 | ❌ | 1 | — | 10th (SP 12) |
| — | 9 | DOUBLE MONEY | 0.4% | 3.7% | 24 | ❌ | 2 | — | 12th (SP 132) |

**Banker hit (3rd); pool gap — genuine upset.** **#10** SKY CAP (MC's strongest single-horse signal at 46.2% Win) placed 3rd. **#1** HORSEPOWER (primary leg) ran 2nd. But winner **#12** CASA OF HONOR (22 SP, MC 0.1% Win / 1.6% Place, 7 form entries) was a deep longshot upset outside any conceivable pool. Poon with the -7 claim from widest draw 12 — an unfixable miss for MC-based strategies. The Step B swap hurt slightly: #2 CANDLELIGHT DINNER (swapped out) finished 4th, and replacement #8 COPPER CORE (lame RF, 0 form) ran 11th.

### R8 — Class 3 | 1800m Turf | Actual: 8→11→1 ❌

**Ticket:** ★ **#11** + legs **#1 → #4 → #5 → #3** | 膽拖 C(4,2) = 6 × $10 = $60

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 11 | ACE WAR | 53.1% | 85.7% | 4.1 | ✅ | 9 | ★ Banker | **2nd** (SP 3.0) |
| L1 | 1 | LIVEANDLETLIVE | 18.6% | 58.8% | 5.8 | ✅ | 10 | Leg | **3rd** (SP 4.1) |
| L2 | 4 | NEZHA | 8.1% | 36.3% | 19 | ✅ | 6 | Leg | 7th (SP 29) |
| L3 | 5 | SO YOU WILL | 7.6% | 35.6% | 5.0 | ✅ | 5 | Leg | 9th (SP 8.9) |
| L4 | 3 | CHINA WIN | 2.4% | 15.8% | 6.2 | ✅ (w<10 swap for #2) | 9 | Leg | 5th (SP 7.7) |
| — | 2 | HIGHLAND RAHY | 5.7% | 29.6% | 12 | ❌ (swapped out) | 6 | — | 8th (SP 29) |
| — | 8 | THE AUSPICIOUS | 0.8% | 7.8% | 16 | ❌ | 13 | — | **1st** (SP 10) |
| — | 9 | VIOLET STAR | 1.4% | 10.4% | 11 | ❌ | 5 | — | 10th (SP 15) |
| — | 10 | MISSION GIANT | 0.7% | 4.7% | 63 | ❌ | 1 | — | 4th (SP 205) |
| — | 6 | MIGHTY STRENGTH | 0.6% | 5.5% | 21 | ❌ | 5 | — | 11th (SP 40) |
| — | 12 | PACKING FIGHTER | 0.6% | 6.0% | 17 | ❌ | 6 | — | 6th (SP 7.2) |
| — | 7 | EXCELLENCE VALUE | 0.3% | 3.9% | 26 | ❌ | 10 | — | 12th (SP 139) |

**Banker hit (2nd); pool gap.** **#11** ACE WAR (MC's strongest dominant signal of the meeting, 53.1% Win) placed 2nd. **#1** LIVEANDLETLIVE (primary leg) ran 3rd. But winner **#8** THE AUSPICIOUS (10 SP, MC 0.8% Win / 7.8% Place, 13 form entries) was outside both pools. Odds at generation were 16 (above Step B threshold); SP compressed to 10 on race day — another **timing miss**. Strategy A had the same gap. The Step B swap of #2 HIGHLAND RAHY for #3 CHINA WIN was neutral (neither placed). #10 MISSION GIANT's 4th at 205 SP was a surreal longshot run.

### R9 — Class 3 | 1200m Turf | Actual: 9→1→7 ❌

**Ticket:** ★ **#1** + legs **#3 → #4 → #6 → #5 → #12** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 1 | AURIO | 42.6% | 75.6% | 4.8 | ✅ | 6 | ★ Banker | **2nd** (SP 3.4) |
| L1 | 3 | LOVE TOGETHER | 17.5% | 51.4% | 5.2 | ✅ | 7 | Leg | 7th (SP 4.9) |
| L2 | 4 | MY DAY MY WAY | 10.2% | 36.9% | 12 | ✅ | 5 | Leg | 10th (SP 18) |
| L3 | 6 | GREATER BAE | 9.9% | 36.5% | 9.0 | ✅ | 5 | Leg | 8th (SP 16) |
| L4 | 5 | FLYING FORTRESS | 7.4% | 29.4% | 37 | ✅ | 7 | Leg | 6th (SP 53) |
| L5 | 12 | PACKING GLORY | 1.7% | 9.7% | 5.7 | ✅ (w<10 swap for #7) | 6 | Leg | 4th (SP 3.3) |
| — | 7 | SOVEREIGN FUND | 4.6% | 21.2% | 26 | ❌ (swapped out) | 8 | — | **3rd** (SP 22) |
| — | 9 | JUBILANT WINNER | 2.1% | 12.4% | 10 | ❌ | 7 | — | **1st** (SP 14) |
| — | 2 | MASTEROFMYUNIVERSE | 1.6% | 9.6% | 10 | ❌ | 8 | — | 9th (SP 25) |
| — | 10 | WINGS OF WAR | 1.2% | 8.0% | 10 | ❌ | 7 | — | 5th (SP 9.1) |
| — | 8 | KANSAS | 0.9% | 5.7% | 36 | ❌ | 1 | — | 11th (SP 161) |
| — | 11 | WITHOUT RHYME | 0.4% | 3.6% | 13 | ❌ | 0 | — | 12th (SP 62) |

**Banker hit (2nd); double pool gap + swap damage.** **#1** AURIO (course record holder) placed 2nd. But **#9** JUBILANT WINNER (won at 14 SP, MC 2.1%, 10 odds = exactly at the Step B boundary, not below 10) and **#7** SOVEREIGN FUND (3rd at 22 SP, MC 21.2% Place — the **swapped-out horse**) were both missing. The Step B swap **hurt here**: #7 was a primary leg with 21.2% MC Place that got replaced by #12 PACKING GLORY (5.7 odds). #12 ran 4th; #7 ran **3rd**. Without the swap, the banker + #7 would have been two of the three — but #9 (winner) was still missing regardless. An unfixable double gap even without the swap.

---

## Hit Detail (2 hits)

### R4 ✅ — Trio $1,067 | Stake $60 | P&L +$1,007

Paying **6→2→1**; **#6** banker **1st** (SP 2.3); legs **#2** (2nd, SP 48) · **#1** (3rd, SP 8.3, Step B add) — line **6-2-1**. Step B swap of #3 LUCKY MCQUEEN → #1 YOUNG ARROW was the decisive move. MC rated #1 at 0.6% Win but the market at 9.4 odds saw a jockey-penalised bounce candidate. Strategy A had #3 in pool, not #1 — this is B's signature win.

### R5 ✅ — Trio $190 | Stake $150 | P&L +$40

Paying **11→12→1**; **#1** banker **3rd** (SP 14); legs **#11** (1st, SP 2.2) · **#12** (2nd, SP 5.2, Step B swap) — line **1-11-12**. Second Step B swap hit: #12 WINNING CHAMPION replaced #3 KING OBERON (37 odds → 61 SP). Modest dividend ($190) against wider 15-combo ticket.

---

## Banker Performance (Strategy B — MC #1)

| Race | Banker | MC Place% | MC Win% | Odds (early) | Finished | SP | Placed? |
|------|--------|-----------|---------|--------------|----------|----|---------|
| R1 | #4 NEBRASKAN | 53.9% | 22.9% | 3.7 | 1st | 4.7 | ✅ |
| R2 | #8 VERBIER | 56.8% | 26.3% | 3.4 | 4th | 3.7 | ❌ |
| R3 | #1 GLORIOUS JOURNEY | 62.0% | 27.5% | 7.6 | 2nd | 7.7 | ✅ |
| R4 | #6 VIGOR EYE | 68.2% | 34.5% | 3.1 | 1st | 2.3 | ✅ |
| R5 | #1 SPEEDY SMARTIE | 56.6% | 25.7% | 7.0 | 3rd | 14 | ✅ |
| R6 | #3 KING PROFIT | 65.7% | 31.8% | 10 | 1st | 6.8 | ✅ |
| R7 | #10 SKY CAP | 82.3% | 46.2% | 4.5 | 3rd | 2.6 | ✅ |
| R8 | #11 ACE WAR | 85.7% | 53.1% | 4.1 | 2nd | 3.0 | ✅ |
| R9 | #1 AURIO | 75.6% | 42.6% | 4.8 | 2nd | 3.4 | ✅ |

**8/9** MC #1 bankers in the top three — **2** Trio collects. Only **1** banker missed the frame (**R2** #8 VERBIER 4th). This is the best single-meeting banker rate in the campaign (88.9%).

---

## Miss Classification

| Pattern | Count | Races | Description |
|---------|-------|-------|-------------|
| **A — All 3 in pool, wrong banker** | 1 | R2 | Most painful — ticket had all 3 placers as legs |
| **B — Banker hit, pool gap** | 6 | R1, R3, R6, R7, R8, R9 | Banker placed but a winning placer was outside the leg pool |
| **C — Banker fail + pool gap** | 0 | — | — |

**Pattern A total forfeited dividends:** $367 (R2 — would have swung session to +$744).

**Pattern B dominance:** 6/7 misses were banker-hit + pool gap. The pool was too narrow for 6 races despite bankers performing at 88.9%. Key pool gaps: #7 TURF PHOENIX (R1, 28x), #5 SHOOTING TO TOP (R3, 6.2x), #7 HARMONY FIRE (R6, 40x), #12 CASA OF HONOR (R7, 22x), #8 THE AUSPICIOUS (R8, 10x), #9 JUBILANT WINNER + #7 SOVEREIGN FUND (R9, 14x/22x).

---

## Lessons

1. **Pool gap was the overwhelmingly dominant miss pattern (6/7).** With bankers placing 8/9, the bottleneck shifted entirely to pool coverage. Every single B-miss except R2 had the banker in the frame and a longshot intruder outside the pool. The MC #1 selection is working — the pool width is not.

2. **Step B delivered both hits (R4, R5) — total value +$1,047.** Both wins came from the win-odds swap rule replacing a high-MC-Place%/long-odds horse with a low-MC-Place%/short-odds horse. Combined: +$1,007 (R4) + $40 (R5) = **+$1,047**. Without Step B, Strategy B has **0 hits** on this card. The rule is the only reason B is profitable tonight.

3. **Step B swap hurt in R9:** #7 SOVEREIGN FUND (MC 21.2% Place, swapped out for #12 PACKING GLORY at 5.7 odds) finished 3rd. The swap replaced a horse that would have partially covered the Trio (banker + #7 = 2 of 3). However, the winner #9 was still outside the pool regardless, so the miss was unfixable.

4. **Strategy A's SCMP edge was decisive in R6:** The only race where A hit and B missed. #7 HARMONY FIRE (MC 18.3%, 21 odds, excuses flag) was invisible to B's mechanical rules — below 20% Place, above 10 odds. Strategy A's SCMP +2% boost lifted it to 20.3% and into the pool. **A collected $2,558; B collected $0.** The qualitative data pipeline earned $2,558 − $0 = **$2,558 net advantage** on a single race.

5. **Timing gap between pre-race odds and SP:** R3's #5 SHOOTING TO TOP (12 early → 6.2 SP) and R8's #8 THE AUSPICIOUS (16 early → 10 SP) both drifted well below the Step B threshold by post time. Had SP been available, Step B would have forced both into the pool. **Consider re-running Step B with live odds closer to post time.**

6. **Deep longshot upsets remain unfixable:** R7 #12 CASA OF HONOR (22x, MC 0.1%) won from draw 12 with apprentice Poon. No MC-based or odds-based rule would have included a horse at 0.1% Place and 24 early odds. This is structural variance, not a model failure.

---

## A vs B divergence (this meeting)

| Metric | Strategy A | Strategy B | Delta (B − A) |
|--------|-----------|-----------|---------------|
| Hits | 1/9 (R6) | 2/9 (R4, R5) | B +1 |
| Total staked | $780 | $880 | B +$100 |
| Total returned | $2,558 | $1,257 | A +$1,301 |
| **Net P&L** | **+$1,778** | **+$377** | **A +$1,401** |
| **ROI** | **+227.9%** | **+42.8%** | **A +185.1pp** |

**A won by $1,401** — driven entirely by R6's $2,558 hit on #7 HARMONY FIRE (SCMP excuses). B's two Step B hits (R4 $1,067, R5 $190) were outweighed by A's single qualitative-data-driven hit. On this card, **qualitative beat mechanical**.

---

## Cross-reference

| File | Role |
|------|------|
| `data/reviews/trio_review_stratC_20260419_ST.md` | Previous long-form B review (Sha Tin) |
| `data/reviews/trio_review_20260422_HV.md` | Full post-race note (Strategy A + B summary, cumulative tables) |
| `data/reports/trio_strategy_20260422_HV_R1.md` … `R9.md` | Pre-race Strategy A + **Strategy B (MC-only)** blocks |
| `data/historical/results_20260422_HV.json` | Finishes + Trio dividends |

---

*Post-race learning only — not betting advice.*
