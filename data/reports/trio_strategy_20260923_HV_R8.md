# Trio Strategy — Happy Valley | 2026-09-23 | Race 8

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-23 | Race 8
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all --use-saved --hide-actual)
SCMP DATA: ❌ Skipped (post-meeting blind run) — Step 3c not applied; Strategy A = raw MC
ODDS SOURCE: Momentum collector last pre-off snapshot (data/odds/odds_20260923_HV.json, R8 captured 14:14:15Z = 22:14 HKT, 44s before post)
             SCMP odds: ❌ skipped | HKJC live: ❌ not fetched (blind run) | Place odds: ✅ in snapshot
             (analyzer itself used the saved racecard winOdds, slightly earlier: #8 2.6 / #4 5.9 / #11 7.5 / #1 11 …)

RACE: R8 — Class 3 | 1200m | Turf | Good | 12 runners (MOUNT BUTLER HANDICAP)
CLASSIFICATION: Competitive (#11 Adj Win% 22.4%, in 20–35%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Happy Valley 2026-09-23 | Going: Good | Surface: Turf
Target Race(s): R8 (Class 3 | 1200m | 12 runners)
Scratchings: none (all 12 racecard runners present in the R8 odds snapshot)
Odds coverage: 12/12 horses with win + place odds
SCMP data: ❌ unavailable (skipped — post-meeting blind run)
Form: 12/12 runners with form data; no debutants (fewest starts on file: #4 STAR RISE with 6)
Long layoffs (> 90 days): #4 STAR RISE (last run 2026-05-24, ~122d);
      #3 SKY CAP, #5 PEGAS, #9 KING LOTUS, #10 MEOWTH (all 2026-06-24, ~91d)
Other: #11 LEADING AGILITY (banker) off ~77d (2026-07-08); #6 / #8 off ~70d; #12 off ~84d.
       Only #1, #2, #7 have run this season (Sep 9–13).
       #1 HARMONY N BLESSED is 10 years old (top weight 135 lb).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 11 | LEADING AGILITY | 22.4% | 55.4% | 5.1 | ✅ | ✅ | 1/3/1/4/4/9 | ★ 膽 (Banker) | 10-11: 9.9% (10.1) |
| 10 | MEOWTH | 20.5% | 52.1% | 23 | ✅ | ❌ | 1/2/6/4/3/3 | 腳 (Leg) | 3-11: 9.2% (10.9) |
| 3 | SKY CAP | 17.4% | 48.3% | 15 | ✅ | ❌ | 1/10/5/3/1/1 | 腳 (Leg) | 3-10: 8.1% (12.3) |
| 2 | STRAIGHT TO GLORY | 15.3% | 44.0% | 17 | ✅ | ❌ | 7/1/7/1/9/2 | 腳 (Leg) | 2-11: 7.6% (13.2) |
| 1 | HARMONY N BLESSED | 10.3% | 34.3% | 17 | ✅ | ❌ | 6/1/8/2/10/10 | 腳 (Leg) | 2-10: 6.9% (14.4) |
| 8 | DANICA'S CHOICE | 5.8% | 22.0% | 2.6 | ✅ | ✅ | 2/1/5/11/10/9 | 腳 (Leg) | — |
| 6 | THRIVING BROTHERS | 2.7% | 13.0% | 17 | ❌ | ❌ | 1/12/6/2/2/5 | — | — |
| 4 | STAR RISE | 2.6% | 13.2% | 4.9 | ❌ | ✅ | 12/3/10/4/4/2 | 腳 (Leg) — added (no replaceable leg) | — |
| 5 | PEGAS | 1.0% | 5.8% | 37 | ❌ | ❌ | 2/7/8/6/4/7 | — | — |
| 7 | STORMING DRAGON | 0.9% | 5.6% | 28 | ❌ | ❌ | 8/13/4/3/1/3 | — | — |
| 9 | KING LOTUS | 0.9% | 5.3% | 14 | ❌ | ❌ | 7/5/9/7/11/11 | — | — |
| 12 | OUTGATE | 0.1% | 1.0% | 40 | ❌ | ❌ | 13/10/11/6/6/1 | — | — |

Market: Overround 23.1%. MC strongly disagrees with the market at the top. The market favourite #8 DANICA'S CHOICE (2.6) is only 5.8% win in MC, and market second choice #4 STAR RISE (4.9) is 2.6%. MC's top four (#11, #10, #3, #2) are closely grouped (15–22% win). #10 MEOWTH (23, 10 lb claim), #2 and #3 are flagged undervalued by 290% / 145% / 143%. Analyzer single bets: Place #10 (HK$500), Place #3 (HK$500).

## STRATEGY A

### HORSE RANKINGS

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 11 | LEADING AGILITY | 22.4% | 55.4% | 0 | 0 | 22.4% | 55.4% | 5.1 | E C W Wong | — | — (skipped) | ★ 膽 (Banker) |
| 10 | MEOWTH | 20.5% | 52.1% | 0 | 0 | 20.5% | 52.1% | 23 | H Y Yuen | — | — (skipped) | 腳 (Leg) |
| 3 | SKY CAP | 17.4% | 48.3% | 0 | 0 | 17.4% | 48.3% | 15 | C Y Ho | — | — (skipped) | 腳 (Leg) |
| 2 | STRAIGHT TO GLORY | 15.3% | 44.0% | 0 | 0 | 15.3% | 44.0% | 17 | K C Leung | — | — (skipped) | 腳 (Leg) |
| 1 | HARMONY N BLESSED | 10.3% | 34.3% | 0 | 0 | 10.3% | 34.3% | 17 | L Ferraris | — | — (skipped) | 腳 (Leg) |
| 8 | DANICA'S CHOICE | 5.8% | 22.0% | 0 | 0 | 5.8% | 22.0% | 2.6 | A Atzeni | — | — (skipped) | 腳 (Leg) |
| 6 | THRIVING BROTHERS | 2.7% | 13.0% | 0 | 0 | 2.7% | 13.0% | 17 | K Teetan | — | — | — |
| 4 | STAR RISE | 2.6% | 13.2% | 0 | 0 | 2.6% | 13.2% | 4.9 | J Orman | — | — | — |
| 5 | PEGAS | 1.0% | 5.8% | 0 | 0 | 1.0% | 5.8% | 37 | C L Chau | — | — | — |
| 7 | STORMING DRAGON | 0.9% | 5.6% | 0 | 0 | 0.9% | 5.6% | 28 | B Avdulla | — | — | — |
| 9 | KING LOTUS | 0.9% | 5.3% | 0 | 0 | 0.9% | 5.3% | 14 | L Hewitson | — | — | — |
| 12 | OUTGATE | 0.1% | 1.0% | 0 | 0 | 0.1% | 1.0% | 40 | Y L Chung | — | — | — |

Factor columns are `0` for all runners: SCMP was skipped (post-meeting blind run), so Adj = raw MC. Running style was not assessed because there is no SCMP Star Form.

Reasoning: #11 LEADING AGILITY is MC #1 (22.4% win / 55.4% place). It is a 4yo with a 3 lb claim (121 lb), draw 3, and form of 1/3/1/4/4/9. It has 8 starts on file, so it is an eligible banker. Its top-weight rating is 71 against 70 / 69 / 68 for the next three, so it is only a narrow top. That makes the race Competitive and puts it in Mode B: the top 3 by Adj Win% (#11, #10, #3) plus 3 more by Adj Place% (#2, #1, #8). Every runner with Adj Place% ≥ 25% is in the pool (#11, #10, #3, #2, #1), and so is the only one at 20–25% (#8, 22.0%, the market favourite), so Rule 8 is satisfied. The 2nd-ranked horse, #10, has Adj Place% 52.1%, below 63%, so the structure is 膽拖, not 雙膽拖. #4 STAR RISE (4.9, market 2nd choice) stays out of Strategy A on MC grounds: 13.2% place and no negative flags, so Rule 9 does not force it in. It is covered in Strategy B.

Finish-time projection (a separate pass) has #2 STRAIGHT TO GLORY and #10 MEOWTH joint fastest (1:10.28), #1 at +0.28s and #8 at +0.42s. It has banker #11 only 7th (+0.70s) and #3 SKY CAP 11th (+1.68s). This does not change the MC ranking, but it backs #2 and #10 as legs and warns that the banker's edge is thin.

### TRIO POOL (any order)

```
POOL: #11, #10, #3, #2, #1, #8
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #11 LEADING AGILITY (Adj Place% 55.4%) ← locked in every combo
腳 (Legs):  #10, #3, #2, #1, #8
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville trio probability from MC Win%; fair odds = 1/p):

| Rank | Horses (any order) | Est. Trio Prob | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #11, #10, #3 | 10.1% | $10 |
| 2 | #11, #10, #2 | 8.6% | $12 |
| 3 | #11, #3, #2 | 7.0% | $14 |
| 4 | #11, #10, #1 | 5.4% | $18 |
| 5 | #11, #3, #1 | 4.4% | $23 |

### TICKET SUMMARY

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TOP COMBINATIONS (highest value):
  11-10-3 (10.1%), 11-10-2 (8.6%), 11-3-2 (7.0%), 11-10-1 (5.4%), 11-3-1 (4.4%),
  11-2-1 (3.8%), 11-10-8 (2.9%), 11-3-8 (2.4%), 11-2-8 (2.0%), 11-1-8 (1.3%)
  Estimated ticket coverage (Harville): ~47.9%

PASS CONDITIONS:
- If #11 LEADING AGILITY (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good)
- Value comes from MC disagreeing with the market (MC's top 4 are 5.1 / 23 / 15 / 17 while
  the 2.6 favourite is a minor leg). If you have no appetite for model-vs-market risk, skip.

CONFIDENCE: LOW-MEDIUM (Competitive race with MC's top four within 7 points of each other;
            banker is not a market fancy for the win and is only 7th in the finish-time
            projection; strong model-vs-market disagreement on #8 / #4)

CAVEATS:
- SCMP skipped (post-meeting blind run): no Star Form / TIR / Vet / Trackwork / QP-Q matrix; Strategy A = raw MC.
- The analyzer priced with the saved racecard winOdds (slightly earlier than the momentum snapshot);
  the table and Strategy B flags use the last pre-off snapshot (data/odds/odds_20260923_HV.json).
  Strategy B would come out the same with either odds set: #4 / #8 / #11 are < 10 and #1 is > 10 in both.
- Trio combo probabilities use a Harville approximation from MC Win%, not a direct MC trio count.
- The finish-time projection disagrees with MC on the order (#2 = #10 > #1 > #8 … #11 7th, #3 11th).
- Many runners are coming back from a break: #4 ~122d; #3 / #5 / #9 / #10 ~91d; banker #11 ~77d.
  First-up fitness is unknown without SCMP trackwork/trials.
- #1 HARMONY N BLESSED is 10yo (SCMP would normally apply an age flag in C3; not applied).
- #10 MEOWTH is ridden by a 10 lb claimer (H Y Yuen) from draw 12, the widest gate at HV 1200m.
- Historical sync, live odds fetch and SCMP deliberately not run (blind run); used the historical data already on disk.
```

## STRATEGY B (MC-only)

```
Banker: #11 LEADING AGILITY (MC Win% 22.4%, MC Place% 55.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #10, #3, #2, #1, #8
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
    none — #8 DANICA'S CHOICE (22.0%) is at 2.6; #1 (34.3%) is above 30%
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10):
    #4 STAR RISE (Win odds 4.9, MC Place% 13.2%)
Action: #4 added directly (no replaceable leg)
Final legs: #10, #3, #2, #1, #8, #4
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #11 / 腳 #10, #3, #2, #1, #8, #4 (15 combos)
  11-10-3 (10.1%), 11-10-2 (8.6%), 11-3-2 (7.0%), 11-10-1 (5.4%), 11-3-1 (4.4%),
  11-2-1 (3.8%), 11-10-8 (2.9%), 11-3-8 (2.4%), 11-2-8 (2.0%), 11-1-8 (1.3%),
  11-10-4 (1.3%), 11-3-4 (1.0%), 11-2-4 (0.9%), 11-1-4 (0.5%), 11-8-4 (0.3%)
  Estimated ticket coverage (Harville): ~51.8%
```

Comparison: Same banker and the same five legs as Strategy A, plus #4 STAR RISE (market 2nd choice at 4.9). Adding it costs 5 more combos (+$50, $150 vs $100) for about 4 points of estimated coverage (51.8% vs 47.9%). MC rates #4 weakly (13.2% place), so B is effectively a hedge on the market over the model.

```
═══════════════════════════════════════════════════════════
```
