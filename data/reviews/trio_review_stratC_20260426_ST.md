# Strategy B Review — MC #1 banker + primary Place%>20% + win-odds add/swap (trio SKILL) | Sha Tin | 26 Apr 2026

## Rules

- **Banker**: MC **#1** by MC Win% (same as "MC #1" in reports).
- **Primary legs**: all other runners with **MC Place% > 20%** (banker excluded).
- **Step B (win odds < 10, Place% ≤ 20%)**: **replace** one primary leg when the SKILL swap rule fires; otherwise **add** short-priced tails (see each `trio_strategy_20260426_ST_R*.md`).
- **Data**: `--form-data all` (all-venue history); `--ignore-records 20260426`; HKJC win odds from reports at generation time.
- **Bet type**: Trio (單T) — top 3 in **any** order.
- **Unit**: **$10** per combination; structure **膽拖** 1 banker + N legs → **C(N, 2)** combos.

**Stake convention (this review):** **Full Strategy B** = the published **final legs** after Step B in each report.

**Note:** This is the **trio-strategy SKILL** Strategy B pipeline (**MC-only**), **not** Strategy A (Adj Win/Place + jockey + SCMP + Modes A–B).

**Pre-race definitions:** `data/reports/trio_strategy_20260426_ST_R1.md` … `R11.md` (regenerated with `--ignore-records 20260426`).

**Results source:** `data/historical/results_20260426_ST.json`. **Finished** + **SP** = `winOdds` on each finisher row. **MC % / odds** from the trio reports.

---

## Summary

| Metric | Value |
|--------|-------|
| Races played | **11 (R1–R11)** |
| Hit rate (B) | **2/11 (18.2%)** |
| Total staked (B) | **$1,190** |
| Total returned (B) | **$342** |
| **Net P&L (B)** | **−$848** |
| **ROI (B)** | **−71.3%** |
| Hit rate (A) | **1/11 (9.1%)** |
| Total staked (A) | **$710** |
| Total returned (A) | **$166** |
| **Net P&L (A)** | **−$544** |
| **ROI (A)** | **−76.6%** |
| Session Result | **LOSS (both)** |

---

## Race-by-Race Results

### Strategy B

