# MC #1 Place Consecutive All-Up Strategy — Cross-Meeting Summary

## Strategy

- **Selection**: Pick the **#1 horse by MC Win%** (raw ranking, no adjustments) for each race
- **Bet**: Place all-up (consecutive races only)
- **Formula**: Nx1 — N consecutive race selections; each leg must **receive an HKJC Place dividend** (field-size rules apply — e.g. **≤6** runners → **2** places only, so **3rd** pays **$0**)
- **Stake**: $10 per all-up combination
- **Return**: Div₁ × Div₂ × ... × Divₙ / 10^(N-1) using official **Place $** for that finisher from results JSON
- **Legs tested**: 2, 3, 4, 5, 6

---

## Meeting Placing Patterns

| Meeting | Date       | Venue  | Course    | Going        | Races  | Avg Win%  | Avg Place% | Placed   | Rate      | Pattern         | Max Streak    |
| ------- | ---------- | ------ | --------- | ------------ | ------ | --------- | ---------- | -------- | --------- | --------------- | ------------- |
| 1       | 18 Mar     | HV     | Turf      | Good to Firm | 9      | 38.6%     | 71.9%      | 7/9      | 77.8%     | ✅❌✅✅✅✅❌✅✅       | 4 (R3-R6)     |
| 2       | 22 Mar     | ST     | Turf      | Good → G/F   | 10     | 27.9%     | 61.3%      | 8/10     | 80.0%     | ❌✅✅❌✅✅✅✅✅✅      | 6 (R5-R10)    |
| 3       | 25 Mar     | HV     | Turf      | Good         | 9      | 29.5%     | 61.2%      | 6/9      | 66.7%     | ✅❌❌✅✅✅✅❌✅       | 4 (R4-R7)     |
| 4       | 29 Mar     | ST     | Turf      | Good to Firm | 11     | 31.5%     | 66.5%      | 7/11     | 63.6%     | ❌✅❌✅✅✅❌✅❌✅✅     | 3 (R4-R6)     |
| 5       | 1 Apr      | ST     | AWT       | Good         | 9      | 48.9%     | 82.4%      | 4/9      | 44.4%     | ❌✅❌✅✅❌❌✅❌       | 2 (R4-R5)     |
| 6       | 6 Apr      | ST     | Turf      | Good         | 11     | 48.1%     | 83.6%      | 8/11     | 72.7%     | ✅❌✅✅✅✅✅❌❌✅✅     | 5 (R3-R7)     |
| 7       | 8 Apr      | HV     | Turf      | Good         | 9      | 37.7%     | 73.7%      | 3/9      | 33.3%     | ❌❌❌❌✅✅✅❌❌       | 3 (R5-R7)     |
| **8**   | **12 Apr** | **ST** | **Turf**  | **Good**     | **11** | **40.3%** | **77.1%**  | **6/11** | **54.5%** | **❌✅❌❌✅✅✅✅✅❌❌** | **5 (R5-R9)** |
| **9**   | **15 Apr** | **HV** | **Turf**  | **Good**     | **9**  | **41.2%** | **74.8%**  | **5/9**  | **55.6%** | **✅❌❌✅✅❌✅❌✅**   | **2 (R4-R5)** |
| **10**  | **19 Apr** | **ST** | **Mixed** | **Good/G-F** | **11** | **46.3%** | **83.1%**  | **5/11** | **45.5%** | **❌✅❌❌✅❌✅✅❌✅❌** | **2 (R7-R8)** |
| **11**  | **22 Apr** | **HV** | **Turf**  | **Good/G-F** | **9**  | **34.5%** | **67.4%**  | **8/9**  | **88.9%** | **✅❌✅✅✅✅✅✅✅**   | **7 (R3-R9)** |
| **12**  | **26 Apr** | **ST** | **Turf**  | **Good/G-F** | **11** | **39.2%** | **76.1%**  | **6/11** | **54.5%** | **❌✅✅✅✅❌❌❌✅❌✅** | **4 (R2-R5)** |
|         |            |        |           |              |        |           |            |          |           |                 |               |
|         |            |        |           |              |        |           |            |          |           |                 |               |

\*Meeting 8 **R1** (6 runners): MC #1 **#6** ran **3rd** but HKJC Place pool pays **two** places only → **$0** dividend; counts as **❌** for streaks and all-ups (same dividend logic as other meetings).

---

## Meeting 1: Happy Valley | 18 Mar 2026 (9 races)

**MC #1** = raw MC Win% rank from `mc_top1_place_bet_summary.md`. **Results** from `data/historical/results_20260318_HV.json`.

| Race | Class   | Dist (m) | MC #1              | MC Win% | MC Place% | Placed? | Place $ (if placed) |     |
| ---- | ------- | -------- | ------------------ | ------- | --------- | ------- | ------------------- | --- |
| R1   | Class 5 | 1650     | #10 DRAGON SUNRISE | 30.5%   | 62.8%     | ✅ 3rd   | $15.50              |     |
| R2   | Class 4 | 1650     | #7 INNO SUPER      | 32.1%   | 66.6%     | ❌ (8th) | —                   |     |
| R3   | Class 4 | 1000     | #3 BEAUTY THUNDER  | 43.3%   | 75.3%     | ✅ 2nd   | $15.50              |     |
| R4   | Class 4 | 1200     | #2 SUPERB KING     | 28.7%   | 60.7%     | ✅ 2nd   | $15.50              |     |
| R5   | Class 4 | 1200     | #5 RAINBOW SEVEN   | 46.7%   | 80.3%     | ✅ 2nd   | $11.50              |     |
| R6   | Class 4 | 1800     | #3 ACE WAR         | 54.1%   | 83.3%     | ✅ 1st   | $12.00              |     |
| R7   | Class 2 | 1200     | #1 COLOURFUL KING  | 38.5%   | 75.4%     | ❌ (6th) | —                   |     |
| R8   | Class 3 | 1200     | #7 AURIO           | 34.1%   | 65.0%     | ✅ 1st   | $14.00              |     |
| R9   | Class 3 | 1650     | #1 MAX QUE         | 39.5%   | 77.7%     | ✅ 3rd   | $12.50              |     |

Place dividends: R1=$15.50, R3=$15.50, R4=$15.50, R5=$11.50, R6=$12.00, R8=$14.00, R9=$12.50

### 2-Leg (8 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 1 | R1+R2 | ❌ | $0 |
| 2 | R2+R3 | ❌ | $0 |
| 3 | R3+R4 | ✅ | $24.03 |
| 4 | R4+R5 | ✅ | $17.83 |
| 5 | R5+R6 | ✅ | $13.80 |
| 6 | R6+R7 | ❌ | $0 |
| 7 | R7+R8 | ❌ | $0 |
| 8 | R8+R9 | ✅ | $17.50 |

### 3-Leg (7 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 3 | R3+R4+R5 | ✅ | $27.63 |
| 4 | R4+R5+R6 | ✅ | $21.39 |
| Others | — | ❌ | $0 |

### 4-Leg (6 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 3 | R3+R4+R5+R6 | ✅ | $33.15 |
| Others | — | ❌ | $0 |

### 5-Leg+: All lose (max streak = 4)

| Legs | Bets | Staked | Winners | Returned | P&L | ROI |
|------|------|--------|---------|----------|-----|-----|
| 1 | 9 | $90 | 7 | $96.50 | +$6.50 | +7.2% |
| 2 | 8 | $80 | 4 | $73.16 | -$6.84 | -8.6% |
| 3 | 7 | $70 | 2 | $49.02 | -$20.98 | -30.0% |
| 4 | 6 | $60 | 1 | $33.15 | -$26.85 | -44.8% |
| 5 | 5 | $50 | 0 | $0 | -$50.00 | -100% |
| 6 | 4 | $40 | 0 | $0 | -$40.00 | -100% |

**Observation:** Despite 7/9 placing, the low dividends (all $11-$16 range) meant compounding barely exceeded break-even. The 2-leg all-up actually lost money because the streak dividends weren't large enough to compensate for the 4 losing bets.

---

## Meeting 2: Sha Tin | 22 Mar 2026 (10 races)

**MC #1** = raw MC Win% rank from `mc_top1_place_bet_summary.md`. **Results** from `data/historical/results_20260322_ST.json`.

