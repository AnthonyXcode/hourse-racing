# Trio (單T) Strategy — Sha Tin 2026-10-11 Race 10

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-11 | Race 10
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, 14 jockey + 14 trainer profiles loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds look mis-parsed; Q/QP matrix values unreliable — not used)
ODDS SOURCE: HKJC pool (data/odds/odds_20261011_ST.json, captured 11:24 HKT 11-Oct; same win odds used by analyze-race.ts)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R10 — Class 3 (80-60) | 1400m | Turf "C" Course | Good | 14 runners — SHUI PIN WAI HANDICAP (5:10pm)
CLASSIFICATION: Competitive (top Adj Win% 32.7%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
BET STRUCTURE (B): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-11 | Going: Good | Surface: Turf ("C" Course)
Target Race(s): R10 (Class 3 | 1400m | 14 runners)
Scratchings: none
Odds coverage: 14 horses with HKJC win and place odds
SCMP data: ⚠️ partial
Form gaps: 14/14 horses enriched with HK form.
           Sparse form (<3 HK starts): #12 GULU GOGO (2 starts), #6 SO NAIVE (1 start, NZ Group 2 placed).
           #2 TITAN PEGASUS and #8 STAY COSMIC have only 3 HK starts each.
           Layoffs: #4 EVERYONE'S STAR last ran 21-Jun (112 days). #2 TITAN PEGASUS and #5 FORTUNE LINK last ran 12-Jul (91 days).
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 3 | FIT FOR BEAUTY | 32.7% | 64.4% | 8.0 | ✅ | ✅ | 4/7/7/3/3/2 | ★ 膽 (Banker) | 3-7: 11.4% (8.7) |
| 7 | CHIU CHOW SPIRIT | 16.6% | 43.4% | 7.4 | ✅ | ✅ | 3/8/6/12/14/12 | 腳 (Leg) | 3-7: 11.4% (8.7) |
| 10 | DO YOUR PART | 8.7% | 29.6% | 7.3 | ✅ | ✅ | 6/4/3/2/2/3 | 腳 (Leg) | 3-10: 6.5% (15.3) |
| 9 | CELESTIAL HERO | 8.1% | 26.7% | 8.0 | ✅ | ✅ | 8/10/12/3/6/8 | 腳 (Leg) | 3-9: 6.0% (16.6) |
| 2 | TITAN PEGASUS | 7.1% | 26.3% | 3.6 | ✅ | ✅ | 3/7/13 | 腳 (Leg) | 2-3: 5.8% (17.2) |
| 1 | BEAUTY CRESCENT | 5.5% | 19.5% | 9.3 | ❌ | ✅ | 6/3/14/14/14/14 | 腳 (Leg, added directly) | 1-3: 3.9% (25.8) |
| 14 | TANG HEART | 4.5% | 18.4% | 15 | ❌ | ❌ | 7/3/6/3 | — | — |
| 12 | GULU GOGO | 4.4% | 18.6% | 22 | ❌ | ❌ | 9/6 | — | — |
| 8 | STAY COSMIC | 3.7% | 14.7% | 41 | ❌ | ❌ | 12/12/7 | — | — |
| 11 | ANOTHER ZONDA | 3.5% | 15.2% | 43 | ❌ | ❌ | 11/1/4/8/1/11 | — | — |
| 4 | EVERYONE'S STAR | 3.1% | 13.1% | 30 | ❌ | ❌ | 13/8/2/7/5/5 | — | — |
| 13 | SUPER UNICORN | 1.5% | 7.0% | 38 | ❌ | ❌ | 10/3/9/2/6/9 | — | — |
| 5 | FORTUNE LINK | 0.6% | 3.0% | 15 | ❌ | ❌ | 11/12/10/1 | — | — |
| 6 | SO NAIVE | 0.0% | 0.1% | 29 | ❌ | ❌ | 7 | — | — |

Market: overround 22.6%. MC's top pick #3 FIT FOR BEAUTY is only 5th in the market (8.0). MC gives it 32.7% win and 64.4% place, rating 69 (a 4-point gap to the next horse), and the fastest projected time (1:21.78). The tool flags it as "undervalued by 165%". The market favourite #2 TITAN PEGASUS (3.6) is only MC #5 (7.1% / 26.3%), with just 3 HK starts. MC's #2 is #7 CHIU CHOW SPIRIT (7.4). The leading MC quinella is 3-7 (11.4%, fair 8.7). The tool's own bet suggestions were Place #3 and Place #7.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 3 | FIT FOR BEAUTY | 32.7% | 64.4% | 0 | 0 | 32.7% | 64.4% | 8.0 | A Atzeni | 5 | 129 | Stalk | — | ★ 膽 (Banker) |
| 2 | 7 | CHIU CHOW SPIRIT | 16.6% | 43.4% | +form +1 | +form +1 | 17.6% | 44.4% | 7.4 | A Badel | 9 | 127 | Closer | +form | 腳 (Leg) |
| 3 | 2 | TITAN PEGASUS | 7.1% | 26.3% | trial +2, +form +1 | trial +2, +form +1 | 10.1% | 29.3% | 3.6 | C L Chau (-2) | 4 | 131 | Midfield/Closer | +trial, +form | 腳 (Leg) |
| 4 | 9 | CELESTIAL HERO | 8.1% | 26.7% | excuses +2 | excuses +2 | 10.1% | 28.7% | 8.0 | Z Purton | 6 | 125 | Midfield | +excuses | 腳 (Leg) |
| 5 | 10 | DO YOUR PART | 8.7% | 29.6% | 0 | 0 | 8.7% | 29.6% | 7.3 | P N Wong (-7) | 7 | 125 | On-pace/Front | — | 腳 (Leg) |
| 6 | 1 | BEAUTY CRESCENT | 5.5% | 19.5% | excuses +2, +form +1 | excuses +2, +form +1 | 8.5% | 22.5% | 9.3 | Y L Chung (-2) | 1 | 131 | On-pace/Stalk | +excuses, +form | 腳 (Leg) |
| 7 | 4 | EVERYONE'S STAR | 3.1% | 13.1% | excuses +2 | excuses +2 | 5.1% | 15.1% | 30 | B Avdulla | 14 | 128 | — | +excuses | — |
| 8 | 14 | TANG HEART | 4.5% | 18.4% | 0 | 0 | 4.5% | 18.4% | 15 | C Y Ho | 11 | 120 | Midfield | — | — |
| 9 | 12 | GULU GOGO | 4.4% | 18.6% | 0 | 0 | 4.4% | 18.6% | 22 | K Teetan | 2 | 120 | Closer | — | — |
| 10 | 6 | SO NAIVE | 0.0% | 0.1% | excuses +2, trial +2 | excuses +2, trial +2 | 4.0% | 4.1% | 29 | L Hewitson | 8 | 128 | — | +excuses, +trial | — |
| 11 | 8 | STAY COSMIC | 3.7% | 14.7% | 0 | 0 | 3.7% | 14.7% | 41 | M F Poon | 13 | 126 | Midfield | — | — |
| 12 | 13 | SUPER UNICORN | 1.5% | 7.0% | excuses +2 | excuses +2 | 3.5% | 9.0% | 38 | M Chadwick | 10 | 120 | — | +excuses | — |
| 13 | 5 | FORTUNE LINK | 0.6% | 3.0% | 0 | 0 | 0.6% | 3.0% | 15 | H Y Yuen (-7) | 3 | 128 | Front | — | — |
| 14 | 11 | ANOTHER ZONDA | 3.5% | 15.2% | -perf −2, -injury30d −3 | -injury30d −4 | 0.0% | 11.2% | 43 | E C W Wong (-3) | 12 | 124 | Front | -perf, -injury30d | — |

Factor labels: trial +2, +form +1 (improved/rallied in a race), excuses +2 (wide trip/crowded/steadied), -perf −2 (unacceptable performance), -injury30d −3 win / −4 place. Caps are ±8 win / ±10 place, and none were reached. #11's Adj Win% was floored at 0%. #2 and #9 tie on Adj Win% (10.1%); #2 ranked ahead on Adj Place%. Banker eligibility: #3 has 10 HK starts, so it is eligible.

SCMP adjustments applied:
- **#3 FIT FOR BEAUTY**: No scoring flags. Star Form: "Just prevailed when retrying 1,400m in March for a third win", then "placed three times from five starts", latest "fourth when retrying 1,200m". No TIR/vet/trackwork notes. It is back up to its winning 1,400m trip.
- **#7 CHIU CHOW SPIRIT**: "Returned to action with a last-to-third effort over 1,400m", so +form +1. Closer from gate 9.
- **#2 TITAN PEGASUS**: Trackwork "dashed home to win his latest trial at Sha Tin and looks to have improved", so trial +2. "Coming from near the rear for third" on the step up to 1,400m, so +form +1. "Jumped only fairly" is a single note, so no -barrier penalty.
- **#9 CELESTIAL HERO**: Latest TIR "on jumping got unbalanced when crowded for room... held up for clear running over the concluding stages", so excuses +2.
- **#10 DO YOUR PART**: The "unlucky fourth" was before its latest run, so no excuses credit. The latest TIR ("raced tight for some distance after the start") is minor. No adjustment. Apprentice P N Wong claims 7 lb.
- **#1 BEAUTY CRESCENT**: Latest TIR "raced very wide and without cover for the majority", and Star Form "rallied for sixth without any favours" from gate 13, so excuses +2 and +form +1. It now has gate 1.
- **#4 EVERYONE'S STAR**: "Did have excuses in his final two starts", plus TIR "obliged to race wide and without cover", so excuses +2. Gate 14 is a reducer only (Rule 15); MC already uses the draw.
- **#6 SO NAIVE**: TIR "left racing wide and without cover" on its HK debut, so excuses +2. "Has won one of two trials last month", so trial +2.
- **#13 SUPER UNICORN**: TIR "steadied" near the 700m and "disadvantaged from the 500M", so excuses +2.
- **#11 ANOTHER ZONDA**: Vet "substantial amount of blood in the horse's trachea", performance "considered unacceptable". It passed an official vet exam on 25/09/2026, 16 days ago (< 30). Scored -perf −2 and -injury30d −3 win / −4 place.
- **#5 FORTUNE LINK**: "Delayed the start when it proved difficult to load". This is a loading issue, not repeated barrier bumping, so no penalty.
- **#14 TANG HEART**: "Shifted out at the start and was bumped" is a single note, so no -barrier penalty. **#8, #12**: no scoring flags.

Reasoning: #3 FIT FOR BEAUTY is a clear MC #1 (rating 69 vs 65). It is a three-time winner whose last win came over this 1,400m trip, with consistent place form (4/7/7/3/3/2). Adj Win% 32.7% makes the race Competitive, so Mode B applies: top 3 by Adj Win% (#3, #7, #2) + 3 others by Adj Place% (#10 29.6, #9 28.7, #1 22.5). Must-include (≥ 25%) is satisfied (#10, #9, #2 are in). Rule 8 (≥ 20%) is satisfied (#1 is in). Rule 9 (negatively flagged at ≤ 15 odds) does not apply; the only flagged horse is #11 at 43. All six market leaders (every horse under 10 odds) are in the pool. Pace: #10 (front-running at its last start) and #1 (gate 1, made all early in its career) should be prominent, with #5 also possibly leading from gate 3. #3 should sit just behind from gate 5. #7 and #2 come from back and suit a genuine tempo.

## TRIO POOL (Strategy A, any order)

```
POOL: #3, #7, #2, #9, #10, #1
MODE: B (Competitive, #3 Adj Win% 32.7% in 20–35%) | POOL SIZE: 6
  Top 3 by Adj Win%: #3 (32.7), #7 (17.6), #2 (10.1)
  + 3 by Adj Place%: #10 (29.6), #9 (28.7), #1 (22.5)

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #3 FIT FOR BEAUTY (Adj Win% 32.7%, Adj Place% 64.4%) ← locked in every combo
腳 (Legs):  #7, #2, #9, #10, #1
雙膽拖 check: 2nd-ranked #7 Adj Place% 44.4% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #3, #7, #2 | 4.6% | $215 per $10 |
| 2 | #3, #7, #9 | 4.6% | $215 per $10 |
| 3 | #3, #7, #10 | 3.9% | $254 per $10 |
| 4 | #3, #7, #1 | 3.8% | $260 per $10 |
| 5 | #3, #2, #9 | 2.4% | $409 per $10 |
| 6 | #3, #2, #10 | 2.1% | $482 per $10 |
| 7 | #3, #9, #10 | 2.1% | $482 per $10 |
| 8 | #3, #1, #2 | 2.0% | $495 per $10 |
| 9 | #3, #1, #9 | 2.0% | $495 per $10 |
| 10 | #3, #1, #10 | 1.7% | $583 per $10 |

Estimated chance that the ticket hits (sum of the 10 combos, Harville): about 29% on Adj Win%, or about 32% on raw MC. Harville on win% tends to understate how often horses fill the places, so read these as conservative.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKET: 膽 #3 | 腳 #7, #2, #9, #10, #1
  3-7-2, 3-7-9, 3-7-10, 3-7-1, 3-2-9, 3-2-10, 3-2-1, 3-9-10, 3-9-1, 3-10-1

TOP COMBINATIONS (highest value):
  3-7-2 (4.6%), 3-7-9 (4.6%), 3-7-10 (3.9%), 3-7-1 (3.8%), 3-2-9 (2.4%)
```

Value note: The banker #3 is 8.0 in the market (5th favourite), so any hit should pay well, not chalk. Combos with #2 (3.6 favourite) will pay least. Combos without #2 (3-7-9, 3-7-10, 3-7-1, 3-9-10) offer the best value if the favourite misses the frame, which MC rates as about a 74% chance.

PASS CONDITIONS:
- If #3 FIT FOR BEAUTY (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going changes to Yielding/Soft or worse → re-run the MC.
- If #3 drifts beyond ~15 in late betting (market strongly against the banker) → consider PASS.

CONFIDENCE: MEDIUM. The banker is a clear MC #1 (64.4% place, fastest projected time, proven at the trip). But the market disagrees (8.0), the race is Competitive rather than Dominant, and 14 runners make the frame hard to predict.

CAVEATS:
- **Model vs market split on the banker.** MC rates #3 at 32.7% win, while the market prices it at about 11% (8.0; SCMP 9.7). If the market is right, banker failure (all tickets lose) is more likely than MC suggests.
- **#2 TITAN PEGASUS (3.6 favourite) has only 3 HK starts.** MC rates it only 7.1% / 26.3%, partly from sparse data. Its improving trial suggests MC may be underrating it. It is in the pool on both strategies.
- SCMP is partial. SCMP win odds broadly match HKJC (#2 4.4 vs 3.6, #10 5.8 vs 7.3, #7 6.8 vs 7.4, #9 7.6 vs 8.0, #1 8.8 vs 9.3, #3 9.7 vs 8.0). SCMP "Place" odds are near or above win odds (e.g. #1 9.1), so they look mis-parsed. The extracted Q/QP matrix showed identical Q and QP values that contradict the win market (e.g. 3-7 at 31 while 2-3 is 4.9), so it was treated as unreliable and not used for the QP cross-reference.
- #12 GULU GOGO (2 starts) and #6 SO NAIVE (1 start) have sparse HK form. MC prices #6 at 0.0% from one last-of-seven run, despite NZ Group 2 placings and a recent trial win.
- #11 ANOTHER ZONDA bled 16 days before the vet clearance window closed (scored -injury30d). It is out of the pool either way.
- Odds were captured at 11:24 HKT on 11-Oct. The HKJC pool will move before the 5:10pm jump.
- Historical sync was not re-run in this session (already done, per instruction).

## STRATEGY B (MC-only)

```
Banker: #3 FIT FOR BEAUTY (MC Win% 32.7%, MC Place% 64.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #7 (43.4%), #10 (29.6%), #9 (26.7%), #2 (26.3%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
  (#10 at 7.3, #9 at 8.0, #2 at 3.6 — all are < 10)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #1 BEAUTY CRESCENT (Win odds 9.3, MC Place% 19.5%)
Action: added directly (no replaceable leg)
Final legs: #7, #10, #9, #2, #1
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #3 | 腳 #7, #10, #9, #2, #1
  3-7-10, 3-7-9, 3-7-2, 3-7-1, 3-10-9, 3-10-2, 3-10-1, 3-9-2, 3-9-1, 3-2-1

Top combos (Harville, raw MC): 3-7-10 6.0% | 3-7-9 5.6% | 3-7-2 4.8% | 3-7-1 3.7% | 3-9-10 2.6%
Est. ticket hit chance (sum of 10 combos, raw MC): ~32%
```

Comparison: Strategy A and Strategy B produce **identical tickets** (膽 #3 + 腳 #7, #2, #9, #10, #1; 10 combos; $100). They only rank the combos differently. Strategy A's SCMP credits (trial/form for #2, excuses for #9) move 3-7-2 and 3-7-9 to the top. Raw MC favours 3-7-10. Robustness check: using SCMP win odds instead of HKJC odds gives the same Strategy B ticket (#1 is 8.8, still < 10).

```
═══════════════════════════════════════════════════════════
```
