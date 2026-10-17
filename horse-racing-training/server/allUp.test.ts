// All Up settlement (docs/all-up/SPEC.md §6 worked examples, AC-10…AC-27): the exact maths in settleCore, the
// LIVE grade (wait / hold / void / carry-forward), and placement + settlement end to end through the API.
import { describe, it, expect, afterEach } from "vitest";
import { settleAllUp, settleAgainstResults, type AllUpContext } from "./settleCore";
import { gradeLiveBet, type OfficialDividend } from "./credits/grade";
import { liveToHistory } from "./credits/liveBets";
import { parseLegDividends } from "./admin/actions";
import { countCombos } from "../shared/betEngine/index";
import { validateAllUpSelection } from "../shared/validation";
import { DATE, ISO_DATE, T0, harness, runners, type Harness } from "./credits/testHarness";
import type { AllUpFormula, AllUpPool, BetSelection, RaceLeg, RaceResult, RaceStatus } from "../shared/types";

const leg = (raceNumber: number, pool: AllUpPool, legs: number[], bankers: number[] = []): RaceLeg => ({ raceNumber, pool, bankers, legs });
const allUp = (formula: AllUpFormula, ...raceLegs: RaceLeg[]): BetSelection => ({ type: "allUp", formula, raceLegs });
/** Finish order as horse numbers in finishing order (positions 1, 2, 3, …) or explicit [horse, pos] pairs. */
const race = (raceNumber: number, order: (number | [number, number])[], div: Partial<RaceResult> = {}): RaceResult => ({
  raceNumber,
  class: "Class 4",
  distance: 1200,
  finishOrder: order.map((o, i) => {
    const [h, p] = Array.isArray(o) ? o : [o, i + 1];
    return { horseNumber: h, finishPosition: p, horseName: `H${h}`, horseCode: `C${h}`, winOdds: 5 };
  }),
  winDividend: 50,
  ...div,
});
const done = (sel: BetSelection, results: RaceResult[], ctx: Partial<AllUpContext> = {}) => {
  const r = settleAllUp(sel, results, { unit: 10, mode: "practice", ...ctx });
  if (r.kind !== "done") throw new Error(`expected done, got ${r.kind}`);
  return r;
};

// ---- Worked examples (SPEC §6.1) ----
const ex1 = allUp("2x1", leg(1, "win", [3]), leg(2, "win", [7]));
const ex1Results = [race(1, [3, 1, 2, 4], { winDividend: 45.5 }), race(2, [7, 1, 2, 4], { winDividend: 23 })];

const ex2 = allUp("3x7", leg(4, "win", [5]), leg(5, "place", [2, 8]), leg(6, "quinella", [1, 4, 9]));
const ex2Results = [
  race(4, [5, 1, 2, 3], { winDividend: 38 }),
  race(5, [1, 3, 2, 8], { winDividend: 20, placeDividends: [12, 14, 17.5] }),
  race(6, [4, 9, 2, 3], { winDividend: 30, quinellaDividend: 210 }),
];

const ex4 = allUp("2x1", leg(7, "qpl", [2, 5, 11]), leg(8, "trio", [1, 6, 9], [4]));
const ex4Results = [race(7, [2, 11, 5, 1], { quinellaPlaceDividends: [31.5, 28, 40.5] }), race(8, [4, 9, 6, 1], { trioDividend: 356 })];

