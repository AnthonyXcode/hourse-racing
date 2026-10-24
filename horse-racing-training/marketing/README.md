# Post Time 開跑前 — social marketing

Automated posts to Facebook, Instagram, Threads and a Telegram channel, written by Claude CLI (`claude -p`
with the `marketing` skill) and run from crontab on the owner's Mac.

| Doc | What it decides |
|---|---|
| [PLAN.md](PLAN.md) | Goals, voice, content pillars with example posts, per-channel playbook, schedule, **compliance and the never-post list**, 4-week launch roadmap |
| [CONTENT.md](CONTENT.md) | Where every figure comes from (public site API), privacy rules, the post image |
| [AUTOMATION.md](AUTOMATION.md) | Platform APIs and tokens, the publisher, cron, failure handling, **owner setup checklist** (§7) |
| [`../.claude/skills/marketing/SKILL.md`](../.claude/skills/marketing/SKILL.md) | What Claude does in one slot: gather → image → drafts → self-check → publish |

## Schedule (HKT)

- **Non-race day:** one post per channel at 20:30.
- **Race day:** worked out from that day's real post times: first race − 90 min, then every 3 h while
  racing, then results at last race + 40 min. Sha Tin 25 Oct 2026 → 11:10, 14:10, 17:10, 19:00.
  Happy Valley night → about 17:10, 20:10, 23:35.

## How one slot runs

```
crontab ─► cron/marketing-daily.sh (20:30) / cron/marketing-raceday.sh (every 5 min, acts only when a slot is due)
        ─► claude -p "Use the marketing skill for slot X on DATE …"
              scripts/gather.ts  → queue/<date>/<slot>/context.json   (public site data only)
              scripts/card.ts    → queue/<date>/<slot>/image.png       (1080×1350, brand look)
              drafts             → queue/<date>/<slot>/{facebook,instagram,threads,telegram}.md
        ─► scripts/publish.ts --queue queue/<date>/<slot>
              guard-blocklist.txt check · PAUSE kill switch · once per slot+channel · logs/publish.jsonl
```

Safety: the publisher is a **dry run unless `MARKETING_LIVE=1`** is set in `marketing/.env`; `touch
marketing/PAUSE` stops everything; free-written posts go to `queue/<date>/<slot>/review/` and are never
auto-published.

## Personal accounts (browser publishing)

Facebook, Instagram and Threads can post from the owner's **personal accounts** with no API tokens: the publisher
drives the installed Google Chrome with Playwright on a dedicated profile (`marketing/.browser-profile`, gitignored).
Telegram stays on the Bot API. Switch per channel with `BROWSER_CHANNELS=facebook,instagram,threads` in `.env`.

1. Log in once: `npx tsx marketing/scripts/browser-login.ts` → a Chrome window opens on the three sites; log in
   (tick "remember this browser"), close the window. It then prints which sites are logged in.
   `--check` re-checks without opening a window.
2. Rehearse (fills each composer, screenshots it to `logs/browser/`, **never posts**):
   `npx tsx marketing/scripts/browser-rehearse.ts --queue marketing/queue/<date>/<slot>`
3. Live runs go through the same publisher, dry run, PAUSE and once-per-slot rules as the API.

Things to know:
- Meta's terms forbid automated access to their sites; checkpoints or a temporary lock on the personal account are
  possible. Keep volume low and the Chrome window visible (`BROWSER_HEADLESS` empty).
- The Mac must be awake with the owner's user session logged in when cron fires (Chrome opens a window).
- If a site changes its layout, the run fails with a screenshot in `logs/browser/`; fix the matching selector in
  `scripts/browser/sites.ts` and re-run the rehearsal. A post whose confirmation wasn't seen is logged as "may have
  posted" and never retried automatically.
- No image hosting is needed for browser channels (files are uploaded directly).

## Getting started

1. Follow AUTOMATION.md §7: Meta app + Page/IG/Threads tokens, Telegram bot as channel admin, image
   hosting for IG/Threads, `cp env.example .env` and fill it in.
2. Add the lines in [crontab.example](crontab.example) with `crontab -e`.
3. **Weeks 1–2 (PLAN §7–8): leave live mode off.** Each slot's drafts land in `queue/`; read them, and
   publish the ones you approve by hand:
   `MARKETING_LIVE=1 npx tsx marketing/scripts/publish.ts --queue marketing/queue/<date>/<slot>`
4. After clean runs, set `MARKETING_LIVE=1` in `.env` to let templated slots publish themselves.

## Decisions for the owner before going live

- **Legal advice (PLAN §6.4, §6.2).** LIVE betting with paid credits may be a problem under the Gambling
  Ordinance (Cap. 148), so posts never mention LIVE, credits or pricing until a Hong Kong lawyer signs off.
  Ask the same lawyer whether pre-race model picks on social count as "broadcasting tips" (s.16E); until
  then consider the lighter pre-meeting format (Threads draft style: name the 5★ races, link for the rest).
- **Image hosting** for Instagram/Threads (they need a public image URL): AUTOMATION.md proposes an nginx
  `/social/` path on the posttimehk.com server, filled by `rsync`.
- **Late Happy Valley Instagram recap:** PLAN moves it to 08:30 next morning; there's no cron line for it yet.
- **Sign-up attribution by channel** needs the site to keep the first UTM a visitor arrived with (small app change).
