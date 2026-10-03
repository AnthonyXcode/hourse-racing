# QA Report: Admin panel with roles (`/admin`)

Date: 2026-10-04 · QA · Branch `hkjc-reskin` (uncommitted working tree)

**Environment.** All testing ran on an isolated stack:

- **API:** port 8899 with `OWNER_PHONE=9123 4567` (my instance only), `FUTURE_BETTING=1`, `DEV_NOW`, `sk_test_dummy`, mock OTP and Turnstile test keys.
- **Vite:** port 5199.
- **Data:** a temporary `MEMBERS_DB` and `AVATAR_DIR`, and a `sqlite3 .backup` copy of the race DB.
- **Extra instances:**
  - 8897 — an upgraded copy of my previous round's v2 members DB.
  - 8898 / 8896 — production-mode instances with dummy config, for the SPA, header and startup-guard tests.
- **Accounts** (all fake numbers):

  | Who | Number |
  |---|---|
  | Owner | 9123 4567 |
  | Admin | 9111 0011 |
  | User | 9111 0012 |
  | User with full contact details (promoted to admin later) | 9111 0013 |
  | Users with formula-like names | 0014–0016 |

- **Untouched:** the owner's 5173/8787 servers and their data.

## Verdict: **Ship** (final, after "Retest 2" at the end)

Every finding (AD-01 to AD-11) is fixed. The only remaining notes are Nits: masks occasionally hit harmless non-PII strings.

### Previous verdict (Retest 1): Ship with fixes

AD-01 to AD-08 and the login-shortcut issue are fixed. One new Medium issue must be fixed first: **AD-09**, credit-adjust reasons reach admins unmasked through the ledger. AD-10 (scrubber format gaps) and AD-11 (CLI reason length) are Low follow-ups.

### Original verdict (first pass): Ship with fixes

Access control is solid: every route is gated, roles are resolved on each request, and the owner is protected. Step-up, idempotency, transactional writes, append-only logs and server-side masking all work. Fix these before release:

- **AD-01:** full phone numbers leak to admins from pre-upgrade CLI audit rows.
- **AD-02:** `/admin/*` deep links lose the anti-framing and noindex headers in production.
- **AD-03:** the dashboard's auto-refresh keeps the admin session alive forever.
- **AD-04:** the step-up dialog can't be cancelled.

## Findings

