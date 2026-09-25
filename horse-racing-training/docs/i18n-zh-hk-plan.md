# Traditional Chinese (zh-HK) support — implementation plan

**Goal:** the whole app works in Traditional Chinese (香港繁體) **by default**, with English as the
alternative. The language is part of the URL. Interface text is handled by **i18next**. Horse, jockey,
trainer **and race** names come from a new database table, which is refreshed in the background when a
record is more than 7 days old.

**Status:** plan, revision 3 · 2026-09-25 · branch to create: `feat/i18n-zh-hk` (off `feat/rebrand`)

**Decisions (from review)**
- Race names are translated too (§3, §4).
- English names stay as they are in our data files (e.g. `ALABAMA STATE`). HKJC's English spelling is not fetched.
- A package handles i18n: `i18next` + `react-i18next` + `i18next-browser-languagedetector` (§7).
- The language lives in the URL as **one** query parameter. No parameter means Chinese (the default), and `?language=en` means English. There is no path prefix (§7.2).

---

## 1. What we found (the plan depends on these)

| Finding | Evidence | Consequence |
|---|---|---|
| Every name in the app already has a stable HKJC id next to it: horse `HK_2024_K580`, jockey `CJE`, trainer `EDJ`, race `2026-09-23-HV-1` | `data/racecards/*.json` → `race.id`, `entries[].horse.code`, `jockey.code`, `trainer.code`; `data/historical/*.json` → `races[].id`, `finishOrder[].horseCode`, `jockeyId`, `trainerId` | The table is keyed by `(kind, code)`, and the client looks names up by code. |
| HKJC's GraphQL `raceMeetings(date:…)` **ignores `date`** and returns the next meeting. For an overseas simulcast it returns made-up per-race codes (`20260926S10901J`) | Live query for 2026-09-23 and 2026-01-29 both returned the 2026-09-26 AUS meeting | GraphQL **cannot** backfill history. We use it only for live Momentum runners, storing `name_ch` next to the runner. |
| The HKJC Chinese **results page** has, per race, every runner's horse, jockey and trainer link (`…horse?horseid=HK_2024_K580` → `紅磚戰士`, `…jockeyprofile?jockeyid=CJE` → `周俊樂`, `…trainerprofile?trainerid=EDJ` → `游達榮`) **and** the race header (`南風讓賽`, `第五班 - 1650米`, going `好地`) | `racing.hkjc.com/zh-hk/local/information/localresults?RaceDate=2026/09/23&Racecourse=HV&RaceNo=1` | **Main bulk source:** one request per race gives the race name and about 14 horses with their jockeys and trainers. |
| The Chinese **horse** and **trainer** profile pages carry the name in `<title>` (`嘉應傳承 - 馬匹資料 - …`, `伍鵬志 - 練馬師資料 - …`) | `…/zh-hk/local/information/horse?HorseId=…`, `…/trainerprofile?TrainerId=…` | Can refresh a single horse or trainer. |
| The Chinese **jockey** profile page is rendered by client-side JavaScript; its `<title>` is generic | `…/jockeyprofile?JockeyId=AA` | A single jockey is refreshed from the results or racecard page of their latest meeting (§4.3). Phase 0 looks for a direct source. |
| The SQLite layer already has append-only migrations (`PRAGMA user_version`) | `server/momentum/db.ts` | Add a migration. No new database file. |
| Some payloads carry display names but no codes: the analyzer's `tn`/`tj`, Momentum `runners.name`, `FinishEntry` (drops `jockeyId`/`trainerId`), and `RaceCard` (no race `id`) | `shared/analyzer/model.ts`, `server/momentum/db.ts`, `shared/types.ts` | Phase 3 adds codes to these payloads. |
| The app already keeps its state in the query string (`?tab=trio`, read and written by `useViewParam` in `App.tsx`) | `src/App.tsx` | The language becomes one more query parameter, handled the same way. No path routing and no server change. |

---

## 2. Scope

**In scope**
- All interface text: header, menu sheet, Bet, result pop-ups, History, Win/Place, Trio, Momentum, chart axes, legends and tooltips, empty and error states.
- **Names from the DB:** horse, jockey, trainer and race, wherever they are shown. That covers the racecard head and rows, result panel, analyzer race tables, Momentum movers, chips, records headers and tooltips.
- **Fixed glossary via i18next** (not the DB): venue names (沙田 / 跑馬地), bet types, race class, going and surface.
- Dates, times, numbers and money formatted with `Intl` for `zh-HK` / `en-GB`, through i18next formatters.
- The language in the URL, and a switcher in the desktop header and the mobile menu sheet.

