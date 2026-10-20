# Trio (單T) Strategy — Sha Tin | 2026-10-19 | Race 6

> Retrospective run (generated 2026-10-20, blind to results; odds = final SP)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-19 | Race 6
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --use-saved, --hide-actual)
SCMP DATA: ❌ Unavailable (retrospective run — SCMP racecard pages now show the 21-Oct Happy Valley card)
ODDS SOURCE: Final starting prices (SP) from saved race-card snapshot, as loaded by analyze-race.ts
             SCMP odds: ❌ not available | HKJC live: ❌ no longer available (meeting completed)

RACE: R6 — Class 4 | 1000m | Turf | Good | 14 runners (SUN TIN WAI HANDICAP)
CLASSIFICATION: Dominant (top Adj Win% 37.8%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE: 雙膽拖 2膽 + 3腳 = 3 combos (2nd-ranked #3 Adj Place% 74.0% ≥ 63%)
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Sha Tin 2026-10-19 | Going: Good | Surface: Turf
Target Race(s): R6 (Class 4 | 1000m | 14 runners)
Scratchings: none
Odds coverage: 14 horses with odds (final SP)
SCMP data: ❌ unavailable (retrospective run)
```

- ≥3 starters ✅ | Odds populated for all 14 ✅ | Jockey/trainer stats loaded ✅
- **Debutants (no race form):** #5 AURORA PHOENIX (9.4) and #6 BREAK HEAVEN (12). MC rates them from rating/connections only, so their figures are low-confidence.
- **Sparse form:** #9 DAILY FUN (3 runs), #2 HIGH PRAISE (4), #7 EVER WEALTH (4), #3 RUBY THRIVE (5).
- **Layoffs:** #1 ARGENTO OCEAN (last run 10-Jun, ~131 days) and #4 SPARKLING FELLOW (last run 7-Jun, ~134 days). #10 SUNNY Q is backing up quickly (last run 11-Oct, 8 days).

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 10 | SUNNY Q | 37.8% | 78.0% | 4.8 | ✅ | ✅ | 1-3-6-2-7-3 | ★ 膽 (Banker) | 3-10: 29.3% (3.4) |
| 3 | RUBY THRIVE | 31.6% | 74.0% | 4.8 | ✅ | ✅ | 1-2-3-7-14 | 腳 (Leg) | 1-10: 17.6% (5.7) |
| 1 | ARGENTO OCEAN | 18.4% | 59.1% | 22 | ✅ | ❌ | 5-3-2-5-2-5 | 腳 (Leg) | 1-3: 15.1% (6.6) |
| 6 | BREAK HEAVEN | 2.4% | 15.0% | 12 | ❌ | ❌ | debut | — | 6-10: 2.9% (34.7) |
| 2 | HIGH PRAISE | 2.1% | 13.5% | 70 | ❌ | ❌ | 8-11-11-12 | — | 2-10: 2.6% (39.1) |
| 11 | PRECISION MIND | 1.5% | 10.7% | 23 | ❌ | ❌ | 6-2-13-9-12-6 | — | — |
| 7 | EVER WEALTH | 1.3% | 10.3% | 36 | ❌ | ❌ | 11-6-3-3 | — | — |
| 5 | AURORA PHOENIX | 1.1% | 8.2% | 9.4 | ❌ | ✅ | debut | 腳 (Leg) — added (win-odds candidate) | — |
| 12 | SUPREME VOYAGER | 1.0% | 8.3% | 9.5 | ❌ | ✅ | 3-11-5-14-8-7 | 腳 (Leg) — added (win-odds candidate) | — |
| 8 | ZOUPER FELLOW | 1.0% | 7.9% | 4.6 | ❌ | ✅ | 2-10-12-6-11-1 | 腳 (Leg) — added (win-odds candidate) | — |
| 9 | DAILY FUN | 0.9% | 7.5% | 83 | ❌ | ❌ | 13-8-10 | — | — |
| 13 | GOLDENTRONICMIGHTY | 0.5% | 4.6% | 34 | ❌ | ❌ | 12-13-5-7-7-7 | — | — |
| 14 | ZETA HEDGE | 0.2% | 1.2% | 71 | ❌ | ❌ | 7-8-12-11-13-12 | — | — |
| 4 | SPARKLING FELLOW | 0.1% | 1.8% | 9.5 | ❌ | ✅ | 11-3-8-10-2-4 | 腳 (Leg) — added (win-odds candidate) | — |

Market: Overround 22.1%. The model and the market disagree sharply. MC has three clear horses (#10, #3, #1 = 87.8% combined win), but the market favourite is #8 ZOUPER FELLOW (4.6), whom MC rates at 1.0% (flagged overvalued 95%). MC rates #1 ARGENTO OCEAN at 18.4% against about 4.5% implied at 22 (flagged undervalued 305%). #4 SPARKLING FELLOW (9.5) is flagged overvalued 99%. The analyzer's own bets were Place #1 @4.32 and Place #10 @2.68 (HK$500 each).

---

## STRATEGY A

### HORSE RANKINGS

SCMP was unavailable, so all factors are 0 and Adj% = MC%.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 10 | SUNNY Q | 37.8% | 78.0% | 0 | 0 | 37.8% | 78.0% | 4.8 | A Badel | — | — (n/a) | ★ 膽 (Banker 1) |
| 3 | RUBY THRIVE | 31.6% | 74.0% | 0 | 0 | 31.6% | 74.0% | 4.8 | Z Purton | — | — (n/a) | ★ 膽 (Banker 2) |
| 1 | ARGENTO OCEAN | 18.4% | 59.1% | 0 | 0 | 18.4% | 59.1% | 22 | H Y Yuen | — | — (n/a) | 腳 (Leg) |
| 6 | BREAK HEAVEN | 2.4% | 15.0% | 0 | 0 | 2.4% | 15.0% | 12 | C L Chau | — | — (n/a) | 腳 (Leg) |
| 2 | HIGH PRAISE | 2.1% | 13.5% | 0 | 0 | 2.1% | 13.5% | 70 | K C Leung | — | — (n/a) | 腳 (Leg) |
| 11 | PRECISION MIND | 1.5% | 10.7% | 0 | 0 | 1.5% | 10.7% | 23 | K Teetan | — | — (n/a) | — |
| 7 | EVER WEALTH | 1.3% | 10.3% | 0 | 0 | 1.3% | 10.3% | 36 | J Orman | — | — (n/a) | — |
| 5 | AURORA PHOENIX | 1.1% | 8.2% | 0 | 0 | 1.1% | 8.2% | 9.4 | M L Yeung | — | — (n/a) | — |
| 12 | SUPREME VOYAGER | 1.0% | 8.3% | 0 | 0 | 1.0% | 8.3% | 9.5 | H Bentley | — | — (n/a) | — |
| 8 | ZOUPER FELLOW | 1.0% | 7.9% | 0 | 0 | 1.0% | 7.9% | 4.6 | P N Wong | — | — (n/a) | — |
| 9 | DAILY FUN | 0.9% | 7.5% | 0 | 0 | 0.9% | 7.5% | 83 | Y L Chung | — | — (n/a) | — |
| 13 | GOLDENTRONICMIGHTY | 0.5% | 4.6% | 0 | 0 | 0.5% | 4.6% | 34 | M F Poon | — | — (n/a) | — |
| 14 | ZETA HEDGE | 0.2% | 1.2% | 0 | 0 | 0.2% | 1.2% | 71 | H T Mo | — | — (n/a) | — |
| 4 | SPARKLING FELLOW | 0.1% | 1.8% | 0 | 0 | 0.1% | 1.8% | 9.5 | B Avdulla | — | — (n/a) | — |

Note: ★ 膽 = Banker. #10 has 10 form lines and #3 has 5, so both are eligible bankers (≥2 starts). #3's Adj Place% of 74.0% is ≥ 63%, so the race qualifies for 雙膽拖.

**Reasoning:** The top Adj Win% is 37.8% (#10 SUNNY Q), which makes the race Dominant, so it uses Mode A. The pool is the banker plus 4 contenders by Adj Place%: #3 (74.0%), #1 (59.1%), #6 (15.0%) and #2 (13.5%). Every horse with Adj Place% ≥ 25% is included.

- **#10 SUNNY Q** won last start (11-Oct) and has the fastest projected time (56.14s).
- **#3 RUBY THRIVE** has run 1-2-3 in its last three, has 4 runs at the trip, and has Purton (22% from 102 rides). However, it carries 132 lb from draw 14.
- **#1 ARGENTO OCEAN** projects only 0.28s behind #10, but it returns from a ~131-day layoff and has no runs at 1000m.
- **#6 and #2** fill the last two slots on Place% alone, so they are weak legs. #6 is a debutant.

The market-favoured #8 (4.6), #5, #12 and #4 (all under 10) are outside the Strategy A pool on MC. No pace read is available without SCMP Star Form.

### TRIO POOL (any order)

```
POOL: #10, #3, #1, #6, #2
MODE: A | POOL SIZE: 5

雙膽拖 STRUCTURE:
膽 (Bankers): #10 SUNNY Q (Adj Place% 78.0%), #3 RUBY THRIVE (Adj Place% 74.0%) ← locked in every combo
腳 (Legs):   #1, #6, #2
BET STRUCTURE: 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: 3
```

TOP TRIO COMBINATIONS (Harville approximation from MC Win%):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #10, #3, #1 | 48.3% | $2.1 |
| 2 | #10, #3, #6 | 5.2% | $19.1 |
| 3 | #10, #3, #2 | 4.6% | $21.9 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 3 (雙膽拖: bankers #10 + #3, legs 1, 6, 2)
UNIT BET: $10 (fixed)
TOTAL STAKE: $30

ALL COMBINATIONS (est. prob):
  10-3-1 48.3% | 10-3-6 5.2% | 10-3-2 4.6%
  Ticket coverage (sum): ~58.1%
  Both bankers top 3 (Harville est.): ~58% (MC place% product 78.0 × 74.0 ≈ 58%)

PASS CONDITIONS:
- If #10 SUNNY Q or #3 RUBY THRIVE (bankers) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good)

CONFIDENCE: MEDIUM (MC structure is strong. The market strongly disagrees about the #8 favourite, and #1 is the key third leg coming off a long layoff.)
```

---

## STRATEGY B (MC-only)

```
Banker: #10 SUNNY Q (MC Win% 37.8%, MC Place% 78.0%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3 (74.0%), #1 (59.1%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #8 ZOUPER FELLOW (4.6, MC Place% 7.9%), #5 AURORA PHOENIX (9.4, 8.2%),
  #12 SUPREME VOYAGER (9.5, 8.3%), #4 SPARKLING FELLOW (9.5, 1.8%)
Action: no replaceable leg → all 4 candidates added directly
Final legs: #3, #1, #8, #5, #12, #4
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #10 / 腳 #3, #1, #8, #5, #12, #4
  10-3-1 48.3% | 10-3-5 2.4% | 10-3-12 2.2% | 10-3-8 2.2% | 10-1-5 1.0%
  10-1-12 0.9% | 10-1-8 0.9% | 10-3-4 0.2% | 10-1-4 0.1% | other 6 combos ~0.0%
  Ticket coverage (sum): ~58.4%
```

Comparison: Strategy B uses one banker (#10 only) and adds four market-backed horses (#8, #5, #12, #4) that MC rates at ≤ 8.3% place. That costs $150 for 15 combos against Strategy A's $30 for 3 combos, with almost the same MC coverage (~58.4% vs ~58.1%). Strategy B wins in cases Strategy A does not: when #3 misses the top 3 but #10 places with #1 or a market horse. Strategy A wins when #10 + #3 place with #6 or #2.

---

## CAVEATS

- **Retrospective run:** generated 2026-10-20, blind to results. The scheduled pre-race run was missed.
- **Odds are final SP, not morning odds.** They include late market moves that a pre-race run would not have seen, so the Strategy B win-odds candidates and the undervalued/overvalued flags reflect closing prices.
- **SCMP unavailable (retrospective run).** There are no Star Form, TIR, vet, trackwork, QP/Q matrix or running-style inputs. Strategy A adjustments are all 0, so Adj% = MC%. Strategy B is unaffected.
- **Large model/market disagreement.** MC rates the market favourite #8 ZOUPER FELLOW (4.6) at only 1.0% win. Its jockey P N Wong is 0% from 52 rides in the historical data. MC also rates #1 ARGENTO OCEAN at 18.4% against 22 odds. Either one is a significant model risk.
- **#1 ARGENTO OCEAN** returns from a ~131-day layoff and has no recorded 1000m runs, yet it is the key third leg in both strategies (48% of the estimated coverage sits on 10-3-1).
- **Debutants #5 and #6** have no form, so their MC figures are low-confidence. #6 is a Strategy A leg and #5 is a Strategy B leg.
- **雙膽拖 risk:** both #10 and #3 must place, which is about 58% by the MC estimate. #3 carries 132 lb from draw 14.
- Trio combination probabilities are a Harville approximation from MC Win%, not direct MC trio counts.
- Historical sync, odds fetch and racecard scrape were intentionally not run. The data is the prepared leak-free snapshot.
```
═══════════════════════════════════════════════════════════
```
