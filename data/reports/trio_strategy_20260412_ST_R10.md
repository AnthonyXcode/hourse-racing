# TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-04-12 | Race 10

**Refreshed:** MC `analyze-race.ts` **10,000** iters, `--form-data all` (current run); HKJC odds `data/odds/odds_20260412_ST.json` (R10); jockey boosts `data/jockeys/jockey_stats_20260411.json`.

**DATA VALIDATION:** **12** starters (Trio OK). Going: **Good** (default). **10/12** form enriched in MC (**#10 QUANTUM LEGEND**, **#11 MY MARS** thin / **0** HK lines in card).

**RACE:** R10 — **Class 3** | **1200m Turf** | **12** runners  

---

## MC SIMULATION (raw)

**Sort:** MC **Win%** desc. **Place%>20%** = MC Place% > 20%. **Win odds<10** = HKJC win < 10.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 2 | SMART GOLF | 46.6% | 82.8% | 4.6 | ✅ | ✅ | 5 | ★ 膽 (MC #1) | 2-3: 25.3% (4.0) |
| 3 | YOUNG EMPEROR | 20.6% | 61.1% | 20 | ✅ | ❌ | 7 | 腳 | 2-4: 15.4% (6.5) |
| 4 | JUMBO TREASURE | 12.6% | 45.6% | 7.8 | ✅ | ✅ | 6 | 腳 | 2-12: 14.8% (6.7) |
| 12 | YEE CHEONG GLORY | 11.7% | 45.7% | 15 | ✅ | ❌ | 7 | 腳 | 3-12: 6.5% (15.5) |
| 6 | TURQUOISE VELOCITY | 2.2% | 15.3% | 11 | ❌ | ❌ | 4 | — | 3-4: 6.1% (16.4) |
| 1 | CROSSBORDERPEGASUS | 1.7% | 12.8% | 6.8 | ❌ | ✅ | 1 | add-on | — |
| 5 | CHILL BUDDY | 1.7% | 12.7% | 11 | ❌ | ❌ | 6 | — | — |
| 9 | NEW FUTURE FOLKS | 1.4% | 9.2% | 31 | ❌ | ❌ | 8 | — | — |
| 7 | THE UNIQUE STAR | 1.3% | 10.6% | 37 | ❌ | ❌ | 3 | — | — |
| 10 | QUANTUM LEGEND | 0.2% | 2.4% | 3.1 | ❌ | ✅ | 0 | add-on | — |
| 11 | MY MARS | 0.1% | 1.4% | 25 | ❌ | ❌ | 0 | — | — |
| 8 | MASTER OF ALL | 0.0% | 0.5% | 57 | ❌ | ❌ | 7 | — | — |

**Market vs MC:** **#2** / **#3** place edge vs pool; **#10** short win (**3.1**) vs **~0.2%** MC; **#8** overvalued vs model.

---

## HORSE RANKINGS — Strategy A (jockey only; no SCMP pass)

**Jockey boost:** `win% ≤ 7 ? 0 : min(7, 1 + (win% − 7) × 6 / 13)`; outside MC top **4** → cap **+4%**. **H Y Yuen** uses HKJC card `winRate` (**20%** / **5** rides).

**MC top 4** by Win: **#2, #3, #4, #12**. **Table sorted by Adj Win% (desc).**

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|
| 2 | SMART GOLF | 46.6% | 82.8% | jockey +1.3 | jockey +1.3 | **47.9%** | **84.1%** | 4.6 | H Bentley | ★ 膽 |
| 3 | YOUNG EMPEROR | 20.6% | 61.1% | jockey +1.8 | jockey +1.8 | **22.4%** | **62.9%** | 20 | L Ferraris | 腳 |
| 4 | JUMBO TREASURE | 12.6% | 45.6% | jockey +7 | jockey +7 | **19.6%** | **52.6%** | 7.8 | H Y Yuen (-10) | 腳 |
| 12 | YEE CHEONG GLORY | 11.7% | 45.7% | jockey 0 | jockey 0 | **11.7%** | **45.7%** | 15 | A Badel | 腳 |
| 5 | CHILL BUDDY | 1.7% | 12.7% | jockey +2.8 | jockey +2.8 | **4.5%** | **15.5%** | 11 | A Atzeni | 腳 |
| 10 | QUANTUM LEGEND | 0.2% | 2.4% | jockey +4 (cap) | jockey +4 (cap) | **4.2%** | **6.4%** | 3.1 | Z Purton | Str B add |
| 1 | CROSSBORDERPEGASUS | 1.7% | 12.8% | jockey +1.5 | jockey +1.5 | **3.2%** | **14.3%** | 6.8 | J Orman | Str B add |
| 9 | NEW FUTURE FOLKS | 1.4% | 9.2% | jockey +1.7 | jockey +1.7 | **3.1%** | **10.9%** | 31 | C Y Ho | — |
| 6 | TURQUOISE VELOCITY | 2.2% | 15.3% | jockey 0 | jockey 0 | **2.2%** | **15.3%** | 11 | M L Yeung | — |
| 7 | THE UNIQUE STAR | 1.3% | 10.6% | jockey 0 | jockey 0 | **1.3%** | **10.6%** | 37 | K Teetan | — |
| 11 | MY MARS | 0.1% | 1.4% | jockey 0 | jockey 0 | **0.1%** | **1.4%** | 25 | B Avdulla | — |
| 8 | MASTER OF ALL | 0.0% | 0.5% | jockey 0 | jockey 0 | **0.0%** | **0.5%** | 57 | H T Mo (-2) | — |

**Classification:** **Dominant** (**47.9% ≥ 35%**). **Mode A** five: **#2, #3, #4, #12, #5** (banker + top **4** Adj Place ex-**#2**: **#3, #4, #12, #5**). **No 雙膽** — **#3** second Adj Win, **Adj Place 62.9%** is **just under** **63%**.

**單膽拖:** **膽 #2** + 腳 **#3, #4, #12, #5** → C(4,2) = **6** → **$60** ($10 × 6).

**Banker eligibility:** **#2** has **5** HK form lines ✅.

**Full pool:** C(5,3) = **10** → **$100**.

---

## TRIO POOL — Strategy A (recommended)

**POOL:** #2, #3, #4, #12, #5  

**單膽拖:** **膽 #2 SMART GOLF** | **腳:** #3 YOUNG EMPEROR, #4 JUMBO TREASURE, #12 YEE CHEONG GLORY, #5 CHILL BUDDY  

**Trios:** **2-3-4** | **2-3-12** | **2-3-5** | **2-4-12** | **2-4-5** | **2-12-5**  

**Stake:** **$10** × **6** = **$60**

---

## STRATEGY B (MC-only)

**Banker:** #2 SMART GOLF (**46.6%** / **82.8%**)  
**Primary legs (MC Place% > 20%):** #3, #4, #12  

**Win odds &lt; 10, Place% ≤ 20%** (win asc): no primary in MC Place **20–30%** with Win **&gt; 10** → **no swap**. **#10** (**0.2%** / **3.1**) → **add**. **#1** (**1.7%** / **6.8**) → **add**.

**Final legs:** #3, #4, #12, #10, #1  

**膽拖:** C(5,2) = **10** → **$100**  
**Trios:** 2-3-4 | 2-3-12 | 2-3-10 | 2-3-1 | 2-4-12 | 2-4-10 | 2-4-1 | 2-12-10 | 2-12-1 | 2-10-1  

---

## CAVEATS

- **#3** Adj **62.9%** vs **63%** dual-banker threshold — if you use **63%** strict, no 雙膽; one tick could justify 雙膽 **#2+#3** + 3腳 (**$30**) — not adopted here.  
- **#10** / **#11** weak form depth in DB; Strategy B still adds **#10** on market rule.  
- Re-fetch odds if pool moves.

**CONFIDENCE:** **HIGH** on **#2 / #3** in the frame; **MEDIUM** on **#4 / #12 / #5** for third.

---

*MC + HKJC odds JSON — Trio advice for R10.*
