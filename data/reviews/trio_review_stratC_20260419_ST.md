# Strategy B Review — MC #1 banker + primary Place%>20% + win-odds add/swap (trio SKILL) | Sha Tin | 19 Apr 2026

## Rules

- **Banker**: MC **#1** by MC Win% (same as "MC #1" in reports).
- **Primary legs**: all other runners with **MC Place% > 20%** (banker excluded).
- **Step B (win odds < 10, Place% ≤ 20%)**: **replace** one primary leg when the SKILL swap rule fires; otherwise **add** short-priced tails (see each `trio_strategy_20260419_ST_R*.md`).
- **Data**: `--form-data all` (all-venue history); HKJC win odds from reports at generation time.
- **Bet type**: Trio (單T) — top 3 in **any** order.
- **Unit**: **$10** per combination; structure **膽拖** 1 banker + N legs → **C(N, 2)** combos.

**Stake convention (this review):** **Full Strategy B** = the published **final legs** after Step B in each report.

**Note:** This is the **trio-strategy SKILL** Strategy B pipeline (**MC-only**), **not** Strategy A (Adj Win/Place + jockey + SCMP + Modes A–B).

**Pre-race definitions:** `data/reports/trio_strategy_20260419_ST_R1.md` … **R11.md**.

**Results source:** `tools/scrape-meeting.ts --date=2026-04-19 --venue=ST` → `data/historical/results_20260419_ST.json`. **Finished** + **SP** = `winOdds` on each finisher row. **MC % / odds** from the trio reports.

---

## Summary

| Metric | Value |
|--------|-------|
| Races played | **11 (R1–R11)** |
| Hit rate | **4/11 (36.4%)** |
| Total staked | **$1,890** (full Strategy B) |
| Total returned | **$1,835** |
| **Net P&L** | **−$55** |
| **ROI** | **−2.9%** |
| Session Result | **LOSS** |

---

## Race-by-Race Results

Banker = MC Win% **#1**. Legs = **final Strategy B legs** after Step B add/swap (see per-race reports).

