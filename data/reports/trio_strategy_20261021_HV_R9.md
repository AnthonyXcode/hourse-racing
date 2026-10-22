# Trio (單T) Strategy — Happy Valley | 2026-10-21 | Race 9

> Pre-race run (generated 2026-10-21, race day; night meeting, R9 off 10:50pm HKT)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-21 | Race 9
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --kelly 0.35, --min-edge 5)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork parsed; odds figures unlabelled (cross-check only); QP/Q matrix not mappable
ODDS SOURCE: HKJC early pool (fetch-odds.ts, data/odds/odds_20261021_HV.json, captured 11:00 HKT 21-Oct)
             SCMP odds: ✅ loaded (unlabelled, cross-check only) | HKJC live: ✅ loaded by analyze-race.ts (slightly different, see caveats)

RACE: R9 — Class 3 | 1650m | Turf ("B" course) | Good | 12 runners (SONGS OF VICTORY HANDICAP)
CLASSIFICATION: Wide open (top Adj Win% 19.2% < 20%) | POOL SIZE: 7 (shadow)
MODE: D: PASS (default for wide open). Mode C shadow ticket shown for reference / A-B tracking
BET STRUCTURE (A): PASS. Shadow: 膽拖 | 1膽 + 6腳 | C(6,2) = 15
BET STRUCTURE (B): 膽拖 | 1膽 + 7腳 | C(7,2) = 21
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Happy Valley 2026-10-21 (night) | Going: Good | Surface: Turf ("B" course)
Target Race(s): R9 (Class 3 | 1650m | 12 runners)
Scratchings: none (SCMP lists THE BOOM BOX as reserve "R"; not in the HKJC odds/racecard field)
Odds coverage: 12/12 horses with win odds (HKJC); place odds estimated by analyzer from win odds
SCMP data: ✅ loaded (QP/Q matrix ⚠️ not usable)
```

- ≥3 starters ✅ | Odds populated for all 12 ✅ | Jockey (12) and trainer (12) profiles loaded ✅ | 12/12 horses enriched with form.
- The odds file also has R10/R11 entries that duplicate R1. The meeting has 9 races, so those were ignored.
- **Thin form:** #8 PASS LINE has only 3 local runs (9-10-11). All others have 10 form lines.
- **Trip experience at 1650m (MC "trip" count):** #4 8, #11 8, #9 6, #6 6, #7 4, #12 4, #10 2, #2 2, #5 2, #8 1. #1 LUCKY SAM GOR and #3 THE RED HARE have 0 (both Sha Tin 1400–1600m horses).
- `careerStarts` is 0 for every horse in the scraped racecard (field not populated), so banker eligibility uses the form lines. #4 has 10 recorded runs, so it is eligible.
- The analyzer's scraper log printed `distance=1200m` during parsing, but the saved racecard, the analyzer's race header and SCMP all give **1650m**. The MC was run as 1650m.

---

## MC SIMULATION (raw)

Form = last 6 finishes, most recent first. Win Odds = HKJC 11:00 snapshot.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 4 | SOLID WIN | 17.2% | 43.6% | 11 | ✅ | ❌ | 7-5-4-11-4-1 | ★ 膽 (Banker) | 4-10: 5.6% (17.9) |
| 10 | FORZA TORO | 14.3% | 40.8% | 9.9 | ✅ | ✅ | 9-1-5-2-6-3 | 腳 (Leg) | 4-10: 5.6% (17.9) |
| 1 | LUCKY SAM GOR | 13.1% | 36.7% | 12 | ✅ | ❌ | 3-7-2-1-7-5 | 腳 (Leg) | 1-4: 4.7% (21.2) |
| 2 | POPE CODY | 12.8% | 36.9% | 5.6 | ✅ | ✅ | 4-1-2-6-3-9 | 腳 (Leg) | 2-4: 4.9% (20.4) |
| 3 | THE RED HARE | 12.7% | 36.4% | 15 | ✅ | ❌ | 7-6-7-3-1-11 | 腳 (Leg) | 3-4: 4.5% (22.0) |
| 9 | EMBRACES | 12.6% | 36.3% | 5.3 | ✅ | ✅ | 6-6-3-3-6-6 | 腳 (Leg) | 4-9: 4.5% (22.2) |
| 5 | RIDING TOGETHER | 8.6% | 26.9% | 16 | ✅ | ❌ | 6-11-4-4-9-11 | — (replaced by #11) | — |
| 7 | WROTE A NEW PAGE | 2.5% | 11.4% | 33 | ❌ | ❌ | 11-6-11-9-3-6 | — | — |
| 6 | HIGHLAND RAHY | 1.8% | 9.0% | 7.7 | ❌ | ✅ | 4-2-8-5-9-5 | 腳 (Leg) (added directly) | — |
| 12 | WIN METHOD | 1.7% | 9.0% | 10 | ❌ | ❌ (10 is not < 10) | 8-3-1-1-8-11 | — | — |
| 11 | I CAN | 1.5% | 7.6% | 6.3 | ❌ | ✅ | 12-10-10-10-11-13 | 腳 (Leg) (replacement for #5) | — |
| 8 | PASS LINE | 1.0% | 5.3% | 22 | ❌ | ❌ | 9-10-11 | — | — |

Market: Overround 23.5%. MC is very flat at the top: seven horses sit between 8.6% and 17.2% win (avg differentiation 7; 7 horses with diff < 8). The market favourites #9 EMBRACES (5.3) and #2 POPE CODY (5.6) are only 5th–6th on MC. MC's #1 #4 SOLID WIN is 7th in the market at 11 (flagged undervalued by 89%), and #3 THE RED HARE (15) is undervalued by 91%. MC rates the 3rd favourite #11 I CAN (6.3) at only 1.5% win (overvalued by 90%), and #6 HIGHLAND RAHY (7.7, 4th favourite) at 1.8%. The analyzer's own bets were Place #4 @3.31, Place #10 @3.19 and Place #3 @3.54 (HK$100 total on a HK$1,000 bankroll).

The finish-time projection agrees on #4 (1:39.24, fastest), with #1 LUCKY SAM GOR 2nd (+0.28s) and #3 THE RED HARE 3rd (+0.70s). It has #9 EMBRACES and #11 I CAN only joint 10th (+2.52s).

---

## SCMP DATA (Race 9)

Tipster picks ignored. SCMP shows draw plus three unlabelled odds figures per horse. The HKJC morning snapshot is the primary odds source. None of the SCMP figures move a horse across the Win-odds-10 line used by Strategy B in a way that changes the legs (#12 shows 11/14 on SCMP and 10 on HKJC; it stays ❌).

| # | Horse | SCMP odds (as shown) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|----------------------|------------------|----------|----------|-----------|---------------|
| 1 | LUCKY SAM GOR | 10 / 12 / 1.9 | 1600m winner in July; 5 wins from 15 last term; held up last start | held up 350m–200m for lack of clear running → +excuses | — | — | Midfield |
| 2 | POPE CODY | 4.6 / 5.3 / 1.2 | minor cheques 11 of last 13; recent Valley 1650m winner | jumped fairly, held up on the turn, no clear running near 200m → +excuses | — | — | Stalker (gate 1) |
| 3 | THE RED HARE | 13 / 15 / 5.4 | 1400m winner in May; 6 placings to 1600m; first Valley 1650m try | none listed | — | — | Midfield |
| 4 | SOLID WIN | 11 / 12 / 2.7 | two Valley 1650m wins at this level; ran on late for 7th over 1600m | shifted in at start, bumped; laid in near 400m (1 run, not repeated) | — | "very strong" recent morning work, "take seriously" → +trial | Midfield / closer |
| 5 | RIDING TOGETHER | 14 / 15 / 5.0 | made all to win at 1400m in Feb; 6th after a wide trip last time | badly crowded near 600m, unbalanced → +excuses | — | — | Front-runner |
| 6 | HIGHLAND RAHY | 9.8 / 6.8 / 4.7 | two Valley 1650m 2nds on the front; 4th after leading from gate 8 | none listed | — | — | Front-runner |
| 7 | WROTE A NEW PAGE | 22 / 31 / 8.6 | Valley 1650m winner last term; "struggled since switching trainers" | angled behind from wide gate (not a listed flag) | nothing significant | — | Back marker |
| 8 | PASS LINE | 18 / 24 / 7.8 | unplaced in all local runs | jumped fairly, bumped near 550m (1 run) | colic 04/10/2026, passed 12/10/2026 (<30 days) → -injury30d | — | Back marker |
| 9 | EMBRACES | 6.4 / 4.9 / 2.5 | minor cheques 7 of 10 last term; momentum halted near 200m at Valley 1650m last time | bumped at start, badly held up 200m–100m → +excuses | nothing significant | — | Stalker (gate 2) |
| 10 | FORZA TORO | 7.4 / 9.3 / 3.7 | placed 3 of first 5 after downgrade; led all the way to win over Valley 1650m → +form (made all) | none listed | — | — | Front-runner |
| 11 | I CAN | 11 / 7.4 / 4.2 | Valley 1650m winner last November; 8 misfires since; "goes well fresh" | crowded after start, checked 1300m, steadied 900m → +excuses | nothing significant | — | Midfield |
| 12 | WIN METHOD | 11 / 14 / 4.6 | back-to-back wins on the pace; worked too hard from gate 9 last time | rider "no excuse" for disappointing run (not a stewards' unacceptable finding) | nothing significant | won a Conghua trial last month → +trial | On-pace |

QP/Q matrix: SCMP returned no mappable QP/Q grid, so the QP cross-check (Step 1e-vi) was not possible.

---

## STRATEGY A

### HORSE RANKINGS

Following the template convention used in the other reports for this meeting, each Win% factor is applied equally to Place%. Caps of ±8 Win and ±10 Place were not reached. #8's Adj Win% is floored at 0.0%.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role (shadow) |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 4 | SOLID WIN | 17.2% | 43.6% | trial +2 | trial +2 | 19.2% | 45.6% | 11 | J Orman | Mid/Close | +trial | ★ 膽 (Banker) |
| 10 | FORZA TORO | 14.3% | 40.8% | +form +1 | +form +1 | 15.3% | 41.8% | 9.9 | E C W Wong (-3) | Front | +form | 腳 (Leg) |
| 1 | LUCKY SAM GOR | 13.1% | 36.7% | excuses +2 | excuses +2 | 15.1% | 38.7% | 12 | L Ferraris | Mid | +excuses | 腳 (Leg) |
| 2 | POPE CODY | 12.8% | 36.9% | excuses +2 | excuses +2 | 14.8% | 38.9% | 5.6 | A Badel | Stalk | +excuses | 腳 (Leg) |
| 9 | EMBRACES | 12.6% | 36.3% | excuses +2 | excuses +2 | 14.6% | 38.3% | 5.3 | C L Chau (-2) | Stalk | +excuses | 腳 (Leg) |
| 3 | THE RED HARE | 12.7% | 36.4% | 0 | 0 | 12.7% | 36.4% | 15 | K C Leung | Mid | — | 腳 (Leg) |
| 5 | RIDING TOGETHER | 8.6% | 26.9% | excuses +2 | excuses +2 | 10.6% | 28.9% | 16 | H Y Yuen (-7) | Front | +excuses | 腳 (Leg) |
| 12 | WIN METHOD | 1.7% | 9.0% | trial +2 | trial +2 | 3.7% | 11.0% | 10 | M F Poon | On-pace | +trial | — |
| 11 | I CAN | 1.5% | 7.6% | excuses +2 | excuses +2 | 3.5% | 9.6% | 6.3 | C Y Ho | Mid | +excuses | — |
| 7 | WROTE A NEW PAGE | 2.5% | 11.4% | 0 | 0 | 2.5% | 11.4% | 33 | H Bentley | Close | — | — |
| 6 | HIGHLAND RAHY | 1.8% | 9.0% | 0 | 0 | 1.8% | 9.0% | 7.7 | L Hewitson | Front | — | — |
| 8 | PASS LINE | 1.0% | 5.3% | -injury30d −3 | -injury30d −4 | 0.0% | 1.3% | 22 | P N Wong (-7) | Close | -injury30d | — |

Note: ★ 膽 = Banker (1st by Adj Win%; #4 has 10 form lines, so it is eligible). #10 has Adj Place% 41.8%, below the 63% needed for 雙膽拖.

**Reasoning:** The top Adj Win% is #4 SOLID WIN at 19.2%, below the 20% line, so the race is **Wide open**. The skill defaults wide-open races to **Mode D: PASS** unless there is a strong pace/form read. There is not one here: the MC spread is the flattest of the meeting (six horses at 12.7–19.2% Adj Win%), the market favourites (#9, #2) are 5th–6th on MC, and the 3rd/4th favourites (#11, #6) are rated below 10% place. **Strategy A recommendation: PASS.**

A **Mode C shadow ticket** is recorded for A/B tracking: top 4 by Adj Win% (#4, #10, #1, #2) + 3 by Adj Place% (#9 38.3%, #3 36.4%, #5 28.9%). This covers every horse with Adj Place% ≥ 25% (7 horses), so the must-include rule is satisfied exactly.

- **#4 SOLID WIN** has two Valley 1650m wins at this level (8 runs at the trip), draw 3 and "very strong" trackwork. It is 1st on MC, 1st on the finish-time projection and drifting in the market at 11.
- **#10 FORZA TORO** (122 lb with a 3 lb claim, draw 6) made all over the Valley 1650m two starts back, but steps up from Class 4 wins.
- **#1 LUCKY SAM GOR** is top weight (135 lb) from gate 10 and has never run at the Valley. It was held up last start and is 2nd on the projection.
- **#2 POPE CODY** is a recent Valley 1650m winner from gate 1, held up last time.
- **#9 EMBRACES** (gate 2) is a consistent minor-placegetter and was badly held up last time.
- **#3 THE RED HARE** is 3rd on the projection but has no Valley runs.
- **#5 RIDING TOGETHER** is a front-runner carrying a 7 lb claim, with a wide-trip excuse last start.

**Excluded:** #11 I CAN (6.3) and #6 HIGHLAND RAHY (7.7) are both market horses at ≤15 odds. Reminder 9 (no exclusion at ≤15 odds when the only case against a horse is negative flags) does not apply: neither has a negative flag, and they are out on MC alone (9.6% and 9.0% Adj Place%). #12 WIN METHOD (10) has a +trial flag but only 11.0% Adj Place%.

**20%-variant note:** No horse has Adj Place% in the 20–25% band (next below #5's 28.9% is #7 at 11.4%), so the 20% must-include variant gives the same 7-horse pool and ticket.

**Pace:** Likely leaders are #10 (made all last Valley win), #5, #6 and #12. That is a contested pace for a Valley 1650m race, which the skill notes favours stalkers. That suits #2 and #9 from gates 1–2 and #4 from gate 3.

### TRIO POOL (any order) — SHADOW (Strategy A recommends PASS)

```
POOL: #4, #10, #1, #2, #9, #3, #5
MODE: C (shadow; recommended action = D: PASS) | POOL SIZE: 7

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #4 SOLID WIN (Adj Place% 45.6%) ← locked in every combo
腳 (Legs):  #10, #1, #2, #9, #3, #5
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville approximation from Adj Win%, renormalised):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #4, #10, #1 | 3.0% | $33.5 |
| 2 | #4, #10, #2 | 2.9% | $34.3 |
| 3 | #4, #1, #2 | 2.9% | $34.9 |
| 4 | #4, #10, #9 | 2.9% | $34.9 |
| 5 | #4, #1, #9 | 2.8% | $35.4 |

