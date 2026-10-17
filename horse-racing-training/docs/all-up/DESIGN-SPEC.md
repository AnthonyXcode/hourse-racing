# All Up (過關): design spec

Owner: Designer · Status: ready for Eng · Date: 2026-10-17
Behaviour source of truth: [SPEC.md](SPEC.md) (rules R1–R12, validation V1–V8, AC-1…AC-30).
Visual source of truth: [DESIGN.md](../../DESIGN.md). Every colour below is a §2/§9 token (or an existing
`index.css` alias such as `edge`, `good-soft`, `bad-soft`, `surface-2`, `warn`). No raw hex.

---

## 0. Design decisions (summary)

| # | Decision | Why |
|---|---|---|
| D1 | All Up is a **new pool in the existing pool menu** (`POOLS` gets `"allUp"` last, after Triple Trio). No separate "mode" toggle. | Matches HKJC eWin, where All Up / Cross Pool All Up is its own entry in the pool menu. Reuses `PoolMenu` (side + row). |
| D2 | Legs are chosen with the **same multi-race chip row as DT/TT** (`pickedLeg` / `chipBtn`), max 6 (3 with a TRI leg). | Users already learnt this pattern for Double/Triple Trio. |
| D3 | A new **leg list** (`AllUpLegList`) sits under the chips: one row per leg, sorted by race, showing 第N關, race, pool, picks, combos, Edit and Remove. | HKJC shows the built legs as a list before the formula. The DT "Editing" pill row can't show a pool per leg. |
| D4 | Each leg's pool is a **5-way segmented control** above the race card (WIN · PLA · QIN · QPL · TRI). The race card is the existing `RaceCardTable`, with Banker/Select columns as that leg's pool needs. | Keeps one race card on screen at a time (phone-first). Avoids a new table. |
| D5 | The **formula picker** is a radio group of pills, each showing the formula and its live line count (`3x7 · 23注`). It is placed inside the stake calculator, above unit and total. | Comparing line counts teaches how formulas work. A native `<select>` would hide that. |
| D6 | The bet is **one slip item**. Legs are listed one per line in the slip, the result modal, History and the Bet-tab day summary. | AC-9, AC-28. |
| D7 | The settled breakdown is a new `AllUpLegTable` (a table on ≥ sm, stacked leg cards on phones). It is reused in the result modal, and in History / day-summary rows behind an expander. | One component for every settled view (AC-28). |

---

## 1. Entry point and flow

```
Pool menu ─► 過關 / All Up
   │
   ├─ 1. Tap race chips to add legs (2–6). Each new leg becomes the leg being edited.
   ├─ 2. For the leg being edited: pick its pool (WIN/PLA/QIN/QPL/TRI), tick horses in the race card.
   │      Edit another leg: tap its row in the leg list (or its chip).
   ├─ 3. Stake calculator: pick a formula (defaults to Nx1), enter the unit bet, see lines × unit = total.
   ├─ 4. Gold Add  ─► one slip item "過關 3x7".
   └─ 5. Slip ─► Place bet ─► Confirm (practice: auto 5 s countdown; LIVE: explicit tap) ─► result / receipt.
```

### 1.1 Pool menu
- `POOLS = ["wp", "quinella", "qpl", "trio", "tierce", "first4", "doubleTrio", "tripleTrio", "allUp"]`.
- Label: `common:betType.allUp` = **All Up / 過關**. It is always enabled (unlike DT/TT, it needs no designated pool).
- Side menu (lg): last item. Phone pill row: last pill. Same selected style as other pools.
- The page header (navy-700 bar) reads `過關` plus the mode badge, as for other pools. The single-race chip `nav` is hidden (the `legCount === 1` branch). The All Up builder replaces it.

### 1.2 Adding legs (race chips)
Inside the `panel` used by DT/TT (§3 wireframes), above the leg list:

- Label: `bet:allUp.pickRaces` "Pick 2–6 races ({{picked}}/{{max}})" / "選擇 2 至 6 場（{{picked}}/{{max}}）". `max` = 6, or 3 when any leg is TRI.
- Chip states (all 32 px circles with 44 px hit area from `gap-2` + wrapper padding):
  | State | Class | Tap does |
  |---|---|---|
  | Not a leg | `chipBtn(false)` | Adds the race as a leg (with pool WIN by default) and makes it the edited leg. |
  | Leg, not edited | `pickedLeg` (sky-150 + 2px navy-700 ring, existing const in App.tsx) | Makes it the edited leg. **It does not remove the leg** (unlike DT/TT), so a slip of the finger can't lose picks. |
  | Edited leg | `chipBtn(true)` (navy-600, white) | Nothing. |
  | Full (max reached) or race not bettable | `chipBtn(false)` + `disabled` (opacity-40) | Disabled. The reason is in the caption below the chips. |
  | LIVE: race closed / settled / void | Existing lock / "Void" overlays from the race nav | Disabled for adding. |
- Removing a leg happens only from the leg list (✕).
- Legs are always **sorted by race number**. The leg index (第N關) is the position in that order, so adding R3 after R5 renumbers R5 to 第2關. This follows R3: the first race to run is the 1st leg.

