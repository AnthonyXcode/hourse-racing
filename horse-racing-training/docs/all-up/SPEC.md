# All Up (過關) betting: product spec

Owner: PM · Status: draft for Design / Eng / QA · Date: 2026-10-17

## 1. Summary

Add HKJC **All Up (過關)** bets to the bet builder for both practice and LIVE (credits) betting. In an All Up bet the backer picks 2–6 different races at one meeting and sets a pool and selections for each race (a **leg**). They also choose a **formula** (`2x1` … `6x63`) that sets which leg groups are bet. Each group's stake is carried leg by leg: a winning dividend is reinvested in the next leg, a refunded leg carries its stake forward unchanged, and a losing leg ends that line.

In this app, legs can use **WIN, PLA, QIN, QPL and TRI** in any mix ("Cross Pool All Up"). If any leg is TRI the bet is capped at 3 legs. The unit is $10 or more **per bet line**. Settlement multiplies each leg's per-$10 dividend factor across the line, with no rounding until the ticket total.

---

## 2. HKJC rules (researched)

Sources:
- S1 HKJC Beginner's Guide, *Local Pools* (All Up / Cross Pool All Up table): https://special.hkjc.com/e-win/en-US/betting-info/racing/beginners-guide/local-pools/
- S2 HKJC Beginner's Guide, *All Up Betting* (formula table, withdrawal note): https://special.hkjc.com/e-win/en-US/betting-info/racing/beginners-guide/all-up-betting/
- S3 HKJC Horse Racing Betting Guide: https://is.hkjc.com/AOSBS/help/en/HR_Guide.html
- S4 HKJC Horse Race Betting Rules, Rule 3 (Pari-mutuel): https://www.hkjc.com/english/betting/template_betting_rule_files/pdf/HorseRace_Rule_3_Eng.pdf
- S5 Rule 1 (Definitions): https://www.hkjc.com/english/betting/template_betting_rule_files/pdf/HorseRace_Rule_1_Eng.pdf
- S6 Rule 2 (General): https://www.hkjc.com/english/betting/template_betting_rule_files/pdf/HorseRace_Rule_2_Eng.pdf

| # | Rule | Source |
|---|---|---|
| R1 | You bet in the same or different pools across **2 to 6 races**. "Any dividend entitlement from a winning Leg will be automatically carried forward and reinvested in the subsequent Leg." | S1, S3 |
| R2 | **All Up** means the same pool in every leg; **Cross Pool All Up** allows a different pool per leg. Eligible pools are **WIN, PLA, QIN, QPL** (2–6 races) and **FCT, TRI** (max **3 races**, including any cross-pool bet that has an FCT/TRI leg). Tierce, First 4, Quartet, Double, Treble, DT, TT and Six Up are **not** eligible. | S1, S2, S3 |
| R3 | A **Leg** is "each nominated race". The legs run in race order: the first race to run is the 1st Leg. Legs are distinct races. | S5 |
| R4 | All Up is **not** available between local and overseas races, so in practice every leg is at the same local meeting. | S3 |
| R5 | **Formula** `N x M` covers N races and M lines in total. Each formula is a fixed set of leg-group sizes (table in §2.1). | S2 |
| R6 | **Withdrawal (scratching)**: "the Bet on a Withdrawal in a one-race combination will be refunded" and "the Bet on a Withdrawal in a multi-Leg combination will be carried forward to the next Leg" (Rule 3.9(c)). No new bets involving a declared withdrawal are accepted (3.9(d)). | S4, S2 |
| R7 | **Carried-forward value**: in All Up betting, the value of a bet includes "any Dividend entitlement and/or Refund which has been carried forward and tendered as a Bet". This means a refunded leg carries the **stake** forward (factor ×1). | S5 |
| R8 | **Void race**: for a single-race pool, bets are refunded in full (3.14(a)). An All Up leg in a single-race pool therefore becomes a refund, which carries forward under R7. | S4 |
| R9 | **Dividends** are declared per Unit Bet ($10). WIN, PLA, QIN and QPL are in $0.50 steps (minimum $10.50 WIN/QIN/QPL, $10.10 PLA); other pools such as TRI are in $1 steps (3.7). Dead-heat dividends are declared per winning combination (3.10). | S4 |
| R10 | **Ticket rounding**: a ticket's dividend and/or refund "will be paid in multiples of 50 cents … rounded up or rounded down to the nearest 50 cents" (2.19(a)). | S6 |
| R11 | **Cap**: "For All Up Betting, the Operator may limit the amount of any Dividend entitlement which may be carried forward" (2.5(d)). HKJC publishes no fixed figure. | S6 |
| R12 | **Rebates** on losing All Up bets of $10,000 or more follow the pool of the losing leg. | S3 |

