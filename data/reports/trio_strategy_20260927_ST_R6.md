# Trio (單T) Strategy — Sha Tin 2026-09-27 Race 6

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-27 | Race 6
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, jockey stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form/TIR/Vet/Trackwork/Odds parsed (tipster picks ignored)
ODDS SOURCE: SCMP race card (HKJC odds file lacked this race)
             SCMP odds: ✅ loaded (cross-reference) | HKJC live: ✅ loaded

RACE: R6 — Class 4 | 1400m | Turf | Good to Firm | 14 runners
CLASSIFICATION: Competitive (top Adj Win% 29.9%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 13 | SUPER LOVE | 28.9% | 62.5% | 6 | ✅ | ✅ | 10 | ★ 膽 (Banker) | 4-13: 15.0% (6.7) |
| 4 | HAROLD WIN | 23.9% | 58.0% | 8.2 | ✅ | ✅ | 10 | 腳 (Leg) | 4-13: 15.0% (6.7) |
| 1 | ETALON OR | 19.1% | 52.4% | 7.6 | ✅ | ✅ | 10 | 腳 (Leg) | 1-13: 12.8% (7.8) |
| 2 | TURIN CHAMPIONS | 5.0% | 20.5% | 17 | ✅ | ❌ | 9 | — (replaced out) | 2-13: 3.5% (28.3) |
| 8 | LUCKY MAN | 4.9% | 20.9% | 7.8 | ✅ | ✅ | 10 | 腳 (Leg) | — |
| 12 | HOT AIR BALLON | 4.9% | 20.2% | 10 | ✅ | ❌ | 4 | 腳 (Leg) | — |
| 9 | GHORGAN | 2.7% | 12.3% | 6.1 | ❌ | ✅ | 10 | 腳 (Leg) — replacement candidate | — |
| 3 | CIRCUIT FIERY | 2.4% | 11.7% | 16 | ❌ | ❌ | 10 | — | — |
| 5 | BUCEPHALAS | 2.3% | 11.1% | 8 | ❌ | ✅ | 10 | 腳 (Leg) — replacement candidate | — |
| 7 | HEY BROS | 2.2% | 10.7% | 50 | ❌ | ❌ | 7 | — | — |
| 11 | GOLDEN GUNNERS | 1.8% | 8.5% | 37 | ❌ | ❌ | 2 | — | — |
| 6 | GREEN AUTUMN | 1.4% | 7.1% | 16 | ❌ | ❌ | 1 | — | — |
| 10 | CHIU CHOW GOLF | 0.4% | 2.5% | 28 | ❌ | ❌ | 2 | — | — |
| 14 | WORD OF KINDNESS | 0.2% | 1.7% | 37 | ❌ | ❌ | 6 | — | — |

Market: overround -100.0%. MC vs market — no major undervalued; no major overvalued.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Starts | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|--------|------------|------|
| 1 | 13 | SUPER LOVE | 28.9% | 62.5% | +form +1 | +form +1 | 29.9% | 63.5% | 6 | C Y Ho | 5 | 10 | +form | ★ 膽 (Banker) |
| 2 | 4 | HAROLD WIN | 23.9% | 58.0% | excuses +2 | excuses +2 | 25.9% | 60.0% | 8.2 | C L Chau | 8 | 10 | +excuses | 腳 (Leg) |
| 3 | 1 | ETALON OR | 19.1% | 52.4% | 0 | 0 | 19.1% | 52.4% | 7.6 | H Y Yuen | 14 | 10 | — | 腳 (Leg) |
| 4 | 2 | TURIN CHAMPIONS | 5.0% | 20.5% | trial +2 | trial +2 | 7.0% | 22.5% | 17 | L Hewitson | 9 | 9 | +trial | 腳 (Leg) |
| 5 | 12 | HOT AIR BALLON | 4.9% | 20.2% | excuses +2 | excuses +2 | 6.9% | 22.2% | 10 | B Avdulla | 2 | 4 | +excuses | 腳 (Leg) |
| 6 | 3 | CIRCUIT FIERY | 2.4% | 11.7% | excuses +2, +draw +1 | excuses +2, +draw +1 | 5.4% | 14.7% | 16 | P N Wong | 1 | 10 | +excuses, +draw | — |
| 7 | 5 | BUCEPHALAS | 2.3% | 11.1% | trial +2, +draw +1 | trial +2, +draw +1 | 5.3% | 14.1% | 8 | K C Leung | 3 | 10 | +trial, +draw | — |
| 8 | 9 | GHORGAN | 2.7% | 12.3% | excuses +2 | excuses +2 | 4.7% | 14.3% | 6.1 | A Atzeni | 13 | 10 | +excuses | — |
| 9 | 10 | CHIU CHOW GOLF | 0.4% | 2.5% | excuses +2 | excuses +2 | 2.4% | 4.5% | 28 | H Bentley | 4 | 2 | +excuses | — |
| 10 | 7 | HEY BROS | 2.2% | 10.7% | 0 | 0 | 2.2% | 10.7% | 50 | M L Yeung | 10 | 7 | — | — |
| 11 | 14 | WORD OF KINDNESS | 0.2% | 1.7% | excuses +2 | excuses +2 | 2.2% | 3.7% | 37 | R Kingscote | 12 | 6 | +excuses | — |
| 12 | 8 | LUCKY MAN | 4.9% | 20.9% | -injury30d −3 | -injury30d −4 | 1.9% | 16.9% | 7.8 | Z Purton | 7 | 10 | -injury30d | 腳 (Leg) |
| 13 | 11 | GOLDEN GUNNERS | 1.8% | 8.5% | 0 | 0 | 1.8% | 8.5% | 37 | E C W Wong | 11 | 2 | — | — |
| 14 | 6 | GREEN AUTUMN | 1.4% | 7.1% | 0 | 0 | 1.4% | 7.1% | 16 | K Teetan | 6 | 1 | — | — |

Factor labels: excuses +2 (bad luck last run: crowded/steadied/wide/held up/hampered/bumped), trial +2, +draw +1, +form +1, -injury30d −3 win/−4 place (vet clearance <30 days), -notRO −2, -age −2 (8yo+, C3 and above only). Caps ±8 win / ±10 place.

Reasoning: Three-horse race on MC: #13 SUPER LOVE (28.9%, rallied last run), #4 HAROLD WIN (23.9%) and #1 ETALON OR (19.1%, gate 14). Market (SCMP) broadly agrees (6.0 / 8.2 / 7.6). #9 GHORGAN is SCMP favourite-ish (6.1) but MC 12.3% place; #8 LUCKY MAN carries a -injury30d penalty (blood in trachea, passed 02/09).

## TRIO POOL (Strategy A, any order)

```
POOL: #13, #4, #1, #2, #12, #8
MODE: B: Standard Pool (6) | POOL SIZE: 6

膽 (Banker): #13 SUPER LOVE (Adj Win% 29.9%, Adj Place% 63.5%) ← locked in every combo
腳 (Legs): #4, #1, #2, #12, #8
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #13, #4, #1 | 12.8% | $78 |
| 2 | #13, #4, #2 | 4.1% | $243 |
| 3 | #13, #4, #12 | 4.1% | $247 |
| 4 | #13, #1, #2 | 2.8% | $361 |
| 5 | #13, #1, #12 | 2.7% | $366 |

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
EST. TICKET HIT PROBABILITY (Harville, Adj Win%): 29.6%

PASS CONDITIONS:
- If #13 SUPER LOVE (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft (turf) or Wet (AWT) → reconsider; MC run on Good to Firm

CONFIDENCE: MEDIUM

CAVEATS:
- HKJC odds unavailable for this race (fetch-odds.ts returned 0 horses; not in meeting odds file) — SCMP race-card win odds used; MC ran with no market odds input.
- Sparse form (<3 records, MC less reliable): #11 GOLDEN GUNNERS (2), #6 GREEN AUTUMN (1), #10 CHIU CHOW GOLF (2)
- Odds are SCMP race-card figures (time of SCMP fetch), not HKJC pool; recheck before betting.
- SCMP flags extracted via automated page summary; odds will move before the jump.
```

## STRATEGY B (MC-only)

```
Banker: #13 SUPER LOVE (MC Win% 28.9%, MC Place% 62.5%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #4, #1, #2, #8, #12
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #2 TURIN CHAMPIONS (MC Place% 20.5%, Win odds 17)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #9 GHORGAN (Win odds 6.1, MC Place% 12.3%), #5 BUCEPHALAS (Win odds 8, MC Place% 11.1%)
Action: #9 GHORGAN replaced #2 TURIN CHAMPIONS; #5 BUCEPHALAS added directly (no replaceable leg)
Final legs: #4, #1, #9, #8, #12, #5
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150
EST. TICKET HIT PROBABILITY (Harville, raw MC Win%): 44.8%

STRATEGY B TICKET: 膽 #13 / 腳 #4, #1, #9, #8, #12, #5
  Top combos: 13-4-1 (20.1%); 13-4-8 (4.3%); 13-4-12 (4.3%); 13-1-8 (3.2%); 13-1-12 (3.2%)

vs Strategy A: same banker (A #13 / B #13); B has 6 legs / 15 combos ($150) vs A 5 legs / 10 combos ($100).
═══════════════════════════════════════════════════════════
```
