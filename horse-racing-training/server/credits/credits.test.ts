import { describe, it, expect, afterEach } from "vitest";
import { readFileSync } from "fs";
import { classifyPlace, parseRunnerRows } from "../data/runners";
import { openMembersDb } from "../members/db";
import { openDb } from "../momentum/db";
import { userStore } from "../members/users";
import { countCombos } from "../../shared/betEngine/index";
import { PLANS } from "../../shared/credits/plans";
import { creditsProductionProblems, creditsWarnings, loadCreditsConfig } from "./config";
import { gradeLiveBet, effectiveSelection } from "./grade";
import { ledger, InsufficientCredits } from "./ledger";
import { raceStatus, scheduleStore, STALE_MS } from "./schedule";
import { reconcile } from "./reconcile";
import { parseAmount, parseArgs, writeGuard } from "./cli";
import { DATE, ISO_DATE, T0, harness, result, runners, trio, type Harness } from "./testHarness";
import type { BetSelection, RaceStatus } from "../../shared/types";

const MIN = 60_000;
let h: Harness | null = null;
afterEach(() => {
  h?.close();
  h = null;
});
const uuid = () => crypto.randomUUID();

// ---------------------------------------------------------------------------------------------------------
describe("ledger", () => {
  function setup() {
    const db = openMembersDb(":memory:");
    const u = userStore(db).login("+85291234567", "en").user;
    return { db, led: ledger(db, () => T0), u };
  }

  it("moves balance and ledger together; never below zero; duplicate keys are no-ops", () => {
    const { db, led, u } = setup();
    db.transaction(() => led.post({ userId: u.id, kind: "admin_adjust", amount: 100, idemKey: "a", actor: "t" }))();
    expect(led.wallet(u.id)!.balance).toBe(100);
    expect(db.transaction(() => led.post({ userId: u.id, kind: "admin_adjust", amount: 100, idemKey: "a", actor: "t" }))()).toBeNull();
    expect(() => db.transaction(() => led.post({ userId: u.id, kind: "bet_stake", amount: -101, idemKey: "b", actor: "t" }))()).toThrow(InsufficientCredits);
    expect(led.wallet(u.id)!.balance).toBe(100);
    // Capped reversal takes what's there.
    const r = db.transaction(() => led.post({ userId: u.id, kind: "purchase_reversal", amount: -150, idemKey: "c", actor: "t", capAtBalance: true }))();
    expect(r).toEqual({ amount: -100, balanceAfter: 0 });
    // The DB itself refuses a negative balance.
    expect(() => db.prepare("UPDATE wallets SET balance = -1 WHERE user_id = ?").run(u.id)).toThrow(/CHECK/);
    expect(reconcile(db)).toEqual([]);
  });

  it("is atomic: a failure later in the transaction leaves no ledger row or balance change", () => {
    const { db, led, u } = setup();
    db.transaction(() => led.post({ userId: u.id, kind: "admin_adjust", amount: 50, idemKey: "seed", actor: "t" }))();
    expect(() =>
      db.transaction(() => {
        led.post({ userId: u.id, kind: "bet_stake", amount: -30, idemKey: "s1", actor: "t" });
        led.post({ userId: u.id, kind: "bet_stake", amount: -30, idemKey: "s2", actor: "t" }); // would go negative
      })()
    ).toThrow(InsufficientCredits);
    expect(led.wallet(u.id)!.balance).toBe(50);
    expect(db.prepare("SELECT COUNT(*) n FROM credit_ledger").get()).toEqual({ n: 1 });
  });

  it("reconcile spots a wallet that disagrees with its ledger", () => {
    const { db, led, u } = setup();
    db.transaction(() => led.post({ userId: u.id, kind: "admin_adjust", amount: 10, idemKey: "x", actor: "t" }))();
    db.prepare("UPDATE wallets SET balance = 999 WHERE user_id = ?").run(u.id);
    expect(reconcile(db)[0]).toMatch(/balance 999 ≠ ledger sum 10/);
  });
});

