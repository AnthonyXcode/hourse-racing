// Membership API (PRD §7): config, SMS-OTP login, profile, avatar, per-member history.
// Mounted at /api. Errors are `{ error: { code, … } }`; request bodies on these routes are never logged.
import express, { Router, type NextFunction, type Request, type RequestHandler, type Response } from "express";
import { createReadStream, existsSync } from "fs";
import type { HistoryEntry, Member, MemberLocale, PublicConfig } from "../../shared/types";
import { AVATAR_MAX_BYTES, OTP_LENGTH, OTP_TTL_SECONDS, RESEND_SECONDS, maskPhoneLog, normalizeHkMobile, validateProfilePatch } from "../../shared/validation";
import type { MembersConfig } from "./config";
import type { MembersDB } from "./db";
import { AvatarError, multipartFile, processAvatar, type AvatarFiles } from "./avatar";
import { BATCH_MAX, parseEntry, type HistoryStore } from "./history";
import type { OtpChallenges } from "./otp";
import { checkRules, sendRules, type RateLimiter } from "./rateLimit";
import { COOKIE, clearedCookie, parseCookies, sessionCookie, type SessionStore } from "./sessions";
import { toMember, type UserRow, type UserStore } from "./users";

export interface MembersDeps {
  cfg: MembersConfig;
  db: MembersDB;
  users: UserStore;
  sessions: SessionStore;
  history: HistoryStore;
  limiter: RateLimiter;
  otp: OtpChallenges;
  avatars: AvatarFiles;
  verifyTurnstile: (token: unknown, ip: string | undefined) => Promise<boolean>;
  log?: (line: string) => void;
  /** Credits integration (server/credits). Absent in membership-only tests. */
  hooks?: MemberHooks;
}

/** What the credits feature adds to membership flows. */
export interface MemberHooks {
  config(): Pick<PublicConfig, "features" | "credits">;
  /** After a successful code check: signup bonus for new members. */
  onLogin(user: UserRow, isNew: boolean): void;
  /** On GET /api/me for a member: the lazy signup bonus for members created before credits. */
  onAuthenticated(user: UserRow): void;
  /** Extra Member DTO fields (adultDeclaredAt). */
  extendMember(user: UserRow): Partial<Member>;
  /** Inside the account-deletion transaction, before the user row goes. */
  beforeDelete(user: UserRow): void;
  /** The member's LIVE bets as History rows (merged with practice rows; not deletable). */
  liveHistory(userId: string): HistoryEntry[];
}

const DEFAULT_PUBLIC: Pick<PublicConfig, "features" | "credits"> = {
  features: { liveBetting: false, purchases: false },
  credits: { signupBonus: 0, minUnit: 10, termsVersion: "", dailyCapHkd: 0 },
};

type Extra = { field?: string; detail?: string; retryAfter?: number; attemptsLeft?: number };
export const fail = (res: Response, status: number, code: string, extra: Record<string, unknown> & Extra = {}) => res.status(status).json({ error: { code, ...extra } });

const LOCAL = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

/** Member attached by `withMember`. */
export type MemberReq = Request & { member?: UserRow | null };

/**
 * Session and CSRF middleware, shared with the credits router so every member route behaves the same.
 * `csrf()` must guard every state-changing member route (attached per route, not matched on req.path).
 */
export function authKit(d: Pick<MembersDeps, "cfg" | "sessions" | "users">) {
  const { cfg } = d;
  const csrf =
    (allowMultipart = false): RequestHandler =>
    (req, res, next) => {
      const origin = req.get("origin")?.replace(/\/$/, "");
      const ok = origin ? cfg.appOrigins.includes(origin) || (!cfg.production && LOCAL.test(origin)) : !cfg.production;
      if (!ok) return fail(res, 403, "bad_origin");
      const hasBody = Number(req.get("content-length") ?? 0) > 0 || req.get("transfer-encoding") != null;
      if (hasBody && !req.is("application/json") && !(allowMultipart && req.is("multipart/form-data"))) return fail(res, 415, "unsupported_media_type");
      next();
    };
  /** Resolve the session cookie to a member (null for guests), sliding the expiry when due. */
  const withMember = (req: MemberReq, res: Response, next: NextFunction) => {
    const token = parseCookies(req.headers.cookie)[COOKIE];
    const s = d.sessions.lookup(token);
    const user = s ? d.users.byId(s.userId) : null;
    if (s?.refreshed && user && token) res.append("Set-Cookie", sessionCookie(token, d.sessions.ttlMs, cfg.production));
    req.member = user;
    next();
  };
  const requireMember = (req: MemberReq, res: Response, next: NextFunction) =>
    withMember(req, res, () => (req.member ? next() : fail(res, 401, "unauthorized")));
  const me = (req: Request) => (req as MemberReq).member!;
  return { csrf, withMember, requireMember, me };
}

