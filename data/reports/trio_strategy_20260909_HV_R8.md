═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-09 | Race 8
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --form-data all`, HV + ST form, 2,251 historical races / 2,311 indexed performances; 12/12 horses enriched)
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction)
SCMP DATA: ✅ Loaded — Win/Place odds, Star Form, TIR, Vet, Trackwork for all 12 runners (tipster picks ignored per skill rule 13)
ODDS SOURCE: **HKJC early-morning pool** (`fetch-odds.ts`, captured 01:19 HKT 09-Sep) — complete for all 12 runners
             SCMP odds: ✅ loaded (cross-check) | HKJC live: ❌ not open at capture time
             Cross-check: SCMP and HKJC agree on every runner's side of the **Win odds < 10** line. The only material gap is **#11 ACE CHAMPION (HKJC 4.1 vs SCMP 7.7)** — both < 10, so no flag flip. No Strategy B decision changes under either source.
             ⚠️ Place odds are NOT usable — `fetch-odds.ts` logged "place odds estimated from win odds", and SCMP's Place column is internally inconsistent (Place > Win on 8 of 12 runners: 18/20, 4.2/5.6, 11/14, 29/31 …), which is impossible for real pool odds. All odds tests below use **Win odds only**, which is what the Strategy B rule specifies anyway.

RACE: R8 WAN CHAI HANDICAP — **Class 3** | 1200m | Turf | Good | **12 runners**
CLASSIFICATION: **Dominant** (top Adj Win% 40.2% ≥ 35%) | POOL SIZE: 5
MODE: **A — Tight Pool (5)**
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | C(4,2) = 6 combinations
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL
───────────────────────────────────────────────────────────
```
Meeting: Happy Valley 2026-09-09 | Going: Good | Surface: Turf
Target Race: R8 (Class 3 | 1200m | 12 runners) — WAN CHAI HANDICAP, prize $1,860,000
Scratchings: none (1 reserve — R LUCY IN THE SKY, Y S Tsui — did not gain entry, no jockey engaged)
Odds coverage: 12 / 12 horses with Win odds (HKJC pool + SCMP cross-check)
Jockey stats: 11 jockey profiles + 12 trainer profiles loaded
Debutants: none — every runner has ≥3 indexed starts (fewest: #10 TANG HEART, 3).
           Banker #2 HARMONY N BLESSED has 10 indexed starts → banker eligibility rule 17 satisfied.
Starters ≥ 3: ✅ (12) — Trio pool will open
SCMP data: ✅ loaded (all 12 runners)
```

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

Note: **Place%>20%** = ✅ if MC Place% > 20%. **Win odds<10** = ✅ if Win odds < 10. Strategy B primary legs = Place%>20% ✅ (excluding banker). Place%>20% ❌ + Win odds<10 ✅ = replacement candidate.

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Draw | Age | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-----|------|-------------------|--------------------------|
| 2 | HARMONY N BLESSED | 39.2% | 73.4% | 5.8 | ✅ | ✅ | 11 | 10 | 10 | ★ 膽 (Banker) | 1-2: 17.1% (5.9) |
| 1 | AURIO | 18.9% | 52.3% | 20 | ✅ | ❌ | 12 | 6 | 10 | 腳 (Leg) | 1-2: 17.1% (5.9) |
| 10 | TANG HEART | 13.4% | 44.0% | 12 | ✅ | ❌ | 3 | 4 | 3 | 腳 (Leg) | 2-10: 13.3% (7.5) |
| 3 | MOTOR | 10.3% | 36.9% | 8.0 | ✅ | ✅ | 9 | 4 | 10 | 腳 (Leg) | 2-3: 10.0% (10.1) |
| 11 | ACE CHAMPION | 6.4% | 27.4% | 4.1 | ✅ | ✅ | 5 | 4 | 8 | 腳 (Leg) | 2-11: 6.7% (15.0) |
| 12 | DEVAS TWELVE | 3.4% | 16.5% | 28 | ❌ | ❌ | 10 | 7 | 10 | — | — |
| 6 | POWER KOEPP | 3.2% | 16.4% | 18 | ❌ | ❌ | 4 | 8 | 10 | — | — |
| 4 | TYCOON RESOURCES | 1.7% | 10.2% | 4.2 | ❌ | ✅ | 7 | 4 | 4 | 腳 (Leg) — **replacement candidate, added directly** | — |
| 9 | STORMING DRAGON | 1.4% | 9.2% | 18 | ❌ | ❌ | 8 | 6 | 10 | — | — |
| 7 | KING MILES | 0.8% | 5.2% | 17 | ❌ | ❌ | 2 | 6 | 10 | — | — |
| 5 | NORTHERN FIRE BALL | 0.7% | 4.7% | 25 | ❌ | ❌ | 6 | 5 | 10 | — | — |
| 8 | MATTERS MOST | 0.6% | 4.0% | 14 | ❌ | ❌ | 1 | 5 | 10 | — | — |

**Market:** Overround **23.7%**, favourite bias **−83.0%**, longshot bias **−43.4%** — a book the model reads as badly mispriced at both ends. Model-vs-market:
- **#1 AURIO — undervalued by 260%.** MC's clear 2nd (18.9% win / 52.3% place) is a 20.0 market price. The single largest edge in the race, driven by the all-venue form load (753214 over 10 starts, current rating 77 = top weight).
- **#2 HARMONY N BLESSED — undervalued by 131%.** The 5.8 third-favourite is MC's runaway #1 (39.2% / 73.4%). Model and market agree on direction, not on magnitude.
- **#4 TYCOON RESOURCES — overvalued by 93%.** The 4.2 market co-favourite is MC's 8th-ranked horse (1.7% win / 10.2% place). This is the sharpest model/market disagreement in the race and the reason #4 enters the Strategy B pool through the Win-odds rule rather than on merit.
- The analyzer's own recommendation was **Place #2 ($500) + Place #1 ($500)** — both from the top of the Trio pool.

**Top quinella combinations (MC):** 1-2 17.1% ($5.9) · 2-10 13.3% ($7.5) · 2-3 10.0% ($10.1) · 2-11 6.7% ($15.0) · 1-10 5.7% ($17.6). Four of the five leading pairs contain **#2**, which is what justifies the banker. Cross-referencing SCMP's Q matrix: the **1-2** pair shows a market Q of **6.8** against an MC fair price of **5.9** — the market is paying above fair on the model's top pair, a genuine Trio value signal for combinations built on {#1, #2}. (See caveats: only the 1-2 cell could be read with confidence from the SCMP matrix.)

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | SCMP Win | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|----------|------------------|----------|----------|-----------|---------------|
| 1 | AURIO | 18 | — ("ran on late for seventh. Has top weight and **gate 12** to overcome") | **+excuses** ("Shortly after start was crowded") | clear ("no significant findings") | — | Closer |
| 2 | HARMONY N BLESSED | 4.2 | **+form** ("**making all** by a lip over the Valley 1,200m") | clear | **−age** ("Eight years or older at season end", passed 17/08/2026 — 10yo) | **+trial** ("age is just a number with a **game trial win** on the Sha Tin turf") | **Front-runner** |
| 3 | MOTOR | 8.3 | **+form** ("**quickening nicely to win** on his return to Sha Tin"; two wins + two thirds since switching to the Valley) | **+excuses** ("At the 300M shifted out and was **bumped**") | clear | — | Stalker |
| 4 | TYCOON RESOURCES | 3.9 | **+form** ("**easily win** in Class Three… perfect in three Valley runs") | **+excuses** ("**Bumped at start**") | **−injury30d** (heart irregularity after racing, passed **28/08/2026** = 12 days) | **+trial** ("**did win a recent dirt trial**"; also satisfied Stewards in a barrier trial) | On-pace |
| 5 | NORTHERN FIRE BALL | 25 | — ("tiring sixth… speed-duelling 11th") | **+excuses** ("Disadvantaged by being **pressured in lead**") | **−injury30d** (**epiglottic entrapment** found after racing — no clearance date published) | — | **Front-runner** |
| 6 | POWER KOEPP | 16 | **+form** ("front-running Valley win… one-out, one-back fourth") | **+excuses** ("**Crowded** shortly after start; crowded again") | **−age** ("Eight years or older", passed 28/08/2026 — 8yo) | — | On-pace |
| 7 | KING MILES | 20 | — ("only one fifth from eight starts. Failed after a **wide trip**") | **+excuses** ("Jumped awkwardly… **raced very wide and without cover**") | clear | **+trial** ("**trialled well eight days ago**") | Handy |
| 8 | MATTERS MOST | 11 | — ("only one second from nine starts… faltering 10th") | **+excuses** ("Near 200M shifted in and made contact"; rider noted disadvantage from pace run inside standard time) | clear | **+trial** ("**won a recent Conghua trial**") | **Front-runner** |
| 9 | STORMING DRAGON | 18 | — ("three thirds from 17 runs last term") | **+excuses** ("**Raced very wide and without cover** for the majority") | clear | — | Midfield |
| 10 | TANG HEART | 11 | **+form** ("**Ran on late** to snatch third… **staying on for third** from better than midfield"; **Valley debut**) | **+excuses** ("**Bumped on jumping**. After 600M **raced tight**") | clear | — | Closer |
| 11 | ACE CHAMPION | 7.7 | — ("**Dashed late** for a short-head third, then **failed when held up** over the final 120m") | **+excuses** ("Bumped at start. Approaching 100M was **steadied when disappointed for clear running**… difficulty obtaining clear running remainder of event") | clear | — | Closer |
| 12 | DEVAS TWELVE | 29 | — ("**zero-from-11 in Class Three. Prefers Sha Tin**") | clear | **−injury30d** (**bled from left nostril** after racing, passed **31/08/2026** = 9 days) | — | **Front-runner** |

**Flag discipline applied:**
- `−barrier` requires "bumped on jumping" in **≥2** recent runs — #10 shows a single instance, so **no penalty**.
- `+excuses` granted only where the horse **received** the interference or was demonstrably unlucky (#1 crowded, #3 bumped, #4 bumped at start, #5 pressured in lead, #6 crowded twice, #7 forced wide, #8 disadvantaged, #9 forced wide, #10 bumped + raced tight, #11 steadied/no clear run). #2 and #12 have clean TIR records.
- `−injury30d` applies to three runners, all with clearance dates inside 30 days of 09-Sep: **#4** (12 days), **#12** (9 days). **#5's** epiglottic entrapment carries **no published clearance date** — treated as an active health flag and penalised the same way; noted as a caveat.
- `−age` applies to **#2** (10yo) and **#6** (8yo) — this is Class 3, so the C3+ condition is met. Note the penalty lands on the banker.
- No `−perf` and no `−notRO` anywhere in this race. #7's "rider noted horse had reached end of preparation" is a fitness remark, not a stewards' *not ridden out* finding, so it draws no penalty.
- **No gate penalty applied numerically.** #2 (gate 11) and #1 (gate 12) both have poor draws for HV 1200m, but the skill's adjustment table defines no negative-draw factor (only `+draw`). Per rule 15 gates are reducers, never exclusions — the risk is carried in CONFIDENCE and CAVEATS instead of an invented number.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 2 | HARMONY N BLESSED | 39.2% | 73.4% | −age −2, trial +2, +form +1 | −age −2, trial +2, +form +1 | **40.2%** | **74.4%** | 5.8 | H Y Yuen (−10) | 11 | Front | −age, +trial, +form | ★ 膽 (Banker) |
| 2 | 1 | AURIO | 18.9% | 52.3% | excuses +2 | excuses +2 | **20.9%** | **54.3%** | 20 | Z Purton | 12 | Close | +excuses | 腳 (Leg) |
| 3 | 10 | TANG HEART | 13.4% | 44.0% | excuses +2, +form +1 | excuses +2, +form +1 | **16.4%** | **47.0%** | 12 | A Atzeni | 3 | Close | +excuses, +form | 腳 (Leg) |
| 4 | 3 | MOTOR | 10.3% | 36.9% | excuses +2, +form +1 | excuses +2, +form +1 | **13.3%** | **39.9%** | 8.0 | K Teetan | 9 | Stalk | +excuses, +form | 腳 (Leg) |
| 5 | 11 | ACE CHAMPION | 6.4% | 27.4% | excuses +2 | excuses +2 | **8.4%** | **29.4%** | 4.1 | C Y Ho | 5 | Close | +excuses | 腳 (Leg) |
| 6 | 7 | KING MILES | 0.8% | 5.2% | excuses +2, trial +2 | excuses +2, trial +2 | 4.8% | 9.2% | 17 | C L Chau (−2) | 2 | Handy | +excuses, +trial | — |
| 7 | 8 | MATTERS MOST | 0.6% | 4.0% | excuses +2, trial +2 | excuses +2, trial +2 | 4.6% | 8.0% | 14 | E C W Wong (−3) | 1 | Front | +excuses, +trial | — |
| 8 | 6 | POWER KOEPP | 3.2% | 16.4% | −age −2, excuses +2, +form +1 | −age −2, excuses +2, +form +1 | 4.2% | 17.4% | 18 | A Badel | 4 | On-pace | −age, +excuses, +form | — |
| 9 | 4 | TYCOON RESOURCES | 1.7% | 10.2% | −injury30d −3, excuses +2, trial +2, +form +1 | −injury30d −4, excuses +2, trial +2, +form +1 | 3.7% | 11.2% | 4.2 | Y L Chung (−2) | 7 | On-pace | −injury30d, +excuses, +trial, +form | — |
| 10 | 9 | STORMING DRAGON | 1.4% | 9.2% | excuses +2 | excuses +2 | 3.4% | 11.2% | 18 | B Avdulla | 8 | Midfield | +excuses | — |
| 11 | 12 | DEVAS TWELVE | 3.4% | 16.5% | −injury30d −3 | −injury30d −4 | 0.4% | 12.5% | 28 | H Bentley | 10 | Front | −injury30d | — |
| 12 | 5 | NORTHERN FIRE BALL | 0.7% | 4.7% | −injury30d −3, excuses +2 | −injury30d −4, excuses +2 | 0.0% | 2.7% | 25 | P N Wong (−7) | 6 | Front | −injury30d, +excuses | — |

**Factor columns** are lists of SCMP reasons with ±%. Adj Win% = MC Win% + Σ(factors), floored at 0.0%; Adj Place% = MC Place% + Σ(factors). No horse hit the ±8 / ±10 cap, and nothing approached the 50% Win / 85% Place ceilings. Note ★ 膽 = Banker (1st by Adj Win%, locked in every combo). 雙膽拖 requires the 2nd horse at Adj Place% ≥ 63%; **#1 AURIO is 54.3%**, so **1 banker only**.

**Reasoning:**
- **#2 HARMONY N BLESSED (banker).** MC's dominant runner at 39.2% / 73.4% — a 12-point win gap over the field's #2. A 10-year-old, but this is the horse's proven trip and track: it made all over the Valley 1,200m last start and backed it with a game Sha Tin trial win. The `−age −2` and `+trial +2 / +form +1` roughly cancel, leaving it clear at 40.2%. Ten indexed starts → banker-eligible (rule 17). The market's 5.8 is the third price; MC says it should be around 2.6, a 131% undervaluation.
- **#1 AURIO.** MC's clear 2nd (52.3% place) yet a 20.0 outsider — the biggest edge in the book at 260%. Purton takes the ride on a horse with a genuine 1,200m Valley record, and it was crowded shortly after the start last time (`+excuses`). Gate 12 and top weight are real handicaps and are the reason it stays a leg rather than becoming a second banker.
- **#10 TANG HEART.** Only three indexed starts, but all three were competitive (3-6-3) and Atzeni is the meeting's most effective jockey in the loaded sample (29% from 7 rides). It was bumped on jumping and raced tight last start, and it draws gate 3 for a Valley debut — the best gate/closer combination in the pool.
- **#3 MOTOR.** Two wins and two thirds since switching to the Valley, quickening nicely to win on its Sha Tin return, and bumped at the 300m last time. 8.0 is a fair price on a 36.9% MC place chance.
- **#11 ACE CHAMPION.** The must-include: **Adj Place% 29.4% ≥ 25%**, so it enters the pool by rule regardless of its 6.4% raw win chance. Also the runner with the strongest bad-luck case in the race — steadied and denied clear running throughout the final 100m last start — and the market backs the story at 4.1.
- **Pool boundary.** Adj Place% ≥ 25% is satisfied by exactly these five horses (74.4 / 54.3 / 47.0 / 39.9 / 29.4). The next-best is #6 POWER KOEPP at 17.4% — a 12-point gap. Mode A's 5-horse pool and the must-include rule land on the same five, which is the cleanest structural read available in this race.
- **Pace scenario.** Four declared front-runners (#2, #5, #8, #12) plus on-pace #4 and #6 means the lead will be contested. That is a caution for the banker, which wants to make all from gate 11, and a positive for the three closers in the pool (#1, #10, #11). Skill guidance says HV 1,200m carries a front-runner bias — but that bias assumes an uncontested lead, which this field does not offer.
- **#4 TYCOON RESOURCES is excluded from the Strategy A pool on Adj Place% (11.2%), not on narrative** (rule 8). Rule 9 forbids hard exclusion at odds ≤ 15 — it is not hard-excluded; it simply ranks 9th of 12 and Mode A takes five. It does enter the **Strategy B** pool via the Win-odds rule, which is exactly the A/B divergence this race is built to test.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: #2, #1, #10, #3, #11
MODE: A — Tight Pool | POOL SIZE: 5

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#2 HARMONY N BLESSED** (Adj Win% 40.2%, Adj Place% 74.4%) ← locked in every combo
腳 (Legs):  #1 AURIO, #10 TANG HEART, #3 MOTOR, #11 ACE CHAMPION
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = **6**
(雙膽拖 rejected: 2nd-ranked #1 AURIO at Adj Place% 54.3% < 63% threshold)

TOP TRIO COMBINATIONS (by combined Adj Place%, normalised across all C(12,3) = 220 field combinations):
| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|-------------------|-----------------|----------------|
| 1 | #2, #1, #10 | 5.7% | $18 |
| 2 | #2, #1, #3 | 4.8% | $21 |
| 3 | #2, #10, #3 | 4.2% | $24 |
| 4 | #2, #1, #11 | 3.5% | $28 |
| 5 | #2, #10, #11 | 3.1% | $33 |
| 6 | #2, #3, #11 | 2.6% | $38 |

Combined coverage of the 6 banker combos: **23.9%** of the normalised combination space.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
COMBINATIONS: **6** (膽拖: C(4,2), 4 legs)
UNIT BET: $10 (fixed)
TOTAL STAKE: **$60**

Bet slip: 膽 = **2** | 腳 = **1, 3, 10, 11**

TOP COMBINATIONS (highest value):
  1. 2-1-10 — 5.7% ($18 fair)
  2. 2-1-3  — 4.8% ($21 fair)
  3. 2-10-3 — 4.2% ($24 fair)
  4. 2-1-11 — 3.5% ($28 fair)
  5. 2-10-11 — 3.1% ($33 fair)
  6. 2-3-11 — 2.6% ($38 fair)

vs Full Pool C(5,3) = 10 combos / $100 → **40% cheaper**, at the cost of losing every ticket if #2 misses the top 3.

PASS CONDITIONS:
- If **#2 HARMONY N BLESSED** (banker) is scratched → **VOID the ticket**, do not restructure (rule 10).
- If **#1 AURIO** is scratched → the pool's second-highest Adj Place% is gone; drop to a 4-horse pool (2 + 10/3/11 = C(3,2) = 3 combos, $30) or pass.
- If field drops below 3 starters → pool refunded.
- If going changes to **Yielding/Heavy** → the contested-lead read sharpens against the front-running banker; reconsider or downgrade to the 3 cheapest combos.
- If #2 drifts materially above ~9.0 on the live pool (from 5.8) → treat as a market signal against the banker and consider passing.

CONFIDENCE: **MEDIUM**

Dominant on the numbers (40.2% Adj Win%, 74.4% Adj Place%) but held down from HIGH by three specific risks: the banker is a 10-year-old front-runner drawn **11 of 12** at Happy Valley 1,200m into a **contested lead**; the pool's #2 horse (#1 AURIO) is drawn **12** with top weight; and the market's two co-favourites (#4 at 4.2, #11 at 4.1) sit 9th and 5th on the model, meaning the book and the model disagree about who fills this frame. The MC and the market do at least agree that #2 belongs at the top.

CAVEATS:
- **Historical sync not re-run this session** (per instruction). MC used the existing store: 2,251 races / 2,311 indexed performances, 12/12 runners enriched — coverage is complete for this field, so the risk is limited to any meeting scraped after the last sync.
- **Place odds unusable** from both sources (HKJC estimated from win odds; SCMP Place > Win on 8 of 12 runners). All odds tests used Win odds only.
- **SCMP Quinella/QP matrix parsed only partially.** Rows 1–4 read cleanly but rows 5–12 are truncated/misaligned in the fetched page, so only the **1-2** cell (market Q 6.8 vs MC fair 5.9) was used for the value cross-reference. The full QP matrix could not be verified.
- **#5 NORTHERN FIRE BALL's epiglottic entrapment has no published clearance date.** It was penalised as `−injury30d` on the assumption the finding is recent. #5 is outside both pools either way, so this does not affect any ticket.
- **Draw penalty not quantified.** Gates 11 and 12 for the top two ranked horses are a material HV 1,200m negative, but the skill defines no negative-draw adjustment factor. Carried in CONFIDENCE, not in the numbers — the true Adj Win% for #2 is plausibly a few points lower than 40.2%, which would move this race from Dominant/Mode A toward Competitive/Mode B (6-horse pool, 10 combos, $100). Mode A was retained because the computed number governs.
- **#10 TANG HEART has only 3 indexed starts and makes its Valley debut** — the thinnest form sample in the pool. It is a leg, not the banker, so rule 17 is not engaged.
- **Model/market divergence on #4 TYCOON RESOURCES is extreme** (MC 1.7% win vs a 4.2 market price, "overvalued by 93%"). If the market is right, Strategy A's pool misses a genuine contender — Strategy B covers exactly that scenario.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#2 HARMONY N BLESSED** (MC Win% 39.2%, MC Place% 73.4%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): **#1 AURIO** (52.3%), **#10 TANG HEART** (44.0%), **#3 MOTOR** (36.9%), **#11 ACE CHAMPION** (27.4%)
Replaceable legs (MC Place% 20–30% **AND** Win odds > 10): **none** — the only primary leg in the 20–30% band is #11 ACE CHAMPION (27.4%), and its Win odds are **4.1 (< 10)**, so it is not replaceable
Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10): **#4 TYCOON RESOURCES** (Win odds 4.2, MC Place% 10.2%) — the only such horse in the field
Action: **added directly** (no replaceable leg exists) → #4 becomes a 5th leg
Final legs: **#1, #10, #3, #11, #4**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
TOTAL STAKE: **$100**

Bet slip: 膽 = **2** | 腳 = **1, 3, 4, 10, 11**

STRATEGY B TICKET — all 10 combinations (combined MC Place%, normalised over C(12,3)):
| # | Combination | Combined Place% | Est. Fair Odds |
|---|-------------|-----------------|----------------|
| 1 | 2-1-10 | 6.0% | $17 |
| 2 | 2-1-3 | 5.1% | $20 |
| 3 | 2-3-10 | 4.3% | $23 |
| 4 | 2-1-11 | 3.8% | $27 |
| 5 | 2-10-11 | 3.2% | $32 |
| 6 | 2-3-11 | 2.7% | $38 |
| 7 | 2-1-4 | 1.4% | $71 |
| 8 | 2-4-10 | 1.2% | $85 |
| 9 | 2-3-4 | 1.0% | $101 |
| 10 | 2-4-11 | 0.7% | $136 |

Combined coverage: **29.4%** of the normalised combination space.

**Strategy A vs Strategy B comparison:**
Both strategies land on the **same banker (#2)** and the **same four core legs (#1, #10, #3, #11)** — Strategy A's Mode A pool and Strategy B's Place%>20% primary legs are identical sets. The entire divergence is **#4 TYCOON RESOURCES**: Strategy B adds it as a 5th leg purely on its 4.2 market price (MC has it 8th at 10.2% place), which costs an extra **4 combinations / $40** (+67% stake) to buy an extra **5.5 points of coverage** (23.9% → 29.4%). Because no primary leg was replaceable, this is a pure addition rather than a swap — the four A-combinations are preserved intact inside B. The trade is a direct bet on whether the market or the model is right about a horse they disagree on by 93%; A backs the model, B hedges the market. Both share the same single point of failure: if **#2** misses the top 3, both tickets lose in full.
═══════════════════════════════════════════════════════════