// ---------------------------------------------------------------------------------------------------------
describe("race schedule and status (server clock)", () => {
  it("opens before post time, closes at post time, and never reopens", () => {
    const db = openDb(":memory:");
    let now = T0;
    const s = scheduleStore(db, () => now);
    s.upsert([{ date: ISO_DATE, venue: "ST", raceNo: 1, postTime: "2026-10-05T13:00:00+08:00" }], "test");
    const st = () => raceStatus(s.get(ISO_DATE, "ST", 1), undefined, now, true);
    expect(st()).toBe("open");
    now = Date.parse("2026-10-05T12:59:59+08:00");
    expect(st()).toBe("open");
    now = Date.parse("2026-10-05T13:00:00+08:00");
    expect(st()).toBe("closed");
    s.closeDue();
    // HKJC moves the post time later: still closed (one-way).
    s.upsert([{ date: ISO_DATE, venue: "ST", raceNo: 1, postTime: "2026-10-05T13:30:00+08:00" }], "test");
    now = Date.parse("2026-10-05T13:05:00+08:00");
    expect(st()).toBe("closed");
    // A stored result settles it.
    expect(raceStatus(s.get(ISO_DATE, "ST", 1), result(1, [[1, 1], [2, 2], [3, 3]]), now, true)).toBe("settled");
  });

  it("an earlier post time applies at once; unknown / stale post times and the kill switch fail closed", () => {
    const db = openDb(":memory:");
    let now = T0;
    const s = scheduleStore(db, () => now);
    s.upsert([{ date: ISO_DATE, venue: "ST", raceNo: 2, postTime: "2026-10-05T14:00:00+08:00" }], "test");
    s.upsert([{ date: ISO_DATE, venue: "ST", raceNo: 2, postTime: "2026-10-05T11:59:00+08:00" }], "test");
    expect(raceStatus(s.get(ISO_DATE, "ST", 2), undefined, now, true)).toBe("closed");
    s.upsert([{ date: ISO_DATE, venue: "ST", raceNo: 3, postTime: null }], "test");
    expect(raceStatus(s.get(ISO_DATE, "ST", 3), undefined, now, true)).toBe("unavailable");
    expect(raceStatus(null, undefined, now, true)).toBe("unavailable");
    s.upsert([{ date: ISO_DATE, venue: "ST", raceNo: 4, postTime: "2026-10-07T14:00:00+08:00" }], "test");
    expect(raceStatus(s.get(ISO_DATE, "ST", 4), undefined, now, false)).toBe("unavailable"); // FUTURE_BETTING=0
    now += STALE_MS + MIN; // nobody refreshed the schedule for a day
    expect(raceStatus(s.get(ISO_DATE, "ST", 4), undefined, now, true)).toBe("unavailable");
    s.upsert([{ date: ISO_DATE, venue: "ST", raceNo: 4, postTime: null, hkjcStatus: "ABANDONED" }], "test");
    expect(raceStatus(s.get(ISO_DATE, "ST", 4), undefined, now, true)).toBe("void");
  });

  it("placement re-checks the clock: a race that reached post time is rejected (race_closed), nothing debited", async () => {
    h = await harness();
    const u = await h.member();
    h.setNow(T0 + 60 * MIN); // R1 post time
    const r = await h.call("POST", "/live-bets", { items: [trio(1, [1, 2, 3]), trio(2, [1, 2, 3])] }, u.cookie, { "Idempotency-Key": uuid() });
    expect(r.status).toBe(409);
    expect(r.body.error).toMatchObject({ code: "race_closed", items: [{ index: 0, code: "race_closed", raceNumber: 1 }] });
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(1000);
  });
});

// ---------------------------------------------------------------------------------------------------------
describe("LIVE placement", () => {
  it("debits server-computed stakes, ignores client combos/cost, and validates every item", async () => {
    h = await harness();
    const u = await h.member();
    const key = uuid();
    const r = await h.call("POST", "/live-bets", { items: [{ ...trio(1, [1, 2, 3, 4]), combos: 1, cost: 1 }] }, u.cookie, { "Idempotency-Key": key });
    expect(r.status).toBe(200);
    expect(r.body.bets[0]).toMatchObject({ combos: 4, stake: 40, status: "pending" });
    expect(r.body.balance).toBe(960);

    const bad = async (item: object, code: string) => {
      const x = await h!.call("POST", "/live-bets", { items: [item] }, u.cookie, { "Idempotency-Key": uuid() });
      expect([x.body.error?.code, x.body.error?.items?.[0]?.code ?? x.body.error?.code]).toEqual([code, code]);
    };
    await bad(trio(1, [1, 2, 3], 9), "unit_too_small");
    await bad(trio(1, [1, 2, 3], 10.5), "unit_too_small");
    await bad(trio(1, [1, 2]), "invalid_selection");
    await bad(trio(1, [1, 2, 99]), "invalid_selection");
    h.cards.set(2, runners(10, [5]));
    await bad(trio(2, [1, 2, 5]), "scratched_runner");
    await bad({ ...trio(1, [1, 2, 3], 10), selection: { type: "doubleTrio", raceLegs: [{ raceNumber: 1, bankers: [], legs: [1, 2, 3] }, { raceNumber: 2, bankers: [], legs: [1, 2, 3] }] } }, "pool_not_designated");
    await bad(trio(1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1000), "stake_too_large");
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(960);
  });

  it("is all-or-nothing: not enough credits for the whole slip places nothing", async () => {
    h = await harness();
    const u = await h.member();
    const items = [trio(1, [1, 2, 3], 400), trio(2, [1, 2, 3], 400), trio(3, [1, 2, 3], 400)];
    const r = await h.call("POST", "/live-bets", { items }, u.cookie, { "Idempotency-Key": uuid() });
    expect(r).toMatchObject({ status: 402, body: { error: { code: "insufficient_credits", balance: 1000, required: 1200 } } });
    expect(h.db.prepare("SELECT COUNT(*) n FROM live_bets").get()).toEqual({ n: 0 });
  });

  it("same Idempotency-Key sent twice at once → one debit, same response; different body → 409", async () => {
    h = await harness();
    const u = await h.member();
    const key = uuid();
    const body = { items: [trio(1, [1, 2, 3], 100)] };
    const [a, b] = await Promise.all([1, 2].map(() => h!.call("POST", "/live-bets", body, u.cookie, { "Idempotency-Key": key })));
    expect(a!.status).toBe(200);
    expect(b).toEqual(a);
    expect(h.db.prepare("SELECT COUNT(*) n FROM live_bets").get()).toEqual({ n: 1 });
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(900);
    const c = await h.call("POST", "/live-bets", { items: [trio(1, [1, 2, 4], 100)] }, u.cookie, { "Idempotency-Key": key });
    expect(c).toMatchObject({ status: 409, body: { error: { code: "idempotency_conflict" } } });
  });

  it("two tabs with balance for one: one succeeds, the other is refused, balance stays ≥ 0", async () => {
    h = await harness();
    const u = await h.member();
    const rs = await Promise.all([1, 2].map(() => h!.call("POST", "/live-bets", { items: [trio(1, [1, 2, 3], 700)] }, u.cookie, { "Idempotency-Key": uuid() })));
    expect(rs.map((r) => r.status).sort()).toEqual([200, 402]);
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(300);
  });

  it("needs the 18+ declaration, a session, a key, and an Origin from us", async () => {
    h = await harness();
    const u = await h.login();
    expect((await h.call("POST", "/live-bets", { items: [trio(1, [1, 2, 3])] }, u.cookie, { "Idempotency-Key": uuid() })).body.error.code).toBe("age_declaration_required");
    await h.call("POST", "/me/declarations", { kind: "adult_18", confirm: true }, u.cookie);
    expect((await h.call("GET", "/me", undefined, u.cookie)).body.user.adultDeclaredAt).toBeTruthy();
    expect((await h.call("POST", "/live-bets", { items: [trio(1, [1, 2, 3])] }, u.cookie)).body.error.code).toBe("idempotency_key_required");
    expect((await h.call("POST", "/live-bets", { items: [trio(1, [1, 2, 3])] }, undefined, { "Idempotency-Key": uuid() })).status).toBe(401);
    expect((await h.call("POST", "/Live-Bets", { items: [trio(1, [1, 2, 3])] }, u.cookie, { "Idempotency-Key": uuid(), Origin: "https://evil.example" })).body.error.code).toBe("bad_origin");
  });
});

