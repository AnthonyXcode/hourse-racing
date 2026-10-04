// Stripe purchases (docs/credits/PRD.md §5): hosted Checkout in HKD built from the server's plan table,
// credits granted only by the signed webhook, exactly once. Purchase times use the REAL clock (never DEV_NOW):
// they are about real money and Stripe's own timestamps.
import { createHash, randomUUID } from "crypto";
import type Stripe from "stripe";
import type { MembersDB } from "../members/db";
import { planById } from "../../shared/credits/plans";
import { hkMidnight } from "../clock";
import type { CreditsConfig } from "./config";
import type { Ledger } from "./ledger";

/** The parts of the Stripe SDK we use (tests pass a fake). */
export interface StripeClient {
  checkout: { sessions: { create(params: Stripe.Checkout.SessionCreateParams, opts?: Stripe.RequestOptions): Promise<{ id: string; url: string | null }> } };
  webhooks: { constructEvent(payload: Buffer | string, header: string, secret: string): Stripe.Event };
}

/**
 * Checkout sessions expire after 30 min (Stripe's minimum) plus a 60 s margin so the request isn't rejected
 * for latency. Open reservations older than this no longer count against the daily cap.
 */
export const SESSION_TTL_S = 31 * 60;

interface PurchaseRow {
  stripe_session_id: string;
  user_id: string;
  plan_id: string;
  amount_hkd: number;
  credits: number;
  status: "open" | "paid" | "expired" | "refunded" | "disputed";
  payment_intent_id: string | null;
  reversed_credits: number;
  created_at: number;
  paid_at: number | null;
}

export type Fail = { status: number; code: string; extra?: Record<string, unknown> };
const tail = (id: string) => `…${id.slice(-4)}`;

