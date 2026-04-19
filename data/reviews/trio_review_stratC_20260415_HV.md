# Strategy B Review — MC #1 banker + primary Place%>20% + win-odds add/swap (trio SKILL) | Happy Valley | 15 Apr 2026

## Rules

- **Banker**: MC **#1** by MC Win% (same as “MC #1” in reports).
- **Primary legs**: all other runners with **MC Place% > 20%** (banker excluded).
- **Step B (win odds &lt; 10, Place% ≤ 20%)**: **replace** one primary leg when the SKILL swap rule fires; otherwise **add** short-priced tails (see each `trio_strategy_20260415_HV_R*.md`).
- **Data**: `--form-data all` (all-venue history); HKJC win odds from `data/odds/odds_20260415_HV.json` at report time.
- **Bet type**: Trio (單T) — top 3 in **any** order.
- **Unit**: **$10** per combination; structure **膽拖** 1 banker + N legs → **C(N, 2)** combos.

**Stake convention (this review):** **Full Strategy B** = the published **final legs** after Step B in each report, including **7-leg** R6/R8 and **15-line** R9. Reports also document **lean** caps (R6/R8/R9); see **Summary** for an alternate total.

**Note:** This is the **trio-strategy SKILL** Strategy B pipeline (**MC-only**), **not** Strategy A (Adj Win/Place + jockey + SCMP + Modes A–B).

**Pre-race definitions:** `data/reports/trio_strategy_20260415_HV_R1.md` … **R9.md**. **R10** not in scope (no report in this slice).

**Results source:** `tools/scrape-meeting.ts --date=2026-04-15 --venue=HV` → `data/historical/results_20260415_HV.json`. **Finished** + **SP** = `winOdds` on each finisher row. **MC % / odds** from the trio reports (~03:34 HKT fetch in JSON).

---

## Summary

| Metric | Value |
|--------|-------|
| Races played | **9 (R1–R9)** |
| Hit rate | **3/9 (33.3%)** |
| Total staked | **$1,020** (full Strategy B; see below) |
| Total returned | **$750** |
| **Net P&L** | **−$270** |
| **ROI** | **−26.5%** |
| Session Result | **LOSS** |

**Context — lean cap (where reports offer it):** If R6/R8 use **primary-only** / **lean** **$100** each and R9 uses **lean** **$60** (six lines), total stake **$710**, same three hits → **net +$40** (**ROI +5.6%**). Full B spends **+$310** extra on wider legs that did **not** convert an extra dividend here.

---

## Race-by-Race Results

Banker = MC Win% **#1**. Legs = **final Strategy B legs** after Step B add/swap (see per-race reports).

