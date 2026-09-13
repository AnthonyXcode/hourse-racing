═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-13 | Race 7
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --date 2026-09-13 --venue "Sha Tin" --race 7 --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5`) — 2,249 historical races / 2,311 indexed performances; 14/14 horses enriched; 14 jockey + 14 trainer profiles loaded. Stability: 4 more CLI re-runs, plus 5 re-executions on the saved racecard that captured the simulator's full trio map (10 runs in total).
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction; latest file `results_20260909_HV.json`)
SCMP DATA: ✅ Loaded — Star Form, TIR, Vet and Trackwork for all 14 runners. ⚠️ SCMP Place odds and the Q/QP matrix are unreliable or not extractable (see caveats) and were **not used**. Tipster picks ignored per skill rule 13.
ODDS SOURCE: **HKJC win pool** (`fetch-odds.ts`, captured 10:08 HKT 13-Sep) — complete for all 14 runners
             SCMP odds: ⚠️ Win loaded (secondary check only); Place column unusable | HKJC later snapshot: the analyzer's own fetch at 11:42 HKT **flips one Strategy B flag** (#7 9.7 → 10) — see the late-odds watch
             ⚠️ Place odds NOT usable — `analyze-race.ts` logged "place odds estimated from win odds". All Strategy B odds tests use **Win odds only**, as the rule specifies.

RACE: R7 MEI TUNG HANDICAP — **Class 4** | 1400m | Turf ("B" course) | Good | **14 runners** | 4:05pm
CLASSIFICATION: **Competitive** (top Adj Win% 28.3%; raw MC top 27.2%) | POOL SIZE: 6
MODE: **B — Standard Pool (6)**
BET STRUCTURE: **膽拖** | 1膽 + 5腳 | C(5,2) = 10 combinations (2nd-ranked #2 Adj Place% 62.8% is **just below** the 63% 雙膽拖 bar)
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL (Step 2)
───────────────────────────────────────────────────────────
```
Meeting: Sha Tin 2026-09-13 | Going: Good (SCMP: "Expected Going: Good") | Surface: Turf, "B" course
Target Race: R7 (Class 4 | 1400m Turf | 14 runners) — 4:05pm
Scratchings: none (all 14 entries isScratched=false; SCMP lists the same 14 with matching draws;
             reserves MR COOL and WORD OF KINDNESS not in the field)
Odds coverage: 14 / 14 horses with HKJC Win odds
Starters: 14 ≥ 3 → Trio pool valid
Jockey stats: 14 jockey profiles + 14 trainer profiles loaded
Debutants: none — fewest indexed starts are #9 BIG BIG WORLD (2), #10 HERO RISING (2),
           #5 STORM MIRROR (3), #7 QUANTUM WUKONG (3). Strategy A banker #5 has 3 starts (≥ 2 → eligible,
           rules 1 / 17). Strategy B banker #2 MEGA MASTERMIND has 9.
Long layoff (>90 days): #1 ETALON OR (255d — last run 1-Jan; right fore tendon injury, passed vet 26-Aug)
                        #12 ABSOLUTE AWAKENED (95d — last run 10-Jun)