export function purchases(deps: {
  db: MembersDB;
  ledger: Ledger;
  cfg: CreditsConfig;
  stripe: StripeClient | null;
  realNow?: () => number;
  log?: (l: string) => void;
  onAlert?: (a: { key: string; kind: string; message: string; refType: string; refId: string }) => void;
}) {
  const { db, ledger, cfg } = deps;
  const realNow = deps.realNow ?? Date.now;
  const log = deps.log ?? ((l: string) => console.error(l));
  const alert = (m: string) => {
    log(`[credits:alert] ${m}`);
    deps.onAlert?.({ key: `webhook:${createHash("sha256").update(m).digest("hex").slice(0, 16)}`, kind: "webhook_mismatch", message: m, refType: "purchase", refId: "" });
  };
  const byId = db.prepare<[string], PurchaseRow>("SELECT * FROM purchases WHERE stripe_session_id = ?");
  const byPi = db.prepare<[string], PurchaseRow>("SELECT * FROM purchases WHERE payment_intent_id = ?");

  /** HK$ counted against today's cap: paid today + sessions still open (created today, not expired). */
  function spentToday(userId: string): number {
    const now = realNow();
    const r = db
      .prepare<[string, number, number], { s: number | null }>(
        "SELECT SUM(amount_hkd) s FROM purchases WHERE user_id = ? AND created_at >= ? AND (status IN ('paid','refunded','disputed') OR (status = 'open' AND created_at > ?))"
      )
      .get(userId, hkMidnight(now), now - SESSION_TTL_S * 1000);
    return r?.s ?? 0;
  }

  /** Reverse a share of a purchase's credits (refund / dispute), capped at the balance. Flags when capped. */
  function reverse(p: PurchaseRow, credits: number, key: string, status: PurchaseRow["status"], forceFlag: boolean, why: string) {
    db.transaction(() => {
      const want = Math.max(0, Math.min(credits, p.credits - p.reversed_credits));
      let took = 0;
      if (want > 0 && ledger.wallet(p.user_id)) {
        const r = ledger.post({ userId: p.user_id, kind: "purchase_reversal", amount: -want, idemKey: key, refType: "purchase", refId: p.stripe_session_id, actor: "stripe", note: JSON.stringify({ planId: p.plan_id }), capAtBalance: true });
        took = r ? -r.amount : 0;
        if (!r) return; // already applied
      }
      db.prepare("UPDATE purchases SET status = ?, reversed_credits = reversed_credits + ? WHERE stripe_session_id = ?").run(status, want, p.stripe_session_id);
      if ((forceFlag || took < want) && ledger.wallet(p.user_id)) {
        db.prepare("UPDATE wallets SET flagged = 1, flag_reason = ? WHERE user_id = ?").run(why, p.user_id);
        alert(`purchase ${tail(p.stripe_session_id)} ${why}: reversed ${took} of ${want} credits; account flagged`);
      }
    }).immediate();
  }

  return {
    spentToday,

    async createCheckout(userId: string, planId: unknown): Promise<{ url: string } | Fail> {
      const plan = planById(planId);
      if (!plan) return { status: 400, code: "invalid_plan" };
      if (!deps.stripe) return { status: 503, code: "stripe_unconfigured" };
      const now = realNow();
      // Reserve the amount against today's cap BEFORE calling Stripe, in one write transaction, so parallel
      // requests can't all pass the check (the check + insert are synchronous; the Stripe call comes after).
      const reservation = `pending:${randomUUID()}`;
      const reserved = db.transaction((): Fail | null => {
        const spent = spentToday(userId);
        if (spent + plan.priceHkd > cfg.dailyCapHkd) return { status: 429, code: "daily_cap_reached", extra: { remainingHkd: Math.max(0, cfg.dailyCapHkd - spent) } };
        db.prepare("INSERT INTO purchases (stripe_session_id, user_id, plan_id, amount_hkd, credits, status, created_at) VALUES (?, ?, ?, ?, ?, 'open', ?)").run(
          reservation,
          userId,
          plan.id,
          plan.priceHkd,
          plan.credits,
          now
        );
        return null;
      }).immediate();
      if (reserved) return reserved;
      // Stripe failed: release the reservation (kept as 'expired' for the record; it no longer counts).
      const release = () => db.prepare("UPDATE purchases SET status = 'expired' WHERE stripe_session_id = ? AND status = 'open'").run(reservation);
      const metadata = { user_id: userId, plan_id: plan.id, credits: String(plan.credits) };
      let session;
      try {
        session = await deps.stripe.checkout.sessions.create(
          {
            // Stripe "Managed Payments" (Stripe as merchant of record) can be on by default for an account; it
            // needs a product tax code on every line and is meant for eligible digital goods. Credits for a
            // racing practice app are sold by us directly (no HK sales tax), so opt out explicitly. Not yet in
            // stripe-node's types, hence the cast; Stripe accepts it as a normal create parameter.
            ...({ managed_payments: { enabled: false } } as Record<string, unknown>),
            mode: "payment",
            line_items: [
              {
                quantity: 1,
                price_data: { currency: "hkd", unit_amount: plan.priceHkd * 100, product_data: { name: `Post Time credits × ${plan.credits}` } },
              },
            ],
            client_reference_id: userId,
            metadata,
            payment_intent_data: { metadata },
            customer_creation: "if_required",
            success_url: `${cfg.appOrigin}/?tab=credits&checkout=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${cfg.appOrigin}/?tab=credits&checkout=cancel`,
            expires_at: Math.floor(now / 1000) + SESSION_TTL_S,
          },
          { idempotencyKey: `checkout:${reservation}` }
        );
      } catch (e) {
        release();
        log(`[credits] checkout create failed: ${e instanceof Error ? e.message : "error"}`);
        return { status: 502, code: "payment_unavailable" };
      }
      if (!session.url) {
        release();
        return { status: 502, code: "payment_unavailable" };
      }
      db.prepare("UPDATE purchases SET stripe_session_id = ? WHERE stripe_session_id = ?").run(session.id, reservation);
      return { url: session.url };
    },

    status(userId: string, sessionId: string): { status: PurchaseRow["status"]; credits: number } | null {
      const p = byId.get(sessionId);
      return p && p.user_id === userId ? { status: p.status, credits: p.credits } : null;
    },

    /** POST /api/stripe/webhook. Returns the HTTP status and body. */
    webhook(raw: Buffer, signature: string | undefined): { status: number; body: unknown } {
      if (!deps.stripe || !cfg.stripe.webhookSecret) return { status: 503, body: { error: { code: "stripe_unconfigured" } } };
      let event: Stripe.Event;
      try {
        event = deps.stripe.webhooks.constructEvent(raw, signature ?? "", cfg.stripe.webhookSecret);
      } catch {
        return { status: 400, body: { error: { code: "bad_signature" } } };
      }
      const seen = db.prepare<[string], { processed_at: string | null }>("SELECT processed_at FROM stripe_events WHERE event_id = ?").get(event.id);
      if (seen?.processed_at) return { status: 200, body: { received: true } }; // replay
      if (!seen) db.prepare("INSERT INTO stripe_events (event_id, type, received_at) VALUES (?, ?, ?)").run(event.id, event.type, new Date(realNow()).toISOString());
      try {
        this.handle(event);
      } catch (e) {
        log(`[credits] webhook ${event.type} failed: ${e instanceof Error ? e.message : "error"}`);
        return { status: 500, body: { error: { code: "server_error" } } }; // Stripe retries; handlers are idempotent
      }
      db.prepare("UPDATE stripe_events SET processed_at = ? WHERE event_id = ?").run(new Date(realNow()).toISOString(), event.id);
      return { status: 200, body: { received: true } };
    },

    handle(event: Stripe.Event): void {
      switch (event.type) {
        case "checkout.session.completed":
        case "checkout.session.async_payment_succeeded": {
          const s = event.data.object as Stripe.Checkout.Session;
          if (s.payment_status !== "paid") return; // async methods: wait for async_payment_succeeded
          const p = byId.get(s.id);
          if (!p) return alert(`paid session ${tail(s.id)} has no purchase row (e.g. a 'stripe trigger' test event); no credits`);
          const plan = planById(p.plan_id);
          const ok =
            !!plan &&
            plan.priceHkd === p.amount_hkd &&
            plan.credits === p.credits &&
            s.amount_total === plan.priceHkd * 100 &&
            s.currency === "hkd" &&
            s.metadata?.user_id === p.user_id &&
            s.metadata?.plan_id === p.plan_id &&
            s.metadata?.credits === String(p.credits);
          if (!ok) return alert(`session ${tail(s.id)} does not match its plan (amount/currency/metadata); no credits`);
          const pi = typeof s.payment_intent === "string" ? s.payment_intent : (s.payment_intent?.id ?? null);
          db.transaction(() => {
            db.prepare("UPDATE purchases SET status = 'paid', paid_at = ?, payment_intent_id = COALESCE(?, payment_intent_id) WHERE stripe_session_id = ? AND status IN ('open','expired')").run(realNow(), pi, s.id);
            if (!ledger.wallet(p.user_id) && !db.prepare("SELECT 1 FROM users WHERE id = ?").get(p.user_id))
              return alert(`session ${tail(s.id)} paid for a deleted account; no credits`);
            ledger.post({ userId: p.user_id, kind: "purchase", amount: p.credits, idemKey: `purchase:${s.id}`, refType: "purchase", refId: s.id, actor: "stripe", note: JSON.stringify({ planId: p.plan_id }) });
          }).immediate();
          return;
        }
        case "checkout.session.expired": {
          const s = event.data.object as Stripe.Checkout.Session;
          db.prepare("UPDATE purchases SET status = 'expired' WHERE stripe_session_id = ? AND status = 'open'").run(s.id);
          return;
        }
        case "charge.refunded": {
          const c = event.data.object as Stripe.Charge;
          const pi = typeof c.payment_intent === "string" ? c.payment_intent : c.payment_intent?.id;
          const p = pi ? byPi.get(pi) : undefined;
          if (!p) return alert(`refund for an unknown payment ${pi ? tail(pi) : "?"}`);
          // Debit credits × refunded / amount (rounded up), cumulative across partial refunds.
          const total = Math.ceil((p.credits * c.amount_refunded) / c.amount);
          reverse(p, total - p.reversed_credits, `reversal:${c.id}:${c.amount_refunded}`, "refunded", false, "refund after credits were spent");
          return;
        }
        case "charge.dispute.created": {
          const d = event.data.object as Stripe.Dispute;
          const pi = typeof d.payment_intent === "string" ? d.payment_intent : d.payment_intent?.id;
          const p = pi ? byPi.get(pi) : undefined;
          if (!p) return alert(`dispute for an unknown payment ${pi ? tail(pi) : "?"}`);
          reverse(p, Math.ceil((p.credits * d.amount) / (p.amount_hkd * 100)), `reversal:${d.id}`, "disputed", true, "payment disputed");
          return;
        }
        case "charge.dispute.closed": {
          const d = event.data.object as Stripe.Dispute;
          alert(`dispute ${tail(d.id)} closed (${d.status}); no automatic re-credit — use credits adjust if needed`);
          return;
        }
        default:
          return;
      }
    },
  };
}
export type Purchases = ReturnType<typeof purchases>;
