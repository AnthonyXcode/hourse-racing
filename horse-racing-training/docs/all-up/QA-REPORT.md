# All Up (過關) QA report

QA · 2026-10-17 · Build under test: uncommitted working tree on `main` (after 1abb484)
Sources of truth: `docs/all-up/SPEC.md`, `docs/all-up/DESIGN-SPEC.md`, `DESIGN.md` §11.

## Verdict: SHIP WITH FIXES

The settlement maths is correct. My brute-force verifier, which enumerates every bet line separately from the code's elementary-sum method, agrees with the code to the cent on line counts, gross return, the practice $0.50 rounding, the LIVE floor, refunds and linesWon. That held in every scenario, including scratch carry-forward, void legs, dead heats with official dividends, odd units and 6x63. Server validation and error codes match SPEC §8. The builder, slip, confirm, result and day summary all work in en and zh-HK at 1280, 375 and 360 px, with no console errors.

There are no P0 or P1 bugs. Two P2 issues should be fixed before release:

- **QA-01:** a unit below $10, or a non-integer unit, is silently added at a different unit. This fails AC-6.
- **QA-02:** the result modal and the day summary/History show different amounts for the same non-All-Up bet. This is a side effect of the `fmt.cash` change.

The P3 items are polish.

## 1. Build gates

| Check | Result |
|---|---|
| `npm run typecheck` | PASS (exit 0) |
| `npm test` | PASS: 21 files, 363 tests (incl. `shared/betEngine/allUp.test.ts` 14, `server/allUp.test.ts` 23, `src/allUp/model.test.ts` 7) |
| `npm run build` | PASS (2.2 s; the existing >500 kB chunk warning is unchanged) |

## 2. Independent maths verification

I wrote a scratch script outside the repo. It enumerates every formula group and every per-leg combination explicitly, carries per-combination dividends forward, and uses exact bigint arithmetic. I compared its output with `settleAllUp` / `countCombos`.

**Line counts (hand-computed, then confirmed by brute force and by the code):**

| Formula | n per leg | Hand | Code |
|---|---|---|---|
| 3x4 | WIN{1,2}=2, QIN 膽3 腳{4,5,6}=3, PLA{7,8,9}=3 | 21 doubles + 18 trebles = **39** | 39 |
| 4x11 | PLA 2, QPL{1..4}=6, WIN 1, QIN{1,2,3}=3 | e2 47 + e3 72 + e4 36 = **155** | 155 |
| 5x31 | 1, 2, 3, 1, 2 | Π(1+n) − 1 = **143** | 143 |
| 6x63 | 2, 1, 3, 1, 1, 2 | Π(1+n) − 1 = **287** | 287 |
| 3x7 | TRI 膽1,2 腳4 legs = 4, WIN 3, PLA 1 | (5·4·2) − 1 = **39** | 39 |

**Settlement scenarios.** Expected values are from brute force; actual values are from the code.

| Scenario | Expected (practice payout / refund / LIVE payout / linesWon) | Actual | |
|---|---|---|---|
| S1 4x11 mixed, unit $15, PLA 2 placed, QPL 2 pairs | 9052.5 / 0 / 9052 / 18 (exact 9052.376) | same | OK |
| S2 6x63: **scratched** horse R3 (carry fwd), **void** R5, **WIN dead heat** R1 with official dividends | 32446 / 50 / 32446 / 138 | same | OK |
| S3 3x7: **scratched TRI banker** (whole leg ×1), unit $10 | 415 / 30 / 415 / 12 | same | OK |
| S4 5x31: all legs lose except 1 void | 0 / 10 / 0 / 0, status `lost` | same | OK |
| S5 3x4 unit $13 (rounding 100.095 → $100) | 100 / 0 / 100 / 7 | same | OK |
| S6 2x3 both void | 0 / 30, status `void` | same | OK |
| SPEC Ex1, Ex2, Ex3 | 104.5 (LIVE 104), 2894, 64 + 10 refund | same | OK |
| Live data via `/api/settle` 2026-09-23 HV: R1 WIN{4} R2 PLA{10,8} R3 QIN{8,2,1}, 3x7 | hand: 23 lines, 10 × 632.78225 = 6327.82 → **$6,328** | $6,328, 11/23 lines won | OK |
| Same meeting 2x1 R1 WIN 4 → R2 WIN 10, unit $10 and $20, legs submitted in reverse order | 284.375 → **$284.50**; 568.75 → **$569** | 284.5 / 569 | OK |

