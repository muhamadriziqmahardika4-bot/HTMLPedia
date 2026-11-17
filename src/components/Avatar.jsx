// Koleksi 10 avatar kartun gemuk bergaya Cubby — SVG orisinal, animasi CSS halus.
// id disimpan di tabel profiles.avatar. mc-* dipertahankan sebagai fallback akun lama.
import React from "react";

export const AVATAR_CHOICES = [
  { id: "cowboy", name: "Koboi Tegas", bg: "#fde68a" },
  { id: "melodi", name: "Si Melodi", bg: "#fed7aa" },
  { id: "kuncir", name: "Si Kuncir Kembar", bg: "#fbcfe8" },
  { id: "kucing", name: "Si Kucing Putih", bg: "#ddd6fe" },
  { id: "bandana", name: "Petualang Bandana", bg: "#d9f99d" },
  { id: "aviator", name: "Penjelajah Aviator", bg: "#e7e5e4" },
  { id: "ilmuwan", name: "Kakek Ilmuwan", bg: "#e0f2fe" },
  { id: "bunga", name: "Ceria Berbunga", bg: "#fef9c3" },
  { id: "beruang", name: "Si Outdoor", bg: "#d6d3d1" },
  { id: "biru", name: "Si Rambut Biru", bg: "#bfdbfe" },
];

const SKIN = ["#ffd9b8", "#f2c19b", "#e0a878", "#ffdfc4"];

// ===== Wajah: mata + senyum + pipi (default) =====
function face(cx, skin = "#1e293b") {
  return (
    <>
      <g className="av-eyes">
        <circle cx={cx - 22} cy="92" r="6" fill={skin} />
        <circle cx={cx + 22} cy="92" r="6" fill={skin} />
        <circle cx={cx - 24} cy="90" r="2" fill="#fff" />
        <circle cx={cx + 20} cy="90" r="2" fill="#fff" />
      </g>
      <path d={`M 78 112 Q 100 128 122 112`} stroke={skin} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <ellipse cx={cx - 30} cy="107" rx="5.5" ry="3.2" fill="#fda4af" opacity=".85" />
      <ellipse cx={cx + 30} cy="107" rx="5.5" ry="3.2" fill="#fda4af" opacity=".85" />
    </>
  );
}
// Mata tertutup bahagia (untuk karakter ceria)
function faceClosed(skin = "#1e293b") {
  return (
    <>
      <path d="M 66 92 Q 74 84 82 92" stroke={skin} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M 118 92 Q 126 84 134 92" stroke={skin} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M 74 112 Q 100 132 126 112" stroke={skin} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <ellipse cx="66" cy="105" rx="5.5" ry="3.2" fill="#fda4af" opacity=".9" />
      <ellipse cx="134" cy="105" rx="5.5" ry="3.2" fill="#fda4af" opacity=".9" />
    </>
  );
}
function body(color) {
  return <path d="M 28 176 Q 100 132 172 176 L 172 200 L 28 200 Z" fill={color} stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />;
}
function headBase(skin, rx = 52, ry = 49) {
  return <ellipse cx="100" cy="88" rx={rx} ry={ry} fill={skin} stroke="#1e293b" strokeWidth="5" />;
}

