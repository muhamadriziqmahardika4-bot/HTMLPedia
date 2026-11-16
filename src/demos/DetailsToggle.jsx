import React from "react";

export default function DetailsToggle() {
  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP — Klik untuk buka/tutup</b>
      {[
        { q: "Apa itu HTML?", a: "Bahasa markup untuk membangun struktur halaman web." },
        { q: "Bedanya <em> dan <i>?", a: "<em> = penekanan makna (screen reader membaca beda). <i> = hanya miring tanpa makna." },
        { q: "Kenapa alt gambar wajib?", a: "Supaya pengunjung tunanetra dan saat gambar gagal dimuat tetap tahu isinya." },
      ].map((item, i) => (
        <details key={i} style={{ margin: ".35rem 0", background: "#f0f9ff", borderRadius: 10, padding: ".4rem .6rem" }}>
          <summary style={{ cursor: "pointer", fontWeight: 700, fontSize: ".82rem" }}>{item.q}</summary>
          <p style={{ fontSize: ".8rem", margin: ".35rem 0 0", color: "#075985" }}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
