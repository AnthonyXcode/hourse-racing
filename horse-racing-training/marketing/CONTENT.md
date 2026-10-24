# CONTENT: where each post's facts come from, and how its image is made

Owner: content data & visuals. Strategy and rules live in [PLAN.md](PLAN.md). Publishing mechanics live in AUTOMATION.md and `scripts/publish.ts`.

This document covers two scripts:

| Script | Job |
|---|---|
| `scripts/gather.ts` | Reads the **public** prod API and prints one JSON **context** for one slot. Every figure in a post comes from this object. |
| `scripts/card.ts` | Draws a 1080×1350 PNG from a context: an SVG string rendered with `sharp`. No new dependencies. |

```bash
# context (stdout, or --out file)
npx tsx marketing/scripts/gather.ts --slot daily|pre-meeting|mid-meeting|late-meeting|post-meeting \
    [--date YYYY-MM-DD] [--base https://posttimehk.com] [--now ISO] [--pillar picks|recap|learn|board|feature|community] \
    [--no-member-names] [--include-live] [--out ctx.json]

# image (default output: marketing/out/<date>-<slot>.png; prints the path)
npx tsx marketing/scripts/card.ts --context ctx.json [--layout auto|picks|results|record] [--out file.png]
npx tsx marketing/scripts/card.ts --slot post-meeting [--date …]      # gathers first, then draws
```

- `--date` is the HK day the post is about. It defaults to today in Hong Kong.
- `--now` replays a past day. Races with a post time after `--now` are treated as still to run, and their results are hidden. Use it for tests only.
- Exit code 1 means an error. `card.ts` also exits 1 when a race-day slot has no meeting on that date, so the automation should skip the post.
- API failures don't crash the script. Each failure is retried once, then listed in `warnings[]`. **Recommended publish rule:** if `warnings` is non-empty, or a field the template needs is `null` or missing, skip the post or drop that line (PLAN.md §3: "if data is missing, it skips the post").

Race-day slot ids from `scripts/raceday-slot.ts` are the same names as gather's `--slot`:

| Slot (when) | gather `--slot` | card layout (auto) |
|---|---|---|
| non-race day, 20:30 | `daily` | `record` |
| `pre-meeting` (R1 − 90 min) | `pre-meeting` | `picks` (all races) |
| `mid-meeting` (+3 h) | `mid-meeting` | `picks` (next 3 races, with a running tally strip) |
| `late-meeting` (+6 h, long cards only) | `late-meeting` | `results` once races have settled, else `picks` |
| `post-meeting` (last race + 40 min) | `post-meeting` | `results` |

Typecheck: `marketing/` is outside the root `tsconfig.json` include, so run tsc directly:
`npx tsc --noEmit --strict --skipLibCheck --module esnext --moduleResolution bundler --target es2022 --types node --noUnusedLocals --noUnusedParameters marketing/scripts/gather.ts marketing/scripts/card.ts`.
The scripts import `shared/analyzer/model.ts`, `shared/types.ts` and the i18n locale files, so their imports are extensionless. Use bundler resolution, not nodenext.

---

## 1. Data-source map

All endpoints are public GETs, plus one read-only POST for names, on `https://posttimehk.com`. None needs auth. Dates use `YYYYMMDD` in the path of `/api/meeting`, `/api/race`, `/api/result` and `/api/race-analysis`, and `YYYY-MM-DD` everywhere else.

