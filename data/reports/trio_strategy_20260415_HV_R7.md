═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-04-15 | Race 7
═══════════════════════════════════════════════════════════

**DATA VALIDATION:** ✅ Passed | **Going:** Good (default) | **Scratchings:** None in HKJC field of **12**; SCMP lists reserves (R) not in this race.

**MC SIMULATION:** 10,000 iterations | `--form-data all` | `tools/analyze-race.ts`

**SCMP DATA:** ✅ Loaded (**ONE CITY TWO PASSIONS HANDICAP - Sec1**, Star Form, TIR, Vet). Tipster columns ignored.

**ODDS SOURCE:** `data/odds/odds_20260415_HV.json` (R7 `fetchedAt` 2026-04-15T03:34:54.027Z).

**Jockey stats:** `data/jockeys/jockey_stats_20260414.json`

---

**RACE:** R7 — Class 4 | **1200m** Turf | Good | **12** runners

**CLASSIFICATION:** **Dominant** — **#6 THE HEIR** **Adj Win% ≥ 35%** after Moreira + SCMP (MC **35.5%** + **+7%** jockey).

**POOL SIZE:** **6** | **MODE:** **B — Standard pool** (top 3 Adj Win + 3 by Adj Place among the rest — aligns with **must-include** Place ≥ 25%).

**BET STRUCTURE:** **膽拖** | 1 膽 (**#6**) + **5** 腳 → **C(5,2) = 10** | Unit **$10** → **HK$100**

**Optional 雙膽拖:** **#3** **Adj Place% ≥ 63%** after boosts → **2 膽 (#6 + #3)** + **4** 腳 (#4, #7, #5, #1) → **4** lines / **HK$40** (or drop one leg to trim cost — see below).

---

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — all 12 runners
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 6 | THE HEIR | 35.5% | 72.0% | 3.1 | ✅ | Yes | 10 | ★ Banker | 3-6: 21.1% (4.7) |
| 3 | MASTER LUCKY | 26.0% | 63.4% | 7.1 | ✅ | Yes | 4 | Leg | 4-6: 9.5% (10.5) |
| 4 | GENIUS BABY | 10.0% | 38.4% | 10.0 | ✅ | No | 9 | Leg | 6-7: 9.2% (10.9) |
| 7 | FATAL BLOW | 9.8% | 36.6% | 9.7 | ✅ | Yes | 6 | Leg | 3-4: 6.4% (15.7) |
| 5 | RAINBOW SEVEN | 6.8% | 28.3% | 4.3 | ✅ | Yes | 7 | Leg | 5-6: 6.3% (15.8) |
| 1 | ARGENTO OCEAN | 4.9% | 23.5% | 13.0 | ✅ | No | 6 | Leg | — |
| 2 | AMAZING VICTORY | 3.5% | 15.7% | 53.0 | ❌ | No | 1 | — | — |
| 8 | SUPERB BOY | 2.5% | 13.3% | 24.0 | ❌ | No | 9 | — | — |
| 9 | TRENDY RUSH | 1.0% | 7.0% | 37.0 | ❌ | No | 1 | — | — |
| 11 | WORLD HERO | 0.1% | 1.2% | 12.0 | ❌ | No | 8 | — | — |
| 12 | CALIFORNIA DEEPLY | 0.1% | 0.5% | 15.0 | ❌ | No | 9 | — | — |
| 10 | GREAT LOOKING | 0.0% | 0.0% | 76.0 | ❌ | No | 1 | — | — |

**Market (brief):** **#6** favourite vs MC; **#3** strong place edge in analyser. Overround ~23.9%.

---

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — jockey boost + SCMP)
───────────────────────────────────────────────────────────

