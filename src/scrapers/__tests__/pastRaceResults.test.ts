import { describe, it, expect } from "vitest";
import * as cheerio from "cheerio";
import { PastRaceResultsScraper } from "../pastRaceResults.js";

/**
 * Regression cover for the 2026-03-18 HV R1 racecard corruption.
 *
 * HKJC marks a dead heat by appending "DH" to the Pla. cell. The old parser
 * assigned Pla./Horse No./Dr. by scanning for "the next integer in 1-14", so a
 * "1 DH" cell failed its bare-integer test, nothing claimed the Pla. column, and
 * every later field shifted one column left — the Dr. value landed in
 * horseNumber, and LBW landed in draw.
 */

/** Pla. | Horse No. | Horse | Jockey | Trainer | Act.Wt. | Declar.Horse Wt. | Dr. | LBW | RunPos | Finish Time | Win Odds */
function buildResultsTable(rows: string[][]): string {
  const header = [
    "Pla.", "Horse No.", "Horse", "Jockey", "Trainer", "Act. Wt.",
    "Declar. Horse Wt.", "Dr.", "LBW", "RunningPosition", "Finish Time", "Win Odds",
  ];
  const th = header.map((h) => `<th>${h}</th>`).join("");
  const body = rows
    .map((cells) => `<tr>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("");
  return `<table><tr>${th}</tr>${body}</table>`;
}

function horseCell(name: string, code: string): string {
  return `<a href="/racing/info/horse?horseid=${code}">${name}</a>`;
}

function parse(html: string) {
  const scraper = new PastRaceResultsScraper();
  // parseRunners is private; exercised directly to keep the test offline.
  return (scraper as unknown as {
    parseRunners: (c: cheerio.CheerioAPI) => Array<{
      finishPosition: number; horseNumber: number; horseName: string; draw: number;
      actualWeight: number; horseWeight: number; winOdds: number;
    }>;
  }).parseRunners(cheerio.load(html));
}

describe("PastRaceResultsScraper.parseRunners", () => {
  it("reads horse number and draw from their own columns on a normal row", () => {
    const runners = parse(
      buildResultsTable([
        ["3", "10", horseCell("DRAGON SUNRISE", "HK%5F2023%5FJ269"),
         "Z Purton", "K W Lui", "120", "996", "12", "1-1/4", "5 4 3", "1:39.09", "3.5"],
      ])
    );

    expect(runners).toHaveLength(1);
    expect(runners[0]).toMatchObject({
      finishPosition: 3,
      horseNumber: 10,
      draw: 12,
      actualWeight: 120,
      horseWeight: 996,
      winOdds: 3.5,
    });
  });

  it('does not shift columns when the Pla. cell carries a "DH" dead-heat marker', () => {
    const runners = parse(
      buildResultsTable([
        ["1 DH", "1", horseCell("GLORIOUS RYDER", "HK%5F2024%5FK290"),
         "L Ferraris", "D Eustace", "135", "957", "6", "-", "8 8 7", "1:39.05", "36"],
        ["1 DH", "7", horseCell("SOARING BRONCO", "HK%5F2023%5FJ162"),
         "J Orman", "M Newnham", "128", "1118", "2", "-", "2 2 1", "1:39.05", "4.4"],
      ])
    );

    expect(runners).toHaveLength(2);

    const ryder = runners.find((r) => r.horseName === "GLORIOUS RYDER")!;
    expect(ryder.finishPosition).toBe(1);
    expect(ryder.horseNumber).toBe(1); // was 6 (the Dr. value) before the fix
    expect(ryder.draw).toBe(6); // was 1 (leaked from another cell) before the fix
    expect(ryder.winOdds).toBe(36);

    const bronco = runners.find((r) => r.horseName === "SOARING BRONCO")!;
    expect(bronco.finishPosition).toBe(1);
    expect(bronco.horseNumber).toBe(7); // was 2 before the fix
    expect(bronco.draw).toBe(2); // was 1 before the fix
    expect(bronco.winOdds).toBe(4.4);
  });

  it("keeps horse numbers and draws unique across a dead-heat field", () => {
    const runners = parse(
      buildResultsTable([
        ["1 DH", "1", horseCell("A", "HK%5F1"), "J1", "T1", "135", "957", "6", "-", "8 8", "1:39.05", "36"],
        ["1 DH", "7", horseCell("B", "HK%5F2"), "J2", "T2", "128", "1118", "2", "-", "2 2", "1:39.05", "4.4"],
        ["3", "10", horseCell("C", "HK%5F3"), "J3", "T3", "120", "996", "12", "1", "5 4", "1:39.09", "3.5"],
      ])
    );

    expect(new Set(runners.map((r) => r.horseNumber)).size).toBe(runners.length);
    expect(new Set(runners.map((r) => r.draw)).size).toBe(runners.length);
  });
});
