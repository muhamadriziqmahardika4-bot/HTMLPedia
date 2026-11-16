import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Cubby from "../components/Cubby.jsx";

const SLIDES = [
  {
    emoji: "👋",
    title: "Hai, aku Cubby!",
    analogi: "Web itu seperti kota — ada jalan, ada rumah, ada rambu-rambu.",
    text: "Sebelum kita mulai menulis kode, aku kenalin dulu beberapa istilah yang sering muncul di dunia web. Kamu pakai ini setiap hari, tapi kamu mungkin belum tahu namanya.",
    bg: "#fef9c3",
    cubby: "Halo! Aku Cubby, teman belajarmu 🤖",
  },
  {
    emoji: "🏷️",
    title: "Domain",
    analogi: "Domain itu alamat rumahmu di internet.",
    text: "Contoh: masakku.id, google.com, tokopedia.com. Tanpa domain, orang harus mengetik alamat angka yang rumit (IP) untuk mengunjungi websitemu. Lebih enak diketik: masakku.id, kan?",
    bg: "#fce7f3",
    cubby: "Domain = alamat rumahmu di internet! 🏷️",
  },
  {
    emoji: "🏠",
    title: "Hosting",
    analogi: "Hosting itu rumah tempat websitemu tinggal.",
    text: "File website (HTML, gambar, dll.) butuh tempat disimpan supaya bisa diakses 24 jam dari mana pun. Hosting adalah 'tanah/server' yang kamu sewa — atau versi gratisnya: GitHub Pages, Vercel, Netlify.",
    bg: "#e0f2fe",
    cubby: "Hosting = rumah file-filemu 🏠",
  },
  {
    emoji: "📁",
    title: "File & Folder",
    analogi: "File itu lembaran resep, folder itu rak penyusunnya.",
    text: "Proyek web disimpan sebagai folder: index.html (halaman utama), style.css (tampilan), script.js (interaksi), dan images/ (gambar). Rapi folder = rapi kode.",
    bg: "#dcfce7",
    cubby: "File rapi = otak rapi 📁",
  },
  {
    emoji: "🌍",
    title: "Browser",
    analogi: "Browser itu jendela yang menampilkan kota web ke kamu.",
    text: "Chrome, Edge, Firefox, Safari — semuanya menerjemahkan kode HTML/CSS/JS menjadi halaman yang bisa kamu lihat dan klik. Setiap web developer WAJIB punya browser.",
    bg: "#ede9fe",
    cubby: "Browser itu jendela ajaib! 🪄",
  },
  {
    emoji: "✏️",
    title: "Editor Kode",
    analogi: "Editor itu buku tulis dan pulpenmu — tempat kamu 'menulis' web.",
    text: "VS Code adalah editor paling populer gratis. Di sana kamu mengetik HTML, CSS, JavaScript — dan kesalahannya langsung ditandai merah sebelum kamu menjalankan apa pun.",
    bg: "#ffedd5",
    cubby: "VS Code = senjata utamamu ✏️",
  },
  {
    emoji: "🚀",
    title: "Deploy",
    analogi: "Deploy itu membuka rumahmu untuk tamu — orang lain akhirnya bisa datang.",
    text: "Menulis kode itu satu hal; membagikannya itu hal lain. Saat kamu 'deploy', website kamu dipublikasikan ke internet — semua orang bisa membukanya lewat domain kamu.",
    bg: "#ecfeff",
    cubby: "Siap deploy? Gas! 🚀",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 26, scale: 0.92, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 260, damping: 22 } },
};

