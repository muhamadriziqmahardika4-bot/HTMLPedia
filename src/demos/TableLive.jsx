import React, { useState } from "react";

const INITIAL = [["Mahardika", "95"], ["Ellena", "100"]];

export default function TableLive() {
  const [rows, setRows] = useState(INITIAL);
  return (
    <div className="info demo-box" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP</b>
      <table style={{ margin: ".5rem 0", width: "100%", borderCollapse: "collapse", textAlign: "center", fontSize: ".82rem" }}>
        <thead>
          <tr><th style={{ border: "2px solid #7dd3fc", padding: ".35rem", background: "#e0f2fe" }}>Nama</th><th style={{ border: "2px solid #7dd3fc", padding: ".35rem", background: "#e0f2fe" }}>Nilai</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}><td style={{ border: "2px solid #bae6fd", padding: ".35rem" }}>{r[0]}</td><td style={{ border: "2px solid #bae6fd", padding: ".35rem" }}>{r[1]}</td></tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
        <button className="btn" onClick={() => setRows([...rows, [`Siswa ${rows.length + 1}`, String(80 + rows.length * 3)]])}>+ baris</button>
        <button className="btn danger" onClick={() => setRows(rows.slice(0, -1))}>− baris</button>
        <button className="btn" onClick={() => setRows(INITIAL)}>↺ reset</button>
      </div>
    </div>
  );
}
