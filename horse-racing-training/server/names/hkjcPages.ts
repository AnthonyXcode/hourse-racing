// Polite fetcher for HKJC's zh-HK racing pages: one request at a time, at least `minGapMs` apart.
const BASE = "https://racing.hkjc.com/zh-hk/local/information";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

/** race id "2026-09-23-HV-1" → the Chinese results page for that race. */
export function resultsUrl(raceId: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})-(ST|HV)-(\d{1,2})$/.exec(raceId);
  if (!m) return null;
  const [, y, mo, d, venue, rn] = m;
  return `${BASE}/localresults?RaceDate=${y}/${mo}/${d}&Racecourse=${venue}&RaceNo=${Number(rn)}`;
}
export const horseUrl = (code: string) => `${BASE}/horse?horseid=${encodeURIComponent(code)}`;
export const trainerUrl = (code: string) => `${BASE}/trainerprofile?trainerid=${encodeURIComponent(code)}`;

export interface PageClient {
  get(url: string): Promise<string>;
}

export function pageClient(opts: { fetchImpl?: typeof fetch; minGapMs?: number; timeoutMs?: number } = {}): PageClient {
  const doFetch = opts.fetchImpl ?? fetch;
  const minGapMs = opts.minGapMs ?? 1000;
  const timeoutMs = opts.timeoutMs ?? 10_000;
  let chain: Promise<unknown> = Promise.resolve();
  let last = 0;

  async function once(url: string): Promise<string> {
    const wait = last + minGapMs - Date.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    last = Date.now();
    const res = await doFetch(url, {
      headers: { "user-agent": UA, "accept-language": "zh-HK,zh;q=0.9", accept: "text/html" },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) throw new Error(`HKJC ${res.status} for ${url}`);
    return res.text();
  }

  return {
    get(url) {
      const p = chain.then(() => once(url));
      chain = p.catch(() => {}); // a failure must not stall the queue
      return p;
    },
  };
}
