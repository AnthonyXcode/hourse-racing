═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-13 | Race 9
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good to Firm (HKJC card re-scraped 12:08 HKT) | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --date 2026-09-13 --venue "Sha Tin" --race 9 --form-data all --bankroll 10000 --kelly 0.35 --min-edge 5`) — 2,249 historical races / 2,311 indexed performances; 13/14 horses enriched (#12 VIVA PROSPERAR has no HK form); 14 jockey + 14 trainer profiles loaded
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction)
SCMP DATA: ✅ Loaded — Star Form, TIR, Vet, Trackwork for all 14 runners. ⚠️ SCMP odds columns and Q/QP matrix unreliable (see caveats) — **not used**. Tipster picks ignored per skill rule 13.
ODDS SOURCE: **HKJC win pool** (`fetch-odds.ts`, `data/odds/odds_20260913_ST.json`, captured 10:08 HKT 13-Sep) — complete for all 14 runners
             Cross-check: `analyze-race.ts` own HKJC fetch at **12:08 HKT** — **no horse flips** on the Win-odds<10 test between the two HKJC snapshots
             SCMP odds: ⚠️ loaded but unusable (Place column exceeds Win for the favourite; see caveats) | HKJC live: two snapshots (10:08, 12:08), prices will move before the off
             ⚠️ Place odds NOT usable — `analyze-race.ts` logged "place odds estimated from win odds". All Strategy B odds tests use **Win odds only**, as the rule specifies.

RACE: R9 OI TUNG HANDICAP — **Class 3** | 1200m | Turf | Good to Firm | **14 runners**
CLASSIFICATION: **Competitive** (top Adj Win% 30.4%; raw MC 30.4%, 5-run avg 30.8%) | POOL SIZE: 6
MODE: **B — Standard Pool (6)**
BET STRUCTURE: **膽拖** | 1膽 + 5腳 | C(5,2) = **10 combinations** (2nd-ranked #4 Adj Place% 56.2% < 63% → no 雙膽拖)
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL (Step 2)
───────────────────────────────────────────────────────────
```
Meeting: Sha Tin 2026-09-13 | Going: Good to Firm (HKJC card at 12:08; earlier card snapshot said Good) | Surface: Turf
Target Race: R9 (Class 3 | 1200m Turf | 14 runners)
Scratchings: none (all 14 entries isScratched=false; SCMP lists the same 14 with matching draws)
Odds coverage: 14 / 14 horses with HKJC Win odds (10:08 and 12:08)
Starters: 14 ≥ 3 → Trio pool valid
Jockey stats: 14 jockey profiles + 14 trainer profiles loaded
Debutants / thin form: #12 VIVA PROSPERAR — 0 HK starts (1 Australian start + 6 Conghua trials);
                       #11 GULU GOGO — 1 HK start; #7 STAY COSMIC and #14 WELL ENOUGH — 2 starts.
                       Banker #8 THUNDER KIT has 9 indexed starts → rules 1 / 17 satisfied.
