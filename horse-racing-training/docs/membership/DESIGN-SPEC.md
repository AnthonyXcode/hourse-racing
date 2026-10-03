# Membership — Design Spec

Status: draft v1 (Designer) · 2026-10-03 · Scope: SMS-OTP login, member profile, per-member history, guest prompts.

Everything here uses DESIGN.md tokens (§2, §9) and `src/kit.tsx` class strings. When a pattern
isn't in the kit yet, it is built from existing tokens, flagged **[new]**, and should be added to `kit.tsx`.
i18n: a new namespace `account` (en + zh-HK in `src/i18n/locales/*/account.ts`). zh-HK is the default.

---

## 0. Decisions at a glance

| # | Decision | Why |
|---|---|---|
| D1 | No 7th main tab. The account page is `?tab=account` (add `"account"` to `VIEWS`, **not** to `TABS`). You reach it from the avatar menu. | The tab strip already scrolls on phones. Account is a utility page, not a racing tool. |
| D2 | The header **Log in** button uses `btnPill` (slate pill), not gold. | §11 allows one gold CTA per view. The bet page's gold is **Add** / **Place bet**. Slate on navy-900 still gives 4.5:1 for white text. |
| D3 | The avatar fallback is initials on `sky-100` with `navy-900` text. | `navy-600` disappears on the `navy-900` bar. Gold is reserved for actions. `sky-100` is the existing idle-chip colour, so it reads as part of the chip family. |
| D4 | The OTP is **one** input with wide letter-spacing, not 6 boxes. | It's the most reliable for iOS/Android `one-time-code` autofill, paste, screen readers and backspace. It also needs no cross-box focus code. |
| D5 | The login modal uses `modalBg` + `modal`: a bottom sheet on phones and a centred dialog from `sm`. | This is the same pattern as `ResultModal`, with no new overlay system. |
| D6 | Profile edits are staged, and one gold **Save** commits Profile + Contact. Actions in the Account section (log out, delete) take effect immediately. | This gives one gold CTA per view and a predictable dirty state. |
| D7 | To delete an account, the user types the **last 4 digits of the login number**. | It's language-neutral (there's no "type DELETE" in two scripts), it's meaningful, and it's hard to do by accident. |
| D8 | Guest banners use `sky-50`/`navy` panels with a gold **Log in** button. They never use the gold notice banner. | A gold button on a gold banner would have no contrast. Gold banners stay for system notices. |

---

## 1. Header entry point

The existing navy bar (`bg-navy-900`, `h-12`) gets one new slot at the end, after `LangSwitch`, separated by `gap-3`.

```
Phone 360 — guest
┌────────────────────────────────────────────┐
│ 開跑前 (模擬)             [繁|EN]  (登入)   │  navy-900, h-12
├────────────────────────────────────────────┤
│▌投注▐ 紀錄  獨贏/位置  單T  賠率走勢  設…  →│  tab strip (scrolls)
Phone 360 — member
│ 開跑前 (模擬)             [繁|EN]   (陳)    │  (陳) = 28px avatar
Desktop ≥1024 — guest
│ 開跑前 (模擬)                         [繁|EN]  (登入)          │
Desktop ≥1024 — member
│ 開跑前 (模擬)                         [繁|EN]  (陳) 陳大文 ▾   │
```

| Element | Spec |
|---|---|
| Guest button | `<button>` with `btnPill`, label `account:login` (`h-7`, 13/500). The hit area grows to 44×44 with `relative before:absolute before:-inset-2` (or the wrapper padding pattern used for chips), and the visual bar height stays 48px. |
| Member button | `<button aria-haspopup="menu" aria-expanded>` holding the 28px avatar (`size-7 rounded-full`). Phone: avatar only, `aria-label` = `account:menu.open` ("Account menu, {{name}}"). Desktop (`lg:`): avatar + display name (13px white, `max-w-[12ch] truncate`) + a 12px chevron in `text-white/75`. Hit area ≥ 44×44. |
| Avatar | An image (`object-cover`), or else **initials**: `bg-sky-100 text-navy-900 text-[13px] font-medium`. Initials rule: CJK name → first character (陳大文 → 陳). Latin name → first letter of the first and last words, uppercased (Tony Chan → TC). If there's no name, use a 16px person glyph in `navy-900`. On white surfaces add `ring-1 ring-line`. |
| Session unknown (boot) | 28px `bg-white/20` circle placeholder, so the Log in button doesn't flash for members. |
| Focus order | app name → LangSwitch → Log in / avatar → tabs. |