### 1.3 After Add
Clear the legs, per-leg pools, picks for those races and the formula. Keep the unit. Focus the first race chip. Changing the meeting also clears the builder. Switching to another pool and back in the same meeting keeps it (state stays in `App`).

---

## 2. Component inventory

### Reused (no visual change)
| Component / class | Where |
|---|---|
| `PoolMenu` (ui.tsx) | +1 entry `allUp` |
| Page head, meeting select, mode badge, kill-switch `noticeBanner` (App.tsx) | unchanged |
| `panel`, `chipBtn`, `pickedLeg`, lock/void chip overlays | leg chooser |
| `RaceCardTable` (ui.tsx) | leg editor. Pass `pool="allUp"`, `bankerEnabled = legPool ∈ {quinella,qpl,trio}`, `bankerMax = BET_TYPES[legPool].depth − 1` (QIN/QPL 1, TRI 2). For `pool !== "wp"` it already renders Banker+Select or Select only, so no change is needed. |
| `StakeBar` (ui.tsx) | gains one optional prop `before?: ReactNode` rendered above its grid (the formula picker). The guest-LIVE panel, min-unit error, LIVE balance and short-of-credits lines are unchanged. |
| `BetSlip` / `useSlipText` | `title` and `picks` get an `allUp` branch (§5.1). |
| `ResultModal` / `SettledCard` | `SettledCard` gets an `allUp` branch (§6.1). |
| `HistoryLedger` (ui.tsx) | All Up rows get an expander (§6.2). `BetDaySummary` gets it for free. |
| `statusChip`, `seg`, `pill`, `pillRow`, `errorBox`, `btn`, `btnPrimary`, `table`, `tablePad` (kit.tsx) | as named below |

### New
| Name | File | Purpose |
|---|---|---|
| `AllUpLegList` | `src/allUp/AllUpLegList.tsx` | Ordered list of legs: index, race, pool, picks, combos, Edit, Remove. |
| `AllUpPoolPicker` | `src/allUp/AllUpPoolPicker.tsx` | 5-way segmented radio group for the edited leg's pool. |
| `AllUpFormulaPicker` | `src/allUp/AllUpFormulaPicker.tsx` | Formula radio pills with line counts, a breakdown caption and the cost equation. Passed to `StakeBar` as `before`. |
| `AllUpLegTable` | `src/allUp/AllUpLegTable.tsx` | Settled / pending per-leg breakdown (result modal, History, day summary). |
| `legStatusChip(kind)` | `kit.tsx` | Thin wrapper over `statusChip` that adds the leg kinds `refund`, `hold` and `toRun` (§6.3). |
| `allUpPoolSeg` / `allUpPoolBtn(on, disabled)` | `kit.tsx` | Segmented control classes (below). |
| `formulaPill(on)` | `kit.tsx` | Two-line pill for the formula picker (below). |

New class strings (keep literal for Tailwind):

```ts
/** All Up leg pool: 5 equal segments, 44px tall overall (36px buttons + 4px padding). */
export const allUpPoolSeg = "grid w-full grid-cols-5 gap-1 rounded-full bg-sky-100 p-1 sm:inline-grid sm:w-auto";
export const allUpPoolBtn = (on: boolean) =>
  on
    ? "h-9 min-w-0 cursor-pointer rounded-full bg-navy-600 px-2 text-[13px] font-medium whitespace-nowrap text-white sm:px-3.5"
    : "h-9 min-w-0 cursor-pointer rounded-full px-2 text-[13px] whitespace-nowrap text-ink transition-colors hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3.5";
/** Formula radio pill: formula on top, line count under it. */
export const formulaPill = (on: boolean) =>
  on
    ? "inline-flex h-11 min-w-16 flex-none cursor-pointer flex-col items-center justify-center rounded-control bg-navy-700 px-3 text-white"
    : "inline-flex h-11 min-w-16 flex-none cursor-pointer flex-col items-center justify-center rounded-control border border-line bg-surface px-3 text-ink transition-colors hover:bg-sky-50";
// inside: <span class="text-[15px] font-medium leading-tight tabular-nums">3x7</span>
//         <span class="text-[11px] leading-tight tabular-nums opacity-80">23注</span>
```

---

## 3. Layouts

### 3.1 Desktop (≥ lg, 3 columns `160px · 1fr · 260px`, unchanged grid)