| Race | Class | Dist | Surf | Banker (MC#1) | Final legs (after Step B) | Structure | Combos | Stake | Result (1→2→3) | Banker placed? | Hit? | Trio $ | Return | P&L |
|------|-------|------|------|---------------|---------------------------|-----------|--------|-------|----------------|----------------|------|--------|--------|-----|
| R1 | C5 | 1800m | AWT | #2(41.7W/83.3P) | #10,#11,#12,#13,#4,#1,#5 | 膽拖 1B+7L | 21 | $210 | 1→4→11 | **4th ❌** | ❌ | $272 | $0 | −$210 |
| R2 | C5 | 1200m | AWT | #7(49.6W/83.9P) | #4,#9,#8,#6,#3,#11,#1 | 膽拖 1B+7L | 21 | $210 | 7→9→8 | 1st ✅ | ✅ | $575 | $575 | +$365 |
| R3 | C4 | 1000m | Turf | #3(66.2W/93.2P) | #1,#11,#13,#2,#10,#6,#4 | 膽拖 1B+7L | 21 | $210 | 4→7→1 | **4th ❌** | ❌ | $1292 | $0 | −$210 |
| R4 | C4 | 1400m | Turf | #8(41.0W/77.0P) | #4,#3,#10,#2,#7,#1,#13 | 膽拖 1B+7L | 21 | $210 | 11→10→4 | **4th ❌** | ❌ | $724 | $0 | −$210 |
| R5 | C4 | 1600m | Turf | #3(35.8W/68.1P) | #6,#8,#11,#5,#10,#9 | 膽拖 1B+6L | 15 | $150 | 11→3→6 | 2nd ✅ | ✅ | $243 | $243 | +$93 |
| R6 | C4 | 1650m | AWT | #1(34.7W/72.5P) | #4,#11,#5,#9,#12,#2,#3,#8 | 膽拖 1B+8L | 28 | $280 | 9→11→8 | **4th ❌** | ❌ | $929 | $0 | −$280 |
| R7 | C4 | 1200m | AWT | #8(43.1W/81.1P) | #3,#9,#7,#10,#1,#5,#12 | 膽拖 1B+7L | 21 | $210 | 5→1→8 | 3rd ✅ | ✅ | $792 | $792 | +$582 |
| R8 | C3 | 1200m | AWT | #3(49.4W/85.7P) | #1,#5,#6,#8,#11 | 膽拖 1B+5L | 10 | $100 | 9→3→11 | 2nd ✅ | ❌ | $170 | $0 | −$100 |
| R9 | C3 | 1400m | Turf | #4(48.9W/94.2P) | #3,#7,#1,#8 | 膽拖 1B+4L | 6 | $60 | 1→3→8 | **6th ❌** | ❌ | $305 | $0 | −$60 |
| R10 | C3 | 1200m | Turf | #7(44.4W/85.4P) | #2,#5,#1,#3,#10 | 膽拖 1B+5L | 10 | $100 | 5→7→3 | 2nd ✅ | ✅ | $225 | $225 | +$125 |
| R11 | C2 | 1800m | Turf | #6(54.5W/89.5P) | #13,#8,#4,#3,#2,#12 | 膽拖 1B+6L | 15 | $150 | 14→12→8 | **4th ❌** | ❌ | $3094 | $0 | −$150 |
| **TOTAL** | | | | | | | **189** | **$1,890** | | **5/11** bank in frame | **4/11** | | **$1,835** | **−$55** |

---

## Full MC Place% Table (ticket horses + field)

*Odds* = pre-race HKJC win odds from `data/reports/trio_strategy_20260419_ST_R*.md`. **Finished** + **SP** from `data/historical/results_20260419_ST.json`.

**Row order:** **★** banker, then legs **L1, L2, …** in **final Strategy B leg order**, then **—** other starters by saddle #.

**Column "Pool":** **✅** = on final Strategy B ticket (primary **P>20%** or Step B add/swap).

### R1 — Class 5 | 1800m AWT | Actual: 1→4→11 ❌

**Ticket:** ★ **#2** + legs **#10 → #11 → #12 → #13 → #4 → #1 → #5** | 膽拖 C(7,2) = 21 × $10 = $210

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 2 | HAILTOTHEVICTORS | 41.7% | 83.3% | 28 | ✅ | 8 | ★ Banker | **4th** (SP 21) |
| L1 | 10 | MEEPMEEP | 22.6% | 66.7% | 4.5 | ✅ | 11 | Leg | 5th (SP 6.6) |
| L2 | 11 | ALL ARE MINE | 14.5% | 56.6% | 10 | ✅ | 5 | Leg | **3rd** (SP 6.1) |
| L3 | 12 | CONSPIRACY WITNESS | 11.6% | 47.6% | 34 | ✅ | 12 | Leg | — |
| L4 | 13 | ROSEWOOD FLEETFOOT | 9.3% | 40.5% | 37 | ✅ | 6 | Leg | 7th (SP 22) |
| L5 | 4 | FIREFOOT | 0.0% | 0.1% | 5.5 | ✅ (w&lt;10 add) | 11 | Leg | **2nd** (SP 3.7) |
| L6 | 1 | FOREMOST TEDDY | 0.0% | 0.0% | 6.7 | ✅ (w&lt;10 add) | 10 | Leg | **1st** (SP 5.2) |
| L7 | 5 | VIVA TASTE | 0.0% | 0.0% | 8.1 | ✅ (w&lt;10 add) | 7 | Leg | 6th (SP 11) |
| — | 3 | MANAGEMENT FOLKS | 0.1% | 1.5% | 47 | ❌ | 6 | — | — |
| — | 6 | MEGA FORCE | 0.0% | 0.0% | 10 | ❌ | 7 | — | 8th (SP 18) |
| — | 7 | SPANGLE FORTUNE | 0.0% | 0.2% | 25 | ❌ | 4 | — | — |
| — | 8 | SUPER HONG KONG | 0.1% | 2.0% | 16 | ❌ | 8 | — | — |
| — | 9 | HAPPYDEARHAPPYDEER | 0.1% | 0.8% | 10 | ❌ | 4 | — | — |
| — | 14 | ALL EYES ON ME | 0.0% | 0.5% | 27 | ❌ | 8 | — | — |

**Banker fail** (**#2** 4th — just missed the frame at 21 SP). All three placers (**#1**, **#4**, **#11**) are on the ticket as legs via Step B adds (#1, #4) and primary (#11). **Pattern A miss** — widest B coverage captured all 3 but the banker sank the ticket. If any other leg were banker, B collects $272.

### R2 — Class 5 | 1200m AWT | Actual: 7→9→8 ✅

**Ticket:** ★ **#7** + legs **#4 → #9 → #8 → #6 → #3 → #11 → #1** | 膽拖 C(7,2) = 21 × $10 = $210

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 7 | NOBLE DELUXE | 49.6% | 83.9% | 15 | ✅ | 13 | ★ Banker | **1st** (SP 14) |
| L1 | 4 | COLOURFUL WINNER | 15.8% | 54.4% | 10 | ✅ | 5 | Leg | — |
| L2 | 9 | VIVA CHALEUR | 13.5% | 50.1% | 3.9 | ✅ | 6 | Leg | **2nd** (SP 2) |
| L3 | 8 | TRIUMPHANT WARRIOR | 9.2% | 39.9% | 21 | ✅ | 4 | Leg | **3rd** (SP 18) |
| L4 | 6 | ISLAND BREEZES | 7.5% | 35.4% | 81 | ✅ | 8 | Leg | — |
| L5 | 3 | WIN SPEED | 0.0% | 1.0% | 5.1 | ✅ (w&lt;10 add) | 5 | Leg | 6th (SP 9.2) |
| L6 | 11 | MODEST GENTLEMAN | 0.9% | 8.5% | 5.1 | ✅ (w&lt;10 add) | 8 | Leg | 4th (SP 5.6) |
| L7 | 1 | GLORY CLOUD | 0.4% | 5.0% | 8 | ✅ (w&lt;10 add) | 9 | Leg | 5th (SP 11) |
| — | 2 | RUNJEET | 0.1% | 0.8% | 12 | ❌ | 4 | — | — |
| — | 5 | SUPERB GUY | 0.3% | 3.0% | 17 | ❌ | 11 | — | 8th (SP 25) |
| — | 10 | CHEER FOR SOUTH | 2.5% | 16.4% | 28 | ❌ | 6 | — | 7th (SP 62) |
| — | 12 | SONIC BOOM | 0.1% | 1.8% | 19 | ❌ | 8 | — | — |

**Hit.** Banker **#7** won at 14. Both **#9** (2nd) and **#8** (3rd) are primary legs. Line **7-9-8** pays **$575**.

### R3 — Class 4 | 1000m Turf | Actual: 4→7→1 ❌

**Ticket:** ★ **#3** + legs **#1 → #11 → #13 → #2 → #10 → #6 → #4** | 膽拖 C(7,2) = 21 × $10 = $210

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 3 | ALSONSO | 66.2% | 93.2% | 12 | ✅ | 8 | ★ Banker | **4th** (SP 21) |
| L1 | 1 | RUN RUN SUNRISE | 15.8% | 67.4% | 4.8 | ✅ | 4 | Leg | **3rd** (SP 3.3) |
| L2 | 11 | ZOUPER FELLOW | 7.8% | 45.9% | 7.3 | ✅ | 7 | Leg | — |
| L3 | 13 | HEROIC MASTER | 5.2% | 35.3% | 17 | ✅ | 5 | Leg | 8th (SP 31) |
| L4 | 2 | TOURBILLON GOLFER | 2.5% | 22.4% | 6.7 | ✅ | 9 | Leg | 7th (SP 8.2) |
| L5 | 10 | PERFECT TRIUMPH | 0.8% | 9.4% | 5.5 | ✅ (w&lt;10 add) | 2 | Leg | — |
| L6 | 6 | MAPOGO | 0.2% | 3.4% | 8.1 | ✅ (w&lt;10 add) | 1 | Leg | 6th (SP 6.5) |
| L7 | 4 | PARENTS' LOVE | 0.5% | 5.5% | 8.4 | ✅ (w&lt;10 add) | 10 | Leg | **1st** (SP 22) |
| — | 5 | E HOPEFUL | 0.1% | 2.5% | 142 | ❌ | 1 | — | — |
| — | 7 | MASTER PAYMENT | 0.0% | 1.2% | 13 | ❌ | 0 | — | **2nd** (SP 16) |
| — | 8 | ONESHOT | 0.0% | 1.3% | 29 | ❌ | 0 | — | 5th (SP 69) |
| — | 9 | SYNERGY EXPRESS | 0.3% | 4.2% | 50 | ❌ | 1 | — | — |
| — | 12 | EMERGING STAR | 0.1% | 1.6% | 105 | ❌ | 0 | — | — |
| — | 14 | HAPPY ACTION | 0.5% | 6.8% | 65 | ❌ | 5 | — | — |

**Banker fail** (**#3** 4th — the MC dominant pick at 66.2% Win). **#4** (Step B add at 8.4 odds) won at 22; **#1** (primary leg) ran 3rd. But **#7** MASTER PAYMENT (debutant, 0% MC, 13 odds) ran 2nd — outside all pools. Even with **{#4, #1}** on ticket, missing **#7** means no collect regardless.

### R4 — Class 4 | 1400m Turf | Actual: 11→10→4 ❌

**Ticket:** ★ **#8** + legs **#4 → #3 → #10 → #2 → #7 → #1 → #13** | 膽拖 C(7,2) = 21 × $10 = $210

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 8 | VOYAGE BOSS | 41.0% | 77.0% | 10 | ✅ | 7 | ★ Banker | **4th** (SP 8.4) |
| L1 | 4 | LET'S HAVE FUN | 19.2% | 54.3% | 32 | ✅ | 7 | Leg | **3rd** (SP 12) |
| L2 | 3 | BUCEPHALAS | 13.4% | 44.4% | 13 | ✅ | 6 | Leg | — |
| L3 | 10 | DECISION LINK | 8.6% | 34.7% | 4 | ✅ | 9 | Leg | **2nd** (SP 3.8) |
| L4 | 2 | CHILL PARTNERS | 8.5% | 33.8% | 14 | ✅ | 5 | Leg | — |
| L5 | 7 | FRANCIS MEYNELL | 4.1% | 22.5% | 4.8 | ✅ | 6 | Leg | 8th (SP 4.8) |
| L6 | 1 | CHARMING BABE | 0.9% | 5.5% | 8.9 | ✅ (w&lt;10 add) | 9 | Leg | 6th (SP 16) |
| L7 | 13 | THE ALL ROUNDER | 0.1% | 1.3% | 6.2 | ✅ (w&lt;10 add) | 8 | Leg | — |
| — | 5 | POLAR PATCH | 0.2% | 2.1% | 60 | ❌ | 1 | — | — |
| — | 6 | Z PRINCE | 0.1% | 0.6% | 49 | ❌ | 0 | — | 5th (SP 131) |
| — | 9 | DASHING PEACH | 0.9% | 4.6% | 18 | ❌ | 2 | — | — |
| — | 11 | PROUD BOX | 0.8% | 5.8% | 11 | ❌ | 7 | — | **1st** (SP 7.7) |
| — | 12 | SUPER MASTERMIND | 2.1% | 12.0% | 82 | ❌ | 6 | — | — |
| — | 14 | YOUNG LEGACY | 0.3% | 1.4% | 42 | ❌ | 4 | — | 7th (SP 139) |

**Banker fail** (**#8** 4th at 8.4 SP). **#10** (2nd) and **#4** (3rd) are both on B ticket. Winner **#11** PROUD BOX (7.7 SP, MC 0.8%) was **not** in B's pool — just above the 10-odds Step B threshold. Had odds drifted to 9.9, Step B would have forced it in.

### R5 — Class 4 | 1600m Turf | Actual: 11→3→6 ✅

**Ticket:** ★ **#3** + legs **#6 → #8 → #11 → #5 → #10 → #9** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 3 | MEGA MASTERMIND | 35.8% | 68.1% | 5.7 | ✅ | 5 | ★ Banker | **2nd** (SP 5.7) |
| L1 | 6 | PRESTIGE RICKY | 12.6% | 39.4% | 12 | ✅ | 9 | Leg | **3rd** (SP 13) |
| L2 | 8 | LEAPING STAR | 10.7% | 31.5% | 74 | ✅ | 8 | Leg | — |
| L3 | 11 | ABSOLUTE HONOUR | 8.5% | 28.9% | 3.9 | ✅ | 10 | Leg | **1st** (SP 2.3) |
| L4 | 5 | FLYING BOOM | 6.8% | 25.9% | 11 | ✅ | 7 | Leg | — |
| L5 | 10 | MULTISUPERSTAR | 6.2% | 23.1% | 6.6 | ✅ | 5 | Leg | 8th (SP 10) |
| L6 | 9 | AMAZING DUCK | 5.4% | 21.8% | 4 | ✅ | 5 | Leg | — |
| — | 1 | FLUORESCENCE | 0.0% | 0.0% | 69 | ❌ | 3 | — | — |
| — | 2 | FAMILY KNIGHT | 2.6% | 11.3% | 35 | ❌ | 5 | — | 5th (SP 150) |
| — | 4 | CLEANSWEEPER | 0.3% | 2.2% | 59 | ❌ | 1 | — | — |
| — | 7 | GRAND TURBO | 1.7% | 7.7% | 57 | ❌ | 2 | — | — |
| — | 12 | INCANTO STAR | 1.6% | 7.9% | 30 | ❌ | 6 | — | 6th (SP 26) |
| — | 13 | HONORARY | 4.9% | 18.9% | 37 | ❌ | 5 | — | 7th (SP 46) |
| — | 14 | MATSU VICTOR | 3.2% | 13.3% | 13 | ❌ | 7 | — | 4th (SP 22) |

**Hit.** Banker **#3** placed 2nd; **#11** (1st) and **#6** (3rd) both primary legs. Line **3-6-11** pays **$243**. No Step B add candidates — all short-priced were already above 20% Place.

### R6 — Class 4 | 1650m AWT | Actual: 9→11→8 ❌

**Ticket:** ★ **#1** + legs **#4 → #11 → #5 → #9 → #12 → #2 → #3 → #8** | 膽拖 C(8,2) = 28 × $10 = $280

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 1 | SUPREME AGILITY | 34.7% | 72.5% | 11 | ✅ | 6 | ★ Banker | **4th** (SP 17) |
| L1 | 4 | CALIFORNIA STAR | 24.3% | 61.4% | 12 | ✅ | 8 | Leg | — |
| L2 | 11 | BULL ATTITUDE | 14.4% | 47.3% | 5.1 | ✅ | 12 | Leg | **2nd** (SP 5.5) |
| L3 | 5 | SHANGHAI STYLE | 10.0% | 36.3% | 6 | ✅ | 8 | Leg | 6th (SP 3.4) |
| L4 | 9 | BLOSSOMY | 6.8% | 27.8% | 20 | ✅ | 4 | Leg | **1st** (SP 22) |
| L5 | 12 | FASHION LEGEND | 4.0% | 20.4% | 11 | ✅ | 8 | Leg | — |
| L6 | 2 | CHILL KAKA | 0.0% | 0.2% | 7.3 | ✅ (w&lt;10 add) | 7 | Leg | — |
| L7 | 3 | PERFECT TEAM | 0.0% | 0.3% | 8.1 | ✅ (w&lt;10 add) | 6 | Leg | 5th (SP 16) |
| L8 | 8 | SHOTGUN | 0.2% | 2.1% | 9.9 | ✅ (w&lt;10 add) | 11 | Leg | **3rd** (SP 4.5) |
| — | 6 | ARIEL | 2.9% | 14.4% | 32 | ❌ | 12 | — | 7th (SP 36) |
| — | 7 | LESLIE | 0.3% | 2.6% | 19 | ❌ | 8 | — | — |
| — | 10 | GLORIOUS ST PAUL'S | 0.3% | 2.8% | 34 | ❌ | 3 | — | 8th (SP 82) |
| — | 13 | RISING ELITE | 1.8% | 10.0% | 50 | ❌ | 5 | — | — |
| — | 14 | NIGHT PUROSANGUE | 0.3% | 2.0% | 15 | ❌ | 10 | — | — |

**Pattern A — most painful miss.** Banker **#1** finished 4th (returned from bleed — fitness concern noted). **All three** placers (**#9**, **#11**, **#8**) are on the B ticket. $280 down on a ticket that had the winning combination in its legs. If **#9** or **#11** were banker instead, B collects **$929**.

### R7 — Class 4 | 1200m AWT | Actual: 5→1→8 ✅

**Ticket:** ★ **#8** + legs **#3 → #9 → #7 → #10 → #1 → #5 → #12** | 膽拖 C(7,2) = 21 × $10 = $210

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 8 | LIGHT YEARS GLORY | 43.1% | 81.1% | 15 | ✅ | 7 | ★ Banker | **3rd** (SP 18) |
| L1 | 3 | GIANT LEAP | 19.7% | 60.1% | 6.7 | ✅ | 10 | Leg | 4th (SP 7.6) |
| L2 | 9 | ONE MAN SHOW | 15.4% | 53.2% | 12 | ✅ | 7 | Leg | 6th (SP 11) |
| L3 | 7 | FLOWING RICHES | 10.7% | 43.5% | 9.6 | ✅ | 7 | Leg | 8th (SP 7.1) |
| L4 | 10 | JUICY DRAGON | 8.3% | 38.3% | 3.4 | ✅ | 8 | Leg | 5th (SP 4) |
| L5 | 1 | ARMOUR WAR EAGLE | 0.4% | 4.2% | 5.7 | ✅ (w&lt;10 add) | 11 | Leg | **2nd** (SP 2.8) |
| L6 | 5 | TARGET AUDIENCE | 0.0% | 0.1% | 7.7 | ✅ (w&lt;10 add) | 0 | Leg | **1st** (SP 13) |
| L7 | 12 | CONRAD THE GREAT | 0.2% | 2.8% | 9.4 | ✅ (w&lt;10 add) | 6 | Leg | — |
| — | 2 | IGOT | 0.0% | 0.1% | 57 | ❌ | 1 | — | — |
| — | 4 | NEVER TOO SOON | 2.1% | 15.4% | 16 | ❌ | 7 | — | 7th (SP 42) |
| — | 6 | EVERSTAR | 0.1% | 1.0% | 41 | ❌ | 10 | — | — |
| — | 11 | REGROWTH WINNER | 0.0% | 0.1% | 114 | ❌ | 4 | — | — |

**Hit (B-only vs A).** Banker **#8** placed 3rd. Both **#5** TARGET AUDIENCE (won at 13) and **#1** (2nd) were added via **Step B** win-odds rule. Strategy A excluded **#5** (0 form, returning from tendon injury) — **this is the signature B advantage**. Line **8-5-1** pays **$792**. The most profitable single race of the session.

### R8 — Class 3 | 1200m AWT | Actual: 9→3→11 ❌

**Ticket:** ★ **#3** + legs **#1 → #5 → #6 → #8 → #11** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 3 | AURORA PATCH | 49.4% | 85.7% | 5.1 | ✅ | 9 | ★ Banker | **2nd** (SP 3.1) |
| L1 | 1 | ROMANTIC SON | 23.0% | 68.0% | 7.4 | ✅ | 10 | Leg | — |
| L2 | 5 | BLAZING WIND | 11.0% | 46.4% | 6.1 | ✅ | 7 | Leg | — |
| L3 | 6 | PI LEGEND | 6.0% | 31.4% | 3.6 | ✅ | 6 | Leg | 7th (SP 2.7) |
| L4 | 8 | POWER KOEPP | 4.7% | 27.3% | 23 | ✅ | 11 | Leg | 6th (SP 31) |
| L5 | 11 | TIN FOOK | 0.0% | 0.2% | 6.9 | ✅ (swap for #4) | 7 | Leg | **3rd** (SP 3.7) |
| — | 2 | LADY'S CHOICE | 0.0% | 0.0% | 17 | ❌ | 9 | — | 5th (SP 36) |
| — | 4 | MR ENERGIA | 3.6% | 20.4% | 16 | ❌ (swapped out) | 4 | — | 4th (SP 49) |
| — | 7 | IGOR STRAVINSKY | 1.5% | 12.7% | 13 | ❌ | 10 | — | 8th (SP 11) |
| — | 9 | MUST GO | 0.8% | 7.7% | 25 | ❌ | 10 | — | **1st** (SP 14) |
| — | 10 | BEAUTY GLORY | 0.0% | 0.1% | 37 | ❌ | 10 | — | — |

**Banker placed; trio miss.** **#3** (2nd) ✅ and **#11** TIN FOOK (3rd, Step B swap for #4) ✅ — but winner **#9** MUST GO (14 odds, Size-trained, MC 0.8%) was outside both strategies. The only winning leg pair on the ticket was **{#3, #11}** — needed **#9** to complete the Trio.

### R9 — Class 3 | 1400m Turf | Actual: 1→3→8 ❌

**Ticket:** ★ **#4** + legs **#3 → #7 → #1 → #8** | 膽拖 C(4,2) = 6 × $10 = $60

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 4 | AEROVOLANIC | 48.9% | 94.2% | 3 | ✅ | 9 | ★ Banker | **6th** (SP 2.4) |
| L1 | 3 | EVERYONE'S STAR | 37.3% | 90.9% | 4.4 | ✅ | 6 | Leg | **2nd** (SP 4.9) |
| L2 | 7 | URANUS STAR | 11.6% | 68.3% | 10 | ✅ | 8 | Leg | — |
| L3 | 1 | SKY JEWELLERY | 0.0% | 1.1% | 6.3 | ✅ (w&lt;10 add) | 0 | Leg | **1st** (SP 4.8) |
| L4 | 8 | CHILL EASY | 0.3% | 6.8% | 8.9 | ✅ (w&lt;10 add) | 3 | Leg | **3rd** (SP 10) |
| — | 2 | MAKE YOU SMILE | 0.3% | 7.1% | 51 | ❌ | 1 | — | — |
| — | 5 | GOLDEN CHAMP | 0.2% | 4.5% | 31 | ❌ | 2 | — | — |
| — | 6 | NUCLEOZOR | 0.0% | 1.2% | 20 | ❌ | 0 | — | 7th (SP 81) |
| — | 9 | PERFECTDAY | 1.1% | 18.0% | 14 | ❌ | 5 | — | 4th (SP 17) |
| — | 10 | EXCEED THE LIMIT | 0.1% | 5.1% | 21 | ❌ | 2 | — | 8th (SP 24) |
| — | 11 | M M CONCORD | 0.1% | 2.3% | 37 | ❌ | 2 | — | 5th (SP 93) |
| — | 12 | WONDERSTAR | 0.0% | 0.5% | 20 | ❌ | 16 | — | — |

**Pattern A — second painful miss.** Banker **#4** AEROVOLANIC (massive 2.4 SP favourite, MC 48.9%) finished **6th**. **ALL three** placers (**#1**, **#3**, **#8**) are on the B ticket as legs — #1 and #8 via Step B adds. If **#3** or **#1** were banker, B collects **$305**. The favourite bomb destroyed both strategies.

### R10 — Class 3 | 1200m Turf | Actual: 5→7→3 ✅

**Ticket:** ★ **#7** + legs **#2 → #5 → #1 → #3 → #10** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 7 | THOUSAND SPIRIT | 44.4% | 85.4% | 15 | ✅ | 9 | ★ Banker | **2nd** (SP 11) |
| L1 | 2 | SUPER EXPRESS | 33.1% | 80.0% | 5.3 | ✅ | 5 | Leg | 6th (SP 2.8) |
| L2 | 5 | GOLD PATCH | 9.0% | 46.8% | 4.3 | ✅ | 3 | Leg | **1st** (SP 3.9) |
| L3 | 1 | SOUTH STAR | 8.2% | 42.0% | 14 | ✅ | 5 | Leg | 7th (SP 22) |
| L4 | 3 | KA YING ATTACK | 3.7% | 27.0% | 6.5 | ✅ | 7 | Leg | **3rd** (SP 5.5) |
| L5 | 10 | ROBOT LUCKY STAR | 1.6% | 15.4% | 3.5 | ✅ (w&lt;10 add) | 3 | Leg | 8th (SP 5.6) |
| — | 4 | CHICKEN DINNER | 0.0% | 0.1% | 53 | ❌ | 1 | — | — |
| — | 6 | MAGNEMITE | 0.0% | 0.1% | 22 | ❌ | 0 | — | — |
| — | 8 | ANODE | 0.0% | 0.3% | 19 | ❌ | 10 | — | — |
| — | 9 | SUNNY DA BEST | 0.2% | 3.0% | 15 | ❌ | 9 | — | 5th (SP 16) |
| — | 11 | VULCANUS | 0.0% | 0.0% | 33 | ❌ | 13 | — | 4th (SP 146) |
| — | 12 | CORNERSTONE | 0.0% | 0.0% | 56 | ❌ | 3 | — | — |

**Hit (B-only vs A primary).** Banker **#7** placed 2nd; **#5** (1st) and **#3** (3rd) both primary legs. Strategy A's primary dual-banker (**#7+#2**) missed because **#2** SUPER EXPRESS (2.8 SP) finished 6th. B's single-banker structure dodges dual-banker risk. Line **7-5-3** pays **$225**.

### R11 — Class 2 | 1800m Turf | Actual: 14→12→8 ❌

**Ticket:** ★ **#6** + legs **#13 → #8 → #4 → #3 → #2 → #12** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 6 | GENTLEMEN LEGACY | 54.5% | 89.5% | 15 | ✅ | 8 | ★ Banker | **4th** (SP 7.8) |
| L1 | 13 | SERAPH GABRIEL | 25.7% | 74.2% | 9 | ✅ | 4 | Leg | 7th (SP 4.7) |
| L2 | 8 | JOY OF SPRING | 10.6% | 50.5% | 7.9 | ✅ | 6 | Leg | **3rd** (SP 6.6) |
| L3 | 4 | PATCH OF COSMO | 3.4% | 25.6% | 4.7 | ✅ | 4 | Leg | — |
| L4 | 3 | WINNING WING | 0.1% | 2.4% | 7 | ✅ (w&lt;10 add) | 7 | Leg | 8th (SP 11) |
| L5 | 2 | STUNNING PEACH | 0.1% | 0.8% | 7.8 | ✅ (w&lt;10 add) | 7 | Leg | — |
| L6 | 12 | KA YING GENERATION | 0.8% | 8.8% | 7.3 | ✅ (w&lt;10 add) | 5 | Leg | **2nd** (SP 14) |
| — | 1 | MOMENTS IN TIME | 1.1% | 11.6% | 32 | ❌ | 8 | — | — |
| — | 5 | AWESOME FLUKE | 0.2% | 3.4% | 23 | ❌ | 8 | — | 5th (SP 29) |
| — | 7 | NEW FOREST | 0.0% | 0.2% | 31 | ❌ | 7 | — | — |
| — | 9 | SWORD POINT | 0.7% | 7.3% | 34 | ❌ | 8 | — | 6th (SP 145) |
| — | 10 | SKY HEART | 1.2% | 10.8% | 14 | ❌ | 8 | — | — |
| — | 11 | VOYAGE SAMURAI | 1.7% | 14.0% | 35 | ❌ | 5 | — | — |
| — | 14 | NAUTICAL FORCE | 0.1% | 0.9% | 15 | ❌ | 0 | — | **1st** (SP 15) |

**Banker fail** (**#6** 4th). **#12** (Step B add) and **#8** (primary) placed — but winner **#14** NAUTICAL FORCE (Size import, 0 form, 15 SP) was outside all pools. Trio paid **$3,094** — structural miss for MC-based strategies.

---

## Hit Detail (4 hits)

### R2 ✅ — Trio $575 | Stake $210 | P&L +$365

Paying **7→9→8**; **#7** banker **1st**; legs **#9·#8** — line **7-9-8**. MC's dominant pick won from gate 2 under Teetan at 14 SP.

### R5 ✅ — Trio $243 | Stake $150 | P&L +$93

Paying **11→3→6**; **#3** banker **2nd**; legs **#11·#6** — line **3-6-11**. Straightforward hit — no Step B horses needed.

### R7 ✅ — Trio $792 | Stake $210 | P&L +$582

Paying **5→1→8**; **#8** banker **3rd**; legs **#5·#1** (both Step B adds) — line **8-5-1**. **The signature B hit**: neither #5 (0 form, tendon recovery) nor #1 (SCMP boost only) were in Strategy A. Step B captured both at 7.7 and 5.7 odds. Best P&L of the session.

### R10 ✅ — Trio $225 | Stake $100 | P&L +$125

Paying **5→7→3**; **#7** banker **2nd**; legs **#5·#3** — line **7-5-3**. B's single-banker structure hit where A's dual-banker (#7+#2) failed.

---

## Banker Performance (Strategy B — MC #1)

| Race | Banker | MC Place% | MC Win% | Odds (early) | Finished | SP | Placed? |
|------|--------|-----------|---------|--------------|----------|----|---------|
| R1 | #2 HAILTOTHEVICTORS | 83.3% | 41.7% | 28 | 4th | 21 | ❌ |
| R2 | #7 NOBLE DELUXE | 83.9% | 49.6% | 14 | 1st | 14 | ✅ |
| R3 | #3 ALSONSO | 93.2% | 66.2% | 2.3 | 4th | 21 | ❌ |
| R4 | #8 VOYAGE BOSS | 77.0% | 41.0% | 4.2 | 4th | 8.4 | ❌ |
| R5 | #3 MEGA MASTERMIND | 68.1% | 35.8% | 5.7 | 2nd | 5.7 | ✅ |
| R6 | #1 SUPREME AGILITY | 72.5% | 34.7% | 6.5 | 4th | 17 | ❌ |
| R7 | #8 LIGHT YEARS GLORY | 81.1% | 43.1% | 12 | 3rd | 18 | ✅ |
| R8 | #3 AURORA PATCH | 85.7% | 49.4% | 2.6 | 2nd | 3.1 | ✅ |
| R9 | #4 AEROVOLANIC | 94.2% | 48.9% | 3.0 | 6th | 2.4 | ❌ |
| R10 | #7 THOUSAND SPIRIT | 85.4% | 44.4% | 15 | 2nd | 11 | ✅ |
| R11 | #6 GENTLEMEN LEGACY | 89.5% | 54.5% | 6.5 | 4th | 7.8 | ❌ |

**5/11** MC #1 bankers in the top three — **4** Trio collects. **6** bankers missed the frame — **five of those ran 4th** (R1, R3, R4, R6, R11) and one ran **6th** (R9, the massive favourite bomb).

---

## Miss Classification

| Pattern | Count | Races | Description |
|---------|-------|-------|-------------|
| **A — All 3 in pool, wrong banker** | 3 | R1, R6, R9 | Most painful — ticket had all 3 placers as legs |
| **B — Banker hit, pool gap** | 1 | R8 | Banker placed but a winning placer was outside the leg pool |
| **C — Banker fail + pool gap** | 3 | R3, R4, R11 | Banker out AND at least one placer missing from legs |

**Pattern A total forfeited dividends:** $272 + $929 + $305 = **$1,506** (would have swung session to **+$1,451**). Banker selection is the single biggest lever.

---

## Lessons

1. **Pattern A dominated this card (3/7 misses):** R1, R6, R9 had all three placers on the ticket but the wrong banker. R6 alone was $280 wasted on a ticket with the full $929 Trio combination in its legs. **Structural implication**: the MC #1 banker selection accuracy (5/11 = 45.5%) is the bottleneck, not pool width.

2. **Step B delivered the marquee hit (R7):** #5 TARGET AUDIENCE (0 form, Moreira, 7.7 odds) and #1 ARMOUR WAR EAGLE (5.7 odds, SCMP boost) were both added by the Win-odds < 10 rule. Strategy A excluded #5 entirely. This single race justified the Step B mechanic with a **$792** return.

3. **R9 favourite bomb (AEROVOLANIC 2.4 SP → 6th):** The most confident MC pick of the day (48.9% Win, 94.2% Place) collapsed. Step B correctly added #1 SKY JEWELLERY and #8 CHILL EASY as legs — the ticket had the winning set — but the banker destroyed the bet. **No pool design can fix a banker that doesn't place.**

4. **Single banker > dual banker on this card:** R10 proved it — B's single banker (#7) hit where A's dual-banker (#7+#2) failed because #2 (2.8 SP) ran 6th. The dual-banker adds a second point of failure for marginal stake savings.

5. **Size imports at double-digit odds are structural blind spots:** R4 #11 PROUD BOX (7.7 SP → just above 10 threshold), R11 #14 NAUTICAL FORCE (15 SP, 0 form). Neither enters via Step B. R9 #1 SKY JEWELLERY (6.3 odds, Griffin) **did** enter via Step B — the rule works when odds are short enough.

6. **R8 — TIN FOOK swap was correct but incomplete:** Step B swapped #4 for #11 TIN FOOK (trial form, 6.9 odds). TIN FOOK ran 3rd — the swap was justified. But the pool still missed #9 MUST GO (winner at 14, Size-trained). The replacement improved the ticket but didn't reach the full combination.

---

## Cross-reference

| File | Role |
|------|------|
| `data/reviews/trio_review_stratC_20260415_HV.md` | Previous long-form B review (Happy Valley) |
| `data/reviews/trio_review_20260419_ST.md` | Short post-race note (Strategy A + B summary) |
| `data/reports/trio_strategy_20260419_ST_R1.md` … `R11.md` | Pre-race Strategy A + **Strategy B (MC-only)** blocks |
| `data/historical/results_20260419_ST.json` | Finishes + Trio dividends |

---

*Post-race learning only — not betting advice.*