describe("All Up settlement: worked examples", () => {
  it("Ex 1 / AC-14: WIN → WIN, 104.65 → practice $104.50 (net +94.50), LIVE 104", () => {
    const p = done(ex1, ex1Results);
    expect(p).toMatchObject({ status: "won", payout: 104.5, refund: 0 });
    expect(p.result).toMatchObject({ hit: true, combos: 1, cost: 10, payout: 104.5, net: 94.5, poolDividend: null, poolDividendText: "R1 $45.5 × R2 $23" });
    expect(p.result.allUp!.legs.map((l) => l.factor)).toEqual([4.55, 2.3]);
    expect(done(ex1, ex1Results, { mode: "live" })).toMatchObject({ status: "won", payout: 104 });
    // Variant: #7 finishes 2nd → the only line dies.
    const lost = done(ex1, [ex1Results[0]!, race(2, [1, 7, 2, 4], { winDividend: 23 })]);
    expect(lost).toMatchObject({ status: "lost", payout: 0 });
    expect(lost.result).toMatchObject({ hit: false, net: -10, detailInfo: { code: "allUpMiss", formula: "2x1", race: 2 } });
  });

  it("Ex 2 / AC-15: 3x7 cross pool → $2,894, net +2,664, 7 lines won", () => {
    const r = done(ex2, ex2Results);
    expect(r).toMatchObject({ status: "won", payout: 2894, refund: 0 });
    expect(r.result).toMatchObject({ combos: 23, cost: 230, net: 2664, combosWon: 7, detailInfo: { code: "allUpHit", formula: "3x7", linesWon: 7, lines: 23 } });
    expect(r.result.allUp).toMatchObject({ lines: 23, linesWon: 7, gross: 2894, refund: 0, status: "won" });
    expect(r.result.allUp!.legs.map((l) => [l.combos, l.winningCombos, l.factor, l.status])).toEqual([
      [1, 1, 3.8, "won"],
      [2, 1, 1.75, "won"],
      [3, 1, 21, "won"],
    ]);
    expect(r.result.legResults.map((l) => [l.raceNumber, l.covered])).toEqual([[4, true], [5, true], [6, true]]);
  });

  it("Ex 3 / AC-16: scratching carried forward + void race → payout 64, refund 10, net +4", () => {
    const sel = allUp("3x4", leg(2, "quinella", [1, 3], [6]), leg(3, "win", [4]), leg(5, "place", [7]));
    const results = [race(2, [6, 1, 2, 4], { quinellaDividend: 64 }), race(5, [1, 2, 3, 7], { placeDividends: [11, 12, 13] })];
    const r = done(sel, results, { voidRaces: new Set([3]), scratched: new Map([[2, new Set([3])]]) });
    expect(r).toMatchObject({ status: "won", payout: 64, refund: 10, refundedLines: 1 });
    expect(r.result).toMatchObject({ combos: 7, cost: 70, payout: 64, net: 4 });
    expect(r.result.allUp!.legs.map((l) => [l.factor, l.refundedCombos, l.status, l.dividendText])).toEqual([
      [7.4, 1, "won", "$64"],
      [1, 1, "void", "VOID"],
      [0, 0, "lost", "$11 / $12 / $13"],
    ]);
  });

  it("Ex 4 / AC-17: QPL (3 winning pairs) → TRI banker → $3,560, 3 lines won", () => {
    const r = done(ex4, ex4Results);
    expect(r).toMatchObject({ status: "won", payout: 3560 });
    expect(r.result).toMatchObject({ combos: 9, cost: 90, net: 3470, combosWon: 3 });
    expect(r.result.allUp!.legs.map((l) => [l.factor, l.winningCombos])).toEqual([[10, 3], [35.6, 1]]);
  });

  it("Ex 5 / AC-18: every leg void → void, refund = stake, payout 0", () => {
    const r = done(allUp("2x3", leg(1, "win", [2]), leg(2, "win", [5])), [], { voidRaces: new Set([1, 2]) });
    expect(r).toMatchObject({ status: "void", payout: 0, refund: 30 });
    expect(r.result).toMatchObject({ net: 0, detailInfo: { code: "allUpVoid" } });
  });
});

