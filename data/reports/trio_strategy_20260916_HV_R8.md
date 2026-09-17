```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-16 | Race 8
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all, 12/12 horses enriched)
SCMP DATA: ✅ Loaded | Star Form / TIR / Trackwork parsed; Vet: none on page (SCMP odds ⚠️ inconsistent, see caveats)
ODDS SOURCE: HKJC pool (tools/fetch-odds.ts, captured 17:55 HKT 16-Sep)
             SCMP odds: ⚠️ loaded but inconsistent (not used) | HKJC live: ✅ loaded

RACE: R8 — SHEK O HANDICAP | Class 2 | 1650m | Turf | Good | 12 runners
CLASSIFICATION: Dominant (top Adj Win% 47.2%) | POOL SIZE: 8
MODE: A: Tight Pool (5) + #4, #9, #8 added under Rule 8 (Adj Place% ≥ 20%)
BET STRUCTURE: 膽拖 1膽 + 7腳 = C(7,2) = 21 combos
UNIT BET: $10 per combination (fixed)
```

## Data summary

```
Meeting: Happy Valley 2026-09-16 | Going: Good | Surface: Turf
Target Race(s): R8 (Class 2 | 1650m | 12 starters)
Scratchings: none
Odds coverage: 12 horses with odds
SCMP data: ✅ loaded (no vet section; SCMP win/place odds inconsistent, HKJC odds used)
```

## SCMP data (Race 8)

| # | Horse | Win / Place (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|--------------------|------------------|----------|----------|-----------|---------------|
| 1 | SPEED DRAGON | 12 / 13 | January Cup (HV 1800m) winner | +excuses (no clear running late, could not be ridden out final 50m) | clear | — | Midfield/closer |
| 2 | MASSIVE SOVEREIGN | 15 / 16 | 2024 Derby winner; resumed 4th then 6th | clear (vet: no significant findings) | clear | — | Midfield |
| 3 | SAGACIOUS LIFE | 10 / 10 | won 2 of first 3 local runs, then Classic Mile 4th | +excuses (checked when crowded at 200m, crowded again at 100m) | clear | — | Midfield |
| 4 | HELENE FEELING | 20 / 22 | HV 1800m win, then dead-heat win over 1650m (older) | jumped awkwardly (1 run) | clear | — | Midfield |
| 5 | HUGE WAVE | 10 / 12 | HV 1650m win in November; wide-trip 1800m loss | jumped awkwardly (1 run) | clear | — | Midfield |
| 6 | PACKING ANGEL | 11 / 9.9 | +form (rallying 3rd, then HV 1650m win) | forward run from wide gate (instruction) | clear | — | On-pace |
| 7 | SILVERY BREEZE | 8.7 / 8.1 | two HV 1650m C3 wins, three 2nds, three 4ths | shifted in and made contact (self-caused) | clear | — | Stalker |
| 8 | MAX QUE | 5.3 / 4.1 | +form (rallying 1600m win, first in Class 2) | none | clear | — | Closer |
| 9 | CALIFORNIATOTALITY | 10 / 11 | near HV 1800m winner; one speed-tracking 3rd | +excuses (bumped, then badly crowded after 200m) | clear | +trial (looked good for 3rd in latest trial) | Speed-tracker |
| 10 | AWESOME FLUKE | 13 / 20 | HV 1800m upset win; HV 1650m win in record time | led, raced keenly (instruction, self-inflicted) | clear | — | Front-runner |
| 11 | ARMOR GOLDEN EAGLE | 10 / 11 | box-seat win in May; luckless 3rd earlier | bumped after start, lay in, contact at 250m | clear | — | Stalker |
| 12 | LE ZONDA | 6.1 / 6.1 | +form (came from last and widest for HV 1800m win, then won again) | +excuses (steadied near 500m) | clear | — | Closer |

