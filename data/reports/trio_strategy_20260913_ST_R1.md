═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-09-13 | Race 1
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ All critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (`analyze-race.ts --date 2026-09-13 --venue "Sha Tin" --race 1 --form-data all --bankroll 1000 --kelly 0.35 --min-edge 5`) — 2,249 historical races / 2,311 indexed performances; 14/14 horses enriched; 14 jockey + 14 trainer profiles loaded
HISTORICAL SYNC: ⏭️ Not re-run this session (already synced upstream, per instruction; latest file `results_20260909_HV.json`)
SCMP DATA: ✅ Loaded — Star Form, TIR, Vet, Trackwork for all 14 runners. ⚠️ SCMP Win/Place odds and Q/QP matrices suspect (see caveats) — **not used**. Tipster picks ignored per skill rule 13.
ODDS SOURCE: **HKJC win pool** (`fetch-odds.ts`, captured 10:08 HKT 13-Sep) — complete for all 14 runners
             SCMP odds: ⚠️ loaded but unreliable (Place column mirrors Win column); cross-check causes **no flag flips** on the Win-odds<10 test | HKJC live: snapshot only, not refreshed after 10:08
             ⚠️ Place odds NOT usable — `analyze-race.ts` logged "place odds estimated from win odds". All Strategy B odds tests use **Win odds only**, as the rule specifies.

RACE: R1 HONG TUNG HANDICAP — **Class 5** | 1400m | Turf ("B" course) | Good | **14 runners**
CLASSIFICATION: **Dominant** (top Adj Win% 50.0% after cap; raw MC 63.3%) | POOL SIZE: 5
MODE: **A — Tight Pool (5)**
BET STRUCTURE: **雙膽拖** | 2膽 + 3腳 | 3 combinations (2nd-ranked #11 Adj Place% 66.0% ≥ 63%)
UNIT BET: $10 per combination (fixed)

───────────────────────────────────────────────────────────
DATA VALIDATION DETAIL (Step 2)
───────────────────────────────────────────────────────────
```
Meeting: Sha Tin 2026-09-13 | Going: Good (SCMP: "Expected Going: Good") | Surface: Turf, "B" course
Target Race: R1 HONG TUNG HANDICAP (Class 5 | 1400m Turf | 14 runners)
Scratchings: none (SCMP reserves R. GIMME FIVE / R. PRESTIGE SUPERIOR are not in the field)
Odds coverage: 14 / 14 horses with HKJC Win odds
Starters: 14 ≥ 3 → Trio pool valid
Jockey stats: 14 jockey profiles + 14 trainer profiles loaded
Debutants: none — fewest indexed starts are #3 SEA DIAMOND (6), #4 YOUNG FIGHTER (6), #2 LIGHTNING ACE (7);
           all others 10. Banker #10 RATTAN GALAXY has 10 → rule 17 satisfied.
Long layoff (>90 days): #4 YOUNG FIGHTER (245d, two fetlock injuries), #8 LEGENDARY IMPACT (158d),
           #9 THE ALL ROUNDER (92d)
SCMP data: ✅ Form/TIR/Vet/Trackwork loaded (all 14); ⚠️ odds + Q/QP suspect
```

⚠️ **Seasonal context — whole field is resuming.** Every runner's last start is between 11-Jan and 12-Jul-2026 (**63–245 days ago**). The MC's form enrichment describes last-season form, not today's fitness. #11 SUPERB GUY (A's 2nd banker) returned **lame** from his last run (01-Jul) and only passed the vet on **31-Aug — 13 days before this race**.

