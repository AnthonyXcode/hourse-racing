# Strategy B Review — MC #1 banker + Place%>20% | Happy Valley | 10 Jun 2026

## Rules

- **Banker**: MC **#1** by MC Win% (raw).
- **Primary legs**: MC Place% > 20%; Step B swap/add for Win <10.
- **Bet**: Trio 膽拖; **$10**/combo.
- **Reports:** `data/reports/trio_strategy_20260610_HV_R1.md` … **R9`
- **Results:** `data/historical/results_20260610_HV.json`

---

## Summary

| Metric | Strategy B (report) | Strategy A (8 staked) |
|--------|---------------------|------------------------|
| Races | **9** | **8** |
| Hit rate | **2/9 (22.2%)** | **1/8 (12.5%)** |
| Staked | **$1330** | **$730** |
| Returned | **$685** | **$265** |
| **Net P&L** | **$-645** | **$-465** |
| **ROI** | **-48.5%** | **-63.7%** |

---

## Race-by-Race Results — Strategy B

| Race | Class | Dist | Banker (MC#1) | Final legs | Stake | Result | Banker top 3? | Hit? | Trio $ | Return | P&L |
|------|-------|------|---------------|------------|-------|--------|---------------|------|--------|--------|-----|
| R1 | Class 5 | 1800m | #9 | #1,#6,#7,#10,#2,#3,#8 | $210 | 2→1→10 | ❌ | ❌ | $555 | $0 | $-210 |
| R2 | Class 4 | 1650m | #5 | #4,#1,#7,#3,#2,#11 | $150 | 1→7→6 | ❌ | ❌ | $256 | $0 | $-150 |
| R3 | Class 4 | 1200m | #5 | #2,#10,#3,#7,#9 | $100 | 8→11→5 | ✅ | ❌ | $2281 | $0 | $-100 |
| R4 | Class 4 | 1000m | #5 | #1,#2,#10,#4,#9,#8,#3 | $210 | 3→5→8 | ✅ | ✅ | $420 | $420 | +$210 |
| R5 | Class 4 | 1650m | #5 | #1,#6,#8,#7,#12 | $100 | 12→3→1 | ❌ | ❌ | $817 | $0 | $-100 |
| R6 | Class 4 | 1200m | #8 | #3,#2,#1,#10,#5 | $100 | 8→4→3 | ✅ | ❌ | $338 | $0 | $-100 |
| R7 | Class 3 | 1800m | #10 | #1,#5,#6,#3,#7,#8 | $150 | 5→11→2 | ❌ | ❌ | $3474 | $0 | $-150 |
| R8 | Class 3 | 1200m | #1 | #8,#4,#12,#5,#10 | $100 | 8→12→5 | ❌ | ❌ | $166 | $0 | $-100 |
| R9 | Class 3 | 1200m | #1 | #4,#3,#6,#11,#5,#12,#2 | $210 | 11→1→4 | ✅ | ✅ | $265 | $265 | +$55 |
| **TOTAL** | | | | | **$1330** | | | **2/9** | | | **$685** | **$-645** |

---

## Race-by-Race Results — Strategy A

| Race | Mode | Banker | Legs | Stake | Result | Hit? | Trio $ | Return | P&L | Miss reason |
|------|------|--------|------|-------|--------|------|--------|--------|-----|-------------|
| R1 | PASS | #null |  | $0 | 2→1→10 | — | $555 | $0 | $0 | PASS |
| R2 | — | #5 | #4,#1,#7,#3,#2 | $100 | 1→7→6 | ❌ | $256 | $0 | $-100 | Pattern C: banker fail + pool gap (#6) |
| R3 | — | #5 | #2,#10,#3,#4,#7 | $100 | 8→11→5 | ❌ | $2281 | $0 | $-100 | Pattern B: pool gap (#8, #11) |
| R4 | — | #5 | #1,#2,#10,#4,#9 | $100 | 3→5→8 | ❌ | $420 | $0 | $-100 | Pattern B: pool gap (#3, #8) |
| R5 | — | #5 | #1,#6,#8,#2 | $60 | 12→3→1 | ❌ | $817 | $0 | $-60 | Pattern C: banker fail + pool gap (#12, #3) |
| R6 | — | #8 | #3,#2,#1,#10,#5 | $100 | 8→4→3 | ❌ | $338 | $0 | $-100 | Pattern B: pool gap (#4) |
| R7 | — | #10 | #1,#5,#6,#2 | $60 | 5→11→2 | ❌ | $3474 | $0 | $-60 | Pattern C: banker fail + pool gap (#11) |
| R8 | — | #1 | #8,#4,#6,#3 | $60 | 8→12→5 | ❌ | $166 | $0 | $-60 | Pattern C: banker fail + pool gap (#12, #5) |
| R9 | — | #1 | #4,#3,#6,#11,#5,#12 | $150 | 11→1→4 | ✅ | $265 | $265 | +$115 | — |

---

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| **A** | 2 | R1, R8 |
| **B** | 2 | R3, R6 |
| **C** | 3 | R2, R5, R7 |

---

## Full MC Place% Table — Per Race

### R1 — Class 5 1800m | Result: 2→1→10 | Trio $555

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 9 | SMILING EMPEROR | 14.2% | 37.3% | 22 | ✅ | Banker | 8 |
| L1 | 1 | KINGLY DEMEANOR | 11.5% | 33.2% | 2.5 | ✅ | Leg | **2** |
| L2 | 6 | LUCKY BLESSING | 11.1% | 31.6% | 26 | ✅ | Leg | 5 |
| L3 | 7 | PERFECT PAIRING | 11.1% | 30.8% | 7.8 | ✅ | Leg | 4 |
| L4 | 10 | DRAGON SUNRISE | 11% | 31.9% | 14 | ✅ | Leg | **3** |
| L5 | 2 | KYRUS TREASURE | 9.2% | 28.1% | 7.6 | ✅ | Leg | **1** |
| L6 | 3 | SPLENDID FORCE | 8.9% | 27.7% | 11 | ✅ | Leg | 11 |
| — | 4 | KOLACHI | 7.9% | 24.1% | 35 | ❌ | — | 10 |
| L7 | 8 | ALL ARE MINE | 5.8% | 20% | 8.7 | ✅ | Leg | 6 |
| — | 5 | SMART CITY | 5% | 17.9% | 12 | ❌ | — | 7 |
| — | 11 | GOLD TACK | 3.3% | 13.1% | 21 | ❌ | — | 9 |
| — | 12 | MR ALADDIN | 1.1% | 4.4% | 25 | ❌ | — | 12 |

**Pattern analysis:** Pattern A: banker fail (all 3 in legs). All three placers were in the leg pool but MC #1 banker missed the frame — classic Pattern A.

### R2 — Class 4 1650m | Result: 1→7→6 | Trio $256

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 5 | NOBLE PURSUIT | 33.5% | 67.2% | 4.4 | ✅ | Banker | 5 |
| L1 | 4 | VERY GRATEFUL | 18% | 49.2% | 10 | ✅ | Leg | — |
| L2 | 1 | LEGEND WINNER | 11.6% | 38.1% | 4.8 | ✅ | Leg | **1** |
| L3 | 7 | PRECISION HOPE | 10.6% | 35% | 4 | ✅ | Leg | **2** |
| L4 | 3 | SUPERB KID | 7.6% | 28.7% | 25 | ✅ | Leg | 7 |
| L5 | 2 | CHEAHA | 6.6% | 25.4% | 8.1 | ✅ | Leg | 6 |
| L6 | 11 | OUR LUCKY GLORY | 5.2% | 22.8% | 10 | ✅ | Leg | 10 |
| — | 6 | SURE JOYFUL | 4.2% | 18.1% | 20 | ❌ | — | **3** |
| — | 12 | TO INFINITY | 1.1% | 6.5% | 24 | ❌ | — | 9 |
| — | 8 | VIVA BOSS | 1% | 5.3% | 42 | ❌ | — | 4 |
| — | 10 | GOOD LUCK WIN | 0.6% | 3.7% | 16 | ❌ | — | 8 |

**Pattern analysis:** Pattern C: banker fail + pool gap (#6). Pool and/or banker failed vs result.

### R3 — Class 4 1200m | Result: 8→11→5 | Trio $2281

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 5 | KING OBERON | 23.1% | 53% | 12 | ✅ | Banker | **3** |
| L1 | 2 | AMAZING VICTORY | 22.6% | 54.2% | 11 | ✅ | Leg | 9 |
| L2 | 10 | SILVER SPURS | 15.4% | 42% | 4.9 | ✅ | Leg | 12 |
| L3 | 3 | BULLISH NOVA | 8.3% | 28.5% | 4.8 | ✅ | Leg | 4 |
| — | 4 | WORD OF KINDNESS | 7.8% | 25.9% | 14 | ❌ | — | 11 |
| L4 | 7 | HEROIC VANGUARD | 5.5% | 20.7% | 7.8 | ✅ | Leg | 8 |
| — | 6 | MEGA AWESOME | 4% | 15.7% | 22 | ❌ | — | 7 |
| L5 | 9 | JOLLY COMPANION | 4% | 17.2% | 9.6 | ✅ | Leg | 6 |
| — | 8 | HOLMES A COURT | 3.5% | 15.1% | 13 | ❌ | — | **1** |
| — | 1 | SUNNY DA BEST | 2.6% | 11.2% | 15 | ❌ | — | 10 |
| — | 12 | RISING ELITE | 1.8% | 9.2% | 11 | ❌ | — | 5 |
| — | 11 | GOLDEN FRIENDSHIP | 1.5% | 7.1% | 15 | ❌ | — | **2** |

**Pattern analysis:** Pattern B: pool gap (#8, #11). Pool and/or banker failed vs result.

### R4 — Class 4 1000m | Result: 3→5→8 | Trio $420

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|


**Pattern analysis:** —. **HIT** — banker in top 3 and full pool coverage.

### R5 — Class 4 1650m | Result: 12→3→1 | Trio $817

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 5 | DECISION LINK | 39% | 74.5% | 2.3 | ✅ | Banker | 4 |
| L1 | 1 | GENERAL REDWOOD | 18.9% | 54.6% | 9.6 | ✅ | Leg | **3** |
| L2 | 6 | THE AZURE | 18.2% | 54.3% | 14 | ✅ | Leg | 6 |
| L3 | 8 | FATAL BLOW | 9% | 34.5% | 9.5 | ✅ | Leg | 8 |
| — | 2 | YOUNG BRAVO | 5.5% | 25.2% | 23 | ❌ | — | 10 |
| L4 | 7 | ABSOLUTE AWAKENED | 2.5% | 13.8% | 7.8 | ✅ | Leg | 7 |
| — | 3 | STURDY RUBY | 2.1% | 11.9% | 11 | ❌ | — | **2** |
| — | 10 | RED BRICK WARRIOR | 1.9% | 11.6% | 17 | ❌ | — | 5 |
| L5 | 12 | VIVA FIRECRACKER | 1.9% | 11.5% | 8.1 | ✅ | Leg | **1** |
| — | 9 | CELESTIAL STRIDER | 0.5% | 3.7% | 64 | ❌ | — | 11 |
| — | 4 | FAST SPEED | 0.3% | 2.2% | 38 | ❌ | — | 9 |
| — | 11 | BLAZING BEAM | 0.2% | 2.3% | 55 | ❌ | — | 12 |

**Pattern analysis:** Pattern C: banker fail + pool gap (#3). Pool and/or banker failed vs result.

### R6 — Class 4 1200m | Result: 8→4→3 | Trio $338

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 8 | LIVE WIRE | 29.1% | 60.5% | 5.7 | ✅ | Banker | **1** |
| L1 | 3 | ELEGANT LIFE | 24.2% | 56.9% | 3.3 | ✅ | Leg | **3** |
| L2 | 2 | SUPERB KING | 13.5% | 41.1% | 3.7 | ✅ | Leg | 4 |
| L3 | 1 | VICTOR THE RAPID | 6.4% | 24.7% | 24 | ✅ | Leg | 10 |
| L4 | 10 | THUNDER PRINCE | 5.1% | 20.9% | 26 | ✅ | Leg | 6 |
| L5 | 5 | NEW POWER | 4.9% | 20.1% | 10 | ✅ | Leg | 5 |
| — | 11 | TACTICAL COMMAND | 4.3% | 17.8% | 22 | ❌ | — | 7 |
| — | 4 | GIANT LEAP | 3.5% | 15.5% | 15 | ❌ | — | **2** |
| — | 12 | STARRY SHOW | 2.8% | 12.4% | 39 | ❌ | — | 9 |
| — | 7 | FLYING TING LOK | 2.6% | 12.3% | 13 | ❌ | — | 12 |
| — | 9 | ORIGIN OF FORM | 2.5% | 11.6% | 32 | ❌ | — | 8 |
| — | 6 | ESCALIBOR | 1.1% | 6.2% | 17 | ❌ | — | 11 |

**Pattern analysis:** Pattern B: pool gap (#4). Pool and/or banker failed vs result.

### R7 — Class 3 1800m | Result: 5→11→2 | Trio $3474

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 10 | AUDACIOUS PURSUIT | 51.2% | 81.6% | 6.2 | ✅ | Banker | 7 |
| L1 | 1 | FALLON | 10.3% | 38.7% | 9.9 | ✅ | Leg | 8 |
| L2 | 5 | LE ZONDA | 8.9% | 34.6% | 16 | ✅ | Leg | **1** |
| L3 | 6 | FANTASTIC FUN | 7.8% | 32.2% | 23 | ✅ | Leg | 6 |
| — | 2 | GLITTERING LEGEND | 5.9% | 26% | 11 | ❌ | — | **3** |
| L4 | 3 | THE AUSPICIOUS | 4.7% | 21.9% | 4.8 | ✅ | Leg | 4 |
| — | 4 | A AMERIC TE SPECSO | 2.9% | 15.6% | 12 | ❌ | — | 10 |
| — | 11 | FORTUNATE SON | 2.8% | 15.1% | 16 | ❌ | — | **2** |
| L5 | 7 | SHAMUS STORM | 2.1% | 12.8% | 5.4 | ✅ | Leg | 5 |
| — | 9 | NOISY BOY | 1.7% | 9.7% | 14 | ❌ | — | 11 |
| L6 | 8 | SUPER UNICORN | 1.5% | 9.8% | 8.5 | ✅ | Leg | 9 |
| — | 12 | MISSION GIANT | 0.2% | 1.9% | 28 | ❌ | — | 12 |

**Pattern analysis:** Pattern C: banker fail + pool gap (#11, #2). Pool and/or banker failed vs result.

### R8 — Class 3 1200m | Result: 8→12→5 | Trio $166

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | AURIO | 41% | 78.9% | 13 | ✅ | Banker | 5 |
| L1 | 8 | TYCOON RESOURCES | 32.3% | 73.1% | 2.6 | ✅ | Leg | **1** |
| L2 | 4 | GREATER BAE | 8.9% | 38% | 22 | ✅ | Leg | 7 |
| — | 6 | GUMMY GUMMY | 4.3% | 23.8% | 12 | ❌ | — | 8 |
| — | 3 | CHATEAUNEUF | 3.6% | 19.2% | 17 | ❌ | — | 11 |
| L5 | 10 | FRIENDS OF SHAJING | 3.5% | 19.1% | 9.4 | ✅ | Leg | 4 |
| — | 2 | ALL OUT FOR SIX | 2.4% | 15.9% | 19 | ❌ | — | 6 |
| — | 7 | SHANGHAI WARRIOR | 1.2% | 9.2% | 20 | ❌ | — | 10 |
| L3 | 12 | REFUSETOBEENGLISH | 1.2% | 8.9% | 7.2 | ✅ | Leg | **2** |
| — | 11 | SPICY GOLD | 0.6% | 5.1% | 18 | ❌ | — | 12 |
| — | 9 | TELECOM FIGHTERS | 0.6% | 4.9% | 29 | ❌ | — | 9 |
| L4 | 5 | SZERYNG | 0.5% | 4.1% | 7.4 | ✅ | Leg | **3** |

**Pattern analysis:** Pattern A: banker fail (all 3 in legs). All three placers were in the leg pool but MC #1 banker missed the frame — classic Pattern A.

### R9 — Class 3 1200m | Result: 11→1→4 | Trio $265

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | FLYING WROTE | 22.6% | 53.6% | 5.8 | ✅ | Banker | **2** |
| L1 | 4 | MOTOR | 15.1% | 42.3% | 12 | ✅ | Leg | **3** |
| L2 | 3 | NORTHERN FIRE BALL | 15.1% | 42.4% | 18 | ✅ | Leg | 6 |
| L3 | 6 | STORMING DRAGON | 11.1% | 35.1% | 5.5 | ✅ | Leg | 4 |
| L4 | 11 | TARGET AUDIENCE | 10.9% | 34.4% | 3.9 | ✅ | Leg | **1** |
| L5 | 5 | EVER LUCK | 9.5% | 32.1% | 10 | ✅ | Leg | 9 |
| L6 | 12 | ARGENTO OCEAN | 9.2% | 30.6% | 8.1 | ✅ | Leg | 5 |
| L7 | 2 | LIFELINE EXPRESS | 4.5% | 17.3% | 8.7 | ✅ | Leg | 7 |
| — | 9 | KANSAS | 1% | 6% | 33 | ❌ | — | 11 |
| — | 8 | SUGAR GOODSON | 0.8% | 4.3% | 23 | ❌ | — | 8 |
| — | 7 | DASHING BASICS | 0.2% | 1.3% | 22 | ❌ | — | 12 |
| — | 10 | VIGOR HAPPINESS | 0% | 0.4% | 38 | ❌ | — | 10 |

**Pattern analysis:** —. **HIT** — banker in top 3 and full pool coverage.


---

## B Banker Performance

| Race | B Banker | MC Win% | SP | Placed? | Finish |
|------|----------|---------|-----|---------|--------|
| R1 | #9 | 14.2% | 22 | ❌ | 8 |
| R2 | #5 | 33.5% | 4.4 | ❌ | 5 |
| R3 | #5 | 23.1% | 12 | ✅ | 3 |
| R4 | #5 | —% | — | ✅ | 2 |
| R5 | #5 | 39% | 2.3 | ❌ | 4 |
| R6 | #8 | 29.1% | 5.7 | ✅ | 1 |
| R7 | #10 | 51.2% | 6.2 | ❌ | 7 |
| R8 | #1 | 41% | 13 | ❌ | 5 |
| R9 | #1 | 22.6% | 5.8 | ✅ | 2 |

**Banker top 3:** 4/9
