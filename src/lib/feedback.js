// Helper kotak saran & masukan — pengguna mengirim laporan, pemilik melihat daftarnya.
import { supabase } from "./supabase.js";

// Kirim saran/masukan dari pengguna yang sedang login
export async function submitFeedback({ userId, username, message }) {
  const clean = String(message || "").trim();
  if (!clean) throw new Error("Tulis saran/masukanmu dulu ya.");
  if (clean.length > 2000) throw new Error("Maksimal 2000 karakter ya.");
  const { error } = await supabase.from("feedback").insert({
    user_id: userId,
    username: String(username || "").trim() || "anonim",
    message: clean,
  });
  if (error) throw error;
}

// [Pemilik] Ambil semua laporan saran (urut terbaru dulu)
export async function listFeedback() {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

// [Pemilik] Hapus satu laporan
export async function deleteFeedback(id) {
  const { error } = await supabase.from("feedback").delete().eq("id", id);
  if (error) throw error;
}