| Race | Class | Dist | Banker (MC#1) | Final legs (after Step B) | Structure | Combos | Stake | Result (1→2→3) | Banker placed? | Hit? | Trio $ | Return | P&L |
|------|-------|------|---------------|---------------------------|-----------|--------|-------|----------------|----------------|------|--------|--------|-----|
| R1 | C5 | 1000m | #4(44.7W/84.2P) | #3,#5,#6 | 膽拖 1B+3L | 3 | $30 | 6→5→4 | 3rd ✅ | ✅ | $168 | $168 | +$138 |
| R2 | C5 | 1650m | #8(46.8W/87.5P) | #6,#4,#9,#7 | 膽拖 1B+4L | 6 | $60 | 6→7→3 | **9th ❌** | ❌ | $2783 | $0 | −$60 |
| R3 | C4 | 1650m | #2(27.3W/61.1P) | #10,#5,#1,#7,#4 | 膽拖 1B+5L | 10 | $100 | 1→10→11 | **12th ❌** | ❌ | $485 | $0 | −$100 |
| R4 | C4 | 1800m | #11(52.5W/95.4P) | #4,#3,#1,#10 | 膽拖 1B+4L | 6 | $60 | 4→10→11 | 3rd ✅ | ✅ | $465 | $465 | +$405 |
| R5 | C3 | 1650m | #1(33.7W/74.4P) | #3,#7,#10,#4,#2 | 膽拖 1B+5L | 10 | $100 | 1→4→10 | 1st ✅ | ✅ | $117 | $117 | +$17 |
| R6 | C4 | 1200m | #8(32.2W/69.0P) | #5,#4,#1,#11,#2,#9,#3 | 膽拖 1B+7L | 21 | $210 | 3→9→1 | **5th ❌** | ❌ | $450 | $0 | −$210 |
| R7 | C4 | 1200m | #6(35.5W/72.0P) | #3,#4,#7,#5,#1 | 膽拖 1B+5L | 10 | $100 | 11→1→6 | 3rd ✅ | ❌ | $393 | $0 | −$100 |
| R8 | C3 | 1650m | #10(23.6W/58.0P) | #3,#2,#8,#1,#4,#11,#5 | 膽拖 1B+7L | 21 | $210 | 11→9→8 | **6th ❌** | ❌ | $233 | $0 | −$210 |
| R9 | C3 | 1200m | #12(37.4W/73.6P) | #1,#5,#2,#9,#4,#7 | 膽拖 1B+6L | 15 | $150 | 7→6→12 | 3rd ✅ | ❌ | $720 | $0 | −$150 |
| **TOTAL** | | | | | | **102** | **$1,020** | | **5/9** bank in frame | **3/9** | | **$750** | **−$270** |

---

## Full MC Place% Table (ticket horses + field)

*Odds* = pre-race HKJC win odds from `data/reports/trio_strategy_20260415_HV_R*.md`. **Finished** + **SP** from `data/historical/results_20260415_HV.json`.

**Row order:** **★** banker, then legs **L1, L2, …** in **final Strategy B leg order**, then **—** other starters by saddle #.

**Column “Pool”:** **✅** = on final Strategy B ticket (primary **P>20%** or Step B add/swap).

### R1 — Class 5 | 1000m Turf | Actual: 6→5→4 ✅

**Ticket:** ★ **#4** + legs **#3 → #5 → #6** | 膽拖 C(3,2) = **3** × $10 = **$30**

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 4 | SPICY SPANGLE | 44.7% | 84.2% | 7.1 | ✅ | 7 | ★ Banker | **3rd** (SP 5.5) |
| L1 | 3 | LUCKY GENERATIONS | 19.4% | 64.0% | 3.5 | ✅ | 8 | Leg | 7th |
| L2 | 5 | MACANESE MASTER | 5.9% | 33.5% | 3.9 | ✅ | 8 | Leg | **2nd** (SP 3.4) |
| L3 | 6 | ALWAYS MY FOLKS | 23.9% | 68.8% | 7.5 | ✅ | 6 | Leg | **1st** (SP 4.9) |
| — | 1 | COUNTRY DANCER | 1.6% | 11.6% | 10 | ❌ | 3 | — | 5th |
| — | 2 | FORTUNE WARRIOR | 0.0% | 0.2% | 24 | ❌ | 7 | — | 12th |
| — | 7 | RUN YES RUN | 2.0% | 14.1% | 49 | ❌ | 3 | — | 10th |
| — | 8 | TAIHANG SCENERY | 1.1% | 10.1% | 24 | ❌ | 3 | — | 4th |
| — | 9 | ORIENTAL SURPRISE | 1.3% | 12.1% | 22 | ❌ | 15 | — | 8th |
| — | 10 | SHINE BRIGHT | 0.0% | 0.5% | 20 | ❌ | 8 | — | 9th |
| — | 11 | SPORTIC WARRIOR | 0.1% | 1.0% | 87 | ❌ | 4 | — | 11th |
| — | 12 | BINGO BABE | 0.0% | 0.0% | 10 | ❌ | 8 | — | 6th |

**Hit.** Same paying set **{4,5,6}** as Strategy A; B drops **#9** and halves stake vs A’s **$60**.

### R2 — Class 5 | 1650m Turf | Actual: 6→7→3 ❌

**Ticket:** ★ **#8** + legs **#6 → #4 → #9 → #7** | 膽拖 C(4,2) = **6** × $10 = **$60**

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 8 | COURIER MAGIC | 46.8% | 87.5% | 14 | ✅ | 6 | ★ Banker | **9th** (SP 6.6) |
| L1 | 6 | FAMILY FORTUNE | 34.0% | 81.0% | 3.8 | ✅ | 7 | Leg | **1st** (SP 4.3) |
| L2 | 4 | EXCEED THE WISH | 7.3% | 39.9% | 19 | ✅ | 8 | Leg | 11th |
| L3 | 9 | DRAGON SUNRISE | 6.6% | 39.6% | 3.6 | ✅ | 9 | Leg | 6th |
| L4 | 7 | DOUBLE BINGO | 1.8% | 15.0% | 9.6 | ✅ (w&lt;10 add) | 5 | Leg | **2nd** (SP 11) |
| — | 1 | FLOOF | 0.0% | 0.0% | 11 | ❌ | 5 | — | 7th |
| — | 2 | POWER SUMMIT | 2.4% | 19.1% | 48 | ❌ | 8 | — | 10th |
| — | 3 | ZETTA FORCE | 0.1% | 1.8% | 16 | ❌ | 4 | — | **3rd** (SP 39) |
| — | 5 | INNO CENTURY | 0.1% | 1.7% | 25 | ❌ | 4 | — | 12th |
| — | 10 | WAH MAY WAI WAI | 0.5% | 7.1% | 10 | ❌ | 9 | — | 5th |
| — | 11 | PERFECTO MOMENTS | 0.1% | 1.4% | 9.2 | ❌ | 6 | — | 4th |
| — | 12 | SMART TRIO | 0.5% | 6.0% | 25 | ❌ | 9 | — | 8th |

**Banker fail.** **#3** third at long SP sits outside both tickets; B’s win-odds **add #7** (2nd) still leaves **#3** uncovered vs A’s **#2** leg — same structural miss.

### R3 — Class 4 | 1650m Turf | Actual: 1→10→11 ❌

**Ticket:** ★ **#2** + legs **#10 → #5 → #1 → #7 → #4** | 膽拖 C(5,2) = **10** × $10 = **$100**

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 2 | WIN EASE | 27.3% | 61.1% | 31 | ✅ | 6 | ★ Banker | **12th** (SP 73) |
| L1 | 10 | RUN RUN TIMING | 25.2% | 61.8% | 6.9 | ✅ | 7 | Leg | **2nd** (SP 4) |
| L2 | 5 | THE AZURE | 21.3% | 56.0% | 20 | ✅ | 7 | Leg | 8th |
| L3 | 1 | FANTASTIC FUN | 10.2% | 37.6% | 4.1 | ✅ | 10 | Leg | **1st** (SP 3.8) |
| L4 | 7 | RED BRICK WARRIOR | 6.4% | 27.5% | 5.7 | ✅ | 5 | Leg | 7th |
| L5 | 4 | TAKE ACTION | 3.2% | 16.4% | 4.6 | ✅ (w&lt;10 add) | 11 | Leg | 6th |
| — | 3 | STATE SECURITY | 2.3% | 12.5% | 52 | ❌ | 1 | — | 11th |
| — | 6 | TO INFINITY | 1.7% | 10.6% | 28 | ❌ | 8 | — | 9th |
| — | 8 | LAKESHORE HERO | 0.9% | 6.0% | 35 | ❌ | 6 | — | 5th |
| — | 9 | KOLACHI | 0.8% | 5.1% | 15 | ❌ | 8 | — | 10th |
| — | 11 | VIVA FIRECRACKER | 0.7% | 5.0% | 12 | ❌ | 7 | — | **3rd** (SP 15) |
| — | 12 | FRANTANCK | 0.0% | 0.3% | 9.7 | ❌ | 7 | — | 4th |

**Banker fail.** **#11** third outside both A and B pools; **#2** collapses from MC lead.

### R4 — Class 4 | 1800m Turf | Actual: 4→10→11 ✅

**Ticket:** ★ **#11** + legs **#4 → #3 → #1 → #10** | 膽拖 C(4,2) = **6** × $10 = **$60**

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 11 | ROMANTIC FANTASY | 52.5% | 95.4% | 6.4 | ✅ | 9 | ★ Banker | **3rd** (SP 7.7) |
| L1 | 4 | HARMONY GALAXY | 25.0% | 87.2% | 6.1 | ✅ | 10 | Leg | **1st** (SP 8.9) |
| L2 | 3 | NOBLE PURSUIT | 21.1% | 84.0% | 4.0 | ✅ | 9 | Leg | 4th |
| L3 | 1 | ENTHRALLED | 0.0% | 2.1% | 5.3 | ✅ (w&lt;10 add) | 9 | Leg | 8th |
| L4 | 10 | KINGLY DEMEANOR | 0.0% | 0.4% | 7.2 | ✅ (w&lt;10 add) | 9 | Leg | **2nd** (SP 6) |
| — | 2 | ROMANTIC LAOS | 0.1% | 4.4% | 19 | ❌ | 8 | — | 5th |
| — | 5 | OCEAN IMPACT | 0.2% | 6.2% | 29 | ❌ | 8 | — | 9th |
| — | 6 | SHARPEN BRIGHT | 0.2% | 3.8% | 24 | ❌ | 10 | — | 11th |
| — | 7 | CAN'T GO WONG | 0.9% | 14.0% | 15 | ❌ | 9 | — | 10th |
| — | 8 | FOREVER GLORIOUS | 0.0% | 0.6% | 48 | ❌ | 7 | — | 12th |
| — | 9 | SMART CITY | 0.0% | 1.7% | 11 | ❌ | 8 | — | 6th |
| — | 12 | SPLENDID FORCE | 0.0% | 0.1% | 41 | ❌ | 6 | — | 7th |

**Hit (B only vs published A pool).** Step B **adds #1 and #10**; **#10** fills 2nd — Strategy A’s Mode A pool used **#7/#5** instead of **#10**.

### R5 — Class 3 | 1650m Turf | Actual: 1→4→10 ✅

**Ticket:** ★ **#1** + legs **#3 → #7 → #10 → #4 → #2** | 膽拖 C(5,2) = **10** × $10 = **$100**

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 1 | BEAUTY ALLIANCE | 33.7% | 74.4% | 7.5 | ✅ | 5 | ★ Banker | **1st** (SP 5) |
| L1 | 3 | WROTE A NEW PAGE | 28.3% | 69.0% | 4.3 | ✅ | 7 | Leg | 6th |
| L2 | 7 | CALIFORNIA MOXIE | 20.4% | 60.3% | 11 | ✅ | 8 | Leg | 10th |
| L3 | 10 | WIN METHOD | 7.7% | 34.1% | 6.0 | ✅ | 10 | Leg | **3rd** (SP 5.5) |
| L4 | 4 | DO YOUR PART | 4.3% | 24.7% | 4.2 | ✅ | 8 | Leg | **2nd** (SP 3.7) |
| L5 | 2 | LE ZONDA | 0.8% | 5.8% | 9.2 | ✅ (w&lt;10 add) | 3 | Leg | 5th |
| — | 5 | KING LOTUS | 2.4% | 15.8% | 13 | ❌ | 8 | — | 9th |
| — | 6 | FORTUNATE SON | 0.2% | 1.6% | 31 | ❌ | 9 | — | 4th |
| — | 8 | SUPERB KID | 0.0% | 0.7% | 44 | ❌ | 10 | — | 7th |
| — | 9 | GRATIFIDE | 0.0% | 0.0% | 15 | ❌ | 3 | — | 11th |
| — | 11 | SUPREME MASTERMIND | 2.2% | 13.4% | 18 | ❌ | 11 | — | 8th |

**Hit.** Line **1-4-10** lands; B’s **#2** add was not needed for the collect. **vs A:** A2 single-banker **$60** also hits; B pays **$100** for the same core five plus **#2**.

### R6 — Class 4 | 1200m Turf | Actual: 3→9→1 ❌

**Ticket:** ★ **#8** + legs **#5 → #4 → #1 → #11 → #2 → #9 → #3** | 膽拖 C(7,2) = **21** × $10 = **$210**

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 8 | QUARTZ LEGEND | 32.2% | 69.0% | 3.7 | ✅ | 7 | ★ Banker | **5th** (SP 3.1) |
| L1 | 5 | GOLDEN EMPIRE | 17.0% | 49.5% | 12 | ✅ | 9 | Leg | 7th |
| L2 | 4 | TEAM TEAM FOLKS | 16.4% | 49.1% | 11 | ✅ | 4 | Leg | — |
| L3 | 1 | MOTOR | 13.8% | 44.5% | 15 | ✅ | 7 | Leg | **3rd** (SP 8.3) |
| L4 | 11 | PRESTIGE HALL | 10.9% | 39.4% | 5.3 | ✅ | 6 | Leg | 6th |
| L5 | 2 | NORTHERN FIRE BALL | 6.0% | 26.1% | 10 | ✅ | 8 | Leg | — |
| L6 | 9 | CLOUD NINE | 2.7% | 15.3% | 6.3 | ✅ (w&lt;10 add) | 3 | Leg | **2nd** (SP 4.3) |
| L7 | 3 | STORMING DRAGON | 0.2% | 1.4% | 6.7 | ✅ (w&lt;10 add) | 13 | Leg | **1st** (SP 7.5) |
| — | 6 | RYUI KOKOROE | 0.1% | 0.8% | 26 | ❌ | 6 | — | 4th |
| — | 7 | ORIGIN OF FORM | 0.2% | 1.1% | 26 | ❌ | 5 | — | 8th |
| — | 10 | NEXT FORTUNE | 0.5% | 3.6% | 44 | ❌ | 1 | — | 9th |
| — | 12 | FLYING CHRISTIE | 0.0% | 0.1% | 35 | ❌ | 6 | — | 10th |

**Banker fail.** **#8** out of the frame; **#3**/**#9**/**#1** were frame horses on the wide ticket but cannot pay without the banker. **#2**/**#4** not in results JSON (scratched/DNR) — **Finished** shown as **—**. **Lean** primary-only (**$100**) matches A and also misses.

### R7 — Class 4 | 1200m Turf | Actual: 11→1→6 ❌

**Ticket:** ★ **#6** + legs **#3 → #4 → #7 → #5 → #1** | 膽拖 C(5,2) = **10** × $10 = **$100**

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 6 | THE HEIR | 35.5% | 72.0% | 3.1 | ✅ | 10 | ★ Banker | **3rd** (SP 2.7) |
| L1 | 3 | MASTER LUCKY | 26.0% | 63.4% | 7.1 | ✅ | 4 | Leg | 7th |
| L2 | 4 | GENIUS BABY | 10.0% | 38.4% | 10 | ✅ | 9 | Leg | 6th |
| L3 | 7 | FATAL BLOW | 9.8% | 36.6% | 9.7 | ✅ | 6 | Leg | 5th |
| L4 | 5 | RAINBOW SEVEN | 6.8% | 28.3% | 4.3 | ✅ | 7 | Leg | 4th |
| L5 | 1 | ARGENTO OCEAN | 4.9% | 23.5% | 13 | ✅ | 6 | Leg | **2nd** (SP 10) |
| — | 2 | AMAZING VICTORY | 3.5% | 15.7% | 53 | ❌ | 1 | — | 8th |
| — | 8 | SUPERB BOY | 2.5% | 13.3% | 24 | ❌ | 9 | — | 9th |
| — | 9 | TRENDY RUSH | 1.0% | 7.0% | 37 | ❌ | 1 | — | 10th |
| — | 10 | GREAT LOOKING | 0.0% | 0.0% | 76 | ❌ | 1 | — | 12th |
| — | 11 | WORLD HERO | 0.1% | 1.2% | 12 | ❌ | 8 | — | **1st** (SP 8.2) |
| — | 12 | CALIFORNIA DEEPLY | 0.1% | 0.5% | 15 | ❌ | 9 | — | 11th |

**Pattern B.** Banker **#6** placed; **#11** winner sat at **0.1%** MC win — outside the shared A/B pool.

### R8 — Class 3 | 1650m Turf | Actual: 11→9→8 ❌

**Ticket:** ★ **#10** + legs **#3 → #2 → #8 → #1 → #4 → #11 → #5** | 膽拖 C(7,2) = **21** × $10 = **$210**

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 10 | RAGGA BOMB | 23.6% | 58.0% | 11 | ✅ | 9 | ★ Banker | **6th** (SP 11) |
| L1 | 3 | THE BOOM BOX | 20.3% | 52.5% | 18 | ✅ | 9 | Leg | 8th |
| L2 | 2 | KEEFY | 18.9% | 52.1% | 7.2 | ✅ | 8 | Leg | 4th |
| L3 | 8 | ARMOR GOLDEN EAGLE | 16.5% | 47.0% | 3.4 | ✅ | 6 | Leg | **3rd** (SP 2.3) |
| L4 | 1 | JUMBO LEGEND | 6.6% | 25.8% | 9.0 | ✅ | 8 | Leg | 7th |
| L5 | 4 | RIDING TOGETHER | 5.5% | 24.1% | 15 | ✅ | 7 | Leg | 9th |
| L6 | 11 | ALL ROUND WINNER | 4.8% | 21.0% | 8.5 | ✅ | 10 | Leg | **1st** (SP 6) |
| L7 | 5 | FIVEFORTWO | 0.4% | 3.1% | 6.3 | ✅ (w&lt;10 add) | 6 | Leg | 5th |
| — | 6 | I CAN | 3.0% | 13.8% | 19 | ❌ | 10 | — | 10th |
| — | 7 | TELECOM FIGHTERS | 0.2% | 1.9% | 13 | ❌ | 11 | — | 11th |
| — | 9 | ROMANTIC GLADIATOR | 0.1% | 0.6% | 15 | ❌ | 3 | — | **2nd** (SP 12) |

**Banker fail.** **#10** out of the top three; **#11** and **#9** were on the full-B ticket but Trio still needs the banker in frame.

### R9 — Class 3 | 1200m Turf | Actual: 7→6→12 ❌

**Ticket:** ★ **#12** + legs **#1 → #5 → #2 → #9 → #4 → #7** | 膽拖 C(6,2) = **15** × $10 = **$150**

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 12 | SOMELOVEFROMABOVE | 37.4% | 73.6% | 2.7 | ✅ | 7 | ★ Banker | **3rd** (SP 4.1) |
| L1 | 1 | SYMBOL OF STRENGTH | 22.8% | 59.9% | 9.7 | ✅ | 8 | Leg | 4th |
| L2 | 5 | BIENVENUE | 13.7% | 45.2% | 11 | ✅ | 6 | Leg | 6th |
| L3 | 2 | LUCKY PLANET | 10.8% | 40.6% | 16 | ✅ | 11 | Leg | 7th |
| L4 | 9 | STRAIGHT TO GLORY | 4.4% | 21.8% | 6.9 | ✅ | 8 | Leg | 9th |
| L5 | 4 | AMAZING KID | 1.6% | 10.3% | 8.7 | ✅ (swap for #3) | 10 | Leg | 8th |
| L6 | 7 | DO YOU JUST | 2.0% | 11.2% | 9.7 | ✅ (w&lt;10 add) | 4 | Leg | **1st** (SP 12) |
| — | 3 | SPORTS LEGEND | 5.7% | 26.4% | 12 | ❌ (swapped out) | 7 | — | 5th |
| — | 6 | MATTERS MOST | 1.6% | 9.9% | 17 | ❌ | 8 | — | **2nd** (SP 7.9) |
| — | 8 | FIERY STEED | 0.0% | 0.0% | 22 | ❌ | 1 | — | 12th |
| — | 10 | PRESTIGE WIN | 0.1% | 0.5% | 40 | ❌ | 2 | — | 11th |
| — | 11 | LUCKY DOCTOR | 0.1% | 0.5% | 56 | ❌ | 3 | — | 10th |

**Pattern B.** Banker **#12** placed; **#7** is on B via swap/add trail but **#6** (**2nd**) never entered the leg list — **#3** swap-out did not help the frame. **Lean** **#1,#5,#2,#3** (A-aligned) still misses **#6/#7**.

---

## Hit Detail (3 hits)

### R1 ✅ — Trio $168 | Stake $30 | P&L +$138

Paying **6→5→4**; **#4** banker **3rd**; legs **#5·#6** — line **4-5-6**.

### R4 ✅ — Trio $465 | Stake $60 | P&L +$405

Paying **4→10→11**; **#11** banker **3rd**; **#4** and **#10** from Step B legs.

### R5 ✅ — Trio $117 | Stake $100 | P&L +$17

Paying **1→4→10**; **#2** add-on did not need to run for the collect.

---

## Banker Performance (Strategy B — MC #1)

| Race | Banker | MC Place% | MC Win% | Odds (early) | Finished | Placed? |
|------|--------|-----------|---------|--------------|----------|---------|
| R1 | #4 SPICY SPANGLE | 84.2% | 44.7% | 7.1 | 3rd | ✅ |
| R2 | #8 COURIER MAGIC | 87.5% | 46.8% | 14 | 9th | ❌ |
| R3 | #2 WIN EASE | 61.1% | 27.3% | 31 | 12th | ❌ |
| R4 | #11 ROMANTIC FANTASY | 95.4% | 52.5% | 6.4 | 3rd | ✅ |
| R5 | #1 BEAUTY ALLIANCE | 74.4% | 33.7% | 7.5 | 1st | ✅ |
| R6 | #8 QUARTZ LEGEND | 69.0% | 32.2% | 3.7 | 5th | ❌ |
| R7 | #6 THE HEIR | 72.0% | 35.5% | 3.1 | 3rd | ✅ |
| R8 | #10 RAGGA BOMB | 58.0% | 23.6% | 11 | 6th | ❌ |
| R9 | #12 SOMELOVEFROMABOVE | 73.6% | 37.4% | 2.7 | 3rd | ✅ |

**5/9** MC #1 bankers in the top three — **3** Trio collects. **R4** is the clearest **B vs A** upside this meeting (short-odds **#10** on B only).

---

## Comparison: Strategy B vs Strategy A

| Metric | Strategy B | Strategy A |
|--------|------------|------------|
| Hits (races) | **3/9** | **2/9** |
| Staked | **$1,020** | **$700** |
| Returned | **$750** | **$285** |
| **P&L** | **−$270** | **−$415** |
| **ROI** | **−26.5%** | **−59.3%** |

Strategy B returned more dollars and lost less net on the card despite higher outlay: both hit **R1** and **R5**, while **R4** paid on **B only** after Step B **adds #1 / #10** (published A pool used **#7/#5** legs, no **#10**). Strategy A totals follow `data/reviews/trio_review_20260415_HV.md` (**A2** on R5, **$60**).

---

## Miss Classification (Strategy B)

| Pattern | Count | Races |
|---------|-------|-------|
| **A — Banker hit, all 3 in pool** | 0 | — |
| **B — Banker hit, pool gap** | 2 | R7, R9 |
| **C — Banker fail** | 4 | R2, R3, R6, R8 |

**Pattern B details (banker in frame, at least one placer off ticket):**

- **R7:** Banker **#6 THE HEIR** **3rd** ✅. **#11 WORLD HERO** won at **8.2** (MC **0.1%** win) — outside the shared A/B six-horse pool.
- **R9:** Banker **#12** **3rd** ✅. **#7 DO YOU JUST** was on B via win-odds / swap trail, but **#6 MATTERS MOST** (**2nd**) was never a leg — paying set **{7,6,12}** misses one slot.

**Pattern C details (banker out of top three):**

- **R2:** **#8 COURIER MAGIC** **9th** despite **87.5%** MC Place; **#3** third off both tickets.
- **R3:** **#2 WIN EASE** **12th**; **#11 VIVA FIRECRACKER** third outside pool.
- **R6:** **#8 QUARTZ LEGEND** **5th**; frame **#3–#9–#1** on wide B ticket cannot pay without banker.
- **R8:** **#10 RAGGA BOMB** **6th**; **#11**/**#9** in legs but banker missing from top three.

---

## Lessons

1. **R4 (Step B adds)** — Win-odds **#10** / **#1** legs delivered the only race where **B** collected and **published A** (no **#10**) did not.

2. **R1 (cost)** — Same hit as A with **$30** vs **$60** by dropping **#9** — lower stake, same dividend.

3. **R6 / R8 / R9 (full vs lean)** — Extra combinations on **full B** did not add hits vs **lean** this card; **lean** total would have been **slightly positive** with the same three winners.

4. **R7 / R9** — Long-shot winners (**#11**; **#7** over **#6**) still outside MC-primary structure — same structural gap as A, different leg lists.

5. **Scratch / scrape** — **R10** not in this report set; keep **starter reconciliation** if extending to a **10-race** card.

---

## Cross-reference

| File | Role |
|------|------|
| `data/reviews/trio_review_stratC_20260412_ST.md` | Long-form template (Strategy B, Sha Tin) |
| `data/reviews/trio_review_20260415_HV.md` | Short post-race note (Strategy A) |
| `data/reports/trio_strategy_20260415_HV_R1.md` … `R9.md` | Pre-race Strategy A + **Strategy B (MC-only)** blocks |
| `data/historical/results_20260415_HV.json` | Finishes + Trio dividends |

---

*Post-race learning only — not betting advice.*
