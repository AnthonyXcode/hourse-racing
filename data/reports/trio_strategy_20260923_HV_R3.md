# Trio (單T) Strategy — Happy Valley | 2026-09-23 | Race 3

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-23 | Race 3
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --use-saved, --hide-actual)
SCMP DATA: ❌ Skipped (post-meeting blind run) — Strategy A = raw MC
ODDS SOURCE: HKJC pool, last snapshot at/before post time (momentum collector DB export,
             data/odds/odds_20260923_HV.json, fetchedAt 2026-09-23T15:05Z)
             SCMP odds: ❌ skipped | HKJC live: ❌ not fetched (blind run, saved snapshot used)

RACE: R3 — WONG CHUK HANG HANDICAP | Class 4 | 1650m | Turf | Good | 12 runners
CLASSIFICATION: Competitive (top Adj Win% 24.9%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Step 1–2: Data & Validation

```
Meeting: Happy Valley 2026-09-23 | Going: Good | Surface: Turf
Target Race(s): R3 (Class 4 | 1650m | 12 runners)
Scratchings: none
Odds coverage: 12/12 horses with Win odds (Place odds also in snapshot)
SCMP data: ❌ unavailable (skipped — post-meeting blind run)
Historical data: not re-synced (per instruction; already in place). All 12 runners have 7–10 form lines.
```

- ✅ ≥3 starters (12) | ✅ odds populated | ✅ jockey/trainer stats loaded by MC
- ⚠️ SCMP skipped → no 3c adjustments.
- ⚠️ Analyzer MC's market column used the saved race-card odds (#5 4.3, #8 4.9, #7 10, #9 10), which differ from the final pre-off snapshot (#5 2.8, #8 6.0, #7 10, #9 12). The report uses the **final snapshot** for all Win-odds flags.

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6, latest first) | Draw / Wt | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|------|-------------------|--------------------------|
| 5 | AMAZING GAZE | 24.9% | 58.3% | 2.8 | ✅ | ✅ | 1/6/6/6/8/3 | 3 / 128 | ★ 膽 (Banker) | 2-5: 14.0% (7.2) |
| 2 | SHOOTING TO TOP | 24.8% | 59.1% | 4.8 | ✅ | ✅ | 6/2/4/5/1/6 | 7 / 132 | 腳 (Leg) | 2-7: 8.2% (12.2) |
| 7 | DECISION LINK | 14.5% | 44.0% | 10.0 | ✅ | ❌ | 5/12/4/1/6/2 | 4 / 127 | 腳 (Leg) | 5-7: 8.3% (12.0) |
| 3 | RAINBOW SEVEN | 11.3% | 36.9% | 29.0 | ✅ | ❌ | 8/4/2/1/11/6 | 5 / 130 | 腳 (Leg) | 2-3: 6.5% (15.3) |
| 6 | CASA ROCHESTER | 9.5% | 33.1% | 15.0 | ✅ | ❌ | 6/4/4/6/6/5 | 10 / 128 | 腳 (Leg) | — |
| 9 | LUCKY TOGETHER | 7.4% | 26.6% | 12.0 | ✅ | ❌ | 5/12/9/4/11/9 | 1 / 124 | — (replaced by #8) | — |
| 1 | EXCEED THE LIMIT | 3.4% | 16.0% | 26.0 | ❌ | ❌ | 5/2/8/11/8/5 | 11 / 135 | — | — |
| 4 | MEGA MASTERMIND | 1.5% | 7.8% | 13.0 | ❌ | ❌ | 8/9/8/9/2/1 | 6 / 129 | — | — |
| 10 | CALIFORNIA MOXIE | 1.2% | 6.8% | 24.0 | ❌ | ❌ | 9/7/7/7/4/10 | 8 / 131 | — | — |
| 8 | AKERMANIS GOLD | 1.0% | 5.9% | 6.0 | ❌ | ✅ | 5/9/6/9/6/9 | 2 / 124 | 腳 (Leg) — replacement candidate | — |
| 12 | SURE JOYFUL | 0.4% | 3.5% | 22.0 | ❌ | ❌ | 10/3/10/3/6/9 | 12 / 118 | — | — |
| 11 | BRIGHT INHERITANCE | 0.1% | 2.0% | 52.0 | ❌ | ❌ | 10/12/8/11/6/2 | 9 / 119 | — | — |

Market: #5 is a firm 2.8 favourite and MC agrees it is a co-top pick, but MC rates #2 (4.8) level with it. #3 RAINBOW SEVEN (29.0) is MC's biggest overlay (flagged undervalued ~149%); #8 AKERMANIS GOLD (6.0, 3rd fav) is MC's biggest underlay (5.9% Place). Overround 23.3%.

Analyzer bets (for reference, not part of Trio): Place #2 @2.50 HK$500, Place #7 @3.22 HK$500.

## STRATEGY A — HORSE RANKINGS

SCMP skipped, so all factors are 0 and Adj% = MC%.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 5 | AMAZING GAZE | 24.9% | 58.3% | 0 | 0 | 24.9% | 58.3% | 2.8 | J Orman | — | — (SCMP skipped) | ★ 膽 (Banker) |
| 2 | SHOOTING TO TOP | 24.8% | 59.1% | 0 | 0 | 24.8% | 59.1% | 4.8 | Z Purton | — | — | 腳 (Leg) |
| 7 | DECISION LINK | 14.5% | 44.0% | 0 | 0 | 14.5% | 44.0% | 10.0 | E C W Wong | — | — | 腳 (Leg) |
| 3 | RAINBOW SEVEN | 11.3% | 36.9% | 0 | 0 | 11.3% | 36.9% | 29.0 | C Y Ho | — | — | 腳 (Leg) |
| 6 | CASA ROCHESTER | 9.5% | 33.1% | 0 | 0 | 9.5% | 33.1% | 15.0 | L Ferraris | — | — | 腳 (Leg) |
| 9 | LUCKY TOGETHER | 7.4% | 26.6% | 0 | 0 | 7.4% | 26.6% | 12.0 | K C Leung | — | — | 腳 (Leg) |
| 1 | EXCEED THE LIMIT | 3.4% | 16.0% | 0 | 0 | 3.4% | 16.0% | 26.0 | L Hewitson | — | — | — |
| 4 | MEGA MASTERMIND | 1.5% | 7.8% | 0 | 0 | 1.5% | 7.8% | 13.0 | B Avdulla | — | — | — |
| 10 | CALIFORNIA MOXIE | 1.2% | 6.8% | 0 | 0 | 1.2% | 6.8% | 24.0 | A Atzeni | — | — | — |
| 8 | AKERMANIS GOLD | 1.0% | 5.9% | 0 | 0 | 1.0% | 5.9% | 6.0 | C L Chau | — | — | — |
| 12 | SURE JOYFUL | 0.4% | 3.5% | 0 | 0 | 0.4% | 3.5% | 22.0 | K Teetan | — | — | — |
| 11 | BRIGHT INHERITANCE | 0.1% | 2.0% | 0 | 0 | 0.1% | 2.0% | 52.0 | H Bentley | — | — | — |

Style column is blank because running-style reads come from SCMP Star Form, which was skipped.

Reasoning: The top horse is 24.9%, so this is a **Competitive** race and uses Mode B (6-horse pool). The top 3 by Adj Win% are #5, #2 and #7. The next 3 by Adj Place% are #3, #6 and #9. Those 6 are also exactly the horses with Adj Place% ≥ 25%, and no other runner reaches the 20% must-include level (#1 is next at 16.0%). #5 and #2 are virtually tied (24.9% vs 24.8%). #5 is banker as the 1st-ranked horse, has ≥2 starts and is also the market favourite. #2's Adj Place% of 59.1% is below the 63% needed for 雙膽拖, so the structure is single-banker 膽拖. On pace, HV 1650m tends to favour stalkers. #5 (gate 3), #7 (gate 4) and #3 (gate 5) have useful draws, while #6 has a wide draw in gate 10.

## TRIO POOL (any order) — Strategy A

```
POOL: #5, #2, #7, #3, #6, #9
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #5 AMAZING GAZE (Adj Place% 58.3%) ← locked in every combo
腳 (Legs):  #2, #7, #3, #6, #9
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS. These are trio probabilities derived from MC Win% using a Plackett-Luce ordering model, which tends to understate weaker horses' place chances:

| Rank | Horses (any order) | Est. Trio Prob | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #5, #2, #7 | 12.1% | $8 |
| 2 | #5, #2, #3 | 9.1% | $11 |
| 3 | #5, #2, #6 | 7.5% | $13 |
| 4 | #5, #2, #9 | 5.7% | $18 |
| 5 | #5, #7, #3 | 4.5% | $22 |

## TICKET SUMMARY — Strategy A

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
Est. ticket coverage (PL from MC Win%): ~52% (the 10 combos summed; the banker must place, and its MC Place% is 58.3%)

ALL COMBINATIONS:
  5-2-7, 5-2-3, 5-2-6, 5-2-9, 5-7-3, 5-7-6, 5-7-9, 5-3-6, 5-3-9, 5-6-9

PASS CONDITIONS:
- If #5 AMAZING GAZE (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft or worse → re-run MC before betting
```

CONFIDENCE: MEDIUM. #5 and #2 are a strong top two by MC, and the market agrees. But the banker is a 2.8 favourite with only 58% MC Place%, and HV Class 4 has a high upset rate.

CAVEATS:
- SCMP skipped (post-meeting blind run). No Star Form, TIR, Vet or Trackwork adjustments were made, so Strategy A is identical to raw MC and Style/SCMP Flags are empty.
- Historical data was not re-synced (per instruction). Live odds were not re-fetched; the final pre-off snapshot from the momentum collector was used.
- The analyzer's internal market comparison used the race-card odds snapshot (#5 4.3, #8 4.9), not the final pre-off odds (#5 2.8, #8 6.0). The MC Win% and Place% figures do not depend on odds.
- Banker choice is a near coin-flip between #5 (24.9%) and #2 (24.8%). Both are in every useful combo either way.
- #8 AKERMANIS GOLD is 3rd favourite at 6.0 but has only 5.9% MC Place%. It is left out of the Strategy A pool, which contains no horse below 25% Adj Place%. This is the main market-vs-model disagreement.

## STRATEGY B (MC-only)

```
Banker: #5 AMAZING GAZE (MC Win% 24.9%, MC Place% 58.3%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #2, #7, #3, #6, #9
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #9 LUCKY TOGETHER (MC Place% 26.6%, Win odds 12.0)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #8 AKERMANIS GOLD (Win odds 6.0, MC Place% 5.9%)
Action: replaced #9 with #8 (1-for-1 swap)
Final legs: #2, #7, #3, #6, #8
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #5 | 腳 #2, #7, #3, #6, #8
  5-2-7, 5-2-3, 5-2-6, 5-2-8, 5-7-3, 5-7-6, 5-7-8, 5-3-6, 5-3-8, 5-6-8
Est. ticket coverage (PL from MC Win%): ~41%
```

Comparison: Both strategies use the same banker, the same 5-leg structure and the same $100 cost. The only difference is in the legs: Strategy B swaps #9 LUCKY TOGETHER (MC 26.6% place) for the market-backed #8 AKERMANIS GOLD (6.0, MC 5.9% place). Strategy A therefore has higher model coverage (~52% vs ~41%), while Strategy B hedges the market's 3rd favourite. Note that the swap depends on the odds snapshot. On the race-card odds, #9 was 10.0 (not > 10), so #8 would have been *added* instead, giving 6 legs, 15 combos and $150.

```
═══════════════════════════════════════════════════════════
```
