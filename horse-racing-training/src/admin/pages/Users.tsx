// Users list (/admin/users) and user detail (/admin/users/:id) with the owner's actions.
import { useEffect, useRef, useState } from "react";
import { btn, btnDanger, btnPrimary, control, cx, errorBox, figure, modalBgTop, modalNarrow, sectionBody, sectionHead, seg, segBtn } from "../../kit";
import { Avatar, useDialog } from "../../members/ui";
import { useFmt } from "../../i18n/useLanguage";
import { ymd } from "../../slip";
import { ApiError, adminCall, downloadCsv } from "../api";
import { useA } from "../i18n";
import { roleBadge } from "../kit";
import { ALink, BetStatus, ConfirmDialog, CopyId, DataTable, FlagChip, Signed, Tabs, errText, useAdmin, useWhen, type Column } from "../ui";

export interface UserRow {
  id: string;
  displayName: string;
  phone: string;
  role: "owner" | "admin" | "user";
  balance: number;
  flagged: boolean;
  pendingLive: number;
  createdAt: string;
  lastLoginAt: string;
}
interface UserDetail extends UserRow {
  avatarUrl: string | null;
  email: string | null;
  whatsapp: string | null;
  telegram: string | null;
  description?: string | null;
  hasDescription: boolean;
  locale: string;
  adultDeclaredAt: string | null;
  termsVersion: string | null;
  flagReason: string | null;
  showOnLeaderboard?: boolean;
  sessions: { count: number; lastSeenAt: string | null };
}

export function UsersPage() {
  const t = useA();
  const fmt = useFmt();
  const when = useWhen();
  const { isOwner } = useAdmin();
  const [exporting, setExporting] = useState(false);
  const roleLabel = (r: UserRow["role"]) => t(r === "owner" ? "role.owner" : r === "admin" ? "role.adminShort" : "role.user");
  const cols: Column<UserRow>[] = [
    { key: "name", label: t("col.name"), sort: "name", render: (u) => <ALink to={`/admin/users/${u.id}`}>{u.displayName}</ALink> },
    { key: "phone", label: t("col.phone"), render: (u) => <span className="tabular-nums">{u.phone}</span> },
    { key: "role", label: t("col.role"), render: (u) => <span className={roleBadge(u.role)}>{roleLabel(u.role)}</span> },
    { key: "balance", label: t("col.balance"), num: true, sort: "balance", render: (u) => fmt.num(u.balance) },
    { key: "pending", label: t("col.pending"), num: true, render: (u) => fmt.num(u.pendingLive) },
    { key: "joined", label: t("col.joined"), sort: "created", render: (u) => when(u.createdAt) },
    { key: "last", label: t("col.lastLogin"), sort: "lastLogin", render: (u) => when(u.lastLoginAt) },
    { key: "status", label: t("col.status"), render: (u) => (u.flagged ? <FlagChip /> : "–") },
  ];
  return (
    <div>
      <h1 className="pb-4 text-[22px] font-medium text-navy-900 lg:text-[26px]">{t("nav.users")}</h1>
      <DataTable<UserRow>
        title={t("nav.users")}
        endpoint="/users"
        columns={cols}
        search
        defaultSort="created:desc"
        rowKey={(u) => u.id}
        filters={[
          { param: "role", label: t("filter.role"), kind: "select", options: [["owner", t("role.owner")], ["admin", t("role.adminShort")], ["user", t("role.user")]] },
          { param: "flagged", label: t("filter.flagged"), kind: "check" },
          { param: "hasBalance", label: t("filter.hasBalance"), kind: "check" },
          { param: "hasLive", label: t("filter.hasLive"), kind: "check" },
        ]}
        extra={
          isOwner && (
            <button type="button" className={btn} onClick={() => setExporting(true)}>
              {t("table.export")}
            </button>
          )
        }
        card={(u) => (
          <>
            <div className="flex items-center gap-2">
              <ALink to={`/admin/users/${u.id}`}>{u.displayName}</ALink>
              <span className={cx(roleBadge(u.role), "ml-auto")}>{roleLabel(u.role)}</span>
            </div>
            <div className="text-[13px] text-ink-muted tabular-nums">
              {u.phone} · {when(u.createdAt)}
            </div>
            <div className="flex items-center gap-2 text-[13px] tabular-nums">
              {t("col.balance")} {fmt.num(u.balance)} · {t("col.pending")} {fmt.num(u.pendingLive)}
              {u.flagged && <span className="ml-auto"><FlagChip /></span>}
            </div>
          </>
        )}
      />
      {exporting && <ExportDialog onClose={() => setExporting(false)} />}
    </div>
  );
}