**API validation (`POST /api/settle`):** 1 leg, 7 legs, duplicate race, missing pool, Tierce pool and WIN with banker all return 400 `invalid_selection`. TRI with 4 legs returns `all_up_too_many_legs`. A formula/leg-count mismatch or a missing formula returns `all_up_bad_formula`. Units 9 and 10.5 return `unit_too_small`. A leg race with no result returns 400 `no result for selected race` (V7).

## 3. Bug list

### QA-01 · P2 · Unit < $10 or non-integer is added at a different unit (AC-6 fails in the UI)
**Repro:** Bet › All Up. Build any valid bet and set the unit to 20. Change the unit to `9` and click **Add**.
**Expected:** Add is blocked and shows the min-unit error (`stake.minUnit`, `aria-invalid`), as DESIGN-SPEC §4 says.
**Actual:** Add is enabled. Clicking it adds the bet at **$20** (the last valid unit) with no error (screenshot `qa-screens/09-en-unit-9-added-at-20.png`). Typing `10.5` passes the `bad` check (10.5 ≥ 10) and adds the bet at **$10**.
**Cause:** `StakeBar` (src/ui.tsx) runs `onBlur={() => setDraft(String(unit))}`. The input blurs when the user presses Add, so the draft is reset to the last valid unit before the click lands. Separately, `bad = !(Number(draft) >= MIN_UNIT)` does not reject non-integers. This StakeBar behaviour existed before All Up and affects every pool, including LIVE, where the confirm sheet does at least show the real stake. It still fails AC-6 as written.

### QA-02 · P2 · Result modal and day summary/History show different amounts for the same bet (regression from `fmt.cash`)
**Repro:** Practice 2026-09-23 R1. Add QIN {4,11} at $10 and WIN {4} at $15, then place both.
**Expected:** One amount per bet everywhere.
**Actual:**

| | QIN | WIN |
|---|---|---|
| Result modal (`fmt.money`, rounds to a whole dollar) | Payout **$97**, Net **+$87** | **$68** |
| My bets of the day (`fmt.cash`) | **$96.50**, **+$86.50** | **$68.25** |

Screenshots: `31-en-mixed-result.png`, `32-en-mixed-summary.png`. Before this change both views rounded to whole dollars. `fmt.cash` is the more accurate one (HKJC pays $96.50), so the result modal's per-bet Payout/Net should switch to `fmt.cash` too. The "All bets" totals line already uses `fmt.cash`. Otherwise other pools look fine: dividend text, combos, cost and hit status are unchanged.

### QA-03 · P3 · WIN/PLA leg picks shown as "L 4" / "腳 4"
DESIGN-SPEC §2 (leg list, Picks) says "WIN/PLA show plain numbers". The slip and confirm sheet do show `R1 WIN 4`. The result modal leg table, the day-summary Picks column (`R1 WIN L 4 | R2 PLA L 10,8 …`), the leg expander and the zh-HK phone cards (`選擇 腳 4`) all show the L/腳 prefix. The cause is that `allUpHistory` / `picksText` use `legText()`, which always prefixes 腳. Screenshots: `12-en-result.png`, `14-en-summary-allup-expanded.png`, `25-zh-HK-375-result.png`.

### QA-04 · P3 · History / day-summary legs expander snaps shut (no close animation) (engineer flagged; confirmed)
The open transition animates: measured heights went 446→518→562→…→609 px over about 240 ms. On close, the height goes 609 → 416 px in the first frame. The cause is that `<tr hidden={!legsOpen}>` (src/ui.tsx about line 1210) hides the row immediately, so the `AnimatePresence` exit never renders. DESIGN-SPEC §7 asks for 150 ms (the code uses 240 ms; also a minor mismatch).

### QA-05 · P3 · Zebra striping breaks after an All Up row (engineer flagged; confirmed)
With 5 bets (Win, Win, All Up, Win, Win, newest first), the row backgrounds came out as white, GREY, **white (All Up), [hidden panel tr], white**, GREY. That puts two white rows in a row. The hidden legs-panel `<tr>` still counts for `[&_tbody_tr:nth-child(even)]` (kit.tsx `table`), which breaks DESIGN.md §11 "zebra". Screenshot `33-en-zebra.png`.

