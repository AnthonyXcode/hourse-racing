# Strategy B Review — MC #1 banker + primary Place%>20% + win-odds add/swap (trio SKILL) | Sha Tin | 26 Apr 2026

## Rules

- **Banker**: MC **#1** by MC Win% (same as "MC #1" in reports).
- **Primary legs**: all other runners with **MC Place% > 20%** (banker excluded).
- **Step B (win odds < 10, Place% ≤ 20%)**: **replace** one primary leg when the SKILL swap rule fires; otherwise **add** short-priced tails (see each `trio_strategy_20260426_ST_R*.md`).
- **Data**: `--form-data all` (all-venue history); HKJC win odds from reports at generation time.
- **Bet type**: Trio (單T) — top 3 in **any** order.
- **Unit**: **$10** per combination; structure **膽拖** 1 banker + N legs → **C(N, 2)** combos.

**Stake convention (this review):** **Full Strategy B** = the published **final legs** after Step B in each report.

**Note:** This is the **trio-strategy SKILL** Strategy B pipeline (**MC-only**), **not** Strategy A (Adj Win/Place + jockey + SCMP + Modes A–B).

**Pre-race definitions:** `data/reports/trio_strategy_20260426_ST_R1.md` … `R11.md`.

**Results source:** `tools/scrape-meeting.ts --date=2026-04-26 --venue=ST` → `data/historical/results_20260426_ST.json`. **Finished** + **SP** = `winOdds` on each finisher row. **MC % / odds** from the trio reports.

---

## Summary

| Metric | Value |
|--------|-------|
| Races played | **11 (R1–R11)** |
| Hit rate | **1/11 (9.1%)** |
| Total staked | **$1,140** (full Strategy B) |
| Total returned | **$176** |
| **Net P&L** | **−$964** |
| **ROI** | **−84.6%** |
| Session Result | **LOSS** |

---

## Race-by-Race Results

Banker = MC Win% **#1**. Legs = **final Strategy B legs** after Step B add/swap (see per-race reports).

