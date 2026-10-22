# Trio (單T) Strategy — Happy Valley | 2026-10-21 | Race 1

> Pre-race run (generated 2026-10-21, race day; night meeting, R1 off 6:40pm HKT)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-21 | Race 1
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 1 scratching (#9 INNO SUPER)
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --kelly 0.35, --min-edge 5)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork parsed; Win/Place odds parsed (columns unlabelled); QP/Q matrix not mappable
ODDS SOURCE: HKJC early pool (fetch-odds.ts, data/odds/odds_20261021_HV.json, captured 11:00 HKT 21-Oct)
             SCMP odds: ✅ loaded (cross-check only) | HKJC live: ✅ loaded (morning snapshot, not final)

RACE: R1 — Class 4 | 1650m | Turf ("B" course) | Good | 10 runners (RACING SPIRIT HANDICAP, Sec 2)
CLASSIFICATION: Dominant (top Adj Win% 46.5%) | POOL SIZE: 6
MODE: A: Tight Pool (5), widened to 6 by the Adj Place% ≥ 25% must-include rule
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos (2nd-ranked #6 Adj Place% 56.8% < 63%, so no 雙膽拖)
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Happy Valley 2026-10-21 (night) | Going: Good | Surface: Turf ("B" course)
Target Race(s): R1 (Class 4 | 1650m | 10 runners)
Scratchings: #9 INNO SUPER (withdrawn per SCMP; absent from HKJC odds and racecard)
Odds coverage: 10/10 horses with win odds (HKJC); place odds estimated by analyzer from win odds
SCMP data: ✅ loaded (QP/Q matrix ⚠️ not usable)
```

- ≥3 starters ✅ | Odds populated for all 10 ✅ | Jockey (10) and trainer (9) profiles loaded ✅ | All 10 horses enriched with form.
- The odds file also has R10/R11 entries that duplicate R1. The meeting has 9 races, so those were ignored.
- **Shorter form lines:** #5 WELL ENOUGH (4 runs, all Sha Tin, first try at 1650m), #10 I AM BACK (4 runs, all 1200m, first try at 1650m), #11 HAPPY PROMISE (5 runs, Valley 1650m debut), #7 JUMBO STEPS and #8 MISSION GIANT (7 runs).
- **Trip experience at 1650m (MC "trip" count):** #2 10, #3 10, #4 9, #8 3, #1 2, #7 1. #6, #5, #10 and #11 have 0.
- `careerStarts` is 0 for every horse in the scraped racecard (field not populated), so banker eligibility uses the form lines. #2 has 10 recorded runs, so it is eligible.

---

## MC SIMULATION (raw)

Form = last 6 finishes, most recent first.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 2 | GLORIOUS JOURNEY | 46.5% | 80.3% | 4.4 | ✅ | ✅ | 3-6-2-2-9-2 | ★ 膽 (Banker) | 2-6: 23.9% (4.2) |
| 6 | ACE | 20.4% | 58.8% | 6.2 | ✅ | ✅ | 8-6-10-1-7-4 | 腳 (Leg) | 2-6: 23.9% (4.2) |
| 7 | JUMBO STEPS | 7.9% | 33.2% | 12 | ✅ | ❌ | 8-6-11-11-7-5 | 腳 (Leg) | 2-7: 10.4% (9.6) |
| 11 | HAPPY PROMISE | 6.1% | 27.0% | 7.2 | ✅ | ✅ | 10-5-11-4-4 | 腳 (Leg) | 2-11: 7.5% (13.2) |
| 1 | REFUSETOBEENGLISH | 6.1% | 26.6% | 5.1 | ✅ | ✅ | 7-12-4-2-8-5 | 腳 (Leg) | 1-2: 7.3% (13.7) |
| 10 | I AM BACK | 4.8% | 24.5% | 12 | ✅ | ❌ | 5-7-12-8 | 腳 (Leg) | 2-10: 6.6% (15.2) |
| 4 | RAGGA BOMB | 4.0% | 21.2% | 15 | ✅ | ❌ | 12-6-7-3-1-8 | — (replaced by #3) | — |
| 5 | WELL ENOUGH | 1.9% | 12.4% | 11 | ❌ | ❌ | 5-13-13-10 | — | — |
| 8 | MISSION GIANT | 1.4% | 10.1% | 22 | ❌ | ❌ | 7-7-14-12-10-4 | — | — |
| 3 | VIVA GRACIOUSNESS | 1.0% | 6.1% | 7.5 | ❌ | ✅ | 11-5-6-8-9-9 | 腳 (Leg) (replacement for #4) | — |

Market: Overround 22.3%. #2 GLORIOUS JOURNEY is the morning favourite at 4.4 (~23% implied), and MC makes it a clear top pick at 46.5% (flagged undervalued by 105%). MC rates #3 VIVA GRACIOUSNESS (7.5, 5th in the market) at only 1.0% (overvalued by 93%) and #5 WELL ENOUGH (11) at 1.9% (overvalued by 80%). #1 REFUSETOBEENGLISH is the 2nd favourite (5.1) but only 5th on MC (6.1%). The analyzer's own bets were Place #2 @2.18 and Place #6 @2.46 (HK$50 each on a HK$1,000 bankroll).

The finish-time projection agrees on #2 (1:39.24, fastest). It has #4 RAGGA BOMB 2nd (+1.26s) and #7 3rd, with #6 ACE only 4th, because #6 has no 1650m runs.

---

## SCMP DATA (Race 1)

Tipster picks ignored. SCMP shows three unlabelled odds figures per horse. The HKJC morning snapshot is the primary odds source. None of the SCMP figures move a horse across the Win-odds-10 line used by Strategy B.

| # | Horse | SCMP odds (as shown) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|----------------------|------------------|----------|----------|-----------|---------------|
| 1 | REFUSETOBEENGLISH | 5.9 / 4.9 / 1.6 | "could improve in Class Four" (no trigger word); non-factor from behind midfield at 1650m | slow to begin (1 run) | clear | — | Midfield / back |
| 2 | GLORIOUS JOURNEY | 4.4 / 4.6 / 1.5 | Valley 1650m winner; frame in 5 of 8; closing 3rd last start | bumped near 1000m (not a listed flag) | clear | — | Closer / stalker |
| 3 | VIVA GRACIOUSNESS | 7.7 / 7.7 / 3.0 | won first two Valley 1650m runs last term; "struggled after a difficult run" from gate 12 | hampered near 300m when taken wider → +excuses | no significant findings | — | On-pace (instructed to go forward) |
| 4 | RAGGA BOMB | 21 / 23 / 5.9 | 1650m winner last season; lame in May (>30 days); fading last at 1650m | shifted in on jumping, raced keenly (1 run, so not repeated) | no significant findings | — | Keen / on-pace |
| 5 | WELL ENOUGH | 12 / 10 / 3.0 | nothing in 2 local 1400m starts; first try at 1650m | steadied near 250m for a narrow run → +excuses | — | — | Back marker |
| 6 | ACE | 6 / 6.2 / 2.5 | C5 1400m winner in March; trying new track and trip | eased near 100m → -notRO | — | — | Prominent |
| 7 | JUMBO STEPS | 12 / 12 / 3.9 | last-to-5th second-up; ridden cold from gate 11 at 1650m | conservative ride instructed (not a listed flag) | — | — | Closer |
| 8 | MISSION GIANT | 21 / 20 / 5.0 | blood in trachea after an earlier 7th (>30 days); ground-covering 7th | hampered near 300m when taken wider → +excuses | — | — | Midfield |
| 10 | I AM BACK | 12 / 12 / 4.1 | closing 5th over this course last time; "bred below for this trip" | eased after start when crowded → +excuses | — | — | Closer |
| 11 | HAPPY PROMISE | 5.2 / 6.4 / 2.2 | Valley 1650m debut "with a good draw" (gate 2) → +draw | jumped awkwardly; rider said disappointing (not a stewards' "unacceptable" finding) | no significant findings | "much-improved piece of work at Conghua" → +trial | Midfield |

QP/Q matrix: SCMP returned unlabelled grids that could not be mapped to pairings, so the QP cross-check (Step 1e-vi) was not possible.

---

## STRATEGY A

### HORSE RANKINGS

The skill defines most SCMP factors on Win% only. Following the template ("same"), each factor is applied equally to Place%. Caps of ±8 Win and ±10 Place were not reached.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 2 | GLORIOUS JOURNEY | 46.5% | 80.3% | 0 | 0 | 46.5% | 80.3% | 4.4 | C Y Ho | Close | — | ★ 膽 (Banker) |
| 6 | ACE | 20.4% | 58.8% | -notRO −2 | -notRO −2 | 18.4% | 56.8% | 6.2 | Z Purton | Front | -notRO | 腳 (Leg) |
| 11 | HAPPY PROMISE | 6.1% | 27.0% | trial +2, +draw +1 | trial +2, +draw +1 | 9.1% | 30.0% | 7.2 | A Atzeni | Stalk | +trial, +draw | 腳 (Leg) |
| 7 | JUMBO STEPS | 7.9% | 33.2% | 0 | 0 | 7.9% | 33.2% | 12 | K C Leung | Close | — | 腳 (Leg) |
| 10 | I AM BACK | 4.8% | 24.5% | excuses +2 | excuses +2 | 6.8% | 26.5% | 12 | E C W Wong (-3) | Close | +excuses | 腳 (Leg) |
| 1 | REFUSETOBEENGLISH | 6.1% | 26.6% | 0 | 0 | 6.1% | 26.6% | 5.1 | J Orman | Mid | — | 腳 (Leg) |
| 4 | RAGGA BOMB | 4.0% | 21.2% | 0 | 0 | 4.0% | 21.2% | 15 | R Kingscote | Front | — | — |
| 5 | WELL ENOUGH | 1.9% | 12.4% | excuses +2 | excuses +2 | 3.9% | 14.4% | 11 | M L Yeung | Close | +excuses | — |
| 8 | MISSION GIANT | 1.4% | 10.1% | excuses +2 | excuses +2 | 3.4% | 12.1% | 22 | M Chadwick | Stalk | +excuses | — |
| 3 | VIVA GRACIOUSNESS | 1.0% | 6.1% | excuses +2 | excuses +2 | 3.0% | 8.1% | 7.5 | P N Wong (-7) | Front | +excuses | — |

Note: ★ 膽 = Banker (1st by Adj Win%; #2 has 10 form lines, so it is eligible). #6 has Adj Place% 56.8%, below the 63% needed for 雙膽拖.

**Reasoning:** #2 GLORIOUS JOURNEY has Adj Win% 46.5%, well over the 35% Dominant line, so the race uses Mode A (banker + 4 by Adj Place%: #6 56.8%, #7 33.2%, #11 30.0%, #1 26.6%). #10 I AM BACK finishes on Adj Place% 26.5% after its +excuses factor. That is above the 25% must-include line, so the pool widens to 6, which also fits the Happy Valley wider-pool guidance.

- **#2 GLORIOUS JOURNEY** is a Valley 1650m winner with 10 runs at the trip and 3-6-2-2-9-2 form. It has draw 3 and was a closing 3rd last start. MC and the finish-time projection both have it 1st, and it is also the market favourite.
- **#6 ACE** has Purton (22% from 102 rides), draw 1 and 128 lb. It has no 1650m runs and was eased late last start (−2).
- **#11 HAPPY PROMISE** has the lightest weight (117 lb), gate 2 and a much-improved Conghua gallop (+3 total). It is making its 1650m debut.
- **#7 JUMBO STEPS** (126 lb, P C Ng 18%) was ridden cold from gate 11 last time and now draws 7.
- **#1 REFUSETOBEENGLISH** is the 2nd market favourite with an 8-from-12 cheque record. MC rates it 5th.
- **#10 I AM BACK** (119 lb with a 3 lb claim) was a closing 5th over the course after being crowded at the start. It steps up from 1200m.

**Excluded:** #4 RAGGA BOMB (Adj Place% 21.2%, 15 odds) is 2nd on the finish-time projection and has 9 runs at the trip, but it is below the 25% must-include line. #3 VIVA GRACIOUSNESS (7.5) and #5 WELL ENOUGH (11) are market horses, but MC gives them almost no chance (8.1% and 14.4% Adj Place%). Rule 9 (no exclusion at ≤15 odds when the only case against a horse is negative flags) does not apply to them: both have positive flags, and they are out on MC alone.

**Pace:** On-pace types are #6 (gate 1), #3 (instructed forward) and #4 (keen). The main closers are #2, #7 and #10. The skill notes a stalker bias at Happy Valley 1650m+, which suits #2 and #11 from low draws.

### TRIO POOL (any order)

```
POOL: #2, #6, #11, #7, #10, #1
MODE: A (widened to 6 by must-include rule) | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #2 GLORIOUS JOURNEY (Adj Place% 80.3%) ← locked in every combo
腳 (Legs):  #6, #11, #7, #10, #1
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville approximation from Adj Win%, renormalised):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #2, #6, #11 | 9.7% | $10.3 |
| 2 | #2, #6, #7 | 8.3% | $12.1 |
| 3 | #2, #6, #10 | 7.0% | $14.2 |
| 4 | #2, #6, #1 | 6.3% | $16.0 |
| 5 | #2, #7, #11 | 3.6% | $27.8 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: banker #2, legs 6, 11, 7, 10, 1 → C(5,2))
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

