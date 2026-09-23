# Trio Strategy — Happy Valley | 2026-09-23 | Race 9

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-23 | Race 9
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all --use-saved --hide-actual)
SCMP DATA: ❌ Skipped (post-meeting blind run) — Step 3c not applied; Strategy A = raw MC
ODDS SOURCE: Momentum collector last pre-off snapshot (data/odds/odds_20260923_HV.json, R9 captured 14:49:46Z = 22:49 HKT, 14s before post)
             SCMP odds: ❌ skipped | HKJC live: ❌ not fetched (blind run) | Place odds: ✅ in snapshot
             (analyzer itself used the saved racecard winOdds, slightly earlier: #2 4.7 / #10 4.7 / #9 7.4 / #1 8.9 …)

RACE: R9 — Class 3 | 1800m | Turf | Good | 12 runners (TAI HANG HANDICAP)
CLASSIFICATION: Competitive (#6 Adj Win% 21.8%, in the 20–35% band) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Happy Valley 2026-09-23 | Going: Good | Surface: Turf
Target Race(s): R9 (Class 3 | 1800m | 12 runners)
Scratchings: none (all 12 racecard runners present in the R9 odds snapshot)
Odds coverage: 12/12 horses with win + place odds
SCMP data: ❌ unavailable (skipped — post-meeting blind run)
Form: 12/12 runners with form data; no debutants (fewest starts: #2 SERAPH GABRIEL with 6)
Long layoffs (> 90 days): #2 SERAPH GABRIEL (last run 2026-05-24, ~122d), #3 WITHOUT COMPARE (2026-06-03, ~112d),
      #8 THE AUSPICIOUS (2026-06-10, ~105d), #1 KA YING GENERATION (2026-06-21, ~94d),
      #5 FIVEFORTWO / #12 FLYING FORTUNE (2026-06-24, ~91d)
Other: #4 LO RIDER last ran 2026-06-27 (~88d). #6, #9, #10, #11 ran 2026-09-09; #7 ran 2026-09-16.
      #11 KEEFY is 8 years old.
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6, latest first) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|-----------------------------|-------------------|--------------------------|
| 6 | FORTUNATE SON | 21.8% | 50.1% | 11 | ✅ | ❌ | 1/10/2/4/4/10 | ★ 膽 (Banker) | 3-6: 8.3% (12.1) |
| 3 | WITHOUT COMPARE | 18.3% | 46.6% | 15 | ✅ | ❌ | 1/2/1/4/2/4 | 腳 (Leg) | 6-7: 6.5% (15.4) |
| 7 | ROMANTIC GLADIATOR | 14.6% | 40.2% | 26 | ✅ | ❌ | 9/2/1/2/6/9 | 腳 (Leg) | 3-7: 6.4% (15.6) |
| 2 | SERAPH GABRIEL | 11.1% | 33.2% | 3.0 | ✅ | ✅ | 4/7/5/12/2/11 | 腳 (Leg) | 2-6: 5.0% (19.9) |
| 12 | FLYING FORTUNE | 9.6% | 30.3% | 18 | ✅ | ❌ | 1/4/3/12/6/10 | 腳 (Leg) | 6-12: 4.5% (22.2) |
| 5 | FIVEFORTWO | 7.7% | 27.6% | 20 | ✅ | ❌ | 3/3/2/5/1/4 | — (replaced by #10) | — |
| 9 | CHINA WIN | 4.4% | 19.1% | 8.9 | ❌ | ✅ | 3/5/3/2/1/1 | 腳 (Leg) — added | — |
| 10 | WINDLORD | 4.3% | 16.3% | 5.5 | ❌ | ✅ | 2/9/13/7/10/7 | 腳 (Leg) — replacement | — |
| 4 | LO RIDER | 3.1% | 12.4% | 16 | ❌ | ❌ | 8/13/7/8/8/8 | — | — |
| 8 | THE AUSPICIOUS | 2.4% | 10.7% | 12 | ❌ | ❌ | 4/2/1/6/9/5 | — | — |
| 1 | KA YING GENERATION | 2.0% | 9.3% | 8.5 | ❌ | ✅ | 5/7/2/3/7/7 | 腳 (Leg) — added | — |
| 11 | KEEFY | 0.7% | 4.4% | 33 | ❌ | ❌ | 8/8/11/8/5/4 | — | — |

Market: Overround 22.0%. MC disagrees with the market at the top. Its top three are #6 FORTUNATE SON (11, 5th in the market), #3 WITHOUT COMPARE (15) and #7 ROMANTIC GLADIATOR (26), flagged undervalued by 140% / 156% / 119%. It opposes the market's three shortest: #2 SERAPH GABRIEL (3.0 fav, 11.1% in MC), #10 WINDLORD (5.5, 4.3%) and #9 CHINA WIN (8.9, 4.4%). Analyzer single bets: Place #6 (HK$500), Place #3 (HK$500).

## STRATEGY A

### HORSE RANKINGS

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 6 | FORTUNATE SON | 21.8% | 50.1% | 0 | 0 | 21.8% | 50.1% | 11 | C Y Ho | — | — (skipped) | ★ 膽 (Banker) |
| 3 | WITHOUT COMPARE | 18.3% | 46.6% | 0 | 0 | 18.3% | 46.6% | 15 | J Orman | — | — (skipped) | 腳 (Leg) |
| 7 | ROMANTIC GLADIATOR | 14.6% | 40.2% | 0 | 0 | 14.6% | 40.2% | 26 | E C W Wong | — | — (skipped) | 腳 (Leg) |
| 2 | SERAPH GABRIEL | 11.1% | 33.2% | 0 | 0 | 11.1% | 33.2% | 3.0 | Z Purton | — | — (skipped) | 腳 (Leg) |
| 12 | FLYING FORTUNE | 9.6% | 30.3% | 0 | 0 | 9.6% | 30.3% | 18 | H Bentley | — | — (skipped) | 腳 (Leg) |
| 5 | FIVEFORTWO | 7.7% | 27.6% | 0 | 0 | 7.7% | 27.6% | 20 | C L Chau | — | — (skipped) | 腳 (Leg) |
| 9 | CHINA WIN | 4.4% | 19.1% | 0 | 0 | 4.4% | 19.1% | 8.9 | M L Yeung | — | — | — |
| 10 | WINDLORD | 4.3% | 16.3% | 0 | 0 | 4.3% | 16.3% | 5.5 | M Chadwick | — | — | — |
| 4 | LO RIDER | 3.1% | 12.4% | 0 | 0 | 3.1% | 12.4% | 16 | L Ferraris | — | — | — |
| 8 | THE AUSPICIOUS | 2.4% | 10.7% | 0 | 0 | 2.4% | 10.7% | 12 | K Teetan | — | — | — |
| 1 | KA YING GENERATION | 2.0% | 9.3% | 0 | 0 | 2.0% | 9.3% | 8.5 | A Atzeni | — | — | — |
| 11 | KEEFY | 0.7% | 4.4% | 0 | 0 | 0.7% | 4.4% | 33 | M F Poon | — | — | — |

The factor columns are `0` for every runner because SCMP was skipped (post-meeting blind run), so Adj = raw MC. Running style was not assessed because there is no SCMP Star Form.

Reasoning: #6 FORTUNATE SON is the MC top at 21.8% win and 50.1% place. It won its latest start at HV on 2026-09-09 and is back 14 days later, on 126 lb with rating 71, from draw 8. It has 10 starts, so it is an eligible banker. This is not a dominant race: at 21.8% it falls in the Competitive band, so Mode B applies (6-horse pool). The pool is the top 3 by Adj Win% (#6, #3, #7) plus the next three by Adj Place%:
- #2 SERAPH GABRIEL, the market favourite at 3.0
- #12 FLYING FORTUNE, lightweight at 117 lb and drawn 6
- #5 FIVEFORTWO, with 5 top-3 finishes in its last 6 but drawn 12

Every runner with Adj Place% ≥ 25% is in the pool. No runner outside it reaches 20% (#9 is next at 19.1%). The 2nd-ranked #3 has Adj Place% 46.6%, below 63%, so 雙膽拖 does not apply.

The market's 2nd and 3rd picks, #10 WINDLORD (5.5) and #9 CHINA WIN (8.9), are left out of Strategy A on MC grounds. Both are under 20% place with no negative flags, so Rule 9 does not force them in. Strategy B covers them.

Note on the finish-time projection (independent pass): it is almost the reverse of MC. It has #5 FIVEFORTWO fastest (1:48.95), then #12 FLYING FORTUNE (+0.84s) and #2 SERAPH GABRIEL (+0.98s). It puts #3 7th, #7 9th and the banker #6 last (+3.08s). This does not change the MC ranking. It does support #5, #12 and #2 as legs, and it is a serious warning against the banker.

### TRIO POOL (any order)

```
POOL: #6, #3, #7, #2, #12, #5
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #6 FORTUNATE SON (Adj Place% 50.1%) ← locked in every combo
腳 (Legs):  #3, #7, #2, #12, #5
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville trio probability from MC Win%; fair odds = 1/p):

| Rank | Horses (any order) | Est. Trio Prob | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #6, #3, #7 | 6.8% | $15 |
| 2 | #6, #3, #2 | 4.9% | $20 |
| 3 | #6, #3, #12 | 4.2% | $24 |
| 4 | #6, #7, #2 | 3.7% | $27 |
| 5 | #6, #3, #5 | 3.3% | $31 |

### TICKET SUMMARY

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TOP COMBINATIONS (highest value):
  6-3-7 (6.8%), 6-3-2 (4.9%), 6-3-12 (4.2%), 6-7-2 (3.7%), 6-3-5 (3.3%),
  6-7-12 (3.2%), 6-7-5 (2.5%), 6-2-12 (2.3%), 6-2-5 (1.8%), 6-12-5 (1.5%)
  Estimated ticket coverage (Harville): ~34.1% (capped by banker top-3 ≈ 50%)

PASS CONDITIONS:
- If #6 FORTUNATE SON (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good)
- If #6 drifts out sharply late (e.g. > 20) → reduce or skip; the whole ticket depends on a model-vs-market call

CONFIDENCE: LOW. The race is Competitive, not dominant. The banker has only a ~50% top-3 chance
            and is 5th in the market. MC's top 3 (#6/#3/#7) are all at 11–26 while the market's top 3 (#2/#10/#9)
            are all weak in MC. The finish-time projection puts #6 last.

CAVEATS:
- SCMP skipped (post-meeting blind run): no Star Form / TIR / Vet / Trackwork / QP-Q matrix; Strategy A = raw MC.
- The analyzer priced with the saved racecard winOdds (slightly earlier than the momentum snapshot);
  the table and Strategy B flags use the last pre-off snapshot (data/odds/odds_20260923_HV.json).
  Strategy B is identical under either source: the same three sub-10 candidates (#10, #1, #9),
  and #5 is > 10 in both (15 / 20).
- Trio combo probabilities use a Harville approximation from MC Win%, not a direct MC trio count.
- Finish-time projection strongly disagrees with MC (#5 > #12 > #2 …, #6 last).
- #3 WITHOUT COMPARE (the 2nd MC pick) has 0 runs at the trip and is off 112 days. #7 has 0 runs at the trip.
  #2 is off 122 days. Six runners are off > 90 days, so fitness uncertainty is high.
- HV 1800m from draw 12 (#5) and 11 (#9) is a real hurdle; #11 KEEFY is 8 years old.
- Historical sync, live odds fetch and SCMP deliberately not run (blind run); used the historical data already on disk.
```

## STRATEGY B (MC-only)

```
Banker: #6 FORTUNATE SON (MC Win% 21.8%, MC Place% 50.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3, #7, #2, #12, #5
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
    #5 FIVEFORTWO (27.6%, 20)   [#12 is 30.3%, outside the 20–30% band]
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
    #10 WINDLORD (Win odds 5.5, MC Place% 16.3%)
    #1 KA YING GENERATION (Win odds 8.5, MC Place% 9.3%)
    #9 CHINA WIN (Win odds 8.9, MC Place% 19.1%)
Action: #10 replaced #5 (only replaceable leg); #1 and #9 added directly (no replaceable leg left)
Final legs: #3, #7, #2, #12, #10, #1, #9
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 (fixed)
TOTAL STAKE: $210

STRATEGY B TICKET: 膽 #6 / 腳 #3, #7, #2, #12, #10, #1, #9 (21 combos)
  6-3-7 (6.8%), 6-3-2 (4.9%), 6-3-12 (4.2%), 6-7-2 (3.7%), 6-7-12 (3.2%),
  6-2-12 (2.3%), 6-3-9 (1.8%), 6-3-10 (1.8%), 6-7-9 (1.4%), 6-7-10 (1.3%),
  6-2-9 (1.0%), 6-2-10 (1.0%), 6-12-9 (0.8%), 6-12-10 (0.8%), 6-3-1 (0.8%),
  6-7-1 (0.6%), 6-2-1 (0.4%), 6-12-1 (0.4%), 6-10-9 (0.4%), 6-1-9 (0.2%), 6-10-1 (0.2%)
  Estimated ticket coverage (Harville): ~37.8%
```

Comparison: Both strategies use the same banker (#6). Strategy B drops #5 FIVEFORTWO and adds the market's three sub-10 horses (#10, #1, #9). That more than doubles the cost ($210 vs $100) for about 3.7 points more estimated coverage, because MC rates all three as weak. B does hedge the market's view, and the finish-time projection's top pick #5 is covered only in A.

```
═══════════════════════════════════════════════════════════
```