### Account menu

The menu has the same items on every device: a header block, then **Profile**, **Bet history**, and **Log out**.

- **Desktop / ≥ sm: popover.** Anchored under the avatar and right-aligned (`absolute right-0 top-full mt-1 z-50 w-60`), with `bg-surface rounded-card shadow-pop py-1`.
  - **Header block** (`px-[13px] py-2 border-b border-line`): display name at 15/500 `navy-900` and the masked phone at 13px `ink-muted` with `tabular-nums`.
  - **Items:** `role="menuitem"`, `h-11 px-[13px] text-[15px] text-ink hover:bg-sky-50`. The current page shows `aria-current` and `font-medium text-navy-700`.
  - **Behaviour:** Esc, an outside click or picking an item closes the menu, and focus returns to the avatar. Arrow keys move between items.
- **Phone (< sm): bottom sheet.** Reuse the BetSlip sheet anatomy: `fixed inset-0 z-50` with an `bg-ink/40` scrim, then a panel with `absolute inset-x-0 bottom-0 rounded-t-sheet bg-surface pb-[env(safe-area-inset-bottom)]`, a grabber button and the same header block. Items are 48px rows with `border-b border-line`, and **Log out** is the last row. Slide in over 250ms and respect reduced-motion. While the sheet is open, the body doesn't scroll.
- **Menu actions:**
  - Profile → `setView("account")`.
  - Bet history → `setView("history")`.
  - Log out → logs out immediately (no confirm), then shows the toast `account:toast.loggedOut`. If the user was on `account`, go to `bet`.

---

## 2. Login modal

`modalBg` + `modal`, `role="dialog" aria-modal="true" aria-labelledby={titleId}`. On `sm` and up, the content width is fixed at `sm:w-[400px]` (it overrides `sm:w-auto`), so the steps don't jump in width.

### Modal chrome
- Title row: `h2` 17/500 `navy-900` (15px on phones). The close button sits at the right: `size-11`, a 16px ✕ in `ink-muted`, `aria-label` = `common:action.close`.
- Phone: a grabber bar (`h-1 w-10 rounded-full bg-line mx-auto mb-3`) above the title, purely decorative.
- Closing:
  - Step 1: Esc, the scrim or ✕ closes.
  - Steps 2 and 3: **only ✕ or Esc** closes. A scrim tap is ignored, so a stray tap can't lose an OTP in progress.
  - Closing during Step 3 counts as **Skip**, because the account already exists.
- Focus is trapped while open. When it closes, focus returns to the element that opened it.
- Openers:
  - Header Log in.
  - The result-modal banner. This one stacks the login modal on top of the result modal at `z-[60]`, and the result modal closes after login succeeds.
  - The History empty state.

### Step 1 — Phone number

```
┌──────────────────────────────────────┐
│              ────                    │
│ 登入／登記                         ✕ │
│ 輸入香港手機號碼，我們會以短訊傳送    │  13px ink-muted
│ 驗證碼。新用戶會自動建立帳戶。        │
│                                      │
│ 手機號碼                              │  fieldLabel
│ ┌──────┬───────────────────────────┐ │
│ │ +852 │ 9123 4567                 │ │  control, h-10
│ └──────┴───────────────────────────┘ │
│ (field error, 13px text-bad)         │
│                                      │
│ [ Turnstile — usually invisible ]    │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │            獲取驗證碼             │ │  btnPrimary, w-full
│ └──────────────────────────────────┘ │
│ 繼續即表示你同意《使用條款》及         │  13px ink-muted,
│ 《私隱政策》。                        │  links = text-link
└──────────────────────────────────────┘
```