export function membersRouter(d: MembersDeps): Router {
  const { cfg } = d;
  const log = d.log ?? ((l: string) => console.error(l));
  const r = Router();
  const ip = (req: Request) => req.ip ?? req.socket.remoteAddress ?? "unknown";
  const { csrf, withMember, requireMember, me } = authKit(d);
  const hooks = d.hooks;
  const dto = (u: UserRow): Member => ({ ...toMember(u), ...hooks?.extendMember(u) });
  /** Practice rows merged with LIVE rows, newest first. */
  const historyFor = (userId: string): HistoryEntry[] =>
    hooks ? [...d.history.list(userId), ...hooks.liveHistory(userId)].sort((a, b) => b.ts.localeCompare(a.ts)) : d.history.list(userId);

  /** Mutating routes: always behind the CSRF guard. Use these, never r.post/patch/delete directly. */
  const post = (path: string, ...h: RequestHandler[]) => r.post(path, csrf(), ...h);
  const patch = (path: string, ...h: RequestHandler[]) => r.patch(path, csrf(), ...h);
  const del = (path: string, ...h: RequestHandler[]) => r.delete(path, csrf(), ...h);

  r.get("/config", (_req, res) => {
    const body: PublicConfig = {
      turnstileSiteKey: cfg.turnstile.siteKey,
      otp: { length: OTP_LENGTH, resendSeconds: RESEND_SECONDS },
      ...(hooks?.config() ?? DEFAULT_PUBLIC),
    };
    res.json(body);
  });

  // ---- Login ----
  post("/auth/otp/start", async (req, res) => {
    const phone = normalizeHkMobile(req.body?.phone);
    if (!phone) return fail(res, 400, "invalid_phone");
    const locale: MemberLocale = req.body?.locale === "en" ? "en" : "zh-HK";
    // Turnstile before any rate-limit write or SMS (PRD §5.1).
    if (!(await d.verifyTurnstile(req.body?.turnstileToken, ip(req)))) return fail(res, 400, "turnstile_failed");
    const key = { phone, ip: ip(req) };
    const wait = d.limiter.retryAfter("send", sendRules(cfg.rate), key);
    if (wait > 0) return fail(res, 429, "rate_limited", { retryAfter: wait });
    d.limiter.record("send", key);
    try {
      await d.otp.start(phone, locale);
    } catch (e) {
      log(`[members] otp send failed for ${maskPhoneLog(phone)}: ${e instanceof Error ? e.message : "error"}`);
      return fail(res, 502, "otp_send_failed");
    }
    // Same body whether or not the number has an account (PRD §5.4).
    res.json({ ok: true, phone, resendIn: RESEND_SECONDS, expiresIn: OTP_TTL_SECONDS });
  });

  post("/auth/otp/check", async (req, res) => {
    const phone = normalizeHkMobile(req.body?.phone);
    if (!phone) return fail(res, 400, "invalid_phone");
    const code = typeof req.body?.code === "string" ? req.body.code.replace(/\s/g, "") : "";
    const key = { phone, ip: ip(req) };
    const wait = d.limiter.retryAfter("check", checkRules, key);
    if (wait > 0) return fail(res, 429, "rate_limited", { retryAfter: wait });
    d.limiter.record("check", key);
    let result;
    try {
      result = await d.otp.check(phone, code);
    } catch (e) {
      log(`[members] otp check failed for ${maskPhoneLog(phone)}: ${e instanceof Error ? e.message : "error"}`);
      return fail(res, 502, "server_error");
    }
    if (!result.ok) {
      if (result.code === "invalid_code") return fail(res, 400, "invalid_code", { attemptsLeft: result.attemptsLeft });
      return fail(res, result.code === "code_expired" ? 410 : 429, result.code);
    }
    const { user, isNew } = d.users.login(phone, result.locale);
    // Replace any session this browser already had (no fixation).
    d.sessions.destroy(parseCookies(req.headers.cookie)[COOKIE]);
    const token = d.sessions.create(user.id, req.get("user-agent"));
    res.append("Set-Cookie", sessionCookie(token, d.sessions.ttlMs, cfg.production));
    try {
      hooks?.onLogin(user, isNew);
    } catch (e) {
      log(`[members] signup bonus failed: ${e instanceof Error ? e.message : "error"}`); // retried lazily on /me
    }
    res.json({ user: dto(user), isNew });
  });

  post("/auth/logout", (req, res) => {
    d.sessions.destroy(parseCookies(req.headers.cookie)[COOKIE]);
    res.append("Set-Cookie", clearedCookie(cfg.production));
    res.json({ ok: true });
  });

  // ---- Profile ----
  r.get("/me", withMember, (req, res) => {
    const u = (req as MemberReq).member;
    if (u) hooks?.onAuthenticated(u);
    res.json({ user: u ? dto(u) : null });
  });

  patch("/me", requireMember, (req, res) => {
    const u = me(req);
    const v = validateProfilePatch(req.body, u.phone_e164);
    if (!v.ok) return fail(res, 400, "validation_error", { field: v.field, detail: v.code });
    const lb = req.body?.showOnLeaderboard;
    if (lb !== undefined && typeof lb !== "boolean") return fail(res, 400, "validation_error", { field: "showOnLeaderboard", detail: "invalid" });
    const updated = d.db.transaction(() => {
      if (typeof lb === "boolean") d.users.setLeaderboard(u.id, lb);
      return d.users.update(u.id, v.patch);
    })();
    res.json({ user: dto(updated) });
  });

  del("/me", requireMember, async (req, res) => {
    if (req.body?.confirm !== "DELETE") return fail(res, 400, "confirm_required");
    const u = me(req);
    d.db.transaction(() => {
      hooks?.beforeDelete(u); // void pending LIVE bets (no refund), anonymise ledger / purchases
      d.users.remove(u.id); // sessions, history, wallet, LIVE bets, declarations cascade
      d.otp.forgetPhone(u.phone_e164);
      d.limiter.forgetPhone(u.phone_e164);
    })();
    await d.avatars.remove(u.avatar_file);
    res.append("Set-Cookie", clearedCookie(cfg.production));
    res.json({ ok: true });
  });

  // ---- Avatar ----
  const rawUpload = express.raw({ type: "multipart/form-data", limit: AVATAR_MAX_BYTES + 64 * 1024 });
  r.post("/me/avatar", csrf(true), requireMember, rawUpload, async (req, res) => {
    if (!Buffer.isBuffer(req.body)) return fail(res, 400, "unsupported_type");
    const file = multipartFile(req.body, req.get("content-type"), "avatar");
    if (!file) return fail(res, 400, "unsupported_type");
    if (file.length > AVATAR_MAX_BYTES) return fail(res, 413, "file_too_large");
    try {
      const webp = await processAvatar(file);
      const name = await d.avatars.save(webp);
      const { user, previous } = d.users.setAvatar(me(req).id, name);
      await d.avatars.remove(previous);
      res.json({ user: dto(user) });
    } catch (e) {
      if (e instanceof AvatarError) return fail(res, 400, e.code);
      log(`[members] avatar save failed: ${e instanceof Error ? e.message : "error"}`);
      fail(res, 500, "server_error");
    }
  });

  del("/me/avatar", requireMember, async (req, res) => {
    const { user, previous } = d.users.setAvatar(me(req).id, null);
    await d.avatars.remove(previous);
    res.json({ user: dto(user) });
  });

  r.get("/avatars/:file", (req, res) => {
    const p = d.avatars.resolve(req.params.file ?? "");
    if (!p || !existsSync(p)) return fail(res, 404, "not_found");
    res.set({ "Content-Type": "image/webp", "X-Content-Type-Options": "nosniff", "Cache-Control": "public, max-age=31536000, immutable" });
    createReadStream(p).pipe(res);
  });

  // ---- History (member only) ----
  r.get("/history", requireMember, (req, res) => res.json(historyFor(me(req).id)));

  post("/history", requireMember, (req, res) => {
    const b = req.body as unknown;
    const raw = b && typeof b === "object" && Array.isArray((b as { entries?: unknown }).entries) ? (b as { entries: unknown[] }).entries : [b];
    if (!raw.length || raw.length > BATCH_MAX) return fail(res, 400, "invalid_entry");
    const entries = raw.map(parseEntry);
    if (entries.some((e) => e === null)) return fail(res, 400, "invalid_entry");
    d.history.add(me(req).id, entries as NonNullable<(typeof entries)[number]>[]);
    res.json(historyFor(me(req).id));
  });

  // Practice rows only: LIVE bets are financial records and can't be deleted.
  del("/history/:id", requireMember, (req, res) => {
    d.history.remove(me(req).id, req.params.id ?? "");
    res.json(historyFor(me(req).id));
  });

  del("/history", requireMember, (req, res) => {
    d.history.clear(me(req).id);
    res.json(historyFor(me(req).id));
  });

  // Upload over the size cap, or malformed JSON on these routes → our error shape.
  r.use((err: { type?: string; status?: number }, req: Request, res: Response, next: NextFunction) => {
    if (err?.type === "entity.too.large") return fail(res, 413, req.path === "/me/avatar" ? "file_too_large" : "invalid_entry");
    if (err?.type === "entity.parse.failed") return fail(res, 400, "bad_request");
    next(err);
  });

  return r;
}
