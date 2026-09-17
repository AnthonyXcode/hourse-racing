```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-16 | Race 7
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all, 12/12 horses enriched, 12 jockey / 11 trainer profiles)
SCMP DATA: ✅ Loaded | Star Form / TIR / Trackwork parsed; Vet: no separate section (QP/Q matrix: ⚠️ unreliable, see caveats)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, captured 17:55 HKT 16-Sep)
             SCMP odds: ✅ loaded (differ materially; HKJC used as primary) | HKJC live: ✅ loaded

RACE: R7 — REPULSE BAY HANDICAP | Class 3 | 1000m | Turf ("B" course) | Good | 12 runners
CLASSIFICATION: Competitive (top Adj Win% 33.4%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos
UNIT BET: $10 per combination (fixed)
```

## Data summary

```
Meeting: Happy Valley 2026-09-16 | Going: Good | Surface: Turf
Target Race(s): R7 (Class 3 | 1000m | 12 starters)
Scratchings: none (SCMP reserves PEGAS and ROYAL BLITZ did not get a run)
Odds coverage: 12 horses with odds
SCMP data: ✅ loaded (no separate vet section; QP/Q matrix values inconsistent, not used)
```

## SCMP data (Race 7)

| # | Horse | Win / Place (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|--------------------|------------------|----------|----------|-----------|---------------|
| 1 | LOVE TOGETHER | 10 / 9.3 | +form (straight 1000m win latest, after three beaten HV 1200m runs) | bumped on jumping (1 run, not repeated) | clear | — | On-pace/stalker |
| 2 | CANDLELIGHT DINNER | 13 / 12 | +form (box-seat 3rd, then "went one better" after speed-tracking run) | clear | clear | — | Stalker |
| 3 | HORSEPOWER | 8.2 / 7.1 | three HV 1000m 2nds, then beat few from gate 11 | shifted across from wide gate, did not travel well (not an excuse) | post-race vet: no significant findings | beaten by #6 in trial | Midfield |
| 4 | DANCING CLASSICS | 4.8 / 5.1 | +form (won HV 1000m latest, defying wide trip near speed, first-time blinkers) | wide no cover (but won) | clear | — | On-pace |
| 5 | BUNTA BABY | 7.1 / 4.6 | +form (dashed late for 3rd from gate 12 latest; 3 wins + 2 placings from 5 HV 1000m) | shifted across from outside gate (gate-related) | clear | — | Closer |
| 6 | ETERNAL FORTUNE | 17 / 18 | placings in 3/5 HV 1000m last term; failed to lift latest; "did win a trial" | didn't change lead leg, first up (not an excuse) | post-race vet: no significant findings | +trial (beat #3 in informative Sha Tin trial this month) | On-pace |
| 7 | CASA OF HONOR | 22 / 22 | disappointed 5 times; won HV 1000m from gate 12; failed twice since | +excuses (jumped fairly, crowded shortly after start) | post-race vet: no significant findings | — | Midfield/back |
| 8 | NOTTHESILLYONE | 7.6 / 10 | dirt 1200m / HV 1000m winner, struggled in higher grade | resented kickback on AWT (old run) | post-race vet: no significant findings | +trial (made all in recent Conghua trial) | Front-runner |
| 9 | HONEST WITNESS | 20 / 28 | front-runner; struggled both times over C&D | raced too keenly (not an excuse) | post-race vet: no significant findings | — | Front-runner |
| 10 | PARENTS' LOVE | 5.5 / 6.5 | minor cheques in 3 of 4 runs at this level | clear | clear | — | On-pace |
| 11 | RED ELEGANCE | 15 / 20 | failed 11 times last season; beat one latest | clear | clear (age 7) | — | Midfield/back |
| 12 | DRAGON FOUR SEAS | 22 / 23 | fired blanks; ran on for 6th after wide trip latest | +excuses (bumped near 300m, wide trip) | post-race vet: no significant findings | — | Midfield |