### 2.1 Formula table (S2)

Columns show how many lines of each leg-group size the formula contains: `1` = singles, `2` = doubles, and so on. `size set` is the set of group sizes the formula bets; every subset of the chosen legs with a size in that set is one line group.

| Formula | 1 | 2 | 3 | 4 | 5 | 6 | size set |
|---|---|---|---|---|---|---|---|
| 2x1 | | 1 | | | | | {2} |
| 2x3 | 2 | 1 | | | | | {1,2} |
| 3x1 | | | 1 | | | | {3} |
| 3x3 | | 3 | | | | | {2} |
| 3x4 | | 3 | 1 | | | | {2,3} |
| 3x6 | 3 | 3 | | | | | {1,2} |
| 3x7 | 3 | 3 | 1 | | | | {1,2,3} |
| 4x1 | | | | 1 | | | {4} |
| 4x4 | | | 4 | | | | {3} |
| 4x5 | | | 4 | 1 | | | {3,4} |
| 4x6 | | 6 | | | | | {2} |
| 4x10 | 4 | 6 | | | | | {1,2} |
| 4x11 | | 6 | 4 | 1 | | | {2,3,4} |
| 4x14 | 4 | 6 | 4 | | | | {1,2,3} |
| 4x15 | 4 | 6 | 4 | 1 | | | {1,2,3,4} |
| 5x1 | | | | | 1 | | {5} |
| 5x5 | | | | 5 | | | {4} |
| 5x6 | | | | 5 | 1 | | {4,5} |
| 5x10 | | 10 | | | | | {2} |
| 5x15 | 5 | 10 | | | | | {1,2} |
| 5x16 | | | 10 | 5 | 1 | | {3,4,5} |
| 5x20 | | 10 | 10 | | | | {2,3} |
| 5x25 | 5 | 10 | 10 | | | | {1,2,3} |
| 5x26 | | 10 | 10 | 5 | 1 | | {2,3,4,5} |
| 5x30 | 5 | 10 | 10 | 5 | | | {1,2,3,4} |
| 5x31 | 5 | 10 | 10 | 5 | 1 | | {1,2,3,4,5} |
| 6x1 | | | | | | 1 | {6} |
| 6x6 | | | | | 6 | | {5} |
| 6x7 | | | | | 6 | 1 | {5,6} |
| 6x15 | | 15 | | | | | {2} |
| 6x20 | | | 20 | | | | {3} |
| 6x21 | 6 | 15 | | | | | {1,2} |
| 6x22 | | | | 15 | 6 | 1 | {4,5,6} |
| 6x35 | | 15 | 20 | | | | {2,3} |
| 6x41 | 6 | 15 | 20 | | | | {1,2,3} |
| 6x42 | | | 20 | 15 | 6 | 1 | {3,4,5,6} |
| 6x50 | | 15 | 20 | 15 | | | {2,3,4} |
| 6x56 | 6 | 15 | 20 | 15 | | | {1,2,3,4} |
| 6x57 | | 15 | 20 | 15 | 6 | 1 | {2,3,4,5,6} |
| 6x62 | 6 | 15 | 20 | 15 | 6 | | {1,2,3,4,5} |
| 6x63 | 6 | 15 | 20 | 15 | 6 | 1 | {1,…,6} |

(The `M` in `N x M` equals Σ C(N,k) over the size set. The table is checked on that basis: every row is consistent.)

### 2.2 Multiple selections, bankers and cost (HKJC practice, derived from the rules)

A **bet line** is one combination per leg in one leg group. For leg `i`, let `n_i` be the number of combinations its selection makes in its own pool: WIN/PLA = number of horses; QIN/QPL = pairs, using bankers if any; TRI = triples, using bankers if any. The same per-race combination rules already apply in the app.