### QA-06 · P3 · "Missed" message can name a refunded leg instead of the leg that lost
**Repro (code):** 2x1, R1 WIN{3} with #3 scratched (leg refunded, ×1), R2 WIN{7} unplaced.
**Expected:** `allUpMiss` race = 2.
**Actual:** `{"code":"allUpMiss","race":1}`, which renders as "no line survived (race 1 lost)". The cause is in `settleCore.ts`: `legs.find((l) => l.dividend === 0)` should look for `l.status === "lost"`. The same happens with a void first leg in LIVE.

### QA-07 · P3 · `credits:err.allUpDuplicateRace` is dead (engineer flagged; confirmed)
A duplicate race returns `invalid_selection` from both `/api/settle` and `/api/live-bets`, which SPEC V8 allows. No code emits `all_up_duplicate_race` and nothing maps to the en/zh string, so the string never shows. The UI can't build a duplicate (chips toggle), so this has no user impact. Either emit a dedicated code and map it, or delete the string.

### QA-08 · P3 · Result modal does not close on Escape (pre-existing)
After placing a practice bet, pressing Escape leaves the result dialog open (`role=dialog` count still 1). This was already true at HEAD (no Escape handler in ui.tsx). I'm noting it because the All Up result is long on phones.

### Notes (not bugs)
- **Phone confirm button:** it is present and visible at 375 px. It's the gold `確認（5秒）` / `Confirm (5s)` at the bottom of the confirm sheet (`43-zh-HK-375-confirm.png`), with **返回** / Back beside it. Its accessible name changes every second with the countdown, which is probably why the engineer's script couldn't find it by exact name. A stable `aria-label` plus a live countdown would make it scriptable. Optional.
- Tapping a race chip that is already a leg selects that leg for editing and does **not** remove it. This is by design (DESIGN-SPEC §1.2). Removal is via ✕ and works (the formula list resets to the new leg count, e.g. 5x…).
- The leaderboard/profile pool stats group by `bet_type = 'allUp'` and label it "All Up / 過關" (via `betType`), not the literal `ALLUP` in AC-29. That's acceptable, and noted for the PM.
- The day-summary table scrolls horizontally inside its card at 1280 px (table 1241 px in a 610 px card, `overflow-x:auto`). That matches other pools.
- No console errors or warnings in any browser run (en/zh-HK, 1280/375/360).

## 4. Acceptance criteria matrix

Evidence key: **B** = browser (Playwright, own dev server on :5183/:8797), **A** = curl against `/api/settle`, **T** = automated test, **V** = my independent verifier.

