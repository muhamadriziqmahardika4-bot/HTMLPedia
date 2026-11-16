import React, { useEffect, useState } from "react";

// Playground — editor mini: ketik HTML, hasil render tampil langsung.
// Iframe hasil di-sandbox TANPA allow-scripts — kode user tidak bisa menyerang halaman utama.
export default function Playground({ initialCode }) {
  const [code, setCode] = useState(initialCode || "<table>\n  <tr><th>Nama</th></tr>\n  <tr><td>Kamu</td></tr>\n</table>");
  const [srcDoc, setSrcDoc] = useState(code);

  useEffect(() => {
    const t = setTimeout(() => setSrcDoc(code), 300);
    return () => clearTimeout(t);
  }, [code]);

  return (
    <div className="info playground" style={{ background: "#fff" }}>
      <b style={{ color: "#0f766e" }}>⌨️ COBA SENDIRI</b>{" "}
      <span style={{ fontSize: ".7rem", color: "#64748b" }}>(ketik → hasil langsung)</span>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        aria-label="Editor HTML"
      />
      <iframe title="Hasil render" sandbox="" srcDoc={srcDoc} />
    </div>
  );
}