```
lines  = Σ over leg groups G in the formula of  Π_{i ∈ G} n_i
cost   = lines × unit
```

> Correction to the brief: `units × formula combos × Π selections` is correct **only** for `Nx1` formulas, where the single group contains every leg. Groups of other sizes multiply only their own legs. For example, `3x7` with n = (2,1,1) gives 4 singles + 5 doubles + 2 trebles = **11 lines**, not 7 × 2 = 14.

Minimum unit: $10 per line (HKJC Unit Bet; S3 also lists a $1 Flexi minimum, see §10). Bankers: QIN/QPL allow 1 banker per leg and TRI allows up to 2, as for single-race bets.

---

## 3. Scope for this app

Pools in the app now (`shared/betEngine/index.ts`, `BET_TYPES`): win, place, quinella, qpl, trio, tierce, first4, doubleTrio, tripleTrio. The Win/Place page sends WIN and PLA as two separate single bets, so there is no W-P bet type.

| Pool | HKJC All Up | In MVP |
|---|---|---|
| WIN (`win`) | yes, 2–6 legs | **yes** |
| PLA (`place`) | yes, 2–6 legs | **yes** |
| QIN (`quinella`) | yes, 2–6 legs | **yes** |
| QPL (`qpl`) | yes, 2–6 legs | **yes** |
| TRI (`trio`) | yes, max 3 legs | **yes** |
| FCT (Forecast) | yes, max 3 legs | no (pool not in app) |
| Tierce, First 4, DT, TT | not eligible | no |
| W-P as a leg pool | unverified | no (§10) |

MVP covers both modes. **Practice** settles instantly against stored results. **LIVE** takes a credits stake, places only while every leg race is `open`, and is settled by the sweep.

---

## 4. User stories

1. As a learner, I can open an **All Up (過關)** pool page, pick 2–6 races at the current meeting, and set a pool and horses for each, so I can practise HKJC All Up.
2. As a learner, I can choose a formula from a list that offers only the formulas for my leg count (and at most 3 legs when a TRI leg is in the bet). I see the lines and total cost update live.
3. As a learner, I can use bankers in QIN/QPL/TRI legs and pick several horses in any leg.
4. As a learner, I add the bet to the slip and see it as one item, e.g. "All Up 3x7 · R4 WIN 5 | R5 PLA 2,8 | R6 QIN 1,4,9", with `$10 × 23 lines = $230`.
5. As a learner in practice, I confirm and see a per-leg breakdown: each leg's result, its dividend factor, which lines won, and the total return.
6. As a member in LIVE, I place an All Up bet with credits. It settles after its last leg; scratchings and void races carry forward or refund exactly as HKJC does.
7. As a member, I see All Up bets in History and My Bets with their formula, legs, and per-leg outcome.

---

## 5. Data model (fits existing types)

All Up is a **new `BetTypeId` `"allUp"`**. It reuses `RaceLeg` and adds a per-leg pool and a bet-level formula. A LIVE bet stays one row in `live_bets` (`bet_type = 'allUp'`, `selection` JSON, `combos` = lines), so **no DB migration** is needed.

```ts
// shared/types.ts
export type AllUpPool = "win" | "place" | "quinella" | "qpl" | "trio";
export type BetTypeId = ... | "allUp";

export interface RaceLeg {
  raceNumber: number;
  bankers: number[];
  legs: number[];
  /** All Up only: this leg's pool. Required when BetSelection.type === "allUp". */
  pool?: AllUpPool;
}
export interface BetSelection {
  type: BetTypeId;
  raceLegs: RaceLeg[];          // All Up: 2–6 legs, sorted by raceNumber
  /** All Up only, e.g. "3x7". */
  formula?: AllUpFormula;
}
export type AllUpFormula = "2x1" | "2x3" | "3x1" | ... | "6x63";   // the 41 rows of §2.1

// shared/betEngine/allUp.ts (new)
export const ALL_UP_FORMULAS: Record<AllUpFormula, { legs: number; sizes: number[] }>;
export const ALL_UP_MAX_LEGS = 6, ALL_UP_TRIO_MAX_LEGS = 3;

// SettleResult additions (optional, All Up only)
allUp?: {
  formula: AllUpFormula;
  legs: {
    raceNumber: number; pool: AllUpPool;
    combos: number;            // n_i
    winningCombos: number;     // combos that won in this leg
    refundedCombos: number;    // scratched / void → carried forward
    factor: number;            // F_i (see §6), per $1 staked
    dividendText: string;      // e.g. "$45.5" or "$31.5 / $28" or "VOID"
    status: "won" | "lost" | "refund" | "hold";
  }[];
  linesWon: number;            // lines with a non-zero return
  refund: number;              // part of the return from lines whose every leg refunded (per $10 unit)
};
// SettleDetail additions
| { code: "allUpHit"; formula: string; linesWon: number; lines: number }
| { code: "allUpMiss"; formula: string; race: number }   // first leg that killed the last line
| { code: "allUpVoid" }
```

