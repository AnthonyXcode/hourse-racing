# Trio (單T) Strategy — Sha Tin | 2026-10-19 | Race 10

> Retrospective run (generated 2026-10-20, blind to results; odds = final SP)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-19 | Race 10
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good to Firm | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --use-saved, --hide-actual)
SCMP DATA: ❌ Unavailable (retrospective run — SCMP racecard pages now show 21-Oct Happy Valley card)
ODDS SOURCE: Final starting prices (SP) from saved race-card snapshot, as loaded by analyze-race.ts
             SCMP odds: ❌ not available | HKJC live: ❌ no longer available (meeting completed)

RACE: R10 — Class 3 | 1600m | Turf | Good to Firm | 14 runners (SHA KOK HANDICAP)
CLASSIFICATION: Dominant (top Adj Win% 59.0%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE: 膽拖 1膽 + 4腳 → C(4,2) = 6
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Sha Tin 2026-10-19 | Going: Good to Firm | Surface: Turf
Target Race(s): R10 (Class 3 | 1600m | 14 runners)
Scratchings: none
Odds coverage: 14 horses with odds (final SP)
SCMP data: ❌ unavailable (retrospective run)
```

- ≥3 starters ✅ | Odds populated for all 14 ✅ | Jockey/trainer stats loaded ✅
- Sparse form (<3 runs in snapshot): #6 SO NAIVE (2), #9 SONIC LINER (2), #10 PRIME SUCCESS (2). #7 JOYFUL JOY has only 3 runs and is stepping up from Class 4 (won last start). There are no debutants.
- Layoffs: none over 90 days. #7 JOYFUL JOY last ran on 6-Sep (43 days); all other runners have run since 23-Sep.

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 1 | PACKING FIGHTER | 59.0% | 89.4% | 1.9 | ✅ | ✅ | 1-1-2-5-6-11 | ★ 膽 (Banker) | 1-7: 24.8% (4.0) |
| 7 | JOYFUL JOY | 13.9% | 55.5% | 4.5 | ✅ | ✅ | 1-3-1 | 腳 (Leg) | 1-4: 21.0% (4.8) |
| 4 | MISTER DAPPER | 11.6% | 50.5% | 43 | ✅ | ❌ | 4-4-9-10-2-7 | 腳 (Leg) | 1-2: 14.8% (6.8) |
| 2 | SMART AVENUE | 7.8% | 39.6% | 79 | ✅ | ❌ | 10-9-5-1-11-2 | 腳 (Leg) | 1-14: 8.2% (12.2) |
| 14 | MASTER LUCKY | 3.8% | 25.2% | 6.1 | ✅ | ✅ | 4-2-1-2-3-5 | 腳 (Leg) | 1-3: 4.9% (20.3) |
| 3 | WINDLORD | 2.1% | 15.8% | 28 | ❌ | ❌ | 5-2-9-13-7-10 | — | — |
| 11 | SHAMUS STORM | 0.5% | 6.0% | 20 | ❌ | ❌ | 3-12-5-7-6-1 | — | — |
| 12 | NATURAL NUMBERS | 0.4% | 4.8% | 15 | ❌ | ❌ | 6-13-7-10-11-5 | — | — |
| 5 | COMPLETE UNKNOWN | 0.4% | 4.5% | 50 | ❌ | ❌ | 12-1-3-3-5-5 | — | — |
| 9 | SONIC LINER | 0.3% | 3.2% | 130 | ❌ | ❌ | 12-9 | — | — |
| 13 | HYMNBOOK | 0.1% | 2.9% | 30 | ❌ | ❌ | 5-3-8-3-6-5 | — | — |
| 10 | PRIME SUCCESS | 0.1% | 1.4% | 123 | ❌ | ❌ | 8-8 | — | — |
| 8 | FORTUNE BOY | 0.0% | 0.9% | 22 | ❌ | ❌ | 7-13-6-7-4-2 | — | — |
| 6 | SO NAIVE | 0.0% | 0.5% | 128 | ❌ | ❌ | 14-7 | — | — |

Market: Overround 22.3%. MC agrees with the market on the top two (#1 1.9 fav, #7 4.5). The big disagreement is #4 MISTER DAPPER (43) and #2 SMART AVENUE (79): MC has them 3rd and 4th, and the analyzer flags them undervalued by 398% and 518%. Both share the fastest projected time (1:33.80). The market's 3rd and 4th choices, #14 MASTER LUCKY (6.1) and #12 NATURAL NUMBERS (15), rate much lower on MC (25.2% and 4.8% place). The analyzer's own bets were Place #4 @4.71 and Place #2 @4.92 (HK$500 each).

---

## STRATEGY A

### HORSE RANKINGS

SCMP was unavailable, so all factors are 0 and Adj% = MC%.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 1 | PACKING FIGHTER | 59.0% | 89.4% | 0 | 0 | 59.0% → 50.0% (cap) | 85.0% (cap) | 1.9 | Z Purton | — | — (n/a) | ★ 膽 (Banker) |
| 7 | JOYFUL JOY | 13.9% | 55.5% | 0 | 0 | 13.9% | 55.5% | 4.5 | J Orman | — | — (n/a) | 腳 (Leg) |
| 4 | MISTER DAPPER | 11.6% | 50.5% | 0 | 0 | 11.6% | 50.5% | 43 | B Avdulla | — | — (n/a) | 腳 (Leg) |
| 2 | SMART AVENUE | 7.8% | 39.6% | 0 | 0 | 7.8% | 39.6% | 79 | H Y Yuen | — | — (n/a) | 腳 (Leg) |
| 14 | MASTER LUCKY | 3.8% | 25.2% | 0 | 0 | 3.8% | 25.2% | 6.1 | A Badel | — | — (n/a) | 腳 (Leg) |
| 3 | WINDLORD | 2.1% | 15.8% | 0 | 0 | 2.1% | 15.8% | 28 | C Y Ho | — | — (n/a) | — |
| 11 | SHAMUS STORM | 0.5% | 6.0% | 0 | 0 | 0.5% | 6.0% | 20 | H Bentley | — | — (n/a) | — |
| 12 | NATURAL NUMBERS | 0.4% | 4.8% | 0 | 0 | 0.4% | 4.8% | 15 | M Chadwick | — | — (n/a) | — |
| 5 | COMPLETE UNKNOWN | 0.4% | 4.5% | 0 | 0 | 0.4% | 4.5% | 50 | K Teetan | — | — (n/a) | — |
| 9 | SONIC LINER | 0.3% | 3.2% | 0 | 0 | 0.3% | 3.2% | 130 | K C Leung | — | — (n/a) | — |
| 13 | HYMNBOOK | 0.1% | 2.9% | 0 | 0 | 0.1% | 2.9% | 30 | A Atzeni | — | — (n/a) | — |
| 10 | PRIME SUCCESS | 0.1% | 1.4% | 0 | 0 | 0.1% | 1.4% | 123 | R Kingscote | — | — (n/a) | — |
| 8 | FORTUNE BOY | 0.0% | 0.9% | 0 | 0 | 0.0% | 0.9% | 22 | M F Poon | — | — (n/a) | — |
| 6 | SO NAIVE | 0.0% | 0.5% | 0 | 0 | 0.0% | 0.5% | 128 | C L Chau | — | — (n/a) | — |

Note: The skill's cap rule (max 50% Win / 85% Place) caps #1's adjusted figures. This changes neither the ranking nor the classification. ★ 膽 = Banker (1st by Adj Win%). #1 has 10 form lines, so it is eligible to be banker. 2nd-ranked #7 has Adj Place% 55.5% < 63%, so 雙膽拖 does not apply.

**Reasoning:** #1 PACKING FIGHTER has 59.0% raw MC win (50% capped), well above the 35% threshold, so the race is Dominant and uses Mode A. The pool is the banker plus 4 contenders by Adj Place%: #7 (55.5%), #4 (50.5%), #2 (39.6%) and #14 (25.2%). These are exactly the five horses with Adj Place% ≥ 20%, so every must-include horse (≥25%) is in the pool. The next horse, #3 WINDLORD, is at 15.8%.
- **#1 PACKING FIGHTER:** won its last two (most recently C3 1600m at Sha Tin on 27-Sep at 1.7). It is top-rated by MC (rating 82, 4 runs at the trip) and rides with Purton (22%). It carries top weight (135) from draw 9 after a +13 rating rise.
- **#7 JOYFUL JOY:** has 1-3-1 from just 3 runs and steps up from a Class 4 win. Draw 3 helps. The sample is thin.
- **#4 MISTER DAPPER and #2 SMART AVENUE:** these are the MC value plays and share the fastest projected time. Both are big prices, and #2 is drawn 14.
- **#14 MASTER LUCKY:** has consistent form (4-2-1-2-3-5) and the inside draw (2). The market rates it 3rd, but it has no runs at 1600m.

No pace or running-style read is available without SCMP Star Form.

### TRIO POOL (any order)

```
POOL: #1, #7, #4, #2, #14
MODE: A | POOL SIZE: 5

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #1 PACKING FIGHTER (Adj Place% 85.0% capped; raw 89.4%) ← locked in every combo
腳 (Legs):  #7, #4, #2, #14
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS (Harville approximation from raw MC Win%):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #1, #7, #4 | 27.1% | $3.7 |
| 2 | #1, #7, #2 | 17.1% | $5.8 |
| 3 | #1, #4, #2 | 13.6% | $7.3 |
| 4 | #1, #7, #14 | 7.9% | $12.7 |
| 5 | #1, #4, #14 | 6.3% | $16.0 |
| 6 | #1, #2, #14 | 3.9% | $25.6 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 6 (膽拖: C(4,2), banker #1 + legs 7,4,2,14)
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

ALL COMBINATIONS (est. prob):
  1-7-4 27.1% | 1-7-2 17.1% | 1-4-2 13.6% | 1-7-14 7.9% | 1-4-14 6.3% | 1-2-14 3.9%
  Ticket coverage (sum): ~75.9%

PASS CONDITIONS:
- If #1 PACKING FIGHTER (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good to Firm)

CONFIDENCE: HIGH (banker structure); value is in the legs #4 and #2, because the 1-7 core will pay short
```

---

## STRATEGY B (MC-only)

```
Banker: #1 PACKING FIGHTER (MC Win% 59.0%, MC Place% 89.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #7 (55.5%), #4 (50.5%), #2 (39.6%), #14 (25.2%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none (#14 is 25.2% but 6.1 odds)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none (next shortest outside the legs is #12 at 15)
Action: no replacement or addition
Final legs: #7, #4, #2, #14
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

STRATEGY B TICKET: 膽 #1 / 腳 #7, #4, #2, #14
  1-7-4 27.1% | 1-7-2 17.1% | 1-4-2 13.6% | 1-7-14 7.9% | 1-4-14 6.3% | 1-2-14 3.9%
  Ticket coverage (sum): ~75.9%
```

Comparison: Strategies A and B are identical in this race. Mode A's 5-horse pool equals the banker plus all four MC Place% > 20% legs, and the Win-odds rule does nothing. Without SCMP adjustments, the two strategies cannot diverge here.

---

## CAVEATS

- **Retrospective run:** generated 2026-10-20, blind to results. The scheduled pre-race run was missed.
- **Odds are final SP, not morning odds.** They include late market moves that a pre-race run would not have seen, so the market comparisons (undervalued/overvalued) reflect closing prices.
- **SCMP unavailable (retrospective run).** SCMP racecard pages now show the 21-Oct Happy Valley card. As a result there are no Star Form, TIR, vet, trackwork, QP/Q matrix or running-style inputs. Strategy A adjustments are all 0, so Adj% = MC%; #1 is capped at 50%/85% only for display. Strategy B is unaffected.
- The banker is a 1.9 favourite, so trios built on the #1-#7 core (both market top-2) will pay short. Ticket value depends on #4 (43) or #2 (79) making the frame. The MC rates these far above the market, which is a large model/market disagreement worth noting.
- #1 carries top weight (135 lb) after a +13 rating rise. #7 has only 3 career runs and is up in class from C4. #14 (market 3rd choice) has no runs at the 1600m trip.
- The finish-time projection puts #2 and #4 0.56s ahead of #1. The model does not adjust for weight, and #2 has the widest draw (14).
- Trio combination probabilities are a Harville approximation from raw MC Win%, not direct MC trio counts.
- Historical sync, odds fetch and racecard scrape were intentionally not run. The data is the prepared leak-free snapshot.

```
═══════════════════════════════════════════════════════════
```
