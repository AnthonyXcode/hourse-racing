// Parsers for HKJC's server-rendered Chinese (zh-HK) racing pages. Pure functions; tested against
// saved pages in __fixtures__/. The racecard and jockey profile pages are rendered client-side,
// so only the results page and the horse/trainer profile pages are usable.

export interface Found {
  code: string;
  nameZh: string;
}
export interface ResultsPage {
  race: Found | null;
  horses: Found[];
  jockeys: Found[];
  trainers: Found[];
  /** Header texts seen on the page, for checking the client glossary (not stored). */
  seen: { classLine?: string; going?: string; track?: string };
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

export function decodeHtml(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}

/** Inner HTML → trimmed text with collapsed whitespace. */
const text = (html: string) => decodeHtml(html.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();

/** `<a href="…{param}=CODE…">NAME</a>` pairs, first occurrence per code. */
function links(html: string, param: string): Found[] {
  const re = new RegExp(`<a\\b[^>]*href="[^"]*[?&]${param}=([A-Za-z0-9_]+)[^"]*"[^>]*>([\\s\\S]*?)</a>`, "gi");
  const out = new Map<string, string>();
  for (const m of html.matchAll(re)) {
    const code = m[1]!.toUpperCase();
    const name = text(m[2]!).replace(/\s*\([A-Z]\d{3}\)$/, ""); // brand no. like " (K580)"
    if (name && !out.has(code)) out.set(code, name);
  }
  return [...out].map(([code, nameZh]) => ({ code, nameZh }));
}

/** First-cell texts of each <tr> in a chunk of table HTML. */
function rows(html: string): string[][] {
  return [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
    [...r[1]!.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((c) => text(c[1]!))
  );
}

/**
 * The Chinese local results page for one race:
 * racing.hkjc.com/zh-hk/local/information/localresults?RaceDate=YYYY/MM/DD&Racecourse=HV&RaceNo=N
 * `raceId` (e.g. 2026-09-23-HV-1) is what the race's name is stored under.
 */
export function parseResultsPage(html: string, raceId: string): ResultsPage {
  // Everything race-specific sits after the race header table; skip nav menus above it.
  const at = html.indexOf('class="race_tab"');
  const body = at >= 0 ? html.slice(at) : html;

  let race: Found | null = null;
  const seen: ResultsPage["seen"] = {};
  if (at >= 0) {
    const header = body.slice(0, body.indexOf("</table>") + 8);
    const rs = rows(header);
    // Row: [第五班 - 1650米 - (40-0), 場地狀況 :, 好地]; the next row starts with the race name.
    const i = rs.findIndex((r) => r[1]?.startsWith("場地狀況"));
    if (i >= 0) {
      seen.classLine = rs[i]![0];
      seen.going = rs[i]![2];
      const next = rs[i + 1];
      if (next?.[0]) race = { code: raceId, nameZh: next[0] };
      if (next?.[1]?.startsWith("賽道")) seen.track = next[2];
    }
  }

  return {
    race,
    horses: links(body, "horseid"),
    jockeys: links(body, "jockeyid"),
    trainers: links(body, "trainerid"),
    seen,
  };
}

const PROFILE_SECTION = { horse: "馬匹資料", trainer: "練馬師資料" } as const;

/**
 * Name from a Chinese horse or trainer profile page title: "紅磚戰士 - 馬匹資料 - 賽馬資訊 - 香港賽馬會".
 * Returns null for generic titles (unknown id, client-rendered page).
 */
export function parseProfileTitle(html: string, kind: keyof typeof PROFILE_SECTION): string | null {
  const t = /<title>([\s\S]*?)<\/title>/i.exec(html);
  if (!t) return null;
  const parts = text(t[1]!).split(" - ").map((p) => p.trim());
  if (parts.length < 2 || parts[1] !== PROFILE_SECTION[kind]) return null;
  const name = parts[0]!;
  return name && !/Hong Kong Jockey Club|香港賽馬會/.test(name) ? name : null;
}
