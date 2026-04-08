# Strategy B Review — Banker = MC #1, Legs = Place%>20% OR odds<10 | Happy Valley | 8 Apr 2026

## Rules

- **Banker**: MC #1 (1st-ranked by MC Win%); if <2 starts → next eligible
- **Legs**: all horses with **MC Place% > 20%** OR **odds < 10** (union; banker excluded from leg list), plus **replacement / add** per report pipeline
- **Data**: `--form-data all` (all-venue history)
- **Bet type**: Trio (單T) — top 3 in any order
- **Unit**: $10 per combination
- **Structure**: 膽拖 1 banker + N legs → C(N, 2) combinations

**Results source:** `tools/scrape-meeting.ts` → `data/historical/results_20260408_HV.json`. **SP / finish** from scrape; **MC % / early odds** from `data/reports/trio_strategy_20260408_HV_R*.md` (~09:45 HKT pool).

---

## Summary

| Metric | Value |
|--------|-------|
| Races played | **9 (R1–R9)** |
| Hit rate | **1/9 (11.1%)** |
| Total staked | $1,050 |
| Total returned | **$454** |
| **Net P&L** | **−$596** |
| **ROI** | **−56.8%** |
| Session Result | **LOSS** |

---

## Race-by-Race Results

Legs = MC Place% > 20% OR odds < 10. Banker = MC #1 (highest MC Win%).