**Out of scope (possible follow-ups)**
- Simplified Chinese.
- Translating free-text server error messages.
- Surfacing HKJC's English spellings.

---

## 3. Database

New migration appended to `MIGRATIONS` in `server/momentum/db.ts`. The table lives in the same file (`data/momentum.sqlite`); we can rename that file to `app.sqlite` later.

```sql
-- One row per fetch; the latest row per (kind, code) is the current name.
CREATE TABLE entity_names (
  id          INTEGER PRIMARY KEY,
  kind        TEXT NOT NULL CHECK (kind IN ('horse', 'jockey', 'trainer', 'race')),
  code        TEXT NOT NULL,              -- HK_2024_K580 | CJE | EDJ | 2026-09-23-HV-1
  name_en     TEXT,                       -- from our data files (kept as-is)
  name_zh     TEXT,                       -- Traditional Chinese; NULL if HKJC has none
  source      TEXT NOT NULL,              -- 'results-page' | 'racecard-page' | 'profile-page' | 'data-file'
  fetched_at  TEXT NOT NULL               -- ISO-8601 UTC
);
CREATE INDEX entity_names_lookup ON entity_names (kind, code, fetched_at DESC);

-- Momentum runners come from GraphQL, which returns name_ch directly.
ALTER TABLE runners ADD COLUMN name_zh TEXT;
```

**Rules**
- **Append-only.** A refresh always inserts a new row and never updates in place. Reads take the newest row per key.
- **Stale** means the latest row's `fetched_at` is more than 7 days old (`NAME_TTL_DAYS = 7`, configurable). A stale row is still served; see §5.
- **Race names** rarely change after the meeting. They follow the same 7-day rule so the behaviour is uniform, and a refresh costs nothing extra because the same page request refreshes the runners' names.
- **Failed fetch:** insert nothing, so the old row stays current, and log the error. Retry with backoff (§4.4). Never insert an empty or garbage name.
- **Housekeeping:** a daily job deletes all but the newest 5 rows per key.

**Repo API** (`server/names/store.ts`, takes the existing `DB` handle):

```ts
type Kind = "horse" | "jockey" | "trainer" | "race";
interface NameRow { kind: Kind; code: string; nameEn: string | null; nameZh: string | null; fetchedAt: string }

latest(keys: { kind: Kind; code: string }[]): Map<string, NameRow>   // key = `${kind}:${code}`
insert(rows: Omit<NameRow, "fetchedAt">[], source: string, at?: Date): void   // one transaction
staleOrMissing(keys, now, ttlDays): { kind: Kind; code: string }[]
```

---

## 4. Fetching names from HKJC

### 4.1 Parsers (`server/names/parse.ts`, pure functions tested against saved HTML fixtures)
- `parseResultsPage(html, raceId)` → `{ race: {code: raceId, nameZh}, horses, jockeys, trainers }`.
  - Runners: match `href="…horse?horseid=(ID)"…>NAME<`, and the same for `jockeyid=` and `trainerid=`, case-insensitive. Unescape HTML entities, trim, and drop the ` (K580)` brand suffix.
  - Race name: the cell in the race-info table on the row after the `第N班 - …米` line (e.g. `南風讓賽`). Take class and going from the same table **only to check the glossary** (§7.5), not for storage.
- `parseRacecardPage(html, raceId)`: same shape, for the Chinese **racecard** page of upcoming meetings. URL and markup to be confirmed in Phase 0.
- `parseProfileTitle(html)` → the text before the first ` - ` in `<title>`, for horse and trainer profiles. Reject generic titles such as `The Hong Kong Jockey Club`.
- **Fixtures:** save one real page of each type under `server/names/__fixtures__/`, so tests never hit the network.

### 4.2 HTTP client (`server/names/hkjcPages.ts`)
- `fetch` with a desktop User-Agent, a 10 s timeout and `Accept-Language: zh-HK`.
- **Politeness:** one request at a time and at least 1 s apart.

### 4.3 Which page refreshes which entity
| Kind | Bulk (preferred) | Single entity |
|---|---|---|
| race | its own results page (or racecard page before results exist) | same page |
| horse | results or racecard page of its latest meeting | horse profile `<title>` |
| trainer | same | trainer profile `<title>` |
| jockey | same | re-read the results or racecard page of the jockey's **most recent meeting**. If Phase 0 finds a list page with every jockey (e.g. the ranking), use that instead |

The "latest race for a code" index comes from `server/dataIndex.ts`, which already scans racecards and results. Extend it to record, per horse, jockey or trainer code, the most recent race id.

