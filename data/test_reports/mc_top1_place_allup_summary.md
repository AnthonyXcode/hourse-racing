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

| Meeting | Date | Venue | Course | Going | Races | Avg Win% | Avg Place% | Placed | Rate | Pattern | Max Streak |
|---------|------|-------|--------|-------|-------|----------|------------|--------|------|---------|------------|
| 1 | 18 Mar | HV | Turf | Good to Firm | 9 | 38.6% | 71.9% | 7/9 | 77.8% | ✅❌✅✅✅✅❌✅✅ | 4 (R3-R6) |
| 2 | 22 Mar | ST | Turf | Good → G/F | 10 | 27.9% | 61.3% | 8/10 | 80.0% | ❌✅✅❌✅✅✅✅✅✅ | 6 (R5-R10) |
| 3 | 25 Mar | HV | Turf | Good | 9 | 29.5% | 61.2% | 6/9 | 66.7% | ✅❌❌✅✅✅✅❌✅ | 4 (R4-R7) |
| 4 | 29 Mar | ST | Turf | Good to Firm | 11 | 31.5% | 66.5% | 7/11 | 63.6% | ❌✅❌✅✅✅❌✅❌✅✅ | 3 (R4-R6) |
| 5 | 1 Apr | ST | AWT | Good | 9 | 48.9% | 82.4% | 4/9 | 44.4% | ❌✅❌✅✅❌❌✅❌ | 2 (R4-R5) |
| 6 | 6 Apr | ST | Turf | Good | 11 | 48.1% | 83.6% | 8/11 | 72.7% | ✅❌✅✅✅✅✅❌❌✅✅ | 5 (R3-R7) |
| 7 | 8 Apr | HV | Turf | Good | 9 | 37.7% | 73.7% | 3/9 | 33.3% | ❌❌❌❌✅✅✅❌❌ | 3 (R5-R7) |
| **8** | **12 Apr** | **ST** | **Turf** | **Good** | **11** | **40.3%** | **77.1%** | **6/11** | **54.5%** | **❌✅❌❌✅✅✅✅✅❌❌** | **5 (R5-R9)** |

\*Meeting 8 **R1** (6 runners): MC #1 **#6** ran **3rd** but HKJC Place pool pays **two** places only → **$0** dividend; counts as **❌** for streaks and all-ups (same dividend logic as other meetings).

---

## Meeting 1: Happy Valley | 18 Mar 2026 (9 races)

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

| Legs | Bets | Staked | Winners | Returned | P&L | ROI |
|------|------|--------|---------|----------|-----|-----|
| 1 | 10 | $100 | 8 | $144.70 | +$44.70 | +44.7% |
| 2 | 9 | $90 | 6 | $223.26 | +$133.26 | +148.1% |
| 3 | 8 | $80 | 4 | $353.69 | +$273.69 | +342.1% |
| 4 | 7 | $70 | 3 | $522.54 | +$452.54 | +646.5% |
| 5 | 6 | $60 | 2 | $477.22 | +$417.22 | +695.4% |
| 6 | 5 | $50 | 1 | $433.96 | +$383.96 | +768.0% |

**Observation:** The best all-up meeting by far. The 6-race streak (R5-R10) with R8 MONEY CATCHER's $40.00 Place dividend created explosive compounding. Every leg count was profitable. R7+R8 alone returned $90 on a $10 2-leg all-up (9x).

---

## Meeting 3: Happy Valley | 25 Mar 2026 (9 races)

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

| Legs | Bets | Staked | Winners | Returned | P&L | ROI |
|------|------|--------|---------|----------|-----|-----|
| 1 | 9 | $90 | 6 | $145.50 | +$55.50 | +61.7% |
| 2 | 8 | $80 | 3 | $173.55 | +$93.55 | +116.9% |
| 3 | 7 | $70 | 2 | $204.49 | +$134.49 | +192.1% |
| 4 | 6 | $60 | 1 | $214.46 | +$154.46 | +257.4% |
| 5 | 5 | $50 | 0 | $0 | -$50.00 | -100% |
| 6 | 4 | $40 | 0 | $0 | -$40.00 | -100% |