| Endpoint | What we take | Lands in context as |
|---|---|---|
| `GET /api/days` | Meetings with saved cards: `date`, `venue`, `races[]`, `hasResults` | `isRaceDay`, `meeting` ref, `nextMeeting`, practice link date |
| `GET /api/meeting/:date/:venue` | `raceInfo[].postTime` | `races[].postTime`, `postTimeHK`, `firstPostHK`, `lastPostHK` |
| `GET /api/race/:date/:venue/:rn` | `name`, `class`, `distance`, `surface` (runner details ignored) | `races[].name`, `classEn`, `classZh`, `distance`, `surface` |
| `GET /api/race-analysis?date&venue&race` | Model order `horses[]` (`modelRank`, `winPct`, `placePct`) plus `avgDiff`/`close8`/`sparse`/`gap`/`tripRuns` | Upcoming `races[].picks` (top 3), and `stars`/`rulesMet`/`fiveStar`, computed with the app's own `strategyChecks` + `confidence` from `shared/analyzer/model.ts` (the Bet page's number) |
| `GET /api/home/records?date=` | Settled races: model picks #1–3 with `fin`, actual `top3` with `picked`, `win`/`place` | Settled `races[].picks[].fin`, `races[].result`, `meeting.tally`, `meeting.highlights` |
| `GET /api/result/:date/:venue/:rn` | `winDividend`, `trioDividend`, `quinellaDividend` (HKJC, per $10) | `races[].result.*Dividend`. **Pool-education only**, see §3 |
| `POST /api/names/lookup` `{keys:[{kind:"horse",code}]}` | Chinese horse names | every `nameZh` (null if not fetched yet, so fall back to `name`) |
| `GET /api/home/summary` | Rolling ~3-month model record (`from`/`to`): top-3 win/place hits and %, 5★ place % and ROI, Trio "#1 banker + 2–6" | `modelRecord` |
| `GET /api/home/meetings?from&to` | Meeting-by-meeting win/place hits over a range (max 366 days) | `lastWeek` (daily: the previous 7 days) |
| `GET /api/leaderboard` | `lastDay` and `last30` boards (opted-in members, then bots filling to 5) | `leaderboard` (daily, post-meeting) |
| `GET /api/leaderboard/bot-<alias>?range=30d` | Each strategy bot's 30-day `bets`/`hits`/`hitRate`/`roi` (the bet list is dropped) | `bots` (daily, all 7, best ROI first) |
| `GET /api/home/tickets` | Open tickets: members' LIVE bets and bot bets | `tickets`, **only with `--include-live`** (off by default, see §2) |
| i18n source `src/i18n/locales/{zh-HK,en}/{common,home}.ts` | Venue, class and bet-type labels; bot names and strategy text | `venueZh`, `classZh`, `betTypeZh`, bot `nameZh`/`strategyZh` |

Endpoints we deliberately **don't** use:
- `/api/momentum/*`: live odds and money-flow series. PLAN §6.7(5) bans live odds feeds.
- `/api/race` runner odds: odds-comparison content is banned (§6.7(3)). The context carries no odds at all.
- Member profiles: `/api/leaderboard/:publicId` and `/api/history`.

### Post type → exact fields

| Post type (PLAN pillar) | Slot | Fields to quote |
|---|---|---|
| Model top picks for upcoming races (P1 picks) | `pre-meeting` (all races), `mid-meeting` (`nextUp`, 3 races), `late-meeting` (`nextUp`, the rest) | `meeting.races[r].picks[0..2].{num,nameZh}`, `stars`/`fiveStar`, `meeting.fiveStarRaces`, `postTimeHK`; optional `picks[].winPct/placePct` labelled 模型估算 |
| Model hit rate (P1/P2) | `daily`, `pre-meeting`, `post-meeting` | `modelRecord.top3WinPct` (`top3WinHits`/`races`), `top3PlacePct` (`top3PlaceHits`/`races`), window `from`–`to` / `firstRace`–`lastRace`, `meetings`; 5★: `fiveStarPlacePct` (`fiveStarPlaceHits`/`fiveStarRaces`); Trio: `modelRecord.trio.{hits,races,hitPct}` |
| Today's / yesterday's results with hit/miss (P2 recap) | `mid-meeting`, `post-meeting`; `daily` → `lastMeeting` | `meeting.tally.{settled,winHits,placeHits,topPickWins,trioHits}`; best race = `highlights.topPickWon` / `trioHit`; **worst race = `highlights.allMissed`** (PLAN: never a hits-only recap); per race `result.top3[].{num,nameZh,picked}`; `highlights.pending` = say 「賽果待更新」 |
| Weekly summary (P2, Monday) | `daily` | `lastWeek.{from,to,races,winHits,placeHits,meetings[]}` |
| Robot / leaderboard (P4 board) | `daily` (Thu per PLAN), `post-meeting` | `bots[].{nameZh,strategyZh,roi,hitRate,bets}`; `leaderboard.lastDay/last30.rows[]` (`kind`, `nameZh`, `bets`, `hitRate`, `roi`). Always add 「以積分計，積分沒有現金價值」 |
| Upcoming tickets highlight | `pre-meeting`/`mid-meeting` with `--include-live` | `tickets[]`. **Blocked by PLAN §6.7(4) until legal sign-off.** Kept for later; bot tickets are the safer subset |
| Pool explainer (P3 learn) | `daily`, `pre-meeting`, `late-meeting` | `explainer.{topic,zh,en}` (a static, rule-checked list that rotates by day of year). For a real-dividend example: `meeting.races[r].result.trioDividend` etc., labelled 過往賽果 and never next to a model hit |
| Next-meeting teaser (P5 feature) | `daily`, `post-meeting` | `nextMeeting.{date,venueZh,raceCount}`. Known only once the card is saved (~2 days before) |
| Links (all) | all | `links[channel].{home,practice,winPlace,trio}`. UTM per PLAN §2: `utm_source=fb|ig|threads|tg`, `utm_medium=social`, `utm_campaign=<pillar>`, `utm_content=<yyyymmdd>-<slot>`. `practice` is the Bet tab on the latest **settled** meeting (practice mode). We never link today's live meeting, credits or pricing |
| Disclaimer (all) | all | `disclaimer.short` (FB/Threads/TG) or `disclaimer.full` (IG captions, weekly posts). Copied verbatim from PLAN §6.6. The image footer carries `disclaimer.short.zh` |

