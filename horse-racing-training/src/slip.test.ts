import { describe, it, expect } from "vitest";
import { parseUnit } from "./slip";

describe("parseUnit (QA-01: the typed unit is what's bet, or Add is blocked)", () => {
  it("accepts whole numbers ≥ 10", () => {
    expect(["10", "15", " 20 ", "1000"].map(parseUnit)).toEqual([10, 15, 20, 1000]);
  });
  it("rejects below 10, decimals, blanks and junk", () => {
    expect(["9", "0", "10.5", "10.0", "", "-10", "1e2", "abc", "10x"].map(parseUnit)).toEqual(Array(9).fill(null));
  });
});