**Observation:** R4 HARMONY GALAXY's $47.00 dividend (16x odds) was the profit engine. The R4+R5 2-leg all-up alone returned $122.20 — a 12.2x return on $10. The 4-leg window (R4-R7) captured one massive combo ($214.46) but 5+ legs failed because R8 broke the streak.

---

## Meeting 4: Sha Tin | 29 Mar 2026 (11 races)

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

| Race | MC #1 | MC Win% | MC Place% | Placed? | Place $ (if placed) |
|------|-------|---------|-----------|---------|---------------------|
| R1 | #10 ALWAYS MY FOLKS | 27.9% | 68.6% | ❌ | — |
| R2 | #5 FORTUNE STAR | 40.0% | 82.1% | ❌ (4th) | — |
| R3 | #2 BEAUTY THUNDER | 31.9% | 69.4% | ❌ (4th) | — |
| R4 | #5 AMAZING AWARD | 29.1% | 67.3% | ❌ (4th) | — |
| R5 | #5 BRIGHT DAY | 16.4% | 44.2% | ✅ 2nd | $19.50 |
| R6 | #1 CROSSBORDERDUDE | 55.6% | 90.2% | ✅ 3rd | $14.00 |
| R7 | #1 SILVERY BREEZE | 71.5% | 95.1% | ✅ 1st | $15.00 |
| R8 | #1 CELESTIAL HERO | 35.7% | 78.3% | ❌ | — |
| R9 | #3 RED SEA | 31.9% | 68.3% | ❌ | — |

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

| Race | MC #1 | MC Win% | MC Place% | Paid Place? | Place $ (if paid) |
|------|-------|---------|-----------|-------------|-------------------|
| R1 | #6 TALENTS CHAMPION | 24.0% | 60.4% | ❌ (3rd, **6 runners → 2 places**) | — |
| R2 | #9 WINNING MACHINE | 44.1% | 88.6% | ✅ 3rd | $11.00 |
| R3 | #1 BEAUTY MISSILE | 28.8% | 68.9% | ❌ (10th) | — |
| R4 | #14 THE CONCENTRATION | 34.5% | 72.5% | ❌ (7th) | — |
| R5 | #1 SPICY STANDARD | 29.8% | 71.7% | ✅ 2nd | $13.50 |
| R6 | #1 BABY SAKURA | 51.5% | 84.7% | ✅ 3rd | $10.10 |
| R7 | #3 FORZA TORO | 36.0% | 70.9% | ✅ 2nd | $19.50 |
| R8 | #7 AMAZING PARTNERS | 48.7% | 85.9% | ✅ 1st | $16.50 |
| R9 | #5 ALL'S WELL | 41.3% | 73.4% | ✅ 3rd | $22.50 |
| R10 | #2 SMART GOLF | 46.6% | 82.8% | ❌ (**SCR** — not in `finishOrder`) | — |
| R11 | #12 PAKISTAN LEGACY | 57.6% | 88.3% | ❌ (11th) | — |

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

| Legs | Bets | Staked | Winners | Returned | P&L | ROI |
|------|------|--------|---------|----------|-----|-----|
| 1 | 11 | $110 | 6 | $93.10 | −$16.90 | −15.4% |
| 2 | 10 | $100 | 4 | $102.63 | +$2.63 | +2.6% |
| 3 | 9 | $90 | 3 | $131.48 | +$41.48 | +46.1% |
| 4 | 8 | $80 | 2 | $116.99 | +$36.99 | +46.2% |
| 5 | 7 | $70 | 1 | $98.71 | +$28.71 | +41.0% |
| 6 | 6 | $60 | 0 | $0 | −$60.00 | −100% |

**Observation:** **High avg MC Place% (77.1%)** but only **6/11** legs paid Place (**54.5%**): **R1** field-size rule, **R10** scratch on MC #1, plus **R3/R4/R11** out of frame. The **R5–R9** paying streak (**5**) made **2- through 5-leg** all-ups **profitable**; **flat Place** lost (**−$16.90**) on thin divs + misses. Same shape as **Meeting 6** (long turf streak) but weaker than **Meeting 2** (no $40+ leg in the window).

