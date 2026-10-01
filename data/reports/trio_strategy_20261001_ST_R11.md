# Trio (單T) Strategy — Sha Tin 2026-10-01 Race 11

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-01 | Race 11
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork parsed (tipster picks ignored)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261001_ST.json, fetched 2026-10-01T01:55:28.985Z)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R11 — Class 3 | 1200m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Competitive (top Adj Win% 26.3%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 6 | ABSOLUTE HEART | 25.3% | 59.0% | 6.5 | ✅ | ✅ | 3 | ★ 膽 (Banker) | 4-6: 9.6% (10.4) |
| 4 | SUPER STRONG KID | 17.4% | 46.3% | 8.9 | ✅ | ✅ | 9 | 腳 (Leg) | 4-6: 9.6% (10.4) |
| 8 | SPICY STANDARD | 16.8% | 46.2% | 9.6 | ✅ | ✅ | 10 | 腳 (Leg) | 6-8: 9.4% (10.6) |
| 9 | THE HEIR | 14.1% | 42.3% | 15 | ✅ | ❌ | 10 | 腳 (Leg) | 6-9: 8.7% (11.5) |
| 10 | LUCRATIVE EIGHT | 9.4% | 31.2% | 11 | ✅ | ❌ | 5 | 腳 (Leg) | — |
| 2 | PERFECT GENERAL | 6.4% | 24.3% | 30 | ✅ | ❌ | 10 | — | — |
| 11 | MAJESTIC VALOUR | 4.1% | 17.0% | 11 | ❌ | ❌ | 7 | — | — |
| 5 | RED SEA | 3.1% | 12.9% | 23 | ❌ | ❌ | 4 | — | — |
| 3 | EFFORTLESS WIN | 1.8% | 9.0% | 8.9 | ❌ | ✅ | 3 | 腳 (Leg) — replacement candidate | — |
| 1 | PI LEGEND | 0.6% | 3.8% | 5.4 | ❌ | ✅ | 10 | 腳 (Leg) — replacement candidate | — |
| 13 | THOUSAND SPIRIT | 0.5% | 4.0% | 14 | ❌ | ❌ | 10 | — | — |
| 12 | MR DESIRA | 0.4% | 2.3% | 36 | ❌ | ❌ | 10 | — | — |
| 7 | GLORYSPEED | 0.1% | 1.0% | 9.8 | ❌ | ✅ | 0 | 腳 (Leg) — replacement candidate | — |
| 14 | MOUNT EVEREST | 0.1% | 0.8% | 25 | ❌ | ❌ | 9 | — | — |

Market: overround 22.8%. MC vs market — #9 undervalued 111%; #7 overvalued 99%; #2 undervalued 98%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|-------|------------|------|
| 1 | 6 | ABSOLUTE HEART | 25.3% | 59.0% | +form +1 | +form +1 | 26.3% | 60.0% | 6.5 | K C Leung | 1 | 3 | Front | +form | ★ 膽 (Banker) |
| 2 | 4 | SUPER STRONG KID | 17.4% | 46.3% | 0 | 0 | 17.4% | 46.3% | 8.9 | L Ferraris | 4 | 9 | — | — | 腳 (Leg) |
| 3 | 8 | SPICY STANDARD | 16.8% | 46.2% | 0 | 0 | 16.8% | 46.2% | 9.6 | B Avdulla | 5 | 10 | — | — | 腳 (Leg) |
| 4 | 9 | THE HEIR | 14.1% | 42.3% | +form +1 | +form +1 | 15.1% | 43.3% | 15 | H Bentley | 3 | 10 | — | +form | 腳 (Leg) |
| 5 | 10 | LUCRATIVE EIGHT | 9.4% | 31.2% | excuses +2, +form +1 | excuses +2, +form +1 | 12.4% | 34.2% | 11 | M F Poon | 2 | 5 | Close | +excuses, +form | 腳 (Leg) |
| 6 | 2 | PERFECT GENERAL | 6.4% | 24.3% | +form +1 | +form +1 | 7.4% | 25.3% | 30 | C Y Ho | 12 | 10 | Front | +form | 腳 (Leg) |
| 7 | 11 | MAJESTIC VALOUR | 4.1% | 17.0% | 0 | 0 | 4.1% | 17.0% | 11 | Z Purton | 9 | 7 | Front | — | — |
| 8 | 1 | PI LEGEND | 0.6% | 3.8% | trial +2 | trial +2 | 2.6% | 5.8% | 5.4 | K Teetan | 11 | 10 | Close | +trial | — |
| 9 | 5 | RED SEA | 3.1% | 12.9% | -injury30d −3, excuses +2 | -injury30d −4, excuses +2 | 2.1% | 10.9% | 23 | A Atzeni | 7 | 4 | — | -injury30d, +excuses | — |
| 10 | 7 | GLORYSPEED | 0.1% | 1.0% | trial +2 | trial +2 | 2.1% | 3.0% | 9.8 | Y L Chung | 10 | 0 | Stalk | +trial | — |
| 11 | 3 | EFFORTLESS WIN | 1.8% | 9.0% | 0 | 0 | 1.8% | 9.0% | 8.9 | C L Chau | 14 | 3 | — | — | — |
| 12 | 13 | THOUSAND SPIRIT | 0.5% | 4.0% | 0 | 0 | 0.5% | 4.0% | 14 | L Hewitson | 13 | 10 | — | — | — |
| 13 | 12 | MR DESIRA | 0.4% | 2.3% | 0 | 0 | 0.4% | 2.3% | 36 | A Badel | 8 | 10 | Front | — | — |
| 14 | 14 | MOUNT EVEREST | 0.1% | 0.8% | 0 | 0 | 0.1% | 0.8% | 25 | M L Yeung | 6 | 9 | — | — | — |

Factor labels: excuses +2 (crowded/steadied/wide/held up/hampered), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -perf −2, -barrier −1, -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place; 50% win / 85% place ceilings. Starts = form records in MC (proxy for race starts).

Reasoning: 1200m Class 3. SCMP: #1 PI LEGEND rocketed home to win a dirt trial and #7 GLORYSPEED won both trials (trial +2). #2 PERFECT GENERAL and #6 ABSOLUTE HEART made all (+form). #10 LUCRATIVE EIGHT won after being held up (excuses, +form); #9 THE HEIR rallied third (+form). #5 RED SEA had throat surgery, passed 08/09 (<30 days, -injury30d). Several pace horses (#2, #6, #11, #12) suggest a genuine tempo.

## TRIO POOL (Strategy A, any order)

```
POOL: #6, #4, #8, #9, #10, #2
MODE: B: Standard Pool (6) | POOL SIZE: 6

膽 (Banker): #6 ABSOLUTE HEART (Adj Win% 26.3%, Adj Place% 60.0%) ← locked in every combo
腳 (Legs): #4, #8, #9, #10, #2
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #6, #4, #8 | 7.0% | $14 |
| 2 | #6, #4, #9 | 6.1% | $16 |
| 3 | #6, #8, #9 | 5.9% | $17 |
| 4 | #6, #4, #10 | 4.9% | $21 |
| 5 | #6, #8, #10 | 4.7% | $21 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 42.2%

PASS CONDITIONS:
- If #6 ABSOLUTE HEART (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft → reconsider; MC run on Good to Firm

CONFIDENCE: MEDIUM

CAVEATS:
- Sparse form (<3 records, MC less reliable): #7 GLORYSPEED (0)
- Model/market divergence: MC #1 #6 ABSOLUTE HEART (6.5) vs market favourite #1 PI LEGEND (5.4, MC Win% 0.6%).
- #14 MOUNT EVEREST classified a bleeder (no adjustment rule).
- Market favourite #1 PI LEGEND (impressive dirt trial) rates only 3.8% MC Place% (5.8% Adj); #7 GLORYSPEED has 0 local form (Australian import). Both outside Strategy A; in Strategy B via Win-odds<10 rule.
- Banker #6 ABSOLUTE HEART has only 3 local starts.
- Odds from HKJC pool snapshot (fetch-odds.ts, 2026-10-01T01:55:28.985Z); odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #6 ABSOLUTE HEART (MC Win% 25.3%, MC Place% 59.0%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #4, #8, #9, #10, #2
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #2 PERFECT GENERAL (MC Place% 24.3%, Win odds 30)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #1 PI LEGEND (Win odds 5.4, MC Place% 3.8%), #3 EFFORTLESS WIN (Win odds 8.9, MC Place% 9.0%), #7 GLORYSPEED (Win odds 9.8, MC Place% 1.0%)
Action: #1 PI LEGEND replaces #2 PERFECT GENERAL (MC Place% 24.3%, Win odds 30); #3 EFFORTLESS WIN added directly (no replaceable leg); #7 GLORYSPEED added directly (no replaceable leg)
Final legs: #4, #8, #9, #10, #1, #3, #7
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 (fixed)
TOTAL STAKE: $210
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 40.3%

STRATEGY B TICKET: 膽 #6 / 腳 #4, #8, #9, #10, #1, #3, #7
  Top combos: 6-4-8 (9.2%); 6-4-9 (7.4%); 6-8-9 (7.1%); 6-4-10 (4.7%); 6-8-10 (4.5%)

vs Strategy A: same banker (A #6 / B #6); B has 7 legs / 21 combos ($210) vs A 5 legs / 10 combos ($100).
═══════════════════════════════════════════════════════════
```