| Element | Spec |
|---|---|
| Phone field | A wrapper with `control` styling and `flex items-stretch p-0`. The prefix is `+852` in `bg-surface-2 px-3 text-ink-muted border-r border-line-strong rounded-l-control flex items-center tabular-nums`. It isn't focusable and is `aria-hidden`; the label reads "手機號碼（+852）". The input is borderless: `flex-1 bg-transparent px-3 text-base sm:text-sm tabular-nums outline-none`, and the wrapper gets the focus ring via `focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-navy-700`. |
| Input attrs | `type="tel" inputMode="numeric" autoComplete="tel-national" name="phone" maxLength={9}`, and it accepts pasted `+852…`/`852…`/spaces. The display formats as `#### ####` (a space after 4 digits). We store 8 digits. |
| Validation | 8 digits starting with 4–9. Validate **on submit and on blur**, never while typing. Errors go below the field (see §5). |
| Turnstile | Placed between the field and the button. `appearance: "interaction-only"`, `size: "flexible"`, `theme: "light"`, `language: zh-HK → "zh-tw"`, `en → "en"`. The container uses `min-h-0`: invisible = no space; when the challenge shows, it takes 65px with `mt-4`. The widget loads when the modal opens, so a token is usually ready before the user taps. |
| Send button | `btnPrimary w-full mt-4`, label `account:login.send`. It's enabled once 8 digits are entered. |
| Send states | Tapping before the Turnstile token arrives shows a spinner + `account:login.checking`, and the request fires automatically when the token resolves. While sending, it shows a spinner + `account:login.sending`. Disabled styling is the kit's `disabled:bg-disabled disabled:text-white`. |
| Consent | `mt-3 text-[13px] text-ink-muted leading-normal`. Links `text-link hover:underline` open `?tab=terms` / `?tab=privacy` in a **new tab**, so the modal isn't lost. |

### Step 2 — Verification code

```
┌──────────────────────────────────────┐
│ 輸入驗證碼                         ✕ │
│ 已傳送 6 位數字驗證碼至               │
│ +852 9123 ••78   更改                 │  number 500 ink-strong; 更改 = text-link
│                                      │
│ 驗證碼                                │
│ ┌──────────────────────────────────┐ │
│ │      4   8   2   0   1   _        │ │  h-12, 24px, letter-spaced
│ └──────────────────────────────────┘ │
│ (error, 13px text-bad)               │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │               驗證                │ │  btnPrimary, w-full
│ └──────────────────────────────────┘ │
│        60 秒後可重新傳送              │  13px ink-muted, centred
│   (becomes)  重新傳送驗證碼            │  text-link button, h-11
└──────────────────────────────────────┘
```

| Element | Spec |
|---|---|
| Masked number | `+852 #### ••##`, e.g. `+852 9123 ••78`, with `tabular-nums`. **Change** (`account:login.change`) is a `text-link` button (44px hit area). It goes back to Step 1 with the number prefilled and the countdown kept. |
| OTP input | `control h-12 w-full text-center text-2xl font-medium tabular-nums`, with letter-spacing set **inline**: `style={{ letterSpacing: "0.5em", paddingLeft: "0.5em" }}`. A `tracking-*` class would be reset to 0 by the zh-HK rule in `index.css`. |
| OTP attrs | `inputMode="numeric" autoComplete="one-time-code" pattern="\d{6}" maxLength={6} name="otp"`, placeholder `••••••` in `ink-muted`. Non-digits are stripped on input and paste. |
| Submit | The code **auto-submits** at 6 digits (autofill fills all 6). The gold **Verify** button stays for keyboard and assistive-tech users. While verifying, the input is `readOnly` and the button shows a spinner + `account:login.verifying`. |
| Resend | A 60s countdown starting from the send. During the countdown: `account:login.resendIn` in `text-[13px] text-ink-muted tabular-nums`. After it: a `text-link` button `account:login.resend` (h-11). Resending re-runs Turnstile silently. |
| Focus | The OTP input gets focus when the step opens. After a wrong code, the input is cleared and focused again. |

### Step 3 — Welcome (new users only, skippable)

```
┌──────────────────────────────────────┐
│ 歡迎加入開跑前                     ✕ │
│ 設定名稱及頭像，之後可隨時更改。       │
│                                      │
│   ( 會 )   [ 上載頭像 ]               │  72px avatar + btn (outline)
│                                      │
│ 顯示名稱                       0/20   │
│ ┌──────────────────────────────────┐ │
│ │ 會員 5678                        │ │  control, prefilled
│ └──────────────────────────────────┘ │
│ ┌──────────────────────────────────┐ │
│ │               完成                │ │  btnPrimary, w-full
│ └──────────────────────────────────┘ │
│               略過                    │  text-link button, h-11
└──────────────────────────────────────┘
```

- The display name is prefilled with `account:defaultName` ("會員 5678" / "Member 5678", the last 4 digits), so a skip still produces a usable name. It's selected on focus. The rules match the profile page (§3).
- The avatar uses the same uploader as the profile page (§3), at 72px.
- **Skip** keeps the default name and no avatar.

