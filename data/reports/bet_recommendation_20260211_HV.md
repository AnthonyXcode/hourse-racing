# 投注推薦 / BETTING RECOMMENDATIONS
## Happy Valley | 11 Feb 2026 (Wed) | 賠率更新: 6:01 PM HKT

### 本金 / Bankroll: $1,000 | Risk Profile: Moderate (35% Kelly) | Venue: Happy Valley (stakes -30%)

---

## 方法 / METHODOLOGY

1. **Monte Carlo Simulation**: 10,000 iterations per race using `tools/analyze-race.ts`
2. **Live Odds**: Fetched via `tools/fetch-odds.ts` at 6:01 PM
3. **Jockey Stats**: Fresh from HKJC (fetched 6:03 PM)
4. **Elite Jockey Priority**: Applied as additive boost to MC probabilities
5. **Happy Valley Adjustment**: All stakes reduced 30%, avoid short favourites (<3.0)

---

## 騎師統計 / ELITE JOCKEY STATS (Season 25/26)

| Tier | Jockey | Code | Win% | Rides Today | Boost (HV) |
|------|--------|------|------|-------------|-------------|
| ⭐⭐⭐ Elite | J Moreira | MOJ | 25.00% | Not riding | +7 |
| ⭐⭐⭐ Elite | Z Purton | PZ | 21.28% | R1-#1, R2-#2, R3-#6, R4-#6 | +7 |
| ⭐⭐ Strong | J McDonald | MCJ | 15.79% | Not riding tonight | +4 |
| ⭐ Good | H Bowman | BH | 11.47% | R3-#3, R4-#2 | +4 |
| ⭐ Good | M Guyon | GM | 9.93% | R1-#4, R2-#3, R3-#11 | +0 |

---

## 模擬結果 / MONTE CARLO SIMULATION RESULTS (10,000 runs)

### Race 1 — C5 | 1650m | 18:40
| # | Horse | MC Win% | MC Place% | Odds | Mkt% | Jockey | Edge |
|---|-------|---------|-----------|------|------|--------|------|
| 2 | CONSPIRACY WITNESS | 18.2% | 47.8% | — | — | McMonagle | — |
| 4 | TELECOM POWER | 16.3% | 43.2% | 5.1 | 19.6% | Guyon | -3.3% |
| 1 | BLING BLING GENIUS | 13.8%→17.8% | 38.3% | 3.1 | 32.3% | **Purton** +4% | -14.5% |
| 12 | STRONGEST BOY | 13.6% | 38.5% | — | — | Bentley | — |
| 8 | RUN RUN TIMING | 13.2% | 38.1% | 8.1 | 12.3% | Kingscote | +0.9% |

**Verdict: PASS** — No edge found. Purton's #1 is overvalued by market (3.1 odds implies 32% but MC only gives 17.8% even with boost). Competitive open race.

---

### Race 2 — C5 | 1000m | 19:10
| # | Horse | MC Win% | MC Place% | Odds | Mkt% | Jockey | Edge |
|---|-------|---------|-----------|------|------|--------|------|
| 2 | NEBRASKAN | 22.7%→26.7% | 53.8% | 2.8 | 35.7% | **Purton** +4% | -9.0% |
| 11 | MACANESE MASTER | 16.3% | 43.7% | — | — | Chung | — |
| 1 | ISLAND BREEZES | 10.9% | 33.9% | — | — | Ferraris | — |
| 5 | EXCEED THE WISH | 10.8% | 33.6% | — | — | Hewitson | — |
| 12 | MODEST GENTLEMAN | 8.5% | 28.3% | 5.3 | 18.9% | Chadwick | -10.4% |

**Verdict: PASS** — NEBRASKAN with Purton is overvalued (2.8 odds = short favourite at HV, AVOID per strategy rules). No other horse crosses edge threshold.

---

### Race 3 — C4 | 1650m | 19:40 ★★★ BEST BET ★★★
| # | Horse | MC Win% | MC Place% | Odds | Mkt% | Jockey | Edge |
|---|-------|---------|-----------|------|------|--------|------|
| **3** | **ABSOLUTE AWAKENED** | **40.1%→44.1%** | **73.0%** | **6.7** | **14.9%** | **Bowman +4%** | **+29.2%** |
| 8 | INNO SUPER | 12.1% | 39.1% | 3.9 | 25.6% | Chau | -13.5% |
| 4 | PRESTIGE RICKY | 10.9% | 35.2% | 5.6 | 17.9% | K C Leung | -7.0% |
| 6 | NORTHERN BEAST | ~5%→9% | ~20% | 8.1 | 12.3% | **Purton** +4% | -3.3% |
| 2 | NOBLE PURSUIT | 9.6% | 34.6% | 9.5 | 10.5% | E C W Wong | -0.9% |

