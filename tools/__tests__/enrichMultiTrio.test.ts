import { describe, it, expect } from "vitest";
import { assignMultiTrio, parsePoolRows, type PoolRow } from "../enrich-multi-trio.js";

// 2026-05-27 HV placings: R3/R8 both finish 1,2,3 and R2/R6 both finish 7,8,9.
const TOP3: Record<number, number[]> = {
  1: [9, 11, 10], 2: [7, 8, 9], 3: [3, 1, 2], 4: [5, 11, 9], 5: [2, 6, 5],
  6: [9, 8, 7], 7: [9, 12, 6], 8: [3, 1, 2], 9: [1, 5, 12],
};
const meeting = () =>
  Object.entries(TOP3).map(([rn, horses]) => ({
    raceNumber: Number(rn),
    finishOrder: horses.map((h, i) => ({ horseNumber: h, finishPosition: i + 1 })),
  }));

// Rows as shown on the HKJC results pages for that meeting.
const ROWS: PoolRow[] = [
  { pageRace: 3, label: "1ST DOUBLE TRIO", combos: "7,8,9/1,2,3", dividend: 23844 },
  { pageRace: 5, label: "2ND DOUBLE TRIO", combos: "5,9,11/2,5,6", dividend: 125606 },
  { pageRace: 7, label: "3RD DOUBLE TRIO", combos: "7,8,9/6,12&gt;4,9", dividend: 141285 },
  { pageRace: 7, label: "TRIPLE TRIO", combos: "2,5,6/7,8,9/6,12&gt;4,9", dividend: 1179958 },
  { pageRace: 9, label: "4TH DOUBLE TRIO", combos: "1,2,3/1,5,12", dividend: 542316 },
];

describe("assignMultiTrio", () => {
  it("assigns legs relative to the settling race when top-3 sets repeat in a meeting", () => {
    const races = meeting();
    assignMultiTrio(races, ROWS);
    const dt = Object.fromEntries(races.map((r: any) => [r.raceNumber, [r.doubleTrioDividend, r.doubleTrioLegs]]));
    expect(dt).toEqual({
      1: [undefined, undefined],
      2: [23844, [2, 3]], 3: [23844, [2, 3]],
      4: [125606, [4, 5]], 5: [125606, [4, 5]],
      6: [141285, [6, 7]], 7: [141285, [6, 7]],
      8: [542316, [8, 9]], 9: [542316, [8, 9]],
    });
    const tt = races.filter((r: any) => r.tripleTrioDividend !== undefined);
    expect(tt.map((r: any) => r.raceNumber)).toEqual([5, 6, 7]);
    expect(tt.every((r: any) => r.tripleTrioDividend === 1179958)).toBe(true);
    expect(tt[0].tripleTrioLegs).toEqual([5, 6, 7]);
  });

  it("clears stale DT/TT fields before re-assigning", () => {
    const races: any[] = meeting();
    races[5].doubleTrioDividend = 999; races[5].doubleTrioLegs = [6, 8];
    races[0].tripleTrioDividend = 1; races[0].tripleTrioLegs = [1, 2, 3];
    assignMultiTrio(races, ROWS.slice(0, 1));
    expect(races[5].doubleTrioLegs).toBeUndefined();
    expect(races[0].tripleTrioDividend).toBeUndefined();
    expect(races[1].doubleTrioLegs).toEqual([2, 3]);
  });
});

describe("parsePoolRows", () => {
  it("tags each DT/TT row with the page's race number", () => {
    const html =
      `<tr><td class="fontXi" rowspan="1">3RD DOUBLE TRIO</td><td class="f_fs14">7,8,9/6,12&gt;4,9</td><td class="f_fs14">141,285.00</td></tr>` +
      `<tr><td class="fontXi">TRIPLE TRIO</td><td>2,5,6/7,8,9/6,12&gt;4,9</td><td>1,179,958.00</td></tr>`;
    expect(parsePoolRows(html, 7)).toEqual([
      { pageRace: 7, label: "3RD DOUBLE TRIO", combos: "7,8,9/6,12&gt;4,9", dividend: 141285 },
      { pageRace: 7, label: "TRIPLE TRIO", combos: "2,5,6/7,8,9/6,12&gt;4,9", dividend: 1179958 },
    ]);
  });
});
