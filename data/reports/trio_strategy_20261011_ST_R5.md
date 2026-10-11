# Trio (單T) Strategy — Sha Tin 2026-10-11 Race 5

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-11 | Race 5
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed (12 starters ≥ 3, odds for 12/12, jockey + trainer stats loaded) | Going: Good | Scratchings: none
MC SIMULATION: 10,000 iterations (tools/analyze-race.ts --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5)
SCMP DATA: ⚠️ Partial (Star Form / TIR / Vet / Trackwork / Win odds loaded; Place column and Q/QP matrix look mis-parsed, so not used for decisions)
ODDS SOURCE: HKJC pool (fetch-odds.ts, data/odds/odds_20261011_ST.json, captured 11:24 HKT 11-Oct; same win odds used by analyze-race.ts)
             SCMP odds: ✅ loaded (Win, cross-reference only) | HKJC: ✅ loaded

RACE: R5 MAI PO HANDICAP — Class 4 | 1200m | All Weather Track | Good | 12 runners
CLASSIFICATION: Competitive (top Adj Win% 30.8%) | POOL SIZE: 7
MODE: B: Standard Pool (6), expanded to 7 under Rule 8 (every horse with Adj Place% >= 20% must be in the pool)
BET STRUCTURE (A): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
BET STRUCTURE (B): 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 per combination (fixed)
```

## Step 1–2: Data summary

```
Meeting: Sha Tin 2026-10-11 | Going: Good | Surface: AWT (dirt)
Target Race(s): R5 (Class 4 | 1200m | 12 runners)
Scratchings: none
Odds coverage: 12/12 horses with win odds
SCMP data: ⚠️ partial (Place column and Q/QP matrix unreliable)
```

- Historical sync: not re-run, per instruction (already up to date). MC loaded 2,318 historical races and 2,335 horse performances.
- Form data: 12/12 horses enriched (form runs: #2 4, #11 3, #4 6, #5 6, #9 7, the rest 9–10). No debutants, so every horse is banker-eligible.
- Jockeys: 12/12 profiles. Trainers: 12/12 profiles.
- Layoffs: #2 MEGA CAPTAIN last raced 13-Jun (120 days, more than 90). #7 GOOD CHAP last raced 04-Jul (99 days). #11 KING'S ARROW last raced 12-Jul (91 days). All three have trials or trial notes. They are flagged, not excluded.
- Enriched race card saved by the tool to `data/racecards/racecard_20261011_ST_R5.json`.

## SCMP data (Race 5)

| # | Horse | Win (SCMP) | Star Form signal | TIR flag | Vet flag | Trackwork | Style |
|---|-------|-----------|------------------|----------|----------|-----------|-------|
| 1 | JUICY DRAGON | 11 | "never out of the top five" in 8 straight dirt 1200m starts (2 wins) | +excuses (raced wide, no cover) | clear | — | Stalker |
| 2 | MEGA CAPTAIN | 2.8 | came from near the rear for 2nd on dirt 1200m | +excuses (hampered when contacted near 700m; wound to left hind cannon noted, Jun run) | none listed | +trial ("made progress under his own steam to overhaul the leaders") | Closer |
| 3 | SOMELOVEFROMABOVE | 14 | 3 Valley C4 1200m wins last term, prominent | travelled only fairly, disliked racing among horses (no adj) | post-race vet: no significant findings | — | On-pace |
| 4 | CENTRAL BANK | 12 | "did improve to finish thereabouts" in final 3 of 5 sprints | +excuses (steadied near 500m) | clear | — | Midfield |
| 5 | TACTICAL ACE | 13 | "failed to put his best foot forward" in 5 sprints | +excuses (wide, no cover); bumped on jumping once (not repeated) | clear | — | — |
| 6 | ARMOUR WAR EAGLE | 10 | earned cheques in 10 of 14 starts last term, 4 placings | clear | clear (age 7, under the 8+ threshold) | — | Stalker |
| 7 | GOOD CHAP | 12 | back-to-back dirt 1200m wins from midfield, defying wide trips (older form) | clear | clear | — | Midfield |
| 8 | GIANT LEAP | 13 | filled the frame in 3 of final 7 in C4 | clear | clear | — | — |
| 9 | GROUPER | 8.6 | placed 3 times over ST 1200m from 5 starts | made contact with a runner after start (minor, no adj) | clear | — | — |
| 10 | GIANT SPIRIT | 17 | "yet to earn a cheque" from 9 starts | clear | clear | — | — |
| 11 | KING'S ARROW | 13 | late ground for 8th on debut | clear | clear | +trial ("easily made all in a dirt trial last month") | Front |
| 12 | NOBLE DELUXE | 24 | made all from gate 7 for 3rd dirt 1200m win (final start last term) | +excuses (hampered on jumping); -perf (tailed out, unacceptable) | 27/09 unacceptable performance, passed 05/10 (performance flag, not an injury) | — | Front |

Tipster picks ignored.

```
───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 2 | MEGA CAPTAIN | 26.8% | 61.5% | 2.5 | ✅ | ✅ | 4 | ★ 膽 (Banker) | 2-6: 15.7% (6.4) |
| 6 | ARMOUR WAR EAGLE | 26.5% | 60.7% | 9.7 | ✅ | ✅ | 10 | 腳 (Leg) | 1-6: 9.7% (10.3) |
| 1 | JUICY DRAGON | 15.3% | 45.1% | 11 | ✅ | ❌ | 10 | 腳 (Leg) | 1-2: 9.3% (10.7) |
| 8 | GIANT LEAP | 8.9% | 32.4% | 13 | ✅ | ❌ | 10 | 腳 (Leg) | 6-8: 5.6% (18.0) |
| 9 | GROUPER | 6.9% | 27.2% | 10 | ✅ | ❌ | 7 | 腳 (Leg) | — |
| 12 | NOBLE DELUXE | 4.6% | 20.4% | 22 | ✅ | ❌ | 10 | 腳 (Leg) | — |
| 3 | SOMELOVEFROMABOVE | 4.8% | 20.3% | 13 | ✅ | ❌ | 10 | 腳 (Leg) | — |
| 4 | CENTRAL BANK | 3.6% | 16.7% | 11 | ❌ | ❌ | 6 | — | — |
| 7 | GOOD CHAP | 1.9% | 10.7% | 12 | ❌ | ❌ | 10 | — | — |
| 10 | GIANT SPIRIT | 0.3% | 2.4% | 22 | ❌ | ❌ | 9 | — | — |
| 11 | KING'S ARROW | 0.2% | 1.6% | 12 | ❌ | ❌ | 3 | — | — |
| 5 | TACTICAL ACE | 0.2% | 1.3% | 18 | ❌ | ❌ | 6 | — | — |

