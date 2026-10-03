// Wires the membership pieces together from config. One lazily-built instance for the server;
// tests call createMembers() with an in-memory DB and stub providers.
import { loadConfig, type MembersConfig } from "./config";
import { openMembersDb, purgeStale, type MembersDB } from "./db";
import { avatarFiles } from "./avatar";
import { historyStore } from "./history";
import { mockOtp, otpChallenges, twilioOtp, type OtpProvider } from "./otp";
import { rateLimiter } from "./rateLimit";
import { sessionStore } from "./sessions";
import { verifyTurnstile } from "./turnstile";
import { userStore } from "./users";
import type { MembersDeps } from "./routes";

export function createMembers(
  cfg: MembersConfig,
  opts: { db?: MembersDB; provider?: OtpProvider; fetch?: typeof fetch; log?: (line: string) => void } = {}
): MembersDeps {
  const db = opts.db ?? openMembersDb(cfg.dbFile);
  const provider = opts.provider ?? (cfg.otpProvider === "twilio" ? twilioOtp(cfg.twilio, opts.fetch) : mockOtp({ log: opts.log }));
  return {
    cfg,
    db,
    users: userStore(db),
    sessions: sessionStore(db, cfg.sessionTtlDays),
    history: historyStore(db),
    limiter: rateLimiter(db),
    otp: otpChallenges(db, provider),
    avatars: avatarFiles(cfg.avatarDir),
    verifyTurnstile: (token, ip) => verifyTurnstile(cfg.turnstile.secretKey, token, ip, opts.fetch),
    log: opts.log,
  };
}

let inst: MembersDeps | null = null;

export function members(): MembersDeps {
  if (!inst) {
    inst = createMembers(loadConfig());
    purgeStale(inst.db);
    const db = inst.db;
    setInterval(() => purgeStale(db), 24 * 60 * 60_000).unref();
  }
  return inst;
}
