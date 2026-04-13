# Strategy B Review — MC #1 banker + primary Place%>20% + win-odds add/swap (trio SKILL) | Sha Tin | 12 Apr 2026

## Rules

- **Banker**: MC **#1** by MC Win% (same as “MC #1” in reports).
- **Primary legs**: all other runners with **MC Place% > 20%** (banker excluded).
- **Step B (win odds &lt; 10, Place% ≤ 20%)**: **replace** one primary leg when the SKILL swap rule fires; otherwise **add** short-priced tails (see each `trio_strategy_20260412_ST_R*.md`).
- **Data**: `--form-data all` (all-venue history); HKJC win odds from `data/odds/odds_20260412_ST.json` at report time.
- **Bet type**: Trio (單T) — top 3 in **any** order.
- **Unit**: **$10** per combination; structure **膽拖** 1 banker + N legs → **C(N, 2)** combos.

**Note:** This is the **trio-strategy SKILL** Strategy B pipeline (primary **Place%>20%** + **win &lt; 10** add/swap), **not** the older HV union **“Place%>20% OR odds&lt;10”** on every leg in one pass. Pre-race definitions: `data/reports/trio_strategy_20260412_ST_R1.md` … **R11.md**.

**Results source:** `tools/scrape-meeting-results.ts 2026-04-12 ST` → `data/historical/results_20260412_ST.json`. **Finished** + **SP** = `winOdds` on each finisher row. **MC % / early odds** from the trio reports (~12:35 HKT R1; other races same meeting session).

---

## Summary

| Metric | Value |
|--------|-------|
| Races played | **11 (R1–R11)** |
| Hit rate | **3/11 (27.3%)** |
| Total staked | **$1,100** |
| Total returned | **$1,163** |
| **Net P&L** | **+$63** |
| **ROI** | **+5.7%** |
| Session Result | **SMALL WIN** |

**Context:** **R8** alone returned **$1,055** on **$60** staked (**7-1-12**). Without R8, Strategy B on the other ten races is about **−$992** vs **$1,040** staked.

---

## Race-by-Race Results

Banker = MC Win% **#1**. Legs = **final Strategy B legs** after Step B add/swap (see per-race reports).

