import { describe, it, expect } from "vitest";
import * as cheerio from "cheerio";
import { RaceCardScraper } from "../raceCard.js";
import { carriedWeight } from "../../utils/index.js";
import type { RaceEntry } from "../../types/index.js";

/**
 * HKJC shows an apprentice's allowance beside the jockey's name ("C L Chau (-2)")
 * and declared overweight in the Over Wt. column. Wt. is the handicap weight, so
 * the weight carried is Wt. − claim + overweight.
 */

const HEADER = ["Horse No.", "Last 6 Runs", "Horse", "Wt.", "Jockey", "Over Wt.", "Draw", "Trainer", "Int'l Rtg.", "Rtg.", "Rtg.+/-"];

function row(num: number, horse: string, wt: string, jockey: string, overWt: string, draw: string): string[] {
  return [
    String(num),
    "1/2/3",
    `<a href="/racing/information/English/Horse/Horse.aspx?HorseId=HK_2024_K${num}">${horse}</a>`,
    wt,
    `<a href="/racing/information/English/Jockey/JockeyProfile.aspx?JockeyId=J${num}">${jockey}</a>`,
    overWt,
    draw,
    `<a href="/racing/information/English/Trainer/TrainerProfile.aspx?TrainerId=T${num}">A Trainer</a>`,
    "",
    "52",
    "+1",
  ];
}

function parse(rows: string[][]): RaceEntry[] {
  const th = HEADER.map((h) => `<th>${h}</th>`).join("");
  const body = rows.map((cells) => `<tr>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("");
  const scraper = new RaceCardScraper();
  return (scraper as unknown as { parseEntries: ($: cheerio.CheerioAPI) => RaceEntry[] }).parseEntries(
    cheerio.load(`<table><tr>${th}</tr>${body}</table>`)
  );
}

describe("race card weight allowances", () => {
  it("reads the apprentice claim from the jockey cell and strips it from the name", () => {
    const cell = row(1, "FAST ONE", "130", "", "", "4");
    cell[4] = `<a href="/racing/information/English/Jockey/JockeyProfile.aspx?JockeyId=CJE">C L Chau</a> (-2)`;
    const [entry] = parse([cell]);
    expect(entry!.jockey.name).toBe("C L Chau");
    expect(entry!.jockey.weightClaim).toBe(2);
    expect(entry!.weight).toBe(130);
    expect(carriedWeight(entry!)).toBe(128);
  });

  it("handles the claim inside the link text", () => {
    const [entry] = parse([row(2, "SLOW ONE", "125", "H Y Yuen (-10)", "", "7")]);
    expect(entry!.jockey.name).toBe("H Y Yuen");
    expect(entry!.jockey.weightClaim).toBe(10);
    expect(carriedWeight(entry!)).toBe(115);
  });

  it("reads Over Wt. by header and leaves the draw alone", () => {
    const [entry] = parse([row(3, "HEAVY ONE", "118", "Z Purton", "2", "9")]);
    expect(entry!.jockey.weightClaim).toBe(0);
    expect(entry!.overweight).toBe(2);
    expect(entry!.draw).toBe(9);
    expect(carriedWeight(entry!)).toBe(120);
  });

  it("carries the handicap weight when there is no claim or overweight", () => {
    const [entry] = parse([row(4, "PLAIN ONE", "133", "J Moreira", "", "1")]);
    expect(entry!.overweight).toBeUndefined();
    expect(carriedWeight(entry!)).toBe(133);
  });
});
