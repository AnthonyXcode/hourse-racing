// Credits ledger (/admin/ledger) and Purchases (/admin/purchases). Credits and HK$ never share a column.
import { useState } from "react";
import { btn, totalRow } from "../../kit";
import { useFmt } from "../../i18n/useLanguage";
import { useA } from "../i18n";
import { ALink, BetStatus, DataTable, Signed, useAdmin, useWhen } from "../ui";
import { ExportDialog } from "./Users";

interface LedgerRow {
  id: number;
  userId: string;
  displayName: string | null;
  kind: string;
  amount: number;
  balanceAfter: number;
  refType: string | null;
  refId: string | null;
  actor: string;
  createdAt: string;
}
interface PurchaseRow {
  sessionId: string;
  userId: string;
  displayName: string | null;
  planId: string;
  amountHkd: number;
  credits: number;
  status: string;
  paymentIntentId: string | null;
  reversedCredits: number;
  createdAt: string;
  paidAt: string | null;
}
const KINDS = ["signup_bonus", "purchase", "bet_stake", "bet_payout", "bet_refund", "purchase_reversal", "admin_adjust"];

export function LedgerPage() {
  const t = useA();
  const fmt = useFmt();
  const when = useWhen();
  const { isOwner } = useAdmin();
  const [exp, setExp] = useState(false);
  return (
    <div>
      <h1 className="pb-4 text-[22px] font-medium text-navy-900 lg:text-[26px]">{t("nav.ledger")}</h1>
      <DataTable<LedgerRow>
        title={t("nav.ledger")}
        endpoint="/ledger"
        rowKey={(r) => String(r.id)}
        filters={[
          { param: "kind", label: t("filter.kind"), kind: "select", options: KINDS.map((k) => [k, t(`kind.${k}`)]) },
          { param: "actor", label: t("filter.actor"), kind: "text" },
          { param: "from", label: t("table.from"), kind: "date" },
          { param: "to", label: t("table.to"), kind: "date" },
        ]}
        extra={isOwner && <button type="button" className={btn} onClick={() => setExp(true)}>{t("table.export")}</button>}
        columns={[
          { key: "time", label: t("col.time"), render: (r) => when(r.createdAt) },
          { key: "user", label: t("col.user"), render: (r) => (r.userId.startsWith("deleted:") ? "–" : <ALink to={`/admin/users/${r.userId}`}>{r.displayName ?? r.userId.slice(0, 8)}</ALink>) },
          { key: "kind", label: t("col.kind"), render: (r) => t(`kind.${r.kind}`) },
          { key: "amount", label: `${t("col.amount")} (${t("col.credits")})`, num: true, render: (r) => <Signed n={r.amount} /> },
          { key: "after", label: t("col.balanceAfter"), num: true, render: (r) => fmt.num(r.balanceAfter) },
          { key: "ref", label: t("col.ref"), render: (r) => (r.refId ? `${r.refType ?? ""} ••••${r.refId.slice(-4)}` : "–") },
          { key: "actor", label: t("col.actor"), render: (r) => r.actor },
        ]}
        footer={(p) => (
          <table className="w-full text-[13px]">
            <tbody>
              <tr className={totalRow}>
                <td className="px-[13px] py-2">{t("table.totals")}</td>
                <td className="px-[13px] py-2 text-right tabular-nums">
                  <Signed n={Number(p.sumIn)} /> · <Signed n={Number(p.sumOut)} />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      />
      {exp && <ExportDialog dataset="ledger" onClose={() => setExp(false)} />}
    </div>
  );
}

export function PurchasesPage() {
  const t = useA();
  const fmt = useFmt();
  const when = useWhen();
  const { isOwner, me } = useAdmin();
  const [exp, setExp] = useState(false);
  const dash = me.stripeMode === "live" ? "https://dashboard.stripe.com" : "https://dashboard.stripe.com/test";
  return (
    <div>
      <h1 className="pb-4 text-[22px] font-medium text-navy-900 lg:text-[26px]">{t("nav.purchases")}</h1>
      <DataTable<PurchaseRow>
        title={t("nav.purchases")}
        endpoint="/purchases"
        rowKey={(r) => r.sessionId}
        filters={[
          { param: "status", label: t("filter.status"), kind: "select", options: ["open", "paid", "expired", "refunded", "disputed"].map((s) => [s, t(`status.${s}`)]) },
          { param: "planId", label: t("col.plan"), kind: "select", options: [["hk10", "HK$10"], ["hk100", "HK$100"], ["hk300", "HK$300"]] },
          { param: "from", label: t("table.from"), kind: "date" },
          { param: "to", label: t("table.to"), kind: "date" },
        ]}
        extra={isOwner && <button type="button" className={btn} onClick={() => setExp(true)}>{t("table.export")}</button>}
        columns={[
          { key: "created", label: t("col.time"), render: (r) => when(r.createdAt) },
          { key: "user", label: t("col.user"), render: (r) => (r.userId.startsWith("deleted:") ? "–" : <ALink to={`/admin/users/${r.userId}`}>{r.displayName ?? r.userId.slice(0, 8)}</ALink>) },
          { key: "plan", label: t("col.plan"), render: (r) => r.planId },
          { key: "hkd", label: t("col.hkd"), num: true, render: (r) => `HK$${fmt.num(r.amountHkd)}` },
          { key: "credits", label: t("col.credits"), num: true, render: (r) => fmt.num(r.credits) },
          { key: "status", label: t("col.status"), render: (r) => <BetStatus status={r.status} /> },
          { key: "paid", label: t("status.paid"), render: (r) => when(r.paidAt) },
          { key: "session", label: t("col.session"), render: (r) => `••••${r.sessionId.slice(-4)}` },
          {
            key: "pi",
            label: t("col.paymentIntent"),
            render: (r) =>
              r.paymentIntentId && isOwner ? (
                <a className="text-link hover:underline" href={`${dash}/payments/${encodeURIComponent(r.paymentIntentId)}`} target="_blank" rel="noopener noreferrer">
                  ••••{r.paymentIntentId.slice(-4)} ↗
                </a>
              ) : r.paymentIntentId ? (
                `••••${r.paymentIntentId.slice(-4)}`
              ) : (
                "–"
              ),
          },
        ]}
        footer={(p) => (
          <p className="border-t border-line px-[13px] py-2 text-[13px] font-medium tabular-nums">
            {t("table.totals")}: {fmt.num(Number(p.count))} · HK${fmt.num(Number(p.hkd))}
          </p>
        )}
      />
      {exp && <ExportDialog dataset="purchases" onClose={() => setExp(false)} />}
    </div>
  );
}
