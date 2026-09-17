═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-16 | Race 5
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --date 2026-09-16 --venue "Happy Valley" --race 5 --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5`). The analyzer loaded 2,259 historical races and 2,318 indexed performances, enriched 12/12 horses, and loaded 12 jockey and 12 trainer profiles. Stability: 2 more CLI re-runs (3 runs in total).
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction)
SCMP DATA: ✅ Loaded. Star Form, TIR, Vet and Trackwork are available for all 12 runners. ⚠️ SCMP Place odds and the Q/QP matrix are unusable (see caveats) and were **not used**. Tipster picks were ignored (skill rule 13).
ODDS SOURCE: **HKJC win pool** (`fetch-odds.ts`, `data/odds/odds_20260916_HV.json`, captured 17:55 HKT 16-Sep). It covers all 12 runners.
             SCMP odds: ⚠️ Win column loaded (used only as a secondary check); Place column unusable | HKJC: ✅ loaded. The analyzer's own fetch matched except #5 (22 → 23) and #7 (8.5 → 8.6).
             ⚠️ The analyzer logged "place odds estimated from win odds". All Strategy B odds tests use **Win odds only**.

RACE: R5 LIDO HANDICAP — **Class 4** | **1200m** | Turf ("B" course) | Good | **12 runners** | 9:10pm
CLASSIFICATION: **Competitive** (top Adj Win% 24.3%; raw MC top 22.3%) | POOL SIZE: 6
MODE: **B — Standard Pool (6)**
BET STRUCTURE: **膽拖** | 1膽 + 5腳 | C(5,2) = 10 combinations. 雙膽拖 is not used because the 2nd-ranked #6 has Adj Place% 51.0%, below the 63% bar.
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL (Step 2)
───────────────────────────────────────────────────────────
```
Meeting: Happy Valley 2026-09-16 (Wed night) | Going: Good | Surface: Turf, "B" course
Target Race: R5 (Class 4 | 1200m Turf | 12 runners) — 9:10pm
Scratchings: none (all 12 entries isScratched=false; SCMP lists the same 12 with matching draws;
             reserves RIDING HIGH and BUCEPHALAS not in the field)
Odds coverage: 12 / 12 horses with HKJC Win odds
Starters: 12 ≥ 3 → Trio pool valid
Jockey stats: 12 jockey profiles + 12 trainer profiles loaded
Sparse form: #9 STAR OF HEARTS has 1 career start (debut 5th at 147/1, 13-Jun), so it is banker-INELIGIBLE (rules 1 / 17).
             It does not rank 1st in either strategy, so this does not bite. #8 GROUPER has 6 indexed runs, #1 GRATIFIDE 7.
             The banker for both strategies, #7 WINNING MONEY, has 10 indexed runs, so it is eligible.