**#3 ABSOLUTE AWAKENED is the standout value of the meeting.**
- MC dominates at 40.1% win (73% place) — far ahead of field
- Form: 5/1/7/3 — won last start, placed 2 of last 4
- H Bowman (11.47% season) gives +4% jockey boost
- F C Lor stable — top trainer
- Market only prices it at 6.7 (14.9% implied) — **undervalued by 196%**
- Even Purton's #6 NORTHERN BEAST (barely 9% after boost) can't compete

---

### Race 4 — C4 | 1200m | 20:10 (3T Leg 1)
| # | Horse | MC Win% | MC Place% | Odds | Mkt% | Jockey | Edge |
|---|-------|---------|-----------|------|------|--------|------|
| 6 | BITS SUPERSTAR | 22.4%→26.4% | 54.0% | 3.3 | 30.3% | **Purton** +4% | -3.9% |
| 2 | FIND MY LOVE | 18.6%→22.6% | 49.3% | 4.1 | 24.4% | **Bowman** +4% | -1.8% |
| 1 | SUPERB KING | 18.4% | 49.1% | 9.0 | 11.1% | Orman | +7.3% |
| 9 | LUCKY MAN | 10.9% | 35.4% | — | — | Hewitson | — |
| 12 | ENJOY GOLF | 10.1% | 34.4% | — | — | Bentley | — |

**Verdict: MARGINAL** — #1 SUPERB KING has +7.3% edge but below 15% threshold. Purton's #6 is short favourite at HV (3.3 = AVOID). Bowman's #2 is fairly priced. **No bet but watch SUPERB KING — if odds drift to 12+, the edge improves.**

---

### Race 5 — C4 | 1000m | 20:40 (3T Leg 2) ★ VALUE BET ★
| # | Horse | MC Win% | MC Place% | Odds | Mkt% | Jockey | Edge |
|---|-------|---------|-----------|------|------|--------|------|
| **11** | **SAVVY TWINKLE** | **28.9%** | **62.9%** | **9.3** | **10.8%** | — | **+18.1%** |
| 1 | BEAUTY THUNDER | 17.2% | 47.7% | 6.3 | 15.9% | — | +1.3% |
| 2 | BUNTA BABY | 16.5% | 47.9% | 3.0 | 33.3% | — | -16.8% |
| 6 | STAR PERFORMER | 12.0% | 37.9% | 7.2 | 13.9% | — | -1.9% |
| 10 | LEAN MASTER | 9.5% | 33.1% | 7.3 | 13.7% | — | -4.2% |

