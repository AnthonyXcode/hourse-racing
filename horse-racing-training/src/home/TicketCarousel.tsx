// Home "Upcoming tickets": a looping Embla carousel of bet tickets for races still to run, laid out like the shared
// bet image (ShareRecord drawBet: grey reference bar, then label | value rows), with Embla's predefined "Scale"
// tween (embla-carousel.com/docs/examples/predefined). Members' bets come first by stake; strategy bots fill in when
// there are few; members who keep their record private show with a blurred name. Autoplays (pausable; off under
// reduced motion). Hidden when there is nothing to show (no meeting coming up).
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import type { HomeTicket } from "../../shared/types";
import { cx, errorBox, sectionBody, sectionHead, statusChip } from "../kit";
import { useFmt } from "../i18n/useLanguage";
import { useGlossary } from "../i18n/glossary";
import { Avatar } from "../members/ui";
import { homeApi } from "./api";

type OpenProfile = (publicId: string, extra?: { range?: "day" | "30d"; date?: string }) => void;
type BotKey = "comet" | "thunder" | "jade" | "phoenix" | "typhoon" | "harbour" | "dragon";

const AUTO_MS = 4000;
/**
 * Embla's Scale example tween; the neighbouring ticket shows at 1 − this. The example's 0.52 shrinks a ticket to
 * about half, too small to read, so ours is gentler.
 */
const TWEEN_FACTOR_BASE = 0.2;
const within = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

