// Syarat & Ketentuan HTMLpedia
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Syarat() {
  const navigate = useNavigate();
  const h2 = { fontSize: "1rem", color: "var(--deep)", margin: "1.1rem 0 .3rem" };
  const p = { fontSize: ".85rem", color: "var(--text)", lineHeight: 1.7, margin: 0 };
  return (
    <div className="panel" style={{ padding: "1.4rem 1.3rem", maxWidth: 760 }}>
      <button className="btn" style={{ fontSize: ".78rem", marginBottom: ".8rem" }} onClick={() => navigate(-1)}>← Kembali</button>
      <h1 style={{ fontSize: "1.5rem", color: "var(--deep)", margin: 0 }}>📄 Syarat &amp; Ketentuan HTMLpedia</h1>
      <p style={{ fontSize: ".75rem", color: "#64748b", margin: ".2rem 0 .6rem" }}>Terakhir diperbarui: 17 November 2026</p>

      <h2 style={h2}>1. Tentang layanan</h2>
      <p style={p}>
        HTMLpedia adalah ensiklopedia interaktif gratis untuk belajar HTML, CSS, dan JavaScript dalam Bahasa Indonesia.
        Situs ini disediakan “apa adanya” untuk tujuan edukasi pribadi.
      </p>

      <h2 style={h2}>2. Bebas digunakan untuk belajar</h2>
      <p style={p}>
        Kamu bebas mempelajari seluruh materi, menyalin kode contoh untuk belajar, dan mempraktikkannya di mana pun.
        Dilarang mengklaim isi HTMLpedia sebagai karya kamu sendiri untuk tujuan komersial tanpa izin.
      </p>

      <h2 style={h2}>3. Akun &amp; keamanan</h2>
      <p style={p}>
        Kamu bertanggung jawab menjaga keamanan akunmu (password &amp; magic link). Satu akun untuk satu orang.
        Dilarang membuat akun palsu, menyalahgunakan situs, atau mencoba mengakses data pengguna lain.
      </p>

      <h2 style={h2}>4. Konten &amp; tautan eksternal</h2>
      <p style={p}>
        Materi disusun dengan cermat, tetapi HTMLpedia tidak menjamin bebas dari kesalahan. Tautan YouTube/eksternal
        disediakan sebagai sumber belajar tambahan dan bukan milik HTMLpedia — konten di sana menjadi tanggung jawab
        pemiliknya masing-masing.
      </p>

      <h2 style={h2}>5. Bukan penasihat profesional</h2>
      <p style={p}>
        Informasi di HTMLpedia bersifat edukatif, bukan nasihat profesional (hukum, finansial, atau lainnya).
      </p>

      <h2 style={h2}>6. Perubahan &amp; penghentian layanan</h2>
      <p style={p}>
        Pemilik berhak mengubah, memperbarui, atau menghentikan layanan/fitur/materi kapan pun tanpa pemberitahuan
        terlebih dahulu. Penggunaan situs setelah perubahan berarti kamu menyetujui ketentuan terbaru.
      </p>

      <h2 style={h2}>7. Batasan tanggung jawab</h2>
      <p style={p}>
        HTMLpedia tidak bertanggung jawab atas kerugian (langsung maupun tidak langsung) yang timbul dari penggunaan
        situs ini, termasuk kehilangan data.
      </p>

      <p style={{ ...p, marginTop: "1.2rem", fontSize: ".75rem", color: "#94a3b8" }}>
        Pertanyaan? Email <b>muhamadriziqmahardika4@gmail.com</b>
      </p>
    </div>
  );
}