/* Dekorasi latar: bentuk-bentuk pastel melayang */
const DECO = [
  { type: "ring", style: { width: 90, height: 90, top: "14%", left: "6%", borderColor: "rgba(244,114,182,.35)" } },
  { type: "ring", style: { width: 60, height: 60, bottom: "18%", right: "8%", borderColor: "rgba(56,189,248,.4)" } },
  { type: "dot", style: { width: 26, height: 26, top: "30%", right: "18%", background: "rgba(253,224,71,.6)" } },
  { type: "dot", style: { width: 18, height: 18, bottom: "28%", left: "18%", background: "rgba(196,181,253,.55)" } },
  { type: "dot", style: { width: 34, height: 34, top: "52%", left: "8%", background: "rgba(165,243,252,.7)" } },
  { type: "rrect", style: { width: 80, height: 28, top: "12%", right: "24%", transform: "rotate(-8deg)", border: "2px solid rgba(244,114,182,.4)" } },
  { type: "rrect", style: { width: 64, height: 22, bottom: "12%", left: "26%", transform: "rotate(10deg)", border: "2px solid rgba(52,211,153,.45)" } },
  { type: "plus", style: { top: "38%", right: "10%", fontSize: "1.6rem", color: "#f9a8d4" } },
  { type: "plus", style: { bottom: "34%", left: "32%", fontSize: "1.1rem", color: "#7dd3fc" } },
];

function Deco({ d }) {
  const base = { position: "absolute", borderRadius: 14, animation: "floaty 6s ease-in-out infinite", pointerEvents: "none" };
  if (d.type === "ring") return <div style={{ ...base, ...d.style, borderRadius: "50%", border: "10px solid" }} />;
  if (d.type === "dot") return <div style={{ ...base, ...d.style, borderRadius: "50%" }} />;
  if (d.type === "rrect") return <div style={{ ...base, ...d.style, background: "rgba(255,255,255,.5)" }} />;
  return <div style={{ ...base, ...d.style, fontWeight: 900 }}>✚</div>;
}

