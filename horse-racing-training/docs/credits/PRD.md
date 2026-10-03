# PRD — Credits, LIVE betting and Stripe top-ups

| | |
|---|---|
| Product | Post Time / 開跑前 |
| Version | v1 |
| Status | Draft for build (test mode only) |
| Owner | PM |
| Readers | Design, Engineering, QA, Owner, Legal |
| Date | 2026-10-03 |
| Depends on | [Membership PRD](../membership/PRD.md) (shipped; QA verdict "Ship") |

> ## ⚠️ LEGAL REVIEW REQUIRED BEFORE PRODUCTION LAUNCH
> This feature lets members **pay real money** (HKD via Stripe) for credits and stake them on **real,
> upcoming HKJC races**, with winnings paid in credits. Even though credits have no cash value, this
> may fall within the **Gambling Ordinance (Cap. 148)**: unlawful betting / bookmaking, and promoting
> betting other than through the **HKJC, the only licensed operator**. It may also count as a
> **restricted business** under Stripe's terms (gambling, games of skill or chance with a purchase
> element), which can lead to the account being closed and funds held.
> **Gate:** do not ship LIVE mode or purchases to production (`FUTURE_BETTING=1` or a `sk_live_` key)
> until (1) HK counsel has given written clearance on Cap. 148 and HKJC exclusivity, and (2) Stripe has
> approved the business model in writing. Until then, build and QA only in **Stripe test mode**, and keep
> production at `FUTURE_BETTING=0`. The server enforces this (§9, `STRIPE_LIVE_APPROVED`).

**Today:** every bet is practice. It works only on meetings that already have results (`MeetingRef.hasResults`),
and the client settles it instantly through `POST /api/settle`, staking imaginary HKD.
**After v1:** two modes.

| Mode | Races | Cost | Settlement | Login |
|---|---|---|---|---|
| **PRACTICE** | Races whose result is already in | Free (imaginary HK$, as today) | Instant, client calls `/api/settle` (unchanged) | Optional (as today) |
| **LIVE** | Races that have not reached post time | **Credits**: 1 credit = HK$1 of stake. Unit ≥ 10 credits per combination | Server-side, automatic once results arrive. Payout in credits | **Required** |

---

## 1. Goals / non-goals

### Goals
| # | Goal | Measure |
|---|---|---|
| G1 | Members can bet credits on upcoming races with real HKJC rules and dividends | A LIVE bet is placed before post time and settled within 15 min of results being stored |
| G2 | Credits can never be created, lost or doubled by mistake | Every balance equals the sum of its ledger rows. No negative balance. No double payout or double credit (verified by a reconcile script, §3.6) |
| G3 | Every member starts with 1,000 free credits, once | New members at sign-up, existing members on their first authenticated request after release |
| G4 | Members can buy credits through Stripe Checkout | Test-mode purchases of all 3 plans are credited exactly once |
| G5 | Safeguards are in place from day one | Credits have no cash value (terms), 18+ declaration, kill switch, daily purchase cap, audited operator adjustments |
| G6 | Practice mode behaves exactly as it does today | No regressions in the existing flow or the QA checklist |

### Non-goals (v1)
- Cash-out, withdrawal, or exchanging credits for money, prizes, vouchers or anything else.
- Transferring or gifting credits between members. Referral or invite bonuses. Promotions or coupons.
- Admin web panel. The operator uses a **CLI** instead (§3.7).
- Cancelling or editing a placed LIVE bet.
- Fixed odds, Six Up, Double, Treble, Quartet, Quinella Place banker variants or pools the engine does not
  already support. LIVE offers the same 9 pools as practice (`BET_TYPES`).
- Leaderboards or any public display of members' credits.
- Credit expiry. Subscriptions. Currencies other than HKD. Payment methods other than Stripe Checkout (card and
  card wallets).
- Guest LIVE betting.

---

## 2. Mode rules

### 2.1 Time authority
- **The server decides** every open/closed check, using its own clock in **Asia/Hong_Kong** (`+08:00`).
  The client never sends a time and never decides whether a race is open.
- The client gets `serverNow` with every meeting response (§6.3) and shows countdowns from the offset
  `serverNow − Date.now()`. A countdown is only for display. The server re-checks on placement.

### 2.2 Post-time source (new requirement)
Racecards do **not** store post times today. Post times only exist in memory during a fetch run
(`discoverMeetings()` → `UpcomingMeeting.races[].postTime`) and in `momentum.sqlite` `races.post_time`
(written by the race-day poller).
- **Add a `race_schedule` store** (race_id, date, venue, race_no, post_time, hkjc_status, first_seen_at,
  updated_at, `closed_at`). It is updated by every fetch run (discovery) and by the momentum poller.
- **Fail closed:** a race with no known post time, or whose schedule has not been refreshed in the last
  **24 h**, is **not** open for LIVE.
- **Closing is one-way:** when `now ≥ post_time` (or results exist, or `hkjc_status` is anything other
  than pre-race), the race gets `closed_at` and never reopens, even if HKJC later moves the post time
  back. If HKJC moves a post time **earlier**, the earlier time applies at once.
