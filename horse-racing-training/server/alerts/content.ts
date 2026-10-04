// 5★ pick alerts: which races qualify and the SMS texts. Same rule as the Home "5 stars" card and the Bet
// page's confidence stars: the model's top pick meets every rule of its venue's strategy (strategyChecks all
// ok = confidence 5/5), computed on the PRE-RACE analysis (no results, so it can't leak the outcome).
import { strategyChecks, type PreRaceAnalysis } from "../../shared/analyzer/model";

export type AlertLang = "en" | "zh-HK";
export interface FiveStarPick {
  raceNo: number;
  num: number;
  name: string;
}
export interface FiveStarResult extends FiveStarPick {
  /** Finishing place, null = didn't finish / scratched / no result. */
  fin: number | null;
  placed: boolean;
}

/** The 5★ races of a meeting, in race order. */
export function fiveStarPicks(analyses: PreRaceAnalysis[]): FiveStarPick[] {
  return analyses
    .filter((a) => {
      const checks = strategyChecks(a);
      return checks.length > 0 && checks.every((c) => c.ok) && !!a.horses[0];
    })
    .map((a) => ({ raceNo: Number(a.raceId.split("-").at(-1)), num: a.horses[0]!.horseNo, name: a.horses[0]!.name }))
    .sort((a, b) => a.raceNo - b.raceNo);
}

// ---- SMS length ----
// GSM-7 basic set (+ the extension table, which costs 2). Anything else makes the whole SMS UCS-2.
const GSM = "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";
const GSM_EXT = "^{}\\[~]|€";
/** Number of SMS segments (concatenated: 153 GSM-7 / 67 UCS-2 characters each). */
export function smsSegments(text: string): number {
  let gsm = 0;
  for (const ch of text) {
    if (GSM.includes(ch)) gsm += 1;
    else if (GSM_EXT.includes(ch)) gsm += 2;
    else {
      const units = text.length; // UCS-2 code units
      return units <= 70 ? 1 : Math.ceil(units / 67);
    }
  }
  return gsm <= 160 ? 1 : Math.ceil(gsm / 153);
}
export const MAX_SEGMENTS = 2;

// ---- texts ----
const VENUE: Record<AlertLang, Record<string, string>> = { en: { ST: "Sha Tin", HV: "Happy Valley" }, "zh-HK": { ST: "沙田", HV: "跑馬地" } };
const dayLabel = (iso: string, lang: AlertLang) => {
  const d = new Date(`${iso}T12:00:00+08:00`);
  return lang === "en"
    ? new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Hong_Kong", weekday: "short", day: "numeric", month: "short" }).format(d)
    : `${Number(iso.slice(5, 7))}月${Number(iso.slice(8, 10))}日`;
};
const hhmm = (ms: number) => new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Hong_Kong", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(ms));
const ordinal = (n: number) => `${n}${n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] ?? "th"}`;
/** Names in English SMS stay GSM-7 (horse names are upper-case Latin; anything else is dropped). */
const gsmName = (s: string) => [...s].filter((c) => GSM.includes(c) && c !== "\n" && c !== "\r").join("").trim();

const T = {
  en: {
    brand: "Post Time: ",
    stop: " Turn off in the app (Settings)",
    sep: ", ",
    more: (n: number, url: string) => ` +${n} more ${url}`,
    pre: (venue: string, day: string, first: string) => `5-star picks, ${venue} ${day} (1st race ${first}): `,
    preEnd: ". Model suggestions only, not advice.",
    none: (venue: string, day: string) => `No 5-star races at ${venue} today (${day}).`,
    post: (venue: string, day: string) => `5-star results, ${venue} ${day}: `,
    postEnd: (x: number, y: number) => `. Placed ${x} of ${y}.`,
    pick: (p: FiveStarPick, names: boolean) => `R${p.raceNo} #${p.num}${names && gsmName(p.name) ? ` ${gsmName(p.name)}` : ""}`,
    result: (r: FiveStarResult, names: boolean) => `R${r.raceNo} #${r.num}${names && gsmName(r.name) ? ` ${gsmName(r.name)}` : ""} ${r.fin ? ordinal(r.fin) : "-"}${r.placed ? " placed" : ""}`,
  },
  "zh-HK": {
    brand: "開跑前 Post Time:",
    stop: "可於App設定內關閉",
    sep: "、",
    more: (n: number, url: string) => ` 另${n}場:${url} `.trimEnd(),
    pre: (venue: string, day: string, first: string) => `${day}${venue}5星首選(首場${first}):`,
    preEnd: "。只供參考，非投注建議。",
    none: (venue: string, day: string) => `今日(${day})${venue}沒有5星賽事。`,
    post: (venue: string, day: string) => `${day}${venue}5星結果:`,
    postEnd: (x: number, y: number) => `。上名${x}/${y}。`,
    pick: (p: FiveStarPick, names: boolean) => `R${p.raceNo} #${p.num}${names && p.name ? ` ${p.name}` : ""}`,
    result: (r: FiveStarResult, names: boolean) => `R${r.raceNo} #${r.num}${names && r.name ? ` ${r.name}` : ""} ${r.fin ? `第${r.fin}` : "-"}${r.placed ? "✓" : ""}`,
  },
} as const;

/**
 * Fit a list into ≤ MAX_SEGMENTS: all items with horse names, else all without names, else as many as fit
 * followed by "+N more <link>".
 */
function fit(lang: AlertLang, head: string, items: (names: boolean) => string[], end: string, url: string): string {
  const t = T[lang];
  const build = (list: string[], rest: number) => `${t.brand}${head}${list.join(t.sep)}${rest ? t.more(rest, url) : ""}${end}${t.stop}`;
  for (const names of [true, false]) {
    const all = items(names);
    const text = build(all, 0);
    if (smsSegments(text) <= MAX_SEGMENTS) return text;
  }
  const short = items(false);
  for (let k = short.length - 1; k >= 0; k--) {
    const text = build(short.slice(0, k), short.length - k);
    if (smsSegments(text) <= MAX_SEGMENTS) return text;
  }
  return build([], short.length);
}

export interface MeetingRef {
  /** YYYY-MM-DD */
  date: string;
  venue: string;
  /** First race post time, epoch ms. */
  firstPost: number;
}

/** The suggestions SMS (or the "no 5★ races" one). */
export function preText(lang: AlertLang, m: MeetingRef, picks: FiveStarPick[], origin: string): string {
  const t = T[lang];
  const venue = VENUE[lang][m.venue] ?? m.venue;
  const day = dayLabel(m.date, lang);
  if (!picks.length) return `${t.brand}${t.none(venue, day)}${t.stop}`;
  return fit(lang, t.pre(venue, day, hhmm(m.firstPost)), (names) => picks.map((p) => t.pick(p, names)), t.preEnd, `${origin}/`);
}

/** The results SMS for the races the suggestions SMS listed. */
export function postText(lang: AlertLang, m: MeetingRef, results: FiveStarResult[], origin: string): string {
  const t = T[lang];
  const venue = VENUE[lang][m.venue] ?? m.venue;
  const placed = results.filter((r) => r.placed).length;
  return fit(lang, t.post(venue, dayLabel(m.date, lang)), (names) => results.map((r) => t.result(r, names)), t.postEnd(placed, results.length), `${origin}/`);
}
