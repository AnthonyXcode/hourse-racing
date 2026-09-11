═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-09 | Race 7
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --date 2026-09-09 --venue "Happy Valley" --race 7 --form-data all --bankroll 10000 --kelly 0.35 --min-edge 5`) — 2,251 historical races / 2,311 indexed performances; 12/12 horses enriched; 11 jockey + 12 trainer profiles loaded
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction)
SCMP DATA: ✅ Loaded — Win/Place odds, Star Form, TIR, Vet, Trackwork for all 12 runners; Q matrix usable, QP matrix suspect (see caveats). Tipster picks ignored per skill rule 13.
ODDS SOURCE: **HKJC early-morning pool** (`fetch-odds.ts`, captured 01:19 HKT 09-Sep) — complete for all 12 runners
             SCMP odds: ✅ loaded (cross-check; agrees within ~1 point on every runner, **no flag flips** on the Win-odds<10 test) | HKJC live: ❌ not open at capture time
             ⚠️ Place odds are NOT usable — `fetch-odds.ts` logged "place odds estimated from win odds", and SCMP's Place column mirrors its Win column (2.9/3.1, 14/13, 31/31, 6/6.0). All Strategy B odds tests below use **Win odds only**, which is what the rule specifies anyway.

RACE: R7 TSIM SHA TSUI HANDICAP — **Class 4** | 1200m | Turf | Good | **12 runners**
CLASSIFICATION: **Competitive** (top Adj Win% 34.0%, inside the 20–35% band — 1.0pp below the Dominant bar) | POOL SIZE: 6
MODE: **B — Standard Pool (6)**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | C(5,2) = 10 combinations
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL (Step 2)
───────────────────────────────────────────────────────────
```
Meeting: Happy Valley 2026-09-09 | Going: Good | Surface: Turf
Target Race: R7 TSIM SHA TSUI HANDICAP (Class 4 | 1200m Turf | 12 runners)
Scratchings: none
Odds coverage: 12 / 12 horses with Win odds (HKJC pool + SCMP cross-check)
Starters: 12 ≥ 3 → Trio pool valid
Jockey stats: 11 jockey profiles + 12 trainer profiles loaded
Debutants: none — fewest indexed starts is #5 PRESTIGE WIN (5) and #7 GOOD LUCK HAPPY (6);
           every other runner has 8–10. Banker #2 FORERUNNER has 10 → rule 17 satisfied.