- LIVE needs `DATA_FETCH=1` (results and post times come from the fetch job). If `FUTURE_BETTING=1` and
  `DATA_FETCH≠1`, the server logs a startup error and treats LIVE as disabled.

### 2.3 Race status (per race, computed by the server)
| Status | Rule (checked in this order) | Practice | LIVE |
|---|---|---|---|
| `void` | HKJC status `ABANDONED`/`VOID`, meeting cancelled or postponed, or operator voided it | No | No (pending bets refunded) |
| `settled` | The race's result (finish order + win dividend) is stored | **Yes** (as today) | No |
| `closed` | No result yet, and `now ≥ post_time` (or `closed_at` set) | No | No ("Awaiting result") |
| `open` | No result, post time known and fresh, `now < post_time`, LIVE enabled | No | **Yes** |
| `unavailable` | No result, and post time unknown or stale, or `FUTURE_BETTING=0` | No | No ("Betting not available") |

**Meeting mode** is derived from its races: all `settled`/`void` → `practice`. Any `open` → `live`.
Otherwise → `closed`. On race day a meeting is **mixed**: early races are practice, later ones LIVE. Mode is
therefore shown **per race** (§7). `MeetingRef.hasResults` keeps its meaning for practice.

### 2.4 Multi-race pools (Double Trio / Triple Trio)
- A DT/TT bet closes at the **first leg's** post time. It settles when **every** leg has a result.
- LIVE accepts only the **designated** pools for that meeting. Today these come from *results*
  (`/api/meeting` → `doubleTrioPools`), so for future meetings the designated legs must come from HKJC's
  meeting/pool data (discovery query). If the designated legs are unknown, DT/TT is **not offered** in LIVE
  for that meeting. Practice keeps today's behaviour (any legs, no dividend for non-designated legs).
- If any leg is `void` → full refund of the DT/TT bet.

### 2.5 Slip mode
- A slip holds **one mode only**. If the member adds a LIVE item to a slip with practice items (or the
  other way round), a dialog says "Your slip has practice bets. Clear it to start a live slip?"
  (Clear / Cancel).
- LIVE confirm: **no 5 s auto-confirm**. The member must tap **Confirm** (spending credits needs an
  explicit act). Practice keeps the auto-confirm.

---

## 3. Credit ledger

### 3.1 Principles
- **Append-only ledger.** Rows are never updated or deleted (except anonymised on account deletion, §8.4).
  A correction is a new row.
- **Integer credits.** All amounts are whole credits (signed integer). Payouts are **rounded down** to a
  whole credit per bet (HKJC dividends per $10 are in $0.5 steps, so only odd unit bets lose a fraction).
- **Cached balance.** `wallets.balance` is updated in the **same transaction** as the ledger insert. It has
  `CHECK (balance >= 0)`. `ledger.balance_after` is stored on each row. A reconcile script (§3.6) checks
  `balance = SUM(amount)`.
- **One DB transaction** (`BEGIN IMMEDIATE` in `members.sqlite`) per money-changing action: check, debit or
  credit, write the bet or purchase, write the ledger row. If anything fails, nothing is written.

### 3.2 Entry kinds
| Kind | Sign | Created by | Idempotency key (UNIQUE) |
|---|---|---|---|
| `signup_bonus` | + | Account creation, or first authenticated request after release (existing members) | `bonus:<user_id>`. Also checked against `bonus_claims` (§8.4) |
| `purchase` | + | Stripe webhook `checkout.session.completed` (paid) | `purchase:<stripe_session_id>` |
| `bet_stake` | − | `POST /api/live-bets` | `stake:<bet_id>` |
| `bet_payout` | + | Settlement (won) | `payout:<bet_id>` |
| `bet_refund` | + | Settlement (scratching refund, void race or meeting) | `refund:<bet_id>` (one refund row per bet, partial or full) |
| `purchase_reversal` | − | Stripe refund or dispute (§5.4) | `reversal:<stripe_event_object_id>` |
| `admin_adjust` | ± | Operator CLI | `admin:<uuid>` generated by the CLI |

(`purchase_reversal` is added to the requested list. A refund or dispute must not be recorded as `admin_adjust`.)

### 3.3 Placement (all-or-nothing)
`POST /api/live-bets` with a client-generated `Idempotency-Key` (UUID, one per slip confirm):
1. Auth (member), kill switch, 18+ declaration, account not flagged.
2. Validate **every** item: race `open` (§2.3), designated pool for DT/TT, selection valid for the pool,
   horses are on the card and **not scratched**, unit is an integer ≥ 10, combos recomputed by the server
   with `countCombos()`. The client's `combos`/`cost` are ignored.
3. `total = Σ combos × unit`. If `balance < total` → `402 insufficient_credits`, nothing placed.
4. In one transaction: re-check balance, debit `total` as one `bet_stake` row per bet, insert all bets
   `pending`, store the idempotency record.
5. If **any** item fails, **no** bet is placed and the response lists each failing item and its reason.

Idempotency: the same key with the same body returns the original response (no second debit). The same key
with a different body → `409 idempotency_conflict`. Keys are kept 7 days.

