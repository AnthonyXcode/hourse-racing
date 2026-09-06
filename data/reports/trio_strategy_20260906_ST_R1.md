═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-06 | Race 1
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good (parsed from race card) | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --form-data all`, HV+ST form)
HISTORICAL SYNC: ✅ 218/219 fixtures scraped (only 2024-06-19 HV unavailable on HKJC — pre-dates all runners' relevant form)
SCMP DATA: ⚠️ Partial — Trouble-In-Running + vet lines parsed; **no Star Form comments, no trackwork/trial notes published yet**
ODDS SOURCE: HKJC early-morning pool (`fetch-odds.ts`, captured 20:07 HKT 05-Sep) — full 14-horse coverage
             SCMP odds: ✅ loaded (cross-check only) | HKJC live: ❌ not open

RACE: R1 GLENEALY HANDICAP — Class 5 | 1200m | Turf | Good | 14 runners
CLASSIFICATION: Competitive (top Adj Win% 30.5%) | POOL SIZE: 6
MODE: B — Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| #  | Horse             | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B)      | Top Quinella (fair odds) |
|----|-------------------|---------|-----------|----------|------------|-------------|---------------|------------------------|--------------------------|
| 11 | YEE CHEONG RAIDER | 28.5%   | 59.8%     | 11       | ✅          | ❌           | 11/6/2/2/4/5  | ★ 膽 (Banker)          | 6-11: 12.3% (8.1)        |
| 6  | VERBIER           | 20.3%   | 50.3%     | 16       | ✅          | ❌           | 3/1/3/7/4/3   | 腳 (Leg)               | 6-10: 5.7% (17.4)        |
| 10 | RUNJEET           | 12.2%   | 36.7%     | 36       | ✅          | ❌           | 9/4/12/7/9/10 | 腳 (Leg)               | 10-11: 7.4% (13.5)       |
| 4  | SUNNY Q           | 9.3%    | 30.5%     | 2.6      | ✅          | ✅           | 2/7/3/9/8/9   | 腳 (Leg)               | 4-11: 6.1% (16.4)        |
| 5  | RISING ELITE      | 7.5%    | 26.7%     | 11       | ✅          | ❌           | 5/5/5/14/7/10 | — (replaced by #2)     | 5-11: 5.1% (19.7)        |
| 2  | FOREVER FANCY     | 4.4%    | 17.3%     | 6.8      | ❌          | ✅           | 7/11/9/14/8/7 | 腳 (Leg — replacement) | —                        |
| 14 | SPARKLE AND GOLD  | 3.6%    | 14.4%     | 36       | ❌          | ❌           | 11/8/9/10/5/10| —                      | —                        |
| 13 | GOOD FORTUNE      | 3.4%    | 14.2%     | 15       | ❌          | ❌           | 12/14/10/5/5/11| —                     | —                        |
| 12 | GIMME FIVE        | 3.2%    | 12.7%     | 23       | ❌          | ❌           | 12/7/13/12/11/10| —                    | —                        |
| 7  | SO MY FOLKS       | 3.1%    | 13.5%     | 11       | ❌          | ❌           | 13/6/4/6/7/4  | —                      | —                        |
| 3  | POWER PATCH       | 2.0%    | 9.6%      | 11       | ❌          | ❌           | 7/5/10/13/14/11| —                     | —                        |
| 1  | BEAUTY GEMINI     | 1.1%    | 6.0%      | 28       | ❌          | ❌           | 13/12/10/12/14| —                      | —                        |
| 9  | EMERGING STAR     | 0.9%    | 4.6%      | 57       | ❌          | ❌           | 10/10/12/14/12/13| —                   | —                        |
| 8  | GROOVY FEELING    | 0.5%    | 3.7%      | 16       | ❌          | ❌           | 10/6/14/12/12/8| —                     | —                        |

**Market:** Overround 23.9% (high — early-morning pool). Favourite bias −75.8%, longshot bias +44.5%.
Model flags **#10 RUNJEET undervalued by 339%**, **#6 VERBIER by 224%**, **#11 YEE CHEONG RAIDER by 213%**.
The sharp disagreement is **#4 SUNNY Q**: 2.6 market favourite (Purton) but only 9.3% MC Win% / 30.5% Place%. MC is rating the field almost entirely on form lines — #4's last six (2/7/3/9/8/9) are respectable but its market price implies ~38% win. Both Strategy A and Strategy B keep #4 in the pool (Place% ≥ 25% must-include; Win odds < 10), so the disagreement does not force an exclusion.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 11 | YEE CHEONG RAIDER | 28.5% | 59.8% | excuses +2 | excuses +2 | **30.5%** | **61.8%** | 11 | A Badel | 3 | — | +excuses (contact on jump, no clear run) | ★ 膽 (Banker) |
| 6 | VERBIER | 20.3% | 50.3% | 0 | 0 | 20.3% | 50.3% | 16 | E C W Wong (-3) | 12 | — | — | 腳 (Leg) |
| 10 | RUNJEET | 12.2% | 36.7% | 0 | 0 | 12.2% | 36.7% | 36 | L Ferraris | 13 | — | — | 腳 (Leg) |
| 4 | SUNNY Q | 9.3% | 30.5% | excuses +2 | excuses +2 | 11.3% | 32.5% | 2.6 | Z Purton | 7 | — | +excuses (held up for clear running) | 腳 (Leg) |
| 5 | RISING ELITE | 7.5% | 26.7% | 0 | 0 | 7.5% | 26.7% | 11 | K Teetan | 8 | — | — | 腳 (Leg) |
| 6th→ 2 | FOREVER FANCY | 4.4% | 17.3% | excuses +2 | excuses +2 | 6.4% | 19.3% | 6.8 | C Y Ho | 1 | — | +excuses (steadied when crowded) | 腳 (Leg) |
| 7 | GOOD FORTUNE (#13) | 3.4% | 14.2% | excuses +2 | excuses +2 | 5.4% | 16.2% | 15 | H Y Yuen (-10) | 5 | — | +excuses (unbalanced, ran wider) | out |
| 8 | GIMME FIVE (#12) | 3.2% | 12.7% | excuses +2 | excuses +2 | 5.2% | 14.7% | 23 | K C Leung | 4 | — | +excuses (very wide, no cover) | out |
| 9 | SO MY FOLKS (#7) | 3.1% | 13.5% | excuses +2 | excuses +2 | 5.1% | 15.5% | 11 | H Bowman | 2 | — | +excuses (crowded, hampered) | out |
| 10 | SPARKLE AND GOLD (#14) | 3.6% | 14.4% | 0 | 0 | 3.6% | 14.4% | 36 | M L Yeung | 11 | — | — | out |
| 11 | EMERGING STAR (#9) | 0.9% | 4.6% | excuses +2 | excuses +2 | 2.9% | 6.6% | 57 | J Orman | 6 | — | +excuses (checked, steadied) | out |
| 12 | POWER PATCH (#3) | 2.0% | 9.6% | 0 | 0 | 2.0% | 9.6% | 11 | P N Wong (-7) | 14 | — | — | out |
| 13 | BEAUTY GEMINI (#1) | 1.1% | 6.0% | 0 | 0 | 1.1% | 6.0% | 28 | Y L Chung (-2) | 9 | — | — | out |
| 14 | GROOVY FEELING (#8) | 0.5% | 3.7% | 0 | 0 | 0.5% | 3.7% | 16 | B Avdulla | 10 | — | — | out |

**Factor legend:** `excuses +2` = TIR bad-luck bounce candidate. No `-injury30d`, `-perf`, `-barrier`, `-age`, `-notRO`, `+trial` or `+draw` flags applied — SCMP published **no** trackwork/trial notes, **no** adverse vet findings (all "no significant findings"), **no** unacceptable-performance reports, no repeat "bumped on jumping", and **no horse in the field is 8yo or above** (oldest = #13 GOOD FORTUNE, 7). All adjustments are inside the ±8% Win / ±10% Place cap.

**Style column is blank on purpose** — SCMP Star Form (the skill's designated running-style source) is not yet published for this card. Styles were not guessed.

**Reasoning:**
- **#11 YEE CHEONG RAIDER (膽)** — clear MC #1 on both Win% (28.5) and Place% (59.8), the field's most consistent top-3 profile (2/2/4/5 in four of its last six), draw 3, Badel up. TIR shows contact on jumping and no clear run last start → genuine bounce candidate. 10 past performances on file, so **banker-eligible** (not a debutant).
- **#6 VERBIER** — form line 3/1/3/7/4/3 is the best raw record in the race; MC 50.3% Place%. Wide gate 12 is the only negative (reducer, not an exclusion per rule 15).
- **#10 RUNJEET** — the model's biggest market-price edge (+339%) at 36. Weak recent finishes but MC rates the underlying figures; 36.7% Place% clears the 25% must-include bar.
- **#4 SUNNY Q** — must-include on Place% (32.5%) and it is the 2.6 favourite with Purton. MC and market are far apart; keeping it in the pool as a leg is the correct hedge under rule 9 (no hard exclusion at odds ≤ 15).
- **#5 RISING ELITE** — last of the must-includes at 26.7% Place%.
- **#2 FOREVER FANCY** — sixth pool slot on Adj Place% (19.3%), and the only sub-10 market price outside #4. Inside gate 1, steadied when crowded last start.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #11, #6, #10, #4, #5, #2
MODE: B (Standard Pool) | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#11 YEE CHEONG RAIDER** (Adj Place% 61.8%) ← locked in every combo
腳 (Legs):  #6, #10, #4, #5, #2
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**

雙膽拖 check: 2nd-ranked #6 VERBIER Adj Place% = 50.3% < 63% → **1 banker only**.

TOP TRIO COMBINATIONS (Plackett-Luce over Adj Win%, 200k draws):
| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|--------------------|-----------------|----------------|
| 1 | #11, #6, #10 | 6.04% | $17 |
| 2 | #11, #6, #4  | 5.65% | $18 |
| 3 | #11, #6, #5  | 3.52% | $28 |
| 4 | #11, #10, #4 | 3.06% | $33 |
| 5 | #11, #6, #2  | 2.98% | $34 |

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 10 (膽拖: C(5,2), legs = 5)
UNIT BET: $10 (fixed)
TOTAL STAKE: **$100**
MODELLED COVERAGE: **29.0%** of trio outcomes (vs 36.9% for the full C(6,3)=20 ticket at $200 — 50% cheaper for 79% of the coverage)

FULL TICKET (all 10 combos, ranked by modelled probability):
| Combo | Prob | Fair odds |
|-------|------|-----------|
| 11-6-10 | 6.04% | $17 |
| 11-6-4  | 5.65% | $18 |
| 11-6-5  | 3.52% | $28 |
| 11-10-4 | 3.06% | $33 |
| 11-6-2  | 2.98% | $34 |
| 11-10-5 | 1.94% | $52 |
| 11-4-5  | 1.76% | $57 |
| 11-10-2 | 1.65% | $61 |
| 11-4-2  | 1.48% | $67 |
| 11-5-2  | 0.93% | $107 |

HKJC BET SLIP: Race 1 → Trio → 膽拖 → 膽: 11 | 腳: 2, 4, 5, 6, 10 | $10/combo

PASS CONDITIONS:
- **#11 YEE CHEONG RAIDER scratched → VOID the ticket** (do not restructure; rule 10).
- Any 2 of #6/#10/#4 scratched → drop to Strategy B legs or pass.
- Field drops below 3 starters → pool refunded automatically.
- Going changes to Yielding/Heavy → re-run MC; the model's form weighting is Good-track based.

CONFIDENCE: **MEDIUM**

CAVEATS:
1. **Season opener.** 2026-09-06 is the first meeting of the 2026/27 season (last data point: 2026-07-15). Jockey and trainer season profiles loaded **0** records — MC ran without any current-season jockey/trainer form. This is the largest single source of model error on this card.
2. **SCMP Star Form and trackwork not yet published** — only stewards' TIR text and clean vet lines were available. All positive/negative adjustment types except `+excuses` were therefore unavailable, so adjustments are small and uniform.
3. **SCMP QP/Q odds matrix was retrieved but is internally inconsistent** (e.g. QP 1-2 at 129 against QP 4-9 at 8.8 with those horses' win prices) — it looks like pre-market placeholder data and was **not** used for value confirmation.
4. **Big model-vs-market split on #4 SUNNY Q** (2.6 fav vs MC 9.3% Win%). If the market is right, #4 belongs closer to the banker than to a leg. It is included as a leg in both strategies, which limits the damage either way, but it means the two ranking systems genuinely disagree about this race's shape.
5. **The finish-time projection contradicts the win ranking** — it puts #14 SPARKLE AND GOLD fastest (1:08.80) while MC gives it 3.6% win. Speed-figure noise on a Class 5 field with wide-ranging form; the win/place distribution, not the time projection, drove selection.
6. Odds are the **early-morning pool** with a 23.9% overround. Re-check prices near the jump; a large move on #10 or #6 would strengthen the case, a collapse in #11's price would weaken the banker.
7. Class 5 sprints at Sha Tin over 1200m are the most upset-prone segment of the card; the banker's ~56% cross-meeting top-3 rate is the realistic hit-rate anchor, not the 82% single-meeting figure.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: **#11 YEE CHEONG RAIDER** (MC Win% 28.5%, MC Place% 59.8%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6 (50.3%), #10 (36.7%), #4 (30.5%), #5 (26.7%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): **#5 RISING ELITE** (MC Place% 26.7%, Win odds 11)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): **#2 FOREVER FANCY** (Win odds 6.8, MC Place% 17.3%)
  – #4 SUNNY Q (2.6) is also sub-10 but already a primary leg (Place% 30.5% > 20%), so no action.
  – #4 is **not** replaceable: its 30.5% Place% sits above the 20–30% band.
Action: **#2 replaces #5** (1-for-1 swap; #5 was the only leg meeting both replaceable conditions)
Final legs: **#6, #10, #4, #2**
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = **6**
UNIT BET: $10 (fixed)
TOTAL STAKE: **$60**
MODELLED COVERAGE: **25.4%** (raw-MC Plackett-Luce, 200k draws)

STRATEGY B TICKET:
| Combo | Prob | Fair odds |
|-------|------|-----------|
| 11-6-10 | 9.15% | $11 |
| 11-6-4  | 6.73% | $15 |
| 11-10-4 | 3.67% | $27 |
| 11-6-2  | 2.99% | $33 |
| 11-10-2 | 1.64% | $61 |
| 11-4-2  | 1.22% | $82 |

HKJC BET SLIP: Race 1 → Trio → 膽拖 → 膽: 11 | 腳: 2, 4, 6, 10 | $10/combo

**A vs B comparison:** Same banker (#11 tops both MC Win% and Adj Win%), and the top four combos are identical — the SCMP adjustments were too small to reorder anything. The only structural difference is the 5th leg: Strategy A keeps **#5 RISING ELITE** (26.7% Place% clears the 25% must-include bar) *and* adds #2, while Strategy B's replacement rule swaps #5 out for **#2 FOREVER FANCY** on the market signal (6.8 vs 11). B is 40% cheaper ($60 vs $100) and gives up 3.6 points of modelled coverage (25.4% vs 29.0%) — the sacrificed combos are the four cheapest legs of the A ticket (11-6-5, 11-10-5, 11-4-5, 11-5-2, worth 8.15% combined, replaced by nothing since #2 is in both). **If backing one only: Strategy A**, because #5 clears the must-include threshold on its own merit and the extra $40 buys the 3rd- and 6th-most-likely combinations on the card.
═══════════════════════════════════════════════════════════
