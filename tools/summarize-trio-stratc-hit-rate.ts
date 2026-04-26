#!/usr/bin/env tsx
/**
 * Aggregate Strategy B (stratC) Trio hit rate from trio_review_stratC_*.md files,
 * joined to historical results JSON for venue / class / surface / distance.
 */
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const REVIEW_FILES = [
  "trio_review_stratC_20260318_HV.md",
  "trio_review_stratC_20260322_ST.md",
  "trio_review_stratC_20260325_HV.md",
  "trio_review_stratC_20260329_ST.md",
  "trio_review_stratC_20260401_ST.md",
  "trio_review_stratC_20260406_ST.md",
  "trio_review_stratC_20260408_HV.md",
  "trio_review_stratC_20260412_ST.md",
  "trio_review_stratC_20260415_HV.md",
  "trio_review_stratC_20260419_ST.md",
  "trio_review_stratC_20260422_HV.md",
  "trio_review_stratC_20260426_ST.md",
] as const;

function reviewToResultsJson(reviewFile: string): string {
  const m = reviewFile.match(/stratC_(\d{8})_(HV|ST)\.md$/);
  if (!m) throw new Error(`Bad review filename: ${reviewFile}`);
  return `results_${m[1]}_${m[2]}.json`;
}

function outputDateStamp(): string {
  const argv = process.argv.slice(2);
  const arg = argv.find((a) => a.startsWith("--date="));
  if (arg) {
    const raw = arg.slice("--date=".length).replaceAll("-", "");
    if (/^\d{8}$/.test(raw)) return raw;
  }
  const env = process.env.MC_TOP1_SEGMENT_DATE?.replaceAll("-", "");
  if (env && /^\d{8}$/.test(env)) return env;
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
}

interface RaceLeg {
  raceNumber: number;
  hit: boolean;
  venue: string;
  raceClass: string;
  surface: string;
  distance: number;
  reviewFile: string;
}

function parseRaceByRaceHits(md: string): { race: number; hit: boolean }[] {
  const sectionIdx = md.indexOf("## Race-by-Race");
  if (sectionIdx === -1) return [];
  const rest = md.slice(sectionIdx);
  const lines = rest.split("\n");

  let hitCol = -1;
  let headerLine = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    if (!line.includes("| Race |") || !line.includes("Hit?")) continue;
    const cells = line.split("|").map((s) => s.trim());
    const idx = cells.findIndex((c) => c === "Hit?" || c.startsWith("Hit?"));
    if (idx >= 0) {
      hitCol = idx;
      headerLine = i;
      break;
    }
  }
  if (hitCol < 0) return [];

  const out: { race: number; hit: boolean }[] = [];
  for (let i = headerLine + 2; i < lines.length; i++) {
    const line = lines[i]!;
    if (line.includes("**TOTAL**")) break;
    const rm = line.match(/^\|\s*R(\d+)\s*\|/);
    if (!rm) continue;
    const parts = line.split("|").map((s) => s.trim());
    if (parts.length <= hitCol) continue;
    const hitCell = parts[hitCol] ?? "";
    const hit = hitCell.startsWith("✅");
    out.push({ race: parseInt(rm[1]!, 10), hit });
  }
  return out;
}

type JsonRace = {
  raceNumber: number;
  venue: string;
  class: string;
  surface: string;
  distance: number;
};

function loadMeeting(path: string): JsonRace[] {
  const data = JSON.parse(readFileSync(join(ROOT, "data/historical", path), "utf-8")) as JsonRace[];
  return data.map((r) => ({
    raceNumber: r.raceNumber,
    venue: r.venue,
    class: r.class,
    surface: r.surface ?? "Unknown",
    distance: r.distance,
  }));
}