### 3.4 Limits
| Limit | Value | Why |
|---|---|---|
| Unit per combination | integer ≥ 10 credits | HKJC minimum unit |
| Max items per LIVE slip | 20 | Matches the history batch size |
| Max stake per item | 50,000 credits (configurable `LIVE_MAX_STAKE`) | Limits damage from a UI mistake |
| Balance | ≥ 0, enforced by a DB CHECK | Never negative |

### 3.5 Signup bonus
- New member: `signup_bonus` of `CREDITS_SIGNUP_BONUS` (1,000) in the same transaction that creates the user.
- Existing member: granted lazily on the first authenticated `GET /api/me` or `GET /api/credits` after
  release. Show a one-time "1,000 free credits added" toast.
- Granted **once per phone number, ever**. It does not come back after account deletion and re-sign-up
  (§8.4).
- Granted even when `FUTURE_BETTING=0` (the balance is shown, but cannot be used until LIVE is on).

### 3.6 Reconciliation
`npm run credits -- reconcile` checks: every wallet equals its ledger sum; every `pending` bet has exactly
one `bet_stake` row; every settled bet has at most one payout and at most one refund; every paid purchase
has exactly one `purchase` row; Stripe paid sessions in the last 30 days (via API) are all credited. It
runs daily from the scheduler and logs `[credits:alert]` on any mismatch.

### 3.7 Operator CLI (no admin panel)
`npm run credits -- <command>`. Every command that writes requires `--operator <name>`, `--reason "<text>"`
and `--yes`, prints the before and after, and writes a row to `admin_audit` (who, what, args, before,
after, timestamp).

| Command | Effect |
|---|---|
| `show --phone 9123 4567` \| `--user <id>` | Balance, flags, last 50 ledger rows, pending bets |
| `adjust --user <id> --amount ±N` | `admin_adjust` row. Refused if the balance would go below 0 |
| `pending [--held]` | Pending LIVE bets, with the hold reason |
| `resolve-bet <betId> --settle` \| `--void` \| `--dividend <per $10>` | Settle a held bet (re-runs the engine, optionally with an operator-supplied dividend) or void and refund it |
| `void-race <date> <venue> <raceNo>` / `void-meeting <date> <venue>` | Mark void and refund every pending bet on it |
| `flag` / `unflag --user <id>` | Block or allow purchases and LIVE bets |
| `reconcile` | §3.6 |

---

## 4. LIVE bet lifecycle

```
placed ─▶ pending ──results in──▶ won  (payout + optional partial refund)
                  │                lost (optional partial refund)
                  ├─void race/meeting──▶ void (full refund)
                  ├─all combos scratched──▶ void (full refund)
                  └─hit but dividend missing──▶ pending (held, alert) ──operator──▶ won | void
```

### 4.1 Settlement trigger
- **Event:** after each fetch run that stores changed results (`putResults` returned `true`), run
  `settleLive(date, venue)`.
- **Sweep:** every scheduler tick (5 min), settle any `pending` bet whose races all have results. This
  catches missed events and restarts.
- **On demand:** `GET /api/live-bets` triggers a sweep for that member's pending bets (at most once a
  minute per member).
- Settlement uses the **same code as `/api/settle`**: refactor the dividend-source logic in
  `server/routes.ts` into a shared function so practice and LIVE grade bets the same way.

### 4.2 Exactly-once payout
In one transaction: `UPDATE live_bets SET status=… WHERE id=? AND status='pending'`. If 0 rows changed,
stop. Otherwise insert the `bet_payout` / `bet_refund` rows (unique idempotency keys) and update the wallet.
Concurrent sweeps can never pay out twice.

### 4.3 Payout maths
`payout = floor( dividendPer10 × unit / 10 × combosWon )`, which is `scaleResult(settle(...), unit).payout`,
rounded down. Place and Quinella Place sum the matching dividends, as the engine does.

### 4.4 Edge cases (HKJC-style)
| Case | Rule |
|---|---|
| **Scratched before placement** | Rejected: `400 scratched_runner` with the horse number |
| **Scratched after placement** | Remove the scratched horses from the selection. `refundCombos = combos − countCombos(effective)`. Refund `refundCombos × unit`. Settle the rest. A scratched **banker** removes every combination (full refund). Effective combos = 0 → `void`, full refund |
| Scratched vs. non-runner | Scratched = `isScratched` on the last card refresh before post time, or a withdrawn code in results. A horse that started but did not finish (pulled up, fell, disqualified) is **a runner**: its bets lose. Engineering must confirm the results scraper keeps these codes |
| **Dead heat** | The engine produces multiple winning combos (`winningCombos`). If the results carry separate dividends for each dead-heat combo, use the matching one. If the stored data has only one ambiguous dividend for a dead heat, **hold** the bet (operator resolves) |
| **Race abandoned / void** | `void`, full refund. Detected from `hkjc_status` (momentum poller) or by the operator |
| **Meeting cancelled or postponed** (typhoon etc.) | All pending bets on it are voided and fully refunded. Auto-alert if a meeting has no results 24 h after its last post time. The operator runs `void-meeting` |
| **Missing dividend** (hit, `payout === null`) | Stays `pending` with `hold_reason='missing_dividend'`. Retried every sweep. `[credits:alert]` after 2 h. Note that the fetch job stops re-scraping results after "yesterday", so the operator resolves it with `resolve-bet` |
| **No result 6 h after post time** | Alert. Stays pending |
| **DT/TT** | Closes at the first leg's post time. Settles after the last leg. Any void leg → full refund. Scratching rule per leg as above |
| **Results changed after settlement** (HKJC amendment) | No automatic re-settlement. If a settled race's stored result changes → `[credits:alert]`, operator decides with `adjust` |
| **Settlement crash** | Transaction rolls back. `settle_attempts++`. Next sweep retries. After 5 failures → held + alert |
| **Kill switch turned off with bets pending** | Pending bets still settle and pay out. Webhooks are still processed |