### Success
- The modal closes and the user stays where they were. The toast says `account:toast.loggedIn` ("Logged in as {{name}}").
- Returning users skip Step 3.
- **Toast [new]:** `fixed left-1/2 -translate-x-1/2 z-[70] bottom-[calc(16px+env(safe-area-inset-bottom))]` (on the bet page on phones, add 56px to clear the slip bar), styled `rounded-control bg-navy-900 px-4 py-2.5 text-[13px] text-white shadow-pop`, with `role="status"`. It auto-hides after 3s, has no close button, and doesn't move under reduced-motion.

---

## 3. Account page (`?tab=account`)

- **Navigation:** no tab is highlighted while it's open. A guest who opens `?tab=account` gets the History-style login empty state (§4b) with `account:guest.accountTitle`.
- **Layout:** `Display` title `account:page.title`, then a column `mx-auto max-w-[720px] flex flex-col gap-4`, the same on phone and desktop. A form gains nothing from two columns.
- **Section cards:** each is `sectionHead` + `sectionBody` with `px-[13px] py-4 flex flex-col gap-4`.

```
Phone 360
┌────────────────────────────────────────────┐
│ 我的帳戶                                    │  Display
│ ┌────────────────────────────────────────┐ │
│ │ 個人資料                               │ │  sectionHead
│ ├────────────────────────────────────────┤ │
│ │  (頭像 72)  [更換相片]  移除            │ │
│ │  JPG / PNG / WebP，最大 5 MB            │ │  13px ink-muted
│ │ 顯示名稱 *                       3/20  │ │
│ │ [陳大文                             ]  │ │
│ │ 簡介                            42/160 │ │
│ │ [ textarea, 3 rows                  ]  │ │
│ └────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────┐ │
│ │ 聯絡資料                               │ │
│ ├────────────────────────────────────────┤ │
│ │ Telegram 用戶名稱                       │ │
│ │ [@|tonychan                         ]  │ │
│ │ WhatsApp                               │ │
│ │ [☑] 與登入號碼相同                      │ │
│ │ [+852 9123 4578            (disabled)] │ │
│ │ 電郵                                   │ │
│ │ [tony@example.com                   ]  │ │
│ │ 聯絡資料只作聯絡用途，不會用作登入。    │ │
│ └────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────┐ │
│ │ 帳戶                                   │ │
│ ├────────────────────────────────────────┤ │
│ │ 登入手機            +852 9123 ••78     │ │  44px rows, line dividers
│ │ 會員自              2026年10月3日       │ │
│ │ [ 登出 ]                    刪除帳戶    │ │  btn  |  text-bad text button
│ └────────────────────────────────────────┘ │
├────────────────────────────────────────────┤
│ 有未儲存的更改           (    儲存    )     │  sticky save bar (phones)
└────────────────────────────────────────────┘
```

### Profile section

| Field | Spec |
|---|---|
| Avatar | A 72px circle (`size-18 rounded-full ring-1 ring-line`) with the image or initials (D3, `text-[26px]`). **Change photo** is a `btn` (outline) that opens `<input type="file" accept="image/jpeg,image/png,image/webp">`, hidden behind a label. **Remove** is a `text-link` button, shown only when there's an image. The new photo shows as a local preview straight away and uploads on Save. Client side: centre-crop to a square, then resize to 256px. Limit ≤ 5 MB **before** resize. Errors appear inline under the row. |
| Display name | Required, 1–20 characters after trimming (one CJK character counts as 1). `control w-full`, `autoComplete="nickname"`, `maxLength={20}`. The counter sits right-aligned on the label row in 13px `ink-muted`, `tabular-nums`, `aria-hidden`. A visually hidden live hint is announced only at ≥ 90%. |
| Description | Optional, ≤ 160 characters. Textarea `control h-auto min-h-[88px] py-2 leading-normal resize-y`, `rows={3}`, `maxLength={160}`. Same counter as the name. |

### Contact section (all optional)

| Field | Spec |
|---|---|
| Telegram | The prefix `@` uses the same prefix-chip pattern as the phone field. `autoCapitalize="none" autoCorrect="off" spellCheck={false}`. A leading `@` is stripped on paste. Valid: 5–32 characters, `[A-Za-z0-9_]`. |
| WhatsApp | The checkbox **Same as login number** (`size-4 rounded-xs border-line-strong accent-navy-700`, label 15px, 44px row) is checked by default for new members. When checked, the input shows the full login number and is `disabled` (`bg-surface-2 text-ink-muted`), and we store `same_as_login`. When unchecked, the field is `type="tel" autoComplete="tel"` with placeholder `+852 9123 4567`; with no `+`, it's assumed to be +852. Valid: 8–15 digits. |
| Email | `type="email" autoComplete="email" inputMode="email"`. The browser's built-in validation is suppressed (`noValidate`), and we show our own error. |
| Helper | `account:contact.helper` at 13px `ink-muted`, at the bottom of the card. |