```
───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 1 | LOVE TOGETHER | 32.4% | 69.1% | 8.5 | ✅ | ✅ | 1/7/7/8/3/1 | ★ 膽 (Banker) | 1-5: 19.0% (5.3) |
| 5 | BUNTA BABY | 25.4% | 61.7% | 4.4 | ✅ | ✅ | 3/3/6/1/1/3 | 腳 (Leg) | 1-5: 19.0% (5.3) |
| 4 | DANCING CLASSICS | 17.4% | 51.0% | 5.2 | ✅ | ✅ | 1/12/8/12/1/8 | 腳 (Leg) | 1-4: 13.4% (7.5) |
| 8 | NOTTHESILLYONE | 9.6% | 36.3% | 11 | ✅ | ❌ | 9/1/9/1/7/10 | 腳 (Leg) | 1-8: 7.5% (13.3) |
| 3 | HORSEPOWER | 6.8% | 29.2% | 6.8 | ✅ | ✅ | 8/2/2/2/9/6 | 腳 (Leg) | — |
| 2 | CANDLELIGHT DINNER | 2.8% | 15.2% | 13 | ❌ | ❌ | 2/3/4/4/3/11 | — | — |
| 9 | HONEST WITNESS | 2.2% | 11.9% | 26 | ❌ | ❌ | 12/2/12/1/1/8 | — | — |
| 10 | PARENTS' LOVE | 1.0% | 6.5% | 6.8 | ❌ | ✅ | 4/6/10/5/1/11 | 腳 (Leg, added) | — (replacement candidate) |
| 6 | ETERNAL FORTUNE | 0.9% | 6.8% | 18 | ❌ | ❌ | 9/9/2/3/5/5 | — | — |
| 12 | DRAGON FOUR SEAS | 0.6% | 4.1% | 26 | ❌ | ❌ | 6/5/12/11/12/12 | — | — |
| 11 | RED ELEGANCE | 0.6% | 4.3% | 20 | ❌ | ❌ | 13/11/8/7/7/10 | — | — |
| 7 | CASA OF HONOR | 0.4% | 4.0% | 21 | ❌ | ❌ | 12/8/1/12/6/10 | — | — |

Market: MC and the market disagree at the top. The market favourite is #5 BUNTA BABY (4.4), then #4 (5.2), with #3 and #10 joint third choices at 6.8. MC puts #1 LOVE TOGETHER (8.5) clearly on top at 32.4% (analyzer: "undervalued by 179%") and rates #10 PARENTS' LOVE at only 1.0% win / 6.5% place (flagged overvalued by 93%). Overround 22.9%.

```
───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 1 | LOVE TOGETHER | 32.4% | 69.1% | form +1 | form +1 | 33.4% | 70.1% | 8.5 | C Y Ho | On-pace | +form | ★ 膽 (Banker) |
| 5 | BUNTA BABY | 25.4% | 61.7% | form +1 | form +1 | 26.4% | 62.7% | 4.4 | Z Purton | Close | +form | 腳 (Leg) |
| 4 | DANCING CLASSICS | 17.4% | 51.0% | form +1 | form +1 | 18.4% | 52.0% | 5.2 | E C W Wong (-3) | On-pace | +form | 腳 (Leg) |
| 8 | NOTTHESILLYONE | 9.6% | 36.3% | trial +2 | trial +2 | 11.6% | 38.3% | 11 | L Ferraris | Front | +trial | 腳 (Leg) |
| 3 | HORSEPOWER | 6.8% | 29.2% | 0 | 0 | 6.8% | 29.2% | 6.8 | A Atzeni | Mid | — | 腳 (Leg) |
| 2 | CANDLELIGHT DINNER | 2.8% | 15.2% | form +1 | form +1 | 3.8% | 16.2% | 13 | C L Chau (-2) | Stalk | +form | 腳 (Leg) |
| 6 | ETERNAL FORTUNE | 0.9% | 6.8% | trial +2 | trial +2 | 2.9% | 8.8% | 18 | R Kingscote | On-pace | +trial | — |
| 12 | DRAGON FOUR SEAS | 0.6% | 4.1% | excuses +2 | excuses +2 | 2.6% | 6.1% | 26 | A Badel | Mid | +excuses | — |
| 7 | CASA OF HONOR | 0.4% | 4.0% | excuses +2 | excuses +2 | 2.4% | 6.0% | 21 | M F Poon | Mid/back | +excuses | — |
| 9 | HONEST WITNESS | 2.2% | 11.9% | 0 | 0 | 2.2% | 11.9% | 26 | K Teetan | Front | — | — |
| 10 | PARENTS' LOVE | 1.0% | 6.5% | 0 | 0 | 1.0% | 6.5% | 6.8 | P N Wong (-7) | On-pace | — | — |
| 11 | RED ELEGANCE | 0.6% | 4.3% | 0 | 0 | 0.6% | 4.3% | 20 | M Chadwick | Mid/back | — | — |

No horse reached the ±8% / ±10% caps. No negative table flags applied (no repeated barrier issues, no unacceptable-performance / not-ridden-out notes, no dated vet injuries).

