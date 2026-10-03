import { describe, it, expect } from "vitest";
import {
  formatHkPhone,
  maskPhoneLog,
  maskPhoneUi,
  normalizeHkMobile,
  validateDescription,
  validateDisplayName,
  validateEmail,
  validateProfilePatch,
  validateTelegram,
  validateWhatsapp,
} from "./validation";

describe("HK login mobile", () => {
  it.each([
    ["91234567", "+85291234567"],
    ["9123 4567", "+85291234567"],
    ["9123-4567", "+85291234567"],
    ["+852 9123 4567", "+85291234567"],
    ["+852-9123-4567", "+85291234567"],
    ["85291234567", "+85291234567"],
    ["0085291234567", "+85291234567"],
    ["(852) 9123.4567", "+85291234567"],
    ["41234567", "+85241234567"],
    ["51234567", "+85251234567"],
    ["61234567", "+85261234567"],
    ["71234567", "+85271234567"],
    ["81234567", "+85281234567"],
  ])("accepts %s", (input, e164) => expect(normalizeHkMobile(input)).toBe(e164));

  it.each(["21234567", "31234567", "2345 6789", "9123456", "912345678", "+86 13800138000", "abcdefgh", "", "+852 2123 4567", "8529123456"])(
    "rejects %s",
    (input) => expect(normalizeHkMobile(input)).toBeNull()
  );

  it("only strips 852 when 8 digits remain", () => {
    expect(normalizeHkMobile("85212345")).toBe("+85285212345"); // an 8-digit number that happens to start with 852
  });

  it("rejects non-strings", () => {
    expect(normalizeHkMobile(91234567)).toBeNull();
    expect(normalizeHkMobile(undefined)).toBeNull();
  });

  it("masks for logs and UI", () => {
    expect(maskPhoneLog("+85291234567")).toBe("+852****4567");
    expect(maskPhoneUi("+85291234578")).toBe("+852 9123 ••78");
    expect(formatHkPhone("+85291234567")).toBe("+852 9123 4567");
  });
});

