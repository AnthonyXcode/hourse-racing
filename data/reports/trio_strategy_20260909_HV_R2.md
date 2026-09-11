═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-09-09 | Race 2
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --form-data all`, HV+ST form) — 2,251 historical races, 2,311 indexed performances, 10/10 horses form-enriched
HISTORICAL SYNC: ⏭️ not re-run this session (already synced per operator instruction). Latest results files on disk run through **2026-09-06 ST**, i.e. the immediately preceding meeting — form base is current.
SCMP DATA: ✅ Loaded — Win/Place odds, Star Form, TIR and Vet lines parsed for all 10 runners (trackwork notes for #6 and #7 only)
ODDS SOURCE: HKJC early-morning pool (`fetch-odds.ts`, captured **09:19 HKT 09-Sep**) — full 10-horse coverage
             SCMP odds: ✅ loaded (cross-check) | HKJC live: ❌ not open at capture time

RACE: R2 KWUN TONG HANDICAP — Class 4 | 1650m | Turf | Good | 10 runners
CLASSIFICATION: **Dominant** (top Adj Win% 44.5%) | POOL SIZE: 5
MODE: **A — Tight Pool (5)**
BET STRUCTURE: 膽拖 1膽 + 4腳 → C(4,2) = **6**
UNIT BET: $10 per combination (fixed)

> **Distance note:** the scraper log line printed `distance=1200m`, but the saved race card (`data/racecards/racecard_20260909_HV_R2.json`), the analyzer header and the SCMP card (which repeatedly references "Valley 1,650m" form) all say **1650m**. 1650m is correct; the log line is a misparse and did not affect the simulation.

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

Two flags: **Place%>20%** — ✅ if MC Place% > 20%; **Win odds<10** — ✅ if HKJC Win odds < 10. Strategy B primary legs = Place%>20% ✅.

| #  | Horse           | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B)              | Top Quinella (fair odds) |
|----|-----------------|---------|-----------|----------|------------|-------------|---------------|--------------------------------|--------------------------|
| 1  | MIGHTY STEED    | 45.5%   | 79.2%     | 4.6      | ✅          | ✅           | 7/2/12/2/2/5  | ★ 膽 (Banker)                  | 1-6: 17.9% (5.6)         |
| 6  | THE AZURE       | 15.6%   | 48.8%     | 17       | ✅          | ❌           | 6/6/1/8/6/7   | 腳 (Leg)                       | 1-6: 17.9% (5.6)         |
| 3  | STURDY RUBY     | 11.3%   | 42.1%     | 9.9      | ✅          | ✅           | 5/2/8/10/9/10 | 腳 (Leg)                       | 1-3: 13.8% (7.2)         |
| 7  | FIREFOOT        | 9.9%    | 38.0%     | 6.9      | ✅          | ✅           | 5/2/1/2/2/4   | 腳 (Leg)                       | 1-7: 11.6% (8.6)         |
| 4  | CASA ROCHESTER  | 8.3%    | 34.7%     | 8.5      | ✅          | ✅           | 4/4/6/6/5/3   | 腳 (Leg)                       | 1-4: 10.0% (10.0)        |
| 9  | PRECISION HOPE  | 3.9%    | 19.8%     | 2.8      | ❌          | ✅           | 3/2/4/9/8/5   | 腳 (Leg — added directly)      | 1-9: 5.1% (19.5)         |
| 5  | DECISION LINK   | 2.2%    | 14.6%     | 16       | ❌          | ❌           | 12/4/1/6/2/1  | —                              | —                        |
| 8  | FRANCIS MEYNELL | 2.0%    | 13.3%     | 13       | ❌          | ❌           | 9/6/2/8/2/4   | —                              | —                        |
| 2  | CALIFORNIA MOXIE| 0.9%    | 6.3%      | 16       | ❌          | ❌           | 7/7/7/4/10/6  | —                              | —                        |
| 10 | CIRCUIT CENTURY | 0.4%    | 3.3%      | 32       | ❌          | ❌           | 10/12/9/11/11 | —                              | —                        |

**Market:** Overround 23.0%. Favourite bias **+10.2%**, longshot bias **−86.2%** — the market is compressed at the top and the model thinks it is far too compressed.
Model flags **#6 THE AZURE undervalued by 166%** and **#1 MIGHTY STEED by 109%**; **#9 PRECISION HOPE overvalued by 89%**.

The single defining disagreement: **#9 PRECISION HOPE is the 2.8 favourite but only MC's 6th pick** (3.9% win / 19.8% place), while **#1 MIGHTY STEED — MC's runaway top pick at 45.5% win — is the market's second choice at 4.6**. Model and market agree #1 is near the top; they disagree violently about #9. Strategy A drops #9; Strategy B keeps it (the Win-odds rule fires). That is the whole A/B story this race.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 1 | MIGHTY STEED | 45.5% | 79.2% | +form +1, -notRO −2 | +form +1, -notRO −2 | **44.5%** | **78.2%** | 4.6 | Z Purton | 4 | Stalker | +form (well-executed Valley 1,650m win off a second), −notRO (eased near the 100M) | ★ 膽 (Banker) |
| 2 | 6 | THE AZURE | 15.6% | 48.8% | trial +2 | trial +2 | 17.6% | 50.8% | 17 | A Atzeni | 3 | Closer | +trial ("has since trialled fine") | 腳 (Leg) |
| 3 | 3 | STURDY RUBY | 11.3% | 42.1% | excuses +2 | excuses +2 | 13.3% | 44.1% | 9.9 | C Y Ho | 7 | Stalker | +excuses (bumped shortly after start, disadvantaged early) | 腳 (Leg) |
| 4 | 7 | FIREFOOT | 9.9% | 38.0% | +form +1, trial +2 | +form +1, trial +2 | 12.9% | 41.0% | 6.9 | K Teetan | 1 | Front | +trial (gate-to-wire ST dirt trial, "clearly in great nick"), +form (rallied for second) | 腳 (Leg) |
| 5 | 4 | CASA ROCHESTER | 8.3% | 34.7% | 0 | 0 | 8.3% | 34.7% | 8.5 | C L Chau (-2) | 5 | — | — (shifted out and bumped a rival — caused it, not a victim) | 腳 (Leg) |
| 6 | 9 | PRECISION HOPE | 3.9% | 19.8% | +form +1, excuses +2 | +form +1, excuses +2 | 6.9% | 22.8% | 2.8 | A Badel | 2 | Stalk/Close | +excuses (wide, no cover, majority of the race), +form (rallied for second two runs ago) | out (see caveat 1) |
| 7 | 5 | DECISION LINK | 2.2% | 14.6% | excuses +2 | excuses +2 | 4.2% | 16.6% | 16 | E C W Wong (-3) | 9 | Closer | +excuses (bumped at start, raced wide without cover) | out |
| 8 | 2 | CALIFORNIA MOXIE | 0.9% | 6.3% | excuses +2 | excuses +2 | 2.9% | 8.3% | 16 | B Avdulla | 10 | — | +excuses (steadied when disappointed for clear running) | out |
| 9 | 8 | FRANCIS MEYNELL | 2.0% | 13.3% | 0 | 0 | 2.0% | 13.3% | 13 | R Kingscote | 6 | Front | — (pressured on the lead — race pattern, not interference) | out |
| 10 | 10 | CIRCUIT CENTURY | 0.4% | 3.3% | -injury30d −3 | -injury30d −4 | 0.0% | 0.0% | 32 | H T Mo (-2) | 8 | Stalker | −injury30d (substantial blood in trachea, passed vet 18/08/2026 — 22 days out) | out |

**Factor legend:** `+form +1` = improving/rallied/made-all in the recent line; `trial +2` = positive trackwork/trial note; `excuses +2` = TIR bad-luck bounce (crowded / steadied / wide without cover / bumped and disadvantaged); `-notRO −2` = not ridden out; `-injury30d −3 Win / −4 Place` = vet clearance inside 30 days. No `+draw` (no Star Form comment on this card says a gate helps), no `-perf` (no stewards' "unacceptable performance"), no repeat "bumped on jumping" across ≥2 runs, and **no horse is 8yo or above** (oldest = #3 STURDY RUBY, 7). All adjustments inside the ±8% Win / ±10% Place cap. #10's Place% floors at 0.0% (3.3 − 4).

**Reasoning:**
- **#1 MIGHTY STEED (膽)** — MC's dominant pick on both metrics (45.5% win, 79.2% place) and the model's second-largest value flag (+109%). 10 starts, banker-eligible. Form line 7/2/12/**2/2**/5 with two Valley 1,650m seconds; Purton stays on. The −2 for being eased near the 100M last time is the only blemish and does not move it off top rank. At **4.6** it is the market's second choice, so this is that comparatively rare ticket where model and market broadly agree on the anchor.
- **#6 THE AZURE (17)** — the pool's value horse. MC's biggest undervaluation flag (+166%) at a 17 price, Atzeni up, gate 3, and SCMP notes it has "since trialled fine". Closer profile suits HV 1,650m (skill's stalker/closer bias at this trip).
- **#3 STURDY RUBY (9.9)** — 42.1% raw Place%, previous Valley 1,650m winner, and a clean TIR excuse (bumped shortly after the start and disadvantaged early). Gate 7 is neutral.
- **#7 FIREFOOT (6.9)** — the best-supported form line in the race (5/**2/1/2/2**/4), **gate 1**, and the strongest trackwork note on the card (gate-to-wire dirt trial, "clearly in great nick"). Front-runner from the inside gate at HV is the pace-scenario play.
- **#4 CASA ROCHESTER (8.5)** — takes the fifth slot on Adj Place% (34.7%) with a placing last start and gate 5. No SCMP adjustment either way.
- **Pace read:** #7 FIREFOOT (gate 1) and #8 FRANCIS MEYNELL (gate 6, blinkers, asked to lead last time) are the only confirmed on-pace types, so #7 should get a soft lead from the rail. That favours the pool's stalkers (#1 from gate 4, #3) and gives #6's closing kick a target. #2 (gate 10) and #5 (gate 9) are drawn out and are the two the model likes least anyway.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #1, #6, #3, #7, #4
MODE: A (Tight Pool) | POOL SIZE: 5

Must-include check (Adj Place% ≥ 25%): **#1 (78.2), #6 (50.8), #3 (44.1), #7 (41.0), #4 (34.7)** — exactly five horses clear the bar, and they are exactly the Mode A pool. No conflict between the must-include rule and the mode's pool size.

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): **#1 MIGHTY STEED** (Adj Place% 78.2%, 10 career starts → banker-eligible) ← locked in every combo
腳 (Legs):  #6, #3, #7, #4
BET STRUCTURE: 膽拖 | 1膽 + 4腳 | COMBINATIONS: C(4,2) = **6**

雙膽拖 check: 2nd-ranked #6 THE AZURE Adj Place% = 50.8% < 63% → **1 banker only**.

TOP TRIO COMBINATIONS (Plackett-Luce over Adj Win%, 300k draws):
| Rank | Horses (any order) | Combined Place% | Est. Fair Odds |
|------|--------------------|-----------------|----------------|
| 1 | #1, #3, #6 | 11.18% | $9  |
| 2 | #1, #6, #7 | 10.73% | $9  |
| 3 | #1, #3, #7 | 7.59%  | $13 |
| 4 | #1, #4, #6 | 6.53%  | $15 |
| 5 | #1, #3, #4 | 4.69%  | $21 |

───────────────────────────────────────────────────────────
TICKET SUMMARY — Strategy A
───────────────────────────────────────────────────────────
COMBINATIONS: **6** (膽拖: C(4,2), legs = 4)
UNIT BET: $10 (fixed)
TOTAL STAKE: **$60**
MODELLED COVERAGE: **45.3%** (vs 50.4% for the full C(5,3)=10 ticket at $100 — 40% cheaper for 90% of the coverage)
Banker top-3 probability (Plackett-Luce on Adj Win%): **83.1%** (MC raw Place% for #1: 79.2%)

FULL TICKET (all 6 combos, ranked by modelled probability):
| Combo | Prob | Fair odds |
|-------|------|-----------|
| 1-3-6 | 11.18% | $9  |
| 1-6-7 | 10.73% | $9  |
| 1-3-7 | 7.59%  | $13 |
| 1-4-6 | 6.53%  | $15 |
| 1-3-4 | 4.69%  | $21 |
| 1-4-7 | 4.55%  | $22 |

HKJC BET SLIP: Race 2 → Trio (單T) → 膽拖 → 膽: **1** | 腳: **3, 4, 6, 7** | $10/combo

PASS CONDITIONS:
- **#1 MIGHTY STEED scratched → VOID the ticket** (do not restructure; rule 10).
- Any 2 of #6 / #3 / #7 / #4 scratched → pass the race.
- Field drops below 3 starters → pool refunded automatically.
- Going changes to Yielding/Heavy → re-run MC (#5 DECISION LINK is the card's proven wet-track winner and is currently outside both pools).
- **If #1 drifts out past ~8 while #9 shortens further, treat the model's edge as unsupported and consider passing or falling back to Strategy B**, which carries #9.

CONFIDENCE: **MEDIUM**

CAVEATS:
1. **The market favourite is not in the Strategy A pool.** #9 PRECISION HOPE (2.8, Badel) finishes 6th on Adj Win% with Adj Place% **22.8%**, just under the 25% must-include bar, so Mode A's five-horse pool excludes it. This is a *numerical* cut, not a narrative or vet exclusion, so rules 8/9 (no narrative demotion, no hard exclusion at odds ≤ 15) are not violated — same treatment the 06-Sep R2 report gave the favourite there. **It is still the biggest risk in the ticket.** Note the skill is internally inconsistent on the threshold (§4c says ≥25%, Important Reminder 8 says ≥20%); on the 20% reading #9 would be a mandatory pool member. Strategy B includes it, which is the natural hedge.
2. **Model/market gap on #9 is large.** MC has it 3.9% win versus an implied ~30%+ from a 2.8 price; the analyzer explicitly flags it "overvalued by 89%". Either the model is missing something (Valley 1,650m course-and-distance specialist — SCMP: "filled the frame in his past three of five Valley 1,650m runs") or the market is. Its form line 3/2/4/9/8/5 is genuinely patchy, but 2.8 favourites do not usually run 6th on merit.
3. **Jockey/trainer data is thin — early season.** Only **7 jockey profiles** loaded for 10 runners; #4's C L Chau, #8's R Kingscote and #10's H T Mo all show **0 rides**. Sample sizes on the others are tiny (Purton 20% from 10 rides, Atzeni 29% from 7). Trainer records similarly small (Lor 0/4, Man 0/10).
4. **The finish-time projection is unusable for this race** and was ignored. It puts #10 CIRCUIT CENTURY (MC's last horse, 0.4% win) fastest and #1 MIGHTY STEED **9th of 10**, exactly inverting the win ranking — speed-figure noise, same failure mode as the 06-Sep R2 card. Selection came from the win/place distribution only.
5. **SCMP place-odds column looks corrupted.** SCMP reports place odds equal or nearly equal to win odds for most runners (#2 win 16 / place 17, #5 win 16 / place 17, #6 win 16 / place 17). That is implausible; **HKJC place odds were used** (#1 1.7, #9 1.4, #7 2.0, #3 2.2, #4 2.7, #6 4.9). SCMP *win* odds cross-check cleanly against HKJC (#1 5.1 vs 4.6, #9 3.0 vs 2.8, #7 6.8 vs 6.9, #3 8.9 vs 9.9, #4 8.1 vs 8.5) and the <10 / >10 classification is identical on both sources, so no Strategy B leg changes.
6. **Historical sync was not re-run this session** (per operator instruction). Verified indirectly: `data/historical/` contains results through the immediately preceding 2026-09-06 ST meeting, and the MC loaded 2,251 races with 10/10 horses form-enriched, so no runner is missing recent form.
7. **#10 CIRCUIT CENTURY has only 5 form lines** and carries a sub-30-day vet clearance; it is bottom-ranked on both raw and adjusted numbers and appears in neither pool. No impact on the ticket.
8. **Early-morning pool, 23.0% overround.** Odds captured 09:19 HKT; re-check prices near the jump, particularly the #1 / #9 spread.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: **#1 MIGHTY STEED** (MC Win% 45.5%, MC Place% 79.2%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): **#6** (48.8%), **#3** (42.1%), **#7** (38.0%), **#4** (34.7%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): **none** — no primary leg sits in the 20–30% band (the four legs are 48.8 / 42.1 / 38.0 / 34.7, all above 30%).
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): **#9 PRECISION HOPE** (odds 2.8, MC Place% 19.8%) — the only candidate; #5 (16), #8 (13), #2 (16) and #10 (32) all fail the odds test.
Action: **#9 added directly as an extra leg** — no replaceable leg exists, so the addition path applies (not a swap).
Final legs: **#6, #3, #7, #4, #9**
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10**
UNIT BET: $10 (fixed)
TOTAL STAKE: **$100**
MODELLED COVERAGE: **69.7%** (raw-MC Plackett-Luce, 300k draws; banker top-3 88.5%)

STRATEGY B TICKET:
| Combo | Prob | Fair odds | | Combo | Prob | Fair odds |
|-------|------|-----------|-|-------|------|-----------|
| 1-3-6 | 14.37% | $7  | | 1-4-7 | 5.82% | $17 |
| 1-6-7 | 12.24% | $8  | | 1-6-9 | 4.46% | $22 |
| 1-4-6 | 10.00% | $10 | | 1-3-9 | 3.03% | $33 |
| 1-3-7 | 8.35%  | $12 | | 1-7-9 | 2.55% | $39 |
| 1-3-4 | 6.80%  | $15 | | 1-4-9 | 2.11% | $47 |

HKJC BET SLIP: Race 2 → Trio (單T) → 膽拖 → 膽: **1** | 腳: **3, 4, 6, 7, 9** | $10/combo

**A vs B comparison — B is the better ticket this week.**

Same banker (#1 tops both MC Win% and Adj Win%) and the same top three combos in the same order (1-3-6, 1-6-7, then 1-4-6 / 1-3-7). The only structural difference is **one leg: #9 PRECISION HOPE**, and for once the Win-odds rule adds rather than subtracts. Because no primary leg sat in the 20–30% band, the rule could not force the usual value-destroying 1-for-1 swap — it simply appended the 2.8 favourite. Strategy B therefore covers **69.7% for $100** against Strategy A's **45.3% for $60**: +24.4 points of coverage for +$40, an incremental cost of about $1.64 per point versus Strategy A's $1.32. Slightly worse per point, but it buys insurance against the single largest failure mode in the race — the market favourite filling the frame while Strategy A's ticket has no ticket for it (#9 alone accounts for 12.2 points of that extra coverage).

Strategy A is the correct play if you trust the model's 89% overvaluation call on #9. **If you do not — and a 2.8 favourite with three placings from five Valley 1,650m runs is a hard horse to leave out — Strategy B at $100 is the more robust ticket.** Both stand or fall on #1 MIGHTY STEED making the frame (83–89% modelled); if the 膽 fails, every combination in both tickets loses.

Middle option, if bankroll allows: take Strategy A's six combos and add the four #9 combos separately (1-6-9, 1-3-9, 1-7-9, 1-4-9) — that is Strategy B exactly, for the same $100.
═══════════════════════════════════════════════════════════
