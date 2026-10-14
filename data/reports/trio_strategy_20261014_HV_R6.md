# Trio (單T) Strategy — Happy Valley 2026-10-14 Race 6

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-14 | Race 6
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (9 starters ≥ 3, odds for 9/9, 9 jockey + 7 trainer profiles loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork loaded; odds columns unlabelled; Q/QP matrix not machine-readable)
ODDS SOURCE: HKJC early-morning win pool (fetch-odds.ts, data/odds/odds_20261014_HV.json, captured 11:00 HKT 14-Oct)
             MC run's live odds give the same favourite and only small moves (#2 5.2, #4 19, #6 14, #9 8.3)
             SCMP odds: ⚠️ loaded but ambiguous (cross-reference only) | HKJC: ✅ loaded

RACE: R6 — Class 2 | 1800m | Turf ("A" course) | Good | 9 runners — HKEX TECH 100 CUP (HANDICAP)
CLASSIFICATION: Dominant (top Adj Win% 50.0%, capped) | POOL SIZE: 7
MODE: A: Tight Pool (5), expanded to 7 by Rule 8 (Adj Place% ≥ 20%)
BET STRUCTURE (A): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15  (2nd-ranked #5 Adj Place% 55.6% < 63%, so no 雙膽拖)
BET STRUCTURE (B): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-14 | Going: Good | Surface: Turf
Target Race(s): R6 (Class 2 | 1800m | 9 runners)
Scratchings: none
Odds coverage: 9 horses with HKJC win odds (the MC tool estimated place odds from the win odds)
SCMP data: ⚠️ partial
Form gaps: none. All 9 horses have 9–10 form records (all-venue) and 0–5 runs at 1800m.
           #4 TALENTS AMBITION has 0 trip runs in the MC index; SCMP says it struggled in its only Valley 1,800m run.
           #6 GENTLEMEN LEGACY last ran 21-Jun (about 115 days off) and is trying a new course.
           #8 STUNNING PEACH last ran 12-Jul (about 94 days off).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 7 | LE ZONDA | 49.0% | 82.6% | 2.4 | ✅ | ✅ | 5/6/5/1/1/1 | ★ 膽 (Banker) | 5-7: 22.0% (4.5) |
| 5 | SILVERY BREEZE | 17.3% | 55.6% | 7.7 | ✅ | ✅ | 1/4/1/4/3/9 | 腳 (Leg) | 5-7: 22.0% (4.5) |
| 3 | HELENE FEELING | 8.3% | 35.0% | 12 | ✅ | ❌ | 7/4/5/11/9/3 | 腳 (Leg) | 3-7: 11.4% (8.8) |
| 4 | TALENTS AMBITION | 7.2% | 32.5% | 22 | ✅ | ❌ | 7/4/2/9/1/2 | 腳 (Leg) | 4-7: 10.1% (9.9) |
| 1 | SPEED DRAGON | 7.2% | 32.4% | 10 | ✅ | ❌ | 4/1/2/3/8/7 | 腳 (Leg) | 1-7: 10.4% (9.6) |
| 2 | MASSIVE SOVEREIGN | 4.7% | 23.8% | 4.9 | ✅ | ✅ | 6/8/4/6/12/5 | 腳 (Leg) | 2-7: 6.7% (15.0) |
| 9 | CALIFORNIATOTALITY | 3.8% | 20.8% | 8.2 | ✅ | ✅ | 8/10/3/11/6/4 | 腳 (Leg) | — |
| 6 | GENTLEMEN LEGACY | 2.2% | 14.4% | 15 | ❌ | ❌ | 1/1/4/2/8/9 | — | — |
| 8 | STUNNING PEACH | 0.3% | 2.8% | 15 | ❌ | ❌ | 9/9/5/7/5/8 | — | — |

Form = last six runs, oldest to newest, from data/historical (both venues).

Market: overround 23.2%, favourite bias +17.6%. MC agrees with the market on the favourite, #7 LE ZONDA (2.4, rating 75, 9 points clear of the next horse).
- **Biggest overlay:** #5 SILVERY BREEZE. MC has it 2nd (17.3% win / 55.6% place), but it is 3rd in the market at 7.7. Its Place bet shows a 36% edge, and the tool recommends Place bets on #5 and #7.
- **Biggest underlay:** the market's 2nd favourite, #2 MASSIVE SOVEREIGN (4.9). MC rates it only 6th (23.8% place) and the tool flags it as overvalued by 76%.
- **Other overvalued runners:** #8 (by 96%) and #6 (by 69%).
- **Other MC upgrades:** #3 (12) and #4 (22) both rate as top-5 MC contenders.

The top MC quinella is 5-7 at 22.0%, about double the next pair (3-7 at 11.4%).

Finish-time projection note: the speed-figure projection has #1 SPEED DRAGON (1:46.62) and #4 TALENTS AMBITION (+0.14s) fastest, with #7 4th. This is a different view from the MC ranking. Both #1 and #4 are in the pool.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 7 | LE ZONDA | 49.0% | 82.6% | +form +1, trial +2 | +form +1, trial +2 | 50.0% (cap) | 85.0% (cap) | 2.4 | C Y Ho | 5 | 123 | Midfield/Wide-runner | +form, +trial | ★ 膽 (Banker) |
| 2 | 5 | SILVERY BREEZE | 17.3% | 55.6% | 0 | 0 | 17.3% | 55.6% | 7.7 | Z Purton | 3 | 124 | Stalker | — | 腳 (Leg) |
| 3 | 3 | HELENE FEELING | 8.3% | 35.0% | excuses +2 | excuses +2 | 10.3% | 37.0% | 12 | E C W Wong (-3) | 9 | 127 | Front | +excuses (wide early) | 腳 (Leg) |
| 4 | 4 | TALENTS AMBITION | 7.2% | 32.5% | 0 | 0 | 7.2% | 32.5% | 22 | R Kingscote | 6 | 125 | Closer | — (single slow start) | 腳 (Leg) |
| 5 | 1 | SPEED DRAGON | 7.2% | 32.4% | 0 | 0 | 7.2% | 32.4% | 10 | L Hewitson | 4 | 131 | Closer | — | 腳 (Leg) |
| 6 | 9 | CALIFORNIATOTALITY | 3.8% | 20.8% | excuses +2 | excuses +2 | 5.8% | 22.8% | 8.2 | A Atzeni | 8 | 120 | Stalker (box seat) | +excuses (steadied) | 腳 (Leg, Rule 8) |
| 7 | 2 | MASSIVE SOVEREIGN | 4.7% | 23.8% | 0 | 0 | 4.7% | 23.8% | 4.9 | C L Chau (-2) | 1 | 129 | Closer | — | 腳 (Leg, Rule 8) |
| 8 | 6 | GENTLEMEN LEGACY | 2.2% | 14.4% | 0 | 0 | 2.2% | 14.4% | 15 | L Ferraris | 7 | 123 | Stalker (box seat) | — | — |
| 9 | 8 | STUNNING PEACH | 0.3% | 2.8% | 0 | 0 | 0.3% | 2.8% | 15 | Y L Chung (-2) | 2 | 122 | — | — (single awkward jump) | — |

Factor labels used here:
- excuses +2: wide trip, or steadied
- +form +1: won its most recent run
- trial +2

Positive flags apply equally to Win% and Place%. #7 hit the 50% win and 85% place caps. No horse reached the per-horse ±8 / ±10 limits. Banker eligibility: #7 has 9 HK form records, so it is eligible.

SCMP adjustments applied:
- **#7 LE ZONDA**:
  - Won its last three races: back-to-back wins over Valley 1,800m, then a win over Valley 1,650m "after running wide from the 600m". That gives +form +1.
  - Trackwork says it "ran on powerfully for second in a recent dirt trial", so trial +2.
  - Raw total would be 52.0% win / 85.6% place, capped at 50% / 85%.
- **#3 HELENE FEELING**: TIR says it was "caught wide early, he had to keep going to lead and avoid covering extra ground". That is a wide trip, so excuses +2. Its latest run was a front-running 3rd at $35.
- **#9 CALIFORNIATOTALITY**: TIR says it "raced keenly... got its head up when being steadied", so excuses +2. Latest was a box-seat 4th.
- **#5 SILVERY BREEZE**: TIR "jumped only fairly... conservative early from outside barrier" does not meet the crowded/steadied/wide bar. The vet check found nothing significant. No adjustment. Today's gate 3 is much better than gate 12 last time, but Star Form has no explicit draw comment, so no +draw.
- **#4 TALENTS AMBITION**: TIR "slow into stride" is a single note, so no -barrier penalty. "Closing second from the rear" does not meet the improved/rallied/made-all bar. No adjustment.
- **#2 MASSIVE SOVEREIGN**: "Returned from injury" refers to a run before last month's; no vet entry is listed and it has run since, so no -injury30d. TIR "shifted across behind runners early" is not a scoring flag. No adjustment.
- **#8 STUNNING PEACH**: TIR "jumped awkwardly and lost ground" is a single note, so no adjustment.
- **#1, #6**: no TIR, vet or trackwork flags. No adjustment. #1 is 7, so no age flag.

Reasoning: #7 LE ZONDA is a clear MC #1 (rating 75 vs 66 for the next). It is a 3-race winning streak horse and a course-and-distance winner over Valley 1,800m. Its trial since is good, and it has a mid gate (5). Adj Win% of 50% makes the race Dominant, so Mode A applies.

The base 5 is the banker + 4 by Adj Place%: #5 (55.6), #3 (37.0), #4 (32.5) and #1 (32.4). Rule 8 (Adj Place% ≥ 20%) adds #2 (23.8) and #9 (22.8). That gives a 7-horse pool, which suits the skill's Happy Valley "wider pool" note.

Rule 9 does not force anything in. #6 and #8 (both 15) carry no scored negative flags; they are excluded only on low Adj Place% (14.4% / 2.8%).

#5's Adj Place% is 55.6%, below 63%, so this is a single-banker 膽拖.

Left out:
- **#6 GENTLEMEN LEGACY (15)**: 14.4% place. It has been off since June, is trying a new course, and has failed to menace in its last two runs.
- **#8 STUNNING PEACH (15)**: 2.8% place.

Pace: HV 1,800m favours stalkers. #3 was forced to lead last time and could do so again from gate 9, with #9 and #5 likely to track. #7 won last start despite running wide from the 600m, so a mid draw (5) should help it get a better trip. The closers #1, #4 and #2 need the pace on.

## TRIO POOL (Strategy A, any order)

```
POOL: #7, #5, #3, #4, #1, #9, #2
MODE: A (Dominant, #7 Adj Win% 50.0% ≥ 35%), expanded 5 → 7 | POOL SIZE: 7
  Banker + top 4 by Adj Place%: #7 (85.0), #5 (55.6), #3 (37.0), #4 (32.5), #1 (32.4)
  + Rule 8 (Adj Place% ≥ 20%): #2 (23.8), #9 (22.8)

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #7 LE ZONDA (Adj Win% 50.0%, Adj Place% 85.0%) ← locked in every combo
腳 (Legs):  #5, #3, #4, #1, #9, #2
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #7, #5, #3 | 14.5% | $69 per $10 |
| 2 | #7, #5, #4 | 9.8% | $102 per $10 |
| 3 | #7, #5, #1 | 9.8% | $102 per $10 |
| 4 | #7, #5, #9 | 7.7% | $129 per $10 |
| 5 | #7, #5, #2 | 6.2% | $161 per $10 |
| 6 | #7, #3, #4 | 5.2% | $192 per $10 |
| 7 | #7, #3, #1 | 5.2% | $192 per $10 |

Estimated chance the Strategy A ticket hits (sum of 15 combos): about 81% on both Adj Win% and raw MC. Harville gives #7 a top-3 chance of about 90%, which is higher than MC's direct 82.6% place figure. A more realistic hit rate is about 70–75%, so treat 81% as an upper bound.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

TICKET: 膽 #7 | 腳 #5, #3, #4, #1, #9, #2

TOP COMBINATIONS (highest value):
  7-5-3 (14.5%), 7-5-4 (9.8%), 7-5-1 (9.8%), 7-5-9 (7.7%), 7-5-2 (6.2%), 7-3-4 (5.2%), 7-3-1 (5.2%)
```

Value note: #7 is the 2.4 favourite, so the dividend depends on who fills the other two places. MC's 2nd pick, #5 (7.7), is only the 3rd market choice. The market's 2nd favourite, #2 (4.9), is MC's 6th. If #2 misses the frame, combos such as 7-5-3, 7-5-4 and 7-3-4 (with #3 at 12 and #4 at 22) should pay well above fair. 7-5-2 and 7-2-9 are the "chalky" outcomes.

PASS CONDITIONS:
- If #7 LE ZONDA (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going changes to Yielding/Soft or worse → re-run the MC.
- If #7 drifts beyond ~5 in late betting (market losing faith in the banker) → consider PASS.
- If a leg is scratched → drop it (C(5,2) = 10 combos, $100).

CONFIDENCE: MEDIUM-HIGH.
- Strengths: the banker is strong (MC 82.6% place, a 9-point rating gap, 3 straight wins and a good trial). The 5-7 quinella is dominant, and the pool covers 7 of 9 runners.
- Risk: the speed-figure projection prefers #1 and #4 to #7. The banker's MC place figure means about 1 in 6 tickets lose outright.

CAVEATS:
- **SCMP data is partial.** Star Form, TIR, Vet and Trackwork were read. Each horse shows three unlabelled odds figures (for example #7 2.3 / 2.5 / 1.0 and #2 5.9 / 4.5 / 1.9). They are consistent with the HKJC order but cannot be mapped to win/place with certainty. The Q/QP matrices are on the page but could not be read into pairs, so no QP cross-reference was done.
- During the MC run, the scraper log line printed "distance=1200m". The enriched racecard and the MC header both use 1800m, which matches the SCMP card. Treat this as cosmetic, but note it (the same thing happened in R3).
- The finish-time projection, based on average speed figures, ranks #1 and #4 above #7. It disagrees with the MC ranking, which adds uncertainty about the banker.
- **#2 MASSIVE SOVEREIGN (4.9, 2nd favourite) is in the pool only through Rule 8**, and MC flags it as heavily overvalued.
- Two runners are returning from breaks: #6 after about 115 days and #8 after about 94 days.
- The Harville hit rates come from normalised win probabilities and overstate the banker's top-3 chance compared with the MC place figure.
- Odds are from the 11:00 HKT early pool. The pool will move before the jump.
- Historical sync was not re-run in this session (already done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #7 LE ZONDA (MC Win% 49.0%, MC Place% 82.6%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #5 (55.6%), #3 (35.0%), #4 (32.5%), #1 (32.4%), #2 (23.8%), #9 (20.8%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
  (#2 is 23.8% but at 4.9, and #9 is 20.8% but at 8.2, so neither is > 10. #3, #4 and #1 are above 30%.)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
  (#6 and #8 are both at 15.)
Action: no replacement or addition
Final legs: #5, #3, #4, #1, #2, #9
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #7 | 腳 #5, #3, #4, #1, #2, #9
  7-5-3, 7-5-4, 7-5-1, 7-5-2, 7-5-9, 7-3-4, 7-3-1, 7-3-2,
  7-3-9, 7-4-1, 7-4-2, 7-4-9, 7-1-2, 7-1-9, 7-2-9

Top combos (Harville, raw MC): 7-5-3 13.8% | 7-5-4 11.8% | 7-5-1 11.8% | 7-5-2 7.5% | 7-5-9 6.0% | 7-3-4 4.9%
Est. ticket hit chance (sum of 15 combos, raw MC): ~81% (upper bound; MC banker place is 82.6%)
```

Comparison: Strategy A and Strategy B produce the **identical ticket** here: banker #7, legs #5/#3/#4/#1/#2/#9, 15 combos, $150. The SCMP adjustments (#7 +3, #3 +2, #9 +2) only re-order the legs and change no pool membership. #9 is the marginal leg in both: Strategy B includes it because its 20.8% place is just over the 20% line, and Strategy A because the steadied excuse lifts it to 22.8%. If you want to place only one ticket for this race, the two strategies agree.

```
═══════════════════════════════════════════════════════════
```
