# Trio Strategy — Happy Valley | 2026-09-23 | Race 7

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-23 | Race 7
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all --use-saved --hide-actual)
SCMP DATA: ❌ Skipped (post-meeting blind run) — Step 3c not applied; Strategy A = raw MC
ODDS SOURCE: Momentum collector last pre-off snapshot (data/odds/odds_20260923_HV.json, R7 captured 13:44:49Z = 21:44 HKT, 11s before post)
             SCMP odds: ❌ skipped | HKJC live: ❌ not fetched (blind run) | Place odds: ✅ in snapshot
             (analyzer itself used the saved racecard winOdds, slightly earlier: #8 4.8 / #1 5.1 / #12 5.6 / #3 7.5 …)

RACE: R7 — Class 3 | 1200m | Turf | Good | 12 runners (MOUNT BUTLER HANDICAP)
CLASSIFICATION: Competitive (#6 Adj Win% 21.2%, in the 20–35% band) | POOL SIZE: 6
MODE: B: Standard Pool (6) — top 3 by Adj Win% + 3 by Adj Place%
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Happy Valley 2026-09-23 | Going: Good | Surface: Turf
Target Race(s): R7 (Class 3 | 1200m | 12 runners)
Scratchings: none (all 12 racecard runners present in the R7 odds snapshot)
Odds coverage: 12/12 horses with win + place odds
SCMP data: ❌ unavailable (skipped — post-meeting blind run)
Form: 12/12 runners with form data; no debutants. #5 PASS LINE has only 2 starts (sparse form)
Long layoffs (> 90 days): #8 WUKONG JEWELLERY (last run 2026-03-15, ~192d), #2 SYMBOL OF STRENGTH (2026-06-24, ~91d)
Other: #1 / #4 / #5 / #7 / #11 / #12 last ran in July (70–77d, summer break);
       #3, #6, #9, #10 have run this season (10–17d ago)
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 6 | POWER KOEPP | 21.2% | 53.1% | 22 | ✅ | ❌ | 5/4/1/6/6/4 | ★ 膽 (Banker) | 3-6: 8.8% (11.4) |
| 3 | AKASHVANI | 18.5% | 48.3% | 7.2 | ✅ | ✅ | 6/13/8/10/7/6 | 腳 (Leg) | 4-6: 7.5% (13.4) |
| 4 | YOUNG EMPEROR | 16.0% | 44.4% | 17 | ✅ | ❌ | 4/3/6/5/3/3 | 腳 (Leg) | 6-11: 7.2% (13.9) |
| 11 | PRESTIGE ALWAYS | 14.9% | 41.4% | 16 | ✅ | ❌ | 1/10/5/6/8/7 | 腳 (Leg) | 6-10: 7.2% (13.9) |
| 10 | ANODE | 14.3% | 41.3% | 32 | ✅ | ❌ | 7/1/11/11/7/7 | 腳 (Leg) | 3-4: 6.3% (15.7) |
| 7 | CALIFORNIA BLITZ | 4.5% | 19.9% | 19 | ❌ | ❌ | 5/8/3/2/3/1 | — | — |
| 2 | SYMBOL OF STRENGTH | 2.8% | 12.5% | 11 | ❌ | ❌ | 5/6/8/4/5/1 | — | — |
| 1 | FLYING WROTE | 2.6% | 13.1% | 5.0 | ❌ | ✅ | 9/2/1/2/5/6 | 腳 (Leg) — added (candidate) | — |
| 8 | WUKONG JEWELLERY | 2.6% | 11.5% | 4.2 | ❌ | ✅ | 2/5/8/12/1/6 | 腳 (Leg) — added (candidate) | — |
| 5 | PASS LINE | 0.9% | 4.9% | 42 | ❌ | ❌ | 10/11 | — | — |
| 12 | DARYL FLASH | 0.9% | 4.7% | 4.4 | ❌ | ✅ | 8/6/13/8/8/8 | 腳 (Leg) — added (candidate) | — |
| 9 | KING MILES | 0.8% | 4.9% | 16 | ❌ | ❌ | 9/13/8/10/12/5 | — | — |

Market: Overround 23.2%. MC and the market strongly disagree. The market's top 3 (#8 WUKONG JEWELLERY 4.2, #12 DARYL FLASH 4.4, #1 FLYING WROTE 5.0) are all ≤ 2.6% win in MC. MC's top 5 (#6, #3, #4, #11, #10) includes three horses at 16–32 in the market. Flagged undervalued: #6 by 197%, #10 by 186%, #4 by 155%. Analyzer single bets: Place #6 (HK$500), Place #4 (HK$500).

## STRATEGY A

### HORSE RANKINGS

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 6 | POWER KOEPP | 21.2% | 53.1% | 0 | 0 | 21.2% | 53.1% | 22 | K C Leung | — | — (skipped) | ★ 膽 (Banker) |
| 3 | AKASHVANI | 18.5% | 48.3% | 0 | 0 | 18.5% | 48.3% | 7.2 | Z Purton | — | — (skipped) | 腳 (Leg) |
| 4 | YOUNG EMPEROR | 16.0% | 44.4% | 0 | 0 | 16.0% | 44.4% | 17 | L Ferraris | — | — (skipped) | 腳 (Leg) |
| 11 | PRESTIGE ALWAYS | 14.9% | 41.4% | 0 | 0 | 14.9% | 41.4% | 16 | H Y Yuen | — | — (skipped) | 腳 (Leg) |
| 10 | ANODE | 14.3% | 41.3% | 0 | 0 | 14.3% | 41.3% | 32 | E C W Wong | — | — (skipped) | 腳 (Leg) |
| 7 | CALIFORNIA BLITZ | 4.5% | 19.9% | 0 | 0 | 4.5% | 19.9% | 19 | M Chadwick | — | — (skipped) | 腳 (Leg) |
| 2 | SYMBOL OF STRENGTH | 2.8% | 12.5% | 0 | 0 | 2.8% | 12.5% | 11 | B Avdulla | — | — | — |
| 1 | FLYING WROTE | 2.6% | 13.1% | 0 | 0 | 2.6% | 13.1% | 5.0 | C L Chau | — | — | — |
| 8 | WUKONG JEWELLERY | 2.6% | 11.5% | 0 | 0 | 2.6% | 11.5% | 4.2 | A Atzeni | — | — | — |
| 5 | PASS LINE | 0.9% | 4.9% | 0 | 0 | 0.9% | 4.9% | 42 | M F Poon | — | — | — |
| 12 | DARYL FLASH | 0.9% | 4.7% | 0 | 0 | 0.9% | 4.7% | 4.4 | Y L Chung | — | — | — |
| 9 | KING MILES | 0.8% | 4.9% | 0 | 0 | 0.8% | 4.9% | 16 | H Bentley | — | — | — |

Factor columns are `0` for all runners because SCMP was skipped (post-meeting blind run), so Adj = raw MC. Running style was not assessed (no SCMP Star Form).

Reasoning: #6 POWER KOEPP (rating 68, 127 lb, draw 7, ran 4th on 2026-09-09, 10 runs at the trip) is MC's top pick at 21.2% / 53.1%. It has 10 starts, so it can be banker. The race is Competitive (21.2%), so Mode B applies. The top 3 by Adj Win% are #6, #3 AKASHVANI (Purton, but drawn 10 and has not placed in its last 6) and #4 YOUNG EMPEROR (consistent placer 4/3/6/5/3/3, but drawn 12). #11 PRESTIGE ALWAYS (41.4%, light weight) and #10 ANODE (41.3%, won 2 starts back, ran 10 days ago) are over the 25% must-include line. The 6th spot goes to #7 CALIFORNIA BLITZ, next by Adj Place% (19.9%; placed in 4 of its last 5). The 2nd-ranked horse, #3, is at 48.3% Adj Place%, below the 63% needed, so there is no 雙膽拖. The three market favourites (#8, #12, #1) stay out of Strategy A on MC grounds. None has a negative flag, so Rule 9 does not force them in. Strategy B covers them.

Note on the finish-time projection (independent pass): it has #2 SYMBOL OF STRENGTH and #4 YOUNG EMPEROR fastest (1:09.61), #5 PASS LINE +0.14s, #3 +0.56s, #1 +0.70s, and banker #6 only 7th (+1.54s). This supports #4 and #3 as legs. It is also a clear warning against #6 as banker.

### TRIO POOL (any order)

```
POOL: #6, #3, #4, #11, #10, #7
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #6 POWER KOEPP (Adj Place% 53.1%) ← locked in every combo
腳 (Legs):  #3, #4, #11, #10, #7
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville trio probability from MC Win%; fair odds = 1/p):

| Rank | Horses (any order) | Est. Trio Prob | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #6, #3, #4 | 7.4% | $14 |
| 2 | #6, #3, #11 | 6.8% | $15 |
| 3 | #6, #3, #10 | 6.4% | $16 |
| 4 | #6, #4, #11 | 5.6% | $18 |
| 5 | #6, #4, #10 | 5.4% | $19 |

### TICKET SUMMARY

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TOP COMBINATIONS (highest value):
  6-3-4 (7.4%), 6-3-11 (6.8%), 6-3-10 (6.4%), 6-4-11 (5.6%), 6-4-10 (5.4%),
  6-11-10 (4.9%), 6-3-7 (1.8%), 6-4-7 (1.5%), 6-11-7 (1.4%), 6-10-7 (1.3%)
  Estimated ticket coverage (Harville): ~42.5%

PASS CONDITIONS:
- If #6 POWER KOEPP (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good)
- Consider a stake cut or PASS: the edge is almost entirely model vs market (banker is 22 in the market)

CONFIDENCE: LOW (competitive race with a 21.2% top pick; MC's top 5 and the market's top 3
            do not overlap except #3; finish-time projection has the banker only 7th)

CAVEATS:
- SCMP skipped (post-meeting blind run): no Star Form / TIR / Vet / Trackwork / QP-Q matrix; Strategy A = raw MC.
- The analyzer priced with the saved racecard winOdds (slightly earlier than the momentum snapshot);
  the table and Strategy B flags use the last pre-off snapshot (data/odds/odds_20260923_HV.json).
  In both odds sets the same three horses (#8, #12, #1) are the < 10 candidates, so Strategy B is the same either way.
- Trio combo probabilities use a Harville approximation from MC Win%, not a direct MC trio count.
- Big model/market split: the market's top 3 (#8 4.2, #12 4.4, #1 5.0) are rated 0.9–2.6% win by MC.
  #12 DARYL FLASH (form 8/6/13/8/8/8) at 4.4 shows a market move the model cannot see.
- Banker #6 is 8 years old (the SCMP -age flag would apply in C3, but it could not be checked); the finish-time projection has it 7th.
- HV 1200m C3: draws matter. #4 gate 12, #7 gate 11, #3 gate 10 are all pool horses.
- #8 WUKONG JEWELLERY is off ~192 days; #5 PASS LINE has only 2 starts.
- Historical sync, live odds fetch and SCMP deliberately not run (blind run); used the historical data already on disk.
```

## STRATEGY B (MC-only)

```
Banker: #6 POWER KOEPP (MC Win% 21.2%, MC Place% 53.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3, #4, #11, #10
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none (all primary legs ≥ 41%)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10):
    #8 WUKONG JEWELLERY (Win odds 4.2, MC Place% 11.5%)
    #12 DARYL FLASH (Win odds 4.4, MC Place% 4.7%)
    #1 FLYING WROTE (Win odds 5.0, MC Place% 13.1%)
Action: all three added directly (no replaceable leg)
Final legs: #3, #4, #11, #10, #8, #12, #1
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 (fixed)
TOTAL STAKE: $210

STRATEGY B TICKET: 膽 #6 / 腳 #3, #4, #11, #10, #8, #12, #1 (21 combos)
  6-3-4 (7.4%), 6-3-11 (6.8%), 6-3-10 (6.4%), 6-4-11 (5.6%), 6-4-10 (5.4%),
  6-11-10 (4.9%), 6-3-8 (1.0%), 6-3-1 (1.0%), 6-4-8 (0.9%), 6-4-1 (0.9%),
  6-11-8 (0.8%), 6-11-1 (0.8%), 6-10-8 (0.7%), 6-10-1 (0.7%), 6-3-12 (0.3%),
  6-4-12 (0.3%), 6-11-12 (0.3%), 6-10-12 (0.3%), 6-8-1 (0.1%), 6-12-1 (<0.1%), 6-8-12 (<0.1%)
  Estimated ticket coverage (Harville): ~44.7%
```

Comparison: Same banker (#6). B drops #7 and adds the three market favourites #8, #12 and #1. That doubles the cost ($210 vs $100) for about 2 points more estimated coverage under MC. It works as a hedge only if the market is right and MC has underrated the favourites.

```
═══════════════════════════════════════════════════════════
```