### Account section

- **Rows:** label/value rows, `min-h-11 flex items-center justify-between border-b border-line`. The value is `tabular-nums text-ink-strong`. "Member since" uses `fmt.date(…, {dateStyle: "long"})`.
- **Log out:** `btn` (navy outline). It works like the menu's Log out.
- **Delete account:** `text-[15px] font-medium text-bad hover:underline h-11`, right-aligned. It opens the confirm dialog below. This is a destructive action, so it is never gold.

**Delete confirm dialog:** `modalBg` + `modal`, `role="alertdialog"`, `sm:w-[400px]`.

```
│ 刪除帳戶？                                  ✕ │
│ 你的個人資料及所有投注紀錄將被永久刪除，        │
│ 無法復原。                                     │
│ 請輸入登入號碼的最後 4 位數字以確認。           │
│ [ ____ ]  (control, inputMode numeric, w-28)  │
│ [ 取消 ]                    [ 永久刪除 ]       │
```

- **Initial focus:** Cancel.
- **Cancel:** `btn`.
- **Confirm:** `cx(btn, "border-bad text-bad enabled:hover:bg-bad-soft")`. It stays disabled until the 4 digits match.
- **While deleting:** spinner + `account:delete.deleting`.
- **On success:** close everything, log out, go to `bet`, and show the toast `account:toast.deleted`.
- **On error:** `errorBox` inside the dialog.

### Save behaviour

- **Placement:** one `btnPrimary` labelled `account:save`.
  - **Phones:** a sticky bottom bar [new, mirrors the slip bar]: `fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface shadow-pop pb-[env(safe-area-inset-bottom)]`, `h-14 px-4 flex items-center justify-between`. The page gets `pb-24`.
  - **≥ lg:** a static row under the last card, right-aligned.
- **Clean form:** the button is disabled and shows no status text.
- **Dirty form:** the button is enabled, and `account:unsaved` shows in 13px `ink-muted` to its left.
- **On Save:** client validation runs first. If anything fails, focus moves to the first invalid field and it scrolls into view (`scroll-margin-top: var(--header-h)`). Nothing is sent.
- **While saving:** the button shows a spinner + `account:saving` and the fields are `readOnly`.
- **Success:** the button returns to disabled and shows the toast `account:toast.saved`. Server-side field errors map back to the fields. Other errors appear in an `errorBox` above the first card.
- **Leaving dirty:** switching tabs or opening the menu shows a small `modal`: `account:leave.title`, with **Stay** (`btn`) and **Discard** (`text-bad` text button). `beforeunload` is on while dirty.

---

## 4. Guest prompts

### 4a. Result-modal banner (guest, after Place bet → Confirm)

The banner sits inside `ResultModal`, **above** the bet cards so it's seen first. The Close `btn` stays at the bottom.

```
┌────────────────────────────────────────┐
│ ┌────────────────────────────────────┐ │
│ │ 登入以儲存紀錄                      │ │  15/500 navy-900
│ │ 你正以訪客身份投注，今次結果不會     │ │  13px ink
│ │ 儲存到投注紀錄。                    │ │
│ │ ┌──────────────────────────────┐   │ │
│ │ │          登入並儲存           │   │ │  btnPrimary, w-full (sm: w-auto)
│ │ └──────────────────────────────┘   │ │
│ └────────────────────────────────────┘ │  bg-sky-50 ring-1 ring-navy-700/20 rounded-card p-[13px]
│ [ bet result cards … ]                 │
│ [ 關閉 ]                               │  btn (existing)
└────────────────────────────────────────┘
```

- **Layout:** stacked on phones. From `sm`: text on the left, button on the right (`sm:flex sm:items-center sm:gap-4`).
- **A11y:** `role="region" aria-labelledby` pointing at its heading.
- **Tapping Log in:** opens the login modal on top. **Recommended (PM/Eng to confirm):** after a successful login, save the bets just settled in this modal. The toast then reads `account:toast.savedBets` ("{{n}} bets saved to History") and the banner disappears. If that isn't built, change the banner copy to the "future bets" variant `account:guest.bannerFuture`.
- **Members:** don't see the banner.

