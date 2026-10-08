# Trio (單T) Strategy — Happy Valley 2026-10-07 Race 6

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-07 | Race 6
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey + trainer stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork loaded; SCMP Win/Place columns look mis-parsed; no Q/QP matrix)
ODDS SOURCE: HKJC pool (data/odds/odds_20261007_HV.json, captured 11:01 HKT 07-Oct; same win odds used by analyze-race.ts)
             SCMP odds: ⚠️ mis-parsed (not used) | HKJC: ✅ loaded

RACE: R6 — Class 4 | 1200m | Turf | Good to Firm | 12 runners — CHEUNG FAT HANDICAP
CLASSIFICATION: Competitive (top Adj Win% 31.8%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-07 | Going: Good to Firm (SCMP header says "Good") | Surface: Turf
Target Race(s): R6 (Class 4 | 1200m | 12 runners)
Scratchings: none among the 12 declared runners (SCMP lists reserves R. STAR FIGURE (withdrawn) and R. SILVER BLAZE; neither is in the field)
Odds coverage: 12 horses with odds (HKJC win; place estimated from win by the tool)
SCMP data: ⚠️ partial
Form gaps: #4 UNSTOPPAPLE has only 2 local starts (6/6) and has been off since 27-Jun (102 days, layoff >90).
           #11 VIEW OF COSMOS has 4 starts and has been off since 27-Jun (102 days).
           #7 POET'S REIGN last ran 15-Jul (84 days). #2 GRIT SPIRIT has 5 starts.
           Banker #9 NO OTHER CHOICE has 10+ starts (eligible).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 9 | NO OTHER CHOICE | 29.8% | 60.5% | 3.0 | ✅ | ✅ | 1/14/3/9/5/3 | ★ 膽 (Banker) | 4-9: 8.8% (11.4) |
| 4 | UNSTOPPAPLE | 13.7% | 38.4% | 9.3 | ✅ | ✅ | 6/6 | 腳 (Leg) | 4-9: 8.8% (11.4) |
| 2 | GRIT SPIRIT | 10.6% | 32.1% | 11 | ✅ | ❌ | 3/14/8/12/13 | 腳 (Leg) | 2-9: 6.9% (14.6) |
| 10 | KWAI CHUNG TALENTS | 8.7% | 28.9% | 4.8 | ✅ | ✅ | 2/3/5/3/9/6 | 腳 (Leg) | 9-10: 5.6% (17.9) |
| 3 | STARRY SHOW | 7.4% | 25.8% | 19 | ✅ | ❌ | 5/1/9/10/7/8 | 腳 (Leg) | 3-9: 4.9% (20.3) |
| 7 | POET'S REIGN | 5.8% | 21.8% | 13 | ✅ | ❌ | 5/9/10/11/2 | 腳 (Leg) | 7-9: 4.2% (24.0) |
| 1 | HEALTHY HEALTHY | 5.7% | 20.2% | 20 | ✅ | ❌ | 14/7/1/10/8/8 | — (replaced by #5) | — |
| 8 | HAPPY UNITED | 5.6% | 20.3% | 20 | ✅ | ❌ | 9/1/7/8/6/5 | 腳 (Leg) | — |
| 6 | KING OBERON | 5.0% | 19.7% | 14 | ❌ | ❌ | 6/5/3/7/5/9 | — | — |
| 12 | MAJESTIC DELIGHT | 4.3% | 17.6% | 32 | ❌ | ❌ | 5/12/11/1/4/5 | — | — |
| 5 | CALIFORNIA BAY | 3.3% | 13.9% | 7.4 | ❌ | ✅ | 10/12/5/7/1/9 | 腳 (Leg) — replaced #1 | — |
| 11 | VIEW OF COSMOS | 0.1% | 0.9% | 42 | ❌ | ❌ | 14/11/14/12 | — | — |

Market: overround 22.4%. MC and market agree on the favourite, #9 NO OTHER CHOICE (3.0 fav; MC 29.8% / 60.5%, +22% edge on Place). The model disagrees on the next two in the market: 2nd fav #10 KWAI CHUNG TALENTS (4.8) is "overvalued by 59%" and 3rd fav #5 CALIFORNIA BAY (7.4) is "overvalued by 75%". MC likes #4 UNSTOPPAPLE (9.3, value 1.26) and #3 STARRY SHOW (19, value 1.49). MC finish-time projection puts #1 HEALTHY HEALTHY fastest (1:09.85), with #4 +0.28s and #6 +0.56s behind it. #9 projects +1.12s, so its MC edge comes from rating/form, not raw speed figures.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 9 | NO OTHER CHOICE | 29.8% | 60.5% | trial +2 | trial +2 | 31.8% | 62.5% | 3.0 | A Badel | 1 | 120 | Closer | +trial | ★ 膽 (Banker) |
| 2 | 4 | UNSTOPPAPLE | 13.7% | 38.4% | excuses +2 | excuses +2 | 15.7% | 40.4% | 9.3 | K C Leung | 12 | 128 | Closer | +excuses | 腳 (Leg) |
| 3 | 2 | GRIT SPIRIT | 10.6% | 32.1% | +form +1, excuses +2 | +form +1, excuses +2 | 13.6% | 35.1% | 11 | C Y Ho | 7 | 132 | Closer | +form, +excuses | 腳 (Leg) |
| 4 | 10 | KWAI CHUNG TALENTS | 8.7% | 28.9% | excuses +2 | excuses +2 | 10.7% | 30.9% | 4.8 | M L Yeung | 6 | 119 | Midfield (rail) | +excuses | 腳 (Leg) |
| 5 | 3 | STARRY SHOW | 7.4% | 25.8% | 0 | 0 | 7.4% | 25.8% | 19 | R Kingscote | 8 | 128 | Front/Prominent | — | 腳 (Leg) |
| 6 | 12 | MAJESTIC DELIGHT | 4.3% | 17.6% | excuses +2 | excuses +2 | 6.3% | 19.6% | 32 | H Bentley | 10 | 117 | Midfield | +excuses | — |
| 7 | 7 | POET'S REIGN | 5.8% | 21.8% | 0 | 0 | 5.8% | 21.8% | 13 | J Orman | 4 | 123 | Closer | — | 腳 (Leg) |
| 8 | 1 | HEALTHY HEALTHY | 5.7% | 20.2% | 0 | 0 | 5.7% | 20.2% | 20 | A Atzeni | 11 | 135 | Stalk | — | — |
| 9 | 8 | HAPPY UNITED | 5.6% | 20.3% | +form +1, excuses +2, -injury30d −3 | +form +1, excuses +2, -injury30d −4 | 5.6% | 19.3% | 20 | M Chadwick | 5 | 120 | Front | +form, +excuses, -injury30d | — |
| 10 | 6 | KING OBERON | 5.0% | 19.7% | 0 | 0 | 5.0% | 19.7% | 14 | P N Wong (-7) | 9 | 123 | — | — | — |
| 11 | 5 | CALIFORNIA BAY | 3.3% | 13.9% | 0 | 0 | 3.3% | 13.9% | 7.4 | K Teetan | 2 | 125 | Midfield | — | — |
| 12 | 11 | VIEW OF COSMOS | 0.1% | 0.9% | 0 | 0 | 0.1% | 0.9% | 42 | M F Poon | 3 | 119 | Front (early) | — | — |

Factor labels: trial +2 (positive trackwork), excuses +2 (steadied/crowded/short of room/wide trip), +form +1 (rallied/made all), -injury30d −3 win / −4 place. Caps are ±8 win / ±10 place, and none were reached. Banker eligibility: #9 has 10+ starts, so it is eligible.

SCMP adjustments applied:
- **#9 NO OTHER CHOICE**: Trackwork "posted a rapid piece of work at Conghua last month on the back of a win", so trial +2. Star Form "convincing come-from-behind win on his season debut" is positive but has no scoring keyword. Carries a 10-point penalty (rating +10) after that win. TIR "shifted across behind runners" is positional, so no flag. It has gate 1 today.
- **#4 UNSTOPPAPLE**: Star Form says it was "short of room late when sixth". TIR "could not be ridden out to the finish when racing in restricted room". This was scored as excuses +2 (blocked), not -notRO. The stewards tied it to restricted room, not soundness. Judgment call: scoring it -notRO −2 instead would give Adj 11.7% / 36.4%. It would still rank 3rd and stay in the pool.
- **#2 GRIT SPIRIT**: "Resumed a rallying third following a wide trip", so +form +1 and excuses +2. TIR also "obliged to steady".
- **#10 KWAI CHUNG TALENTS**: TIR "jumped awkwardly… eased when crowded… steadied to avoid a runner", so excuses +2. One awkward jump only, so no -barrier penalty. "Eased when crowded" is interference, not -notRO.
- **#3 STARRY SHOW**: "won going away… after a prominent run on a wet track" is positive but has no keyword. 0.
- **#12 MAJESTIC DELIGHT**: TIR "briefly held up… difficulty obtaining clear running", so excuses +2.
- **#7 POET'S REIGN**: "running on well for fifth" does not match a scoring keyword, so 0.
- **#1 HEALTHY HEALTHY**: "bounced off a bottom to win" in July. No keyword, so 0. Age 7 (not 8+).
- **#8 HAPPY UNITED**: Vet "23/09/2026 Lame left front leg after racing (passed on 02/10/2026)". It passed 5 days before the race (<30), so -injury30d (−3 win / −4 place). "making all" gives +form +1. TIR "steadied when crowded… racing wide and without cover" gives excuses +2. Its history also includes a bleed (October, prior season). Age 7.
- **#5 CALIFORNIA BAY**: TIR "slow to begin" (one note), so no scoring flag. 0.
- **#6 KING OBERON**, **#11 VIEW OF COSMOS**: no scoring flags. #11's vet note shows "no significant findings".

Reasoning: #9 NO OTHER CHOICE is the MC #1 and the market favourite. It won convincingly first-up (09-Sep, HV 1,200m), has posted a fast trackwork piece since, and draws gate 1. It is well clear on MC (29.8% win / 60.5% place vs 13.7% for the next). At Adj Win% 31.8% the race is Competitive, so Mode B applies: top 3 by Adj Win% (#9, #4, #2) plus the next 3 by Adj Place% (#10 30.9%, #3 25.8%, #7 21.8%). Every horse with Adj Place% ≥ 25% (#9, #4, #2, #10, #3) is in the pool. #1 HEALTHY HEALTHY (20.2%), #12 (19.6%), #6 (19.7%) and #8 (19.3%) sit just outside. Pace: HV 1,200m favours on-pace runners. Likely leaders are #8 HAPPY UNITED, #3 STARRY SHOW and #11 VIEW OF COSMOS. #9 is a closer but drawn 1, so it should save ground. #4 UNSTOPPAPLE (gate 12, closer) is the main pool horse facing a pace/draw hurdle. #10 has gate 6 and has run well on the rail.

## TRIO POOL (Strategy A, any order)

```
POOL: #9, #4, #2, #10, #3, #7
MODE: B (Competitive, #9 Adj Win% 31.8%, between 20% and 35%) | POOL SIZE: 6
  Mode B = top 3 by Adj Win% (#9 31.8, #4 15.7, #2 13.6) + 3 by Adj Place% (#10 30.9, #3 25.8, #7 21.8)
  Must-include (Adj Place% ≥ 25%): #9, #4, #2, #10, #3 — all in pool

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #9 NO OTHER CHOICE (Adj Win% 31.8%, Adj Place% 62.5%) ← locked in every combo
腳 (Legs):  #4, #2, #10, #3, #7
雙膽拖 check: 2nd-ranked #4 Adj Place% 40.4% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #9, #4, #2 | 5.9% | $169 per $10 |
| 2 | #9, #4, #10 | 4.5% | $222 per $10 |
| 3 | #9, #2, #10 | 3.8% | $263 per $10 |
| 4 | #9, #4, #3 | 3.0% | $333 per $10 |
| 5 | #9, #2, #3 | 2.5% | $394 per $10 |
| 6 | #9, #4, #7 | 2.3% | $431 per $10 |
| 7 | #9, #2, #7 | 2.0% | $511 per $10 |
| 8 | #9, #10, #3 | 1.9% | $518 per $10 |
| 9 | #9, #10, #7 | 1.5% | $672 per $10 |
| 10 | #9, #3, #7 | 1.0% | $1007 per $10 |

Estimated chance that the Strategy A ticket hits (sum of the 10 combos): about 28.5% (raw MC: about 27.9%).

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKET: 膽 #9 | 腳 #4, #2, #10, #3, #7
  9-4-2, 9-4-10, 9-2-10, 9-4-3, 9-2-3, 9-4-7, 9-2-7, 9-10-3, 9-10-7, 9-3-7
```

Value note: the banker is the favourite, so combos with #10 (2nd fav) will pay the least. The 4-9 pair is MC's top quinella (8.8%, fair 11.4). With #4 at 9.3 in the win market, 9-4-2 and 9-4-3 are the value combos.

PASS CONDITIONS:
- If #9 NO OTHER CHOICE (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If going changes to Yielding/Soft or worse → re-run the MC. #3 and #1 both have wet-track wins, so their chances would change.
- If #9 drifts beyond ~6 in late betting → consider PASS. The banker case is MC + market alignment.

CONFIDENCE: MEDIUM. The banker is solid (MC 60.5% place, market fav, gate 1, strong trackwork) but carries a 10-point rise. HV Class 4 1,200m is upset-prone, and the 2nd/3rd places are wide open (no other horse has Adj Win% >16%).

CAVEATS:
- SCMP is partial. The SCMP "Win/Place" columns (e.g. #9 1.7 / 3.2, #10 1.3 / 5.3, #11 9.2 / 32) do not match HKJC pool odds (#9 3.0, #10 4.8, #11 42) and look mis-parsed. They were not used. No Q/QP matrix was available, so the Q/QP cross-reference was not done.
- **Model vs market conflict**: the market's 2nd and 3rd favourites are rated much lower by MC. #10 KWAI CHUNG TALENTS (4.8) is in the Strategy A pool (Adj Place% 30.9%). #5 CALIFORNIA BAY (7.4, MC 13.9% place, no flags) is outside Strategy A. Rule 9 prevents hard exclusion but does not force inclusion. If #5 places, Strategy A misses. Strategy B covers #5.
- #4 UNSTOPPAPLE (the 2nd-ranked horse) has only 2 career starts and a 102-day layoff, and it draws gate 12 at HV 1,200m. Its SCMP flag is a judgment call (excuses +2 vs -notRO −2). The pool is the same either way.
- #8 HAPPY UNITED passed the vet only 5 days ago after lameness (-injury30d applied). It sits just outside the Strategy A pool but is a Strategy B leg.
- Going: HKJC racecard/MC uses Good to Firm, while the SCMP header shows "Good". The difference is minor.
- Odds were captured at 11:01 HKT on 07-Oct (race at about 21:10). The HKJC pool will move before the jump.
- Historical sync and odds fetch were not re-run in this session (already done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #9 NO OTHER CHOICE (MC Win% 29.8%, MC Place% 60.5%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #4 (38.4%), #2 (32.1%), #10 (28.9%), #3 (25.8%), #7 (21.8%), #8 (20.3%), #1 (20.2%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
  #3 STARRY SHOW (25.8%, 19), #7 POET'S REIGN (21.8%, 13), #8 HAPPY UNITED (20.3%, 20), #1 HEALTHY HEALTHY (20.2%, 20)
  (#10 is in the 20–30% band but at Win odds 4.8 < 10, so it is not replaceable)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10):
  #5 CALIFORNIA BAY (Win odds 7.4, MC Place% 13.9%)
Action: #5 replaced #1 HEALTHY HEALTHY (lowest MC Place% among replaceable legs, 20.2%)
Final legs: #4, #2, #10, #3, #7, #8, #5
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 (fixed)
TOTAL STAKE: $210

STRATEGY B TICKET: 膽 #9 | 腳 #4, #2, #10, #3, #7, #8, #5
  9-4-2 (5.1%), 9-4-10 (4.1%), 9-4-3 (3.4%), 9-2-10 (3.1%), 9-4-7 (2.6%), 9-2-3 (2.6%),
  9-4-8 (2.6%), 9-10-3 (2.0%), 9-2-7 (2.0%), 9-2-8 (1.9%), 9-10-7 (1.6%), 9-10-8 (1.5%),
  9-4-5 (1.5%), 9-3-7 (1.3%), 9-3-8 (1.3%), 9-2-5 (1.1%), 9-7-8 (1.0%), 9-10-5 (0.9%),
  9-3-5 (0.7%), 9-7-5 (0.6%), 9-8-5 (0.5%)
  Est. hit chance (Harville, raw MC): about 41%
```

Comparison: both strategies use the same banker (#9) and share all five Strategy A legs (#4, #2, #10, #3, #7). Strategy B adds #8 HAPPY UNITED and the market's 3rd favourite #5 CALIFORNIA BAY. That makes 21 combos at $210, against Strategy A's 10 combos at $100, and raises the estimated hit chance from about 28% to about 41%. Many of B's extra combos are long shots individually (0.5–2.6%).

═══════════════════════════════════════════════════════════
