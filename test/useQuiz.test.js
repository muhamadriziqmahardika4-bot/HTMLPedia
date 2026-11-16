import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQuiz } from "../src/hooks/useQuiz.js";

beforeEach(() => localStorage.clear());

describe("useQuiz", () => {
  it("saveStage menyimpan stage terjauh per topic:mode", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => result.current.saveStage("HTML", "latihan", 2));
    expect(result.current.best["HTML:latihan"]).toBe(2);
  });

  it("tidak menimpa stage lebih tinggi dengan stage lebih rendah", () => {
    const { result } = renderHook(() => useQuiz());
    act(() => result.current.saveStage("HTML", "greget", 5));
    act(() => result.current.saveStage("HTML", "greget", 3));
    expect(result.current.best["HTML:greget"]).toBe(5);
  });

  it("localStorage rusak -> best kosong, tidak throw", () => {
    localStorage.setItem("htmlpedia-quiz", "{{{{");
    const { result } = renderHook(() => useQuiz());
    expect(result.current.best).toEqual({});
    expect(() => act(() => result.current.saveStage("CSS", "gacor", 4))).not.toThrow();
  });
});
