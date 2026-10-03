# PRD — Membership (HK mobile + SMS OTP)

| | |
|---|---|
| Product | Post Time / 開跑前 (practice only, no real money) |
| Version | v1 |
| Status | Draft for build |
| Owner | PM |
| Readers | Design, Engineering, QA |
| Date | 2026-10-03 |

**Today:** anyone can open the app, and every visitor reads and writes one shared bet log
(`server/history.ts` → `history.json`, via `/api/history`). **After v1:** a member logs in with a Hong Kong
mobile number and an SMS code. Their bet history is stored on the server against their account. Guests
can still practise, but nothing they do is saved.

---

## 1. Goals / non-goals

### Goals
| # | Goal | Measure |
|---|---|---|
| G1 | One flow for both sign-up and login: HK mobile number + SMS OTP | A new number creates an account; a known number logs in |
| G2 | Each member's bet history is private and kept on the server | No request can read or write another member's history |
| G3 | Guests can do everything they can today except save history | Betting and settlement work with no account |
| G4 | Stop SMS abuse before it costs money | Turnstile + rate limits come before every send |
| G5 | Editable member profile | Name, description, avatar, Telegram, WhatsApp, email |
| G6 | Meet PDPO basics | Collect the minimum, mask phone numbers in logs, self-serve account deletion |

### Non-goals (v1)
- Passwords, magic links, social login (Google, Apple, Facebook…), passkeys.
- Non-HK login numbers. (A WhatsApp contact number may be in any country.)
- Changing the login phone number. A member who wants a new number deletes the account and signs up again.
- An admin panel, member search, or moderation tools.
- Public profiles or showing members to each other. In v1 the profile is visible **only to its owner**.
- Email verification. Email is a contact field only.
- Moving the old shared history into accounts. It is deleted (§5.8).
- Multi-device session management ("log out other devices"), beyond what account deletion does.

---

## 2. User stories and acceptance criteria

`M` = member (logged in), `G` = guest.

### 2.1 Register (new number)
**As a G, I want to sign up with my HK mobile so my practice bets are saved.**
- **Given** I am a guest and my number has no account, **when** I enter a valid HK mobile, pass Turnstile, and enter the correct 6-digit code, **then** an account is created, I am logged in (session cookie set), and I see the optional "Complete your profile" step.
- **Given** I am on the profile-completion step, **when** I tap Skip, **then** I go back to the view I started from, and my display name is the default `會員XXXX` / `Member XXXX` (last 4 digits of my number).
- **Given** I am on the profile-completion step, **when** I save a name (and optionally an avatar), **then** both are stored and I go back to the view I started from.
- `signup_success` fires once. `login_success` does not fire for this login.

### 2.2 Login (existing number)
- **Given** my number already has an account, **when** I complete the same phone → Turnstile → code flow, **then** I am logged in, I do **not** see profile completion, and I go back to the view I started from with my state kept (bet slip, picks, tab).
- **Given** I enter a wrong code, **then** I see "Incorrect code" with the attempts left, and the session is not created.
- **Given** I use up the attempts (§3.3), **then** the code is invalidated and I must request a new one.
- The UI and API respond the same way before the code is verified, whether or not the number is registered.

### 2.3 Logout
- **Given** I am a member, **when** I tap Log out (profile menu), **then** the server deletes my session, the cookie is cleared, the header shows Log in, and the History tab shows the login CTA.
- **Given** I logged out on device A, **when** someone replays the old cookie, **then** they get `401`.

### 2.4 Session persistence
- **Given** I logged in, **when** I close and reopen the browser within 30 days, **then** I am still logged in.
- **Sliding expiry:** each authenticated request moves the expiry to now + 30 days. To limit DB writes, the server only does this if the last move was more than 24 h ago.
- **Given** I have not visited for more than 30 days, **then** the session has expired, I am treated as a guest, and the expired row is purged.

### 2.5 Profile view / edit (per field)
| Field | Story | Acceptance |
|---|---|---|
| Phone (login) | View only | Shown masked except on the profile page (`+852 9123 4567`). Not editable. |
| Display name | Edit | Required, 1–30 chars after trim. Saving an empty value is blocked with an inline error. |
| Description | Edit | Optional, ≤ 200 chars. Live counter `n/200`. Empty → stored as null. |
| Telegram ID | Edit | Optional. A leading `@` is stripped on save. Displayed as `@id`. Invalid format → inline error. |
| WhatsApp | Edit | Optional. Any country. A **"Same as login number"** checkbox/button fills it with the login number. Stored as E.164. |
| Email | Edit | Optional. RFC-lite check (§4). Stored lower-cased. |

