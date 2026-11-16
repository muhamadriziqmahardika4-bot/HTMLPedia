import React from "react";

export default function GenericDemo({ entry }) {
  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 CONTOH HASIL</b>
      <pre className="code" style={{ marginTop: ".4rem", whiteSpace: "pre-wrap" }}>{entry?.contohKode}</pre>
      <p style={{ fontSize: ".72rem", color: "#64748b", margin: ".4rem 0 0" }}>Tag ini belum punya demo interaktif khusus — tapi contoh kodenya bisa langsung kamu coba di playground di bawah. 👇</p>
    </div>
  );
}
