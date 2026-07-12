# Trio Strategy B (stratC) Review — Sha Tin | 2026-07-12

## Rules
- **Banker** = MC #1 by raw Win%.
- **Primary legs** = all horses with MC Place% > 20%.
- **Step B swap/add** = any horse with SP odds < 10 but Place% ≤ 20% swaps in for the lowest replaceable primary leg (or is added if none replaceable).
- Unit $10, 膽拖 (1 banker + N legs).

## Summary

| Metric | Strategy A | Strategy B (MC-only, Place%>20 + swap) |
|--------|-----------|----------------------------------------|
| Races | 11 | 11 |
| Hits | 0/11 | **1/11 (R3)** |
| Staked | $860 | $1,160 |
| Returned | $0 | $172 |
| **P&L** | **−$860** | **−$988** |
| ROI | −100% | −85.2% |

## Race-by-Race Results — Strategy B

| R | Class | Dist | Banker (MC#1) | Final legs | Combos | Stake | Result | Bk top3? | Hit? | Trio $ | Return | P&L |
|---|-------|------|---------------|-----------|--------|-------|--------|----------|------|--------|--------|-----|
| 1 | C5 | 1800 | #2 | 5,1,4,10 | 6 | 60 | 1,11,2 | ✅ | ❌ | 1420 | 0 | −60 |
| 2 | C5 | 1400 | #7 | 6,5,10,9,8 | 10 | 100 | 7,6,11 | ✅ | ❌ | 378 | 0 | −100 |
| 3 | C4 | 1400 | #10 | 6,13,7,2,9 | 10 | 100 | 6,9,10 | ✅ | **✅** | 172 | 172 | +72 |
| 4 | C4 | 1400 | #6 | 1,10,9,2,8,13 | 15 | 150 | 2,12,1 | ❌ | ❌ | 710 | 0 | −150 |
| 5 | C4 | 1200 | #1 | 2,3,12 | 3 | 30 | 10,12,1 | ✅ | ❌ | 1194 | 0 | −30 |
| 6 | C4 | 1200 | #1 | 5,8,6,4,2,9 | 15 | 150 | 2,10,8 | ❌ | ❌ | 2962 | 0 | −150 |
| 7 | C4 | 1600 | #1 | 3,5,8,10 | 6 | 60 | 3,6,5 | ❌ | ❌ | 2026 | 0 | −60 |
| 8 | C1 | 1600 | #4 | 8,6,5,2,3 | 10 | 100 | 2,12,9 | ❌ | ❌ | 1023 | 0 | −100 |
| 9 | C3 | 1200 | #1 | 4,2,3,8,7 | 10 | 100 | 5,1,8 | ✅ | ❌ | 521 | 0 | −100 |
| 10 | C3 | 1600 | #1 | 8,4,5,3,12,13,9 | 21 | 210 | 13,4,12 | ❌ | ❌ | 537 | 0 | −210 |
| 11 | C3 | 1400 | #1 | 2,9,6,8,12 | 10 | 100 | 3,12,4 | ❌ | ❌ | 8455 | 0 | −100 |

## Race-by-Race Results — Strategy A

| R | Mode | Banker | Legs | Combos | Stake | Result | Hit? | Trio $ | Return | P&L | Miss Reason |
|---|------|--------|------|--------|-------|--------|------|--------|--------|-----|-------------|
| 1 | A(5) | #2 | 5,1,4,7 | 6 | 60 | 1,11,2 | ❌ | 1420 | 0 | −60 | B: gap #11@4.5 |
| 2 | B(6) | #7 | 6,5,10,9,8 | 10 | 100 | 7,6,11 | ❌ | 378 | 0 | −100 | B: gap #11@6.6 |
| 3 | B(6) | #10 | 6,13,7,2,8 | 10 | 100 | 6,9,10 | ❌ | 172 | 0 | −100 | B: gap #9@5.0 |
| 4 | B(6) | #6 | 1,2,9,10,8 | 10 | 100 | 2,12,1 | ❌ | 710 | 0 | −100 | C: bk 4th + #12@68 |
| 5 | B(6) | #1 | 2,3,7,11,12 | 10 | 100 | 10,12,1 | ❌ | 1194 | 0 | −100 | B: gap #10@25 |
| 6 | A(5) | #1 | 5,8,6,4 | 6 | 60 | 2,10,8 | ❌ | 2962 | 0 | −60 | C: bk out + #10@97 |
| 7 | A(5) | #1 | 3,5,4,8 | 6 | 60 | 3,6,5 | ❌ | 2026 | 0 | −60 | C: bk out + #6@93 |
| 8 | A(5) | #4 | 8,6,2,5 | 6 | 60 | 2,12,9 | ❌ | 1023 | 0 | −60 | C: bk 4th |
| 9 | A(5) | #1 | 4,2,3,8 | 6 | 60 | 5,1,8 | ❌ | 521 | 0 | −60 | B: gap #5@12 |
| 10 | B(6) | #1 | 8,4,5,3,7 | 10 | 100 | 13,4,12 | ❌ | 537 | 0 | −100 | C: bk out |
| 11 | A(5) | #1 | 2,9,7,6 | 6 | 60 | 3,12,4 | ❌ | 8455 | 0 | −60 | C: bk out, all 3 out |

## B Miss Pattern Summary

- **Pattern A (bk fail, all 3 in legs): 1** — R10 (#13,#4,#12 all in B's 7-leg pool, but banker #1 failed). The widened odds-swap pool covered the result; only the banker sank it.
- **Pattern B (bk hit, pool gap): 4** — R1, R2, R5, R9.
- **Pattern C (bk fail + pool gap): 5** — R4, R6, R7, R8, R11.
- **Hit: 1** — R3 (the #9 odds-swap caught 3rd-placed live shortie @5.0).

R10 is the instructive near-miss: B's odds-swap widening (adding #12@5, #13@5.3, #9) covered all three placers — only the failed MC#1 banker cost it. Argues for **banker flexibility on flat competitive fields**.

## Full MC Place% Table — Per Race

Legend Seq: ★=banker, L1–Ln=legs, —=outside pool.

### R1 (C5 1800) — Result 1,11,2 | MISS
| Seq | # | Horse | Win% | Plc% | SP | Pool | Finished |
|-----|---|-------|------|------|----|----|----------|
| ★ | 2 | HAILTOTHEVICTORS | 51.9 | 84.9 | 13 | ✅ | 3rd |
| L1 | 5 | CARRYON SMILING | 18.0 | 56.8 | — | ✅ | — |
| L2 | 1 | BEAUTY MISSILE | 11.5 | 47.3 | 13 | ✅ | **1st** |
| L3 | 4 | GOLDEN FORTUNE | 9.7 | 41.6 | — | ✅ | — |
| L4 | 10 | SMILING EMPEROR | 1.7 | 11.9 | 8.6 | ✅(swap) | — |
| — | 11 | — | low | ~low | **4.5** | ❌ | **2nd** |
Pattern: #11 was 4.5 in market (2nd-fav) but MC rated it low → banker+#1 both placed, but market-fancied #11 crashed the pool. **MC under-rated a short-priced runner.**

### R2 (C5 1400) — Result 7,6,11 | MISS
| Seq | # | Horse | Win% | Plc% | SP | Pool | Finished |
|-----|---|-------|------|------|----|----|----------|
| ★ | 7 | DOUBLE BINGO | 29.1 | 64.4 | 2.8 | ✅ | **1st** |
| L1 | 6 | RATTAN GALAXY | 24.9 | 59.7 | 9.9 | ✅ | **2nd** |
| L2 | 5 | IRON LEGION | 11.8 | 40.1 | — | ✅ | — |
| L3 | 10 | EXCEED THE WISH | 10.1 | 34.4 | 20 | ✅ | 4th |
| L4 | 9 | DRACO | 9.8 | 34.4 | — | ✅ | — |
| L5 | 8 | PRINCE ALEX | 8.0 | 30.8 | — | ✅ | — |
| — | 11 | — | low | ~low | **6.6** | ❌ | **3rd** |
Pattern: banker + top leg nailed 1st/2nd. #11 (6.6 market) placed 3rd from outside the pool. Again a **short-priced miss** MC didn't rank.

### R3 (C4 1400) — Result 6,9,10 | **HIT ✅ $172**
| Seq | # | Horse | Win% | Plc% | SP | Pool | Finished |
|-----|---|-------|------|------|----|----|----------|
| ★ | 10 | VOYAGE BOSS | 24.3 | 56.5 | 3.6 | ✅ | 3rd |
| L1 | 6 | GRAND PATCH | 20.1 | 51.1 | 4.7 | ✅ | **1st** |
| L2 | 13 | FLYING SNIPER | 17.2 | 45.7 | — | ✅ | — |
| L3 | 7 | HOT AIR BALLON | 9.7 | 32.0 | 20 | ✅ | 4th |
| L4 | 2 | FLASH CURRENT | 8.1 | 27.4 | — | ✅ | — |
| L5 | 9 | KA YING GLORY | low | low | 5.0 | ✅(swap) | **2nd** |
Pattern: **the odds-swap won it.** #9 (knee-surgery-cleared, low MC but 5.0 market) was swapped in on the odds<10 rule and finished 2nd. Banker 3rd + #6 1st completed the trio. Vindicates the swap rule.

### R4 (C4 1400) — Result 2,12,1 | MISS
| Seq | # | Horse | Win% | Plc% | SP | Pool | Finished |
|-----|---|-------|------|------|----|----|----------|
| ★ | 6 | SUPER LOVE | 26.4 | 55.9 | 16 | ✅ | 4th |
| L1 | 1 | HAROLD WIN | 11.6 | 34.8 | 4.1 | ✅ | **3rd** |
| L2 | 10 | FORTUNE STAR | 10.3 | 30.6 | — | ✅ | — |
| L3 | 9 | DAILY ACCLAIM | 10.2 | 31.4 | — | ✅ | — |
| L4 | 2 | RISING PHOENIX | 10.0 | 31.1 | 2.1 | ✅ | **1st** |
| L5 | 8 | HAPPY PROMISE | 9.8 | 30.6 | — | ✅ | — |
| L6 | 13 | GOR GOR | 6.3 | 22.6 | — | ✅ | — |
| — | 12 | — | low | low | **68** | ❌ | **2nd** |
Pattern: banker failed (4th) AND a 68-1 (#12) placed 2nd. Double failure — unfixable upset.

### R5 (C4 1200) — Result 10,12,1 | MISS
| Seq | # | Horse | Win% | Plc% | SP | Pool | Finished |
|-----|---|-------|------|------|----|----|----------|
| ★ | 1 | LUNAR DASH | 34.1 | 67.4 | 3.2 | ✅ | 3rd |
| L1 | 2 | HAYDAY | 20.1 | 52.7 | — | ✅ | — |
| L2 | 3 | KA YING RESILIENCE | 19.4 | 53.4 | — | ✅ | — |
| L3 | 12 | ENJOY GOLF | 3.1 | 14.5 | 7.9 | ✅(swap) | **2nd** |
| — | 10 | — | low | low | **25** | ❌ | **1st** |
Pattern: banker 3rd + swap #12 2nd — two of three! But #10 (25-1) won from outside. Longshot winner; #12 swap again earned its place (2nd).

### R6 (C4 1200) — Result 2,10,8 | MISS
| Seq | # | Horse | Win% | Plc% | SP | Pool | Finished |
|-----|---|-------|------|------|----|----|----------|
| ★ | 1 | OLDTOWN | 37.9 | 70.2 | — | ✅ | out |
| L1 | 5 | PRIME WINISTER | 14.0 | 40.6 | — | ✅ | — |
| L2 | 8 | SOLID CAR | 9.0 | 30.8 | 3.6 | ✅ | **3rd** |
| L3 | 6 | SILVER SPURS | 7.6 | 27.6 | — | ✅ | — |
| L4 | 4 | NOBLE SUPERIOR | 7.5 | 27.3 | — | ✅ | — |
| L5 | 2 | PRESTIGE ALWAYS | 5.6 | 20.6 | 3.8 | ✅ | **1st** |
| — | 10 | — | low | low | **97** | ❌ | **2nd** |
Pattern: banker #1 (MC 38%, market fav) failed to place. #2 (in pool) won, #8 (in pool) 3rd — but a **97-1 (#10)** placed 2nd. Unfixable.

### R7 (C4 1600) — Result 3,6,5 | MISS
| Seq | # | Horse | Win% | Plc% | SP | Pool | Finished |
|-----|---|-------|------|------|----|----|----------|
| ★ | 1 | MIGHTY STEED | 40.1 | 72.5 | — | ✅ | out |
| L1 | 3 | PACKING FIGHTER | 18.3 | 48.9 | 2.3 | ✅ | **1st** |
| L2 | 5 | ABSOLUTE HONOUR | 9.0 | 33.2 | 11 | ✅ | **3rd** |
| L3 | 8 | LOVELY MILES | 6.6 | 25.1 | — | ✅ | — |
| L4 | 10 | SMART FAT CAT | 4.2 | 18.3 | 3.4 | ✅(swap) | 4th |
| — | 6 | — | low | low | **93** | ❌ | **2nd** |
Pattern: **the flagged EXTREME divergence resolved against MC.** Banker #1 (MC 40% vs market 16) failed; market-fav #3 won. Legs #3+#5 nailed 1st/3rd — only a 93-1 (#6) 2nd killed it. The PASS warning was correct.

### R8 (C1 1600) — Result 2,12,9 | MISS
| Seq | # | Horse | Win% | Plc% | SP | Pool | Finished |
|-----|---|-------|------|------|----|----|----------|
| ★ | 4 | SOLEIL FIGHTER | 35.2 | 68.9 | 5.4 | ✅ | 4th |
| L1 | 8 | PACKING ANGEL | 14.8 | 43.7 | — | ✅ | — |
| L2 | 6 | HELENE FEELING | 12.7 | 38.7 | — | ✅ | — |
| L3 | 5 | SAGACIOUS LIFE | 10.0 | 34.0 | — | ✅ | — |
| L4 | 2 | BEAUTY JOY | 9.7 | 34.1 | 10 | ✅ | **1st** |
| L5 | 3 | MASSIVE SOVEREIGN | low | low | — | ✅(swap) | — |
| — | 12 | — | low | low | **12** | ❌ | **2nd** |
| — | 9 | — | 7.5(#12seq) | — | 5.4 | ❌ | **3rd** |
Pattern: banker 4th; #2 (in pool) won but #12 (12) and #9 (5.4) placed from outside. #9 at 5.4 was a coverable short price the pool missed — argues wider C1 pools.

### R9 (C3 1200) — Result 5,1,8 | MISS
| Seq | # | Horse | Win% | Plc% | SP | Pool | Finished |
|-----|---|-------|------|------|----|----|----------|
| ★ | 1 | CROSSBORDER PEGASUS | 36.6 | 73.3 | 3.0 | ✅ | 2nd |
| L1 | 4 | GOLD PATCH | 26.8 | 65.0 | — | ✅ | — |
| L2 | 2 | AURORA PATCH | 10.8 | 39.4 | — | ✅ | — |
| L3 | 3 | LADY'S CHOICE | 7.8 | 30.4 | — | ✅ | — |
| L4 | 8 | PACKING KING | 5.4 | 25.4 | 8.6 | ✅ | **3rd** |
| L5 | 7 | FLYING FORTRESS | 4.9 | 22.2 | — | ✅ | — |
| — | 5 | — | low | low | **12** | ❌ | **1st** |
Pattern: banker 2nd + #8 3rd — two of three in pool. #5 (12) won from outside. Coverable-ish price missed; strong top pair otherwise correct.

### R10 (C3 1600) — Result 13,4,12 | MISS (Pattern A — all placers in B legs)
| Seq | # | Horse | Win% | Plc% | SP | Pool | Finished |
|-----|---|-------|------|------|----|----|----------|
| ★ | 1 | ENDUED | 30.4 | 62.5 | — | ✅ | out |
| L1 | 8 | AEROVOLANIC | 17.9 | 47.2 | — | ✅ | — |
| L2 | 4 | LUCKY SAM GOR | 15.2 | 42.6 | 15 | ✅ | **2nd** |
| L3 | 5 | SMART AVENUE | 7.8 | 27.7 | — | ✅ | — |
| L4 | 3 | SKY VINO | 6.6 | 24.3 | — | ✅ | — |
| L5 | 12 | BIG RETURN | 5.2 | 20.2 | 5.0 | ✅(swap) | **3rd** |
| L6 | 13 | COMPLETE UNKNOWN | low | low | 5.3 | ✅(swap) | **1st** |
| L7 | 9 | FORTUNE BOY | low | low | 9.0 | ✅(swap) | — |
Pattern: **all three placers (#13,#4,#12) were in B's widened 7-leg pool** — only the failed MC#1 banker (#1) prevented the hit. Textbook case for banker flexibility on flat fields. The odds-swaps (#12,#13,#9) were all correct signals.

### R11 (C3 1400) — Result 3,12,4 | MISS
| Seq | # | Horse | Win% | Plc% | SP | Pool | Finished |
|-----|---|-------|------|------|----|----|----------|
| ★ | 1 | SUPER EXPRESS | 46.9 | 79.0 | — | ✅ | out |
| L1 | 2 | LOVERO | 14.3 | 45.8 | — | ✅ | — |
| L2 | 9 | MONARCH COUNTY | 12.2 | 41.1 | 7.8 | ✅ | 4th |
| L3 | 6 | ALMIGHTY LIGHTNING | 4.0 | 20.1 | — | ✅ | — |
| L4 | 8 | MEANINGFUL DRAGON | 4.3 | 19.5 | 8.6 | ✅(swap) | — |
| L5 | 12 | COME FAST FAY FAY | 3.7 | 19.7 | 12 | ✅(swap) | **2nd** |
| — | 3 | — | low | low | **16** | ❌ | **1st** |
| — | 4 | — | low | low | **49** | ❌ | **3rd** |
Pattern: banker #1 (MC 47%, heavy fav) failed. Winner #3 (16) and 3rd #4 (49) both outside pool → $8,455 Trio. Genuine blowout; only #12 (swap) placed. Unfixable.

## B Banker Performance

| R | Banker (MC#1) | MC Win% | SP | Placed? | Position |
|---|---------------|---------|----|---------|----------|
| 1 | #2 | 51.9 | 13 | ✅ | 3rd |
| 2 | #7 | 29.1 | 2.8 | ✅ | 1st |
| 3 | #10 | 24.3 | 3.6 | ✅ | 3rd |
| 4 | #6 | 26.4 | 16 | ❌ | 4th |
| 5 | #1 | 34.1 | 3.2 | ✅ | 3rd |
| 6 | #1 | 37.9 | 3.8→out | ❌ | out |
| 7 | #1 | 40.1 | 16 | ❌ | out |
| 8 | #4 | 35.2 | 5.4 | ❌ | 4th |
| 9 | #1 | 36.6 | 3.0 | ✅ | 2nd |
| 10 | #1 | 30.4 | — | ❌ | out |
| 11 | #1 | 46.9 | — | ❌ | out |

**B banker top-3: 5/11 = 45.5%.** Same as A (identical bankers). The cold banker sample is the whole story of the meeting.
