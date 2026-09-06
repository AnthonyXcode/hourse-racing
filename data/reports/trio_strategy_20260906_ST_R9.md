═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-06 | Race 9
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations — good reliability (r = +0.631)
HISTORICAL SYNC: ✅ 218/219 fixtures scraped
SCMP DATA: ✅ Loaded — Star Form + TIR + Vet + trackwork. **SCMP place odds corrupt for the fourth race running** (see caveats).
ODDS SOURCE: HKJC pool re-fetched race morning (`fetch-odds.ts`, **01:27 HKT 06-Sep**), full 11-horse coverage.

RACE: R9 COTTON TREE HANDICAP — **Class 3** | 1400m | Turf | Good | 11 runners | 5:20pm
CLASSIFICATION: Competitive (top Adj Win% 25.0%) | POOL SIZE: 6
MODE: B — Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 → C(5,2) = 10 | UNIT BET: $10

## ►► RECOMMENDATION: **PLAY — banker #4 AEROINVINCIBLE, not #1. $100 or $150.** Confidence MEDIUM ◄◄

This is the strongest race of the meeting, and the banker override costs almost nothing. See below.

───────────────────────────────────────────────────────────
THE BANKER IS A COIN FLIP THE MODEL CANNOT CALL
───────────────────────────────────────────────────────────
The skill picks the 膽 by Adj Win%. Here the top two are effectively tied:

| # | Horse | Adj Win% | Adj Place% | Win odds | Place odds | Off.Rtg |
|---|-------|----------|------------|----------|------------|---------|
| **1** | **LUCKY SAM GOR** | **25.0%** | **59.9%** | 11 | 2.6 | 79 |
| **4** | **AEROINVINCIBLE** | **24.3%** | **59.9%** | **5.9** | **1.7** | 75 |

**Identical Adj Place%. 0.7pp apart on Adj Win%** — inside simulation noise on 10,000 iterations. The model is indifferent. The market is not: #4 is 5.9 with a place price of 1.7; #1 is 11 with 2.6.

Because the model cannot separate them, using the market to break the tie is not an override of the model — it is filling in where the model has nothing to say. And it is nearly free:

| Ticket | Combos | Stake | MC-Adj | **Market** | Market % per $100 |
|---|---|---|---|---|---|
| Strategy A (skill) — 膽 **#1** + 腳 2,4,5,6,9 | 10 | $100 | 47.4% | 18.9% | 18.9 |
| **A′ banker swap — 膽 #4 + 腳 1,2,5,6,9** | 10 | $100 | **46.7%** | **26.8%** | **26.8** |
| Strategy B (skill) — 膽 **#1** + 腳 2,4,5,6,8,9 | 15 | $150 | 54.9% | 22.8% | 15.2 |
| **B′ banker swap — 膽 #4 + 腳 1,2,5,6,8,9** | 15 | $150 | **54.2%** | **33.2%** | 22.2 |

**Swapping the banker costs 0.7pp of MC-Adj coverage and buys 7.9pp of market coverage.** Both bankers keep the other horse as a leg, so nothing is given up on the model's view of the race. That is a far cleaner case than R6 or R7, where the swap required sacrificing 15–25pp of model coverage.

**Why the market prefers #4:** form `2/1/4/1/1/2` — three wins and three placings in six, with **back-to-back 1400m wins**, off gate 2 and a −2 weight allowance. **#1 LUCKY SAM GOR's** recent good form is all at **1600m** (2nd, 1st, 7th, 5th); its last 1400m run was a 4th in March. It carries top weight (135lb, +4) off the field's highest rating (79) and drops in trip. The MC does not appear to price the distance change.

───────────────────────────────────────────────────────────
MODEL NOTE
───────────────────────────────────────────────────────────
| Race | Pearson r (MC vs official rating) |
|---|---|
| R4 | +0.195 | R5 +0.249 | R6 +0.581 | R7 **+0.713** | R8 +0.431 |
| **R9** | **+0.631** |

Second-best of the meeting. The field is Class 3-dominated with no Class 5 form anywhere, so the class-drop bias that wrecked R3 and R4 has nothing to act on.

