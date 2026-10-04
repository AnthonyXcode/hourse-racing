// Audit log (/admin/audit), Access log (/admin/access, owner) and System (/admin/system).
import { useEffect, useRef, useState, type ReactNode } from "react";
import { btn, cx, errorBox, noticeBanner, sectionBody, sectionHead } from "../../kit";
import { Spinner } from "../../members/ui";
import { useFmt } from "../../i18n/useLanguage";
import { adminCall } from "../api";
import { useA } from "../i18n";
import { roleBadge } from "../kit";
import { ALink, DataTable, errText, useAdmin, useWhen } from "../ui";

interface AuditRow {
  id: number;
  createdAt: string;
  source: string;
  operator: string;
  actorRole: string | null;
  action: string;
  targetType: string | null;
  targetId: string | null;
  reason: string;
  outcome: "ok" | "refused";
  self: boolean;
  before: unknown;
  after: unknown;
  args: unknown;
  ip: string | null;
  userAgent: string | null;
}

export function AuditPage() {
  const t = useA();
  const when = useWhen();
  // The diff opens inline directly under its row (card on phones), takes focus, and the toggle exposes
  // aria-expanded / aria-controls (docs/admin/QA-REPORT.md AD-07).
  const [openId, setOpenId] = useState<number | null>(null);
  const toggle = (r: AuditRow, variant: "row" | "card") => ({
    id: `audit-toggle-${variant}-${r.id}`,
    "aria-expanded": openId === r.id,
    "aria-controls": `audit-detail-${variant}-${r.id}`,
    onClick: () => setOpenId((x) => (x === r.id ? null : r.id)),
  });
  const actions = ["credit_adjust", "role_change", "flag", "unflag", "bet_resolve", "void_race", "void_meeting", "owner_changed"];
  const actor = (r: AuditRow) =>
    r.source === "system" ? t("audit.system") : r.source === "cli" ? `${t("audit.cli")} · ${r.operator}` : (
      <span className="inline-flex items-center gap-1.5">
        {r.operator}
        {(r.actorRole === "owner" || r.actorRole === "admin") && <span className={roleBadge(r.actorRole)}>{t(r.actorRole === "owner" ? "role.owner" : "role.adminShort")}</span>}
      </span>
    );
  return (
    <div>
      <h1 className="pb-4 text-[22px] font-medium text-navy-900 lg:text-[26px]">{t("audit.title")}</h1>
      <DataTable<AuditRow>
        title={t("audit.title")}
        endpoint="/audit"
        rowKey={(r) => String(r.id)}
        filters={[
          { param: "action", label: t("filter.action"), kind: "select", options: actions.map((a) => [a, t(`audit.action.${a}`)]) },
          { param: "actor", label: t("filter.actor"), kind: "text" },
          { param: "from", label: t("table.from"), kind: "date" },
          { param: "to", label: t("table.to"), kind: "date" },
        ]}
        columns={[
          { key: "time", label: t("col.time"), render: (r) => when(r.createdAt, true) },
          { key: "actor", label: t("col.actor"), render: actor },
          {
            key: "action",
            label: t("col.action"),
            render: (r) => (
              <span>
                {t(`audit.action.${r.action}`, { defaultValue: r.action })}
                {r.self && <span className="ml-1 text-ink-muted">({t("audit.self")})</span>}
                {r.outcome === "refused" && <span className="ml-1 text-bad">✕ {t("audit.denied")}</span>}
              </span>
            ),
          },
          { key: "target", label: t("col.target"), render: (r) => (r.targetType === "user" && r.targetId ? <ALink to={`/admin/users/${r.targetId}`}>{r.targetId.slice(0, 8)}</ALink> : r.targetId ?? "–") },
          { key: "reason", label: t("col.reason"), render: (r) => <span className="line-clamp-1 max-w-[40ch]" title={r.reason}>{r.reason}</span> },
          {
            key: "x",
            label: "",
            render: (r) => (
              <button type="button" className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full hover:bg-sky-50" aria-label={t("audit.expand")} {...toggle(r, "row")}>
                <span aria-hidden="true">{openId === r.id ? "▾" : "▸"}</span>
              </button>
            ),
          },
        ]}
        card={(r) => (
          <button type="button" className="w-full min-w-0 cursor-pointer text-left [overflow-wrap:anywhere]" {...toggle(r, "card")}>
            <div className="text-[13px] text-ink-muted">{when(r.createdAt, true)}</div>
            <div className="font-medium">{t(`audit.action.${r.action}`, { defaultValue: r.action })}{r.outcome === "refused" && <span className="ml-1 text-bad">✕</span>}</div>
            <div className="text-[13px]">{r.operator} · {r.reason}</div>
          </button>
        )}
        expanded={(r, variant) =>
          openId === r.id ? (
            <AuditDetail
              id={`audit-detail-${variant}-${r.id}`}
              row={r}
              onClose={() => {
                setOpenId(null);
                setTimeout(() => document.getElementById(`audit-toggle-${variant}-${r.id}`)?.focus(), 0);
              }}
            />
          ) : null
        }
      />
    </div>
  );
}

