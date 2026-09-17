import { describe, expect, it } from "vitest";
import type { McAccuracyPick } from "../differentiationBacktest.js";
import {
  combinations,
  evaluateTrioBanker,
  planTrioBanker,
  selectBanker,
  selectLegs,
  summarizeTickets,
  trioBankerHit,
  type TrioBankerRace,
} from "../trioBanker.js";

function pick(
  horseCode: string,
  ratingRank: number,
  mcRank: number,
  mcPlacePct = 0.3,
  horseNumber = ratingRank,
  tripRuns = 3
): McAccuracyPick {
  return {
    ratingRank,
    mcRank,
    horseCode,
    horseName: `HORSE ${horseCode}`,
    horseNumber,
    overallRating: 80 - ratingRank,
    mcWinPct: 0.1,
    mcPlacePct,
    winOdds: 0,
    placeOdds: 0,
    placed: false,
    tripRuns,
  };
}

const finisher = (horseCode: string, finishPosition: number) => ({ horseCode, finishPosition, horseNumber: 0 });

// A is form #1; MC ranks the others C, B, D, F, E, G
const picks = [
  pick("A", 1, 1, 0.8),
  pick("B", 2, 3),
  pick("C", 3, 2),
  pick("D", 4, 4),
  pick("E", 5, 6),
  pick("F", 6, 5),
  pick("G", 7, 7),
];

function race(finishOrder: ReturnType<typeof finisher>[], trioDividend = 250): TrioBankerRace {
  return {
    row: {
      raceId: "20260101_HV_R1",
      date: "20260101",
      venue: "HV",
      raceNumber: 1,
      skipped: false,
      skipReason: "",
      numRunners: picks.length,
      picks: picks.map((p) => ({ ...p, placed: finishOrder.some((f) => f.horseCode === p.horseCode && f.finishPosition <= 3) })),
    },
    finishOrder,
    trioDividend,
  };
}

describe("combinations", () => {
  it("counts banker Trio combos for 5 and 6 legs", () => {
    expect(combinations(5, 2)).toBe(10);
    expect(combinations(6, 2)).toBe(15);
    expect(combinations(1, 2)).toBe(0);
  });
});

describe("selectLegs", () => {
  it("ranks legs by MC win% without the banker", () => {
    expect(selectLegs(picks, 3, "mc").map((p) => p.horseCode)).toEqual(["C", "B", "D"]);
  });

  it("ranks legs by form rating without the banker", () => {
    expect(selectLegs(picks, 5, "form").map((p) => p.horseCode)).toEqual(["B", "C", "D", "E", "F"]);
  });
});

describe("standby horses (saddle-cloth number 0)", () => {
  const withStandby = [
    pick("S", 1, 1, 0.9, 0),
    pick("A", 2, 2, 0.8),
    pick("T", 3, 3, 0.3, 0),
    pick("B", 4, 4),
    pick("C", 5, 5),
  ];

  it("are never the banker", () => {
    expect(selectBanker(withStandby)?.horseCode).toBe("A");
  });

  it("are never legs", () => {
    expect(selectLegs(withStandby, 5, "form").map((p) => p.horseCode)).toEqual(["B", "C"]);
  });
});

describe("leg trip rule", () => {
  // tripRuns: A 4, B 0, C 2, D 5, E 0, F 1
  const field = [
    pick("A", 1, 1, 0.8, 1, 4),
    pick("B", 2, 2, 0.3, 2, 0),
    pick("C", 3, 3, 0.3, 3, 2),
    pick("D", 4, 4, 0.3, 4, 5),
    pick("E", 5, 5, 0.3, 5, 0),
    pick("F", 6, 6, 0.3, 6, 1),
  ];

  it("keeps plain form order when off", () => {
    expect(selectLegs(field, 3, "form").map((p) => p.horseCode)).toEqual(["B", "C", "D"]);
  });

  it("moves legs short of the trip minimum behind proven runners", () => {
    expect(selectLegs(field, 3, "form", 1).map((p) => p.horseCode)).toEqual(["C", "D", "F"]);
    expect(selectLegs(field, 3, "form", 2).map((p) => p.horseCode)).toEqual(["C", "D", "B"]);
  });
});

