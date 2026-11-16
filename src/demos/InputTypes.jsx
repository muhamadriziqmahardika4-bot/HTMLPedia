import React, { useState } from "react";

const TYPES = [
  { type: "text", label: "text — teks biasa" },
  { type: "email", label: "email — validasi email" },
  { type: "number", label: "number — angka" },
  { type: "date", label: "date — kalender" },
  { type: "color", label: "color — pemilih warna" },
  { type: "range", label: "range — slider" },
  { type: "checkbox", label: "checkbox — centang" },
  { type: "radio", label: "radio — pilih satu" },
];

export default function InputTypes() {
  const [active, setActive] = useState("text");
  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP — Tipe Input</b>
      <div style={{ display: "flex", gap: ".35rem", flexWrap: "wrap", margin: ".5rem 0" }}>
        {TYPES.map((t) => (
          <button key={t.type} className={`chip ${active === t.type ? "active" : ""}`} style={{ fontSize: ".68rem", padding: ".25rem .6rem" }} onClick={() => setActive(t.type)}>
            {t.type}
          </button>
        ))}
      </div>
      <div style={{ fontSize: ".8rem", color: "#075985", marginBottom: ".4rem" }}>{TYPES.find((t) => t.type === active)?.label}</div>
      {active === "checkbox" || active === "radio" ? (
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {["Rendang", "Sate", "Gudeg"].map((x, i) => (
            <label key={x} style={{ fontSize: ".82rem" }}><input type={active} name="makanan" defaultChecked={i === 0} /> {x}</label>
          ))}
        </div>
      ) : (
        <input className="search" style={{ width: "100%", fontSize: ".85rem", padding: ".5rem .8rem" }} type={active} placeholder="Ketik di sini…" />
      )}
    </div>
  );
}
