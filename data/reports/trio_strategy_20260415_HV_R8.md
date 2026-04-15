═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-04-15 | Race 8
═══════════════════════════════════════════════════════════

**DATA VALIDATION:** ✅ Passed | **Going:** Good (default) | **Scratchings:** None in HKJC field of **11**.

**MC SIMULATION:** 10,000 iterations | `--form-data all` | `tools/analyze-race.ts`

**SCMP DATA:** ✅ Loaded (**SCRUM HALF HANDICAP - Sec2**, Star Form, TIR, Vet — **#5 FIVEFORTWO** fever / passed). Tipster columns ignored.

**ODDS SOURCE:** `data/odds/odds_20260415_HV.json` (R8 `fetchedAt` 2026-04-15T03:34:55.361Z).

**Jockey stats:** `data/jockeys/jockey_stats_20260414.json`

---

**RACE:** R8 — Class 3 | **1650m** Turf | Good | **11** runners

**CLASSIFICATION:** **Competitive** — top **Adj Win%** ~**25–26%** on **#10** (MC win **23.6%**, Kingscote jockey boost **0%**, SCMP +TIR) → band **20–35%**.

**POOL SIZE:** **6** | **MODE:** **B — Standard pool**

**BET STRUCTURE:** **膽拖** | 1 膽 (**#10**) + **5** 腳 → **C(5,2) = 10** | Unit **$10** → **HK$100**

---

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — all 11 runners
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Top Quinella (fair) |
|---|--------|---------|-----------|----------|------------|-------------|------|---------------------|
| 10 | RAGGA BOMB | 23.6% | 58.0% | 11.0 | ✅ | No | 9 | 2-10: 10.5% (9.5) |
| 3 | THE BOOM BOX | 20.3% | 52.5% | 18.0 | ✅ | No | 9 | 3-10: 10.3% (9.7) |
| 2 | KEEFY | 18.9% | 52.1% | 7.2 | ✅ | Yes | 8 | 8-10: 8.9% (11.2) |
| 8 | ARMOR GOLDEN EAGLE | 16.5% | 47.0% | 3.4 | ✅ | Yes | 6 | 2-3: 8.7% (11.5) |
| 1 | JUMBO LEGEND | 6.6% | 25.8% | 9.0 | ✅ | Yes | 8 | 3-8: 7.9% (12.7) |
| 4 | RIDING TOGETHER | 5.5% | 24.1% | 15.0 | ✅ | No | 7 | — |
| 11 | ALL ROUND WINNER | 4.8% | 21.0% | 8.5 | ✅ | Yes | 10 | — |
| 6 | I CAN | 3.0% | 13.8% | 19.0 | ❌ | No | 10 | — |
| 5 | FIVEFORTWO | 0.4% | 3.1% | 6.3 | ❌ | Yes | 6 | — |
| 7 | TELECOM FIGHTERS | 0.2% | 1.9% | 13.0 | ❌ | No | 11 | — |
| 9 | ROMANTIC GLADIATOR | 0.1% | 0.6% | 15.0 | ❌ | No | 3 | — |

**Market (brief):** **#8** short win favourite; MC prefers **#10** / **#3** for value. Overround ~23.1%.

---

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — jockey boost + SCMP)
───────────────────────────────────────────────────────────

**Jockey boost:** `win% ≤ 7 → 0`; else `min(7, 1 + (win% − 7) × 6 / 13)`; MC **win rank > 4** → cap **+4%**.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 10 | RAGGA BOMB | 23.6% | 58.0% | jockey 0, excuses +2 | same | **25.6%** | **60.0%** | 11.0 | R Kingscote | TIR bump / room (minor) | ★ 膽 |
| 3 | THE BOOM BOX | 20.3% | 52.5% | jockey +1.4, excuses +2 | same | **23.7%** | **55.9%** | 18.0 | J Orman | Bumped / unbalanced (TIR) | 腳 |
| 8 | ARMOR GOLDEN EAGLE | 16.5% | 47.0% | jockey +2.8, form +1 | same | **20.3%** | **50.8%** | 3.4 | A Atzeni | Led / C3 win (Star) | 腳 |
| 2 | KEEFY | 18.9% | 52.1% | jockey 0, form +1 | same | **19.9%** | **53.1%** | 7.2 | M F Poon | Neck 2nd HV 1650 (P Woo) | 腳 |
| 1 | JUMBO LEGEND | 6.6% | 25.8% | jockey +4.0†, −roarer −2 | same | **8.6%** | **27.8%** | 9.0 | J Moreira | “Roarer” / respiratory (TIR) | 腳 |
| 4 | RIDING TOGETHER | 5.5% | 24.1% | jockey +4.0†, trial +2 | same | **11.5%** | **30.1%** | 15.0 | Z Purton | Trial / disappointing last (vet passed) | 腳 |
| 11 | ALL ROUND WINNER | 4.8% | 21.0% | jockey +1.4, excuses +2 | same | **8.2%** | **24.4%** | 8.5 | H Bentley | Saddle / bump (TIR) | — |
| 6 | I CAN | 3.0% | 13.8% | jockey 0 | same | 3.0% | 13.8% | 19.0 | C L Chau | Wide (TIR) | — |
| 5 | FIVEFORTWO | 0.4% | 3.1% | jockey +1.8, fever note 0 | same | 2.2% | 3.1% | 6.3 | L Ferraris | Fever passed (Vet/SCMP) | — |
| 7 | TELECOM FIGHTERS | 0.2% | 1.9% | jockey +1.3 | same | 1.5% | 3.2% | 13.0 | P N Wong | Keen (TIR) | — |
| 9 | ROMANTIC GLADIATOR | 0.1% | 0.6% | jockey 0 | same | 0.1% | 0.6% | 15.0 | L Hewitson | — | — |

†**#1** and **#4** are **outside MC top 4** by win% → Purton boost **capped at +4%**.

**Must-include Adj Place ≥ 25%:** **#10, #3, #2, #8, #1, #4** (**#4** lifted to **~30%** with trial + jockey; **#11** stays **~24.4%** — borderline; skill prefers **sixth slot #4** over **#11** on Adj).

**Banker:** **#10** has **9** prior form lines — OK (not debutant).

**雙膽拖:** No second horse **Adj Place ≥ 63%** → **single 膽 only**.

---

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────

**POOL:** #**10**, #**3**, #**8**, #**2**, #**1**, #**4**

**MODE:** B | **POOL SIZE:** 6

**膽拖**

- **膽:** #**10** **RAGGA BOMB**
- **腳:** #**3**, #**8**, #**2**, #**1**, #**4**

**C(5,2) = 10** | **HK$100**

**The 10 lines:**  
10-3-8, 10-3-2, 10-3-1, 10-3-4, 10-8-2, 10-8-1, 10-8-4, 10-2-1, 10-2-4, 10-1-4

---

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────

| Item | Value |
|------|--------|
| Combinations | 10 (膽拖) |
| Unit | $10 |
| **Total stake** | **HK$100** |

**PASS CONDITIONS:** If **#10** scratched → void. Fewer than **3** starters → refund.

**CONFIDENCE:** **MEDIUM** — Class 3 mile at HV is **open**; **#8** is market leader vs MC order.

**CAVEATS:** **#1** carries **roarer**/respiratory risk in TIR — still in pool on **Adj Place** rule and odds **≤ 15**. **#5** fever **passed** but MC **0.4%** win — not in pool.

---

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────

**Banker:** #**10** (MC Win **23.6%**, MC Place **58.0%**).

**Primary legs** (MC Place% **> 20%**, ex-banker): #**3**, #**2**, #**8**, #**1**, #**4**, #**11** (21.0% **> 20%**).

**Win-odds candidates** (MC Place ≤ 20% **and** Win odds **below 10**): **#5 FIVEFORTWO** — MC Place **3.1%**, Win **6.3**.

**Replaceable** primary (Place **20–30%** **and** Win **> 10**): **#4** has Place **24.1%** but Win **15** → **not** replaceable (Win not **> 10**). **No** swap target.

**Action:** **Add #5** to legs.

**Final legs:** #3, #2, #8, #1, #4, #11, #5 → **7** legs.

**膽拖:** C(7,2) = **21** → **HK$210**

**Lean Strategy B (primary only, align with A):** legs **#3,#2,#8,#1,#4** (drop **#11** to match 5-foot + banker) → **10** lines / **HK$100** — same as Strategy A.

**vs A:** Full Strategy B adds **#11** + **#5** (short win odds rule); A uses SCMP to hold **#11** out and **#5** out.

═══════════════════════════════════════════════════════════

*Trio (單T) = 1st, 2nd, 3rd in any order. Not financial advice.*
