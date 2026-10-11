// Home "See details" on the Top-3-pick cards: the model's top 3 picks meeting by meeting over a chosen
// From / To window (default: the summary's last 3 months). Each race is a chip (dark green = the winner was
// one of the picks, light green = at least one placed, grey = miss); a meeting row expands to that day's
// per-race records (picks vs result).
import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { HomeMeetings, HomeRecordDay } from "../../shared/types";
import { btn, cx, dateControl, errorBox, field, fieldLabel, modalBg, table, tablePadTight } from "../kit";
import { useGlossary } from "../i18n/glossary";
import { useFmt } from "../i18n/useLanguage";
import { pc } from "../analyzer/format";
import { useDialog } from "../members/ui";
import { homeApi } from "./api";
import { RecordRow } from "./HomePage";

/** Longest window the API accepts (server/home/records.ts MEETINGS_MAX_DAYS). */
const MAX_DAYS = 366;
const daysBetween = (a: string, b: string) => (Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000;
const rate = (hits: number, n: number) => (n ? pc((hits / n) * 100) : "–");

export function MeetingsDialog({ from: from0, to: to0, today, onClose }: { from: string; to: string; today: string; onClose: () => void }) {
  const { t } = useTranslation("home");
  const fmt = useFmt();
  const g = useGlossary();
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, onClose);
  const [from, setFrom] = useState(from0);
  const [to, setTo] = useState(to0);
  const [data, setData] = useState<HomeMeetings | null>(null);
  const [err, setErr] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const span = from && to ? daysBetween(from, to) : NaN;
  const invalid = !(span >= 0) ? t("meetings.badRange") : span >= MAX_DAYS ? t("meetings.tooLong") : null;
  useEffect(() => {
    if (invalid) return;
    const ac = new AbortController();
    setErr(false);
    setData(null);
    homeApi
      .meetings(from, to, ac.signal)
      .then(setData)
      .catch((e) => (e as Error).name !== "AbortError" && setErr(true));
    return () => ac.abort();
  }, [from, to, invalid]);

  const day = (iso: string) => fmt.date(`${iso}T12:00:00+08:00`, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  return (
    <div className={modalBg} onClick={onClose}>
      <div
        ref={ref}
        className="max-h-[92dvh] w-full overflow-auto rounded-t-sheet bg-surface p-5 shadow-pop sm:w-[min(880px,100%)] sm:rounded-card sm:p-7"
        role="dialog"
        aria-modal="true"
        aria-labelledby="meetings-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="meetings-title" className="text-[17px] font-medium text-navy-900">
            {t("meetings.title")}
          </h2>
          <button type="button" className={cx(btn, "h-11 flex-none")} onClick={onClose}>
            {t("meetings.close")}
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 items-end gap-3 sm:flex sm:flex-wrap">
          <label className={cx(field, "sm:w-44")}>
            <span className={fieldLabel}>{t("meetings.from")}</span>
            <input type="date" className={dateControl} value={from} max={to || today} onChange={(e) => setFrom(e.target.value)} />
          </label>
          <label className={cx(field, "sm:w-44")}>
            <span className={fieldLabel}>{t("meetings.to")}</span>
            <input type="date" className={dateControl} value={to} min={from} max={today} onChange={(e) => setTo(e.target.value)} />
          </label>
          {data && !invalid && (
            <p className="col-span-2 m-0 text-[13px] text-ink tabular-nums sm:ml-auto sm:pb-2.5" aria-live="polite">
              {t("meetings.total", {
                m: fmt.num(data.meetings.length),
                n: fmt.num(data.races),
                w: fmt.num(data.winHits),
                wr: rate(data.winHits, data.races),
                p: fmt.num(data.placeHits),
                pr: rate(data.placeHits, data.races),
              })}
            </p>
          )}
        </div>

        {invalid ? (
          <p className={errorBox} role="alert">
            {invalid}
          </p>
        ) : err ? (
          <p className={errorBox} role="alert">
            {t("meetings.error")}
          </p>
        ) : !data ? (
          <div className="mt-3 flex flex-col gap-2" role="status" aria-label={t("meetings.loading")}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-11 rounded-card bg-surface-2 motion-safe:animate-pulse" />
            ))}
            <p className="text-[13px] text-ink-muted">{t("meetings.loading")}</p>
          </div>
        ) : data.meetings.length === 0 ? (
          <p className="mt-4 text-center text-ink-muted">{t("meetings.empty")}</p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-card border border-line">
            <table className={cx(table, tablePadTight, "text-[13px] sm:text-[15px] [&_td]:align-middle")}>
              <thead>
                <tr>
                  <th scope="col">{t("meetings.meeting")}</th>
                  <th scope="col">{t("meetings.win")}</th>
                  <th scope="col">{t("meetings.place")}</th>
                  <th scope="col" className="!text-left max-sm:hidden">
                    {t("meetings.races")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.meetings.map((m) => {
                  const key = `${m.date}_${m.venue}`;
                  const expanded = open === key;
                  const n = m.races.length;
                  return (
                    <Fragment key={key}>
                      <tr>
                        <td>
                          <button
                            type="button"
                            className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-left font-medium whitespace-normal text-navy-900 hover:underline"
                            aria-expanded={expanded}
                            onClick={() => setOpen(expanded ? null : key)}
                          >
                            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" className={cx("flex-none transition-transform", expanded && "rotate-90")}>
                              <path d="M4 2.5 7.5 6 4 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>
                              {day(m.date)} <span className="font-normal text-ink-muted">{g.venue(m.venue)}</span>
                            </span>
                          </button>
                          <div className="pb-1 sm:hidden">
                            <RaceChips races={m.races} />
                          </div>
                        </td>
                        <td>
                          {m.winHits}/{n} <span className="block text-[12px] text-ink-muted sm:inline">{rate(m.winHits, n)}</span>
                        </td>
                        <td>
                          {m.placeHits}/{n} <span className="block text-[12px] text-ink-muted sm:inline">{rate(m.placeHits, n)}</span>
                        </td>
                        <td className="!text-left !whitespace-normal max-sm:hidden">
                          <RaceChips races={m.races} />
                        </td>
                      </tr>
                      {expanded && (
                        <tr>
                          <td colSpan={4} className="!p-0 !whitespace-normal">
                            <MeetingRaces date={m.date} venue={m.venue} />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-2 text-[12px] leading-normal text-ink-muted">{t("meetings.legend")}</p>
      </div>
    </div>
  );
}

/** One chip per race: dark green = winner among the picks, light green = a pick placed, grey = miss. */
function RaceChips({ races }: { races: HomeMeetings["meetings"][number]["races"] }) {
  const { t } = useTranslation("home");
  return (
    <ol className="flex flex-wrap gap-1">
      {races.map((r) => (
        <li
          key={r.raceNo}
          className={cx(
            "inline-flex size-6 items-center justify-center rounded-full text-[12px] font-medium tabular-nums",
            r.win ? "bg-good text-white" : r.place ? "bg-good-soft text-good" : "bg-surface-2 text-ink-muted"
          )}
          title={t(r.win ? "meetings.chipWin" : r.place ? "meetings.chipPlace" : "meetings.chipMiss", { n: r.raceNo })}
        >
          {r.raceNo}
        </li>
      ))}
    </ol>
  );
}

/** One meeting's races: the model's top 3 picks vs the actual top 3 (the Records rows). */
function MeetingRaces({ date, venue }: { date: string; venue: "ST" | "HV" }) {
  const { t } = useTranslation("home");
  const [data, setData] = useState<HomeRecordDay | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const ac = new AbortController();
    homeApi
      .records(date, ac.signal)
      .then(setData)
      .catch((e) => (e as Error).name !== "AbortError" && setErr(true));
    return () => ac.abort();
  }, [date]);
  if (err) return <p className="m-0 px-[13px] py-3 text-left text-[13px] text-bad">{t("records.error")}</p>;
  if (!data) return <div className="m-2 h-16 rounded-card bg-surface-2 motion-safe:animate-pulse" role="status" aria-label={t("records.loading")} />;
  return (
    <ul className="divide-y divide-line border-y border-line bg-surface text-left">
      {data.races
        .filter((r) => r.venue === venue)
        .map((r) => (
          <RecordRow key={r.raceNo} r={r} noResult />
        ))}
    </ul>
  );
}
