// Client Supabase — baca konfigurasi dari env saat build.
// Kalau belum dikonfigurasi, isSupabaseConfigured = false dan app menampilkan
// layar "belum siap" (sesuai mode wajib login).
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL || "";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(url && anonKey);
export const OWNER_EMAIL = (import.meta.env.VITE_OWNER_EMAIL || "").toLowerCase();

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true, // agar magic link langsung menukar ?code= jadi sesi
      },
    })
  : null;