// ---------------------------------------------------------------------------------------------------------
describe("payout maths", () => {
  const sel = (type: BetSelection["type"], legs: number[], bankers: number[] = [], race = 1): BetSelection => ({ type, raceLegs: [{ raceNumber: race, bankers, legs }] });
  const st = (s: RaceStatus = "settled") => new Map<number, RaceStatus>([[1, s]]);
  const grade = (s: BetSelection, unit: number, results: ReturnType<typeof result>[], card = runners(10), status = st(), override?: number) => {
    const combos = countCombos(s);
    return gradeLiveBet({ selection: s, unit, combos, stake: combos * unit }, results, new Map([[1, card]]), status, override);
  };

  it("payout = floor(dividend × unit / 10 × combosWon)", () => {
    const res = [result(1, [[3, 1], [5, 2], [7, 3], [1, 4], [2, 5], [4, 6], [6, 7], [8, 8], [9, 9], [10, 10]], { winDividend: 45.5, trioDividend: 233 })];
    expect(grade(sel("win", [3]), 15, res)).toMatchObject({ kind: "settle", status: "won", payout: 68 }); // 45.5 × 1.5 = 68.25
    expect(grade(sel("trio", [3, 5, 7, 9]), 10, res)).toMatchObject({ status: "won", payout: 233, refund: 0 });
    expect(grade(sel("trio", [1, 2, 4]), 10, res)).toMatchObject({ status: "lost", payout: 0 });
  });

  it("scratched leg horse: refunds only its combinations, settles the rest", () => {
    const card = runners(10, [9]);
    const res = [result(1, [[3, 1], [5, 2], [7, 3], [1, 4], [2, 5], [4, 6], [6, 7], [8, 8], [10, 9]], { trioDividend: 233 })];
    // legs 3,5,7,9 → C(4,3)=4 combos; without #9 → 1 combo; refund 3 × 20.
    const g = grade(sel("trio", [3, 5, 7, 9]), 20, res, card);
    expect(g).toMatchObject({ kind: "settle", status: "won", refundedCombos: 3, refund: 60, payout: 466 });
    // A Win bet on the scratched horse alone → full refund.
    expect(grade(sel("win", [9]), 10, res, card)).toMatchObject({ kind: "void", refund: 10, reason: "all_scratched" });
    // Scratched banker → every combination goes.
    expect(grade(sel("trio", [3, 5, 7], [9]), 10, res, card)).toMatchObject({ kind: "void", refund: 30 });
    expect(effectiveSelection(sel("trio", [3, 5, 7], [9]), new Map([[1, new Set([9])]]))).toBeNull();
  });

  // CR-01: only horses POSITIVELY known not to have run are refunded.
  describe("non-runners vs non-finishers", () => {
    const withRunners = (codes: Record<number, string>) => (r: ReturnType<typeof result>) => ({
      ...r,
      runners: [
        ...r.finishOrder.map((f) => ({ horseNumber: f.horseNumber, place: String(f.finishPosition), status: "finished" as const })),
        ...Object.entries(codes).map(([h, place]) => ({ horseNumber: Number(h), place, status: classifyPlace(place) })),
      ],
    });
    const base = () => result(1, [[3, 1], [5, 2], [7, 3], [1, 4]], { winDividend: 45, trioDividend: 233 });

    it("real case 2026-09-16 HV R8: #5 is WV-A on HKJC's page → withdrawn → refunded", () => {
      const html = readFileSync(new URL("../data/__fixtures__/results/2026-09-16-HV-8.html", import.meta.url), "utf8");
      const runnersHv8 = parseRunnerRows(html);
      expect(runnersHv8).toHaveLength(12);
      expect(runnersHv8.find((r) => r.horseNumber === 5)).toEqual({ horseNumber: 5, place: "WV-A", status: "withdrawn" });
      expect(runnersHv8.filter((r) => r.status === "finished")).toHaveLength(11);
      // Stored finish order for that race (the scraper drops #5); card says #5 not scratched.
      const order: [number, number][] = [[12, 1], [3, 2], [4, 3], [9, 4], [2, 5], [6, 6], [1, 7], [11, 8], [7, 9], [10, 10], [8, 11]];
      const stored = result(1, order, { winDividend: 30, placeDividends: [15.5, 36.5, 69.5], trioDividend: 2356 });
      const card = runners(12);
      // Old stored results (no runner list): we don't know → hold, never a silent refund.
      expect(grade(sel("win", [5]), 100, [stored], card)).toMatchObject({ kind: "hold", reason: "runner_unknown" });
      // With the ingest's runner list: withdrawn → full refund.
      expect(grade(sel("win", [5]), 100, [{ ...stored, runners: runnersHv8 }], card)).toMatchObject({ kind: "void", refund: 100, reason: "all_scratched" });
      // Trio 12,3,4,5: #5 withdrawn → its 3 combos refunded, the 12-3-4 combo wins.
      expect(grade(sel("trio", [12, 3, 4, 5]), 10, [{ ...stored, runners: runnersHv8 }], card)).toMatchObject({ kind: "settle", status: "won", refundedCombos: 3, refund: 30, payout: 2356 });
    });

    it("PU / FE / UR / DNF / DISQ are runners: bets on them lose, no refund", () => {
      for (const code of ["PU", "FE", "UR", "DNF", "DISQ"]) {
        const res = [withRunners({ 2: code })(base())];
        expect(grade(sel("win", [2]), 10, res, runners(4)), code).toMatchObject({ kind: "settle", status: "lost", payout: 0, refund: 0 });
        expect(grade(sel("trio", [3, 5, 7, 2]), 10, res, runners(4)), code).toMatchObject({ status: "won", refund: 0, refundedCombos: 0, payout: 233 });
      }
    });

    it("WV / WV-A / WX / WX-A / WXNR are withdrawn: refunded", () => {
      for (const code of ["WV", "WV-A", "WX", "WX-A", "WXNR"]) {
        const res = [withRunners({ 2: code })(base())];
        expect(grade(sel("win", [2]), 10, res, runners(4)), code).toMatchObject({ kind: "void", refund: 10 });
        expect(grade(sel("trio", [3, 5, 7, 2]), 10, res, runners(4)), code).toMatchObject({ status: "won", refundedCombos: 3, refund: 30 });
      }
    });

    it("an unrecognised code or a horse simply missing → held (runner_unknown), not refunded", () => {
      expect(grade(sel("win", [2]), 10, [withRunners({ 2: "TNP" })(base())], runners(4))).toMatchObject({ kind: "hold", reason: "runner_unknown" });
      expect(grade(sel("win", [2]), 10, [base()], runners(4))).toMatchObject({ kind: "hold", reason: "runner_unknown" });
      // A bet not touching the unknown horse settles normally.
      expect(grade(sel("win", [3]), 10, [base()], runners(4))).toMatchObject({ kind: "settle", status: "won", payout: 45 });
      // Operator: "they ran" → settles as a runner (loses).
      const combos = 1;
      expect(gradeLiveBet({ selection: sel("win", [2]), unit: 10, combos, stake: 10 }, [base()], new Map([[1, runners(4)]]), st(), undefined, { assumeRunners: true })).toMatchObject({ kind: "settle", status: "lost", refund: 0 });
    });

    it("classifies HKJC place codes", () => {
      expect(["1", "3 DH", "PU", "FE", "UR", "DNF", "DISQ", "WV", "WV-A", "WX", "WX-A", "WXNR", "TNP", "?"].map(classifyPlace)).toEqual([
        "finished", "finished", "nonFinisher", "nonFinisher", "nonFinisher", "nonFinisher", "nonFinisher",
        "withdrawn", "withdrawn", "withdrawn", "withdrawn", "withdrawn", "unknown", "unknown",
      ]);
    });
  });

  it("dead heat with one stored dividend is held; the operator's dividend settles it", () => {
    // 1, 2, then a dead heat for 3rd between #3 and #4: trio pays on {1,2,3} and {1,2,4}.
    const res = [result(1, [[1, 1], [2, 2], [3, 3], [4, 3], [5, 5]], { trioDividend: 279 })];
    expect(grade(sel("trio", [1, 2, 3, 4]), 10, res, runners(5))).toMatchObject({ kind: "hold", reason: "dead_heat" });
    expect(grade(sel("trio", [1, 2, 3, 4]), 10, res, runners(5), st(), 279 + 301)).toMatchObject({ kind: "settle", status: "won", payout: 580 });
    // A bet that misses is simply lost, no hold.
    expect(grade(sel("trio", [5, 1, 2]), 10, res, runners(5))).toMatchObject({ status: "lost" });
  });

  it("missing dividend → held; void race → full refund; no result → wait", () => {
    const res = [result(1, [[1, 1], [2, 2], [3, 3]], { trioDividend: undefined })];
    expect(grade(sel("trio", [1, 2, 3]), 10, res, runners(3))).toMatchObject({ kind: "hold", reason: "missing_dividend" });
    expect(grade(sel("trio", [1, 2, 3]), 10, [], runners(3), st("void"))).toMatchObject({ kind: "void", refund: 10, reason: "void_race" });
    expect(grade(sel("trio", [1, 2, 3]), 10, [], runners(3), st("closed"))).toEqual({ kind: "wait" });
  });
});

