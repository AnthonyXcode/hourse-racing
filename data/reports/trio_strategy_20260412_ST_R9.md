# TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-04-12 | Race 9

**Refreshed:** Full **trio-strategy** pipeline (Steps **1b–1f**, **2–5** below). MC `analyze-race.ts` **10,000** iters, `--form-data all`; HKJC odds `data/odds/odds_20260412_ST.json` (R9, `fetch-odds.ts` **2026-04-12**); jockey boosts `data/jockeys/jockey_stats_20260411.json` (`fetch-jockey-stats.ts --date=2026-04-12`).  
**Prior suggestions superseded** — this file matches **current** pool data only.

---

### Pipeline log (no steps skipped)

| Step | Action | Result |
|------|--------|--------|
| **1b** | `sync-historical.ts` | All historical data is up to date |
| **1c** | `fetch-jockey-stats.ts --date=2026-04-12` | `jockey_stats_20260411.json` + `JOCKEY_STATS.md` (some codes skipped parse — see caveats) |
| **1d** | `fetch-odds.ts --date=2026-04-12 --venue=ST --json --save` | `odds_20260412_ST.json` refreshed (R9 block current) |
| **1e** | Race card via analyzer | `racecard_20260412_ST_R9.json` |
| **1f** | SCMP racecard | [Race 9 — Jordan Hcp](https://www.scmp.com/sport/racing/racecard/9) — card, TIR, vet, Q matrix (tipster brackets **not** used in numbers) |
| **2** | Validate | **12** starters; Going **Good** (default); **11/12** form in MC (**#7** **0** HK lines); SCMP cross-check ✅ |
| **3** | MC simulation | 10,000 iters, `--form-data all` |
| **4–5** | Strategy A + B | This file |

**DATA VALIDATION:** **12** starters (Trio OK). **RACE:** R9 — **JORDAN HANDICAP** | Class **3** | **1400m Turf** | **12** runners  

**SCMP (Step 1f / Step 2):** Page loaded — Star Form, TIR, vet report, quinella matrix available. **Strategy A table below is jockey-only (no SCMP ±% on Adj)** — same convention as R4–R8 refreshes; SCMP risk notes are in **PASS / CAVEATS** only.

---

## MC SIMULATION (raw)

**Sort:** MC **Win%** desc. **Form** = HK runs in MC. **Place%>20%** = MC Place% > 20%. **Win odds<10** = HKJC win < 10.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 5 | ALL'S WELL | 41.3% | 73.4% | 11 | ✅ | ❌ | 7 | ★ 膽 (MC #1) | 1-5: 13.9% (7.2) |
| 1 | ENDEARED | 14.1% | 44.1% | 5.1 | ✅ | ✅ | 11 | 腳 | 5-11: 11.7% (8.6) |
| 11 | POSITIVE SMILE | 11.4% | 38.7% | 15 | ✅ | ❌ | 8 | 腳 | 2-5: 8.5% (11.8) |
| 2 | HEAVING | 8.6% | 30.6% | 11 | ✅ | ❌ | 5 | 腳 | 5-12: 5.7% (17.5) |
| 12 | REFUSETOBEENGLISH | 5.2% | 22.1% | 8.9 | ✅ | ✅ | 9 | 腳 | 3-5: 4.6% (21.6) |
| 3 | CHARMING LEGEND | 4.4% | 19.6% | 6.3 | ❌ | ✅ | 2 | add-on | — |
| 10 | FLASH CURRENT | 4.2% | 19.1% | 15 | ❌ | ❌ | 6 | — | — |
| 6 | COMPLETE UNKNOWN | 3.9% | 16.5% | 47 | ❌ | ❌ | 1 | — | — |
| 7 | FORTUNE LINK | 3.7% | 17.0% | 17 | ❌ | ❌ | 0 | — | — |
| 4 | OUTGATE | 1.9% | 10.2% | 19 | ❌ | ❌ | 9 | — | — |
| 8 | GHORGAN | 1.4% | 8.4% | 3.8 | ❌ | ✅ | 7 | add-on | — |
| 9 | PRAY FOR JUSTICE | 0.0% | 0.3% | 20 | ❌ | ❌ | 1 | — | — |

**Market vs MC:** **#5** large place edge vs pool; **#8** / **#9** flagged overvalued vs thin MC win.

---

## HORSE RANKINGS — Strategy A (jockey only; no SCMP pass)

**Jockey boost:** `win% ≤ 7 ? 0 : min(7, 1 + (win% − 7) × 6 / 13)`; outside MC top **4** → cap **+4%**. **H Y Yuen** uses HKJC card `winRate` (**20%** on **5** rides) — not in JSON. **C L Chau** uses card **10.09%** when needed.

**Table sorted by Adj Win% (desc).** MC top **4** by Win: **#5, #1, #11, #2**.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 5 | ALL'S WELL | 41.3% | 73.4% | jockey +1.7 | jockey +1.7 | **43.0%** | **75.1%** | 11 | C Y Ho | — | ★ 膽 |
| 1 | ENDEARED | 14.1% | 44.1% | jockey +6.8 | jockey +6.8 | **20.9%** | **50.9%** | 5.1 | Z Purton | — | 腳 |
| 11 | POSITIVE SMILE | 11.4% | 38.7% | jockey 0 | jockey 0 | **11.4%** | **38.7%** | 15 | M L Yeung | — | 腳 |
| 2 | HEAVING | 8.6% | 30.6% | jockey +1.8 | jockey +1.8 | **10.4%** | **32.4%** | 11 | L Ferraris | — | 腳 |
| 12 | REFUSETOBEENGLISH | 5.2% | 22.1% | jockey +2.8 | jockey +2.8 | **8.0%** | **24.9%** | 8.9 | A Atzeni | — | 腳 |
| 3 | CHARMING LEGEND | 4.4% | 19.6% | jockey +4 (cap) | jockey +4 (cap) | **8.4%** | **23.6%** | 6.3 | J Moreira | — | Str B add |
| 7 | FORTUNE LINK | 3.7% | 17.0% | jockey +4 (cap) | jockey +4 (cap) | **7.7%** | **21.0%** | 17 | H Y Yuen (-10) | — | — |
| 10 | FLASH CURRENT | 4.2% | 19.1% | jockey +1.3 | jockey +1.3 | **5.5%** | **20.4%** | 15 | H Bentley | — | — |
| 6 | COMPLETE UNKNOWN | 3.9% | 16.5% | jockey 0 | jockey 0 | **3.9%** | **16.5%** | 47 | K C Leung | — | — |
| 8 | GHORGAN | 1.4% | 8.4% | jockey +2.4 | jockey +2.4 | **3.8%** | **10.8%** | 3.8 | C L Chau (-2) | — | Str B add |
| 4 | OUTGATE | 1.9% | 10.2% | jockey 0 | jockey 0 | **1.9%** | **10.2%** | 19 | Y L Chung (-2) | — | — |
| 9 | PRAY FOR JUSTICE | 0.0% | 0.3% | jockey 0 | jockey 0 | **0.0%** | **0.3%** | 20 | R Kingscote | — | — |

**Classification:** **Dominant** (**43.0% ≥ 35%**). **Mode A** five: **#5, #1, #11, #2, #12** (banker + top **4** Adj Place ex-**#5**: **#1, #11, #2, #12**). **No 雙膽** — **#1** second Adj Win, **Adj Place 50.9% &lt; 63%**.

**單膽拖:** **膽 #5** + 腳 **#1, #11, #2, #12** → C(4,2) = **6** → **$60** ($10 × 6).

**Banker eligibility:** **#5** has **7** HK form lines ✅.

**Alternative (full pool):** C(5,3) = **10** → **$100**.

---

## TRIO POOL — Strategy A

**POOL:** #5, #1, #11, #2, #12  

**單膽拖:** **膽** #5 ALL'S WELL  
**腳:** #1 ENDEARED, #11 POSITIVE SMILE, #2 HEAVING, #12 REFUSETOBEENGLISH  

**COMBINATIONS:** **6**  
**UNIT BET:** **$10**  
**TOTAL STAKE:** **$60**

**Trios (any order):** **5-1-11** | **5-1-2** | **5-1-12** | **5-11-2** | **5-11-12** | **5-2-12**

**Full pool (no banker structure):** C(5,3) = **10** → **$100**

---

## STRATEGY B (MC-only)

**Banker:** #5 ALL'S WELL (**41.3%** / **73.4%**)  
**Primary legs (MC Place% > 20%, ex-banker):** #1, #11, #2, #12  

**Win odds &lt; 10, Place% ≤ 20%** (win asc): **#8** GHORGAN (**1.4%** / **3.8**) — no primary leg in MC Place **20–30%** **and** Win **&gt; 10** (**#12** is **22.1%** / **8.9**; **#2** is **30.6%** place → treated as **outside** strict **≤30%** band) → **add #8**. **#3** CHARMING LEGEND (**4.4%** / **6.3**) — still **no** qualifying replaceable primary → **add #3**. **#12** MC place **22.1%** (not ≤20%) → **not** a candidate. **#10** win **15** (not **&lt; 10**) → **not** a candidate.

**Final legs:** #1, #11, #2, #12, #8, #3  

**膽拖:** C(6,2) = **15** → **$150**  
**Trios:** 5-1-11 | 5-1-2 | 5-1-12 | 5-1-8 | 5-1-3 | 5-11-2 | 5-11-12 | 5-11-8 | 5-11-3 | 5-2-12 | 5-2-8 | 5-2-3 | 5-12-8 | 5-12-3 | 5-8-3  

---

## PASS / CAVEATS

- **#12** Adj Place **24.9%** &lt; **25%** must-include bar — kept as Mode A fourth leg by Adj Place rank after **#1 / #11 / #2**.  
- **#7** no HK form in MC. **#9** ~**0%** MC win — market **20** vs model.  
- **SCMP / vet (read in Step 1f, not applied to Adj table):** **#3** historic trachea blood (cleared per card); **#9** prior lameness (cleared); TIR notes on several runners — see SCMP if staking live.  
- **Jockey fetch:** W Chau / some codes failed parse — boosts use JSON or HKJC card as per table.  
- Re-run **1d** / **1c** if meeting day pool shifts.  

**CONFIDENCE:** **HIGH** on **#5** in the frame; **MEDIUM** on **#1 / #11 / #2 / #12** for remaining slots.

---

*Generated from full pipeline + fresh MC + HKJC odds — replaces earlier R9 trio notes.*
