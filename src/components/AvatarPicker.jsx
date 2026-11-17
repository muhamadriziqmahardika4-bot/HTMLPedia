// Pemilih avatar — grid 2 kolom kartu warna-warni, responsif & interaktif.
import React from "react";
import Avatar, { AVATAR_CHOICES } from "./Avatar.jsx";

export default function AvatarPicker({ value, onChange, columns = 2 }) {
  return (
    <div
      role="radiogroup"
      aria-label="Pilih avatar"
      style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: ".55rem" }}
      className="avatar-picker"
    >
      {AVATAR_CHOICES.map((a) => {
        const selected = value === a.id;
        return (
          <button
            key={a.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={a.name}
            title={a.name}
            onClick={() => onChange(a.id)}
            className="avatar-card"
            style={{
              background: a.bg,
              border: selected ? "3px solid #0284c7" : "3px solid rgba(12,74,110,.14)",
              borderRadius: 18,
              padding: ".5rem .4rem .45rem",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: ".2rem",
              transition: "transform .22s ease, box-shadow .22s ease, border-color .2s",
              boxShadow: selected ? "0 6px 0 rgba(2,132,199,.45)" : "0 3px 0 rgba(12,74,110,.10)",
            }}
          >
            <Avatar id={a.id} size={84} title={a.name} />
            <span style={{ fontSize: ".62rem", fontWeight: 800, color: "#0c4a6e", lineHeight: 1.15 }}>{a.name}</span>
          </button>
        );
      })}
    </div>
  );
}
