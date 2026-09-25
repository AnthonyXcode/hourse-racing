# Traditional Chinese (zh-HK) support — implementation plan

**Goal:** the whole app can switch between English and Traditional Chinese (香港繁體). Interface text is
translated in the client. Horse, jockey and trainer names come from a new database table, which is
refreshed in the background when a record is more than 7 days old.

**Status:** plan · 2026-09-25 · branch to create: `feat/i18n-zh-hk` (off `feat/rebrand`)

---

## 1. What we found (the plan depends on these)

| Finding | Evidence | Consequence |
|---|---|---|
| Every name in the app already has a stable HKJC id next to it: horse `HK_2024_K580`, jockey `CJE`, trainer `EDJ` | `data/racecards/*.json` → `entries[].horse.code`, `jockey.code`, `trainer.code`; `data/historical/*.json` → `finishOrder[].horseCode`, `jockeyId`, `trainerId` | The table is keyed by `(kind, code)`, and the client looks names up by code. |
| HKJC's GraphQL `raceMeetings(date:…)` **ignores `date`** and returns the next meeting. For an overseas simulcast it returns made-up per-race codes (`20260926S10901J`) | Live query for 2026-09-23 and 2026-01-29 both returned the 2026-09-26 AUS meeting | GraphQL **cannot** backfill history. We use it only for the live Momentum runners, storing `name_ch` next to the runner. |
| The HKJC Chinese **results page** lists every runner's horse, jockey and trainer as links, e.g. `…/horse?horseid=HK_2024_K580` → `紅磚戰士` and `…/jockeyprofile?jockeyid=CJE` → `周俊樂` | `racing.hkjc.com/zh-hk/local/information/localresults?RaceDate=2026/09/23&Racecourse=HV&RaceNo=1` | **Main bulk source:** one request per race gives about 14 horses plus their jockeys and trainers. |
| The Chinese **horse** and **trainer** profile pages carry the name in `<title>` (`嘉應傳承 - 馬匹資料 - …`, `伍鵬志 - 練馬師資料 - …`) | `…/zh-hk/local/information/horse?HorseId=…`, `…/trainerprofile?TrainerId=…` | Can refresh a single horse or trainer. |
| The Chinese **jockey** profile page is rendered by client-side JavaScript; its `<title>` is generic | `…/jockeyprofile?JockeyId=AA` | A single jockey is refreshed from the latest results or racecard page that includes them (see §4.3). Verify a direct source in Phase 0. |
| The SQLite layer already has append-only migrations (`PRAGMA user_version`) | `server/momentum/db.ts` | Add a migration. No new database file. |
| Some payloads carry display names but no codes: the analyzer payload has `tn`/`tj` (top pick horse/jockey name), Momentum `runners` stores `name` only, and the `FinishEntry` type drops `jockeyId`/`trainerId` even though the JSON has them | `shared/analyzer/model.ts`, `server/momentum/db.ts`, `shared/types.ts` | Phase 3 adds codes to these payloads. |

---

## 2. Scope

**In scope**
- All interface text: header, menu sheet, Bet, result pop-ups, History, Win/Place, Trio, Momentum, chart axes, legends and tooltips, empty and error states.
- Horse, jockey and trainer names wherever they are shown: racecard, result panel, History picks (horse numbers only today, so nothing changes there), analyzer race tables, Momentum movers, chips, records headers and tooltips.
- Venue names (沙田 / 跑馬地), bet-type names, race class and going, via a fixed glossary rather than the database.
- Dates and numbers in the `zh-HK` locale.
- A language switcher in the desktop header and the mobile menu sheet. The choice persists.

**Out of scope (possible follow-ups)**
- Race names (`raceName_ch`). The same results and racecard pages include them, so this could be a later extension of the same table.
- Simplified Chinese.
- Translating free-text server error messages.

---

## 3. Database

New migration appended to `MIGRATIONS` in `server/momentum/db.ts`. The table lives in the same file (`data/momentum.sqlite`); we can rename that file to `app.sqlite` later.

```sql
-- One row per fetch; the latest row per (kind, code) is the current name.
CREATE TABLE entity_names (
  id          INTEGER PRIMARY KEY,
  kind        TEXT NOT NULL CHECK (kind IN ('horse', 'jockey', 'trainer')),
  code        TEXT NOT NULL,              -- HKJC id: HK_2024_K580 | CJE | EDJ
  name_en     TEXT,                       -- as HKJC spells it (from our data files or the en page)
  name_zh     TEXT,                       -- Traditional Chinese; NULL if HKJC has none
  source      TEXT NOT NULL,              -- 'results-page' | 'racecard-page' | 'profile-page' | 'data-file'
  fetched_at  TEXT NOT NULL               -- ISO-8601 UTC
);
CREATE INDEX entity_names_lookup ON entity_names (kind, code, fetched_at DESC);

-- Momentum runners come from GraphQL, which returns name_ch directly.
ALTER TABLE runners ADD COLUMN name_zh TEXT;
```