The main remaining disagreement is **#5 BABY SAKURA**: market top-3 **63.4%** (the highest single figure of the meeting) against MC's 37.4%, a +26.0pp gap. It is the 2.7 favourite, a **4-year-old rated 75 and rising +7**, form `1/4/1/3/3/1`, drawn 1, and it **won its latest Sha Tin dirt trial** ("glided through the mud"). The market is backing a progressive young horse; the MC, working off six starts, rates it fifth. On a rapidly-improving 4yo I would side with the market — which is why #5 is a leg on every ticket below, and why the #5-bankered line scores best of all on market coverage (32.7%).

The finish-time projection is inverted again — it ranks #9 YUEN LONG ELITE (form 8/9/12/9/8/5, 21 in the market) fastest and puts #1 21.8 lengths back — and was ignored, as in R3–R8.

───────────────────────────────────────────────────────────
MC SIMULATION (raw)
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Off.Rtg | Age | Draw | Starts | Days off | Form (last 6) | Role (Strategy B) | Top Quinella (fair) |
|---|-------|---------|-----------|----------|------------|-------------|---------|-----|------|--------|----------|---------------|-------------------|---------------------|
| 1  | LUCKY SAM GOR    | 24.0% | 58.9% | 11  | ✅ | ❌ | **79** | 5 | 6  | 10 | 56  | 2/1/7/5/4/13   | ★ 膽 (Banker) | 1-4: 13.2% (7.6) |
| 4  | AEROINVINCIBLE   | 23.3% | 58.9% | 5.9 | ✅ | ✅ | 75 | 6 | 2  | 10 | 71  | 2/1/4/1/1/2    | 腳 (Leg) | 1-6: 9.5% (10.5) |
| 6  | CIRCUIT CHAMPION | 16.7% | 48.9% | 3.6 | ✅ | ✅ | 73 | 5 | 10 | 5  | 71  | 3/3/1/1/2      | 腳 (Leg) | 4-6: 9.4% (10.6) |
| 2  | THE RED HARE     | 11.9% | 38.5% | 15  | ✅ | ❌ | 77 | 5 | 7  | 10 | 56  | 7/3/1/11/3/3   | 腳 (Leg) | 1-2: 6.7% (14.8) |
| 5  | BABY SAKURA      | 10.8% | 37.4% | **2.7** | ✅ | ✅ | 75 | 4 | 1  | 6  | 85 | 1/4/1/3/3/1 | 腳 (Leg) | 4-5: 6.3% (15.9) |
| 9  | YUEN LONG ELITE  | 5.7%  | 22.2% | 21  | ✅ | ❌ | 67 | 6 | 5  | 10 | 67  | 8/9/12/9/8/5   | 腳 (Leg) | — |
| 8  | FLYING FORTRESS  | 5.2%  | 21.1% | 13  | ✅ | ❌ | 67 | 6 | 4  | 10 | 56  | 6/5/6/6/10/7   | 腳 (Leg) | — |
| 10 | TITANCK          | 1.6%  | 8.7%  | 37  | ❌ | ❌ | 64 | 3 | 3  | **0 — DEBUTANT** | — | — | — | — |
| 3  | POCKETING        | 0.5%  | 3.5%  | 26  | ❌ | ❌ | 76 | 5 | 11 | 5  | 60  | 4/7/10/9/7     | — | — |
| 7  | BEAUTY CRESCENT  | 0.3%  | 1.9%  | 31  | ❌ | ❌ | 72 | 6 | 8  | 10 | 85  | 14/14/14/14/9/13| — | — |
| 11 | EXCELLENCE VALUE | 0.0%  | 0.1%  | 37  | ❌ | ❌ | 61 | 6 | 9  | 10 | **137** | 12/13/9/11/14/10 | — | — |

