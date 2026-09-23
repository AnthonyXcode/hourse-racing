# Trio Strategy — Happy Valley | 2026-09-23 | Race 4

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-23 | Race 4
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 2 scratchings (#3, #7)
MC SIMULATION: 10,000 iterations (analyze-race.ts --form-data all --use-saved --hide-actual)
SCMP DATA: ❌ Skipped (post-meeting blind run) — Step 3c not applied; Strategy A = raw MC
ODDS SOURCE: HKJC live pool, last snapshot before the off (momentum collector → data/odds/odds_20260923_HV.json,
             captured 20:09 HKT 23-Sep, "27s before post")
             SCMP odds: ❌ skipped | HKJC live: ✅ saved snapshot (win + place) | analyzer used win odds, place estimated

RACE: R4 — Class 4 | 1200m | Turf | Good | 10 runners (DEEP WATER BAY HANDICAP)
CLASSIFICATION: Competitive (#6 Adj Win% 34.7%, 20–35%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Happy Valley 2026-09-23 | Going: Good | Surface: Turf
Target Race(s): R4 (Class 4 | 1200m | 10 runners)
Scratchings: #3, #7 (absent from final pre-off odds snapshot; also absent from saved racecard) → field 10
Odds coverage: 10/10 horses with win and place odds (final pre-off snapshot)
SCMP data: ❌ unavailable (skipped — post-meeting blind run)
Form: 10/10 runners with form data; no debutants (fewest: #8 CHANCHENG SPARKLE, 3 runs)
Layoffs > 90 days: #5 JOKER ORBIT (168 d), #10 LUCKY XANDER (154 d), #4 BROWNNEEDSFURTHER (112 d),
                   #9 INVICTUS (94 d) — flagged
Other: #2/#8/#6/#12 returning from summer break (70–84 d); #1 backing up 7 days; #11 17 days
```

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 6 | CLOUD NINE | 34.7% | 69.1% | 1.7 | ✅ | ✅ | 4/2/12/4/2/4 | ★ 膽 (Banker) | 6-9: 13.5% (7.4) |
| 9 | INVICTUS | 16.5% | 48.2% | 6.6 | ✅ | ✅ | 4/4/3/7 | 腳 (Leg) | 6-8: 9.8% (10.2) |
| 8 | CHANCHENG SPARKLE | 11.9% | 40.3% | 23 | ✅ | ❌ | 4/2/5 | 腳 (Leg) | 6-11: 9.0% (11.1) |
| 11 | PODIUM | 10.8% | 37.8% | 12 | ✅ | ❌ | 9/2/4/1/1/7 | 腳 (Leg) | 4-6: 8.6% (11.6) |
| 4 | BROWNNEEDSFURTHER | 10.6% | 36.8% | 7.5 | ✅ | ✅ | 1/2/5/2/11/3 | 腳 (Leg) | 5-6: 7.0% (14.3) |
| 5 | JOKER ORBIT | 8.3% | 30.4% | 34 | ✅ | ❌ | 11/4/7/11/10/10 | 腳 (Leg) | — |
| 1 | FRIENDS OF SHAJING | 4.1% | 18.6% | 8.3 | ❌ | ✅ | 10/5/4/7/4/4 | 腳 (Leg) — added (replacement candidate) | — |
| 12 | FREE PONY | 1.4% | 8.3% | 38 | ❌ | ❌ | 10/8/9/8/3/3 | — | — |
| 2 | TACTICAL ACE | 1.3% | 7.4% | 29 | ❌ | ❌ | 8/12/12/7/11 | — | — |
| 10 | LUCKY XANDER | 0.5% | 3.1% | 53 | ❌ | ❌ | 12/10/10/14/14/11 | — | — |

Market: Overround 22.4%. MC agrees #6 CLOUD NINE is the one to beat but at 34.7% vs ~59% implied at 1.7 (favourite bias −41%). MC flags #8 CHANCHENG SPARKLE (23, +138%) and #5 JOKER ORBIT (34, +108%) as undervalued; #1 FRIENDS OF SHAJING (8.3, market 3rd fav) is rated only 4.1% by MC. Analyzer single bets: Place #8 (HK$438), Place #9 (HK$500), Place #11 (HK$62).

## STRATEGY A

### HORSE RANKINGS

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 6 | CLOUD NINE | 34.7% | 69.1% | 0 | 0 | 34.7% | 69.1% | 1.7 | Z Purton | — | — (skipped) | ★ 膽 (Banker) |
| 9 | INVICTUS | 16.5% | 48.2% | 0 | 0 | 16.5% | 48.2% | 6.6 | J Orman | — | — (skipped) | 腳 (Leg) |
| 8 | CHANCHENG SPARKLE | 11.9% | 40.3% | 0 | 0 | 11.9% | 40.3% | 23 | L Hewitson | — | — (skipped) | 腳 (Leg) |
| 11 | PODIUM | 10.8% | 37.8% | 0 | 0 | 10.8% | 37.8% | 12 | K Teetan | — | — (skipped) | 腳 (Leg) |
| 4 | BROWNNEEDSFURTHER | 10.6% | 36.8% | 0 | 0 | 10.6% | 36.8% | 7.5 | B Avdulla | — | — (skipped) | 腳 (Leg) |
| 5 | JOKER ORBIT | 8.3% | 30.4% | 0 | 0 | 8.3% | 30.4% | 34 | E C W Wong (-3) | — | — (skipped) | 腳 (Leg) |
| 1 | FRIENDS OF SHAJING | 4.1% | 18.6% | 0 | 0 | 4.1% | 18.6% | 8.3 | C L Chau (-2) | — | — | — |
| 12 | FREE PONY | 1.4% | 8.3% | 0 | 0 | 1.4% | 8.3% | 38 | M L Yeung | — | — | — |
| 2 | TACTICAL ACE | 1.3% | 7.4% | 0 | 0 | 1.3% | 7.4% | 29 | M Chadwick | — | — | — |
| 10 | LUCKY XANDER | 0.5% | 3.1% | 0 | 0 | 0.5% | 3.1% | 53 | M F Poon | — | — | — |

Factor columns are `0` for all runners: SCMP skipped (post-meeting blind run), so Adj = raw MC. Running style not assessed (no SCMP Star Form).

Reasoning: #6 CLOUD NINE (Purton, draw 2, top-rated 66 on MC, 8 runs, consistent 4/2/12/4/2/4) is the MC #1 at 34.7% — just under the 35% Dominant line, so the race classifies as Competitive → Mode B (6 horses). Top 3 by Adj Win% (#6, #9, #8) + next 3 by Adj Place% (#11, #4, #5). All six have Adj Place% ≥ 25% (must-include rule satisfied), and no other runner reaches the 20% Rule-8 threshold. #6 has 8 starts → eligible banker. 2nd-ranked #9 (Adj Place% 48.2%) < 63% → no 雙膽拖. #1 FRIENDS OF SHAJING (8.3, market 3rd fav) is left out of A on MC grounds (18.6% place, rated 51); Rule 9 concerns negative-flag exclusions and no flags apply — it is covered in Strategy B. HV 1200m favours on-pace runners: #11 (draw 1), #6 (draw 2), #5 (draw 3), #9 (draw 4) have the inside gates.

### TRIO POOL (any order)

```
POOL: #6, #9, #8, #11, #4, #5
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #6 CLOUD NINE (Adj Place% 69.1%) ← locked in every combo
腳 (Legs):  #9, #8, #11, #4, #5
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville trio probability from MC Win%; fair odds = 1/p):

| Rank | Horses (any order) | Est. Trio Prob | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #6, #9, #8 | 9.4% | $11 |
| 2 | #6, #9, #11 | 8.4% | $12 |
| 3 | #6, #9, #4 | 8.3% | $12 |
| 4 | #6, #9, #5 | 6.3% | $16 |
| 5 | #6, #8, #11 | 5.7% | $18 |

### TICKET SUMMARY

```
COMBINATIONS: 10 (膽拖: C(5,2), 5 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

TOP COMBINATIONS (highest value):
  6-9-8 (9.4%), 6-9-11 (8.4%), 6-9-4 (8.3%), 6-9-5 (6.3%), 6-8-11 (5.7%),
  6-8-4 (5.6%), 6-11-4 (5.0%), 6-8-5 (4.2%), 6-11-5 (3.8%), 6-4-5 (3.7%)
  Estimated ticket coverage (Harville): ~60.4%

PASS CONDITIONS:
- If #6 CLOUD NINE (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good)
- Banker at 1.7 means low Trio dividends on combos with #9/#4; value comes from #8/#11/#5 filling the frame

CONFIDENCE: MEDIUM (clear MC and market top pick, but 34.7% win is borderline-dominant and the rest of the field is bunched at 30–48% place)

CAVEATS:
- SCMP skipped (post-meeting blind run): no Star Form / TIR / Vet / Trackwork / QP-Q matrix; Strategy A = raw MC.
- Scratchings #3 and #7 inferred from their absence in the final pre-off odds snapshot.
- Analyzer used win odds only and estimated place odds, so Place-bet edges are approximate.
- Trio combo probabilities use a Harville approximation from MC Win%, not a direct MC trio count.
- Layoffs > 90 days for #4, #5, #9 (all in the pool) and #10 — fitness unverified without SCMP/trackwork.
- #8 CHANCHENG SPARKLE has only 3 career runs; its MC rating is based on sparse form.
- Finish-time projection (speed figures) disagrees with Win% ranking — it has #8 fastest and #11 PODIUM slowest-but-one; treat #11's place chance with some caution.
- Historical sync, live odds fetch and SCMP deliberately not run (blind run); historical data used as already on disk.
```

## STRATEGY B (MC-only)

```
Banker: #6 CLOUD NINE (MC Win% 34.7%, MC Place% 69.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #9, #8, #11, #4, #5
Replaceable legs (MC Place% 20–30% AND Win odds > 10): none
    (#5 JOKER ORBIT 30.4% at 34 → just above the 30% ceiling, not replaceable)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10):
    #1 FRIENDS OF SHAJING (Win odds 8.3, MC Place% 18.6%)
Action: added directly (no replaceable leg)
Final legs: #9, #8, #11, #4, #5, #1
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #6 / 腳 #9, #8, #11, #4, #5, #1 (15 combos)
  6-9-8 (9.4%), 6-9-11 (8.4%), 6-9-4 (8.3%), 6-9-5 (6.3%), 6-8-11 (5.7%),
  6-8-4 (5.6%), 6-11-4 (5.0%), 6-8-5 (4.2%), 6-11-5 (3.8%), 6-4-5 (3.7%),
  6-9-1 (3.0%), 6-8-1 (2.0%), 6-11-1 (1.8%), 6-4-1 (1.7%), 6-5-1 (1.3%)
  Estimated ticket coverage (Harville): ~70.3%
```

Comparison: Same banker and same five legs as Strategy A; Strategy B adds #1 FRIENDS OF SHAJING on the market signal (8.3), taking the ticket from 10 to 15 combos ($100 → $150) for ~10 points more estimated coverage.

```
═══════════════════════════════════════════════════════════
```