---

## 5. Stripe

### 5.1 Plans (server-side table, `shared/credits/plans.ts`)
| plan_id | Price | Credits | Bonus vs base | Badge |
|---|---|---|---|---|
| `p10` | HK$10 | 100 | — | |
| `p100` | HK$100 | 1,200 | +20% | Popular |
| `p300` | HK$300 | 4,000 | +33% | **Best value** |

The client only sends `planId`. The server maps it to the amount, credits and Stripe price. The client never
sends an amount.

### 5.2 Checkout
`POST /api/credits/checkout { planId }` →
1. Member, kill switch on, 18+ declared, account not flagged, plan valid.
2. Daily cap: `Σ amount` of this member's `paid` purchases + `open` sessions created in the current HK
   calendar day + this plan ≤ `PURCHASE_DAILY_CAP_HKD` (1,000), else `429 daily_cap_reached` with
   `remainingHkd`.
3. Create a **hosted Checkout Session**: `mode=payment`, currency **HKD**, one line item (`STRIPE_PRICE_*`
   when set, else inline `price_data` from the plan table), `client_reference_id=<user_id>`,
   `metadata={user_id, plan_id, credits}`, `payment_intent_data.metadata` (same),
   `success_url=APP_ORIGIN/?tab=credits&checkout=success&session_id={CHECKOUT_SESSION_ID}`,
   `cancel_url=APP_ORIGIN/?tab=credits&checkout=cancel`, `expires_at` = now + 30 min, an idempotency key
   per request, and `customer_creation=if_required`. Stripe sends receipts (set the receipt email on the
   Stripe account). Payment methods: card (incl. Apple Pay and Google Pay).
4. Insert a `purchases` row (`open`) and return `{ url }`. The client redirects.

