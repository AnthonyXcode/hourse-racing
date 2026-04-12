# TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-04-12 | Race 6

**Refreshed:** MC `analyze-race.ts` **10,000** iters, `--form-data all` (current run); HKJC odds `data/odds/odds_20260412_ST.json` (R6 snapshot); jockey boosts `data/jockeys/jockey_stats_20260411.json`.  
**Prior suggestions superseded** — this file matches **current** pool data only.

**DATA VALIDATION:** **12** starters (Trio OK). Going: **Good** (default). **11/12** form enriched in MC (**#7 LUCKY BID** no HK form rows).

**RACE:** R6 — **Class 4** | **1200m Turf** | **12** runners  

---

## MC SIMULATION (raw)

**Sort:** MC **Win%** desc. **Form** = HK runs in MC. **Place%>20%** = MC Place% > 20%. **Win odds<10** = HKJC win < 10.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 1 | BABY SAKURA | 51.5% | 84.7% | 2.4 | ✅ | ✅ | 2 | ★ 膽 (MC #1) | 1-3: 26.3% (3.8) |
| 3 | ISLAND BUDDY | 19.4% | 60.4% | 19 | ✅ | ❌ | 5 | 腳 | 1-2: 16.3% (6.1) |
| 2 | ELITE GOLF | 10.5% | 45.6% | 5.2 | ✅ | ✅ | 3 | 腳 | 1-6: 9.6% (10.5) |
| 6 | HEROIC VANGUARD | 6.7% | 30.9% | 27 | ✅ | ❌ | 1 | 腳 | 1-9: 7.1% (14.0) |
| 9 | TOP THRONE | 4.1% | 23.4% | 22 | ✅ | ❌ | 5 | swap target | 2-3: 5.6% (17.8) |
| 5 | FLYING SNIPER | 3.0% | 18.8% | 13 | ❌ | ❌ | 1 | — | — |
| 11 | KINGDOM OF RICHES | 2.2% | 14.0% | 34 | ❌ | ❌ | 7 | — | — |
| 10 | LEADING DRAGON | 2.1% | 17.1% | 7.9 | ❌ | ✅ | 3 | add-on | — |
| 7 | LUCKY BID | 0.3% | 2.9% | 7.5 | ❌ | ✅ | 0 | replaces #9 | — |
| 8 | SUPER RUBICK KID | 0.1% | 1.1% | 39 | ❌ | ❌ | 1 | — | — |
| 12 | AQUAMAN | 0.1% | 1.0% | 32 | ❌ | ❌ | 6 | — | — |
| 4 | LO PAN SPIRIT | 0.0% | 0.0% | 17 | ❌ | ❌ | 7 | — | — |

**Market vs MC:** **#1** short win (**2.4**) vs **~52%** MC; **#3** strong place edge vs pool; **#4** / **#12** flagged overvalued vs model.

---

## HORSE RANKINGS — Strategy A (jockey only; no SCMP pass)

**Jockey boost:** `win% ≤ 7 ? 0 : min(7, 1 + (win% − 7) × 6 / 13)`; outside MC top **4** → cap **+4%**. **H Y Yuen** uses HKJC card `winRate` (**20%** on **5** rides) — not in JSON.

**Table sorted by Adj Win% (desc).**

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 1 | BABY SAKURA | 51.5% | 84.7% | jockey +1.7 | jockey +1.7 | **53.2%** | **86.4%** | 2.4 | C Y Ho | — | ★ 膽 |
| 3 | ISLAND BUDDY | 19.4% | 60.4% | jockey 0 | jockey 0 | **19.4%** | **60.4%** | 19 | K Teetan | — | 腳 |
| 2 | ELITE GOLF | 10.5% | 45.6% | jockey +1.3 | jockey +1.3 | **11.8%** | **46.9%** | 5.2 | H Bentley | — | 腳 |
| 5 | FLYING SNIPER | 3.0% | 18.8% | jockey +4 (cap) | jockey +4 (cap) | **7.0%** | **22.8%** | 13 | Z Purton | — | — |
| 6 | HEROIC VANGUARD | 6.7% | 30.9% | jockey 0 | jockey 0 | **6.7%** | **30.9%** | 27 | A Badel | — | 腳 |
| 10 | LEADING DRAGON | 2.1% | 17.1% | jockey +4 (cap) | jockey +4 (cap) | **6.1%** | **21.1%** | 7.9 | H Y Yuen (-10) | — | Str B add |
| 9 | TOP THRONE | 4.1% | 23.4% | jockey 0 | jockey 0 | **4.1%** | **23.4%** | 22 | L Hewitson | — | 腳 |
| 11 | KINGDOM OF RICHES | 2.2% | 14.0% | jockey 0 | jockey 0 | **2.2%** | **14.0%** | 34 | M L Yeung | — | — |
| 4 | LO PAN SPIRIT | 0.0% | 0.0% | jockey +1.8 | jockey +1.8 | **1.8%** | **1.8%** | 17 | L Ferraris | — | — |
| 8 | SUPER RUBICK KID | 0.1% | 1.1% | jockey +1.5 | jockey +1.5 | **1.6%** | **2.6%** | 39 | J Orman | — | — |
| 7 | LUCKY BID | 0.3% | 2.9% | jockey 0 | jockey 0 | **0.3%** | **2.9%** | 7.5 | B Avdulla | — | Str B swap |
| 12 | AQUAMAN | 0.1% | 1.0% | jockey 0 | jockey 0 | **0.1%** | **1.0%** | 32 | M Chadwick | — | — |

**Classification:** **Dominant** (**53.2% ≥ 35%**). **Mode A** five: **#1, #3, #2, #6, #9** (banker + top **4** Adj Place ex-**#1**: **#3, #2, #6, #9**). **No 雙膽** — **#3** Adj Place **60.4% &lt; 63%**.

**單膽拖:** **膽 #1** + 腳 **#3, #2, #6, #9** → C(4,2) = **6** → **$60** ($10 × 6).

**Banker eligibility:** **#1** has **2** HK form lines ✅.

**Alternative (full pool):** C(5,3) = **10** → **$100**.

---

## TRIO POOL — Strategy A

**POOL:** #1, #3, #2, #6, #9  

**單膽拖:** **膽** #1 BABY SAKURA  
**腳:** #3 ISLAND BUDDY, #2 ELITE GOLF, #6 HEROIC VANGUARD, #9 TOP THRONE  

**COMBINATIONS:** **6**  
**UNIT BET:** **$10**  
**TOTAL STAKE:** **$60**

**Trios (any order):** **1-3-2** | **1-3-6** | **1-3-9** | **1-2-6** | **1-2-9** | **1-6-9**

**Full pool (no banker structure):** C(5,3) = **10** → **$100**

---

## STRATEGY B (MC-only)

**Banker:** #1 BABY SAKURA (**51.5%** / **84.7%**)  
**Primary legs (MC Place% > 20%, ex-banker):** #3, #2, #6, #9  

**Win odds &lt; 10, Place% ≤ 20%:** **#7** LUCKY BID (**0.3%** / **7.5**) — replace sole primary in MC Place **20–30%** with Win **&gt; 10**: **#9** (**23.4%** / **22**) → **replace #9** with **#7**. **#10** LEADING DRAGON (**2.1%** / **7.9**) — no remaining primary in **20–30%** / Win **&gt; 10** → **add**. **#4** win **17** (not **&lt; 10**) → not a candidate.

**Final legs:** #3, #2, #6, #7, #10  

**膽拖:** C(5,2) = **10** → **$100**  
**Trios:** 1-3-2 | 1-3-6 | 1-3-7 | 1-3-10 | 1-2-6 | 1-2-7 | 1-2-10 | 1-6-7 | 1-6-10 | 1-7-10  

---

## PASS / CAVEATS

- **#7** no HK form in MC; included in Strategy B on short win + swap rule only.  
- **#6** only **1** form line; **#9** Adj Place **23.4%** is under the **25%** must-include bar but fills Mode A fourth leg by Adj Place rank.  
- Short-priced **#1** — Trio dividends may be thin if it dominates.  
- Re-run `fetch-odds.ts` if pool has moved.  

**CONFIDENCE:** **HIGH** on **#1 / #3** in the frame; **MEDIUM** on **#2 / #6 / #9** for third.

---

*Generated from fresh MC + HKJC odds JSON — replaces earlier R6 trio notes.*