| Race | Class   | Dist (m) | MC #1               | MC Win% | MC Place% | Placed?  | Place $ (if placed) |     |
| ---- | ------- | -------- | ------------------- | ------- | --------- | -------- | ------------------- | --- |
| R1   | Class 4 | 1600     | #5 GLORIOUS SUCCESS | 18.7%   | 45.1%     | ❌ (12th) | —                   |     |
| R2   | Class 4 | 1200     | #1 BABY SAKURA      | 24.6%   | 59.4%     | ✅ 3rd    | $10.50              |     |
| R3   | Class 3 | 1200     | #9 CIRCUIT CHAMPION | 45.5%   | 79.4%     | ✅ 1st    | $10.10              |     |
| R4   | Class 4 | 1200     | #5 HAPPY SHOOTER    | 25.7%   | 59.1%     | ❌ (8th)  | —                   |     |
| R5   | Class 4 | 1400     | #1 AEROINVINCIBLE   | 28.6%   | 63.0%     | ✅ 1st    | $22.00              |     |
| R6   | Class 3 | 1200     | #4 HOT DELIGHT      | 42.6%   | 87.0%     | ✅ 1st    | $10.10              |     |
| R7   | Group 1 | 2000     | #3 STORMY GROVE     | 21.2%   | 49.4%     | ✅ 3rd    | $22.50              |     |
| R8   | Class 3 | 1800     | #5 MONEY CATCHER    | 19.7%   | 48.0%     | ✅ 3rd    | $40.00              |     |
| R9   | Class 3 | 1400     | #9 AEROVOLANIC      | 30.7%   | 68.8%     | ✅ 1st    | $14.00              |     |
| R10  | Class 2 | 1400     | #12 SIX PACK        | 21.7%   | 53.6%     | ✅ 2nd    | $15.50              |     |

Place dividends: R2=$10.50, R3=$10.10, R5=$22.00, R6=$10.10, R7=$22.50, R8=$40.00, R9=$14.00, R10=$15.50

### 2-Leg (9 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 1 | R1+R2 | ❌ | $0 |
| 2 | R2+R3 | ✅ | $10.61 |
| 3 | R3+R4 | ❌ | $0 |
| 4 | R4+R5 | ❌ | $0 |
| 5 | R5+R6 | ✅ | $22.22 |
| 6 | R6+R7 | ✅ | $22.73 |
| 7 | R7+R8 | ✅ | $90.00 |
| 8 | R8+R9 | ✅ | $56.00 |
| 9 | R9+R10 | ✅ | $21.70 |

### 3-Leg (8 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 5 | R5+R6+R7 | ✅ | $49.99 |
| 6 | R6+R7+R8 | ✅ | $90.90 |
| 7 | R7+R8+R9 | ✅ | $126.00 |
| 8 | R8+R9+R10 | ✅ | $86.80 |
| Others | — | ❌ | $0 |

### 4-Leg (7 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 5 | R5+R6+R7+R8 | ✅ | $199.98 |
| 6 | R6+R7+R8+R9 | ✅ | $127.26 |
| 7 | R7+R8+R9+R10 | ✅ | $195.30 |
| Others | — | ❌ | $0 |

### 5-Leg (6 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 5 | R5+R6+R7+R8+R9 | ✅ | $279.97 |
| 6 | R6+R7+R8+R9+R10 | ✅ | $197.25 |
| Others | — | ❌ | $0 |

### 6-Leg (5 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 5 | R5+R6+R7+R8+R9+R10 | ✅ | $433.96 |
| Others | — | ❌ | $0 |

| Legs | Bets | Staked | Winners | Returned | P&L      | ROI     |
| ---- | ---- | ------ | ------- | -------- | -------- | ------- |
| 1    | 10   | $100   | 8       | $144.70  | +$44.70  | +44.7%  |
| 2    | 9    | $90    | 6       | $223.26  | +$133.26 | +148.1% |
| 3    | 8    | $80    | 4       | $353.69  | +$273.69 | +342.1% |
| 4    | 7    | $70    | 3       | $522.54  | +$452.54 | +646.5% |
| 5    | 6    | $60    | 2       | $477.22  | +$417.22 | +695.4% |
| 6    | 5    | $50    | 1       | $433.96  | +$383.96 | +768.0% |

**Observation:** The best all-up meeting by far. The 6-race streak (R5-R10) with R8 MONEY CATCHER's $40.00 Place dividend created explosive compounding. Every leg count was profitable. R7+R8 alone returned $90 on a $10 2-leg all-up (9x).

---

## Meeting 3: Happy Valley | 25 Mar 2026 (9 races)

**MC #1** = raw MC Win% rank from `mc_top1_place_bet_summary.md`. **Results** from `data/historical/results_20260325_HV.json`.

| Race | Class   | Dist (m) | MC #1               | MC Win% | MC Place% | Placed? | Place $ (if placed) |     |
| ---- | ------- | -------- | ------------------- | ------- | --------- | ------- | ------------------- | --- |
| R1   | Class 5 | 2200     | #2 MANAGEMENT FOLKS | 24.6%   | 55.5%     | ✅ 3rd   | $22.00              |     |
| R2   | Class 4 | 1650     | #1 RAGGA BOMB       | 28.6%   | 59.9%     | ❌ (7th) | —                   |     |
| R3   | Class 4 | 1200     | #6 BITS SUPERSTAR   | 34.1%   | 69.8%     | ❌ (5th) | —                   |     |
| R4   | Class 4 | 1650     | #5 HARMONY GALAXY   | 23.7%   | 58.1%     | ✅ 3rd   | $47.00              |     |
| R5   | Class 3 | 1000     | #1 HORSEPOWER       | 20.1%   | 50.1%     | ✅ 2nd   | $26.00              |     |
| R6   | Class 4 | 1200     | #3 KING PROFIT      | 24.3%   | 55.1%     | ✅ 2nd   | $13.00              |     |
| R7   | Class 4 | 1200     | #2 GIANT BALLON     | 47.3%   | 79.3%     | ✅ 1st   | $13.50              |     |
| R8   | Class 3 | 1650     | #8 CALIFORNIA MOXIE | 45.5%   | 78.6%     | ❌ (6th) | —                   |     |
| R9   | Class 3 | 1200     | #5 AMAZING KID      | 17.5%   | 44.0%     | ✅ 3rd   | $24.00              |     |

Place dividends: R1=$22.00, R4=$47.00, R5=$26.00, R6=$13.00, R7=$13.50, R9=$24.00

### 2-Leg (8 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 4 | R4+R5 | ✅ | $122.20 |
| 5 | R5+R6 | ✅ | $33.80 |
| 6 | R6+R7 | ✅ | $17.55 |
| Others | — | ❌ | $0 |

### 3-Leg (7 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 4 | R4+R5+R6 | ✅ | $158.86 |
| 5 | R5+R6+R7 | ✅ | $45.63 |
| Others | — | ❌ | $0 |

### 4-Leg (6 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 4 | R4+R5+R6+R7 | ✅ | $214.46 |
| Others | — | ❌ | $0 |

### 5-Leg+: All lose (max streak = 4)

| Legs | Bets | Staked | Winners | Returned | P&L      | ROI     |
| ---- | ---- | ------ | ------- | -------- | -------- | ------- |
| 1    | 9    | $90    | 6       | $145.50  | +$55.50  | +61.7%  |
| 2    | 8    | $80    | 3       | $173.55  | +$93.55  | +116.9% |
| 3    | 7    | $70    | 2       | $204.49  | +$134.49 | +192.1% |
| 4    | 6    | $60    | 1       | $214.46  | +$154.46 | +257.4% |
| 5    | 5    | $50    | 0       | $0       | -$50.00  | -100%   |
| 6    | 4    | $40    | 0       | $0       | -$40.00  | -100%   |

**Observation:** R4 HARMONY GALAXY's $47.00 dividend (16x odds) was the profit engine. The R4+R5 2-leg all-up alone returned $122.20 — a 12.2x return on $10. The 4-leg window (R4-R7) captured one massive combo ($214.46) but 5+ legs failed because R8 broke the streak.

---

## Meeting 4: Sha Tin | 29 Mar 2026 (11 races)

**MC #1** = raw MC Win% rank from `mc_top1_place_bet_summary.md`. **Results** from `data/historical/results_20260329_ST.json`.

