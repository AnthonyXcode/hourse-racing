// Tailwind class strings (and a few tiny components) for patterns shared across pages.
// Keep every class literal — Tailwind only generates classes it can find verbatim in source.
import type { ReactNode } from "react";

/** Join class names, skipping falsy entries. */
export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

// ---- analyzer / momentum surface ----
/** Root of the analyzer and momentum pages. */
export const page = "mt-3 text-sm leading-normal text-ink";
export const panel = "rounded-[10px] border border-aline bg-panel p-4 shadow-panel";
export const note = "mt-2.5 text-[12.5px] text-muted";
export const empty = "p-7 text-center text-muted";
export const kpis = "mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(190px,100%),1fr))] gap-3";
export const grid2 = "grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-4";
/** 8-column breakdowns: two-up only when there's room, else one per row. */
export const grid2Wide = "grid grid-cols-[repeat(auto-fit,minmax(min(560px,100%),1fr))] gap-4";
export const h3 = "mb-2.5 text-sm font-bold";
export const tag = "rounded-full border border-aline px-2 py-0.5 text-[11.5px] text-muted";
export const code = "rounded bg-ink/7 px-1.5 py-px text-[12.5px]";
export const row = "mb-2.5 flex flex-wrap items-center gap-3";
export const scroll = "overflow-x-auto";
export const tall = "max-h-[460px] overflow-y-auto";

// ---- text tones ----
export const good = "text-good";
export const bad = "text-bad";
export const strong = "font-semibold";
export const dim = "opacity-40";

// ---- form controls ----
export const field = "flex min-w-[104px] flex-col gap-1";
export const fieldLabel = "text-[11px] uppercase tracking-[.04em] text-muted";
/** select / date / search / number input. */
export const control = "min-w-[104px] rounded-[7px] border border-aline bg-panel px-2 py-1.5 text-[13px] text-ink";
export const btn =
  "cursor-pointer rounded-[7px] border border-aline bg-panel px-3 py-[7px] text-[13px] text-ink enabled:hover:border-accent enabled:hover:text-accent disabled:cursor-default disabled:opacity-50";
export const btnPrimary =
  "cursor-pointer rounded-[7px] border border-hkjc-red bg-hkjc-red px-3 py-[7px] text-[13px] font-semibold text-white enabled:hover:brightness-110 disabled:cursor-default disabled:opacity-50";
/** Date-range bar at the top of a panel. */
export const rangeBar = "flex flex-wrap items-end gap-2.5 rounded-[10px] border border-aline bg-panel px-4 py-3";
/** Right-aligned meta text inside rangeBar. */
export const rangeMeta = "ml-auto pb-[7px] text-[12.5px] text-muted";
/** Segmented toggle (Win / Place). */
export const seg = "inline-flex overflow-hidden rounded-[7px] border border-aline";
export const segBtn = (on: boolean) =>
  on ? "cursor-pointer bg-ink px-3 py-[5px] text-[13px] text-white" : "cursor-pointer bg-panel px-3 py-[5px] text-[13px] text-ink hover:text-accent";

// ---- tables (analyzer style) ----
export const table =
  "w-full border-collapse tabular-nums [&_th]:sticky [&_th]:top-0 [&_th]:border-b [&_th]:border-aline [&_th]:bg-panel [&_th]:text-right [&_th]:text-xs [&_th]:font-semibold [&_th]:whitespace-nowrap [&_th]:uppercase [&_th]:tracking-[.03em] [&_th]:text-muted [&_td]:border-b [&_td]:border-aline [&_td]:text-right [&_td]:whitespace-nowrap [&_th:first-child]:text-left [&_td:first-child]:text-left [&_tbody_tr:hover]:bg-accent/7";
/** Padding for `table` — pick one. */
export const tablePad = "[&_th]:px-2.5 [&_th]:py-[7px] [&_td]:px-2.5 [&_td]:py-[7px]";
export const tablePadTight = "[&_th]:px-1.5 [&_th]:py-1.5 [&_td]:px-1.5 [&_td]:py-1.5";
/** Footer "All" row. */
export const totalRow = "[&_td]:border-t-2 [&_td]:border-b-0 [&_td]:font-semibold";

// ---- trainer ----
export const errorBox = "my-2.5 rounded border border-miss bg-[#fdecec] px-3 py-2 text-hkjc-red";
/** Recharts tooltip card. */
export const tip = "min-w-[190px] rounded-lg border border-aline bg-white px-2.5 py-2 text-xs shadow-panel";
export const tipRow = "flex items-center gap-1.5 py-px text-ink";

/** Section heading with an optional muted subtitle. */
export function H2({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <h2 className="mt-8 mb-3 text-[15px] font-bold tracking-[-.01em]">
      {children}
      {sub != null && <span className="text-[13px] font-normal text-muted"> {sub}</span>}
    </h2>
  );
}
