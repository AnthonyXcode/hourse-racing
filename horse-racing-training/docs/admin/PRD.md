# PRD — Admin panel with roles

| | |
|---|---|
| Product | Post Time / 開跑前 |
| Version | v1 |
| Status | Draft for build |
| Owner | PM |
| Readers | Design, Engineering, QA, Owner |
| Date | 2026-10-04 |
| Depends on | [Membership PRD](../membership/PRD.md), [Credits PRD](../credits/PRD.md) (both built) |

**Today:** all operator work goes through the shell CLI `npm run credits -- …` (`server/credits/cli.ts`):
show, adjust, pending, resolve-bet, void-race, void-meeting, flag/unflag, settle, reconcile. Each write
is recorded in `admin_audit` with a free-text `--operator` name. There is no in-app staff access, and no
way to see users, bets or purchases except by querying SQLite directly.
**After v1:** a web panel at **`/admin`** for two staff roles, using the existing phone + OTP login.
**Admins** can see everything, read-only. **The owner** can also do the CLI's write actions plus change
roles. Every write and every view of a member's personal data is logged.

---

## 1. Goals / non-goals

### Goals
| # | Goal | Measure |
|---|---|---|
| G1 | Three roles (user, admin, owner) on the existing login | No new credentials. The role is resolved on the server for every request |
| G2 | Exactly one owner, set by `OWNER_PHONE` in `.env`, never by the UI | Owner = `OWNER_PHONE`. Production refuses to start without a valid value |
| G3 | Admins can see all operational data and change nothing | Every admin write attempt → 403 (tested route by route) |
| G4 | The owner can do the CLI's write actions in the browser, safely | Confirm step + idempotency + audit row for every write. Same rules and code as the CLI |
| G5 | Accountability (PDPO) | Every write and every member-detail view or export appears in the audit or access log with actor, time and IP |
| G6 | Normal users are unaffected | No admin code or data in the main bundle. No change to the app's flows |

### Non-goals (v1)
- Deleting, suspending or banning users (flagging stays the only restriction). Editing other members'
  profiles. Editing, cancelling or creating bets.