```
┌────────────┬───────────────────────────────────────────────────────────────┬───────────────────────┐
│ Pools      │ ███ 過關  [練習]   17/10/2026 · 沙田 · 10 場 ███████████████████ │ ███ 投注區 ███ [練習] │
│ 獨贏 / 位置│ [ 17/10 沙田 ▾ ]                                               │ 過關 3x7 · 10/17 沙田 │
│ 連贏       ├───────────────────────────────────────────────────────────────┤ 第4, 5, 6場        ✕ │
│ 位置Q      │ 選擇 2 至 6 場（3/6）                                          │ 第4場 獨贏 5          │
│ 單T        │ (1)(2)(3)[4](5)(6)(7)(8)(9)(10)    [4]=edited  (5)(6)=picked   │ 第5場 位置 2,8        │
│ 三重彩     │                                                               │ 第6場 連贏 1,4,9      │
│ 四連環     │ 過關 各關                                                       │ $10 × 23 注      $230 │
│ 孖T        │ ┌──────┬────────┬──────┬───────────────────┬──────┬────┬───┐  ├───────────────────────┤
│ 三T        │ │第1關 │ 第4場  │ 獨贏 │ 5                 │ 1 注 │編輯│ ✕ │◄ │ 總注項數            1 │
│█ 過關 █████│ │第2關 │ 第5場  │ 位置 │ 2, 8              │ 2 注 │編輯│ ✕ │  │ 總額             $230 │
│            │ │第3關 │ 第6場  │ 連贏 │ 1, 4, 9           │ 3 注 │編輯│ ✕ │  ├───────────────────────┤
│            │ └──────┴────────┴──────┴───────────────────┴──────┴────┴───┘  │ [全部刪除] (  投注  ) │
│            │  ◄ = editing row: sky-50 bg + ring-1 navy-700                 └───────────────────────┘
│            │                                                                 
│            │ 第4場（第1關）彩池   ( 獨贏 | 位置 | 連贏 | 位置Q | 單T )          
│            │ ███ 第4場 · 沙田讓賽 ██████████████████████ [顯示賽果（第4場）]   
│            │ 第三班 · 1200米 · 草地 · 好地                                    
│            │ 編號 馬匹         檔位 負磅 騎師        獨贏賠率   選            
│            │  1   金鎗六十     …                       3.1     ☐            
│            │  5   …                                    8.4     ☑            
│            │ ───────────────────────────────────────────────────────────    
│            │ 投注計算機                                                     
│            │ 過關組合                                                        
│            │ [3x1 ][3x3 ][3x4 ][3x6 ][█3x7█]                                 
│            │ [ 6注][11注][17注][17注][ 23注]                                 
│            │ 3x7 = 3×1關 + 3×2關 + 1×3關 · 23 注 × $10 = $230                 
│            │ 注數: 23   每注金額 [$ 10 ]                投注總額: $230 ( 加入 )
│            │ ───────────────────────────────────────────────────────────    
│            │ ▸ 分析參考 …        ▸ 今日投注 …                                
└────────────┴───────────────────────────────────────────────────────────────┴───────────────────────┘
```

On desktop the leg list is a `<table>`-like grid (`grid-cols-[auto_auto_auto_1fr_auto_auto_auto]`). Use an `<ol>` with `display:grid` rows and keep the semantics a list.

### 3.2 Phone (< lg, 360–430 px; the slip is the bottom bar)

```
┌──────────────────────────────────┐
│ ███ 過關 [練習] 17/10 · 沙田 ███ │
│ [ 17/10/2026 沙田          ▾ ]   │
├──────────────────────────────────┤
│ (wp)(連贏)(位置Q)(單T)…(█過關█) → │  pool pill row, scrolls
├──────────────────────────────────┤
│ 選擇 2 至 6 場（3/6）             │
│ (1)(2)(3)[4](5)(6)(7)            │  chips wrap (flex-wrap)
│ (8)(9)(10)                       │
│ ──────────────────────────────── │
│ ┃第1關 第4場 · 獨贏        1注 ✕ │◄ editing (sky-50 + ring)
│ ┃5                               │
│  第2關 第5場 · 位置        2注 ✕ │
│  2, 8                            │
│  第3關 第6場 · 連贏        3注 ✕ │
│  1, 4, 9                         │
├──────────────────────────────────┤
│ 第4場（第1關）彩池                 │
│ (獨贏|位置|連贏|位置Q|單T)        │  full-width 5-col seg, 44px
├──────────────────────────────────┤
│ ███ 第4場 · 沙田讓賽 ███ [賽果]   │
│ 編號 馬匹            賠率   選    │
│  5   …              8.4    ☑     │
├──────────────────────────────────┤
│ 投注計算機                         │
│ 過關組合                           │
│ [3x1][3x3][3x4][3x6][█3x7█] →     │  pillRow, scrolls sideways
│ 3x7 = 3×1關 + 3×2關 + 1×3關        │
│ 23 注 × $10 = $230                 │
│ 注數: 23        每注金額 [$ 10]    │
│ 投注總額: $230        ( 加入 )     │
├──────────────────────────────────┤
│ ▸ 分析參考 / ▸ 今日投注            │
│                                  │
├──────────────────────────────────┤
│ (1) 投注區 [練習]         $230  ˄ │  fixed bottom bar, 56px
└──────────────────────────────────┘
```

Phone leg row: two lines, ≥ 56 px tall. The whole row (except ✕) is the Edit button. The ✕ is its own 44×44 button. There is no separate "Edit" text on phones.

### 3.3 Leg list row anatomy