describe("All Up settlement: acceptance criteria", () => {
  it("AC-19: any losing leg in an Nx1 bet → 0, lost", () => {
    const sel = allUp("3x1", leg(4, "win", [5]), leg(5, "place", [2, 8]), leg(6, "quinella", [1, 2]));
    expect(done(sel, ex2Results)).toMatchObject({ status: "lost", payout: 0 });
  });

  it("QA-06: the miss names the first LOST leg, not a refunded or void one", () => {
    const sel = allUp("2x1", leg(1, "win", [3]), leg(2, "win", [7]));
    const res = [race(1, [1, 2, 4], { winDividend: 20 }), race(2, [1, 7, 2], { winDividend: 23 })];
    expect(done(sel, res, { scratched: new Map([[1, new Set([3])]]) }).result.detailInfo).toEqual({ code: "allUpMiss", formula: "2x1", race: 2 });
    expect(done(sel, [res[1]!], { voidRaces: new Set([1]) }).result.detailInfo).toEqual({ code: "allUpMiss", formula: "2x1", race: 2 });
  });

  it("AC-20: 3x7 with only one leg winning pays that single: $38", () => {
    const sel = allUp("3x7", leg(4, "win", [5]), leg(5, "win", [9]), leg(6, "win", [7]));
    const r = done(sel, ex2Results);
    expect(r).toMatchObject({ status: "won", payout: 38 });
    expect(r.result.allUp!.linesWon).toBe(1);
  });

  it("AC-21: the same result whatever order the legs are submitted in", () => {
    const shuffled = { ...ex2, raceLegs: [ex2.raceLegs[2]!, ex2.raceLegs[0]!, ex2.raceLegs[1]!] };
    const v = validateAllUpSelection(shuffled);
    expect(v.ok && v.value.raceLegs.map((l) => l.raceNumber)).toEqual([4, 5, 6]);
    expect(done(shuffled, ex2Results).payout).toBe(2894); // the maths doesn't depend on order either
  });

  it("AC-22: scales linearly with the unit before rounding (Ex 2 at $15 → $4,341); rounding is per ticket", () => {
    expect(done(ex2, ex2Results, { unit: 15 }).payout).toBe(4341);
    // Ex 1 at $15: 156.975 → $157 (not 104.5 × 1.5 = 156.75); LIVE floors to 156.
    expect(done(ex1, ex1Results, { unit: 15 }).payout).toBe(157);
    expect(done(ex1, ex1Results, { unit: 15, mode: "live" }).payout).toBe(156);
    // An exact quarter rounds up: 10 × 1.05 × 1.5 = 15.75 → $16.
    const q = [race(1, [3, 1, 2], { winDividend: 10.5 }), race(2, [7, 1, 2], { winDividend: 15 })];
    expect(done(ex1, q).payout).toBe(16);
    expect(done(ex1, q, { mode: "live" }).payout).toBe(15);
  });

  it("AC-23: PLA with two placed horses sums both; QPL covering 2 pairs sums those pairs", () => {
    const sel = allUp("2x1", leg(1, "place", [1, 2]), leg(2, "qpl", [2, 5, 9]));
    const results = [race(1, [1, 3, 2, 4], { placeDividends: [11, 15, 22.5] }), race(2, [2, 11, 5, 9], { quinellaPlaceDividends: [31.5, 28, 40.5] })];
    const r = done(sel, results);
    expect(r.result.allUp!.legs.map((l) => [l.dividend, l.factor, l.winningCombos])).toEqual([[33.5, 3.35, 2], [28, 2.8, 1]]);
    // 9 is 4th: only 2-5 covered. 2 × 3 = 6 lines, 10 × 3.35 × 2.8 = 93.8 → $94
    expect(r).toMatchObject({ status: "won", payout: 94 });
  });

  it("AC-24: a scratched QIN banker carries the whole leg forward (factor = n_i), no void", () => {
    const sel = allUp("2x1", leg(1, "quinella", [1, 2], [3]), leg(2, "win", [7]));
    const results = [race(1, [1, 2, 4], { quinellaDividend: 99 }), race(2, [7, 1, 2], { winDividend: 23 })];
    const r = done(sel, results, { scratched: new Map([[1, new Set([3])]]) });
    expect(r.result.allUp!.legs[0]).toMatchObject({ combos: 2, refundedCombos: 2, factor: 2, status: "refund" });
    expect(r).toMatchObject({ status: "won", payout: 46, refund: 0 }); // 10 × 2 × 2.3
    // Withdrawn runners in the stored result count as scratched by default (practice).
    const wd = { ...results[0]!, runners: [{ horseNumber: 3, place: "WV", status: "withdrawn" as const }] };
    expect(done(sel, [wd, results[1]!]).payout).toBe(46);
  });

  it("AC-25: dead heat with no official dividend → practice payout null / LIVE hold; official dividends settle it", () => {
    const sel = allUp("2x1", leg(1, "win", [1]), leg(2, "win", [7]));
    const results = [race(1, [[1, 1], [2, 1], [3, 3]], { winDividend: 30 }), race(2, [7, 1, 2], { winDividend: 23 })];
    const held = settleAllUp(sel, results, { unit: 10, mode: "practice" });
    expect(held).toMatchObject({ kind: "hold", reason: "dead_heat", result: { payout: null, net: null, detailInfo: { code: "allUpHold", races: [1] } } });
    expect(settleAgainstResults(sel, results)).toMatchObject({ payout: null });
    const official = new Map<number, OfficialDividend[]>([[1, [{ pool: "WIN", comb: "1", div: 31 }, { pool: "WIN", comb: "2", div: 29 }]]]);
    expect(done(sel, results, { official })).toMatchObject({ status: "won", payout: 71.5 }); // 10 × 3.1 × 2.3 = 71.3 → 71.5
    // A missed dead-heat leg is simply lost: nothing to hold.
    expect(done(allUp("2x1", leg(1, "win", [3]), leg(2, "win", [7])), results)).toMatchObject({ status: "lost" });
  });

  it("missing dividend for a winning leg → hold missing_dividend", () => {
    const r = settleAllUp(ex1, [race(1, [3, 1, 2]), race(2, [7, 1, 2], { quinellaDividend: 1 })].map((x, i) => (i === 0 ? x : { ...x, winDividend: undefined })), { unit: 10, mode: "live" });
    expect(r).toMatchObject({ kind: "hold", reason: "missing_dividend" });
  });

  it("no stored result for a (non-void) leg → noResult", () => {
    expect(settleAllUp(ex1, [ex1Results[0]!], { unit: 10, mode: "practice" })).toEqual({ kind: "noResult", race: 2 });
    expect(settleAgainstResults(ex1, [ex1Results[0]!])).toBeNull();
  });
});

