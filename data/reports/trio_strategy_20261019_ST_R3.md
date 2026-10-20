# Trio (單T) Strategy — Sha Tin | 2026-10-19 | Race 3

> Retrospective run (generated 2026-10-20, blind to results; odds = final SP)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-19 | Race 3
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all --use-saved --hide-actual)
SCMP DATA: ❌ Unavailable (retrospective run — SCMP racecard/3 now shows 21-Oct Happy Valley card)
ODDS SOURCE: Final starting prices (SP) from saved race-day snapshot
             (data/racecards/racecard_20261019_ST_R3.json, printed by analyze-race.ts)
             SCMP odds: ❌ unavailable | HKJC live: ❌ no longer available (meeting completed)

RACE: R3 — Class 4 | 1800m | Turf | Good | 14 runners
CLASSIFICATION: Dominant (top Adj Win% 43.4% ≥ 35%) | POOL SIZE: 5
MODE: A: Tight Pool (5)
BET STRUCTURE: 膽拖 1膽 + 4腳 = C(4,2) = 6
UNIT BET: $10 per combination (fixed)
```

## Step 1–2: Data summary

```
Meeting: Sha Tin 2026-10-19 | Going: Good | Surface: Turf
Target Race(s): R3 (Class 4 | 1800m | 14 runners) — Chun Shek Handicap
Scratchings: none
Odds coverage: 14/14 horses with win odds (final SP)
SCMP data: ❌ unavailable (retrospective run)
```

- ≥3 starters ✅ (14) · odds populated ✅ · jockey/trainer stats ✅ (from historical data)
- Form coverage: all 14 runners have form; #10 BIG BIG WORLD (3 runs) and #4 SUGAR GOODSON (4 runs) are lightly raced.
- Layoff flag: #3 DOUBLE WIN last ran 27-Jun-2026 (~114 days off, >90 days).
- Steps 1b/1c/1d (sync-historical, fetch-odds, live racecard) intentionally skipped per retrospective instructions; data was pre-prepared.

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 2 | VICTOR SUPREME | 43.4% | 78.4% | 3.8 | ✅ | ✅ | 2/9/1/2/5/4 | ★ 膽 (Banker) | 2-5: 23.7% (4.2) |
| 5 | AMAZING GAZE | 22.5% | 60.5% | 4.3 | ✅ | ✅ | 6/1/6/6/6/8 | 腳 (Leg) | 2-5: 23.7% (4.2) |
| 3 | DOUBLE WIN | 12.7% | 45.1% | 22 | ✅ | ❌ | 8/1/2/5/3/10 | 腳 (Leg) | 2-3: 14.0% (7.2) |
| 11 | SUPREME MASTERMIND | 7.5% | 31.2% | 16 | ✅ | ❌ | 3/5/9/8/9/9 | 腳 (Leg) | 2-11: 8.6% (11.6) |
| 9 | LUCKY YEAR | 4.4% | 22.4% | 3.3 | ✅ | ✅ | 6/2/4/3/3/2 | 腳 (Leg) | 2-9: 5.7% (17.5) |
| 6 | LUCKY BALERION | 3.2% | 18.4% | 9.0 | ❌ | ✅ | 7/2/2/6/9/6 | 腳 (Leg) — added (win-odds candidate) | — |
| 12 | KING OF SELECTION | 2.3% | 11.8% | 19 | ❌ | ❌ | 4/4/12/12/12/11 | — | — |
| 4 | SUGAR GOODSON | 1.0% | 7.4% | 129 | ❌ | ❌ | 13/13/10/8 | — | — |
| 7 | VOLCANIC SPARK | 0.9% | 6.4% | 31 | ❌ | ❌ | 10/11/5/1/2/8 | — | — |
| 8 | ROMANTIC FANTASY | 0.8% | 6.1% | 48 | ❌ | ❌ | 9/1/5/8/14/1 | — | — |
| 10 | BIG BIG WORLD | 0.6% | 4.4% | 94 | ❌ | ❌ | 9/13/11 | — | — |
| 1 | DREAMING TOGETHER | 0.5% | 4.9% | 31 | ❌ | ❌ | 3/10/11/6/7/13 | — | — |
| 13 | GOOD GOOD | 0.3% | 2.3% | 102 | ❌ | ❌ | 14/14/12/7/9/2 | — | — |
| 14 | ON THE LASH | 0.0% | 0.7% | 22 | ❌ | ❌ | 8/12/9/1/13/5 | — | — |

Other MC quinellas: 3-5: 7.1% (14.1).

Market: Overround 22.9%. Market favourite is #9 LUCKY YEAR (3.3) but MC has it only 5th (4.4% win, 22.4% place). MC flags it as overvalued by 86%. #3 DOUBLE WIN (22) is the main MC overlay, undervalued by 179%; the projected finish time also ranks it fastest (1:46.93). #14 ON THE LASH (22) is overvalued. MC agrees with the market on #2 and #5 at the top.

## STRATEGY A — HORSE RANKINGS

SCMP was unavailable, so no SCMP adjustments were applied. Adj = raw MC.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 2 | VICTOR SUPREME | 43.4% | 78.4% | 0 | 0 | 43.4% | 78.4% | 3.8 | C Y Ho | — | n/a | ★ 膽 (Banker) |
| 5 | AMAZING GAZE | 22.5% | 60.5% | 0 | 0 | 22.5% | 60.5% | 4.3 | Z Purton | — | n/a | 腳 (Leg) |
| 3 | DOUBLE WIN | 12.7% | 45.1% | 0 | 0 | 12.7% | 45.1% | 22 | M Chadwick | — | n/a | 腳 (Leg) |
| 11 | SUPREME MASTERMIND | 7.5% | 31.2% | 0 | 0 | 7.5% | 31.2% | 16 | L Ferraris | — | n/a | 腳 (Leg) |
| 9 | LUCKY YEAR | 4.4% | 22.4% | 0 | 0 | 4.4% | 22.4% | 3.3 | H Bentley | — | n/a | 腳 (Leg) |
| 6 | LUCKY BALERION | 3.2% | 18.4% | 0 | 0 | 3.2% | 18.4% | 9.0 | M F Poon | — | n/a | — (reserve) |
| 12 | KING OF SELECTION | 2.3% | 11.8% | 0 | 0 | 2.3% | 11.8% | 19 | A Atzeni | — | n/a | — |
| 4 | SUGAR GOODSON | 1.0% | 7.4% | 0 | 0 | 1.0% | 7.4% | 129 | K C Leung | — | n/a | — |
| 7 | VOLCANIC SPARK | 0.9% | 6.4% | 0 | 0 | 0.9% | 6.4% | 31 | R Kingscote | — | n/a | — |
| 8 | ROMANTIC FANTASY | 0.8% | 6.1% | 0 | 0 | 0.8% | 6.1% | 48 | A Badel | — | n/a | — |
| 10 | BIG BIG WORLD | 0.6% | 4.4% | 0 | 0 | 0.6% | 4.4% | 94 | M L Yeung | — | n/a | — |
| 1 | DREAMING TOGETHER | 0.5% | 4.9% | 0 | 0 | 0.5% | 4.9% | 31 | K Teetan | — | n/a | — |
| 13 | GOOD GOOD | 0.3% | 2.3% | 0 | 0 | 0.3% | 2.3% | 102 | Y L Chung | — | n/a | — |
| 14 | ON THE LASH | 0.0% | 0.7% | 0 | 0 | 0.0% | 0.7% | 22 | P N Wong | — | n/a | — |

Note: ★ 膽 = Banker, the horse ranked 1st by Adj Win%. #2 has 10 career starts, so it is eligible. 雙膽拖 does not apply because the 2nd-ranked #5 has Adj Place% 60.5%, below the 63% threshold. Running style is "—" because SCMP Star Form was not available.

**Reasoning.** #2 VICTOR SUPREME is the dominant MC pick at 43.4% win and 78.4% place. It has the highest rating (59, top weight 135), recent form of 2/9/1/2, and C Y Ho riding. Draw 7 is workable. This makes the race Dominant, so Mode A applies. Four horses have Adj Place% of at least 20%, and all of them make the pool:

- #5 AMAZING GAZE (60.5%): Purton, 22% strike rate, draw 5.
- #3 DOUBLE WIN (45.1%): gate 1 and the fastest projected time, but returning from about 114 days off.
- #11 SUPREME MASTERMIND (31.2%): wide gate 12.
- #9 LUCKY YEAR (22.4%): the market favourite. It is consistently placed (2/4/3/3/2), but MC rates it as overbet.

#6 LUCKY BALERION (9.0) sits just outside the 5-horse Mode A pool at 18.4% Adj Place%. Rule 9 (no hard exclusion at odds ≤15) covers exclusion based on negative flags. #6 has no flags; it is outside the pool only because of pool size. It is the first reserve.

## STRATEGY A — TRIO POOL (any order)

```
POOL: #2, #5, #3, #11, #9
MODE: A | POOL SIZE: 5

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #2 VICTOR SUPREME (Adj Place% 78.4%) ← locked in every combo
腳 (Legs):  #5, #3, #11, #9
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = 6
```

TOP TRIO COMBINATIONS. Probabilities are Harville estimates derived from MC Win%. Harville overweights favourites, so treat these as relative rankings.

| Rank | Horses (any order) | Est. Trio Prob | Est. Fair Odds |
|------|--------------------|----------------|----------------|
| 1 | #2, #5, #3 | 23.9% | $4 |
| 2 | #2, #5, #11 | 13.2% | $8 |
| 3 | #2, #5, #9 | 7.5% | $13 |
| 4 | #2, #3, #11 | 6.3% | $16 |
| 5 | #2, #3, #9 | 3.5% | $28 |
| 6 | #2, #11, #9 | 1.9% | $52 |

## STRATEGY A — TICKET SUMMARY

```
COMBINATIONS: 6 (膽拖: C(4,2), 4 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $60
TICKET: 膽 #2 拖 #3, #5, #9, #11
Est. coverage (Harville): ~56%

TOP COMBINATIONS (highest value):
  2-5-3 (23.9%) · 2-5-11 (13.2%) · 2-5-9 (7.5%) · 2-3-11 (6.3%) · 2-3-9 (3.5%) · 2-11-9 (1.9%)
  Value note: combos with #3 (22) and #11 (16) should pay well above fair odds.
  Combos with #9 (3.3 fav) will be underpaid relative to MC.

PASS CONDITIONS:
- If #2 VICTOR SUPREME (banker) is scratched → VOID ticket
- If a leg is scratched → replace with #6 LUCKY BALERION (next by Adj Place%)
- If field drops below 3 → pool refunded
- If going changes to Yielding/Soft → reconsider (MC was run on Good)

CONFIDENCE: MEDIUM-HIGH (dominant MC banker that the market also supports at 3.8. Lowered from HIGH because there are no SCMP form, vet or trial checks.)

CAVEATS:
- Retrospective run: generated 2026-10-20, blind to results. Steps 1b/1c (sync-historical, fetch-odds) were skipped by instruction because data was pre-prepared.
- Odds are final SP (starting prices), not the morning odds that a pre-race run would have used. The market comments and the
  win-odds<10 flags reflect closing prices.
- SCMP unavailable (retrospective run): the SCMP racecard now shows the 21-Oct Happy Valley meeting. No Star Form/TIR/Vet/
  Trackwork adjustments were applied, and no QP/Q matrix cross-check was possible. Strategy A therefore equals raw MC rankings.
- #3 DOUBLE WIN returns from about 114 days off with no trial or vet information. Its high MC place% (45.1%) depends on
  older form.
- Place odds were estimated from win odds by the tool.
- Trio combo probabilities are Harville approximations, not direct MC trio frequencies.

═══════════════════════════════════════════════════════════
```

## STRATEGY B (MC-only)

```
Banker: #2 VICTOR SUPREME (MC Win% 43.4%, MC Place% 78.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #5 (60.5%), #3 (45.1%), #11 (31.2%), #9 (22.4%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
  (#9 is 22.4% but odds 3.3 < 10; #11 is 31.2% > 30%)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #6 LUCKY BALERION (Win odds 9.0, MC Place% 18.4%)
Action: #6 added directly (no replaceable leg)
Final legs: #5, #3, #11, #9, #6
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #2 拖 #3, #5, #6, #9, #11
  Combos: 2-5-3, 2-5-11, 2-5-9, 2-5-6, 2-3-11, 2-3-9, 2-3-6, 2-11-9, 2-11-6, 2-9-6
  Est. coverage (Harville): ~67%
```

**A vs B:** Both strategies use the same banker (#2) and the same four core legs. Strategy B adds #6 LUCKY BALERION through the win-odds rule (9.0 SP), which takes it from 6 to 10 combos ($60 to $100). That buys about 10 percentage points of estimated coverage, mostly through 2-5-6 and 2-3-6.

```
═══════════════════════════════════════════════════════════
```
