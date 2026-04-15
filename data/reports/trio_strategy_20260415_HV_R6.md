═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-04-15 | Race 6
═══════════════════════════════════════════════════════════

**DATA VALIDATION:** ✅ Passed | **Going:** Good (default) | **Scratchings:** None in HKJC field of **12**; SCMP lists reserves (R) not in this race.

**MC SIMULATION:** 10,000 iterations | `--form-data all` | `tools/analyze-race.ts`

**SCMP DATA:** ✅ Loaded (**RACING WITH RUGBY HANDICAP - Sec2**, Star Form, TIR, Vet on **#6**, trackwork). Tipster columns ignored.

**ODDS SOURCE:** `data/odds/odds_20260415_HV.json` (R6 `fetchedAt` 2026-04-15T03:34:52.628Z).

**Jockey stats:** `data/jockeys/jockey_stats_20260414.json`

---

**RACE:** R6 — Class 4 | **1200m** Turf | “A” Course | Good | **12** runners

**CLASSIFICATION:** **Dominant** on **#8**, but **Adj Place ≥ 25%** applies to **six** runners → use **Mode B — Standard pool (6 horses)** so every **must-include** horse is in the pool.

**POOL SIZE:** **6** | **MODE:** **B — Standard pool**

**BET STRUCTURE:** **膽拖** | 1 膽 (**#8**) + **5** 腳 → **C(5,2) = 10** | Unit **$10** → **HK$100**

---

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — all 12 runners
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 8 | QUARTZ LEGEND | 32.2% | 69.0% | 3.7 | ✅ | Yes | 7 | ★ Banker | 5-8: 12.7% (7.9) |
| 5 | GOLDEN EMPIRE | 17.0% | 49.5% | 12.0 | ✅ | No | 9 | Leg | 4-8: 12.6% (7.9) |
| 4 | TEAM TEAM FOLKS | 16.4% | 49.1% | 11.0 | ✅ | No | 4 | Leg | 1-8: 11.0% (9.1) |
| 1 | MOTOR | 13.8% | 44.5% | 15.0 | ✅ | No | 7 | Leg | 8-11: 8.9% (11.3) |
| 11 | PRESTIGE HALL | 10.9% | 39.4% | 5.3 | ✅ | Yes | 6 | Leg | 4-5: 6.2% (16.1) |
| 2 | NORTHERN FIRE BALL | 6.0% | 26.1% | 10.0 | ✅ | No | 8 | Leg (must-include) | — |
| 9 | CLOUD NINE | 2.7% | 15.3% | 6.3 | ❌ | Yes | 3 | — (B add) | — |
| 10 | NEXT FORTUNE | 0.5% | 3.6% | 44.0 | ❌ | No | 1 | — | — |
| 3 | STORMING DRAGON | 0.2% | 1.4% | 6.7 | ❌ | Yes | 13 | — (B add) | — |
| 7 | ORIGIN OF FORM | 0.2% | 1.1% | 26.0 | ❌ | No | 5 | — | — |
| 6 | RYUI KOKOROE | 0.1% | 0.8% | 26.0 | ❌ | No | 6 | — | — |
| 12 | FLYING CHRISTIE | 0.0% | 0.1% | 35.0 | ❌ | No | 6 | — | — |

**Market (brief):** **#8** short in win pool vs MC; **#1** / **#5** flagged undervalued in analyser. Overround ~22.5%.

---

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — jockey boost + SCMP)
───────────────────────────────────────────────────────────

**Jockey boost:** `win% ≤ 7 → 0`; else `min(7, 1 + (win% − 7) × 6 / 13)`; if MC **win rank > 4**, cap at **+4%**.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 8 | QUARTZ LEGEND | 32.2% | 69.0% | jockey +7.0, excuses +1 | same | **40.2%** | **77.0%** | 3.7 | J Moreira | TIR bumped (minor) | ★ 膽 |
| 5 | GOLDEN EMPIRE | 17.0% | 49.5% | jockey +1.4, excuses +2 | same | **20.4%** | **52.9%** | 12.0 | J Orman | TIR bump / “flat” (TIR) | 腳 |
| 4 | TEAM TEAM FOLKS | 16.4% | 49.1% | jockey +1.8, excuses +2 | same | **20.2%** | **52.9%** | 11.0 | C Y Ho | TIR bump / late bump | 腳 |
| 1 | MOTOR | 13.8% | 44.5% | jockey +2.8, form +1 | same | **17.6%** | **48.3%** | 15.0 | A Atzeni | Valley 1200 win (Star) | 腳 |
| 11 | PRESTIGE HALL | 10.9% | 39.4% | jockey +4.0†, excuses +2 | same | **16.9%** | **45.4%** | 5.3 | Z Purton | Held up; wide draw (TIR) | 腳 |
| 2 | NORTHERN FIRE BALL | 6.0% | 26.1% | jockey 0, form +1 | same | 7.0% | **27.1%** | 10.0 | C L Chau | HV 1200 front (P Woo) | 腳 |
| 9 | CLOUD NINE | 2.7% | 15.3% | jockey +1.8 | same | 4.5% | 17.1% | 6.3 | L Ferraris | Trial strong (trackwork) | — |
| 3 | STORMING DRAGON | 0.2% | 1.4% | jockey +3.2‡ | same | 3.4% | 4.6% | 6.7 | H Bowman | C&D form (P Woo) | — |
| 6 | RYUI KOKOROE | 0.1% | 0.8% | jockey +1.4, vet −3 | vet −3 | 0.0% | 0.0% | 26.0 | H Bentley | Trachea / vet note | — |
| 7 | ORIGIN OF FORM | 0.2% | 1.1% | jockey 0, excuses +1 | same | 1.2% | 2.1% | 26.0 | M F Poon | TIR bump | — |
| 10 | NEXT FORTUNE | 0.5% | 3.6% | jockey 0 | same | 0.5% | 3.6% | 44.0 | M L Yeung | Contact (TIR) | — |
| 12 | FLYING CHRISTIE | 0.0% | 0.1% | jockey +1.3 | same | 1.3% | 1.4% | 35.0 | P N Wong | Slow begin (TIR) | — |

†Purton **#11** is MC **win rank 5** (outside top 4) → boost **capped at +4%**.  
‡Bowman **#3** is **rank 9** → boost **capped at +4%** (raw ~3.2%).

**Must-include Adj Place ≥ 25%:** **#8, #5, #4, #1, #11, #2** — all **six** must sit in the pool (**#2** ~**27.1%** Adj Place).

**Banker:** **#8** has full form history — **not** a debutant.

---

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────

**POOL:** #**8**, #**5**, #**4**, #**1**, #**11**, #**2**

**MODE:** B | **POOL SIZE:** 6 (all **must-include** Place ≥ 25%)

**膽拖**

- **膽:** #**8** **QUARTZ LEGEND** (1st **Adj Win%**)
- **腳:** #**5**, #**4**, #**1**, #**11**, #**2**

**Combinations:** C(5,2) = **10** | **HK$100**

**The 10 Trio lines (banker 8):**  
8-5-4, 8-5-1, 8-5-11, 8-5-2, 8-4-1, 8-4-11, 8-4-2, 8-1-11, 8-1-2, 8-11-2

---

**TOP TRIO GROUPS (Σ Adj Place%, heuristic)**

| Rank | Horses |
|------|--------|
| 1 | 8 — 5 — 4 |
| 2 | 8 — 5 — 1 |
| 3 | 8 — 4 — 1 |

---

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────

| Item | Value |
|------|--------|
| Combinations | 10 (膽拖) |
| Unit | $10 |
| **Total stake** | **HK$100** |

**PASS CONDITIONS:** If **#8** scratched → void. Fewer than **3** starters → refund. **Heavy** going → HV 1200 often on-pace; reassess closers.

**CONFIDENCE:** **MEDIUM–HIGH** on **#8** anchoring; race is still **Class 4 sprint** with several live chances.

**CAVEATS:** **#6** recent trachea / vet line — excluded from pool on MC + adjustment. Confirm odds close to jump.

---

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────

**Banker:** #**8** (MC Win **32.2%**, MC Place **69.0%**).

**Primary legs** (MC Place% **> 20%**, ex-banker): #**5**, #**4**, #**1**, #**11**, #**2** (26.1%).

**Win-odds candidates** (MC Place ≤ 20% **and** Win odds **below 10**), **ascending win odds:**

| Order | Horse | MC Place% | Win odds |
|-------|--------|-----------|----------|
| 1 | CLOUD NINE (#9) | 15.3% | 6.3 |
| 2 | STORMING DRAGON (#3) | 1.4% | 6.7 |

**Replaceable primary** (MC Place **20–30%** **and** Win **> 10**): **none** (**#2** at **26.1%** has Win **10.0** — not strictly **above** 10).

**Action:** **Add #9**, then **#3** (no swap each time).

**Final legs:** #5, #4, #1, #11, #2, #9, #3 → **7** legs.

**膽拖:** C(7,2) = **21** combinations → **HK$210**

**Note:** Strategy B is **wider** here because two short-priced horses sit **below** 20% MC Place. To **cap cost**, you may play **primary legs only** (5 legs → **10** lines / **HK$100**) or **primary + first add** (#9 only → **6** legs → **15** lines / **HK$150**).

---

**STRATEGY B — lean option (primary only, align with Strategy A)**

If you restrict Strategy B to **primary legs only** (no **#9/#3** adds): **#5,#4,#1,#11,#2** → **C(5,2) = 10** / **HK$100** — **same horse set and stake as Strategy A**.

═══════════════════════════════════════════════════════════

*Trio (單T) = 1st, 2nd, 3rd in any order. Not financial advice.*
