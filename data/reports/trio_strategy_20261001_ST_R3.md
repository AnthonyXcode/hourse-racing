# Trio (單T) Strategy — Sha Tin 2026-10-01 Race 3

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-01 | Race 3
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (8 starters ≥ 3, odds for 8/8, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork parsed (tipster picks ignored)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261001_ST.json, fetched 2026-10-01T01:55:28.985Z)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R3 — Group 3 | 1000m | Turf | Good to Firm | 8 runners
CLASSIFICATION: Dominant (top Adj Win% 42.2%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: 3
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 4 | COLOURFUL KING | 42.2% | 81.4% | 2.9 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 4-6: 27.7% (3.6) |
| 6 | BOTTOMUPTOGETHER | 25.9% | 70.9% | 11 | ✅ | ❌ | 10 | 腳 (Leg) | 4-6: 27.7% (3.6) |
| 2 | CRIMSON FLASH | 15.0% | 55.1% | 3.9 | ✅ | ✅ | 10 | 腳 (Leg) | 2-4: 17.5% (5.7) |
| 1 | RAGING BLIZZARD | 8.6% | 39.1% | 5.6 | ✅ | ✅ | 10 | 腳 (Leg) | 1-4: 10.0% (10.0) |
| 5 | TOMODACHI KOKOROE | 3.9% | 22.9% | 23 | ✅ | ❌ | 10 | 腳 (Leg) | — |
| 7 | MAGIC CONTROL | 3.4% | 21.6% | 6.1 | ✅ | ✅ | 10 | 腳 (Leg) | — |
| 3 | BEAUTY WAVES | 1.0% | 7.8% | 11 | ❌ | ❌ | 10 | — | — |
| 8 | JOHANNES BRAHMS | 0.0% | 1.2% | 18 | ❌ | ❌ | 10 | — | — |

Market: overround 23.3%. MC vs market — #6 undervalued 185%; #8 overvalued 99%; #3 overvalued 89%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|-------|------------|------|
| 1 | 4 | COLOURFUL KING | 42.2% | 81.4% | 0 | 0 | 42.2% | 81.4% | 2.9 | Z Purton | 7 | 10 | — | — | ★ 膽 (Banker) |
| 2 | 6 | BOTTOMUPTOGETHER | 25.9% | 70.9% | 0 | 0 | 25.9% | 70.9% | 11 | A Badel | 1 | 10 | — | — | ★ 膽 (Banker) |
| 3 | 2 | CRIMSON FLASH | 15.0% | 55.1% | +form +1 | +form +1 | 16.0% | 56.1% | 3.9 | A Atzeni | 8 | 10 | — | +form | 腳 (Leg) |
| 4 | 1 | RAGING BLIZZARD | 8.6% | 39.1% | excuses +2 | excuses +2 | 10.6% | 41.1% | 5.6 | B Avdulla | 5 | 10 | — | +excuses | 腳 (Leg) |
| 5 | 7 | MAGIC CONTROL | 3.4% | 21.6% | 0 | 0 | 3.4% | 21.6% | 6.1 | M Chadwick | 3 | 10 | — | — | 腳 (Leg) |
| 6 | 5 | TOMODACHI KOKOROE | 3.9% | 22.9% | -age −2 | -age −2 | 1.9% | 20.9% | 23 | H Bentley | 2 | 10 | — | -age | — |
| 7 | 3 | BEAUTY WAVES | 1.0% | 7.8% | 0 | 0 | 1.0% | 7.8% | 11 | C L Chau | 6 | 10 | — | — | — |
| 8 | 8 | JOHANNES BRAHMS | 0.0% | 1.2% | 0 | 0 | 0.1% | 1.2% | 18 | M L Yeung | 4 | 10 | — | — | — |

Factor labels: excuses +2 (crowded/steadied/wide/held up/hampered), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -perf −2, -barrier −1, -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place; 50% win / 85% place ceilings. Starts = form records in MC (proxy for race starts).

Reasoning: Group 3 National Day Cup, 1000m straight, 8 runners. SCMP: #1 RAGING BLIZZARD held up and denied clear running last start (excuses +2); #2 CRIMSON FLASH in winning form (+form); #5 TOMODACHI KOKOROE is 8yo in a Group race (-age −2). #8 JOHANNES BRAHMS bled (06/04) but passed 31/08 (>30 days, no adjustment).

## TRIO POOL (Strategy A, any order)

```
POOL: #4, #6, #2, #1, #7
MODE: A: Tight Pool (5) | POOL SIZE: 5

膽 (Bankers): #4 COLOURFUL KING (Adj Place% 81.4%), #6 BOTTOMUPTOGETHER (Adj Place% 70.9%)
腳 (Legs): #2, #1, #7
BET STRUCTURE: 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: 3
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #4, #6, #2 | 34.8% | $3 |
| 2 | #4, #6, #1 | 21.5% | $5 |
| 3 | #4, #6, #7 | 6.4% | $16 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 3
UNIT BET: $10 (fixed)
TOTAL STAKE: $30
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 62.6%

PASS CONDITIONS:
- If #4 COLOURFUL KING (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft → reconsider; MC run on Good to Firm

CONFIDENCE: HIGH

CAVEATS:
- 雙膽拖 is high-risk (Rule 19): both #4 and #6 must place; joint ≈ 81% × 71% ≈ 58%. Single-banker alternative: 膽 #4 / 腳 #6, #2, #1, #7 = 6 combos ($60).
- SCMP R3 page summary was thin (no Star Form detail); only TIR/vet/age flags applied.
- Odds from HKJC pool snapshot (fetch-odds.ts, 2026-10-01T01:55:28.985Z); odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #4 COLOURFUL KING (MC Win% 42.2%, MC Place% 81.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6, #2, #1, #5, #7
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #5 TOMODACHI KOKOROE (MC Place% 22.9%, Win odds 23)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
Action: none
Final legs: #6, #2, #1, #5, #7
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 85.6%

STRATEGY B TICKET: 膽 #4 / 腳 #6, #2, #1, #5, #7
  Top combos: 4-6-2 (33.9%); 4-6-1 (17.9%); 4-2-1 (8.4%); 4-6-5 (7.7%); 4-6-7 (6.7%)

vs Strategy A: same banker (A #4 / B #4); B has 5 legs / 10 combos ($100) vs A 3 legs / 3 combos ($30).
═══════════════════════════════════════════════════════════
```
