# Trio (單T) Strategy — Sha Tin 2026-10-11 Race 8

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-11 | Race 8
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (14 starters ≥ 3, odds for 14/14, 14 jockey + 14 trainer profiles loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place odds look mis-parsed; Q/QP values implausible and reported identical, so not used)
ODDS SOURCE: HKJC pool (data/odds/odds_20261011_ST.json, R8 captured 11:23 HKT 11-Oct). analyze-race.ts re-read HKJC win odds at run time, with small differences (#1 6.6, #3 9.8, #4 39, #11 2.5, #12 34)
             SCMP odds: ✅ loaded (cross-reference only) | HKJC: ✅ loaded

RACE: R8 — Class 4 | 1600m | Turf | Good | 14 runners — PING SHAN HANDICAP
CLASSIFICATION: Wide open (top Adj Win% 18.2% < 20%) | POOL SIZE: 7 (shadow)
MODE: D: PASS (default for wide open). Mode C shadow ticket shown for reference / A-B tracking
BET STRUCTURE (A): PASS. Shadow: 膽拖 | 1膽 + 6腳 | C(6,2) = 15
BET STRUCTURE (B): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Sha Tin 2026-10-11 | Going: Good | Surface: Turf
Target Race(s): R8 (Class 4 | 1600m | 14 runners)
Scratchings: none among the 14 declared runners. Reserve FAMILY KNIGHT was withdrawn earlier (colic). Reserve LUCKY BALERION is not in the field.
Odds coverage: 14 horses with odds (HKJC win and place)
SCMP data: ⚠️ partial
Form gaps: 14/14 horses enriched with form data. Sparse: #8 BEST WORLD has only 3 runs in the data.
  Layoffs > 90 days: #9 BLING BLING GENIUS (last ran 07-Jun, 126 days), #3 MASTER TRILLION (21-Jun, 112 days),
  #1 JOLLY BRILLIANT and #8 BEST WORLD (01-Jul, 102 days), #13 SMART FAT CAT (12-Jul, 91 days).
  #1 JOLLY BRILLIANT has a recent barrier trial win (SCMP trackwork), which partly offsets the layoff.
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 12 | FAMILY FORTUNE | 17.2% | 42.3% | 33 | ✅ | ❌ | 5/8/1/4/3/1 | ★ 膽 (Banker) | 11-12: 5.1% (19.6) |
| 1 | JOLLY BRILLIANT | 13.8% | 36.9% | 6.5 | ✅ | ✅ | 1/4/2/3/6/5 | 腳 (Leg) | 1-12: 4.5% (22.0) |
| 11 | GORGEOUS VICTORY | 13.7% | 36.6% | 2.6 | ✅ | ✅ | 4/8/2/3/5/5 | 腳 (Leg) | 1-11: 4.4% (22.9) |
| 4 | MEGA MASTERMIND | 11.9% | 32.5% | 38 | ✅ | ❌ | 8/8/9/8/9/2 | 腳 (Leg) | 4-12: 4.1% (24.6) |
| 7 | FLYING BOOM | 11.2% | 32.5% | 9.7 | ✅ | ✅ | 3/4/5/11/10/3 | 腳 (Leg) | 7-12: 4.3% (23.0) |
| 2 | ACE | 7.4% | 23.8% | 19 | ✅ | ❌ | 6/10/1/7/4/1 | — (replaced by #3) | — |
| 5 | BEAUTY VIVA | 5.4% | 17.9% | 19 | ❌ | ❌ | 11/12/7/8/7/7 | — | — |
| 6 | BUCEPHALAS | 4.6% | 15.1% | 17 | ❌ | ❌ | 6/6/14/14/11/12 | — | — |
| 10 | AUTOMATED | 3.9% | 14.8% | 24 | ❌ | ❌ | 10/2/5/8/10/9 | — | — |
| 9 | BLING BLING GENIUS | 2.9% | 12.0% | 24 | ❌ | ❌ | 6/1/1/2/4/12 | — | — |
| 3 | MASTER TRILLION | 2.6% | 11.2% | 9.7 | ❌ | ✅ | 11/14/12/12/2/4 | 腳 (Leg, replacement) | — (replacement candidate) |
| 8 | BEST WORLD | 2.3% | 9.5% | 19 | ❌ | ❌ | 5/7/5 | — | — |
| 14 | BRIGHT INHERITANCE | 1.6% | 7.4% | 34 | ❌ | ❌ | 12/10/12/8/11/6 | — | — |
| 13 | SMART FAT CAT | 1.6% | 7.4% | 10 | ❌ | ❌ (10.0, borderline) | 4/4/2/2/5/9 | — | — |

Market: overround 23.3%. MC strongly disagrees with the market. MC #1 is #12 FAMILY FORTUNE (33, 12th in the market): the tool says "undervalued by 485%". It is rated 43 and carries 119 lb, with a recent HV 1650m win in class-record time, but only 1 previous run at 1600m. #4 MEGA MASTERMIND (38, the longest price in the field) is MC #4: "undervalued by 363%". It also has the fastest projected time (1:34.96, 2.5L clear). The favourite #11 GORGEOUS VICTORY (2.6, Purton) is only MC #3 (13.7% win). It has the slowest projected time in the field. The market rates #3 MASTER TRILLION (9.7) and #13 SMART FAT CAT (10) much higher than MC does: the tool says #13 is "overvalued by 84%". The rating spread is flat (ratings 52–63, 9 horses within 8 points of each other). MC's top quinella is 11-12 (5.1%, fair 19.6).

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role (shadow) |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 12 | FAMILY FORTUNE | 17.2% | 42.3% | +form +1 | +form +1 | 18.2% | 43.3% | 33 | C Y Ho | 10 | 119 | — | +form | ★ 膽 (Banker) |
| 2 | 1 | JOLLY BRILLIANT | 13.8% | 36.9% | trial +2 | trial +2 | 15.8% | 38.9% | 6.5 | A Atzeni | 2 | 135 | — | +trial | 腳 (Leg) |
| 3 | 4 | MEGA MASTERMIND | 11.9% | 32.5% | 0 | 0 | 11.9% | 32.5% | 38 | A Badel | 13 | 127 | Front (made all last term) | — | 腳 (Leg) |
| 4 | 11 | GORGEOUS VICTORY | 13.7% | 36.6% | -notRO −2 | -notRO −2 | 11.7% | 34.6% | 2.6 | Z Purton | 3 | 121 | — | -notRO | 腳 (Leg) |
| 5 | 7 | FLYING BOOM | 11.2% | 32.5% | 0 | 0 | 11.2% | 32.5% | 9.7 | M F Poon | 12 | 126 | Midfield | — | 腳 (Leg) |
| 6 | 2 | ACE | 7.4% | 23.8% | excuses +2 | excuses +2 | 9.4% | 25.8% | 19 | C L Chau (-2) | 9 | 130 | — | +excuses | 腳 (Leg) |
| 7 | 6 | BUCEPHALAS | 4.6% | 15.1% | excuses +2 | excuses +2 | 6.6% | 17.1% | 17 | L Ferraris | 7 | 126 | — | +excuses | — |
| 8 | 10 | AUTOMATED | 3.9% | 14.8% | excuses +2 | excuses +2 | 5.9% | 16.8% | 24 | R Kingscote | 8 | 122 | Speed-tracker | +excuses | — |
| 9 | 5 | BEAUTY VIVA | 5.4% | 17.9% | 0 | 0 | 5.4% | 17.9% | 19 | M Chadwick | 6 | 126 | — | — | 腳 (Leg, 7th by Adj Place%) |
| 10 | 14 | BRIGHT INHERITANCE | 1.6% | 7.4% | excuses +2 | excuses +2 | 3.6% | 9.4% | 34 | Y L Chung (-2) | 5 | 117 | — | +excuses | — |
| 11 | 9 | BLING BLING GENIUS | 2.9% | 12.0% | 0 | 0 | 2.9% | 12.0% | 24 | L Hewitson | 11 | 125 | — | — | — |
| 12 | 3 | MASTER TRILLION | 2.6% | 11.2% | 0 | 0 | 2.6% | 11.2% | 9.7 | K C Leung | 1 | 130 | — | — | — |
| 13 | 8 | BEST WORLD | 2.3% | 9.5% | 0 | 0 | 2.3% | 9.5% | 19 | B Avdulla | 4 | 125 | Closer | — | — |
| 14 | 13 | SMART FAT CAT | 1.6% | 7.4% | 0 | 0 | 1.6% | 7.4% | 10 | K Teetan | 14 | 118 | Midfield | — | — |

Factor labels: +form +1, trial +2, excuses +2 (steadied / crowded / bumped and raced wide), -notRO −2. Caps are ±8 win / ±10 place, and none were reached. Banker eligibility: #12 has 10 recorded starts, so it is eligible.

SCMP adjustments applied:
- **#12 FAMILY FORTUNE**: Star Form "Notched a second Valley 1,650m win in April, then won again in a class record time", so +form +1 (improving form). No TIR, no vet flags.
- **#1 JOLLY BRILLIANT**: Trackwork "lived up to his name with a barnstorming trial win at Sha Tin earlier this month", so trial +2. This partly offsets its 102-day layoff.
- **#11 GORGEOUS VICTORY**: TIR "In the Home Straight lay in under pressure and proved difficult to ride out", so -notRO −2. This is a judgment call: the rule targets "not ridden out", and here the horse was hard to ride out (a temperament issue rather than soundness). Even without it, #11 would be 13.7% and the banker would not change.
- **#2 ACE**: TIR "Near the 200M was steadied when momentarily crowded", so excuses +2.
- **#6 BUCEPHALAS**: TIR "Shortly after the start was eased when crowded" (and Star Form "unlucky fifth"), so excuses +2. "Jumped only fairly" is a single note. Losing a plate is not a vet flag.
- **#10 AUTOMATED**: TIR "Bumped near the 450M. Rider stated his mount was disadvantaged by racing wide", so excuses +2.
- **#14 BRIGHT INHERITANCE**: TIR "Jumped awkwardly and then was steadied", so excuses +2.
- **#4 MEGA MASTERMIND**: "Did make all off 49" was last term, not a recent run, so no +form. TIR "Shifted in on jumping and was bumped" is a single note, so no -barrier. Its post-race vet check was clear.
- **#7 FLYING BOOM**: "Came right to salute from midfield" was in February, so no +form. No TIR.
- **#3, #5, #8, #9, #13**: single jumping or start notes only ("jumped only fairly", "bumped at the start", "shifted out ... became unbalanced"), so no -barrier. Vet checks were clear or not recorded. Score: 0.
- Vet: no current injury flags in the field. Age: no horse is 8 or older (the oldest is #14, aged 7).

Reasoning: no horse reaches 20% Adj Win%. The top Adj Win% is 18.2% (#12, a 33/1 shot), and five horses sit between 11% and 16%. The race is **Wide open → Mode C/D, default PASS**. The MC #1 is a market outsider. MC #4 #4 is the longest price in the field. The favourite #11 is downgraded by both MC and SCMP. Pace is uncertain: #4 MEGA MASTERMIND (gate 13) made all last term, and the other main chances have no clear running-style notes. There is no strong pace or form conviction that would override the default PASS. The Mode C shadow pool is listed below so the A/B comparison can still be tracked after the race.

## TRIO POOL (Strategy A, any order)

```
RECOMMENDATION: PASS (Mode D). Strategy A stake = $0.

SHADOW POOL (Mode C, for tracking only): #12, #1, #4, #11, #7, #2, #5
MODE: C (Wide open) | POOL SIZE: 7
  Top 4 by Adj Win%: #12 (18.2), #1 (15.8), #4 (11.9), #11 (11.7)
  + 3 by Adj Place%: #7 (32.5), #2 (25.8), #5 (17.9)
  Must-include (Adj Place% ≥ 20%): #12, #1, #11, #4, #7, #2. All are in the pool.

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #12 FAMILY FORTUNE (Adj Win% 18.2%, Adj Place% 43.3%) ← locked in every combo
腳 (Legs):  #1, #4, #11, #7, #2, #5
雙膽拖 check: 2nd-ranked #1 Adj Place% 38.9% < 63% → NO (single banker)
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15 (shadow cost $150)
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #12, #1, #4 | 2.6% | $390 per $10 |
| 2 | #12, #1, #11 | 2.5% | $398 per $10 |
| 3 | #12, #1, #7 | 2.4% | $418 per $10 |
| 4 | #12, #1, #2 | 2.0% | $508 per $10 |
| 5 | #12, #4, #11 | 1.8% | $553 per $10 |
| 6 | #12, #4, #7 | 1.7% | $581 per $10 |
| 7 | #12, #11, #7 | 1.7% | $592 per $10 |
| 8 | #12, #4, #2 | 1.4% | $706 per $10 |
| 9 | #12, #11, #2 | 1.4% | $720 per $10 |
| 10 | #12, #7, #2 | 1.3% | $756 per $10 |

Estimated chance that the shadow ticket hits (sum of 15 combos): about 23% on Adj Win%, or about 27% on raw MC.

## TICKET SUMMARY (Strategy A)

```
RECOMMENDATION: PASS. TOTAL STAKE: $0

Shadow (not recommended): 15 combos (膽拖: C(6,2), 6 legs) × $10 = $150
  膽 #12 | 腳 #1, #4, #11, #7, #2, #5
  12-1-4, 12-1-11, 12-1-7, 12-1-2, 12-1-5, 12-4-11, 12-4-7, 12-4-2, 12-4-5,
  12-11-7, 12-11-2, 12-11-5, 12-7-2, 12-7-5, 12-2-5

TOP COMBINATIONS (highest value):
  12-1-4 (2.6%), 12-1-11 (2.5%), 12-1-7 (2.4%), 12-1-2 (2.0%), 12-4-11 (1.8%)
```

Value note: if the 33/1 banker does place, any hit would pay well, because #12 and #4 are both outsiders. That value only exists if the MC read on #12 is right, and the market strongly disagrees with it. The SCMP Q/QP extract showed 1-12 22, 4-12 22, 11-12 85, 1-11 51. The favourite pair 1-11 at 51 is not plausible, so these figures were treated as mis-parsed and not used.

PASS CONDITIONS:
- Default: PASS (Wide open, top Adj Win% 18.2% < 20%).
- Revisit only if #12 FAMILY FORTUNE firms below ~15 in late betting. That would mean the market is moving toward the MC view and the race would look more structured.
- If #12 is scratched → no Strategy A play (and void Strategy B).
- If the field drops below 3 → pool refunded.
- If the going changes to Yielding / Soft or worse → re-run the MC.

CONFIDENCE: LOW. The race is wide open, the MC banker is a 33/1 outsider, the MC/market gap is very large, and ratings are flat.

CAVEATS:
- SCMP is partial. SCMP win odds broadly match HKJC (#11 3.7 vs 2.6, #1 5.4 vs 6.5, #3 8.9 vs 9.7, #13 8.8 vs 10, #12 32 vs 33). SCMP "Place" odds are near or above win odds (e.g. #1 5.4/6.2), so they look mis-parsed. Q and QP values were reported as identical and are implausible (1-11 at 51), so no Q/QP cross-reference was made. SCMP trackwork had only one entry (#1).
- MC/market divergence: the MC banker #12 is 33 in the market, and MC #4 #4 is 38. The favourite #11 (2.6) is only MC #3. Treat MC confidence here as low.
- #12 has only 1 previous run at 1600m (its wins were at HV 1650m). #8 BEST WORLD has only 3 runs in the data.
- Five runners are coming back from layoffs of more than 90 days (#9, #3, #1, #8, #13). #1 has a fresh trial win.
- Judgment calls: #11 "difficult to ride out" scored as -notRO −2. #4 "made all" (last term) not scored as +form. Neither changes the banker. Removing #11's −2 makes no difference to the pool.
- The scraper log printed "parsed distance=1200m", but the saved race card, the MC header and SCMP all say 1600m, and the MC trip counts use 1600m. So 1600m was used.
- Odds were captured at 11:23 HKT on 11-Oct. The HKJC pool will move before the off (4:05pm).
- Historical sync was not re-run in this session (already done per instruction). analyze-race.ts saved its enriched race card to data/racecards/racecard_20261011_ST_R8.json as a normal tool side effect.
```

## STRATEGY B (MC-only)

```
Banker: #12 FAMILY FORTUNE (MC Win% 17.2%, MC Place% 42.3%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #1 (36.9%), #11 (36.6%), #4 (32.5%), #7 (32.5%), #2 (23.8%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #2 ACE (MC Place% 23.8%, Win odds 19)
  (#4 is 32.5%, above 30%, so it cannot be replaced even at 38)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #3 MASTER TRILLION (Win odds 9.7, MC Place% 11.2%)
  (#13 SMART FAT CAT at exactly 10.0 is not < 10, so it is not a candidate)
Action: #3 replaced #2 (1-for-1 swap; #2 was the only replaceable leg)
Final legs: #1, #11, #4, #7, #3
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #12 | 腳 #1, #11, #4, #7, #3
  12-1-11, 12-1-4, 12-1-7, 12-1-3, 12-11-4, 12-11-7, 12-11-3, 12-4-7, 12-4-3, 12-7-3

Top combos (Harville, raw MC): 12-1-11 3.3% | 12-1-4 2.8% | 12-11-4 2.7% | 12-1-7 2.6% | 12-11-7 2.6% | 12-4-7 2.2%
Est. ticket hit chance (sum of 10 combos, raw MC): ~18%
Sensitivity: if #13 SMART FAT CAT shortens below 10 (SCMP shows 8.8), it becomes a Win-odds candidate. No replaceable leg would be left, so it would be added directly: 6 legs, C(6,2) = 15 combos, $150 (hit chance ~19%).
```

Comparison: both strategies use the same banker (#12). Strategy A recommends PASS because the race is wide open with no horse at 20% Adj Win%. Its shadow ticket keeps #2 ACE (Adj Place% 25.8% after the crowding excuse) and adds #5 as the 7th horse: 15 combos / $150, ~27% raw-MC coverage. Strategy B, the pure model baseline, swaps #2 for the market-backed #3 (9.7): 10 combos / $100, ~18% coverage. Both hit chances are low. Strategy B is reported for A/B tracking, not as a confident play.

```
═══════════════════════════════════════════════════════════
```