// ---------------------------------------------------------------------------------------------------------
describe("settlement", () => {
  it("pays exactly once, however many sweeps run", async () => {
    h = await harness();
    const u = await h.member();
    await h.call("POST", "/live-bets", { items: [trio(1, [1, 2, 3], 10)] }, u.cookie, { "Idempotency-Key": uuid() });
    h.setNow(T0 + 2 * 60 * MIN);
    expect(h.c.settle.sweep()).toMatchObject({ settled: 0, waiting: 1 }); // no result yet
    h.results.push(result(1, [[1, 1], [2, 2], [3, 3], [4, 4]], { trioDividend: 155.5 }));
    const sweeps = [h.c.settle.sweep(), h.c.settle.sweep(), h.c.settle.sweep()];
    expect(sweeps.map((s) => s.settled)).toEqual([1, 0, 0]);
    expect(h.db.prepare("SELECT COUNT(*) n FROM credit_ledger WHERE kind = 'bet_payout'").get()).toEqual({ n: 1 });
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body).toMatchObject({ balance: 1000 - 10 + 155, unseenSettled: { count: 1, net: 145 } });
    expect(reconcile(h.db)).toEqual([]);
  });

  it("a picked horse missing from the result with no known status is held and alerted, then resolved by the operator", async () => {
    h = await harness();
    const u = await h.member();
    await h.call("POST", "/live-bets", { items: [{ date: DATE, venue: "ST", unit: 10, selection: { type: "win", raceLegs: [{ raceNumber: 1, bankers: [], legs: [9] }] } }] }, u.cookie, { "Idempotency-Key": uuid() });
    h.setNow(T0 + 2 * 60 * MIN);
    h.results.push(result(1, [[1, 1], [2, 2], [3, 3], [4, 4]], { trioDividend: 100 })); // #9 started? unknown
    expect(h.c.settle.sweep()).toMatchObject({ held: 1, settled: 0 });
    expect(h.alerts.some((a) => a.includes("[credits:alert]") && a.includes("runner_unknown"))).toBe(true);
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(990); // no refund
    const id = (h.db.prepare("SELECT id FROM live_bets").get() as { id: string }).id;
    expect(h.c.settle.resolve(id, {}, "op")).toMatchObject({ ok: false });
    expect(h.c.settle.resolve(id, { settle: true }, "op")).toMatchObject({ ok: true, message: expect.stringMatching(/^lost/) });
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(990);
  });

  it("still settles with the kill switch off, and the operator can resolve a held bet", async () => {
    h = await harness();
    const u = await h.member();
    await h.call("POST", "/live-bets", { items: [trio(1, [1, 2, 3, 4], 10)] }, u.cookie, { "Idempotency-Key": uuid() });
    h.cfg.futureBetting = false; // kill switch flipped while the bet is pending
    h.setNow(T0 + 2 * 60 * MIN);
    h.results.push(result(1, [[1, 1], [2, 2], [3, 3], [4, 3]], { trioDividend: 279 }));
    expect(h.c.settle.sweep()).toMatchObject({ held: 1 });
    expect(h.alerts.some((a) => a.includes("[credits:alert]") && a.includes("dead_heat"))).toBe(true);
    const id = (h.db.prepare("SELECT id FROM live_bets").get() as { id: string }).id;
    expect(h.c.settle.resolve(id, { dividend: 600 }, "op").ok).toBe(true);
    expect(h.c.settle.resolve(id, { dividend: 600 }, "op").ok).toBe(false); // exactly once
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(1000 - 40 + 600);
  });
});