| ID | Severity | Area | Steps to reproduce | Expected | Actual | Evidence |
|---|---|---|---|---|---|---|
| AD-01 | **High** | PII / audit log | 1. Take a members DB from before v3 that has operator CLI rows (the documented `npm run credits:adjust -- --phone 91234567 …`). I used my previous round's DB.<br>2. Start the new server (migration v3).<br>3. Promote any member to admin and `GET /api/admin/audit` as that admin. The panel's Audit log shows the same rows under "Show raw data". | Admins never receive full phone numbers (lead decision; PRD §6.1 says audit rows hold only ids and last-4). | Old CLI rows store `args = {pos, opt}` verbatim, including `opt.phone`. The audit route returns `args` unmasked to every role. The migration doesn't scrub them, and the new code no longer anonymises them on account deletion. | Admin's `/api/admin/audit`: `{"id":4,"source":"cli","operator":"qa","action":"adjust","args":{"pos":[],"opt":{"phone":"91110005","amount":"500",…}}}`: 3 rows containing a full HK mobile. New CLI and panel rows are clean (`{"amount":50}`). Fix: mask or strip `phone` (and any `--user`) in legacy `args` in the DTO, or scrub them in the migration. |
| AD-02 | **Medium** | Headers / clickjacking (PRD §7.4–7.5) | Production-mode instance (`NODE_ENV=production`, dummy config) serving `dist/`: `curl -D - /admin/users/123`. | Every `/admin*` response carries `X-Frame-Options: DENY`, `Content-Security-Policy: frame-ancestors 'none'` and `X-Robots-Tag: noindex, nofollow`. | Only `/admin` and `/admin/` get them. `/admin/users`, `/admin/users/123`, `/admin/held` and `/admin/system` are served without any of the three, so deep owner pages can be framed by another site (clickjacking on owner actions) and indexed. In dev, Vite's middleware sets the headers on deep links, which hides the problem. | Header count (XFO + X-Robots): `/admin/ 2 · /admin/users 0 · /admin/users/123 0 · /admin/system 0`. The `app.use(/^\/admin(\/|$)/, …)` regex mount doesn't match nested paths. The API (`/api/admin/*`) does send all headers. |
| AD-03 | **Medium** | Admin session idle timeout (1 h) | 1. On my instance, `ADMIN_IDLE_HOURS=0.04` (144 s).<br>2. Open `/admin` (Dashboard) as an admin and don't touch it.<br>3. Watch `sessions.admin_seen_at`. | After the idle limit with no user activity, the next request gets `admin_reauth_required` (the 2-minute warning appeared as designed). | The Dashboard refetches every 60 s while visible. Each refetch is an `/api/admin` call, which moves `admin_seen_at`, so the server session never idles out. An unattended open dashboard stays an authenticated panel until the 12 h absolute limit. The idle warning appeared ("Your admin session ends in 1:46") and then disappeared after a refresh. | `admin_seen_at` with no interaction: `17:17:52 → 17:17:52 → 19:52 → 19:52` while the clock went 17:18 → 17:20:50 (idle limit 144 s). Fix: don't let background polling count as activity (e.g. a header to skip the `admin_seen_at` update, or poll only while the user is active). |
| AD-04 | **Medium** | Step-up dialog (UX / a11y) | Owner with step-up expired → Change role… → reason → "Make admin · Next: verify it's you". | The "Confirm it's you" dialog can be cancelled (button and Esc) and returns to the write dialog. | The dialog has only "Send code": no Cancel and no ✕. Esc does nothing because focus stays on `<body>` (the `useDialog` key handler is on the dialog element). The owner can only send an SMS or reload the page. `onCancel` is wired in `AdminApp` but `OtpDialog` renders no control for it. | Dialog text: `Confirm it's you · This change needs a fresh SMS code (sent to your phone ending 4567). · Send code`. After Esc both dialogs are still open and `document.activeElement` is `<body>`. |
| AD-05 | Low | Owner contact reveal | Owner → member → Show contact details → Show. Leave the tab in the background. | Values re-mask 60 s after the reveal. | The re-mask counts `setTimeout` ticks rather than wall-clock time. In a throttled (background) tab it runs slowly: after **69 s** the full phone and email were still shown with "Hides in 25s". Chrome's intensive throttling can stretch this to minutes. | `{"secs":69,"v":"Contact · Hides in 25s · … +85291110013 … victim.person@example.com"}` (`Users.tsx` decrements `left` per tick). |
| AD-06 | Low | Phone layout (390 px, sized popup) | Open the admin panel in a 390×766 popup. | No horizontal scroll; targets ≥ 44 px. | • en Dashboard and Bets: the header's right cluster (`ml-auto flex items-center gap-3`) overflows, `scrollWidth 405`.<br>• Audit log: a reason with a long unbroken string (500 chars; real-world: a pasted URL) widens the phone card to `scrollWidth 2721`.<br>• The ☰ menu button is **14 px wide** (×44). | Popup measurements: `{iw:390, sw:405}` (dashboard/bets), `{sw:2721}` (audit, card `DIV.text-[13px] sw=2685`), menu button `[14.07, 44]`. zh-HK Users and User detail: `sw 390` OK. |
| AD-07 | Low | Audit log expand | Audit log → ▸ "Show details" on the first row of a 50-row page. | The diff opens under the row (or the view scrolls or focuses to it), and the toggle exposes `aria-expanded`. | The detail panel renders at the bottom of the page (y ≈ 2,990 px on a 950 px viewport) with no scroll or focus change. Nothing visible happens. The button has no `aria-expanded`. | `section[aria-label="Show details"]` top 2992, viewport 949; text `#57 · Changed role · role: "user" → "admin" …` |
| AD-08 | Nit | Assorted | — | — | • A guest gets 404 on unknown `/api/admin/*` paths but 401 on real ones (route enumeration).<br>• `POST /races/void {raceNo: 99}` → 200 with `voided: []` and an `ok` audit row.<br>• The UI reason counter caps at 200; the server and PRD allow 5–500.<br>• CSV phone cells come out as `'+852…` (formula escape applied to `+`).<br>• Confirm buttons say "Next: verify it's you" even while step-up is still valid.<br>• `step_up_required` and route-level `invalid_amount` refusals get no audit row.<br>• Held-bet cards show the engine's English detail ("Miss — none of [1]…") in zh-HK; picks show 腳 in English. | `guest unknown path: 404 / known: 401`; void R99 → `{"voided":[],"skipped":[],"settled":0,"auditId":4}` |

