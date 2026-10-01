# Trio (單T) Strategy — Sha Tin 2026-10-01 Race 5

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-01 | Race 5
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, data/odds/odds_20261001_ST.json, fetched 2026-10-01T01:55:28.985Z)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R5 — Class 4 | 1000m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Competitive (top Adj Win% 28.4%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 3 | KA YING LIGHTNING | 26.4% | 59.8% | 5.9 | ✅ | ✅ | 1 | ★ 膽 (Banker) | 1-3: 13.0% (7.7) |
| 1 | JEDI SPURS | 22.9% | 55.0% | 2.3 | ✅ | ✅ | 2 | 腳 (Leg) | 1-3: 13.0% (7.7) |
| 4 | CHARMING BABE | 13.8% | 39.5% | 9.1 | ✅ | ✅ | 10 | 腳 (Leg) | 3-4: 7.7% (12.9) |
| 6 | HANDSOME HERO | 13.3% | 39.7% | 14 | ✅ | ❌ | 1 | 腳 (Leg) | 3-6: 8.1% (12.4) |
| 11 | DOUBLE ALPHA | 5.8% | 22.2% | 11 | ✅ | ❌ | 5 | 腳 (Leg) | — |
| 7 | HOWEVER | 5.6% | 21.9% | 23 | ✅ | ❌ | 0 | 腳 (Leg) | — |
| 14 | CHAMP'S DOMAIN | 3.1% | 13.8% | 21 | ❌ | ❌ | 0 | — | — |
| 5 | CELESTIAL ZOUS | 2.6% | 12.8% | 31 | ❌ | ❌ | 0 | — | — |
| 12 | PRECISION MIND | 1.8% | 9.1% | 12 | ❌ | ❌ | 5 | — | — |
| 2 | YEE CHEONG GLORY | 1.8% | 8.7% | 25 | ❌ | ❌ | 10 | — | — |
| 8 | SUPREME DATA | 1.4% | 7.6% | 30 | ❌ | ❌ | 0 | — | — |
| 13 | HEROIC VANGUARD | 0.9% | 5.2% | 47 | ❌ | ❌ | 5 | — | — |
| 9 | TALENTS CHAMPION | 0.5% | 3.6% | 42 | ❌ | ❌ | 3 | — | — |
| 10 | CLASSIC TRIPLE | 0.1% | 1.2% | 37 | ❌ | ❌ | 2 | — | — |

Market: overround 22.9%. MC vs market — #10 overvalued 95%; #6 undervalued 86%; #9 overvalued 80%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|-------|------------|------|
| 1 | 3 | KA YING LIGHTNING | 26.4% | 59.8% | excuses +2 | excuses +2 | 28.4% | 61.8% | 5.9 | A Atzeni | 4 | 1 | — | +excuses | 腳 (Leg) |
| 2 | 1 | JEDI SPURS | 22.9% | 55.0% | 0 | 0 | 22.9% | 55.0% | 2.3 | B Avdulla | 6 | 2 | — | — | ★ 膽 (Banker) |
| 3 | 4 | CHARMING BABE | 13.8% | 39.5% | 0 | 0 | 13.8% | 39.5% | 9.1 | H Y Yuen | 3 | 10 | — | — | 腳 (Leg) |
| 4 | 6 | HANDSOME HERO | 13.3% | 39.7% | 0 | 0 | 13.3% | 39.7% | 14 | C L Chau | 2 | 1 | — | — | 腳 (Leg) |
| 5 | 11 | DOUBLE ALPHA | 5.8% | 22.2% | 0 | 0 | 5.8% | 22.2% | 11 | M F Poon | 7 | 5 | — | — | 腳 (Leg) |
| 6 | 7 | HOWEVER | 5.6% | 21.9% | 0 | 0 | 5.6% | 21.9% | 23 | C Y Ho | 1 | 0 | — | — | 腳 (Leg) |
| 7 | 14 | CHAMP'S DOMAIN | 3.1% | 13.8% | 0 | 0 | 3.1% | 13.8% | 21 | L Ferraris | 13 | 0 | — | — | — |
| 8 | 5 | CELESTIAL ZOUS | 2.6% | 12.8% | 0 | 0 | 2.6% | 12.8% | 31 | A Badel | 5 | 0 | — | — | — |
| 9 | 12 | PRECISION MIND | 1.8% | 9.1% | 0 | 0 | 1.8% | 9.1% | 12 | H T Mo | 8 | 5 | — | — | — |
| 10 | 2 | YEE CHEONG GLORY | 1.8% | 8.7% | 0 | 0 | 1.8% | 8.7% | 25 | J Orman | 9 | 10 | — | — | — |
| 11 | 8 | SUPREME DATA | 1.4% | 7.6% | 0 | 0 | 1.4% | 7.6% | 30 | R Kingscote | 10 | 0 | — | — | — |
| 12 | 13 | HEROIC VANGUARD | 0.9% | 5.2% | 0 | 0 | 0.9% | 5.2% | 47 | K Teetan | 12 | 5 | — | — | — |
| 13 | 9 | TALENTS CHAMPION | 0.5% | 3.6% | 0 | 0 | 0.5% | 3.6% | 42 | M L Yeung | 14 | 3 | — | — | — |
| 14 | 10 | CLASSIC TRIPLE | 0.1% | 1.2% | 0 | 0 | 0.1% | 1.2% | 37 | K C Leung | 11 | 2 | — | — | — |

Factor labels: excuses +2 (crowded/steadied/wide/held up/hampered), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -perf −2, -barrier −1, -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place; 50% win / 85% place ceilings. Starts = form records in MC (proxy for race starts).

Reasoning: 1000m straight, Class 4. SCMP: #3 KA YING LIGHTNING bumped heavily and unbalanced early last start (excuses +2). #10 CLASSIC TRIPLE's unacceptable performance was in April (not last run) — no adjustment. #8 SUPREME DATA pastern injury passed 28/08 (>30 days). #1 JEDI SPURS had trachea mucus post-race (no skill adjustment).

## TRIO POOL (Strategy A, any order)

```
POOL: #1, #3, #4, #6, #11, #7
MODE: B: Standard Pool (6) | POOL SIZE: 6

膽 (Banker): #1 JEDI SPURS (Adj Win% 22.9%, Adj Place% 55.0%) ← locked in every combo
腳 (Legs): #3, #4, #6, #11, #7
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #1, #3, #4 | 11.5% | $9 |
| 2 | #1, #3, #6 | 11.0% | $9 |
| 3 | #1, #3, #11 | 4.4% | $23 |
| 4 | #1, #4, #6 | 4.3% | $24 |
| 5 | #1, #3, #7 | 4.2% | $24 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 42.4%

PASS CONDITIONS:
- If #1 JEDI SPURS (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft → reconsider; MC run on Good to Firm

CONFIDENCE: MEDIUM

CAVEATS:
- SCMP data partial — flags applied only where comments were retrieved.
- Sparse form (<3 records, MC less reliable): #3 KA YING LIGHTNING (1), #1 JEDI SPURS (2), #6 HANDSOME HERO (1), #7 HOWEVER (0), #14 CHAMP'S DOMAIN (0), #5 CELESTIAL ZOUS (0), #8 SUPREME DATA (0), #10 CLASSIC TRIPLE (2)
- Model/market divergence: MC #1 #3 KA YING LIGHTNING (5.9) vs market favourite #1 JEDI SPURS (2.3, MC Win% 22.9%).
- #3 KA YING LIGHTNING ranked 1st but has <2 starts → demoted to leg; banker = #1 JEDI SPURS
- SCMP R5: Star Form/trackwork not returned — only TIR/vet flags applied.
- #1 JEDI SPURS: mucus in trachea noted post-race (no adjustment rule; treat as minor risk).
- Lightly-raced field: 8 of 14 runners have <3 local form records (several 0, e.g. #7, #5, #14, #8 — #8 SUPREME DATA shows overseas/earlier runs 3/7/7 on SCMP not in local history). MC spread is less reliable; LOW-to-MEDIUM confidence.
- Strategy A vs B banker split is purely the debutant rule: B banks #3 KA YING LIGHTNING (1 start, won it).
- Odds from HKJC pool snapshot (fetch-odds.ts, 2026-10-01T01:55:28.985Z); odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #3 KA YING LIGHTNING (MC Win% 26.4%, MC Place% 59.8%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #1, #6, #4, #11, #7
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #11 DOUBLE ALPHA (MC Place% 22.2%, Win odds 11), #7 HOWEVER (MC Place% 21.9%, Win odds 23)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
Action: none
Final legs: #1, #6, #4, #11, #7
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 45.1%

STRATEGY B TICKET: 膽 #3 / 腳 #1, #6, #4, #11, #7
  Top combos: 3-1-4 (11.1%); 3-1-6 (10.6%); 3-6-4 (5.6%); 3-1-11 (4.2%); 3-1-7 (4.1%)

vs Strategy A: different banker (A #1 / B #3); B has 5 legs / 10 combos ($100) vs A 5 legs / 10 combos ($100).
═══════════════════════════════════════════════════════════
```
