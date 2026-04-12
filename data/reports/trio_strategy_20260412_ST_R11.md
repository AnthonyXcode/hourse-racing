# TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-04-12 | Race 11

**Refreshed:** MC `analyze-race.ts` **10,000** iters, `--form-data all` (current run); HKJC odds `data/odds/odds_20260412_ST.json` (R11); jockey boosts `data/jockeys/jockey_stats_20260411.json`.

**DATA VALIDATION:** **12** starters (Trio OK). Going: **Good** (default). **12/12** form enriched in MC.

**RACE:** R11 — **Class 2** | **1200m Turf** | **12** runners  

---

## MC SIMULATION (raw)

**Sort:** MC **Win%** desc. **Place%>20%** = MC Place% > 20%. **Win odds<10** = HKJC win < 10.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 12 | PAKISTAN LEGACY | 57.6% | 88.3% | 10 | ✅ | ❌ | 6 | ★ 膽 (MC #1) | 1-12: 30.0% (3.3) |
| 1 | COLOURFUL KING | 18.4% | 61.8% | 12 | ✅ | ❌ | 6 | 腳 | 9-12: 18.0% (5.6) |
| 9 | RISING FORCE | 9.7% | 45.8% | 4.6 | ✅ | ✅ | 4 | 腳 | 11-12: 8.4% (12.0) |
| 11 | GALACTIC VOYAGE | 4.2% | 25.9% | 6.1 | ✅ | ✅ | 5 | 腳 | 5-12: 6.9% (14.6) |
| 5 | CRIMSON FLASH | 3.2% | 22.3% | 7.4 | ✅ | ✅ | 6 | 腳 | 6-12: 5.1% (19.7) |
| 6 | MAGIC CONTROL | 2.4% | 17.2% | 26 | ❌ | ❌ | 10 | — | — |
| 4 | SELF IMPROVEMENT | 1.8% | 14.2% | 18 | ❌ | ❌ | 2 | — | — |
| 7 | YOUNG CHAMPION | 1.3% | 10.3% | 6 | ❌ | ✅ | 12 | add-on | — |
| 3 | GORGEOUS WIN | 0.7% | 6.2% | 38 | ❌ | ❌ | 9 | — | — |
| 2 | SKY TRUST | 0.3% | 3.7% | 5.5 | ❌ | ✅ | 9 | add-on | — |
| 10 | CHATEAUNEUF | 0.3% | 3.0% | 28 | ❌ | ❌ | 8 | — | — |
| 8 | VICTOR THE WINNER | 0.1% | 1.5% | 51 | ❌ | ❌ | 9 | — | — |

**Market vs MC:** **#12** huge place edge vs pool; **#1** long win (**12**) vs model; **#2** flagged overvalued vs thin MC.

---

## HORSE RANKINGS — Strategy A (jockey only; no SCMP pass)

**Jockey boost:** `win% ≤ 7 ? 0 : min(7, 1 + (win% − 7) × 6 / 13)`; outside MC top **4** → cap **+4%**.

**MC top 4** by Win: **#12, #1, #9, #11**. **Table sorted by Adj Win% (desc).**

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|
| 12 | PAKISTAN LEGACY | 57.6% | 88.3% | jockey 0 | jockey 0 | **57.6%** | **88.3%** | 10 | K Teetan | ★ 膽 1 |
| 1 | COLOURFUL KING | 18.4% | 61.8% | jockey +6.8 | jockey +6.8 | **25.2%** | **68.6%** | 12 | Z Purton | ★ 膽 2 |
| 9 | RISING FORCE | 9.7% | 45.8% | jockey 0 | jockey 0 | **9.7%** | **45.8%** | 4.6 | R Kingscote | 腳 |
| 5 | CRIMSON FLASH | 3.2% | 22.3% | jockey +2.8 | jockey +2.8 | **6.0%** | **25.1%** | 7.4 | A Atzeni | 腳 |
| 7 | YOUNG CHAMPION | 1.3% | 10.3% | jockey +3.2 | jockey +3.2 | **4.5%** | **13.5%** | 6 | H Bowman | Str B add |
| 2 | SKY TRUST | 0.3% | 3.7% | jockey +4 (cap) | jockey +4 (cap) | **4.3%** | **7.7%** | 5.5 | J Moreira | Str B add |
| 11 | GALACTIC VOYAGE | 4.2% | 25.9% | jockey 0 | jockey 0 | **4.2%** | **25.9%** | 6.1 | A Badel | 腳 |
| 4 | SELF IMPROVEMENT | 1.8% | 14.2% | jockey +1.5 | jockey +1.5 | **3.3%** | **15.7%** | 18 | P N Wong (-7) | — |
| 6 | MAGIC CONTROL | 2.4% | 17.2% | jockey 0 | jockey 0 | **2.4%** | **17.2%** | 26 | K C Leung | — |
| 3 | GORGEOUS WIN | 0.7% | 6.2% | jockey +1.5 | jockey +1.5 | **2.2%** | **7.7%** | 38 | J Orman | — |
| 10 | CHATEAUNEUF | 0.3% | 3.0% | jockey 0 | jockey 0 | **0.3%** | **3.0%** | 28 | L Hewitson | — |
| 8 | VICTOR THE WINNER | 0.1% | 1.5% | jockey 0 | jockey 0 | **0.1%** | **1.5%** | 51 | M L Yeung | — |

**Classification:** **Dominant** (**57.6% ≥ 35%**). **Mode A** five: **#12, #1, #9, #11, #5** (banker + top **4** Adj Place ex-**#12**: **#1, #9, #11, #5**).

**雙膽拖:** **#1** second Adj Win, **Adj Place 68.6% ≥ 63%** → **膽 #12 + 膽 #1**.  
**腳:** **#9, #11, #5** (next **3** Adj Place among non-膽) → **3** trios → **$30** ($10 × 3).

**Banker eligibility:** **#12** has **6** HK form lines ✅.

**Alternative (single 膽):** **膽 #12** + 腳 **#1, #9, #11, #5** → C(4,2) = **6** → **$60**.

**Wider single 膽:** add **#6** → C(5,2) = **10** → **$100**.

**Full pool:** C(5,3) = **10** → **$100**.

---

## TRIO POOL — Strategy A (recommended)

**POOL:** #12, #1, #9, #11, #5  

**雙膽拖:** **膽** #12 PAKISTAN LEGACY | **膽** #1 COLOURFUL KING  
**腳:** #9 RISING FORCE, #11 GALACTIC VOYAGE, #5 CRIMSON FLASH  

**Trios:** **12-1-9** | **12-1-11** | **12-1-5**  

**Stake:** **$10** × **3** = **$30**

---

## STRATEGY B (MC-only)

**Banker:** #12 PAKISTAN LEGACY (**57.6%** / **88.3%**)  
**Primary legs (MC Place% > 20%):** #1, #9, #11, #5  

**Win odds &lt; 10, Place% ≤ 20%** (win asc): no primary in MC Place **20–30%** **and** Win **&gt; 10** (**#11** **25.9%** / **6.1**; **#5** **22.3%** / **7.4**) → **no swap**. **#2** SKY TRUST (**0.3%** / **5.5**) → **add**. **#7** YOUNG CHAMPION (**1.3%** / **6**) → **add**.

**Final legs:** #1, #9, #11, #5, #2, #7  

**膽拖:** C(6,2) = **15** → **$150**  
**Trios:** 12-1-9 | 12-1-11 | 12-1-5 | 12-1-2 | 12-1-7 | 12-9-11 | 12-9-5 | 12-9-2 | 12-9-7 | 12-11-5 | 12-11-2 | 12-11-7 | 12-5-2 | 12-5-7 | 12-2-7  

---

## CAVEATS

- **#12** win **10** is **not** **&lt; 10** for Strategy B flags — still MC favourite by a wide margin.  
- **#2** / **#7** are market shorts with low MC win; Strategy B adds both by rule.  
- Re-fetch odds if pool moves.

**CONFIDENCE:** **HIGH** on **#12 / #1** in the frame; **MEDIUM** on **#9 / #11 / #5** for third.

---

*MC + HKJC odds JSON — Trio advice for R11.*
