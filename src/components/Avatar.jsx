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
  { id: "koboi", name: "Koboi Darma (contoh)", bg: "#fde68a", handmade: true },
];

// ===== Karakter contoh detail tangan: "Koboi Darma" =====
function KoboiTangan({ size, className, title }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={`avatar-live ${className}`} role="img" aria-label={title || "Koboi Darma"}>
      <defs>
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffddbd" />
          <stop offset="1" stopColor="#eab687" />
        </linearGradient>
        <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f87171" />
          <stop offset="1" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="hatGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b45309" />
          <stop offset="1" stopColor="#713f12" />
        </linearGradient>
      </defs>

      {/* ===== badan: kemeja kotak-kotak merah ===== */}
      <path d="M 16 178 Q 100 128 184 178 L 184 200 L 16 200 Z" fill="url(#shirtGrad)" stroke="#fff" strokeWidth="9" strokeLinejoin="round" />
      <g stroke="#fecaca" strokeWidth="6" opacity=".5">
        <line x1="42" y1="150" x2="42" y2="200" />
        <line x1="72" y1="138" x2="72" y2="200" />
        <line x1="100" y1="134" x2="100" y2="200" />
        <line x1="128" y1="138" x2="128" y2="200" />
        <line x1="158" y1="150" x2="158" y2="200" />
        <line x1="16" y1="172" x2="184" y2="172" />
        <line x1="16" y1="190" x2="184" y2="190" />
      </g>
      {/* tutup garis kotak agar bersih di luar badan */}
      <path d="M 16 178 Q 100 128 184 178 L 184 200 L 16 200 Z" fill="none" stroke="#fff" strokeWidth="9" strokeLinejoin="round" />
      {/* bandana leher kuning */}
      <path d="M 74 150 L 100 168 L 126 150 L 126 162 L 100 182 L 74 162 Z" fill="#fbbf24" stroke="#1e293b" strokeWidth="4.5" strokeLinejoin="round" />

      {/* ===== telinga ===== */}
      <ellipse cx="43" cy="94" rx="10" ry="13" fill="url(#skinGrad)" stroke="#fff" strokeWidth="7" />
      <ellipse cx="157" cy="94" rx="10" ry="13" fill="url(#skinGrad)" stroke="#fff" strokeWidth="7" />

      {/* ===== kepala ===== */}
      <ellipse cx="100" cy="90" rx="56" ry="52" fill="url(#skinGrad)" stroke="#fff" strokeWidth="9" />
      {/* bayangan di bawah dagu */}
      <ellipse cx="100" cy="132" rx="34" ry="10" fill="#c98a54" opacity=".45" />

      {/* ===== jenggot coklat ===== */}
      <path d="M 50 98 Q 48 142 100 146 Q 152 142 150 98 Q 140 128 100 130 Q 60 128 50 98 Z" fill="#5b3a1e" stroke="#1e293b" strokeWidth="4.5" strokeLinejoin="round" />

      {/* ===== mata besar ===== */}
      <g className="av-eyes">
        <ellipse cx="77" cy="84" rx="12.5" ry="13.5" fill="#fff" stroke="#1e293b" strokeWidth="4" />
        <ellipse cx="123" cy="84" rx="12.5" ry="13.5" fill="#fff" stroke="#1e293b" strokeWidth="4" />
        <circle cx="77" cy="87" r="6.2" fill="#3f2d20" />
        <circle cx="123" cy="87" r="6.2" fill="#3f2d20" />
        <circle cx="74.8" cy="84.2" r="2.3" fill="#fff" />
        <circle cx="120.8" cy="84.2" r="2.3" fill="#fff" />
      </g>
      {/* alis */}
      <path d="M 63 68 Q 76 62 89 69" stroke="#3f2d20" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 111 69 Q 124 62 137 68" stroke="#3f2d20" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* senyum */}
      <path d="M 84 116 Q 100 124 116 116" stroke="#fff" strokeWidth="5.5" fill="none" strokeLinecap="round" />
      {/* pipi */}
      <ellipse cx="60" cy="103" rx="6.5" ry="4" fill="#fda4af" opacity=".8" />
      <ellipse cx="140" cy="103" rx="6.5" ry="4" fill="#fda4af" opacity=".8" />

      {/* ===== topi koboi ===== */}
      <path d="M 18 66 Q 100 38 182 66 L 188 86 Q 100 56 12 86 Z" fill="url(#hatGrad)" stroke="#fff" strokeWidth="8" strokeLinejoin="round" />
      <path d="M 56 56 Q 100 2 144 56 L 144 62 Q 100 34 56 62 Z" fill="url(#hatGrad)" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 58 55 Q 100 10 142 55" fill="none" stroke="#fde68a" strokeWidth="4" strokeLinecap="round" opacity=".65" />
      <path d="M 56 56 Q 100 40 144 56 L 144 66 Q 100 48 56 66 Z" fill="#422006" stroke="#1e293b" strokeWidth="4" strokeLinejoin="round" />
      <ellipse cx="100" cy="34" rx="24" ry="6" fill="#fde68a" opacity=".4" />
    </svg>
  );
}

export default function Avatar({ id, size = 96, className = "", title }) {
  if (id === "koboi") {
    return <KoboiTangan size={size} className={className} title={title} />;
  }
  const known = AVATAR_CHOICES.find((a) => a.id === id);
  if (!known) {
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