function AuditDetail({ id, row, onClose }: { id: string; row: AuditRow; onClose: () => void }) {
  const t = useA();
  const [raw, setRaw] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.offsetParent !== null) el.focus(); // only the visible copy (table on desktop, card on phones)
  }, []);
  const diff = (b: unknown, a: unknown) => {
    const keys = [...new Set([...Object.keys((b as object) ?? {}), ...Object.keys((a as object) ?? {})])];
    return keys.map((k) => [k, (b as Record<string, unknown>)?.[k], (a as Record<string, unknown>)?.[k]] as const);
  };
  return (
    <section ref={ref} id={id} tabIndex={-1} className="my-2 min-w-0 rounded-card bg-sky-50 p-[13px] text-[13px] ring-1 ring-navy-700/20 [overflow-wrap:anywhere] focus:outline-2 focus:outline-navy-700" aria-label={t("audit.expand")}>
      <div className="flex items-center justify-between">
        <strong>#{row.id} · {t(`audit.action.${row.action}`, { defaultValue: row.action })}</strong>
        <button type="button" className="cursor-pointer text-link hover:underline" onClick={onClose}>
          {t("dialog.close")}
        </button>
      </div>
      <ul className="mt-2 tabular-nums">
        {diff(row.before, row.after).map(([k, b, a]) => (
          <li key={k}>
            {k}: {b !== undefined && <span className="text-ink-muted line-through">{JSON.stringify(b)}</span>} → {JSON.stringify(a)}
          </li>
        ))}
      </ul>
      <p className="mt-1 text-ink-muted">
        {row.source} · IP {row.ip ?? "–"} · {row.userAgent ?? "–"}
      </p>
      <button type="button" className="mt-1 cursor-pointer text-link hover:underline" onClick={() => setRaw((x) => !x)}>
        {t("audit.raw")}
      </button>
      {raw && <pre className="mt-1 max-w-full overflow-x-auto rounded-md bg-surface-2 p-2 font-mono text-[12px]">{JSON.stringify(row, null, 2)}</pre>}
    </section>
  );
}

interface AccessRow {
  id: number;
  createdAt: string;
  actorName: string | null;
  actorRole: string;
  kind: string;
  targetId: string | null;
  targetName: string | null;
  detail: string | null;
  ip: string | null;
}
export function AccessPage() {
  const t = useA();
  const when = useWhen();
  return (
    <div>
      <h1 className="pb-4 text-[22px] font-medium text-navy-900 lg:text-[26px]">{t("access.title")}</h1>
      <DataTable<AccessRow>
        title={t("access.title")}
        endpoint="/access-log"
        rowKey={(r) => String(r.id)}
        columns={[
          { key: "time", label: t("col.time"), render: (r) => when(r.createdAt, true) },
          { key: "actor", label: t("col.actor"), render: (r) => <span className="inline-flex items-center gap-1.5">{r.actorName ?? "–"} <span className={roleBadge(r.actorRole === "owner" ? "owner" : "admin")}>{t(r.actorRole === "owner" ? "role.owner" : "role.adminShort")}</span></span> },
          { key: "kind", label: t("col.kindAccess"), render: (r) => t(`access.kind.${r.kind}`, { defaultValue: r.kind }) },
          { key: "target", label: t("col.target"), render: (r) => (r.targetId ? <ALink to={`/admin/users/${r.targetId}`}>{r.targetName ?? r.targetId.slice(0, 8)}</ALink> : "–") },
          { key: "detail", label: t("col.detail"), render: (r) => r.detail ?? "–" },
          { key: "ip", label: t("col.ip"), render: (r) => r.ip ?? "–" },
        ]}
      />
    </div>
  );
}

