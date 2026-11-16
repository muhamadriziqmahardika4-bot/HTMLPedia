import React, { useEffect, useState } from "react";
import { wrapPreview } from "../lib/preview.js";

// Playground mini: edit kode di kiri → hasil render langsung di kanan/bawah.
export default function LivePlayground({ initialCode, lang = "html" }) {
  const [code, setCode] = useState(initialCode);
  const [srcDoc, setSrcDoc] = useState(() => wrapPreview(initialCode, lang));

  useEffect(() => {
    const t = setTimeout(() => setSrcDoc(wrapPreview(code, lang)), 250);
    return () => clearTimeout(t);
  }, [code, lang]);

  return (
    <div className="info" style={{ background: "#0c4a6e", borderColor: "#0ea5e9", padding: ".6rem .7rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".5rem", marginBottom: ".4rem", flexWrap: "wrap" }}>
        <b style={{ color: "#7dd3fc", fontSize: ".82rem" }}>💻 Coba Sendiri — ubah kode, lihat hasilnya langsung</b>
        <button className="btn" style={{ fontSize: ".65rem", padding: ".25rem .55rem" }} onClick={() => { setCode(initialCode); setSrcDoc(wrapPreview(initialCode, lang)); }}>↺ Reset</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".5rem" }} className="live-cols">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          aria-label="Editor kode live"
          style={{ width: "100%", minHeight: 150, fontFamily: "Consolas, monospace", fontSize: ".72rem", border: "2px solid #38bdf8", borderRadius: 10, padding: ".5rem", background: "#082f49", color: "#bae6fd", lineHeight: 1.55, resize: "vertical" }}
        />
        <iframe title="Hasil live" sandbox="allow-scripts" srcDoc={srcDoc} style={{ width: "100%", minHeight: 150, border: "2px solid #5eead4", borderRadius: 10, background: "#fff" }} />
      </div>
    </div>
  );
}
