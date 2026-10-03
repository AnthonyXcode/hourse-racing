// Membership API (PRD §7): config, SMS-OTP login, profile, avatar, per-member history.
// Mounted at /api. Errors are `{ error: { code, … } }`; request bodies on these routes are never logged.
import express, { Router, type NextFunction, type Request, type RequestHandler, type Response } from "express";
import { createReadStream, existsSync } from "fs";
import type { MemberLocale, PublicConfig } from "../../shared/types";
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
}

type Extra = { field?: string; detail?: string; retryAfter?: number; attemptsLeft?: number };
const fail = (res: Response, status: number, code: string, extra: Extra = {}) => res.status(status).json({ error: { code, ...extra } });

const LOCAL = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

/** Member attached by `withMember`. */
type MemberReq = Request & { member?: UserRow | null };

export function membersRouter(d: MembersDeps): Router {
  const { cfg } = d;
  const log = d.log ?? ((l: string) => console.error(l));
  const r = Router();
  const ip = (req: Request) => req.ip ?? req.socket.remoteAddress ?? "unknown";

  // CSRF (PRD §5.7): every state-changing route this router serves must come from our origin, as JSON
  // (multipart only where a route allows it). The guard is attached to each route rather than matched on
  // req.path, so it runs exactly when the route does, whatever the path's case or trailing slash.
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
  /** Mutating routes: always behind the CSRF guard. Use these, never r.post/patch/delete directly. */
  const post = (path: string, ...h: RequestHandler[]) => r.post(path, csrf(), ...h);
  const patch = (path: string, ...h: RequestHandler[]) => r.patch(path, csrf(), ...h);
  const del = (path: string, ...h: RequestHandler[]) => r.delete(path, csrf(), ...h);

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

  r.get("/config", (_req, res) => {
    const body: PublicConfig = { turnstileSiteKey: cfg.turnstile.siteKey, otp: { length: OTP_LENGTH, resendSeconds: RESEND_SECONDS } };
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
    res.json({ user: toMember(user), isNew });
  });

  post("/auth/logout", (req, res) => {
    d.sessions.destroy(parseCookies(req.headers.cookie)[COOKIE]);
    res.append("Set-Cookie", clearedCookie(cfg.production));
    res.json({ ok: true });
  });

  // ---- Profile ----
  r.get("/me", withMember, (req, res) => {
    const u = (req as MemberReq).member;
    res.json({ user: u ? toMember(u) : null });
  });

  patch("/me", requireMember, (req, res) => {
    const u = me(req);
    const v = validateProfilePatch(req.body, u.phone_e164);
    if (!v.ok) return fail(res, 400, "validation_error", { field: v.field, detail: v.code });
    res.json({ user: toMember(d.users.update(u.id, v.patch)) });
  });

  del("/me", requireMember, async (req, res) => {
    if (req.body?.confirm !== "DELETE") return fail(res, 400, "confirm_required");
    const u = me(req);
    d.db.transaction(() => {
      d.users.remove(u.id); // sessions + history cascade
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
      res.json({ user: toMember(user) });
    } catch (e) {
      if (e instanceof AvatarError) return fail(res, 400, e.code);
      log(`[members] avatar save failed: ${e instanceof Error ? e.message : "error"}`);
      fail(res, 500, "server_error");
    }
  });

  del("/me/avatar", requireMember, async (req, res) => {
    const { user, previous } = d.users.setAvatar(me(req).id, null);
    await d.avatars.remove(previous);
    res.json({ user: toMember(user) });
  });

  r.get("/avatars/:file", (req, res) => {
    const p = d.avatars.resolve(req.params.file ?? "");
    if (!p || !existsSync(p)) return fail(res, 404, "not_found");
    res.set({ "Content-Type": "image/webp", "X-Content-Type-Options": "nosniff", "Cache-Control": "public, max-age=31536000, immutable" });
    createReadStream(p).pipe(res);
  });

  // ---- History (member only) ----
  r.get("/history", requireMember, (req, res) => res.json(d.history.list(me(req).id)));

  post("/history", requireMember, (req, res) => {
    const b = req.body as unknown;
    const raw = b && typeof b === "object" && Array.isArray((b as { entries?: unknown }).entries) ? (b as { entries: unknown[] }).entries : [b];
    if (!raw.length || raw.length > BATCH_MAX) return fail(res, 400, "invalid_entry");
    const entries = raw.map(parseEntry);
    if (entries.some((e) => e === null)) return fail(res, 400, "invalid_entry");
    res.json(d.history.add(me(req).id, entries as NonNullable<(typeof entries)[number]>[]));
  });

  del("/history/:id", requireMember, (req, res) => res.json(d.history.remove(me(req).id, req.params.id ?? "")));

  del("/history", requireMember, (req, res) => {
    d.history.clear(me(req).id);
    res.json([]);
  });

  // Upload over the size cap, or malformed JSON on these routes → our error shape.
  r.use((err: { type?: string; status?: number }, req: Request, res: Response, next: NextFunction) => {
    if (err?.type === "entity.too.large") return fail(res, 413, req.path === "/me/avatar" ? "file_too_large" : "invalid_entry");
    if (err?.type === "entity.parse.failed") return fail(res, 400, "bad_request");
    next(err);
  });

  return r;
}
