// Post image: a 1080×1350 PNG (Instagram 4:5) drawn as an SVG and rendered with sharp (librsvg + system fonts).
// Brand look follows the in-app share image (src/history/ShareRecord.tsx): navy header bar with the logo and
// "Post Time 開跑前", gold tag, white card on the canvas grey, generated time + disclaimer footer.
// Every figure on the image comes from a gather.ts context; nothing is computed beyond counting/formatting.
//
//   npx tsx marketing/scripts/card.ts --context ctx.json [--layout auto|picks|results|record] [--out file.png]
//   npx tsx marketing/scripts/card.ts --slot pre-meeting [--date …] [--base …] [--now …]   (gathers first)
//
// Default output: marketing/out/<date>-<slot>.png. Prints the output path.
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import { gather, pillarOf, slotOf, type Context, type MeetingCtx } from "./gather";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");
const W = 1080;
const H = 1350;
const C = {
  navy900: "#122C68",
  navy700: "#173E96",
  sky100: "#E2EDF6",
  sky50: "#E8F0FE",
  ink: "#333333",
  muted: "#6A6D73",
  line: "#DEE2E6",
  canvas: "#F4F4F4",
  good: "#1D7A47",
  bad: "#B4232C",
  gold: "#FECF13",
  bankerTint: "#FFF5CC",
  disabled: "#CCCCCC",
  white: "#FFFFFF",
};
// PingFang HK on macOS; Noto Sans CJK TC on Linux (fonts-noto-cjk). librsvg/pango walks the list.
const FONT = "PingFang HK, Noto Sans CJK TC, Noto Sans TC, Heiti TC, Arial Unicode MS, sans-serif";

export type Layout = "picks" | "results" | "record";

