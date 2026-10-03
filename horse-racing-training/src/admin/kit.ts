// Admin-only class strings (docs/admin/DESIGN-SPEC.md, marked [new]); kept out of the member bundle.
import { cx } from "../kit";

export const roleBadge = (role: "owner" | "admin" | "user") =>
  cx(
    "inline-flex h-6 flex-none items-center rounded-full px-2.5 text-[13px] font-medium whitespace-nowrap",
    role === "owner" ? "bg-gold text-ink-strong" : role === "admin" ? "bg-navy-900 text-white" : "bg-surface-2 text-ink-muted"
  );
export const navItem = (on: boolean) =>
  cx(
    "flex h-11 items-center gap-2 px-[13px] text-[15px] focus-visible:outline-white",
    on ? "bg-navy-700 font-medium text-white" : "text-white/85 hover:bg-white/10"
  );
export const kpiTile = "flex min-h-[112px] min-w-0 flex-col rounded-card bg-surface p-4 shadow-card";
export const heldChip = "inline-flex h-6 items-center gap-1 rounded-full bg-surface px-2 text-[13px] font-medium text-bad ring-1 ring-bad";
export const flagChip = "inline-flex h-6 items-center gap-1 rounded-full bg-bad-soft px-2 text-[13px] font-medium text-bad";
export const summaryBox = "rounded-card bg-sky-150 px-[13px] py-2 text-[15px] text-navy-900";