interface Sys {
  futureBetting: boolean;
  liveEnabled: boolean;
  dataFetch: boolean;
  devNow: string | null;
  stripeMode: "test" | "live" | "none";
  stripeLiveApproved: boolean;
  webhookSecretSet: boolean;
  dailyCapHkd: number;
  maxStake: number;
  signupBonus: number;
  lastSweep: { value: { settled: number; held: number; failed: number }; updatedAt: string } | null;
  lastReconcile: { value: { ok: boolean; issues: string[] }; updatedAt: string } | null;
  lastWebhook: string | null;
  lastCheckout: string | null;
  pendingOver2h: number;
  serverTime: string;
  lastFetchRun?: { started_at?: string; finished_at?: string; ok?: number | null } | null;
  appVersion?: string | null;
}

export function SystemPage() {
  const t = useA();
  const fmt = useFmt();
  const when = useWhen();
  const { toast, version } = useAdmin();
  const [s, setS] = useState<Sys | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [issues, setIssues] = useState<string[] | null>(null);
  const load = () => adminCall<Sys>("GET", "/system").then(setS).catch((e) => setErr(errText(t, e)));
  useEffect(() => {
    void load();
  }, [version]); // eslint-disable-line react-hooks/exhaustive-deps
  const mark = (ok: boolean | null) =>
    ok === null ? <span className="text-ink-muted">– {t("sys.off")}</span> : ok ? <span className="text-good">✓ {t("sys.ok")}</span> : <span className="text-bad">! {t("sys.problem")}</span>;
  const onOff = (v: boolean) => (v ? <span className="text-good">✓ {t("sys.on")}</span> : <span className="text-ink-muted">– {t("sys.off")}</span>);
  const row = (k: string, v: ReactNode) => (
    <div className="flex min-h-11 items-center justify-between gap-3 border-b border-line px-[13px] last:border-b-0">
      <span className="text-[15px]">{k}</span>
      <span className="text-right text-[15px] tabular-nums">{v}</span>
    </div>
  );
  const card = (title: string, body: ReactNode, foot?: ReactNode) => (
    <section>
      <h2 className={sectionHead}>{title}</h2>
      <div className={sectionBody}>
        {body}
        {foot && <div className="px-[13px] py-2 text-[13px] text-ink-muted">{foot}</div>}
      </div>
    </section>
  );
  return (
    <div>
      <h1 className="pb-4 text-[22px] font-medium text-navy-900 lg:text-[26px]">{t("nav.system")}</h1>
      {err && <div className={errorBox}>{err}</div>}
      {s && !s.futureBetting && (
        <div className={cx(noticeBanner, "mb-4")} role="status">
          {t("dash.killSwitch")}
        </div>
      )}
      {s && (
        <div className="grid gap-4 lg:grid-cols-2">
          {card(
            t("sys.flags"),
            <>
              {row(t("sys.futureBetting"), onOff(s.futureBetting))}
              {row(t("sys.liveEnabled"), onOff(s.liveEnabled))}
              {row(t("sys.dataFetch"), onOff(s.dataFetch))}
              {s.devNow && row(t("sys.devNow"), s.devNow)}
              {row(t("sys.dailyCap"), `HK$${fmt.num(s.dailyCapHkd)}`)}
              {row(t("sys.maxStake"), fmt.num(s.maxStake))}
              {row(t("sys.signupBonus"), fmt.num(s.signupBonus))}
            </>,
            t("sys.flagsNote")
          )}
          {card(
            t("sys.stripe"),
            <>
              {row(t("sys.mode"), t(`stripe.${s.stripeMode}`))}
              {row(t("sys.liveApproved"), onOff(s.stripeLiveApproved))}
              {row(t("sys.webhookSecret"), s.webhookSecretSet ? mark(true) : mark(null))}
              {row(t("sys.lastWebhook"), s.lastWebhook ? when(s.lastWebhook) : t("sys.never"))}
              {row(t("sys.lastCheckout"), s.lastCheckout ? when(s.lastCheckout) : t("sys.never"))}
            </>
          )}
          {card(
            t("sys.jobs"),
            <>
              {row(t("sys.lastFetch"), s.lastFetchRun?.started_at ? <>{when(s.lastFetchRun.started_at)} {mark(s.lastFetchRun.ok == null ? null : !!s.lastFetchRun.ok)}</> : t("sys.never"))}
              {row(t("sys.lastSweep"), s.lastSweep ? `${when(s.lastSweep.updatedAt)} · ${s.lastSweep.value.settled}/${s.lastSweep.value.held}/${s.lastSweep.value.failed}` : t("sys.never"))}
              {row(t("sys.pendingOver2h"), s.pendingOver2h > 0 ? <span className="text-bad">! {fmt.num(s.pendingOver2h)}</span> : mark(true))}
              {row(t("sys.serverTime"), when(s.serverTime, true))}
              {row(t("sys.version"), s.appVersion ?? "–")}
            </>
          )}
          {card(
            t("sys.reconcile"),
            <>
              {row(t("sys.reconcile"), s.lastReconcile ? <>{when(s.lastReconcile.updatedAt)} {s.lastReconcile.value.ok ? <span className="text-good">✓ {t("sys.allMatch")}</span> : <span className="text-bad">! {t("sys.mismatches", { n: s.lastReconcile.value.issues.length })}</span>}</> : t("sys.never"))}
              {issues && issues.length > 0 && (
                <ul className="px-[13px] py-2 text-[13px] text-bad">
                  {issues.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              )}
              <div className="px-[13px] py-3">
                <button
                  type="button"
                  className={btn}
                  disabled={busy}
                  onClick={async () => {
                    setBusy(true);
                    try {
                      const r = await adminCall<{ ok: boolean; issues: string[] }>("POST", "/reconcile", {});
                      setIssues(r.issues);
                      toast(t("toast.reconciled"));
                      await load();
                    } catch (e) {
                      setErr(errText(t, e));
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  {busy && <Spinner />}
                  {t("sys.reconcileNow")}
                </button>
              </div>
            </>
          )}
        </div>
      )}
      <SmsLog />
    </div>
  );
}

interface SmsRow {
  id: number;
  createdAt: string;
  date: string;
  venue: string;
  kind: "pre" | "post" | "stop";
  status: "pending" | "sent" | "failed" | "skipped";
  error: string | null;
  phone: string | null;
  displayName: string | null;
}
/** 5★ pick SMS alerts: the latest sends (read-only, phones masked). */
function SmsLog() {
  const t = useA();
  const when = useWhen();
  const { version } = useAdmin();
  const [d, setD] = useState<{ subscribers: number; items: SmsRow[] } | null>(null);
  const [err, setErr] = useState("");
  useEffect(() => {
    adminCall<{ subscribers: number; items: SmsRow[] }>("GET", "/sms-log")
      .then(setD)
      .catch((e) => setErr(errText(t, e)));
  }, [version]); // eslint-disable-line react-hooks/exhaustive-deps
  const tone = (s: SmsRow["status"]) => (s === "sent" ? "text-good" : s === "failed" ? "text-bad" : "text-ink-muted");
  return (
    <section className="mt-4">
      <h2 className={sectionHead}>{t("sms.title")}</h2>
      <div className={sectionBody}>
        {err && <div className={cx(errorBox, "mx-[13px]")}>{err}</div>}
        {d && (
          <>
            <p className="px-[13px] pt-2 text-[13px] text-ink-muted">{t("sms.subscribers", { n: d.subscribers })}</p>
            {d.items.length === 0 ? (
              <p className="p-6 text-center text-ink-muted">{t("sms.empty")}</p>
            ) : (
              <ul className="flex flex-col">
                {d.items.map((r) => (
                  <li key={r.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 border-t border-line px-[13px] py-2 text-[13px] [overflow-wrap:anywhere]">
                    <span className="text-ink-muted tabular-nums">{when(r.createdAt, true)}</span>
                    <span className="font-medium">{t(`sms.kind.${r.kind}`)}</span>
                    <span>
                      {r.date} {r.venue}
                    </span>
                    <span className="tabular-nums">{r.phone ?? "–"}</span>
                    <span className={cx("font-medium", tone(r.status))}>{t(`sms.status.${r.status}`)}</span>
                    {r.error && <span className="basis-full text-ink-muted">{r.error}</span>}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}
