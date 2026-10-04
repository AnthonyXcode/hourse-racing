// Public member leaderboard (opt-in only, LIVE bets only). Stats count SETTLED live bets (won / lost);
// pending, held and void bets never count. Staked = stake − refund (scratched combos come back), returned =
// payout. Members are identified publicly by their random public_id; no contact data or internal id leaves.
import type { MembersDB } from "../members/db";
import { picksText } from "../../shared/credits/format";
import type { BetSelection, LeaderboardProfile, LeaderboardRange, LeaderboardRow, LeaderboardStats } from "../../shared/types";

export const LEADERBOARD_SIZE = 20;
/** "Last 30 days" board and the profile default. */
export const LEADERBOARD_DAYS = 30;
export const PROFILE_RECENT = 20;

export const parseRange = (v: unknown): LeaderboardRange | null => (v === undefined || v === "30d" ? "30d" : v === "all" ? "all" : null);

const avatarUrl = (file: string | null) => (file ? `/api/avatars/${file}` : null);

interface AggRow {
  public_id: string;
  display_name: string;
  avatar_file: string | null;
  bets: number;
  hits: number;
  staked: number;
  returned: number;
}
export const stats = (r: Pick<AggRow, "bets" | "hits" | "staked" | "returned">): LeaderboardStats => {
  const net = r.returned - r.staked;
  return {
    bets: r.bets,
    hits: r.hits,
    hitRate: r.bets ? Math.round((r.hits / r.bets) * 1000) / 10 : 0,
    staked: r.staked,
    returned: r.returned,
    net,
    roi: r.staked > 0 ? Math.round((net / r.staked) * 1000) / 10 : 0,
  };
};

const SETTLED = "b.status IN ('won', 'lost')";

/** Most recent race date (YYYYMMDD) with settled live bets on or before `today`, or null. */
export function lastRacingDay(db: MembersDB, today: string): string | null {
  const r = db.prepare(`SELECT MAX(b.date) d FROM live_bets b WHERE ${SETTLED} AND b.date <= ?`).get(today) as { d: string | null };
  return r.d ?? null;
}

/** Ranked opted-in members over race dates [since, until] (YYYYMMDD, either end open when null). */
export function leaderboard(db: MembersDB, opts: { since: string | null; until?: string | null; minBets: number; limit?: number }): LeaderboardRow[] {
  const rows = db
    .prepare(
      `SELECT u.public_id, u.display_name, u.avatar_file,
              COUNT(*) bets, SUM(b.status = 'won') hits, SUM(b.stake - b.refund) staked, SUM(b.payout) returned
         FROM live_bets b JOIN users u ON u.id = b.user_id
        WHERE u.show_on_leaderboard = 1 AND u.public_id IS NOT NULL AND ${SETTLED} AND (@since IS NULL OR b.date >= @since) AND (@until IS NULL OR b.date <= @until)
        GROUP BY u.id
       HAVING COUNT(*) >= @minBets`
    )
    .all({ since: opts.since, until: opts.until ?? null, minBets: opts.minBets }) as AggRow[];
  return rows
    .map((r) => ({ publicId: r.public_id, displayName: r.display_name, avatarUrl: avatarUrl(r.avatar_file), ...stats(r) }))
    .sort((a, b) => b.roi - a.roi || b.net - a.net || b.bets - a.bets || a.displayName.localeCompare(b.displayName))
    .slice(0, opts.limit ?? LEADERBOARD_SIZE)
    .map((r, i) => ({ rank: i + 1, ...r }));
}

/** One opted-in member's public profile, or null (not found / not opted in: callers answer 404 either way). */
export function memberProfile(db: MembersDB, publicId: string, opts: { since: string | null }): LeaderboardProfile | null {
  if (!/^[0-9a-f]{8,32}$/.test(publicId)) return null;
  const u = db.prepare("SELECT id, public_id, display_name, avatar_file, created_at FROM users WHERE public_id = ? AND show_on_leaderboard = 1").get(publicId) as
    | { id: string; public_id: string; display_name: string; avatar_file: string | null; created_at: string }
    | undefined;
  if (!u) return null;
  const where = `b.user_id = @id AND ${SETTLED} AND (@since IS NULL OR b.date >= @since)`;
  const args = { id: u.id, since: opts.since };
  const total = db
    .prepare(`SELECT COUNT(*) bets, COALESCE(SUM(b.status = 'won'), 0) hits, COALESCE(SUM(b.stake - b.refund), 0) staked, COALESCE(SUM(b.payout), 0) returned FROM live_bets b WHERE ${where}`)
    .get(args) as AggRow;
  const pools = (db.prepare(`SELECT b.bet_type pool, COUNT(*) bets, SUM(b.status = 'won') hits FROM live_bets b WHERE ${where} GROUP BY b.bet_type ORDER BY bets DESC, pool`).all(args) as {
    pool: string;
    bets: number;
    hits: number;
  }[]).map((p) => ({ pool: p.pool, bets: p.bets, hits: p.hits }));
  const recent = (db
    .prepare(`SELECT b.date, b.venue, b.race_ids, b.bet_type, b.selection, b.stake, b.refund, b.payout, b.status, b.settled_at FROM live_bets b WHERE ${where} ORDER BY COALESCE(b.settled_at, b.created_at) DESC LIMIT ${PROFILE_RECENT}`)
    .all(args) as { date: string; venue: string; race_ids: string; bet_type: string; selection: string; stake: number; refund: number; payout: number; status: "won" | "lost"; settled_at: string | null }[]).map((b) => ({
    date: `${b.date.slice(0, 4)}-${b.date.slice(4, 6)}-${b.date.slice(6, 8)}`,
    venue: b.venue,
    races: JSON.parse(b.race_ids) as number[],
    pool: b.bet_type,
    picks: picksText(JSON.parse(b.selection) as BetSelection),
    stake: b.stake - b.refund,
    payout: b.payout,
    result: b.status,
  }));
  return {
    publicId: u.public_id,
    displayName: u.display_name,
    avatarUrl: avatarUrl(u.avatar_file),
    memberSince: u.created_at.slice(0, 7),
    ...stats(total),
    pools,
    recent,
  };
}
