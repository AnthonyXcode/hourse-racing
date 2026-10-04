// Home (first tab, the landing view): a compact hero with the one gold CTA, then three sections —
// the model's last-3-months hit rate, the opt-in member leaderboard and what the site is for.
// Summary and leaderboard load in parallel; both are small JSON responses.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { HomeRecordDay, HomeRecordHorse, HomeSummary, LeaderboardResponse, LeaderboardRow } from "../../shared/types";
import { btn, btnPrimary, control, cx, errorBox, sectionBody, sectionHead, table, tablePad } from "../kit";
import { Name } from "../i18n/names";
import { useGlossary } from "../i18n/glossary";
import { pc, signed as signedAscii } from "../analyzer/format";

/** Signed %, with a real minus sign (matches the credit figures). */
const signed = (v: number) => signedAscii(v).replace("-", "−");
import { useFmt } from "../i18n/useLanguage";
import { useAuth } from "../members/auth";
import { Avatar } from "../members/ui";
import { homeApi } from "./api";
import { AlertsBell } from "./AlertsBell";
import { motion } from "motion/react";
import { CountUp, Reveal, rise, slideIn, stagger, useSkipEntrance } from "./motion";

/** Open a member profile or a bot page (bots carry the board's window). */
type OpenProfile = (publicId: string, extra?: { range?: "day" | "30d"; date?: string }) => void;
type BotKey = "comet" | "thunder" | "jade" | "phoenix" | "typhoon" | "harbour" | "dragon";
type Nav = "bet" | "win-place" | "trio" | "history" | "account";

export function HomePage({ onNavigate, onUpcoming, onOpenProfile }: { onNavigate: (v: Nav) => void; onUpcoming: () => void; onOpenProfile: OpenProfile }) {
  const skipEntrance = useSkipEntrance();
  const { t } = useTranslation("home");
  return (
    <div className="mt-4 flex flex-col gap-6 sm:mt-6">
      <motion.section
        className="rounded-card bg-surface px-[13px] py-4 shadow-card sm:flex sm:items-center sm:gap-6 sm:px-6 sm:py-5"
        aria-labelledby="home-hero"
        variants={stagger(0.12)}
        initial={skipEntrance ? false : "hidden"}
        animate="show"
      >
        <div className="min-w-0 flex-1">
          <motion.h2 id="home-hero" variants={rise} className="text-[19px] leading-snug font-medium text-navy-900 sm:text-[22px]">
            {t("hero.title")}
          </motion.h2>
          <motion.p variants={rise} className="mt-1 text-[15px] leading-normal text-ink-muted">
            {t("hero.sub")}
          </motion.p>
        </div>
        <motion.button
          type="button"
          variants={rise}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={cx(btnPrimary, "mt-3 h-11 w-full sm:mt-0 sm:w-auto")}
          onClick={() => onNavigate("bet")}
        >
          {t("hero.cta")}
        </motion.button>
      </motion.section>
      <Reveal delay={0.1}>
        <ModelSection onNavigate={onNavigate} />
      </Reveal>
      <Reveal>
        <Leaderboard onNavigate={onNavigate} onOpenProfile={onOpenProfile} />
      </Reveal>
      <Reveal>
        <Purposes onNavigate={onNavigate} onUpcoming={onUpcoming} />
      </Reveal>
    </div>
  );
}

