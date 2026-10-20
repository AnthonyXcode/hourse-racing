# Trio (單T) Strategy — Sha Tin | 2026-10-19 | Race 7

> Retrospective run (generated 2026-10-20, blind to results; odds = final SP)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-19 | Race 7
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --use-saved, --hide-actual)
SCMP DATA: ❌ Unavailable (retrospective run — SCMP racecard pages now show the 21-Oct Happy Valley card)
ODDS SOURCE: Final starting prices (SP) from saved race-card snapshot, as loaded by analyze-race.ts
             SCMP odds: ❌ not available | HKJC live: ❌ no longer available (meeting completed)

RACE: R7 — Class 4 | 1200m | Turf | Good | 12 runners (LUNG HANG HANDICAP)
CLASSIFICATION: Dominant (top Adj Win% 36.8%, #4 ACE EAGLE) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE: 膽拖 1膽 + 4腳 → C(4,2) = 6  (banker = #3, see debutant rule)
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Sha Tin 2026-10-19 | Going: Good | Surface: Turf
Target Race(s): R7 (Class 4 | 1200m | 12 runners)
Scratchings: none
Odds coverage: 12 horses with odds (final SP)
SCMP data: ❌ unavailable (retrospective run)
```

- ≥3 starters ✅ | Odds populated for all 12 ✅ | Jockey/trainer stats loaded ✅
- **Sparse form:** #4 ACE EAGLE has only **1 career start** (2nd, ST 1200m C4, 21-Jun). That is also a ~120-day layoff. #6 PRIME ACE has 2 starts and #8 DANCING BLAZE has 3.
- **Long layoffs (>90 days):** #4 ACE EAGLE (21-Jun), #11 STAR FIGURE (24-Jun), #7 INCREDIBLE MOMENT (1-Jul), #5 FLYING HUNTER (12-Jul).

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 4 | ACE EAGLE | 36.8% | 70.6% | 2.2 | ✅ | ✅ | 2 | ★ 膽 (Banker) | 3-4: 16.6% (6.0) |
| 3 | SOLID CAR | 19.3% | 51.8% | 8.4 | ✅ | ✅ | 1-3-3-5-5-2 | 腳 (Leg) | 1-4: 9.7% (10.3) |
| 1 | ISLAND BUDDY | 11.7% | 38.0% | 14 | ✅ | ❌ | 13-3-3-3-9-2 | 腳 (Leg) | 2-4: 8.0% (12.5) |
| 2 | FLOWING RICHES | 8.8% | 32.6% | 6.4 | ✅ | ✅ | 1-11-10-8-3-3 | 腳 (Leg) | 4-8: 6.2% (16.3) |
| 8 | DANCING BLAZE | 7.3% | 28.0% | 21 | ✅ | ❌ | 6-9-4 | 腳 (Leg) | 4-6: 5.3% (19.0) |
| 6 | PRIME ACE | 5.2% | 23.4% | 15 | ✅ | ❌ | 9-3 | — (replaced by #10) | — |
| 10 | KA YING RADIANCE | 3.5% | 16.5% | 6.7 | ❌ | ✅ | 2-5-2-9-13-6 | 腳 (Leg) — replacement | — |
| 9 | GREEN FIELD PEARL | 3.3% | 15.7% | 91 | ❌ | ❌ | 13-4-10-10 | — | — |
| 7 | INCREDIBLE MOMENT | 3.0% | 14.5% | 20 | ❌ | ❌ | 8-6-5-1-8-4 | — | — |
| 12 | HEROIC VANGUARD | 0.9% | 5.7% | 84 | ❌ | ❌ | 7-12-8-7-11-5 | — | — |
| 11 | STAR FIGURE | 0.4% | 3.0% | 13 | ❌ | ❌ | 3-6-9-3-10-6 | — | — |
| 5 | FLYING HUNTER | 0.0% | 0.2% | 139 | ❌ | ❌ | 12-12-11-13-12 | — | — |

Market: Overround 22.2%. MC and market agree on the favourite, #4 ACE EAGLE (2.2), but MC rates it slightly shorter than the price (value 0.81). MC likes #3 SOLID CAR (8.4, value 1.62) and #1 ISLAND BUDDY (14, value 1.64) more than the market does. It rates the 3rd favourite #10 KA YING RADIANCE (6.7) much lower than the market (16.5% place). #11 STAR FIGURE (13) looks overvalued by the market. The analyzer's own bets were Place #3 @3.06 (HK$500), Place #1 @3.48 (HK$457) and Place #4 @1.65 (HK$43).

---

## STRATEGY A

### HORSE RANKINGS

SCMP was unavailable, so all factors are 0 and Adj% = MC%.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 4 | ACE EAGLE | 36.8% | 70.6% | 0 | 0 | 36.8% | 70.6% | 2.2 | Z Purton | — | — (n/a) | 腳 (Leg) — 1 start, banker-ineligible |
| 3 | SOLID CAR | 19.3% | 51.8% | 0 | 0 | 19.3% | 51.8% | 8.4 | J Orman | — | — (n/a) | ★ 膽 (Banker) |
| 1 | ISLAND BUDDY | 11.7% | 38.0% | 0 | 0 | 11.7% | 38.0% | 14 | K Teetan | — | — (n/a) | 腳 (Leg) |
| 2 | FLOWING RICHES | 8.8% | 32.6% | 0 | 0 | 8.8% | 32.6% | 6.4 | C L Chau | — | — (n/a) | 腳 (Leg) |
| 8 | DANCING BLAZE | 7.3% | 28.0% | 0 | 0 | 7.3% | 28.0% | 21 | C Y Ho | — | — (n/a) | 腳 (Leg) |
| 6 | PRIME ACE | 5.2% | 23.4% | 0 | 0 | 5.2% | 23.4% | 15 | A Atzeni | — | — (n/a) | — |
| 10 | KA YING RADIANCE | 3.5% | 16.5% | 0 | 0 | 3.5% | 16.5% | 6.7 | M F Poon | — | — (n/a) | — |
| 9 | GREEN FIELD PEARL | 3.3% | 15.7% | 0 | 0 | 3.3% | 15.7% | 91 | K C Leung | — | — (n/a) | — |
| 7 | INCREDIBLE MOMENT | 3.0% | 14.5% | 0 | 0 | 3.0% | 14.5% | 20 | H Y Yuen | — | — (n/a) | — |
| 12 | HEROIC VANGUARD | 0.9% | 5.7% | 0 | 0 | 0.9% | 5.7% | 84 | M L Yeung | — | — (n/a) | — |
| 11 | STAR FIGURE | 0.4% | 3.0% | 0 | 0 | 0.4% | 3.0% | 13 | L Hewitson | — | — (n/a) | — |
| 5 | FLYING HUNTER | 0.0% | 0.2% | 0 | 0 | 0.0% | 0.2% | 139 | H T Mo | — | — (n/a) | — |

Note: The 1st-ranked horse is #4 ACE EAGLE (Adj Win% 36.8%), but it has **only 1 career start**. Under the banker eligibility rule (no banker with fewer than 2 starts, from the 8-Mar review), it is demoted to a leg. The banker passes to the next-ranked eligible horse, **#3 SOLID CAR** (10 starts). 雙膽拖 is not used: the only other horse with Adj Place% ≥ 63% is #4, which cannot be a banker.

**Reasoning:** The top Adj Win% is 36.8%, which is at least 35%, so the race is Dominant and uses Mode A. The pool is #4 plus 4 contenders by Adj Place%: #3 (51.8%), #1 (38.0%), #2 (32.6%) and #8 (28.0%). Those are exactly the five horses with Adj Place% ≥ 25%, so the must-include rule is met. #6 PRIME ACE (23.4%) is the first horse left out.

- **#3 SOLID CAR** won last start (1-Oct, 1400m C4) and has a run of 1-3-3 in its latest three. Its rating is up 6. MC makes it the clear second choice, and the 3-4 quinella is MC's top pair at 16.6%.
- **#4 ACE EAGLE** has Purton (22% from 102 rides) and a good draw (3). Its one run was a 2nd at this course and distance. However, the 120-day layoff and single form line make its MC rating rest on thin evidence.
- **#1 ISLAND BUDDY** has the best projected time (1:09.09) and draw 1. Before a 13th last time, it had three straight 3rds at ST 1200m C4.
- **#2 FLOWING RICHES** won last start (27-Sep, 1000m) but is drawn 12, the widest gate.
- **#8 DANCING BLAZE** has only 3 starts. It gets in on Place% (28.0%) at 21.

No pace or running-style read is available without SCMP Star Form.

### TRIO POOL (any order)

```
POOL: #4, #3, #1, #2, #8
MODE: A | POOL SIZE: 5

膽拖 STRUCTURE (banker = top-ranked eligible horse):
膽 (Banker): #3 SOLID CAR (Adj Place% 51.8%) ← locked in every combo
腳 (Legs):  #4, #1, #2, #8
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS IN POOL (Harville approximation from MC Win%):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #4, #3, #1 | 12.5% | $8.0 |
| 2 | #4, #3, #2 | 9.0% | $11.1 |
| 3 | #4, #3, #8 | 7.4% | $13.6 |
| 4 | #4, #1, #2 | 4.9% | $20.5 (not on ticket — no #3) |
| 5 | #4, #1, #8 | 4.0% | $25.1 (not on ticket — no #3) |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 6 (膽拖: C(4,2), banker #3 + legs 4,1,2,8)
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

ALL COMBINATIONS (est. prob):
  3-4-1 12.5% | 3-4-2 9.0% | 3-4-8 7.4% | 3-1-2 1.9% | 3-1-8 1.5% | 3-2-8 1.1%
  Ticket coverage (sum): ~33.4%

PASS CONDITIONS:
- If #3 SOLID CAR (banker) is scratched → VOID ticket
- If #4 ACE EAGLE is scratched → reclassify (would become Competitive / Mode B)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good)

CONFIDENCE: MEDIUM-LOW (banker forced to the MC #2, which has 51.8% place)
```

---

## STRATEGY B (MC-only)

```
Banker: #4 ACE EAGLE (MC Win% 36.8%, MC Place% 70.6%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3 (51.8%), #1 (38.0%), #2 (32.6%), #8 (28.0%), #6 (23.4%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
   #8 DANCING BLAZE (MC Place% 28.0%, Win odds 21)
   #6 PRIME ACE (MC Place% 23.4%, Win odds 15)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10):
   #10 KA YING RADIANCE (Win odds 6.7, MC Place% 16.5%)
Action: #10 replaced #6 (the lowest MC Place% among replaceable legs)
Final legs: #3, #1, #2, #8, #10
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #4 / 腳 #3, #1, #2, #8, #10
  4-3-1 12.5% | 4-3-2 9.0% | 4-3-8 7.4% | 4-1-2 4.9% | 4-1-8 4.0%
  4-3-10 3.4% | 4-2-8 2.9% | 4-1-10 1.8% | 4-2-10 1.3% | 4-8-10 1.1%
  Ticket coverage (sum): ~48.2%
```

Comparison: The two strategies have different bankers. Strategy B anchors on #4 ACE EAGLE (70.6% MC place), which the debutant rule bars in Strategy A. Strategy A anchors on #3 SOLID CAR (51.8%), so its ticket is cheaper ($60) but covers less (~33% vs ~48%). Strategy B also brings in the market's 3rd favourite #10 for #6, and costs $100. The top three combos (3-4-1, 3-4-2, 3-4-8) are on both tickets.

---

## CAVEATS

- **Retrospective run:** generated 2026-10-20, blind to results. The scheduled pre-race run was missed.
- **Odds are final SP, not morning odds.** They include late market moves that a pre-race run would not have seen. Market comparisons and the Strategy B win-odds swap (#10 at 6.7) are based on closing prices.
- **SCMP unavailable (retrospective run).** SCMP racecard pages now show the 21-Oct Happy Valley card. As a result there are no Star Form, TIR, vet, trackwork, QP/Q matrix or running-style inputs. Strategy A adjustments are all 0, so Adj% = MC%. Strategy B is unaffected.
- **Banker split:** #4 ACE EAGLE is MC #1 and the 2.2 favourite, but it has 1 career start and is off a ~120-day layoff. Its 36.8% MC win rests on one form line (the analyzer flags it "sparse"). This is why Strategy A demotes it to a leg. If #4 runs to its price and #3 misses the frame, Strategy A loses the whole ticket.
- The Dominant classification (Mode A) depends entirely on #4's 36.8%. Without #4, the top Adj Win% would be 19.3% (Wide open).
- #2 FLOWING RICHES (draw 12) and #6 PRIME ACE (draw 11) have wide gates. These are not modelled as adjustments here.
- Trio combination probabilities are a Harville approximation from MC Win%, not direct MC trio counts.
- Historical sync, odds fetch and racecard scrape were intentionally not run. The data is the prepared leak-free snapshot.

```
═══════════════════════════════════════════════════════════
```
