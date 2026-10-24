# Post Time marketing: automation (how posts get published)

Owner of this doc: automation. Content and slot themes: [PLAN.md](PLAN.md). Data and images: CONTENT.md.
The `marketing` skill (`.claude/skills/marketing/SKILL.md`) drafts posts; everything in this doc is how they get out safely.
Researched 2026-10-25 against Meta and Telegram docs (links in §3). Graph API pinned to **v26.0** (released 2026-07-29).

## 1. Pipeline

```
crontab (Mac, HKT)
  └─ marketing/cron/marketing-{daily,raceday,tokens}.sh      sources tools/cron/common.sh (lock, log, raceday)
       ├─ PAUSE?  raceday (HKJC fixture, cached per day)  raceday-slot.ts (posttimehk.com/api post times)
       ├─ claude -p "Use the marketing skill for slot <id> on <date> ..." --dangerously-skip-permissions
       │     skill: gather data → draft per channel → guard checks →
       │            write marketing/queue/<date>/<slot>/<channel>.md (+ image.jpg | <channel>[-N].jpg)
       │            → npx tsx marketing/scripts/publish.ts --queue marketing/queue/<date>/<slot>
       ├─ sweep: the wrapper runs the same publish command again (idempotent; catches anything Claude missed)
       └─ on failure: scripts/alert.ts → Telegram DM to the owner + logs/alerts.log
publish.ts → channel adapter (facebook | instagram | threads | telegram) → logs/publish.jsonl
```

| Job | Cron | What it does |
|---|---|---|
| `marketing-daily.sh` | `30 20 * * *` | Non-race days only (PLAN §5.1): slot `daily`. On race days it exits; race slots replace it. |
| `marketing-raceday.sh` | `*/5 0,10-23 * * *` | Asks `raceday-slot.ts` whether a slot is due now; if yes, drafts + publishes it once. |
| `marketing-tokens.sh` | `15 4 * * 1` | Refreshes the Threads token, health-checks all four channels, alerts on problems. |

**Race-day slots** (PLAN §5.2), computed from the day's real post times
(`/api/days` → venue, `/api/meeting/YYYYMMDD/ST|HV` → `raceInfo[].postTime`, checked with curl 2026-10-25):

| Slot id | Time | Due window |
|---|---|---|
| `pre-meeting` | R1 − 90 min | 30 min |
| `mid-meeting` | pre + 3 h, only if before RL and ≥ 45 min before post | 30 min |
| `late-meeting` | pre + 6 h, same rules | 30 min |
| `post-meeting` | RL + 40 min | until RL + 90 (skill may defer while dividends are not final; wrapper retries every 10 min) |

Example output, `npx tsx marketing/scripts/raceday-slot.ts --date 2026-10-25 --list` (ST, R1 12:40, RL 18:20):
`pre 11:10, mid 14:10, late 17:10, post 19:00`. HV 2026-10-21 (R1 18:40, RL 22:55): `pre 17:10, mid 20:10, post 23:35`
(late dropped). The cron runs every 5 minutes, not hourly, because PLAN's slots are minute-precise (11:10, 23:35). A run that
isn't due exits silently in about a second. Between 00:00 and 02:59, yesterday's meeting is checked too, so a late HV
`post-meeting` slot still fires. A slot missed because the Mac was asleep is skipped once its window closes, so stale
posts never go out.

**Claude's scope.** The prompt (in `cron/lib.sh`) tells Claude to write only under `marketing/queue|out|logs`. The only
command it may run to post is `publish.ts --queue <slot dir>`. It must not call social APIs, set `MARKETING_LIVE`, pass
`--force`, touch `PAUSE` or `.env`, or use git. `--disallowedTools` blocks `git`, `crontab`, and WebFetch to the three
Meta/Telegram API hosts. Note that `--dangerously-skip-permissions` makes the rest of these limits prompt-level only.
Real safety comes from the publisher: dry-run default, guard checks, idempotency and the kill switch.

## 2. Publisher (`marketing/scripts/`)

