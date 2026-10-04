# Post Time (開跑前)

Local practice tool. Pick a past HKJC meeting, build a bet (any pool, with 膽拖 bankers),
see the cost, submit, and get graded HIT/MISS + payout against the real historical result.

Race cards and results live in the app's SQLite database (`data/momentum.sqlite`), loaded once
from the parent repo's JSON files and kept current by a scheduled fetch — see [Data transfer](#data-transfer).

## Run

```bash
npm install
cp .env.example .env    # optional — defaults are used if absent
npm run dev             # Vite UI on WEB_PORT (5173), API on PORT (8787), proxied
```

Open http://localhost:5173. Pick a racing day → race tab (default R1) → bet type →
click horses to pick (click again = banker 膽 for banker pools, again = clear) →
cost updates live → Place bet → HIT/MISS modal.

**Win / Place** and **Trio** tabs show how the race analyzer (form rating + Monte Carlo,
5,000 runs, seeded per race) performed against real results. Opening either tab runs the
analysis for the date range at the top (default: last 12 months) via `GET /api/analyzer`;
the server imports the parent repo's `src/` engine directly. A cold 12-month run takes
~15 s; per-race results are cached in memory until the racecard or results file changes.
All filters, charts and tables are computed in the browser from that payload.

**Momentum** tab tracks pre-race market moves. On a race day the server snapshots HKJC
WIN/PLA odds and pool totals every 10 s, starting 30 min before each race's post time, into
SQLite (`data/momentum.sqlite`, gitignored). After the result is posted it stores the finishing order.
The tab shows a live odds chart and movers list for each race. Over finished races it compares
win and place hit rates by momentum bucket against the rates implied by the final odds, split by
final-odds band. The collector only records while the server is running, so keep it under pm2 on race days.
Odds come from HKJC's GraphQL API (`info.cld.hkjc.com`). The API accepts only queries on its whitelist,
so `server/momentum/queries/*.graphql` are exact copies of the queries bet.hkjc.com sends. Don't edit them.
If HKJC changes them, capture the new ones from the browser's network tab.

Production (single process serving built SPA + API):

```bash
npm run build && npm start    # http://localhost:8787
```

## Membership

Members log in with a Hong Kong mobile number and a 6-digit SMS code (no passwords). A new number
creates an account. Each member's bet history is stored on the server (`data/members.sqlite`, gitignored);
guests can still bet, but nothing they do is saved. The account page is `?tab=account` (avatar menu).
Spec: [docs/membership/PRD.md](docs/membership/PRD.md), UI: [docs/membership/DESIGN-SPEC.md](docs/membership/DESIGN-SPEC.md).
Code: `server/members/` (API, OTP, Turnstile, rate limits, sessions, avatars), `shared/validation.ts`,
`src/members/` (login sheet, account menu and page, guest prompts).

The old shared bet log (`history.json`, `server/history.ts`) is no longer read; members' history is
per account and is not migrated.

**Log in locally.** With no extra settings, dev uses a mock SMS provider and Cloudflare's always-pass
Turnstile test keys. Enter any HK mobile (e.g. `9123 4567`), press Send code, then read the code from the
`npm run dev` server output:

```
[otp:mock] +852****4567 code=123456
```

Codes expire after 10 minutes, allow 5 wrong tries, and one number can request a code once a minute
(5 an hour, 10 a day; 20 an hour per IP).

| Variable | Default (dev) | What it is |
|----------|---------------|------------|
| `OTP_PROVIDER` | `mock` (`twilio` in production) | SMS provider. `mock` prints the code to the server log. |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_VERIFY_SERVICE_SID` | — | Twilio Verify credentials. Required for `twilio`. Secret. |
| `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare test keys | Bot check before each SMS. The site key reaches the browser via `GET /api/config`. |
| `MEMBERS_DB` | `data/members.sqlite` | Members, sessions, history, OTP + rate-limit rows. |
| `AVATAR_DIR` | `data/avatars` | Avatars, re-encoded to 256×256 WebP. |
| `SESSION_TTL_DAYS` | `30` | Sliding login lifetime. |
| `APP_ORIGIN` | `http://localhost:5173` | Allowed `Origin` for state-changing auth/profile/history calls (comma-separated). |
| `TRUST_PROXY` | unset | Proxy hops to trust for the client IP, e.g. `1` behind nginx. |
| `OTP_RATE_PHONE_HOUR` / `OTP_RATE_PHONE_DAY` / `OTP_RATE_IP_HOUR` | `5` / `10` / `20` | Send-limit overrides. |

