// Pemilih avatar — kartu latar lembut + avatar BULAT (gaya profil, bukan stiker).
import React from "react";
import Avatar, { AVATAR_CHOICES } from "./Avatar.jsx";

export default function AvatarPicker({ value, onChange, columns = 2 }) {
  return (
    <div
      role="radiogroup"
      aria-label="Pilih avatar"
      style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: ".6rem" }}
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: ".4rem",
              padding: ".7rem .4rem .55rem",
              borderRadius: 20,
              cursor: "pointer",
              border: selected ? "3px solid #0284c7" : "3px solid rgba(255,255,255,.9)",
              background: `radial-gradient(rgba(255,255,255,.6) 1.5px, transparent 1.6px), linear-gradient(155deg, ${a.bg} 0%, ${a.bg}88 45%, #ffffff 110%)`,
              backgroundSize: "15px 15px, auto",
              boxShadow: selected
                ? "0 6px 0 rgba(2,132,199,.55), 0 10px 22px rgba(2,132,199,.35)"
                : "0 4px 0 rgba(12,74,110,.18), 0 8px 18px rgba(12,74,110,.22), inset 0 2px 4px rgba(255,255,255,.8)",
              transition: "transform .22s ease, box-shadow .22s ease, border-color .2s",
            }}
          >
            <Avatar id={a.id} size="100%" title={a.name} style={{ width: "78%", height: "auto" }} />
            <span style={{ fontSize: ".62rem", fontWeight: 800, color: "#0c4a6e", lineHeight: 1.15, textAlign: "center" }}>{a.name}</span>
          </button>
        );
      })}
    </div>
  );
}
