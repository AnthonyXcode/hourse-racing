// Display names (English + Traditional Chinese) for horses, jockeys, trainers and races.
// Append-only: every fetch inserts a row; the newest row per (kind, code) is the current name.
import type { DB } from "../momentum/db";

export const KINDS = ["horse", "jockey", "trainer", "race"] as const;
export type Kind = (typeof KINDS)[number];
export interface NameKey {
  kind: Kind;
  code: string;
}
export interface NameRow extends NameKey {
  nameEn: string | null;
  nameZh: string | null;
  source: string;
  fetchedAt: string;
}
export type NewName = Omit<NameRow, "source" | "fetchedAt">;

export const NAME_TTL_DAYS = Number(process.env.NAME_TTL_DAYS) || 7;
export const keyOf = (k: NameKey) => `${k.kind}:${k.code}`;

export function nameStore(db: DB) {
  const latestStmt = db.prepare(`
    SELECT kind, code, name_en AS nameEn, name_zh AS nameZh, source, fetched_at AS fetchedAt
    FROM entity_names WHERE kind = ? AND code = ?
    ORDER BY fetched_at DESC, id DESC LIMIT 1`);
  // A fetched row may lack English (the zh-HK pages have none): carry the last known English forward
  // so the newest row is always the most complete one.
  const insertStmt = db.prepare(`
    INSERT INTO entity_names (kind, code, name_en, name_zh, source, fetched_at)
    VALUES (@kind, @code,
      COALESCE(@nameEn, (SELECT name_en FROM entity_names WHERE kind = @kind AND code = @code AND name_en IS NOT NULL
                         ORDER BY fetched_at DESC, id DESC LIMIT 1)),
      @nameZh, @source, @fetchedAt)`);
  const hasAny = db.prepare(`SELECT 1 FROM entity_names WHERE kind = ? AND code = ? LIMIT 1`);

  const latest = (keys: NameKey[]): Map<string, NameRow> => {
    const out = new Map<string, NameRow>();
    for (const k of keys) {
      const row = latestStmt.get(k.kind, k.code) as NameRow | undefined;
      if (row) out.set(keyOf(k), row);
    }
    return out;
  };

  return {
    latest,

    /** Insert one row per name (a refresh always adds rows, never updates). */
    insert: db.transaction((rows: NewName[], source: string, at: Date = new Date()) => {
      const fetchedAt = at.toISOString();
      for (const r of rows) insertStmt.run({ kind: r.kind, code: r.code, nameEn: r.nameEn, nameZh: r.nameZh, source, fetchedAt });
    }),

    /** Insert only keys that have no row at all (seeding English from the data files). Returns the count added. */
    seedMissing: db.transaction((rows: NewName[], source: string, at: Date = new Date()) => {
      const fetchedAt = at.toISOString();
      let n = 0;
      for (const r of rows) {
        if (hasAny.get(r.kind, r.code)) continue;
        insertStmt.run({ kind: r.kind, code: r.code, nameEn: r.nameEn, nameZh: r.nameZh, source, fetchedAt });
        n++;
      }
      return n;
    }),

    /** Keys to (re)fetch: no row, no Chinese name yet, or the newest row is older than `ttlDays`. */
    staleOrMissing(keys: NameKey[], now: Date = new Date(), ttlDays = NAME_TTL_DAYS): NameKey[] {
      const cutoff = now.getTime() - ttlDays * 86_400_000;
      const rows = latest(keys);
      return keys.filter((k) => {
        const r = rows.get(keyOf(k));
        return !r || r.nameZh == null || Date.parse(r.fetchedAt) < cutoff;
      });
    },

    /** Keep only the newest `keep` rows per key. */
    prune(keep = 5): number {
      return db
        .prepare(
          `DELETE FROM entity_names WHERE id IN (
             SELECT id FROM (
               SELECT id, ROW_NUMBER() OVER (PARTITION BY kind, code ORDER BY fetched_at DESC, id DESC) AS rn FROM entity_names
             ) WHERE rn > ?)`
        )
        .run(keep).changes;
    },

    /** Per kind: distinct codes, and how many have a Chinese name in any row. */
    coverage(): Record<Kind, { total: number; zh: number }> {
      const out = Object.fromEntries(KINDS.map((k) => [k, { total: 0, zh: 0 }])) as Record<Kind, { total: number; zh: number }>;
      const rows = db
        .prepare(
          `SELECT kind, COUNT(*) AS total, SUM(has_zh) AS zh FROM (
             SELECT kind, code, MAX(name_zh IS NOT NULL) AS has_zh FROM entity_names GROUP BY kind, code
           ) GROUP BY kind`
        )
        .all() as { kind: Kind; total: number; zh: number }[];
      for (const r of rows) out[r.kind] = { total: r.total, zh: r.zh };
      return out;
    },
  };
}

export type NameStore = ReturnType<typeof nameStore>;
