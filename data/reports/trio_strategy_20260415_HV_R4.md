═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-04-15 | Race 4
═══════════════════════════════════════════════════════════

**DATA VALIDATION:** ✅ Passed | **Going:** Good (default — race card parse did not return going) | **Scratchings:** None in HKJC field of 12; SCMP lists reserves (R) not in this race.

**MC SIMULATION:** 10,000 iterations | `--form-data all` (HV + ST historical form) | `tools/analyze-race.ts`

**SCMP DATA:** ✅ Loaded (Win/Place, Star Form, TIR, Q/QP). Tipster columns ignored.

**ODDS SOURCE:** `data/odds/odds_20260415_HV.json` (R4 `fetchedAt` 2026-04-15T03:34:50.015Z). SCMP R4 table cross-checked.

**Jockey stats:** `data/jockeys/jockey_stats_20260414.json` (meeting date 2026-04-15).

---

**RACE:** R4 — **SUCCESSFUL CONVERSION HANDICAP** | Class 4 | 1800m Turf | “A” Course | Good | **12** runners

**CLASSIFICATION:** **Dominant** — **#11** lands **Adj Win% ≥ 35%** after jockey + SCMP (MC win **52.5%**; boosts push into dominant band; caps applied below).

**POOL SIZE:** **5** | **MODE:** **A — Tight pool** (5 horses; **C(5,3) = 10** full pool *or* **膽拖** below)

**BET STRUCTURE (recommended):** **膽拖** | 1 膽 (**#11**) + 4 腳 → **C(4,2) = 6** combinations | Unit **$10** → **Total stake HK$60**

---

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — all runners
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 11 | ROMANTIC FANTASY | 52.5% | 95.4% | 6.4 | ✅ | Yes | 9 | ★ 膽 (Banker) | 4-11: 41.2% (2.4) |
| 4 | HARMONY GALAXY | 25.0% | 87.2% | 6.1 | ✅ | Yes | 10 | 腳 | 3-11: 34.7% (2.9) |
| 3 | NOBLE PURSUIT | 21.1% | 84.0% | 4.0 | ✅ | Yes | 9 | 腳 | 3-4: 15.7% (6.4) |
| 7 | CAN'T GO WONG | 0.9% | 14.0% | 15.0 | ❌ | No | 9 | — | — |
| 5 | OCEAN IMPACT | 0.2% | 6.2% | 29.0 | ❌ | No | 8 | — | — |
| 6 | SHARPEN BRIGHT | 0.2% | 3.8% | 24.0 | ❌ | No | 10 | — | — |
| 2 | ROMANTIC LAOS | 0.1% | 4.4% | 19.0 | ❌ | No | 8 | — | — |
| 9 | SMART CITY | 0.0% | 1.7% | 11.0 | ❌ | No | 8 | — | — |
| 1 | ENTHRALLED | 0.0% | 2.1% | 5.3 | ❌ | Yes | 9 | — (B add) | — |
| 10 | KINGLY DEMEANOR | 0.0% | 0.4% | 7.2 | ❌ | Yes | 9 | — (B add) | — |
| 8 | FOREVER GLORIOUS | 0.0% | 0.6% | 48.0 | ❌ | No | 7 | — | — |
| 12 | SPLENDID FORCE | 0.0% | 0.1% | 41.0 | ❌ | No | 6 | — | — |

**Market (brief):** MC stacks the race into **#11 / #4 / #3**; quinella fair odds on **4–11** and **3–11** are **~2.4–2.9**. Overround ~22.6%.

---

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — jockey boost + SCMP)
───────────────────────────────────────────────────────────

**Jockey boost:** `win% ≤ 7 → 0`; else `min(7, 1 + (win% − 7) × 6 / 13)`; if MC **win-probability rank > 4**, cap at **+4%**.

**Note:** MC **4th** by win% is **#7 CAN'T GO WONG** (0.9%) — **C Y Ho** still receives the **full** boost (rank ≤ 4). **Z Purton** on **#1** is **rank 9** → boost **capped at +4%**.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 11 | ROMANTIC FANTASY | 52.5% | 95.4% | jockey +2.8, form +1 | same | **50.0%*** | **85.0%*** | 6.4 | A Atzeni | 4× seconds / C4→C4 (Star) | ★ 膽 |
| 3 | NOBLE PURSUIT | 21.1% | 84.0% | jockey +7.0, excuses +2 | same | **30.1%** | **93.0%*** | 4.0 | J Moreira | TIR hampered / bumped | 腳 |
| 4 | HARMONY GALAXY | 25.0% | 87.2% | jockey 0, form +2 | same | **27.0%** | **89.2%** | 6.1 | B Avdulla | Valley 1800 2/2 (Star) | 腳 |
| 7 | CAN'T GO WONG | 0.9% | 14.0% | jockey +1.8, form +1 | same | **2.7%** | **16.8%** | 15.0 | C Y Ho | Gate 2; consistent (P Woo) | 腳 |
| 5 | OCEAN IMPACT | 0.2% | 6.2% | jockey 0 | same | 0.2% | 6.2% | 29.0 | L Hewitson | — | 腳 |
| 1 | ENTHRALLED | 0.0% | 2.1% | jockey +4.0†, form +1 | same | 5.0% | 7.1% | 5.3 | Z Purton | Class drop / C&D (P Woo) | — |
| 6 | SHARPEN BRIGHT | 0.2% | 3.8% | jockey +1.3, excuses +2 | same | 2.5% | 5.8% | 24.0 | P N Wong | TIR wide / bumped | — |
| 2 | ROMANTIC LAOS | 0.1% | 4.4% | jockey +3.2, trial +1 | same | 4.3% | 5.4% | 19.0 | H Bowman | Trial (trackwork) | — |
| 10 | KINGLY DEMEANOR | 0.0% | 0.4% | jockey 0, form +1 | same | 1.0% | 1.4% | 7.2 | M L Yeung | Led / second (Star) | — |
| 9 | SMART CITY | 0.0% | 1.7% | jockey 0 | same | 0.0% | 1.7% | 11.0 | K Teetan | — | — |
| 8 | FOREVER GLORIOUS | 0.0% | 0.6% | 0 | same | 0.0% | 0.6% | 48.0 | Y L Chung | — | — |
| 12 | SPLENDID FORCE | 0.0% | 0.1% | jockey 0 | same | 0.0% | 0.1% | 41.0 | M Chadwick | — | — |

