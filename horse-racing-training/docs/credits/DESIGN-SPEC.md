# Credits & Live Betting — Design Spec

Status: draft v1 (Designer) · 2026-10-03 · Scope: Practice vs Live mode, credits balance, buying credits
(Stripe Checkout), live bet slip, pending/settled live bets, welcome bonus, safeguards.

Builds on [DESIGN.md](../../DESIGN.md) and [membership spec](../membership/DESIGN-SPEC.md) (toast, `modalNarrow`
dialogs, sky guest panels, account menu, `?tab=` utility pages). Only DESIGN.md tokens and `src/kit.tsx`
classes are used; anything not in the kit yet is built from tokens and marked **[new]** (add to `kit.tsx`).
i18n: new namespace `credits` (§9). zh-HK is the default. Phone (360–430) first, desktop = `lg` (≥1024).

---

## 0. Decisions at a glance

| # | Decision | Why |
|---|---|---|
| D1 | **Mode is a property of the meeting, not a switch.** Upcoming meeting = Live, past meeting = Practice. The meeting `<select>` gets two `<optgroup>`s; there is no separate mode toggle. | One control, no impossible states (a "Live" toggle on a past meeting). Mirrors the real thing: you bet on today's card. |
| D2 | **Units are the main cue.** Practice keeps `$`. Live shows `積分 / credits` everywhere money appears (stake input, totals, slip, history). | Units are read on every number; colour alone is not enough (a11y) and gold is scarce. |
| D3 | **Mode badge [new]** sits in every navy bar where betting happens (pool header, slip header, phone slip bar, history rows). Practice = quiet outline; Live = **gold fill** + dot. | Gold fill on a non-interactive 20px badge reads as a status, not a CTA (it has no button shape, it's on navy, 11–13px). Practice keeps the existing navy look, so Live is the thing that stands out. |
| D4 | The header's old gold "模擬 / Practice" badge is **removed**. Its slot becomes the **credits chip** (members only). | The app is no longer practice-only; the badge would lie on a live meeting. Mode lives with the meeting (D1/D3). |
| D5 | Credits live on a page, `?tab=credits` (in `VIEWS`, not `TABS`), not a sheet. Reached from the header chip and a new account-menu item. | Stripe Checkout redirects out and back — the return needs a URL that survives a full reload. A page also holds the ledger. |
| D6 | **No auto-confirm in Live.** The 5 s countdown stays for Practice only. Live confirm needs a tap. | Live spends credits and can't be cancelled; auto-spending on a timer is a dark pattern. Same component, `autoConfirm={false}`. |
| D7 | Plan cards are a **radio group + one gold Buy** button. Default selection = smallest plan (HK$10). | One gold CTA per view (§11). Pre-selecting the cheapest is the responsible default; "Best value" tag still highlights HK$300. |
| D8 | Ledger: **credits in `text-good` with `+`, debits in `text-ink` with `−`**. `text-bad` is never used for a stake. | `bad` means loss/miss (DESIGN.md §2). A stake isn't a loss; the loss shows on the bet in History. |
| D9 | One **18+ declaration** per account covers both purchase and live betting, asked at whichever comes first: inline checkbox on the Buy page, dialog at first live Place bet. | Asked once, in context, never twice. |
| D10 | Kill switch uses the DESIGN.md **gold notice banner** (system notice). Upcoming meetings stay listed but disabled. | It is exactly what the notice banner is for; listing them explains *why* there's nothing to bet on. |
| D11 | Term: **積分** for credits (en "credits"). Status: **待派彩 / 已派彩 / 未中 / 已退回**. Live = **即場**, Practice = **模擬** (existing). | 積分 is the standard HK term for points with no cash value (avoids 代幣/籌碼 casino tone and 信用額 "credit line"). 待派彩/已派彩 are HKJC's own terms. 已退回 avoids "退款" next to "non-refundable". |

---

## 1. Mode clarity on the bet page

### 1a. Mode badge [new] `modeBadge(mode, on: "navy" | "white")`

| Mode | On navy bar | On white |
|---|---|---|
| Practice | `inline-flex h-5 items-center rounded-full px-2 text-[11px] font-medium ring-1 ring-white/50 text-white` | `bg-sky-100 text-navy-900` (no ring) |
| Live | `inline-flex h-5 items-center gap-1 rounded-full bg-gold px-2 text-[11px] font-medium text-ink-strong` + 6px dot `size-1.5 rounded-full bg-ink-strong` | same |

13px on desktop (`lg:text-[13px] lg:h-6`). Label `credits:mode.practice` / `credits:mode.live`. It's a `<span>`,
never a button. Screen readers get it inline in the heading ("獨贏/位置，即場").

### 1b. Meeting picker

Native `<select>` (existing `meetingSelect`) with optgroups. Upcoming first.

```
┌ 即場（將舉行） ─────────────────────────┐   optgroup credits:picker.live
│ 10月5日 · 沙田 · 10 場                   │
│ 10月8日 · 跑馬地 · 9 場                  │
├ 模擬（已完賽） ─────────────────────────┤   optgroup credits:picker.practice
│ 10月1日 · 跑馬地 · 9 場                  │
│ 9月28日 · 沙田 · 11 場                   │
└─────────────────────────────────────────┘
```

- An upcoming meeting with all races closed but no results yet stays under Live with suffix `credits:picker.awaitingResults`.
- Kill switch: Live group label becomes `credits:picker.livePaused`, its options `disabled`.
- No upcoming meetings: Live group omitted; under the picker, 13px `ink-muted` line `credits:picker.noUpcoming`.
- **Default meeting:** member + live enabled → next upcoming meeting; guest or kill switch → newest past meeting (today's behaviour). Last choice is remembered per device (localStorage, try/catch).

### 1c. Pool header bar (navy-700, existing)

`[pool name] [mode badge] · [date · venue · N races]`. Live adds a **status line** below the chip row
(inside the white part of the same card, `px-[13px] pb-2.5 text-[13px]`):

| State | Copy | Style |
|---|---|---|
| Next race > 60 min | `credits:race.nextAt` "Next: Race 1 · post time 13:00" | `text-ink` |
| Next race ≤ 60 min | `credits:race.closesIn` "Race 3 closes in 12:34" | `text-navy-900 font-medium tabular-nums` |
| All closed | `credits:race.allClosed` | `text-ink-muted` |

Countdown ticks every second visually; `aria-live="polite"` region announces only at 10 min, 1 min and closed.
Clock is server time (offset computed on load); the client never decides "closed" alone (see §3 errors).

### 1d. Race chips in Live

- **Open:** `chipBtn` as today.
- **Closed:** `chipBtn(false)` + `opacity-40`, number kept, a 12px lock glyph in a 14px `bg-surface ring-1 ring-line rounded-full`
  dot at top-right (`absolute -top-1 -right-1`). `aria-label` = `credits:race.chipClosed` ("Race 1, closed").
  The chip stays **focusable/selectable** so the card and odds can be viewed; when a closed race is shown, the
  racecard checkboxes are `disabled` and the racecard header gets a `pill`-sized `bg-white/15 text-white` tag
  `credits:race.closed` with lock. (Deviation from "fully disabled": users still want to see who won.)
- **Next race:** no extra decoration on the chip (row is already busy); the status line names it.
- Chip wrapper keeps the 44px hit area (existing `pb-1` + `border-b-[3px]` span, add `p-1.5`).

Multi-race pools (DT/TT) in Live: a pool is closed when its **first leg** closes; closed pool pills use `pill(false)` disabled + lock.

---

## 2. Header credits chip

```
Phone 360 — member, Live enabled
┌────────────────────────────────────────────┐
│ 開跑前            [繁|EN]  (◉ 1,250)  (陳)  │  navy-900 h-12
Phone 360 — guest (unchanged except badge removed)
│ 開跑前                     [繁|EN]  (登入)  │
Desktop ≥1024 — member
│ 開跑前                    [繁|EN]  (◉ 1,250 積分)  (陳) 陳大文 ▾   │
```

| Element | Spec |
|---|---|
| Chip [new] `creditChip` | `<button>`: `inline-flex h-7 items-center gap-1.5 rounded-full bg-white/10 px-2.5 text-[13px] font-medium text-white tabular-nums hover:bg-white/20`. Hit area 44×44 via `relative before:absolute before:-inset-2`. |
| Coin icon | Inline 14px SVG: `gold` circle, 1px `navy-900` inner ring. `aria-hidden`. |
| Value | `fmt.num(balance)`. ≥ 100,000 → compact (`12.5萬` / `125K`). Unit word only from `lg` (`hidden lg:inline`). |
| a11y | `aria-label` = `credits:chip.aria` ("Credits: 1,250. Open credits"). Separate visually-hidden `aria-live="polite"` span announces `credits:chip.changed` on every change (bet placed, payout, purchase). |
| Change cue | Value cross-fades 150ms; `motion-safe` only. No count-up animation. |
| Loading | `h-7 w-16 rounded-full bg-white/20` placeholder (same idea as the avatar boot placeholder). |
| Error | Shows `—`; tap still opens the page, which retries. |
| Tap | `setView("credits")`. |
| Guest | Nothing rendered. |
| Account menu | New item **積分 / Credits** between Profile and Bet history; right-aligned value `tabular-nums text-ink-muted`. |

---

## 3. Stake calculator & bet slip in Live

### 3a. StakeBar (Live)

```
┌────────────────────────────────────────────┐
│ 投注計算                                    │
│ 注數: 6          每注 [◉ 10     ] 積分      │  coin replaces the $ prefix; suffix word
│ 投注總額: 60 積分                           │
│ 結餘 1,250 → 投注後 1,190                   │  13px ink-muted, tabular-nums
│                                 (  加入  )  │  btnPrimary (unchanged)
└────────────────────────────────────────────┘
```

- Min unit 10 credits (same `MIN_UNIT`). "After" = balance − slip total − this total.
- **Insufficient:** after-value turns `text-bad` with `−` sign, line `credits:stake.short` + `text-link` button
  `credits:buy.cta` (not gold; Add is the gold). Add is disabled. `aria-describedby` on Add points at the line.
- **Guest on a live meeting:** stake bar body replaced by the sky guest panel (membership `SaveBanner` pattern):
  title `credits:guest.title`, body `credits:guest.body`, gold `account:login`. Ticks still work (preview).
- **Race closed:** Add disabled, 13px `ink-muted` line `credits:race.closedNote`.

### 3b. Slip (desktop panel / phone bar + sheet)

```
Phone bottom bar (Live)
│ (3) 投注單 [●即場]                    240 積分  ˄ │  count bubble stays navy-700

Sheet / desktop panel — edit
┌──────────────────────────────────────┐
│ 投注單                      [●即場]  │  navy-900 head + badge
├──────────────────────────────────────┤
│ 連贏 · 10/5 沙田 第3場             ✕ │
│ 3, 7, 9                              │
│ 每注 10 積分 × 3              30 積分 │
├──────────────────────────────────────┤
│ 第4場 已截止 🔒                    ✕ │  closed item: bg-bad-soft, text-bad tag
├──────────────────────────────────────┤
│ 注數                              3  │  sky-150 summary
│ 投注總額                    240 積分  │
│ 結餘                       1,250 積分 │  new rows
│ 投注後結餘                 1,010 積分 │
├──────────────────────────────────────┤
│ [ 清除 ]        (      投注      )   │
└──────────────────────────────────────┘
```

| State | Spec |
|---|---|
| Slip mode | A slip holds one mode (that of its first item). Adding the other mode opens `modalNarrow` `credits:slip.switchTitle` with `btn` Cancel and `btn` `credits:slip.switchConfirm` (no gold: it is not the main action). |
| Insufficient | "投注後結餘" row value `text-bad` with `−`. Under the summary, `errorBox` (`role="alert"`) `credits:slip.short`. Gold button becomes **Buy credits** (`credits:buy.cta`) → `?tab=credits`; slip is kept (sessionStorage). |
| Confirm (Live) | Head `credits:slip.confirmTitle`. Note `credits:slip.confirmNote` ("Credits will be deducted now. Live bets can't be cancelled."). Buttons: `btn` Back · `btnPrimary` `credits:slip.confirm` ("Confirm · 240 credits"). **No countdown** (D6). If the earliest race closes in ≤ 2 min, add 13px `text-navy-900 font-medium` `credits:race.closesIn`. |
| First live bet, no 18+ yet | Confirm tap opens the 18+ dialog (§7a) first; on accept, placement continues. |
| Placing | Spinner + `credits:slip.placing`; Back disabled; sheet can't close. |
| Success | Slip body switches to a **receipt** (stays until Done/next Add): `bg-sky-50` block, 15/500 navy `credits:slip.placedTitle` ("Bets placed — pending result"), lines `credits:slip.placedBody` (count, total, new balance). Buttons `btn` `credits:slip.viewBets` (→ History, Pending filter) and `text-link` Done. No result modal. Toast `credits:toast.placed`. Chip updates (aria-live). |
| Race closed meanwhile | Server rejects; nothing deducted (placement is all-or-nothing — Eng to confirm). Closed items get the `bg-bad-soft` row + tag; `errorBox` `credits:err.raceClosed` + `btn` `credits:slip.removeClosed`. |
| Balance changed | `errorBox` `credits:err.balanceChanged` with the new balance; summary rows refresh; back to edit stage. |
| Live paused (kill switch) mid-slip | `errorBox` `credits:err.livePaused`; Place disabled. |
| Network | `errorBox` `credits:err.network`; we **re-check** before allowing retry (avoid double placement: idempotency key per slip, Eng). |

---

## 4. Credits page (`?tab=credits`)

Layout: `Display` `credits:page.title` + sub; column `mx-auto max-w-[720px] flex flex-col gap-4` (same as Account).
Guest → `LoginEmptyState` with `credits:guest.pageTitle`.

```
Phone 360
┌────────────────────────────────────────────┐
│ 積分                                        │  Display
│ 用積分投注即場賽事。1 積分 = HK$1 注碼。      │  sub
│ ┌────────────────────────────────────────┐ │
│ │ ✓ 已加入 1,200 積分                     │ │  return-state panel (good-soft)
│ └────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────┐ │
│ │ 我的積分                               │ │  sectionHead
│ ├────────────────────────────────────────┤ │
│ │ ◉ 2,450                    積分        │ │  figure 32px navy-900
│ │ 待派彩投注 3 注 · 240 積分              │ │  13px ink-muted → link to History
│ └────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────┐ │
│ │ 購買積分                               │ │  sectionHead
│ ├────────────────────────────────────────┤ │
│ │ ┌────────────────────────────────────┐ │ │
│ │ │(●) 100 積分                HK$10   │ │ │  selected: ring-2 navy-700, bg-sky-50
│ │ └────────────────────────────────────┘ │ │
│ │ ┌────────────────────────────────────┐ │ │
│ │ │( ) 1,200 積分              HK$100  │ │ │
│ │ │    額外 +20%                        │ │ │  13px navy-700
│ │ └────────────────────────────────────┘ │ │
│ │ ┌────────────────────────────────────┐ │ │
│ │ │( ) 4,000 積分  [最抵]      HK$300  │ │ │  tag: bg-navy-700 text-white
│ │ │    額外 +33%                        │ │ │
│ │ └────────────────────────────────────┘ │ │
│ │ 積分沒有現金價值，不設退款，不可兌換現金   │ │  13px ink-muted (terms)
│ │ 或轉讓，只可在開跑前投注即場賽事。《條款》 │ │
│ │ [☐] 我確認我已年滿 18 歲                 │ │  first purchase only, 44px row
│ │ ┌────────────────────────────────────┐ │ │
│ │ │       購買 100 積分 · HK$10          │ │ │  btnPrimary w-full
│ │ └────────────────────────────────────┘ │ │
│ │ 🔒 經 Stripe 安全付款，將暫時離開本網站。 │ │  13px ink-muted, centred
│ └────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────┐ │
│ │ 交易紀錄                               │ │  sectionHead
│ ├────────────────────────────────────────┤ │
│ │ 派彩  10/5 沙田 第3場 連贏     +1,250  │ │  text-good
│ │ 10月5日 15:42                  2,450   │ │  date + running balance, ink-muted
│ │ 投注  10/5 沙田 第3場 連贏       −30   │ │  text-ink
│ │ 購買  1,200 積分 (HK$100)     +1,200   │ │
│ │ 迎新獎賞                      +1,000   │ │
│ │            [ 載入更多 ]                 │ │  btn
│ └────────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

Desktop: same single column (forms gain nothing from two columns); plan cards become a 3-up grid
(`sm:grid-cols-3`), price under the credits, tag top-right.

### Plan cards [new] `planCard(on)`
- `<fieldset>` + `<legend class="sr-only">`; each card is a `<label>` wrapping a native radio (`sr-only` input,
  visible 18px radio dot `ring-1 ring-line-strong`, checked = `navy-700` fill).
- Idle `min-h-14 rounded-card bg-surface ring-1 ring-line px-[13px] py-3`; checked `ring-2 ring-navy-700 bg-sky-50`;
  focus-visible on the input draws the global outline around the label (`has-[:focus-visible]:outline-2`).
- Credits 17/500 `navy-900` tabular; price 15/500 `ink`; bonus 13px `text-navy-700`; tag `credits:plan.best`
  `rounded-full bg-navy-700 px-2 text-[11px] font-medium text-white`.
- Disabled (over daily cap) `opacity-45 cursor-not-allowed` + 13px `credits:cap.planOver`.

### Buy button
`btnPrimary w-full sm:w-auto sm:min-w-60`, label `credits:buy.button` ("Buy 1,200 credits · HK$100").
Disabled until 18+ is ticked (first time). Tap → spinner + `credits:buy.redirecting` → `location.assign(stripeUrl)`.

### Return states (from `?tab=credits&checkout=…`, then `history.replaceState` drops the params)

Panel [new] `statusPanel(tone)` = `rounded-card px-[13px] py-3 text-[15px]` + tone: info `bg-sky-50 text-navy-900 ring-1 ring-navy-700/20`,
success `bg-good-soft text-good`, error = `errorBox`. Sits above the balance card; `role="status"` (error: `alert`). Focus moves to it on load.

| `checkout` | Panel | Behaviour |
|---|---|---|
| `success`, webhook not landed | info + spinner: `credits:return.processing` | Poll order status every 2 s for 30 s, then every 10 s to 2 min. Balance shows old value + `credits:return.pendingAmount`. |
| `success`, credited | success: `credits:return.success` (+N, new balance) | Toast none (panel is enough). Chip announces. Restores a saved slip? → `btn` `credits:return.backToSlip` if one exists. |
| still pending after 2 min | info: `credits:return.slow` + `btn` `credits:return.refresh` | Credits will appear by themselves; nothing for user to do. |
| `cancel` | info: `credits:return.cancelled` | Plan selection restored. |
| `failed` (or session expired) | errorBox: `credits:return.failed` | — |

### Daily cap
- Under the plans, 13px `ink-muted` `credits:cap.remaining` once a purchase was made today.
- Reached: plans disabled, Buy disabled, info panel `credits:cap.reached` in the Buy card body.
- Server rejection at checkout creation → same panel.

### Kill switch on this page
Gold notice banner (§7b) on top; Buy card body replaced by `credits:killswitch.buyPaused`; balance + ledger stay.

### Ledger rows
- `<ul>`, rows `min-h-14 px-[13px] py-2 border-b border-line flex gap-3`, zebra not needed (two-line rows).
- Left: type label 15/500 (`credits:ledger.type.*`) + detail 13px `ink` (meeting/race/pool or plan) + date 13px `ink-muted`.
- Right: amount 15/500 tabular, `+` in `text-good` / `−` in `text-ink` (D8); running balance 13px `ink-muted` below.
- Types: `bonus`, `purchase`, `bet`, `payout`, `refund`. Bet rows that are still pending add a `待派彩` status chip (§5).
- 20 per page, `btn` "Load more". Empty: `credits:ledger.empty`. Loading: 3 skeleton rows. Error: `errorBox` + `btn` retry.

---

## 5. Pending & settled live bets in History

```
Phone 360
│ 投注紀錄                                    │
│ [即場] [模擬] [待派彩 3]                     │  pill row (pill(on)), aria-pressed
│ ┌ 即場 · 積分 ─────────────────────────────┐ │  stats panel, unit follows filter
│ │ 淨盈虧 +1,010 積分     回報率 +12.4%     │ │
│ └──────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────┐ │  table (scrolls); first col = status
│ │ 狀態         投注時間    賽事   彩池 …   │ │
│ │ [待派彩]     10/5 13:02 沙田R3 連贏 …    │ │
│ │ [已派彩 +1,250] 10/5 12:40 沙田R1 獨贏 … │ │
│ │ [未中]       10/5 12:38 …               │ │
│ │ [已退回]     …                           │ │
```

- **Filter** (replaces "all"): `即場 Live` / `模擬 Practice` / `待派彩 Pending (n)`. Default = Live if the member has any
  live bets, else Practice. Stats never mix `$` and credits; Pending view hides stats and shows
  `credits:history.pendingSummary` (count + total staked).
- **Mode badge** (`modeBadge(…, "white")`) appears in the meeting cell — useful when rows are shared/screenshotted
  and on the Pending view title.
- **Status chips [new]** `statusChip(kind)`: `inline-flex h-6 items-center rounded-full px-2 text-[13px] font-medium tabular-nums`
  - Pending `bg-sky-100 text-navy-900` + 12px clock glyph
  - Won `bg-good-soft text-good` "已派彩 +1,250"
  - Lost `bg-bad-soft text-bad` "未中"
  - Refunded `bg-surface-2 text-ink-muted` "已退回 +30"
  Practice rows keep the existing ✓/✗ column; status chip column shows only for Live.
- Pending rows: result/dividend/payout/net cells show `—`; the delete ✕ is hidden (can't remove an unsettled live bet).
  Settled live rows can't be deleted either (ledger integrity) — ✕ only on Practice rows. "Clear all" clears Practice only, copy `credits:history.clearPractice`.
- Empty: Live `credits:history.emptyLive` + `btn` to bet page; Pending `credits:history.emptyPending`.

### Settlement notification
- On app load / tab refocus, if live bets settled since last seen: **one** summary toast
  `credits:toast.settled` ("2 live bets settled · +1,250 credits"), 5 s (longer than 3 s: carries information).
- History tab label gets a count badge [new]: `ml-1.5 inline-flex min-w-4 h-4 px-1 rounded-full bg-navy-700 text-white text-[11px] tabular-nums`;
  on the active (navy) tab it inverts to `bg-white text-navy-700`. Cleared when History is opened. `aria-label` on tab:
  `credits:history.tabBadge`.
- Chip balance updates and announces.

---

## 6. Welcome bonus moment

`modalNarrow`, `role="dialog"`, shown once per member (server flag), **after** login completes (never stacked on the login modal) or on first visit post-launch for existing members.

```
┌──────────────────────────────────────┐
│              ────                    │
│               ◉                      │  48px coin (gold circle, navy ring), aria-hidden
│      送你 1,000 積分！             ✕ │  17/500 navy-900, centred
│ 用積分投注即將舉行的賽事，真實賽果       │  15px ink
│ 結算，贏得的積分自動派彩。模擬投注        │
│ 照舊免費。                            │
│ 積分沒有現金價值。                     │  13px ink-muted
│ ┌──────────────────────────────────┐ │
│ │          去即場投注               │ │  btnPrimary w-full
│ └──────────────────────────────────┘ │
│               稍後                    │  text-link button h-11
└──────────────────────────────────────┘
```

- CTA → bet page with next upcoming meeting selected. Later/✕/Esc/scrim → close; focus returns to the credits chip.
- Kill switch on: body `credits:welcome.bodyPaused`, single `btnPrimary` "OK", no bet link.
- Ledger row `迎新獎賞 +1,000`. Chip announces.

---

## 7. Safeguards, states, accessibility

### 7a. 18+ declaration dialog
`modalNarrow`, `role="dialog"`, `aria-labelledby`. Title `credits:age.title`; body `credits:age.body`;
buttons `btn` `credits:age.cancel` (initial focus) · `btnPrimary` `credits:age.confirm`. Cancel → back to slip, nothing placed.
On the Buy page it's the inline checkbox instead (`size-4 rounded-xs border-line-strong accent-navy-700`, 44px label row);
either path stores the same server flag. Footer 13px `ink-muted` `credits:age.help` (responsible-gambling link — PM to supply).

### 7b. Kill-switch banner
DESIGN.md notice banner: `rounded-card bg-gold px-[13px] py-2 text-[13px] text-ink-strong` + 16px black square `!` icon,
`role="status"`. Copy `credits:killswitch.banner`. Shown at top of bet page (when picker has upcoming meetings) and credits
page. Meeting picker per §1b; a live slip can't be placed (§3b). Pending bets still settle.

### 7c. Loading / empty / error (summary)

| Where | Loading | Empty | Error |
|---|---|---|---|
| Chip | `bg-white/20` pill | — | `—` |
| Live status line | hidden until server time synced | `race.allClosed` | hidden (chips still enforce) |
| Credits page | 3 skeleton cards (membership §5 pattern) | ledger `ledger.empty` | `errorBox` + `btn` `common:retry` |
| Plans | 3 skeleton cards `h-14` | — | `errorBox` `err.plans` |
| History Pending | existing "Loading…" panel | `history.emptyPending` | existing |
| Slip | spinner on Confirm | — | §3b table |

### 7d. Accessibility
- Targets ≥ 44×44: chip, race chips (wrapper padding), plan cards (≥56px), ✕, Load more, filter pills (`h-9` + row padding → 44).
- `aria-live="polite"`: balance changes (one hidden region in the header), race countdown (thresholds only), return-state panel, slip summary "after" value when it goes negative.
- Focus: after Place → receipt heading; after Stripe return → status panel; dialogs trap focus and return it to the opener.
- Never colour alone: Live badge has the word; closed chips have a lock + label; ledger signs `+`/`−`; status chips have words.
- Contrast: `ink-strong` on `gold` ≥ 13:1; `text-good` on `good-soft` ≥ 4.5:1; white on `navy-700` ≥ 9:1.
- Reduced motion: no fades, no sheet slide, countdown still updates (text).

---

## 8. Wireframe — bet page, Live, phone 360

```
┌────────────────────────────────────────────┐
│ 開跑前            [繁|EN]  (◉ 1,250)  (陳)  │  navy-900
│▌投注▐ 紀錄② 獨贏/位置  單T  賠率走勢  設…  →│  ② = history badge
├────────────────────────────────────────────┤
│ ┌────────────────────────────────────────┐ │
│ │ 獨贏/位置 [●即場]  10月5日 沙田 10場   │ │  navy-700
│ ├────────────────────────────────────────┤ │
│ │ [ 10月5日 · 沙田 · 10 場          ▾ ] │ │  select with optgroups
│ │ (1🔒)(2🔒)(③)(4)(5)(6)(7)(8)(9)(10) → │ │  closed = faded + lock
│ │ 第3場 12:34 後截止                     │ │  status line
│ └────────────────────────────────────────┘ │
│ [獨贏/位置][連贏][位置Q][三重彩][單T] →     │
│ ┌ 第3場 · 1200米 · 草地 ────── [賽果] ┐   │
│ │ racecard …                           │   │
│ └──────────────────────────────────────┘   │
│ ┌ 投注計算 ──────────────────────────────┐ │
│ │ 注數 3   每注 [◉ 10] 積分   總額 30 積分 │ │
│ │ 結餘 1,250 → 投注後 1,220   (  加入  )  │ │
│ └────────────────────────────────────────┘ │
├────────────────────────────────────────────┤
│ (1) 投注單 [●即場]               30 積分 ˄ │  fixed bottom bar
└────────────────────────────────────────────┘
```

History (desktop ≥1024) — see §5; table gains a leading Status column; filter pills above stats.

---

## 9. Copy (namespace `credits`)

`{{n}}`, `{{amount}}` etc. always via `fmt.num`, `tabular-nums`. zh-HK unit always follows the number with a space: `1,250 積分`.

| Key | en | zh-HK |
|---|---|---|
| unit | {{n}} credits | {{n}} 積分 |
| unitOne | 1 credit | 1 積分 |
| mode.practice | Practice | 模擬 |
| mode.live | Live | 即場 |
| picker.live | Upcoming (Live) | 即場（將舉行） |
| picker.practice | Past (Practice) | 模擬（已完賽） |
| picker.livePaused | Upcoming (Live paused) | 即場（暫停） |
| picker.awaitingResults | (awaiting results) | （等候賽果） |
| picker.noUpcoming | No upcoming meetings yet. Racecards usually appear 2 days before race day. | 暫未有將舉行的賽事。排位表一般於賽前兩日公佈。 |
| race.nextAt | Next: Race {{n}} · post time {{time}} | 下一場：第{{n}}場 · {{time}} 開跑 |
| race.closesIn | Race {{n}} closes in {{time}} | 第{{n}}場 {{time}} 後截止 |
| race.allClosed | Betting has closed for all races. Results are settled automatically. | 全日賽事已截止投注，賽果公佈後自動結算。 |
| race.closed | Closed | 已截止 |
| race.chipClosed | Race {{n}}, closed | 第{{n}}場，已截止 |
| race.closedNote | Betting on this race has closed. | 此場已截止投注。 |
| chip.aria | Credits: {{n}}. Open credits | 積分：{{n}}。開啟積分頁 |
| chip.changed | Balance: {{n}} credits | 積分結餘：{{n}} |
| menu.credits | Credits | 積分 |
| stake.balance | Balance {{bal}} → after {{after}} | 結餘 {{bal}} → 投注後 {{after}} |
| stake.short | Not enough credits for this bet. | 積分不足，未能加入此注。 |
| guest.title | Log in to bet on live races | 登入以投注即場賽事 |
| guest.body | Live bets use credits. New members get 1,000 free credits. You can still practise on past meetings as a guest. | 即場投注使用積分，新會員送 1,000 積分。訪客仍可用已完賽事模擬投注。 |
| guest.pageTitle | Log in to see your credits | 登入以查看你的積分 |
| slip.balance | Balance | 結餘 |
| slip.after | Balance after | 投注後結餘 |
| slip.short | Not enough credits. Remove some bets or buy credits. | 積分不足，請刪除部分投注或購買積分。 |
| slip.switchTitle | Your slip has {{mode}} bets. Clear it to add this bet? | 投注單內有{{mode}}投注，要清除後再加入嗎？ |
| slip.switchConfirm | Clear and add | 清除並加入 |
| slip.confirmTitle | Confirm live bets | 確認即場投注 |
| slip.confirmNote | Credits will be deducted now. Live bets can't be cancelled. | 確認後即時扣除積分，即場投注不可取消。 |
| slip.confirm | Confirm · {{n}} credits | 確認 · {{n}} 積分 |
| slip.placing | Placing… | 投注中… |
| slip.placedTitle | Bets placed — pending result | 已投注 — 待派彩 |
| slip.placedBody | {{count}} bets · {{total}} credits. Balance {{bal}}. We'll settle them when results are in. | {{count}} 注 · {{total}} 積分。結餘 {{bal}}。賽果公佈後自動結算。 |
| slip.viewBets | View my bets | 查看投注 |
| slip.done | Done | 完成 |
| slip.removeClosed | Remove closed bets | 刪除已截止投注 |
| err.raceClosed | Race {{n}} closed at {{time}}. No credits were deducted. | 第{{n}}場已於 {{time}} 截止投注，未有扣除積分。 |
| err.balanceChanged | Your balance changed to {{n}} credits. Check your slip and try again. | 你的積分結餘已變為 {{n}}，請檢查投注單後再試。 |
| err.livePaused | Live betting is paused. No credits were deducted. | 即場投注暫停，未有扣除積分。 |
| err.network | Can't connect. We'll check whether your bets went through before you retry. | 未能連線。重試前我們會先確認投注是否已完成。 |
| err.plans | Couldn't load plans. Try again. | 未能載入購買方案，請再試。 |
| page.title | Credits | 積分 |
| page.sub | Use credits to bet on live races. 1 credit = HK$1 stake. | 用積分投注即場賽事。1 積分 = HK$1 注碼。 |
| balance.title | My credits | 我的積分 |
| balance.pending | {{count}} pending bets · {{n}} credits | 待派彩投注 {{count}} 注 · {{n}} 積分 |
| buy.title | Buy credits | 購買積分 |
| buy.cta | Buy credits | 購買積分 |
| buy.button | Buy {{credits}} credits · HK${{price}} | 購買 {{credits}} 積分 · HK${{price}} |
| buy.redirecting | Opening secure checkout… | 正在前往安全付款頁… |
| buy.stripe | Secure payment by Stripe. You'll leave Post Time briefly. | 經 Stripe 安全付款，將暫時離開開跑前。 |
| plan.bonus | +{{pct}}% extra | 額外 +{{pct}}% |
| plan.best | Best value | 最抵 |
| terms | Credits have no cash value, are non-refundable, can't be exchanged for cash or transferred, and can only be used for live bets on Post Time. <terms>Terms</terms> | 積分沒有現金價值，不設退款，不可兌換現金或轉讓，只可在開跑前投注即場賽事。<terms>《條款》</terms> |
| return.processing | Payment received. Adding your credits… | 已收到付款，正在加入積分… |
| return.pendingAmount | +{{n}} on the way | +{{n}} 處理中 |
| return.success | {{n}} credits added. Balance: {{bal}}. | 已加入 {{n}} 積分。結餘：{{bal}}。 |
| return.slow | This is taking longer than usual. Your credits will appear here automatically. | 處理時間比平常長，積分到賬後會自動顯示。 |
| return.refresh | Refresh | 重新整理 |
| return.cancelled | Payment cancelled. You weren't charged. | 已取消付款，未有收費。 |
| return.failed | Payment didn't go through. You weren't charged. Try again or use another card. | 付款未能完成，未有收費。請再試或改用其他信用卡。 |
| return.backToSlip | Back to my bet slip | 返回投注單 |
| cap.remaining | You can buy up to HK${{left}} more today. | 今日尚可購買 HK${{left}}。 |
| cap.reached | You've reached today's limit of HK${{cap}}. You can buy again after midnight (HK time). | 你已達今日購買上限 HK${{cap}}，請於香港時間午夜後再購買。 |
| cap.planOver | Over today's limit | 超出今日上限 |
| ledger.title | Transactions | 交易紀錄 |
| ledger.type.bonus | Welcome bonus | 迎新獎賞 |
| ledger.type.purchase | Purchase | 購買 |
| ledger.type.bet | Bet | 投注 |
| ledger.type.payout | Payout | 派彩 |
| ledger.type.refund | Returned | 退回 |
| ledger.empty | No transactions yet. | 暫無交易紀錄。 |
| ledger.more | Load more | 載入更多 |
| status.pending | Pending | 待派彩 |
| status.won | Won +{{n}} | 已派彩 +{{n}} |
| status.lost | Lost | 未中 |
| status.refunded | Refunded +{{n}} | 已退回 +{{n}} |
| history.filterLive | Live | 即場 |
| history.filterPractice | Practice | 模擬 |
| history.filterPending | Pending ({{n}}) | 待派彩（{{n}}） |
| history.pendingSummary | {{count}} bets waiting for results · {{n}} credits staked | {{count}} 注等候賽果 · 已投注 {{n}} 積分 |
| history.emptyLive | No live bets yet. | 未有即場投注。 |
| history.emptyPending | No pending bets. | 沒有待派彩投注。 |
| history.clearPractice | Clear practice bets | 清除模擬投注 |
| history.tabBadge | History, {{n}} new results | 投注紀錄，{{n}} 項新結果 |
| toast.placed | {{count}} bets placed — pending result | 已投注 {{count}} 注 — 待派彩 |
| toast.settled | {{count}} live bets settled · {{net}} credits | {{count}} 注即場投注已結算 · {{net}} 積分 |
| welcome.title | You've got 1,000 free credits! | 送你 1,000 積分！ |
| welcome.body | Bet on upcoming races with credits. Bets settle on real results and winnings are paid in credits. Practice stays free. | 用積分投注即將舉行的賽事，真實賽果結算，贏得的積分自動派彩。模擬投注照舊免費。 |
| welcome.bodyPaused | Your credits are saved. Live betting is paused for now — we'll let you know when it's back. | 積分已存入你的帳戶。即場投注暫停，恢復後會通知你。 |
| welcome.note | Credits have no cash value. | 積分沒有現金價值。 |
| welcome.cta | Bet on a live race | 去即場投注 |
| welcome.later | Later | 稍後 |
| age.title | Are you 18 or over? | 你已年滿 18 歲嗎？ |
| age.body | Live betting works like real betting. You must be 18 or over to buy credits or place live bets. | 即場投注模擬真實投注，須年滿 18 歲方可購買積分或投注即場賽事。 |
| age.checkbox | I confirm I'm 18 or over | 我確認我已年滿 18 歲 |
| age.confirm | I'm 18 or over | 我已年滿 18 歲 |
| age.cancel | Not now | 暫時不要 |
| age.help | Bet responsibly. <help>Get help</help> | 請量力而為。<help>尋求協助</help> |
| killswitch.banner | Live betting is paused. You can still practise on past meetings. Pending bets will be settled as normal. | 即場投注暫停。你仍可用已完賽事模擬投注，待派彩投注會照常結算。 |
| killswitch.buyPaused | Buying credits is paused while live betting is off. | 即場投注暫停期間，暫停購買積分。 |

---

## 10. Open questions (PM / Eng)

1. Is live placement all-or-nothing per slip (assumed), and is there an idempotency key so a network retry can't double-spend?
2. Daily purchase cap value and reset time (assumed HK midnight); does the cap also limit daily live stake?
3. Does the kill switch also pause purchases (assumed yes)?
4. Scratched horse / abandoned race → "Returned" credits: full or partial per HKJC rules? Copy assumes an amount.
5. Responsible-gambling help link destination for `age.help`.
6. Stripe success URL: `?tab=credits&checkout=success&session_id={CHECKOUT_SESSION_ID}`; cancel: `…&checkout=cancel`.