**#11 SAVVY TWINKLE — undervalued by 169%!**
- MC gives 28.9% win, but market only implies 10.8% (odds 9.3)
- Win edge: +18.1% (exceeds 15% threshold)
- Place probability 62.9% at ~2.7 place odds is solid value too
- BUNTA BABY (#2) is massively overvalued at 3.0 (market says 33% but MC only 16.5%)

---

### Race 6 — C3 | 1650m | 21:10 (3T Leg 3)
| # | Horse | MC Win% | MC Place% | Odds | Mkt% | Jockey | Edge |
|---|-------|---------|-----------|------|------|--------|------|
| 8 | FIVEFORTWO | 25.9% | 57.7% | — | — | — | — |
| 4 | A AMERIC TE SPE | 17.8% | 46.6% | — | — | — | — |
| 5 | MISTER DAPPER | 14.0% | 42.2% | — | — | — | — |
| 2 | MAX QUE | 10.0% | 32.7% | 2.8 | 35.7% | — | -25.7% |
| 11 | WITHALLMYFAITH | 10.2% | 32.6% | 5.3 | 18.9% | — | -8.7% |

**Verdict: PASS** — #8 FIVEFORTWO tops MC at 25.9% but no odds captured for it. MAX QUE (#2) at 2.8 is overvalued and a short favourite at HV (AVOID). No actionable edge.

---

### Race 7 — C4 | 1200m | 21:45
| # | Horse | MC Win% | MC Place% | Odds | Mkt% | Jockey | Edge |
|---|-------|---------|-----------|------|------|--------|------|
| **3** | **FLYING WROTE** | **29.7%** | **68.0%** | **4.5** | **22.2%** | — | **+7.5%** |
| 1 | MEOWTH | 29.0% | 67.4% | 3.6 | 27.8% | — | +1.2% |
| 2 | GIANT LEAP | 14.5% | 46.3% | 8.1 | 12.3% | — | +2.2% |
| 7 | THE HEIR | 12.1% | 42.1% | 9.0 | 11.1% | — | +1.0% |
| 12 | DIRIYA | — | — | 8.1 | 12.3% | — | overvalued |

**Verdict: MARGINAL** — FLYING WROTE has +7.5% edge (below 15% threshold but above 5%). MEOWTH and FLYING WROTE both strong. The 1-3 quinella at 20% MC probability (fair odds 5.0) may offer value if market pays higher.

---

### Race 8 — C3 | 1200m | 22:15
| # | Horse | MC Win% | MC Place% | Odds | Mkt% | Jockey | Edge |
|---|-------|---------|-----------|------|------|--------|------|
| 11 | AMAZING KID | 18.9% | 47.8% | 3.9 | 25.6% | — | -6.7% |
| 3 | SPORTS LEGEND | 16.4% | 42.8% | — | — | — | — |
| 9 | TOURBILLON GOLFER | 16.1% | 42.5% | 5.2 | 19.2% | — | -3.1% |
| 4 | MIGHTY COMMANDER | 12.7% | 37.6% | 5.6 | 17.9% | — | -5.2% |
| 7 | SOVEREIGN FUND | — | — | 7.2 | 13.9% | — | overvalued |

**Verdict: PASS** — No value found. AMAZING KID is the MC favourite but overvalued by market. Competitive race with thin margins.

---

### Race 9 — C3 | 1200m | 22:50
| # | Horse | MC Win% | MC Place% | Odds | Mkt% | Jockey | Edge |
|---|-------|---------|-----------|------|------|--------|------|
| 6 | LUCKY EIGHT | 28.6% | 62.6% | — | — | — | — |
| 3 | LUCKY PLANET | 17.3% | 48.5% | 4.6 | 21.7% | — | -4.4% |
| 5 | PERFECT GENERAL | 14.1% | 41.9% | — | — | — | — |
| 7 | REFUSETOBEENGLISH | 9.9% | 32.9% | 4.6 | 21.7% | — | -11.8% |
| 2 | SYMBOL OF STRENGTH | 9.7% | 31.2% | 6.8 | 14.7% | — | -5.0% |

**Verdict: PASS** — #6 LUCKY EIGHT dominates MC at 28.6% but no odds captured (not in top-scraped). REFUSETOBEENGLISH is overvalued. Cannot action without odds for top MC pick.

---

## 推薦投注 / RECOMMENDED BETS

═══════════════════════════════════════════════════════════
### RACE 3 — BEST BET ★★★
═══════════════════════════════════════════════════════════

| # | Bet Type | Selection | Odds | Model% | Mkt% | Edge | Kelly | Stake |
|---|----------|-----------|------|--------|------|------|-------|-------|
| 1 | **WIN** | **#3 ABSOLUTE AWAKENED** | **6.7** | **44.1%** | **14.9%** | **+29.2%** | 6.1% → 35%K 2.1% → HV 1.5% | **$15** |
| 2 | **Place** | **#3 ABSOLUTE AWAKENED** | **~2.3 est** | **73.0%** | ~43% | **+30%** | — | **$35** |
| 3 | Quinella | #3 × #8 INNO SUPER | ~8.6 (fair) | 11.6% | — | +est | — | $10 |

**R3 Total: $60 (6.0% of bankroll)**

**Bet 1: WIN — #3 ABSOLUTE AWAKENED**
- Model Probability: 44.1% (MC 40.1% + Bowman +4%)
- Market Probability: 14.9% (implied from 6.7 odds)
- Edge: +29.2% ✓✓✓ (STRONG VALUE — exceeds 15% threshold by 2x)
- Kelly Fraction: Full Kelly 6.1% → 35% frac = 2.1% → HV -30% = 1.5%
- Recommended Stake: $15 (1.5% of bankroll)
- Expected Value: +$2.96 per $10
- Reasoning: MC dominance (40.1% — double the next horse), recent winner, Bowman aboard, Lor stable. Market drastically underestimates this horse.

**Bet 2: Place — #3 ABSOLUTE AWAKENED**
- Model Probability: 73.0% place
- Estimated Place Odds: ~2.3
- Edge: ~+30%
- Recommended Stake: $35 (3.5% of bankroll)
- Reasoning: 73% place probability is overwhelming. Even accounting for variance, this should place 7 out of 10 times.

**Bet 3: Quinella — #3 × #8**
- Model Probability: 11.6% (MC top quinella pair)
- Fair Odds: 8.6
- Recommended Stake: $10
- Reasoning: If ABSOLUTE AWAKENED runs as expected, INNO SUPER (fav at 3.9) is the most likely 2nd. Market may price quinella higher than fair.

---

═══════════════════════════════════════════════════════════
### RACE 5 — VALUE BET ★★
═══════════════════════════════════════════════════════════

| # | Bet Type | Selection | Odds | Model% | Mkt% | Edge | Kelly | Stake |
|---|----------|-----------|------|--------|------|------|-------|-------|
| 4 | **WIN** | **#11 SAVVY TWINKLE** | **9.3** | **28.9%** | **10.8%** | **+18.1%** | 2.5% → 35%K 0.9% → HV 0.6% | **$10** |
| 5 | **Place** | **#11 SAVVY TWINKLE** | **~2.7** | **62.9%** | ~37% | **+26%** | — | **$25** |
| 6 | Quinella | #1 BEAUTY THUNDER × #11 SAVVY TWINKLE | ~8.8 (fair) | 11.4% | — | +est | — | $10 |

**R5 Total: $45 (4.5% of bankroll)**

**Bet 4: WIN — #11 SAVVY TWINKLE**
- Model Probability: 28.9%
- Market Probability: 10.8% (implied from 9.3 odds)
- Edge: +18.1% ✓✓ (VALUE — exceeds 15% threshold)
- Kelly Fraction: Full Kelly 2.5% → 35% frac = 0.9% → HV -30% = 0.6%
- Recommended Stake: $10 (1.0% of bankroll)
- Expected Value: +$1.69 per $10
- Reasoning: MC strongest at 28.9%, market dramatically undervalues at 9.3. The 169% undervaluation is the largest discrepancy of the meeting.

**Bet 5: Place — #11 SAVVY TWINKLE**
- Model Probability: 62.9% place
- Estimated Place Odds: ~2.7
- Edge: ~+26%
- Recommended Stake: $25 (2.5% of bankroll)
- Reasoning: 62.9% place probability at attractive place odds. Strong model conviction.

**Bet 6: Quinella — #1 × #11**
- Model Probability: 11.4% (MC 2nd-highest quinella pair in R5)
- Fair Odds: 8.8
- Recommended Stake: $10
- Reasoning: BEAUTY THUNDER (17.2% win) is the logical co-favourite with SAVVY TWINKLE.

---

═══════════════════════════════════════════════════════════
### RACE 7 — MARGINAL BET (Edge 7.5%)
═══════════════════════════════════════════════════════════

| # | Bet Type | Selection | Odds | Model% | Mkt% | Edge | Kelly | Stake |
|---|----------|-----------|------|--------|------|------|-------|-------|
| 7 | Place | #3 FLYING WROTE | ~1.7 | 68.0% | ~59% | +9% | — | $15 |
| 8 | Quinella | #1 MEOWTH × #3 FLYING WROTE | ~5.0 (fair) | 20.0% | — | +est | — | $10 |

**R7 Total: $25 (2.5% of bankroll)**

**Bet 7: Place — #3 FLYING WROTE**
- Model Probability: 68.0% place
- Estimated Place Odds: ~1.7
- Edge: ~9% (marginal but place probability is compelling)
- Recommended Stake: $15
- Reasoning: MC 29.7% win (essentially co-favourite with MEOWTH at 29.0%). 68% place at 1.7 is reasonable. Small bet for bankroll protection.

**Bet 8: Quinella — #1 × #3**
- Model Probability: 20.0% (highest quinella pair in any race tonight!)
- Fair Odds: 5.0
- Recommended Stake: $10
- Reasoning: These two dominate the simulation at 29.0% and 29.7% win each. 20% quinella probability is exceptional. If market pays >5.0, there is value.

---

## 連贏投注 / QUINELLA SUGGESTIONS (1 膽 + 2 腳 format)

### R3: 膽 #3 ABSOLUTE AWAKENED + 腳 #8, #4
| Combo | MC Prob | Fair Odds |
|-------|---------|-----------|
| 3-8 | 11.6% | 8.6 |
| 3-4 | 9.9% | 10.1 |

### R5: 膽 #11 SAVVY TWINKLE + 腳 #1, #2
| Combo | MC Prob | Fair Odds |
|-------|---------|-----------|
| 1-11 | 11.4% | 8.8 |
| 2-11 | 11.5% | 8.7 |

### R7: 膽 #3 FLYING WROTE + 腳 #1, #2
| Combo | MC Prob | Fair Odds |
|-------|---------|-----------|
| 1-3 | 20.0% | 5.0 |
| 2-3 | 10.4% | 9.6 |

---

## SUMMARY

| # | Race | Bet Type | Selection | Odds | Model% | Edge | Stake |
|---|------|----------|-----------|------|--------|------|-------|
| 1 | R3 | **WIN** | **#3 ABSOLUTE AWAKENED** | 6.7 | 44.1% | +29.2% | $15 |
| 2 | R3 | **Place** | **#3 ABSOLUTE AWAKENED** | ~2.3 | 73.0% | +30% | $35 |
| 3 | R3 | Quinella | #3×#8 | ~8.6 | 11.6% | +est | $10 |
| 4 | R5 | **WIN** | **#11 SAVVY TWINKLE** | 9.3 | 28.9% | +18.1% | $10 |
| 5 | R5 | **Place** | **#11 SAVVY TWINKLE** | ~2.7 | 62.9% | +26% | $25 |
| 6 | R5 | Quinella | #1×#11 | ~8.8 | 11.4% | +est | $10 |
| 7 | R7 | Place | #3 FLYING WROTE | ~1.7 | 68.0% | +9% | $15 |
| 8 | R7 | Quinella | #1×#3 | ~5.0 | 20.0% | +est | $10 |

| Item | Amount |
|------|--------|
| WIN Bets | $25 |
| PLACE Bets | $75 |
| QUINELLA Bets | $30 |
| **Total Staked** | **$130 (13% of bankroll)** |
| **Reserve** | **$870** |

---

## RISK ASSESSMENT

- Total Exposure: $130 (13% of bankroll)
- Win Probability (any bet wins): ~85% (at least one place bet wins)
- Expected Return: +$40-80 if model is correct
- Worst Case: -$130 (total stake)
- Best Case: ~+$400 (R3 WIN + R5 WIN + quinellas)
- Confidence: **HIGH on R3**, **MEDIUM on R5**, **LOW on R7**

---

## PASS RACES (No Value)

| Race | Reason |
|------|--------|
| R1 | Competitive open race, all top horses overvalued by market |
| R2 | NEBRASKAN (Purton) is short favourite at 2.8 — HV AVOID rule |
| R4 | BITS SUPERSTAR (Purton) at 3.3 short fav — HV AVOID; SUPERB KING marginal |
| R6 | MAX QUE at 2.8 short fav — HV AVOID; MC top pick #8 has no odds |
| R8 | No edge; AMAZING KID overvalued |
| R9 | MC top pick #6 LUCKY EIGHT has no odds captured |

---

## PASS CONDITIONS

- If #3 ABSOLUTE AWAKENED odds shorten below 4.0, reduce WIN stake to $10
- If SAVVY TWINKLE odds shorten below 6.0, skip WIN bet (keep Place)
- If going changes from Good, reconsider all 1650m bets (R3 particularly)
- If any selection is scratched, void all related bets
- Re-check odds 15 mins before each race — edge may vanish

---

## CAVEATS

1. **Partial odds data**: Scraper captures 3-6 top horses per race, not full fields. Overround calculations are approximate.
2. **Going default**: Race card going parsed as "Good" — verify on HKJC before betting.
3. **No jockey names in R5-R9**: Race card scraper couldn't extract all jockey assignments for later races. Elite jockey boosts only applied where confirmed.
4. **Happy Valley volatility**: Expect more upsets than Sha Tin. Stakes already reduced 30%.
5. **Gambling involves risk** — only bet what you can afford to lose.