// ---- 1) Model hit rate ----
function ModelSection({ onNavigate }: { onNavigate: (v: Nav) => void }) {
  const skipEntrance = useSkipEntrance();
  const { t } = useTranslation("home");
  const fmt = useFmt();
  const [data, setData] = useState<HomeSummary | null>(null);
  const [err, setErr] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const ac = new AbortController();
    setErr(false);
    homeApi
      .summary(ac.signal)
      .then(setData)
      .catch((e) => (e as Error).name !== "AbortError" && setErr(true));
    return () => ac.abort();
  }, [attempt]);

  // Compact: the year only once (on the end date) so the card subline stays short on phones.
  const day = (iso: string, year: boolean) => fmt.date(`${iso}T12:00:00+08:00`, year ? { day: "numeric", month: "short", year: "numeric" } : { day: "numeric", month: "short" });
  const range = data ? t("model.range", { from: day(data.firstRace ?? data.from, false), to: day(data.lastRace ?? data.to, true) }) : "";
  const pct = (v: number | null) => (v == null ? "–" : pc(v));
  const details = (v: Nav) => (
    <button type="button" className="mt-1 inline-flex min-h-11 cursor-pointer items-center text-[13px] text-link hover:underline" onClick={() => onNavigate(v)}>
      {t("model.details")}
    </button>
  );

  return (
    <section aria-labelledby="home-model">
      <h2 id="home-model" className={sectionHead}>
        {t("model.title")}
      </h2>
      <div className={cx(sectionBody, "px-[13px] py-3 sm:px-4 sm:py-4")}>
        {err ? (
          <div className="flex flex-wrap items-center gap-3">
            <p className={cx(errorBox, "my-0 flex-1")} role="alert">
              {t("model.error")}
            </p>
            <button type="button" className={cx(btn, "h-11")} onClick={() => setAttempt((n) => n + 1)}>
              {t("model.retry")}
            </button>
          </div>
        ) : !data ? (
          <div aria-busy="true">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-[124px] rounded-card bg-surface-2 motion-safe:animate-pulse" />
              ))}
            </div>
            <p className="mt-3 text-[13px] text-ink-muted" role="status">
              {t("model.loading")}
            </p>
          </div>
        ) : data.races === 0 ? (
          <p className="py-4 text-center text-ink-muted">{t("model.empty")}</p>
        ) : (
          <>
            <motion.div className="grid grid-cols-2 gap-3 lg:grid-cols-5" variants={stagger(0.09, 0.15)} initial={skipEntrance ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              <Stat label={t("model.racesLabel")} value={<CountUp value={data.races} format={(v) => (v == null ? "–" : fmt.num(Math.round(v)))} />} sub={t("model.racesSub", { meetings: fmt.num(data.meetings), range })} />
              <Stat label={t("model.winLabel")} value={<CountUp value={data.top3Win} format={pct} />} sub={t("model.top3Sub", { hits: fmt.num(data.top3WinHits), races: fmt.num(data.top3Races) })} more={details("win-place")} />
              <Stat label={t("model.placeLabel")} value={<CountUp value={data.top3Place} format={pct} />} sub={t("model.top3Sub", { hits: fmt.num(data.top3PlaceHits), races: fmt.num(data.top3Races) })} more={details("win-place")} />
              <Stat
                label={`${t("model.trioLabel")} · ${t("model.trioName", { last: data.trio.last })}`}
                value={<CountUp value={data.trio.hit} format={pct} />}
                sub={t("model.trioSub", { combos: data.trio.combos == null ? "–" : fmt.num(data.trio.combos, { maximumFractionDigits: 1 }) })}
                more={details("trio")}
              />
              <Stat
                label={t("model.fiveStarLabel")}
                value={<CountUp value={data.fiveStarPlace ?? null} format={pct} />}
                sub={t("model.fiveStarSub", {
                  hits: fmt.num(data.fiveStarPlaceHits ?? 0),
                  races: fmt.num(data.fiveStarRaces ?? 0),
                  roi: data.fiveStarRoi == null ? "–" : signed(data.fiveStarRoi),
                })}
                more={details("win-place")}
                corner={<AlertsBell />}
                className="col-span-2 lg:col-span-1"
              />
            </motion.div>
            <Records days={data.days ?? []} />
            <p className="mt-3 text-[13px] leading-normal text-ink-muted">{t("model.footnote")}</p>
          </>
        )}
      </div>
    </section>
  );
}