**Market:** overround 21.4% (lowest of the meeting), favourite bias −55.3%, longshot bias −59.5%. Market frame order: **#5 BABY SAKURA 63.4%**, #4 AEROINVINCIBLE 48.5%, #6 CIRCUIT CHAMPION 48.5%, #1 LUCKY SAM GOR 31.7%, #2 THE RED HARE 25.7%.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|------------|------|
| 1 | 1 | LUCKY SAM GOR | 24.0% | 58.9% | +form +1 | +form +1 | **25.0%** | **59.9%** | 11 | H Bowman | 6 | +form (5th win from 13, head bob over 1600m) | ★ 膽 (Banker) |
| 2 | 4 | AEROINVINCIBLE | 23.3% | 58.9% | +form +1 | +form +1 | 24.3% | **59.9%** | 5.9 | A Atzeni | 2 | +form (back-to-back 1400m wins) | 腳 (Leg) |
| 3 | 6 | CIRCUIT CHAMPION | 16.7% | 48.9% | +form +1, excuses +2 | (same) | 19.7% | 51.9% | 3.6 | Z Purton | 10 | +form (mowed down Ka Ying Attack, b2b wins); +excuses (crowded after start) | 腳 (Leg) |
| 4 | 5 | BABY SAKURA | 10.8% | 37.4% | +form +1, trial +2 | (same) | 13.8% | 40.4% | **2.7** | C Y Ho | 1 | +form (easily won up in grade); **+trial (won latest ST dirt trial)** | 腳 (Leg) |
| 5 | 2 | THE RED HARE | 11.9% | 38.5% | 0 | 0 | 11.9% | 38.5% | 15 | M F Poon | 7 | TIR self-inflicted (shifted out on jumping) | 腳 (Leg) |
| 6 | 9 | YUEN LONG ELITE | 5.7% | 22.2% | 0 | 0 | 5.7% | 22.2% | 21 | M L Yeung | 5 | bone injury Dec (>30d, no code); slow to begin | 腳 (Leg) |
| 7 | 8 | FLYING FORTRESS | 5.2% | 21.1% | 0 | 0 | 5.2% | 21.1% | 13 | H Bentley | 4 | past 1400m winner off 69 (not recent) | out |
| 8 | 3 | POCKETING | 0.5% | 3.5% | excuses +2 | excuses +2 | 2.5% | 5.5% | 26 | B Avdulla | 11 | +excuses (wide barrier, shifted across) | out |
| 9 | 10 | TITANCK | 1.6% | 8.7% | 0 | 0 | 1.6% | 8.7% | 37 | M Chadwick | 3 | DEBUTANT; gelded June; "hasn't shown much in six trials" — no +trial | out |
| 10 | 7 | BEAUTY CRESCENT | 0.3% | 1.9% | 0 | 0 | 0.3% | 1.9% | 31 | Y L Chung (-2) | 8 | "made all" reference is to last term, not a recent run | out |
| 11 | 11 | EXCELLENCE VALUE | 0.0% | 0.1% | -perf −2 | -perf −2 | 0.0% | 0.0% | 37 | P N Wong (-7) | 9 | **−perf (unacceptable performance 22/04, cleared 25/08)**; 137 days off | out |

**Factor legend:** `+form +1`, `+trial +2`, `excuses +2`, `-perf −2`. Negatives floored at 0.0%. No caps hit.

**`-injury30d` not applied to #11 EXCELLENCE VALUE.** Its clearance is dated 25/08 — 12 days out — but the entry reads *"Unacceptable performance on 22/04/2026; passed vet exam 25/08/2026"*, a stewards' performance order rather than an injury. Same treatment as R7's #7 VICTORY SKY. It takes `-perf −2` only, and is nowhere near the pool either way.

**`-injury30d` not applied to #9 YUEN LONG ELITE** — "Returned off bone injury in December" is far outside the 30-day window and carries no recent clearance date.

**`-age` not applicable** — no runner is 8yo or above (oldest are 6).

**Self-inflicted incidents withheld from `+excuses`**, consistent with R6–R8: #2 ("shifted out on jumping and bumped runner"), #9 ("slow to begin"). **#1's line was also not credited** — "bumped at start, eased and shifted out at 300m" is a single-occurrence barrier note, below the ≥2 threshold for `-barrier` and not one of the skill's `+excuses` triggers. Crediting it would have widened #1's lead over #4 and entrenched the banker choice this report is questioning.