---

## Cumulative Summary (8 meetings)

### ROI by Leg Count — Per Meeting

| Legs | M1 (18 Mar) | M2 (22 Mar) | M3 (25 Mar) | M4 (29 Mar) | M5 (1 Apr) | M6 (6 Apr) | M7 (8 Apr) | M8 (12 Apr ST) |
|------|-------------|-------------|-------------|-------------|------------|------------|------------|----------------|
| 1 | +7.2% | +44.7% | +61.7% | +4.2% | -10.0% | +29.3% | -46.1% | **-15.4%** |
| 2 | -8.6% | **+148.1%** | +116.9% | +1.8% | -32.6% | +122.4% | -39.6% | **+2.6%** |
| 3 | -30.0% | **+342.1%** | +192.1% | -56.8% | -100% | +283.6% | -41.5% | **+46.1%** |
| 4 | -44.8% | **+646.5%** | +257.4% | -100% | -100% | +360.2% | -100% | **+46.2%** |
| 5 | -100% | **+695.4%** | -100% | -100% | -100% | +229.5% | -100% | **+41.0%** |
| 6 | -100% | **+768.0%** | -100% | -100% | -100% | -100% | -100% | **-100%** |

### P&L by Leg Count — Per Meeting

| Legs | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 | **TOTAL** |
|------|-----|------|------|------|------|------|------|------|-----------|
| 1 | +$6.5 | +$44.7 | +$55.5 | +$4.6 | -$9.0 | +$32.2 | -$41.5 | **-$16.90** | **+$76.10** |
| 2 | -$6.8 | +$133.3 | +$93.6 | +$1.8 | -$26.1 | +$122.4 | -$31.7 | **+$2.63** | **+$289.00** |
| 3 | -$21.0 | +$273.7 | +$134.5 | -$51.2 | -$70.0 | +$255.3 | -$29.05 | **+$41.48** | **+$533.74** |
| 4 | -$26.9 | +$452.5 | +$154.5 | -$80.0 | -$60.0 | +$288.2 | -$60.0 | **+$36.99** | **+$705.32** |
| 5 | -$50.0 | +$417.2 | -$50.0 | -$70.0 | -$50.0 | +$160.7 | -$50.0 | **+$28.71** | **+$336.61** |
| 6 | -$40.0 | +$383.96 | -$40.0 | -$60.0 | -$40.0 | -$60.0 | -$40.0 | **-$60.00** | **+$43.96** |

### Grand Summary Table

| Legs | Total Bets | Total Staked | Total Winners | Hit Rate | Total Returned | Total P&L | ROI | Profitable Meetings |
|------|-----------|-------------|---------------|----------|----------------|-----------|-----|---------------------|
| 1 (flat) | 79 | $790 | 49 | 62.0% | $866.10 | +$76.10 | +9.6% | 5/8 |
| **2** | 71 | $710 | 28 | 39.4% | $999.00 | +$289.00 | +40.7% | 5/8 |
| **3** | 63 | $630 | 16 | 25.4% | $1,163.74 | +$533.74 | +84.7% | 4/8 |
| **4** | **55** | **$550** | **9** | **16.4%** | **$1,255.32** | **+$705.32** | **+128.2%** | **4/8** |
| 5 | 47 | $470 | 6 | 12.8% | $806.60 | +$336.60 | +71.6% | 3/8 |
| 6 | 39 | $390 | 2 | 5.1% | $433.96 | +$43.96 | +11.3% | 1/8 |

---

## Analysis

### The 4-Leg Sweet Spot

The **4-leg consecutive all-up** produced the highest cumulative profit (**+$705.32** after **Meeting 8**) and the best ROI among multi-leg counts (**+128.2%** over 8 meetings). This is driven by:

