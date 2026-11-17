// Koleksi 19 avatar kartun original HTMLpedia (dibuat khusus) — lokal di /avatars/, background transparan.
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
  { id: "nisa", name: "Nisa Si Pintar", bg: "#bfdbfe" },
  { id: "dinda", name: "Dinda Si Ceria", bg: "#99f6e4" },
  { id: "ovi", name: "Ovi Si Gemoy", bg: "#fde68a" },
  { id: "laras", name: "Laras Si Manis", bg: "#e9d5ff" },
  { id: "nadia", name: "Nadia Si Pintar", bg: "#fed7aa" },
  { id: "lala", name: "Lala Si Ceria", bg: "#d9f99d" },
  { id: "salsa", name: "Salsa Si Lincah", bg: "#cffafe" },
];

export default function Avatar({ id, size = 96, className = "", title, style = {} }) {
  const known = AVATAR_CHOICES.find((a) => a.id === id);
  const isPhoto = typeof id === "string" && id.startsWith("data:image/");
  const src = isPhoto ? id : (known ? `/avatars/${known.id}.png` : "/avatars/alan.png");
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt={title || (isPhoto ? "Foto profil" : (known ? known.name : "avatar"))}
      className={`${className}`}
      loading="lazy"
      draggable={false}
      style={{ display: "block", borderRadius: "50%", objectFit: "cover", userSelect: "none", width: "100%", height: "100%", boxShadow: "0 0 0 4px #ffffff, 0 8px 18px rgba(12,74,110,.45)", ...style }}
    />
  );
}