export function TicketCarousel({ onOpenProfile }: { onOpenProfile: OpenProfile }) {
  const { t } = useTranslation("home");
  const [tickets, setTickets] = useState<HomeTicket[] | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const ac = new AbortController();
    homeApi
      .tickets(ac.signal)
      .then((r) => setTickets(r.tickets ?? []))
      .catch((e) => (e as Error).name !== "AbortError" && setErr(true));
    return () => ac.abort();
  }, []);

  // Pausing removes the Autoplay plugin: it restarts itself on mouse-leave / touch-release otherwise.
  const [playing, setPlaying] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const plugins = useMemo(() => (playing ? [Autoplay({ delay: AUTO_MS, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })] : []), [playing]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  // ---- Scale tween (Embla predefined example) ----
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);
  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api.slideNodes().map((n) => n.querySelector<HTMLElement>("[data-tween]")!);
  }, []);
  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
  }, []);
  const tweenScale = useCallback((api: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = api.internalEngine();
    const progress = api.scrollProgress();
    const inView = api.slidesInView();
    const isScroll = eventName === "scroll";
    api.scrollSnapList().forEach((snap, snapIndex) => {
      let diff = snap - progress;
      engine.slideRegistry[snapIndex]!.forEach((slideIndex) => {
        if (isScroll && !inView.includes(slideIndex)) return;
        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diff = snap - (1 + progress);
              if (sign === 1) diff = snap + (1 - progress);
            }
          });
        }
        const node = tweenNodes.current[slideIndex];
        if (node) node.style.transform = `scale(${within(1 - Math.abs(diff * tweenFactor.current), 0, 1)})`;
      });
    });
  }, []);
  useEffect(() => {
    if (!emblaApi) return;
    const sync = (api: EmblaCarouselType) => {
      setSnaps(api.scrollSnapList());
      setSelected(api.selectedScrollSnap());
    };
    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);
    sync(emblaApi);
    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale)
      .on("reInit", sync)
      .on("select", sync);
    return () => {
      emblaApi
        .off("reInit", setTweenNodes)
        .off("reInit", setTweenFactor)
        .off("reInit", tweenScale)
        .off("scroll", tweenScale)
        .off("slideFocus", tweenScale)
        .off("reInit", sync)
        .off("select", sync);
    };
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenScale]);

  if (tickets && !tickets.length) return null;
  const ctl = "size-8 flex-none cursor-pointer items-center justify-center rounded-full border border-white/60 text-white transition-colors hover:bg-white/15";
  return (
    <section aria-labelledby="home-tickets">
      <div className={sectionHead}>
        <h2 id="home-tickets" className="min-w-0 flex-1">
          {t("tickets.title")}
        </h2>
        {tickets && (
          <div className="flex flex-none gap-2">
            <button type="button" className={cx(ctl, "inline-flex")} aria-label={playing ? t("tickets.pause") : t("tickets.play")} aria-controls="home-ticket-strip" onClick={() => setPlaying((p) => !p)}>
              {playing ? (
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 fill-current">
                  <rect x="4" y="3" width="3" height="10" rx="0.5" />
                  <rect x="9" y="3" width="3" height="10" rx="0.5" />
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 fill-current">
                  <path d="M5 3v10l8-5z" />
                </svg>
              )}
            </button>
            <button type="button" className={cx(ctl, "hidden sm:inline-flex")} aria-label={t("tickets.prev")} aria-controls="home-ticket-strip" onClick={() => emblaApi?.scrollPrev()}>
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 fill-none stroke-current" strokeWidth="2">
                <path d="M10 3 5 8l5 5" />
              </svg>
            </button>
            <button type="button" className={cx(ctl, "hidden sm:inline-flex")} aria-label={t("tickets.next")} aria-controls="home-ticket-strip" onClick={() => emblaApi?.scrollNext()}>
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 fill-none stroke-current" strokeWidth="2">
                <path d="m6 3 5 5-5 5" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className={cx(sectionBody, "pt-3 pb-2")}>
        {err ? (
          <p className={cx(errorBox, "mx-[13px]")} role="alert">
            {t("tickets.error")}
          </p>
        ) : !tickets ? (
          <div className="flex justify-center gap-3 overflow-hidden px-[13px] pb-3" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-72 w-[272px] flex-none rounded-card bg-surface-2 motion-safe:animate-pulse sm:w-[300px]" />
            ))}
          </div>
        ) : (
          <>
            <div id="home-ticket-strip" ref={emblaRef} className="overflow-hidden" role="region" aria-roledescription="carousel" aria-label={t("tickets.region")}>
              <ul className="ml-[-12px] flex touch-pan-y">
                {tickets.map((tk, i) => (
                  <li
                    key={`${tk.publicId}-${tk.ref}`}
                    className="min-w-0 flex-[0_0_72%] pl-3 sm:flex-[0_0_320px]"
                    aria-roledescription="slide"
                    aria-label={t("tickets.slide", { n: i + 1, total: tickets.length })}
                  >
                    <div data-tween className="h-full">
                      <Ticket tk={tk} onOpenProfile={onOpenProfile} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {snaps.length > 1 && (
              <div className="mt-1 flex flex-wrap justify-center">
                {snaps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="group inline-flex size-7 cursor-pointer items-center justify-center"
                    aria-label={t("tickets.goTo", { n: i + 1 })}
                    aria-current={i === selected ? "true" : undefined}
                    onClick={() => emblaApi?.scrollTo(i)}
                  >
                    <span className={cx("block size-2 rounded-full transition-colors", i === selected ? "bg-navy-700" : "bg-line-strong group-hover:bg-slate")} />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Ticket({ tk, onOpenProfile }: { tk: HomeTicket; onOpenProfile: OpenProfile }) {
  const { t } = useTranslation(["home", "credits", "common"]);
  const fmt = useFmt();
  const g = useGlossary();
  const picks = tk.picks.replaceAll("膽", t("common:role.bankerShort")).replaceAll("腳", t("common:role.legShort"));
  const day = fmt.date(`${tk.date}T12:00:00+08:00`, { weekday: "long" });
  const botName = tk.bot ? t(`home:bots.${tk.bot as BotKey}.name`, { defaultValue: tk.bot }) : "";
  const row = "grid grid-cols-[37%_1fr] border-t border-line";
  const label = "border-r border-line px-3 py-2 text-ink";
  const value = "min-w-0 px-3 py-2 text-ink";
  return (
    <article className="h-full overflow-hidden rounded-card border border-line bg-surface text-[13px] leading-snug sm:text-[15px]" aria-label={`${t("credits:share.bet.ref")} ${tk.ref}`}>
      <div className="grid grid-cols-[37%_1fr] bg-ink-muted font-medium text-white">
        <span className="px-3 py-2.5">{t("credits:share.bet.ref")}</span>
        <span className="px-3 py-2.5 tabular-nums">{tk.ref}</span>
      </div>
      <dl>
        <div className={cx(row, "border-t-0")}>
          <dt className={label}>{t("credits:share.bet.member")}</dt>
          <dd className={cx(value, "py-0.5")}>
            {tk.hidden ? (
              // A member who keeps their record private: the server sends no name, so this is a blurred stand-in.
              <span className="flex min-h-11 items-center gap-1.5">
                <span className="inline-flex size-7 flex-none rounded-full bg-sky-100 blur-[2px]" aria-hidden="true" />
                <span className="font-medium text-navy-900 blur-[5px] select-none" aria-hidden="true">
                  {t("home:tickets.hiddenName")}
                </span>
                <span className="sr-only">{t("home:tickets.hiddenMember")}</span>
              </span>
            ) : tk.bot ? (
              <button
                type="button"
                className="flex min-h-11 max-w-full min-w-0 cursor-pointer items-center gap-1.5 text-left text-ink-muted hover:underline"
                aria-label={t("home:board.openBot", { name: botName })}
                onClick={() => onOpenProfile(tk.publicId, { range: "30d" })}
              >
                <span className="inline-flex size-7 flex-none items-center justify-center rounded-full bg-sky-100 text-[15px]" aria-hidden="true">
                  🤖
                </span>
                <span className="min-w-0 truncate font-medium">{botName}</span>
                <span className="flex-none rounded-full bg-slate px-2 py-px text-[11px] font-medium text-white">{t("home:board.bot")}</span>
              </button>
            ) : (
              <button
                type="button"
                className="flex min-h-11 max-w-full min-w-0 cursor-pointer items-center gap-1.5 text-left font-medium text-navy-900 hover:underline"
                aria-label={t("home:board.openProfile", { name: tk.displayName })}
                onClick={() => onOpenProfile(tk.publicId)}
              >
                <Avatar name={tk.displayName} src={tk.avatarUrl} size="size-7" />
                <span className="min-w-0 truncate">{tk.displayName}</span>
              </button>
            )}
          </dd>
        </div>
        <div className={row}>
          <dt className={label}>{t("home:tickets.postTime")}</dt>
          <dd className={cx(value, "tabular-nums")}>
            {tk.postTime ? fmt.date(tk.postTime, { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }) : "—"}
          </dd>
        </div>
        <div className={row}>
          <dt className={label}>{t("credits:share.bet.pool")}</dt>
          <dd className={value}>{g.betType(tk.betType)}</dd>
        </div>
        <div className={row}>
          <dt className={label}>{t("credits:share.bet.details")}</dt>
          <dd className={cx(value, "break-words")}>
            <span className="block">
              {g.venue(tk.venue)} {day}
            </span>
            <span className="block tabular-nums">{picks}</span>
          </dd>
        </div>
        <div className={row}>
          <dt className={label}>{t("credits:share.bet.stake")}</dt>
          <dd className={cx(value, "font-medium tabular-nums")}>
            {fmt.num(tk.stake)} <span className="text-[11px] font-normal text-ink-muted sm:text-[13px]">{t("credits:unitWord")}</span>
          </dd>
        </div>
        <div className={row}>
          <dt className={label}>{t("credits:share.bet.result")}</dt>
          <dd className={value}>
            <span className={statusChip("pending")}>{t("home:tickets.toRun")}</span>
          </dd>
        </div>
      </dl>
    </article>
  );
}
