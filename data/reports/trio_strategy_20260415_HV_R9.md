═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-04-15 | Race 9
═══════════════════════════════════════════════════════════

**DATA VALIDATION:** ✅ Passed | **Going:** Good (default; race card parse missed going) | **Scratchings:** None in HKJC field of **12** (two reserves on SCMP card — not in MC field).

**MC SIMULATION:** 10,000 iterations | `--form-data all` | `tools/analyze-race.ts`

**SCMP DATA:** ✅ Loaded (**GOLDEN POINT HANDICAP**, Star Form, TIR, Vet, Trackwork — **#5** trachea blood history / passed; **#8** lame history / passed). Tipster columns ignored.

**ODDS SOURCE:** `data/odds/odds_20260415_HV.json` (R9 `fetchedAt` **2026-04-15T03:34:56.799Z**).

**Jockey stats:** `data/jockeys/jockey_stats_20260414.json`

---

**RACE:** R9 — Class 3 | **1200m** Turf | Good | **12** runners

**CLASSIFICATION:** **Dominant** — **#12** raw MC win **37.4%**; after **jockey +7%** (Moreira) and light SCMP (richer-class nudge) **Adj Win%** stays **≥ 35%**.

**POOL SIZE:** **5** | **MODE:** **A — Tight pool**

**BET STRUCTURE:** **膽拖** | 1 膽 (**#12**) + **4** 腳 → **C(4,2) = 6** | Unit **$10** → **HK$60**

---

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — all 12 runners
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|---------------------|
| 12 | SOMELOVEFROMABOVE | 37.4% | 73.6% | 2.7 | ✅ | Yes | 7 | 1-12: 20.1% (5.0) |
| 1 | SYMBOL OF STRENGTH | 22.8% | 59.9% | 9.7 | ✅ | Yes | 8 | 5-12: 12.8% (7.8) |
| 5 | BIENVENUE | 13.7% | 45.2% | 11.0 | ✅ | No | 6 | 2-12: 10.4% (9.7) |
| 2 | LUCKY PLANET | 10.8% | 40.6% | 16.0 | ✅ | No | 11 | 1-5: 7.7% (13.0) |
| 3 | SPORTS LEGEND | 5.7% | 26.4% | 12.0 | ✅ | No | 7 | 1-2: 5.9% (16.8) |
| 9 | STRAIGHT TO GLORY | 4.4% | 21.8% | 6.9 | ✅ | Yes | 8 | — |
| 7 | DO YOU JUST | 2.0% | 11.2% | 9.7 | ❌ | Yes | 4 | — |
| 4 | AMAZING KID | 1.6% | 10.3% | 8.7 | ❌ | Yes | 10 | — |
| 6 | MATTERS MOST | 1.6% | 9.9% | 17.0 | ❌ | No | 8 | — |
| 10 | PRESTIGE WIN | 0.1% | 0.5% | 40.0 | ❌ | No | 2 | — |
| 11 | LUCKY DOCTOR | 0.1% | 0.5% | 56.0 | ❌ | No | 3 | — |
| 8 | FIERY STEED | 0.0% | 0.0% | 22.0 | ❌ | No | 1 | — |

**Market (brief):** **#12** firm favourite (**~2.7**); MC agrees. **#1** undervalued vs odds on edge scan. Overround **~23.0%**. **#8** MC **0%** vs double-figure odds — model treats as no show on current inputs; **SCMP** notes past lameness (passed).

---

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — jockey boost + SCMP)
───────────────────────────────────────────────────────────

**Jockey boost:** `win% ≤ 7 → 0`; else `min(7, 1 + (win% − 7) × 6 / 13)`; MC **win rank > 4** → cap **+4%**.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 12 | SOMELOVEFROMABOVE | 37.4% | 73.6% | jockey +7.0, richer grade −1 | same | **43.4%** | **79.6%** | 2.7 | J Moreira | Class rise / TIR bump (minor) | ★ 膽 |
| 1 | SYMBOL OF STRENGTH | 22.8% | 59.9% | jockey +1.8, excuses +2 | same | **26.6%** | **63.7%** | 9.7 | L Ferraris | Bumped / restricted room (TIR) | 腳 |
| 5 | BIENVENUE | 13.7% | 45.2% | jockey +6.8, respiratory vet −2 | same | **18.5%** | **50.0%** | 11.0 | Z Purton | Trachea blood (hist.) / passed; reluctant (TIR) | 腳 |
| 2 | LUCKY PLANET | 10.8% | 40.6% | jockey 0, −response −2 | same | **8.8%** | **38.6%** | 16.0 | M F Poon | No response HV (TIR) | 腳 |
| 3 | SPORTS LEGEND | 5.7% | 26.4% | jockey +3.2, stew −2, trial +2 | same | **8.9%** | **30.0%** | 12.0 | H Bowman | Disappointing last / Conghua trial (trackwork) | 腳 |
| 9 | STRAIGHT TO GLORY | 4.4% | 21.8% | jockey +1.4, form +2 | same | **7.8%** | **25.2%** | 6.9 | H Bentley | Second Aurio / HV 1200 suit (Star) | — |
| 7 | DO YOU JUST | 2.0% | 11.2% | jockey 0, first HV 1200 0 | same | 2.0% | 11.2% | 9.7 | Y L Chung | Mile→1200 switch | — |
| 4 | AMAZING KID | 1.6% | 10.3% | jockey +2.8, wide +2 | same | 6.4% | 14.3% | 8.7 | A Atzeni | Wide C&D (TIR); gate 12 | — |
| 6 | MATTERS MOST | 1.6% | 9.9% | jockey +1.5† | same | 3.1% | 11.4% | 17.0 | E C W Wong | Crowded (TIR) | — |
| 10 | PRESTIGE WIN | 0.1% | 0.5% | jockey 0 | same | 0.1% | 0.5% | 40.0 | L Hewitson | Restricted / unbalanced (TIR) | — |
| 11 | LUCKY DOCTOR | 0.1% | 0.5% | jockey +1.8† | same | 1.9% | 2.3% | 56.0 | C Y Ho | Poor form (Star) | — |
| 8 | FIERY STEED | 0.0% | 0.0% | jockey 0, lame hist. −2 | same | 0.0% | 0.0% | 22.0 | R Kingscote | Lame post-race (hist.) / passed | — |

†**#6** / **#11** jockey boost **capped at +4%** (MC outside top 4); applied **+1.5%** / **+1.8%** before cap.

**Must-include Adj Place ≥ 25%:** **#12, #1, #5, #2, #3, #9** — **Mode A** takes the **top four Adj Place%** after **#12** (**#1, #5, #2, #3**). **#9** ends fifth among legs (~**25.2%**) → **not** in the 5-horse tight pool; acceptable under Mode A (pool = banker + **four** highest-Place legs among remaining). **#9** is the main **coverage vs Strategy B** if you want an extra horse (see caveats).

**Banker:** **#12** — multiple wins this term; **not** a debutant.

**雙膽拖:** **#12** **Adj Place ≥ 63%** → eligible as first banker; **#1** ~**63.7%** → **also ≥ 63%** → **雙膽拖** optional: **2 膽** (**#12**, **#1**) + **3** 腳 (**#5, #2, #3**) → **3** lines × **$10** = **HK$30** (narrower, both must place).

---

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────

**POOL:** #**12**, #**1**, #**5**, #**2**, #**3**

**MODE:** A | **POOL SIZE:** 5

**膽拖 (default)**

- **膽:** #**12** **SOMELOVEFROMABOVE**
- **腳:** #**1**, #**5**, #**2**, #**3**

**C(4,2) = 6** | **HK$60**

**The 6 lines:**  
12-1-5, 12-1-2, 12-1-3, 12-5-2, 12-5-3, 12-2-3

**Optional 雙膽拖 (both #12 & #1 ≥ 63% Adj Place):** 12+1 膽, 腳 **#5, #2, #3** → **3** lines (**12-1-5**, **12-1-2**, **12-1-3**) | **HK$30**

---

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────

| Item | Value |
|------|--------|
| Combinations | 6 (膽拖) |
| Unit | $10 |
| **Total stake** | **HK$60** |

**PASS CONDITIONS:** If **#12** scratched → void. Field **< 3** → refund.

**CONFIDENCE:** **HIGH** on structure — dominant MC/market favourite; **MEDIUM** on dividend size (short-priced favourite Trio).

**CAVEATS:** **#5** respiratory history (passed vet). **#3** stewards’ “disappointing” last run offset by strong **Conghua** trial in SCMP. **#9** is live for the frame (**MC Place 21.8%**, short win odds) but sits outside the **Mode A** four legs — add manually if you want **#9** coverage (+cost). **#8** MC **0%** — do not read as “racing certainty”; treat as model edge case.

---

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────

**Banker:** #**12** **SOMELOVEFROMABOVE** (MC Win **37.4%**, MC Place **73.6%**).

**Primary legs** (MC Place% **> 20%**, ex-banker): #**1**, #**5**, #**2**, #**3**, #**9**.

**Replaceable** (MC Place **20–30%** **and** Win **> 10**): **#3** (Place **26.4%**, Win **12**).

**Win-odds candidates** (MC Place **≤ 20%** **and** Win **< 10**), processed by **ascending** Win odds:  
**#4 AMAZING KID** (Win **8.7**, Place **10.3%**) → **replaces #3** (lowest Place among replaceable).  
**#7 DO YOU JUST** (Win **9.7**, Place **11.2%**) → no remaining replaceable primary → **add**.

**Final legs:** #**1**, #**5**, #**2**, #**9**, #**4**, #**7** → **6** legs.

**膽拖:** C(6,2) = **15** → **HK$150**

**Lean Strategy B** (align with A’s five-horse set): legs **#1, #5, #2, #3** only → **6** lines / **HK$60** — matches Strategy A pool (drops **#4/#7** swap logic).

**vs A:** Strategy B adds **#4** (for **#3**) and **#7** via win-odds rules; Strategy A uses SCMP/trial to keep **#3** and drops short-priced **#7** from the five.

═══════════════════════════════════════════════════════════

*Trio (單T) = 1st, 2nd, 3rd in any order. Not financial advice.*
