// fetch_runs: one row per racecard/results fetch run.
import type { DB } from "../momentum/db";
import type { Trigger } from "./scheduler";

export interface RunRow {
  id: number;
  startedAt: string;
  finishedAt: string | null;
  trigger: Trigger;
  ok: boolean | null;
  summary: unknown;
  error: string | null;
}

export function runLog(db: DB) {
  const now = () => new Date().toISOString();
  return {
    start(trigger: Trigger, at = now()): number {
      return Number(db.prepare(`INSERT INTO fetch_runs (started_at, trigger) VALUES (?, ?)`).run(at, trigger).lastInsertRowid);
    },
    finish(id: number, ok: boolean, summary: unknown, error: string | null = null, at = now()) {
      db.prepare(`UPDATE fetch_runs SET finished_at = ?, ok = ?, summary = ?, error = ? WHERE id = ?`).run(at, ok ? 1 : 0, JSON.stringify(summary ?? null), error, id);
    },
    recent(limit = 10): RunRow[] {
      return (
        db.prepare(`SELECT id, started_at, finished_at, trigger, ok, summary, error FROM fetch_runs ORDER BY id DESC LIMIT ?`).all(limit) as {
          id: number; started_at: string; finished_at: string | null; trigger: Trigger; ok: number | null; summary: string | null; error: string | null;
        }[]
      ).map((r) => ({
        id: r.id,
        startedAt: r.started_at,
        finishedAt: r.finished_at,
        trigger: r.trigger,
        ok: r.ok === null ? null : r.ok === 1,
        summary: r.summary ? JSON.parse(r.summary) : null,
        error: r.error,
      }));
    },
    /** Mark runs left unfinished by a restart/crash as failed ("interrupted"). */
    closeOrphans(at = now()): number {
      return db.prepare(`UPDATE fetch_runs SET finished_at = ?, ok = 0, error = 'interrupted (process stopped mid-run)' WHERE finished_at IS NULL`).run(at).changes;
    },
    lastSuccess(): Date | null {
      const r = db.prepare(`SELECT finished_at FROM fetch_runs WHERE ok = 1 ORDER BY id DESC LIMIT 1`).get() as { finished_at: string } | undefined;
      return r ? new Date(r.finished_at) : null;
    },
  };
}
export type RunLog = ReturnType<typeof runLog>;
