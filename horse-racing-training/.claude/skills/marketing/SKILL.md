---
name: marketing
description: Draft and publish one Post Time 開跑前 social-media slot (Facebook, Instagram, Threads, Telegram) from live site data, following marketing/PLAN.md's voice and compliance rules. Run unattended by the marketing cron wrappers (daily 20:30 slot, race-day pre/mid/late/post-meeting slots), or by hand to draft a slot for review.
---

# Marketing slot

Turns one posting slot into one post per channel: gather site data → draw the image → write the drafts →
guard-check → publish through `marketing/scripts/publish.ts` (dry run unless the owner set `MARKETING_LIVE=1`).

**Working directory:** `/Users/anthonycyy/Documents(Local)/hourse-racing/horse-racing-training`.
Always `cd` there first. All paths below are relative to it.

**Read before drafting** (they are the source of truth; this skill only sequences them):
- `marketing/PLAN.md` — §2.3 voice, §3 pillars and example posts, §4 per-channel playbook, §5.6 weekly
  pillar calendar, §6.6 disclaimers (copy **verbatim**), §6.7 never-post list.
- `marketing/CONTENT.md` — what each context field means and which ones a slot may quote.

## Inputs

The cron prompt gives a **slot** and a **date** (YYYY-MM-DD, Hong Kong time) and the exact publish command.
Slots: `daily` (non-race day, 20:30), `pre-meeting`, `mid-meeting`, `late-meeting`, `post-meeting`.
Queue folder: `Q = marketing/queue/<date>/<slot>/`.

If run by hand without a slot, ask for one; default to a dry run.

## Hard rules (stop instead of breaking one)

1. `marketing/PAUSE` exists → write nothing, publish nothing, say "paused".
2. **Every number, horse number, name and result comes from `Q/context.json`.** Never estimate, round
   differently, or fill a gap from memory. A needed field is `null`/missing → drop that line; if the post
   no longer makes sense, skip the channel (or the whole slot).
