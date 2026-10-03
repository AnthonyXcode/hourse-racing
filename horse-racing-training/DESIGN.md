# DESIGN.md — HKJC-inspired design system

Source of truth for all new UI in `horse-racing-training`. Inferred on 2026-10-03 from the
computed styles of bet.hkjc.com (racing → Win/Place page, desktop and a 390px-wide viewport).
Values are measured, not official — HKJC does not publish its design system.

> Branding note: we borrow the *visual language* (navy + gold, dense odds tables, circular
> race chips). We do **not** use HKJC's logo, "eWin" wordmark, or name in our chrome, and
> nothing we ship should look like it *is* an HKJC page.

---

## 1. Principles

1. **Data first, dense, scannable.** Racecards and odds tables are the product. 44px rows,
   13–15px text, tabular numerals, minimal decoration.
2. **Navy carries structure, gold carries action.** Navy = headers, active states, selected
   items. Gold/yellow = the one primary call to action on screen (Add, Place bet, Login).
3. **Colour on odds means something.** Red/green/brown on an odds cell are reserved signals
   (favourite / dropping). Never use them decoratively.
4. **Flat surfaces.** White cards on light-grey canvas, hairline borders, almost no shadow.
5. **Bilingual.** Every layout must survive Traditional Chinese (shorter, taller glyphs) and
   English (longer horse/jockey names that wrap to 2 lines).

---

## 2. Colour tokens

### Brand / structure

| Token | Hex | Measured use on HKJC |
|---|---|---|
| `navy-900` | `#122C68` | Top utility bar, section title bars ("Total Turnover"), horse-name text, emphasised totals text |
| `navy-700` | `#173E96` | Active primary tab (RACING), page-section header ("Win / Place"), selected side-menu item |
| `navy-600` | `#17368B` | Active circular chip (selected venue / race number) |
| `link` | `#003C84` | Inline links, secondary text buttons |
| `slate` | `#6176A0` | Secondary pill buttons ("Details"), disabled-ish navy |
| `sky-100` | `#E2EDF6` | Idle circular chip background |
| `sky-150` | `#DBE6EF` | Highlighted summary rows (race totals) |
| `sky-50` | `#E8F0FE` | Hover / soft selection tint |
| `gold` | `#FECF13` | Primary CTA fill, notice banner background |
| `gold-ink` | `#000000` | Text on gold (always black, never white) |

### Neutrals

| Token | Hex | Use |
|---|---|---|
| `canvas` | `#F4F4F4` | Page background |
| `canvas-2` | `#E7E7E7` | Outer gutter / behind side panels |
| `surface` | `#FFFFFF` | Cards, table body |
| `zebra` | `#F6F6F6` | Alternating table rows |
| `ink` | `#333333` | Body text (default) |
| `ink-strong` | `#000000` | Labels like "Race 1", values on gold |
| `ink-muted` | `#6A6D73` | Meta text, timestamps ("Last Update …") |
| `line` | `#DEE2E6` | Hairline dividers, table row borders |
| `line-strong` | `#999999` | Input and checkbox borders |
| `disabled` | `#CCCCCC` | Disabled fills, SCR rows |

### Semantic — odds signals (reserved)

| Token | Hex | Meaning |
|---|---|---|
| `odds-fav` | `#F03939` | Favourite (white text on red cell) |
| `odds-drop20` | `#2AA217` | Odds dropped ≥ 20% |
| `odds-drop50` | `#993300` | Odds dropped ≥ 50% |
| `turf` | `#59B814` | Turf race indicator (3px underline on race tab) |

### Semantic — app (our additions, harmonised with the palette)

| Token | Hex | Use |
|---|---|---|
| `good` | `#1D7A47` | Profit / hit |
| `bad` | `#B4232C` | Loss / miss (distinct from `odds-fav` red) |
| `banker` | `#FECF13` @ 25% tint `#FFF5CC`, border `#A86A12` | Banker role in bet slip |
| `leg` | `sky-50` `#E8F0FE`, border `navy-700` | Leg role in bet slip |

---

## 3. Typography

- **Family:** `"Noto Sans", "Noto Sans TC", "PingFang HK", system-ui, sans-serif`.
  One family everywhere — HKJC uses no display/serif face.
- **Weights:** 400 regular, 500 medium (titles, odds, chips, buttons), 700 bold (totals, "Race N").
- **Numerals:** `tabular-nums` on all odds, stakes, P&L, weights, draws.

| Role | Desktop | Mobile (≤ 640px) | Weight |
|---|---|---|---|
| Section title (on navy bar) | 17px | 15px | 500 |
| Page header ("Win / Place") | 15px | 15px | 500 |
| Body / table cell | 15px | 13px | 400 |
| Odds value | 15px | 13px | 500 |
| Horse name | 15px | 13px | 500, `navy-900` |
| Nav / tab label | 15px | 13px | 400 (active 500) |
| Caption / meta | 13px | 11px | 400 |

