// POST /api/names/lookup — stale-while-revalidate: answer from the DB right away, queue whatever is
// missing or older than the TTL, never wait on HKJC.
import { KINDS, keyOf, type Kind, type NameKey, type NameStore } from "./store";
import type { NameIndex } from "./nameIndex";

export const MAX_KEYS = 500;
const CODE_RE = /^[A-Za-z0-9_-]{1,32}$/;

export interface LookupName {
  en: string | null;
  zh: string | null;
  /** When the newest stored row was fetched; null = nothing stored yet. */
  fetchedAt: string | null;
}
export interface LookupResponse {
  /** "kind:code" → names, for every requested key. */
  names: Record<string, LookupName>;
  /** "kind:code" keys with no Chinese name yet (being fetched; ask again later). */
  pending: string[];
}

/** Validate the request body. Returns de-duplicated keys, or an error message. */
export function parseLookupBody(body: unknown): { keys: NameKey[] } | { error: string } {
  const keys = (body as { keys?: unknown } | null)?.keys;
  if (!Array.isArray(keys)) return { error: "body must be { keys: [{ kind, code }] }" };
  if (keys.length > MAX_KEYS) return { error: `at most ${MAX_KEYS} keys per request` };
  const out = new Map<string, NameKey>();
  for (const k of keys) {
    const { kind, code } = (k ?? {}) as { kind?: unknown; code?: unknown };
    if (typeof kind !== "string" || !KINDS.includes(kind as Kind)) return { error: `bad kind: ${String(kind)}` };
    if (typeof code !== "string" || !CODE_RE.test(code)) return { error: `bad code: ${String(code)}` };
    out.set(`${kind}:${code}`, { kind: kind as Kind, code });
  }
  return { keys: [...out.values()] };
}

export function lookupNames(
  keys: NameKey[],
  deps: { store: NameStore; index: () => NameIndex; enqueue: (keys: NameKey[]) => void; now?: Date }
): LookupResponse {
  const now = deps.now ?? new Date();
  const ix = deps.index();
  // Lazily seed English for known codes that have no row yet.
  deps.store.seedMissing(
    keys.filter((k) => ix.en.has(keyOf(k))).map((k) => ({ ...k, nameEn: ix.en.get(keyOf(k))!, nameZh: null })),
    "data-file",
    now
  );
  const rows = deps.store.latest(keys);
  const names: Record<string, LookupName> = {};
  const pending: string[] = [];
  for (const k of keys) {
    const key = keyOf(k);
    const r = rows.get(key);
    names[key] = { en: r?.nameEn ?? ix.en.get(key) ?? null, zh: r?.nameZh ?? null, fetchedAt: r?.fetchedAt ?? null };
    if (!r?.nameZh) pending.push(key);
  }
  const todo = deps.store.staleOrMissing(keys, now);
  if (todo.length) deps.enqueue(todo);
  return { names, pending };
}
