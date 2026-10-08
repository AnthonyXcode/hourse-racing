# Trio (單T) Strategy — Happy Valley 2026-10-07 Race 9

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-07 | Race 9
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey + trainer stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork loaded; SCMP Place column and Q/QP matrix look mis-parsed and were not used)
ODDS SOURCE: HKJC pool (data/odds/odds_20261007_HV.json, captured 11:01 HKT 07-Oct; same win odds used by analyze-race.ts)
             SCMP odds: ⚠️ Win column loaded (reference only), Place column mis-parsed | HKJC: ✅ loaded

RACE: R9 — Class 3 | 1200m | Turf | Good to Firm | 12 runners — YIP FAT HANDICAP
CLASSIFICATION: Dominant (top Adj Win% 36.9%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-07 | Going: Good to Firm (SCMP header says "Good") | Surface: Turf
Target Race(s): R9 (Class 3 | 1200m | 12 runners)
Scratchings: none among the 12 declared runners (SCMP reserves R. LEADING AGILITY and R. PEGAS are not in the field)
Odds coverage: 12 horses with odds (HKJC win; place estimated from win by the tool)
SCMP data: ⚠️ partial
Form gaps: #10 TRIPLE FORTUNE has 1 local start (12th, 24-Jun; 105 days off, layoff >90).
           #12 THUNDER ACTION has 3 local starts (last 27-Jun; 102 days off).
           #4 AMAZING KID last ran 24-Jun (105 days off, layoff >90). It bled from the nostrils that day and passed the vet on 28-Sep.
           Banker #1 AURIO has 10+ starts, so it is eligible.
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 1 | AURIO | 36.9% | 72.7% | 5.3 | ✅ | ✅ | 3/7/5/3/2/1 | ★ 膽 (Banker) | 1-6: 16.7% (6.0) |
| 6 | PRESTIGE ALWAYS | 19.1% | 54.7% | 6.6 | ✅ | ✅ | 1/1/10/5/6/8 | 腳 (Leg) | 1-6: 16.7% (6.0) |
| 2 | MOTOR | 14.5% | 46.8% | 9.0 | ✅ | ✅ | 12/1/3/1/3/1 | 腳 (Leg) | 1-2: 12.3% (8.1) |
| 9 | LIVE WIRE | 14.5% | 47.3% | 11 | ✅ | ❌ | 1/1/5/3/7/4 | 腳 (Leg) | 1-9: 12.9% (7.8) |
| 7 | THE HEIR | 7.5% | 31.6% | 4.7 | ✅ | ✅ | 5/3/3/1/1/5 | 腳 (Leg) | 1-7: 7.4% (13.6) |
| 5 | THUNDER KIT | 2.6% | 13.8% | 12 | ❌ | ❌ | 8/3/3/11/1/2 | — | — |
| 4 | AMAZING KID | 2.4% | 14.5% | 19 | ❌ | ❌ | 10/4/6/8/3/1 | — | — |
| 3 | GUSTOSISIMO | 0.9% | 5.8% | 15 | ❌ | ❌ | 10/10/4/3/9/10 | — | — |
| 11 | STORMING DRAGON | 0.8% | 5.6% | 12 | ❌ | ❌ | 6/8/13/4/3/1 | — | — |
| 8 | HONEST WITNESS | 0.7% | 4.9% | 18 | ❌ | ❌ | 11/12/2/12/1/1 | — | — |
| 12 | THUNDER ACTION | 0.2% | 1.7% | 13 | ❌ | ❌ | 10/10/4 | — | — |
| 10 | TRIPLE FORTUNE | 0.0% | 0.8% | 18 | ❌ | ❌ | 12 | — | — |

Market: overround 22.7%. MC rates #1 AURIO (5.3, 2nd fav) well above the market: 36.9% win / 72.7% place, "undervalued by 110%", +95% place edge. The market favourite #7 THE HEIR (4.7) gets only 7.5% / 31.6% from MC. MC's finish-time projection also has #1 fastest (1:08.53), with #3 GUSTOSISIMO 2nd (+0.42s). #3's MC win chance is still only 0.9% because its jockey and trainer are 0% this season and its recent form is weak. Top MC quinella: 1-6 16.7% (fair 6.0).

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 1 | AURIO | 36.9% | 72.7% | 0 | 0 | 36.9% | 72.7% | 5.3 | Z Purton | 7 | 135 | Stalk | — | ★ 膽 (Banker) |
| 2 | 6 | PRESTIGE ALWAYS | 19.1% | 54.7% | +form +1 | +form +1 | 20.1% | 55.7% | 6.6 | H Y Yuen (-7) | 3 | 126 | Front/Prominent | +form | 腳 (Leg) |
| 3 | 2 | MOTOR | 14.5% | 46.8% | excuses +2, trial +2 | excuses +2, trial +2 | 18.5% | 50.8% | 9.0 | K C Leung | 11 | 133 | Stalk (wide) | +excuses, +trial | 腳 (Leg) |
| 4 | 9 | LIVE WIRE | 14.5% | 47.3% | +form +1 | +form +1 | 15.5% | 48.3% | 11 | A Atzeni | 9 | 121 | Stalk | +form | 腳 (Leg) |
| 5 | 7 | THE HEIR | 7.5% | 31.6% | 0 | 0 | 7.5% | 31.6% | 4.7 | C Y Ho | 1 | 125 | Stalk (rail) | — | 腳 (Leg) |
| 6 | 5 | THUNDER KIT | 2.6% | 13.8% | excuses +2 | excuses +2 | 4.6% | 15.8% | 12 | L Hewitson | 8 | 127 | Midfield | +excuses | — |
| 7 | 12 | THUNDER ACTION | 0.2% | 1.7% | excuses +2 | excuses +2 | 2.2% | 3.7% | 13 | M L Yeung | 6 | 118 | Midfield | +excuses | — |
| 8 | 3 | GUSTOSISIMO | 0.9% | 5.8% | 0 | 0 | 0.9% | 5.8% | 15 | Y L Chung (-2) | 12 | 131 | — | — | — |
| 9 | 8 | HONEST WITNESS | 0.7% | 4.9% | 0 | 0 | 0.7% | 4.9% | 18 | M F Poon | 2 | 121 | Front | — | — |
| 10 | 4 | AMAZING KID | 2.4% | 14.5% | -injury30d −3 | -injury30d −4 | 0.0% (floored) | 10.5% | 19 | A Badel | 10 | 127 | — | -injury30d | — |
| 11 | 11 | STORMING DRAGON | 0.8% | 5.6% | -notRO −2 | -notRO −2 | 0.0% (floored) | 3.6% | 12 | P N Wong (-7) | 4 | 120 | — | -notRO | — |
| 12 | 10 | TRIPLE FORTUNE | 0.0% | 0.8% | 0 | 0 | 0.0% | 0.8% | 18 | R Kingscote | 5 | 121 | Rear | — | — |

Factor labels: trial +2 (positive trackwork), excuses +2 (checked/crowded/restricted room/wide trip), +form +1 (resumed a winner / made all), -injury30d −3 win / −4 place, -notRO −2. Caps are ±8 win / ±10 place, and none were reached. Negative results are floored at 0%. Banker eligibility: #1 has 10+ starts, so it is eligible.

SCMP adjustments applied:
- **#1 AURIO**: Star Form says it "produced 1,200m wins once across each track and four placings". That is course/distance-proven but has no scoring keyword. TIR "shifted across behind runners early" is positional, so no flag. No adjustment.
- **#6 PRESTIGE ALWAYS**: Star Form says it "resumed a winner after leading 200m out" (last two runs 1/1), so +form +1. It is up 6 rating points. TIR "lay in over concluding stages" is minor and unflagged. Gate 3 suits an on-pace 1,200m type at HV.
- **#2 MOTOR**: TIR says it was "checked near 100M; raced wide without cover" when 12th last start, so excuses +2. Trackwork says it "ran on powerfully to win his latest Conghua turf trial", so trial +2. Star Form also notes "a sterling four-win campaign". Gate 11 is a negative at HV 1,200m but not an exclusion (Rule 15).
- **#9 LIVE WIRE**: Star Form says it won "by a nose over the Valley 1,200m in June. Resumed cosy" (last two runs 1/1), so +form +1. It is up 7 rating points.
- **#7 THE HEIR**: no keyword flags. It has gate 1 and form of 5/3/3/1/1/5. It is the market favourite, but MC rates it 5th.
- **#5 THUNDER KIT**: TIR "shortly after start, raced in restricted room", so excuses +2.
- **#12 THUNDER ACTION**: TIR "crowded after short distance; blundered at 300M". Star Form says "without a clear run late", so excuses +2.
- **#4 AMAZING KID**: Vet report says it bled from the nostrils on 24-Jun 2026 and passed on 28-Sep 2026, only 9 days ago. That gives -injury30d (−3 win / −4 place).
- **#11 STORMING DRAGON**: TIR "eased leaving 300M; could not be fully ridden out", so -notRO −2.
- **#8 HONEST WITNESS**: Star Form "made all in back-to-back Valley 1,200m runs" refers to older runs; its last two runs were 11th and 12th. Not counted as recent form, so no adjustment.
- No horse is 8+ years old (oldest is #7 THE HEIR at 7), so there is no -age flag.

Reasoning: #1 AURIO's 36.9% Adj Win% makes this a **Dominant** race (Mode A, 5-horse pool). Four other horses have Adj Place% ≥ 25%: #6, #2, #9 and #7. With the banker, that is exactly 5, so the must-include rule and Mode A pool size line up. All five are also the top 5 by raw MC, and four of them are the market's top 4 (the exception is #9 at 11). Pace: #6 (gate 3, recently led and won) and #7 (gate 1) should be handy, with #1 stalking from gate 7. That suits HV 1,200m's front-runner bias. #2 from gate 11 is the main wide-draw risk. The 2nd-ranked #6 has Adj Place% 55.7% < 63%, so this is single-banker 膽拖, not 雙膽拖.

## TRIO POOL (any order)

```
POOL: #1, #6, #2, #9, #7
MODE: A | POOL SIZE: 5

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #1 AURIO (Adj Place% 72.7%) ← locked in every combo
腳 (Legs):  #6, #2, #9, #7
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #1, #6, #2 | 17.3% | $58 per $10 |
| 2 | #1, #6, #9 | 13.9% | $72 per $10 |
| 3 | #1, #2, #9 | 12.5% | $80 per $10 |
| 4 | #1, #6, #7 | 6.1% | $163 per $10 |
| 5 | #1, #2, #7 | 5.5% | $181 per $10 |
| 6 | #1, #9, #7 | 4.4% | $226 per $10 |

Estimated chance that the Strategy A ticket hits (sum of the 6 combos): about 60% (Harville; this probably overstates it, because the banker's own MC Place% is 72.7%).

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 6 (膽拖: C(4,2), 4 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

TICKET: 膽 #1 | 腳 #6, #2, #9, #7
  1-6-2, 1-6-9, 1-2-9, 1-6-7, 1-2-7, 1-9-7
```

Value note: the banker is the 2nd favourite (5.3), not the favourite, and the market favourite #7 is the weakest leg. The combos without #7 (1-6-2, 1-6-9, 1-2-9) are MC's three most likely, and they leave out the market's top pick, so they should pay above a "chalk" Trio. 1-2-9 (with #9 at 11) is the value combo.

PASS CONDITIONS:
- If #1 AURIO (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If going changes to Yielding/Soft or worse → re-run the MC. #4 AMAZING KID and #5 THUNDER KIT both have wet-track wins.
- If #1 drifts beyond ~10 in late betting → consider PASS. The banker case rests on an MC-vs-market disagreement.

CONFIDENCE: MEDIUM-HIGH. The banker has strong MC numbers (72.7% place, fastest projected time, Z Purton, course-and-distance proven). The pool covers the top 5 by MC and four of the market's top 4. The main risks: #1 carries top weight (135 lb), and HV Class 3 1,200m races are upset-prone.

CAVEATS:
- SCMP is partial. The SCMP Place column (e.g. #1 Win 5.3 / Place 5.5, #2 9.7 / 8.7) has place ≥ win, so it is mis-parsed. The SCMP Q/QP matrices came back identical to each other and implausible (e.g. 1-6 at 4.1), so the Q/QP cross-reference was not done. SCMP Win odds (#7 3.9, #1 5.3, #6 7.3, #2 9.7, #9 13) differ slightly from the HKJC 11:01 capture but would not change any flag.
- **Model vs market conflict**: the market favourite #7 THE HEIR (4.7, SCMP 3.9) is rated only 7.5% win / 31.6% place by MC. It stays in the pool as a leg (Adj Place% ≥ 25%).
- Horses at ≤15 odds outside the pool: #5 (12), #11 (12), #12 (13), #3 (15). Rule 9 prevents hard exclusion but does not force inclusion. All are below 16% Adj Place%, and #3 GUSTOSISIMO has the 2nd-fastest projected time despite 0.9% MC win.
- The skill's HV guidance favours wider pools (Mode B/C). The Dominant classification (36.9% ≥ 35%) still sets Mode A by rule. It is close to the 35% line.
- #4 AMAZING KID passed the vet only 9 days ago after bleeding (-injury30d applied). #10 and #12 have sparse local form (1 and 3 starts).
- Going: HKJC racecard/MC uses Good to Firm, while the SCMP header shows "Good". The difference is minor.
- Odds were captured at 11:01 HKT on 07-Oct (race at about 22:50). The HKJC pool will move before the jump.
- Historical sync and odds fetch were not re-run in this session (already done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #1 AURIO (MC Win% 36.9%, MC Place% 72.7%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6 (54.7%), #9 (47.3%), #2 (46.8%), #7 (31.6%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
  (no primary leg is in the 20–30% band; the lowest is #7 at 31.6%, Win odds 4.7)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none
  (all horses under 10 — #7 4.7, #1 5.3, #6 6.6, #2 9.0 — are already banker/primary legs)
Action: no replacement, nothing added
Final legs: #6, #9, #2, #7
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

STRATEGY B TICKET: 膽 #1 | 腳 #6, #9, #2, #7
  1-6-9 (16.0%), 1-6-2 (16.0%), 1-2-9 (11.3%), 1-6-7 (7.6%), 1-2-7 (5.3%), 1-9-7 (5.3%)
  Est. hit chance (Harville, raw MC): about 61%
```

Comparison: in this race Strategy A and Strategy B give **identical tickets**: banker #1, legs #6/#2/#9/#7, 6 combos, $60. The SCMP adjustments change the order of the legs (#2 MOTOR moves up past #9 on excuses + trial) but not who is in the pool. Strategy B has no replacement because every horse under 10 odds is already in the pool.

═══════════════════════════════════════════════════════════