**Rules**
- **Append-only.** A refresh always inserts a new row (as requested) and never updates in place. Reads use `ORDER BY fetched_at DESC LIMIT 1` per key, or a window query for batches.
- **Stale** means the latest row's `fetched_at` is more than 7 days old (`NAME_TTL_DAYS = 7`, configurable). A stale row is still served; see §5.
- **Failed fetch:** insert nothing, so the old row stays current, and log the error. Retry with backoff (§4.4). Never insert an empty or garbage name.
- **Housekeeping:** a daily job deletes all but the newest 5 rows per key, so the table can't grow without limit. This is optional, and cheap either way.

**Repo API** (`server/names/store.ts`, takes the existing `DB` handle):

```ts
type Kind = "horse" | "jockey" | "trainer";
interface NameRow { kind: Kind; code: string; nameEn: string | null; nameZh: string | null; fetchedAt: string }

latest(keys: { kind: Kind; code: string }[]): Map<string, NameRow>   // key = `${kind}:${code}`
insert(rows: Omit<NameRow, "fetchedAt">[], source: string, at?: Date): void   // one transaction
staleOrMissing(keys, now, ttlDays): { kind: Kind; code: string }[]
```

---

## 4. Fetching names from HKJC

### 4.1 Parsers (`server/names/parse.ts`, pure functions tested against saved HTML fixtures)
- `parseResultsPage(html)` → `{ horses, jockeys, trainers }: {code, nameZh}[]`. Match `href="…horse?horseid=(ID)"…>NAME<`, and the same for `jockeyid=` and `trainerid=`, case-insensitive. Unescape HTML entities and trim. Drop the ` (K580)` brand suffix that follows the horse link.
- `parseRacecardPage(html)`: same idea for the Chinese **racecard** page, so upcoming meetings get names before their results exist. The URL and markup are to be confirmed in Phase 0.
- `parseProfileTitle(html)` → the text before the first ` - ` in `<title>`, for horse and trainer profiles. Reject generic titles such as `The Hong Kong Jockey Club`.
- **Fixtures:** save one real page of each type under `server/names/__fixtures__/`, so tests never hit the network.

### 4.2 HTTP client (`server/names/hkjcPages.ts`)
- `fetch` with a desktop User-Agent, a 10 s timeout and `Accept-Language: zh-HK`.
- **Politeness:** one request at a time, at least 1 s apart, and never more than one pass per day for backfill. We're a single local user, and this must stay that way.

### 4.3 Which page refreshes which entity
| Kind | Bulk (preferred) | Single entity |
|---|---|---|
| horse | the Chinese results or racecard page of its latest meeting | horse profile `<title>` |
| trainer | same | trainer profile `<title>` |
| jockey | same | re-read the results or racecard page of the jockey's **most recent meeting**, found from our data files. If Phase 0 finds a list page with every jockey (e.g. the jockey ranking), use that instead |

The "latest meeting for a code" index comes from `server/dataIndex.ts`, which already scans racecards and results. Extend it to record, per code, the most recent `(date, venue, raceNo)`.

### 4.4 Background refresh queue (`server/names/refresher.ts`)
- **In memory and de-duplicated.** Before fetching, group requested keys by the meeting page that covers them, so N stale horses from one race cost one request.
- **Retries:** exponential backoff per key (1 min → 1 h, capped). After a key fails 3 times, don't retry it for 24 h.
- Started from `server/index.ts` and runs whether or not a request is waiting.
- **On startup:** enqueue everything missing. That covers the first-run backfill, which is throttled and resumable because it only fetches what's missing.

### 4.5 Seeding and backfill (`npm run names:backfill`)
1. Insert English names for every code found in `data/racecards` and `data/historical` (`source='data-file'`), so every code has a row.
2. Walk results meetings from newest to oldest, fetching each race's Chinese results page, until every code has a `name_zh` or we reach the oldest meeting. About 911 race files cover roughly 90 meetings, so around 900 requests at 1 per second, about 15 minutes. The script can be stopped and resumed.
3. Print a coverage report showing the percentage of horses, jockeys and trainers that have a Chinese name.

---

## 5. API

```
POST /api/names/lookup
body:  { "keys": [{ "kind": "horse", "code": "HK_2024_K580" }, { "kind": "jockey", "code": "CJE" }, …] }   // ≤ 500 keys
200:   { "names": { "horse:HK_2024_K580": { "en": "RED BRICK WARRIOR", "zh": "紅磚戰士", "fetchedAt": "…" }, … },
         "pending": ["jockey:XYZ"] }
```

