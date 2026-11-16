import React, { useState } from "react";

export default function SelectLive() {
  const [prov, setProv] = useState("dki");
  const nama = { dki: "DKI Jakarta", jabar: "Jawa Barat", diy: "DI Yogyakarta", bali: "Bali" }[prov];
  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP — Dropdown</b>
      <div style={{ display: "flex", gap: ".5rem", alignItems: "center", flexWrap: "wrap", margin: ".5rem 0" }}>
        <select value={prov} onChange={(e) => setProv(e.target.value)} className="search" style={{ width: "auto" }}>
          <option value="dki">DKI Jakarta</option>
          <option value="jabar">Jawa Barat</option>
          <option value="diy">DI Yogyakarta</option>
          <option value="bali">Bali</option>
        </select>
        <span style={{ fontSize: ".82rem", color: "#075985" }}>Kamu memilih: <b>{nama}</b></span>
      </div>
    </div>
  );
}
