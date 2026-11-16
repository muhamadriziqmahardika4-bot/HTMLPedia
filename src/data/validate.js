import { CATEGORIES } from "./categories.js";

const CATEGORY_IDS = new Set(CATEGORIES.map((c) => c.id));
const LEVELS = new Set(["Pemula", "Menengah"]);

/**
 * Validasi array entri tag. Mengembalikan daftar error (string).
 * Array kosong berarti semua entri valid.
 */
export function validateTags(tags) {
  const errors = [];
  const slugs = new Map();

  tags.forEach((t, i) => {
    const label = t?.slug ? `tag "${t.slug}"` : `entri index ${i}`;

    // Field wajib non-kosong
    for (const field of ["slug", "tag", "name", "category", "level", "summary", "contohKode", "demo"]) {
      if (typeof t[field] !== "string" || t[field].trim() === "") {
        errors.push(`${label}: field "${field}" kosong atau bukan string`);
      }
    }

    // atribut: array objek { name, desc }
    if (!Array.isArray(t.atribut)) {
      errors.push(`${label}: "atribut" harus berupa array`);
    } else {
      t.atribut.forEach((a, j) => {
        if (!a || typeof a.name !== "string" || a.name.trim() === "" || typeof a.desc !== "string" || a.desc.trim() === "") {
          errors.push(`${label}: atribut[${j}] harus { name, desc } non-kosong`);
        }
      });
    }

    // related: array slug (boleh kosong)
    if (!Array.isArray(t.related)) {
      errors.push(`${label}: "related" harus berupa array`);
    }

    // Unik slug
    if (typeof t.slug === "string" && t.slug) {
      if (slugs.has(t.slug)) errors.push(`${label}: slug duplikat (juga di index ${slugs.get(t.slug)})`);
      else slugs.set(t.slug, i);
    }

    // Kategori valid
    if (t.category && !CATEGORY_IDS.has(t.category)) {
      errors.push(`${label}: kategori "${t.category}" tidak dikenal`);
    }

    // Level valid
    if (t.level && !LEVELS.has(t.level)) {
      errors.push(`${label}: level "${t.level}" harus "Pemula" atau "Menengah"`);
    }
  });

  // related harus menunjuk slug yang ada
  const all = new Set(tags.map((t) => t.slug));
  tags.forEach((t, i) => {
    (t.related || []).forEach((r) => {
      if (!all.has(r)) errors.push(`tag "${t.slug}": related "${r}" tidak ada di TAGS`);
    });
  });

  return errors;
}
