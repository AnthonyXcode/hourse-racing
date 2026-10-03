// Credits / LIVE / Stripe configuration (docs/credits/PRD.md §9) and its production guards (§8.3).

export interface CreditsConfig {
  production: boolean;
  /** FUTURE_BETTING=1: LIVE bets and purchases are allowed (settlement and webhooks always run). */
  futureBetting: boolean;
  /** DATA_FETCH=1: the fetch job that supplies post times and results is running. */
  dataFetch: boolean;
  /** DEV_NOW set outside production: local testing against a dev schedule (npm run credits -- dev-schedule). */
  devClock: boolean;
  stripe: { secretKey: string; webhookSecret: string; liveApproved: boolean };
  signupBonus: number;
  /** HMAC key for bonus_claims (one bonus per phone number, ever). */
  pepper: string;
  dailyCapHkd: number;
  maxStake: number;
  /** First APP_ORIGIN entry: base for Stripe success/cancel URLs. */
  appOrigin: string;
  termsVersion: string;
}

const DEV_PEPPER = "dev-only-credits-pepper";
const int = (v: string | undefined, d: number) => (v && /^\d+$/.test(v) ? Number(v) : d);

export function loadCreditsConfig(env: NodeJS.ProcessEnv = process.env): CreditsConfig {
  const production = env.NODE_ENV === "production";
  return {
    production,
    futureBetting: env.FUTURE_BETTING === "1",
    dataFetch: env.DATA_FETCH === "1",
    devClock: !production && !!env.DEV_NOW,
    stripe: {
      secretKey: env.STRIPE_SECRET_KEY ?? "",
      webhookSecret: env.STRIPE_WEBHOOK_SECRET ?? "",
      liveApproved: env.STRIPE_LIVE_APPROVED === "1",
    },
    signupBonus: int(env.CREDITS_SIGNUP_BONUS, 1000),
    pepper: env.CREDITS_PEPPER || (production ? "" : DEV_PEPPER),
    dailyCapHkd: int(env.PURCHASE_DAILY_CAP_HKD, 1000),
    maxStake: int(env.LIVE_MAX_STAKE, 50_000),
    appOrigin: (env.APP_ORIGIN || "http://localhost:5173").split(",")[0]!.trim().replace(/\/$/, ""),
    termsVersion: "2026-10-03",
  };
}

/**
 * LIVE is usable only with the kill switch on AND the fetch job running (§2.2). Exception for local testing:
 * with DEV_NOW (never in production) a dev schedule stands in for the fetch job.
 */
export const liveEnabled = (c: CreditsConfig) => c.futureBetting && (c.dataFetch || c.devClock);

/** Reasons the server must refuse to start. */
export function creditsProductionProblems(c: CreditsConfig, env: NodeJS.ProcessEnv = process.env): string[] {
  const out: string[] = [];
  // A live key is refused anywhere (dev included) until legal + Stripe clearance (PRD gate).
  if (c.stripe.secretKey.startsWith("sk_live_") && !c.stripe.liveApproved)
    out.push("STRIPE_SECRET_KEY is a live key but STRIPE_LIVE_APPROVED is not 1 (legal / Stripe approval gate)");
  if (!c.production) return out;
  if (env.DEV_NOW) out.push("DEV_NOW must not be set in production");
  if (!c.pepper || c.pepper === DEV_PEPPER) out.push("CREDITS_PEPPER must be set to a secret value in production");
  if (c.futureBetting && (!c.stripe.secretKey || !c.stripe.webhookSecret))
    out.push("FUTURE_BETTING=1 needs STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET");
  return out;
}

/** Non-fatal startup warnings. */
export function creditsWarnings(c: CreditsConfig): string[] {
  const out: string[] = [];
  if (c.production && c.stripe.secretKey.startsWith("sk_test_")) out.push("Stripe is in TEST mode (sk_test_ key) in production");
  if (c.futureBetting && !c.dataFetch && !c.devClock) out.push("FUTURE_BETTING=1 but DATA_FETCH is not 1: LIVE betting stays disabled (no post times or results)");
  if (c.futureBetting && !c.dataFetch && c.devClock) out.push("DEV_NOW without DATA_FETCH: LIVE runs on the dev schedule only (no results are fetched; store them yourself or settle with the CLI)");
  return out;
}
