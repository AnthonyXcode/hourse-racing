# TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-04-12 | Race 4

**Refreshed:** MC `analyze-race.ts` **10,000** iters, `--form-data all` (current run); HKJC odds `data/odds/odds_20260412_ST.json` (R4 snapshot); jockey boosts `data/jockeys/jockey_stats_20260411.json`.  
**Prior suggestions superseded** — this file matches **current** pool data only.

**DATA VALIDATION:** **14** starters (Trio OK). Going: **Good** (default). **13/14** form enriched in MC (**#6** no HK form lines in card).

**RACE:** R4 — **Class 4** | **1400m Turf** | **14** runners  

---

## MC SIMULATION (raw)

**Sort:** MC **Win%** desc. **Form** = HK runs in MC. **Place%>20%** = MC Place% > 20%. **Win odds<10** = HKJC win < 10.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 14 | THE CONCENTRATION | 34.5% | 72.5% | 9.4 | ✅ | ✅ | 9 | ★ 膽 (MC #1) | 2-14: 27.3% (3.7) |
| 2 | HAPPY BOSS | 32.5% | 72.0% | 9.9 | ✅ | ✅ | 4 | 腳 | — |
| 1 | EIGHTY LIGHT YEARS | 8.4% | 33.2% | 13 | ✅ | ❌ | 6 | 腳 | 1-14: 7.5% (13.4) |
| 5 | GALLANT DESIGN | 7.3% | 32.1% | 5.5 | ✅ | ✅ | 3 | 腳 | 5-14: 6.9% (14.6) |
| 3 | TOP TIME | 6.4% | 27.8% | 13 | ✅ | ❌ | 7 | swap target | 1-2: 6.5% (15.4) |
| 7 | INVICTUS DRAGON | 4.0% | 20.5% | 2.3 | ✅ | ✅ | 7 | 腳 | 2-5: 6.5% (15.5) |
| 9 | TYCOON EXPRESS | 2.9% | 16.3% | 6.6 | ❌ | ✅ | 2 | replaces #3 | — |
| 8 | CHEERFUL WONGCHOY | 2.0% | 11.8% | 92 | ❌ | ❌ | 2 | — | — |
| 10 | GOLDEN WIN | 1.4% | 9.0% | 100 | ❌ | ❌ | 3 | — | — |
| 12 | SUPREME FEELING | 0.5% | 3.5% | 146 | ❌ | ❌ | 4 | — | — |
| 11 | SWEET BRIAR | 0.1% | 0.9% | 67 | ❌ | ❌ | 5 | — | — |
| 13 | AMAZING FUN | 0.0% | 0.2% | 33 | ❌ | ❌ | 9 | — | — |
| 6 | MASSIVE GLORY | 0.0% | 0.2% | 44 | ❌ | ❌ | 0 | — | — |
| 4 | LIGHTNESS OF BEING | 0.0% | 0.0% | 118 | ❌ | ❌ | 5 | — | — |

**Market vs MC:** **#7** short win (**2.3**) vs **~4%** MC; **#2** / **#14** large place edge vs pool (**~158%** / **~221%** undervalued in analyzer). **#4** flagged overvalued vs model.

---

## HORSE RANKINGS — Strategy A (jockey only; no SCMP pass)

**Jockey boost:** `win% ≤ 7 ? 0 : min(7, 1 + (win% − 7) × 6 / 13)`; outside MC top **4** → cap **+4%**. **C L Chau** uses HKJC card `winRate` (**10.09%**) — not in JSON.

**Table sorted by Adj Win% (desc).**

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 14 | THE CONCENTRATION | 34.5% | 72.5% | jockey +2.8 | jockey +2.8 | **37.3%** | **75.3%** | 9.4 | A Atzeni | — | ★ 膽 1 |
| 2 | HAPPY BOSS | 32.5% | 72.0% | jockey +1.8 | jockey +1.8 | **34.3%** | **73.8%** | 9.9 | L Ferraris | — | ★ 膽 2 |
| 1 | EIGHTY LIGHT YEARS | 8.4% | 33.2% | jockey 0 | jockey 0 | **8.4%** | **33.2%** | 13 | L Hewitson | — | 腳 |
| 7 | INVICTUS DRAGON | 4.0% | 20.5% | jockey +4 (cap) | jockey +4 (cap) | **8.0%** | **24.5%** | 2.3 | Z Purton | — | — |
| 3 | TOP TIME | 6.4% | 27.8% | jockey +1.5 | jockey +1.5 | **7.9%** | **29.3%** | 13 | J Orman | — | 腳 |
| 5 | GALLANT DESIGN | 7.3% | 32.1% | jockey 0 | jockey 0 | **7.3%** | **32.1%** | 5.5 | B Avdulla | — | 腳 |
| 9 | TYCOON EXPRESS | 2.9% | 16.3% | jockey +4 (cap) | jockey +4 (cap) | **6.9%** | **20.3%** | 6.6 | J Moreira | — | Str B swap |
| 8 | CHEERFUL WONGCHOY | 2.0% | 11.8% | jockey 0 | jockey 0 | **2.0%** | **11.8%** | 92 | K Teetan | — | — |
| 6 | MASSIVE GLORY | 0.0% | 0.2% | jockey +2.4 | jockey +2.4 | **2.4%** | **2.6%** | 44 | C L Chau (-2) | — | — |
| 12 | SUPREME FEELING | 0.5% | 3.5% | jockey +1.3 | jockey +1.3 | **1.8%** | **4.8%** | 146 | H Bentley | — | — |
| 10 | GOLDEN WIN | 1.4% | 9.0% | jockey 0 | jockey 0 | **1.4%** | **9.0%** | 100 | K C Leung | — | — |
| 11 | SWEET BRIAR | 0.1% | 0.9% | jockey 0 | jockey 0 | **0.1%** | **0.9%** | 67 | R Kingscote | — | — |
| 13 | AMAZING FUN | 0.0% | 0.2% | jockey 0 | jockey 0 | **0.0%** | **0.2%** | 33 | M Chadwick | — | — |
| 4 | LIGHTNESS OF BEING | 0.0% | 0.0% | jockey 0 | jockey 0 | **0.0%** | **0.0%** | 118 | Y L Chung (-2) | — | — |

**Classification:** **Dominant** (**37.3% ≥ 35%**). **Mode A** five: **#14, #2, #1, #5, #3** (next **3** **Adj Place** among non-膽 after **#14**/**#2**: **#1**, **#5**, **#3**). **#7** stays out — Adj Place **24.5%** &lt; **25%** must-include bar.

**雙膽拖:** **#2** second Adj Win, **Adj Place 73.8% ≥ 63%** → **膽 #14 + 膽 #2**.  
**腳:** **#1, #5, #3** → **3** trios → **$30** ($10 × 3).

**Banker eligibility:** **#14** has **9** HK form lines ✅.

**Alternative (single 膽):** **膽 #14** + 腳 **#2, #1, #5, #3** → C(4,2) = **6** → **$60**.

---

## TRIO POOL — Strategy A

**POOL:** #14, #2, #1, #5, #3  

**雙膽拖:** **膽** #14 THE CONCENTRATION | **膽** #2 HAPPY BOSS  
**腳:** #1 EIGHTY LIGHT YEARS, #5 GALLANT DESIGN, #3 TOP TIME  

**COMBINATIONS:** **3**  
**UNIT BET:** **$10**  
**TOTAL STAKE:** **$30**

**Trios (any order):** **14-2-1** | **14-2-5** | **14-2-3**

**Full pool (no dual banker):** C(5,3) = **10** → **$100**

---

## STRATEGY B (MC-only)

**Banker:** #14 THE CONCENTRATION (**34.5%** / **72.5%**)  
**Primary legs (MC Place% > 20%, ex-banker):** #2, #1, #5, #3, #7  

**Win odds &lt; 10, Place% ≤ 20%:** **#9** TYCOON EXPRESS (**2.9%** / **6.6**) — sole primary leg in MC Place **20–30%** with Win **&gt; 10** is **#3** (**27.8%** / **13**) → **replace #3** (1-for-1).  

**Final legs:** #2, #1, #5, #7, #9  

**膽拖:** C(5,2) = **10** → **$100**  
**Trios:** 14-2-1 | 14-2-5 | 14-2-7 | 14-2-9 | 14-1-5 | 14-1-7 | 14-1-9 | 14-5-7 | 14-5-9 | 14-7-9  

---

## PASS / CAVEATS

- **#7** market **2.3** vs **~4%** MC win — short-priced; Strategy B keeps for **20.5%** MC place; Strategy A drops on **Adj** must-include rule.  
- **#6** no HK form in MC — not in pool.  
- Re-run `fetch-odds.ts` if pool has moved.  

**CONFIDENCE:** **HIGH** on **#14 / #2** in the frame; **MEDIUM** on **#1 / #5 / #3** for third; **MEDIUM–LOW** on **#7 / #9** (Strategy B legs).

---

*Generated from fresh MC + HKJC odds JSON — replaces earlier R4 trio notes.*
