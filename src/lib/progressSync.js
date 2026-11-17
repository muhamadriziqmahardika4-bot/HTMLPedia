// Sinkronisasi progress localStorage <-> Supabase (tabel user_progress).
// Strategi: merge UNION per kunci, supaya tidak ada yang hilang saat pindah perangkat.
// Disebut dari setiap titik yang menulis localStorage + sekali saat login.
import { supabase, isSupabaseConfigured } from "./supabase.js";

const TABLE = "user_progress";

// ---------- helper baca/tulis localStorage ----------
function readKey(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}
function writeKey(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // penuh/ditolak — abaikan
  }
}

// ---------- merge union per kunci ----------
const unionStringArray = (a, b) => [...new Set([...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])])];
const unionDates = (a, b) => unionStringArray(a, b).sort();
const maxPerKey = (a, b) => {
  const out = { ...(a && typeof a === "object" ? a : {}) };
  for (const [k, v] of Object.entries(b && typeof b === "object" ? b : {})) {
    const cur = typeof out[k] === "number" ? out[k] : 0;
    const nv = typeof v === "number" ? v : 0;
    out[k] = Math.max(cur, nv);
  }
  return out;
};
const mergeMistakes = (a, b) => {
  const list = [...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])];
  const byQ = new Map();
  for (const m of list) {
    if (!m || typeof m.q !== "string") continue;
    const prev = byQ.get(m.q);
    const mDate = typeof m.date === "number" ? m.date : 0;
    const pDate = prev && typeof prev.date === "number" ? prev.date : 0;
    if (!prev || mDate >= pDate) byQ.set(m.q, m);
  }
  return [...byQ.values()].sort((x, y) => (y.date || 0) - (x.date || 0));
};
const unionStages = (a, b) => {
  const out = { ...(a && typeof a === "object" ? a : {}) };
  for (const [k, v] of Object.entries(b && typeof b === "object" ? b : {})) {
    out[k] = unionStringArray(out[k], v).sort((x, y) => Number(x) - Number(y));
  }
  return out;
};
// kode proyek: per proyek, yang tidak kosong menang (lokal diprioritaskan)
const mergeCode = (local, cloud) => {
  const out = { ...(cloud && typeof cloud === "object" ? cloud : {}) };
  for (const [k, v] of Object.entries(local && typeof local === "object" ? local : {})) {
    if (typeof v === "string" && v.trim()) out[k] = v;
    else if (!(k in out)) out[k] = v;
  }
  return out;
};

const KEYS = [
  { key: "htmlpedia-progress", merge: unionStringArray, fallback: [] },
  { key: "htmlpedia-quiz", merge: maxPerKey, fallback: {} },
  { key: "htmlpedia-activity", merge: unionDates, fallback: [] },
  { key: "htmlpedia-mistakes", merge: mergeMistakes, fallback: [] },
  { key: "htmlpedia-projects", merge: unionStages, fallback: {} },
  { key: "htmlpedia-code", merge: mergeCode, fallback: {} },
];

// Gabungkan snapshot cloud + lokal (tanpa side-effect).
export function mergeSnapshots(cloud, local) {
  const c = cloud && typeof cloud === "object" ? cloud : {};
  const l = local && typeof local === "object" ? local : {};
  const out = {};
  for (const { key, merge, fallback } of KEYS) {
    out[key] = merge(l[key] ?? fallback, c[key] ?? fallback);
  }
  return out;
}

function snapshotLocal() {
  const out = {};
  for (const { key, fallback } of KEYS) out[key] = readKey(key, fallback);
  return out;
}

function applySnapshot(data) {
  for (const { key } of KEYS) writeKey(key, data[key]);
}

async function currentUserId() {
  if (!isSupabaseConfigured) return null;
  const { data } = await supabase.auth.getUser();
  return data?.user?.id ?? null;
}

// Tarik dari cloud → merge dengan lokal → tulis lokal → dorong ke cloud.
export async function pullMergePush() {
  const uid = await currentUserId();
  if (!uid) return { ok: false, reason: "belum login" };
  try {
    const { data: row, error } = await supabase.from(TABLE).select("data").eq("user_id", uid).maybeSingle();
    if (error) throw error;
    const cloud = row?.data ?? {};
    const merged = mergeSnapshots(cloud, snapshotLocal());
    applySnapshot(merged);
    const { error: upErr } = await supabase
      .from(TABLE)
      .upsert({ user_id: uid, data: merged, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    if (upErr) throw upErr;
    return { ok: true };
  } catch (e) {
    console.warn("Sync progress gagal:", e?.message || e);
    return { ok: false, reason: e?.message || String(e) };
  }
}

// Dorong snapshot lokal ke cloud (dipanggil setelah setiap perubahan).
async function pushNow() {
  const uid = await currentUserId();
  if (!uid) return;
  try {
    await supabase
      .from(TABLE)
      .upsert({ user_id: uid, data: snapshotLocal(), updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  } catch (e) {
    console.warn("Push progress gagal:", e?.message || e);
  }
}

let timer = null;
// Debounce 1,5 detik — banyak tombol “selesai” diklik beruntun.
export function scheduleSync() {
  if (!isSupabaseConfigured) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => { timer = null; pushNow(); }, 1500);
}