Long layoff (>90 days): #1 CHILL BUDDY, #6 CELESTIAL HERO, #14 WELL ENOUGH (all 98d — last run 7-Jun)
SCMP data: ✅ Form/TIR/Vet/Trackwork loaded (all 14); ⚠️ odds columns + Q/QP unusable
```

⚠️ **Seasonal context — nearly the whole field is resuming.** 13 of 14 runners last raced between 7-Jun and 15-Jul (60–98 days ago). The exception is the favourite **#5 LUCY IN THE SKY**, who resumed 7 days ago (4th, 6-Sep) and is the only fit-from-a-run horse.

⚠️ **Weights:** top-rated #1 CHILL BUDDY (78) carries **135 lb** ("Carries 6lb more" after making all); #2 134, #3 132. Banker #8 carries 127. #5 has H Y Yuen's 10 lb claim (128 lb on the card).

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — shared basis for both strategies
───────────────────────────────────────────────────────────

Flags use HKJC 10:08 Win odds (12:08 in brackets — no flag changes). Canonical run = the `analyze-race.ts` output; 5-run re-execution averages are shown under Stability.

| # | Horse | MC Win% | MC Place% | Win Odds (10:08 / 12:08) | Place%>20% | Win odds<10 | Draw | Wt | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|--------------------------|------------|-------------|------|----|------|-------------------|--------------------------|
| 8 | THUNDER KIT | 30.4% | 64.3% | 7.1 / 6.2 | ✅ | ✅ | 4 | 127 | 9 | ★ 膽 (Banker) | 4-8: 15.1% (6.6) |
| 4 | FIT FOR BEAUTY | 22.5% | 54.2% | 21 / 19 | ✅ | ❌ | 6 | 129 | 10 | 腳 (Leg) | 4-8: 15.1% (6.6) |
| 5 | LUCY IN THE SKY | 11.5% | 35.6% | 1.9 / 2.3 | ✅ | ✅ | 7 | 128 | 10 | 腳 (Leg) | 5-8: 7.9% (12.6) |
| 3 | MIGHTY COMMANDER | 10.3% | 34.5% | 31 / 30 | ✅ | ❌ | 10 | 132 | 10 | 腳 (Leg) | 3-8: 7.6% (13.2) |
| 11 | GULU GOGO | 7.0% | 26.3% | 20 / 15 | ✅ | ❌ | 2 | 121 | 1 | — (replaced by #1) | — |
| 2 | AURORA PATCH | 6.7% | 26.8% | 21 / 19 | ✅ | ❌ | 12 | 134 | 10 | 腳 (Leg) | — |
| 1 | CHILL BUDDY | 4.3% | 18.8% | 9.4 / 7.8 | ❌ | ✅ | 1 | 135 | 9 | 腳 (Leg) — replacement candidate, swapped in for #11 | — |
| 12 | VIVA PROSPERAR | 2.3% | 11.2% | 12 / 11 | ❌ | ❌ | 14 | 121 | 0 | — | — |
| 13 | ANODE | 1.7% | 8.9% | 25 / 22 | ❌ | ❌ | 3 | 120 | 10 | — | — |
| 7 | STAY COSMIC | 1.1% | 6.2% | 52 / 48 | ❌ | ❌ | 5 | 127 | 2 | — | — |
| 10 | THE BOOM BOX | 1.0% | 5.8% | 37 / 34 | ❌ | ❌ | 11 | 124 | 10 | — | — |
| 9 | SAVVY BRILLIANT | 0.7% | 3.8% | 20 / 19 | ❌ | ❌ | 9 | 125 | 10 | — | — |
| 6 | CELESTIAL HERO | 0.5% | 3.6% | 22 / 20 | ❌ | ❌ | 8 | 127 | 10 | — | — |
| 14 | WELL ENOUGH | 0.0% | 0.0% | 70 / 71 | ❌ | ❌ | 13 | 117 | 2 | — | — |

**Market:** Overround **23.3%**, favourite bias **−73.5%**, longshot bias −13.1%. Model and market **disagree on the favourite**: #5 LUCY IN THE SKY is 1.9 → 2.3 (implied ~40–45% win) but MC gives her only **11.5% win / 35.6% place** (fair ~8.7). MC's #1 is **#8 THUNDER KIT** (30.4% win, fair ~3.3) at 6.2–7.1 in the market, and MC's #2 is **#4 FIT FOR BEAUTY** (22.5%, fair ~4.4) at 19–21 — the analyzer flags #4 "undervalued by 327%" and #3 MIGHTY COMMANDER (10.3% at 30–31) "undervalued by 207%".

**Top quinella combinations (MC, canonical):** 4-8 15.1% ($6.6) · 5-8 7.9% ($12.6) · 3-8 7.6% ($13.2) · 4-5 5.9% ($17.1) · 3-4 5.4% ($18.4).

**MC trio distribution (direct simulator output, 5 × 10,000-run re-executions on the enriched card saved by `analyze-race.ts`, same `MonteCarloSimulator`, σ = 8 as the pipeline uses at Sha Tin, averaged):** 4-5-8 **6.69%** · 3-4-8 **6.56%** · 4-8-11 4.84% · 2-4-8 4.64% · 3-5-8 3.40% · 1-4-8 3.15% · 5-8-11 2.31% · 3-4-5 2.30% · 2-3-8 2.25% · 3-8-11 2.23% · 2-5-8 2.23% · 4-8-12 1.84%. P(#8 top 3) = **64.1%**, P(#8 **and** #4 both top 3) = **32.3%**.

**Stability across the 5 re-runs (+ 1 pipeline re-run):** #8 was MC #1 in **6/6** runs (30.3–31.4% win, 63.9–65.4% place). #4 was #2 in 6/6 (21.6–22.6%). #5 and #3 swap 3rd/4th on win% (both ~10.5–11%). **#2 vs #11 is a coin-flip on place%**: canonical run #2 26.8% / #11 26.3%, but 5-run average #11 26.5% / #2 25.7% (#2 lower in 4 of 5 re-runs). This matters for the Strategy B swap — see Strategy B. #1 CHILL BUDDY stayed at 17.6–18.6% place (never > 20%).

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | Win Odds (SCMP) | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|-----------------|------------------|----------|----------|-----------|---------------|
| 1 | CHILL BUDDY | 13 | **+form** (last start "making all under a senior rider"); carries 6lb more | clear | clear | — | Front-runner |
| 2 | AURORA PATCH | 38 | — ("staying on for fifth after a tough run from gate 11") | **+excuses** (raced **wide and without cover** for most of the race) | clear | **+trial** ("only caught late … looks in top condition") | Midfield / on-pace |
| 3 | MIGHTY COMMANDER | 50 | — (January rally and April 1,400m win are stale — not last start) | **+excuses** (**steadied**; **disappointed for clear running** at 300M) | clear | — | Midfield / closer |
| 4 | FIT FOR BEAUTY | 29 | — ("seventh with excuses in back-to-back runs"; "Needs to lift on his two 1,200m runs") | **+excuses** (**held up for clear running** 450–350M) | clear | — | Midfield |
| 5 | LUCY IN THE SKY | 1.4 | — ("front-running fourth with late market action"; bleed history last term; "Claim is well utilised") | clear | clear (no current vet entry) | — | Front-runner |
| 6 | CELESTIAL HERO | 30 | — ("failed after a wide trip") | **+excuses** (wide without cover) **and −notRO** (rider concerned with action, did not ride out) **and −perf** ("Performance was considered unacceptable") | **−injury30d** (7-Jun rider concerned with action, eased; **passed 31-Aug**, 13 days ago) | **+trial** ("Responded well to win a lead-up trial") | Midfield |
| 7 | STAY COSMIC | 64 | — ("tiring 12th") | **+excuses** (**steadied** near 1100M) | clear | — | Midfield / closer |
| 8 | THUNDER KIT | 11 | — (the "rallied" sequence is 5+ starts old → stale; "Comes off a third from midfield") | **+excuses** (**bumped**; **positioned tight**) **and −notRO** ("could not be ridden out when positioned tight"); knee abrasion on arrival, passed fit to race | clear | — | Midfield / stalker |
| 9 | SAVVY BRILLIANT | 20 | — ("never threatening sixth") | clear (steadied because it raced keenly — self-inflicted, not interference) | clear | — | Back marker |
| 10 | THE BOOM BOX | 54 | — (Nov rally stale) | **+excuses** (**held up**) **and −notRO** ("could not be ridden out when held up") | clear | — | Midfield / closer |
| 11 | GULU GOGO | 30 | — ("from towards the rear for sixth" on debut) | clear | clear | **+trial** ("Made all in a recent dirt trial") | Back marker (debut); led in trial |
| 12 | VIVA PROSPERAR | 12 | — (Australian winner; "Gate won't make it easy" from 14) | clear | clear | **+trial** ("Strode out nicely to win his latest" Conghua trial) | Unknown (HK debut) |
| 13 | ANODE | 40 | **+form** (last-start **winner**, "quickening well … from around midfield") | **+excuses** (**held up for clear running**) | **−injury30d** ("Lame left fore" 2-Jul, **passed 18-Aug**, 26 days ago) | — | Midfield |
| 14 | WELL ENOUGH | 104 | — ("struggled") | **+excuses** (**steadied when crowded**) **and −perf** ("performance was considered unacceptable"); jumped only fairly (once → no −barrier) | "Unacceptable performance" 7-Jun, passed 4-Sep (not an injury) | — | Back marker |

**Flag discipline (same conventions as the 13-Sep R1–R6 reports):**
- `+excuses` only where the horse **received** the trouble (#2 wide without cover, #3 steadied / no clear running, #4 held up, #6 wide without cover, #7 steadied, #8 bumped / tight, #10 held up, #13 held up, #14 crowded). Withheld from **#9**: it was steadied because it raced keenly.
- `−notRO` applied alongside `+excuses` where the stewards say the horse "could not be ridden out" (#8, #10), as R6 did for #5. Both net to 0.
- `+form` only for a rally/win/made-all in the **latest** run(s): #1 (made all last start) and #13 (won last start). Withheld as stale: #3 (January rally, April win), #8 (rallies 5+ starts back), #10 (November rally).
- `−injury30d` applied to **#13** (lame, passed 26 days ago) and **#6** — the 7-Jun entry is a soundness concern ("concerned horse's action … eased down"), passed 13 days ago. That #6 call is a judgment; it doesn't affect any pool.
- No `−age` (oldest runners are 6), no `−barrier` (no horse "bumped on jumping" in ≥ 2 runs).
- Wide-gate comments (#12 gate 14, #2 gate 12) are noted but not scored: the skill's factor list has no gate label, as in earlier reports.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC + SCMP adjustments, Step 3c/4a)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 8 | THUNDER KIT | 30.4% | 64.3% | excuses +2, -notRO −2 | excuses +2, -notRO −2 | **30.4%** | **64.3%** | 7.1 | C Y Ho | 4 | Mid / stalk | +excuses, −notRO | ★ 膽 (Banker) |
| 2 | 4 | FIT FOR BEAUTY | 22.5% | 54.2% | excuses +2 | excuses +2 | **24.5%** | **56.2%** | 21 | A Atzeni | 6 | Midfield | +excuses | 腳 (Leg) |
| 3 | 3 | MIGHTY COMMANDER | 10.3% | 34.5% | excuses +2 | excuses +2 | **12.3%** | **36.5%** | 31 | K C Leung | 10 | Mid / closer | +excuses | 腳 (Leg) |
| 4 | 5 | LUCY IN THE SKY | 11.5% | 35.6% | 0 | 0 | **11.5%** | **35.6%** | 1.9 | H Y Yuen (-10) | 7 | Front | — | 腳 (Leg) |
| 5 | 2 | AURORA PATCH | 6.7% | 26.8% | excuses +2, trial +2 | excuses +2, trial +2 | **10.7%** | **30.8%** | 21 | J Orman | 12 | Mid / on-pace | +excuses, +trial | 腳 (Leg) |
| 6 | 11 | GULU GOGO | 7.0% | 26.3% | trial +2 | trial +2 | **9.0%** | **28.3%** | 20 | K Teetan | 2 | Back (1 run) | +trial | 腳 (Leg) |
| 7 | 1 | CHILL BUDDY | 4.3% | 18.8% | +form +1 | +form +1 | 5.3% | 19.8% | 9.4 | C L Chau (-2) | 1 | Front | +form | — |
| 8 | 12 | VIVA PROSPERAR | 2.3% | 11.2% | trial +2 | trial +2 | 4.3% | 13.2% | 12 | Z Purton | 14 | Unknown | +trial | — |
| 9 | 7 | STAY COSMIC | 1.1% | 6.2% | excuses +2 | excuses +2 | 3.1% | 8.2% | 52 | B Avdulla | 5 | Mid / closer | +excuses | — |
| 10 | 13 | ANODE | 1.7% | 8.9% | -injury30d −3, excuses +2, +form +1 | -injury30d −4, excuses +2, +form +1 | 1.7% | 7.9% | 25 | E C W Wong (-3) | 3 | Midfield | −injury30d, +excuses, +form | — |
| 11 | 10 | THE BOOM BOX | 1.0% | 5.8% | excuses +2, -notRO −2 | excuses +2, -notRO −2 | 1.0% | 5.8% | 37 | H Bentley | 11 | Mid / closer | +excuses, −notRO | — |
| 12 | 9 | SAVVY BRILLIANT | 0.7% | 3.8% | 0 | 0 | 0.7% | 3.8% | 20 | A Badel | 9 | Back | — | — |
| 13 | 14 | WELL ENOUGH | 0.0% | 0.0% | excuses +2, -perf −2 | excuses +2, -perf −2 | 0.0% | 0.0% | 70 | M L Yeung | 13 | Back | +excuses, −perf | — |
| 14 | 6 | CELESTIAL HERO | 0.5% | 3.6% | excuses +2, trial +2, -notRO −2, -perf −2, -injury30d −3 | excuses +2, trial +2, -notRO −2, -perf −2, -injury30d −4 | 0.0% (floored from −2.5) | 0.0% (floored from −0.4) | 22 | L Hewitson | 8 | Midfield | +excuses, +trial, −notRO, −perf, −injury30d | — |

**Factor legend:** `trial +2` strong trial/trackwork · `excuses +2` TIR trouble received · `+form +1` made all / last-start winner per Star Form · `-notRO −2` not ridden out · `-perf −2` stewards' unacceptable performance · `-injury30d −3/−4` injury/soundness vet entry passed < 30 days ago. The largest net adjustment is +4 (#2). No horse reaches the ±8% / ±10% cap or the 50% Win / 85% Place ceiling. Negative results are floored at 0.0%.

**Banker eligibility (rules 1 / 17):** #8 THUNDER KIT has 9 indexed starts → eligible.

**雙膽拖 — not triggered.** 2nd-ranked #4 FIT FOR BEAUTY has Adj Place% **56.2%** (5-run range raw 54.2–55.4% → adj 56.2–57.4%), well below the 63% bar. → 膽拖 with #8 alone.

**Classification.** Top Adj Win% = #8 at **30.4%** (5-run raw 30.3–31.4%) → **Competitive (20–35%) → Mode B, 6-horse pool**.

**Reasoning for the pool.** Mode B = top 3 by Adj Win% (**#8 30.4%, #4 24.5%, #3 12.3%**) + the 3 best remaining by Adj Place% (**#5 35.6%, #2 30.8%, #11 28.3%**). All six clear the mandatory Adj Place% ≥ 25% bar, and they are exactly the six horses above 25%. The rule and the mode agree, so there is no tie-break.

**#1 CHILL BUDDY — the only borderline case (disclosed).** Adj Place% **19.8%** is just under Reminder 8's ≥ 20% must-include bar. Across the 5 re-runs his raw place was 17.6–18.6% (avg 18.4%) → adj 18.6–19.6%. **He never reaches 20%**, so he is not forced in. Rule 9 (market ≤ 15) doesn't force him in either: that rule protects horses with *negative* flags from exclusion, and #1 has only a positive flag; he simply ranks 7th. He is the market's 3rd favourite (9.4 → 7.8), and Strategy B picks him up through its Win-odds rule. A 7-horse priced alternative is shown in the Ticket Summary.

**Not in pool, market ≤ 15:** #1 (9.4 / 7.8) and #12 VIVA PROSPERAR (12 / 11). Neither is excluded for flags; both rank below 25% Adj Place (19.8%, 13.2%).

**Pace read.** Early speed from the inside: **#1 CHILL BUDDY** (gate 1, made all last start) and **#5 LUCY IN THE SKY** (gate 7, front-running 4th on 6-Sep). **#11 GULU GOGO** (gate 2) made all in a trial but came from the rear on debut. The banker **#8** (gate 4) and **#4** (gate 6) should sit handy to midfield with cover — a good trip for a 1,200m race on Good to Firm, where on-pace and stalking runners are favoured. #3 (gate 10) and #2 (gate 12) face wide trips; #2 was caught wide without cover last time. A genuine tempo from #1 and #5 suits #8's stalking style.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: **#8, #4, #3, #5, #2, #11**
MODE: **B — Standard Pool** | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#8 THUNDER KIT** (Adj Place% 64.3%) ← locked in every combo
腳 (Legs):  **#4, #3, #5, #2, #11**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**

TOP TRIO COMBINATIONS (Plackett-Luce fitted to Adj Place%; all 10 ticket combos; MC-direct 5-run average in brackets):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds ($10) |
|------|--------------------|-----------------|----------------------|
| 1 | #3, #4, #8 | 6.29% (MC 6.56%) | $159 |
| 2 | #4, #5, #8 | 6.08% (MC 6.69%) | $164 |
| 3 | #2, #4, #8 | 5.04% (MC 4.64%) | $198 |
| 4 | #4, #8, #11 | 4.54% (MC 4.84%) | $220 |
| 5 | #3, #5, #8 | 3.09% (MC 3.40%) | $323 |
| 6 | #2, #3, #8 | 2.56% (MC 2.25%) | $390 |
| 7 | #2, #5, #8 | 2.48% (MC 2.23%) | $403 |
| 8 | #3, #8, #11 | 2.31% (MC 2.23%) | $433 |
| 9 | #5, #8, #11 | 2.23% (MC 2.31%) | $448 |
| 10 | #2, #8, #11 | 1.85% (MC 1.57%) | $541 |

**Ticket coverage: 36.5%** (adjusted PL fit) / **36.7%** (direct MC trio counts) for 10 combos. The ceiling is P(#8 top 3) = 64.1%.

**Fit note (disclosed):** Adj Place% sums to **310.4%** vs the 300% any real top-3 distribution must total, so the PL fit renormalises ~3.4% proportionally (e.g. #8 64.3% → 62.1%). The fit is otherwise exact (max error 0.000pp).

**Largest combinations NOT covered (MC direct):** 1-4-8 **3.15%** (#1 not in pool), 3-4-5 2.30% (no banker), 4-8-12 1.84%, 4-5-11 1.69% (no banker), 1-3-8 1.61%. The main exposure is **banker failure** (#8 misses the frame ~36% of the time), then #1 CHILL BUDDY filling a place.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
- **The favourite #5 is only a leg**, not the banker. If she wins with #8 in the frame, the 5-8-X combos will pay modestly (a 1.9–2.3 favourite in the trio).
- **The value is in #4 FIT FOR BEAUTY (19–21) and #3 MIGHTY COMMANDER (30–31) alongside #8.** The two biggest ticket combos, 3-4-8 (fair ~$152–159) and 4-5-8 (fair ~$149–164), both need #4, whom MC rates a 22.5% winner vs ~5% implied by the market. If the model is even half right, these should pay well above fair.
- **That disagreement is also the biggest risk.** The market may know something: #4's last four runs were all at 1,400m, and SCMP says he "needs to lift on his two 1,200m runs". #5's 1.9 → 2.3 drift is modest, and the market still makes her a ~40% chance vs MC 11.5%. She is fit from a run 7 days ago, which a model built on last-season form may undervalue.
- SCMP Q/QP matrix could not be used for cross-reference (rule 14) — see caveats.

**Verdict:** a mid-priced ticket that anchors on the model's top horse (who is only the 2nd–3rd favourite) and gets its value from #4. The model and the market disagree about the favourite.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 膽拖 (1 Banker + 5 Legs)
膽 (Banker): **#8 THUNDER KIT**
腳 (Legs):  #4 FIT FOR BEAUTY, #3 MIGHTY COMMANDER, #5 LUCY IN THE SKY, #2 AURORA PATCH, #11 GULU GOGO
COMBINATIONS: **10** (C(5,2): 3-4-8, 4-5-8, 2-4-8, 4-8-11, 3-5-8, 2-3-8, 2-5-8, 3-8-11, 5-8-11, 2-8-11)
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

TOP COMBINATIONS (highest value):
  3-4-8 (6.3% adj / 6.6% MC) · 4-5-8 (6.1% / 6.7%) · 2-4-8 (5.0% / 4.6%) · 4-8-11 (4.5% / 4.8%) · 3-5-8 (3.1% / 3.4%)

Priced alternatives (not the recommendation, shown so the trade-offs are visible):
| Variant | Structure | Combos | Cost | Coverage (adj PL / MC) |
|---------|-----------|--------|------|------------------------|
| **Recommended (rule output)** | 膽拖 1膽 #8 + 5腳 (4, 3, 5, 2, 11) | 10 | **$100** | 36.5% / 36.7% |
| + #1 CHILL BUDDY (borderline 19.8%) | 膽拖 1膽 #8 + 6腳 (4, 3, 5, 2, 11, 1) | 15 | $150 | 44.7% / 45.1% |
| Full pool, no banker | C(6,3) | 20 | $200 | 50.6% / 49.3% |

PASS CONDITIONS:
- If **#8 THUNDER KIT** (Banker) is scratched → **VOID** the ticket (rule 10); do not restructure.
- If the field drops below 3 starters → pool refunded (not a live risk).
- If **#8 drifts past ~12** late → the market is actively fading the banker; downgrade to PASS.
- If the going moves to **Yielding or softer** → re-run the MC (the simulation used Good to Firm).
- If **#5 firms below ~1.6** → the market is certain the favourite runs to her best; the ticket still covers her as a leg, but the value combos (3-4-8, 2-4-8, 4-8-11) become the only ones that pay well. No change to structure.

CONFIDENCE: **MEDIUM-LOW.** For: #8 is MC #1 in 6/6 runs with a 7.8pp margin; Competitive race with a clear top two; banker has 9 runs, placed in 2 of his last 3 and is a stalker from gate 4. Against: (1) model vs market on the favourite (#5 1.9–2.3 vs MC 11.5%); (2) the analyzer's finish-time projection ranks #8 only **10th** (+1.48s — see caveats); (3) 13 of 14 are resuming 60–98 days off, and MC form is last-season form; (4) #8 comes off a run where he was bumped, tight and "could not be ridden out", with a knee abrasion noted on arrival (passed fit).

CAVEATS:
- **SCMP odds columns unusable — not used.** The SCMP Place column is higher than its Win column for the favourite (#5 Win 1.4 / Place 1.6), which is impossible for real pool odds. SCMP also shows #1 at 13 and #8 at 11, where both HKJC snapshots have them under 10 (9.4 / 7.8 and 7.1 / 6.2). SCMP's figures look like a stale or differently labelled snapshot. HKJC is the primary source, per the other 13-Sep reports.
- **SCMP Q/QP matrix unreliable — not used.** The fetched Quinella and Quinella Place matrices came back identical (impossible for real pools). Values such as QP 4-8 at 2.8 are inconsistent with the win market (#4 at 19–21). Rule 14 cross-reference skipped.
- **Place odds estimated** from win odds by the analyzer — only Win odds used for Strategy B tests.
- **Internal model inconsistency (major).** The analyzer's finish-time projection ranks **#11 GULU GOGO fastest** (1:08.82, based on 1 HK run), **#8 THUNDER KIT 10th** (+1.48s) and **#1 CHILL BUDDY last** (+4.06s, despite winning over this C&D last start). The win/place simulation makes #8 the 30.4% favourite. The Trio ranking follows Win%/Place% as the skill specifies; the projection is a separate speed-figure output and appears unreliable for resuming horses.
- **Going changed on the card:** an earlier racecard snapshot had "Good"; the 12:08 HKJC re-scrape (used by the MC) says **Good to Firm**.
- **Jockey-stat samples are small** (4–18 rides per jockey in the indexed data) — e.g. banker jockey C Y Ho 29% from 14; #5's H Y Yuen 13% from 8.
- **#12 VIVA PROSPERAR is an HK debutant** — MC has no HK form for him (11.2% place is rating-driven). He has trial form and Z Purton, but gate 14.
- **#5 LUCY IN THE SKY bled last season** (per Star Form); there is no current vet entry, so no adjustment. She is the only runner fit from a recent run.
- **Layoffs:** #1, #6, #14 at 98 days exceed the 90-day warning.
- **Two SCMP judgment calls** (disclosed above): #6 soundness concern treated as `−injury30d`, and #8's rally sequence treated as stale. Neither changes the pool: #6 stays out either way, and +1 on #8 would not change the classification or banker.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#8 THUNDER KIT** (MC Win% 30.4%, MC Place% 64.3%) ← 1st by MC Win% (6/6 runs)

Primary legs (MC Place% > 20%): **#4 (54.2%), #5 (35.6%), #3 (34.5%), #2 (26.8%), #11 (26.3%)**

Replaceable legs (MC Place% in 20–30% **AND** Win odds > 10):
  - **#2 AURORA PATCH** (MC Place% 26.8%, Win odds 21)
  - **#11 GULU GOGO** (MC Place% 26.3%, Win odds 20)

Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10), in ascending odds order:
  1. **#1 CHILL BUDDY** (Win odds 9.4 at 10:08 / 7.8 at 12:08, MC Place% 18.8%)

Action: **#1 replaces #11** — the replaceable leg with the lowest canonical MC Place% (26.3% vs #2's 26.8%).

Final legs: **#4, #5, #3, #2, #1**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

STRATEGY B TICKET (direct MC trio counts, 5-run average; Plackett-Luce on raw MC Place% in brackets):

| Rank | Horses (any order) | MC Trio% | Est. Fair Odds ($10) |
|------|--------------------|----------|----------------------|
| 1 | #4, #5, #8 | 6.69% (PL 6.74%) | $149 |
| 2 | #3, #4, #8 | 6.56% (PL 6.46%) | $152 |
| 3 | #2, #4, #8 | 4.64% (PL 4.69%) | $216 |
| 4 | #3, #5, #8 | 3.40% (PL 3.34%) | $294 |
| 5 | #1, #4, #8 | 3.15% (PL 3.10%) | $317 |
| 6 | #2, #3, #8 | 2.25% (PL 2.32%) | $445 |
| 7 | #2, #5, #8 | 2.23% (PL 2.42%) | $448 |
| 8 | #1, #3, #8 | 1.61% (PL 1.53%) | $623 |
| 9 | #1, #5, #8 | 1.53% (PL 1.60%) | $654 |
| 10 | #1, #2, #8 | 1.01% (PL 1.11%) | $990 |

**Ticket coverage: 33.1%** (MC direct) / 33.3% (PL on raw MC). Only #8 needs to be in the frame (MC Place% 64.3%).

⚠️ **Swap sensitivity (disclosed):** #11 (26.3%) vs #2 (26.8%) is a 0.5pp gap — inside MC noise. On the 5-run average the order reverses (#2 25.7% < #11 26.5%), which would make **#1 replace #2** instead → legs #4, #5, #3, #11, #1 (10 combos, $100, **33.4%** MC coverage). The canonical `analyze-race.ts` output governs, so #11 is the leg dropped. Cost and combo count are the same either way.

⚠️ **Late-odds watch (Strategy B composition depends on late prices; combo count stays 10 in every case below):**
- If **#1 CHILL BUDDY drifts to ≥ 10** at the off → no Win-odds candidate → legs revert to the primary five **#4, #5, #3, #2, #11** (identical to the Strategy A ticket; 36.7% MC).
- If **#12 VIVA PROSPERAR (12 → 11) shortens below 10** → 2nd candidate → replaces the remaining replaceable leg **#2** → legs #4, #5, #3, #1, #12.
- If **#11 (20 → 15) shortens to ≤ 10** → #11 is no longer "replaceable" → #1 replaces **#2** instead.

**Comparison vs Strategy A.** Both use the same banker (#8), the same cost ($100) and 4 of 5 legs (#4, #5, #3, #2). The only difference is the 5th leg: Strategy A keeps **#11 GULU GOGO** (SCMP +trial lifts him to 28.3% adj place), while Strategy B swaps in the market's 3rd favourite **#1 CHILL BUDDY** (MC 18.8% place, 7.8–9.4). Under the model, Strategy A covers slightly more (**36.7% vs 33.1%** MC) because #11 outranks #1 on MC place. Strategy B is the **hedge toward the market**: 1-4-8 (3.15%) is the largest combo Strategy A misses. Covering both = the $150 alternative (45.1% MC).
═══════════════════════════════════════════════════════════
