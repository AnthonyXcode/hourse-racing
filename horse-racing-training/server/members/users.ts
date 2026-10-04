// Member accounts and profile fields (PRD §2.5, §6).
import { randomBytes, randomUUID } from "crypto";
import type { MembersDB } from "./db";
import type { Member, MemberLocale } from "../../shared/types";
import type { NormalizedPatch } from "../../shared/validation";

export interface UserRow {
  id: string;
  phone_e164: string;
  display_name: string;
  description: string | null;
  telegram: string | null;
  whatsapp: string | null;
  email: string | null;
  avatar_file: string | null;
  locale: string;
  created_at: string;
  updated_at: string;
  last_login_at: string;
  /** Public leaderboard opt-in (v4), off by default. */
  show_on_leaderboard?: number;
  /** Random opaque id for the public profile (v4); never the internal id. */
  public_id?: string | null;
}

/** A fresh public profile id: 18 hex chars, unguessable and unrelated to the user id. */
export const newPublicId = () => randomBytes(9).toString("hex");

/** Default display name: "會員 5678" / "Member 5678" (last 4 digits of the login number). */
export const defaultName = (phone: string, locale: MemberLocale) => `${locale === "en" ? "Member" : "會員"} ${phone.slice(-4)}`;

export function toMember(u: UserRow): Member {
  return {
    id: u.id,
    phone: u.phone_e164,
    displayName: u.display_name,
    description: u.description,
    telegram: u.telegram,
    whatsapp: u.whatsapp,
    email: u.email,
    avatarUrl: u.avatar_file ? `/api/avatars/${u.avatar_file}` : null,
    createdAt: u.created_at,
    showOnLeaderboard: !!u.show_on_leaderboard,
    publicId: u.public_id ?? null,
  };
}

const COLUMN: Record<keyof NormalizedPatch, string> = {
  displayName: "display_name",
  description: "description",
  telegram: "telegram",
  whatsapp: "whatsapp",
  email: "email",
};

export function userStore(db: MembersDB, now: () => Date = () => new Date()) {
  const byId = db.prepare<[string], UserRow>("SELECT * FROM users WHERE id = ?");
  const byPhone = db.prepare<[string], UserRow>("SELECT * FROM users WHERE phone_e164 = ?");
  return {
    byId: (id: string) => byId.get(id) ?? null,
    /** Find the account for a verified number, creating it on first login. */
    login(phone: string, locale: MemberLocale): { user: UserRow; isNew: boolean } {
      return db.transaction(() => {
        const ts = now().toISOString();
        const found = byPhone.get(phone);
        if (found) {
          db.prepare("UPDATE users SET last_login_at = ? WHERE id = ?").run(ts, found.id);
          return { user: byId.get(found.id)!, isNew: false };
        }
        const id = randomUUID();
        db.prepare(
          "INSERT INTO users (id, phone_e164, display_name, locale, created_at, updated_at, last_login_at, public_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        ).run(id, phone, defaultName(phone, locale), locale, ts, ts, ts, newPublicId());
        return { user: byId.get(id)!, isNew: true };
      })();
    },
    update(id: string, patch: NormalizedPatch): UserRow {
      const keys = Object.keys(patch) as (keyof NormalizedPatch)[];
      if (keys.length) {
        const sets = keys.map((k) => `${COLUMN[k]} = @${k}`).join(", ");
        db.prepare(`UPDATE users SET ${sets}, updated_at = @updatedAt WHERE id = @id`).run({ ...patch, updatedAt: now().toISOString(), id });
      }
      return byId.get(id)!;
    },
    /** Public leaderboard opt-in (also makes sure the member has a public id). */
    setLeaderboard(id: string, on: boolean): UserRow {
      db.prepare("UPDATE users SET show_on_leaderboard = ?, public_id = COALESCE(public_id, ?), updated_at = ? WHERE id = ?").run(on ? 1 : 0, newPublicId(), now().toISOString(), id);
      return byId.get(id)!;
    },
    /** Set (or clear) the avatar file; returns the previous file name so the caller can delete it. */
    setAvatar(id: string, file: string | null): { user: UserRow; previous: string | null } {
      const previous = byId.get(id)?.avatar_file ?? null;
      db.prepare("UPDATE users SET avatar_file = ?, updated_at = ? WHERE id = ?").run(file, now().toISOString(), id);
      return { user: byId.get(id)!, previous };
    },
    /** Delete the account; sessions and history go with it (ON DELETE CASCADE). */
    remove(id: string): void {
      db.prepare("DELETE FROM users WHERE id = ?").run(id);
    },
  };
}
export type UserStore = ReturnType<typeof userStore>;