`pillar` defaults from the slot: pre → picks, mid/post → recap, late → learn. A non-race `daily` follows the PLAN weekday calendar: Mon recap, Tue learn, Thu board, Fri feature, Sat/Sun community. Override it with `--pillar`.

## 2. Privacy and accuracy rules (enforced in `gather.ts`)

- **Members:** names come only from `/api/leaderboard` rows (the server filters on `show_on_leaderboard = 1`) and from non-hidden tickets with a `publicId`. Hidden members' tickets are dropped entirely, not anonymised. `avatarUrl` and `publicId` are never copied. `--no-member-names` removes opted-in names too, leaving bots only. Note: members opted into the *in-app* board. If we want extra care on social, run with `--no-member-names` until the opt-in copy mentions social posts.
- **Bots** are labelled strategy bots (機械人). Their names and strategy text come from the app's i18n, so they match the site.
- **No fabricated numbers:** the scripts only copy and count. `card.ts` derives nothing beyond `x/y` tallies that are already in `meeting.tally`. Stars are the app's own formula, and percentages are the API's own rounding.
- **Not betting advice:** `disclaimer` plus `guardrails[]` ship in every context, so the Claude prompt can read them in place.
- **LIVE content is off by default.** Tickets are LIVE bets in credits. PLAN §6.7(4) blocks them until legal sign-off, hence the `--include-live` gate.
- **No HK$ next to model, robot or member results** (PLAN §6.7(2)). Dividends stay in the context for P3 examples only, and the results image shows no dividends.

## 3. Image plan

Look: same chrome as the in-app share image (`src/history/ShareRecord.tsx`) and DESIGN.md tokens:
- Header: navy `#122C68` bar, `public/logo-128.png`, white "Post Time 開跑前" wordmark (kept prominent per PLAN §6.4), and a gold `#FECF13` slot tag on the right.
- Body: canvas `#F4F4F4` background, white rounded card, navy race badges and number chips, gold rings marking the model's picks, a banker-tint `#FFF5CC` row for 5★ races, and green `#1D7A47` for hits.
- Footer: 「資料更新」 timestamp (HKT), the PLAN short disclaimer (wrapped at its `｜` separators), a hairline and `posttimehk.com`.
- No HKJC marks, silks or screenshots.

