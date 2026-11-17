// Kebijakan Privasi HTMLpedia
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Privasi() {
  const navigate = useNavigate();
  const h2 = { fontSize: "1rem", color: "var(--deep)", margin: "1.1rem 0 .3rem" };
  const p = { fontSize: ".85rem", color: "var(--text)", lineHeight: 1.7, margin: 0 };
  return (
    <div className="panel" style={{ padding: "1.4rem 1.3rem", maxWidth: 760 }}>
      <button className="btn" style={{ fontSize: ".78rem", marginBottom: ".8rem" }} onClick={() => navigate(-1)}>← Kembali</button>
      <h1 style={{ fontSize: "1.5rem", color: "var(--deep)", margin: 0 }}>🔒 Kebijakan Privasi HTMLpedia</h1>
      <p style={{ fontSize: ".75rem", color: "#64748b", margin: ".2rem 0 .6rem" }}>Terakhir diperbarui: 17 November 2026</p>

      <h2 style={h2}>1. Data yang kami simpan</h2>
      <p style={p}>
        Saat kamu membuat akun atau masuk, HTMLpedia menyimpan: <b>username</b>, <b>nama panggilan</b>, <b>avatar (emoji)</b>,
        <b> tanggal bergabung</b>, serta <b>data belajar kamu</b> — materi yang selesai, hasil kuis, streak harian,
        proyek mini, dan catatan kesalahan. Jika kamu daftar dengan username &amp; password, password kamu disimpan
        terenkripsi oleh Supabase dan <b>tidak pernah terlihat</b> oleh siapa pun, termasuk pemilik situs.
      </p>

      <h2 style={h2}>2. Untuk apa data itu dipakai</h2>
      <p style={p}>
        Hanya untuk: menyimpan progress belajarmu di akun, menampilkan statistik di halaman profilmu, dan memulihkan
        progressmu saat kamu login dari perangkat lain. Tidak ada iklan, tidak ada pelacakan iklan, tidak ada penjualan data.
      </p>

      <h2 style={h2}>3. Di mana data disimpan &amp; siapa yang bisa melihat</h2>
      <p style={p}>
        Data disimpan di Supabase (PostgreSQL) dengan <b>Row Level Security</b> — artinya baris datamu hanya bisa
        dibaca dan ditulis oleh akunmu sendiri. Pemilik situs tidak membaca progress belajar penggunanya.
      </p>

      <h2 style={h2}>4. Tidak kami bagikan</h2>
      <p style={p}>
        Kami tidak menjual, menyewakan, atau membagikan data pribadi kamu ke pihak ketiga mana pun, kecuali diminta
        secara hukum oleh otoritas yang berwenang.
      </p>

      <h2 style={h2}>5. Cookie &amp; penyimpanan lokal</h2>
      <p style={p}>
        Kami menyimpan token sesi login dan preferensi kamu (misalnya pengaturan musik) di browser (localStorage).
        Tidak ada cookie pelacakan iklan.
      </p>

      <h2 style={h2}>6. Hak kamu</h2>
      <p style={p}>
        Kamu berhak meminta penghapusan akun &amp; seluruh datamu kapan pun dengan menghubungi pemilik melalui
        email <b>muhamadriziqmahardika4@gmail.com</b>. Kami akan menghapus data kamu secepat mungkin.
      </p>

      <h2 style={h2}>7. Perubahan kebijakan</h2>
      <p style={p}>
        Jika kebijakan ini berubah, perubahannya akan diumumkan di halaman ini dengan tanggal pembaruan terbaru.
      </p>

      <p style={{ ...p, marginTop: "1.2rem", fontSize: ".75rem", color: "#94a3b8" }}>
        Pertanyaan? Email <b>muhamadriziqmahardika4@gmail.com</b>
      </p>
    </div>
  );
}
