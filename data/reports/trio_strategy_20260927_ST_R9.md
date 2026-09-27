# Trio (單T) Strategy — Sha Tin 2026-09-27 Race 9

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-27 | Race 9
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork/Odds parsed (tipster picks ignored)
ODDS SOURCE: HKJC early pool (tools/fetch-odds.ts, captured 09:03 HKT 27-Sep)
             SCMP odds: ✅ loaded (cross-reference) | HKJC live: ✅ loaded

RACE: R9 — Class 3 | 1600m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Dominant (top Adj Win% 37.7%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: 3
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 8 | PACKING FIGHTER | 35.7% | 73.0% | 2.4 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 1-8: 22.2% (4.5) |
| 1 | AMAZING PARTNERS | 26.2% | 64.7% | 5.1 | ✅ | ✅ | 9 | 腳 (Leg) | 1-8: 22.2% (4.5) |
| 13 | FLYING KNIGHT | 12.7% | 45.1% | 15 | ✅ | ❌ | 10 | 腳 (Leg) | 8-13: 11.3% (8.8) |
| 4 | SOLID WIN | 11.0% | 39.2% | 18 | ✅ | ❌ | 10 | 腳 (Leg) | 4-8: 9.8% (10.2) |
| 2 | MISTER DAPPER | 7.0% | 29.8% | 25 | ✅ | ❌ | 10 | 腳 (Leg) | — |
| 6 | ALL OUT FOR SIX | 2.2% | 13.0% | 28 | ❌ | ❌ | 7 | — | — |
| 7 | VIOLET STAR | 2.2% | 12.6% | 18 | ❌ | ❌ | 9 | — | — |
| 9 | BIG RETURN | 1.2% | 8.0% | 15 | ❌ | ❌ | 10 | — | — |
| 3 | FALLON | 1.0% | 7.5% | 16 | ❌ | ❌ | 10 | — | — |
| 5 | FLYING LUCK | 0.7% | 4.9% | 17 | ❌ | ❌ | 10 | — | — |
| 14 | QUANTUM LEGEND | 0.1% | 1.4% | 22 | ❌ | ❌ | 3 | — | — |
| 10 | NUCLEOZOR | 0.1% | 0.6% | 13 | ❌ | ❌ | 7 | — | — |
| 12 | VOYAGE HORIZON | 0.0% | 0.1% | 45 | ❌ | ❌ | 1 | — | — |
| 11 | SHAMUS STORM | 0.0% | 0.2% | 21 | ❌ | ❌ | 10 | — | — |

Market: overround 22.9%. MC vs market — no major undervalued; #11 overvalued 100%, #12 overvalued 100%, #10 overvalued 99%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|------------|------|
| 1 | 8 | PACKING FIGHTER | 35.7% | 73.0% | trial +2 | trial +2 | 37.7% | 75.0% | 2.4 | Z Purton | 3 | 10 | +trial | ★ 膽 (Banker) |
| 2 | 1 | AMAZING PARTNERS | 26.2% | 64.7% | trial +2 | trial +2 | 28.2% | 66.7% | 5.1 | C Y Ho | 7 | 9 | +trial | ★ 膽 (2nd Banker) |
| 3 | 13 | FLYING KNIGHT | 12.7% | 45.1% | 0 | 0 | 12.7% | 45.1% | 15 | K C Leung | 1 | 10 | — | 腳 (Leg) |
| 4 | 4 | SOLID WIN | 11.0% | 39.2% | 0 | 0 | 11.0% | 39.2% | 18 | J Orman | 9 | 10 | — | 腳 (Leg) |
| 5 | 2 | MISTER DAPPER | 7.0% | 29.8% | 0 | 0 | 7.0% | 29.8% | 25 | B Avdulla | 6 | 10 | — | 腳 (Leg) |
| 6 | 7 | VIOLET STAR | 2.2% | 12.6% | +form +1 | +form +1 | 3.2% | 13.6% | 18 | L Ferraris | 8 | 9 | +form | — |
| 7 | 6 | ALL OUT FOR SIX | 2.2% | 13.0% | 0 | 0 | 2.2% | 13.0% | 28 | M Chadwick | 12 | 7 | — | — |
| 8 | 9 | BIG RETURN | 1.2% | 8.0% | 0 | 0 | 1.2% | 8.0% | 15 | L Hewitson | 10 | 10 | — | — |
| 9 | 10 | NUCLEOZOR | 0.1% | 0.6% | +form +1 | +form +1 | 1.1% | 1.6% | 13 | K Teetan | 11 | 7 | +form | — |
| 10 | 3 | FALLON | 1.0% | 7.5% | 0 | 0 | 1.0% | 7.5% | 16 | M L Yeung | 13 | 10 | — | — |
| 11 | 5 | FLYING LUCK | 0.7% | 4.9% | 0 | 0 | 0.7% | 4.9% | 17 | E C W Wong | 5 | 10 | — | — |
| 12 | 14 | QUANTUM LEGEND | 0.1% | 1.4% | 0 | 0 | 0.1% | 1.4% | 22 | A Atzeni | 2 | 3 | — | — |
| 13 | 12 | VOYAGE HORIZON | 0.0% | 0.1% | 0 | 0 | 0.1% | 0.5% | 45 | M F Poon | 14 | 1 | — | — |
| 14 | 11 | SHAMUS STORM | 0.0% | 0.2% | 0 | 0 | 0.1% | 0.5% | 21 | H Bentley | 4 | 10 | — | — |

Factor labels: excuses +2 (bad luck last run: crowded/steadied/wide/held up/hampered/bumped), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place.

Reasoning: #8 PACKING FIGHTER (2.5 fav, 'looks top order', strong trials) is MC #1 at 35.7% (Dominant after trial +2). #1 AMAZING PARTNERS (5.0, trialled well, won at the distance) is a strong 2nd with Adj Place% ≥ 63%, triggering 雙膽拖. #13 FLYING KNIGHT (gate 1), #4 SOLID WIN and #2 MISTER DAPPER fill the frame.

## TRIO POOL (Strategy A, any order)

```
POOL: #8, #1, #13, #4, #2
MODE: A: Tight Pool (5) | POOL SIZE: 5

膽 (Banker): #8 PACKING FIGHTER (Adj Win% 37.7%, Adj Place% 75.0%) ← locked in every combo
膽 (2nd Banker): #1 AMAZING PARTNERS (Adj Place% 66.7% ≥ 63%)
腳 (Legs): #13, #4, #2
BET STRUCTURE: 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: 3
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #8, #1, #13 | 18.9% | $53 |
| 2 | #8, #1, #4 | 16.1% | $62 |
| 3 | #8, #1, #2 | 9.8% | $102 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 3
UNIT BET: $10 (fixed)
TOTAL STAKE: $30
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 44.8%

PASS CONDITIONS:
- If #8 PACKING FIGHTER (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft (turf) or Wet (AWT) → reconsider; MC run on Good to Firm

CONFIDENCE: HIGH

CAVEATS:
- Sparse form (<3 records, MC less reliable): #12 VOYAGE HORIZON (1)
- 雙膽拖 requires BOTH #8 and #1 to place — ≈ 0.75 × 0.67 joint probability; consider single-banker 膽拖 (#8 / #1,#13,#4,#2 = 6 combos, $60) if risk-averse.
- SCMP flags extracted via automated page summary; odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #8 PACKING FIGHTER (MC Win% 35.7%, MC Place% 73.0%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #1, #13, #4, #2
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #2 MISTER DAPPER (MC Place% 29.8%, Win odds 25)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
Action: none
Final legs: #1, #13, #4, #2
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 61.3%

STRATEGY B TICKET: 膽 #8 / 腳 #1, #13, #4, #2
  Top combos: 8-1-13 (20.1%); 8-1-4 (17.0%); 8-1-2 (10.3%); 8-13-4 (6.6%); 8-13-2 (4.0%)

vs Strategy A: same banker (A #8 / B #8); B has 4 legs / 6 combos ($60) vs A 4 legs / 3 combos ($30).
═══════════════════════════════════════════════════════════
```
