// Every runner in a race with its HKJC place code, from the English LocalResults page's results table.
// The parent scraper keeps only numeric placings in `finishOrder`, so non-finishers (PU, FE, UR, DNF, DISQ…)
// and withdrawn horses (WV, WV-A, WX, WX-A, WXNR…) vanish. LIVE settlement must tell them apart: a non-finisher
// is a runner (its bets lose), a withdrawn horse is refunded. Stored as RaceResult.runners (a new, optional
// field; finishOrder keeps its meaning).
import type { RunnerStatus } from "../../shared/types";

const ROW_RE = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
const CELL_RE = /<td[^>]*>([\s\S]*?)<\/td>/gi;
const text = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Withdrawn before the start: refunded. */
const WITHDRAWN = /^(WV|WX)(-A|NR)?$|^WXNR$/;
/** Started but didn't finish / was disqualified: a runner, bets lose. (TNP and anything else: "unknown".) */
const NON_FINISHER = new Set(["PU", "FE", "UR", "DNF", "DISQ"]);

/** Classify an HKJC "Pla." cell. Unknown codes stay "unknown" (settlement holds rather than guesses). */
export function classifyPlace(place: string): RunnerStatus["status"] {
  const p = place.toUpperCase().replace(/\s+/g, " ").trim();
  if (/^\d{1,2}( DH)?$/.test(p)) return "finished";
  if (WITHDRAWN.test(p)) return "withdrawn";
  if (NON_FINISHER.has(p)) return "nonFinisher";
  return "unknown";
}

/**
 * Runner rows of the results table: ≥ 10 cells, a place code first and a horse number second.
 * Returns [] when the table isn't there (caller then stores no `runners` field).
 */
export function parseRunnerRows(html: string): RunnerStatus[] {
  const out: RunnerStatus[] = [];
  const seen = new Set<number>();
  for (const m of html.matchAll(ROW_RE)) {
    const cells = [...m[1]!.matchAll(CELL_RE)].map((c) => text(c[1]!));
    if (cells.length < 10) continue;
    const [place, no] = cells;
    if (!place || !/^\d{1,2}$/.test(no ?? "")) continue;
    if (!/^(\d{1,2}( DH)?|[A-Z][A-Z-]{0,5})$/i.test(place)) continue;
    const horseNumber = Number(no);
    if (seen.has(horseNumber)) continue;
    seen.add(horseNumber);
    out.push({ horseNumber, place, status: classifyPlace(place) });
  }
  return out;
}