Not applied (judgement calls, listed for transparency):
- #1 was bumped on jumping once (Race 761). One run is not a repeated barrier issue.
- #3 and #5 were shifted across from wide gates. That is gate-related, not bad luck in running.
- #4 raced wide without cover but won, so no excuse bonus.
- #6's lead-leg issue and #9's keenness are not bad-luck excuses.
- An SCMP sentence "responding nicely for second in a Conghua trial last month" appears on the page but could not be reliably tied to a horse (the page parser attributed it to #5 once and omitted it once), so no trial bonus was given.

Reasoning: #1 is on 33.4% Adj Win%, inside the 20–35% band, so the race is **Competitive** and uses Mode B. The pool is the top 3 by Adj Win% (#1, #5, #4) plus the next 3 by Adj Place% (#8 38.3%, #3 29.2%, #2 16.2%). Every horse with Adj Place% ≥ 20% (#1, #5, #4, #8, #3) is in the pool. #1 has 9 recorded starts, so it can be banker. The 2nd-ranked horse #5 has Adj Place% 62.7%, just under the 63% line, so the structure is single-banker 膽拖. #10 PARENTS' LOVE (6.8 in the market) is not in the Strategy A pool: its Adj Place% is 6.5%, and Rule 9 only blocks exclusion based on negative flags, not on pool ranking. Strategy B covers it.

Pace: HV 1000m favours on-pace runners. #10 (gate 1), #9, #8 (gate 12) and #4 (gate 3) should show speed; #1 from gate 6 should sit handy. #5 is a closer from gate 7 and needs a gap. #3 from gate 2 gets a good run on the rail.

```
───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #1, #5, #4, #8, #3, #2
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #1 LOVE TOGETHER (Adj Place% 70.1%) ← locked in every combo
腳 (Legs):  #5, #4, #8, #3, #2
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (independence proxy = product of Adj Place%):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #1, #5, #4 | 22.9% | $44 |
| 2 | #1, #5, #8 | 16.8% | $59 |
| 3 | #1, #4, #8 | 14.0% | $72 |
| 4 | #1, #5, #3 | 12.8% | $78 |
| 5 | #1, #4, #3 | 10.6% | $94 |

(Fair odds are per $10 unit. The product-of-place proxy overstates the true joint probability, so use these for relative ranking only.)

```
───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TICKETS (banker #1 with every pair of legs):
  1-5-4 (22.9%), 1-5-8 (16.8%), 1-4-8 (14.0%), 1-5-3 (12.8%), 1-4-3 (10.6%),
  1-8-3 (7.8%), 1-5-2 (7.1%), 1-4-2 (5.9%), 1-8-2 (4.4%), 1-3-2 (3.3%)

PASS CONDITIONS:
- If #1 LOVE TOGETHER (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider closer #5 and favour on-pace types
- If #1 drifts past ~12 on final odds (market disagreement widens) → consider PASS

CONFIDENCE: MEDIUM-LOW
```

CAVEATS:
- **Model/market disagreement on the banker.** #1 is only the 5th choice at 8.5 while MC has it 32.4% win. `notes/2026-09-14-hv-turf-market-agreement-gate.md` found HV Turf losses concentrate where the model pick is not the market favourite and MC Place% < 75%. Both apply here (MC Place% 69.1%).
- **Banker below the HV Trio banker gate.** `notes/2026-09-14-hv-trio-banker.md` only bets when banker MC Place% ≥ 75. #1 is at 69.1%. `notes/2026-09-15-hv-mc-place-calibration.md` also shows HV MC Place% is over-confident: the 60–70% bucket actually placed about 50% of the time.
- **Layoffs.** #1 last ran 7-Jun (101 days) and #8 13-Jun (95 days), both over 90 days. Most others last ran 8-Jul (70 days); nobody has run this season.
- **Finish-time projection conflicts with Win%.** The analyzer's time projection puts #12 DRAGON FOUR SEAS fastest and #1, #5, #4 near the back. Selection uses the MC Win%/Place% ranking; the projection is not used.
- **Odds snapshot.** HKJC odds captured at 17:55 HKT, before the pool settles. SCMP odds differ materially (#1 10 vs 8.5, #5 7.1 vs 4.4, #8 7.6 vs 11, #3 8.2 vs 6.8, #10 5.5 vs 6.8, #11 15 vs 20). With SCMP odds, #8 (7.6) would flip to Win odds<10 but is already a primary leg, and #3 would still be <10, so Strategy B legs would not change. SCMP place odds look mis-parsed (e.g. #1 win 10 / place 9.3). MC place odds were estimated from win odds.
- **Scraper distance log.** The analyzer printed "distance=1200m" while parsing the card, but the simulation and racecard use 1000m, which SCMP confirms.
- **QP/Q matrix.** SCMP matrix values were inconsistent with win odds (e.g. 3-5 QP 3.6 and 1-4 QP 4.0 while 1-5 is 23), so they were not used for value cross-checks.
- **Vet reports.** No separate vet section; only "no significant findings" post-race notes inside TIR, so no vet adjustments.
- **Going.** Taken from the racecard/SCMP (Good), not independently confirmed on race night.

```
───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: #1 LOVE TOGETHER (MC Win% 32.4%, MC Place% 69.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #5, #4, #8, #3
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none (#3 is 29.2% but 6.8 odds)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #10 PARENTS' LOVE (Win odds 6.8, MC Place% 6.5%)
Action: added directly (no replaceable leg)
Final legs: #5, #4, #8, #3, #10
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET (banker #1 with every pair of legs):
  1-5-4, 1-5-8, 1-4-8, 1-5-3, 1-4-3,
  1-8-3, 1-5-10, 1-4-10, 1-8-10, 1-3-10
  (ordered by raw MC place-product proxy: 21.7%, 15.5%, 12.8%, 12.5%, 10.3%, 7.3%, 2.8%, 2.3%, 1.6%, 1.3%)
```

Comparison: both strategies use the same banker (#1), the same four core legs (#5, #4, #8, #3) and the same cost ($100, 10 combos). They differ only in the fifth leg: Strategy A takes #2 CANDLELIGHT DINNER (Adj Place% 16.2%, 13 odds), while Strategy B takes #10 PARENTS' LOVE because the market has it at 6.8 even though MC rates it 6.5% place.

```
═══════════════════════════════════════════════════════════
```