- **Given** I change one or more fields, **when** I press Save, **then** only the changed fields are sent (`PATCH`), a success toast appears, and `profile_updated` fires once per changed field.
- **Given** the server rejects a field, **then** that field shows the server error and the other fields keep my edits.
- **Given** I clear an optional field and save, **then** it is stored as null.

### 2.6 Avatar
- **Upload:** **Given** I have no avatar, **when** I pick a PNG/JPEG/WebP ≤ 2 MB, **then** a preview appears, it uploads, and it shows as a circle in the header and on the profile page.
- **Replace:** uploading again replaces the old avatar, and the old file is deleted from disk.
- **Remove:** **when** I tap Remove avatar and confirm, **then** the file is deleted and initials (the first character of the display name, on navy) are shown instead.
- Wrong type or > 2 MB is rejected on the client before upload (with the server rejecting it too): "PNG, JPEG or WebP, up to 2 MB".
- No avatar → initials fallback everywhere.

### 2.7 Guest betting and save prompt
- **Given** I am a guest, **when** I Place bet → Confirm, **then** the bets settle and the result modal shows HIT/MISS exactly as today. Nothing is sent to `/api/history`.
- **Then** the result modal shows a banner: "登入以儲存紀錄 / Log in to save your record" with a gold **Log in** button.
- **Given** I tap Log in in that banner and finish logging in, **then** the bets settled since the page loaded (kept in memory, at most 20) are uploaded to my history once, and I see "N 項紀錄已儲存 / N records saved". (See Open Question 1.)
- **Given** I dismiss the banner, **then** it does not return until my next Confirm.
- **Given** I am a guest, **when** I open the History tab, **then** I see a login CTA panel (title, one-line benefit, gold Log in button) instead of entries.

### 2.8 Member history
- **List:** **Given** I am a member, **when** I open History, **then** I see only my entries, newest first, with today's totals (cost, return, net, hits, ROI).
- **Auto-save:** **Given** I am a member, **when** I Confirm, **then** each settled bet is saved to my account. If a save fails, an error shows and the result is still displayed.
- **Delete one:** removes only that entry, after the existing per-row action. Other members are not affected.
- **Clear all:** asks for confirmation ("Clear all N records?"), then deletes all my entries.
- **Cap:** at most 1,000 entries per member. Saving entry 1,001 drops the oldest. Not shown in the UI.
- **Given** my session expires while I am on History, **then** the next call returns `401`, and the UI switches to guest state and shows the login CTA.

### 2.9 Language
- All new UI strings are in both `zh-HK` (default) and `en`, in new namespaces `auth` and `profile` under `src/i18n/locales/{zh-HK,en}/`. They are checked by `i18n.test.ts` (same shape in both locales).
- Server errors are **codes** (§7). The client maps each code to a localized message. No server-built prose is shown to the user.
- The OTP SMS is sent in the current UI language (Twilio Verify `locale`: `zh-hk` or `en`).
- Switching language during the login flow keeps the entered phone number and the code timer.

### 2.10 Delete my account
- **Given** I am a member on Profile, **when** I tap "Delete my account", **then** a confirmation dialog explains what is removed and requires me to type `DELETE` (en) / `刪除` (zh-HK).
- **When** I confirm, **then** my profile, avatar file, all history, all sessions (every device) and my rate-limit/OTP rows are deleted, the cookie is cleared, and I land on the Bet tab as a guest with the toast "Account deleted".
- If I later sign in with the same number, I get a brand-new empty account.

---

## 3. Flows

### 3.1 Entry points
| Entry | Where | After login, go back to |
|---|---|---|
| Header **Log in** (gold) | Top navy bar, next to LangSwitch | Current view |
| History tab CTA | History (guest) | History |
| Save prompt | Result modal (guest) | Bet view + upload pending results |

Login is a **modal sheet** over the current view (bottom sheet on phone, centered dialog on desktop), not a route change. That keeps the bet slip, picks and tab state. Profile is a new view, `?tab=profile`, reached from the avatar menu.