- `countCombos(sel)` returns `lines` (§2.2) for `allUp`, and `BET_TYPES.allUp` delegates to it. `cost = lines × UNIT`. `n_i` = `BET_TYPES[leg.pool].legCombos(leg)`.
- `SlipItem.combos` / `LiveBet.combos` / `HistoryEntry.combos` = lines. `betLabel` = `"All Up 3x7"`.
- `picksText` / `useSlipText.picks` prefix each leg with its pool code: `R4 WIN 5 | R5 PLA 2,8 | R6 QIN 膽1 腳4,9`.
- `poolDividend = null`. `poolDividendText` lists per-leg dividends joined by ` × `, e.g. `R4 $38 × R5 $17.5 / … × R6 $210`.
- `legResults`: one per leg, as for DT/TT (`covered` = the leg had a winning or refunded combo).
- History `result` string: same multi-race form as DT/TT (`R4:5-2-8-1  R5:…`).

---

## 6. Settlement algorithm

Inputs: the selection (legs sorted by race), `unit`, the results per race, scratchings per race (`scratchedIn`), and race statuses (void).

**Step 1: per-leg factor.** For each leg `i` (pool `p_i`, `n_i` combos as placed):
1. **Void race** (`status = void`, abandoned, or no race): `refunded_i = n_i`, `W_i = 0`.
2. Otherwise, for scratched horses (R6): a combination that includes a scratched horse is a **refunded combination**. A scratched banker refunds every combination of that leg. `refunded_i` = `n_i − countCombos(leg without scratched horses)`, or `n_i` if a banker is scratched.
3. Grade the remaining (effective) leg as a **single-race bet of pool `p_i`** with the existing engine (`settle` on `{type: p_i, raceLegs:[effLeg]}`). `W_i` = its payout per $10, which is the **sum of the per-$10 dividends of every winning combination covered** (PLA: sum of placed horses' dividends; QPL: sum of covered pairs; TRI: trio dividend × combos won). A miss gives `W_i = 0`.
4. `F_i = W_i / 10 + refunded_i` is the leg's return per $1 placed on each of its combinations. `R_i = refunded_i`.
5. If the leg needs an operator (§7: dead heat with no official dividend, missing dividend, or a runner of unknown fate), the bet is **held** (LIVE) or the payout is `null` (practice).

**Step 2: combine.** Because every line takes exactly one combination per leg in its group, the sum over all lines factorises:

```
gross  = unit × Σ_{G ∈ formula groups} Π_{i ∈ G} F_i       // total return
refund = unit × Σ_{G ∈ formula groups} Π_{i ∈ G} R_i       // lines whose every leg was refunded
payout = gross − refund
stake  = lines × unit
```

- Compute this **exactly**. Dividends are multiples of $0.5, so use integer arithmetic (dividends × 2) or rationals. Do not round between legs.
- **Rounding.** Practice (HK$) rounds `gross` to the nearest $0.50 (R10), with exact quarters rounded up. LIVE (credits) keeps the existing credits rule (docs/credits/PRD.md): `payout = floor(payout)` and `refund = refund`. Refunds are always whole multiples of unit, so they need no rounding.
- **Status.** `void` if `refund = stake` (every line fully refunded). Otherwise `won` if `payout > 0` and `lost` if `payout = 0`.
- **Timing.** LIVE waits until **every** leg race is resulted or void. A ticket pays after its final leg, so there is no early loss settlement in the MVP.
- Leg order does not change the maths. "Carry forward" is a product, so the race order only fixes the display and the leg order (R3).

### 6.1 Worked examples (unit $10 unless stated)

**Ex 1: 2x1, WIN → WIN.** R1 WIN {3}; R2 WIN {7}. n = (1,1), lines = 1, stake $10.
R1: #3 wins, WIN $45.5, so F1 = 4.55. R2: #7 wins, WIN $23, so F2 = 2.3.
gross = 10 × 4.55 × 2.3 = **$104.65**. Practice pays **$104.50** (nearest $0.5), net +$94.50. LIVE pays **104** credits.
Variant: if #7 finishes 2nd, F2 = 0, return $0, `lost`.

**Ex 2: 3x7 cross pool.** R4 WIN {5} (n=1); R5 PLA {2,8} (n=2); R6 QIN {1,4,9} (n=3 pairs).
lines = singles (1+2+3) + doubles (1·2 + 1·3 + 2·3) + treble (1·2·3) = 6 + 11 + 6 = **23**, stake **$230**.
Results: R4 #5 wins WIN $38, so F4 = 3.8. R5: #2 3rd PLA $17.5, #8 unplaced, so F5 = 1.75. R6: 1st-2nd = 4, 9, QIN $210, so F6 = 21.0.
singles 3.8 + 1.75 + 21 = 26.55
doubles 3.8·1.75 + 3.8·21 + 1.75·21 = 6.65 + 79.8 + 36.75 = 123.2
treble 3.8·1.75·21 = 139.65
gross = 10 × 289.4 = **$2,894.00**, payout $2,894, refund $0, net **+$2,664**, `won`. linesWon = 1+1+1 + 1+1+1 + 1 = 7.

**Ex 3: 3x4 with a scratching and a void race.** R2 QIN banker 6, legs {1,3} (n=2: 6-1, 6-3); R3 WIN {4} (n=1); R5 PLA {7} (n=1).
lines = doubles (2·1 + 2·1 + 1·1) + treble (2·1·1) = 5 + 2 = **7**, stake **$70**.
After placing: #3 in R2 is scratched, so 6-3 is a refunded combo. R2 result 1st 6, 2nd 1, QIN $64. Then F2 = 6.4 + 1 = 7.4 and R2 = 1.
R3 is declared **void**: F3 = 1, R3 = 1. R5: #7 unplaced: F5 = 0, R5 = 0.
gross = 10 × [F2F3 + F2F5 + F3F5 + F2F3F5] = 10 × [7.4 + 0 + 0 + 0] = **$74**
refund = 10 × [R2R3 + 0 + 0 + 0] = **$10** (the line "6-3 × #4" is fully refunded); payout = **$64**.
Net = 74 − 70 = **+$4**, status `won`. In LIVE, the ledger gets `bet_payout 64` and `bet_refund 10`.

**Ex 4: 2x1 QPL → TRI with multiple winning combos.** R7 QPL {2,5,11} (n=3); R8 TRI banker 4, legs {1,6,9} (n=C(3,2)=3). lines = 9, stake **$90**.
R7 top 3 = 2-11-5, so all 3 pairs win: QPL 2-11 $31.5, 2-5 $28, 5-11 $40.5, giving F7 = 10.0. R8 1st-3rd = 4, 9, 6, TRI $356. Only 4-6-9 wins, so F8 = 35.6.
gross = 10 × 10.0 × 35.6 = **$3,560**, net **+$3,470**, linesWon = 3.

**Ex 5: everything void.** 2x3, R1 WIN {2}, R2 WIN {5}, and both races abandoned. lines = 3, stake $30. F = R = (1,1), so gross = refund = 10 × (1 + 1 + 1) = $30, payout 0. Status **void**, full refund.

---

## 7. Edge cases

| Case | Rule |
|---|---|
| Horse scratched before placing (LIVE) | Rejected `scratched_runner` (R6: no bets accepted on a declared withdrawal). Practice picker hides scratched horses, as today. |
| Scratched after placing, in a **single** line (formula with singles) | That combo's single is refunded: falls out of `refund` (Ex 3 logic, group size 1). |
| Scratched after placing, multi-leg line | Carried forward ×1 (factor 1); not refunded unless every leg of the line is refunded. |
| Scratched **banker** (QIN/QPL/TRI leg) | Every combo of that leg is refunded/carried forward (`refunded_i = n_i`). Unlike single bets, the **whole bet is NOT voided**. |
| Void / abandoned leg race | `F_i = R_i = n_i`. Other legs settle normally. |
| Every leg void, or every line fully refunded | Status `void`, refund = stake. |
| Dead heat in a leg | Use the existing `deadHeatAffects(pool, leg)`. If it matters, use the HKJC official per-combination dividends (`officialReturn` for that single leg). If they are missing: LIVE **holds** (`dead_heat`), practice returns `payout: null` ("dividend unavailable"). Dead heats always give per-combination dividends, so `W_i` sums them. |
| Missing dividend for a winning leg | LIVE hold `missing_dividend`. The operator's `resolve-bet --dividend` must take **per-leg** dividends for All Up (`--leg R:div`, see AC-27). |
| Horse of unknown fate | LIVE hold `runner_unknown` (existing rule, applied per leg). |
| Insufficient finishers (e.g. QPL with 2 finishers) | Use the stored dividends. If a winning combo has no dividend, hold. Rare, so no special maths in MVP. |
| Losing leg early | No early settlement (MVP). The bet stays `pending` until the last leg. |
| Huge returns | No carry-forward cap in MVP (R11 is operator discretion). `stake ≤ LIVE_MAX_STAKE` applies as today. |
| Same horse number in different legs | Allowed: different races. |
| Two legs on the same race (e.g. WIN and PLA R3) | Rejected: legs must be distinct races (R3). |
| Odd unit (e.g. $15) | Allowed (≥ 10, integer). Practice rounds the total to $0.5; LIVE floors. |
| Meeting has a TRI leg + 4 legs | Rejected `all_up_too_many_legs`. |

---

## 8. Validation rules (server is authoritative; the client mirrors them)

V1. `type === "allUp"`. `raceLegs.length` ∈ [2, 6]. `formula` is one of the 41 formulas, and `ALL_UP_FORMULAS[formula].legs === raceLegs.length`.
V2. Every leg has `pool` ∈ {win, place, quinella, qpl, trio}. If any leg is `trio`, `raceLegs.length ≤ 3`.
V3. Race numbers are distinct, and every race is at the request's single `date`/`venue`. The server stores legs sorted ascending by race number.
V4. Per leg, the existing single-race rules for its pool apply: horse ids are integers 1–99, unique, and at most 30. Bankers are only allowed in QIN/QPL (≤ 1) and TRI (≤ 2), and are disjoint from legs. WIN/PLA have no bankers. `n_i ≥ 1`.
V5. `unit` is an integer ≥ 10 (`MIN_UNIT` / `MIN_LIVE_UNIT`). `combos`/`cost` from the client are ignored and recomputed (`lines × unit`).
V6. LIVE: every leg race's status is `open`. Every horse is on the card and not scratched. `stake ≤ cfg.maxStake`. The existing slip, idempotency and balance rules apply.
V7. Practice: the meeting has results for every leg race. Otherwise `POST /api/settle` returns 400 `no result for selected race`.
V8. Error codes: reuse `invalid_selection` for shape errors. Add `all_up_too_many_legs` (V2) and `all_up_bad_formula` (V1). These need client localisation in en and zh-HK.

---

## 9. Acceptance criteria (QA)

Builder / cost
- **AC-1** The pool menu shows **All Up / 過關**. Selecting it lets the user pick 2–6 races at the current meeting. A 7th race cannot be added.
- **AC-2** Each chosen leg has a pool selector offering exactly WIN, PLA, QIN, QPL, TRI. Tierce, First 4, DT and TT are not offered.
- **AC-3** With a TRI leg chosen, the user cannot have more than 3 legs: a 4th race can't be added, and a TRI pool can't be picked while 4+ legs are chosen.
- **AC-4** The formula selector lists exactly the formulas in §2.1 for the current leg count (2 legs: 2x1, 2x3; 3 legs: 3x1, 3x3, 3x4, 3x6, 3x7; 4: 8 formulas; 5: 11; 6: 15). It defaults to `Nx1`.
- **AC-5** Lines and cost follow §2.2. The UI shows **23 lines / $230** for Ex 2 at $10, **7 / $70** for Ex 3, **9 / $90** for Ex 4, and **11** lines for 3x7 with n=(2,1,1).
- **AC-6** Changing the unit to $20 doubles the cost. A unit below 10 or a non-integer unit can't be added.
- **AC-7** Bankers are available in QIN/QPL (max 1) and TRI (max 2) legs and not in WIN/PLA legs. Leg combos match the single-race pool counts.
- **AC-8** Add is disabled until every leg has ≥ 1 combination and a formula is valid.

Slip / placement
- **AC-9** The slip shows one item with label `All Up 3x7`, race list, per-leg pool + picks, and `unit × lines = cost`.
- **AC-10** `POST /api/settle` and `POST /api/live-bets` reject: 1 leg, 7 legs, duplicate race, a leg with no pool, a Tierce pool, TRI with 4 legs (`all_up_too_many_legs`), and a formula/leg-count mismatch (`all_up_bad_formula`).
- **AC-11** LIVE rejects a bet where any leg race is not `open` (`race_closed` / `race_not_open` with that `raceNumber`) or any picked horse is scratched (`scratched_runner`).
- **AC-12** LIVE debits `lines × unit` credits once. A tampered client `combos` or `cost` is ignored.
- **AC-13** A placed LIVE All Up bet is stored as one `live_bets` row with `bet_type='allUp'`, `combos=lines`, and the formula and per-leg pools in `selection`.

Settlement (exact numbers)
- **AC-14** Ex 1 practice: return **$104.50** (from 104.65), net +$94.50. LIVE: payout **104**.
- **AC-15** Ex 2: return **$2,894**, net **+$2,664**, linesWon 7, status won.
- **AC-16** Ex 3: payout **$64**, refund **$10**, net **+$4**, status won. LIVE ledger has `bet_payout 64` and `bet_refund 10`.
- **AC-17** Ex 4: return **$3,560**.
- **AC-18** Ex 5 (all legs void): status **void**, refund = stake, payout 0.
- **AC-19** Any losing leg in an `Nx1` bet gives payout 0 and status `lost`, even if every other leg won.
- **AC-20** A 3x7 bet where only one leg wins pays exactly that leg's single(s): unit × F_i. Example: n=(1,1,1), R4 WIN $38, other legs lose → $38 at $10, `won`.
- **AC-21** The result is the same whatever order the legs are submitted in. The server stores them sorted by race.
- **AC-22** A practice result scales linearly with unit before rounding. Ex 2 at $15 gives $4,341.00.
- **AC-23** A PLA leg where two picked horses both place uses F = the sum of both place dividends / 10. A QPL leg covering 2 or 3 pairs sums those pairs.
- **AC-24** A scratched banker in a QIN leg does **not** void the bet. That leg's combos all carry forward ×1 (factor = n_i).
- **AC-25** A dead heat affecting a leg with no official dividend: LIVE bet held `dead_heat`, practice result `payout: null`. With official dividends present, it settles with the summed per-combination dividends.
- **AC-26** A LIVE All Up bet stays `pending` until every leg race is resulted or void, even if an earlier leg lost.
- **AC-27** Operator `resolve-bet` on a held All Up bet accepts per-leg dividends and settles using §6. `--void` refunds the full stake.

Display
- **AC-28** The result panel / My Bets show per leg: race, pool, picks, finishing order, dividend text, factor, and status (won/lost/refund/void). They also show totals (lines, stake, return, refund, net).
- **AC-29** History lists the bet as `All Up 3x7` with all leg results, and is filterable like other multi-race bets. Leaderboard pool stats count it under pool `ALLUP`.
- **AC-30** All new strings exist in **en** and **zh-HK** (`過關`, `場次`, `組合/注數`), and the UI follows DESIGN.md (§11 checklist).

---

## 10. Out of scope / open questions

- **Forecast (FCT)** legs: the pool doesn't exist in the app.
- **W-P as a single leg pool** (HKJC eWin may offer it; not verified). Users can place WIN and PLA as separate All Up bets.
- **Flexi Bet** (S3 lists a $1 minimum for All Up Flexi). The app has no Flexi; the unit stays ≥ $10 per line.
- **Rebates** (R12), carry-forward cap (R11), overseas legs (R4), and All Up across meetings.
- **Early "lost" settlement** once every line is dead, and partial cash-out.
- **Insufficient-finishers special payouts** beyond the stored dividends (they are held instead).
- **Bots, leaderboard bot strategies and model-pick integration** for All Up.