```
───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 12 | LE ZONDA | 44.2% | 76.6% | 5.4 | ✅ | ✅ | 1/1/5/6/5/4 | ★ 膽 (Banker) | 1-12: 13.7% (7.3) |
| 1 | SPEED DRAGON | 12.8% | 41.3% | 15 | ✅ | ❌ | 8/3/2/1/4/6 | 腳 (Leg) | 1-12: 13.7% (7.3) |
| 7 | SILVERY BREEZE | 10.9% | 37.3% | 9.4 | ✅ | ✅ | 3/4/1/4/1/4 | 腳 (Leg) | 7-12: 12.0% (8.3) |
| 11 | ARMOR GOLDEN EAGLE | 6.9% | 27.7% | 10 | ✅ | ❌ | 5/1/1/3/1/7 | 腳 (Leg) | 11-12: 7.9% (12.6) |
| 6 | PACKING ANGEL | 6.1% | 25.2% | 8.8 | ✅ | ✅ | 5/6/4/1/3/5 | 腳 (Leg) | 6-12: 7.3% (13.7) |
| 4 | HELENE FEELING | 5.1% | 23.0% | 23 | ✅ | ❌ | 9/11/5/4/7/5 | — (replaced by #8) | 4-12: 6.6% (15.2) |
| 8 | MAX QUE | 4.1% | 19.2% | 3.8 | ❌ | ✅ | 4/2/4/6/1/3 | 腳 (Leg, replaces #4) | — (replacement candidate) |
| 3 | SAGACIOUS LIFE | 3.8% | 17.4% | 10 | ❌ | ❌ | 7/3/12/14/4/1 | — | — |
| 9 | CALIFORNIATOTALITY | 3.7% | 17.2% | 13 | ❌ | ❌ | 6/11/3/10/8/10 | — | — |
| 5 | HUGE WAVE | 2.0% | 11.1% | 14 | ❌ | ❌ | 11/2/3/2/3/8 | — | — |
| 10 | AWESOME FLUKE | 0.4% | 2.8% | 20 | ❌ | ❌ | 11/9/6/5/4/6 | — | — |
| 2 | MASSIVE SOVEREIGN | 0.1% | 1.1% | 17 | ❌ | ❌ | 12/6/4/8/6/6 | — | — |

Market: MC and the market disagree on the favourite. The market has **#8 MAX QUE at 3.8**, but MC gives it only 19.2% place. MC's top pick, #12 LE ZONDA, is second favourite at 5.4, and the analyzer shows a 98% place edge. MC also rates #1 SPEED DRAGON (15) far above the market (undervalued by 104%). It flags #2 as overvalued. Overround is 23.4%.

```
───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 12 | LE ZONDA | 44.2% | 76.6% | excuses +2, form +1 | excuses +2, form +1 | 47.2% | 79.6% | 5.4 | C Y Ho | Closer | +excuses, +form | ★ 膽 (Banker) |
| 1 | SPEED DRAGON | 12.8% | 41.3% | excuses +2 | excuses +2 | 14.8% | 43.3% | 15 | L Hewitson | Midfield | +excuses | 腳 (Leg) |
| 7 | SILVERY BREEZE | 10.9% | 37.3% | 0 | 0 | 10.9% | 37.3% | 9.4 | Z Purton | Stalker | — | 腳 (Leg) |
| 9 | CALIFORNIATOTALITY | 3.7% | 17.2% | excuses +2, trial +2 | excuses +2, trial +2 | 7.7% | 21.2% | 13 | L Ferraris | Speed-tracker | +excuses, +trial | 腳 (Leg) |
| 6 | PACKING ANGEL | 6.1% | 25.2% | form +1 | form +1 | 7.1% | 26.2% | 8.8 | K Teetan | On-pace | +form | 腳 (Leg) |
| 11 | ARMOR GOLDEN EAGLE | 6.9% | 27.7% | 0 | 0 | 6.9% | 27.7% | 10 | A Atzeni | Stalker | — | 腳 (Leg) |
| 3 | SAGACIOUS LIFE | 3.8% | 17.4% | excuses +2 | excuses +2 | 5.8% | 19.4% | 10 | J Orman | Midfield | +excuses | — |
| 8 | MAX QUE | 4.1% | 19.2% | form +1 | form +1 | 5.1% | 20.2% | 3.8 | A Badel | Closer | +form | 腳 (Leg) |
| 4 | HELENE FEELING | 5.1% | 23.0% | 0 | 0 | 5.1% | 23.0% | 23 | E C W Wong (-3) | Midfield | — | 腳 (Leg) |
| 5 | HUGE WAVE | 2.0% | 11.1% | 0 | 0 | 2.0% | 11.1% | 14 | H Bentley | Midfield | — | — |
| 10 | AWESOME FLUKE | 0.4% | 2.8% | 0 | 0 | 0.4% | 2.8% | 20 | B Avdulla | Front | — | — |
| 2 | MASSIVE SOVEREIGN | 0.1% | 1.1% | 0 | 0 | 0.1% | 1.1% | 17 | C L Chau (-2) | Midfield | — | — |