**Production checklist** (the server refuses to start with `NODE_ENV=production` until these are done):

1. In Twilio, create a **Verify Service** with code length 6. Set Verify **Geo-permissions to Hong Kong only**
   and turn on **Fraud Guard**. Put `OTP_PROVIDER=twilio`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` and
   `TWILIO_VERIFY_SERVICE_SID` in `.env` (never in git). Set a monthly spend cap.
2. In Cloudflare, create a **Turnstile** widget for the public domain and set `TURNSTILE_SITE_KEY` /
   `TURNSTILE_SECRET_KEY` (the `1x…`/`2x…`/`3x…` test keys are refused).
3. Set `APP_ORIGIN` to the public `https://` origin, and `TRUST_PROXY` if behind a reverse proxy.
   The session cookie is `Secure` in production, so serve over HTTPS.
4. Rotate the Twilio auth token and Turnstile secret if they were ever shared, and whenever staff change.
5. Back up `data/members.sqlite` (same `.backup` method as below) and `data/avatars/`.

QA-only Turnstile keys: site `2x00000000000000000000AB` always blocks, `3x00000000000000000000FF` forces a
challenge; secret `2x0000000000000000000000000000000AA` always fails, `3x0000000000000000000000000000000AA`
reports a spent token.

## Credits, LIVE betting and Stripe

> **Legal gate.** Members can buy credits with real money and stake them on real upcoming races. Do not turn
> this on in production (`FUTURE_BETTING=1` or a `sk_live_` key) until HK counsel (Gambling Ordinance Cap. 148,
> HKJC exclusivity) and Stripe have approved it in writing. The server refuses a `sk_live_` key unless
> `STRIPE_LIVE_APPROVED=1`. Spec: [docs/credits/PRD.md](docs/credits/PRD.md), UI: [docs/credits/DESIGN-SPEC.md](docs/credits/DESIGN-SPEC.md).

Two modes, decided per race by the server's clock (Asia/Hong_Kong):

- **Practice**: past races with results. Free, settles instantly (unchanged).
- **Live**: races before post time. Costs credits (1 credit = HK$1 stake, unit ≥ 10), members only, settles
  automatically after the result is stored. Payouts are `floor(dividend × unit / 10 × combos won)` credits.

Every member gets 1,000 credits once per phone number (kept as an HMAC in `bonus_claims`, so deleting and
re-registering doesn't grant it again). Credits are bought through Stripe Checkout (HKD): `hk10` = 100,
`hk100` = 1,200, `hk300` = 4,000 credits, up to HK$1,000 per member per HK day. Code: `server/credits/`,
`shared/credits/`, `src/credits/`. Data: `data/members.sqlite` (wallets, ledger, LIVE bets, purchases) and
`data/momentum.sqlite` (`race_schedule`, `meeting_pools`).

**Where post times come from.** Racecards don't carry post times. `race_schedule` is filled by:
1. the fetch job's meeting discovery (`activeMeetings` in HKJC's GraphQL meeting query) every 5 min from
   12:00–24:00 HKT — this needs **`DATA_FETCH=1`**; the same run also reads each upcoming meeting's race
   statuses and **designated Double/Triple Trio legs** (`poolInvs` DT/TT) from that query, and stores results,
   which triggers settlement;
2. the race-day odds poller (`MOMENTUM_POLLER`, on by default), which refreshes post times and HKJC race
   statuses (e.g. `ABANDONED` → void) during the meeting.

A race with no post time, or whose schedule hasn't been refreshed for 24 h, stays **unavailable** (never open).
Closing is one-way: once post time passes the race never reopens. So LIVE needs `FUTURE_BETTING=1` **and**
`DATA_FETCH=1` (the only exception is local testing with `DEV_NOW`, below). Settlement runs after every
results change, every 5 minutes, and when a member opens their bets — also with `FUTURE_BETTING=0`.

| Variable | Default (dev) | What it is |
|----------|---------------|------------|
| `FUTURE_BETTING` | `0` | `1` turns on LIVE bets and buying credits. `0` = 503 + a notice banner; pending bets still settle. |
| `STRIPE_SECRET_KEY` | — | `sk_test_…`. Without it, buying answers `503 stripe_unconfigured`. Secret. |
| `STRIPE_WEBHOOK_SECRET` | — | `whsec_…` (from `stripe listen` in dev). Secret. |
| `STRIPE_LIVE_APPROVED` | unset | Must be `1` to accept a `sk_live_` key. |
| `CREDITS_SIGNUP_BONUS` | `1000` | Free credits per new phone number. |
| `CREDITS_PEPPER` | dev value | HMAC key for `bonus_claims`. Required (secret) in production. |
| `PURCHASE_DAILY_CAP_HKD` | `1000` | Per member per HK calendar day (paid + open checkouts). |
| `LIVE_MAX_STAKE` | `50000` | Credits per LIVE bet item. |
| `DEV_NOW` | unset | Dev only: server clock starts at this time (refused in production). |

