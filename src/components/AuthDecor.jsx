// Dekorasi panel login & daftar — awan, sparkle, dan tag kode melayang (ala thumbnail).
import React from "react";

function Cloud({ top, left, right, size = 70, delay = "0s", duration = "6.8s", opacity = 0.85 }) {
  return (
    <svg className="cloud"
      style={{ top, left, right, width: size, animationDelay: delay, animationDuration: duration, opacity, filter: "drop-shadow(0 4px 6px rgba(2,132,199,.2))" }}
      viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="authCloudGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dceffb" />
        </linearGradient>
      </defs>
      <g fill="url(#authCloudGrad)">
        <rect x="30" y="78" width="160" height="30" rx="15" />
        <ellipse cx="42" cy="82" rx="26" ry="18" />
        <ellipse cx="66" cy="62" rx="27" ry="22" />
        <ellipse cx="100" cy="48" rx="30" ry="25" />
        <ellipse cx="134" cy="58" rx="27" ry="23" />
        <ellipse cx="166" cy="70" rx="26" ry="20" />
        <ellipse cx="188" cy="86" rx="20" ry="14" />
      </g>
    </svg>
  );
}

const TAGS = [
  { t: "<h1>", top: "14%", left: "7%", rot: "-10deg" },
  { t: "<a>", top: "22%", right: "7%", rot: "12deg" },
  { t: "<img>", top: "62%", left: "6%", rot: "8deg" },
  { t: "<input>", top: "68%", right: "7%", rot: "-10deg" },
  { t: "<button>", top: "38%", right: "10%", rot: "6deg" },
  { t: "<form>", top: "8%", left: "32%", rot: "5deg" },
];

export default function AuthDecor() {
  return (
    <>
      {/* Awan di sudut-sudut panel */}
      <Cloud top="6%" left="4%" size={64} delay="-1.5s" duration="6.2s" opacity={0.85} />
      <Cloud top="5%" right="5%" size={48} delay="-3.2s" duration="5.6s" opacity={0.8} />
      <Cloud top="72%" left="4%" size={46} delay="-2.4s" duration="6.8s" opacity={0.75} />
      <Cloud top="74%" right="4%" size={60} delay="-4s" duration="7.1s" opacity={0.85} />
      {/* Tag kode melayang */}
      {TAGS.map((f, i) => (
        <span key={i} className="float-tag" style={{ top: f.top, left: f.left, right: f.right, "--rot": f.rot, animationDelay: `-${i * 1.3}s` }}>{f.t}</span>
      ))}
      {/* Sparkle berkedip */}
      <span className="sparkle" style={{ top: "10%", left: "24%", fontSize: "1rem" }} aria-hidden="true">✦</span>
      <span className="sparkle" style={{ top: "13%", right: "24%", fontSize: "1.25rem", animationDelay: "-.7s" }} aria-hidden="true">✦</span>
      <span className="sparkle" style={{ top: "42%", left: "14%", fontSize: ".8rem", animationDelay: "-1.4s" }} aria-hidden="true">✦</span>
      <span className="sparkle" style={{ top: "45%", right: "14%", fontSize: ".95rem", animationDelay: "-.35s" }} aria-hidden="true">✦</span>
    </>
  );
}
