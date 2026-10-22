# Trio (單T) Strategy — Happy Valley | 2026-10-21 | Race 4

> Pre-race run (generated 2026-10-21, race day; night meeting, R4 off 8:10pm HKT)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-21 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --kelly 0.35, --min-edge 5)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork parsed; Win/Place odds parsed (columns unlabelled); QP/Q matrix not available
ODDS SOURCE: HKJC early pool (fetch-odds.ts, data/odds/odds_20261021_HV.json, captured 11:01 HKT 21-Oct)
             SCMP odds: ✅ loaded (cross-check only) | HKJC live: ✅ loaded (morning snapshot, not final)

RACE: R4 — Class 4 | 1200m | Turf ("B" course) | Good | 12 runners (SWIFTY HANDICAP, Sec 1)
CLASSIFICATION: Competitive (top Adj Win% 28.8%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos (2nd-ranked #3 Adj Place% 55.8% < 63%, so no 雙膽拖)
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Happy Valley 2026-10-21 (night) | Going: Good | Surface: Turf ("B" course)
Target Race(s): R4 (Class 4 | 1200m | 12 runners)
Scratchings: none (SCMP lists reserves #R MR DESIRA and #R PRIVATE WEALTH; neither is in the HKJC field)
Odds coverage: 12/12 horses with win odds (HKJC); place odds estimated by analyzer from win odds
SCMP data: ✅ loaded (QP/Q matrix ❌ not available)
```

- ≥3 starters ✅ | Odds populated for all 12 ✅ | Jockey (12) and trainer (12) profiles loaded ✅ | 12/12 horses enriched with form.
- The odds file also has R10/R11 entries that duplicate R1. The meeting has 9 races, so those were ignored.
- **Sparse form:** #5 HARVEST MOON (1 run: debut 8th over 1000m at Sha Tin, 0 runs at 1200m) and #6 VIGOR FLY (1 run). The MC flagged both as sparse (<3 form). #9 (4 runs, 1 at the trip), #10 (4 runs) and #4 VIRTUS GLORY (5 runs) also have short records.
- **Happy Valley debuts:** #6 VIGOR FLY, #9 SHOW ME YOUR LOVE and #10 HIGH RISE VICTORY have never raced at Happy Valley (per SCMP).
- **Long layoffs:** #2 MASTER RESOLUTE (last run 11-Feb-2026, ~8 months; tendon injury) and #7 MASTER PHOENIX (last run 21-Jun-2026, ~4 months; head injury). #6 VIGOR FLY last ran 07-Jun-2026.
- `careerStarts` is 0 for every horse in the scraped racecard (field not populated), so banker eligibility uses the form lines. #4 has 5 recorded runs, so it is eligible.

---

## MC SIMULATION (raw)

Form = last 6 finishes, most recent first.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 4 | VIRTUS GLORY | 28.8% | 62.3% | 3.1 | ✅ | ✅ | 2-2-2-4-9 | ★ 膽 (Banker) | 3-4: 15.0% (6.7) |
| 3 | MATZDEN | 23.4% | 55.8% | 7.5 | ✅ | ✅ | 10-2-4-5-2-4 | 腳 (Leg) | 3-4: 15.0% (6.7) |
| 1 | LUCKY MCQUEEN | 11.3% | 36.8% | 11 | ✅ | ❌ | 4-2-1-9-5-4 | 腳 (Leg) | 1-4: 7.6% (13.1) |
| 5 | HARVEST MOON | 9.0% | 30.0% | 19 | ✅ | ❌ | 8 | 腳 (Leg) | 4-5: 6.2% (16.0) |
| 7 | MASTER PHOENIX | 6.1% | 24.2% | 13 | ✅ | ❌ | 3-4-10-8-4-9 | — (replaced by #12) | — |
| 10 | HIGH RISE VICTORY | 5.6% | 21.3% | 12 | ✅ | ❌ | 7-9-13-12 | — (replaced by #11) | — |
| 11 | LIGHTNESS OF BEING | 4.5% | 18.6% | 7.3 | ❌ | ✅ | 3-7-9-7-12-12 | 腳 (Leg) (replacement for #10) | — |
| 2 | MASTER RESOLUTE | 4.4% | 19.0% | 11 | ❌ | ❌ | 1-2-11-12-10 | — | — |
| 9 | SHOW ME YOUR LOVE | 2.3% | 10.6% | 35 | ❌ | ❌ | 11-4-9-6 | — | — |
| 12 | FREE PONY | 2.1% | 9.4% | 7.8 | ❌ | ✅ | 7-6-10-8-9-8 | 腳 (Leg) (replacement for #7) | — |
| 6 | VIGOR FLY | 1.8% | 8.1% | 43 | ❌ | ❌ | 9 | — | — |
| 8 | FLYING TING LOK | 0.8% | 3.9% | 19 | ❌ | ❌ | 14-10-12-5-12-14 | — | — |

Other top quinellas: 1-3 5.8% (17.2), 3-5 4.8% (21.0).

Market: Overround 23.7%. #4 VIRTUS GLORY is the morning favourite at 3.1 (~32% implied), and MC rates it about fair (28.8%). The biggest disagreement is #3 MATZDEN: 3rd in the market at 7.5, but 2nd on MC at 23.4% (flagged undervalued by 78%). The market's 2nd and 4th choices, #11 LIGHTNESS OF BEING (7.3) and #12 FREE PONY (7.8), are only 7th and 10th on MC. The analyzer flags #12 (overvalued by 84%) and #8 (by 85%). The analyzer's own bets were Place #3 @2.98 and Place #4 @1.95 (HK$50 each on a HK$1,000 bankroll).

The finish-time projection disagrees on the banker. It has #3 MATZDEN fastest (1:09.58), then #1 (+0.70s) and #5 (+0.84s). It ranks #4 VIRTUS GLORY only 8th (+1.68s), because #4's speed figures come mostly from Sha Tin.

---

## SCMP DATA (Race 4)

Tipster picks ignored. SCMP shows three unlabelled odds figures per horse. The HKJC morning snapshot is the primary odds source. The SCMP figures only matter for Strategy B where noted in the caveats.

| # | Horse | SCMP odds (as shown) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|----------------------|------------------|----------|----------|-----------|---------------|
| 1 | LUCKY MCQUEEN | 10 / 11 / 2.5 | Valley 1200m winner from midfield; closed late; "another wide draw" (gate 12) | slight contact near 150m; rider allowed a conservative ride from the wide gate (not a listed flag) | — | — | Midfield / closer |
| 2 | MASTER RESOLUTE | 12 / 10 / 4.0 | February winner, then off with a tendon and bone injury; even 6th in a Conghua trial | bumped shortly after start (1 run) | left fore tendon injury 16-Feb; **passed 28-Sep (23 days ago) → -injury30d** | "lightning fast in his morning work of late" → +trial | — |
| 3 | MATZDEN | 7.9 / 7.4 / 2.4 | placed in most local runs, including last four C4 starts; 10th at the Valley last start | bumped on jumping (1 run); faded under pressure, trainer had no explanation, post-race vet clear | "disappointing performance" 23-Sep, passed 12-Oct (not an injury; no stewards' "unacceptable" finding) | — | On-pace (under pressure from 500m) |
| 4 | VIRTUS GLORY | 3.6 / 3.6 / 1.4 | 4th at the Valley over 1200m in May; recent seconds at Sha Tin; "must overcome gate 11" | clear | clear | — | — |
| 5 | HARVEST MOON | 19 / 19 / 5.9 | debut 8th over 1000m after an awkward jump; bred for the trip | jumped awkwardly (1 run) | clear | — | — |
| 6 | VIGOR FLY | 35 / 39 / 10 | back of the field on debut (wet track); Valley debut; 1 of 3 trials positive | shifted in, bumped at start; unbalanced near 550m | kicked at the barriers, withdrawn from a trial 05-Oct; **passed 12-Oct (9 days ago) → -injury30d** | — | Back marker |
| 7 | MASTER PHOENIX | 10 / 11 / 4.3 | four Sha Tin 1200m placings last season; one-paced at the Valley; "the gate won't help" | clear | head injury 07-Jul; **passed 24-Sep (27 days ago) → -injury30d** | — | — |
| 8 | FLYING TING LOK | 16 / 16 / 5.1 | bled after a dirt defeat; non-factor for new trainer | clear | clear | — | — |
| 9 | SHOW ME YOUR LOVE | 28 / 31 / 6.1 | OK in two of three Griffin runs; 11th last start from behind midfield; Valley debut | eased and shifted in near 100m for clear running → +excuses | clear | — | Behind midfield |
| 10 | HIGH RISE VICTORY | 11 / 12 / 3.5 | never involved in three Sha Tin runs; 7th over 1200m last time; Valley debut | shifted across behind runners early from a wide gate | clear | — | — |
| 11 | LIGHTNESS OF BEING | 7.2 / 6.8 / 2.8 | struggled in C4 last term; 3rd at $24 from behind midfield last start | shifted in after start; lay in during the straight | clear | — | Behind midfield |
| 12 | FREE PONY | 6.9 / 7.3 / 2.6 | Valley 1200m winner in December off 51; 7th last time "having covered too much ground" | bumped at start, raced wide without cover → +excuses; kicked a rail in the parade ring (passed vet) | passed fit to race | — | Wide / handy |

QP/Q matrix: not available from the SCMP fetch, so the QP cross-check (Step 1e-vi) was not possible.

---

## STRATEGY A

### HORSE RANKINGS

-injury30d is applied as −3 Win / −4 Place, per the skill table. The other factors are defined on Win% only. As in the R1 report, they are applied equally to Place%. Caps of ±8 Win and ±10 Place were not reached. #6's Adj Win% is floored at 0.5%.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 4 | VIRTUS GLORY | 28.8% | 62.3% | 0 | 0 | 28.8% | 62.3% | 3.1 | H Y Yuen (-7) | — | — | ★ 膽 (Banker) |
| 3 | MATZDEN | 23.4% | 55.8% | 0 | 0 | 23.4% | 55.8% | 7.5 | J Orman | Front | — | 腳 (Leg) |
| 1 | LUCKY MCQUEEN | 11.3% | 36.8% | 0 | 0 | 11.3% | 36.8% | 11 | M F Poon | Mid/Close | — | 腳 (Leg) |
| 5 | HARVEST MOON | 9.0% | 30.0% | 0 | 0 | 9.0% | 30.0% | 19 | A Atzeni | — | — | 腳 (Leg) |
| 10 | HIGH RISE VICTORY | 5.6% | 21.3% | 0 | 0 | 5.6% | 21.3% | 12 | K C Leung | — | — | 腳 (Leg) |
| 11 | LIGHTNESS OF BEING | 4.5% | 18.6% | 0 | 0 | 4.5% | 18.6% | 7.3 | Y L Chung (-2) | Close | — | — |
| 9 | SHOW ME YOUR LOVE | 2.3% | 10.6% | excuses +2 | excuses +2 | 4.3% | 12.6% | 35 | L Hewitson | Close | +excuses | — |
| 12 | FREE PONY | 2.1% | 9.4% | excuses +2 | excuses +2 | 4.1% | 11.4% | 7.8 | M L Yeung | Wide/handy | +excuses | — |
| 2 | MASTER RESOLUTE | 4.4% | 19.0% | -injury30d −3, trial +2 | -injury30d −4, trial +2 | 3.4% | 17.0% | 11 | R Kingscote | — | -injury30d, +trial | — |
| 7 | MASTER PHOENIX | 6.1% | 24.2% | -injury30d −3 | -injury30d −4 | 3.1% | 20.2% | 13 | L Ferraris | — | -injury30d | 腳 (Leg) |
| 8 | FLYING TING LOK | 0.8% | 3.9% | 0 | 0 | 0.8% | 3.9% | 19 | P N Wong (-7) | — | — | — |
| 6 | VIGOR FLY | 1.8% | 8.1% | -injury30d −3 (floored) | -injury30d −4 | 0.5% | 4.1% | 43 | H Bentley | Back | -injury30d | — |

Note: ★ 膽 = Banker (1st by Adj Win%; #4 has 5 form lines, so it is eligible). #3 has Adj Place% 55.8%, below the 63% needed for 雙膽拖.

**Reasoning:** #4 VIRTUS GLORY's Adj Win% of 28.8% puts the race in the Competitive band (20–35%), so it uses Mode B: the top 3 by Adj Win% (#4, #3, #1) plus the next 3 by Adj Place% (#5 30.0%, #10 21.3%, #7 20.2%). All four horses at or above the 25% must-include line (#4, #3, #1, #5) are in the pool. The next by Adj Place% is #11 at 18.6%.

- **#4 VIRTUS GLORY** has finished 2-2-2 in its last three (all Sha Tin 1200m) and is the market favourite. H Y Yuen has the season's best strike rate in this field (15%) and claims 7 lb. The risk is gate 11. The finish-time projection ranks it only 8th, and its one Valley 1200m run was a 4th.
- **#3 MATZDEN** has 8 runs at the trip and 4 placings in its last 6. It is fastest on the projection. MC rates it far above the market (undervalued by 78%). It was a flat 10th last start (vet: disappointing performance, now cleared).
- **#1 LUCKY MCQUEEN** is a Valley 1200m course winner (May), with 4-2 in its two runs this term. Gate 12 is its main negative. It is 2nd on the projection.
- **#5 HARVEST MOON** has the lowest-draw profile of the contenders (gate 2) and Atzeni. MC's 30% rests on a single 1000m debut, and the market (19) is sceptical.
- **#10 HIGH RISE VICTORY** gets gate 1, K C Leung (12%) and only 119 lb. It has not yet been involved in a race and makes its Valley debut.
- **#7 MASTER PHOENIX** has 4 Sha Tin 1200m placings last term. It is fresh off a head injury (cleared 24-Sep) and has gate 10 and blinkers on. It makes the pool by only 1.6 points over #11.

**Excluded:** #11 LIGHTNESS OF BEING (7.3, the market's 2nd choice) and #12 FREE PONY (7.8) are short in the market. They have no negative SCMP flags (#12 even has +excuses) and are out on MC alone (Adj Place% 18.6% and 11.4%), so Rule 9 does not apply. #2 MASTER RESOLUTE (11) carries -injury30d. Without the flag it would be 6.4% / 21.0%, still behind #7 (24.2% unflagged) and #10 (21.3%), so the flag did not cause its exclusion. #7 also carries a negative flag at 13 odds and is kept in the pool.

**Pace:** This is Happy Valley 1200m with a front-runner bias. #3 races on-pace from gate 5, and #10 (gate 1) and #5 (gate 2) can hold handy positions. The pool's two highest-ranked horses after #3, #4 (gate 11) and #1 (gate 12), both need luck from wide gates. #7 is also wide (gate 10).

### TRIO POOL (any order)

```
POOL: #4, #3, #1, #5, #10, #7
MODE: B (Standard Pool) | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #4 VIRTUS GLORY (Adj Place% 62.3%) ← locked in every combo
腳 (Legs):  #3, #1, #5, #10, #7
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville approximation from Adj Win%, renormalised):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #4, #3, #1 | 10.9% | $9.2 |
| 2 | #4, #3, #5 | 8.4% | $11.8 |
| 3 | #4, #3, #10 | 5.1% | $19.8 |
| 4 | #4, #1, #5 | 3.4% | $29.5 |
| 5 | #4, #3, #7 | 2.7% | $36.7 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: banker #4, legs 3, 1, 5, 10, 7 → C(5,2))
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

ALL COMBINATIONS (est. prob):
  4-3-1 10.9% | 4-3-5 8.4%  | 4-3-10 5.1% | 4-1-5 3.4%  | 4-3-7 2.7%
  4-1-10 2.0% | 4-5-10 1.6% | 4-1-7 1.1%  | 4-5-7 0.8%  | 4-10-7 0.5%
  Ticket coverage (sum): ~36.5%
  Banker #4 top 3 (MC Place%): 62.3%

20%-variant check: no horse sits at 20–25% Adj Place% outside the pool. #10 (21.3%)
and #7 (20.2%) are already legs, so the Reminder-8 variant gives the same ticket.

PASS CONDITIONS:
- If #4 VIRTUS GLORY (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes from Good (rain on a night meeting) → reconsider; MC was run on Good
- If #4 shortens further (<2.5), the Trio dividend on 4-3-x becomes thin. The ticket stands, but #3 is where the value is.

CONFIDENCE: MEDIUM-LOW (Competitive race with a wide-drawn banker whose Valley record is one 4th, and the finish-time projection ranks it 8th; MC and market do agree on #4 as 1st. #3 is the strongest leg by both MC and projection. Legs #5, #10 and #7 are thin-form or returning from injury.)
```

---

## STRATEGY B (MC-only)

```
Banker: #4 VIRTUS GLORY (MC Win% 28.8%, MC Place% 62.3%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3 (55.8%), #1 (36.8%), #5 (30.0%), #7 (24.2%), #10 (21.3%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #5 HARVEST MOON (30.0%, 19), #7 MASTER PHOENIX (24.2%, 13), #10 HIGH RISE VICTORY (21.3%, 12)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #11 LIGHTNESS OF BEING (Win odds 7.3, MC Place% 18.6%), #12 FREE PONY (Win odds 7.8, MC Place% 9.4%)
Action: #11 (7.3) replaced #10 (lowest MC Place% replaceable leg, 21.3%); then #12 (7.8) replaced #7 (next lowest, 24.2%)
Final legs: #3, #1, #5, #11, #12
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #4 / 腳 #3, #1, #5, #11, #12
  4-3-1 10.3%  | 4-3-5 8.0%  | 4-3-11 3.8% | 4-1-5 3.2%  | 4-3-12 1.7%
  4-1-11 1.5%  | 4-5-11 1.2% | 4-1-12 0.7% | 4-5-12 0.5% | 4-11-12 0.3%
  Ticket coverage (sum, raw MC Harville): ~31.3%
```

Comparison: Both strategies use the same banker (#4), the same core legs (#3, #1, #5) and the same cost ($100, 10 combos). Strategy A fills the last two spots on model rank (#10, #7). Strategy B swaps them for the market's 2nd and 4th choices, #11 (7.3) and #12 (7.8), which MC rates at only 18.6% and 9.4% place. On MC alone, A covers more (~36.5% vs ~31.3%; the two use different Win% bases, so this is only roughly comparable). B pays off only if the market is right about #11 or #12.

---

## CAVEATS

- **Morning odds (11:01 HKT), not final.** Strategy B's swaps depend on #11 (7.3) and #12 (7.8) staying under 10, and on #7 (13) and #10 (12) staying above 10. SCMP shows #7 at 10/11 and #10 at 11/12. If either shortens below 10, it stops being replaceable and the candidate is added instead, making 6 legs = 15 combos / $150. #1 (11; SCMP 10/11) is already a primary leg either way. Recheck near jump time.
- **Banker risk.** #4's case rests on Sha Tin form plus a 7 lb claim. It has gate 11, one Valley 1200m run (4th), and is 8th on the finish-time projection. If #4 misses the top 3, both tickets lose. MC Place% is 62.3%.
- **SCMP odds columns unlabelled**, and no QP/Q matrix was retrieved, so the QP cross-check was skipped.
- **Judgement calls on SCMP flags.** The three -injury30d calls count days from the vet "passed" date to race day: #2 23 days, #7 27 days, #6 9 days. #6's flag is a kick at the barriers rather than a soundness injury. #2's "lightning fast in morning work" was treated as +trial. #9 "eased… for clear running" and #12 "raced wide without cover" were treated as +excuses. #3's "disappointing performance" vet note was not treated as a stewards' unacceptable-performance finding. Without #7's injury flag, #7 would be 24.2% Adj Place% (still a leg), so the pool does not change.
- **SCMP text vs racecard.** The SCMP summary says #1 won its last start, but the HKJC form line shows 4th on 07-Oct (with the win in May). The summary is paraphrased, so the racecard form was used.
- **Thin-form legs:** #5 (1 career run, never at 1200m) and #10 (never involved in 4 runs, Valley debut) are legs on MC numbers that rest on little data.
- **Threshold:** Strategy A used the rule-table Adj Place% ≥ 25% must-include line. The Reminder-8 20% variant does not change this ticket (see above).
- `careerStarts` is unpopulated in the scraped racecard, so banker eligibility used the form lines.
- Trio combination probabilities are a Harville approximation from Win%, not direct MC trio counts.
- Per instructions, `sync-historical.ts` and `fetch-odds.ts` were not re-run (data already fetched). The R10/R11 entries in the odds file are phantom copies of R1 and were ignored.

```
═══════════════════════════════════════════════════════════
```