───────────────────────────────────────────────────────────
MC SIMULATION (raw) — shared basis for both strategies
───────────────────────────────────────────────────────────

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Draw | Age | Form | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-----|------|-------------------|--------------------------|
| 10 | RATTAN GALAXY | 63.3% | 92.2% | 4.5 | ✅ | ✅ | 2 | 5 | 10 | ★ 膽 (Banker) | 10-11: 37.0% (2.7) |
| 11 | SUPERB GUY | 19.0% | 67.0% | 9 | ✅ | ✅ | 6 | 5 | 10 | 腳 (Leg) | 10-11: 37.0% (2.7) |
| 14 | EXCEED THE WISH | 7.5% | 42.4% | 6.9 | ✅ | ✅ | 4 | 6 | 10 | 腳 (Leg) | 10-14: 16.9% (5.9) |
| 9 | THE ALL ROUNDER | 4.5% | 32.3% | 12 | ✅ | ❌ | 14 | 5 | 10 | 腳 (Leg) | 9-10: 11.5% (8.7) |
| 2 | LIGHTNING ACE | 1.9% | 17.5% | 11 | ❌ | ❌ | 9 | 4 | 7 | — | 2-10: 5.2% (19.1) |
| 12 | SUPREME WINNER | 1.3% | 13.1% | 19 | ❌ | ❌ | 7 | 5 | 10 | — | — |
| 13 | MANYTHANKS FOREVER | 0.8% | 9.7% | 27 | ❌ | ❌ | 11 | 6 | 10 | — | — |
| 1 | GOR GOR | 0.6% | 7.8% | 10 | ❌ | ❌ (exactly 10) | 1 | 5 | 10 | — | — |
| 7 | PERIDOT | 0.5% | 6.4% | 10 | ❌ | ❌ (exactly 10) | 13 | 5 | 10 | — | — |
| 3 | SEA DIAMOND | 0.2% | 4.0% | 15 | ❌ | ❌ | 5 | 5 | 6 | — | — |
| 4 | YOUNG FIGHTER | 0.2% | 2.4% | 28 | ❌ | ❌ | 3 | 4 | 6 | — | — |
| 5 | THE CONCENTRATION | 0.1% | 2.3% | 11 | ❌ | ❌ | 12 | 6 | 10 | — | — |
| 8 | LEGENDARY IMPACT | 0.1% | 1.9% | 41 | ❌ | ❌ | 10 | 6 | 10 | — | — |
| 6 | MULTISUPERSTAR | 0.0% | 0.9% | 12 | ❌ | ❌ | 8 | 4 | 10 | — | — |

**Market:** Overround **24.3%**, favourite bias **+185%**, longshot bias **−90%**. Model and market agree on the **order** at the top — #10 is favourite (4.5), #14 second choice (6.9), #11 third (9) — but disagree hugely on the **margin**: MC makes #10 a 63% win chance (fair ~1.6) against a market-implied ~18% after overround. Behind the top three, the market is flat — six runners (#1, #7, #2, #5, #9, #6) between 10 and 12 — while the model sees a four-horse race ({10, 11, 14, 9} carry 234% of the 300% place mass).

**Top quinella combinations (MC):** 10-11 37.0% ($2.7) · 10-14 16.9% ($5.9) · 9-10 11.5% ($8.7) · 2-10 5.2% ($19.1) · 11-14 4.4% ($22.6).

**MC trio distribution (direct tool output, 10,000-run re-execution of the same pipeline on the saved racecard):** 10-11-14 **20.0%** · 9-10-11 **14.0%** · 2-10-11 6.8% · 9-10-14 6.4% · 10-11-12 5.8% · 10-11-13 3.7% · 2-10-14 3.1% · 1-10-11 3.0%. Re-run win/place moved ≤0.4pp on every horse — no Strategy B selection changes.

───────────────────────────────────────────────────────────
SCMP DATA TABLE (Step 1e)
───────────────────────────────────────────────────────────

