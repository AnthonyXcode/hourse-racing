# Trio (單T) Strategy — Sha Tin 2026-10-01 Race 9

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-01 | Race 9
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261001_ST.json, fetched 2026-10-01T01:55:28.985Z)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R9 — Class 2 | 1400m | Turf | Good to Firm | 12 runners
CLASSIFICATION: Competitive (top Adj Win% 24.7%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 3 | CHILL EASY | 24.7% | 56.1% | 8.1 | ✅ | ✅ | 7 | ★ 膽 (Banker) | 2-3: 9.7% (10.3) |
| 2 | HOT DELIGHT | 16.9% | 45.1% | 3.2 | ✅ | ✅ | 5 | 腳 (Leg) | 2-3: 9.7% (10.3) |
| 12 | PUBLIC ATTENTION | 14.2% | 39.0% | 9.5 | ✅ | ✅ | 9 | 腳 (Leg) | 3-12: 7.1% (14.1) |
| 9 | INFINITE RESOLVE | 10.3% | 31.8% | 9.4 | ✅ | ✅ | 10 | 腳 (Leg) | 3-9: 5.6% (18.0) |
| 4 | TOP DRAGON | 9.2% | 30.0% | 10 | ✅ | ❌ | 10 | 腳 (Leg) | 3-4: 5.2% (19.3) |
| 1 | SKY JEWELLERY | 7.1% | 25.6% | 6.7 | ✅ | ✅ | 8 | 腳 (Leg) | — |
| 5 | VICTORY SKY | 6.0% | 22.6% | 24 | ✅ | ❌ | 10 | 腳 (Leg) | — |
| 11 | DROMBEG BANNER | 5.1% | 19.9% | 15 | ❌ | ❌ | 10 | — | — |
| 10 | REGAL GEM | 3.3% | 13.7% | 18 | ❌ | ❌ | 10 | — | — |
| 8 | BRAVEFIELD | 2.2% | 9.7% | 19 | ❌ | ❌ | 0 | — | — |
| 6 | BEAUTY BOLT | 0.9% | 4.9% | 12 | ❌ | ❌ | 10 | — | — |
| 7 | EMBLAZON | 0.1% | 1.5% | 30 | ❌ | ❌ | 10 | — | — |

Market: overround 22.4%. MC vs market — #3 undervalued 112%; #7 overvalued 96%; #6 overvalued 89%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|-------|------------|------|
| 1 | 3 | CHILL EASY | 24.7% | 56.1% | 0 | 0 | 24.7% | 56.1% | 8.1 | C L Chau | 10 | 7 | — | — | ★ 膽 (Banker) |
| 2 | 2 | HOT DELIGHT | 16.9% | 45.1% | 0 | 0 | 16.9% | 45.1% | 3.2 | C Y Ho | 9 | 5 | — | — | 腳 (Leg) |
| 3 | 12 | PUBLIC ATTENTION | 14.2% | 39.0% | 0 | 0 | 14.2% | 39.0% | 9.5 | A Badel | 2 | 9 | — | — | 腳 (Leg) |
| 4 | 9 | INFINITE RESOLVE | 10.3% | 31.8% | excuses +2 | excuses +2 | 12.3% | 33.8% | 9.4 | A Atzeni | 1 | 10 | — | +excuses | 腳 (Leg) |
| 5 | 4 | TOP DRAGON | 9.2% | 30.0% | 0 | 0 | 9.2% | 30.0% | 10 | Z Purton | 5 | 10 | — | — | 腳 (Leg) |
| 6 | 1 | SKY JEWELLERY | 7.1% | 25.6% | 0 | 0 | 7.1% | 25.6% | 6.7 | J Orman | 7 | 8 | — | — | 腳 (Leg) |
| 7 | 5 | VICTORY SKY | 6.0% | 22.6% | 0 | 0 | 6.0% | 22.6% | 24 | M F Poon | 11 | 10 | — | — | — |
| 8 | 10 | REGAL GEM | 3.3% | 13.7% | excuses +2 | excuses +2 | 5.3% | 15.7% | 18 | K C Leung | 8 | 10 | — | +excuses | — |
| 9 | 11 | DROMBEG BANNER | 5.1% | 19.9% | 0 | 0 | 5.1% | 19.9% | 15 | H Y Yuen | 12 | 10 | — | — | — |
| 10 | 8 | BRAVEFIELD | 2.2% | 9.7% | 0 | 0 | 2.2% | 9.7% | 19 | L Hewitson | 3 | 0 | — | — | — |
| 11 | 7 | EMBLAZON | 0.1% | 1.5% | excuses +2 | excuses +2 | 2.1% | 3.5% | 30 | H Bentley | 4 | 10 | — | +excuses | — |
| 12 | 6 | BEAUTY BOLT | 0.9% | 4.9% | 0 | 0 | 0.9% | 4.9% | 12 | Y L Chung | 6 | 10 | — | — | — |

Factor labels: excuses +2 (crowded/steadied/wide/held up/hampered), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -perf −2, -barrier −1, -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place; 50% win / 85% place ceilings. Starts = form records in MC (proxy for race starts).

Reasoning: 1400m Class 2. SCMP TIR: #7 EMBLAZON steadied, #9 INFINITE RESOLVE bumped, #10 REGAL GEM hampered/crowded → excuses +2. #8 BRAVEFIELD gelded 25/06 (no rule).

## TRIO POOL (Strategy A, any order)

```
POOL: #3, #2, #12, #9, #4, #1
MODE: B: Standard Pool (6) | POOL SIZE: 6

膽 (Banker): #3 CHILL EASY (Adj Win% 24.7%, Adj Place% 56.1%) ← locked in every combo
腳 (Legs): #2, #12, #9, #4, #1
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #3, #2, #12 | 5.6% | $18 |
| 2 | #3, #2, #9 | 4.8% | $21 |
| 3 | #3, #12, #9 | 3.9% | $26 |
| 4 | #3, #2, #4 | 3.4% | $29 |
| 5 | #3, #12, #4 | 2.8% | $36 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 30.6%

PASS CONDITIONS:
- If #3 CHILL EASY (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft → reconsider; MC run on Good to Firm

CONFIDENCE: MEDIUM

CAVEATS:
- SCMP data partial — flags applied only where comments were retrieved.
- Sparse form (<3 records, MC less reliable): #8 BRAVEFIELD (0)
- Model/market divergence: MC #1 #3 CHILL EASY (8.1) vs market favourite #2 HOT DELIGHT (3.2, MC Win% 16.9%).
- SCMP R9: Star Form/trackwork not returned — only TIR flags applied.
- Odds from HKJC pool snapshot (fetch-odds.ts, 2026-10-01T01:55:28.985Z); odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #3 CHILL EASY (MC Win% 24.7%, MC Place% 56.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #2, #12, #9, #4, #1, #5
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #5 VICTORY SKY (MC Place% 22.6%, Win odds 24)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
Action: none
Final legs: #2, #12, #9, #4, #1, #5
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 43.8%

STRATEGY B TICKET: 膽 #3 / 腳 #2, #12, #9, #4, #1, #5
  Top combos: 3-2-12 (7.0%); 3-2-9 (4.8%); 3-2-4 (4.3%); 3-12-9 (3.9%); 3-12-4 (3.5%)

vs Strategy A: same banker (A #3 / B #3); B has 6 legs / 15 combos ($150) vs A 5 legs / 10 combos ($100).
═══════════════════════════════════════════════════════════
```
