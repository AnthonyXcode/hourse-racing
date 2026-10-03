# QA Report — Membership v1

Date: 2026-10-03 · QA · Branch `hkjc-reskin` (uncommitted working tree)
Environment: isolated API on :8899 (scratch `MEMBERS_DB` / `AVATAR_DIR`, mock OTP, Turnstile test keys), Vite on :5199 proxied to it, plus throwaway instances on :8897 (low rate limits, Turnstile fail secrets) and :8898 (production guard). The owner's :5173 / :8787 and `data/members.sqlite` were not touched. UI checked in Chrome at desktop width and in a 375 px same-origin iframe, in en and zh-HK.

## Verdict: **Ship** (updated after retest, see "Retest" at the end)

All 8 findings are fixed. Two new Low issues (QA-09, QA-10) are non-blocking follow-ups. The original verdict below is kept for history.

### Original verdict (first pass): Ship with fixes

Most of the system works: the OTP flow, rate limits, Turnstile, sessions, avatar handling, history scoping and account deletion. Two issues must be fixed before release:

- **QA-01:** the CSRF Origin check can be bypassed by changing the case of the path.
- **QA-02:** "Log out" in the phone account menu is covered by the bottom bars and can't be tapped.

Each fix is small.

## Findings

| ID | Severity | Area | Steps to reproduce | Expected | Actual | Evidence |
|---|---|---|---|---|---|---|
| QA-01 | **High** | Security / CSRF (PRD §5.7) | Log in, then send a mutating request with a foreign Origin to a mixed-case path, e.g. `curl -b jar -H 'Origin: https://evil.example' -H 'Content-Type: application/json' -X DELETE -d '{"confirm":"DELETE"}' http://localhost:8899/api/Me` | `403 bad_origin`, as for `/api/me` | Accepted. Express routes are case-insensitive, but the guard regex `PROTECTED = /^\/(auth\|me\|history)(\/\|$)/` in `server/members/routes.ts` is case-sensitive, so the Origin check and the JSON-only (415) check are both skipped. Verified for PATCH `/api/ME` and `/api/Me` (profile changed), DELETE `/api/History` (history cleared), POST `/api/Auth/logout` with `text/plain`, and DELETE `/api/Me` (**account deleted**). SameSite=Lax limits exposure from other sites, but same-site origins and future CORS changes would be fully exposed. Fix: add the `i` flag to the regex, or enable `caseSensitive` on the router. | `{"user":{…"displayName":"pwned via CSRF"…}} [200] /api/ME` · `[] [200] DELETE /api/History` · `{"ok":true} [200] POST /api/Auth/logout text/plain` · `{"ok":true} [200] DELETE /api/Me`, then `/api/me` → `{"user":null}` |
| QA-02 | **High** | UI / Account menu (phone) | Use a 375 px viewport as a member. On the Bet tab (or the Account page), tap the avatar to open the bottom-sheet menu. | All 3 items (Profile, Bet history, Log out) are tappable above the page. | The last row, **Log out / 登出**, is covered by the bet-slip bar (Bet tab) or the sticky Save bar (Account page). Cause: the sheet is `fixed z-50` but sits inside `<header>` (`sticky z-40`), which creates a stacking context. The page's own `fixed z-40` bars come later in the DOM and paint on top. The scrim is also under those bars. | Bet tab: `elementFromPoint` at the centre of 登出 (y 690–738 of 738) returns `<button … aria-label="打開投注區">` inside `DIV z=40 fixed inset-x-0 bottom-0`. Account page: returns the save bar `<div class="flex h-14 … "><button type="submit" form="account-form">`. Ancestor chain of the menu: `HEADER z=40 pos=sticky`. |
| QA-03 | Medium | Login modal (design spec §2 Step 2) | Send a code, tap **Change / 更改**, then tap **Send code** again for the same number within 60 s. | Back on step 1, the countdown is kept, so Send stays disabled or offers to return to the code step. | Send is enabled with no countdown. Re-sending gives "請求過於頻密，請於 1 分鐘後再試。" and blocks for 60 s. The user can't get back to step 2, even though the first code is still valid on the server. They have to wait and request a new SMS. | Step 1 after Change: `{"val":"6123 0011","disabled":false}`. After Send, errorBox: `請求過於頻密，請於 1 分鐘後再試。` and the server returns `429 rate_limited`. |
| QA-04 | Low | API error contract (PRD §7) | Send malformed JSON (`-d '{bad'` or `-d '"str"'`) or a body over 100 KB to any `/api/me` or `/api/history` route. | `400 {"error":{"code":"invalid_request"}}` / `413 {"error":{"code":"invalid_entry"}}`, per the error handler in `membersRouter` | Express's default **HTML** error page, with the full stack trace and absolute file paths in dev. The app-level `express.json()` fails before the members router runs, so the router's error middleware never sees the error. In production the stack is hidden, but the body is still HTML rather than the error-code shape, so the client shows the generic "Something went wrong" message. | `<pre>SyntaxError: Expected property name or '}' in JSON at position 1 … at parse (/Users/…/node_modules/body-parser/lib/types/json.js:92:19)` [400]; `PayloadTooLargeError: request entity too large` (HTML) |
| QA-05 | Low | Profile validation (PRD §4.2) | `PATCH /api/me {"displayName":"​"}` (a zero-width space), or `"‮evil"` (right-to-left override) | `invalid_name`. A name made only of invisible characters is effectively empty. | Accepted and stored. The header then shows a blank name, and the menu's aria-label is "Account menu, ​". Only U+3000 / normal whitespace is trimmed. | `{'displayName': '​'} [200]`, `{'displayName': '‮evil'} [200]` |
| QA-06 | Nit | Copy / i18n | As a guest, settle 1 bet, then use "Log in and save". | "1 bet saved to History" | "1 bets saved to History". `toast.savedBets` doesn't use i18next plurals. | Toast text: `1 bets saved to History` |
| QA-07 | Nit | Login modal a11y | Enter a wrong code, then the right code (new user) to reach step 3. | The step's live region announces the step change (design spec §5). | The sr-only `aria-live` region still holds the old "Incorrect code. 4 attempts left." on the Welcome step. It isn't updated or cleared on the step change. | Dialog innerText on step 3: `Welcome to Post Time\n\nIncorrect code. 4 attempts left.\n\nSet a name and photo…` |
| QA-08 | Nit | Welcome step | On step 3, type a name longer than 20 characters. | The counter turns `text-bad` (the account page already does this). | The counter shows `28/20` in muted grey. The error only appears on Done. | `counter: "28/20"`; class stays `text-ink-muted` (LoginModal.tsx has no over-limit style) |