ALL COMBINATIONS (est. prob):
  2-6-11 9.7% | 2-6-7 8.3%  | 2-6-10 7.0% | 2-6-1 6.3%  | 2-7-11 3.6%
  2-11-10 3.1% | 2-11-1 2.7% | 2-7-10 2.6% | 2-7-1 2.3% | 2-1-10 2.0%
  Ticket coverage (sum): ~47.5%
  Banker #2 top 3 (MC Place%): 80.3%

PASS CONDITIONS:
- If #2 GLORIOUS JOURNEY (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes from Good (rain on a night meeting) → reconsider; MC was run on Good
- If #2 firms sharply (<3.0) the Trio dividend shortens; the ticket still stands, but the value is thinner

CONFIDENCE: MEDIUM-HIGH (dominant MC banker who is also the market favourite and fastest on projection; but after #6 the legs are closely bunched at 26–33% Adj Place%, and the second place in the frame is open)
```

---

## STRATEGY B (MC-only)

```
Banker: #2 GLORIOUS JOURNEY (MC Win% 46.5%, MC Place% 80.3%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6 (58.8%), #7 (33.2%), #11 (27.0%), #1 (26.6%), #10 (24.5%), #4 (21.2%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #10 I AM BACK (MC Place% 24.5%, Win odds 12), #4 RAGGA BOMB (MC Place% 21.2%, Win odds 15)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #3 VIVA GRACIOUSNESS (Win odds 7.5, MC Place% 6.1%)
Action: #3 replaced #4 (lowest MC Place% among replaceable legs; 1-for-1 swap)
Final legs: #6, #7, #11, #1, #10, #3
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #2 / 腳 #6, #7, #11, #1, #10, #3
  2-6-7 14.3%  | 2-6-11 10.8% | 2-6-1 10.8% | 2-6-10 8.4%  | 2-7-11 3.4%
  2-7-1 3.4%   | 2-7-10 2.6%  | 2-11-1 2.6% | 2-11-10 2.0% | 2-1-10 2.0%
  2-6-3 1.7%   | 2-7-3 0.5%   | 2-11-3 0.4% | 2-1-3 0.4%   | 2-10-3 0.3%
  Ticket coverage (sum, raw MC Harville): ~63.5%
```

Comparison: Both strategies use the same banker (#2) and the same five legs (#6, #7, #11, #1, #10). Strategy B adds #3 VIVA GRACIOUSNESS, the market's 5th choice at 7.5, which MC rates at only 6.1% place. That raises the cost from $100 to $150 for about 3.3% more coverage on raw MC. The coverage figures for A and B are not directly comparable, because A uses SCMP-adjusted, renormalised Win%. The extra 5 combos pay off only if the market is right about #3.

---

## CAVEATS

- **Morning odds (11:00 HKT), not final.** Strategy B's Win-odds tests are close to the line in places: #3 at 7.5 is a candidate, and the replaceable legs are #10 at 12 and #4 at 15. If #5 WELL ENOUGH (11 HKJC; SCMP shows 12/10) shortens below 10, it becomes a 2nd candidate and would replace #10. If #10 or #4 shortens below 10, the swap changes. Recheck near jump time.
- **SCMP odds columns unlabelled.** The three figures per horse could not be mapped exactly to Win and Place, and the QP/Q matrix could not be mapped to pairings, so the QP cross-check was skipped.
- **Judgement calls on SCMP flags.** #6 "eased near the 100M" was treated as not ridden out (−2). Without it, #6 is 20.4% / 58.8%, which does not change the pool or the banker. #11's rider calling it "disappointing" was not treated as a stewards' unacceptable-performance finding. Win-only factors were applied equally to Place%.
- **Pool-rule ambiguity.** The ≥25% must-include rule was used (pool of 6). Important Reminder 8 says Adj Place% ≥ 20%, which would also force in #4 RAGGA BOMB (21.2%; 2nd on the finish-time projection, 9 runs at the trip). That gives 1膽 + 6腳 = 15 combos / $150.
- **Trip/distance uncertainty.** #6, #11, #10 and #5 have never run 1650m. #10 is "bred below for this trip".
- **Model vs market:** MC is much more confident than the market on #2 (46.5% vs ~23% implied). #1 (2nd favourite, 5.1) is only 5th on MC.
- **Scratching:** #9 INNO SUPER withdrawn; field is 10.
- `careerStarts` is unpopulated in the scraped racecard, so banker eligibility used the form lines.
- Trio combination probabilities are a Harville approximation from Win%, not direct MC trio counts.
- Per instructions, `sync-historical.ts` and `fetch-odds.ts` were not re-run (data already fetched). The R10/R11 entries in the odds file are phantom copies of R1 and were ignored.

```
═══════════════════════════════════════════════════════════
```
