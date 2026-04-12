# TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-04-12 | Race 2

**Refreshed:** MC `analyze-race.ts` **10,000** iters, `--form-data all` (current run); HKJC win odds from `data/odds/odds_20260412_ST.json` + `racecard_20260412_ST_R2.json` (aligned); jockey boosts from `data/jockeys/jockey_stats_20260411.json`.  
**Prior suggestions superseded** — this file matches **current** pool data only.

**DATA VALIDATION:** **14** starters (Trio OK). Going: **Good** (default). **14/14** form enriched in MC.  
**ODDS (HKJC R2):** #9 **1.9**, #1 **9.7**, #10 **9.8**, #8 **10**, #3 **11**, #11 **16**, #12 **17**, #6 **18**, #4 **32**, #5 **53**, #7 **70**, #13 **70**, #14 **106** — `data/odds/odds_20260412_ST.json`.

**RACE:** R2 — **Class 5** | **1400m Turf** | **14** runners  

---

## MC SIMULATION (raw)

**Sort:** MC **Win%** desc. **Form** = HK runs in MC. **Place%>20%** = MC Place% > 20%. **Win odds<10** = HKJC win < 10.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 9 | WINNING MACHINE | 44.1% | 88.6% | 1.9 | ✅ | ✅ | 9 | ★ 膽 (MC #1) | 9-10: 47.9% (2.1) |
| 10 | YEE CHEONG RAIDER | 39.1% | 86.7% | 9.8 | ✅ | ✅ | 4 | 腳 | — |
| 11 | PANDA LEGEND | 11.4% | 58.4% | 16 | ✅ | ❌ | 6 | 腳 | 9-11: 15.6% (6.4) |
| 12 | HE WAS ME | 1.8% | 19.2% | 17 | ❌ | ❌ | 9 | — | — |
| 8 | DASH | 1.3% | 14.1% | 10 | ❌ | ❌ | 6 | — | — |
| 5 | WINNING CIGAR | 0.9% | 11.4% | 53 | ❌ | ❌ | 6 | — | — |
| 4 | CALL TO COMMAND | 0.9% | 11.2% | 32 | ❌ | ❌ | 10 | — | — |
| 7 | BASIC INSTINCT | 0.4% | 6.4% | 70 | ❌ | ❌ | 7 | — | — |
| 3 | SETANTA | 0.1% | 1.3% | 11 | ❌ | ❌ | 9 | — | — |
| 13 | MR GOOD VIBES | 0.0% | 0.9% | 70 | ❌ | ❌ | 6 | — | — |
| 6 | WINNING DIAMOND | 0.0% | 0.9% | 18 | ❌ | ❌ | 6 | — | — |
| 2 | ONE LOVE | 0.0% | 0.4% | 21 | ❌ | ❌ | 8 | — | — |
| 1 | GOOD FORTUNE | 0.0% | 0.3% | 9.7 | ❌ | ✅ | 9 | add-on | — |
| 14 | ISLAND GOLDEN | 0.0% | 0.1% | 106 | ❌ | ❌ | 7 | — | — |

**Market vs MC:** **#9** short win (**1.9**) vs **44%** MC; **#10** strong place edge vs pool (**~210%** place edge in analyzer).

---

## HORSE RANKINGS — Strategy A (jockey only; no SCMP pass)

**Jockey boost:** `win% ≤ 7 ? 0 : min(7, 1 + (win% − 7) × 6 / 13)`; outside MC top **4** → cap **+4%**.  
MC top **4** by Win: **#9, #10, #11, #12**.

**Table sorted by Adj Win% (desc).**

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 9 | WINNING MACHINE | 44.1% | 88.6% | jockey +7 | jockey +7 | **51.1%** | **95.6%** | 1.9 | J Moreira | — | ★ 膽 1 |
| 10 | YEE CHEONG RAIDER | 39.1% | 86.7% | jockey 0 | jockey 0 | **39.1%** | **86.7%** | 9.8 | L Hewitson | — | ★ 膽 2 |
| 11 | PANDA LEGEND | 11.4% | 58.4% | jockey +1.5 | jockey +1.5 | **12.9%** | **59.9%** | 16 | J Orman | — | 腳 |
| 6 | WINNING DIAMOND | 0.0% | 0.9% | jockey +3.2 | jockey +3.2 | **3.2%** | **4.1%** | 18 | H Bowman | — | — |
| 2 | ONE LOVE | 0.0% | 0.4% | jockey +2.8 | jockey +2.8 | **2.8%** | **3.2%** | 21 | A Atzeni | — | — |
| 4 | CALL TO COMMAND | 0.9% | 11.2% | jockey +1.3 | jockey +1.3 | **2.2%** | **12.5%** | 32 | H Bentley | — | — |
| 3 | SETANTA | 0.1% | 1.3% | jockey +1.8 | jockey +1.8 | **1.9%** | **3.1%** | 11 | L Ferraris | — | — |
| 12 | HE WAS ME | 1.8% | 19.2% | jockey 0 | jockey 0 | **1.8%** | **19.2%** | 17 | K Teetan | — | 腳 |
| 1 | GOOD FORTUNE | 0.0% | 0.3% | jockey +1.5 | jockey +1.5 | **1.5%** | **1.8%** | 9.7 | P N Wong | — | Str B add |
| 8 | DASH | 1.3% | 14.1% | jockey 0 | jockey 0 | **1.3%** | **14.1%** | 10 | A Badel | — | 腳 |
| 5 | WINNING CIGAR | 0.9% | 11.4% | jockey 0 | jockey 0 | **0.9%** | **11.4%** | 53 | B Avdulla | — | — |
| 7 | BASIC INSTINCT | 0.4% | 6.4% | jockey 0 | jockey 0 | **0.4%** | **6.4%** | 70 | K C Leung | — | — |
| 13 | MR GOOD VIBES | 0.0% | 0.9% | jockey 0 | jockey 0 | **0.0%** | **0.9%** | 70 | R Kingscote | — | — |
| 14 | ISLAND GOLDEN | 0.0% | 0.1% | jockey 0 | jockey 0 | **0.0%** | **0.1%** | 106 | Y L Chung | — | — |

**Classification:** **Dominant** (**51.1% ≥ 35%**). **Mode A** five: **#9, #10, #11, #12, #8** (next **3** **Adj Place** among non-膽 after **#9**/**#10**: **#11**, **#12**, **#8**).  
**雙膽拖:** **#10** second Adj Win, **Adj Place 86.7% ≥ 63%** → **膽 #9 + 膽 #10**.  
**腳:** **#11, #12, #8** → **3** trios → **$30** ($10 × 3).

**Banker eligibility:** **#9** has **9** HK form lines ✅.

**Alternative (single 膽):** **膽 #9** + 腳 **#10, #11, #12, #8** → C(4,2) = **6** → **$60**.

---

## TRIO POOL — Strategy A

**POOL:** #9, #10, #11, #12, #8  

**雙膽拖:** **膽** #9 WINNING MACHINE | **膽** #10 YEE CHEONG RAIDER  
**腳:** #11 PANDA LEGEND, #12 HE WAS ME, #8 DASH  

**COMBINATIONS:** **3**  
**UNIT BET:** **$10**  
**TOTAL STAKE:** **$30**

**Trios (any order):** **9-10-11** | **9-10-12** | **9-10-8**

---

## STRATEGY B (MC-only)

**Banker:** #9 WINNING MACHINE (**44.1%** / **88.6%**)  
**Primary legs (MC Place% > 20%, ex-banker):** #10, #11  

**Win odds < 10, Place% ≤ 20%:** no primary leg in MC Place **20–30%** with Win **> 10** → **no swap**. **#8** win **10** (not **&lt; 10**) → **not** added. **Add** **#1** GOOD FORTUNE (0.3% / **9.7**).  

**Final legs:** #10, #11, #1  

**膽拖:** C(3,2) = **3** → **$30**  
**Trios:** 9-10-11 | 9-10-1 | 9-11-1  

---

## PASS / CAVEATS

- **#9** or **#10** scratched → rebuild (both are structural).  
- MC mass on **9–10** quinella (**~48%**); tail **#12/#8** is cheap frame cover.  
- Re-run `fetch-odds.ts` before betting if odds have moved.  

**CONFIDENCE:** **HIGH** on **9–10** in the frame **per model**; **MEDIUM** on **#11/#12/#8** for third.

---

*Generated from fresh MC + current HKJC odds snapshot — replaces earlier R2 trio notes.*
