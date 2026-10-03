# QA Report: Credits, LIVE betting and Stripe

Date: 2026-10-03 · QA · Branch `hkjc-reskin` (uncommitted working tree)

**Environment.** All testing ran on an isolated stack:

- **API:** port 8899 with `FUTURE_BETTING=1`, `DEV_NOW=2026-10-04T11:00–15:05+08:00` (restarted to move the clock), `STRIPE_SECRET_KEY=sk_test_dummy`, `STRIPE_WEBHOOK_SECRET=whsec_test_qa`, `MOMENTUM_POLLER=0` and `DATA_FETCH=0`.
- **Vite:** port 5199.
- **Data:** a temporary `MEMBERS_DB`, and a temporary copy of the race DB (`sqlite3 .backup` of `data/momentum.sqlite`) via `MOMENTUM_DB`. Results for the upcoming meeting 2026-10-04 ST were written by hand into that copy so I could check payouts by hand.
- **Other instances:** a throwaway production-mode instance on 8898 for the startup guards.
- **Untouched:** the owner's 5173/8787 servers and their data files.
- **Stripe:** I signed webhooks with `stripe.webhooks.generateTestHeaderString` using the dummy secret. Checkout sessions can't be created without a real key, so I inserted `purchases` rows directly to stand in for created sessions (see "Not tested").

## Verdict: **Ship** (updated after retest, see "Retest" at the end)

All 8 findings are fixed and no new issues were found. The legal and Stripe-approval gate in the PRD still applies before production LIVE.

### Original verdict (first pass): Ship with fixes

**Do not enable LIVE (`FUTURE_BETTING=1`) until CR-01 and CR-02 are fixed.**

These all work as specified:

- the ledger;
- idempotent, all-or-nothing placement;
- exactly-once settlement;
- webhook signature and replay protection;
- refund and dispute claw-back;
- the operator CLI;
- the kill switch;
- the production guards.

Two money bugs remain:

- **CR-01:** losing bets on horses that start but don't finish are refunded.
- **CR-02:** the daily purchase cap can be exceeded with parallel requests.

## Findings