| Part | Spec |
|---|---|
| Index | `bet:allUp.legN` "Leg {{n}}" / "第{{n}}關", 13px `ink-muted`, tabular-nums |
| Race | `common:raceShort`, 15/500 `navy-900` (13px on phones) |
| Pool | `common:betType.<pool>`, 13px `ink` |
| Picks | `legLabel` format (`膽 1  腳 4,9` / `B 1  L 4,9`); WIN/PLA show plain numbers. Empty → `bet:allUp.noPicks` in `warn`. |
| Combos | `bet:allUp.combos` "{{count}} bet(s)" / "{{count}}注", tabular-nums, `ink-muted`. "—" when 0. |
| Edit | desktop: `btnPill` small "編輯 / Edit"; editing row shows it as `aria-current="true"` and hides it. |
| Remove | 28 px ✕ inside a 44 px target, same style as the slip remove (`text-ink-muted hover:bg-bad-soft hover:text-bad`). |
| Editing row | `bg-sky-50 ring-1 ring-navy-700 rounded-control` |
| LIVE: race became closed | row `bg-bad-soft`, 🔒 + `credits:slip.closedTag` in `text-bad`, Add disabled (§4). |
| Divider | `divide-y divide-edge` |

### 3.4 Leg editor header
One line above `RaceCardTable`, in a white strip (`rounded-card bg-surface px-[13px] py-2.5 shadow-card mt-3`):
`bet:allUp.legPool` "Race {{race}} (leg {{n}}) pool" / "第{{race}}場（第{{n}}關）彩池" (13px `ink`), then `AllUpPoolPicker`.
Below the seg, show a one-line hint (12–13px `ink-muted`) only for banker pools: existing `bet:card.hintBanker`, plus `bet:allUp.bankerMax` "Up to {{n}} banker(s)" / "最多 {{n}} 隻膽".

Changing a leg's pool keeps the ticks. Moving to WIN/PLA folds bankers into Select (existing `selections` logic). Moving from TRI to QIN/QPL with 2 bankers keeps the first banker and moves the second to Select, then announces it (§8).

---

## 4. Formula, stake, cost and validation