### 4b. History tab — guest empty state

This replaces `HistoryPage` (the stats and table are hidden) with:

```
│ 投注紀錄                                    │  Display (existing history.title)
│ ┌────────────────────────────────────────┐ │
│ │        登入以查看你的投注紀錄           │ │  17/500 navy-900, centred
│ │  會員的每注模擬投注都會自動儲存，         │ │  13px ink-muted, max-w-[40ch]
│ │  隨時翻查盈虧及命中率。                  │ │
│ │          (     登入     )               │ │  btnPrimary
│ │  未有帳戶？用手機號碼即可登記，毋須密碼。  │ │  13px ink-muted
│ └────────────────────────────────────────┘ │  panel, text-center, py-10
```

A member with no bets keeps the existing `history.empty` copy.

---

## 5. States, errors and accessibility

### Loading
- **Buttons:** an inline 16px spinner (`size-4 rounded-full border-2 border-current border-r-transparent animate-spin`, `aria-hidden`) + a label change. The width stays the same (`min-w-28` already). `aria-busy="true"` goes on the form.
- **Account page first load:** 3 skeleton cards. Each has a real `sectionHead` holding a `h-4 w-24 rounded-xs bg-white/25` bar, and a body with grey bars `bg-surface-2` (`h-10` for fields, `size-18 rounded-full` for the avatar). `animate-pulse` applies only under `motion-safe:`.
- **History for members:** keep the existing behaviour, and add a centred `panel` with "載入中…"/"Loading…" until the first fetch.

### Error placement rule
- **Field errors** go **under the field**: `mt-1 text-[13px] text-bad`, with `id={field}-error`. The input gets `aria-invalid="true"`, `aria-describedby` pointing at the error (plus the hint when one exists), and a `border-bad` override. Errors clear on the next valid edit.
- **Non-field errors** go in an **`errorBox` at the top of the modal or card body**, with `role="alert"`. Only one shows at a time.

| Code | Where | Behaviour |
|---|---|---|
| `phone_invalid` | Field (step 1) | — |
| `turnstile_failed` | errorBox (step 1) | Reset the widget. The button re-enables. |
| `send_rate_limited` | errorBox (step 1/2) | Send/Resend are disabled for `{{min}}` minutes (shown). |
| `sms_failed` | errorBox (step 1) | The user can retry. |
| `otp_wrong` | Field (step 2) | Clear the input, refocus, show remaining attempts. |
| `otp_expired` | Field (step 2) | Resend is enabled immediately, even mid-countdown. |
| `otp_locked` (too many attempts) | errorBox (step 2) | The input and Verify are disabled. Only Resend (after cooldown) or Change is available. |
| `network` | errorBox (any) | Input is kept. Retry by pressing the same button. |
| Avatar `too_large` / `bad_type` / `upload_failed` | Under the avatar row | — |
| Profile field rules | Field | — |
| `save_failed` | errorBox above the cards | — |

### Disabled
The kit's disabled styles apply: `btnPrimary` uses `bg-disabled text-white`, `btn` uses `opacity-45`. Disabled controls use `bg-surface-2 text-ink-muted cursor-not-allowed`. Never use colour alone: the disabled Save has the "no changes" state implied by the missing `account:unsaved` text, and the countdown is spelled out in text.

### Accessibility checklist
- Every input has a visible `<label htmlFor>`. Prefix chips are `aria-hidden`, and the label carries "+852" or "@".
- **Live regions** (`aria-live="polite"`, one per modal step):
  - Step changes ("驗證碼已傳送至 +852 9123 ••78").
  - The countdown **only at its start and when resend becomes available**, never every second.
  - Save success is handled by the toast's `role="status"`.
- Errors use `role="alert"` (errorBox) or `aria-describedby` (fields). The OTP error is also announced through the step's live region.
- Targets are ≥ 44×44: the avatar button, close ✕, Change, Resend, Skip, Remove, Delete, and the menu items (`h-11`/48px).
- Inputs use 16px text on phones (from `control`), so iOS doesn't zoom.
- **Focus order:**
  - Step 1: phone → (Turnstile, if interactive) → Send → Terms → Privacy → ✕.
  - Step 2: OTP → Verify → Resend → Change → ✕.
  - Step 3: Upload → Name → Done → Skip → ✕.
  - Account page: in DOM order, with Save last.
