# Trio (單T) Strategy — Happy Valley | 2026-10-21 | Race 7

> Pre-race run, generated 2026-10-21 (night meeting, R7 SWIFTY HANDICAP – Sec 2, off 9:40pm)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Happy Valley | 2026-10-21 | Race 7
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good | 0 scratchings
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all)
SCMP DATA: ✅ Loaded | Star Form / TIR / Vet / Trackwork parsed | ⚠️ odds columns unlabelled, QP/Q matrix not mappable
ODDS SOURCE: HKJC early-morning pool (fetch-odds.ts → data/odds/odds_20261021_HV.json, captured 11:01 HKT 21-Oct)
             SCMP odds: ⚠️ loaded (unlabelled columns, cross-check only) | HKJC live: ✅ loaded by analyze-race.ts

RACE: R7 — Class 4 | 1200m | Turf ("B" course) | Good | 12 runners (SWIFTY HANDICAP)
CLASSIFICATION: Dominant (top Adj Win% 38.8%) | POOL SIZE: 6 (Mode A 5 + #2 via Rule 9)
MODE: A: Tight Pool (5) + Rule 9 inclusion
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Happy Valley 2026-10-21 (night) | Going: Good | Surface: Turf
Target Race(s): R7 (Class 4 | 1200m | 12 runners)
Scratchings: none
Odds coverage: 12 horses with win odds (analyzer estimates place odds from win odds)
SCMP data: ✅ loaded (Star Form, TIR, Vet, Trackwork) | ⚠️ odds columns unlabelled, QP/Q matrix unusable
```

- ≥3 starters ✅ | Odds for all 12 ✅ | 12 jockey and 12 trainer profiles loaded ✅ | 12/12 horses enriched with form.
- Historical sync and odds fetch were not re-run (already done for this meeting, per instructions). Phantom R10/R11 in the odds file are ignored.
- **Lightly raced:** #4 GOLDEN ACE (2 starts), #6 SPICY BONUS (2 starts), #7 HERO MASTERMIND (3 starts). None of them is a banker candidate, so banker eligibility is not affected.
- **Layoffs:** #2 MALPENSA last raced 31-May-2026 (~143 days). It was found with a heart irregularity after that run and passed the vet on 25-Sep (26 days ago). #6 SPICY BONUS last raced 13-Jun (~130 days).
- **Trip experience:** #4 GOLDEN ACE, #6 and #7 have no 1200m runs (0 trip runs). #10 QUICK CONTRIBUTION has 1 run at 1200m (its recent form is at 1400m).
- `careerStarts` is 0 for every horse in the scraped card (the field is not populated), so banker eligibility uses the form lines. Banker #5 KOL has 6 starts.
- SCMP lists two reserves (CHILL KAKA, ROAD TO GLORY). They are not in the HKJC field and were ignored.

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6, latest first) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|------|-------------------|--------------------------|
| 5 | KOL | 37.8% | 69.6% | 5.8 | ✅ | ✅ | 1-4-7-9-12-11 | ★ 膽 (Banker) | 3-5: 10.5% (9.5) |
| 3 | COPARTNER FLEET | 12.2% | 37.4% | 5.3 | ✅ | ✅ | 4-10-5-10-5-12 | 腳 (Leg) | 3-5: 10.5% (9.5) |
| 10 | QUICK CONTRIBUTION | 10.6% | 33.2% | 5.7 | ✅ | ✅ | 2-3-2-2-7-4 | 腳 (Leg) | 5-10: 8.7% (11.5) |
| 9 | TOP TO SKY | 9.0% | 31.1% | 26 | ✅ | ❌ | 11-12-1-1-7-10 | 腳 (Leg) | 5-9: 8.0% (12.5) |
| 4 | GOLDEN ACE | 6.9% | 27.2% | 6.7 | ✅ | ✅ | 6-3 | 腳 (Leg) | 4-5: 6.7% (14.9) |
| 2 | MALPENSA | 6.9% | 24.6% | 10 | ✅ | ❌ (10.0, not <10) | 14-1-10-5-2-4 | 腳 (Leg) | 2-5: 6.2% (16.1) |
| 1 | HEALTHY HEALTHY | 5.3% | 22.0% | 27 | ✅ | ❌ | 6-14-7-1-10-8 | — (replaced by #11) | — |
| 11 | FORZA LEADER | 3.1% | 14.5% | 6.8 | ❌ | ✅ | 12-4-3-2-6-4 | 腳 (Leg) — replaced #1 | — (replacement candidate) |
| 12 | MONTA FRUTTA | 3.2% | 14.2% | 12 | ❌ | ❌ | 6-3-8-13-9-10 | — | — |
| 8 | ENJOY GOLF | 2.3% | 11.4% | 22 | ❌ | ❌ | 11-9-2-5-3-1 | — | — |
| 7 | HERO MASTERMIND | 1.8% | 9.3% | 37 | ❌ | ❌ | 10-7-10 | — | — |
| 6 | SPICY BONUS | 0.9% | 5.5% | 16 | ❌ | ❌ | 13-12 | — | — |

Market: Overround 22.3%. The market is tightly grouped: #3 (5.3), #10 (5.7), #5 (5.8), #4 (6.7) and #11 (6.8). MC separates #5 KOL clearly (37.8% win, 69.6% place). It rates #5 undervalued by 127% and #9 TOP TO SKY (26) undervalued by 134%, and it rates #6 overvalued by 84%. #11 FORZA LEADER is 5th favourite but only 14.5% place on MC. The analyzer's own bets were Place #5 and Place #9. The finish-time projection (speed figures, no weight adjustment) is out of line with the MC ranking: it has #1, #2, #3 and #4 fastest and #5 only 8th. Treat this as a caveat on the banker.

---

## STRATEGY A

### HORSE RANKINGS

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 5 | KOL | 37.8% | 69.6% | +form +1 | +form +1 | 38.8% | 70.6% | 5.8 | Z Purton | Stalk (speed-tracker) | +form (won last start by a neck after a prominent run) | ★ 膽 (Banker) |
| 3 | COPARTNER FLEET | 12.2% | 37.4% | trial +2 | trial +2 | 14.2% | 39.4% | 5.3 | C L Chau (-2) | Front/Stalk | +trial (trackwork: "stepped up his morning work… could be a contender"); draw 1 | 腳 (Leg) |
| 10 | QUICK CONTRIBUTION | 10.6% | 33.2% | +form +1 | +form +1 | 11.6% | 34.2% | 5.7 | M F Poon | Close | +form ("resumed a rallying neck second") | 腳 (Leg) |
| 9 | TOP TO SKY | 9.0% | 31.1% | 0 | 0 | 9.0% | 31.1% | 26 | K C Leung | Front | — (over-raced in the lead last start; not an excuse flag) | 腳 (Leg) |
| 4 | GOLDEN ACE | 6.9% | 27.2% | excuses +2 | excuses +2 | 8.9% | 29.2% | 6.7 | B Avdulla | Close | +excuses (steadied when crowded after the start, raced greenly) | 腳 (Leg) |
| 2 | MALPENSA | 6.9% | 24.6% | -injury30d −3, trial +2 | -injury30d −4, trial +2 | 5.9% | 22.6% | 10 | J Orman | Front/Stalk | -injury30d (heart irregularity, passed 25-Sep); +trial (2nd in recent Valley trial) | 腳 (Leg, Rule 9) |
| 1 | HEALTHY HEALTHY | 5.3% | 22.0% | 0 | 0 | 5.3% | 22.0% | 27 | A Atzeni | Midfield | — (draw 10, 135 lb topweight) | — (20%-variant leg) |
| 8 | ENJOY GOLF | 2.3% | 11.4% | excuses +2 | excuses +2 | 4.3% | 13.4% | 22 | H Bentley | Front | +excuses (jumped awkwardly, forced wide when trying to lead) | — |
| 7 | HERO MASTERMIND | 1.8% | 9.3% | excuses +2 | excuses +2 | 3.8% | 11.3% | 37 | L Hewitson | Midfield | +excuses (steadied, could not get clear running) | — |
| 12 | MONTA FRUTTA | 3.2% | 14.2% | 0 | 0 | 3.2% | 14.2% | 12 | Y L Chung (-2) | Close | — | — |
| 11 | FORZA LEADER | 3.1% | 14.5% | 0 | 0 | 3.1% | 14.5% | 6.8 | A Badel | Close | — (placed in 3 of 4 Valley 1200m runs last term) | — |
| 6 | SPICY BONUS | 0.9% | 5.5% | excuses +2 | excuses +2 | 2.9% | 7.5% | 16 | L Ferraris | Rear | +excuses (jumped awkwardly, lost ground, steadied) | — |

Note: ★ 膽 = Banker. #5 is 1st by Adj Win% (38.8%) and has 6 starts, so it is eligible. The 2nd-ranked horse, #3, has Adj Place% 39.4%, which is below 63%, so the structure is single-banker 膽拖. Adjusted values are not renormalised.

**How the flags were applied:**
- **+form:** #5 (won its last start, 4-Oct ST 1200m, "leading 100m out following a prominent run") and #10 (resumed with a "rallying neck second").
- **trial:** #3 (the trackwork highlight on stepped-up morning work counts as the "looks ready" type of note). #2 (2nd in a recent Valley trial before passing the vet).
- **excuses:** applied where the latest stewards' report shows the horse was steadied, crowded or forced wide (#4, #6, #7, #8).
- **-injury30d (#2):** a heart irregularity was found after the 31-May run and the horse passed the vet on 25-Sep, 26 days ago, which is under 30 days. The rule's −3 Win / −4 Place was applied.
- **Not applied:** #5's TIR (restrained near the 800m to avoid heels) was in a run it won, so no excuse credit. #9's over-racing note is a negative tendency but not one of the listed flags. #1's wide trip was in the 15-Jul run, not its latest. #8 had one awkward jump, which is not repeated barrier trouble. No horse is 8 or older.

**Reasoning:** #5 at 38.8% Adj Win% is ≥ 35%, so the race is Dominant and the mode is Mode A (5 horses: banker + 4 by Adj Place%), giving #5 + #3 (39.4%), #10 (34.2%), #9 (31.1%), #4 (29.2%). This covers the Adj Place% ≥ 25% must-include rule exactly (#5, #3, #10, #9, #4). **#2 MALPENSA is added under Rule 9:** it carries a negative flag (-injury30d) but is still 10 in the market (≤ 15), so it may not be excluded. Without that debit it would be at 26.6% Adj Place%, above the 25% must-include line. That makes the pool 6 horses: 1 banker + 5 legs.

- **#5 KOL** has Purton (22% strike from 102 rides) and won last start (4-Oct ST 1200m, Class 4) as a speed-tracker. It is 4 years old, drops to 127 lb from draw 5, and has 6 runs at 1200m. MC #1 by a wide margin (69.6% place). Its weakness is the finish-time projection (8th on speed figures) and that it has not yet raced at the Valley.
- **#3 COPARTNER FLEET** is the market favourite. It has draw 1, a 2 lb claim, instructions to go forward and a trackwork upgrade. It won at the Valley 1000m last term.
- **#10 QUICK CONTRIBUTION** is a consistent placer (2-3-2-2 in its last 4), but its recent form is at 1400m and it is drawn 8.
- **#9 TOP TO SKY** has made all to win before but over-raced last time and is drawn 11. MC likes it (31.1% place) and the market does not (26).
- **#4 GOLDEN ACE** has only 2 starts, both at 1000m, and is first time at 1200m. It ran on strongly on debut, and last time it was crowded and raced greenly.
- **#2 MALPENSA** is a speed-tracking turf winner off a 143-day break after the heart issue. It has draw 3 and trialled well.
- **Out:** #11 FORZA LEADER (6.8, 5th favourite) rates only 14.5% Adj Place% and has no negative flag, so Rule 9 does not force it in. It is out on the model (it is in Strategy B). #12 (12) is out on Adj Place% with no flags. #8, #7 and #6 are long prices with low Adj Place%.

**Pace:** at the Valley 1200m there is a front-runner bias. Likely leaders are #3 (draw 1, instructed forward), #2 (draw 3) and #9 (draw 11, a forward type who will have to cross). #8 may also try to lead. #5 should track the speed from draw 5, which suits the course. #10, #4, #11 and #12 are closers and need the pace to collapse.

### TRIO POOL (any order)

```
POOL: #5, #3, #10, #9, #4, #2
MODE: A (5) + #2 via Rule 9 | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #5 KOL (Adj Place% 70.6%) ← locked in every combo
腳 (Legs):  #3, #10, #9, #4, #2
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville approximation from normalised Adj Win%):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #5, #3, #10 | 6.1% | $16.5 |
| 2 | #5, #3, #9 | 4.6% | $21.9 |
| 3 | #5, #3, #4 | 4.5% | $22.2 |
| 4 | #5, #10, #9 | 3.6% | $27.7 |
| 5 | #5, #10, #4 | 3.6% | $28.1 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: banker #5, legs 3, 10, 9, 4, 2)
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