Long layoff (>90 days): #4 LUCKY MCQUEEN (112d — last run 27-May; won both lead-up trials)
                        #9 STAR OF HEARTS (95d — last run 13-Jun)
                        (#5 81d, #6/#12 70d, #1/#3/#7/#10 63d, #2 77d; #8 and #11 are race-fit from 6-Sep / 9-Sep)
SCMP data: ✅ Form/TIR/Vet/Trackwork loaded (all 12); ⚠️ Place odds + Q/QP unusable
```

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — shared basis for both strategies
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Draw | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|------|-------------------|--------------------------|
| 7 | WINNING MONEY | 22.3% | 52.1% | 8.5 | ✅ | ✅ | 3 | 10 | ★ 膽 (Banker) | 6-7: 10.0% (10.0) |
| 6 | YOUNG ARROW | 20.2% | 49.0% | 4.2 | ✅ | ✅ | 6 | 10 | 腳 (Leg) | 6-7: 10.0% (10.0) |
| 5 | ELEGANT LIFE | 13.7% | 38.6% | 22 | ✅ | ❌ | 11 | 10 | 腳 (Leg) | 5-7: 6.4% (15.5) |
| 10 | GENIUS BABY | 11.0% | 33.9% | 9.7 | ✅ | ✅ | 1 | 10 | 腳 (Leg) | 7-10: 5.5% (18.1) |
| 9 | STAR OF HEARTS | 10.0% | 31.6% | 21 | ✅ | ❌ | 5 | **1** | 腳 (Leg) | 7-9: 4.9% (20.2) |
| 11 | FORZA LEADER | 6.3% | 22.9% | 6.9 | ✅ | ✅ | 7 | 10 | 腳 (Leg) | — |
| 3 | ARMOUR WAR EAGLE | 4.5% | 17.7% | 11 | ❌ | ❌ | 8 | 10 | — | — |
| 4 | LUCKY MCQUEEN | 3.8% | 16.6% | 11 | ❌ | ❌ | 4 | 10 | — | — |
| 1 | GRATIFIDE | 3.5% | 14.7% | 12 | ❌ | ❌ | 9 | 7 | — | — |
| 8 | GROUPER | 2.4% | 11.1% | **5.6** | ❌ | ✅ | 2 | 6 | 腳 (Leg) — added directly (Win-odds candidate) | — |
| 2 | JUICY DRAGON | 1.8% | 8.5% | 28 | ❌ | ❌ | 12 | 10 | — | — |
| 12 | GOLDEN FRIENDSHIP | 0.6% | 3.4% | 19 | ❌ | ❌ | 10 | 10 | — | — |

**Market:** Overround **22.6%**, favourite bias **−15.3%**, longshot bias **+91.5%**.
- **Agreement:** model and market both rate **#6 YOUNG ARROW** (4.2 favourite, Z Purton) as a top-two chance.
- **Disagreement 1:** MC makes **#7 WINNING MONEY** its top pick (22.3% win, fair ~4.5), but the market has him **4th favourite at 8.5**. The analyzer calls him "undervalued by 92%".
- **Disagreement 2:** **#8 GROUPER** is the market's **2nd favourite (5.6)** but only MC 10th (11.1% place). It has just 6 indexed runs, all but one at Sha Tin, and tries the Valley 1,200m.
- **Disagreement 3:** **#5 ELEGANT LIFE (22)** is MC 3rd (38.6% place) — analyzer "undervalued by 215%". **#9 STAR OF HEARTS (21)** is MC 5th on a **single** form line — "undervalued by 110%", but that rating rests on one debut run.
- **Shape:** flatter than a typical banker race. The top two carry ~101% of the 300% place mass, and six horses sit above 20% place. MC top win is only 22%.

**Top quinella combinations (MC, primary run):** 6-7 10.0% ($10.0) · 5-7 6.4% ($15.5) · 5-6 5.8% ($17.4) · 7-10 5.5% ($18.1) · 7-9 4.9% ($20.2).

**Stability across the 3 CLI runs:**
- The order of the top six (7 > 6 > 5 > 10 > 9 > 11) was identical in **3/3** runs.
- #7 ranged 22.3–23.6% win and 52.1–53.3% place; #6 ranged 19.4–20.2% win. The #7–#6 win gap was 0.8–3.4pp: **#7 was MC #1 in every run, but the margin is thin.**
- The 20% place line is clean. #11 (22.1–22.9%) is the lowest horse above it and #3 (17.4–17.9%) the highest below it, so **Strategy B's primary legs are stable**.

**Finish-time projection (analyzer):** #11 FORZA LEADER is fastest, then #12 GOLDEN FRIENDSHIP (+0.43s), #10 (+0.49s), #6 (+0.99s) and **#7 (+1.14s, 5th)**; #5 projects only 9th (+1.97s). This disagrees noticeably with the MC ranking (see caveats).

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | Win Odds (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|-----------------|------------------|----------|----------|-----------|---------------|
| 1 | GRATIFIDE | 17 | **+form** ("rallied for third" blinkered at Valley 1,200m, then won from the box seat last start); "Has a tricky gate" | clear | clear | — | Box seat / stalker |
| 2 | JUICY DRAGON | 20 | — (ran on steadily for 6th from behind midfield) | **+excuses** (bumped at the start) | clear | — | Back / midfield |
| 3 | ARMOUR WAR EAGLE | 10 | — (4th from midfield at Valley 1,200m last start) | clear: "checked when crowded **after making contact** with a runner" (partly self-inflicted → withheld) | clear | **+trial** ("Lashed home to easily win a trial at Sha Tin earlier this month") | Midfield |
| 4 | LUCKY MCQUEEN | 13 | — (won from midfield last start, 27-May) | clear | clear | **+trial** ("moved well to win both lead-up trials") | Midfield |
| 5 | ELEGANT LIFE | 21 | — (head 3rd, then "failing without an excuse" at Sha Tin); "**Gate won't help**" | clear: jumped awkwardly and shifted in himself; "rider could offer no explanation" (not an unacceptable-performance ruling → −perf not applied, noted as risk) | post-race vet: no significant findings | — | On-pace / midfield |
| 6 | YOUNG ARROW | 5.1 | — (3rds in 3 of 4 Valley 1,200m Class 4s, latest "after a torrid trip from gate 12") | **+excuses** (raced **wide and without cover** for most of the race) | clear | — | Midfield |
| 7 | WINNING MONEY | 6.1 | — (pace-stalking win from gate 12 in January → stale; 3rd/4th in 3 straight) | clear | clear | **+trial** ("Comes off a nice trial win") | Pace-stalker |
| 8 | GROUPER | 5.1 | — (led 800m out from gate 10 then faltered to 6th on resumption; tries Valley 1,200m) | **+excuses** (jumped fairly, then **bumped heavily** shortly after the start) | clear | — | Front-runner / on-pace |
| 9 | STAR OF HEARTS | 24 | — (debut: made ground late for 5th after a sluggish start; Valley debut) | clear: hung out and shifted out himself; the rider had to stop riding to straighten him (steering correction, not a soundness "not ridden out" note → −notRO not applied) | clear | — | Back marker / closer |
| 10 | GENIUS BABY | 10 | — ("closing third from behind midfield"; frame 8 times in 10) | clear | clear | — | Closer (behind midfield) |
| 11 | FORZA LEADER | 7.2 | — (closing 3rd from behind midfield on 9-Sep; "rallying fourths" were back in May → stale) | clear | clear | — | Closer |
| 12 | GOLDEN FRIENDSHIP | 17 | — (2nd "all-the-favours", then tracked the pace for 6th) | clear | clear | — | On-pace / tracker |

**Flag discipline (same conventions as the R1 report and the 13-Sep ST reports):**
- `+excuses` goes only to horses that **received** trouble: #6 (wide, no cover), #8 (bumped heavily) and #2 (bumped at the start).
  - It is withheld from **#3** (checked when crowded *after making contact* itself), **#5** (jumped awkwardly and shifted in) and **#9** (hung out / shifted out).
- `+trial` for **#3** (easy Sha Tin trial win), **#4** (won both lead-up trials) and **#7** (nice trial win).
- `+form` for **#1** only: "rallied" for 3rd and then won last start, both recent. #4 and #7 wins are either stale or not described with the skill's keywords; #11's "rallying" runs were in May.
- `+draw` is not applied to anyone (no "gate should help" wording). SCMP's negative draw comments for **#5** ("Gate won't help", gate 11) and **#1** ("tricky gate", gate 9) have no entry in the skill's adjustment table. Per Reminder 15 they are noted as risks, not applied.
- No `−injury30d`, `−barrier`, `−perf`, `−notRO` or `−age` flags qualify.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC + SCMP adjustments, Step 3c/4a)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 7 | WINNING MONEY | 22.3% | 52.1% | trial +2 | trial +2 | **24.3%** | **54.1%** | 8.5 | L Ferraris | 3 | Stalker | +trial | ★ 膽 (Banker) |
| 2 | 6 | YOUNG ARROW | 20.2% | 49.0% | excuses +2 | excuses +2 | **22.2%** | **51.0%** | 4.2 | Z Purton | 6 | Midfield | +excuses | 腳 (Leg) |
| 3 | 5 | ELEGANT LIFE | 13.7% | 38.6% | 0 | 0 | **13.7%** | **38.6%** | 22 | E C W Wong (-3) | 11 | On-pace / mid | (gate 11 noted) | 腳 (Leg) |
| 4 | 10 | GENIUS BABY | 11.0% | 33.9% | 0 | 0 | **11.0%** | **33.9%** | 9.7 | K C Leung | 1 | Closer | — | 腳 (Leg) |
| 5 | 9 | STAR OF HEARTS | 10.0% | 31.6% | 0 | 0 | **10.0%** | **31.6%** | 21 | C Y Ho | 5 | Closer | (1 start) | 腳 (Leg) |
| 6 | 11 | FORZA LEADER | 6.3% | 22.9% | 0 | 0 | **6.3%** | **22.9%** | 6.9 | K Teetan | 7 | Closer | — | 腳 (Leg) |
| 7 | 3 | ARMOUR WAR EAGLE | 4.5% | 17.7% | trial +2 | trial +2 | 6.5% | 19.7% | 11 | A Atzeni | 8 | Midfield | +trial | — |
| 8 | 4 | LUCKY MCQUEEN | 3.8% | 16.6% | trial +2 | trial +2 | 5.8% | 18.6% | 11 | M F Poon | 4 | Midfield | +trial | — |
| 9 | 1 | GRATIFIDE | 3.5% | 14.7% | +form +1 | +form +1 | 4.5% | 15.7% | 12 | R Kingscote | 9 | Box seat | +form (tricky gate noted) | — |
| 10 | 8 | GROUPER | 2.4% | 11.1% | excuses +2 | excuses +2 | 4.4% | 13.1% | 5.6 | C L Chau (-2) | 2 | Front | +excuses | — |
| 11 | 2 | JUICY DRAGON | 1.8% | 8.5% | excuses +2 | excuses +2 | 3.8% | 10.5% | 28 | P N Wong (-7) | 12 | Back / mid | +excuses | — |
| 12 | 12 | GOLDEN FRIENDSHIP | 0.6% | 3.4% | 0 | 0 | 0.6% | 3.4% | 19 | H T Mo (-2) | 10 | Tracker | — | — |

Note: the table is ordered by raw MC rank. By Adj Win%, #3 (6.5%) edges #11 (6.3%), so #3 is 6th by Adj Win% while #11 is 6th by Adj Place%. Mode B's pool rule (top 3 by Adj Win% + 3 by Adj Place%) is unaffected, because #3 is outside the top 3 by Win%.

**Factor legend:**
- `trial +2`: strong trial or trackwork.
- `excuses +2`: the horse received trouble in running (TIR).
- `+form +1`: improving / rallying recent form (Star Form).

No horse reaches the ±8% / ±10% cap or the 50% Win / 85% Place ceiling. The SCMP layer **widens the top two** (#7 +2, #6 +2) but does not change the order of the top six.

**Banker eligibility (rules 1 / 17):** #7 WINNING MONEY has 10 indexed runs, including a Valley 1,200m win (January), so it is **eligible**.

**雙膽拖 — NOT triggered.** The 2nd-ranked #6 YOUNG ARROW has Adj Place% **51.0%** (raw 47.9–49.0% over 3 runs), below the 63% bar. The rule output is single-banker 膽拖.

**Reasoning for the pool (Mode B = top 3 by Adj Win% + 3 more by Adj Place%):**
- Top 3 by Adj Win%: **#7 (24.3%), #6 (22.2%), #5 (13.7%)**.
- Next 3 by Adj Place%: **#10 (33.9%), #9 (31.6%), #11 (22.9%)**. #10 and #9 clear the mandatory Adj Place% ≥ 25% bar.
- 6th slot: #11 FORZA LEADER (22.9%) beats #3 ARMOUR WAR EAGLE (19.7%) by 3.2pp; #11 also led #3 on raw MC place in all 3 runs.
- Venue note: Happy Valley produces more upsets, and Mode B is the skill's recommended width here.

**Not in pool, market ≤ 15 (rule 9 check):** **#8 GROUPER (5.6, 2nd favourite)**, #3 ARMOUR WAR EAGLE (11), #4 LUCKY MCQUEEN (11) and #1 GRATIFIDE (12).
- None is excluded for negative flags: #8 carries `+excuses`, #3/#4 `+trial`, #1 `+form`. They simply rank below #11 on Adj Place% (13.1%, 19.7%, 18.6%, 15.7% vs 22.9%).
- **#8 is the most important omission.** It is the market's 2nd choice, drawn 2, and the likeliest leader. Strategy B picks it up via the Win-odds rule (see below).

**Pace read (HV 1200m, "B" course — front-runner / inside-draw bias):**
- **Likely leader: #8 GROUPER (gate 2).** He rushed forward to lead 800m out from gate 10 last start; from gate 2 he should find the front easily. #12 GOLDEN FRIENDSHIP (gate 10) is a pace-tracker.
- **The banker #7 WINNING MONEY (gate 3) gets the ideal pace-stalking trip** behind #8, the same run style that won him a Valley 1,200m race in January.
- **#6 YOUNG ARROW (gate 6)** comes from a much better gate than last start's gate 12, which fits the `+excuses` read.
- **Closers #10 (gate 1), #11 (gate 7) and #9 (gate 5)** need luck in the short Valley straight. #10 risks being boxed in on the rail.
- **#5 ELEGANT LIFE (gate 11)** — "Gate won't help" — is the widest pool horse and failed without excuse last start.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: **#7, #6, #5, #10, #9, #11**
MODE: **B — Standard Pool** | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#7 WINNING MONEY** (Adj Place% 54.1%) ← locked in every combo
腳 (Legs):  **#6, #5, #10, #9, #11**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**

TOP TRIO COMBINATIONS (Plackett-Luce fitted to Adj Place%; all 10 ticket combos):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds ($10) |
|------|--------------------|-----------------|----------------------|
| 1 | #5, #6, #7 | 4.50% | $222 |
| 2 | #6, #7, #10 | 3.77% | $265 |
| 3 | #6, #7, #9 | 3.44% | $290 |
| 4 | #5, #7, #10 | 2.46% | $407 |
| 5 | #6, #7, #11 | 2.32% | $430 |
| 6 | #5, #7, #9 | 2.24% | $446 |
| 7 | #7, #9, #10 | 1.88% | $531 |
| 8 | #5, #7, #11 | 1.51% | $660 |
| 9 | #7, #10, #11 | 1.27% | $787 |
| 10 | #7, #9, #11 | 1.16% | $862 |

**Ticket coverage: 24.6%** (Plackett-Luce on Adj Place%) for 10 combos. The ticket can never beat #7's own Adj Place% (54.1%); the gap is the "#7 places but the other two include a non-leg" risk, which is large in this flat field.

**Fit note:** Adj Place% sums to **313.1%**, so the fit renormalises by ~4.2% (net-positive SCMP flags). The fit is otherwise exact (max error 0.000pp).

**Largest combinations NOT covered by the Strategy A ticket (Plackett-Luce, adjusted):**
- Banker misses, which need #7 out of the frame: **5-6-10 (2.2%)**, **5-6-9 (2.0%)**, 6-9-10 (1.7%), 5-6-11 (1.4%).
- Third-horse pool misses: **3-6-7 (2.0%)**, **4-6-7 (1.8%)**, 1-6-7 (1.5%), 3-5-7 (1.3%). #8 GROUPER combos (e.g. 6-7-8 ~1.0% adjusted) are also uncovered.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
- The favourite **#6 (4.2)** is in the top three combos. Those will pay below MC fair, but the banker **#7 at 8.5** (market ~10% win vs MC 22%) and **#5 at 22** (market ~4% vs MC 14%) should keep the headline combo 5-6-7 (fair ~$222) paying at or above fair if the model is right.
- Combos with **#9 (21)** and **#5 (22)** are where the model sees the biggest overlays. #9's overlay is the least trustworthy (one form line).
- **The main model/market clash is #8 GROUPER** (market 5.6, MC 11% place). If #8 leads and holds a place, every Strategy A combo loses.
- The SCMP Q/QP matrix could not be used for cross-reference (rule 14); see caveats.

**Verdict:** a genuinely competitive Class 4 handicap. The MC's top pick holds only a 22% win share, and the top six are separated by modest margins. Coverage per dollar is low (~25% for $100). The model's case rests on #7's ideal stalking draw behind a likely #8 lead.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 膽拖 (1 Banker + 5 Legs)
膽 (Banker): **#7 WINNING MONEY**
腳 (Legs):  #6 YOUNG ARROW, #5 ELEGANT LIFE, #10 GENIUS BABY, #9 STAR OF HEARTS, #11 FORZA LEADER
COMBINATIONS: **10** (C(5,2) where 5 = legs)
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

TOP COMBINATIONS (highest value):
  5-6-7 (4.5%) · 6-7-10 (3.8%) · 6-7-9 (3.4%) · 5-7-10 (2.5%) · 6-7-11 (2.3%) · 5-7-9 (2.2%) · 7-9-10 (1.9%) · 5-7-11 (1.5%)

PASS CONDITIONS:
- If **#7 WINNING MONEY** (Banker) is scratched → **VOID** the ticket (rule 10).
- If the field drops below 3 starters → pool refunded (not a live risk).
- If **#7 drifts past ~12** in late betting → the market is strongly opposing the banker; downgrade to PASS.
- If the going turns **Yielding/Heavy** → re-assess; the on-pace bias would strengthen, favouring #8 (not in pool) over the closer legs #10/#11/#9.
- This is a race to **size down or PASS** if you are limiting Trio to 2–3 races on the card: Mode B in a flat HV field with ~25% ticket coverage.

CONFIDENCE: **LOW–MEDIUM.**
- For: the MC top-six order is identical in 3/3 runs, the banker has a Valley 1,200m win, an ideal gate 3 stalking draw and a recent trial win, and the model sees clear value in #7 and #5.
- Against:
  1. The #7–#6 MC win gap is thin (0.8–3.4pp), and #7 is only 4th favourite at 8.5.
  2. The market's 2nd favourite #8 is outside the Strategy A pool and likely leads from gate 2.
  3. #9 (a leg) is rated from a single debut run; #5 (a leg) failed without excuse last start and is drawn 11.
  4. The analyzer's own time projection has #7 only 5th and #5 9th.
  5. Happy Valley Class 4 handicaps are upset-prone.

CAVEATS:
- **SCMP Place odds and the Q/QP matrix are unusable and were not used.**
  - The SCMP Place column is not credible as place odds (e.g. #2 Win 20 / Place 25, #7 6.1 / 8.1, #12 17 / 20 — place quoted longer than win).
  - The Q/QP matrix values extracted (e.g. 1-2 "47/42") could not be reliably mapped, so the rule 14 cross-reference was skipped.
  - SCMP Win odds (a different snapshot: #6 5.1, #7 6.1, #8 5.1, #1 17) were used as a secondary check only.
- **Place odds were estimated** from win odds by the analyzer; only HKJC Win odds were used for Strategy B tests.
- **Sparse data:** #9 STAR OF HEARTS has **1 form line** (analyzer "Sparse (<3 form): 1") yet ranks MC 5th at 31.6% place. Treat that rating with caution; it is a leg in both tickets.
- **Draw is not explicitly modelled:** #5 (gate 11) and #1 (gate 9) carry SCMP negative draw comments; no adjustment was made (Reminder 15: reducer, not exclusion).
- **Internal model inconsistency:** the finish-time projection ranks #11 1st, #12 GOLDEN FRIENDSHIP 2nd (3.4% MC place), #7 5th and #5 9th. The Trio ranking follows Win%/Place% as the skill specifies.
- **Judgement calls on SCMP flags:** #3's "checked when crowded after making contact" (withheld), #5's "rider could offer no explanation" (−perf not applied) and #9's "rider had to stop riding and straighten" (−notRO not applied). Applying any of them would not change either pool.
- **Layoffs:** #4 LUCKY MCQUEEN 112 days (won both trials), #9 95 days.
- **Jockey/trainer samples are small** (e.g. D J Whyte 0/16 for #6; B Crawford 0/17 for #10; L Ferraris 2/11 for the banker).
- **Trio probabilities are Plackett-Luce estimates** fitted to CLI Place%, not direct simulator trio counts.
- **Odds snapshot:** 17:55 HKT, ~3h15m before the 9:10pm off. Late moves can change Strategy B (see the late-odds watch).

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#7 WINNING MONEY** (MC Win% 22.3%, MC Place% 52.1%) ← 1st by MC Win% (3/3 runs)

Primary legs (MC Place% > 20%): **#6 (49.0%), #5 (38.6%), #10 (33.9%), #9 (31.6%), #11 (22.9%)**

Replaceable legs (MC Place% in 20–30% **AND** Win odds > 10): **none**. The only primary leg in the 20–30% band, #11 FORZA LEADER (22.9%), is **6.9** in the market (not > 10).

Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10): **#8 GROUPER** (Win odds 5.6, MC Place% 11.1%). No other qualifies: #3 and #4 are 11, #1 is 12.

Action: **#8 added directly** (no replaceable leg).

Final legs: **#6, #5, #10, #9, #11, #8**
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = **15**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $150**

STRATEGY B TICKET (Plackett-Luce fitted to raw MC Place%, sum 300.1%):

| Rank | Horses (any order) | MC Trio% (PL) | Est. Fair Odds ($10) |
|------|--------------------|---------------|----------------------|
| 1 | #5, #6, #7 | 4.76% | $210 |
| 2 | #6, #7, #10 | 3.98% | $251 |
| 3 | #6, #7, #9 | 3.63% | $276 |
| 4 | #5, #7, #10 | 2.74% | $364 |
| 5 | #5, #7, #9 | 2.50% | $400 |
| 6 | #6, #7, #11 | 2.44% | $410 |
| 7 | #7, #9, #10 | 2.09% | $478 |
| 8 | #5, #7, #11 | 1.68% | $595 |
| 9 | #7, #10, #11 | 1.41% | $712 |
| 10 | #7, #9, #11 | 1.28% | $781 |
| 11 | #6, #7, #8 | 1.08% | $922 |
| 12 | #5, #7, #8 | 0.75% | $1,337 |
| 13 | #7, #8, #10 | 0.62% | $1,600 |
| 14 | #7, #8, #9 | 0.57% | $1,756 |
| 15 | #7, #8, #11 | 0.38% | $2,614 |

**Ticket coverage: 29.9%** (PL on raw MC). Without #8 the same 10 combos give 26.5%, so the #8 addition buys ~3.4pp of MC coverage for $50 — poor value under the model, but it is the rule output and it covers the market's 2nd favourite.

⚠️ **Late-odds watch (Strategy B leg count depends on late prices):**
- **#8 GROUPER (5.6)** drifting to **≥ 10** → no longer a Win-odds candidate → 5 legs → C(5,2) = **10 combos → $100** (identical to Strategy A).
- **#11 FORZA LEADER (6.9)** drifting to **> 10** → becomes replaceable → #8 (if still < 10) **replaces** #11 instead of being added → still 5 legs / $100.
- **#3 / #4 (11)** or **#1 (12)** shortening below 10 → each added directly (or replaces #11 if #11 has drifted past 10). A 7th leg = C(7,2) = 21 combos / $210.
- **#10 GENIUS BABY (9.7)** is a primary leg on Place% alone, so its odds do not matter.

**Comparison vs Strategy A.**
- Both strategies pick **the same banker (#7)** and the same five legs; the SCMP layer did not change the top-six order.
- Strategy A's 10 combos are an **exact subset** of Strategy B's 15. The only difference is Strategy B's extra leg **#8 GROUPER**, added by the market-odds rule, costing $50 more.
- **Strategy A ($100, 24.6% adj / 26.5% raw coverage)** is the more efficient ticket under the model.
- **Strategy B ($150, 29.9%)** hedges the model's biggest disagreement with the market (#8 as likely leader from gate 2).
- Holding both is simply a doubled stake on the ten shared combos, not a hedge.
═══════════════════════════════════════════════════════════