| Race | Class | Dist | Banker (MC#1) | Final legs (after Step B) | Structure | Combos | Stake | Result (1→2→3) | Banker placed? | Hit? | Trio $ | Return | P&L |
|------|-------|------|---------------|---------------------------|-----------|--------|-------|----------------|----------------|------|--------|--------|-----|
| R1 | G1 | 1000m | #6(24.0W/60.4P) | #1,#3,#5,#4,#2 | 膽拖 1B+5L | 10 | $100 | 2→5→6 | 3rd ✅ | ✅ | $18 | $18 | −$82 |
| R2 | C5 | 1400m | #9(44.1W/88.6P) | #10,#11,#1 | 膽拖 1B+3L | 3 | $30 | 12→10→9 | 3rd ✅ | ❌ | $230 | $0 | −$30 |
| R3 | C5 | 1600m | #1(28.8W/68.9P) | #6,#4,#5,#2* | 膽拖 1B+4L | 6 | $60 | 5→9→11 | **10th ❌** | ❌ | $1,830 | $0 | −$60 |
| R4 | C4 | 1400m | #14(34.5W/72.5P) | #2,#1,#5,#7,#9 | 膽拖 1B+5L | 10 | $100 | 2→3→5 | **7th ❌** | ❌ | $500 | $0 | −$100 |
| R5 | C4 | 1200m | #1(29.8W/71.7P) | #3,#4,#2,#12,#8,#5 | 膽拖 1B+6L | 15 | $150 | 5→1→10 | 2nd ✅ | ❌ | $1,636 | $0 | −$150 |
| R6 | C4 | 1200m | #1(51.5W/84.7P) | #3,#2,#6,#7,#10 | 膽拖 1B+5L | 10 | $100 | 2→10→1 | 3rd ✅ | ✅ | $90 | $90 | −$10 |
| R7 | C4 | 1400m | #3(36.0W/70.9P) | #4,#2,#5,#11,#9 | 膽拖 1B+5L | 10 | $100 | 13→3→2 | 2nd ✅ | ❌ | $982 | $0 | −$100 |
| R8 | C3 | 1600m | #7(48.7W/85.9P) | #1,#4,#5,#12 | 膽拖 1B+4L | 6 | $60 | 7→1→12 | 1st ✅ | ✅ | $1,055 | $1,055 | **+$995** |
| R9 | C3 | 1400m | #5(41.3W/73.4P) | #1,#11,#2,#12,#8,#3 | 膽拖 1B+6L | 15 | $150 | 7→1→5 | 3rd ✅ | ❌ | $1,380 | $0 | −$150 |
| R10 | C3 | 1200m | #2(46.6W/82.8P) | #3,#4,#12,#10,#1 | 膽拖 1B+5L | 10 | $100 | 11→6→3 | **SCR ‡** | ❌ | $6,560 | $0 | −$100 |
| R11 | C2 | 1200m | #12(57.6W/88.3P) | #1,#9,#11,#5,#2,#7 | 膽拖 1B+6L | 15 | $150 | 5→9→7 | **11th ❌** | ❌ | $243 | $0 | −$150 |
| **TOTAL** | | | | | | **110** | **$1,100** | | **7/11** bank in frame | **3/11** | | **$1,163** | **+$63** |

\*R3: **#9** swapped out for **#2** (Step B). ‡R10: **#2** does not appear in `finishOrder` (**11** runners in JSON — treated as **did not run** / card scratch for review).

---

## Full MC Place% Table (ticket horses + field)

*Odds* = pre-race HKJC win odds from `data/reports/trio_strategy_20260412_ST_R*.md`. **Finished** + **SP** from `data/historical/results_20260412_ST.json`.

**Row order:** **★** banker, then legs **L1, L2, …** in **final Strategy B leg order**, then **—** other starters by saddle #.

**Column “Pool”:** **✅** = on final Strategy B ticket (primary **P>20%** or Step B add/swap).

### R1 — Group 1 | 1000m Turf | Actual: 2→5→6 ✅

**Ticket:** ★ **#6** + legs **#1 → #3 → #5 → #4 → #2** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 6 | TALENTS CHAMPION | 24.0% | 60.4% | 2.9 | ✅ | 0 | ★ Banker | **3rd** (SP 2.9) |
| L1 | 1 | KA YING GRATEFUL | 18.7% | 54.5% | 16 | ✅ | 0 | Leg | 6th |
| L2 | 3 | SILVERY KNIGHT | 16.2% | 49.8% | 12 | ✅ | 0 | Leg | 4th |
| L3 | 5 | SECRET INGREDIENT | 13.9% | 45.5% | 4 | ✅ | 0 | Leg | **2nd** (SP 4) |
| L4 | 4 | GLORIOUS HERO | 13.8% | 45.1% | 23 | ✅ | 0 | Leg | 5th |
| L5 | 2 | PERFECT ONE | 13.5% | 44.7% | 2.2 | ✅ | 0 | Leg | **1st** (SP 2.2) |

**Hit (small div).** Full frame inside pool; Trio only **$18** vs **$100** outlay → still **−$82** on the race.

### R2 — Class 5 | 1400m Turf | Actual: 12→10→9

**Ticket:** ★ **#9** + legs **#10 → #11 → #1** | 膽拖 C(3,2) = 3 × $10 = $30

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 9 | WINNING MACHINE | 44.1% | 88.6% | 1.9 | ✅ | 9 | ★ Banker | **3rd** (SP 1.9) |
| L1 | 10 | YEE CHEONG RAIDER | 39.1% | 86.7% | 9.8 | ✅ | 4 | Leg | **2nd** (SP 9.8) |
| L2 | 11 | PANDA LEGEND | 11.4% | 58.4% | 16 | ✅ | 6 | Leg | 5th |
| L3 | 1 | GOOD FORTUNE | 0.0% | 0.3% | 9.7 | ✅ (w&lt;10 add) | 9 | Leg | 10th |
| — | 12 | HE WAS ME | 1.8% | 19.2% | 17 | ❌ | 9 | — | **1st** (SP 17) |
| — | 8 | DASH | 1.3% | 14.1% | 10 | ❌ | 6 | — | — |
| — | 5 | WINNING CIGAR | 0.9% | 11.4% | 53 | ❌ | 6 | — | — |
| — | 4 | CALL TO COMMAND | 0.9% | 11.2% | 32 | ❌ | 10 | — | — |
| — | 7 | BASIC INSTINCT | 0.4% | 6.4% | 70 | ❌ | 7 | — | — |
| — | 3 | SETANTA | 0.1% | 1.3% | 11 | ❌ | 9 | — | — |
| — | 13 | MR GOOD VIBES | 0.0% | 0.9% | 70 | ❌ | 6 | — | — |
| — | 6 | WINNING DIAMOND | 0.0% | 0.9% | 18 | ❌ | 6 | — | — |
| — | 2 | ONE LOVE | 0.0% | 0.4% | 21 | ❌ | 8 | — | 12th |
| — | 14 | ISLAND GOLDEN | 0.0% | 0.1% | 106 | ❌ | 7 | — | 7th |

**Pattern B.** Banker and **#10** filled two slots; **#12** winner was **outside** the Step B pool (**#8** at win **10** was not a win-&lt;10 add).

### R3 — Class 5 | 1600m Turf | Actual: 5→9→11

**Ticket:** ★ **#1** + legs **#6 → #4 → #5 → #2** | 膽拖 C(4,2) = 6 × $10 = $60

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 1 | BEAUTY MISSILE | 28.8% | 68.9% | 7.3 | ✅ | 7 | ★ Banker | **10th** (SP 7.3) |
| L1 | 6 | GENERAL SMART | 24.7% | 64.8% | 4.4 | ✅ | 5 | Leg | 13th (SP 6.4) |
| L2 | 4 | RATTAN GALAXY | 20.9% | 60.2% | 25 | ✅ | 5 | Leg | 11th (SP 33) |
| L3 | 5 | BLING BLING GENIUS | 16.9% | 53.6% | 7.5 | ✅ | 8 | Leg | **1st** (SP 4.8) |
| L4 | 2 | DASHING MAURISON | 0.0% | 0.0% | 4.9 | ✅ (swap for #9) | 8 | Leg | 9th |
| — | 9 | WINDICATOR FAMILY | 3.8% | 21.6% | 15 | ❌ (swapped out) | 7 | — | **2nd** (SP 20) |
| — | 3 | IRON LEGION | 3.2% | 17.6% | 13 | ❌ | 7 | — | — |
| — | 7 | COOL BLUE | 1.1% | 7.5% | 15 | ❌ | 7 | — | 4th |
| — | 8 | SPEEDY TRIDENT | 0.4% | 3.9% | 65 | ❌ | 8 | — | — |
| — | 11 | HARRY'S HERO | 0.1% | 0.8% | 10 | ❌ | 10 | — | **3rd** (SP 13) |
| — | 10 | GOLD TACK | 0.0% | 0.7% | 18 | ❌ | 6 | — | 7th |
| — | 12 | CASA LEGEND | 0.0% | 0.5% | 17 | ❌ | 3 | — | 8th |
| — | 13 | MR ALADDIN | 0.0% | 0.0% | 31 | ❌ | 9 | — | 6th |
| — | 14 | THE WAY WE WIN | 0.0% | 0.0% | 57 | ❌ | 8 | — | 5th |

**Swap regret.** Step B **replaced #9** with **#2**; **#9** ran **2nd**. Banker **#1** collapsed; **#11** third was not in the ticket.

### R4 — Class 4 | 1400m Turf | Actual: 2→3→5

**Ticket:** ★ **#14** + legs **#2 → #1 → #5 → #7 → #9** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 14 | THE CONCENTRATION | 34.5% | 72.5% | 9.4 | ✅ | 9 | ★ Banker | **7th** (SP 9.4) |
| L1 | 2 | HAPPY BOSS | 32.5% | 72.0% | 9.9 | ✅ | 4 | Leg | **1st** (SP 9.9) |
| L2 | 1 | EIGHTY LIGHT YEARS | 8.4% | 33.2% | 13 | ✅ | 6 | Leg | 4th |
| L3 | 5 | GALLANT DESIGN | 7.3% | 32.1% | 5.5 | ✅ | 3 | Leg | **3rd** (SP 5.5) |
| L4 | 7 | INVICTUS DRAGON | 4.0% | 20.5% | 2.3 | ✅ | 7 | Leg | 5th (SP 2.1) |
| L5 | 9 | TYCOON EXPRESS | 2.9% | 16.3% | 6.6 | ✅ (swap for #3) | 2 | Leg | 10th (SP 11) |
| — | 3 | TOP TIME | 6.4% | 27.8% | 13 | ❌ (swapped out) | 7 | — | **2nd** (SP 13) |
| — | 8 | CHEERFUL WONGCHOY | 2.0% | 11.8% | 92 | ❌ | 2 | — | — |
| — | 10 | GOLDEN WIN | 1.4% | 9.0% | 100 | ❌ | 3 | — | 9th |
| — | 12 | SUPREME FEELING | 0.5% | 3.5% | 146 | ❌ | 4 | — | 14th |
| — | 11 | SWEET BRIAR | 0.1% | 0.9% | 67 | ❌ | 5 | — | 13th |
| — | 13 | AMAZING FUN | 0.0% | 0.2% | 33 | ❌ | 9 | — | 11th |
| — | 6 | MASSIVE GLORY | 0.0% | 0.2% | 44 | ❌ | 0 | — | — |
| — | 4 | LIGHTNESS OF BEING | 0.0% | 0.0% | 118 | ❌ | 5 | — | — |

**Pattern A + banker miss.** **#2·#3·#5** were frame; **#3** was removed by swap for **#9**. Banker **#14** unplaced.

### R5 — Class 4 | 1200m Turf | Actual: 5→1→10

**Ticket:** ★ **#1** + legs **#3 → #4 → #2 → #12 → #8 → #5** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 1 | SPICY STANDARD | 29.8% | 71.7% | 6.2 | ✅ | 3 | ★ Banker | **2nd** (SP 6.2) |
| L1 | 3 | CONRAD PATCH | 25.5% | 67.5% | 5.9 | ✅ | 4 | Leg | 5th (SP 4.5) |
| L2 | 4 | CALL ME SPARKLE | 21.6% | 62.7% | 3.8 | ✅ | 1 | Leg | 4th (SP 4.4) |
| L3 | 2 | VICTOR THE RAPID | 17.4% | 56.9% | 29 | ✅ | 12 | Leg | 6th |
| L4 | 12 | RUBY SAILING | 0.0% | 0.2% | 7.9 | ✅ (w&lt;10 add) | 7 | Leg | 8th |
| L5 | 8 | SUPREME VOYAGER | 0.9% | 7.6% | 8.3 | ✅ (w&lt;10 add) | 4 | Leg | 7th (SP 14) |
| L6 | 5 | FLASHING FIGHTER | 0.3% | 2.9% | 8.6 | ✅ (w&lt;10 add) | 0 | Leg | **1st** (SP 8.6) |
| — | 9 | CHATER FLASH | 2.3% | 14.4% | 10 | ❌ | 4 | — | 11th (SP 26) |
| — | 6 | JUBILANT STAR | 1.7% | 11.1% | 11 | ❌ | 4 | — | 9th (SP 14) |
| — | 10 | GORGEOUS VICTORY | 0.2% | 2.0% | 35 | ❌ | 3 | — | **3rd** (SP 35) |
| — | 7 | SMILING CHAMPION | 0.2% | 2.5% | 100 | ❌ | 1 | — | — |
| — | 11 | FULL OF LAUGHTER | 0.0% | 0.6% | 110 | ❌ | 4 | — | 12th |

**Near miss.** Banker **#1** and **#5** in frame; **#10** third at **35** — **not** among Step B adds (win **≥ 10**).

### R6 — Class 4 | 1200m Turf | Actual: 2→10→1 ✅

**Ticket:** ★ **#1** + legs **#3 → #2 → #6 → #7 → #10** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 1 | BABY SAKURA | 51.5% | 84.7% | 2.4 | ✅ | 2 | ★ Banker | **3rd** (SP 2.4) |
| L1 | 3 | ISLAND BUDDY | 19.4% | 60.4% | 19 | ✅ | 5 | Leg | 9th (SP 14) |
| L2 | 2 | ELITE GOLF | 10.5% | 45.6% | 5.2 | ✅ | 3 | Leg | **1st** (SP 5.2) |
| L3 | 6 | HEROIC VANGUARD | 6.7% | 30.9% | 27 | ✅ | 1 | Leg | 11th (SP 50) |
| L4 | 7 | LUCKY BID | 0.3% | 2.9% | 7.5 | ✅ (swap for #9) | 0 | Leg | 6th (SP 13) |
| L5 | 10 | LEADING DRAGON | 2.1% | 17.1% | 7.9 | ✅ (w&lt;10 add) | 3 | Leg | **2nd** (SP 7.9) |
| — | 9 | TOP THRONE | 4.1% | 23.4% | 22 | ❌ (swapped out) | 5 | — | — |
| — | 5 | FLYING SNIPER | 3.0% | 18.8% | 13 | ❌ | 1 | — | — |
| — | 11 | KINGDOM OF RICHES | 2.2% | 14.0% | 34 | ❌ | 7 | — | 8th |
| — | 8 | SUPER RUBICK KID | 0.1% | 1.1% | 39 | ❌ | 1 | — | — |
| — | 12 | AQUAMAN | 0.1% | 1.0% | 32 | ❌ | 6 | — | 10th |
| — | 4 | LO PAN SPIRIT | 0.0% | 0.0% | 17 | ❌ | 7 | — | — |

**Hit (thin div).** **#10** add-on delivered **2nd**; Trio **$90** vs **$100** → **−$10** on the race.

### R7 — Class 4 | 1400m Turf | Actual: 13→3→2

**Ticket:** ★ **#3** + legs **#4 → #2 → #5 → #11 → #9** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 3 | FORZA TORO | 36.0% | 70.9% | 3.6 | ✅ | 7 | ★ Banker | **2nd** (SP 6.3) |
| L1 | 4 | MASTER PHOENIX | 21.1% | 55.9% | 20 | ✅ | 7 | Leg | 8th (SP 41) |
| L2 | 2 | RUN RUN SMART | 14.3% | 45.5% | 7.7 | ✅ | 10 | Leg | **3rd** (SP 8.2) |
| L3 | 5 | STAR SATYR | 12.0% | 40.3% | 17 | ✅ | 10 | Leg | 10th (SP 26) |
| L4 | 11 | JUST FOLLOW ME | 5.0% | 22.4% | 5.3 | ✅ | 6 | Leg | 7th |
| L5 | 9 | SHOTGUN | 1.3% | 8.6% | 3.6 | ✅ (w&lt;10 add) | 10 | Leg | 4th |
| — | 10 | SUPER DRAGON | 3.2% | 16.2% | 10 | ❌ | 3 | — | 5th |
| — | 6 | FUN TOGETHER | 2.6% | 12.3% | 59 | ❌ | 6 | — | — |
| — | 8 | LUCKY GIBS | 2.0% | 10.5% | 130 | ❌ | 2 | — | — |
| — | 13 | ALABAMA SONG | 0.8% | 5.8% | 22 | ❌ | 11 | — | **1st** (SP 14) |
| — | 7 | PRESIDENT PEGASUS | 0.8% | 5.5% | 38 | ❌ | 0 | — | — |
| — | 14 | WAVE GARDEN | 0.7% | 4.5% | 45 | ❌ | 6 | — | 9th |
| — | 1 | FLYING FORTUNE | 0.1% | 1.1% | 56 | ❌ | 3 | — | 6th |
| — | 12 | LUCKY SECRET | 0.1% | 0.7% | 104 | ❌ | 4 | — | 14th |

**Pattern B.** **#13** winner outside pool; **#3** and **#2** placed.

### R8 — Class 3 | 1600m Turf | Actual: 7→1→12 ✅

**Ticket:** ★ **#7** + legs **#1 → #4 → #5 → #12** | 膽拖 C(4,2) = 6 × $10 = $60

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 7 | AMAZING PARTNERS | 48.7% | 85.9% | 6.1 | ✅ | 5 | ★ Banker | **1st** (SP 6.1) |
| L1 | 1 | MISTER DAPPER | 26.9% | 71.4% | 17 | ✅ | 6 | Leg | **2nd** (SP 17) |
| L2 | 4 | ENDUED | 12.5% | 52.2% | 2.9 | ✅ | 7 | Leg | 8th (SP 2.8) |
| L3 | 5 | FLYING LUCK | 2.4% | 17.5% | 4.7 | ✅ (w&lt;10 add) | 3 | Leg | 12th (SP 5.6) |
| L4 | 12 | WITHALLMYFAITH | 0.5% | 5.9% | 5.9 | ✅ (w&lt;10 add) | 10 | Leg | **3rd** (SP 5.9) |
| — | 2 | PRESTIGE GOOD | 2.8% | 19.8% | 16 | ❌ | 8 | — | 11th |
| — | 6 | SHANWAH | 2.4% | 16.0% | 48 | ❌ | 6 | — | — |
| — | 3 | WINDLORD | 1.8% | 12.7% | 47 | ❌ | 4 | — | — |
| — | 9 | HYMNBOOK | 1.0% | 8.4% | 54 | ❌ | 2 | — | — |
| — | 11 | RISING PHOENIX | 0.7% | 7.5% | 17 | ❌ | 10 | — | 4th |
| — | 8 | HAPPY TERCENTENARY | 0.1% | 1.0% | 52 | ❌ | 2 | — | — |
| — | 10 | LEGEND WINNER | 0.1% | 1.7% | 13 | ❌ | 5 | — | 9th |

**Hit (meeting saver).** Step B **adds #5 / #12** joined MC-heavy **#7 / #1**; Trio **$1,055** on **$60**.

### R9 — Class 3 | 1400m Turf | Actual: 7→1→5

**Ticket:** ★ **#5** + legs **#1 → #11 → #2 → #12 → #8 → #3** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 5 | ALL'S WELL | 41.3% | 73.4% | 11 | ✅ | 7 | ★ Banker | **3rd** (SP 11) |
| L1 | 1 | ENDEARED | 14.1% | 44.1% | 5.1 | ✅ | 11 | Leg | **2nd** (SP 5.1) |
| L2 | 11 | POSITIVE SMILE | 11.4% | 38.7% | 15 | ✅ | 8 | Leg | 6th |
| L3 | 2 | HEAVING | 8.6% | 30.6% | 11 | ✅ | 5 | Leg | 4th |
| L4 | 12 | REFUSETOBEENGLISH | 5.2% | 22.1% | 8.9 | ✅ | 9 | Leg | 8th |
| L5 | 8 | GHORGAN | 1.4% | 8.4% | 3.8 | ✅ (w&lt;10 add) | 7 | Leg | 10th (SP 3.3) |
| L6 | 3 | CHARMING LEGEND | 4.4% | 19.6% | 6.3 | ✅ (w&lt;10 add) | 2 | Leg | 12th (SP 6.5) |
| — | 10 | FLASH CURRENT | 4.2% | 19.1% | 15 | ❌ | 6 | — | 9th |
| — | 6 | COMPLETE UNKNOWN | 3.9% | 16.5% | 47 | ❌ | 1 | — | — |
| — | 7 | FORTUNE LINK | 3.7% | 17.0% | 17 | ❌ | 0 | — | **1st** (SP 17) |
| — | 4 | OUTGATE | 1.9% | 10.2% | 19 | ❌ | 9 | — | — |
| — | 9 | PRAY FOR JUSTICE | 0.0% | 0.3% | 20 | ❌ | 1 | — | — |

**Pattern B.** **#7** winner **not** in pool (no HK form in MC; win **17**).

### R10 — Class 3 | 1200m Turf | Actual: 11→6→3

**Ticket (as published):** ★ **#2** + legs **#3 → #4 → #12 → #10 → #1** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 2 | SMART GOLF | 46.6% | 82.8% | 4.6 | ✅ | 5 | ★ Banker | **— (not in JSON)** |
| L1 | 3 | YOUNG EMPEROR | 20.6% | 61.1% | 20 | ✅ | 7 | Leg | **3rd** (SP 26) |
| L2 | 4 | JUMBO TREASURE | 12.6% | 45.6% | 7.8 | ✅ | 6 | Leg | 8th |
| L3 | 12 | YEE CHEONG GLORY | 11.7% | 45.7% | 15 | ✅ | 7 | Leg | 6th |
| L4 | 10 | QUANTUM LEGEND | 0.2% | 2.4% | 3.1 | ✅ (w&lt;10 add) | 0 | Leg | 9th |
| L5 | 1 | CROSSBORDERPEGASUS | 1.7% | 12.8% | 6.8 | ✅ (w&lt;10 add) | 1 | Leg | 5th |
| — | 6 | TURQUOISE VELOCITY | 2.2% | 15.3% | 11 | ❌ | 4 | — | **2nd** (SP 11) |
| — | 5 | CHILL BUDDY | 1.7% | 12.7% | 11 | ❌ | 6 | — | 4th |
| — | 9 | NEW FUTURE FOLKS | 1.4% | 9.2% | 31 | ❌ | 8 | — | 10th |
| — | 7 | THE UNIQUE STAR | 1.3% | 10.6% | 37 | ❌ | 3 | — | 7th |
| — | 11 | MY MARS | 0.1% | 1.4% | 25 | ❌ | 0 | — | **1st** (SP 29) |
| — | 8 | MASTER OF ALL | 0.0% | 0.5% | 57 | ❌ | 7 | — | 11th |

**Structural hole + scratch risk.** **#11 / #6** filled the frame; **#2** absent from official `finishOrder` (11 finishers) — ticket as written is **void / N/A** for P&L; we still book **−$100** if staked pre-scratch. Large Trio **$6,560** left.

### R11 — Class 2 | 1200m Turf | Actual: 5→9→7

**Ticket:** ★ **#12** + legs **#1 → #9 → #11 → #5 → #2 → #7** | 膽拖 C(6,2) = 15 × $10 = $150

| Seq | # | Horse | Win% | Place% | Odds | Pool | Form | Role | Finished |
|-----|---|-------|------|--------|------|------|------|------|----------|
| ★ | 12 | PAKISTAN LEGACY | 57.6% | 88.3% | 10 | ✅ | 6 | ★ Banker | **11th** (SP 10) |
| L1 | 1 | COLOURFUL KING | 18.4% | 61.8% | 12 | ✅ | 6 | Leg | 6th |
| L2 | 9 | RISING FORCE | 9.7% | 45.8% | 4.6 | ✅ | 4 | Leg | **2nd** (SP 4.6) |
| L3 | 11 | GALACTIC VOYAGE | 4.2% | 25.9% | 6.1 | ✅ | 5 | Leg | 4th |
| L4 | 5 | CRIMSON FLASH | 3.2% | 22.3% | 7.4 | ✅ | 6 | Leg | **1st** (SP 7.4) |
| L5 | 2 | SKY TRUST | 0.3% | 3.7% | 5.5 | ✅ (w&lt;10 add) | 9 | Leg | 5th |
| L6 | 7 | YOUNG CHAMPION | 1.3% | 10.3% | 6 | ✅ (w&lt;10 add) | 12 | Leg | **3rd** (SP 6) |
| — | 6 | MAGIC CONTROL | 2.4% | 17.2% | 26 | ❌ | 10 | — | — |
| — | 4 | SELF IMPROVEMENT | 1.8% | 14.2% | 18 | ❌ | 2 | — | — |
| — | 3 | GORGEOUS WIN | 0.7% | 6.2% | 38 | ❌ | 9 | — | — |
| — | 10 | CHATEAUNEUF | 0.3% | 3.0% | 28 | ❌ | 8 | — | 9th |
| — | 8 | VICTOR THE WINNER | 0.1% | 1.5% | 51 | ❌ | 9 | — | — |

**Pattern A.** **#5·#9·#7** all legs; banker **#12** missed. Classic “frame without MC favourite”.

---

## Hit Detail (3 hits)

### R1 ✅ — Trio $18 | Stake $100 | P&L −$82

Paying set **{2,5,6}**; ticket includes **6** with **#2** and **#5** as legs. Dividend too small to cover stake.

### R6 ✅ — Trio $90 | Stake $100 | P&L −$10

Paying **2→10→1**; combo **1-2-10** listed in report. **#10** was Step B add after **#9** swap.

### R8 ✅ — Trio $1,055 | Stake $60 | P&L +$995

Paying **7→1→12**; all three on **1B+4L** ticket. Dominates meeting P&L.

---

## Banker Performance

| Race | Banker | MC Place% | MC Win% | Odds (early) | Finished | Placed? |
|------|--------|-----------|---------|--------------|----------|---------|
| R1 | #6 TALENTS CHAMPION | 60.4% | 24.0% | 2.9 | 3rd | ✅ |
| R2 | #9 WINNING MACHINE | 88.6% | 44.1% | 1.9 | 3rd | ✅ |
| R3 | #1 BEAUTY MISSILE | 68.9% | 28.8% | 7.3 | 10th | ❌ |
| R4 | #14 THE CONCENTRATION | 72.5% | 34.5% | 9.4 | 7th | ❌ |
| R5 | #1 SPICY STANDARD | 71.7% | 29.8% | 6.2 | 2nd | ✅ |
| R6 | #1 BABY SAKURA | 84.7% | 51.5% | 2.4 | 3rd | ✅ |
| R7 | #3 FORZA TORO | 70.9% | 36.0% | 3.6 | 2nd | ✅ |
| R8 | #7 AMAZING PARTNERS | 85.9% | 48.7% | 6.1 | 1st | ✅ |
| R9 | #5 ALL'S WELL | 73.4% | 41.3% | 11 | 3rd | ✅ |
| R10 | #2 SMART GOLF | 82.8% | 46.6% | 4.6 | — (not in result JSON) | ❌ |
| R11 | #12 PAKISTAN LEGACY | 88.3% | 57.6% | 10 | 11th | ❌ |
| **TOTAL** | | **avg 75.6%** | | | | **7/11 (63.6%)** |

High banker **place rate** but only **3** races returned a Trio dividend — **R2** and **R5** show banker-in-frame is not sufficient.

---

## Comparison: Strategy B vs Strategy A

| Metric | Strategy B | Strategy A |
|--------|------------|------------|
| Hits (races) | **3/11** | **2/11** |
| Staked | $1,100 | $640 |
| Returned | $1,163 | $248 |
| **P&L** | **+$63** | **−$392** |
| **ROI** | **+5.7%** | **−61.3%** |

Strategy B wins on **ROI** and **net** this meeting, almost entirely due to **R8**. Strategy A had **R2** (**$230** on **$30**) and **R1** (**$18** on **$200** full field).

---

## Lessons

1. **Single-race leverage** — One **C(4,2)** hit (**R8**) can flip an 11-race card; without fat tails, Step B adds look expensive on misses.

2. **Swap risk** — **R3** (**#9** out) and **R4** (**#3** out) removed horses that **placed**; swap logic needs post-mortem vs “always keep marginal primaries”.

3. **Win &lt; 10 adds** — Helped **R1** (all in field), **R6** (**#10**), **R8** (**#5, #12**); **R5** missed **#10** because win odds **35** (not &lt; 10).

4. **R7 / R9** — Wide **#13** and **#7** wins with thin MC representation — structural gap for MC-first tickets.

5. **R10** — MC favourite **#2** missing from results JSON implies **scratch**; always reconcile starters before staking **膽拖**.

6. **R11** — **#5·#9·#7** all in legs; banker **#12** failed — same “Pattern A” as other reviews.

---

## Cross-reference

| File | Role |
|------|------|
| `data/reviews/trio_review_20260412_ST.md` | Short post-race note (Strategy A + B) |
| `data/reviews/trio_review_stratC_20260408_HV.md` | Long-form Strategy B template (HV rules differ) |
| `data/reports/trio_strategy_20260412_ST_R1.md` … `R11.md` | Pre-race MC + Strategy B definitions |
| `data/historical/results_20260412_ST.json` | Official finishes + Trio dividends |

---

*Post-race learning only — not betting advice.*
