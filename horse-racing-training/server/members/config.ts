// Membership configuration from the environment, with safe dev defaults and the production guard (PRD §5.12, §8).
import { fileURLToPath } from "url";

/** Cloudflare's official always-pass Turnstile test keys (dev only). */
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
export const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";
/** Every Cloudflare test key starts with 1x/2x/3x followed by zeros. */
const isTestKey = (k: string) => /^[123]x0000000000000000000/.test(k);

export interface MembersConfig {
  production: boolean;
  otpProvider: "mock" | "twilio";
  twilio: { accountSid: string; authToken: string; serviceSid: string };
  turnstile: { siteKey: string; secretKey: string };
  dbFile: string;
  avatarDir: string;
  sessionTtlDays: number;
  /** Allowed Origin values for state-changing requests. */
  appOrigins: string[];
  rate: { phoneHour: number; phoneDay: number; ipHour: number };
}

const root = (p: string) => fileURLToPath(new URL(`../../${p}`, import.meta.url));
const num = (v: string | undefined, d: number) => (v && Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : d);

export function loadConfig(env: NodeJS.ProcessEnv = process.env): MembersConfig {
  const production = env.NODE_ENV === "production";
  const otpProvider = (env.OTP_PROVIDER || (production ? "twilio" : "mock")) as MembersConfig["otpProvider"];
  return {
    production,
    otpProvider,
    twilio: {
      accountSid: env.TWILIO_ACCOUNT_SID ?? "",
      authToken: env.TWILIO_AUTH_TOKEN ?? "",
      serviceSid: env.TWILIO_VERIFY_SERVICE_SID ?? "",
    },
    turnstile: {
      siteKey: env.TURNSTILE_SITE_KEY || (production ? "" : TURNSTILE_TEST_SITE_KEY),
      secretKey: env.TURNSTILE_SECRET_KEY || (production ? "" : TURNSTILE_TEST_SECRET),
    },
    dbFile: env.MEMBERS_DB || root("data/members.sqlite"),
    avatarDir: env.AVATAR_DIR || root("data/avatars"),
    sessionTtlDays: num(env.SESSION_TTL_DAYS, 30),
    appOrigins: (env.APP_ORIGIN || "http://localhost:5173")
      .split(",")
      .map((s) => s.trim().replace(/\/$/, ""))
      .filter(Boolean),
    rate: {
      phoneHour: num(env.OTP_RATE_PHONE_HOUR, 5),
      phoneDay: num(env.OTP_RATE_PHONE_DAY, 10),
      ipHour: num(env.OTP_RATE_IP_HOUR, 20),
    },
  };
}

/** Problems that must stop a production server from starting. Empty outside production. */
export function productionProblems(c: MembersConfig): string[] {
  if (!c.production) return [];
  const out: string[] = [];
  if (c.otpProvider !== "twilio") out.push(`OTP_PROVIDER must be "twilio" in production (got "${c.otpProvider}")`);
  if (c.otpProvider === "twilio") {
    if (!c.twilio.accountSid) out.push("TWILIO_ACCOUNT_SID is not set");
    if (!c.twilio.authToken) out.push("TWILIO_AUTH_TOKEN is not set");
    if (!c.twilio.serviceSid) out.push("TWILIO_VERIFY_SERVICE_SID is not set");
  }
  if (!c.turnstile.siteKey || isTestKey(c.turnstile.siteKey)) out.push("TURNSTILE_SITE_KEY must be a real key in production");
  if (!c.turnstile.secretKey || isTestKey(c.turnstile.secretKey)) out.push("TURNSTILE_SECRET_KEY must be a real key in production");
  return out;
}

/** Throws when production config is unsafe (call before listening). */
export function assertProductionConfig(c: MembersConfig): void {
  const p = productionProblems(c);
  if (p.length) throw new Error(`[members] refusing to start in production:\n  - ${p.join("\n  - ")}`);
}
