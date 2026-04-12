# TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-04-12 | Race 5

**Refreshed:** MC `analyze-race.ts` **10,000** iters, `--form-data all` (current run); HKJC odds `data/odds/odds_20260412_ST.json` (R5 snapshot); jockey boosts `data/jockeys/jockey_stats_20260411.json`.  
**Prior suggestions superseded** — this file matches **current** pool data only.

**DATA VALIDATION:** **12** starters (Trio OK). Going: **Good** (default). **11/12** form enriched in MC (**#5 FLASHING FIGHTER** no HK form rows).

**RACE:** R5 — **Class 4** | **1200m Turf** | **12** runners  

---

## MC SIMULATION (raw)

**Sort:** MC **Win%** desc. **Form** = HK runs in MC. **Place%>20%** = MC Place% > 20%. **Win odds<10** = HKJC win < 10.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 1 | SPICY STANDARD | 29.8% | 71.7% | 6.2 | ✅ | ✅ | 3 | ★ 膽 (MC #1) | 1-3: 18.6% (5.4) |
| 3 | CONRAD PATCH | 25.5% | 67.5% | 5.9 | ✅ | ✅ | 4 | 腳 | 1-4: 15.8% (6.3) |
| 4 | CALL ME SPARKLE | 21.6% | 62.7% | 3.8 | ✅ | ✅ | 1 | 腳 | 3-4: 13.8% (7.2) |
| 2 | VICTOR THE RAPID | 17.4% | 56.9% | 29 | ✅ | ❌ | 12 | 腳 | 1-2: 13.0% (7.7) |
| 9 | CHATER FLASH | 2.3% | 14.4% | 10 | ❌ | ❌ | 4 | — | 2-3: 11.2% (8.9) |
| 6 | JUBILANT STAR | 1.7% | 11.1% | 11 | ❌ | ❌ | 4 | 腳 (pool) | — |
| 8 | SUPREME VOYAGER | 0.9% | 7.6% | 8.3 | ❌ | ✅ | 4 | add-on | — |
| 5 | FLASHING FIGHTER | 0.3% | 2.9% | 8.6 | ❌ | ✅ | 0 | add-on | — |
| 10 | GORGEOUS VICTORY | 0.2% | 2.0% | 35 | ❌ | ❌ | 3 | — | — |
| 7 | SMILING CHAMPION | 0.2% | 2.5% | 100 | ❌ | ❌ | 1 | — | — |
| 11 | FULL OF LAUGHTER | 0.0% | 0.6% | 110 | ❌ | ❌ | 4 | — | — |
| 12 | RUBY SAILING | 0.0% | 0.2% | 7.9 | ❌ | ✅ | 7 | add-on | — |

**Market vs MC:** **#2** long win (**29**) vs **~17%** MC / strong place edge in analyzer; **#4** short (**3.8**) vs **#1–#3–#4** MC stack; **#12** / **#11** flagged overvalued vs model.

---

## HORSE RANKINGS — Strategy A (jockey only; no SCMP pass)

**Jockey boost:** `win% ≤ 7 ? 0 : min(7, 1 + (win% − 7) × 6 / 13)`; outside MC top **4** → cap **+4%**. **H Y Yuen** uses HKJC card `winRate` (**20%** on **5** rides) — not in JSON.

**Table sorted by Adj Win% (desc).**

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 1 | SPICY STANDARD | 29.8% | 71.7% | jockey +2.8 | jockey +2.8 | **32.6%** | **74.5%** | 6.2 | A Atzeni | — | ★ 膽 1 |
| 3 | CONRAD PATCH | 25.5% | 67.5% | jockey +3.2 | jockey +3.2 | **28.7%** | **70.7%** | 5.9 | H Bowman | — | ★ 膽 2 |
| 4 | CALL ME SPARKLE | 21.6% | 62.7% | jockey 0 | jockey 0 | **21.6%** | **62.7%** | 3.8 | M L Yeung | — | 腳 |
| 2 | VICTOR THE RAPID | 17.4% | 56.9% | jockey +2.4 | jockey +2.4 | **19.8%** | **59.3%** | 29 | C L Chau (-2) | — | 腳 |
| 6 | JUBILANT STAR | 1.7% | 11.1% | jockey +4 (cap) | jockey +4 (cap) | **5.7%** | **15.1%** | 11 | Z Purton | — | 腳 |
| 5 | FLASHING FIGHTER | 0.3% | 2.9% | jockey +4 (cap) | jockey +4 (cap) | **4.3%** | **6.9%** | 8.6 | H Y Yuen (-10) | — | Str B add |
| 9 | CHATER FLASH | 2.3% | 14.4% | jockey +1.8 | jockey +1.8 | **4.1%** | **16.2%** | 10 | L Ferraris | — | — |
| 7 | SMILING CHAMPION | 0.2% | 2.5% | jockey +1.5 | jockey +1.5 | **1.7%** | **4.0%** | 100 | J Orman | — | — |
| 12 | RUBY SAILING | 0.0% | 0.2% | jockey +1.5 | jockey +1.5 | **1.5%** | **1.7%** | 7.9 | P N Wong (-7) | — | Str B add |
| 8 | SUPREME VOYAGER | 0.9% | 7.6% | jockey 0 | jockey 0 | **0.9%** | **7.6%** | 8.3 | B Avdulla | — | Str B add |
| 10 | GORGEOUS VICTORY | 0.2% | 2.0% | jockey 0 | jockey 0 | **0.2%** | **2.0%** | 35 | Y L Chung (-2) | — | — |
| 11 | FULL OF LAUGHTER | 0.0% | 0.6% | jockey 0 | jockey 0 | **0.0%** | **0.6%** | 110 | R Kingscote | — | — |

**Classification:** **Competitive** (top Adj Win **32.6% &lt; 35%**). **Mode B:** top **3** Adj Win **#1, #3, #4** + next **3** Adj Place among the rest → **#2, #9, #6** (**#9** **16.2%** Adj Place is thin but ranks above **#6** **15.1%** for the sixth slot).

**雙膽拖:** **#3** second Adj Win, **Adj Place 70.7% ≥ 63%** → **膽 #1 + 膽 #3**.  
**腳:** **#4, #2, #9, #6** → **4** trios → **$40** ($10 × 4).

**Banker eligibility:** **#1** has **3** HK form lines ✅.

**Alternative (single 膽):** **膽 #1** + 腳 **#3, #4, #2, #9, #6** → C(5,2) = **10** → **$100**.

---

## TRIO POOL — Strategy A

**POOL:** #1, #3, #4, #2, #9, #6  

**雙膽拖:** **膽** #1 SPICY STANDARD | **膽** #3 CONRAD PATCH  
**腳:** #4 CALL ME SPARKLE, #2 VICTOR THE RAPID, #9 CHATER FLASH, #6 JUBILANT STAR  

**COMBINATIONS:** **4**  
**UNIT BET:** **$10**  
**TOTAL STAKE:** **$40**

**Trios (any order):** **1-3-4** | **1-3-2** | **1-3-9** | **1-3-6**

**Full pool (no dual banker):** C(6,3) = **20** → **$200**

---

## STRATEGY B (MC-only)

**Banker:** #1 SPICY STANDARD (**29.8%** / **71.7%**)  
**Primary legs (MC Place% > 20%, ex-banker):** #3, #4, #2  

**Win odds &lt; 10, Place% ≤ 20%:** no primary leg in MC Place **20–30%** with Win **&gt; 10** → **no swap**. Candidates (win asc): **#12** (**7.9**), **#8** (**8.3**), **#5** (**8.6**) — **add** each. **#9** win **10** (not **&lt; 10**) → not a candidate.

**Final legs:** #3, #4, #2, #12, #8, #5  

**膽拖:** C(6,2) = **15** → **$150**  
**Trios:** 1-3-4 | 1-3-2 | 1-3-12 | 1-3-8 | 1-3-5 | 1-4-2 | 1-4-12 | 1-4-8 | 1-4-5 | 1-2-12 | 1-2-8 | 1-2-5 | 1-12-8 | 1-12-5 | 1-8-5  

---

## PASS / CAVEATS

- **#4** only **1** HK form line — MC still rates frame; watch late market.  
- **#5** no form in DB; **#9** / **#6** low Adj Place — Mode B sixth is marginal.  
- Re-run `fetch-odds.ts` if pool has moved.  

**CONFIDENCE:** **HIGH** on **#1 / #3 / #4 / #2** in the frame; **MEDIUM–LOW** on **#9 / #6** for third (Strategy A); Strategy B adds **#12 / #8 / #5** for short-win coverage.

---

*Generated from fresh MC + HKJC odds JSON — replaces earlier R5 trio notes.*