### TICKET SUMMARY (Strategy A)

```
RECOMMENDATION: PASS (Mode D, wide open) — $0

SHADOW TICKET (tracking only):
COMBINATIONS: 15 (膽拖: banker #4, legs 10, 1, 2, 9, 3, 5 → C(6,2))
UNIT BET: $10 (fixed)
TOTAL STAKE: $150 (if played)

ALL COMBINATIONS (est. prob):
  4-10-1 3.0% | 4-10-2 2.9% | 4-1-2 2.9% | 4-10-9 2.9% | 4-1-9 2.8%
  4-2-9 2.8%  | 4-10-3 2.4% | 4-1-3 2.4% | 4-2-3 2.3%  | 4-9-3 2.3%
  4-10-5 2.0% | 4-1-5 2.0%  | 4-2-5 1.9% | 4-9-5 1.9%  | 4-3-5 1.6%
  Ticket coverage (sum): ~36.1%
  Banker #4 top 3: 45.6% Adj Place% (MC 43.6%)

PASS CONDITIONS:
- Default: PASS (wide open, no horse ≥ 20% Adj Win%)
- If #4 SOLID WIN (banker) is scratched → VOID shadow ticket
- If field drops below 3 → pool refunded
- If going changes from Good (rain on a night meeting) → reconsider; MC was run on Good

CONFIDENCE: LOW (flattest MC of the meeting; banker only ~45% to place; model and market disagree on 4 of the top 6 in the betting)
```

