// Koleksi 17 avatar kartun original HTMLpedia + 10 gaya border yang bisa dipilih.
import React from "react";

export const AVATAR_CHOICES = [
  { id: "alan", name: "Alan Si Koboi", bg: "#fde68a" },
  { id: "reno", name: "Reno Si Musik", bg: "#67e8f9" },
  { id: "arachu", name: "Arachu Si Lucu", bg: "#99f6e4" },
  { id: "merry", name: "Merry Si Cat", bg: "#fdba74" },
  { id: "iqbal", name: "Iqbal Si Tulus", bg: "#fde68a" },
  { id: "mahardika", name: "Mahardika (Owner)", bg: "#d8b4fe" },
  { id: "kakek", name: "Kakek Sugiono", bg: "#bfdbfe" },
  { id: "lalisa", name: "Lalisa Si Cerewet", bg: "#bef264" },
  { id: "burung", name: "Burung Si Tegang", bg: "#6ee7b7" },
  { id: "naysa", name: "Naysa Si Indah", bg: "#fed7aa" },
  { id: "sinta", name: "Sinta Si Manis", bg: "#fbcfe8" },
  { id: "rina", name: "Rina Si Ceria", bg: "#fecaca" },
  { id: "dinda", name: "Dinda Si Ceria", bg: "#99f6e4" },
  { id: "ovi", name: "Ovi Si Gemoy", bg: "#fde68a" },
  { id: "laras", name: "Laras Si Manis", bg: "#e9d5ff" },
  { id: "nadia", name: "Nadia Si Pintar", bg: "#fed7aa" },
  { id: "salsa", name: "Salsa Si Lincah", bg: "#cffafe" },
];

// Gaya border avatar — id ini disimpan di kolom profiles.border_style
export const BORDER_STYLES = [
  { id: "classic", name: "Putih Lembut", bg: "#ffffff", shadow: "0 6px 16px rgba(12,74,110,.4)" },
  { id: "gold", name: "Emas Berkilau", bg: "linear-gradient(135deg,#fef08a,#f59e0b 55%,#fde047)", shadow: "0 0 16px rgba(250,204,21,.9), 0 6px 16px rgba(12,74,110,.35)" },
  { id: "neon", name: "Neon Cyan", bg: "linear-gradient(135deg,#67e8f9,#06b6d4)", shadow: "0 0 18px rgba(34,211,238,.95), 0 6px 16px rgba(12,74,110,.35)" },
  { id: "sunset", name: "Senja Pink", bg: "linear-gradient(135deg,#f9a8d4,#fb7185 55%,#fdba74)", shadow: "0 0 16px rgba(251,113,133,.9), 0 6px 16px rgba(12,74,110,.35)" },
  { id: "berry", name: "Ungu Berry", bg: "linear-gradient(135deg,#d8b4fe,#a855f7)", shadow: "0 0 16px rgba(168,85,247,.85), 0 6px 16px rgba(12,74,110,.35)" },
  { id: "forest", name: "Hijau Hutan", bg: "linear-gradient(135deg,#86efac,#16a34a)", shadow: "0 0 15px rgba(34,197,94,.85), 0 6px 16px rgba(12,74,110,.35)" },
  { id: "ocean", name: "Samudra Biru", bg: "linear-gradient(135deg,#7dd3fc,#2563eb)", shadow: "0 0 16px rgba(59,130,246,.85), 0 6px 16px rgba(12,74,110,.35)" },
  { id: "peach", name: "Peach Lembut", bg: "linear-gradient(135deg,#fed7aa,#fb923c)", shadow: "0 0 14px rgba(251,146,60,.6), 0 6px 16px rgba(12,74,110,.35)" },
  { id: "midnight", name: "Gelap Tegas", bg: "#1e293b", shadow: "0 8px 20px rgba(12,74,110,.55)" },
  { id: "dashed", name: "Putus-Putus", bg: "#ffffff", shadow: "0 6px 14px rgba(12,74,110,.32)", outline: "3px dashed #0c4a6e", outlineOffset: "3px" },
];

export function getBorderStyle(id) {
  if (id === "none") return { id: "none", name: "Tanpa border", bg: "transparent", shadow: "none", pad: 0 };
  return BORDER_STYLES.find((b) => b.id === id) || BORDER_STYLES[0];
}

export default function Avatar({ id, size = 96, border = "classic", className = "", title, style = {} }) {
  const known = AVATAR_CHOICES.find((a) => a.id === id);
  const isPhoto = typeof id === "string" && id.startsWith("data:image/");
  const imgSrc = isPhoto ? id : (known ? `/avatars/${known.id}.png` : "/avatars/alan.png");
  const b = getBorderStyle(border);
  const pad = b.pad ?? (typeof size === "number" ? Math.max(4, Math.round(size * 0.055)) : 4);
  const total = typeof size === "number" ? size + pad * 2 : "100%";
  return (
    <div
      className={className}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: total, height: total, borderRadius: "50%", padding: pad,
        background: b.bg, boxShadow: b.shadow,
        outline: b.outline, outlineOffset: b.outlineOffset,
        ...style,
      }}
    >
      <img
        src={imgSrc}
        width={size}
        height={size}
        alt={title || (isPhoto ? "Foto profil" : (known ? known.name : "avatar"))}
        draggable={false}
        style={{ display: "block", borderRadius: "50%", objectFit: "cover", width: "100%", height: "100%", userSelect: "none" }}
      />
    </div>
  );
}
