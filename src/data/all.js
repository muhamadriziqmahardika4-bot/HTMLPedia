// Gabungan semua entry yang bisa dicari: HTML + CSS + JavaScript
import { TAGS } from "./tags.js";
import { CSS_TAGS } from "./css.js";
import { JS_TAGS } from "./js.js";

export const ALL_ENTRIES = [...TAGS, ...CSS_TAGS, ...JS_TAGS];

export function findEntry(slug) {
  return ALL_ENTRIES.find((t) => t.slug === slug);
}

// Bahasa dari kategori — HTML / CSS / JavaScript
export function langOf(category) {
  if (category === "css") return "css";
  if (category === "javascript") return "js";
  return "html";
}

// Label bahasa untuk chip/badge
export const LANG_META = {
  html: { label: "HTML", emoji: "🌐", badgeClass: "badge-html" },
  css: { label: "CSS", emoji: "🎨", badgeClass: "badge-css" },
  js: { label: "JavaScript", emoji: "⚡", badgeClass: "badge-js" },
};
