# Trio (單T) Strategy — Sha Tin 2026-10-01 Race 6

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-01 | Race 6
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261001_ST.json, fetched 2026-10-01T01:55:28.985Z)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R6 — Class 4 | 1800m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Competitive (top Adj Win% 28.6%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 1 | VICTOR SUPREME | 28.6% | 62.7% | 4.7 | ✅ | ✅ | 9 | ★ 膽 (Banker) | 1-3: 12.7% (7.9) |
| 3 | SUPER GOLDENDRAGON | 20.0% | 52.9% | 3.4 | ✅ | ✅ | 9 | 腳 (Leg) | 1-3: 12.7% (7.9) |
| 6 | ROMANTIC FANTASY | 17.0% | 48.2% | 11 | ✅ | ❌ | 10 | 腳 (Leg) | 1-6: 10.9% (9.1) |
| 4 | ROMANTIC LAOS | 13.9% | 43.0% | 21 | ✅ | ❌ | 10 | 腳 (Leg) | 1-4: 9.1% (10.9) |
| 7 | LUCKY YEAR | 7.3% | 28.6% | 9 | ✅ | ✅ | 9 | 腳 (Leg) | — |
| 5 | FLUORESCENCE | 4.5% | 18.6% | 56 | ❌ | ❌ | 7 | — | — |
| 8 | SUPREME MASTERMIND | 4.3% | 19.1% | 6.8 | ❌ | ✅ | 10 | 腳 (Leg) — replacement candidate | — |
| 13 | STAR BROSE | 2.3% | 11.8% | 8.9 | ❌ | ✅ | 10 | 腳 (Leg) — replacement candidate | — |
| 10 | GOOD GOOD | 1.4% | 7.7% | 27 | ❌ | ❌ | 10 | — | — |
| 14 | CIRCUIT CENTURY | 0.3% | 2.7% | 20 | ❌ | ❌ | 6 | — | — |
| 9 | FAST SPEED | 0.2% | 1.8% | 39 | ❌ | ❌ | 9 | — | — |
| 11 | MASSIVE GLORY | 0.2% | 1.2% | 67 | ❌ | ❌ | 4 | — | — |
| 12 | ON THE LASH | 0.1% | 1.0% | 23 | ❌ | ❌ | 10 | — | — |
| 2 | DRAGON ON SNOW | 0.0% | 0.6% | 50 | ❌ | ❌ | 4 | — | — |

Market: overround 22.5%. MC vs market — #4 undervalued 191%; #5 undervalued 155%; #12 overvalued 99%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|-------|------------|------|
| 1 | 1 | VICTOR SUPREME | 28.6% | 62.7% | 0 | 0 | 28.6% | 62.7% | 4.7 | C Y Ho | 3 | 9 | — | — | ★ 膽 (Banker) |
| 2 | 3 | SUPER GOLDENDRAGON | 20.0% | 52.9% | excuses +2 | excuses +2 | 22.0% | 54.9% | 3.4 | K C Leung | 4 | 9 | — | +excuses | 腳 (Leg) |
| 3 | 6 | ROMANTIC FANTASY | 17.0% | 48.2% | excuses +2 | excuses +2 | 19.0% | 50.2% | 11 | Z Purton | 11 | 10 | — | +excuses | 腳 (Leg) |
| 4 | 4 | ROMANTIC LAOS | 13.9% | 43.0% | excuses +2 | excuses +2 | 15.9% | 45.0% | 21 | C L Chau | 12 | 10 | — | +excuses | 腳 (Leg) |
| 5 | 7 | LUCKY YEAR | 7.3% | 28.6% | 0 | 0 | 7.3% | 28.6% | 9 | H Bentley | 13 | 9 | — | — | 腳 (Leg) |
| 6 | 8 | SUPREME MASTERMIND | 4.3% | 19.1% | excuses +2 | excuses +2 | 6.3% | 21.1% | 6.8 | L Ferraris | 1 | 10 | — | +excuses | 腳 (Leg) |
| 7 | 5 | FLUORESCENCE | 4.5% | 18.6% | 0 | 0 | 4.5% | 18.6% | 56 | A Badel | 2 | 7 | — | — | — |
| 8 | 13 | STAR BROSE | 2.3% | 11.8% | excuses +2 | excuses +2 | 4.3% | 13.8% | 8.9 | M L Yeung | 7 | 10 | — | +excuses | — |
| 9 | 10 | GOOD GOOD | 1.4% | 7.7% | excuses +2 | excuses +2 | 3.4% | 9.7% | 27 | K Teetan | 8 | 10 | — | +excuses | — |
| 10 | 14 | CIRCUIT CENTURY | 0.3% | 2.7% | excuses +2 | excuses +2 | 2.3% | 4.7% | 20 | H T Mo | 10 | 6 | — | +excuses | — |
| 11 | 9 | FAST SPEED | 0.2% | 1.8% | excuses +2 | excuses +2 | 2.2% | 3.8% | 39 | M Chadwick | 9 | 9 | — | +excuses | — |
| 12 | 11 | MASSIVE GLORY | 0.2% | 1.2% | 0 | 0 | 0.2% | 1.2% | 67 | Y L Chung | 5 | 4 | — | — | — |
| 13 | 12 | ON THE LASH | 0.1% | 1.0% | 0 | 0 | 0.1% | 1.0% | 23 | A Atzeni | 14 | 10 | — | — | — |
| 14 | 2 | DRAGON ON SNOW | 0.0% | 0.6% | 0 | 0 | 0.1% | 0.6% | 50 | R Kingscote | 6 | 4 | — | — | — |

Factor labels: excuses +2 (crowded/steadied/wide/held up/hampered), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -perf −2, -barrier −1, -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place; 50% win / 85% place ceilings. Starts = form records in MC (proxy for race starts).

Reasoning: 1800m Class 4. SCMP TIR shows many troubled runs: #3 wide without cover, #4/#13/#6 bumped, #8 raced tight, #9 very wide, #10 steadied when crowded, #14 wide without cover → excuses +2 each. Excuses are widespread, so they largely cancel out in relative terms.

## TRIO POOL (Strategy A, any order)

```
POOL: #1, #3, #6, #4, #7, #8
MODE: B: Standard Pool (6) | POOL SIZE: 6

膽 (Banker): #1 VICTOR SUPREME (Adj Win% 28.6%, Adj Place% 62.7%) ← locked in every combo
腳 (Legs): #3, #6, #4, #7, #8
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #1, #3, #6 | 9.6% | $10 |
| 2 | #1, #3, #4 | 7.7% | $13 |
| 3 | #1, #6, #4 | 6.4% | $16 |
| 4 | #1, #3, #7 | 3.2% | $31 |
| 5 | #1, #3, #8 | 2.8% | $36 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 39.5%

PASS CONDITIONS:
- If #1 VICTOR SUPREME (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft → reconsider; MC run on Good to Firm

CONFIDENCE: MEDIUM

CAVEATS:
- SCMP data partial — flags applied only where comments were retrieved.
- Model/market divergence: MC #1 #1 VICTOR SUPREME (4.7) vs market favourite #3 SUPER GOLDENDRAGON (3.4, MC Win% 20.0%).
- SCMP R6: Star Form/trackwork not returned — only TIR flags applied.
- #10 GOOD GOOD: rider says it prefers softer ground (Good today).
- Odds from HKJC pool snapshot (fetch-odds.ts, 2026-10-01T01:55:28.985Z); odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #1 VICTOR SUPREME (MC Win% 28.6%, MC Place% 62.7%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3, #6, #4, #7
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #8 SUPREME MASTERMIND (Win odds 6.8, MC Place% 19.1%), #13 STAR BROSE (Win odds 8.9, MC Place% 11.8%)
Action: #8 SUPREME MASTERMIND added directly (no replaceable leg); #13 STAR BROSE added directly (no replaceable leg)
Final legs: #3, #6, #4, #7, #8, #13
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 57.2%

STRATEGY B TICKET: 膽 #1 / 腳 #3, #6, #4, #7, #8, #13
  Top combos: 1-3-6 (13.4%); 1-3-4 (10.5%); 1-6-4 (8.5%); 1-3-7 (5.1%); 1-6-7 (4.1%)

vs Strategy A: same banker (A #1 / B #1); B has 6 legs / 15 combos ($150) vs A 5 legs / 10 combos ($100).
═══════════════════════════════════════════════════════════
```
