═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY — Happy Valley | 2026-09-09 | Race 5
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings (12 declared, 2 standby)
MC SIMULATION: 10,000 iterations | `analyze-race.ts --form-data all` (HV + ST form, 2,251 historical races indexed)
SCMP DATA: ✅ Loaded — Win/Place odds, Star Form, TIR, Vet report, Trackwork for all 12 runners (tipster picks ignored per rule 13)
ODDS SOURCE: HKJC early-morning pool (`fetch-odds.ts`, captured 09:19 HKT 09-Sep-2026)
             SCMP odds: ✅ loaded (cross-check, agrees within ~1.0 on every runner) | HKJC live: ❌ not open at capture time
             ⚠️ Place odds unusable — `analyze-race.ts` logged "place odds estimated from win odds", and SCMP's Place column mirrors its Win column (16/15, 6.5/6.6, 13/13, 24/24). Every odds test below uses **Win odds only**, which is what the Strategy B rule specifies anyway.

RACE: R5 — CENTRAL HANDICAP | Class 3 | 1650m | Turf | Good | 12 runners
CLASSIFICATION: **Competitive** (top Adj Win% 20.5%, just inside the 20–35% band) | POOL SIZE: 6
MODE: **B — Standard Pool (6)**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | C(5,2) = 10 combos
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
STEP 2 — DATA VALIDATION SUMMARY
───────────────────────────────────────────────────────────
```
Meeting: Happy Valley 2026-09-09 | Going: Good | Surface: Turf
Target Race: R5 (Class 3 | 1650m | 12 runners) — CENTRAL HANDICAP, prize $2,050,000
Scratchings: none (SUPER UNICORN / CALL ME TOPSEED are standby reserves, not declared runners)
Odds coverage: 12/12 horses with Win odds
Jockey stats: ✅ 10 jockey profiles + 12 trainer profiles loaded
Form enrichment: ✅ 12/12 horses enriched (min 5 indexed runs — no debutants in the race)
SCMP data: ✅ loaded
```
Critical checks: ≥3 starters ✅ · odds populated for top 3–5 ✅ · jockey stats ✅ · meeting confirmed ✅
Warning checks: going parsed as "Good" ✅ · surface Turf ✅ · no late withdrawals ✅ · no first-timers or >90-day layoffs among the 12 · SCMP retrieved ✅

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — all 12 runners
───────────────────────────────────────────────────────────
Flags: **Place%>20%** = MC Place% > 20% (Strategy B primary leg). **Win odds<10** = Win odds < 10.

| #  | Horse             | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form | Role (Strategy B)  | Top Quinella (fair odds) |
|----|-------------------|---------|-----------|----------|------------|-------------|------|--------------------|--------------------------|
| 10 | FORTUNATE SON     | 18.5%   | 44.9%     | 17       | ✅          | ❌           | 10   | ★ 膽 (Banker)      | 8-10: 6.2% (16.3)        |
| 8  | SAMARKAND         | 15.4%   | 40.6%     | 13       | ✅          | ❌           | 10   | 腳 (Leg)           | 1-8: 4.3% (23.2)         |
| 1  | DEFINITIVE        | 13.7%   | 37.8%     | 16       | ✅          | ❌           | 10   | 腳 (Leg)           | 1-10: 5.3% (18.8)        |
| 6  | ANOTHER ZONDA     | 11.7%   | 33.4%     | 11       | ✅          | ❌           | 10   | 腳 (Leg)           | 6-10: 4.3% (23.4)        |
| 4  | DO YOUR PART      | 9.9%    | 31.1%     | 5.6      | ✅          | ✅           | 10   | 腳 (Leg)           | 4-10: 4.4% (22.8)        |
| 3  | CHINA WIN         | 8.3%    | 26.9%     | 8.8      | ✅          | ✅           | 10   | 腳 (Leg)           | —                        |
| 9  | WINDLORD          | 5.7%    | 19.5%     | 16       | ❌          | ❌           | 9    | —                  | —                        |
| 12 | GENERAL REDWOOD   | 4.7%    | 17.0%     | 13       | ❌          | ❌           | 7    | —                  | —                        |
| 11 | DREAMING TOGETHER | 4.3%    | 15.8%     | 25       | ❌          | ❌           | 5    | —                  | —                        |
| 5  | VIOLET STAR       | 3.5%    | 14.0%     | 3.9      | ❌          | ✅           | 8    | 腳 (Leg) — added   | — (replacement candidate) |
| 2  | SOLID WIN         | 3.1%    | 12.4%     | 6.7      | ❌          | ✅           | 10   | 腳 (Leg) — added   | — (replacement candidate) |
| 7  | KEEFY             | 1.3%    | 6.6%      | 16       | ❌          | ❌           | 10   | —                  | —                        |

