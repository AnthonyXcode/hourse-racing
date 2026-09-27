# Trio (單T) Strategy — Sha Tin 2026-09-27 Race 5

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-27 | Race 5
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey stats loaded) | Going: Good | Scratchings: none (reserve Ten Loves not in field)
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork/Odds parsed (tipster picks ignored)
ODDS SOURCE: HKJC early pool (tools/fetch-odds.ts, captured 09:03 HKT 27-Sep)
             SCMP odds: ✅ loaded (cross-reference) | HKJC live: ✅ loaded

RACE: R5 — Class 4 | 1200m | AWT | Good | 12 runners
CLASSIFICATION: Dominant (top Adj Win% 50.0%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 5 | ARMOUR WAR EAGLE | 51.1% | 84.0% | 6.6 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 5-10: 26.7% (3.7) |
| 10 | NOBLE DELUXE | 19.8% | 60.9% | 14 | ✅ | ❌ | 10 | 腳 (Leg) | 5-10: 26.7% (3.7) |
| 6 | BRIGHT MORTAR | 10.3% | 44.8% | 2.2 | ✅ | ✅ | 6 | 腳 (Leg) | 5-6: 15.8% (6.3) |
| 2 | CENTRAL BANK | 6.3% | 31.8% | 9.3 | ✅ | ✅ | 5 | 腳 (Leg) | 2-5: 9.6% (10.5) |
| 4 | NATURAL HIGH | 4.4% | 23.5% | 19 | ✅ | ❌ | 10 | — (replaced out) | — |
| 8 | LUCKY DOCTOR | 2.9% | 17.4% | 9.9 | ❌ | ✅ | 8 | 腳 (Leg) — replacement candidate | — |
| 7 | M M CONCORD | 1.9% | 13.8% | 16 | ❌ | ❌ | 6 | — | — |
| 11 | RAGING WARRIOR | 1.8% | 11.1% | 18 | ❌ | ❌ | 0 | — | — |
| 1 | CAUSEWAY KING | 1.0% | 7.6% | 10 | ❌ | ❌ | 4 | — | — |
| 9 | JOLTIN | 0.3% | 2.8% | 32 | ❌ | ❌ | 8 | — | — |
| 12 | DASHING PEACH | 0.2% | 1.4% | 56 | ❌ | ❌ | 4 | — | — |
| 3 | WATCH LEGEND | 0.1% | 0.9% | 67 | ❌ | ❌ | 3 | — | — |

Market: overround 21.9%. MC vs market — #5 undervalued 242%, #10 undervalued 177%; #3 overvalued 97%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|------------|------|
| 1 | 5 | ARMOUR WAR EAGLE | 51.1% | 84.0% | 0 | 0 | 50.0% | 84.0% | 6.6 | K C Leung | 4 | 10 | — | ★ 膽 (Banker) |
| 2 | 10 | NOBLE DELUXE | 19.8% | 60.9% | +form +1 | +form +1 | 20.8% | 61.9% | 14 | A Atzeni | 11 | 10 | +form | 腳 (Leg) |
| 3 | 6 | BRIGHT MORTAR | 10.3% | 44.8% | excuses +2, +form +1 | excuses +2, +form +1 | 13.3% | 47.8% | 2.2 | Y L Chung | 1 | 6 | +excuses, +form | 腳 (Leg) |
| 4 | 2 | CENTRAL BANK | 6.3% | 31.8% | trial +2 | trial +2 | 8.3% | 33.8% | 9.3 | Z Purton | 9 | 5 | +trial | 腳 (Leg) |
| 5 | 1 | CAUSEWAY KING | 1.0% | 7.6% | excuses +2, trial +2 | excuses +2, trial +2 | 5.0% | 11.6% | 10 | H Y Yuen | 10 | 4 | +excuses, +trial | — |
| 6 | 4 | NATURAL HIGH | 4.4% | 23.5% | 0 | 0 | 4.4% | 23.5% | 19 | C L Chau | 3 | 10 | — | 腳 (Leg) |
| 7 | 7 | M M CONCORD | 1.9% | 13.8% | trial +2 | trial +2 | 3.9% | 15.8% | 16 | M Chadwick | 7 | 6 | +trial | — |
| 8 | 11 | RAGING WARRIOR | 1.8% | 11.1% | trial +2 | trial +2 | 3.8% | 13.1% | 18 | J Orman | 12 | 0 | +trial | — |
| 9 | 8 | LUCKY DOCTOR | 2.9% | 17.4% | 0 | 0 | 2.9% | 17.4% | 9.9 | L Ferraris | 5 | 8 | — | — |
| 10 | 12 | DASHING PEACH | 0.2% | 1.4% | excuses +2 | excuses +2 | 2.2% | 3.4% | 56 | L Hewitson | 8 | 4 | +excuses | — |
| 11 | 9 | JOLTIN | 0.3% | 2.8% | 0 | 0 | 0.3% | 2.8% | 32 | R Kingscote | 6 | 8 | — | — |
| 12 | 3 | WATCH LEGEND | 0.1% | 0.9% | 0 | 0 | 0.1% | 0.9% | 67 | E C W Wong | 2 | 3 | — | — |

Factor labels: excuses +2 (bad luck last run: crowded/steadied/wide/held up/hampered/bumped), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place.

Reasoning: #5 ARMOUR WAR EAGLE is MC #1 at 51.1% (capped Dominant) but only 6.3 in the market — fractious at the gates and lost ground last start. #6 BRIGHT MORTAR is a 2.3 favourite (bumped at start, rallied for 2nd) with MC 10.3%/44.8%; #10 NOBLE DELUXE (made all, 3 dirt wins) 2nd in MC. Top-3 structure 5/10/6 looks solid.

## TRIO POOL (Strategy A, any order)

```
POOL: #5, #10, #6, #2, #4
MODE: A: Tight Pool (5) | POOL SIZE: 5

膽 (Banker): #5 ARMOUR WAR EAGLE (Adj Win% 50.0%, Adj Place% 84.0%) ← locked in every combo
腳 (Legs): #10, #6, #2, #4
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #5, #10, #6 | 16.0% | $63 |
| 2 | #5, #10, #2 | 9.4% | $106 |
| 3 | #5, #6, #2 | 5.4% | $184 |
| 4 | #5, #10, #4 | 4.8% | $208 |
| 5 | #5, #6, #4 | 2.8% | $362 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 40.0%

PASS CONDITIONS:
- If #5 ARMOUR WAR EAGLE (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft (turf) or Wet (AWT) → reconsider; MC run on Good

CONFIDENCE: HIGH

CAVEATS:
- Sparse form (<3 records, MC less reliable): #11 RAGING WARRIOR (0)
- Model/market divergence: MC #1 #5 ARMOUR WAR EAGLE (6.6) vs market favourite #6 BRIGHT MORTAR (2.2, MC Win% 10.3%).
- #5 banker has gate-behaviour issues (fractious last start) — a slow start would sink every combination.
- SCMP flags extracted via automated page summary; odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #5 ARMOUR WAR EAGLE (MC Win% 51.1%, MC Place% 84.0%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #10, #6, #2, #4
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #4 NATURAL HIGH (MC Place% 23.5%, Win odds 19)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #8 LUCKY DOCTOR (Win odds 9.9, MC Place% 17.4%)
Action: #8 LUCKY DOCTOR replaced #4 NATURAL HIGH
Final legs: #10, #6, #2, #8
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 53.7%

STRATEGY B TICKET: 膽 #5 / 腳 #10, #6, #2, #8
  Top combos: 5-10-6 (23.7%); 5-10-2 (13.8%); 5-10-8 (6.1%); 5-6-2 (6.0%); 5-6-8 (2.6%)

vs Strategy A: same banker (A #5 / B #5); B has 4 legs / 6 combos ($60) vs A 4 legs / 6 combos ($60).
═══════════════════════════════════════════════════════════
```
