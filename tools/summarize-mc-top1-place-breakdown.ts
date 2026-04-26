#!/usr/bin/env tsx
/**
 * One-off: join mc_top1_place_allup_summary.md race rows to historical results JSON
 * and print hit-rate breakdowns by class, venue, surface, class×venue, distance.
 */
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MD_PATH = join(ROOT, "data/test_reports/mc_top1_place_allup_summary.md");

/** YYYYMMDD for output filename; override with `--date=2026-04-19` or env `MC_TOP1_SEGMENT_DATE`. */
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
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

const MEETING_FILES: string[] = [
  "results_20260318_HV.json",
  "results_20260322_ST.json",
  "results_20260325_HV.json",
  "results_20260329_ST.json",
  "results_20260401_ST.json",
  "results_20260406_ST.json",
  "results_20260408_HV.json",
  "results_20260412_ST.json",
  "results_20260415_HV.json",
  "results_20260419_ST.json",
  "results_20260422_HV.json",
  "results_20260426_ST.json",
];

interface RaceRow {
  raceNumber: number;
  horseNumber: number;
  hit: boolean;
  venue: "Sha Tin" | "Happy Valley";
  surface: string;
  raceClass: string;
  distance: number;
}

function parseMdRows(): Omit<RaceRow, "venue" | "surface" | "raceClass" | "distance">[] {
  const md = readFileSync(MD_PATH, "utf-8");
  const blocks = md.split(/^## Meeting \d+:/m).slice(1);
  const rows: Omit<RaceRow, "venue" | "surface" | "raceClass" | "distance">[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]!;
    const lines = block.split("\n");
    for (const line of lines) {
      // Format: | R1 | Class 5 | 1650 | #10 DRAGON SUNRISE | ... | ✅ 3rd | ...
      const parts = line.split("|").map((s) => s.trim());
      const raceCol = parts[1] ?? "";
      const raceMatch = raceCol.match(/^R(\d+)$/);
      if (!raceMatch) continue;
      const raceNumber = parseInt(raceMatch[1]!, 10);
      const mcCol = parts[4] ?? "";
      const horseMatch = mcCol.match(/^#(\d+)\s/);
      if (!horseMatch) continue;
      const horseNumber = parseInt(horseMatch[1]!, 10);
      const placedCol = parts[7] ?? "";
      const hit = placedCol.startsWith("✅");
      rows.push({ raceNumber, horseNumber, hit });
    }
  }
  return rows;
}

type ResultRace = {
  raceNumber: number;
  venue: string;
  surface: string;
  class: string;
  distance: number;
};

function loadMeeting(path: string): ResultRace[] {
  const data = JSON.parse(readFileSync(join(ROOT, "data/historical", path), "utf-8")) as Array<{
    raceNumber: number;
    venue: string;
    surface: string;
    class: string;
    distance: number;
  }>;
  return data.map((r) => ({
    raceNumber: r.raceNumber,
    venue: r.venue,
    surface: r.surface ?? "Unknown",
    class: r.class,
    distance: r.distance,
  }));
}

function main() {
  const mdRows = parseMdRows();
  const meetings: ResultRace[][] = MEETING_FILES.map(loadMeeting);

  let expected = 0;
  for (const m of meetings) expected += m.length;
  if (mdRows.length !== expected) {
    console.error(`Row count mismatch: md=${mdRows.length} vs json=${expected}`);
    process.exit(1);
  }

  let offset = 0;
  const full: RaceRow[] = [];
  for (let mi = 0; mi < meetings.length; mi++) {
    const m = meetings[mi]!;
    for (let j = 0; j < m.length; j++) {
      const r = m[j]!;
      const row = mdRows[offset++]!;
      if (row.raceNumber !== r.raceNumber) {
        console.error(`Race number mismatch meeting ${mi + 1}: md R${row.raceNumber} vs json R${r.raceNumber}`);
        process.exit(1);
      }
      const venue = r.venue === "Sha Tin" ? "Sha Tin" : "Happy Valley";
      full.push({
        ...row,
        venue: venue as RaceRow["venue"],
        surface: r.surface,
        raceClass: r.class,
        distance: r.distance,
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
  const byVenueClass = new Map<string, Bucket>();
  const byDistance = new Map<string, Bucket>();
  const byDistVenueClass = new Map<string, Bucket>();

  for (const row of full) {
    add(byClass, row.raceClass, row.hit);
    add(byVenue, row.venue, row.hit);
    add(bySurface, row.surface, row.hit);
    add(byVenueClass, `${row.venue} / ${row.raceClass}`, row.hit);
    add(byDistance, String(row.distance), row.hit);
    add(byDistVenueClass, `${row.distance}m / ${row.venue} / ${row.raceClass}`, row.hit);
  }

  const pct = (b: Bucket) => (b.n === 0 ? 0 : (100 * b.hits) / b.n);

  const sortKeys = (m: Map<string, Bucket>, natural?: (a: string, b: string) => number) =>
    [...m.keys()].sort(natural ?? ((a, b) => a.localeCompare(b)));

  console.log("TOTAL", full.filter((r) => r.hit).length, "/", full.length, ((100 * full.filter((r) => r.hit).length) / full.length).toFixed(1) + "%");

  const printTable = (title: string, keys: string[], get: (k: string) => Bucket) => {
    console.log("\n## " + title);
    console.log("| Segment | Hits | Races | Hit rate |");
    console.log("|---------|------|-------|----------|");
    for (const k of keys) {
      const b = get(k);
      console.log(`| ${k} | ${b.hits} | ${b.n} | ${pct(b).toFixed(1)}% |`);
    }
  };

  printTable("By venue", sortKeys(byVenue), (k) => byVenue.get(k)!);
  printTable("By surface", sortKeys(bySurface), (k) => bySurface.get(k)!);
  printTable("By class", sortKeys(byClass, (a, b) => a.localeCompare(b, undefined, { numeric: true })), (k) => byClass.get(k)!);
  printTable("By distance (m)", sortKeys(byDistance, (a, b) => Number(a) - Number(b)), (k) => byDistance.get(k)!);
  printTable("By venue × class", sortKeys(byVenueClass), (k) => byVenueClass.get(k)!);
  printTable("By distance × venue × class", sortKeys(byDistVenueClass, (a, b) => {
    const da = parseInt(a), db = parseInt(b);
    return da !== db ? da - db : a.localeCompare(b);
  }), (k) => byDistVenueClass.get(k)!);

  const dateStamp = outputDateStamp();
  const dateLabel = `${dateStamp.slice(0, 4)}-${dateStamp.slice(4, 6)}-${dateStamp.slice(6, 8)}`;

  // Markdown file for the report
  const out: string[] = [];
  out.push("# MC #1 place leg — hit rate breakdown");
  out.push("");
  out.push(`*Generated: ${dateLabel}*`);
  out.push("");
  out.push("Source: `data/test_reports/mc_top1_place_allup_summary.md` (same MC #1 / place-paid definition as the all-up report) joined to `data/historical/results_*.json` for **class**, **venue**, **surface**, and **distance**.");
  out.push("");
  out.push(`**Sample:** ${full.length} race legs across ${MEETING_FILES.length} meetings (${full.filter((r) => r.hit).length} hits, **${((100 * full.filter((r) => r.hit).length) / full.length).toFixed(1)}%** overall). Segments with very few races are indicative only.`);
  out.push("");
  const mdTable = (title: string, keys: string[], get: (k: string) => Bucket) => {
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
  mdTable("By venue", sortKeys(byVenue), (k) => byVenue.get(k)!);
  mdTable("By surface", sortKeys(bySurface), (k) => bySurface.get(k)!);
  mdTable("By class", sortKeys(byClass, (a, b) => a.localeCompare(b, undefined, { numeric: true })), (k) => byClass.get(k)!);
  mdTable("By distance (metres)", sortKeys(byDistance, (a, b) => Number(a) - Number(b)), (k) => byDistance.get(k)!);
  mdTable("By venue × class", sortKeys(byVenueClass), (k) => byVenueClass.get(k)!);
  mdTable("By distance × venue × class", sortKeys(byDistVenueClass, (a, b) => {
    const da = parseInt(a), db = parseInt(b);
    return da !== db ? da - db : a.localeCompare(b);
  }), (k) => byDistVenueClass.get(k)!);
  out.push("---");
  out.push("");
  out.push("*Meetings included:* " + MEETING_FILES.map((f) => f.replace(/^results_/, "").replace(/\.json$/, "")).join(", ") + ".");

  const staticDir = join(ROOT, "data/static");
  mkdirSync(staticDir, { recursive: true });
  const outPath = join(staticDir, `mc_top1_place_hit_rate_by_segment_${dateStamp}.md`);
  writeFileSync(outPath, out.join("\n"), "utf-8");
  console.log("\nWrote", outPath);
}

main();
