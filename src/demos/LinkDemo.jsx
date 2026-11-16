import React from "react";

export default function LinkDemo() {
  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP — Cara kerja link</b>
      <p style={{ fontSize: ".8rem", color: "#075985", margin: ".4rem 0" }}>Teks link yang baik menjelaskan tujuannya — bukan "klik di sini".</p>
      <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
        <a href="https://www.instagram.com/mhmdrziqmhrdika" target="_blank" rel="noreferrer" style={{ color: "#0284c7", fontWeight: 700 }}>✅ Lihat profil pembuat HTMLpedia di Instagram</a>
        <span style={{ color: "#b91c1c", fontSize: ".8rem" }}>❌ "Klik di sini" — tidak jelas tujuannya</span>
      </div>
    </div>
  );
}
