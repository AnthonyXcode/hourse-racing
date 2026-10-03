// Test harness: membership + credits routers on an ephemeral port, in-memory DBs, fake race data, a
// controllable clock and a fake Stripe client that signs webhooks with the real SDK helper.
import express from "express";
import type { AddressInfo } from "net";
import type { Server } from "http";
import Stripe from "stripe";
import { openMembersDb } from "../members/db";
import { openDb } from "../momentum/db";
import { loadConfig } from "../members/config";
import { mockOtp } from "../members/otp";
import { createMembers } from "../members/service";
import { membersRouter } from "../members/routes";
import { apiErrorHandler } from "../apiErrors";
import type { RaceResult, Venue } from "../../shared/types";
import { loadCreditsConfig, type CreditsConfig } from "./config";
import type { CardRunner } from "./grade";
import { creditsRouter, memberHooks, stripeWebhookRouter } from "./routes";
import { createCredits } from "./service";
import type { StripeClient } from "./stripe";

export const DATE = "20261005";
export const ISO_DATE = "2026-10-05";
/** 2026-10-05 12:00 HKT. */
export const T0 = Date.parse("2026-10-05T12:00:00+08:00");
export const WHSEC = "whsec_test_secret";

export function runners(n: number, scratched: number[] = []): CardRunner[] {
  return Array.from({ length: n }, (_, i) => ({ horseNumber: i + 1, isScratched: scratched.includes(i + 1) }));
}

/** A result: finish order as [horse, position] pairs plus dividends. */
export function result(raceNumber: number, order: [number, number][], div: Partial<RaceResult> = {}): RaceResult {
  return {
    raceNumber,
    class: "Class 4",
    distance: 1200,
    finishOrder: order.map(([h, p]) => ({ horseNumber: h, finishPosition: p, horseName: `H${h}`, horseCode: `C${h}`, winOdds: 5 })),
    winDividend: 50,
    ...div,
  };
}

export async function harness(env: Record<string, string> = {}) {
  let now = T0;
  const clock = () => now;
  const lines: string[] = [];
  const alerts: string[] = [];
  const membersDb = openMembersDb(":memory:");
  const raceDb = openDb(":memory:");
  const cards = new Map<number, CardRunner[]>([
    [1, runners(10)],
    [2, runners(10)],
    [3, runners(10)],
  ]);
  const results: RaceResult[] = [];
  const cfg: CreditsConfig = { ...loadCreditsConfig({ FUTURE_BETTING: "1", DATA_FETCH: "1", STRIPE_WEBHOOK_SECRET: WHSEC, ...env }), appOrigin: "http://localhost:5173" };
  const sdk = new Stripe("sk_test_dummy");
  const sessions: Stripe.Checkout.SessionCreateParams[] = [];
  let stripeFails = false;
  const stripe: StripeClient = {
    checkout: {
      sessions: {
        create: async (params) => {
          await new Promise((r) => setTimeout(r, 30)); // a network round trip: parallel requests overlap here
          if (stripeFails) throw new Error("stripe down");
          sessions.push(params);
          const id = `cs_test_${sessions.length}`;
          return { id, url: `https://checkout.stripe.com/c/pay/${id}` };
        },
      },
    },
    webhooks: sdk.webhooks,
  };
  const c = createCredits({
    cfg,
    membersDb,
    raceDb,
    stripe: env.NO_STRIPE ? null : stripe,
    clock,
    realNow: clock,
    log: (l) => alerts.push(l),
    data: {
      races: (date: string, venue: Venue) => (date === DATE && venue === "ST" ? [1, 2, 3] : null),
      results: (date: string, venue: Venue) => (date === DATE && venue === "ST" && results.length ? results : null),
      card: (date: string, venue: Venue, n: number) => (date === DATE && venue === "ST" ? (cards.get(n) ?? null) : null),
    },
  });
  // Post times: R1 13:00, R2 13:30, R3 14:00 (HKT), fresh.
  c.schedule.upsert(
    [1, 2, 3].map((n) => ({ date: ISO_DATE, venue: "ST", raceNo: n, postTime: new Date(T0 + 3_600_000 + (n - 1) * 1_800_000).toISOString() })),
    "test"
  );

  const m = createMembers({ ...loadConfig({}), avatarDir: "/nonexistent" }, {
    db: membersDb,
    provider: mockOtp({ log: (l) => lines.push(l) }),
    fetch: (async () => new Response(JSON.stringify({ success: true }))) as unknown as typeof fetch,
    log: () => {},
  });
  m.hooks = memberHooks(c);
  const app = express();
  app.use("/api/stripe/webhook", stripeWebhookRouter(c));
  app.use(express.json());
  app.use("/api", membersRouter(m));
  app.use("/api", creditsRouter(c, m));
  app.use("/api", apiErrorHandler);
  const server: Server = app.listen(0);
  await new Promise((r) => server.once("listening", r));
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}/api`;

  const call = async (method: string, url: string, body?: unknown, cookie?: string, headers: Record<string, string> = {}) => {
    const r = await fetch(base + url, {
      method,
      headers: { ...(body !== undefined ? { "Content-Type": "application/json" } : {}), ...(cookie ? { Cookie: cookie } : {}), ...headers },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const text = await r.text();
    return { status: r.status, body: text ? JSON.parse(text) : null };
  };

  let n = 0;
  /** Sign up / log in a phone (each call uses a fresh number unless given). */
  async function login(phone = `+8529${String(1000000 + ++n)}`) {
    m.limiter.forgetPhone(phone);
    await call("POST", "/auth/otp/start", { phone, turnstileToken: "ok", locale: "en" });
    const code = /code=(\d{6})/.exec(lines.at(-1)!)![1];
    const r = await fetch(base + "/auth/otp/check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone, code }) });
    const body = await r.json();
    return { cookie: r.headers.get("set-cookie")!.split(";")[0]!, user: body.user, isNew: body.isNew as boolean, phone };
  }
  /** A logged-in member who has declared 18+. */
  async function member(phone?: string) {
    const u = await login(phone);
    await call("POST", "/me/declarations", { kind: "adult_18", confirm: true, termsVersion: cfg.termsVersion }, u.cookie);
    return u;
  }

  const signedWebhook = async (event: object, opts: { secret?: string; badSig?: boolean; headers?: Record<string, string> } = {}) => {
    const payload = JSON.stringify(event);
    const header = opts.badSig ? "t=1,v1=deadbeef" : sdk.webhooks.generateTestHeaderString({ payload, secret: opts.secret ?? WHSEC });
    const r = await fetch(base + "/stripe/webhook", { method: "POST", headers: { "Content-Type": "application/json", "Stripe-Signature": header, ...opts.headers }, body: payload });
    return { status: r.status, body: await r.json() };
  };

  return {
    c,
    m,
    cfg,
    db: membersDb,
    raceDb,
    cards,
    results,
    sessions,
    alerts,
    call,
    login,
    member,
    signedWebhook,
    setNow: (t: number) => (now = t),
    failStripe: (on: boolean) => (stripeFails = on),
    close: () => server.close(),
  };
}
export type Harness = Awaited<ReturnType<typeof harness>>;

/** A Trio bet on race `race` with legs `legs` at `unit`. */
export const trio = (race: number, legs: number[], unit = 10, bankers: number[] = []) => ({
  date: DATE,
  venue: "ST",
  unit,
  selection: { type: "trio", raceLegs: [{ raceNumber: race, bankers, legs }] },
});