1. **Sufficient compounding**: 4 legs multiply dividends enough to generate outsized returns (individual winners returned $33-$228)
2. **Achievable streak requirement**: 5 meetings out of **8** had max **paying** streaks ≥ 4 (M1: 4, M2: 6, M3: 4, M6: 5, **M8: 5**); **M4** (3), **M7** (3), and short-streak meetings add fewer 4-leg+ wins
3. **Limited downside**: Only $10 per bet × 6-8 bets per meeting = $60-$80 at risk
4. **Asymmetric payoff**: The **9** winning 4-leg all-ups averaged ~$139.5 return on a $10 stake when they hit

### Streak Length is Everything

| Max Streak | Meetings | Best Leg Count | Best ROI |
|------------|----------|----------------|----------|
| 6 | M2 | 6 | +768.0% |
| 5 | **M6, M8** | 4–5 | +360.2% / **M8** +46.2% (4-leg) |
| 4 | M1, M3 | 3-4 | +192-257% |
| 3 | M4, **M7** | 2 (M4); 3-leg loses (M7) | +1.8%; **M7** multi-leg **≈−$211** (2–6 leg) |
| 2 | M5 | 1 (flat) | -10.0% |

The optimal leg count ≈ max streak - 1. This gives multiple windows to hit within the streak while avoiding the cliff edge.

### Risk Profile

| Legs | Avg Loss (losing meeting) | Avg Win (winning meeting) | Win:Loss Ratio |
|------|---------------------------|---------------------------|----------------|
| 2 | -$11.3 | +$87.5 | 7.7:1 |
| 3 | -$54.0 | +$221.2 | 4.1:1 |
| 4 | -$61.7 | +$298.4 | 4.8:1 |
| 5 | -$55.0 | +$288.9 | 5.3:1 |
| 6 | -$48.0 | +$384.0 | 8.0:1 |

The 4-leg strategy loses ~$62 on a bad meeting but gains ~$298 on a good one — a favorable 4.8:1 win-to-loss ratio.

### Surface Impact

| Surface | Meetings | Max Streak (avg) | 4-Leg ROI (notes) |
|---------|----------|------------------|-------------------|
| Turf-dominant | **7** (M1-M4, M6–M8) | ~4.0 | **M7** 4-leg **−100%**; **M8** +46.2% (max paying streak 5) |
| AWT (M5) | 1 | 2.0 | **-100%** |

**Meeting 7 (HV Turf):** High avg MC Place% (**73.7%**) but **MC #1** strike only **33%** — similar **strike** to AWT **M5** (44%) in spirit, with all-ups **deep red** despite a **3-race** place streak (R5–R7).

**Meeting 8 (ST Turf):** **R5–R9** paying streak rescues multi-leg (same mechanism as **M6**); **flat** still loses on **R1** (small field) + **R10** scratch + tail misses.

The all-up strategy should be **avoided on AWT meetings** entirely. The scattered placing pattern on AWT makes even 2-leg all-ups unprofitable.

### Dividend Quality Matters

The two best meetings (M2, M6) both featured **at least one high-dividend horse** within the streak:
- M2: R8 MONEY CATCHER $40.00 (15x odds)
- M6: R5 THOUSAND SPIRIT $38.00 (15x odds)

Without a high-dividend catalyst, streaks of low-dividend favourites (M1: all $11-$16) barely break even on all-ups.

---

## Recommendations

- [ ] **Use 3-4 leg consecutive all-ups** as the primary multi-leg strategy — best risk-adjusted returns
- [ ] **Skip AWT meetings** for all-up bets entirely — the model's reduced accuracy eliminates streaks
- [ ] **Pair with flat Place bets** for stability — flat Place is profitable **5/8** meetings vs **4/8** for 4-leg all-ups (**M7** / **M8** both red on flat)
- [ ] **Suggested combined approach**: $10 flat Place per race + $10 per 3-leg consecutive all-up. On a typical 10-race turf meeting: $100 flat + $80 all-ups = $180 total exposure
- [ ] **Monitor live results**: if the MC #1 misses in R1 or R2, the all-up still has full exposure from R3 onwards — don't adjust mid-meeting
- [ ] **Track streak length correlation**: meetings with strong MC model confidence (high avg MC Place%) on turf tend to produce longer streaks — consider increasing all-up stake when avg MC Place% > 75% on turf