| Race | Class | Dist | Banker (MC#1) | Legs (Place%>20% OR odds<10) | Structure | Combos | Stake | Result (1→2→3) | Banker placed? | Hit? | Trio $ | Return | P&L |
|------|-------|------|---------------|------------------------------|-----------|--------|-------|-----------------|----------------|------|--------|--------|-----|
| R1 | C5 | 1200m | #10(27.9W/68.6P) | #8,#4,#9,#11,#1(3.3),#3(9.6)(6) | 膽拖 1B+6L | 15 | $150 | 1→7→11 | **12th ❌** | ❌ | $568 | $0 | −$150 |
| R2 | C4 | 1650m | #5(40.0W/82.1P) | #4,#1,#6,#3(4.9),#12(3.3)(5) | 膽拖 1B+5L | 10 | $100 | 7→12→**10** | 4th ❌ | ❌ | $466 | $0 | −$100 |
| R3 | C4 | 1000m | #2(31.9W/69.4P) | #8,#1,#5,#4,#3(6.5),#12(9.7)(6) | 膽拖 1B+6L | 15 | $150 | 4→3→1 | 4th ❌ | ❌ | $331 | $0 | −$150 |
| R4 | C4 | 1650m | #5(29.1W/67.3P) | #1,#4,#7,#2,#11(5.3)(5) | 膽拖 1B+5L | 10 | $100 | 7→2→1 | 4th ❌ | ❌ | $207 | $0 | −$100 |
| R5 | C4 | 1200m | #5(16.4W/44.2P) | #6,#10,#2,#9,#8,#7,#4(7) | 膽拖 1B+7L | 21 | $210 | 9→5→6 | 2nd ✅ | ✅ | $454 | $454 | **+$244** |
| R6 | C4 | 1200m | #1(55.6W/90.2P) | #2,#5,#4,#6(9.1)(4) | 膽拖 1B+4L | 6 | $60 | 2→**11**→1 | 3rd ✅ | ❌ | $141 | $0 | −$60 |
| R7 | C3 | 1650m | #1(71.5W/95.1P) | #8,#3,#5,#2(3.0)(3)* | 膽拖 1B+3L | 3 | $30 | 1→2→**9** | 1st ✅ | ❌ | $152 | $0 | −$30 |
| R8 | C3 | 1200m | #1(35.7W/74.2P) | #2,#7,#3,#4,#10(6.4)(5) | 膽拖 1B+5L | 10 | $100 | 4→**12**→6 | **8th ❌** | ❌ | $248 | $0 | −$100 |
| R9 | C3 | 1200m | #3(31.9W/68.3P) | #12,#1,#2,#4,#10(5.9),#7(9.9)(6) | 膽拖 1B+6L | 15 | $150 | 1→2→12 | **11th ❌** | ❌ | $959 | $0 | −$150 |
| **TOTAL** | | | | | | **105** | **$1,050** | | **3/9** | **1/9** | | **$454** | **−$596** |

\*Strategy B final pool after swap: **#8,#3,#2** only (3 legs) — see R7 section. **Bold** = horse NOT in pool or banker that still placed. *(Odds)* in Legs = odds<10 add.

---

## Full MC Place% Table (all horses, all races)

*Odds* = pre-race win odds from `data/reports/trio_strategy_20260408_HV_R*.md` (~09:45 HKT). **Finished** + **SP(Starting Price)** from `data/historical/results_20260408_HV.json`.

**Row order:** one table per race — **★** banker, then legs **L1, L2, …** in the same order as **Final legs** in the trio report, then **—** for all other starters (by saddle #). **Place%>20% OR odds<10** = MC report flags; **Role** = final ticket role.

### R1 — Class 5 | 1200m Turf C+3 | Actual: 1→7→11

**Ticket:** ★ **#10** + legs **#8 → #4 → #9 → #11 → #1 → #3** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Place%>20% OR o<10 | Form | Role | Finished |
|-----|---|-------|------|--------|------|---------------------|------|------|----------|
| ★ | 10 | ALWAYS MY FOLKS | 27.9% | 68.6% | 9.1 | ✅ | 5 | ★ Banker | **12th** |
| L1 | 8 | PODIUM | 24.3% | 64.1% | 22 | ✅ | 7 | Leg | 7th |
| L2 | 4 | CONCORDE STAR | 20.3% | 59.4% | 5.1 | ✅ | 6 | Leg | 8th |
| L3 | 9 | REWARDING TWINKLE | 19.7% | 58.7% | 17 | ✅ | 7 | Leg | 6th |
| L4 | 11 | CHILL MASTER | 5.0% | 25.3% | 6.1 | ✅ | 4 | Leg | **3rd** (SP 4.6) |
| L5 | 1 | DECISION LINK | 0.1% | 1.2% | 3.3 | ✅ (o<10) | 8 | Leg | **1st** (SP 5.3) |
| L6 | 3 | BLUE BARON | 0.1% | 0.6% | 9.6 | ✅ (o<10) | 3 | Leg | 5th |
| — | 2 | LEGENDARY IMPACT | 0.0% | 0.6% | 23 | ❌ | 7 | — | 11th |
| — | 5 | ONE AND ONLY | 0.0% | 0.2% | 29 | ❌ | 5 | — | 10th |
| — | 6 | SPARKLE AND GOLD | 0.4% | 4.5% | 22 | ❌ | 6 | — | 9th |
| — | 7 | THOUSAND CUPS | 1.6% | 10.9% | 16 | ❌ | 7 | — | **2nd** (SP 13) |
| — | 12 | TEAM HAPPY | 0.5% | 5.8% | 16 | ❌ | 8 | — | 4th |

**Pattern C — banker collapse + pool gap.** MC #1 **#10** (68.6% Place) ran **12th**. **#7** (2nd) was outside the pool (Place% 10.9%, odds ≥10). **#1** was in the pool via odds<10 and **won** — the model’s biggest MC–market miss of the race.

### R2 — Class 4 | 1650m Turf | Actual: 7→12→10

**Ticket:** ★ **#5** + legs **#4 → #1 → #6 → #3 → #12** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Place%>20% OR o<10 | Form | Role | Finished |
|-----|---|-------|------|--------|------|---------------------|------|------|----------|
| ★ | 5 | FORTUNE STAR | 40.0% | 82.1% | 6.8 | ✅ | 8 | ★ Banker | **4th** |
| L1 | 4 | AESTHETICISM | 26.3% | 70.5% | 21 | ✅ | 10 | Leg | 8th |
| L2 | 1 | BEAUTY VIVA | 15.7% | 57.5% | 4.8 | ✅ | 10 | Leg | 7th |
| L3 | 6 | CELTIC TIMES | 13.4% | 52.1% | 17 | ✅ | 10 | Leg | 5th |
| L4 | 3 | VERMILION TEMPEST | 3.1% | 19.7% | 4.9 | ✅ (o<10) | 5 | Leg | 10th |
| L5 | 12 | VIVACIOUS WIN | 0.1% | 1.8% | 3.3 | ✅ (o<10) | 6 | Leg | **2nd** |
| — | 2 | OSI HONOUR | 0.0% | 0.0% | 66 | ❌ | 3 | — | 12th |
| — | 7 | GENERAL REDWOOD | 0.4% | 4.5% | 27 | ❌ | 3 | — | **1st** (SP 10) |
| — | 8 | GOLDEN DARCI | 0.1% | 1.3% | 25 | ❌ | 4 | — | 11th |
| — | 9 | PRECISION HOPE | 0.4% | 4.8% | 13 | ❌ | 5 | — | 9th |
| — | 10 | YIU CHEUNG VICTORY | 0.2% | 2.9% | 13 | ❌ | 13 | — | **3rd** |
| — | 11 | SUPER GOLDENDRAGON | 0.3% | 2.8% | 78 | ❌ | 4 | — | 6th |

**Pattern C.** Banker **#5** 4th. **#7** winner not in pool. **#10** placed 3rd but was **not** in the final Strategy B pool — the critical gap.

### R3 — Class 4 | 1000m Turf | Actual: 4→3→1

**Ticket:** ★ **#2** + legs **#8 → #1 → #5 → #4 → #3 → #12** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Place%>20% OR o<10 | Form | Role | Finished |
|-----|---|-------|------|--------|------|---------------------|------|------|----------|
| ★ | 2 | BEAUTY THUNDER | 31.9% | 69.4% | 13 | ✅ | 9 | ★ Banker | **4th** |
| L1 | 8 | ELEGANT LIFE | 23.7% | 59.9% | 2.7 | ✅ | 6 | Leg | 7th |
| L2 | 1 | SUPERB KING | 20.4% | 55.7% | 6.8 | ✅ | 10 | Leg | **3rd** |
| L3 | 5 | FORZA LEADER | 9.0% | 32.3% | 80 | ✅ | 7 | Leg | 8th |
| L4 | 4 | TYCOON RESOURCES | 0.7% | 4.8% | 6.0 | ✅ (o<10) | 0 | Leg | **1st** (SP 5.2) |
| L5 | 3 | BEAUTY SHOW | 3.2% | 15.9% | 6.5 | ✅ (o<10) | 0 | Leg | **2nd** |
| L6 | 12 | HAPPY UNITED | 2.1% | 13.3% | 9.7 | ✅ (o<10) | 5 | Leg | 5th |
| — | 6 | ZETA HEDGE | 0.7% | 4.3% | 28 | ❌ | 4 | — | 12th |
| — | 7 | JOY STAR | 4.4% | 20.1% | 32 | ✅ | 3 | — (replaced by #4) | 10th |
| — | 9 | VIVA BOSS | 1.6% | 10.3% | 96 | ❌ | 4 | — | 11th |
| — | 10 | GET FRIENDLY | 1.5% | 9.5% | 15 | ❌ | 5 | — | 9th |
| — | 11 | GOLDEN FRIENDSHIP | 0.7% | 4.5% | 20 | ❌ | 8 | — | 6th |

**Pattern A.** Banker **#2** 4th. Frame **#4,#3,#1** all in the final pool (**#4** replaced **#7** per report). Classic banker wrong, legs right.

### R4 — Class 4 | 1650m Turf | Actual: 7→2→1

**Ticket:** ★ **#5** + legs **#1 → #4 → #7 → #2 → #11** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Place%>20% OR o<10 | Form | Role | Finished |
|-----|---|-------|------|--------|------|---------------------|------|------|----------|
| ★ | 5 | AMAZING AWARD | 29.1% | 67.3% | 8.4 | ✅ | 8 | ★ Banker | **4th** |
| L1 | 1 | ALL ROUND WINNER | 23.8% | 62.0% | 12 | ✅ | 9 | Leg | **3rd** |
| L2 | 4 | AUTOMATED | 19.0% | 52.3% | 32 | ✅ | 4 | Leg | 10th |
| L3 | 7 | GOLDEN BRILLIANT | 13.8% | 45.3% | 2.6 | ✅ | 6 | Leg | **1st** (SP 3.9) |
| L4 | 2 | MIGHTY STEED | 7.8% | 32.5% | 7.6 | ✅ | 8 | Leg | **2nd** |
| L5 | 11 | EXCELLENT BOY | 0.4% | 4.0% | 5.3 | ✅ (o<10) | 6 | Leg | 5th |
| — | 3 | KING OF SELECTION | 0.1% | 1.2% | 71 | ❌ | 5 | — | 12th |
| — | 6 | SMILING ONE | 0.1% | 0.6% | 47 | ❌ | 1 | — | 8th |
| — | 8 | INCANTO STAR | 1.1% | 7.4% | 11 | ❌ | 5 | — | 9th |
| — | 9 | WHOWROTETHATSONG | 0.2% | 2.2% | 85 | ❌ | 3 | — | 7th |
| — | 10 | WINNING DATA | 4.0% | 19.9% | 13 | ❌ | 6 | — | 11th |
| — | 12 | MADE FOR LIFE | 0.8% | 5.4% | 24 | ❌ | 5 | — | 6th |

**Pattern A.** Banker **#5** 4th. **#7,#2,#1** all legs — full frame inside pool.

### R5 — Class 4 | 1200m Turf | Actual: 9→5→6 ✅

**Ticket:** ★ **#5** + legs **#6 → #10 → #2 → #9 → #8 → #7 → #4** | 膽拖 C(7,2) = 21 × $10 = $210

| Seq | # | Horse | Win% | Place% | Odds | Place%>20% OR o<10 | Form | Role | Finished |
|-----|---|-------|------|--------|------|---------------------|------|------|----------|
| ★ | 5 | BRIGHT DAY | 16.4% | 44.2% | 11 | ✅ | 8 | ★ Banker | **2nd** |
| L1 | 6 | FREE PONY | 16.3% | 43.6% | 7.4 | ✅ | 8 | Leg | **3rd** |
| L2 | 10 | STAR FIGURE | 13.4% | 39.4% | 7.5 | ✅ | 5 | Leg | 10th |
| L3 | 2 | MONARCH COUNTY | 13.2% | 38.8% | 2.6 | ✅ | 6 | Leg | 7th |
| L4 | 9 | SMART FIGHTER | 11.8% | 34.6% | 9.3 | ✅ | 5 | Leg | **1st** (SP 4.0) |
| L5 | 8 | MARVEL AND GOLD | 11.3% | 33.6% | 32 | ✅ | 5 | Leg | 8th |
| L6 | 7 | FORERUNNER | 7.4% | 25.2% | 14 | ✅ | 7 | Leg | 4th |
| L7 | 4 | FIND MY LOVE | 7.3% | 24.6% | 15 | ✅ | 6 | Leg | 6th |
| — | 1 | A TIME FOR US | 0.6% | 2.9% | 12 | ❌ | 5 | — | 9th |
| — | 3 | JOKER ORBIT | 1.1% | 5.9% | 23 | ❌ | 5 | — | 11th |
| — | 11 | SAME TO YOU | 1.3% | 7.0% | 15 | ❌ | 9 | — | 5th |
| — | 12 | FLYING CHRISTIE | 0.1% | 0.4% | 42 | ❌ | 5 | — | 12th |

**Hit.** Banker **#5** placed. **#9** and **#6** in frame. Trio **$454** on **$210** → **+$244** on the race.

### R6 — Class 4 | 1200m Turf | Actual: 2→11→1

**Ticket:** ★ **#1** + legs **#2 → #5 → #4 → #6** | 膽拖 C(4,2) = 6 × $10 = $60

| Seq | # | Horse | Win% | Place% | Odds | Place%>20% OR o<10 | Form | Role | Finished |
|-----|---|-------|------|--------|------|---------------------|------|------|----------|
| ★ | 1 | CROSSBORDERDUDE | 55.6% | 90.2% | 3.7 | ✅ | 6 | ★ Banker | **3rd** (SP 3.2) |
| L1 | 2 | SKY CAP | 22.4% | 69.5% | 3.3 | ✅ | 7 | Leg | **1st** (SP 6.5) |
| L2 | 5 | HAPPY BRETHREN | 10.5% | 51.1% | 6.2 | ✅ | 2 | Leg | 5th |
| L3 | 4 | TACTICAL COMMAND | 5.8% | 35.2% | 14 | ✅ | 8 | Leg | 6th |
| L4 | 6 | LUCKY MCQUEEN | 1.1% | 13.2% | 9.1 | ✅ (o<10) | 8 | Leg | 4th |
| — | 3 | BIGTIME GENERATION | 3.2% | 23.1% | 32 | ✅ | 8 | — (replaced by #6) | 8th |
| — | 7 | AWESOME TREASURE | 0.0% | 0.9% | 28 | ❌ | 11 | — | 12th |
| — | 8 | GLACIATED | 0.4% | 4.8% | 44 | ❌ | 9 | — | 7th |
| — | 9 | GRAND MASTERMIND | 0.3% | 4.3% | 40 | ❌ | 3 | — | 11th |
| — | 10 | FLASH STAR | 0.2% | 2.9% | 16 | ❌ | 9 | — | 9th |
| — | 11 | GAMEPLAYER ELITE | 0.2% | 3.2% | 15 | ❌ | 7 | — | **2nd** (SP 4.2) |
| — | 12 | FALCON HUNTER | 0.1% | 1.6% | 14 | ❌ | 5 | — | 10th |

**Pattern B.** Banker **#1** 3rd. **#11** (2nd) **not** in the final 4-leg pool (**#6** replaced **#3**).

### R7 — Class 3 | 1650m Turf | Actual: 1→2→9

**Ticket:** ★ **#1** + legs **#8 → #3 → #2** (replaced **#5**) | 膽拖 C(3,2) = 3 × $10 = $30

| Seq | # | Horse | Win% | Place% | Odds | Place%>20% OR o<10 | Form | Role | Finished |
|-----|---|-------|------|--------|------|---------------------|------|------|----------|
| ★ | 1 | SILVERY BREEZE | 71.5% | 95.1% | 4.4 | ✅ | 6 | ★ Banker | **1st** (SP 4.2) |
| L1 | 8 | STORMI | 12.1% | 60.9% | 9 | ✅ | 7 | Leg | 4th |
| L2 | 3 | NATURAL NUMBERS | 8.5% | 50.7% | 25 | ✅ | 5 | Leg | 10th |
| L3 | 2 | SKY VINO | 1.8% | 19.6% | 3.0 | ✅ (o<10) | 9 | Leg | **2nd** |
| — | 4 | NOISY BOY | 0.5% | 9.5% | 12 | ❌ | 8 | — | 5th |
| — | 5 | VIVA GRACIOUSNESS | 3.1% | 26.8% | 12 | ✅ | 8 | — (replaced by #2) | 8th |
| — | 6 | SUPER UNICORN | 1.2% | 14.8% | 17 | ❌ | 8 | — | 9th |
| — | 7 | ROMANTIC GLADIATOR | 0.6% | 9.1% | 16 | ❌ | 2 | — | 6th |
| — | 9 | VIOLET STAR | 0.1% | 1.8% | 7.9 | ✅ (o<10)* | 4 | — | **3rd** |
| — | 10 | LUCKY TWIN STARS | 0.2% | 4.6% | 20 | ❌ | 6 | — | 7th |
| — | 11 | MISSION GIANT | 0.3% | 5.6% | 36 | ❌ | 0 | — | 12th |
| — | 12 | ALLCASH | 0.1% | 1.5% | 35 | ❌ | 6 | — | 11th |

\*MC report flags odds&lt;10, but **#9** was **not** on the final Strategy B ticket — see `trio_strategy_20260408_HV_R7.md`.

**Pattern B.** Banker won. **#9** (3rd) missing from the **3-combo** pool — see `trio_strategy_20260408_HV_R7.md`.

### R8 — Class 3 | 1200m Turf | Actual: 4→12→6

**Ticket:** ★ **#1** + legs **#2 → #7 → #3 → #4 → #10** (**#10** replaced **#6**) | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Place%>20% OR o<10 | Form | Role | Finished |
|-----|---|-------|------|--------|------|---------------------|------|------|----------|
| ★ | 1 | CELESTIAL HERO | 35.7% | 74.2% | 11 | ✅ | 5 | ★ Banker | **8th** |
| L1 | 2 | KING MILES | 30.7% | 69.4% | 18 | ✅ | 7 | Leg | 12th |
| L2 | 7 | POWER KOEPP | 10.5% | 41.9% | 11 | ✅ | 10 | Leg | 6th |
| L3 | 3 | WONDER KIT | 10.4% | 41.0% | 15 | ✅ | 10 | Leg | 10th |
| L4 | 4 | PERFECT GENERAL | 4.0% | 22.6% | 2.9 | ✅ | 5 | Leg | **1st** (SP 2.5) |
| L5 | 10 | SPIRIT OF PEACE | 0.9% | 7.1% | 6.4 | ✅ (o<10) | 11 | Leg | 4th |
| — | 5 | EXCEED THE LIMIT | 0.3% | 3.0% | 13 | ❌ | 1 | — | 5th |
| — | 6 | GUMMY GUMMY | 5.4% | 26.5% | 18 | ✅ | 7 | — (replaced by #10) | **3rd** |
| — | 8 | SPICY GOLD | 2.0% | 11.9% | 12 | ❌ | 8 | — | 11th |
| — | 9 | ACE CHAMPION | 0.1% | 1.7% | 13 | ❌ | 3 | — | 7th |
| — | 11 | CHEAHA | 0.0% | 0.4% | 27 | ❌ | 7 | — | 9th |
| — | 12 | THRIVING BROTHERS | 0.0% | 0.2% | 10 | ❌ | 10 | — | **2nd** |

**Pattern C + near Pattern A.** Banker **#1** failed. **#12** (2nd) at odds **10** — strictly not &lt;10. **#6** would have been a leg before the swap.

### R9 — Class 3 | 1200m Turf | Actual: 1→2→12

**Ticket:** ★ **#3** + legs **#12 → #1 → #2 → #4 → #10 → #7** (**#10** replaced **#6**) | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Place%>20% OR o<10 | Form | Role | Finished |
|-----|---|-------|------|--------|------|---------------------|------|------|----------|
| ★ | 3 | RED SEA | 31.9% | 68.3% | 10 | ✅ | 2 | ★ Banker | **11th** |
| L1 | 12 | MEOWTH | 18.8% | 53.7% | 6.2 | ✅ | 7 | Leg | **3rd** |
| L2 | 1 | SIGHT HERMOSO | 18.0% | 52.6% | 6.4 | ✅ | 9 | Leg | **1st** (SP 3.4) |
| L3 | 2 | HARMONY N BLESSED | 11.7% | 38.2% | 19 | ✅ | 14 | Leg | **2nd** |
| L4 | 4 | MIGHTY COMMANDER | 10.2% | 38.2% | 3.3 | ✅ | 9 | Leg | 8th |
| L5 | 10 | KING OF FIGHTERS | 0.1% | 1.2% | 5.9 | ✅ (o<10) | 4 | Leg | 9th |
| L6 | 7 | WINGS OF WAR | 2.8% | 14.5% | 9.9 | ✅ (o<10) | 6 | Leg | 7th |
| — | 5 | SUPER JOY N FUN | 0.1% | 0.9% | 45 | ❌ | 7 | — | 4th |
| — | 6 | FLYING WROTE | 5.4% | 24.6% | 17 | ✅ | 8 | — (replaced by #10) | 5th |
| — | 8 | FLYING HUNTER | 0.2% | 2.1% | 27 | ❌ | 0 | — | 12th |
| — | 9 | VULCANUS | 0.0% | 0.3% | 35 | ❌ | 12 | — | 10th |
| — | 11 | PRESTIGE ALWAYS | 0.8% | 5.4% | 25 | ❌ | 7 | — | 6th |

**Pattern A.** Banker **#3** out. **#1,#2,#12** all legs — **$959** Trio left on the table by banker failure.

---

## Hit Detail (1 hit)

### R5 ✅ — Trio $454 | Stake $210 | P&L +$244

**Full suggestion** — same **Seq** order as R5 merged table / `trio_strategy_20260408_HV_R5.md` final legs (**#6→#10→#2→#9→#8→#7→#4**).

| Seq | # | Horse | MC Win% | MC Place% | Odds | Role | Finished |
|-----|---|-------|---------|-----------|------|------|----------|
| ★ | 5 | BRIGHT DAY | 16.4% | 44.2% | 11 | ★ Banker | **2nd** |
| L1 | 6 | FREE PONY | 16.3% | 43.6% | 7.4 | Leg | **3rd** |
| L2 | 10 | STAR FIGURE | 13.4% | 39.4% | 7.5 | Leg | 10th |
| L3 | 2 | MONARCH COUNTY | 13.2% | 38.8% | 2.6 | Leg | 7th |
| L4 | 9 | SMART FIGHTER | 11.8% | 34.6% | 9.3 | Leg | **1st** |
| L5 | 8 | MARVEL AND GOLD | 11.3% | 33.6% | 32 | Leg | 8th |
| L6 | 7 | FORERUNNER | 7.4% | 25.2% | 14 | Leg | 4th |
| L7 | 4 | FIND MY LOVE | 7.3% | 24.6% | 15 | Leg | 6th |

**Paying frame (1→2→3):** #9 · #5 · #6 — all on the ticket.

Only hit of the meeting. **Raw MC #5** as banker matched the frame; Strategy A had used **Adj** banker **#2 MONARCH COUNTY** (unplaced) — see `trio_review_20260408_HV.md`.

---

## Banker Performance

| Race | Banker | MC Place% | MC Win% | Odds (early) | Finished | Placed? |
|------|--------|-----------|---------|--------------|----------|---------|
| R1 | #10 ALWAYS MY FOLKS | 68.6% | 27.9% | 9.1 | **12th** | ❌ |
| R2 | #5 FORTUNE STAR | 82.1% | 40.0% | 6.8 | 4th | ❌ |
| R3 | #2 BEAUTY THUNDER | 69.4% | 31.9% | 13 | 4th | ❌ |
| R4 | #5 AMAZING AWARD | 67.3% | 29.1% | 8.4 | 4th | ❌ |
| R5 | #5 BRIGHT DAY | 44.2% | 16.4% | 11 | 2nd | ✅ |
| R6 | #1 CROSSBORDERDUDE | 90.2% | 55.6% | 3.7 | 3rd | ✅ |
| R7 | #1 SILVERY BREEZE | 95.1% | 71.5% | 4.4 | 1st | ✅ |
| R8 | #1 CELESTIAL HERO | 74.2% | 35.7% | 11 | **8th** | ❌ |
| R9 | #3 RED SEA | 68.3% | 31.9% | 10 | **11th** | ❌ |
| **TOTAL** | | **avg 73.7%** | | | | **3/9 (33.3%)** |

Worst banker session in the 7-meeting Strategy B series tracked alongside `trio_review_stratC_20260406_ST.md` cumulative table. High average MC Place% on the **banker** did not translate to top-3 finishes.

---

## Why “Place%>20% OR odds<10” on this card?

| Race | Notable odds&lt;10 / swap legs | Outcome |
|------|-------------------------------|---------|
| R1 | #1, #3 | **#1 won** — in pool; still miss (#7 gap, banker dead) |
| R2 | #3, #12 | #12 2nd; **#10** 3rd not in pool |
| R3 | #3, #12, #4 in pool | Frame covered; banker miss |
| R4 | #11 | 5th — no impact |
| R5 | — | Hit without relying on low-MC o<10 rescue |
| R6 | #6 for #3 | #6 4th; **#11** gap |
| R7 | #2 for #5 | #2 2nd; **#9** gap (final pool only 3 legs) |
| R8 | #10 for #6 | Removed **#6** from legs; **#6** ran 3rd |
| R9 | #10, #7 | #10 9th, #7 7th; banker miss |

**R8** is the clearest **swap regret**: keeping **#6 GUMMY GUMMY** in the pool would have captured the **$248** Trio (with **#12** still missing unless odds≤10 rule is relaxed).

---

## Comparison: Strategy B vs Strategy A (Full Pipeline)

| Metric | Strategy B | Strategy A |
|--------|------------|------------|
| Hits | **1/9** | **0/9** |
| Staked | $1,050 | $870 |
| Returned | $454 | $0 |
| P&L | **−$596** | **−$870** |
| ROI | **−56.8%** | **−100%** |
| Banker | MC Win% #1 | Adj Win% #1 |

Strategy B dominated on **hit rate**, **return**, and **ROI**; both sessions lost. **R5** is the divergence: **B**’s MC banker **#5** placed; **A**’s Adj banker **#2** did not.

---

## Comparison: Strategy B vs Place%>20% only (illustrative)

| Race | Place%>20% legs only (excl. banker) | Combos | Stake | With odds&lt;10 / swaps | Combos | Stake |
|------|-----------------------------------|--------|-------|-------------------------|--------|-------|
| R1 | 4 | 6 | $60 | +#1,#3 | 15 | $150 |
| R2 | 4 | 6 | $60 | +#3,#12 | 10 | $100 |
| R3 | 4 | 6 | $60 | +#3,#12,#4 | 15 | $150 |
| R4 | 4 | 6 | $60 | +#11 | 10 | $100 |
| R5 | 7 | 21 | $210 | same | 21 | $210 |
| R6 | 4 | 6 | $60 | +#6 vs #3 | 6 | $60 |
| R7 | 3 | 3 | $30 | +#2 swap | 3 | $30 |
| R8 | 5 | 10 | $100 | +#10 swap | 10 | $100 |
| R9 | 5 | 10 | $100 | +#10,#7 | 15 | $150 |

Same **1/9** hit if odds&lt;10 is stripped **only** where it didn’t change membership (R5 unchanged); **R1** would likely still miss without **#1** in pool. The extra cost vs **A** is the main drag when hits are rare.

---

## Cumulative: Strategy B across meetings

| Meeting | Date | Venue | Races | Hits | Staked | Returned | P&L | ROI | Banker top 3 |
|---------|------|-------|-------|------|--------|----------|-----|-----|--------------|
| 1 | 18 Mar | HV | 9 | 4/9 | $1,270 | $1,094 | −$176 | −13.9% | 7/9 |
| 2 | 22 Mar | ST | 10 | 4/10 | $1,260 | $964 | −$296 | −23.5% | 7/10 |
| 3 | 25 Mar | HV | 9 | 4/9 | $1,620 | $1,376 | −$244 | −15.1% | 6/9 |
| 4 | 29 Mar | ST | 11 | 2/11 | $1,470 | $299 | −$1,171 | −79.7% | 7/11 |
| 5 | 1 Apr | ST | 9 | 2/9 | $1,300 | $340 | −$960 | −73.8% | 4/9 |
| 6 | 6 Apr | ST | 11 | 3/11 | $1,200 | $551 | −$649 | −54.1% | 8/11 |
| **7** | **8 Apr** | **HV** | **9** | **1/9** | **$1,050** | **$454** | **−$596** | **−56.8%** | **3/9** |
| **TOTAL** | | | **68** | **20/68** | **$9,170** | **$5,078** | **−$4,092** | **−44.6%** | **42/68 (61.8%)** |

---

## Lessons

1. **Banker strike 3/9** — far below Meeting 6’s **8/11**. MC #1 on this HV card was not a reliable anchor despite **73.7%** average MC Place% on the banker line-up.

2. **R1 longshot** — **#1 DECISION LINK** in the pool via **odds&lt;10** **won** at SP 5.3 while **#10** (banker) ran **12th** — extreme tail risk on “favourite” banker selection.

3. **R8 swap hurt** — Replacing **#6** with **#10** removed the horse that finished **3rd**; **#12** at odds **10** sat outside **odds&lt;10**. A **≤10** rule or **no swap** would need testing.

4. **R9 Pattern A** — **#1·#2·#12** all in legs, **$959** Trio, banker **#3** ran **11th**. Same structural ceiling as ST R8/R9 on 6 Apr.

5. **Cumulative** — **−$4,092** over **68** races (**−44.6%** ROI); **M7** similar ROI to **M6** (−54% vs −57%) but fewer races and only one hit.

---

## Action Items

- [x] Fetch **8 Apr 2026 HV** results → `data/historical/results_20260408_HV.json`
- [x] Expand this review to **match 6 Apr ST Strategy B format** (full tables + cumulative + lessons)
- [ ] Test **odds ≤ 10** on HV-style cards (would add **#12** R8)
- [ ] Revisit **R7** Strategy B **3-leg** finalisation — **#9 VIOLET STAR** (7.9 odds) was not in the final ticket despite literal odds&lt;10; align code with stated union rule or document the exception
- [ ] Update `trio_review_20260408_HV.md` cross-links if sections move

---

## Cross-reference

| File | Role |
|------|------|
| `trio_review_20260408_HV.md` | Strategy A post-race review |
| `trio_review_stratC_20260406_ST.md` | Strategy B template / prior cumulative |
| `data/reports/trio_strategy_20260408_HV_R1.md` … `R9.md` | Pre-race MC + ticket definitions |