| Race | Class   | Dist (m) | MC #1              | MC Win% | MC Place% | Placed?  | Place $ (if placed) |     |
| ---- | ------- | -------- | ------------------ | ------- | --------- | -------- | ------------------- | --- |
| R1   | Class 5 | 1400     | #11 HE WAS ME      | 21.7%   | 52.0%     | ❌ (8th)  | —                   |     |
| R2   | Class 4 | 1400     | #13 SHOTGUN        | 32.0%   | 63.6%     | ✅ 1st    | $12.50              |     |
| R3   | Class 4 | 2000     | #6 STORM RUNNER    | 31.4%   | 67.5%     | ❌ (12th) | —                   |     |
| R4   | Class 2 | 1600     | #9 MAX QUE         | 35.7%   | 78.1%     | ✅ 1st    | $12.00              |     |
| R5   | Class 4 | 1000     | #4 RUN RUN SUNRISE | 33.2%   | 70.7%     | ✅ 2nd    | $18.50              |     |
| R6   | Class 4 | 1400     | #3 CIRCUIT FIERY   | 44.3%   | 80.0%     | ✅ 3rd    | $17.50              |     |
| R7   | Class 4 | 1200     | #4 WARRIORS DREAM  | 34.6%   | 66.8%     | ❌ (5th)  | —                   |     |
| R8   | Class 3 | 1400     | #1 SALON S         | 26.6%   | 59.5%     | ✅ 1st    | $10.10              |     |
| R9   | Class 2 | 1200     | #6 MAGNIFIQUE      | 28.7%   | 66.4%     | ❌ (9th)  | —                   |     |
| R10  | Class 3 | 1200     | #1 HAPPY INDEX     | 27.2%   | 60.7%     | ✅ 3rd    | $18.50              |     |
| R11  | Class 3 | 1600     | #8 CHINA WIN       | 30.9%   | 66.4%     | ✅ 3rd    | $25.50              |     |

Place dividends: R2=$12.50, R4=$12.00, R5=$18.50, R6=$17.50, R8=$10.10, R10=$18.50, R11=$25.50

### 2-Leg (10 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 4 | R4+R5 | ✅ | $22.20 |
| 5 | R5+R6 | ✅ | $32.38 |
| 10 | R10+R11 | ✅ | $47.18 |
| Others | — | ❌ | $0 |

### 3-Leg (9 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 4 | R4+R5+R6 | ✅ | $38.85 |
| Others | — | ❌ | $0 |

### 4-Leg+: All lose (max streak = 3)

| Legs | Bets | Staked | Winners | Returned | P&L | ROI |
|------|------|--------|---------|----------|-----|-----|
| 1 | 11 | $110 | 7 | $114.60 | +$4.60 | +4.2% |
| 2 | 10 | $100 | 3 | $101.76 | +$1.76 | +1.8% |
| 3 | 9 | $90 | 1 | $38.85 | -$51.15 | -56.8% |
| 4 | 8 | $80 | 0 | $0 | -$80.00 | -100% |
| 5 | 7 | $70 | 0 | $0 | -$70.00 | -100% |
| 6 | 6 | $60 | 0 | $0 | -$60.00 | -100% |

**Observation:** Short max streak (3) limits the all-up strategy severely. Only 2-leg was marginally profitable. The separated R10+R11 streak ($47.18 return) was the best single all-up, driven by CHINA WIN's $25.50 dividend.

---

## Meeting 5: Sha Tin | 1 Apr 2026 (9 races — ALL AWT)

**MC #1** = raw MC Win% rank from `mc_top1_place_bet_summary.md`. **Results** from `data/historical/results_20260401_ST.json`.

| Race | Class   | Dist (m) | MC #1                | MC Win% | MC Place% | Placed?  | Place $ (if placed) |     |
| ---- | ------- | -------- | -------------------- | ------- | --------- | -------- | ------------------- | --- |
| R1   | Class 5 | 1200     | #3 ONLY U            | 65.0%   | 92.7%     | ❌ (10th) | —                   |     |
| R2   | Class 5 | 1650     | #8 HAILTOTHEVICTORS  | 23.5%   | 58.8%     | ✅ 1st    | $22.50              |     |
| R3   | Class 4 | 1650     | #4 NEVER PETER OUT   | 65.6%   | 90.5%     | ❌ (5th)  | —                   |     |
| R4   | Class 4 | 1200     | #3 FLOWING RICHES    | 28.7%   | 68.2%     | ✅ 3rd    | $24.50              |     |
| R5   | Class 4 | 1800     | #5 HAPPY UNIVERSE    | 33.3%   | 79.0%     | ✅ 1st    | $22.00              |     |
| R6   | Class 4 | 1200     | #3 ONE MAN SHOW      | 73.1%   | 95.5%     | ❌ (5th)  | —                   |     |
| R7   | Class 4 | 1200     | #5 LIGHT YEARS GLORY | 39.0%   | 80.6%     | ❌ (4th)  | —                   |     |
| R8   | Class 3 | 1200     | #4 VICTORY SKY       | 58.0%   | 90.7%     | ✅ 1st    | $12.00              |     |
| R9   | Class 3 | 1650     | #9 NEZHA             | 54.0%   | 85.2%     | ❌ (7th)  | —                   |     |

Place dividends: R2=$22.50, R4=$24.50, R5=$22.00, R8=$12.00

### 2-Leg (8 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 4 | R4+R5 | ✅ | $53.90 |
| Others | — | ❌ | $0 |

### 3-Leg+: All lose (max streak = 2)

| Legs | Bets | Staked | Winners | Returned | P&L | ROI |
|------|------|--------|---------|----------|-----|-----|
| 1 | 9 | $90 | 4 | $81.00 | -$9.00 | -10.0% |
| 2 | 8 | $80 | 1 | $53.90 | -$26.10 | -32.6% |
| 3 | 7 | $70 | 0 | $0 | -$70.00 | -100% |
| 4 | 6 | $60 | 0 | $0 | -$60.00 | -100% |
| 5 | 5 | $50 | 0 | $0 | -$50.00 | -100% |
| 6 | 4 | $40 | 0 | $0 | -$40.00 | -100% |

**Observation:** Worst all-up meeting. The scattered AWT placing pattern (max streak 2) destroyed all multi-leg strategies. Even the lone 2-leg winner (R4+R5 = $53.90) couldn't offset 7 losing bets.

---

## Meeting 6: Sha Tin | 6 Apr 2026 (11 races)

**MC #1** = raw MC Win% rank from `mc_top1_place_bet_summary.md`. **Results** from `data/historical/results_20260406_ST.json`.

| Race | Class   | Dist (m) | MC #1                 | MC Win% | MC Place% | Placed?  | Place $ (if placed) |     |
| ---- | ------- | -------- | --------------------- | ------- | --------- | -------- | ------------------- | --- |
| R1   | Class 4 | 1000     | #1 ALMIGHTY LIGHTNING | 78.6%   | 96.1%     | ✅ 2nd    | $10.10              |     |
| R2   | Class 5 | 1200     | #8 KING ALLOY         | 41.3%   | 82.5%     | ❌ (4th)  | —                   |     |
| R3   | Class 4 | 1600     | #1 MR COOL            | 60.7%   | 92.8%     | ✅ 3rd    | $16.50              |     |
| R4   | Class 4 | 1400     | #3 ROBOT STAR         | 39.0%   | 82.8%     | ✅ 2nd    | $23.50              |     |
| R5   | Class 4 | 1200     | #3 THOUSAND SPIRIT    | 50.7%   | 90.0%     | ✅ 1st    | $38.00              |     |
| R6   | Class 3 | 1000     | #1 GLOWING PRAISES    | 52.7%   | 90.2%     | ✅ 2nd    | $15.50              |     |
| R7   | Group 1 | 1200     | #1 KA YING RISING     | 23.4%   | 60.3%     | ✅ 1st    | $10.10              |     |
| R8   | Class 3 | 1400     | #1 LUCY IN THE SKY    | 48.4%   | 84.7%     | ❌ (8th)  | —                   |     |
| R9   | Group 1 | 1600     | #12 PATCH OF THETA    | 32.0%   | 68.9%     | ❌ (10th) | —                   |     |
| R10  | Class 2 | 1400     | #8 SIX PACK           | 63.8%   | 93.2%     | ✅ 3rd    | $12.00              |     |
| R11  | Class 3 | 2000     | #3 LIVEANDLETLIVE     | 38.1%   | 78.6%     | ✅ 2nd    | $16.50              |     |

Place dividends: R1=$10.10, R3=$16.50, R4=$23.50, R5=$38.00, R6=$15.50, R7=$10.10, R10=$12.00, R11=$16.50

### 2-Leg (10 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 3 | R3+R4 | ✅ | $38.78 |
| 4 | R4+R5 | ✅ | $89.30 |
| 5 | R5+R6 | ✅ | $58.90 |
| 6 | R6+R7 | ✅ | $15.66 |
| 10 | R10+R11 | ✅ | $19.80 |
| Others | — | ❌ | $0 |