SCMP data: ✅ loaded (all 12 runners)
```

⚠️ **Seasonal context — applies to the whole field.** Every runner's most recent start is between **24-Jun-2026 and 15-Jul-2026** (8–11 weeks ago). This is the opening HV meeting of the new season and **all 12 horses are resuming**. Consequences: (a) no vet or TIR entry in this race can qualify for the `−injury30d` flag, because every incident referenced is ≥8 weeks old; (b) the MC's form enrichment is describing last-season fitness, not today's. Treat every probability in this report as carrying more first-up uncertainty than a mid-season race.

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — shared basis for both strategies
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Draw | Age | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-----|------|-------------------|--------------------------|
| 2 | FORERUNNER | 34.0% | 67.9% | 13 | ✅ | ❌ | 11 | 7 | 10 | ★ 膽 (Banker) | 2-4: 15.4% (6.5) |
| 4 | LEADING DRAGON | 20.4% | 53.7% | 5.9 | ✅ | ✅ | 6 | 4 | 8 | 腳 (Leg) | 2-4: 15.4% (6.5) |
| 3 | COPARTNER FLEET | 12.3% | 38.6% | 32 | ✅ | ❌ | 12 | 5 | 10 | 腳 (Leg) | 2-3: 9.4% (10.6) |
| 1 | ROBOT LUCKY STAR | 12.1% | 38.9% | 3.1 | ✅ | ✅ | 2 | 5 | 8 | 腳 (Leg) | 1-2: 9.6% (10.4) |
| 6 | THE PERFECT MATCH | 5.9% | 24.8% | 12 | ✅ | ❌ | 10 | 6 | 10 | ~~腳~~ **replaced out** | — |
| 5 | PRESTIGE WIN | 5.2% | 20.4% | 36 | ✅ | ❌ | 8 | 5 | 5 | ~~腳~~ **replaced out** | — |
| 12 | FORZA LEADER | 3.5% | 15.3% | 7.1 | ❌ | ✅ | 4 | 5 | 10 | 腳 (Leg) — **replacement candidate, swapped in** | — |
| 7 | GOOD LUCK HAPPY | 1.8% | 10.0% | 8.5 | ❌ | ✅ | 7 | 5 | 6 | 腳 (Leg) — **replacement candidate, swapped in** | — |
| 8 | KING OBERON | 1.7% | 10.0% | 17 | ❌ | ❌ | 3 | 7 | 10 | — | — |
| 10 | RYUI KOKOROE | 1.4% | 8.2% | 16 | ❌ | ❌ | 9 | 5 | 10 | — | — |
| 11 | BITS SUPERSTAR | 1.0% | 6.8% | 12 | ❌ | ❌ | 5 | 6 | 10 | — | — |
| 9 | WARRIORS DREAM | 0.8% | 5.3% | 17 | ❌ | ❌ | 1 | 5 | 10 | — | — |

**Market:** Overround **23.1%**, favourite bias **−62.6%**, longshot bias **+196.0%**. This is the mirror image of R6's book — the market's short prices here are, by the model's reckoning, far too short, and its long prices far too long. Model-vs-market:

- **#2 FORERUNNER — undervalued by 343%.** MC's clear #1 (34.0% win / 67.9% place, fair odds ~2.9) is the market's **6th choice at 13.0**. This single disagreement is the entire ticket.
- **#3 COPARTNER FLEET — undervalued by 306%.** MC has it 3rd on win% (fair ~8.1) against a market price of **32**.
- **#1 ROBOT LUCKY STAR — the market's 3.1 favourite** (Z Purton, 20% strike) but only MC's **4th** on win% (12.1%, fair ~8.3). The model thinks the favourite is roughly 2.7x too short.
- **#12 FORZA LEADER — market's 4th choice at 7.1**, MC 7th (3.5%, fair ~28.6). Again the market is much shorter.
- **#11 BITS SUPERSTAR — overvalued by 88%.**

**Top quinella combinations (MC):** 2-4 15.4% ($6.5) · 1-2 9.6% ($10.4) · 2-3 9.4% ($10.6) · 3-4 5.9% ($16.9) · 1-4 5.9% ($16.9). All five leading pairs are drawn from **{#1, #2, #3, #4}** — the model sees this as a four-horse race, and #2 appears in the top three of them.

**Cross-reference with SCMP Quinella odds (step 1e-vi / rule 14):** the market's shortest quinella is also **2-4 at 15**, then 1-4 at 20, 3-4 at 23, 1-2 at 26. So model and market **agree that 2-4 is the leading pair** — a genuine independent confirmation of the ticket's spine. They diverge sharply on #3: MC's 2-3 is 9.4% (fair $10.6) against a market Q of **54**. If the model is right about COPARTNER FLEET, any Trio containing it pays outsized.

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | SCMP Win | SCMP Place | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|----------|------------|------------------|----------|----------|-----------|---------------|
| 1 | ROBOT LUCKY STAR | 2.9 | 3.1 | — ("Resumed a straight 1,000m winner and two seconds over the Valley 1,200m… going OK in one of two 1,000m runs for his new trainer. In the right grade again") | — ("shifted out at the start and made contact" — **self-caused**, single instance) | clear | **+trial** ("quickened really smartly to win a Sha Tin turf trial last month and is ready to rock") | Handy / on-pace |
| 2 | FORERUNNER | 14 | 13 | — ("a win from behind midfield and three seconds over the Valley 1,200m, including his latest… **Gate is a hurdle**") | — ("shortly after the start shifted in and made contact" — **self-caused**, single instance) | clear | — | **Closer / from behind midfield** |
| 3 | COPARTNER FLEET | 31 | 31 | — ("Won when trying the Valley 1,000m at this level in January… one-paced fifth latest") | **+excuses** ("bumped at the start") **and −notRO** ("could not be ridden out when positioned close to a runner") | clear | — | Closer |
| 4 | LEADING DRAGON | 6 | 6.0 | **+form** ("easily **made all** two runs later before succumbing late for fourth"; "Makes Valley debut with claim well utilised") | clear | — ("blood in the mouth at the Start… **passed suitable to race**", Race 835 — ≥8 weeks ago) | — | **Front-runner** |
| 5 | PRESTIGE WIN | 37 | 35 | — ("Didn't show much in his first three local starts… failing to figure from gate 14 over 1,650m") | clear | clear ("no significant findings") | — | Closer / behind midfield |
| 6 | THE PERFECT MATCH | 11 | 12 | **+form** ("took control 50m out to **win** after a handy run on the fence from gate one. Carries 7lb more. Does go well fresh") | clear | clear | — | Stalker / handy |
| 7 | GOOD LUCK HAPPY | 8.5 | 8.7 | — ("**lame** after a Sha Tin defeat in February before returning with a front-running third and dull eighth") | — ("travelled only fairly… one-paced manner in the Home Straight. Post-race vet inspection did not show any significant findings") | clear | — | **Front-runner** |
| 8 | KING OBERON | 16 | 17 | — ("back-to-back Valley 1,200m wins… then **disappointed** with only one third from eight starts. Comes off a box-seat fifth") | **+excuses** ("over the concluding stages **raced tight**") | clear | — | On-pace / box-seat |
| 9 | WARRIORS DREAM | 18 | 16 | — ("box-seat win… minor cheques four times from six starts… never involved from gate 12. Has new trainer") | — ("raced **keenly** and near the 700M was steadied. In the Home Straight lay in" — steadying **self-caused** by keenness) | clear | — | Stalker / midfield |
| 10 | RYUI KOKOROE | 18 | 16 | — ("defeat with blood in his trachea over 1,400m in March… failed to menace four times. Comes off a closing seventh") | **+excuses** ("bumped on jumping. Between the 400M and the 300M had **difficulty obtaining clear running**") | clear | — | Closer |
| 11 | BITS SUPERSTAR | 11 | 12 | — ("Placed five times from seven straight Valley 1,200m runs… beat two runners over the Valley 1,000m… handily ridden fifth") | clear | clear | — | Handy |
| 12 | FORZA LEADER | 8 | 7.4 | **+form** ("doing some nice work late for fourth, fourth and sixth in three consecutive Valley 1,200m runs before **flashing late for a short-head second**") | **+excuses** ("shifted across behind runners in the early stages. **Held up for clear running** making the Home Turn") | clear | — | **Closer** |

**Flag discipline applied (documented decisions):**
- `+excuses` granted only where the horse **received** the trouble (#3 bumped at the start, #8 raced tight, #10 bumped + no clear running, #12 held up). Withheld from **#1** and **#2** (both *caused* the contact by shifting) and from **#9** (the steadying is explicitly a consequence of its own keenness).
- `−barrier` requires "bumped on jumping" in **≥2** recent runs. #10 shows a single instance → **no penalty**.
- `−injury30d` applies to nobody: #4's blood-in-the-mouth (passed suitable to race), #7's February lameness and #10's March tracheal bleed are all ≥8 weeks old, and #7/#10 have both raced since.
- `−perf` **withheld from #7 GOOD LUCK HAPPY.** Its TIR is the standard poor-performance explanation ("travelled only fairly… one-paced") and the stewards' vet inspection returned **"no significant findings"** — the same clearance treated as clean in the R6 report. The flag is reserved for an explicit stewards' finding of unacceptable performance. This is immaterial to Strategy A (the horse is 10th ranked either way) but it does keep it in the Strategy B ticket.
- `−age` requires a **vet note** "eight years of age or above". #2 (7) and #8 (7) are under the bar and carry no such note → no penalty.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC + SCMP adjustments, Step 3c/4a)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 2 | FORERUNNER | 34.0% | 67.9% | 0 | 0 | **34.0%** | **67.9%** | 13 | K C Leung | 11 | Closer | — (gate a hurdle) | ★ 膽 (Banker) |
| 2 | 4 | LEADING DRAGON | 20.4% | 53.7% | +form +1 | +form +1 | **21.4%** | **54.7%** | 5.9 | H Y Yuen (-10) | 6 | Front | +form | 腳 (Leg) |
| 3 | 1 | ROBOT LUCKY STAR | 12.1% | 38.9% | trial +2 | trial +2 | **14.1%** | **40.9%** | **3.1** | Z Purton | 2 | Handy | +trial | 腳 (Leg) |
| 4 | 3 | COPARTNER FLEET | 12.3% | 38.6% | excuses +2, -notRO −2 | excuses +2, -notRO −2 | **12.3%** | **38.6%** | 32 | C Y Ho | 12 | Closer | +excuses, −notRO | 腳 (Leg) |
| 5 | 6 | THE PERFECT MATCH | 5.9% | 24.8% | +form +1 | +form +1 | **6.9%** | **25.8%** | 12 | C L Chau (-2) | 10 | Stalk | +form | 腳 (Leg) |
| 6 | 12 | FORZA LEADER | 3.5% | 15.3% | excuses +2, +form +1 | excuses +2, +form +1 | 6.5% | 18.3% | 7.1 | K Teetan | 4 | Closer | +excuses, +form | — |
| 7 | 5 | PRESTIGE WIN | 5.2% | 20.4% | 0 | 0 | 5.2% | **20.4%** | 36 | A Atzeni | 8 | Closer | — | 腳 (Leg) |
| 8 | 8 | KING OBERON | 1.7% | 10.0% | excuses +2 | excuses +2 | 3.7% | 12.0% | 17 | J Orman | 3 | On-pace | +excuses | — |
| 9 | 10 | RYUI KOKOROE | 1.4% | 8.2% | excuses +2 | excuses +2 | 3.4% | 10.2% | 16 | H Bentley | 9 | Closer | +excuses | — |
| 10 | 7 | GOOD LUCK HAPPY | 1.8% | 10.0% | 0 | 0 | 1.8% | 10.0% | 8.5 | Y L Chung (-2) | 7 | Front | — | — |
| 11 | 11 | BITS SUPERSTAR | 1.0% | 6.8% | 0 | 0 | 1.0% | 6.8% | 12 | P N Wong (-7) | 5 | Handy | — | — |
| 12 | 9 | WARRIORS DREAM | 0.8% | 5.3% | 0 | 0 | 0.8% | 5.3% | 17 | E C W Wong (-3) | 1 | Stalk | — | — |

**Factor legend:** `+form +1` improving form / "made all" / recent win per Star Form · `excuses +2` TIR bad luck received (bumped, held up, raced tight) · `trial +2` trial win or strong trackwork · `−notRO −2` stewards note the horse was not ridden out. Largest total adjustment is **+3** (#12); largest net-zero pair is #3 (+2/−2). All comfortably inside the ±8% Win / ±10% Place cap, and no horse approaches the 50% Win / 85% Place ceiling.

**Banker eligibility (rules 1 / 17):** #2 FORERUNNER has **10 indexed starts** — not a debutant, eligible. No runner in this field has fewer than 5, so the debutant rule binds on nobody.

**雙膽拖 — not triggered.** 2nd-ranked #4 LEADING DRAGON has Adj Place% **54.7%**, below both published thresholds (63% in the 膽拖 tables, 70% in the A/B table). **Single 膽拖.**

**Reasoning for the pool.** Five horses clear the mandatory **Adj Place% ≥ 25%** bar of §4c — #2 (67.9%), #4 (54.7%), #1 (40.9%), #3 (38.6%), #6 (25.8%) — so all five are locked in. Mode B calls for 6; the sixth slot goes to the next-best **Adj Place%**, which is **#5 PRESTIGE WIN (20.4%)** ahead of **#12 FORZA LEADER (18.3%)**. That is uncomfortable — #5 is the **longest price in the field at 36** while #12 is the market's **4th choice at 7.1** — but Adj Place% is the metric the skill specifies, and #12's SCMP flags have already been credited (+3, the largest in the race) and still leave it short. The #12-instead-of-#5 and #12-as-7th-leg variants are both priced in the ticket summary so the difference is visible. Note the 20% reading of Important Reminder 8 does not change the pool here: no horse sits between 18.3% and 20.4%.

**Threshold note.** The skill states the must-include bar twice (§4c line 299: ≥25%; Reminder 8 line 650: ≥20%). Under either reading the compulsory set is identical here — #5 at 20.4% is the 6th pick either way, and nothing else reaches 20%. No conflict to resolve in this race.

**Pace read — and the honest problem with it.** Only two genuine front-runners are declared: **#4 LEADING DRAGON** (gate 6, "easily made all") and **#7 GOOD LUCK HAPPY** (gate 7, front-running third), with **#1 ROBOT LUCKY STAR** (gate 2) and **#8 KING OBERON** (gate 3) likely handy from inside gates. Two leaders in a 12-horse Class 4 sprint means a **soft-to-moderate tempo**, and the skill's own venue note says HV **1,200m carries a front-runner bias**. That reads directly *against* the model's top pick: **#2 FORERUNNER wins from behind midfield, from gate 11, and SCMP says outright "Gate is a hurdle."** The same objection applies to **#3 COPARTNER FLEET** (closer, gate 12). The horse the pace read actually favours is **#4 LEADING DRAGON** — front-runner, clean gate 6, 10lb claim, and the only pool member the market and the model both like. Per rule 15 the wide gates are treated as noted reducers, not exclusions, and per rule 7 the banker stays with the top Adj Win% horse — but this tension is the single biggest reason confidence below is LOW.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: **#2, #4, #1, #3, #6, #5**
MODE: **B — Standard Pool** | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#2 FORERUNNER** (Adj Place% 67.9%) ← locked in every combo
腳 (Legs):  **#4, #1, #3, #6, #5**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**

TOP TRIO COMBINATIONS (Plackett-Luce fitted to Adj Place%; all 10 ticket combos listed):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|--------------------|-----------------|----------------|
| 1 | #1, #2, #4 | 7.62% | $131 |
| 2 | #2, #3, #4 | 7.03% | $142 |
| 3 | #1, #2, #3 | 4.41% | $227 |
| 4 | #2, #4, #6 | 4.21% | $238 |
| 5 | #2, #4, #5 | 3.20% | $313 |
| 6 | #1, #2, #6 | 2.64% | $379 |
| 7 | #2, #3, #6 | 2.43% | $411 |
| 8 | #1, #2, #5 | 2.01% | $498 |
| 9 | #2, #3, #5 | 1.85% | $541 |
| 10 | #2, #5, #6 | 1.11% | $905 |

**Ticket coverage: 36.5%** of the adjusted-model probability mass across 10 combos — roughly double the coverage the same structure bought in R5, and the top two combos alone (1-2-4 and 2-3-4) carry **14.7%**.

**Fit note (disclosed):** the adjusted Place% column sums to **310.9%**, but any real top-3 distribution must sum to exactly 300%. The Plackett-Luce fit therefore renormalises, landing ~3.4% proportionally below each target (e.g. #2 67.9% → 65.5% fitted, #4 54.7% → 52.8%). Ordering and relative spacing are preserved; absolute combination probabilities are, if anything, slightly conservative.

**Combinations NOT covered by the 膽拖 (banker misses):** the largest are **1-3-4 (2.76%), 1-4-6 (1.65%), 3-4-6 (1.53%), 1-4-5 (1.26%)** — i.e. the whole non-#2 frame, seven of whose ten combinations are built on #4. Full pool C(6,3) = 20 combos would cost **$200** and lift coverage to **48.1%**, so **11.6pp of coverage is being bought away for $100 of saving** — and all of it is concentrated in the scenario where the market (not the model) is right about FORERUNNER.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
- The banker **#2 FORERUNNER is the market's 6th choice at 13.0** while the model makes it a 2.9 chance. Every ticket in Strategy A lives or dies on that 343% claimed edge. Edges that large in an early-morning book with a **23.1% overround** are as often a data artefact as an opportunity — and here the entire field is resuming, which is exactly the condition under which last-season-based MC ratings mislead.
- Independent confirmation does exist on one axis: the market's own shortest quinella is **2-4 at 15**, matching the model's top pair (15.4%, fair $6.5). The spine of the ticket is not something only the model believes.
- The market's confidence is in **#1 ROBOT LUCKY STAR (3.1, Purton)** and **#12 FORZA LEADER (7.1, Teetan)**. #1 is in the pool as a leg — good. **#12 is not**, and it is the clearest exposure in Strategy A.
- The big payoff case is **#3 COPARTNER FLEET at 32** (market Q of 54 with the banker vs a fair $10.6). The 2-3-4 combination at fair **$142** would very likely pay well beyond that, because almost nobody will hold a 13 × 32 × 5.9 frame.
- Cross-referencing quinellas: all five leading MC pairs sit inside {#1, #2, #3, #4}, and the ticket holds all four. The pool is coherent with the model's own second axis.

**Verdict:** a genuine large-payoff value ticket **if** the model's read on FORERUNNER survives a soft HV 1,200m tempo from gate 11; a fast and total loss if the market is right. Size this as a **speculative ticket, not a conviction bet**.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 膽拖 (Banker-Leg)
膽 (Banker): **#2 FORERUNNER**
腳 (Legs):  #4 LEADING DRAGON, #1 ROBOT LUCKY STAR, #3 COPARTNER FLEET, #6 THE PERFECT MATCH, #5 PRESTIGE WIN
COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

TOP COMBINATIONS (highest value):
  1-2-4 (7.62%) · 2-3-4 (7.03%) · 1-2-3 (4.41%) · 2-4-6 (4.21%) · 2-4-5 (3.20%) · 1-2-6 (2.64%) · 2-3-6 (2.43%)

Priced alternatives (not the recommendation, shown so the trade-offs are visible):
| Variant | Structure | Combos | Cost | Coverage |
|---------|-----------|--------|------|----------|
| **Recommended** | 膽拖 1膽#2 + 5腳 (1,3,4,5,6) | 10 | **$100** | 36.5% |
| Add #12 FORZA LEADER as 6th leg | 膽拖 1膽#2 + 6腳 | 15 | $150 | 44.5% |
| Full pool, no banker | C(6,3) | 20 | $200 | 48.1% |
| Pace-read variant (#4 as banker) | 膽拖 1膽#4 + 5腳 (1,2,3,5,6) | 10 | $100 | 31.1% |
| 雙膽拖 #2+#4 (**not sanctioned** — #4 at 54.7% is below the 63% bar) | 2膽 + 4腳 | 4 | $40 | 22.1% |

PASS CONDITIONS:
- If **#2 FORERUNNER** (banker) is scratched → **VOID the ticket**, do not restructure (rule 10).
- If **#4 LEADING DRAGON** is scratched → the ticket loses four of its top five combinations; drop to a 4-leg 膽拖 (C(4,2) = 6, $60) or pass outright.
- If the field drops below 3 starters → pool refunded (not a live risk with 12 declared).
- If **#2 drifts materially in late betting** (out past ~18), read that as the market rejecting the banker on a first-up run from gate 11 and **pass the race** — the whole ticket rests on him.
- If **#1 ROBOT LUCKY STAR shortens below ~2.5**, the pool will concentrate on a favourite-led frame the model does not hold as banker; consider the full-pool variant instead.
- If the going turns **Yielding/Heavy**, the closers (#2, #3, #5, #12) are further compromised on a tight track and the front-runner bias strengthens — re-check before betting.

CONFIDENCE: **LOW** — three independent reasons: (1) the banker is the market's **6th choice at 13.0** and the claimed 343% edge is the largest in the meeting; (2) the banker is a **closer from gate 11** in a race with only two declared leaders, which the skill's own HV 1,200m front-runner note argues against, and SCMP explicitly calls the gate "a hurdle"; (3) **every runner is resuming off an 8–11 week break**, so the MC's form enrichment is describing last-season fitness. Coverage (36.5%) and the 2-4 quinella cross-confirmation are the two things holding it above a PASS.

CAVEATS:
- **Internal model inconsistency — material.** The analyzer's own finish-time projection ranks the field almost exactly opposite to its win probabilities: it projects **#12 FORZA LEADER fastest (1:09.33)** and puts #2, #3, #4 and #1 as the four **slowest** runners (#1 last, 31.7 lengths adrift). Win% and the time model cannot both be right. The Trio ranking here follows Win%/Place% as the skill specifies, but a user should know the two halves of the same tool disagree completely on this race.
- **Place odds unusable.** `fetch-odds.ts` estimated place odds from win odds and SCMP's place column mirrors its win column; only Win odds were used for the Strategy B tests (which is what the rule specifies).
- **SCMP QP matrix suspect.** The extracted Quinella Place values are implausibly flat (every pair among 1/2/3/4 returned 9–12 regardless of price) and were **not** used. The Quinella matrix does vary sensibly (15 to 54) and was used for the cross-reference above.
- **First-up field.** No `−injury30d` flag could apply to anyone because every vet/TIR reference predates the season break by 8+ weeks. #4's "blood in the mouth" and #7's February lameness are noted but unpenalised for that reason.
- **#12 FORZA LEADER is the biggest single exposure in Strategy A** — market's 4th choice at 7.1, the largest SCMP adjustment in the race (+3), and it still misses the 6th pool slot by 2.1pp of Adj Place%. Strategy B holds it; Strategy A does not.
- **Jockey-stat sample sizes are tiny** (4–10 rides per jockey in the indexed data) because the season is new; the MC's jockey factor is close to noise for this meeting.
- Adjusted Place% sums to 310.9% (see fit note) — the Plackett-Luce renormalisation is disclosed rather than hidden.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#2 FORERUNNER** (MC Win% 34.0%, MC Place% 67.9%) ← 1st by MC Win%

Primary legs (MC Place% > 20%): **#4 (53.7%), #1 (38.9%), #3 (38.6%), #6 (24.8%), #5 (20.4%)**

Replaceable legs (MC Place% in 20–30% **AND** Win odds > 10):
- **#6 THE PERFECT MATCH** — MC Place% 24.8%, Win odds 12
- **#5 PRESTIGE WIN** — MC Place% 20.4%, Win odds 36

Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10), processed by Win odds ascending:
1. **#12 FORZA LEADER** — Win odds **7.1**, MC Place% 15.3%
2. **#7 GOOD LUCK HAPPY** — Win odds **8.5**, MC Place% 10.0%

Action:
- **#12 (7.1) → replaces #5 PRESTIGE WIN** — #5 is the lower MC Place% (20.4%) of the two replaceable legs. 1-for-1 swap.
- **#7 (8.5) → replaces #6 THE PERFECT MATCH** — after the first swap, #6 (24.8%, odds 12) is the only remaining leg that is both 20–30% on MC and >10 in the market. 1-for-1 swap. (#12 is now a leg but at 15.3% is outside the 20–30% band, so it is not itself replaceable.)
- No horse was **added directly**; a replaceable leg existed at each step.

Final legs: **#4, #1, #3, #12, #7**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

STRATEGY B TICKET (all 10 combos, Plackett-Luce fitted to raw MC Place%):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|--------------------|-----------------|----------------|
| 1 | #1, #2, #4 | 8.06% | $124 |
| 2 | #2, #3, #4 | 7.97% | $125 |
| 3 | #1, #2, #3 | 4.76% | $210 |
| 4 | #2, #4, #12 | 2.61% | $383 |
| 5 | #2, #4, #7 | 1.65% | $606 |
| 6 | #1, #2, #12 | 1.56% | $643 |
| 7 | #2, #3, #12 | 1.54% | $650 |
| 8 | #1, #2, #7 | 0.98% | $1,017 |
| 9 | #2, #3, #7 | 0.97% | $1,029 |
| 10 | #2, #7, #12 | 0.32% | $3,156 |

**Ticket coverage: 30.4%.** (The raw-MC targets sum to exactly 300%, so this fit is exact — max error 0.02pp.)

**Comparison vs Strategy A.** Same banker, same cost ($100), same 10 combos — but the two strategies differ on **two of five legs**. Strategy A holds **#6 (24.8% place) and #5 (20.4%)**; Strategy B's replacement rule swaps both out for **#12 (15.3%) and #7 (10.0%)** purely on market price. That is the rule working as written — it is explicitly a market-over-model override — but here it is expensive: coverage drops from **36.5% to 30.4%**, and had the swaps not fired, Strategy B's original primary legs (#1,#3,#4,#5,#6) would have covered **39.8%**. Strategy B is buying market agreement with #12 (the 4th favourite, which Strategy A misses entirely) at the cost of roughly 9pp of its own model's probability mass — the largest A-vs-B divergence of this meeting so far, and a clean test case for whether the Win-odds<10 rule earns its keep.

**If choosing one:** Strategy A on coverage and internal consistency; Strategy B if you distrust the model's contempt for the market's 4th choice. **Both share the same fatal dependency — #2 FORERUNNER must finish top 3.** If you don't believe that, the correct action is to pass the race, not to switch strategy.
═══════════════════════════════════════════════════════════
