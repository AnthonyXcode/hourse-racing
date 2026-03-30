═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY — SHA TIN | 2026-03-29 | RACE 7
═══════════════════════════════════════════════════════════

**RACE:** R7 — Graduate School Alumni Handicap | **1200M** | Turf **“A+3”** | **Good** (default; card parse warning in MC) | **14** runners | **Class 4** (60–40)

**Meeting:** Sha Tin 2026-03-29 | **MC:** 10,000 iterations | **Form data:** all venues (HV + ST)

---

## DATA VALIDATION

| Check | Status |
|-------|--------|
| Field size (≥3) | ✅ 14 runners |
| MC simulation | ✅ Completed (`analyze-race.ts`) |
| Odds | ✅ `data/odds/odds_20260329_ST.json` (HKJC pool); SCMP cross-check |
| Jockey stats | ✅ `data/jockeys/jockey_stats_20260328.json` |
| SCMP | ✅ [racecard/7](https://www.scmp.com/sport/racing/racecard/7) — Star Form, TIR, Vet, trackwork (tipsters ignored) |
| Scratchings | Verify at declaration (SCMP shows reserve rows for scratched entries — not in MC field of 14) |

**Jockey boost (this report):** `boost = 0` if jockey win% ≤ 7; else `min(7, 1 + (win% − 7) × 6 ÷ 13)`; if MC **win rank > 4**, cap boost at **+4.0** (percentage points). Same **pp** applied to Adj Win% and Adj Place% from MC baseline. **SCMP** adjustments capped **±8** Win%, **±10** Place% net per horse.

**ODDS SOURCE:** HKJC JSON (fetched 2026-03-28) | **SCMP odds:** ✅ (aligned for R7)

---

**CLASSIFICATION:** **Dominant** (top Adj Win% **#4 WARRIORS DREAM 36.6%** ≥ 35%)  
**POOL SIZE:** **6** (expanded from Mode A “5” — **six** distinct runners have **Adj Place% ≥ 25%**, all mandatory in pool)  
**MODE:** **B (6)** — standard 6-horse pool  
**BET STRUCTURE (Strategy A):** **膽拖** | **1膽 + 5腳** | **C(5,2) = 10** combinations  
**UNIT BET:** $10/combo → **TOTAL STAKE: $100**

---

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

**Top quinella (MC):** 4–8 **14.2%** (fair ~7.0) | 4–10 **7.6%** | 4–9 **6.6%** | 4–13 **6.3%**

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Q (MC) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|------------|
| 4 | WARRIORS DREAM | 34.6% | 66.8% | 7.6 | ✅ | ✅ | 6 | ★ 膽 (MC #1 Win) | 4–8: 14.2% |
| 8 | RELENTLESS PURSUIT | 18.0% | 48.6% | 7.9 | ✅ | ✅ | 1 | 腳 | — |
| 10 | VIGOR EYE | 9.2% | 33.0% | 8.2 | ✅ | ✅ | 4 | 腳 | — |
| 9 | LIVE WIRE | 7.9% | 28.8% | 4.6 | ✅ | ✅ | 4 | 腳 | — |
| 13 | BETTER AND BETTER | 7.9% | 29.2% | 10.0 | ✅ | ❌ | 7 | 腳 | — |
| 3 | SUPERB BOY | 5.9% | 21.7% | 26.0 | ✅ | ❌ | 8 | replaced (see B) | — |
| 11 | ALABAMA SONG | 5.5% | 21.7% | 6.1 | ✅ | ✅ | 10 | 腳 | — |
| 1 | JOY CAPITAL | 5.1% | 21.4% | 19.0 | ✅ | ❌ | 4 | replaced out (see B) | — |
| 12 | SUPER MASTERMIND | 4.1% | 16.9% | 85.0 | ❌ | ❌ | 5 | — | — |
| 5 | LIGHTNING ACE | 0.8% | 4.8% | 38.0 | ❌ | ❌ | 1 | — | — |
| 14 | RUNJEET | 0.5% | 3.2% | 33.0 | ❌ | ❌ | 3 | — | — |
| 2 | REAL GENTLEMAN | 0.4% | 2.8% | 82.0 | ❌ | ❌ | 5 | — | — |
| 6 | MIGHTY FIGHTER | 0.1% | 0.7% | 7.4 | ❌ | ✅ | 0 | 腳 (replacement in) | — (replacement) |
| 7 | PRESTIGE EMPEROR | 0.0% | 0.4% | 19.0 | ❌ | ❌ | 0 | — | — |

**Market (MC log):** Overround ~−10.2%; #4 flagged **undervalued** vs model; #6/#11 **overvalued** vs MC.

---

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — Adj Win% / Adj Place%)
───────────────────────────────────────────────────────────

Sorted by **Adj Win%** (all 14). **Factors** = reason list (jockey pp + SCMP pp). **Style** from Star Form / MC context.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 4 | WARRIORS DREAM | 34.6% | 66.8% | jockey +1.0, +form +1 | jockey +1.0, +form +1 | 36.6% | 67.8% | 7.6 | L Hewitson | Stalker / off-pace | +form | ★ 膽 |
| 8 | RELENTLESS PURSUIT | 18.0% | 48.6% | jockey +1.9 | jockey +1.9 | 19.9% | 50.5% | 7.9 | L Ferraris | Variable | — | 腳 |
| 9 | LIVE WIRE | 7.9% | 28.8% | jockey +7.0, excuses +2 | jockey +7.0, excuses +2 | 16.9% | 37.8% | 4.6 | Z Purton | Mid / box | +excuses (held up) | 腳 |
| 11 | ALABAMA SONG | 5.5% | 21.7% | jockey +2.8, excuses +2 | jockey +2.8, excuses +2 | 10.3% | 26.5% | 6.1 | A Atzeni | Wide trip last | +excuses (wide) | 腳 |
| 13 | BETTER AND BETTER | 7.9% | 29.2% | jockey 0, excuses +2 | jockey 0, excuses +2 | 9.9% | 31.2% | 10.0 | A Badel | Mid / keen | +excuses (steadied) | 腳 |
| 10 | VIGOR EYE | 9.2% | 33.0% | jockey +1.3, −perf −2 | jockey +1.3, −perf −2 | 8.5% | 31.3% | 8.2 | H Bentley | Leader / forward | −perf (disappointing) | 腳 |
| 1 | JOY CAPITAL | 5.1% | 21.4% | jockey +1.5, +form +1 | jockey +1.5, +form +1 | 7.6% | 22.9% | 19.0 | J Orman | Handy | +form | — |
| 12 | SUPER MASTERMIND | 4.1% | 16.9% | jockey 0, excuses +2 | jockey 0, excuses +2 | 6.1% | 18.9% | 85.0 | B Avdulla | Mid | +excuses | — |
| 6 | MIGHTY FIGHTER | 0.1% | 0.7% | jockey +3.3, +trial +2 | jockey +3.3, +trial +2 | 5.4% | 6.0% | 7.4 | H Bowman | Debut | +trial (dirt trial) | — |
| 5 | LIGHTNING ACE | 0.8% | 4.8% | jockey +2.3, excuses +2 | jockey +2.3, excuses +2 | 5.1% | 7.1% | 38.0 | C L Chau | — | +excuses (contact) | — |
| 14 | RUNJEET | 0.5% | 3.2% | jockey 0, excuses +2 | jockey 0, excuses +2 | 2.5% | 5.2% | 33.0 | R Kingscote | Rear | +excuses | — |
| 3 | SUPERB BOY | 5.9% | 21.7% | jockey +1.8, −injury30d −3, −perf −2 | jockey +1.8, −injury30d −4, −perf −2 | 2.7% | 17.5% | 26.0 | C Y Ho | — | −injury30d (vet pass 10/03), −perf | — |
| 2 | REAL GENTLEMAN | 0.4% | 2.8% | 0 | 0 | 0.4% | 2.8% | 82.0 | Y L Chung | — | — | — |
| 7 | PRESTIGE EMPEROR | 0.0% | 0.4% | 0 | 0 | 0.0% | 0.4% | 19.0 | K Teetan | Trial form | — | — |

**Reasoning:** MC centres the race on **#4**; **Purton / #9** and **Atzeni / #11** gain jockey + SCMP luck lines without breaching caps. **#10** is pulled down by stewards’ “disappointing” narrative but stays in pool (**Adj Place% ≥ 25%**). **Six** runners ≥**25%** Adj Place% → **6-horse pool** (not 5). **#3** vet/trial narrative within 30d of pass keeps Adj Win% suppressed — excluded from Strategy A pool despite MC Place% > 20%.

---

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────

**POOL:** **#4, #8, #9, #10, #11, #13**  
**MODE:** B (6) | **Dominant** favourite + mandatory **≥25%** place frame runners

**膽拖:**  
- **膽 (Banker):** **#4 WARRIORS DREAM** (Adj Place% **67.8%**)  
- **腳:** **#8, #9, #10, #11, #13**  
- **COMBINATIONS:** **C(5,2) = 10** | **Stake:** **10 × $10 = $100**

**雙膽拖:** No — 2nd by Adj Win% (**#8**) Adj Place% **50.5%** < **63%**.

**TOP TRIO GROUPS (by sum Adj Place%, illustrative):**

| Rank | Horses | Σ Adj Place% |
|------|--------|----------------|
| 1 | 4-8-9 | 156.1% |
| 2 | 4-8-10 | 149.6% |
| 3 | 4-8-13 | 149.5% |
| 4 | 4-9-10 | 136.9% |
| 5 | 4-11-13 | 125.5% |

---

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────

- **COMBINATIONS:** 10（膽拖）  
- **UNIT BET:** $10  
- **TOTAL STAKE:** **$100**  
- **CONFIDENCE:** **HIGH** (dominant MC + structured frame; banker top-3 rate historically strong — variance remains)

**PASS / VOID:** Banker **#4** scratched → void ticket; field <3 → refund; reassess if going **Heavy**.

**CAVEATS:** MC warned going parse; HKJC vs SCMP win prices differ slightly on some runners — use live board at bet time. **#6** is MC-short but market-short — included in Strategy B only via replacement rule.

---

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────

- **Banker:** **#4 WARRIORS DREAM** (MC Win **34.6%**, Place **66.8%**)  
- **Primary legs (MC Place% > 20%, ex-banker):** **#8, #10, #9, #13, #3, #11, #1**  
- **Replaceable legs (MC Place% 20–30% & Win odds > 10):** **#3** (Place **21.7%**, Win **26**), **#1** (Place **21.4%**, Win **19**) — weakest MC Place among replaceable: **#1**  
- **Win-odds candidates (Place% ≤ 20% & Win < 10):** **#6 MIGHTY FIGHTER** (Win **7.4**, Place **0.7%**) — process first (only candidate)  
- **Action:** **Replace #1 with #6** (1-for-1 onto weakest replaceable primary in 20–30% band with Win > 10)

**Final legs:** **#8, #10, #9, #13, #3, #11, #6**  
**BET STRUCTURE:** 膽拖 | **1膽 + 7腳** | **C(7,2) = 21**  
**TOTAL STAKE:** **$210**

**STRATEGY B vs A:** B keeps **#3** (MC place leg) and adds market-favoured **#6** by rule; **higher cost**, wider tail coverage vs A’s **≥25% Adj Place** cut.

═══════════════════════════════════════════════════════════
