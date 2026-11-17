// Koleksi 10 avatar kartun original (digambar khusus untuk HTMLpedia) — lokal di /avatars/.
import React from "react";

export const AVATAR_CHOICES = [
  { id: "alan", name: "Alan Si Koboi", bg: "#fde047" },
  { id: "arachu", name: "Arachu Si Lucu", bg: "#99f6e4" },
  { id: "burung", name: "Burung Si Tegang", bg: "#6ee7b7" },
  { id: "iqbal", name: "Iqbal Si Tulus", bg: "#fde68a" },
  { id: "kakek", name: "Kakek Sugiono", bg: "#bfdbfe" },
  { id: "lalisa", name: "Lalisa Si Cerewet", bg: "#bef264" },
  { id: "mahardika", name: "Mahardika (Owner)", bg: "#d8b4fe" },
  { id: "merry", name: "Merry Si Cat", bg: "#fdba74" },
  { id: "naysa", name: "Naysa Si Indah", bg: "#fed7aa" },
  { id: "reno", name: "Reno Si Musik", bg: "#67e8f9" },
];

export default function Avatar({ id, size = 96, className = "", title, style = {} }) {
  const known = AVATAR_CHOICES.find((a) => a.id === id);
  const file = known ? known.id : "alan";
  return (
    <img
      src={`/avatars/${file}.jpg`}
      width={size}
      height={size}
      alt={title || (known ? known.name : "avatar")}
      className={`avatar-live ${className}`}
      loading="lazy"
      draggable={false}
      style={{ display: "block", borderRadius: "50%", objectFit: "cover", userSelect: "none", width: "100%", height: "100%", boxShadow: "0 0 0 4px #fff, 0 8px 16px rgba(2,132,199,.35)", ...style }}
    />
  );
}
