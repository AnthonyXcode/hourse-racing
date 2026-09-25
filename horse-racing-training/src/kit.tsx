// Tailwind class strings (and a few tiny components) for patterns shared across pages.
// Keep every class literal — Tailwind only generates classes it can find verbatim in source.
//
// Look: warm canvas, white cards with a hairline ring instead of borders, pill-shaped
// controls, serif (font-display) headings and headline figures, one blue accent.
// Responsive: mobile-first; `sm:` (640px) and `lg:` (1024px) are the only breakpoints used.
import type { ReactNode } from "react";

/** Join class names, skipping falsy entries. */
export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

// ---- layout ----
/** Centered page column with responsive side gutters. */
export const container = "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8";
/** Root of the analyzer and momentum pages. */
export const page = "mt-6 text-sm leading-relaxed text-ink";
export const panel = "min-w-0 rounded-card bg-surface p-4 shadow-card sm:p-5";
export const note = "mt-3 text-[13px] leading-relaxed text-ink-3";
export const empty = "p-8 text-center text-ink-3";
/** KPI tiles: two-up on phones, as many ≥200px columns as fit above that. */
export const kpis = "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:gap-4";
export const grid2 = "grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-4";
/** 8-column breakdowns: two-up only when there's room, else one per row. */
export const grid2Wide = "grid grid-cols-[repeat(auto-fit,minmax(min(560px,100%),1fr))] gap-4";
export const h3 = "mb-3 font-display text-xl leading-tight font-normal";
export const tag = "rounded-full bg-surface-2 px-2.5 py-1 text-xs text-ink-2";
export const code = "rounded-md bg-surface-2 px-1.5 py-px font-mono text-[12px]";
export const row = "mb-3 flex flex-wrap items-center gap-2 sm:gap-3";
export const scroll = "overflow-x-auto";
export const tall = "max-h-[460px] overflow-y-auto";

// ---- text tones ----
export const good = "text-good";
export const bad = "text-bad";
export const strong = "font-semibold";
export const dim = "opacity-40";
/** Serif headline number (KPI value, net P&L, dividends). */
export const figure = "font-display leading-none tabular-nums";

// ---- form controls ----
export const field = "flex min-w-0 flex-col gap-1.5";
export const fieldLabel = "text-xs font-medium text-ink-2";
/** select / date / search / number input: filled, borderless, 40px tall. */
export const control =
  "h-10 min-w-0 rounded-control border-0 bg-surface-2 px-3 text-base text-ink placeholder:text-ink-3 focus-visible:outline-2 focus-visible:outline-accent sm:text-sm"; // 16px on phones: iOS zooms into smaller inputs
/**
 * Date input that behaves on iPhone Safari: `appearance-none` so our height/padding/background apply,
 * block + w-full + min-w-0 so it fits its column, value left-aligned (iOS centres it), and 16px text on
 * phones so tapping it doesn't zoom the page (iOS zooms any input under 16px).
 */
export const dateControl =
  "block h-10 w-full min-w-0 appearance-none rounded-control border-0 bg-surface-2 px-3 text-base leading-10 text-ink focus-visible:outline-2 focus-visible:outline-accent sm:text-sm [&::-webkit-date-and-time-value]:text-left [&::-webkit-date-and-time-value]:leading-10";
export const btn =
  "inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-surface px-4 text-sm font-medium whitespace-nowrap text-ink shadow-btn transition-colors enabled:hover:bg-surface-2 disabled:cursor-default disabled:opacity-45";
export const btnPrimary =
  "inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-accent px-5 text-sm font-semibold whitespace-nowrap text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] transition-colors enabled:hover:bg-accent-hover disabled:cursor-default disabled:bg-surface-3 disabled:text-ink-3 disabled:shadow-none";
/** Toggle chip (race tabs, bet types, filters). */
export const pill = (on: boolean) =>
  on
    ? "inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-ink px-3.5 text-sm font-medium whitespace-nowrap text-white"
    : "inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-surface px-3.5 text-sm font-medium whitespace-nowrap text-ink shadow-btn transition-colors enabled:hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40";
