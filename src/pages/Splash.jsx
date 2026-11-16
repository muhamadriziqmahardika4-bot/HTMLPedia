import React, { useEffect, useState } from "react";

/* ===== Maskot Robot Cubby (SVG) ===== */
function RobotCubby({ size = 160 }) {
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

function Cloud({ top, left, right, bottom, size = 110, delay = "0s", duration = "7.5s", opacity = 0.95, fixed = false }) {
  return (
    <svg className={fixed ? "cloud-fixed" : "cloud"}
      style={{ top, left, right, bottom, width: size, animationDelay: delay, animationDuration: duration, opacity, filter: "drop-shadow(0 6px 8px rgba(2,132,199,.18))" }}
      viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dceffb" />
        </linearGradient>
      </defs>
      <g fill="url(#cloudGrad)">
        <rect x="30" y="78" width="160" height="30" rx="15" />
        <ellipse cx="42" cy="82" rx="26" ry="18" />
        <ellipse cx="66" cy="62" rx="27" ry="22" />
        <ellipse cx="100" cy="48" rx="30" ry="25" />
        <ellipse cx="134" cy="58" rx="27" ry="23" />
        <ellipse cx="166" cy="70" rx="26" ry="20" />
        <ellipse cx="188" cy="86" rx="20" ry="14" />
      </g>
      <ellipse cx="96" cy="42" rx="18" ry="8" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}

function Sparkle({ top, left, right, size = "1.1rem", delay = "0s" }) {
  return <span className="sparkle" style={{ top, left, right, fontSize: size, animationDelay: delay }} aria-hidden="true">✦</span>;
}

const FLOAT_TAGS = [
  { t: "<h1>", top: "16%", left: "8%", rot: "-10deg" }, { t: "<a>", top: "26%", right: "8%", rot: "12deg" },
  { t: "<img>", top: "56%", left: "7%", rot: "8deg" }, { t: "<table>", top: "64%", right: "7%", rot: "-12deg" },
  { t: "<form>", top: "12%", left: "30%", rot: "6deg" }, { t: "<input>", top: "20%", right: "28%", rot: "-6deg" },
];
function FloatTag({ t, top, left, right, rot, delay }) {
  return <span className="float-tag" style={{ top, left, right, "--rot": rot, animationDelay: delay }}>{t}</span>;
}

const CUBBY_PHRASES = ["Halo! Aku Cubby 🤖", "Siap belajar HTML?", "Gas, langsung gass! 🚀"];
function CubbyBubble() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx((i) => (i + 1) % CUBBY_PHRASES.length); setVisible(true); }, 280);
    }, 2600);
    return () => clearInterval(t);
  }, []);
  return <div className="cubby-bubble" style={{ opacity: visible ? 1 : 0 }}>{CUBBY_PHRASES[idx]}</div>;
}