## Passed

**Phone validation (API + UI)**
- [x] Accepted: `41234567`, `51…`, `61…`, `71…`, `81…`, `+852 9123 4568`, `9123-4569`, `85291234570`, `0085291234571`, `+852-9123-4572`, `(852) 9123.4573`. Each is normalised to `+852XXXXXXXX`.
- [x] Rejected with `400 invalid_phone`: `21234567`, `31234567`, 7 digits, 9 digits, `+86 13800138000`, letters, empty, `+85221234567`, full-width digits.
- [x] UI: a landline shows "Enter an 8-digit Hong Kong mobile number." under the field, with `aria-invalid` and `aria-describedby`.

**Turnstile**
- [x] Missing, empty or non-string token → `400 turnstile_failed`.
- [x] Always-fail secret `2x…AA` and spent-token secret `3x…AA` → `turnstile_failed`, with no mock code logged and 0 `rate_events` rows.
- [x] The widget is reset after each send.

**OTP**
- [x] Wrong codes count down `attemptsLeft` 4 → 3 → 2 → 1, then `429 too_many_attempts`. The correct code afterwards → `410 code_expired`.
- [x] A pasted code with a space (`"357 858"`) is accepted.
- [x] An expired challenge (forced in the DB) → `410 code_expired`.
- [x] Resend within 60 s → `429 rate_limited, retryAfter:60`.
- [x] Rate limits at overridden values: per phone per hour (3) → `retryAfter:600`; per phone per day (4) → `retryAfter:14400`; per IP per hour (6) → 7th send `429 retryAfter:3600`; check endpoint per IP 30/h → 429.
- [x] Registered and unregistered numbers get an identical 200 body (`{"ok":true,"phone":…,"resendIn":60,"expiresIn":600}`).
- [x] UI: wrong code clears the input, refocuses it, and shows the attempts left in the field error and the live region. Auto-submits at 6 digits.