/**
 * Horizontal strip of pills: wraps on desktop, scrolls sideways on phones.
 * The scroll container clips vertically too, so pad it (pt/pb) to keep the pills' 1px outline visible.
 */
export const pillRow = "-mx-4 flex gap-2 overflow-x-auto px-4 pt-0.5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pt-0 sm:pb-0";
/** Date-range / controls bar at the top of a section. */
export const rangeBar = "grid grid-cols-2 items-end gap-3 rounded-card bg-surface p-4 shadow-card sm:flex sm:flex-wrap sm:p-5";
/** Meta text inside rangeBar: own row on phones, right-aligned after. */
export const rangeMeta = "col-span-2 text-xs text-ink-3 sm:ml-auto sm:pb-3";
/** Segmented toggle (Win / Place). */
export const seg = "inline-flex rounded-full bg-surface-2 p-1";
export const segBtn = (on: boolean) =>
  on
    ? "cursor-pointer rounded-full bg-surface px-3.5 py-1 text-[13px] font-medium text-ink shadow-btn"
    : "cursor-pointer rounded-full px-3.5 py-1 text-[13px] text-ink-2 hover:text-ink";

// ---- tables ----
export const table =
  "w-full border-collapse tabular-nums [&_th]:sticky [&_th]:top-0 [&_th]:border-b [&_th]:border-edge [&_th]:bg-surface [&_th]:text-right [&_th]:text-xs [&_th]:font-medium [&_th]:whitespace-nowrap [&_th]:text-ink-3 [&_td]:border-b [&_td]:border-edge [&_td]:text-right [&_td]:whitespace-nowrap [&_th:first-child]:text-left [&_td:first-child]:text-left [&_tbody_tr:last-child_td]:border-b-0 [&_tbody_tr:hover]:bg-canvas";
/** Padding for `table` — pick one. */
export const tablePad = "[&_th]:px-3 [&_th]:py-2.5 [&_td]:px-3 [&_td]:py-2.5";
export const tablePadTight = "[&_th]:px-2 [&_th]:py-2 [&_td]:px-2 [&_td]:py-2";
/** Footer "All" row. */
export const totalRow = "[&_td]:border-t [&_td]:border-b-0 [&_td]:border-t-ink/25 [&_td]:font-semibold";

// ---- overlays ----
export const errorBox = "my-3 rounded-control bg-bad-soft px-4 py-3 text-sm text-bad";
/** Recharts tooltip card. */
export const tip = "min-w-[190px] rounded-[14px] bg-surface px-3 py-2.5 text-xs shadow-pop";
export const tipRow = "flex items-center gap-1.5 py-px text-ink";
/** Modal backdrop: bottom sheet on phones, centered dialog from `sm`. */
export const modalBg = "fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center sm:p-6";
export const modal =
  "max-h-[92dvh] w-full overflow-auto rounded-t-card bg-surface p-5 shadow-pop sm:w-auto sm:min-w-[400px] sm:max-w-[min(720px,100%)] sm:rounded-card sm:p-7";

/** Page title in the display serif. */
export function Display({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="pt-4 pb-2 sm:pt-8">
      <h1 className="font-display text-[34px] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[44px]">{children}</h1>
      {sub != null && <p className="mt-2 max-w-[70ch] text-sm text-ink-2">{sub}</p>}
    </div>
  );
}

/** Section heading with an optional muted subtitle (own line on phones). */
export function H2({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <h2 className="mt-10 mb-4 font-display text-[26px] leading-tight tracking-[-0.01em] sm:mt-12 sm:text-[30px]">
      {children}
      {sub != null && (
        <span className="mt-1 block font-sans text-sm tracking-normal text-ink-3 sm:ml-2 sm:inline">
          <span className="hidden sm:inline">— </span>
          {sub}
        </span>
      )}
    </h2>
  );
}
