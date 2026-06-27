import { describe, it, expect } from "vitest";
import { choose, perm, bankerLegCombos } from "./combinatorics";
import { winningCombos, coverCount } from "./settle";
import { countCombos, cost, settle } from "./index";
import type { FinishEntry, RaceResult, BetSelection } from "../types";

// ---- helpers ----
const fin = (pairs: [number, number][]): FinishEntry[] =>
  pairs.map(([horseNumber, finishPosition]) => ({
    horseNumber,
    finishPosition,
    horseName: `H${horseNumber}`,
    horseCode: `C${horseNumber}`,
    winOdds: 0,
  }));

const result = (over: Partial<RaceResult>): RaceResult => ({
  raceNumber: 1,
  class: "C5",
  distance: 1200,
  finishOrder: fin([[1, 1], [2, 2], [3, 3], [4, 4]]),
  ...over,
});

const oneRace = (r: RaceResult) => new Map([[r.raceNumber, r]]);

// ---- combinatorics ----
describe("combinatorics", () => {
  it("choose known values", () => {
    expect(choose(6, 3)).toBe(20);
    expect(choose(5, 2)).toBe(10);
    expect(choose(8, 3)).toBe(56);
    expect(choose(3, 5)).toBe(0);
  });
  it("perm known values", () => {
    expect(perm(4, 3)).toBe(24);
    expect(perm(3, 3)).toBe(6);
  });
  it("banker-leg 膽拖 counts", () => {
    expect(bankerLegCombos(1, 5, 3)).toBe(choose(5, 2)); // 1膽+5腳 trio = 10
    expect(bankerLegCombos(2, 3, 3)).toBe(choose(3, 1)); // 雙膽拖 = 3
    expect(bankerLegCombos(0, 6, 3)).toBe(20); // box
    expect(bankerLegCombos(3, 2, 3)).toBe(0); // bankers >= size invalid
  });
});

// ---- dead-heat (IRON) ----
describe("winningCombos dead-heat", () => {
  it("no dead-heat → single trio", () => {
    const c = winningCombos(fin([[1, 1], [2, 2], [3, 3], [4, 4]]), 3);
    expect(c.length).toBe(1);
    expect([...c[0]!].sort()).toEqual([1, 2, 3]);
  });
  it("dead-heat for 3rd → two trios sharing 1st+2nd", () => {
    const c = winningCombos(fin([[1, 1], [2, 2], [3, 3], [4, 3]]), 3);
    const sets = c.map((s) => [...s].sort().join(","));
    expect(sets.sort()).toEqual(["1,2,3", "1,2,4"]);
  });
  it("dead-heat for 1st → single trio of the three placed", () => {
    const c = winningCombos(fin([[1, 1], [2, 1], [3, 3]]), 3);
    expect(c.length).toBe(1);
    expect([...c[0]!].sort()).toEqual([1, 2, 3]);
  });
});

// ---- trio settle + banker ----
describe("trio settle", () => {
  const res = result({ finishOrder: fin([[10, 1], [4, 2], [3, 3], [12, 4]]), trioDividend: 1653 });
  it("hit: banker in top3, all 3 in pool", () => {
    const sel: BetSelection = { type: "trio", raceLegs: [{ raceNumber: 1, bankers: [10], legs: [4, 3, 12, 7] }] };
    const r = settle(sel, oneRace(res), res);
    expect(r.hit).toBe(true);
    expect(r.payout).toBe(1653);
    expect(r.cost).toBe(cost(sel));
  });
  it("miss: banker out of top3 even though legs cover", () => {
    const sel: BetSelection = { type: "trio", raceLegs: [{ raceNumber: 1, bankers: [7], legs: [10, 4, 3] }] };
    expect(settle(sel, oneRace(res), res).hit).toBe(false);
  });
  it("miss: pool gap (one placer outside)", () => {
    const sel: BetSelection = { type: "trio", raceLegs: [{ raceNumber: 1, bankers: [10], legs: [4, 7, 8] }] };
    expect(settle(sel, oneRace(res), res).hit).toBe(false);
  });
  it("dead-heat 3rd: pool with one of the tied horses still hits", () => {
    const dh = result({ finishOrder: fin([[10, 1], [4, 2], [3, 3], [12, 3]]), trioDividend: 500 });
    const sel: BetSelection = { type: "trio", raceLegs: [{ raceNumber: 1, bankers: [], legs: [10, 4, 3] }] };
    const r = settle(sel, oneRace(dh), dh);
    expect(r.hit).toBe(true);
    expect(r.combosWon).toBe(1);
  });
});

