// Membership validation shared by the server (authoritative) and the client (instant feedback).
// Rules: docs/membership/PRD.md §4, limits from docs/membership/DESIGN-SPEC.md §3.

/** Display-name length in Unicode code points (one CJK character or emoji = 1). */
export const NAME_MAX = 20;
export const DESCRIPTION_MAX = 160;
export const DESCRIPTION_MAX_NEWLINES = 5;
/** Avatar upload cap, before the server re-encodes it to a 256×256 WebP. */
export const AVATAR_MAX_BYTES = 5 * 1024 * 1024;
export const AVATAR_MAX_PX = 4096;
export const OTP_LENGTH = 6;
export const RESEND_SECONDS = 60;
export const OTP_TTL_SECONDS = 600;
export const OTP_MAX_ATTEMPTS = 5;

/** Code-point length (so "😀" and "陳" each count as 1). */
export const charLength = (s: string) => [...s].length;

/**
 * HK login mobile → E.164 "+852XXXXXXXX", or null when it isn't a valid HK mobile.
 * Strips spaces, dashes, dots and parentheses; drops a leading +852 / 852 / 00852 only when 8 digits remain.
 */
export function normalizeHkMobile(input: unknown): string | null {
  if (typeof input !== "string") return null;
  let s = input.trim().replace(/[\s\-.()]/g, "");
  for (const prefix of ["+852", "00852", "852"]) {
    if (s.startsWith(prefix) && /^\d{8}$/.test(s.slice(prefix.length))) {
      s = s.slice(prefix.length);
      break;
    }
  }
  return /^[456789]\d{7}$/.test(s) ? `+852${s}` : null;
}

/** "+85291234567" → "+852****4567" (logs). */
export const maskPhoneLog = (e164: string) => (e164.length > 4 ? `${e164.slice(0, 4)}****${e164.slice(-4)}` : "****");
/** "+85291234567" → "+852 9123 ••67" (UI, design spec §2). */
export const maskPhoneUi = (e164: string) => {
  const d = e164.replace(/^\+852/, "");
  return d.length === 8 ? `+852 ${d.slice(0, 4)} ••${d.slice(6)}` : e164;
};
/** "+85291234567" → "+852 9123 4567" (the member's own profile page). */
export const formatHkPhone = (e164: string) => {
  const d = e164.replace(/^\+852/, "");
  return d.length === 8 ? `+852 ${d.slice(0, 4)} ${d.slice(4)}` : e164;
};

// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u001f\u007f-\u009f]/;
/**
 * Unicode format characters (Cf: zero-width space, BOM, soft hyphen, bidi overrides/isolates…), except
 * ZWNJ/ZWJ (U+200C/U+200D), which some scripts and emoji sequences need. They're invisible, so we drop them.
 */
const FORMAT = /(?![\u200c\u200d])\p{Cf}/gu;
/** At least one character a person can see: a letter, number, punctuation or symbol (emoji included). */
const VISIBLE = /[\p{L}\p{N}\p{P}\p{S}]/u;

/** Drop invisible format characters (see FORMAT). Exported so the client counts what will be stored. */
export const stripFormat = (s: string) => s.replace(FORMAT, "");

export type ProfileErrorCode = "invalid_name" | "invalid_description" | "invalid_telegram" | "invalid_whatsapp" | "invalid_email";
export type ProfileField = "displayName" | "description" | "telegram" | "whatsapp" | "email";
type Result<T> = { ok: true; value: T } | { ok: false; code: ProfileErrorCode };

const empty = (v: unknown) => v === null || v === undefined || (typeof v === "string" && v.trim() === "");

export function validateDisplayName(v: unknown): Result<string> {
  if (typeof v !== "string") return { ok: false, code: "invalid_name" };
  const s = stripFormat(v).trim().replace(/\s+/g, " ");
  const n = charLength(s);
  if (n < 1 || n > NAME_MAX || CONTROL.test(s) || !VISIBLE.test(s)) return { ok: false, code: "invalid_name" };
  return { ok: true, value: s };
}

export function validateDescription(v: unknown): Result<string | null> {
  if (typeof v === "string") v = stripFormat(v);
  if (empty(v) || (typeof v === "string" && !VISIBLE.test(v))) return { ok: true, value: null }; // nothing visible = cleared
  if (typeof v !== "string") return { ok: false, code: "invalid_description" };
  const s = v.replace(/\r\n?/g, "\n").trim();
  const newlines = (s.match(/\n/g) ?? []).length;
  if (charLength(s) > DESCRIPTION_MAX || newlines > DESCRIPTION_MAX_NEWLINES || CONTROL.test(s.replace(/\n/g, "")))
    return { ok: false, code: "invalid_description" };
  return { ok: true, value: s };
}

export function validateTelegram(v: unknown): Result<string | null> {
  if (empty(v)) return { ok: true, value: null };
  if (typeof v !== "string") return { ok: false, code: "invalid_telegram" };
  const s = stripFormat(v).trim().replace(/^@/, "");
  return /^[A-Za-z0-9_]{5,32}$/.test(s) ? { ok: true, value: s } : { ok: false, code: "invalid_telegram" };
}

export function validateWhatsapp(v: unknown): Result<string | null> {
  if (empty(v)) return { ok: true, value: null };
  if (typeof v !== "string") return { ok: false, code: "invalid_whatsapp" };
  const s = v.trim().replace(/[\s\-()]/g, "");
  return /^\+[1-9]\d{7,14}$/.test(s) ? { ok: true, value: s } : { ok: false, code: "invalid_whatsapp" };
}

export function validateEmail(v: unknown): Result<string | null> {
  if (empty(v)) return { ok: true, value: null };
  if (typeof v !== "string") return { ok: false, code: "invalid_email" };
  const s = v.trim().toLowerCase();
  return s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) ? { ok: true, value: s } : { ok: false, code: "invalid_email" };
}

export interface ProfilePatch {
  displayName?: string;
  description?: string | null;
  telegram?: string | null;
  whatsapp?: string | null;
  whatsappSameAsLogin?: boolean;
  email?: string | null;
}
export type NormalizedPatch = Partial<Record<ProfileField, string | null>>;

/**
 * Validate a PATCH /api/me body. Only known fields are read; `whatsappSameAsLogin: true` copies the login number.
 * Returns the first failing field, in form order.
 */
export function validateProfilePatch(
  body: unknown,
  loginPhone: string
): { ok: true; patch: NormalizedPatch } | { ok: false; field: ProfileField; code: ProfileErrorCode } {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const patch: NormalizedPatch = {};
  const steps: [ProfileField, (v: unknown) => Result<string | null>][] = [
    ["displayName", validateDisplayName],
    ["description", validateDescription],
    ["telegram", validateTelegram],
    ["whatsapp", validateWhatsapp],
    ["email", validateEmail],
  ];
  for (const [field, check] of steps) {
    if (field === "whatsapp" && b.whatsappSameAsLogin === true) {
      patch.whatsapp = loginPhone;
      continue;
    }
    if (!(field in b)) continue;
    const r = check(b[field]);
    if (!r.ok) return { ok: false, field, code: r.code };
    patch[field] = r.value;
  }
  return { ok: true, patch };
}