describe("profile fields", () => {
  it("display name: 1–20 code points after trim", () => {
    expect(validateDisplayName("")).toMatchObject({ ok: false, code: "invalid_name" });
    expect(validateDisplayName("   ")).toMatchObject({ ok: false });
    expect(validateDisplayName("A")).toEqual({ ok: true, value: "A" });
    expect(validateDisplayName("  Tony   Chan ")).toEqual({ ok: true, value: "Tony Chan" });
    expect(validateDisplayName("陳".repeat(20))).toMatchObject({ ok: true });
    expect(validateDisplayName("陳".repeat(21))).toMatchObject({ ok: false });
    expect(validateDisplayName("😀".repeat(20))).toMatchObject({ ok: true }); // emoji counts as 1
    expect(validateDisplayName("a\u0007b")).toMatchObject({ ok: false });
  });

  it("description: ≤160, ≤5 newlines, empty → null", () => {
    expect(validateDescription("")).toEqual({ ok: true, value: null });
    expect(validateDescription(null)).toEqual({ ok: true, value: null });
    expect(validateDescription("x".repeat(160))).toMatchObject({ ok: true });
    expect(validateDescription("x".repeat(161))).toMatchObject({ ok: false, code: "invalid_description" });
    expect(validateDescription("a\nb\nc\nd\ne\nf")).toMatchObject({ ok: true });
    expect(validateDescription("a\nb\nc\nd\ne\nf\ng")).toMatchObject({ ok: false });
    expect(validateDescription("<script>alert(1)</script>")).toMatchObject({ ok: true, value: "<script>alert(1)</script>" });
  });

  it("telegram: strips one @, 5–32 [A-Za-z0-9_]", () => {
    expect(validateTelegram("@my_name")).toEqual({ ok: true, value: "my_name" });
    expect(validateTelegram("abcd")).toMatchObject({ ok: false, code: "invalid_telegram" });
    expect(validateTelegram("abcde")).toMatchObject({ ok: true });
    expect(validateTelegram("a".repeat(32))).toMatchObject({ ok: true });
    expect(validateTelegram("a".repeat(33))).toMatchObject({ ok: false });
    expect(validateTelegram("a-b-c-d-e")).toMatchObject({ ok: false });
    expect(validateTelegram("@@abcde")).toMatchObject({ ok: false });
    expect(validateTelegram("")).toEqual({ ok: true, value: null });
  });

  it("whatsapp: E.164 with +", () => {
    expect(validateWhatsapp("+447911123456")).toEqual({ ok: true, value: "+447911123456" });
    expect(validateWhatsapp("+852 9123-4567")).toEqual({ ok: true, value: "+85291234567" });
    expect(validateWhatsapp("91234567")).toMatchObject({ ok: false, code: "invalid_whatsapp" });
    expect(validateWhatsapp("+0123456789")).toMatchObject({ ok: false });
  });

  it("email: RFC-lite, lower-cased", () => {
    expect(validateEmail("A@B.COM")).toEqual({ ok: true, value: "a@b.com" });
    for (const bad of ["a@b", "a@@b.com", "a b@c.com", `${"a".repeat(250)}@b.com`]) expect(validateEmail(bad)).toMatchObject({ ok: false, code: "invalid_email" });
  });

  it("patch: only known fields, sameAsLogin copies the login number, first error wins", () => {
    expect(validateProfilePatch({ displayName: " Tony ", email: "", userId: "x" }, "+85291234567")).toEqual({
      ok: true,
      patch: { displayName: "Tony", email: null },
    });
    expect(validateProfilePatch({ whatsappSameAsLogin: true, whatsapp: "bad" }, "+85291234567")).toEqual({ ok: true, patch: { whatsapp: "+85291234567" } });
    expect(validateProfilePatch({ telegram: "ab", email: "bad" }, "+85291234567")).toEqual({ ok: false, field: "telegram", code: "invalid_telegram" });
    expect(validateProfilePatch({ displayName: "" }, "+85291234567")).toEqual({ ok: false, field: "displayName", code: "invalid_name" });
  });
});

describe("invisible characters (QA-05)", () => {
  it("names need a visible character; format characters are stripped", () => {
    for (const bad of ["​", "‮", "​​ ", "﻿", "⁦⁩", "­", "‍", "​ ‌"])
      expect(validateDisplayName(bad), JSON.stringify(bad)).toMatchObject({ ok: false, code: "invalid_name" });
    expect(validateDisplayName("‮evil")).toEqual({ ok: true, value: "evil" });
    expect(validateDisplayName("To​ny")).toEqual({ ok: true, value: "Tony" });
    expect(validateDisplayName(" ​陳大文​ ")).toEqual({ ok: true, value: "陳大文" });
    expect(validateDisplayName("👨‍👩‍👧")).toEqual({ ok: true, value: "👨‍👩‍👧" }); // ZWJ emoji kept
    expect(validateDisplayName("​".repeat(30) + "A")).toEqual({ ok: true, value: "A" }); // stripped chars don't count
  });

  it("description: format characters stripped; invisible-only → null", () => {
    expect(validateDescription("​‮")).toEqual({ ok: true, value: null });
    expect(validateDescription("hi‮ there")).toEqual({ ok: true, value: "hi there" });
  });

  it("telegram: format characters stripped before the format check", () => {
    expect(validateTelegram("@​my_name")).toEqual({ ok: true, value: "my_name" });
    expect(validateTelegram("​")).toMatchObject({ ok: false, code: "invalid_telegram" });
  });

  it("patch rejects an invisible-only name", () => {
    expect(validateProfilePatch({ displayName: "​" }, "+85291234567")).toEqual({ ok: false, field: "displayName", code: "invalid_name" });
  });
});
