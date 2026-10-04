# Trio (單T) Strategy — Sha Tin | 2026-10-04 | Race 4

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-04 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good (from racecard) | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all, 2,298 historical races, 14/14 horses enriched)
SCMP DATA: ⚠️ Partial | Star Form / TIR / Vet / Trackwork / Win odds parsed; QP/Q matrix not parsed
ODDS SOURCE: HKJC early-morning pool (fetch-odds.ts, captured 10:22 HKT 04-Oct)
             SCMP odds: ✅ loaded (win; place column unreliable) | HKJC live: ✅ loaded (analyze-race refresh)

RACE: R4 LO WAI HANDICAP — Class 5 | 1400m | Turf | Good | 14 runners
CLASSIFICATION: Dominant (top Adj Win% 37.5%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE: 膽拖 1膽 + 4腳 = C(4,2) = 6 combos
UNIT BET: $10 per combination (fixed)
```

## Data Validation Summary

```
Meeting: Sha Tin 2026-10-04 | Going: Good | Surface: Turf
Target Race(s): R4 (Class 5 | 1400m | 14 runners)
Scratchings: none (reserve R. GOR GOR not in field)
Odds coverage: 14 horses with odds
SCMP data: ⚠️ partial (Q/QP matrix not extracted)
```

- [x] Racing confirmed (SCMP: Sunday 4 Oct 2026, Sha Tin)
- [x] ≥3 starters (14)
- [x] Odds for all 14 horses
- [x] Jockey stats (14 profiles) and trainer stats (14 profiles) loaded
- [x] All 14 horses have ≥6 past runs (no debutants, no sparse form)
- [!] #11 MY FLYING ANGEL has been off 189 days (lame right fore 14-Apr, passed vet 15-Sep).
- [!] The scraper log printed `distance=1200m` during parsing. The enriched racecard, MC output and SCMP all say **1400m Turf**, so this is treated as a log artefact (the same thing happened on R3).
- [!] analyze-race estimated place odds from win odds.

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 4 | RATTAN GALAXY | 36.5% | 69.6% | 11 | ✅ | ❌ | 1-2-6-11-9-5 | ★ 膽 (Banker) | 4-13: 15.0% (6.7) |
| 13 | SUPERB GUY | 17.8% | 48.9% | 6.2 | ✅ | ✅ | 3-11-7-4-2-8 | 腳 (Leg) | 4-8: 14.2% (7.1) |
| 8 | THE ALL ROUNDER | 17.6% | 47.7% | 3.0 | ✅ | ✅ | 2-4-5-9-3-6 | 腳 (Leg) | 8-13: 7.2% (13.9) |
| 9 | COLOURFUL WINNER | 6.3% | 26.0% | 12 | ✅ | ❌ | 4-9-9-2-4-10 | — (replaced by #6) | 4-9: 5.9% (16.9) |
| 14 | SUPREME WINNER | 4.3% | 19.0% | 19 | ❌ | ❌ | 9-7-3-10-5-1 | — | 4-14: 3.9% (26.0) |
| 6 | PERIDOT | 3.7% | 16.2% | 7.4 | ❌ | ✅ | 4-6-11-5-3-11 | 腳 (Leg), replacement candidate | — |
| 3 | SEA DIAMOND | 3.5% | 15.7% | 21 | ❌ | ❌ | 6-9-6-12-8-11 | — | — |
| 12 | TEAM HAPPY | 3.2% | 15.8% | 22 | ❌ | ❌ | 1-6-3-2-4-11 | — | — |
| 7 | SPEEDY TRIDENT | 2.2% | 10.7% | 13 | ❌ | ❌ | 11-3-2-5-9-14 | — | — |
| 2 | LIGHTNING ACE | 1.3% | 7.2% | 14 | ❌ | ❌ | 8-7-4-7-6-10 | — | — |
| 1 | TURBO JEFFERIES | 1.3% | 7.6% | 23 | ❌ | ❌ | 8-8-5-10-9-7 | — | — |
| 5 | MADE FOR LIFE | 1.2% | 7.0% | 24 | ❌ | ❌ | 6-4-8-6-10-13 | — | — |
| 11 | MY FLYING ANGEL | 0.7% | 5.2% | 26 | ❌ | ❌ | 9-6-4-5-4-5 | — | — |
| 10 | SMART CITY | 0.4% | 3.3% | 66 | ❌ | ❌ | 10-10-7-14-10-6 | — | — |

Market: overround is 23.7% and favourite bias is −47.3%. MC rates #4 RATTAN GALAXY at 36.5% win against roughly 9% implied at 11, a +301% overlay and the race's main value. The favourite #8 (3.0) is overbet relative to MC's 17.6%, and so is #6 PERIDOT (7.4, MC 3.7%). #2 and #11 are each flagged as about 80% overvalued. Projected finish times have #4 first in 1:22.05, with #9 0.14s behind.

---

## STRATEGY A — HORSE RANKINGS

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 4 | RATTAN GALAXY | 36.5% | 69.6% | +form +1 | +form +1 | 37.5% | 70.6% | 11 | L Ferraris | Front / box-seat | +form | ★ 膽 (Banker) |
| 13 | SUPERB GUY | 17.8% | 48.9% | excuses +2 | excuses +2 | 19.8% | 50.9% | 6.2 | Z Purton | Midfield | +excuses | 腳 (Leg) |
| 8 | THE ALL ROUNDER | 17.6% | 47.7% | excuses +2 | excuses +2 | 19.6% | 49.7% | 3.0 | C Y Ho | Closer | +excuses | 腳 (Leg) |
| 6 | PERIDOT | 3.7% | 16.2% | excuses +2, +form +1 | excuses +2, +form +1 | 6.7% | 19.2% | 7.4 | J Orman | Closer | +excuses, +form | 腳 (Leg) |
| 9 | COLOURFUL WINNER | 6.3% | 26.0% | 0 | 0 | 6.3% | 26.0% | 12 | M L Yeung | Stalker | — | 腳 (Leg) |
| 12 | TEAM HAPPY | 3.2% | 15.8% | excuses +2, +form +1 | excuses +2, +form +1 | 6.2% | 18.8% | 22 | M F Poon | Midfield | +excuses, +form | — |
| 3 | SEA DIAMOND | 3.5% | 15.7% | excuses +2 | excuses +2 | 5.5% | 17.7% | 21 | H Y Yuen (-7) | Closer | +excuses | — |
| 2 | LIGHTNING ACE | 1.3% | 7.2% | excuses +2, trial +2 | excuses +2, trial +2 | 5.3% | 11.2% | 14 | M Chadwick | Stalker | +excuses, +trial | — |
| 14 | SUPREME WINNER | 4.3% | 19.0% | 0 | 0 | 4.3% | 19.0% | 19 | A Badel | Closer | — | — |
| 10 | SMART CITY | 0.4% | 3.3% | excuses +2 | excuses +2 | 2.4% | 5.3% | 66 | B Avdulla | Midfield | +excuses | — |
| 1 | TURBO JEFFERIES | 1.3% | 7.6% | 0 | 0 | 1.3% | 7.6% | 23 | H Bentley | Closer | — | — |
| 5 | MADE FOR LIFE | 1.2% | 7.0% | 0 | 0 | 1.2% | 7.0% | 24 | R Kingscote | Midfield | — | — |
| 7 | SPEEDY TRIDENT | 2.2% | 10.7% | -injury30d −3 (floor 0.1) | -injury30d −4 | 0.1% | 6.7% | 13 | K Teetan | Closer | -injury30d (bled) | — |
| 11 | MY FLYING ANGEL | 0.7% | 5.2% | -injury30d −3 (floor 0.1) | -injury30d −4 | 0.1% | 1.2% | 26 | C L Chau (-2) | Closer | -injury30d (lame) | — |

Factor sources (SCMP; tipster picks ignored):
- **#4 +form +1**: "near win dictating the pace at his final outing. Resumed a winner after a box-seat run."
- **#13 excuses +2**: "On jumping was checked and lost ground when badly crowded… held up for clear running"; Star Form says "Had nothing go right when a neck third to Rattan Galaxy".
- **#8 excuses +2**: "Resumed second without a clear run until the 250m settling last from gate 14"; TIR says "held up for clear running".
- **#6**: excuses +2 for being "steadied and shifted out" near the 250M, and +form +1 for "Resumed a rallying fourth from gate 13".
- **#12**: excuses +2 for being "unbalanced… raced wide and without cover… dropped his right rein", and +form +1 because he "Saluted… first up over the Valley 1,200m".
- **#3 excuses +2**: "On jumping was badly crowded".
- **#2**: excuses +2 for "Approaching the 900M was steadied", and trial +2 because he "Galloped strongly on the dirt Thursday… scope for improvement".
- **#10 excuses +2**: "steadied to avoid a runner".
- **#7 −injury30d**: he bled ("substantial amount of blood in the trachea") at his run last month and has since passed a vet exam, so the clearance is inside 30 days.
- **#11 −injury30d**: lame right fore, passed the vet on 15-Sep-2026 (19 days ago); off 189 days.
- **No adjustment**: #1 (a single "jumped only fairly") and #5 (a single "bumped"). #9's bleed was last term, with no current vet entry. #14 has no flags.

Reasoning: #4 is the clear MC top. It has the best rating (71, 4+ points clear), 8 runs at the trip, won first-up last month with #13 a neck behind in third, and is projected fastest. Gate 10 is a concern, but he can lead or sit box-seat. #13 (Purton) and #8 (the favourite) are near-identical on about 50% Adj Place%, and both are coming off unlucky runs in that same race (Race 019). #9 is the only other horse above 25% Adj Place% (must-include). For the 5th slot, #6 (19.2%) edges #14 (19.0%) and #12 (18.8%) on Adj Place% and is also 3rd in the market at 7.4. The pace should be honest, with #4, #9 and #2 on speed, which suits the closers #8 and #6.

Rule 9 check: #7 SPEEDY TRIDENT (13) and #2 LIGHTNING ACE (14) are 15 or shorter but sit outside the pool. That is down to their low MC rankings (raw MC Place% of 10.7% and 7.2%), not a flag-based exclusion, so they stay out.

## STRATEGY A — TRIO POOL (any order)

```
POOL: #4, #13, #8, #9, #6
MODE: A (Dominant, #4 Adj Win% 37.5% ≥ 35%) | POOL SIZE: 5
  Banker + 4 by Adj Place%: #13 (50.9), #8 (49.7), #9 (26.0), #6 (19.2)

膽拖 STRUCTURE (1st-ranked horse = Banker; #4 has 10 starts → eligible):
膽 (Banker): #4 RATTAN GALAXY (Adj Place% 70.6%) ← locked in every combo
腳 (Legs):   #13, #8, #9, #6
2nd-ranked #13 Adj Place% 50.9% < 63% → no 雙膽拖
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

Top Trio combinations. Combined probability is a Harville estimate from Adj Win%, normalised across all 14 runners. It is indicative only and understates place-heavy types.

| Rank | Horses (any order) | Combined Prob | Est. Fair Odds | In Strategy A ticket |
|------|--------------------|---------------|----------------|----------------------|
| 1 | #4, #8, #13 | 13.1% | $7.6 | ✅ |
| 2 | #4, #6, #13 | 3.9% | $25.7 | ✅ |
| 3 | #4, #6, #8 | 3.8% | $26.0 | ✅ |
| 4 | #4, #9, #13 | 3.6% | $27.4 | ✅ |
| 5 | #4, #8, #9 | 3.6% | $27.8 | ✅ |
| 6 | #4, #12, #13 | 3.6% | $27.9 | ❌ |
| 7 | #4, #8, #12 | 3.5% | $28.2 | ❌ |
| — | #4, #6, #9 | 1.1% | $90 | ✅ |

Coverage (Harville): the ticket covers about 29% of outcomes. The two MC quinellas 4-13 (15.0%) and 4-8 (14.2%) both run through the ticket. Value comes from #4 at 11 being the market's 4th pick, so any trio with #4 should pay well above the model's fair odds.

## STRATEGY A — TICKET SUMMARY

```
COMBINATIONS: 6 (膽拖: 1膽 #4 + 4腳 #13, #8, #9, #6 → C(4,2))
UNIT BET: $10 (fixed)
TOTAL STAKE: $60

TICKETS:
  4-8-13, 4-6-13, 4-6-8, 4-9-13, 4-8-9, 4-6-9

PASS CONDITIONS:
- If #4 RATTAN GALAXY is scratched → VOID ticket (do not restructure)
- If a leg is scratched → play remaining legs (e.g. 3 legs → 3 combos, $30)
- If field drops below 3 → pool refunded
- If going turns Yielding/Soft or worse → reconsider; #4's on-pace trip from gate 10 becomes harder

CONFIDENCE: MEDIUM (strong MC banker and big market overlay; legs 3–4 are thin at ~19–26% place)

CAVEATS:
- #4 is drawn wide (gate 10) in a 14-runner field. If he has to work early to cross, the banker can fail, and a banker miss loses every ticket.
- MC and the market disagree sharply on #4 (36.5% vs ~9% implied), so part of the edge may be model overconfidence.
- SCMP is partial: the Q/QP matrix was not extracted, and SCMP's place-odds column looked unreliable. HKJC pool odds were used throughout. SCMP win odds differ slightly (e.g. #4 15, #8 2.8, #13 7.8).
- #6, #14 and #12 are separated by only 0.4% Adj Place% for the last leg slot.
- The scraper log showed "distance=1200m". The racecard, MC and SCMP all use 1400m.
- Odds snapshot is from 10:22 HKT. Re-check before the jump.
```

---

## STRATEGY B (MC-only)

```
Banker: #4 RATTAN GALAXY (MC Win% 36.5%, MC Place% 69.6%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #13 (48.9%), #8 (47.7%), #9 (26.0%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #9 COLOURFUL WINNER (MC Place% 26.0%, Win odds 12)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #6 PERIDOT (Win odds 7.4, MC Place% 16.2%)
  (#13 at 6.2 and #8 at 3.0 are already primary legs)
Action: #6 replaced #9 (1-for-1 swap)
Final legs: #13, #8, #6
BET STRUCTURE: 膽拖 | 1膽 + 3腳 | COMBINATIONS: C(3,2) = 3
UNIT BET: $10 (fixed)
TOTAL STAKE: $30

STRATEGY B TICKET:
  4-8-13, 4-6-13, 4-6-8
```

Strategy B's Harville coverage on raw MC is about 24.6%, and 4-8-13 alone is 18.2%.

Comparison: both strategies bank #4 and share #13, #8 and #6. Strategy A also keeps #9 (Adj Place% 26.0% ≥ 25% must-include), which adds 4-9-13, 4-8-9 and 4-6-9 for an extra $30. Strategy B drops #9 because the market likes #6 more, giving a cheaper $30 ticket that misses any trio including #9.

═══════════════════════════════════════════════════════════
