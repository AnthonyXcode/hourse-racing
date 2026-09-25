// Real scraping sessions built on the parent repo's proven scrapers (Playwright), loaded
// dynamically like server/analyzer.ts does. Nothing here writes files: documents are returned
// in exactly the JSON shape the parent used to write to data/historical and data/racecards.
import path from "path";
import { fileURLToPath } from "url";
import type { CardDoc, MeetingKey, RaceStore, Venue } from "./raceStore";
import type { CardsSession, ResultsSession, UpcomingMeeting } from "./fetchJobs";
import { fixDividends, parseDividendRows } from "./dividends";

const PARENT = fileURLToPath(new URL("../../../", import.meta.url));
// Computed paths: the parent code isn't part of this package's tsconfig.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const load = (p: string): Promise<any> => import(/* @vite-ignore */ path.join(PARENT, p));

const venueName = (v: Venue) => (v === "HV" ? "Happy Valley" : "Sha Tin");
/** UTC-midnight Date for a YYYY-MM-DD day, as tools/scrape-meeting.ts builds it (`new Date("2026-09-23")`)
 *  — the stored documents' `date` is then "2026-09-23T00:00:00.000Z", matching the existing files. */
const dayDate = (ymd: string) => new Date(`${ymd}T00:00:00.000Z`);
/** Dates → ISO strings etc.: the same JSON the parent wrote with JSON.stringify. */
const plain = <T>(x: unknown): T => JSON.parse(JSON.stringify(x)) as T;

/**
 * Results, mirroring tools/sync-historical.ts + tools/scrape-meeting.ts:
 * scrapeFullMeetingResults (falling back to the other course when HKJC ran it there), then the
 * Double/Triple Trio dividends from tools/enrich-multi-trio.ts, applied in memory.
 */
export async function openResultsSession(): Promise<ResultsSession> {
  const { HistoricalScraper } = await load("src/scrapers/historical.ts");
  const { parsePoolRows, assignMultiTrio } = await load("tools/enrich-multi-trio.ts");
  const scraper = new HistoricalScraper({ headless: true });
  await scraper.init();

  /**
   * enrichMeeting() without the file: fetch each race's English results page, parse DT/TT rows.
   * The same pages also correct Win/Place/Quinella/QPL dividends ≥ $1,000 (see ./dividends.ts).
   */
  async function multiTrio(races: { raceNumber: number }[], m: MeetingKey, delay = 300): Promise<string> {
    const apiDate = m.date.replaceAll("-", "/");
    const rows: unknown[] = [];
    let failed = 0;
    let fixed = 0;
    for (const r of races) {
      const url = `https://racing.hkjc.com/racing/information/English/Racing/LocalResults.aspx?RaceDate=${apiDate}&Racecourse=${m.venue}&RaceNo=${r.raceNumber}`;
      const res = await fetch(url).catch(() => null);
      const html = res?.ok ? await res.text() : "";
      if (delay) await new Promise((ok) => setTimeout(ok, delay));
      if (!html) {
        failed++;
        continue;
      }
      rows.push(...parsePoolRows(html, r.raceNumber));
      fixed += fixDividends(r as Parameters<typeof fixDividends>[0], parseDividendRows(html));
    }
    const fixNote = fixed ? ` · ${fixed} dividend(s) corrected` : "";
    // Same rule as enrichMeeting: don't apply a partial fetch.
    if (failed) return `DT/TT skipped: ${failed} page(s) failed${fixNote}`;
    const found = assignMultiTrio(races, rows) as { double: number; triple: number };
    return `DT ${found.double ? "✓" : "—"} TT ${found.triple ? "✓" : "—"}${fixNote}`;
  }

  return {
    async scrape(m) {
      let venue: Venue = m.venue;
      let races = await scraper.scrapeFullMeetingResults(dayDate(m.date), venueName(venue));
      if (!races.length) {
        const alt: Venue = venue === "HV" ? "ST" : "HV";
        const altRaces = await scraper.scrapeFullMeetingResults(dayDate(m.date), venueName(alt));
        if (altRaces.length) {
          venue = alt;
          races = altRaces;
        }
      }
      const docs = plain<{ raceNumber: number }[]>(races);
      const note = docs.length ? await multiTrio(docs, { date: m.date, venue }) : undefined;
      return { venue, races: docs, note: venue !== m.venue ? `ran at ${venue}; ${note}` : note };
    },
    close: () => scraper.close(),
  };
}

