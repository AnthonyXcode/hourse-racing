# TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-04-12 | Race 1

**Refreshed:** HKJC odds `fetch-odds.ts` **2026-04-12** (~12:35 HKT); MC `analyze-race.ts` **10,000** iters, `--form-data all`; jockey stats `fetch-jockey-stats.ts` same session.  
**Prior suggestions superseded** — this file matches **current** pool data only.

**DATA VALIDATION:** **6** starters (Trio OK). Going: **Good** (default). **All six Griffin / no HK form** in MC (**0** lines each) — high variance.  
**ODDS (HKJC):** #2 **2.2**, #6 **2.9**, #5 **4**, #3 **12**, #1 **16**, #4 **23** — captured in `data/odds/odds_20260412_ST.json`.

**RACE:** R1 — **1000m Turf** | **6** runners (card shows Griffin-style set; analyzer title line may mislabel class — treat as **sprint maiden/griffin heat**).

---

## MC SIMULATION (raw)

**Sort:** MC **Win%** desc. **Form** = **0** for all. **Place%>20%** = MC Place% > 20% (all **✅**).

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 6 | TALENTS CHAMPION | 24.0% | 60.4% | 2.9 | ✅ | ✅ | 0 | ★ 膽 (MC #1) | 1-6: 10.8% (9.2) |
| 1 | KA YING GRATEFUL | 18.7% | 54.5% | 16 | ✅ | ❌ | 0 | 腳 | — |
| 3 | SILVERY KNIGHT | 16.2% | 49.8% | 12 | ✅ | ❌ | 0 | 腳 | 3-6: 9.0% (11.0) |
| 5 | SECRET INGREDIENT | 13.9% | 45.5% | 4 | ✅ | ✅ | 0 | 腳 | — |
| 4 | GLORIOUS HERO | 13.8% | 45.1% | 23 | ✅ | ❌ | 0 | 腳 | — |
| 2 | PERFECT ONE | 13.5% | 44.7% | 2.2 | ✅ | ✅ | 0 | 腳 | — |

**Market vs MC:** Pool makes **#6** win/top-3 anchor; favourite **#2** sits **MC sixth** on win% (**13.5%**) — **Purton** still lifts him after jockey step (below).

---

## HORSE RANKINGS — Strategy A (jockey only; no SCMP pass)

**Jockey boost:** `win% ≤ 7 ? 0 : min(7, 1 + (win% − 7) × 6 / 13)`; outside MC top **4** → cap **+4%**.  
MC top 4 by Win: **#6, #1, #3, #5**. **#2 Purton** **19.63%** → raw **+6.8%**, rank **6** → **+4%** cap.

**Table sorted by Adj Win% (desc).**

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 6 | TALENTS CHAMPION | 24.0% | 60.4% | jockey 0 | jockey 0 | **24.0%** | **60.4%** | 2.9 | M L Yeung | — | Pool |
| 1 | KA YING GRATEFUL | 18.7% | 54.5% | jockey 0 | jockey 0 | **18.7%** | **54.5%** | 16 | K C Leung | — | Pool |
| 2 | PERFECT ONE | 13.5% | 44.7% | jockey +4 (cap) | jockey +4 (cap) | **17.5%** | **48.7%** | 2.2 | Z Purton | — | Pool |
| 3 | SILVERY KNIGHT | 16.2% | 49.8% | jockey 0 | jockey 0 | **16.2%** | **49.8%** | 12 | L Hewitson | — | Pool |
| 5 | SECRET INGREDIENT | 13.9% | 45.5% | jockey +1.3 | jockey +1.3 | **15.2%** | **46.8%** | 4 | H Bentley | — | Pool |
| 4 | GLORIOUS HERO | 13.8% | 45.1% | jockey 0 | jockey 0 | **13.8%** | **45.1%** | 23 | K Teetan | — | Pool |

**Classification:** **Competitive** (top Adj Win **24% &lt; 35%**). **Mode B:** top **3** Adj Win **#6, #1, #2** + next **3** Adj Place among the rest → **#3, #5, #4** → **full field of 6**.

**Banker:** **None** — all **debut / no race form**; **膽拖** not applied for Strategy A (per skill: no debutant 膽).

---

## TRIO POOL — Strategy A

**POOL:** **#1, #2, #3, #4, #5, #6** (full field)  
**STRUCTURE:** All combinations (no single banker).  
**COMBINATIONS:** C(6,3) = **20**  
**UNIT BET:** **$10**  
**TOTAL STAKE:** **$200**

**Illustrative high–Adj Place trios (not exclusive):** **6-1-3**, **6-1-5**, **6-2-3** (mix of MC top win + Purton-boosted **#2**).

---

## STRATEGY B (MC-only)

**Banker:** #6 TALENTS CHAMPION (**24.0%** / **60.4%**)  
**Primary legs (MC Place% > 20%):** #1, #3, #5, #4, #2 (all **>20%**)  
**Win-odds adds/swaps:** None (no runner with Place% ≤ 20% and Win < 10).  
**Final legs:** #1, #3, #5, #4, #2  

**膽拖:** C(5,2) = **10** → **$100**  
**Trios:** 6-1-3 | 6-1-5 | 6-1-4 | 6-1-2 | 6-3-5 | 6-3-4 | 6-3-2 | 6-5-4 | 6-5-2 | 6-4-2  

**Note:** Strategy B still uses an MC **banker on a debut** — higher variance; Strategy A avoids locking a 膽.

---

## PASS / CAVEATS

- **Any scratching** in six-horse field → recompute combos.  
- **Model vs market:** **#2** favourite **2.2** vs **13.5%** MC win; **#6** **2.9** vs **24%** MC — disagreement is normal for **no-form** races.  
- **CONFIDENCE:** **LOW–MEDIUM** (Griffin sprint, **0** HK form lines fed to MC).

---

*Generated from live fetch + MC run **2026-04-12** — replaces earlier static R1 notes.*