### 3.2 Step by step
```
[1 Phone]──Turnstile ok──▶ POST /otp/start ──▶ [2 Code]──POST /otp/check──▶ verified
    ▲                                              │                          │
    └──────────── "Change number" ─────────────────┘           isNew? ──yes──▶ [3 Complete profile (skippable)]
                                                                  │                          │
                                                                  no                         ▼
                                                                  └────────▶ [4 Back to origin view]
```

1. **Phone.** Fixed `+852` prefix chip and a numeric input (`inputmode="tel"`, `autocomplete="tel-national"`). The client normalises as the user types (§4.1). **Send code** stays disabled until the number is valid *and* Turnstile has produced a token.
2. **Turnstile.** The managed widget renders under the input, in the matching theme and language. The token is sent with `/otp/start` and is single-use. On any `/otp/start` error the widget is reset.
3. **Send OTP.** `POST /api/auth/otp/start`. On success, show step 2 with "Code sent to +852 9123 4567".
4. **Code entry.** Six digits, one field (`inputmode="numeric"`, `autocomplete="one-time-code"`). Pasting works. The code is submitted automatically when the 6th digit is entered.
   - **Resend** is disabled with a countdown "Resend in 60s". When it reaches 0, Resend is enabled and needs a **new** Turnstile token (widget shown again).
   - **Change number** returns to step 1 with the number filled in.
5. **Verified.** The server sets the session cookie and returns `{ user, isNew }`. The client stores the user in app state.
6. **New user:** Complete profile — display name (prefilled with the default) and optional avatar, with **Save** and **Skip**. The other fields are on the Profile page later.
7. **Return** to the origin view. If the save prompt started the login, upload the pending results.

### 3.3 OTP parameters
| Parameter | Value | Enforced by |
|---|---|---|
| Code length | 6 digits | Twilio Verify service config / mock |
| Expiry | 10 min (Verify default) | Verify / mock |
| Max check attempts per code | 5, then the code is dead and a new send is needed | Our server (counted in `otp_challenges`) **and** Verify |
| Resend cooldown | 60 s per phone | Our server (authoritative) + UI countdown |
| New send while a code is live | Allowed after the cooldown. Verify re-sends the same pending verification; mock issues a new code. | — |
| Channel | SMS only | — |

---

## 4. Validation rules

The client and the server share one module (`shared/validation.ts`). **The server is authoritative.**

### 4.1 HK login mobile
- Normalise: strip spaces, dashes, dots and parentheses. Remove a leading `+852`, `852` or `00852`, but **only** when 8 digits remain after removing it.
- Valid: exactly 8 digits, matching `^[456789]\d{7}$`. Stored as E.164 `+852XXXXXXXX`.
- Rejected: landlines (`2…`, `3…`), anything other than 8 digits, other country codes.
- Examples: `9123 4567` ✓ · `+852-9123-4567` ✓ · `85291234567` ✓ · `2345 6789` ✗ (landline) · `+86 13800138000` ✗.
- Error code `invalid_phone`. Copy: "請輸入有效的香港手機號碼 / Enter a valid Hong Kong mobile number".

### 4.2 Profile fields
| Field | Rule | Normalisation | Error code |
|---|---|---|---|
| displayName | 1–30 chars (Unicode code points) after trim. No control chars. | Trim, collapse inner whitespace | `invalid_name` |
| description | 0–200 chars. Newlines allowed (max 5). No other control chars. | Trim; empty → null | `invalid_description` |
| telegram | `^[A-Za-z0-9_]{5,32}$` after stripping one leading `@` | Strip `@`; empty → null | `invalid_telegram` |
| whatsapp | E.164: `^\+[1-9]\d{7,14}$` after normalising | Strip spaces/dashes/parentheses. Must start with `+` (UI hint: include country code). `sameAsLogin: true` → login number. | `invalid_whatsapp` |
| email | RFC-lite: ≤ 254 chars, `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$`, one `@` | Trim, lower-case; empty → null | `invalid_email` |
| avatar | PNG / JPEG / WebP, ≤ 2 MB, type identified by **magic bytes** (not extension or MIME). Max 4096×4096 px. | Server re-encodes to a 256×256 WebP centre-crop, which strips EXIF/GPS. Shown as a circle. | `unsupported_type`, `file_too_large` |

Text output is escaped by React by default. Profile fields are never rendered as HTML.

---

## 5. Abuse and security requirements