- More than one owner. Handing over ownership in the UI (it's done by changing `OWNER_PHONE`, §2.2).
- Impersonating a user ("log in as").
- Issuing Stripe refunds from the panel (still done in the Stripe dashboard; the webhook handles the credits).
- Custom roles, per-permission grants, or admin write permissions.
- Editing config or flipping `FUTURE_BETTING` from the UI (shown read-only).
- Real-time push. Pages refresh on load and with a Refresh button (dashboard auto-refreshes every 60 s).
- Removing the CLI. It stays as the break-glass tool and writes to the same audit table (§6.3).

---

## 2. Roles

### 2.1 Definitions
| Role | How it's assigned | Stored |
|---|---|---|
| `user` | Default for every member | `users.role = 'user'` |
| `admin` | Granted or revoked by the owner only | `users.role = 'admin'` |
| `owner` | The member whose `phone_e164` equals the normalised `OWNER_PHONE`, **worked out on every request** | **Never stored.** The owner's `users.role` stays `user` and is ignored |

Rules:
- Effective role = `owner` if the phone matches `OWNER_PHONE`, else `users.role`. It's checked on the
  server for every `/api/admin/*` request, so granting or revoking takes effect on the very next request.
  There's no role in the session or the cookie.
- The owner can't be demoted, and the owner's row can't be given a role (`409 cannot_change_owner`).
  Nobody can change their own role.
- An admin whose role is revoked keeps their app session. Their next `/api/admin` call gets 403.
- Owner handover: change `OWNER_PHONE` and restart. The old owner falls back to their stored role, which
  is `user`. The new owner gets owner rights after logging in. The audit log records a `system` row
  `owner_changed` (old/new last 4 digits) on the first start with a different value.
- If the owner deletes their account and signs up again with the same number, they're still the owner.
- `OWNER_PHONE` is set but nobody has signed up with that number yet → there's no owner until they sign up.

### 2.2 Production guard
The server refuses to start if `NODE_ENV=production` and `OWNER_PHONE` is missing or isn't a valid HK
mobile number (`normalizeHkMobile`). In dev, if it's unset the server logs a warning and runs with no owner.

### 2.3 Role matrix
✓ = allowed, 👁 = masked view, — = 403 / not shown.

| Area / action | user | admin | owner |
|---|---|---|---|
| Use the app (bet, credits, history, own profile) | ✓ | ✓ | ✓ |
| Open `/admin` | — ("No access") | ✓ | ✓ |
| Dashboard KPIs, system status, alerts | — | ✓ | ✓ |
| Users list + search by name / phone last 4 | — | ✓ | ✓ |
| Search by full phone number | — | — | ✓ |
| User detail: display name, avatar, role, created / last login, balance, flag, sessions count | — | ✓ | ✓ |
| Phone (login) | — | 👁 `+852 •••• 5678` | ✓ full |
| WhatsApp | — | 👁 `+852 •••• 5678` (country code + last 4) | ✓ |
| Email | — | 👁 `a•••@gmail.com` | ✓ |
| Telegram | — | 👁 `@ab•••` | ✓ |
| Description (free text) | — | — (hidden: may contain anything) | ✓ |
| IP addresses (declarations, audit) | — | 👁 `203.0.113.x` | ✓ |
| Ledger, LIVE bets, practice bets, purchases (incl. Stripe ids) | — | ✓ | ✓ |
| Held bets queue | — | ✓ (view) | ✓ |
| Audit log (writes) | — | ✓ | ✓ |
| Access log (who viewed what) | — | — | ✓ |
| CSV export (any dataset) | — | — | ✓ |
| Change role user ↔ admin | — | — | ✓ (step-up) |
| Credit adjust ± | — | — | ✓ (step-up when \|amount\| ≥ threshold) |
| Flag / unflag | — | — | ✓ |
| Resolve a held bet (settle / void / dividend) | — | — | ✓ |
| Void a race | — | — | ✓ |
| Void a meeting, or void with "include resulted races" | — | — | ✓ (step-up) |

The masking is done **on the server**. Data an admin isn't allowed to see is never sent to the browser.

---

## 3. Pages (`/admin`, lazy-loaded)

Layout follows DESIGN.md: navy header with "Post Time · Admin" and a role chip (Admin / Owner), side menu
on desktop and a menu sheet on phones, dense tables (44 px rows, tabular numbers, zebra), one gold CTA per
view. The owner's write buttons are navy outline buttons; the gold CTA is the confirm button inside the
confirm dialog. Admins see **no** write buttons at all (not disabled ones). Bilingual (zh-HK / en) with a
lazy-loaded `admin` namespace. Bookmarkable URLs: `/admin/<page>?filters…`.

| Page | Path | Contents |
|---|---|---|
| **Gate** | `/admin` (not signed in / not staff / idle) | Guest → the existing login sheet. `user` → "You don't have access to this page" + link to the app (no other detail). Staff with an expired admin session → "Confirm it's you" OTP step (§7.2) |
| **Dashboard** | `/admin` | KPI tiles (§3.1). Alerts list (open alerts, newest first, each with a link to the bet or user). Mini status strip (FUTURE_BETTING, DATA_FETCH, Stripe mode) |
| **Users** | `/admin/users` | Search: name (contains) or phone last 4 (owner: also a full number). Filters: role, flagged, balance > 0, has LIVE bets, created date range. Sort: created, last login, balance. Columns: name, masked phone, role, balance, pending LIVE, created, last login, flag. 50 per page |
| **User detail** | `/admin/users/:id` | Header: avatar, name, role chip, flag badge, balance. Profile panel (masking per §2.3). Tabs: Ledger · LIVE bets · Practice bets · Purchases · Declarations (18+, terms version, date) · Sessions (count, last seen). Owner action bar: Change role, Adjust credits, Flag/Unflag. **Viewing this page writes an access-log row** |
| **Bets** | `/admin/bets` | Practice + LIVE in one list. Filters: mode, status (pending/held/won/lost/void, practice hit/miss), meeting date + venue, race, bet type, user. Columns: placed, user, mode, meeting/race, type, picks, stake/cost, payout, status. Row → bet detail drawer (selection, `SettleResult`, refund, hold reason, attempts). Owner: Resolve action on held bets |
| **Transactions** | `/admin/ledger` | All ledger rows. Filters: kind, user, date range, actor (system/stripe/operator name). Totals for the filtered set (sum of + and −) |
| **Purchases** | `/admin/purchases` | Filters: status (open/paid/expired/refunded/disputed), plan, date range, user. Columns: created, user, plan, HK$, credits, status, reversed credits, Stripe session id, payment intent id (each with a link to the Stripe dashboard, test or live by key mode). Totals: count and HK$ for the filtered set |
| **Held bets** | `/admin/held` | Queue of `pending` bets with `hold_reason`, oldest first: reason, held since, bet, user, stake. Owner: Resolve (settle / void / enter dividend) |
| **Races** | `/admin/races` | Meeting picker → races with status (§2.3 of the credits PRD), post time, pending LIVE bets and stakes per race. Owner: Void race / Void meeting (with preview, §5.3) |
| **Audit log** | `/admin/audit` | Every write (panel + CLI + system), newest first. Filters: actor, action, target, date. Row shows the before/after diff and reason |
| **Access log** | `/admin/access` (owner only) | Who viewed which member's detail and who exported what, when, from which IP |
| **System** | `/admin/system` | FUTURE_BETTING, `liveEnabled`, DATA_FETCH, DEV_NOW (dev only), Stripe mode (`test`/`live`/`none`, from the key prefix, never the key), STRIPE_LIVE_APPROVED, last fetch run (time, ok, failures, from `runLog`), last settlement sweep (time, settled/held/failed), last reconcile (time, result, issues), server time (HK), app version |

### 3.1 Dashboard KPIs (all in HK time, "today" = HK calendar day)
| KPI | Definition |
|---|---|
| Members | Total users. + new today |
| Active today | Distinct users with a login, ledger row, LIVE bet or saved practice bet today. (Session `last_seen_at` moves only once a day, so it isn't used.) |
| LIVE pending | Pending LIVE bets count and stake total. Of these, **held** count (links to Held bets) |
| Credits outstanding | `Σ wallets.balance`, plus credits locked in pending stakes |
| Purchases today | Paid count and HK$ total. Refunds/disputes today |
| Credits issued today | Bonus, purchase, payout, refund and admin adjustments, by kind |
| Alerts | Open `system_alerts` count, by kind (held bet, no result after 6 h, reconcile issue, webhook mismatch, sweep failure) |

---

## 4. Owner write actions

All five reuse the CLI's logic. Engineering moves that logic out of `cli.ts` into a shared
`server/admin/actions.ts` used by **both** the CLI and the API, so the rules can't drift apart.

| Action | Input | Rules (same as CLI unless noted) | Step-up |
|---|---|---|---|
| **Change role** | `role: user\|admin`, reason | Target isn't the owner, isn't yourself, role actually changes. Takes effect on the target's next request | **Yes** |
| **Credit adjust** | `amount` (non-zero whole number, ±, \|n\| ≤ 1,000,000), reason | Writes an `admin_adjust` ledger row (actor = `owner:<last4>`). Refused if the balance would go below 0 (`insufficient_credits`). Allowed on the owner's own wallet; the audit row is tagged `self` | **Yes** if \|amount\| ≥ `ADMIN_STEPUP_CREDITS` (1,000) |
| **Flag / unflag** | `flagged: boolean`, reason | Sets `wallets.flagged` and `flag_reason` | No |
| **Resolve held bet** | `action: settle\|void\|dividend`, `dividend` (HK$ per $10, ≥ 0) when `dividend`, reason | `settlement.resolve()`. Bet must still be pending. Returns the CLI's messages as codes (`results_not_stored`, `still_held`, `bet_not_pending`) | No |
| **Void race / meeting** | `date`, `venue`, `raceNo?`, `includeResulted` (default false), reason | Same as `void-race`/`void-meeting`: races that already have a result are **skipped** unless `includeResulted`. Then a settlement sweep for the meeting | Race: no. **Meeting, or `includeResulted`: yes** |

Common requirements for every write:
1. **Confirm step:** a dialog shows the target, the exact change (before → after, e.g. "Balance 880 →
   1,380"; "Void R5, R6. Skipped (already resulted): R1–R4. 23 bets, 4,560 credits refunded"), and a required
   reason (10–200 chars, same limit on server and UI). Confirm button = gold.
2. **Preview for voids:** `POST …/void/preview` returns the races, skipped races, bets and refund total
   without writing anything. The confirm dialog shows it.
3. **Stale-state guard:** the request carries what the owner saw (`expected: { balance }`, `{ role }`,
   `{ flagged }`, bet status). If it has changed → `409 stale_state` with the current value, nothing written.
4. **Idempotency:** header `Idempotency-Key` (UUID per confirm dialog). The same key + body returns the
   first response. Same key with a different body → `409 idempotency_conflict`. Uses the existing
   `idempotency_keys` table.
5. **One transaction:** the change and its audit row are written together (`BEGIN IMMEDIATE`). If the audit
   insert fails, nothing changes. (The current CLI writes the flag outside a transaction and only audits
   `resolve-bet` on success; the shared module fixes both, and failed attempts get an audit row with
   `outcome: refused`.)

---

## 5. API contract (`/api/admin/*`)

General rules:
- Session cookie as today. **Guest → 401 `unauthorized`. Logged-in `user` → 403 `forbidden`. Admin calling
  an owner-only route → 403 `owner_only`.** The check is middleware on the whole `/api/admin` router, and
  each route also declares its minimum role (fail closed: a route without a declared role isn't mounted).
- Admin session idle > `SESSION_TTL_DAYS` → 401 `admin_reauth_required` (§7.2).
- Writes: `POST` only, behind the existing Origin/CSRF guard and JSON-only, `Idempotency-Key` required
  (400 `idempotency_key_required`), `reason` required (400 `reason_required`).
- Lists: `?page=1&limit=50` (limit ≤ 100), filters as query params, server-side sort.
  Response `{ items, page, limit, total }`.
- Every response: `Cache-Control: no-store`, `X-Robots-Tag: noindex`.
- Errors: `{ error: { code, … } }` as everywhere else.

| Endpoint | Min role | Request | 200 response |
|---|---|---|---|
| `GET /api/admin/me` | admin | — | `{ role, displayName, phoneLast4, adminSessionExpiresAt, stepUpUntil }` |
| `POST /api/admin/session/start` | admin | `{ turnstileToken }` | OTP sent to **the caller's own phone** (no phone in the body). `{ resendIn, expiresIn }` |
| `POST /api/admin/session/check` | admin | `{ code }` | `{ adminSessionExpiresAt, stepUpUntil }` |
| `GET /api/admin/dashboard` | admin | — | KPIs (§3.1) + open alerts (top 20) |
| `GET /api/admin/system` | admin | — | §3 System fields |
| `GET /api/admin/users` | admin | `q`, `role`, `flagged`, `hasBalance`, `hasLive`, `createdFrom`, `createdTo`, `sort` | `AdminUserRow[]` (masked per role) |
| `GET /api/admin/users/:id` | admin | — | `AdminUserDetail` (masked per role). **Logs access** |
| `GET /api/admin/users/:id/ledger` · `/live-bets` · `/practice-bets` · `/purchases` · `/sessions` | admin | paging | lists. **Log access** (one row per request) |
| `GET /api/admin/bets` | admin | `mode`, `status`, `held`, `date`, `venue`, `raceNo`, `betType`, `userId` | `AdminBetRow[]` |
| `GET /api/admin/bets/:id` | admin | — | LIVE bet detail (selection, `SettleResult`, hold, attempts) |
| `GET /api/admin/ledger` | admin | `kind`, `userId`, `actor`, `from`, `to` | rows + `{ sumIn, sumOut }` |
| `GET /api/admin/purchases` | admin | `status`, `planId`, `userId`, `from`, `to` | rows + `{ count, hkd }` |
| `GET /api/admin/held` | admin | — | held bets |
| `GET /api/admin/races` | admin | `date`, `venue` | races with status, post time, pending bets/stake |
| `GET /api/admin/audit` | admin | `actor`, `action`, `targetType`, `targetId`, `from`, `to` | audit rows (IPs masked for admin) |
| `GET /api/admin/access-log` | owner | `actor`, `targetId`, `from`, `to` | access rows |
| `GET /api/admin/export/:dataset` | owner | `dataset` ∈ `users`, `bets`, `ledger`, `purchases`, `audit`, + the list filters | `text/csv` stream (≤ `ADMIN_EXPORT_MAX_ROWS`). **Logs access** |
| `POST /api/admin/users/:id/role` | owner + step-up | `{ role, reason, expected: { role } }` | `{ user: AdminUserDetail, auditId }` |
| `POST /api/admin/users/:id/credits` | owner (+ step-up ≥ threshold) | `{ amount, reason, expected: { balance } }` | `{ balance, ledgerId, auditId }` |
| `POST /api/admin/users/:id/flag` | owner | `{ flagged, reason, expected: { flagged } }` | `{ flagged, auditId }` |
| `POST /api/admin/live-bets/:id/resolve` | owner | `{ action, dividend?, reason }` | `{ status, payout, refund, auditId }` |
| `POST /api/admin/races/void/preview` | owner | `{ date, venue, raceNo?, includeResulted }` | `{ races, skipped, bets, refundTotal }` (no write, no audit) |
| `POST /api/admin/races/void` | owner (+ step-up for meeting / includeResulted) | same + `reason` | `{ voided, skipped, settled, auditId }` |

Error codes: 401 `unauthorized`, 401 `admin_reauth_required`, 403 `forbidden`, 403 `owner_only`, 403
`step_up_required` (+`action`), 403 `bad_origin`, 400 `reason_required`, 400 `idempotency_key_required`,
400 `invalid_amount`, 400 `invalid_role`, 400 `invalid_filter`, 404 `not_found`, 409 `cannot_change_owner`,
409 `cannot_change_self`, 409 `stale_state` (+`current`), 409 `insufficient_credits`, 409
`bet_not_pending`, 409 `results_not_stored`, 409 `still_held` (+`reason`), 409 `idempotency_conflict`,
429 `rate_limited` (+`retryAfter`).

`AdminUserRow` = `{ id, displayName, phone (masked or full), role, balance, flagged, pendingLive, createdAt, lastLoginAt }`.
`AdminUserDetail` adds `{ avatarUrl, email, whatsapp, telegram, description (owner only), locale, adultDeclaredAt, termsVersion, sessions: { count, lastSeenAt } }`.

---

## 6. Data model changes (members.sqlite, migration v3)

### 6.1 Tables
| Table | Change | Notes |
|---|---|---|
| `users` | + `role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user','admin'))`, + `role_updated_at`, + `role_updated_by` (user id) | `owner` is never stored |
| `sessions` | + `admin_verified_at` INT, + `admin_seen_at` INT, + `step_up_at` INT (epoch ms) | Admin session state lives on the existing session (§7.2) |
| `admin_audit` | + `source` (`panel`\|`cli`\|`system`), `actor_user_id` (null for CLI), `actor_role`, `action`, `target_type` (`user`\|`bet`\|`race`\|`meeting`\|`system`), `target_id`, `ip`, `user_agent` (≤ 200), `idem_key` UNIQUE (nullable), `outcome` (`ok`\|`refused`), `self` INT. Existing columns kept (`operator`, `command`, `args`, `before`, `after`, `reason`, `created_at`); old CLI rows get `source='cli'` | **Append-only:** `BEFORE UPDATE` / `BEFORE DELETE` triggers raise an error. Rows never contain a full phone number, email or other profile text, only user ids and last-4, so they don't need anonymising when an account is deleted |
| `admin_access_log` (new) | `id`, `actor_user_id`, `actor_role`, `kind` (`user_detail`\|`user_tab`\|`export`\|`search_full_phone`), `target_id`, `detail` (tab name / dataset + filters, no PII values), `ip`, `created_at` | Append-only (triggers). Purged after `ADMIN_ACCESS_LOG_DAYS` (only by the daily purge job) |
| `system_alerts` (new) | `key` PK (e.g. `hold:<betId>`), `kind`, `message`, `ref_type`, `ref_id`, `first_seen_at`, `last_seen_at`, `resolved_at` | Today's `[credits:alert]` lines (settlement, reconcile, webhook mismatch) are also written here. Auto-resolved when the condition clears (bet settled, reconcile clean) |
| `system_status` (new) | `key` PK, `value` JSON, `updated_at` | `last_settle_sweep`, `last_reconcile`. The last fetch run comes from the existing `runLog` |

### 6.2 Indexes
`users (role)`, `users (display_name)`, `credit_ledger (kind, created_at)`, `credit_ledger (created_at)`,
`live_bets (created_at)`, `purchases (status, created_at)`, `admin_audit (created_at)`,
`admin_audit (target_type, target_id)`, `admin_access_log (target_id, created_at)`.
Phone last-4 search uses `substr(phone_e164, -4)` (fine at current scale; add a generated column if users > 100k).

### 6.3 CLI alignment
- CLI writes get `source='cli'`, `actor_role='operator'`, `ip=null`, and use the shared actions module (§4).
- New CLI command `role --phone … --set admin|user` (same rules, for break-glass when the panel is down).
  It can't touch the owner.

---

## 7. Security and abuse

### 7.1 Access control
| # | Requirement |
|---|---|
| S1 | One `requireStaff(minRole)` middleware on the `/api/admin` router; each route declares `admin` or `owner`. A unit test enumerates every registered `/api/admin` route and asserts it returns 401 for guests, 403 for users, and 403 `owner_only` for admins on owner routes |
| S2 | Effective role is resolved per request from the DB + `OWNER_PHONE` (§2.1). Never from the client, cookie or a cache longer than the request |
| S3 | The masking (§2.3) is done in the server's DTO mappers, per role. Tests assert that the full phone/email isn't in admin responses (search the raw JSON) |
| S4 | Writes: Origin guard (existing `csrf()` helper), JSON only, Idempotency-Key, reason, stale-state guard, one transaction with the audit row |
| S5 | No user-supplied values in SQL except as bound parameters. Sort/filter keys are checked against an allow-list (`invalid_filter`) |
| S6 | CSV export: owner only. Cells starting with `= + - @` (or tab/CR) are prefixed with `'` (formula injection). Filename has no user input. Every export → access-log row |

### 7.2 Admin session (shorter) and step-up
- The app session stays 30 days. **Entering the admin panel requires an OTP confirmation** ("Confirm it's you")
  that sets `sessions.admin_verified_at`. The admin session then lasts while it's in use: each
  `/api/admin` call moves `admin_seen_at` (at most once a minute). **No admin use for `SESSION_TTL_DAYS`
  (same as the app login; no separate absolute limit) → `admin_reauth_required`** and the OTP step again. A stolen 30-day app cookie
  alone doesn't open the panel.
- **Step-up:** the admin-session OTP also counts as step-up for `ADMIN_STEPUP_MINUTES` (5). After that,
  sensitive owner writes (role change, credit adjust ≥ 1,000, void meeting, `includeResulted`) return
  `403 step_up_required`; the UI asks for a new OTP and then retries the same request (same idempotency key).
- Why OTP for these: they're the actions that change who can see data, mint or remove credits in bulk, or
  refund a whole meeting. They're rare, so the SMS cost is small. Flag/unflag, resolve, void race and small
  adjustments rely on the confirm dialog + reason + audit, since they're frequent and easy to reverse.
- The OTP goes to the caller's own number through the existing provider (Turnstile, cooldown and per-phone
  limits all apply). Logout ends the admin session too (same row).

### 7.3 Rate limits (per staff user, in addition to the existing per-IP limits)
| Route class | Limit |
|---|---|
| Reads | 120 / min |
| Writes | 30 / 10 min |
| Exports | 10 / hour |
| Admin OTP start | existing OTP limits (1/60 s, 5/h, 10/day per phone) |
| Owner-only full-phone search | 30 / hour (each logged) |

### 7.4 Client and routing
- **Lazy loading:** `main.tsx` checks `location.pathname.startsWith("/admin")` and `import()`s
  `src/admin/AdminApp`. The main bundle contains no admin components, strings, routes or API paths beyond
  the dynamic import. QA checks the built `dist/assets` main chunk for "admin" API paths. The admin chunk
  holds no data. Everything comes from the API after the role check.
- **SPA serving:** prod — the existing `app.get("*")` fallback already serves `index.html` for `/admin/*`.
  Add `X-Robots-Tag: noindex, nofollow` to `/admin*` responses. Dev — Vite's SPA fallback serves `/admin`.
  Add a small dev middleware for the same header (or accept it as dev-only).
- `robots.txt`: add `Disallow: /admin`. `/admin` is never in `sitemap.xml`. The admin page also sets
  `<meta name="robots" content="noindex">` when it mounts.
- The app header shows an "Admin" link in the account menu only for staff (from `GET /api/me`, which gains
  `role` for staff only; normal users get no role field).

### 7.5 Other threats
| Threat | Mitigation |
|---|---|
| Admin trying to escalate | Role changes are owner-only and refused for self/owner. Admin routes never accept a role from the body except the owner's role endpoint |
| Owner account takeover | Step-up OTP on the riskiest actions. Twilio Geo-permissions HK only. The audit log shows every change with IP |
| Insider browsing (PDPO) | Masking for admins. Access log on member detail and exports. Owner can review the access log |
| Replay / double click | Idempotency key per confirm dialog + stale-state guard |
| Audit tampering | Triggers block UPDATE/DELETE. The audit row is written in the same transaction as the change. Daily reconcile also checks that each `admin_adjust` ledger row has an audit row |
| Clickjacking | `X-Frame-Options: DENY` / `frame-ancestors 'none'` on `/admin*` |

---

## 8. PDPO
- **Purpose limitation:** staff access is for operating the service: support, fraud and abuse checks,
  settlement problems, accounting. The privacy page (`?tab=privacy`, both locales) gets a paragraph: "Our
  staff may access your account data for these purposes. Access is restricted by role and logged."
- **Minimum access:** admins get masked contact data and no description (§2.3). Full PII is owner-only,
  including exports.
- **Access logging:** viewing a member's detail page or any of its tabs, searching by full phone number, and
  every export → `admin_access_log`. Retention `ADMIN_ACCESS_LOG_DAYS` (365). Audit rows are kept indefinitely
  (they hold no PII).
- **Account deletion** (existing flow) removes the user row, and with it the role. Audit and access-log rows
  keep only the user id, which no longer resolves.
- **Exports:** the UI warns "This file contains personal data. Store it securely and delete it when done."

---

## 9. Config / env

| Variable | Default (dev) | Notes |
|---|---|---|
| `OWNER_PHONE` | unset (warning, no owner) | HK mobile in any accepted format, normalised to E.164. **Required and validated in production** |
| `ADMIN_STEPUP_MINUTES` | `5` | How long an OTP counts as step-up |
| `ADMIN_STEPUP_CREDITS` | `1000` | \|amount\| at or above which a credit adjust needs step-up |
| `ADMIN_EXPORT_MAX_ROWS` | `50000` | |
| `ADMIN_ACCESS_LOG_DAYS` | `365` | |
| `ADMIN_RATE_READ_MIN` / `ADMIN_RATE_WRITE_10MIN` / `ADMIN_RATE_EXPORT_HOUR` | `120` / `30` / `10` | Optional overrides |

Existing variables used: `APP_ORIGIN` (Origin guard), `OTP_PROVIDER`, Turnstile keys, `STRIPE_SECRET_KEY`
(mode only, from the prefix), `FUTURE_BETTING`, `DATA_FETCH`.
Dev: set `OWNER_PHONE=9123 4567`, log in with the mock OTP, open `http://localhost:5173/admin`.

---

## 10. Analytics (no PII: no user ids, phones, names, search text or amounts)

| Event | Params |
|---|---|
| `admin_view` | `page` (`dashboard`, `users`, `user_detail`, `bets`, `ledger`, `purchases`, `held`, `races`, `audit`, `access`, `system`), `role` |
| `admin_action` | `action` (`role`, `adjust`, `flag`, `resolve`, `void_race`, `void_meeting`), `outcome` (`ok`, `refused`, `stale`, `error`) |
| `admin_step_up` | `result` (`ok`, `failed`, `expired`) |
| `admin_export` | `dataset` |

Product analytics: staff accounts send `staff: true` on existing events so dashboards can exclude them.

---

## 11. QA checklist

Environment: mock OTP, Turnstile test keys, `OWNER_PHONE=9123 4567`, a second member promoted to admin, a
third left as user. Desktop and 390 px. zh-HK and en.

### Roles and access
- [ ] Guest on `/admin` → login sheet. After login as a `user` → "No access", no data requests other than `/api/admin/me` (403).
- [ ] Guest → every `/api/admin/*` route returns 401. `user` → 403. Admin → 403 `owner_only` on every owner route (automated route enumeration, §7.1 S1).
- [ ] Owner phone logs in → Owner chip. `users.role` for that row is still `user` in the DB.
- [ ] Owner promotes user B to admin → B's next `/api/admin/me` succeeds (no re-login). Revoke → B's next call 403.
- [ ] Try to change the owner's role, or your own → `cannot_change_owner` / `cannot_change_self`.
- [ ] Change `OWNER_PHONE` to B's number and restart → B is owner, old owner is a user. `owner_changed` system audit row.
- [ ] Production start with `OWNER_PHONE` missing, `21234567` (landline) or garbage → refuses to boot.

### Data and masking
- [ ] Admin: user list and detail show `+852 •••• 5678`, masked email/WhatsApp/Telegram, no description. The raw JSON responses contain no full phone or email (search them).
- [ ] Owner: same pages show full values. Full-phone search works for owner only; admin searching 8 digits → `invalid_filter` or last-4 behaviour.
- [ ] Search by last 4, by name (CJK and English), filters and sort; pagination totals correct; `limit=1000` capped at 100.
- [ ] Bets list: practice and LIVE mixed; filters by mode/status/meeting/held work; the detail drawer shows the `SettleResult`.
- [ ] Ledger totals match the filtered rows. Purchases show the Stripe ids with working test-mode links.
- [ ] Dashboard KPIs match direct SQL for a seeded dataset (members, active today, pending/held, credits outstanding, purchases today).
- [ ] System page: Stripe mode `test` with `sk_test_`, never shows the key. Last sweep / reconcile / fetch times update.
- [ ] Viewing a member's detail and each tab → access-log rows (actor, target, IP). Exports → access-log row.

### Owner writes
- [ ] Adjust +500 with a reason → balance up, `admin_adjust` ledger row, audit row (panel, actor, IP, before/after, idem key) in the same transaction.
- [ ] Adjust −(balance+1) → `insufficient_credits`, nothing written except an audit row with `outcome: refused`.
- [ ] Adjust 1,000 after the 5-min step-up window → `step_up_required` → OTP → the retry succeeds once.
- [ ] Double-click Confirm / replay the request with the same Idempotency-Key → one change. Same key, different amount → `idempotency_conflict`.
- [ ] Two tabs: change the balance in tab 1, then confirm an adjust in tab 2 → `stale_state` with the current balance.
- [ ] Flag → the member can't buy or bet LIVE. Unflag → can again. Both audited.
- [ ] Resolve a held `missing_dividend` bet with a dividend → won/lost and payout as in the CLI. Resolve a non-pending bet → `bet_not_pending`.
- [ ] Void race preview → numbers match after the void. Void meeting after races 1–4 resulted → R1–R4 skipped. `includeResulted` needs step-up and voids them.
- [ ] Write with a foreign `Origin` → 403 `bad_origin`. Without a reason → `reason_required`. Without a key → `idempotency_key_required`.
- [ ] Admin sees no write buttons anywhere. Crafted admin POSTs → 403.
- [ ] Audit table: `UPDATE`/`DELETE` via sqlite → rejected by the trigger. CLI `adjust` still works and appears in the panel's audit log as `source: cli`.
- [ ] Owner CSV exports: open in Excel — formula-like names (`=HYPERLINK(...)`) appear as text.

### Session and security
- [ ] First `/admin` visit in a session → OTP confirmation. Set `admin_seen_at` 13 h ago → `admin_reauth_required`. 25 h after verification → reauth even when active.
- [ ] Logout → the admin panel needs login again.
- [ ] Rate limits: 121 reads/min → 429 with `retryAfter`. 11 exports/hour → 429.
- [ ] `/admin` and `/admin/users/x` load directly in dev (Vite) and prod (`npm run build && npm start`) with `X-Robots-Tag: noindex` (prod). `robots.txt` has `Disallow: /admin`. Not in `sitemap.xml`.
- [ ] Built main chunk contains no admin components or `/api/admin` paths except the lazy import. A normal user's network tab loads no admin chunk.
- [ ] `/admin` in an iframe is blocked.
- [ ] App regression: membership and credits QA checklists still pass. Normal users see no Admin link.

---

## 12. Open questions for the owner

1. **Admin PII level:** admins see masked phone, email, WhatsApp, Telegram and IP, and no description; only
   you see full values and can export. OK? *PM default: yes.*
2. **Retention:** the access log is kept 12 months and the audit log indefinitely (no PII in either). OK for
   you and for the privacy notice? *PM default: yes.*
3. **Step-up OTP:** an SMS code to enter the panel (every 12 h idle / 24 h) and again for role changes,
   adjustments ≥ 1,000 credits and meeting voids. Acceptable friction? Or should 1,000 be higher?
   *PM default: as specified.*
4. **Self-adjustments:** may the owner adjust their own credits (allowed, tagged `self` in the audit)?
   *PM default: allowed.*
