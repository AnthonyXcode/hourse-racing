# Strategy B Review — MC #1 banker + MC top 6 pool (trio SKILL) | Happy Valley | 29 Apr 2026

## Rules

- **Banker**: MC **#1** by MC Win% (same as "MC #1" in reports).
- **Pool**: Always first **6** horses by raw MC Win% descending.
- **Bet type**: Trio (單T) — top 3 in **any** order.
- **Unit**: **$10** per combination; structure **膽拖** 1 banker + 5 legs → **C(5, 2) = 10** combos.
- **Stake**: **$100 fixed per race**, all 9 races played (no PASS).
- **No SCMP, no jockey boost, no debutant rule.**

**Results source:** `data/historical/results_20260429_HV.json`.
**Pre-race definitions:** `data/reports/trio_strategy_20260429_HV_R1.md` … `R9.md` (MC SIMULATION raw tables).

---

## Summary

| Metric | Strategy B | Strategy A |
|--------|-----------|-----------|
| Races played | **9 (R1–R9)** | **9 (R1–R9)** |
| Hit rate | **1/9 (11.1%)** | **2/9 (22.2%)** |
| Total staked | **$900** | **$730** |
| Total returned | **$409** | **$620** |
| **Net P&L** | **−$491** | **−$110** |
| **ROI** | **−54.6%** | **−15.1%** |
| Session Result | **LOSS (both)** | **A outperforms by +$381** |

---

## Race-by-Race Results

### Strategy B