### 3-Leg (9 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 3 | R3+R4+R5 | ✅ | $147.35 |
| 4 | R4+R5+R6 | ✅ | $138.42 |
| 5 | R5+R6+R7 | ✅ | $59.49 |
| Others | — | ❌ | $0 |

### 4-Leg (8 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 3 | R3+R4+R5+R6 | ✅ | $228.38 |
| 4 | R4+R5+R6+R7 | ✅ | $139.80 |
| Others | — | ❌ | $0 |

### 5-Leg (7 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 3 | R3+R4+R5+R6+R7 | ✅ | $230.67 |
| Others | — | ❌ | $0 |

### 6-Leg: All lose (max streak = 5)

| Legs | Bets | Staked | Winners | Returned | P&L | ROI |
|------|------|--------|---------|----------|-----|-----|
| 1 | 11 | $110 | 8 | $142.20 | +$32.20 | +29.3% |
| 2 | 10 | $100 | 5 | $222.44 | +$122.44 | +122.4% |
| 3 | 9 | $90 | 3 | $345.26 | +$255.26 | +283.6% |
| 4 | 8 | $80 | 2 | $368.18 | +$288.18 | +360.2% |
| 5 | 7 | $70 | 1 | $230.67 | +$160.67 | +229.5% |
| 6 | 6 | $60 | 0 | $0 | -$60.00 | -100% |

**Observation:** Second-best all-up meeting. The R3-R7 streak (5 races) with THOUSAND SPIRIT's $38.00 dividend powered massive returns. The 4-leg sweet spot ($368.18 returned on $80 staked) delivered +360% ROI.

---

## Meeting 7: Happy Valley | 8 Apr 2026 (9 races)