/** Owner CSV export: masked by default; full contact details need the checkbox + a step-up OTP. */
export function ExportDialog({ onClose, dataset: initial = "users" }: { onClose: () => void; dataset?: string }) {
  const t = useA();
  const { stepUp, toast } = useAdmin();
  const [dataset, setDataset] = useState(initial);
  const [full, setFull] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, () => !busy && onClose());
  async function go() {
    setBusy(true);
    setErr("");
    try {
      try {
        await downloadCsv(dataset, full);
      } catch (e) {
        if (!(e instanceof ApiError) || e.code !== "step_up_required") throw e;
        if (!(await stepUp())) return setBusy(false);
        await downloadCsv(dataset, full);
      }
      toast(t("toast.exported"), 4000);
      onClose();
    } catch (e) {
      setErr(errText(t, e));
      setBusy(false);
    }
  }
  return (
    <div className={modalBgTop} onClick={() => !busy && onClose()}>
      <div ref={ref} className={cx(modalNarrow, "sm:w-[480px]")} role="dialog" aria-modal="true" aria-labelledby="exp-title" onClick={(e) => e.stopPropagation()}>
        <h2 id="exp-title" className="text-[17px] font-medium text-navy-900">
          {t("export.title")}
        </h2>
        {err && (
          <div className={errorBox} role="alert">
            {err}
          </div>
        )}
        <label className="mt-3 flex items-center gap-2 text-[15px]">
          {t("export.dataset")}
          <select className={cx(control, "w-auto")} value={dataset} onChange={(e) => setDataset(e.target.value)}>
            {["users", "bets", "ledger", "purchases", "audit"].map((d) => (
              <option key={d} value={d}>
                {t(d === "users" ? "nav.users" : d === "bets" ? "nav.bets" : d === "ledger" ? "nav.ledger" : d === "purchases" ? "nav.purchases" : "nav.audit")}
              </option>
            ))}
          </select>
        </label>
        {dataset === "users" && (
          <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-[15px]">
            <input type="checkbox" className="size-4 accent-navy-700" checked={full} onChange={(e) => setFull(e.target.checked)} />
            {t("export.unmasked")}
          </label>
        )}
        <p className="mt-2 text-[13px] text-ink-muted">{t("export.warn")}</p>
        {full && <p className="mt-1 text-[13px] text-ink-muted">{t("dialog.otpNeeded")}</p>}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button type="button" className={btn} disabled={busy} onClick={onClose}>
            {t("dialog.cancel")}
          </button>
          <button type="button" className={full ? btnDanger : btnPrimary} disabled={busy} onClick={() => void go()}>
            {busy ? t("dialog.working") : full ? t("export.btnUnmasked") : t("export.btn")}
          </button>
        </div>
      </div>
    </div>
  );
}

