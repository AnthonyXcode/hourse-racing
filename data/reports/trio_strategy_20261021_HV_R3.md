# Trio (單T) Strategy — Happy Valley | 2026-10-21 | Race 3

> Pre-race run, generated 2026-10-21 (night meeting, R3 off 7:40pm)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-21 | Race 3
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork parsed | ⚠️ QP/Q matrix not mappable; odds columns look garbled
ODDS SOURCE: HKJC early-morning pool (fetch-odds.ts → data/odds/odds_20261021_HV.json, captured 11:01 HKT 21-Oct)
             SCMP odds: ⚠️ loaded but used as a cross-check only | HKJC live: ✅ loaded by analyze-race.ts (market ranks match the saved file)

RACE: R3 — Class 4 | 1650m | Turf ("B" course) | Good | 10 runners (RACING SPIRIT HANDICAP)
CLASSIFICATION: Dominant (top Adj Win% 35.3%, borderline) | POOL SIZE: 6 (5 + must-include #5 at Adj Place% ≥ 25%)
MODE: A: Tight Pool, widened to 6 by the ≥25% rule (Mode B gives the same 6 horses)
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos (2nd-ranked #3 Adj Place% 59.4% < 63%, so no 雙膽拖)
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Happy Valley 2026-10-21 (night) | Going: Good | Surface: Turf
Target Race(s): R3 (Class 4 | 1650m | 10 runners)
Scratchings: none
Odds coverage: 10 horses with win odds (place odds in the HKJC file; analyzer estimates place from win)
SCMP data: ✅ loaded (Star Form, TIR, Vet, Trackwork) | ⚠️ QP/Q matrix unusable, SCMP odds columns inconsistent
```

- ≥3 starters ✅ | Odds for all 10 ✅ | Jockey (10) and trainer (9) profiles loaded ✅ | 10/10 horses enriched with form
- Historical sync and odds fetch were not re-run (already done for this meeting, per instructions). Phantom R10/R11 in the odds file are ignored; they are not used for R3.
- **Long layoff:** #6 STRANGE ALERT was last seen 19-Oct-2025 (unraced 367 days, right fore tendon injury 03-Nov-2025, passed vet 21-Aug-2026, 61 days ago, so not the <30d flag). It has only 4 form lines. #2 LUCKY MY WAY was last seen 07-Jun-2026 (~136 days). #9 AESTHETICISM was last seen 31-May-2026 (~143 days).
- **Sparse form:** #7 RISING FROM EAST has 2 runs, both tailed off. #4 HAPPY SMILE has 5 runs (eligible as banker, ≥2 starts).
- `careerStarts` is 0 for every horse in the scraped card (field not populated), so banker eligibility uses the form lines.

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6, latest first) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 4 | HAPPY SMILE | 34.3% | 71.3% | 5.6 | ✅ | ✅ | 1-3-6-5-6 | ★ 膽 (Banker) | 3-4: 17.1% (5.8) |
| 3 | TURIN CHAMPIONS | 22.0% | 57.4% | 9.5 | ✅ | ✅ | X-6-4-3-9-9 | 腳 (Leg) | 3-8: 9.6% (10.4) |
| 8 | LUCK IS BACK | 18.4% | 54.7% | 4.3 | ✅ | ✅ | 4-5-1-5-7-X | 腳 (Leg) | 4-8: 15.6% (6.4) |
| 1 | URANUS STAR | 8.4% | 32.5% | 4.8 | ✅ | ✅ | 8-9-7-7-X-2 | 腳 (Leg) | 1-4: 7.1% (14.0) |
| 6 | STRANGE ALERT | 6.9% | 29.0% | 5.0 | ✅ | ✅ | 6-2-6-7 | 腳 (Leg) | 4-6: 6.1% (16.5) |
| 5 | TAKE ACTION | 5.5% | 25.8% | 15 | ✅ | ❌ | X-4-4-1-2-6 | 腳 (Leg) (replaceable, no candidate) | — |
| 10 | FORTUNE STAR | 2.5% | 13.9% | 10 | ❌ | ❌ (10.0, not <10) | 5-7-X-5-5-4 | — | — |
| 9 | AESTHETICISM | 1.8% | 11.3% | 15 | ❌ | ❌ | 7-6-9-8-4-6 | — | — |
| 2 | LUCKY MY WAY | 0.4% | 3.8% | 21 | ❌ | ❌ | X-8-X-8-X-X | — | — |
| 7 | RISING FROM EAST | 0.1% | 0.4% | 47 | ❌ | ❌ | X-X | — | — |

(X = finished 10th or worse.)

Market: Overround 22.7%. The market is bunched across five horses: #8 (4.3), #1 (4.8), #6 (5.0), #4 (5.6) and #3 (9.5). MC is much more concentrated. It makes #4 HAPPY SMILE a clear top pick (34.3% vs ~18% implied) and flags #3 TURIN CHAMPIONS as undervalued by 109%. MC rates #1 (8.4%) and #6 (6.9%) well below their ~20% implied. The analyzer's own bets were Place #4 and Place #3. The finish-time projection disagrees with the MC order: it has #3 fastest, then #9 and #5, with #4 4th and #8 9th.

---

## STRATEGY A

### HORSE RANKINGS

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 4 | HAPPY SMILE | 34.3% | 71.3% | +form +1 | +form +1 | 35.3% | 72.3% | 5.6 | K C Leung | Stalk | +form (resumed with a win) | ★ 膽 (Banker) |
| 3 | TURIN CHAMPIONS | 22.0% | 57.4% | excuses +2 | excuses +2 | 24.0% | 59.4% | 9.5 | Z Purton | Close | +excuses (hampered, taken wider) | 腳 (Leg) |
| 8 | LUCK IS BACK | 18.4% | 54.7% | excuses +2 | excuses +2 | 20.4% | 56.7% | 4.3 | C Y Ho | Front | +excuses (steadied near finish); bleeder history | 腳 (Leg) |
| 1 | URANUS STAR | 8.4% | 32.5% | excuses +2 | excuses +2 | 10.4% | 34.5% | 4.8 | H Y Yuen (-7) | Front | +excuses (steadied 1000M); drops in grade | 腳 (Leg) |
| 6 | STRANGE ALERT | 6.9% | 29.0% | excuses +2, trial +2, -notRO −2 | excuses +2, trial +2, -notRO −2 | 8.9% | 31.0% | 5.0 | C L Chau (-2) | Close | +trial, +excuses, -notRO; 367-day layoff (tendon) | 腳 (Leg) |
| 5 | TAKE ACTION | 5.5% | 25.8% | excuses +2 | excuses +2 | 7.5% | 27.8% | 15 | B Avdulla | Stalk | +excuses (steadied when crowded) | 腳 (Leg) |
| 10 | FORTUNE STAR | 2.5% | 13.9% | excuses +2, -notRO −2 | excuses +2, -notRO −2 | 2.5% | 13.9% | 10 | A Atzeni | — | +excuses (checked, held up), -notRO | — |
| 2 | LUCKY MY WAY | 0.4% | 3.8% | excuses +2 | excuses +2 | 2.4% | 5.8% | 21 | L Hewitson | — | +excuses (badly crowded on jumping) | — |
| 9 | AESTHETICISM | 1.8% | 11.3% | 0 | 0 | 1.8% | 11.3% | 15 | M F Poon | — | — (failed 14 times last term) | — |
| 7 | RISING FROM EAST | 0.1% | 0.4% | -perf −2 | -perf −2 | 0.0% | 0.0% | 47 | R Kingscote | — | -perf (unacceptable, 2nd time) | — |

Note: ★ 膽 = Banker (1st by Adj Win%; #4 has 5 form lines, so it is eligible). #3 has Adj Place% 59.4%, below the 63% needed for 雙膽拖. Adjusted values floor at 0% and are not renormalised.

**How the flags were applied:**
- **+form (#4):** Star Form says it "resumed with a well-timed win", and it won its last start on 23-Sep.
- **excuses:** applied where the latest stewards' report shows the horse was steadied, crowded, hampered or held up (#1, #2, #3, #5, #6, #8, #10).
- **-notRO:** applied where the stewards' report says the horse "could not be ridden out" (#6, #10). For #10 this cancels its excuses credit.
- **trial (#6):** trackwork says it "ran on well in a recent trial and his morning work has been really solid".
- **-perf (#7):** second consecutive unacceptable performance.
- **Not applied:** older positive comments ("made all" for #1 in Nov 2025, "rallied" for #3 in Jan, the wire-to-wire win for #8 three runs back) were not counted as recent-run form. No horse had a vet injury cleared in the last 30 days. #10 "jumped only fairly" once, which is not repeated barrier trouble.

**Reasoning:** #4 HAPPY SMILE reaches 35.3% Adj Win%, which is Dominant (Mode A: banker + 4 by Adj Place%: #3, #8, #1, #6). #5 TAKE ACTION has 27.8% Adj Place%, and the ≥25% must-include rule adds it, so the pool is 6. Without the +1 form credit, #4 would be 34.3% (Competitive, Mode B: top 3 by Adj Win% #4/#3/#8 + 3 by Adj Place% #1/#6/#5). That gives exactly the same 6 horses, so the borderline classification does not change the ticket.

- **#4 HAPPY SMILE** is lightly raced (5 runs), won first-up last start and drops in at 129 lb. It is MC's clear top pick, with 71.3% place. It has a wide-ish draw (8) at HV 1650m, where stalkers are favoured.
- **#3 TURIN CHAMPIONS** has Purton (22% strike), draw 7 and the fastest projected time. It is stepping up to 1650m (0 runs at the trip) and is 2nd on MC.
- **#8 LUCK IS BACK** has draw 2, the lowest weight among the top 3 (122 lb), is the market favourite and is a front-runner. Note its bleeder history.
- **#1 URANUS STAR** is topweight (135 lb, with a 7 lb claim). It has a past course-and-distance win when making all and drops in grade, but its recent form is weak (8-9-7-7).
- **#6 STRANGE ALERT** is a closer returning from 367 days off with a tendon injury, but it has solid trackwork and is the 3rd favourite. It is held in by Rule 9 and its 31% Adj Place%.
- **#5 TAKE ACTION** has 9 runs at 1650m, a consistent Valley record and the 3rd-fastest projected time.
- **Out:** #10 FORTUNE STAR (10 odds, 13.9%) and #9 AESTHETICISM (15 odds, 11.3%) are out on Adj Place% alone; neither has a net negative flag, so Rule 9 does not apply. #2 and #7 have no realistic chance on the model.

**Pace:** the likely leaders are #8 and #1 from draws 2 and 3, possibly with #5. #4 should sit handy from 8, and the closers are #3 and #6. A genuine tempo from two on-pace types at 1650m helps the stalker and closer types.

### TRIO POOL (any order)

```
POOL: #4, #3, #8, #1, #6, #5
MODE: A (widened to 6 by Adj Place% ≥ 25% rule) | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #4 HAPPY SMILE (Adj Place% 72.3%) ← locked in every combo
腳 (Legs):  #3, #8, #1, #6, #5
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville approximation from normalised Adj Win%):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #4, #3, #8 | 18.0% | $5.6 |
| 2 | #4, #3, #1 | 8.1% | $12.3 |
| 3 | #4, #3, #6 | 6.9% | $14.6 |
| 4 | #4, #8, #1 | 6.6% | $15.2 |
| 5 | #4, #3, #5 | 5.7% | $17.5 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: banker #4, legs 3, 8, 1, 6, 5 → C(5,2))
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

ALL COMBINATIONS (est. prob):
  4-3-8 18.0% | 4-3-1 8.1% | 4-3-6 6.9% | 4-8-1 6.6% | 4-3-5 5.7%
  4-8-6 5.5%  | 4-8-5 4.6% | 4-1-6 2.5% | 4-1-5 2.1% | 4-6-5 1.7%
  Ticket coverage (sum): ~61.7%
  Banker #4 top 3 (Adj Place%): 72.3%

PASS CONDITIONS:
- If #4 HAPPY SMILE (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going turns Yielding or worse → reconsider (MC run on Good; front-runner #8 and #1 more vulnerable)
- If #4 drifts sharply (>10) late, treat as a market warning on the banker and consider standing down

CONFIDENCE: MEDIUM (clear MC #1 at 71% place with a +109% value read on #3. But the market has five horses within 4.3–9.5, which is typical HV unpredictability, and the top quinella 3-4 is only 17%.)
```

---

## STRATEGY B (MC-only)

```
Banker: #4 HAPPY SMILE (MC Win% 34.3%, MC Place% 71.3%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3 (57.4%), #8 (54.7%), #1 (32.5%), #6 (29.0%), #5 (25.8%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #5 TAKE ACTION (MC Place% 25.8%, Win odds 15)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): none (#10 FORTUNE STAR is exactly 10, not < 10)
Action: no replacement or addition
Final legs: #3, #8, #1, #6, #5
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #4 / 腳 #3, #8, #1, #6, #5
  4-3-8 22.5% | 4-3-1 9.0% | 4-3-6 7.3% | 4-8-1 7.1% | 4-8-6 5.7%
  4-3-5 5.7%  | 4-8-5 4.5% | 4-1-6 2.3% | 4-1-5 1.8% | 4-6-5 1.4%
  Ticket coverage (sum, Harville from raw MC Win%): ~67.3%
```

Comparison: Strategy A and Strategy B give the same ticket here: the same banker (#4), the same 5 legs, 10 combos and $100. The SCMP adjustments were mostly offsetting excuses credits that did not reorder the top six. The one Strategy B sensitivity is #10 FORTUNE STAR, which sits exactly on the 10.0 win-odds line (SCMP showed 8.1). If it shortens below 10 before the off, Strategy B would swap #5 TAKE ACTION out for #10, while Strategy A would stay the same.

---

## CAVEATS

- **Odds timing:** the HKJC morning pool was captured at 11:01 HKT. The Strategy B test is on a knife-edge for #10 FORTUNE STAR (10.0). Re-check before the off; if #10 is below 10, Strategy B's ticket becomes 膽 #4 / 腳 #3, #8, #1, #6, #10.
- **SCMP odds/QP matrix:** the SCMP Win/Place columns were inconsistent (several Place figures above Win), and the QP/Q matrix could not be mapped to pairs. They were not used. The HKJC pool odds are the odds of record.
- **Borderline classification:** #4 at 35.3% Adj Win% is Dominant only because of the +1 form credit. Mode A or B gives the same 6-horse pool.
- **#6 STRANGE ALERT** returns from 367 days off after a tendon injury. Its -notRO and excuses flags come from that run 12 months ago, and MC has only 4 form lines for it.
- **Model vs market:** MC strongly prefers #4 and #3, while the market prefers #8, #1 and #6. The finish-time projection (based on speed figures) disagrees with MC on #8 (projected 9th) and #9 (projected 2nd fastest, 11.3% MC place).
- **#3 TURIN CHAMPIONS** has never raced at 1650m (0 trip runs). #8 LUCK IS BACK is a known bleeder.
- Trio combination probabilities are a Harville approximation from Win%, not direct MC trio counts. SCMP Place% adjustments mirror the Win% factors.
- No code, sync, or odds re-fetch was run beyond `analyze-race.ts`. The odds file's phantom R10/R11 were ignored.

```
═══════════════════════════════════════════════════════════
```
