import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQuiz } from "../src/hooks/useQuiz.js";

beforeEach(() => localStorage.clear());

describe("useQuiz", () => {
  it("saveResult menyimpan skor terbaik per topic:mode", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => result.current.saveResult("HTML", "latihan", 2, 3));
    expect(result.current.best["HTML:latihan"]).toBe(2);
  });

  it("tidak menimpa skor lebih tinggi dengan skor lebih rendah", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => result.current.saveResult("HTML", "greget", 5, 5));
    act(() => result.current.saveResult("HTML", "greget", 3, 5));
    expect(result.current.best["HTML:greget"]).toBe(5);
  });

  it("localStorage rusak -> best kosong, tidak throw", () => {
    localStorage.setItem("htmlpedia-quiz", "{{{{");
    const { result } = renderHook(() => useQuiz());
    expect(result.current.best).toEqual({});
    expect(() => act(() => result.current.saveResult("CSS", "gacor", 4, 6))).not.toThrow();
  });
});
