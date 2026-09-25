// SQLite store for pre-race odds snapshots (momentum tracking).
// File: data/momentum.sqlite (override with MOMENTUM_DB; ":memory:" for tests).
import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

export type DB = Database.Database;

// Append-only list; index + 1 = schema version (PRAGMA user_version).
const MIGRATIONS = [
  `
  CREATE TABLE races (
    race_id    TEXT PRIMARY KEY,           -- 2026-09-23-HV-1
    date       TEXT NOT NULL,
    venue      TEXT NOT NULL,
    race_no    INTEGER NOT NULL,
    post_time  TEXT NOT NULL,              -- ISO, +08:00
    status     TEXT NOT NULL DEFAULT 'scheduled', -- scheduled | closed | settled
    hkjc_status TEXT,
    settled_at TEXT
  );
  CREATE TABLE runners (
    race_id  TEXT NOT NULL REFERENCES races(race_id),
    horse_no INTEGER NOT NULL,
    name     TEXT NOT NULL,
    PRIMARY KEY (race_id, horse_no)
  ) WITHOUT ROWID;
  CREATE TABLE snapshots (
    id           INTEGER PRIMARY KEY,
    race_id      TEXT NOT NULL REFERENCES races(race_id),
    fetched_at   TEXT NOT NULL,
    secs_to_post INTEGER NOT NULL,
    win_pool     REAL,
    pla_pool     REAL
  );
  CREATE INDEX ix_snapshots_race ON snapshots(race_id, fetched_at);
  CREATE TABLE ticks (
    snapshot_id INTEGER NOT NULL REFERENCES snapshots(id),
    horse_no    INTEGER NOT NULL,
    win_odds    REAL,
    pla_odds    REAL,
    PRIMARY KEY (snapshot_id, horse_no)
  ) WITHOUT ROWID;
  CREATE TABLE results (
    race_id    TEXT NOT NULL REFERENCES races(race_id),
    horse_no   INTEGER NOT NULL,
    finish_pos INTEGER,                    -- NULL = scratched / did not finish
    sp_win     REAL,
    PRIMARY KEY (race_id, horse_no)
  ) WITHOUT ROWID;
  `,
  // v2: request/response timing. fetched_at = when the query was sent.
  `
  ALTER TABLE snapshots ADD COLUMN responded_at TEXT;     -- when HKJC's response arrived
  ALTER TABLE snapshots ADD COLUMN hkjc_updated_at TEXT;  -- HKJC's own WIN pool lastUpdateTime
  `,
  // v3: official dividends (HK$ per $10)
  `
  CREATE TABLE dividends (
    race_id  TEXT NOT NULL REFERENCES races(race_id),
    pool     TEXT NOT NULL,                -- WIN | PLA | QIN | QPL | TRI
    win_comb TEXT NOT NULL,                -- "1,4,6"
    dividend REAL NOT NULL,
    PRIMARY KEY (race_id, pool, win_comb)
  ) WITHOUT ROWID;
  `,
  // v4: display names in Traditional Chinese (see server/names). Append-only: one row per fetch,
  // the newest row per (kind, code) is current.
  `
  CREATE TABLE entity_names (
    id         INTEGER PRIMARY KEY,
    kind       TEXT NOT NULL CHECK (kind IN ('horse', 'jockey', 'trainer', 'race')),
    code       TEXT NOT NULL,              -- HK_2024_K580 | CJE | EDJ | 2026-09-23-HV-1
    name_en    TEXT,
    name_zh    TEXT,
    source     TEXT NOT NULL,              -- results-page | profile-page | data-file
    fetched_at TEXT NOT NULL               -- ISO-8601 UTC
  );
  CREATE INDEX ix_entity_names_lookup ON entity_names (kind, code, fetched_at DESC);
  ALTER TABLE runners ADD COLUMN name_zh TEXT;  -- GraphQL name_ch
  `,
  // v5: racecards + results, replacing the parent repo's data/racecards and data/historical files.
  // `doc` is the same JSON those files held (see shared/types.ts); keys are indexed columns.
  `
  CREATE TABLE racecards (
    race_id     TEXT PRIMARY KEY,           -- 2026-09-23-HV-1
    date        TEXT NOT NULL,              -- YYYY-MM-DD (HK)
    venue       TEXT NOT NULL CHECK (venue IN ('ST', 'HV')),
    race_no     INTEGER NOT NULL,
    doc         TEXT NOT NULL,              -- { race, winOdds }
    source      TEXT NOT NULL,              -- 'file-import' | 'scrape'
    fetched_at  TEXT NOT NULL,              -- when the source was scraped/read
    updated_at  TEXT NOT NULL               -- when this row last changed
  );
  CREATE UNIQUE INDEX racecards_meeting ON racecards (date, venue, race_no);
  CREATE TABLE meeting_results (
    date        TEXT NOT NULL,
    venue       TEXT NOT NULL CHECK (venue IN ('ST', 'HV')),
    doc         TEXT NOT NULL,              -- RaceResult[] for the meeting
    source      TEXT NOT NULL,
    fetched_at  TEXT NOT NULL,
    updated_at  TEXT NOT NULL,
    PRIMARY KEY (date, venue)
  );
  -- Small named JSON documents (e.g. 'fixtures' = the HKJC fixture list).
  CREATE TABLE data_docs (
    key         TEXT PRIMARY KEY,
    doc         TEXT NOT NULL,
    updated_at  TEXT NOT NULL
  );
  `,
  // v6: one row per racecard/results fetch run (scheduler, startup catch-up or manual CLI).
  `
  CREATE TABLE fetch_runs (
    id           INTEGER PRIMARY KEY,
    started_at   TEXT NOT NULL,
    finished_at  TEXT,
    trigger      TEXT NOT NULL CHECK (trigger IN ('schedule', 'startup', 'manual')),
    ok           INTEGER,                   -- NULL while running
    summary      TEXT,                      -- JSON
    error        TEXT
  );
  CREATE INDEX fetch_runs_started ON fetch_runs (started_at DESC);
  `,
];

