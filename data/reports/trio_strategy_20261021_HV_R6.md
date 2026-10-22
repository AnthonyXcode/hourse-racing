# Trio (單T) Strategy — Happy Valley | 2026-10-21 | Race 6

> Pre-race run, generated 2026-10-21 (night meeting, R6 THE LONGINES CUP, off 9:10pm)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-21 | Race 6
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork parsed | ⚠️ odds columns unlabelled, QP/Q matrix not mappable
ODDS SOURCE: HKJC early-morning pool (fetch-odds.ts → data/odds/odds_20261021_HV.json, captured 11:01 HKT 21-Oct)
             SCMP odds: ⚠️ loaded (unlabelled columns, cross-check only) | HKJC live: ✅ loaded by analyze-race.ts

RACE: R6 — Class 2 | 1000m | Turf ("B" course) | Good | 10 runners (THE LONGINES CUP, Rating 100-75)
CLASSIFICATION: Competitive (top Adj Win% 33.9%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 雙膽拖 2膽 + 4腳 = 4 combos (2nd-ranked #4 Adj Place% 70.9% ≥ 63%)
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Happy Valley 2026-10-21 (night) | Going: Good | Surface: Turf
Target Race(s): R6 (Class 2 | 1000m | 10 runners)
Scratchings: none
Odds coverage: 10 horses with win odds (analyzer estimates place odds from win odds)
SCMP data: ✅ loaded (Star Form, TIR, Vet, Trackwork) | ⚠️ odds columns unlabelled, QP/Q matrix unusable
```

- ≥3 starters ✅ | Odds for all 10 ✅ | Jockey (10) and trainer (9) profiles loaded ✅ | 10/10 horses enriched with form (#9 has 9 form lines, the rest 10)
- Historical sync and odds fetch were not re-run (already done for this meeting, per instructions). Phantom R10/R11 in the odds file are ignored.
- **Distance:** the analyzer's scraper log printed `distance=1200m`, but the saved racecard, the MC run (trip = past runs at 1000m, finish-time projection at 1000m) and SCMP all say **1000m**. The MC was run on 1000m.
- **Layoffs:** #5 SIGHT HERMOSO last raced 20-May-2026 (~154 days). #3 SUPERB CAPITALIST last raced 27-Jun-2026 (~116 days). #7 AURORA LADY came back from a 311-day injury absence on 07-Oct.
- `careerStarts` is 0 for every horse in the scraped card (the field is not populated), so banker eligibility uses the form lines. Every runner has ≥6 starts.

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6, latest first) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 1 | BOTTOMUPTOGETHER | 32.9% | 71.1% | 6.9 | ✅ | ✅ | 3-4-3-3-1-4 | ★ 膽 (Banker) | 1-4: 23.0% (4.3) |
| 4 | HORSEPOWER | 30.0% | 67.9% | 6.7 | ✅ | ✅ | 1-4-8-2-2-2 | 腳 (Leg) | 4-8: 9.7% (10.4) |
| 8 | LOVE TOGETHER | 13.4% | 45.1% | 3.7 | ✅ | ✅ | 3-1-7-7-8-3 | 腳 (Leg) | 1-8: 10.7% (9.3) |
| 2 | VICTORY SKY | 10.0% | 38.7% | 12 | ✅ | ❌ | 10-2-13-5-2-1 | 腳 (Leg) | 1-2: 8.0% (12.5) |
| 10 | CANDLELIGHT DINNER | 4.9% | 25.0% | 12 | ✅ | ❌ | 10-2-3-4-4-3 | — (replaced by #3) | — |
| 5 | SIGHT HERMOSO | 3.3% | 17.4% | 20 | ❌ | ❌ | 12-1-1-3-3-3 | — | — |
| 7 | AURORA LADY | 2.7% | 14.9% | 10 | ❌ | ❌ (10.0, not <10) | 4-11-12-3-4-6 | — | — |
| 9 | GLOWING PRAISES | 1.3% | 8.9% | 6.8 | ❌ | ✅ | 6-6-8-7-2-2 | 腳 (Leg) — added directly | — |
| 3 | SUPERB CAPITALIST | 1.0% | 7.6% | 6.2 | ❌ | ✅ | 9-1-11-9-7-9 | 腳 (Leg) — replaced #10 | — |
| 6 | BRAVE STAR | 0.4% | 3.4% | 25 | ❌ | ❌ | 12-9-11-8-2-3 | — | — |

Market: Overround 23.1%. The market favourite is #8 LOVE TOGETHER (3.7), then #3 (6.2), #4 (6.7), #9 (6.8) and #1 (6.9). MC concentrates on #1 and #4 (undervalued by 120% and 104%) and the 1-4 quinella (23.0%, fair 4.3). It rates #3 SUPERB CAPITALIST (2nd favourite, 7.6% place) as overvalued by 93%, and #9 GLOWING PRAISES (8.9% place) similarly weak. The analyzer's own bets were Place #1 and Place #4. The finish-time projection (speed figures) has #8 fastest, then #4, #10 and #1.

---

## STRATEGY A

### HORSE RANKINGS

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 1 | BOTTOMUPTOGETHER | 32.9% | 71.1% | +form +1 | +form +1 | 33.9% | 72.1% | 6.9 | Z Purton | Close | +form (last-to-3rd, finished strongly); draw 10, 135 lb topweight | ★ 膽 (Banker 1) |
| 4 | HORSEPOWER | 30.0% | 67.9% | excuses +2, +form +1 | excuses +2, +form +1 | 33.0% | 70.9% | 6.7 | A Atzeni | Stalk | +excuses (held up after 400m), +form (won last start) | ★ 膽 (Banker 2) |
| 8 | LOVE TOGETHER | 13.4% | 45.1% | excuses +2, +form +1 | excuses +2, +form +1 | 16.4% | 48.1% | 3.7 | A Badel | Stalk/Close | +excuses (crowded after start), +form ("barnstorming third") | 腳 (Leg) |
| 2 | VICTORY SKY | 10.0% | 38.7% | excuses +2 | excuses +2 | 12.0% | 40.7% | 12 | H Y Yuen (-7) | Front | +excuses (steadied near 100m) | 腳 (Leg) |
| 10 | CANDLELIGHT DINNER | 4.9% | 25.0% | excuses +2 | excuses +2 | 6.9% | 27.0% | 12 | M Chadwick | Front/Stalk | +excuses (rough trip, lost a plate) | 腳 (Leg) |
| 5 | SIGHT HERMOSO | 3.3% | 17.4% | -perf −2 | -perf −2 | 1.3% | 15.4% | 20 | H Bentley | Stalk | -perf (disappointing last start, spelled; vet passed 25-Sep) | 腳 (Leg) |
| 9 | GLOWING PRAISES | 1.3% | 8.9% | excuses +2 | excuses +2 | 3.3% | 10.9% | 6.8 | P N Wong (-7) | — | +excuses (steadied near 900m) | — |
| 3 | SUPERB CAPITALIST | 1.0% | 7.6% | trial +2 | trial +2 | 3.0% | 9.6% | 6.2 | Y L Chung (-2) | Front | +trial ("quickened up well" to win latest trial) | — |
| 7 | AURORA LADY | 2.7% | 14.9% | 0 | 0 | 2.7% | 14.9% | 10 | M L Yeung | Front | — (311-day injury absence, 4th on return) | — |
| 6 | BRAVE STAR | 0.4% | 3.4% | excuses +2 | excuses +2 | 2.4% | 5.4% | 25 | H T Mo (-2) | — | +excuses (steadied when crowded); age 8 | — |

Note: ★ 膽 = Banker. #1 is 1st by Adj Win% (33.9%) and has many starts, so it is eligible. #4 is 2nd (33.0%) with Adj Place% 70.9% ≥ 63%, so the decision flow gives **雙膽拖**. Adjusted values are not renormalised.

**How the flags were applied:**
- **excuses:** applied where the latest stewards' report shows the horse was steadied, crowded or held up, or had a rough trip (#2, #4, #6, #8, #9, #10).
- **+form:** #1 (Star Form: last-to-third, TIR: "finished strongly"), #4 (won its last start from midfield), #8 (resumed with a "barnstorming third").
- **trial (#3):** trackwork says it "quickened up well" to win its latest trial.
- **-perf (#5):** stewards judged the last run (20-May) disappointing for a last-start winner; it was spelled and passed a trial and vet exam on 25-Sep. This is treated as the unacceptable-performance flag. It is not the -injury30d flag, because the vet entry is a performance check, not an injury.
- **Not applied:** #6 is 8 years old, but SCMP has no vet age note and this is a Class 2 race, so -age was not applied. #5 "jumped only fairly" once, which is not repeated barrier trouble. #1's TIR note about an awkward draw is a riding-tactic note, not an excuse.

**Reasoning:** #1 at 33.9% Adj Win% is Competitive, which gives Mode B: the top 3 by Adj Win% (#1, #4, #8) + 3 others by Adj Place% (#2 40.7%, #10 27.0%, #5 15.4%). The Adj Place% ≥ 25% must-include rule (#1, #4, #8, #2, #10) is already covered. No horse sits in the 20–25% Adj Place% band, so there is no 20%-variant ticket. The 6th spot is close: #5 (15.4%) edges #7 AURORA LADY (14.9%). #5 would still lead without the -perf debit (17.4%).

- **#1 BOTTOMUPTOGETHER** has Purton (22% strike), a Valley 1000m win in April and 3rds in 3 of its last 4 starts. It is MC #1 at 71.1% place. The risks are draw 10 and 135 lb topweight. It is a closer at the Valley 1000m.
- **#4 HORSEPOWER** is the same stable (F C Lor). It has 8 runs at the trip, three straight Valley 1000m 2nds last term, and won its last start. It has a middle draw (6) and 118 lb.
- **#8 LOVE TOGETHER** is the market favourite and the projected fastest. It is 4 years old and lightly weighted (115 lb) from draw 4, but it is up in class.
- **#2 VICTORY SKY** has draw 2 and a 7 lb claim. It has no runs at 1000m (0 trip runs), but MC still gives it 38.7% place.
- **#10 CANDLELIGHT DINNER** is a Valley 1000m specialist (8 trip runs, a long run of placings), and its last-start 10th had excuses.
- **#5 SIGHT HERMOSO** has a strong Sha Tin 1000m record but is first-up after 5 months and making its Valley 1000m debut.
- **Out:** #3 SUPERB CAPITALIST (6.2) and #9 GLOWING PRAISES (6.8) are 2nd and 4th in the market but rate only 9.6% and 10.9% Adj Place%. Neither has a net negative flag (both carry positive flags), so Rule 9's "no hard exclusion at ≤15 odds despite negative flags" does not apply; they are out on the model. #7 (10) and #6 (25) are out on Adj Place%.

**Pace:** at the Valley 1000m, the likely on-pace runners are #3 (draw 1), #2 (draw 2) and #9 (draw 3), plus #7, which was instructed to go forward last time. #4 and #8 should sit handy behind them. #1 must come from off the pace from draw 10. A strong tempo over 1000m helps #1, but the Valley 1000m favours horses on the speed, which is the main risk to Banker 1.

### TRIO POOL (any order)

```
POOL: #1, #4, #8, #2, #10, #5
MODE: B | POOL SIZE: 6

雙膽拖 STRUCTURE (top 2 = Bankers; #4 Adj Place% 70.9% ≥ 63%):
膽 (Bankers): #1 BOTTOMUPTOGETHER (Adj Place% 72.1%), #4 HORSEPOWER (Adj Place% 70.9%) ← both locked in every combo
腳 (Legs):  #8, #2, #10, #5
BET STRUCTURE: 雙膽拖 | 2膽 + 4腳 | COMBINATIONS: 4
```

TOP TRIO COMBINATIONS (Harville approximation from normalised Adj Win%):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #1, #4, #8 | 19.2% | $5.2 |
| 2 | #1, #4, #2 | 13.4% | $7.5 |
| 3 | #1, #4, #10 | 7.3% | $13.7 |
| 4 | #1, #8, #2 | 5.2% | $19.2 (1-banker variant only) |
| 5 | #1, #8, #10 | 2.8% | $35.2 (1-banker variant only) |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 4 (雙膽拖: bankers #1 + #4, legs 8, 2, 10, 5)
UNIT BET: $10 (fixed)
TOTAL STAKE: $40

ALL COMBINATIONS (est. prob):
  1-4-8 19.2% | 1-4-2 13.4% | 1-4-10 7.3% | 1-4-5 1.3%
  Ticket coverage (sum): ~41.2%

ALTERNATIVE (1-banker 膽拖, same pool): 膽 #1 / 腳 #4, #8, #2, #10, #5 → C(5,2) = 10 combos, $100, coverage ~52.3%.
  It keeps the same top-3 combos and adds cover if #4 misses the frame. It is shown for reference only; the skill's decision flow selects 雙膽拖.

PASS CONDITIONS:
- If #1 or #4 (bankers) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going turns Yielding or worse → reconsider (MC run on Good)
- If #1 drifts well beyond 10 late, treat it as a market warning on Banker 1 (draw 10, topweight)

CONFIDENCE: MEDIUM (MC has a clear two-horse top, 1-4 quinella 23%, with both >67% place. But the market does not share the view: #3 and #9 are 2nd/4th favourites and MC rates them below 10% place. 雙膽拖 needs both bankers in the frame, est. ~41%.)
```

---

## STRATEGY B (MC-only)

```
Banker: #1 BOTTOMUPTOGETHER (MC Win% 32.9%, MC Place% 71.1%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #4 (67.9%), #8 (45.1%), #2 (38.7%), #10 (25.0%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #10 CANDLELIGHT DINNER (MC Place% 25.0%, Win odds 12)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #3 SUPERB CAPITALIST (Win odds 6.2, MC Place% 7.6%)
  #9 GLOWING PRAISES (Win odds 6.8, MC Place% 8.9%)
  (#7 AURORA LADY is exactly 10.0, not < 10)
Action: #3 replaced #10 (1-for-1 swap); #9 added directly (no replaceable leg left)
Final legs: #4, #8, #2, #3, #9
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #1 / 腳 #4, #8, #2, #3, #9
  1-4-8 23.1% | 1-4-2 16.5% | 1-8-2 5.5% | 1-4-9 2.0% | 1-4-3 1.5%
  1-8-9 0.6%  | 1-8-3 0.5%  | 1-2-9 0.5% | 1-2-3 0.4% | 1-3-9 0.0%
  Ticket coverage (sum, Harville from raw MC Win%): ~50.6%
```

Comparison: both strategies anchor on #1 and share #4, #8 and #2. Strategy A locks #4 as a second banker (4 combos, $40) and keeps the model's #10 and #5. Strategy B uses one banker and lets the market override the model: the 2nd and 4th favourites #3 and #9 come in for #10, giving 10 combos and $100. If the market is right about #3/#9, Strategy B is the cover; if MC is right, Strategy A is cheaper with similar top-combo coverage.

---

## CAVEATS

- **Odds timing:** the HKJC morning pool was captured at 11:01 HKT. #7 AURORA LADY sits exactly on 10.0 (one SCMP column showed 9.6). If it shortens below 10, Strategy B adds it directly (no replaceable leg left): 膽 #1 / 腳 #4, #8, #2, #3, #9, #7 = 15 combos, $150. If #10 or #2 shortens below 10, nothing changes for Strategy B (both are already >20% place).
- **SCMP odds/QP matrix:** the SCMP odds columns were unlabelled and the QP/Q grid could not be mapped to pairs, so neither was used. The HKJC pool odds are the odds of record.
- **Distance log mismatch:** the scraper log line said 1200m, but the racecard, the MC run and SCMP all confirm 1000m.
- **雙膽拖 risk:** both #1 and #4 must finish top 3 (~41% est.). #1 is drawn 10 with 135 lb at the Valley 1000m. The 1-banker alternative ($100) is listed above.
- **Model vs market:** the market's 2nd and 4th favourites (#3, #9) are out of Strategy A. #3 has a strong trial and a Valley 1000m win in May, but its rating is low on MC (1.0% win).
- **#5 -perf debit** is a judgement call from a paraphrased SCMP note. It does not change the pool (#5 stays 6th either way).
- Trio combination probabilities are a Harville approximation from Win%, not direct MC trio counts. SCMP Place% adjustments mirror the Win% factors.
- No code, sync or odds re-fetch was run beyond `analyze-race.ts`, which auto-saved `data/racecards/racecard_20261021_HV_R6.json`. The odds file's phantom R10/R11 were ignored.

```
═══════════════════════════════════════════════════════════
```