export default function IntroBasics({ onDone }) {
  const [step, setStep] = useState(0);
  const isChoice = step >= SLIDES.length;
  const current = isChoice ? null : SLIDES[step];
  const bg = current?.bg || "#f5f3ff";

  const next = () => setStep((s) => Math.min(s + 1, SLIDES.length));
  const skipAll = () => setStep(SLIDES.length);
  const celebrate = () => confetti({ particleCount: 120, spread: 90, origin: { y: 0.55 }, colors: ["#f472b6", "#fde047", "#38bdf8", "#a78bfa", "#86efac"] });

  return (
    <div style={{
      position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(165deg, ${bg} 0%, #ffffff 105%)`, transition: "background .7s ease", padding: "1.2rem",
    }}>
      {/* Gelombang atas & bawah layar */}
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", top: -30, left: 0, width: "100%", height: 110, zIndex: 0, pointerEvents: "none", transform: "scaleY(-1)", opacity: 0.8 }}>
        <path fill="#ffffff" d="M0,42 C140,75 260,15 400,45 C540,72 660,12 800,42 C940,70 1060,18 1200,44 C1310,64 1380,35 1440,48 L1440,90 L0,90 Z" />
      </svg>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" style={{ position: "absolute", bottom: -30, left: 0, width: "100%", height: 110, zIndex: 0, pointerEvents: "none", opacity: 0.8 }}>
        <path fill="#ffffff" d="M0,42 C140,75 260,15 400,45 C540,72 660,12 800,42 C940,70 1060,18 1200,44 C1310,64 1380,35 1440,48 L1440,90 L0,90 Z" />
      </svg>

      {/* Dekorasi pastel */}
      {DECO.map((d, i) => <Deco key={i} d={d} />)}

      {/* Progress dots */}
      {!isChoice && (
        <div style={{ display: "flex", gap: ".4rem", marginBottom: "1rem", zIndex: 2 }}>
          {SLIDES.map((_, i) => (
            <span key={i} style={{ width: i === step ? 30 : 10, height: 10, borderRadius: 99, background: i === step ? "#38bdf8" : i < step ? "#86efac" : "#cbd5e1", transition: "all .35s" }} />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {!isChoice ? (
          <motion.div
            key={step}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, clipPath: "inset(0 0 0 100%)", x: -140, rotate: -2, transition: { type: "spring", stiffness: 240, damping: 28 } }}
            style={{
              position: "relative", zIndex: 2, maxWidth: 680, width: "100%", background: "#ffffff", borderRadius: 28,
              border: "3px solid rgba(226,232,240,.9)", padding: "1.4rem 1.6rem", boxShadow: "0 22px 50px rgba(2,132,199,.22)",
              clipPath: "inset(0 0% 0 0)", display: "flex", gap: "1.1rem", alignItems: "center", flexWrap: "wrap",
            }}
          >
            {/* Speech bubble + Cubby */}
            <motion.div variants={item} style={{ position: "relative", flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: ".3rem" }}>
              <div className="cubby-bubble" style={{ position: "static", transform: "none", width: 118, fontSize: ".62rem", marginBottom: "-.2rem" }}>{current.cubby}</div>
              <Cubby size={118} />
            </motion.div>

            {/* Teks */}
            <div style={{ flex: "1 1 260px", textAlign: "left" }}>
              <motion.span variants={item} className="badge" style={{ display: "inline-block", background: "#f0f9ff", color: "#0369a1", border: "2px solid #bae6fd" }}>📖 DASAR {step + 1} / {SLIDES.length}</motion.span>
              <motion.h1 variants={item} style={{ margin: ".35rem 0 .1rem", fontSize: "1.65rem", color: "#0c4a6e" }}>{current.title}</motion.h1>
              <motion.p variants={item} style={{ color: "#0369a1", fontWeight: 800, margin: ".1rem 0 .6rem", fontSize: ".9rem" }}>“{current.analogi}”</motion.p>
              <motion.p variants={item} style={{ color: "#334155", lineHeight: 1.7, margin: 0, fontSize: ".92rem" }}>{current.text}</motion.p>

              <motion.div variants={item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", gap: ".5rem", flexWrap: "wrap" }}>
                <button className="btn" onClick={skipAll}>⏭️ Lewati Dasar</button>
                <button className="done-btn" onClick={next}>{step === SLIDES.length - 1 ? "Selesai ➡️" : "Lanjut ➡️"}</button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="choice"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
            style={{ position: "relative", zIndex: 2, maxWidth: 620, width: "100%", background: "#fff", borderRadius: 28, border: "3px solid rgba(226,232,240,.9)", padding: "1.5rem 1.8rem", boxShadow: "0 22px 50px rgba(2,132,199,.25)", textAlign: "center" }}
          >
            <motion.div variants={item} style={{ display: "flex", justifyContent: "center", marginBottom: ".2rem" }}><Cubby size={150} /></motion.div>
            <motion.h1 variants={item} style={{ margin: ".2rem 0 .2rem", fontSize: "1.55rem", color: "#0c4a6e" }}>Kamu sudah paham dasarnya! 🎉</motion.h1>
            <motion.p variants={item} style={{ color: "#64748b", margin: "0 0 1rem" }}>Domain, hosting, file, browser, editor, deploy — checklist kamu lengkap. Mau ke mana sekarang?</motion.p>
            <motion.div variants={item} style={{ display: "flex", gap: ".7rem", justifyContent: "center", flexWrap: "wrap", marginBottom: ".6rem" }}>
              <button className="done-btn" onClick={() => { celebrate(); onDone("home"); }}>🏠 Ke Beranda</button>
              <button className="pill active" onClick={() => { celebrate(); onDone("dasar"); }}>📚 Pelajari Bab Dasar</button>
            </motion.div>
            <motion.div variants={item} style={{ display: "flex", gap: ".4rem", justifyContent: "center", flexWrap: "wrap" }}>
              {["🏷️ Domain", "🏠 Hosting", "📁 File", "🌍 Browser", "✏️ Editor", "🚀 Deploy"].map((t) => (
                <span key={t} style={{ fontSize: ".65rem", background: "#e0f2fe", color: "#0369a1", borderRadius: 99, padding: ".25rem .6rem", fontWeight: 800 }}>✓ {t}</span>
              ))}
            </motion.div>
            <motion.p variants={item} style={{ fontSize: ".68rem", color: "#94a3b8", marginTop: ".8rem" }}>Bab dasar bisa dibuka kapan pun lewat menu “Dasar”.</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