Line-height: 1.3 for table cells (names wrap to 2 lines inside a 44px row), 1.5 for prose.
No negative letter-spacing (keeps CJK clean).

---

## 4. Spacing, radius, elevation

- **Spacing scale (px):** 4, 6, 8, 13, 16, 24. Card/section inner padding `8px 13px`.
  Mobile page gutter 8px; desktop 16px.
- **Radius**
  - `2px` — checkboxes, odds cells
  - `4px` — cards and section panels (title bar gets `4px 4px 0 0`, body `0 0 4px 4px`)
  - `6px` — inputs, selects, small buttons
  - `20px` / full — pills, circular chips
  - `15px 15px 0 0` — bottom sheets (mobile)
- **Shadow:** one only — `0 3px 5px rgb(0 0 0 / 0.05)` on cards. Modals/sheets:
  `0 2px 34px rgb(0 0 0 / 0.3)`.
- **Borders:** 1px `line` hairlines; never thicker except the 3px turf/AWT tab underline.

---

## 5. Sizing

| Element | Size |
|---|---|
| Table row | 44px min-height |
| Primary tab bar | 40px |
| Circular chip (venue / race no.) | 32 × 32px |
| Section title bar | 36px |
| Primary CTA (gold) | 40px tall, ≥ 112px wide |
| Pill button (secondary) | 20–28px tall, radius full |
| Bottom bet-slip bar (mobile) | 56px + safe-area inset |
| Touch target minimum | 44 × 44px (pad around 32px chips) |

---

## 6. Components

### Header bar
`navy-900` background, white 13px links. Below it, primary tabs on white: active tab is a
`navy-700` filled block with white 15/500 label; inactive tabs `ink` on white.

### Section card
```
┌───────────────────────────────┐  navy-900 (or navy-700) bar, 36px,
│ Total Turnover                │  white 17/500, padding 8px 13px, radius 4px 4px 0 0
├───────────────────────────────┤
│ row …               $ 363,648 │  white surface, 44px rows, line dividers,
│ row …               $ 203,319 │  values right-aligned tabular-nums
└───────────────────────────────┘  radius 0 0 4px 4px, shadow-card
```
Highlighted total rows: `sky-150` background, `navy-900` text, 700 weight.

### Circular chips (venue / race number)
32px circle, radius full. Idle `sky-100` bg + `ink-strong` text; active `navy-600` bg +
white text, 15/500. Race-number chips sit in a horizontal scroller; the active one gets a 3px
underline: `turf` green for turf, `odds-drop50`-family brown `#8B5A2B` for all-weather.

### Racecard / odds table
- Columns: No. · Colours (silk icon 24px) · Horse · Draw · Wt. · Jockey · Trainer · Win · Place.
- Header row 13px `ink`, no background, bottom `line`.
- Body rows 44px, alternate `surface` / `zebra`.
- Horse name `navy-900` 500, wraps to 2 lines max.
- Odds cell: checkbox (`line-strong` 1px, radius 2px) + value 500. Signal states fill the
  value badge (`odds-fav` / `odds-drop20` / `odds-drop50`) with white text, radius 2px.
- Scratched (SCR): whole row `ink-muted`, checkboxes `disabled`.
- Mobile: hide Trainer, then Jockey into a second line under the horse name; never
  horizontal-scroll the Win/Place columns off screen — they stay pinned right.

### Buttons
| Variant | Style |
|---|---|
| Primary | `gold` bg, black 15/500 text, radius 20px (pill), 40px tall. One per view. |
| Secondary pill | `slate` bg, white 13/500, radius full |
| Outline | white bg, 1px `navy-700` border, `navy-700` text, radius 6px |
| Text link | `link` colour, no underline until hover |
| Disabled | `disabled` bg, white text |

### Inputs
White, 1px `line-strong`, radius 6px, 32–36px tall, 15px (13px mobile). Currency inputs
prefix `$` inside the field. Focus: 2px `navy-700` outline, 2px offset.

### Notice banner
`gold` background, black 13px text, leading `!` icon in a black square. "Details" pill at
the right in `slate`. Full width, radius 4px.

### Side menu (desktop) / pool picker (mobile)
Desktop: white list, 13px items, `line` dividers, selected item `navy-700` bg + white text.
Mobile: becomes a horizontally scrolling pill row or a bottom sheet — same selected style.

### Bet slip
Desktop: right-hand white panel. Mobile: sticky bottom bar (`surface`, top `line`, shadow-pop)
showing "No. of bets · Total $" and the gold Place/Settle button; expands to a bottom sheet
with radius `15px 15px 0 0`.

