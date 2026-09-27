# Trio (單T) Strategy — Sha Tin 2026-09-27 Race 11

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-27 | Race 11
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork/Odds parsed (tipster picks ignored)
ODDS SOURCE: HKJC early pool (tools/fetch-odds.ts, captured 09:03 HKT 27-Sep)
             SCMP odds: ✅ loaded (cross-reference) | HKJC live: ✅ loaded

RACE: R11 — Class 3 | 1400m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Dominant (top Adj Win% 50.0%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: 3
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 6 | CIRCUIT CHAMPION | 47.3% | 83.6% | 3.3 | ✅ | ✅ | 6 | ★ 膽 (Banker) | 3-6: 31.3% (3.2) |
| 3 | AEROINVINCIBLE | 26.0% | 69.8% | 5.9 | ✅ | ✅ | 10 | 腳 (Leg) | 3-6: 31.3% (3.2) |
| 1 | LUCKY SAM GOR | 12.0% | 50.0% | 16 | ✅ | ❌ | 10 | 腳 (Leg) | 1-6: 16.5% (6.1) |
| 2 | THE RED HARE | 5.5% | 29.4% | 9.4 | ✅ | ✅ | 10 | 腳 (Leg) | 2-6: 7.8% (12.9) |
| 10 | FORZA TORO | 5.1% | 29.1% | 9.3 | ✅ | ✅ | 10 | 腳 (Leg) | — |
| 5 | THUNDER BLAZE | 1.0% | 7.8% | 24 | ❌ | ❌ | 3 | — | — |
| 8 | ENDEARED | 1.0% | 9.7% | 13 | ❌ | ❌ | 10 | — | — |
| 12 | THE BOOM BOX | 0.7% | 7.3% | 22 | ❌ | ❌ | 10 | — | — |
| 9 | NORTHERN FIRE BALL | 0.5% | 5.2% | 35 | ❌ | ❌ | 10 | — | — |
| 7 | COMPLETE UNKNOWN | 0.3% | 4.0% | 12 | ❌ | ❌ | 6 | — | — |
| 4 | BEAUTY CRESCENT | 0.2% | 1.8% | 12 | ❌ | ❌ | 10 | — | — |
| 13 | VULCANUS | 0.1% | 0.9% | 34 | ❌ | ❌ | 10 | — | — |
| 14 | DRAGON JOY | 0.1% | 0.7% | 17 | ❌ | ❌ | 10 | — | — |
| 11 | PRIME SUCCESS | 0.1% | 0.7% | 33 | ❌ | ❌ | 1 | — | — |

Market: overround 22.5%. MC vs market — #1 undervalued 104%; #14 overvalued 99%, #11 overvalued 98%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|------------|------|
| 1 | 6 | CIRCUIT CHAMPION | 47.3% | 83.6% | trial +2, +draw +1 | trial +2, +draw +1 | 50.0% | 85.0% | 3.3 | Z Purton | 3 | 6 | +trial, +draw | ★ 膽 (Banker) |
| 2 | 3 | AEROINVINCIBLE | 26.0% | 69.8% | +draw +1, +form +1 | +draw +1, +form +1 | 28.0% | 71.8% | 5.9 | H Y Yuen | 7 | 10 | +draw, +form | ★ 膽 (2nd Banker) |
| 3 | 1 | LUCKY SAM GOR | 12.0% | 50.0% | excuses +2 | excuses +2 | 14.0% | 52.0% | 16 | C L Chau | 9 | 10 | +excuses | 腳 (Leg) |
| 4 | 2 | THE RED HARE | 5.5% | 29.4% | excuses +2 | excuses +2 | 7.5% | 31.4% | 9.4 | M F Poon | 1 | 10 | +excuses | 腳 (Leg) |
| 5 | 10 | FORZA TORO | 5.1% | 29.1% | 0 | 0 | 5.1% | 29.1% | 9.3 | L Ferraris | 12 | 10 | — | 腳 (Leg) |
| 6 | 13 | VULCANUS | 0.1% | 0.9% | excuses +2 | excuses +2 | 2.1% | 2.9% | 34 | H T Mo | 6 | 10 | +excuses | — |
| 7 | 5 | THUNDER BLAZE | 1.0% | 7.8% | 0 | 0 | 1.0% | 7.8% | 24 | J Orman | 11 | 3 | — | — |
| 8 | 8 | ENDEARED | 1.0% | 9.7% | 0 | 0 | 1.0% | 9.7% | 13 | A Atzeni | 8 | 10 | — | — |
| 9 | 12 | THE BOOM BOX | 0.7% | 7.3% | 0 | 0 | 0.7% | 7.3% | 22 | C Y Ho | 10 | 10 | — | — |
| 10 | 9 | NORTHERN FIRE BALL | 0.5% | 5.2% | 0 | 0 | 0.5% | 5.2% | 35 | E C W Wong | 2 | 10 | — | — |
| 11 | 7 | COMPLETE UNKNOWN | 0.3% | 4.0% | 0 | 0 | 0.3% | 4.0% | 12 | K Teetan | 14 | 6 | — | — |
| 12 | 4 | BEAUTY CRESCENT | 0.2% | 1.8% | 0 | 0 | 0.2% | 1.8% | 12 | Y L Chung | 13 | 10 | — | — |
| 13 | 14 | DRAGON JOY | 0.1% | 0.7% | 0 | 0 | 0.1% | 0.7% | 17 | M Chadwick | 5 | 10 | — | — |
| 14 | 11 | PRIME SUCCESS | 0.1% | 0.7% | 0 | 0 | 0.1% | 0.7% | 33 | R Kingscote | 4 | 1 | — | — |

Factor labels: excuses +2 (bad luck last run: crowded/steadied/wide/held up/hampered/bumped), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place.

Reasoning: #6 CIRCUIT CHAMPION (3.2 fav, worked strongly, gate 3) is MC #1 at 47.3% — Dominant. #3 AEROINVINCIBLE (good draw, improving) at 26.0%/69.8% qualifies as 2nd banker (Adj Place% ≥ 63%). #1 LUCKY SAM GOR (steadied last run) is the clear 3rd; #2 THE RED HARE (gate 1) and #10 FORZA TORO fill the pool.

## TRIO POOL (Strategy A, any order)

```
POOL: #6, #3, #1, #2, #10
MODE: A: Tight Pool (5) | POOL SIZE: 5

膽 (Banker): #6 CIRCUIT CHAMPION (Adj Win% 50.0%, Adj Place% 85.0%) ← locked in every combo
膽 (2nd Banker): #3 AEROINVINCIBLE (Adj Place% 71.8% ≥ 63%)
腳 (Legs): #1, #2, #10
BET STRUCTURE: 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: 3
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #6, #3, #1 | 31.6% | $32 |
| 2 | #6, #3, #2 | 15.8% | $63 |
| 3 | #6, #3, #10 | 10.5% | $95 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 3
UNIT BET: $10 (fixed)
TOTAL STAKE: $30
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 57.8%

PASS CONDITIONS:
- If #6 CIRCUIT CHAMPION (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft (turf) or Wet (AWT) → reconsider; MC run on Good to Firm

CONFIDENCE: HIGH

CAVEATS:
- Sparse form (<3 records, MC less reliable): #11 PRIME SUCCESS (1)
- 雙膽拖 relies on both #6 and #3 placing — single-banker alternative: #6 / #3,#1,#2,#10 (6 combos, $60).
- SCMP flags extracted via automated page summary; odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #6 CIRCUIT CHAMPION (MC Win% 47.3%, MC Place% 83.6%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3, #1, #2, #10
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
Action: none
Final legs: #3, #1, #2, #10
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 75.6%

STRATEGY B TICKET: 膽 #6 / 腳 #3, #1, #2, #10
  Top combos: 6-3-1 (35.1%); 6-3-2 (14.9%); 6-3-10 (13.8%); 6-1-2 (5.1%); 6-1-10 (4.7%)

vs Strategy A: same banker (A #6 / B #6); B has 4 legs / 6 combos ($60) vs A 4 legs / 3 combos ($30).
═══════════════════════════════════════════════════════════
```