| AC | Result | Evidence |
|---|---|---|
| AC-1 pool menu, 2–6 races, no 7th | PASS | B: "All Up"/"過關" in the pool nav. With 6 legs the Race 7 chip is disabled and a forced click adds nothing (`08-en-6legs.png`) |
| AC-2 pool seg = WIN/PLA/QIN/QPL/TRI only | PASS | B: radiogroup has exactly 5 radios (zh: 獨贏/位置/連贏/位置Q/單T) |
| AC-3 TRI cap | PASS | B: with a TRI leg and 3 legs, Race 4 is disabled with caption "With a Trio leg, All Up takes at most 3 legs." (`07-en-tri-cap.png`). At 6 legs TRI is `aria-disabled` and a forced click leaves it unchecked |
| AC-4 formula list per leg count, default Nx1 | PASS | B: 3 legs → 3x1, 3x3, 3x4, 3x6, 3x7 (3x1 checked); 5 legs → 11; 6 legs → 15. T covers 2 and 4 legs |
| AC-5 lines/cost | PASS | B: n=(1,2,3) pills 6/11/17/17/23, 3x7 = "No. of bets: 23 … Bet total: $230"; 6x63 with n=1 gives 63/$630. T: Ex2 23/$230, Ex3 7/$70, Ex4 9/$90, 3x7 (2,1,1)=11. V: 3x4/4x11/5x31/6x63 |
| AC-6 unit ×2, min $10, integer | **FAIL** | B: $20 → $460 PASS. Below 10 / non-integer is **not blocked** in the UI (QA-01). A: server rejects with `unit_too_small` |
| AC-7 bankers per pool, combos | PASS | B: QIN legs show Banker/Select checkboxes, WIN legs Select only; leg combos 1/2/3 shown. T: banker limits (V4) |
| AC-8 Add disabled until valid | PASS | B: Add disabled with an empty leg, note "Pick horses for race 4 before adding." |
| AC-9 slip item | PASS | B: "All Up 3x7 · 23/09 Happy Valley R1, 2, 3 · R1 WIN 4 · R2 PLA 10,8 · R3 QIN 8,2,1 · $10 × 23 lines · $230" |
| AC-10 server rejects bad shapes with codes | PASS | A (settle): all 7 cases. T (live-bets e2e) |
| AC-11 LIVE race not open / scratched | PASS (T only) | `server/allUp.test.ts` "AC-10/11". Not browser-tested (needs a live open meeting and a login) |
| AC-12 LIVE debits lines × unit once, ignores client combos | PASS (T only) | e2e test "AC-12/13/16" |
| AC-13 one `live_bets` row, `bet_type='allUp'` | PASS (T only) | same |
| AC-14 Ex1 $104.50 / LIVE 104 | PASS | T, V |
| AC-15 Ex2 $2,894, 7 lines | PASS | T, V |
| AC-16 Ex3 64 + refund 10 | PASS | T (incl. LIVE ledger), V |
| AC-17 Ex4 $3,560 | PASS | T |
| AC-18 all void | PASS | T, V (S6) |
| AC-19 Nx1 any loss → 0 lost | PASS | T |
| AC-20 3x7 single winning leg pays its single | PASS | T |
| AC-21 order-independent | PASS | T; A (reversed legs, same $569) |
| AC-22 linear in unit before rounding | PASS | T (Ex2 @ $15 = $4,341); V (S1 @ $15, S5 @ $13) |
| AC-23 PLA 2 placed / QPL multi-pair sums | PASS | T; V (S1); B (R2 PLA factor ×5.90 = (21+38)/10) |
| AC-24 scratched QIN banker → leg ×n, no void | PASS | T; V (S3 with a TRI banker) |
| AC-25 dead heat hold / null; official settles | PASS | T; V (S2 official WIN DH). Practice "payout null" UI not exercised in the browser |
| AC-26 LIVE pending until every leg is in | PASS (T only) | T |
| AC-27 resolve-bet per-leg / --void | PASS (T only) | T (CLI path via actions); CLI not run by hand |
| AC-28 result / My Bets per-leg detail and totals | PASS (with QA-03) | B: modal and summary show leg, race, pool, picks, result, dividend, factor, status chip, formula, winning lines, unit, cost, payout, net, and the rounding note. The refund/carried rows weren't seen in the browser (no scratchings in stored data); covered by T |
| AC-29 History label and legs; leaderboard | PARTIAL PASS | B: day summary (same `HistoryTable`) lists "All Up 3x7" with a "Legs (3)" expander and R1:…R2:…R3: results. Logged-in History not browser-tested. Pool stats use `allUp` / "All Up", not "ALLUP" (note) |
| AC-30 en + zh-HK strings, DESIGN.md §11 | PASS (with QA-05) | T: i18n parity test passes. B: zh strings render (過關, 第N關, 注, 過關組合, 派彩已調整至最接近的 $0.50). §11: no raw hex in new UI; formula pills h-11; works at 360 px (pill row scrolls inside the card, no page h-scroll); zebra broken after All Up rows (QA-05) |

## 5. Regression (other bet types)

- `POST /api/settle` WIN {4,6}, QIN 膽4 {11,10}, PLA {4,10}: same shape and values as before (payout 45.5 / 96.5 / 51.5, dividend text unchanged). A DT on non-designated legs returns payout null, which is unchanged behaviour.
- Browser: placing WIN 4 ($15), PLA 10 ($15) and QIN 4,11 ($10) in one slip with an All Up bet settles all four correctly ("All bets · Cost $270 · Payout $6,546"). The only regression is the display mismatch in QA-02.
- `scaleResult` now skips All Up only (`if (r.allUp) return r`), so non-All-Up scaling is unchanged (WIN $15 → $68.25 is correct).

## 6. Artifacts

- Screenshots: `docs/all-up/qa-screens/*.png` (14 files: builder, TRI cap, 6 legs, unit bug, result, day summary, zebra, zh-HK phone legs/confirm/result, 360 px 6x63).
- No test files were added to the repo. The scratch scripts (brute-force verifier, Playwright flows) are in the session scratchpad only.
- Dev servers: I ran my own on :5183 (vite) / :8797 (API) and stopped them. The pre-existing :5173 / :8787 instances were left running.