**Market:** Overround **23.3%** (early-morning pool, wide). Favourite bias **−86.6%**, longshot bias **+3.9%** — the model thinks this market has the race badly upside-down. Flagged inefficiencies: **#10 undervalued by 215%**, **#1 by 119%**, **#8 by 100%**. The three horses the MC likes best are the market's 8th, 10th and 5th choices. Conversely the market's top two — **#5 VIOLET STAR (3.9)** and **#4 DO YOUR PART (5.6)** — are the MC's 10th and 5th. **This is the defining fact of the race and the main risk in every ticket below.**

**Top MC quinella combinations:** 8-10 6.2% ($16.3) · 1-10 5.3% ($18.8) · 4-10 4.4% ($22.8) · 1-8 4.3% ($23.2) · 6-10 4.3% ($23.4). Every leading pair contains **#10** — the model's whole read of the race pivots on a 17-to-1 shot.

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | SCMP Win | SCMP Place | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|----------|------------|------------------|----------|----------|-----------|---------------|
| 1 | DEFINITIVE | 16 | 15 | **+form** ("returning off a knee injury with a **rallying** Valley success"; carries top weight) | clear | clear | — | Stalker / handy ("placed ridden handy") |
| 2 | SOLID WIN | 6.5 | 6.6 | — ("a win in January… then fourth in two of three starts") | — ("jumped well and raced in a more forward position than intended" — tactics, not bad luck) | clear | — | Versatile / on-pace ("different run patterns") |
| 3 | CHINA WIN | 8.1 | 8.4 | — ("staying on for fifth over the Valley 1,800m") | — (withdrawn by Stewards on vet advice — counted under Vet, not double-counted) | **−injury30d** (irregular heart rhythm 11/05/2026; passed official vet exam **02/09/2026** = 7 days ago) | **+trial** ("made giant strides late, second in latest Sha Tin dirt trial") | Closer |
| 4 | DO YOUR PART | 6.1 | 5.4 | — ("an unlucky fourth at Sha Tin") | **+excuses** ("bumped on jumping"; "**badly held up** for clear running when awkwardly placed on heels") | clear | **+trial** ("Has since **won a trial**" — Conghua turf) | On-pace / speed-chaser |
| 5 | VIOLET STAR | 4 | 4.4 | — ("running on late for fifth from gate 12") | — ("on jumping shifted out and lost ground" — self-caused; "shifted across behind runners" from gate 12 = tactics) | clear | **+trial** ("Has trialled well"; caught the eye at Conghua) | Closer / from the rear |
| 6 | ANOTHER ZONDA | 10 | 10 | **+form** ("wire-to-wire Valley 1,650m win"; "before **making all** by a neck in Class Four") | clear | clear | — | Front-runner |
| 7 | KEEFY | 15 | 15 | — ("failed to figure three times"; "one-paced eighth from midfield") | **+excuses** ("held up on the Home Turn") | **−age** (eight years or older at season end; passed 20/08/2026) | — | Midfield |
| 8 | SAMARKAND | 13 | 13 | **+form** ("**made all** over the Valley 1,650m in November"; "box-seat second for his new trainer") | clear | **−age** (eight years or older at season end; passed 18/08/2026) | — | Front-runner |
| 9 | WINDLORD | 16 | 16 | — ("no better than a handily ridden fifth… then ninth"; new trainer, first Valley start) | **+excuses** ("between the 400M and the 200M was **held up** for clear running") | clear | — | Handy / stalker |
| 10 | FORTUNATE SON | 19 | 18 | — ("second Class Four win in January… three times fourth in Class Three from seven runs") | **+excuses** ("**held up** for clear running" on the Home Turn; "near the 200M was **steadied** when disappointed for clear running") | clear (post-race inspection: no significant findings) | — | Stalker |
| 11 | DREAMING TOGETHER | 24 | 24 | — ("made inroads late for sixth"; "failing to fire from gate 13"; **course debut**) | **+excuses** ("jumped only fairly"; "after the 400M was **held up** for clear running and when being shifted out made contact") | clear | — | Closer |
| 12 | GENERAL REDWOOD | 13 | 12 | **+form** ("**Made all** at his fourth start and third over the Valley 1,650m"; "won by a nose"; 19lb less to offset a rise in class) | — ("on jumping made contact with a runner" — single instance, self-caused) | clear | — | Front-runner / versatile |