### 4.1 `AllUpFormulaPicker`
- Shown when legs ≥ 2. With 0–1 legs it shows the hint `bet:allUp.needLegs` in a 13px `ink-muted` line instead.
- `role="radiogroup"`, `aria-label={bet:allUp.formula}`. Options are the formulas for the current leg count, in §2.1 table order (2: 2; 3: 5; 4: 8; 5: 11; 6: 15). Container: `pillRow` (wraps ≥ sm, scrolls on phones).
- Each pill: formula (`3x7`, always ASCII, never translated) over `bet:allUp.linesShort` "{{count}} lines" / "{{count}}注", computed live from §2.2 with the current `n_i`. If any leg has `n_i = 0`, show "—".
- **Default `Nx1`.** When the leg count changes, reset to the new `Nx1` and announce it (`bet:allUp.formulaReset`).
- Breakdown caption under the pills (13px `ink-muted`): `bet:allUp.formulaParts` per group size, joined with " + ", e.g. `3×1關 + 3×2關 + 1×3關` / `3 singles + 3 doubles + 1 treble`. Then:
- **Cost equation** (15px, `navy-900`, tabular-nums, `aria-live="polite"`): `bet:allUp.equation` "{{lines}} lines × {{unit}} = {{total}}" / "{{lines}} 注 × {{unit}} = {{total}}". In LIVE it uses credits (`credits:unit`), never `$`.
- `StakeBar` below it is unchanged: `注數 / No. of bets` shows **lines** (HKJC's 注數 = lines), `每注金額 / Unit bet`, `投注總額 / Bet total`, gold `加入 / Add`.

### 4.2 Validation and states

| Condition | Where it shows | Add |
|---|---|---|
| 0 legs | Leg list empty state: `bet:allUp.empty` (13px `ink-muted`, centred, `py-6`). Leg editor and race card hidden. Stake shows "-". | disabled |
| 1 leg | Formula area: `bet:allUp.needLegs`. | disabled |
| A leg has no picks (`n_i = 0`) | Row picks cell `bet:allUp.noPicks` in `warn`. Under Add: `bet:allUp.errLegEmpty` (13px `text-bad`), naming the first empty race. | disabled |
| Max legs reached (6) | Unpicked chips disabled. Caption `bet:allUp.maxLegs` (13px `ink-muted`). | — |
| A TRI leg and 3 legs | Unpicked chips disabled. Caption `bet:allUp.trioCap`. | — |
| 4+ legs and editing a leg | The TRI segment is `disabled`, with `title` + `aria-describedby` → `bet:allUp.trioCapPool` | — |
| QIN/QPL leg with < 2 horses, TRI with < 3 | Same as `n_i = 0` (engine gives 0 combos). | disabled |
| Unit < 10 or not a whole number | Existing `stake.minUnit` / `credits:stake.minUnit`, input `border-bad` + `aria-invalid`. | blocked (existing) |
| Duplicate race | Impossible in the UI (chips toggle). The server code maps to `credits:err.allUpDuplicateRace` in case it happens. | — |
| Server `all_up_too_many_legs` | Slip `errorBox`: `credits:err.allUpTooManyLegs` | — |
| Server `all_up_bad_formula` | Slip `errorBox`: `credits:err.allUpBadFormula` | — |
| LIVE: a leg race not open | Leg row 🔒 (§3.3). StakeBar `blockedNote` = `bet:allUp.legClosed` ({{race}}). | disabled |
| LIVE: horse scratched after ticking | Existing `scratched_runner` slip error. The race card already hides scratched horses from ticking. | — |
| Practice meeting without results | Existing `bet:settlementDisabled`. | disabled |
| Race card loading | Existing `bet:loadingRace` panel. | unaffected |
| Practice settle failed | Existing `bet:err.settle` toast/error with `g.betType("allUp")`. | — |

Order of messages under Add (only the first applies): unit error → empty leg → LIVE blocked → short of credits.

---

## 5. Slip

### 5.1 Slip item (`useSlipText` allUp branch)
```
過關 3x7 · 10/17 沙田 第4, 5, 6場          ✕
第4場 獨贏 5
第5場 位置 2,8
第6場 連贏 膽1 腳4,9
$10 × 23 注                          $230
```
- `title`: `g.betType("allUp") + " " + formula + " · " + slip.race(...)`.
- `picks`: one leg per line (render as a `<ul>` of `text-[13px] text-ink`, not `|`-joined), each `raceShort · poolShort · legLabel`.
- Line: `bet:allUp.slipLine` "{{unit}} × {{lines}} lines" / "{{unit}} × {{lines}} 注" (LIVE: `credits:allUp.slipLine`).
- Confirm, LIVE receipt and closed-race handling are unchanged. A LIVE closed tag applies to the whole item if **any** leg race is closed.

---

## 6. Placed and settled display

### 6.1 Result modal (`SettledCard`, practice instant and LIVE when settled)

```
███ 過關 3x7 · 10/17 沙田 第4, 5, 6場 ████████████ [中] ███
第4場 獨贏 5 · 第5場 位置 2,8 · 第6場 連贏 1,4,9
23 注中 7 注。
┌─────┬──────┬──────┬────────┬─────────┬────────┬───────┬────────┐
│ 關  │ 場次 │ 彩池 │ 選擇   │ 賽果    │ 派彩   │ 倍數  │ 狀態   │
├─────┼──────┼──────┼────────┼─────────┼────────┼───────┼────────┤
│ 1   │ 第4場│ 獨贏 │ 5      │ 5-2-8-1 │ $38    │ ×3.80 │ [中]   │
│ 2   │ 第5場│ 位置 │ 2,8    │ 6-1-2-4 │ $17.5  │ ×1.75 │ [中]   │
│ 3   │ 第6場│ 連贏 │ 1,4,9  │ 4-9-3-7 │ $210   │ ×21.00│ [中]   │
└─────┴──────┴──────┴────────┴─────────┴────────┴───────┴────────┘
過關組合   3x7         中獎注數  7 / 23
每注金額   $10         投注額    $230
退款       —           派彩      $2,894
淨額                                    +$2,664   (22px, good)
```

- Header chip: existing 中/不中 (`bg-good` / `bg-bad`). For `void` status use `statusChip("refunded")` text `credits:status.refunded`.
- Detail sentence (`settleText` new codes): `allUpHit`, `allUpMiss`, `allUpVoid` (§9).
- `AllUpLegTable` replaces the `legResults` finisher cards for All Up. Finishers (top 4 with names) stay available: on ≥ sm each "賽果" cell has a `title` with the names. The compact card grid is dropped for All Up so the modal stays short.
- Summary table: existing rows, with `combosWon` relabelled `bet:allUp.linesWon` "Winning lines" / "中獎注數" (value `linesWon / lines`), plus a new `退款 / Refund` row shown only when refund > 0, and `過關組合 / Formula`.
- Rounding caption (12px `ink-muted`) when practice gross was rounded: `bet:allUp.rounded` ("Return rounded to the nearest $0.50").

### 6.2 My bets: History and the Bet-tab day summary (`HistoryLedger`)
- Bet cell: `過關 3x7` (`g.betType` + formula from `betLabel`), with a disclosure button under it:
  `bet:allUp.showLegs` "Legs ({{n}})" / "各關（{{n}}）". `btn`-style text link 13px `link`, `min-h-11`, `aria-expanded`, `aria-controls`.
- Expanded: a full-width `<tr>` right after the row, `<td colSpan={allCols}>` with `bg-sky-50 px-[13px] py-3`, containing `AllUpLegTable compact` (no picks column on phones).
- Picks cell: existing `picks` string with pool codes (`R4 WIN 5 | R5 PLA 2,8 | R6 QIN 1,4,9`). Combos column = lines. Dividend column = `poolDividendText` (`R4 $38 × R5 $17.5 × R6 $210`), truncated with `title` on ≥ sm.
- LIVE pending All Up: the row chip stays `statusChip("pending")` until every leg is in (AC-26). In the expander, resulted legs already show their factor and status, unrun legs show `toRun`, and a footnote (12px `ink-muted`) shows `bet:allUp.pendingNote`.
- **Data dependency for Eng:** `HistoryEntry` needs an optional `allUp?: { formula; lines; linesWon; refund; legs: { raceNumber; pool; picks: string; result: string | null; dividendText: string | null; factor: number | null; status: "won"|"lost"|"refund"|"void"|"hold"|"toRun" }[] }` (practice: from `SettleResult.allUp` at save time; LIVE: from the server's `live_bets` row). If it is missing (old rows, or a server not yet updated), hide the expander. The picks and result strings still show every leg.

### 6.3 Leg status chip (`legStatusChip`)

| Leg status | Chip style | EN | zh-HK | Factor cell |
|---|---|---|---|---|
| won | `statusChip("won")` (good-soft / good) | Won | 中 | `×3.80` |
| lost | `statusChip("lost")` (bad-soft / bad) | Lost | 不中 | `×0` in `text-bad` |
| refund (scratching) | `statusChip("refunded")` (surface-2 / ink-muted) | Refund | 退款 | `×7.40` + caption `bet:allUp.carried` "{{n}} carried at ×1" / "{{n}}注以 ×1 帶入下一關" |
| void race | `statusChip("refunded")` | Void · refund | 賽事無效 · 退款 | `×1` per bet; dividend cell `bet:allUp.voidRace` |
| hold (dead heat / missing dividend) | `statusChip("pending")` | Under review | 待核實 | — |
| toRun (LIVE, race not yet run) | `statusChip("pending")` | To run | 未開跑 | — |

Factor: `×` + `F_i` to 2 dp, tabular-nums, right-aligned. Refund and void are status information, not odds signals, so they never use the `odds-*` colours.

### 6.4 `AllUpLegTable` responsive
- ≥ sm: `table tablePad` (zebra, 44px rows, `edge` lines). Columns: Leg · Race · Pool · Picks · Result · Dividend · Factor · Status. In `compact` mode Picks is dropped below md.
- < sm: an `<ol>` of leg cards (`divide-y divide-edge`), each card:
  ```
  第1關 · 第4場 · 獨贏                 [中]
  選 5   賽果 5-2-8-1
  派彩 $38                         ×3.80
  ```
  13px text. The race and pool line is 500 `navy-900`.

---

## 7. Tokens used (exact)

| Element | Tokens / classes |
|---|---|
| Page head, section bars | `navy-700` header, `navy-900` card bars (`sectionHead`) |
| Race chips | `sky-100` idle, `navy-600` edited, `sky-150` + `navy-700` ring picked (`pickedLeg`), `disabled` opacity-40 |
| Leg list | `surface`, `edge` dividers, editing `sky-50` + `navy-700` ring, `ink-muted` meta, `navy-900` race, `warn` empty picks, `bad-soft`/`bad` closed |
| Pool seg | `sky-100` track, `navy-600` selected, `ink` idle, `sky-50` hover |
| Formula pills | `surface` + `line` idle, `navy-700` selected, `sky-50` hover; radius `rounded-control` (6px) |
| Cost equation | `navy-900`, tabular-nums |
| Add | `btnPrimary` (`gold`, `gold-ink` black text). **The only gold on the bet page**, as today. Slip Place bet is in a different region and was already allowed. |
| Errors | `errorBox` (`bad-soft` / `bad`), inline `text-bad` |
| Leg status | `statusChip` (`good-soft`/`good`, `bad-soft`/`bad`, `surface-2`/`ink-muted`, `sky-100`/`navy-900`) |
| Expanded History row | `sky-50` |
| Radius | chips full, pills `pill`/`rounded-full`, formula `rounded-control`, cards `rounded-card` |
| Shadow | `shadow-card` only (no new elevation) |

---

## 8. Accessibility

- **Race chips**: `<button aria-pressed={isLeg}>`. `aria-label` = `bet:allUp.chipAria` ("Race {{n}}, leg {{leg}}" / "第{{n}}場，第{{leg}}關") when it is a leg, otherwise `common:race`. A disabled reason is linked with `aria-describedby` to the caption.
- **Leg list**: `<ol aria-label={bet:allUp.legsTitle}>`. The edit control is a `<button aria-current={editing ? "true" : undefined}>` that names the race and pool. Remove is `<button aria-label={bet:allUp.removeLeg}>`.
- **Pool picker**: `role="radiogroup"` with `aria-label={bet:allUp.legPool}`. Each segment is a `button role="radio" aria-checked`, with roving tabindex and ← → keys. Disabled TRI uses `aria-disabled="true"` (kept focusable so its reason can be read) plus `aria-describedby`.
- **Formula picker**: same radiogroup pattern. The accessible name of each pill = `bet:allUp.formulaAria` ("{{f}}, {{count}} lines" / "{{f}}，{{count}}注").
- **Live region**: one visually hidden `aria-live="polite"` node in the builder announces: leg added or removed (`bet:allUp.announceAdd` / `announceRemove`), formula reset (`formulaReset`), banker moved (`bankerMoved`). Debounce the cost equation by 300 ms so ticking doesn't flood screen readers.
- **Focus**: removing a leg moves focus to the next leg's edit button, or the previous one, or the first race chip if the list is now empty. Adding a leg leaves focus on the chip. Add moves focus to the first race chip (§1.3).
- **Targets**: all interactive items ≥ 44×44 (chips via padding, seg 44 tall overall, formula pills `h-11`, ✕ 44 px).
- **Contrast**: white on `navy-600/700`, `navy-900` on `sky-50/100/150`, and `good`/`bad` on their soft fills are the existing pairs, which already pass AA.
- **Language**: formulas are `3x7` in both languages. `lang` is inherited. No information is carried by colour alone: every status chip has text.

## 9. Motion
- Chip and seg selection: 150 ms ease-out colour transition (`transition-colors`, existing).
- Leg row add and remove: `motion` height+opacity 150 ms (`AnimatePresence`, same easing as `BetDaySummary`'s `COLLAPSE`, shortened). Skip it under `prefers-reduced-motion` (`useReducedMotion`).
- History leg expander: the `COLLAPSE` 240 ms already used by `BetDaySummary`.
- Formula reset, cost and line numbers: **no animation** (data, DESIGN §8).
- Phone slip sheet: unchanged 250 ms.

---

## 10. i18n keys (new)

Namespace `common` (glossary, used by `useGlossary().betType`):

| Key | en | zh-HK |
|---|---|---|
| `betType.allUp` | All Up | 過關 |

Namespace `bet`, under `allUp`:

| Key | en | zh-HK |
|---|---|---|
| `allUp.pickRaces` | Pick 2–6 races ({{picked}}/{{max}}) | 選擇 2 至 6 場（{{picked}}/{{max}}） |
| `allUp.legsTitle` | All Up legs | 過關各關 |
| `allUp.legN` | Leg {{n}} | 第{{n}}關 |
| `allUp.empty` | Tap race numbers above to add at least 2 legs. | 按上面的場次加入最少 2 關。 |
| `allUp.noPicks` | No horses yet | 未選馬匹 |
| `allUp.combos_one` | {{count}} bet | {{count}}注 |
| `allUp.combos_other` | {{count}} bets | {{count}}注 |
| `allUp.edit` | Edit | 編輯 |
| `allUp.removeLeg` | Remove race {{n}} from All Up | 從過關移除第{{n}}場 |
| `allUp.legPool` | Race {{race}} (leg {{n}}) pool | 第{{race}}場（第{{n}}關）彩池 |
| `allUp.poolShort.win` | WIN | 獨贏 |
| `allUp.poolShort.place` | PLA | 位置 |
| `allUp.poolShort.quinella` | QIN | 連贏 |
| `allUp.poolShort.qpl` | QPL | 位置Q |
| `allUp.poolShort.trio` | TRI | 單T |
| `allUp.bankerMax_one` | Up to {{count}} banker | 最多 {{count}} 隻膽 |
| `allUp.bankerMax_other` | Up to {{count}} bankers | 最多 {{count}} 隻膽 |
| `allUp.maxLegs` | All Up takes at most 6 legs. | 過關最多 6 關。 |
| `allUp.trioCap` | With a Trio leg, All Up takes at most 3 legs. | 包含單T的過關最多 3 關。 |
| `allUp.trioCapPool` | Trio can only be used in All Up of 3 legs or fewer. | 單T只可用於 3 關或以下的過關。 |
| `allUp.needLegs` | Add at least 2 legs to choose a formula. | 加入最少 2 關才可選擇過關組合。 |
| `allUp.formula` | All Up formula | 過關組合 |
| `allUp.linesShort_one` | {{count}} line | {{count}}注 |
| `allUp.linesShort_other` | {{count}} lines | {{count}}注 |
| `allUp.formulaAria_one` | {{f}}, {{count}} line | {{f}}，{{count}}注 |
| `allUp.formulaAria_other` | {{f}}, {{count}} lines | {{f}}，{{count}}注 |
| `allUp.formulaPart.1` | {{count}} single(s) | {{count}}×1關 |
| `allUp.formulaPart.2` | {{count}} double(s) | {{count}}×2關 |
| `allUp.formulaPart.3` | {{count}} treble(s) | {{count}}×3關 |
| `allUp.formulaPart.4` | {{count}} 4-fold(s) | {{count}}×4關 |
| `allUp.formulaPart.5` | {{count}} 5-fold(s) | {{count}}×5關 |
| `allUp.formulaPart.6` | {{count}} 6-fold(s) | {{count}}×6關 |
| `allUp.formulaReset` | Formula changed to {{f}} for {{n}} legs. | 已因 {{n}} 關改為 {{f}} 過關組合。 |
| `allUp.equation` | {{lines}} lines × {{unit}} = {{total}} | {{lines}}注 × {{unit}} = {{total}} |
| `allUp.errLegEmpty` | Pick horses for race {{n}} before adding. | 請先為第{{n}}場選擇馬匹。 |
| `allUp.legClosed` | Race {{n}} has closed. Remove that leg to bet. | 第{{n}}場已截止投注，請移除此關。 |
| `allUp.chipAria` | Race {{n}}, leg {{leg}} | 第{{n}}場，第{{leg}}關 |
| `allUp.announceAdd` | Added race {{n}} as leg {{leg}}. | 已加入第{{n}}場為第{{leg}}關。 |
| `allUp.announceRemove` | Removed race {{n}}. | 已移除第{{n}}場。 |
| `allUp.bankerMoved` | Banker {{h}} moved to selections. | 膽 {{h}} 已改為腳。 |
| `allUp.slipLine` | {{unit}} × {{lines}} lines | {{unit}} × {{lines}}注 |
| `allUp.linesWon` | Winning lines | 中獎注數 |
| `allUp.refund` | Refund | 退款 |
| `allUp.rounded` | Return rounded to the nearest $0.50. | 派彩已調整至最接近的 $0.50。 |
| `allUp.showLegs` | Legs ({{n}}) | 各關（{{n}}） |
| `allUp.pendingNote` | Pays after the last leg is run. | 最後一關跑完後才結算。 |
| `allUp.col.leg` | Leg | 關 |
| `allUp.col.race` | Race | 場次 |
| `allUp.col.pool` | Pool | 彩池 |
| `allUp.col.picks` | Picks | 選擇 |
| `allUp.col.result` | Result | 賽果 |
| `allUp.col.dividend` | Dividend | 派彩 |
| `allUp.col.factor` | Factor | 倍數 |
| `allUp.col.status` | Status | 狀態 |
| `allUp.leg.won` | Won | 中 |
| `allUp.leg.lost` | Lost | 不中 |
| `allUp.leg.refund` | Refund | 退款 |
| `allUp.leg.void` | Void · refund | 賽事無效 · 退款 |
| `allUp.leg.hold` | Under review | 待核實 |
| `allUp.leg.toRun` | To run | 未開跑 |
| `allUp.carried_one` | {{count}} bet carried forward at ×1 | {{count}}注以 ×1 帶入下一關 |
| `allUp.carried_other` | {{count}} bets carried forward at ×1 | {{count}}注以 ×1 帶入下一關 |
| `allUp.voidRace` | Race void | 賽事無效 |
| `detail.allUpHit_one` | {{linesWon}} of {{count}} line won ({{formula}}). | {{formula}}：{{count}}注中 {{linesWon}}注。 |
| `detail.allUpHit_other` | {{linesWon}} of {{count}} lines won ({{formula}}). | {{formula}}：{{count}}注中 {{linesWon}}注。 |
| `detail.allUpMiss` | Race {{race}} missed, so no line survived ({{formula}}). | {{formula}}：第{{race}}場未中，全部組合落空。 |
| `detail.allUpVoid` | Every leg was refunded, so the stake is returned. | 所有關次退款，退回全部投注額。 |

(`detail.allUpHit` uses `count` = lines so i18next pluralises.)

Namespace `credits` (LIVE amounts and server errors):

| Key | en | zh-HK |
|---|---|---|
| `allUp.slipLine` | {{unit}} credits × {{lines}} lines | {{unit}} 積分 × {{lines}}注 |
| `allUp.equation` | {{lines}} lines × {{unit}} credits = {{total}} credits | {{lines}}注 × {{unit}} 積分 = {{total}} 積分 |
| `err.allUpTooManyLegs` | All Up with a Trio leg can have at most 3 legs. | 包含單T的過關最多 3 關。 |
| `err.allUpBadFormula` | That formula doesn't match the number of legs. | 過關組合與關數不符。 |
| `err.allUpDuplicateRace` | Each All Up leg must be a different race. | 過關每關必須是不同場次。 |

HKJC glossary check: 過關 (All Up), 獨贏 WIN, 位置 PLA, 連贏 QIN, 位置Q QPL, 單T TRI, 膽 / 腳, 注數 (no. of bets = lines), 每注金額 (unit bet), 投注總額 (total), 過關組合 (formula), 第N關 (leg N), 派彩 (dividend), 退款 (refund). These match the existing `common.betType` / `bet.stake` values, so nothing is renamed.

---

## 11. DESIGN.md §11 checklist

- [x] Colours only from §2/§9 tokens and existing aliases. The new class strings in §2 use no hex.
- [x] One gold CTA per view: **Add**. Formula pills and pool segments are navy. The slip's Place bet sits in its own region, as on every pool today.
- [x] Odds signal colours are used only in `RaceCardTable` odds cells (unchanged). Leg statuses use `good`/`bad`/neutral chips.
- [x] Tables: `AllUpLegTable` uses `table`/`tablePad` (44px rows, zebra, tabular-nums). The race card is unchanged (horse names navy).
- [x] 360px: the 5-segment pool picker fits (5 × ~62px in `grid-cols-5`; the longest zh label is 位置Q and the longest en is a 3-letter code). Formula pills scroll in `pillRow`. Leg rows wrap to 2 lines. The leg table becomes cards. Check en `pickRaces` and `legPool` wrap cleanly to 2 lines.
- [x] No HKJC logo, wordmark or name in our chrome.

## 12. QA hooks (visual)
- AC-4: the 2-leg picker shows exactly `[2x1][2x3]`. 6 legs shows 15 pills that scroll on phones.
- AC-5: with the Ex 2 picks, the 3x7 pill reads `23注` and the equation reads `23注 × $10 = $230`.
- AC-3: with a TRI leg and 3 legs, the other chips are disabled with the cap caption. With 4 legs, the TRI segment is disabled with its reason.
- AC-28: the Ex 3 result modal shows R2 `退款` caption `1注以 ×1 帶入下一關` and factor `×7.40`, R3 `賽事無效 · 退款 ×1`, R5 `不中 ×0`, a refund row of $10, payout $64, net +$4.