Market: The overround is 25.2%. MC rates #6 ARMOUR WAR EAGLE (9.7x) as a near co-favourite with #2 (26.5% vs 26.8%). That makes #6 undervalued by about 162%, the largest edge in the race. MC is strongly against #11 KING'S ARROW (12x, 0.2%) and #5 TACTICAL ACE (18x, 0.2%), each overvalued by about 97%. Finish-time projection puts #6 fastest (1:08.98), with #1 0.56s behind.

```
───────────────────────────────────────────────────────────
HORSE RANKINGS — Strategy A
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 2 | MEGA CAPTAIN | 26.8% | 61.5% | excuses +2, trial +2 | excuses +2, trial +2 | 30.8% | 65.5% | 2.5 | Z Purton | Close | +excuses, +trial | ★ 膽 (Banker) |
| 6 | ARMOUR WAR EAGLE | 26.5% | 60.7% | 0 | 0 | 26.5% | 60.7% | 9.7 | K C Leung | Stalk | — | 腳 (Leg) |
| 1 | JUICY DRAGON | 15.3% | 45.1% | excuses +2 | excuses +2 | 17.3% | 47.1% | 11 | L Ferraris | Stalk | +excuses | 腳 (Leg) |
| 8 | GIANT LEAP | 8.9% | 32.4% | 0 | 0 | 8.9% | 32.4% | 13 | H Y Yuen (-7) | — | — | 腳 (Leg) |
| 9 | GROUPER | 6.9% | 27.2% | 0 | 0 | 6.9% | 27.2% | 10 | E C W Wong (-3) | — | — | 腳 (Leg) |
| 4 | CENTRAL BANK | 3.6% | 16.7% | excuses +2, +form +1 | excuses +2, +form +1 | 6.6% | 19.7% | 11 | C L Chau (-2) | Mid | +excuses, +form | — (just below 20%) |
| 3 | SOMELOVEFROMABOVE | 4.8% | 20.3% | 0 | 0 | 4.8% | 20.3% | 13 | J Orman | On-pace | — | 腳 (Leg) |
| 12 | NOBLE DELUXE | 4.6% | 20.4% | excuses +2, -perf −2 | excuses +2, -perf −2 | 4.6% | 20.4% | 22 | A Atzeni | Front | +excuses, -perf | 腳 (Leg) |
| 11 | KING'S ARROW | 0.2% | 1.6% | trial +2 | trial +2 | 2.2% | 3.6% | 12 | L Hewitson | Front | +trial | — |
| 5 | TACTICAL ACE | 0.2% | 1.3% | excuses +2 | excuses +2 | 2.2% | 3.3% | 18 | M Chadwick | — | +excuses (wide) | — |
| 7 | GOOD CHAP | 1.9% | 10.7% | 0 | 0 | 1.9% | 10.7% | 12 | P N Wong (-7) | Mid | — | — |
| 10 | GIANT SPIRIT | 0.3% | 2.4% | 0 | 0 | 0.3% | 2.4% | 22 | H T Mo (-2) | — | — | — |

Note: ★ 膽 = Banker (1st by Adj Win%). #2 has 4 career starts, so it is banker-eligible. 雙膽拖 is not triggered because #6's Adj Place% of 60.7% is below 63%. No caps were hit.

Reasoning: MC and SCMP both have a clear top two, #2 and #6. #2 is the market favourite, ridden by Purton, and SCMP gives it a strong trial plus an excuse from its last run (hampered). #6 is the model's value horse: consistent (cheques in 10 of 14 starts), fastest on projected time, and drawn 11. #1 JUICY DRAGON is a dirt-1200m specialist (top 5 in 8 straight on dirt) with an excuse from its last run (wide, no cover), so it is the clear third. #8 and #9 fill out the Mode B core by Adj Place%. Rule 8 then requires #12 (20.4%) and #3 (20.3%), so the pool expands to 7. #4 CENTRAL BANK (19.7%, 11x) misses by 0.3pt. It is the first reserve if a leg is scratched. Pace: #12, #11 and #3 look like the on-pace or front types. #2 comes from off the pace, so a genuine tempo suits the banker.

```
───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #2, #6, #1, #8, #9, #3, #12
MODE: B (expanded to 7 under Rule 8) | POOL SIZE: 7

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #2 MEGA CAPTAIN (Adj Place% 65.5%) ← locked in every combo
腳 (Legs):  #6, #1, #8, #9, #3, #12
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville trio probability from normalised Adj Win%; fair odds = 1/p):

