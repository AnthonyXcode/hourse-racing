═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-09 | Race 6
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --form-data all`, HV + ST form, 2,251 historical races / 2,311 indexed performances; 12/12 horses enriched)
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction)
SCMP DATA: ✅ Loaded — Win/Place odds, Star Form, TIR, Vet, Trackwork for all 12 runners (tipster picks ignored per skill rule 13)
ODDS SOURCE: **HKJC early-morning pool** (`fetch-odds.ts`, captured 01:19 HKT 09-Sep) — complete for all 12 runners
             SCMP odds: ✅ loaded (cross-check; agrees within ~0.5–5 on every runner, no flag flips) | HKJC live: ❌ not open at capture time
             ⚠️ Place odds are NOT usable — `fetch-odds.ts` logged "place odds estimated from win odds", and SCMP's Place column mirrors its Win column (11/11, 15/15, 16/16, 26/27). All Strategy B odds tests below use **Win odds only**, which is what the rule specifies anyway.

RACE: R6 KOWLOON TONG HANDICAP — **Class 4** | 1000m | Turf | Good | **12 runners**
CLASSIFICATION: **Competitive** (top Adj Win% 32.2%, inside the 20–35% band) | POOL SIZE: 6
MODE: **B — Standard Pool (6)**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | C(5,2) = 10 combinations
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL
───────────────────────────────────────────────────────────
```
Meeting: Happy Valley 2026-09-09 | Going: Good | Surface: Turf
Target Race: R6 (Class 4 | 1000m | 12 runners)
Scratchings: none (1 reserve — HAPPY UNITED — did not gain entry)
Odds coverage: 12 / 12 horses with Win odds (HKJC pool + SCMP cross-check)
Jockey stats: 10 jockey profiles + 11 trainer profiles loaded
Debutants: none — every runner has ≥3 indexed starts (fewest: #4 DOUBLE ALPHA, 3).
           Banker #2 BEAUTY SHOW has 5 starts → banker eligibility rule 17 satisfied.
SCMP data: ✅ loaded (all 12 runners)
```

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Draw | Age | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-----|------|-------------------|--------------------------|
| 2 | BEAUTY SHOW | 31.2% | 69.9% | 2.6 | ✅ | ✅ | 6 | 4 | 5 | ★ 膽 (Banker) | 2-6: 18.7% (5.3) |
| 6 | JUMBO BLESSING | 25.4% | 63.3% | 6.5 | ✅ | ✅ | 3 | 5 | 7 | 腳 (Leg) | 2-6: 18.7% (5.3) |
| 5 | GEORGIAN SIGMA | 22.8% | 59.3% | 10 | ✅ | ❌ | 10 | 4 | 6 | 腳 (Leg) | 2-5: 17.0% (5.9) |
| 1 | BLUE ILLUSION | 6.5% | 27.4% | 11 | ✅ | ❌ | 2 | 5 | 10 | 腳 (Leg) | 1-2: 5.3% (19.0) |
| 3 | SUPERB KING | 4.7% | 24.1% | 14 | ✅ | ❌ | 12 | 5 | 10 | ~~腳~~ **replaced out** | 2-3: 4.3% (23.0) |
| 4 | DOUBLE ALPHA | 3.8% | 19.3% | 23 | ❌ | ❌ | 7 | 4 | 3 | — | — |
| 8 | HARMONY FIRE | 2.9% | 15.8% | 11 | ❌ | ❌ | 5 | 9 | 10 | — | — |
| 11 | TURBO JEFFERIES | 1.1% | 7.0% | 15 | ❌ | ❌ | 9 | 4 | 5 | — | — |
| 9 | DAY DAY VICTORY | 0.8% | 5.5% | 7.6 | ❌ | ✅ | 11 | 6 | 10 | 腳 (Leg) — **replacement candidate, swapped in** | — |
| 10 | LUCKY TWENTY | 0.6% | 4.3% | 34 | ❌ | ❌ | 8 | 5 | 9 | — | — |
| 7 | GIANT SPIRIT | 0.3% | 3.3% | 28 | ❌ | ❌ | 4 | 5 | 7 | — | — |
| 12 | ZETA HEDGE | 0.1% | 0.8% | 23 | ❌ | ❌ | 1 | 5 | 6 | — | — |

**Market:** Overround **22.8%**, favourite bias **−15.7%**, longshot bias **−71.0%** — an unusually *favourite-friendly* book, i.e. the market's short prices are, by the model's reckoning, not short enough. Model-vs-market:
- **#5 GEORGIAN SIGMA — undervalued by 127%.** MC has it 3rd (22.8% win / 59.3% place) at a 10.0 market price. The single largest edge in the race and the reason a Place bet on #5 was the analyzer's own top recommendation.
- **#12 ZETA HEDGE — overvalued by 99%** and **#9 DAY DAY VICTORY — overvalued by 94%.** Both are market-supported (#9 at 7.6 is the market's 4th choice) but bottom-quartile on MC.
- **#2 BEAUTY SHOW** (2.6 favourite) and **#6 JUMBO BLESSING** (6.5, 2nd favourite) are agreed on by both model and market. That agreement at the top is what makes this race playable rather than a pass.

**Top quinella combinations (MC):** 2-6 18.7% ($5.3) · 2-5 17.0% ($5.9) · 5-6 12.9% ($7.8) · 1-2 5.3% ($19.0) · 2-3 4.3% ($23.0). All three of the leading pairs are drawn from the same trio {#2, #6, #5} — the model sees this as a three-horse race, and the 2-5-6 Trio is the single dominant combination at **18.7%** raw / **16.8%** adjusted.

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | SCMP Win | SCMP Place | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|----------|------------|------------------|----------|----------|-----------|---------------|
| 1 | BLUE ILLUSION | 11 | 11 | — ("upset winner… then was a non-factor eight times across both tracks") | — (shifted out / made contact — self-caused) | clear | — | Handy / on-pace |
| 2 | BEAUTY SHOW | 2.4 | 2.6 | **+form** ("dictating the pace for seconds in back-to-back runs") | — ("lay in, rider corrected mount" — self-caused, not bad luck) | clear | — | **Front-runner** |
| 3 | SUPERB KING | 15 | 15 | — ("filled the frame without winning nine times… four consecutive placings") | clear | clear | **+trial** ("always handy when securing a Conghua turf trial last month") | Handy / stalker |
| 4 | DOUBLE ALPHA | 24 | 23 | — ("front-running eighth as the favourite before dictating the pace for 10th") | — (shifted in on jumping, single instance; rider: "raced too keenly in the lead… gave ground") | clear ("no significant findings") | — | **Front-runner** |
| 5 | GEORGIAN SIGMA | 11 | 10 | — ("back-to-back thirds over the Valley 1,200m with a one-out, one-back seventh") | **+excuses** ("became unbalanced when bumped heavily" shortly after start) | clear | — | Stalker (one-out, one-back) |
| 6 | JUMBO BLESSING | 7 | 6.7 | **+form** ("flashed home to win travelling third last after a slow start over the Valley 1,000m") | **+excuses** ("Slow to begin… After 250M was bumped") | clear | — | **Closer** |
| 7 | GIANT SPIRIT | 26 | 27 | — ("still to come right in seven local sprints… speed-chasing ninth") | — (lost left front plate after race — not a listed flag) | clear | — | Speed-chaser |
| 8 | HARMONY FIRE | 12 | 11 | **+form** ("stayed on for minor cheques nine times from 10 starts. Comes off a handily ridden third") | clear | **−age** ("Eight years of age or above at season end", passed 18/08/2026) | — | Speed-tracking / handy |
| 9 | DAY DAY VICTORY | 7.8 | 7.9 | **+form** ("Comes off closing third from midfield and has since changed stables") | clear | clear | — | Closer from midfield |
| 10 | LUCKY TWENTY | 39 | 34 | — ("failing to beat a runner over the Valley 1,000m") | **+excuses** ("Approaching 900M raced tight") | clear ("no significant findings") | — | Speed-chaser |
| 11 | TURBO JEFFERIES | 16 | 16 | — ("closing fifth… even eighth from midfield over 1,400m") | **+excuses** ("Jumped only fairly. Near 200M was steadied") | clear | **+trial** ("Won a recent trial") | Closer |
| 12 | ZETA HEDGE | 21 | 22 | — ("failed to come close five times sprinting across both tracks") | **+excuses** ("bumped on the hindquarters" shortly after start) | clear ("no significant findings") | — | Front / speed-tracking |

**Flag discipline applied:** `−barrier` requires "bumped on jumping" in **≥2** recent runs — #4 and #12 each show a single instance, so no penalty. `+excuses` is granted only where the horse **received** the interference (#5 bumped heavily, #6 bumped, #10 raced tight, #11 steadied), never where it **caused** it (#1, #4, and #6's own shift at 300M). `−age` applies to #8 HARMONY FIRE (9yo, vet-flagged) in this Class 4 event. No `−injury30d`, no `−perf`, no `−notRO` anywhere in this race — three of the four vet entries are explicit "no significant findings" clearances.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 2 | BEAUTY SHOW | 31.2% | 69.9% | +form +1 | +form +1 | **32.2%** | **70.9%** | 2.6 | Z Purton | 6 | Front | +form | ★ 膽 (Banker) |
| 2 | 6 | JUMBO BLESSING | 25.4% | 63.3% | +form +1, excuses +2 | +form +1, excuses +2 | **28.4%** | **66.3%** | 6.5 | C Y Ho | 3 | Close | +form, +excuses | 腳 (Leg) |
| 3 | 5 | GEORGIAN SIGMA | 22.8% | 59.3% | excuses +2 | excuses +2 | **24.8%** | **61.3%** | 10 | A Atzeni | 10 | Stalk | +excuses | 腳 (Leg) |
| 4 | 3 | SUPERB KING | 4.7% | 24.1% | trial +2 | trial +2 | 6.7% | 26.1% | 14 | C L Chau (-2) | 12 | Stalk | +trial | 腳 (Leg) |
| 5 | 1 | BLUE ILLUSION | 6.5% | 27.4% | 0 | 0 | 6.5% | 27.4% | 11 | H Y Yuen (-10) | 2 | Handy | — | 腳 (Leg) |
| 6 | 11 | TURBO JEFFERIES | 1.1% | 7.0% | excuses +2, trial +2 | excuses +2, trial +2 | 5.1% | 11.0% | 15 | H Bentley | 9 | Close | +excuses, +trial | — |
| 7 | 4 | DOUBLE ALPHA | 3.8% | 19.3% | 0 | 0 | 3.8% | 19.3% | 23 | M F Poon | 7 | Front | — | 腳 (Leg) |
| 8 | 10 | LUCKY TWENTY | 0.6% | 4.3% | excuses +2 | excuses +2 | 2.6% | 6.3% | 34 | J Orman | 8 | Chase | +excuses | — |
| 9 | 12 | ZETA HEDGE | 0.1% | 0.8% | excuses +2 | excuses +2 | 2.1% | 2.8% | 23 | K Teetan | 1 | Front | +excuses | — |
| 10 | 8 | HARMONY FIRE | 2.9% | 15.8% | +form +1, -age −2 | +form +1 | 1.9% | 16.8% | 11 | P N Wong (-7) | 5 | Track | +form, −age | — |
| 11 | 9 | DAY DAY VICTORY | 0.8% | 5.5% | +form +1 | +form +1 | 1.8% | 6.5% | 7.6 | A Badel | 11 | Close | +form | — |
| 12 | 7 | GIANT SPIRIT | 0.3% | 3.3% | 0 | 0 | 0.3% | 3.3% | 28 | H T Mo (-2) | 4 | Chase | — | — |

**Factor legend:** `+form +1` = improving form / "made all" / "rallied" / dictating pace per Star Form. `excuses +2` = TIR bad luck received (bumped, steadied, raced tight). `trial +2` = trial win or strong trackwork. `−age −2` = vet-flagged 8yo+ in Class 3-or-lower grade (Win% only; the skill's age penalty is not applied to Place%). Every total is well inside the ±8% Win / ±10% Place cap; nothing approaches the 50% Win / 85% Place ceiling.

**Banker eligibility:** #2 BEAUTY SHOW has 5 indexed starts — not a debutant, eligible (rule 17 satisfied). It is also the clear market favourite at 2.6 and the MC #1 by a 6pp margin, so model and market fully agree on the anchor. Its top-3 profile is the relevant one for Trio: **placed in 3 of 5 starts, second in each of its last two**, both over this exact course and distance (HV 1,000m). The fact that it is still a maiden is irrelevant to a bet that only needs it in the frame.

**雙膽拖 trigger — declined.** The skill states the 2-banker threshold twice with different numbers: the A/B table says **Adj Place% ≥ 70%**, the 膽拖 tables say **≥ 63%**. 2nd-ranked #6 JUMBO BLESSING sits at **66.3%** — between the two, exactly the ambiguity flagged in the 09-Sep R3 report. It fails the stricter reading, and rule 19 additionally requires a "strongly structured" race, which a Competitive-band Class 4 Happy Valley sprint is not. **Recommendation: single 膽拖.** (Had it been taken: 2膽 + 4腳 = 4 combos, $40, but combined banker probability ≈ 70.9% × 66.3% ≈ 47% — a coin flip before any leg has to be right.)

**Reasoning for the pool:** Five horses clear the mandatory **Adj Place% ≥ 25%** threshold — #2 (70.9%), #6 (66.3%), #5 (61.3%), #1 (27.4%), #3 (26.1%) — so all five are locked in. Mode B calls for a pool of 6; the top 3 by Adj Win% (#2, #6, #5) are the same horses as the top 3 by Adj Place%, and the 6th slot goes to the next-best Adj Place%: **#4 DOUBLE ALPHA (19.3%)**. He beats #8 HARMONY FIRE (16.8%) and #11 TURBO JEFFERIES (11.0%) on the metric the skill specifies. Note that #4 is a 23-1 shot with only 3 career starts — he is the weakest link in the pool and appears only in the three cheapest combinations.

**Pace read:** This is a **contested-tempo 1,000m**. Four runners want the front: **#2 BEAUTY SHOW** ("dictating the pace" in back-to-back runs, draw 6), **#4 DOUBLE ALPHA** ("dictating the run", "raced too keenly in the lead… ran inside standard time", draw 7), **#12 ZETA HEDGE** ("cheeky sight in front", draw 1) and **#7 GIANT SPIRIT** (speed-chasing, draw 4). Over Happy Valley's 1,000m that pressure historically sets the race up for the closers — which is precisely **#6 JUMBO BLESSING** ("flashed home to win travelling third last after a slow start", draw 3) and **#5 GEORGIAN SIGMA** (one-out, one-back, draw 10). The pace scenario therefore *supports the two legs and mildly threatens the banker.* #2 survives this read because (a) Purton is the rider best equipped to take a soft lead or ease into second, and (b) even a beaten-off-the-pace #2 has been finishing second, not fading — the Trio only needs third.

**Draw note (reducers, not exclusions, per rule 15):** #3 SUPERB KING is stuck in **gate 12** over a 1,000m Valley sprint, which is a real handicap, and #5 GEORGIAN SIGMA in gate 10 is not much better. Neither is excluded — #3's 26.1% Adj Place% is above the mandatory-inclusion line and #5 is the model's biggest value horse — but gate 12 is why #3 sits at the bottom of the Strategy A combination ranking rather than higher.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: #2, #6, #5, #3, #1, #4
MODE: B — Standard Pool | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#2 BEAUTY SHOW** (Adj Place% 70.9%) ← locked in every combo
腳 (Legs):  #6, #5, #1, #3, #4
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**

TOP TRIO COMBINATIONS (Plackett-Luce fit to Adj Place%, all 10 ticket combos listed):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|-------------------|-----------------|----------------|
| 1 | #2, #5, #6 | 16.78% | $60 |
| 2 | #1, #2, #6 | 5.26% | $190 |
| 3 | #2, #3, #6 | 4.96% | $202 |
| 4 | #1, #2, #5 | 4.43% | $226 |
| 5 | #2, #3, #5 | 4.19% | $239 |
| 6 | #2, #4, #6 | 3.51% | $285 |
| 7 | #2, #4, #5 | 2.96% | $338 |
| 8 | #1, #2, #3 | 1.30% | $770 |
| 9 | #1, #2, #4 | 0.92% | $1,087 |
| 10 | #2, #3, #4 | 0.87% | $1,149 |

**Ticket coverage: 45.2%** of the adjusted-model probability mass — a high figure for a 10-combination Trio ticket, and it comes almost entirely from the top line: **2-5-6 alone is 16.8%**, more than the next four combinations put together.

**Combinations NOT covered by the 膽拖 (banker misses):** 1-5-6 (3.75%), 3-5-6 (3.54%), 4-5-6 (2.50%), 5-6-8 (2.15%) — note that every one of the top uncovered combinations is a **5-6-x** where the banker fails but the two legs still fill the frame. That is the specific shape of this race's banker risk. Full-pool C(6,3) = 20 combos would cost $200 and cover **60.0%** — i.e. double the stake buys 14.8pp more coverage; the 膽拖 buys 45.2% for half the money, which is the correct trade given #2 is simultaneously MC #1, market favourite, and 3-from-5 in the frame at this exact course and distance.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
Honest read: **this is a coverage ticket, not a value ticket.**
- The model and the market agree on the top two (#2 at 2.6, #6 at 6.5). When the favourite is that short and the top MC quinella pair (2-6, $5.3 fair) is also the market's obvious pair, the **Trio dividend on 2-5-6 will be modest** — likely well under the $60 fair-odds estimate once public money is accounted for. Six of the ten combinations are effectively lottery tickets priced above $200.
- The one genuine edge is **#5 GEORGIAN SIGMA at 10.0, which the MC calls undervalued by 127%.** #5 appears in four of the ten combinations including the top line. If the model is right about #5, the ticket is sound; if #5's 10.0 price is fair and the market is right, the ticket's headline combination is badly over-weighted.
- Cross-checking the quinella axis per rule 14: 2-6 ($5.3), 2-5 ($5.9) and 5-6 ($7.8) are all short fair prices, confirming the market and model both expect these three to fill the frame. There is **no large-dividend scenario inside the Strategy A ticket** — a 2-5-6 result is the consensus outcome and will pay accordingly.

Verdict: play it for the hit rate, not the payout. $100 is a normal-sized ticket; do not escalate.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 膽拖 (Banker-Leg)
膽 (Banker): #2 BEAUTY SHOW
腳 (Legs):  #6 JUMBO BLESSING, #5 GEORGIAN SIGMA, #1 BLUE ILLUSION, #3 SUPERB KING, #4 DOUBLE ALPHA
COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

TOP COMBINATIONS (highest value):
  2-5-6 (16.78%) · 1-2-6 (5.26%) · 2-3-6 (4.96%) · 1-2-5 (4.43%) · 2-3-5 (4.19%) · 2-4-6 (3.51%) · 2-4-5 (2.96%)

PASS CONDITIONS:
- If **#2 BEAUTY SHOW** (banker) is scratched → **VOID the ticket**, do not restructure (rule 10).
- If #6 JUMBO BLESSING or #5 GEORGIAN SIGMA is scratched → the ticket loses its dominant combination; drop to a 4-leg 膽拖 (C(4,2) = 6 combos, $60) or pass.
- If the field drops below 3 starters → pool refunded (not a live risk with 12 declared).
- If the going turns **Yielding/Heavy**, the contested-pace read that favours closers #6 and #5 strengthens further, but #2's front-running profile weakens — re-check the banker before betting.
- If #2 drifts materially in late betting (out past ~4.0 from 2.6), treat that as market disagreement with the banker and consider passing.

CONFIDENCE: **MEDIUM-HIGH** — the banker is as well-supported as this pipeline gets (MC #1, market favourite, 70.9% Adj Place%, 3-from-5 in the frame over the exact course and distance), and 45.2% coverage from 10 combinations is efficient. Held back from HIGH by the contested-pace read that mildly threatens a front-running banker, and by the fact that the payout on the dominant combination will be small.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#2 BEAUTY SHOW** (MC Win% 31.2%, MC Place% 69.9%) ← 1st by MC Win%

**Step A — Primary legs (MC Place% > 20%, excluding banker):** #6 (63.3%), #5 (59.3%), #1 (27.4%), #3 (24.1%) → **4 primary legs**

**Step B — Win-odds replacement / addition:**
- Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10): **#9 DAY DAY VICTORY** (Win odds 7.6, MC Place% 5.5%) — the only qualifier. (#4 is 23, #8 is 11, #11 is 15, #10 is 34, #7 is 28, #12 is 23 — all fail the odds test. #5 at exactly 10.0 fails `< 10` but is already a primary leg.)
- Replaceable legs (MC Place% 20–30% **AND** Win odds > 10): **#1 BLUE ILLUSION** (27.4%, odds 11) and **#3 SUPERB KING** (24.1%, odds 14). Both qualify; the rule takes the **lowest MC Place%** among them → **#3 SUPERB KING**.
- **Action: #9 DAY DAY VICTORY replaces #3 SUPERB KING** (1-for-1 swap, as mandated).

| Order | # | Horse | Win Odds | MC Place% | Replaceable leg available? | Action |
|-------|---|-------|----------|-----------|----------------------------|--------|
| 1 | 9 | DAY DAY VICTORY | 7.6 | 5.5% | Yes — #3 (24.1%, odds 14) is the lowest in the 20–30% band | **Replaced #3** |

**Final legs (4):** #6, #5, #1, #9
BET STRUCTURE: 膽拖 | 1膽 + **4腳** | COMBINATIONS: C(4,2) = **6**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $60**

STRATEGY B TICKET — all 6 combinations (raw-MC probabilities):

| Combo | MC Prob | Fair odds |
|-------|---------|-----------|
| 2-5-6 | 18.69% | $54 |
| 1-2-6 | 6.03% | $166 |
| 1-2-5 | 5.21% | $192 |
| 2-6-9 | 1.05% | $952 |
| 2-5-9 | 0.91% | $1,099 |
| 1-2-9 | 0.29% | $3,448 |

**Ticket coverage: 32.2%** of the raw-MC probability mass.

**⚠️ The mandated swap costs coverage here.** Without it (legs #6, #5, #1, #3) the same 6-combination ticket would cover **41.0%** — the swap trades a 24.1%-place horse for a 5.5%-place horse and gives up **8.8 percentage points** of coverage, because 2-3-6 (5.18%) and 2-3-5 (4.48%) are replaced by 2-6-9 (1.05%) and 2-5-9 (0.91%). The rule was applied exactly as written (it is a market-signal override, betting that the market's 7.6 on #9 knows something the MC's 5.5% does not), but it should be flagged: three of Strategy B's six combinations are now above $950 fair odds. This is a case worth logging for the post-race review — #3 SUPERB KING has filled the frame 9 times from 12 Valley starts up to 1,200m, which is exactly the consistent frame-filler profile the Trio pool wants, and the MC's 24.1% may well be the better number than the market's 14.0.

**Strategy A vs Strategy B comparison:** Both strategies pick the **same banker (#2)** and the **same three core legs (#6, #5, #1)** — the top of this race is not in dispute. The divergence is entirely in the fourth and fifth slots. Strategy A keeps **#3 SUPERB KING** (promoted by a `+trial` adjustment to 26.1% Adj Place%) and adds **#4 DOUBLE ALPHA**, reaching 10 combinations for **$100** and **45.2%** coverage. Strategy B is forced by the Win-odds rule to swap #3 out for **#9 DAY DAY VICTORY**, landing on 6 combinations for **$60** and only **32.2%** coverage. **Strategy A is clearly the better ticket in this race**: it costs 67% more but buys 40% more probability mass, and it retains the two mid-priced frame-fillers (#3, #4) that Strategy B's mechanical odds rule discards or never reaches. If cost is the binding constraint, the honest minimum here is not Strategy B but the 3-leg core — #2 banker with #6, #5, #1 — for C(3,2) = 3 combos at $30, which alone captures 26.5% of the adjusted mass.

───────────────────────────────────────────────────────────
CAVEATS
───────────────────────────────────────────────────────────
1. **Historical sync not re-run this session** — per instruction, `sync-historical.ts` was skipped (already synced upstream). The MC loaded 2,251 historical races and enriched 12/12 runners, so form coverage for this race is complete; but the most recent meeting's results are unverified from within this run.
2. **Place odds are unusable.** `fetch-odds.ts` logged "place odds estimated from win odds", and SCMP's Place column mirrors its Win column (11/11, 15/15, 16/16). All decisions above use **Win odds only**. Do not read any Place Odds figure in this report as a real pool price.
3. **Finish-time projection is internally inconsistent and was ignored.** The MC's own projection ranks #11 TURBO JEFFERIES (MC Win% 1.1%, 15-1) as the fastest horse and puts #1 BLUE ILLUSION last by 3.52s / 21 lengths, while placing the MC #1 #2 BEAUTY SHOW **8th of 12** — flatly contradicting the same run's Win/Place output and the market. This is the same defect documented in the 06-Sep ST R3 and 09-Sep HV R3 reviews. The projection block is not used in any selection here; only the Win%/Place% output is.
4. **Distance parse discrepancy (resolved).** The scraper logged `R6: parsed class=Class 4, distance=1200m`, but the stored racecard JSON, the analyzer's own race header, and SCMP all state **1000m**. The simulation ran on 1000m. Worth fixing in the scraper's log path, but it did not affect this analysis.
5. **Odds source drift between HKJC and SCMP.** #2 is 2.6 (HKJC 01:19) vs 2.4 (SCMP); #6 6.5 vs 7.0; #5 10.0 vs 11.0; #9 7.6 vs 7.8. **No flag flips under either source** — #9 is the sole `Win odds < 10` candidate on both, and #5 fails `< 10` on both — so Strategy B's leg selection is robust to the odds source. But these are morning prices; re-check before betting.
6. **`−age` interpretation.** The skill specifies the 8yo+ penalty applies "in C3+ races". Read here as Class 3 and below in grade (Classes 3/4/5), so the −2 Win% penalty was applied to 9yo #8 HARMONY FIRE in this Class 4. Under the opposite reading (Class 3 and *above* only) #8 would rank 8th rather than 10th on Adj Win% — it is outside the pool either way, so the ambiguity is not load-bearing here. Worth reconciling in `skills/trio-strategy/SKILL.md`.
7. **雙膽拖 threshold ambiguity in the skill (recurring).** ≥70% (A/B table) vs ≥63% (膽拖 tables). #6 at 66.3% falls between them, exactly as #10 did in R3. Resolved in favour of single-banker 膽拖. This should be reconciled once in the skill file rather than re-litigated per race.
8. **Trio probabilities are modelled, not simulated per-combination.** `analyze-race.ts` outputs per-horse Win%/Place% and quinella pairs, not trio joint probabilities. The combination probabilities above come from a Plackett-Luce fit to the place probabilities. The **raw MC** column sums to exactly 300.0% (a perfectly consistent three-slot distribution, so the Strategy B fit is exact to 0.1pp). The **adjusted** column sums to 318%, so the Strategy A fit reproduces each horse's place% about 6% low in relative terms (e.g. #2 70.9% → 66.9%); combination probabilities are therefore mildly conservative and relative ranking is unaffected.
9. **#4 DOUBLE ALPHA has only 3 career starts** — the thinnest form line in the pool, and his three combinations carry the lowest probabilities on the ticket. He is in on Adj Place% as Mode B's sixth horse, not on conviction.
10. **One reserve (HAPPY UNITED) did not gain entry.** If a late scratching promotes the reserve, re-run the simulation — the field composition changes and the reserve carries no MC output.

───────────────────────────────────────────────────────────
SUMMARY
───────────────────────────────────────────────────────────
| | Strategy A | Strategy B |
|---|---|---|
| Banker | #2 BEAUTY SHOW | #2 BEAUTY SHOW |
| Legs | #6, #5, #1, #3, #4 (5) | #6, #5, #1, #9 (4) |
| Structure | 膽拖 1膽 + 5腳 | 膽拖 1膽 + 4腳 |
| Combinations | C(5,2) = 10 | C(4,2) = 6 |
| Total stake | **$100** | **$60** |
| Coverage | 45.2% (adj model) | 32.2% (raw MC) |
| Top combination | 2-5-6 (16.78%) | 2-5-6 (18.69%) |
| Confidence | MEDIUM-HIGH | MEDIUM |

═══════════════════════════════════════════════════════════