| # | Requirement |
|---|---|
| 5.1 **Turnstile** | Every `/otp/start` checks the token server-side (`siteverify` with `remoteip`) **before** any rate-limit write or SMS. A missing, invalid or reused token → `400 turnstile_failed`. Resend needs a fresh token. |
| 5.2 **Rate limits (send)** | Per phone: 1 / 60 s, 5 / hour, 10 / 24 h. Per IP: 20 / hour. A limit hit → `429 rate_limited` with `retryAfter` (seconds). Checked after Turnstile, before sending. Every attempt that passes Turnstile counts. |
| 5.3 **Rate limits (check)** | 5 wrong codes per challenge (§3.3). Per IP: 30 checks / hour. |
| 5.4 **No enumeration** | `/otp/start` returns the same 200 body and similar timing whether or not the number is registered. Errors never say "not registered". `isNew` is returned only after a successful check. |
| 5.5 **SMS fraud** | In the Twilio console, set Verify Geo-permissions to **Hong Kong only** and turn Fraud Guard on. The server also refuses non-`+852` numbers before calling Twilio. |
| 5.6 **Session** | 32 random bytes (`crypto.randomBytes`), base64url, in cookie `pt_session`: `HttpOnly; SameSite=Lax; Path=/; Max-Age=30d`, plus `Secure` when `NODE_ENV=production`. The DB stores only **SHA-256(token)**. A new session is issued on every login (no fixation). |
| 5.7 **CSRF** | SameSite=Lax, plus: mutating `/api/auth/*`, `/api/me*` and `/api/history*` requests must have an `Origin` matching `APP_ORIGIN` (or no Origin in dev). JSON bodies only, except avatar multipart. |
| 5.8 **Logout / deletion** | Logout deletes the session row and clears the cookie. Account deletion deletes every session of the user. |
| 5.9 **Avatar files** | Magic-byte check, size cap enforced while the upload streams, re-encoded (§4.2). Stored as `data/avatars/<random 128-bit hex>.webp`, never named from user input. Served by `GET /api/avatars/:file` (strict filename regex, `Content-Type: image/webp`, `X-Content-Type-Options: nosniff`, long cache). |
| 5.10 **Secrets** | Only in `.env` / the environment. Never in git, the client bundle or logs. `TURNSTILE_SITE_KEY` reaches the client only through `/api/config`. |
| 5.11 **Logging** | Production logs mask phone numbers: `+852****4567`. OTP codes are never logged in production. The mock provider logs `[otp:mock] +852****4567 code=123456` (dev only). Request bodies on auth routes are never logged. |
| 5.12 **Prod guards** | If `NODE_ENV=production`, the server **refuses to start** when `OTP_PROVIDER=mock` or the Turnstile test keys are configured. |
| 5.13 **Proxy / IP** | The client IP comes from `req.ip`, with `trust proxy` set from `TRUST_PROXY`, so per-IP limits work behind nginx/Cloudflare. |
| 5.14 **History integrity** | The server ignores any user id in the body. Ownership always comes from the session. The entry shape is validated, the body is capped at 8 KB, and the entry `id` is unique per user (a duplicate POST does nothing). |
| 5.15 **PDPO** | Collect only phone (required) and the optional profile fields. Update the Privacy page (`?tab=privacy`, both locales) to say: what is collected, why (login, saving practice history), that Twilio (SMS) and Cloudflare (bot check) process data, how long it is kept (until account deletion; OTP and rate-limit rows ≤ 24 h), and how to delete the account. In-app self-serve deletion (§2.10) is in v1. |
| 5.16 **Old shared history** | On first start with membership, delete `history.json` and remove `server/history.ts`. There is no migration. Release notes mention it. |

---

## 6. Data model (conceptual)

A new SQLite file, `data/members.sqlite` (path from `MEMBERS_DB`), separate from `momentum.sqlite`, so it can be backed up or wiped on its own. WAL mode. Schema migrations run on start, same as the existing DB.

