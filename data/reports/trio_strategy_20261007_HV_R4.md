# Trio (單T) Strategy — Happy Valley 2026-10-07 Race 4

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-07 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey + trainer stats loaded) | Going: Good to Firm | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds and Q/QP matrix look mis-parsed)
ODDS SOURCE: HKJC pool (live win odds pulled by analyze-race.ts at ~11:10 HKT 07-Oct; data/odds/odds_20261007_HV.json captured 11:01 HKT is within 0.1–2 pts)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R4 — Class 4 | 1650m | Turf | Good to Firm | 12 runners — FAT TSEUNG HANDICAP (8:10pm)
CLASSIFICATION: Competitive (top Adj Win% 33.7%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-07 | Going: Good to Firm | Surface: Turf
Target Race(s): R4 (Class 4 | 1650m | 12 runners)
Scratchings: none
Odds coverage: 12 horses with odds (HKJC win; place estimated from win by the tool)
SCMP data: ⚠️ partial
Form gaps: #6 BLAZING METEOR has 1 local start (debut 06-Sep, 14th) — sparse form, not banker-eligible.
           #9 AMAZING AWARD last ran 26-Apr (164 days, layoff >90; returning from right tibial injury).
           #4 TAKE ACTION (15-Jul), #12 PRESTIGE RICKY (15-Jul), #8 ABSOLUTE HONOUR (12-Jul) are 84–87 days off.
           Banker #2 SKY DEEP has 10+ starts (eligible).
Note: scraper log printed an initial "distance=1200m" parse, but the saved race card and the MC both use 1650m (matches SCMP).
```

## SCMP Data (Race 4)

| # | Horse | Win (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|-----------|------------------|----------|----------|-----------|---------------|
| 1 | VIVA GRACIOUSNESS | 5.5 | 1 second from 8 since wins | clear | clear | — | Midfield |
| 2 | SKY DEEP | 4.3 | back from knee surgery, placed at C&D | rider error, no room improving inside → +excuses | clear | — | Stalk (gate 1) |
| 3 | STURDY RUBY | 11 | C&D winner off 60 | "did not respond… disappointing" (not labelled unacceptable) | post-race exam no findings | — | Midfield |
| 4 | TAKE ACTION | 11 | 10 cheques from 12 HV runs | single bump early | clear | — | Stalk |
| 5 | JUMBO STEPS | 16 | no better than 5th | instructed to go forward | clear | — | Front |
| 6 | BLAZING METEOR | 15 | bumped heavily on debut | single bump at start | clear | +trial (won Conghua trial, led all the way) | Front |
| 7 | MISSION GIANT | 43 | failed to figure 3 times | clear | -injury30d (bleed, passed 24/09 = 13 days) | — | Back |
| 8 | ABSOLUTE HONOUR | 10 | "built on…box-seat win", 4 placings → +form | clear | clear | — | Stalk (box seat) |
| 9 | AMAZING AWARD | 23 | C&D placings | clear | tibial injury passed 24/08 (44 days, no penalty) | — | Stalk |
| 10 | PRECISION HOPE | 5.6 | placed last 3 of 5 at C&D; grinding 4th | contact at start, unbalanced (single start incident) | clear | — | Stalk |
| 11 | PODIUM | 23 | back-to-back C&D wins, 2nd at this level | clear | clear | — | Stalk |
| 12 | PRESTIGE RICKY | 8.4 | "last-to-third effort" → +form | hampered near 600M → +excuses | clear | — | Closer |

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 2 | SKY DEEP | 31.7% | 64.9% | 4.7 | ✅ | ✅ | 4/2/5/2/6/1 | ★ 膽 (Banker) | 2-8: 11.8% (8.4) |
| 8 | ABSOLUTE HONOUR | 16.7% | 46.8% | 9.8 | ✅ | ✅ | 3/4/3/1/4/7 | 腳 (Leg) | 2-8: 11.8% (8.4) |
| 10 | PRECISION HOPE | 14.8% | 43.2% | 4.9 | ✅ | ✅ | 4/3/2/4/9/8 | 腳 (Leg) | 2-10: 10.6% (9.4) |
| 3 | STURDY RUBY | 11.7% | 36.5% | 15 | ✅ | ❌ | 8/5/2/8/10/9 | 腳 (Leg) | 2-3: 8.2% (12.2) |
| 11 | PODIUM | 6.8% | 26.0% | 19 | ✅ | ❌ | 7/9/2/4/1/1 | 腳 (Leg) | 2-11: 5.3% (18.8) |
| 4 | TAKE ACTION | 5.9% | 23.1% | 11 | ✅ | ❌ | 4/4/1/2/6/2 | — (replaced by #12) | — |
| 5 | JUMBO STEPS | 5.4% | 21.3% | 13 | ✅ | ❌ | 6/11/11/7/5/9 | — (replaced by #1) | — |
| 12 | PRESTIGE RICKY | 2.9% | 13.9% | 7.6 | ❌ | ✅ | 3/7/6/6/3/11 | 腳 (Leg) — replaced #4 | — |
| 9 | AMAZING AWARD | 2.0% | 10.5% | 20 | ❌ | ❌ | 5/4/4/2/7/7 | — | — |
| 6 | BLAZING METEOR | 0.9% | 4.8% | 17 | ❌ | ❌ | 14 | — | — |
| 1 | VIVA GRACIOUSNESS | 0.8% | 5.8% | 6.0 | ❌ | ✅ | 5/6/8/9/9/2 | 腳 (Leg) — replaced #5 | — |
| 7 | MISSION GIANT | 0.4% | 3.3% | 46 | ❌ | ❌ | 7/14/12/10/4/12 | — | — |

Market: overround 23.5%. MC and market agree on #2 SKY DEEP (favourite at 4.7; MC 31.7% win, "61% edge" on place) and #10 PRECISION HOPE (2nd fav 4.9). They disagree on #1 VIVA GRACIOUSNESS (3rd fav 6.0; MC 0.8% win / 5.8% place, "overvalued by 95%") and #12 PRESTIGE RICKY (4th fav 7.6; MC 2.9% / 13.9%). MC likes #8 ABSOLUTE HONOUR (Purton, 9.8) and #3 STURDY RUBY (15) more than the market. Finish-time projection: #2 fastest (1:39.39), #3 +0.42s, #4 +1.12s, #8 +1.26s.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 2 | SKY DEEP | 31.7% | 64.9% | excuses +2 | excuses +2 | 33.7% | 66.9% | 4.7 | E C W Wong (-3) | 1 | 132 | Stalk | +excuses | ★ 膽 (Banker) |
| 2 | 8 | ABSOLUTE HONOUR | 16.7% | 46.8% | +form +1 | +form +1 | 17.7% | 47.8% | 9.8 | Z Purton | 10 | 126 | Stalk | +form | 腳 (Leg) |
| 3 | 10 | PRECISION HOPE | 14.8% | 43.2% | 0 | 0 | 14.8% | 43.2% | 4.9 | A Badel | 2 | 120 | Stalk | — | 腳 (Leg) |
| 4 | 3 | STURDY RUBY | 11.7% | 36.5% | 0 | 0 | 11.7% | 36.5% | 15 | L Ferraris | 8 | 130 | Midfield | — | 腳 (Leg) |
| 5 | 11 | PODIUM | 6.8% | 26.0% | 0 | 0 | 6.8% | 26.0% | 19 | A Atzeni | 3 | 118 | Stalk | — | 腳 (Leg) |
| 6 | 4 | TAKE ACTION | 5.9% | 23.1% | 0 | 0 | 5.9% | 23.1% | 11 | B Avdulla | 5 | 129 | Stalk | — | 腳 (Leg) |
| 7 | 12 | PRESTIGE RICKY | 2.9% | 13.9% | +form +1, excuses +2 | +form +1, excuses +2 | 5.9% | 16.9% | 7.6 | K Teetan | 4 | 118 | Closer | +form, +excuses | — |
| 8 | 5 | JUMBO STEPS | 5.4% | 21.3% | 0 | 0 | 5.4% | 21.3% | 13 | C Y Ho | 11 | 128 | Front | — | — |
| 9 | 6 | BLAZING METEOR | 0.9% | 4.8% | trial +2 | trial +2 | 2.9% | 6.8% | 17 | M F Poon | 7 | 127 | Front | +trial | — |
| 10 | 9 | AMAZING AWARD | 2.0% | 10.5% | 0 | 0 | 2.0% | 10.5% | 20 | R Kingscote | 6 | 121 | Stalk | (injury >30d) | — |
| 11 | 1 | VIVA GRACIOUSNESS | 0.8% | 5.8% | 0 | 0 | 0.8% | 5.8% | 6.0 | P N Wong (-7) | 12 | 135 | Midfield | — | — |
| 12 | 7 | MISSION GIANT | 0.4% | 3.3% | -injury30d −3 | -injury30d −4 | 0.0% | 0.0% | 46 | H T Mo (-2) | 9 | 127 | Back | -injury30d | — |

Factor labels: excuses +2 (crowded/hampered/no room), trial +2, +form +1 (improved/built on/rallied), -injury30d −3/−4. No caps reached. #7 floored at 0.0%.

SCMP adjustments applied:
- **#2 SKY DEEP**: TIR — rider made "an error of judgement endeavouring to improve to inside" with insufficient room (blocked run last start, finished 4th) → excuses +2. Returned from knee surgery last term; no current vet flag.
- **#8 ABSOLUTE HONOUR**: Star Form "Built on a fourth… with a box-seat win… then filled the frame four times" → +form +1.
- **#12 PRESTIGE RICKY**: Star Form "last-to-third effort" (rallied) → +form +1; TIR "hampered near the 600M" → excuses +2.
- **#6 BLAZING METEOR**: Trackwork "Won his latest trial after leading all the way under a hold" → trial +2. The debut bump on jumping is a single instance, so no -barrier penalty (same handling as single start bumps in R3).
- **#7 MISSION GIANT**: Vet — blood in trachea, passed 24/09/2026 (13 days ago, < 30) → -injury30d.
- **#3 STURDY RUBY**: TIR "did not respond to riding and was disappointing" — stewards did not label it unacceptable and the post-race exam had no findings, so no -perf (consistent with R3 #7 handling). Flagged as a risk.
- **#10 PRECISION HOPE**, **#4 TAKE ACTION**: single contact/bump just after the start — no scoring flag.
- **#9 AMAZING AWARD**: tibial injury passed 24/08 (44 days > 30) → no penalty; 164-day absence noted.
- **#1, #5, #11**: no scoring keywords.

Reasoning: #2 SKY DEEP is MC's clear top pick (rating 70, 5 points clear), fastest on projected time, drawn gate 1 at HV 1,650m (stalker-friendly trip) and has a legitimate excuse last start. At Adj Win% 33.7% the race is Competitive → Mode B: top 3 by Adj Win% (#2, #8, #10) plus 3 by Adj Place% (#3 36.5%, #11 26.0%, #4 23.1%). All Adj Place% ≥ 25% horses (#2, #8, #10, #3, #11) are in. #8 (Purton, box-seat type) and #10 (C&D placer, gate 2) are the natural on-pace/stalking threats; #3 and #11 are both previous Valley 1,650m winners. Pace: #5 JUMBO STEPS (instructed forward) and #6 BLAZING METEOR are likely leaders; HV 1,650m stalker bias suits the pool. Market horses #1 (6.0) and #12 (7.6) sit outside Strategy A on thresholds; neither carries a negative flag, so Rule 9 does not force them in. Strategy B covers both.

## TRIO POOL (Strategy A, any order)

```
POOL: #2, #8, #10, #3, #11, #4
MODE: B (Competitive, #2 Adj Win% 33.7% in 20–35%) | POOL SIZE: 6
  Mode B = top 3 by Adj Win% (#2 33.7, #8 17.7, #10 14.8) + 3 by Adj Place% (#3 36.5, #11 26.0, #4 23.1)
  Must-include (Adj Place% ≥ 25%): #2, #8, #10, #3, #11 — all in pool

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #2 SKY DEEP (Adj Win% 33.7%, Adj Place% 66.9%) ← locked in every combo
腳 (Legs):  #8, #10, #3, #11, #4
雙膽拖 check: 2nd-ranked #8 Adj Place% 47.8% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #2, #8, #10 | 9.4% | $107 per $10 |
| 2 | #2, #8, #3 | 7.1% | $140 per $10 |
| 3 | #2, #10, #3 | 5.7% | $174 per $10 |
| 4 | #2, #8, #11 | 3.9% | $255 per $10 |
| 5 | #2, #8, #4 | 3.4% | $296 per $10 |

Estimated chance that the Strategy A ticket hits (sum of 10 combos): about 41% (about 48% on raw MC).

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKET: 膽 #2 | 腳 #8, #10, #3, #11, #4
  2-8-10 (9.4%), 2-8-3 (7.1%), 2-10-3 (5.7%), 2-8-11 (3.9%), 2-8-4 (3.4%),
  2-10-11 (3.2%), 2-10-4 (2.7%), 2-3-11 (2.4%), 2-3-4 (2.1%), 2-11-4 (1.1%)
```

Value note: the banker is the favourite and 2-10 is both fav/2nd-fav, so 2-8-10 will pay near chalk levels. Value sits in combos with #3 (15) and #11 (19). SCMP shows 2-10 Quinella at 4.4 (vs MC fair 9.4) — the market heavily backs the 2-10 pair, so 2-8-x and 2-3-x are the better-value structures.

PASS CONDITIONS:
- If #2 SKY DEEP (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If going changes to Yielding/Soft or worse → re-run the MC.
- If #2 drifts beyond ~8 late while #1/#12 firm sharply → reconsider (market may know something about the knee-surgery horse).

CONFIDENCE: MEDIUM. Banker has 65–67% place probability, best rating, best draw, and agrees with the market. The 6-horse pool covers MC's top 6 by place, but omits the 3rd and 4th favourites.

CAVEATS:
- SCMP partial: SCMP win odds broadly match HKJC (#2 4.3 vs 4.7, #10 5.6 vs 4.9, #1 5.5 vs 6.0, #12 8.4 vs 7.6). SCMP "Place" odds are near/above win odds (mis-parsed) and only a few Q values were returned (some implausible, e.g. 1-12 at 1), so the Q/QP cross-reference is unreliable.
- Model vs market conflict: MC rates #1 VIVA GRACIOUSNESS (3rd fav, 6.0; gate 12, top weight 135 with a 7-lb claimer) at 5.8% place and #12 PRESTIGE RICKY (7.6) at 13.9% (16.9% adj). Both excluded from Strategy A — pool-miss risk if either places. Strategy B includes both.
- Skill rule ambiguity: Mode B uses the ≥ 25% must-include threshold; Important Reminder 8 mentions ≥ 20%, which would also pull in #5 JUMBO STEPS (21.3%). Followed Mode B / R3 convention (6-horse pool). Adding #5 → 膽 #2 + 6腳 = 15 combos / $150.
- #3 STURDY RUBY "did not respond to riding and was disappointing" last start — not penalised (not formally unacceptable); it is a leg on its 36.5% MC place.
- #2 SKY DEEP returned from knee surgery last term; no current vet issue listed.
- Scraper log printed "distance=1200m" initially; the race card JSON and MC used 1650m (correct per SCMP).
- Odds captured ~11:00–11:10 HKT 07-Oct (race 20:10). The HKJC pool will move before the jump.
- Historical sync was not re-run in this session (already done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #2 SKY DEEP (MC Win% 31.7%, MC Place% 64.9%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #8 (46.8%), #10 (43.2%), #3 (36.5%), #11 (26.0%), #4 (23.1%), #5 (21.3%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10):
  #11 PODIUM (26.0%, 19), #4 TAKE ACTION (23.1%, 11), #5 JUMBO STEPS (21.3%, 13)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #1 VIVA GRACIOUSNESS (Win odds 6.0, MC Place% 5.8%)
  #12 PRESTIGE RICKY   (Win odds 7.6, MC Place% 13.9%)
Action: #1 replaced #5 (lowest replaceable, 21.3%); #12 replaced #4 (next lowest, 23.1%)
Final legs: #8, #10, #3, #11, #1, #12
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #2 | 腳 #8, #10, #3, #11, #1, #12
  2-8-10 (10.6%), 2-8-3 (8.1%), 2-10-3 (6.9%), 2-8-11 (4.4%), 2-10-11 (3.8%),
  2-3-11 (2.9%), 2-8-12 (1.8%), 2-10-12 (1.6%), 2-3-12 (1.2%), 2-11-12 (0.6%),
  2-8-1 (0.5%), 2-10-1 (0.4%), 2-3-1 (0.3%), 2-11-1 (0.2%), 2-1-12 (0.1%)
  Est. hit chance (Harville, raw MC): about 43%
```

Comparison: same banker (#2) and four shared legs (#8, #10, #3, #11). Strategy A adds #4 TAKE ACTION (MC 23.1% place); Strategy B swaps #4 and #5 out for the market horses #1 VIVA GRACIOUSNESS and #12 PRESTIGE RICKY. B costs $150 (15 combos) vs A's $100 (10 combos); B is the hedge if the market is right about #1/#12, A is the cheaper model-pure ticket.

═══════════════════════════════════════════════════════════