No horse reached the ±8% / ±10% caps. #12's Adj Win% (47.2%) is under the 50% cap.

Not applied (judgement calls, listed for transparency):
- #1 "couldn't be ridden out final 50M" came from lack of clear running, not a soundness concern. It is scored as excuses +2 and not as -notRO −2.
- #4 and #5 each jumped awkwardly in one run, so neither counts as a repeated barrier issue.
- #11 was bumped after the start and made contact, but was not crowded or steadied. No excuse credit.
- #7's contact was self-caused (shifted in). #10 raced keenly under instructions to lead. #6 went forward under instructions. None of these counts as an excuse.
- #2's post-race vet check showed no significant findings, and no vet section was listed on the page, so no vet adjustments were applied.
- #12's form +1 rests on "came from last and widest" to win. That is read as a rallying win (same reading as R6).

Reasoning: #12 LE ZONDA is on 47.2% Adj Win%, above 35%, so the race is **Dominant** and uses Mode A: the banker plus the 4 contenders by Adj Place% (#1 43.3%, #7 37.3%, #11 27.7%, #6 26.2%). These are also every horse at Adj Place% ≥ 25%. **Rule 8** adds #4 (23.0%), #9 (21.2%) and #8 (20.2%), so the pool is 8, matching the R2/R3/R4 precedent and the skill's HV "wider pool" note. #8 MAX QUE is only just over the line (raw MC 19.2% + form +1), but **Rule 9** keeps it in anyway because it is the 3.8 market favourite. #12 has 8 career starts, so it can be the banker. #1's Adj Place% of 43.3% is below 63%, so this is a single-banker 膽拖. #3 SAGACIOUS LIFE (10, Adj Place% 19.4%) is left out on the numbers. It has no negative flags, so Rule 9 does not force it in.

Pace: HV 1650m suits stalkers. #10 (gate 10) has led before and is likely to lead again; #6 (gate 6) can sit outside it, and #9 (gate 3) should speed-track. #7 (gate 12) and #11 (gate 11) are the stalkers stuck with the widest gates and may have to go back. #12 (gate 4, 117 lb) and #8 (gate 5) are closers with decent draws but need a gap in a 12-runner field. #1 has the rail draw but carries top weight of 135 lb.

```
───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #12, #1, #7, #11, #6, #4, #9, #8
MODE: A (+Rule 8 inclusion) | POOL SIZE: 8

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #12 LE ZONDA (Adj Place% 79.6%) ← locked in every combo
腳 (Legs):  #1, #7, #11, #6, #4, #9, #8
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = 21
```

TOP TRIO COMBINATIONS (independence proxy = product of Adj Place%):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #12, #1, #7 | 12.9% | $78 |
| 2 | #12, #1, #11 | 9.5% | $105 |
| 3 | #12, #1, #6 | 9.0% | $111 |
| 4 | #12, #7, #11 | 8.2% | $122 |
| 5 | #12, #1, #4 | 7.9% | $126 |

(Fair odds are per $10 unit. The product-of-place proxy overstates the true joint probability, so use these for relative ranking only.)

```
───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 21 (膽拖: C(7,2), 7 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $210

TICKETS (banker #12 with every pair of legs):
  12-1-7 (12.9%), 12-1-11 (9.5%), 12-1-6 (9.0%), 12-7-11 (8.2%), 12-1-4 (7.9%),
  12-7-6 (7.8%), 12-1-9 (7.3%), 12-1-8 (7.0%), 12-7-4 (6.8%), 12-7-9 (6.3%),
  12-7-8 (6.0%), 12-11-6 (5.8%), 12-11-4 (5.1%), 12-6-4 (4.8%), 12-11-9 (4.7%),
  12-11-8 (4.5%), 12-6-9 (4.4%), 12-6-8 (4.2%), 12-4-9 (3.9%), 12-4-8 (3.7%),
  12-9-8 (3.4%)

PASS CONDITIONS:
- If #12 LE ZONDA (banker) is scratched → VOID ticket (do not restructure)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider closers (#12, #8) and favour on-pace types
- If #12 drifts past ~10 on final odds (market strongly against the banker) → consider PASS or Strategy B only

CONFIDENCE: MEDIUM
```

