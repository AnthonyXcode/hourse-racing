# Trio (單T) Strategy — Sha Tin 2026-10-01 Race 7

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-01 | Race 7
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261001_ST.json, fetched 2026-10-01T01:55:28.985Z)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R7 — Class 4 | 1200m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Dominant (top Adj Win% 35.9%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: 3
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 2 | LIGHT YEARS GLORY | 35.9% | 73.8% | 5.6 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 2-6: 25.7% (3.9) |
| 6 | SPIRITED STEED | 30.1% | 69.2% | 3.3 | ✅ | ✅ | 4 | 腳 (Leg) | 2-6: 25.7% (3.9) |
| 14 | LAKESHORE HERO | 12.1% | 45.0% | 15 | ✅ | ❌ | 10 | 腳 (Leg) | 2-14: 11.3% (8.8) |
| 4 | JOKER ORBIT | 10.9% | 39.4% | 15 | ✅ | ❌ | 7 | 腳 (Leg) | 2-4: 9.3% (10.7) |
| 1 | MASTER CHAMPION | 4.2% | 20.7% | 18 | ✅ | ❌ | 10 | — | — |
| 13 | VICTORY CHAMPION | 2.6% | 15.8% | 19 | ❌ | ❌ | 10 | — | — |
| 5 | RISING FROM ASHES | 1.4% | 9.1% | 27 | ❌ | ❌ | 10 | — | — |
| 7 | CAVAMAZING | 0.7% | 5.4% | 18 | ❌ | ❌ | 1 | — | — |
| 3 | EVER WEALTH | 0.5% | 5.1% | 30 | ❌ | ❌ | 3 | — | — |
| 11 | RIDING HIGH | 0.5% | 5.1% | 17 | ❌ | ❌ | 10 | — | — |
| 10 | KA YING RADIANCE | 0.5% | 4.4% | 3.9 | ❌ | ✅ | 7 | 腳 (Leg) — replacement candidate | — |
| 8 | MY WYNDFALL | 0.3% | 3.3% | 49 | ❌ | ❌ | 1 | — | — |
| 9 | HIGH RISE VICTORY | 0.2% | 2.6% | 43 | ❌ | ❌ | 3 | — | — |
| 12 | LUCKY GIBS | 0.1% | 1.1% | 47 | ❌ | ❌ | 5 | — | — |

Market: overround 22.9%. MC vs market — #2 undervalued 112%; #10 overvalued 98%; #12 overvalued 97%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|-------|------------|------|
| 1 | 2 | LIGHT YEARS GLORY | 35.9% | 73.8% | 0 | 0 | 35.9% | 73.8% | 5.6 | L Ferraris | 11 | 10 | — | — | ★ 膽 (Banker) |
| 2 | 6 | SPIRITED STEED | 30.1% | 69.2% | 0 | 0 | 30.1% | 69.2% | 3.3 | Z Purton | 6 | 4 | — | — | ★ 膽 (Banker) |
| 3 | 14 | LAKESHORE HERO | 12.1% | 45.0% | excuses +2 | excuses +2 | 14.1% | 47.0% | 15 | A Atzeni | 13 | 10 | — | +excuses | 腳 (Leg) |
| 4 | 4 | JOKER ORBIT | 10.9% | 39.4% | -notRO −2 | -notRO −2 | 8.9% | 37.4% | 15 | C L Chau | 2 | 7 | — | -notRO | 腳 (Leg) |
| 5 | 1 | MASTER CHAMPION | 4.2% | 20.7% | excuses +2 | excuses +2 | 6.2% | 22.7% | 18 | H Y Yuen | 4 | 10 | — | +excuses | 腳 (Leg) |
| 6 | 5 | RISING FROM ASHES | 1.4% | 9.1% | excuses +2 | excuses +2 | 3.4% | 11.1% | 27 | J Orman | 10 | 10 | — | +excuses | — |
| 7 | 13 | VICTORY CHAMPION | 2.6% | 15.8% | 0 | 0 | 2.6% | 15.8% | 19 | A Badel | 5 | 10 | — | — | — |
| 8 | 10 | KA YING RADIANCE | 0.5% | 4.4% | excuses +2 | excuses +2 | 2.5% | 6.4% | 3.9 | M F Poon | 1 | 7 | — | +excuses | — |
| 9 | 9 | HIGH RISE VICTORY | 0.2% | 2.6% | excuses +2 | excuses +2 | 2.2% | 4.6% | 43 | K C Leung | 12 | 3 | — | +excuses | — |
| 10 | 12 | LUCKY GIBS | 0.1% | 1.1% | excuses +2 | excuses +2 | 2.1% | 3.1% | 47 | P N Wong | 8 | 5 | — | +excuses | — |
| 11 | 7 | CAVAMAZING | 0.7% | 5.4% | 0 | 0 | 0.7% | 5.4% | 18 | M L Yeung | 3 | 1 | — | — | — |
| 12 | 3 | EVER WEALTH | 0.5% | 5.1% | 0 | 0 | 0.5% | 5.1% | 30 | C Y Ho | 14 | 3 | — | — | — |
| 13 | 11 | RIDING HIGH | 0.5% | 5.1% | 0 | 0 | 0.5% | 5.1% | 17 | L Hewitson | 9 | 10 | — | — | — |
| 14 | 8 | MY WYNDFALL | 0.3% | 3.3% | 0 | 0 | 0.3% | 3.3% | 49 | M Chadwick | 7 | 1 | — | — | — |

Factor labels: excuses +2 (crowded/steadied/wide/held up/hampered), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -perf −2, -barrier −1, -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place; 50% win / 85% place ceilings. Starts = form records in MC (proxy for race starts).

Reasoning: 1200m Class 4 (Section 2). SCMP TIR: #10 KA YING RADIANCE severely checked/steadied, #9 held up, #12/#14 wide without cover, #1/#5 bumped → excuses +2. #4 JOKER ORBIT rider could not ride it out to the finish (-notRO −2). #13 VICTORY CHAMPION is a roarer (no rule; noted).

## TRIO POOL (Strategy A, any order)

```
POOL: #2, #6, #14, #4, #1
MODE: A: Tight Pool (5) | POOL SIZE: 5

膽 (Bankers): #2 LIGHT YEARS GLORY (Adj Place% 73.8%), #6 SPIRITED STEED (Adj Place% 69.2%)
腳 (Legs): #14, #4, #1
BET STRUCTURE: 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: 3
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #2, #6, #14 | 18.5% | $5 |
| 2 | #2, #6, #4 | 11.1% | $9 |
| 3 | #2, #6, #1 | 7.5% | $13 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 3
UNIT BET: $10 (fixed)
TOTAL STAKE: $30
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 37.1%

PASS CONDITIONS:
- If #2 LIGHT YEARS GLORY (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft → reconsider; MC run on Good to Firm

CONFIDENCE: HIGH

CAVEATS:
- SCMP data partial — flags applied only where comments were retrieved.
- Sparse form (<3 records, MC less reliable): #7 CAVAMAZING (1), #8 MY WYNDFALL (1)
- Model/market divergence: MC #1 #2 LIGHT YEARS GLORY (5.6) vs market favourite #6 SPIRITED STEED (3.3, MC Win% 30.1%).
- 雙膽拖 is high-risk (Rule 19): both #2 and #6 must place; joint ≈ 74% × 69% ≈ 51%. Single-banker alternative: 膽 #2 / 腳 #6, #14, #4, #1 = 6 combos ($60).
- SCMP R7: Star Form/trackwork not returned — only TIR flags applied.
- #13 VICTORY CHAMPION flagged a roarer by vet (no skill adjustment).
- Market 2nd choice #10 KA YING RADIANCE (severely checked last start) rates only 4.4% MC Place% / 6.4% Adj — outside Strategy A pool, included in Strategy B via Win-odds<10 rule. Biggest model/market disagreement in the race.
- Odds from HKJC pool snapshot (fetch-odds.ts, 2026-10-01T01:55:28.985Z); odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #2 LIGHT YEARS GLORY (MC Win% 35.9%, MC Place% 73.8%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6, #14, #4, #1
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #1 MASTER CHAMPION (MC Place% 20.7%, Win odds 18)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #10 KA YING RADIANCE (Win odds 3.9, MC Place% 4.4%)
Action: #10 KA YING RADIANCE replaces #1 MASTER CHAMPION (MC Place% 20.7%, Win odds 18)
Final legs: #6, #14, #4, #10
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 53.1%

STRATEGY B TICKET: 膽 #2 / 腳 #6, #14, #4, #10
  Top combos: 2-6-14 (24.1%); 2-6-4 (21.4%); 2-14-4 (6.2%); 2-6-10 (0.9%); 2-14-10 (0.3%)

vs Strategy A: same banker (A #2 / B #2); B has 4 legs / 6 combos ($60) vs A 3 legs / 3 combos ($30).
═══════════════════════════════════════════════════════════
```