**Session**
- [x] Cookie: `pt_session=…; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`, no `Secure` in dev.
- [x] The DB stores only the SHA-256 hash of the token.
- [x] `/api/me` returns `{user:null}` for guests and the user for members.
- [x] Logout clears the cookie. Replaying the old cookie → 401 on `/api/history` and `{user:null}` on `/api/me`.
- [x] Sliding expiry: with `last_seen` 2 days old and `expires` +1 day, the next request moves expiry to +720 h and re-sends the cookie. A second request doesn't re-send it.
- [x] An expired session → guest, and the row is purged.
- [x] A bogus cookie → 401.
- [x] Foreign Origin on lowercase paths: POST, PATCH, DELETE, `otp/start`, `Origin: null` and `localhost.evil.com` → `403 bad_origin`. `text/plain` → 415.
- [x] A session ending mid-visit: opening History drops to guest state with the CTA and no error.

**Profile (API + UI)**
- [x] Name: empty, whitespace or null → `invalid_name`; 1 character, 20 CJK and 20 emoji accepted; 21 CJK rejected; inner whitespace collapsed; control characters rejected.
- [x] Description: 160 accepted, 161 rejected; 6 lines accepted, 7 rejected; tab rejected; `""` → null.
- [x] Telegram: `@my_name` → `my_name`; 4 / 33 characters, `a-b-c-d-e`, `@@abcde`, a space and a number type rejected; 5 and 32 characters accepted.
- [x] WhatsApp: `+447911123456` accepted; `91234567`, `+0…`, too short and too long rejected; `(+852) 9123 4567` → `+85291234567`; `whatsappSameAsLogin:true` → the login number, overriding `whatsapp`.
- [x] Email: `A@B.COM` → `a@b.com`; `a@b`, `a@@b.com`, `a b@c.com`, `a@b.c` rejected.
- [x] Unknown keys (`phone`, `id`) are ignored.
- [x] UI: client validation shows all 4 field errors and focuses the first. PATCH sends only changed fields (`{"whatsappSameAsLogin":true}`, then `{"description":null,"telegram":null,"email":null}`). The "Changes saved" toast appears. The unsaved-changes guard appears on tab switch, focuses "Keep editing", and Discard works.
- [x] XSS: the name `<img src=x onerror=>` and the description `<script>alert(1)</script>…` render as text. No `img[src=x]` in the DOM, 0 alert calls, and the aria-label shows the literal text.

**Avatar**
- [x] PNG, JPEG and WebP are accepted and served as `image/webp` 256×256, with `nosniff` and an immutable cache header.
- [x] A JPEG with EXIF and GPS → output has `exif:false icc:false xmp:false`, and the strings `QA-Camera` and `GPS` are absent.
- [x] Exactly 5 MB accepted; 5 MB + 1 byte, 5.9 MB and 6 MB → `413 file_too_large`.
- [x] Rejected with `400 unsupported_type`: text renamed `.png`, SVG, SVG renamed `.png`, GIF, 5000×5000 JPEG, wrong field name, non-multipart.
- [x] The old file is removed on replace and on delete (directory count stays 1, then 0).
- [x] Traversal and odd names (`..%2F…`, `%2e%2e%2f…`, upper-case hex, `%00`) → 404. Plain `../` is normalised by the client to a non-avatar route, which returns the SPA HTML (not a file read).
- [x] UI: the client rejects SVG and over-5 MB files before upload, shows a server rejection under the avatar row, and the header shows the uploaded avatar. Remove works.

**History**
- [x] Guest → 401 on GET, POST, DELETE all and DELETE one.
- [x] Members are scoped: B's GET is `[]`; B's DELETE of A's id and B's clear all leave A's 21 entries intact.
- [x] A duplicate id is a no-op.
- [x] Batch of 20 accepted; 21 or empty → `invalid_entry`.
- [x] The 1,000 cap trims the oldest (1,000 kept, all oldest `fb*` gone).
- [x] `userId` in the body is ignored and dropped.
- [x] Clear all works.

**Guest flow (UI)**
- [x] Win + Place + Win as a guest → Confirm: the result modal shows the banner and no `/api/history` request is made.
- [x] "Log in and save" → login modal at z-60, focus on the phone field → code from the log → toast "3 bets saved to History". The server has the entries and History shows them.
- [x] The new-user variant (Welcome → Done) works the same.
- [x] A member's Confirm POSTs and shows no banner.

**Account deletion**
- [x] API: `confirm` other than `"DELETE"` → 400. On success the cookie is cleared; users, sessions on both devices, history, OTP and rate-limit rows are gone; the avatar file is deleted; the old second-device cookie → 401.
- [x] The same number re-registers fresh with `isNew:true`.
- [x] UI (zh-HK, 375 px): Confirm stays disabled until the last 4 digits match, and initial focus is on Cancel. Afterwards the toast "你的帳戶已刪除" shows, the view is Bet, and the header shows 登入.