- Visible focus uses the global `:focus-visible` navy outline. The prefixed fields use `focus-within`.
- Contrast: white on `slate` ≥ 4.5:1; `navy-900` on `sky-100`/`sky-50` ≥ 12:1; `text-bad` on white ≥ 6:1.
- All motion (sheet slide, toast, spinner, pulse) respects `prefers-reduced-motion`.
- Each locale is checked at 360px (§11). The longest en strings are "Send verification code" (we use "Send code") and "Same as login number".

---

## 6. Copy (namespace `account`)

`{{…}}` = interpolation. Numbers and phone numbers are always `tabular-nums`.

| Key | en | zh-HK |
|---|---|---|
| login | Log in | 登入 |
| menu.open | Account menu, {{name}} | 帳戶選單：{{name}} |
| menu.profile | Profile | 個人資料 |
| menu.history | Bet history | 投注紀錄 |
| menu.logout | Log out | 登出 |
| login.title | Log in or sign up | 登入／登記 |
| login.intro | Enter your Hong Kong mobile number and we'll text you a code. New numbers get an account automatically. | 輸入香港手機號碼，我們會以短訊傳送驗證碼。新用戶會自動建立帳戶。 |
| login.phoneLabel | Mobile number (+852) | 手機號碼（+852） |
| login.phonePlaceholder | 9123 4567 | 9123 4567 |
| login.send | Send code | 獲取驗證碼 |
| login.checking | Checking you're not a robot… | 正在進行安全驗證… |
| login.sending | Sending… | 傳送中… |
| login.consent | By continuing you agree to the <terms>Terms of Use</terms> and <privacy>Privacy Policy</privacy>. | 繼續即表示你同意<terms>《使用條款》</terms>及<privacy>《私隱政策》</privacy>。 |
| login.codeTitle | Enter verification code | 輸入驗證碼 |
| login.codeSent | We sent a 6-digit code to {{phone}} | 已傳送 6 位數字驗證碼至 {{phone}} |
| login.change | Change | 更改 |
| login.codeLabel | Verification code | 驗證碼 |
| login.verify | Verify | 驗證 |
| login.verifying | Verifying… | 驗證中… |
| login.resendIn | Resend in {{s}}s | {{s}} 秒後可重新傳送 |
| login.resend | Resend code | 重新傳送驗證碼 |
| login.resendReady | You can request a new code now. | 現在可以重新傳送驗證碼。 |
| welcome.title | Welcome to Post Time | 歡迎加入開跑前 |
| welcome.intro | Set a name and photo. You can change them any time. | 設定名稱及頭像，之後可隨時更改。 |
| welcome.done | Done | 完成 |
| welcome.skip | Skip | 略過 |
| defaultName | Member {{last4}} | 會員 {{last4}} |
| err.phoneInvalid | Enter an 8-digit Hong Kong mobile number. | 請輸入 8 位數字的香港手機號碼。 |
| err.turnstile | Security check failed. Please try again. | 安全驗證未能通過，請再試一次。 |
| err.rateLimited | Too many requests. Try again in {{min}} min. | 請求過於頻密，請於 {{min}} 分鐘後再試。 |
| err.smsFailed | We couldn't send an SMS to this number. Check it and try again. | 未能傳送短訊至此號碼，請檢查後再試。 |
| err.otpWrong | Incorrect code. {{n}} attempts left. | 驗證碼不正確，尚餘 {{n}} 次機會。 |
| err.otpExpired | This code has expired. Request a new one. | 驗證碼已過期，請重新索取。 |
| err.otpLocked | Too many incorrect attempts. Request a new code. | 輸入錯誤次數過多，請重新索取驗證碼。 |
| err.network | Can't connect. Check your connection and try again. | 未能連線，請檢查網絡後再試。 |
| page.title | My account | 我的帳戶 |
| section.profile | Profile | 個人資料 |
| section.contact | Contact | 聯絡資料 |
| section.account | Account | 帳戶 |
| avatar.change | Change photo | 更換相片 |
| avatar.upload | Upload photo | 上載頭像 |
| avatar.remove | Remove | 移除 |
| avatar.hint | JPG, PNG or WebP, up to 5 MB | JPG、PNG 或 WebP，最大 5 MB |
| avatar.alt | Profile photo of {{name}} | {{name}}的頭像 |
| err.avatarTooLarge | Photo must be 5 MB or smaller. | 相片不可大於 5 MB。 |
| err.avatarType | Use a JPG, PNG or WebP image. | 請使用 JPG、PNG 或 WebP 圖片。 |
| err.avatarUpload | Couldn't upload the photo. Try again. | 未能上載相片，請再試一次。 |
| name.label | Display name | 顯示名稱 |
| name.counter | {{n}}/{{max}} | {{n}}/{{max}} |
| err.nameRequired | Enter a display name. | 請輸入顯示名稱。 |
| err.nameTooLong | Use 20 characters or fewer. | 請輸入不多於 20 個字。 |
| bio.label | About you | 簡介 |
| bio.placeholder | E.g. favourite jockey, betting style… | 例如：心水騎師、投注風格… |
| telegram.label | Telegram username | Telegram 用戶名稱 |
| err.telegram | 5–32 letters, numbers or underscores. | 須為 5 至 32 個英文字母、數字或底線。 |
| whatsapp.label | WhatsApp | WhatsApp |
| whatsapp.same | Same as login number | 與登入號碼相同 |
| err.whatsapp | Enter a valid phone number, e.g. +852 9123 4567. | 請輸入有效電話號碼，例如 +852 9123 4567。 |
| email.label | Email | 電郵 |
| err.email | Enter a valid email address. | 請輸入有效的電郵地址。 |
| contact.helper | Contact details are for contacting you only — not for logging in. | 聯絡資料只作聯絡用途，不會用作登入。 |
| optional | Optional | 選填 |
| acct.phone | Login number | 登入手機 |
| acct.since | Member since | 會員自 |
| acct.logout | Log out | 登出 |
| acct.delete | Delete account | 刪除帳戶 |
| save | Save | 儲存 |
| saving | Saving… | 儲存中… |
| unsaved | Unsaved changes | 有未儲存的更改 |
| err.saveFailed | Couldn't save your changes. Try again. | 未能儲存更改，請再試一次。 |
| leave.title | Discard unsaved changes? | 放棄未儲存的更改？ |
| leave.stay | Keep editing | 繼續編輯 |
| leave.discard | Discard | 放棄 |
| delete.title | Delete account? | 刪除帳戶？ |
| delete.body | Your profile and all bet history will be permanently deleted. This can't be undone. | 你的個人資料及所有投注紀錄將被永久刪除，無法復原。 |
| delete.prompt | Enter the last 4 digits of your login number to confirm. | 請輸入登入號碼的最後 4 位數字以確認。 |
| delete.cancel | Cancel | 取消 |
| delete.confirm | Delete permanently | 永久刪除 |
| delete.deleting | Deleting… | 刪除中… |
| toast.loggedIn | Logged in as {{name}} | 已登入：{{name}} |
| toast.loggedOut | Logged out | 已登出 |
| toast.saved | Changes saved | 已儲存更改 |
| toast.savedBets | {{n}} bets saved to History | 已將 {{n}} 注儲存至投注紀錄 |
| toast.deleted | Your account has been deleted | 你的帳戶已刪除 |
| guest.bannerTitle | Log in to save your record | 登入以儲存紀錄 |
| guest.bannerBody | You're betting as a guest, so these results won't be saved to History. | 你正以訪客身份投注，今次結果不會儲存到投注紀錄。 |
| guest.bannerFuture | You're betting as a guest. Log in so your next bets are saved to History. | 你正以訪客身份投注。登入後，之後的投注會自動儲存到投注紀錄。 |
| guest.bannerCta | Log in and save | 登入並儲存 |
| guest.historyTitle | Log in to see your bet history | 登入以查看你的投注紀錄 |
| guest.historyBody | Members' practice bets are saved automatically, so you can track profit and hit rate any time. | 會員的每注模擬投注都會自動儲存，隨時翻查盈虧及命中率。 |
| guest.historyCta | Log in | 登入 |
| guest.noAccount | No account? Sign up with just your mobile number — no password needed. | 未有帳戶？用手機號碼即可登記，毋須密碼。 |
| guest.accountTitle | Log in to manage your account | 登入以管理你的帳戶 |
| loading | Loading… | 載入中… |

---

## 7. Open questions (for PM / Eng)

1. When a guest logs in from the result banner, should the bets they just settled be saved (recommended), or only future bets?
2. Are the contact fields private to the member, or shown anywhere else? This decides whether the helper copy needs a visibility line.
3. Resend cooldown after the 1st send (60s assumed), plus the maximum number of sends per hour and per number, to fill in `{{min}}`.
4. Is the minimum age (18+) shown at sign-up? This is a practice app with no money involved, but it imitates gambling. A one-line 13px note under the consent line would cover it.
