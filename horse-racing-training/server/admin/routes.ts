// Admin API, /api/admin/* (docs/admin/PRD.md §5, with the lead's overrides).
// - Every route declares its minimum role; there's no other way to mount one (fail closed). The route table
//   is exported so a test can walk every route as guest / user / admin.
// - Role = OWNER_PHONE match or users.role, resolved from the DB on every request.
// - The panel needs its own OTP confirmation (admin session lapses after SESSION_TTL_DAYS without admin use, like the login) on top of the app login.
// - Contact data is masked on the server for everyone; the owner can reveal one user's values (logged).
// - Writes: Origin guard, JSON only, Idempotency-Key, reason, stale-state guard, step-up where sensitive.
import { Router, type NextFunction, type Request, type RequestHandler, type Response } from "express";
import { createHash } from "crypto";
import type { MembersDeps } from "../members/routes";
import { authKit, fail } from "../members/routes";
import type { UserRow } from "../members/users";
import { toMember } from "../members/users";
import { COOKIE, hashToken, parseCookies } from "../members/sessions";
import { sendRules } from "../members/rateLimit";
import { reconcile } from "../credits/reconcile";
import type { Credits } from "../credits/service";
import { hkMidnight } from "../clock";
import { maskPhoneLog, normalizeHkMobile } from "../../shared/validation";
import { picksText } from "../../shared/credits/format";
import type { BetSelection, MemberLocale, Venue } from "../../shared/types";
import type { AdminConfig } from "./config";
import type { ActionResult, Actions, Actor } from "./actions";
import { REASON_MAX, REASON_MIN, checkReason, panelOperator } from "./actions";
import { csvRow, effectiveRole, getStatus, last4, logAccess, maskEmail, maskIp, maskPhone, maskTelegram, setStatus, writeAudit, type Role } from "./core";
import { scrubCell, scrubText, scrubValue } from "./scrub";

/** The owner's contact reveal: the only admin response that is not scrubbed. */
const REVEAL_PATH = /^\/users\/[^/]+\/contact\/?$/i;

/** Stored JSON (legacy rows may not even be JSON) → scrubbed value. */
const scrubJson = (v: unknown) => {
  try {
    return scrubValue(JSON.parse(String(v)));
  } catch {
    return scrubText(String(v));
  }
};

export interface AdminDeps {
  members: Pick<MembersDeps, "cfg" | "db" | "sessions" | "users" | "otp" | "limiter" | "verifyTurnstile">;
  credits: Credits;
  cfg: AdminConfig;
  actions(actor: Actor): Actions;
  /** Extra System-page fields from the running server (fetch runs, version…). */
  system(): Record<string, unknown>;
  /** Meetings with racecards, newest first (date YYYYMMDD). */
  meetings(): { date: string; venue: Venue; races: number[] }[];
  now?: () => number;
}

type Min = "admin" | "owner";
interface StaffCtx {
  user: UserRow & { role?: string; role_updated_at?: string | null };
  role: Role;
  sessionId: string;
  verifiedAt: number | null;
  seenAt: number | null;
  stepUpAt: number | null;
}
type StaffReq = Request & { staff?: StaffCtx };

export interface RouteDecl {
  method: "get" | "post";
  path: string;
  min: Min;
  /** Needs a verified admin session (everything except me + session start/check). */
  verified: boolean;
  write: boolean;
}

/** In-memory per-user rate limit (single process). Returns seconds to wait, or 0. */
function limiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (key: string, now = Date.now()) => {
    const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (list.length >= max) {
      hits.set(key, list);
      return Math.ceil((list[0]! + windowMs - now) / 1000);
    }
    list.push(now);
    hits.set(key, list);
    return 0;
  };
}

const intParam = (v: unknown, d: number, max: number) => {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? Math.min(n, max) : d;
};
const isoDay = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null);
const hash = (b: unknown) => createHash("sha256").update(JSON.stringify(b ?? null)).digest("hex");