**Jockey boost:** `win% ≤ 7 → 0`; else `min(7, 1 + (win% − 7) × 6 / 13)`; if MC **win rank > 4**, cap at **+4%**.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 6 | THE HEIR | 35.5% | 72.0% | jockey +7.0, excuses +1 | same | **43.5%** | **80.0%** | 3.1 | J Moreira | TIR bump / blunder (minor) | ★ 膽 |
| 3 | MASTER LUCKY | 26.0% | 63.4% | jockey +2.8, excuses +2 | same | **30.8%** | **68.2%** | 7.1 | A Atzeni | Awkward / crowded (TIR) | 腳 / 2nd膽* |
| 5 | RAINBOW SEVEN | 6.8% | 28.3% | jockey +4.0†, form +1 | same | **11.8%** | **33.3%** | 4.3 | Z Purton | Class C4 form (Star) | 腳 |
| 7 | FATAL BLOW | 9.8% | 36.6% | jockey 0, trial +2 | same | **11.8%** | **38.6%** | 9.7 | C L Chau | Trial strong (trackwork) | 腳 |
| 4 | GENIUS BABY | 10.0% | 38.4% | jockey 0, form +1 | same | **11.0%** | **39.4%** | 10.0 | K Teetan | Third / frame (Star) | 腳 |
| 1 | ARGENTO OCEAN | 4.9% | 23.5% | jockey 0, excuses +2 | same | **6.9%** | **25.5%** | 13.0 | B Avdulla | Wide no cover (TIR) | 腳 |
| 2 | AMAZING VICTORY | 3.5% | 15.7% | jockey +1.4 | same | 4.9% | 17.1% | 53.0 | J Orman | — | — |
| 8 | SUPERB BOY | 2.5% | 13.3% | jockey +1.3 | same | 3.8% | 14.6% | 24.0 | P N Wong | — | — |
| 9 | TRENDY RUSH | 1.0% | 7.0% | jockey +3.2‡ | same | 4.2% | 10.2% | 37.0 | H Bowman | Debut (Star) | — |
| 11 | WORLD HERO | 0.1% | 1.2% | jockey +1.4 | same | 1.5% | 2.6% | 12.0 | H Bentley | — | — |
| 12 | CALIFORNIA DEEPLY | 0.1% | 0.5% | jockey 0 | same | 0.1% | 0.5% | 15.0 | M Chadwick | — | — |
| 10 | GREAT LOOKING | 0.0% | 0.0% | jockey +1.6, −perf −2 | vet / throat | 0.0% | 0.0% | 76.0 | E C W Wong | Unacceptable / vet history | — |

†Purton on **#5** is MC **win rank 5** → boost **capped at +4%**.  
‡Bowman **#9** outside top 4 → cap **4%** (shown **+3.2%**).

\***#3** **Adj Place ~68%** (**≥ 63%**) → **雙膽拖 eligible** (see optional tickets).

**Must-include Adj Place ≥ 25%:** **#6, #3, #4, #7, #5, #1** ( **#1** lifted to **~25.5%** via TIR wide).

**Banker:** **#6** has **10** prior runs — OK.

---

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────

**POOL:** #**6**, #**3**, #**4**, #**7**, #**5**, #**1**

**MODE:** B | **POOL SIZE:** 6

### Default — 膽拖 (1 膽)

- **膽:** #**6** **THE HEIR**
- **腳:** #**3**, #**4**, #**7**, #**5**, #**1**
- **C(5,2) = 10** | **HK$100**

**The 10 lines:**  
6-3-4, 6-3-7, 6-3-5, 6-3-1, 6-4-7, 6-4-5, 6-4-1, 6-7-5, 6-7-1, 6-5-1

### Optional — 雙膽拖 (two bankers)

- **膽:** #**6** + #**3** (**#3** Adj Place **≥ 63%**)
- **腳:** #**4**, #**7**, #**5**, #**1** → **4** combinations | **HK$40**

**Lines:** 6-3-4, 6-3-7, 6-3-5, 6-3-1

**Trim:** legs **#4, #7, #5** only (drop **#1**) → **3** lines | **HK$30** — **#1** not covered.

---

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────

| Option | Combinations | Stake |
|--------|--------------|--------|
| 1 膽 + 5 腳 | 10 | **HK$100** |
| 2 膽 + 4 腳 (optional) | 4 | **HK$40** |
| 2 膽 + 3 腳 (trim, optional) | 3 | **HK$30** |

**PASS CONDITIONS:** If **#6** scratched → void. Fewer than **3** starters → refund.

**CONFIDENCE:** **MEDIUM–HIGH** on **#6–#3** spine; **#1** is borderline on raw MC but **mandatory** on Adj Place rule.

**CAVEATS:** **#10 GREAT LOOKING** — heavy negative SCMP/vet history; **excluded** from pool. Confirm odds at jump.

---

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────

**Banker:** #**6** (MC Win **35.5%**, MC Place **72.0%**).

**Primary legs** (MC Place% **> 20%**, ex-banker): #**3**, #**4**, #**7**, #**5**, #**1** (23.5% is **> 20%**).

**Win-odds candidates** (MC Place ≤ 20% **and** Win odds **below 10**): **none** with both conditions (**#2** 53, **#8** 24, **#9** 37, **#11** 12, etc.).

**Replaceable** primary (Place 20–30% **and** Win **> 10**): **none** that fit both (e.g. **#1** has Place **23.5%** but Win **13** — not **> 10** in the “weak market” sense for swap; **#5** Place **28.3%**, Win **4.3** — Win not **> 10**).

**Final legs (Strategy B):** same **5** primaries as above — **#3, #4, #7, #5, #1**

**膽拖:** C(5,2) = **10** → **HK$100** — **same lines as Strategy A (1-banker).**

**vs A:** No short-priced add-ons; **A** adds SCMP/vet nuance (e.g. **#10** excluded).

═══════════════════════════════════════════════════════════

*Trio (單T) = 1st, 2nd, 3rd in any order. Not financial advice.*
