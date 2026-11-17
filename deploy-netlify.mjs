// Deploy dist/ ke Netlify via API — tanpa CLI.
// Butuh: NETLIFY_TOKEN (personal access token) dan SITE_NAME (slug situs).

import { readFileSync, readdirSync, statSync, createReadStream } from "fs";
import { join, relative, sep } from "path";
import { createHash } from "crypto";

const TOKEN = process.env.NETLIFY_TOKEN;
const SITE_NAME = process.env.SITE_NAME || "htmlpedia-mahardika";
const API = "https://api.netlify.com/api/v1";

if (!TOKEN) {
  console.error("❌ NETLIFY_TOKEN kosong");
  process.exit(1);
}

// ===== 1. Kumpulkan semua file di dist/ =====
function collect(dir, base = dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = relative(base, full).split(sep).join("/");
    const s = statSync(full);
    if (s.isDirectory()) out.push(...collect(full, base));
    else out.push({ rel, abs: full, size: s.size });
  }
  return out;
}
const files = collect("dist");

// ===== 2. Buat situs (atau pakai yang sudah ada) =====
const createRes = await fetch(`${API}/sites`, {
  method: "POST",
  headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
  body: JSON.stringify({ name: SITE_NAME }),
});
let site = null;
const createBody = await createRes.text();
try { site = JSON.parse(createBody); } catch { /* akan ditangani */ }
if (!site?.id) {
  // Situs mungkin sudah ada — cari by name
  const listRes = await fetch(`${API}/sites`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  const list = JSON.parse(await listRes.text());
  site = list.find((s) => s.name === SITE_NAME) || null;
  if (!site) {
    console.error("❌ Gagal membuat situs:", createRes.status, createBody.slice(0, 400));
    process.exit(1);
  }
  console.log("ℹ️  Situs sudah ada, pakai yang ada:", site.name);
} else {
  console.log("✅ Situs baru dibuat:", site.name, "→", site.url || site.ssl_url || site.admin_url);
}

// ===== 3. Siapkan manifest file (sha1) =====
const manifest = {};
for (const f of files) {
  const buf = readFileSync(f.abs);
  const hash = createHash("sha1").update(buf).digest("hex");
  manifest["/" + f.rel] = hash;
}
console.log(`📦 Mengunggah ${files.length} file…`);

// ===== 4. Buat deploy dengan manifest =====
const deployRes = await fetch(`${API}/sites/${site.id}/deploys`, {
  method: "POST",
  headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
  body: JSON.stringify({ files: manifest }),
});
const deployBody = await deployRes.text();
let deploy = null;
try { deploy = JSON.parse(deployBody); } catch { /* akan ditangani */ }
if (!deploy?.id) {
  console.error("❌ Gagal membuat deploy:", deployRes.status, deployBody.slice(0, 400));
  process.exit(1);
}
const required = deploy.required || Object.keys(manifest);
console.log(`🚀 Deploy #${deploy.id} — perlu upload ${required.length} file`);

// Peta hash → file
const hashToFile = {};
for (const f of files) {
  hashToFile[createHash("sha1").update(readFileSync(f.abs)).digest("hex")] = f;
}

// ===== 5. Upload file yang diminta (endpoint memakai hash) =====
let ok = 0, fail = 0;
for (const sha1 of required) {
  const f = hashToFile[sha1];
  if (!f) { console.warn("  ⚠️ hash tidak ditemukan:", sha1); fail++; continue; }
  const buf = readFileSync(f.abs);
  const putRes = await fetch(`${API}/deploys/${deploy.id}/files/${encodeURI(f.rel)}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/octet-stream" },
    body: buf,
  });
  if (putRes.ok) ok++; else { console.warn(`  ⚠️ gagal upload ${f.rel}: ${putRes.status}`); fail++; }
}

console.log(`\n✅ Selesai: ${ok}/${required.length} file terunggah${fail ? `, ${fail} gagal` : ""}`);
console.log("🌐 URL situs:", site.ssl_url || site.url || `https://${SITE_NAME}.netlify.app`);
