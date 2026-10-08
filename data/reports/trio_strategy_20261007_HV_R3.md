# Trio (單T) Strategy — Happy Valley 2026-10-07 Race 3

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-07 | Race 3
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey + trainer stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds and Q/QP matrix look mis-parsed)
ODDS SOURCE: HKJC pool (data/odds/odds_20261007_HV.json, captured 11:01 HKT 07-Oct; same win odds used by analyze-race.ts)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R3 — Class 4 | 1650m | Turf ("C+3" course) | Good to Firm | 12 runners — FAT TSEUNG HANDICAP
CLASSIFICATION: Dominant (top Adj Win% 39.8%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE (A): 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-07 | Going: Good to Firm | Surface: Turf
Target Race(s): R3 (Class 4 | 1650m | 12 runners)
Scratchings: none
Odds coverage: 12 horses with odds (HKJC win; place estimated from win by the tool)
SCMP data: ⚠️ partial
Form gaps: #5 BULLISH NOVA has only 3 local starts (last run 01-Jul, 98 days ago, layoff >90 days).
           #10 FORTUNE STAR last ran 12-Jul (87 days). #2 RAGGA BOMB last ran 15-Apr (175 days, returning
           from lameness). #12 GLORIOUS ST PAUL'S last ran 07-Jun (122 days, returning from a bleed).
           Banker #4 SUNDAY'S SERENADE has 10+ starts (eligible).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 4 | SUNDAY'S SERENADE | 39.8% | 73.0% | 5.0 | ✅ | ✅ | 2/2/8/3/2/9 | ★ 膽 (Banker) | 4-6: 14.2% (7.0) |
