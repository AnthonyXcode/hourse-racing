# TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-04-12 | Race 3

**Refreshed:** MC `analyze-race.ts` **10,000** iters, `--form-data all` (current run); HKJC odds `data/odds/odds_20260412_ST.json` (R3 snapshot); jockey boosts `data/jockeys/jockey_stats_20260411.json`.  
**Prior suggestions superseded** — this file matches **current** pool data only.

**DATA VALIDATION:** **14** starters (Trio OK). Going: **Good** (default). **14/14** form enriched in MC.

**RACE:** R3 — **GILLIES HANDICAP** | Class 5 | **1600m Turf** | **14** runners  

---

## MC SIMULATION (raw)

**Sort:** MC **Win%** desc. **Form** = HK runs in MC. **Place%>20%** = MC Place% > 20%. **Win odds<10** = HKJC win < 10.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 1 | BEAUTY MISSILE | 28.8% | 68.9% | 7.3 | ✅ | ✅ | 7 | ★ 膽 (MC #1) | 1-6: 17.2% (5.8) |
| 6 | GENERAL SMART | 24.7% | 64.8% | 4.4 | ✅ | ✅ | 5 | 腳 | 1-4: 14.9% (6.7) |
| 4 | RATTAN GALAXY | 20.9% | 60.2% | 25 | ✅ | ❌ | 5 | 腳 | 4-6: 12.6% (8.0) |
| 5 | BLING BLING GENIUS | 16.9% | 53.6% | 7.5 | ✅ | ✅ | 8 | 腳 | — |
| 9 | WINDICATOR FAMILY | 3.8% | 21.6% | 15 | ✅ | ❌ | 7 | swap target | — |
| 3 | IRON LEGION | 3.2% | 17.6% | 13 | ❌ | ❌ | 7 | 腳 (pool) | — |
| 7 | COOL BLUE | 1.1% | 7.5% | 15 | ❌ | ❌ | 7 | — | — |
| 8 | SPEEDY TRIDENT | 0.4% | 3.9% | 65 | ❌ | ❌ | 8 | — | — |
| 11 | HARRY'S HERO | 0.1% | 0.8% | 10 | ❌ | ❌ | 10 | — | — |
| 10 | GOLD TACK | 0.0% | 0.7% | 18 | ❌ | ❌ | 6 | — | — |
| 12 | CASA LEGEND | 0.0% | 0.5% | 17 | ❌ | ❌ | 3 | — | — |
| 2 | DASHING MAURISON | 0.0% | 0.0% | 4.9 | ❌ | ✅ | 8 | replaces #9 | — |
| 13 | MR ALADDIN | 0.0% | 0.0% | 31 | ❌ | ❌ | 9 | — | — |
| 14 | THE WAY WE WIN | 0.0% | 0.0% | 57 | ❌ | ❌ | 8 | — | — |

**Market vs MC:** **#4** long win (**25**) vs **~60%** MC place; **#1**/**#6** place edge vs pool.

---

## HORSE RANKINGS — Strategy A (jockey only; no SCMP pass)

**Jockey boost:** `win% ≤ 7 ? 0 : min(7, 1 + (win% − 7) × 6 / 13)`; outside MC top **4** → cap **+4%**. **C L Chau** / **P N Wong** use HKJC card `winRate` when code missing from JSON.

**Table sorted by Adj Win% (desc).**

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 1 | BEAUTY MISSILE | 28.8% | 68.9% | jockey +3.2 | jockey +3.2 | **32.0%** | **72.1%** | 7.3 | H Bowman | — | ★ 膽 1 |
| 6 | GENERAL SMART | 24.7% | 64.8% | jockey +6.8 | jockey +6.8 | **31.5%** | **71.6%** | 4.4 | Z Purton | — | ★ 膽 2 |
| 4 | RATTAN GALAXY | 20.9% | 60.2% | jockey +1.7 | jockey +1.7 | **22.6%** | **61.9%** | 25 | C Y Ho | — | 腳 |
| 5 | BLING BLING GENIUS | 16.9% | 53.6% | jockey 0 | jockey 0 | **16.9%** | **53.6%** | 7.5 | B Avdulla | — | 腳 |
| 9 | WINDICATOR FAMILY | 3.8% | 21.6% | jockey 0 | jockey 0 | **3.8%** | **21.6%** | 15 | K C Leung | — | 腳 |
| 3 | IRON LEGION | 3.2% | 17.6% | jockey 0 | jockey 0 | **3.2%** | **17.6%** | 13 | Y L Chung | — | 腳 |
| 10 | GOLD TACK | 0.0% | 0.7% | jockey +2.4 | jockey +2.4 | **2.4%** | **3.1%** | 18 | C L Chau | — | — |
| 2 | DASHING MAURISON | 0.0% | 0.0% | jockey +1.5 | jockey +1.5 | **1.5%** | **1.5%** | 4.9 | P N Wong | — | Str B swap |
| 11 | HARRY'S HERO | 0.1% | 0.8% | jockey +1.3 | jockey +1.3 | **1.4%** | **2.1%** | 10 | H Bentley | — | — |
| 7 | COOL BLUE | 1.1% | 7.5% | jockey 0 | jockey 0 | **1.1%** | **7.5%** | 15 | M Chadwick | — | — |
| 8 | SPEEDY TRIDENT | 0.4% | 3.9% | jockey 0 | jockey 0 | **0.4%** | **3.9%** | 65 | M L Yeung | — | — |
| 12 | CASA LEGEND | 0.0% | 0.5% | jockey 0 | jockey 0 | **0.0%** | **0.5%** | 17 | K Teetan | — | — |
| 13 | MR ALADDIN | 0.0% | 0.0% | jockey 0 | jockey 0 | **0.0%** | **0.0%** | 31 | A Badel | — | — |
| 14 | THE WAY WE WIN | 0.0% | 0.0% | jockey 0 | jockey 0 | **0.0%** | **0.0%** | 57 | H T Mo | — | — |

**Classification:** **Competitive** (top Adj Win **32.0% &lt; 35%**). **Mode B:** top **3** Adj Win **#1, #6, #4** + next **3** Adj Place among the rest → **#5, #9, #3** ( **#9** Adj Place **21.6%** is structural depth; **#3** **17.6%** fills sixth slot).

**雙膽拖:** **#6** second Adj Win, **Adj Place 71.6% ≥ 63%** → **膽 #1 + 膽 #6**.  
**腳:** **#4, #5, #9, #3** → **4** trios → **$40** ($10 × 4).

**Banker eligibility:** **#1** has **7** HK form lines ✅.

**Alternative (single 膽):** **膽 #1** + 腳 **#6,#4,#5,#9,#3** → C(5,2) = **10** → **$100**.

---

## TRIO POOL — Strategy A

**POOL:** #1, #6, #4, #5, #9, #3  

**雙膽拖:** **膽** #1 BEAUTY MISSILE | **膽** #6 GENERAL SMART  
**腳:** #4 RATTAN GALAXY, #5 BLING BLING GENIUS, #9 WINDICATOR FAMILY, #3 IRON LEGION  

**COMBINATIONS:** **4**  
**UNIT BET:** **$10**  
**TOTAL STAKE:** **$40**

**Trios (any order):** **1-6-4** | **1-6-5** | **1-6-9** | **1-6-3**

**Full pool (no dual banker):** C(6,3) = **20** → **$200**

---

## STRATEGY B (MC-only)

**Banker:** #1 BEAUTY MISSILE (**28.8%** / **68.9%**)  
**Primary legs (MC Place% > 20%, ex-banker):** #6, #4, #5, #9  

**Win odds &lt; 10, Place% ≤ 20%:** **#2** DASHING MAURISON (**0.0%** / **4.9**) — primary leg **#9** has MC Place **21.6%** (20–30%) and Win **15 &gt; 10** → **replace #9** (sole replaceable band leg).  

**Final legs:** #6, #4, #5, #2  

**膽拖:** C(4,2) = **6** → **$60**  
**Trios:** 1-6-4 | 1-6-5 | 1-6-2 | 1-4-5 | 1-4-2 | 1-5-2  

---

## PASS / CAVEATS

- **#9** Adj Place **21.6%** is below the **25%** must-include band — kept for Mode B sixth slot vs thin tails.  
- **#4** wide draw / long win — model still rates strong place.  
- Re-run `fetch-odds.ts` if pool has moved.  

**CONFIDENCE:** **MEDIUM–HIGH** on **#1 / #6 / #4** in the frame; **MEDIUM** on **#5 / #9 / #3** for third.

---

*Generated from fresh MC + HKJC odds JSON — replaces earlier R3 trio notes.*
