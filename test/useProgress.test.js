import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProgress } from "../src/hooks/useProgress.js";

beforeEach(() => localStorage.clear());

describe("useProgress", () => {
  it("toggle menambah dan menghapus slug, tersimpan di localStorage", () => {
    const { result } = renderHook(() => useProgress(114));
    expect(result.current.done).toEqual([]);

    act(() => result.current.toggle("table"));
    expect(result.current.done).toEqual(["table"]);
    expect(JSON.parse(localStorage.getItem("htmlpedia-progress"))).toEqual(["table"]);

    act(() => result.current.toggle("table"));
    expect(result.current.done).toEqual([]);
  });

  it("localStorage rusak -> kembali array kosong, tidak throw", () => {
    localStorage.setItem("htmlpedia-progress", "{rusak-sekali");
    const { result } = renderHook(() => useProgress(114));
    expect(result.current.done).toEqual([]);
    expect(() => act(() => result.current.toggle("a"))).not.toThrow();
  });

  it("localStorage berisi bukan array -> array kosong", () => {
    localStorage.setItem("htmlpedia-progress", JSON.stringify({ hello: 1 }));
    const { result } = renderHook(() => useProgress(114));
    expect(result.current.done).toEqual([]);
  });
});
