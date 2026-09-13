═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-13 | Race 10
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good to Firm (HKJC card scraped 13:26 HKT; SCMP agrees, "B" Course) | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --date 2026-09-13 --venue "Sha Tin" --race 10 --form-data all --bankroll 10000 --kelly 0.35 --min-edge 5`) — 2,249 historical races / 2,311 indexed performances; 13/14 horses enriched (#9 MONEY GAMES has no HK form); 14 jockey + 14 trainer profiles loaded
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction)
SCMP DATA: ✅ Loaded — Star Form, TIR, Vet, Trackwork for all 14 runners. ⚠️ SCMP odds columns and Q/QP matrix unreliable (see caveats) — **not used**. Tipster picks ignored per skill rule 13.
ODDS SOURCE: **HKJC win pool** (`fetch-odds.ts`, `data/odds/odds_20260913_ST.json`, captured 10:08 HKT 13-Sep) — complete for all 14 runners
             Cross-check: `analyze-race.ts` own HKJC fetch at **13:26 HKT** — **no horse flips** on the Win-odds<10 test between the two HKJC snapshots
             SCMP odds: ⚠️ loaded but unusable (Place column exceeds Win for the favourite) | HKJC live: two snapshots (10:08, 13:26); prices will move before the off
             ⚠️ Place odds NOT usable — `analyze-race.ts` logged "place odds estimated from win odds". All Strategy B odds tests use **Win odds only**, as the rule specifies.

RACE: R10 YIU TUNG HANDICAP — **Class 3** (80-60) | 1400m | Turf ("B" Course) | Good to Firm | **14 runners**
CLASSIFICATION: **Dominant** (top Adj Win% 42.6%; raw MC 41.6%, 5-run avg 40.8%) | POOL SIZE: **6** (Mode A's 5, plus 1 forced by the ≥25% Adj Place% must-include rule)
MODE: **A — Tight Pool (expanded to 6 by must-include)**
BET STRUCTURE: **膽拖** | 1膽 + 5腳 | C(5,2) = **10 combinations** (2nd-ranked #1 Adj Place% 46.9% < 63% → no 雙膽拖)
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL (Step 2)
───────────────────────────────────────────────────────────
```
Meeting: Sha Tin 2026-09-13 | Going: Good to Firm (HKJC card 13:26 + SCMP) | Surface: Turf, "B" Course
Target Race: R10 (Class 3 | 1400m Turf | 14 runners)
Scratchings: none (all 14 entries isScratched=false; SCMP lists the same 14 with matching draws;
             reserves OUTGATE and SHAMUS STORM have no jockey and are not running)
Odds coverage: 14 / 14 horses with HKJC Win odds (10:08 and 13:26)
Starters: 14 ≥ 3 → Trio pool valid
Jockey stats: 14 jockey profiles + 14 trainer profiles loaded
Debutants / thin form: #9 MONEY GAMES — 0 HK starts (Australian import, 2 wins from 2 starts; 2 Conghua trial wins).
                       #3 ALL OUT FOR SIX and #4 FLOW WATER FLOW — 6 indexed runs; everyone else 10.
                       Banker #12 NYX GLUCK has 10 indexed starts → rules 1 / 17 satisfied.
