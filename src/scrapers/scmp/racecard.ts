/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/**
 * SCMP Racecard Scraper
 *
 * Fetches and parses a single race from the SCMP racecard page.
 * Returns race metadata (class, distance, surface, going) and
 * entry-level data (horse, jockey, trainer, draw, weight, rating, age, gear)
 * plus profile URLs for jockey/trainer.
 */
import type { Page } from "playwright";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ScmpRaceMeta {
  class: string;
  distance: number;
  surface: string;
  going: string;
}

export interface ScmpEntry {
  horseNumber: number;
  horseName: string;
  jockey: string;
  jockeyUrl: string;
  trainer: string;
  trainerUrl: string;
  draw: number;
  weight: number;
  rating: number;
  age: number;
  gear: string[];
  isReserve: boolean;
}

export interface ScmpRaceData {
  meta: ScmpRaceMeta;
  entries: ScmpEntry[];
}

// ---------------------------------------------------------------------------
// Scrape
// ---------------------------------------------------------------------------

/**
 * Navigate to an SCMP racecard page and parse the race data.
 * Expects the page to already be on the correct URL, or pass raceNumber
 * and the function will navigate.
 */
export async function scrapeScmpRacecard(
  page: Page,
  raceNumber?: number,
): Promise<ScmpRaceData> {
  if (raceNumber !== undefined) {
    const url = `https://www.scmp.com/sport/racing/racecard/${raceNumber}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await page.waitForTimeout(2000);
  }

  return page.evaluate(() => {
    // --- Race metadata from header ---
    const headerEl = document.querySelector("h2");
    const headerText = headerEl?.textContent ?? "";

    let surface = "Turf";
    if (/all weather/i.test(headerText) || /AWT/i.test(headerText)) surface = "AWT";

    const distMatch = headerText.match(/(\d{3,4})M/);
    const distance = distMatch ? parseInt(distMatch[1]!, 10) : 0;

    const goingMatch =
      headerText.match(/Expected Going:\s*(\w+)/i) ??
      headerText.match(/Going:\s*(\w+)/i);
    const going = goingMatch ? goingMatch[1]! : "";

    const classMatch = headerText.match(/Class\s*(\d)/i);
    const ratingBandMatch = headerText.match(/Rating:\s*([\d]+-[\d]+)/);
    let raceClass = "";
    if (classMatch) {
      raceClass = `Class ${classMatch[1]}`;
    } else if (ratingBandMatch) {
      raceClass = `Rating ${ratingBandMatch[1]}`;
    }

    const h1 = document.querySelector("h1");
    const h1Text = h1?.textContent ?? "";
    if (!raceClass && /group/i.test(h1Text)) {
      const gm = h1Text.match(/Group\s*(\d)/i);
      if (gm) raceClass = `Group ${gm[1]}`;
    }
    if (!raceClass && /griffin/i.test(h1Text)) raceClass = "Griffin";

    const meta = { class: raceClass, distance, surface, going };

    // --- Entry table ---
    const entries: {
      horseNumber: number;
      horseName: string;
      jockey: string;
      jockeyUrl: string;
      trainer: string;
      trainerUrl: string;
      draw: number;
      weight: number;
      rating: number;
      age: number;
      gear: string[];
      isReserve: boolean;
    }[] = [];

    const tables = document.querySelectorAll("table");
    let mainTable: HTMLTableElement | null = null;
    for (const t of tables) {
      const txt = t.textContent ?? "";
      if (txt.includes("Jockey") && txt.includes("Draw") && txt.includes("Trainer")) {
        mainTable = t;
        break;
      }
    }
    if (!mainTable) return { meta, entries };

    // Discover column indices from thead
    const COL: Record<string, number> = {};
    const thRows = mainTable.querySelectorAll("thead tr");
    if (thRows.length > 0) {
      const ths = thRows[0]!.querySelectorAll("th, td");
      ths.forEach((th, i) => {
        const label = (th.textContent ?? "").trim().toLowerCase();
        if (label === "no") COL["no"] = i;
        else if (label === "horse") COL["horse"] = i;
        else if (label === "last runs") COL["lastRuns"] = i;
        else if (label === "gear") COL["gear"] = i;
        else if (label === "trainer") COL["trainer"] = i;
        else if (label === "age") COL["age"] = i;
        else if (label === "wt.") COL["wt"] = i;
        else if (label === "rating") COL["rating"] = i;
        else if (label === "jockey") COL["jockey"] = i;
        else if (label === "draw") COL["draw"] = i;
      });
    }

    // Fallback defaults matching observed SCMP structure
    const C_NO = COL["no"] ?? 0;
    const C_HORSE = COL["horse"] ?? 3;
    const C_GEAR = COL["gear"] ?? 6;
    const C_TRAINER = COL["trainer"] ?? 7;
    const C_AGE = COL["age"] ?? 8;
    const C_WT = COL["wt"] ?? 9;
    const C_RATING = COL["rating"] ?? 10;
    const C_JOCKEY = COL["jockey"] ?? 11;
    const C_DRAW = COL["draw"] ?? 12;

    const VALID_GEAR: Record<string, string> = {
      B: "B", H: "H", P: "P", TT: "TT", V: "V", XB: "XB",
      CP: "CP", CO: "CO", CC: "CC", BO: "BO", PC: "PC",
      SR: "SR", SB: "SB", E: "E", VO: "VO", PS: "PS",
    };

    const rows = mainTable.querySelectorAll("tbody tr");
    for (const row of rows) {
      const cells = row.querySelectorAll("td");
      if (cells.length < 12) continue;

      const noText = (cells[C_NO]?.textContent ?? "").trim();
      const isReserve = /^R$/i.test(noText) || /reserve/i.test(noText);
      const horseNumber = parseInt(noText, 10) || 0;

      let horseName = (cells[C_HORSE]?.textContent ?? "").trim();
      horseName = horseName.replace(/[\u4e00-\u9fff\u3400-\u4dbf]+/g, "").trim();
      horseName = horseName.replace(/\s*\([A-Z]\d{3}\)\s*$/, "").trim();

      // Trainer name + profile link
      const trainerCell = cells[C_TRAINER];
      const trainerAnchor = trainerCell?.querySelector('a[href*="/racing/stats/trainer/"]') as HTMLAnchorElement | null;
      const trainer = (trainerCell?.textContent ?? "").trim();
      const trainerUrl = trainerAnchor?.href ?? "";

      const age = parseInt((cells[C_AGE]?.textContent ?? "").trim(), 10) || 0;
      const weight = parseInt((cells[C_WT]?.textContent ?? "").trim(), 10) || 0;
      const rating = parseInt((cells[C_RATING]?.textContent ?? "").trim(), 10) || 0;

      // Jockey name + profile link
      const jockeyCell = cells[C_JOCKEY];
      const jockeyAnchor = jockeyCell?.querySelector('a[href*="/racing/stats/jockey/"]') as HTMLAnchorElement | null;
      let jockey = (jockeyCell?.textContent ?? "").trim();
      jockey = jockey.replace(/\s+[-+]\d+$/, "").trim();
      const jockeyUrl = jockeyAnchor?.href ?? "";

      const draw = parseInt((cells[C_DRAW]?.textContent ?? "").trim(), 10) || 0;

      const gearText = (cells[C_GEAR]?.textContent ?? "").trim();
      const gearList: string[] = [];
      if (gearText) {
        const parts = gearText.split("/");
        for (const p of parts) {
          const clean = p.replace(/[-+\d]/g, "").trim();
          if (clean && VALID_GEAR[clean]) gearList.push(VALID_GEAR[clean]!);
        }
      }

      entries.push({
        horseNumber: isReserve ? -1 : horseNumber,
        horseName,
        jockey,
        jockeyUrl,
        trainer,
        trainerUrl,
        draw: isReserve ? -1 : draw,
        weight,
        rating,
        age,
        gear: gearList,
        isReserve,
      });
    }

    return { meta, entries };
  });
}
