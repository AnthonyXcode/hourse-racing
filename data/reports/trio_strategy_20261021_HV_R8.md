# Trio (單T) Strategy — Happy Valley | 2026-10-21 | Race 8

> Pre-race run (generated 2026-10-21, race day; night meeting, R8 off 10:15pm HKT)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-21 | Race 8
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --kelly 0.35, --min-edge 5)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork parsed; Win/Place odds parsed (columns unlabelled); QP/Q matrix not mappable
ODDS SOURCE: HKJC early pool (fetch-odds.ts, data/odds/odds_20261021_HV.json, captured 11:01 HKT 21-Oct)
             SCMP odds: ✅ loaded (cross-check only) | HKJC live: ✅ loaded (morning snapshot, not final)

RACE: R8 — Class 3 | 1200m | Turf ("B" course) | Good | 12 runners (FLYING HANDICAP, rating 80-60)
CLASSIFICATION: Competitive (top Adj Win% 21.5%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos (2nd-ranked #12 Adj Place% 51.1% < 63%, so no 雙膽拖)
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Happy Valley 2026-10-21 (night) | Going: Good | Surface: Turf ("B" course)
Target Race(s): R8 (Class 3 | 1200m | 12 runners)
Scratchings: none (SCMP lists reserves #R METRO POWER and #R DANICA'S CHOICE; neither is in the field)
Odds coverage: 12/12 horses with win odds (HKJC); place odds estimated by analyzer from win odds
SCMP data: ✅ loaded (QP/Q matrix ⚠️ not usable)
```

- ≥3 starters ✅ | Odds populated for all 12 ✅ | Jockey (12) and trainer (12) profiles loaded ✅ | 11/12 horses enriched with form.
- The odds file also has R10/R11 entries that duplicate R1. The meeting has 9 races, so those were ignored.
- **Sparse form (4 horses):** #7 LUCKY RIVER has no local race form (0 runs in the database; SCMP says "looks forward enough for local debut" — Australian import with 7 starts there). #9 SMART OINK (1 local run), #10 DUKE ATREIDES (1 local run), #6 ROYAL BLITZ (2 local runs). The MC rates these from very little data.
- **Trip experience at 1200m (MC "trip" count):** #2 9, #3 9, #4 9, #11 9, #12 8, #8 8, #5 7, #1 6, #6 1. #7, #9 and #10 have 0.
- `careerStarts` is 0 for every horse in the scraped racecard (field not populated), so banker eligibility uses the form lines. #2 (10 runs) and #12 (9 runs) are both eligible.

---

## MC SIMULATION (raw)

Form = last 6 finishes, most recent first.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 12 | LEADING AGILITY | 20.0% | 50.1% | 8.0 | ✅ | ✅ | 2-1-3-1-4-4 | ★ 膽 (Banker) | 2-12: 8.7% (11.5) |
| 2 | PERFECT GENERAL | 19.5% | 49.5% | 12 | ✅ | ❌ | 12-4-1-9-3-1 | 腳 (Leg) | 2-12: 8.7% (11.5) |
| 1 | PERFECTDAY | 19.4% | 48.2% | 10 | ✅ | ❌ | 1-8-1-4-7-5 | 腳 (Leg) | 1-2: 8.6% (11.6) |
| 8 | PEGAS | 11.0% | 33.7% | 4.8 | ✅ | ✅ | 4-2-7-8-6-4 | 腳 (Leg) | 2-8: 4.9% (20.5) |
| 6 | ROYAL BLITZ | 8.0% | 28.8% | 15 | ✅ | ❌ | 5-6 | — (replaced by #9) | — |
| 3 | KYRUS DRAGON | 7.2% | 25.7% | 27 | ✅ | ❌ | 9-8-10-3-1-8 | — (replaced by #7) | — |
| 5 | GREATER BAE | 5.3% | 19.5% | 7.5 | ❌ | ✅ | 5-7-8-2-5-1 | 腳 (Leg) (added directly) | — |
| 4 | JUBILANT WINNER | 3.7% | 16.5% | 18 | ❌ | ❌ | 11-5-9-5-10-1 | — | — |
| 9 | SMART OINK | 4.0% | 15.2% | 6.9 | ❌ | ✅ | 13 | 腳 (Leg) (replacement for #6) | — |
| 7 | LUCKY RIVER | 0.9% | 6.3% | 5.0 | ❌ | ✅ | (local debut) | 腳 (Leg) (replacement for #3) | — |
| 11 | KING MILES | 0.7% | 4.0% | 35 | ❌ | ❌ | 10-9-13-8-10-12 | — | — |
| 10 | DUKE ATREIDES | 0.4% | 2.4% | 20 | ❌ | ❌ | 10 | — | — |

Market: Overround 22.9%. The MC splits the top three almost evenly: #12 LEADING AGILITY 20.0%, #2 PERFECT GENERAL 19.5% and #1 PERFECTDAY 19.4%. The market prefers #8 PEGAS (4.8 fav), #7 LUCKY RIVER (5.0) and #9 SMART OINK (6.9). MC rates #7 at 0.9% (overvalued by 95%; no local form) and #9 at 4.0% (one local run). The analyzer flags #2 (undervalued by 134%) and #1 (undervalued by 94%). Its own bets were Place #2 @3.37 and Place #1 @3.22 (HK$50 each on a HK$1,000 bankroll).

The finish-time projection has #3 KYRUS DRAGON and #5 GREATER BAE joint fastest (1:09.79), then #2 (+0.42s), #4, #1, #6, #12, with #8 PEGAS 8th (+1.54s). #7 has no form and was excluded from the projection.

---

## SCMP DATA (Race 8)

Tipster picks ignored. SCMP shows three unlabelled odds figures per horse. The HKJC morning snapshot is the primary odds source.

| # | Horse | Draw / Wt | SCMP odds (as shown) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|-----------|----------------------|------------------|----------|----------|-----------|---------------|
| 1 | PERFECTDAY | 7 / 135 | 11 / 11 / 3.5 | C4 winner and C3 2nd at Valley 1200m last term; "dashing nicely to win two of four" at 1400m (no trigger word) | shifted out on jumping and bumped (1 run, not repeated) | clear | — | Midfield / closer |
| 2 | PERFECT GENERAL | 4 / 131 | 11 / 12 / 4.5 | "easily made all" in April (not recent); "resumed a non-factor ridden for luck from gate 12" | raced wide, without cover for most of the race → +excuses | clear | — | On-pace (made all) |
| 3 | KYRUS DRAGON | 12 / 128 | 21 / 27 / 8.2 | won first-up over Valley 1200m last term; knee surgery in March (>30 days); resumed 9th over straight 1000m | — | clear (7yo, below the 8+ flag) | — | Back marker |
| 4 | JUBILANT WINNER | 2 / 127 | 19 / 20 / 4.0 | Valley winner in April; recent 5th at Sha Tin and a disappointing Valley run | shifted out at start, jumped awkwardly, settled further back (not a listed flag) | clear | — | Midfield |
| 5 | GREATER BAE | 3 / 126 | 6.8 / 7.5 / 3.1 | Valley 1200m winner from behind midfield; "rallied to fill the frame in both trials" (trials, not races) | bumped after start and held up on the home turn → +excuses | clear | — | Closer |
| 6 | ROYAL BLITZ | 8 / 124 | 11 / 15 / 4.8 | 6th on Valley 1000m debut, speed-tracking 5th at Sha Tin 1200m; "chased the speed for third" in a Valley trial (no trigger word) | — | clear | — | Stalker |
| 7 | LUCKY RIVER | 5 / 123 | 5.2 / 4.7 / 2.7 | Australian import (3 wins); "sat near the front to win his latest over the Valley 1,000m from two trials" | — | clear | "ran on smartly when let go in his latest trial … looks forward enough for local debut" → +trial | On-pace |
| 8 | PEGAS | 1 / 123 | 4.4 / 5.7 / 1.9 | box-seat 2nd at Valley 1000m; "resumed a hard-charging fourth" from gate 11 (no listed trigger word) | ridden conservatively from wide gate on instructions (not a listed flag) | clear | — | Stalker |
| 9 | SMART OINK | 6 / 122 | 17 / 5.8 / 1.3 | "never involved" from gate 12 on local debut; new course and distance | jumped awkwardly, heavy contact (not a listed flag) | post-race vet: no significant findings | — | Unknown |
| 10 | DUKE ATREIDES | 10 / 119 | 14 / 18 / 6.0 | "never involved" on local debut; made all in a Conghua trial (trial, not a race) | steadied near 800m → +excuses | clear | — | Unknown |
| 11 | KING MILES | 11 / 117 | 26 / 35 / 9.2 | two early Valley 1200m wins, then eight disappointing runs | — | clear | — | — |
| 12 | LEADING AGILITY | 9 / 117 | 7.8 / 8.2 / 2.9 | "making all at $1.7" two runs ago → +form; resumed a one-out, one-back 2nd in a higher grade | — | clear | — | On-pace / stalker |

QP/Q matrix: SCMP returned a 1–15 grid whose text could not be mapped to pairings, so the QP cross-check (Step 1e-vi) was not possible.

---

## STRATEGY A

### HORSE RANKINGS

The skill defines most SCMP factors on Win% only. Following the template ("same"), each factor is applied equally to Place%. Caps of ±8 Win and ±10 Place were not reached.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 2 | PERFECT GENERAL | 19.5% | 49.5% | excuses +2 | excuses +2 | 21.5% | 51.5% | 12 | C Y Ho | Front | +excuses | ★ 膽 (Banker) |
| 12 | LEADING AGILITY | 20.0% | 50.1% | +form +1 | +form +1 | 21.0% | 51.1% | 8.0 | E C W Wong (-3) | Front/Stalk | +form | 腳 (Leg) |
| 1 | PERFECTDAY | 19.4% | 48.2% | 0 | 0 | 19.4% | 48.2% | 10 | K C Leung | Mid/Close | — | 腳 (Leg) |
| 8 | PEGAS | 11.0% | 33.7% | 0 | 0 | 11.0% | 33.7% | 4.8 | C L Chau (-2) | Stalk | — | 腳 (Leg) |
| 6 | ROYAL BLITZ | 8.0% | 28.8% | 0 | 0 | 8.0% | 28.8% | 15 | Z Purton | Stalk | — | 腳 (Leg) |
| 5 | GREATER BAE | 5.3% | 19.5% | excuses +2 | excuses +2 | 7.3% | 21.5% | 7.5 | L Ferraris | Close | +excuses | — (20%-variant leg) |
| 3 | KYRUS DRAGON | 7.2% | 25.7% | 0 | 0 | 7.2% | 25.7% | 27 | J Orman | Close | — | 腳 (Leg) |
| 9 | SMART OINK | 4.0% | 15.2% | 0 | 0 | 4.0% | 15.2% | 6.9 | H Y Yuen (-7) | — | — | — |
| 4 | JUBILANT WINNER | 3.7% | 16.5% | 0 | 0 | 3.7% | 16.5% | 18 | H Bentley | Mid | — | — |
| 7 | LUCKY RIVER | 0.9% | 6.3% | trial +2 | trial +2 | 2.9% | 8.3% | 5.0 | B Avdulla | Front | +trial | — |
| 10 | DUKE ATREIDES | 0.4% | 2.4% | excuses +2 | excuses +2 | 2.4% | 4.4% | 20 | A Badel | — | +excuses | — |
| 11 | KING MILES | 0.7% | 4.0% | 0 | 0 | 0.7% | 4.0% | 35 | M Chadwick | — | — | — |

Note: ★ 膽 = Banker (1st by Adj Win%; #2 has 10 form lines, so it is eligible). #12 has Adj Place% 51.1%, below the 63% needed for 雙膽拖. Rows are in Adj Win% order. #3 is in the pool on Adj Place% (25.7%), ahead of #5 (21.5%).

**Reasoning:** The top Adj Win% is 21.5% (#2), which makes the race Competitive and puts it in Mode B: the top 3 by Adj Win% (#2, #12, #1) plus 3 more by Adj Place% (#8 33.7%, #6 28.8%, #3 25.7%). Those six are also exactly the horses at or above the 25% Adj Place% must-include line, so the rule adds no one.

- **#2 PERFECT GENERAL** has 9 runs at Valley 1200m and won by making all at $2.5 in April. Its last run was a non-factor from gate 12 at Sha Tin, where it raced wide without cover (+2). It now has gate 4. It is 3rd on the finish-time projection and the best-placed of the MC top three.
- **#12 LEADING AGILITY** has the most consistent recent form in the race (2-1-3-1-4-4, all Valley 1200m). It made all two runs ago (+1) and was 2nd up in grade last start. It is on the lowest weight (117 lb with a 3 lb claim) but has a wide gate (9).
- **#1 PERFECTDAY** is the top-rated horse (80) and carries top weight (135 lb). It won two of its last four at 1400m, and it has winning form at Valley 1200m from last season.
- **#8 PEGAS** is the market favourite. It has gate 1 and was a box-seat 2nd at Valley 1000m. It is 4th on MC and 8th on the time projection.
- **#6 ROYAL BLITZ** has Purton and only 2 local runs. Its MC figure rests on very little data.
- **#3 KYRUS DRAGON** is joint fastest on the time projection and won first-up at Valley 1200m last season. It had knee surgery in March and has the widest gate (12).

**Excluded:** #5 GREATER BAE (Adj Place% 21.5%, 7.5 odds) is joint fastest on the time projection and a Valley 1200m winner. It is below the 25% line (see the 20%-variant below). #7 LUCKY RIVER (5.0, 2nd favourite) and #9 SMART OINK (6.9) are market horses that the MC rates low (8.3% and 15.2% Adj Place%) because they have little or no local race form. Rule 9 (no exclusion at ≤15 odds) is about negative flags; neither horse has one, and they are out on MC numbers. This is the largest model-vs-market gap in the race.

**Pace:** On-pace types are #2 (made all in April), #12 (made all two back), #7 (sat near the front in its trial) and #8 (gate 1, box-seat). The closers are #5, #3 and #1. The skill notes a front-runner bias at Happy Valley 1200m, which favours #2 from gate 4. #12 from gate 9 may have to work to get forward.

### TRIO POOL (any order)

```
POOL: #2, #12, #1, #8, #6, #3
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #2 PERFECT GENERAL (Adj Place% 51.5%) ← locked in every combo
腳 (Legs):  #12, #1, #8, #6, #3
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville approximation from Adj Win%, renormalised):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #2, #12, #1 | 8.0% | $12.5 |
| 2 | #2, #12, #8 | 4.1% | $24.3 |
| 3 | #2, #1, #8 | 3.7% | $26.9 |
| 4 | #2, #12, #6 | 2.9% | $34.5 |
| 5 | #2, #1, #6 | 2.6% | $38.2 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: banker #2, legs 12, 1, 8, 6, 3 → C(5,2))
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

ALL COMBINATIONS (est. prob):
  2-12-1 8.0% | 2-12-8 4.1% | 2-1-8 3.7% | 2-12-6 2.9% | 2-1-6 2.6%
  2-12-3 2.6% | 2-1-3 2.3%  | 2-8-6 1.3% | 2-8-3 1.2%  | 2-6-3 0.8%
  Ticket coverage (sum): ~29.7%
  Banker #2 top 3 (Adj Place%): 51.5%

20%-VARIANT (Important Reminder 8, Adj Place% ≥ 20%): adds #5 GREATER BAE (21.5%)
  → 膽 #2 / 腳 #12, #1, #8, #6, #3, #5 = 1膽 + 6腳 = C(6,2) = 15 combos / $150 (coverage ~37.5%)

PASS CONDITIONS:
- If #2 PERFECT GENERAL (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes from Good (rain on a night meeting) → reconsider; MC was run on Good
- The banker choice is a near tie (#2 21.5% vs #12 21.0% vs #1 19.4%). If you want to limit exposure in a three-way-open race, staking only the top combination 2-12-1 or passing is reasonable.

CONFIDENCE: LOW-MEDIUM (competitive Class 3 Valley sprint; the MC's top three are within 0.6% of each other on raw Win%, the banker has only ~51% to place, and the market's top three choices (#8, #7, #9) disagree sharply with the model)
```

---

## STRATEGY B (MC-only)

```
Banker: #12 LEADING AGILITY (MC Win% 20.0%, MC Place% 50.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #2 (49.5%), #1 (48.2%), #8 (33.7%), #6 (28.8%), #3 (25.7%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #6 ROYAL BLITZ (MC Place% 28.8%, Win odds 15), #3 KYRUS DRAGON (MC Place% 25.7%, Win odds 27)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #7 LUCKY RIVER (Win odds 5.0, MC Place% 6.3%)
  #9 SMART OINK (Win odds 6.9, MC Place% 15.2%)
  #5 GREATER BAE (Win odds 7.5, MC Place% 19.5%)
Action: #7 replaced #3 (lowest replaceable); #9 replaced #6 (next lowest replaceable); #5 added directly (no replaceable leg left)
Final legs: #2, #1, #8, #7, #9, #5
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #12 / 腳 #2, #1, #8, #7, #9, #5
  12-2-1 9.3% | 12-2-8 4.7% | 12-1-8 4.7% | 12-2-5 2.1% | 12-1-5 2.1%
  12-2-9 1.6% | 12-1-9 1.6% | 12-8-5 1.1% | 12-8-9 0.8% | 12-9-5 0.4%
  12-2-7 0.3% | 12-1-7 0.3% | 12-8-7 0.2% | 12-7-5 0.1% | 12-7-9 0.1%
  Ticket coverage (sum, raw MC Harville): ~29.2%
```

Comparison: The two strategies use different bankers. Strategy A uses #2, which moves ahead after the +2 excuses factor for its wide trip. Strategy B uses #12, which is MC #1 by 0.5%. B swaps the model's longshots #6 and #3 for the market horses #7 and #9 and adds #5. That costs $150 against A's $100, for about the same raw-MC coverage (~29%). The extra legs pay off only if the market is right about horses the MC barely rates. The coverage figures for A and B are not directly comparable, because A uses SCMP-adjusted, renormalised Win%. The top combination is the same in both: #2, #12, #1.

---

## CAVEATS

- **Banker is a near tie.** The MC Win% figures for #12, #2 and #1 are 20.0%, 19.5% and 19.4%. Strategy A's banker (#2) depends on the +2 excuses factor for "raced wide and without cover" last start. Without it, #12 would be banker in both strategies. Strategy A's +1 for #12 ("making all", two runs back) does not change the order.
- **Morning odds (11:01 HKT), not final.** Strategy B's swaps depend on win odds near the line. #1 is at exactly 10. SCMP shows #6 at 11/15, and #12 at 7.8/8.2. SCMP also shows #9 at 17/5.8, so if #9 drifts past 10 it stops being a candidate and #6 stays as a leg. If #6 shortens below 10, it is no longer replaceable. Recheck near jump time (10:15pm).
- **Sparse/no local form.** #7 LUCKY RIVER has no local race form (MC 0.9%) yet is 2nd favourite at 5.0. #9, #10 and #6 have only 1–2 local runs. The MC is weakest on exactly these horses, and that is where model and market disagree most.
- **SCMP odds columns unlabelled.** The three figures per horse could not be mapped exactly to Win and Place, and the QP/Q matrix could not be mapped to pairings, so the QP cross-check was skipped.
- **Judgement calls on SCMP flags.** #5 "held up on the home turn" was treated as +excuses. #8 "hard-charging fourth" and #1 "dashing nicely" were not given +form because they use none of the listed trigger words. Trial "rallied" (#5) and trial "made all" (#10) were not counted as race form. Win-only factors were applied equally to Place%.
- **Pool-rule ambiguity.** The ≥25% must-include rule was used (pool of 6). Important Reminder 8 says Adj Place% ≥ 20%, which would also force in #5 GREATER BAE (21.5%; joint fastest on the time projection). That gives 1膽 + 6腳 = 15 combos / $150 (see the 20%-variant above).
- **No scratchings** in the 12-runner field. Reserves METRO POWER and DANICA'S CHOICE are not running.
- `careerStarts` is unpopulated in the scraped racecard, so banker eligibility used the form lines.
- Trio combination probabilities are a Harville approximation from Win%, not direct MC trio counts.
- Per instructions, `sync-historical.ts` and `fetch-odds.ts` were not re-run (data already fetched). The R10/R11 entries in the odds file are phantom copies of R1 and were ignored.

```
═══════════════════════════════════════════════════════════
```