| Table | Key columns | Notes |
|---|---|---|
| `users` | `id` (uuid), `phone_e164` UNIQUE, `display_name`, `description?`, `telegram?`, `whatsapp?`, `email?`, `avatar_file?`, `locale`, `created_at`, `updated_at`, `last_login_at` | One row per HK mobile |
| `sessions` | `id`, `user_id` FK→users ON DELETE CASCADE, `token_hash` UNIQUE, `created_at`, `last_seen_at`, `expires_at`, `user_agent` (truncated 200) | Purge expired rows on start + daily |
| `bet_history` | `id` (server pk), `user_id` FK CASCADE, `entry_id` (client `HistoryEntry.id`), `ts`, `data` (JSON of `HistoryEntry`), `created_at`; UNIQUE(`user_id`,`entry_id`); index (`user_id`,`ts` DESC) | Cap of 1,000 per user, enforced on insert |
| `otp_challenges` | `id`, `phone_e164`, `provider` (mock/twilio), `code_hash?` (mock only), `attempts`, `created_at`, `expires_at`, `status` (pending/approved/dead) | One live challenge per phone |
| `rate_events` | `id`, `kind` (`send`/`check`), `phone_e164?`, `ip`, `ts` | Sliding-window counts. Purge rows > 24 h. |

The API contract keeps `HistoryEntry` (`shared/types.ts`) unchanged. The server stores it as JSON and returns it as-is.

---

## 7. API contract

General rules:
- All under `/api`. JSON in and out, except the avatar upload.
- Error body: `{ "error": { "code": string, "field"?: string, "retryAfter"?: number } }`. The client localises by `code`.
- Auth comes from the `pt_session` cookie. A missing, invalid or expired session on a member-only route → `401 { error: { code: "unauthorized" } }`.
- `User` DTO: `{ id, phone: "+85291234567", displayName, description, telegram, whatsapp, email, avatarUrl: string|null, createdAt }`.

| Endpoint | Auth | Request | 200 response | Errors |
|---|---|---|---|---|
| `GET /api/config` | public | — | `{ turnstileSiteKey, otp: { length: 6, resendSeconds: 60 } }` | — |
| `POST /api/auth/otp/start` | public | `{ phone: string, turnstileToken: string, locale: "zh-HK"\|"en" }` | `{ ok: true, phone: "+852…" (normalised), resendIn: 60, expiresIn: 600 }`. Same body for new and existing numbers. | 400 `invalid_phone`, 400 `turnstile_failed`, 429 `rate_limited` (+`retryAfter`), 502 `otp_send_failed` |
| `POST /api/auth/otp/check` | public | `{ phone, code: "123456" }` | `{ user: User, isNew: boolean }` + `Set-Cookie` | 400 `invalid_phone`, 400 `invalid_code` (+`attemptsLeft`), 410 `code_expired` (expired, dead or none pending), 429 `too_many_attempts`, 429 `rate_limited` |
| `POST /api/auth/logout` | cookie optional | — | `{ ok: true }`, cookie cleared (idempotent) | — |
| `GET /api/me` | optional | — | `{ user: User }` or `{ user: null }` for guests. No 401, so app boot stays quiet. | — |
| `PATCH /api/me` | member | Any subset of `{ displayName, description, telegram, whatsapp, whatsappSameAsLogin: true, email }`. `null` or `""` clears an optional field. | `{ user: User }` | 400 `validation_error` with the field-specific code and `field`, 401 |
| `POST /api/me/avatar` | member | `multipart/form-data`, field `avatar` (one file) | `{ user: User }` (new `avatarUrl`) | 400 `unsupported_type`, 413 `file_too_large`, 401 |
| `DELETE /api/me/avatar` | member | — | `{ user: User }` (`avatarUrl: null`) | 401 |
| `DELETE /api/me` | member | `{ confirm: "DELETE" }` | `{ ok: true }`, cookie cleared | 400 `confirm_required`, 401 |
| `GET /api/avatars/:file` | public | — | WebP bytes | 404 |
| `GET /api/history` | member | — | `HistoryEntry[]` newest first (max 1,000) | 401 |
| `POST /api/history` | member | `HistoryEntry` **or** `{ entries: HistoryEntry[] }` (≤ 20, for the post-login upload of pending results) | `HistoryEntry[]` (the full list) | 400 `invalid_entry`, 401 |
| `DELETE /api/history/:id` | member | — | `HistoryEntry[]` | 401 (an unknown id is a no-op returning the list) |
| `DELETE /api/history` | member | — | `[]` | 401 |

Unchanged and public: `/api/settle`, `/api/days`, `/api/meeting`, `/api/race`, `/api/result`, `/api/analyzer`, `/api/momentum/*`, `/api/race-analysis`, `/api/names/*`, `/api/data/*`.

OTP provider interface (server): `start(phoneE164, locale) → void` and `check(phoneE164, code) → "approved" | "wrong" | "expired"`. There are two implementations:
- `twilio`: Verify v2 `Verifications` / `VerificationCheck`.
- `mock`: a random 6-digit code, hashed into `otp_challenges` and logged to the console.