function main() {
  const legs: RaceLeg[] = [];

  for (const reviewFile of REVIEW_FILES) {
    const mdPath = join(ROOT, "data/reviews", reviewFile);
    const md = readFileSync(mdPath, "utf-8");
    const hits = parseRaceByRaceHits(md);
    const resultsName = reviewToResultsJson(reviewFile);
    const races = loadMeeting(resultsName);

    const byNum = new Map(races.map((r) => [r.raceNumber, r]));
    for (const h of hits) {
      const r = byNum.get(h.race);
      if (!r) {
        console.error(`Missing race R${h.race} in ${resultsName} (${reviewFile})`);
        process.exit(1);
      }
      legs.push({
        raceNumber: h.race,
        hit: h.hit,
        venue: r.venue,
        raceClass: r.class,
        surface: r.surface,
        distance: r.distance,
        reviewFile,
      });
    }
  }

  type Bucket = { hits: number; n: number };
  const add = (map: Map<string, Bucket>, key: string, hit: boolean) => {
    const b = map.get(key) ?? { hits: 0, n: 0 };
    b.n++;
    if (hit) b.hits++;
    map.set(key, b);
  };

  const byClass = new Map<string, Bucket>();
  const byVenue = new Map<string, Bucket>();
  const bySurface = new Map<string, Bucket>();
  const byDistance = new Map<string, Bucket>();
  const byVenueClass = new Map<string, Bucket>();
  const byDistVenueClass = new Map<string, Bucket>();

  for (const row of legs) {
    add(byClass, row.raceClass, row.hit);
    add(byVenue, row.venue, row.hit);
    add(bySurface, row.surface, row.hit);
    add(byDistance, String(row.distance), row.hit);
    add(byVenueClass, `${row.venue} / ${row.raceClass}`, row.hit);
    add(byDistVenueClass, `${row.distance}m / ${row.venue} / ${row.raceClass}`, row.hit);
  }

  const pct = (b: Bucket) => (b.n === 0 ? 0 : (100 * b.hits) / b.n);
  const sortKeys = (m: Map<string, Bucket>, natural?: (a: string, b: string) => number) =>
    [...m.keys()].sort(natural ?? ((a, b) => a.localeCompare(b)));

  const totalHits = legs.filter((l) => l.hit).length;
  const totalN = legs.length;
  console.log("Strategy B (stratC) Trio — legs:", totalHits, "/", totalN, ((100 * totalHits) / totalN).toFixed(1) + "%");

  const mdTable = (
    out: string[],
    title: string,
    keys: string[],
    get: (k: string) => Bucket
  ) => {
    out.push(`## ${title}`);
    out.push("");
    out.push("| Segment | Hits | Races | Hit rate |");
    out.push("|---------|------|-------|----------|");
    for (const k of keys) {
      const b = get(k);
      out.push(`| ${k} | ${b.hits} | ${b.n} | ${pct(b).toFixed(1)}% |`);
    }
    out.push("");
  };

  const dateStamp = outputDateStamp();
  const dateLabel = `${dateStamp.slice(0, 4)}-${dateStamp.slice(4, 6)}-${dateStamp.slice(6, 8)}`;

  const out: string[] = [];
  out.push("# Strategy B (stratC) Trio — hit rate by segment");
  out.push("");
  out.push(`*Generated: ${dateLabel}*`);
  out.push("");
  out.push("**Definition:** Hit = Trio (單T) **Hit?** = ✅ in each file’s *Race-by-Race Results* table (Strategy B pool: MC #1 banker + legs per that review).");
  out.push("");
  out.push("**Venue / class / surface / distance:** from `data/historical/results_*.json` for the matching meeting.");
  out.push("");
  out.push(
    `**Sample:** ${totalN} races across ${REVIEW_FILES.length} meetings (${totalHits} hits, **${((100 * totalHits) / totalN).toFixed(1)}%** overall). Segments with few races are indicative only.`
  );
  out.push("");

  mdTable(out, "By venue", sortKeys(byVenue), (k) => byVenue.get(k)!);
  mdTable(out, "By surface", sortKeys(bySurface), (k) => bySurface.get(k)!);
  mdTable(
    out,
    "By class",
    sortKeys(byClass, (a, b) => a.localeCompare(b, undefined, { numeric: true })),
    (k) => byClass.get(k)!
  );
  mdTable(
    out,
    "By distance (metres)",
    sortKeys(byDistance, (a, b) => Number(a) - Number(b)),
    (k) => byDistance.get(k)!
  );
  mdTable(out, "By venue × class", sortKeys(byVenueClass), (k) => byVenueClass.get(k)!);
  mdTable(out, "By distance × venue × class", sortKeys(byDistVenueClass, (a, b) => {
    const da = parseInt(a), db = parseInt(b);
    return da !== db ? da - db : a.localeCompare(b);
  }), (k) => byDistVenueClass.get(k)!);

  out.push("---");
  out.push("");
  out.push("*Review files:*");
  for (const f of REVIEW_FILES) {
    out.push(`- \`data/reviews/${f}\``);
  }

  const staticDir = join(ROOT, "data/static");
  mkdirSync(staticDir, { recursive: true });
  const outPath = join(staticDir, `trio_stratC_hit_rate_by_segment_${dateStamp}.md`);
  writeFileSync(outPath, out.join("\n"), "utf-8");
  console.log("Wrote", outPath);
}

main();
