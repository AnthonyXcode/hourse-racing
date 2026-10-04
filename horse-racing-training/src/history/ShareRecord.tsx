// "Share my live record": draws a 1080×1350 PNG in the browser (no server round-trip) with the member's
// name, LIVE stats, latest settled bets, the time it was made and a Post Time logo watermark, then offers
// Download (and the native share sheet where the browser supports sharing files).
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFmt } from "../i18n/useLanguage";
import { btn, btnPrimary, cx, errorBox, modalBg, modalNarrow } from "../kit";
import { Spinner, useDialog } from "../members/ui";

/** One live bet, laid out as a two-column record (label | value) under a grey reference-number bar. */
export interface ShareBetData {
  kind: "bet";
  name: string;
  /** Short reference shown in the header bar. */
  ref: string;
  placed: string;
  pool: string;
  /** "Sha Tin Thu · Place · Race 8" then the picks, one string per line. */
  details: string[];
  stake: number;
  /** Credits back (payout + refunds); null while pending. */
  returned: number | null;
  status: string;
  statusTone: "good" | "bad" | "muted";
}

export interface ShareRecordData {
  kind?: "summary";
  name: string;
  net: number;
  roi: number;
  bets: number;
  hits: number;
  staked: number;
  returned: number;
  /** Latest settled bets, newest first (already formatted for display). */
  recent: { when: string; what: string; result: string; good: boolean }[];
}

const W = 1080;
const H = 1350;
const C = { navy900: "#122c68", navy700: "#173e96", ink: "#333333", muted: "#6a6d73", line: "#dee2e6", canvas: "#f4f4f4", good: "#1d7a47", bad: "#b4232c", gold: "#fecf13", white: "#ffffff" };
const FONT = '"Noto Sans", "Noto Sans TC", "PingFang HK", system-ui, sans-serif';

const loadImage = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null); // draw without the logo rather than fail
    img.src = src;
  });

/** Shrink text to fit `max` px wide. */
function fit(ctx: CanvasRenderingContext2D, text: string, max: number, size: number, weight = 500) {
  let s = size;
  do ctx.font = `${weight} ${s}px ${FONT}`;
  while (ctx.measureText(text).width > max && --s > 12);
  return text;
}

async function draw(canvas: HTMLCanvasElement, d: ShareRecordData, txt: Record<string, string>) {
  await document.fonts?.ready;
  const [logo, mark] = await Promise.all([loadImage("/logo-128.png"), loadImage("/logo.png")]);
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.textBaseline = "alphabetic";

  // Background + header bar.
  ctx.fillStyle = C.canvas;
  ctx.fillRect(0, 0, W, H);
  drawBrandBar(ctx, logo, txt.badge!);

  // Card.
  const card = { x: 48, y: 190, w: W - 96, h: 860 };
  ctx.fillStyle = C.white;
  ctx.beginPath();
  ctx.roundRect(card.x, card.y, card.w, card.h, 12);
  ctx.fill();

  ctx.fillStyle = C.muted;
  ctx.font = `400 28px ${FONT}`;
  ctx.fillText(txt.title!, card.x + 48, card.y + 70);
  ctx.fillStyle = C.navy900;
  fit(ctx, d.name, card.w - 96, 56, 700);
  ctx.fillText(d.name, card.x + 48, card.y + 140);

  // Headline: net + ROI.
  const tone = (v: number) => (v >= 0 ? C.good : C.bad);
  ctx.fillStyle = C.muted;
  ctx.font = `400 26px ${FONT}`;
  ctx.fillText(txt.net!, card.x + 48, card.y + 215);
  ctx.fillText(txt.roi!, card.x + 560, card.y + 215);
  ctx.font = `700 76px ${FONT}`;
  ctx.fillStyle = tone(d.net);
  ctx.fillText(txt.netValue!, card.x + 48, card.y + 300);
  // Unit word: half size, grey, after the number.
  const numW = ctx.measureText(txt.netValue!).width;
  ctx.font = `500 38px ${FONT}`;
  ctx.fillStyle = C.muted;
  ctx.fillText(txt.unit!, card.x + 48 + numW + 12, card.y + 300);
  ctx.font = `700 76px ${FONT}`;
  ctx.fillStyle = tone(d.roi);
  ctx.fillText(txt.roiValue!, card.x + 560, card.y + 300);

  // Stat row.
  const stats: [string, string][] = [
    [txt.bets!, txt.betsValue!],
    [txt.hits!, txt.hitsValue!],
    [txt.staked!, txt.stakedValue!],
    [txt.returned!, txt.returnedValue!],
  ];
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(card.x + 48, card.y + 345);
  ctx.lineTo(card.x + card.w - 48, card.y + 345);
  ctx.stroke();
  stats.forEach(([label, value], i) => {
    const x = card.x + 48 + i * ((card.w - 96) / 4);
    ctx.fillStyle = C.muted;
    ctx.font = `400 24px ${FONT}`;
    ctx.fillText(label, x, card.y + 395);
    ctx.fillStyle = C.ink;
    fit(ctx, value, (card.w - 96) / 4 - 16, 36, 700);
    ctx.fillText(value, x, card.y + 445);
  });

  // Recent settled bets.
  ctx.beginPath();
  ctx.moveTo(card.x + 48, card.y + 490);
  ctx.lineTo(card.x + card.w - 48, card.y + 490);
  ctx.stroke();
  ctx.fillStyle = C.navy900;
  ctx.font = `500 28px ${FONT}`;
  ctx.fillText(txt.recent!, card.x + 48, card.y + 540);
  d.recent.slice(0, 5).forEach((r, i) => {
    const y = card.y + 595 + i * 52;
    ctx.fillStyle = C.muted;
    ctx.font = `400 24px ${FONT}`;
    ctx.fillText(r.when, card.x + 48, y);
    ctx.fillStyle = C.ink;
    fit(ctx, r.what, 480, 26, 400);
    ctx.fillText(r.what, card.x + 230, y);
    ctx.textAlign = "right";
    ctx.fillStyle = r.good ? C.good : C.muted;
    ctx.font = `500 26px ${FONT}`;
    ctx.fillText(r.result, card.x + card.w - 48, y);
    ctx.textAlign = "left";
  });

  drawFooter(ctx, mark, txt, 1095, H);
}

