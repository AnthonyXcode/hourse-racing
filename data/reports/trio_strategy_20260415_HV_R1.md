# Trio (any order) strategy — Happy Valley | 2026-04-15 | Race 1

**DATA VALIDATION:** Passed (12 starters, odds for full field, jockey stats loaded). Going: Good (default when not parsed from card). **Scratchings:** None in HKJC field; SCMP may list reserves not in this card.

**MC SIMULATION:** 10,000 iterations | `tools/analyze-race.ts` with `--form-data all`  
**SCMP DATA:** Loaded (odds, Star Form, TIR, Vet, trackwork, Q matrix). Tipster tables ignored.  
**ODDS SOURCE:** `tools/fetch-odds.ts` → `data/odds/odds_20260415_HV.json` (R1 `fetchedAt` 2026-04-15T03:34:45.922Z); SCMP race card R1 cross-check.

**RACE:** R1 — Class 5 | 1000m Turf | “A” Course | Good | 12 runners  
**CLASSIFICATION:** Dominant (top Adj Win% ≥ 35% after boosts)  
**MODE:** A — Tight pool (5 horses)  
**BET STRUCTURE:** 膽拖 — 1膽 (#4) + 4腳 → C(4,2) = **6** combos | Unit $10 → **HK$60**

---

## MC simulation (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella |
|---|--------|---------|------------|----------|------------|--------------|------|-------------------|--------------|
| 4 | SPICY SPANGLE | 44.7% | 84.2% | 7.1 | Yes | Yes | 7 | Banker (MC Win #1) | 4-6: 27.7% (3.6) |
| 6 | ALWAYS MY FOLKS | 23.9% | 68.8% | 7.5 | Yes | Yes | 6 | Leg | 4-3: 23.3% (4.3) |
| 3 | LUCKY GENERATIONS | 19.4% | 64.0% | 3.5 | Yes | Yes | 8 | Leg | — |
| 5 | MACANESE MASTER | 5.9% | 33.5% | 3.9 | Yes | Yes | 8 | Leg | — |
| 7 | RUN YES RUN | 2.0% | 14.1% | 49 | No | No | 3 | — | — |
| 1 | COUNTRY DANCER | 1.6% | 11.6% | 10 | No | No | 3 | — | — |
| 9 | ORIENTAL SURPRISE | 1.3% | 12.1% | 22 | No | No | 15 | — | — |
| 8 | TAIHANG SCENERY | 1.1% | 10.1% | 24 | No | No | 3 | — | — |
| 11 | SPORTIC WARRIOR | 0.1% | 1.0% | 87 | No | No | 4 | — | — |
| 10 | SHINE BRIGHT | 0.0% | 0.5% | 20 | No | No | 8 | — | — |
| 2 | FORTUNE WARRIOR | 0.0% | 0.2% | 24 | No | No | 7 | — | — |
| 12 | BINGO BABE | 0.0% | 0.0% | 10 | No | No | 8 | — | — |

**Market (summary):** Model is very strong on **#4** vs book; several short prices in the MC frame — Trio dividend may be modest if chalk holds.

---

## Horse rankings (Strategy A)

Jockey boost: `win% ≤ 7 → 0`; else `min(7, 1 + (win% − 7) × 6 / 13)`; if MC win-probability rank **> 4**, cap boost at **+4%**. SCMP caps: ±8% Win, ±10% Place per horse.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | SCMP flags | Role |
|---|--------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------------|------|
| 4 | SPICY SPANGLE | 44.7% | 84.2% | jockey +3.2, excuses +2, trial +2 | same | **50.0%*** | **85.0%*** | 7.1 | H Bowman | +trial, TIR crowded | 膽 |
| 6 | ALWAYS MY FOLKS | 23.9% | 68.8% | jockey +6.8, excuses +2 | same | 32.7% | 77.6% | 7.5 | Z Purton | TIR wide / bumped | 腳 |
| 3 | LUCKY GENERATIONS | 19.4% | 64.0% | jockey +7.0, draw +1, form +1 | same | 28.4% | 73.0% | 3.5 | J Moreira | Blinkers 1st time, ideal draw | 腳 |
| 5 | MACANESE MASTER | 5.9% | 33.5% | jockey 0, form +1, draw +1 | same | 7.9% | 35.5% | 3.9 | Y L Chung | On-pace, gate 1 | 腳 |
| 9 | ORIENTAL SURPRISE | 1.3% | 12.1% | jockey +1.4, excuses +2 | same | 4.7% | 15.5% | 22 | H Bentley | Wide / no cover (TIR) | 腳 |
| 1 | COUNTRY DANCER | 1.6% | 11.6% | jockey +1.4, excuses +2 | same | 5.0% | 15.0% | 10 | J Orman | Fetlock history (Star) | — |
| 8 | TAIHANG SCENERY | 1.1% | 10.1% | jockey +1.6, excuses +1 | same | 3.7% | 12.7% | 24 | E C W Wong | — | — |
| 7 | RUN YES RUN | 2.0% | 14.1% | jockey 0, vet −3, place −4 | vet −3, place −4 | 0.5% | 10.1% | 49 | M L Yeung | Trachea / vet note | — |
| 2 | FORTUNE WARRIOR | 0.0% | 0.2% | jockey +1.3, excuses +2 | same | 3.3% | 3.5% | 24 | P N Wong | Wide (TIR) | — |
| 11 | SPORTIC WARRIOR | 0.1% | 1.0% | jockey 0, excuses +2 | same | 2.1% | 3.0% | 87 | H T Mo | — | — |
| 10 | SHINE BRIGHT | 0.0% | 0.5% | jockey 0, tactics +1 | same | 1.0% | 1.5% | 20 | M Chadwick | — | — |
| 12 | BINGO BABE | 0.0% | 0.0% | 0 | 0 | 0.0% | 0.0% | 10 | M F Poon | — | — |

*Capped at 50% Win / 85% Place per skill cap rule.

**Reasoning:** MC isolates **#4 / #6 / #3** as the main top-3 cluster; **#5** adds place and gate-speed. Mode A fifth slot: **#9** (best remaining Adj Place% after SCMP wide-trip). **#7** penalised for recent vet/trachea context vs meeting date.

---

## Trio pool (any order) — Strategy A

**POOL:** #4, #6, #3, #5, #9  
**MODE:** A | **POOL SIZE:** 5

**膽拖:**  
- **膽:** #4 SPICY SPANGLE  
- **腳:** #3 LUCKY GENERATIONS, #5 MACANESE MASTER, #6 ALWAYS MY FOLKS, #9 ORIENTAL SURPRISE  
- **Combinations:** C(4,2) = **6** | **Stake:** HK$60 ($10 × 6)

**Six Trio (any order) lines:**  
(4-3-5), (4-3-6), (4-3-9), (4-5-6), (4-5-9), (4-6-9)

### Top trios by sum Adj Place% (heuristic)

| Rank | Horses | Σ Adj Place% |
|------|--------|----------------|
| 1 | 4-3-6 | 235.6 |
| 2 | 4-5-6 | 198.1 |
| 3 | 4-3-5 | 193.5 |
| 4 | 4-6-9 | 178.1 |
| 5 | 4-3-9 | 173.5 |

---

## Ticket summary — Strategy A

| Item | Value |
|------|--------|
| Combinations | 6 (膽拖) |
| Unit | $10 |
| **Total** | **HK$60** |

**PASS / void:** If **#4** scratched → void (no banker substitute). Fewer than 3 starters → refund. Going **Heavy** → reassess on-pace bias.

**CONFIDENCE:** MEDIUM-HIGH on horse set vs model; LOW on Trio **dividend** (short prices in frame).

**CAVEATS:** Going may default on parse; confirm latest scratchings and odds before betting.

---

## Strategy B (MC-only)

**Banker:** #4 SPICY SPANGLE (MC Win **44.7%**, MC Place **84.2%**)

**Primary legs (MC Place% > 20%, ex-banker):** #3, #5, #6  

**Replaceable legs (MC Place 20–30% and Win odds > 10):** none among primaries.

**Win-odds candidates (MC Place ≤ 20% and Win odds < 10):** none strict (win = 10 fails “below 10” for #1 / #12).

**Final legs:** #3, #5, #6  

**膽拖:** 1膽 + 3腳 → C(3,2) = **3** combos → **HK$30**

**Strategy B lines:** (4-3-5), (4-3-6), (4-5-6)

**vs A:** B drops **#9** and halves cost; A adds a wide-draw cover horse for the dominant race.

---

*Generated for HKJC Trio (單T): top three in any order. Not financial advice.*