| Race | Class | Dist | Surf | Banker (MC#1) | Final legs (MC #2–#6) | Combos | Stake | Result (1→2→3) | Banker top 3? | Hit? | Trio $ | Return | P&L |
|------|-------|------|------|---------------|----------------------|--------|-------|----------------|---------------|------|--------|--------|-----|
| R1 | C5 | 1800m | Turf | #5 FAMILY FORTUNE (30.6W/70.3P) | #7,#1,#8,#6,#9 | 10 | $100 | 4→3→5 | 3rd ✅ | ❌ | $1,674 | $0 | −$100 |
| R2 | C4 | 1200m | Turf | #6 THE PERFECT MATCH (37.9W/71.6P) | #4,#9,#3,#10,#2 | 10 | $100 | 4→12→6 | 3rd ✅ | ❌ | $613 | $0 | −$100 |
| R3 | C4 | 2200m | Turf | #2 NOBLE PURSUIT (31.5W/66.2P) | #3,#11,#5,#9,#8 | 10 | $100 | 10→5→8 | ❌ | ❌ | $15,142 | $0 | −$100 |
| R4 | C4 | 1200m | Turf | #1 CROSSBORDERDUDE (47.6W/82.5P) | #3,#2,#5,#7,#4 | 10 | $100 | 3→11→1 | 3rd ✅ | ❌ | $117 | $0 | −$100 |
| R5 | C4 | 1200m | Turf | #2 SUPERB KING (37.4W/69.3P) | #5,#8,#7,#3,#9 | 10 | $100 | 8→2→12 | 2nd ✅ | ❌ | $148 | $0 | −$100 |
| R6 | C4 | 1650m | Turf | #3 BEAUTY VIVA (27.7W/60.9P) | #1,#9,#8,#2,#6 | 10 | $100 | 4→1→6 | ❌ | ❌ | $4,108 | $0 | −$100 |
| R7 | C2 | 1000m | Turf | #2 COLOURFUL KING (40.5W/78.3P) | #8,#3,#10,#1,#9 | 10 | $100 | 3→8→2 | 3rd ✅ | **✅** | $409 | $409 | +$309 |
| R8 | C3 | 1200m | Turf | #4 GIANT BALLON (44.8W/81.2P) | #2,#8,#12,#3,#6 | 10 | $100 | 4→6→11 | 1st ✅ | ❌ | $577 | $0 | −$100 |
| R9 | C3 | 1650m | Turf | #6 ARMOR GOLDEN EAGLE (34.3W/71.0P) | #5,#2,#1,#9,#4 | 10 | $100 | 6→12→5 | 1st ✅ | ❌ | $211 | $0 | −$100 |
| **TOTAL** | | | | | | **90** | **$900** | | **7/9 ✅** | **1/9** | | **$409** | **−$491** |

### Strategy A

| Race | Class | Mode | Banker(s) | Legs | Combos | Stake | Result (1→2→3) | Hit? | Trio $ | Return | P&L | Miss Reason |
|------|-------|------|-----------|------|--------|-------|----------------|------|--------|--------|-----|-------------|
| R1 | C5 | 雙膽拖 2+4 | #5,#7 | #1,#6,#8,#4 | 4 | $40 | 4→3→5 | ❌ | $1,674 | $0 | −$40 | Co-banker #7 4th + pool gap #3 |
| R2 | C4 | A (tight 5) | #6 | #4,#9,#3,#10 | 6 | $60 | 4→12→6 | ❌ | $613 | $0 | −$60 | Banker hit, pool gap #12 (15x) |
| R3 | C4 | B (6) | #2 | #3,#11,#5,#9,#8 | 10 | $100 | 10→5→8 | ❌ | $15,142 | $0 | −$100 | Banker fail + pool gap #10 (88x upset) |
| R4 | C4 | A* (6) | #1 | #2,#3,#4,#5,#7 | 10 | $100 | 3→11→1 | ❌ | $117 | $0 | −$100 | Banker hit, pool gap #11 (4.6x) |
| R5 | C4 | A* (6) | #2 | #5,#8,#7,#3,#9 | 10 | $100 | 8→2→12 | ❌ | $148 | $0 | −$100 | Banker hit, pool gap #12 (9.6x) |
| R6 | C4 | B (6) | #3 | #1,#9,#8,#2,#10 | 10 | $100 | 4→1→6 | ❌ | $4,108 | $0 | −$100 | Banker fail + pool gap #4 (11x vet-excluded) |
| R7 | C2 | 雙膽拖 2+3 | #2,#8 | #3,#10,#1 | 3 | $30 | 3→8→2 | **✅** | $409 | $409 | +$379 | 雙膽拖 converts — campaign first |
| R8 | C3 | A* (6) | #4 | #2,#8,#12,#3,#6 | 10 | $100 | 4→6→11 | ❌ | $577 | $0 | −$100 | Banker hit, pool gap #11 (16x) |
| R9 | C3 | B (6) | #6 | #5,#2,#1,#11,#12 | 10 | $100 | 6→12→5 | **✅** | $211 | $211 | +$111 | **SCMP +excuses #12 inclusion pays off** |
| **TOTAL** | | | | | **73** | **$730** | | **2/9** | | **$620** | **−$110** | |

## Full MC Place% Table (ticket horses + field)

*Odds* = pre-race HKJC win odds from `data/reports/trio_strategy_20260429_HV_R*.md`. **Finished** + **SP** from `data/historical/results_20260429_HV.json` (`winOdds` on each finisher).

**Ticket (Strategy B — this review):** MC rank **#1** banker + horses ranked **MC #2–#6** by raw MC Win% descending; five legs **L1–L5** list that MC order. **Pool** column **✅** = banker or one of those five legs (six horses total).

**Row order:** **★** banker first, legs **L1…L5** in MC **#2–#6** order, then **—** for remaining starters by saddle number.

---

### R1 — Class 5 | 1800m Turf | Actual: 4→3→5 ❌

**Ticket:** ★ **#5** + legs **#7 → #1 → #8 → #6 → #9** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Role | Finished |
|-----|---|-------|------|--------|------|------|------|----------|
| ★ | 5 | FAMILY FORTUNE | 30.6% | 70.3% | 10.0 | ✅ | ★ Banker | 3rd (SP 10.0) |
| L1 | 7 | PERFECT PAIRING | 22.3% | 59.4% | 4.4 | ✅ | Leg | 4th (SP 3.6) |
| L2 | 1 | CELESTIAL HARMONY | 18.9% | 55.4% | 9.5 | ✅ | Leg | 8th (SP 5.4) |
| L3 | 8 | PERFECT PEACH | 12.6% | 43.7% | 14.0 | ✅ | Leg | 11th (SP 9.6) |
| L4 | 6 | KASA PAPA | 11.3% | 41.0% | 8.2 | ✅ | Leg | 5th (SP 8.4) |
| L5 | 9 | GOLDEN FAIRY | 2.0% | 11.7% | 30.0 | ✅ | Leg | 10th (SP 34) |
| — | 2 | DILBAGH | 0.0% | 0.7% | 9.5 | ❌ | — | 12th (SP 19) |
| — | 3 | SPLENDID FORCE | 0.1% | 0.7% | 8.6 | ❌ | — | **2nd** (SP 17) |
| — | 4 | DASHING MAURISON | 0.6% | 5.4% | 5.3 | ❌ | — | **1st** (SP 5.4) |
| — | 10 | HAPPY BUDDIES | 1.3% | 9.5% | 45.0 | ❌ | — | 7th (SP 58) |
| — | 11 | ISLAND GOLDEN | 0.2% | 1.7% | 41.0 | ❌ | — | 6th (SP 40) |
| — | 12 | MR ALADDIN | 0.1% | 0.7% | 9.1 | ❌ | — | 9th (SP 14) |

**Pattern B — banker hit (#5 3rd) but MC top‑6 missed both the upset winner (#4 MC 0.6% / 17× implied disconnect) and the rallying second (#3 squeezed out at MC 0.1% Win despite excuse narrative). You had the banker in-frame; combinations needed #4 “market brute” bridging or #3’s placings — neither fits a strict MC‑only top‑six shell.**

---

### R2 — Class 4 | 1200m Turf | Actual: 4→12→6 ❌

**Ticket:** ★ **#6** + legs **#4 → #9 → #3 → #10 → #2** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Role | Finished |
|-----|---|-------|------|--------|------|------|------|----------|
| ★ | 6 | THE PERFECT MATCH | 37.9% | 71.6% | 6.7 | ✅ | ★ Banker | 3rd (SP 12) |
| L1 | 4 | HONEST WITNESS | 23.1% | 59.3% | 2.8 | ✅ | Leg | **1st** (SP 2.5) |
| L2 | 9 | KING GLORIOSO | 10.3% | 37.5% | 6.5 | ✅ | Leg | 8th (SP 5.1) |
| L3 | 3 | EVERSTAR | 9.2% | 34.4% | 13.0 | ✅ | Leg | 7th (SP 22) |
| L4 | 10 | GLACIATED | 5.6% | 23.6% | 10.0 | ✅ | Leg | 10th (SP 5.6) |
| L5 | 2 | VERY GRATEFUL | 4.7% | 21.7% | 17.0 | ✅ | Leg | 5th (SP 35) |
| — | 1 | CHEAHA | 0.3% | 2.4% | 19.0 | ❌ | — | 4th (SP 49) |
| — | 5 | SOO KOO | 0.8% | 4.9% | 34.0 | ❌ | — | 11th (SP 80) |
| — | 7 | AMO ERGO SUM | 1.3% | 8.2% | 20.0 | ❌ | — | 9th (SP 17) |
| — | 8 | SEA DIAMOND | 4.1% | 19.1% | 13.0 | ❌ | — | 12th (SP 36) |
| — | 11 | LEAN MASTER | 1.4% | 8.2% | 19.0 | ❌ | — | 6th (SP 8.6) |
| — | 12 | GOLDEN FRIENDSHIP | 1.4% | 9.3% | 13.0 | ❌ | — | **2nd** (SP 15) |

**Pattern B** — Banker boxed the Trio (#6 3rd) and the favourite (#4) won on top, yet #12 GOLDEN FRIENDSHIP (MC 9.3% Place, outside the sixth slot) nailed second at double-figure SP. The structural gap was the longshot placer—not the banker.

---

### R3 — Class 4 | 2200m Turf | Actual: 10→5→8 ❌

**Ticket:** ★ **#2** + legs **#3 → #11 → #5 → #9 → #8** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Role | Finished |
|-----|---|-------|------|--------|------|------|------|----------|
| ★ | 2 | NOBLE PURSUIT | 31.5% | 66.2% | 7.6 | ✅ | ★ Banker | 7th (SP 13) |
| L1 | 3 | SERANGOON | 21.6% | 54.8% | 9.8 | ✅ | Leg | 9th (SP 9.3) |
| L2 | 11 | ROMANTIC FANTASY | 16.7% | 48.8% | 6.1 | ✅ | Leg | 5th (SP 4.7) |
| L3 | 5 | DOUBLE WIN | 12.7% | 40.8% | 12.0 | ✅ | Leg | **2nd** (SP 14) |
| L4 | 9 | STAR BROSE | 4.5% | 19.6% | 3.2 | ✅ | Leg | 6th (SP 2.6) |
| L5 | 8 | JOYFUL PROSPERITY | 3.6% | 16.7% | 8.5 | ✅ | Leg | **3rd** (SP 12) |
| — | 1 | AGENDA | 1.4% | 9.2% | 12.0 | ❌ | — | 11th (SP 25) |
| — | 4 | KING OF SELECTION | 2.5% | 12.3% | 81.0 | ❌ | — | 12th (SP 126) |
| — | 6 | PACKING HURRICANE | 2.8% | 14.2% | 11.0 | ❌ | — | 8th (SP 12) |
| — | 7 | OCEAN IMPACT | 1.3% | 7.9% | 16.0 | ❌ | — | 4th (SP 16) |
| — | 10 | SUPER GOLDENDRAGON | 1.2% | 7.1% | 46.0 | ❌ | — | **1st** (SP 88) |
| — | 12 | SMART CITY | 0.2% | 2.2% | 20.0 | ❌ | — | 10th (SP 11) |

**Pattern C** — Banker failed (#2 flattened to midfield) while #10 SUPER GOLDENDRAGON won at ~88 SP (MC listed 1.2% Win / 7.1% Place—a tote explosion). The winner was never reachable inside MC top-six by SIM design.

---

### R4 — Class 4 | 1200m Turf | Actual: 3→11→1 ❌

**Ticket:** ★ **#1** + legs **#3 → #2 → #5 → #7 → #4** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Role | Finished |
|-----|---|-------|------|--------|------|------|------|----------|
| ★ | 1 | CROSSBORDERDUDE | 47.6% | 82.5% | 3.1 | ✅ | ★ Banker | 3rd (SP 2.8) |
| L1 | 3 | FIND MY LOVE | 18.5% | 57.3% | 6.8 | ✅ | Leg | **1st** (SP 4.1) |
| L2 | 2 | JOY CAPITAL | 11.2% | 41.9% | 41.0 | ✅ | Leg | 12th (SP 62) |
| L3 | 5 | ACE POWER | 8.9% | 37.8% | 4.4 | ✅ | Leg | 6th (SP 7.3) |
| L4 | 7 | STARRY SHOW | 5.4% | 25.9% | 21.0 | ✅ | Leg | 7th (SP 19) |
| L5 | 4 | BRIGHT DAY | 5.2% | 25.5% | 12.0 | ✅ | Leg | 5th (SP 16) |
| — | 6 | LIGHTNING ACE | 0.7% | 5.2% | 52.0 | ❌ | — | 10th (SP 93) |
| — | 8 | AWESOME TREASURE | 0.2% | 1.8% | 17.0 | ❌ | — | 11th (SP 30) |
| — | 9 | FLASH STAR | 0.5% | 5.3% | 25.0 | ❌ | — | 9th (SP 66) |
| — | 10 | BRAVE WIN | 0.9% | 7.7% | 10.0 | ❌ | — | 8th (SP 21) |
| — | 11 | WINNING NOW | 0.6% | 5.2% | 10.0 | ❌ | — | **2nd** (SP 4.6) |
| — | 12 | HEROIC MASTER | 0.4% | 3.9% | 20.0 | ❌ | — | 4th (SP 31) |

**Pattern B** — Banker held third, #3 won, but #11 WINNING NOW (MC Win 0.6%) split the exacta from seventh on the SIM ladder—outside the mechanical sixth slot. Trio paid only $117 despite the short favourite stack.

---

### R5 — Class 4 | 1200m Turf | Actual: 8→2→12 ❌

**Ticket:** ★ **#2** + legs **#5 → #8 → #7 → #3 → #9** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Role | Finished |
|-----|---|-------|------|--------|------|------|------|----------|
| ★ | 2 | SUPERB KING | 37.4% | 69.3% | 4.0 | ✅ | ★ Banker | 2nd (SP 3.7) |
| L1 | 5 | THUNDER PRINCE | 10.8% | 36.3% | 4.7 | ✅ | Leg | 4th (SP 2.5) |
| L2 | 8 | GAMEPLAYER ELITE | 10.8% | 36.6% | 4.3 | ✅ | Leg | **1st** (SP 4.0) |
| L3 | 7 | FORZA LEADER | 10.2% | 33.8% | 49.0 | ✅ | Leg | 7th (SP 72) |
| L4 | 3 | ORIGIN OF FORM | 9.2% | 30.3% | 14.0 | ✅ | Leg | 8th (SP 49) |
| L5 | 9 | LEGEND STAR | 8.8% | 31.5% | 8.9 | ✅ | Leg | 6th (SP 16) |
| — | 1 | LUCKY DOCTOR | 0.3% | 3.1% | 49.0 | ❌ | — | 12th (SP 101) |
| — | 4 | MIGHTY FIGHTER | 3.0% | 14.4% | 16.0 | ❌ | — | 5th (SP 18) |
| — | 6 | KING CANNON | 3.6% | 16.4% | 46.0 | ❌ | — | 10th (SP 65) |
| — | 10 | SWEET BRIAR | 3.3% | 13.8% | 29.0 | ❌ | — | 9th (SP 97) |
| — | 11 | QUICK MONEY | 1.6% | 7.8% | 33.0 | ❌ | — | 11th (SP 70) |
| — | 12 | VIGOR ELLEEGANT | 1.1% | 6.9% | 6.4 | ❌ | — | **3rd** (SP 9.6) |

**Pattern B** — #2 ran on for second alongside the two market engines (#8 / #5), yet #12 VIGOR ELLEEGANT (MC eighth on Win rank) collected third at 9.6 SP—off the MC top-six runway.

---

### R6 — Class 4 | 1650m Turf | Actual: 4→1→6 ❌

**Ticket:** ★ **#3** + legs **#1 → #9 → #8 → #2 → #6** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Role | Finished |
|-----|---|-------|------|--------|------|------|------|----------|
| ★ | 3 | BEAUTY VIVA | 27.7% | 60.9% | 7.6 | ✅ | ★ Banker | 7th (SP 6.1) |
| L1 | 1 | MIGHTY STEED | 24.5% | 57.3% | 13.0 | ✅ | Leg | **2nd** (SP 9.4) |
| L2 | 9 | JUSTIFYING | 11.1% | 35.2% | 11.0 | ✅ | Leg | 12th (SP 17) |
| L3 | 8 | GENERAL REDWOOD | 8.3% | 30.0% | 10.0 | ✅ | Leg | 10th (SP 8.1) |
| L4 | 2 | ROMANTIC LAOS | 8.3% | 29.1% | 8.5 | ✅ | Leg | 6th (SP 9.6) |
| L5 | 6 | NEVER TOO SOON | 7.7% | 28.6% | 13.0 | ✅ | Leg | **3rd** (SP 18) |
| — | 4 | ANOTHER ZONDA | 1.7% | 9.0% | 11.0 | ❌ | — | **1st** (SP 11) |
| — | 5 | LUCKY TOGETHER | 0.5% | 3.8% | 57.0 | ❌ | — | 4th (SP 61) |
| — | 7 | THE ABSOLUTE | 3.5% | 14.4% | 19.0 | ❌ | — | 8th (SP 43) |
| — | 10 | VIVACIOUS WIN | 3.6% | 15.6% | 2.9 | ❌ | — | 5th (SP 2.6) |
| — | 11 | EXCELLENT BOY | 1.6% | 8.9% | 11.0 | ❌ | — | 9th (SP 16) |
| — | 12 | WINNING DATA | 1.4% | 7.2% | 21.0 | ❌ | — | 11th (SP 25) |

**Pattern C** — Banker #3 folded (~7th) while #4 ANOTHER ZONDA (MC 1.7% Win, vet haircut in SCMP notes) won. Favourite #10 VIVACIOUS WIN was not in mechanical top-six despite the short tote; legs still hit second/third without the winner on the slip.

---

### R7 — Class 2 | 1000m Turf | Actual: 3→8→2 ✅

**Ticket:** ★ **#2** + legs **#8 → #3 → #10 → #1 → #9** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Role | Finished |
|-----|---|-------|------|--------|------|------|------|----------|
| ★ | 2 | COLOURFUL KING | 40.5% | 78.3% | 4.4 | ✅ | ★ Banker | 3rd (SP 3.2) |
| L1 | 8 | GLOWING PRAISES | 22.2% | 61.9% | 5.0 | ✅ | Leg | **2nd** (SP 11) |
| L2 | 3 | BOTTOMUPTOGETHER | 15.2% | 50.7% | 11.0 | ✅ | Leg | **1st** (SP 6.0) |
| L3 | 10 | CANDLELIGHT DINNER | 10.3% | 40.3% | 8.4 | ✅ | Leg | 4th (SP 7.2) |
| L4 | 1 | STELLAR EXPRESS | 4.8% | 23.7% | 9.6 | ✅ | Leg | 6th (SP 13) |
| L5 | 9 | YOUTHFUL SPIRITS | 3.4% | 18.4% | 7.6 | ✅ | Leg | 10th (SP 10) |
| — | 4 | MAGIC CONTROL | 1.6% | 11.1% | 13.0 | ❌ | — | 5th (SP 7.1) |
| — | 5 | BRAVE STAR | 1.1% | 8.9% | 8.1 | ❌ | — | 8th (SP 18) |
| — | 6 | AKASHVANI | 0.8% | 6.5% | 13.0 | ❌ | — | 7th (SP 8.9) |
| — | 7 | SON PAK FU | ≤0.1% | ≤0.1% | 14.0 | ❌ | — | 9th (SP 42) |

**Hit** — Trio 3–8–2 (bottom-up front / GLOWING PRAISES / COLOURFUL KING) matched the live frame; banked $409.

---

### R8 — Class 3 | 1200m Turf | Actual: 4→6→11 ❌

**Ticket:** ★ **#4** + legs **#2 → #8 → #12 → #3 → #6** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Role | Finished |
|-----|---|-------|------|--------|------|------|------|----------|
| ★ | 4 | GIANT BALLON | 44.8% | 81.2% | 3.9 | ✅ | ★ Banker | **1st** (SP 2.7) |
| L1 | 2 | HAPPY INDEX | 24.5% | 65.8% | 9.4 | ✅ | Leg | 9th (SP 8.6) |
| L2 | 8 | EMBRACE ABERDEEN | 13.0% | 47.8% | 8.6 | ✅ | Leg | 6th (SP 6.1) |
| L3 | 12 | MEOWTH | 5.2% | 26.9% | 6.1 | ✅ | Leg | 4th (SP 5.3) |
| L4 | 3 | SPORTS LEGEND | 5.1% | 26.6% | 10.0 | ✅ | Leg | 8th (SP 9.4) |
| L5 | 6 | FLYING WROTE | 3.4% | 18.7% | 12.0 | ✅ | Leg | **2nd** (SP 10) |
| — | 1 | MID WINTER WIND | 0.8% | 6.6% | 13.0 | ❌ | — | 11th (SP 30) |
| — | 5 | CAUSEWAY KING | 0.3% | 2.8% | 18.0 | ❌ | — | 7th (SP 37) |
| — | 7 | TACTICAL ACE | 0.2% | 2.5% | 21.0 | ❌ | — | 12th (SP 52) |
| — | 9 | COPARTNER FLEET | 0.5% | 5.1% | 30.0 | ❌ | — | 5th (SP 104) |
| — | 10 | HEY BROS | 0.4% | 4.2% | 16.0 | ❌ | — | 10th (SP 43) |
| — | 11 | SPIRIT OF PEACE | 1.8% | 11.8% | 7.7 | ❌ | — | **3rd** (SP 16) |

**Pattern B** — #4 banked the win, #6 Flying Wrote nailed second, yet #11 SPIRIT OF PEACE (MC 1.8% Win / 11.8% Place) snuck third—the SKILL overlay would swap this short-odds tail in for gate horses, but strictly MC top-six still missed the rails closer.

---

### R9 — Class 3 | 1650m Turf | Actual: 6→12→5 ❌

**Ticket:** ★ **#6** + legs **#5 → #2 → #1 → #9 → #4** | 膽拖 C(5,2) = 10 × $10 = $100

| Seq | # | Horse | Win% | Place% | Odds | Pool | Role | Finished |
|-----|---|-------|------|--------|------|------|------|----------|
| ★ | 6 | ARMOR GOLDEN EAGLE | 34.3% | 71.0% | 7.0 | ✅ | ★ Banker | **1st** (SP 2.8) |
| L1 | 5 | FANTASTIC FUN | 23.0% | 60.8% | 6.4 | ✅ | Leg | **3rd** (SP 12) |
| L2 | 2 | KEEFY | 17.5% | 52.7% | 12.0 | ✅ | Leg | 5th (SP 19) |
| L3 | 1 | SOLID WIN | 13.8% | 45.9% | 8.8 | ✅ | Leg | 11th (SP 6.9) |
| L4 | 9 | STORMI | 3.9% | 19.7% | 15.0 | ✅ | Leg | 8th (SP 27) |
| L5 | 4 | I CAN | 2.3% | 12.2% | 28.0 | ✅ | Leg | 10th (SP 72) |
| — | 3 | CORLEONE | 1.1% | 8.4% | 8.8 | ❌ | — | 9th (SP 10) |
| — | 7 | CALIFORNIA MOXIE | 1.9% | 11.0% | 19.0 | ❌ | — | 4th (SP 12) |
| — | 8 | SPICY GOLD | 1.0% | 6.8% | 20.0 | ❌ | — | 12th (SP 77) |
| — | 10 | VIVA GRACIOUSNESS | 0.6% | 5.3% | 5.4 | ❌ | — | 6th (SP 15) |
| — | 11 | LUCKY TWIN STARS | 0.6% | 4.3% | 17.0 | ❌ | — | 7th (SP 11) |
| — | 12 | WITH ALL MY FAITH | 0.2% | 2.0% | 5.9 | ❌ | — | **2nd** (SP 5.6) |

**Pattern B** — Banker #6 won outright, Fantastic Fun chipped third prices, yet #12 WITH ALL MY FAITH filled second from negligible MC tails (~0.2% Win)—exact gap the A/B section cites when SCMP widens overlays versus brute MC ladders.

---

## Banker Performance (MC #1)

| Race | MC #1 | MC Win% | MC Place% | SP | Finish | Top 3? |
|------|-------|---------|-----------|-----|--------|--------|
| R1 | #5 FAMILY FORTUNE | 30.6% | 70.3% | 10x | 3rd | ✅ |
| R2 | #6 THE PERFECT MATCH | 37.9% | 71.6% | 12x | 3rd | ✅ |
| R3 | #2 NOBLE PURSUIT | 31.5% | 66.2% | 7.6x | Unplaced | ❌ |
| R4 | #1 CROSSBORDERDUDE | 47.6% | 82.5% | 2.8x | 3rd | ✅ |
| R5 | #2 SUPERB KING | 37.4% | 69.3% | 3.7x | 2nd | ✅ |
| R6 | #3 BEAUTY VIVA | 27.7% | 60.9% | — | Unplaced | ❌ |
| R7 | #2 COLOURFUL KING | 40.5% | 78.3% | 3.2x | 3rd | ✅ |
| R8 | #4 GIANT BALLON | 44.8% | 81.2% | 2.7x | 1st | ✅ |
| R9 | #6 ARMOR GOLDEN EAGLE | 34.3% | 71.0% | 2.8x | 1st | ✅ |

**MC #1 banker top-3 rate: 7/9 (77.8%)** — campaign best meeting.

---

## Miss Analysis

### Strategy B Miss Patterns

| Pattern | Count | Races | Missed $ |
|---------|-------|-------|----------|
| B — Banker hit, pool gap | 5 | R1, R2, R4, R5, R8 | $3,129 |
| C — Banker fail + pool gap | 2 | R3, R6 | — |
| B — Banker hit, pool gap (A-only hit) | 1 | R9 | $211 |
| Hit | 1 | R7 | +$409 |

Strategy B's persistent weakness: 5 of 7 misses had the banker in the top 3 — the pool just couldn't cover the third placer. The most impactful was R9 where the pool gap (#12 WITH ALL MY FAITH, MC 0.2%) was structurally unreachable by MC top 6.

---

## A vs B Divergence

| Race | What Differed | A Result | B Result | Impact |
|------|--------------|----------|----------|--------|
| R1 | A: 雙膽拖 $40, pool incl. #4. B: 膽拖 $100, pool incl. #9 not #4. | MISS | MISS | A saved $60 |
| R2 | A: tight 5-pool $60. B: 6-pool $100. | MISS | MISS | A saved $40 |
| R6 | A: swaps #6→#10. B: keeps #6. | MISS | MISS | Same outcome (banker fail); A's pool worse |
| R7 | A: 雙膽拖 $30. B: 膽拖 $100. | **HIT** | **HIT** | A saved **$70** |
| R9 | **A: SCMP includes #12. B: MC top 6 has #9,#4 instead.** | **HIT** | MISS | **A gained $211** |

**Net impact of divergence:** A saved $170 in stake across losing races + gained $211 on R9 hit = **+$381 advantage**.

---

## Session Verdict

Strategy A decisively outperformed Strategy B this session (−$110 vs −$491, +$381 delta). The edge came from two sources: **structural savings** (雙膽拖 at $30 vs $100 in R7, plus tighter pools in R1/R2) and **SCMP intelligence** (R9's #12 inclusion was the only path to the $211 Trio). This is the strongest single-session validation of the full pipeline's SCMP overlay over pure MC ranking. Strategy B's MC top 6 cannot mechanically include horses ranked 7th or below — and when those horses place (as #12 did in R9), the gap is unbridgeable.