export function UserDetailPage({ id }: { id: string }) {
  const t = useA();
  const fmt = useFmt();
  const when = useWhen();
  const { isOwner, version, query } = useAdmin();
  const [u, setU] = useState<UserDetail | null>(null);
  const [err, setErr] = useState("");
  const [dialog, setDialog] = useState<"adjust" | "role" | "flag" | null>(null);
  useEffect(() => {
    adminCall<UserDetail>("GET", `/users/${encodeURIComponent(id)}`)
      .then(setU)
      .catch((e) => setErr(errText(t, e)));
  }, [id, version]); // eslint-disable-line react-hooks/exhaustive-deps
  if (err)
    return (
      <div className={errorBox} role="alert">
        {err}
      </div>
    );
  if (!u) return <p className="text-ink-muted">{t("loading")}</p>;
  const isTargetOwner = u.role === "owner";
  const tab = query.get("tab") ?? "ledger";
  const roleLabel = t(u.role === "owner" ? "role.owner" : u.role === "admin" ? "role.adminShort" : "role.user");

  const actions = (
    <section>
      <h2 className={sectionHead}>{isOwner ? t("user.ownerActions") : t("user.status")}</h2>
      <div className={cx(sectionBody, "divide-y divide-line")}>
        <div className="px-[13px] py-3">
          <div className="text-[13px] text-ink-muted">{t("user.balance")}</div>
          <div className={cx(figure, "mt-1 text-[22px] text-navy-900")}>{fmt.num(u.balance)}</div>
          {isOwner && (
            <button type="button" className={cx(btn, "mt-2")} onClick={() => setDialog("adjust")}>
              {t("user.adjust")}
            </button>
          )}
        </div>
        <div className="px-[13px] py-3">
          <div className="text-[13px] text-ink-muted">{t("user.role")}</div>
          <div className="mt-1 text-[15px] font-medium">{isTargetOwner ? t("role.ownerFixed") : roleLabel}</div>
          {isOwner && !isTargetOwner && (
            <button type="button" className={cx(btn, "mt-2")} onClick={() => setDialog("role")}>
              {t("user.changeRole")}
            </button>
          )}
        </div>
        <div className="px-[13px] py-3">
          <div className="text-[13px] text-ink-muted">{t("user.flag")}</div>
          <div className="mt-1 text-[15px] font-medium">{u.flagged ? t("user.flagged") : t("user.normal")}</div>
          {u.flagReason && <div className="text-[13px] text-ink">{t("user.flagReason", { reason: u.flagReason })}</div>}
          {isOwner && (
            <button type="button" className={cx(u.flagged ? btn : btnDanger, "mt-2")} onClick={() => setDialog("flag")}>
              {u.flagged ? t("user.unflagBtn") : t("user.flagBtn")}
            </button>
          )}
        </div>
        <p className="px-[13px] py-3 text-[13px] text-ink-muted">{isOwner ? t("user.auditNote") : t("readOnly")}</p>
      </div>
    </section>
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 pb-4">
        <h1 className="text-[22px] font-medium text-navy-900 lg:text-[26px]">{u.displayName}</h1>
        <span className={roleBadge(u.role)}>{roleLabel}</span>
        {u.flagged && <FlagChip />}
        <span className="ml-auto text-[13px]">
          ID <CopyId id={u.id} />
        </span>
      </div>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="lg:hidden">{actions}</div>
        <div className="flex min-w-0 flex-col gap-4">
          <section>
            <h2 className={sectionHead}>{t("user.profile")}</h2>
            <div className={cx(sectionBody, "flex flex-col gap-2 px-[13px] py-3 text-[15px]")}>
              <div className="flex items-center gap-3">
                <Avatar name={u.displayName} src={u.avatarUrl} size="size-12" text="text-[18px]" ring />
                <div className="text-[13px] text-ink-muted">
                  <div>{t("user.joined", { date: when(u.createdAt) })}</div>
                  <div>{t("user.lastLogin", { date: when(u.lastLoginAt) })}</div>
                </div>
              </div>
              <div className="text-[13px]">
                {t("user.leaderboard")}: {u.showOnLeaderboard ? t("user.leaderboardOn") : t("user.leaderboardOff")}
              </div>
              <div className="text-[13px]">
                {t("user.description")}: {u.description !== undefined ? (u.description ?? "–") : u.hasDescription ? <span className="text-ink-muted">{t("user.descriptionHidden")}</span> : "–"}
              </div>
              <div className="text-[13px] text-ink-muted">
                {u.adultDeclaredAt ? `${t("user.adult")} · ${when(u.adultDeclaredAt)} · ${u.termsVersion}` : ""} {u.sessions.count ? `· ${t("user.sessions", { n: u.sessions.count, date: when(u.sessions.lastSeenAt) })}` : ""}
              </div>
            </div>
          </section>
          <ContactCard u={u} />
          <Tabs
            param="tab"
            tabs={[
              ["ledger", t("user.tab.ledger")],
              ["live", t("user.tab.liveBets")],
              ["practice", t("user.tab.practiceBets")],
              ["purchases", t("user.tab.purchases")],
              ["sessions", t("user.tab.sessions")],
              ["audit", t("user.tab.audit")],
            ]}
          />
          <UserTab id={u.id} tab={tab} />
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-[calc(56px+16px)]">{actions}</div>
        </div>
      </div>
      {dialog === "adjust" && <AdjustDialog u={u} self={u.role === "owner"} onClose={() => setDialog(null)} />}
      {dialog === "role" && <RoleDialog u={u} onClose={() => setDialog(null)} />}
      {dialog === "flag" && <FlagDialog u={u} onClose={() => setDialog(null)} />}
    </div>
  );
}

