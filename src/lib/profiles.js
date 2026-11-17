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

export async function createProfile({ id, username, full_name, avatar }) {
  const { error } = await supabase.from("profiles").insert({ id, username, full_name, avatar });
  if (error) throw error;
}

export async function updateProfile({ id, full_name, avatar }) {
  const { error } = await supabase.from("profiles").update({ full_name, avatar }).eq("id", id);
  if (error) throw error;
}