### 4.4 Background refresh queue (`server/names/refresher.ts`)
- **In memory and de-duplicated.** Before fetching, group requested keys by the race page that covers them, so a stale race name plus 14 stale runners cost one request.
- **Retries:** exponential backoff per key (1 min → 1 h, capped). After a key fails 3 times, don't retry it for 24 h.
- Started from `server/index.ts` and runs whether or not a request is waiting.
- **On startup:** enqueue everything missing, which is also a resumable first-run backfill.

### 4.5 Seeding and backfill (`npm run names:backfill`)
1. Insert English names from `data/racecards` and `data/historical` for every race, horse, jockey and trainer code (`source='data-file'`).
2. Walk results meetings from newest to oldest, one Chinese results page per race. About 911 races means about 900 requests at 1 per second, roughly 15 minutes. It can be stopped and resumed.
3. Print a coverage report per kind (the percentage with `name_zh`).

---

## 5. API

```
POST /api/names/lookup
body:  { "keys": [{ "kind": "race", "code": "2026-09-23-HV-1" }, { "kind": "horse", "code": "HK_2024_K580" }, …] }   // ≤ 500 keys
200:   { "names": { "race:2026-09-23-HV-1": { "en": "GOOD NAM FUNG HANDICAP", "zh": "南風讓賽", "fetchedAt": "…" }, … },
         "pending": ["jockey:XYZ"] }
```

Behaviour is **stale-while-revalidate**:
1. Return the latest stored row for each key right away, including rows older than 7 days.
2. Keys that are stale or missing go to the refresher queue. Keys with **no** Chinese name yet are listed in `pending`.
3. The request never waits on HKJC.

**Validation:** `kind` must be one of the four values, and `code` must match `^[A-Za-z0-9_-]{1,32}$` (race ids contain `-`). Anything else gets 400.

Existing endpoints stay language-agnostic: they return codes and English names, and the client resolves display names. The exception is Momentum runners, which get `nameZh` next to `name`.

---

## 6. Payload changes (make codes available everywhere a name is shown)

| Where | Change |
|---|---|
| `shared/types.ts` `RaceCard` | add `id` (the race id from `race.id`) |
| `shared/types.ts` `RaceResult` | add `id` |
| `shared/types.ts` `FinishEntry` | add `jockeyCode?`, `trainerCode?`, passed through from `jockeyId`/`trainerId` |
| `shared/analyzer/model.ts` | add `tc` (top pick horse code) and `tjc` (its jockey code) next to `tn`/`tj`. The race id is derived from `d`/`v`/`r` |
| Momentum `runners` table and series | store `name_zh` from GraphQL `name_ch`, and expose `nameZh` in `RaceSeries.runners` |
| `CardEntry` | already has `horse.code`, `jockey.code`, `trainer.code`. Add `code` to the TS types if missing |

---

## 7. Client i18n (i18next)

### 7.1 Packages
```
npm i i18next@^26 react-i18next@^17 i18next-browser-languagedetector@^8
```
- **Supported languages:** `zh-HK` (default and fallback) and `en`.
- **Translations are bundled in the JS**, not loaded over HTTP, so there is no flash of keys and nothing extra to load. At about 300 strings per language this costs almost nothing.

### 7.2 Language in the URL

**One format only:** the query parameter `language`. The path is always `/`.

| URL | Language |
|---|---|
| `/` · `/?tab=trio` | 繁體中文 (default, no parameter) |
| `/?language=en` · `/?tab=trio&language=en` | English |
| `/?language=zh-HK`, `/?language=xx`, `/?language=` | Chinese. The parameter isn't valid (Chinese is written by omitting it), so `history.replaceState` removes it from the URL |

Why a query parameter rather than an `/en` path prefix: the app already keeps its state in the query (`?tab=`), and `useViewParam` already reads and writes search parameters. Language is one more parameter, with no path handling, no effect on relative URLs or `/api`, and a single detection source.

- **Detection:** `i18next-browser-languagedetector` with `order: ["querystring"]`, `lookupQuerystring: "language"` and `caches: []`. The URL is the single source of truth, with no `localStorage` or `navigator.language`, so a shared link always opens in the language it names and a bare link opens in Chinese.
- **Switching** (`setLanguage(lng)`):
  1. Build the URL: set `language=en` for English, or **delete** the parameter for Chinese. Keep `tab` and all other parameters.
  2. Call `history.replaceState`. Switching language doesn't create a back-button step.
  3. Call `i18n.changeLanguage`.
  4. Set `<html lang>` to `zh-Hant-HK` or `en`.
