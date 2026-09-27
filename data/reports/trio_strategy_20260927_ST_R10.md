# Trio (單T) Strategy — Sha Tin 2026-09-27 Race 10

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-27 | Race 10
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey stats loaded) | Going: Good to Firm | Scratchings: none in final field (Son Pak Fu, Blazing Wind reserves)
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork/Odds parsed (tipster picks ignored)
ODDS SOURCE: HKJC early pool (tools/fetch-odds.ts, captured 09:03 HKT 27-Sep)
             SCMP odds: ✅ loaded (cross-reference) | HKJC live: ✅ loaded

RACE: R10 — Class 2 | 1200m | Turf | Good to Firm | 12 runners
CLASSIFICATION: Dominant (top Adj Win% 39.9%) | POOL SIZE: 6
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 3 | RISING FORCE | 38.9% | 72.3% | 3.2 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 3-4: 10.9% (9.2) |
| 4 | SKY TRUST | 12.5% | 38.4% | 15 | ✅ | ❌ | 10 | 腳 (Leg) | 3-4: 10.9% (9.2) |
| 10 | GENEVA | 11.4% | 38.2% | 7 | ✅ | ✅ | 10 | 腳 (Leg) | 3-10: 10.9% (9.2) |
| 1 | STORM RIDER | 10.0% | 33.6% | 30 | ✅ | ❌ | 10 | 腳 (Leg) | 1-3: 9.3% (10.8) |
| 7 | VICTOR THE WINNER | 7.7% | 28.0% | 17 | ✅ | ❌ | 10 | — (replaced out) | — |
| 9 | TURQUOISE VELOCITY | 7.3% | 28.5% | 8.8 | ✅ | ✅ | 10 | 腳 (Leg) | — |
| 6 | YOUNG CHAMPION | 3.7% | 17.2% | 11 | ❌ | ❌ | 10 | — | — |
| 2 | MUGEN | 3.4% | 15.7% | 16 | ❌ | ❌ | 10 | — | — |
| 5 | AERIS NOVA | 3.1% | 15.1% | 14 | ❌ | ❌ | 10 | — | — |
| 8 | SALON S | 1.1% | 7.7% | 5.8 | ❌ | ✅ | 5 | 腳 (Leg) — replacement candidate | — |
| 11 | PAKISTAN LEGACY | 0.7% | 4.3% | 16 | ❌ | ❌ | 10 | — | — |
| 12 | GLOWING PRAISES | 0.1% | 0.9% | 21 | ❌ | ❌ | 8 | — | — |

Market: overround 22.7%. MC vs market — #1 undervalued 201%; #12 overvalued 97%, #8 overvalued 94%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|------------|------|
| 1 | 3 | RISING FORCE | 38.9% | 72.3% | +form +1 | +form +1 | 39.9% | 73.3% | 3.2 | Z Purton | 7 | 10 | +form | ★ 膽 (Banker) |
| 2 | 4 | SKY TRUST | 12.5% | 38.4% | trial +2 | trial +2 | 14.5% | 40.4% | 15 | E C W Wong | 4 | 10 | +trial | 腳 (Leg) |
| 3 | 1 | STORM RIDER | 10.0% | 33.6% | excuses +2 | excuses +2 | 12.0% | 35.6% | 30 | B Avdulla | 2 | 10 | +excuses | 腳 (Leg) |
| 4 | 10 | GENEVA | 11.4% | 38.2% | 0 | 0 | 11.4% | 38.2% | 7 | A Atzeni | 5 | 10 | — | 腳 (Leg) |
| 5 | 9 | TURQUOISE VELOCITY | 7.3% | 28.5% | trial +2 | trial +2 | 9.3% | 30.5% | 8.8 | K Teetan | 1 | 10 | +trial | 腳 (Leg) |
| 6 | 7 | VICTOR THE WINNER | 7.7% | 28.0% | -age −2, +form +1 | -age −2, +form +1 | 6.7% | 27.0% | 17 | H Y Yuen | 9 | 10 | -age, +form | 腳 (Leg) |
| 7 | 6 | YOUNG CHAMPION | 3.7% | 17.2% | trial +2, -notRO −2 | trial +2, -notRO −2 | 3.7% | 17.2% | 11 | M L Yeung | 8 | 10 | +trial, -notRO | — |
| 8 | 5 | AERIS NOVA | 3.1% | 15.1% | 0 | 0 | 3.1% | 15.1% | 14 | K C Leung | 12 | 10 | — | — |
| 9 | 12 | GLOWING PRAISES | 0.1% | 0.9% | excuses +2 | excuses +2 | 2.1% | 2.9% | 21 | P N Wong | 3 | 8 | +excuses | — |
| 10 | 11 | PAKISTAN LEGACY | 0.7% | 4.3% | +form +1 | +form +1 | 1.7% | 5.3% | 16 | M Chadwick | 10 | 10 | +form | — |
| 11 | 2 | MUGEN | 3.4% | 15.7% | -age −2 | -age −2 | 1.4% | 13.7% | 16 | J Orman | 6 | 10 | -age | — |
| 12 | 8 | SALON S | 1.1% | 7.7% | 0 | 0 | 1.1% | 7.7% | 5.8 | M F Poon | 11 | 5 | — | — |

