import React from "react";

// Penjelasan "kapan & di mana dipakai" + "contoh output" per kategori —
// untuk tag yang tidak menampilkan hasil visual (mis. metadata, scripting).
const GUIDANCE = {
  struktur: {
    kapan: "Dipakai di setiap halaman HTML — ini kerangka dasarnya.",
    output: "Tidak tampil langsung di halaman — efeknya terlihat di seluruh halaman (judul tab, encoding, struktur).",
  },
  teks: {
    kapan: "Dipakai saat menulis teks di halaman.",
    output: "Tampil sebagai teks di halaman — dengan makna/gaya sesuai tag-nya.",
  },
  "link-media": {
    kapan: "Dipakai untuk menampilkan atau menghubungkan konten media & tautan.",
    output: "Tampil sebagai gambar/audio/video/link yang bisa dilihat atau diklik pengguna.",
  },
  "list-tabel": {
    kapan: "Dipakai untuk data berbentuk daftar atau tabel.",
    output: "Tampil sebagai daftar berbutir/bernomor atau tabel baris-kolom.",
  },
  form: {
    kapan: "Dipakai untuk mengumpulkan isian dari pengguna.",
    output: "Tampil sebagai kolom isian/tombol yang bisa diketik dan diklik.",
  },
  semantic: {
    kapan: "Dipakai untuk memberi makna struktural pada bagian-bagian halaman.",
    output: "Tampil seperti elemen biasa, tapi memberi makna ke browser & screen reader.",
  },
  metadata: {
    kapan: "Dipakai di <head> — memberi informasi ke browser & mesin pencari.",
    output: "TIDAK tampil di halaman — efeknya terlihat di tab browser, hasil pencarian, atau cara halaman dimuat.",
  },
  scripting: {
    kapan: "Dipakai untuk interaksi & logika dinamis halaman.",
    output: "Tidak tampil langsung — efeknya terlihat saat pengguna berinteraksi (klik, gambar bergerak, dsb.).",
  },
  interaktif: {
    kapan: "Dipakai untuk elemen yang bisa dibuka/ditutup/diputar pengguna.",
    output: "Tampil sebagai widget interaktif (klik untuk membuka/menutup/menjalankan).",
  },
};

export default function GenericDemo({ entry }) {
  const guide = GUIDANCE[entry?.category] || GUIDANCE.teks;
  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 CONTOH OUTPUT</b>

      <div style={{ margin: ".5rem 0", fontSize: ".82rem" }}>
        <div style={{ fontWeight: 800, color: "#0369a1" }}>⏰ Kapan &amp; di mana dipakai</div>
        <p style={{ margin: ".2rem 0 .5rem", color: "#075985" }}>{entry?.kapan || guide.kapan}</p>

        <div style={{ fontWeight: 800, color: "#0369a1" }}>🖼️ Contoh hasil / output</div>
        <p style={{ margin: ".2rem 0 .5rem", color: "#075985" }}>{entry?.output || guide.output}</p>

        <div style={{ fontWeight: 800, color: "#0369a1" }}>💻 Contoh kodenya</div>
        <pre className="code" style={{ marginTop: ".3rem", whiteSpace: "pre-wrap" }}>{entry?.contohKode}</pre>
      </div>

      <p style={{ fontSize: ".72rem", color: "#64748b", margin: ".3rem 0 0" }}>Tag ini belum punya demo interaktif — tapi contoh kodenya bisa kamu praktikkan di langkah berikutnya. 👇</p>
    </div>
  );
}
