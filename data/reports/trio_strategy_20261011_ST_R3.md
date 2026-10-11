# Trio (單T) Strategy — Sha Tin | 2026-10-11 | Race 3

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-11 | Race 3
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork / Win odds parsed (Place column and Q/QP matrix look mis-parsed, see caveats)
ODDS SOURCE: HKJC pool (fetch-odds.ts, data/odds/odds_20261011_ST.json, captured 11:24 HKT 11-Oct)
             SCMP odds: ✅ loaded (Win) | HKJC live: ✅ loaded (analyze-race.ts re-fetched win odds for 12 horses)

RACE: R3 LAM TEI HANDICAP — Class 4 | 1200m | Turf | Good | 12 runners
CLASSIFICATION: Competitive (top Adj Win% 26.0%) | POOL SIZE: 7
MODE: B: Standard Pool (6), expanded to 7 under Rule 8 (every horse with Adj Place% >= 20% must be in the pool)
BET STRUCTURE: 膽拖 1膽 + 6腳 = C(6,2) = 15
UNIT BET: $10 per combination (fixed)
```

## Step 1–2: Data summary

```
Meeting: Sha Tin 2026-10-11 | Going: Good | Surface: Turf
Target Race(s): R3 (Class 4 | 1200m | 12 runners)
Scratchings: none (reserve #R PRECISION MIND not drawn in)
Odds coverage: 12/12 horses with win odds
SCMP data: ✅ loaded (⚠️ partial: place-odds column and Q/QP matrix unreliable)
```

- Historical sync: skipped by instruction (already up to date). MC loaded 2,318 historical races / 2,335 horse performances.
- Form data: 11/12 enriched. #5 SILVER BLAZE has 0 form runs (no local race start, comeback from tendon injury). #4 MIGHTY PROFIT has 1 career start (not banker-eligible).
- Jockeys: 12/12 profiles; trainers: 11/12.

## SCMP data (Race 3)

| # | Horse | Win (SCMP) | Star Form signal | TIR flag | Vet flag | Trackwork | Style |
|---|-------|-----------|------------------|----------|----------|-----------|-------|
| 1 | CROSSBORDERDUDE | 5.2 | consistent placer (4 straight placings at 1200m) | +excuses (steadied, crowded) | clear | — | Stalker (speed-tracking) |
| 2 | CALL ME SPARKLE | 5.2 | "had to do it tough" last start | +excuses (wide, no cover) | clear | +trial (made all in blinkers, good-form trial) | Front / On-pace |
| 3 | INVINCIBLE STARR | 38 | "showed nothing" in 4 local sprints | — | -injury30d (both fore fetlocks, passed 19/09, 22 days) | — | — |
| 4 | MIGHTY PROFIT | 2.7 | 1 start (5th on debut) | +excuses (no clear running) | clear | +trial (won Conghua trial after slow start) | Closer |
| 5 | SILVER BLAZE | 25 | ordinary trials after tendon injury | — | tendon injury passed 31/08 (41 days, >30, no adj) | ordinary | — |
| 6 | HOLMES A COURT | 39 | resumed speed-duelling 8th | pressured in lead (not an excuse flag) | clear | — | Front-runner |
| 7 | MABUBU | 15 | resumed front-running 5th in blinkers | jumped awkwardly once (not repeated) | clear | — | Front-runner |
| 8 | LITTLE MONSTER | 8.1 | "Gate is a hurdle" (draw 10) | — | clear | — | On-pace |
| 9 | LUCKY DOCTOR | 12 | "fire blanks" | — | clear | — | Front-runner |
| 10 | WARRIORS DREAM | 27 | rated a point below his winning mark | +excuses (steadied twice) | clear | — | Stalker (box seat) |
| 11 | SUPER DRAGON | 23 | closing 7th from gate 11 | jumped only fairly once | clear | — | Closer |
| 12 | BEST FARM | 47 | beat nothing last time | — | clear | — | Back |

Tipster picks ignored.

```
───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 1 | CROSSBORDERDUDE | 24.0% | 55.5% | 5.8 | ✅ | ✅ | 9 | ★ 膽 (Banker) | 1-7: 11.9% (8.4) |
| 7 | MABUBU | 23.5% | 55.2% | 14 | ✅ | ❌ | 7 | 腳 (Leg) | 2-7: 7.0% (14.4) |
| 2 | CALL ME SPARKLE | 13.1% | 40.0% | 5.3 | ✅ | ✅ | 6 | 腳 (Leg) | 1-2: 7.1% (14.1) |
| 8 | LITTLE MONSTER | 11.6% | 36.5% | 6.9 | ✅ | ✅ | 10 | 腳 (Leg) | 1-8: 6.2% (16.3) |
| 6 | HOLMES A COURT | 11.1% | 35.4% | 37 | ✅ | ❌ | 10 | 腳 (Leg) | — |
| 10 | WARRIORS DREAM | 4.7% | 19.4% | 26 | ❌ | ❌ | 10 | — | — |
| 4 | MIGHTY PROFIT | 3.5% | 16.2% | 2.5 | ❌ | ✅ | 1 | 腳 (Leg), added directly | — (replacement candidate) |
| 5 | SILVER BLAZE | 3.2% | 14.5% | 31 | ❌ | ❌ | 0 | — | — |
| 11 | SUPER DRAGON | 2.3% | 11.3% | 28 | ❌ | ❌ | 8 | — | — |
| 9 | LUCKY DOCTOR | 2.0% | 9.8% | 14 | ❌ | ❌ | 9 | — | — |
| 12 | BEST FARM | 0.7% | 3.9% | 59 | ❌ | ❌ | 6 | — | — |
| 3 | INVINCIBLE STARR | 0.3% | 2.3% | 41 | ❌ | ❌ | 5 | — | — |

Market: overround 22.4%. MC flags #6 HOLMES A COURT (37x) and #7 MABUBU (14x) as heavily undervalued, and favourite #4 MIGHTY PROFIT (2.5x, 1 career start) as overvalued by 91%. The model's top two (#1, #7) are the market's 3rd and 5th picks.

```
───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────
```

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 1 | CROSSBORDERDUDE | 24.0% | 55.5% | excuses +2 | excuses +2 | 26.0% | 57.5% | 5.8 | A Atzeni | Stalk | +excuses | ★ 膽 (Banker) |
| 7 | MABUBU | 23.5% | 55.2% | 0 | 0 | 23.5% | 55.2% | 14 | C Y Ho | Front | — | 腳 (Leg) |
| 2 | CALL ME SPARKLE | 13.1% | 40.0% | excuses +2, trial +2 | excuses +2, trial +2 | 17.1% | 44.0% | 5.3 | J Orman | Front | +excuses, +trial | 腳 (Leg) |
| 6 | HOLMES A COURT | 11.1% | 35.4% | 0 | 0 | 11.1% | 35.4% | 37 | B Avdulla | Front | — | 腳 (Leg) |
| 8 | LITTLE MONSTER | 11.6% | 36.5% | -draw −1 | -draw −1 | 10.6% | 35.5% | 6.9 | K C Leung | On-pace | -draw (gate 10) | 腳 (Leg) |
| 4 | MIGHTY PROFIT | 3.5% | 16.2% | excuses +2, trial +2 | excuses +2, trial +2 | 7.5% | 20.2% | 2.5 | C L Chau (-2) | Close | +excuses, +trial | 腳 (Leg) |
| 10 | WARRIORS DREAM | 4.7% | 19.4% | excuses +2 | excuses +2 | 6.7% | 21.4% | 26 | E C W Wong (-3) | Stalk | +excuses | 腳 (Leg) |
| 5 | SILVER BLAZE | 3.2% | 14.5% | 0 | 0 | 3.2% | 14.5% | 31 | H Y Yuen (-7) | — | injury >30d (no adj) | — |
| 11 | SUPER DRAGON | 2.3% | 11.3% | 0 | 0 | 2.3% | 11.3% | 28 | A Badel | Close | — | — |
| 9 | LUCKY DOCTOR | 2.0% | 9.8% | 0 | 0 | 2.0% | 9.8% | 14 | P N Wong (-7) | Front | — | — |
| 12 | BEST FARM | 0.7% | 3.9% | 0 | 0 | 0.7% | 3.9% | 59 | M L Yeung | Back | — | — |
| 3 | INVINCIBLE STARR | 0.3% | 2.3% | -injury30d −3 | -injury30d −4 | 0.0% | 0.0% | 41 | M F Poon | — | -injury30d | — |

Note: ★ 膽 = Banker (1st by Adj Win%; #1 has 9 form runs, so it is banker-eligible). The 2nd-ranked horse, #7, has Adj Place% 55.2% (below 63%), so the ticket is 膽拖, not 雙膽拖. Adjustments are capped at the floor of 0% (#3). #8's −1 for its draw is a gate reducer (Rule 15). Rule 15 treats wide gates as reducers, never exclusions.

Reasoning: This is a competitive race: #1 and #7 are nearly level on top (MC 24.0% vs 23.5%), and the MC's top quinella is 1-7 at 11.9%. #1 is the most reliable placer (four straight placings at 1200m, bad luck last time). #2 gets a lift from its blinkers trial and a tough wide run. #6 and #8 each pass 35% Adj Place% on MC, so both are automatic inclusions. Favourite #4 (2.5x) has only one race start and the MC rates it low (16.2% place). Its trial win and excuses lift it to 20.2% Adj Place%, so Rule 8 (>= 20% must be in the pool) and Rule 9 (no exclusion at odds <= 15) both require it. #10 also passes 20% after its steadied-twice excuse. Pace: several front-runners (#6, #7, #2, #9) could set up a contested speed. That suits stalkers #1 and #10 and closer #4.

```
───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #1, #7, #2, #6, #8, #4, #10
MODE: B (expanded to 7 under Rule 8) | POOL SIZE: 7

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #1 CROSSBORDERDUDE (Adj Place% 57.5%) ← locked in every combo
腳 (Legs):  #7, #2, #6, #8, #4, #10
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
```

TOP TRIO COMBINATIONS (Harville trio probability from normalised Adj Win%; fair odds = 1/p):

| Rank | Horses (any order) | Trio Prob. | Est. Fair Odds |
|------|-------------------|-----------|----------------|
| 1 | #1, #7, #2 | 9.7% | $10.3 |
| 2 | #1, #7, #6 | 5.9% | $17.0 |
| 3 | #1, #7, #8 | 5.6% | $17.9 |
| 4 | #1, #2, #6 | 3.9% | $25.5 |
| 5 | #1, #7, #4 | 3.8% | $26.1 |

```
───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: 15 (膽拖: C(6,2), 6 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $150
Est. ticket hit probability (Harville, all 15 combos): ~49.7%

TOP COMBINATIONS (highest value):
  1-7-2 (9.7%), 1-7-6 (5.9%), 1-7-8 (5.6%), 1-2-6 (3.9%), 1-7-4 (3.8%),
  1-2-8 (3.7%), 1-7-10 (3.4%), 1-2-4 (2.6%), 1-2-10 (2.3%), 1-8-6 (2.3%)
  Remaining: 1-6-4, 1-8-4, 1-6-10, 1-8-10, 1-10-4

PASS CONDITIONS:
- If #1 CROSSBORDERDUDE (banker) is scratched → VOID ticket (do not restructure)
- If a leg is scratched → drop it (1膽 + 5腳 = 10 combos, $100)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft or worse → re-run MC; reconsider the front-runner legs (#6, #7)

CONFIDENCE: MEDIUM (clear two-horse MC top, but the market strongly disagrees on #4 and #7)

CAVEATS:
- Historical sync not re-run in this session (stated as already done).
- #4 MIGHTY PROFIT has 1 career start and #5 SILVER BLAZE has 0 form runs, so MC estimates for both are sparse-data. The market (#4 at 2.5x fav) may know more than the model.
- MC vs market divergence is large: MC rates #6 (37x) and #7 (14x) far above the market. Treat the edge as model-based, not confirmed.
- The SCMP "Place" column parsed as larger than Win for most horses, which is implausible, so place odds came from the HKJC fetch instead. The SCMP Q/QP matrix (e.g. Q 1-7 5.7, Q 7-8 10, QP 1-6 5.0) is internally inconsistent with the win market, so it is NOT used for decisions.
- Trio probabilities come from a Harville approximation on MC/Adj Win%. analyze-race.ts does not output trio probabilities directly.
- Pool expanded from the Mode B default of 6 to 7 because Rule 8 requires every horse with Adj Place% >= 20% (#4, #10) in the pool.
- Odds snapshot is 11:24 HKT. Re-check before the 13:30 off.
```

```
───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: #1 CROSSBORDERDUDE (MC Win% 24.0%, MC Place% 55.5%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #7 (55.2%), #2 (40.0%), #8 (36.5%), #6 (35.4%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none (all primary legs > 30%)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #4 MIGHTY PROFIT (Win odds 2.5, MC Place% 16.2%)
Action: #4 added directly (no replaceable leg)
Final legs: #7, #2, #8, #6, #4
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100
Est. ticket hit probability (Harville on raw MC Win%): ~41.5%

STRATEGY B TICKET: 膽 #1 / 腳 #7, #2, #8, #6, #4
  1-7-2 (9.5%), 1-7-8 (8.2%), 1-7-6 (7.8%), 1-2-8 (3.9%), 1-2-6 (3.7%),
  1-8-6 (3.2%), 1-7-4 (2.3%), 1-2-4 (1.1%), 1-8-4 (0.9%), 1-6-4 (0.9%)

Comparison: Strategy B uses the same banker (#1) and the same five core legs as Strategy A, minus #10 WARRIORS DREAM. #10 only qualifies for A through the SCMP excuses adjustment (raw MC Place% 19.4%). That makes B 5 combos and $50 cheaper ($100 vs $150).
═══════════════════════════════════════════════════════════
```
