# Trio Strategy — Happy Valley | 2026-09-23 | Race 6

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-23 | Race 6
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all --use-saved --hide-actual)
SCMP DATA: ❌ Skipped (post-meeting blind run) — Step 3c not applied; Strategy A = raw MC
ODDS SOURCE: Momentum collector last pre-off snapshot (data/odds/odds_20260923_HV.json, R6 captured 13:09:33Z = 21:09 HKT, 26s before post)
             SCMP odds: ❌ skipped | HKJC live: ❌ not fetched (blind run) | Place odds: ✅ in snapshot
             (analyzer itself used the saved racecard winOdds, slightly earlier: #1 3.4 / #4 3.2 / #12 6.3 …)

RACE: R6 — Class 4 | 1000m | Turf | Good | 12 runners (ISLAND HANDICAP)
CLASSIFICATION: Dominant (#1 Adj Win% 55.9% ≥ 35%) | POOL SIZE: 6
MODE: A: Tight Pool (5) + 1 forced by Rule 8 (Adj Place% ≥ 20% must be in pool)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Happy Valley 2026-09-23 | Going: Good | Surface: Turf
Target Race(s): R6 (Class 4 | 1000m | 12 runners)
Scratchings: none (all 12 racecard runners present in the R6 odds snapshot)
Odds coverage: 12/12 horses with win + place odds
SCMP data: ❌ unavailable (skipped — post-meeting blind run)
Form: 12/12 runners with form data; no debutants (fewest starts: #7, #10 with 3)
Long layoffs (> 90 days): #7 SECRET INGREDIENT (last run 2026-05-31, ~115d),
      #8 FLYING TING LOK (2026-06-10, ~105d), #10 CASA BUDDY (2026-05-17, ~129d)
Other: #2 / #11 / #12 last ran 2026-07-08 (~77d, summer break)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 1 | JUMBO BLESSING | 55.9% | 85.4% | 3.1 | ✅ | ✅ | 1/1/6/4/7/5 | ★ 膽 (Banker) | 1-4: 16.3% (6.1) |
| 4 | SUPERB KING | 10.0% | 41.3% | 2.9 | ✅ | ✅ | 2/6/4/2/2/3 | 腳 (Leg) | 1-5: 14.3% (7.0) |
| 5 | GEORGIAN SIGMA | 8.8% | 37.3% | 7.7 | ✅ | ✅ | 3/7/3/3/3/4 | 腳 (Leg) | 1-11: 14.1% (7.1) |
| 11 | HAPPY UNITED | 8.7% | 36.7% | 19 | ✅ | ❌ | 1/7/8/6/5/3 | 腳 (Leg) | 1-3: 7.7% (13.0) |
| 3 | BLUE ILLUSION | 4.3% | 22.4% | 27 | ✅ | ❌ | 9/8/9/11/9/9 | 腳 (Leg) | 1-9: 7.1% (14.1) |
| 9 | HARMONY FIRE | 4.0% | 21.5% | 14 | ✅ | ❌ | 4/3/3/6/3/7 | — (replaced by #12) | — |
| 2 | COPPER CORE | 2.6% | 16.0% | 59 | ❌ | ❌ | 11/10/10/11 | — | — |
| 6 | DOUBLE ALPHA | 2.3% | 14.4% | 28 | ❌ | ❌ | 6/10/8/2 | — | — |
| 12 | MAPOGO | 1.6% | 10.4% | 6.2 | ❌ | ✅ | 5/11/7/6/4 | 腳 (Leg) — replacement | — |
| 8 | FLYING TING LOK | 1.2% | 9.4% | 43 | ❌ | ❌ | 12/5/12/14/7/11 | — | — |
| 7 | SECRET INGREDIENT | 0.5% | 3.7% | 47 | ❌ | ❌ | 12/10/2 | — | — |
| 10 | CASA BUDDY | 0.1% | 1.4% | 74 | ❌ | ❌ | 12/13/13 | — | — |

Market: Overround 22.5%. MC makes #1 JUMBO BLESSING (back-to-back winner, draw 6, 7 runs at the trip) a strong top pick (55.9% vs ~32% implied at 3.1 — flagged undervalued by 90%); the market favourite #4 SUPERB KING (2.9) is only 10.0% in MC. #12 MAPOGO (6.2, market 3rd) is strongly opposed by MC (1.6% win, flagged overvalued by 90%). Analyzer single bets: Place #1 (HK$500), Place #11 (HK$450), Place #5 (HK$50).

## STRATEGY A

### HORSE RANKINGS

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 1 | JUMBO BLESSING | 55.9% | 85.4% | 0 | 0 | 55.9% | 85.4% | 3.1 | C Y Ho | — | — (skipped) | ★ 膽 (Banker) |
| 4 | SUPERB KING | 10.0% | 41.3% | 0 | 0 | 10.0% | 41.3% | 2.9 | C L Chau | — | — (skipped) | 腳 (Leg) |
| 5 | GEORGIAN SIGMA | 8.8% | 37.3% | 0 | 0 | 8.8% | 37.3% | 7.7 | A Atzeni | — | — (skipped) | 腳 (Leg) |
| 11 | HAPPY UNITED | 8.7% | 36.7% | 0 | 0 | 8.7% | 36.7% | 19 | M Chadwick | — | — (skipped) | 腳 (Leg) |
| 3 | BLUE ILLUSION | 4.3% | 22.4% | 0 | 0 | 4.3% | 22.4% | 27 | J Orman | — | — (skipped) | 腳 (Leg) |
| 9 | HARMONY FIRE | 4.0% | 21.5% | 0 | 0 | 4.0% | 21.5% | 14 | P N Wong | — | — (skipped) | 腳 (Leg) |
| 2 | COPPER CORE | 2.6% | 16.0% | 0 | 0 | 2.6% | 16.0% | 59 | K C Leung | — | — | — |
| 6 | DOUBLE ALPHA | 2.3% | 14.4% | 0 | 0 | 2.3% | 14.4% | 28 | M F Poon | — | — | — |
| 12 | MAPOGO | 1.6% | 10.4% | 0 | 0 | 1.6% | 10.4% | 6.2 | K Teetan | — | — | — |
| 8 | FLYING TING LOK | 1.2% | 9.4% | 0 | 0 | 1.2% | 9.4% | 43 | H Y Yuen | — | — | — |
| 7 | SECRET INGREDIENT | 0.5% | 3.7% | 0 | 0 | 0.5% | 3.7% | 47 | H Bentley | — | — | — |
| 10 | CASA BUDDY | 0.1% | 1.4% | 0 | 0 | 0.1% | 1.4% | 74 | H T Mo | — | — | — |

Factor columns are `0` for all runners: SCMP skipped (post-meeting blind run), so Adj = raw MC. Running style not assessed (no SCMP Star Form).

Reasoning: #1 JUMBO BLESSING (rating 59, top weight 135 lb, draw 6, won its last two including 2026-09-09) is a dominant MC top (55.9% win / 85.4% place, rating 75 vs next best 61) with 8 starts → eligible banker. Mode A takes the next four by Adj Place%: #4 SUPERB KING (market fav, draw 3, consistent placer 2/6/4/2/2/3), #5 GEORGIAN SIGMA (placed in 5 of last 6, but draw 12), #11 HAPPY UNITED (light weight 120 lb, won 2026-07-08) and #3 BLUE ILLUSION (22.4%). #9 HARMONY FIRE (21.5%, three 3rds in last five) is added under Rule 8 (Adj Place% ≥ 20% must be in pool). 2nd-ranked #4 (Adj Place% 41.3%) < 63% → no 雙膽拖. #12 MAPOGO (6.2, market 3rd) is left out of A on MC grounds (10.4% place, no negative flags, so Rule 9 does not force it in); it is covered in Strategy B.

Note on the finish-time projection (independent pass): it has #4 SUPERB KING fastest (56.66s), #5 GEORGIAN SIGMA 2nd (+0.84s) and #1 only 3rd (+1.26s). This does not change the MC ranking, but it backs #4 and #5 as legs and is a warning that #1's win chance may be lower than 55.9%.

### TRIO POOL (any order)

```
POOL: #1, #4, #5, #11, #3, #9
MODE: A (+1 by Rule 8) | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #1 JUMBO BLESSING (Adj Place% 85.4%) ← locked in every combo
腳 (Legs):  #4, #5, #11, #3, #9
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville trio probability from MC Win%; fair odds = 1/p):

| Rank | Horses (any order) | Est. Trio Prob | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #1, #4, #5 | 10.9% | $9 |
| 2 | #1, #4, #11 | 10.8% | $9 |
| 3 | #1, #5, #11 | 9.3% | $11 |
| 4 | #1, #4, #3 | 5.0% | $20 |
| 5 | #1, #4, #9 | 4.6% | $22 |

### TICKET SUMMARY

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TOP COMBINATIONS (highest value):
  1-4-5 (10.9%), 1-4-11 (10.8%), 1-5-11 (9.3%), 1-4-3 (5.0%), 1-4-9 (4.6%),
  1-5-3 (4.3%), 1-11-3 (4.2%), 1-5-9 (4.0%), 1-11-9 (3.9%), 1-3-9 (1.8%)
  Estimated ticket coverage (Harville): ~58.8%

PASS CONDITIONS:
- If #1 JUMBO BLESSING (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good)
- If #1 drifts out sharply late (e.g. > 6) → reduce/skip; much of the edge is model vs market

CONFIDENCE: MEDIUM-HIGH (very strong MC banker, top 2 in the market, won last two;
            held back by the 1000m sprint variance and the finish-time projection having #1 only 3rd)

CAVEATS:
- SCMP skipped (post-meeting blind run): no Star Form / TIR / Vet / Trackwork / QP-Q matrix; Strategy A = raw MC.
- The analyzer priced with the saved racecard winOdds (slightly earlier than the momentum snapshot);
  the table and Strategy B flags use the last pre-off snapshot (data/odds/odds_20260923_HV.json).
  The MC ranking does not depend on this choice, but one Strategy B detail does: in the racecard
  odds #9 is exactly 10 (not > 10, so it cannot be replaced), and #12 would then replace #3 instead of #9.
- Trio combo probabilities use a Harville approximation from MC Win%, not a direct MC trio count.
- HV 1000m C4 sprint: 12 runners, draw matters. #5 has gate 12, #8 gate 11, #6 gate 10.
- Finish-time projection disagrees with MC on the winner (#4 > #5 > #1).
- #7 / #8 / #10 off 105–129 days; #9 HARMONY FIRE is 9 years old.
- Historical sync, live odds fetch and SCMP deliberately not run (blind run); used the historical data already on disk.
```

## STRATEGY B (MC-only)

```
Banker: #1 JUMBO BLESSING (MC Win% 55.9%, MC Place% 85.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #4, #5, #11, #3, #9
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
    #3 BLUE ILLUSION (22.4%, 27), #9 HARMONY FIRE (21.5%, 14)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10):
    #12 MAPOGO (Win odds 6.2, MC Place% 10.4%)
Action: #12 replaced #9 (lowest MC Place% among replaceable legs)
Final legs: #4, #5, #11, #3, #12
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #1 / 腳 #4, #5, #11, #3, #12 (10 combos)
  1-4-5 (10.9%), 1-4-11 (10.8%), 1-5-11 (9.3%), 1-4-3 (5.0%), 1-5-3 (4.3%),
  1-11-3 (4.2%), 1-4-12 (1.8%), 1-5-12 (1.5%), 1-11-12 (1.5%), 1-3-12 (0.7%)
  Estimated ticket coverage (Harville): ~50.0%
```

Comparison: Same banker and same cost ($100) as Strategy A. The only difference is #9 HARMONY FIRE (A) vs #12 MAPOGO (B). B follows the market on #12 (6.2) over MC's preference for #9, which costs about 9 points of estimated coverage.

```
═══════════════════════════════════════════════════════════
```