**Results / Place dividends:** HKJC verified ([results 08/04/2026 HV](https://racing.hkjc.com/zh-hk/local/information/resultsall?racedate=2026/04/08)). MC #1 = raw MC Win% rank from `trio_strategy_20260408_HV_R*.md` (same definition as prior meetings).

| Race | Class   | Dist (m) | MC #1               | MC Win% | MC Place% | Placed? | Place $ (if placed) |     |
| ---- | ------- | -------- | ------------------- | ------- | --------- | ------- | ------------------- | --- |
| R1   | Class 5 | 1200     | #10 ALWAYS MY FOLKS | 27.9%   | 68.6%     | ❌       | —                   |     |
| R2   | Class 4 | 1650     | #5 FORTUNE STAR     | 40.0%   | 82.1%     | ❌ (4th) | —                   |     |
| R3   | Class 4 | 1000     | #2 BEAUTY THUNDER   | 31.9%   | 69.4%     | ❌ (4th) | —                   |     |
| R4   | Class 4 | 1650     | #5 AMAZING AWARD    | 29.1%   | 67.3%     | ❌ (4th) | —                   |     |
| R5   | Class 4 | 1200     | #5 BRIGHT DAY       | 16.4%   | 44.2%     | ✅ 2nd   | $19.50              |     |
| R6   | Class 4 | 1200     | #1 CROSSBORDERDUDE  | 55.6%   | 90.2%     | ✅ 3rd   | $14.00              |     |
| R7   | Class 3 | 1650     | #1 SILVERY BREEZE   | 71.5%   | 95.1%     | ✅ 1st   | $15.00              |     |
| R8   | Class 3 | 1200     | #1 CELESTIAL HERO   | 35.7%   | 78.3%     | ❌       | —                   |     |
| R9   | Class 3 | 1200     | #3 RED SEA          | 31.9%   | 68.3%     | ❌       | —                   |     |

Place dividends: R5=$19.50, R6=$14.00, R7=$15.00

### 2-Leg (8 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 1 | R1+R2 | ❌ | $0 |
| 2 | R2+R3 | ❌ | $0 |
| 3 | R3+R4 | ❌ | $0 |
| 4 | R4+R5 | ❌ | $0 |
| 5 | R5+R6 | ✅ | $27.30 |
| 6 | R6+R7 | ✅ | $21.00 |
| 7 | R7+R8 | ❌ | $0 |
| 8 | R8+R9 | ❌ | $0 |

### 3-Leg (7 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 5 | R5+R6+R7 | ✅ | $40.95 |
| Others | — | ❌ | $0 |

### 4-Leg+: All lose (max streak = 3)

| Legs | Bets | Staked | Winners | Returned | P&L | ROI |
|------|------|--------|---------|----------|-----|-----|
| 1 | 9 | $90 | 3 | $48.50 | -$41.50 | -46.1% |
| 2 | 8 | $80 | 2 | $48.30 | -$31.70 | -39.6% |
| 3 | 7 | $70 | 1 | $40.95 | -$29.05 | -41.5% |
| 4 | 6 | $60 | 0 | $0 | -$60.00 | -100% |
| 5 | 5 | $50 | 0 | $0 | -$50.00 | -100% |
| 6 | 4 | $40 | 0 | $0 | -$40.00 | -100% |

**Observation:** Worst **flat MC #1 Place** session in this series (3/9 = 33.3%) despite **high average MC Place% (73.7%)**. R1–R4 were brutal: short-priced or dominant MC picks missed (three MC #1s ran **4th**). Only **R5–R7** placed — a **low-dividend** streak ($19.50 / $14 / $15), so even the **3-leg** all-up returned only **$40.95** on **$70** staked. Confirms that **streak length without dividend quality** still loses on multi-leg tickets; behaviour is closer to **Meeting 5 (AWT)** in strike rate than to **Meeting 6 (ST)**.

---

## Meeting 8: Sha Tin | 12 Apr 2026 (11 races)

**Results / Place dividends:** `data/historical/results_20260412_ST.json` (scrape `tools/scrape-meeting-results.ts 2026-04-12 ST`). **MC #1** = raw MC Win% rank from `data/reports/trio_strategy_20260412_ST_R*.md` (same definition as prior meetings). **Leg eligible** = horse receives an **HKJC Place** payout (finish position ≤ number of Place dividends on the result).

| Race | Class   | Dist (m) | MC #1                 | MC Win% | MC Place% | Paid Place?                        | Place $ (if paid) |     |
| ---- | ------- | -------- | --------------------- | ------- | --------- | ---------------------------------- | ----------------- | --- |
| R1   | Group 1 | 1000     | #6 TALENTS CHAMPION   | 24.0%   | 60.4%     | ❌ (3rd, **6 runners → 2 places**)  | —                 |     |
| R2   | Class 5 | 1400     | #9 WINNING MACHINE    | 44.1%   | 88.6%     | ✅ 3rd                              | $11.00            |     |
| R3   | Class 5 | 1600     | #1 BEAUTY MISSILE     | 28.8%   | 68.9%     | ❌ (10th)                           | —                 |     |
| R4   | Class 4 | 1400     | #14 THE CONCENTRATION | 34.5%   | 72.5%     | ❌ (7th)                            | —                 |     |
| R5   | Class 4 | 1200     | #1 SPICY STANDARD     | 29.8%   | 71.7%     | ✅ 2nd                              | $13.50            |     |
| R6   | Class 4 | 1200     | #1 BABY SAKURA        | 51.5%   | 84.7%     | ✅ 3rd                              | $10.10            |     |
| R7   | Class 4 | 1400     | #3 FORZA TORO         | 36.0%   | 70.9%     | ✅ 2nd                              | $19.50            |     |
| R8   | Class 3 | 1600     | #7 AMAZING PARTNERS   | 48.7%   | 85.9%     | ✅ 1st                              | $16.50            |     |
| R9   | Class 3 | 1400     | #5 ALL'S WELL         | 41.3%   | 73.4%     | ✅ 3rd                              | $22.50            |     |
| R10  | Class 3 | 1200     | #2 SMART GOLF         | 46.6%   | 82.8%     | ❌ (**SCR** — not in `finishOrder`) | —                 |     |
| R11  | Class 2 | 1200     | #12 PAKISTAN LEGACY   | 57.6%   | 88.3%     | ❌ (11th)                           | —                 |     |

Place dividends (MC #1 when paid): R2=$11.00, R5=$13.50, R6=$10.10, R7=$19.50, R8=$16.50, R9=$22.50

### 2-Leg (10 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 1 | R1+R2 | ❌ | $0 |
| 2 | R2+R3 | ❌ | $0 |
| 3 | R3+R4 | ❌ | $0 |
| 4 | R4+R5 | ❌ | $0 |
| 5 | R5+R6 | ✅ | $13.63 |
| 6 | R6+R7 | ✅ | $19.70 |
| 7 | R7+R8 | ✅ | $32.18 |
| 8 | R8+R9 | ✅ | $37.13 |
| 9 | R9+R10 | ❌ | $0 |
| 10 | R10+R11 | ❌ | $0 |

### 3-Leg (9 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 5 | R5+R6+R7 | ✅ | $26.59 |
| 6 | R6+R7+R8 | ✅ | $32.50 |
| 7 | R7+R8+R9 | ✅ | $72.39 |
| Others | — | ❌ | $0 |

### 4-Leg (8 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 5 | R5+R6+R7+R8 | ✅ | $43.87 |
| 6 | R6+R7+R8+R9 | ✅ | $73.12 |
| Others | — | ❌ | $0 |

### 5-Leg (7 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 5 | R5+R6+R7+R8+R9 | ✅ | $98.71 |
| Others | — | ❌ | $0 |

### 6-Leg: All lose (max paying streak = 5)

| Legs | Bets | Staked | Winners | Returned | P&L     | ROI    |
| ---- | ---- | ------ | ------- | -------- | ------- | ------ |
| 1    | 11   | $110   | 6       | $93.10   | −$16.90 | −15.4% |
| 2    | 10   | $100   | 4       | $102.63  | +$2.63  | +2.6%  |
| 3    | 9    | $90    | 3       | $131.48  | +$41.48 | +46.1% |
| 4    | 8    | $80    | 2       | $116.99  | +$36.99 | +46.2% |
| 5    | 7    | $70    | 1       | $98.71   | +$28.71 | +41.0% |
| 6    | 6    | $60    | 0       | $0       | −$60.00 | −100%  |

**Observation:** **High avg MC Place% (77.1%)** but only **6/11** legs paid Place (**54.5%**): **R1** field-size rule, **R10** scratch on MC #1, plus **R3/R4/R11** out of frame. The **R5–R9** paying streak (**5**) made **2- through 5-leg** all-ups **profitable**; **flat Place** lost (**−$16.90**) on thin divs + misses. Same shape as **Meeting 6** (long turf streak) but weaker than **Meeting 2** (no $40+ leg in the window).

---

## Meeting 9: Happy Valley | 15 Apr 2026 (9 races)

**Results / Place dividends:** `data/historical/results_20260415_HV.json` (scrape `tools/scrape-meeting.ts --date=2026-04-15 --venue=HV`). **MC #1** = top row by **MC Win%** in `data/reports/trio_strategy_20260415_HV_R*.md` (raw MC table). **Leg eligible** = horse receives an **HKJC Place** payout (finish position ≤ number of Place dividends paid for that field size).

| Race | Class   | Dist (m) | MC #1                 | MC Win% | MC Place% | Paid Place? | Place $ (if paid) |     |
| ---- | ------- | -------- | --------------------- | ------- | --------- | ----------- | ----------------- | --- |
| R1   | Class 5 | 1000     | #4 SPICY SPANGLE      | 44.7%   | 84.2%     | ✅ 3rd       | $20.00            |     |
| R2   | Class 5 | 1650     | #8 COURIER MAGIC      | 46.8%   | 87.5%     | ❌ (9th)     | —                 |     |
| R3   | Class 4 | 1650     | #2 WIN EASE           | 27.3%   | 61.1%     | ❌ (12th)    | —                 |     |
| R4   | Class 4 | 1800     | #11 ROMANTIC FANTASY  | 52.5%   | 95.4%     | ✅ 3rd       | $22.00            |     |
| R5   | Class 3 | 1650     | #1 BEAUTY ALLIANCE    | 33.7%   | 74.4%     | ✅ 1st       | $19.00            |     |
| R6   | Class 4 | 1200     | #8 QUARTZ LEGEND      | 32.2%   | 69.0%     | ❌ (5th)     | —                 |     |
| R7   | Class 4 | 1200     | #6 THE HEIR           | 35.5%   | 72.0%     | ✅ 3rd       | $16.50            |     |
| R8   | Class 3 | 1650     | #10 RAGGA BOMB        | 23.6%   | 58.0%     | ❌ (6th)     | —                 |     |
| R9   | Class 3 | 1200     | #12 SOMELOVEFROMABOVE | 37.4%   | 73.6%     | ✅ 3rd       | $17.50            |     |

Place dividends (MC #1 when paid): R1=$20.00, R4=$22.00, R5=$19.00, R7=$16.50, R9=$17.50

### 2-Leg (8 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 1 | R1+R2 | ❌ | $0 |
| 2 | R2+R3 | ❌ | $0 |
| 3 | R3+R4 | ❌ | $0 |
| 4 | R4+R5 | ✅ | $41.80 |
| 5 | R5+R6 | ❌ | $0 |
| 6 | R6+R7 | ❌ | $0 |
| 7 | R7+R8 | ❌ | $0 |
| 8 | R8+R9 | ❌ | $0 |

### 3-Leg+: All lose (max paying streak = 2)

| Legs | Bets | Staked | Winners | Returned | P&L | ROI |
|------|------|--------|---------|----------|-----|-----|
| 1 | 9 | $90 | 5 | $95.00 | +$5.00 | +5.6% |
| 2 | 8 | $80 | 1 | $41.80 | −$38.20 | −47.8% |
| 3 | 7 | $70 | 0 | $0 | −$70.00 | −100% |
| 4 | 6 | $60 | 0 | $0 | −$60.00 | −100% |
| 5 | 5 | $50 | 0 | $0 | −$50.00 | −100% |
| 6 | 4 | $40 | 0 | $0 | −$40.00 | −100% |

**Observation:** **Avg MC Place%** is high (**74.8%**) and **5/9** MC #1s paid Place — but **paying positions are isolated** (**R1** alone, then **R4–R5** back-to-back, then gaps). Only **one** 2-leg all-up wins (**R4+R5** = **$19×$22/10**); seven other 2-leg tickets lose. **Flat Place** is the only leg count **green** on this card. Same lesson as **Meeting 4 / Meeting 5**: **short max streak** caps all-up upside even when single-race strike rate looks acceptable.

---

## Meeting 10: Sha Tin | 19 Apr 2026 (11 races — Mixed AWT/Turf)

**Results / Place dividends:** `data/historical/results_20260419_ST.json` (scrape `tools/scrape-meeting.ts --date=2026-04-19 --venue=ST`). **MC #1** = top row by **MC Win%** in `data/reports/trio_strategy_20260419_ST_R*.md` (raw MC table). **Leg eligible** = horse receives an **HKJC Place** payout (finish position ≤ number of Place dividends paid for that field size).

**Surface split:** R1–R2 AWT (Good), R3–R5 Turf (Good to Firm), R6–R8 AWT (Good), R9–R11 Turf (Good to Firm).

| Race | Class   | Dist (m) | MC #1                | MC Win% | MC Place% | Paid Place? | Place $ (if paid) |     |
| ---- | ------- | -------- | -------------------- | ------- | --------- | ----------- | ----------------- | --- |
| R1   | Class 5 | 1800     | #2 HAILTOTHEVICTORS  | 41.7%   | 83.3%     | ❌ (4th)     | —                 |     |
| R2   | Class 5 | 1200     | #7 NOBLE DELUXE      | 49.6%   | 83.9%     | ✅ 1st       | $30.00            |     |
| R3   | Class 4 | 1000     | #3 ALSONSO           | 66.2%   | 93.2%     | ❌ (4th)     | —                 |     |
| R4   | Class 4 | 1400     | #8 VOYAGE BOSS       | 41.0%   | 77.0%     | ❌ (4th)     | —                 |     |
| R5   | Class 4 | 1600     | #3 MEGA MASTERMIND   | 35.8%   | 68.1%     | ✅ 2nd       | $19.00            |     |
| R6   | Class 4 | 1650     | #1 SUPREME AGILITY   | 34.7%   | 72.5%     | ❌ (4th)     | —                 |     |
| R7   | Class 4 | 1200     | #8 LIGHT YEARS GLORY | 43.1%   | 81.1%     | ✅ 3rd       | $43.00            |     |
| R8   | Class 3 | 1200     | #3 AURORA PATCH      | 49.4%   | 85.7%     | ✅ 2nd       | $11.00            |     |
| R9   | Class 3 | 1400     | #4 AEROVOLANIC       | 48.9%   | 94.2%     | ❌ (6th)     | —                 |     |
| R10  | Class 3 | 1200     | #7 THOUSAND SPIRIT   | 44.4%   | 85.4%     | ✅ 2nd       | $30.50            |     |
| R11  | Class 2 | 1800     | #6 GENTLEMEN LEGACY  | 54.5%   | 89.5%     | ❌ (4th)     | —                 |     |

Place dividends (MC #1 when paid): R2=$30.00, R5=$19.00, R7=$43.00, R8=$11.00, R10=$30.50

### 2-Leg (10 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 7 | R7+R8 | ✅ | $47.30 |
| Others | — | ❌ | $0 |

### 3-Leg+: All lose (max streak = 2)

| Legs | Bets | Staked | Winners | Returned | P&L | ROI |
|------|------|--------|---------|----------|-----|-----|
| 1 | 11 | $110 | 5 | $133.50 | +$23.50 | +21.4% |
| 2 | 10 | $100 | 1 | $47.30 | -$52.70 | -52.7% |
| 3 | 9 | $90 | 0 | $0 | -$90.00 | -100% |
| 4 | 8 | $80 | 0 | $0 | -$80.00 | -100% |
| 5 | 7 | $70 | 0 | $0 | -$70.00 | -100% |
| 6 | 6 | $60 | 0 | $0 | -$60.00 | -100% |

**Observation:** **Highest avg MC Place% of any meeting (83.1%)** yet only **5/11 paid Place (45.5%)** — a glaring MC calibration gap. **Six** MC #1s ran **4th** (R1, R3, R4, R6, R11) or **6th** (R9 AEROVOLANIC, the 2.4 SP bomb). The **R7+R8** paying streak (only 2 races) produced a single **$47.30** 2-leg all-up, powered by LIGHT YEARS GLORY's **$43.00** Place dividend. Without that outlier, even the 2-leg would have been blank. **Flat Place** was the only profitable leg count (**+$23.50** on $110), driven by R7's **$43** and R10's **$30.50**. The mixed AWT/Turf surface scattered the placing pattern — AWT races (R1, R6) and Turf races (R3, R4, R9, R11) both had MC #1 misses. Same short-streak pathology as **M5** and **M9**.

---

## Meeting 11: Happy Valley | 22 Apr 2026 (9 races)

**Results / Place dividends:** `data/historical/results_20260422_HV.json` (scrape `tools/scrape-meeting.ts --date=2026-04-22 --venue=HV`). **MC #1** = top row by **MC Win%** in `data/reports/trio_strategy_20260422_HV_R*.md` (raw MC table). **Leg eligible** = horse receives an **HKJC Place** payout.

| Race | Class   | Dist (m) | MC #1              | MC Win% | MC Place% | Paid Place? | Place $ (if paid) |     |
| ---- | ------- | -------- | ------------------ | ------- | --------- | ----------- | ----------------- | --- |
| R1   | Class 5 | 1200     | #4 NEBRASKAN       | 22.9%   | 53.9%     | ✅ 1st       | $17.50            |     |
| R2   | Class 5 | 1650     | #8 VERBIER         | 26.3%   | 56.8%     | ❌ (4th)     | —                 |     |
| R3   | Class 4 | 1650     | #1 GLORIOUS JOURNEY | 27.5%  | 62.0%     | ✅ 2nd       | $26.00            |     |
| R4   | Class 4 | 1200     | #6 VIGOR EYE       | 34.5%   | 68.2%     | ✅ 1st       | $13.50            |     |
| R5   | Class 4 | 1200     | #1 SPEEDY SMARTIE  | 25.7%   | 56.6%     | ✅ 3rd       | $30.50            |     |
| R6   | Class 4 | 1000     | #3 KING PROFIT     | 31.8%   | 65.7%     | ✅ 1st       | $20.50            |     |
| R7   | Class 3 | 1000     | #10 SKY CAP        | 46.2%   | 82.3%     | ✅ 3rd       | $13.00            |     |
| R8   | Class 3 | 1800     | #11 ACE WAR        | 53.1%   | 85.7%     | ✅ 2nd       | $14.50            |     |
| R9   | Class 3 | 1200     | #1 AURIO           | 42.6%   | 75.6%     | ✅ 2nd       | $13.50            |     |

Place dividends (MC #1 when paid): R1=$17.50, R3=$26.00, R4=$13.50, R5=$30.50, R6=$20.50, R7=$13.00, R8=$14.50, R9=$13.50

### 2-Leg (8 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 1 | R1+R2 | ❌ | $0 |
| 2 | R2+R3 | ❌ | $0 |
| 3 | R3+R4 | ✅ | $35.10 |
| 4 | R4+R5 | ✅ | $41.18 |
| 5 | R5+R6 | ✅ | $62.53 |
| 6 | R6+R7 | ✅ | $26.65 |
| 7 | R7+R8 | ✅ | $18.85 |
| 8 | R8+R9 | ✅ | $19.58 |

### 3-Leg (7 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 3 | R3+R4+R5 | ✅ | $107.06 |
| 4 | R4+R5+R6 | ✅ | $84.41 |
| 5 | R5+R6+R7 | ✅ | $81.28 |
| 6 | R6+R7+R8 | ✅ | $38.64 |
| 7 | R7+R8+R9 | ✅ | $25.45 |
| Others | — | ❌ | $0 |

### 4-Leg (6 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 3 | R3+R4+R5+R6 | ✅ | $219.46 |
| 4 | R4+R5+R6+R7 | ✅ | $109.73 |
| 5 | R5+R6+R7+R8 | ✅ | $117.86 |
| 6 | R6+R7+R8+R9 | ✅ | $52.17 |
| Others | — | ❌ | $0 |

### 5-Leg (5 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 3 | R3+R4+R5+R6+R7 | ✅ | $285.30 |
| 4 | R4+R5+R6+R7+R8 | ✅ | $159.11 |
| 5 | R5+R6+R7+R8+R9 | ✅ | $159.11 |
| Others | — | ❌ | $0 |

### 6-Leg (4 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 3 | R3+R4+R5+R6+R7+R8 | ✅ | $413.69 |
| 4 | R4+R5+R6+R7+R8+R9 | ✅ | $214.80 |
| Others | — | ❌ | $0 |

\*Bonus — **7-Leg** (3 bets): R3+R4+R5+R6+R7+R8+R9 = ✅ **$558.48** return (the only 7-leg window; two others blocked by R2 miss).

| Legs | Bets | Staked | Winners | Returned | P&L      | ROI      |
| ---- | ---- | ------ | ------- | -------- | -------- | -------- |
| 1    | 9    | $90    | 8       | $149.00  | +$59.00  | +65.6%   |
| 2    | 8    | $80    | 6       | $203.89  | +$123.89 | +154.9%  |
| 3    | 7    | $70    | 5       | $336.84  | +$266.84 | +381.2%  |
| 4    | 6    | $60    | 4       | $499.22  | +$439.22 | +732.0%  |
| 5    | 5    | $50    | 3       | $603.52  | +$553.52 | +1107.0% |
| 6    | 4    | $40    | 2       | $628.49  | +$588.49 | +1471.2% |

**Observation:** **Best all-up meeting in the series.** The **7-race paying streak (R3–R9)** is the longest ever recorded — surpassing **M2's 6-race** streak. Despite **moderate avg MC Place% (67.4%)** — the lowest among strong meetings — the MC #1 picks placed in **8/9 races (88.9%)**, the highest rate in the series. Only R2 VERBIER missed (4th). **R5 SPEEDY SMARTIE's $30.50** dividend was the compounding engine — appearing in every winning 3- through 6-leg ticket. All leg counts profitable, every multi-leg returned **3-digit or 4-digit ROI**. The **6-leg** all-up returned **$628.49** on $40 staked — single-handedly flipping the cumulative 6-leg P&L from **−$56** to **+$532**. Confirms pure **HV Turf** as the best surface for this strategy.

---

## Meeting 12: Sha Tin | 26 Apr 2026 (11 races — Champions Day)

**Results / Place dividends:** `data/historical/results_20260426_ST.json` (scrape `tools/scrape-meeting.ts --date=2026-04-26 --venue=ST`). **MC #1** = top row by **MC Win%** in `data/reports/trio_strategy_20260426_ST_R*.md` (raw MC table, **regenerated with `--ignore-records 20260426`**). **Leg eligible** = horse receives an **HKJC Place** payout. Champions Day card includes **3 Group 1 races** (R5, R7, R9).

| Race | Class   | Dist (m) | MC #1                  | MC Win% | MC Place% | Paid Place? | Place $ (if paid) |     |
| ---- | ------- | -------- | ---------------------- | ------- | --------- | ----------- | ----------------- | --- |
| R1   | Class 4 | 1200     | #5 THE HEIR            | 47.1%   | 86.3%     | ❌ (5th)     | —                 |     |
| R2   | Class 4 | 1600     | #6 BIG RETURN          | 28.7%   | 63.9%     | ✅ 1st       | $15.00            |     |
| R3   | Class 4 | 1200     | #13 BETTER AND BETTER  | 34.3%   | 70.3%     | ✅ 2nd       | $19.50            |     |
| R4   | Class 4 | 1400     | #5 KING DANCE          | 36.1%   | 74.4%     | ✅ 1st       | $19.50            |     |
| R5   | Group 1 | 1200     | #1 KA YING RISING      | 37.1%   | 75.8%     | ✅ 1st       | $10.10            |     |
| R6   | Class 3 | 1200     | #6 LIFELINE EXPRESS    | 32.2%   | 71.4%     | ❌ (11th)    | —                 |     |
| R7   | Group 1 | 1600     | #10 INVINCIBLE IBIS    | 24.1%   | 57.2%     | ❌ (4th)     | —                 |     |
| R8   | Class 3 | 1400     | #10 AEROINVINCIBLE     | 48.2%   | 83.0%     | ❌ (4th)     | —                 |     |
| R9   | Group 1 | 2000     | #2 ROMANTIC WARRIOR    | 49.5%   | 92.2%     | ✅ 1st       | $10.10            |     |
| R10  | Class 3 | 1600     | #9 THE GOLDEN KNIGHT   | 42.7%   | 78.2%     | ❌ (11th)    | —                 |     |
| R11  | Class 2 | 1400     | #12 MIGHTY MASTS       | 51.2%   | 83.9%     | ✅ 3rd       | $16.50            |     |

Place dividends (MC #1 when paid): R2=$15.00, R3=$19.50, R4=$19.50, R5=$10.10, R9=$10.10, R11=$16.50

### 2-Leg (10 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 2 | R2+R3 | ✅ | $29.25 |
| 3 | R3+R4 | ✅ | $38.03 |
| 4 | R4+R5 | ✅ | $19.70 |
| Others | — | ❌ | $0 |

### 3-Leg (9 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 2 | R2+R3+R4 | ✅ | $57.04 |
| 3 | R3+R4+R5 | ✅ | $38.41 |
| Others | — | ❌ | $0 |

### 4-Leg (8 bets)

| # | All-Up | Hit? | Return |
|---|--------|------|--------|
| 2 | R2+R3+R4+R5 | ✅ | $57.61 |
| Others | — | ❌ | $0 |

### 5-Leg+: All lose (max streak = 4)

| Legs | Bets | Staked | Winners | Returned | P&L | ROI |
|------|------|--------|---------|----------|-----|-----|
| 1 | 11 | $110 | 6 | $90.70 | −$19.30 | −17.5% |
| 2 | 10 | $100 | 3 | $86.98 | −$13.02 | −13.0% |
| 3 | 9 | $90 | 2 | $95.45 | +$5.45 | +6.1% |
| 4 | 8 | $80 | 1 | $57.61 | −$22.39 | −28.0% |
| 5 | 7 | $70 | 0 | $0 | −$70.00 | −100% |
| 6 | 6 | $60 | 0 | $0 | −$60.00 | −100% |

**Observation:** Dramatically improved vs old MC (which had 3/11 placed, max streak 1, zero all-ups). The **`--ignore-records` fix** changed MC #1 picks in R2 (#4→#6), R3 (#3→#13), R4 (#3→#5), R6 (#3→#6) — all of R2/R3/R4's new picks placed, creating a **4-race paying streak (R2–R5)**. But the Place dividends within this streak are **low** ($15.00, $19.50, $19.50, $10.10) — all favourites or near-favourites. The **3-leg** all-up is the only **profitable** count (+$5.45), while flat Place still loses (−$19.30 on $110). The R6–R8 gap (3 consecutive misses) kills all 5+ leg tickets. Champions Day remains a **below-average** session (6/11 = 54.5%), but no longer the worst — **M7 (3/9 = 33.3%)** holds that distinction.

---

## Cumulative Summary (12 meetings)

### ROI by Leg Count — Per Meeting

| Legs | M1 (18 Mar) | M2 (22 Mar) | M3 (25 Mar) | M4 (29 Mar) | M5 (1 Apr) | M6 (6 Apr) | M7 (8 Apr) | M8 (12 Apr ST) | M9 (15 Apr HV) | M10 (19 Apr ST) | M11 (22 Apr HV) | M12 (26 Apr ST) |
| ---- | ----------- | ----------- | ----------- | ----------- | ---------- | ---------- | ---------- | -------------- | -------------- | --------------- | --------------- | --------------- |
| 1    | +7.2%       | +44.7%      | +61.7%      | +4.2%       | -10.0%     | +29.3%     | -46.1%     | -15.4%         | +5.6%          | +21.4%          | +65.6%          | **−17.5%**      |
| 2    | -8.6%       | +148.1%     | +116.9%     | +1.8%       | -32.6%     | +122.4%    | -39.6%     | +2.6%          | −47.8%         | −52.7%          | +154.9%         | **−13.0%**      |
| 3    | -30.0%      | +342.1%     | +192.1%     | -56.8%      | -100%      | +283.6%    | -41.5%     | +46.1%         | −100%          | −100%           | +381.2%         | **+6.1%**       |
| 4    | -44.8%      | +646.5%     | +257.4%     | -100%       | -100%      | +360.2%    | -100%      | +46.2%         | −100%          | −100%           | +732.0%         | **−28.0%**      |
| 5    | -100%       | +695.4%     | -100%       | -100%       | -100%      | +229.5%    | -100%      | +41.0%         | −100%          | −100%           | +1107.0%        | **−100%**       |
| 6    | -100%       | +768.0%     | -100%       | -100%       | -100%      | -100%      | -100%      | -100%          | −100%          | −100%           | +1471.2%        | **−100%**       |

### P&L by Leg Count — Per Meeting

| Legs | M1     | M2       | M3      | M4     | M5     | M6      | M7      | M8      | M9      | M10     | M11     | M12 (26 Apr ST) | **TOTAL**      |
| ---- | ------ | -------- | ------- | ------ | ------ | ------- | ------- | ------- | ------- | ------- | ------- | --------------- | -------------- |
| 1    | +$6.5  | +$44.7   | +$55.5  | +$4.6  | -$9.0  | +$32.2  | -$41.5  | -$16.90 | +$5.00  | +$23.50 | +$59.00 | **−$19.30**     | **+$144.30**   |
| 2    | -$6.8  | +$133.3  | +$93.6  | +$1.8  | -$26.1 | +$122.4 | -$31.7  | +$2.63  | −$38.20 | −$52.70 | +$123.89 | **−$13.02**    | **+$308.97**   |
| 3    | -$21.0 | +$273.7  | +$134.5 | -$51.2 | -$70.0 | +$255.3 | -$29.05 | +$41.48 | −$70.00 | −$90.00 | +$266.84 | **+$5.45**     | **+$646.03**   |
| 4    | -$26.9 | +$452.5  | +$154.5 | -$80.0 | -$60.0 | +$288.2 | -$60.0  | +$36.99 | −$60.00 | −$80.00 | +$439.22 | **−$22.39**    | **+$982.15**   |
| 5    | -$50.0 | +$417.2  | -$50.0  | -$70.0 | -$50.0 | +$160.7 | -$50.0  | +$28.71 | −$50.00 | −$70.00 | +$553.52 | **−$70.00**    | **+$700.12**   |
| 6    | -$40.0 | +$383.96 | -$40.0  | -$60.0 | -$40.0 | -$60.0  | -$40.0  | -$60.00 | −$40.00 | −$60.00 | +$588.49 | **−$60.00**    | **+$472.45**   |

### Grand Summary Table

| Legs | Total Bets | Total Staked | Total Winners | Hit Rate | Total Returned | Total P&L    | ROI      | Profitable Meetings |
|------|-----------|-------------|---------------|----------|----------------|-------------|----------|---------------------|
| 1 (flat) | 119 | $1,190 | 73 | 61.3% | $1,334.30 | +$144.30 | +12.1% | 8/12 |
| **2** | 107 | $1,070 | 39 | 36.4% | $1,378.97 | +$308.97 | +28.9% | 6/12 |
| **3** | 95 | $950 | 23 | 24.2% | $1,596.03 | +$646.03 | +68.0% | 6/12 |
| **4** | **83** | **$830** | **14** | **16.9%** | **$1,812.15** | **+$982.15** | **+118.3%** | **5/12** |
| **5** | **71** | **$710** | **9** | **12.7%** | **$1,410.12** | **+$700.12** | **+98.6%** | **4/12** |
| **6** | **59** | **$590** | **4** | **6.8%** | **$1,062.45** | **+$472.45** | **+80.1%** | **2/12** |

---

## Analysis

### The 4-Leg Sweet Spot

The **4-leg consecutive all-up** remains the highest cumulative profit (**+$982.15** after **Meeting 12**) and the best ROI among multi-leg counts (**+118.3%** over 12 meetings). M12's `--ignore-records` fix recovered a 4-race streak (R2–R5) that the old MC missed entirely, adding a $57.61 winner but still net negative (−$22.39) due to low dividends. The advantages:

1. **Sufficient compounding**: 4 legs multiply dividends enough to generate outsized returns (individual winners returned $33–$228; the **14** winners across 12 meetings averaged ~$129 each)
2. **Achievable streak requirement**: 7 meetings out of **12** had max **paying** streaks ≥ 4 (M1: 4, M2: 6, M3: 4, M6: 5, M8: 5, M11: 7, **M12: 4**); the other **5** (M4, M5, M7, M9, M10) had streaks ≤ 3
3. **Limited downside**: Only $10 per bet × 6–8 bets per meeting = $60–$80 at risk
4. **Asymmetric payoff**: The **14** winning 4-leg all-ups averaged ~$129.4 return on a $10 stake when they hit

**After M12**: **5-leg** (+98.6% ROI, +$700.12) and **6-leg** (+80.1% ROI, +$472.45) remain profitable but the cushion is thinning — M12's max streak of 4 couldn't reach 5-leg or 6-leg. The 4-leg continues to be the sweet spot.

### Streak Length is Everything

| Max Streak | Meetings | Best Leg Count | Best ROI |
|------------|----------|----------------|----------|
| **7** | **M11** | **6** | **+1471.2%** |
| 6 | M2 | 6 | +768.0% |
| 5 | M6, M8 | 4–5 | +360.2% / M8 +46.2% (4-leg) |
| 4 | M1, M3, **M12** | 3-4 | +192–257%; **M12: 3-leg +6.1%** |
| 3 | M4, M7 | 2 (M4); 3-leg loses (M7) | +1.8%; M7 multi-leg ≈−$211 (2–6 leg) |
| 2 | M5, M9, M10 | 1 (flat) | M5 −10%, M9 +5.6%, M10 +21.4% |

The optimal leg count ≈ max streak − 1. **M12 moved from max streak 1 (old MC) to 4 (new MC)** — recovering from the worst tier to the middle. The R2–R5 streak's low dividends ($15–$19.50) limited compounding, making only **3-leg profitable** (+$5.45). The cumulative 4-leg remains comfortably positive (+$982.15) — the strategy's structural edge continues to hold.

### Risk Profile

| Legs | Avg Loss (losing meeting) | Avg Win (winning meeting) | Win:Loss Ratio |
|------|---------------------------|---------------------------|----------------|
| 2 | −$38.1 (6 meetings) | +$80.0 (6 meetings) | 2.1:1 |
| 3 | −$63.3 (6 meetings) | +$142.8 (6 meetings) | 2.3:1 |
| 4 | −$63.2 (7 meetings) | +$240.9 (5 meetings) | 3.8:1 |
| 5 | −$57.5 (8 meetings) | +$290.0 (4 meetings) | 5.0:1 |
| 6 | −$50.0 (10 meetings) | +$486.2 (2 meetings) | 9.7:1 |

M12's `--ignore-records` fix improved the 2-leg result from −$100 to −$13.02, and the **3-leg flipped from −$90 to +$5.45** — adding M12 to the profitable 3-leg meetings (now 6/12, up from 5/12). The 4-leg added a winner ($57.61) but remained net negative (−$22.39). **Key takeaway**: winning 4-leg meetings remain concentrated in the same **5** meetings (M2/M3/M6/M8/M11) — all pure turf with max streak ≥ 5. M12's streak of 4 with low dividends wasn't quite enough for 4-leg profitability.

### Surface Impact

| Surface | Meetings | Max Streak (avg) | 4-Leg ROI (notes) |
|---------|----------|------------------|-------------------|
| ST Turf (regular) | 5 (M2, M4, M6, M8, **M12**) | ~4.0 | M6 +360%, M8 +46%, M2 +647%; **M12 −28.0%** (Champions Day) |
| HV Turf | 4 (M1, M3, M9, M11) | ~4.3 | M11 +732%, M3 +257%, M1 −45%, M9 −100% |
| AWT (M5) | 1 | 2.0 | −100% |
| Mixed AWT/Turf (M10) | 1 | 2.0 | −100% |

**Meeting 12 (ST Turf, Champions Day) — updated with `--ignore-records`:** With the fix, M12 recovered from worst-ever (3/11, max streak 1) to a **below-average session** (6/11, max streak 4). The R2–R5 streak enabled 2-, 3-, and 4-leg all-ups — 3-leg was even profitable (+6.1%). But Place dividends were uniformly low ($10–$19.50), capping compounding. Champions Day's G1 races remain problematic: R5 and R9 bankers won but at minimum dividends; R7 missed entirely. The meeting is no longer a skip candidate on Place% alone, but its low dividend quality makes it structurally weak for all-ups.

**HV Turf remains the best venue**: M1 (7/9), M3 (6/9), M11 (8/9) — three HV meetings with ≥66.7% strike rate and max streak ≥ 4. Average HV max streak = **4.3** vs ST turf = **4.0**.

The all-up strategy should be **avoided on AWT and mixed-surface meetings** entirely. Champions Day meetings can be played with reduced expectations.

### Dividend Quality Matters

The three best meetings (M2, M6, M11) all featured **dividend diversity within long streaks**:
- M2: R8 MONEY CATCHER $40.00 within a 6-race streak
- M6: R5 THOUSAND SPIRIT $38.00 within a 5-race streak
- M11: R5 SPEEDY SMARTIE $30.50 + R3 GLORIOUS JOURNEY $26.00 within a 7-race streak

**M12 (updated with `--ignore-records`)**: the `--ignore-records` fix dramatically improved M12 from 3/11 (max streak 1) to **6/11 (max streak 4)** — but the **dividend quality problem remains**. The 6 MC #1 placers returned $15.00, $19.50, $19.50, $10.10, $10.10, $16.50 — all favourites or near-favourites. Within the R2–R5 paying streak, the dividends averaged only **$16.03** per $10 stake (cf. M2's streak average ~$21.4, M11's ~$23.3). The 3-leg all-up barely scraped profit (+6.1%) and the 4-leg lost (−28.0%). **Both streak length AND dividend quality are required** — M12 now has decent streak length but still lacks dividend quality, especially in the G1 races (R5 $10.10, R9 $10.10).

---

## Recommendations

- [ ] **Use 4–5 leg consecutive all-ups** as the primary multi-leg strategy — 4-leg leads on absolute P&L (+$902.15) with +108.7% ROI; 5-leg still positive (+98.6%) after 12 meetings
- [ ] **Skip AWT and mixed-surface meetings** for all-up bets — M5 (AWT), M10 (mixed) all max streak ≤ 2; save the exposure
- [ ] **Pair with flat Place bets** for stability — flat Place is profitable **8/12** meetings vs **5/12** for 4-leg all-ups
- [ ] **Suggested combined approach**: $10 flat Place per race + $10 per 4-leg consecutive all-up. On a typical 9-race HV turf meeting: $90 flat + $60 all-ups = $150 total exposure
- [ ] **Monitor live results**: M11 showed that a single R2 miss still leaves a massive 7-race streak from R3 — don't panic-adjust mid-meeting
- [ ] **HV Turf is the best venue**: M1 (7/9), M3 (6/9), M11 (8/9) — three HV meetings, all with ≥66.7% strike rate and max streak ≥ 4. Average HV max streak = **4.3** vs ST turf = **4.0**
- [ ] **6-leg still profitable (+$472.45, +80.1%)**: consider 6-leg at **HV turf meetings** where max streak potential is highest — but keep it off ST and Champions Day meetings
- [ ] **Champions Day / G1 caution**: M12's `--ignore-records` fix improved it significantly (6/11, max streak 4) but dividends are structurally low on G1 races. Play with reduced stake or 3-leg only
- [ ] **CRITICAL — use `--ignore-records` for pre-race MC**: M12's improvement from 3/11 → 6/11 proves that excluding future race results from MC training data is essential for accurate banker selection