// ---------- SVG primitives ----------

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Rough advance width in px: CJK = 1em, digits ≈ 0.6em, other Latin ≈ 0.58em, space ≈ 0.3em. */
function textW(s: string, size: number, bold = false): number {
  let w = 0;
  for (const ch of s) {
    if (/[⺀-鿿豈-﫿＀-￯　-〿]/.test(ch)) w += 1;
    else if (ch === " ") w += 0.3;
    else if (/[0-9]/.test(ch)) w += 0.6;
    else if (/[ilI.,:;'|!]/.test(ch)) w += 0.3;
    else if (/[MWmw]/.test(ch)) w += 0.85;
    else w += 0.58;
  }
  return w * size * (bold ? 1.04 : 1);
}

interface TextOpts {
  size: number;
  weight?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  /** Squeeze to this width when the text would be wider. */
  max?: number;
  opacity?: number;
}
function text(x: number, y: number, s: string, o: TextOpts): string {
  const bold = (o.weight ?? 400) >= 600;
  let size = o.size;
  // Shrink (down to 70%) before squeezing glyphs, like ShareRecord's fit().
  if (o.max) while (textW(s, size, bold) > o.max && size > o.size * 0.7) size -= 1;
  const squeeze = o.max && textW(s, size, bold) > o.max ? ` textLength="${o.max}" lengthAdjust="spacingAndGlyphs"` : "";
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${o.weight ?? 400}" fill="${o.fill ?? C.ink}" text-anchor="${o.anchor ?? "start"}"${o.opacity != null ? ` opacity="${o.opacity}"` : ""}${squeeze}>${esc(s)}</text>`;
}
const rect = (x: number, y: number, w: number, h: number, fill: string, r = 0, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${extra}/>`;
const hline = (x1: number, x2: number, y: number, color = C.line, w = 2) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${color}" stroke-width="${w}"/>`;

/** Wrap to lines of at most `max` px (CJK breaks per character, Latin at spaces). */
function wrap(s: string, size: number, max: number): string[] {
  const out: string[] = [];
  let line = "";
  for (const ch of Array.from(s)) {
    if (textW(line + ch, size) > max && line) {
      const cut = line.lastIndexOf(" ");
      if (cut > 0 && !/[　-鿿]/.test(ch)) {
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

/** Wrap a "a｜b｜c" disclaimer at its separators so no clause (e.g. the hotline number) is split. */
function wrapClauses(s: string, size: number, max: number): string[] {
  const parts = s.split("｜");
  const out: string[] = [];
  let line = "";
  for (const p of parts) {
    const next = line ? `${line}｜${p}` : p;
    if (line && textW(next, size) > max) {
      out.push(line);
      line = p;
    } else line = next;
  }
  if (line) out.push(line);
  return out.flatMap((l) => (textW(l, size) > max ? wrap(l, size, max) : [l]));
}

/** Five-point star polygon centred on (cx, cy). */
function starPath(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 ? r * 0.45 : r;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}
let clipSeq = 0;
/** The app's confidence stars (exact fraction filled in gold over grey). */
function stars(x: number, cy: number, value: number, r = 14, gap = 4): string {
  const id = `sc${clipSeq++}`;
  const step = r * 2 + gap;
  const fillW = Math.max(0, Math.min(5, value)) * step - (value >= 5 ? 0 : gap * (value % 1 === 0 ? 1 : 0));
  const all = [0, 1, 2, 3, 4].map((i) => starPath(x + r + i * step, cy, r));
  return [
    `<clipPath id="${id}"><rect x="${x}" y="${cy - r}" width="${fillW}" height="${r * 2}"/></clipPath>`,
    ...all.map((p) => `<polygon points="${p}" fill="${C.disabled}"/>`),
    `<g clip-path="url(#${id})">${all.map((p) => `<polygon points="${p}" fill="${C.gold}" stroke="#A86A12" stroke-width="1"/>`).join("")}</g>`,
  ].join("");
}

/** Navy circle with the horse number (gold ring when it is a hit). */
function numChip(cx: number, cy: number, n: number, r: number, opts: { hit?: boolean; muted?: boolean } = {}): string {
  const fill = opts.muted ? C.sky100 : C.navy700;
  const ink = opts.muted ? C.navy900 : C.white;
  const ring = opts.hit ? `<circle cx="${cx}" cy="${cy}" r="${r + 4}" fill="none" stroke="${C.gold}" stroke-width="5"/>` : "";
  return `${ring}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>` + text(cx, cy + r * 0.38, String(n), { size: Math.round(r * 1.05), weight: 700, fill: ink, anchor: "middle" });
}

/** Small rounded label. */
const pillW = (label: string, size = 24) => Math.round(textW(label, size, true) + size * 1.1);
function pill(x: number, cy: number, label: string, fill: string, ink: string, size = 24): { svg: string; w: number } {
  const w = pillW(label, size);
  const h = Math.round(size * 1.6);
  return { svg: rect(x, cy - h / 2, w, h, fill, h / 2) + text(x + w / 2, cy + size * 0.36, label, { size, weight: 700, fill: ink, anchor: "middle" }), w };
}

// ---------- shared chrome ----------

const WEEK = "日一二三四五六";
const dateZh = (iso: string) => {
  const d = new Date(`${iso}T00:00:00Z`);
  return `${d.getUTCMonth() + 1}月${d.getUTCDate()}日（${WEEK[d.getUTCDay()]}）`; // no space after the full-width bracket
};
const shortName = (p: { nameZh: string | null; name: string }) => p.nameZh ?? p.name;

function logoData(file: string): string | null {
  try {
    return `data:image/png;base64,${readFileSync(resolve(ROOT, "public", file)).toString("base64")}`;
  } catch {
    return null;
  }
}

function brandBar(badge: string): string {
  const logo = logoData("logo-128.png");
  return [
    rect(0, 0, W, 150, C.navy900),
    logo ? `<image href="${logo}" x="56" y="35" width="80" height="80"/>` : "",
    text(156, 92, "Post Time 開跑前", { size: 46, weight: 700, fill: C.white }),
    text(W - 56, 90, badge, { size: 28, weight: 600, fill: C.gold, anchor: "end" }),
  ].join("");
}

function titleBlock(title: string, subtitle: string): string {
  return text(56, 232, title, { size: 52, weight: 700, fill: C.navy900, max: W - 112 }) + text(56, 282, subtitle, { size: 28, fill: C.muted, max: W - 112 });
}

/** Generated time + disclaimer (wrapped), site centred at the bottom, faint logo mark. */
function footer(ctx: Context): string {
  const stamp = new Intl.DateTimeFormat("zh-HK", { timeZone: "Asia/Hong_Kong", year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(Date.parse(ctx.generatedAt));
  const lines = wrapClauses(ctx.disclaimer.short.zh, 22, W - 112);
  const top = H - 150 - (lines.length - 1) * 30;
  return [
    text(56, top, `資料更新：${stamp}（香港時間）`, { size: 22, fill: C.muted }),
    ...lines.map((l, i) => text(56, top + 34 + i * 30, l, { size: 22, fill: C.muted })),
    hline(56, W - 56, H - 62, C.line, 2),
    text(W / 2, H - 24, "posttimehk.com", { size: 26, weight: 600, fill: C.navy900, anchor: "middle" }),
  ].join("");
}

const CARD = { x: 40, y: 320, w: W - 80 };
/** Bottom of the space available for the card (footer starts below). */
const cardBottom = (ctx: Context) => H - 180 - (wrapClauses(ctx.disclaimer.short.zh, 22, W - 112).length - 1) * 30 - 24;

// ---------- layouts ----------

function meetingTitle(m: MeetingCtx) {
  return `${dateZh(m.date)}${m.venueZh}`;
}

/** Model top-3 picks per race, with the app's stars. Many races: one compact line each; few: big rows with chances. */
function picksLayout(ctx: Context): string {
  const m = ctx.meeting!;
  const want = ctx.nextUp ?? m.races.filter((r) => r.status === "upcoming").map((r) => r.raceNo);
  let races = m.races.filter((r) => want.includes(r.raceNo));
  if (!races.length) races = m.races.filter((r) => r.picks.length); // nothing upcoming: show the card as it stands
  const parts: string[] = [];
  const badge = ctx.slot === "pre-meeting" ? "今日賽前" : ctx.slot === "daily" ? "今日賽事" : ctx.slot === "late-meeting" ? "餘下賽事" : "下一場";
  parts.push(brandBar(badge));
  const five = m.fiveStarRaces.filter((n) => races.some((r) => r.raceNo === n));
  const sub = [`模型首3選`, `${races.length}場`, five.length ? `5星賽事 ${five.map((n) => `R${n}`).join("、")}` : null].filter(Boolean).join(" · ");
  parts.push(titleBlock(meetingTitle(m), sub));

  // Running tally strip once races have settled.
  let top = CARD.y;
  if (m.tally.settled > 0) {
    parts.push(rect(CARD.x, top, CARD.w, 64, C.bankerTint, 12));
    parts.push(text(CARD.x + 28, top + 42, `已完成 ${m.tally.settled} 場：首3選中頭馬 ${m.tally.winHits} 場 · 上名 ${m.tally.placeHits} 場`, { size: 28, weight: 600, fill: C.ink, max: CARD.w - 56 }));
    top += 84;
  }
  const bottom = cardBottom(ctx);
  const big = races.length <= 4;
  const rowH = Math.min(big ? 190 : 110, (bottom - top - 16) / races.length);
  parts.push(rect(CARD.x, top, CARD.w, races.length * rowH + 16, C.white, 16));
  races.forEach((r, i) => {
    const y = top + 8 + i * rowH;
    const cy = y + rowH / 2;
    if (i) parts.push(hline(CARD.x + 24, CARD.x + CARD.w - 24, y, C.line, 2));
    if (r.fiveStar) parts.push(rect(CARD.x + 6, y + 6, CARD.w - 12, rowH - 12, C.bankerTint, 10));
    // Race number + time.
    if (big) {
      parts.push(rect(CARD.x + 24, cy - 44, 104, 50, C.navy900, 8));
      parts.push(text(CARD.x + 76, cy - 8, `R${r.raceNo}`, { size: 34, weight: 700, fill: C.white, anchor: "middle" }));
      parts.push(text(CARD.x + 76, cy + 38, r.postTimeHK ?? "", { size: 26, fill: C.muted, anchor: "middle" }));
    } else {
      parts.push(rect(CARD.x + 24, cy - 28, 84, 34, C.navy900, 8));
      parts.push(text(CARD.x + 66, cy - 1, `R${r.raceNo}`, { size: 26, weight: 700, fill: C.white, anchor: "middle" }));
      parts.push(text(CARD.x + 66, cy + 27, r.postTimeHK ?? "", { size: 20, fill: C.muted, anchor: "middle" }));
    }
    const px = CARD.x + (big ? 150 : 130);
    const starsX = CARD.x + CARD.w - 24 - (big ? 5 * 36 : 5 * 28);
    if (big) {
      // Name rows with chances.
      const lineH = Math.min(50, (rowH - 24) / Math.max(1, r.picks.length));
      r.picks.forEach((p, j) => {
        const ly = y + 12 + lineH * (j + 0.5);
        parts.push(numChip(px + 22, ly, p.num, 20, { muted: j > 0 }));
        parts.push(text(px + 56, ly + 11, shortName(p), { size: 32, weight: j === 0 ? 700 : 500, fill: C.navy900, max: starsX - px - 330 }));
        if (p.winPct != null && p.placePct != null)
          parts.push(text(starsX - 24, ly + 10, `勝${p.winPct}% · 上名${p.placePct}%`, { size: 24, fill: C.muted, anchor: "end" }));
      });
      if (r.stars != null) parts.push(stars(starsX, y + 34, r.stars, 16, 4));
      if (r.fiveStar) parts.push(pill(starsX + 40, y + 78, "5星", C.gold, "#000", 22).svg);
    } else {
      const slot = (starsX - px - 16) / 3;
      r.picks.forEach((p, j) => {
        const x = px + j * slot;
        parts.push(numChip(x + 22, cy, p.num, 20, { muted: j > 0 }));
        parts.push(text(x + 52, cy + 11, shortName(p), { size: 30, weight: j === 0 ? 700 : 500, fill: C.navy900, max: slot - 60 }));
      });
      if (r.stars != null) parts.push(stars(starsX, cy, r.stars, 12, 4));
    }
  });
  return parts.join("");
}

/** Settled races: actual first three vs the model's top 3, with the meeting tally up top. */
function resultsLayout(ctx: Context): string {
  const m = ctx.meeting!;
  const done = m.races.filter((r) => r.result);
  const pending = m.races.filter((r) => !r.result);
  const parts: string[] = [brandBar(ctx.slot === "post-meeting" ? "賽後回顧" : "賽果更新")];
  parts.push(titleBlock(meetingTitle(m), `模型首3選 vs 頭三名 · 已完成 ${m.tally.settled}/${m.raceCount} 場${pending.length && ctx.slot === "post-meeting" ? `（${pending.map((r) => `R${r.raceNo}`).join("、")} 賽果待更新）` : ""}`));

  // Tally tiles.
  const tiles: [string, string][] = [
    [`${m.tally.winHits}/${m.tally.settled}`, "首3選中頭馬"],
    [`${m.tally.placeHits}/${m.tally.settled}`, "首3選有馬上名"],
    [`${m.tally.topPickWins}/${m.tally.settled}`, "首選勝出"],
  ];
  const tw = (CARD.w - 2 * 20) / 3;
  tiles.forEach(([v, label], i) => {
    const x = CARD.x + i * (tw + 20);
    parts.push(rect(x, CARD.y, tw, 140, C.navy900, 14));
    parts.push(text(x + tw / 2, CARD.y + 72, v, { size: 60, weight: 700, fill: C.gold, anchor: "middle" }));
    parts.push(text(x + tw / 2, CARD.y + 116, label, { size: 26, fill: C.white, anchor: "middle" }));
  });

  const top = CARD.y + 160;
  const bottom = cardBottom(ctx);
  const legendH = 44;
  const rowH = Math.min(96, (bottom - top - 16 - legendH) / Math.max(1, done.length));
  const cardH = done.length * rowH + 16 + legendH;
  parts.push(rect(CARD.x, top, CARD.w, cardH, C.white, 16));
  parts.push(text(CARD.x + CARD.w - 24, top + cardH - 18, "左起頭三名 · 金圈 = 模型首3選之一", { size: 20, fill: C.muted, anchor: "end" }));
  done.forEach((r, i) => {
    const y = top + 8 + i * rowH;
    const cy = y + rowH / 2;
    if (i) parts.push(hline(CARD.x + 24, CARD.x + CARD.w - 24, y, C.line, 2));
    parts.push(rect(CARD.x + 24, cy - 20, 76, 40, C.navy900, 8));
    parts.push(text(CARD.x + 62, cy + 10, `R${r.raceNo}`, { size: 26, weight: 700, fill: C.white, anchor: "middle" }));
    // First three: number chips (gold ring = one of the model's top 3) + winner's name.
    const res = r.result!;
    res.top3.slice(0, 3).forEach((t, j) => parts.push(numChip(CARD.x + 146 + j * 54, cy, t.num, 21, { hit: t.picked, muted: j > 0 })));
    const winner = res.top3.find((t) => t.pos === 1);
    if (winner) parts.push(text(CARD.x + 320, cy + 11, shortName(winner), { size: 30, weight: 600, fill: C.navy900, max: 260 }));
    // Outcome pill. No dividends or HK$ next to model results (PLAN.md §6.7 item 2).
    const [label, bg, ink] = res.trioHit ? ["單T命中", C.gold, "#000"] : res.winHit ? ["中頭馬", C.good, C.white] : res.placeHit ? ["有馬上名", C.sky100, C.navy900] : ["全部未入位", C.line, C.bad];
    parts.push(pill(CARD.x + CARD.w - 24 - pillW(label), cy, label, bg, ink).svg);
    if (res.topPickWon) parts.push(text(CARD.x + CARD.w - 24 - pillW(label) - 16, cy + 9, "首選勝出", { size: 24, weight: 600, fill: C.good, anchor: "end" }));
  });
  return parts.join("");
}

/** Daily: the model's rolling record, the last meeting, and today / next meeting. */
function recordLayout(ctx: Context): string {
  const r = ctx.modelRecord;
  const parts: string[] = [brandBar("模型成績")];
  parts.push(titleBlock(`${dateZh(ctx.date)}每日焦點`, r ? `模型首3選 · ${r.meetings} 個賽馬日 ${r.races} 場（${r.firstRace ?? "—"} 至 ${r.lastRace ?? "—"}）` : "模型首3選成績"));
  let y = CARD.y;
  if (r) {
    const tiles: [string, string][] = [
      [r.top3WinPct == null ? "—" : `${r.top3WinPct}%`, `首3選中頭馬（${r.top3WinHits}/${r.races}）`],
      [r.top3PlacePct == null ? "—" : `${r.top3PlacePct}%`, `首3選有馬上名（${r.top3PlaceHits}/${r.races}）`],
    ];
    const tw = (CARD.w - 20) / 2;
    tiles.forEach(([v, label], i) => {
      const x = CARD.x + i * (tw + 20);
      parts.push(rect(x, y, tw, 190, C.navy900, 16));
      parts.push(text(x + tw / 2, y + 108, v, { size: 88, weight: 700, fill: C.gold, anchor: "middle" }));
      parts.push(text(x + tw / 2, y + 160, label, { size: 28, fill: C.white, anchor: "middle", max: tw - 40 }));
    });
    y += 210;
  }
  const bottom = cardBottom(ctx);
  const cardAt = parts.push("") - 1; // placeholder: the card's height is known once its rows are laid out
  let ly = y + 64;
  const row = (label: string, value: string, sub?: string) => {
    parts.push(text(CARD.x + 36, ly, label, { size: 26, fill: C.muted }));
    parts.push(text(CARD.x + 36, ly + 48, value, { size: 36, weight: 700, fill: C.navy900, max: CARD.w - 72 }));
    if (sub) parts.push(text(CARD.x + 36, ly + 92, sub, { size: 26, fill: C.ink, max: CARD.w - 72 }));
    ly += sub ? 150 : 106;
    parts.push(hline(CARD.x + 36, CARD.x + CARD.w - 36, ly - 34));
  };
  const lm = ctx.lastMeeting;
  if (lm && lm.tally.settled) row(`上一個賽馬日 · ${dateZh(lm.date)}${lm.venueZh}`, `首3選中頭馬 ${lm.tally.winHits}/${lm.tally.settled} 場 · 上名 ${lm.tally.placeHits}/${lm.tally.settled} 場`, `首選勝出 ${lm.tally.topPickWins} 場${lm.tally.trioHits ? ` · 單T命中 ${lm.tally.trioHits} 場` : ""}`);
  const m = ctx.meeting;
  if (m) row(`今日 · ${m.venueZh} ${m.raceCount} 場`, `首場 ${m.firstPostHK ?? "—"} 開跑`, m.fiveStarRaces.length ? `5星賽事：${m.fiveStarRaces.map((n) => `R${n}`).join("、")}` : "今日暫無5星賽事");
  else if (ctx.nextMeeting) row("下一個賽馬日", `${dateZh(ctx.nextMeeting.date)}${ctx.nextMeeting.venueZh} · ${ctx.nextMeeting.raceCount} 場`);
  let end = 0;
  if (ctx.explainer && ly + 120 < bottom) {
    parts.push(text(CARD.x + 36, ly, "賽馬小知識", { size: 26, fill: C.muted }));
    wrap(ctx.explainer.zh, 30, CARD.w - 72)
      .slice(0, Math.max(1, Math.floor((bottom - ly - 40) / 44)))
      .forEach((l, i) => (parts.push(text(CARD.x + 36, ly + 48 + i * 44, l, { size: 30, fill: C.ink })), (end = ly + 48 + i * 44 + 40)));
  }
  parts[cardAt] = rect(CARD.x, y, CARD.w, Math.min(bottom, Math.max(end, ly - 34)) - y, C.white, 16);
  return parts.join("");
}

// ---------- entry ----------

export function autoLayout(ctx: Context): Layout {
  const m = ctx.meeting;
  if (ctx.slot === "daily") return "record";
  if (!m) throw new Error(`no meeting on ${ctx.date}: nothing to draw for a ${ctx.slot} post (skip it)`);
  if (ctx.slot === "post-meeting" || ctx.slot === "late-meeting") return m.tally.settled ? "results" : "picks";
  return "picks";
}

export function buildSvg(ctx: Context, layout: Layout = autoLayout(ctx)): string {
  clipSeq = 0;
  if (layout !== "record" && !ctx.meeting) throw new Error(`layout ${layout} needs a meeting in the context (none on ${ctx.date})`);
  const body = layout === "picks" ? picksLayout(ctx) : layout === "results" ? resultsLayout(ctx) : recordLayout(ctx);
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${rect(0, 0, W, H, C.canvas)}${body}${footer(ctx)}</svg>`;
}

export async function renderCard(ctx: Context, out: string, layout?: Layout): Promise<string> {
  mkdirSync(dirname(out), { recursive: true });
  await sharp(Buffer.from(buildSvg(ctx, layout)), { density: 72 }).png({ compressionLevel: 9 }).toFile(out);
  return out;
}

function parseArgs(argv: string[]) {
  const a: Record<string, string | true> = {};
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i]!;
    if (!k.startsWith("--")) throw new Error(`unexpected argument: ${k}`);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) a[k.slice(2)] = true;
    else a[k.slice(2)] = (i++, next);
  }
  return a;
}

async function main() {
  const a = parseArgs(process.argv.slice(2));
  let ctx: Context;
  if (typeof a.context === "string") ctx = JSON.parse(readFileSync(a.context, "utf8")) as Context;
  else if (a.slot !== undefined)
    ctx = await gather({
      slot: slotOf(a.slot),
      date: typeof a.date === "string" ? a.date : undefined,
      base: typeof a.base === "string" ? a.base : undefined,
      now: typeof a.now === "string" ? a.now : undefined,
      memberNames: !a["no-member-names"],
      pillar: pillarOf(a.pillar),
    });
  else throw new Error("pass --context ctx.json or --slot <slot> [--date …]");
  const layout = a.layout === undefined || a.layout === "auto" ? undefined : (String(a.layout) as Layout);
  if (layout && !["picks", "results", "record"].includes(layout)) throw new Error("--layout must be auto|picks|results|record");
  const out = typeof a.out === "string" ? resolve(a.out) : resolve(ROOT, "marketing/out", `${ctx.date}-${ctx.slot}.png`);
  if (typeof a.svg === "string") (await import("node:fs")).writeFileSync(a.svg, buildSvg(ctx, layout));
  console.log(await renderCard(ctx, out, layout));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(`card: ${e instanceof Error ? e.message : String(e)}`);
    process.exit(1);
  });
}
