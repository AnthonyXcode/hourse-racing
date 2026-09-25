import { describe, it, expect } from "vitest";
import { normalizeHref, readLang, withLang } from "./url";
import { en, zhHK } from "./resources";

const B = "http://localhost:5173";

describe("language in the URL", () => {
  it("defaults to Chinese; only ?language=en is English", () => {
    expect(readLang("")).toBe("zh-HK");
    expect(readLang("?tab=trio")).toBe("zh-HK");
    expect(readLang("?tab=trio&language=en")).toBe("en");
    expect(readLang("?language=en-US")).toBe("zh-HK");
    expect(readLang("?language=zh-HK")).toBe("zh-HK");
  });

  it("switching keeps other params; Chinese removes the parameter", () => {
    expect(withLang(`${B}/?tab=trio`, "en")).toBe("/?tab=trio&language=en");
    expect(withLang(`${B}/?tab=trio&language=en`, "zh-HK")).toBe("/?tab=trio");
    expect(withLang(`${B}/?language=en`, "zh-HK")).toBe("/");
  });

  it("strips invalid values, leaves valid URLs alone", () => {
    expect(normalizeHref(`${B}/?language=zh-HK&tab=trio`)).toBe("/?tab=trio");
    expect(normalizeHref(`${B}/?language=xx`)).toBe("/");
    expect(normalizeHref(`${B}/?language=`)).toBe("/");
    expect(normalizeHref(`${B}/?tab=trio&language=en`)).toBeNull();
    expect(normalizeHref(`${B}/?tab=trio`)).toBeNull();
  });
});

/** Every leaf key path of a nested dictionary. */
const keys = (o: object, p = ""): string[] =>
  Object.entries(o).flatMap(([k, v]) => (typeof v === "object" && v ? keys(v, `${p}${k}.`) : [`${p}${k}`]));

describe("dictionaries", () => {
  it("zh-HK has exactly the English keys in every namespace", () => {
    for (const ns of Object.keys(en) as (keyof typeof en)[]) {
      expect(keys(zhHK[ns]).sort(), ns).toEqual(keys(en[ns]).sort());
    }
  });

  it("no empty translations", () => {
    for (const ns of Object.keys(zhHK) as (keyof typeof zhHK)[]) {
      const flat = (o: object): string[] => Object.values(o).flatMap((v) => (typeof v === "object" && v ? flat(v) : [v as string]));
      expect(flat(zhHK[ns]).filter((v) => !v.trim()), ns).toEqual([]);
    }
  });
});
