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
          server/members: login, profiles and per-member history in data/members.sqlite)
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
