# Strategy B Review — MC #1 banker + Place%>20% | Sha Tin | 13 Jun 2026

## Rules

- **Banker**: MC **#1** by MC Win% (raw).
- **Primary legs**: MC Place% > 20%; Step B swap/add for Win <10.
- **Bet**: Trio 膽拖; **$10**/combo.
- **Reports:** `data/reports/trio_strategy_20260613_ST_R1.md` … **R11`
- **Results:** `data/historical/results_20260613_ST.json`

---

## Summary

| Metric | Strategy B (report) | Strategy A (8 staked) |
|--------|---------------------|------------------------|
| Races | **11** | **11** |
| Hit rate | **4/11 (36.4%)** | **1/11 (9.1%)** |
| Staked | **$1300** | **$820** |
| Returned | **$1266** | **$407** |
| **Net P&L** | **$-34** | **$-413** |
| **ROI** | **-2.6%** | **-50.4%** |

---

## Race-by-Race Results — Strategy B

| Race | Class | Dist | Banker (MC#1) | Final legs | Stake | Result | Banker top 3? | Hit? | Trio $ | Return | P&L |
|------|-------|------|---------------|------------|-------|--------|---------------|------|--------|--------|-----|
| R1 | Griffin | 1000m | #1 | #5,#4,#7,#2,#3,#6 | $150 | 6→1→7 | ✅ | ✅ | $39 | $39 | $-111 |
| R2 | Class 5 | 1200m | #4 | #12,#8,#10,#3,#7 | $100 | 8→4→12 | ✅ | ✅ | $407 | $407 | +$307 |
| R3 | Class 4 | 1400m | #5 | #9,#11,#4,#13,#12,#1 | $150 | 12→4→5 | ✅ | ✅ | $759 | $759 | +$609 |
| R4 | Class 4 | 1800m | #5 | #1,#9,#6,#2,#14,#12 | $150 | 3→12→2 | ❌ | ❌ | $3087 | $0 | $-150 |
| R5 | Class 4 | 1200m | #1 | #5,#3,#7,#2,#8 | $100 | 7→2→3 | ❌ | ❌ | $460 | $0 | $-100 |
| R6 | Class 4 | 1400m | #6 | #3,#9,#1,#7,#11 | $100 | 1→11→9 | ❌ | ❌ | $164 | $0 | $-100 |
| R7 | Class 4 | 1200m | #3 | #1,#5,#4,#2,#6 | $100 | 3→6→1 | ✅ | ✅ | $61 | $61 | $-39 |
| R8 | Class 2 | 1600m | #2 | #3,#5,#4,#8,#1,#6 | $150 | 2→7→1 | ✅ | ❌ | $1081 | $0 | $-150 |
| R9 | Class 3 | 1200m | #2 | #1,#4,#11,#3,#10 | $100 | 10→3→9 | ❌ | ❌ | $3274 | $0 | $-100 |
| R10 | Class 3 | 1600m | #2 | #8,#4,#3,#1,#14 | $100 | 2→8→11 | ✅ | ❌ | $245 | $0 | $-100 |
| R11 | Class 3 | 1400m | #3 | #7,#14,#13,#12,#9 | $100 | 12→3→4 | ✅ | ❌ | $275 | $0 | $-100 |
| **TOTAL** | | | | | **$1300** | | | **4/11** | | | **$1266** | **$-34** |

---

## Race-by-Race Results — Strategy A

| Race | Mode | Banker | Legs | Stake | Result | Hit? | Trio $ | Return | P&L | Miss reason |
|------|------|--------|------|-------|--------|------|--------|--------|-----|-------------|
| R1 | — | #5 | #1,#4,#7,#6 | $60 | 6→1→7 | ❌ | $39 | $0 | $-60 | Pattern A: banker fail (all 3 in legs) |
| R2 | A (expanded) | #4 | #12,#8,#10,#3,#9 | $100 | 8→4→12 | ✅ | $407 | $407 | +$307 | — |
| R3 | A | #5 | #9,#11,#4,#13 | $60 | 12→4→5 | ❌ | $759 | $0 | $-60 | Pattern B: pool gap (#12) |
| R4 | B | #5 | #9,#1,#6,#2,#14 | $100 | 3→12→2 | ❌ | $3087 | $0 | $-100 | Pattern C: banker fail + pool gap (#3, #12) |
| R5 | B | #1 | #5,#3,#7,#2,#8 | $100 | 7→2→3 | ❌ | $460 | $0 | $-100 | Pattern A: banker fail (all 3 in legs) |
| R6 | B | #6 | #3,#9,#1,#7,#11 | $100 | 1→11→9 | ❌ | $164 | $0 | $-100 | Pattern A: banker fail (all 3 in legs) |
| R7 | A | #null | #5,#4,#2 | $30 | 3→6→1 | ❌ | $61 | $0 | $-30 | Pattern C: banker fail + pool gap (#3, #6, #1) |
| R8 | A (expanded) | #2 | #3,#5,#4,#8,#7 | $100 | 2→7→1 | ❌ | $1081 | $0 | $-100 | Pattern B: pool gap (#1) |
| R9 | B | #null | #4,#11,#6,#3 | $40 | 10→3→9 | ❌ | $3274 | $0 | $-40 | Pattern C: banker fail + pool gap (#10, #9) |
| R10 | A | #null | #4,#3,#9 | $30 | 2→8→11 | ❌ | $245 | $0 | $-30 | Pattern C: banker fail + pool gap (#2, #8, #11) |
| R11 | B | #3 | #7,#14,#13,#12,#9 | $100 | 12→3→4 | ❌ | $275 | $0 | $-100 | Pattern B: pool gap (#4) |

---

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| **A** | 2 | R5, R6 |
| **B** | 3 | R8, R10, R11 |
| **C** | 2 | R4, R9 |

---

## Full MC Place% Table — Per Race

### R1 — Griffin 1000m | Result: 6→1→7 | Trio $39

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | CHANCHENG SPARKLE | 37.4% | 76.5% | 7.3 | ✅ | Banker | **2** |
| L1 | 5 | SHOW ME YOUR LOVE | 20.1% | 57.8% | 26 | ✅ | Leg | 4 |
| L2 | 4 | SHARP PLANET | 19.8% | 58.3% | 9.1 | ✅ | Leg | 6 |
| L3 | 7 | QUANTUM WUKONG | 8.7% | 37.8% | 4.4 | ✅ | Leg | **3** |
| L4 | 2 | DRAGON GENERATION | 5% | 24.5% | 14 | ✅ | Leg | 5 |
| L5 | 3 | KYOTO SPRING | 5% | 24.7% | 18 | ✅ | Leg | 7 |
| L6 | 6 | JEDI SPURS | 4.2% | 20.4% | 1.7 | ✅ | Leg | **1** |

**Pattern analysis:** —. **HIT** — banker in top 3 and full pool coverage.

### R2 — Class 5 1200m | Result: 8→4→12 | Trio $407

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 4 | ALWAYS FLUKE | 34% | 70.5% | 5.8 | ✅ | Banker | **2** |
| L1 | 12 | VERBIER | 21.1% | 57.8% | 11 | ✅ | Leg | **3** |
| L2 | 8 | COUNTRY DANCER | 18% | 51.3% | 7.5 | ✅ | Leg | **1** |
| L3 | 10 | VON BAER | 9.8% | 36.9% | 8.9 | ✅ | Leg | 10 |
| — | 9 | VIVA CHALEUR | 6% | 26.4% | 11 | ❌ | — | 5 |
| L4 | 3 | ROBOT KNIGHT | 5.9% | 27.1% | 5.8 | ✅ | Leg | 8 |
| — | 11 | HANDSOME BLOND | 3.2% | 16.7% | 33 | ❌ | — | 9 |
| L5 | 7 | THE ALL ROUNDER | 1.7% | 9.5% | 7.3 | ✅ | Leg | 4 |
| — | 5 | CIRRUS SPEED | 0.2% | 2.1% | 11 | ❌ | — | — |
| — | 6 | CRAZY TREASURE | 0.2% | 1.7% | 11 | ❌ | — | 6 |
| — | 2 | MONEY TYCOON | 0% | 0.1% | 28 | ❌ | — | 11 |
| — | 1 | AQUAMAN | 0% | 0.1% | 13 | ❌ | — | 7 |

**Pattern analysis:** —. **HIT** — banker in top 3 and full pool coverage.

### R3 — Class 4 1400m | Result: 12→4→5 | Trio $759

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 5 | CALL ME SPARKLE | 37.2% | 72% | 16 | ✅ | Banker | **3** |
| L1 | 9 | FRANCIS MEYNELL | 18.2% | 53.5% | 3.5 | ✅ | Leg | 6 |
| L2 | 11 | MIGHTY FIGHTER | 12.9% | 44.1% | 6.6 | ✅ | Leg | 8 |
| L3 | 4 | SKY DEEP | 12.6% | 42.7% | 12 | ✅ | Leg | **2** |
| L4 | 13 | LET'S HAVE FUN | 8.8% | 33.7% | 9.6 | ✅ | Leg | 9 |
| L5 | 12 | PRESTIGE HALL | 4.2% | 20.9% | 8.2 | ✅ | Leg | **1** |
| — | 6 | ETERNAL RICHNESS | 3% | 14% | 54 | ❌ | — | 14 |
| — | 7 | CHIU CHOW GOLF | 2.3% | 12.1% | 44 | ❌ | — | 11 |
| — | 10 | MASSIVE REWARD | 0.5% | 3.4% | 42 | ❌ | — | 4 |
| — | 8 | SPICY BONUS | 0.1% | 1.3% | 27 | ❌ | — | 13 |
| L6 | 1 | FLASH CURRENT | 0.1% | 1.4% | 4.9 | ✅ | Leg | 12 |
| — | 2 | KING OF FIGHTERS | 0.1% | 0.6% | 20 | ❌ | — | 5 |
| — | 3 | LADY'S LOVE | 0% | 0.3% | 26 | ❌ | — | 10 |
| — | 14 | DERRYNBLUE | 0% | 0.1% | 45 | ❌ | — | 7 |

**Pattern analysis:** —. **HIT** — banker in top 3 and full pool coverage.

### R4 — Class 4 1800m | Result: 3→12→2 | Trio $3087

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 5 | SERANGOON | 21.1% | 50.7% | 24 | ✅ | Banker | 10 |
| L1 | 1 | CHARITY TOGETHER | 17.1% | 45% | 38 | ✅ | Leg | 13 |
| L2 | 9 | AMAZING GAZE | 16.4% | 45.2% | 10 | ✅ | Leg | 6 |
| L3 | 6 | ABSOLUTE HONOUR | 13.8% | 39.3% | 5.5 | ✅ | Leg | 4 |
| L4 | 2 | ENTHRALLED | 9.5% | 31.4% | 3.6 | ✅ | Leg | **3** |
| L5 | 14 | ON THE LASH | 9% | 30.9% | 13 | ✅ | Leg | 9 |
| — | 10 | PRESTIGE RICKY | 3.7% | 15.8% | 10 | ❌ | — | 7 |
| — | 7 | AUTOMATED | 3.5% | 14.5% | 68 | ❌ | — | 5 |
| — | 3 | FOREVER FOLKS | 2.5% | 11.4% | 20 | ❌ | — | **1** |
| — | 8 | BRIGHT INHERITANCE | 1.7% | 7.4% | 19 | ❌ | — | 12 |
| L6 | 12 | SMART FAT CAT | 1.2% | 5.7% | 5.1 | ✅ | Leg | **2** |
| — | 11 | ROMANTIC FANTASY | 0.2% | 1.5% | 22 | ❌ | — | 8 |
| — | 4 | FLUORESCENCE | 0.1% | 1% | 34 | ❌ | — | 11 |
| — | 13 | SHARPEN BRIGHT | 0% | 0.2% | 27 | ❌ | — | 14 |

**Pattern analysis:** Pattern C: banker fail + pool gap (#3). Pool and/or banker failed vs result.

### R5 — Class 4 1200m | Result: 7→2→3 | Trio $460

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | JUICY DRAGON | 27.5% | 66% | 9.8 | ✅ | Banker | 4 |
| L1 | 5 | ONE MAN SHOW | 23% | 59.7% | 3.8 | ✅ | Leg | 11 |
| L2 | 3 | HAPPY SHOOTER | 19.6% | 55% | 4.6 | ✅ | Leg | **3** |
| L3 | 7 | MEGA CAPTAIN | 16.9% | 50.3% | 6.7 | ✅ | Leg | **1** |
| L4 | 2 | PEJIBAYE | 4.8% | 22% | 7.8 | ✅ | Leg | **2** |
| L5 | 8 | DAY DAY VICTORY | 3.8% | 19.3% | 7 | ✅ | Leg | 10 |
| — | 6 | CALIFORNIA BAY | 2.9% | 15.4% | 17 | ❌ | — | 5 |
| — | 9 | CAP LINER | 1.1% | 8.4% | 20 | ❌ | — | 9 |
| — | 10 | SUPER RUBICK KID | 0.2% | 2% | 47 | ❌ | — | 7 |
| — | 11 | TOPSPIN KING | 0.1% | 1.4% | 41 | ❌ | — | 12 |
| — | 12 | FASHION LEGEND | 0% | 0.4% | 32 | ❌ | — | 6 |
| — | 4 | LUCKY DOCTOR | 0% | 0.1% | 37 | ❌ | — | 8 |

**Pattern analysis:** Pattern A: banker fail (all 3 in legs). All three placers were in the leg pool but MC #1 banker missed the frame — classic Pattern A.

### R6 — Class 4 1400m | Result: 1→11→9 | Trio $164

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 6 | ROMANTIC LAOS | 25.7% | 59.8% | 26 | ✅ | Banker | 7 |
| L1 | 3 | SUNDAY'S SERENADE | 18.4% | 48.9% | 19 | ✅ | Leg | 8 |
| L2 | 9 | VOYAGE BOSS | 18.3% | 49.1% | 8.4 | ✅ | Leg | **3** |
| L3 | 1 | MEANINGFUL DRAGON | 17.5% | 49.4% | 10 | ✅ | Leg | **1** |
| L4 | 7 | POLAR PATCH | 5.2% | 21.8% | 8.7 | ✅ | Leg | 4 |
| L5 | 11 | GORGEOUS VICTORY | 4% | 18.1% | 2.8 | ✅ | Leg | **2** |
| — | 4 | AKERMANIS GOLD | 3.4% | 15.8% | 20 | ❌ | — | 9 |
| — | 10 | AMO ERGO SUM | 3% | 14% | 58 | ❌ | — | 6 |
| — | 8 | PRESTIGE SUPERIOR | 2.9% | 12.5% | 50 | ❌ | — | 13 |
| — | 12 | SYNERGY EXPRESS | 0.6% | 3.2% | 31 | ❌ | — | 12 |
| — | 5 | CORNERSTONE | 0.5% | 3.6% | 60 | ❌ | — | 10 |
| — | 14 | SMILING FALCON | 0.5% | 2.9% | 17 | ❌ | — | — |
| — | 13 | PERIDOT | 0.1% | 0.8% | 10 | ❌ | — | 11 |
| — | 2 | GHORGAN | 0% | 0.2% | 6.1 | ❌ | — | 5 |

**Pattern analysis:** Pattern A: banker fail (all 3 in legs). All three placers were in the leg pool but MC #1 banker missed the frame — classic Pattern A.

### R7 — Class 4 1200m | Result: 3→6→1 | Trio $61

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 3 | SUPERB SPIRIT | 38.3% | 78.3% | 2.7 | ✅ | Banker | **1** |
| L1 | 1 | ISLAND BUDDY | 24.3% | 65.1% | 9.1 | ✅ | Leg | **3** |
| L2 | 5 | SIGHT DREAMER | 16.5% | 55.8% | 8.3 | ✅ | Leg | 9 |
| L3 | 4 | MABUBU | 11.5% | 45% | 22 | ✅ | Leg | 8 |
| L4 | 2 | REAL GENTLEMAN | 7% | 31.7% | 15 | ✅ | Leg | 12 |
| L5 | 6 | LUCRATIVE EIGHT | 1.7% | 14.7% | 4.4 | ✅ | Leg | **2** |
| — | 7 | INCREDIBLE MOMENT | 0.3% | 3.3% | 17 | ❌ | — | 6 |
| — | 11 | ABSOLUTE LUCKY | 0.1% | 1.8% | 22 | ❌ | — | 11 |
| — | 12 | LIGHTNING ACE | 0.1% | 1.5% | 29 | ❌ | — | 4 |
| — | 8 | LEAN FLYER | 0.1% | 1.1% | 14 | ❌ | — | 10 |
| — | 9 | STAR OF HEARTS | 0.1% | 0.7% | 40 | ❌ | — | 5 |
| — | 10 | FORTUNE SUPERNOVA | 0% | 1% | 21 | ❌ | — | 7 |

**Pattern analysis:** —. **HIT** — banker in top 3 and full pool coverage.

### R8 — Class 2 1600m | Result: 2→7→1 | Trio $1081

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | SOLEIL FIGHTER | 56.8% | 88.6% | 11 | ✅ | Banker | **1** |
| L1 | 3 | PACKING ANGEL | 16.3% | 58.4% | 4.1 | ✅ | Leg | 6 |
| L2 | 5 | MAX QUE | 10.5% | 47.7% | 7.9 | ✅ | Leg | 4 |
| L3 | 4 | STUNNING PEACH | 7.1% | 37.8% | 14 | ✅ | Leg | 5 |
| L4 | 8 | MIGHTY MASTS | 4.3% | 28.8% | 4.8 | ✅ | Leg | 8 |
| — | 7 | BEAUTY ALLIANCE | 3.6% | 24.2% | 12 | ❌ | — | **2** |
| L5 | 1 | SAGACIOUS LIFE | 0.8% | 8.3% | 5.4 | ✅ | Leg | **3** |
| L6 | 6 | INFINITE RESOLVE | 0.5% | 5.5% | 5.6 | ✅ | Leg | 9 |
| — | 10 | POCKETING | 0.1% | 0.6% | 25 | ❌ | — | 7 |

**Pattern analysis:** Pattern B: pool gap (#7). Pool and/or banker failed vs result.

### R9 — Class 3 1200m | Result: 10→3→9 | Trio $3274

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | BLAZING WIND | 32.7% | 69.3% | 6.7 | ✅ | Banker | 4 |
| L1 | 1 | VICTORY SKY | 27.6% | 65.3% | 5 | ✅ | Leg | 5 |
| L2 | 4 | AURORA PATCH | 13.8% | 44.9% | 8 | ✅ | Leg | 7 |
| L3 | 11 | NOTTHESILLYONE | 9.1% | 34.6% | 8 | ✅ | Leg | 9 |
| — | 6 | MIGHTY COMMANDER | 5.3% | 24.5% | 15 | ❌ | — | 6 |
| — | 5 | LUCKY PLANET | 3.9% | 18.6% | 22 | ❌ | — | 12 |
| L4 | 3 | TURQUOISE VELOCITY | 3.5% | 17.9% | 6.6 | ✅ | Leg | **2** |
| — | 8 | MR ENERGIA | 2.6% | 14% | 16 | ❌ | — | 10 |
| — | 12 | VULCANUS | 1.1% | 7% | 26 | ❌ | — | 8 |
| L5 | 10 | PI LEGEND | 0.4% | 3% | 8 | ✅ | Leg | **1** |
| — | 7 | GRAND EAGLE | 0.1% | 0.3% | 10 | ❌ | — | 11 |
| — | 9 | MUST GO | 0.1% | 0.6% | 16 | ❌ | — | **3** |

**Pattern analysis:** Pattern C: banker fail + pool gap (#9). Pool and/or banker failed vs result.

### R10 — Class 3 1600m | Result: 2→8→11 | Trio $245

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | ENDUED | 36.4% | 75.5% | 6.3 | ✅ | Banker | **1** |
| L1 | 8 | BIG RETURN | 32.5% | 73% | 9 | ✅ | Leg | **2** |
| L2 | 4 | POWER OF VITAM | 12.9% | 47.1% | 5.8 | ✅ | Leg | 4 |
| L3 | 3 | POPE CODY | 5.9% | 27.8% | 8.2 | ✅ | Leg | 6 |
| L4 | 1 | STEPS AHEAD | 3.5% | 18.3% | 8.3 | ✅ | Leg | — |
| — | 9 | QUANTUM LEGEND | 3% | 17.5% | 17 | ❌ | — | 8 |
| — | 6 | DREAMING TOGETHER | 2.4% | 14.5% | 27 | ❌ | — | 11 |
| L5 | 14 | WITHALLMYFAITH | 2.1% | 14.5% | 8.9 | ✅ | Leg | 5 |
| — | 12 | JUMBO STEPS | 0.6% | 5.1% | 15 | ❌ | — | 7 |
| — | 11 | COMPLETE UNKNOWN | 0.3% | 3% | 12 | ❌ | — | **3** |
| — | 5 | MORGAN SUCCESS | 0.3% | 2.9% | 31 | ❌ | — | 13 |
| — | 10 | TRINITY TREASURE | 0% | 0.4% | 11 | ❌ | — | 10 |
| — | 7 | GOLDFIELD | 0% | 0.1% | 50 | ❌ | — | 12 |
| — | 13 | SO YOU WILL | 0% | 0.1% | 24 | ❌ | — | 9 |

**Pattern analysis:** Pattern B: pool gap (#11). Pool and/or banker failed vs result.

### R11 — Class 3 1400m | Result: 12→3→4 | Trio $275

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 3 | SUPER EXPRESS | 26.4% | 62.2% | 3.1 | ✅ | Banker | **2** |
| L1 | 7 | AEROVOLANIC | 22.7% | 58.1% | 6.6 | ✅ | Leg | 5 |
| L2 | 14 | CONRAD PATCH | 19.2% | 51.8% | 19 | ✅ | Leg | 7 |
| L3 | 13 | HAPPY BOSS | 16% | 47.1% | 19 | ✅ | Leg | 6 |
| L4 | 12 | BABY SAKURA | 5.1% | 23.6% | 5.8 | ✅ | Leg | **1** |
| L5 | 9 | PERFECTDAY | 4.5% | 20.1% | 10 | ✅ | Leg | 8 |
| — | 8 | LOVERO | 2.8% | 14.6% | 22 | ❌ | — | 4 |
| — | 11 | MEGASTAR HEART | 1.8% | 10.2% | 22 | ❌ | — | 10 |
| — | 5 | BEAUTY CRESCENT | 0.4% | 3.4% | 36 | ❌ | — | 14 |
| — | 10 | YUEN LONG ELITE | 0.4% | 3% | 23 | ❌ | — | 9 |
| — | 1 | DRAGON AIR FORCE | 0.3% | 2.5% | 29 | ❌ | — | 12 |
| — | 4 | THE RED HARE | 0.3% | 2.7% | 12 | ❌ | — | **3** |
| — | 6 | PASS LINE | 0.1% | 0.6% | 24 | ❌ | — | 11 |
| — | 2 | AKASHVANI | 0% | 0.1% | 17 | ❌ | — | 13 |

**Pattern analysis:** Pattern B: pool gap (#4). Pool and/or banker failed vs result.


---

## B Banker Performance

| Race | B Banker | MC Win% | SP | Placed? | Finish |
|------|----------|---------|-----|---------|--------|
| R1 | #1 | 37.4% | 7.3 | ✅ | 2 |
| R2 | #4 | 34% | 5.8 | ✅ | 2 |
| R3 | #5 | 37.2% | 16 | ✅ | 3 |
| R4 | #5 | 21.1% | 24 | ❌ | 10 |
| R5 | #1 | 27.5% | 9.8 | ❌ | 4 |
| R6 | #6 | 25.7% | 26 | ❌ | 7 |
| R7 | #3 | 38.3% | 2.7 | ✅ | 1 |
| R8 | #2 | 56.8% | 11 | ✅ | 1 |
| R9 | #2 | 32.7% | 6.7 | ❌ | 4 |
| R10 | #2 | 36.4% | 6.3 | ✅ | 1 |
| R11 | #3 | 26.4% | 3.1 | ✅ | 2 |

**Banker top 3:** 7/11