/** Collapsible per-day records: each settled race with the model's top 3 picks vs the actual top 3. */
/** `days` may be missing in a summary cached before this feature (Cache-Control 5 min): treat as none. */
function Records({ days }: { days: string[] }) {
  const { t } = useTranslation("home");
  const fmt = useFmt();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(days[0] ?? "");
  const [data, setData] = useState<HomeRecordDay | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    if (!open || !date) return;
    const ac = new AbortController();
    setErr(false);
    homeApi
      .records(date, ac.signal)
      .then(setData)
      .catch((e) => (e as Error).name !== "AbortError" && setErr(true));
    return () => ac.abort();
  }, [open, date]);
  if (!days.length) return null;
  const label = (iso: string) => fmt.date(`${iso}T12:00:00+08:00`, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  const shown = data?.date === date ? data : null;
  return (
    <details className="mt-4 rounded-card border border-line" onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 px-[13px] text-[15px] font-medium text-navy-900 [&::-webkit-details-marker]:hidden">
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" className="flex-none transition-transform [details[open]_&]:rotate-90">
          <path d="M4 2.5 7.5 6 4 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t("records.title")}
      </summary>
      <div className="border-t border-line px-[13px] pt-3 pb-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <label htmlFor="home-rec-day" className="text-[13px] text-ink">
            {t("records.day")}
          </label>
          <select id="home-rec-day" className={cx(control, "w-full sm:w-auto sm:min-w-[240px]")} value={date} onChange={(e) => setDate(e.target.value)}>
            {days.map((d) => (
              <option key={d} value={d}>
                {label(d)}
              </option>
            ))}
          </select>
          {shown && shown.races.length > 0 && (
            <span className="text-[13px] text-ink tabular-nums" aria-live="polite">
              {t("records.dayTotal", { w: shown.winHits, p: shown.placeHits, n: shown.races.length })}
            </span>
          )}
        </div>
        {err ? (
          <p className="mt-3 text-[13px] text-bad">{t("records.error")}</p>
        ) : !shown ? (
          <div className="mt-3 flex flex-col gap-2" role="status" aria-label={t("records.loading")}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 rounded-card bg-surface-2 motion-safe:animate-pulse" />
            ))}
          </div>
        ) : shown.races.length === 0 ? (
          <p className="mt-3 text-[13px] text-ink-muted">{t("records.empty")}</p>
        ) : (
          <ul className="mt-3 divide-y divide-line rounded-card border border-line">
            {shown.races.map((r) => (
              <RecordRow key={`${r.venue}-${r.raceNo}`} r={r} />
            ))}
          </ul>
        )}
        <p className="mt-2 text-[12px] leading-normal text-ink-muted">{t("records.legend")}</p>
      </div>
    </details>
  );
}