| Race | Class | Dist | Surf | Banker (MC#1) | Final legs (after Step B) | Structure | Combos | Stake | Result (1→2→3) | Banker placed? | Hit? | Trio $ | Return | P&L |
|------|-------|------|------|---------------|---------------------------|-----------|--------|-------|----------------|----------------|------|--------|--------|-----|
| R1 | C4 | 1200m | Turf | #5(51.6W/88.9P) | #11,#2,#4,#13,#9 | 膽拖 1B+5L | 10 | $100 | 13→9→10 | 5th ❌ | ❌ | $640 | $0 | −$100 |
| R2 | C4 | 1600m | Turf | #4(37.2W/71.3P) | #1,#8,#7,#6,#9,#11 | 膽拖 1B+6L | 15 | $150 | 6→7→1 | 9th ❌ | ❌ | $166 | $0 | −$150 |
| R3 | C4 | 1200m | Turf | #3(45.8W/79.0P) | #4,#6,#5,#2,#13,#1,#9 | 膽拖 1B+7L | 21 | $210 | 2→13→6 | 5th ❌ | ❌ | $243 | $0 | −$210 |
| R4 | C4 | 1400m | Turf | #3(48.2W/82.3P) | #4,#5,#10,#7,#9,#12 | 膽拖 1B+6L | 15 | $150 | 5→4→14 | 7th ❌ | ❌ | $4,397 | $0 | −$150 |
| R5 | G1 | 1200m | Turf | #1(34.5W/74.4P) | #7,#8,#4,#3,#5 | 膽拖 1B+5L | 10 | $100 | 1→2→5 | 1st ✅ | ❌ | $208 | $0 | −$100 |
| R6 | C3 | 1200m | Turf | #3(39.0W/83.4P) | #6,#5,#4 | 膽拖 1B+3L | 3 | $30 | 4→13→14 | 6th ❌ | ❌ | $787 | $0 | −$30 |
| R7 | G1 | 1600m | Turf | #10(26.6W/62.0P) | #12,#4,#14,#5,#1 | 膽拖 1B+5L | 10 | $100 | 5→9→3 | 4th ❌ | ❌ | $6,045 | $0 | −$100 |
| R8 | C3 | 1400m | Turf | #10(52.4W/88.4P) | #1,#9,#7,#4 | 膽拖 1B+4L | 6 | $60 | 9→1→4 | 4th ❌ | ❌ | $526 | $0 | −$60 |
| R9 | G1 | 2000m | Turf | #2(44.1W/85.8P) | #7,#8,#1 | 膽拖 1B+3L | 3 | $30 | 2→1→4 | 1st ✅ | ❌ | $35 | $0 | −$30 |
| R10 | C3 | 1600m | Turf | #9(28.0W/62.3P) | #5,#8,#13,#6,#1,#3 | 膽拖 1B+6L | 15 | $150 | 8→5→3 | 11th ❌ | ❌ | $484 | $0 | −$150 |
| R11 | C2 | 1400m | Turf | #12(54.4W/88.4P) | #11,#9,#2,#5 | 膽拖 1B+4L | 6 | $60 | 5→9→12 | 3rd ✅ | **✅** | $176 | $176 | +$116 |
| **TOTAL** | | | | | | | **114** | **$1,140** | | **3/11** bank in frame | **1/11** | | **$176** | **−$964** |

---

## Full MC Place% Table (ticket horses + field)

*Odds* = pre-race HKJC win odds from `data/reports/trio_strategy_20260426_ST_R*.md`. **Finished** + **SP** from `data/historical/results_20260426_ST.json`.

**Row order:** **★** banker, then legs **L1, L2, …** in **final Strategy B leg order**, then **—** other starters by saddle #.

**Column "Pool":** **✅** = on final Strategy B ticket (primary **P>20%** or Step B add/swap).

### R1 — Class 4 | 1200m Turf | Actual: 13→9→10 ❌

**Ticket:** ★ **#5** + legs **#11 → #2 → #4 → #13 → #9** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 5 | THE HEIR | 51.6% | 88.9% | 3.4 | ✅ | 11 | ★ Banker | 5th (SP 8.6) |
| L1 | 11 | PRESTIGE HALL | 20.1% | 69.5% | 4.7 | ✅ | 7 | Leg | 8th (SP 3.3) |
| L2 | 2 | A TIME FOR US | 18.0% | 64.8% | 20 | ✅ | 6 | Leg | 7th (SP 28) |
| L3 | 4 | LUCKY TWENTY | 5.8% | 33.4% | 28 | ✅ | 5 | Leg | 11th (SP 75) |
| L4 | 13 | PACKING KING | 2.8% | 21.2% | 9.7 | ✅ | 3 | Leg | **1st** (SP 3.3) |
| L5 | 9 | LUCRATIVE EIGHT | 0.1% | 2.1% | 5.6 | ✅ (w<10 add) | 1 | Leg | **2nd** (SP 4.8) |
| — | 10 | NAVAS G | 0.0% | 1.2% | 10 | ❌ | 0 | — | **3rd** (SP 16) |
| — | 14 | I EXCELLE | 1.3% | 12.8% | 86 | ❌ | 4 | — | 13th (SP 182) |
| — | 1 | MATZDEN | 0.0% | 0.6% | 11 | ❌ | 4 | — | 4th (SP 9.4) |
| — | 3 | AKERMANIS GOLD | 0.0% | 0.7% | 14 | ❌ | 5 | — | 9th (SP 42) |
| — | 12 | BEAUTY GEMINI | 0.1% | 1.7% | 37 | ❌ | 2 | — | 10th (SP 91) |
| — | 6 | BRILLIANT WINNER | 0.1% | 1.3% | 74 | ❌ | 1 | — | 14th (SP 271) |
| — | 7 | GUTSY BRAVO | 0.0% | 0.9% | 35 | ❌ | 0 | — | 6th (SP 55) |
| — | 8 | HIGH RISE VICTORY | 0.0% | 0.8% | 59 | ❌ | 0 | — | 12th (SP 96) |

**Pattern C — Banker fail + pool gap.** Banker **#5** THE HEIR (Moreira, 8.6 SP, MC's strongest signal at 51.6%) finished **5th** — drifted from 3.4 to 8.6 SP, market lost faith on race day. Two of three placers were on the ticket: **#13** PACKING KING (L4, primary leg, 3.3 SP) won and **#9** LUCRATIVE EIGHT (L5, Step B add at 5.6 odds, 4.8 SP) ran 2nd. But **#10** NAVAS G (debutant, 0 form, 16 SP, -injury30d flag for inappetence) ran **3rd** — a horse MC rated at 0.0% Win and 1.2% Place, excluded from pool on form alone. Step B's add of #9 was validated (placed 2nd) but the banker collapse and #10's upset killed the ticket.

### R2 — Class 4 | 1600m Turf | Actual: 6→7→1 ❌

**Ticket:** ★ **#4** + legs **#1 → #8 → #7 → #6 → #9 → #11** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 4 | AESTHETICISM | 37.2% | 71.3% | 31 | ✅ | 11 | ★ Banker | 9th (SP 28) |
| L1 | 1 | TURIN CHAMPIONS | 16.2% | 48.9% | 7.1 | ✅ | 6 | Leg | **3rd** (SP 8.7) |
| L2 | 8 | AMAZING AWARD | 16.1% | 48.5% | 12 | ✅ | 9 | Leg | 5th (SP 19) |
| L3 | 7 | JOLLY BRILLIANT | 10.6% | 38.5% | 6.3 | ✅ | 5 | Leg | **2nd** (SP 3.4) |
| L4 | 6 | BIG RETURN | 10.1% | 37.8% | 4.9 | ✅ | 7 | Leg | **1st** (SP 3.6) |
| L5 | 9 | CIRCUIT MARSHAL | 0.9% | 6.5% | 7.9 | ✅ (w<10 add) | 4 | Leg | 7th (SP 9.9) |
| L6 | 11 | SMILING FALCON | 2.2% | 12.7% | 8.6 | ✅ (w<10 add) | 7 | Leg | 8th (SP 14) |
| — | 3 | FAMILY KNIGHT | 3.7% | 18.3% | 19 | ❌ | 6 | — | 4th (SP 33) |
| — | 10 | TYCOON EXPRESS | 2.9% | 15.1% | 24 | ❌ | 3 | — | 12th (SP 24) |
| — | 2 | SHAMZ | 0.0% | 0.1% | 10 | ❌ | 7 | — | 14th (SP 15) |
| — | 12 | AMAZING FUN | 0.1% | 0.7% | 28 | ❌ | 10 | — | 10th (SP 99) |
| — | 5 | MASSIVE GLORY | 0.1% | 1.1% | 19 | ❌ | 1 | — | 11th (SP 30) |
| — | 13 | FLYING AMANI | 0.0% | 0.5% | 22 | ❌ | 5 | — | 6th (SP 18) |
| — | 14 | SPECIAL HEDGE | 0.0% | 0.0% | 26 | ❌ | 9 | — | 13th (SP 25) |

**Pattern A — all 3 in pool, wrong banker.** Banker **#4** AESTHETICISM (Hewitson, 28 SP, MC 37.2% but market priced at 31 — the most extreme MC-market gap) finished **9th**. All three placers were on the ticket: **#6** BIG RETURN (L4, won at 3.6), **#7** JOLLY BRILLIANT (L3, 2nd at 3.4), **#1** TURIN CHAMPIONS (L1, 3rd at 8.7). The MC-market discrepancy on #4 was the story of the race — MC saw 37.2% Win but market saw a 31-odds outsider. If **any** of the three placers had been banker, B collects **$166**. This is the most painful single-race miss pattern: perfect pool, wrong commander.

### R3 — Class 4 | 1200m Turf | Actual: 2→13→6 ❌

**Ticket:** ★ **#3** + legs **#4 → #6 → #5 → #2 → #13 → #1 → #9** | 膽拖 C(7,2) = 21 × $10 = $210

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 3 | HAYDAY | 45.8% | 79.0% | 11 | ✅ | 8 | ★ Banker | 5th (SP 20) |
| L1 | 4 | GOLDENTRONICMIGHTY | 12.3% | 42.8% | 26 | ✅ | 9 | Leg | 9th (SP 76) |
| L2 | 6 | SOLID CAR | 11.3% | 42.1% | 11 | ✅ | 3 | Leg | **3rd** (SP 6.8) |
| L3 | 5 | OLDTOWN | 10.5% | 37.0% | 14 | ✅ | 5 | Leg | 6th (SP 20) |
| L4 | 2 | MR INCREDIBLE | 5.9% | 27.7% | 7.5 | ✅ | 2 | Leg | **1st** (SP 5.2) |
| L5 | 13 | BETTER AND BETTER | 5.6% | 27.6% | 9.9 | ✅ | 8 | Leg | **2nd** (SP 6.2) |
| L6 | 1 | ABSOLUTE HEART | 0.7% | 5.8% | 2.9 | ✅ (w<10 swap for #14) | 1 | Leg | 8th (SP 2.4) |
| L7 | 9 | HAPPY PROMISE | 0.0% | 0.7% | 6.7 | ✅ (w<10 add) | 0 | Leg | 4th (SP 10) |
| — | 14 | MAJESTIC LIFE | 6.8% | 28.3% | 96 | ❌ (swapped out) | 4 | — | 7th (SP 39) |
| — | 12 | PRECISION MIND | 0.3% | 3.2% | 28 | ❌ | 1 | — | 12th (SP 102) |
| — | 10 | JACKSON HABIT | 0.3% | 2.3% | 33 | ❌ | 1 | — | 13th (SP 153) |
| — | 8 | CLASSIC TRIPLE | 0.3% | 1.9% | 86 | ❌ | 1 | — | 14th (SP 238) |
| — | 11 | MASSIVE REWARD | 0.1% | 0.8% | 11 | ❌ | 0 | — | 11th (SP 30) |
| — | 7 | APEX GLORY | 0.1% | 0.8% | 31 | ❌ | 0 | — | 10th (SP 51) |

**Pattern A — all 3 in pool, wrong banker.** Banker **#3** HAYDAY (H Y Yuen, 20 SP — drifted from 11, MC 45.8% dominant) finished **5th**. All three placers were on the ticket: **#2** MR INCREDIBLE (L4, won at 5.2), **#13** BETTER AND BETTER (L5, 2nd at 6.2), **#6** SOLID CAR (L2, 3rd at 6.8). The 7-leg pool (widest ticket of the day at $210) correctly captured every placer but the MC #1 pick failed. This is the most expensive Pattern A miss ($210 stake). Step B's swap of #14 MAJESTIC LIFE for #1 ABSOLUTE HEART (2.9 market fav) didn't help — #1 ran 8th at 2.4 SP. Step B's add of #9 HAPPY PROMISE (debutant, 6.7 odds) ran 4th.

### R4 — Class 4 | 1400m Turf | Actual: 5→4→14 ❌

**Ticket:** ★ **#3** + legs **#4 → #5 → #10 → #7 → #9 → #12** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 3 | ROBOT STAR | 48.2% | 82.3% | 7.8 | ✅ | 6 | ★ Banker | 7th (SP 8.9) |
| L1 | 4 | NYX GLUCK | 15.2% | 50.8% | 8.1 | ✅ | 9 | Leg | **2nd** (SP 11) |
| L2 | 5 | KING DANCE | 14.3% | 51.4% | 6.1 | ✅ | 6 | Leg | **1st** (SP 6.1) |
| L3 | 10 | PHOENIX LIGHT | 9.0% | 36.5% | 9.7 | ✅ | 4 | Leg | 8th (SP 28) |
| L4 | 7 | WARRIORS DREAM | 6.4% | 31.5% | 42 | ✅ | 7 | Leg | 13th (SP 25) |
| L5 | 9 | DAILY ACCLAIM | 0.6% | 4.8% | 4.8 | ✅ (w<10 add) | 2 | Leg | 11th (SP 5.6) |
| L6 | 12 | ACE | 1.2% | 8.9% | 5.9 | ✅ (w<10 add) | 6 | Leg | 4th (SP 4.5) |
| — | 14 | STAR FIGURE | 3.5% | 19.7% | 48 | ❌ | 6 | — | **3rd** (SP 54) |
| — | 13 | CALIFORNIA BAY | 1.6% | 11.4% | 19 | ❌ | 11 | — | 9th (SP 6.5) |
| — | 1 | STAR MAC | 0.0% | 0.8% | 11 | ❌ | 5 | — | 5th (SP 13) |
| — | 6 | POET'S REIGN | 0.0% | 1.0% | 24 | ❌ | 2 | — | 10th (SP 45) |
| — | 11 | LUCKY BALERION | 0.0% | 0.8% | 20 | ❌ | 2 | — | 6th (SP 10) |
| — | 2 | JOLTIN | 0.0% | 0.0% | 81 | ❌ | 4 | — | 14th (SP 285) |
| — | 8 | GREEN ANGEL | 0.0% | 0.2% | 28 | ❌ | 0 | — | 12th (SP 56) |

**Pattern C — Banker fail + pool gap.** Banker **#3** ROBOT STAR (Bowman, 8.9 SP, MC 48.2% dominant) finished **7th**. Two placers were on the ticket: **#5** KING DANCE (L2, won at 6.1) and **#4** NYX GLUCK (L1, 2nd at 11). But **#14** STAR FIGURE (54 SP, MC 19.7% Place — just below the 20% threshold, 48 early odds) ran **3rd** as a deep longshot. Step B adds (#9 DAILY ACCLAIM at 4.8 odds, #12 ACE at 5.9 odds) both missed badly — Moreira's #9 ran 11th, #12 ran 4th. The $4,397 Trio dividend was the biggest of the day, a painful near-miss.

### R5 — G1 Chairman's Sprint Prize | 1200m Turf | Actual: 1→2→5 ❌

**Ticket:** ★ **#1** + legs **#7 → #8 → #4 → #3 → #5** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 1 | KA YING RISING | 34.5% | 74.4% | 1.0 | ✅ | 6 | ★ Banker | **1st** (SP 1.0) |
| L1 | 7 | TOMODACHI KOKOROE | 18.9% | 56.3% | 212 | ✅ | 10 | Leg | 7th (SP 410) |
| L2 | 8 | BEAUTY WAVES | 16.4% | 51.0% | 178 | ✅ | 10 | Leg | 8th (SP 440) |
| L3 | 4 | FAST NETWORK | 14.5% | 49.9% | 252 | ✅ | 8 | Leg | 4th (SP 199) |
| L4 | 3 | HELIOS EXPRESS | 10.3% | 40.9% | 72 | ✅ | 6 | Leg | 6th (SP 135) |
| L5 | 5 | RAGING BLIZZARD | 5.4% | 26.1% | 124 | ✅ | 8 | Leg | **3rd** (SP 345) |
| — | 2 | SATONO REVE | 0.0% | 0.8% | 67 | ❌ | 1 | — | **2nd** (SP 90) |
| — | 6 | COMANCHE BRAVE | 0.0% | 0.6% | 174 | ❌ | 0 | — | 5th (SP 367) |

**Pattern B — Banker hit, pool gap.** Banker **#1** KA YING RISING (Purton, 1.0 SP — unbackable favourite, 7 straight wins) won easily. **#5** RAGING BLIZZARD (L5, primary leg, 345 SP) ran **3rd**. But **#2** SATONO REVE (90 SP, MC 0.0% Win / 0.8% Place, Japanese raider with only 1 form line, Moreira) ran **2nd** — a massive international upset. MC had zero pricing power on this 1-form-line overseas horse. No Step B candidates existed (all remaining odds > 10). This is a structural G1 limitation: MC cannot price international raiders.

### R6 — Class 3 | 1200m Turf | Actual: 4→13→14 ❌

**Ticket:** ★ **#3** + legs **#6 → #5 → #4** | 膽拖 C(3,2) = 3 × $10 = $30

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 3 | CELESTIAL HERO | 39.0% | 83.4% | 8.4 | ✅ | 6 | ★ Banker | 6th (SP 7.4) |
| L1 | 6 | LIFELINE EXPRESS | 28.6% | 76.1% | 8.2 | ❌ (swapped out) | 7 | — | 11th (SP 11) |
| L2 | 5 | COOL BOY | 23.7% | 71.7% | 2.4 | ✅ | 5 | Leg | 4th (SP 2.8) |
| L3 | 4 | GENEVA | 1.3% | 12.6% | 8.9 | ✅ (w<10 swap for #8) | 2 | Leg | **1st** (SP 3.9) |
| — | 8 | PEGAS | 5.0% | 29.9% | 12 | ❌ (swapped out) | 7 | — | 8th (SP 7.7) |
| — | 13 | THUNDER KIT | 1.1% | 10.3% | 10 | ❌ | 4 | — | **2nd** (SP 8.4) |
| — | 14 | LUCKY CANDY | 0.1% | 1.1% | 15 | ❌ | 5 | — | **3rd** (SP 23) |
| — | 9 | OUTGATE | 0.5% | 6.0% | 48 | ❌ | 10 | — | 10th (SP 58) |
| — | 10 | SUGAR SUGAR | 0.4% | 4.6% | 53 | ❌ | 9 | — | 9th (SP 161) |
| — | 7 | SAVVY BRILLIANT | 0.1% | 2.1% | 52 | ❌ | 3 | — | 7th (SP 68) |
| — | 12 | GRIT SPIRIT | 0.1% | 0.9% | 68 | ❌ | 1 | — | 12th (SP 264) |
| — | 1 | CHATEAUNEUF | 0.0% | 0.8% | 36 | ❌ | 9 | — | 14th (SP 55) |
| — | 2 | CIRCUIT GRAND SLAM | 0.0% | 0.2% | 9.9 | ❌ | 7 | — | 5th (SP 37) |
| — | 11 | FLYING HUNTER | 0.0% | 0.4% | 136 | ❌ | 1 | — | 13th (SP 361) |

**Pattern C — Banker fail + pool gap.** Banker **#3** CELESTIAL HERO (Moreira, 7.4 SP, MC 39.0% dominant) finished **6th**. Only 1 of 3 placers was on the ticket: **#4** GENEVA (L3, Step B swap for #8 PEGAS at 8.9 odds, won at 3.9 SP). **#13** THUNDER KIT (10.3% MC, 10 odds — exactly at Step B boundary, not < 10) ran **2nd** and **#14** LUCKY CANDY (1.1% MC, 15 odds) ran **3rd** — both outside pool. The Step B swap correctly identified #4 GENEVA as the market play (Bowman, 8.9 → 3.9 SP), but with only a 3-combo ticket and the banker failing, there was no path to a hit. Strategy B's minimal pool (3 legs after swapping #8 for #4 and keeping #6 swapped out by the #8→#4 replacement) was too thin.

### R7 — G1 FWD Champions Mile | 1600m Turf | Actual: 5→9→3 ❌

**Ticket:** ★ **#10** + legs **#12 → #4 → #14 → #5 → #1** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 10 | INVINCIBLE IBIS | 26.6% | 62.0% | 5.9 | ✅ | 8 | ★ Banker | 4th (SP 9.8) |
| L1 | 12 | CHANCHENG GLORY | 19.7% | 50.5% | 101 | ✅ | 6 | Leg | 8th (SP 214) |
| L2 | 4 | LUCKY SWEYNESSE | 19.1% | 51.5% | 6.6 | ✅ | 6 | Leg | 11th (SP 5.8) |
| L3 | 14 | LITTLE PARADISE | 15.0% | 45.5% | 5.4 | ✅ | 7 | Leg | 10th (SP 7.1) |
| L4 | 5 | MY WISH | 8.1% | 30.8% | 5.0 | ✅ | 7 | Leg | **1st** (SP 5.4) |
| L5 | 1 | JANTAR MANTAR | 0.2% | 1.9% | 4.8 | ✅ (w<10 add) | 0 | Leg | 13th (SP 3.0) |
| — | 7 | GALAXY PATCH | 4.3% | 19.7% | 26 | ❌ | 6 | — | 7th (SP 23) |
| — | 11 | SUNLIGHT POWER | 2.9% | 13.9% | 37 | ❌ | 7 | — | 6th (SP 22) |
| — | 6 | RED LION | 1.8% | 8.7% | 22 | ❌ | 6 | — | 14th (SP 89) |
| — | 2 | VOYAGE BUBBLE | 1.7% | 10.6% | 15 | ❌ | 6 | — | 5th (SP 15) |
| — | 3 | DOCKLANDS | 0.2% | 1.5% | 48 | ❌ | 1 | — | **3rd** (SP 19) |
| — | 8 | STRAUSS | 0.2% | 1.7% | 20 | ❌ | 0 | — | 12th (SP 29) |
| — | 13 | COPARTNER PRANCE | 0.1% | 1.4% | 99 | ❌ | 6 | — | 9th (SP 115) |
| — | 9 | CAP FERRAT | 0.0% | 0.3% | 26 | ❌ | 2 | — | **2nd** (SP 37) |

**Pattern C — Banker fail + pool gap.** Banker **#10** INVINCIBLE IBIS (McDonald, 9.8 SP, MC 26.6% but drifted from 5.9) finished **4th** — missed by 0.01s. Only 1 of 3 placers was on the ticket: **#5** MY WISH (L4, primary leg, Bowman, won at 5.4 SP). **#9** CAP FERRAT (37 SP, MC 0.0% Win / 0.3% Place, bled in Nov + heart irregularity, C Williams) ran a shock **2nd** and **#3** DOCKLANDS (19 SP, UK raider, 1 HK form line, MC 0.2%) ran **3rd** — both outside any pool. Step B correctly added **#1** JANTAR MANTAR (market fav at 4.8 → 3.0 SP) but the Japanese favourite collapsed to **13th** — the biggest market favourite upset of the day. The $6,045 Trio dividend was the largest single-race dividend of the meeting. G1 international chaos.

### R8 — Class 3 | 1400m Turf | Actual: 9→1→4 ❌

**Ticket:** ★ **#10** + legs **#1 → #9 → #7 → #4** | 膽拖 C(4,2) = 6 × $10 = $60

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 10 | AEROINVINCIBLE | 52.4% | 88.4% | 8.0 | ✅ | 8 | ★ Banker | 4th (SP 6.9) |
| L1 | 1 | HELENE SUPAFEELING | 28.9% | 76.1% | 8.6 | ✅ | 4 | Leg | **2nd** (SP 5.9) |
| L2 | 9 | MIGHTY COMMANDER | 7.5% | 41.9% | 9.3 | ✅ | 10 | Leg | **1st** (SP 18) |
| L3 | 7 | THE RED HARE | 3.7% | 27.2% | 7.2 | ✅ | 9 | Leg | 11th (SP 6.2) |
| L4 | 4 | FIT FOR BEAUTY | 3.3% | 26.7% | 4.9 | ✅ | 9 | Leg | **3rd** (SP 3.4) |
| — | 2 | CHIU CHOW SPIRIT | 1.7% | 14.7% | 14 | ❌ | 7 | — | 12th (SP 67) |
| — | 5 | ANOTHER WORLD | 1.3% | 11.0% | 35 | ❌ | 8 | — | 14th (SP 76) |
| — | 6 | DARYL FLASH | 1.0% | 9.5% | 15 | ❌ | 5 | — | 8th (SP 60) |
| — | 11 | CALIFORNIA WAVES | 0.1% | 3.1% | 12 | ❌ | 9 | — | 5th (SP 25) |
| — | 3 | POWER OF VITAM | 0.0% | 0.8% | 12 | ❌ | 3 | — | 6th (SP 6.0) |
| — | 13 | POSITIVE SMILE | — | — | — | ❌ | — | — | 7th (SP 13) |
| — | 12 | HAROLD WIN | — | — | — | ❌ | — | — | 10th (SP 17) |
| — | 14 | LEGENDARY YEARS | — | — | — | ❌ | — | — | 9th (SP 126) |
| — | 8 | CLASS | 0.0% | 0.4% | 32 | ❌ | — | — | 13th (SP 239) |

**Pattern A — all 3 in pool, wrong banker.** Banker **#10** AEROINVINCIBLE (Atzeni, 6.9 SP, MC's strongest signal at 52.4%) finished **4th** — missed by 0.02s. All three placers were on the ticket: **#9** MIGHTY COMMANDER (L2, primary leg, Moreira, won at 18 SP), **#1** HELENE SUPAFEELING (L1, primary leg, 2nd at 5.9), and **#4** FIT FOR BEAUTY (L4, primary leg, Purton, 3rd at 3.4). This is the second-most painful Pattern A of the day — the pool was perfect but the MC #1 (back-to-back wins, 52.4% dominant signal) just missed the frame. No Step B activity (no candidates existed).

### R9 — G1 FWD QEII Cup | 2000m Turf | Actual: 2→1→4 ❌

**Ticket:** ★ **#2** + legs **#7 → #8 → #1** | 膽拖 C(3,2) = 3 × $10 = $30

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 2 | ROMANTIC WARRIOR | 44.1% | 85.8% | 1.6 | ✅ | 4 | ★ Banker | **1st** (SP 1.3) |
| L1 | 7 | RUBYLOT | 28.1% | 74.4% | 20 | ✅ | 5 | Leg | 6th (SP 104) |
| L2 | 8 | NUMBERS | 19.1% | 67.9% | 9.9 | ✅ | 5 | Leg | 7th (SP 23) |
| L3 | 1 | MASQUERADE BALL | 1.6% | 14.0% | 4.6 | ✅ (w<10 add) | 0 | Leg | **2nd** (SP 5.6) |
| — | 4 | SOSIE | 2.4% | 18.0% | 11 | ❌ | 1 | — | **3rd** (SP 8.2) |
| — | 6 | JUNE TAKE | 1.6% | 13.4% | 11 | ❌ | 0 | — | 8th (SP 35) |
| — | 5 | GIOVANNI | 1.6% | 13.1% | 29 | ❌ | 0 | — | 5th (SP 101) |
| — | 3 | ROYAL CHAMPION | 1.5% | 13.4% | 34 | ❌ | 0 | — | 4th (SP 17) |

**Pattern B — Banker hit, pool gap.** Banker **#2** ROMANTIC WARRIOR (McDonald, 1.3 SP, G1 legend, record holder) won as expected. **#1** MASQUERADE BALL (L3, Step B add at 4.6 odds, Japanese G1 raider, Lemaire) ran **2nd** at 5.6 SP — Step B correctly captured the market favourite. But **#4** SOSIE (8.2 SP, French raider, MC 2.4% / 18.0% Place, 11 odds — exactly at Step B boundary, not < 10) ran **3rd**. Strategy A's pool included #4 SOSIE as a leg (via pool fill), so **A had the hit** (if banker placed + #1 + #4 = 2-1-4 → $35). B's $30 ticket missed by one horse. The near-miss cost was small ($35 Trio) but this is the clearest case of Step B boundary precision: #4 at 11 odds was 1 tick above the < 10 threshold.

### R10 — Class 3 | 1600m Turf | Actual: 8→5→3 ❌

**Ticket:** ★ **#9** + legs **#5 → #8 → #13 → #6 → #1 → #3** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 9 | THE GOLDEN KNIGHT | 28.0% | 62.3% | 3.5 | ✅ | 8 | ★ Banker | 11th (SP 7.1) |
| L1 | 5 | LOVERO | 23.0% | 56.7% | 14 | ✅ | 7 | Leg | **2nd** (SP 7.9) |
| L2 | 8 | BLAZING WUKONG | 11.5% | 37.4% | 15 | ✅ | 8 | Leg | **1st** (SP 6.8) |
| L3 | 13 | MASTER TRILLION | 9.6% | 32.0% | 27 | ✅ | 8 | Leg | 12th (SP 33) |
| L4 | 6 | FAMILY JEWEL | 6.8% | 24.6% | 9.0 | ✅ | 3 | Leg | 9th (SP 10) |
| L5 | 1 | LUCKY SAM GOR | 5.9% | 24.3% | 10 | ✅ | 10 | Leg | 5th (SP 11) |
| L6 | 3 | ENDUED | 2.3% | 11.5% | 6.8 | ✅ (w<10 swap for #4) | 8 | Leg | **3rd** (SP 5.5) |
| — | 4 | SHANWAH | 8.7% | 29.4% | 11 | ❌ (swapped out) | 7 | — | 13th (SP 27) |
| — | 7 | NATURAL NUMBERS | 2.1% | 9.9% | 14 | ❌ | 6 | — | 7th (SP 36) |
| — | 2 | WINDLORD | 1.7% | 8.4% | 28 | ❌ | 5 | — | 10th (SP 19) |
| — | 10 | SHAMUS STORM | 0.3% | 2.1% | 10 | ❌ | 5 | — | 6th (SP 5.8) |
| — | 11 | TRINITY TREASURE | — | — | — | ❌ | — | — | 4th (SP 279) |
| — | 14 | RISING PHOENIX | — | — | — | ❌ | — | — | 8th (SP 8.6) |
| — | 12 | DRAGON ON SNOW | — | — | — | ❌ | — | — | 14th (SP 236) |

**Pattern A — all 3 in pool, wrong banker.** Banker **#9** THE GOLDEN KNIGHT (Guyon, 7.1 SP, MC 28.0% — drifted from 3.5, back-to-back winner) collapsed to **11th**. All three placers were on the ticket: **#8** BLAZING WUKONG (L2, primary leg, won at 6.8), **#5** LOVERO (L1, primary leg, 2nd at 7.9), **#3** ENDUED (L6, Step B swap for #4 SHANWAH, 3rd at 5.5). The Step B swap was **critical** — if #4 SHANWAH (the swapped-out horse, 13th at 27 SP) had remained instead of #3, the ticket still would have missed (banker failed anyway). But #3's presence validated Step B's judgment: market-backed at 6.8 odds, C Williams riding for Size. This is the fourth Pattern A of the day.

### R11 — Class 2 | 1400m Turf | Actual: 5→9→12 ✅

**Ticket:** ★ **#12** + legs **#11 → #9 → #2 → #5** | 膽拖 C(4,2) = 6 × $10 = $60

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 12 | MIGHTY MASTS | 54.4% | 88.4% | 8.2 | ✅ | 5 | ★ Banker | **3rd** (SP 4.0) |
| L1 | 11 | SALON S | 20.6% | 67.5% | 3.9 | ✅ | 4 | Leg | 4th (SP 2.8) |
| L2 | 9 | SIX PACK | 9.8% | 45.9% | 5.3 | ✅ | 9 | Leg | **2nd** (SP 7.7) |
| L3 | 2 | LIGHT YEARS CHARM | 9.3% | 43.4% | 19 | ✅ | 7 | Leg | 12th (SP 47) |
| L4 | 5 | WINNING OVATION | 1.8% | 15.6% | 7.2 | ✅ (w<10 add) | 3 | Leg | **1st** (SP 4.0) |
| — | 3 | STORM RIDER | 2.3% | 17.8% | 32 | ❌ | 10 | — | 7th (SP 178) |
| — | 7 | INFINITE RESOLVE | 1.1% | 11.1% | 19 | ❌ | 9 | — | 9th (SP 39) |
| — | 14 | WE ARE HERO | 0.4% | 5.7% | 19 | ❌ | 7 | — | 14th (SP 160) |
| — | 1 | PACKING HERMOD | 0.3% | 3.1% | 19 | ❌ | 4 | — | 13th (SP 58) |
| — | 4 | MUGEN | 0.1% | 1.0% | 16 | ❌ | 8 | — | 11th (SP 32) |
| — | 10 | DROMBEG BANNER | — | — | — | ❌ | — | — | 5th (SP 136) |
| — | 13 | JUNEAU PRIDE | — | — | — | ❌ | — | — | 6th (SP 12) |
| — | 8 | EMBLAZON | 0.0% | 0.0% | 17 | ❌ | — | — | 10th (SP 48) |
| — | 6 | KAHOLO ANGEL | 0.0% | 0.0% | 30 | ❌ | — | — | 8th (SP 126) |

**Hit.** Banker **#12** MIGHTY MASTS (Teetan, 4.0 SP, MC 54.4% dominant) placed **3rd**. **#5** WINNING OVATION (L4, Step B add at 7.2 odds, Purton, won at 4.0 SP) ran **1st** and **#9** SIX PACK (L2, primary leg, Badel, 2nd at 7.7 SP) ran **2nd**. Line **12-5-9** pays **$176**. The Step B add was **decisive**: #5 WINNING OVATION was below the 20% Place threshold (15.6%) but Step B captured it at 7.2 odds — and Purton delivered. Without Step B, this ticket has **no hit** (#5 would not be in pool). Strategy A missed this entirely — A's 雙膽拖 with #12+#11 as bankers required both to place; #11 SALON S (market favourite at 2.8 SP, 4 straight wins) finished **4th**, killing the A ticket.

---

## Hit Detail (1 hit)

### R11 ✅ — Trio $176 | Stake $60 | P&L +$116

Paying **5→9→12**; **#12** banker **3rd** (SP 4.0); legs **#5** (1st, SP 4.0, Step B add) · **#9** (2nd, SP 7.7) — line **12-5-9**. Step B add of #5 WINNING OVATION (7.2 odds, 15.6% MC Place, Purton) was the decisive move. Strategy A had 雙膽拖 with #12+#11 as co-bankers — #11 SALON S (2.8 SP, 4/4 wins) ran 4th, killing A's ticket. **B's single-banker structure outperformed A's double-banker** this race.

---

## Banker Performance (Strategy B — MC #1)

| Race | Banker | MC Place% | MC Win% | Odds (early) | Finished | SP | Placed? |
|------|--------|-----------|---------|--------------|----------|----|---------|
| R1 | #5 THE HEIR | 88.9% | 51.6% | 3.4 | 5th | 8.6 | ❌ |
| R2 | #4 AESTHETICISM | 71.3% | 37.2% | 31 | 9th | 28 | ❌ |
| R3 | #3 HAYDAY | 79.0% | 45.8% | 11 | 5th | 20 | ❌ |
| R4 | #3 ROBOT STAR | 82.3% | 48.2% | 7.8 | 7th | 8.9 | ❌ |
| R5 | #1 KA YING RISING | 74.4% | 34.5% | 1.0 | 1st | 1.0 | ✅ |
| R6 | #3 CELESTIAL HERO | 83.4% | 39.0% | 8.4 | 6th | 7.4 | ❌ |
| R7 | #10 INVINCIBLE IBIS | 62.0% | 26.6% | 5.9 | 4th | 9.8 | ❌ |
| R8 | #10 AEROINVINCIBLE | 88.4% | 52.4% | 8.0 | 4th | 6.9 | ❌ |
| R9 | #2 ROMANTIC WARRIOR | 85.8% | 44.1% | 1.6 | 1st | 1.3 | ✅ |
| R10 | #9 THE GOLDEN KNIGHT | 62.3% | 28.0% | 3.5 | 11th | 7.1 | ❌ |
| R11 | #12 MIGHTY MASTS | 88.4% | 54.4% | 8.2 | 3rd | 4.0 | ✅ |

**3/11** MC #1 bankers in the top three — **1** Trio collect. The worst single-meeting banker rate of the campaign (27.3%). Only the two G1 superstars (#1 KA YING RISING, #2 ROMANTIC WARRIOR) and the C2 pick (#12 MIGHTY MASTS) placed. All 8 other MC #1 selections — including 4 horses with MC Win% > 40% (R1 #5 at 51.6%, R3 #3 at 45.8%, R4 #3 at 48.2%, R8 #10 at 52.4%) — failed to place top 3.

---

## Miss Classification

| Pattern | Count | Races | Description |
|---------|-------|-------|-------------|
| **A — All 3 in pool, wrong banker** | 4 | R2, R3, R8, R10 | Most painful — ticket had all 3 placers as legs |
| **B — Banker hit, pool gap** | 2 | R5, R9 | Banker placed but a placing horse was outside the leg pool |
| **C — Banker fail + pool gap** | 4 | R1, R4, R6, R7 | Banker missed AND at least 1 placer outside pool |

**Pattern A total forfeited dividends:** $166 (R2) + $243 (R3) + $526 (R8) + $484 (R10) = **$1,419** — would have swung session from −$964 to +$455.

**Pattern A dominance:** 4/10 misses had a perfect pool but the wrong banker — the single highest Pattern A count in the campaign. The pool width is working (Step B added legs that placed in multiple races) but the MC #1 banker selection catastrophically failed in 8/11 races.

**Pattern C concentration in G1 races:** R5, R7, R9 all featured international raiders that MC couldn't price. The 3 G1 races contributed $230 in stakes and returned $0.

---

## Lessons

1. **Banker failure was the overwhelmingly dominant miss pattern (8/11 out of frame).** This is the inverse of the 22 Apr HV session (8/9 bankers placed). MC #1 horses with 40%+ Win% — the strongest statistical signals MC produces — failed at a 4/5 rate (R1, R3, R4, R8). The model's strongest convictions were systematically wrong on Champions Day. Market odds shifts (R1 #5: 3.4→8.6, R3 #3: 11→20, R4 #3: 7.8→8.9) suggest the market knew something MC didn't about race-day conditions.

2. **Pattern A was catastrophic: $1,419 in forfeited dividends across 4 races.** The pool was correct in R2, R3, R8, and R10 — every placer was a Strategy B leg — but the banker failed each time. If any flexible banker mechanism existed (e.g. "if banker fails, check all-leg combos"), B would have been +$455 instead of −$964.

3. **Step B delivered the only hit (R11, +$116).** #5 WINNING OVATION (7.2 odds, Purton, 15.6% MC Place) was added via Step B and won. Without Step B, B has **0 hits** on this card — identical to 22 Apr HV where Step B also delivered both hits. Step B is now responsible for 100% of all Strategy B hits across the last two meetings.

4. **G1 international races remain structurally unfixable for MC.** R5: #2 SATONO REVE (0.8% MC) ran 2nd. R7: #9 CAP FERRAT (0.3% MC) ran 2nd, #3 DOCKLANDS (1.5% MC) ran 3rd. R9: #4 SOSIE (18.0% MC, 11 odds — 1 tick above Step B boundary) ran 3rd. MC has zero pricing power on 0-form international raiders. Even Step B's market-odds mechanism failed when #1 JANTAR MANTAR (3.0 SP market favourite, added via Step B) ran 13th in R7.

5. **Step B boundary precision: R9 #4 SOSIE at 11 odds.** The French raider's odds were exactly 11 — one tick above the <10 threshold. SOSIE ran 3rd and would have completed the Trio (banker hit + #1 + #4). The $35 Trio dividend was small but the miss illustrates the Step B cutoff's brittleness in G1 international fields where overseas runners often price 10-15 odds.

6. **R6 pool was dangerously narrow (3 combos).** Step B replaced #8 PEGAS (primary leg, 29.9% Place) with #4 GENEVA (12.6%, 8.9 odds) — leaving only 3 legs. With the banker failing, a 3-combo ticket has almost no margin for error. Consider a minimum leg count floor for Strategy B (e.g. ≥ 4 legs always).

---

## A vs B divergence (this meeting)

| Metric | Strategy A | Strategy B | Delta (B − A) |
|--------|-----------|-----------|---------------|
| Hits | 0/11 | 1/11 (R11) | B +1 |
| Total staked | $630 | $1,140 | B +$510 |
| Total returned | $0 | $176 | B +$176 |
| **Net P&L** | **−$630** | **−$964** | **A +$334** |
| **ROI** | **−100.0%** | **−84.6%** | **B +15.4pp** |

**A lost less ($334 better)** due to lower total stake — A's tighter 雙膽拖 / small-pool structures cost less per race. B's only win (R11 $176) came from a Step B add that A didn't have. But B's wider pools also cost more per miss. On ROI, **B was less bad (−84.6% vs −100%)** thanks to the R11 salvage. Neither strategy survived Champions Day — the worst meeting for both strategies in the campaign.

---

## Cross-reference

| File | Role |
|------|------|
| `data/reviews/trio_review_stratC_20260422_HV.md` | Previous long-form B review (Happy Valley) |
| `data/reviews/trio_review_20260426_ST.md` | Full post-race note (Strategy A + B summary, cumulative tables) |
| `data/reports/trio_strategy_20260426_ST_R1.md` … `R11.md` | Pre-race Strategy A + **Strategy B (MC-only)** blocks |
| `data/historical/results_20260426_ST.json` | Finishes + Trio dividends |

---

*Post-race learning only — not betting advice.*