\*Adj Win/Place capped at **50% / 85%** where shown (skill cap).  
†Purton on **#1** is **outside MC top 4** → jockey boost **capped at +4%** (raw formula would be higher).

**Banker:** **#11** has many starts — **not** a debutant.

**Reasoning:** Three-horse MC podium (**11–4–3**) absorbs almost all quinella probability. Mode A fills with **#7** (best remaining **Adj Place%** among real chances) and **#5** (next) over total longshots — **structural** fill for a 5-horse Trio frame. If you prefer **PASS** on the fifth slot, reduce to **{11,4,3,7}** only (smaller full pool / different 膽拖 maths).

---

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────

**POOL:** #**11**, #**4**, #**3**, #**7**, #**5**

**MODE:** A | **POOL SIZE:** 5

**膽拖 STRUCTURE**

- **膽 (Banker):** #**11** **ROMANTIC FANTASY** (1st **Adj Win%** after caps).
- **腳 (Legs):** #4, #3, #7, #5

**BET STRUCTURE:** 膽拖 | 1 膽 + 4 腳 | **Combinations: C(4,2) = 6**

| # | Trio (any order) |
|---|------------------|
| 1 | 11 — 4 — 3 |
| 2 | 11 — 4 — 7 |
| 3 | 11 — 4 — 5 |
| 4 | 11 — 3 — 7 |
| 5 | 11 — 3 — 5 |
| 6 | 11 — 7 — 5 |

**UNIT:** $10 per combination → **HK$60 total**

---

**Optional — full 5-horse Trio (no banker):** C(5,3) = **10** lines → **HK$100** (same six horses as 膽拖 do not cover all C(5,3); full pool is wider). **Recommendation:** stick to **膽拖** above for cost control given concentration on **#11–#4–#3**.

---

**TOP TRIO GROUPS (by Σ Adj Place%, heuristic — banker 11 fixed)**

| Rank | Horses | Notes |
|------|--------|--------|
| 1 | 11 — 4 — 3 | MC + market spine |
| 2 | 11 — 4 — 7 | Adds gate/traffic horse |
| 3 | 11 — 3 — 7 | Moreira + Ho |

---

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────

| Item | Value |
|------|--------|
| **Combinations** | **6** (膽拖) |
| **Unit** | **$10** |
| **Total stake** | **HK$60** |

**PASS CONDITIONS**

- If **#11** scratched → **void** (do not substitute banker).
- Fewer than **3** starters → refund.
- **Heavy** going → reassess **#11 / #4** (form lines include wet-track misses).

**CONFIDENCE:** **HIGH** on **#11–#4–#3** as the **core** Trio spine; **LOW** on **#5/#7** legs (MC place under **20%**) — they are **structural** fifth-slot fillers.

**CAVEATS:** Odds snapshot per JSON timestamp; confirm latest declarations.

---

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────

**Banker:** #**11** **ROMANTIC FANTASY** (MC Win **52.5%**, MC Place **95.4%**).

**Primary legs** (MC Place% **> 20%**, ex-banker): #**4** (87.2%), #**3** (84.0%) — **only these two** pass the 20% rule.

**Win-odds candidates** (MC Place ≤ 20% **and** Win odds **below 10**), processed by **win odds ascending**:

| Order | Horse | MC Place% | Win odds |
|-------|--------|-----------|----------|
| 1 | ENTHRALLED (#1) | 2.1% | 5.3 |
| 2 | KINGLY DEMEANOR (#10) | 0.4% | 7.2 |

**Replaceable primary?** Need a primary leg with MC Place **20–30%** **and** Win odds **> 10**. **Neither #3 nor #4** sits in 20–30% place (both **> 30%**). → **No 1-for-1 swap**.

**Action:** **Add #1**, then **#10** directly as extra legs (skill: add when no replaceable leg).

**Final legs:** #4, #3, #1, #10 → **4** legs.

**膽拖:** 1 膽 + 4 腳 → **C(4,2) = 6** → **HK$60**

| # | Trio |
|---|------|
| 1 | 11 — 4 — 3 |
| 2 | 11 — 4 — 1 |
| 3 | 11 — 4 — 10 |
| 4 | 11 — 3 — 1 |
| 5 | 11 — 3 — 10 |
| 6 | 11 — 1 — 10 |

**vs Strategy A:** A uses **#7** and **#5** (MC place / Adj story); B uses short-priced **#1** and **#10** under the **win-odds below 10** rule — **different** fifth-layer coverage, **same** ticket count and stake.

═══════════════════════════════════════════════════════════

*Trio (單T) = 1st, 2nd, 3rd in any order. Not financial advice.*