---

## STRATEGY B (MC-only)

```
Banker: #4 SOLID WIN (MC Win% 17.2%, MC Place% 43.6%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #10 (40.8%), #2 (36.9%), #1 (36.7%), #3 (36.4%), #9 (36.3%), #5 (26.9%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #5 RIDING TOGETHER (MC Place% 26.9%, Win odds 16)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #11 I CAN (Win odds 6.3, MC Place% 7.6%)
  #6 HIGHLAND RAHY (Win odds 7.7, MC Place% 9.0%)
  (#12 WIN METHOD at 10 is not < 10; #10 FORZA TORO at 9.9 is already a primary leg)
Action: #11 replaced #5 (only replaceable leg; 1-for-1 swap). #6 added directly (no replaceable leg left).
Final legs: #10, #2, #1, #3, #9, #11, #6
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
UNIT BET: $10 (fixed)
TOTAL STAKE: $210

STRATEGY B TICKET: 膽 #4 / 腳 #10, #2, #1, #3, #9, #11, #6
  4-10-1 3.3%  | 4-10-2 3.2%  | 4-10-3 3.1% | 4-10-9 3.1% | 4-2-1 2.9%
  4-1-3 2.8%   | 4-1-9 2.8%   | 4-2-3 2.8%  | 4-2-9 2.7%  | 4-3-9 2.7%
  4-10-6 0.4%  | 4-1-6 0.4%   | 4-2-6 0.3%  | 4-3-6 0.3%  | 4-9-6 0.3%
  4-10-11 0.3% | 4-1-11 0.3%  | 4-2-11 0.3% | 4-3-11 0.3% | 4-9-11 0.3%
  4-11-6 0.0%
  Ticket coverage (sum, raw MC Harville): ~32.7%
```