## Passed

**Route walker** (29 routes from `routes.ts`, plus path variants)
- [x] Guest → 401 `unauthorized` on every route.
- [x] User → 403 `forbidden` on every route.
- [x] Admin → 403 `owner_only` on contact, access-log, export, void preview and all 5 writes. Admin can call `reconcile`.
- [x] Owner → OK.
- [x] Path variants: `/api/ADMIN/users`, `/api/Admin/Users`, a trailing slash, `//` and `/USERS/:id/CONTACT` keep the same role decision. `%75sers` → 404.
- [x] Methods: PUT, PATCH, OPTIONS and `X-HTTP-Method-Override` → 404. HEAD → the same 403.
- [x] Writes: a foreign Origin (including a mixed-case path) → 403 `bad_origin`. `text/plain` → 415. No Origin is accepted in dev only (as membership).

**Roles**
- [x] The owner's `users.role` stays `user` in the DB, and `/api/me` shows `role` only for staff.
- [x] Promote → admin access works immediately. Revoke → the very next request is 403, including with an already-verified admin session.
- [x] The owner can't be demoted or promoted (panel `cannot_change_owner`; CLI `role --phone 91234567` refused and audited) and can't change their own role. An admin can't change their own role (`owner_only`).
- [x] `PATCH /api/me {role}` and `POST /api/history {role}` don't change the role.
- [x] Restarting with `OWNER_PHONE=91110011` makes that admin the owner and the old owner `forbidden`. One `system` `owner_changed` audit row (`4567 → 0011`), and another on switching back. The CLI refuses to demote the new owner.
- [x] Production guard: `OWNER_PHONE` empty, `21234567` or `garbage` → refuses to start.