**Flag discipline applied (documented so it can be audited):**
- `+form +1` is keyed off the Star Form text containing one of the skill's listed keywords — *winner / made all / rallied / improved / sharp / does draw well*. That catches **#1, #6, #8, #12** and nothing else. #2 ("got the hang of things"), #4 ("built on"), #5 ("built on") use language outside the list and score 0.
- `excuses +2` is applied where the stewards record the horse was **held up for clear running / steadied / crowded / hampered / given a wide trip** — i.e. prevented from running its race. That catches **#4, #7, #9, #10, #11**. Self-caused shifts with no interference (#2, #5, #12) score 0.
- `−barrier` requires "bumped on jumping" in **≥2** recent runs. #4 and #12 each show **one** instance → **no penalty** for either.
- `−age` applies to 8yo+ in C3+ races: **#7 KEEFY** and **#8 SAMARKAND** (both flagged by the SCMP vet section). No other runner is 8.
- `−injury30d` requires a vet clearance dated <30 days out: only **#3 CHINA WIN** (cleared 02/09/2026, 7 days). #1's knee injury is narrative in Star Form with **no vet entry**, and he has since **won** off it → no penalty. #8's foot surgery is likewise historical (he has raced since) → no penalty.
- `−perf` (unacceptable performance) and `−notRO` (not ridden out): **none in this race**.
- Per house convention the same reason list is applied to both the Adj Win% and Adj Place% columns, except `−injury30d`, which the skill scores asymmetrically (−3 Win / −4 Place).

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC + SCMP adjustments)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 10 | FORTUNATE SON | 18.5% | 44.9% | excuses +2 | excuses +2 | **20.5%** | **46.9%** | 17 | C Y Ho | 3 | Stalk | +excuses | ★ 膽 (Banker) |
| 2 | 1 | DEFINITIVE | 13.7% | 37.8% | +form +1 | +form +1 | **14.7%** | **38.8%** | 16 | R Kingscote | 10 | Stalk | +form | 腳 (Leg) |
| 3 | 8 | SAMARKAND | 15.4% | 40.6% | +form +1, -age −2 | +form +1, -age −2 | **14.4%** | **39.6%** | 13 | Z Purton | 8 | Front | +form, −age | 腳 (Leg) |
| 4 | 4 | DO YOUR PART | 9.9% | 31.1% | excuses +2, trial +2 | excuses +2, trial +2 | **13.9%** | **35.1%** | 5.6 | B Avdulla | 5 | On-pace | +excuses, +trial | 腳 (Leg) |
| 5 | 6 | ANOTHER ZONDA | 11.7% | 33.4% | +form +1 | +form +1 | **12.7%** | **34.4%** | 11 | P N Wong (-7) | 2 | Front | +form | 腳 (Leg) |
| 6 | 9 | WINDLORD | 5.7% | 19.5% | excuses +2 | excuses +2 | 7.7% | 21.5% | 16 | M Chadwick | 12 | Handy | +excuses | — |
| 7 | 3 | CHINA WIN | 8.3% | 26.9% | trial +2, -injury30d −3 | trial +2, -injury30d −4 | 7.3% | **24.9%** | 8.8 | M L Yeung | 4 | Close | +trial, −injury30d | 腳 (Leg) |
| 8 | 11 | DREAMING TOGETHER | 4.3% | 15.8% | excuses +2 | excuses +2 | 6.3% | 17.8% | 25 | A Atzeni | 9 | Close | +excuses | — |
| 9 | 12 | GENERAL REDWOOD | 4.7% | 17.0% | +form +1 | +form +1 | 5.7% | 18.0% | 13 | Y L Chung (-2) | 11 | Front | +form | — |
| 10 | 5 | VIOLET STAR | 3.5% | 14.0% | trial +2 | trial +2 | 5.5% | 16.0% | **3.9** | K Teetan | 1 | Close | +trial | — |
| 11 | 2 | SOLID WIN | 3.1% | 12.4% | 0 | 0 | 3.1% | 12.4% | 6.7 | C L Chau (-2) | 6 | On-pace | — | — |
| 12 | 7 | KEEFY | 1.3% | 6.6% | excuses +2, -age −2 | excuses +2, -age −2 | 1.3% | 6.6% | 16 | M F Poon | 7 | Mid | +excuses, −age | — |

