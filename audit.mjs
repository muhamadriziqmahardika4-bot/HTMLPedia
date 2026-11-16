import { JSDOM } from "jsdom";
import { TAGS } from "./src/data/tags.js";
import { CSS_TAGS } from "./src/data/css.js";
import { JS_TAGS } from "./src/data/js.js";
import { wrapPreview } from "./src/lib/preview.js";

let flags = [];

function bodyStats(html) {
  const doc = new JSDOM(html).window.document;
  const visible = [...doc.querySelectorAll("body *")].filter((el) => !["script", "style"].includes(el.tagName.toLowerCase()));
  return visible.length;
}

for (const entry of TAGS) {
  const html = wrapPreview(entry.contohKode, "html");
  const visibleCount = bodyStats(html);
  if (visibleCount === 0 && entry.demo !== "nonvisual") flags.push(`HTML ${entry.slug}: preview kosong!`);
}

for (const entry of CSS_TAGS) {
  const html = wrapPreview(entry.contohKode, "css");
  if (bodyStats(html) === 0) { flags.push(`CSS ${entry.slug}: preview kosong!`); continue; }
  const doc = new JSDOM(html).window.document;
  const missing = [...new Set([...entry.contohKode.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]))].filter((c) => doc.querySelector("." + c) === null);
  if (missing.length) flags.push(`CSS ${entry.slug}: selector tidak ada di preview: ${missing.join(", ")}`);
}

for (const entry of JS_TAGS) {
  const html = wrapPreview(entry.contohKode, "js");
  const dom = new JSDOM(html, { runScripts: "dangerously", url: "https://localhost/" });
  const doc = dom.window.document;
  await new Promise((r) => setTimeout(r, 700));
  const out = doc.querySelector("#out");
  if (!out) { flags.push(`JS ${entry.slug}: elemen #out tidak ada!`); continue; }
  const btn = doc.querySelector(".btn");
  if (btn) btn.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true }));
  await new Promise((r) => setTimeout(r, 100));
  if (/^(Belum ada aksi|Memuat|Memproses)/.test(out.textContent.trim())) flags.push(`JS ${entry.slug}: output tidak berubah (masih "${out.textContent.trim()}")`);
}

if (flags.length === 0) console.log("✅ Semua contoh LULUS audit otomatis (" + (TAGS.length + CSS_TAGS.length + JS_TAGS.length) + " entri).");
else { console.log("⚠️ Ditemukan " + flags.length + " masalah:"); flags.forEach((f) => console.log("  -", f)); process.exit(1); }
