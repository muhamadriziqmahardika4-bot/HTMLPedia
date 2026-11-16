import React, { useState } from "react";

const MAX = 120;

export default function TextareaCounter() {
  const [text, setText] = useState("");
  const sisa = MAX - text.length;
  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP — Penghitung Karakter</b>
      <textarea className="search" style={{ width: "100%", minHeight: 70, borderRadius: 12, padding: ".5rem", marginTop: ".4rem", fontFamily: "Consolas, monospace" }} value={text} onChange={(e) => setText(e.target.value.slice(0, MAX))} placeholder="Tulis komentarmu…" />
      <div style={{ fontSize: ".75rem", textAlign: "right", color: sisa < 20 ? "#b91c1c" : "#64748b" }}>{text.length}/{MAX} karakter</div>
    </div>
  );
}
