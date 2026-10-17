// All Up per-leg breakdown (docs/all-up/DESIGN-SPEC.md §6.3–6.4): a table on ≥ sm, leg cards on phones. Used by
// the result modal and the History / day-summary expander.
import { useTranslation } from "react-i18next";
import type { HistoryAllUp } from "../../shared/types";
import { cx, legStatusChip, table, tablePad } from "../kit";

export type AllUpLegView = HistoryAllUp["legs"][number] & {
  /** Finishers' names for the Result cell's title (≥ sm). */
  resultTitle?: string;
};

/** Spec §6.3: "×3.80"; a lost leg "×0"; a void race "×1" per bet; nothing for legs not graded yet. */
function factorText(l: AllUpLegView): string {
  if (l.status === "hold" || l.status === "toRun" || l.factor == null) return "—";
  if (l.status === "lost") return "×0";
  if (l.status === "void") return "×1";
  return `×${l.factor.toFixed(2)}`;
}

export function AllUpLegTable({ legs, compact }: { legs: AllUpLegView[]; /** History / day summary: no Picks column below md. */ compact?: boolean }) {
  const { t } = useTranslation(["bet", "common", "history"]);
  /** History stores picks as 膽/腳; show B/L in English. */
  const picks = (p: string) => p.replaceAll("膽", t("common:role.bankerShort")).replaceAll("腳", t("common:role.legShort"));
  const dividend = (l: AllUpLegView) => (l.status === "void" ? t("allUp.voidRace") : (l.dividendText ?? "—"));
  const status = (l: AllUpLegView) => <span className={legStatusChip(l.status)}>{t(`allUp.leg.${l.status}`)}</span>;
  const carried = (l: AllUpLegView) => (l.carried ? <div className="mt-0.5 text-[12px] whitespace-normal text-ink-muted">{t("allUp.carried", { count: l.carried })}</div> : null);
  const factorCls = (l: AllUpLegView) => cx("tabular-nums", l.status === "lost" && "text-bad");

  return (
    <>
      <div className="hidden overflow-x-auto sm:block">
        <table className={cx(table, tablePad, "text-[13px] [&_td]:text-left! [&_th]:text-left! [&_td.num]:text-right! [&_th.num]:text-right!")}>
          <thead>
            <tr>
              <th>{t("allUp.col.leg")}</th>
              <th>{t("allUp.col.race")}</th>
              <th>{t("allUp.col.pool")}</th>
              <th className={cx(compact && "hidden md:table-cell")}>{t("allUp.col.picks")}</th>
              <th>{t("allUp.col.result")}</th>
              <th>{t("allUp.col.dividend")}</th>
              <th className="num">{t("allUp.col.factor")}</th>
              <th>{t("allUp.col.status")}</th>
            </tr>
          </thead>
          <tbody>
            {legs.map((l, i) => (
              <tr key={l.raceNumber} className="h-11">
                <td className="tabular-nums">{i + 1}</td>
                <td>{t("common:raceShort", { n: l.raceNumber })}</td>
                <td>{t(`common:betType.${l.pool}`)}</td>
                <td className={cx("whitespace-normal!", compact && "hidden md:table-cell")}>{picks(l.picks)}</td>
                <td className="font-medium tabular-nums" title={l.resultTitle}>
                  {l.result ?? "—"}
                </td>
                <td className="tabular-nums">{dividend(l)}</td>
                <td className={cx("num", factorCls(l))}>
                  {factorText(l)}
                  {carried(l)}
                </td>
                <td>{status(l)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ol className="divide-y divide-edge text-[13px] sm:hidden">
        {legs.map((l, i) => (
          <li key={l.raceNumber} className="py-2.5">
            <div className="flex items-center gap-2">
              <span className="font-medium text-navy-900">
                {t("allUp.legN", { n: i + 1 })} · {t("common:raceShort", { n: l.raceNumber })} · {t(`common:betType.${l.pool}`)}
              </span>
              <span className="ml-auto">{status(l)}</span>
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 text-ink">
              {!compact && (
                <span>
                  {t("allUp.col.picks")} {picks(l.picks)}
                </span>
              )}
              <span className="tabular-nums">
                {t("allUp.col.result")} {l.result ?? "—"}
              </span>
            </div>
            <div className="mt-0.5 flex text-ink">
              <span className="tabular-nums">
                {t("allUp.col.dividend")} {dividend(l)}
              </span>
              <span className={cx("ml-auto", factorCls(l))}>{factorText(l)}</span>
            </div>
            {carried(l)}
          </li>
        ))}
      </ol>
    </>
  );
}