// ---------------------------------------------------------------------------------------------------------
describe("history modes", () => {
  it("merges LIVE bets (not deletable) with practice rows", async () => {
    h = await harness();
    const u = await h.member();
    await h.call("POST", "/live-bets", { items: [trio(1, [1, 2, 3])] }, u.cookie, { "Idempotency-Key": uuid() });
    const practice = { id: "p1", ts: "2026-10-01T00:00:00Z", date: "20261001", venue: "ST", betType: "win", betLabel: "Win", picks: "R1 腳 1", result: "1-2-3-4", combos: 1, cost: 10, hit: true, payout: 30, net: 20, poolDividendText: "$30" };
    await h.call("POST", "/history", practice, u.cookie);
    const list = (await h.call("GET", "/history", undefined, u.cookie)).body as { id: string; mode?: string; status?: string; cost: number }[];
    expect(list.map((e) => [e.mode ?? "practice", e.status ?? null])).toEqual([
      ["live", "pending"],
      ["practice", null],
    ]);
    const liveId = list[0]!.id;
    expect((await h.call("DELETE", `/history/${liveId}`, undefined, u.cookie)).body).toHaveLength(2); // no-op for LIVE
    expect((await h.call("DELETE", "/history", undefined, u.cookie)).body.map((e: { mode?: string }) => e.mode)).toEqual(["live"]);
  });
});

