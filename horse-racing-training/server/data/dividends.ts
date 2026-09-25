// Guard for a parent-scraper bug: src/scrapers/historical.ts parseDividends() strips thousands
// separators for Tierce/Trio/First 4 but not for Win/Place/Quinella/Quinella Place, so
// "1,090.50" is stored as 1. We already fetch each race's English results page (for Double/Triple
// Trio), so re-read those four pools from its dividend table and correct the scraped numbers.

export interface DividendRow {
  pool: string; // "WIN", "PLACE", "QUINELLA", "QUINELLA PLACE", …
  combo: string;
  amount: number | null; // null for REFUND / "-" etc.
}

const ROW_RE = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
const LABEL_RE = /<td[^>]*class="[^"]*fontXi[^"]*"[^>]*>\s*([^<]+?)\s*<\/td>/i;
const PAIR_RE = /<td[^>]*class="f_fs14"[^>]*>\s*([^<]*?)\s*<\/td>\s*<td[^>]*class="f_fs14 f_tar"[^>]*>\s*([^<]*?)\s*<\/td>/i;

/** Pool/combination/amount rows of an HKJC English LocalResults page's dividend table. */
export function parseDividendRows(html: string): DividendRow[] {
  const rows: DividendRow[] = [];
  let pool = "";
  for (const m of html.matchAll(ROW_RE)) {
    const cells = m[1]!;
    const label = LABEL_RE.exec(cells);
    if (label) pool = label[1]!.replace(/\s+/g, " ").toUpperCase();
    const pair = PAIR_RE.exec(cells);
    if (!pool || !pair) continue;
    const n = Number(pair[2]!.replace(/,/g, ""));
    rows.push({ pool, combo: pair[1]!, amount: pair[2] && Number.isFinite(n) ? n : null });
  }
  return rows;
}

type RaceDivs = { winDividend?: number; placeDividends?: number[]; quinellaDividend?: number; quinellaPlaceDividends?: number[] };

/** Overwrite Win/Place/Quinella/QPL with the page's amounts where they differ. Returns the number of values fixed. */
export function fixDividends(race: RaceDivs, rows: DividendRow[]): number {
  const amounts = (pool: string) => rows.filter((r) => r.pool === pool).map((r) => r.amount);
  let fixed = 0;
  const one = (key: "winDividend" | "quinellaDividend", pool: string) => {
    const [v] = amounts(pool);
    if (v != null && race[key] !== undefined && race[key] !== v) {
      race[key] = v;
      fixed++;
    }
  };
  const many = (key: "placeDividends" | "quinellaPlaceDividends", pool: string) => {
    const vs = amounts(pool);
    const cur = race[key];
    if (!cur || vs.length !== cur.length || vs.some((v) => v == null)) return;
    vs.forEach((v, i) => {
      if (cur[i] !== v) {
        cur[i] = v!;
        fixed++;
      }
    });
  };
  one("winDividend", "WIN");
  many("placeDividends", "PLACE");
  one("quinellaDividend", "QUINELLA");
  many("quinellaPlaceDividends", "QUINELLA PLACE");
  return fixed;
}
