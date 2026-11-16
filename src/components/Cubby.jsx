import React from "react";

/* ===== Maskot Robot Cubby (SVG) ===== */
export default function Cubby({ size = 150 }) {
  return (
    <svg viewBox="0 0 200 210" width={size} role="img" aria-label="Maskot robot HTMLpedia" style={{ filter: "drop-shadow(0 10px 12px rgba(2,132,199,.35))", animation: "floaty 4.6s ease-in-out infinite" }}>
      <line x1="100" y1="28" x2="100" y2="8" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
      <circle cx="100" cy="8" r="7" fill="#f472b6">
        <animate attributeName="r" values="6;8.5;6" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <rect x="22" y="84" width="16" height="30" rx="6" fill="#7dd3fc" stroke="#0284c7" strokeWidth="3" />
      <rect x="162" y="84" width="16" height="30" rx="6" fill="#7dd3fc" stroke="#0284c7" strokeWidth="3" />
      <rect x="38" y="28" width="124" height="92" rx="30" fill="#e0f2fe" stroke="#0284c7" strokeWidth="4" />
      <circle cx="74" cy="72" r="13" fill="#0c4a6e" />
      <circle cx="126" cy="72" r="13" fill="#0c4a6e" />
      <circle cx="78.5" cy="67.5" r="4.5" fill="#fff" />
      <circle cx="130.5" cy="67.5" r="4.5" fill="#fff" />
      <circle cx="52" cy="92" r="5" fill="#fbcfe8" />
      <circle cx="148" cy="92" r="5" fill="#fbcfe8" />
      <path d="M84 94 Q100 106 116 94" fill="none" stroke="#0c4a6e" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="52" y="126" width="96" height="64" rx="20" fill="#bae6fd" stroke="#0284c7" strokeWidth="4" />
      <rect x="72" y="140" width="56" height="30" rx="8" fill="#0c4a6e" />
      <text x="100" y="161" textAnchor="middle" fontSize="15" fill="#7dd3fc" fontFamily="Consolas, monospace">&lt;/&gt;</text>
      <rect x="66" y="188" width="18" height="12" rx="5" fill="#0284c7" />
      <rect x="116" y="188" width="18" height="12" rx="5" fill="#0284c7" />
    </svg>
  );
}