/** Wrap `text` to lines no wider than `max` at the current font. CJK has no spaces, so break per character. */
function wrap(ctx: CanvasRenderingContext2D, text: string, max: number): string[] {
  const out: string[] = [];
  let line = "";
  for (const ch of Array.from(text)) {
    if (ctx.measureText(line + ch).width > max && line) {
      const cut = line.lastIndexOf(" ");
      if (cut > 0 && !/[\u3000-\u9fff]/.test(ch)) {
        out.push(line.slice(0, cut));
        line = line.slice(cut + 1) + ch;
      } else {
        out.push(line);
        line = ch.trimStart();
      }
    } else line += ch;
  }
  if (line) out.push(line);
  return out;
}

const BET_LABEL = 46;

async function drawBet(canvas: HTMLCanvasElement, d: ShareBetData, txt: Record<string, string>) {
  await document.fonts?.ready;
  const [logo, mark] = await Promise.all([loadImage("/logo-128.png"), loadImage("/logo.png")]);
  const probe = document.createElement("canvas").getContext("2d")!;
  probe.font = `500 ${BET_LABEL}px ${FONT}`;
  const card = { x: 48, w: W - 96 };
  const split = card.x + Math.round(card.w * 0.37);
  const valW = card.x + card.w - split - 48;
  const lineH = 64;
  const rows: { label: string; lines: string[]; color: string; unit?: string }[] = [
    { label: txt.member!, lines: [d.name], color: C.ink },
    { label: txt.placed!, lines: [d.placed], color: C.ink },
    { label: txt.pool!, lines: [d.pool], color: C.ink },
    { label: txt.details!, lines: d.details.flatMap((l) => wrap(probe, l, valW)), color: C.ink },
    { label: txt.stake!, lines: [txt.stakeValue!], color: C.ink, unit: txt.unit },
    { label: txt.returned!, lines: [txt.returnedValue!], color: C.ink, unit: d.returned == null ? undefined : txt.unit },
    { label: txt.result!, lines: [d.status], color: d.statusTone === "good" ? C.good : d.statusTone === "bad" ? C.bad : C.muted },
  ];
  const headerH = 130;
  const rowH = (r: (typeof rows)[number]) => 56 + r.lines.length * lineH;
  const cardTop = 190;
  const cardH = headerH + rows.reduce((h, r) => h + rowH(r), 0);
  const height = cardTop + cardH + 400;

  canvas.width = W;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = C.canvas;
  ctx.fillRect(0, 0, W, height);
  drawBrandBar(ctx, logo, txt.badge!);

  // Card with a grey reference bar.
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(card.x, cardTop, card.w, cardH, 28);
  ctx.clip();
  ctx.fillStyle = C.white;
  ctx.fillRect(card.x, cardTop, card.w, cardH);
  ctx.fillStyle = "#8c8c8c";
  ctx.fillRect(card.x, cardTop, card.w, headerH);
  ctx.restore();
  ctx.fillStyle = C.white;
  ctx.font = `500 ${BET_LABEL}px ${FONT}`;
  ctx.fillText(txt.ref!, card.x + 44, cardTop + 82);
  ctx.fillText(d.ref, split + 44, cardTop + 82);

  let y = cardTop + headerH;
  rows.forEach((r, i) => {
    const h = rowH(r);
    if (i > 0) {
      ctx.strokeStyle = C.line;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(card.x, y);
      ctx.lineTo(card.x + card.w, y);
      ctx.stroke();
    }
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(split, y + 22);
    ctx.lineTo(split, y + h - 22);
    ctx.stroke();
    ctx.fillStyle = C.ink;
    ctx.font = `500 ${BET_LABEL}px ${FONT}`;
    ctx.fillText(r.label, card.x + 44, y + 28 + lineH * 0.78);
    r.lines.forEach((line, j) => {
      const by = y + 28 + lineH * 0.78 + j * lineH;
      ctx.fillStyle = r.color;
      ctx.font = `500 ${BET_LABEL}px ${FONT}`;
      ctx.fillText(line, split + 44, by);
      if (r.unit && j === r.lines.length - 1) {
        const w = ctx.measureText(line).width;
        ctx.fillStyle = C.muted;
        ctx.font = `500 ${BET_LABEL / 2}px ${FONT}`;
        ctx.fillText(r.unit, split + 44 + w + 10, by);
      }
    });
    y += h;
  });

  drawFooter(ctx, mark, txt, cardTop + cardH + 60, height);
}

