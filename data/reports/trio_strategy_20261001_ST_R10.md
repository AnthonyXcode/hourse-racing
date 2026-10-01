# Trio (單T) Strategy — Sha Tin 2026-10-01 Race 10

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-01 | Race 10
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork parsed (tipster picks ignored)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261001_ST.json, fetched 2026-10-01T01:55:28.985Z)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R10 — Class 3 | 1400m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Dominant (top Adj Win% 39.9%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 3 | AEROVOLANIC | 39.9% | 76.4% | 6 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 3-9: 19.1% (5.2) |
| 9 | PAPAYA BROSE | 20.2% | 57.7% | 12 | ✅ | ❌ | 4 | 腳 (Leg) | 3-9: 19.1% (5.2) |
| 7 | SUPERB SPIRIT | 16.5% | 52.2% | 6.2 | ✅ | ✅ | 4 | 腳 (Leg) | 3-7: 15.9% (6.3) |
| 14 | MASTER LUCKY | 9.6% | 37.6% | 5.1 | ✅ | ✅ | 10 | 腳 (Leg) | 3-14: 10.3% (9.7) |
| 1 | CHILL BUDDY | 7.4% | 32.9% | 7.8 | ✅ | ✅ | 10 | 腳 (Leg) | 1-3: 8.0% (12.5) |
| 4 | FLYING FORTRESS | 3.1% | 17.6% | 8.1 | ❌ | ✅ | 10 | 腳 (Leg) — replacement candidate | — |
| 8 | MONEY GAMES | 1.1% | 8.1% | 6.4 | ❌ | ✅ | 1 | 腳 (Leg) — replacement candidate | — |
| 2 | JOYFIELD | 1.1% | 7.8% | 23 | ❌ | ❌ | 0 | — | — |
| 13 | KING OF FIGHTERS | 0.4% | 3.0% | 30 | ❌ | ❌ | 10 | — | — |
| 5 | SONIC LINER | 0.2% | 2.2% | 54 | ❌ | ❌ | 1 | — | — |
| 12 | NATURAL NUMBERS | 0.2% | 2.1% | 39 | ❌ | ❌ | 8 | — | — |
| 10 | SAMARKAND | 0.1% | 1.7% | 43 | ❌ | ❌ | 10 | — | — |
| 11 | LEATHER HERO | 0.0% | 0.4% | 28 | ❌ | ❌ | 0 | — | — |
| 6 | FORTUNE BOY | 0.0% | 0.2% | 43 | ❌ | ❌ | 10 | — | — |

Market: overround 22.1%. MC vs market — #3 undervalued 143%; #9 undervalued 143%; #11 overvalued 99%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|-------|------------|------|
| 1 | 3 | AEROVOLANIC | 39.9% | 76.4% | 0 | 0 | 39.9% | 76.4% | 6 | H Y Yuen | 1 | 10 | — | — | ★ 膽 (Banker) |
| 2 | 9 | PAPAYA BROSE | 20.2% | 57.7% | 0 | 0 | 20.2% | 57.7% | 12 | C Y Ho | 3 | 4 | — | — | 腳 (Leg) |
| 3 | 7 | SUPERB SPIRIT | 16.5% | 52.2% | 0 | 0 | 16.5% | 52.2% | 6.2 | Z Purton | 4 | 4 | — | — | 腳 (Leg) |
| 4 | 14 | MASTER LUCKY | 9.6% | 37.6% | 0 | 0 | 9.6% | 37.6% | 5.1 | A Atzeni | 5 | 10 | — | — | 腳 (Leg) |
| 5 | 1 | CHILL BUDDY | 7.4% | 32.9% | 0 | 0 | 7.4% | 32.9% | 7.8 | C L Chau | 8 | 10 | — | — | 腳 (Leg) |
| 6 | 4 | FLYING FORTRESS | 3.1% | 17.6% | 0 | 0 | 3.1% | 17.6% | 8.1 | H Bentley | 7 | 10 | — | — | — |
| 7 | 13 | KING OF FIGHTERS | 0.4% | 3.0% | excuses +2 | excuses +2 | 2.4% | 5.0% | 30 | K Teetan | 13 | 10 | — | +excuses | — |
| 8 | 5 | SONIC LINER | 0.2% | 2.2% | excuses +2 | excuses +2 | 2.2% | 4.2% | 54 | P N Wong | 6 | 1 | — | +excuses | — |
| 9 | 6 | FORTUNE BOY | 0.0% | 0.2% | excuses +2 | excuses +2 | 2.0% | 2.2% | 43 | B Avdulla | 12 | 10 | — | +excuses | — |
| 10 | 8 | MONEY GAMES | 1.1% | 8.1% | 0 | 0 | 1.1% | 8.1% | 6.4 | J Orman | 9 | 1 | — | — | — |
| 11 | 2 | JOYFIELD | 1.1% | 7.8% | 0 | 0 | 1.1% | 7.8% | 23 | K C Leung | 2 | 0 | — | — | — |
| 12 | 12 | NATURAL NUMBERS | 0.2% | 2.1% | excuses +2, -injury30d −3 | excuses +2, -injury30d −4 | 0.1% | 0.5% | 39 | M Chadwick | 10 | 8 | — | +excuses, -injury30d | — |
| 13 | 10 | SAMARKAND | 0.1% | 1.7% | -perf −2, -age −2 | -perf −2, -age −2 | 0.1% | 0.5% | 43 | L Hewitson | 14 | 10 | — | -perf, -age | — |
| 14 | 11 | LEATHER HERO | 0.0% | 0.4% | 0 | 0 | 0.1% | 0.5% | 28 | M F Poon | 11 | 0 | — | — | — |

Factor labels: excuses +2 (crowded/steadied/wide/held up/hampered), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -perf −2, -barrier −1, -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place; 50% win / 85% place ceilings. Starts = form records in MC (proxy for race starts).

Reasoning: 1400m Class 3. SCMP: #10 SAMARKAND's last run was unacceptable (tailed out) and it is 8yo in C3 (-perf −2, -age −2). #12 NATURAL NUMBERS bled after a trial and passed 04/09 (<30 days, -injury30d) though bumped last start. Excuses: #5, #6, #13 bumped. #9 PAPAYA BROSE fever passed 24/08 (>30 days).

## TRIO POOL (Strategy A, any order)

```
POOL: #3, #9, #7, #14, #1
MODE: A: Tight Pool (5) | POOL SIZE: 5

膽 (Banker): #3 AEROVOLANIC (Adj Win% 39.9%, Adj Place% 76.4%) ← locked in every combo
腳 (Legs): #9, #7, #14, #1
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #3, #9, #7 | 18.3% | $5 |
| 2 | #3, #9, #14 | 9.7% | $10 |
| 3 | #3, #7, #14 | 7.5% | $13 |
| 4 | #3, #9, #1 | 7.3% | $14 |
| 5 | #3, #7, #1 | 5.7% | $18 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 51.5%

PASS CONDITIONS:
- If #3 AEROVOLANIC (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft → reconsider; MC run on Good to Firm

CONFIDENCE: HIGH

CAVEATS:
- Sparse form (<3 records, MC less reliable): #8 MONEY GAMES (1), #2 JOYFIELD (0), #5 SONIC LINER (1), #11 LEATHER HERO (0)
- Model/market divergence: MC #1 #3 AEROVOLANIC (6) vs market favourite #14 MASTER LUCKY (5.1, MC Win% 9.6%).
- Odds from HKJC pool snapshot (fetch-odds.ts, 2026-10-01T01:55:28.985Z); odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #3 AEROVOLANIC (MC Win% 39.9%, MC Place% 76.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #9, #7, #14, #1
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #8 MONEY GAMES (Win odds 6.4, MC Place% 8.1%), #4 FLYING FORTRESS (Win odds 8.1, MC Place% 17.6%)
Action: #8 MONEY GAMES added directly (no replaceable leg); #4 FLYING FORTRESS added directly (no replaceable leg)
Final legs: #9, #7, #14, #1, #8, #4
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 79.0%

STRATEGY B TICKET: 膽 #3 / 腳 #9, #7, #14, #1, #8, #4
  Top combos: 3-9-7 (23.7%); 3-9-14 (12.6%); 3-7-14 (9.6%); 3-9-1 (9.4%); 3-7-1 (7.2%)

vs Strategy A: same banker (A #3 / B #3); B has 6 legs / 15 combos ($150) vs A 4 legs / 6 combos ($60).
═══════════════════════════════════════════════════════════
```
