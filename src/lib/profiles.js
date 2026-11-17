// Helper profil pengguna — username (tanpa email) disimpan dengan email sintetis
// di balik layar: {username}@htmlpedia.app (Supabase butuh email, tapi pengguna tidak pernah melihatnya)
import { supabase } from "./supabase.js";

export const USERNAME_RE = /^[a-z0-9_]{3,20}$/;
export const usernameToEmail = (u) => `${String(u).trim().toLowerCase()}@htmlpedia.app`;
export const emailToUsername = (e) => String(e || "").split("@")[0];

export function validateUsername(u) {
  const v = String(u || "").trim().toLowerCase();
  if (!USERNAME_RE.test(v)) return "Username: 3–20 karakter, huruf kecil/angka/underscore saja.";
  return null;
}

export async function getProfile(userId) {
  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
    if (error) throw error;
    return data;
  } catch (e) {
    console.warn("Gagal memuat profil:", e?.message || e);
    return null;
  }
}

export async function createProfile({ id, username, full_name, avatar, border_style }) {
  const { error } = await supabase.from("profiles").insert({
    id,
    username,
    full_name,
    avatar,
    border_style: border_style || "classic",
    last_seen: new Date().toISOString(),
  });
  if (error) throw error;
}

export async function updateProfile({ id, full_name, avatar, border_style }) {
  const payload = {};
  if (full_name !== undefined) payload.full_name = full_name;
  if (avatar !== undefined) payload.avatar = avatar;
  if (border_style !== undefined) payload.border_style = border_style;
  const { error } = await supabase.from("profiles").update(payload).eq("id", id);
  if (error) throw error;
}

// Username aman dari email: huruf kecil/angka/underscore, 3-20 karakter
function sanitizeUsername(raw) {
  let base = String(raw || "")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/^_+|_+$/g, "");
  if (base.length < 3) base = (base + "_htmlpedia").slice(0, 20);
  return base.slice(0, 20);
}

// Buat profil otomatis dari data login (mis. Google) kalau pengguna belum punya profil.
// Return profil yang dibuat, atau null kalau gagal (pemanggil bisa fallback ke onboarding).
export async function autoCreateProfile(user) {
  if (!user?.id) return null;
  try {
    const existing = await getProfile(user.id);
    if (existing) return existing;
  } catch {
    return null;
  }
  const meta = user.user_metadata || {};
  const emailName = emailToUsername(user.email);
  const fullName = String(meta.full_name || meta.name || emailName || "Pengguna Baru").trim();
  const avatar = typeof meta.avatar_url === "string" && /^https?:\/\//.test(meta.avatar_url) ? meta.avatar_url : "alan";
  const base = sanitizeUsername(emailName);
  // Coba beberapa kandidat username sampai berhasil (anti-bentrok)
  const candidates = [base, ...Array.from({ length: 5 }, () => `${base.slice(0, 15)}${Math.floor(1000 + Math.random() * 9000)}`)];
  for (const username of candidates) {
    try {
      await createProfile({ id: user.id, username, full_name: fullName, avatar, border_style: "classic" });
      return { id: user.id, username, full_name: fullName, avatar, border_style: "classic", created_at: new Date().toISOString() };
    } catch (e) {
      const msg = String(e?.message || e);
      // Bentrok username → coba kandidat berikutnya; error lain → berhenti
      if (!/duplicate|unique/i.test(msg)) {
        console.warn("autoCreateProfile gagal:", msg);
        return null;
      }
    }
  }
  return null;
}

// Catat "terakhir online" - dipanggil sekali setelah login
export async function touchLastSeen(userId) {
  try {
    await supabase.from("profiles").update({ last_seen: new Date().toISOString() }).eq("id", userId);
  } catch {
    // gagal = abaikan
  }
}