**Factor legend:** `+form +1` improving form / "made all" / "rallied" per Star Form · `excuses +2` TIR bad luck (held up for clear running, steadied, hampered, wide trip) · `trial +2` trial win or strong trackwork · `−age −2` 8yo+ in C3+ · `−injury30d −3 Win / −4 Place` vet clearance <30 days old. Largest total adjustment is **+4** (#4) — comfortably inside the ±8% Win / ±10% Place cap. No horse approaches the 50% Win / 85% Place ceiling.

**Banker eligibility (rules 17 / 1):** #10 FORTUNATE SON has **10 indexed starts** — not a debutant, eligible. The whole field has ≥5 indexed runs, so the debutant rule binds on nobody here.

**雙膽拖 — not triggered.** 2nd-ranked #1 DEFINITIVE has Adj Place% **38.8%**, far below either published threshold (63% in the 膽拖 tables, 70% in the A/B table). **Single 膽拖.**

**Reasoning for the pool.** Five horses clear the mandatory **Adj Place% ≥ 25%** bar of §4c — #10 (46.9%), #8 (39.6%), #1 (38.8%), #4 (35.1%), #6 (34.4%) — so all five are locked in. Mode B calls for 6, and the sixth slot goes to the next-best Adj Place%: **#3 CHINA WIN (24.9%)**, who misses the must-include bar by 0.1pp, is the market's 4th choice at 8.8, drew a clean gate 4, and comes off a trial in which he "made giant strides late". He beats #9 WINDLORD (21.5%), #12 (18.0%), #11 (17.8%) and #5 (16.0%) on the metric the skill specifies.

**Threshold conflict, resolved and disclosed.** The skill states the must-include bar twice with different numbers: **§4c line 299 says Adj Place% ≥ 25%**, **Important Reminder 8 (line 650) says ≥ 20%**. Under the stricter 25% reading the pool is exactly the six above. Under the looser 20% reading **#9 WINDLORD (21.5%)** would also be compulsory, forcing a 7-horse pool that Mode B does not permit. I follow §4c (the specific pool-construction spec) and take the 6-horse pool, but the 7th-horse variant is priced in the ticket summary so the difference is visible.

**Pace read.** Three confirmed front-runners are declared: **#6 ANOTHER ZONDA** (gate 2, "wire-to-wire" Valley 1,650m winner), **#8 SAMARKAND** (gate 8, "made all" over this course and distance) and **#12 GENERAL REDWOOD** (gate 11, "made all" over this course and distance in April). Three horses that want the lead, two of them drawn outside, over Happy Valley 1,650m, means a **contested tempo** — and the skill's own venue note says HV 1,650m+ carries a **stalker bias**. That is a structural argument for the three horses the model already likes: **#10 FORTUNATE SON** (gate 3, stalker), **#1 DEFINITIVE** (stalker, "ridden handy") and **#4 DO YOUR PART** (gate 5, on-pace). It is the main reason this race is played rather than passed on a 20.5% top ranking. Gate penalty noted but not disqualifying for #1 (gate 10) per rule 15.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: **#10, #1, #8, #4, #6, #3**
MODE: **B — Standard Pool** | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#10 FORTUNATE SON** (Adj Place% 46.9%) ← locked in every combo
腳 (Legs):  **#1, #8, #4, #6, #3**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**

TOP TRIO COMBINATIONS (Plackett-Luce fitted to Adj Place%; all 10 ticket combos listed):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|--------------------|-----------------|----------------|
| 1 | #1, #8, #10 | 2.66% | $376 |
| 2 | #4, #8, #10 | 2.32% | $432 |
| 3 | #6, #8, #10 | 2.26% | $443 |
| 4 | #1, #4, #10 | 2.25% | $444 |
| 5 | #1, #6, #10 | 2.19% | $456 |
| 6 | #4, #6, #10 | 1.91% | $524 |
| 7 | #3, #8, #10 | 1.50% | $666 |
| 8 | #1, #3, #10 | 1.46% | $686 |
| 9 | #3, #4, #10 | 1.27% | $787 |
| 10 | #3, #6, #10 | 1.24% | $809 |

**Ticket coverage: 19.0%** of the adjusted-model probability mass. That is low, and it is low for an honest reason: this race has **no dominant horse** — the top-ranked runner carries only 20.5% Adj Win% and 46.9% Adj Place%, so more than half the model's mass sits outside any banker-anchored ticket. The full-pool C(6,3) = 20 combos would cost **$200** and lift coverage to **31.2%** — a materially better read, at double the price.

**Combinations NOT covered by the 膽拖 (banker misses):** 1-4-8 (1.24%), 1-6-8 (1.20%), 4-6-8 (1.02%), 1-4-6 (1.17%) and the rest of the non-#10 frame. Roughly **12pp** of coverage is being bought away for $100 of saving.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
- The favourite is **#5 VIOLET STAR at 3.9** — short enough to concentrate the public pool, and he is **not in the Strategy A pool at all**. If he fills the frame (and at 3.9 the market says he probably does), the model's top-ranked combinations still need both other slots to come right.
- The three horses carrying the Strategy A ticket — **#10 (17), #1 (16), #8 (13)** — are the **8th, 10th and 5th market choices**. The 1-8-10 frame would pay an enormous Trio dividend; fair-odds estimate is **$376** against a $10 unit, and the actual dividend would very likely exceed that because almost nobody will hold it.
- The MC's undervaluation claims are extreme (**#10 by 215%**, #1 by 119%, #8 by 100%). Extreme edges of this size in an early-morning market with a **23.3% overround** are as often a data artefact as an opportunity.
- Cross-referencing quinellas: every top MC quinella pair contains #10. There is no independent confirmation from a second axis — the model has one idea about this race, repeated five times.

**Verdict:** genuine, large-payoff value **if** the model's read on #10 is sound; a fast and complete loss if the market is right about #5. The banker is a 17-to-1 shot with a 46.9% Adj Place% — well below the ~82% top-3 rate the skill's always-banker rule is calibrated on. Size this as a **speculative ticket, not a conviction bet**.

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 膽拖 (Banker-Leg)
膽 (Banker): **#10 FORTUNATE SON**
腳 (Legs):  #1 DEFINITIVE, #8 SAMARKAND, #4 DO YOUR PART, #6 ANOTHER ZONDA, #3 CHINA WIN
COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $100**

TOP COMBINATIONS (highest value):
  1-8-10 (2.66%) · 4-8-10 (2.32%) · 6-8-10 (2.26%) · 1-4-10 (2.25%) · 1-6-10 (2.19%) · 4-6-10 (1.91%) · 3-8-10 (1.50%)

Priced alternatives (not the recommendation, shown for the threshold conflict above):
| Variant | Structure | Combos | Cost | Coverage |
|---------|-----------|--------|------|----------|
| **Recommended** | 膽拖 1膽 + 5腳 | 10 | **$100** | 19.0% |
| Reminder-8 reading (adds #9 WINDLORD) | 膽拖 1膽 + 6腳 | 15 | $150 | 24.3% |
| Full pool, no banker | C(6,3) | 20 | $200 | 31.2% |

PASS CONDITIONS:
- If **#10 FORTUNATE SON** (banker) is scratched → **VOID the ticket**, do not restructure (rule 10).
- If #8 SAMARKAND is scratched → the ticket loses three of its top seven combinations; drop to a 4-leg 膽拖 (C(4,2) = 6, $60) or pass.
- If the field drops below 3 starters → pool refunded (not a live risk with 12 declared).
- If the going turns **Yielding/Heavy**, the contested-pace read that justifies the stalker-heavy pool weakens and the front-runners #6/#8/#12 become harder to run down — re-check before betting.
- If **#10 drifts materially in late betting** (out past ~25), treat that as the market rejecting the banker and **pass the race** — the whole ticket rests on him.
- If #5 VIOLET STAR shortens further (into ~3.0), the pool will concentrate on a frame this ticket cannot win; consider passing or switching to Strategy B, which does hold #5.

CONFIDENCE: **LOW** — the classification only just cleared the Competitive threshold (20.5% vs a 20.0% bar), the banker is a 17-to-1 shot at 46.9% Adj Place%, ticket coverage is 19%, and the model is in near-total disagreement with the market. There is also an internal model inconsistency (see caveats).

CAVEATS:
1. **Model vs market is at maximum divergence.** The MC ranks the 3.9 favourite **10th** and its own top pick is a 17-1 shot. Favourite bias reads −86.6%. Both readings cannot be right; if the market is, every Strategy A combination is dead.
2. **The banker is weak by the rule's own standard.** Rule 7 justifies always-banker on a ~82% top-3 rate for the #1-ranked horse. #10's Adj Place% is **46.9%** — meaningfully below that, so expected banker failure here is much higher than the rule's base case.
3. **Internal MC inconsistency.** The finish-time projection ranks the field almost opposite to the Win% ranking — it projects **#12 GENERAL REDWOOD fastest** (1:38.15) and **#1 DEFINITIVE slowest** (1:43.52, +5.37s), while the Win% model has #1 third and #12 eighth. Two components of the same simulation disagree sharply. Treat the Win%/Place% output (which drives this report) as the primary, but note the speed-figure module does not corroborate it.
4. **Wide early-morning overround (23.3%)** — odds captured at 09:19 HKT, roughly 9 hours before the off. Every odds-based test (both strategies) should be re-run against live odds before betting; #6 ANOTHER ZONDA sits on the exact Win-odds<10 boundary (HKJC 11 / SCMP 10) and a small move changes nothing today but could on live prices.
5. **Place odds are unusable** in this race — see the header note. Win odds only.
6. **§4c (≥25%) vs Reminder 8 (≥20%) conflict** on the must-include bar; resolved in favour of §4c, with the alternative priced above.
7. **`analyze-race.ts` scraper log emitted `distance=1200m` for R5** before correcting to 1650m in the enriched card and simulation header. The race is confirmed **1650m** by both the HKJC card and SCMP; the simulation and time projection both used 1650m, so the stray log line is cosmetic — but it is a scraper parse bug worth fixing.
8. **Trainer strike rates are near-zero across the board** in the loaded profiles (7 of 12 trainers at 0%), which suggests a thin season sample rather than genuine form — the trainer factor is contributing little signal here.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#10 FORTUNATE SON** (MC Win% 18.5%, MC Place% 44.9%) ← 1st by MC Win%
*(Same banker as Strategy A — the +2 excuses adjustment did not change the top of the order.)*

**Step A — Primary legs (MC Place% > 20%, excluding banker):**
#8 SAMARKAND (40.6%), #1 DEFINITIVE (37.8%), #6 ANOTHER ZONDA (33.4%), #4 DO YOUR PART (31.1%), #3 CHINA WIN (26.9%) → **5 primary legs**
(#9 WINDLORD at 19.5% misses the bar by 0.5pp.)

**Step B — Win-odds replacement / addition:**
- **Replaceable legs** (MC Place% **20–30%** AND Win odds **> 10**): **none.** The only primary leg inside the 20–30% band is **#3 CHINA WIN (26.9%)**, and his Win odds are **8.8**, i.e. *not* > 10 — he is strong on both metrics and is not swappable. Every other primary leg sits above 30%.
- **Win-odds candidates** (MC Place% ≤ 20% AND Win odds < 10), processed in ascending Win-odds order:

| Order | # | Horse | Win Odds | MC Place% | Replaceable leg available? | Action |
|-------|---|-------|----------|-----------|----------------------------|--------|
| 1 | 5 | VIOLET STAR | 3.9 | 14.0% | No | **Added directly** |
| 2 | 2 | SOLID WIN | 6.7 | 12.4% | No | **Added directly** |

(#9 WINDLORD 16, #12 GENERAL REDWOOD 13, #7 KEEFY 16, #11 DREAMING TOGETHER 25 all fail the Win odds < 10 test and are excluded.)

**Action: no replacements — #5 and #2 both added directly (no replaceable leg exists).**

**Final legs (7):** **#8, #1, #6, #4, #3, #5, #2**
BET STRUCTURE: 膽拖 | 1膽 + **7腳** | COMBINATIONS: C(7,2) = **21**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $210**

STRATEGY B TICKET — all 21 combinations (Plackett-Luce fitted to raw MC Place%):

| # | Combo | MC Prob | Fair odds | | # | Combo | MC Prob | Fair odds |
|---|-------|---------|-----------|-|---|-------|---------|-----------|
| 1 | 1-8-10 | 2.93% | $341 | | 12 | 1-5-10 | 0.79% | $1,260 |
| 2 | 6-8-10 | 2.47% | $404 | | 13 | 2-8-10 | 0.77% | $1,297 |
| 3 | 4-8-10 | 2.25% | $444 | | 14 | 1-2-10 | 0.69% | $1,439 |
| 4 | 1-6-10 | 2.23% | $449 | | 15 | 5-6-10 | 0.67% | $1,495 |
| 5 | 1-4-10 | 2.03% | $493 | | 16 | 4-5-10 | 0.61% | $1,643 |
| 6 | 3-8-10 | 1.87% | $534 | | 17 | 2-6-10 | 0.59% | $1,707 |
| 7 | 4-6-10 | 1.71% | $584 | | 18 | 2-4-10 | 0.53% | $1,876 |
| 8 | 1-3-10 | 1.69% | $592 | | 19 | 3-5-10 | 0.51% | $1,974 |
| 9 | 3-6-10 | 1.42% | $702 | | 20 | 2-3-10 | 0.44% | $2,254 |
| 10 | 3-4-10 | 1.30% | $772 | | 21 | 2-5-10 | 0.21% | $4,800 |
| 11 | 5-8-10 | 0.88% | $1,136 | | | | | |

**Ticket coverage: 26.6%** of the raw-MC probability mass.

**Strategy A vs Strategy B — comparison.** Same banker (#10), same core five legs. Strategy B is **$110 more expensive** ($210 vs $100) for **+7.6pp of coverage** (26.6% vs 19.0%), and the entire difference is the two horses added by the Win-odds rule: **#5 VIOLET STAR (3.9, the outright favourite)** and **#2 SOLID WIN (6.7, third favourite)**. This is precisely the scenario the Step-B rule was written for — Strategy A's adjusted ranking pushes the two shortest-priced runners in the race out of the pool, and the raw-MC branch buys them back on market evidence. Given how far the MC has strayed from this market (favourite bias −86.6%), **Strategy B is the better-hedged ticket of the two here**, and the six #5/#2 combinations it adds are the only ones on either ticket that survive a market-is-right scenario. Strategy A is the higher-variance, higher-payoff expression of the same view.

═══════════════════════════════════════════════════════════