- **Back/forward:** extend the existing `popstate` handler in `App.tsx` (`useViewParam`) to also re-read `language`.
- **Tab URLs:** `useViewParam` builds URLs from `location.href` and only edits `tab`, so switching tabs keeps `language=en`. Add a test.
- **`index.html`:** `<html lang="zh-Hant-HK">`, matching the default.

### 7.3 Setup (`src/i18n/index.ts`)
```ts
i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: { "zh-HK": zhHK, en },
  supportedLngs: ["zh-HK", "en"],
  fallbackLng: "zh-HK",
  nonExplicitSupportedLngs: false,
  ns: ["common", "bet", "history", "analyzer", "momentum"],
  defaultNS: "common",
  interpolation: { escapeValue: false },          // React escapes already
  detection: { order: ["querystring"], lookupQuerystring: "language", caches: [] },
  returnNull: false,
});
```
- **Files:** `src/i18n/locales/{zh-HK,en}/{common,bet,history,analyzer,momentum}.ts`, as plain TS objects rather than JSON, so they are type-checked and tree-shaken with the app.
- **Type safety:** `declare module "i18next" { interface CustomTypeOptions { defaultNS: "common"; resources: typeof en } }` makes `t("bet:placeBet")` autocomplete, and a missing or typo'd key a compile error. A test also checks that `zh-HK` has exactly the same key set as `en`.
- **Usage:** `const { t } = useTranslation("bet")`. Rich text such as notes that contain `<code>` uses `<Trans>`.
- **Plurals:** i18next's `_one`/`_other` suffixes. zh-HK only needs `_other`.
- **Formatting:** i18next's built-in Intl formatters, `{{value, number}}`, `{{value, currency(HKD)}}`, `{{date, datetime(dateStyle: medium)}}` and `{{p, number(style: percent)}}`. Recharts `tickFormatter`s and tooltips call `t(...)` or `i18n.format`, so axes switch language too.

### 7.4 Names (`src/i18n/names.tsx`)
- `useNames()` works like a small query cache. A component calls `name("horse", code, fallbackEn)`.
  - Codes requested during a render are batched on the next tick into one `POST /api/names/lookup`.
  - Results go into a module-level `Map` for the session.
  - When the language is `en`, it returns `fallbackEn` with no API call.
  - When the language is `zh-HK`, it returns `zh ?? fallbackEn`, so English shows while a name is loading or missing.
  - If the response has `pending` keys, retry them after 5 s, then once more after 30 s.
- A `<Name kind code en />` component wraps this for JSX.
- **Language switch:** subscribe to `i18n.on("languageChanged")`, so switching to Chinese triggers **one** batched lookup for the codes on screen, which is the "retrieve data when we change the language" requirement.
- **Default Chinese:** the first page load already runs in zh-HK, so the lookup happens on first render as well.

### 7.5 Glossary (`common` namespace; fixed, not from the DB)

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
| Class 1–5 | 第一班 … 第五班 | Going: Good / Good to Firm / Yielding | 好地 / 好快 / 黏地 |
| Turf / All Weather | 草地 / 全天候跑道 | Distance (m) | 米 |

The parsers (§4.1) log any class or going text on HKJC pages that doesn't match this table, so the glossary stays in line with HKJC's wording. A native speaker who follows HKJC reviews the complete `zh-HK` files before merge.

### 7.6 Switcher
- **Desktop header:** a segmented control `繁 | EN` next to the tabs. Chinese comes first because it's the default.
- **Mobile sheet:** a full-width `seg` at the bottom of the menu, in the slot where Opendoor has "Sign in".
- It uses real links (`<a href="?tab=…&language=en">`, and the same URL without `language` for 繁) with a click handler, so middle-click or "open in new tab" works and the link is shareable.
- Changing language keeps the current tab, filters and selection. Only strings re-render.

### 7.7 Typography
- Font stacks (system CJK fonts before web fonts, so Apple devices never download them):
  - `--font-sans`: `"Inter", "PingFang HK", "Noto Sans TC", …`
  - `--font-display`: `"DM Serif Display", "Songti TC", "Noto Serif TC", serif`
- **Because Chinese is the default,** load `Noto Serif TC` (600) and `Noto Sans TC` (400/500) in `index.html`. Google Fonts serves unicode-range slices, so only the glyphs used are downloaded.
- **CJK adjustments:**
  - Use `:lang(zh-Hant-HK)` to reset `letter-spacing` to 0 and set line-height 1.6 for body text.
  - Don't use `uppercase`.
  - Recheck pill rows, KPI tiles, the cost bar and the mobile header at 390px.

---

## 8. Work breakdown

