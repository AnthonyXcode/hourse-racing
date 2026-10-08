═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-07 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good to Firm | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5`)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork / Win odds parsed (SCMP "Place" column values look inconsistent, so they were not used)
ODDS SOURCE: HKJC morning pool (fetch-odds.ts, `data/odds/odds_20261007_HV.json`, captured 11:01 HKT 07-Oct)
             SCMP odds: ✅ loaded (later snapshot, shown for reference) | HKJC live: ✅ loaded (morning)

RACE: R2 CHEUNG FAT HANDICAP | Class 4 | 1200m | Turf | Good to Firm | 12 runners
CLASSIFICATION: Competitive (top Adj Win% 28.9%) | POOL SIZE: 7
MODE: B: Standard Pool (6), widened to 7 by Rule 8 (#8 Adj Place% 21.7% ≥ 20%) and the HV wider-pool guidance
BET STRUCTURE: 膽拖 1膽 + 6腳 = C(6,2) = 15
UNIT BET: $10 per combination (fixed)

### Data summary
```
Meeting: HV 2026-10-07 | Going: Good to Firm | Surface: Turf
Target Race(s): R2 (Class 4 | 1200m | 12 runners)
Scratchings: none
Odds coverage: 12 horses with odds (HKJC win; place odds estimated by tool from win odds)
SCMP data: ✅ loaded
```
- Jockey/trainer stats: 12/12 loaded. Form: 12/12 enriched (every horse has ≥3 runs, so there are no debutants).
- Historical sync was not re-run. Per the instructions, it was already done for this meeting.

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────
| # | Horse | MC Win% | MC Place% | Win Odds (HKJC / SCMP) | Place%>20% | Win odds<10 | Form (runs) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|------------------------|------------|-------------|------|-------------------|--------------------------|
| 4 | WINNING MONEY | 27.9% | 59.6% | 11 / 9.6 | ✅ | ❌ | 10 | ★ 膽 (Banker) | 2-4: 9.4% (10.6) |
| 2 | LUCKY MCQUEEN | 16.4% | 44.3% | 7.7 / 7.9 | ✅ | ✅ | 10 | 腳 (Leg) | 2-4: 9.4% (10.6) |
| 10 | LOVING VIBES | 12.1% | 36.9% | 2.7 / 2.5 | ✅ | ✅ | 10 | 腳 (Leg) | 4-10: 7.9% (12.6) |
| 5 | WORLD HERO | 10.7% | 33.1% | 8.0 / 10 | ✅ | ✅ | 10 | 腳 (Leg) | 4-5: 6.3% (16.0) |
| 6 | HAYDAY | 10.6% | 33.2% | 6.3 / 7.4 | ✅ | ✅ | 10 | 腳 (Leg) | 4-6: 6.6% (15.3) |
| 12 | TACTICAL COMMAND | 7.9% | 27.0% | 20 / 25 | ✅ | ❌ | 10 | 腳 (Leg) (replaceable, no candidate) | 4-12: 5.2% (19.1) |
| 8 | I AM BACK | 5.2% | 19.7% | 23 / 25 | ❌ | ❌ | 3 | — | — |
| 7 | NEW POWER | 2.6% | 12.9% | 12 / 14 | ❌ | ❌ | 10 | — | — |
| 1 | GLORIOUS DYNASTY | 2.4% | 11.3% | 14 / 14 | ❌ | ❌ | 3 | — | — |
| 3 | VIGOR HAPPINESS | 2.3% | 10.5% | 29 / 18 | ❌ | ❌ | 4 | — | — |
| 9 | LIGHTNESS OF BEING | 1.1% | 6.2% | 19 / 16 | ❌ | ❌ | 10 | — | — |
| 11 | SMILING CHAMPION | 0.9% | 5.5% | 39 / 41 | ❌ | ❌ | 5 | — | — |

Market: The overround is 23.6%. MC rates #4 WINNING MONEY as heavily undervalued (+206%; 27.9% MC vs 11/9.6 odds). Favourite #10 LOVING VIBES (2.7) is overbet against its 12.1% MC win rate (favourite bias −67%). MC flags #7 and #9 as overvalued by the market. The finish-time projection also puts #4 fastest (1:09.25), with #7 NEW POWER second-fastest by speed figure.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC + SCMP adjustments)
───────────────────────────────────────────────────────────
| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 4 | WINNING MONEY | 27.9% | 59.6% | +form +1 | +form +1 | 28.9% | 60.6% | 11 | L Ferraris | Stalk | +form (pace-stalking win from gate 12) | ★ 膽 (Banker) |
| 2 | LUCKY MCQUEEN | 16.4% | 44.3% | excuses +2, +form +1 | excuses +2, +form +1 | 19.4% | 47.3% | 7.7 | M F Poon | Midfield | +excuses (steadied 550m), +form (won last start) | 腳 (Leg) |
| 5 | WORLD HERO | 10.7% | 33.1% | excuses +2 | excuses +2 | 12.7% | 35.1% | 8.0 | H Bentley | Front | +excuses (wide, no cover) | 腳 (Leg) |
| 6 | HAYDAY | 10.6% | 33.2% | trial +2 | trial +2 | 12.6% | 35.2% | 6.3 | H Y Yuen (-7) | Stalk | +trial (quickened well, ST dirt trial); vet: airway DDSP noted (undated, no adj) | 腳 (Leg) |
| 10 | LOVING VIBES | 12.1% | 36.9% | 0 | 0 | 12.1% | 36.9% | 2.7 | A Atzeni | Front | vet: respiratory, best when not restrained (no adj); gate 1 | 腳 (Leg) |
| 12 | TACTICAL COMMAND | 7.9% | 27.0% | 0 | 0 | 7.9% | 27.0% | 20 | A Badel | Closer | "disappointed"; shifted out at start | 腳 (Leg) |
| 8 | I AM BACK | 5.2% | 19.7% | excuses +2 | excuses +2 | 7.2% | 21.7% | 23 | C Y Ho | Back | +excuses (steadied 1100m) | 腳 (Leg) |
| 7 | NEW POWER | 2.6% | 12.9% | excuses +2 | excuses +2 | 4.6% | 14.9% | 12 | M L Yeung | Midfield | +excuses (saddle slipped) | — |
| 1 | GLORIOUS DYNASTY | 2.4% | 11.3% | excuses +2 | excuses +2 | 4.4% | 13.3% | 14 | L Hewitson | Midfield | +excuses (badly hampered) | — |
| 9 | LIGHTNESS OF BEING | 1.1% | 6.2% | excuses +2 | excuses +2 | 3.1% | 8.2% | 19 | Y L Chung (-2) | — | +excuses (bumped, wide); "continued struggles" | — |
| 3 | VIGOR HAPPINESS | 2.3% | 10.5% | 0 | 0 | 2.3% | 10.5% | 29 | E C W Wong (-3) | — | "struggled" | — |
| 11 | SMILING CHAMPION | 0.9% | 5.5% | -notRO −2 | -notRO −2 | 0.0% | 3.5% | 39 | K Teetan | — | -notRO (could not be fully ridden) | — |

**Factor columns:** These list the SCMP reasons with their ±% adjustments. Adj% = MC% + factors, floored at 0. No values are re-normalised. All adjustments are within the ±8% Win / ±10% Place caps.

Note: ★ 膽 = Banker. #4 is 1st by Adj Win% and has 10 career runs, so it is banker-eligible. 雙膽拖 does not apply because the 2nd horse (#2) has Adj Place% 47.3%, below the 63% threshold.

Reasoning: MC clearly prefers #4 WINNING MONEY (27.9% Win, 59.6% Place). It has three straight Valley 1200m placings and then a pace-stalking win from gate 12, so the wide draw does not deter it, and it is projected fastest on time. #2 LUCKY MCQUEEN won its last start and was steadied in running. #2 and #4 are also the top MC quinella (9.4%, fair 10.6). The market has #10 LOVING VIBES as a short favourite. MC rates it lower, but gate 1 and front-running instructions at HV 1200m (front-runner bias) keep it firmly in the pool. #5 WORLD HERO (on-speed back-to-back Valley 1200m wins) and #6 HAYDAY (good trial, consistent minor placings) both sit at about 35% Adj Place%. #12 TACTICAL COMMAND (27.0%) is a must-include at ≥25%. #8 I AM BACK reaches 21.7% Adj Place% after the excuse adjustment, which triggers Rule 8 (≥20% must be in pool). #7 NEW POWER is short at 12 but its Adj Place% is only 14.9%, so it is left out. It is not excluded for any negative flag, so Rule 9 does not apply.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #4, #2, #10, #5, #6, #12, #8
MODE: B (Standard, widened to 7) | POOL SIZE: 7

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #4 WINNING MONEY (Adj Place% 60.6%) ← locked in every combo
腳 (Legs):  #2, #10, #5, #6, #12, #8
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15

TOP TRIO COMBINATIONS (by combined Adj Place%):
The combined index is the product of the three Adj Place% values. It is a relative ranking index only, not a true joint probability.

| Rank | Horses (any order) | Combined index | Index-implied odds |
|------|-------------------|----------------|----------------|
| 1 | #4, #2, #10 | 10.6% | ~$9 |
| 2 | #4, #2, #6 | 10.1% | ~$10 |
| 3 | #4, #2, #5 | 10.1% | ~$10 |
| 4 | #4, #10, #6 | 7.9% | ~$13 |
| 5 | #4, #10, #5 | 7.8% | ~$13 |

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

TOP COMBINATIONS (highest value):
  4-2-10 (10.6), 4-2-6 (10.1), 4-2-5 (10.1), 4-10-6 (7.9), 4-10-5 (7.8),
  4-2-12 (7.7), 4-6-5 (7.5), 4-2-8 (6.2), 4-10-12 (6.0), 4-6-12 (5.8)
  The other 5 combos (4-5-12, 4-10-8, 4-6-8, 4-5-8, 4-12-8) are cheaper-probability fillers.

PASS CONDITIONS:
- If #4 WINNING MONEY (banker) is scratched → VOID the ticket. Do not restructure.
- If field drops below 3 → pool refunded.
- If the going changes to Yielding/Heavy → re-run MC. Reconsider front-runner bias (#10, #5).
- If #4 drifts heavily on late money (>20) → still play. The MC edge is the thesis, but treat it as a confidence downgrade.

CONFIDENCE: MEDIUM (clear MC banker but a competitive race at HV, with the market disagreeing on the favourite)

CAVEATS:
- Odds are a morning snapshot (11:01 HKT). SCMP's later snapshot shows #4 shortening to 9.6 and #5 drifting to 10. Re-check before the jump.
- The SCMP "Place odds" column values looked inconsistent with win odds and were ignored. Place odds used by MC were estimated from win odds.
- #6 HAYDAY and #10 LOVING VIBES both carry vet notes on breathing/respiratory issues. Neither is an injury with a pass date, so no −% adjustment was applied.
- The combined index for trio combos is a product of marginal place rates, not an MC joint trio probability.
- Strategy A pool = 7 (Rule 8 ≥20% Adj Place% inclusion), not the 6 that standard Mode B would give.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: #4 WINNING MONEY (MC Win% 27.9%, MC Place% 59.6%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #2 (44.3%), #10 (36.9%), #6 (33.2%), #5 (33.1%), #12 (27.0%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #12 TACTICAL COMMAND (MC Place% 27.0%, Win odds 20)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none (#8 19.7% @ 23, #7 12.9% @ 12, #1 11.3% @ 14). This also holds on SCMP odds.
Action: no replacement or addition
Final legs: #2, #10, #6, #5, #12
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #4 / 腳 #2, #5, #6, #10, #12 →
  4-2-10, 4-2-6, 4-2-5, 4-2-12, 4-10-6, 4-10-5, 4-10-12, 4-6-5, 4-6-12, 4-5-12

Comparison: Both strategies use the same banker (#4). Strategy A adds #8 I AM BACK as a 6th leg because the steadied-in-running excuse lifts it from 19.7% to 21.7% Place. That makes 5 extra combos (+$50). Strategy B is the cheaper pure-model ticket at $100.
═══════════════════════════════════════════════════════════
