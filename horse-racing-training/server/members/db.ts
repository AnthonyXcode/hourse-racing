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
  // v2: credits, LIVE bets and Stripe purchases (docs/credits/PRD.md §6.1). user_id columns on the ledger,
  // purchases and audit have no FK on purpose: on account deletion they are anonymised, not deleted.
  `
  CREATE TABLE wallets (
    user_id           TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    balance           INTEGER NOT NULL DEFAULT 0 CHECK (balance >= 0),
    flagged           INTEGER NOT NULL DEFAULT 0,
    flag_reason       TEXT,
    welcome_pending   INTEGER NOT NULL DEFAULT 0,  -- show the bonus dialog once
    settled_seen_at   TEXT,                        -- LIVE bets settled after this are "new"
    updated_at        TEXT NOT NULL
  );
  CREATE TABLE credit_ledger (
    id             INTEGER PRIMARY KEY,
    user_id        TEXT NOT NULL,
    kind           TEXT NOT NULL CHECK (kind IN ('signup_bonus','purchase','bet_stake','bet_payout','bet_refund','purchase_reversal','admin_adjust')),
    amount         INTEGER NOT NULL,
    balance_after  INTEGER NOT NULL CHECK (balance_after >= 0),
    ref_type       TEXT,
    ref_id         TEXT,
    idem_key       TEXT NOT NULL UNIQUE,
    actor          TEXT NOT NULL,
    note           TEXT,
    created_at     TEXT NOT NULL
  );
  CREATE INDEX credit_ledger_user ON credit_ledger (user_id, id DESC);
  CREATE TABLE live_bets (
    id               TEXT PRIMARY KEY,
    user_id          TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    slip_key         TEXT NOT NULL,
    date             TEXT NOT NULL,              -- YYYYMMDD
    venue            TEXT NOT NULL,
    bet_type         TEXT NOT NULL,
    selection        TEXT NOT NULL,              -- JSON BetSelection
    race_ids         TEXT NOT NULL,              -- JSON number[] (race numbers)
    first_post_time  TEXT,
    unit             INTEGER NOT NULL,
    combos           INTEGER NOT NULL,
    stake            INTEGER NOT NULL,
    status           TEXT NOT NULL CHECK (status IN ('pending','won','lost','void')),
    refunded_combos  INTEGER NOT NULL DEFAULT 0,
    refund           INTEGER NOT NULL DEFAULT 0,
    payout           INTEGER NOT NULL DEFAULT 0,
    result           TEXT,                       -- JSON SettleResult
    hold_reason      TEXT,
    held_since       TEXT,
    settle_attempts  INTEGER NOT NULL DEFAULT 0,
    created_at       TEXT NOT NULL,
    settled_at       TEXT
  );
  CREATE INDEX live_bets_status ON live_bets (status, date, venue);
  CREATE INDEX live_bets_user ON live_bets (user_id, created_at DESC);
  CREATE TABLE idempotency_keys (
    key         TEXT NOT NULL,
    user_id     TEXT NOT NULL,
    body_hash   TEXT NOT NULL,
    status      INTEGER NOT NULL,
    response    TEXT NOT NULL,
    created_at  INTEGER NOT NULL,
    PRIMARY KEY (key, user_id)
  );
  CREATE TABLE purchases (
    stripe_session_id  TEXT PRIMARY KEY,
    user_id            TEXT NOT NULL,
    plan_id            TEXT NOT NULL,
    amount_hkd         INTEGER NOT NULL,
    credits            INTEGER NOT NULL,
    status             TEXT NOT NULL CHECK (status IN ('open','paid','expired','refunded','disputed')),
    payment_intent_id  TEXT,
    reversed_credits   INTEGER NOT NULL DEFAULT 0,
    created_at         INTEGER NOT NULL,         -- epoch ms (daily cap window)
    paid_at            INTEGER
  );
  CREATE INDEX purchases_user ON purchases (user_id, created_at);
  CREATE INDEX purchases_pi ON purchases (payment_intent_id);
  CREATE TABLE stripe_events (
    event_id      TEXT PRIMARY KEY,
    type          TEXT NOT NULL,
    received_at   TEXT NOT NULL,
    processed_at  TEXT
  );
  CREATE TABLE declarations (
    user_id        TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    kind           TEXT NOT NULL CHECK (kind IN ('adult_18')),
    terms_version  TEXT NOT NULL,
    declared_at    TEXT NOT NULL,
    ip             TEXT,
    PRIMARY KEY (user_id, kind)
  );
  CREATE TABLE bonus_claims (
    phone_hash  TEXT PRIMARY KEY,                -- HMAC-SHA256(phone, CREDITS_PEPPER)
    claimed_at  TEXT NOT NULL
  );
  CREATE TABLE admin_audit (
    id          INTEGER PRIMARY KEY,
    operator    TEXT NOT NULL,
    command     TEXT NOT NULL,
    args        TEXT NOT NULL,
    before      TEXT,
    after       TEXT,
    reason      TEXT NOT NULL,
    created_at  TEXT NOT NULL
  );
  `,
  // v3: admin panel (docs/admin/PRD.md §6). Roles (owner is never stored: it comes from OWNER_PHONE), admin
  // session state on the existing session row, an append-only audit log shared by the panel and the CLI,
  // an access log (kept 12 months), system alerts and job status.
  `
  ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'));
  ALTER TABLE users ADD COLUMN role_updated_at TEXT;
  ALTER TABLE users ADD COLUMN role_updated_by TEXT;
  ALTER TABLE sessions ADD COLUMN admin_verified_at INTEGER;
  ALTER TABLE sessions ADD COLUMN admin_seen_at INTEGER;
  ALTER TABLE sessions ADD COLUMN step_up_at INTEGER;
  ALTER TABLE admin_audit ADD COLUMN source TEXT NOT NULL DEFAULT 'cli' CHECK (source IN ('panel', 'cli', 'system'));
  ALTER TABLE admin_audit ADD COLUMN actor_user_id TEXT;
  ALTER TABLE admin_audit ADD COLUMN actor_role TEXT;
  ALTER TABLE admin_audit ADD COLUMN action TEXT;
  ALTER TABLE admin_audit ADD COLUMN target_type TEXT;
  ALTER TABLE admin_audit ADD COLUMN target_id TEXT;
  ALTER TABLE admin_audit ADD COLUMN ip TEXT;
  ALTER TABLE admin_audit ADD COLUMN user_agent TEXT;
  ALTER TABLE admin_audit ADD COLUMN idem_key TEXT;
  ALTER TABLE admin_audit ADD COLUMN outcome TEXT NOT NULL DEFAULT 'ok' CHECK (outcome IN ('ok', 'refused'));
  ALTER TABLE admin_audit ADD COLUMN self INTEGER NOT NULL DEFAULT 0;
  UPDATE admin_audit SET action = command, actor_role = 'operator' WHERE action IS NULL;
  CREATE UNIQUE INDEX admin_audit_idem ON admin_audit (idem_key) WHERE idem_key IS NOT NULL;
  CREATE INDEX admin_audit_created ON admin_audit (created_at);
  CREATE INDEX admin_audit_target ON admin_audit (target_type, target_id);
  CREATE TRIGGER admin_audit_no_update BEFORE UPDATE ON admin_audit BEGIN SELECT RAISE(ABORT, 'admin_audit is append-only'); END;
  CREATE TRIGGER admin_audit_no_delete BEFORE DELETE ON admin_audit BEGIN SELECT RAISE(ABORT, 'admin_audit is append-only'); END;

  CREATE TABLE admin_access_log (
    id             INTEGER PRIMARY KEY,
    actor_user_id  TEXT NOT NULL,
    actor_role     TEXT NOT NULL,
    kind           TEXT NOT NULL CHECK (kind IN ('user_detail', 'user_tab', 'export', 'search_full_phone', 'contact_reveal')),
    target_id      TEXT,
    detail         TEXT,                      -- tab name / dataset + filters; never PII values
    ip             TEXT,
    created_at     TEXT NOT NULL              -- ISO
  );
  CREATE INDEX admin_access_target ON admin_access_log (target_id, created_at);
  CREATE INDEX admin_access_created ON admin_access_log (created_at);
  CREATE TRIGGER admin_access_no_update BEFORE UPDATE ON admin_access_log BEGIN SELECT RAISE(ABORT, 'admin_access_log is append-only'); END;
  -- Only the retention purge may delete, and only rows older than 365 days.
  CREATE TRIGGER admin_access_no_delete BEFORE DELETE ON admin_access_log
    WHEN OLD.created_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-365 days')
    BEGIN SELECT RAISE(ABORT, 'admin_access_log rows are kept 12 months'); END;

  CREATE TABLE system_alerts (
    key            TEXT PRIMARY KEY,
    kind           TEXT NOT NULL,
    message        TEXT NOT NULL,
    ref_type       TEXT,
    ref_id         TEXT,
    first_seen_at  TEXT NOT NULL,
    last_seen_at   TEXT NOT NULL,
    resolved_at    TEXT
  );
  CREATE TABLE system_status (
    key         TEXT PRIMARY KEY,
    value       TEXT NOT NULL,
    updated_at  TEXT NOT NULL
  );
  CREATE INDEX users_role ON users (role);
  CREATE INDEX users_name ON users (display_name);
  CREATE INDEX credit_ledger_kind ON credit_ledger (kind, created_at);
  CREATE INDEX credit_ledger_created ON credit_ledger (created_at);
  CREATE INDEX live_bets_created ON live_bets (created_at);
  CREATE INDEX purchases_status ON purchases (status, created_at);
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
  db.prepare("DELETE FROM idempotency_keys WHERE created_at < ?").run(now - 7 * DAY_MS);
}
