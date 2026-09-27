# Trio (單T) Strategy — Sha Tin 2026-09-27 Race 8

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-27 | Race 8
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (9 starters ≥ 3, odds for 9/9, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork/Odds parsed (tipster picks ignored)
ODDS SOURCE: HKJC early pool (tools/fetch-odds.ts, captured 09:03 HKT 27-Sep)
             SCMP odds: ✅ loaded (cross-reference) | HKJC live: ✅ loaded

RACE: R8 — Group 3 | 1400m | Turf | Good to Firm | 9 runners
CLASSIFICATION: Competitive (top Adj Win% 34.6%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 6 | LITTLE PARADISE | 30.6% | 63.7% | 1.9 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 3-6: 10.6% (9.4) |
| 3 | INVINCIBLE IBIS | 15.3% | 44.2% | 5.4 | ✅ | ✅ | 10 | 腳 (Leg) | 3-6: 10.6% (9.4) |
| 4 | PATCH OF THETA | 13.7% | 40.2% | 24 | ✅ | ❌ | 10 | 腳 (Leg) | 4-6: 9.3% (10.8) |
| 5 | COPARTNER PRANCE | 8.7% | 30.4% | 17 | ✅ | ❌ | 10 | 腳 (Leg) | 5-6: 6.6% (15.1) |
| 8 | LUCKY WITH YOU | 8.7% | 30.2% | 18 | ✅ | ❌ | 10 | 腳 (Leg) | — |
| 1 | GALAXY PATCH | 7.0% | 26.3% | 8.6 | ✅ | ✅ | 10 | 腳 (Leg) | — |
| 9 | SOLEIL FIGHTER | 5.7% | 22.4% | 32 | ✅ | ❌ | 10 | 腳 (Leg) | — |
| 2 | HELIOS EXPRESS | 5.3% | 21.5% | 6.4 | ✅ | ✅ | 10 | 腳 (Leg) | — |
| 7 | STORMY GROVE | 5.0% | 21.1% | 21 | ✅ | ❌ | 8 | 腳 (Leg) | — |

Market: overround 21.0%. MC vs market — #4 undervalued 228%, #9 undervalued 77%; #2 overvalued 66%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|------------|------|
| 1 | 6 | LITTLE PARADISE | 30.6% | 63.7% | excuses +2, trial +2 | excuses +2, trial +2 | 34.6% | 67.7% | 1.9 | Z Purton | 5 | 10 | +excuses, +trial | ★ 膽 (Banker) |
| 2 | 3 | INVINCIBLE IBIS | 15.3% | 44.2% | excuses +2 | excuses +2 | 17.3% | 46.2% | 5.4 | L Ferraris | 1 | 10 | +excuses | 腳 (Leg) |
| 3 | 4 | PATCH OF THETA | 13.7% | 40.2% | trial +2 | trial +2 | 15.7% | 42.2% | 24 | C Y Ho | 9 | 10 | +trial | 腳 (Leg) |
| 4 | 5 | COPARTNER PRANCE | 8.7% | 30.4% | 0 | 0 | 8.7% | 30.4% | 17 | M L Yeung | 6 | 10 | — | 腳 (Leg) |
| 5 | 8 | LUCKY WITH YOU | 8.7% | 30.2% | 0 | 0 | 8.7% | 30.2% | 18 | M F Poon | 2 | 10 | — | 腳 (Leg) |
| 6 | 2 | HELIOS EXPRESS | 5.3% | 21.5% | excuses +2, +form +1 | excuses +2, +form +1 | 8.3% | 24.5% | 6.4 | A Atzeni | 4 | 10 | +excuses, +form | — |
| 7 | 1 | GALAXY PATCH | 7.0% | 26.3% | +form +1 | +form +1 | 8.0% | 27.3% | 8.6 | K Teetan | 8 | 10 | +form | 腳 (Leg) |
| 8 | 9 | SOLEIL FIGHTER | 5.7% | 22.4% | 0 | 0 | 5.7% | 22.4% | 32 | H Bentley | 7 | 10 | — | — |
| 9 | 7 | STORMY GROVE | 5.0% | 21.1% | -injury30d −3 | -injury30d −4 | 2.0% | 17.1% | 21 | C L Chau | 3 | 8 | -injury30d | — |

Factor labels: excuses +2 (bad luck last run: crowded/steadied/wide/held up/hampered/bumped), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place.

Reasoning: Group 3 Celebration Cup, 9 runners. #6 LITTLE PARADISE is MC #1 (30.6%) and 2.1 favourite (Classic Mile winner, close trial 2nd). #3 INVINCIBLE IBIS (Derby winner, gate 1) and #4 PATCH OF THETA (trialled well) next. Small field with compressed MC (every horse ≥ 21% Place%) means Strategy B takes all 8 others as legs.

## TRIO POOL (Strategy A, any order)

```
POOL: #6, #3, #4, #5, #8, #1
MODE: B: Standard Pool (6) | POOL SIZE: 6

膽 (Banker): #6 LITTLE PARADISE (Adj Win% 34.6%, Adj Place% 67.7%) ← locked in every combo
腳 (Legs): #3, #4, #5, #8, #1
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #6, #3, #4 | 9.7% | $103 |
| 2 | #6, #3, #5 | 4.9% | $202 |
| 3 | #6, #3, #8 | 4.9% | $202 |
| 4 | #6, #3, #1 | 4.5% | $222 |
| 5 | #6, #4, #5 | 4.4% | $228 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 43.2%

PASS CONDITIONS:
- If #6 LITTLE PARADISE (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft (turf) or Wet (AWT) → reconsider; MC run on Good to Firm

CONFIDENCE: MEDIUM

CAVEATS:
- #7 STORMY GROVE bled from both nostrils, vet passed 15/09 (12 days) — -injury30d applied.
- Strategy B covers the whole field (8 legs, $280) — little selectivity; Strategy A preferred here.
- SCMP flags extracted via automated page summary; odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #6 LITTLE PARADISE (MC Win% 30.6%, MC Place% 63.7%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3, #4, #5, #8, #1, #9, #2, #7
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #9 SOLEIL FIGHTER (MC Place% 22.4%, Win odds 32), #7 STORMY GROVE (MC Place% 21.1%, Win odds 21)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
Action: none
Final legs: #3, #4, #5, #8, #1, #9, #2, #7
BET STRUCTURE: 膽拖 | 1膽 + 8腳 | COMBINATIONS: C(8,2) = 28
UNIT BET: $10 (fixed)
TOTAL STAKE: $280
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 71.8%

STRATEGY B TICKET: 膽 #6 / 腳 #3, #4, #5, #8, #1, #9, #2, #7
  Top combos: 6-3-4 (8.2%); 6-3-5 (4.9%); 6-3-8 (4.9%); 6-4-5 (4.3%); 6-4-8 (4.3%)

vs Strategy A: same banker (A #6 / B #6); B has 8 legs / 28 combos ($280) vs A 5 legs / 10 combos ($100).
═══════════════════════════════════════════════════════════
```