```
npx tsx marketing/scripts/publish.ts --channel facebook|instagram|threads|telegram --text-file <path> \
    [--image <path-or-url>[,<path-or-url>…]] [--slot YYYY-MM-DD/<slot-id>] [--parse-mode HTML] [--dry-run] [--force]
npx tsx marketing/scripts/publish.ts --queue marketing/queue/<date>/<slot> [--channel <c>] [--dry-run]
```

| File | Role |
|---|---|
| `publish.ts` | CLI: build posts, guard, kill switch, idempotency, log, call adapter |
| `channels/{facebook,instagram,threads,telegram}.ts` | One adapter each: `validate`, `plan` (dry-run output), `publish` |
| `lib/env.ts` · `lib/http.ts` · `lib/log.ts` · `lib/image.ts` | `.env` loading, fetch + retry, JSONL log + slot markers, image hosting |
| `raceday-slot.ts` | Which race-day slot is due now (exit 0 due / 1 not / 2 error) |
| `refresh-tokens.ts` | Threads token refresh and read-only health checks for all channels |
| `alert.ts` | Owner alert (Telegram DM + `logs/alerts.log`) |

- **Dry run is the default.** The publisher posts only when `MARKETING_LIVE=1` (in env or `marketing/.env`) and `--dry-run`
  is absent. In dry run it prints the exact API calls it would make, writes a `dry-run` log line, and marks the slot,
  so the whole flow is exercised. Dry-run and live markers are kept separately.
- **Kill switch.** If `marketing/PAUSE` exists, the publisher posts nothing (exit 0, logs `paused`) and the wrappers don't
  start Claude. `touch marketing/PAUSE` stops everything; `rm marketing/PAUSE` resumes.
- **Idempotency.** `logs/slots/<mode>/<date>_<slot>__<channel>.json` is claimed atomically (`open wx`) before any
  API call. `published` → later runs log `skipped-duplicate`. A failure on the final publish call with 5xx or a network
  error is **ambiguous** (it may have posted), so it is never retried automatically. The owner checks the channel and
  reruns with `--force`. Clean failures (4xx, failures before the final call, validation) are retried by the next run.
- **Retries.** Network errors, 5xx and 429 get 4 attempts with backoff of 2 s, 4 s and 8 s plus jitter, honouring
  `Retry-After` and Telegram `parameters.retry_after` (capped at 120 s). Container status is polled every 5 s for up to
  5 min.
- **Guard checks (mechanical).** The publisher rejects empty text and leftover placeholders (`{{ }}`, `[[ ]]`, TODO, TBD,
  lorem ipsum). It also rejects any regex listed in the optional `marketing/guard-blocklist.txt` (owned by content).
  Per-channel limits: Threads 500 (emoji counted in UTF-8 bytes); IG caption 2,200 and 30 hashtags, image required;
  Telegram 4,096 text or 1,024 caption. The editorial rules (PLAN §6) stay in the skill.
- **Log.** `logs/publish.jsonl` is append-only, one line per outcome:
  `{ts, mode, slot, channel, status, textSha, chars, image, postId, url, error, ambiguous}`, with status one of
  `published | dry-run | skipped-duplicate | skipped-unknown | paused | invalid | failed`. Tokens are redacted from errors.
- **Exit codes.** 0 = everything published, dry-run, duplicate or paused. 1 = some post failed or was invalid (the
  wrapper alerts). 2 = usage error.
- **Queue folder.** The skill writes `<channel>.md` (plain text) or `telegram.html` (sent with `parse_mode=HTML`).
  Images: `<channel>.jpg|png`, `<channel>-1.jpg…` for a carousel, else the shared `image.jpg|png`. URLs can go in
  `<channel>.image-url` / `image.image-url`. Facebook and Telegram use the first image only. A channel without a file is
  skipped.

## 3. Platform notes (researched; verify in the App Dashboard during setup)

