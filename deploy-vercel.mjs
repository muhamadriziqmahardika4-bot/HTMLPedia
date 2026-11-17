// Deploy dist/ ke Vercel via API — tanpa Git integration.
// Butuh VERCEL_TOKEN. Nama project = htmlpedia.
import { readdirSync, statSync, readFileSync } from "fs";
import { join, relative, sep, extname } from "path";

const TOKEN = process.env.VERCEL_TOKEN;
const TEAM_ID = process.env.VERCEL_TEAM || ""; // kosong = akun personal
const PROJECT_NAME = "htmlpedia";
const API = "https://api.vercel.com";

if (!TOKEN) { console.error("❌ VERCEL_TOKEN kosong"); process.exit(1); }

// Unggah SOURCE (bukan dist) — Vercel yang build server-side.
const IGNORE = new Set(["node_modules", "dist", ".git", ".superpowers", ".env", ".env.local", ".env.production"]);
function collect(dir, base = dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (IGNORE.has(entry)) continue;
    const full = join(dir, entry);
    const rel = relative(base, full).split(sep).join("/");
    if (statSync(full).isDirectory()) out.push(...collect(full, base));
    else out.push({ rel, abs: full });
  }
  return out;
}

const TEXT_EXT = new Set([".html", ".js", ".mjs", ".css", ".svg", ".txt", ".json", ".map", ".xml", ".webmanifest", ".ico"]);
const files = collect(".").map((f) => {
  const buf = readFileSync(f.abs);
  const ext = extname(f.rel).toLowerCase();
  if (TEXT_EXT.has(ext) && !f.rel.includes("\u0000")) {
    return { file: f.rel, data: buf.toString("utf8") };
  }
  return { file: f.rel, data: buf.toString("base64"), encoding: "base64" };
});
console.log(`📦 Mengunggah ${files.length} file ke Vercel…`);

const qs = TEAM_ID ? `?teamId=${TEAM_ID}` : "";
const res = await fetch(`${API}/v13/deployments${qs}`, {
  method: "POST",
  headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    name: PROJECT_NAME,
    files,
    projectSettings: {
      framework: "vite",
      buildCommand: "npm run build",
      outputDirectory: "dist",
      installCommand: "npm ci",
    },
    target: "production",
  }),
});
const body = await res.text();
let deploy = null;
try { deploy = JSON.parse(body); } catch { /* handled */ }
if (!deploy?.id) {
  console.error("❌ Gagal membuat deployment:", res.status, body.slice(0, 500));
  process.exit(1);
}
console.log(`🚀 Deployment ${deploy.id} — status awal: ${deploy.readyState || deploy.status}`);

// Polling sampai READY/ERROR (max ~3 menit)
const deadline = Date.now() + 180000;
while (Date.now() < deadline) {
  const s = await fetch(`${API}/v13/deployments/${deploy.id}${qs}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const st = await s.json();
  const state = st.readyState || st.status;
  if (state === "READY" || state === "ERROR" || state === "CANCELED") {
    const url = st.url ? `https://${st.url}` : "(tidak ada url)";
    if (state === "READY") {
      console.log("✅ Deployment siap!");
      console.log("🌐 URL:", url);
    } else {
      console.error(`❌ Deployment ${state}`);
    }
    process.exit(state === "READY" ? 0 : 1);
  }
  await new Promise((r) => setTimeout(r, 5000));
}
console.error("⏱️ Timeout menunggu deployment — cek dashboard Vercel.");
process.exit(1);