const CHARACTERS = {
  // ===== 1. Koboi Tegas — topi cokelat + jenggot =====
  cowboy: (
    <>
      {body("#f87171")}
      {headBase(SKIN[1])}
      <path d="M 100 128 Q 74 122 64 96 Q 76 118 100 120 Q 124 118 136 96 Q 126 122 100 128 Z" fill="#92400e" stroke="#1e293b" strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M 34 74 Q 100 52 166 74 L 172 88 Q 100 64 28 88 Z" fill="#a16207" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 62 56 Q 100 30 138 56 L 138 64 Q 100 44 62 64 Z" fill="#a16207" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <ellipse cx="100" cy="54" rx="16" ry="6" fill="#fde047" stroke="#1e293b" strokeWidth="4" />
      {face(100)}
    </>
  ),
  // ===== 2. Si Melodi — rambut oranye spiky + headphone =====
  melodi: (
    <>
      {body("#7c3aed")}
      {headBase(SKIN[0])}
      <path d="M 46 74 L 56 40 L 72 62 L 80 26 L 96 56 L 108 22 L 124 58 L 136 34 L 152 74 Z" fill="#fb923c" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 42 96 Q 44 36 100 32 Q 156 36 158 96" fill="none" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
      <rect x="28" y="88" width="22" height="34" rx="11" fill="#0f172a" />
      <rect x="150" y="88" width="22" height="34" rx="11" fill="#0f172a" />
      <rect x="36" y="96" width="6" height="18" rx="3" fill="#fb923c" />
      <rect x="158" y="96" width="6" height="18" rx="3" fill="#fb923c" />
      {faceClosed()}
    </>
  ),
  // ===== 3. Si Kuncir Kembar — twin ponytails + bando kucing =====
  kuncir: (
    <>
      {body("#f472b6")}
      {headBase(SKIN[3])}
      <path d="M 52 70 Q 100 20 148 70 L 140 76 Q 100 44 60 76 Z" fill="#fb923c" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 34 62 Q 6 96 34 128 Q 28 84 56 74 Z" fill="#fb923c" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 166 62 Q 194 96 166 128 Q 172 84 144 74 Z" fill="#fb923c" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 62 42 L 74 12 L 92 36 Z" fill="#fb923c" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 108 36 L 126 12 L 138 42 Z" fill="#fb923c" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="77" cy="31" r="4.5" fill="#fb7185" />
      <circle cx="124" cy="31" r="4.5" fill="#fb7185" />
      {face(100)}
    </>
  ),
  // ===== 4. Si Kucing Putih — kucing + kacamata biru + baju ungu =====
  kucing: (
    <>
      {body("#a78bfa")}
      <path d="M 52 74 L 38 30 L 82 52 Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 148 74 L 162 30 L 118 52 Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 55 62 L 47 37 L 73 52 Z" fill="#fbcfe8" stroke="#1e293b" strokeWidth="4" strokeLinejoin="round" />
      <path d="M 145 62 L 153 37 L 127 52 Z" fill="#fbcfe8" stroke="#1e293b" strokeWidth="4" strokeLinejoin="round" />
      {headBase("#f8fafc")}
      <ellipse cx="100" cy="112" rx="16" ry="10" fill="#fbcfe8" stroke="#1e293b" strokeWidth="4" />
      <line x1="22" y1="98" x2="54" y2="103" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="22" y1="112" x2="54" y2="112" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="22" y1="126" x2="54" y2="121" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="146" y1="103" x2="178" y2="98" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="146" y1="112" x2="178" y2="112" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="146" y1="121" x2="178" y2="126" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="78" cy="92" r="13.5" fill="rgba(147,197,253,.35)" stroke="#2563eb" strokeWidth="4" />
      <circle cx="122" cy="92" r="13.5" fill="rgba(147,197,253,.35)" stroke="#2563eb" strokeWidth="4" />
      <line x1="91" y1="92" x2="109" y2="92" stroke="#2563eb" strokeWidth="4" />
      <path d="M 74 130 Q 100 142 126 130" stroke="#1e293b" strokeWidth="4.5" fill="none" strokeLinecap="round" />
    </>
  ),
  // ===== 5. Petualang Bandana — rambut cokelat acak + bandana biru =====
  bandana: (
    <>
      {body("#15803d")}
      {headBase(SKIN[1])}
      <path d="M 52 70 Q 100 24 148 70 L 140 76 Q 100 46 60 76 Z" fill="#78350f" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 46 76 Q 100 46 154 76 L 154 92 Q 100 62 46 92 Z" fill="#2563eb" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="154" cy="84" r="8" fill="#2563eb" stroke="#1e293b" strokeWidth="4" />
      <path d="M 158 88 L 172 104 M 162 82 L 178 96" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
      {face(100)}
    </>
  ),
  // ===== 6. Penjelajah Aviator — rambut panjang cokelat + kacamata aviator =====
  aviator: (
    <>
      {body("#a16207")}
      {headBase(SKIN[0])}
      <path d="M 48 72 Q 100 18 152 72 L 148 92 Q 156 132 132 138 L 100 132 L 68 138 Q 44 132 52 92 Z" fill="#78350f" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="76" cy="96" r="16" fill="#78350f" opacity=".0" />
      <rect x="42" y="86" width="116" height="13" rx="6.5" fill="#451a03" />
      <circle cx="78" cy="99" r="15" fill="#d6a94e" stroke="#1e293b" strokeWidth="4.5" />
      <circle cx="122" cy="99" r="15" fill="#d6a94e" stroke="#1e293b" strokeWidth="4.5" />
      <line x1="93" y1="99" x2="107" y2="99" stroke="#1e293b" strokeWidth="4" />
      <path d="M 78 122 Q 100 134 122 122" stroke="#1e293b" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <ellipse cx="70" cy="112" rx="5" ry="3" fill="#fda4af" opacity=".85" />
      <ellipse cx="130" cy="112" rx="5" ry="3" fill="#fda4af" opacity=".85" />
    </>
  ),
  // ===== 7. Kakek Ilmuwan — rambut putih sisi + janggut + kacamata bulat =====
  ilmuwan: (
    <>
      {body("#f8fafc")}
      <path d="M 100 196 L 100 176" stroke="#e2e8f0" strokeWidth="0" />
      <path d="M 78 168 L 100 128 L 122 168 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 93 138 L 100 150 L 107 138 Z" fill="#60a5fa" stroke="#1e293b" strokeWidth="4" strokeLinejoin="round" />
      {headBase(SKIN[3])}
      <path d="M 46 84 Q 30 40 62 30 Q 44 46 58 66 Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 154 84 Q 170 40 138 30 Q 156 46 142 66 Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 52 60 Q 100 14 148 60 Q 100 32 52 60 Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="100" cy="26" r="12" fill="#f8fafc" stroke="#1e293b" strokeWidth="5" />
      <path d="M 66 108 Q 100 172 134 108 Q 100 130 66 108 Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="80" cy="86" r="12" fill="none" stroke="#1e293b" strokeWidth="4" />
      <circle cx="120" cy="86" r="12" fill="none" stroke="#1e293b" strokeWidth="4" />
      <line x1="92" y1="86" x2="108" y2="86" stroke="#1e293b" strokeWidth="4" />
      <g className="av-eyes">
        <circle cx="80" cy="86" r="3.5" fill="#1e293b" />
        <circle cx="120" cy="86" r="3.5" fill="#1e293b" />
      </g>
    </>
  ),
  // ===== 8. Ceria Berbunga — rambut kuning panjang + bando bunga =====
  bunga: (
    <>
      {body("#f472b6")}
      {headBase(SKIN[0])}
      <path d="M 46 72 Q 100 16 154 72 Q 158 130 128 142 L 118 92 Q 100 64 82 92 L 72 142 Q 42 130 46 72 Z" fill="#fde047" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <g transform="translate(140 58)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="0" cy="-13" rx="7" ry="11" fill="#fb7185" stroke="#1e293b" strokeWidth="3.5" transform={`rotate(${deg})`} />
        ))}
        <circle r="6.5" fill="#fde047" stroke="#1e293b" strokeWidth="3.5" />
      </g>
      {faceClosed()}
    </>
  ),
  // ===== 9. Si Outdoor — beruang cokelat + ransel =====
  beruang: (
    <>
      <path d="M 64 190 L 58 132 M 136 190 L 142 132" stroke="#451a03" strokeWidth="14" strokeLinecap="round" />
      {body("#b45309")}
      {headBase("#a16207", 54, 50)}
      <circle cx="46" cy="46" r="15" fill="#a16207" stroke="#1e293b" strokeWidth="5" />
      <circle cx="154" cy="46" r="15" fill="#a16207" stroke="#1e293b" strokeWidth="5" />
      <circle cx="46" cy="46" r="6.5" fill="#fcd9a8" />
      <circle cx="154" cy="46" r="6.5" fill="#fcd9a8" />
      <ellipse cx="100" cy="114" rx="17" ry="12" fill="#fcd9a8" stroke="#1e293b" strokeWidth="4" />
      <circle cx="100" cy="109" r="4.5" fill="#1e293b" />
      <path d="M 100 113 L 100 119 M 100 119 Q 88 124 82 118 M 100 119 Q 112 124 118 118" stroke="#1e293b" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g className="av-eyes">
        <circle cx="76" cy="88" r="6" fill="#1e293b" />
        <circle cx="124" cy="88" r="6" fill="#1e293b" />
      </g>
      <ellipse cx="66" cy="102" rx="5" ry="3" fill="#fda4af" opacity=".85" />
      <ellipse cx="134" cy="102" rx="5" ry="3" fill="#fda4af" opacity=".85" />
    </>
  ),
  // ===== 10. Si Rambut Biru — bowl cut biru + kacamata bulat + baju putih =====
  biru: (
    <>
      {body("#f8fafc")}
      <path d="M 100 172 L 100 148" stroke="#e2e8f0" strokeWidth="0" />
      <path d="M 82 156 L 100 138 L 118 156" fill="none" stroke="#e2e8f0" strokeWidth="0" />
      <circle cx="100" cy="152" r="3" fill="#0ea5e9" />
      {headBase(SKIN[3])}
      <path d="M 46 80 Q 44 26 100 24 Q 156 26 154 80 Q 134 66 100 66 Q 66 66 46 80 Z" fill="#3b82f6" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="78" cy="92" r="13" fill="rgba(186,230,253,.5)" stroke="#0c4a6e" strokeWidth="4" />
      <circle cx="122" cy="92" r="13" fill="rgba(186,230,253,.5)" stroke="#0c4a6e" strokeWidth="4" />
      <line x1="91" y1="92" x2="109" y2="92" stroke="#0c4a6e" strokeWidth="4" />
      <g className="av-eyes">
        <circle cx="78" cy="92" r="4" fill="#0c4a6e" />
        <circle cx="122" cy="92" r="4" fill="#0c4a6e" />
      </g>
      <path d="M 80 116 Q 100 126 120 116" stroke="#1e293b" strokeWidth="4.5" fill="none" strokeLinecap="round" />
    </>
  ),

  // ===== Karakter lama (fallback akun yang sudah terlanjur memilih mc-*) =====
  "mc-1": (
    <>
      {body("#38bdf8")}
      {headBase(SKIN[0])}
      <path d="M 48 66 Q 100 18 152 66 Q 100 44 48 66 Z" fill="#1e293b" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="78" cy="89" r="14" fill="none" stroke="#0c4a6e" strokeWidth="4" />
      <circle cx="122" cy="89" r="14" fill="none" stroke="#0c4a6e" strokeWidth="4" />
      <line x1="92" y1="89" x2="108" y2="89" stroke="#0c4a6e" strokeWidth="4" />
      {face(100)}
    </>
  ),
  "mc-2": (
    <>
      {body("#fb7185")}
      {headBase(SKIN[3])}
      <path d="M 52 66 Q 100 20 148 66 L 140 74 Q 100 46 60 74 Z" fill="#ec4899" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="38" cy="66" r="14" fill="#ec4899" stroke="#1e293b" strokeWidth="5" />
      <circle cx="162" cy="66" r="14" fill="#ec4899" stroke="#1e293b" strokeWidth="5" />
      {face(100)}
    </>
  ),
  "mc-3": (
    <>
      {body("#fbbf24")}
      {headBase(SKIN[1])}
      <path d="M 48 68 L 66 30 L 82 58 L 100 22 L 118 58 L 134 30 L 152 68 Z" fill="#facc15" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      {face(100)}
    </>
  ),
  "mc-4": (
    <>
      {body("#a78bfa")}
      {headBase(SKIN[2])}
      <path d="M 52 64 Q 100 16 148 64 Q 100 40 52 64 Z" fill="#3b82f6" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      {face(100)}
    </>
  ),
  "mc-5": (
    <>
      {body("#34d399")}
      {headBase(SKIN[3])}
      <path d="M 100 8 Q 158 26 152 96 Q 150 132 128 146 L 100 138 L 72 146 Q 50 132 48 96 Q 42 26 100 8 Z" fill="#6ee7b7" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      {face(100)}
    </>
  ),
  "mc-6": (
    <>
      {body("#fb923c")}
      {headBase(SKIN[2])}
      <g fill="#7c2d12" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round">
        <circle cx="66" cy="48" r="16" /><circle cx="88" cy="34" r="16" /><circle cx="112" cy="34" r="16" /><circle cx="134" cy="48" r="16" /><circle cx="76" cy="60" r="14" /><circle cx="100" cy="54" r="14" /><circle cx="124" cy="60" r="14" />
      </g>
      {face(100)}
    </>
  ),
  "mc-7": (
    <>
      {body("#f43f5e")}
      {headBase(SKIN[0])}
      <path d="M 48 58 Q 100 20 152 58 Q 100 34 48 58 Z" fill="#fde047" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 140 56 L 176 56 L 176 68 L 138 66 Z" fill="#fde047" stroke="#1e293b" strokeWidth="5" strokeLinejoin="round" />
      {face(100)}
    </>
  ),
  "mc-8": (
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