| 6 | DECISION LINK | 15.1% | 45.0% | 6.6 | ✅ | ✅ | 5/5/12/4/1/6 | 腳 (Leg) | 4-6: 14.2% (7.0) |
| 1 | EXCEED THE LIMIT | 10.1% | 33.6% | 15 | ✅ | ❌ | 4/5/2/8/11/8 | 腳 (Leg) | 1-4: 9.3% (10.7) |
| 8 | LUCK IS BACK | 9.4% | 32.9% | 11 | ✅ | ❌ | 5/1/5/7/14/11 | 腳 (Leg) | 4-8: 9.3% (10.7) |
| 2 | RAGGA BOMB | 6.0% | 24.3% | 25 | ✅ | ❌ | 6/7/3/1/8/2 | — (replaced by #10) | 2-4: 5.8% (17.3) |
| 3 | CLASS | 5.4% | 21.9% | 8.3 | ✅ | ✅ | 8/9/9/12/13/13 | 腳 (Leg) | 3-4: 5.6% (17.9) |
| 7 | DASHING MAURISON | 4.3% | 18.8% | 30 | ❌ | ❌ | 10/6/2/1/9/6 | — | — |
| 9 | COLOURFUL GAN | 4.1% | 17.7% | 40 | ❌ | ❌ | 8/9/4/13/10/10 | — | — |
| 10 | FORTUNE STAR | 2.9% | 15.5% | 3.3 | ❌ | ✅ | 7/12/5/5/4/6 | 腳 (Leg) — replaced #2 | — |
| 12 | GLORIOUS ST PAUL'S | 1.1% | 7.0% | 47 | ❌ | ❌ | 14/4/8/9/13/11 | — | — |
| 5 | BULLISH NOVA | 1.0% | 5.4% | 6.5 | ❌ | ✅ | 10/4/3 | 腳 (Leg) — added directly | — |
| 11 | LUCKY XANDER | 0.8% | 4.8% | 58 | ❌ | ❌ | 10/12/10/10/14/14 | — | — |

Market: overround 22.3%. The model and market disagree sharply. MC's top pick, #4 SUNDAY'S SERENADE (Purton), is 2nd favourite at 5.0 (MC: "undervalued by 99%"). The market favourite, #10 FORTUNE STAR (3.3), gets only 2.9% win / 15.5% place from MC ("overvalued by 90%"). The 3rd favourite, #5 BULLISH NOVA (6.5), gets only 1.0% / 5.4% ("overvalued by 93%"). MC finish-time projection: #1 EXCEED THE LIMIT is fastest (1:39.22), with #4 +0.56s and #2 +0.98s behind it.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 4 | SUNDAY'S SERENADE | 39.8% | 73.0% | 0 | 0 | 39.8% | 73.0% | 5.0 | Z Purton | 9 | 131 | Stalk | — | ★ 膽 (Banker) |
| 2 | 6 | DECISION LINK | 15.1% | 45.0% | excuses +2 | excuses +2 | 17.1% | 47.0% | 6.6 | L Ferraris | 2 | 126 | Stalk (gate 2) | +excuses | 腳 (Leg) |
| 3 | 1 | EXCEED THE LIMIT | 10.1% | 33.6% | +form +1, excuses +2 | +form +1, excuses +2 | 13.1% | 36.6% | 15 | L Hewitson | 12 | 135 | Closer | +form, +excuses | 腳 (Leg) |
| 4 | 8 | LUCK IS BACK | 9.4% | 32.9% | -notRO −2 | -notRO −2 | 7.4% | 30.9% | 11 | E C W Wong (-3) | 11 | 123 | Midfield | -notRO | 腳 (Leg) |
| 5 | 3 | CLASS | 5.4% | 21.9% | excuses +2 | excuses +2 | 7.4% | 23.9% | 8.3 | J Orman | 1 | 131 | Midfield | +excuses | — |
| 6 | 9 | COLOURFUL GAN | 4.1% | 17.7% | +form +1, excuses +2 | +form +1, excuses +2 | 7.1% | 20.7% | 40 | R Kingscote | 3 | 121 | Closer | +form, +excuses | — |
| 7 | 2 | RAGGA BOMB | 6.0% | 24.3% | +form +1 | +form +1 | 7.0% | 25.3% | 25 | B Avdulla | 6 | 135 | Stalk | +form | 腳 (Leg) |
| 8 | 10 | FORTUNE STAR | 2.9% | 15.5% | excuses +2, trial +2 | excuses +2, trial +2 | 6.9% | 19.5% | 3.3 | A Atzeni | 7 | 120 | Midfield | +excuses, +trial | — |
| 9 | 7 | DASHING MAURISON | 4.3% | 18.8% | +form +1 | +form +1 | 5.3% | 19.8% | 30 | H Bentley | 8 | 123 | Front | +form | — |
| 10 | 12 | GLORIOUS ST PAUL'S | 1.1% | 7.0% | excuses +2 | excuses +2 | 3.1% | 9.0% | 47 | M F Poon | 5 | 118 | Stalk | +excuses | — |
| 11 | 5 | BULLISH NOVA | 1.0% | 5.4% | excuses +2 | excuses +2 | 3.0% | 7.4% | 6.5 | M Chadwick | 10 | 127 | Closer | +excuses | — |
| 12 | 11 | LUCKY XANDER | 0.8% | 4.8% | 0 | 0 | 0.8% | 4.8% | 58 | M L Yeung | 4 | 120 | Front | — | — |

Factor labels: excuses +2 (steadied/bumped/wide/lost running), trial +2, +form +1 (improved/rallied/made all), -notRO −2 (eased). Caps are ±8 win / ±10 place, and none were reached. Banker eligibility: #4 has 10+ starts, so it is eligible.

SCMP adjustments applied:
- **#4 SUNDAY'S SERENADE**: Star Form says "Did place four times at 1,400m and Valley 1,650m from final six starts". That is consistent form, but it does not match any scoring keyword. TIR "shifted across behind runners early" is a positional note, not an excuse. No adjustment (0).
- **#6 DECISION LINK**: TIR "steadied after start", so excuses +2. The Star Form win note ("added to Valley 1,200m win") has no improved/rallied keyword.
- **#1 EXCEED THE LIMIT**: Star Form "Improved… with a rallying second", so +form +1. TIR "Steadied approaching 1400M", so excuses +2.
- **#8 LUCK IS BACK**: TIR "Eased concluding stages", so -notRO −2. Star Form notes it is a "Bleeder". The bleed date is not given, so no injury penalty, but this is flagged as a risk. Market odds are 11 (≤ 15), so Rule 9 keeps it eligible.
- **#3 CLASS**: TIR "Shifted in at start, bumped; raced wide without cover", so excuses +2. Only one bumped-at-start note, so no -barrier penalty. Star Form is negative ("did not figure from six local runs") but has no scoring flag.
- **#9 COLOURFUL GAN**: "rallying fourth", so +form +1. "Lost rightful running; blundered", so excuses +2.
- **#2 RAGGA BOMB**: "improved second… with a win", so +form +1. Vet: lame left fore 18-May, passed vet 31-Aug (37 days ago, more than 30), so no -injury30d penalty. It is returning from a 175-day absence.
- **#10 FORTUNE STAR**: TIR "Raced wide without cover majority of event", so excuses +2. Trackwork "Caught eye with recent morning work", so trial +2.
- **#7 DASHING MAURISON**: "Made all… over Valley 1,800m", so +form +1. The TIR "no explanation for failure to run on" was not labelled unacceptable by the stewards, so no -perf penalty.
- **#12 GLORIOUS ST PAUL'S**: "Raced wide without cover", so excuses +2. The bleed of 07-Jun passed on 07-Sep, exactly 30 days before the race (not < 30), so no injury penalty.
- **#5 BULLISH NOVA**: "Bumped at 500M; steadied concluding stages", so excuses +2.
- **#11 LUCKY XANDER**: a single bumped-at-start note, so no scoring flag.

Reasoning: #4 SUNDAY'S SERENADE is MC's clear top pick. It is the highest-rated horse in the field (MC rating 70, 8 points clear) with Purton aboard, has 5 runs at the trip, a string of placings at Valley 1,650m (2/2/8/3/2), and is second-fastest on projected time. At Adj Win% 39.8% the race classifies as Dominant, so Mode A applies: the banker plus the 4 best by Adj Place% (#6 47.0%, #1 36.6%, #8 30.9%, #2 25.3%). These are also exactly the horses that the Adj Place% ≥ 25% must-include rule requires, so no forced additions are needed. #3 CLASS (23.9%) and #9 COLOURFUL GAN (20.7%) sit just outside the pool. Pace: #7 DASHING MAURISON and #11 LUCKY XANDER are likely leaders. HV 1,650m suits stalkers. #4 (gate 9) and #6 (gate 2) should get a handy sit. #1 and #8 face wide gates (12 and 11) and will need luck from behind. The market horses #10 FORTUNE STAR (3.3 fav) and #5 BULLISH NOVA (6.5) are outside Strategy A on thresholds. Neither carries a negative flag, so Rule 9 does not force them in (same handling as the 04-Oct reports). Strategy B covers both.

## TRIO POOL (Strategy A, any order)

```
POOL: #4, #6, #1, #8, #2
MODE: A (Dominant, #4 Adj Win% 39.8% ≥ 35%) | POOL SIZE: 5
  Mode A = banker #4 + top 4 by Adj Place% (#6 47.0, #1 36.6, #8 30.9, #2 25.3)
  Must-include (Adj Place% ≥ 25%): #4, #6, #1, #8, #2 — all already in pool

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #4 SUNDAY'S SERENADE (Adj Win% 39.8%, Adj Place% 73.0%) ← locked in every combo
腳 (Legs):  #6, #1, #8, #2
雙膽拖 check: 2nd-ranked #6 Adj Place% 47.0% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #4, #6, #1 | 7.1% | $141 per $10 |
| 2 | #4, #6, #8 | 3.8% | $265 per $10 |
| 3 | #4, #6, #2 | 3.6% | $282 per $10 |
| 4 | #4, #1, #8 | 2.8% | $363 per $10 |
| 5 | #4, #1, #2 | 2.6% | $386 per $10 |
| 6 | #4, #8, #2 | 1.4% | $726 per $10 |

Estimated chance that the Strategy A ticket hits (sum of the 6 combos): about 21%. The SCMP boosts spread win% across non-pool horses, which dilutes the normalised figures. On raw MC the same 6 combos sum to about 25%.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 6 (膽拖: C(4,2), 4 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

TICKET: 膽 #4 | 腳 #6, #1, #8, #2
  4-6-1, 4-6-8, 4-6-2, 4-1-8, 4-1-2, 4-8-2
```

Value note: the favourite (#10) is not in the pool, so any hit should pay well above "chalk" Trio levels. The 4-6 pair is MC's top quinella (14.2%, fair 7.0), and 4-6-1 is the core combo.

PASS CONDITIONS:
- If #4 SUNDAY'S SERENADE (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If going changes to Yielding/Soft or worse → re-run the MC.
- If #4 drifts beyond ~10 in late betting while #10 firms below 3.0 → consider PASS. The banker case rests on MC against a market that disagrees.

CONFIDENCE: MEDIUM. The banker is strong (73% MC place, Purton, consistent placings at C&D). However, the tight 5-horse pool leaves out the market favourite and the 3rd favourite, at a venue prone to upsets.

CAVEATS:
- SCMP is partial. SCMP win odds broadly match HKJC (#4 6.1 vs 5.0, #10 2.4 vs 3.3, #6 7.0 vs 6.6, #5 7.3 vs 6.5). SCMP "Place" odds are near or above win odds, so they look mis-parsed, and the Q/QP matrix was not usable. The Q/QP cross-reference was not done.
- **Model vs market conflict**: MC rates favourite #10 FORTUNE STAR at only 15.5% place, against 3.3 in the market (it has excuses + trial flags and a January win). It also rates #5 BULLISH NOVA (3 starts, 98-day layoff) at 5.4% place against 6.5 in the market. Both are excluded from Strategy A. If either places, Strategy A misses (pool-miss risk). Strategy B covers both.
- HV venue guidance favours wider pools (Mode B/C) because of upsets. The classification rule (Adj Win% ≥ 35%) dictates Mode A, and this report follows it. A Mode B-style widening would add #3 (23.9%) and #9 (20.7%): 膽 #4 + 6 legs = 15 combos / $150.
- Barrier: #1 (gate 12) and #8 (gate 11) are legs drawn wide at HV 1,650m. MC applies no explicit draw penalty here.
- #8 LUCK IS BACK is a known bleeder and was eased last start. #2 RAGGA BOMB returns from lameness after a 175-day absence. Both are in the Strategy A pool on threshold rules.
- SCMP adjustment judgment calls: #8 "eased" → -notRO −2; #4 got no credit for its placings (no keyword). Without the -notRO penalty, #8 would still be in the pool. The pool is the same under reasonable alternative calls.
- Odds were captured at 11:01 HKT on 07-Oct (race at 19:35). The HKJC pool will move before the jump.
- Historical sync was not re-run in this session (already done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #4 SUNDAY'S SERENADE (MC Win% 39.8%, MC Place% 73.0%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6 (45.0%), #1 (33.6%), #8 (32.9%), #2 (24.3%), #3 (21.9%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #2 RAGGA BOMB (MC Place% 24.3%, Win odds 25)
  (#3 CLASS is in the 20–30% band but at Win odds 8.3 < 10, so it is not replaceable)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #10 FORTUNE STAR (Win odds 3.3, MC Place% 15.5%)
  #5 BULLISH NOVA  (Win odds 6.5, MC Place% 5.4%)
Action: #10 replaced #2 (1-for-1 swap); #5 added directly (no replaceable leg left)
Final legs: #6, #1, #8, #3, #10, #5
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #4 | 腳 #6, #1, #8, #3, #10, #5
  4-6-1 (9.0%), 4-6-8 (8.3%), 4-1-8 (5.2%), 4-6-3 (4.6%), 4-1-3 (2.8%), 4-8-3 (2.6%),
  4-6-10 (2.4%), 4-1-10 (1.5%), 4-8-10 (1.4%), 4-6-5 (0.8%), 4-3-10 (0.7%), 4-1-5 (0.5%),
  4-8-5 (0.5%), 4-3-5 (0.3%), 4-10-5 (0.1%)
  Est. hit chance (Harville, raw MC): about 41%
```

Comparison: both strategies use the same banker (#4) and share three legs (#6, #1, #8). Strategy B drops #2 and adds #3 CLASS plus the two market horses, #10 FORTUNE STAR and #5 BULLISH NOVA. That makes 15 combos at $150, against Strategy A's 6 combos at $60. B is the hedge if the market is right about the favourite and the lightly raced #5. A is the cheaper, model-pure ticket.

═══════════════════════════════════════════════════════════
