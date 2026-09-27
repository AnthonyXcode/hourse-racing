# Trio (單T) Strategy — Sha Tin 2026-09-27 Race 2

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-27 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork/Odds parsed (tipster picks ignored)
ODDS SOURCE: HKJC early pool (tools/fetch-odds.ts, captured 09:03 HKT 27-Sep)
             SCMP odds: ✅ loaded (cross-reference) | HKJC live: ✅ loaded

RACE: R2 — Class 4 | 1200m | Turf | Good to Firm | 12 runners
CLASSIFICATION: Competitive (top Adj Win% 26.6%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 12 | GLACIATED | 25.6% | 55.7% | 5.2 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 6-12: 7.7% (13.0) |
| 6 | KYOTO SPRING | 14.3% | 38.0% | 20 | ✅ | ❌ | 2 | 腳 (Leg) | 6-12: 7.7% (13.0) |
| 8 | APEX GLORY | 12.3% | 36.1% | 4.6 | ✅ | ✅ | 4 | 腳 (Leg) | 8-12: 6.7% (14.8) |
| 4 | LITTLE MONSTER | 11.8% | 36.3% | 7 | ✅ | ✅ | 10 | 腳 (Leg) | 4-12: 6.9% (14.6) |
| 9 | RYUI KOKOROE | 8.8% | 28.8% | 13 | ✅ | ❌ | 10 | 腳 (Leg) | — |
| 2 | DAILY FUN | 5.7% | 20.9% | 37 | ✅ | ❌ | 1 | — (replaced out) | — |
| 1 | NOT USUAL DOUBLE | 5.6% | 19.7% | 15 | ❌ | ❌ | 0 | — | — |
| 7 | NAVAS G | 5.3% | 20.5% | 9.9 | ✅ | ✅ | 4 | 腳 (Leg) | — |
| 11 | SUPER DRAGON | 5.1% | 20.3% | 8.4 | ✅ | ✅ | 7 | 腳 (Leg) | — |
| 10 | JUST FOLLOW ME | 3.2% | 13.1% | 6.1 | ❌ | ✅ | 9 | 腳 (Leg) — replacement candidate | — |
| 3 | ULTRA BOLT | 1.8% | 7.2% | 75 | ❌ | ❌ | 1 | — | — |
| 5 | SOO KOO | 0.6% | 3.4% | 21 | ❌ | ❌ | 2 | — | — |

Market: overround 21.8%. MC vs market — #6 undervalued 186%, #2 undervalued 110%; #5 overvalued 88%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|------------|------|
| 1 | 12 | GLACIATED | 25.6% | 55.7% | +form +1 | +form +1 | 26.6% | 56.7% | 5.2 | C Y Ho | 7 | 10 | +form | ★ 膽 (Banker) |
| 2 | 4 | LITTLE MONSTER | 11.8% | 36.3% | +form +1, excuses +2 | +form +1, excuses +2 | 14.8% | 39.3% | 7 | M Chadwick | 6 | 10 | +form, +excuses | 腳 (Leg) |
| 3 | 6 | KYOTO SPRING | 14.3% | 38.0% | 0 | 0 | 14.3% | 38.0% | 20 | K C Leung | 1 | 2 | — | 腳 (Leg) |
| 4 | 8 | APEX GLORY | 12.3% | 36.1% | +form +1 | +form +1 | 13.3% | 37.1% | 4.6 | Z Purton | 12 | 4 | +form | 腳 (Leg) |
| 5 | 9 | RYUI KOKOROE | 8.8% | 28.8% | 0 | 0 | 8.8% | 28.8% | 13 | H Bentley | 8 | 10 | — | 腳 (Leg) |
| 6 | 1 | NOT USUAL DOUBLE | 5.6% | 19.7% | trial +2 | trial +2 | 7.6% | 21.7% | 15 | M L Yeung | 4 | 0 | +trial | — |
| 7 | 7 | NAVAS G | 5.3% | 20.5% | excuses +2 | excuses +2 | 7.3% | 22.5% | 9.9 | H Y Yuen | 10 | 4 | +excuses | 腳 (Leg) |
| 8 | 11 | SUPER DRAGON | 5.1% | 20.3% | trial +2 | trial +2 | 7.1% | 22.3% | 8.4 | A Atzeni | 11 | 7 | +trial | — |
| 9 | 2 | DAILY FUN | 5.7% | 20.9% | 0 | 0 | 5.7% | 20.9% | 37 | L Ferraris | 2 | 1 | — | — |
| 10 | 3 | ULTRA BOLT | 1.8% | 7.2% | excuses +2 | excuses +2 | 3.8% | 9.2% | 75 | E C W Wong | 5 | 1 | +excuses | — |
| 11 | 10 | JUST FOLLOW ME | 3.2% | 13.1% | 0 | 0 | 3.2% | 13.1% | 6.1 | K Teetan | 3 | 9 | — | — |
| 12 | 5 | SOO KOO | 0.6% | 3.4% | 0 | 0 | 0.6% | 3.4% | 21 | R Kingscote | 9 | 2 | — | — |

Factor labels: excuses +2 (bad luck last run: crowded/steadied/wide/held up/hampered/bumped), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place.

Reasoning: #12 GLACIATED (won same track/distance, improved) is clear MC #1 at 25.6% and 2nd in market (6.2). #8 APEX GLORY is the favourite (4.3) but wide gate 12. #6 KYOTO SPRING ranks 2nd in MC (14.3%) off only 2 form records against 29 market odds — treat as model noise risk. #11 SUPER DRAGON (trial 2nd) and #10 JUST FOLLOW ME (throat surgery, passed 25/08 — 33 days, outside the 30-day penalty) are short in the market but weak in MC.

## TRIO POOL (Strategy A, any order)

```
POOL: #12, #4, #6, #8, #9, #7
MODE: B: Standard Pool (6) | POOL SIZE: 6

膽 (Banker): #12 GLACIATED (Adj Win% 26.6%, Adj Place% 56.7%) ← locked in every combo
腳 (Legs): #4, #6, #8, #9, #7
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #12, #4, #6 | 4.2% | $238 |
| 2 | #12, #4, #8 | 3.9% | $259 |
| 3 | #12, #6, #8 | 3.7% | $269 |
| 4 | #12, #4, #9 | 2.4% | $410 |
| 5 | #12, #6, #9 | 2.3% | $427 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 25.5%

PASS CONDITIONS:
- If #12 GLACIATED (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft (turf) or Wet (AWT) → reconsider; MC run on Good to Firm

CONFIDENCE: MEDIUM

CAVEATS:
- Sparse form (<3 records, MC less reliable): #6 KYOTO SPRING (2), #2 DAILY FUN (1), #1 NOT USUAL DOUBLE (0), #3 ULTRA BOLT (1), #5 SOO KOO (2)
- Model/market divergence: MC #1 #12 GLACIATED (5.2) vs market favourite #8 APEX GLORY (4.6, MC Win% 12.3%).
- #10 JUST FOLLOW ME (6.5) had throat surgery, vet passed 25/08 (33 days) — no penalty applied but fitness risk.
- SCMP flags extracted via automated page summary; odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #12 GLACIATED (MC Win% 25.6%, MC Place% 55.7%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6, #8, #4, #9, #2, #7, #11
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #9 RYUI KOKOROE (MC Place% 28.8%, Win odds 13), #2 DAILY FUN (MC Place% 20.9%, Win odds 37)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #10 JUST FOLLOW ME (Win odds 6.1, MC Place% 13.1%)
Action: #10 JUST FOLLOW ME replaced #2 DAILY FUN
Final legs: #6, #8, #4, #9, #10, #7, #11
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 (fixed)
TOTAL STAKE: $210
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 41.0%

STRATEGY B TICKET: 膽 #12 / 腳 #6, #8, #4, #9, #10, #7, #11
  Top combos: 12-6-8 (5.1%); 12-6-4 (4.8%); 12-8-4 (4.1%); 12-6-9 (3.5%); 12-8-9 (2.9%)

vs Strategy A: same banker (A #12 / B #12); B has 7 legs / 21 combos ($210) vs A 5 legs / 10 combos ($100).
═══════════════════════════════════════════════════════════
```