---

## 8. Config / env variables

Add these to `.env.example` with comments.

| Variable | Default (dev) | Notes |
|---|---|---|
| `OTP_PROVIDER` | `mock` | `mock` \| `twilio`. `mock` is refused in production. |
| `TWILIO_ACCOUNT_SID` | — | Required when `twilio` |
| `TWILIO_AUTH_TOKEN` | — | Required when `twilio`. Secret. |
| `TWILIO_VERIFY_SERVICE_SID` | — | Verify service set to code length 6 |
| `TURNSTILE_SITE_KEY` | `1x00000000000000000000AA` | Cloudflare always-pass test key |
| `TURNSTILE_SECRET_KEY` | `1x0000000000000000000000000000000AA` | Always-pass test secret. Refused in production. |
| `MEMBERS_DB` | `data/members.sqlite` | Gitignored by the existing `data/*.sqlite*` rule |
| `AVATAR_DIR` | `data/avatars` | Add to `.gitignore` |
| `SESSION_TTL_DAYS` | `30` | Sliding |
| `APP_ORIGIN` | `http://localhost:5173` | Used by the Origin check. Production: the public https origin. |
| `TRUST_PROXY` | unset | e.g. `1` behind one reverse proxy |
| `OTP_RATE_PHONE_HOUR` / `OTP_RATE_PHONE_DAY` / `OTP_RATE_IP_HOUR` | `5` / `10` / `20` | Optional overrides |

QA-only Turnstile test keys (Cloudflare official):
- Site `2x00000000000000000000AB`: always blocks.
- Site `3x00000000000000000000FF`: forces an interactive challenge.
- Secret `2x0000000000000000000000000000000AA`: always fails.
- Secret `3x0000000000000000000000000000000AA`: returns token-already-spent.

---

## 9. Analytics

Use `track()` from `src/analytics.ts`. **No PII:** no phone, no user id, no name, no email, no free text.

| Event | When | Params |
|---|---|---|
| `otp_requested` | `/otp/start` returned 200 | `resend: boolean`, `lang` |
| `signup_success` | `/otp/check` 200 with `isNew: true` | `source: "header" \| "history" \| "save_prompt"` |
| `login_success` | `/otp/check` 200 with `isNew: false` | `source` (same values) |
| `profile_updated` | After a successful `PATCH /me` or avatar change, once per field | `field: "name" \| "description" \| "telegram" \| "whatsapp" \| "email" \| "avatar"`, `action: "set" \| "clear"` |
| `logout` | Logout succeeded | — |

The existing `practice_bet` event is unchanged; add `member: boolean` to it.

---

## 10. QA test checklist

Environment: `OTP_PROVIDER=mock` (read the code from the server console), Turnstile always-pass keys unless the test says otherwise. Run every UI case in **both zh-HK and en**, at desktop width and 390 px.

### Happy paths
- [ ] New number `9123 4567` → Turnstile → code from console → logged in, profile-completion step shown, Skip → back to the origin view; name is `會員4567` / `Member 4567`.
- [ ] Same number again after logout → no profile step; the bet slip and tab that were open before login are kept.
- [ ] Completion step: set a name + avatar → shown in the header.
- [ ] Reload the browser → still logged in. Close and reopen → still logged in.
- [ ] Logout → header shows Log in; History shows the CTA; `GET /api/history` with the old cookie → 401.
- [ ] Edit each profile field one at a time → saved, toast shown, persists after reload.
- [ ] Clear each optional field → stored null, the UI shows it empty.
- [ ] WhatsApp "Same as login number" → `+85291234567`.
- [ ] Telegram `@my_name` → saved as `my_name`, shown as `@my_name`.
- [ ] Avatar: upload PNG, replace with JPEG, replace with WebP, remove → initials. The old file is gone from `data/avatars` each time.
- [ ] Member Confirm → entries appear in History. Delete one → only that one goes. Clear all (confirm) → empty.
- [ ] Two members (two browsers) → each sees only their own history.
- [ ] Guest Confirm → result modal shows the save prompt; History network panel shows no POST. Log in from the prompt → those results are saved once, toast "N records saved".
- [ ] Guest History tab → login CTA, no entries, no 401 noise in the UI.
- [ ] Delete my account → typed confirmation → logged out; history, avatar file and sessions gone; logging in again with the same number → new empty account with `isNew: true`.
- [ ] Switch language mid-flow → phone and countdown kept; all new strings translated (no raw keys).
- [ ] OTP SMS locale follows the UI language (twilio staging only).