Factor labels: excuses +2 (bad luck last run: crowded/steadied/wide/held up/hampered/bumped), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place.

Reasoning: #3 RISING FORCE (3.3 fav, last-start winner, improving) is MC #1 at 38.9% — Dominant, model agrees with market. Chasing pack tightly bunched (#4 SKY TRUST trial win, #10 GENEVA, #1 STORM RIDER, #9 TURQUOISE VELOCITY, #7 VICTOR THE WINNER). #8 SALON S (4 straight wins, 5.3) is only 7.7% MC Place% — model thinks the class rise/gate 11 bites.

## TRIO POOL (Strategy A, any order)

```
POOL: #3, #4, #1, #10, #9, #7
MODE: A: Tight Pool (5) | POOL SIZE: 6 (expanded: Adj Place% ≥ 25% must-include)

膽 (Banker): #3 RISING FORCE (Adj Win% 39.9%, Adj Place% 73.3%) ← locked in every combo
腳 (Legs): #4, #1, #10, #9, #7
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #3, #4, #1 | 7.9% | $126 |
| 2 | #3, #4, #10 | 7.5% | $134 |
| 3 | #3, #1, #10 | 6.0% | $167 |
| 4 | #3, #4, #9 | 5.9% | $168 |
| 5 | #3, #1, #9 | 4.8% | $210 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 49.7%

PASS CONDITIONS:
- If #3 RISING FORCE (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft (turf) or Wet (AWT) → reconsider; MC run on Good to Firm

CONFIDENCE: HIGH

CAVEATS:
- #8 SALON S (5.3, 4-race win streak) excluded from Strategy A by MC; only 5 form records at this level.
- SCMP flags extracted via automated page summary; odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #3 RISING FORCE (MC Win% 38.9%, MC Place% 72.3%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #4, #10, #1, #7, #9
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #7 VICTOR THE WINNER (MC Place% 28.0%, Win odds 17)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #8 SALON S (Win odds 5.8, MC Place% 7.7%)
Action: #8 SALON S replaced #7 VICTOR THE WINNER
Final legs: #4, #10, #1, #8, #9
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 36.0%

STRATEGY B TICKET: 膽 #3 / 腳 #4, #10, #1, #8, #9
  Top combos: 3-4-10 (7.9%); 3-4-1 (6.8%); 3-10-1 (6.1%); 3-4-9 (4.8%); 3-10-9 (4.3%)

vs Strategy A: same banker (A #3 / B #3); B has 5 legs / 10 combos ($100) vs A 5 legs / 10 combos ($100).
═══════════════════════════════════════════════════════════
```