/** Navy bar with the logo, the brand and a gold tag on the right. */
function drawBrandBar(ctx: CanvasRenderingContext2D, logo: HTMLImageElement | null, badge: string) {
  ctx.fillStyle = C.navy900;
  ctx.fillRect(0, 0, W, 150);
  if (logo) ctx.drawImage(logo, 56, 35, 80, 80);
  ctx.fillStyle = C.white;
  ctx.font = `700 46px ${FONT}`;
  ctx.fillText("Post Time 開跑前", 156, 92);
  ctx.font = `500 26px ${FONT}`;
  ctx.textAlign = "right";
  ctx.fillStyle = C.gold;
  ctx.fillText(badge, W - 56, 90);
  ctx.textAlign = "left";
}

/** Generated time + disclaimer, then the faded logo watermark and site centred below. */
function drawFooter(ctx: CanvasRenderingContext2D, mark: HTMLImageElement | null, txt: Record<string, string>, top: number, height: number) {
  ctx.fillStyle = C.muted;
  ctx.font = `400 24px ${FONT}`;
  ctx.fillText(txt.generated!, 56, top);
  fit(ctx, txt.disclaimer!, W - 112, 22, 400);
  ctx.fillText(txt.disclaimer!, 56, top + 37);
  if (mark) {
    ctx.globalAlpha = 0.35;
    ctx.drawImage(mark, W / 2 - 70, height - 190, 140, 140);
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = C.muted;
  ctx.font = `500 22px ${FONT}`;
  ctx.textAlign = "center";
  ctx.globalAlpha = 0.7;
  ctx.fillText(txt.site!, W / 2, height - 22);
  ctx.globalAlpha = 1;
  ctx.textAlign = "left";
}

export default function ShareRecord({ data, onClose }: { data: ShareRecordData | ShareBetData; onClose: () => void }) {
  const { t } = useTranslation(["credits", "history"]);
  const fmt = useFmt();
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useDialog(ref, onClose, closeRef);
  const [url, setUrl] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [err, setErr] = useState(false);
  const stamp = useRef(new Date()).current;
  const isBet = data.kind === "bet";
  const file = isBet ? `post-time-bet-${data.ref}.png` : `post-time-record-${stamp.toISOString().slice(0, 10)}.png`;

  useEffect(() => {
    let alive = true;
    const signed = (v: number) => (v >= 0 ? "+" : "−") + fmt.num(Math.abs(v));
    const common: Record<string, string> = {
      badge: t("credits:share.badge"),
      unit: t("credits:unitWord"),
      generated: t("credits:share.generated", { time: fmt.date(stamp, { dateStyle: "medium", timeStyle: "short" }) }),
      disclaimer: t("credits:share.disclaimer"),
      site: "posttimehk.com",
    };
    const txt: Record<string, string> =
      data.kind === "bet"
        ? {
            ...common,
            ref: t("credits:share.bet.ref"),
            member: t("credits:share.bet.member"),
            placed: t("credits:share.bet.placed"),
            pool: t("credits:share.bet.pool"),
            details: t("credits:share.bet.details"),
            stake: t("credits:share.bet.stake"),
            returned: t("credits:share.bet.returned"),
            result: t("credits:share.bet.result"),
            stakeValue: fmt.num(data.stake),
            returnedValue: data.returned == null ? t("credits:status.pending") : fmt.num(data.returned),
          }
        : {
            ...common,
            title: t("credits:share.imageTitle"),
            net: t("history:stat.net"),
            roi: t("history:stat.roi"),
            netValue: signed(data.net),
            roiValue: `${data.roi >= 0 ? "+" : "−"}${Math.abs(data.roi).toFixed(1)}%`,
            bets: t("history:stat.bets"),
            betsValue: fmt.num(data.bets),
            hits: t("history:stat.hits"),
            hitsValue: `${fmt.num(data.hits)} · ${data.bets ? Math.round((100 * data.hits) / data.bets) : 0}%`,
            staked: t("history:stat.staked"),
            stakedValue: fmt.num(data.staked),
            returned: t("history:stat.returned"),
            returnedValue: fmt.num(data.returned),
            recent: t("credits:share.recent"),
          };
    const canvas = document.createElement("canvas");
    (data.kind === "bet" ? drawBet(canvas, data, txt) : draw(canvas, data, txt))
      .then(
        () =>
          new Promise<void>((resolve, reject) =>
            canvas.toBlob((b) => {
              if (!alive) return resolve();
              if (!b) return reject(new Error("no image"));
              setBlob(b);
              setUrl(URL.createObjectURL(b));
              resolve();
            }, "image/png")
          )
      )
      .catch(() => alive && setErr(true));
    return () => {
      alive = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => void (url && URL.revokeObjectURL(url)), [url]);

  const shareFile = blob ? new File([blob], file, { type: "image/png" }) : null;
  const canShare = !!shareFile && typeof navigator.canShare === "function" && navigator.canShare({ files: [shareFile] });

  return (
    <div className={modalBg} onClick={onClose}>
      <div ref={ref} className={cx(modalNarrow, "sm:w-[560px]!")} role="dialog" aria-modal="true" aria-labelledby="share-title" onClick={(e) => e.stopPropagation()}>
        <h2 id="share-title" className="text-[17px] font-medium text-navy-900">
          {isBet ? t("credits:share.bet.title") : t("credits:share.title")}
        </h2>
        <p className="mt-1 text-[13px] text-ink-muted">{isBet ? t("credits:share.bet.hint") : t("credits:share.hint")}</p>
        <div className="mt-3 overflow-hidden rounded-card border border-line bg-canvas">
          {err ? (
            <p className={cx(errorBox, "m-3")}>{t("credits:share.error")}</p>
          ) : url ? (
            <img src={url} alt={t("credits:share.alt", { name: data.name })} className={cx("block w-full", !isBet && "aspect-[4/5]")} />
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center gap-2 text-[13px] text-ink-muted" role="status">
              <Spinner /> {t("credits:share.making")}
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap justify-end gap-2">
          <button ref={closeRef} type="button" className={btn} onClick={onClose}>
            {t("credits:share.close")}
          </button>
          {canShare && (
            <button type="button" className={btn} onClick={() => void navigator.share({ files: [shareFile!], title: "Post Time" }).catch(() => {})}>
              {t("credits:share.shareNative")}
            </button>
          )}
          {url ? (
            <a href={url} download={file} className={cx(btnPrimary, "no-underline")}>
              {t("credits:share.download")}
            </a>
          ) : (
            <button type="button" className={btnPrimary} disabled>
              {t("credits:share.download")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