**#10 TITANCK is a debutant** (0 starts) — banker-ineligible under rule 17, and its trial line is explicitly negative ("hasn't shown much in six trials"), so no `+trial`. Same treatment as R6's #6 BLAZING METEOR, and the opposite of R5's #3 CAVA PIONEER, which won four of seven trials.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — Strategy A
───────────────────────────────────────────────────────────
POOL: #1, #4, #6, #5, #2, #9 | MODE: B | POOL SIZE: 6
Must-include (Adj Place% ≥ 25%): #1 (59.9), #4 (59.9), #6 (51.9), #5 (40.4), #2 (38.5) — five in ✅, #9 (22.2) takes the 6th slot. **No Mode conflict.**

膽 (Banker): **#1 LUCKY SAM GOR** (Adj Place% 59.9%) — 10 starts, eligible
腳 (Legs): #2, #4, #5, #6, #9
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = **10** | TOTAL STAKE: **$100**
COVERAGE: MC-Adj **47.4%** | raw MC 50.9% | **Market 18.9%** — the best market coverage any skill ticket has produced this meeting.

**雙膽拖 near-miss:** 2nd-ranked #4 has Adj Place% **59.9%** against the 63% threshold — short by 3.1pp. Given #1 and #4 are tied on Adj Place% and 0.7pp apart on Adj Win%, this is the race where a 2-banker structure looks most natural, and the rule declines it. For the record, 雙膽拖 2膽(#1,#4) + 4腳 = 4 combos, $40, MC-Adj 28.7% but **market only 9.1%** — locking in both means both must place, and the market gives that combination poor odds. Correctly declined.

| Combo | MC-Adj | Fair | **Market** | Market fair |
|-------|--------|------|------------|-------------|
| 1-4-6 | 11.72% | $9  | 2.70% | $37  |
| 1-4-5 | 7.62%  | $13 | 4.64% | $22  |
| 1-2-4 | 6.46%  | $15 | 1.16% | $86  |
| 1-5-6 | 5.87%  | $17 | 4.72% | $21  |
| 1-2-6 | 4.91%  | $20 | 1.13% | $88  |
| 1-2-5 | 3.17%  | $32 | 1.97% | $51  |
| 1-4-9 | 2.89%  | $35 | 0.62% | $161 |
| 1-6-9 | 2.18%  | $46 | 0.63% | $158 |
| 1-5-9 | 1.41%  | $71 | 1.08% | $93  |
| 1-2-9 | 1.19%  | $84 | 0.27% | $377 |

HKJC BET SLIP: Race 9 → Trio → 膽拖 → 膽: 1 | 腳: 2, 4, 5, 6, 9 | $10/combo

