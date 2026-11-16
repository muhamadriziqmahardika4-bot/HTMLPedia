import React, { useState } from "react";

export default function BaseDemo() {
  const [base, setBase] = useState("https://masakku.id/blog/");
  const [path, setPath] = useState("tentang.html");
  const resolved = (() => {
    try { return new URL(path, base).href; } catch { return "(base URL tidak valid)"; }
  })();

  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP — Cara kerja &lt;base&gt;</b>
      <p style={{ fontSize: ".78rem", color: "#075985", margin: ".3rem 0 .5rem" }}>
        &lt;base&gt; menentukan alamat dasar untuk SEMUA link relatif di halaman. Ketik base berbeda, lalu lihat alamat tujuan link berubah:
      </p>

      {/* Mock browser */}
      <div style={{ border: "2px solid #cbd5e1", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: "#e2e8f0", padding: ".3rem .6rem", fontSize: ".7rem", fontFamily: "Consolas, monospace", display: "flex", justifyContent: "space-between" }}>
          <span>🌐 Halaman Masakku — Blog</span>
          <span>🔒</span>
        </div>
        <div style={{ padding: ".6rem .7rem", fontSize: ".8rem" }}>
          <div style={{ marginBottom: ".3rem" }}>
            <label style={{ fontWeight: 700 }}>&lt;base href="</label>
            <input value={base} onChange={(e) => setBase(e.target.value)} spellCheck={false}
              style={{ width: "92%", fontFamily: "Consolas, monospace", fontSize: ".78rem", border: "2px solid #bae6fd", borderRadius: 8, padding: ".25rem .4rem", margin: ".2rem 0" }} />
            <label style={{ fontWeight: 700 }}>"&gt;</label>
          </div>
          <div style={{ marginBottom: ".3rem" }}>
            <label style={{ fontWeight: 700 }}>&lt;a href="</label>
            <input value={path} onChange={(e) => setPath(e.target.value)} spellCheck={false}
              style={{ width: "92%", fontFamily: "Consolas, monospace", fontSize: ".78rem", border: "2px solid #bae6fd", borderRadius: 8, padding: ".25rem .4rem", margin: ".2rem 0" }} />
            <label style={{ fontWeight: 700 }}>"&gt;</label>
          </div>
          <div style={{ background: "#f0f9ff", borderRadius: 10, padding: ".45rem .55rem", fontSize: ".78rem", wordBreak: "break-all" }}>
            ➡️ <b>Link itu sebenarnya menuju:</b><br /><code>{resolved}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
