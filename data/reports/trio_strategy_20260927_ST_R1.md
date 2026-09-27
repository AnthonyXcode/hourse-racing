# Trio (單T) Strategy — Sha Tin 2026-09-27 Race 1

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-27 | Race 1
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey stats loaded) | Going: Good | Scratchings: none (reserves Viva Chaleur, Conrad The Great not in field)
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork/Odds parsed (tipster picks ignored)
ODDS SOURCE: HKJC early pool (tools/fetch-odds.ts, captured 09:03 HKT 27-Sep)
             SCMP odds: ✅ loaded (cross-reference) | HKJC live: ✅ loaded

RACE: R1 — Class 5 | 1200m | AWT | Good | 12 runners
CLASSIFICATION: Competitive (top Adj Win% 34.7%) | POOL SIZE: 8
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 6 | ONLY U | 30.7% | 64.3% | 2.7 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 4-6: 13.2% (7.6) |
| 4 | RISING ELITE | 18.0% | 49.4% | 21 | ✅ | ❌ | 10 | 腳 (Leg) | 4-6: 13.2% (7.6) |
| 2 | SO MY FOLKS | 10.4% | 34.7% | 7.7 | ✅ | ✅ | 10 | 腳 (Leg) | 2-6: 7.1% (14.1) |
| 3 | DAILY TROPHY | 9.2% | 30.8% | 9.1 | ✅ | ✅ | 10 | 腳 (Leg) | 3-6: 6.2% (16.2) |
| 7 | MR GOOD VIBES | 9.0% | 30.9% | 32 | ✅ | ❌ | 10 | 腳 (Leg) | — |
| 5 | HAPPY ACTION | 7.4% | 27.0% | 13 | ✅ | ❌ | 10 | 腳 (Leg) | — |
| 10 | VON BAER | 6.9% | 26.1% | 18 | ✅ | ❌ | 10 | — (replaced out) | — |
| 9 | GIMME FIVE | 6.4% | 23.4% | 6.9 | ✅ | ✅ | 10 | 腳 (Leg) | — |
| 1 | ROBOT KNIGHT | 1.4% | 8.5% | 5.5 | ❌ | ✅ | 10 | 腳 (Leg) — replacement candidate | — |
| 12 | TURF PHOENIX | 0.4% | 3.2% | 35 | ❌ | ❌ | 10 | — | — |
| 11 | HANDSOME BLOND | 0.1% | 1.0% | 44 | ❌ | ❌ | 10 | — | — |
| 8 | WAVE GARDEN | 0.1% | 0.8% | 34 | ❌ | ❌ | 10 | — | — |

Market: overround 22.7%. MC vs market — #4 undervalued 296%, #7 undervalued 189%; #8 overvalued 97%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|------------|------|
| 1 | 6 | ONLY U | 30.7% | 64.3% | excuses +2, trial +2 | excuses +2, trial +2 | 34.7% | 68.3% | 2.7 | Z Purton | 6 | 10 | +excuses, +trial | ★ 膽 (Banker) |
| 2 | 4 | RISING ELITE | 18.0% | 49.4% | excuses +2 | excuses +2 | 20.0% | 51.4% | 21 | K C Leung | 5 | 10 | +excuses | 腳 (Leg) |
| 3 | 2 | SO MY FOLKS | 10.4% | 34.7% | excuses +2 | excuses +2 | 12.4% | 36.7% | 7.7 | J Orman | 9 | 10 | +excuses | 腳 (Leg) |
| 4 | 7 | MR GOOD VIBES | 9.0% | 30.9% | excuses +2 | excuses +2 | 11.0% | 32.9% | 32 | C Y Ho | 4 | 10 | +excuses | 腳 (Leg) |
| 5 | 5 | HAPPY ACTION | 7.4% | 27.0% | excuses +2 | excuses +2 | 9.4% | 29.0% | 13 | A Atzeni | 7 | 10 | +excuses | 腳 (Leg) |
| 6 | 3 | DAILY TROPHY | 9.2% | 30.8% | 0 | 0 | 9.2% | 30.8% | 9.1 | L Ferraris | 2 | 10 | — | 腳 (Leg) |
| 7 | 9 | GIMME FIVE | 6.4% | 23.4% | excuses +2 | excuses +2 | 8.4% | 25.4% | 6.9 | H Y Yuen | 1 | 10 | +excuses | 腳 (Leg) |
| 8 | 10 | VON BAER | 6.9% | 26.1% | 0 | 0 | 6.9% | 26.1% | 18 | M F Poon | 12 | 10 | — | 腳 (Leg) |
| 9 | 1 | ROBOT KNIGHT | 1.4% | 8.5% | trial +2 | trial +2 | 3.4% | 10.5% | 5.5 | P N Wong | 3 | 10 | +trial | — |
| 10 | 8 | WAVE GARDEN | 0.1% | 0.8% | excuses +2 | excuses +2 | 2.1% | 2.8% | 34 | R Kingscote | 11 | 10 | +excuses | — |
| 11 | 12 | TURF PHOENIX | 0.4% | 3.2% | 0 | 0 | 0.4% | 3.2% | 35 | M L Yeung | 10 | 10 | — | — |
| 12 | 11 | HANDSOME BLOND | 0.1% | 1.0% | 0 | 0 | 0.1% | 1.0% | 44 | K Teetan | 8 | 10 | — | — |

