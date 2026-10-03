// Credits / LIVE / Stripe API (docs/credits/PRD.md §6.2). Mounted at /api after the members router.
// Every mutating member route goes through the same CSRF guard as membership; the Stripe webhook is a
// separate raw-body router with NO Origin guard and no session (it is authenticated by its signature).
import express, { Router, type RequestHandler } from "express";
import { randomUUID } from "crypto";
import type { MembersDeps, MemberHooks } from "../members/routes";
import { authKit, fail } from "../members/routes";
import { toMember, type UserRow } from "../members/users";
import { PLANS } from "../../shared/credits/plans";
import { MIN_LIVE_UNIT } from "../../shared/credits/rules";
import type { CreditsSummary } from "../../shared/types";
import { liveToHistory } from "./liveBets";
import type { Credits } from "./service";

const HOUR = 3_600_000;

/** Fixed-window-ish per-member limiter (in memory; single process). */
function perMember(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (userId: string, now = Date.now()): number => {
    const list = (hits.get(userId) ?? []).filter((t) => now - t < windowMs);
    if (list.length >= max) {
      hits.set(userId, list);
      return Math.ceil((list[0]! + windowMs - now) / 1000);
    }
    list.push(now);
    hits.set(userId, list);
    return 0;
  };
}

export function memberHooks(c: Credits): MemberHooks {
  const { db, cfg } = c;
  const grant = (u: UserRow) => {
    // Cheap fast path: this user already has their bonus row.
    if (db.prepare("SELECT 1 FROM credit_ledger WHERE idem_key = ?").get(`bonus:${u.id}`)) return;
    c.ledger.grantSignupBonus(u, cfg.signupBonus, cfg.pepper);
  };
  return {
    config: () => ({
      features: { liveBetting: c.liveOn(), purchases: cfg.futureBetting },
      credits: { signupBonus: cfg.signupBonus, minUnit: MIN_LIVE_UNIT, termsVersion: cfg.termsVersion, dailyCapHkd: cfg.dailyCapHkd },
    }),
    onLogin: (u) => grant(u),
    onAuthenticated: (u) => grant(u),
    extendMember: (u) => ({
      adultDeclaredAt: (db.prepare("SELECT declared_at FROM declarations WHERE user_id = ? AND kind = 'adult_18'").get(u.id) as { declared_at: string } | undefined)?.declared_at ?? null,
    }),
    beforeDelete: (u) => {
      const t = new Date(c.clock()).toISOString();
      // Pending LIVE bets are voided WITHOUT refund (credits are forfeited); the rows go with the user.
      db.prepare("UPDATE live_bets SET status = 'void', settled_at = ? WHERE user_id = ? AND status = 'pending'").run(t, u.id);
      // Ledger, purchases and audit rows are kept for accounting, anonymised with a tombstone id.
      const tomb = `deleted:${randomUUID()}`;
      db.prepare("UPDATE credit_ledger SET user_id = ? WHERE user_id = ?").run(tomb, u.id);
      db.prepare("UPDATE purchases SET user_id = ? WHERE user_id = ?").run(tomb, u.id);
      db.prepare("UPDATE admin_audit SET args = replace(args, ?, ?), before = replace(before, ?, ?), after = replace(after, ?, ?)").run(u.id, tomb, u.id, tomb, u.id, tomb);
    },
    liveHistory: (userId) => c.live.list(userId).map(liveToHistory),
  };
}

