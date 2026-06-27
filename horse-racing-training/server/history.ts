// Pick-history store. Persisted to a local JSON file (gitignored) so a bet log
// survives restarts. Single-user local tool — no locking needed.
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import type { HistoryEntry } from "../shared/types";

const FILE = fileURLToPath(new URL("../history.json", import.meta.url));

export function readHistory(): HistoryEntry[] {
  if (!existsSync(FILE)) return [];
  try {
    return JSON.parse(readFileSync(FILE, "utf-8")) as HistoryEntry[];
  } catch {
    return [];
  }
}

function writeHistory(entries: HistoryEntry[]): void {
  writeFileSync(FILE, JSON.stringify(entries, null, 2));
}

/** Prepend the newest entry; returns the full list. */
export function addEntry(entry: HistoryEntry): HistoryEntry[] {
  const all = [entry, ...readHistory()];
  writeHistory(all);
  return all;
}

export function deleteEntry(id: string): HistoryEntry[] {
  const all = readHistory().filter((e) => e.id !== id);
  writeHistory(all);
  return all;
}

export function clearHistory(): void {
  writeHistory([]);
}
