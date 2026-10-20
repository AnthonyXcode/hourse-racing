# Trio (單T) Strategy — Sha Tin | 2026-10-19 | Race 11

> Retrospective run (generated 2026-10-20, blind to results; odds = final SP)

```
═══════════════════════════════════════════════════════════
TRIO (ANY ORDER) STRATEGY - Sha Tin | 2026-10-19 | Race 11
═══════════════════════════════════════════════════════════

DATA VALIDATION: ✅ Critical checks passed | Going: Good to Firm | 1 scratching (#2 not in snapshot)
MC SIMULATION: 10,000 iterations (analyze-race.ts, --form-data all, --use-saved, --hide-actual)
SCMP DATA: ❌ Unavailable (retrospective run — SCMP racecard pages now show the 21-Oct Happy Valley card)
ODDS SOURCE: Final starting prices (SP) from saved race-card snapshot, as loaded by analyze-race.ts
             SCMP odds: ❌ not available | HKJC live: ❌ no longer available (meeting completed)

RACE: R11 — Class 3 | 1400m | Turf | Good to Firm | 13 runners (WO CHE HANDICAP)
CLASSIFICATION: Competitive (top Adj Win% 34.7%) | POOL SIZE: 6
MODE: B: Standard Pool (6)
BET STRUCTURE: 膽拖 1膽 + 5腳 = C(5,2) = 10 combos (2nd-ranked #13 Adj Place% 56.7% < 63%, so no 雙膽拖)
UNIT BET: $10 per combination (fixed)
```

## Data Summary (Step 2)

```
Meeting: Sha Tin 2026-10-19 | Going: Good to Firm | Surface: Turf
Target Race(s): R11 (Class 3 | 1400m | 13 runners)
Scratchings: #2 (absent from the race-day snapshot; field numbered 1–14 with 13 runners)
Odds coverage: 13 horses with odds (final SP)
SCMP data: ❌ unavailable (retrospective run)
```

- ≥3 starters ✅ | Odds populated for all 13 ✅ | Jockey/trainer stats loaded ✅
- **No HK race form:** #7 GARRIX (40 SP) has 0 form lines in the snapshot. MC rates it from rating/connections only (1.0% place).
- **Layoffs:** #11 SKY HEART (last run 19-Apr, ~183 days), #3 MIGHTY MASTS (13-Jun, ~128 days), #5 ENDUED (12-Jul, ~99 days).
- **Shorter form line:** #8 BABY SAKURA has 7 recorded runs (4 at the trip).
- `careerStarts` is 0 for every horse in the snapshot (field not populated), so banker eligibility uses the form lines. #6 has 10 recorded runs, so it is eligible.

---

## MC SIMULATION (raw)

