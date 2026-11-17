// Pemilih avatar — kartu full-bleed: ilustrasi memenuhi kartu (menyatu dengan background),
// nama karakter di overlay bawah, animasi hidup di hover.
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
              position: "relative",
              border: selected ? "3.5px solid #0284c7" : "3.5px solid rgba(12,74,110,.14)",
              borderRadius: 18,
              padding: 0,
              cursor: "pointer",
              overflow: "hidden",
              boxShadow: selected ? "0 6px 0 rgba(2,132,199,.5)" : "0 3px 0 rgba(12,74,110,.12)",
              transition: "transform .25s ease, box-shadow .25s ease, border-color .2s",
              aspectRatio: "1 / 1",
            }}
          >
            <Avatar id={a.id} size="100%" title={a.name} style={{ borderRadius: 0, objectFit: "cover" }} />
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                padding: ".35rem .4rem .35rem",
                background: "linear-gradient(180deg, transparent, rgba(255,255,255,.55) 35%, rgba(255,255,255,.92))",
                fontSize: ".62rem",
                fontWeight: 800,
                color: "#0c4a6e",
                lineHeight: 1.15,
                pointerEvents: "none",
              }}
            >
              {a.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