### Validation edge cases
- [ ] Phone accepted: `91234567`, `9123-4567`, `+852 9123 4567`, `85291234567`, `0085291234567`, numbers starting `4`, `5`, `6`, `7`, `8`.
- [ ] Phone rejected: `21234567`, `31234567`, `9123456` (7 digits), `912345678` (9 digits), `+86…`, letters, empty.
- [ ] Name: 0 chars / whitespace only ✗; 1 ✓; 30 CJK ✓; 31 ✗; emoji counts as 1.
- [ ] Description: 200 ✓, 201 ✗, counter correct; `<script>` is shown as literal text.
- [ ] Telegram: `abcd` (4) ✗, `abcde` ✓, 32 ✓, 33 ✗, `a-b-c-d-e` ✗, `@@abcde` ✗.
- [ ] WhatsApp: `+447911123456` ✓, `91234567` (no +) ✗ with a hint, `+0…` ✗.
- [ ] Email: `A@B.COM` stored `a@b.com`; `a@b`, `a@@b.com`, `a b@c.com` ✗.
- [ ] Avatar: 2 MB exactly ✓; 2 MB + 1 byte ✗ (413); GIF ✗; a `.png` file that is really a PDF ✗; an SVG renamed `.png` ✗; 5000×5000 ✗; a JPEG with GPS EXIF → downloaded avatar has no EXIF.
- [ ] Code: 5 digits cannot submit; pasting `123 456` works; a code after 10 min → `code_expired`.

### Session and auth
- [ ] Cookie flags: HttpOnly, SameSite=Lax, Secure in prod build, Max-Age ≈ 30 d.
- [ ] DB `sessions.token_hash` ≠ the cookie value.
- [ ] Sliding: set `expires_at` to now + 1 day in the DB, make a request → it moves to about +30 d.
- [ ] Expired session → `/api/me` returns `user: null`; History shows the CTA.
- [ ] Tampered or random cookie → 401 on member routes, guest elsewhere.
- [ ] A `PATCH /api/me` with a foreign `Origin` header → rejected.
- [ ] A POST to `/api/history` with another user's id in the body → saved to the caller's own account only.

### Abuse
- [ ] Turnstile always-fail secret → `turnstile_failed`; no SMS/mock code logged; no `rate_events` row.
- [ ] Reused Turnstile token → `turnstile_failed`.
- [ ] Resend before 60 s → button disabled; a direct API call → 429 with `retryAfter`.
- [ ] 6th send in 1 h for one phone → 429. 11th in 24 h → 429.
- [ ] 21 sends in 1 h from one IP across different phones → 429.
- [ ] 5 wrong codes → `too_many_attempts`; the correct code afterwards also fails; a new send is required.
- [ ] Registered vs unregistered number: identical `/otp/start` response body and status (compare raw responses).
- [ ] Production start with `OTP_PROVIDER=mock` or test Turnstile keys → server refuses to boot.
- [ ] Production logs: no full phone numbers, no codes.
- [ ] `GET /api/avatars/../members.sqlite` and other traversal patterns → 404.
- [ ] Old `history.json` is gone after upgrade; `/api/history` no longer returns the shared entries.

### Design (DESIGN.md §11)
- [ ] Log in button is the single gold CTA in the header; uses tokens, no raw hex.
- [ ] Login sheet usable at 390 px with the on-screen keyboard open; Turnstile widget not clipped.
- [ ] Focus order and labels are correct; error text is announced (`aria-live`).

---

## 11. Open questions for the owner

1. **Save after login:** when a guest logs in from the save prompt, should the results they just settled (this page visit only, max 20) be saved to their new account? *PM default: yes.*
2. **Profile visibility:** v1 profiles are private to the owner. Is there a planned use for Telegram/WhatsApp/email (e.g. a community or contact), and do we need the member's consent text for it now?
3. **Minimum age / gambling-adjacent disclaimer:** should sign-up ask the user to confirm they are 18+, given the HKJC context, even though no real money is involved?
4. **History cap:** is 1,000 saved bets per member enough?
5. **Production domain and Twilio budget:** confirm the public origin (for `APP_ORIGIN` and the Turnstile widget domain) and a monthly SMS spend cap to set in Twilio.