Long layoff (>90 days): none. Whole field last raced 27-Jun to 15-Jul (60–78 days ago).
SCMP data: ✅ Form/TIR/Vet/Trackwork loaded (all 14); ⚠️ odds columns + Q/QP unusable
```

⚠️ **Seasonal context — the whole field is resuming.** All 13 raced runners last ran 60–78 days ago (#14 FLYING KNIGHT the most recent, 15-Jul). No horse is fit from a run this season. MC form is last-season form.

⚠️ **Weights:** top-rated #1 SOVEREIGN FUND (78) carries **135 lb** ("Has top weight"). The banker #12 NYX GLUCK (64) carries **121 lb** — 14 lb less than #1 — but steps up in class ("Richer class now").

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — shared basis for both strategies
───────────────────────────────────────────────────────────

Flags use HKJC 10:08 Win odds (13:26 in brackets — no flag changes). Canonical run = the `analyze-race.ts` output; 5-run re-execution averages are shown under Stability.

| # | Horse | MC Win% | MC Place% | Win Odds (10:08 / 13:26) | Place%>20% | Win odds<10 | Draw | Wt | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|--------------------------|------------|-------------|------|----|------|-------------------|--------------------------|
| 12 | NYX GLUCK | 41.6% | 75.7% | 3.5 / 3.4 | ✅ | ✅ | 1 | 121 | 10 | ★ 膽 (Banker) | 1-12: 14.8% (6.8) |
| 1 | SOVEREIGN FUND | 14.7% | 45.9% | 14 / 15 | ✅ | ❌ | 3 | 135 | 10 | 腳 (Leg) | 1-12: 14.8% (6.8) |
| 2 | AEROVOLANIC | 12.0% | 40.7% | 12 / 10 | ✅ | ❌ | 6 | 129 | 10 | 腳 (Leg) | 2-12: 12.3% (8.2) |
| 3 | ALL OUT FOR SIX | 9.7% | 35.6% | 19 / 23 | ✅ | ❌ | 8 | 128 | 6 | 腳 (Leg) | 3-12: 10.1% (9.9) |
| 14 | FLYING KNIGHT | 8.3% | 31.6% | 13 / 14 | ✅ | ❌ | 2 | 120 | 10 | 腳 (Leg) | 12-14: 8.7% (11.5) |
| 8 | MONARCH COUNTY | 8.2% | 31.6% | 22 / 26 | ✅ | ❌ | 11 | 123 | 10 | 腳 (Leg) | 8-12: 8.9% (11.3) |
| 4 | FLOW WATER FLOW | 2.2% | 13.1% | 8.0 / 7.9 | ❌ | ✅ | 4 | 127 | 6 | 腳 (Leg) — replacement candidate, added directly | — |
| 11 | BIG RETURN | 0.8% | 4.8% | 23 / 23 | ❌ | ❌ | 9 | 122 | 10 | — | — |
| 6 | RUN RUN SMART | 0.8% | 5.7% | 15 / 15 | ❌ | ❌ | 5 | 126 | 10 | — | — |
| 9 | MONEY GAMES | 0.4% | 4.0% | 10 / 11 | ❌ | ❌ | 13 | 123 | 0 | — | — |
| 13 | RISING PHOENIX | 0.4% | 3.7% | 25 / 25 | ❌ | ❌ | 7 | 121 | 10 | — | — |
| 5 | CHIU CHOW SPIRIT | 0.3% | 2.9% | 13 / 11 | ❌ | ❌ | 12 | 126 | 10 | — | — |
| 10 | WINNING GOLD | 0.3% | 3.0% | 9.1 / 8.7 | ❌ | ✅ | 10 | 123 | 10 | 腳 (Leg) — replacement candidate, added directly | — |
| 7 | MEANINGFUL DRAGON | 0.2% | 1.7% | 17 / 22 | ❌ | ❌ | 14 | 123 | 10 | — | — |

**Market:** Overround **23.3%**, favourite bias **+41.3%**, longshot bias −5.8%. Model and market **agree on the favourite**: #12 NYX GLUCK is 3.4–3.5 (implied ~23% win after overround), and MC is even stronger at **41.6% win / 75.7% place** (fair ~2.4). The analyzer flags #3 "undervalued by 124%", #1 by 120% and #8 by 114%. The market's 2nd and 3rd favourites, **#4 FLOW WATER FLOW (7.9–8.6)** and **#10 WINNING GOLD (8.7–9.1)**, get almost nothing from MC (2.2% and 0.3% win). HK debutant **#9 MONEY GAMES (10–11)** also gets little (0.4%), but MC has no HK form for him.

**Top quinella combinations (MC, canonical):** 1-12 14.8% ($6.8) · 2-12 12.3% ($8.2) · 3-12 10.1% ($9.9) · 8-12 8.9% ($11.3) · 12-14 8.7% ($11.5).

**MC trio distribution (direct simulator output: 5 × 10,000-run re-executions of the same `MonteCarloSimulator` on the enriched card saved by `analyze-race.ts`, σ = 8 as the pipeline uses at Sha Tin, averaged):** 1-2-12 **8.16%** · 1-3-12 **6.66%** · 2-3-12 5.76% · 1-8-12 5.75% · 1-12-14 5.54% · 2-8-12 4.74% · 2-12-14 4.63% · 3-12-14 4.12% · 3-8-12 4.02% · 8-12-14 3.40% · 1-4-12 2.13% · 1-2-3 2.01%. P(#12 top 3) = **74.5–75.3%**, P(#12 **and** #1 both top 3) = **32.0%**.

**Stability across the 5 re-runs (+ the pipeline run):** #12 was MC #1 in **6/6** runs (39.6–41.6% win, 74.8–75.7% place), a ~26pp lead over #2. #1 (14.7–15.8%) and #2 (12.0–12.6%) held 2nd/3rd in 6/6. #3 was 4th on win% in 6/6. **#8 and #14 are tied** (canonical 31.6% / 31.6% place; 5-run average 31.7% / 31.5%, range 31.1–32.2%). Both **stay above 30% in every run**, so neither ever becomes "replaceable" under Strategy B's rule. #4 held at 12.4–13.2% place (never > 20%).

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | Win Odds (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|-----------------|------------------|----------|----------|-----------|---------------|
| 1 | SOVEREIGN FUND | 16 | **+form** (last start "upset win from midfield" over 1,400m); has top weight | clear | clear | — | Speed-tracker / midfield |
| 2 | AEROVOLANIC | 16 | — (last start "failing yet again to handle 1,600m"; ground-covering 3rd and unlucky 5th are older) | bumped at the start (start incident only — not scored, see discipline) | clear | **+trial** ("easily made all in a recent dirt trial and has strong claims here") | On-pace (made all in trial) |
| 3 | ALL OUT FOR SIX | 23 | — ("ran on late for a distant fifth"; changed stables) | **+excuses** (**checked**; **difficulty obtaining clear running** at 300M) | clear | — | Midfield / closer |
| 4 | FLOW WATER FLOW | 8.6 | — (rallying seconds and wins are stale; resumed from a **fever in February** with a fifth) | bumped on jumping (once → no −barrier) | clear (fever > 30 days ago, already raced since) | — | Midfield / closer |
| 5 | CHIU CHOW SPIRIT | 12 | — ("gotten going late for sixth and eighth"; "Goes well fresh") | bumped on jumping (once → no −barrier) | clear (age 7 → no −age) | — | Closer |
| 6 | RUN RUN SMART | 15 | — (made all in May is 3 runs back → stale; "setting a quick pace for fifth" last start) | clear (raced keenly in the lead — self-inflicted) | clear | — | Front-runner |
| 7 | MEANINGFUL DRAGON | 16 | — ("failing up in Class Three") | clear (rider: "pressured in the lead" — pace, not interference); post-race vet no findings | clear (January lameness > 30 days ago) | — | Front-runner / speed-tracker |
| 8 | MONARCH COUNTY | 23 | — (win "three runs later" is stale; "fifth and fourth with excuses") | **+excuses** (shifted in and **bumped**; **raced wide and without cover** most of the race) | clear | **+trial** ("Did trial well for third on dirt") | Midfield / closer |
| 9 | MONEY GAMES | 14 | — (Australian import, unbeaten in 2 starts) | — (no HK runs) | clear | **+trial** ("Hit the line well nine days ago … for a second win in Conghua") | Unknown (HK debut) |
| 10 | WINNING GOLD | 9.5 | — (rallying seconds 2–3 runs back → stale; "running on for sixth" last start) | **+excuses** ("directed out to obtain clear running and made contact with a runner") | clear | **+trial** ("Easily won a recent dirt trial") | Midfield / closer |
| 11 | BIG RETURN | 24 | — ("staying on for minor placings twice in a higher grade") | jumped only fairly (once → no −barrier) | clear | — | Midfield |
| 12 | NYX GLUCK | 2.6 | **+form** (last start "coming from last to salute"); "Richer class now" | clear (trainer: raced further back than intended because of a fast pace — in the winning run, not trouble) | clear | "Has trialled fine" (weak wording → not scored) | Closer (last start), trainer wants handier |
| 13 | RISING PHOENIX | 28 | **+form** (last start "another Class Four win"); "Needs to lift at this level" | clear | clear | — | Midfield |
| 14 | FLYING KNIGHT | 17 | — ("placing fifth after a torrid trip"; "Minor claims") | **+excuses** (**raced wide and without cover** for the majority) | clear | — | Box-seat / speed-tracker |

**Flag discipline (same conventions as the 13-Sep R1–R9 reports):**
- `+excuses` only where the horse **received** trouble of the kind the skill lists (crowded / steadied / wide trip / no clear running): #3 checked and no clear running, #8 wide without cover, #10 had to be directed out for clear running, #14 wide without cover. Withheld from #2 ("bumped at the start"), #4 and #5 ("bumped on jumping"), which are single start incidents; from #6 (raced keenly — self-inflicted); and from #7 (pressured for the lead — pace, not interference).
- `+form` only for a win / rally / made-all in the **latest** run: #1, #12, #13 (all won last start). Withheld as stale: #4, #6, #8, #10.
- `+trial` for clearly positive trial comments: #2 ("easily made all … strong claims"), #9 ("hit the line well … second win"), #10 ("easily won"), #8 ("did trial well for third"). The #8 call is a judgment; without it #8 is 10.2% / 33.6%, still in the pool. Withheld from #12 ("has trialled fine" is neutral wording); with it #12 would be 44.6% / 78.7% — no change to banker, mode or pool.
- No `−injury30d` (no vet entry passed < 30 days ago), no `−age` (oldest runner #5 is 7), no `−barrier` (no horse "bumped on jumping" in ≥ 2 listed runs), no `−perf`, no `−notRO`.
- Wide-gate comments are noted but not scored: the skill's factor list has no gate label, as in earlier reports.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC + SCMP adjustments, Step 3c/4a)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 12 | NYX GLUCK | 41.6% | 75.7% | +form +1 | +form +1 | **42.6%** | **76.7%** | 3.5 | Z Purton | 1 | Closer / mid | +form | ★ 膽 (Banker) |
| 2 | 1 | SOVEREIGN FUND | 14.7% | 45.9% | +form +1 | +form +1 | **15.7%** | **46.9%** | 14 | K Teetan | 3 | Speed-track | +form | 腳 (Leg) |
| 3 | 2 | AEROVOLANIC | 12.0% | 40.7% | trial +2 | trial +2 | **14.0%** | **42.7%** | 12 | A Atzeni | 6 | On-pace | +trial | 腳 (Leg) |
| 4 | 8 | MONARCH COUNTY | 8.2% | 31.6% | excuses +2, trial +2 | excuses +2, trial +2 | **12.2%** | **35.6%** | 22 | L Ferraris | 11 | Mid / closer | +excuses, +trial | 腳 (Leg) |
| 5 | 3 | ALL OUT FOR SIX | 9.7% | 35.6% | excuses +2 | excuses +2 | **11.7%** | **37.6%** | 19 | M Chadwick | 8 | Mid / closer | +excuses | 腳 (Leg) |
| 6 | 14 | FLYING KNIGHT | 8.3% | 31.6% | excuses +2 | excuses +2 | **10.3%** | **33.6%** | 13 | K C Leung | 2 | Box-seat | +excuses | 腳 (Leg) — must-include (≥25%) |
| 7 | 10 | WINNING GOLD | 0.3% | 3.0% | excuses +2, trial +2 | excuses +2, trial +2 | 4.3% | 7.0% | 9.1 | C L Chau (-2) | 10 | Mid / closer | +excuses, +trial | — |
| 8 | 9 | MONEY GAMES | 0.4% | 4.0% | trial +2 | trial +2 | 2.4% | 6.0% | 10 | J Orman | 13 | Unknown | +trial | — |
| 9 | 4 | FLOW WATER FLOW | 2.2% | 13.1% | 0 | 0 | 2.2% | 13.1% | 8.0 | B Avdulla | 4 | Mid / closer | — | — |
| 10 | 13 | RISING PHOENIX | 0.4% | 3.7% | +form +1 | +form +1 | 1.4% | 4.7% | 25 | M F Poon | 7 | Midfield | +form | — |
| 11 | 11 | BIG RETURN | 0.8% | 4.8% | 0 | 0 | 0.8% | 4.8% | 23 | L Hewitson | 9 | Midfield | — | — |
| 12 | 6 | RUN RUN SMART | 0.8% | 5.7% | 0 | 0 | 0.8% | 5.7% | 15 | H Y Yuen (-10) | 5 | Front | — | — |
| 13 | 5 | CHIU CHOW SPIRIT | 0.3% | 2.9% | 0 | 0 | 0.3% | 2.9% | 13 | A Badel | 12 | Closer | — | — |
| 14 | 7 | MEANINGFUL DRAGON | 0.2% | 1.7% | 0 | 0 | 0.2% | 1.7% | 17 | P N Wong (-7) | 14 | Front | — | — |

**Factor legend:** `trial +2` strong trial/trackwork · `excuses +2` TIR trouble received · `+form +1` last-start winner per Star Form. The largest net adjustment is +4 (#8, #10). No horse reaches the ±8% / ±10% cap or the 50% Win / 85% Place ceiling.

**Banker eligibility (rules 1 / 17):** #12 NYX GLUCK has 10 indexed starts → eligible. (#9 MONEY GAMES is the only HK debutant and is not in contention for banker.)

**雙膽拖 — not triggered.** 2nd-ranked #1 SOVEREIGN FUND has Adj Place% **46.9%** (5-run raw 46.1–47.2% → adj 47.1–48.2%), well below the 63% bar. → 膽拖 with #12 alone.

**Classification.** Top Adj Win% = #12 at **42.6%** (5-run raw 39.6–41.6% → adj 40.6–42.6%, always ≥ 35%) → **Dominant → Mode A, Tight Pool**.

**Reasoning for the pool.**
- **Mode A** = banker #12 + the 4 best others by Adj Place%: **#1 (46.9%), #2 (42.7%), #3 (37.6%), #8 (35.6%)**.
- The **must-include rule** (Adj Place% ≥ 25%) then adds **#14 FLYING KNIGHT (33.6%)**, taking the pool to **6**. This follows the R8 precedent (must-include expands the mode's nominal size) and stays within the skill's 5–7 pool range. The next horse, #4 at 13.1%, is 20pp below the bar, so the pool is the same under Reminder 8's 20% reading.
- #8 and #14 are **tied on raw MC** (31.6% / 31.6%). Only the SCMP flags separate them: #8 gets excuses + trial, #14 excuses only. With a 6-horse pool both are in, so the tie doesn't matter.

**Not in pool, market ≤ 15 (Reminder 9 check):** #4 FLOW WATER FLOW (8.0 / 7.9), #10 WINNING GOLD (9.1 / 8.7), #9 MONEY GAMES (10 / 11), #5 CHIU CHOW SPIRIT (13 / 11), #6 RUN RUN SMART (15 / 15). **None carries a negative flag**, so Reminder 9 (which protects horses from exclusion *because of* negative flags) does not force them in. They are simply far down on Adj Place% (2.9–13.1%). Strategy B picks up #4 and #10 through its Win-odds rule. A 7-horse priced alternative (+#4) is shown in the Ticket Summary.

**Pace read.** The likely leaders are **#6 RUN RUN SMART** (gate 5, made all in May, "setting a quick pace" last start) and **#7 MEANINGFUL DRAGON** (gate 14, was "pressured in the lead" last start). **#2 AEROVOLANIC** (gate 6) easily made all in a trial and may press forward. That points to a genuine tempo, which suits the stalkers and closers. The banker **#12** has **gate 1**; last start he came from last to win "in a suitably run race", and the trainer wants a handier position. From the rail he should get cover, but a closer from gate 1 can be held up if he is buried on the fence. **#14** (gate 2, box-seat winner in May) and **#1** (gate 3, speed-tracker) should sit handy inside. #3 (gate 8) and #8 (gate 11) will need luck from wider gates; #8 was caught wide last time.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: **#12, #1, #2, #8, #3, #14**
MODE: **A — Tight Pool (expanded to 6 by must-include)** | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#12 NYX GLUCK** (Adj Place% 76.7%) ← locked in every combo
腳 (Legs):  **#1, #2, #8, #3, #14**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**

TOP TRIO COMBINATIONS (Plackett-Luce fitted to Adj Place%; all 10 ticket combos; MC-direct 5-run average in brackets):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds ($10) |
|------|--------------------|-----------------|----------------------|
| 1 | #1, #2, #12 | 6.89% (MC 8.16%) | $145 |
| 2 | #1, #3, #12 | 5.78% (MC 6.66%) | $173 |
| 3 | #1, #8, #12 | 5.38% (MC 5.75%) | $186 |
| 4 | #2, #3, #12 | 5.03% (MC 5.76%) | $199 |
| 5 | #1, #12, #14 | 4.99% (MC 5.54%) | $200 |
| 6 | #2, #8, #12 | 4.68% (MC 4.74%) | $214 |
| 7 | #2, #12, #14 | 4.34% (MC 4.63%) | $230 |
| 8 | #3, #8, #12 | 3.92% (MC 4.02%) | $255 |
| 9 | #3, #12, #14 | 3.64% (MC 4.12%) | $275 |
| 10 | #8, #12, #14 | 3.39% (MC 3.40%) | $295 |

**Ticket coverage: 48.1%** (adjusted PL fit) / **52.8%** (direct MC trio counts) for 10 combos. The ceiling is P(#12 top 3) ≈ 75%.

**Fit note (disclosed):** Adj Place% sums to **319.0%** vs the 300% any real top-3 distribution must total. The PL fit renormalises ~6% proportionally (e.g. #12 76.7% → 72.1%), which is why PL coverage sits below MC-direct. The fit is otherwise exact (max error 0.0001pp).

**Largest combinations NOT covered (MC direct):** 1-4-12 **2.13%** (#4 not in pool), 1-2-3 2.01% (no banker), 1-2-14 1.61% and 1-2-8 1.61% (no banker), 2-4-12 1.54%. The main exposure is **banker failure** (#12 misses the frame ~25% of the time), then #4 FLOW WATER FLOW filling a place.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
- **The banker is the market favourite (3.4–3.5)**, so every combo contains the shortest-priced horse. This depresses dividends. The value has to come from the legs.
- **The legs are all mid-to-long prices:** #1 14–15, #2 10–12, #3 19–23, #8 22–26, #14 13–14. None of the market's 2nd–4th favourites (#4, #10, #9) is in the Strategy A pool. If #12 places with two of these legs, the dividend should be decent. The market is effectively paying for the chance that #4, #10 or #9 fill the frame.
- **The model–market disagreement is on the legs, not the banker.** MC rates #1, #3 and #8 as 114–124% undervalued, while it gives the 2nd and 3rd favourites #4 and #10 only 13.1% and 3.0% place. If the market is right about #4 (7.9–8.6), 1-4-12 (2.1%) is the most likely combo Strategy A misses.
- SCMP Q/QP matrix could not be used for cross-reference (rule 14) — see caveats.

**Verdict:** a model-structured race with strong agreement on the banker (MC #1 6/6, market favourite, finish-time projection also #1). Strategy A bets that the frame is filled by #12 plus two of the model's mid-priced place types, not by the market's second-tier favourites.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 膽拖 (1 Banker + 5 Legs)
膽 (Banker): **#12 NYX GLUCK**
腳 (Legs):  #1 SOVEREIGN FUND, #2 AEROVOLANIC, #8 MONARCH COUNTY, #3 ALL OUT FOR SIX, #14 FLYING KNIGHT
COMBINATIONS: **10** (C(5,2): 1-2-12, 1-3-12, 1-8-12, 2-3-12, 1-12-14, 2-8-12, 2-12-14, 3-8-12, 3-12-14, 8-12-14)
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

TOP COMBINATIONS (highest value):
  1-2-12 (6.9% adj / 8.2% MC) · 1-3-12 (5.8% / 6.7%) · 1-8-12 (5.4% / 5.8%) · 2-3-12 (5.0% / 5.8%) · 1-12-14 (5.0% / 5.5%)

Priced alternatives (not the recommendation, shown so the trade-offs are visible):
| Variant | Structure | Combos | Cost | Coverage (adj PL / MC) |
|---------|-----------|--------|------|------------------------|
| Strict Mode A (ignores must-include) | 膽拖 1膽 #12 + 4腳 (1, 2, 3, 8) | 6 | $60 | 31.7% / 35.1% |
| **Recommended (rule output)** | 膽拖 1膽 #12 + 5腳 (1, 2, 8, 3, 14) | 10 | **$100** | 48.1% / 52.8% |
| + #4 FLOW WATER FLOW (2nd favourite) | 膽拖 1膽 #12 + 6腳 (1, 2, 8, 3, 14, 4) | 15 | $150 | 54.6% / 60.3% |
| Full pool, no banker | C(6,3) | 20 | $200 | — / 65.6% |

PASS CONDITIONS:
- If **#12 NYX GLUCK** (Banker) is scratched → **VOID** the ticket (rule 10); do not restructure.
- If the field drops below 3 starters → pool refunded (not a live risk).
- If **#12 drifts past ~6** late → the market is fading the banker; downgrade to PASS.
- If the going moves to **Yielding or softer** → re-run the MC (the simulation used Good to Firm).
- If **#4 FLOW WATER FLOW firms below ~5** → the market is strongly backing a horse outside the pool. Consider the $150 (+#4) variant; no change to banker.

CONFIDENCE: **MEDIUM-HIGH.** For: Dominant race; #12 is MC #1 in 6/6 runs with a ~26pp margin; market favourite (model and market agree); the analyzer's finish-time projection also ranks #12 **1st**; last-start winner; Z Purton; gate 1; 14 lb weight advantage over #1. Against: (1) steps up in class ("Richer class now"); (2) last start he won from last — a closer from the rail can get held up; (3) the whole field is resuming 60–78 days off; (4) the finish-time projection ranks the 2nd-ranked leg #1 **last** (see caveats); (5) the market's 2nd–4th favourites (#4, #10, #9) are all outside the pool.

CAVEATS:
- **SCMP odds columns unusable — not used.** The SCMP Place column is higher than its Win column for the favourite (#12 Win 2.6 / Place 3.7), which is impossible for real pool odds. Other Place figures sit almost level with Win (e.g. #6 15 / 15, #8 23 / 23). This is the same stale or mislabelled snapshot pattern seen in R9. HKJC is the primary source.
- **SCMP Q/QP matrix unreliable — not used.** The fetched pairs are inconsistent with the win market: Q 3-12 at 4.8 is shorter than 1-12 (7.0) and 2-12 (7.8), although #3 is 19–23 on the win market. Q 12-14 at 89 while #14 is 13–14. Several #12 pairs were missing from the fetched table. Rule 14 cross-reference skipped.
- **Place odds estimated** from win odds by the analyzer — only Win odds used for Strategy B tests.
- **Internal model inconsistency.** The analyzer's finish-time projection ranks **#1 SOVEREIGN FUND last** (+3.71s) and **#2 AEROVOLANIC 10th** (+2.10s), while the win/place simulation makes them MC #2 and #3. The projection puts **#14 FLYING KNIGHT** 2nd (+0.11s) and #3 3rd. It agrees on the banker (#12 fastest). The Trio ranking follows Win%/Place% as the skill specifies; the projection is a separate speed-figure output.
- **#9 MONEY GAMES is an HK debutant** — MC has no HK form for him (4.0% place is rating-driven). He is 10–11 in the market with a Conghua trial win and J Orman, but gate 13.
- **Resuming field:** every raced runner is 60–78 days off (none > 90 days). Form is last-season form.
- **Jockey-stat samples are small** (4–18 rides per jockey in the indexed data) — e.g. banker jockey Z Purton 22% from 18.
- **MC trio map omits combos below 0.1%** (the averaged map sums to 95.3%). All ticket combos are in the map, so ticket coverage figures are exact; only the "uncovered" tail is understated.
- **SCMP judgment calls** (disclosed above): #8's "did trial well" scored as `+trial`; #12's "has trialled fine" not scored; single "bumped at the start / on jumping" incidents (#2, #4, #5) not scored as excuses; #10's "directed out to obtain clear running" scored as excuses. None changes the banker, mode or pool.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#12 NYX GLUCK** (MC Win% 41.6%, MC Place% 75.7%) ← 1st by MC Win% (6/6 runs)

Primary legs (MC Place% > 20%): **#1 (45.9%), #2 (40.7%), #3 (35.6%), #14 (31.6%), #8 (31.6%)**

Replaceable legs (MC Place% in 20–30% **AND** Win odds > 10):
  - **None.** The weakest primary legs, #14 and #8, are at 31.6% (5-run range 31.1–32.2%). They never fall into the 20–30% band.

Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10), in ascending odds order:
  1. **#4 FLOW WATER FLOW** (Win odds 8.0 at 10:08 / 7.9 at 13:26, MC Place% 13.1%)
  2. **#10 WINNING GOLD** (Win odds 9.1 at 10:08 / 8.7 at 13:26, MC Place% 3.0%)
  (#9 MONEY GAMES at 10 / 11 does not qualify — the rule is strictly < 10.)

Action: **no replaceable leg exists → #4 added directly, then #10 added directly.**

Final legs: **#1, #2, #3, #14, #8, #4, #10**
BET STRUCTURE: 膽拖 | 1膽 + 7腳 | COMBINATIONS: C(7,2) = **21**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $210**

STRATEGY B TICKET (direct MC trio counts, 5-run average; Plackett-Luce on raw MC Place% in brackets):

| Rank | Horses (any order) | MC Trio% | Est. Fair Odds ($10) |
|------|--------------------|----------|----------------------|
| 1 | #1, #2, #12 | 8.16% (PL 7.99%) | $123 |
| 2 | #1, #3, #12 | 6.66% (PL 6.64%) | $150 |
| 3 | #2, #3, #12 | 5.76% (PL 5.55%) | $174 |
| 4 | #1, #8, #12 | 5.75% (PL 5.69%) | $174 |
| 5 | #1, #12, #14 | 5.54% (PL 5.69%) | $181 |
| 6 | #2, #8, #12 | 4.74% (PL 4.75%) | $211 |
| 7 | #2, #12, #14 | 4.63% (PL 4.75%) | $216 |
| 8 | #3, #12, #14 | 4.12% (PL 3.94%) | $243 |
| 9 | #3, #8, #12 | 4.02% (PL 3.94%) | $249 |
| 10 | #8, #12, #14 | 3.40% (PL 3.38%) | $294 |
| 11 | #1, #4, #12 | 2.13% (PL 2.06%) | $469 |
| 12 | #2, #4, #12 | 1.54% (PL 1.72%) | $649 |
| 13 | #3, #4, #12 | 1.39% (PL 1.43%) | $719 |
| 14 | #4, #8, #12 | 1.23% (PL 1.22%) | $813 |
| 15 | #4, #12, #14 | 1.22% (PL 1.22%) | $820 |
| 16 | #1, #10, #12 | 0.47% (PL 0.44%) | $2,128 |
| 17 | #2, #10, #12 | 0.37% (PL 0.37%) | $2,688 |
| 18 | #3, #10, #12 | 0.30% (PL 0.31%) | $3,311 |
| 19 | #10, #12, #14 | 0.27% (PL 0.26%) | $3,731 |
| 20 | #8, #10, #12 | 0.24% (PL 0.26%) | $4,132 |
| 21 | #4, #10, #12 | 0.07% (PL 0.09%) | $14,286 |

**Ticket coverage: 62.0%** (MC direct) / 61.7% (PL on raw MC). Only #12 needs to be in the frame (MC Place% 75.7%).

⚠️ **Cost efficiency of the Win-odds additions (disclosed):** adding #4 costs $50 (5 combos) for **+7.5pp** of MC coverage. Adding #10 costs **$60 (6 combos) for only +1.7pp**, because MC gives #10 just 3.0% place. The #10 combos are priced at $2,100–$14,300 fair. This is the rule output, so it is kept, but #10 is a market-only leg.

⚠️ **Late-odds watch (Strategy B composition depends on late prices):**
- If **#10 WINNING GOLD drifts to ≥ 10** at the off → it drops out → legs #1, #2, #3, #14, #8, #4 → **15 combos, $150** (60.3% MC).
- If **#4 FLOW WATER FLOW drifts to ≥ 10** → it drops out → legs #1, #2, #3, #14, #8, #10 → 15 combos, $150.
- If **#9 MONEY GAMES (10 → 11) or #5 CHIU CHOW SPIRIT (13 → 11) shortens below 10** → each is **added directly** (still no replaceable leg) → 8 legs, **28 combos, $280** per extra horse added.
- #2 AEROVOLANIC shortened 12 → 10; it is already a primary leg, so no effect.

**Comparison vs Strategy A.** Both use the same banker (#12) and the same five core legs (#1, #2, #3, #8, #14). Strategy B adds the market's 2nd and 3rd favourites, **#4 and #10**, through its Win-odds rule. This costs **$210 vs $100** and lifts MC coverage from **52.8% to 62.0%**. Strategy B is the **hedge toward the market**: 1-4-12 (2.1%) is the largest combo Strategy A misses, and B covers it. Most of B's extra value comes from #4; #10 adds little under the model.
═══════════════════════════════════════════════════════════
