# TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-04-12 | Race 7

**Refreshed:** MC `analyze-race.ts` **10,000** iters, `--form-data all` (current run); HKJC odds `data/odds/odds_20260412_ST.json` (R7 snapshot); jockey boosts `data/jockeys/jockey_stats_20260411.json`.  
**Prior suggestions superseded** — this file matches **current** pool data only.

**DATA VALIDATION:** **14** starters (Trio OK). Going: **Good** (default). **13/14** form enriched in MC (**#7 PRESIDENT PEGASUS** no HK form rows).

**RACE:** R7 — **Class 4** | **1400m Turf** | **14** runners  

---

## MC SIMULATION (raw)

**Sort:** MC **Win%** desc. **Form** = HK runs in MC. **Place%>20%** = MC Place% > 20%. **Win odds<10** = HKJC win < 10.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 3 | FORZA TORO | 36.0% | 70.9% | 3.6 | ✅ | ✅ | 7 | ★ 膽 (MC #1) | 3-4: 17.0% (5.9) |
| 4 | MASTER PHOENIX | 21.1% | 55.9% | 20 | ✅ | ❌ | 7 | 腳 | 2-3: 12.2% (8.2) |
| 2 | RUN RUN SMART | 14.3% | 45.5% | 7.7 | ✅ | ✅ | 10 | 腳 | 3-5: 10.6% (9.4) |
| 5 | STAR SATYR | 12.0% | 40.3% | 17 | ✅ | ❌ | 10 | 腳 | 2-4: 7.5% (13.3) |
| 11 | JUST FOLLOW ME | 5.0% | 22.4% | 5.3 | ✅ | ✅ | 6 | 腳 | 4-5: 6.3% (16.0) |
| 10 | SUPER DRAGON | 3.2% | 16.2% | 10 | ❌ | ❌ | 3 | — | — |
| 6 | FUN TOGETHER | 2.6% | 12.3% | 59 | ❌ | ❌ | 6 | — | — |
| 8 | LUCKY GIBS | 2.0% | 10.5% | 130 | ❌ | ❌ | 2 | — | — |
| 9 | SHOTGUN | 1.3% | 8.6% | 3.6 | ❌ | ✅ | 10 | add-on | — |
| 13 | ALABAMA SONG | 0.8% | 5.8% | 22 | ❌ | ❌ | 11 | — | — |
| 7 | PRESIDENT PEGASUS | 0.8% | 5.5% | 38 | ❌ | ❌ | 0 | — | — |
| 14 | WAVE GARDEN | 0.7% | 4.5% | 45 | ❌ | ❌ | 6 | — | — |
| 1 | FLYING FORTUNE | 0.1% | 1.1% | 56 | ❌ | ❌ | 3 | — | — |
| 12 | LUCKY SECRET | 0.1% | 0.7% | 104 | ❌ | ❌ | 4 | — | — |

**Market vs MC:** **#4** / **#5** / **#8** place edge vs pool in analyzer; **#9** joint short win (**3.6**) vs **~1%** MC win.

---

## HORSE RANKINGS — Strategy A (jockey only; no SCMP pass)

**Jockey boost:** `win% ≤ 7 ? 0 : min(7, 1 + (win% − 7) × 6 / 13)`; outside MC top **4** → cap **+4%**. **H Y Yuen** uses HKJC card `winRate` (**20%** on **5** rides) — not in JSON. **E C W Wong** uses card `winRate` (**8.48%**) — not under **N Wong** in JSON.

**Table sorted by Adj Win% (desc).** MC top **4** by Win: **#3, #4, #2, #5**.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 3 | FORZA TORO | 36.0% | 70.9% | jockey +7 | jockey +7 | **43.0%** | **77.9%** | 3.6 | J Moreira | — | ★ 膽 |
| 4 | MASTER PHOENIX | 21.1% | 55.9% | jockey +1.8 | jockey +1.8 | **22.9%** | **57.7%** | 20 | L Ferraris | — | 腳 |
| 2 | RUN RUN SMART | 14.3% | 45.5% | jockey +7 | jockey +7 | **21.3%** | **52.5%** | 7.7 | H Y Yuen (-10) | — | 腳 |
| 5 | STAR SATYR | 12.0% | 40.3% | jockey 0 | jockey 0 | **12.0%** | **40.3%** | 17 | Y L Chung (-2) | — | 腳 |
| 10 | SUPER DRAGON | 3.2% | 16.2% | jockey +2.8 | jockey +2.8 | **6.0%** | **19.0%** | 10 | A Atzeni | — | — |
| 9 | SHOTGUN | 1.3% | 8.6% | jockey +4 (cap) | jockey +4 (cap) | **5.3%** | **12.6%** | 3.6 | Z Purton | — | Str B add |
| 11 | JUST FOLLOW ME | 5.0% | 22.4% | jockey 0 | jockey 0 | **5.0%** | **22.4%** | 5.3 | K Teetan | — | 腳 |
| 6 | FUN TOGETHER | 2.6% | 12.3% | jockey +2.4 | jockey +2.4 | **5.0%** | **14.7%** | 59 | C L Chau (-2) | — | — |
| 8 | LUCKY GIBS | 2.0% | 10.5% | jockey +1.7 | jockey +1.7 | **3.7%** | **12.2%** | 130 | C Y Ho | — | — |
| 12 | LUCKY SECRET | 0.1% | 0.7% | jockey +1.7 | jockey +1.7 | **1.8%** | **2.4%** | 104 | E C W Wong (-3) | — | — |
| 13 | ALABAMA SONG | 0.8% | 5.8% | jockey 0 | jockey 0 | **0.8%** | **5.8%** | 22 | A Badel | — | — |
| 7 | PRESIDENT PEGASUS | 0.8% | 5.5% | jockey 0 | jockey 0 | **0.8%** | **5.5%** | 38 | L Hewitson | — | — |
| 14 | WAVE GARDEN | 0.7% | 4.5% | jockey 0 | jockey 0 | **0.7%** | **4.5%** | 45 | M L Yeung | — | — |
| 1 | FLYING FORTUNE | 0.1% | 1.1% | jockey 0 | jockey 0 | **0.1%** | **1.1%** | 56 | K C Leung | — | — |

**Classification:** **Dominant** (**43.0% ≥ 35%**). **Mode A** five: **#3, #4, #2, #5, #11** (banker + top **4** Adj Place ex-**#3**: **#4, #2, #5, #11**). **No 雙膽** — **#4** second Adj Win, **Adj Place 57.7% &lt; 63%**.

**單膽拖:** **膽 #3** + 腳 **#4, #2, #5, #11** → C(4,2) = **6** → **$60** ($10 × 6).

**Banker eligibility:** **#3** has **7** HK form lines ✅.

**Alternative (full pool):** C(5,3) = **10** → **$100**.

---

## TRIO POOL — Strategy A

**POOL:** #3, #4, #2, #5, #11  

**單膽拖:** **膽** #3 FORZA TORO  
**腳:** #4 MASTER PHOENIX, #2 RUN RUN SMART, #5 STAR SATYR, #11 JUST FOLLOW ME  

**COMBINATIONS:** **6**  
**UNIT BET:** **$10**  
**TOTAL STAKE:** **$60**

**Trios (any order):** **3-4-2** | **3-4-5** | **3-4-11** | **3-2-5** | **3-2-11** | **3-5-11**

**Full pool (no banker structure):** C(5,3) = **10** → **$100**

---

## STRATEGY B (MC-only)

**Banker:** #3 FORZA TORO (**36.0%** / **70.9%**)  
**Primary legs (MC Place% > 20%, ex-banker):** #4, #2, #5, #11  

**Win odds &lt; 10, Place% ≤ 20%:** **#9** SHOTGUN (**1.3%** / **3.6**) — no primary leg has MC Place in **20–30%** **and** Win **&gt; 10** (**#11** is **22.4%** place but Win **5.3**) → **no swap** → **add #9**. No other win-&lt;10 / place-≤20% runners beyond **#9** ( **#2** / **#11** are primary with place **&gt; 20%**).

**Final legs:** #4, #2, #5, #11, #9  

**膽拖:** C(5,2) = **10** → **$100**  
**Trios:** 3-4-2 | 3-4-5 | 3-4-11 | 3-4-9 | 3-2-5 | 3-2-11 | 3-2-9 | 3-5-11 | 3-5-9 | 3-11-9  

---

## PASS / CAVEATS

- **#11** Adj Place **22.4%** is under the **25%** must-include bar — kept as Mode A fourth leg by Adj Place rank after **#4 / #2 / #5**.  
- **#7** no HK form in MC. **#9** joint favourite with **#3** — MC largely dismisses **#9** for win; Strategy B still adds on odds rule.  
- Re-run `fetch-odds.ts` if pool has moved.  

**CONFIDENCE:** **HIGH** on **#3 / #4** in the frame; **MEDIUM** on **#2 / #5 / #11** for third.

---

*Generated from fresh MC + HKJC odds JSON — replaces earlier R7 trio notes.*
