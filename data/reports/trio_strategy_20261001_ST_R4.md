# Trio (單T) Strategy — Sha Tin 2026-10-01 Race 4

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-01 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261001_ST.json, fetched 2026-10-01T01:55:28.985Z)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R4 — Class 4 | 1400m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Dominant (top Adj Win% 40.2%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: 3
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 7 | SOLID CAR | 38.2% | 75.6% | 3.4 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 5-7: 24.7% (4.1) |
| 5 | NOBLE PATCH | 28.4% | 66.1% | 13 | ✅ | ❌ | 2 | 腳 (Leg) | 5-7: 24.7% (4.1) |
| 10 | VOYAGE BOSS | 15.8% | 51.6% | 4.5 | ✅ | ✅ | 10 | 腳 (Leg) | 7-10: 15.2% (6.6) |
| 12 | FRANCIS MEYNELL | 3.1% | 16.9% | 16 | ❌ | ❌ | 10 | — | 7-12: 3.7% (27.0) |
| 8 | SILVERY KNIGHT | 2.7% | 15.3% | 40 | ❌ | ❌ | 3 | — | 7-8: 3.2% (31.3) |
| 13 | DIAMOND SPARKLE | 2.7% | 14.9% | 28 | ❌ | ❌ | 5 | — | — |
| 6 | PRESTIGE COME | 2.5% | 14.6% | 18 | ❌ | ❌ | 2 | — | — |
| 2 | TRUE BROTHERS | 1.5% | 9.3% | 37 | ❌ | ❌ | 4 | — | — |
| 3 | CHILL PARTNERS | 1.5% | 9.1% | 20 | ❌ | ❌ | 8 | — | — |
| 4 | JOY TOGETHER | 1.1% | 8.0% | 23 | ❌ | ❌ | 1 | — | — |
| 9 | PRESIDENT PEGASUS | 1.0% | 6.5% | 26 | ❌ | ❌ | 4 | — | — |
| 11 | ALABAMA SONG | 0.9% | 6.1% | 10 | ❌ | ❌ | 10 | — | — |
| 14 | STAR SATYR | 0.4% | 3.5% | 6.4 | ❌ | ✅ | 10 | 腳 (Leg) — replacement candidate | — |
| 1 | EXCELLENCE VALUE | 0.3% | 2.4% | 26 | ❌ | ❌ | 10 | — | — |

Market: overround 23.5%. MC vs market — #5 undervalued 269%; #14 overvalued 97%; #1 overvalued 92%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|-------|------------|------|
| 1 | 7 | SOLID CAR | 38.2% | 75.6% | excuses +2 | excuses +2 | 40.2% | 77.6% | 3.4 | J Orman | 4 | 10 | — | +excuses | ★ 膽 (Banker) |
| 2 | 5 | NOBLE PATCH | 28.4% | 66.1% | 0 | 0 | 28.4% | 66.1% | 13 | K C Leung | 9 | 2 | — | — | ★ 膽 (Banker) |
| 3 | 10 | VOYAGE BOSS | 15.8% | 51.6% | 0 | 0 | 15.8% | 51.6% | 4.5 | H Y Yuen | 1 | 10 | — | — | 腳 (Leg) |
| 4 | 3 | CHILL PARTNERS | 1.5% | 9.1% | excuses +2 | excuses +2 | 3.5% | 11.1% | 20 | M L Yeung | 14 | 8 | — | +excuses | — |
| 5 | 12 | FRANCIS MEYNELL | 3.1% | 16.9% | 0 | 0 | 3.1% | 16.9% | 16 | M F Poon | 12 | 10 | — | — | 腳 (Leg) |
| 6 | 8 | SILVERY KNIGHT | 2.7% | 15.3% | 0 | 0 | 2.7% | 15.3% | 40 | L Hewitson | 2 | 3 | — | — | 腳 (Leg) |
| 7 | 13 | DIAMOND SPARKLE | 2.7% | 14.9% | 0 | 0 | 2.7% | 14.9% | 28 | M Chadwick | 6 | 5 | — | — | — |
| 8 | 6 | PRESTIGE COME | 2.5% | 14.6% | 0 | 0 | 2.5% | 14.6% | 18 | R Kingscote | 3 | 2 | — | — | — |
| 9 | 14 | STAR SATYR | 0.4% | 3.5% | excuses +2 | excuses +2 | 2.4% | 5.5% | 6.4 | Y L Chung | 13 | 10 | — | +excuses | — |
| 10 | 1 | EXCELLENCE VALUE | 0.3% | 2.4% | excuses +2 | excuses +2 | 2.3% | 4.4% | 26 | H T Mo | 5 | 10 | — | +excuses | — |
| 11 | 2 | TRUE BROTHERS | 1.5% | 9.3% | 0 | 0 | 1.5% | 9.3% | 37 | P N Wong | 7 | 4 | — | — | — |
| 12 | 4 | JOY TOGETHER | 1.1% | 8.0% | 0 | 0 | 1.1% | 8.0% | 23 | C L Chau | 11 | 1 | — | — | — |
| 13 | 9 | PRESIDENT PEGASUS | 1.0% | 6.5% | 0 | 0 | 1.0% | 6.5% | 26 | K Teetan | 10 | 4 | — | — | — |
| 14 | 11 | ALABAMA SONG | 0.9% | 6.1% | 0 | 0 | 0.9% | 6.1% | 10 | A Atzeni | 8 | 10 | — | — | — |

Factor labels: excuses +2 (crowded/steadied/wide/held up/hampered), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -perf −2, -barrier −1, -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place; 50% win / 85% place ceilings. Starts = form records in MC (proxy for race starts).

Reasoning: SCMP gave TIR only for R4: #1 EXCELLENCE VALUE crowded, #3 CHILL PARTNERS held up, #7 SOLID CAR raced very wide without cover, #14 STAR SATYR held up → excuses +2 each. No vet or trial flags extracted.

## TRIO POOL (Strategy A, any order)

```
POOL: #7, #5, #10, #12, #8
MODE: A: Tight Pool (5) | POOL SIZE: 5

膽 (Bankers): #7 SOLID CAR (Adj Place% 77.6%), #5 NOBLE PATCH (Adj Place% 66.1%)
腳 (Legs): #10, #12, #8
BET STRUCTURE: 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: 3
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #7, #5, #10 | 25.8% | $4 |
| 2 | #7, #5, #12 | 4.4% | $23 |
| 3 | #7, #5, #8 | 3.8% | $26 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 3
UNIT BET: $10 (fixed)
TOTAL STAKE: $30
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 34.1%

PASS CONDITIONS:
- If #7 SOLID CAR (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft → reconsider; MC run on Good to Firm

CONFIDENCE: HIGH

CAVEATS:
- SCMP data partial — flags applied only where comments were retrieved.
- Sparse form (<3 records, MC less reliable): #5 NOBLE PATCH (2), #6 PRESTIGE COME (2), #4 JOY TOGETHER (1)
- 雙膽拖 is high-risk (Rule 19): both #7 and #5 must place; joint ≈ 78% × 66% ≈ 51%. Single-banker alternative: 膽 #7 / 腳 #5, #10, #12, #8 = 6 combos ($60).
- SCMP R4: Star Form, vet and trackwork not returned — only TIR flags applied.
- Market 3rd/4th choices #14 STAR SATYR and #11 ALABAMA SONG rate only 3.5%/6.1% MC Place% — outside Strategy A pool; #14 enters Strategy B via the Win-odds<10 rule.
- #5 NOBLE PATCH (2nd banker) has only 2 form records — meets the ≥2-start rule but MC rating is less reliable.
- Odds from HKJC pool snapshot (fetch-odds.ts, 2026-10-01T01:55:28.985Z); odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #7 SOLID CAR (MC Win% 38.2%, MC Place% 75.6%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #5, #10
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #14 STAR SATYR (Win odds 6.4, MC Place% 3.5%)
Action: #14 STAR SATYR added directly (no replaceable leg)
Final legs: #5, #10, #14
BET STRUCTURE: 膽拖 | 1膽 + 3腳 | COMBINATIONS: C(3,2) = 3
UNIT BET: $10 (fixed)
TOTAL STAKE: $30
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 34.7%

STRATEGY B TICKET: 膽 #7 / 腳 #5, #10, #14
  Top combos: 7-5-10 (33.7%); 7-5-14 (0.7%); 7-10-14 (0.3%)

vs Strategy A: same banker (A #7 / B #7); B has 3 legs / 3 combos ($30) vs A 3 legs / 3 combos ($30).
═══════════════════════════════════════════════════════════
```
