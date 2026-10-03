// PII scrubber for everything an admin (or the owner, by default) receives from the admin API: JSON bodies
// (one choke point in the admin router), CSV exports and error bodies (docs/admin/QA-REPORT.md AD-01, AD-09,
// AD-10). Rows written before the panel existed can't be rewritten (append-only), so they're masked on the
// way out; new audit rows, ledger notes and flag reasons are also scrubbed on the way in.
//
// What it catches (after NFKC normalisation, so full-width digits and spaces count):
//   • phones: digit groups joined by spaces, dots, dashes or brackets (any mix, ≤ 3 separator chars between
//     digits) whose digits form an HK mobile (8 digits starting 4–9, optionally 852 in front) or, with a
//     leading + or 00, an E.164 number (8–15 digits). Letters and _ next to the digits are boundaries, so
//     phone_91234567 and 91234567x are caught;
//   • emails; IPv4 (last octet); IPv6 including compressed forms (::1, 2001:db8::1);
//   • any object field named phone / email / whatsapp / telegram / tel / mobile, whatever its value looks like.
// Known limitation: a number split across separate fields ({"cc":"852","rest":"9123","tail":"4567"}) or
// spelled out in words is not recognised: each fragment alone is not phone-shaped.
// Identifiers are protected so they're never mangled: UUIDs, long hex tokens (avatar files) and Stripe ids.
import { isIPv6 } from "node:net";
import { maskEmail, maskPhone, maskTelegram } from "./core";

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const IPV4 = /(?<![\d.])(\d{1,3}\.\d{1,3}\.\d{1,3})\.\d{1,3}(?![\d])/g;
const IPV6_CANDIDATE = /(?<![0-9A-Za-z:])[0-9A-Fa-f:]{2,39}(?![0-9A-Za-z:])/g;
/** Digit groups with up to 3 separator characters (space, dot, dash, brackets) between digits; optional + / 00. */
const PHONE_CANDIDATE = /(\+|00)?\d(?:[\s.\-()]{0,3}\d)*/g;
/** Never touched: UUIDs, hex tokens of 16+ chars containing a letter, Stripe-style ids. */
const PROTECTED = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|(?<![0-9a-z])(?=[0-9a-f]*[a-f])[0-9a-f]{16,}(?![0-9a-z])|\b(?:cs|pi|ch|cus|evt|pm|re|in|price|prod|acct|txn|whsec|sk|pk|rk)_(?:test_|live_)?[A-Za-z0-9]{10,}/gi;
/** Field names whose values are contact data, masked whatever they look like. */
const PII_KEY = /^(phone|phone_e164|email|whatsapp|telegram|user_phone|tel|mobile)$/i;

const MASK = "••••";
const isPhoneDigits = (d: string, intl: boolean) =>
  intl ? d.length >= 8 && d.length <= 15 && /^[1-9]/.test(d) : (d.length === 8 && /^[4-9]/.test(d)) || (d.length === 11 && /^852[4-9]/.test(d));

/** Mask phone-shaped digit runs inside one candidate (which may also hold other numbers, e.g. "9123 4567 1000"). */
function maskPhonesIn(m: string, prefix: string | undefined): string {
  const body = m.slice(prefix?.length ?? 0);
  const groups = [...body.matchAll(/\d+/g)].map((g) => ({ start: g.index!, end: g.index! + g[0].length, d: g[0] }));
  let out = "";
  let at = 0; // position in body already copied
  let i = 0;
  while (i < groups.length) {
    let best = -1;
    let digits = "";
    for (let j = i; j < groups.length && digits.length + groups[j]!.d.length <= 15; j++) {
      digits += groups[j]!.d;
      if (isPhoneDigits(digits, !!prefix && i === 0)) best = j;
    }
    if (best < 0) {
      i++;
      continue;
    }
    const all = groups.slice(i, best + 1).map((g) => g.d).join("");
    out += body.slice(at, groups[i]!.start) + `${MASK} ${all.slice(-4)}`;
    at = groups[best]!.end;
    i = best + 1;
  }
  if (!out) return m; // nothing phone-shaped
  // A masked number starting at the first group swallows its + / 00 prefix too.
  const dropPrefix = prefix && groups[0] && out.startsWith(MASK);
  return (dropPrefix ? "" : prefix ?? "") + out + body.slice(at);
}

export function scrubText(input: string): string {
  if (!input) return input;
  let s = input.normalize("NFKC");
  // Protect identifiers behind placeholders (no digits in them) and restore them at the end.
  const kept: string[] = [];
  s = s.replace(PROTECTED, (m) => `\u0000${String.fromCharCode(0xe000 + kept.push(m) - 1)}\u0000`);
  s = s
    .replace(EMAIL, (m) => maskEmail(m) ?? MASK)
    .replace(IPV4, (_m, a: string) => `${a}.x`)
    .replace(IPV6_CANDIDATE, (m) => {
      if ((m.match(/:/g)?.length ?? 0) < 2 || !isIPv6(m)) return m;
      const head = m.split("::")[0]!.split(":").filter(Boolean).slice(0, 2);
      return head.length ? `${head.join(":")}:…` : "::…";
    })
    .replace(PHONE_CANDIDATE, (m, prefix: string | undefined) => maskPhonesIn(m, prefix));
  return s.replace(/\u0000([-])\u0000/g, (_m, c: string) => kept[c.charCodeAt(0) - 0xe000] ?? "");
}

/** Deep-scrub a JSON-like value; keys named like contact fields are masked outright. */
export function scrubValue(v: unknown, key?: string): unknown {
  if (v == null) return v;
  if (key && PII_KEY.test(key) && (typeof v === "string" || typeof v === "number")) {
    const s = String(v).normalize("NFKC");
    if (s.includes("•")) return s; // already masked (e.g. the users list) — keep as is
    if (/telegram/i.test(key)) return maskTelegram(s.replace(/^@/, ""));
    if (/email/i.test(key)) return maskEmail(s);
    const d = s.replace(/\D/g, "");
    if (!d) return s; // no digits: not a number (e.g. whatsapp: "same")
    return d.length >= 4 ? (maskPhone(s.startsWith("+") ? s : `+852${d.slice(-8)}`) ?? MASK) : MASK;
  }
  if (typeof v === "string") return scrubText(v);
  if (Array.isArray(v)) return v.map((x) => scrubValue(x));
  if (typeof v === "object") return Object.fromEntries(Object.entries(v as Record<string, unknown>).map(([k, x]) => [k, scrubValue(x, k)]));
  return v;
}

/** One CSV cell: strings are scrubbed, numbers / booleans / null pass through. */
export const scrubCell = (v: unknown) => (typeof v === "string" ? scrubText(v) : v);
