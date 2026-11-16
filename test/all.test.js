import { describe, it, expect } from "vitest";
import { ALL_ENTRIES } from "../src/data/all.js";
import { CATEGORIES } from "../src/data/categories.js";

describe("Gabungan materi HTML + CSS + JS", () => {
  it("slug unik di semua entri", () => {
    const slugs = ALL_ENTRIES.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("kategori setiap entri valid", () => {
    const ids = CATEGORIES.map((c) => c.id);
    for (const t of ALL_ENTRIES) expect(ids).toContain(t.category);
  });

  it("semua entri punya field wajib", () => {
    for (const t of ALL_ENTRIES) {
      for (const f of ["slug", "tag", "name", "category", "level", "summary", "contohKode", "demo"]) {
        expect(typeof t[f], `${t.slug}.${f}`).toBe("string");
        expect(t[f].length, `${t.slug}.${f}`).toBeGreaterThan(0);
      }
      expect(Array.isArray(t.atribut)).toBe(true);
    }
  });

  it("total materi minimal 140", () => {
    expect(ALL_ENTRIES.length).toBeGreaterThanOrEqual(140);
  });
});