3. Never mention LIVE betting, credits, buying credits, pricing, the welcome bonus or Stripe, and never link
   anything but free pages on `posttimehk.com` (PLAN §6.4, §6.7 #4). Use only the UTM links in
   `context.links.<facebook|instagram|threads|telegram>.<home|practice|winPlace|trio>`.
4. Never write a hits-only recap: misses are reported as prominently as hits (§3 P2, §6.7 #8).
5. Member names: only `displayName`s present in the context (opted-in leaderboard members). Robots are
   always called 機械人 / bot. Never name a hidden member.
6. Every post carries the disclaimer, copied character-for-character from `context.disclaimer` (same text as
   PLAN §6.6): `short` on Facebook, Threads and Telegram; `full` on Instagram captions and weekly summaries.
7. Only create files under `marketing/queue/`, `marketing/out/`, `marketing/logs/`. Publish only with the
   exact command the prompt gives. Never call a social API, set `MARKETING_LIVE`, pass `--force`, touch
   `marketing/PAUSE`, read `marketing/.env`, edit code, or use git.

## Steps

### 1. Gather
```bash
mkdir -p Q
npx tsx marketing/scripts/gather.ts --slot <slot> --date <date> --out Q/context.json
```
Read `Q/context.json`. If `warnings` is non-empty **or** the slot has nothing to say (race-day slot with no
meeting; `post-meeting` before results are in), write `Q/SKIPPED.md` with the reason, write **no** channel
drafts, and stop. For `post-meeting` this defers the slot: the wrapper retries every 10 minutes while the
slot window is open.

### 2. Pick the pillar
- Race-day slots are fixed (§5.3/§5.4): `pre-meeting` → P1 model insights; `mid-meeting` → P2 mini running
  tally (+ next races' picks); `late-meeting` → P2 mini or P1 for the remaining races; `post-meeting` →
  P2 full recap.
- `daily` → the §5.6 row for this weekday relative to the actual fixtures in the context (e.g. the day
  after a meeting = P2 weekly/meeting summary or P4 robots; card-declared day = P1-lite "card is out", no
  picks). Prefer what the context actually has data for.

### 3. Image
```bash
npx tsx marketing/scripts/card.ts --context Q/context.json --out Q/image.png
```
Open `Q/image.png` with the Read tool and check it: Chinese text renders (no empty boxes), numbers match
the context, disclaimer strip present. If it's broken, skip the image for Facebook/Threads/Telegram and
skip Instagram entirely (Instagram needs an image).

### 4. Draft one file per channel
**Hashtags, every channel:** at least 5, on the last line(s), chosen to fit the post (PLAN §4 set:
#香港賽馬 #賽馬 #沙田 / #跑馬地 #賽馬分析 #賽馬數據 #HKRacing #horseracing, pool tags like #單T #過關 when the
post is about that pool). **Never** tag the brand (#開跑前, #PostTime): the post already names it. The
publisher rejects drafts with fewer than 5 tags or a brand tag.

Follow PLAN §4 for format, length and links, §2.3 for voice (light written Cantonese; formal
Chinese only in disclaimers), and the §3 examples for shape. Replace every `{placeholder}` with context
data. Files:

| Channel | File | Notes |
|---|---|---|
| Facebook | `Q/facebook.md` | 300–600 zh chars + 1–2 line English summary, one UTM link from `context.links.facebook` |
| Instagram | `Q/instagram.md` | caption 150–400 chars, no clickable link — write 「連結喺 bio 🔗」, full disclaimer. Uses `Q/image.png` |
| Threads | `Q/threads.md` | **≤ 500 chars total including the disclaimer and tags** (aim ≤ 300 body), link optional; first tag becomes the Threads topic, so start with #香港賽馬 |
| Telegram | `Q/telegram.md` (plain) or `Q/telegram.html` (bold / links, Telegram HTML subset only) | ≤ 800 chars, link from `context.links.telegram` |

Instagram on race days: feed post at `pre-meeting` and `post-meeting` only (skip `mid`/`late`; Stories are
posted by hand). A Happy Valley `post-meeting` after 23:00: skip Instagram (PLAN moves it to next morning,
which has no automated slot yet).

**Star-users board (`pre-meeting` only, PLAN §3 P4 Ex 4).** If `leaderboard.last30.rows` has ≥ 3 rows, also
draft the board post for Threads, Facebook and Telegram into `marketing/queue/<date>/pre-board/review/<channel>.md`
(copy `Q/context.json` to `marketing/queue/<date>/pre-board/context.json`). Never into `Q` itself: it's a new
format, so it always waits for the owner, and a separate slot keeps it from colliding with the picks post. Rules:
quote only `last30` rows (`nameZh`, `bets`, `hitRate`, with `from` and `minBets`); a row with `nameZh: null` →
write 已公開會員; bots are 機械人; never `staked`/`returned`/`net`, never HK$, never today's bets; always
「排名以積分計，積分冇現金價值」. Fewer than 3 rows → skip it. The owner approves by moving a file up to
`pre-board/` and running `npx tsx marketing/scripts/publish.ts --queue marketing/queue/<date>/pre-board`.

Content that is free-written rather than template-filled (community prompts P6, a new format, anything
you're unsure about) goes to `Q/review/<channel>.md` instead — `publish.ts --queue` only reads the top level
of `Q`, so these wait for the owner.

### 5. Self-check every draft before publishing
- [ ] No §6.7 never-post item (the publisher also regex-checks `marketing/guard-blocklist.txt`, but don't
      rely on it: it can't catch implications like "this one can't lose").
- [ ] Every figure traceable to a field in `Q/context.json`; hit rates show the sample size (n) and period.
- [ ] Disclaimer present and verbatim; channel length limit met.
- [ ] ≥ 5 hashtags, none of them #開跑前 / #PostTime.
- [ ] Links: only from `context.links`, posttimehk.com, no `/credits` or pricing.
- [ ] Respect `context.guardrails` (per-slot do/don't notes from gather).
- [ ] No HKJC logo/"official" wording; no HK$ next to model or robot results.

Fix and re-check; if a draft can't pass, delete it (skip that channel).

### 6. Publish
Run exactly the command from the prompt, e.g.:
```bash
npx tsx marketing/scripts/publish.ts --queue marketing/queue/<date>/<slot>
```
It is a dry run unless the owner enabled live mode; it is idempotent per slot and channel, honours
`marketing/PAUSE`, and logs to `marketing/logs/publish.jsonl`. Any `INVALID` line → fix that draft once and
re-run the same command; still invalid → delete the draft and report it.

### 7. Report
Reply with: slot, pillar, per channel `published | dry run | skipped (reason) | held for review`, and the
publisher's output lines. Keep it short — this lands in the cron log.
