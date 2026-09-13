═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-13 | Race 6
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --date 2026-09-13 --venue "Sha Tin" --race 6 --form-data all --bankroll 10000 --kelly 0.35 --min-edge 5`) — 2,249 historical races / 2,311 indexed performances; 14/14 horses enriched; 14 jockey + 13 trainer profiles loaded (#1 and #10 share trainer P F Yiu)
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction; latest file `results_20260909_HV.json`)
SCMP DATA: ✅ Loaded — Star Form, TIR, Vet, Trackwork for all 14 runners. ⚠️ SCMP Place odds unreliable and Q/QP matrix not extractable (see caveats) — **not used**. Tipster picks ignored per skill rule 13.
ODDS SOURCE: **HKJC win pool** (`fetch-odds.ts`, captured 10:08 HKT 13-Sep) — complete for all 14 runners
             SCMP odds: ⚠️ Win loaded, Place column mirrors Win (unusable); SCMP has #5 at **10** (vs HKJC 9.5), which **flips one Strategy B flag** — see caveats | HKJC live: snapshot only, plus the analyzer's own later odds fetch (no flag flips vs 10:08)
             ⚠️ Place odds NOT usable — `analyze-race.ts` logged "place odds estimated from win odds". All Strategy B odds tests use **Win odds only**, as the rule specifies.

RACE: R6 THE TUNG WAH GROUP OF HOSPITALS CHALLENGE CUP (Handicap) — **Class 4** | 1600m | Turf ("B" course) | Good | **14 runners**
CLASSIFICATION: **Dominant** (top Adj Win% 44.6%; raw MC 43.6%) | POOL SIZE: 5
MODE: **A — Tight Pool (5)**
BET STRUCTURE: **雙膽拖** | 2膽 + 3腳 | 3 combinations (2nd-ranked #7 Adj Place% 70.5% ≥ 63%, and also ≥ the 70% bar in the A/B table)
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL (Step 2)
───────────────────────────────────────────────────────────
```
Meeting: Sha Tin 2026-09-13 | Going: Good (SCMP: "Expected Going: Good") | Surface: Turf, "B" course
Target Race: R6 (Class 4 | 1600m Turf | 14 runners) — 3:35pm
Scratchings: none (all 14 entries isScratched=false; SCMP lists the same 14 with matching draws)
Odds coverage: 14 / 14 horses with HKJC Win odds
Starters: 14 ≥ 3 → Trio pool valid
Jockey stats: 14 jockey profiles + 13 trainer profiles loaded
Debutants: none — fewest indexed starts are #10 LOVELY MILES (4), #3 LUCKY BALERION (5),
           #12 CHEERFUL WONGCHOY (6). Banker #1 VICTOR SUPREME has 8, Banker 2 #7 BEAUTY MISSILE has 10
           → rules 1 / 17 satisfied.