### Facebook Page — Graph API v26.0
- Text or link post: `POST /{page-id}/feed` with `message` (and `link`). Photo: `POST /{page-id}/photos` with `url`, or
  the file as multipart, plus `caption` (`message` is deprecated for photos). Returns `id` and `post_id`.
  [Pages API posts](https://developers.facebook.com/docs/pages-api/posts) ·
  [Page photos reference](https://developers.facebook.com/docs/graph-api/reference/page/photos)
- Permissions: `pages_manage_posts`, `pages_read_engagement`, `pages_show_list` (and `pages_manage_engagement` per the
  posts guide). The user must be able to do `CREATE_CONTENT` on the Page.
- Token: short-lived user token → **long-lived user token** (`GET /oauth/access_token?grant_type=fb_exchange_token&client_id&client_secret&fb_exchange_token`, ~60 days)
  → `GET /{user-id}/accounts` returns a **Page token with no expiry date**. It is invalidated by a password change,
  losing the Page role, app de-authorisation, or a security checkpoint.
  [Long-lived tokens](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived)
- Versions: v26.0 (2026-07-29, expiry TBD); v25.0 expires 2028-07-29. Bump `META_GRAPH_VERSION` once a year.
  [Version changelog](https://developers.facebook.com/docs/graph-api/changelog/versions)
- App review: we only post to a Page the app admin manages, so **Standard Access** should be enough with no App Review.
  But the app must be in **Live mode**: third-party reports say Development-mode posts (especially their media) are
  visible only to app roles ([Postiz](https://docs.postiz.com/providers/facebook.md),
  [Magefan](https://magefan.com/blog/request-manage-pages-and-publish-pages-in-facebook-application)). Live mode
  needs a privacy policy URL (posttimehk.com). If the dashboard demands Advanced Access, submit App Review, which usually
  needs Business Verification. Budget 1–2 weeks.

### Instagram (professional account linked to the Page)
- We use "Instagram API with Facebook Login" (`graph.facebook.com` + the **Page token**), so IG shares the Page token's
  lifetime.
  1. `POST /{ig-user-id}/media` with `image_url` and `caption` → container.
  2. Poll `GET /{container}?fields=status_code` until `FINISHED` (`ERROR` / `EXPIRED` fail).
  3. `POST /{ig-user-id}/media_publish` with `creation_id`.

  Carousel: one container per image with `is_carousel_item=true`, then `media_type=CAROUSEL&children=a,b,c`.
  [Content publishing](https://developers.facebook.com/docs/instagram-platform/content-publishing)
- **Image must be JPEG at a public URL**: Meta fetches it, and no upload endpoint exists. The adapter converts PNG
  to JPEG with macOS `sips`.
- Limit: **100 API-published posts per rolling 24 h** (a carousel counts as 1), checked at `media_publish`. One part of
  the page still says 50; either way we use fewer than 10 a day. Usage: `GET /{ig-user-id}/content_publishing_limit`
  (the token check prints it).
- Permissions: `instagram_basic`, `instagram_content_publish`, `pages_read_engagement` (plus `ads_management`/`ads_read`
  if the user's Page role comes via Business Manager).

### Threads
- Host `graph.threads.com/v1.0` (older guides say `graph.threads.net`; override with `THREADS_API_BASE`).
  1. `POST /{threads-user-id}/threads` with `media_type=TEXT|IMAGE`, `text`, `image_url`.
  2. Poll `GET /{container}?fields=status` (Meta suggests ~30 s on average).
  3. `POST /{threads-user-id}/threads_publish` with `creation_id`.

  Carousel: 2–20 items with `is_carousel_item=true`. [Threads posts](https://developers.facebook.com/docs/threads/posts)
- Text max **500** (emoji counted by UTF-8 bytes). Images: JPEG or PNG, ≤ 8 MB, width 320–1440, public URL. Limit:
  250 posts per 24 h.
- Permissions: `threads_basic` + `threads_content_publish`. Without Advanced Access the app can post only for its
  **Threads testers**, so add the owner's Threads account as a tester.
- Token: short-lived (1 h) → `GET /access_token?grant_type=th_exchange_token&client_secret&access_token` → long-lived
  (**60 days**). Refresh with `GET /refresh_access_token?grant_type=th_refresh_token&access_token=…` (the token must be
  ≥ 24 h old and unexpired). Each refresh restarts the 60 days. Our weekly `marketing-tokens.sh` refreshes it and
  rewrites `THREADS_TOKEN` in `.env`. [Long-lived tokens](https://developers.facebook.com/docs/threads/get-started/long-lived-tokens)

### Telegram channel — Bot API 10.3
- In @BotFather, send `/newbot` to get the token. Add the bot as a channel **admin** with "Post messages". `chat_id` is
  `@channelusername` (or the numeric `-100…` id for a private channel).
- `sendMessage`: `text` 1–4096, `parse_mode` = `HTML` / `MarkdownV2`. `sendPhoto`: `photo` as URL (≤ 5 MB) or multipart
  upload (≤ 10 MB), `caption` ≤ 1024. Errors return `{ok:false, error_code, description, parameters.retry_after}`.
  [sendMessage](https://core.telegram.org/bots/api#sendmessage) · [sendPhoto](https://core.telegram.org/bots/api#sendphoto)
- Alerts: the owner opens a private chat with the bot and sends `/start`, then puts their chat id in
  `TELEGRAM_ALERT_CHAT_ID`. Alerts are sent even in dry run.

### Image hosting (Instagram + Threads need a public URL)
posttimehk.com is served by nginx on the Ubuntu VPS (response header `Server: nginx/1.22.0 (Ubuntu)`), in front of
Express. The simplest option is to serve a static folder from nginx, so the app code doesn't change:

```nginx
location /social/ { alias /var/www/posttime-social/; add_header Cache-Control "public, max-age=604800"; }
```

The publisher `rsync`s each local image over ssh to `IMAGE_RSYNC_TARGET` under a content-hash name
(`<sha16>.jpg`). It then `HEAD`-checks `IMAGE_PUBLIC_BASE_URL/<name>` before handing the URL to Meta. Facebook and
Telegram upload the file directly (multipart), so they don't need this. If hosting is unavailable, the Instagram post fails
validation and the owner is alerted; the other channels still go out.

## 4. Tokens and expiry calendar

| Credential | Lifetime | Renewal | What breaks if it lapses |
|---|---|---|---|
| FB Page token (`FB_PAGE_TOKEN`) | No expiry | Re-run setup step 4 after a password change or role change | Facebook **and** Instagram posts fail (OAuthException 190) → alert |
| Threads token (`THREADS_TOKEN`) | 60 days | Weekly cron refresh; alert at < 14 days left | Threads only; after 60 days without a refresh, redo OAuth by hand |
| Telegram bot token | No expiry | Only if revoked in BotFather | Telegram posts **and owner alerts** stop |
| Graph API v26.0 | ≈ 2 years | Bump `META_GRAPH_VERSION` each July | Calls fail once the version is retired |
| Claude CLI token (`~/.config/hr-cron.env`) | Per Claude account | Same as the trio jobs | No drafts get written; wrappers log a non-zero Claude exit |
| ssh key for rsync | n/a | — | Instagram (and Threads posts with images) fail |

`refresh-tokens.ts --check` records every token check in `logs/tokens.json`. With `META_APP_ID`/`META_APP_SECRET` set,
it also reads the Page token's expiry and scopes (`debug_token`).

## 5. Failure handling and alerts

| Failure | Behaviour |
|---|---|
| Race-day or slot check fails | Alert; no post (never guess the card) |
| Claude errors or writes nothing | Race day: retried every 10 min inside the slot window, then skipped. Daily: sweep fails → alert |
| One channel fails | Others still publish; exit 1 → alert naming the slot; `publish.jsonl` has the error |
| Ambiguous publish (5xx on the final call) | Marked, not retried. Owner checks the channel, then `publish.ts --queue … --channel X --force` |
| Rate limited (429) | Backoff and retry; a lasting quota error fails cleanly → alert |
| Mac asleep or offline | Slot skipped after its window. Keep the Mac awake on race days (System Settings → Energy) |
| Anything off-brand goes out | `touch marketing/PAUSE`, delete the post by hand, find it in `publish.jsonl` |

Wrapper logs: `marketing/logs/cron/marketing-*-YYYYMMDD.log`. Alerts: `marketing/logs/alerts.log` plus a Telegram DM.

## 6. Dry-run week, then go live

1. **Days 1–7, dry run.** Install the crontab with `MARKETING_LIVE` unset. Each day, review `marketing/queue/<date>/*/`
   (the drafts and images) and `logs/publish.jsonl` (`dry-run` lines, one per channel per slot). The goal is ≥ 95 % of
   slots drafted on time, with 0 guard escapes.
2. **Smoke test each channel by hand**, using a throwaway slot (still with `MARKETING_LIVE` unset in `.env`):
   `MARKETING_LIVE=1 npx tsx marketing/scripts/publish.ts --channel telegram --text-file /tmp/hello.txt --slot 2026-11-01/smoke-test`
   Do this for each channel; delete the test posts afterwards.
3. **Go live:** set `MARKETING_LIVE=1` in `marketing/.env`. The next slot publishes for real.
4. **Roll back** at any time: `touch marketing/PAUSE` (immediate) or remove `MARKETING_LIVE`.

## 7. Owner setup checklist

1. **Meta app.** At developers.facebook.com, create an app (type Business) with the use cases *Manage everything on your
   Page*, *Instagram API (Facebook Login)* and *Access the Threads API*. Add a privacy policy URL, add your Threads account
   as a Threads tester, and switch the app to **Live**.
2. **Link Instagram.** Make the Instagram account Professional (Business) and link it to the Facebook Page in Page
   settings.
3. **User token.** In the Graph API Explorer, generate a user token with `pages_show_list, pages_read_engagement,
   pages_manage_posts, pages_manage_engagement, instagram_basic, instagram_content_publish`. Exchange it for a
   long-lived token (`fb_exchange_token`, §3).
4. **Page token and IDs.** Call `GET /me/accounts` with the long-lived token: copy the Page `id` → `FB_PAGE_ID` and
   `access_token` → `FB_PAGE_TOKEN`. Then call `GET /{page-id}?fields=instagram_business_account` and copy the id →
   `IG_USER_ID`.
5. **Threads.** Complete the Threads OAuth (`threads_basic, threads_content_publish`) → short-lived token → exchange it
   with `th_exchange_token` → `THREADS_TOKEN`. Call `GET /me?fields=id` → `THREADS_USER_ID`.
6. **Telegram.** In @BotFather, send `/newbot` → `TELEGRAM_BOT_TOKEN`. Add the bot as a channel admin with Post messages
   → `TELEGRAM_CHANNEL=@yourchannel`. DM the bot `/start`, then read your chat id from `getUpdates` →
   `TELEGRAM_ALERT_CHAT_ID`.
7. **Images.** On the VPS, run `mkdir /var/www/posttime-social` (writable by the deploy user), add the nginx
   `location /social/` block, and reload nginx. On the Mac, set up an ssh key for that user and check that
   `rsync <file> deploy@posttimehk.com:/var/www/posttime-social/` works. Set `IMAGE_PUBLIC_BASE_URL` and
   `IMAGE_RSYNC_TARGET`.
8. **Env file.** Run `cp marketing/env.example marketing/.env && chmod 600 marketing/.env`, fill it in, and leave
   `MARKETING_LIVE` empty.
9. **Check.** Run `npx tsx marketing/scripts/refresh-tokens.ts --check --online`. All four channels should print `ok`.
10. **Cron.** Run `crontab -e` and paste the lines from `marketing/crontab.example`. cron needs Full Disk Access
    (it already works for the trio jobs). Keep the Mac awake.
11. **Run the dry-run week (§6), then go live.**
