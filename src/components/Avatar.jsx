// Koleksi 10 avatar Big Smile (open-source, gratis) — disimpan lokal di /avatars/.
// Tidak bergantung pada layanan eksternal saat runtime.
import React from "react";

export const AVATAR_CHOICES = [
  { id: "ana", name: "Ana Si Ceria", bg: "#fde68a" },
  { id: "bimo", name: "Bimo Si Pemberani", bg: "#bbf7d0" },
  { id: "citra", name: "Citra Si Lincah", bg: "#fbcfe8" },
  { id: "dimas", name: "Dimas Si Tenang", bg: "#bfdbfe" },
  { id: "elok", name: "Elok Si Ramah", bg: "#e9d5ff" },
  { id: "fajar", name: "Fajar Si Tekun", bg: "#fed7aa" },
  { id: "gita", name: "Gita Si Riang", bg: "#fecaca" },
  { id: "hadi", name: "Hadi Si Santai", bg: "#d9f99d" },
  { id: "intan", name: "Intan Si Cermat", bg: "#cffafe" },
  { id: "jaya", name: "Jaya Si Hebat", bg: "#e0e7ff" },
];

export default function Avatar({ id, size = 96, className = "", title }) {
  const known = AVATAR_CHOICES.find((a) => a.id === id);
  if (!known) {
    // Akun lama (mc-*/emoji) → tampilkan karakter bawaan yang paling dekat
    return (
      <img
        src="/avatars/ana.svg"
        width={size}
        height={size}
        alt={title || "avatar"}
        className={`avatar-live ${className}`}
        loading="lazy"
        style={{ borderRadius: "22%" }}
      />
    );
  }
  return (
    <img
      src={`/avatars/${known.id}.svg`}
      width={size}
      height={size}
      alt={title || known.name}
      className={`avatar-live ${className}`}
      loading="lazy"
      style={{ display: "block", borderRadius: "22%" }}
    />
  );
}
