import { describe, it, expect, afterEach, vi } from "vitest";
import { hkjcClient } from "./hkjcClient";

const reply = (meetings: unknown[]) =>
  vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify({ data: { raceMeetings: meetings } }), { status: 200 }));
const race = { no: 1, postTime: "2026-09-26T09:55:00+08:00", status: "DECLARED" };

describe("hkjcClient.meeting", () => {
  afterEach(() => vi.restoreAllMocks());

  it("ignores an overseas simulcast HKJC returns for a local venue", async () => {
    reply([{ venueCode: "S1", races: [race] }]); // HKJC ignores venueCode and returns the current meeting
    expect(await hkjcClient.meeting("2026-09-26", "HV")).toEqual([]);
  });

  it("keeps the meeting at the venue asked for", async () => {
    reply([{ venueCode: "ST", races: [race] }]);
    expect(await hkjcClient.meeting("2026-09-27", "ST")).toEqual([{ raceNo: 1, postTime: race.postTime, status: "DECLARED" }]);
    reply([{ venueCode: "ST", races: [race] }]);
    expect(await hkjcClient.meeting("2026-09-27", "HV")).toEqual([]);
  });
});