| Race | Class | Dist | Surf | Banker (MC#1) | Final legs (after Step B) | Combos | Stake | Result (1→2→3) | Banker top 3? | Hit? | Trio $ | Return | P&L |
|------|-------|------|------|---------------|---------------------------|--------|-------|----------------|---------------|------|--------|--------|-----|
| R1 | C4 | 1200m | Turf | #5 THE HEIR (47.1W/86.3P) | #11,#2,#13,#9,#1 | 10 | $100 | 13→9→10 | 5th ❌ | ❌ | $640 | $0 | −$100 |
| R2 | C4 | 1600m | Turf | #6 BIG RETURN (28.7W/63.9P) | #7,#4,#1,#9,#11 | 10 | $100 | 6→7→1 | 1st ✅ | **✅** | $166 | $166 | +$66 |
| R3 | C4 | 1200m | Turf | #13 BETTER AND BETTER (34.3W/70.3P) | #3,#4,#14,#2,#1,#9 | 15 | $150 | 2→13→6 | 2nd ✅ | ❌ | $243 | $0 | −$150 |
| R4 | C4 | 1400m | Turf | #5 KING DANCE (36.1W/74.4P) | #3,#7,#4,#10,#9,#12 | 15 | $150 | 5→4→14 | 1st ✅ | ❌ | $4,397 | $0 | −$150 |
| R5 | G1 | 1200m | Turf | #1 KA YING RISING (37.1W/75.8P) | #3,#4,#7,#5,#8 | 10 | $100 | 1→2→5 | 1st ✅ | ❌ | $208 | $0 | −$100 |
| R6 | C3 | 1200m | Turf | #6 LIFELINE EXPRESS (32.2W/71.4P) | #5,#3,#13,#4,#2,#8 | 15 | $150 | 4→13→14 | 11th ❌ | ❌ | $787 | $0 | −$150 |
| R7 | G1 | 1600m | Turf | #10 INVINCIBLE IBIS (24.1W/57.2P) | #12,#4,#5,#14,#1 | 10 | $100 | 5→9→3 | 4th ❌ | ❌ | $6,045 | $0 | −$100 |
| R8 | C3 | 1400m | Turf | #10 AEROINVINCIBLE (48.2W/83.0P) | #1,#9,#4,#7 | 6 | $60 | 9→1→4 | 4th ❌ | ❌ | $526 | $0 | −$60 |
| R9 | G1 | 2000m | Turf | #2 ROMANTIC WARRIOR (49.5W/92.2P) | #8,#7,#1 | 3 | $30 | 2→1→4 | 1st ✅ | ❌ | $35 | $0 | −$30 |
| R10 | C3 | 1600m | Turf | #9 THE GOLDEN KNIGHT (42.7W/78.2P) | #5,#8,#13,#10,#3,#6 | 15 | $150 | 8→5→3 | 11th ❌ | ❌ | $484 | $0 | −$150 |
| R11 | C2 | 1400m | Turf | #12 MIGHTY MASTS (51.2W/83.9P) | #9,#11,#7,#2,#5 | 10 | $100 | 5→9→12 | 3rd ✅ | **✅** | $176 | $176 | +$76 |
| **TOTAL** | | | | | | **119** | **$1,190** | | **6/11 ✅** | **2/11** | | **$342** | **−$848** |

### Strategy A

| Race | Class | Mode | Banker(s) | Legs | Combos | Stake | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|--------|-------|----------------|------|--------|--------|-----|-------------|
| R1 | C4 | A 雙膽拖 | #5+#11 | #2,#4,#13 | 3 | $30 | 13→9→**10** | ❌ | $640 | $0 | −$30 | C: both bankers fail + gaps #9,#10 |
| R2 | C4 | B 膽拖 | #6 | #7,#4,#1,#8,#11 | 10 | $100 | 6→7→1 | **✅** | $166 | $166 | +$66 | — |
| R3 | C4 | B 膽拖 | #13 | #3,#4,#14,#2,#1 | 10 | $100 | 2→13→**6** | ❌ | $243 | $0 | −$100 | B: banker hit, gap #6 SOLID CAR |
| R4 | C4 | A 雙膽拖 | #5+#3 | #7,#4,#14 | 3 | $30 | 5→4→14 | ❌ | $4,397 | $0 | −$30 | **A: all 3 in pool! 雙膽拖 killed it (#3 7th)** |
| R5 | G1 | B 膽拖 | #1 | #3,#4,#7,#5,#8 | 10 | $100 | 1→**2**→5 | ❌ | $208 | $0 | −$100 | B: banker hit, gap #2 SATONO REVE |
| R6 | C3 | B 雙膽拖 | #6+#5 | #3,#13,#8,#9 | 4 | $40 | **4**→13→**14** | ❌ | $787 | $0 | −$40 | C: both bankers fail + gaps |
| R7 | G1 | B 膽拖 | #10 | #4,#5,#14,#12,#7 | 10 | $100 | 5→**9**→**3** | ❌ | $6,045 | $0 | −$100 | C: banker fail + gaps #9,#3 |
| R8 | C3 | A 膽拖 | #10 | #1,#9,#4,#7 | 6 | $60 | 9→1→4 | ❌ | $526 | $0 | −$60 | **A: all 3 in legs, banker #10 4th** |
| R9 | G1 | A 雙膽拖 | #2+#8 | #7,#4,#3 | 3 | $30 | 2→**1**→4 | ❌ | $35 | $0 | −$30 | C: banker2 #8 fail + gap #1 |
| R10 | C3 | A 膽拖 | #9 | #5,#8,#13,#4 | 6 | $60 | 8→5→**3** | ❌ | $484 | $0 | −$60 | C: banker fail + gap #3 |
| R11 | C2 | A 膽拖 | #12 | #9,#11,#7,#2 | 6 | $60 | **5**→9→12 | ❌ | $176 | $0 | −$60 | B: banker hit, gap #5 |
| **TOTAL** | | | | | **71** | **$710** | | **1/11** | | **$166** | **−$544** | |

---

## Full MC Place% Table (ticket horses + field)

*Odds* = pre-race HKJC win odds from `data/reports/trio_strategy_20260426_ST_R*.md`. **Finished** + **SP** from `data/historical/results_20260426_ST.json`.

**Row order:** **★** banker, then legs **L1, L2, …** in **final Strategy B leg order**, then **—** other starters by saddle #.

**Column "Pool":** **✅** = on final Strategy B ticket (primary **P>20%** or Step B add/swap).

### R1 — Class 4 | 1200m Turf | Actual: 13→9→10 ❌

**Ticket:** ★ **#5** + legs **#11 → #2 → #13 → #9 → #1** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 5 | THE HEIR | 47.1% | 86.3% | 8.6 | ✅ | 11 | ★ Banker | 5th (SP 8.6) |
| L1 | 11 | PRESTIGE HALL | 22.0% | 68.0% | 3.3 | ✅ | 7 | Leg | 8th (SP 3.3) |
| L2 | 2 | A TIME FOR US | 19.0% | 63.1% | 28 | ✅ | 6 | Leg | 7th (SP 28) |
| L3 | 13 | PACKING KING | 3.0% | 21.1% | 3.3 | ✅ | 3 | Leg | **1st** (SP 3.3) |
| L4 | 9 | LUCRATIVE EIGHT | 0.2% | 3.9% | 4.8 | ✅ (w<10 replaced #4) | 1 | Leg | **2nd** (SP 4.8) |
| L5 | 1 | MATZDEN | 0.1% | 1.0% | 9.4 | ✅ (w<10 added) | 4 | Leg | 4th (SP 9.4) |
| — | 4 | LUCKY TWENTY | 5.3% | 29.1% | 75 | ❌ (swapped out) | 5 | — | 11th (SP 75) |
| — | 10 | NAVAS G | 0.1% | 1.3% | 16 | ❌ | 0 | — | **3rd** (SP 16) |
| — | 14 | I EXCELLE | 2.8% | 18.3% | 182 | ❌ | 4 | — | 13th (SP 182) |
| — | 3 | AKERMANIS GOLD | 0.2% | 3.2% | 42 | ❌ | 5 | — | 9th (SP 42) |
| — | 12 | BEAUTY GEMINI | 0.1% | 1.3% | 91 | ❌ | 2 | — | 10th (SP 91) |
| — | 6 | BRILLIANT WINNER | 0.1% | 1.2% | 271 | ❌ | 1 | — | 14th (SP 271) |
| — | 7 | GUTSY BRAVO | 0.1% | 1.1% | 55 | ❌ | 0 | — | 6th (SP 55) |
| — | 8 | HIGH RISE VICTORY | 0.0% | 1.1% | 96 | ❌ | 0 | — | 12th (SP 96) |

**Pattern C — banker fail + pool gap.** **#5** THE HEIR (Moreira, MC dominant at 47.1% Win) faded to 5th at unchanged SP — the biggest banker failure of the day. **#13** PACKING KING (Purton, Step B primary leg at 21.1% MC Place) won at 3.3 SP; **#9** LUCRATIVE EIGHT (Step B swap, 1 form line) ran 2nd at 4.8 — both on the ticket. But **#10** NAVAS G (debutant, 0 form, 16 SP) ran **3rd** from outside the pool. MC had 1.3% Place on zero form lines — an unfixable debutant blind spot. Step B correctly captured #9 and #1 (4th at 9.4 SP) — the swap of #4 LUCKY TWENTY (11th) was irrelevant.

### R2 — Class 4 | 1600m Turf | Actual: 6→7→1 ✅

**Ticket:** ★ **#6** + legs **#7 → #4 → #1 → #9 → #11** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 6 | BIG RETURN | 28.7% | 63.9% | 4.9 | ✅ | 7 | ★ Banker | **1st** (SP 3.6) |
| L1 | 7 | JOLLY BRILLIANT | 20.4% | 53.2% | 6.3 | ✅ | 5 | Leg | **2nd** (SP 3.4) |
| L2 | 4 | AESTHETICISM | 17.3% | 49.0% | 31 | ✅ | 11 | Leg | 9th (SP 28) |
| L3 | 1 | TURIN CHAMPIONS | 13.5% | 42.9% | 7.1 | ✅ | 6 | Leg | **3rd** (SP 8.7) |
| L4 | 9 | CIRCUIT MARSHAL | 1.3% | 8.0% | 7.9 | ✅ (w<10 replaced #8) | 4 | Leg | 7th (SP 9.9) |
| L5 | 11 | SMILING FALCON | 3.4% | 17.1% | 8.6 | ✅ (w<10 added) | 7 | Leg | 8th (SP 14) |
| — | 8 | AMAZING AWARD | 8.0% | 28.3% | 12 | ❌ (swapped out) | 9 | — | 5th (SP 19) |
| — | 10 | TYCOON EXPRESS | 3.2% | 15.4% | 24 | ❌ | 3 | — | 12th (SP 24) |
| — | 3 | FAMILY KNIGHT | 2.8% | 13.3% | 19 | ❌ | 6 | — | 4th (SP 33) |
| — | 12 | AMAZING FUN | 0.7% | 3.5% | 28 | ❌ | 10 | — | 10th (SP 99) |
| — | 2 | SHAMZ | 0.4% | 2.9% | 10 | ❌ | 7 | — | 14th (SP 15) |
| — | 5 | MASSIVE GLORY | 0.1% | 1.4% | 19 | ❌ | 1 | — | 11th (SP 30) |
| — | 13 | FLYING AMANI | 0.1% | 1.1% | 22 | ❌ | 5 | — | 6th (SP 18) |
| — | 14 | SPECIAL HEDGE | 0.0% | 0.0% | 26 | ❌ | 9 | — | 13th (SP 25) |

**Hit.** Banker **#6** BIG RETURN (MC 28.7%, 3.6 SP) won. **#7** JOLLY BRILLIANT (primary leg, 3.4 SP) ran 2nd; **#1** TURIN CHAMPIONS (primary leg, 8.7 SP) ran 3rd. Line **6-7-1** pays **$166**. The `--ignore-records` fix was critical: old MC had #4 AESTHETICISM as banker (who ran 9th). New MC correctly moved #6 to the top on 28.7% Win. Step B's swap of #8 AMAZING AWARD (5th) for #9 CIRCUIT MARSHAL (7th) was neutral — both missed the frame. Strategy A also hit with identical combo.

### R3 — Class 4 | 1200m Turf | Actual: 2→13→6 ❌

**Ticket:** ★ **#13** + legs **#3 → #4 → #14 → #2 → #1 → #9** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 13 | BETTER AND BETTER | 34.3% | 70.3% | 9.9 | ✅ | 8 | ★ Banker | **2nd** (SP 6.2) |
| L1 | 3 | HAYDAY | 21.6% | 56.1% | 11 | ✅ | 8 | Leg | 5th (SP 20) |
| L2 | 4 | GOLDENTRONICMIGHTY | 15.2% | 46.3% | 26 | ✅ | 9 | Leg | 9th (SP 76) |
| L3 | 14 | MAJESTIC LIFE | 8.8% | 31.8% | 96 | ✅ | 4 | Leg | 7th (SP 39) |
| L4 | 2 | MR INCREDIBLE | 7.5% | 30.4% | 7.5 | ✅ | 2 | Leg | **1st** (SP 5.2) |
| L5 | 1 | ABSOLUTE HEART | 1.3% | 8.6% | 2.9 | ✅ (w<10 replaced #6) | 1 | Leg | 8th (SP 2.4) |
| L6 | 9 | HAPPY PROMISE | 0.1% | 1.4% | 6.7 | ✅ (w<10 added) | 0 | Leg | 4th (SP 10) |
| — | 6 | SOLID CAR | 6.3% | 26.5% | 11 | ❌ (swapped out) | 3 | — | **3rd** (SP 6.8) |
| — | 5 | OLDTOWN | 3.0% | 14.6% | 14 | ❌ | 5 | — | 6th (SP 20) |
| — | 12 | PRECISION MIND | 0.6% | 4.8% | 28 | ❌ | 1 | — | 12th (SP 102) |
| — | 10 | JACKSON HABIT | 0.5% | 3.3% | 33 | ❌ | 1 | — | 13th (SP 153) |
| — | 8 | CLASSIC TRIPLE | 0.5% | 3.4% | 86 | ❌ | 1 | — | 14th (SP 238) |
| — | 11 | MASSIVE REWARD | 0.2% | 1.2% | 11 | ❌ | 0 | — | 11th (SP 30) |
| — | 7 | APEX GLORY | 0.1% | 1.3% | 31 | ❌ | 0 | — | 10th (SP 51) |

**Pattern B — banker hit, pool gap + Step B swap damage.** **#13** placed 2nd ✅; **#2** MR INCREDIBLE (primary leg) won ✅. But **#6** SOLID CAR (3rd, 6.8 SP) was the **swapped-out horse** — Step B replaced #6 (MC 26.5% Place, 11 odds) with #1 ABSOLUTE HEART (2.9 odds, ran 8th). Without the swap, combo **13-2-6** would have been on the ticket → $243 collected. Additionally, SOLID CAR carried a **-injury30d** penalty in Strategy A (trachea blood), which Strategy B doesn't apply but the odds-rule replacement of #6 happened regardless because #6 was the weakest replaceable (20–30% Place, odds >10). The swap cost $243.

### R4 — Class 4 | 1400m Turf | Actual: 5→4→14 ❌

**Ticket:** ★ **#5** + legs **#3 → #7 → #4 → #10 → #9 → #12** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 5 | KING DANCE | 36.1% | 74.4% | 5.9 | ✅ | 6 | ★ Banker | **1st** (SP 6.1) |
| L1 | 3 | ROBOT STAR | 31.4% | 69.7% | 8 | ✅ | 6 | Leg | 7th (SP 8.9) |
| L2 | 7 | WARRIORS DREAM | 10.1% | 40.3% | 40 | ✅ | 7 | Leg | 13th (SP 25) |
| L3 | 4 | NYX GLUCK | 5.6% | 26.1% | 7.8 | ✅ | 9 | Leg | **2nd** (SP 11) |
| L4 | 10 | PHOENIX LIGHT | 4.5% | 23.6% | 10 | ✅ | 4 | Leg | 8th (SP 28) |
| L5 | 9 | DAILY ACCLAIM | 0.5% | 4.3% | 4.7 | ✅ (w<10 replaced #14) | 2 | Leg | 11th (SP 5.6) |
| L6 | 12 | ACE | 3.0% | 16.2% | 6.4 | ✅ (w<10 added) | 6 | Leg | 4th (SP 4.5) |
| — | 14 | STAR FIGURE | 4.8% | 22.1% | 46 | ❌ (swapped out) | 6 | — | **3rd** (SP 54) |
| — | 13 | CALIFORNIA BAY | 3.7% | 18.3% | 19 | ❌ | 11 | — | 9th (SP 6.5) |
| — | 1 | STAR MAC | 0.3% | 3.6% | 12 | ❌ | 5 | — | 5th (SP 13) |
| — | 6 | POET'S REIGN | 0.0% | 0.4% | 21 | ❌ | 2 | — | 10th (SP 45) |
| — | 11 | LUCKY BALERION | 0.0% | 0.4% | 19 | ❌ | 2 | — | 6th (SP 10) |
| — | 2 | JOLTIN | 0.0% | 0.1% | 85 | ❌ | 4 | — | 14th (SP 285) |
| — | 8 | GREEN ANGEL | 0.0% | 0.2% | 28 | ❌ | 0 | — | 12th (SP 56) |

**Pattern B — banker hit, pool gap — the most costly single miss ($4,397).** **#5** KING DANCE won ✅; **#4** NYX GLUCK (primary leg) ran 2nd ✅. But **#14** STAR FIGURE (3rd, 54 SP) was the **swapped-out horse** — Step B replaced #14 (MC 22.1% Place, 46 odds) with #9 DAILY ACCLAIM (Moreira, 4.7 odds, 2 form lines) who ran 11th. Combo **5-4-14** was on the primary pool before the swap and would have paid **$4,397**. Step B's second add #12 ACE (4th, 4.5 SP) ran close but wasn't a placer. **This is Step B's worst single-race outcome in the entire campaign.** Strategy A had an even worse structural problem: 雙膽拖 with #5+#3 as co-bankers included #14, but #3 (7th) killed all combos.

### R5 — Group 1 | 1200m Turf | Actual: 1→2→5 ❌

**Ticket:** ★ **#1** + legs **#3 → #4 → #7 → #5 → #8** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 1 | KA YING RISING | 37.1% | 75.8% | 1.0 | ✅ | 6 | ★ Banker | **1st** (SP 1.0) |
| L1 | 3 | HELIOS EXPRESS | 15.1% | 51.5% | 106 | ✅ | 6 | Leg | 6th (SP 135) |
| L2 | 4 | FAST NETWORK | 14.8% | 50.4% | 273 | ✅ | 8 | Leg | 4th (SP 199) |
| L3 | 7 | TOMODACHI KOKOROE | 13.3% | 45.9% | 287 | ✅ | 10 | Leg | 7th (SP 410) |
| L4 | 5 | RAGING BLIZZARD | 10.4% | 39.1% | 167 | ✅ | 8 | Leg | **3rd** (SP 345) |
| L5 | 8 | BEAUTY WAVES | 9.3% | 35.8% | 190 | ✅ | 10 | Leg | 8th (SP 440) |
| — | 2 | SATONO REVE | 0.1% | 0.9% | 74 | ❌ | 1 | — | **2nd** (SP 90) |
| — | 6 | COMANCHE BRAVE | 0.1% | 0.6% | 229 | ❌ | 0 | — | 5th (SP 367) |

**Pattern B — banker hit, G1 structural gap.** **#1** KA YING RISING won at 1.0 SP ✅; **#5** RAGING BLIZZARD (primary leg) ran 3rd ✅. But **#2** SATONO REVE (Japanese raider, 90 SP, MC 0.9% Place on 1 HK form line) ran **2nd** — a deep import blind spot. No Step B candidate existed: #2's win odds (74) were far above the <10 threshold. Both A and B shared this gap. G1 sprints with overseas raiders expose the MC's "HK form only" limitation. Trio $208.

### R6 — Class 3 | 1200m Turf | Actual: 4→13→14 ❌

**Ticket:** ★ **#6** + legs **#5 → #3 → #13 → #4 → #2 → #8** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 6 | LIFELINE EXPRESS | 32.2% | 71.4% | 8.0 | ✅ | 7 | ★ Banker | 11th (SP 11) |
| L1 | 5 | COOL BOY | 26.7% | 68.0% | 2.8 | ✅ | 5 | Leg | 4th (SP 2.8) |
| L2 | 3 | CELESTIAL HERO | 23.3% | 63.0% | 7.8 | ✅ | 6 | Leg | 6th (SP 7.4) |
| L3 | 13 | THUNDER KIT | 7.1% | 31.3% | 10 | ✅ | 4 | Leg | **2nd** (SP 8.4) |
| L4 | 4 | GENEVA | 1.4% | 10.5% | 8.2 | ✅ (w<10 added) | 2 | Leg | **1st** (SP 3.9) |
| L5 | 2 | CIRCUIT GRAND SLAM | 0.2% | 1.2% | 9.5 | ✅ (w<10 added) | 7 | Leg | 5th (SP 37) |
| L6 | 8 | PEGAS | 3.8% | 18.9% | 9.9 | ✅ (w<10 added) | 7 | Leg | 8th (SP 7.7) |
| — | 9 | OUTGATE | 2.3% | 14.3% | 50 | ❌ | 10 | — | 10th (SP 58) |
| — | 14 | LUCKY CANDY | 1.1% | 7.4% | 15 | ❌ | 5 | — | **3rd** (SP 23) |
| — | 10 | SUGAR SUGAR | 0.8% | 5.1% | 38 | ❌ | 9 | — | 9th (SP 161) |
| — | 1 | CHATEAUNEUF | 0.7% | 5.5% | 37 | ❌ | 9 | — | 14th (SP 55) |
| — | 7 | SAVVY BRILLIANT | 0.2% | 1.5% | 44 | ❌ | 3 | — | 7th (SP 68) |
| — | 12 | GRIT SPIRIT | 0.1% | 1.4% | 65 | ❌ | 1 | — | 12th (SP 264) |
| — | 11 | FLYING HUNTER | 0.0% | 0.5% | 124 | ❌ | 1 | — | 13th (SP 361) |

**Pattern C — banker fail + pool gap.** **#6** LIFELINE EXPRESS (MC 32.2%, 8.0 odds) collapsed to 11th at 11 SP — a shocking failure for the top MC pick. **#4** GENEVA (Step B add, Bowman, 3.9 SP) won and **#13** THUNDER KIT (primary leg, 8.4 SP) ran 2nd — both on the ticket. But **#14** LUCKY CANDY (3rd, 23 SP, MC 7.4% Place, 15 odds) was outside the pool — too long-priced for Step B and too low MC Place%. Step B's capture of #4 GENEVA was excellent (market favourite at 8.2 odds, only 10.5% MC Place — classic "MC underrates thin form" correction), but the banker failure made it all irrelevant. Strategy A fared even worse with 雙膽拖 #6+#5 (both out of frame).

### R7 — Group 1 | 1600m Turf | Actual: 5→9→3 ❌

**Ticket:** ★ **#10** + legs **#12 → #4 → #5 → #14 → #1** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 10 | INVINCIBLE IBIS | 24.1% | 57.2% | 8.9 | ✅ | 8 | ★ Banker | 4th (SP 9.8) |
| L1 | 12 | CHANCHENG GLORY | 15.1% | 43.7% | 96 | ✅ | 6 | Leg | 8th (SP 214) |
| L2 | 4 | LUCKY SWEYNESSE | 20.0% | 52.7% | 5.7 | ✅ | 6 | Leg | 11th (SP 5.8) |
| L3 | 5 | MY WISH | 14.4% | 43.5% | 3.5 | ✅ | 7 | Leg | **1st** (SP 5.4) |
| L4 | 14 | LITTLE PARADISE | 13.6% | 41.9% | 5.5 | ✅ | 7 | Leg | 10th (SP 7.1) |
| L5 | 1 | JANTAR MANTAR | 0.1% | 0.9% | 5.5 | ✅ (w<10 replaced #7) | 0 | Leg | 13th (SP 3.0) |
| — | 7 | GALAXY PATCH | 6.5% | 25.1% | 30 | ❌ (swapped out) | 6 | — | 7th (SP 23) |
| — | 6 | RED LION | 2.8% | 13.7% | 22 | ❌ | 6 | — | 14th (SP 89) |
| — | 11 | SUNLIGHT POWER | 1.9% | 10.6% | 46 | ❌ | 7 | — | 6th (SP 22) |
| — | 2 | VOYAGE BUBBLE | 1.3% | 8.2% | 15 | ❌ | 6 | — | 5th (SP 15) |
| — | 13 | COPARTNER PRANCE | 0.1% | 1.1% | 101 | ❌ | 6 | — | 9th (SP 115) |
| — | 8 | STRAUSS | 0.1% | 0.7% | 18 | ❌ | 0 | — | 12th (SP 29) |
| — | 3 | DOCKLANDS | 0.1% | 0.4% | 80 | ❌ | 1 | — | **3rd** (SP 19) |
| — | 9 | CAP FERRAT | 0.0% | 0.3% | 37 | ❌ | 2 | — | **2nd** (SP 37) |

**Pattern C — banker fail + double G1 import gap.** **#10** INVINCIBLE IBIS (MC 24.1%, 9.8 SP) ran 4th — missed by a nose. **#5** MY WISH (primary leg) won ✅ but both **#9** CAP FERRAT (2nd, 37 SP, MC 0.0%, French vet-flagged raider) and **#3** DOCKLANDS (3rd, 19 SP, MC 0.1%, 1 HK form line) were unfixable G1 blind spots. Step B's swap of #7 GALAXY PATCH (7th) for #1 JANTAR MANTAR (Japanese, 3.0 SP) was theoretically correct but #1 ran last (13th). The FWD Champions Mile produced the day's largest Trio ($6,045) — entirely inaccessible to any MC-based approach. This validates the G1 international warning.

### R8 — Class 3 | 1400m Turf | Actual: 9→1→4 ❌

**Ticket:** ★ **#10** + legs **#1 → #9 → #4 → #7** | 膽拖 C(4,2) = 6 × $10 = $60

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 10 | AEROINVINCIBLE | 48.2% | 83.0% | 7.2 | ✅ | 8 | ★ Banker | 4th (SP 6.9) |
| L1 | 1 | HELENE SUPAFEELING | 18.0% | 58.1% | 8.1 | ✅ | 4 | Leg | **2nd** (SP 5.9) |
| L2 | 9 | MIGHTY COMMANDER | 12.6% | 47.8% | 9.2 | ✅ | 10 | Leg | **1st** (SP 18) |
| L3 | 4 | FIT FOR BEAUTY | 10.3% | 42.7% | 5.1 | ✅ | 9 | Leg | **3rd** (SP 3.4) |
| L4 | 7 | THE RED HARE | 5.3% | 27.2% | 6.6 | ✅ | 9 | Leg | 11th (SP 6.2) |
| — | 5 | ANOTHER WORLD | 1.8% | 12.4% | 35 | ❌ | 8 | — | 14th (SP 76) |
| — | 2 | CHIU CHOW SPIRIT | 1.5% | 10.7% | 16 | ❌ | 7 | — | 12th (SP 67) |
| — | 11 | CALIFORNIA WAVES | 1.4% | 9.7% | 15 | ❌ | 9 | — | 5th (SP 25) |
| — | 6 | DARYL FLASH | 0.7% | 5.6% | 17 | ❌ | 5 | — | 8th (SP 60) |
| — | 8 | CLASS | 0.0% | 0.6% | 35 | ❌ | 2 | — | 13th (SP 239) |
| — | 3 | POWER OF VITAM | 0.1% | 1.2% | 11 | ❌ | 3 | — | 6th (SP 6.0) |
| — | 12 | HAROLD WIN | 0.0% | 0.5% | 11 | ❌ | 10 | — | 10th (SP 17) |
| — | 14 | LEGENDARY YEARS | 0.0% | 0.4% | 35 | ❌ | 2 | — | 9th (SP 126) |
| — | 13 | POSITIVE SMILE | 0.0% | 0.1% | 18 | ❌ | 9 | — | 7th (SP 13) |

**Pattern A — all 3 in pool, wrong banker.** **#10** AEROINVINCIBLE (MC's most dominant C3 signal at 48.2% Win, 6.9 SP) ran 4th — missed by 0.02s. **All three** placers were B legs: **#9** MIGHTY COMMANDER (1st, 18 SP), **#1** HELENE SUPAFEELING (2nd, 5.9 SP), **#4** FIT FOR BEAUTY (3rd, 3.4 SP). Combo 10-9-1, 10-9-4, 10-1-4 would all have been on the ticket. Forfeited: **$526**. Strategy A and B were identical here (no Step B candidates). The identical A structure also missed. This is pure banker variance on a dominant pick.

### R9 — Group 1 | 2000m Turf | Actual: 2→1→4 ❌

**Ticket:** ★ **#2** + legs **#8 → #7 → #1** | 膽拖 C(3,2) = 3 × $10 = $30

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 2 | ROMANTIC WARRIOR | 49.5% | 92.2% | 1.5 | ✅ | 4 | ★ Banker | **1st** (SP 1.3) |
| L1 | 8 | NUMBERS | 31.8% | 85.3% | 10 | ✅ | 5 | Leg | 7th (SP 23) |
| L2 | 7 | RUBYLOT | 14.5% | 64.5% | 20 | ✅ | 5 | Leg | 6th (SP 104) |
| L3 | 1 | MASQUERADE BALL | 0.7% | 9.9% | 4.9 | ✅ (w<10 added) | 0 | Leg | **2nd** (SP 5.6) |
| — | 4 | SOSIE | 1.6% | 19.2% | 13 | ❌ | 1 | — | **3rd** (SP 8.2) |
| — | 3 | ROYAL CHAMPION | 0.7% | 10.0% | 36 | ❌ | 0 | — | 4th (SP 17) |
| — | 6 | JUNE TAKE | 0.7% | 9.6% | 12 | ❌ | 0 | — | 8th (SP 35) |
| — | 5 | GIOVANNI | 0.6% | 9.4% | 34 | ❌ | 0 | — | 5th (SP 101) |

**Pattern B — banker hit, narrow gap.** **#2** ROMANTIC WARRIOR won at 1.3 SP ✅; **#1** MASQUERADE BALL (Step B add, 5.6 SP) ran 2nd ✅. But **#4** SOSIE (French raider, 3rd, 8.2 SP, MC 19.2% Place, **13** odds — 3 ticks above the <10 threshold) missed the pool. Step B's capture of #1 (market's second choice, 4.9 odds) was correct; #8 NUMBERS (7th) and #7 RUBYLOT (6th) — the primary MC legs — both failed badly at inflated SP. Had #4's win odds been 9.9 instead of 13, Step B would have swapped a primary leg for #4 and potentially hit. **The margin between the <10 rule and the miss was only 3 odds ticks.** Trio $35 — tiny dividend reflecting the three shortest-priced finishers.

### R10 — Class 3 | 1600m Turf | Actual: 8→5→3 ❌

**Ticket:** ★ **#9** + legs **#5 → #8 → #13 → #10 → #3 → #6** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 9 | THE GOLDEN KNIGHT | 42.7% | 78.2% | 3.9 | ✅ | 8 | ★ Banker | 11th (SP 7.1) |
| L1 | 5 | LOVERO | 21.9% | 59.3% | 14 | ✅ | 7 | Leg | **2nd** (SP 7.9) |
| L2 | 8 | BLAZING WUKONG | 9.7% | 37.6% | 15 | ✅ | 8 | Leg | **1st** (SP 6.8) |
| L3 | 13 | MASTER TRILLION | 7.3% | 31.0% | 27 | ✅ | 8 | Leg | 12th (SP 33) |
| L4 | 10 | SHAMUS STORM | 5.2% | 24.9% | 10 | ✅ | 5 | Leg | 6th (SP 5.8) |
| L5 | 3 | ENDUED | 0.4% | 4.0% | 6.7 | ✅ (w<10 replaced #4) | 8 | Leg | **3rd** (SP 5.5) |
| L6 | 6 | FAMILY JEWEL | 4.0% | 19.1% | 6.9 | ✅ (w<10 added) | 3 | Leg | 9th (SP 10) |
| — | 4 | SHANWAH | 5.5% | 23.2% | 12 | ❌ (swapped out) | 7 | — | 13th (SP 27) |
| — | 1 | LUCKY SAM GOR | 1.9% | 12.2% | 10 | ❌ | 10 | — | 5th (SP 11) |
| — | 7 | NATURAL NUMBERS | 1.1% | 7.5% | 16 | ❌ | 6 | — | 7th (SP 36) |
| — | 2 | WINDLORD | 0.2% | 1.3% | 29 | ❌ | 5 | — | 10th (SP 19) |
| — | 11 | TRINITY TREASURE | 0.1% | 0.6% | 69 | ❌ | 1 | — | 4th (SP 279) |
| — | 14 | RISING PHOENIX | 0.0% | 0.8% | 10 | ❌ | 11 | — | 8th (SP 8.6) |
| — | 12 | DRAGON ON SNOW | 0.0% | 0.3% | 60 | ❌ | 2 | — | 14th (SP 236) |

**Pattern A — all 3 in pool, wrong banker + Step B swap validation.** **#9** THE GOLDEN KNIGHT (MC 42.7%, 3.9 early → 7.1 SP drift) collapsed to 11th — the biggest favourite collapse of the day. **All three** placers were B legs: **#8** BLAZING WUKONG (1st), **#5** LOVERO (2nd), **#3** ENDUED (3rd, Step B swap for #4 SHANWAH who ran 13th). Step B's swap was **perfect**: #3 ENDUED (6.7 odds, 4.0% MC Place) placed 3rd; #4 SHANWAH (12 odds, swapped out) ran 13th. Forfeited: **$484**. Had **any** of the other primary-Place legs been banker instead of #9, B collects. Strategy A had a weaker miss — its pool excluded #3 and #10, losing even the Pattern A structure.

### R11 — Class 2 | 1400m Turf | Actual: 5→9→12 ✅

**Ticket:** ★ **#12** + legs **#9 → #11 → #7 → #2 → #5** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 12 | MIGHTY MASTS | 51.2% | 83.9% | 7.1 | ✅ | 5 | ★ Banker | **3rd** (SP 4.0) |
| L1 | 9 | SIX PACK | 13.8% | 48.6% | 6.3 | ✅ | 9 | Leg | **2nd** (SP 7.7) |
| L2 | 11 | SALON S | 11.5% | 43.6% | 3.9 | ✅ | 4 | Leg | 4th (SP 2.8) |
| L3 | 7 | INFINITE RESOLVE | 7.3% | 34.6% | 19 | ✅ | 9 | Leg | 9th (SP 39) |
| L4 | 2 | LIGHT YEARS CHARM | 6.5% | 29.9% | 17 | ✅ | 7 | Leg | 12th (SP 47) |
| L5 | 5 | WINNING OVATION | 3.6% | 20.7% | 6.5 | ✅ | 3 | Leg | **1st** (SP 4.0) |
| — | 3 | STORM RIDER | 3.2% | 18.0% | 33 | ❌ | 10 | — | 7th (SP 178) |
| — | 4 | MUGEN | 1.6% | 9.8% | 17 | ❌ | 8 | — | 11th (SP 32) |
| — | 1 | PACKING HERMOD | 0.9% | 7.0% | 18 | ❌ | 4 | — | 13th (SP 58) |
| — | 14 | WE ARE HERO | 0.3% | 3.1% | 21 | ❌ | 7 | — | 14th (SP 160) |
| — | 13 | JUNEAU PRIDE | 0.0% | 0.3% | 12 | ❌ | 7 | — | 6th (SP 12) |
| — | 10 | DROMBEG BANNER | 0.0% | 0.1% | 28 | ❌ | 7 | — | 5th (SP 136) |
| — | 8 | EMBLAZON | 0.0% | 0.3% | 19 | ❌ | 7 | — | 10th (SP 48) |
| — | 6 | KAHOLO ANGEL | 0.0% | 0.1% | 24 | ❌ | 8 | — | 8th (SP 126) |

**Hit.** Banker **#12** MIGHTY MASTS (MC 51.2%, 4.0 SP) placed 3rd ✅. **#5** WINNING OVATION (primary leg at MC 20.7% Place — just above the >20% threshold) won at 4.0 SP; **#9** SIX PACK (primary leg, 7.7 SP) ran 2nd. Line **12-5-9** pays **$176**. The key inclusion was **#5** — Strategy A excluded it (MC Place% 20.7% < 25% Adj Place threshold), while B retained it as a primary MC leg. Purton's choice. Net +$76 on $100 stake. **B-exclusive hit** — A missed due to the stricter pool rule.

---

## Banker Performance (Strategy B — MC #1)

| Race | Banker | MC Win% | MC Place% | Odds (early) | Finished | SP | Top 3? |
|------|--------|---------|-----------|--------------|----------|----|--------|
| R1 | #5 THE HEIR | 47.1% | 86.3% | 8.6 | 5th | 8.6 | ❌ |
| R2 | #6 BIG RETURN | 28.7% | 63.9% | 4.9 | 1st | 3.6 | ✅ |
| R3 | #13 BETTER AND BETTER | 34.3% | 70.3% | 9.9 | 2nd | 6.2 | ✅ |
| R4 | #5 KING DANCE | 36.1% | 74.4% | 5.9 | 1st | 6.1 | ✅ |
| R5 | #1 KA YING RISING | 37.1% | 75.8% | 1.0 | 1st | 1.0 | ✅ |
| R6 | #6 LIFELINE EXPRESS | 32.2% | 71.4% | 8.0 | 11th | 11 | ❌ |
| R7 | #10 INVINCIBLE IBIS | 24.1% | 57.2% | 8.9 | 4th | 9.8 | ❌ |
| R8 | #10 AEROINVINCIBLE | 48.2% | 83.0% | 7.2 | 4th | 6.9 | ❌ |
| R9 | #2 ROMANTIC WARRIOR | 49.5% | 92.2% | 1.5 | 1st | 1.3 | ✅ |
| R10 | #9 THE GOLDEN KNIGHT | 42.7% | 78.2% | 3.9 | 11th | 7.1 | ❌ |
| R11 | #12 MIGHTY MASTS | 51.2% | 83.9% | 7.1 | 3rd | 4.0 | ✅ |

**6/11** MC #1 bankers in top 3 — **54.5%** strike rate. Significantly improved vs old MC (3/11 = 27.3%). The `--ignore-records 20260426` fix changed banker selections in R2 (#4→#6), R3 (#3→#13), R4 (#3→#5) — all three new bankers placed top 3.

---

## Miss Classification (Strategy B)

| Pattern | Count | Races | Description |
|---------|-------|-------|-------------|
| **A — All 3 in pool, wrong banker** | 2 | R8, R10 | Pool was perfect but banker failed |
| **B — Banker hit, pool gap** | 4 | R3, R4, R5, R9 | Banker placed but a placing horse was outside pool |
| **C — Banker fail + pool gap** | 3 | R1, R6, R7 | Banker missed AND at least 1 placer outside pool |

### Pattern A (2 misses)

**R8**: Banker #10 AEROINVINCIBLE (MC 48.2%, 6.9 SP) finished 4th — missed by 0.02s. All 3 placers were legs: #9 MIGHTY COMMANDER (1st, 18 SP), #1 HELENE SUPAFEELING (2nd, 5.9 SP), #4 FIT FOR BEAUTY (3rd, 3.4 SP). Forfeited: **$526**.

**R10**: Banker #9 THE GOLDEN KNIGHT (MC 42.7%, 7.1 SP — drifted from 3.9) collapsed to 11th. All 3 placers were legs: #8 BLAZING WUKONG (1st, 6.8 SP), #5 LOVERO (2nd, 7.9 SP), #3 ENDUED (3rd, 5.5 SP — Step B swap for #4). Forfeited: **$484**. Step B's swap of #4 SHANWAH for #3 ENDUED was critical — #3 placed, #4 ran 13th.

**Pattern A total forfeited dividends:** $526 + $484 = **$1,010** — would have swung B from −$848 to +$162.

### Pattern B (4 misses)

**R3**: Banker #13 hit (2nd). #2 MR INCREDIBLE (1st) in pool ✅. Gap: **#6 SOLID CAR** (3rd, 6.8 SP) — excluded from B due to -injury30d penalty removing it from primary legs, not replaced via Step B. Trio $243.

**R4**: Banker #5 hit (1st). #4 NYX GLUCK (2nd) in pool ✅. Gap: **#14 STAR FIGURE** (3rd, 54 SP) — MC Place% 22.1% was in primary pool but B replaced it with #9 DAILY ACCLAIM via Step B. Trio **$4,397** — biggest single-race miss.

**R5**: Banker #1 hit (1st). #5 RAGING BLIZZARD (3rd) in pool ✅. Gap: **#2 SATONO REVE** (2nd, 90 SP) — Japanese raider with 1 HK form line, MC 0.9% Place. No Step B candidate existed. G1 structural blind spot. Trio $208.

**R9**: Banker #2 hit (1st). #1 MASQUERADE BALL (2nd) in pool ✅ (Step B add). Gap: **#4 SOSIE** (3rd, 8.2 SP, French raider, 11 odds — 1 tick above Step B <10 threshold). Trio $35.

### Pattern C (3 misses)

**R1**: Banker #5 5th ❌. #13 (1st) and #9 (2nd) in pool. Gap: #10 NAVAS G (3rd, 16 SP, debutant). Trio $640.

**R6**: Banker #6 11th ❌. #4 GENEVA (1st) in pool ✅ (Step B add). Gaps: #13 THUNDER KIT (2nd, 8.4 SP), #14 LUCKY CANDY (3rd, 23 SP). Trio $787.

**R7**: Banker #10 4th ❌ (missed by 0.01s). #5 MY WISH (1st) in pool ✅. Gaps: #9 CAP FERRAT (2nd, 37 SP — vet-flagged, 0.3% MC), #3 DOCKLANDS (3rd, 19 SP — UK raider, 1 HK form). Trio **$6,045** — largest dividend of day.

---

## R4 — Strategy A 雙膽拖 Structural Miss ($4,397)

The most notable miss of the meeting. New MC correctly identified #5 KING DANCE as #1 (36.1% Win) — he won. Strategy A built a 雙膽拖 with #5+#3 as co-bankers, legs #7,#4,#14. The result was **5→4→14** — ALL THREE placers were in the 5-horse pool. But the 雙膽拖 structure requires #3 in EVERY combo (5-3-7, 5-3-4, 5-3-14). Since #3 ROBOT STAR ran 7th, no combo hit. A 膽拖 with #5 as single banker and legs #3,#7,#4,#14 would have had combo 5-4-14 → **$4,397 return** on $40 stake. The 雙膽拖 saved $10 in stake but cost $4,397 in return.

---

## Hit Details

### R2 ✅ — Trio $166 | Both A and B Hit

Result: **6→7→1**. Banker #6 BIG RETURN (MC 28.7%, 3.6 SP) won. #7 JOLLY BRILLIANT (2nd, 3.4 SP) and #1 TURIN CHAMPIONS (3rd, 8.7 SP) both in pool.

- Strategy A: 膽拖 banker #6 + legs #7,#4,#1,#8,#11. Combo 6-7-1 ✅. Return $166 on $100 stake. P&L +$66.
- Strategy B: 膽拖 banker #6 + legs #7,#4,#1,#9,#11. Combo 6-7-1 ✅. Return $166 on $100 stake. P&L +$66.

Key: new MC (with `--ignore-records 20260426`) correctly ranked #6 BIG RETURN as #1 by Win% (28.7%) ahead of #7 JOLLY BRILLIANT (20.4%). Old MC had #4 AESTHETICISM as #1 — who ran 9th. **The fix turned a 0-hit race into a hit for both strategies.**

### R11 ✅ — Trio $176 | B Hit, A Miss

Result: **5→9→12**. Banker #12 MIGHTY MASTS (MC 51.2%, 4.0 SP) placed 3rd. #5 WINNING OVATION (1st, 4.0 SP — Step B primary leg at 20.7% MC Place) and #9 SIX PACK (2nd, 7.7 SP) filled the frame.

- Strategy B: Combo 12-5-9 ✅. Return $176 on $100 stake. P&L +$76.
- Strategy A: Pool #12,#9,#11,#7,#2 — **#5 excluded** (MC Place% 20.7%, below A's 25% Adj Place threshold). MISS (Pattern B, gap #5). P&L −$60.

Step B's retention of #5 WINNING OVATION (Purton, 6.5 odds) as a primary MC leg was decisive. A's stricter inclusion rule dropped the race winner.

---

## Lessons

1. **`--ignore-records` fix improved banker selection dramatically.** Old MC (which included today's results in historical data) had 3/11 bankers top-3 (27.3%). New MC: **6/11 (54.5%)**. Three banker changes (R2 #4→#6, R3 #3→#13, R4 #3→#5) all moved to horses that placed top 3. This validates the importance of excluding same-day results from MC input.

2. **Pattern A remains painful but reduced.** Old review had 4 Pattern A misses; new review has **2** (R8, R10). Combined forfeited: $1,010. The improvement came from R2 and R3 where better banker picks converted misses.

3. **Pattern B (banker hit, pool gap) was the dominant miss type for B (4/9).** The pool width issue persists: #14 STAR FIGURE in R4 ($4,397), #2 SATONO REVE in R5 ($208), #6 SOLID CAR in R3 ($243), #4 SOSIE in R9 ($35). Step B's replacement of #14 with #9 in R4 was the most costly single decision of the day.

4. **R4 雙膽拖 structural risk crystallized.** Strategy A had ALL 3 placers in its pool (#5, #4, #14) but the 雙膽拖 format locked every combo to include #3 (who ran 7th). Forfeited: **$4,397**. This is the strongest argument yet for preferring 膽拖 over 雙膽拖 in Mode A.

5. **G1 international races remain structurally challenging.** R5: #2 SATONO REVE (0.9% MC, 90 SP) ran 2nd. R7: #9 CAP FERRAT (0.3% MC, 37 SP) ran 2nd, #3 DOCKLANDS (0.4% MC, 19 SP) ran 3rd. R9: #4 SOSIE (19.2% MC, 11 odds — 1 tick above <10 threshold) ran 3rd. Combined 3 G1 races: $230 staked (B), $0 returned.

6. **Step B delivered the only B-exclusive hit (R11 +$76).** #5 WINNING OVATION (20.7% MC Place, 6.5 odds) was retained as a primary leg and won. Without this inclusion, B has only the R2 hit (shared with A). Step B also correctly added #9 in R1 (placed 2nd) and #3 in R10 (placed 3rd) — validating the odds-swap rule even when the banker failed.

---

## A vs B Divergence (this meeting — updated)

| Metric | Strategy A | Strategy B | Delta (B − A) |
|--------|-----------|-----------|---------------|
| Hits | 1/11 (R2) | 2/11 (R2, R11) | B +1 |
| Total staked | $710 | $1,190 | B +$480 |
| Total returned | $166 | $342 | B +$176 |
| **Net P&L** | **−$544** | **−$848** | **A +$304** |
| **ROI** | **−76.6%** | **−71.3%** | **B +5.3pp** |
| Banker top 3 | 6/11 (54.5%) | 6/11 (54.5%) | — |

**A lost less ($304 better)** due to lower total stake — A's tighter 雙膽拖 / Mode A structures cost less per race. B's extra hit (R11 $176) came from a primary leg A excluded. On ROI, **B was less bad (−71.3% vs −76.6%)**. Neither strategy survived Champions Day — but both improved vs the old MC review (old A: −$630/−100%, old B: −$964/−84.6%).

### Where A and B Diverged

| Race | What Differed | A Result | B Result | Impact |
|------|--------------|----------|----------|--------|
| R1 | A: 雙膽拖 #5+#11 (3 combos); B: 膽拖 #5 + 5 legs (10 combos) | MISS ❌ | MISS ❌ | B spent $70 more, same outcome |
| R2 | Identical banker #6; A has #8, B has #9 instead | HIT ✅ | HIT ✅ | Same $166 return |
| R3 | A has #6 SOLID CAR excluded; B also excludes #6 | MISS ❌ | MISS ❌ | Same gap |
| R4 | **A: 雙膽拖 #5+#3 ($30); B: 膽拖 #5 ($150)** | MISS ❌ (A in pool!) | MISS ❌ (gap #14) | A's 雙膽拖 killed $4,397 hit; B dropped #14 |
| R5 | Identical pools | MISS ❌ | MISS ❌ | Same gap #2 |
| R6 | A: 雙膽拖 #6+#5 ($40); B: 膽拖 #6 + 6 legs ($150) | MISS ❌ | MISS ❌ | Both bankers failed |
| R7 | A keeps #7; B drops #7 for #1 | MISS ❌ | MISS ❌ | Both miss (banker fail) |
| R8 | Identical | MISS ❌ | MISS ❌ | Pattern A both |
| R9 | A: 雙膽拖 #2+#8 + legs #7,#4,#3; B: 膽拖 #2 + legs #8,#7,#1 | MISS ❌ | MISS ❌ | A had #4 (placed), B had #1 (placed) — both missed the other |
| R10 | A: pool 5 (no #3,#10); B: pool 7 (has #3,#10) | MISS ❌ | MISS ❌ | B had all 3 (Pattern A); A lacked #3 (Pattern C) |
| **R11** | **A pool excludes #5; B includes #5** | **MISS ❌** | **HIT ✅** | **B gained $176** |

---

## Cross-reference

| File | Role |
|------|------|
| `data/reviews/trio_review_stratC_20260422_HV.md` | Previous long-form B review (Happy Valley) |
| `data/reports/trio_strategy_20260426_ST_R1.md` … `R11.md` | Pre-race Strategy A + **Strategy B (MC-only)** blocks (regenerated) |
| `data/historical/results_20260426_ST.json` | Finishes + Trio dividends |

---

*Post-race learning only — not betting advice.*