Behaviour is **stale-while-revalidate**:
1. Return the latest stored row for each key right away, including rows older than 7 days.
2. Keys that are stale or missing go to the refresher queue. Keys with **no** Chinese name yet are listed in `pending`.
3. The request never waits on HKJC.

Validation: `kind` must be one of the three values and `code` must match `^[A-Za-z0-9_]{1,32}$`. Reject anything else with 400.

Existing endpoints stay language-agnostic. They return codes, and the client resolves names, so only the display layer changes. The one exception is Momentum runners, which get `nameZh` next to `name` in `raceSeries`.

---

## 6. Payload changes (make codes available everywhere a name is shown)

| Where | Change |
|---|---|
| `shared/types.ts` `FinishEntry` | add `jockeyCode?`, `trainerCode?`, passed through from `jockeyId`/`trainerId` in the results JSON |
| `shared/analyzer/model.ts` | add `tc` (top pick horse code) and `tjc` (its jockey code) next to `tn`/`tj`, and fill them in `server/analyzer.ts` |
| Momentum `runners` table and series | store `name_zh` from GraphQL `name_ch` in `poller.settle` and runners fetch, and expose `nameZh` in `RaceSeries.runners` |
| `CardEntry` | already has `horse.code`, `jockey.code`, `trainer.code`. Add `code` to the TS types if they're missing |

---

## 7. Client i18n

### 7.1 Setup (no library; the app is small)
- `src/i18n/en.ts` holds the source dictionary as a nested object. `src/i18n/zh-HK.ts` has the same shape, typed `typeof en`, so a missing key is a compile error.
- `src/i18n/index.tsx` provides:
  - `LangProvider`
  - `useT()` → `t("bet.placeBet")`, with `{var}` interpolation and a basic plural helper
  - `useLang()` → `{ lang, setLang }`
  - `fmt` helpers wrapping `Intl` (date, time, number, money, percent) with `en-GB` / `zh-HK`
- **Choosing the language:** a `?lang=zh-HK` URL param wins over `localStorage`, which wins over `navigator.language` (`zh-*` → zh-HK), with English as the fallback. This matches the shareable-URL behaviour we added for tabs.
- `<html lang>` is set to `en` / `zh-Hant-HK`.

### 7.2 Names (`src/i18n/names.tsx`)
- `useNames()` works like a small query cache. A component calls `name("horse", code, fallbackEn)`.
  - Codes requested during a render are batched on the next tick into one `POST /api/names/lookup`.
  - Results go into a module-level `Map` cache for the session.
  - When `lang` is `en`, it returns `fallbackEn` and never calls the API.
  - When `lang` is `zh-HK`, it returns `zh ?? fallbackEn`, so English shows while a name is loading or missing. No layout jump, because the element is the same.
  - If the response has `pending` keys, retry those once after 5 s, then once more after 30 s.
- A `<Name kind code en />` component wraps this for JSX.
- Switching language triggers exactly one batched lookup for the codes on screen, which is the "retrieve data when we change the language" requirement.

### 7.3 Switcher
- **Desktop header:** a small segmented control `EN | 繁` next to the tabs.
- **Mobile sheet:** a full-width `seg` at the bottom of the menu, in the slot where Opendoor has "Sign in".
- Changing language keeps the current tab, filters and selection. Only strings re-render.

### 7.4 Glossary (fixed translations, not from the DB)

| en | zh-HK | en | zh-HK |
|---|---|---|---|
| Win | 獨贏 | Banker | 膽 |
| Place | 位置 | Leg | 腳 |
| Quinella | 連贏 | Odds | 賠率 |
| Quinella Place | 位置Q | Dividend | 派彩 |
| Trio | 單T | Draw | 檔位 |
| Tierce | 三重彩 | Weight | 負磅 |
| First 4 | 四連環 | Jockey | 騎師 |
| Double Trio | 孖T | Trainer | 練馬師 |
| Triple Trio | 三T | Race N | 第N場 |
| Sha Tin (ST) | 沙田 | Happy Valley (HV) | 跑馬地 |
| Scratched | 退出 | Result | 賽果 |
| Class 1–5 | 第一至五班 | Going: Good / Good to Firm / Yielding | 好 / 好地快 / 黏 |

A native speaker who follows HKJC should review the full `zh-HK.ts` file before merge (see §9).

### 7.5 Typography
- Inter and DM Serif Display have no CJK glyphs. Extend the font stacks:
  - `--font-sans`: `"Inter", "Noto Sans TC", "PingFang HK", …`
  - `--font-display`: `"DM Serif Display", "Noto Serif TC", "Songti TC", serif`
