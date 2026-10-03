// SMS one-time codes: a provider interface (PRD §7) with Twilio Verify and a dev mock, plus our own
// challenge bookkeeping (expiry, 5 attempts per code) in otp_challenges, which applies to both.
import { createHash, randomInt } from "crypto";
import type { MembersDB } from "./db";
import type { MemberLocale } from "../../shared/types";
import { OTP_LENGTH, OTP_MAX_ATTEMPTS, OTP_TTL_SECONDS, maskPhoneLog } from "../../shared/validation";

export type CheckResult = "approved" | "wrong" | "expired";

export interface OtpProvider {
  readonly name: "mock" | "twilio";
  /** Send a code by SMS. Throws when the SMS could not be sent. */
  start(phoneE164: string, locale: MemberLocale): Promise<void>;
  check(phoneE164: string, code: string): Promise<CheckResult>;
}

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

/**
 * Dev provider: a random 6-digit code kept (hashed) in memory, printed to the server console.
 * Never used in production (config guard). A new start replaces the previous code.
 */
export function mockOtp(opts: { log?: (line: string) => void; now?: () => number; ttlMs?: number } = {}): OtpProvider {
  const log = opts.log ?? ((l: string) => console.log(l));
  const now = opts.now ?? Date.now;
  const ttl = opts.ttlMs ?? OTP_TTL_SECONDS * 1000;
  const codes = new Map<string, { hash: string; expiresAt: number }>();
  return {
    name: "mock",
    async start(phone) {
      const code = String(randomInt(0, 10 ** OTP_LENGTH)).padStart(OTP_LENGTH, "0");
      codes.set(phone, { hash: sha256(`${phone}:${code}`), expiresAt: now() + ttl });
      log(`[otp:mock] ${maskPhoneLog(phone)} code=${code}`);
    },
    async check(phone, code) {
      const c = codes.get(phone);
      if (!c || c.expiresAt <= now()) {
        codes.delete(phone);
        return "expired";
      }
      if (c.hash !== sha256(`${phone}:${code}`)) return "wrong";
      codes.delete(phone);
      return "approved";
    },
  };
}

/** Twilio Verify v2 over plain fetch (no SDK). Credentials only ever come from the environment. */
export function twilioOtp(cfg: { accountSid: string; authToken: string; serviceSid: string }, fetchImpl: typeof fetch = fetch): OtpProvider {
  const base = `https://verify.twilio.com/v2/Services/${encodeURIComponent(cfg.serviceSid)}`;
  const auth = "Basic " + Buffer.from(`${cfg.accountSid}:${cfg.authToken}`).toString("base64");
  const post = (path: string, form: Record<string, string>) =>
    fetchImpl(`${base}/${path}`, {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(form),
      signal: AbortSignal.timeout(15_000),
    });
  return {
    name: "twilio",
    async start(phone, locale) {
      const r = await post("Verifications", { To: phone, Channel: "sms", Locale: locale === "en" ? "en" : "zh-hk" });
      if (!r.ok) throw new Error(`twilio verify start failed: HTTP ${r.status}`);
    },
    async check(phone, code) {
      const r = await post("VerificationCheck", { To: phone, Code: code });
      // 404: no pending verification (expired, approved or max attempts reached on Twilio's side).
      if (r.status === 404 || r.status === 429) return "expired";
      if (!r.ok) throw new Error(`twilio verify check failed: HTTP ${r.status}`);
      const body = (await r.json()) as { status?: string };
      return body.status === "approved" ? "approved" : body.status === "pending" ? "wrong" : "expired";
    },
  };
}

export type ChallengeCheck =
  | { ok: true; locale: MemberLocale }
  | { ok: false; code: "invalid_code"; attemptsLeft: number }
  | { ok: false; code: "code_expired" | "too_many_attempts" };

interface ChallengeRow {
  id: number;
  attempts: number;
  expires_at: number;
  locale: MemberLocale;
}

/** One live challenge per phone, with our own expiry and attempt count on top of the provider's. */
export function otpChallenges(db: MembersDB, provider: OtpProvider, now: () => number = Date.now) {
  const live = db.prepare<[string], ChallengeRow>(
    "SELECT id, attempts, expires_at, locale FROM otp_challenges WHERE phone_e164 = ? AND status = 'pending' ORDER BY created_at DESC, id DESC LIMIT 1"
  );
  const kill = db.prepare("UPDATE otp_challenges SET status = 'dead' WHERE phone_e164 = ? AND status = 'pending'");
  const setStatus = db.prepare("UPDATE otp_challenges SET status = ? WHERE id = ?");
  const bump = db.prepare("UPDATE otp_challenges SET attempts = attempts + 1 WHERE id = ?");
  const insert = db.prepare(
    "INSERT INTO otp_challenges (phone_e164, provider, locale, attempts, created_at, expires_at, status) VALUES (?, ?, ?, 0, ?, ?, 'pending')"
  );

  return {
    /** Ask the provider to send; on success the previous challenge is replaced. Throws if the send failed. */
    async start(phone: string, locale: MemberLocale): Promise<void> {
      await provider.start(phone, locale);
      const t = now();
      db.transaction(() => {
        kill.run(phone);
        insert.run(phone, provider.name, locale, t, t + OTP_TTL_SECONDS * 1000);
      })();
    },

    async check(phone: string, code: string): Promise<ChallengeCheck> {
      const c = live.get(phone);
      if (!c) return { ok: false, code: "code_expired" };
      if (c.expires_at <= now()) {
        setStatus.run("dead", c.id);
        return { ok: false, code: "code_expired" };
      }
      if (c.attempts >= OTP_MAX_ATTEMPTS) {
        setStatus.run("dead", c.id);
        return { ok: false, code: "too_many_attempts" };
      }
      bump.run(c.id); // count before asking the provider, so parallel guesses can't exceed the limit
      const attempts = c.attempts + 1;
      const result: CheckResult = /^\d+$/.test(code) && code.length === OTP_LENGTH ? await provider.check(phone, code) : "wrong";
      if (result === "approved") {
        setStatus.run("approved", c.id);
        return { ok: true, locale: c.locale };
      }
      if (result === "expired") {
        setStatus.run("dead", c.id);
        return { ok: false, code: "code_expired" };
      }
      if (attempts >= OTP_MAX_ATTEMPTS) {
        setStatus.run("dead", c.id);
        return { ok: false, code: "too_many_attempts" };
      }
      return { ok: false, code: "invalid_code", attemptsLeft: OTP_MAX_ATTEMPTS - attempts };
    },

    forgetPhone(phone: string): void {
      db.prepare("DELETE FROM otp_challenges WHERE phone_e164 = ?").run(phone);
    },
  };
}
export type OtpChallenges = ReturnType<typeof otpChallenges>;
