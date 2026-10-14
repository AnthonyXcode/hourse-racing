# Trio (單T) Strategy — Happy Valley 2026-10-14 Race 4

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-14 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, 12 jockey + 12 trainer profiles loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork loaded; odds columns unlabelled; Q/QP matrix not machine-readable)
ODDS SOURCE: HKJC early-morning win pool (fetch-odds.ts, data/odds/odds_20261014_HV.json, captured 11:00 HKT 14-Oct)
             SCMP odds: ⚠️ loaded but ambiguous (cross-reference only) | HKJC: ✅ loaded

RACE: R4 — Class 4 | 1200m | Turf ("A" course) | Good | 12 runners — FINANCE HANDICAP
CLASSIFICATION: Dominant (top Adj Win% 41.9%) | POOL SIZE: 7
MODE: A: Tight Pool (5), expanded to 7 by Rule 8 (Adj Place% ≥ 20%)
BET STRUCTURE (A): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15  (2nd-ranked #4 Adj Place% 42.9% < 63%, so no 雙膽拖)
BET STRUCTURE (B): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-14 | Going: Good | Surface: Turf
Target Race(s): R4 (Class 4 | 1200m | 12 runners)
Scratchings: none (racecard isScratched = false for all 12; SCMP lists reserves Lakeshore Hero / True Brothers with no odds)
Odds coverage: 12 horses with HKJC win odds (the MC tool estimated place odds from the win odds)
SCMP data: ⚠️ partial
Form gaps: #9 WINNING COMBO is a debutant (0 starts; 4 placings in its last 12 trials).
           #8 CHAMP'S DOMAIN has 1 start (13th, ST 1000m, 1-Oct). #10 COUNTRY PRIDE has 3 starts, #11 CASA BUDDY 4.
           #5 LEADING DRAGON: transport injury (abrasions to both front legs), withdrawn 23-Sep, passed the vet 06-Oct (8 days ago).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 2 | FORERUNNER | 41.9% | 75.0% | 4.9 | ✅ | ✅ | 2/2/4/1/2/4 | ★ 膽 (Banker) | 2-5: 13.2% (7.6) |
| 5 | LEADING DRAGON | 13.1% | 42.2% | 6.3 | ✅ | ✅ | 4/4/1/11/3/2 | 腳 (Leg) | 2-5: 13.2% (7.6) |
| 4 | ELEGANT LIFE | 11.5% | 38.9% | 13 | ✅ | ❌ | 7/10/3/1/7/3 | 腳 (Leg) | 2-4: 11.6% (8.6) |
| 10 | COUNTRY PRIDE | 11.4% | 38.7% | 4.9 | ✅ | ✅ | 3/12/3 | 腳 (Leg) | 2-10: 11.7% (8.6) |
| 7 | THE PERFECT MATCH | 8.2% | 31.4% | 6.6 | ✅ | ✅ | 5/1/4/5/3/9 | 腳 (Leg) | 2-7: 8.9% (11.3) |
| 6 | LOOKING BRIGHT | 4.7% | 21.4% | 17 | ✅ | ❌ | 8/10/2/5/11/8 | — (replaced by #12) | 2-6: 5.4% (18.5) |
| 3 | FIND MY LOVE | 3.5% | 18.2% | 11 | ❌ | ❌ | 7/8/9/1/6/8 | — | — |
| 1 | DRAGON FOUR SEAS | 2.8% | 14.1% | 10 | ❌ | ❌ | 12/6/5/12/11/12 | — | — |
| 8 | CHAMP'S DOMAIN | 1.2% | 6.7% | 46 | ❌ | ❌ | 13 | — | — |
| 12 | SAME TO YOU | 1.1% | 7.8% | 9.9 | ❌ | ✅ | 9/3/14/2/3/11 | 腳 (Leg, replacement) | — (replacement candidate) |
| 9 | WINNING COMBO | 0.3% | 2.6% | 25 | ❌ | ❌ | (debut) | — | — |
| 11 | CASA BUDDY | 0.3% | 3.0% | 40 | ❌ | ❌ | 11/12/13/13 | — | — |

Market: overround 22.4%. MC and the market both have #2 FORERUNNER as favourite (co-favourite with #10 at 4.9), but MC rates #2 far higher (rating 75, 9 points clear; 41.9% win / 75.0% place). The tool flags #2 as undervalued by 93%, with an 84% Place edge. #4 ELEGANT LIFE (13, 8th in market) is MC's 3rd pick at 38.9% place. MC is cooler than the market on #10 COUNTRY PRIDE (only 3 starts) and much cooler on #12 SAME TO YOU (5th in market at 9.9, 7.8% place, overvalued by 89%). The top quinellas are all #2-based: 2-5 13.2%, 2-10 11.7%, 2-4 11.6%.

Finish-time projection: #3 FIND MY LOVE has the fastest projected time (1:09.38), but its recent form is poor, so MC rates it lower. #6 LOOKING BRIGHT is next, then #2 and #4.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 2 | FORERUNNER | 41.9% | 75.0% | 0 | 0 | 41.9% | 75.0% | 4.9 | K C Leung | 2 | 135 | Stalker (top-4 in last 6) | — | ★ 膽 (Banker) |
| 2 | 4 | ELEGANT LIFE | 11.5% | 38.9% | excuses +2, trial +2 | excuses +2, trial +2 | 15.5% | 42.9% | 13 | E C W Wong (-3) | 7 | 132 | Midfield/Closer | +excuses, +trial | 腳 (Leg) |
| 3 | 10 | COUNTRY PRIDE | 11.4% | 38.7% | excuses +2, +form +1 | excuses +2, +form +1 | 14.4% | 41.7% | 4.9 | Z Purton | 9 | 127 | Stalker (raced wide) | +excuses, +form | 腳 (Leg) |
| 4 | 7 | THE PERFECT MATCH | 8.2% | 31.4% | excuses +2 | excuses +2 | 10.2% | 33.4% | 6.6 | C L Chau (-2) | 5 | 130 | Closer | +excuses (single bump only) | 腳 (Leg) |
| 5 | 5 | LEADING DRAGON | 13.1% | 42.2% | -injury30d −3 | -injury30d −4 | 10.1% | 38.2% | 6.3 | H Y Yuen (-7) | 8 | 131 | Front (wire-to-wire winner) | -injury30d | 腳 (Leg) |
| 6 | 1 | DRAGON FOUR SEAS | 2.8% | 14.1% | excuses +2, trial +2 | excuses +2, trial +2 | 6.8% | 18.1% | 10 | L Ferraris | 3 | 135 | — | +excuses, +trial | — |
| 7 | 3 | FIND MY LOVE | 3.5% | 18.2% | excuses +2 | excuses +2 | 5.5% | 20.2% | 11 | M L Yeung | 6 | 134 | Midfield | +excuses | 腳 (Leg, Rule 8) |
| 8 | 6 | LOOKING BRIGHT | 4.7% | 21.4% | 0 | 0 | 4.7% | 21.4% | 17 | K Teetan | 10 | 130 | — | — | 腳 (Leg, Rule 8) |
| 9 | 8 | CHAMP'S DOMAIN | 1.2% | 6.7% | 0 | 0 | 1.2% | 6.7% | 46 | J Orman | 11 | 128 | — | — | — |
| 10 | 12 | SAME TO YOU | 1.1% | 7.8% | 0 | 0 | 1.1% | 7.8% | 9.9 | A Badel | 1 | 117 | — | — | — |
| 11 | 9 | WINNING COMBO | 0.3% | 2.6% | 0 | 0 | 0.3% | 2.6% | 25 | Y L Chung (-2) | 12 | 128 | — (debut) | — | — |
| 12 | 11 | CASA BUDDY | 0.3% | 3.0% | 0 | 0 | 0.3% | 3.0% | 40 | H T Mo (-2) | 4 | 120 | — | — | — |

Factor labels: excuses +2 (checked / crowded / steadied / held up / wide without cover), trial +2, +form +1 (rallied / improved / made all), -injury30d (−3 win / −4 place). As in earlier reports, positive flags are applied equally to Win% and Place%. No horse reached the caps (±8 win / ±10 place). Banker eligibility: #2 has 10 HK form records, so it is eligible.

SCMP adjustments applied:
- **#2 FORERUNNER**: TIR says it "from a wide barrier was shifted across behind runners in the early stages". That is not a bad-luck excuse. Star Form calls it a "hard-charging second" and notes it has finished top-four in its last six starts. That is consistent form, not an "improved/rallied/made all" signal. No adjustment. It has gate 2 today.
- **#4 ELEGANT LIFE**: TIR says it was "steadied near the 200m and shifted out", so excuses +2. Trackwork says it "produced a sharp piece of work in a stall test last week and can improve", so trial +2.
- **#10 COUNTRY PRIDE**: TIR says it "raced wide and without cover for the majority of the event", so excuses +2. Star Form says it "rallied for third on debut", so +form +1.
- **#7 THE PERFECT MATCH**: TIR says it was "eased and shifted out to continue into clear running" near the 100m, so excuses +2. "Bumped on jumping" appears only once, so there is no -barrier penalty.
- **#5 LEADING DRAGON**: Vet report says it suffered transport abrasions to both front legs, was withdrawn 23-Sep and passed 06-Oct (8 days, under 30), so -injury30d. Star Form says it "trialled fine in visors". That is not strong enough to count as a trial +2.
- **#1 DRAGON FOUR SEAS**: TIR says it was "checked when crowded shortly after the start", so excuses +2. Star Form says it "recently won a trial", so trial +2.
- **#3 FIND MY LOVE**: Star Form says it was "badly held up last start", and TIR says it "could not be fully ridden out when positioned close to a runner", so excuses +2. This is a traffic problem, not a soundness concern, so no -notRO penalty.
- **#6, #8, #9, #11, #12**: no TIR, vet or trackwork flags. #12 SAME TO YOU is 8 years old, but SCMP has no vet note for it, and R4 is Class 4, so no -age penalty. #8's Star Form says "Won on debut", which conflicts with the HKJC data (13th on debut). No flag was applied.

Reasoning: #2 FORERUNNER is the clear MC #1. It has the top rating (75, 9 points clear), has finished top-4 in 6 straight runs (including a C&D 1200m win), and has an inside gate 2. HV 1200m has a front-runner/on-pace bias, which suits it. Adj Win% 41.9% makes the race Dominant, so Mode A applies.

The base 5 is the banker + 4 by Adj Place%: #4 (42.9), #10 (41.7), #5 (38.2) and #7 (33.4). Rule 8 (Adj Place% ≥ 20%) adds #6 (21.4) and #3 (20.2). Rule 9 adds no one: the only negative-flag horse, #5, is already in. The result is a 7-horse pool, which fits the skill's Happy Valley "wider pool" note.

#4's Adj Place% is 42.9%, below 63%, so this is a single-banker 膽拖.

Left out:
- **#12 SAME TO YOU (9.9, 5th favourite)**: Adj Place% is 7.8% and it has no negative flag, so Rule 9 does not force it in. It is the main difference from Strategy B.
- **#1 DRAGON FOUR SEAS (10)**: Adj Place% 18.1%, just under the Rule 8 line, even after excuses +2 and trial +2.

Pace: #5 LEADING DRAGON (a wire-to-wire winner, with a 7lb claim) should press forward from gate 8, and #2 should sit handy from gate 2. #12 also has gate 1. The closers #7 and #4 need a genuine tempo.

## TRIO POOL (Strategy A, any order)

```
POOL: #2, #4, #10, #7, #5, #3, #6
MODE: A (Dominant, #2 Adj Win% 41.9% ≥ 35%), expanded 5 → 7 | POOL SIZE: 7
  Banker + top 4 by Adj Place%: #2 (75.0), #4 (42.9), #10 (41.7), #5 (38.2), #7 (33.4)
  + Rule 8 (Adj Place% ≥ 20%): #6 (21.4), #3 (20.2)

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #2 FORERUNNER (Adj Win% 41.9%, Adj Place% 75.0%) ← locked in every combo
腳 (Legs):  #4, #10, #5, #7, #3, #6
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #2, #4, #10 | 9.5% | $105 per $10 |
| 2 | #2, #4, #7 | 6.4% | $156 per $10 |
| 3 | #2, #4, #5 | 6.4% | $157 per $10 |
| 4 | #2, #10, #7 | 5.9% | $170 per $10 |
| 5 | #2, #10, #5 | 5.8% | $172 per $10 |
| 6 | #2, #5, #7 | 3.9% | $255 per $10 |
| 7 | #2, #4, #3 | 3.3% | $303 per $10 |

Estimated chance the Strategy A ticket hits (sum of 15 combos): about 58% on Adj Win%, or about 68% on raw MC. Harville gives #2 a top-3 chance of 80–85%, which is higher than MC's direct 75.0% place figure. Treat these hit rates as upper bounds.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

TICKET: 膽 #2 | 腳 #4, #10, #5, #7, #3, #6

TOP COMBINATIONS (highest value):
  2-4-10 (9.5%), 2-4-7 (6.4%), 2-4-5 (6.4%), 2-10-7 (5.9%), 2-10-5 (5.8%), 2-5-7 (3.9%), 2-4-3 (3.3%)
```

Value note: #2 is joint favourite at 4.9, not a short-priced favourite, so the dividends should be reasonable. Combos with #4 ELEGANT LIFE (13, 8th in the market) are the value lines: 2-4-10, 2-4-7 and 2-4-5. The chalkiest outcome is 2-10-5 or 2-10-7.

PASS CONDITIONS:
- If #2 FORERUNNER (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going changes to Yielding/Soft or worse → re-run the MC.
- If #2 drifts beyond ~8 in late betting (market losing faith in the banker) → consider PASS.
- If #5 LEADING DRAGON is scratched (recent transport injury) → drop it from the legs (C(5,2) = 10 combos, $100).

CONFIDENCE: MEDIUM. The banker is strong (MC 75.0% place, 9-point rating gap, top-4 in 6 straight, inside gate). The legs are spread fairly evenly (#4, #10, #5 each about 38–43% place), and Happy Valley 1200m with 12 runners has upset risk.

CAVEATS:
- **SCMP data is partial.** Star Form, TIR, Vet and Trackwork were read. Each horse shows three unlabelled odds figures (for example #2 5 / 5.1 / 1.7, #10 3.9 / 4.4 / 2.6, #12 11 / 8.9 / 2.5). They roughly agree with the HKJC order but cannot be mapped to win/place with certainty. The Q/QP matrix is on the page but could not be read into pairs, so no QP cross-reference was done.
- **#5 LEADING DRAGON**: SCMP's text says "withdrawn", but that refers to the 23-Sep race (transport abrasions). The vet passed it on 06-Oct, and HKJC lists it as a runner tonight at 6.3. Confirm it is still a starter at the jump.
- **#10 COUNTRY PRIDE** has only 3 starts (2 at the trip), so its MC figures are less reliable. The market has it as co-favourite.
- **#8 CHAMP'S DOMAIN**: SCMP Star Form says "won on debut", but HKJC data shows it was 13th on debut (ST 1000m, 1-Oct). This doesn't affect the ticket (6.7% place, at 46).
- **#9 WINNING COMBO** is a debutant, so MC has no form for it (2.6% place).
- **#12 SAME TO YOU (9.9)** is not in Strategy A but is a Strategy B leg.
- The Harville hit rates come from normalised win probabilities and overstate the banker's top-3 chance compared with the MC place figure.
- Odds are from the 11:00 HKT early pool. The pool will move before the jump.
- Historical sync was not re-run in this session (already done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #2 FORERUNNER (MC Win% 41.9%, MC Place% 75.0%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #5 (42.2%), #4 (38.9%), #10 (38.7%), #7 (31.4%), #6 (21.4%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
  #6 LOOKING BRIGHT (MC Place% 21.4%, Win odds 17)
  (#7 is 31.4%, which is outside 20–30%. #4, #5 and #10 are above 30%.)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10):
  #12 SAME TO YOU (Win odds 9.9, MC Place% 7.8%)
  (#1 at 10.0 is not < 10. #3 is at 11.)
Action: #12 replaced #6 LOOKING BRIGHT (the only replaceable leg)
Final legs: #5, #4, #10, #7, #12
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #2 | 腳 #5, #4, #10, #7, #12
  2-5-4, 2-5-10, 2-5-7, 2-5-12, 2-4-10, 2-4-7, 2-4-12, 2-10-7, 2-10-12, 2-7-12

Top combos (Harville, raw MC): 2-4-5 9.8% | 2-5-10 9.7% | 2-4-10 8.3% | 2-5-7 6.7% | 2-4-7 5.7% | 2-7-10 5.7% | 2-5-12 0.8%
Est. ticket hit chance (sum of 10 combos, raw MC): ~49%
```

Comparison: Both strategies use the same banker (#2) and share four legs (#4, #10, #5, #7).
- **Strategy A** adds #3 FIND MY LOVE and #6 LOOKING BRIGHT through Rule 8. That makes 6 legs: 15 combos, $150, about 58–68% estimated hit.
- **Strategy B** swaps #6 for the market-backed #12 SAME TO YOU (9.9). MC rates #12 at only 7.8% place, so the swap adds little model probability. That makes 5 legs: 10 combos, $100, about 49%.

Robustness: #12 is right on the 10-odds line, and SCMP shows it at 11 / 8.9. If #12 goes off at 10 or longer, no swap happens: the Strategy B legs become #5, #4, #10, #7, #6 (still 10 combos, $100, about 58%). If #1 DRAGON FOUR SEAS (currently exactly 10) shortens below 10, it becomes a second candidate. With #6 already replaced and no other replaceable leg, it would be added directly, giving 6 legs (15 combos, $150).

```
═══════════════════════════════════════════════════════════
```
