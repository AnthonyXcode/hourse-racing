// Ledger reconciliation (docs/credits/PRD.md §3.6). Returns human-readable problems; empty = consistent.
import type { MembersDB } from "../members/db";

export function reconcile(db: MembersDB): string[] {
  const out: string[] = [];
  const q = <T>(sql: string) => db.prepare(sql).all() as T[];

  for (const r of q<{ user_id: string; balance: number; sum: number | null }>(
    "SELECT w.user_id, w.balance, (SELECT SUM(amount) FROM credit_ledger l WHERE l.user_id = w.user_id) sum FROM wallets w"
  ))
    if (r.balance !== (r.sum ?? 0)) out.push(`wallet …${r.user_id.slice(-4)}: balance ${r.balance} ≠ ledger sum ${r.sum ?? 0}`);

  for (const r of q<{ id: string; n: number }>(
    "SELECT b.id, (SELECT COUNT(*) FROM credit_ledger l WHERE l.kind = 'bet_stake' AND l.ref_id = b.id) n FROM live_bets b"
  ))
    if (r.n !== 1) out.push(`bet …${r.id.slice(-4)}: ${r.n} stake rows (expected 1)`);

  for (const r of q<{ id: string; status: string; payout: number; refund: number; p: number; f: number }>(
    `SELECT b.id, b.status, b.payout, b.refund,
       (SELECT COUNT(*) FROM credit_ledger l WHERE l.kind = 'bet_payout' AND l.ref_id = b.id) p,
       (SELECT COUNT(*) FROM credit_ledger l WHERE l.kind = 'bet_refund' AND l.ref_id = b.id) f
     FROM live_bets b WHERE b.status <> 'pending'`
  )) {
    if (r.p !== (r.payout > 0 ? 1 : 0)) out.push(`bet …${r.id.slice(-4)} (${r.status}): ${r.p} payout rows for payout ${r.payout}`);
    if (r.f !== (r.refund > 0 ? 1 : 0)) out.push(`bet …${r.id.slice(-4)} (${r.status}): ${r.f} refund rows for refund ${r.refund}`);
  }

  for (const r of q<{ stripe_session_id: string; n: number }>(
    "SELECT p.stripe_session_id, (SELECT COUNT(*) FROM credit_ledger l WHERE l.kind = 'purchase' AND l.ref_id = p.stripe_session_id) n FROM purchases p WHERE p.status IN ('paid','refunded','disputed')"
  ))
    if (r.n > 1) out.push(`purchase …${r.stripe_session_id.slice(-4)}: credited ${r.n} times`);
  for (const r of q<{ stripe_session_id: string }>(
    "SELECT p.stripe_session_id FROM purchases p WHERE p.status = 'paid' AND p.user_id NOT LIKE 'deleted:%' AND NOT EXISTS (SELECT 1 FROM credit_ledger l WHERE l.kind = 'purchase' AND l.ref_id = p.stripe_session_id)"
  ))
    out.push(`purchase …${r.stripe_session_id.slice(-4)}: paid but never credited`);
  return out;
}