export function creditsRouter(c: Credits, m: Pick<MembersDeps, "cfg" | "sessions" | "users">): Router {
  const r = Router();
  const { csrf, requireMember, me } = authKit(m);
  const { db, cfg } = c;
  const post = (path: string, ...h: RequestHandler[]) => r.post(path, csrf(), requireMember, ...h);
  const checkoutLimit = perMember(10, HOUR);
  const betLimit = perMember(60, HOUR);
  const sweptAt = new Map<string, number>();

  const declared = (userId: string) => !!db.prepare("SELECT 1 FROM declarations WHERE user_id = ? AND kind = 'adult_18'").get(userId);
  const flagged = (userId: string) => !!c.ledger.wallet(userId)?.flagged;

  r.get("/credits", requireMember, (req, res) => {
    const u = me(req);
    memberHooks(c).onAuthenticated(u);
    const w = c.ledger.ensureWallet(u.id);
    const cursor = Number(req.query.cursor);
    const page = c.ledger.list(u.id, Number.isInteger(cursor) && cursor > 0 ? cursor : null, 20);
    const unseen = db
      .prepare<[string, string], { n: number; net: number | null }>(
        "SELECT COUNT(*) n, SUM(payout + refund - stake) net FROM live_bets WHERE user_id = ? AND status <> 'pending' AND settled_at > ?"
      )
      .get(u.id, w.settled_seen_at ?? "")!;
    const body: CreditsSummary = {
      balance: w.balance,
      flagged: !!w.flagged,
      pending: c.live.pendingSummary(u.id),
      ledger: page.rows,
      nextCursor: page.nextCursor,
      welcome: !!w.welcome_pending,
      unseenSettled: { count: unseen.n, net: unseen.net ?? 0 },
      purchasedTodayHkd: c.purchases.spentToday(u.id),
      dailyCapHkd: cfg.dailyCapHkd,
    };
    res.json(body);
  });

  post("/credits/seen", (req, res) => {
    const u = me(req);
    c.ledger.ensureWallet(u.id);
    if (req.body?.kind === "welcome") db.prepare("UPDATE wallets SET welcome_pending = 0 WHERE user_id = ?").run(u.id);
    else if (req.body?.kind === "settled") db.prepare("UPDATE wallets SET settled_seen_at = ? WHERE user_id = ?").run(new Date(c.clock()).toISOString(), u.id);
    else return fail(res, 400, "bad_request");
    res.json({ ok: true });
  });

  r.get("/credits/plans", (_req, res) => {
    if (!cfg.futureBetting) return fail(res, 503, "feature_disabled");
    res.json(PLANS.map((p) => ({ id: p.id, priceHkd: p.priceHkd, credits: p.credits, bonusPct: p.bonusPct, badge: p.badge })));
  });

  post("/me/declarations", (req, res) => {
    const u = me(req);
    if (req.body?.kind !== "adult_18" || req.body?.confirm !== true) return fail(res, 400, "confirm_required");
    db.prepare("INSERT OR IGNORE INTO declarations (user_id, kind, terms_version, declared_at, ip) VALUES (?, 'adult_18', ?, ?, ?)").run(
      u.id,
      typeof req.body.termsVersion === "string" ? req.body.termsVersion.slice(0, 40) : cfg.termsVersion,
      new Date(c.clock()).toISOString(),
      req.ip ?? null
    );
    res.json({ user: { ...toMember(u), ...memberHooks(c).extendMember(u) } });
  });

  post("/credits/checkout", async (req, res) => {
    const u = me(req);
    if (!cfg.futureBetting) return fail(res, 503, "feature_disabled");
    if (!declared(u.id)) return fail(res, 403, "age_declaration_required");
    if (flagged(u.id)) return fail(res, 403, "account_flagged");
    const wait = checkoutLimit(u.id);
    if (wait) return fail(res, 429, "rate_limited", { retryAfter: wait });
    const out = await c.purchases.createCheckout(u.id, req.body?.planId); // only planId is read; any amount is ignored
    if ("url" in out) return res.json(out);
    if (out.code === "daily_cap_reached") return fail(res, out.status, out.code, out.extra);
    fail(res, out.status, out.code, out.extra);
  });

  r.get("/credits/purchases/:sessionId", requireMember, (req, res) => {
    const u = me(req);
    const s = c.purchases.status(u.id, req.params.sessionId ?? "");
    if (!s) return fail(res, 404, "not_found");
    res.json({ ...s, balance: c.ledger.ensureWallet(u.id).balance });
  });

  post("/live-bets", (req, res) => {
    const u = me(req);
    if (!c.liveOn()) return fail(res, 503, "feature_disabled");
    if (!declared(u.id)) return fail(res, 403, "age_declaration_required");
    if (flagged(u.id)) return fail(res, 403, "account_flagged");
    const key = req.get("idempotency-key") ?? "";
    if (!/^[A-Za-z0-9-]{8,64}$/.test(key)) return fail(res, 400, "idempotency_key_required");
    const wait = betLimit(u.id);
    if (wait) return fail(res, 429, "rate_limited", { retryAfter: wait });
    const out = c.live.place(u.id, key, req.body);
    res.status(out.status).json(out.body);
  });

  r.get("/live-bets", requireMember, (req, res) => {
    const u = me(req);
    // On-demand settlement for this member, at most once a minute (§4.1).
    const last = sweptAt.get(u.id) ?? 0;
    if (Date.now() - last > 60_000) {
      sweptAt.set(u.id, Date.now());
      c.settle.sweep({ userId: u.id });
    }
    const f = req.query.status === "pending" || req.query.status === "settled" ? req.query.status : "all";
    res.json({ bets: c.live.list(u.id, f), serverNow: new Date(c.clock()).toISOString() });
  });

  return r;
}

/** POST /api/stripe/webhook — mount BEFORE express.json() so the signature is checked on the raw bytes. */
export function stripeWebhookRouter(c: Credits): Router {
  const r = Router();
  r.post("/", express.raw({ type: "application/json", limit: "1mb" }), (req, res) => {
    const out = c.purchases.webhook(Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0), req.get("stripe-signature"));
    res.status(out.status).json(out.body);
  });
  return r;
}