export function openDb(file = process.env.MOMENTUM_DB || defaultPath()): DB {
  if (file !== ":memory:") mkdirSync(path.dirname(file), { recursive: true });
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  const version = db.pragma("user_version", { simple: true }) as number;
  for (let v = version; v < MIGRATIONS.length; v++) {
    db.transaction(() => {
      db.exec(MIGRATIONS[v]!);
      db.pragma(`user_version = ${v + 1}`);
    })();
  }
  return db;
}

function defaultPath(): string {
  return fileURLToPath(new URL("../../data/momentum.sqlite", import.meta.url));
}

export const raceId = (date: string, venue: string, raceNo: number) => `${date}-${venue}-${raceNo}`;

export interface RaceRow {
  race_id: string;
  date: string;
  venue: string;
  race_no: number;
  post_time: string;
  status: "scheduled" | "closed" | "settled";
  hkjc_status: string | null;
  settled_at: string | null;
}

export function repo(db: DB) {
  const upsertRace = db.prepare(`
    INSERT INTO races (race_id, date, venue, race_no, post_time, hkjc_status)
    VALUES (@race_id, @date, @venue, @race_no, @post_time, @hkjc_status)
    ON CONFLICT(race_id) DO UPDATE SET post_time = excluded.post_time, hkjc_status = excluded.hkjc_status`);
  const upsertRunner = db.prepare(`
    INSERT INTO runners (race_id, horse_no, name, name_zh) VALUES (?, ?, ?, ?)
    ON CONFLICT DO UPDATE SET name = excluded.name, name_zh = COALESCE(excluded.name_zh, name_zh)`);
  const insSnap = db.prepare(`
    INSERT INTO snapshots (race_id, fetched_at, responded_at, hkjc_updated_at, secs_to_post, win_pool, pla_pool)
    VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const insTick = db.prepare(`INSERT INTO ticks (snapshot_id, horse_no, win_odds, pla_odds) VALUES (?, ?, ?, ?)`);
  const upsertResult = db.prepare(`
    INSERT INTO results (race_id, horse_no, finish_pos, sp_win) VALUES (?, ?, ?, ?)
    ON CONFLICT DO UPDATE SET finish_pos = excluded.finish_pos, sp_win = excluded.sp_win`);

  return {
    upsertRace: (r: Omit<RaceRow, "status" | "settled_at">) => upsertRace.run(r),
    upsertRunners: db.transaction((id: string, rs: { horseNo: number; name: string; nameZh?: string | null }[]) => {
      for (const r of rs) upsertRunner.run(id, r.horseNo, r.name, r.nameZh ?? null);
    }),
    setStatus: (id: string, status: RaceRow["status"]) =>
      db
        .prepare(`UPDATE races SET status = ?, settled_at = CASE WHEN ? = 'settled' THEN ? ELSE settled_at END WHERE race_id = ?`)
        .run(status, status, new Date().toISOString(), id),
    racesOn: (date: string) =>
      db.prepare(`SELECT * FROM races WHERE date = ? ORDER BY race_no`).all(date) as RaceRow[],
    racesWithStatus: (status: RaceRow["status"]) =>
      db.prepare(`SELECT * FROM races WHERE status = ? ORDER BY post_time`).all(status) as RaceRow[],
    settledBetween: (from: string, to: string) =>
      db
        .prepare(`SELECT * FROM races WHERE status = 'settled' AND date BETWEEN ? AND ? ORDER BY date, race_no`)
        .all(from, to) as RaceRow[],
    days: () =>
      db
        .prepare(
          `SELECT r.date, r.venue, COUNT(DISTINCT r.race_id) AS races, COUNT(s.id) AS snapshots
           FROM races r LEFT JOIN snapshots s ON s.race_id = r.race_id
           WHERE substr(r.post_time, 1, 10) = r.date -- post_time is HK-local ISO; skips next-meeting rows filed under a non-race day
           GROUP BY r.date, r.venue ORDER BY r.date DESC`
        )
        .all() as { date: string; venue: string; races: number; snapshots: number }[],
    race: (id: string) => db.prepare(`SELECT * FROM races WHERE race_id = ?`).get(id) as RaceRow | undefined,
    /** Every tracked race that runs on its own date (skips next-meeting rows filed under a non-race day). */
    allRaces: () => db.prepare(`SELECT * FROM races WHERE substr(post_time, 1, 10) = date`).all() as RaceRow[],

    insertSnapshot: db.transaction(
      (
        id: string,
        t: { queriedAt: string; respondedAt: string; hkjcUpdatedAt: string | null },
        secsToPost: number,
        winPool: number | null,
        plaPool: number | null,
        ticks: { horseNo: number; win: number | null; pla: number | null }[]
      ) => {
        const snap = Number(
          insSnap.run(id, t.queriedAt, t.respondedAt, t.hkjcUpdatedAt, secsToPost, winPool, plaPool).lastInsertRowid
        );
        for (const t of ticks) insTick.run(snap, t.horseNo, t.win, t.pla);
        return snap;
      }
    ),
    upsertResults: db.transaction((id: string, rs: { horseNo: number; finishPos: number | null; sp: number | null }[]) => {
      for (const r of rs) upsertResult.run(id, r.horseNo, r.finishPos, r.sp);
    }),

    upsertDividends: db.transaction((id: string, ds: { pool: string; comb: string; div: number }[]) => {
      const up = db.prepare(`INSERT INTO dividends (race_id, pool, win_comb, dividend) VALUES (?, ?, ?, ?)
        ON CONFLICT DO UPDATE SET dividend = excluded.dividend`);
      for (const d of ds) up.run(id, d.pool, d.comb, d.div);
    }),
    dividends: (id: string) =>
      db.prepare(`SELECT pool, win_comb, dividend FROM dividends WHERE race_id = ? ORDER BY pool, win_comb`).all(id) as {
        pool: string;
        win_comb: string;
        dividend: number;
      }[],
    snapshotCount: (id: string) =>
      (db.prepare(`SELECT COUNT(*) AS n FROM snapshots WHERE race_id = ?`).get(id) as { n: number }).n,
    series: (id: string) =>
      db
        .prepare(
          `SELECT s.fetched_at, s.responded_at, s.hkjc_updated_at, s.secs_to_post, s.win_pool, s.pla_pool, t.horse_no, t.win_odds, t.pla_odds
           FROM snapshots s JOIN ticks t ON t.snapshot_id = s.id
           WHERE s.race_id = ? ORDER BY s.fetched_at, t.horse_no`
        )
        .all(id) as {
        fetched_at: string;
        responded_at: string | null;
        hkjc_updated_at: string | null;
        secs_to_post: number;
        win_pool: number | null;
        pla_pool: number | null;
        horse_no: number;
        win_odds: number | null;
        pla_odds: number | null;
      }[],
    runners: (id: string) =>
      db.prepare(`SELECT horse_no, name, name_zh FROM runners WHERE race_id = ? ORDER BY horse_no`).all(id) as {
        horse_no: number;
        name: string;
        name_zh: string | null;
      }[],
    results: (id: string) =>
      db.prepare(`SELECT horse_no, finish_pos, sp_win FROM results WHERE race_id = ?`).all(id) as {
        horse_no: number;
        finish_pos: number | null;
        sp_win: number | null;
      }[],
  };
}

export type Repo = ReturnType<typeof repo>;