function RecordRow({ r }: { r: HomeRecordDay["races"][number] }) {
  const { t } = useTranslation("home");
  const g = useGlossary();
  const name = (h: HomeRecordHorse) => (h.code ? <Name kind="horse" code={h.code} en={h.name} /> : h.name);
  const mark = (ok: boolean, word: string) => (
    <span
      className={cx(
        "inline-flex h-6 items-center gap-1 rounded-full px-2 text-[12px] font-medium whitespace-nowrap",
        ok ? "bg-good text-white" : "bg-surface-2 text-ink-muted"
      )}
    >
      {ok ? "✓" : "✗"} {word}
    </span>
  );
  return (
    <li className="grid gap-2 px-[13px] py-2.5 even:bg-zebra md:grid-cols-[88px_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center md:gap-4">
      <div className="flex items-center justify-between gap-2 md:block">
        <div className="text-[15px] font-medium text-navy-900">
          {t("records.race", { n: r.raceNo })} <span className="text-[13px] font-normal text-ink-muted">{g.venue(r.venue)}</span>
        </div>
        <div className="flex gap-1.5 md:hidden">
          {mark(r.win, t("records.win"))}
          {mark(r.place, t("records.place"))}
        </div>
      </div>
      <div className="min-w-0">
        <div className="text-[12px] text-ink-muted md:hidden">{t("records.picks")}</div>
        <ol className="flex flex-wrap gap-1.5">
          {r.picks.map((p) => (
            <li
              key={p.rank}
              className={cx(
                "inline-flex max-w-full items-center gap-1 rounded-control px-2 py-1 text-[13px]",
                p.won ? "bg-good text-white" : p.placed ? "bg-good-soft text-good" : "bg-surface-2 text-ink"
              )}
              title={t("records.pickTitle", { rank: p.rank, fin: p.fin ?? "–" })}
            >
              <span className="font-medium tabular-nums">{p.num}</span>
              <span className="min-w-0 truncate">{name(p)}</span>
              <span className={cx("tabular-nums text-[12px]", p.won ? "text-white/85" : "text-ink-muted")}>{p.fin ? t("records.fin", { n: p.fin }) : "–"}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="min-w-0">
        <div className="text-[12px] text-ink-muted md:hidden">{t("records.result")}</div>
        <ol className="flex flex-wrap gap-x-3 gap-y-1 text-[13px]">
          {r.top3.map((h) => (
            <li key={`${h.pos}-${h.num}`} className="inline-flex min-w-0 items-center gap-1">
              <span className="text-ink-muted tabular-nums">{h.pos}.</span>
              <span className={cx("font-medium tabular-nums", h.picked ? "text-good" : "text-ink")}>{h.num}</span>
              <span className={cx("min-w-0 truncate", h.picked ? "text-good" : "text-ink")}>{name(h)}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="hidden gap-1.5 md:flex">
        {mark(r.win, t("records.win"))}
        {mark(r.place, t("records.place"))}
      </div>
    </li>
  );
}

function Stat({ label, value, sub, more, corner, className }: { label: ReactNode; value: ReactNode; sub: ReactNode; more?: ReactNode; corner?: ReactNode; className?: string }) {
  return (
    <motion.div variants={rise} whileHover={{ y: -3 }} className={cx("flex min-w-0 flex-col rounded-card border border-line bg-surface px-[13px] pt-2.5 pb-1.5 transition-shadow hover:shadow-card", className)}>
      <div className="text-[13px] leading-snug text-ink-muted">{label}</div>
      <div className="mt-1.5 text-[26px] leading-none font-medium text-navy-900 tabular-nums sm:text-[30px]">{value}</div>
      <div className="mt-1.5 text-[13px] leading-snug text-ink">{sub}</div>
      {(more || corner) && (
        <div className="mt-auto flex items-end justify-between gap-2">
          <div>{more}</div>
          {corner && <div className="-mr-2 -mb-1">{corner}</div>}
        </div>
      )}
    </motion.div>
  );
}

// ---- 2) Member leaderboard ----
/** Two boards: top performers of the last racing day and of the last 30 days (opt-in members, settled live bets). */
function Leaderboard({ onNavigate, onOpenProfile }: { onNavigate: (v: Nav) => void; onOpenProfile: OpenProfile }) {
  const { t } = useTranslation("home");
  const fmt = useFmt();
  const auth = useAuth();
  const me = auth.user;
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const ac = new AbortController();
    homeApi
      .leaderboard(ac.signal)
      .then(setData)
      .catch((e) => (e as Error).name !== "AbortError" && setErr(true));
    return () => ac.abort();
  }, []);
  const day = (iso: string) => fmt.date(`${iso}T12:00:00+08:00`, { weekday: "short", day: "numeric", month: "short" });
  // An older cached response (before the two boards) has neither key: show the loading state until it refreshes.
  const ok = data && data.lastDay && data.last30;
  // Boards are never empty (strategy bots fill them), so invite members while either has fewer than 5 real ones.
  const fewMembers = ok && Math.min(data.lastDay.rows.filter((r) => !r.bot).length, data.last30.rows.filter((r) => !r.bot).length) < 5;

  return (
    <section aria-labelledby="home-board">
      <h2 id="home-board" className={sectionHead}>
        {t("board.title")}
      </h2>
      <div className={cx(sectionBody, "pb-1")}>
        <p className="px-[13px] pt-3 pb-1 text-[13px] leading-normal text-ink-muted sm:px-4">{t("board.intro")}</p>
        {err ? (
          <p className={cx(errorBox, "mx-[13px]")} role="alert">
            {t("board.error")}
          </p>
        ) : !ok ? (
          <div className="flex flex-col gap-2 px-[13px] pb-3" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-11 rounded-card bg-surface-2 motion-safe:animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <Board
              id="home-board-day"
              title={data.lastDay.date ? t("board.dayTitle", { date: day(data.lastDay.date) }) : t("board.dayTitleNone")}
              note={t("board.minBets", { n: data.lastDay.minBets })}
              rows={data.lastDay.rows}
              onOpenProfile={onOpenProfile}
              botWindow={{ range: "day", ...(data.lastDay.date ? { date: data.lastDay.date } : {}) }}
            />
            <Board
              id="home-board-30"
              title={t("board.monthTitle")}
              note={t("board.minBets", { n: data.last30.minBets })}
              rows={data.last30.rows}
              onOpenProfile={onOpenProfile}
              botWindow={{ range: "30d" }}
            />
            {fewMembers && (!me || !me.showOnLeaderboard) && (
              <div className="border-t border-line px-[13px] pt-3 pb-4 text-center">
                {me && !me.showOnLeaderboard && (
                  <>
                    <p className="text-[13px] text-ink-muted">{t("board.joinHint")}</p>
                    <button type="button" className={cx(btn, "mt-3 h-11")} onClick={() => onNavigate("account")}>
                      {t("board.joinCta")}
                    </button>
                  </>
                )}
                {!me && (
                  <button type="button" className={cx(btn, "h-11")} onClick={() => auth.openLogin({ source: "leaderboard" })}>
                    {t("board.loginCta")}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Board({ id, title, note, rows, onOpenProfile, botWindow }: { id: string; title: string; note: string; rows: LeaderboardRow[]; onOpenProfile: OpenProfile; botWindow: { range: "day" | "30d"; date?: string } }) {
  const skipEntrance = useSkipEntrance();
  const { t } = useTranslation("home");
  const fmt = useFmt();
  const me = useAuth().user;
  const mine = (r: LeaderboardRow) => !r.bot && !!me?.publicId && me.publicId === r.publicId;
  const roiCls = (v: number) => (v >= 0 ? "text-good" : "text-bad");
  const hasBots = rows.some((r) => r.bot);
  const botName = (r: LeaderboardRow) => t(`bots.${r.bot as BotKey}.name`, { defaultValue: r.bot ?? "" });
  /** Bots: robot avatar, "Bot" badge, muted; opens the bot's page (strategy + bets) for this board's window. */
  const bot = (r: LeaderboardRow, desktop: boolean) => (
    <button
      type="button"
      className="flex min-h-11 max-w-full min-w-0 cursor-pointer items-center gap-2 py-1 text-left text-ink-muted hover:underline"
      aria-label={t("board.openBot", { name: botName(r) })}
      onClick={() => onOpenProfile(r.publicId, botWindow)}
    >
      <span className="inline-flex size-8 flex-none items-center justify-center rounded-full bg-sky-100 text-[17px]" aria-hidden="true">
        🤖
      </span>
      <span className="min-w-0">
        {desktop ? (
          <span className="flex min-w-0 items-center gap-1.5">
            <span className="min-w-0 truncate font-medium">{botName(r)}</span>
            <span className="flex-none rounded-full bg-slate px-2 py-px text-[11px] font-medium text-white">{t("board.bot")}</span>
          </span>
        ) : (
          // Phones: the name wraps with the badge flowing after it.
          <span className="block leading-snug">
            <span className="font-medium">{botName(r)}</span>{" "}
            <span className="inline-block rounded-full bg-slate px-2 py-px align-[1px] text-[11px] font-medium whitespace-nowrap text-white">{t("board.bot")}</span>
          </span>
        )}
      </span>
    </button>
  );
  const name = (r: LeaderboardRow) => (
    <button
      type="button"
      className="inline-flex min-h-11 max-w-full min-w-0 cursor-pointer items-center gap-2 text-left font-medium text-navy-900 hover:underline"
      aria-label={t("board.openProfile", { name: r.displayName })}
      onClick={() => onOpenProfile(r.publicId)}
    >
      <Avatar name={r.displayName} src={r.avatarUrl} size="size-8" />
      <span className="min-w-0 truncate">{r.displayName}</span>
      {mine(r) && <span className="flex-none rounded-full bg-navy-700 px-2 py-px text-[11px] font-medium text-white">{t("board.you")}</span>}
    </button>
  );
  return (
    <div className="mt-2 border-t border-line first-of-type:border-t-0" role="group" aria-labelledby={id}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 px-[13px] pt-3 pb-1 sm:px-4">
        <h3 id={id} className="text-[15px] font-medium text-navy-900">
          {title}
        </h3>
        <span className="text-[12px] text-ink-muted">{note}</span>
      </div>
      <>
            {/* Phones: one card per member. */}
            <motion.ol className="flex flex-col md:hidden" variants={stagger(0.06)} initial={skipEntrance ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              {rows.map((r) => (
                <motion.li key={r.publicId} variants={rise} className={cx("flex items-center gap-2 border-t border-line px-[13px] py-1", mine(r) && "bg-sky-50")}>
                  <span className={cx("w-6 flex-none text-center text-[15px] font-bold tabular-nums", r.bot ? "text-ink-muted" : "text-navy-900")}>{r.rank}</span>
                  <div className="min-w-0 flex-1">{r.bot ? bot(r, false) : name(r)}</div>
                  <div className={cx("flex-none text-right text-[13px] leading-tight tabular-nums", r.bot && "opacity-80")}>
                    <div className={cx("text-[15px] font-medium", roiCls(r.roi))}>{signed(r.roi)}</div>
                    <div className="text-ink-muted">
                      {t("board.betsCount", { n: fmt.num(r.bets) })} · {pc(r.hitRate)}
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
            {/* ≥ md: fixed ranking table (not sortable). */}
            <div className="hidden overflow-x-auto md:block">
              <table className={cx(table, tablePad, "text-[15px]")}>
                <thead>
                  <tr>
                    <th scope="col" className="w-14 text-left!">
                      {t("board.rank")}
                    </th>
                    <th scope="col" className="text-left!">
                      {t("board.member")}
                    </th>
                    <th scope="col">{t("board.bets")}</th>
                    <th scope="col">{t("board.hit")}</th>
                    <th scope="col">{t("board.staked")}</th>
                    <th scope="col">{t("board.returned")}</th>
                    <th scope="col">{t("board.net")}</th>
                    <th scope="col">{t("board.roi")}</th>
                  </tr>
                </thead>
                <motion.tbody variants={stagger(0.06)} initial={skipEntrance ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                  {rows.map((r) => (
                    <motion.tr key={r.publicId} variants={rise} className={cx(mine(r) && "bg-sky-50!", r.bot && "text-ink-muted")} aria-current={mine(r) ? "true" : undefined}>
                      <td className={cx("text-left! font-bold tabular-nums", r.bot ? "text-ink-muted" : "text-navy-900")}>{r.rank}</td>
                      <td className="max-w-[320px] py-0! text-left!">{r.bot ? bot(r, true) : name(r)}</td>
                      <td className="tabular-nums">{fmt.num(r.bets)}</td>
                      <td className="tabular-nums">{pc(r.hitRate)}</td>
                      <td className="tabular-nums">{fmt.num(r.staked)}</td>
                      <td className="tabular-nums">{fmt.num(r.returned)}</td>
                      <td className={cx("tabular-nums", roiCls(r.net))}>{(r.net > 0 ? "+" : r.net < 0 ? "−" : "") + fmt.num(Math.abs(r.net))}</td>
                      <td className={cx("font-medium tabular-nums", roiCls(r.roi))}>{signed(r.roi)}</td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
      </>
      {hasBots && <p className="px-[13px] pt-2 pb-1 text-[12px] leading-normal text-ink-muted sm:px-4">{t("board.botNote")}</p>}
    </div>
  );
}

// ---- 3) Purposes ----
const PURPOSES = [
  { key: "practice", n: 1 },
  { key: "learn", n: 2 },
  { key: "test", n: 3 },
  { key: "track", n: 4 },
] as const;

function Purposes({ onNavigate, onUpcoming }: { onNavigate: (v: Nav) => void; onUpcoming: () => void }) {
  const skipEntrance = useSkipEntrance();
  const { t } = useTranslation("home");
  const go: Record<(typeof PURPOSES)[number]["key"], () => void> = {
    practice: () => onNavigate("bet"),
    learn: () => onNavigate("win-place"),
    test: onUpcoming,
    track: () => onNavigate("history"),
  };
  return (
    <section aria-labelledby="home-purpose">
      <h2 id="home-purpose" className={sectionHead}>
        {t("purpose.title")}
      </h2>
      {/* One full-width card per row. Phones: photo on top, then text. ≥ md: photo ~40% beside the text,
          alternating left / right (zig-zag), text vertically centred. */}
      <div className={cx(sectionBody, "flex flex-col gap-3 p-[13px] sm:p-4")}>
        {PURPOSES.map(({ key, n }, i) => {
          const title = t(`purpose.items.${key}.title`);
          return (
            <motion.article
              key={key}
              initial={skipEntrance ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={stagger(0.12)}
              className={cx("group flex min-w-0 flex-col overflow-hidden rounded-card border border-line bg-surface md:items-center", i % 2 ? "md:flex-row-reverse" : "md:flex-row")}
            >
              {/* Photo and text slide in from opposite sides (mirrored on alternate cards). */}
              <motion.div variants={slideIn(i % 2 ? 40 : -40)} className="w-full flex-none overflow-hidden md:w-2/5">
                <div className="transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]">
                  <PhotoSlot n={n} alt={t("purpose.photoAlt", { title })} />
                </div>
              </motion.div>
              <motion.div variants={slideIn(i % 2 ? -40 : 40)} className="flex min-w-0 flex-1 flex-col px-[13px] pt-3 pb-1 md:px-6 md:py-4">
                <h3 className="text-[17px] font-medium text-navy-900">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink">{t(`purpose.items.${key}.body`)}</p>
                <button type="button" className="mt-1 inline-flex min-h-11 cursor-pointer items-center self-start text-[15px] text-link hover:underline" onClick={go[key]}>
                  {t(`purpose.items.${key}.link`)} →
                </button>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

/**
 * A 4:3 photo the owner drops into public/home/purpose-N.jpg. Until then (or if it fails to load) a placeholder
 * of exactly the same size is shown, so the layout never jumps: in dev it names the file to add, in production
 * it's a quiet pattern.
 */
export function PhotoSlot({ n, alt }: { n: number; alt: string }) {
  const { t } = useTranslation("home");
  const file = `public/home/purpose-${n}.jpg`;
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current; // an error before hydration wouldn't reach onError
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed)
    return (
      <div
        role="img"
        aria-label={alt}
        className={cx(
          "flex aspect-[4/3] w-full flex-col items-center justify-center gap-1.5 text-ink-muted",
          import.meta.env.DEV ? "border-2 border-dashed border-line-strong bg-canvas" : "bg-sky-50 bg-[repeating-linear-gradient(135deg,var(--color-sky-100)_0_10px,transparent_10px_20px)]"
        )}
      >
        <svg viewBox="0 0 24 24" className="size-8" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="m4 17 5-5 4 4 3-3 4 4" />
        </svg>
        {import.meta.env.DEV && <span className="px-2 text-center font-mono text-[11px]">{t("purpose.photoSlot", { file })}</span>}
      </div>
    );
  return (
    <div className="relative">
      <img ref={ref} src={`/home/purpose-${n}.jpg`} alt={alt} width={1200} height={900} loading="lazy" decoding="async" className="block aspect-[4/3] w-full bg-canvas object-cover" onError={() => setFailed(true)} />
      {/* White fade at the bottom so the photo melts into the card. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-surface via-surface/60 to-transparent" />
    </div>
  );
}
