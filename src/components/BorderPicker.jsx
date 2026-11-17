// Pemilih gaya border avatar — baris preview melingkar, bisa dipilih.
import React from "react";
import Avatar, { BORDER_STYLES } from "./Avatar.jsx";

export default function BorderPicker({ value, onChange, avatarId }) {
  return (
    <div role="radiogroup" aria-label="Pilih border avatar" className="border-picker"
      style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", justifyContent: "center" }}>
      {BORDER_STYLES.map((b) => {
        const selected = value === b.id;
        return (
          <button
            key={b.id}
            type="button"
            role="radio"
            aria-checked={selected}
            title={b.name}
            aria-label={b.name}
            onClick={() => onChange(b.id)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: ".15rem",
              background: selected ? "#e0f2fe" : "#fff",
              border: selected ? "2px solid #0284c7" : "2px solid var(--border)",
              borderRadius: 12, padding: ".35rem .3rem", cursor: "pointer", fontFamily: "inherit",
              transition: "transform .18s",
            }}
          >
            <Avatar id={avatarId} size={34} border={b.id} title={b.name} style={{ width: 44, height: 44 }} />
            <span style={{ fontSize: ".5rem", fontWeight: 800, color: "#0c4a6e", lineHeight: 1.1, maxWidth: 56 }}>{b.name}</span>
          </button>
        );
      })}
    </div>
  );
}
