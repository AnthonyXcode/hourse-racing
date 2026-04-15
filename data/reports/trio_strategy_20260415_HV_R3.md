═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-04-15 | Race 3
═══════════════════════════════════════════════════════════

**DATA VALIDATION:** ✅ Passed | **Going:** Good (default — race card parse did not return going) | **Scratchings:** None in HKJC field of 12; SCMP lists reserves (R) not in this race.

**MC SIMULATION:** 10,000 iterations | `--form-data all` (HV + ST historical form) | `tools/analyze-race.ts`

**SCMP DATA:** ✅ Loaded (Win/Place, Star Form, TIR, trackwork, Q/QP matrices). Tipster columns ignored.

**ODDS SOURCE:** HKJC pool via `fetch-odds.ts` → `data/odds/odds_20260415_HV.json` (R3 `fetchedAt` 2026-04-15T03:34:48.778Z). SCMP table odds cross-checked for R3.

**Jockey stats:** `data/jockeys/jockey_stats_20260414.json` (fetch run for meeting date 2026-04-15).

---

**RACE:** R3 — **WINNING TRY HANDICAP** | Class 4 | 1650m Turf | “A” Course | Good | **12** runners

**CLASSIFICATION:** **Competitive** — top horse **Adj Win%** after jockey + SCMP is **#2** at **~29%** (MC top win 27.3%, band 20–35%).

**POOL SIZE:** **6** | **MODE:** **B — Standard pool** (top 3 by Adj Win% + 3 others by Adj Place%)

**BET STRUCTURE:** **膽拖** | 1 膽 (**#2**) + 5 腳 → **C(5,2) = 10** combinations | Unit **$10** → **Total stake HK$100**

---

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — all runners
───────────────────────────────────────────────────────────

*Strategy B flags: **Place%>20%** = MC Place% > 20%; **Win odds<10** = HKJC win odds < 10.*

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 2 | WIN EASE | 27.3% | 61.1% | 31.0 | ✅ | ❌ | 6 | ★ 膽 (Banker) | 2-10: 15.5% (6.4) |
| 10 | RUN RUN TIMING | 25.2% | 61.8% | 6.9 | ✅ | ✅ | 7 | 腳 (Leg) | 2-5: 12.6% (7.9) |
| 5 | THE AZURE | 21.3% | 56.0% | 19.0 | ✅ | ❌ | 7 | 腳 | 5-10: 12.5% (8.0) |
| 1 | FANTASTIC FUN | 10.2% | 37.6% | 4.1 | ✅ | ✅ | 10 | 腳 | 1-10: 6.4% (15.5) |
| 7 | RED BRICK WARRIOR | 6.4% | 27.5% | 5.7 | ✅ | ✅ | 5 | 腳 | 1-2: 6.1% (16.5) |
| 4 | TAKE ACTION | 3.2% | 16.4% | 4.6 | ❌ | ✅ | 11 | — (B add-on) | — |
| 3 | STATE SECURITY | 2.3% | 12.5% | 52.0 | ❌ | ❌ | 1 | — | — |
| 6 | TO INFINITY | 1.7% | 10.6% | 18.0 | ❌ | ❌ | 8 | — | — |
| 8 | LAKESHORE HERO | 0.9% | 6.0% | 35.0 | ❌ | ❌ | 6 | — | — |
| 9 | KOLACHI | 0.8% | 5.1% | 15.0 | ❌ | ❌ | 8 | — | — |
| 11 | VIVA FIRECRACKER | 0.7% | 5.0% | 12.0 | ❌ | ❌ | 7 | — | — |
| 12 | FRANTANCK | 0.0% | 0.3% | 9.7 | ❌ | ✅ | 7 | — | — |

**Market (brief):** Model is extremely strong on **#2** vs win quote (~31); favourite **#1** is respected by MC but not the win favourite in simulation. Overround ~22.7%.

---

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — jockey boost + SCMP)
───────────────────────────────────────────────────────────

**Jockey boost:** `win% ≤ 7 → 0`; else `min(7, 1 + (win% − 7) × 6 / 13)`; if MC **win-probability rank > 4**, cap boost at **+4%**.

**SCMP:** factors from Star Form, TIR, trackwork; caps ±8% Win / ±10% Place per horse (skill).

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 2 | WIN EASE | 27.3% | 61.1% | jockey 0, excuses +2 | same | **29.3%** | **63.1%** | 31.0 | M L Yeung | TIR wide / no cover | ★ 膽 |
| 10 | RUN RUN TIMING | 25.2% | 61.8% | jockey 0, form +1 | same | **26.2%** | **62.8%** | 6.9 | R Kingscote | Valley 1650 / C4 win (Star) | 腳 |
| 5 | THE AZURE | 21.3% | 56.0% | jockey 0, excuses +2 | same | **23.3%** | **58.0%** | 19.0 | C L Chau | TIR bumped / rail | 腳 |
| 1 | FANTASTIC FUN | 10.2% | 37.6% | jockey +3.2, draw +1, form +1 | jockey +3.2, draw +1, form +1 | **15.4%** | **42.8%** | 4.1 | H Bowman | Box-seat / C4 two wins (Star) | 腳 |
| 7 | RED BRICK WARRIOR | 6.4% | 27.5% | jockey +2.8, draw +1, form +1 | same | **11.2%** | **32.3%** | 5.7 | A Atzeni | Gate 1, 1650 fourth (Star/P Woo) | 腳 |
| 4 | TAKE ACTION | 3.2% | 16.4% | jockey 0, excuses +2, form +1 | same | **6.2%** | **19.4%** | 4.6 | B Avdulla | TIR bumped; seconds mile (Star) | 腳 |
| 6 | TO INFINITY | 1.7% | 10.6% | jockey +1.4 | same | 3.1% | 12.0% | 18.0 | J Orman | — | — |
| 3 | STATE SECURITY | 2.3% | 12.5% | jockey 0 | same | 2.3% | 12.5% | 52.0 | L Hewitson | Second run / trip query (Star) | — |
| 9 | KOLACHI | 0.8% | 5.1% | jockey +1.4, excuses +1 | same | 2.2% | 6.1% | 15.0 | H Bentley | TIR tight / jump | — |
| 8 | LAKESHORE HERO | 0.9% | 6.0% | 0 | same | 0.9% | 6.0% | 35.0 | M F Poon | — | — |
| 11 | VIVA FIRECRACKER | 0.7% | 5.0% | jockey 0 | same | 0.7% | 5.0% | 12.0 | K Teetan | TIR jumped fairly | — |
| 12 | FRANTANCK | 0.0% | 0.3% | jockey +1.3, trial +2 | same | 3.3% | 2.3% | 9.7 | P N Wong | Trackwork + (SCMP) | — |

