# Trio (單T) Strategy — Sha Tin 2026-09-27 Race 3

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-27 | Race 3
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none (reserves Star Satyr, Sea Diamond not in field)
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork/Odds parsed (tipster picks ignored)
ODDS SOURCE: HKJC early pool (tools/fetch-odds.ts, captured 09:03 HKT 27-Sep)
             SCMP odds: ✅ loaded (cross-reference) | HKJC live: ✅ loaded

RACE: R3 — Class 5 | 1400m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Competitive (top Adj Win% 27.2%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 11 | DRACO | 27.2% | 60.3% | 4.9 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 2-11: 10.9% (9.1) |
| 2 | DOUBLE BINGO | 18.5% | 49.3% | 8.1 | ✅ | ✅ | 10 | 腳 (Leg) | 2-11: 10.9% (9.1) |
| 1 | FOREVER FANCY | 16.6% | 44.6% | 4.9 | ✅ | ✅ | 7 | 腳 (Leg) | 1-11: 10.3% (9.7) |
| 3 | FORTUNE SUPERNOVA | 9.6% | 30.5% | 13 | ✅ | ❌ | 10 | 腳 (Leg) | 3-11: 5.9% (17.0) |
| 9 | ALWAYS FLUKE | 8.8% | 29.8% | 15 | ✅ | ❌ | 10 | — (replaced out) | — |
| 14 | PRINCE ALEX | 4.9% | 19.6% | 35 | ❌ | ❌ | 10 | — | — |
| 10 | AQUAMAN | 3.9% | 16.9% | 11 | ❌ | ❌ | 10 | — | — |
| 12 | VIGOR ELLEEGANT | 3.9% | 16.0% | 25 | ❌ | ❌ | 10 | — | — |
| 7 | SWAGGER BRO | 3.5% | 15.8% | 13 | ❌ | ❌ | 10 | — | — |
| 4 | STORMY KNIGHT | 2.4% | 11.2% | 11 | ❌ | ❌ | 9 | — | — |
| 13 | BLUE BARON | 0.4% | 2.6% | 29 | ❌ | ❌ | 10 | — | — |
| 5 | LEAN MASTER | 0.2% | 1.6% | 15 | ❌ | ❌ | 10 | — | — |
| 8 | SILVER UP | 0.1% | 1.7% | 9.3 | ❌ | ✅ | 10 | 腳 (Leg) — replacement candidate | — |
| 6 | PRESTIGE SUPERIOR | 0.0% | 0.2% | 54 | ❌ | ❌ | 10 | — | — |

Market: overround 22.8%. MC vs market — no major undervalued; #6 overvalued 99%, #8 overvalued 99%, #5 overvalued 97%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|------------|------|
| 1 | 11 | DRACO | 27.2% | 60.3% | 0 | 0 | 27.2% | 60.3% | 4.9 | K C Leung | 9 | 10 | — | ★ 膽 (Banker) |
| 2 | 1 | FOREVER FANCY | 16.6% | 44.6% | excuses +2, +form +1 | excuses +2, +form +1 | 19.6% | 47.6% | 4.9 | C Y Ho | 1 | 7 | +excuses, +form | 腳 (Leg) |
| 3 | 2 | DOUBLE BINGO | 18.5% | 49.3% | 0 | 0 | 18.5% | 49.3% | 8.1 | H Y Yuen | 12 | 10 | — | 腳 (Leg) |
| 4 | 3 | FORTUNE SUPERNOVA | 9.6% | 30.5% | excuses +2 | excuses +2 | 11.6% | 32.5% | 13 | Z Purton | 6 | 10 | +excuses | 腳 (Leg) |
| 5 | 9 | ALWAYS FLUKE | 8.8% | 29.8% | excuses +2 | excuses +2 | 10.8% | 31.8% | 15 | H Bentley | 10 | 10 | +excuses | 腳 (Leg) |
| 6 | 14 | PRINCE ALEX | 4.9% | 19.6% | excuses +2 | excuses +2 | 6.9% | 21.6% | 35 | L Hewitson | 13 | 10 | +excuses | 腳 (Leg) |
| 7 | 7 | SWAGGER BRO | 3.5% | 15.8% | excuses +2, +draw +1 | excuses +2, +draw +1 | 6.5% | 18.8% | 13 | M Chadwick | 4 | 10 | +excuses, +draw | — |
| 8 | 4 | STORMY KNIGHT | 2.4% | 11.2% | excuses +2, trial +2 | excuses +2, trial +2 | 6.4% | 15.2% | 11 | L Ferraris | 7 | 9 | +excuses, +trial | — |
| 9 | 10 | AQUAMAN | 3.9% | 16.9% | excuses +2 | excuses +2 | 5.9% | 18.9% | 11 | J Orman | 11 | 10 | +excuses | — |
| 10 | 12 | VIGOR ELLEEGANT | 3.9% | 16.0% | excuses +2 | excuses +2 | 5.9% | 18.0% | 25 | C L Chau | 5 | 10 | +excuses | — |
| 11 | 13 | BLUE BARON | 0.4% | 2.6% | excuses +2 | excuses +2 | 2.4% | 4.6% | 29 | H T Mo | 14 | 10 | +excuses | — |
| 12 | 6 | PRESTIGE SUPERIOR | 0.0% | 0.2% | excuses +2 | excuses +2 | 2.0% | 2.2% | 54 | R Kingscote | 2 | 10 | +excuses | — |
| 13 | 5 | LEAN MASTER | 0.2% | 1.6% | -notRO −2 | -notRO −2 | 0.1% | 0.5% | 15 | P N Wong | 3 | 10 | -notRO | — |
| 14 | 8 | SILVER UP | 0.1% | 1.7% | 0 | 0 | 0.1% | 1.7% | 9.3 | M L Yeung | 8 | 10 | — | — |

Factor labels: excuses +2 (bad luck last run: crowded/steadied/wide/held up/hampered/bumped), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place.

Reasoning: #11 DRACO (last-start winner, 5.0) is MC #1 at 27.2%; #2 DOUBLE BINGO (won 1400m last season, gate 12) and #1 FOREVER FANCY (favourite 5.1, held up last run, improving) complete a clear top three. #4 STORMY KNIGHT gets the largest SCMP boost (hampered + Conghua trial win). #8 SILVER UP is 8.2 in the market but 1.7% MC Place%.

## TRIO POOL (Strategy A, any order)

```
POOL: #11, #1, #2, #3, #9, #14
MODE: B: Standard Pool (6) | POOL SIZE: 6

膽 (Banker): #11 DRACO (Adj Win% 27.2%, Adj Place% 60.3%) ← locked in every combo
腳 (Legs): #1, #2, #3, #9, #14
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #11, #1, #2 | 5.8% | $171 |
| 2 | #11, #1, #3 | 3.4% | $293 |
| 3 | #11, #2, #3 | 3.2% | $314 |
| 4 | #11, #1, #9 | 3.2% | $317 |
| 5 | #11, #2, #9 | 2.9% | $340 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 26.1%

PASS CONDITIONS:
- If #11 DRACO (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft (turf) or Wet (AWT) → reconsider; MC run on Good to Firm

CONFIDENCE: MEDIUM

CAVEATS:
- #14 PRINCE ALEX is 8+ years old — age penalty not applied (Class 5; rule applies to C3 and above only).
- SCMP flags extracted via automated page summary; odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #11 DRACO (MC Win% 27.2%, MC Place% 60.3%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #2, #1, #3, #9
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #9 ALWAYS FLUKE (MC Place% 29.8%, Win odds 15)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #8 SILVER UP (Win odds 9.3, MC Place% 1.7%)
Action: #8 SILVER UP replaced #9 ALWAYS FLUKE
Final legs: #2, #1, #3, #8
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 21.9%

STRATEGY B TICKET: 膽 #11 / 腳 #2, #1, #3, #8
  Top combos: 11-2-1 (10.9%); 11-2-3 (5.8%); 11-1-3 (5.0%); 11-2-8 (0.1%); 11-1-8 (0.0%)

vs Strategy A: same banker (A #11 / B #11); B has 4 legs / 6 combos ($60) vs A 5 legs / 10 combos ($100).
═══════════════════════════════════════════════════════════
```
