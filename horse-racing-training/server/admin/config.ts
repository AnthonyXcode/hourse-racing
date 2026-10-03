// Admin panel configuration (docs/admin/PRD.md §9, with the lead's overrides): the owner comes only from
// OWNER_PHONE; admin sessions are 1 h idle / 12 h absolute; step-up OTPs last 5 min.
import { normalizeHkMobile } from "../../shared/validation";

export interface AdminConfig {
  production: boolean;
  /** Normalised E.164 owner phone, or null (dev without OWNER_PHONE: nobody is owner). */
  ownerPhone: string | null;
  /** Raw OWNER_PHONE when set but invalid (guard message). */
  ownerPhoneInvalid: boolean;
  idleMs: number;
  maxMs: number;
  stepUpMs: number;
  /** |amount| at or above which a credit adjust needs step-up. */
  stepUpCredits: number;
  /** Largest single adjustment. */
  maxAdjust: number;
  exportMaxRows: number;
  /** Access-log retention; never below 365 days (the DB trigger also refuses younger deletes). */
  accessLogDays: number;
  rate: { readPerMin: number; writePer10Min: number; exportPerHour: number; reconcilePerMin: number; fullPhonePerHour: number };
}

const num = (v: string | undefined, d: number) => (v && /^\d+(\.\d+)?$/.test(v) ? Number(v) : d);
const HOUR = 3_600_000;

export function loadAdminConfig(env: NodeJS.ProcessEnv = process.env): AdminConfig {
  const raw = env.OWNER_PHONE?.trim() ?? "";
  const owner = raw ? normalizeHkMobile(raw) : null;
  return {
    production: env.NODE_ENV === "production",
    ownerPhone: owner,
    ownerPhoneInvalid: !!raw && !owner,
    idleMs: num(env.ADMIN_IDLE_HOURS, 1) * HOUR,
    maxMs: num(env.ADMIN_MAX_HOURS, 12) * HOUR,
    stepUpMs: num(env.ADMIN_STEPUP_MINUTES, 5) * 60_000,
    stepUpCredits: num(env.ADMIN_STEPUP_CREDITS, 1000),
    maxAdjust: 100_000,
    exportMaxRows: num(env.ADMIN_EXPORT_MAX_ROWS, 50_000),
    accessLogDays: Math.max(365, num(env.ADMIN_ACCESS_LOG_DAYS, 365)),
    rate: {
      readPerMin: num(env.ADMIN_RATE_READ_MIN, 120),
      writePer10Min: num(env.ADMIN_RATE_WRITE_10MIN, 30),
      exportPerHour: num(env.ADMIN_RATE_EXPORT_HOUR, 10),
      reconcilePerMin: 1,
      fullPhonePerHour: 30,
    },
  };
}

/** Production refuses to start without a valid owner (PRD §2.2). */
export function adminProductionProblems(c: AdminConfig): string[] {
  if (!c.production) return [];
  if (!c.ownerPhone) return [c.ownerPhoneInvalid ? "OWNER_PHONE is not a valid Hong Kong mobile number" : "OWNER_PHONE must be set in production"];
  return [];
}

/** Dev warnings (never fatal). */
export function adminWarnings(c: AdminConfig): string[] {
  if (c.production) return [];
  if (c.ownerPhoneInvalid) return ["OWNER_PHONE is not a valid HK mobile number: nobody is owner"];
  if (!c.ownerPhone) return ["OWNER_PHONE is not set: nobody is owner (the admin panel has no owner actions)"];
  return [];
}