// ---- place field-size rule (IRON) ----
describe("place settle", () => {
  it("3 places paid (big field) → 3rd pays", () => {
    const res = result({ finishOrder: fin([[5, 1], [6, 2], [7, 3]]), placeDividends: [20, 15, 12] });
    const sel: BetSelection = { type: "place", raceLegs: [{ raceNumber: 1, bankers: [], legs: [7] }] };
    const r = settle(sel, oneRace(res), res);
    expect(r.hit).toBe(true);
    expect(r.payout).toBe(12);
  });
  it("only 2 places paid (small field) → 3rd is a MISS", () => {
    const res = result({ finishOrder: fin([[5, 1], [6, 2], [7, 3]]), placeDividends: [20, 15] });
    const sel: BetSelection = { type: "place", raceLegs: [{ raceNumber: 1, bankers: [], legs: [7] }] };
    expect(settle(sel, oneRace(res), res).hit).toBe(false);
  });
});

// ---- missing dividend on a hit (IRON: must not read as $0 loss) ----
describe("missing dividend", () => {
  it("trio hit but no dividend → payout null, net null", () => {
    const res = result({ finishOrder: fin([[10, 1], [4, 2], [3, 3]]) }); // no trioDividend
    const sel: BetSelection = { type: "trio", raceLegs: [{ raceNumber: 1, bankers: [10], legs: [4, 3] }] };
    const r = settle(sel, oneRace(res), res);
    expect(r.hit).toBe(true);
    expect(r.payout).toBeNull();
    expect(r.net).toBeNull();
  });
});

// ---- win / quinella / first4 ----
describe("other pools", () => {
  it("win hit", () => {
    const res = result({ finishOrder: fin([[10, 1], [4, 2]]), winDividend: 153.5 });
    const sel: BetSelection = { type: "win", raceLegs: [{ raceNumber: 1, bankers: [], legs: [10] }] };
    expect(settle(sel, oneRace(res), res).payout).toBe(153.5);
  });
  it("quinella top-2 any order", () => {
    const res = result({ finishOrder: fin([[10, 1], [4, 2], [3, 3]]), quinellaDividend: 637.5 });
    const sel: BetSelection = { type: "quinella", raceLegs: [{ raceNumber: 1, bankers: [], legs: [4, 10, 3] }] };
    const r = settle(sel, oneRace(res), res);
    expect(r.hit).toBe(true);
    expect(r.payout).toBe(637.5);
  });
  it("first4 needs all four", () => {
    const res = result({ finishOrder: fin([[10, 1], [4, 2], [3, 3], [12, 4]]), first4Dividend: 50435 });
    const ok: BetSelection = { type: "first4", raceLegs: [{ raceNumber: 1, bankers: [], legs: [10, 4, 3, 12] }] };
    const miss: BetSelection = { type: "first4", raceLegs: [{ raceNumber: 1, bankers: [], legs: [10, 4, 3, 7] }] };
    expect(settle(ok, oneRace(res), res).hit).toBe(true);
    expect(settle(miss, oneRace(res), res).hit).toBe(false);
  });
});

// ---- double trio (multi-race) ----
describe("double trio", () => {
  const r2 = result({ raceNumber: 2, finishOrder: fin([[12, 1], [1, 2], [2, 3]]) });
  const r3 = result({ raceNumber: 3, finishOrder: fin([[2, 1], [5, 2], [8, 3]]), doubleTrioDividend: 380689 });
  const map = new Map([[2, r2], [3, r3]]);
  it("hit: both legs cover", () => {
    const sel: BetSelection = {
      type: "doubleTrio",
      raceLegs: [
        { raceNumber: 2, bankers: [], legs: [12, 1, 2] },
        { raceNumber: 3, bankers: [], legs: [2, 5, 8] },
      ],
    };
    const r = settle(sel, map, r3);
    expect(r.hit).toBe(true);
    expect(r.payout).toBe(380689);
  });
  it("miss: one leg fails", () => {
    const sel: BetSelection = {
      type: "doubleTrio",
      raceLegs: [
        { raceNumber: 2, bankers: [], legs: [12, 1, 7] },
        { raceNumber: 3, bankers: [], legs: [2, 5, 8] },
      ],
    };
    expect(settle(sel, map, r3).hit).toBe(false);
  });
  it("cost multiplies legs", () => {
    const sel: BetSelection = {
      type: "doubleTrio",
      raceLegs: [
        { raceNumber: 2, bankers: [], legs: [12, 1, 2, 7] }, // C(4,3)=4
        { raceNumber: 3, bankers: [], legs: [2, 5, 8] }, // C(3,3)=1
      ],
    };
    expect(countCombos(sel)).toBe(4);
  });
});