- Load `Noto Serif TC` (weight 600) and `Noto Sans TC` (400/500) from Google Fonts. Google serves them in unicode-range slices, so only the glyphs used are downloaded.
- **CJK adjustments:**
  - No negative letter-spacing on CJK. Use `:lang(zh-Hant-HK)` to reset `letter-spacing` to 0.
  - Line-height 1.6 for body text.
  - Don't use `uppercase`. The kit no longer does.
- **Width check:** Chinese strings are usually shorter, but numbers plus units (`第10場`, `$1,065`) need to stay tabular. Recheck the pill rows, KPI tiles and the cost bar at 390px.

---

## 8. Work breakdown

| # | Phase | Main files | Est. |
|---|---|---|---|
| 0 | **Spike:** confirm the Chinese racecard page URL and markup; find a direct jockey-name source (ranking list?); check HKJC terms and robots for the pages we read; confirm GraphQL horse and jockey `code` format for a **local** meeting on the next HK race day | notes in this doc | 0.5 d |
| 1 | DB migration, `store.ts`, unit tests (latest, staleness, append-only, batch) | `server/momentum/db.ts`, `server/names/store.ts` | 0.5 d |
| 2 | Parsers with fixtures, page client, refresher queue (dedupe, grouping, backoff), backfill script and coverage report | `server/names/*`, `package.json` | 1.5 d |
| 3 | `POST /api/names/lookup`, and payload codes (§6) including Momentum `name_zh` | `server/routes.ts`, `server/analyzer.ts`, `shared/*`, poller | 0.5 d |
| 4 | i18n setup: provider, `useT`, `fmt`, switcher (header and sheet), persistence, `<html lang>`, fonts | `src/i18n/*`, `src/App.tsx`, `src/MobileNav.tsx`, `index.html`, `index.css` | 0.5 d |
| 5 | Pull out and translate every string. Can run in parallel: (a) App + ui.tsx, (b) analyzer, (c) momentum + charts | all `src/**` | 1.5 d |
| 6 | Names in the UI: `<Name>` everywhere a horse, jockey or trainer is shown | same | 0.5 d |
| 7 | QA and review (§9) | — | 0.5 d |
| | **Total** | | **≈ 6 days** |

Commit once per phase, so each step can be reviewed or reverted on its own.

---

## 9. Testing and QA

**Automated (vitest)**
- **Store:** latest wins; >7 days counts as stale; a failed refresh leaves the old row current; housekeeping keeps 5 rows.
- **Parsers:** the fixture pages give known pairs (`HK_2024_K580 → 紅磚戰士`, `CJE → 周俊樂`, `EDJ → 游達榮`). A generic `<title>` is rejected.
- **Refresher:** 20 stale horses from one race cost one page request; a key is enqueued only once while queued; backoff applies after a failure. Uses a fake clock and a fake fetch.
- **Lookup route:** returns stale rows immediately, enqueues them, lists `pending`, and rejects bad kinds and codes.
- **i18n:** every key in `en` exists in `zh-HK` (the type enforces this, and a runtime test catches `as any` escapes). Interpolation and plurals work.
- **Hardcoded-string guard:** a small test greps `src/**/*.tsx` for JSX text nodes that are plain English outside `t()`, with an allowlist for symbols and numbers.

**Manual**
- Switch EN ↔ 繁 on every tab at desktop and 390px width. Names should switch after one network call (check DevTools).
- Cold start with an empty `entity_names` table: English shows first, and Chinese appears once the queue fills it.
- Pretend it's 8 days later (set the clock or edit `fetched_at`). The page should still show the old name immediately, and a new row should appear in the table.
- Offline HKJC (block the host): nothing breaks and English fallbacks show.
- A native zh-HK speaker reviews all translations and glossary terms.

---

## 10. Risks and open questions

| Risk | Mitigation |
|---|---|
| HKJC changes page markup, or blocks scraping | Parsers are isolated and fixture-tested; failures keep the last good name; English fallback always works. Phase 0 checks the terms. |
| No direct source for a single jockey | Refresh through the latest meeting page that includes them (§4.3). Jockeys change names rarely. |
| GraphQL codes differ from racecard codes for local meetings | Momentum stores `name_zh` on the runner itself, so it doesn't depend on the table. |
| First backfill takes about 15 minutes | Throttled, resumable, runs in the background; the UI falls back to English meanwhile. |
| CJK web fonts add weight | Unicode-range slicing, and only loaded when `lang=zh-HK` (inject the `<link>` from the provider). |
| **Open:** should the English names also come from HKJC (en pages), so casing matches, e.g. "Alabama State (AUS)" vs our "ALABAMA STATE"? | Suggest keeping the data-file English as-is. |
| **Open:** should race names be translated too? | The same pages have them. Easy follow-up with a `race` kind or a separate table. |
