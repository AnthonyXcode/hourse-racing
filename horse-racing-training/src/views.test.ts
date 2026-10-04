import { describe, it, expect } from "vitest";
import { DEFAULT_VIEW, VIEWS, readView } from "./views";

describe("views", () => {
  it("Home is the default landing view (no ?tab=) and the first view; Bet is still reachable", () => {
    expect(DEFAULT_VIEW).toBe("home");
    expect(VIEWS[0]).toBe("home");
    expect(readView("")).toBe("home");
    expect(readView("?language=en")).toBe("home");
    expect(readView("?tab=nope")).toBe("home");
    expect(readView("?tab=bet")).toBe("bet");
    expect(readView("?tab=member&id=abc")).toBe("member");
  });
});