| ID | Severity | Area | Steps to reproduce | Expected | Actual | Evidence |
|---|---|---|---|---|---|---|
| CR-01 | **High** | Settlement / scratch rule (PRD §4.4 "Scratched vs. non-runner") | 1. Place a LIVE `win` R5 #12 ×10 on 2026-10-04 ST.<br>2. Store results where #12 started but isn't in `finishOrder`. This is exactly what the results scraper produces for PU, DNF, FE, UR, DISQ and similar: `src/scrapers/historical.ts` `parseFinishOrder` skips every row whose place isn't a number.<br>3. Run `npm run credits:settle`. | A horse that started but didn't finish is a runner. Bets on it **lose** (no refund). | `scratchedIn()` in `server/credits/grade.ts` treats any card runner missing from `finishOrder` as scratched. The bet is voided with a full refund. The same logic gives partial refunds on trio, quinella and other bets that include a non-finisher. | My DB: `win\|R5\|[12]\|unit 10\|void\|payout 0\|refund 10\|refunded_combos 1`.<br>Real stored data, using the server's own grader: 2026-09-16 HV R8 #5 is not scratched on the card and is missing from `finishOrder`. `gradeLiveBet(win #5 ×100)` returns `{"kind":"void","refund":100,"reason":"all_scratched"}`.<br>The PRD asked Engineering to confirm the scraper keeps these codes. It doesn't. |
| CR-02 | **Medium** | Purchases / daily cap (PRD §5.2) | Send several `POST /api/credits/checkout {planId:"hk300"}` requests for one member at the same time. | Total open plus paid for the HK day stays ≤ HK$1,000 (`daily_cap_reached`). | `createCheckout` checks `spentToday()`, then `await`s Stripe, and only then inserts the `purchases` row. Concurrent requests all pass the check. The route's 10/h rate limit doesn't stop a burst. | Server's own `purchases()` with a fake Stripe client that takes 200 ms: 4 parallel `hk300` calls → `['session','session','session','session']`, `spentToday` = **HK$1,200** against a cap of 1,000. A real Stripe round trip takes longer, so the window is wider. Fix: reserve the row (or take a per-user lock) before calling Stripe. |
| CR-03 | Low | Operator CLI `reconcile` (PRD §3.6) | With a Stripe key that fails (`sk_test_dummy`, or Stripe unreachable), run `npm run credits -- reconcile`. | Local ledger checks still run and print. The Stripe part reports its own error. | An unhandled `StripeAuthenticationError` stack trace, with no exit code and no local results. Without the key, the same DB prints `OK: ledger consistent`. | `StripeAuthenticationError: Invalid API Key provided: sk_test_*ummy …` (the in-server daily reconcile is local-only and not affected). |
| CR-04 | Low | Operator CLI `void-meeting` | Meeting 2026-10-04 ST with R2–R7 and R9 already resulted and settled. Run `credits -- void-meeting 2026-10-04 ST --reason typhoon --operator qa --yes`. | Only the unrun or unresulted races are voided (typhoon after race N). | Every race gets `voided_at`, including races that already have results. The meeting then reads `practice` with all 11 races `void`. Because `raceStatus` checks void first, any bet still pending on a completed race (e.g. held for a dead heat or missing dividend) would be refunded instead of paid. That last part was not reproduced: no held bet was open at the time. | `/api/meeting/20261004/ST` → `practice [(1,'void'),(2,'void'),…,(11,'void')]` after R2–R7 and R9 had results |
| CR-05 | Nit | Stake bar copy (DESIGN-SPEC D2) | Live meeting, member, set the unit to 9. | "Minimum unit bet is 10 credits." | "Minimum unit bet is $10." (`bet:stake.minUnit` is reused in Live). The empty phone slip bar also shows "$0" on a Live meeting. | Stake bar text: `Minimum unit bet is $10.`; slip bar `0 投注區 $0` |
| CR-06 | Nit | Operator CLI `adjust` | 1. `adjust --phone 91110005 --amount 1e3 --operator qa --reason x --yes`<br>2. `adjust --user nonexistent-user …` | Reject `1e3`, and give a clean "user not found". | `1e3` is accepted as +1,000 (`Number("1e3")`). An unknown `--user` prints `refused: SqliteError: FOREIGN KEY constraint failed` (nothing is written). | `after {"balance":1000,…}`; `refused: SqliteError: FOREIGN KEY constraint failed` |
| CR-07 | Nit | History, Live view | Member with 1 settled (won) and 1 pending Live bet. Open History → Live. | Summary counts are consistent. The subtitle fits Live. | "Bets 2 · Hits 1 100% · Total staked 10": the pending bet is counted in Bets but not in hit rate or staked. The subtitle still says "Every practice bet you've settled". Picks show `R10 腳 1` in English (the stored 膽/腳 format, carried over from practice). | History text: `Bets 2 Hits 1 100% Total staked 10 Total return 66` |
| CR-08 | Nit | Race chips (PRD U2) | Live meeting after `void-race … 8`. | A void race chip says void (or refunded). | Its aria-label is "Race 8, closed", the same as a closed or settled race. | chips: `8:Race 8, closed` while `/api/meeting` reports R8 `void` |

## Passed

**Ledger and bonus**
- [x] A new member gets balance 1,000 and exactly one `signup_bonus` row (`bonus:<id>`). The welcome dialog shows once and doesn't come back after "Later" and several reloads.
- [x] Existing member, created directly in the DB with a session and no wallet: 24 parallel `/api/me` + `/api/credits` → exactly one bonus row, balance 1,000.
- [x] Delete the account, then sign up again with the same number → balance 0, no bonus row, welcome false. `bonus_claims` survives.
- [x] Balance never goes negative. `UPDATE wallets SET balance=-5` → `CHECK constraint failed: balance >= 0`.
- [x] Reconcile: clean DB → `OK: ledger consistent`. A wallet off by 1 → `[credits:alert] wallet …: balance 13023 ≠ ledger sum 13022`. A paid purchase with no credit row → alert.