SCMP data: ✅ Form/TIR/Vet/Trackwork loaded (all 14); ⚠️ Place odds + Q/QP unusable
```

⚠️ **Seasonal context:** every runner is resuming. The field has been off 63–95 days (#1 has been off 255). MC form enrichment describes last season, not today's fitness.

⚠️ **Distance:** #5 STORM MIRROR (the Strategy A banker) has never raced beyond **1,200m** (SCMP: "Tries 1,400m"). #10 HERO RISING also steps up to 1,400m for the first time.

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — shared basis for both strategies
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Draw | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|------|-------------------|--------------------------|
| 2 | MEGA MASTERMIND | 27.2% | 62.8% | 14 | ✅ | ❌ | 4 | 9 | ★ 膽 (Banker) | 2-5: 16.4% (6.1) |
| 5 | STORM MIRROR | 26.3% | 61.8% | 4.4 | ✅ | ✅ | 13 | 3 | 腳 (Leg) | 2-5: 16.4% (6.1) |
| 13 | TOP TO SKY | 22.9% | 57.0% | 7.4 | ✅ | ✅ | 3 | 10 | 腳 (Leg) | 2-13: 14.0% (7.1) |
| 1 | ETALON OR | 5.4% | 23.2% | 8.1 | ✅ | ✅ | 11 | 10 | 腳 (Leg) | 1-5: 3.7% (26.7) |
| 12 | ABSOLUTE AWAKENED | 4.4% | 19.7% | 21 | ❌ | ❌ | 7 | 10 | — (borderline, see note) | — |
| 9 | BIG BIG WORLD | 3.2% | 13.9% | 42 | ❌ | ❌ | 2 | 2 | — | — |
| 8 | STRATHPEFFER | 1.9% | 11.9% | 11 | ❌ | ❌ | 8 | 10 | — | — |
| 6 | LADY'S LOVE | 1.9% | 10.2% | 16 | ❌ | ❌ | 10 | 6 | — | — |
| 3 | ACE | 1.8% | 11.0% | 6.1 | ❌ | ✅ | 1 | 10 | 腳 (Leg) — added (Win-odds candidate) | — |
| 7 | QUANTUM WUKONG | 1.7% | 9.2% | 9.7 | ❌ | ✅ | 6 | 3 | 腳 (Leg) — added (Win-odds candidate) | — |
| 11 | SUPERB KID | 1.4% | 7.2% | 25 | ❌ | ❌ | 5 | 10 | — | — |
| 10 | HERO RISING | 1.3% | 8.0% | 34 | ❌ | ❌ | 9 | 2 | — | — |
| 4 | CALIFORNIA WAVES | 0.5% | 3.6% | 11 | ❌ | ❌ | 12 | 10 | — | — |
| 14 | BEST FARM | 0.1% | 0.5% | 42 | ❌ | ❌ | 14 | 5 | — | — |

**Market:** Overround **22.6%**, favourite bias **+2.6%**, longshot bias **−35.1%**. Model and market agree that #5 STORM MIRROR (4.4 favourite) and #13 TOP TO SKY (7.4) are top-three material. They disagree on two points. First, MC rates **#2 MEGA MASTERMIND** a 27.2% winner / 62.8% placer (fair ~3.7), while the market has him at **14** (analyzer: "undervalued by 307%"). Second, the market's 2nd and 4th favourites, **#3 ACE (6.1)** and **#1 ETALON OR (8.1)**, get only 11.0% and 23.2% MC place. MC sees a **three-horse race** ({2, 5, 13} carry 182% of the 300% place mass), with a wide-open fight for any spot one of them leaves.

**Top quinella combinations (MC, primary run):** 2-5 16.4% ($6.1) · 2-13 14.0% ($7.1) · 5-13 13.6% ($7.3) · 1-5 3.7% ($26.7) · 1-2 3.7% ($27.0).

**MC trio distribution (direct simulator output, 5 × 10,000-run re-executions on the saved racecard, averaged):** 2-5-13 **14.84%** · 1-2-5 4.27% · 1-5-13 3.63% · 2-5-12 3.63% · 1-2-13 3.49% · 2-12-13 3.04% · 5-12-13 3.01% · 2-5-9 2.39% · 2-9-13 2.01% · 5-9-13 1.97%. P(#5 top 3) = 61.8% · P(#2 top 3) = 61.0% · P(#13 top 3) = 56.3% · P(#2 **and** #5 both top 3) = 35.2%.

**Stability across all 10 runs (primary + 4 CLI + 5 saved-snapshot):**
- **MC #1 is a coin-flip.** #2 was MC #1 in **6/10** runs (the primary run and CLI runs 2–4) and #5 in **4/10**. Win% ranged 26.6–27.9% for #2 and 25.9–27.5% for #5, with the gap never above 1.3pp. Strategy B follows the **primary run → #2**. The alternative banker is priced below.
- #13 was 3rd in 10/10 runs (22.2–23.0% win, 57.0–58.1% place). #1 was 4th in 10/10 (22.8–24.0% place).
- **#12 straddles the 20% line** (19.6–20.8% place). It makes **no difference** to Strategy B's final legs (see the Strategy B block).
- #9 (13.2–14.4%) stayed ahead of #3 (11.0–12.1%) in every run, so Strategy A's 6th pool slot is stable.

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | Win Odds (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|-----------------|------------------|----------|----------|-----------|---------------|
| 1 | ETALON OR | 7.9 | — (1,400m winner first-up **last term** → stale; "failing with an excuse" at 1,600m); 10lb claimer | **+excuses** (improved into tight run, **unbalanced when crowded**) | **−injury30d** (right fore **tendon** injury 16-Jan, **passed 26-Aug = 18 days before race**) | **+trial** ("much improved trial effort; commands respect") | Midfield |
| 2 | MEGA MASTERMIND | 15 | — (wire-to-wire win in March, then "**misfiring three times**") | clear (post-race vet: no significant findings) | clear | — | Front-runner |
| 3 | ACE | 8.6 | **+form** ("saluted by a head after box-seat run" — win 2 starts back; 10th since) | **+excuses** (**bumped at start**, obliged to make use early) | clear | — | On-pace / box seat |
| 4 | CALIFORNIA WAVES | 8.6 ⚠️ | — ("one-paced eighth from midfield") | **+excuses** (lost ground when making contact; **steadied** after 600M) | clear | — | Midfield |
| 5 | STORM MIRROR | 4.4 | — (7th → 3rd → 2nd; "luckless" debut); **tries 1,400m** | clear ("jumped only fairly" — no interference) | clear | **+trial** ("Made all in recent dirt trial") | On-pace (handily ridden) |
| 6 | LADY'S LOVE | 15 | — ("never involved travelling towards rear") | **+excuses** (**bumped** on jumping, made contact) | clear | — | Back marker |
| 7 | QUANTUM WUKONG | 9.1 | — ("made good ground late", "prominently ridden thirds") | **+excuses** (**bumped** on jumping) | clear | — | Prominent |
| 8 | STRATHPEFFER | 11 | — ("pleasing third after wide trip" — no keyword; the "wide trip" is Star Form, not TIR) | clear (none noted) | clear | — | Stalker / midfield |
| 9 | BIG BIG WORLD | 38 | — ("never involved", "beat one") | **+excuses** (made contact, then **checked**) | clear | — | Rear / midfield |
| 10 | HERO RISING | 33 | — ("stayed on for seventh after wide trip"); tries 1,400m | **+excuses** (made contact; **steadied** approaching 900M) | clear (post-race: no significant findings) | — | Closer |
| 11 | SUPERB KID | 23 | — ("improved fifth" in **February** → stale) | **+excuses** (**momentarily crowded** twice) | clear | — | Closer |
| 12 | ABSOLUTE AWAKENED | 23 | — ("rallying fourth" first-up **last term** → stale) | **+excuses** (**steadied when crowded**; crowded when contacted) | clear | — | Midfield / closer |
| 13 | TOP TO SKY | 7.3 | **+form** (last two starts **won**, latest "**easily making all**"; up in class carrying 11lb less) | clear | clear | **+trial** ("Has trialled well") | On-pace / front-runner |
| 14 | BEST FARM | 49 | — ("no better than seventh") | **+excuses** (bumped; **difficulty obtaining clear running**) | clear | — | Midfield / rear |

**Flag discipline (same conventions as the 13-Sep R1–R6 reports):**
- `+excuses` only where the horse **received** trouble (#1, #3, #4, #6, #7, #9, #10, #11, #12, #14). Withheld from **#5**, because "jumped only fairly" is its own start with no interference, and from **#8**, which has no TIR entry.
- `−injury30d` applied to **#1** only: a tendon injury passed **18 days** before the race (< 30). It is also resuming from a 255-day absence.
- `+trial` for **#1** ("much improved trial effort"), **#5** (made all in a dirt trial) and **#13** ("has trialled well").
- `+form` for **#13** (two straight wins, "made all") and **#3** (win two starts back). The #3 call is disclosed as borderline: the win was followed by a 10th. Stale rallies/improvements (#11 in February, #12 last term) were not applied, consistent with R6's #11.
- No `−barrier` (only the latest TIR is shown; no horse has "bumped on jumping" in ≥ 2 visible runs), no `−perf`, no `−notRO` (#3 "finished race off only fairly" is not a not-ridden-out note), no `−age` (oldest runners #8 and #11 are 7).
- ⚠️ SCMP's #4 Win odds of 8.6 duplicate #3's value and contradict both HKJC snapshots (11 / 12). Treated as an extraction error.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC + SCMP adjustments, Step 3c/4a)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 5 | STORM MIRROR | 26.3% | 61.8% | trial +2 | trial +2 | **28.3%** | **63.8%** | 4.4 | Z Purton | 13 | On-pace | +trial | ★ 膽 (Banker) |
| 2 | 2 | MEGA MASTERMIND | 27.2% | 62.8% | 0 | 0 | **27.2%** | **62.8%** | 14 | L Ferraris | 4 | Front | — | 腳 (Leg) |
| 3 | 13 | TOP TO SKY | 22.9% | 57.0% | trial +2, +form +1 | trial +2, +form +1 | **25.9%** | **60.0%** | 7.4 | K Teetan | 3 | On-pace / front | +trial, +form | 腳 (Leg) |
| 4 | 1 | ETALON OR | 5.4% | 23.2% | trial +2, excuses +2, -injury30d −3 | trial +2, excuses +2, -injury30d −4 | **6.4%** | **23.2%** | 8.1 | H Y Yuen (-10) | 11 | Midfield | +trial, +excuses, −injury30d | 腳 (Leg) |
| 5 | 12 | ABSOLUTE AWAKENED | 4.4% | 19.7% | excuses +2 | excuses +2 | **6.4%** | **21.7%** | 21 | K C Leung | 7 | Mid / closer | +excuses | 腳 (Leg) |
| 6 | 9 | BIG BIG WORLD | 3.2% | 13.9% | excuses +2 | excuses +2 | **5.2%** | **15.9%** | 42 | C Y Ho | 2 | Rear / mid | +excuses | 腳 (Leg) |
| 7 | 3 | ACE | 1.8% | 11.0% | excuses +2, +form +1 | excuses +2, +form +1 | 4.8% | 14.0% | 6.1 | C L Chau (-2) | 1 | On-pace | +excuses, +form | — |
| 8 | 6 | LADY'S LOVE | 1.9% | 10.2% | excuses +2 | excuses +2 | 3.9% | 12.2% | 16 | J Orman | 10 | Back | +excuses | — |
| 9 | 7 | QUANTUM WUKONG | 1.7% | 9.2% | excuses +2 | excuses +2 | 3.7% | 11.2% | 9.7 | Y L Chung (-2) | 6 | Prominent | +excuses | — |
| 10 | 11 | SUPERB KID | 1.4% | 7.2% | excuses +2 | excuses +2 | 3.4% | 9.2% | 25 | M F Poon | 5 | Closer | +excuses | — |
| 11 | 10 | HERO RISING | 1.3% | 8.0% | excuses +2 | excuses +2 | 3.3% | 10.0% | 34 | L Hewitson | 9 | Closer | +excuses | — |
| 12 | 4 | CALIFORNIA WAVES | 0.5% | 3.6% | excuses +2 | excuses +2 | 2.5% | 5.6% | 11 | B Avdulla | 12 | Midfield | +excuses | — |
| 13 | 14 | BEST FARM | 0.1% | 0.5% | excuses +2 | excuses +2 | 2.1% | 2.5% | 42 | M L Yeung | 14 | Mid / rear | +excuses | — |
| 14 | 8 | STRATHPEFFER | 1.9% | 11.9% | 0 | 0 | 1.9% | 11.9% | 11 | R Kingscote | 8 | Stalker | — | — |

**Factor legend:** `trial +2` strong trial/trackwork · `excuses +2` TIR trouble received · `+form +1` winner / made all per Star Form · `-injury30d −3 / −4` vet injury passed < 30 days (Win / Place). The largest net adjustment is +3 (#13). No horse reaches the ±8% / ±10% cap or the 50% Win / 85% Place ceiling. #1 and #12 tie on Adj Win% (6.4%); the tie is broken by Adj Place%.

**The SCMP layer flips the top two.** Raw MC has #2 first (27.2% vs 26.3%). #5's `+trial +2` lifts it to 28.3%, so **Strategy A's banker is #5** while **Strategy B's banker is #2**. Given the 6/10 vs 4/10 split in raw MC, the two strategies are effectively the two sides of the model's coin-flip.

**Banker eligibility (rules 1 / 17):** #5 STORM MIRROR has **3** indexed starts (≥ 2) → eligible, though it has the shortest record of any contender (see caveats).

**雙膽拖 — NOT triggered.** 2nd-ranked #2 MEGA MASTERMIND has Adj Place% **62.8%**, just below the 63% bar (its raw 10-run range is 61.2–63.1%, averaging 61.8%). Rule output = single-banker 膽拖. The 雙膽拖 is priced below for reference only.

**Reasoning for the pool (Mode B = top 3 by Adj Win% + 3 more by Adj Place%):**
- Top 3 by Adj Win%: **#5 (28.3%), #2 (27.2%), #13 (25.9%)**. All three clear the mandatory Adj Place% ≥ 25% bar.
- Next 3 by Adj Place%: **#1 (23.2%), #12 (21.7%), #9 (15.9%)**. #1 and #12 are also required by Reminder 8 (Adj Place% ≥ 20%).
- 6th slot: #9 (15.9%) beats #3 ACE (14.0%) by 1.9pp, and #9 led #3 on raw MC place in all 10 runs.

**Not in pool, market ≤ 15 (rule 9 check):** #3 ACE (6.1 — market 2nd favourite), #7 QUANTUM WUKONG (9.7), #4 CALIFORNIA WAVES (11), #8 STRATHPEFFER (11). None is excluded for negative flags (#3 and #7 carry only positive flags); they simply rank below #9 on Adj Place%. Strategy B picks up #3 and #7 through its Win-odds rule.

**Pace read.** The early speed is inside: **#2** (gate 4; wire-to-wire winner, "set slow pace" when 2nd) and **#13** (gate 3; "easily making all" last start), with **#3** (gate 1, box-seat type) tracking them. The two MC co-leaders from low gates could take each other on. The banker **#5 is drawn 13**, is on-pace ("handily ridden") and is trying 1,400m for the first time. He will either use energy crossing or sit wide without cover. That is the **main risk to the Strategy A banker**. On the other hand, a genuine tempo from #2 and #13 suits the closers in the second tier (#12 "rallying", #11, #10).

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: **#5, #2, #13, #1, #12, #9**
MODE: **B — Standard Pool** | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#5 STORM MIRROR** (Adj Place% 63.8%) ← locked in every combo
腳 (Legs):  **#2, #13, #1, #12, #9**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**

TOP TRIO COMBINATIONS (Plackett-Luce fitted to Adj Place%; all 10 ticket combos; MC-direct % in brackets):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds ($10) |
|------|--------------------|-----------------|----------------------|
| 1 | #2, #5, #13 | 12.38% (MC 14.84%) | $81 |
| 2 | #1, #2, #5 | 3.29% (MC 4.27%) | $304 |
| 3 | #2, #5, #12 | 3.05% (MC 3.63%) | $328 |
| 4 | #1, #5, #13 | 3.00% (MC 3.63%) | $333 |
| 5 | #5, #12, #13 | 2.78% (MC 3.01%) | $360 |
| 6 | #2, #5, #9 | 2.15% (MC 2.39%) | $464 |
| 7 | #5, #9, #13 | 1.96% (MC 1.97%) | $510 |
| 8 | #1, #5, #12 | 0.74% (MC 0.91%) | $1,357 |
| 9 | #1, #5, #9 | 0.52% (MC 0.52%) | $1,923 |
| 10 | #5, #9, #12 | 0.48% (MC 0.43%) | $2,077 |

**Ticket coverage:** **30.4%** (adjusted fit) / **35.6%** (direct MC trio counts) for 10 combos.

**Fit note (disclosed):** Adj Place% sums to **324.0%**, but any real top-3 distribution must total 300%. The Plackett-Luce fit therefore renormalises by ~7.4% proportionally (e.g. #5 63.8% → 59.1%); the fit is otherwise exact (max error 0.000pp). The total inflates because the SCMP layer is net-positive on 13 of 14 horses (mostly `+excuses`).

**Largest combinations NOT covered by the Strategy A ticket (MC direct):**
- Banker misses, which need #5 out of the frame: 1-2-13 (3.49%), 2-12-13 (3.04%), 2-9-13 (2.01%).
- Third-horse pool misses: 2-3-5 (1.91% — #3 ACE), 2-5-8 (1.86%), 2-5-6 (1.77%), 2-5-7 (1.56%).

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
- The headline combo **2-5-13** (MC 14.8%, fair ~$67–81) contains the 4.4 favourite and the 7.4 third favourite, but also **#2 at 14**. Because the market rates #2 at ~7% to win vs MC's 27%, 2-5-13 should pay **above** fair if the model is right. This is the one combo on the ticket with a likely overlay.
- The **risk is #2**. SCMP: "misfiring three times" — 9th, 8th, 9th in his last three at 1,600–1,650m. MC leans on his March win / April 2nd. He now drops back to 1,400m with a visor and tongue tie. The market may simply be right to price him at 14.
- The **market's #3 ACE (6.1) and #1 ETALON OR (8.1)** are MC outsiders (11.0% / 23.2% place). Combos containing them are where the public money sits, so they will pay less than their MC-fair prices suggest they should.
- The SCMP Q/QP matrix could not be used for cross-reference (rule 14) — see caveats.

**Verdict:** a model-structured race with one dominant trio (2-5-13 ≈ 15% on its own). Strategy A is a bet that **#5 handles 1,400m from gate 13**, with the upside coming from #2 being underrated by the market.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 膽拖 (1 Banker + 5 Legs)
膽 (Banker): **#5 STORM MIRROR**
腳 (Legs):  #2 MEGA MASTERMIND, #13 TOP TO SKY, #1 ETALON OR, #12 ABSOLUTE AWAKENED, #9 BIG BIG WORLD
COMBINATIONS: **10** (C(5,2) where 5 = legs)
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

TOP COMBINATIONS (highest value):
  2-5-13 (12.4% adj / 14.8% MC) · 1-2-5 (3.3% / 4.3%) · 2-5-12 (3.1% / 3.6%) · 1-5-13 (3.0% / 3.6%) · 5-12-13 (2.8% / 3.0%) · 2-5-9 (2.2% / 2.4%) · 5-9-13 (2.0% / 2.0%)

Priced alternatives (not the recommendation, shown so the trade-offs are visible):
| Variant | Structure | Combos | Cost | Coverage (adj PL / MC) |
|---------|-----------|--------|------|------------------------|
| **Recommended (rule output)** | 膽拖 1膽 #5 + 5腳 (2, 13, 1, 12, 9) | 10 | **$100** | 30.4% / 35.6% |
| 雙膽拖 (not triggered — #2 62.8% < 63%) | 2膽 #5+#2 + 4腳 (13, 1, 12, 9) | 4 | $40 | 20.9% / 25.1% |
| Full pool, no banker | C(6,3) | 20 | $200 | 41.2% / 47.5% |

PASS CONDITIONS:
- If **#5 STORM MIRROR** (Banker) is scratched → **VOID** the ticket (rule 10).
- If the field drops below 3 starters → pool refunded (not a live risk).
- If **#5 drifts past ~8** in late betting → the market is fading the 1,400m step-up from gate 13; downgrade to PASS (or defer to Strategy B, whose banker is #2). It had *firmed* to 3.9 by 11:42.
- If the going turns **Yielding/Heavy** → re-assess. #13's latest-but-one win was on a wet track per SCMP (not a negative for him); #5's only soft-track run was a "luckless" 7th on debut.

CONFIDENCE: **MEDIUM.**
- For: the MC structure is clear (three horses at 57–63% place, and the top trio alone is 14.8%). The banker is the market favourite with Z Purton up. Sha Tin favourites are the more reliable venue profile.
- Against:
  1. The banker has only **3 starts**, has never run 1,400m, and is drawn **13**.
  2. #2 vs #5 at the MC top is a **coin-flip** (6/10 vs 4/10 runs).
  3. The analyzer's finish-time projection rates #5 and #2 **10th/11th** (see caveats).
  4. The leg #1 is returning from a tendon injury after 255 days.

CAVEATS:
- **SCMP Place odds and Q/QP matrix unusable — not used.** Two fetches of the SCMP page returned *different* Place columns: the first mirrored the Win column (e.g. #5 4.4/4.6, #13 7.3/7.1), the second gave other values. The Q and QP matrices were reported as "identical" with no extractable numbers. Rule 14 cross-reference skipped. SCMP Win odds were used as a secondary check only (#4's 8.6 is an extraction error — see flag notes).
- **Place odds estimated** from win odds by the analyzer — only Win odds used for Strategy B tests.
- **MC #1 is unstable** (#2 in 6/10 runs, #5 in 4/10; gap ≤ 1.3pp). Strategy A's banker comes from the SCMP `+trial` on #5; Strategy B's comes from the primary raw run (#2).
- **Internal model inconsistency (major).** The analyzer's finish-time projection ranks #13 fastest (consistent with the simulation), but puts **#5 (+2.66s) and #2 (+2.73s) 10th and 11th**. It also puts #14 BEST FARM (0.5% MC place) **3rd**. #5 has no 1,400m time to scale from (its runs are 1,000–1,200m). This looks like a projection artefact, as in R6. The Trio ranking follows Win%/Place% as the skill specifies.
- **Scraper log inconsistency:** the race-card scraper logged "distance=1200m", but the saved racecard, the analysis header, the finish-time projection and SCMP all agree on **1400m**; 1400m was used (same artefact as R6).
- **#1 ETALON OR:** right fore tendon injury (16-Jan), passed **26-Aug (18 days before the race)**, and resuming after **255 days**. MC's 23.2% place rests on last season's form; the −3/−4 injury penalty is offset by `+trial` and `+excuses`. Rides with a 10lb claimer (135 lb → 125 lb effective).
- **Jockey/trainer samples are small** — e.g. L Ferraris 1/4, Z Purton 22% from 18, K Teetan 12% from 17. Trainers J Richards (#2) and C H Yip (#13) are both 0/10 in the indexed data.
- **Long layoffs:** #1 (255d) and #12 (95d) exceed the 90-day warning; the rest of the field is 63–84 days off.
- **Odds snapshot drift:** the analyzer's 11:42 HKJC fetch differs from the 10:08 file (#5 4.4 → 3.9, #3 6.1 → 5.6, #7 9.7 → 10, #8 11 → 13, #4 11 → 12). Only #7's Strategy B flag flips.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#2 MEGA MASTERMIND** (MC Win% 27.2%, MC Place% 62.8%) ← 1st by MC Win% (primary run; 6/10 runs overall)

Primary legs (MC Place% > 20%): **#5 (61.8%), #13 (57.0%), #1 (23.2%)**

Replaceable legs (MC Place% in 20–30% **AND** Win odds > 10): **none**. #1 is in the band (23.2%) but priced **8.1** (< 10) → not replaceable.

Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10), in ascending odds order:
  1. **#3 ACE** (Win odds 6.1, MC Place% 11.0%)
  2. **#7 QUANTUM WUKONG** (Win odds 9.7, MC Place% 9.2%)

Action: **both added directly** (no replaceable leg exists).

Final legs: **#5, #13, #1, #3, #7**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

STRATEGY B TICKET (direct MC trio counts from the simulator, 5-run average; Plackett-Luce on raw MC Place% in brackets):

| Rank | Horses (any order) | MC Trio% | Est. Fair Odds ($10) |
|------|--------------------|----------|----------------------|
| 1 | #2, #5, #13 | 14.84% (PL 15.14%) | $67 |
| 2 | #1, #2, #5 | 4.27% (PL 4.24%) | $234 |
| 3 | #1, #2, #13 | 3.49% (PL 3.56%) | $286 |
| 4 | #2, #3, #5 | 1.91% (PL 1.85%) | $525 |
| 5 | #2, #3, #13 | 1.62% (PL 1.56%) | $617 |
| 6 | #2, #5, #7 | 1.56% (PL 1.53%) | $642 |
| 7 | #2, #7, #13 | 1.26% (PL 1.29%) | $794 |
| 8 | #1, #2, #3 | 0.48% (PL 0.43%) | $2,075 |
| 9 | #1, #2, #7 | 0.34% (PL 0.36%) | $2,976 |
| 10 | #2, #3, #7 | 0.13% (PL 0.16%) | $7,813 |

**Ticket coverage: 29.9%** (MC direct) / 30.1% (PL on raw MC). Only #2 needs to be in the frame (MC Place% 62.8%; 61.0% by 5-run trio sums).

**Robustness of the leg list:**
- **#12 at 19.6–20.8% across runs.** If #12 clears 20%, it becomes a primary leg that *is* replaceable (20–30%, odds 21). #3 (strongest Win-odds candidate) then replaces it 1-for-1. #7 is still added directly because #1 stays non-replaceable at 8.1. **The final legs are identical either way.**
- **If the MC #1 flips to #5** (4/10 runs): banker #5, legs #2, #13, #1, #3, #7 → still 10 combos / $100, MC coverage 30.1%.

⚠️ **Late-odds watch (Strategy B leg count depends on late prices):**
- **#7 QUANTUM WUKONG** is 9.7 in the 10:08 file but **10** in the analyzer's 11:42 fetch (SCMP 9.1). If it is **≥ 10** at the off → drop it → 4 legs → C(4,2) = **6 combos → $60** (MC coverage 26.6%).
- If **#4 (11)** or **#8 (11)** shortens below 10 → added directly (no replaceable leg) → 6 legs → C(6,2) = **15 combos → $150**.
- If **#1** drifts to **> 10** → it becomes a replaceable leg, and #3 would replace it instead of being added (legs 5, 13, 3, 7 [+12 if > 20%]).

**Comparison vs Strategy A.** Both tickets cost **$100 (10 combos)** and share the two biggest combos, **2-5-13 and 1-2-5 (19.1% MC together)**. The difference is which of the MC co-leaders is the banker:
- **Strategy A ($100, 35.6% MC)** anchors on **#5** (61.8% place). Its extra legs #12 and #9 are model-driven.
- **Strategy B ($100, 29.9% MC)** anchors on **#2** (61.0%). 7 of its 10 combos come from the market-driven additions #3 and #7, which together add just **7.3%** MC coverage for $70.

Under the model, Strategy A gives ~6pp more coverage for the same stake. Strategy B is effectively the **hedge toward the market** (#3 ACE is the 6.1 second favourite) with the model's other co-leader as banker. Holding both tickets ($200) covers the two sides of the #2/#5 coin-flip. Only 2-5-13 and 1-2-5 overlap, so combined MC coverage is ≈ 46.4%.
═══════════════════════════════════════════════════════════