**UI and design**
- [x] No horizontal overflow at 375 px (scrollWidth = clientWidth) on Bet, History, Account (guest and member).
- [x] The header Log in pill's hit area is 66×44. The avatar button and close ✕ are 44 px. Menu items are 48 px on phone and 44 px on desktop.
- [x] Phone inputs are 16 px.
- [x] Raw colour values: 0 in `src/members`.
- [x] One gold CTA per view (guest History and Account show only the gold Log in).
- [x] zh-HK and en strings render, and all 95 `account:` keys used in code exist in both locales.
- [x] The menu supports arrow keys and Esc, and Esc returns focus to the trigger.
- [x] The login modal closes on Esc and returns focus to the opener.

**Production guard**
- [x] With `NODE_ENV=production`, the server exits with code 1 for: mock OTP, `Mock`, test Turnstile keys (`1x…`, `2x…`), a missing single Twilio variable, and all Twilio variables missing.
- [x] It starts only with real-looking keys and all Twilio variables set (killed by timeout).

**Regression**
- [x] Trio with banker 1 and legs 2, 3, 4 = 3 bets; unit $20 → $60.
- [x] The 5 s Confirm countdown goes from (5s) to (3s), then auto-settles.
- [x] Replay links in Past runs open in a new tab and have aria-labels.
- [x] Trio, Win / Place, Momentum and Settings tabs load.
- [x] `npm run typecheck`: pass.
- [x] `npx vitest run`: 13 files, 205 tests pass.
- [x] `npx vite build` (to a scratch outDir): pass.

## Not tested

- **Real Turnstile widget challenge, Twilio SMS and the SMS locale.** These need real keys or a Twilio staging account.
- **On-screen keyboard overlap and iOS autofill.** No real phone. The 375 px checks ran in an iframe in desktop Chrome.
- **Real browser close and reopen to confirm the session persists.** Persistence was confirmed by reloading the page and by the cookie's `Max-Age`.
- **Visual check of reduced-motion and slide animation.** Animations don't advance in the automated tab, so I finished them in script before measuring layout.
- **A browser-driven CSRF page for QA-01.** I confirmed the bypass with curl. Real-browser exploitability is limited by SameSite=Lax.
- **Production log masking with real traffic.** Mock logs show only `+852****NNNN`.

---

## Retest (2026-10-03, after the engineer's fixes)

Same setup as the first pass: a fresh temp DB on :8899, my own Vite on :5199, the 375 px iframe for phone checks, and a throwaway production-mode instance on :8898 for the Origin checks. I retested each ID with its original repro steps plus the variants the engineer listed.