| Rank | Horses (any order) | Trio Prob. | Est. Fair Odds |
|------|-------------------|-----------|----------------|
| 1 | #2, #6, #1 | 13.7% | $7.3 |
| 2 | #2, #6, #8 | 6.4% | $15.6 |
| 3 | #2, #6, #9 | 4.9% | $20.6 |
| 4 | #2, #1, #8 | 3.7% | $27.2 |
| 5 | #2, #6, #3 | 3.3% | $30.1 |

```
───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150
Est. ticket hit probability (Harville, all 15 combos): ~46.4%

TOP COMBINATIONS (highest value):
  2-6-1 (13.7%), 2-6-8 (6.4%), 2-6-9 (4.9%), 2-1-8 (3.7%), 2-6-3 (3.3%),
  2-6-12 (3.2%), 2-1-9 (2.8%), 2-1-3 (1.9%), 2-1-12 (1.8%), 2-8-9 (1.3%)
  Remaining: 2-8-3, 2-8-12, 2-9-3, 2-9-12, 2-3-12

PASS CONDITIONS:
- If #2 MEGA CAPTAIN (banker) is scratched → VOID ticket (do not restructure)
- If a leg is scratched → replace with #4 CENTRAL BANK (next by Adj Place%, 19.7%), or drop it (1膽 + 5腳 = 10 combos, $100)
- If field drops below 3 → pool refunded
- If the AWT is downgraded (e.g. Wet Fast / Wet Slow) → re-run MC; reconsider the front-runner legs (#12, #3)

CONFIDENCE: MEDIUM (clear MC top two that agrees with the market on #2, but the banker is resuming off a 120-day break)

CAVEATS:
- Historical sync not re-run in this session (stated as already done).
- Banker #2 MEGA CAPTAIN has only 4 starts, is resuming after 120 days (last ran 13-Jun), and had a wound to the left hind cannon noted in that run's stewards' report. No vet entry is listed, and its latest trial was strong. Trainer C H Yip is 0 from 38 this season in the tool's stats.
- The MC vs market gap on #6 ARMOUR WAR EAGLE is large (MC 26.5% vs 9.7x). Treat the edge as model-based, not confirmed. Draw 11 is a 1–3% reducer that the model does not apply explicitly.
- The SCMP "Place" column parsed as roughly equal to or larger than Win for every horse, which is implausible. The SCMP Q matrix (e.g. Q 2-4 3.3, Q 2-3 4.4, below Q 2-6 6.4) does not match the win market (#4 12x, #3 14x). Neither is used for decisions. The only Q value that looks plausible is Q 2-6 6.4, which matches the MC fair 6.4.
- SCMP win odds differ slightly from the 11:24 HKJC snapshot (#2 2.8 vs 2.5, #9 8.6 vs 10). The HKJC snapshot is used. Re-check before the 14:30 off.
- Trio probabilities come from a Harville approximation on Adj/MC Win%. analyze-race.ts does not output trio probabilities directly. Harville under-states MC's own Place% for the top two.
- Pool expanded from the Mode B default of 6 to 7 because Rule 8 requires every horse with Adj Place% >= 20% (#3, #12). Both are marginal (20.3% / 20.4%).
```