export function adminRouter(d: AdminDeps): Router & { routes: RouteDecl[] } {
  const r = Router() as Router & { routes: RouteDecl[] };
  r.routes = [];
  // PII choke point (AD-09): every JSON body this router sends — data, errors, idempotent replays — goes
  // through the scrubber, so no endpoint can forget it. The one exception is the owner's explicit,
  // logged, per-user contact reveal. CSV exports go through the same scrubber cell by cell (see /export).
  r.use((req, res, next) => {
    const json = res.json.bind(res);
    const reveal = req.method === "GET" && REVEAL_PATH.test(req.path);
    res.json = (body: unknown) => json(reveal ? body : scrubValue(body));
    next();
  });
  const { db } = d.members;
  const cfg = d.cfg;
  const now = d.now ?? Date.now;
  const { csrf } = authKit(d.members);
  const ip = (req: Request) => req.ip ?? req.socket.remoteAddress ?? null;
  const rl = {
    read: limiter(cfg.rate.readPerMin, 60_000),
    write: limiter(cfg.rate.writePer10Min, 600_000),
    export: limiter(cfg.rate.exportPerHour, 3_600_000),
    reconcile: limiter(cfg.rate.reconcilePerMin, 60_000),
    fullPhone: limiter(cfg.rate.fullPhonePerHour, 3_600_000),
  };

  // Every admin response: never cached, never indexed, never framed.
  r.use((_req, res, next) => {
    res.set({ "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow", "X-Frame-Options": "DENY", "Content-Security-Policy": "frame-ancestors 'none'" });
    next();
  });

  /** Resolve the caller from the session cookie + DB + OWNER_PHONE (never from the client). */
  const staffGate =
    (min: Min, verified: boolean): RequestHandler =>
    (req, res, next) => {
      const token = parseCookies(req.headers.cookie)[COOKIE];
      const s = d.members.sessions.lookup(token);
      const user = s ? (d.members.users.byId(s.userId) as (UserRow & { role?: string; role_updated_at?: string | null }) | null) : null;
      if (!s || !user || !token) return fail(res, 401, "unauthorized");
      const role = effectiveRole(user, cfg);
      if (role === "user") return fail(res, 403, "forbidden");
      if (min === "owner" && role !== "owner") return fail(res, 403, "owner_only");
      const row = db.prepare("SELECT id, created_at, admin_verified_at, admin_seen_at, step_up_at FROM sessions WHERE token_hash = ?").get(hashToken(token)) as {
        id: string;
        created_at: number;
        admin_verified_at: number | null;
        admin_seen_at: number | null;
        step_up_at: number | null;
      };
      const t = now();
      // A session is only ever created by a successful SMS-code login, so a login from the last few minutes
      // already proves possession of the phone: it opens the admin session (and counts as step-up) without a
      // second SMS (which the 60 s per-phone cooldown would block anyway).
      // Only if they were already staff when that login happened: someone promoted after logging in must
      // still confirm with an SMS code (the owner is staff by config; an admin by role_updated_at).
      const staffAtLogin = role === "owner" || (!!user.role_updated_at && Date.parse(user.role_updated_at) < row.created_at);
      if (!row.admin_verified_at && staffAtLogin && t - row.created_at >= 0 && t - row.created_at < cfg.stepUpMs) {
        db.prepare("UPDATE sessions SET admin_verified_at = ?, admin_seen_at = ?, step_up_at = ? WHERE id = ?").run(row.created_at, t, row.created_at, row.id);
        Object.assign(row, { admin_verified_at: row.created_at, admin_seen_at: t, step_up_at: row.created_at });
      }
      const valid = !!row.admin_verified_at && t - (row.admin_seen_at ?? 0) < cfg.idleMs;
      if (verified && !valid) return fail(res, 401, "admin_reauth_required");
      // Only user-initiated requests extend the idle timer; background polls (X-Admin-Background: 1) don't.
      const background = req.get("x-admin-background") === "1";
      if (valid && !background && t - (row.admin_seen_at ?? 0) > 60_000) db.prepare("UPDATE sessions SET admin_seen_at = ? WHERE id = ?").run(t, row.id);
      (req as StaffReq).staff = {
        user,
        role,
        sessionId: row.id,
        verifiedAt: valid ? row.admin_verified_at : null,
        seenAt: valid ? (background ? row.admin_seen_at : Math.max(row.admin_seen_at ?? 0, t - 60_000)) : null,
        stepUpAt: valid ? row.step_up_at : null,
      };
      const wait = rl.read(user.id);
      if (wait) return fail(res, 429, "rate_limited", { retryAfter: wait });
      next();
    };
  const staff = (req: Request) => (req as StaffReq).staff!;
  const actorOf = (req: Request): Actor => {
    const s = staff(req);
    return { source: "panel", operator: panelOperator(s.user, s.role), userId: s.user.id, role: s.role, ip: ip(req), userAgent: req.get("user-agent") ?? null };
  };
  const stepUpOk = (req: Request) => {
    const s = staff(req).stepUpAt;
    return !!s && now() - s < cfg.stepUpMs;
  };

  /** Mount a read route. */
  const get = (min: Min, path: string, h: RequestHandler, verified = true) => {
    r.routes.push({ method: "get", path, min, verified, write: false });
    r.get(path, staffGate(min, verified), h);
  };
  /**
   * Mount a write: Origin + JSON (csrf), staff gate, rate limit, Idempotency-Key, reason; the handler's
   * successful response is stored per key (same key + body → same response; different body → 409).
   */
  const write = (min: Min, path: string, h: (req: Request, res: Response) => { status: number; body: unknown } | null) => {
    r.routes.push({ method: "post", path, min, verified: true, write: true });
    r.post(path, csrf(), staffGate(min, true), (req, res) => {
      const s = staff(req);
      const wait = rl.write(s.user.id);
      if (wait) return fail(res, 429, "rate_limited", { retryAfter: wait });
      const key = req.get("idempotency-key") ?? "";
      if (!/^[A-Za-z0-9-]{8,64}$/.test(key)) return fail(res, 400, "idempotency_key_required");
      // Same rule as the CLI (actions.checkReason); checked here too so a bad reason never takes a key.
      if (!checkReason(req.body?.reason).ok) return fail(res, 400, "reason_required", { min: REASON_MIN, max: REASON_MAX });
      const bodyHash = hash({ path: req.path, body: req.body });
      const seen = db.prepare("SELECT body_hash, status, response FROM idempotency_keys WHERE key = ? AND user_id = ?").get(`admin:${key}`, s.user.id) as
        | { body_hash: string; status: number; response: string }
        | undefined;
      if (seen) return seen.body_hash === bodyHash ? res.status(seen.status).json(JSON.parse(seen.response)) : fail(res, 409, "idempotency_conflict");
      const out = h(req, res);
      if (!out) return; // the handler already answered (e.g. step_up_required)
      if (out.status === 200)
        db.prepare("INSERT OR IGNORE INTO idempotency_keys (key, user_id, body_hash, status, response, created_at) VALUES (?, ?, ?, ?, ?, ?)").run(
          `admin:${key}`,
          s.user.id,
          bodyHash,
          out.status,
          JSON.stringify(out.body),
          now()
        );
      res.status(out.status).json(out.body);
    });
  };
  /** A read-only POST (no data change, so no reason / idempotency): reconcile, admin OTP. */
  const check = (min: Min, path: string, h: RequestHandler, verified = true) => {
    r.routes.push({ method: "post", path, min, verified, write: false });
    r.post(path, csrf(), staffGate(min, verified), h);
  };

  const fromResult = <T,>(x: ActionResult<T>, okBody: () => unknown) =>
    x.ok ? { status: 200, body: okBody() } : { status: x.status, body: { error: scrubValue({ code: x.code, ...x.extra, auditId: x.auditId }) } };

  // ---- DTOs (masked per role on the server) ----
  const walletOf = (id: string) => d.credits.ledger.wallet(id);
  const pendingLive = (id: string) => (db.prepare("SELECT COUNT(*) n FROM live_bets WHERE user_id = ? AND status = 'pending'").get(id) as { n: number }).n;
  const userRow = (u: UserRow & { role?: string }) => {
    const w = walletOf(u.id);
    return {
      id: u.id,
      displayName: u.display_name,
      phone: maskPhone(u.phone_e164),
      role: effectiveRole(u, cfg),
      balance: w?.balance ?? 0,
      flagged: !!w?.flagged,
      pendingLive: pendingLive(u.id),
      createdAt: u.created_at,
      lastLoginAt: u.last_login_at,
    };
  };
  const userDetail = (u: UserRow & { role?: string }, viewer: Role) => {
    const w = walletOf(u.id);
    const decl = db.prepare("SELECT declared_at, terms_version FROM declarations WHERE user_id = ? AND kind = 'adult_18'").get(u.id) as { declared_at: string; terms_version: string } | undefined;
    const sess = db.prepare("SELECT COUNT(*) n, MAX(last_seen_at) last FROM sessions WHERE user_id = ?").get(u.id) as { n: number; last: number | null };
    return {
      ...userRow(u),
      avatarUrl: toMember(u).avatarUrl,
      email: maskEmail(u.email),
      whatsapp: u.whatsapp ? (u.whatsapp === u.phone_e164 ? "same" : maskPhone(u.whatsapp)) : null,
      telegram: maskTelegram(u.telegram),
      // Free text may contain anything: owner only.
      description: viewer === "owner" ? u.description : undefined,
      hasDescription: !!u.description,
      locale: u.locale,
      adultDeclaredAt: decl?.declared_at ?? null,
      termsVersion: decl?.terms_version ?? null,
      flagReason: w?.flag_reason ?? null,
      showOnLeaderboard: !!u.show_on_leaderboard, // read-only here: only the member can change it
      sessions: { count: sess.n, lastSeenAt: sess.last ? new Date(sess.last).toISOString() : null },
    };
  };
  const findUser = (id: string) => (db.prepare("SELECT * FROM users WHERE id = ?").get(id) as (UserRow & { role?: string; role_updated_at?: string | null }) | undefined) ?? null;
  const page = (req: Request) => {
    const limit = intParam(req.query.limit, 50, 100);
    const p = intParam(req.query.page, 1, 100_000);
    return { limit, page: p, offset: (p - 1) * limit };
  };

  const stripeMode = () => (d.credits.cfg.stripe.secretKey.startsWith("sk_live_") ? "live" : d.credits.cfg.stripe.secretKey.startsWith("sk_test_") ? "test" : "none");

  // ---- me + admin session ----
  get(
    "admin",
    "/me",
    (req, res) => {
      const s = staff(req);
      res.json({
        role: s.role,
        displayName: s.user.display_name,
        phoneLast4: last4(s.user.phone_e164),
        adminSessionExpiresAt: s.verifiedAt ? new Date((s.seenAt ?? now()) + cfg.idleMs).toISOString() : null,
        adminAbsoluteExpiresAt: null, // no absolute limit: admin access follows the login session (SESSION_TTL_DAYS)
        serverNow: new Date(now()).toISOString(),
        idleMs: cfg.idleMs,
        stepUpUntil: s.stepUpAt && now() - s.stepUpAt < cfg.stepUpMs ? new Date(s.stepUpAt + cfg.stepUpMs).toISOString() : null,
        stepUpCredits: cfg.stepUpCredits,
        maxAdjust: cfg.maxAdjust,
        stripeMode: stripeMode(),
        heldCount: (db.prepare("SELECT COUNT(*) n FROM live_bets WHERE status = 'pending' AND hold_reason IS NOT NULL").get() as { n: number }).n,
      });
    },
    false
  );

  check(
    "admin",
    "/session/start",
    async (req, res) => {
      const s = staff(req);
      if (!(await d.members.verifyTurnstile(req.body?.turnstileToken, ip(req) ?? undefined))) return fail(res, 400, "turnstile_failed");
      const key = { phone: s.user.phone_e164, ip: ip(req) ?? "unknown" };
      const wait = d.members.limiter.retryAfter("send", sendRules(d.members.cfg.rate), key);
      if (wait > 0) return fail(res, 429, "rate_limited", { retryAfter: wait });
      d.members.limiter.record("send", key);
      try {
        await d.members.otp.start(s.user.phone_e164, (s.user.locale === "en" ? "en" : "zh-HK") as MemberLocale);
      } catch {
        console.error(`[admin] otp send failed for ${maskPhoneLog(s.user.phone_e164)}`);
        return fail(res, 502, "otp_send_failed");
      }
      res.json({ resendIn: 60, expiresIn: 600 });
    },
    false
  );

  check(
    "admin",
    "/session/check",
    async (req, res) => {
      const s = staff(req);
      const code = typeof req.body?.code === "string" ? req.body.code.replace(/\s/g, "") : "";
      const result = await d.members.otp.check(s.user.phone_e164, code);
      if (!result.ok) {
        if (result.code === "invalid_code") return fail(res, 400, "invalid_code", { attemptsLeft: result.attemptsLeft });
        return fail(res, result.code === "code_expired" ? 410 : 429, result.code);
      }
      const t = now();
      // The confirmation opens (or renews) the admin session and counts as step-up for a few minutes.
      db.prepare("UPDATE sessions SET admin_verified_at = CASE WHEN admin_verified_at IS NULL OR ? - admin_seen_at >= ? THEN ? ELSE admin_verified_at END, admin_seen_at = ?, step_up_at = ? WHERE id = ?").run(
        t,
        cfg.idleMs,
        t,
        t,
        t,
        s.sessionId
      );
      res.json({ adminSessionExpiresAt: new Date(t + cfg.idleMs).toISOString(), stepUpUntil: new Date(t + cfg.stepUpMs).toISOString() });
    },
    false
  );

  // ---- dashboard + system ----
  // 5★ pick SMS alerts: the latest send log (read-only). Phones masked; the JSON choke point scrubs the rest.
  get("admin", "/sms-log", (_req, res) => {
    const rows = db
      .prepare(
        `SELECT l.id, l.created_at createdAt, l.date, l.venue, l.kind, l.status, l.provider_id providerId, l.error, u.phone_e164 phone, u.display_name displayName
           FROM sms_alert_log l LEFT JOIN users u ON u.id = l.user_id ORDER BY l.id DESC LIMIT 100`
      )
      .all() as { phone: string | null }[];
    const subscribers = (db.prepare("SELECT COUNT(*) n FROM users WHERE alerts_5star = 1").get() as { n: number }).n;
    res.json({ subscribers, items: rows.map((r) => ({ ...r, phone: maskPhone(r.phone) })) });
  });

  get("admin", "/dashboard", (_req, res) => {
    const today = new Date(hkMidnight(Date.now())).toISOString();
    const one = <T>(sql: string, ...a: unknown[]) => db.prepare(sql).get(...a) as T;
    const members = one<{ n: number; today: number }>("SELECT COUNT(*) n, SUM(created_at >= ?) today FROM users", today);
    const active = one<{ n: number; live: number }>(
      `SELECT COUNT(DISTINCT u) n, COUNT(DISTINCT CASE WHEN live THEN u END) live FROM (
         SELECT id u, 0 live FROM users WHERE last_login_at >= ?
         UNION ALL SELECT user_id, 0 FROM credit_ledger WHERE created_at >= ?
         UNION ALL SELECT user_id, 1 FROM live_bets WHERE created_at >= ?
         UNION ALL SELECT user_id, 0 FROM bet_history WHERE created_at >= ?)`,
      today,
      today,
      today,
      today
    );
    const pending = one<{ n: number; stake: number | null; held: number }>("SELECT COUNT(*) n, SUM(stake) stake, SUM(hold_reason IS NOT NULL) held FROM live_bets WHERE status = 'pending'");
    const outstanding = one<{ s: number | null }>("SELECT SUM(balance) s FROM wallets");
    const paid = one<{ n: number; hkd: number | null }>("SELECT COUNT(*) n, SUM(amount_hkd) hkd FROM purchases WHERE status IN ('paid','refunded','disputed') AND paid_at >= ?", hkMidnight(Date.now()));
    const issued = db.prepare("SELECT kind, SUM(amount) s FROM credit_ledger WHERE created_at >= ? AND amount > 0 GROUP BY kind").all(today) as { kind: string; s: number }[];
    const liveToday = one<{ n: number; stake: number | null; payout: number | null }>("SELECT COUNT(*) n, SUM(stake) stake, SUM(payout + refund) payout FROM live_bets WHERE created_at >= ?", today);
    const alerts = db.prepare("SELECT key, kind, message, ref_type refType, ref_id refId, first_seen_at firstSeenAt, last_seen_at lastSeenAt FROM system_alerts WHERE resolved_at IS NULL ORDER BY last_seen_at DESC LIMIT 20").all();
    const alertCount = db.prepare("SELECT kind, COUNT(*) n FROM system_alerts WHERE resolved_at IS NULL GROUP BY kind").all();
    const recentPurchases = db.prepare("SELECT p.created_at createdAt, p.plan_id planId, p.amount_hkd amountHkd, p.status, u.display_name displayName FROM purchases p LEFT JOIN users u ON u.id = p.user_id ORDER BY p.created_at DESC LIMIT 5").all();
    const smsToday = one<{ sent: number | null; failed: number | null; skipped: number | null }>(
      "SELECT SUM(status = 'sent') sent, SUM(status = 'failed') failed, SUM(status = 'skipped') skipped FROM sms_alert_log WHERE created_at >= ? AND kind IN ('pre', 'post')",
      today
    );
    const smsSubscribers = one<{ n: number }>("SELECT COUNT(*) n FROM users WHERE alerts_5star = 1").n;
    const recentAudit = (db.prepare("SELECT id, created_at createdAt, operator, actor_role actorRole, action, target_type targetType, target_id targetId, outcome FROM admin_audit ORDER BY id DESC LIMIT 5").all() as { operator: string }[]).map((r) => ({ ...r, operator: scrubText(r.operator ?? "") }));
    res.json({
      members: { total: members.n, today: members.today ?? 0 },
      active: { total: active.n, live: active.live ?? 0 },
      livePending: { count: pending.n, stake: pending.stake ?? 0, held: pending.held ?? 0 },
      creditsOutstanding: { balances: outstanding.s ?? 0, pendingStake: pending.stake ?? 0 },
      purchasesToday: { count: paid.n, hkd: paid.hkd ?? 0 },
      liveToday: { count: liveToday.n, stake: liveToday.stake ?? 0, returned: liveToday.payout ?? 0 },
      issuedToday: Object.fromEntries(issued.map((x) => [x.kind, x.s])),
      alerts,
      alertCount,
      recentPurchases,
      recentAudit,
      smsAlerts: { subscribers: smsSubscribers, sentToday: smsToday.sent ?? 0, failedToday: smsToday.failed ?? 0, skippedToday: smsToday.skipped ?? 0 },
      system: { futureBetting: d.credits.cfg.futureBetting, liveEnabled: d.credits.liveOn(), stripeMode: stripeMode() },
      serverTime: new Date(now()).toISOString(),
    });
  });

  get("admin", "/system", (_req, res) => {
    const c = d.credits.cfg;
    res.json({
      futureBetting: c.futureBetting,
      liveEnabled: d.credits.liveOn(),
      dataFetch: c.dataFetch,
      devNow: !c.production && process.env.DEV_NOW ? process.env.DEV_NOW : null,
      stripeMode: stripeMode(),
      stripeLiveApproved: c.stripe.liveApproved,
      webhookSecretSet: !!c.stripe.webhookSecret,
      dailyCapHkd: c.dailyCapHkd,
      maxStake: c.maxStake,
      signupBonus: c.signupBonus,
      lastSweep: getStatus(db, "last_settle_sweep"),
      lastReconcile: getStatus(db, "last_reconcile"),
      lastWebhook: (db.prepare("SELECT MAX(received_at) t FROM stripe_events").get() as { t: string | null }).t,
      lastCheckout: (() => {
        const t = (db.prepare("SELECT MAX(created_at) t FROM purchases").get() as { t: number | null }).t;
        return t ? new Date(t).toISOString() : null;
      })(),
      // Pending bets whose first race went off more than 2 h ago (post times carry +08:00, so compare as times).
      pendingOver2h: (db.prepare("SELECT first_post_time t FROM live_bets WHERE status = 'pending' AND first_post_time IS NOT NULL").all() as { t: string }[]).filter(
        (x) => d.credits.clock() - Date.parse(x.t) > 2 * 3_600_000
      ).length,
      serverTime: new Date(now()).toISOString(),
      ...d.system(),
    });
  });

  check("admin", "/reconcile", (req, res) => {
    const wait = rl.reconcile(staff(req).user.id);
    if (wait) return fail(res, 429, "rate_limited", { retryAfter: wait });
    const issues = reconcile(db);
    setStatus(db, "last_reconcile", { ok: issues.length === 0, issues });
    res.json({ ok: issues.length === 0, issues, at: new Date(now()).toISOString() });
  });

  // ---- users ----
  const SORTS: Record<string, string> = {
    created: "u.created_at",
    lastLogin: "u.last_login_at",
    balance: "COALESCE(w.balance, 0)",
    name: "u.display_name",
  };
  const orderBy = (req: Request, allowed: Record<string, string>, dflt: string) => {
    const [k = dflt, dir = "desc"] = String(req.query.sort ?? dflt).split(":");
    if (!allowed[k] || (dir !== "asc" && dir !== "desc")) return null;
    return `${allowed[k]} ${dir.toUpperCase()}`;
  };

  get("admin", "/users", (req, res) => {
    const s = staff(req);
    const { limit, page: p, offset } = page(req);
    const where: string[] = [];
    const args: unknown[] = [];
    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
    if (q) {
      const digits = q.replace(/[\s\-+()]/g, "");
      const full = normalizeHkMobile(q);
      if (full && s.role === "owner") {
        // Full-number search: owner only, rate-limited and logged (the number itself isn't stored in the log).
        const wait = rl.fullPhone(s.user.id);
        if (wait) return fail(res, 429, "rate_limited", { retryAfter: wait });
        where.push("u.phone_e164 = ?");
        args.push(full);
        logAccess(db, { actorUserId: s.user.id, actorRole: s.role, kind: "search_full_phone", detail: "users", ip: ip(req) });
      } else if (/^\d{4,}$/.test(digits)) {
        where.push("substr(u.phone_e164, -4) = ?"); // admins: a full number falls back to its last 4
        args.push(digits.slice(-4));
      } else {
        where.push("(u.display_name LIKE ? ESCAPE '\\' OR u.id LIKE ?)");
        args.push(`%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`, `${q}%`);
      }
    }
    if (req.query.role) {
      if (req.query.role === "owner") where.push(cfg.ownerPhone ? "u.phone_e164 = ?" : "0"), cfg.ownerPhone && args.push(cfg.ownerPhone);
      else if (req.query.role === "admin" || req.query.role === "user") {
        where.push("u.role = ?" + (cfg.ownerPhone ? " AND u.phone_e164 <> ?" : ""));
        args.push(req.query.role);
        if (cfg.ownerPhone) args.push(cfg.ownerPhone);
      } else return fail(res, 400, "invalid_filter", { field: "role" });
    }
    if (req.query.flagged === "1") where.push("w.flagged = 1");
    if (req.query.hasBalance === "1") where.push("w.balance > 0");
    if (req.query.hasLive === "1") where.push("EXISTS (SELECT 1 FROM live_bets b WHERE b.user_id = u.id)");
    const from = isoDay(req.query.createdFrom);
    const to = isoDay(req.query.createdTo);
    if (from) where.push("u.created_at >= ?"), args.push(`${from}T00:00:00+08:00`);
    if (to) where.push("u.created_at < ?"), args.push(new Date(Date.parse(`${to}T00:00:00+08:00`) + 86_400_000).toISOString());
    const order = orderBy(req, SORTS, "created");
    if (!order) return fail(res, 400, "invalid_filter", { field: "sort" });
    const sql = `FROM users u LEFT JOIN wallets w ON w.user_id = u.id ${where.length ? `WHERE ${where.join(" AND ")}` : ""}`;
    const total = (db.prepare(`SELECT COUNT(*) n ${sql}`).get(...args) as { n: number }).n;
    const rows = db.prepare(`SELECT u.* ${sql} ORDER BY ${order} LIMIT ? OFFSET ?`).all(...args, limit, offset) as (UserRow & { role?: string; role_updated_at?: string | null })[];
    res.json({ items: rows.map(userRow), page: p, limit, total });
  });

  get("admin", "/users/:id", (req, res) => {
    const s = staff(req);
    const u = findUser(req.params.id ?? "");
    if (!u) return fail(res, 404, "not_found");
    logAccess(db, { actorUserId: s.user.id, actorRole: s.role, kind: "user_detail", targetId: u.id, ip: ip(req) });
    res.json(userDetail(u, s.role));
  });

  // Owner only: the full contact values of ONE user (the UI re-masks after 60 s). Logged.
  get("owner", "/users/:id/contact", (req, res) => {
    const s = staff(req);
    const u = findUser(req.params.id ?? "");
    if (!u) return fail(res, 404, "not_found");
    logAccess(db, { actorUserId: s.user.id, actorRole: s.role, kind: "contact_reveal", targetId: u.id, detail: "phone,email,whatsapp,telegram", ip: ip(req) });
    // The UI re-masks after 60 s against this deadline (wall clock, not timer ticks).
    res.json({ phone: u.phone_e164, email: u.email, whatsapp: u.whatsapp, telegram: u.telegram ? `@${u.telegram}` : null, expiresInSec: 60, expiresAt: new Date(now() + 60_000).toISOString() });
  });

  const tab = (name: string, sql: (id: string) => { sql: string; args: unknown[]; map?: (r: Record<string, unknown>) => unknown }) =>
    get("admin", `/users/:id/${name}`, (req, res) => {
      const s = staff(req);
      const u = findUser(req.params.id ?? "");
      if (!u) return fail(res, 404, "not_found");
      logAccess(db, { actorUserId: s.user.id, actorRole: s.role, kind: "user_tab", targetId: u.id, detail: name, ip: ip(req) });
      const { limit, page: p, offset } = page(req);
      const q = sql(u.id);
      const total = (db.prepare(`SELECT COUNT(*) n FROM (${q.sql})`).get(...q.args) as { n: number }).n;
      const rows = db.prepare(`${q.sql} LIMIT ? OFFSET ?`).all(...q.args, limit, offset) as Record<string, unknown>[];
      res.json({ items: q.map ? rows.map(q.map) : rows, page: p, limit, total });
    });
  tab("ledger", (id) => ({ sql: "SELECT id, kind, amount, balance_after balanceAfter, ref_type refType, ref_id refId, actor, note, created_at createdAt FROM credit_ledger WHERE user_id = ? ORDER BY id DESC", args: [id] }));
  tab("live-bets", (id) => ({ sql: `${LIVE_SELECT} WHERE b.user_id = ? ORDER BY b.created_at DESC`, args: [id], map: liveRow }));
  tab("practice-bets", (id) => ({ sql: "SELECT entry_id id, ts, data FROM bet_history WHERE user_id = ? ORDER BY ts DESC", args: [id], map: (r) => ({ ...(JSON.parse(String(r.data)) as object), id: r.id }) }));
  tab("purchases", (id) => ({ sql: `${PURCHASE_SELECT} WHERE p.user_id = ? ORDER BY p.created_at DESC`, args: [id], map: purchaseRow }));
  tab("sessions", (id) => ({ sql: "SELECT created_at createdAt, last_seen_at lastSeenAt, expires_at expiresAt, user_agent userAgent FROM sessions WHERE user_id = ? ORDER BY last_seen_at DESC", args: [id], map: (r) => ({ ...r, createdAt: new Date(Number(r.createdAt)).toISOString(), lastSeenAt: new Date(Number(r.lastSeenAt)).toISOString(), expiresAt: new Date(Number(r.expiresAt)).toISOString() }) }));

  // ---- bets (practice + LIVE in one list) ----
  const LIVE_SELECT =
    "SELECT b.id, b.user_id userId, u.display_name displayName, b.date, b.venue, b.bet_type betType, b.selection, b.unit, b.combos, b.stake, b.status, b.payout, b.refund, b.hold_reason holdReason, b.settle_attempts attempts, b.result, b.first_post_time firstPostTime, b.created_at createdAt, b.settled_at settledAt FROM live_bets b LEFT JOIN users u ON u.id = b.user_id";
  function liveRow(r: Record<string, unknown>) {
    const sel = JSON.parse(String(r.selection)) as BetSelection;
    return { ...r, mode: "live", selection: sel, picks: picksText(sel), races: sel.raceLegs.map((l) => l.raceNumber), result: r.result ? JSON.parse(String(r.result)) : null, held: r.status === "pending" && !!r.holdReason };
  }
  const BET_UNION = `
    SELECT b.id, b.user_id, 'live' mode, b.created_at ts, b.date, b.venue, b.bet_type, b.stake cost, b.payout + b.refund payout,
      CASE WHEN b.status = 'pending' AND b.hold_reason IS NOT NULL THEN 'held' ELSE b.status END status, b.selection, NULL picks, b.race_ids
    FROM live_bets b
    UNION ALL
    SELECT h.entry_id, h.user_id, 'practice', h.ts, json_extract(h.data, '$.date'), json_extract(h.data, '$.venue'), json_extract(h.data, '$.betType'),
      json_extract(h.data, '$.cost'), json_extract(h.data, '$.payout'), CASE WHEN json_extract(h.data, '$.hit') THEN 'hit' ELSE 'miss' END, NULL,
      json_extract(h.data, '$.picks'), NULL
    FROM bet_history h`;
  get("admin", "/bets", (req, res) => {
    const { limit, page: p, offset } = page(req);
    const where: string[] = [];
    const args: unknown[] = [];
    const eq = (col: string, v: unknown, ok: (x: string) => boolean) => {
      if (v === undefined || v === "") return true;
      if (typeof v !== "string" || !ok(v)) return false;
      where.push(`${col} = ?`);
      args.push(v);
      return true;
    };
    const okAll =
      eq("x.mode", req.query.mode, (v) => v === "live" || v === "practice") &&
      eq("x.status", req.query.status, (v) => ["pending", "held", "won", "lost", "void", "hit", "miss"].includes(v)) &&
      eq("x.date", req.query.date, (v) => /^\d{8}$/.test(v)) &&
      eq("x.venue", req.query.venue, (v) => v === "ST" || v === "HV") &&
      eq("x.bet_type", req.query.betType, (v) => /^[a-zA-Z0-9]{2,12}$/.test(v)) &&
      eq("x.user_id", req.query.userId, (v) => v.length <= 64);
    if (!okAll) return fail(res, 400, "invalid_filter");
    if (req.query.raceNo) {
      const n = Number(req.query.raceNo);
      if (!Number.isInteger(n) || n < 1 || n > 14) return fail(res, 400, "invalid_filter", { field: "raceNo" });
      where.push("(EXISTS (SELECT 1 FROM json_each(x.race_ids) WHERE value = ?) OR x.picks LIKE ?)");
      args.push(n, `R${n} %`);
    }
    const sql = `FROM (${BET_UNION}) x LEFT JOIN users u ON u.id = x.user_id ${where.length ? `WHERE ${where.join(" AND ")}` : ""}`;
    const total = (db.prepare(`SELECT COUNT(*) n ${sql}`).get(...args) as { n: number }).n;
    const rows = db.prepare(`SELECT x.*, u.display_name displayName ${sql} ORDER BY x.ts DESC LIMIT ? OFFSET ?`).all(...args, limit, offset) as Record<string, unknown>[];
    res.json({
      items: rows.map((r) => ({
        id: r.id,
        userId: r.user_id,
        displayName: r.displayName ?? null,
        mode: r.mode,
        placedAt: r.ts,
        date: r.date,
        venue: r.venue,
        betType: r.bet_type,
        picks: r.mode === "live" ? picksText(JSON.parse(String(r.selection)) as BetSelection) : r.picks,
        cost: r.cost,
        payout: r.payout,
        status: r.status,
      })),
      page: p,
      limit,
      total,
    });
  });
  get("admin", "/bets/:id", (req, res) => {
    const row = db.prepare(`${LIVE_SELECT} WHERE b.id = ?`).get(req.params.id ?? "") as Record<string, unknown> | undefined;
    if (!row) return fail(res, 404, "not_found");
    res.json(liveRow(row));
  });
  get("admin", "/held", (_req, res) => {
    const rows = db.prepare(`${LIVE_SELECT} WHERE b.status = 'pending' AND b.hold_reason IS NOT NULL ORDER BY b.created_at ASC`).all() as Record<string, unknown>[];
    const heldSince = new Map((db.prepare("SELECT id, held_since FROM live_bets WHERE hold_reason IS NOT NULL").all() as { id: string; held_since: string | null }[]).map((x) => [x.id, x.held_since]));
    res.json({ items: rows.map((r) => ({ ...liveRow(r), heldSince: heldSince.get(String(r.id)) ?? null })) });
  });

  // ---- ledger + purchases ----
  const KINDS = ["signup_bonus", "purchase", "bet_stake", "bet_payout", "bet_refund", "purchase_reversal", "admin_adjust"];
  const ledgerWhere = (req: Request) => {
    const where: string[] = [];
    const args: unknown[] = [];
    if (req.query.kind) {
      if (!KINDS.includes(String(req.query.kind))) return null;
      where.push("l.kind = ?"), args.push(req.query.kind);
    }
    if (req.query.userId) where.push("l.user_id = ?"), args.push(String(req.query.userId));
    if (req.query.actor) where.push("l.actor LIKE ?"), args.push(`${String(req.query.actor).replace(/[%_]/g, "")}%`);
    const from = isoDay(req.query.from);
    const to = isoDay(req.query.to);
    if (from) where.push("l.created_at >= ?"), args.push(new Date(Date.parse(`${from}T00:00:00+08:00`)).toISOString());
    if (to) where.push("l.created_at < ?"), args.push(new Date(Date.parse(`${to}T00:00:00+08:00`) + 86_400_000).toISOString());
    return { sql: where.length ? `WHERE ${where.join(" AND ")}` : "", args };
  };
  const LEDGER_SELECT = "SELECT l.id, l.user_id userId, u.display_name displayName, l.kind, l.amount, l.balance_after balanceAfter, l.ref_type refType, l.ref_id refId, l.actor, l.note, l.created_at createdAt FROM credit_ledger l LEFT JOIN users u ON u.id = l.user_id";
  get("admin", "/ledger", (req, res) => {
    const w = ledgerWhere(req);
    if (!w) return fail(res, 400, "invalid_filter", { field: "kind" });
    const { limit, page: p, offset } = page(req);
    const tot = db.prepare(`SELECT COUNT(*) n, SUM(CASE WHEN amount > 0 THEN amount END) sumIn, SUM(CASE WHEN amount < 0 THEN amount END) sumOut FROM credit_ledger l ${w.sql}`).get(...w.args) as { n: number; sumIn: number | null; sumOut: number | null };
    const items = db.prepare(`${LEDGER_SELECT} ${w.sql} ORDER BY l.id DESC LIMIT ? OFFSET ?`).all(...w.args, limit, offset);
    res.json({ items, page: p, limit, total: tot.n, sumIn: tot.sumIn ?? 0, sumOut: tot.sumOut ?? 0 });
  });

  const PURCHASE_SELECT =
    "SELECT p.stripe_session_id sessionId, p.user_id userId, u.display_name displayName, p.plan_id planId, p.amount_hkd amountHkd, p.credits, p.status, p.payment_intent_id paymentIntentId, p.reversed_credits reversedCredits, p.created_at createdAt, p.paid_at paidAt FROM purchases p LEFT JOIN users u ON u.id = p.user_id";
  function purchaseRow(r: Record<string, unknown>) {
    return { ...r, createdAt: new Date(Number(r.createdAt)).toISOString(), paidAt: r.paidAt ? new Date(Number(r.paidAt)).toISOString() : null };
  }
  const purchaseWhere = (req: Request) => {
    const where: string[] = [];
    const args: unknown[] = [];
    if (req.query.status) {
      if (!["open", "paid", "expired", "refunded", "disputed"].includes(String(req.query.status))) return null;
      where.push("p.status = ?"), args.push(req.query.status);
    }
    if (req.query.planId) where.push("p.plan_id = ?"), args.push(String(req.query.planId));
    if (req.query.userId) where.push("p.user_id = ?"), args.push(String(req.query.userId));
    const from = isoDay(req.query.from);
    const to = isoDay(req.query.to);
    if (from) where.push("p.created_at >= ?"), args.push(Date.parse(`${from}T00:00:00+08:00`));
    if (to) where.push("p.created_at < ?"), args.push(Date.parse(`${to}T00:00:00+08:00`) + 86_400_000);
    return { sql: where.length ? `WHERE ${where.join(" AND ")}` : "", args };
  };
  get("admin", "/purchases", (req, res) => {
    const w = purchaseWhere(req);
    if (!w) return fail(res, 400, "invalid_filter", { field: "status" });
    const { limit, page: p, offset } = page(req);
    const tot = db.prepare(`SELECT COUNT(*) n, SUM(CASE WHEN p.status IN ('paid','refunded','disputed') THEN p.amount_hkd END) hkd FROM purchases p ${w.sql}`).get(...w.args) as { n: number; hkd: number | null };
    const items = (db.prepare(`${PURCHASE_SELECT} ${w.sql} ORDER BY p.created_at DESC LIMIT ? OFFSET ?`).all(...w.args, limit, offset) as Record<string, unknown>[]).map(purchaseRow);
    res.json({ items, page: p, limit, total: tot.n, count: tot.n, hkd: tot.hkd ?? 0 });
  });

  // ---- races ----
  get("admin", "/races", (req, res) => {
    const meetings = d.meetings().slice(0, 40);
    const date = typeof req.query.date === "string" && /^\d{8}$/.test(req.query.date) ? req.query.date : null;
    const venue = req.query.venue === "ST" || req.query.venue === "HV" ? (req.query.venue as Venue) : null;
    const m = date && venue ? meetings.find((x) => x.date === date && x.venue === venue) ?? d.meetings().find((x) => x.date === date && x.venue === venue) : meetings[0];
    if (!m) return res.json({ meetings, meeting: null, races: [] });
    const st = d.credits.statusFor(m.date, m.venue, m.races);
    const bets = db.prepare("SELECT race_ids, stake FROM live_bets WHERE status = 'pending' AND date = ? AND venue = ?").all(m.date, m.venue) as { race_ids: string; stake: number }[];
    const races = st.raceInfo.map((ri) => {
      const on = bets.filter((b) => (JSON.parse(b.race_ids) as number[]).includes(ri.raceNumber));
      return { ...ri, pendingBets: on.length, pendingStake: on.reduce((s, b) => s + b.stake, 0) };
    });
    res.json({ meetings, meeting: { date: m.date, venue: m.venue, mode: st.mode }, races });
  });

  // ---- audit + access log ----
  get("admin", "/audit", (req, res) => {
    const { limit, page: p, offset } = page(req);
    const where: string[] = [];
    const args: unknown[] = [];
    if (req.query.actor) where.push("operator LIKE ?"), args.push(`%${String(req.query.actor).replace(/[%_]/g, "")}%`);
    if (req.query.action) where.push("action = ?"), args.push(String(req.query.action));
    if (req.query.targetType) where.push("target_type = ?"), args.push(String(req.query.targetType));
    if (req.query.targetId) where.push("target_id = ?"), args.push(String(req.query.targetId));
    const from = isoDay(req.query.from);
    const to = isoDay(req.query.to);
    if (from) where.push("created_at >= ?"), args.push(new Date(Date.parse(`${from}T00:00:00+08:00`)).toISOString());
    if (to) where.push("created_at < ?"), args.push(new Date(Date.parse(`${to}T00:00:00+08:00`) + 86_400_000).toISOString());
    const sql = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const total = (db.prepare(`SELECT COUNT(*) n FROM admin_audit ${sql}`).get(...args) as { n: number }).n;
    const rows = db.prepare(`SELECT * FROM admin_audit ${sql} ORDER BY id DESC LIMIT ? OFFSET ?`).all(...args, limit, offset) as Record<string, unknown>[];
    res.json({
      items: rows.map((r) => ({
        id: r.id,
        createdAt: r.created_at,
        source: r.source,
        // Legacy CLI rows may hold raw --phone arguments etc.: everything free-form is scrubbed for every role.
        operator: scrubText(String(r.operator ?? "")),
        actorRole: r.actor_role,
        action: r.action ?? r.command,
        targetType: r.target_type,
        targetId: r.target_id == null ? null : scrubText(String(r.target_id)),
        reason: scrubText(String(r.reason ?? "")),
        outcome: r.outcome,
        self: !!r.self,
        before: r.before ? scrubJson(r.before) : null,
        after: r.after ? scrubJson(r.after) : null,
        args: r.args ? scrubJson(r.args) : null,
        ip: maskIp(r.ip as string | null), // IPs are masked for every role in lists
        userAgent: r.user_agent,
      })),
      page: p,
      limit,
      total,
    });
  });
  get("owner", "/access-log", (req, res) => {
    const { limit, page: p, offset } = page(req);
    const where: string[] = [];
    const args: unknown[] = [];
    if (req.query.actor) where.push("a.actor_user_id = ?"), args.push(String(req.query.actor));
    if (req.query.targetId) where.push("a.target_id = ?"), args.push(String(req.query.targetId));
    const sql = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const total = (db.prepare(`SELECT COUNT(*) n FROM admin_access_log a ${sql}`).get(...args) as { n: number }).n;
    const items = (db
      .prepare(`SELECT a.*, u.display_name actorName, t.display_name targetName FROM admin_access_log a LEFT JOIN users u ON u.id = a.actor_user_id LEFT JOIN users t ON t.id = a.target_id ${sql} ORDER BY a.id DESC LIMIT ? OFFSET ?`)
      .all(...args, limit, offset) as Record<string, unknown>[]).map((r) => ({
      id: r.id,
      createdAt: r.created_at,
      actorUserId: r.actor_user_id,
      actorName: r.actorName,
      actorRole: r.actor_role,
      kind: r.kind,
      targetId: r.target_id,
      targetName: r.targetName,
      detail: r.detail ? scrubText(String(r.detail)) : null,
      ip: maskIp(r.ip as string | null),
    }));
    res.json({ items, page: p, limit, total });
  });

  // ---- CSV export (owner; masked unless full=1 + step-up). Logged. ----
  get("owner", "/export/:dataset", (req, res) => {
    const s = staff(req);
    const dataset = req.params.dataset ?? "";
    if (!["users", "bets", "ledger", "purchases", "audit"].includes(dataset)) return fail(res, 400, "invalid_filter", { field: "dataset" });
    const full = req.query.full === "1";
    if (full && !stepUpOk(req)) return fail(res, 403, "step_up_required", { action: "export_full" });
    const wait = rl.export(s.user.id);
    if (wait) return fail(res, 429, "rate_limited", { retryAfter: wait });
    const max = cfg.exportMaxRows;
    let head: string[] = [];
    let rows: unknown[][] = [];
    if (dataset === "users") {
      head = ["id", "display_name", "phone", "email", "whatsapp", "telegram", "role", "balance", "flagged", "created_at", "last_login_at"];
      rows = (db.prepare("SELECT u.*, w.balance, w.flagged FROM users u LEFT JOIN wallets w ON w.user_id = u.id ORDER BY u.created_at DESC LIMIT ?").all(max) as (UserRow & { balance: number | null; flagged: number | null; role?: string })[]).map((u) => [
        u.id,
        full ? u.display_name : scrubText(u.display_name),
        full ? u.phone_e164 : maskPhone(u.phone_e164),
        full ? u.email : maskEmail(u.email),
        full ? u.whatsapp : maskPhone(u.whatsapp),
        full ? (u.telegram ? `@${u.telegram}` : null) : maskTelegram(u.telegram),
        effectiveRole(u, cfg),
        u.balance ?? 0,
        u.flagged ? 1 : 0,
        u.created_at,
        u.last_login_at,
      ]);
    } else if (dataset === "bets") {
      head = ["id", "user_id", "mode", "placed_at", "date", "venue", "bet_type", "cost", "payout", "status"];
      rows = (db.prepare(`SELECT * FROM (${BET_UNION}) ORDER BY ts DESC LIMIT ?`).all(max) as Record<string, unknown>[]).map((r) => [r.id, r.user_id, r.mode, r.ts, r.date, r.venue, r.bet_type, r.cost, r.payout, r.status]);
    } else if (dataset === "ledger") {
      head = ["id", "user_id", "kind", "amount", "balance_after", "ref_type", "ref_id", "actor", "created_at"];
      rows = (db.prepare("SELECT * FROM credit_ledger ORDER BY id DESC LIMIT ?").all(max) as Record<string, unknown>[]).map((r) => [r.id, r.user_id, r.kind, r.amount, r.balance_after, r.ref_type, r.ref_id, r.actor == null ? null : scrubText(String(r.actor)), r.created_at]);
    } else if (dataset === "purchases") {
      head = ["session_id", "user_id", "plan_id", "amount_hkd", "credits", "status", "payment_intent_id", "created_at", "paid_at"];
      rows = (db.prepare("SELECT * FROM purchases ORDER BY created_at DESC LIMIT ?").all(max) as Record<string, unknown>[]).map((r) => [
        r.stripe_session_id,
        r.user_id,
        r.plan_id,
        r.amount_hkd,
        r.credits,
        r.status,
        r.payment_intent_id,
        new Date(Number(r.created_at)).toISOString(),
        r.paid_at ? new Date(Number(r.paid_at)).toISOString() : null,
      ]);
    } else {
      head = ["id", "created_at", "source", "operator", "actor_role", "action", "target_type", "target_id", "outcome", "reason"];
      rows = (db.prepare("SELECT * FROM admin_audit ORDER BY id DESC LIMIT ?").all(max) as Record<string, unknown>[]).map((r) => [
        r.id,
        r.created_at,
        r.source,
        scrubText(String(r.operator ?? "")),
        r.actor_role,
        r.action ?? r.command,
        r.target_type,
        r.target_id == null ? null : scrubText(String(r.target_id)),
        r.outcome,
        scrubText(String(r.reason ?? "")),
      ]);
    }
    logAccess(db, { actorUserId: s.user.id, actorRole: s.role, kind: "export", detail: `${dataset}${full ? " (full contact details)" : ""}; ${rows.length} rows`, ip: ip(req) });
    const stamp = new Date().toISOString().slice(0, 10);
    res.set({ "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="post-time-${dataset}-${stamp}${full ? "-full" : ""}.csv"` });
    // Every cell is scrubbed, except the contact columns of a full (step-up) users export, which exist to carry them.
    const keep = new Set(full && dataset === "users" ? [1, 2, 3, 4, 5] : []);
    res.send("﻿" + csvRow(head) + rows.map((row) => csvRow(row.map((c, i) => (keep.has(i) ? c : scrubCell(c))))).join(""));
  });

  // ---- owner writes ----
  /** Route-level refusals (step-up missing, bad amount…) are audited as failures too. */
  const auditRefused = (req: Request, action: string, targetType: "user" | "bet" | "race" | "meeting", targetId: string, code: string) => {
    const a = actorOf(req);
    writeAudit(db, {
      source: "panel",
      operator: a.operator,
      actorUserId: a.userId,
      actorRole: a.role,
      action,
      targetType,
      targetId,
      args: scrubValue(req.body ?? {}),
      after: { code },
      reason: String(req.body?.reason ?? "").trim(),
      ip: a.ip,
      userAgent: a.userAgent,
      outcome: "refused",
    });
  };
  const needStepUp = (req: Request, res: Response, action: string, audit: { action: string; targetType: "user" | "bet" | "race" | "meeting"; targetId: string }) => {
    if (stepUpOk(req)) return false;
    auditRefused(req, audit.action, audit.targetType, audit.targetId, "step_up_required");
    fail(res, 403, "step_up_required", { action });
    return true;
  };
  const act = (req: Request) => d.actions(actorOf(req));
  const idem = (req: Request) => `panel:${req.get("idempotency-key")}`;

  write("owner", "/users/:id/role", (req, res) => {
    if (needStepUp(req, res, "role_change", { action: "role_change", targetType: "user", targetId: req.params.id ?? "" })) return null;
    const out = act(req).setRole({ userId: req.params.id ?? "", role: req.body?.role, reason: String(req.body.reason).trim(), expected: req.body?.expected, idemKey: idem(req) });
    const u = findUser(req.params.id ?? "");
    return fromResult(out, () => ({ user: u ? userDetail(u, staff(req).role) : null, auditId: out.auditId }));
  });
  write("owner", "/users/:id/credits", (req, res) => {
    const amount = req.body?.amount;
    if (typeof amount !== "number" || !Number.isInteger(amount) || amount === 0 || Math.abs(amount) > cfg.maxAdjust) {
      auditRefused(req, "credit_adjust", "user", req.params.id ?? "", "invalid_amount");
      return { status: 400, body: { error: { code: "invalid_amount", max: cfg.maxAdjust } } };
    }
    if (Math.abs(amount) >= cfg.stepUpCredits && needStepUp(req, res, "credit_adjust", { action: "credit_adjust", targetType: "user", targetId: req.params.id ?? "" })) return null;
    const out = act(req).adjust({ userId: req.params.id ?? "", amount, reason: String(req.body.reason).trim(), expected: req.body?.expected, idemKey: idem(req) });
    return fromResult(out, () => ({ balance: (out as { balance: number }).balance, ledgerId: (out as { ledgerId: number }).ledgerId, auditId: out.auditId }));
  });
  write("owner", "/users/:id/flag", (req) => {
    if (typeof req.body?.flagged !== "boolean") return { status: 400, body: { error: { code: "invalid_filter", field: "flagged" } } };
    const out = act(req).setFlag({ userId: req.params.id ?? "", flagged: req.body.flagged, reason: String(req.body.reason).trim(), expected: req.body?.expected, idemKey: idem(req) });
    return fromResult(out, () => ({ flagged: req.body.flagged, auditId: out.auditId }));
  });
  write("owner", "/live-bets/:id/resolve", (req) => {
    const out = act(req).resolveBet({ betId: req.params.id ?? "", action: req.body?.action, dividend: req.body?.dividend, reason: String(req.body.reason).trim(), idemKey: idem(req) });
    return fromResult(out, () => ({ status: (out as { status: string }).status, payout: (out as { payout: number }).payout, refund: (out as { refund: number }).refund, auditId: out.auditId }));
  });
  const voidInput = (req: Request) => ({
    date: String(req.body?.date ?? ""),
    venue: req.body?.venue as Venue,
    raceNo: req.body?.raceNo == null ? null : Number(req.body.raceNo),
    includeResulted: req.body?.includeResulted === true,
  });
  check("owner", "/races/void/preview", (req, res) => {
    const v = voidInput(req);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v.date) || (v.venue !== "ST" && v.venue !== "HV") || (v.raceNo != null && !Number.isInteger(v.raceNo))) return fail(res, 400, "invalid_filter");
    const pv = act(req).previewVoid(v);
    if (!pv.known || (v.raceNo != null && !(d.meetings().find((m) => m.date === v.date.replaceAll("-", "") && m.venue === v.venue)?.races ?? []).includes(v.raceNo)))
      return fail(res, 404, "not_found");
    res.json({ races: pv.races, skipped: pv.skipped, bets: pv.bets, users: pv.users, refundTotal: pv.refundTotal });
  });
  write("owner", "/races/void", (req, res) => {
    const v = voidInput(req);
    if (
      (v.raceNo == null || v.includeResulted) &&
      needStepUp(req, res, v.raceNo == null ? "void_meeting" : "void_include_resulted", {
        action: v.raceNo == null ? "void_meeting" : "void_race",
        targetType: v.raceNo == null ? "meeting" : "race",
        targetId: v.raceNo == null ? `${v.date}-${v.venue}` : `${v.date}-${v.venue}-${v.raceNo}`,
      })
    )
      return null;
    const out = act(req).voidRaces({ ...v, reason: String(req.body.reason).trim(), idemKey: idem(req) });
    return fromResult(out, () => ({ voided: (out as { voided: number[] }).voided, skipped: (out as { skipped: number[] }).skipped, settled: (out as { settled: number }).settled, auditId: out.auditId }));
  });

  // Anything else under /api/admin: 404 in our error shape (after the auth checks would have run).
  // Unknown paths answer exactly like real ones until the caller is staff: guests 401, users 403, then 404.
  r.use(staffGate("admin", false), (_req, res) => fail(res, 404, "not_found"));
  return r;
}

/** Writes need a verified admin session; this also lets other modules check a request's staff role. */
export type { StaffCtx };
export const _test = { limiter };
// Keep NextFunction referenced for handlers that may grow middleware.
export type _Next = NextFunction;