/** Masked contact details; the owner can reveal them for 60 s (logged in the access log). */
function ContactCard({ u }: { u: UserDetail }) {
  const t = useA();
  const { isOwner } = useAdmin();
  const [full, setFull] = useState<{ phone: string; email: string | null; whatsapp: string | null; telegram: string | null } | null>(null);
  // Wall-clock deadline (like the bet-slip countdown): background tabs throttle timers, so the countdown is
  // recomputed from the deadline on every tick and when the tab becomes visible again.
  const [deadline, setDeadline] = useState(0);
  const [left, setLeft] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [err, setErr] = useState("");
  useEffect(() => {
    if (!deadline) return;
    const tick = () => {
      const s = Math.ceil((deadline - Date.now()) / 1000);
      if (s <= 0) {
        setFull(null);
        setDeadline(0);
        setLeft(0);
      } else setLeft(s);
    };
    tick();
    const x = setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("focus", tick);
    return () => {
      clearInterval(x);
      document.removeEventListener("visibilitychange", tick);
      window.removeEventListener("focus", tick);
    };
  }, [deadline]);
  const row = (k: string, v: string | null) => (
    <div className="flex min-h-11 items-center justify-between border-b border-line px-[13px] last:border-b-0">
      <span className="text-[15px]">{k}</span>
      <span className="text-[15px] text-ink-strong tabular-nums">{v ?? "–"}</span>
    </div>
  );
  const show = full ?? { phone: u.phone, email: u.email, whatsapp: u.whatsapp === "same" ? t("user.whatsappSame") : u.whatsapp, telegram: u.telegram };
  return (
    <section>
      <h2 className={cx(sectionHead, "justify-between")}>
        {t("user.contact")}
        {isOwner &&
          (full ? (
            <span className="flex items-center gap-3 text-[13px] font-normal">
              <span aria-live="polite">{left === 60 ? t("mask.hidesIn", { s: left }) : <span className="tabular-nums">{t("mask.hidesIn", { s: left })}</span>}</span>
              <button
                type="button"
                className="cursor-pointer underline"
                onClick={() => {
                  setFull(null);
                  setDeadline(0);
                  setLeft(0);
                }}
              >
                {t("mask.hideNow")}
              </button>
            </span>
          ) : (
            <button type="button" className="inline-flex h-8 cursor-pointer items-center rounded-full bg-white/15 px-3 text-[13px] font-normal hover:bg-white/25" onClick={() => setConfirm(true)}>
              👁 {t("mask.reveal")}
            </button>
          ))}
      </h2>
      <div className={sectionBody}>
        {err && (
          <div className={cx(errorBox, "mx-[13px]")} role="alert">
            {err}
          </div>
        )}
        {row(t("user.phone"), show.phone)}
        {row(t("user.whatsapp"), full ? (full.whatsapp === full.phone ? t("user.whatsappSame") : full.whatsapp) : show.whatsapp)}
        {row(t("user.email"), show.email)}
        {row(t("user.telegram"), show.telegram)}
      </div>
      {confirm && (
        <RevealConfirm
          onCancel={() => setConfirm(false)}
          onConfirm={async () => {
            setConfirm(false);
            try {
              const r = await adminCall<{ phone: string; email: string | null; whatsapp: string | null; telegram: string | null; expiresInSec?: number }>("GET", `/users/${encodeURIComponent(u.id)}/contact`);
              // The server's expiresInSec against our own clock (no skew); never longer than 60 s.
              const secs = Math.min(60, Math.max(1, r.expiresInSec ?? 60));
              setFull({ phone: r.phone, email: r.email, whatsapp: r.whatsapp, telegram: r.telegram });
              setLeft(secs);
              setDeadline(Date.now() + secs * 1000);
            } catch (e) {
              setErr(errText(t, e));
            }
          }}
        />
      )}
    </section>
  );
}