| # | Horse | Star Form Signal | TIR Flag | Vet Flag | Trackwork | Running Style |
|---|-------|------------------|----------|----------|-----------|---------------|
| 1 | GOR GOR | — (nose win in Jan is stale; "distant fourth", "closing eighth") | **+excuses** (steadied, settled back after being **crowded**) | clear | — | Midfield |
| 2 | LIGHTNING ACE | **+form** ("rallying fourth" at $144; downgraded, tries 1,400m) | **+excuses** (**held up** 400M–300M) | clear | — | Closer |
| 3 | SEA DIAMOND | — ("no-excuse ninth"; drops to C5) | clear (vet: no significant findings) | clear | **+trial** ("made all in a Conghua trial") | Midfield / late |
| 4 | YOUNG FIGHTER | — ("returned lame"; "fetlock injury in April") | — (jumped awkwardly; lame next day) | Injuries 12-Jan & 28-Apr, **passed 20-Jun (85d ago → no −injury30d)** | — | Behind midfield |
| 5 | THE CONCENTRATION | — (Jan wins stale; three straight sevenths) | **+excuses** (improving behind a runner) **and −notRO** ("could not be fully ridden out") | clear | — | Midfield |
| 6 | MULTISUPERSTAR | **+form** ("rallied for fourth"; "made some ground late") | **+excuses** (**bumped at start**, single instance → no −barrier) | clear | — | Closer |
| 7 | PERIDOT | — ("ridden last from gate 12") | — (slow to begin — self-caused) | clear | — | Back marker |
| 8 | LEGENDARY IMPACT | — ("failing to click", "did struggle" at 1,400m) | **+excuses** (**bumped** near 300M) | clear | — | Stalker |
| 9 | THE ALL ROUNDER | **+form** ("box-seat second", "**rallied** for third") | clear | clear | — | Stalker / box-seat |
| 10 | RATTAN GALAXY | — ("pipped late dictating the pace from gate 14") | — (shifted in on jumping and made contact — **self-caused**) | clear | **+trial** ("wasn't fully tested… **rates highly here**") | **Front / on-pace** |
| 11 | SUPERB GUY | **+form** ("**rallied** for second on a wet track") | **+excuses** (**bumped** shortly after start; unable to shift out) | **Lame 02-Jul, passed 31-Aug (13d ago) → −injury30d** | — | Midfield, one-paced |
| 12 | SUPREME WINNER | **+form** ("**rallied** to land a betting plunge") | clear | clear | — | Closer |
| 13 | MANYTHANKS FOREVER | — (Dec win stale; "chasing the pace for ninth") | **+excuses** (**crowded** on jumping, forced forward from wide) | clear | — | On-pace |
| 14 | EXCEED THE WISH | — ("fourth from midfield") | clear | clear | — | Midfield |