// ---- LIVE grade (pure) ----
describe("All Up LIVE grade", () => {
  const sel = allUp("3x4", leg(1, "quinella", [1, 3], [6]), leg(2, "win", [4]), leg(3, "place", [7]));
  const bet = { selection: sel, unit: 10, combos: countCombos(sel), stake: countCombos(sel) * 10 };
  const cards = new Map([[1, runners(10)], [2, runners(10)], [3, runners(10)]]);
  const st = (...s: RaceStatus[]) => new Map<number, RaceStatus>(s.map((x, i) => [i + 1, x]));
  const r1 = race(1, [6, 1, 2, 4], { quinellaDividend: 64 });
  const r3 = race(3, [1, 2, 3, 7], { placeDividends: [11, 12, 13] });

  it("AC-26: waits until every leg race is resulted or void, even after a losing leg", () => {
    expect(gradeLiveBet(bet, [r3], cards, st("closed", "closed", "settled"))).toEqual({ kind: "wait" });
    expect(gradeLiveBet(bet, [r1, r3], cards, st("settled", "closed", "settled"))).toEqual({ kind: "wait" });
  });

  it("Ex 3 in LIVE: a void leg and a scratched combo carry forward; settles 64 + refund 10", () => {
    const scratched = new Map(cards).set(1, runners(10, [3]));
    expect(gradeLiveBet(bet, [r1, r3], scratched, st("settled", "void", "settled"))).toMatchObject({ kind: "settle", status: "won", payout: 64, refund: 10, refundedCombos: 1 });
  });

  it("every leg void → void with the full stake refunded and the breakdown kept", () => {
    expect(gradeLiveBet(bet, [], cards, st("void", "void", "void"))).toMatchObject({ kind: "void", refund: 70, reason: "void_race", result: { allUp: { status: "void" } } });
  });

  it("runner of unknown fate → hold; the operator's --settle treats them as runners", () => {
    const res = [r1, race(2, [1, 2, 3], { winDividend: 20 }), r3]; // #4 missing from R2's finish order
    expect(gradeLiveBet(bet, res, cards, st("settled", "settled", "settled"))).toMatchObject({ kind: "hold", reason: "runner_unknown" });
    expect(gradeLiveBet(bet, res, cards, st("settled", "settled", "settled"), undefined, { assumeRunners: true })).toMatchObject({ kind: "settle", status: "lost" });
  });

  it("AC-27: per-leg operator dividends settle a held bet; a single --dividend fills the one held leg", () => {
    const s2 = allUp("2x1", leg(1, "win", [1]), leg(2, "win", [7]));
    const b2 = { selection: s2, unit: 10, combos: 1, stake: 10 };
    const res = [race(1, [[1, 1], [2, 1], [3, 3]], { winDividend: 30 }), race(2, [7, 1, 2], { winDividend: 23 })];
    const s = st("settled", "settled");
    expect(gradeLiveBet(b2, res, cards, s)).toMatchObject({ kind: "hold", reason: "dead_heat" });
    expect(gradeLiveBet(b2, res, cards, s, undefined, { legDividends: new Map([[1, 31]]) })).toMatchObject({ kind: "settle", status: "won", payout: 71 });
    expect(gradeLiveBet(b2, res, cards, s, 31)).toMatchObject({ kind: "settle", payout: 71 });
    expect(parseLegDividends("1:31, 2:23")).toEqual(new Map([[1, 31], [2, 23]]));
    expect(parseLegDividends({ 4: 38 })).toEqual(new Map([[4, 38]]));
    expect(parseLegDividends("4:x")).toBeNull();
  });
});

