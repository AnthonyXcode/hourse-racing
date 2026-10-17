// Per-member bet history (PRD §2.8, §5.14). Ownership always comes from the session, never the body.
import type { MembersDB } from "./db";
import type { HistoryAllUp, HistoryEntry } from "../../shared/types";
import { BET_TYPES } from "../../shared/betEngine/index";
import { isAllUpFormula, isAllUpPool } from "../../shared/betEngine/allUp";

export const HISTORY_CAP = 1000;
export const ENTRY_MAX_BYTES = 8 * 1024;
export const BATCH_MAX = 20;

const str = (v: unknown, max: number): v is string => typeof v === "string" && v.length <= max;
const num = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const numOrNull = (v: unknown): v is number | null => v === null || num(v);

/** A clean copy of a client-sent HistoryEntry (unknown keys dropped), or null if the shape is wrong. */
export function parseEntry(x: unknown): HistoryEntry | null {
  if (!x || typeof x !== "object") return null;
  const e = x as Record<string, unknown>;
  if (JSON.stringify(e).length > ENTRY_MAX_BYTES) return null;
  if (!str(e.id, 64) || !e.id) return null;
  if (!str(e.ts, 40) || Number.isNaN(Date.parse(e.ts))) return null;
  if (!str(e.date, 8) || !/^\d{8}$/.test(e.date)) return null;
  if (e.venue !== "ST" && e.venue !== "HV") return null;
  if (typeof e.betType !== "string" || !Object.hasOwn(BET_TYPES, e.betType)) return null;
  if (!str(e.betLabel, 60) || !str(e.picks, 2000) || !str(e.result, 500) || !str(e.poolDividendText, 500)) return null;
  if (!num(e.combos) || !num(e.cost) || typeof e.hit !== "boolean" || !numOrNull(e.payout) || !numOrNull(e.net)) return null;
  return {
    id: e.id,
    ts: e.ts,
    date: e.date,
    venue: e.venue,
    betType: e.betType as HistoryEntry["betType"],
    betLabel: e.betLabel,
    picks: e.picks,
    result: e.result,
    combos: e.combos,
    cost: e.cost,
    hit: e.hit,
    payout: e.payout,
    net: e.net,
    poolDividendText: e.poolDividendText,
    ...(e.betType === "allUp" && parseAllUp(e.allUp) ? { allUp: parseAllUp(e.allUp)! } : {}),
  };
}

const LEG_STATUSES = new Set(["won", "lost", "refund", "void", "hold", "toRun"]);
/** A clean copy of a practice All Up breakdown (DESIGN-SPEC §6.2), or null (then the row simply has no expander). */
function parseAllUp(x: unknown): HistoryAllUp | null {
  if (!x || typeof x !== "object") return null;
  const a = x as Record<string, unknown>;
  if (!isAllUpFormula(a.formula) || !num(a.lines) || !numOrNull(a.linesWon) || !num(a.refund) || !Array.isArray(a.legs) || a.legs.length > 6) return null;
  const legs: HistoryAllUp["legs"] = [];
  for (const l of a.legs as unknown[]) {
    const g = (l && typeof l === "object" ? l : {}) as Record<string, unknown>;
    if (!num(g.raceNumber) || !isAllUpPool(g.pool) || !str(g.picks, 300) || typeof g.status !== "string" || !LEG_STATUSES.has(g.status)) return null;
    if (!(g.result === null || str(g.result, 60)) || !(g.dividendText === null || str(g.dividendText, 200)) || !numOrNull(g.factor)) return null;
    if (g.carried !== undefined && !num(g.carried)) return null;
    legs.push({ raceNumber: g.raceNumber, pool: g.pool, picks: g.picks, result: g.result as string | null, dividendText: g.dividendText as string | null, factor: g.factor, status: g.status as HistoryAllUp["legs"][number]["status"], ...(num(g.carried) ? { carried: g.carried } : {}) });
  }
  return { formula: a.formula, lines: a.lines, linesWon: a.linesWon, refund: a.refund, legs };
}

export function historyStore(db: MembersDB, now: () => Date = () => new Date()) {
  const listQ = db.prepare<[string, number], { data: string }>("SELECT data FROM bet_history WHERE user_id = ? ORDER BY ts DESC, id DESC LIMIT ?");
  const ins = db.prepare("INSERT OR IGNORE INTO bet_history (user_id, entry_id, ts, data, created_at) VALUES (?, ?, ?, ?, ?)");
  const trim = db.prepare(
    "DELETE FROM bet_history WHERE user_id = ? AND id NOT IN (SELECT id FROM bet_history WHERE user_id = ? ORDER BY ts DESC, id DESC LIMIT ?)"
  );
  const list = (userId: string): HistoryEntry[] => listQ.all(userId, HISTORY_CAP).map((r) => JSON.parse(r.data) as HistoryEntry);
  return {
    list,
    /** Insert entries (a duplicate id for this user is a no-op), keep the newest 1,000, return the list. */
    add(userId: string, entries: HistoryEntry[]): HistoryEntry[] {
      db.transaction(() => {
        const created = now().toISOString();
        for (const e of entries) ins.run(userId, e.id, e.ts, JSON.stringify(e), created);
        trim.run(userId, userId, HISTORY_CAP);
      })();
      return list(userId);
    },
    remove(userId: string, entryId: string): HistoryEntry[] {
      db.prepare("DELETE FROM bet_history WHERE user_id = ? AND entry_id = ?").run(userId, entryId);
      return list(userId);
    },
    clear(userId: string): void {
      db.prepare("DELETE FROM bet_history WHERE user_id = ?").run(userId);
    },
  };
}
export type HistoryStore = ReturnType<typeof historyStore>;
