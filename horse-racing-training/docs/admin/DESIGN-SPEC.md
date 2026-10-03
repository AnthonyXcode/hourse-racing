# Admin Panel — Design Spec

Status: draft v1 (Designer) · 2026-10-04 · Scope: `/admin` for staff — read views for admin and owner,
audited write actions for the owner only.

Builds on [DESIGN.md](../../DESIGN.md), the [membership spec](../membership/DESIGN-SPEC.md) (login modal, OTP input,
toast, `modalNarrow` dialogs, focus rules) and the [credits spec](../credits/DESIGN-SPEC.md) + [PRD](../credits/PRD.md)
(ledger kinds, `statusChip`, `modeBadge`, held bets, kill switch). Only DESIGN.md tokens and `src/kit.tsx` classes are used.
New shared pieces are marked **[new]** and go in `src/admin/kit.ts` (admin-only, so the member bundle doesn't grow).
i18n: namespace `admin` (§12), zh-HK default. Desktop (`lg` ≥ 1024) first; phone (≤ 430) must be usable.

---

## 0. Decisions at a glance

| # | Decision | Why |
|---|---|---|
| A1 | **Inverted chrome.** Member app = navy top bar + white tabs. Admin = **white top bar** + **navy-900 left sidebar** (desktop) / white top bar + navy menu sheet (phone). | Staff can tell where they are at a glance, and it stays inside the tokens (no new colours, no thick borders). |
| A2 | **Role badge in the top bar, always visible.** Owner = `bg-gold text-ink-strong` "擁有人 Owner". Admin = `bg-navy-900 text-white` "管理員 · 唯讀". | Gold means "money can move here", the same as the Live badge. The read-only state is spelled out, not implied. |
| A3 | Real paths `/admin/*` (not `?tab=`), separate `AdminApp` shell, lazy-loaded. `<title>` is prefixed `[Admin]`, plus `noindex`. | Deep links to a user/bet in chat and the audit log; browser tabs show which one is admin. |
| A4 | Admin (read-only) users **don't see** owner controls at all. Instead, one line in the action panel: "只有擁有人可以作出更改". | Disabled buttons invite clicks and support requests. One sentence explains it. The server enforces it anyway. |
| A5 | **No gold in list views.** Gold appears only as the single primary button inside a confirm dialog (non-destructive writes). Destructive writes use `btnDanger`. Row and panel actions are `btn`. | It keeps the DESIGN.md one-gold rule on dense pages, and gold always means "this commits a change". |
| A6 | **One confirm-dialog pattern for every owner write**: title → before/after summary → required reason → (OTP step if sensitive) → one action button. | A predictable, audited, hard-to-misclick flow. The reason goes straight into the audit row. |
| A7 | Contact data is **masked for everyone by default**, including the owner, in lists and exports. The owner gets **Reveal** per user (logged, auto-hides after 60 s). | It prevents shoulder-surfing and screenshot leaks, and still lets the owner see full values when needed (brief: owner sees full). |
| A8 | Tables: kit `table`, 13px text, **44px rows**, sticky header, server-side sort/filter/pagination, state in the URL. Below `sm` they become stacked cards. | DESIGN.md row height and tabular-nums. URL state makes every view shareable and survives reload. |
| A9 | Credits use the credits-spec format (`+` in `text-good`, `−` in `text-ink`, unit "積分"). Real money is always `HK$`. They are never in the same column. | Staff must never confuse credits with Stripe money. |
| A10 | **OTP step-up** for sensitive writes (role change, adjust ≥ 1,000, void race/meeting, unmasked CSV export, reveal is *not* one). A verified OTP is valid for 10 minutes. | It protects against a hijacked session without nagging during a held-bet resolution run. |

---

## 1. Shell

### 1a. Desktop ≥ 1024

```
┌──────────────┬──────────────────────────────────────────────────────────────────┐
│ [logo] 開跑前 │ 管理後台 › 用戶 › 陳大文     [Stripe 測試]  [擁有人]  [繁|EN]  (陳) ▾ │  top bar: white, h-14
│ 管理後台      ├──────────────────────────────────────────────────────────────────┤
│              │                                                                  │
│ ▌總覽        │  content (canvas, max-w-[1280px], px-6 py-6)                      │
│  用戶        │                                                                  │
│  投注        │                                                                  │
│  暫緩結算 ③  │                                                                  │
│  積分紀錄    │                                                                  │
│  購買紀錄    │                                                                  │
│  審計紀錄    │                                                                  │
│  系統狀態    │                                                                  │
│              │                                                                  │
│ ← 返回開跑前  │                                                                  │
└──────────────┴──────────────────────────────────────────────────────────────────┘
  navy-900, w-[220px], fixed full height
```

| Element | Spec |
|---|---|
| Sidebar [new] `adminNav` | `fixed inset-y-0 left-0 w-[220px] bg-navy-900 text-white flex flex-col`. Brand block `h-14 px-[13px] flex items-center gap-2`: `/logo-128.png` at `size-7` (`alt=""`) + `common:appName` 15/700 + `admin:brand` 11px `text-white/75` underneath. |
| Nav item | `<a>` (real links, middle-click works): `flex h-11 items-center gap-2 px-[13px] text-[15px] text-white/85 hover:bg-white/10`. Current: `bg-navy-700 text-white font-medium`, `aria-current="page"` (the DESIGN.md side-menu selected style). |
| Held count | `tabBadge(false)` inverted: `bg-white text-navy-700`, only when > 0. `aria-label` "暫緩結算，3 項待處理". |
| Back to app | Bottom, `text-white/75 hover:text-white h-11`, `admin:nav.backToApp`. |
| Top bar [new] `adminBar` | `sticky top-0 z-40 h-14 bg-surface border-b border-line shadow-card flex items-center gap-3 px-6`, offset `lg:pl-[calc(220px+24px)]`. Publishes `--admin-bar-h` (sticky table headers sit under it). |
| Breadcrumb | 13px: `text-link` crumbs, current crumb `text-ink-strong font-medium`, `nav aria-label="breadcrumb"`. The page title itself is the `h1` in content. |
| Stripe mode chip | `tag`-sized: test = `bg-sky-100 text-navy-900` "Stripe 測試"; live = `bg-navy-900 text-white` "Stripe 正式". Links to System. |
| Role badge [new] `roleBadge(role)` | `inline-flex h-6 items-center rounded-full px-2.5 text-[13px] font-medium`. owner `bg-gold text-ink-strong`; admin `bg-navy-900 text-white`; in tables, user `bg-surface-2 text-ink-muted`. Always text, never colour alone. |
| Account | `LangSwitch` (on white: navy variant) + avatar menu (Profile → member app, Log out). |

### 1b. Phone ≤ 430 (and anything < `lg`)

```
┌────────────────────────────────────────────┐
│ ☰  [logo] 管理後台          [擁有人]   (陳) │  white, h-12, sticky
├────────────────────────────────────────────┤
│ 用戶 › 陳大文                               │  13px breadcrumb, px-4 py-2 (canvas)
```

- ☰ (`size-11`, `aria-label` `admin:nav.open`, `aria-expanded`) opens the **menu sheet**: the BetSlip/account sheet anatomy
  (`rounded-t-sheet`, scrim, grabber, 250 ms), but with a **navy-900 panel** and the same item styles as the sidebar, plus the
  Stripe chip and LangSwitch at the bottom. Esc and scrim close it; focus returns to ☰.
- The Stripe chip moves into the sheet. The role badge stays in the bar; it never hides.

---

## 2. Data tables

### 2a. Anatomy (desktop / `sm`+)

```
┌ 用戶 ─────────────────────────────────────────────────────── 1,234 位 ┐  sectionHead (navy-900) + count
│ [🔍 搜尋姓名、電話、ID      ] [角色 ▾] [狀態 ▾] [加入日期 ▾]  清除篩選  [匯出 CSV] │  filters bar
│ 篩選：(角色：管理員 ✕) (已標記 ✕)                                     │  active filter chips
├──────────────────────────────────────────────────────────────────────┤
│ 名稱 ▲      電話           角色    積分結餘 ▾   待派彩   加入日期   狀態   │  sticky thead
│ 陳大文      +852 9123 ••78  用戶      2,450       3   2026-10-03  –     │  44px rows, zebra
│ …                                                                    │
├──────────────────────────────────────────────────────────────────────┤
│ 第 1–50 項，共 1,234 項       每頁 [50 ▾]        ‹ 上一頁   下一頁 ›   │  pagination
└──────────────────────────────────────────────────────────────────────┘
```

| Part | Spec |
|---|---|
| Container | `sectionHead` (title + right-aligned `text-[13px] text-white/85` total) + `sectionBody`. Table in `overflow-x-auto`. |
| Table | `cx(table, tablePadTight, "text-[13px] [&_td]:h-11")`. Numbers right-aligned `tabular-nums`; text left. The first column (name/ID) is a link `text-link font-medium` to the detail page — the whole row is **not** clickable (it keeps text selectable and a11y simple). |
| Sticky header | `[&_th]:top-[var(--admin-bar-h)]` when the page scrolls; inside a `max-h` scroller, `top-0`. `bg-surface` + bottom `line`. |
| Sortable column [new] `sortTh` | `<th aria-sort="ascending|descending|none">` wrapping a `<button>` (`inline-flex items-center gap-1 h-8 -mx-1 px-1 rounded-xs hover:bg-sky-50`). Icon 12px: ▲/▼ in `text-navy-700` when active, a faint ⇅ `text-ink-muted` when idle. Click cycles desc → asc (numbers/dates start desc). One sort key at a time. |
| Filters bar [new] `filterBar` | `flex flex-wrap items-center gap-2 px-[13px] py-2.5 border-b border-line`. Search = `control` with a 16px search glyph prefix, `w-full sm:w-72`, `type="search"`, debounced 300 ms, Enter submits now. Selects = `control w-auto`. Date range = two `dateControl`s or a preset select (今日 / 7 日 / 30 日 / 自訂). "清除篩選" = `text-link` button (only when something is set). Export CSV (owner) = `btn` right-aligned (`ml-auto`). |
| Active filter chips | `pill(true)` small (`h-7 text-[13px]`) with ✕, `aria-label` "移除篩選：角色 管理員". |
| Pagination | Cursor based. Left: `admin:table.range` 13px `ink-muted`. Page size `control w-20` (25/50/100). `btn` Prev/Next (`h-9`), disabled at the ends. Total from the server (approximate "約" if > 10,000). |
| URL state | `?q=&role=&sort=balance:desc&cursor=&size=50`. Back/forward restore the view, scroll to the top of the table. |
| IDs | `code` class, first 8 characters + copy button (`size-8`, `aria-label` "複製 ID"); toast "已複製". |
| Timestamps | HK time, `2026-10-04 13:02` (seconds in audit only), `tabular-nums`; `title` shows the relative time ("3 分鐘前"). |

### 2b. Phone (< `sm`): stacked cards

```
┌──────────────────────────────────────────┐
│ 陳大文                       [用戶]       │  15/500 link + role badge
│ +852 9123 ••78 · 加入 2026-10-03          │  13px ink-muted
│ 積分結餘 2,450 · 待派彩 3        [已標記] │  13px, values tabular
└──────────────────────────────────────────┘
```
- `<ul>` of `rounded-card bg-surface shadow-card px-[13px] py-2.5` with `gap-2`. Each card shows 3–5 key fields defined per table
  (§4–§9 list them in order); the rest is on the detail page.
- The filters bar collapses to search + a `btn` "篩選 (2)" that opens a sheet with the selects and a "Sort by" select (sorting
  can't use column headers here). Apply = `btnPrimary` inside the sheet (the only action there).
- Pagination: range text + Prev/Next full-width row.

### 2c. States

| State | Spec |
|---|---|
| First load | 8 skeleton rows: `h-11` with `bg-surface-2` bars in `motion-safe:animate-pulse`; thead is real. `aria-busy="true"` on the table. |
| Refetch (sort/filter/page) | Keep old rows at `opacity-60`, 2px `bg-navy-700` progress bar under the thead (indeterminate, motion-safe), `aria-busy`. No layout jump. |
| Empty (no data) | `empty` cell spanning all columns: `admin:table.empty` per table. |
| Empty (filters) | `admin:table.noMatch` + `text-link` "清除篩選". |
| Error | `errorBox` (`role="alert"`) inside the body: `admin:err.load` + `btn` "重試". The filters stay usable. |
| 403 mid-session (role revoked) | Full-page not-authorised (§10). |

---

## 3. Shared formatting, chips, masking

### Money and credits
- **Credits:** `fmt.num` + unit in the column header ("積分") so cells are bare numbers. Signed values: `+1,000` `text-good`,
  `−240` `text-ink` (U+2212 minus). Balances unsigned `text-ink-strong`. Never `$`.
- **HK$:** `HK$300` (whole dollars; HKD has no cents in our plans). Stripe refunds `−HK$300` `text-ink`. Never mixed with credits.
- **Dividends:** "每 $10 派 $42.50" (HKJC convention), 2 decimals.
- KPI figures ≥ 100,000 → compact (`12.5萬` / `125K`), full value in `title` and the screen-reader text.

### Status chips (reused + admin additions)
| Kind | Class | zh-HK / en |
|---|---|---|
| pending | `statusChip("pending")` | 待派彩 / Pending |
| won | `statusChip("won")` | 已派彩 +N / Won +N |
| lost | `statusChip("lost")` | 未中 / Lost |
| void / refunded | `statusChip("refunded")` | 已退回 +N / Refunded +N |
| **held** [new] | `statusChip` base + `bg-surface text-bad ring-1 ring-bad` + "!" glyph | 暫緩 / Held |
| purchase paid | `statusChip("won")` styles, label 已付款 | Paid |
| purchase open | `statusChip("pending")` styles, label 處理中 | Open |
| purchase expired | `statusChip("refunded")` styles, label 已過期 | Expired |
| purchase refunded / disputed | `statusChip("lost")` styles, label 已退款 / 爭議中 | Refunded / Disputed |
| account flagged [new] | `bg-bad-soft text-bad` chip + flag glyph | 已標記 / Flagged |

Mode: `modeBadge(mode, "white")` in every bet row. Role: `roleBadge` (§1a).

### Masked values [new] `Masked`
- Phone `+852 9123 ••78`, email `t•••@example.com`, Telegram `@to•••`, WhatsApp as phone. `tabular-nums`. `aria-label` "已遮蔽電話，尾數 78".
- **Owner only:** on the user detail Contact card, a `btn` (h-9) "顯示聯絡資料" with an eye glyph. It opens a small `modalNarrow`
  confirm: "此操作會記錄在審計紀錄" + `btn` 取消 + `btnPrimary` 顯示 (no reason required — friction must stay low, but it is logged).
  Values show for **60 s** with a visible countdown ("43 秒後隱藏"), then mask again; "立即隱藏" `text-link`. The audit row is
  `contact.reveal`.
- Admins: no reveal control; values just stay masked.
- Search accepts a full phone number for both roles; the results stay masked.

---

## 4. Dashboard (`/admin`)

```
Desktop
│ 總覽                                  [今日][7 日][30 日]   更新於 13:02 ⟳ │  Display + seg + refresh
│ ┌!┐ 3 注暫緩結算需要處理 · 對賬發現 1 項差異            [查看] │  noticeBanner (only when needed)
│ ┌──────────┐┌──────────┐┌──────────┐┌──────────┐                       │
│ │會員       ││今日活躍   ││流通積分   ││今日購買   │                       │  kpis grid, 4-up
│ │ 1,234    ││   87     ││ 1.25M    ││ HK$4,300 │                       │
│ │+12 今日   ││即場 41    ││待派彩 23,400││ 31 宗 · 2 達上限│              │
│ └──────────┘└──────────┘└──────────┘└──────────┘                       │
│ ┌──────────┐┌──────────┐┌──────────┐┌──────────┐                       │
│ │即場投注   ││投注額     ││派彩       ││系統       │                       │
│ │  412     ││ 52,100   ││ 47,880   ││ ✓ 正常   │                       │
│ │待派彩 58 ││ 積分      ││淨 +4,220 ││ 結算 2 分鐘前│                    │
│ └──────────┘└──────────┘└──────────┘└──────────┘                       │
│ ┌ 最近購買 ──────────────────┐ ┌ 最近操作（審計）─────────────┐          │  grid2: two compact tables (5 rows)
│ │ …                          │ │ …                            │          │
│ └────────────────────────────┘ └──────────────────────────────┘          │

Phone
│ 總覽                         ⟳    │
│ [今日][7 日][30 日]               │
│ ┌!┐ 3 注暫緩結算需要處理    [查看] │
│ ┌────────────┐┌────────────┐     │  kpis: 2-up
│ │會員  1,234 ││活躍    87  │     │
│ │+12 今日    ││即場 41     │     │
│ └────────────┘└────────────┘     │
│ … 8 tiles …                       │
│ 最近購買 (cards) · 最近操作 (cards)│
```

| Element | Spec |
|---|---|
| KPI tile [new] `kpiTile` | `panel` + `min-h-[112px] flex flex-col`. Label 13px `ink-muted`; value `figure text-[28px] text-navy-900` (phone 22px); sub-line 13px `ink` with the secondary number. If the tile links to a filtered list, the whole tile is an `<a>` with `hover:ring-1 hover:ring-navy-700/30` and a 12px › in the corner. |
| Tones | Values are navy; only *signed* numbers get `text-good`/`text-bad` (e.g. house net). The System tile uses ✓ `text-good` / ! `text-bad` + words. |
| Tiles (in order) | Members (+new) → Users · Active (live bettors) · Credits outstanding (pending stake) → Ledger · Purchases HK$ (count, cap hits) → Purchases · Live bets (pending) → Bets?status=pending · Stake (credits) · Payout + net · System → System. |
| Range | `seg`/`segBtn` 今日 / 7 日 / 30 日 (HK calendar days). Members/outstanding ignore the range (they're "now"); their labels say 現時. |
| Attention banner | `noticeBanner` only when there are held bets, reconcile mismatches, the kill switch is on, or the webhook is silent > 24 h on live Stripe. Each item is a link; "查看" `btnPill`. |
| Freshness | "更新於 13:02" 13px `ink-muted` + refresh `size-11` icon button. Auto-refresh every 60 s while visible; announced only if the held count changes. |
| Loading / error | Tiles skeleton (bars); per-tile error shows "–" + `title` with the error, and a single `errorBox` above the grid. |

---

## 5. Users

**List `/admin/users`** — columns: Name (link) · Phone (masked) · Role · Balance (積分) ▾ · Pending · Live bets · Joined ▾ · Last active ▾ · Status (Flagged chip or –).
Filters: search (name / phone / ID), Role, Status (flagged / not), Has purchases, Joined range. Default sort Joined desc.
Phone card: name + role · phone + joined · balance + pending + flag.

**Detail `/admin/users/:id`**

```
Desktop (content area)
│ 陳大文  [用戶]  [已標記]                                   ID 3f9a1c2e ⧉ │  h1 + chips
│ ┌──────────────────────────────────────────┐ ┌ 擁有人操作 ─────────────┐ │
│ │ 個人資料                                  │ │ 積分結餘                 │ │  right column w-[320px], sticky
│ │ (陳) 陳大文 · 加入 2026-10-03 · 最後活躍 …  │ │ 2,450 積分               │ │
│ │ 簡介 …                                    │ │ [ 調整積分… ]            │ │  btn
│ ├──────────────────────────────────────────┤ │──────────────────────────│ │
│ │ 聯絡資料                [👁 顯示聯絡資料]   │ │ 角色：用戶               │ │
│ │ 登入電話  +852 9123 ••78                  │ │ [ 更改角色… ]            │ │  btn
│ │ WhatsApp  與登入號碼相同                   │ │──────────────────────────│ │
│ │ 電郵      t•••@example.com                │ │ 帳戶狀態：已標記          │ │
│ │ Telegram  @to•••                          │ │ 原因：信用卡爭議（Stripe）│ │
│ └──────────────────────────────────────────┘ │ [ 取消標記… ]            │ │  btn (flag = btnDanger)
│ [積分紀錄] [投注] [購買] [審計]   ← pill tabs  │                          │ │
│ ┌ table for the selected tab, 25 rows ┐      │ 所有操作均需填寫原因，並會 │ │  13px ink-muted
│ └─────────────────────────────────────┘      │ 記錄在審計紀錄。          │ │
│                                               └──────────────────────────┘ │
```

- Layout `lg:grid lg:grid-cols-[minmax(0,1fr)_320px] gap-4`. Phone: the action panel comes **first** under the heading (as a
  `sectionHead`+`sectionBody` card), then profile, contact, tabs.
- Action panel [new] `ownerPanel`: `sectionHead` `admin:user.ownerActions` + body of 3 blocks divided by `border-line`, each a
  label 13px `ink-muted`, a value 15/500, and one `btn` (flag uses `btnDanger`). Buttons end with "…" because they open a dialog.
- **Admin view:** the same card titled `admin:user.status`, showing balance/role/flag values, and instead of buttons the line
  `admin:readOnly`.
- **Owner's own row / other admins:** the role block for the owner reads "擁有人（於伺服器設定）" with no button.
- Tabs: `pill` row (`role="tablist"`, arrow-key navigation), URL `?tab=ledger|bets|purchases|audit`. Ledger columns: Time ·
  Kind · Detail · Amount · Balance after · Actor. Bets: Placed · Meeting · Mode · Bet · Stake · Status · Payout. Purchases: Time ·
  Plan · HK$ · Credits · Status · Stripe session (last 4). Audit: this user as target.

---

## 6. Bets, ledger, purchases

- **Bets `/admin/bets`** — Filters: Mode (即場 / 模擬 / 全部), Status (pending / held / won / lost / void), Meeting (select:
  date + venue), Race, Bet type, User search, Placed range. Columns: Placed · User · Meeting/race · Mode · Bet · Picks (truncate,
  `title` full) · Stake · Status · Payout. Practice bets show `$` stake (play money); live bets show credits — the Mode badge sits next to it.
  - **Meeting context bar [new]** when the Meeting filter is set: a `bg-sky-150 text-navy-900` strip above the table:
    "10月5日 沙田 · 待派彩 34 注 · 2,340 積分" + owner `btnDanger` "作廢此場…" (race filter set) or "作廢整個賽馬日…".
- **Credits ledger `/admin/ledger`** — Filters: Kind (signup_bonus, purchase, bet_stake, bet_payout, bet_refund,
  purchase_reversal, admin_adjust), Actor (system / stripe / owner), User, range. Columns: Time · User · Kind (label) · Amount ·
  Balance after · Ref (link to bet/purchase) · Actor · Note. A footer `totalRow` shows Σ for the current filter.
- **Purchases `/admin/purchases`** — Filters: Status, range, User. Columns: Created · User · Plan · HK$ · Credits · Status ·
  Paid at · Session (`••••a1b2`, never the full id) · Payment intent link (opens Stripe dashboard in a new tab, owner only).
  Footer: Σ HK$ paid. A refunded/disputed row links to its `purchase_reversal` ledger row.

---

## 7. Held live-bets queue (`/admin/held`)

Cards, not a table: each needs context to decide.

```
│ 暫緩結算  3 注                                    排序 [最舊優先 ▾]   │
│ ┌──────────────────────────────────────────────────────────────────┐ │
│ │ [暫緩] 缺少派彩資料 · 已暫緩 2 小時 14 分 · 嘗試 3 次                │ │  hold reason + age (age > 24 h → text-bad)
│ │ 單T · 10月5日 沙田 第8場 · 陳大文 · 每注 10 × 4 = 40 積分          │ │
│ │ 選擇：3, 7, 9, 11        賽果：7 - 3 - 11（已確認）                 │ │
│ │ 系統計算：命中 1 組，派彩資料缺失                                   │ │  13px ink-muted
│ │ [ 重新結算… ]  [ 輸入派彩… ]                    [ 作廢並退回… ]     │ │  btn · btn · btnDanger
│ └──────────────────────────────────────────────────────────────────┘ │
│ ┌ … next card …                                                     │ │
```

- Card: `panel` with `ring-1 ring-bad/30` (attention without a red fill). Hold reasons: `missing_dividend`, `dead_heat_ambiguous`,
  `settle_failed`, `no_results_24h` → copy `admin:held.reason.*`.
- Admin view: same cards without the action row, plus `admin:readOnly` once at the top.
- **重新結算 (Settle)**: dialog shows the engine's outcome preview ("命中 · 派彩 1,700 積分" or "未中") → gold "確認結算".
- **輸入派彩 (Dividend)**: dialog with `control` "每 $10 派彩 (HK$)" `inputMode="decimal"`, live preview "派彩 = 4 注中 1 注 ×
  (派彩/10) × 每注 10 = 425 積分", reason → gold "以此派彩結算".
- **作廢並退回 (Void)**: summary "退回 40 積分給陳大文" → `btnDanger` "作廢並退回".
- After the action, the card collapses (150 ms, motion-safe) and focus moves to the next card's heading; toast. Empty: `admin:held.empty` ("沒有暫緩結算的投注 ✓").

---

## 8. Owner write dialogs — one pattern

`modalBg` + `modalNarrow` widened `sm:w-[480px]`, `role="dialog"` (`alertdialog` for destructive), `aria-labelledby`, `aria-describedby` → summary.

```
┌────────────────────────────────────────────────┐
│ <Verb> <object>                              ✕ │  17/500 navy-900
│ ┌────────────────────────────────────────────┐ │
│ │ 用戶       陳大文 (ID 3f9a1c2e)             │ │  summary: bg-sky-150 rounded-card px-[13px] py-2
│ │ 積分結餘   2,450 → 2,950                    │ │  "before → after", after in font-medium
│ └────────────────────────────────────────────┘ │
│ … action-specific fields …                     │
│ 原因 *                                  12/200 │  required, min 10 chars
│ [ textarea, 3 rows                          ]  │
│ 此操作會記錄在審計紀錄，並不能刪除。            │  13px ink-muted
│ [ 取消 ]                       ( 確認動作 )     │  btn  ·  btnPrimary OR btnDanger
└────────────────────────────────────────────────┘
```

Rules:
1. Exactly **one** action button. Gold `btnPrimary` for non-destructive (add credits, unflag, settle, promote, export masked). `btnDanger`
   for destructive (deduct, flag, demote, void bet/race/meeting, export unmasked). The label repeats the verb + amount ("扣除 500 積分").
2. Initial focus: the first field (or Cancel when there are no fields). Esc / ✕ close only when nothing is typed; with input, a
   scrim tap is ignored.
3. The action button stays disabled until required fields are valid. Reason: 10–200 chars, `Counter` from members/ui.
4. **OTP step** (A10): the action button reads "下一步：驗證身份"; step 2 replaces the body with the membership OTP input (code
   sent to the owner's phone, auto-submit at 6 digits), then performs the write. The title stays, and step 1's input is kept on Back.
5. Submitting: spinner + `admin:dialog.working`; fields `readOnly`; close disabled.
6. Errors: `errorBox role="alert"` at the top of the body, keeping the input (`admin:err.conflict` when the balance changed meanwhile —
   the summary refreshes so the owner re-confirms).
7. Success: dialog closes, focus returns to the opener, toast `admin:toast.done` with the audit id, data refetches.

### Credit adjust dialog

```
┌────────────────────────────────────────────────┐
│ 調整積分                                      ✕ │
│ [ 增加 | 扣除 ]                                  │  seg / segBtn
│ 數量（積分）*                                    │
│ [ 500                ]                          │  control, inputMode numeric, 1–100,000
│ ┌────────────────────────────────────────────┐ │
│ │ 用戶       陳大文                           │ │
│ │ 積分結餘   2,450 → 1,950                    │ │  after < 0 → text-bad + error, button disabled
│ └────────────────────────────────────────────┘ │
│ 類別 *  [ 補償 ▾ ]                              │  select: 補償 / 更正 / 測試 / 其他
│ 原因 *                                  0/200   │
│ [                                           ]  │
│ 1,000 積分或以上需要短訊驗證。                  │  13px ink-muted (only when ≥ 1,000)
│ [ 取消 ]                      ( 扣除 500 積分 ) │  btnDanger for deduct; btnPrimary "增加 500 積分" for add
└────────────────────────────────────────────────┘
```

Writes an `admin_adjust` ledger row (never used for Stripe refunds — the dialog notes "Stripe 退款會自動處理" as helper text).

### Role change dialog

```
┌────────────────────────────────────────────────┐
│ 更改角色                                      ✕ │
│ ┌────────────────────────────────────────────┐ │
│ │ 用戶   陳大文 (+852 9123 ••78)              │ │
│ │ 角色   用戶 → 管理員                         │ │
│ └────────────────────────────────────────────┘ │
│ 管理員可以查看所有會員資料（聯絡資料會遮蔽）、    │  15px ink: consequence, always shown
│ 投注及購買紀錄，但不能作出任何更改。              │
│ 原因 *                                  0/200   │
│ [                                           ]  │
│ 需要短訊驗證。                                  │
│ [ 取消 ]                   ( 下一步：驗證身份 ) │  gold (promote) / btnDanger (demote)
└────────────────────────────────────────────────┘
```
Demote copy: "此用戶會即時失去管理後台的存取權限。" The demoted admin's open session gets the not-authorised page on its next request.

### Other owner writes (same pattern)
| Action | Summary rows | Button | OTP |
|---|---|---|---|
| Flag | user · state 正常 → 已標記 · effect "不能購買積分或即場投注" | `btnDanger` 標記帳戶 | no |
| Unflag | user · state 已標記 → 正常 · original flag reason | gold 取消標記 | no |
| Void race / meeting | meeting/race · pending bets N · credits refunded Σ · users affected | `btnDanger` 作廢並退回 N 注 | yes |
| Export CSV | table · current filters · rows N · checkbox "包括完整聯絡資料" (unchecked by default) | gold 匯出 (masked) / `btnDanger` 匯出完整資料 | only when unmasked |

---

## 9. Audit log (`/admin/audit`)

```
│ 審計紀錄                                                                    │
│ [🔍 搜尋目標 ID / 原因] [操作者 ▾] [動作 ▾] [日期 ▾]                          │
│ 時間 ▾               操作者          動作          目標          原因          │
│ 2026-10-04 13:02:45  陳生 [擁有人]   調整積分      陳大文 3f9a…  補償：派彩延誤  ▸ │
│   └ 展開： 積分結餘  2,450 → 2,950 · ledger #8812 · 短訊驗證 ✓ · IP 203.0.113.•  │  sky-50 detail row
│ 2026-10-04 12:40:10  陳生 [擁有人]   顯示聯絡資料  陳大文 3f9a…  –             ▸ │
│ 2026-10-04 11:15:00  李小姐 [管理員] 匯出 CSV ✕ 拒絕 …                        ▸ │
```

- Columns: Time (seconds, desc default) · Actor (name + `roleBadge`; "系統"/"CLI" for non-UI actors) · Action (`admin:audit.action.*`
  label, destructive ones with a small `text-bad` ● dot + word) · Target (link) · Reason (truncate 40ch) · expand ▸.
- Expand: a `<button aria-expanded aria-controls>` in the last cell; the detail row (`bg-sky-50`, `colspan` all) lists the diff as
  `key  before → after` lines (13px, `tabular-nums`, removed values `line-through text-ink-muted`), plus ledger/bet refs, OTP used,
  masked IP, and user agent. Raw JSON behind a `text-link` "顯示原始資料" (`<pre class="code">`).
- Read-only for everyone. Has no delete or edit. Denied attempts (e.g. an admin calling a write API) are logged with an `✕ 拒絕` tag.
- Phone card: time + actor badge / action + target / reason; tap ▸ expands inline.

---

## 10. System status (`/admin/system`)

`grid2` of section cards (`sectionHead` + `sectionBody`), each row `min-h-11 flex justify-between border-b border-line px-[13px]`:
label 15px · value with a status mark.

| Card | Rows |
|---|---|
| 功能開關 Feature flags | `FUTURE_BETTING` (即場投注及購買) · `DATA_FETCH` · daily cap `PURCHASE_DAILY_CAP_HKD` · `LIVE_MAX_STAKE` · signup bonus. Read-only; footer 13px "於伺服器 .env 更改並重新啟動". |
| Stripe | Mode 測試/正式 · `STRIPE_LIVE_APPROVED` · webhook secret set ✓ (never the value) · last webhook received (time) · last checkout (time). |
| 排程 Jobs | Last racecard fetch · last results fetch · last settle sweep · next sweep · pending older than 2 h (count). Stale (> 2× interval) → bad. |
| 對賬 Reconcile | Last run time, result "全部相符" ✓ or "N 項差異" ! with a `text-link` to details (list of user/bet ids). `btn` "立即對賬" (admin + owner: it's a read-only check; rate-limited to 1/min; spinner while running). |

Status mark [new] `statusMark(ok)`: ✓ `text-good` + "正常" / ! `text-bad` + "異常" / – `text-ink-muted` + "未啟用". Always icon + word.
Kill switch off (`FUTURE_BETTING=0`) also shows the credits `noticeBanner` at the top of this page and the dashboard.

---

## 11. Access, session, toasts, accessibility

### Not authorised (signed-in user, role = user)
No admin chrome (don't reveal the nav). Centred on `canvas`:
```
┌──────────────────────────────────────┐
│            [logo 48]                 │
│   你沒有權限存取管理後台               │  17/500 navy-900
│   已登入：陳大文（+852 ••••••78）      │  13px ink-muted
│   如需存取權限，請聯絡網站擁有人。      │
│   (   返回開跑前   )   登出            │  btnPrimary · text-link
└──────────────────────────────────────┘   panel, max-w-[400px], text-center
```
HTTP 403, `<title>[Admin] 沒有權限`. The same page is used when a role is revoked mid-session.

### Guest
A minimal centred panel "管理後台登入" + the existing **LoginModal opened automatically** (source `admin`). After login → role
check → dashboard or not-authorised. Closing the modal leaves the panel with a gold 登入 button.

### Session expiry
- Admin sessions: idle timeout (Eng to set; assumed 30 min). At **2 min left**: `modalNarrow role="alertdialog"` "閒置時間過長"
  with countdown (announced at start and at 30 s) · `btn` 登出 · gold 繼續使用.
- Expired: the same dialog switches to "登入已過期" + gold 重新登入 (opens LoginModal over it via `modalBgTop`). Any open write
  dialog stays mounted underneath with its input; after re-login the owner presses the action again (it is never auto-submitted).
- A 401 from any request triggers the expired state.

### Toasts
Membership `Toast` (navy-900, `role="status"`), bottom-centre on phones, **bottom-right** on desktop (`lg:left-auto lg:right-6 lg:translate-x-0`)
so it doesn't cover table centres. 4 s for write results (they include an audit id), 3 s for "copied". Errors never use toasts
(they go in `errorBox` where the action happened).

### Accessibility
- Real `<table>` with `<caption class="sr-only">` (name + filter summary + range), `<th scope="col">`, `aria-sort` on sortable
  headers only, sort buttons inside `th`. Row-header cell `<th scope="row">` for the name/ID column.
- Live regions: one `aria-live="polite"` per table announcing "已載入 50 項，按積分結餘由高至低排序" after a fetch; the held
  count in the nav; reveal countdown only at start and end.
- Keyboard: skip link "跳到主要內容" first; sidebar in tab order before content; `/` focuses the table search; dialogs trap focus and
  return it to the opener; tab rows use arrow keys; expand buttons toggle with Enter/Space.
- Focus visible: global navy outline; on navy sidebar use `focus-visible:outline-white`.
- Targets ≥ 44×44: nav items, ☰, sort buttons (with `th` padding the hit area is 44px tall), copy/expand icons (`size-11` hit area
  around 16px icons), pagination buttons.
- Never colour alone: status chips, role badges, status marks, signed amounts, destructive dots all carry words or signs.
- Contrast: `ink-strong` on `gold` ≥ 13:1; white on `navy-900`/`navy-700` ≥ 9:1; `text-bad` on `surface` ≥ 6:1; `text-white/75` on
  `navy-900` ≥ 7:1.
- `prefers-reduced-motion`: no sheet slide, no pulse, no card collapse.

---

## 12. Copy (namespace `admin`)

| Key | en | zh-HK |
|---|---|---|
| brand | Admin | 管理後台 |
| role.owner | Owner | 擁有人 |
| role.admin | Admin · read-only | 管理員 · 唯讀 |
| role.adminShort | Admin | 管理員 |
| role.user | User | 用戶 |
| role.ownerFixed | Owner (set in server config) | 擁有人（於伺服器設定） |
| stripe.test | Stripe test | Stripe 測試 |
| stripe.live | Stripe live | Stripe 正式 |
| nav.dashboard | Dashboard | 總覽 |
| nav.users | Users | 用戶 |
| nav.bets | Bets | 投注 |
| nav.held | Held bets | 暫緩結算 |
| nav.heldAria | Held bets, {{n}} to resolve | 暫緩結算，{{n}} 項待處理 |
| nav.ledger | Credits ledger | 積分紀錄 |
| nav.purchases | Purchases | 購買紀錄 |
| nav.audit | Audit log | 審計紀錄 |
| nav.system | System | 系統狀態 |
| nav.backToApp | Back to Post Time | 返回開跑前 |
| nav.open | Open admin menu | 開啟管理選單 |
| nav.skip | Skip to main content | 跳到主要內容 |
| readOnly | Only the owner can make changes. | 只有擁有人可以作出更改。 |
| table.search | Search name, phone or ID | 搜尋姓名、電話或 ID |
| table.filters | Filters ({{n}}) | 篩選（{{n}}） |
| table.clear | Clear filters | 清除篩選 |
| table.removeFilter | Remove filter: {{label}} | 移除篩選：{{label}} |
| table.sortBy | Sort by | 排序方式 |
| table.range | {{from}}–{{to}} of {{total}} | 第 {{from}}–{{to}} 項，共 {{total}} 項 |
| table.rangeApprox | {{from}}–{{to}} of about {{total}} | 第 {{from}}–{{to}} 項，共約 {{total}} 項 |
| table.pageSize | Per page | 每頁 |
| table.prev | Previous | 上一頁 |
| table.next | Next | 下一頁 |
| table.empty | Nothing here yet. | 暫無資料。 |
| table.noMatch | No results match these filters. | 沒有符合篩選條件的結果。 |
| table.loaded | Loaded {{n}} rows, sorted by {{col}} {{dir}} | 已載入 {{n}} 項，按{{col}}{{dir}}排序 |
| table.asc | ascending | 由低至高 |
| table.desc | descending | 由高至低 |
| table.export | Export CSV | 匯出 CSV |
| table.copyId | Copy ID | 複製 ID |
| err.load | Couldn't load this data. | 未能載入資料。 |
| err.retry | Retry | 重試 |
| err.conflict | This record changed while you were editing. Check the summary and confirm again. | 資料在你編輯期間已更改，請檢查摘要後再確認。 |
| err.network | Can't connect. Nothing was changed. | 未能連線，未有作出任何更改。 |
| err.forbidden | You no longer have permission for this action. | 你已沒有權限執行此操作。 |
| range.today | Today | 今日 |
| range.7d | 7 days | 7 日 |
| range.30d | 30 days | 30 日 |
| range.custom | Custom | 自訂 |
| dash.updated | Updated {{time}} | 更新於 {{time}} |
| dash.refresh | Refresh | 重新整理 |
| dash.members | Members | 會員 |
| dash.membersNew | +{{n}} today | 今日 +{{n}} |
| dash.active | Active | 活躍 |
| dash.activeLive | {{n}} betting live | 即場 {{n}} |
| dash.outstanding | Credits outstanding | 流通積分 |
| dash.outstandingPending | {{n}} in pending bets | 待派彩 {{n}} |
| dash.purchases | Purchases | 購買 |
| dash.purchasesSub | {{count}} orders · {{cap}} hit the cap | {{count}} 宗 · {{cap}} 達上限 |
| dash.liveBets | Live bets | 即場投注 |
| dash.stake | Stake (credits) | 投注額（積分） |
| dash.payout | Payout | 派彩 |
| dash.net | Net {{n}} | 淨 {{n}} |
| dash.system | System | 系統 |
| dash.now | now | 現時 |
| dash.attentionHeld | {{n}} held bets need action | {{n}} 注暫緩結算需要處理 |
| dash.attentionReconcile | Reconcile found {{n}} mismatches | 對賬發現 {{n}} 項差異 |
| dash.attentionWebhook | No Stripe webhook for {{h}} hours | Stripe webhook 已 {{h}} 小時沒有回應 |
| dash.view | View | 查看 |
| dash.recentPurchases | Recent purchases | 最近購買 |
| dash.recentAudit | Recent actions | 最近操作 |
| user.ownerActions | Owner actions | 擁有人操作 |
| user.status | Account status | 帳戶狀態 |
| user.balance | Credit balance | 積分結餘 |
| user.role | Role | 角色 |
| user.flag | Account | 帳戶狀態 |
| user.flagged | Flagged | 已標記 |
| user.normal | Normal | 正常 |
| user.flagReason | Reason: {{reason}} | 原因：{{reason}} |
| user.adjust | Adjust credits… | 調整積分… |
| user.changeRole | Change role… | 更改角色… |
| user.flagBtn | Flag account… | 標記帳戶… |
| user.unflagBtn | Unflag… | 取消標記… |
| user.auditNote | Every action needs a reason and is recorded in the audit log. | 所有操作均需填寫原因，並會記錄在審計紀錄。 |
| user.tab.ledger | Ledger | 積分紀錄 |
| user.tab.bets | Bets | 投注 |
| user.tab.purchases | Purchases | 購買 |
| user.tab.audit | Audit | 審計 |
| mask.reveal | Show contact details | 顯示聯絡資料 |
| mask.revealConfirm | This will be recorded in the audit log. | 此操作會記錄在審計紀錄。 |
| mask.show | Show | 顯示 |
| mask.hidesIn | Hides in {{s}}s | {{s}} 秒後隱藏 |
| mask.hideNow | Hide now | 立即隱藏 |
| mask.phoneAria | Phone hidden, ending {{last2}} | 已遮蔽電話，尾數 {{last2}} |
| bets.voidRace | Void this race… | 作廢此場… |
| bets.voidMeeting | Void whole meeting… | 作廢整個賽馬日… |
| bets.context | {{meeting}} · {{n}} pending · {{credits}} credits | {{meeting}} · 待派彩 {{n}} 注 · {{credits}} 積分 |
| status.held | Held | 暫緩 |
| status.paid | Paid | 已付款 |
| status.open | Open | 處理中 |
| status.expired | Expired | 已過期 |
| status.refunded | Refunded | 已退款 |
| status.disputed | Disputed | 爭議中 |
| held.title | Held bets | 暫緩結算 |
| held.age | Held {{time}} · {{n}} attempts | 已暫緩 {{time}} · 嘗試 {{n}} 次 |
| held.reason.missing_dividend | Dividend missing | 缺少派彩資料 |
| held.reason.dead_heat_ambiguous | Dead heat — dividend unclear | 平頭馬，派彩不明確 |
| held.reason.settle_failed | Settlement failed 5 times | 結算失敗 5 次 |
| held.reason.no_results_24h | No results 24 h after post time | 開跑後 24 小時仍未有賽果 |
| held.settle | Re-settle… | 重新結算… |
| held.dividend | Enter dividend… | 輸入派彩… |
| held.void | Void and refund… | 作廢並退回… |
| held.dividendLabel | Dividend per $10 (HK$) | 每 $10 派彩（HK$） |
| held.empty | No held bets. | 沒有暫緩結算的投注。 |
| dialog.reason | Reason | 原因 |
| dialog.category | Category | 類別 |
| dialog.cat.goodwill | Goodwill | 補償 |
| dialog.cat.correction | Correction | 更正 |
| dialog.cat.test | Test | 測試 |
| dialog.cat.other | Other | 其他 |
| dialog.reasonMin | Enter at least 10 characters. | 請輸入最少 10 個字。 |
| dialog.auditNote | This is recorded in the audit log and can't be deleted. | 此操作會記錄在審計紀錄，並不能刪除。 |
| dialog.cancel | Cancel | 取消 |
| dialog.next | Next: verify it's you | 下一步：驗證身份 |
| dialog.otpNeeded | SMS verification required. | 需要短訊驗證。 |
| dialog.otpNeededAdjust | 1,000 credits or more needs SMS verification. | 1,000 積分或以上需要短訊驗證。 |
| dialog.working | Applying… | 處理中… |
| adjust.title | Adjust credits | 調整積分 |
| adjust.add | Add | 增加 |
| adjust.deduct | Deduct | 扣除 |
| adjust.amount | Amount (credits) | 數量（積分） |
| adjust.addBtn | Add {{n}} credits | 增加 {{n}} 積分 |
| adjust.deductBtn | Deduct {{n}} credits | 扣除 {{n}} 積分 |
| adjust.belowZero | Balance can't go below 0. | 結餘不可低於 0。 |
| adjust.stripeNote | Stripe refunds and disputes are handled automatically — don't adjust for them. | Stripe 退款及爭議會自動處理，毋須手動調整。 |
| role.title | Change role | 更改角色 |
| role.promoteBody | Admins can view all member data (contact details masked), bets and purchases, but can't change anything. | 管理員可以查看所有會員資料（聯絡資料會遮蔽）、投注及購買紀錄，但不能作出任何更改。 |
| role.demoteBody | This user will lose access to the admin panel immediately. | 此用戶會即時失去管理後台的存取權限。 |
| role.promoteBtn | Make admin | 設為管理員 |
| role.demoteBtn | Remove admin | 取消管理員 |
| flag.title | Flag account | 標記帳戶 |
| flag.effect | Can't buy credits or place live bets. | 不能購買積分或即場投注。 |
| flag.btn | Flag account | 標記帳戶 |
| unflag.title | Unflag account | 取消標記 |
| unflag.btn | Unflag | 取消標記 |
| void.raceTitle | Void race {{n}} | 作廢第{{n}}場 |
| void.meetingTitle | Void meeting {{meeting}} | 作廢 {{meeting}} 賽馬日 |
| void.btn | Void and refund {{n}} bets | 作廢並退回 {{n}} 注 |
| settle.btn | Confirm settlement | 確認結算 |
| settle.dividendBtn | Settle with this dividend | 以此派彩結算 |
| export.title | Export CSV | 匯出 CSV |
| export.rows | {{n}} rows with current filters | 按目前篩選共 {{n}} 項 |
| export.unmasked | Include full contact details | 包括完整聯絡資料 |
| export.btn | Export | 匯出 |
| export.btnUnmasked | Export full data | 匯出完整資料 |
| toast.done | Done · audit #{{id}} | 已完成 · 審計 #{{id}} |
| toast.copied | Copied | 已複製 |
| toast.exported | CSV downloaded · audit #{{id}} | 已下載 CSV · 審計 #{{id}} |
| audit.title | Audit log | 審計紀錄 |
| audit.col.time | Time | 時間 |
| audit.col.actor | Actor | 操作者 |
| audit.col.action | Action | 動作 |
| audit.col.target | Target | 目標 |
| audit.col.reason | Reason | 原因 |
| audit.expand | Show details | 顯示詳情 |
| audit.raw | Show raw data | 顯示原始資料 |
| audit.denied | Denied | 拒絕 |
| audit.system | System | 系統 |
| audit.action.credit_adjust | Adjusted credits | 調整積分 |
| audit.action.role_change | Changed role | 更改角色 |
| audit.action.flag | Flagged account | 標記帳戶 |
| audit.action.unflag | Unflagged account | 取消標記 |
| audit.action.bet_resolve | Resolved held bet | 處理暫緩投注 |
| audit.action.void_race | Voided race | 作廢賽事 |
| audit.action.void_meeting | Voided meeting | 作廢賽馬日 |
| audit.action.export | Exported CSV | 匯出 CSV |
| audit.action.contact_reveal | Viewed contact details | 顯示聯絡資料 |
| audit.action.reconcile | Ran reconcile | 執行對賬 |
| sys.flags | Feature flags | 功能開關 |
| sys.flagsNote | Change in the server .env and restart. | 於伺服器 .env 更改並重新啟動。 |
| sys.jobs | Jobs | 排程 |
| sys.reconcile | Reconcile | 對賬 |
| sys.reconcileNow | Run reconcile now | 立即對賬 |
| sys.allMatch | All balances match | 全部相符 |
| sys.mismatches | {{n}} mismatches | {{n}} 項差異 |
| sys.ok | OK | 正常 |
| sys.problem | Problem | 異常 |
| sys.off | Off | 未啟用 |
| denied.title | You don't have access to the admin panel | 你沒有權限存取管理後台 |
| denied.signedIn | Signed in as {{name}} ({{phone}}) | 已登入：{{name}}（{{phone}}） |
| denied.help | Ask the site owner if you need access. | 如需存取權限，請聯絡網站擁有人。 |
| denied.back | Back to Post Time | 返回開跑前 |
| denied.logout | Log out | 登出 |
| guest.title | Admin login | 管理後台登入 |
| guest.login | Log in | 登入 |
| session.idleTitle | Still there? | 閒置時間過長 |
| session.idleBody | You'll be logged out in {{time}}. | {{time}} 後會自動登出。 |
| session.stay | Stay logged in | 繼續使用 |
| session.expiredTitle | Session expired | 登入已過期 |
| session.expiredBody | Log in again to continue. Anything you typed is kept. | 請重新登入以繼續，已輸入的內容會保留。 |
| session.relogin | Log in again | 重新登入 |

---

## 13. Open questions (PM / Eng)

1. Admin idle timeout (30 min assumed) and OTP step-up window (10 min assumed).
2. Adjust OTP threshold (1,000 credits assumed) and the maximum per adjustment (100,000 assumed).
3. Should admins be able to run reconcile (assumed yes — read-only check), and should reveal be allowed for admins at all (assumed no)?
4. PRD §3.7 says "CLI, no admin panel" — this spec supersedes it for read views and owner writes; CLI and panel must write the same `admin_audit` rows.
5. Server must serve the SPA for `/admin/*` with `X-Robots-Tag: noindex` and return 403 data (not the shell) for non-staff API calls.
