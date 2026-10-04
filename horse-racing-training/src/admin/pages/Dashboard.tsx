// Dashboard (/admin): KPI tiles, attention banner, alerts, recent purchases and actions. Refreshes every 60 s.
import { useEffect, useState, type ReactNode } from "react";
import { cx, errorBox, figure, noticeBanner, sectionBody, sectionHead } from "../../kit";
import { useFmt } from "../../i18n/useLanguage";
import { adminCall } from "../api";
import { useA } from "../i18n";
import { kpiTile } from "../kit";
import { ALink, errText, useAdmin, useWhen } from "../ui";

interface Dash {
  members: { total: number; today: number };
  active: { total: number; live: number };
  livePending: { count: number; stake: number; held: number };
  creditsOutstanding: { balances: number; pendingStake: number };
  purchasesToday: { count: number; hkd: number };
  liveToday: { count: number; stake: number; returned: number };
  alerts: { key: string; kind: string; message: string; refType: string | null; refId: string | null; lastSeenAt: string }[];
  recentPurchases: { createdAt: number; planId: string; amountHkd: number; status: string; displayName: string | null }[];
  recentAudit: { id: number; createdAt: string; operator: string; action: string; outcome: string }[];
  system: { futureBetting: boolean; liveEnabled: boolean; stripeMode: string };
  smsAlerts?: { subscribers: number; sentToday: number; failedToday: number; skippedToday: number };
  serverTime: string;
}

