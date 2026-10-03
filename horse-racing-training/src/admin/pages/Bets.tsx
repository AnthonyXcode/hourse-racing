// Bets (/admin/bets), Held bets (/admin/held) and Races (/admin/races, with the owner's void actions).
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SettleDetail } from "../../../shared/types";
import { settleText } from "../../ui";
import { btn, btnDanger, control, cx, errorBox, modalBgTop, modalNarrow, modeBadge, panel, sectionBody, sectionHead, table, tablePadTight } from "../../kit";
import { useDialog } from "../../members/ui";
import { useFmt } from "../../i18n/useLanguage";
import { useGlossary } from "../../i18n/glossary";
import { ymd } from "../../slip";
import { adminCall } from "../api";
import { useA } from "../i18n";
import { heldChip } from "../kit";
import { ALink, BetStatus, ConfirmDialog, DataTable, errText, useAdmin, useWhen } from "../ui";

interface BetRow {
  id: string;
  userId: string;
  displayName: string | null;
  mode: "live" | "practice";
  placedAt: string;
  date: string;
  venue: string;
  betType: string;
  picks: string;
  cost: number;
  payout: number | null;
  status: string;
}
interface LiveDetail {
  id: string;
  userId: string;
  displayName: string | null;
  date: string;
  venue: string;
  betType: string;
  picks: string;
  unit: number;
  combos: number;
  stake: number;
  status: string;
  payout: number;
  refund: number;
  holdReason: string | null;
  attempts: number;
  result: { detail?: string; detailInfo?: SettleDetail; combosWon?: number; poolDividendText?: string } | null;
  createdAt: string;
  heldSince?: string | null;
  held: boolean;
  races: number[];
}

/** Picks and engine explanations in the UI language (the engine's own text is English; 膽/腳 → B/L in en). */
function useBetText() {
  const { t } = useTranslation(["bet", "common"]);
  return {
    picks: (p: string) => p.replaceAll("膽", t("common:role.bankerShort")).replaceAll("腳", t("common:role.legShort")),
    detail: (r: LiveDetail["result"]) => (r ? settleText(r.detailInfo, t) || (r.detailInfo ? "" : r.detail ?? "") : ""),
  };
}