describe("trioBankerHit", () => {
  it("hits when the banker and two legs fill the top 3", () => {
    expect(trioBankerHit("A", ["B", "C"], [finisher("A", 1), finisher("B", 2), finisher("C", 3)])).toBe(true);
  });

  it("misses when a top-3 horse is not a leg", () => {
    expect(trioBankerHit("A", ["B", "D"], [finisher("A", 1), finisher("B", 2), finisher("C", 3)])).toBe(false);
  });

  it("misses when the banker finishes 4th", () => {
    const order = [finisher("B", 1), finisher("C", 2), finisher("D", 3), finisher("A", 4)];
    expect(trioBankerHit("A", ["B", "C", "D"], order)).toBe(false);
  });

  it("hits on a dead-heat for 3rd when either tied horse is a leg", () => {
    const order = [finisher("A", 1), finisher("B", 2), finisher("C", 3), finisher("D", 3)];
    expect(trioBankerHit("A", ["B", "D"], order)).toBe(true);
  });
});

describe("evaluateTrioBanker", () => {
  const order = [finisher("A", 1), finisher("C", 2), finisher("B", 3), finisher("D", 4)];

  it("bets banker + 5 legs (10 combos) when MC Place% clears the threshold", () => {
    const ticket = evaluateTrioBanker(race(order), { bankerMcMin: 75, legs: 5, legRank: "mc" });
    expect(ticket).not.toBeNull();
    expect(ticket!.combos).toBe(10);
    expect(ticket!.stake).toBe(100);
    expect(ticket!.hit).toBe(true);
    expect(ticket!.payout).toBe(250);
    expect(ticket!.bankerPlaced).toBe(true);
  });

  it("skips when the banker's MC Place% is below the threshold", () => {
    expect(evaluateTrioBanker(race(order), { bankerMcMin: 85, legs: 5, legRank: "mc" })).toBeNull();
  });

  it("pays nothing on a miss", () => {
    const miss = [finisher("A", 1), finisher("G", 2), finisher("B", 3)];
    const ticket = evaluateTrioBanker(race(miss), { bankerMcMin: 75, legs: 5, legRank: "mc" });
    expect(ticket!.hit).toBe(false);
    expect(ticket!.payout).toBe(0);
  });
});

describe("planTrioBanker", () => {
  it("returns banker, legs and cost without needing a result", () => {
    const plan = planTrioBanker(picks, { bankerMcMin: 75, legs: 6, legRank: "form" });
    expect(plan?.banker.horseCode).toBe("A");
    expect(plan?.legs.map((l) => l.horseCode)).toEqual(["B", "C", "D", "E", "F", "G"]);
    expect(plan?.combos).toBe(15);
    expect(plan?.stake).toBe(150);
  });

  it("skips when the banker's MC Place% is below the threshold", () => {
    expect(planTrioBanker(picks, { bankerMcMin: 85, legs: 6, legRank: "form" })).toBeNull();
  });
});

describe("summarizeTickets", () => {
  it("totals stake, return and ROI", () => {
    const hit = evaluateTrioBanker(race([finisher("A", 1), finisher("C", 2), finisher("B", 3)], 250), {
      bankerMcMin: 75,
      legs: 5,
      legRank: "mc",
    })!;
    const miss = evaluateTrioBanker(race([finisher("A", 1), finisher("G", 2), finisher("B", 3)]), {
      bankerMcMin: 75,
      legs: 5,
      legRank: "mc",
    })!;
    expect(summarizeTickets([hit, miss])).toEqual({ bets: 2, bankerPlaced: 2, hits: 1, stake: 200, payout: 250, roi: 25 });
    expect(summarizeTickets([]).roi).toBeNull();
  });
});
