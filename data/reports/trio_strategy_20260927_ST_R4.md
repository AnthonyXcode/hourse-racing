# Trio (單T) Strategy — Sha Tin 2026-09-27 Race 4

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-27 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none in final field (Master Champion, Casa Primo were reserves)
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork/Odds parsed (tipster picks ignored)
ODDS SOURCE: HKJC early pool (tools/fetch-odds.ts, captured 09:03 HKT 27-Sep)
             SCMP odds: ✅ loaded (cross-reference) | HKJC live: ✅ loaded

RACE: R4 — Class 4 | 1000m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Dominant (top Adj Win% 38.6%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 2 | RUN RUN SUNRISE | 36.6% | 68.9% | 10 | ✅ | ❌ | 9 | ★ 膽 (Banker) | 1-2: 18.1% (5.5) |
| 1 | RAPID PHANTOM | 21.4% | 55.7% | 4.8 | ✅ | ✅ | 4 | 腳 (Leg) | 1-2: 18.1% (5.5) |
| 5 | HERO MASTERMIND | 9.2% | 31.6% | 36 | ✅ | ❌ | 2 | 腳 (Leg) | 2-5: 8.1% (12.4) |
| 4 | KINGMAN REEF | 8.5% | 28.6% | 14 | ✅ | ❌ | 1 | — (replaced out) | 2-4: 7.1% (14.1) |
| 13 | LET'S HAVE FUN | 5.6% | 23.2% | 14 | ✅ | ❌ | 10 | — (replaced out) | — |
| 9 | THUNDER PRINCE | 4.6% | 19.6% | 13 | ❌ | ❌ | 10 | — | — |
| 6 | FLOWING RICHES | 3.0% | 13.6% | 8.6 | ❌ | ✅ | 10 | 腳 (Leg) — replacement candidate | — |
| 3 | HARVEST MOON | 2.6% | 12.9% | 5.1 | ❌ | ✅ | 0 | 腳 (Leg) — replacement candidate | — |
| 10 | SHOW ME YOUR LOVE | 2.4% | 11.4% | 35 | ❌ | ❌ | 3 | — | — |
| 14 | COMET RADIANCE | 2.1% | 11.3% | 15 | ❌ | ❌ | 9 | — | — |
| 8 | GIANT SPIRIT | 1.8% | 9.9% | 19 | ❌ | ❌ | 8 | — | — |
| 12 | SUPREME VOYAGER | 0.9% | 5.0% | 9.1 | ❌ | ✅ | 9 | 腳 (Leg) — replacement candidate | — |
| 7 | FLYING TING LOK | 0.7% | 4.2% | 33 | ❌ | ❌ | 10 | — | — |
| 11 | ZOUPER FELLOW | 0.6% | 4.1% | 13 | ❌ | ❌ | 10 | — | — |

Market: overround 23.6%. MC vs market — #2 undervalued 266%, #5 undervalued 230%; #11 overvalued 92%.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|------------|------|
| 1 | 2 | RUN RUN SUNRISE | 36.6% | 68.9% | excuses +2 | excuses +2 | 38.6% | 70.9% | 10 | K C Leung | 13 | 9 | +excuses | ★ 膽 (Banker) |
| 2 | 1 | RAPID PHANTOM | 21.4% | 55.7% | -notRO −2 | -notRO −2 | 19.4% | 53.7% | 4.8 | H Y Yuen | 3 | 4 | -notRO | 腳 (Leg) |
| 3 | 5 | HERO MASTERMIND | 9.2% | 31.6% | excuses +2 | excuses +2 | 11.2% | 33.6% | 36 | L Ferraris | 6 | 2 | +excuses | 腳 (Leg) |
| 4 | 4 | KINGMAN REEF | 8.5% | 28.6% | excuses +2 | excuses +2 | 10.5% | 30.6% | 14 | Z Purton | 5 | 1 | +excuses | 腳 (Leg) |
| 5 | 13 | LET'S HAVE FUN | 5.6% | 23.2% | +form +1 | +form +1 | 6.6% | 24.2% | 14 | M L Yeung | 10 | 10 | +form | 腳 (Leg) |
| 6 | 9 | THUNDER PRINCE | 4.6% | 19.6% | +form +1, +draw +1 | +form +1, +draw +1 | 6.6% | 21.6% | 13 | B Avdulla | 12 | 10 | +form, +draw | — |
| 7 | 3 | HARVEST MOON | 2.6% | 12.9% | trial +2 | trial +2 | 4.6% | 14.9% | 5.1 | A Atzeni | 7 | 0 | +trial | — |
| 8 | 10 | SHOW ME YOUR LOVE | 2.4% | 11.4% | excuses +2 | excuses +2 | 4.4% | 13.4% | 35 | L Hewitson | 14 | 3 | +excuses | — |
| 9 | 8 | GIANT SPIRIT | 1.8% | 9.9% | excuses +2 | excuses +2 | 3.8% | 11.9% | 19 | H T Mo | 9 | 8 | +excuses | — |
| 10 | 6 | FLOWING RICHES | 3.0% | 13.6% | 0 | 0 | 3.0% | 13.6% | 8.6 | C L Chau | 1 | 10 | — | — |
| 11 | 12 | SUPREME VOYAGER | 0.9% | 5.0% | excuses +2 | excuses +2 | 2.9% | 7.0% | 9.1 | H Bentley | 2 | 9 | +excuses | — |
| 12 | 7 | FLYING TING LOK | 0.7% | 4.2% | excuses +2 | excuses +2 | 2.7% | 6.2% | 33 | M Chadwick | 11 | 10 | +excuses | — |
| 13 | 11 | ZOUPER FELLOW | 0.6% | 4.1% | trial +2 | trial +2 | 2.6% | 6.1% | 13 | P N Wong | 8 | 10 | +trial | — |
| 14 | 14 | COMET RADIANCE | 2.1% | 11.3% | 0 | 0 | 2.1% | 11.3% | 15 | Y L Chung | 4 | 9 | — | — |

Factor labels: excuses +2 (bad luck last run: crowded/steadied/wide/held up/hampered/bumped), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place.

Reasoning: #2 RUN RUN SUNRISE is MC #1 at 36.6% (Dominant) despite 11 odds and gate 13 — big model overlay; hampered at the jump last start. #1 RAPID PHANTOM (4.9) is the strong 2nd (21.4%). Market favourite #3 HARVEST MOON (4.7) is a debutant with 0 form records — MC cannot rate it (2.6%) and it is ineligible as banker; it enters Strategy B via the win-odds rule only.

## TRIO POOL (Strategy A, any order)

```
POOL: #2, #1, #5, #4, #13
MODE: A: Tight Pool (5) | POOL SIZE: 5

膽 (Banker): #2 RUN RUN SUNRISE (Adj Win% 38.6%, Adj Place% 70.9%) ← locked in every combo
腳 (Legs): #1, #5, #4, #13
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #2, #1, #5 | 6.3% | $158 |
| 2 | #2, #1, #4 | 5.9% | $169 |
| 3 | #2, #1, #13 | 3.6% | $280 |
| 4 | #2, #5, #4 | 3.1% | $322 |
| 5 | #2, #5, #13 | 1.9% | $533 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 22.6%

PASS CONDITIONS:
- If #2 RUN RUN SUNRISE (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft (turf) or Wet (AWT) → reconsider; MC run on Good to Firm

CONFIDENCE: HIGH

CAVEATS:
- Sparse form (<3 records, MC less reliable): #5 HERO MASTERMIND (2), #4 KINGMAN REEF (1), #3 HARVEST MOON (0)
- Model/market divergence: MC #1 #2 RUN RUN SUNRISE (10) vs market favourite #1 RAPID PHANTOM (4.8, MC Win% 21.4%).
- Banker #2 is drawn 13 over 1000m straight course; model overlay (MC 36.6% vs 11 odds) is large — treat banker as less secure than the Dominant label suggests.
- SCMP flags extracted via automated page summary; odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #2 RUN RUN SUNRISE (MC Win% 36.6%, MC Place% 68.9%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #1, #5, #4, #13
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #4 KINGMAN REEF (MC Place% 28.6%, Win odds 14), #13 LET'S HAVE FUN (MC Place% 23.2%, Win odds 14)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #3 HARVEST MOON (Win odds 5.1, MC Place% 12.9%), #6 FLOWING RICHES (Win odds 8.6, MC Place% 13.6%), #12 SUPREME VOYAGER (Win odds 9.1, MC Place% 5.0%)
Action: #3 HARVEST MOON replaced #13 LET'S HAVE FUN; #6 FLOWING RICHES replaced #4 KINGMAN REEF; #12 SUPREME VOYAGER added directly (no replaceable leg)
Final legs: #1, #5, #6, #3, #12
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 21.1%

STRATEGY B TICKET: 膽 #2 / 腳 #1, #5, #6, #3, #12
  Top combos: 2-1-5 (10.9%); 2-1-6 (3.3%); 2-1-3 (2.9%); 2-5-6 (1.2%); 2-5-3 (1.0%)

vs Strategy A: same banker (A #2 / B #2); B has 5 legs / 10 combos ($100) vs A 4 legs / 6 combos ($60).
═══════════════════════════════════════════════════════════
```