**Banker rule:** **#2** has **≥2** race starts (not a debutant). **#3** has only **one** prior run — would **not** be banker if ever ranked first.

**Reasoning:** MC separates a clear **top three** (**#2 / #10 / #5**) on win + place. **#1** and **#7** are next on **Adj Place%** and map to draw / position (gates **3** and **1**). **#4** is the sixth slot: below **25%** raw Adj Place but **must** be in the Mode B construction as the next place contributor and fits **Strategy B** leg-add; short win odds align with Size / Avdulla profile.

---

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────

**POOL:** #**2**, #**10**, #**5**, #**1**, #**7**, #**4**

**MODE:** B | **POOL SIZE:** 6

**膽拖 STRUCTURE**

- **膽 (Banker):** #**2** **WIN EASE** (Adj Win% **29.3%**) — in every combination.
- **腳 (Legs):** #10, #5, #1, #7, #4

**BET STRUCTURE:** 膽拖 | 1 膽 + 5 腳 | **Combinations: C(5,2) = 10**

**The 10 Trio (any order) lines**

| # | Trio (includes #2) |
|---|---------------------|
| 1 | 2 — 10 — 5 |
| 2 | 2 — 10 — 1 |
| 3 | 2 — 10 — 7 |
| 4 | 2 — 10 — 4 |
| 5 | 2 — 5 — 1 |
| 6 | 2 — 5 — 7 |
| 7 | 2 — 5 — 4 |
| 8 | 2 — 1 — 7 |
| 9 | 2 — 1 — 4 |
| 10 | 2 — 7 — 4 |

---

**TOP TRIO COMBINATIONS (by Σ Adj Place%, heuristic)**

| Rank | Horses (any order) | Σ Adj Place% (approx.) |
|------|--------------------|-------------------------|
| 1 | 2 — 10 — 5 | 184.0 |
| 2 | 2 — 10 — 1 | 168.7 |
| 3 | 2 — 5 — 1 | 164.0 |
| 4 | 2 — 10 — 7 | 158.2 |
| 5 | 2 — 5 — 7 | 153.4 |

---

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────

| Item | Value |
|------|--------|
| **Combinations** | **10** (膽拖) |
| **Unit bet** | **$10** |
| **Total stake** | **HK$100** |

**PASS CONDITIONS**

- If **#2 (WIN EASE)** is scratched → **void** ticket (do not substitute banker).
- If fewer than **3** starters → pool refunded.
- If going shifts to **Heavy** → reassess **#2** (wide-trip profile) and on-pace balance.

**CONFIDENCE:** **MEDIUM** — structure is clear in MC, but **#2** is a **long win price** vs model (market vs model gap); Trio dividend may be **volatile**.

**CAVEATS**

- Going inferred **Good**; confirm at declaration.
- **#3 STATE SECURITY** only **one** prior run — excluded from pool by numbers, not for “narrative”.
- Odds snapshot time as per JSON `fetchedAt`; refresh before betting.

---

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — include in every report
───────────────────────────────────────────────────────────

**Banker:** #**2** **WIN EASE** (MC Win **27.3%**, MC Place **61.1%**) — 1st by MC Win%.

**Primary legs (MC Place% > 20%, ex-banker):** #**10** (61.8%), #**5** (56.0%), #**1** (37.6%), #**7** (27.5%).

**Replaceable legs** (MC Place 20–30% **and** Win odds > 10): **none** among primaries (#**7** is in 20–30% place but Win **5.7** is **not** > 10).

**Win-odds candidates** (MC Place ≤ 20% **and** Win odds below 10): #**4** TAKE ACTION — MC Place **16.4%**, Win **4.6**.

**Action:** No eligible **replaceable** primary leg → **add #4 directly** as an extra leg (skill Step B).

**Final legs:** #10, #5, #1, #7, #4 (same five as Strategy A).

**BET STRUCTURE:** 膽拖 | 1 膽 + 5 腳 | **C(5,2) = 10** | **HK$100**

**STRATEGY B TICKET:** Same **10** lines as Strategy A table above.

**vs Strategy A:** On this race, **A** and **B** coincide on **horse set and cost**; A ranks legs using **Adj** probabilities and SCMP; B uses **raw MC +** odds rule only.

═══════════════════════════════════════════════════════════

*Trio (單T) = 1st, 2nd, 3rd in any order. Not financial advice.*