───────────────────────────────────────────────────────────
STRATEGY B (MC-only)
───────────────────────────────────────────────────────────
Banker: **#1 LUCKY SAM GOR** (MC Win% 24.0%, MC Place% 58.9%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #4 (58.9%), #6 (48.9%), #2 (38.5%), #5 (37.4%), #9 (22.2%), #8 (21.1%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #9 (22.2%, odds 21) and #8 (21.1%, odds 13) both qualify
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): **none** — every runner below 20% MC Place% is priced 26 or longer (#3 at 26, #7 at 31, #10 and #11 at 37)
Action: **no candidates, so no replacements fire.** The replaceable legs simply stay.
Final legs: **#2, #4, #5, #6, #8, #9**
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = **15** | TOTAL STAKE: **$150**
COVERAGE: MC-Adj **54.9%** | raw MC 59.8% | **Market 22.8%**

HKJC BET SLIP: Race 9 → Trio → 膽拖 → 膽: 1 | 腳: 2, 4, 5, 6, 8, 9 | $10/combo

**A vs B comparison:** B is A plus **#8 FLYING FORTRESS**, the only difference — the Win-odds machinery is inert here because no short-priced horse falls below the 20% MC Place% line. B buys 7.5pp of MC-Adj and 3.9pp of market coverage for $50. On efficiency A wins (18.9 vs 15.2 market-% per $100); on absolute coverage B wins. Neither is the best available ticket — see below.

───────────────────────────────────────────────────────────
RECOMMENDED TICKETS
───────────────────────────────────────────────────────────
**$100 — A′:** 膽 **#4 AEROINVINCIBLE** + 腳 **#1, #2, #5, #6, #9** → C(5,2) = **10 combos** | MC-Adj 46.7% | **Market 26.8%**

| Combo | Market | Fair | MC-Adj |
|-------|--------|------|--------|
| 4-5-6 | **8.42%** | $12  | 5.60% |
| 1-4-5 | 4.64% | $22  | 7.62% |
| 2-4-5 | 3.58% | $28  | 3.07% |
| 1-4-6 | 2.70% | $37  | 11.72% |
| 2-4-6 | 2.12% | $47  | 4.71% |
| 4-5-9 | 1.95% | $51  | 1.38% |
| 1-2-4 | 1.16% | $86  | 6.46% |
| 4-6-9 | 1.15% | $87  | 2.13% |
| 1-4-9 | 0.62% | $161 | 2.89% |
| 2-4-9 | 0.49% | $206 | 1.16% |

**$150 — B′:** 膽 **#4** + 腳 **#1, #2, #5, #6, #8, #9** → C(6,2) = **15 combos** | MC-Adj 54.2% | **Market 33.2%**

HKJC BET SLIP: Race 9 → Trio → 膽拖 → 膽: **4** | 腳: 1, 2, 5, 6, 9 (add 8 for the $150 version) | $10/combo

The ticket's standout is **4-5-6** — market 8.42%, fair $12 — the three horses the market rates 1-2-3 to fill the frame. It does not appear on either skill ticket, because both lock in #1.

For reference, a #5-bankered line (膽 #5 + 腳 #1,#2,#4,#6,#9) scores the highest market coverage of all at **32.7% for $100**, but MC-Adj drops to 32.1%. That is a genuine override of the model rather than a tie-break, so I am not recommending it — but if you believe the market's read on the progressive 4yo, it is the sharpest option on the board.

PASS CONDITIONS:
- Banker scratched (#4 on the recommended ticket, #1 on the skill ticket) → **VOID**, do not restructure (rule 10).
- #5 or #6 scratched → re-run; both are top-3 market frame chances on every ticket.
- If #4 drifts beyond ~9 while #1 shortens toward 7, the tie-break reverses — revert to Strategy A.
- Going to Yielding/Heavy → re-run MC.

CONFIDENCE: **MEDIUM**

CAVEATS:
1. **The recommended ticket departs from the skill's banker rule**, but only by 0.7pp of Adj Win% — the two candidates are tied on Adj Place% and inside simulation noise on Win%. This is weaker grounds for an override than R6/R7 required, and correspondingly safer: MC-Adj coverage falls just 0.7pp.
2. **#1 LUCKY SAM GOR is dropping from 1600m to 1400m.** Its last four good runs are all at 1600m; its most recent 1400m start was a 4th in March. It also carries top weight, 135lb (+4). The MC does not appear to price the trip change, and the market's 11 (against #4's 5.9) suggests punters do.
3. **#5 BABY SAKURA carries the meeting's largest positive model/market gap** (+26.0pp; market 63.4% top-3 vs MC 37.4%). A 4yo rated 75 and rising +7 with a winning trial. It is a leg on every ticket, but if the market is right it arguably belongs as the banker.
4. **SCMP place odds are corrupt for the fourth race running** — this time they exceed the win odds for several runners (#5 shows 2.7 win / 3.2 place, #6 3.4/4.6), which is impossible. HKJC place odds used throughout. The fault has now appeared in R6 (rating/odds collision), R7, R8 and R9; treat SCMP place odds as unusable for this meeting.
5. **#3 POCKETING is rated 76 officially — third-highest in the race — but MC gives it 3.5% place.** Its five recorded starts are all Class 2 (4/7/10/9/7) and it is 26 in the market, so both the model and the market agree it is out of form. No ticket includes it, but the rating/model gap is worth noting.
6. Season opener — 0 jockey profiles and 0 trainer profiles loaded, as in R1–R8. Every runner is first-up (56–137 days).
7. `winningMargin` still duplicates `finishPosition` in the historical data (found in R3, unfixed).
8. Market coverage from a Plackett-Luce fit to the HKJC place pool (11 runners → place pays top 3). A market-fitted model reproduces the market and cannot claim value against it; used to size disagreement and to break the banker tie only.
═══════════════════════════════════════════════════════════
