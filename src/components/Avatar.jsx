// Set avatar manusia kartun gemuk bergaya Cubby — SVG kustom, bisa dianimasikan.
// id disimpan di tabel profiles.avatar (selain itu, fallback: tampilkan teks/emoji lama apa adanya).
import React from "react";

export const AVATAR_CHOICES = [
  { id: "mc-1", name: "Bocah kacamata" },
  { id: "mc-2", name: "Si pink kuncir" },
  { id: "mc-3", name: "Kuning acak" },
  { id: "mc-4", name: "Skater biru" },
  { id: "mc-5", name: "Hijab mint" },
  { id: "mc-6", name: "Keriting cokelat" },
  { id: "mc-7", name: "Topi kuning" },
  { id: "mc-8", name: "Headset editor" },
];

const SKIN = ["#ffd9b8", "#f2c19b", "#e0a878", "#ffdfc4"];

// ===== Susunan wajah umum (mata + senyum + pipi) =====
function face(cx, skin) {
  return (
    <>
      {/* mata (animasi kedip via CSS .av-eyes) */}
      <g className="av-eyes">
        <circle cx={cx - 22} cy="88" r="6" fill="#1e293b" />
        <circle cx={cx + 22} cy="88" r="6" fill="#1e293b" />
        <circle cx={cx - 24} cy="86" r="2" fill="#fff" />
        <circle cx={cx + 20} cy="86" r="2" fill="#fff" />
      </g>
      {/* senyum */}
      <path d="M 78 108 Q 100 124 122 108" stroke="#1e293b" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      {/* pipi */}
      <ellipse cx={cx - 30} cy="103" rx="5.5" ry="3.2" fill="#fda4af" opacity=".85" />
      <ellipse cx={cx + 30} cy="103" rx="5.5" ry="3.2" fill="#fda4af" opacity=".85" />
    </>
  );
}

function body(color) {
  return (
    <path d="M 28 178 Q 100 132 172 178 L 172 200 L 28 200 Z" fill={color} stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
  );
}
function headBase(skin, rx = 52, ry = 50) {
  return <ellipse cx="100" cy="86" rx={rx} ry={ry} fill={skin} stroke="#1e293b" strokeWidth="5" />;
}

// ===== Definisi tiap karakter =====
const CHARACTERS = {
  "mc-1": (     // Bocah kacamata — rambut hitam pendek + kacamata bulat
    <>
      {body("#38bdf8")}
      {headBase(SKIN[0])}
      <path d="M 48 66 Q 100 18 152 66 Q 100 44 48 66 Z" fill="#1e293b" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="78" cy="89" r="14" fill="none" stroke="#0c4a6e" strokeWidth="4" />
      <circle cx="122" cy="89" r="14" fill="none" stroke="#0c4a6e" strokeWidth="4" />
      <line x1="92" y1="89" x2="108" y2="89" stroke="#0c4a6e" strokeWidth="4" />
      <line x1="64" y1="89" x2="48" y2="84" stroke="#0c4a6e" strokeWidth="4" />
      <line x1="136" y1="89" x2="152" y2="84" stroke="#0c4a6e" strokeWidth="4" />
      {face(100)}
    </>
  ),
  "mc-2": (     // Si pink kuncir — dua kuncir merah muda
    <>
      {body("#fb7185")}
      {headBase(SKIN[3])}
      <path d="M 52 66 Q 100 20 148 66 L 140 74 Q 100 46 60 74 Z" fill="#ec4899" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="38" cy="66" r="14" fill="#ec4899" stroke="#1e293b" strokeWidth="5" />
      <circle cx="162" cy="66" r="14" fill="#ec4899" stroke="#1e293b" strokeWidth="5" />
      {face(100)}
    </>
  ),
  "mc-3": (     // Kuning acak — rambut kuning acak + senyum lebar
    <>
      {body("#fbbf24")}
      {headBase(SKIN[1])}
      <path d="M 48 68 L 66 30 L 82 58 L 100 22 L 118 58 L 134 30 L 152 68 Z" fill="#facc15" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      {face(100)}
    </>
  ),
  "mc-4": (     // Skater biru — rambut biru undercut
    <>
      {body("#a78bfa")}
      {headBase(SKIN[2])}
      <path d="M 52 64 Q 100 16 148 64 Q 100 40 52 64 Z" fill="#3b82f6" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      {face(100)}
    </>
  ),
  "mc-5": (     // Hijab mint — hijab hijau mint + anting kecil
    <>
      {body("#34d399")}
      {headBase(SKIN[3])}
      <path d="M 100 8 Q 158 26 152 96 Q 150 132 128 146 L 100 138 L 72 146 Q 50 132 48 96 Q 42 26 100 8 Z" fill="#6ee7b7" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      {face(100)}
    </>
  ),
  "mc-6": (     // Keriting cokelat — awan keriting cokelat
    <>
      {body("#fb923c")}
      {headBase(SKIN[2])}
      <g fill="#7c2d12" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round">
        <circle cx="66" cy="48" r="16" />
        <circle cx="88" cy="34" r="16" />
        <circle cx="112" cy="34" r="16" />
        <circle cx="134" cy="48" r="16" />
        <circle cx="76" cy="60" r="14" />
        <circle cx="100" cy="54" r="14" />
        <circle cx="124" cy="60" r="14" />
      </g>
      {face(100)}
    </>
  ),
  "mc-7": (     // Topi kuning — topi baseball kuning + rambut kecil
    <>
      {body("#f43f5e")}
      {headBase(SKIN[0])}
      <path d="M 48 58 Q 100 20 152 58 Q 100 34 48 58 Z" fill="#fde047" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 140 56 L 176 56 L 176 68 L 138 66 Z" fill="#fde047" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="100" cy="26" r="7" fill="#fde047" stroke="#1e293b" strokeWidth="4" />
      {face(100)}
    </>
  ),
  "mc-8": (     // Headset editor — headset + mikrofon (vibe coding)
    <>
      {body("#22d3ee")}
      {headBase(SKIN[1])}
      <path d="M 50 66 Q 100 22 150 66 Q 100 44 50 66 Z" fill="#0e7490" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 46 92 Q 46 44 100 40 Q 154 44 154 92" fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
      <rect x="34" y="84" width="20" height="28" rx="9" fill="#0f172a" />
      <rect x="146" y="84" width="20" height="28" rx="9" fill="#0f172a" />
      <path d="M 154 108 Q 150 134 124 136" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
      <circle cx="120" cy="137" r="6" fill="#0f172a" />
      {face(100)}
    </>
  ),
};

export default function Avatar({ id, size = 96, className = "", title }) {
  const known = CHARACTERS[id];
  if (!known) {
    // Fallback: emoji lama / teks
    return (
      <span style={{ fontSize: size * 0.72, lineHeight: 1, display: "inline-block" }} role="img" aria-label={title || "avatar"}>
        {id || "🧝"}
      </span>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={`avatar-live ${className}`} role="img" aria-label={title || "avatar"}>
      {CHARACTERS[id]}
    </svg>
  );
}