| ID | Result | Evidence |
|---|---|---|
| QA-01 | **Fixed** | With `Origin: https://evil.example`, every variant returned `403 bad_origin`: `/api/ME`, `/api/Me`, `/api/me/`, `/api//me`, `/api/ME/`, `/api/me?x=1`, `/api/HISTORY`, `/api/History/`, `/api/HISTORY/X`, `/api/Auth/logout`, `/api/auth/LOGOUT/` (text/plain), `/api/AUTH/otp/START`, DELETE `/api/mE`, POST `/api/Me/Avatar` (multipart), DELETE `/api/ME/AVATAR`. `Origin: null` also returned 403.<br>`/api/%4De` → 404: the route doesn't match, so nothing runs. `X-HTTP-Method-Override` is ignored: POST /api/me → 404, GET stays a read. HEAD maps to GET (read-only). OPTIONS returns only `Allow` with no CORS headers. PUT → 404.<br>In production mode (:8898, `APP_ORIGIN=https://posttime.example`), these all returned `403`: no Origin with only a Referer, no Origin at all, `null`, and `http://localhost:5173`. The app origin with or without a trailing slash passes the guard (then `401`).<br>A missing Origin is accepted in dev only, as PRD §5.7 specifies. `POST /api/settle` from the app → 200. |
| QA-02 | **Fixed** | At 375 px, the phone sheet is portalled to `<body>` (`DIV z=50 fixed inset-0 z-50 sm:hidden`). On the Account page, `elementFromPoint` at each item's centre returns the item: 個人資料 y=596–644, 投注紀錄 644–692, 登出 692–740. Tapping 登出 at that point logged out on both the Bet tab and the Account page (`/api/me` → `{user:null}`, header shows 登入, Account → Bet).<br>Focus moves to the first item. Esc closes the menu and returns focus to the trigger. The body is scroll-locked.<br>Desktop popover: rect 1187–1427 × 50–249 inside a 1718 px viewport, so it isn't clipped. All 3 items are hit-testable. |
| QA-03 | **Fixed** (original repro) | Send → Change → Send again for the same number returns to the code step with **no** `/otp/start` request, and the countdown continues ("Resend in 55s"). A residual edge case is logged as QA-10. |
| QA-04 | **Fixed** | All return `application/json`: `{bad` → `400 {"error":{"code":"bad_request"}}`, `"str"` → 400 bad_request, a 200 KB body → `413 bad_request`, an unsupported charset → `415 bad_request`, bad JSON on `/api/settle` and `/api/auth/otp/start` → 400. A thrown error → `500 {"error":{"code":"server_error"}}`.<br>The avatar routes still return their own codes (`413 file_too_large`; exactly 5 MB → 200).<br>Unknown routes (e.g. `PATCH /api/%4De`) still get Express's HTML "Cannot PATCH" 404. That's outside QA-04's scope; noted only. |
| QA-05 | **Fixed** | Rejected with `invalid_name`: U+200B, ×3, U+202E alone, U+FEFF, U+00AD, U+2060, U+200D alone, U+200C alone, U+034F, U+FE0F alone, U+180E, U+2028, a lone combining mark.<br>Format characters are stripped from mixed names: `‮evil` → `evil`, `a​b` → `ab`, 30× U+200B + 20 letters → 20 letters.<br>ZWJ sequences are kept: 👨‍👩‍👧, 🏳️‍🌈, and Devanagari क्‍ष.<br>A remaining gap is logged as QA-09. |
| QA-06 | **Fixed** | Toast reads "1 bet saved to History". en uses `savedBets_one` / `savedBets_other` with `count`; zh-HK has both forms. |
| QA-07 | **Fixed** | After a wrong code, the live region reads "Incorrect code. 4 attempts left." On reaching Welcome it reads "Welcome to Post Time"; the stale error is gone. |
| QA-08 | **Fixed** | Welcome counter at 21 characters: `21/20` with class `text-bad` (rgb 180,35,44). At 20: `20/20` muted, with the near-limit hint "20 of 20 characters used". |

### New findings

| ID | Severity | Area | Steps to reproduce | Expected | Actual | Evidence |
|---|---|---|---|---|---|---|
| QA-09 | Low | Profile validation | `PATCH /api/me` with `{"displayName":"ㅤ"}` (Hangul filler), `"ᅟ"` (Hangul choseong filler) or `"⠀"` (Braille blank) | `invalid_name`. These render as blank and are the usual way to make an "invisible name". | Accepted. They are letter/symbol categories (`Lo` / `So`), so neither the `Cf` strip nor the `VISIBLE` check catches them. Fix: add U+3164, U+115F, U+1160, U+FFA0 and U+2800 to the stripped set. | `'ㅤ'`, `'ᅟ'`, `'⠀'` returned as `displayName` [200] |
| QA-10 | Low | Login modal | Send to number A → Change → send to number B (200) → Change → enter A again (A's cooldown still running) → Send. | Return to A's code step (A's code is still valid), or show A's remaining countdown. | The client only remembers the **last** number sent, so it POSTs `/otp/start` for A → `429`, shows "Too many requests. Try again in 1 min.", and disables Send for 60 s for **every** number, including B, whose code is still valid. The user has to wait and request a new SMS. | `/api/auth/otp/start` 200 (A), 200 (B), 429 (A). Then entering B: Send `disabled: true` |

### Regression (all passed)
- [x] Full login with a new number from the guest save banner: wrong code, then the right code, Welcome → Done with a name.
- [x] The guest bet was uploaded: toast "1 bet saved to History", `/api/history` length 1. The guest Confirm sent only `POST /api/settle` (200) and no history request.
- [x] Profile save (zh-HK, 375 px): name 陳大文 plus a PNG avatar → toast 已儲存更改, `/api/me` shows the name and a `/api/avatars/….webp` URL.
- [x] Avatar upload via API: exactly 5 MB → 200, over the limit → 413 `file_too_large`.
- [x] Account deletion in the UI (last 4 digits 5602): toast 你的帳戶已刪除, view → Bet, `/api/me` → null. The user row, history and avatar file are gone.
- [x] `npm run typecheck`: pass.
- [x] `npx vitest run`: 13 files, 212 tests pass (up from 205).
- [x] `npx vite build` (scratch outDir): pass.

### Retest verdict: **Ship**
All 8 first-pass findings are fixed. QA-09 and QA-10 are Low edge cases and can follow in a patch.
