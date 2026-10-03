// Shared admin UI: context, OTP confirmation, the one confirm-dialog pattern for owner writes, data tables.
import { Fragment, createContext, useContext, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { btn, btnDanger, btnPrimary, control, cx, empty, errorBox, modalBgTop, modalNarrow, pill, sectionBody, sectionHead, statusChip, table, tablePadTight } from "../kit";
import { useAuth } from "../members/auth";
import { Counter, Spinner, fieldErr, formLabel, textBtn, useDialog } from "../members/ui";
import { Turnstile, type TurnstileHandle } from "../members/Turnstile";
import { useFmt, useLanguage } from "../i18n/useLanguage";
import { ApiError, adminCall, type Page } from "./api";
import { flagChip, heldChip } from "./kit";
import { useA, type T } from "./i18n";

export interface AdminMe {
  role: "owner" | "admin";
  displayName: string;
  phoneLast4: string;
  adminSessionExpiresAt: string | null;
  adminAbsoluteExpiresAt: string | null;
  /** Until when the last step-up OTP still covers sensitive writes (null = none). */
  stepUpUntil?: string | null;
  stepUpCredits: number;
  maxAdjust: number;
  idleMs: number;
  stripeMode: "test" | "live" | "none";
  heldCount: number;
}

interface Ctx {
  me: AdminMe;
  isOwner: boolean;
  /** Ask for a fresh OTP (step-up). Resolves true once verified. */
  stepUp: () => Promise<boolean>;
  path: string;
  query: URLSearchParams;
  navigate: (to: string, opts?: { replace?: boolean }) => void;
  setQuery: (patch: Record<string, string | null>) => void;
  toast: (msg: string, ms?: number) => void;
  /** Bumped after any write: pages refetch. */
  version: number;
  bump: () => void;
}
export const AdminCtx = createContext<Ctx | null>(null);
export const useAdmin = () => {
  const c = useContext(AdminCtx);
  if (!c) throw new Error("useAdmin outside AdminApp");
  return c;
};

/** Message for an admin API error. */
export function errText(t: T, e: unknown): string {
  if (!(e instanceof ApiError)) return t("err.generic");
  if (e.code === "network") return t("err.network");
  if (e.code === "stale_state") return t("err.conflict");
  if (e.code === "rate_limited") return t("err.rateLimited", { s: e.extra.retryAfter ?? 60 });
  if (e.code === "forbidden" || e.code === "owner_only") return t("err.forbidden");
  const known = ["insufficient_credits", "cannot_change_owner", "cannot_change_self", "bet_not_pending", "results_not_stored", "still_held", "invalid_amount", "not_found", "invalid_filter", "idempotency_conflict"];
  if (known.includes(e.code)) {
    const reason = (e.extra as { reason?: string }).reason;
    return t(`err.code.${e.code}`, { reason: reason ? t(`held.reason.${reason}`) : "" });
  }
  return t("err.generic");
}

// ---- OTP confirmation (entry + step-up) ----
export function OtpForm({ last4, stepUp, onDone }: { last4: string; stepUp?: boolean; onDone: () => void }) {
  const t = useA();
  const { config } = useAuth();
  const { lang } = useLanguage();
  const [token, setToken] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [left, setLeft] = useState(0);
  const ts = useRef<TurnstileHandle>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const id = useId();
  useEffect(() => {
    if (left <= 0) return;
    const x = setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => clearTimeout(x);
  }, [left]);

  async function send() {
    if (!token) return;
    setBusy(true);
    setErr("");
    try {
      await adminCall("POST", "/session/start", { turnstileToken: token });
      setSent(true);
      setLeft(60);
      setTimeout(() => codeRef.current?.focus(), 0);
    } catch (e) {
      setErr(e instanceof ApiError && e.code === "turnstile_failed" ? t("err.generic") : errText(t, e));
    } finally {
      setBusy(false);
      ts.current?.reset();
    }
  }
  async function verify(v = code) {
    if (v.length !== 6 || busy) return;
    setBusy(true);
    setErr("");
    try {
      await adminCall("POST", "/session/check", { code: v });
      onDone();
    } catch (e) {
      setCode("");
      const ae = e instanceof ApiError ? e : null;
      setErr(ae?.code === "invalid_code" ? `${ae.extra.attemptsLeft ?? 0} ✕` : errText(t, e));
      codeRef.current?.focus();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="text-[15px] leading-normal text-ink">{stepUp ? t("confirm.stepUpBody", { last4 }) : t("confirm.body", { last4 })}</p>
      {err && (
        <div className={errorBox} role="alert">
          {err}
        </div>
      )}
      {config && <Turnstile ref={ts} siteKey={config.turnstileSiteKey} lang={lang} onToken={setToken} onError={() => setErr(t("err.generic"))} />}
      {sent && (
        <div className="mt-3">
          <label htmlFor={id} className={cx(formLabel, "mb-1.5 block")}>
            {t("confirm.code")}
          </label>
          <input
            ref={codeRef}
            id={id}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            className={cx(control, "h-12 w-full text-center text-2xl font-medium tabular-nums")}
            style={{ letterSpacing: "0.5em", paddingLeft: "0.5em" }}
            value={code}
            readOnly={busy}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 6);
              setCode(v);
              if (v.length === 6) void verify(v);
            }}
          />
        </div>
      )}
      <div className="mt-4 flex items-center gap-3">
        {!sent ? (
          <button type="button" className={cx(btnPrimary, "w-full")} disabled={busy || !token} onClick={() => void send()}>
            {busy && <Spinner />}
            {t("confirm.send")}
          </button>
        ) : (
          <>
            <button type="button" className={cx(btnPrimary, "flex-1")} disabled={busy || code.length !== 6} onClick={() => void verify()}>
              {busy && <Spinner />}
              {t("confirm.verify")}
            </button>
            {left > 0 ? (
              <span className="text-[13px] text-ink-muted tabular-nums">{t("confirm.resendIn", { s: left })}</span>
            ) : (
              <button type="button" className={textBtn} disabled={busy || !token} onClick={() => void send()}>
                {t("confirm.resend")}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/** A modal around OtpForm (re-auth over the current page, keeping whatever is open underneath). */
/**
 * SMS confirmation on top of everything. Step-up: Cancel, ✕ and Esc go back to the write dialog (its input
 * is kept). Re-auth (session expired): there is nothing to go back to, so the way out is Log out.
 */
export function OtpDialog({ title, last4, stepUp, onDone, onCancel, onLogout }: { title: string; last4: string; stepUp?: boolean; onDone: () => void; onCancel?: () => void; onLogout?: () => void }) {
  const t = useA();
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLButtonElement>(null);
  useDialog(ref, () => onCancel?.(), first);
  return (
    <div className={cx(modalBgTop, "z-[80]")} onClick={() => onCancel?.()}>
      <div ref={ref} className={modalNarrow} role="dialog" aria-modal="true" aria-labelledby="otp-title" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <h2 id="otp-title" className="mb-2 pt-2 text-[17px] font-medium text-navy-900">
            {title}
          </h2>
          {onCancel && (
            <button type="button" className="-mt-1 -mr-3 inline-flex size-11 flex-none cursor-pointer items-center justify-center rounded-full text-ink-muted hover:bg-sky-50" aria-label={t("dialog.close")} onClick={onCancel}>
              ✕
            </button>
          )}
        </div>
        <OtpForm last4={last4} stepUp={stepUp} onDone={onDone} />
        {(onCancel || onLogout) && (
          <div className="mt-3 flex justify-start">
            <button ref={first} type="button" className={btn} onClick={onCancel ?? onLogout}>
              {onCancel ? t("dialog.cancel") : t("denied.logout")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- the confirm-dialog pattern for every owner write ----
const newKey = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

export function ConfirmDialog({
  title,
  summary,
  children,
  valid = true,
  danger,
  action,
  stepUpNote,
  onSubmit,
  onClose,
}: {
  title: string;
  summary: [string, ReactNode][];
  children?: ReactNode;
  valid?: boolean;
  danger?: boolean;
  action: string;
  /** Shown when this action needs an SMS code. */
  stepUpNote?: string | null;
  /** Do the write with this reason and idempotency key; return the audit id. */
  onSubmit: (reason: string, key: string) => Promise<{ auditId?: number } | void>;
  onClose: () => void;
}) {
  const t = useA();
  const { stepUp, toast, bump, me } = useAdmin();
  const [reason, setReason] = useState("");
  const reasonRef = useRef<HTMLTextAreaElement>(null);
  // "Next: verify it's you" only when a code will actually be asked for (no step-up still valid).
  const stepUpValid = !!me.stepUpUntil && Date.parse(me.stepUpUntil) > Date.now() + 5_000;
  const note = stepUpValid ? null : stepUpNote;
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const key = useMemo(newKey, []); // one key per dialog: retries after step-up reuse it
  const ref = useRef<HTMLDivElement>(null);
  const typed = reason.length > 0;
  useDialog(ref, () => !busy && !typed && onClose());
  const reasonOk = reason.trim().length >= 10 && reason.trim().length <= 200;
  const reasonId = useId();

  async function go() {
    setBusy(true);
    setErr("");
    try {
      let r: { auditId?: number } | void;
      try {
        r = await onSubmit(reason.trim(), key);
      } catch (e) {
        if (!(e instanceof ApiError) || e.code !== "step_up_required") throw e;
        if (!(await stepUp())) {
          // Cancelled: back to this dialog with the reason and inputs as they were.
          setBusy(false);
          setTimeout(() => reasonRef.current?.focus(), 0);
          return;
        }
        r = await onSubmit(reason.trim(), key); // same key: replay-safe
      }
      bump();
      toast(t("toast.done", { id: r?.auditId ?? "–" }), 4000);
      onClose();
    } catch (e) {
      setErr(errText(t, e));
      setBusy(false);
    }
  }

  return (
    <div className={modalBgTop} onClick={() => !busy && !typed && onClose()}>
      <div
        ref={ref}
        className={cx(modalNarrow, "sm:w-[480px]")}
        role={danger ? "alertdialog" : "dialog"}
        aria-modal="true"
        aria-labelledby="cd-title"
        aria-describedby="cd-summary"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="cd-title" className="pt-2 text-[17px] font-medium text-navy-900">
            {title}
          </h2>
          <button type="button" className="-mt-1 -mr-3 inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-ink-muted hover:bg-sky-50" aria-label={t("dialog.close")} disabled={busy} onClick={onClose}>
            ✕
          </button>
        </div>
        {err && (
          <div className={errorBox} role="alert">
            {err}
          </div>
        )}
        <dl id="cd-summary" className="mt-3 rounded-card bg-sky-150 px-[13px] py-2 text-[15px] text-navy-900">
          {summary.map(([k, v]) => (
            <div key={k} className="flex gap-3 py-0.5">
              <dt className="w-28 flex-none text-ink-muted">{k}</dt>
              <dd className="min-w-0 font-medium tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 flex flex-col gap-3">{children}</div>
        <div className="mt-3">
          <div className="mb-1.5 flex items-baseline justify-between">
            <label htmlFor={reasonId} className={formLabel}>
              {t("dialog.reason")} *
            </label>
            <Counter n={reason.trim().length} max={200} />
          </div>
          <textarea
            ref={reasonRef}
            id={reasonId}
            rows={3}
            maxLength={400}
            readOnly={busy}
            className={cx(control, "h-auto min-h-[80px] w-full py-2 leading-normal")}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          {typed && !reasonOk && <p className={fieldErr}>{t("dialog.reasonMin")}</p>}
        </div>
        {note && <p className="mt-2 text-[13px] text-ink-muted">{note}</p>}
        <p className="mt-2 text-[13px] text-ink-muted">{t("dialog.auditNote")}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <button type="button" className={btn} disabled={busy} onClick={onClose}>
            {t("dialog.cancel")}
          </button>
          <button type="button" className={danger ? btnDanger : btnPrimary} disabled={busy || !valid || !reasonOk} onClick={() => void go()}>
            {busy && <Spinner />}
            {busy ? t("dialog.working") : note ? `${action} · ${t("dialog.next")}` : action}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- chips + formatting ----
export function BetStatus({ status, amount }: { status: string; amount?: number | null }) {
  const t = useA();
  const fmt = useFmt();
  if (status === "held")
    return (
      <span className={heldChip}>
        <span aria-hidden="true">!</span>
        {t("status.held")}
      </span>
    );
  const kind = status === "won" || status === "hit" || status === "paid" ? "won" : status === "lost" || status === "miss" || status === "refunded" || status === "disputed" ? "lost" : status === "void" || status === "expired" ? "refunded" : "pending";
  return (
    <span className={statusChip(kind)}>
      {t(`status.${status}`)}
      {status === "won" && amount ? ` +${fmt.num(amount)}` : ""}
    </span>
  );
}
export const FlagChip = () => {
  const t = useA();
  return (
    <span className={flagChip}>
      <span aria-hidden="true">⚑</span>
      {t("user.flagged")}
    </span>
  );
};
/** Signed credits: + in good, − (U+2212) in ink. */
export function Signed({ n }: { n: number }) {
  const fmt = useFmt();
  return <span className={cx("tabular-nums", n > 0 ? "text-good" : "text-ink")}>{n > 0 ? "+" : n < 0 ? "−" : ""}{fmt.num(Math.abs(n))}</span>;
}
export function useWhen() {
  const fmt = useFmt();
  return (iso: string | number | null | undefined, seconds = false) =>
    iso == null ? "–" : fmt.date(typeof iso === "number" ? new Date(iso).toISOString() : iso, { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", ...(seconds ? { second: "2-digit" } : {}), hour12: false });
}
export function CopyId({ id }: { id: string }) {
  const t = useA();
  const { toast } = useAdmin();
  return (
    <span className="inline-flex items-center gap-1">
      <code className="rounded-md bg-surface-2 px-1.5 py-px font-mono text-[12px]">{id.slice(0, 8)}</code>
      <button
        type="button"
        className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-ink-muted hover:bg-sky-50"
        aria-label={t("table.copyId")}
        onClick={() => void navigator.clipboard?.writeText(id).then(() => toast(t("toast.copied")))}
      >
        ⧉
      </button>
    </span>
  );
}
/** Internal admin link (real href, client-side navigation). */
export function ALink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  const { navigate } = useAdmin();
  return (
    <a
      href={to}
      className={className ?? "font-medium text-link hover:underline"}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

// ---- data table (server-side paging/sort/filters, state in the URL) ----
export interface Column<R> {
  key: string;
  label: string;
  render: (r: R) => ReactNode;
  num?: boolean;
  sort?: string;
}
export interface Filter {
  param: string;
  label: string;
  kind: "select" | "check" | "date" | "text";
  options?: [string, string][];
}

export function DataTable<R>({
  title,
  endpoint,
  columns,
  filters = [],
  search,
  rowKey,
  card,
  footer,
  prefix = "",
  extra,
  defaultSort,
  expanded,
}: {
  title: string;
  endpoint: string;
  columns: Column<R>[];
  filters?: Filter[];
  search?: boolean;
  rowKey: (r: R) => string;
  card?: (r: R) => ReactNode;
  footer?: (page: Page<R>) => ReactNode;
  /** URL param prefix (several tables on one page). */
  prefix?: string;
  extra?: ReactNode;
  defaultSort?: string;
  /** Inline detail rendered directly under its row (table) / inside its card (phones); null = collapsed. */
  expanded?: (r: R, variant: "row" | "card") => ReactNode | null;
}) {
  const t = useA();
  const fmt = useFmt();
  const { query, setQuery, version } = useAdmin();
  const p = (k: string) => query.get(prefix + k) ?? "";
  const [data, setData] = useState<Page<R> | null>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState(p("q"));
  const params = new URLSearchParams();
  for (const f of filters) if (p(f.param)) params.set(f.param, p(f.param));
  if (p("q")) params.set("q", p("q"));
  if (p("sort") || defaultSort) params.set("sort", p("sort") || defaultSort!);
  params.set("page", p("page") || "1");
  params.set("limit", p("limit") || "50");
  const url = `${endpoint}${endpoint.includes("?") ? "&" : "?"}${params.toString()}`;

  useEffect(() => {
    let live = true;
    setLoading(true);
    setErr("");
    adminCall<Page<R>>("GET", url)
      .then((d) => live && setData(d))
      .catch((e) => live && setErr(errText(t, e)))
      .finally(() => live && setLoading(false));
    return () => {
      live = false;
    };
  }, [url, version]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!search) return;
    const x = setTimeout(() => draft !== p("q") && setQuery({ [prefix + "q"]: draft || null, [prefix + "page"]: null }), 300);
    return () => clearTimeout(x);
  }, [draft]); // eslint-disable-line react-hooks/exhaustive-deps

  const page = Number(params.get("page"));
  const limit = Number(params.get("limit"));
  const total = data?.total ?? 0;
  const active = filters.some((f) => p(f.param)) || !!p("q");
  const [sortKey, sortDir] = (params.get("sort") ?? "").split(":");
  const capId = useId();

  return (
    <section className="min-w-0">
      <h2 className={cx(sectionHead, "justify-between")}>
        <span>{title}</span>
        {data && <span className="text-[13px] font-normal text-white/85 tabular-nums">{fmt.num(total)}</span>}
      </h2>
      <div className={sectionBody}>
        {(search || filters.length > 0 || extra) && (
          <div className="flex flex-wrap items-center gap-2 border-b border-line px-[13px] py-2.5">
            {search && (
              <input
                type="search"
                className={cx(control, "w-full sm:w-72")}
                placeholder={t("table.search")}
                aria-label={t("table.search")}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setQuery({ [prefix + "q"]: draft || null, [prefix + "page"]: null })}
              />
            )}
            {filters.map((f) =>
              f.kind === "select" ? (
                <select key={f.param} className={cx(control, "w-auto")} aria-label={f.label} value={p(f.param)} onChange={(e) => setQuery({ [prefix + f.param]: e.target.value || null, [prefix + "page"]: null })}>
                  <option value="">{`${f.label}: ${t("table.all")}`}</option>
                  {f.options!.map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              ) : f.kind === "check" ? (
                <label key={f.param} className="flex min-h-10 cursor-pointer items-center gap-2 text-[13px]">
                  <input type="checkbox" className="size-4 accent-navy-700" checked={p(f.param) === "1"} onChange={(e) => setQuery({ [prefix + f.param]: e.target.checked ? "1" : null, [prefix + "page"]: null })} />
                  {f.label}
                </label>
              ) : (
                <label key={f.param} className="flex items-center gap-1.5 text-[13px]">
                  {f.label}
                  <input
                    type={f.kind === "date" ? "date" : "text"}
                    className={cx(control, "w-40")}
                    value={p(f.param)}
                    onChange={(e) => setQuery({ [prefix + f.param]: e.target.value || null, [prefix + "page"]: null })}
                  />
                </label>
              )
            )}
            {active && (
              <button
                type="button"
                className={textBtn}
                onClick={() => {
                  setDraft("");
                  setQuery(Object.fromEntries([...filters.map((f) => [prefix + f.param, null]), [prefix + "q", null], [prefix + "page", null]]));
                }}
              >
                {t("table.clear")}
              </button>
            )}
            {extra && <div className="ml-auto flex items-center gap-2">{extra}</div>}
          </div>
        )}
        {err ? (
          <div className="p-[13px]">
            <div className={errorBox} role="alert">
              {err}
            </div>
            <button type="button" className={btn} onClick={() => setQuery({})}>
              {t("err.retry")}
            </button>
          </div>
        ) : (
          <>
            <div className={cx("overflow-x-auto", card && "hidden sm:block", loading && data && "opacity-60")} aria-busy={loading}>
              <table className={cx(table, tablePadTight, "text-[13px] [&_td]:h-11")}>
                <caption id={capId} className="sr-only">
                  {title}
                </caption>
                <thead>
                  <tr>
                    {columns.map((c) => (
                      <th key={c.key} scope="col" className={c.num ? "" : "text-left!"} aria-sort={c.sort ? (sortKey === c.sort ? (sortDir === "asc" ? "ascending" : "descending") : "none") : undefined}>
                        {c.sort ? (
                          <button
                            type="button"
                            className="-mx-1 inline-flex h-8 cursor-pointer items-center gap-1 rounded-xs px-1 hover:bg-sky-50"
                            onClick={() => setQuery({ [prefix + "sort"]: `${c.sort}:${sortKey === c.sort && sortDir === "desc" ? "asc" : "desc"}`, [prefix + "page"]: null })}
                          >
                            {c.label}
                            <span aria-hidden="true" className={sortKey === c.sort ? "text-navy-700" : "text-ink-muted"}>
                              {sortKey === c.sort ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
                            </span>
                          </button>
                        ) : (
                          c.label
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {!data
                    ? Array.from({ length: 6 }, (_, i) => (
                        <tr key={i}>
                          <td colSpan={columns.length}>
                            <div className="h-4 w-full rounded-xs bg-surface-2 motion-safe:animate-pulse" />
                          </td>
                        </tr>
                      ))
                    : data.items.map((r) => {
                        const more = expanded?.(r, "row");
                        return (
                          <Fragment key={rowKey(r)}>
                            <tr>
                              {columns.map((c) => (
                                <td key={c.key} className={c.num ? "tabular-nums" : "text-left! whitespace-normal! [overflow-wrap:anywhere]"}>
                                  {c.render(r)}
                                </td>
                              ))}
                            </tr>
                            {more && (
                              <tr>
                                <td colSpan={columns.length} className="text-left! whitespace-normal! [overflow-wrap:anywhere]">
                                  {more}
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        );
                      })}
                  {data && data.items.length === 0 && (
                    <tr>
                      <td colSpan={columns.length} className={cx(empty, "text-left!")}>
                        {active ? t("table.noMatch") : t("table.empty")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {card && data && (
              <ul className="flex flex-col gap-2 p-2 sm:hidden">
                {data.items.map((r) => (
                  <li key={rowKey(r)} className="min-w-0 rounded-card bg-surface px-[13px] py-2.5 shadow-card ring-1 ring-line [overflow-wrap:anywhere]">
                    {card(r)}
                    {expanded?.(r, "card")}
                  </li>
                ))}
                {data.items.length === 0 && <li className="p-4 text-center text-ink-muted">{active ? t("table.noMatch") : t("table.empty")}</li>}
              </ul>
            )}
            {data && footer?.(data)}
            {data && total > 0 && (
              <div className="flex flex-wrap items-center gap-3 border-t border-line px-[13px] py-2 text-[13px] text-ink-muted">
                <span className="tabular-nums">{t("table.range", { from: fmt.num((page - 1) * limit + 1), to: fmt.num(Math.min(total, page * limit)), total: fmt.num(total) })}</span>
                <label className="flex items-center gap-1.5">
                  {t("table.pageSize")}
                  <select className={cx(control, "w-20")} value={limit} onChange={(e) => setQuery({ [prefix + "limit"]: e.target.value, [prefix + "page"]: null })}>
                    {[25, 50, 100].map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
                <div className="ml-auto flex gap-2">
                  <button type="button" className={cx(btn, "h-9")} disabled={page <= 1} onClick={() => setQuery({ [prefix + "page"]: String(page - 1) })}>
                    ‹ {t("table.prev")}
                  </button>
                  <button type="button" className={cx(btn, "h-9")} disabled={page * limit >= total} onClick={() => setQuery({ [prefix + "page"]: String(page + 1) })}>
                    {t("table.next")} ›
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        <p className="sr-only" aria-live="polite">
          {data && !loading ? t("table.loaded", { n: data.items.length }) : ""}
        </p>
      </div>
    </section>
  );
}

/** Pill tabs (role=tablist) bound to a URL param. */
export function Tabs({ param, tabs }: { param: string; tabs: [string, string][] }) {
  const { query, setQuery } = useAdmin();
  const cur = query.get(param) ?? tabs[0]![0];
  return (
    <div role="tablist" className="flex flex-wrap gap-2" onKeyDown={(e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const i = tabs.findIndex(([k]) => k === cur);
      const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]![0];
      setQuery({ [param]: n });
    }}>
      {tabs.map(([k, label]) => (
        <button key={k} type="button" role="tab" aria-selected={cur === k} tabIndex={cur === k ? 0 : -1} className={cx(pill(cur === k), "h-9")} onClick={() => setQuery({ [param]: k })}>
          {label}
        </button>
      ))}
    </div>
  );
}