```
───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: #2 MEGA CAPTAIN (MC Win% 26.8%, MC Place% 61.5%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #6 (60.7%), #1 (45.1%), #8 (32.4%), #9 (27.2%), #12 (20.4%), #3 (20.3%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #12 NOBLE DELUXE (MC Place% 20.4%, Win odds 22), #3 SOMELOVEFROMABOVE (MC Place% 20.3%, Win odds 13)
   (#9 GROUPER at 27.2% is not replaceable: Win odds 10, not > 10)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none (the only sub-10 prices are #2 2.5 and #6 9.7, both already banker or primary leg)
Action: no replacement or addition
Final legs: #6, #1, #8, #9, #12, #3
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150
Est. ticket hit probability (Harville on raw MC Win%): ~56.9%

STRATEGY B TICKET: 膽 #2 / 腳 #6, #1, #8, #9, #12, #3
  2-6-1 (15.9%), 2-6-8 (8.5%), 2-6-9 (6.5%), 2-6-3 (4.4%), 2-6-12 (4.2%),
  2-1-8 (4.1%), 2-1-9 (3.1%), 2-1-3 (2.1%), 2-1-12 (2.0%), 2-8-9 (1.7%),
  2-8-3 (1.1%), 2-8-12 (1.1%), 2-9-3 (0.9%), 2-9-12 (0.8%), 2-3-12 (0.6%)

Comparison: Strategy B is identical to Strategy A: same banker (#2), same 6 legs, 15 combos, $150. The SCMP adjustments only reorder within the pool (#2 strengthened, #1 lifted). They move #4 CENTRAL BANK up to 19.7%, still just short of the 20% inclusion line, so no horse enters or leaves the pool. The hit-probability gap (46.4% vs 56.9%) comes only from the extra Adj Win% given to non-pool horses (#4, #5, #11) under Harville, not from a different ticket.
═══════════════════════════════════════════════════════════
```
