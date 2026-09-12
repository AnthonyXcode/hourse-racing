import { describe, expect, it } from "vitest";
import type { DifferentiationBacktestRow } from "../differentiationBacktest.js";
import { buildDifferentiationReport } from "../differentiationReport.js";

type Row = DifferentiationBacktestRow;

function row(overrides: Partial<Row> & Pick<Row, "date" | "raceNumber">): Row {
  const venue = overrides.venue ?? "ST";
  return {
    raceId: `${overrides.date}_${venue}_R${overrides.raceNumber}`,
    venue,
    topRatedHorseCode: "H1",
    topRatedHorseName: "HORSE ONE",
    topRatedHorseNumber: 1,
    topSimHorseCode: "H1",
    topSimHorseName: "HORSE ONE",
    topSimHorseNumber: 1,
    actualWinnerCode: "H2",
    actualWinnerName: "HORSE TWO",
    actualWinnerNumber: 2,
    actualTop3Codes: ["H2", "H3", "H4"],
    overallRating: 72,
    avgDiff: 16,
    horsesWithDiffLt8: 2,
    sparseFormCount: 0,
    topGap: 3,
    skipped: false,
    skipReason: "",
    surface: "Turf",
    going: "Good",
    raceClass: "Class 4",
    distance: 1200,
    topRatedWon: false,
    topRatedPlaced: false,
    topRatedFinishPosition: 5,
    topSimWon: false,
    topSimPlaced: false,
    numRunners: 12,
    topRatedMcPlacePct: 0.42,
    topRatedWinOdds: 4.5,
    topRatedPlaceOdds: 0,
    topRatedExpectedPosition: 3.4,
    ...overrides,
  };
}

const rows: Row[] = [
  // 6 Sep ST: two bets both placed (one won), one skip that would have placed
  row({ date: "20260906", raceNumber: 1, topRatedPlaced: true, topRatedWon: true, topRatedWinOdds: 3, topRatedPlaceOdds: 1.5 }),
  row({ date: "20260906", raceNumber: 2, topRatedPlaced: true, topRatedPlaceOdds: 2 }),
  row({ date: "20260906", raceNumber: 3, skipped: true, skipReason: "avgDiff=10", topRatedPlaced: true }),
  // 9 Sep HV: one losing bet
  row({ date: "20260909", venue: "HV", raceNumber: 1 }),
  // 13 Sep ST: everything skipped
  row({ date: "20260913", raceNumber: 1, skipped: true, skipReason: "close<8=5" }),
  row({ date: "20260913", raceNumber: 2, skipped: true, skipReason: "avgDiff=10" }),
];

describe("buildDifferentiationReport", () => {
  const report = buildDifferentiationReport(rows, new Map(), { venue: null, surface: null });

  it("counts bets, skips and places", () => {
    expect(report.totals).toEqual({ races: 6, betted: 3, bettedHits: 2, skipped: 3, skippedHits: 1, allPlaces: 3 });
  });

  it("summarises each racing day with ROI and all-up place", () => {
    const [sep6, sep9, sep13] = report.byDay.days;
    expect(sep6).toMatchObject({ date: "20260906", venue: "ST", total: 3, bet: 2, hits: 2, wins: 1, skip: 1, hitRate: 100 });
    expect(sep6!.winRoi).toBeCloseTo(50); // $30 back on $20
    expect(sep6!.placeRoi).toBeCloseTo(75); // $15 + $20 back on $20
    expect(sep6!.allUpPayout).toBeCloseTo(30); // $10 × 1.5 × 2

    expect(sep9).toMatchObject({ bet: 1, hits: 0, hitRate: 0, winRoi: -100, placeRoi: -100, allUpPayout: 0 });
    expect(sep13).toMatchObject({ bet: 0, hitRate: null, winRoi: null, placeRoi: null, allUpPayout: null });

    expect(report.byDay.total).toMatchObject({ races: 6, bet: 3, hits: 2, wins: 1, skip: 3, allUpDays: 2, allUpCost: 20 });
    expect(report.byDay.total.allUpReturn).toBeCloseTo(30);
    expect(report.byDay.total.allUpRoi).toBeCloseTo(50);
  });

  it("summarises months, counting only days with bets for all-up", () => {
    expect(report.byMonth.months).toHaveLength(1);
    const [sep] = report.byMonth.months;
    expect(sep).toMatchObject({ month: "2026-09", days: 2, bet: 3, hits: 2, wins: 1, cost: 30 });
    expect(sep!.winReturn).toBeCloseTo(30);
    expect(sep!.placeReturn).toBeCloseTo(35);
    expect(sep!.allUpRoi).toBeCloseTo(50);
  });

  it("lists skip reasons most common first", () => {
    expect(report.skipReasons).toEqual([
      { reason: "avgDiff=10", count: 2 },
      { reason: "close<8=5", count: 1 },
    ]);
  });

  it("breaks down by venue with a TOTAL row", () => {
    expect(report.breakdowns.venue?.rows.map((r) => [r.group, r.total, r.bet, r.hits, r.ratePct])).toEqual([
      ["HV", 1, 1, 0, "0.0%"],
      ["ST", 5, 2, 2, "100.0%"],
    ]);
    expect(report.breakdowns.venue?.total).toMatchObject({ total: 6, bet: 3, hits: 2, ratePct: "66.7%" });
  });

  it("leaves out venue and surface breakdowns when both are filtered", () => {
    const filtered = buildDifferentiationReport(rows, new Map(), { venue: "ST", surface: "Turf" });
    expect(filtered.breakdowns.venue).toBeUndefined();
    expect(filtered.breakdowns.surface).toBeUndefined();
    expect(filtered.breakdowns.going.total.total).toBe(6);
  });

  it("buckets win odds and puts non-positive odds under N/A", () => {
    const withMissingOdds = [...rows, row({ date: "20260913", raceNumber: 3, topRatedWinOdds: 0 })];
    const groups = buildDifferentiationReport(withMissingOdds, new Map(), { venue: null, surface: null }).breakdowns
      .winOdds.rows.map((r) => [r.group, r.total]);
    expect(groups).toEqual([
      ["3-5", 6],
      ["N/A", 1],
    ]);
  });

  it("sorts upcoming meetings by key", () => {
    const upcoming = new Map([
      ["20260920_Sha Tin", []],
      ["20260913_Happy Valley", []],
    ]);
    const withUpcoming = buildDifferentiationReport(rows, upcoming, { venue: null, surface: null });
    expect(withUpcoming.upcoming.map((m) => m.meeting)).toEqual(["20260913_Happy Valley", "20260920_Sha Tin"]);
  });
});
