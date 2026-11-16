import { describe, it, expect } from "vitest";
import { TAGS } from "../src/data/tags.js";
import { CATEGORIES } from "../src/data/categories.js";
import { validateTags } from "../src/data/validate.js";

describe("data tag HTMLpedia", () => {
  it("harus lolos semua validasi skema", () => {
    expect(validateTags(TAGS)).toEqual([]);
  });

  it("slug tidak boleh duplikat", () => {
    const slugs = TAGS.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("kategori setiap tag harus valid", () => {
    const ids = CATEGORIES.map((c) => c.id);
    for (const t of TAGS) expect(ids).toContain(t.category);
  });

  it("level hanya Pemula atau Menengah", () => {
    for (const t of TAGS) expect(["Pemula", "Menengah"]).toContain(t.level);
  });

  it("total tag minimal 100", () => {
    expect(TAGS.length).toBeGreaterThanOrEqual(100);
  });
});