ALL COMBINATIONS (est. prob):
  5-3-10 6.1% | 5-3-9 4.6% | 5-3-4 4.5% | 5-10-9 3.6% | 5-10-4 3.6%
  5-3-2 2.9%  | 5-9-4 2.7% | 5-10-2 2.3% | 5-9-2 1.7% | 5-4-2 1.7%
  Ticket coverage (sum): ~33.6%

PURE MODE A (no Rule 9 add): 膽 #5 / 腳 #3, #10, #9, #4 → C(4,2) = 6 combos, $60, coverage ~25.0%.

20%-VARIANT (Adj Place% ≥ 20% must-include): #1 HEALTHY HEALTHY (22.0%) is in the 20–25% band and not in the pool → 膽 #5 / 腳 #3, #10, #9, #4, #2, #1 → C(6,2) = 15 combos, $150, coverage ~42.2%. (#2, 22.6%, is already in the pool.)

PASS CONDITIONS:
- If #5 KOL (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going turns Yielding or worse → reconsider (MC run on Good)
- If #5 drifts well beyond 10 late, treat it as a market warning on the banker

CONFIDENCE: MEDIUM (MC has a clear #1 at ~70% place and the race classifies as Dominant. But the market has 5 horses between 5.3 and 6.8, #5 is only 3rd favourite, and speed figures rank #5 8th. Happy Valley Class 4 1200m is an upset-prone race.)
```

---

## STRATEGY B (MC-only)

```
Banker: #5 KOL (MC Win% 37.8%, MC Place% 69.6%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #3 (37.4%), #10 (33.2%), #9 (31.1%), #4 (27.2%), #2 (24.6%), #1 (22.0%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #1 HEALTHY HEALTHY (MC Place% 22.0%, Win odds 27)
  (#4 is 6.7 and #2 is exactly 10.0, not > 10, so neither is replaceable)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10), by odds ascending:
  #11 FORZA LEADER (Win odds 6.8, MC Place% 14.5%)
  (#12 MONTA FRUTTA is 12, not < 10)
Action: #11 replaced #1 (1-for-1 swap)
Final legs: #3, #10, #9, #4, #2, #11
BET STRUCTURE: 膽拖 | 1膽 + 6腳 | COMBINATIONS: C(6,2) = 15
UNIT BET: $10 (fixed)
TOTAL STAKE: $150

STRATEGY B TICKET: 膽 #5 / 腳 #3, #10, #9, #4, #2, #11
  5-3-10 6.7% | 5-3-9 5.6% | 5-10-9 4.7% | 5-3-4 4.2% | 5-3-2 4.2%
  5-10-4 3.5% | 5-10-2 3.5% | 5-9-4 2.9% | 5-9-2 2.9% | 5-4-2 2.2%
  5-3-11 1.8% | 5-10-11 1.5% | 5-9-11 1.3% | 5-4-11 0.9% | 5-2-11 0.9%
  Ticket coverage (sum, Harville from raw MC Win%): ~46.9%
```

Comparison: both strategies bank #5 KOL and share legs #3, #10, #9, #4 and #2. Strategy B adds the market's 5th favourite #11 FORZA LEADER (in place of the long-priced #1), so it has 15 combos ($150) against Strategy A's 10 ($100). The difference is the market cover on #11, a closer with a good Valley 1200m placing record that MC rates at only 14.5% place.

---

## CAVEATS

- **Odds timing:** the HKJC morning pool was captured at 11:01 HKT. SCMP shows slightly different (unlabelled) figures: #2 MALPENSA ~9.1 and #12 MONTA FRUTTA ~10. For Strategy B, #2 is already a primary leg, so its price does not matter. If #12 shortens below 10, it is added directly (no replaceable leg is left after #1 is swapped out): 膽 #5 / 7 legs = 21 combos, $210.
- **SCMP odds/QP matrix:** the SCMP odds columns were unlabelled and the QP/Q grid could not be mapped to pairs, so neither was used. The HKJC pool odds are the odds of record.
- **Banker risk:** #5 KOL has never raced at Happy Valley, and the speed-figure finish-time projection ranks it only 8th of 12. MC ranks it 1st on form, jockey and trip. If #5 misses the top 3, every ticket in both strategies loses.
- **#2 -injury30d** is a judgement call: the vet entry is a heart irregularity, not a lameness, but it was passed within 30 days. The flag only decides whether #2 is included via Rule 9 or via the ≥ 25% must-include line. Either way it is in the pool.
- **Rule 9 add:** pure Mode A would be 5 horses ($60). #2 was added because it is ≤ 15 odds with a negative flag. The pure Mode A ticket is listed above.
- **20%-variant:** #1 HEALTHY HEALTHY (22.0% Adj Place%) would be added under the 20% reading of the must-include rule. That ticket is listed above ($150).
- Trio combination probabilities are a Harville approximation from Win%, not direct MC trio counts. SCMP Place% adjustments mirror the Win% factors (except -injury30d, which uses the rule's −4 Place).
- No code, sync or odds re-fetch was run beyond `analyze-race.ts`, which auto-saved `data/racecards/racecard_20261021_HV_R7.json`. The odds file's phantom R10/R11 were ignored.

```
═══════════════════════════════════════════════════════════
```
