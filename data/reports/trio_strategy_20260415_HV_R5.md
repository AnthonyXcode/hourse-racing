═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-04-15 | Race 5
═══════════════════════════════════════════════════════════

**DATA VALIDATION:** ✅ Passed | **Going:** Good (default — race card parse did not return going) | **Scratchings:** None in HKJC field of **11**.

**MC SIMULATION:** 10,000 iterations | `--form-data all` | `tools/analyze-race.ts`

**SCMP DATA:** ✅ Loaded (race title: **THE HONG KONG CHINA RUGBY CUP (HANDICAP) - Sec1**, Star Form, TIR, Vet, Q/QP). Tipster columns ignored.

**ODDS SOURCE:** `data/odds/odds_20260415_HV.json` (R5 `fetchedAt` 2026-04-15T03:34:51.388Z).

**Jockey stats:** `data/jockeys/jockey_stats_20260414.json`

---

**RACE:** R5 — Class 3 | 1650m Turf | “A” Course | Good | **11** runners

**CLASSIFICATION:** **Dominant** — **#1** **Adj Win% ≥ 35%** after jockey + SCMP (MC win **33.7%** + Purton boost).

**POOL SIZE:** **5** | **MODE:** **A — Tight pool**

**BET STRUCTURE (choose one):**

| Option | Structure | Combos | Stake ($10/unit) |
|--------|-----------|--------|-------------------|
| **A1 — 雙膽拖** | 2 膽 (**#1**, **#3**) + 3 腳 (#7, #10, #4) | **3** | **HK$30** |
| **A2 — 膽拖 (1膽)** | 1 膽 (**#1**) + 4 腳 (#3, #7, #10, #4) | **6** | **HK$60** |

**Reason:** **#3** reaches **Adj Place% ≥ 63%** after Moreira + SCMP → **雙膽拖** is valid (skill) and cuts cost vs single-banker 膽拖.

---

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — all 11 runners
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|-------------------|---------------------|
| 1 | BEAUTY ALLIANCE | 33.7% | 74.4% | 7.5 | ✅ | Yes | 5 | ★ Banker (MC Win #1) | 1-3: 23.0% (4.3) |
| 3 | WROTE A NEW PAGE | 28.3% | 69.0% | 4.3 | ✅ | Yes | 7 | Leg | 1-7: 16.9% (5.9) |
| 7 | CALIFORNIA MOXIE | 20.4% | 60.3% | 11.0 | ✅ | No | 8 | Leg | 3-7: 13.8% (7.2) |
| 10 | WIN METHOD | 7.7% | 34.1% | 6.0 | ✅ | Yes | 10 | Leg | 1-10: 7.1% (14.0) |
| 4 | DO YOUR PART | 4.3% | 24.7% | 4.2 | ✅ | Yes | 8 | Leg | — |
| 5 | KING LOTUS | 2.4% | 15.8% | 13.0 | ❌ | No | 8 | — | — |
| 11 | SUPREME MASTERMIND | 2.2% | 13.4% | 18.0 | ❌ | No | 11 | — | — |
| 2 | LE ZONDA | 0.8% | 5.8% | 9.2 | ❌ | Yes | 3 | — (B add) | — |
| 6 | FORTUNATE SON | 0.2% | 1.6% | 31.0 | ❌ | No | 9 | — | — |
| 8 | SUPERB KID | 0.0% | 0.7% | 44.0 | ❌ | No | 10 | — | — |
| 9 | GRATIFIDE | 0.0% | 0.0% | 15.0 | ❌ | No | 3 | — | — |

**Market (brief):** MC likes **#1** and **#7** vs win pool; **#3** short with Moreira. Overround ~23.1%.

---

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — jockey boost + SCMP)
───────────────────────────────────────────────────────────

**Jockey boost:** `win% ≤ 7 → 0`; else `min(7, 1 + (win% − 7) × 6 / 13)`; if MC **win rank > 4**, cap at **+4%**.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 1 | BEAUTY ALLIANCE | 33.7% | 74.4% | jockey +6.8, form +1 | same | **41.5%** | **82.2%** | 7.5 | Z Purton | C2/C3 Valley form (P Woo) | ★ 膽 1 |
| 3 | WROTE A NEW PAGE | 28.3% | 69.0% | jockey +7.0, excuses +2 | same | **37.3%** | **78.0%** | 4.3 | J Moreira | TIR bumped; 3/3 HV 1650 (Star) | ★ 膽 2 / 腳 |
| 7 | CALIFORNIA MOXIE | 20.4% | 60.3% | jockey +2.8, excuses +1 | same | **24.2%** | **63.1%** | 11.0 | A Atzeni | TIR bump; keen run (TIR) | 腳 |
| 10 | WIN METHOD | 7.7% | 34.1% | jockey 0, form +1 | same | **8.7%** | **35.1%** | 6.0 | L Hewitson | Back-to-back HV 1650 (Star) | 腳 |
| 4 | DO YOUR PART | 4.3% | 24.7% | jockey +1.8, form +1 | same | **7.1%** | **27.5%** | 4.2 | L Ferraris | Box-seat 2nd / thirds (P Woo) | 腳 |
| 5 | KING LOTUS | 2.4% | 15.8% | jockey +1.4 | same | 3.8% | 17.2% | 13.0 | J Orman | — | — |
| 11 | SUPREME MASTERMIND | 2.2% | 13.4% | jockey +1.4, vet −3, place −4 | vet −3, place −4 | 0.0% | 9.4% | 18.0 | H Bentley | Lame after run; passed 09/04 (Vet) | — |
| 2 | LE ZONDA | 0.8% | 5.8% | jockey 0, trial +1 | same | 1.8% | 6.8% | 9.2 | C L Chau | Trial (trackwork) | — |
| 6 | FORTUNATE SON | 0.2% | 1.6% | jockey 0, excuses +1 | same | 1.2% | 2.6% | 31.0 | K Teetan | Wide (TIR) | — |
| 8 | SUPERB KID | 0.0% | 0.7% | 0 | same | 0.0% | 0.7% | 44.0 | M L Yeung | — | — |
| 9 | GRATIFIDE | 0.0% | 0.0% | 0 | same | 0.0% | 0.0% | 15.0 | M Chadwick | — | — |

**Must-include Adj Place ≥ 25%:** **#1, #3, #7, #10, #4** (after boosts, **#4** clears **25%**).

**Banker eligibility:** **#1** and **#3** each have **≥2** starts — OK for 膽.

**雙膽拖:** **#3** **Adj Place% ~78% ≥ 63%** → second **膽** permitted with **#1**.

---

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────

**POOL:** #**1**, #**3**, #**7**, #**10**, #**4**

### Option A1 — 雙膽拖 (recommended for cost)

- **膽:** #**1** BEAUTY ALLIANCE | #**3** WROTE A NEW PAGE  
- **腳:** #**7**, #**10**, #**4**  
- **Combinations:** **3** (pick **one** leg to complete the top-3 with the two bankers)  
- **Lines:** **1-3-7**, **1-3-10**, **1-3-4**  
- **Stake:** **HK$30**

### Option A2 — 膽拖 (single banker, standard skill default)

- **膽:** #**1**  
- **腳:** #**3**, #**7**, #**10**, #**4**  
- **Combinations:** C(4,2) = **6**  
- **Lines:** 1-3-7, 1-3-10, 1-3-4, 1-7-10, 1-7-4, 1-10-4  
- **Stake:** **HK$60**

---

**TOP TRIO GROUPS (Σ Adj Place%, heuristic)**

| Rank | Horses | Comment |
|------|--------|---------|
| 1 | 1 — 3 — 7 | Purton / Moreira / Atzeni |
| 2 | 1 — 3 — 10 | Shum / Hewitson in form |
| 3 | 1 — 3 — 4 | Short win pool |

---

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────

| Option | Combinations | Unit | Total |
|--------|--------------|------|--------|
| **A1 雙膽拖** | 3 | $10 | **HK$30** |
| **A2 膽拖** | 6 | $10 | **HK$60** |

**PASS CONDITIONS**

- If **#1** scratched → void (or revert to single-banker **#3** only if you pre-define that rule).  
- If **#3** scratched → drop **雙膽**; use **A2** with **#1** + #7,#10,#4 only (C(3,2)=3 lines).  
- Fewer than **3** starters → refund.

**CONFIDENCE:** **MEDIUM–HIGH** on **#1–#3–#7** as the main frame; **#11** penalised on vet timeline (still low MC).

**CAVEATS:** Confirm **going**; **Supreme Mastermind** has a recent vet pass after lameness — left **out** of pool on MC + adjustment.

---

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────

**Banker:** #**1** **BEAUTY ALLIANCE** (MC Win **33.7%**, MC Place **74.4%**).

**Primary legs** (MC Place% **> 20%**, ex-banker): #**3** (69.0%), #**7** (60.3%), #**10** (34.1%), #**4** (24.7%).

**Win-odds candidates** (MC Place ≤ 20% **and** Win odds **below 10**), ascending by win odds:

| Horse | MC Place% | Win odds |
|-------|-----------|----------|
| #2 LE ZONDA | 5.8% | 9.2 |

**Replaceable** primary (MC Place 20–30% **and** Win **> 10**): **none** (#4 is in band on place but Win **4.2** is not **> 10**).

**Action:** **Add #2** directly.

**Final legs:** #3, #7, #10, #4, #2 → **5** legs.

**膽拖:** 1 膽 + 5 腳 → C(5,2) = **10** → **HK$100**

**The 10 lines (banker 1):**  
1-3-7, 1-3-10, 1-3-4, 1-3-2, 1-7-10, 1-7-4, 1-7-2, 1-10-4, 1-10-2, 1-4-2

**vs Strategy A:** B adds **#2** (win-odds rule); A stays on the **five** highest Adj-place MC runners only.

═══════════════════════════════════════════════════════════

*Trio (單T) = 1st, 2nd, 3rd in any order. Not financial advice.*