**PII**
- [x] I grepped every admin GET response, including detail, the 5 tabs, lists, audit, dashboard, system and errors. No full phone, email, WhatsApp, Telegram, description or full IPv4 (apart from AD-01's legacy rows).
- [x] Masked forms: `+852 •••• 0013`, `+44 •••• 3456`, `v•••@example.com`, `@vi•••`.
- [x] Owner: masked by default. The reveal endpoint returns full values and writes a `contact_reveal` access-log row. Full-phone search is owner-only (logged `search_full_phone`); an admin's 8-digit search falls back to last-4.
- [x] Users CSV is masked by default. `full=1` → 403 `step_up_required` outside step-up, and full values within it.
- [x] Formula escaping: `=HYPERLINK(1)` → `'=HYPERLINK(1)`; `-2+3`, `@SUM(A1)` and `+1 "q",x` are escaped and quoted.
- [x] Every export writes an access-log row; the export rate limit is 10/h (11th → 429).

**Step-up and session**
- [x] A login under 5 min old counts as admin verification plus step-up. The step-up ends exactly 5 min after the session was created; a session older than 5 min that was never verified → `admin_reauth_required`. I judge this sound: sessions are only ever created by a successful SMS login, the verification time is the login time (so the 12 h absolute limit counts from login), and it never re-verifies an expired admin session. One side effect: a member promoted within 5 minutes of logging in skips the OTP.
- [x] When step-up is not valid:
  - adjust 999 → OK;
  - ±1000 → `step_up_required`;
  - role, void meeting, `includeResulted` and full export → `step_up_required`;
  - flag, unflag, void race and preview → no step-up needed.
- [x] OTP step-up (`session/start` + `check`, with a wrong code first) → retry with the same Idempotency-Key ×5 in parallel → 1 ledger row, 1 audit row, identical responses. A changed body with the same key → `idempotency_conflict`.
- [x] 10 parallel −1000 adjusts with different keys on a 5,053 balance → exactly 5 OK and 5 `insufficient_credits` (audited `refused`). Final balance 53, never negative.
- [x] Idle: `admin_seen_at` older than 1 h → `admin_reauth_required`. Absolute: verification older than 12 h → reauth; 11h59 → OK.
- [x] Logout → the old cookie gets 401 on `/api/admin`.
- [x] Rate limits: reads 120/min → 429 with `retryAfter`. Writes 30/10 min (hit naturally). Reconcile 1/min for admins.

**Owner actions** (one transaction with audit before/after; `owner:4567` actor)
- [x] Adjust: 100,000 OK, 100,001 / 1.5 / `"5"` / 0 → `invalid_amount`. Below zero → refused and audited. Reason: 5–500 after trimming (4 chars, 501 chars and whitespace refused). `expected.balance` mismatch → `stale_state` with the current value. Owner self-adjust → audit `self=1`.
- [x] Flag / unflag are audited. A flagged member's live bet → `account_flagged`; after unflag it works.
- [x] Resolve a held bet:
  - `missing_dividend` with dividend 333 → won 333;
  - settle without a dividend → `still_held`;
  - negative or string dividend → `invalid_amount`;
  - no results → `results_not_stored`;
  - re-resolve or a missing bet → `bet_not_pending`.
  - Every failure gets an audit row with `outcome: refused`.
- [x] Void: a resulted R6 is skipped without `includeResulted` (preview matches). R7 voided with 1 bet / 10 refunded (preview matches). `includeResulted` needs step-up. Bad venue or date and an unknown meeting → refused and audited.
- [x] The CLI goes through the shared actions: `adjust` / `flag` / `unflag` / `role` appear as `source: cli`, and the flag is transactional.

**Logs**
- [x] `UPDATE` / `DELETE` on `admin_audit` and `UPDATE` on `admin_access_log` → aborted by triggers. `DELETE` of an access row younger than 365 days → aborted; a 2025 row → allowed. The purge (`purgeAccessLog`) touches only the access log.
- [x] User detail and each tab write access rows (actor, role, target, tab, masked IP).

**Bundle and headers**
- [x] Production build (scratch outDir): the main chunk `index-*.js` has 0 hits for `/api/admin`, `owner_only`, `step_up`, `admin_reauth`, `只有擁有人` and `access-log`. `AdminApp` appears only as the lazy `import("./AdminApp-….js")`. Admin code is split into `AdminApp`, `Users`, `Bets`, `Logs`, `Money` and `Dashboard` chunks.
- [x] A normal member (dev) loads no admin resources and has no "Admin panel" menu item. Staff have it.
- [x] A user on `/admin` sees "You don't have access…". The only data request is `/api/admin/me` (403). `<meta name=robots content="noindex, nofollow">` is set.
- [x] `/admin` and `/admin/users/123` load in dev and prod. robots.txt has `Disallow: /admin`. sitemap.xml has no admin URLs. `/api/admin/*` sends `no-store`, `noindex` and frame-deny.

**UI** (desktop, en and zh-HK)
- [x] Shell: white top bar, navy sidebar, Owner / "管理員 · 唯讀" badge, Stripe test chip.
- [x] Dashboard KPIs match SQL: members 7, outstanding 6,462, pending 2 / 20.
- [x] Users list: search (last-4, name), role and flag filters, sort with `aria-sort`, URL state survives a reload.
- [x] User detail: tabs and owner actions panel.
- [x] Admin view: no write buttons on any page, with "只有擁有人可以作出更改".
- [x] Confirm dialogs: before → after ("412 → 1,912", "User → Admin"), required reason, gold confirm. Void/refund confirm uses danger styling (red outline, not gold).
- [x] The step-up dialog stacks over the write dialog, and the write completes after the OTP.
- [x] Held-bet cards, System page (Stripe "test", no key shown), Access log (owner only; an admin gets "你已沒有權限…").
- [x] The 2-minute idle warning appears ("Your admin session ends in 1:46").

**Regression**
- [x] Member practice bet: 5 s auto-confirm and the result modal.
- [x] LIVE placement and settlement via the API.
- [x] Welcome dialog, credits balance, `/api/history` merge.
- [x] Ledger reconcile OK.
- [x] `npm run typecheck` passes.
- [x] `npx vitest run`: 15 files, 270 tests pass.
- [x] `npx vite build` passes.

## Not tested

- **Real SMS** for step-up and reauth. The mock OTP was read from my log.
- **Opening CSVs in Excel.** I checked the escaping in the raw CSV only.
- **A production-build network log for a member.** Production served the repo's existing `dist/`, which I didn't rebuild to avoid writing outside the report. I checked my scratch build's chunks instead, and a dev network log.
- **Full phone-layout coverage.** The sized popup opened at full width and later took effect at 390×766, so phone layout was measured by DOM only (no screenshots: the popup isn't in the tab group).
- **The daily access-log purge on a schedule.** I exercised the trigger and the purge function's SQL directly.
- **Two real devices.** I used separate cookie jars in the same process.

---

## Retest (2026-10-04, after the engineer's fixes)

Same rules as the first pass:

- **Servers:** my own API on 8899 and Vite on 5199.
- **Members DB:** a **copy of the previous round's v2 DB**, migrated on start, so real legacy CLI audit rows exist. I added 4 more legacy-style rows by `INSERT` with tricky PII in `operator`, `args`, `before`, `after` and `reason`.
- **Other data:** a race-DB backup copy. `OWNER_PHONE=9123 4567` on my instance only.
- **Prod-mode instance:** 8898, dummy config, serving the repo's existing `dist/`.
- **Phone width:** a sized popup that really opened at 390×787 this time.
- **Untouched:** the owner's 5173/8787 servers and their data.

| ID | Result | Evidence |
|---|---|---|
| AD-01 | **Fixed** (for the reported vector; residual gaps → AD-10, related leak → AD-09) | Real legacy CLI rows (`opt.phone: "91110005"`) are masked for both admin and owner, in JSON and in the audit CSV.<br>Masked: `operator "operator 91234567"` → `operator •••• 4567`; `9123-4567` (in a `phone` key) → `+852 •••• 4567`; `+85291234567` mid-sentence → `•••• 4567`; `(852) 9123 4567` → `(852) •••• 4567`; `tel:91234567` → `tel:•••• 4567`; `victim.person@example.com` → `v•••@example.com`; `203.0.113.42` → `203.0.113.x`; `mobile`, `whatsapp` and `email` keys at any depth.<br>New writes are scrubbed on insert. |
| Login shortcut | **Fixed** | • P logs in, then the owner promotes P → P's `/api/admin/dashboard` = `401 admin_reauth_required`. After `session/start` + `check` → 200.<br>• Q promoted first, then logs in → dashboard 200 straight away, `stepUpUntil` = login + 5 min.<br>• Owner fresh login → step-up until login + 5 min. |
| AD-02 | **Fixed** (verified on a **prod-mode** instance and in dev) | Prod 8898: `/admin`, `/admin/`, `/admin/users`, `/admin/users/123`, `/admin/held`, `/admin/system?x=1`, `/ADMIN/users` and `/Admin` all send `X-Robots-Tag: noindex, nofollow`, `X-Frame-Options: DENY` and `frame-ancestors 'none'`. `/administrator`, `/admins` and `/?tab=bet` don't. Dev: `/admin/users/123` and `/Admin/held` have them; `/administrator` doesn't. |
| AD-03 | **Fixed** | Instance with `ADMIN_IDLE_HOURS=0.04`:<br>• A request with `X-Admin-Background: 1` → 200 but `admin_seen_at` unchanged; once idle has passed it gets `admin_reauth_required`.<br>• The same request without the header moves `admin_seen_at`.<br>• Dashboard polls use `load(true)` → background header, and start only while `visibilityState === "visible"` (`Dashboard.tsx:48`). |
| AD-04 | **Fixed** | Step-up over Adjust credits: the dialog has ✕, "Send code" and **Cancel**, and focus starts inside it. ✕, Cancel, backdrop click and Esc (keydown on the focused element) each close only the step-up dialog. The write dialog stays open with its amount (`1500`) and reason, and focus returns to the reason textarea. Balance unchanged. *(Esc sent through the automation key API didn't reach the page, which is a tool focus quirk; a real keydown works.)* |
| AD-05 | **Fixed** | Reveal uses a wall-clock deadline and re-ticks on `visibilitychange` and `focus` (`Users.tsx:290–309`). In my automated tab (`visibilityState: "hidden"`, so timers are throttled), the display read "Hides in 38s" at 66 s, while values were hidden in the DOM. By 82 s they were masked. A visible tab re-masks at 60 s; a hidden tab re-masks on its next tick or the moment it becomes visible, so values are never visible past the deadline. |
| AD-06 | **Fixed** (sized popup, 390×787) | `scrollWidth = 390` on Dashboard, Users, User detail, Bets, Audit log (including a 200-char unbroken reason), Held, System, Ledger and Races, in en and zh-HK. The ☰ menu button is **44×44**. |
| AD-07 | **Fixed** | ▸ has `aria-expanded="false"` and `aria-controls="audit-detail-row-24"`. On click it becomes `true`, the detail is the very next table row (top 347 px under a row at 270 px), focus moves into the panel, and it shows the diff (`code: → "step_up_required"`). |
| AD-08 | **Fixed** | • Unknown `/api/admin/doesnotexist` (GET/POST): guest 401, user 403, staff 404.<br>• Void R99 → `404 not_found`, audited `refused`.<br>• Reasons 10–200 on the server (9 chars and 201 chars → `reason_required {min:10,max:200}`; 10 and 200 → OK).<br>• CSV phones are `+852 •••• 0103` with no apostrophe.<br>• The confirm button reads "Add 1,500 credits" (no "Next: verify") while step-up is valid.<br>• `step_up_required` refusals for adjust and role are audited (`outcome: refused`).<br>• zh-HK held card: 「所選馬匹狀況不明」「#1 均未跑入前1名。」「重新結算… / 輸入派彩… / 作廢並退回…」. |

### New findings

| ID | Severity | Area | Steps to reproduce | Expected | Actual | Evidence |
|---|---|---|---|---|---|---|
| AD-09 | **Medium** | PII via the ledger (same class as AD-01) | Owner adjusts credits with the reason `call phone_91234567 or ９１２３４５６７ or 9123 4567 x@y.com`. As an **admin**, open `GET /api/admin/ledger` or `/api/admin/users/:id/ledger` (panel: Credits ledger / Ledger tab). | Admins never receive full contact details (lead decision). The audit copy of the same reason *is* scrubbed. | The ledger row's `note` (`{"reason": …}`) is returned **verbatim**, including `9123 4567` and `x@y.com`. The same applies to every CLI `--reason` and every panel adjust reason, past and future. | Admin's response: `"note":"{\"reason\":\"call phone_91234567 or ９１２３４５６７ or 9123 4567 x@y.com\"}"`, while `admin_audit.reason` holds `… or •••• 4567 x•••@y.com`. Fix: scrub `note` (and any other free-text field) in the ledger DTOs, or store the scrubbed reason in the ledger note too. |
| AD-10 | Low | Scrubber coverage (`server/admin/scrub.ts`) | Legacy and new rows containing other phone, IP and split formats (seeded in `reason`, `args` and `after`). | Masked. | These pass through unmasked to admin and owner, in JSON and CSV:<br>• `phone_91234567` and `51234567x` (a letter, digit or underscore next to the number defeats the lookbehind/lookahead);<br>• `9123.4567` (dots);<br>• `9 1 2 3 4 5 6 7`;<br>• full-width `６１２３４５６７` / `９１２３ ４５６７` (`\d` without the `u` flag is ASCII-only);<br>• compressed IPv6 `2001:db8:85a3::8a2e:370:7334` (the regex needs ≥ 4 non-empty groups);<br>• a phone split across fields (`{"cc":"852","rest":"9123","tail":"4567"}`), which is arguably out of scope. | Admin `/api/admin/audit` grep: `phone_91234567 ×1, 9123.4567 ×1, "9 1 2 3 4 5 6 7" ×1, ６１２３４５６７ ×2, ９１２３ ４５６７ ×2, 2001:db8:85a3::8a2e:370:7334 ×2, "rest":"9123","tail":"4567" ×1`. Audit CSV row 10: `phone_91234567 / tel:•••• 4567 / 9123.4567 / 9 1 2 3 4 5 6 7`. Suggest: normalise full-width digits (NFKC) first, treat `_`/letters as boundaries, allow `.` separators, and use a proper IPv6 matcher. |
| AD-11 | Low / Nit | CLI reasons | `npm run credits -- adjust … --reason x` | The same 10–200 rule as the panel: both write the same `admin_audit` and the panel shows them side by side. | The CLI only checks for a non-empty reason, so 1-char or very long free-text reasons still enter the audit (and the ledger note, see AD-09). It matters a little: inconsistent audit quality and a larger PII surface. A shared validator in `actions.ts` would cover both. | `writeGuard` in `cli.ts` checks `!a.opt.reason.trim()` only. |

Also noted (Nit, not a finding): a full-export `step_up_required` refusal isn't audited (it's a read, and the access log has no row either).

### Regression (all passed)
- [x] Spot route walk (10 endpoints, guest / user / admin / owner): `/me`, `/dashboard`, `/users`, `/audit` → 401/403/200/200; `/access-log`, `/export/ledger`, `/users/:id/contact` → 401/403/403/200; POST flag / void / credits → 401/403/403.
- [x] Adjust idempotency: the same key ×3 → identical responses and 1 ledger row. Same key with a different amount → `idempotency_conflict`.
- [x] Member app: owner login via the modal, practice bet with the 5 s auto-confirm and result modal, "Admin panel" menu item for staff. A member page loads no admin resources. LIVE placement via the API is OK.
- [x] Ledger reconcile OK.
- [x] `npm run typecheck` passes.
- [x] `npx vitest run`: 15 files, 276 tests pass.
- [x] `npx vite build` passes; the main chunk has 0 occurrences of `/api/admin`.

### Retest verdict: **Ship with fixes** (AD-09)
All 8 first-pass findings and the login-shortcut issue are fixed. Fix AD-09 before release; AD-10 and AD-11 can follow.

---

## Retest 2 (2026-10-04)

Same setup as Retest 1:

- **Servers:** my own API on 8899 and Vite on 5199.
- **Members DB:** the same temporary copy of the migrated legacy members DB, including the seeded legacy rows with tricky PII.
- **Other data:** a race-DB backup copy. `OWNER_PHONE` set on my instance only.
- **Untouched:** the owner's servers and data.

**New PII seeded through the panel:**
- **Adjust reason:** `call phone_91234567 / ９１２３４５６７ / 9123.4567 / 9 1 2 3 4 5 6 7 / x@y.com`.
- **Flag reasons:** `ring 6123-4567 or 00852 6123 4567` and `cleared via 2001:db8::1 or ::ffff:10.1.2.3`.
- **Profile:** name `Q 91230000x`, email, Telegram, `+447700900123`, description `my num 9876 5432`.
- **Avatar** upload.

| ID | Result | Evidence |
|---|---|---|
| AD-09 | **Fixed** | I fetched 20 admin GET routes, as **admin** and as **owner**: me, dashboard, system, users (list, last-4 search, detail and its 5 tabs), bets, bet detail, held, ledger, purchases, races, audit, access log and a 404 error. I also fetched all 5 CSV exports (masked). I grepped all of it for the seeded values plus all real `9111xxxx`/`9112xxxx` numbers, emails, IPs, `q_tele` and `+447700900123`: **0 hits** for either role.<br>Stored data is scrubbed on write:<br>• ledger note `{"reason":"call phone_•••• 4567 / •••• 4567 / •••• 4567 / •••• 4567 / x•••@y.com"}`;<br>• `wallets.flag_reason` `chargeback, ring •••• 4567 or •••• 4567`;<br>• audit reasons likewise.<br>Owner reveal (the intended exemption) returns full values with `expiresAt`. The **owner's full-PII users export** (step-up) still has the full phone, email, WhatsApp and Telegram (`+85291120102,q.user@example.net,+447700900123,'@q_tele`); the masked export has `+852 •••• 0102, q•••@example.net, +44 •••• 0123`. An admin asking for `full=1` → 403 `owner_only`. |
| AD-10 | **Fixed** | Retest 1's gaps are all masked now:<br>• `phone_91234567` → `phone_•••• 4567`;<br>• `9123.4567`, `9 1 2 3 4 5 6 7` and full-width `６１２３４５６７` / `９１２３ ４５６７` → `•••• 4567`;<br>• `00852 6123 4567`, `0091234567` and `+44 7700 900123` are masked;<br>• compressed IPv6 `2001:db8::1` → `2001:db8:…`.<br>The split-across-fields case is a documented limitation, as agreed. |
| AD-11 | **Fixed** | CLI `adjust`/`flag`:<br>• `"short"` (5) → `refused: --reason must be 10–200 characters (yours has 5)`;<br>• 201 chars → refused (201);<br>• `"  ten chars  "` → refused (9, trimmed);<br>• `"x"` on flag → refused (1);<br>• `"cli ok reason 9123 4567"` → accepted, stored as `cli ok reason •••• 4567` in both the audit row and the ledger note. |

**Over-masking checks** (no legitimate data mangled):

- **API (owner):**
  - picks `R1 腳 7`, `R2 腳 1,2,3  |  R3 腳 1,2,3`, `R3 腳 1,2,3,4,5` are intact;
  - race ids `2026-10-04-ST-99`, dates `20260325` / `2026-10-04`, user UUIDs as `targetId`, Stripe-style ids `pi_cs_test_qa_1` / `cs_kill_1`, results `won: payout 290, refund 0`, and ISO timestamps are intact;
  - avatar URL `/api/avatars/f032dc98…webp` intact, and the image loads (HTTP 200 `image/webp`, `naturalWidth 256` in the UI);
  - every `••••` found in the owner's responses was in a PII field or free text (reason, note, contact fields, a name containing a phone).
- **Direct `scrubText` probes left unchanged:** `R5 膽 2  腳 5,7,9,13`, `7-2-1-4`, `R2:1-2-3-4  R3:3-2-1-4`, `HK$1,000`, `20261004`, `Balance 412 → 1,912`, `+5000 credits`, `-100000`, `stake 50000 then 45000`, `1000 2000 3000`, `cs_test_…`, `pi_3Nx…`, hex and all-digit avatar names, UUIDs, `17:42:36`, `dividend 4321.5 per $10`, `id 7123456789`, epoch ms, ISO timestamps.
- **UI (owner, desktop):**
  - User detail shows the avatar, masked contact details and ledger rows;
  - Bets shows `R10 L 1 … Void 10` and `R9 L 2 20 Won 155`;
  - the Audit diff shows `balance: 1007 → 1008`;
  - the Races list loads;
  - the Ledger shows `bet ••••05ce` (the panel's own deliberate short-ref display).

**Nits (not blocking):**
- Single horse numbers in a row of 8 or more, separated by spaces or dashes, look like a phone and get masked: `4-5-6-7-8-9-10-11` → `•••• 8910-11`; `order 8 7 6 5 4 3 2 1` → `order •••• 4321`. No stored field uses that format today (picks use commas; results keep 4 finishers), so only free-text reasons could hit it.
- Version-like dotted quads are treated as IPv4: user agent `Chrome/154.0.0.0` → `Chrome/154.0.0.x`; `v1.2.3.4` → `v1.2.3.x`. Cosmetic.
- `(+852) 9123 4567` → `(•••• 4567`: the closing bracket is swallowed.
- A value scrubbed on write and scrubbed again on read gets its mask re-normalised by NFKC: the `…` in an IPv6 mask becomes `...`. So `2001:db8::1` comes out as `2001:db8:...`, and `::ffff:10.1.2.3` as `::…....1.2.x`. No PII remains, but it reads oddly.

**Regression:**
- [x] Ledger reconcile OK.
- [x] `npm run typecheck` passes.
- [x] `npx vitest run`: 15 files, 279 tests pass.
- [x] `npx vite build` passes; the main chunk has 0 occurrences of `/api/admin`.
- [x] The member app and route walker were unchanged since Retest 1 and still behave the same.

### Final verdict: **Ship**
AD-09, AD-10 and AD-11 are fixed, the masking doesn't break legitimate data or the UI, and the owner's full-PII export still works. The remaining notes are Nits.
