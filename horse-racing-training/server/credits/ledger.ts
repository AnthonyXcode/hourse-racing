// Credit ledger (docs/credits/PRD.md §3): append-only rows, a cached wallet balance updated in the same
// transaction, CHECK (balance >= 0), and a UNIQUE idempotency key per row so nothing is applied twice.
import { createHmac } from "crypto";
import type { MembersDB } from "../members/db";
import type { LedgerKind, LedgerRow } from "../../shared/types";

export class InsufficientCredits extends Error {
  constructor(
    public balance: number,
    public required: number
  ) {
    super("insufficient_credits");
  }
}

export interface WalletRow {
  user_id: string;
  balance: number;
  flagged: number;
  flag_reason: string | null;
  welcome_pending: number;
  settled_seen_at: string | null;
  updated_at: string;
}

export interface PostInput {
  userId: string;
  kind: LedgerKind;
  amount: number;
  idemKey: string;
  refType?: string | null;
  refId?: string | null;
  actor: string;
  note?: string | null;
  /** Debits only: take at most the current balance instead of failing (reversals). */
  capAtBalance?: boolean;
}

interface LedgerDbRow {
  id: number;
  kind: LedgerKind;
  amount: number;
  balance_after: number;
  ref_type: string | null;
  ref_id: string | null;
  note: string | null;
  created_at: string;
}

export const phoneHash = (phone: string, pepper: string) => createHmac("sha256", pepper).update(phone).digest("hex");

export function ledger(db: MembersDB, clock: () => number) {
  const iso = () => new Date(clock()).toISOString();
  const walletQ = db.prepare<[string], WalletRow>("SELECT * FROM wallets WHERE user_id = ?");
  const hasKey = db.prepare<[string], { id: number }>("SELECT id FROM credit_ledger WHERE idem_key = ?");

  const api = {
    ensureWallet(userId: string): WalletRow {
      db.prepare("INSERT OR IGNORE INTO wallets (user_id, balance, updated_at) VALUES (?, 0, ?)").run(userId, iso());
      return walletQ.get(userId)!;
    },
    wallet: (userId: string) => walletQ.get(userId) ?? null,

    /**
     * Apply one ledger row and move the wallet. Call inside a transaction. Returns null if the idempotency
     * key was already used (nothing applied). Throws InsufficientCredits rather than going below 0.
     */
    post(p: PostInput): { amount: number; balanceAfter: number } | null {
      if (!Number.isInteger(p.amount)) throw new Error("ledger amounts are whole credits");
      if (hasKey.get(p.idemKey)) return null;
      const w = api.ensureWallet(p.userId);
      let amount = p.amount;
      if (w.balance + amount < 0) {
        if (!p.capAtBalance) throw new InsufficientCredits(w.balance, -amount);
        amount = -w.balance;
      }
      const after = w.balance + amount;
      const t = iso();
      db.prepare("UPDATE wallets SET balance = ?, updated_at = ? WHERE user_id = ?").run(after, t, p.userId);
      db.prepare(
        "INSERT INTO credit_ledger (user_id, kind, amount, balance_after, ref_type, ref_id, idem_key, actor, note, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      ).run(p.userId, p.kind, amount, after, p.refType ?? null, p.refId ?? null, p.idemKey, p.actor, p.note ?? null, t);
      return { amount, balanceAfter: after };
    },

    /**
     * The signup bonus: once per phone number ever (bonus_claims survives account deletion) and once per user.
     * Returns true when granted now.
     */
    grantSignupBonus(user: { id: string; phone_e164: string }, amount: number, pepper: string): boolean {
      return db.transaction(() => {
        api.ensureWallet(user.id);
        const h = phoneHash(user.phone_e164, pepper);
        if (db.prepare("SELECT 1 FROM bonus_claims WHERE phone_hash = ?").get(h)) return false;
        db.prepare("INSERT INTO bonus_claims (phone_hash, claimed_at) VALUES (?, ?)").run(h, iso());
        if (amount <= 0) return false;
        const r = api.post({ userId: user.id, kind: "signup_bonus", amount, idemKey: `bonus:${user.id}`, actor: "system" });
        if (r) db.prepare("UPDATE wallets SET welcome_pending = 1 WHERE user_id = ?").run(user.id);
        return !!r;
      }).immediate();
    },

    /** Newest first, `limit` per page, rows with id < cursor. */
    list(userId: string, cursor: number | null, limit: number): { rows: LedgerRow[]; nextCursor: number | null } {
      const rows = db
        .prepare<[string, number, number], LedgerDbRow>(
          "SELECT id, kind, amount, balance_after, ref_type, ref_id, note, created_at FROM credit_ledger WHERE user_id = ? AND id < ? ORDER BY id DESC LIMIT ?"
        )
        .all(userId, cursor ?? Number.MAX_SAFE_INTEGER, limit + 1);
      const page = rows.slice(0, limit);
      return {
        rows: page.map((r) => ({
          id: r.id,
          kind: r.kind,
          amount: r.amount,
          balanceAfter: r.balance_after,
          ref: { type: r.ref_type ?? "", id: r.ref_id, ...(r.note ? (JSON.parse(r.note) as object) : {}) },
          createdAt: r.created_at,
        })),
        nextCursor: rows.length > limit ? page[page.length - 1]!.id : null,
      };
    },
  };
  return api;
}
export type Ledger = ReturnType<typeof ledger>;