**Try LIVE locally (no HKJC scraping).** Pick a stored meeting that has no results yet (e.g. the newest one in
the meeting picker) and pretend it's the morning of race day:

```bash
# .env (or the shell): FUTURE_BETTING=1  DEV_NOW=2026-10-04T11:00:00+08:00
npm run credits -- dev-schedule --date 2026-10-04 --venue ST --first 12:30 --gap 30   # post times 12:30, 13:00, …
npm run dev
```

Log in (code in the server log), confirm 18+, tick, Add, Place bet → Confirm. To settle, store that meeting's
results (`DATA_FETCH=1` when they're published, or `npm run data:fetch`) and run `npm run credits:settle`.

**Stripe test mode.** Put a `sk_test_…` key in `.env`, then:

```bash
stripe login
stripe listen --forward-to localhost:8787/api/stripe/webhook    # copy the whsec_… into STRIPE_WEBHOOK_SECRET
npm run dev                                                      # restart after editing .env
```

Buy on `?tab=credits` with card `4242 4242 4242 4242` (any future expiry, any CVC). The success page polls
until the webhook has credited the purchase; credits are granted only by the signed webhook, once
(`stripe events resend <evt>` is a no-op). `stripe trigger checkout.session.completed` is answered 200 but
credits nothing (no matching purchase; logged as `[credits:alert]`). Refunds and disputes in the dashboard
debit the credits (capped at the balance) and flag the account if credits were already spent.

**Operator CLI** (no admin panel; writes need `--operator`, `--reason` (10–200 characters, same rule as the panel) and `--yes`, and go to `admin_audit`):

```bash
npm run credits -- show --phone "9123 4567"
npm run credits:adjust -- --phone 91234567 --amount 500 --reason "goodwill top-up" --operator anthony --yes
npm run credits -- pending --held
npm run credits -- resolve-bet <betId> --dividend 279 --reason "dead heat, official divs 279+301" --operator anthony --yes
npm run credits -- void-race 2026-10-04 ST 5 --reason "race abandoned" --operator anthony --yes
npm run credits -- void-meeting 2026-10-04 ST --reason "typhoon signal 8" --operator anthony --yes   # skips races with results (--include-resulted to override)
npm run credits -- flag --user <id> --reason "card chargeback" --operator anthony --yes      # or unflag
npm run credits:settle        # settlement sweep now
npm run credits:reconcile     # wallets = ledger sums, one stake/payout/refund per bet, purchases credited once
```

Held bets (logged as `[credits:alert]`):
- a hit with no stored dividend, or a dead heat where the stored data has a single dividend: settle with
  `resolve-bet --dividend <HK$ per $10 for the bet's winning combinations>`;
- `runner_unknown`: a picked horse is missing from the finish order and its status isn't known. Check HKJC's
  result, then `resolve-bet <id> --settle` (it ran: non-finisher, the bet loses) or `--void` (refund).

Scratchings: only horses positively known not to have run are refunded, meaning `isScratched` on the last
racecard, or a withdrawn code (WV, WV-A, WX, WX-A, WXNR) in the results. Non-finishers (PU, FE, UR, DNF,
DISQ) are runners and their bets lose. The results ingest keeps every runner's HKJC place code in a new
`runners` field on each stored race (`finishOrder` is unchanged); results stored before this change don't
have it, so a missing horse there is held, never refunded.

## Admin panel (`/admin`)

Staff use the same phone + SMS-code login. Spec: [docs/admin/PRD.md](docs/admin/PRD.md), UI:
[docs/admin/DESIGN-SPEC.md](docs/admin/DESIGN-SPEC.md). Code: `server/admin/` (routes, shared write actions,
audit/access log, masking), `src/admin/` (a separate bundle, loaded only on `/admin` paths).

- **Roles.** `owner` = the member whose number is `OWNER_PHONE` (worked out on every request, never stored);
  `admin` = granted by the owner (read-only everywhere); everyone else is `user` and gets "no access".
  Revoking takes effect on the next request.
- **Admin session.** Entering the panel needs an SMS code (a login from the last 5 minutes counts). It lasts
  1 h idle / 12 h in total; the UI warns 2 minutes before. Role changes, credit adjustments ≥ 1,000, voiding a
  meeting (or resulted races) and full-contact CSV exports need a code from the last 5 minutes (step-up).
- **Privacy.** Contact details are masked on the server for everyone. The owner can reveal one member's details
  for 60 s (logged in the access log). CSV export is owner-only and masked unless "include full contact
  details" is ticked (plus step-up). Viewing a member, their tabs, full-number search and exports are logged in
  `admin_access_log` (kept 12 months); every write is in `admin_audit` (append-only, enforced by DB triggers,
  kept indefinitely). Every admin API response (JSON and CSV) passes through one PII scrubber
  (`server/admin/scrub.ts`: phones in any spacing / full-width digits, emails, IPs); only the owner's per-member
  reveal and the full-contact columns of a step-up export are exempt. A number split across separate fields is
  not recognised (documented limitation).
- **Writes** need a reason (10–200 characters, stored scrubbed), an `Idempotency-Key` and our `Origin`; the panel and the CLI share
  `server/admin/actions.ts` and write the same audit rows (`source = panel | cli`).

**Try it locally.** Put `OWNER_PHONE=9123 4567` in `.env` (any HK mobile you'll log in with), restart
`npm run dev`, open http://localhost:5173/admin, log in with that number (code in the server log). To make
someone an admin: the owner opens their user page → Change role…, or from the shell
`npm run credits -- role --phone 9xxx xxxx --set admin --reason "…" --operator you --yes`.

`/admin` is `noindex` (header + meta + `robots.txt`), can't be framed, and isn't in `sitemap.xml`.

## SMS alerts (5★ picks)

Members can turn on **5-star pick alerts** (bell on the Home "5 stars" card, or My account → Notifications; off by
default). On each racing day they get two short SMS: the meeting's 5★ races and top picks **30 min before the first
race**, and how those picks finished **30 min after the last race** (or as soon as every result is stored, given up
after 3 h). A 5★ race is the one the Home card counts: the model's top pick meets every rule of its venue's strategy
(`strategyChecks` all ok) on the **pre-race** analysis. No 5★ race → one short "no 5-star races" SMS and no results SMS.

- Code: `server/alerts/` (content, sender, scheduler). The sweep runs every minute; `sms_alert_log` has one row
  per member, meeting and kind (UNIQUE), so a restart never double-sends. No SMS 23:30–08:00 HK except a due results
  SMS; a suggestions SMS is never sent after the first race (logged `skipped`). Sends are limited to 5 per second.
- Texts: Chinese or English (the site language when the member turned alerts on), ≤ 2 segments, starting with the
  sender name and ending with "Turn off in the app (Settings)" / 「可於App設定內關閉」.
- **Opt-out is in the app only** (Settings, My account, or the bell on Home). There is no inbound-SMS handler:
  replying to an alert does not turn it off. UEMO requires a functional unsubscribe facility in commercial
  messages; confirm with counsel that the in-app switch satisfies it.
- Env: `SMS_ALERTS` (kill switch, off in production unless `1`), `SMS_PROVIDER=mock|twilio`,
  `TWILIO_MESSAGING_SERVICE_SID` (preferred) or `TWILIO_SMS_FROM`, plus the existing `TWILIO_ACCOUNT_SID` /
  `TWILIO_AUTH_TOKEN`. With `SMS_ALERTS=1` in production the server refuses to start without Twilio messaging settings.
- **Twilio setup:** create a Messaging Service and add the sender (HK numbers / alphanumeric sender ID). No inbound
  webhook is needed. Note that Twilio may still apply its own STOP handling on some number types (it then blocks
  delivery to that number until START); those sends show up as `failed` in the admin SMS log.
- **Hong Kong sender registration:** check OFCA's SMS Sender Registration Scheme (SSRS) before going live and register
  the sender ID with Twilio's help if required, so recipients see a registered sender (and messages aren't flagged).
- **Cost:** each SMS segment is billed (Chinese texts are UCS-2: 70 characters per segment, 67 when concatenated);
  the texts aim for ≤ 2 segments, i.e. up to 4 segments per member per racing day.
- Try it locally: `DEV_NOW=… npm run dev:server`, then `npm run credits -- dev-schedule --date <YYYY-MM-DD> --venue ST --in 35`
  and turn alerts on for your member; the mock sender prints `[sms:mock] …` in the server log. Admins see the send log
  under System (phones masked) and today's counts on the dashboard.

## Ports

Both ports are set in `.env` (copy `.env.example`). `.env` is gitignored.

| Variable | Default | What it is |
|----------|---------|------------|
| `PORT` | `8787` | Backend. The Express API, and in production the built SPA too — **this is the production port**. |
| `WEB_PORT` | `5173` | Frontend. The Vite dev server, `npm run dev` only. Unused in production. |

`WEB_PORT` proxies `/api` to `PORT`, so changing `PORT` keeps dev working — there is no
second place to update.

**Precedence:** a real environment variable always beats `.env`, so a one-off still works:

```bash
PORT=9000 npm start
```

Both are read at startup only. The server loads `.env` via `--env-file-if-exists`
(missing file is fine); Vite reads it through `loadEnv`. Restart after editing.

## Deployment (pm2)

Assumes Node.js 22 and pm2 are already on the machine. Run everything from this folder —
pm2 records the cwd, and the server reads the parent repo's data via `../data/...`.

**1. Configure**

```bash
npm ci
cp .env.example .env    # set PORT; keep TZ=Asia/Hong_Kong
```

**2. Build**

```bash
npm run build
```

Required, not optional: `server/index.ts` mounts the SPA only `if (existsSync(dist))`.
Skip it and you get a working `/api` with a 404 at `/`.

**3. Start**

```bash
pm2 start "npm start" --name horse-racing-training
pm2 save && pm2 startup      # start on boot — run the command pm2 prints

curl http://localhost:8787/api/meetings    # or whatever PORT you set
```

**4. Update**

```bash
git pull && npm ci && npm run build
pm2 restart horse-racing-training
```

Logs: `pm2 logs horse-racing-training`

**Notes**
- To change the port after deploying, edit `PORT` in `.env` and
  `pm2 restart horse-racing-training`. No `--update-env` needed: the app reads `.env` at
  startup, so pm2 never caches the value. (`--update-env` is only for variables passed to
  pm2 itself, e.g. `PORT=8788 pm2 start ...`.)
- If you also run `npm run dev` on the same machine, give production a different `PORT`
  (e.g. 8788) — otherwise the dev API and the deployed server fight over 8787. The parent
  repo's API uses 3000.
- `npm start` runs the TypeScript directly with `tsx`, so there is no server build step —
  only the SPA needs building. Going through the npm script also means the app does not
  depend on which Node pm2 was installed under.
- Run a single instance: the meeting manifest is an in-memory cache.
- Keep `TZ=Asia/Hong_Kong` in `.env`: on a UTC host, race dates come out a day early.

## Data transfer

Copy the local SQLite database (`data/momentum.sqlite`) to the server.

**1. Back up locally** — from this folder; safe while the app is running (the DB uses WAL, so
don't `cp` the live file). The backup lands in `data/`, which is gitignored:

```bash
sqlite3 data/momentum.sqlite ".backup 'data/momentum-backup.sqlite'"
```

**2. Copy to the server:**

```bash
scp data/momentum-backup.sqlite user@server:/path/to/horse-racing-training/data/
```

**3. On the server, swap it in and restart:**

```bash
cd /path/to/horse-racing-training
pm2 stop horse-racing-training
mv data/momentum-backup.sqlite data/momentum.sqlite
rm -f data/momentum.sqlite-wal data/momentum.sqlite-shm
pm2 start horse-racing-training
```

Missing schema migrations are applied automatically on start.

## Bet types

Win, Place, Quinella, Quinella Place, Trio, Tierce, First 4 (single race);
Double Trio, Triple Trio (multi-race — leg races taken from the result file's
designated legs; disabled for meetings without them).

## Architecture

```
server/   Express API (SQLite in data/momentum.sqlite: race cards, results, odds, names;
          server/members: login, profiles and per-member history in data/members.sqlite;
          server/credits: credit ledger, LIVE bets, settlement, Stripe, operator CLI)
shared/   types + betEngine (combinatorics, dead-heat-aware settlement) — imported by server AND client
src/      React + TS SPA (HKJC-style race card, banker/leg picker, cost bar, result modal)
```

Settlement runs server-side; the client imports `cost()` for the live preview.
Single source of truth for combinatorics in `shared/betEngine`.

## Tests

```bash
npm test
```

Covers combinatorics, dead-heat trio settlement, the place field-size rule (≤6 → 2 places),
missing-dividend handling (hit with unknown payout, not $0), every pool's hit/miss,
and real-data settlement (ST 2026-06-27: R11 trio $854, Double Trio $380,689).
