# Trio (單T) Strategy — Happy Valley 2026-10-14 Race 8

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-14 | Race 8
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, 12 jockey + 10 trainer profiles loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork loaded; odds columns unlabelled; Q/QP matrix not machine-readable)
ODDS SOURCE: HKJC early-morning win pool (fetch-odds.ts, data/odds/odds_20261014_HV.json, captured 11:01 HKT 14-Oct)
             MC run's live odds: #1 4.3, #2 18, #3 5.5, #4 25, #5 20, #6 9.8, #7 18, #8 12, #9 4.6, #10 15, #11 22, #12 10
             SCMP odds: ⚠️ loaded but unlabelled (cross-reference only) | HKJC: ✅ loaded

RACE: R8 — Class 3 (80-60) | 1800m | Turf ("A" course) | Good | 12 runners — GAGE HANDICAP
CLASSIFICATION: Competitive (top Adj Win% 24.9%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE (A): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10  (2nd-ranked #9 Adj Place% 49.1% < 63%, so no 雙膽拖)
BET STRUCTURE (B): 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary

```
Meeting: Happy Valley 2026-10-14 | Going: Good | Surface: Turf
Target Race(s): R8 (Class 3 | 1800m | 12 runners)
Scratchings: none
Odds coverage: 12 horses with HKJC win odds (the MC tool estimated place odds from the win odds)
SCMP data: ⚠️ partial
Form gaps: none. All horses have 10 form records (all-venue), except #2 SERAPH GABRIEL with 7.
           #5 CORLEONE and #11 SAMARKAND have 0 runs at 1800m in the MC index.
           No runner is off more than 90 days (latest runs 23-Sep to 04-Oct).
           #11 SAMARKAND and #12 FOREVER FOLKS are 8 years old.
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 1 | FORTUNATE SON | 23.9% | 54.0% | 4.0 | ✅ | ✅ | 4/4/2/10/1/1 | ★ 膽 (Banker) | 1-9: 9.5% (10.6) |
| 9 | CHINA WIN | 18.6% | 47.1% | 4.7 | ✅ | ✅ | 1/2/3/5/3/4 | 腳 (Leg) | 1-9: 9.5% (10.6) |
| 3 | FIVEFORTWO | 17.7% | 46.3% | 5.6 | ✅ | ✅ | 1/5/2/3/3/2 | 腳 (Leg) | 1-3: 8.8% (11.4) |
| 12 | FOREVER FOLKS | 8.4% | 28.4% | 11 | ✅ | ❌ | 1/7/11/8/1/2 | 腳 (Leg) | 1-12: 4.7% (21.3) |
| 2 | SERAPH GABRIEL | 8.2% | 29.0% | 17 | ✅ | ❌ | 2/12/5/7/4/3 | 腳 (Leg) | 1-2: 4.5% (22.3) |
| 7 | THE AUSPICIOUS | 5.6% | 20.7% | 19 | ✅ | ❌ | 9/6/1/2/4/6 | 腳 (Leg) | — |
| 5 | CORLEONE | 5.2% | 19.9% | 21 | ❌ | ❌ | 1/2/1/8/9/10 | — | — |
| 10 | VIOLET STAR | 3.8% | 15.8% | 14 | ❌ | ❌ | 3/10/1/5/4/12 | — | — |
| 8 | GLITTERING LEGEND | 3.2% | 14.0% | 12 | ❌ | ❌ | 2/9/3/11/3/8 | — | — |
| 6 | FALLON | 2.6% | 11.9% | 10 | ❌ | ❌ (live 9.8 ✅) | 9/8/7/8/10/10 | — (see note) | — |
| 4 | LO RIDER | 2.1% | 9.3% | 24 | ❌ | ❌ | 8/8/7/13/8/8 | — | — |
| 11 | SAMARKAND | 0.7% | 3.7% | 21 | ❌ | ❌ | 6/7/2/4/12/5 | — | — |

Form = last six runs, oldest to newest, from data/historical (both venues). Rows are in MC Win% order.

Market: overround 23.0%, favourite bias −5.9%. MC agrees with the market's top three (#1, #9, #3), but the race is tight at the top: ratings are 72 / 70 / 70.
- **Overlays:** #1 FORTUNATE SON. Its Place bet shows a 28% edge, and the tool recommends Place bets on #1, #3 and #9. #2 SERAPH GABRIEL has a value score of 1.48: MC ranks it 5th, but it is 8th in the market.
- **Overvalued runners:** #11 (by 85%), #6 (by 74%, the 4th market choice) and #8 (by 62%).

The top MC quinellas are 1-9 (9.5%), 1-3 (8.8%) and 3-9 (7.3%), so no single pair dominates.

Finish-time projection note: the speed-figure projection has #2 SERAPH GABRIEL and #6 FALLON fastest (1:48.72), then #3 (+0.14s). It puts the MC #1, FORTUNATE SON, 11th (+2.94s). This is a very different view from the MC ranking, which leans on recent form and rating.

## STRATEGY A — HORSE RANKINGS (MC + SCMP adjustments)

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Wt | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|----|-------|------------|------|
| 1 | 1 | FORTUNATE SON | 23.9% | 54.0% | +form +1 | +form +1 | 24.9% | 55.0% | 4.0 | C Y Ho | 4 | 135 | On-pace/Stalker | +form | ★ 膽 (Banker) |
| 2 | 9 | CHINA WIN | 18.6% | 47.1% | excuses +2 | excuses +2 | 20.6% | 49.1% | 4.7 | Z Purton | 3 | 124 | Stalker | +excuses (wide, bumped) | 腳 (Leg) |
| 3 | 3 | FIVEFORTWO | 17.7% | 46.3% | 0 | 0 | 17.7% | 46.3% | 5.6 | C L Chau (-2) | 8 | 131 | Closer | — | 腳 (Leg) |
| 4 | 2 | SERAPH GABRIEL | 8.2% | 29.0% | trial +2 | trial +2 | 10.2% | 31.0% | 17 | B Avdulla | 12 | 134 | — | +trial (gate 12 a concern) | 腳 (Leg) |
| 5 | 7 | THE AUSPICIOUS | 5.6% | 20.7% | +form +1 | +form +1 | 6.6% | 21.7% | 19 | A Badel | 11 | 126 | — | +form ("improved") | 腳 (Leg) |
| 6 | 12 | FOREVER FOLKS | 8.4% | 28.4% | -age −2 | 0 | 6.4% | 28.4% | 11 | K C Leung | 10 | 118 | — | -age (8yo) | 腳 (Leg) |
| 7 | 10 | VIOLET STAR | 3.8% | 15.8% | excuses +2 | excuses +2 | 5.8% | 17.8% | 14 | A Atzeni | 2 | 122 | Back marker | +excuses (blundered, crowded) | — |
| 8 | 5 | CORLEONE | 5.2% | 19.9% | 0 | 0 | 5.2% | 19.9% | 21 | E C W Wong (-3) | 9 | 128 | — | — | — |
| 9 | 8 | GLITTERING LEGEND | 3.2% | 14.0% | 0 | 0 | 3.2% | 14.0% | 12 | L Ferraris | 7 | 125 | — | — | — |
| 10 | 6 | FALLON | 2.6% | 11.9% | 0 | 0 | 2.6% | 11.9% | 10 | M L Yeung | 5 | 128 | Midfield | — | — |
| 11 | 4 | LO RIDER | 2.1% | 9.3% | 0 | 0 | 2.1% | 9.3% | 24 | K Teetan | 1 | 130 | Handy | — | — |
| 12 | 11 | SAMARKAND | 0.7% | 3.7% | -age −2 | 0 | 0.1% (floor) | 3.7% | 21 | L Hewitson | 6 | 119 | — | -age (8yo) | — |

Factor labels used here:
- +form +1: "improved", "rallied" or "made all", or a win in the most recent run
- excuses +2: crowded, steadied or wide trip last run
- trial +2
- -age −2: 8 years or older in a Class 3+ race. The skill table applies this to Win% only.

No horse reached the ±8 / ±10 caps. Banker eligibility: #1 has 10 form records, so it is eligible.

SCMP adjustments applied:
- **#1 FORTUNATE SON**: Star Form notes "two recent Valley wins". It won its last two races, including C3 Valley 1,800m on 23-Sep, so +form +1. It now carries top weight of 135 (+9), which is not a scored flag but is noted.
- **#9 CHINA WIN**: TIR says it "raced wide and without cover for the majority of the event" and was bumped at the 300m. That is a wide trip, so excuses +2. Star Form also calls it "a rough run" from gate 11. It draws gate 3 today.
- **#2 SERAPH GABRIEL**: Trackwork says it "caught the eye in a dirt gallop on the weekend and looms as a major contender", so trial +2. Star Form says the gate (12) is a concern. Gate penalties are reducers, not exclusions (Rule 15), and no draw factor is in the scoring table, so none is applied.
- **#7 THE AUSPICIOUS**: Star Form says it "improved to finish sixth first up" over Valley 1,800m, so +form +1. TIR "jumped only fairly" is a single note, so no -barrier.
- **#10 VIOLET STAR**: TIR says it "jumped only fairly but then blundered shortly after the start", plus a crowding note. That is bad luck, so excuses +2.
- **#12 FOREVER FOLKS / #11 SAMARKAND**: both are 8 years old in a Class 3 race, so -age −2 to Win% only. #12's TIR "missed the start and lost a considerable amount of ground" is a single note, so no -barrier. It is not a crowded/steadied/wide excuse either.
- **#3 FIVEFORTWO**: TIR "shifted across behind runners" does not meet the excuse bar. Its season-debut run, closing from last for 2nd, does not meet the improved/rallied/made-all wording bar. No adjustment.
- **#5 CORLEONE / #8 GLITTERING LEGEND**: post-race vet checks found nothing significant. #8's "rider could offer no explanation" was not a stewards' "unacceptable performance" flag. No adjustment.
- **#4, #6**: no TIR, vet or trackwork flags. No adjustment.

Reasoning: No horse reaches 35%; the top Adj Win% is 24.9%, so the race is Competitive and Mode B applies.
- **Top 3 by Adj Win%:** #1 (24.9), #9 (20.6), #3 (17.7).
- **Next 3 by Adj Place%:** #2 (31.0), #12 (28.4), #7 (21.7).

Rule 8 (Adj Place% ≥ 20%) is fully covered by this 6-horse pool. Rule 9 forces nothing in. #6 (10), #8 (12) and #10 (14) carry no negative flags and are excluded only on Adj Place%. #11 (21) has a negative flag but is over 15.

#9's Adj Place% is 49.1%, below 63%, so this is a single-banker 膽拖.

Left out:
- **#5 CORLEONE (21)**: 19.9% place, just under the line. It has struggled in its last three runs, it is untried at 1,800m, and it is drawn 9.
- **#10 VIOLET STAR (14)**: 17.8% Adj Place%, with an excuse last run.
- **#8 (12) and #6 (10)**: MC flags both as overvalued.

Pace: HV 1,800m favours stalkers. #1 (gate 4) and #9 (gate 3) should get the box-seat run, and #4 (gate 1) may go forward. #3 is a closer from gate 8, and #2 (gate 12) and #7 (gate 11) have wide gates to overcome.

## TRIO POOL (Strategy A, any order)

```
POOL: #1, #9, #3, #2, #7, #12
MODE: B (Competitive, #1 Adj Win% 24.9%) | POOL SIZE: 6
  Top 3 by Adj Win%: #1 (24.9), #9 (20.6), #3 (17.7)
  + 3 by Adj Place%: #2 (31.0), #12 (28.4), #7 (21.7)

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #1 FORTUNATE SON (Adj Win% 24.9%, Adj Place% 55.0%) ← locked in every combo
腳 (Legs):  #9, #3, #2, #12, #7
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville estimate from normalised Adj Win%):

| Rank | Horses (any order) | Est. Prob | Est. Fair Odds |
|------|--------------------|-----------|----------------|
| 1 | #1, #9, #3 | 9.7% | $103 per $10 |
| 2 | #1, #9, #2 | 5.1% | $196 per $10 |
| 3 | #1, #3, #2 | 4.2% | $237 per $10 |
| 4 | #1, #9, #7 | 3.2% | $315 per $10 |
| 5 | #1, #9, #12 | 3.1% | $325 per $10 |
| 6 | #1, #3, #7 | 2.6% | $381 per $10 |
| 7 | #1, #3, #12 | 2.5% | $394 per $10 |

Estimated chance the Strategy A ticket hits (sum of 10 combos): about 34% on Adj Win% and 35% on raw MC. The banker's top-3 chance is about 62% on Harville and 54–55% on MC place.

## TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKET: 膽 #1 | 腳 #9, #3, #2, #12, #7

TOP COMBINATIONS (highest value):
  1-9-3 (9.7%), 1-9-2 (5.1%), 1-3-2 (4.2%), 1-9-7 (3.2%), 1-9-12 (3.1%), 1-3-7 (2.6%), 1-3-12 (2.5%)
```

Value note: 1-9-3 is the three market favourites (4.0 / 4.7 / 5.6), so it will pay short. Value comes from #2 (17), #7 (19) or #12 (11) filling a place. #2 has the trial, the MC value score of 1.48 and the fastest speed-figure projection, so 1-9-2 and 1-3-2 are the best-value combos.

PASS CONDITIONS:
- If #1 FORTUNATE SON (banker) is scratched → VOID the ticket (do not restructure).
- If the field drops below 3 → pool refunded.
- If the going changes to Yielding/Soft or worse → re-run the MC (#3 has wet-track winning form).
- If #1 drifts beyond ~7 in late betting → consider PASS.
- If a leg is scratched → drop it (C(4,2) = 6 combos, $60).

CONFIDENCE: LOW-MEDIUM.
- Strengths: the top three are clear on MC (ratings 72 / 70 / 70 vs ≤65 for the rest), and the banker has won its last two races.
- Risks: this is a competitive 12-runner Valley handicap. The banker has only 54% MC place, carries top weight of 135, and the speed figures rank it 11th. The ticket hit rate is only about 34%.

CAVEATS:
- **SCMP data is partial.** Star Form, TIR, Vet and Trackwork were read. Each horse shows three unlabelled odds figures (for example #1 3.3 / 3.7 / 1.5). They are consistent with the HKJC order but cannot be mapped to win/place with certainty. The Q/QP matrices could not be read into pairs, so no QP cross-reference was done.
- During the MC run, the scraper log line printed "distance=1200m". The enriched racecard and the MC header both use 1800m, which matches the SCMP card. Treat this as cosmetic (the same thing happened in R3 and R6).
- **The finish-time projection, based on average speed figures, sharply disagrees with MC.** It ranks #2 and #6 joint fastest and puts the MC #1 (the banker) 11th. That makes this banker less secure than usual.
- **#6 FALLON is on the Strategy B borderline.** It is 10 in the early-morning pool but 9.8 in the MC's live odds (see Strategy B note).
- Two 8-year-olds (#11, #12) were given −2 Win% for age; Place% was left unadjusted.
- The Harville hit rates come from normalised win probabilities and overstate the banker's top-3 chance compared with the MC place figure.
- Odds are from the 11:01 HKT early pool. The pool will move before the 22:15 jump.
- Historical sync was not re-run in this session (already done per instruction).
```

## STRATEGY B (MC-only)

```
Banker: #1 FORTUNATE SON (MC Win% 23.9%, MC Place% 54.0%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #9 (47.1%), #3 (46.3%), #2 (29.0%), #12 (28.4%), #7 (20.7%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #7 THE AUSPICIOUS (20.7%, 19), #12 FOREVER FOLKS (28.4%, 11), #2 SERAPH GABRIEL (29.0%, 17)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none on the early-morning odds file
  (#6 FALLON is at 10.0, which is not < 10.)
Action: no replacement or addition
Final legs: #9, #3, #2, #12, #7
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #1 | 腳 #9, #3, #2, #12, #7
  1-9-3, 1-9-2, 1-9-12, 1-9-7, 1-3-2, 1-3-12, 1-3-7, 1-2-12, 1-2-7, 1-12-7

Top combos (Harville, raw MC): 1-9-3 9.9% | 1-9-12 4.2% | 1-9-2 4.1% | 1-3-12 3.9% | 1-3-2 3.8% | 1-9-7 2.7%
Est. ticket hit chance (sum of 10 combos, raw MC): ~35% (MC banker place 54.0%)

Live-odds variant: if #6 FALLON is below 10 at bet time (it was 9.8 in the MC's live odds), it becomes a
Win-odds candidate. It would replace #7 THE AUSPICIOUS, the lowest-MC-Place% replaceable leg:
  膽 #1 | 腳 #9, #3, #2, #12, #6 → 10 combos, $100 (est. hit ~31%)
```

Comparison: on the early-morning odds, Strategy A and Strategy B produce the **identical ticket**: banker #1, legs #9/#3/#2/#12/#7, 10 combos, $100. The SCMP adjustments only re-order the legs and change no pool membership. #7 is the marginal leg in both. Strategy B includes it at 20.7% place (just over 20%). Strategy A includes it as the 3rd Adj Place% pick (21.7%, after +form). The only possible difference is #6 FALLON's price at bet time: below 10, Strategy B swaps #7 out for #6.

```
═══════════════════════════════════════════════════════════
```