**Concurrency and idempotency**
- [x] 8 parallel slips with different keys at 400 credits each, balance 1,000 → exactly 2 × 200 and 6 × `402 insufficient_credits`. Balance 200.
- [x] 15 parallel requests with the same `Idempotency-Key` → all 200 with the same response and one debit.
- [x] Same key with a different body → `409 idempotency_conflict`.
- [x] Missing or malformed key → `400 idempotency_key_required`.

**LIVE placement**
- [x] Guest → 401.
- [x] No 18+ declaration → `403 age_declaration_required`.
- [x] Foreign Origin, including `/api/LIVE-BETS` → 403.
- [x] Unit 9, 10.5, `"10"` or −10 → `unit_too_small`. Unit 50,001 → `stake_too_large`. 50,000 with a balance of 990 → `402` (+`balance`, `required`).
- [x] Tampered `combos`/`cost`/`stake` are ignored: trio of 5 horses → 10 combos, 100 credits.
- [x] Practice meeting 20261001 → `409 race_not_open`. HV / race 12 → `race_not_open`.
- [x] Horse 99, a horse not on the card (R9 #3), a duplicate horse, a banker in Win, or too few trio legs → `invalid_selection`.
- [x] 21 items → `too_many_items`.
- [x] One bad item among good ones → nothing placed, with per-item `items[]`.
- [x] Non-designated DT legs 1+2 → `pool_not_designated`. Designated DT 2+3 accepted. TT is hidden once its first leg is settled.
- [x] Scratched horse ticked (card `isScratched`) → `scratched_runner` with race and horse.
- [x] Moving `DEV_NOW` to 12:31 closes R1 (`race_closed`, nothing placed). Moving R1's post time later with `dev-schedule` does not reopen it (one-way `closed_at`).
- [x] A live race sent to `/api/settle` → `404 no results for this meeting yet`.
- [x] Kill switch: `features` false; live-bets, checkout and plans → `503 feature_disabled`; a new member still gets 1,000.

**Settlement** (hand-checked against crafted R5 results: 2-5-7-9, Win 45.5, Place 17.5/22/30.5, Q 120.5, QPL 40/55.5/66, Trio 333, Tierce 2468; #13 scratched after placement)

| Bet | Expected | Actual |
|---|---|---|
| Win #2 ×15 | 45.5 × 1.5 = 68.25 → **68** | 68 |
| Place 5,7,8 ×10 | 22 + 30.5 = 52.5 → **52** | 52 |
| Quinella 2,5,13 ×10 | refund 2 combos = **20**; payout **120** | won 120, refund 20 |
| Trio banker 2 / 5,7,9,13 | refund 3 combos = **30**; payout **333** | 333 / 30 |
| Tierce 2,5,7 | **2468** | 2468 |
| QPL 2,5,7 | 161.5 → **161** | 161 |
| Trio banker 13 (scratched) | void, full refund **30** | void / 30 |
| Win #13 (scratched) | void, refund **10** | void / 10 |

- [x] DT 2+3: still pending with only R2 resulted; settles after R3 at 4321.5 → 4321.
- [x] Settlement ran 4× in parallel plus a `GET /live-bets` sweep: exactly one payout row per bet. Running it again → `settled 0`.
- [x] Dead heat at 3rd (R6 trio 1,2,3,4) → held `dead_heat`. `resolve-bet` without `--operator` or `--yes` is refused; `--settle` → "still held"; `--dividend 290.5` → won 290; a second resolve → "not pending". Audit rows written.
- [x] Missing trio dividend (R7) → held `missing_dividend`. `--dividend 444` → 444.
- [x] `void-race 2026-10-04 ST 8` without `--yes` is refused; with `--yes` → void, refund 10.
- [x] `void-meeting` refunds the remaining pending bet.
- [x] With the kill switch on, a pending R9 bet still settles (77.5 × 2 = 155) and the webhook still credits.
- [x] Account deletion with 3 pending bets → bets voided with no refund. 4 ledger rows anonymised to `deleted:<uuid>`, none deleted. Wallet and bets gone. Reconcile OK.

**Stripe webhook**
- [x] A valid signed `checkout.session.completed` (hk100) → +1,200 once.
- [x] Replaying the same event id, or a new event id for the same session → no second credit.
- [x] Bad secret, no signature, or a timestamp 400 s old → `400 bad_signature`.
- [x] Tampered amount, currency or plan metadata, unknown user metadata, or unknown session → 200 with no credit and `[credits:alert]`.
- [x] Signed with a foreign `Origin` → accepted: the webhook is mounted before `express.json()` and the raw body verifies.
- [x] `charge.refunded` at 50% → −600. Replay or duplicate event → no change. Then a full refund → another −600 (total 1,200). Status `refunded`.
- [x] `charge.dispute.created` after the credits were spent (4,000 bought, 4,500 staked, balance 500) → −500 (capped), account flagged `payment disputed`. LIVE and checkout then → `403 account_flagged`.
- [x] `dispute.closed` → alert only. A refund for an unknown payment intent → alert, 200.

**Purchases API**
- [x] Guest → 401. `GET /credits/plans` is public.
- [x] Plan ids `p300`, `hk1000`, an `amount`-only body, or an object → `400 invalid_plan`.
- [x] Daily cap (sequential): 820 already counted → `hk300` gives `429 daily_cap_reached, remainingHkd: 180`. A paid purchase from yesterday (HK time) is not counted. An open session older than 31 min drops out.
- [x] Another member's session status → 404.
- [x] Checkout with the dummy key → `502 payment_unavailable` (no fake checkout). The key is masked in the log.

**Operator CLI**
- [x] `adjust` without `--operator`, `--reason` or `--yes` → refused. With them → `admin_adjust` row plus an `admin_audit` row with before and after.
- [x] An adjustment below 0 → "the balance would go below 0". A non-integer → refused.

**Production guards**

The server refuses to start in production in each of these cases:
- [x] `FUTURE_BETTING=1` without the webhook secret.
- [x] `sk_live_` without `STRIPE_LIVE_APPROVED`, whether `FUTURE_BETTING` is 0 or 1.
- [x] No `CREDITS_PEPPER`.
- [x] `DEV_NOW` set.

With `sk_test_` and the webhook secret it starts, with a TEST-mode warning.

**UI (desktop and 375 px iframe, en and zh-HK)**
- [x] The meeting picker has Upcoming (Live) / Past (Practice) groups. Default is the live meeting for a member and the past meeting for a guest.
- [x] Live badge, "Next: Race 4 · post time 15:00" status line, locked chips for closed and settled races, scratched runner shown as SCR.
- [x] Guest: no credit chip; the stake bar is replaced by "Log in to bet on live races". Login keeps the ticked horse.
- [x] Header credit chip (aria-label "Credits: 1,000…", hit area 89×44). The account menu has Credits.
- [x] Insufficient stake: after-value negative, Add disabled, Buy credits link.
- [x] Mixed-mode slip → "Your slip has Live bets. Clear it…" dialog.
- [x] Live confirm has no countdown (no change after 6.5 s). "Live bets are final" copy. The 18+ dialog appears on first Confirm; "Not now" places nothing.
- [x] After Confirm: receipt "Bets placed — pending result", toast, chip updates.
- [x] Race closed while on the confirm step → "Race 4 closed at 15:00. No credits were deducted." with "Remove closed bets"; the remaining bet then places.
- [x] Settle toast "1 live bet settled · +56 credits" and a History badge until viewed.
- [x] History: Live / Practice / Pending filters, Won +66 and Pending chips, no delete on Live rows. API `DELETE /history/:id` and clear-all leave Live rows intact.
- [x] Credits page: 3 plans with HK$10 preselected, Popular / Best value tags, no-cash-value terms, one gold Buy button, transactions with +/−. `checkout=success` shows "Payment received. Adding your credits…".
- [x] Kill switch: gold notice banner, Live group "Upcoming (Live paused)" disabled, no Buy, chip hidden, balance and transactions still visible.
- [x] Delete-account dialog warns "You will lose 1,046 credits and your 1 pending live bet".
- [x] No horizontal overflow at 375 px on Bet, Credits and History (scrollWidth = clientWidth = 375).

**Regression**
- [x] Practice: "Confirm (5s)" auto-settles, the result modal shows, and the practice history row is saved.
- [x] Membership login, welcome and profile.
- [x] Replay links: 20 links in Past runs.
- [x] `npm run typecheck` passes.
- [x] `npx vitest run`: 14 files, 242 tests pass.
- [x] `npx vite build` (scratch outDir) passes.
- [x] The API log contains no Stripe secrets and no full phone numbers.

## Not tested

- **Creating real Stripe Checkout sessions**, hosted checkout (4242, 3DS, decline, cancel), receipts, `stripe events resend` / `stripe trigger`, and `npm run stripe:setup`. These need a real `sk_test_` key and the Stripe CLI. I tested the webhook with self-signed events against `purchases` rows inserted directly into the DB.
- **The full success-page path.** It polls `/api/credits/purchases/:id` and showed "Processing…", but no real session ever became paid for that member.
- **`DATA_FETCH=1`** (HKJC discovery, designated DT/TT pools from HKJC, post-time refresh) **and the momentum poller's ABANDONED status.** These need live HKJC scraping, which I kept off. I used the stored discovery rows and `dev-schedule`.
- **Stale-schedule (>24 h) "unavailable" status** was not exercised. The code path was read only.
- **Real phone keyboard, a device clock set a day early, and two real browsers.** The equivalent API concurrency tests passed.
- **The 2-hour `missing_dividend` alert timing and the 6-hour no-result alert.** Both need long waits; only the hold path was tested.

---

## Retest (2026-10-03, after the engineer's fixes)

Same setup and rules as the first pass:

- **Servers:** a fresh isolated stack, API on 8899 and Vite on 5199.
- **Data:** a new temporary `MEMBERS_DB`, and a new `sqlite3 .backup` copy of the race DB via `MOMENTUM_DB`.
- **Clock and keys:** `DEV_NOW`, `sk_test_dummy` and `whsec_test_qa`.
- **Browser:** desktop plus a 375 px iframe, en and zh-HK.
- **Untouched:** the owner's 5173/8787 servers and their data.

| ID | Result | Evidence |
|---|---|---|
| CR-01 | **Fixed** | One slip of 8 LIVE bets on 2026-10-04 ST, then crafted results. R5 includes `runners[]`; R6 is in the old format with no `runners`.<br>• Win **#12 PU** (`nonFinisher`) → **lost**, refund 0.<br>• Win **#11 WV** (`withdrawn`) → void, refund 10.<br>• Trio 2,5,7,**11** → won 333 with a partial refund of 30 (the 3 combos containing #11).<br>• Win **#10** (in neither `finishOrder` nor `runners`) → held `runner_unknown`. `--dividend` and bare resolves are refused ("check HKJC's result, then --settle or --void"). `--settle` → **lost**.<br>• Win **#13 TNP** (`unknown`) → held. `--void` → refund 10.<br>• **Old-format R6:** Win #14 missing from `finishOrder` → **held** (not refunded), resolved with `--settle` → lost. Win #1 → won 30. A second resolve → "not pending".<br>• `[credits:alert]` is logged for each hold.<br>• Practice `/api/settle` is unchanged: R5 #12 → miss −10; trio 2,5,7,11 → 4 combos, payout 333; 2026-10-01 R1 #7 → 124.5.<br>• Place-code classification: `3 DH` finished; PU/FE/UR/DNF/DISQ nonFinisher; WV/WV-A/WX/WX-A/WXNR withdrawn; TNP and WR unknown, so they hold rather than guess. |
| CR-02 | **Fixed** (instance plus the code's own test seam) | **Instance, `sk_test_dummy`:**<br>• 8 parallel `hk300` → 3 × `502 payment_unavailable` and 5 × `429 daily_cap_reached`. At most HK$900 was ever reserved; all 3 reservations end `expired`; `purchasedTodayHkd` 0 afterwards.<br>• Member with HK$700 paid, 8 parallel `hk300` → 7 × `429` (`remainingHkd: 0` while 1 reservation was in flight), 1 × 502 released.<br>**Simulated successful Stripe create**, using the server's `purchases()` with a fake client that takes 200 ms (no source edits):<br>• 6 parallel hk300 → 3 sessions, 3 × cap reached, counted HK$900.<br>• Then 4 parallel hk100 → 1 session, counted exactly **HK$1,000**.<br>• 3 failing creates → all released (counted 0), then 4 ok → 3 sessions / HK$900.<br>• Open reservations aged 30 / 32 / 5 min → counted 400 (only the 32-min one expires).<br>The new unit tests ("daily cap holds under parallel checkout requests…", "a failed Stripe call releases the reservation…") pass. |
| CR-03 | **Fixed** | `reconcile` with a bad Stripe key prints `ledger: OK (consistent)` then `[credits:alert] stripe: check FAILED (Invalid API Key provided: sk_…); local checks above still apply`, exit 3. With a corrupted wallet plus the bad key, the wallet alert and "ledger: 1 problem(s)" still print. With no key: `stripe: skipped`, exit 0. |
| CR-04 | **Fixed** | Plain `void-meeting` → `skipped (already resulted; pass --include-resulted to void them anyway): R5, R6`. It voided the other 9 races and refunded the pending R7 bet (10). R5 and R6 stay `settled`. `--include-resulted` voids all 11. Both runs are audited, including the flag. |
| CR-05 | **Fixed** | Live, unit 9 → "Minimum unit bet is 10 credits." The empty slip bar reads "Bet slip 0 credits" (en) and "投注區 0 積分" (zh-HK) on the live meeting. |
| CR-06 | **Fixed** | Rejected with "must be a plain non-zero whole number": `1e3`, `0x10`, `5.0`, `1_000`, `10abc`, `-0`, `9007199254740993`. Accepted: `50`, `+5`, `" 5"`. Unknown `--user` → `user not found: user nonexistent-user`; unknown phone → `user not found: phone 99999999`. |
| CR-07 | **Fixed** | Live summary: "Bets 10 · Hits 4 40% · Total staked 130 · Total return 518". Hand check: payouts 458 + refunds 60. A pending bet is listed separately: "Plus 1 pending bet (30 credits staked), not counted above until it settles". The Live subtitle reads "Your live bets, newest first…" and the Practice subtitle is unchanged. Picks show `R9 B 2 L 1,4,5` in en and `R9 膽 2 腳 1,4,5` in zh-HK. |
| CR-08 | **Fixed** | After `void-race 2026-10-04 ST 8`, the chip aria-labels read "Race 8, void" and "第8場，已取消"; closed races still read "Race 1, closed". |

**New findings:** none.

**Regression (all passed)**
- [x] LIVE end to end in the UI: login (OTP from my log), Win R4 #3 ×10 → receipt "Bets placed — pending result" plus a toast. Store the R4 result and run `credits:settle` → won 50. On reload: toast "10 live bets settled · +388 credits" (all of this member's settled bets; net checked by hand) and the History badge "10 new results".
- [x] Practice: 20261001 Win #7 → "Confirm (5s)" auto-settles, the result modal shows, and the practice history row is saved.
- [x] Membership login with the welcome dialog.
- [x] `reconcile` OK after cleanup.
- [x] No horizontal overflow at 375 px on Bet, History and Credits (zh-HK).
- [x] `npm run typecheck` passes.
- [x] `npx vitest run`: 14 files, 251 tests pass (up from 242).
- [x] `npx vite build` (scratch outDir) passes.

**Still not testable:** real Stripe Checkout, which needs a real test key. The ingest of `runners[]` from HKJC pages (`server/data/runners.ts` `parseRunnerRows`) needs `DATA_FETCH=1` and live HKJC pages. I checked `classifyPlace` directly and supplied `runners[]` in crafted results.

### Retest verdict: **Ship**
All 8 first-pass findings are fixed and no new issues were found.
