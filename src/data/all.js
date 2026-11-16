// Gabungan semua entry yang bisa dicari: HTML + CSS + JavaScript
import { TAGS } from "./tags.js";
import { CSS_TAGS } from "./css.js";
import { JS_TAGS } from "./js.js";

export const ALL_ENTRIES = [...TAGS, ...CSS_TAGS, ...JS_TAGS];
export function findEntry(slug) {
  return ALL_ENTRIES.find((t) => t.slug === slug);
}