CAVEATS:
- **Model and market disagree on the favourite.** The market has #8 MAX QUE at 3.8, and it is the only runner that has raced this season (4th, 10 days ago). MC gives it only 19.2% place. `notes/2026-09-14-hv-turf-market-agreement-gate.md` found that HV Turf losses cluster where the model pick is not the market favourite. #12 is second favourite (5.4), so this is a partial disagreement, not a strong one.
- **Banker passes the HV MC ≥ 75 gate only narrowly.** #12 is on 76.6% raw MC Place% (`notes/2026-09-14-hv-trio-banker.md`). `notes/2026-09-15-hv-mc-place-calibration.md` finds HV MC place% over-confident: the 70–75% bucket actually placed about 59%. Treat the banker's real top-3 chance as nearer 60–65%, not 77%.
- **Summer-break fitness.** Eleven of the 12 runners have not raced for 66 days or more (#1 126 days, #11 105 days). #12 and #10 last ran 70 days ago. Only #8 has a run this season.
- **Class rise for the banker.** #12 (rating 82, 117 lb) comes off two HV 1800m wins, the latest in Class 2, and is weighted at the bottom of the handicap. #11 also carries 117 lb.
- **Finish-time projection conflicts with Win%.** The time projection puts #11 and #12 joint fastest but has #1 and #7 near the back (+5.4s / +5.8s). The Monte Carlo Win%/Place% ranking drives selection; the projection is not used.
- **SCMP odds unreliable.** The SCMP page's win/place figures are inconsistent (for example, #1 win 12 / place 13, #10 win 13 / place 20) and look like a different or stale market. HKJC odds from `fetch-odds.ts` (17:55 HKT) were used. With SCMP odds, #8 (5.3) would still be the only win-odds candidate. #6 (11) would also become replaceable, but #4 (23.0%) is still the lowest replaceable leg, so #8 would still replace #4 and the final Strategy B legs would not change. MC place odds were estimated from win odds.
- **Scraper distance log.** The analyzer printed "distance=1200m" while parsing the card, but the racecard, simulation and SCMP all use 1650m.
- **QP/Q matrix.** SCMP says the matrices are on the page, but the fetch did not return usable numbers, so they were not used for value cross-checks.
- **Vet reports.** No vet section was on the SCMP page, so no vet adjustments were applied.
- **Borderline Rule 8 legs.** #8 (20.2%) and #9 (21.2%) reach the 20% line only because of SCMP adjustments (+1 and +4). Without them, Strategy A would be 5 legs / 10 combos ($100).
- **Going.** Taken from the racecard (Good) and not independently confirmed on race night.

```
───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: #12 LE ZONDA (MC Win% 44.2%, MC Place% 76.6%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #1, #7, #11, #6, #4
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #4 HELENE FEELING (MC Place% 23.0%, Win odds 23)
  (#11 27.7% at 10 is not > 10; #6 25.2% at 8.8 is not > 10)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #8 MAX QUE (Win odds 3.8, MC Place% 19.2%)
  (#3 SAGACIOUS LIFE at 10 is not < 10)
Action: #8 replaced #4 (1-for-1 swap)
Final legs: #1, #7, #11, #6, #8
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET (banker #12 with every pair of legs):
  12-1-7, 12-1-11, 12-1-6, 12-7-11, 12-7-6,
  12-1-8, 12-7-8, 12-11-6, 12-11-8, 12-6-8
  (ordered by raw MC place-product proxy: 11.8%, 8.8%, 8.0%, 7.9%, 7.2%, 6.1%, 5.5%, 5.3%, 4.1%, 3.7%)
```

Comparison: both strategies use the same banker (#12) and share the legs #1, #7, #11, #6 and #8. Strategy A also includes #4 and #9 under Rule 8 (the SCMP trial and excuse credits lift #9 over 20%), so it costs $210 against $100. Strategy B swaps #4 out for the market favourite #8. Strategy B's 10 combos are all inside Strategy A's 21, so the extra $110 in A only pays if #4 or #9 fills the frame with #12.

```
═══════════════════════════════════════════════════════════
```
