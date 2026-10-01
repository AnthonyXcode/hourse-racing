# Trio (單T) Strategy — Sha Tin 2026-10-01 Race 8

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-01 | Race 8
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261001_ST.json, fetched 2026-10-01T01:55:28.985Z)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R8 — Class 4 | 1200m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Competitive (top Adj Win% 26.0%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 1 | ALMIGHTY WARRIOR | 26.0% | 59.7% | 7.8 | ✅ | ✅ | 3 | ★ 膽 (Banker) | 1-3: 12.4% (8.1) |
| 3 | OLDTOWN | 21.6% | 54.8% | 21 | ✅ | ❌ | 10 | 腳 (Leg) | 1-3: 12.4% (8.1) |
| 5 | PRIME ACE | 20.9% | 54.3% | 6 | ✅ | ✅ | 1 | 腳 (Leg) | 1-5: 12.2% (8.2) |
| 2 | HEALTHY HEALTHY | 10.0% | 34.6% | 29 | ✅ | ❌ | 10 | 腳 (Leg) | 1-2: 5.9% (16.9) |
| 4 | VIRTUS GLORY | 6.5% | 26.2% | 4.5 | ✅ | ✅ | 4 | 腳 (Leg) | — |
| 8 | BETTER AND BETTER | 5.9% | 22.3% | 10 | ✅ | ❌ | 10 | 腳 (Leg) | — |
| 6 | PRIVATE WEALTH | 5.2% | 22.6% | 9.7 | ✅ | ✅ | 2 | 腳 (Leg) | — |
| 12 | TYCOON EXPRESS | 1.0% | 5.6% | 34 | ❌ | ❌ | 4 | — | — |
| 7 | GOLDEN TRIUMPH | 0.8% | 5.1% | 51 | ❌ | ❌ | 1 | — | — |
| 14 | CASA PRIMO | 0.7% | 4.7% | 12 | ❌ | ❌ | 6 | — | — |
| 13 | MONTA FRUTTA | 0.5% | 3.6% | 13 | ❌ | ❌ | 10 | — | — |
| 10 | LUCKY BID | 0.3% | 2.7% | 59 | ❌ | ❌ | 3 | — | — |
| 11 | SPEEDY POWER | 0.3% | 2.1% | 5.6 | ❌ | ✅ | 4 | 腳 (Leg) — replacement candidate | — |
| 9 | E HO HO | 0.2% | 1.7% | 64 | ❌ | ❌ | 10 | — | — |

Market: overround 21.8%. MC vs market — #3 undervalued 354%; #2 undervalued 189%; #11 overvalued 99%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|-------|------------|------|
| 1 | 1 | ALMIGHTY WARRIOR | 26.0% | 59.7% | 0 | 0 | 26.0% | 59.7% | 7.8 | Z Purton | 11 | 3 | — | — | ★ 膽 (Banker) |
| 2 | 5 | PRIME ACE | 20.9% | 54.3% | excuses +2 | excuses +2 | 22.9% | 56.3% | 6 | K Teetan | 1 | 1 | — | +excuses | 腳 (Leg) |
| 3 | 3 | OLDTOWN | 21.6% | 54.8% | 0 | 0 | 21.6% | 54.8% | 21 | C L Chau | 6 | 10 | — | — | 腳 (Leg) |
| 4 | 2 | HEALTHY HEALTHY | 10.0% | 34.6% | 0 | 0 | 10.0% | 34.6% | 29 | H Y Yuen | 14 | 10 | — | — | 腳 (Leg) |
| 5 | 4 | VIRTUS GLORY | 6.5% | 26.2% | excuses +2 | excuses +2 | 8.5% | 28.2% | 4.5 | B Avdulla | 4 | 4 | — | +excuses | 腳 (Leg) |
| 6 | 6 | PRIVATE WEALTH | 5.2% | 22.6% | excuses +2 | excuses +2 | 7.2% | 24.6% | 9.7 | J Orman | 3 | 2 | — | +excuses | 腳 (Leg) |
| 7 | 8 | BETTER AND BETTER | 5.9% | 22.3% | 0 | 0 | 5.9% | 22.3% | 10 | A Badel | 2 | 10 | — | — | — |
| 8 | 12 | TYCOON EXPRESS | 1.0% | 5.6% | excuses +2 | excuses +2 | 3.0% | 7.6% | 34 | C Y Ho | 8 | 4 | — | +excuses | — |
| 9 | 7 | GOLDEN TRIUMPH | 0.8% | 5.1% | excuses +2 | excuses +2 | 2.8% | 7.1% | 51 | L Ferraris | 5 | 1 | — | +excuses | — |
| 10 | 13 | MONTA FRUTTA | 0.5% | 3.6% | excuses +2 | excuses +2 | 2.5% | 5.6% | 13 | Y L Chung | 7 | 10 | — | +excuses | — |
| 11 | 10 | LUCKY BID | 0.3% | 2.7% | excuses +2 | excuses +2 | 2.3% | 4.7% | 59 | M Chadwick | 9 | 3 | — | +excuses | — |
| 12 | 9 | E HO HO | 0.2% | 1.7% | excuses +2 | excuses +2 | 2.2% | 3.7% | 64 | H Bentley | 13 | 10 | — | +excuses | — |
| 13 | 14 | CASA PRIMO | 0.7% | 4.7% | 0 | 0 | 0.7% | 4.7% | 12 | R Kingscote | 10 | 6 | — | — | — |
| 14 | 11 | SPEEDY POWER | 0.3% | 2.1% | 0 | 0 | 0.3% | 2.1% | 5.6 | A Atzeni | 12 | 4 | — | — | — |

Factor labels: excuses +2 (crowded/steadied/wide/held up/hampered), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -perf −2, -barrier −1, -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place; 50% win / 85% place ceilings. Starts = form records in MC (proxy for race starts).

Reasoning: 1200m Class 4 (Section 1). SCMP TIR: #4 wide without cover, #5 crowded, #6 held up/bumped heavily, #7 steadied, #9 restricted room, #10 steadied/crowded, #12 badly crowded, #13 bumped → excuses +2. #7 GOLDEN TRIUMPH lame passed 24/08 and #12 TYCOON EXPRESS knee surgery passed 01/09 (both ≥30 days, no injury deduction).

## TRIO POOL (Strategy A, any order)

```
POOL: #1, #5, #3, #2, #4, #6
MODE: B: Standard Pool (6) | POOL SIZE: 6

膽 (Banker): #1 ALMIGHTY WARRIOR (Adj Win% 26.0%, Adj Place% 59.7%) ← locked in every combo
腳 (Legs): #5, #3, #2, #4, #6
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #1, #5, #3 | 10.5% | $10 |
| 2 | #1, #5, #2 | 4.2% | $24 |
| 3 | #1, #3, #2 | 3.9% | $25 |
| 4 | #1, #5, #4 | 3.6% | $28 |
| 5 | #1, #3, #4 | 3.3% | $30 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 34.6%

PASS CONDITIONS:
- If #1 ALMIGHTY WARRIOR (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft → reconsider; MC run on Good to Firm

CONFIDENCE: MEDIUM

CAVEATS:
- SCMP data partial — flags applied only where comments were retrieved.
- Sparse form (<3 records, MC less reliable): #5 PRIME ACE (1), #6 PRIVATE WEALTH (2), #7 GOLDEN TRIUMPH (1)
- Model/market divergence: MC #1 #1 ALMIGHTY WARRIOR (7.8) vs market favourite #4 VIRTUS GLORY (4.5, MC Win% 6.5%).
- SCMP R8: Star Form/trackwork not returned — only TIR/vet flags applied.
- #12 TYCOON EXPRESS returns from arthroscopic knee surgery (passed 01/09, exactly 30 days).
- Market 2nd choice #11 SPEEDY POWER rates only 2.1% MC Place% — outside Strategy A, added to Strategy B via Win-odds<10 rule (pushes B to 7 legs / $210). Market favourite #4 VIRTUS GLORY is only MC #5.
- Banker #1 ALMIGHTY WARRIOR has just 3 local form records; #5 PRIME ACE (1 record) and #6 PRIVATE WEALTH (2) also thin.
- Odds from HKJC pool snapshot (fetch-odds.ts, 2026-10-01T01:55:28.985Z); odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #1 ALMIGHTY WARRIOR (MC Win% 26.0%, MC Place% 59.7%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3, #5, #2, #4, #6, #8
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #11 SPEEDY POWER (Win odds 5.6, MC Place% 2.1%)
Action: #11 SPEEDY POWER added directly (no replaceable leg)
Final legs: #3, #5, #2, #4, #6, #8, #11
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 (fixed)
TOTAL STAKE: $210
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 61.1%

STRATEGY B TICKET: 膽 #1 / 腳 #3, #5, #2, #4, #6, #8, #11
  Top combos: 1-3-5 (16.9%); 1-3-2 (7.0%); 1-5-2 (6.7%); 1-3-4 (4.3%); 1-5-4 (4.2%)

vs Strategy A: same banker (A #1 / B #1); B has 7 legs / 21 combos ($210) vs A 5 legs / 10 combos ($100).
═══════════════════════════════════════════════════════════
```
