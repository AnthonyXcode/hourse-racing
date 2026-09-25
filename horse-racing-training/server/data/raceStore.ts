// Racecards and meeting results in SQLite (replaces the parent repo's data/racecards and
// data/historical JSON files). Documents keep the on-disk shapes in shared/types.ts.
import type { DB } from "../momentum/db";

export type Venue = "ST" | "HV";
/** A saved racecard document: exactly what data/racecards/racecard_*.json held. */
export interface CardDoc {
  race: { id: string; date: string; raceNumber: number; [k: string]: unknown };
  winOdds?: Record<string, number>;
  [k: string]: unknown;
}
export interface MeetingKey {
  date: string; // YYYY-MM-DD
  venue: Venue;
}

export function raceStore(db: DB) {
  const now = () => new Date().toISOString();
  const upCard = db.prepare(`
    INSERT INTO racecards (race_id, date, venue, race_no, doc, source, fetched_at, updated_at)
    VALUES (@raceId, @date, @venue, @raceNo, @doc, @source, @fetchedAt, @updatedAt)
    ON CONFLICT (race_id) DO UPDATE SET
      doc = excluded.doc, source = excluded.source, fetched_at = excluded.fetched_at, updated_at = excluded.updated_at
    WHERE racecards.doc <> excluded.doc`);
  const upResults = db.prepare(`
    INSERT INTO meeting_results (date, venue, doc, source, fetched_at, updated_at)
    VALUES (@date, @venue, @doc, @source, @fetchedAt, @updatedAt)
    ON CONFLICT (date, venue) DO UPDATE SET
      doc = excluded.doc, source = excluded.source, fetched_at = excluded.fetched_at, updated_at = excluded.updated_at
    WHERE meeting_results.doc <> excluded.doc`);
  const upDoc = db.prepare(`
    INSERT INTO data_docs (key, doc, updated_at) VALUES (?, ?, ?)
    ON CONFLICT (key) DO UPDATE SET doc = excluded.doc, updated_at = excluded.updated_at WHERE data_docs.doc <> excluded.doc`);

  return {
    /** Insert or replace a racecard; returns true when the stored document changed. */
    putCard(key: MeetingKey & { raceNo: number }, doc: CardDoc, source: string, fetchedAt = now()): boolean {
      return (
        upCard.run({ raceId: `${key.date}-${key.venue}-${key.raceNo}`, date: key.date, venue: key.venue, raceNo: key.raceNo, doc: JSON.stringify(doc), source, fetchedAt, updatedAt: now() })
          .changes > 0
      );
    },
    /** Insert or replace a meeting's results; returns true when the stored document changed. */
    putResults(key: MeetingKey, races: unknown[], source: string, fetchedAt = now()): boolean {
      return upResults.run({ date: key.date, venue: key.venue, doc: JSON.stringify(races), source, fetchedAt, updatedAt: now() }).changes > 0;
    },
    putDoc(key: string, doc: unknown): boolean {
      return upDoc.run(key, JSON.stringify(doc), now()).changes > 0;
    },

    /** Every meeting with at least one racecard, newest first. */
    meetings(): (MeetingKey & { races: number[]; hasResults: boolean })[] {
      const rows = db
        .prepare(
          `SELECT c.date, c.venue, group_concat(c.race_no) AS races,
                  EXISTS (SELECT 1 FROM meeting_results r WHERE r.date = c.date AND r.venue = c.venue) AS hasResults
           FROM racecards c GROUP BY c.date, c.venue ORDER BY c.date DESC, c.venue`
        )
        .all() as { date: string; venue: Venue; races: string; hasResults: number }[];
      return rows.map((r) => ({ date: r.date, venue: r.venue, races: r.races.split(",").map(Number).sort((a, b) => a - b), hasResults: !!r.hasResults }));
    },
    card(key: MeetingKey & { raceNo: number }): CardDoc | null {
      const row = db.prepare(`SELECT doc FROM racecards WHERE date = ? AND venue = ? AND race_no = ?`).get(key.date, key.venue, key.raceNo) as { doc: string } | undefined;
      return row ? (JSON.parse(row.doc) as CardDoc) : null;
    },
    cardsInRange(from: string, to: string): { key: MeetingKey & { raceNo: number }; doc: CardDoc; updatedAt: string }[] {
      return (
        db.prepare(`SELECT date, venue, race_no, doc, updated_at FROM racecards WHERE date BETWEEN ? AND ? ORDER BY date, venue, race_no`).all(from, to) as {
          date: string; venue: Venue; race_no: number; doc: string; updated_at: string;
        }[]
      ).map((r) => ({ key: { date: r.date, venue: r.venue, raceNo: r.race_no }, doc: JSON.parse(r.doc) as CardDoc, updatedAt: r.updated_at }));
    },
    results<R = unknown>(key: MeetingKey): R[] | null {
      const row = db.prepare(`SELECT doc FROM meeting_results WHERE date = ? AND venue = ?`).get(key.date, key.venue) as { doc: string } | undefined;
      return row ? (JSON.parse(row.doc) as R[]) : null;
    },
    /** Results meetings (keys only), newest first. */
    resultMeetings(): (MeetingKey & { updatedAt: string })[] {
      return db.prepare(`SELECT date, venue, updated_at AS updatedAt FROM meeting_results ORDER BY date DESC, venue`).all() as (MeetingKey & { updatedAt: string })[];
    },
    doc<T = unknown>(key: string): T | null {
      const row = db.prepare(`SELECT doc FROM data_docs WHERE key = ?`).get(key) as { doc: string } | undefined;
      return row ? (JSON.parse(row.doc) as T) : null;
    },
    /** Changes whenever any card or result row changes — a cheap cache key. */
    version(): string {
      const r = db
        .prepare(`SELECT (SELECT COUNT(*) || ':' || IFNULL(MAX(updated_at), '') FROM racecards) || '|' || (SELECT COUNT(*) || ':' || IFNULL(MAX(updated_at), '') FROM meeting_results) AS v`)
        .get() as { v: string };
      return r.v;
    },
  };
}
export type RaceStore = ReturnType<typeof raceStore>;
