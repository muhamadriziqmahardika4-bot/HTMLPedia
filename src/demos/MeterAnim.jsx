import React, { useState } from "react";

export default function MeterAnim() {
  const [value, setValue] = useState(0.6);
  const warna = value < 0.3 ? "#ef4444" : value > 0.85 ? "#f59e0b" : "#22c55e";
  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP — Meter / Gauge</b>
      <div style={{ fontSize: ".82rem", color: "#075985", margin: ".4rem 0" }}>Kesehatan baterai: <b style={{ color: warna }}>{Math.round(value * 100)}%</b></div>
      <meter value={value} min={0} max={1} low={0.3} high={0.85} optimum={0.6} style={{ width: "100%", height: 18 }}>{Math.round(value * 100)}%</meter>
      <input type="range" min={0} max={1} step={0.01} value={value} onChange={(e) => setValue(Number(e.target.value))} style={{ width: "100%", marginTop: ".4rem" }} aria-label="Geser level baterai" />
    </div>
  );
}
