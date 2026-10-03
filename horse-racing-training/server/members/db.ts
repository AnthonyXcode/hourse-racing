// Members SQLite store (data/members.sqlite, or MEMBERS_DB). Separate from momentum.sqlite so it can be
// backed up or wiped on its own. Same migration scheme as server/momentum/db.ts (PRAGMA user_version).
import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import path from "path";

export type MembersDB = Database.Database;

const MIGRATIONS: string[] = [
  // v1
  `
  CREATE TABLE users (
    id             TEXT PRIMARY KEY,           -- uuid
    phone_e164     TEXT NOT NULL UNIQUE,
    display_name   TEXT NOT NULL,
    description    TEXT,
    telegram       TEXT,
    whatsapp       TEXT,
    email          TEXT,
    avatar_file    TEXT,
    locale         TEXT NOT NULL DEFAULT 'zh-HK',
    created_at     TEXT NOT NULL,
    updated_at     TEXT NOT NULL,
    last_login_at  TEXT NOT NULL
  );
  CREATE TABLE sessions (
    id            TEXT PRIMARY KEY,
    user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash    TEXT NOT NULL UNIQUE,        -- SHA-256 of the cookie token; the token itself is never stored
    created_at    INTEGER NOT NULL,            -- epoch ms
    last_seen_at  INTEGER NOT NULL,            -- last sliding-expiry move
    expires_at    INTEGER NOT NULL,
    user_agent    TEXT
  );
  CREATE INDEX sessions_user ON sessions (user_id);
  CREATE INDEX sessions_expires ON sessions (expires_at);
  CREATE TABLE bet_history (
    id          INTEGER PRIMARY KEY,
    user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    entry_id    TEXT NOT NULL,                 -- HistoryEntry.id from the client
    ts          TEXT NOT NULL,
    data        TEXT NOT NULL,                 -- JSON HistoryEntry
    created_at  TEXT NOT NULL,
    UNIQUE (user_id, entry_id)
  );
  CREATE INDEX bet_history_user_ts ON bet_history (user_id, ts DESC);
  -- One live challenge per phone. The code itself lives with the provider (Twilio Verify, or the mock's memory).
  CREATE TABLE otp_challenges (
    id          INTEGER PRIMARY KEY,
    phone_e164  TEXT NOT NULL,
    provider    TEXT NOT NULL CHECK (provider IN ('mock', 'twilio')),
    locale      TEXT NOT NULL,
    attempts    INTEGER NOT NULL DEFAULT 0,
    created_at  INTEGER NOT NULL,              -- epoch ms
    expires_at  INTEGER NOT NULL,
    status      TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'dead'))
  );
  CREATE INDEX otp_challenges_phone ON otp_challenges (phone_e164, created_at DESC);
  CREATE TABLE rate_events (
    id          INTEGER PRIMARY KEY,
    kind        TEXT NOT NULL CHECK (kind IN ('send', 'check')),
    phone_e164  TEXT,
    ip          TEXT NOT NULL,
    ts          INTEGER NOT NULL               -- epoch ms
  );
  CREATE INDEX rate_events_phone ON rate_events (kind, phone_e164, ts);
  CREATE INDEX rate_events_ip ON rate_events (kind, ip, ts);
  `,
];

/** Open (creating + migrating) the members DB. Pass ":memory:" in tests. */
export function openMembersDb(file: string): MembersDB {
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

const DAY_MS = 24 * 60 * 60_000;

/** Drop expired sessions and OTP / rate-limit rows older than 24 h (on start + daily). */
export function purgeStale(db: MembersDB, now = Date.now()): void {
  db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(now);
  db.prepare("DELETE FROM otp_challenges WHERE created_at < ?").run(now - DAY_MS);
  db.prepare("DELETE FROM rate_events WHERE ts < ?").run(now - DAY_MS);
}