### Legend
Small 16px square swatch + 13px label, used under odds tables to explain signal colours.

---

## 7. Layout & breakpoints

Bootstrap-aligned (what HKJC uses): `sm 576`, `md 768`, `lg 992`, `xl 1200`.

- **< 768px (mobile, primary target):** single column, sticky header + tabs, chip scrollers,
  bottom bet-slip bar, tables at 13px.
- **768–1199px:** content + collapsible side menu.
- **≥ 1200px:** side menu (≈150px) · content · bet slip (≈170px) three-column layout,
  content max-width 1200px.

---

## 8. Motion

Minimal. 150ms ease-out for tab/chip state changes, 250ms for bottom-sheet slide.
No decorative animation on data. Respect `prefers-reduced-motion`.

---

## 9. Tailwind v4 tokens (drop into `src/index.css` `@theme`)

```css
@theme {
  --font-sans: "Noto Sans", "Noto Sans TC", "PingFang HK", system-ui, -apple-system, sans-serif;

  --color-navy-900: #122c68;
  --color-navy-700: #173e96;
  --color-navy-600: #17368b;
  --color-link: #003c84;
  --color-slate: #6176a0;
  --color-sky-50: #e8f0fe;
  --color-sky-100: #e2edf6;
  --color-sky-150: #dbe6ef;
  --color-gold: #fecf13;

  --color-canvas: #f4f4f4;
  --color-canvas-2: #e7e7e7;
  --color-surface: #ffffff;
  --color-zebra: #f6f6f6;
  --color-ink: #333333;
  --color-ink-strong: #000000;
  --color-ink-muted: #6a6d73;
  --color-line: #dee2e6;
  --color-line-strong: #999999;
  --color-disabled: #cccccc;

  --color-odds-fav: #f03939;
  --color-odds-drop20: #2aa217;
  --color-odds-drop50: #993300;
  --color-turf: #59b814;
  --color-awt: #8b5a2b;

  --color-good: #1d7a47;
  --color-bad: #b4232c;
  --color-banker: #fff5cc;
  --color-banker-bd: #a86a12;
  --color-leg: #e8f0fe;
  --color-leg-bd: #173e96;

  --radius-xs: 2px;
  --radius-card: 4px;
  --radius-control: 6px;
  --radius-pill: 20px;
  --radius-sheet: 15px;

  --shadow-card: 0 3px 5px rgb(0 0 0 / 0.05);
  --shadow-pop: 0 2px 34px rgb(0 0 0 / 0.3);
}
```

Fonts: load `Noto Sans` (400/500/700) and `Noto Sans TC` (400/500/700) from Google Fonts in
`index.html`.

---

## 10. Implementation

Applied app-wide on 2026-10-03. Tokens live in `src/index.css` (`@theme`); legacy names
(`canvas`, `surface-2`, `ink-2`, `ink-3`, `accent`, `edge`) are kept as aliases of the values
above. Shared class strings are in `src/kit.tsx` (`btnPrimary` = gold pill, `btn` = navy outline,
`btnPill`, `pill`, `chipBtn`, `sectionHead`/`sectionBody`). Chart hex mirrors: `src/analyzer/charts.tsx`.

### Bet page flow (mirrors HKJC so practice transfers to real betting)

1. Pick a **pool** — side menu on desktop, pill row on phones. Win and Place share one page.
2. Pick the **meeting** and **race** (circular chips; active chip underlined green for turf,
   brown for all-weather). Double/Triple Trio choose leg races instead.
3. Tick horses in the racecard: Win/Place columns, or Banker/Select columns for banker pools.
   "F" (Field) ticks every runner. Lowest win odds = red favourite cell.
4. **Stake calculator**: no. of bets, unit bet (min $10), bet total, gold **Add**.
5. **Bet slip** (right column / bottom bar + sheet on phones) → **Place bet** → **Confirm**
   → result modal per bet (+ total). Each settled bet is saved to History.

Code: `src/App.tsx` (state + flow), `src/ui.tsx` (`RaceCardTable`, `PoolMenu`, `StakeBar`,
`ResultModal`), `src/BetSlip.tsx`, `src/slip.ts` (slip types, unit-bet scaling).

## 11. Checklist for any new UI

- [ ] Colours only from §2 tokens; no raw hex in components.
- [ ] Exactly one gold primary CTA per view.
- [ ] Odds signal colours used only for their meaning.
- [ ] Tables: 44px rows, tabular-nums, zebra, horse name navy.
- [ ] Works at 360px wide with zh-HK and en strings.
- [ ] No HKJC logo, wordmark or name in our chrome.