Factor labels: excuses +2 (bad luck last run: crowded/steadied/wide/held up/hampered/bumped), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place.

Reasoning: #6 ONLY U is MC #1 (30.7%) and market favourite (2.7); SCMP: steadied last start + trialled well. #4 RISING ELITE is the MC value play (18.0% vs 21 odds; hampered twice last run). Deep middle tier (#2/#3/#7/#5/#10/#9 all 23–35% MC Place%) forces pool expansion to 8 under the Adj Place% ≥ 25% must-include rule. #1 ROBOT KNIGHT (5.5 second favourite, recent dirt winner) has only 8.5% MC Place% — the model disagrees with the market.

## TRIO POOL (Strategy A, any order)

```
POOL: #6, #4, #2, #7, #5, #3, #9, #10
MODE: B: Standard Pool (6) | POOL SIZE: 8 (expanded: Adj Place% ≥ 25% must-include)

膽 (Banker): #6 ONLY U (Adj Win% 34.7%, Adj Place% 68.3%) ← locked in every combo
腳 (Legs): #4, #2, #7, #5, #3, #9, #10
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #6, #4, #2 | 6.4% | $155 |
| 2 | #6, #4, #7 | 5.6% | $177 |
| 3 | #6, #4, #5 | 4.7% | $211 |
| 4 | #6, #4, #3 | 4.6% | $216 |
| 5 | #6, #4, #9 | 4.2% | $239 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 21
UNIT BET: $10 (fixed)
TOTAL STAKE: $210
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 59.7%

PASS CONDITIONS:
- If #6 ONLY U (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft (turf) or Wet (AWT) → reconsider; MC run on Good

CONFIDENCE: MEDIUM

CAVEATS:
- #1 ROBOT KNIGHT is 2nd favourite (5.5) but only 8.5% MC Place% — excluded from Strategy A, included in Strategy B via the win-odds rule.
- SCMP flags extracted via automated page summary; odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #6 ONLY U (MC Win% 30.7%, MC Place% 64.3%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #4, #2, #3, #7, #5, #10, #9
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #5 HAPPY ACTION (MC Place% 27.0%, Win odds 13), #10 VON BAER (MC Place% 26.1%, Win odds 18)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #1 ROBOT KNIGHT (Win odds 5.5, MC Place% 8.5%)
Action: #1 ROBOT KNIGHT replaced #10 VON BAER
Final legs: #4, #2, #3, #7, #5, #1, #9
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 (fixed)
TOTAL STAKE: $210
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 56.3%

STRATEGY B TICKET: 膽 #6 / 腳 #4, #2, #3, #7, #5, #1, #9
  Top combos: 6-4-2 (7.4%); 6-4-3 (6.4%); 6-4-7 (6.3%); 6-4-5 (5.0%); 6-4-9 (4.3%)

vs Strategy A: same banker (A #6 / B #6); B has 7 legs / 21 combos ($210) vs A 7 legs / 21 combos ($210).
═══════════════════════════════════════════════════════════
```
