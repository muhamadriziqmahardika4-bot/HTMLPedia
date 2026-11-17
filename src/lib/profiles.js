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

// Catat "terakhir online" — dipanggil sekali setelah login
export async function touchLastSeen(userId) {
  try {
    await supabase.from("profiles").update({ last_seen: new Date().toISOString() }).eq("id", userId);
  } catch {
    // gagal = abaikan
  }
}
