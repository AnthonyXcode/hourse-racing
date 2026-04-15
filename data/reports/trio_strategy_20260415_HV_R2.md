# Trio (any order) strategy — Happy Valley | 2026-04-15 | Race 2

**DATA VALIDATION:** Passed (12 starters, odds for full field, jockey stats from meeting fetch). Going: Good (default when not parsed from card). **Scratchings:** None in HKJC field; SCMP lists reserve (R) not in this card.

**MC SIMULATION:** 10,000 iterations | `tools/analyze-race.ts` with `--form-data all`  
**SCMP DATA:** Loaded (Star Form, TIR, Vet, trackwork, Q/QP). Tipster tables ignored.  
**ODDS SOURCE:** `data/odds/odds_20260415_HV.json` (R2 `fetchedAt` 2026-04-15T03:34:47.374Z).

**RACE:** R2 — Class 5 | 1650m Turf | “A” Course | Good | 12 runners  
**CLASSIFICATION:** Dominant (top Adj Win% ≥ 35%)  
**MODE:** A — Tight pool (5 horses)  
**BET STRUCTURE:** 膽拖 — 1膽 (#8) + 4腳 → C(4,2) = **6** combos | Unit $10 → **HK$60**

---

## MC simulation (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella |
|---|--------|---------|------------|----------|------------|--------------|------|-------------------|--------------|
| 8 | COURIER MAGIC | 46.8% | 87.5% | 14 | Yes | No | 6 | Banker (MC Win #1) | 6-8: 43.8% (2.3) |
| 6 | FAMILY FORTUNE | 34.0% | 81.0% | 3.8 | Yes | Yes | 7 | Leg | — |
| 4 | EXCEED THE WISH | 7.3% | 39.9% | 19 | Yes | No | 8 | Leg | — |
| 9 | DRAGON SUNRISE | 6.6% | 39.6% | 3.6 | Yes | Yes | 9 | Leg | 8-9: 10.2% (9.8) |
| 2 | POWER SUMMIT | 2.4% | 19.1% | 48 | No | No | 8 | — | — |
| 7 | DOUBLE BINGO | 1.8% | 15.0% | 9.6 | No | Yes | 5 | — | — |
| 10 | WAH MAY WAI WAI | 0.5% | 7.1% | 10 | No | No | 9 | — | — |
| 12 | SMART TRIO | 0.5% | 6.0% | 25 | No | No | 9 | — | — |
| 5 | INNO CENTURY | 0.1% | 1.7% | 25 | No | No | 4 | — | — |
| 11 | PERFECTO MOMENTS | 0.1% | 1.4% | 9.2 | No | Yes | 6 | — | — |
| 3 | ZETTA FORCE | 0.1% | 1.8% | 16 | No | No | 4 | — | — |
| 1 | FLOOF | 0.0% | 0.0% | 11 | No | No | 5 | — | — |

**Market (summary):** Model is very strong on **#8** vs listed win price; **#6–#8** dominate MC quinella mass (6-8 ~44% fair 2.3).

---

## Horse rankings (Strategy A)

Jockey boost: `win% ≤ 7 → 0`; else `min(7, 1 + (win% − 7) × 6 / 13)`; if MC win rank **> 4**, cap at **+4%**. SCMP caps: ±8% Win, ±10% Place per horse.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 8 | COURIER MAGIC | 46.8% | 87.5% | jockey +3.2, excuses +2 | same | **50.0%*** | **85.0%*** | 14 | H Bowman | TIR wide; Valley 1650 form | 膽 |
| 6 | FAMILY FORTUNE | 34.0% | 81.0% | jockey +7.0, excuses +2 | same | **43.0%** | **90.0%*** | 3.8 | J Moreira | TIR hampered; C&D win w/ rider | 腳 |
| 9 | DRAGON SUNRISE | 6.6% | 39.6% | jockey +6.8, excuses +2 | same | 15.4% | 48.4% | 3.6 | Z Purton | TIR held/crowded | 腳 |
| 4 | EXCEED THE WISH | 7.3% | 39.9% | jockey 0, excuses +2 | same | 9.3% | 41.9% | 19 | L Hewitson | TIR held / keen | 腳 |
| 7 | DOUBLE BINGO | 1.8% | 15.0% | jockey 0, excuses +2 | same | 3.8% | 17.0% | 9.6 | M F Poon | TIR wide | — |
| 2 | POWER SUMMIT | 2.4% | 19.1% | jockey +1.4 | same | 3.8% | 20.5% | 48 | J Orman | Mile query (Star) | — |
| 10 | WAH MAY WAI WAI | 0.5% | 7.1% | jockey +2.8, excuses +2 | same | 5.3% | 11.9% | 10 | A Atzeni | TIR / 25x maiden | — |
| 3 | ZETTA FORCE | 0.1% | 1.8% | jockey 0, −perf −2 | same | 0.0% | 0.0% | 16 | C L Chau | Unacceptable (TIR); vet passed Feb | — |
| 1 | FLOOF | 0.0% | 0.0% | jockey 0, trial +2 | same | 2.0% | 2.0% | 11 | K Teetan | Trial strong (trackwork) | — |
| 12 | SMART TRIO | 0.5% | 6.0% | jockey +1.3 | same | 1.8% | 7.3% | 25 | P N Wong | — | — |
| 5 | INNO CENTURY | 0.1% | 1.7% | jockey 0 | same | 0.1% | 1.7% | 25 | M Chadwick | — | — |
| 11 | PERFECTO MOMENTS | 0.1% | 1.4% | jockey 0, excuses +2 | same | 2.1% | 3.4% | 9.2 | M L Yeung | TIR crowded | — |

*Capped at 50% Win / 85% Place where shown (skill cap).

**Banker eligibility:** **#8** has ample starts (not a debutant).

**Reasoning:** MC and SCMP both point to **#8** and **#6** as the main winning hopes, with **#9** and **#4** the next tier on combined win/place. Mode A fifth slot: **#2** edges **#7** on Adj Place% (20.5 vs 17.0) for a longshot slip into the frame (mile query but Orman + held-up narrative from other form lines).

---

## Trio pool (any order) — Strategy A

**POOL:** #8, #6, #9, #4, #2  
**MODE:** A | **POOL SIZE:** 5

**膽拖:**  
- **膽:** #8 COURIER MAGIC  
- **腳:** #6 FAMILY FORTUNE, #9 DRAGON SUNRISE, #4 EXCEED THE WISH, #2 POWER SUMMIT  
- **Combinations:** C(4,2) = **6** | **Stake:** HK$60

**Six Trio lines:**  
(8-6-9), (8-6-4), (8-6-2), (8-9-4), (8-9-2), (8-4-2)

### Top trios by Σ Adj Place% (heuristic)

| Rank | Horses | Σ Adj Place% |
|------|--------|----------------|
| 1 | 8-6-9 | 223.4 |
| 2 | 8-6-4 | 216.9 |
| 3 | 8-9-4 | 175.3 |
| 4 | 8-6-2 | 190.5 |
| 5 | 8-9-2 | 154.9 |

---

## Ticket summary — Strategy A

| Item | Value |
|------|--------|
| Combinations | 6 (膽拖) |
| Unit | $10 |
| **Total** | **HK$60** |

**PASS / void:** If **#8** scratched → void. Fewer than 3 starters → refund.

**CONFIDENCE:** MEDIUM-HIGH on **#8/#6** anchoring the frame; **LOW** on **#2** leg (MC place ~19%) — included only as Mode A fifth slot vs **#7**.

**CAVEATS:** Odds snapshot from file timestamp; re-check scratchings and pools before betting.

---

## Strategy B (MC-only)

**Banker:** #8 COURIER MAGIC (MC Win **46.8%**, MC Place **87.5%**)

**Primary legs (MC Place% > 20%, ex-banker):** #6 (81.0%), #4 (39.9%), #9 (39.6%)

**Win-odds replacement:** Candidates with MC Place ≤ 20% and Win < 10: **#7** (15.0% place, 9.6 win). Primary legs in 20–30% band with Win > 10: **none** (#4 and #9 are ~40% place). Per skill: if no replaceable leg in 20–30% with Win > 10, **add** #7 directly.

**Final legs:** #6, #4, #9, #7  

**膽拖:** 1膽 + 4腳 → C(4,2) = **6** combos → **HK$60**

**Strategy B lines:** (8-6-4), (8-6-9), (8-6-7), (8-4-9), (8-4-7), (8-9-7)

**vs A:** Strategy A swaps **#7** for **#2** (SCMP/mile narrative vs MC win-odds add-on). Same 6-line cost in this setup.

---

*Trio = top three in any order. Not financial advice.*
