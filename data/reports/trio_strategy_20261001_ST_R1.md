# Trio (單T) Strategy — Sha Tin 2026-10-01 Race 1

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-01 | Race 1
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork parsed (tipster picks ignored)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261001_ST.json, fetched 2026-10-01T01:55:28.985Z)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R1 — Class 5 | 1200m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Competitive (top Adj Win% 24.9%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 5 | GOOD FORTUNE | 24.9% | 56.5% | 3.5 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 5-6: 9.6% (10.4) |
| 6 | NOBLE FANS | 18.1% | 46.3% | 10 | ✅ | ❌ | 10 | 腳 (Leg) | 5-6: 9.6% (10.4) |
| 1 | SUNNY Q | 14.8% | 41.3% | 6.2 | ✅ | ✅ | 10 | 腳 (Leg) | 1-5: 8.4% (11.9) |
| 4 | POWER PATCH | 10.3% | 31.8% | 23 | ✅ | ❌ | 7 | 腳 (Leg) | 4-5: 5.6% (17.8) |
| 12 | YEE CHEONG RAIDER | 10.0% | 31.7% | 9.5 | ✅ | ✅ | 10 | 腳 (Leg) | 5-12: 5.8% (17.1) |
| 14 | EXCEED THE WISH | 4.5% | 17.6% | 45 | ❌ | ❌ | 10 | — | — |
| 9 | LEGENDARY IMPACT | 4.1% | 15.8% | 44 | ❌ | ❌ | 10 | — | — |
| 3 | FLASH STAR | 3.9% | 14.4% | 25 | ❌ | ❌ | 10 | — | — |
| 13 | WINNING DIAMOND | 3.7% | 15.0% | 43 | ❌ | ❌ | 10 | — | — |
| 10 | VIVA CHALEUR | 2.1% | 10.8% | 8 | ❌ | ✅ | 10 | 腳 (Leg) — replacement candidate | — |
| 8 | GROOVY FEELING | 1.8% | 8.2% | 24 | ❌ | ❌ | 10 | — | — |
| 7 | CIRRUS SPEED | 1.3% | 6.5% | 13 | ❌ | ❌ | 10 | — | — |
| 2 | FALCON HUNTER | 0.5% | 2.6% | 7.1 | ❌ | ✅ | 8 | 腳 (Leg) — replacement candidate | — |
| 11 | QUICK MONEY | 0.2% | 1.6% | 26 | ❌ | ❌ | 10 | — | — |

Market: overround 22.7%. MC vs market — #4 undervalued 136%; #14 undervalued 102%; #2 overvalued 97%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|-------|------------|------|
| 1 | 5 | GOOD FORTUNE | 24.9% | 56.5% | 0 | 0 | 24.9% | 56.5% | 3.5 | H Y Yuen | 5 | 10 | — | — | ★ 膽 (Banker) |
| 2 | 6 | NOBLE FANS | 18.1% | 46.3% | 0 | 0 | 18.1% | 46.3% | 10 | Z Purton | 13 | 10 | — | — | 腳 (Leg) |
| 3 | 1 | SUNNY Q | 14.8% | 41.3% | -injury30d −3, excuses +2 | -injury30d −4, excuses +2 | 13.8% | 39.3% | 6.2 | A Atzeni | 4 | 10 | — | -injury30d, +excuses | 腳 (Leg) |
| 4 | 4 | POWER PATCH | 10.3% | 31.8% | excuses +2 | excuses +2 | 12.3% | 33.8% | 23 | C Y Ho | 8 | 7 | — | +excuses | 腳 (Leg) |
| 5 | 12 | YEE CHEONG RAIDER | 10.0% | 31.7% | 0 | 0 | 10.0% | 31.7% | 9.5 | K Teetan | 7 | 10 | — | — | 腳 (Leg) |
| 6 | 14 | EXCEED THE WISH | 4.5% | 17.6% | excuses +2 | excuses +2 | 6.5% | 19.6% | 45 | L Hewitson | 10 | 10 | — | +excuses | 腳 (Leg) |
| 7 | 9 | LEGENDARY IMPACT | 4.1% | 15.8% | 0 | 0 | 4.1% | 15.8% | 44 | A Badel | 9 | 10 | — | — | — |
| 8 | 3 | FLASH STAR | 3.9% | 14.4% | 0 | 0 | 3.9% | 14.4% | 25 | C L Chau | 6 | 10 | — | — | — |
| 9 | 13 | WINNING DIAMOND | 3.7% | 15.0% | 0 | 0 | 3.7% | 15.0% | 43 | R Kingscote | 12 | 10 | — | — | — |
| 10 | 7 | CIRRUS SPEED | 1.3% | 6.5% | excuses +2 | excuses +2 | 3.3% | 8.5% | 13 | M F Poon | 3 | 10 | — | +excuses | — |
| 11 | 2 | FALCON HUNTER | 0.5% | 2.6% | excuses +2 | excuses +2 | 2.5% | 4.6% | 7.1 | J Orman | 2 | 8 | — | +excuses | — |
| 12 | 10 | VIVA CHALEUR | 2.1% | 10.8% | 0 | 0 | 2.1% | 10.8% | 8 | B Avdulla | 11 | 10 | — | — | — |
| 13 | 8 | GROOVY FEELING | 1.8% | 8.2% | 0 | 0 | 1.8% | 8.2% | 24 | P N Wong | 1 | 10 | — | — | — |
| 14 | 11 | QUICK MONEY | 0.2% | 1.6% | 0 | 0 | 0.2% | 1.6% | 26 | K C Leung | 14 | 10 | — | — | — |

Factor labels: excuses +2 (crowded/steadied/wide/held up/hampered), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -perf −2, -barrier −1, -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place; 50% win / 85% place ceilings. Starts = form records in MC (proxy for race starts).

Reasoning: #5 GOOD FORTUNE (H Y Yuen -7 claim, market fav 3.5) tops MC at 24.9% win / 56.5% place and SCMP notes improving rating trend. #6 NOBLE FANS (Purton) is MC #2 despite gate 13. #1 SUNNY Q keeps MC #3 but carries a vet flag (blood in trachea 06/09, passed 21/09) partly offset by a steadied/crowded excuse. #4 POWER PATCH (raced wide without cover) and #12 YEE CHEONG RAIDER complete the MC top five. Market #3 FALCON HUNTER rates only 0.5% MC (recently gelded).

## TRIO POOL (Strategy A, any order)

```
POOL: #5, #6, #1, #4, #12, #14
MODE: B: Standard Pool (6) | POOL SIZE: 6

膽 (Banker): #5 GOOD FORTUNE (Adj Win% 24.9%, Adj Place% 56.5%) ← locked in every combo
腳 (Legs): #6, #1, #4, #12, #14
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #5, #6, #1 | 5.7% | $17 |
| 2 | #5, #6, #4 | 5.0% | $20 |
| 3 | #5, #6, #12 | 4.0% | $25 |
| 4 | #5, #1, #4 | 3.6% | $28 |
| 5 | #5, #1, #12 | 2.9% | $35 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 30.9%

PASS CONDITIONS:
- If #5 GOOD FORTUNE (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft → reconsider; MC run on Good to Firm

CONFIDENCE: MEDIUM

CAVEATS:
- SCMP place-odds column parsed unreliably (mirrored win odds); HKJC odds used as primary.
- Odds from HKJC pool snapshot (fetch-odds.ts, 2026-10-01T01:55:28.985Z); odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #5 GOOD FORTUNE (MC Win% 24.9%, MC Place% 56.5%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6, #1, #4, #12
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #2 FALCON HUNTER (Win odds 7.1, MC Place% 2.6%), #10 VIVA CHALEUR (Win odds 8, MC Place% 10.8%)
Action: #2 FALCON HUNTER added directly (no replaceable leg); #10 VIVA CHALEUR added directly (no replaceable leg)
Final legs: #6, #1, #4, #12, #2, #10
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 32.7%

STRATEGY B TICKET: 膽 #5 / 腳 #6, #1, #4, #12, #2, #10
  Top combos: 5-6-1 (8.1%); 5-6-4 (5.3%); 5-6-12 (5.1%); 5-1-4 (4.1%); 5-1-12 (4.0%)

vs Strategy A: same banker (A #5 / B #5); B has 6 legs / 15 combos ($150) vs A 5 legs / 10 combos ($100).
═══════════════════════════════════════════════════════════
```