**No card data touches our server.** The success page **does not** grant credits. It polls
`GET /api/credits/purchases/:sessionId` until `paid` (show "Processing…" for up to 30 s, then "We'll add
your credits shortly").

### 5.3 Webhook `POST /api/stripe/webhook`
- Mounted **before** `express.json()` with `express.raw({ type: "application/json" })`. **No Origin/CSRF
  guard, no session.** Signature verified with `STRIPE_WEBHOOK_SECRET` (`constructEvent`, default 300 s
  tolerance). Bad signature → 400.
- Replay protection: store `event.id` in `stripe_events` (UNIQUE). Already seen → 200, no-op.
- `checkout.session.completed` with `payment_status=paid` (and `checkout.session.async_payment_succeeded`):
  look up the `purchases` row by session id. Verify that `amount_total`, `currency=hkd` and metadata match
  the plan. If they do, in one transaction mark it `paid` and add a `purchase` ledger row (key
  `purchase:<session_id>`). On a mismatch, or no matching row (e.g. `stripe trigger` test events) → no
  credit, `[credits:alert]`, still 200.
- `checkout.session.expired` → purchase `expired`.
- Respond 2xx quickly. A processing error → 500, so Stripe retries (idempotency makes retries safe).

### 5.4 Refunds and disputes
| Event | Action |
|---|---|
| `charge.refunded` (full or partial) | Debit `credits × refunded/amount` (rounded up), **capped at the current balance**. Purchase → `refunded`. Account **flagged** if the debit was capped (credits already spent) |
| `charge.dispute.created` | Same debit (capped). Account **flagged** (no purchases, no LIVE bets) until the operator unflags it |
| `charge.dispute.closed` (won) | No automatic re-credit. Alert. The operator decides with `adjust` |

Refunds are issued only by the operator in the Stripe dashboard. There is no self-serve refund (credits are
non-refundable, §8.4).

### 5.5 Setup
`npm run stripe:setup` (test or live key from env) creates the product "Post Time credits" and 3 HKD prices,
then prints `STRIPE_PRICE_P10/P100/P300` for `.env`. It is idempotent (looks up existing prices by
`lookup_key`).

---

## 6. Data model and API

### 6.1 Tables (members.sqlite, migration v2)
| Table | Key columns | Notes |
|---|---|---|
| `wallets` | `user_id` PK FK CASCADE, `balance` INT CHECK ≥ 0, `flagged` INT, `flag_reason`, `updated_at` | One per member |
| `credit_ledger` | `id`, `user_id`, `kind`, `amount` INT (signed), `balance_after`, `ref_type` (bet/purchase/admin), `ref_id`, `idem_key` UNIQUE, `actor` (system/stripe/operator name), `note`, `created_at` | Append-only. Index (`user_id`, `id` DESC) |
| `live_bets` | `id` (uuid), `user_id`, `slip_key`, `date`, `venue`, `bet_type`, `selection` JSON, `race_ids` JSON, `first_post_time`, `unit`, `combos`, `stake`, `status` (pending/won/lost/void), `refunded_combos`, `refund`, `payout`, `result` JSON (`SettleResult`), `hold_reason`, `settle_attempts`, `created_at`, `settled_at` | Index (`status`, `date`, `venue`), (`user_id`, `created_at` DESC) |
| `idempotency_keys` | `key`+`user_id` PK, `body_hash`, `response` JSON, `created_at` | Purged after 7 days |
| `purchases` | `stripe_session_id` PK, `user_id`, `plan_id`, `amount_hkd`, `credits`, `status` (open/paid/expired/refunded/disputed), `payment_intent_id`, `created_at`, `paid_at` | Daily-cap query by (`user_id`, `created_at`) |
| `stripe_events` | `event_id` PK, `type`, `received_at`, `processed_at` | Replay guard |
| `declarations` | `user_id`, `kind` (`adult_18`), `terms_version`, `declared_at`, `ip` | 18+ self-declaration |
| `bonus_claims` | `phone_hash` PK (HMAC-SHA256(phone, `CREDITS_PEPPER`)), `claimed_at` | Survives account deletion |
| `admin_audit` | `id`, `operator`, `command`, `args` JSON, `before` JSON, `after` JSON, `reason`, `created_at` | Survives account deletion |
| `race_schedule` | §2.2 (in the race-data DB next to `racecards`) | |

### 6.2 API contract
Errors use the existing shape `{ error: { code, … } }`. Mutating member routes keep the CSRF/Origin guard.
Money-related routes are rate-limited per member (checkout 10/h, live-bets 60/h).

| Endpoint | Auth | Request | 200 response | Errors |
|---|---|---|---|---|
| `GET /api/config` (extended) | public | — | + `features: { liveBetting, purchases }`, `credits: { signupBonus, minUnit: 10, termsVersion }` | — |
| `GET /api/me` (extended) | optional | — | + `user.adultDeclaredAt` | — |
| `POST /api/me/declarations` | member | `{ kind: "adult_18", confirm: true, termsVersion }` | `{ user }` | 400 `confirm_required` |
| `GET /api/credits` | member | `?cursor` | `{ balance, flagged, ledger: [{ id, kind, amount, balanceAfter, ref, createdAt }] }` (50 per page) | 401 |
| `GET /api/credits/plans` | public | — | `[{ id, priceHkd, credits, badge }]` | 503 `feature_disabled` |
| `POST /api/credits/checkout` | member | `{ planId }` | `{ url }` | 400 `invalid_plan`, 403 `age_declaration_required`, 403 `account_flagged`, 429 `daily_cap_reached` (+`remainingHkd`), 503 `feature_disabled`, 502 `payment_unavailable` |
| `GET /api/credits/purchases/:sessionId` | member (owner only) | — | `{ status, credits, balance }` | 404 |
| `POST /api/stripe/webhook` | Stripe signature | raw body | `{ received: true }` | 400 `bad_signature` |
| `POST /api/live-bets` | member | Header `Idempotency-Key`. `{ items: [{ date, venue, selection, unit }] }` (≤ 20) | `{ bets: LiveBet[], balance }` | 400 `invalid_selection` / `scratched_runner` / `unit_too_small` / `pool_not_designated` / `too_many_items` / `stake_too_large`, 402 `insufficient_credits` (+`balance`, `required`), 403 `age_declaration_required` / `account_flagged`, 409 `race_closed` / `race_not_open`, 409 `idempotency_conflict`, 503 `feature_disabled`. Item errors carry `items: [{ index, code, raceNumber?, horse? }]` |
| `GET /api/live-bets` | member | `?status=pending\|settled&cursor` | `{ bets: LiveBet[], serverNow }` | 401 |
| `GET /api/days`, `GET /api/meeting/:date/:venue` (extended) | public | — | + `serverNow`, `mode: "practice"\|"live"\|"closed"`, `races: [{ raceNumber, postTime, status, closesInSec }]` (§2.3), designated DT/TT legs for upcoming meetings | — |

`LiveBet` = `{ id, date, venue, betType, betLabel, picks, unit, combos, stake, status, refund, payout, result: SettleResult | null, placedAt, settledAt, held: boolean }`.

### 6.3 History integration
- `HistoryEntry` gains `mode: "practice" | "live"` (missing = practice) and `status: "pending" | "won" | "lost" | "void"` for LIVE.
- `GET /api/history` returns practice entries (`bet_history`) **merged** with the member's LIVE bets
  (from `live_bets`, mapped to `HistoryEntry`), newest first.
- LIVE rows show a **LIVE** badge, the amounts in credits, and "Pending / 待結算" until settled. Practice
  rows show a **Practice** badge and HK$.
- LIVE rows are financial records: **not deletable**. "Delete" and "Clear all" apply to practice rows only.
- Day totals are split: Practice (HK$) and Live (credits: staked, returned, net).

---

## 7. UI requirements (for the designer)

Follow DESIGN.md (navy structure, one gold CTA per view, no HKJC branding) and the membership DESIGN-SPEC.

| # | Surface | Requirement |
|---|---|---|
| U1 | Header | Members see their **credit balance** (coin icon + number) next to the avatar. Tap → Credits page. Hidden for guests and when `features.liveBetting=false`. The current "Practice" badge becomes a mode indicator |
| U2 | Race chips | Each race chip shows its status: settled (practice), **LIVE** (open, countdown "closes in 12:34" under 1 h), closed (lock, "Awaiting result"), void, unavailable |
| U3 | Mode banner | Above the racecard: "Practice: free, settles instantly" vs. "Live: costs credits, settles after the race". Different colours from the §2 tokens (practice = sky, live = navy). The two modes must never look alike |
| U4 | Stake calculator / slip (LIVE) | Amounts in **credits**, not HK$ ("Bet total 120 credits"). Slip shows the total and "Balance after: 880". The confirm step has no auto-confirm, an explicit **Confirm** and the copy "Live bets are final" |
| U5 | Guest on a LIVE race | Ticking works. Add → login sheet ("Log in to bet live with free credits"). After login, return with the state kept |
| U6 | 18+ declaration modal | Shown before the first LIVE bet and before the first purchase: "I confirm I am 18 or over" checkbox, a link to the credit terms, Confirm/Cancel. Once only per member |
| U7 | Insufficient balance | Inline error on the slip: "Not enough credits (need 1,200, have 880)", with a gold **Buy credits** button → purchase sheet. After a successful purchase, return to the slip with it kept |
| U8 | Purchase sheet / page (`?tab=credits`) | 3 plan cards, `p300` marked **Best value**, credits per HK$ shown. One gold CTA. "Credits have no cash value and cannot be refunded or withdrawn" plus a terms link above the CTA. Daily-cap message. Below: the ledger list |
| U9 | Checkout return | `checkout=success`: "Processing…" then "+1,200 credits added" toast and the new balance. `checkout=cancel`: neutral "Purchase cancelled", no error styling |
| U10 | Pending bets | History LIVE rows "Pending" with a race time. The bet page shows "N pending live bets" (link to History) |
| U11 | Settlement notice | When a pending bet settles (detected on poll or next load), a toast "R5 Trio won +2,340 credits" / "R5 Trio lost" / "R5 refunded". An unread badge on the History tab until viewed |
| U12 | Kill switch | `features.liveBetting=false`: no LIVE chips, no buy button. Upcoming races show "Live betting is not available". Balance and History are still visible |
| U13 | Flagged account | Buy and LIVE are disabled with "Contact support" |
| U14 | Copy | Every new string in zh-HK and en (new namespace `credits`). Never use "win money", "cash" or "prize" |

---

## 8. Analytics, abuse/security, legal

### 8.1 Analytics (`track()`, **no PII**: no ids, phone, names, session ids)
| Event | Params |
|---|---|
| `mode_view` | `mode: practice\|live` |
| `live_bet_placed` | `bet_type`, `items`, `combos_bucket`, `stake_bucket` (`<100`, `100–999`, `1k+`) |
| `live_bet_rejected` | `code` |
| `live_bet_settled_seen` | `outcome: won\|lost\|void` |
| `insufficient_credits` | `shortfall_bucket` |
| `credits_checkout_started` / `_completed` / `_cancelled` | `plan_id` |
| `daily_cap_hit` | — |
| `age_declared` | `context: bet\|purchase` |
| `signup_bonus_seen` | `cohort: new\|existing` |

The existing `practice_bet` is unchanged.

### 8.2 Abuse and security
| Threat | Requirement |
|---|---|
| Forged webhook | Signature verified on the raw body. The secret is only in env |
| Replayed webhook | `stripe_events` unique on event id, plus ledger idempotency on session id |
| Price tampering | The client sends `planId` only. The server sets the amount. The webhook re-checks `amount_total` and currency against the plan |
| Betting after the start (past-posting) | Server clock, fail closed on an unknown or stale post time, one-way `closed_at`, the result's existence closes the race. The client's time and status are never trusted |
| Double submit / retries | `Idempotency-Key` per slip. The Confirm button is disabled while sending |
| Concurrency (two tabs) | `BEGIN IMMEDIATE` transaction, balance re-checked inside it, `CHECK (balance >= 0)` |
| Double payout | Conditional status update + unique `payout:`/`refund:` keys (§4.2) |
| Negative balance | DB CHECK. Reversals and admin adjustments are capped at the balance |
| Selection tampering | The server recomputes combos and cost and validates horses against the card |
| Bonus farming | One bonus per phone hash, ever. OTP rate limits and Turnstile already limit new accounts |
| Card testing / fraud | Stripe Radar (default). Daily cap. Checkout rate limit. Flag on dispute |
| CSRF | Existing Origin guard on all new mutating member routes, except the webhook |
| Secrets | `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` never logged or sent to the client. Log only the last 4 characters of the session id |

### 8.3 Production guards (server refuses to start)
- `FUTURE_BETTING=1` in production without `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
- A `sk_live_` key without `STRIPE_LIVE_APPROVED=1` (set only after legal and Stripe clearance).
- A `sk_test_` key in production → allowed but logs a warning (test mode first).

### 8.4 Terms, PDPO, account deletion
- **Terms page** (`?tab=terms`, both locales) gets a Credits section: credits are a virtual in-app token with
  **no cash value**. They are **non-refundable, non-transferable, not withdrawable, and cannot be exchanged
  for money, goods or prizes**. LIVE bets are final. Settlement follows HKJC published results and
  dividends, but the service is not affiliated with HKJC. We may void bets or adjust balances to correct
  errors. Users must be 18+. We may suspend LIVE mode at any time. Version the terms (`termsVersion`) and
  record the accepted version on the declaration. Update the Sales page (`?tab=sales`) with the plans and the
  no-refund rule.
- **Privacy page:** Stripe processes payment data (we never see card numbers). We store purchase records
  (session id, amount, time), the credit ledger, LIVE bets and the 18+ declaration. Purpose: providing
  credits, fraud prevention and accounting. Retention: see below.
- **Account deletion** (existing flow): the dialog warns "You will lose N credits and your pending live bets".
  Pending bets are voided **without refund**. The wallet, live bets and declarations are deleted.
  Ledger, purchase and audit rows are **anonymised** (user_id replaced by a random tombstone) and kept for
  accounting (see Open Question 2). `bonus_claims` stays, so the bonus is not granted again.

---

## 9. Config / env

| Variable | Default (dev) | Notes |
|---|---|---|
| `FUTURE_BETTING` | `0` | `1` enables LIVE bets **and** purchases. `0`: LIVE and checkout return 503 and are hidden. Settlement and webhooks still run |
| `STRIPE_SECRET_KEY` | — | `sk_test_…` first. Secret |
| `STRIPE_WEBHOOK_SECRET` | — | `whsec_…` (from `stripe listen` in dev). Secret |
| `STRIPE_PRICE_P10` / `STRIPE_PRICE_P100` / `STRIPE_PRICE_P300` | unset | Optional. Unset → inline `price_data` from the plan table |
| `STRIPE_LIVE_APPROVED` | unset | Must be `1` to accept a `sk_live_` key (legal gate) |
| `CREDITS_SIGNUP_BONUS` | `1000` | |
| `CREDITS_PEPPER` | dev value | HMAC key for `bonus_claims`. Secret, required in production |
| `PURCHASE_DAILY_CAP_HKD` | `1000` | Per member per HK calendar day |
| `LIVE_MAX_STAKE` | `50000` | Credits per bet item |
| `APP_ORIGIN` | `http://localhost:5173` | Already exists. Used for the success/cancel URLs (first value) |
| `DATA_FETCH` | — | Already exists. Must be `1` for LIVE (§2.2) |

**Dev:** Stripe test mode, then
```
stripe login
stripe listen --forward-to localhost:8787/api/stripe/webhook   # copy whsec_… into STRIPE_WEBHOOK_SECRET
npm run stripe:setup                                           # optional: create prices
```
To test LIVE without waiting for a real meeting, engineering provides a dev-only clock override
(`DEV_NOW=2026-10-04T12:00:00+08:00`), refused in production, and a fixture meeting with future post times.

---

## 10. QA checklist

Environment: Stripe test mode, `stripe listen`, `FUTURE_BETTING=1`, `DATA_FETCH=1` or fixtures with
`DEV_NOW`, mock OTP. Check every UI case in zh-HK and en, at desktop width and 390 px.

### Credits and bonus
- [ ] New member → balance 1,000, one `signup_bonus` row, toast once.
- [ ] Existing member (created before release) → 1,000 on the first request. Reload / second device → no second bonus.
- [ ] Delete account → sign up again with the same number → balance 0, no bonus.
- [ ] `FUTURE_BETTING=0` → bonus still granted, balance shown, no LIVE and no buy UI. API calls → 503 `feature_disabled`.

### LIVE placement
- [ ] Open race: Trio 3 horses × 10 → 10 credits debited, bet `pending`, shown in History as LIVE + Pending.
- [ ] Unit 9 → `unit_too_small`. Unit 10.5 → rejected. Client-sent `combos`/`cost` tampered → ignored, server values used.
- [ ] Slip with 3 items, balance enough for 2 → `insufficient_credits`, **nothing** placed, balance unchanged.
- [ ] Slip with 1 closed race + 1 open → `race_closed` for that item, nothing placed.
- [ ] Practice item + LIVE item → "clear slip" dialog. LIVE confirm does not auto-fire after 5 s.
- [ ] Same `Idempotency-Key` sent twice (and double-tap Confirm) → one debit. Same key, different body → 409.
- [ ] Two tabs placing at once with balance for only one → one succeeds, one `insufficient_credits`, balance ≥ 0.
- [ ] Guest ticks on a LIVE race → Add opens login; state kept after login.
- [ ] First LIVE bet → 18+ modal. Cancel → nothing placed. Confirm → placed, modal never shown again.
- [ ] Post time passes while on the confirm step → `race_closed`, item highlighted, rest kept.
- [ ] Race with unknown post time or stale schedule → `unavailable`, cannot bet.
- [ ] Device clock set a day early → still closed (server time).
- [ ] Scratched horse ticked → `scratched_runner`.
- [ ] DT/TT on non-designated legs → `pool_not_designated`. Designated → closes at leg 1's post time.

### Settlement
- [ ] Results stored → bet settles within one tick. Won payout = `floor(div × unit/10 × combosWon)`, matching the practice result for the same selection.
- [ ] Unit 15 on a $45.5 dividend → floor applied.
- [ ] Two sweeps running at once (or a restart mid-settlement) → exactly one payout row.
- [ ] Scratching after placement: leg horse → partial refund of the affected combos, rest settled. Banker → full refund, `void`. Win bet on the scratched horse → full refund.
- [ ] Dead heat at 3rd (fixture) → Trio pays on both combos with the correct dividend, or is held if the dividend is ambiguous.
- [ ] Race `ABANDONED` → `void`, full refund. `void-meeting` → all pending refunded.
- [ ] Hit with a missing dividend → stays pending (held), alert logged, `resolve-bet --dividend` settles it.
- [ ] DT: leg 1 result alone → still pending. Both legs → settled.
- [ ] `FUTURE_BETTING` switched to 0 with pending bets → they still settle.
- [ ] Settlement toast and History badge appear. LIVE rows cannot be deleted; Clear all keeps them.

### Stripe (test cards: any future expiry, any CVC)
- [ ] `4242 4242 4242 4242` on each plan → +100 / +1,200 / +4,000 exactly once. Stripe receipt sent. Success page shows "Processing…" then the new balance.
- [ ] `4000 0000 0000 9995` (insufficient funds) → declined on Stripe's page, no credit, purchase stays `open` → `expired`.
- [ ] `4000 0025 0000 3155` (3DS) → complete the challenge → credited. Fail the challenge → no credit.
- [ ] Cancel on Checkout → `checkout=cancel` screen, no credit.
- [ ] Close the tab after paying (never reach the success URL) → still credited via the webhook.
- [ ] `stripe events resend <evt>` (replay) → no second credit.
- [ ] `stripe trigger checkout.session.completed` (no our-metadata) → 200, no credit, alert logged.
- [ ] Webhook with a bad or missing signature → 400. Webhook with a foreign Origin → still accepted when signed (no CSRF guard).
- [ ] POST `/api/credits/checkout { planId: "p300", amount: 1 }` → amount ignored, HK$300 session. Unknown plan → `invalid_plan`.
- [ ] Daily cap: buy HK$300 × 3 → 4th (HK$300) → `daily_cap_reached` with `remainingHkd: 100`. Next HK day → allowed.
- [ ] Refund in the dashboard (balance enough) → credits debited. Refund after spending → debit capped at the balance, account flagged, buy/LIVE disabled. `unflag` restores them.
- [ ] Dispute with `4000 0000 0000 0259` → debit + flag.
- [ ] First purchase → 18+ modal (unless already declared).

### Operator, security, legal
- [ ] `credits adjust` without `--reason` or `--operator` → refused. With them → ledger + `admin_audit` row. An adjustment that would go negative → refused.
- [ ] `credits reconcile` on a clean DB → OK. Manually corrupt a wallet → alert.
- [ ] Production boot: `sk_live_` without `STRIPE_LIVE_APPROVED=1` → refuses. `FUTURE_BETTING=1` without the webhook secret → refuses.
- [ ] Logs contain no secret keys, card data or full phone numbers.
- [ ] Terms, privacy and sales pages show the credit clauses in both locales. No "cash", "prize" or "win money" copy anywhere.
- [ ] Account deletion with a balance → warning shows N credits. Ledger rows anonymised, not deleted.
- [ ] Practice regression: the membership QA checklist and the existing practice flow are unchanged (auto-confirm, instant settle, guest save prompt).

---

## 11. Open questions for the owner (blockers)

1. **Legal gate:** who obtains the HK counsel opinion (Cap. 148 / HKJC exclusivity) and Stripe's written
   approval, and until then may production carry the feature dark (`FUTURE_BETTING=0`, test keys only)?
   *PM default: yes, dark in production; LIVE only on a non-public staging host.*
2. **Account deletion vs. records:** on deletion, credits are forfeited and pending LIVE bets voided without
   refund, while purchase and ledger records are kept **anonymised for 7 years** (HK business-records
   practice). Do you accept this, and does counsel agree it fits PDPO? *PM default: yes.*
3. **Bonus once per phone number, ever** (survives deletion and re-sign-up, stored as a keyed hash). OK?
   *PM default: yes.*
