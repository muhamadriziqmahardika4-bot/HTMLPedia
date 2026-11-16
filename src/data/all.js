// Gabungan semua entry yang bisa dicari: HTML + CSS + JavaScript
import { TAGS } from "./tags.js";
import { CSS_TAGS } from "./css.js";
import { JS_TAGS } from "./js.js";

export const ALL_ENTRIES = [...TAGS, ...CSS_TAGS, ...JS_TAGS];

export function findEntry(slug) {
  return ALL_ENTRIES.find((t) => t.slug === slug);
}

// Urutan belajar logis per bahasa (dari yang paling fundamental/paling dulu dipahami)
export const LEARN_ORDER = {
  html: [
    "doctype", "html", "head", "body", "title", "meta", "link", "style", "base",
    "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr",
    "strong", "em", "b", "i", "u", "s", "mark", "small", "sub", "sup",
    "abbr", "cite", "q", "blockquote", "dfn", "ins", "del",
    "ul", "ol", "li", "dl", "dt", "dd",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "colgroup", "col",
    "a", "img", "picture", "source", "figure", "figcaption",
    "audio", "video", "track", "map", "area", "math",
    "form", "input", "label", "button", "fieldset", "legend",
    "textarea", "select", "option", "optgroup", "datalist", "output", "progress", "meter",
    "div", "span", "section", "article", "aside", "header", "nav", "main", "footer", "address", "hgroup", "search",
    "time", "data", "code", "pre", "kbd", "samp", "var",
    "noscript", "script-meta", "script", "canvas", "svg", "iframe", "embed", "object", "template", "slot",
    "details", "summary", "dialog", "menu",
    // deprecated paling terakhir
    "marquee", "center", "font", "acronym",
  ],
  css: [
    "css-box-sizing", "css-color", "css-background", "css-font-family", "css-font-size",
    "css-margin", "css-padding", "css-border",
    "css-display-flex", "css-display-grid", "css-gap",
    "css-position", "css-z-index", "css-hover", "css-media-queries",
  ],
  js: [
    "js-const-let", "js-if-else", "js-for-loop", "js-function", "js-arrow-function",
    "js-querySelector", "js-addEventListener",
    "js-array-map", "js-array-filter",
    "js-promise", "js-async-await", "js-localStorage",
  ],
};

export function learningIndex(entry) {
  const lang = entry.category === "css" ? "css" : entry.category === "javascript" ? "js" : "html";
  const idx = LEARN_ORDER[lang].indexOf(entry.slug);
  const base = lang === "css" ? 1000 : lang === "js" ? 2000 : 0;
  return base + (idx === -1 ? 900 : idx);
}

// Urutan belajar berurutan: HTML → CSS → JS, masing-masing sesuai learningIndex
export const ALL_ORDERED = [...ALL_ENTRIES].sort((a, b) => learningIndex(a) - learningIndex(b));

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
