# Strategy B Review — MC #1 banker + Place%>20% | Happy Valley | 3 Jun 2026

## Rules

- **Banker**: MC **#1** by MC Win% (raw).
- **Primary legs**: MC Place% > 20%; Step B swap/add for Win <10.
- **Bet**: Trio 膽拖; **$10**/combo.
- **Reports:** `data/reports/trio_strategy_20260603_HV_R1.md` … **R9**
- **Results:** `data/historical/results_20260603_HV.json`

---

## Summary

| Metric | Strategy B (report) | Strategy A (8 staked) |
|--------|---------------------|------------------------|
| Races | **9** | **8** (R3 PASS) |
| Hit rate | **0/9 (0.0%)** | **2/8 (25.0%)** |
| Staked | **$1200** | **$720** |
| Returned | **$0** | **$470** |
| **Net P&L** | **$-1200** | **$-250** |
| **ROI** | **-100.0%** | **-34.7%** |

---

## Race-by-Race Results — Strategy B

| Race | Class | Dist | Banker (MC#1) | Final legs | Stake | Result | Banker top 3? | Hit? | Trio $ | Return | P&L |
|------|-------|------|---------------|------------|-------|--------|---------------|------|--------|--------|-----|
| R1 | Class 5 | 1650m | #3 | #6,#7,#2,#8,#9 | $100 | 3→12→6 | ✅ | ❌ | $1657 | $0 | $-100 |
| R2 | Class 5 | 1200m | #2 | #4,#6,#9,#10,#11,#3 | $150 | 4→3→12 | ❌ | ❌ | $1074 | $0 | $-150 |
| R3 | Class 4 | 1200m | #3 | #4,#5,#7,#6,#12,#1,#8,#2 | $210 | 7→12→4 | ❌ | ❌ | $388 | $0 | $-210 |
| R4 | Class 4 | 1650m | #10 | #6,#11,#8 | $30 | 5→1→9 | ❌ | ❌ | $3239 | $0 | $-30 |
| R5 | Class 4 | 1200m | #10 | #7,#5,#11,#2,#1,#4 | $150 | 7→11→5 | ❌ | ❌ | $59 | $0 | $-150 |
| R6 | Class 4 | 1200m | #7 | #1,#2,#5,#6,#4 | $100 | 1→4→5 | ❌ | ❌ | $411 | $0 | $-100 |
| R7 | Class 3 | 1200m | #1 | #7,#2,#5,#3,#4,#10,#8 | $210 | 11→7→10 | ❌ | ❌ | $410 | $0 | $-210 |
| R8 | Class 2 | 1800m | #6 | #11,#7,#2,#9,#1,#3 | $150 | 6→11→4 | ✅ | ❌ | $2776 | $0 | $-150 |
| R9 | Class 3 | 1650m | #1 | #3,#2,#4,#5,#12 | $100 | 4→10→3 | ❌ | ❌ | $589 | $0 | $-100 |
| **TOTAL** | | | | | **$1200** | | | **0/9** | | | **$0** | **$-1200** |

---

## Race-by-Race Results — Strategy A

| Race | Mode | Banker | Legs | Stake | Result | Hit? | Trio $ | Return | P&L | Miss reason |
|------|------|--------|------|-------|--------|------|--------|--------|-----|-------------|
| R1 | A | #3 | #6,#7,#9,#2 | $60 | 3→12→6 | ❌ | $1657 | $0 | $-60 | Pattern B: pool gap (#12) |
| R2 | B | #2 | #4,#9,#6,#10,#3 | $100 | 4→3→12 | ❌ | $1074 | $0 | $-100 | Pattern C: banker fail + pool gap (#12) |
| R3 | PASS | #3 | #4,#7,#1,#12,#8 | $0 | 7→12→4 | — | $388 | $0 | $0 | PASS |
| R4 | B | #10 | #6,#8,#11,#5,#2 | $100 | 5→1→9 | ❌ | $3239 | $0 | $-100 | Pattern C: banker fail + pool gap (#1, #9) |
| R5 | B | #7 | #10,#5,#11,#1,#2 | $100 | 7→11→5 | ✅ | $59 | $59 | $-41 | — |
| R6 | B | #1 | #7,#2,#5,#4,#11 | $100 | 1→4→5 | ✅ | $411 | $411 | +$311 | — |
| R7 | B | #1 | #7,#2,#5,#3,#4 | $100 | 11→7→10 | ❌ | $410 | $0 | $-100 | Pattern C: banker fail + pool gap (#11, #10) |
| R8 | B | #6 | #11,#7,#2,#9,#1 | $100 | 6→11→4 | ❌ | $2776 | $0 | $-100 | Pattern B: pool gap (#4) |
| R9 | A | #1 | #3,#2,#4,#5 | $60 | 4→10→3 | ❌ | $589 | $0 | $-60 | Pattern C: banker fail + pool gap (#10) |

---

## B Miss Pattern Summary

| Pattern | Count | Races |
|---------|-------|-------|
| **A** | 3 | R3, R5, R6 |
| **B** | 2 | R1, R8 |
| **C** | 4 | R2, R4, R7, R9 |

---

## Full MC Place% Table — Per Race

### R1 — Class 5 1650m | Result: 3→12→6 | Trio $1657

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 3 | FAMILY FORTUNE | 43.5% | 76.7% | 2.7 | ✅ | Banker | **1** |
| L1 | 6 | TELECOM POWER | 12% | 40.6% | 8.3 | ✅ | Leg | **3** |
| L2 | 7 | ZETTA FORCE | 10.5% | 37.8% | 23 | ✅ | Leg | 9 |
| L3 | 2 | SETANTA | 10.3% | 37% | 7.4 | ✅ | Leg | 4 |
| L4 | 8 | MANYTHANKS FOREVER | 9.9% | 36.8% | 39 | ✅ | Leg | 6 |
| L5 | 9 | WAH MAY WAI WAI | 6.3% | 26.9% | 3.5 | ✅ | Leg | 5 |
| — | 5 | HAPPY BUDDIES | 3.7% | 19.7% | 22 | ❌ | — | 11 |
| — | 4 | PRINCE ALEX | 1.8% | 9.8% | 23 | ❌ | — | 8 |
| — | 10 | SMART TRIO | 0.9% | 5.8% | 12 | ❌ | — | 10 |
| — | 1 | MASTER OF HUMOR | 0.5% | 3.2% | 56 | ❌ | — | 12 |
| — | 11 | CASA LEGEND | 0.3% | 3.3% | 39 | ❌ | — | 7 |
| — | 12 | THE WAY WE WIN | 0.3% | 2.3% | 38 | ❌ | — | **2** |

**Pattern analysis:** Pattern B: pool gap (#12). Pool and/or banker failed vs result.

### R2 — Class 5 1200m | Result: 4→3→12 | Trio $1074

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 2 | ALWAYS MY FOLKS | 36.8% | 71% | 4.2 | ✅ | Banker | 5 |
| L1 | 4 | MAJESTIC DELIGHT | 15.9% | 45.7% | 10 | ✅ | Leg | **1** |
| L2 | 6 | CALL TO COMMAND | 12.1% | 38.5% | 11 | ✅ | Leg | 8 |
| L3 | 9 | CHILL MASTER | 11.4% | 38.7% | 7.2 | ✅ | Leg | 6 |
| L4 | 10 | EXCEED THE WISH | 7% | 27% | 12 | ✅ | Leg | 9 |
| L5 | 11 | ISLAND BREEZES | 5.1% | 23.5% | 49 | ✅ | Leg | 10 |
| L6 | 3 | AUTUMN VIBES | 4.3% | 17.2% | 5.3 | ✅ | Leg | **2** |
| — | 5 | RUNJEET | 1.7% | 8.8% | 5.5 | ❌ | — | 4 |
| — | 7 | THOUSAND CUPS | 3.2% | 14.4% | 24 | ❌ | — | 12 |
| — | 1 | LAKESHORE HERO | 1.1% | 7.2% | 20 | ❌ | — | 7 |
| — | 12 | SONIC BOOM | 1% | 5.8% | 13 | ❌ | — | **3** |
| — | 8 | TAI VICTORY | 0.3% | 2.3% | 48 | ❌ | — | 11 |

**Pattern analysis:** Pattern C: banker fail + pool gap (#12). Pool and/or banker failed vs result.

### R3 — Class 4 1200m | Result: 7→12→4 | Trio $388

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 3 | CAPTAIN LINK | 20% | 47.9% | 8.8 | ✅ | Banker | 10 |
| L1 | 4 | LEADING AGILITY | 16.4% | 43.6% | 5.7 | ✅ | Leg | **3** |
| L2 | 5 | GOLDEN EMPIRE | 14.7% | 39.6% | 29 | ✅ | Leg | 6 |
| L3 | 7 | FORERUNNER | 13% | 38.4% | 6.4 | ✅ | Leg | **1** |
| L4 | 6 | WINALOT | 7.6% | 25.6% | 40 | ✅ | Leg | 12 |
| L5 | 12 | SAME TO YOU | 6.8% | 23.4% | 6.4 | ✅ | Leg | **2** |
| L6 | 1 | YOUNG ARROW | 6.4% | 21.5% | 4.3 | ✅ | Leg | 5 |
| L7 | 8 | FREE PONY | 5.8% | 21.2% | 7.9 | ✅ | Leg | 9 |
| L8 | 2 | BEAUTY GLORY | 1.9% | 9.7% | 7.1 | ✅ | Leg | 8 |
| — | 9 | MARVEL AND GOLD | 3.6% | 14.7% | 35 | ❌ | — | 7 |
| — | 10 | FORZA LEADER | 3.4% | 12.7% | 49 | ❌ | — | 4 |
| — | 11 | AWESOME TREASURE | 0.3% | 1.5% | 111 | ❌ | — | 11 |

**Pattern analysis:** Pattern A: banker fail (all 3 in legs). All three placers were in the leg pool but MC #1 banker missed the frame — classic Pattern A.

### R4 — Class 4 1650m | Result: 5→1→9 | Trio $3239

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 10 | RUN RUN TIMING | 28% | 58.5% | 2.4 | ✅ | Banker | 12 |
| L1 | 6 | DASHING MAURISON | 17.1% | 44.8% | 5.8 | ✅ | Leg | 6 |
| L2 | 11 | KING GLORIOSO | 12.3% | 38% | 10 | ✅ | Leg | 11 |
| L3 | 8 | SAVVY WARRIOR | 11.1% | 34.3% | 6.7 | ✅ | Leg | 5 |
| — | 5 | TAKE ACTION | 6.5% | 24.4% | 10 | ❌ | — | **1** |
| — | 3 | FLYING FORTUNE | 6.3% | 22.7% | 28 | ❌ | — | 4 |
| — | 2 | STAR MAC | 5% | 19.2% | 12 | ❌ | — | 7 |
| — | 9 | CAN'T GO WONG | 3.8% | 14.9% | 12 | ❌ | — | **3** |
| — | 1 | EXCEED THE LIMIT | 3.1% | 13.1% | 18 | ❌ | — | **2** |
| — | 4 | GAZELEY | 2.9% | 12.1% | 85 | ❌ | — | 10 |
| — | 7 | SMILING ONE | 2.1% | 8.8% | 69 | ❌ | — | 8 |
| — | 12 | CONRAD THE GREAT | 1.9% | 9.2% | 63 | ❌ | — | 9 |

**Pattern analysis:** Pattern C: banker fail + pool gap (#5, #1, #9). Pool and/or banker failed vs result.

### R5 — Class 4 1200m | Result: 7→11→5 | Trio $59

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 10 | PODIUM | 24.4% | 56.3% | 18 | ✅ | Banker | 4 |
| L1 | 7 | BROWNNEEDSFURTHER | 24.1% | 57.2% | 4 | ✅ | Leg | **1** |
| L2 | 5 | GEORGIAN SIGMA | 11.5% | 36.9% | 5.9 | ✅ | Leg | **3** |
| L4 | 2 | GLORY B | 9.2% | 31.7% | 25 | ✅ | Leg | 7 |
| L5 | 1 | FLASHING FIGHTER | 8.5% | 27.3% | 16 | ✅ | Leg | 8 |
| L3 | 11 | LOVING VIBES | 7.8% | 27.9% | 2.9 | ✅ | Leg | **2** |
| L6 | 4 | DANICA'S CHOICE | 7.3% | 25.6% | 10 | ✅ | Leg | 5 |
| — | 6 | EVERSTAR | 2.3% | 10.8% | 24 | ❌ | — | 10 |
| — | 9 | STAR FIGURE | 1.8% | 9.7% | 23 | ❌ | — | 6 |
| — | 8 | FOREVER FANCY | 1.3% | 6.6% | 33 | ❌ | — | 11 |
| — | 3 | IRON SECURITY | 1% | 5.9% | 29 | ❌ | — | 9 |
| — | 12 | YEE CHEONG SPIRIT | 0.7% | 3.9% | 15 | ❌ | — | 12 |

**Pattern analysis:** Pattern A: banker fail (all 3 in legs). All three placers were in the leg pool but MC #1 banker missed the frame — classic Pattern A.

### R6 — Class 4 1200m | Result: 1→4→5 | Trio $411

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 7 | NEBRASKAN | 32.3% | 70% | 3.9 | ✅ | Banker | 6 |
| L1 | 1 | THE HEIR | 31.9% | 68.9% | 4.5 | ✅ | Leg | **1** |
| L2 | 2 | BRIGHT DAY | 11.6% | 41.3% | 14 | ✅ | Leg | 7 |
| L3 | 5 | VIGOR EYE | 9.6% | 36.8% | 11 | ✅ | Leg | **3** |
| L4 | 6 | SPIRITED STEED | 4.7% | 20.9% | 22 | ✅ | Leg | 11 |
| L5 | 4 | MEOWTH | 2.4% | 14.2% | 6.9 | ✅ | Leg | **2** |
| — | 3 | HEALTHY HEALTHY | 2.5% | 13.9% | 16 | ❌ | — | 10 |
| — | 12 | HEROIC MASTER | 1.9% | 11.9% | 17 | ❌ | — | 8 |
| — | 8 | THE PERFECT MATCH | 1.3% | 8.7% | 13 | ❌ | — | 4 |
| — | 9 | PHOENIX LIGHT | 1.1% | 7.1% | 21 | ❌ | — | 5 |
| — | 11 | WINNING NOW | 0.7% | 5.2% | 8.3 | ❌ | — | 9 |
| — | 10 | GLORIOUS RYDER | 0.1% | 0.9% | 27 | ❌ | — | 12 |

**Pattern analysis:** Pattern A: banker fail (all 3 in legs). All three placers were in the leg pool but MC #1 banker missed the frame — classic Pattern A.

### R7 — Class 3 1200m | Result: 11→7→10 | Trio $410

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | HAPPY INDEX | 25.4% | 57.1% | 4.4 | ✅ | Banker | 9 |
| L1 | 7 | KING PROFIT | 21.7% | 53.8% | 2.4 | ✅ | Leg | **2** |
| L2 | 2 | SYMBOL OF STRENGTH | 16.8% | 46.5% | 3.2 | ✅ | Leg | 6 |
| L3 | 5 | AMAZING KID | 11.2% | 35.2% | 2.9 | ✅ | Leg | 4 |
| L4 | 3 | JUBILANT WINNER | 8.4% | 29.4% | 2.2 | ✅ | Leg | 5 |
| L5 | 4 | HARMONY N BLESSED | 5.5% | 22.7% | 6.6 | ✅ | Leg | 10 |
| L7 | 8 | DANCING CLASSICS | 3.6% | 15.6% | 2.6 | ✅ | Leg | 8 |
| L6 | 10 | ACE CHAMPION | 2.5% | 12.6% | 2.1 | ✅ | Leg | **3** |
| — | 11 | POWER KOEPP | 2.1% | 10.3% | 3.8 | ❌ | — | **1** |
| — | 9 | SUPER JOY N FUN | 1.4% | 7.8% | 4.4 | ❌ | — | 7 |
| — | 6 | IGOR STRAVINSKY | 1% | 5.9% | 3.4 | ❌ | — | 11 |
| — | 12 | TACTICAL ACE | 0.5% | 3% | 8.9 | ❌ | — | 12 |

**Pattern analysis:** Pattern C: banker fail + pool gap (#11). Pool and/or banker failed vs result.

### R8 — Class 2 1800m | Result: 6→11→4 | Trio $2776

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 6 | SILVERY BREEZE | 20.5% | 51.3% | 2.4 | ✅ | Banker | **1** |
| L1 | 11 | LIVEANDLETLIVE | 18.5% | 48% | 2.6 | ✅ | Leg | **2** |
| L2 | 7 | BEAUTY ALLIANCE | 14.3% | 41.5% | 1.9 | ✅ | Leg | 6 |
| L3 | 2 | SOLEIL FIGHTER | 14% | 41.1% | 2.7 | ✅ | Leg | 7 |
| L4 | 9 | ARMOR GOLDEN EAGLE | 13.7% | 40.3% | 2.8 | ✅ | Leg | 5 |
| L5 | 1 | HELENE FEELING | 9.9% | 33.3% | 4.8 | ✅ | Leg | 11 |
| L6 | 3 | PACKING ANGEL | 4.5% | 18.6% | 2.3 | ✅ | Leg | 4 |
| — | 4 | CALIFORNIATOTALITY | 2.4% | 12.3% | 13 | ❌ | — | **3** |
| — | 5 | AWESOME FLUKE | 1.1% | 6.6% | 17 | ❌ | — | 9 |
| — | 10 | JOY OF SPRING | 0.9% | 5.9% | 8.1 | ❌ | — | 8 |
| — | 8 | POCKETING | 0.1% | 1.1% | 16 | ❌ | — | 10 |

**Pattern analysis:** Pattern B: pool gap (#4). Pool and/or banker failed vs result.

### R9 — Class 3 1650m | Result: 4→10→3 | Trio $589

| Seq | # | Horse | Win% | Place% | SP | Pool | Role | Finished |
|-----|---|-------|------|--------|-----|------|------|----------|
| ★ | 1 | SMART AVENUE | 31.7% | 64.8% | 2.4 | ✅ | Banker | 5 |
| L1 | 3 | FIVEFORTWO | 21.9% | 54.3% | 1.7 | ✅ | Leg | **3** |
| L2 | 2 | MISTER DAPPER | 12.9% | 39.8% | 2.7 | ✅ | Leg | 9 |
| L3 | 4 | WITHOUT COMPARE | 10.6% | 36.1% | 2 | ✅ | Leg | **1** |
| L4 | 5 | KEEFY | 8% | 29.8% | 3.4 | ✅ | Leg | 11 |
| L5 | 12 | ANOTHER ZONDA | 4.9% | 21.1% | 14 | ✅ | Leg | 4 |
| — | 9 | CALIFORNIA MOXIE | 3.6% | 16.2% | 9.5 | ❌ | — | 7 |
| — | 10 | STORMI | 2.2% | 12.4% | 14 | ❌ | — | **2** |
| — | 11 | YEE CHEONG GLORY | 1.6% | 9% | 25 | ❌ | — | 12 |
| — | 8 | CASA ROCHESTER | 1.2% | 7.8% | 13 | ❌ | — | 6 |
| — | 6 | ALL ROUND WINNER | 1.1% | 6% | 16 | ❌ | — | 8 |
| — | 7 | CLASS | 0.4% | 2.6% | 24 | ❌ | — | 9 |

**Pattern analysis:** Pattern C: banker fail + pool gap (#10). Pool and/or banker failed vs result.


---

## B Banker Performance

| Race | B Banker | MC Win% | SP | Placed? | Finish |
|------|----------|---------|-----|---------|--------|
| R1 | #3 | 43.5% | 2.7 | ✅ | 1 |
| R2 | #2 | 36.8% | 4.2 | ❌ | 5 |
| R3 | #3 | 20% | 8.8 | ❌ | 10 |
| R4 | #10 | 28% | 2.4 | ❌ | 12 |
| R5 | #10 | 24.4% | 18 | ❌ | 4 |
| R6 | #7 | 32.3% | 3.9 | ❌ | 6 |
| R7 | #1 | 25.4% | 4.4 | ❌ | 9 |
| R8 | #6 | 20.5% | 2.4 | ✅ | 1 |
| R9 | #1 | 31.7% | 2.4 | ❌ | 5 |

**Banker top 3:** 2/9