| # | Horse | MC Win% | MC Place% | Win Odds | Place%>20% | Win odds<10 | Form (last 6) | Role (Strategy B) | Top Quinella (fair odds) |
|---|-------|---------|-----------|----------|------------|-------------|---------------|-------------------|--------------------------|
| 6 | AEROINVINCIBLE | 34.7% | 71.5% | 11 | ✅ | ❌ | 1-4-2-1-4-1 | ★ 膽 (Banker) | 6-13: 16.9% (5.9) |
| 13 | NYX GLUCK | 19.8% | 56.7% | 3.1 | ✅ | ✅ | 1-1-3-2-4-10 | 腳 (Leg) | 10-13: 7.4% (13.4) |
| 8 | BABY SAKURA | 15.2% | 46.7% | 3.0 | ✅ | ✅ | 1-1-4-1-3-3 | 腳 (Leg) | 6-8: 12.2% (8.2) |
| 10 | CHILL BUDDY | 14.1% | 46.6% | 18 | ✅ | ❌ | 2-2-1-9-4-1 | 腳 (Leg) | 6-10: 11.9% (8.4) |
| 5 | ENDUED | 6.5% | 28.1% | 15 | ✅ | ❌ | 11-1-2-3-3-8 | 腳 (Leg) | — |
| 9 | GENEVA | 6.4% | 27.7% | 18 | ✅ | ❌ | 4-4-1-2-3-5 | — (replaced by #1) | — |
| 12 | AKASHVANI | 1.8% | 10.1% | 54 | ❌ | ❌ | 7-6-13-8-10-7 | — | — |
| 14 | KING OF FIGHTERS | 0.4% | 3.0% | 87 | ❌ | ❌ | 9-7-1-5-6-9 | — | — |
| 1 | BEAUTY BOLT | 0.3% | 2.9% | 9.8 | ❌ | ✅ | 9-2-9-6-13-7 | 腳 (Leg) (replacement for #9) | — |
| 3 | MIGHTY MASTS | 0.3% | 2.8% | 13 | ❌ | ❌ | 8-3-3-1-2-6 | — | — |
| 4 | EMBLAZON | 0.2% | 1.9% | 77 | ❌ | ❌ | 12-7-9-10-14-1 | — | — |
| 7 | GARRIX | 0.1% | 1.0% | 40 | ❌ | ❌ | no HK form | — | — |
| 11 | SKY HEART | 0.1% | 1.0% | 18 | ❌ | ❌ | 10-3-3-6-5-4 | — | — |

Market: Overround 22.7%. The market has #8 BABY SAKURA (3.0) and #13 NYX GLUCK (3.1) as co-favourites, then #1 BEAUTY BOLT (9.8) and #6 AEROINVINCIBLE (11). MC makes #6 a clear top pick at 34.7% (about 9% implied at 11), and the analyzer flags it as undervalued by 281%. It also flags #10 CHILL BUDDY as undervalued by 155% (14.1% MC vs 18 SP) and #11 SKY HEART as overvalued by 99%. MC has the two favourites at 19.8% (#13) and 15.2% (#8), roughly in line with or below their implied ~30%. #1 BEAUTY BOLT (9.8) gets only 0.3% win on MC. The analyzer's own bets were Place #6 @3.50 and Place #10 @3.91 (HK$500 each).

---

## STRATEGY A

### HORSE RANKINGS

SCMP was unavailable, so all factors are 0 and Adj% = MC%.

| # | Horse | MC Win% | MC Place% | Adj Win% factor | Adj Place% factor | Adj Win% | Adj Place% | Odds | Jockey | Style | SCMP Flags | Role |
|---|-------|---------|-----------|-----------------|-------------------|----------|------------|------|--------|-------|------------|------|
| 6 | AEROINVINCIBLE | 34.7% | 71.5% | 0 | 0 | 34.7% | 71.5% | 11 | H Y Yuen | — | — (n/a) | ★ 膽 (Banker) |
| 13 | NYX GLUCK | 19.8% | 56.7% | 0 | 0 | 19.8% | 56.7% | 3.1 | Z Purton | — | — (n/a) | 腳 (Leg) |
| 8 | BABY SAKURA | 15.2% | 46.7% | 0 | 0 | 15.2% | 46.7% | 3.0 | C Y Ho | — | — (n/a) | 腳 (Leg) |
| 10 | CHILL BUDDY | 14.1% | 46.6% | 0 | 0 | 14.1% | 46.6% | 18 | C L Chau | — | — (n/a) | 腳 (Leg) |
| 5 | ENDUED | 6.5% | 28.1% | 0 | 0 | 6.5% | 28.1% | 15 | A Atzeni | — | — (n/a) | 腳 (Leg) |
| 9 | GENEVA | 6.4% | 27.7% | 0 | 0 | 6.4% | 27.7% | 18 | J Orman | — | — (n/a) | 腳 (Leg) |
| 12 | AKASHVANI | 1.8% | 10.1% | 0 | 0 | 1.8% | 10.1% | 54 | B Avdulla | — | — (n/a) | — |
| 14 | KING OF FIGHTERS | 0.4% | 3.0% | 0 | 0 | 0.4% | 3.0% | 87 | A Badel | — | — (n/a) | — |
| 1 | BEAUTY BOLT | 0.3% | 2.9% | 0 | 0 | 0.3% | 2.9% | 9.8 | P N Wong | — | — (n/a) | — |
| 3 | MIGHTY MASTS | 0.3% | 2.8% | 0 | 0 | 0.3% | 2.8% | 13 | K Teetan | — | — (n/a) | — |
| 4 | EMBLAZON | 0.2% | 1.9% | 0 | 0 | 0.2% | 1.9% | 77 | K C Leung | — | — (n/a) | — |
| 7 | GARRIX | 0.1% | 1.0% | 0 | 0 | 0.1% | 1.0% | 40 | L Ferraris | — | — (n/a) | — |
| 11 | SKY HEART | 0.1% | 1.0% | 0 | 0 | 0.1% | 1.0% | 18 | E C W Wong | — | — (n/a) | — |

Note: ★ 膽 = Banker (1st by Adj Win%; #6 has 10 form lines, so it is eligible). #13 has Adj Place% 56.7%, below the 63% needed for 雙膽拖.

**Reasoning:** The top Adj Win% is 34.7% (#6 AEROINVINCIBLE), just under the 35% Dominant line, which makes the race Competitive, so it uses Mode B. The pool is the top 3 by Adj Win% (#6, #13, #8) plus the next 3 by Adj Place% (#10 46.6%, #5 28.1%, #9 27.7%). Those are exactly the six horses with Adj Place% ≥ 25%, and no other horse is above 20%.

- **#6 AEROINVINCIBLE** has a 1-4-2-1-4-1 form line, won its last start (27-Sep), and has 8 runs at the trip. It has draw 6 and 125 lb, and P C Ng is the best trainer strike rate in the field (18% from 66).
- **#13 NYX GLUCK** has Purton (22% from 102 rides), the lowest weight among the main contenders (121 lb) and 9 runs at the trip. It was 10th last start (13-Sep) after a 1-1-3-2-4 run, and draws 11.
- **#8 BABY SAKURA** has a 1-1-4-1-3-3 form line from draw 2 and is the market favourite. It has only 7 recorded runs.
- **#10 CHILL BUDDY** won its last start (1-Oct) and has a 2-2-1 run in its last three, but only 1 run at the trip.
- **#5 ENDUED** (draw 3) and **#9 GENEVA** (draw 5) fill the last two slots. #5 returns from ~99 days off with 0 runs at the trip.

The finish-time projection has #5 ENDUED fastest (1:19.98), 1.1s clear of #10 and #12. MC rates #5 only 5th (6.5%) because of its 0 trip runs and its layoff. #1 BEAUTY BOLT (9.8) and #3 MIGHTY MASTS (13) are market horses outside the Strategy A pool on MC. Rule 9 does not apply to them because there are no SCMP negative flags; they are out on MC Place% alone (2.9% and 2.8%). No pace read is available without SCMP Star Form.

### TRIO POOL (any order)

```
POOL: #6, #13, #8, #10, #5, #9
MODE: B | POOL SIZE: 6

膽拖 STRUCTURE (1st-ranked horse = Banker):
膽 (Banker): #6 AEROINVINCIBLE (Adj Place% 71.5%) ← locked in every combo
腳 (Legs):  #13, #8, #10, #5, #9
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
```

TOP TRIO COMBINATIONS (Harville approximation from MC Win%):

| Rank | Horses (any order) | Combined Prob. | Est. Fair Odds |
|------|-------------------|----------------|----------------|
| 1 | #6, #13, #8 | 16.0% | $6.3 |
| 2 | #6, #13, #10 | 14.6% | $6.8 |
| 3 | #6, #8, #10 | 10.4% | $9.6 |
| 4 | #6, #13, #5 | 6.1% | $16.3 |
| 5 | #6, #13, #9 | 6.0% | $16.6 |

### TICKET SUMMARY (Strategy A)

```
COMBINATIONS: 10 (膽拖: banker #6, legs 13, 8, 10, 5, 9 → C(5,2))
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

ALL COMBINATIONS (est. prob):
  6-13-8 16.0% | 6-13-10 14.6% | 6-8-10 10.4% | 6-13-5 6.1% | 6-13-9 6.0%
  6-8-5 4.4%   | 6-8-9 4.3%    | 6-10-5 4.0%  | 6-10-9 3.9% | 6-5-9 1.6%
  Ticket coverage (sum): ~71.4%
  Banker #6 top 3 (MC Place%): 71.5%

PASS CONDITIONS:
- If #6 AEROINVINCIBLE (banker) is scratched → VOID ticket
- If field drops below 3 → pool refunded
- If going changes to Yielding/Heavy → reconsider (MC run on Good to Firm)

CONFIDENCE: MEDIUM (clear MC #1 with 71.5% place, and the six-horse pool holds every horse MC gives ≥10% place. But the market has #6 at 11, about a quarter of MC's win figure, so the ticket depends on the model being right against the market on the banker.)
```

---

## STRATEGY B (MC-only)

```
Banker: #6 AEROINVINCIBLE (MC Win% 34.7%, MC Place% 71.5%) ← 1st by MC Win%
Primary legs (MC Place% > 20%): #13 (56.7%), #8 (46.7%), #10 (46.6%), #5 (28.1%), #9 (27.7%)
Replaceable legs (MC Place% 20–30% AND Win odds > 10): #5 ENDUED (MC Place% 28.1%, Win odds 15), #9 GENEVA (MC Place% 27.7%, Win odds 18)
Win-odds candidates (MC Place% ≤ 20% AND Win odds < 10): #1 BEAUTY BOLT (Win odds 9.8, MC Place% 2.9%)
Action: #1 replaced #9 (lowest MC Place% among replaceable legs; 1-for-1 swap)
Final legs: #13, #8, #10, #5, #1
BET STRUCTURE: 膽拖 | 1膽 + 5腳 | COMBINATIONS: C(5,2) = 10
UNIT BET: $10 (fixed)
TOTAL STAKE: $100

STRATEGY B TICKET: 膽 #6 / 腳 #13, #8, #10, #5, #1
  6-13-8 16.0% | 6-13-10 14.6% | 6-8-10 10.4% | 6-13-5 6.1% | 6-8-5 4.4%
  6-10-5 4.0%  | 6-13-1 0.3%   | 6-8-1 0.2%   | 6-10-1 0.2% | 6-5-1 0.1%
  Ticket coverage (sum): ~56.2%
```

Comparison: Both strategies use the same banker, the same cost ($100) and 6 of the same 10 combos. The only difference is the last leg. Strategy A uses #9 GENEVA (MC Place% 27.7%, 18 SP) and Strategy B swaps in #1 BEAUTY BOLT (MC Place% 2.9%, 9.8 SP), which the market rates as the 3rd favourite. By MC, Strategy A has the higher coverage (~71.4% vs ~56.2%). Strategy B is the better ticket only if the market is right about #1, which MC rates almost no chance.

---

## CAVEATS

- **Retrospective run:** generated 2026-10-20, blind to results. The scheduled pre-race run was missed.
- **Odds are final SP, not morning odds.** They include late market moves that a pre-race run would not have seen. That affects the Strategy B win-odds candidate (#1 at 9.8, just under the 10 cut-off), the replaceable-leg test (#5 at 15, #9 at 18), and the undervalued/overvalued flags (#6 at 11).
- **SCMP unavailable (retrospective run).** There are no Star Form, TIR, vet, trackwork, QP/Q matrix or running-style inputs. Strategy A adjustments are all 0, so Adj% = MC%. Strategy B is unaffected.
- **#2 is absent from the snapshot** (presumed scratched). The field is 13 runners.
- **Borderline classification:** #6 at 34.7% Adj Win% is 0.3 points short of Dominant (Mode A, 5-horse pool). With SCMP adjustments, the race could have tipped either way.
- **Large model/market disagreement on the banker:** MC 34.7% win vs 11 SP (~9% implied). MC also rates #1 BEAUTY BOLT at 0.3% against 9.8 SP and #3 MIGHTY MASTS at 0.3% against 13 SP.
- **Projection conflict:** the finish-time projection has #5 ENDUED fastest, with #10 and #12 next and #6 4th. MC ranks #5 only 5th.
- **Layoffs:** #11 (~183 days), #3 (~128 days), #5 (~99 days, a Strategy A and B leg). #7 GARRIX has no HK form in the snapshot.
- Trio combination probabilities are a Harville approximation from MC Win%, not direct MC trio counts.
- Historical sync, odds fetch and racecard scrape were intentionally not run. The data is the prepared leak-free snapshot. `careerStarts` is unpopulated in the snapshot, so banker eligibility used the form lines.

```
═══════════════════════════════════════════════════════════
```