/**
 * Racecards, mirroring src/pipeline/batchAnalysis.ts (live, not --use-saved): scrape the card,
 * enrich horses (past form, all venues), jockeys and trainers, fetch current win odds, and build
 * the {race, winOdds} document RaceCardHistoryScraper.saveRaceCard wrote. Horse form comes from
 * the DB's results instead of data/historical files.
 */
export async function openCardsSession(store: Pick<RaceStore, "resultMeetings" | "results">): Promise<CardsSession> {
  const [{ RaceCardScraper }, { HorseDataEnricher }, { JockeyEnricher }, { TrainerEnricher }] = await Promise.all([
    load("src/scrapers/raceCard.ts"),
    load("src/data/horseEnricher.ts"),
    load("src/data/jockeyEnricher.ts"),
    load("src/data/trainerEnricher.ts"),
  ]);

  // Past form from the DB, oldest meeting first (the order loadHistoricalData read the files in).
  const horses = new HorseDataEnricher({ dataDir: path.join(PARENT, "data", "__db__") });
  for (const m of [...store.resultMeetings()].reverse())
    for (const r of store.results<{ finishOrder?: unknown[] }>(m) ?? []) if (r.finishOrder?.length) horses.indexRaceResult(r);

  const scraper = new RaceCardScraper({ headless: true });
  await scraper.init();
  const jockeys = new JockeyEnricher({ fetchFromHKJC: true, dataDir: path.join(PARENT, "data", "jockeys") });
  await jockeys.loadFromDirectory();
  const trainers = new TrainerEnricher({ fetchFromHKJC: true, dataDir: path.join(PARENT, "data", "trainers") });
  await trainers.loadFromDirectory();

  return {
    async scrapeRace(m, raceNo) {
      const date = dayDate(m.date);
      const scraped = await scraper.scrapeRaceCard(date, venueName(m.venue), raceNo);
      if (!scraped?.entries?.length) return null;
      let race = horses.enrichRace(scraped, { formVenue: "all" });
      race = await jockeys.enrichRace(race);
      race = await trainers.enrichRace(race);
      const odds: Map<number, number> = await scraper.fetchCurrentOdds(date, venueName(m.venue), raceNo);
      return plain<CardDoc>({
        race: { ...race, date: race.date instanceof Date ? race.date.toISOString() : String(race.date) },
        winOdds: Object.fromEntries([...odds].map(([n, o]) => [String(n), o])),
      });
    },
    async close() {
      await Promise.allSettled([scraper.close(), jockeys.closeBrowser(), trainers.closeBrowser()]);
    },
  };
}

/** Local meetings HKJC currently lists (activeMeetings), with post times. Overseas simulcasts (S1…) are dropped. */
export async function discoverMeetings(): Promise<UpcomingMeeting[]> {
  const { readFileSync } = await import("fs");
  const query = readFileSync(fileURLToPath(new URL("../momentum/queries/meeting.graphql", import.meta.url)), "utf8");
  const res = await fetch("https://info.cld.hkjc.com/graphql/base/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ operationName: "raceMeetings", variables: {}, query }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`HKJC meetings: HTTP ${res.status}`);
  const json = (await res.json()) as {
    data?: { activeMeetings?: { date: string; venueCode: string; races?: { no: number; postTime: string | null }[] }[] };
    errors?: { message: string }[];
  };
  if (json.errors?.length) throw new Error(`HKJC meetings: ${json.errors.map((e) => e.message).join("; ")}`);
  return (json.data?.activeMeetings ?? [])
    .filter((m) => m.venueCode === "ST" || m.venueCode === "HV")
    .map((m) => ({
      date: m.date.slice(0, 10),
      venue: m.venueCode as Venue,
      races: (m.races ?? []).map((r) => ({ raceNo: Number(r.no), postTime: r.postTime ?? null })).sort((a, b) => a.raceNo - b.raceNo),
    }));
}