| Layout | Used for | Content |
|---|---|---|
| `picks` | pre-meeting, mid-meeting, late-meeting before results | Title 「10月25日（日）沙田」, subtitle with race count and 5★ races. One row per race: R#, post time, top-3 number chips plus Chinese names, and the app's stars (exact fraction, gold over grey). With ≤ 4 races, rows grow and show 「勝x% · 上名y%」 per pick. Once races have settled, a tally strip sits on top |
| `results` | post-meeting, late-meeting | Three navy tiles (首3選中頭馬 / 首3選有馬上名 / 首選勝出, each `x/n`). One row per settled race: actual first three as chips (gold ring = one of the model's top 3), the winner's name, and an outcome pill (單T命中 / 中頭馬 / 有馬上名 / 全部未入位, so misses are as visible as hits). Pending races are named in the subtitle |
| `record` | daily | Two big tiles (3-month top-3 win % / place %, with hits/races), last meeting tally, today's card or the next meeting, and the day's explainer |

**Fonts.** librsvg (inside sharp) resolves `font-family` through pango/fontconfig. On this Mac, `PingFang HK` renders (regular and bold) even though `fc-list :lang=zh` lists only Heiti / Hiragino / Songti / Arial Unicode MS. The stack is `PingFang HK, Noto Sans CJK TC, Noto Sans TC, Heiti TC, Arial Unicode MS, sans-serif`. **If cron runs on Linux, install `fonts-noto-cjk`**, or the Chinese text renders as tofu. Check by rendering one card and looking at it. Text fitting uses a width estimate (CJK = 1em) that shrinks the font size, then falls back to `textLength` squeeze, so long names never overflow.

**Instagram:** one feed image per post from `card.ts`. For a carousel (PLAN: pre-meeting), call `card.ts --layout picks` on a context whose `nextUp` is set to a slice of races. For example, split 11 races 6/5 by editing `nextUp` in the JSON before drawing. Outputs go to `marketing/out/` (gitignored by `marketing/.gitignore`).

Verified samples (rendered from prod on 2026-10-25 and checked by eye; no missing glyphs):
- `marketing/out/2026-10-25-pre-meeting.png` (picks, ST 11 races, R2/R11 5★)
- `marketing/out/2026-10-21-post-meeting.png` (results, HV, 8/9 settled, R9 pending)
- `marketing/out/2026-10-21-mid-meeting.png` (picks, replay with `--now 2026-10-21T20:30:00+08:00`, R5–R7, with tally strip)
- `marketing/out/2026-10-24-daily.png`, `marketing/out/2026-10-25-daily.png` (record)

## 4. Sample context (trimmed)

`npx tsx marketing/scripts/gather.ts --slot pre-meeting` on 2026-10-25, 00:23 HKT, showing two of the 11 races:

```json
{
  "schema": "posttime.marketing.context/v1",
  "slot": "pre-meeting",
  "focus": ["meeting.fiveStarRaces", "meeting.races[].picks", "modelRecord (3-month hit rate)", "explainer"],
  "date": "2026-10-25",
  "isRaceDay": true,
  "pillar": "picks",
  "disclaimer": {
    "short": {
      "zh": "18+｜模擬練習及數據分析，非投注建議｜與香港賽馬會無關｜過往表現不代表將來｜賭博輔導熱線 1834 633",
      "en": "18+ | Practice & analysis only, not betting advice | Not affiliated with HKJC | Gambling help: 1834 633"
    },
    "full": "(PLAN §6.6 full text)"
  },
  "guardrails": ["Quote only numbers present in this object; never round differently, extrapolate or invent.", "…"],
  "links": {
    "facebook": {
      "home": "https://posttimehk.com/?utm_source=fb&utm_medium=social&utm_campaign=picks&utm_content=20261025-pre-meeting",
      "practice": "https://posttimehk.com/?tab=bet&date=2026/10/21&utm_source=fb&utm_medium=social&utm_campaign=picks&utm_content=20261025-pre-meeting",
      "winPlace": "https://posttimehk.com/?tab=win-place&utm_source=fb&…",
      "trio": "https://posttimehk.com/?tab=trio&utm_source=fb&…"
    },
    "…": "instagram / threads / telegram: same, utm_source=ig|threads|tg"
  },
  "meeting": {
    "date": "2026-10-25", "venue": "ST", "venueZh": "沙田", "raceCount": 11, "firstPostHK": "12:40", "lastPostHK": "18:20",
    "races": [
      {
        "raceNo": 2, "postTimeHK": "13:10", "status": "upcoming",
        "classZh": "第五班", "distance": 1400, "surface": "Turf", "runners": 14,
        "stars": 5, "rulesMet": 6, "rulesTotal": 6, "fiveStar": true,
        "picks": [
          { "rank": 1, "num": 12, "name": "ONLY U", "nameZh": "銳一", "winPct": 57.8, "placePct": 86.2 },
          { "rank": 2, "num": 5, "name": "VIGOR ELLEEGANT", "nameZh": "銳高", "winPct": 11.8, "placePct": 43.9 },
          { "rank": 3, "num": 10, "name": "DRACO", "nameZh": "快樂老撾", "winPct": 10.7, "placePct": 43.5 }
        ]
      },
      {
        "raceNo": 5, "postTimeHK": "15:05", "status": "upcoming", "classZh": "第四班", "distance": 1200,
        "stars": 1.7, "rulesMet": 2, "rulesTotal": 6, "fiveStar": false,
        "picks": [
          { "rank": 1, "num": 13, "name": "SPEEDY POWER", "nameZh": "閃電奇駿", "winPct": 17.6, "placePct": 41.9 },
          "…"
        ]
      }
    ],
    "tally": { "settled": 0, "winHits": 0, "placeHits": 0, "topPickWins": 0, "trioHits": 0, "fiveStarSettled": 0, "fiveStarTopPickPlaced": 0 },
    "fiveStarRaces": [2, 11],
    "highlights": { "topPickWon": [], "trioHit": [], "winHit": [], "allMissed": [], "pending": [] }
  },
  "modelRecord": {
    "from": "2026-07-25", "to": "2026-10-25", "firstRace": "2026-09-06", "lastRace": "2026-10-21",
    "races": 126, "meetings": 13,
    "top3WinHits": 66, "top3WinPct": 52.4, "top3PlaceHits": 107, "top3PlacePct": 84.9,
    "fiveStarRaces": 15, "fiveStarPlaceHits": 9, "fiveStarPlacePct": 60, "fiveStarRoiPct": -9.3,
    "trio": { "bankers": 1, "last": 6, "races": 126, "hits": 18, "hitPct": 14.3, "roiPct": -51.4 }
  },
  "explainer": { "topic": "…", "zh": "…", "en": "…" },
  "sources": ["GET /api/days", "GET /api/meeting/20261025/ST", "GET /api/home/records?date=2026-10-25", "…"],
  "warnings": []
}
```

A settled race in a `post-meeting` context (HV 2026-10-21 R3):

```json
{
  "raceNo": 3, "status": "settled", "stars": 3.3, "fiveStar": false,
  "picks": [
    { "rank": 1, "num": 4, "name": "HAPPY SMILE", "nameZh": "越駿聯歡", "fin": 9 },
    { "rank": 2, "num": 8, "name": "LUCK IS BACK", "nameZh": "金駒永騰", "fin": 2 },
    { "rank": 3, "num": 3, "name": "TURIN CHAMPIONS", "nameZh": "都靈冠星", "fin": 1 }
  ],
  "result": {
    "top3": [
      { "pos": 1, "num": 3, "nameZh": "都靈冠星", "picked": true },
      { "pos": 2, "num": 8, "nameZh": "金駒永騰", "picked": true },
      { "pos": 3, "num": 10, "nameZh": "康昌之星", "picked": false }
    ],
    "winHit": true, "placeHit": true, "topPickWon": false, "trioHit": false,
    "winDividend": 106, "trioDividend": 408, "quinellaDividend": 136.5
  }
}
```
(meeting `tally`: `{settled: 8, winHits: 5, placeHits: 8, topPickWins: 2, trioHits: 0}`; `highlights.pending: [9]`, and `warnings` says R9 has no result yet.)

## 5. Data gaps (no public endpoint, or caveats)

1. **No Chinese race names.** `/api/race` names are English sponsor titles. Use `classZh` + distance instead (e.g. 「第五班 1400米」).
2. **Stars for settled races are recomputed now** from the saved card (whose odds become the final ones). They can differ from what the Bet page showed before the race. The summary's 5★ figures use the server's own records, so don't mix the two. For "was this a 5★ race" in a recap, prefer a context gathered pre-meeting (save the pre-meeting context and reuse it).
3. **Results can lag or be missing.** E.g. HV 2026-10-21 R9 has no result on prod (`/api/result` returns 404, and it's absent from records). gather marks it `awaiting-result`, lists it in `highlights.pending` and adds a warning. Abandoned or void races have no distinct flag in any public endpoint.
4. **No meeting-abandonment / typhoon endpoint.** PLAN §5's 「賽事已宣佈取消」 notice needs a manual trigger or an HKJC check.
5. **Chinese horse names can be null** for horses the names cache hasn't fetched yet (the lookup queues a refresh). Fall back to the English `name`.
6. **Next meeting appears only when its racecard is saved** (~2 days ahead). There is no fixture-list endpoint, so `nextMeeting` is null earlier in the week.
7. **The leaderboard returns at most 5 rows per board**, and bots appear only when fewer than 5 members qualify. Full bot standings need the 7 `/api/leaderboard/bot-*` calls (done in `daily`). Bot display names exist only in the app's i18n source, not in the API.
8. **Model record window is fixed** (≈ last 3 months, cached 5 min). Custom windows exist only as win/place hit counts via `/api/home/meetings` (no %, no 5★ or Trio split).
9. **Tickets are LIVE-only content** (gated, see §2). There is no public "practice activity" endpoint for a safer community post.
10. **No first-touch UTM capture on the site** yet (PLAN §2 engineering ask), so UTM links only attribute visits.
11. **No Linux CJK font guarantee.** The cron host needs `fonts-noto-cjk` (see §3).