// ---- End to end: placement + sweep + operator, through the API ----
describe("All Up LIVE end to end", () => {
  let h: Harness | null = null;
  afterEach(() => {
    h?.close();
    h = null;
  });
  const uuid = () => crypto.randomUUID();
  const item = (selection: unknown, unit = 10, extra: object = {}) => ({ date: DATE, venue: "ST", unit, selection, ...extra });
  const place = (u: { cookie: string }, items: unknown[]) => h!.call("POST", "/live-bets", { items }, u.cookie, { "Idempotency-Key": uuid() });
  const ex3 = allUp("3x4", leg(1, "quinella", [1, 3], [6]), leg(2, "win", [4]), leg(3, "place", [7]));

  it("AC-10/11: rejects bad shapes with SPEC codes, closed races and scratched runners; nothing debited", async () => {
    h = await harness();
    const u = await h.member();
    const code = async (sel: unknown) => (await place(u, [item(sel)])).body.error?.code;
    expect(await code(allUp("2x1", leg(1, "win", [1])))).toBe("invalid_selection");
    expect(await code(allUp("6x1", ...[1, 2, 3, 4, 5, 6, 7].map((n) => leg(n, "win", [1]))))).toBe("invalid_selection");
    expect(await code(allUp("2x1", leg(1, "win", [1]), leg(1, "place", [2])))).toBe("all_up_duplicate_race");
    expect(await code(allUp("2x1", leg(1, "win", [1]), { raceNumber: 2, bankers: [], legs: [1] }))).toBe("invalid_selection");
    expect(await code(allUp("2x1", leg(1, "win", [1]), { ...leg(2, "win", [1, 2, 3]), pool: "tierce" as AllUpPool }))).toBe("invalid_selection");
    expect(await code(allUp("4x1", leg(1, "trio", [1, 2, 3]), leg(2, "win", [1]), leg(3, "win", [1]), leg(4, "win", [1])))).toBe("all_up_too_many_legs");
    expect(await code(allUp("3x7", leg(1, "win", [1]), leg(2, "win", [1])))).toBe("all_up_bad_formula");
    h.cards.set(2, runners(10, [4]));
    const scr = await place(u, [item(ex3)]);
    expect(scr.body.error).toMatchObject({ code: "scratched_runner", items: [{ raceNumber: 2, horse: 4 }] });
    h.cards.set(2, runners(10));
    h.setNow(T0 + 60 * 60_000); // R1 post time
    const closed = await place(u, [item(ex3)]);
    expect(closed).toMatchObject({ status: 409, body: { error: { code: "race_closed", items: [{ raceNumber: 1 }] } } });
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(1000);
  });

  it("AC-12/13/16: debits lines × unit once (client combos ignored), one row; Ex 3 settles payout 64 + refund 10", async () => {
    h = await harness();
    const u = await h.member();
    const shuffled = { ...ex3, raceLegs: [ex3.raceLegs[2], ex3.raceLegs[0], ex3.raceLegs[1]] };
    const r = await place(u, [item(shuffled, 10, { combos: 1, cost: 1 })]);
    expect(r.status).toBe(200);
    expect(r.body.bets[0]).toMatchObject({ betType: "allUp", betLabel: "All Up 3x4", combos: 7, stake: 70, status: "pending", picks: "R1 QIN 膽 6  腳 1,3  |  R2 WIN 4  |  R3 PLA 7" });
    expect(r.body.balance).toBe(930);
    const row = h.db.prepare("SELECT bet_type, combos, stake, selection FROM live_bets").get() as { bet_type: string; combos: number; stake: number; selection: string };
    expect(row).toMatchObject({ bet_type: "allUp", combos: 7, stake: 70 });
    expect(JSON.parse(row.selection)).toEqual(ex3); // sorted by race, formula and pools kept

    // After placing: #3 in R1 scratched, R2 declared void, R1/R3 resulted (#7 unplaced in R3).
    h.cards.set(1, runners(10, [3]));
    h.setNow(T0 + 3 * 60 * 60_000);
    h.results.push(race(1, [6, 1, 2, 4], { quinellaDividend: 64 }));
    expect(h.c.settle.sweep()).toMatchObject({ settled: 0, waiting: 1 }); // R2, R3 not in yet (AC-26)
    h.c.schedule.voidRace(ISO_DATE, "ST", 2);
    h.results.push(race(3, [1, 2, 3, 7], { placeDividends: [11, 12, 13] }));
    expect(h.c.settle.sweep()).toMatchObject({ settled: 1 });
    const ledger = h.db.prepare("SELECT kind, amount FROM credit_ledger WHERE kind IN ('bet_payout', 'bet_refund') ORDER BY kind").all();
    expect(ledger).toEqual([{ kind: "bet_payout", amount: 64 }, { kind: "bet_refund", amount: 10 }]);
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(1000 - 70 + 74);

    const bets = (await h.call("GET", "/live-bets", undefined, u.cookie)).body.bets;
    expect(bets[0]).toMatchObject({ status: "won", payout: 64, refund: 10, result: { allUp: { formula: "3x4", linesWon: 1, linesRefunded: 1 } } });
    const hist = liveToHistory(bets[0]);
    expect(hist).toMatchObject({ betLabel: "All Up 3x4", combos: 7, cost: 70, payout: 64, net: 4, refund: 10 });
    expect(hist.allUp).toEqual({
      formula: "3x4",
      lines: 7,
      linesWon: 1,
      refund: 10,
      legs: [
        { raceNumber: 1, pool: "quinella", picks: "膽 6  腳 1,3", result: "6-1-2-4", dividendText: "$64", factor: 7.4, status: "won", carried: 1 },
        { raceNumber: 2, pool: "win", picks: "4", result: null, dividendText: "VOID", factor: 1, status: "void" },
        { raceNumber: 3, pool: "place", picks: "7", result: "1-2-3-7", dividendText: "$11 / $12 / $13", factor: 0, status: "lost" },
      ],
    });
  });

  it("pending bets show every leg as toRun in History", async () => {
    h = await harness();
    const u = await h.member();
    await place(u, [item(allUp("2x1", leg(1, "win", [1]), leg(2, "win", [2])))]);
    const hist = liveToHistory((await h.call("GET", "/live-bets", undefined, u.cookie)).body.bets[0]);
    expect(hist).toMatchObject({ status: "pending", payout: null, allUp: { linesWon: null, legs: [{ status: "toRun", factor: null }, { status: "toRun" }] } });
  });

  it("AC-27: a held All Up bet is resolved with per-leg dividends; --void refunds the stake", async () => {
    h = await harness();
    const u = await h.member();
    await place(u, [item(allUp("2x1", leg(1, "win", [1]), leg(2, "win", [7])), 20)]);
    await place(u, [item(allUp("2x1", leg(1, "win", [1]), leg(3, "win", [5])))]);
    h.setNow(T0 + 3 * 60 * 60_000);
    h.results.push(race(1, [[1, 1], [2, 1], [3, 3]], { winDividend: 30 }), race(2, [7, 1, 2], { winDividend: 23 }), race(3, [5, 1, 2], { winDividend: 40 }));
    expect(h.c.settle.sweep()).toMatchObject({ held: 2 });
    const [a, b] = (h.db.prepare("SELECT id FROM live_bets ORDER BY stake DESC").all() as { id: string }[]).map((x) => x.id);
    expect(h.c.settle.resolve(a!, {}, "op")).toMatchObject({ ok: false, code: "still_held", message: expect.stringContaining("--leg") });
    // 20 × 3.1 × 2.3 = 142.6 → 142
    expect(h.c.settle.resolve(a!, { legDividends: new Map([[1, 31]]) }, "op")).toMatchObject({ ok: true, status: "won", payout: 142, refund: 0 });
    expect(h.c.settle.resolve(b!, { void: true }, "op")).toMatchObject({ ok: true, status: "void", refund: 10 });
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(1000 - 20 - 10 + 142 + 10);
  });
});
