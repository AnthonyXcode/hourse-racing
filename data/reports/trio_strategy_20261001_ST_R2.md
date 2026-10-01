# Trio (單T) Strategy — Sha Tin 2026-10-01 Race 2

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-01 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork parsed (tipster picks ignored)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261001_ST.json, fetched 2026-10-01T01:55:28.985Z)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R2 — Class 5 | 1600m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Competitive (top Adj Win% 30.8%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 雙膽拖 | 2膽 + 4腳 | COMBINATIONS: 4
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 11 | SETANTA | 29.8% | 66.0% | 21 | ✅ | ❌ | 10 | ★ 膽 (Banker) | 6-11: 16.8% (5.9) |
| 6 | GENERAL SMART | 24.5% | 61.3% | 4.7 | ✅ | ✅ | 10 | 腳 (Leg) | 6-11: 16.8% (5.9) |
| 1 | AMAZING DUCK | 17.1% | 50.0% | 3.1 | ✅ | ✅ | 10 | 腳 (Leg) | 1-11: 12.4% (8.1) |
| 10 | FORTUNE KINGO | 11.9% | 39.7% | 10 | ✅ | ❌ | 10 | 腳 (Leg) | 10-11: 8.2% (12.1) |
| 9 | ALL ARE MINE | 6.6% | 26.4% | 8 | ✅ | ✅ | 10 | 腳 (Leg) | — |
| 13 | HAPPY BUDDIES | 4.1% | 19.3% | 37 | ❌ | ❌ | 10 | — | — |
| 7 | I EXCELLE | 1.5% | 8.8% | 13 | ❌ | ❌ | 9 | — | — |
| 5 | THE CONCENTRATION | 1.4% | 7.9% | 31 | ❌ | ❌ | 10 | — | — |
| 2 | CIRCUIT MARSHAL | 1.0% | 6.6% | 16 | ❌ | ❌ | 9 | — | — |
| 4 | SUPER SICARIO | 0.8% | 4.7% | 39 | ❌ | ❌ | 10 | — | — |
| 8 | MULTISUPERSTAR | 0.5% | 4.0% | 7.6 | ❌ | ✅ | 10 | 腳 (Leg) — replacement candidate | — |
| 14 | MANYTHANKS FOREVER | 0.5% | 3.8% | 51 | ❌ | ❌ | 10 | — | — |
| 12 | SPECIAL HEDGE | 0.2% | 1.4% | 52 | ❌ | ❌ | 10 | — | — |
| 3 | PEARL OF PANG'S | 0.0% | 0.2% | 34 | ❌ | ❌ | 10 | — | — |

Market: overround 23.4%. MC vs market — #11 undervalued 526%; #3 overvalued 100%; #8 overvalued 96%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|-------|------------|------|
| 1 | 11 | SETANTA | 29.8% | 66.0% | +form +1 | +form +1 | 30.8% | 67.0% | 21 | K C Leung | 13 | 10 | Close | +form | ★ 膽 (Banker) |
| 2 | 6 | GENERAL SMART | 24.5% | 61.3% | trial +2, +form +1 | trial +2, +form +1 | 27.5% | 64.3% | 4.7 | A Atzeni | 5 | 10 | Stalk | +trial, +form | ★ 膽 (Banker) |
| 3 | 1 | AMAZING DUCK | 17.1% | 50.0% | +draw +1 | +draw +1 | 18.1% | 51.0% | 3.1 | Z Purton | 6 | 10 | Front | +draw | 腳 (Leg) |
| 4 | 10 | FORTUNE KINGO | 11.9% | 39.7% | +form +1 | +form +1 | 12.9% | 40.7% | 10 | C L Chau | 12 | 10 | Close | +form | 腳 (Leg) |
| 5 | 9 | ALL ARE MINE | 6.6% | 26.4% | +draw +1 | +draw +1 | 7.6% | 27.4% | 8 | A Badel | 1 | 10 | Stalk | +draw | 腳 (Leg) |
| 6 | 13 | HAPPY BUDDIES | 4.1% | 19.3% | trial +2 | trial +2 | 6.1% | 21.3% | 37 | L Hewitson | 3 | 10 | Front | +trial | 腳 (Leg) |
| 7 | 7 | I EXCELLE | 1.5% | 8.8% | excuses +2 | excuses +2 | 3.5% | 10.8% | 13 | C Y Ho | 14 | 9 | — | +excuses | — |
| 8 | 5 | THE CONCENTRATION | 1.4% | 7.9% | excuses +2 | excuses +2 | 3.4% | 9.9% | 31 | H Y Yuen | 4 | 10 | — | +excuses | — |
| 9 | 4 | SUPER SICARIO | 0.8% | 4.7% | excuses +2 | excuses +2 | 2.8% | 6.7% | 39 | J Orman | 9 | 10 | — | +excuses | — |
| 10 | 8 | MULTISUPERSTAR | 0.5% | 4.0% | excuses +2 | excuses +2 | 2.5% | 6.0% | 7.6 | K Teetan | 8 | 10 | — | +excuses | — |
| 11 | 12 | SPECIAL HEDGE | 0.2% | 1.4% | excuses +2 | excuses +2 | 2.2% | 3.4% | 52 | H T Mo | 10 | 10 | — | +excuses | — |
| 12 | 2 | CIRCUIT MARSHAL | 1.0% | 6.6% | +form +1 | +form +1 | 2.0% | 7.6% | 16 | M Chadwick | 7 | 9 | Close | +form | — |
| 13 | 14 | MANYTHANKS FOREVER | 0.5% | 3.8% | 0 | 0 | 0.5% | 3.8% | 51 | M L Yeung | 11 | 10 | — | — | — |
| 14 | 3 | PEARL OF PANG'S | 0.0% | 0.2% | 0 | 0 | 0.1% | 0.5% | 34 | L Ferraris | 2 | 10 | — | — | — |

Factor labels: excuses +2 (crowded/steadied/wide/held up/hampered), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -perf −2, -barrier −1, -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place; 50% win / 85% place ceilings. Starts = form records in MC (proxy for race starts).

Reasoning: SCMP: #6 GENERAL SMART resumed a winner as favourite and ran on in a dirt trial (trial +2, +form +1); #1 AMAZING DUCK (placed in 8 of 10, front-runner) and #9 ALL ARE MINE get better draws. Excuses: #4/#12 raced wide without cover, #5 eased when crowded, #7/#8 steadied (their 'could not be ridden out' notes followed traffic, so treated as excuses rather than -notRO). #12 SPECIAL HEDGE is a confirmed roarer (no table adjustment; noted).

## TRIO POOL (Strategy A, any order)

```
POOL: #11, #6, #1, #10, #9, #13
MODE: B: Standard Pool (6) | POOL SIZE: 6

膽 (Bankers): #11 SETANTA (Adj Place% 67.0%), #6 GENERAL SMART (Adj Place% 64.3%)
腳 (Legs): #1, #10, #9, #13
BET STRUCTURE: 雙膽拖 | 2膽 + 4腳 | COMBINATIONS: 4
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #11, #6, #1 | 11.9% | $8 |
| 2 | #11, #6, #10 | 8.0% | $12 |
| 3 | #11, #6, #9 | 4.5% | $22 |
| 4 | #11, #6, #13 | 3.5% | $28 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 4
UNIT BET: $10 (fixed)
TOTAL STAKE: $40
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 27.9%

PASS CONDITIONS:
- If #11 SETANTA (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft → reconsider; MC run on Good to Firm

CONFIDENCE: MEDIUM

CAVEATS:
- Model/market divergence: MC #1 #11 SETANTA (21) vs market favourite #1 AMAZING DUCK (3.1, MC Win% 17.1%).
- 雙膽拖 is high-risk (Rule 19): both #11 and #6 must place; joint ≈ 67% × 64% ≈ 43%. Single-banker alternative: 膽 #11 / 腳 #6, #1, #10, #9, #13 = 10 combos ($100).
- #7 I EXCELLE and #8 MULTISUPERSTAR 'could not be ridden out' came from traffic (held up/steadied) — treated as excuses, not -notRO.
- #12 SPECIAL HEDGE flagged a roarer by vet (no skill adjustment exists; treat as risk).
- Odds from HKJC pool snapshot (fetch-odds.ts, 2026-10-01T01:55:28.985Z); odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #11 SETANTA (MC Win% 29.8%, MC Place% 66.0%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6, #1, #10, #9
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #8 MULTISUPERSTAR (Win odds 7.6, MC Place% 4.0%)
Action: #8 MULTISUPERSTAR added directly (no replaceable leg)
Final legs: #6, #1, #10, #9, #8
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 53.3%

STRATEGY B TICKET: 膽 #11 / 腳 #6, #1, #10, #9, #8
  Top combos: 11-6-1 (19.1%); 11-6-10 (12.4%); 11-1-10 (7.7%); 11-6-9 (6.5%); 11-1-9 (4.0%)

vs Strategy A: same banker (A #11 / B #11); B has 5 legs / 10 combos ($100) vs A 4 legs / 4 combos ($40).
═══════════════════════════════════════════════════════════
```