describe("quinella place (any 2 of top 3)", () => {
  const res = result({
    finishOrder: fin([[10, 1], [4, 2], [3, 3], [12, 4]]),
    quinellaPlaceDividends: [50, 80, 70], // 1-2, 1-3, 2-3
  });
  it("box all three placers → 3 winning pairs, payout sums all 3", () => {
    const sel: BetSelection = { type: "qpl", raceLegs: [{ raceNumber: 1, bankers: [], legs: [10, 4, 3] }] };
    const r = settle(sel, oneRace(res), res);
    expect(r.hit).toBe(true);
    expect(r.combosWon).toBe(3);
    expect(r.payout).toBe(200); // 50+80+70
    expect(countCombos(sel)).toBe(3); // C(3,2)
  });
  it("two placers → 1 winning pair", () => {
    const sel: BetSelection = { type: "qpl", raceLegs: [{ raceNumber: 1, bankers: [], legs: [10, 4, 7] }] };
    const r = settle(sel, oneRace(res), res);
    expect(r.hit).toBe(true);
    expect(r.combosWon).toBe(1);
    expect(r.payout).toBe(50); // only the 1-2 pair
  });
  it("one placer → miss", () => {
    const sel: BetSelection = { type: "qpl", raceLegs: [{ raceNumber: 1, bankers: [], legs: [10, 7, 8] }] };
    expect(settle(sel, oneRace(res), res).hit).toBe(false);
  });
});

describe("pool dividend shown even on a miss", () => {
  it("trio miss still reports the pool's trio dividend", () => {
    const res = result({ finishOrder: fin([[10, 1], [4, 2], [3, 3]]), trioDividend: 1653 });
    const sel: BetSelection = { type: "trio", raceLegs: [{ raceNumber: 1, bankers: [7], legs: [1, 2] }] };
    const r = settle(sel, oneRace(res), res);
    expect(r.hit).toBe(false);
    expect(r.poolDividend).toBe(1653);
    expect(r.poolDividendText).toBe("$1,653");
  });
  it("place shows all place dividends as text", () => {
    const res = result({ finishOrder: fin([[5, 1], [6, 2], [7, 3]]), placeDividends: [45.5, 33.5, 18.5] });
    const sel: BetSelection = { type: "place", raceLegs: [{ raceNumber: 1, bankers: [], legs: [99] }] };
    const r = settle(sel, oneRace(res), res);
    expect(r.hit).toBe(false);
    expect(r.poolDividendText).toBe("$45.5 / $33.5 / $18.5");
  });
});

describe("legResults always populated", () => {
  it("double trio returns finish order for BOTH legs on a miss", () => {
    const r2 = result({ raceNumber: 2, finishOrder: fin([[12, 1], [1, 2], [2, 3]]) });
    const r3 = result({ raceNumber: 3, finishOrder: fin([[2, 1], [5, 2], [8, 3]]), doubleTrioDividend: 100 });
    const map = new Map([[2, r2], [3, r3]]);
    const sel: BetSelection = {
      type: "doubleTrio",
      raceLegs: [
        { raceNumber: 2, bankers: [], legs: [12, 1, 7] }, // miss
        { raceNumber: 3, bankers: [], legs: [2, 5, 8] }, // covered
      ],
    };
    const r = settle(sel, map, r3);
    expect(r.hit).toBe(false);
    expect(r.legResults.length).toBe(2);
    expect(r.legResults[0]!.covered).toBe(false);
    expect(r.legResults[1]!.covered).toBe(true);
    expect(r.legResults[0]!.finishers.map((f) => f.horseNumber)).toEqual([12, 1, 2]);
  });
});

describe("coverCount banker", () => {
  it("counts both dead-heat combos when pool holds both tied horses", () => {
    const f = fin([[10, 1], [4, 2], [3, 3], [12, 3]]);
    expect(coverCount([10], [4, 3, 12], f, 3)).toBe(2);
    expect(coverCount([10], [4, 3], f, 3)).toBe(1);
  });
});