| # | Phase | Main files | Est. |
|---|---|---|---|
| 0 | **Spike:** Chinese racecard page URL and markup; a direct jockey-name source; HKJC terms and robots for the pages we read; the GraphQL `code` format for a **local** meeting on the next HK race day | notes in this doc | 0.5 d |
| 1 | DB migration, `store.ts`, unit tests | `server/momentum/db.ts`, `server/names/store.ts` | 0.5 d |
| 2 | Parsers including race name, with fixtures; page client; refresher queue; backfill script and coverage report | `server/names/*`, `package.json` | 1.5 d |
| 3 | `POST /api/names/lookup`; payload codes and race ids (§6); Momentum `name_zh` | `server/routes.ts`, `server/analyzer.ts`, `shared/*`, poller | 0.5 d |
| 4 | i18next setup: config, typed resources, `?language` detection and normalization, switcher (header and sheet), `<html lang>`, popstate, fonts | `src/i18n/*`, `src/App.tsx`, `src/MobileNav.tsx`, `index.html`, `index.css` | 1 d |
| 5 | Pull out and translate every string into namespaces. Can run in parallel: (a) App + ui.tsx → `common`/`bet`/`history`, (b) analyzer, (c) momentum + charts | all `src/**` | 1.5 d |
| 6 | Names in the UI: `<Name>` for race, horse, jockey and trainer everywhere | same | 0.5 d |
| 7 | QA and review (§9) | — | 0.5 d |
| | **Total** | | **≈ 6.5 days** |

Commit once per phase.

---

## 9. Testing and QA

**Automated (vitest)**
- **Store:** latest wins; >7 days counts as stale; a failed refresh leaves the old row current; housekeeping keeps 5 rows; race keys work.
- **Parsers:** the fixture pages give `race:2026-09-23-HV-1 → 南風讓賽`, `HK_2024_K580 → 紅磚戰士`, `CJE → 周俊樂`, `EDJ → 游達榮`. A generic `<title>` is rejected. Unknown class or going text is reported.
- **Refresher:** a stale race name plus 14 stale runners from one race cost one request; a key is enqueued only once while queued; backoff applies after a failure. Uses a fake clock and a fake fetch.
- **Lookup route:** returns stale rows immediately, enqueues them, lists `pending`, and validates kinds and codes (including `-` in race ids).
- **URL and language** (pure functions in `src/i18n/url.ts`):
  - `/` → zh-HK; `/?tab=trio&language=en` → en
  - `/?language=zh-HK&tab=trio` and `/?language=xx` → zh-HK, with `language` removed and `tab` kept
  - Bad values fall back to zh-HK
  - `setLanguage` keeps `tab`
  - Tab switching keeps `language=en`; switching to Chinese removes the parameter
- **Resources:** the `zh-HK` and `en` key sets are identical in every namespace; interpolation and formatters produce the expected strings in both languages.
- **Hardcoded-string guard:** a test greps `src/**/*.tsx` for JSX text nodes of plain English outside `t()`/`<Trans>`, with an allowlist for symbols and numbers.

**Manual**
- Open `/`: everything is Chinese. Switch to EN: the URL gains `language=en`, and the tab and filters are kept. Copy the URL, open it in a new window: English. Browser back and forward behave sensibly.
- On every tab at desktop and 390px width, names switch after one lookup call (check DevTools).
- Cold start with an empty `entity_names` table: English names show first, and Chinese fills in as the queue runs.
- Pretend it's 8 days later (edit `fetched_at`). The page still shows the old name immediately, and a new row appears in the table.
- With the HKJC host blocked, nothing breaks and English fallbacks show.
- The prod build (`npm run build && npm start`) opens `/?tab=momentum&language=en` in English on the Momentum tab.
- A native zh-HK speaker reviews all translations.

---

## 10. Risks and open questions

| Risk | Mitigation |
|---|---|
| HKJC changes page markup, or blocks scraping | Parsers are isolated and fixture-tested; failures keep the last good name; English fallback always works. Phase 0 checks the terms. |
| No direct source for a single jockey | Refresh through the latest race page that includes them (§4.3). |
| GraphQL codes differ from racecard codes for local meetings | Momentum stores `name_zh` on the runner itself, so it doesn't depend on the table. |
| First backfill takes about 15 minutes, and Chinese is the default | Throttled, resumable background job. Until it finishes, users see Chinese interface text with English names, which still works. Run `npm run names:backfill` once before the first Chinese-default release. |
| CJK web fonts on every default load | Unicode-range slicing; `display=swap`; the system CJK fonts (PingFang HK, Songti TC) come first on Apple devices, so the web fonts mostly serve other platforms. |
| Old bookmarks with no language now open in Chinese | Intended, because Chinese is the default. English users bookmark a URL that includes `?language=en`. |
