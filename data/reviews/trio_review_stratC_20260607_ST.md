# Strategy B Review — MC #1 banker + Place%>20% | Sha Tin | 07 Jun 2026

## Rules

- **Banker**: MC **#1** by MC Win% (raw).
- **Primary legs**: MC Place% > 20%; Step B swap/add for Win <10.
- **Bet**: Trio 膽拖; **$10**/combo.
- **Reports:** `data/reports/trio_strategy_20260607_ST_R1.md` … **R11`
- **Results:** `data/historical/results_20260607_ST.json`

---

## Summary

| Metric | Strategy B (report) | Strategy A (8 staked) |
|--------|---------------------|------------------------|
| Races | **11** | **11** |
| Hit rate | **3/11 (27.3%)** | **1/11 (9.1%)** |
| Staked | **$1400** | **$870** |
| Returned | **$1854** | **$161** |
| **Net P&L** | **+$454** | **$-709** |
| **ROI** | **32.4%** | **-81.5%** |

---

## Race-by-Race Results — Strategy B

| Race | Class | Dist | Banker (MC#1) | Final legs | Stake | Result | Banker top 3? | Hit? | Trio $ | Return | P&L |
|------|-------|------|---------------|------------|-------|--------|---------------|------|--------|--------|-----|
| R1 | Class 5 | 1800m | #3 | #4,#6,#10,#1 | $60 | 1→3→8 | ✅ | ❌ | $1258 | $0 | $-60 |
| R2 | Class 5 | 1400m | #1 | #4,#5,#7,#6,#8 | $100 | 10→1→8 | ✅ | ❌ | $626 | $0 | $-100 |
| R3 | Class 4 | 1200m | #2 | #1,#8,#4 | $30 | 2→8→4 | ✅ | ✅ | $161 | $161 | +$131 |
| R4 | Class 4 | 1400m | #6 | #2,#3,#7,#8,#14 | $100 | 14→6→7 | ✅ | ✅ | $555 | $555 | +$455 |
| R5 | Class 4 | 1800m | #5 | #4,#3,#2,#10,#11,#9 | $150 | 14→1→3 | ❌ | ❌ | $9563 | $0 | $-150 |
| R6 | Class 4 | 1600m | #2 | #4,#6,#10,#1,#7,#5,#9 | $210 | 7→10→5 | ❌ | ❌ | $687 | $0 | $-210 |
| R7 | Class 4 | 1200m | #5 | #10,#9,#4,#1,#6,#3 | $150 | 8→5→10 | ✅ | ❌ | $413 | $0 | $-150 |
| R8 | Class 3 | 1000m | #2 | #1,#5,#3,#7,#12,#14 | $150 | 2→12→7 | ✅ | ✅ | $1138 | $1138 | +$988 |
| R9 | Class 3 | 1200m | #1 | #5,#6,#2,#4,#3,#11 | $150 | 5→6→2 | ❌ | ❌ | $394 | $0 | $-150 |
| R10 | Class 2 | 1200m | #1 | #2,#9,#3,#8,#6,#12 | $150 | 8→5→9 | ❌ | ❌ | $913 | $0 | $-150 |
| R11 | Class 3 | 1400m | #3 | #2,#6,#5,#8,#7,#4 | $150 | 7→5→8 | ❌ | ❌ | $2293 | $0 | $-150 |
| **TOTAL** | | | | | **$1400** | | | **3/11** | | | **$1854** | **+$454** |

---

## Race-by-Race Results — Strategy A

| Race | Mode | Banker | Legs | Stake | Result | Hit? | Trio $ | Return | P&L | Miss reason |
|------|------|--------|------|-------|--------|------|--------|--------|-----|-------------|
| R1 | — | #3 | #4,#6,#10,#8 | $60 | 1→3→8 | ❌ | $1258 | $0 | $-60 | Pattern B: pool gap (#1) |
| R2 | — | #1 | #4,#5,#7,#6 | $60 | 10→1→8 | ❌ | $626 | $0 | $-60 | Pattern B: pool gap (#10, #8) |
| R3 | — | #2 | #1,#8,#4,#3 | $60 | 2→8→4 | ✅ | $161 | $161 | +$101 | — |
| R4 | — | #6 | #2,#3,#7,#1 | $60 | 14→6→7 | ❌ | $555 | $0 | $-60 | Pattern B: pool gap (#14) |
| R5 | — | #5 | #4,#3,#2,#6,#1 | $100 | 14→1→3 | ❌ | $9563 | $0 | $-100 | Pattern C: banker fail + pool gap (#14) |
| R6 | — | #2 | #4,#6,#10,#1 | $60 | 7→10→5 | ❌ | $687 | $0 | $-60 | Pattern C: banker fail + pool gap (#7, #5) |
| R7 | — | #5 | #10,#9,#4,#1,#6,#7 | $150 | 8→5→10 | ❌ | $413 | $0 | $-150 | Pattern B: pool gap (#8) |
| R8 | — | #2 | #1,#5,#3,#7 | $60 | 2→12→7 | ❌ | $1138 | $0 | $-60 | Pattern B: pool gap (#12) |
| R9 | — | #1 | #5,#6,#2,#4,#3 | $100 | 5→6→2 | ❌ | $394 | $0 | $-100 | Pattern A: banker fail (all 3 in legs) |
| R10 | — | #1 | #2,#3,#9,#8 | $60 | 8→5→9 | ❌ | $913 | $0 | $-60 | Pattern C: banker fail + pool gap (#5) |
| R11 | — | #3 | #2,#6,#5,#8,#7 | $100 | 7→5→8 | ❌ | $2293 | $0 | $-100 | Pattern A: banker fail (all 3 in legs) |

---

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| **A** | 3 | R6, R9, R11 |
| **B** | 3 | R1, R2, R7 |
| **C** | 2 | R5, R10 |

---

## Full MC Place% Table — Per Race

### R1 — Class 5 1800m | Result: 1→3→8 | Trio $1258

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 3 | HAILTOTHEVICTORS | 35.2% | 80.3% | 5.2 | ✅ | Banker | **2** |
| L1 | 4 | MEEPMEEP | 30% | 76.4% | 6.9 | ✅ | Leg | 6 |
| L2 | 6 | CELESTIAL HARMONY | 25% | 72.1% | 18 | ✅ | Leg | 7 |
| L3 | 10 | GENERAL SMART | 4.8% | 28% | 8.9 | ✅ | Leg | 8 |
| — | 8 | GOLDEN FORTUNE | 2% | 14.8% | 41 | ❌ | — | **2** |
| L4 | 1 | FIREFOOT | 1.5% | 13.3% | 3.3 | ✅ | Leg | **1** |
| — | 11 | SUPER HONG KONG | 1.1% | 9.2% | 14 | ❌ | — | 9 |
| — | 2 | I EXCELLE | 0.2% | 2.6% | 25 | ❌ | — | 4 |
| — | 5 | FORTUNE KINGO | 0.2% | 2.1% | 21 | ❌ | — | 10 |
| — | 12 | HAPPYDEARHAPPYDEER | 0% | 0.6% | 10 | ❌ | — | 5 |
| — | 7 | SPECIAL HEDGE | 0% | 0.1% | 17 | ❌ | — | 11 |
| — | 9 | VIVA TASTE | 0% | 0.4% | 11 | ❌ | — | 12 |

**Pattern analysis:** Pattern B: pool gap (#8). Pool and/or banker failed vs result.

### R2 — Class 5 1400m | Result: 10→1→8 | Trio $626

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | WINNING MACHINE | 47.2% | 79.1% | 3.1 | ✅ | Banker | **2** |
| L1 | 4 | RATTAN GALAXY | 12.3% | 42.3% | 42 | ✅ | Leg | 6 |
| L2 | 5 | CARRYON SMILING | 11.3% | 37.5% | 6.8 | ✅ | Leg | 12 |
| L3 | 7 | SUPERB GUY | 7.7% | 32.5% | 13 | ✅ | Leg | 4 |
| L4 | 6 | MAZING GRACE | 6% | 25.4% | 6.2 | ✅ | Leg | 14 |
| — | 2 | HAPPY ACTION | 5.3% | 24.1% | 21 | ❌ | — | 9 |
| L5 | 8 | DOUBLE BINGO | 3.2% | 16.8% | 5.1 | ✅ | Leg | **3** |
| — | 11 | WINDICATOR FAMILY | 2.6% | 14.4% | 23 | ❌ | — | 7 |
| — | 9 | NOBLE FANS | 1.8% | 10.5% | 24 | ❌ | — | 8 |
| — | 3 | FIGHT TIME | 1.5% | 8% | 19 | ❌ | — | 11 |
| — | 10 | TOP TO SKY | 0.7% | 6.5% | 31 | ❌ | — | **1** |
| — | 14 | SUPREME WINNER | 0.2% | 1.4% | 23 | ❌ | — | 10 |
| — | 13 | SPEEDY TRIDENT | 0.1% | 1.1% | 46 | ❌ | — | 5 |
| — | 12 | MULTIDUTCH | 0% | 0.2% | 52 | ❌ | — | 13 |

**Pattern analysis:** Pattern B: pool gap (#10). Pool and/or banker failed vs result.

### R3 — Class 4 1200m | Result: 2→8→4 | Trio $161

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | MASTER PAYMENT | 49% | 92.5% | 2.9 | ✅ | Banker | **1** |
| L1 | 1 | SKY DEEP | 41.3% | 90.1% | 6.5 | ✅ | Leg | 6 |
| L2 | 8 | NEXT FORTUNE | 4% | 35.2% | 39 | ✅ | Leg | **2** |
| L3 | 4 | BETTER AND BETTER | 2.9% | 30.4% | 3.3 | ✅ | Leg | **3** |
| — | 3 | VIGOR FLY | 1.2% | 16.4% | 13 | ❌ | — | 9 |
| — | 6 | GREEN ANGEL | 0.5% | 9.3% | 26 | ❌ | — | 7 |
| — | 9 | TRENDY RUSH | 0.5% | 7.7% | 41 | ❌ | — | 8 |
| — | 5 | E HOPEFUL | 0.3% | 6% | 15 | ❌ | — | 10 |
| — | 10 | POWER PATCH | 0.3% | 4.8% | 60 | ❌ | — | 5 |
| — | 7 | ZOUPER FELLOW | 0.1% | 3.5% | 15 | ❌ | — | 12 |
| — | 11 | HYANNIS STAR | 0.1% | 1.9% | 17 | ❌ | — | 11 |
| — | 12 | YEUX DE LIFELINE | 0% | 2.2% | 21 | ❌ | — | 4 |

**Pattern analysis:** —. **HIT** — banker in top 3 and full pool coverage.

### R4 — Class 4 1400m | Result: 14→6→7 | Trio $555

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 6 | MASTER LUCKY | 36.3% | 74.2% | 8.6 | ✅ | Banker | **2** |
| L1 | 2 | STRATHPEFFER | 25.9% | 63% | 5.3 | ✅ | Leg | 6 |
| L2 | 3 | SOLID CAR | 13.3% | 45.5% | 4.5 | ✅ | Leg | 5 |
| L3 | 7 | POLAR PATCH | 10.5% | 39.1% | 6.8 | ✅ | Leg | **3** |
| — | 1 | CHILL PARTNERS | 4.9% | 22.9% | 28 | ❌ | — | 12 |
| — | 10 | GOR GOR | 3% | 15.5% | 20 | ❌ | — | 4 |
| — | 5 | SPLENDOR | 2.4% | 13.7% | 23 | ❌ | — | 8 |
| — | 4 | PRESTIGE COME | 1.9% | 11.7% | 16 | ❌ | — | 10 |
| L4 | 8 | STAR SATYR | 1.3% | 7.9% | 8 | ✅ | Leg | 13 |
| — | 9 | LUCKY GIBS | 0.3% | 2.2% | 33 | ❌ | — | 11 |
| — | 11 | MAJESTIC LIFE | 0.3% | 2.5% | 25 | ❌ | — | 9 |
| — | 12 | STORMY KNIGHT | 0.1% | 1.2% | 43 | ❌ | — | 7 |
| L5 | 14 | HONORARY | 0.1% | 0.5% | 8.6 | ✅ | Leg | **1** |
| — | 13 | DAILY TROPHY | 0% | 0.1% | 50 | ❌ | — | 14 |

**Pattern analysis:** —. **HIT** — banker in top 3 and full pool coverage.

### R5 — Class 4 1800m | Result: 14→1→3 | Trio $9563

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 5 | PERFECT TEAM | 32.4% | 67.8% | 6.2 | ✅ | Banker | 5 |
| L1 | 4 | CHARITY GAIN | 29.6% | 63.3% | 44 | ✅ | Leg | 6 |
| L2 | 3 | CHILL KAKA | 8.7% | 33.6% | 6.3 | ✅ | Leg | **3** |
| L3 | 2 | ALLCASH | 7.4% | 29.8% | 4.2 | ✅ | Leg | 13 |
| — | 6 | CALIFORNIA STAR | 7.1% | 28.8% | 18 | ❌ | — | 7 |
| — | 1 | HAPPY UNIVERSE | 5.3% | 24.3% | 17 | ❌ | — | **2** |
| — | 8 | BRIGHT INHERITANCE | 4.6% | 21.2% | 30 | ❌ | — | 8 |
| — | 7 | JOLTIN | 1.8% | 9.6% | 60 | ❌ | — | 11 |
| — | 14 | LEAPING STAR | 1.1% | 6.6% | 35 | ❌ | — | **1** |
| L5 | 11 | NIGHT PUROSANGUE | 1% | 7.9% | 9 | ✅ | Leg | 9 |
| L6 | 9 | YODA'S CHOICE | 0.5% | 3% | 9.4 | ✅ | Leg | 4 |
| L4 | 10 | ARIEL | 0.4% | 3.4% | 8.6 | ✅ | Leg | 12 |
| — | 13 | GLORIOUS ST PAUL'S | 0.1% | 0.6% | 12 | ❌ | — | 14 |
| — | 12 | NORTHERN BEAST | 0% | 0.2% | 34 | ❌ | — | 10 |

**Pattern analysis:** Pattern C: banker fail + pool gap (#14, #1). Pool and/or banker failed vs result.

### R6 — Class 4 1600m | Result: 7→10→5 | Trio $687

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | MEGA MASTERMIND | 45.8% | 78.4% | 8.2 | ✅ | Banker | 8 |
| L1 | 4 | FLYING BOOM | 14.6% | 46.5% | 13 | ✅ | Leg | 5 |
| L2 | 6 | BLING BLING GENIUS | 9.1% | 36.2% | 7.6 | ✅ | Leg | 6 |
| L3 | 10 | VICTOR SUPREME | 8% | 31.4% | 8.4 | ✅ | Leg | **2** |
| L4 | 1 | LUCKY TWIN STARS | 6.4% | 27.8% | 14 | ✅ | Leg | 11 |
| L5 | 7 | ACE | 4.8% | 23.4% | 6.1 | ✅ | Leg | **1** |
| L6 | 5 | LUCKY YEAR | 4.5% | 23% | 14 | ✅ | Leg | **3** |
| L7 | 9 | RELIABLE DAD | 4.5% | 20.1% | 6.4 | ✅ | Leg | 7 |
| — | 11 | GRAND TURBO | 2.2% | 11.9% | 24 | ❌ | — | 9 |
| — | 13 | NINJA DERBY | 0.1% | 0.8% | 24 | ❌ | — | 10 |
| — | 8 | PEARL OF PANG'S | 0% | 0.3% | 25 | ❌ | — | 12 |
| — | 12 | AMAZING DUCK | 0% | 0.1% | 10 | ❌ | — | 4 |
| — | 3 | GLORIOUS SUCCESS | 0% | 0.1% | 32 | ❌ | — | 13 |
| — | 14 | PING HAI COMET | 0% | 0.1% | 17 | ❌ | — | 14 |

**Pattern analysis:** Pattern A: banker fail (all 3 in legs). All three placers were in the leg pool but MC #1 banker missed the frame — classic Pattern A.

### R7 — Class 4 1200m | Result: 8→5→10 | Trio $413

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 5 | VIRTUS GLORY | 27.2% | 59.6% | 4.3 | ✅ | Banker | **2** |
| L1 | 10 | ENJOY GOLF | 13.8% | 40.4% | 7.2 | ✅ | Leg | **3** |
| L2 | 9 | FLYING SNIPER | 11.4% | 35.4% | 9.5 | ✅ | Leg | 8 |
| L3 | 4 | LITTLE MONSTER | 11.1% | 35% | 4.9 | ✅ | Leg | 5 |
| L4 | 1 | BIG BIG WORLD | 9.4% | 29.2% | 23 | ✅ | Leg | 11 |
| L5 | 6 | KOL | 8.9% | 28.7% | 24 | ✅ | Leg | 9 |
| — | 7 | CALL ME SUCCESS | 8.4% | 27.2% | 13 | ❌ | — | 10 |
| — | 8 | LEADING DRAGON | 3.5% | 15% | 10 | ❌ | — | **1** |
| L6 | 3 | NAVAS G | 2.3% | 10.7% | 9.9 | ✅ | Leg | 7 |
| — | 2 | FAITHFUL WARRIOR | 2% | 9.1% | 37 | ❌ | — | — |
| — | 11 | MULTISUPERSTAR | 1.8% | 8.6% | 10 | ❌ | — | 6 |
| — | 12 | BULLISH PRIDE | 0.2% | 1.2% | 16 | ❌ | — | 4 |

**Pattern analysis:** Pattern B: pool gap (#8). Pool and/or banker failed vs result.

### R8 — Class 3 1000m | Result: 2→12→7 | Trio $1138

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | LOVE TOGETHER | 43% | 76.9% | 12 | ✅ | Banker | **1** |
| L1 | 1 | MICKLEY | 18.2% | 52.9% | 9.5 | ✅ | Leg | 6 |
| L2 | 5 | SUPER STRONG KID | 12.2% | 44.1% | 6.3 | ✅ | Leg | 7 |
| L3 | 3 | METRO POWER | 10.1% | 38.2% | 25 | ✅ | Leg | 5 |
| L4 | 7 | INVINCIBLE STEED | 6.5% | 29.4% | 6.7 | ✅ | Leg | **3** |
| — | 13 | RUN RUN SUNRISE | 5.2% | 25.1% | 24 | ❌ | — | 9 |
| — | 4 | STRAIGHT TO GLORY | 2.7% | 14.4% | 13 | ❌ | — | 7 |
| — | 10 | PARENTS' LOVE | 0.7% | 5.1% | 21 | ❌ | — | 10 |
| — | 6 | DRAGON FOUR SEAS | 0.5% | 3.6% | 61 | ❌ | — | 12 |
| L5 | 12 | LUCKY CANDY | 0.4% | 3.9% | 4.2 | ✅ | Leg | **2** |
| — | 9 | TEN LOVES | 0.4% | 3.3% | 31 | ❌ | — | 13 |
| — | 11 | LIGHTNESS OF MUSIC | 0.2% | 2.1% | 10 | ❌ | — | 4 |
| — | 8 | MASTER OF ALL | 0% | 0.8% | 39 | ❌ | — | 14 |
| L6 | 14 | SPARKLING FELLOW | 0% | 0% | 8.5 | ✅ | Leg | 11 |

**Pattern analysis:** —. **HIT** — banker in top 3 and full pool coverage.

### R9 — Class 3 1200m | Result: 5→6→2 | Trio $394

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | GUSTOSISIMO | 31.9% | 67.1% | 5 | ✅ | Banker | 4 |
| L1 | 5 | CHILL BUDDY | 22.1% | 57.2% | 6.7 | ✅ | Leg | **1** |
| L2 | 6 | EFFORTLESS WIN | 12.9% | 42% | 3.3 | ✅ | Leg | **2** |
| L3 | 2 | LADY'S CHOICE | 9% | 33.2% | 9.4 | ✅ | Leg | **3** |
| L4 | 4 | CELESTIAL HERO | 8.9% | 32.9% | 13 | ✅ | Leg | 12 |
| L5 | 3 | STAY COSMIC | 7.5% | 28.9% | 23 | ✅ | Leg | 7 |
| — | 12 | SPICY STANDARD | 5.4% | 24.3% | 14 | ❌ | — | 5 |
| — | 7 | KING MILES | 1.6% | 9.4% | 36 | ❌ | — | 8 |
| L6 | 11 | THRIVING BROTHERS | 0.3% | 2.6% | 7.5 | ✅ | Leg | 6 |
| — | 9 | MOUNT EVEREST | 0.2% | 1.6% | 26 | ❌ | — | 9 |
| — | 10 | LUCKY MY WAY | 0.1% | 0.7% | 24 | ❌ | — | 10 |
| — | 8 | HIGH PRAISE | 0% | 0.1% | 29 | ❌ | — | 11 |

**Pattern analysis:** Pattern A: banker fail (all 3 in legs). All three placers were in the leg pool but MC #1 banker missed the frame — classic Pattern A.

### R10 — Class 2 1200m | Result: 8→5→9 | Trio $913

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | STORM RIDER | 42% | 75.9% | 19 | ✅ | Banker | 7 |
| L1 | 2 | YOUNG CHAMPION | 19.4% | 54.9% | 14 | ✅ | Leg | 6 |
| L2 | 9 | PUBLIC ATTENTION | 9.1% | 34.3% | 6.1 | ✅ | Leg | **3** |
| L3 | 3 | VICTOR THE WINNER | 8.9% | 35.1% | 14 | ✅ | Leg | 4 |
| L4 | 8 | HOT DELIGHT | 7.8% | 33.7% | 3.9 | ✅ | Leg | **1** |
| L5 | 6 | RISING FORCE | 5.5% | 25.7% | 4 | ✅ | Leg | 5 |
| — | 5 | MAGIC CONTROL | 3.9% | 18.6% | 16 | ❌ | — | **2** |
| — | 10 | PAKISTAN LEGACY | 2% | 11.3% | 28 | ❌ | — | 11 |
| — | 4 | BEAUTY BOLT | 1.3% | 9.1% | 16 | ❌ | — | 9 |
| — | 7 | KAHOLO ANGEL | 0.1% | 1% | 28 | ❌ | — | 10 |
| L6 | 12 | GLOWING PRAISES | 0% | 0.4% | 7.2 | ✅ | Leg | 8 |
| — | 11 | WE ARE HERO | 0% | 0.1% | 44 | ❌ | — | 12 |

**Pattern analysis:** Pattern C: banker fail + pool gap (#5). Pool and/or banker failed vs result.

### R11 — Class 3 1400m | Result: 7→5→8 | Trio $2293

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 3 | FIT FOR BEAUTY | 30.4% | 66.7% | 7.4 | ✅ | Banker | 7 |
| L1 | 2 | MAKE YOU SMILE | 26.7% | 59.9% | 12 | ✅ | Leg | 12 |
| L2 | 6 | THE UNIQUE STAR | 8.3% | 31.4% | 11 | ✅ | Leg | 5 |
| L3 | 5 | RUN RUN SMART | 8.3% | 31.3% | 9.1 | ✅ | Leg | **2** |
| L4 | 8 | KING EQUINE | 7.3% | 27.4% | 27 | ✅ | Leg | **3** |
| L5 | 7 | CHILL EASY | 6.4% | 26.7% | 5.3 | ✅ | Leg | **1** |
| — | 1 | CHIU CHOW SPIRIT | 5.9% | 23.8% | 13 | ❌ | — | 6 |
| L6 | 4 | THUNDER KIT | 3.3% | 16.3% | 7.5 | ✅ | Leg | 11 |
| — | 12 | KEMPES | 3.1% | 13.8% | 12 | ❌ | — | 9 |
| — | 10 | THUNDER ACTION | 0.1% | 1.2% | 10 | ❌ | — | 10 |
| — | 11 | WELL ENOUGH | 0.1% | 0.9% | 49 | ❌ | — | 13 |
| — | 9 | TRUE BROTHERS | 0% | 0.4% | 23 | ❌ | — | 14 |
| — | 13 | M M CONCORD | 0% | 0.3% | 30 | ❌ | — | 4 |
| — | 14 | RISING FROM ASHES | 0% | 0.1% | 10 | ❌ | — | 8 |

**Pattern analysis:** Pattern A: banker fail (all 3 in legs). All three placers were in the leg pool but MC #1 banker missed the frame — classic Pattern A.


---

## B Banker Performance

| Race | B Banker | MC Win% | SP | Placed? | Finish |
|------|----------|---------|-----|---------|--------|
| R1 | #3 | 35.2% | 5.2 | ✅ | 2 |
| R2 | #1 | 47.2% | 3.1 | ✅ | 2 |
| R3 | #2 | 49% | 2.9 | ✅ | 1 |
| R4 | #6 | 36.3% | 8.6 | ✅ | 2 |
| R5 | #5 | 32.4% | 6.2 | ❌ | 5 |
| R6 | #2 | 45.8% | 8.2 | ❌ | 8 |
| R7 | #5 | 27.2% | 4.3 | ✅ | 2 |
| R8 | #2 | 43% | 12 | ✅ | 1 |
| R9 | #1 | 31.9% | 5 | ❌ | 4 |
| R10 | #1 | 42% | 19 | ❌ | 7 |
| R11 | #3 | 30.4% | 7.4 | ❌ | 7 |

**Banker top 3:** 6/11