// ---------------------------------------------------------------------------------------------------------
describe("Stripe", () => {
  const paidEvent = (id: string, sessionId: string, over: Record<string, unknown> = {}, metaOver: Record<string, string> = {}) => ({
    id,
    object: "event",
    type: "checkout.session.completed",
    data: {
      object: {
        id: sessionId,
        object: "checkout.session",
        payment_status: "paid",
        amount_total: 10000,
        currency: "hkd",
        payment_intent: `pi_${sessionId}`,
        metadata: { ...metaOver },
        ...over,
      },
    },
  });

  async function checkout(planId = "hk100", extra: object = {}) {
    const u = await h!.member();
    const r = await h!.call("POST", "/credits/checkout", { planId, ...extra }, u.cookie);
    return { u, r };
  }

  it("builds Checkout from the server plan table; ignores a client amount; rejects unknown plans", async () => {
    h = await harness();
    const { u, r } = await checkout("hk300", { amount: 1, credits: 999999 });
    expect(r.body.url).toMatch(/^https:\/\/checkout\.stripe\.com\//);
    const p = h.sessions[0]!;
    expect(p.line_items![0]!.price_data).toMatchObject({ currency: "hkd", unit_amount: 30000 });
    expect(p.metadata).toEqual({ user_id: u.user.id, plan_id: "hk300", credits: "4000" });
    expect(p.success_url).toBe("http://localhost:5173/?tab=credits&checkout=success&session_id={CHECKOUT_SESSION_ID}");
    expect((await h.call("POST", "/credits/checkout", { planId: "p999" }, u.cookie)).body.error.code).toBe("invalid_plan");
    expect(PLANS.map((x) => [x.id, x.priceHkd, x.credits])).toEqual([["hk10", 10, 100], ["hk100", 100, 1200], ["hk300", 300, 4000]]);
  });

  it("webhook: valid signature credits once; bad signature 400; replay and resend are no-ops; foreign Origin is fine", async () => {
    h = await harness();
    const { u } = await checkout("hk100");
    const meta = { user_id: u.user.id, plan_id: "hk100", credits: "1200" };
    expect((await h.signedWebhook(paidEvent("evt_1", "cs_test_1", {}, meta), { badSig: true })).status).toBe(400);
    expect((await h.signedWebhook(paidEvent("evt_1", "cs_test_1", {}, meta), { secret: "whsec_wrong" })).status).toBe(400);
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(1000);
    const ok = await h.signedWebhook(paidEvent("evt_1", "cs_test_1", {}, meta), { headers: { Origin: "https://evil.example" } });
    expect(ok).toEqual({ status: 200, body: { received: true } });
    await h.signedWebhook(paidEvent("evt_1", "cs_test_1", {}, meta)); // same event replayed
    await h.signedWebhook(paidEvent("evt_2", "cs_test_1", {}, meta)); // a second event for the same session
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(2200);
    expect((await h.call("GET", "/credits/purchases/cs_test_1", undefined, u.cookie)).body).toEqual({ status: "paid", credits: 1200, balance: 2200 });
    expect(reconcile(h.db)).toEqual([]);
  });

  it("webhook: amount / currency / metadata mismatch or an unknown session → no credit, alert, still 200", async () => {
    h = await harness();
    const { u } = await checkout("hk100");
    const meta = { user_id: u.user.id, plan_id: "hk100", credits: "1200" };
    expect((await h.signedWebhook(paidEvent("evt_a", "cs_test_1", { amount_total: 100 }, meta))).status).toBe(200);
    await h.signedWebhook(paidEvent("evt_b", "cs_test_1", { currency: "usd" }, meta));
    await h.signedWebhook(paidEvent("evt_c", "cs_test_1", {}, { ...meta, credits: "99999" }));
    await h.signedWebhook(paidEvent("evt_d", "cs_unknown", {}, meta));
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(1000);
    expect(h.alerts.filter((a) => a.includes("[credits:alert]")).length).toBe(4);
  });

  it("refund after credits were spent: debit capped at the balance and the account is flagged", async () => {
    h = await harness();
    const { u } = await checkout("hk100");
    await h.signedWebhook(paidEvent("evt_1", "cs_test_1", {}, { user_id: u.user.id, plan_id: "hk100", credits: "1200" }));
    await h.call("POST", "/live-bets", { items: [trio(1, [1, 2, 3], 2000)] }, u.cookie, { "Idempotency-Key": uuid() }); // balance 2200 → 200
    const refunded = { id: "evt_r", object: "event", type: "charge.refunded", data: { object: { id: "ch_1", object: "charge", amount: 10000, amount_refunded: 10000, payment_intent: "pi_cs_test_1" } } };
    expect((await h.signedWebhook(refunded)).status).toBe(200);
    const s = (await h.call("GET", "/credits", undefined, u.cookie)).body;
    expect(s).toMatchObject({ balance: 0, flagged: true });
    expect((await h.call("POST", "/credits/checkout", { planId: "hk10" }, u.cookie)).body.error.code).toBe("account_flagged");
    expect((await h.call("POST", "/live-bets", { items: [trio(2, [1, 2, 3])] }, u.cookie, { "Idempotency-Key": uuid() })).body.error.code).toBe("account_flagged");
  });

  it("daily cap: HK$1,000 per HK day including open sessions; resets at HK midnight", async () => {
    h = await harness();
    const u = await h.member();
    for (let i = 0; i < 3; i++) expect((await h.call("POST", "/credits/checkout", { planId: "hk300" }, u.cookie)).status).toBe(200);
    const r = await h.call("POST", "/credits/checkout", { planId: "hk300" }, u.cookie);
    expect(r).toMatchObject({ status: 429, body: { error: { code: "daily_cap_reached", remainingHkd: 100 } } });
    expect((await h.call("POST", "/credits/checkout", { planId: "hk100" }, u.cookie)).status).toBe(200);
    h.setNow(Date.parse("2026-10-06T00:00:01+08:00"));
    expect((await h.call("POST", "/credits/checkout", { planId: "hk300" }, u.cookie)).status).toBe(200);
  });

  it("daily cap holds under parallel checkout requests (reserved before Stripe is called)", async () => {
    h = await harness();
    const u = await h.member();
    // The harness's fake Stripe takes 30 ms per call, so all six requests are in flight together.
    const rs = await Promise.all(Array.from({ length: 6 }, () => h!.call("POST", "/credits/checkout", { planId: "hk300" }, u.cookie)));
    expect(rs.filter((r) => r.status === 200)).toHaveLength(3);
    expect(rs.filter((r) => r.body?.error?.code === "daily_cap_reached")).toHaveLength(3);
    expect(h.c.purchases.spentToday(u.user.id)).toBe(900);
    expect(h.db.prepare("SELECT COUNT(*) n FROM purchases WHERE stripe_session_id LIKE 'pending:%'").get()).toEqual({ n: 0 }); // all bound to sessions
  });

  it("a failed Stripe call releases the reservation; stale open reservations stop counting", async () => {
    h = await harness();
    const u = await h.member();
    h.failStripe(true);
    expect((await h.call("POST", "/credits/checkout", { planId: "hk300" }, u.cookie)).body.error.code).toBe("payment_unavailable");
    expect(h.c.purchases.spentToday(u.user.id)).toBe(0);
    h.failStripe(false);
    for (let i = 0; i < 3; i++) await h.call("POST", "/credits/checkout", { planId: "hk300" }, u.cookie);
    expect(h.c.purchases.spentToday(u.user.id)).toBe(900);
    h.setNow(T0 + 32 * MIN); // the open sessions have expired (never paid)
    expect(h.c.purchases.spentToday(u.user.id)).toBe(0);
  });

  it("without a Stripe key, checkout says so (503 stripe_unconfigured)", async () => {
    h = await harness({ NO_STRIPE: "1" });
    const u = await h.member();
    expect((await h.call("POST", "/credits/checkout", { planId: "hk10" }, u.cookie)).body.error.code).toBe("stripe_unconfigured");
  });
});

// ---------------------------------------------------------------------------------------------------------
describe("kill switch (FUTURE_BETTING=0)", () => {
  it("blocks LIVE bets, plans and checkout; races are unavailable; the bonus is still granted", async () => {
    h = await harness({ FUTURE_BETTING: "0" });
    const u = await h.member();
    expect((await h.call("POST", "/live-bets", { items: [trio(1, [1, 2, 3])] }, u.cookie, { "Idempotency-Key": uuid() })).body.error.code).toBe("feature_disabled");
    expect((await h.call("POST", "/credits/checkout", { planId: "hk10" }, u.cookie)).body.error.code).toBe("feature_disabled");
    expect((await h.call("GET", "/credits/plans")).status).toBe(503);
    expect((await h.call("GET", "/config")).body.features).toEqual({ liveBetting: false, purchases: false });
    expect(h.c.meetingInfo(DATE, "ST")!.status.raceInfo.map((r) => r.status)).toEqual(["unavailable", "unavailable", "unavailable"]);
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(1000);
  });
});

// ---------------------------------------------------------------------------------------------------------
describe("signup bonus", () => {
  it("once per phone number, ever (not again after deleting the account); welcome shown once", async () => {
    h = await harness();
    const a = await h.login("+85291112222");
    expect(a.isNew).toBe(true);
    let s = (await h.call("GET", "/credits", undefined, a.cookie)).body;
    expect(s).toMatchObject({ balance: 1000, welcome: true });
    expect(s.ledger.map((r: { kind: string }) => r.kind)).toEqual(["signup_bonus"]);
    await h.call("POST", "/credits/seen", { kind: "welcome" }, a.cookie);
    await h.call("GET", "/me", undefined, a.cookie); // lazy path: no second bonus
    s = (await h.call("GET", "/credits", undefined, a.cookie)).body;
    expect(s).toMatchObject({ balance: 1000, welcome: false });

    expect((await h.call("DELETE", "/me", { confirm: "DELETE" }, a.cookie)).body).toEqual({ ok: true });
    // Ledger rows are anonymised, not deleted.
    expect(h.db.prepare("SELECT user_id FROM credit_ledger").all()).toEqual([{ user_id: expect.stringMatching(/^deleted:/) }]);
    const again = await h.login("+85291112222");
    expect(again.isNew).toBe(true);
    expect((await h.call("GET", "/credits", undefined, again.cookie)).body).toMatchObject({ balance: 0, welcome: false });
  });

  it("existing members (created before credits) get it on their first authenticated request", async () => {
    h = await harness();
    const old = userStore(h.db).login("+85293334444", "en").user; // no hooks ran: like a pre-release member
    expect(h.db.prepare("SELECT COUNT(*) n FROM wallets WHERE user_id = ?").get(old.id)).toEqual({ n: 0 });
    const u = await h.login("+85293334444");
    expect(u.isNew).toBe(false);
    await h.call("GET", "/me", undefined, u.cookie);
    await h.call("GET", "/me", undefined, u.cookie);
    expect((await h.call("GET", "/credits", undefined, u.cookie)).body.balance).toBe(1000);
  });

  it("account deletion voids pending LIVE bets without refund", async () => {
    h = await harness();
    const u = await h.member();
    await h.call("POST", "/live-bets", { items: [trio(1, [1, 2, 3], 100)] }, u.cookie, { "Idempotency-Key": uuid() });
    await h.call("DELETE", "/me", { confirm: "DELETE" }, u.cookie);
    expect(h.db.prepare("SELECT COUNT(*) n FROM live_bets").get()).toEqual({ n: 0 });
    expect(h.db.prepare("SELECT SUM(amount) s FROM credit_ledger").get()).toEqual({ s: 900 }); // no refund row
  });
});

// ---------------------------------------------------------------------------------------------------------
describe("config guards and CLI", () => {
  it("refuses a live Stripe key without approval, and FUTURE_BETTING in production without Stripe secrets", () => {
    const prob = (env: Record<string, string>) => creditsProductionProblems(loadCreditsConfig(env), env);
    expect(prob({ STRIPE_SECRET_KEY: "sk_live_x" }).join()).toMatch(/STRIPE_LIVE_APPROVED/);
    expect(prob({ STRIPE_SECRET_KEY: "sk_live_x", STRIPE_LIVE_APPROVED: "1" })).toEqual([]);
    const prodOk = { NODE_ENV: "production", CREDITS_PEPPER: "s3cret", FUTURE_BETTING: "1", STRIPE_SECRET_KEY: "sk_test_x", STRIPE_WEBHOOK_SECRET: "whsec_x" };
    expect(prob(prodOk)).toEqual([]);
    expect(prob({ ...prodOk, STRIPE_WEBHOOK_SECRET: "" }).join()).toMatch(/STRIPE_WEBHOOK_SECRET/);
    expect(prob({ ...prodOk, CREDITS_PEPPER: "" }).join()).toMatch(/CREDITS_PEPPER/);
    expect(prob({ ...prodOk, DEV_NOW: "2026-10-04T12:00:00+08:00" }).join()).toMatch(/DEV_NOW/);
    expect(creditsWarnings(loadCreditsConfig(prodOk)).join()).toMatch(/TEST mode/);
    expect(creditsWarnings(loadCreditsConfig({ FUTURE_BETTING: "1" })).join()).toMatch(/DATA_FETCH/);
  });

  it("CLI writes need --operator, --reason and --yes", () => {
    expect(writeGuard(parseArgs(["adjust", "--user", "u", "--amount", "5"]))).toMatch(/operator/);
    expect(writeGuard(parseArgs(["adjust", "--operator", "a", "--amount", "5"]))).toMatch(/reason/);
    // Reason: same 10–200 rule as the panel (shared validator), with a clear message.
    expect(writeGuard(parseArgs(["adjust", "--operator", "a", "--reason", "x", "--yes"]))).toBe("--reason must be 10–200 characters (yours has 1)");
    expect(writeGuard(parseArgs(["adjust", "--operator", "a", "--reason", "y".repeat(201), "--yes"]))).toMatch(/10–200 characters \(yours has 201\)/);
    expect(writeGuard(parseArgs(["adjust", "--operator", "a", "--reason", "goodwill top-up"]))).toMatch(/yes/);
    expect(writeGuard(parseArgs(["adjust", "--operator", "a", "--reason", "goodwill top-up", "--yes", "--amount", "-5"]))).toBeNull();
    expect(parseArgs(["adjust", "--amount", "-5"]).opt.amount).toBe("-5");
    expect(parseArgs(["void-meeting", "2026-10-04", "ST", "--include-resulted", "--yes"]).opt).toEqual({ "include-resulted": true, yes: true });
  });

  it("CLI --amount accepts only a plain whole number", () => {
    expect(["500", "-200", "+5"].map(parseAmount)).toEqual([500, -200, 5]);
    for (const bad of ["1e3", "1.5", "0x10", "", "0", "abc", "1,000", "9999999999"]) expect(parseAmount(bad), bad).toBeNull();
    expect(parseAmount(true)).toBeNull();
  });
});
