# Trio (單T) Strategy — Happy Valley | 2026-10-21 | Race 5

> Pre-race run (generated 2026-10-21, race day; night meeting, R5 off 8:40pm HKT)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-21 | Race 5
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings (12 runners; 2 SCMP reserves not running)
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --bankroll 1000, --kelly 0.35, --min-edge 5)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork parsed; one odds figure per horse (column unlabelled, looks like place odds); QP/Q matrix not mappable
ODDS SOURCE: HKJC early pool (fetch-odds.ts, data/odds/odds_20261021_HV.json, captured 11:01 HKT 21-Oct)
             SCMP odds: ⚠️ loaded, cross-check only | HKJC live: ✅ loaded (morning snapshot, not final)

RACE: R5 — Class 4 | 1000m | Turf ("B" course) | Good | 12 runners (SPEEDY HANDICAP)
CLASSIFICATION: Competitive (top Adj Win% 26.2%) | POOL SIZE: 7
MODE: B: Standard Pool (6), widened to 7 by Reminder 9 (#10 SUPER SIXTY, 8.4 odds, kept out only by its negative vet flag)
BET STRUCTURE: 膽拖 1膽 + 6腳 = C(6,2) = 15 combos (2nd-ranked #1 Adj Place% 50.4% < 63%, so no 雙膽拖)
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Happy Valley 2026-10-21 (night) | Going: Good | Surface: Turf ("B" course)
Target Race(s): R5 (Class 4 | 1000m | 12 runners)
Scratchings: none (SCMP reserves GOOD LUCK HAPPY and HEROIC VANGUARD are not running)
Odds coverage: 12/12 horses with HKJC win odds; analyzer estimated place odds from win odds
SCMP data: ✅ loaded (odds columns and QP/Q matrix ⚠️ not usable)
```

- ≥3 starters ✅ | Odds for all 12 ✅ | Jockey (12) and trainer (10) profiles loaded ✅ | 10 of 12 horses enriched with form.
- **Debutants:** #5 COLOURFUL GOLD and #6 FLOW RIDER have no race form, only Conghua trials. **Sparse form:** #8 LEAN FLYER and #9 SYNERGY IN ACTION have 2 runs each, and #9 is making its Valley debut.
- **Layoffs:** #10 SUPER SIXTY was last raced 20-May (154 days) and had fetlock surgery on 16-Jul. #11 KING ALLOY was last raced 24-Jun (119 days) and was lame afterwards.
- The analyzer log printed `parsed distance=1200m`, but the racecard, the race header and SCMP all give **1000m**, and the MC ran at 1000m.
- The odds file also has R10/R11 entries that copy R1. The meeting has 9 races, so those were ignored.
- `careerStarts` is 0 for every horse in the scraped racecard, so banker eligibility uses the form lines. #3 has 9 recorded runs, so it is eligible.

---

## MC SIMULATION (raw)

Form = last 6 finishes, most recent first.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 3 | GEORGIAN SIGMA | 25.2% | 55.5% | 5.9 | ✅ | ✅ | 1-2-3-7-3-3 | ★ 膽 (Banker) | 1-3: 11.1% (9.0) |
| 1 | GRAND NOVA | 20.0% | 48.4% | 10 | ✅ | ❌ | 7-4-1-7-2-12 | 腳 (Leg) | 1-2: 5.5% (18.1) |
| 2 | MASTER CHAMPION | 14.2% | 38.7% | 10 | ✅ | ❌ | 3-14-12-10-12-4 | 腳 (Leg) | 2-3: 7.3% (13.6) |
| 4 | COPPER CORE | 7.6% | 25.5% | 11 | ✅ | ❌ | 9-8-11-10-10-11 | — (replaced by #7) | 3-4: 4.5% (22.0) |
| 10 | SUPER SIXTY | 6.5% | 22.7% | 8.4 | ✅ | ✅ | 9-12-8-5-4-2 | 腳 (Leg) | 3-10: 3.6% (28.0) |
| 11 | KING ALLOY | 5.5% | 22.0% | 7.8 | ✅ | ✅ | 9-1-3-4-3-3 | 腳 (Leg) | — |
| 9 | SYNERGY IN ACTION | 5.5% | 20.6% | 21 | ✅ | ❌ | 14-12 | — (replaced by #12) | — |
| 6 | FLOW RIDER | 4.2% | 16.6% | 18 | ❌ | ❌ | debut | — | — |
| 7 | IRON SECURITY | 3.6% | 15.1% | 6.1 | ❌ | ✅ | 2-10-10-6-9-10 | 腳 (Leg) (replacement) | — |
| 12 | MAPOGO | 3.3% | 14.7% | 6.0 | ❌ | ✅ | 8-4-5-11-7-6 | 腳 (Leg) (replacement) | — |
| 5 | COLOURFUL GOLD | 3.3% | 14.7% | 22 | ❌ | ❌ | debut | — | — |
| 8 | LEAN FLYER | 1.1% | 5.5% | 17 | ❌ | ❌ | 10-10 | — | — |

Market: The market is wide open. The top six are all 5.9–8.4 (#3, #12, #7, #11, #10). MC agrees with the market on #3 but rates #1 GRAND NOVA and #2 MASTER CHAMPION (both 10) as its 2nd and 3rd choices. MC flags #1 as undervalued by about 100%, and #12 (market 2nd favourite) and #7 (3rd favourite) as heavily overvalued (MC Place% about 15%). Overround is 24.2%. On the finish-time projection, #1 is fastest (56.89), followed by #3 (+0.56s) and #10 (+0.84s).

---

## STRATEGY A

### SCMP DATA (R5)

| # | Horse | SCMP fig.* | Star Form Signal | TIR Flag | Vet Flag | Trackwork / Trial | Running Style |
|---|-------|-----------|------------------|----------|----------|-------------------|---------------|
| 1 | GRAND NOVA | 2.9 | troubled 4th, then 7th after slow start | +excuses (jumped fairly, steadied 550m) | clear | — | Mid / close |
| 2 | MASTER CHAMPION | 3.6 | close 3rd at big odds after wide trip; wide draw a concern | +excuses (wide trip); rider warned over whip use | clear | — | Mid |
| 3 | GEORGIAN SIGMA | 2.3 | 3rd → 2nd (gate 12) → won pressing fast pace | shifted out early, contact | clear | — | On-pace |
| 4 | COPPER CORE | 3.1 | closed from 8th; 9th without clear run | +excuses (bumped, held up, restricted room) | clear | — | Close |
| 5 | COLOURFUL GOLD | 6.5 | debut; ridden hard for 4th in Conghua trial | — | poor trial 18-Jun, passed 18-Sep (>30d) | — | — |
| 6 | FLOW RIDER | 4.9 | debut; good 2nd in Conghua trial | — | clear | +trial | — |
| 7 | IRON SECURITY | 2.3 | well-backed neck 2nd to #3 last start | — | clear | — | Mid / on-pace |
| 8 | LEAN FLYER | 3.8 | two 10ths; chased pace for 2nd in Valley trial | — | clear | +trial | Front |
| 9 | SYNERGY IN ACTION | 5.4 | early speed, front-running last; Valley debut | jumped awkwardly (once) | clear | +trial (2nd in latest Valley trial) | Front |
| 10 | SUPER SIXTY | 3.2 | disappointing in 3 runs since placings; fetlock surgery Jul | jumped awkwardly, lay in, no clear run (R709) | **fetlock surgery 16-Jul, passed 06-Oct (15 days)** | — | On-pace |
| 11 | KING ALLOY | 3.0 | won chasing speed over C&D, then lame | rider said may not have handled grade | lame 25-Jun, passed 08-Sep (>30d) | — | On-pace |
| 12 | MAPOGO | 2.6 | front-running 4th, then 8th wide from gate 12; drawn better | +excuses (boxed in, raced wide without cover) | clear | — | Front |

\*SCMP shows one unlabelled figure per horse. It sits close to HKJC place odds (for example #3 2.3 vs 2.2 and #7 2.3 vs 2.1), so it was used only as a cross-check. HKJC win odds are primary.

### HORSE RANKINGS

As in the R1–R3 reports, SCMP factors that the skill defines on Win% are applied equally to Place%. The injury flag uses its defined −3 Win / −4 Place. No caps (±8 Win / ±10 Place) were reached.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 3 | GEORGIAN SIGMA | 25.2% | 55.5% | +form +1 | +form +1 | 26.2% | 56.5% | 5.9 | Y L Chung (-2) | On-pace | +form | ★ 膽 (Banker) |
| 1 | GRAND NOVA | 20.0% | 48.4% | excuses +2 | excuses +2 | 22.0% | 50.4% | 10 | B Avdulla | Mid | +excuses | 腳 (Leg) |
| 2 | MASTER CHAMPION | 14.2% | 38.7% | excuses +2 | excuses +2 | 16.2% | 40.7% | 10 | H Y Yuen (-7) | Mid | +excuses | 腳 (Leg) |
| 4 | COPPER CORE | 7.6% | 25.5% | excuses +2 | excuses +2 | 9.6% | 27.5% | 11 | K C Leung | Close | +excuses | 腳 (Leg) |
| 9 | SYNERGY IN ACTION | 5.5% | 20.6% | trial +2 | trial +2 | 7.5% | 22.6% | 21 | C Y Ho | Front | +trial | 腳 (Leg) |
| 12 | MAPOGO | 3.3% | 14.7% | excuses +2, +draw +1 | excuses +2, +draw +1 | 6.3% | 17.7% | 6.0 | M Chadwick | Front | +excuses, +draw | — |
| 6 | FLOW RIDER | 4.2% | 16.6% | trial +2 | trial +2 | 6.2% | 18.6% | 18 | M F Poon | — | +trial | — |
| 11 | KING ALLOY | 5.5% | 22.0% | 0 | 0 | 5.5% | 22.0% | 7.8 | M L Yeung | On-pace | — | 腳 (Leg) |
| 10 | SUPER SIXTY | 6.5% | 22.7% | -injury30d −3, excuses +2 | -injury30d −4, excuses +2 | 5.5% | 20.7% | 8.4 | E C W Wong (-3) | On-pace | -injury30d, +excuses | 腳 (Leg) (Reminder 9) |
| 7 | IRON SECURITY | 3.6% | 15.1% | +form +1 | +form +1 | 4.6% | 16.1% | 6.1 | P N Wong (-7) | Mid | +form | — |
| 5 | COLOURFUL GOLD | 3.3% | 14.7% | 0 | 0 | 3.3% | 14.7% | 22 | A Badel | — | — | — |
| 8 | LEAN FLYER | 1.1% | 5.5% | trial +2 | trial +2 | 3.1% | 7.5% | 17 | H Bentley | Front | +trial | — |

Note: ★ 膽 = Banker (1st by Adj Win%; #3 has 9 form lines, so it is eligible). #1 has Adj Place% 50.4%, below the 63% needed for 雙膽拖.

**Reasoning:** #3 GEORGIAN SIGMA tops the field on Adj Win% at 26.2%. That falls in the 20–35% Competitive band, so the race uses **Mode B**: the top 3 by Adj Win% (#3, #1, #2) plus 3 more by Adj Place% (#4 27.5%, #9 22.6%, #11 22.0%). #4 is the only non-top-3 horse at or above the 25% must-include line, and it is already in the pool. **#10 SUPER SIXTY** is then added under **Reminder 9**. It is 8.4 in the market (≤15), and the negative vet flag is the only thing keeping it out: on raw MC (22.7%) it would rank ahead of #9 and #11 for a Mode B slot. That gives a 7-horse pool, which also fits the Happy Valley guidance to use wider pools.

- **#3 GEORGIAN SIGMA** (gate 12, 133 lb with a 2 lb claim) is in form at 3-2-1. It won the 7-Oct Valley 1000m pressing a fast pace and beat #7 by a neck. It is MC #1 and the market favourite. Gate 12 is the risk.
- **#1 GRAND NOVA** (top weight 135 lb, gate 8) won a Valley 1000m in June and has 7 runs at the trip. It jumped only fairly and was steadied last time. It is fastest on the finish-time projection, and MC rates it about twice as likely to win as the market does.
- **#2 MASTER CHAMPION** (gate 11, 134 lb with a 7 lb claim) was a close 3rd at big odds after racing wide last start. SCMP notes the wide draw is a concern.
- **#4 COPPER CORE** (gate 1) was bumped and held up last start. A closer from the best gate.
- **#9 SYNERGY IN ACTION** has 2 runs and is a Valley debutant. It has an improved Valley trial (2nd) and early speed. Its 21 odds mean it is the most speculative leg.
- **#11 KING ALLOY** (116 lb, gate 6) won a Class 5 over C&D chasing the speed and has placed often. It returns from lameness (passed 8-Sep, more than 30 days ago, so no flag).
- **#10 SUPER SIXTY** (124 lb with a 3 lb claim, gate 3) placed in four Valley 1000m runs last season and is 3rd on the time projection. It returns from fetlock surgery, passed only 15 days ago.

**Excluded:** #12 MAPOGO (6.0, market 2nd favourite) and #7 IRON SECURITY (6.1) are short in the market but have Adj Place% of only 17.7% and 16.1%. Both have positive flags, so they are out on MC alone and Reminder 9 does not apply. Debutant #6 FLOW RIDER (18.6% with its trial factor) is below the line. #5 and #8 are well below it.

**Pace:** There is plenty of early speed: #12 and #9 (front), and #3, #10 and #11 (on-pace). The skill notes a front-runner bias at Happy Valley in short sprints, which favours on-pace #3 if it can cross from gate 12. #4 (gate 1) and #1 are best placed to benefit if the pace collapses.

**20%-variant note:** All horses with Adj Place% between 20% and 25% (#9 22.6%, #11 22.0%, #10 20.7%) are already in the pool. The 20%-threshold ticket is therefore identical: 1膽 + 6腳, 15 combos, $150.

### TRIO POOL (any order)

```
POOL: #3, #1, #2, #4, #9, #11, #10
MODE: B (6, widened to 7 by Reminder 9) | POOL SIZE: 7

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #3 GEORGIAN SIGMA (Adj Place% 56.5%) ← locked in every combo
腳 (Legs):  #1, #2, #4, #9, #11, #10
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville approximation from Adj Win%, renormalised):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #3, #1, #2 | 7.0% | $14 |
| 2 | #3, #1, #4 | 3.9% | $26 |
| 3 | #3, #1, #9 | 3.0% | $34 |
| 4 | #3, #2, #4 | 2.7% | $38 |
| 5 | #3, #1, #11 | 2.1% | $47 |
| 5= | #3, #1, #10 | 2.1% | $47 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY A TICKET: 膽 #3 / 腳 #1, #2, #4, #9, #11, #10
  3-1-2 7.0%   | 3-1-4 3.9%   | 3-1-9 3.0%   | 3-2-4 2.7%   | 3-1-11 2.1%
  3-1-10 2.1%  | 3-2-9 2.0%   | 3-2-11 1.5%  | 3-2-10 1.5%  | 3-4-9 1.1%
  3-4-11 0.8%  | 3-4-10 0.8%  | 3-9-11 0.6%  | 3-9-10 0.6%  | 3-11-10 0.4%
  Ticket coverage (sum, Adj Harville): ~30.2%
  (Without the Reminder 9 add of #10: 1膽 + 5腳 = 10 combos / $100, coverage ~24.8%)

PASS CONDITIONS:
- If #3 GEORGIAN SIGMA (banker) is scratched → VOID ticket (do not restructure)
- If #10 SUPER SIXTY is scratched (fitness doubt) → play the 1膽 + 5腳 Mode B ticket ($100)
- If field drops below 3 → pool refunded
- If going changes to Yielding or worse → reconsider; on-pace bias may weaken

CONFIDENCE: LOW–MEDIUM (competitive race, wide-open market, banker drawn 12)
```

---

## STRATEGY B (MC-only)

```
Banker: #3 GEORGIAN SIGMA (MC Win% 25.2%, MC Place% 55.5%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #1 (48.4%), #2 (38.7%), #4 (25.5%), #10 (22.7%), #11 (22.0%), #9 (20.6%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #4 COPPER CORE (MC Place% 25.5%, Win odds 11), #9 SYNERGY IN ACTION (MC Place% 20.6%, Win odds 21)
  (#10 at 8.4 and #11 at 7.8 are not replaceable: odds < 10)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #12 MAPOGO (Win odds 6.0, MC Place% 14.7%), #7 IRON SECURITY (Win odds 6.1, MC Place% 15.1%)
Action: #12 replaced #9 (lowest MC Place% replaceable leg); then #7 replaced #4 (next lowest)
Final legs: #1, #2, #10, #11, #12, #7
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #3 / 腳 #1, #2, #10, #11, #12, #7
  3-1-2 9.0%   | 3-1-10 3.7%  | 3-1-11 3.1%  | 3-2-10 2.4%  | 3-2-11 2.0%
  3-1-7 2.0%   | 3-1-12 1.8%  | 3-2-7 1.3%   | 3-2-12 1.2%  | 3-10-11 0.8%
  3-10-7 0.5%  | 3-10-12 0.5% | 3-11-7 0.5%  | 3-11-12 0.4% | 3-12-7 0.3%
  Ticket coverage (sum, raw MC Harville): ~29.7%
```

Comparison: Both strategies use banker #3, cost $150 (15 combos), and share four legs (#1, #2, #10, #11). They differ on the last two legs. Strategy A keeps the MC/SCMP horses #4 COPPER CORE (11) and #9 SYNERGY IN ACTION (21). Strategy B swaps them for the market's 2nd and 3rd favourites, #12 MAPOGO (6.0) and #7 IRON SECURITY (6.1), which MC rates at only about 15% to place. If #12 or #7 makes the frame, only B can collect. A bigger dividend is more likely under A if #4 or #9 places.

---

## CAVEATS

- **Morning odds (11:01 HKT), not final.** Strategy B is sensitive to them. #1 and #2 are exactly 10, so neither is a Win-odds candidate. If either drifts below 10 with its Place% > 20%, nothing changes. If #4 shortens below 10, it is no longer replaceable and #7 would be **added** instead (7 legs, 21 combos, $210). If #6 FLOW RIDER (18) or #5 shortens below 10, it becomes a candidate with no replaceable leg left and would be added. Recheck near jump time.
- **Reminder 9 judgement (Strategy A).** #10 was added because its 8.4 odds and negative vet flag meet Reminder 9 ("include despite negative flags if ≤15"). The strict Mode B 6-pool without #10 is 1膽 + 5腳 = 10 combos / $100.
- **SCMP judgement calls.** #4 "couldn't be fully ridden out in restricted room" was treated as excuses (+2), not as not ridden out (−2), because the cause was traffic, not soundness. #2's whip warning was not treated as not ridden out. #10's Race 709 clear-running trouble (+2) is from its last start in May, so it is old. Gate penalties under Reminder 15 (#3 gate 12, #2 gate 11, #6 gate 10) were not applied as separate factors, matching R1–R3. Applying −1 to −3 to #3 would push it to 23–25%, still the top-ranked horse.
- **SCMP odds/QP unusable.** SCMP shows one unlabelled figure per horse, and the QP/Q grid could not be mapped to pairings, so the QP cross-check was skipped.
- **Fitness / layoffs:** #10 had fetlock surgery (passed only 15 days ago, 154 days since its last run). #11 has had 119 days off after lameness. #5 and #6 are debutants, and MC's 14.7% and 16.6% for them have no race form behind them.
- **Banker draw:** #3 drawn 12 at Valley 1000m. It did run 2nd from gate 12 previously.
- Analyzer log printed `distance=1200m` once. The race is 1000m (racecard, header and SCMP agree), and the MC used 1000m.
- `careerStarts` is unpopulated in the scraped racecard, so banker eligibility used the form lines.
- Trio combination probabilities are a Harville approximation from Win%, not direct MC trio counts.
- Per instructions, `sync-historical.ts` and `fetch-odds.ts` were not re-run (data already fetched). The R10/R11 entries in the odds file are phantom copies of R1 and were ignored.

```
═══════════════════════════════════════════════════════════
```
