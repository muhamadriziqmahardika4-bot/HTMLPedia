import React, { useState } from "react";

export default function ImgFallback() {
  const [gagal, setGagal] = useState(false);
  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP — Gambar &amp; alt</b>
      <p style={{ fontSize: ".8rem", color: "#075985", margin: ".4rem 0" }}>Coba matikan koneksi gambar: alt tetap menjelaskan isinya.</p>
      {gagal ? (
        <div style={{ border: "2px dashed #cbd5e1", borderRadius: 12, padding: "1rem", textAlign: "center", fontSize: ".8rem", color: "#64748b" }}>🖼️ rendang.jpg — <i>"Sepiring rendang dengan nasi putih"</i></div>
      ) : (
        <div style={{ borderRadius: 12, overflow: "hidden", background: "linear-gradient(135deg,#fda4af,#f97316)", height: 90, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>🍛 Rendang</div>
      )}
      <button className="btn" style={{ marginTop: ".4rem" }} onClick={() => setGagal((v) => !v)}>{gagal ? "↺ Tampilkan gambar" : "✖ Simulasikan gambar gagal"}</button>
    </div>
  );
}