function RevealConfirm({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  const t = useA();
  const ref = useRef<HTMLDivElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  useDialog(ref, onCancel, cancel);
  return (
    <div className={modalBgTop} onClick={onCancel}>
      <div ref={ref} className={modalNarrow} role="dialog" aria-modal="true" aria-labelledby="rv-title" onClick={(e) => e.stopPropagation()}>
        <h2 id="rv-title" className="text-[17px] font-medium text-navy-900">
          {t("mask.reveal")}
        </h2>
        <p className="mt-2 text-[15px] text-ink">{t("mask.revealConfirm")}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <button ref={cancel} type="button" className={btn} onClick={onCancel}>
            {t("dialog.cancel")}
          </button>
          <button type="button" className={btnPrimary} onClick={onConfirm}>
            {t("mask.show")}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdjustDialog({ u, self, onClose }: { u: UserDetail; self: boolean; onClose: () => void }) {
  const t = useA();
  const fmt = useFmt();
  const { me } = useAdmin();
  const [dir, setDir] = useState<1 | -1>(1);
  const [raw, setRaw] = useState("");
  const n = /^\d{1,6}$/.test(raw) ? Number(raw) : 0;
  const amount = dir * n;
  const after = u.balance + amount;
  const valid = n >= 1 && n <= me.maxAdjust && after >= 0;
  return (
    <ConfirmDialog
      title={t("adjust.title")}
      danger={dir < 0}
      valid={valid}
      action={dir > 0 ? t("adjust.addBtn", { n: fmt.num(n) }) : t("adjust.deductBtn", { n: fmt.num(n) })}
      stepUpNote={n >= me.stepUpCredits ? t("dialog.otpNeededAdjust") : null}
      summary={[
        [t("dialog.user"), u.displayName],
        [t("user.balance"), <span key="b">{fmt.num(u.balance)} → <span className={after < 0 ? "text-bad" : ""}>{after < 0 ? `−${fmt.num(-after)}` : fmt.num(after)}</span></span>],
      ]}
      onClose={onClose}
      onSubmit={(reason, key) =>
        adminCall<{ auditId: number }>("POST", `/users/${encodeURIComponent(u.id)}/credits`, { amount, reason, expected: { balance: u.balance } }, { "Idempotency-Key": key })
      }
    >
      <div className={seg} role="group" aria-label={t("adjust.title")}>
        <button type="button" className={segBtn(dir > 0)} aria-pressed={dir > 0} onClick={() => setDir(1)}>
          {t("adjust.add")}
        </button>
        <button type="button" className={segBtn(dir < 0)} aria-pressed={dir < 0} onClick={() => setDir(-1)}>
          {t("adjust.deduct")}
        </button>
      </div>
      <label className="flex flex-col gap-1.5 text-[13px] font-medium">
        {t("adjust.amount")} *
        <input className={cx(control, "w-40 tabular-nums")} inputMode="numeric" value={raw} onChange={(e) => setRaw(e.target.value.replace(/\D/g, "").slice(0, 6))} />
      </label>
      {after < 0 && n > 0 && <p className="text-[13px] text-bad">{t("adjust.belowZero")}</p>}
      {self && <p className="text-[13px] text-ink-muted">{t("adjust.self")}</p>}
      <p className="text-[13px] text-ink-muted">{t("adjust.stripeNote")}</p>
    </ConfirmDialog>
  );
}

function RoleDialog({ u, onClose }: { u: UserDetail; onClose: () => void }) {
  const t = useA();
  const to = u.role === "admin" ? "user" : "admin";
  return (
    <ConfirmDialog
      title={t("roleDlg.title")}
      danger={to === "user"}
      action={to === "admin" ? t("roleDlg.promoteBtn") : t("roleDlg.demoteBtn")}
      stepUpNote={t("dialog.otpNeeded")}
      summary={[
        [t("dialog.user"), `${u.displayName} (${u.phone})`],
        [t("user.role"), `${t(u.role === "admin" ? "role.adminShort" : "role.user")} → ${t(to === "admin" ? "role.adminShort" : "role.user")}`],
      ]}
      onClose={onClose}
      onSubmit={(reason, key) => adminCall<{ auditId: number }>("POST", `/users/${encodeURIComponent(u.id)}/role`, { role: to, reason, expected: { role: u.role } }, { "Idempotency-Key": key })}
    >
      <p className="text-[15px] text-ink">{to === "admin" ? t("roleDlg.promoteBody") : t("roleDlg.demoteBody")}</p>
    </ConfirmDialog>
  );
}

function FlagDialog({ u, onClose }: { u: UserDetail; onClose: () => void }) {
  const t = useA();
  const to = !u.flagged;
  return (
    <ConfirmDialog
      title={to ? t("flagDlg.title") : t("flagDlg.unTitle")}
      danger={to}
      action={to ? t("flagDlg.btn") : t("flagDlg.unBtn")}
      summary={[
        [t("dialog.user"), u.displayName],
        [t("user.flag"), `${u.flagged ? t("user.flagged") : t("user.normal")} → ${to ? t("user.flagged") : t("user.normal")}`],
        ...(to ? [[t("user.flag"), t("flagDlg.effect")] as [string, string]] : u.flagReason ? [[t("col.reason"), u.flagReason] as [string, string]] : []),
      ]}
      onClose={onClose}
      onSubmit={(reason, key) => adminCall<{ auditId: number }>("POST", `/users/${encodeURIComponent(u.id)}/flag`, { flagged: to, reason, expected: { flagged: u.flagged } }, { "Idempotency-Key": key })}
    />
  );
}

/** One of the user's tabs, as a table (each request is logged in the access log by the server). */
function UserTab({ id, tab }: { id: string; tab: string }) {
  const t = useA();
  const fmt = useFmt();
  const when = useWhen();
  const base = `/users/${encodeURIComponent(id)}`;
  type R = Record<string, unknown>;
  const s = (v: unknown) => (v == null ? "–" : String(v));
  if (tab === "live")
    return (
      <DataTable<R>
        prefix="t_"
        title={t("user.tab.liveBets")}
        endpoint={`${base}/live-bets`}
        rowKey={(r) => s(r.id)}
        columns={[
          { key: "placed", label: t("col.time"), render: (r) => when(s(r.createdAt)) },
          { key: "meeting", label: t("col.meeting"), render: (r) => `${fmt.date(ymd(s(r.date)), { month: "numeric", day: "numeric" })} ${s(r.venue)}` },
          { key: "bet", label: t("col.bet"), render: (r) => s(r.betType) },
          { key: "picks", label: t("col.picks"), render: (r) => s(r.picks) },
          { key: "stake", label: t("col.stake"), num: true, render: (r) => fmt.num(Number(r.stake)) },
          { key: "status", label: t("col.status"), render: (r) => <BetStatus status={r.held ? "held" : s(r.status)} amount={Number(r.payout)} /> },
        ]}
      />
    );
  if (tab === "practice")
    return (
      <DataTable<R>
        prefix="t_"
        title={t("user.tab.practiceBets")}
        endpoint={`${base}/practice-bets`}
        rowKey={(r) => s(r.id)}
        columns={[
          { key: "placed", label: t("col.time"), render: (r) => when(s(r.ts)) },
          { key: "bet", label: t("col.bet"), render: (r) => s(r.betLabel) },
          { key: "picks", label: t("col.picks"), render: (r) => s(r.picks) },
          { key: "cost", label: t("col.stake"), num: true, render: (r) => fmt.money(Number(r.cost)) },
          { key: "status", label: t("col.status"), render: (r) => <BetStatus status={r.hit ? "hit" : "miss"} /> },
        ]}
      />
    );
  if (tab === "purchases")
    return (
      <DataTable<R>
        prefix="t_"
        title={t("user.tab.purchases")}
        endpoint={`${base}/purchases`}
        rowKey={(r) => s(r.sessionId)}
        columns={[
          { key: "time", label: t("col.time"), render: (r) => when(s(r.createdAt)) },
          { key: "plan", label: t("col.plan"), render: (r) => s(r.planId) },
          { key: "hkd", label: t("col.hkd"), num: true, render: (r) => `HK$${fmt.num(Number(r.amountHkd))}` },
          { key: "credits", label: t("col.credits"), num: true, render: (r) => fmt.num(Number(r.credits)) },
          { key: "status", label: t("col.status"), render: (r) => <BetStatus status={s(r.status)} /> },
          { key: "session", label: t("col.session"), render: (r) => `••••${s(r.sessionId).slice(-4)}` },
        ]}
      />
    );
  if (tab === "sessions")
    return (
      <DataTable<R>
        prefix="t_"
        title={t("user.tab.sessions")}
        endpoint={`${base}/sessions`}
        rowKey={(r) => s(r.createdAt) + s(r.userAgent)}
        columns={[
          { key: "created", label: t("col.time"), render: (r) => when(s(r.createdAt)) },
          { key: "last", label: t("col.lastSeen"), render: (r) => when(s(r.lastSeenAt)) },
          { key: "exp", label: t("col.expires"), render: (r) => when(s(r.expiresAt)) },
          { key: "ua", label: t("col.userAgent"), render: (r) => <span className="line-clamp-1 max-w-[40ch]">{s(r.userAgent)}</span> },
        ]}
      />
    );
  if (tab === "audit")
    return (
      <DataTable<R>
        prefix="t_"
        title={t("user.tab.audit")}
        endpoint={`/audit?targetType=user&targetId=${encodeURIComponent(id)}`}
        rowKey={(r) => s(r.id)}
        columns={[
          { key: "time", label: t("col.time"), render: (r) => when(s(r.createdAt), true) },
          { key: "actor", label: t("col.actor"), render: (r) => s(r.operator) },
          { key: "action", label: t("col.action"), render: (r) => t(`audit.action.${s(r.action)}`, { defaultValue: s(r.action) }) },
          { key: "reason", label: t("col.reason"), render: (r) => s(r.reason) },
        ]}
      />
    );
  return (
    <DataTable<R>
      prefix="t_"
      title={t("user.tab.ledger")}
      endpoint={`${base}/ledger`}
      rowKey={(r) => s(r.id)}
      columns={[
        { key: "time", label: t("col.time"), render: (r) => when(s(r.createdAt)) },
        { key: "kind", label: t("col.kind"), render: (r) => t(`kind.${s(r.kind)}`) },
        { key: "amount", label: t("col.amount"), num: true, render: (r) => <Signed n={Number(r.amount)} /> },
        { key: "after", label: t("col.balanceAfter"), num: true, render: (r) => fmt.num(Number(r.balanceAfter)) },
        { key: "actor", label: t("col.actor"), render: (r) => s(r.actor) },
      ]}
    />
  );
}