Comparison: Strategy A passes (shadow $150), while Strategy B plays $210. Both use banker #4 and the same five core legs (#10, #1, #2, #9, #3). B swaps MC's #7 horse #5 RIDING TOGETHER for the market's 3rd favourite #11 I CAN, and adds the 4th favourite #6 HIGHLAND RAHY. The 11 combos involving #11 or #6 add only ~3.2% coverage on raw MC, so they pay off only if the market is right about those two. The A and B coverage figures are not directly comparable, because A uses SCMP-adjusted, renormalised Win%.

---

## CAVEATS

- **Wide-open race.** Strategy A defaults to PASS. The shadow Mode C ticket is for A/B tracking only.
- **Morning odds (11:00 HKT), not final.** The analyzer's live pull at run time showed #2 5.4, #9 5.4, #10 9.6, #6 7.8, #11 6.4, #12 10 (no Strategy B flag changes). Strategy B is close to the line: #10 FORZA TORO (9.9) and #12 WIN METHOD (10) sit right at 10. If #12 shortens below 10 it becomes a 3rd Win-odds candidate and is added directly (8 legs, 28 combos, $280). If #4 shortens below 10, nothing changes (it is the banker). Recheck near jump time (10:50pm).
- **SCMP odds columns unlabelled**, and the QP/Q matrix could not be mapped to pairings, so the QP cross-check was skipped.
- **Judgement calls on SCMP flags.** #10 "led all the way" was read as "made all" (+form +1). #4's "very strong" morning work was read as a positive trial (+2). #12's Conghua trial win was read as +trial (+2). #12's rider "no excuse" comment was not treated as a stewards' unacceptable finding. #8's colic "(passed on 12/10/2026)" was read as a vet pass 9 days before the race (-injury30d). None of these change the banker, the classification or the pool. Removing #4's +trial would leave it at 17.2% win and still 1st.
- **Distance parse log.** The scraper printed `distance=1200m`, but the saved racecard, the race header and SCMP all confirm 1650m, and the MC/projection ran at 1650m.
- **Model vs market:** The market's top 4 (#9, #2, #11, #6) include two horses MC rates below 10% place (#11, #6). MC's banker #4 is only 7th in the market.
- **Trip/venue uncertainty:** #1 and #3 have never run at Happy Valley. #8 has only 3 local runs.
- `careerStarts` is unpopulated in the scraped racecard, so banker eligibility used the form lines.
- Trio combination probabilities are a Harville approximation from Win%, not direct MC trio counts.
- Per instructions, `sync-historical.ts` and `fetch-odds.ts` were not re-run (data already fetched). The R10/R11 entries in the odds file are phantom copies of R1 and were ignored.

```
═══════════════════════════════════════════════════════════
```