export function BetsPage() {
  const t = useA();
  const bt = useBetText();
  const fmt = useFmt();
  const g = useGlossary();
  const when = useWhen();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      <h1 className="pb-4 text-[22px] font-medium text-navy-900 lg:text-[26px]">{t("nav.bets")}</h1>
      <DataTable<BetRow>
        title={t("nav.bets")}
        endpoint="/bets"
        rowKey={(r) => `${r.mode}:${r.id}`}
        filters={[
          { param: "mode", label: t("filter.mode"), kind: "select", options: [["live", t("mode.live")], ["practice", t("mode.practice")]] },
          { param: "status", label: t("filter.status"), kind: "select", options: ["pending", "held", "won", "lost", "void", "hit", "miss"].map((s) => [s, t(`status.${s}`)]) },
          { param: "venue", label: t("filter.venue"), kind: "select", options: [["ST", g.venue("ST")], ["HV", g.venue("HV")]] },
          { param: "date", label: t("filter.date"), kind: "text" },
          { param: "raceNo", label: t("filter.raceNo"), kind: "text" },
        ]}
        columns={[
          { key: "placed", label: t("col.time"), render: (r) => when(r.placedAt) },
          { key: "user", label: t("col.user"), render: (r) => <ALink to={`/admin/users/${r.userId}`}>{r.displayName ?? r.userId.slice(0, 8)}</ALink> },
          { key: "meeting", label: t("col.meeting"), render: (r) => `${fmt.date(ymd(r.date), { month: "numeric", day: "numeric" })} ${g.venue(r.venue)}` },
          { key: "mode", label: t("col.mode"), render: (r) => <span className={modeBadge(r.mode, "white")}>{t(`mode.${r.mode}`)}</span> },
          { key: "bet", label: t("col.bet"), render: (r) => (r.mode === "live" ? <button type="button" className="cursor-pointer text-link hover:underline" onClick={() => setOpen(r.id)}>{g.betType(r.betType as never)}</button> : g.betType(r.betType as never)) },
          { key: "picks", label: t("col.picks"), render: (r) => <span title={bt.picks(r.picks)} className="line-clamp-1 max-w-[28ch]">{bt.picks(r.picks)}</span> },
          { key: "stake", label: t("col.stake"), num: true, render: (r) => (r.mode === "live" ? fmt.num(r.cost) : fmt.money(r.cost)) },
          { key: "status", label: t("col.status"), render: (r) => <BetStatus status={r.status} /> },
          { key: "payout", label: t("col.payout"), num: true, render: (r) => (r.payout == null ? "–" : r.mode === "live" ? fmt.num(r.payout) : fmt.money(r.payout)) },
        ]}
        card={(r) => (
          <>
            <div className="flex items-center gap-2">
              <span className={modeBadge(r.mode, "white")}>{t(`mode.${r.mode}`)}</span>
              <span className="font-medium">{g.betType(r.betType as never)}</span>
              <span className="ml-auto">
                <BetStatus status={r.status} />
              </span>
            </div>
            <div className="text-[13px] text-ink-muted">
              {when(r.placedAt)} · {r.displayName ?? "–"} · {bt.picks(r.picks)}
            </div>
          </>
        )}
      />
      {open && <BetDrawer id={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function BetDrawer({ id, onClose }: { id: string; onClose: () => void }) {
  const t = useA();
  const bt = useBetText();
  const fmt = useFmt();
  const [b, setB] = useState<LiveDetail | null>(null);
  const [err, setErr] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, onClose);
  useEffect(() => {
    adminCall<LiveDetail>("GET", `/bets/${encodeURIComponent(id)}`)
      .then(setB)
      .catch((e) => setErr(errText(t, e)));
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={modalBgTop} onClick={onClose}>
      <div ref={ref} className={cx(modalNarrow, "sm:w-[520px]")} role="dialog" aria-modal="true" aria-labelledby="bd-title" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <h2 id="bd-title" className="pt-2 text-[17px] font-medium text-navy-900">
            {t("bets.detail")}
          </h2>
          <button type="button" className="-mt-1 -mr-3 inline-flex size-11 cursor-pointer items-center justify-center rounded-full hover:bg-sky-50" aria-label={t("dialog.close")} onClick={onClose}>
            ✕
          </button>
        </div>
        {err && <div className={errorBox}>{err}</div>}
        {b && (
          <dl className="mt-2 grid grid-cols-[8rem_1fr] gap-y-1 text-[15px]">
            <dt className="text-ink-muted">{t("bets.selection")}</dt>
            <dd>{bt.picks(b.picks)}</dd>
            <dt className="text-ink-muted">{t("col.stake")}</dt>
            <dd className="tabular-nums">
              {fmt.num(b.unit)} × {fmt.num(b.combos)} = {fmt.num(b.stake)}
            </dd>
            <dt className="text-ink-muted">{t("col.status")}</dt>
            <dd>
              <BetStatus status={b.held ? "held" : b.status} amount={b.payout} />
            </dd>
            <dt className="text-ink-muted">{t("bets.refund")}</dt>
            <dd className="tabular-nums">{fmt.num(b.refund)}</dd>
            {b.holdReason && (
              <>
                <dt className="text-ink-muted">{t("bets.holdReason")}</dt>
                <dd>{t(`held.reason.${b.holdReason}`, { defaultValue: b.holdReason })}</dd>
              </>
            )}
            <dt className="text-ink-muted">{t("bets.attempts")}</dt>
            <dd className="tabular-nums">{b.attempts}</dd>
            {b.result && (
              <>
                <dt className="text-ink-muted">{t("bets.settleResult")}</dt>
                <dd className="text-[13px]">
                  {bt.detail(b.result)} {b.result.poolDividendText ? `· ${b.result.poolDividendText}` : ""}
                </dd>
              </>
            )}
          </dl>
        )}
      </div>
    </div>
  );
}

export function HeldPage() {
  const t = useA();
  const bt = useBetText();
  const fmt = useFmt();
  const g = useGlossary();
  const when = useWhen();
  const { isOwner, version } = useAdmin();
  const [items, setItems] = useState<LiveDetail[] | null>(null);
  const [err, setErr] = useState("");
  const [act, setAct] = useState<{ bet: LiveDetail; kind: "settle" | "dividend" | "void" } | null>(null);
  useEffect(() => {
    adminCall<{ items: LiveDetail[] }>("GET", "/held")
      .then((r) => setItems(r.items))
      .catch((e) => setErr(errText(t, e)));
  }, [version]); // eslint-disable-line react-hooks/exhaustive-deps
  const age = (iso?: string | null) => {
    if (!iso) return "–";
    const m = Math.floor((Date.now() - Date.parse(iso)) / 60_000);
    return m >= 60 ? t("held.ageHM", { h: Math.floor(m / 60), m: m % 60 }) : t("held.ageM", { m });
  };
  return (
    <div>
      <h1 className="pb-4 text-[22px] font-medium text-navy-900 lg:text-[26px]">
        {t("held.title")} {items && <span className="text-[15px] text-ink-muted">{fmt.num(items.length)}</span>}
      </h1>
      {!isOwner && <p className="mb-3 text-[13px] text-ink-muted">{t("readOnly")}</p>}
      {err && <div className={errorBox}>{err}</div>}
      {items?.length === 0 && <p className={cx(panel, "text-ink-muted")}>{t("held.empty")}</p>}
      <div className="flex flex-col gap-3">
        {items?.map((b) => (
          <article key={b.id} className={cx(panel, "ring-1 ring-bad/30")}>
            <div className="flex flex-wrap items-center gap-2 text-[13px]">
              <span className={heldChip}>! {t("status.held")}</span>
              <span className="font-medium">{t(`held.reason.${b.holdReason}`, { defaultValue: b.holdReason ?? "" })}</span>
              <span className={cx("text-ink-muted", b.heldSince && Date.now() - Date.parse(b.heldSince) > 86_400_000 && "text-bad")}>· {t("held.age", { time: age(b.heldSince), n: b.attempts })}</span>
            </div>
            <h2 className="mt-1 text-[15px] font-medium text-navy-900">
              {g.betType(b.betType as never)} · {fmt.date(ymd(b.date), { month: "numeric", day: "numeric" })} {g.venue(b.venue)} {b.races.map((n) => `R${n}`).join("+")} ·{" "}
              <ALink to={`/admin/users/${b.userId}`}>{b.displayName ?? "–"}</ALink> · {fmt.num(b.unit)} × {fmt.num(b.combos)} = {fmt.num(b.stake)}
            </h2>
            <p className="mt-1 text-[13px] text-ink">{bt.picks(b.picks)}</p>
            {bt.detail(b.result) && <p className="mt-1 text-[13px] text-ink-muted">{bt.detail(b.result)}</p>}
            <p className="text-[13px] text-ink-muted">{when(b.createdAt)}</p>
            {isOwner && (
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" className={btn} onClick={() => setAct({ bet: b, kind: "settle" })}>
                  {t("held.settle")}
                </button>
                <button type="button" className={btn} onClick={() => setAct({ bet: b, kind: "dividend" })}>
                  {t("held.dividend")}
                </button>
                <button type="button" className={cx(btnDanger, "sm:ml-auto")} onClick={() => setAct({ bet: b, kind: "void" })}>
                  {t("held.void")}
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
      {act && <ResolveDialog bet={act.bet} kind={act.kind} onClose={() => setAct(null)} />}
    </div>
  );
}

function ResolveDialog({ bet, kind, onClose }: { bet: LiveDetail; kind: "settle" | "dividend" | "void"; onClose: () => void }) {
  const t = useA();
  const bt = useBetText();
  const fmt = useFmt();
  const [div, setDiv] = useState("");
  const d = Number(div);
  const ok = kind !== "dividend" || (/^\d+(\.\d{1,2})?$/.test(div) && d >= 0);
  return (
    <ConfirmDialog
      title={kind === "void" ? t("held.void").replace("…", "") : kind === "dividend" ? t("held.dividend").replace("…", "") : t("held.settle").replace("…", "")}
      danger={kind === "void"}
      valid={ok}
      action={kind === "void" ? t("settleDlg.voidBtn") : kind === "dividend" ? t("settleDlg.dividendBtn") : t("settleDlg.btn")}
      summary={[
        [t("dialog.user"), bet.displayName ?? "–"],
        [t("col.bet"), bt.picks(bet.picks)],
        [t("col.stake"), `${fmt.num(bet.stake)}`],
        ...(kind === "dividend" && ok && div ? [[t("col.payout"), fmt.num(Math.floor((d * bet.unit) / 10))] as [string, string]] : []),
      ]}
      onClose={onClose}
      onSubmit={(reason, key) =>
        adminCall<{ auditId: number }>("POST", `/live-bets/${encodeURIComponent(bet.id)}/resolve`, { action: kind, ...(kind === "dividend" ? { dividend: d } : {}), reason }, { "Idempotency-Key": key })
      }
    >
      {kind === "settle" && <p className="text-[13px] text-ink-muted">{t("held.settleHelp")}</p>}
      {kind === "dividend" && (
        <label className="flex flex-col gap-1.5 text-[13px] font-medium">
          {t("held.dividendLabel")}
          <input className={cx(control, "w-40 tabular-nums")} inputMode="decimal" value={div} onChange={(e) => setDiv(e.target.value.replace(/[^\d.]/g, ""))} />
        </label>
      )}
    </ConfirmDialog>
  );
}

interface RacesResp {
  meetings: { date: string; venue: string; races: number[] }[];
  meeting: { date: string; venue: string; mode: string } | null;
  races: { raceNumber: number; postTime: string | null; status: string; pendingBets: number; pendingStake: number }[];
}

export function RacesPage() {
  const t = useA();
  const fmt = useFmt();
  const g = useGlossary();
  const { query, setQuery, isOwner, version } = useAdmin();
  const [d, setD] = useState<RacesResp | null>(null);
  const [err, setErr] = useState("");
  const [voiding, setVoiding] = useState<number | "meeting" | null>(null);
  const key = query.get("meeting") ?? "";
  useEffect(() => {
    const [date, venue] = key.split("_");
    adminCall<RacesResp>("GET", `/races${date && venue ? `?date=${date}&venue=${venue}` : ""}`)
      .then(setD)
      .catch((e) => setErr(errText(t, e)));
  }, [key, version]); // eslint-disable-line react-hooks/exhaustive-deps
  const m = d?.meeting;
  return (
    <div>
      <h1 className="pb-4 text-[22px] font-medium text-navy-900 lg:text-[26px]">{t("races.title")}</h1>
      {err && <div className={errorBox}>{err}</div>}
      {d && (
        <section>
          <div className={cx(sectionHead, "flex-wrap justify-between")}>
            <label className="flex items-center gap-2 text-[15px]">
              {t("races.meeting")}
              <select className={cx(control, "w-auto text-ink")} value={m ? `${m.date}_${m.venue}` : ""} onChange={(e) => setQuery({ meeting: e.target.value })}>
                {d.meetings.map((x) => (
                  <option key={`${x.date}_${x.venue}`} value={`${x.date}_${x.venue}`}>
                    {fmt.date(ymd(x.date))} {g.venue(x.venue)}
                  </option>
                ))}
              </select>
            </label>
            {isOwner && m && (
              <button type="button" className={cx(btnDanger, "h-9 bg-surface")} onClick={() => setVoiding("meeting")}>
                {t("bets.voidMeeting")}
              </button>
            )}
          </div>
          <div className={cx(sectionBody, "overflow-x-auto")}>
            <table className={cx(table, tablePadTight, "text-[13px] [&_td]:h-11")}>
              <thead>
                <tr>
                  <th className="text-left!">{t("col.race")}</th>
                  <th className="text-left!">{t("col.postTime")}</th>
                  <th className="text-left!">{t("col.status")}</th>
                  <th>{t("col.pendingBets")}</th>
                  <th>{t("col.pendingStake")}</th>
                  {isOwner && <th />}
                </tr>
              </thead>
              <tbody>
                {d.races.map((r) => (
                  <tr key={r.raceNumber}>
                    <td className="text-left!">R{r.raceNumber}</td>
                    <td className="text-left!">{r.postTime ? fmt.date(r.postTime, { hour: "2-digit", minute: "2-digit", hour12: false }) : "–"}</td>
                    <td className="text-left!">{t(`status.${r.status === "open" ? "open" : r.status}`)}</td>
                    <td>{fmt.num(r.pendingBets)}</td>
                    <td>{fmt.num(r.pendingStake)}</td>
                    {isOwner && (
                      <td>
                        {r.status !== "void" && (
                          <button type="button" className="cursor-pointer text-[13px] text-bad hover:underline" onClick={() => setVoiding(r.raceNumber)}>
                            {t("bets.voidRace")}
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {voiding !== null && m && <VoidDialog date={m.date} venue={m.venue} raceNo={voiding === "meeting" ? null : voiding} onClose={() => setVoiding(null)} />}
    </div>
  );
}

function VoidDialog({ date, venue, raceNo, onClose }: { date: string; venue: string; raceNo: number | null; onClose: () => void }) {
  const t = useA();
  const fmt = useFmt();
  const g = useGlossary();
  const iso = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
  const [inc, setInc] = useState(false);
  const [pv, setPv] = useState<{ races: number[]; skipped: number[]; bets: number; users: number; refundTotal: number } | null>(null);
  const [err, setErr] = useState("");
  useEffect(() => {
    setPv(null);
    adminCall<typeof pv>("POST", "/races/void/preview", { date: iso, venue, raceNo, includeResulted: inc })
      .then(setPv)
      .catch((e) => setErr(errText(t, e)));
  }, [inc]); // eslint-disable-line react-hooks/exhaustive-deps
  const meeting = `${fmt.date(ymd(date), { month: "numeric", day: "numeric" })} ${g.venue(venue)}`;
  return (
    <ConfirmDialog
      title={raceNo ? t("voidDlg.raceTitle", { n: raceNo }) : t("voidDlg.meetingTitle", { meeting })}
      danger
      valid={!!pv && pv.races.length > 0}
      action={t("voidDlg.btn", { n: pv?.bets ?? 0 })}
      stepUpNote={!raceNo || inc ? t("dialog.otpNeeded") : null}
      summary={[
        [t("races.meeting"), meeting],
        [t("col.race"), pv ? (pv.races.length ? pv.races.map((n) => `R${n}`).join(", ") : t("races.none")) : "…"],
        ...(pv ? [[t("col.pendingBets"), t("races.preview", { bets: fmt.num(pv.bets), credits: fmt.num(pv.refundTotal), users: fmt.num(pv.users) })] as [string, string]] : []),
        ...(pv && pv.skipped.length ? [[" ", t("races.skipped", { races: pv.skipped.map((n) => `R${n}`).join(", ") })] as [string, string]] : []),
      ]}
      onClose={onClose}
      onSubmit={(reason, key) => adminCall<{ auditId: number }>("POST", "/races/void", { date: iso, venue, raceNo, includeResulted: inc, reason }, { "Idempotency-Key": key })}
    >
      {err && <div className={errorBox}>{err}</div>}
      <label className="flex min-h-11 cursor-pointer items-center gap-2 text-[15px]">
        <input type="checkbox" className="size-4 accent-navy-700" checked={inc} onChange={(e) => setInc(e.target.checked)} />
        {t("races.includeResulted")}
      </label>
    </ConfirmDialog>
  );
}
