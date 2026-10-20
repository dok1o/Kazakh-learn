import { describe, it, expect } from "vitest";
import { checkTyped, checkTokens, normalizeAnswer, gradeVocab, newVocabState, SRS_INTERVALS_MS } from "./core";

describe("answer validation", () => {
  it("accepts correct Kazakh with different case/punctuation", () => {
    expect(checkTyped("Сәлем!", ["сәлем"])).toBe(true);
    expect(checkTyped("  рақмет. ", ["рақмет"])).toBe(true);
  });
  it("does not confuse Қ with К (meaning-bearing letters)", () => {
    expect(checkTyped("қала", ["қала"])).toBe(true);
    expect(checkTyped("кала", ["қала"])).toBe(false);
  });
  it("rejects empty and wrong answers", () => {
    expect(checkTyped("", ["су"])).toBe(false);
    expect(checkTyped("нан", ["су"])).toBe(false);
  });
  it("checks token order", () => {
    expect(checkTokens(["Менің", "атым"], ["Менің", "атым"])).toBe(true);
    expect(checkTokens(["атым", "Менің"], ["Менің", "атым"])).toBe(false);
    expect(normalizeAnswer("ҚАЛА?")).toBe("қала");
  });
});

describe("SRS scheduler", () => {
  it("advances box and schedules future review on correct", () => {
    const now = 1_000_000;
    const s = gradeVocab(newVocabState(now), true, now);
    expect(s.box).toBe(1);
    expect(s.due).toBe(now + SRS_INTERVALS_MS[1]);
    expect(s.correct).toBe(1);
  });
  it("resets to box 0 on wrong", () => {
    const now = 5_000_000;
    const s1 = gradeVocab(newVocabState(now), true, now);
    const s2 = gradeVocab(s1, false, now);
    expect(s2.box).toBe(0);
    expect(s2.wrong).toBe(1);
    expect(s2.due).toBe(now + SRS_INTERVALS_MS[0]);
  });
});