export default function Splash({ onStart, leaving }) {
  return (
    <div className={`splash-screen ${leaving ? "leaving" : ""}`}>
      {/* Awan di LUAR box: membingkai box di 4 sudut */}
      <Cloud fixed top="17%" left="6%" size={120} delay="-1s" opacity={0.95} />
      <Cloud fixed top="18%" right="5%" size={80} delay="-3.5s" duration="7s" opacity={0.85} />
      <Cloud fixed bottom="23%" left="7%" size={85} delay="-2s" duration="6.5s" opacity={0.85} />
      <Cloud fixed bottom="23%" right="6%" size={130} delay="-4.5s" duration="7.5s" opacity={0.95} />

      {/* Gelombang paling atas & paling bawah layar */}
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"
        style={{ position: "fixed", top: -46, left: 0, width: "100%", height: 150, zIndex: 0, pointerEvents: "none", transform: "scaleY(-1)" }}>
        <path fill="#bae6fd" opacity="0.55" d="M0,42 C140,75 260,15 400,45 C540,72 660,12 800,42 C940,70 1060,18 1200,44 C1310,64 1380,35 1440,48 L1440,90 L0,90 Z" />
        <path fill="#e0f2fe" d="M0,60 C180,25 340,80 500,55 C660,32 820,82 980,58 C1120,38 1300,75 1440,58 L1440,90 L0,90 Z" />
      </svg>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"
        style={{ position: "fixed", bottom: -46, left: 0, width: "100%", height: 150, zIndex: 0, pointerEvents: "none" }}>
        <path fill="#bae6fd" opacity="0.55" d="M0,42 C140,75 260,15 400,45 C540,72 660,12 800,42 C940,70 1060,18 1200,44 C1310,64 1380,35 1440,48 L1440,90 L0,90 Z" />
        <path fill="#e0f2fe" d="M0,60 C180,25 340,80 500,55 C660,32 820,82 980,58 C1120,38 1300,75 1440,58 L1440,90 L0,90 Z" />
      </svg>

      <div className="splash-wrap">
        <div className={`panel ${leaving ? "panel-leaving" : ""}`} style={{ textAlign: "center", padding: "2.2rem 2rem 2.6rem", margin: "0 auto", width: "min(1020px, 100%)", minHeight: 540, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          {/* Gelombang di dasar box */}
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ position: "absolute", bottom: -2, left: 0, width: "100%", height: 80, zIndex: 0 }} aria-hidden="true">
            <path fill="#e0f2fe" d="M0,48 C120,80 240,10 360,40 C480,70 600,20 720,45 C840,70 960,15 1080,42 C1200,68 1320,30 1440,50 L1440,90 L0,90 Z" />
            <path fill="#bae6fd" opacity="0.6" d="M0,62 C160,30 320,75 480,55 C640,35 800,78 960,58 C1120,38 1280,72 1440,55 L1440,90 L0,90 Z" />
          </svg>
          {/* Glow di belakang robot */}
          <div aria-hidden="true" style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(125,211,252,.5) 0%, rgba(125,211,252,0) 70%)", top: "12%", left: "18%", zIndex: 0 }} />
          {/* Awan di DALAM box */}
          <Cloud top="9%" left="5%" size={64} delay="-2s" duration="5s" opacity={0.8} />
          <Cloud top="12%" right="5%" size={56} delay="-4s" duration="5.8s" opacity={0.8} />
          {FLOAT_TAGS.map((f, i) => <FloatTag key={i} {...f} delay={`-${i * 1.1}s`} />)}
          <Sparkle top="18%" left="22%" size="1rem" delay="0s" />
          <Sparkle top="14%" right="20%" size="1.3rem" delay="-.7s" />
          <Sparkle top="38%" left="12%" size=".9rem" delay="-1.3s" />
          <Sparkle top="34%" right="13%" size="1.1rem" delay="-.4s" />
          <Sparkle top="52%" left="30%" size=".8rem" delay="-1.8s" />
          <Sparkle top="50%" right="30%" size=".8rem" delay="-2.2s" />

          <div style={{ position: "relative", zIndex: 3 }}>
            <div className="piece" style={{ animationDelay: "0s", display: "flex", alignItems: "center", justifyContent: "center", gap: "1.1rem", margin: "1rem 0 .2rem", flexWrap: "wrap" }}>
              <div style={{ position: "relative", flexShrink: 0, zIndex: 3 }}>
                <RobotCubby size={160} />
                <CubbyBubble />
              </div>
              <div style={{ textAlign: "left" }}>
                <span className="badge" style={{ marginBottom: ".4rem" }}>✨ SELAMAT DATANG DI ✨</span>
                <h1 style={{ fontSize: "clamp(1.9rem, 6.5vw, 2.7rem)", fontWeight: 900, margin: 0, background: "linear-gradient(90deg,#0ea5e9,#6366f1,#22d3ee)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>HTMLpedia</h1>
                <p style={{ color: "#0369a1", fontWeight: 700, margin: 0 }}>Ensiklopedia Interaktif Tag HTML</p>
              </div>
            </div>
            <button className="done-btn piece" onClick={onStart}
              style={{ animationDelay: ".15s", fontSize: "1.1rem", padding: ".85rem 2.3rem", marginTop: "1.1rem", background: "linear-gradient(135deg,#38bdf8,#818cf8)", border: "none", color: "#fff", boxShadow: "0 6px 0 #0ea5e9", borderRadius: 999, cursor: "pointer" }}>
              🚀 MULAI — LANGSUNG GASS!
            </button>
            <div className="piece" style={{ animationDelay: ".28s", display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap", marginTop: ".9rem" }}>
              <span className="chip">🏷️ 100+ Tag</span>
              <span className="chip css">🎮 Kuis Greget &amp; Gacor</span>
              <span className="chip js">🎬 Demo Hidup</span>
            </div>
            <p className="piece" style={{ animationDelay: ".38s", color: "#0c4a6e", fontWeight: 600, fontSize: ".85rem", maxWidth: 480, margin: ".8rem auto .2rem", background: "rgba(240,249,255,.85)", border: "2px dashed #bae6fd", borderRadius: 14, padding: ".5rem .8rem" }}>
              Belajar HTML dari nol sampai bisa bikin web sendiri — ditemani Cubby si robot, demo hidup, kuis greget, dan 100+ tag yang dibahas tuntas. 🚀
            </p>
            <div className="piece" style={{ animationDelay: ".48s", fontSize: ".7rem", color: "#0369a1", marginTop: ".7rem", fontWeight: 700 }}>Dibuat dengan 💙 oleh M Riziq Mahardika · @mhmdrziqmhrdika</div>
          </div>
        </div>
      </div>
    </div>
  );
}