**Flag discipline (documented decisions, same conventions as the 09-Sep HV reports):**
- `+excuses` only where the horse **received** the trouble (#1 crowded/steadied, #2 held up, #5 blocked behind a runner, #6 bumped, #8 bumped, #11 bumped, #13 crowded). Withheld from **#10** (its jump-contact was self-caused) and **#7** (slow to begin).
- `−notRO` applied to **#5** ("could not be fully ridden out") alongside its excuses — net 0, as with #3 in the 09-Sep HV R7 report.
- `−injury30d` applies only to **#11** (passed 31-Aug, 13 days ago). #4's injuries passed 20-Jun (85 days) → no penalty.
- `−barrier` needs "bumped on jumping" in ≥2 runs — no runner shows that → no penalty.
- `−age` needs a vet note of 8+ years — oldest runners are 6 → no penalty.

───────────────────────────────────────────────────────────
HORSE RANKINGS (Strategy A — MC + SCMP adjustments, Step 3c/4a)
───────────────────────────────────────────────────────────

| Rank | # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Draw | Style | SCMP Flags | Role |
|------|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|------|-------|------------|------|
| 1 | 10 | RATTAN GALAXY | 63.3% | 92.2% | trial +2 (→ cap) | trial +2 (→ cap) | **50.0%** | **85.0%** | 4.5 | L Ferraris | 2 | Front | +trial | ★ 膽 (Banker 1) |
| 2 | 11 | SUPERB GUY | 19.0% | 67.0% | -injury30d −3, excuses +2, +form +1 | -injury30d −4, excuses +2, +form +1 | **19.0%** | **66.0%** | 9 | Z Purton | 6 | Midfield | −injury30d, +excuses, +form | ★ 膽 (Banker 2) |
| 3 | 14 | EXCEED THE WISH | 7.5% | 42.4% | 0 | 0 | **7.5%** | **42.4%** | 6.9 | A Atzeni | 4 | Midfield | — | 腳 (Leg) |
| 4 | 9 | THE ALL ROUNDER | 4.5% | 32.3% | +form +1 | +form +1 | **5.5%** | **33.3%** | 12 | C Y Ho | 14 | Stalk | +form | 腳 (Leg) |
| 5 | 2 | LIGHTNING ACE | 1.9% | 17.5% | excuses +2, +form +1 | excuses +2, +form +1 | **4.9%** | **20.5%** | 11 | M Chadwick | 9 | Closer | +excuses, +form | 腳 (Leg) |
| 6 | 6 | MULTISUPERSTAR | 0.0% | 0.9% | excuses +2, +form +1 | excuses +2, +form +1 | 3.0% | 3.9% | 12 | A Badel | 8 | Closer | +excuses, +form | — |
| 7 | 13 | MANYTHANKS FOREVER | 0.8% | 9.7% | excuses +2 | excuses +2 | 2.8% | 11.7% | 27 | H Bentley | 11 | On-pace | +excuses | — |
| 8 | 1 | GOR GOR | 0.6% | 7.8% | excuses +2 | excuses +2 | 2.6% | 9.8% | 10 | L Hewitson | 1 | Midfield | +excuses | — |
| 9 | 12 | SUPREME WINNER | 1.3% | 13.1% | +form +1 | +form +1 | 2.3% | 14.1% | 19 | C L Chau (-2) | 7 | Closer | +form | — |
| 10 | 3 | SEA DIAMOND | 0.2% | 4.0% | trial +2 | trial +2 | 2.2% | 6.0% | 15 | B Avdulla | 5 | Midfield | +trial | — |
| 11 | 8 | LEGENDARY IMPACT | 0.1% | 1.9% | excuses +2 | excuses +2 | 2.1% | 3.9% | 41 | H T Mo (-2) | 10 | Stalk | +excuses | — |
| 12 | 7 | PERIDOT | 0.5% | 6.4% | 0 | 0 | 0.5% | 6.4% | 10 | J Orman | 13 | Back | — | — |
| 13 | 4 | YOUNG FIGHTER | 0.2% | 2.4% | 0 | 0 | 0.2% | 2.4% | 28 | E C W Wong (-3) | 3 | Behind mid | — (injuries >30d) | — |
| 14 | 5 | THE CONCENTRATION | 0.1% | 2.3% | excuses +2, -notRO −2 | excuses +2, -notRO −2 | 0.1% | 2.3% | 11 | H Y Yuen (-10) | 12 | Midfield | +excuses, −notRO | — |

**Factor legend:** `trial +2` strong trial/trackwork · `excuses +2` TIR trouble received · `+form +1` "rallied"/improving per Star Form · `-injury30d −3/−4` vet clearance <30 days · `-notRO −2` not fully ridden out. Largest adjustment is +3 (#2, #6); no horse approaches the ±8% / ±10% cap.

**Cap note (disclosed):** #10's raw MC (63.3% / 92.2%) already exceeds the 50% Win / 85% Place ceiling before its +2 trial flag. Applying the cap rule literally sets it to **50.0% / 85.0%** — this does not change its rank (#1 by 31pp), the Dominant classification, or the pool. Strategy B uses the uncapped raw figures.

**Banker eligibility (rules 1 / 17):** #10 RATTAN GALAXY has 10 indexed starts — eligible. No debutants in the field.

**雙膽拖 — triggered (by the 63% rule).** 2nd-ranked #11 SUPERB GUY has Adj Place% **66.0% ≥ 63%** (decision flow §4c, reminders 16/19), and the race is strongly structured (Dominant). ⚠️ The skill's A/B table (line 51) states the bar as **70%**, under which #11 would **not** qualify. The rule-output 雙膽拖 is shown as the Strategy A ticket; the single-banker 膽拖 is priced as the conservative alternative below. MC joint probability that **both** #10 and #11 finish top 3 ≈ **58%** (sum of 10-11-x trios in the MC top-20).

**Reasoning for the pool.** Mode A = banker + the 4 best by Adj Place%: **#11 (66.0%), #14 (42.4%), #9 (33.3%), #2 (20.5%)**. The first three clear the mandatory Adj Place% ≥ 25% bar; #2 also clears Reminder 8's ≥ 20% bar, so the pool is the same under either threshold reading. Next-best are #12 (14.1%) and #13 (11.7%) — 6.4pp and more below #2. Several short-priced runners are outside the pool (#1 and #7 at 10, #5 at 11, #6 at 12) — none is excluded on negative flags (Reminder 9 does not bind); they are simply far down on Adj Place% (2.3–9.8%).

**Pace read.** #10 RATTAN GALAXY "dictated the pace from gate 14" last start and now draws **gate 2** — the ideal setup for a Sha Tin 1,400m leader, and the skill's venue note says front-runners hold up well on standard ST settings. Other likely pace: #13 (on-pace, gate 11, forced forward from wide last time). The rest are midfield/closers (#2, #6, #12 closers; #9 box-seat stalker from gate 14 — wide gate is a reducer, not an exclusion, per rule 15). Tempo looks moderate, which suits the banker.

───────────────────────────────────────────────────────────
TRIO POOL (any order) — STRATEGY A
───────────────────────────────────────────────────────────
POOL: **#10, #11, #14, #9, #2**
MODE: **A — Tight Pool** | POOL SIZE: 5

雙膽拖 STRUCTURE (1st-ranked = Banker 1; 2nd-ranked Adj Place% ≥ 63% = Banker 2):
膽 (Bankers): **#10 RATTAN GALAXY** (Adj Place% 85.0%) + **#11 SUPERB GUY** (Adj Place% 66.0%) ← both locked in every combo
腳 (Legs):  **#14, #9, #2**
BET STRUCTURE: 雙膽拖 | 2膽 + 3腳 | COMBINATIONS: **3**

TOP TRIO COMBINATIONS (Plackett-Luce fitted to Adj Place%; all 10 pool combos listed, ticket combos marked ✔):

| Rank | Horses (any order) | Combined Place% | Est. Fair Odds ($10) | In 雙膽拖 ticket |
|------|--------------------|-----------------|----------------------|------------------|
| 1 | #10, #11, #14 | 15.72% | $64 | ✔ |
| 2 | #9, #10, #11 | 11.45% | $87 | ✔ |
| 3 | #2, #10, #11 | 6.47% | $155 | ✔ |
| 4 | #9, #10, #14 | 5.18% | $193 | — (膽拖 only) |
| 5 | #2, #10, #14 | 2.92% | $343 | — (膽拖 only) |
| 6 | #2, #9, #10 | 2.12% | $472 | — (膽拖 only) |
| 7 | #9, #11, #14 | 2.10% | $476 | — (full pool only) |
| 8 | #2, #11, #14 | 1.19% | $843 | — (full pool only) |
| 9 | #2, #9, #11 | 0.86% | $1,157 | — (full pool only) |
| 10 | #2, #9, #14 | 0.40% | $2,496 | — (full pool only) |

**Ticket coverage:** 雙膽拖 **33.6%** (adjusted fit) / **40.9%** (direct MC trio counts) for 3 combos.

**Fit note (disclosed):** Adj Place% sums to 307.7% vs the 300% any real top-3 distribution must total, so the Plackett-Luce fit renormalises ~2.5% proportionally (e.g. #10 85.0% → 82.9%, #11 66.0% → 64.3%). The fit is otherwise exact (max error 0.000pp).

**Largest combinations NOT covered by the 雙膽拖:** 9-10-14 (5.2% adj / 6.4% MC), 10-11-12 (4.3% / 5.8% — #12 not in pool), 10-11-13 (3.5% / 3.7%), 2-10-14 (2.9% / 3.1%). Every one of these contains #10 — the 雙膽拖's extra risk is #11 missing the frame, not #10.

───────────────────────────────────────────────────────────
VALUE CHECK (Step 4e)
───────────────────────────────────────────────────────────
- The banker is the **market favourite at 4.5** — this is a "short favourite anchors the frame" race, so the Trio dividend on the model's top combination (10-11-14) will likely be modest. The market's 2nd and 3rd choices (#14 6.9, #11 9) are also in that combination: **low value, high hit-rate**.
- The value side of this pool is **#9 THE ALL ROUNDER at 12** (MC fair ~22 to win but 32% to place) and **#2 LIGHTNING ACE at 11**. Combos 9-10-11 (fair $71–87) and 2-10-11 (fair $146–155) should pay better than fair if the market's flat 10–12 cluster behind #10 spreads the Trio pool.
- Model-vs-market gap on #10 (63% vs ~18%) is very large — in a Class 5 race with a field resuming from 2+ months off, treat it with suspicion. The market does agree #10 is best; it disagrees on how much.
- SCMP Q/QP matrix could not be used for cross-reference (rule 14) — see caveats.

**Verdict:** a low-cost, high-structure ticket. Both strategies cost **$30** and share the two biggest combinations (10-11-14, 9-10-11).

───────────────────────────────────────────────────────────
TICKET SUMMARY — STRATEGY A
───────────────────────────────────────────────────────────
STRUCTURE: 雙膽拖 (2 Bankers + Legs)
膽 (Bankers): **#10 RATTAN GALAXY**, **#11 SUPERB GUY**
腳 (Legs):  #14 EXCEED THE WISH, #9 THE ALL ROUNDER, #2 LIGHTNING ACE
COMBINATIONS: **3** (10-11-14, 9-10-11, 2-10-11)
UNIT BET: $10 (fixed)
**TOTAL STAKE: $30**

TOP COMBINATIONS (highest value):
  10-11-14 (15.7% adj / 20.0% MC) · 9-10-11 (11.5% / 14.0%) · 2-10-11 (6.5% / 6.8%)

Priced alternatives (not the recommendation, shown so the trade-offs are visible):
| Variant | Structure | Combos | Cost | Coverage (adj PL / MC) |
|---------|-----------|--------|------|------------------------|
| **Recommended (63% rule)** | 雙膽拖 2膽 #10+#11 + 3腳 (14, 9, 2) | 3 | **$30** | 33.6% / 40.9% |
| 膽拖 (if the 70% bar or #11's injury flag is preferred) | 1膽 #10 + 4腳 (11, 14, 9, 2) | 6 | $60 | 43.9% / 52.7% |
| Full pool, no banker | C(5,3) | 10 | $100 | 48.4% / ≥54% |

PASS CONDITIONS:
- If **#10 RATTAN GALAXY** (Banker 1) is scratched → **VOID** the ticket (rule 10).
- If **#11 SUPERB GUY** (Banker 2) is scratched or fails a raceday vet check → **VOID** the 雙膽拖; do not auto-convert.
- If the field drops below 3 starters → pool refunded (not a live risk).
- If **#10 drifts past ~8** in late betting → the market is rejecting the model's 63% banker; downgrade to PASS.
- If **#11 drifts sharply** (past ~15) → read it as a fitness doubt on a horse that returned lame last start; switch to the 膽拖 alternative or Strategy B.
- If the going turns **Yielding/Heavy** → #11 "rallied for second on a wet track" (helps); re-check #10's front-running on a slower surface.

CONFIDENCE: **MEDIUM** — for: Dominant race, banker is the market favourite with an ideal gate-2 front-running setup and a positive trial note. Against: (1) the MC's own finish-time projection ranks #10 only **4th** (+1.02s behind #14); (2) Banker 2 #11 is **13 days past a lameness clearance**; (3) the whole field is resuming 63–245 days off; (4) the 63%-vs-70% 雙膽拖 threshold conflict.

CAVEATS:
- **SCMP odds and Q/QP matrices unreliable — not used.** SCMP's Place column mirrors its Win column (e.g. #10 4.9/4.8, #12 18/20), and the Q and QP matrices were displayed identically with inconsistent values (10-11 at 47 while 9-10 at 7.2, although #9 is 15 and #11 is 8). Rule 14 cross-reference skipped. SCMP Win odds differ slightly from HKJC (different snapshot), but cause **no flag flips**.
- **Place odds estimated** from win odds by the analyzer — only Win odds used for Strategy B tests.
- **Internal model inconsistency.** The analyzer's finish-time projection ranks #14 fastest, #11 2nd, #13 3rd and **#10 4th (+1.02s / 6.1L)**, while the win/place simulation makes #10 a 63% winner. The Trio ranking follows Win%/Place% as the skill specifies.
- **Skill threshold conflict:** 雙膽拖 bar is 63% in §4c/reminders 16 & 19 but 70% in the A/B table (line 51). #11 at 66.0% sits between the two.
- **Cap rule applied literally** to #10 (raw MC already above 50%/85%) — rank unaffected.
- **Scraper log inconsistency:** the race-card scraper logged "distance=1200m", but the saved racecard, the analysis header, the finish-time projection and SCMP all agree on **1400m**; 1400m was used.
- **Jockey-stat samples are small** (2–18 rides per jockey in the indexed data); e.g. L Ferraris 25% from only 4 rides.
- **First-up field.** All runners resuming ≥63 days; #4 (245d), #8 (158d) and #9 (92d) exceed the 90-day layoff warning.
- **#12 SUPREME WINNER is the main uncovered exposure** — 10-11-12 is MC's 5th-most-likely trio (5.8%); neither strategy holds #12.

───────────────────────────────────────────────────────────
STRATEGY B (MC-only) — raw MC, no SCMP adjustments
───────────────────────────────────────────────────────────
Banker: **#10 RATTAN GALAXY** (MC Win% 63.3%, MC Place% 92.2%) ← 1st by MC Win%

Primary legs (MC Place% > 20%): **#11 (67.0%), #14 (42.4%), #9 (32.3%)**

Replaceable legs (MC Place% in 20–30% **AND** Win odds > 10): **none** — #9 at 32.3% is above the 20–30% band; #11 and #14 are both above it and priced < 10.

Win-odds candidates (MC Place% ≤ 20% **AND** Win odds < 10): **none** — the shortest non-primary runners are #1 GOR GOR and #7 PERIDOT at **exactly 10** (not < 10), then #2 and #5 at 11. SCMP's snapshot (#1, #2, #6, #7 all at 10) also produces no candidate.

Action: **no replacement, no addition.**

Final legs: **#11, #14, #9**
BET STRUCTURE: 膽拖 | 1膽 + 3腳 | COMBINATIONS: C(3,2) = **3**
UNIT BET: $10 (fixed)
**TOTAL STAKE: $30**

STRATEGY B TICKET (direct MC trio counts from the simulator; Plackett-Luce on raw MC Place% in brackets):

| Rank | Horses (any order) | MC Trio% | Est. Fair Odds ($10) |
|------|--------------------|----------|----------------------|
| 1 | #10, #11, #14 | 19.99% (PL 20.40%) | $50 |
| 2 | #9, #10, #11 | 14.04% (PL 14.42%) | $71 |
| 3 | #9, #10, #14 | 6.41% (PL 6.23%) | $156 |

**Ticket coverage: 40.4%** (MC direct) / 41.1% (PL on raw MC) — and it needs only #10 in the frame (MC Place% 92.2%).

⚠️ **Late-odds watch:** #1 GOR GOR and #7 PERIDOT sit at exactly 10. If either shortens **below 10** before the off, it becomes a Win-odds candidate; there is no replaceable leg (#9 is at 32.3%), so it would be **added directly** → 4 legs → C(4,2) = 6 combos → **$60**. The same applies to #2 or #5 (11) if they shorten below 10.

**Comparison vs Strategy A.** Same cost ($30), same 3 combos in count, and **2 of the 3 combos are identical** (10-11-14, 9-10-11). The difference is the third combo: Strategy A's second banker forces **2-10-11** (6.8% MC), while Strategy B keeps **9-10-14** (6.4% MC) — coverage is essentially the same (40.9% vs 40.4% on MC). The **real** difference is risk shape: Strategy A needs **both** #10 and #11 (joint ≈ 58%), including a horse 13 days past a lameness clearance; Strategy B needs **only #10** (≈ 92%) but drops #2 entirely. On this race Strategy B carries the same expected coverage with less dependency on #11's fitness — if choosing one, **Strategy B** is the more robust ticket; Strategy A's 膽拖 alternative ($60) is the choice if you want #2 covered without leaning on #11.
═══════════════════════════════════════════════════════════