export default function Dashboard() {
  const t = useA();
  const fmt = useFmt();
  const when = useWhen();
  const { version } = useAdmin();
  const [d, setD] = useState<Dash | null>(null);
  const [err, setErr] = useState("");
  const [at, setAt] = useState<Date | null>(null);
  const load = (background = false) =>
    adminCall<Dash>("GET", "/dashboard", undefined, undefined, { background })
      .then((x) => {
        setD(x);
        setAt(new Date());
        setErr("");
      })
      .catch((e) => {
        if (!background) setErr(errText(t, e)); // a failed auto-refresh keeps the last figures
      });
  // Auto-refresh every 60 s only while the tab is visible. Polls are marked as background so an unattended
  // dashboard still idles out after 1 h.
  useEffect(() => {
    void load();
    let x: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (x == null && document.visibilityState === "visible") x = setInterval(() => void load(true), 60_000);
    };
    const stop = () => {
      if (x != null) clearInterval(x);
      x = null;
    };
    const onVis = () => {
      if (document.visibilityState === "visible") {
        void load(true);
        start();
      } else stop();
    };
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

  const compact = (n: number) => (n >= 100_000 ? new Intl.NumberFormat(fmt.locale, { notation: "compact", maximumFractionDigits: 1 }).format(n) : fmt.num(n));
  const tile = (label: string, value: ReactNode, sub: ReactNode, href?: string) => {
    const body = (
      <>
        <span className="text-[13px] text-ink-muted">{label}</span>
        <span className={cx(figure, "mt-2 text-[22px] text-navy-900 lg:text-[28px]")}>{value}</span>
        <span className="mt-auto pt-2 text-[13px] text-ink">{sub}</span>
      </>
    );
    return href ? (
      <ALink to={href} className={cx(kpiTile, "hover:ring-1 hover:ring-navy-700/30")}>
        {body}
      </ALink>
    ) : (
      <div className={kpiTile}>{body}</div>
    );
  };
  const net = d ? d.liveToday.stake - d.liveToday.returned : 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3 pb-4">
        <h1 className="text-[22px] font-medium text-navy-900 lg:text-[26px]">{t("nav.dashboard")}</h1>
        <div className="flex items-center gap-2 text-[13px] text-ink-muted">
          {at && t("dash.updated", { time: fmt.date(at, { hour: "2-digit", minute: "2-digit", hour12: false }) })}
          <button type="button" className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full hover:bg-sky-50" aria-label={t("dash.refresh")} onClick={() => void load()}>
            ⟳
          </button>
        </div>
      </div>
      {err && (
        <div className={errorBox} role="alert">
          {err}
        </div>
      )}
      {d && (d.livePending.held > 0 || d.alerts.length > 0 || !d.system.futureBetting) && (
        <div className={cx(noticeBanner, "mb-4 flex-wrap")} role="status">
          <span aria-hidden="true" className="mt-0.5 inline-flex size-4 flex-none items-center justify-center bg-ink-strong text-[11px] font-bold text-gold">
            !
          </span>
          <span className="flex flex-wrap gap-x-3">
            {d.livePending.held > 0 && <ALink to="/admin/held">{t("dash.attentionHeld", { n: d.livePending.held })}</ALink>}
            {d.alerts.length > 0 && <span>{t("dash.attentionAlerts", { n: d.alerts.length })}</span>}
            {!d.system.futureBetting && <span>{t("dash.killSwitch")}</span>}
          </span>
        </div>
      )}
      {d && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tile(t("dash.members"), compact(d.members.total), t("dash.membersNew", { n: fmt.num(d.members.today) }), "/admin/users")}
          {tile(t("dash.active"), fmt.num(d.active.total), t("dash.activeLive", { n: fmt.num(d.active.live) }))}
          {tile(t("dash.outstanding"), compact(d.creditsOutstanding.balances), t("dash.outstandingPending", { n: fmt.num(d.creditsOutstanding.pendingStake) }), "/admin/ledger")}
          {tile(t("dash.purchases"), `HK$${fmt.num(d.purchasesToday.hkd)}`, t("dash.purchasesSub", { count: fmt.num(d.purchasesToday.count) }), "/admin/purchases")}
          {tile(t("dash.liveBets"), fmt.num(d.livePending.count), t("dash.liveHeld", { n: fmt.num(d.livePending.held) }), "/admin/bets?status=pending&mode=live")}
          {tile(t("dash.stake"), compact(d.liveToday.stake), t("dash.stakeSub", { n: fmt.num(d.liveToday.count) }))}
          {tile(t("dash.payout"), compact(d.liveToday.returned), <span className={net >= 0 ? "text-good" : "text-bad"}>{t("dash.net", { n: `${net >= 0 ? "+" : "−"}${fmt.num(Math.abs(net))}` })}</span>)}
          {tile(
            t("dash.system"),
            d.alerts.length ? <span className="text-bad">! {t("sys.problem")}</span> : <span className="text-good">✓ {t("dash.systemOk")}</span>,
            d.alerts.length ? t("dash.systemAlerts", { n: d.alerts.length }) : t(`stripe.${d.system.stripeMode}`),
            "/admin/system"
          )}
          {d.smsAlerts &&
            tile(
              t("dash.sms"),
              fmt.num(d.smsAlerts.sentToday),
              <span className={d.smsAlerts.failedToday ? "text-bad" : undefined}>
                {t("dash.smsSub", { subs: fmt.num(d.smsAlerts.subscribers), failed: fmt.num(d.smsAlerts.failedToday), skipped: fmt.num(d.smsAlerts.skippedToday) })}
              </span>,
              "/admin/system"
            )}
        </div>
      )}
      {d && (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <section>
            <h2 className={sectionHead}>{t("dash.alerts")}</h2>
            <ul className={sectionBody}>
              {d.alerts.length === 0 && <li className="px-[13px] py-3 text-[13px] text-ink-muted">{t("dash.noAlerts")}</li>}
              {d.alerts.map((a) => (
                <li key={a.key} className="border-b border-line px-[13px] py-2 text-[13px] last:border-b-0">
                  <div className="text-ink">{a.message}</div>
                  <div className="text-ink-muted">
                    {when(a.lastSeenAt)}
                    {a.refType === "bet" && a.refId && (
                      <>
                        {" · "}
                        <ALink to="/admin/held">{t("dash.view")}</ALink>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className={sectionHead}>{t("dash.recentAudit")}</h2>
            <ul className={sectionBody}>
              {d.recentAudit.map((a) => (
                <li key={a.id} className="flex gap-3 border-b border-line px-[13px] py-2 text-[13px] last:border-b-0">
                  <span className="text-ink-muted tabular-nums">{when(a.createdAt)}</span>
                  <span className="min-w-0 flex-1 truncate">
                    {a.operator} · {t(`audit.action.${a.action}`, { defaultValue: a.action })}
                    {a.outcome === "refused" && <span className="ml-1 text-bad">✕ {t("audit.denied")}</span>}
                  </span>
                </li>
              ))}
              {d.recentAudit.length === 0 && <li className="px-[13px] py-3 text-[13px] text-ink-muted">{t("table.empty")}</li>}
            </ul>
          </section>
          <section className="lg:col-span-2">
            <h2 className={sectionHead}>{t("dash.recentPurchases")}</h2>
            <ul className={sectionBody}>
              {d.recentPurchases.map((p, i) => (
                <li key={i} className="flex gap-3 border-b border-line px-[13px] py-2 text-[13px] last:border-b-0">
                  <span className="text-ink-muted tabular-nums">{when(p.createdAt)}</span>
                  <span className="min-w-0 flex-1 truncate">{p.displayName ?? "–"}</span>
                  <span className="tabular-nums">HK${p.amountHkd}</span>
                  <span>{t(`status.${p.status}`)}</span>
                </li>
              ))}
              {d.recentPurchases.length === 0 && <li className="px-[13px] py-3 text-[13px] text-ink-muted">{t("table.empty")}</li>}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
