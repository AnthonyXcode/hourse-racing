// Display names for horses, jockeys, trainers and races, from POST /api/names/lookup.
// English comes from our data files and needs no lookup; Chinese is fetched once per code per
// session, batched: every code asked for during a render goes out in one request on the next tick.
import { useCallback, useSyncExternalStore } from "react";
import { api, type NameKind } from "../api";
import { useLanguage } from "./useLanguage";

type Entry = { zh: string | null };
const cache = new Map<string, Entry>(); // "kind:code" → result (zh null = HKJC has none yet)
const requested = new Set<string>(); // in flight or answered
let queue: string[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let version = 0;
const listeners = new Set<() => void>();
const RETRY_MS = [5_000, 30_000]; // pending keys: ask again after 5 s, then 30 s
const BATCH = 500; // server limit

const notify = () => {
  version++;
  listeners.forEach((l) => l());
};

function enqueue(key: string) {
  if (requested.has(key)) return;
  requested.add(key);
  queue.push(key);
  flushTimer ??= setTimeout(flush, 0);
}

function flush(attempt = 0, keys?: string[]) {
  flushTimer = null;
  const batch = keys ?? queue;
  if (!keys) queue = [];
  for (let i = 0; i < batch.length; i += BATCH) {
    const part = batch.slice(i, i + BATCH);
    api
      .names(part.map((k) => ({ kind: k.slice(0, k.indexOf(":")) as NameKind, code: k.slice(k.indexOf(":") + 1) })))
      .then(({ names, pending }) => {
        for (const k of part) cache.set(k, { zh: names[k]?.zh ?? null });
        notify();
        const retry = pending.filter((k) => part.includes(k));
        if (retry.length && attempt < RETRY_MS.length) setTimeout(() => flush(attempt + 1, retry), RETRY_MS[attempt]);
      })
      .catch(() => {
        // Network/server error: forget these so a later render asks again; English stays on screen.
        part.forEach((k) => requested.delete(k));
      });
  }
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/**
 * `name(kind, code, en)` → the name to show in the current language.
 * English: `en` as-is. Chinese: the stored zh name, else `en` while loading or if HKJC has none.
 */
export function useNames() {
  const { lang } = useLanguage();
  const v = useSyncExternalStore(subscribe, () => version);
  return useCallback(
    (kind: NameKind, code: string | null | undefined, en: string): string => {
      if (lang === "en" || !code) return en;
      const key = `${kind}:${code}`;
      const hit = cache.get(key);
      if (!hit) enqueue(key);
      return hit?.zh || en;
    },
    // v: re-create after new names arrive so memoised children re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, v]
  );
}

/** Inline display name. */
export function Name({ kind, code, en }: { kind: NameKind; code: string | null | undefined; en: string }) {
  const name = useNames();
  return <>{name(kind, code, en)}</>;
}