Long layoff (>90 days): #8 GOOD GOOD (182d — last run 15-Mar, "disappointing", passed vet 27-Mar)
SCMP data: ✅ Form/TIR/Vet/Trackwork loaded (all 14); ⚠️ Place odds + Q/QP unusable
```

⚠️ **Seasonal context — the whole field is resuming.** Every runner's last start is between 15-Mar and 15-Jul-2026 (**60–182 days ago**). The MC's form enrichment describes last-season form, not today's fitness.

⚠️ **Weight:** #1 VICTOR SUPREME is top-rated (59) and carries **135 lb** — SCMP: "Carries a 10lb penalty" after his last-start win. The rest of the field carries 116–128 lb.

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — shared basis for both strategies
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Draw | Age | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-----|------|-------------------|--------------------------|
| 1 | VICTOR SUPREME | 43.6% | 78.8% | 3.3 | ✅ | ✅ | 4 | 4 | 8 | ★ 膽 (Banker) | 1-7: 29.1% (3.4) |
| 7 | BEAUTY MISSILE | 27.9% | 67.5% | 20 | ✅ | ❌ | 12 | 7 | 10 | 腳 (Leg) | 1-7: 29.1% (3.4) |
| 4 | FLYING BOOM | 7.2% | 31.9% | 11 | ✅ | ❌ | 8 | 5 | 10 | 腳 (Leg) | 1-4: 8.8% (11.4) |
| 9 | GORGEOUS VICTORY | 6.8% | 31.4% | 6.7 | ✅ | ✅ | 11 | 4 | 9 | 腳 (Leg) | 1-9: 8.5% (11.7) |
| 11 | CIRCUIT MARSHAL | 3.2% | 17.4% | 12 | ❌ | ❌ | 1 | 5 | 8 | — | — |
| 8 | GOOD GOOD | 3.4% | 17.2% | 17 | ❌ | ❌ | 2 | 6 | 10 | — | — |
| 2 | BEAUTY VIVA | 2.5% | 14.3% | 24 | ❌ | ❌ | 13 | 5 | 10 | — | — |
| 6 | AUTOMATED | 2.2% | 14.2% | 11 | ❌ | ❌ | 9 | 5 | 10 | — | — |
| 5 | LUCKY YEAR | 1.5% | 10.9% | 9.5 | ❌ | ✅ | 3 | 5 | 8 | 腳 (Leg) — added (Win-odds candidate) | — |
| 12 | CHEERFUL WONGCHOY | 0.8% | 5.9% | 19 | ❌ | ❌ | 6 | 5 | 6 | — | — |
| 3 | LUCKY BALERION | 0.6% | 5.5% | 9.2 | ❌ | ✅ | 14 | 4 | 5 | 腳 (Leg) — added (Win-odds candidate) | — |
| 13 | LUCK IS BACK | 0.2% | 2.6% | 20 | ❌ | ❌ | 7 | 6 | 10 | — | — |
| 10 | LOVELY MILES | 0.2% | 2.3% | 52 | ❌ | ❌ | 10 | 4 | 4 | — | — |
| 14 | PEARL OF PANG'S | 0.0% | 0.1% | 31 | ❌ | ❌ | 5 | 6 | 10 | — | — |

**Market:** Overround **23.5%**, favourite bias **+43.8%**, longshot bias **−82.7%**. Model and market agree on the **favourite** — #1 VICTOR SUPREME at 3.3 is MC #1 — but disagree sharply on the **second horse**: MC makes #7 BEAUTY MISSILE a 27.9% win / 67.5% place chance (fair ~3.6) while the market has him at **20** (analyzer: "undervalued by 457%"). The market's other short prices — #9 (6.7), #3 (9.2), #5 (9.5) — are rated much lower by MC (#3 only 5.5% place, #5 10.9%). MC sees a two-horse race at the top ({1, 7} carry 146% of the 300% place mass) with an open fight for third.

**Top quinella combinations (MC):** 1-7 29.1% ($3.4) · 1-4 8.8% ($11.4) · 1-9 8.5% ($11.7) · 4-7 5.2% ($19.3) · 7-9 4.9% ($20.2).

**MC trio distribution (direct tool output, 5 × 10,000-run re-executions of the same pipeline on the saved racecard, averaged):** 1-4-7 **11.1%** · 1-7-9 **10.9%** · 1-7-11 5.6% · 1-7-8 5.5% · 1-2-7 4.6% · 1-6-7 4.5% · 1-4-9 3.5% · 1-5-7 3.3% · 4-7-9 1.9% · 1-7-12 1.8%. P(#1 **and** #7 both top 3) = **50.4%**.

**Stability across the 5 re-runs:** #1 was MC #1 in **5/5** runs (43.2–44.7% win, 78.9–80.3% place). #7 65.7–66.9% place. #4 31.3–33.7% and #9 31.3–32.7% place — **both stayed above 30% in every run**, so no Strategy B leg ever entered the 20–30% "replaceable" band. #11 (16.9–17.9%) vs #8 (16.8–17.3%) swapped order in 2 of 5 runs (see Strategy A 4th-leg note).

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | Win Odds (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|-----------------|------------------|----------|----------|-----------|---------------|
| 1 | VICTOR SUPREME | 3.1 | **+form** ("rallying fourth", head second "from last", then "easily saluting" over 1,800m); 10lb penalty | clear | clear | — | Midfield / closer |
| 2 | BEAUTY VIVA | 18 | — ("finding little over 1,600m") | clear | clear | — | Midfield |
| 3 | LUCKY BALERION | 9.8 | — (two seconds; "difficult run on the speed from gate 12") | **+excuses** (**raced wide and without cover** for most of the race; jumped awkwardly once → no −barrier) | clear | — | On-pace |
| 4 | FLYING BOOM | 11 | **+form** ("**rallied** for minor cheques", "dashed late" for close fourth) | **+excuses** (lay in while being shifted out, **then steadied** near 400M) | clear | **+trial** ("caught the eye finishing strongly late" in a Sha Tin 1,000m trial) | Midfield / closer |
| 5 | LUCKY YEAR | 10 | **+form** ("improved second", "**rallied** for thirds") | **+excuses** (racing tight) **and −notRO** ("could not be fully ridden out") | clear | — | Midfield |
| 6 | AUTOMATED | 13 | **+form** ("**rallying** for second at $93" after gear change) | **+excuses** (**difficulty obtaining clear running**) | clear | — | Stalker (speed-tracking) |
| 7 | BEAUTY MISSILE | 19 | **+form** (last-start **winner** "from near last" in a "suitably run" 1,800m race) | **+excuses** (shifted across from the outside gate, **held up** after 400M) | clear | — | Closer |
| 8 | GOOD GOOD | 15 | — ("disappointed", "empty run") | **+excuses** (**crowded** near 1400M) **and −perf** (stewards: "Performance was considered disappointing") | "Disappointing performance" 15-Mar, **passed 27-Mar** (not an injury; >30d) | — (satisfied stewards in a barrier trial) | Stalker |
| 9 | GORGEOUS VICTORY | 7.1 | **+form** ("**rallying** third", placed back-to-back); first time at 1,600m | **+excuses** (**steadied when crowded** near 50M; rider: uncomfortable at HV) | clear | — | On-pace / stalker |
| 10 | LOVELY MILES | 51 | — ("made inroads late", then "flat 12th") | **+excuses** (**severely checked when crowded** after the start) | clear | — | Closer |
| 11 | CIRCUIT MARSHAL | 16 | — (the March "rallying second" is 4 starts back → stale; "struggled", "only beat four runners") | clear (shifted across from a wide gate — tactical, not interference) | clear | — | Back marker |
| 12 | CHEERFUL WONGCHOY | 21 | — ("running on late for fourth"; "Trip should suit") | clear | clear | **+trial** ("Did win a trial for his new trainer") | Midfield / late |
| 13 | LUCK IS BACK | 17 | — (bled in January — >30d, no vet penalty; "last-to-fifth effort") | **+excuses** (**hampered** / made contact after the start) | clear | — | Back marker |
| 14 | PEARL OF PANG'S | 31 | — ("disappointed six times") | clear | clear | — | Midfield |

**Flag discipline (same conventions as the 13-Sep R1 and earlier reports):**
- `+excuses` only where the horse **received** the trouble (#3 wide without cover, #4 steadied, #5 racing tight, #6 no clear running, #7 held up, #8 crowded, #9 crowded/steadied, #10 checked, #13 hampered). Withheld from **#11**: its shift behind runners from a wide gate was a tactical choice.
- `+excuses` for **#7** is disclosed as a mechanical application: he was held up **and still won**. The rule reads the trouble, not the result.
- `−perf` applied to **#8** — "Performance was considered disappointing" by the stewards, as in earlier reports (e.g. 22-Feb R6 #13). It nets to 0 with his `+excuses`.
- `−notRO` applied to **#5** alongside `+excuses` and `+form` → net +1.
- `+trial` for **#4** ("caught the eye finishing strongly late") and **#12** (trial win), matching earlier reports' handling of "caught the eye" and trial-win notes.
- `+form` for **#7** is based on the last-start **win** ("winner" is a skill 1e-ii positive signal). #1 qualifies on "rallying". #11's rally is 4 starts old → not applied.
- No `−injury30d` (no injury vet entries), no `−barrier` (no horse "bumped on jumping" ≥2 runs), no `−age` (oldest runner #7 is 7).

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC + SCMP adjustments, Step 3c/4a)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 1 | VICTOR SUPREME | 43.6% | 78.8% | +form +1 | +form +1 | **44.6%** | **79.8%** | 3.3 | C Y Ho | 4 | Mid / closer | +form | ★ 膽 (Banker 1) |
| 2 | 7 | BEAUTY MISSILE | 27.9% | 67.5% | excuses +2, +form +1 | excuses +2, +form +1 | **30.9%** | **70.5%** | 20 | A Badel | 12 | Closer | +excuses, +form | ★ 膽 (Banker 2) |
| 3 | 4 | FLYING BOOM | 7.2% | 31.9% | trial +2, excuses +2, +form +1 | trial +2, excuses +2, +form +1 | **12.2%** | **36.9%** | 11 | K C Leung | 8 | Mid / closer | +trial, +excuses, +form | 腳 (Leg) |
| 4 | 9 | GORGEOUS VICTORY | 6.8% | 31.4% | excuses +2, +form +1 | excuses +2, +form +1 | **9.8%** | **34.4%** | 6.7 | Z Purton | 11 | On-pace / stalk | +excuses, +form | 腳 (Leg) |
| 5 | 6 | AUTOMATED | 2.2% | 14.2% | excuses +2, +form +1 | excuses +2, +form +1 | 5.2% | 17.2% | 11 | R Kingscote | 9 | Stalk | +excuses, +form | — |
| 6 | 8 | GOOD GOOD | 3.4% | 17.2% | excuses +2, -perf −2 | excuses +2, -perf −2 | 3.4% | 17.2% | 17 | A Atzeni | 2 | Stalk | +excuses, −perf | — |
| 7 | 11 | CIRCUIT MARSHAL | 3.2% | 17.4% | 0 | 0 | **3.2%** | **17.4%** | 12 | M Chadwick | 1 | Back | — | 腳 (Leg) |
| 8 | 12 | CHEERFUL WONGCHOY | 0.8% | 5.9% | trial +2 | trial +2 | 2.8% | 7.9% | 19 | K Teetan | 6 | Mid / late | +trial | — |
| 9 | 3 | LUCKY BALERION | 0.6% | 5.5% | excuses +2 | excuses +2 | 2.6% | 7.5% | 9.2 | M F Poon | 14 | On-pace | +excuses | — |
| 10 | 5 | LUCKY YEAR | 1.5% | 10.9% | excuses +2, +form +1, -notRO −2 | excuses +2, +form +1, -notRO −2 | 2.5% | 11.9% | 9.5 | H Bentley | 3 | Midfield | +excuses, +form, −notRO | — |
| 11 | 2 | BEAUTY VIVA | 2.5% | 14.3% | 0 | 0 | 2.5% | 14.3% | 24 | B Avdulla | 13 | Midfield | — | — |
| 12 | 13 | LUCK IS BACK | 0.2% | 2.6% | excuses +2 | excuses +2 | 2.2% | 4.6% | 20 | E C W Wong (-3) | 7 | Back | +excuses | — |
| 13 | 10 | LOVELY MILES | 0.2% | 2.3% | excuses +2 | excuses +2 | 2.2% | 4.3% | 52 | L Hewitson | 10 | Closer | +excuses | — |
| 14 | 14 | PEARL OF PANG'S | 0.0% | 0.1% | 0 | 0 | 0.0% | 0.1% | 31 | P N Wong (-7) | 5 | Midfield | — | — |

**Factor legend:** `trial +2` strong trial/trackwork · `excuses +2` TIR trouble received · `+form +1` rallied / improved / last-start winner per Star Form · `-perf −2` stewards' disappointing/unacceptable performance · `-notRO −2` not fully ridden out. The largest adjustment is +5 (#4). No horse reaches the ±8% / ±10% cap or the 50% Win / 85% Place ceiling.

**Banker eligibility (rules 1 / 17):** #1 VICTOR SUPREME has 8 indexed starts, Banker 2 #7 has 10 → both eligible. No debutants in the field.

**雙膽拖 — triggered.** 2nd-ranked #7 BEAUTY MISSILE has Adj Place% **70.5%**. That clears the 63% rule (§4c decision flow, reminders 16/19) and also, narrowly, the 70% bar in the skill's A/B table. The race is Dominant, i.e. strongly structured. Robustness: #7's **raw** MC place (67.5%; re-run average 66.3%) plus +3 gives 69.3–70.5%. That is always ≥ 63%, but it can dip under 70% on re-runs. MC joint probability that **both** #1 and #7 finish top 3 = **50.4%**.

**Reasoning for the pool.** Mode A = banker + the 4 best by Adj Place%: **#7 (70.5%), #4 (36.9%), #9 (34.4%), #11 (17.4%)**. The first three clear the mandatory Adj Place% ≥ 25% bar (and Reminder 8's ≥ 20% bar). No other horse reaches 20%.

**4th-leg note (disclosed):** #11 CIRCUIT MARSHAL (17.4%) takes the last slot by **0.2pp** over #6 AUTOMATED and #8 GOOD GOOD (both 17.2%). That gap is noise. Across the 5 re-runs, #11 averaged 17.5% vs #8's 17.1% (#6 ≈ 16.9% adjusted), and #11 led in 3 of 5. None of the three has a trial flag to break the tie (skill 1e-v), so the rule output (#11) stands. In MC trio terms the choice is a coin-flip: 1-7-11 5.6% vs 1-7-8 5.5% vs 1-6-7 4.5%. #11 is also the weakest horse on SCMP form ("struggled", "only beat four runners"), but rule 8 forbids narrative exclusion.

**Not in pool, market ≤ 15 (rule 9 check):** #3 (9.2), #5 (9.5), #6 (11). None is excluded for negative flags; they simply rank lower on Adj Place% (7.5%, 11.9%, 17.2%). Strategy B picks #3 and #5 up through its Win-odds rule.

**Pace read.** The likely early speed is **#3** (on-pace, but gate 14 again — last time he "raced wide and without cover"), **#9** (led early at HV; gate 11) and possibly **#12** (led on debut; gate 6). There is no confirmed front-runner from a low draw. The pool is closer-heavy: #1 came "from behind midfield" / "from last", #7 "from near last", #4 "dashed late", #11 "from near the rear". SCMP describes #7's winning race as "suitably run", so **a muddling tempo is the main risk to both bankers**. On the other hand, #1 from gate 4 should get cover, and 1,600m on the B course is a fair trip for midfield runners.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: **#1, #7, #4, #9, #11**
MODE: **A — Tight Pool** | POOL SIZE: 5

雙膽拖 STRUCTURE (1st-ranked = Banker 1; 2nd-ranked Adj Place% ≥ 63% = Banker 2):
膽 (Bankers): **#1 VICTOR SUPREME** (Adj Place% 79.8%) + **#7 BEAUTY MISSILE** (Adj Place% 70.5%) ← both locked in every combo
腳 (Legs):  **#4, #9, #11**
BET STRUCTURE: 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: **3**

TOP TRIO COMBINATIONS (Plackett-Luce fitted to Adj Place%; all 10 pool combos listed; ticket combos marked ✔; MC-direct % in brackets):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds ($10) | In 雙膽拖 ticket |
|------|--------------------|-----------------|----------------------|------------------|
| 1 | #1, #4, #7 | 10.69% (MC 11.13%) | $94 | ✔ |
| 2 | #1, #7, #9 | 9.78% (MC 10.86%) | $102 | ✔ |
| 3 | #1, #7, #11 | 4.42% (MC 5.56%) | $226 | ✔ |
| 4 | #1, #4, #9 | 3.23% (MC 3.53%) | $309 | — (膽拖 only) |
| 5 | #4, #7, #9 | 2.23% (MC 1.88%) | $448 | — (full pool only) |
| 6 | #1, #4, #11 | 1.46% (MC 1.63%) | $686 | — (膽拖 only) |
| 7 | #1, #9, #11 | 1.33% (MC 1.75%) | $751 | — (膽拖 only) |
| 8 | #4, #7, #11 | 1.01% (MC 0.89%) | $993 | — (full pool only) |
| 9 | #7, #9, #11 | 0.92% (MC 0.95%) | $1,087 | — (full pool only) |
| 10 | #4, #9, #11 | 0.31% (MC 0.26%) | $3,224 | — (full pool only) |

**Ticket coverage:** 雙膽拖 **24.9%** (adjusted fit) / **27.5%** (direct MC trio counts) for 3 combos.

**Fit note (disclosed):** Adj Place% sums to **324.0%** vs the 300% any real top-3 distribution must total, so the Plackett-Luce fit renormalises ~7.4% proportionally (e.g. #1 79.8% → 73.9%, #7 70.5% → 65.3%). The fit is otherwise exact (max error 0.000pp). The SCMP adjustments are net-positive on almost every horse, which is why the total inflates.

**Largest combinations NOT covered by the 雙膽拖 (MC direct):** 1-7-8 (5.5% — #8 not in pool), 1-2-7 (4.6%), 1-6-7 (4.5%), 1-4-9 (3.5%), 1-5-7 (3.3%). Four of the five contain **both** bankers. The 雙膽拖's main exposure is the **third horse** — MC spreads it over 8+ runners — more than a banker failure.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
- The banker **#1 is the 3.3 favourite**, so any combo with him alone plus market fancies (e.g. 1-3-9, 1-5-9) will pay modestly.
- **The value in this race is #7 BEAUTY MISSILE at 20.** Every Strategy A combo contains him. If the model is even half right, 1-4-7 (fair ~$90–94) and 1-7-9 (fair ~$92–102) should pay **well above fair**: the market prices #7 at ~4% to win vs MC's 27.9%.
- That same gap is the biggest risk. The market may know something the model doesn't: #7 is a **7-year-old**, back to 1,600m after winning over 1,800m from near last in a race that suited him, drawn **12**, with a jockey on 0/11 in the indexed data. Treat the 67.5% MC place figure with suspicion.
- SCMP Q/QP matrix could not be used for cross-reference (rule 14) — see caveats.

**Verdict:** a cheap, high-structure ticket that is effectively a **bet on #7 being badly underestimated by the market**, with #1 as the anchor.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 雙膽拖 (2 Bankers + Legs)
膽 (Bankers): **#1 VICTOR SUPREME**, **#7 BEAUTY MISSILE**
腳 (Legs):  #4 FLYING BOOM, #9 GORGEOUS VICTORY, #11 CIRCUIT MARSHAL
COMBINATIONS: **3** (1-4-7, 1-7-9, 1-7-11)
UNIT BET: $10 (fixed)
**TOTAL STAKE: $30**

TOP COMBINATIONS (highest value):
  1-4-7 (10.7% adj / 11.1% MC) · 1-7-9 (9.8% / 10.9%) · 1-7-11 (4.4% / 5.6%)

Priced alternatives (not the recommendation, shown so the trade-offs are visible):
| Variant | Structure | Combos | Cost | Coverage (adj PL / MC) |
|---------|-----------|--------|------|------------------------|
| **Recommended (rule output)** | 雙膽拖 2膽 #1+#7 + 3腳 (4, 9, 11) | 3 | **$30** | 24.9% / 27.5% |
| 膽拖 (if you distrust #7 as a 20/1 banker) | 1膽 #1 + 4腳 (7, 4, 9, 11) | 6 | $60 | 30.9% / 34.5% |
| Full pool, no banker | C(5,3) | 10 | $100 | 35.4% / 38.4% |

PASS CONDITIONS:
- If **#1 VICTOR SUPREME** (Banker 1) is scratched → **VOID** the ticket (rule 10).
- If **#7 BEAUTY MISSILE** (Banker 2) is scratched → **VOID** the 雙膽拖; do not auto-convert.
- If the field drops below 3 starters → pool refunded (not a live risk).
- If **#1 drifts past ~6** in late betting → the market is fading the top-weighted banker; downgrade to PASS.
- If **#7 is still 20+ at the off** → the model-vs-market gap on Banker 2 has not closed; prefer the $60 膽拖 alternative or Strategy B over the 雙膽拖.
- If the going turns **Yielding/Heavy** → re-assess; #1's latest win was on Good to Yielding (1,800m), so a softer track is not a negative for him, but the pool's closers need tempo.

CONFIDENCE: **MEDIUM on the banker, LOW on the 雙膽拖 overall.** For: Dominant race; #1 is MC #1 in 5/5 runs and the market favourite; last-start win "easily"; 8 indexed runs, mostly at this trip. Against: (1) #1 carries **135 lb** with a 10lb penalty; (2) Banker 2 #7 is **20/1 in the market** vs MC 27.9% — a very large disagreement; (3) the analyzer's finish-time projection ranks #1 **last** (+6.78s, see caveats); (4) the whole field is resuming 60–182 days off; (5) the 4th leg is a noise-level tie.

CAVEATS:
- **SCMP Place odds and Q/QP matrix unusable — not used.** SCMP's Place column mirrors its Win column (e.g. #1 3.1/3.3, #3 9.8/9.8), as in the R1 report. The Q/QP matrix could not be extracted from the page (the fetch returned only a placeholder). Rule 14 cross-reference skipped.
- **SCMP Win odds flip one Strategy B flag.** SCMP shows #5 LUCKY YEAR at **10** (not < 10), while both HKJC snapshots have **9.5** (10:08) / **9.6** (the analyzer's later fetch). HKJC is the primary source, so #5 is ✅. See the Strategy B late-odds watch.
- **Place odds estimated** from win odds by the analyzer — only Win odds used for Strategy B tests.
- **Internal model inconsistency (major).** The analyzer's finish-time projection ranks **#1 VICTOR SUPREME last at 1:39.63 (+6.78s / 40.7L)**, while the win/place simulation makes him a 43.6% winner. The projected time is implausible for a C4 1,600m horse. His latest run was over **1,800m** (1:47.65), which suggests a distance-scaling or speed-figure artefact in the projection. The Trio ranking follows Win%/Place% as the skill specifies. The same projection ranks #7 fastest, consistent with the simulation.
- **Scraper log inconsistency:** the race-card scraper logged "distance=1200m", but the saved racecard, the analysis header, the finish-time projection and SCMP all agree on **1600m**; 1600m was used.
- **Jockey-stat samples are small** (4–18 rides per jockey in the indexed data) — e.g. A Badel (Banker 2) 0/11, C Y Ho (Banker 1) 29% from 14.
- **First-up field.** All runners resuming ≥60 days; #8 GOOD GOOD (182d) exceeds the 90-day layoff warning.
- **#9 GORGEOUS VICTORY is trying 1,600m for the first time** (SCMP: "Makes 1,600m debut") — MC's 31.4% place rests on 1,200–1,400m form.
- **4th-leg tie** (#11 17.4% vs #6/#8 17.2%) is within MC noise — see Reasoning.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#1 VICTOR SUPREME** (MC Win% 43.6%, MC Place% 78.8%) ← 1st by MC Win% (5/5 re-runs)

Primary legs (MC Place% > 20%): **#7 (67.5%), #4 (31.9%), #9 (31.4%)**

Replaceable legs (MC Place% in 20–30% **AND** Win odds > 10): **none**. #4 (31.9%, odds 11) and #9 (31.4%, odds 6.7) are both just above the 20–30% band, and #7 is far above it. In the 5 re-runs, #4 and #9 never dropped below 31.3%.

Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10), in ascending odds order:
  1. **#3 LUCKY BALERION** (Win odds 9.2, MC Place% 5.5%)
  2. **#5 LUCKY YEAR** (Win odds 9.5, MC Place% 10.9%)

Action: **both added directly** (no replaceable leg exists).

Final legs: **#7, #4, #9, #3, #5**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

STRATEGY B TICKET (direct MC trio counts from the simulator, 5-run average; Plackett-Luce on raw MC Place% in brackets):

| Rank | Horses (any order) | MC Trio% | Est. Fair Odds ($10) |
|------|--------------------|----------|----------------------|
| 1 | #1, #4, #7 | 11.13% (PL 11.44%) | $90 |
| 2 | #1, #7, #9 | 10.86% (PL 11.21%) | $92 |
| 3 | #1, #4, #9 | 3.53% (PL 3.14%) | $283 |
| 4 | #1, #5, #7 | 3.34% (PL 3.41%) | $299 |
| 5 | #1, #3, #7 | 1.71% (PL 1.67%) | $585 |
| 6 | #1, #4, #5 | 0.95% (PL 0.95%) | $1,057 |
| 7 | #1, #5, #9 | 0.94% (PL 0.93%) | $1,059 |
| 8 | #1, #3, #4 | 0.53% (PL 0.47%) | $1,873 |
| 9 | #1, #3, #9 | 0.48% (PL 0.46%) | $2,092 |
| 10 | #1, #3, #5 | 0.13% (PL 0.14%) | $7,937 |

**Ticket coverage: 33.6%** (MC direct) / 33.8% (PL on raw MC). Only #1 needs to be in the frame (MC Place% 78.8%).

⚠️ **Late-odds watch (Strategy B leg count depends on late prices):**
- #5 LUCKY YEAR (9.5) and #3 LUCKY BALERION (9.2) sit just under 10 — SCMP already shows #5 at 10 and #3 at 9.8. If **#5 drifts to ≥ 10** → drop it → 4 legs → C(4,2) = **6 combos → $60**. If **both** drift to ≥ 10 → 3 legs → **3 combos → $30**.
- If a non-leg runner priced 11–12 — #6 AUTOMATED (11) or #11 CIRCUIT MARSHAL (12) — **shortens below 10** → added directly (no replaceable leg) → +1 leg each (6 legs → C(6,2) = 15 combos → $150).

**Comparison vs Strategy A.** Both tickets share the two biggest combos, **1-4-7 and 1-7-9 (22.0% MC together)**. Strategy A ($30, 3 combos, 27.5% MC) adds 1-7-11 but needs **both** #1 and #7 in the frame (joint 50.4%), and #7 is a 20/1 shot in the market. Strategy B ($100, 10 combos, 33.6% MC) needs **only #1** (78.8%). But 7 of its 10 combos come from the market-driven additions #3 and #5, and together they add just **8.1%** MC coverage for $70. Under the model, Strategy A's 膽拖 alternative ($60, 1膽 #1 + #7/#4/#9/#11, 34.5% MC) gives slightly more coverage than Strategy B for $40 less. What Strategy B buys is a **hedge toward the market** (#3, #5 short-priced) rather than model value.
═══════════════════════════════════════════════════════════
