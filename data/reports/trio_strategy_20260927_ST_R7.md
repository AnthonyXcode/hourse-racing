# Trio (單T) Strategy — Sha Tin 2026-09-27 Race 7

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-27 | Race 7
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey stats loaded) | Going: Good | Scratchings: none in final field (Herbal Star withdrawn earlier — lame; Cala Dei Mori reserve)
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork/Odds parsed (tipster picks ignored)
ODDS SOURCE: HKJC early pool (tools/fetch-odds.ts, captured 09:03 HKT 27-Sep)
             SCMP odds: ✅ loaded (cross-reference) | HKJC live: ✅ loaded

RACE: R7 — Class 3 | 1200m | AWT | Good | 12 runners
CLASSIFICATION: Dominant (top Adj Win% 49.7%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 1 | AURORA PATCH | 48.7% | 84.1% | 8.1 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 1-8: 24.1% (4.2) |
| 8 | BUSTLING CITY | 19.3% | 59.1% | 1.8 | ✅ | ✅ | 6 | 腳 (Leg) | 1-8: 24.1% (4.2) |
| 12 | SPEEDY SMARTIE | 9.8% | 43.1% | 19 | ✅ | ❌ | 10 | 腳 (Leg) | 1-12: 14.2% (7.1) |
| 9 | PACKING KING | 8.9% | 38.4% | 10 | ✅ | ❌ | 7 | 腳 (Leg) | 1-9: 12.1% (8.3) |
| 2 | MIGHTY COMMANDER | 8.6% | 38.0% | 25 | ✅ | ❌ | 10 | 腳 (Leg) | — |
| 3 | RIDING TOGETHER | 2.4% | 15.5% | 23 | ❌ | ❌ | 10 | — | — |
| 10 | DEVAS TWELVE | 1.3% | 10.1% | 46 | ❌ | ❌ | 10 | — | — |
| 6 | NOTTHESILLYONE | 0.4% | 4.4% | 13 | ❌ | ❌ | 10 | — | — |
| 4 | ALL'S WELL | 0.3% | 3.8% | 33 | ❌ | ❌ | 10 | — | — |
| 11 | ENDURANCE EXPRESS | 0.1% | 1.6% | 41 | ❌ | ❌ | 3 | — | — |
| 5 | FOUR STARS ALIGN | 0.1% | 1.8% | 7.1 | ❌ | ✅ | 0 | 腳 (Leg) — replacement candidate | — |
| 7 | HOTT SHOTT | 0.0% | 0.2% | 41 | ❌ | ❌ | 3 | — | — |

Market: overround 22.5%. MC vs market — #1 undervalued 289%, #2 undervalued 116%; #7 overvalued 100%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|------------|------|
| 1 | 1 | AURORA PATCH | 48.7% | 84.1% | +draw +1 | +draw +1 | 49.7% | 85.0% | 8.1 | C Y Ho | 2 | 10 | +draw | ★ 膽 (Banker) |
| 2 | 8 | BUSTLING CITY | 19.3% | 59.1% | trial +2 | trial +2 | 21.3% | 61.1% | 1.8 | B Avdulla | 6 | 6 | +trial | 腳 (Leg) |
| 3 | 9 | PACKING KING | 8.9% | 38.4% | trial +2, +form +1 | trial +2, +form +1 | 11.9% | 41.4% | 10 | E C W Wong | 3 | 7 | +trial, +form | 腳 (Leg) |
| 4 | 12 | SPEEDY SMARTIE | 9.8% | 43.1% | 0 | 0 | 9.8% | 43.1% | 19 | K Teetan | 10 | 10 | — | 腳 (Leg) |
| 5 | 2 | MIGHTY COMMANDER | 8.6% | 38.0% | 0 | 0 | 8.6% | 38.0% | 25 | L Ferraris | 12 | 10 | — | 腳 (Leg) |
| 6 | 3 | RIDING TOGETHER | 2.4% | 15.5% | trial +2 | trial +2 | 4.4% | 17.5% | 23 | A Atzeni | 5 | 10 | +trial | — |
| 7 | 5 | FOUR STARS ALIGN | 0.1% | 1.8% | trial +2 | trial +2 | 2.1% | 3.8% | 7.1 | Y L Chung | 9 | 0 | +trial | — |
| 8 | 10 | DEVAS TWELVE | 1.3% | 10.1% | 0 | 0 | 1.3% | 10.1% | 46 | H T Mo | 1 | 10 | — | — |
| 9 | 6 | NOTTHESILLYONE | 0.4% | 4.4% | 0 | 0 | 0.4% | 4.4% | 13 | R Kingscote | 8 | 10 | — | — |
| 10 | 4 | ALL'S WELL | 0.3% | 3.8% | 0 | 0 | 0.3% | 3.8% | 33 | H Bentley | 11 | 10 | — | — |
| 11 | 11 | ENDURANCE EXPRESS | 0.1% | 1.6% | 0 | 0 | 0.1% | 1.6% | 41 | L Hewitson | 7 | 3 | — | — |
| 12 | 7 | HOTT SHOTT | 0.0% | 0.2% | 0 | 0 | 0.1% | 0.5% | 41 | M F Poon | 4 | 3 | — | — |

Factor labels: excuses +2 (bad luck last run: crowded/steadied/wide/held up/hampered/bumped), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place.

Reasoning: #1 AURORA PATCH (gate 2) is MC #1 at 48.7% but 9.3 in the market, while #8 BUSTLING CITY is a 1.6 hot favourite (won both trials, recent dirt win) at 19.3% MC. Either way, both are in both pools. #12 SPEEDY SMARTIE, #9 PACKING KING (made all in dirt trial) and #2 MIGHTY COMMANDER round out the MC top five.

## TRIO POOL (Strategy A, any order)

```
POOL: #1, #8, #9, #12, #2
MODE: A: Tight Pool (5) | POOL SIZE: 5

膽 (Banker): #1 AURORA PATCH (Adj Win% 49.7%, Adj Place% 85.0%) ← locked in every combo
腳 (Legs): #8, #9, #12, #2
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #1, #8, #9 | 17.7% | $56 |
| 2 | #1, #8, #12 | 14.2% | $70 |
| 3 | #1, #8, #2 | 12.3% | $81 |
| 4 | #1, #9, #12 | 6.9% | $145 |
| 5 | #1, #9, #2 | 6.0% | $168 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 61.9%

PASS CONDITIONS:
- If #1 AURORA PATCH (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft (turf) or Wet (AWT) → reconsider; MC run on Good

CONFIDENCE: HIGH

CAVEATS:
- Sparse form (<3 records, MC less reliable): #5 FOUR STARS ALIGN (0)
- Model/market divergence: MC #1 #1 AURORA PATCH (8.1) vs market favourite #8 BUSTLING CITY (1.8, MC Win% 19.3%).
- Strong model/market disagreement on the banker: if you trust the market, #8 BUSTLING CITY is the natural banker — consider a 雙膽 #1+#8 cover.
- SCMP flags extracted via automated page summary; odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #1 AURORA PATCH (MC Win% 48.7%, MC Place% 84.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #8, #12, #9, #2
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #5 FOUR STARS ALIGN (Win odds 7.1, MC Place% 1.8%)
Action: #5 FOUR STARS ALIGN added directly (no replaceable leg)
Final legs: #8, #12, #9, #2, #5
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 74.0%

STRATEGY B TICKET: 膽 #1 / 腳 #8, #12, #9, #2, #5
  Top combos: 1-8-12 (19.1%); 1-8-9 (17.2%); 1-8-2 (16.5%); 1-12-9 (7.4%); 1-12-2 (7.1%)

vs Strategy A: same banker (A #1 / B #1); B has 5 legs / 10 combos ($100) vs A 4 legs / 6 combos ($60).
═══════════════════════════════════════════════════════════
```
