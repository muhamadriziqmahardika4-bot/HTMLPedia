import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    emoji: "👋",
    title: "Hai, aku Cubby!",
    analogi: "Web itu seperti kota — ada jalan, ada rumah, ada rambu-rambu.",
    text: "Sebelum kita mulai menulis kode, aku kenalin dulu beberapa istilah yang sering muncul di dunia web. Kamu pakai ini setiap hari, tapi kamu mungkin belum tahu namanya.",
    bg: "#fef9c3",
  },
  {
    emoji: "🏷️",
    title: "Domain",
    analogi: "Domain itu alamat rumahmu di internet.",
    text: "Contoh: masakku.id, google.com, tokopedia.com. Tanpa domain, orang harus mengetik alamat angka yang rumit (IP) untuk mengunjungi websitemu. Lebih enak diketik: masakku.id, kan?",
    bg: "#fce7f3",
  },
  {
    emoji: "🏠",
    title: "Hosting",
    analogi: "Hosting itu rumah tempat websitemu tinggal.",
    text: "File website (HTML, gambar, dll.) butuh tempat disimpan supaya bisa diakses 24 jam dari mana pun. Hosting adalah 'tanah/server' yang kamu sewa — atau versi gratisnya: GitHub Pages, Vercel, Netlify.",
    bg: "#e0f2fe",
  },
  {
    emoji: "📁",
    title: "File & Folder",
    analogi: "File itu lembaran resep, folder itu rak penyusunnya.",
    text: "Proyek web disimpan sebagai folder: index.html (halaman utama), style.css (tampilan), script.js (interaksi), dan images/ (gambar). Rapi folder = rapi kode.",
    bg: "#dcfce7",
  },
  {
    emoji: "🌍",
    title: "Browser",
    analogi: "Browser itu jendela yang menampilkan kota web ke kamu.",
    text: "Chrome, Edge, Firefox, Safari — semuanya menerjemahkan kode HTML/CSS/JS menjadi halaman yang bisa kamu lihat dan klik. Setiap web developer WAJIB punya browser.",
    bg: "#ede9fe",
  },
  {
    emoji: "✏️",
    title: "Editor Kode",
    analogi: "Editor itu buku tulis dan pulpenmu — tempat kamu 'menulis' web.",
    text: "VS Code adalah editor paling populer gratis. Di sana kamu mengetik HTML, CSS, JavaScript — dan kesalahannya langsung ditandai merah sebelum kamu menjalankan apa pun.",
    bg: "#ffedd5",
  },
  {
    emoji: "🚀",
    title: "Deploy",
    analogi: "Deploy itu membuka rumahmu untuk tamu — orang lain akhirnya bisa datang.",
    text: "Menulis kode itu satu hal; membagikannya itu hal lain. Saat kamu 'deploy', website kamu dipublikasikan ke internet — semua orang bisa membukanya lewat domain kamu.",
    bg: "#ecfeff",
  },
];

export default function IntroBasics({ onDone }) {
  const [step, setStep] = useState(0);          // 0..SLIDES.length-1, lalu SLIDES.length = pilihan
  const [dir, setDir] = useState(1);
  const isChoice = step >= SLIDES.length;
  const current = isChoice ? null : SLIDES[step];

  const next = () => { setDir(1); setStep((s) => Math.min(s + 1, SLIDES.length)); };
  const skipAll = () => { setDir(1); setStep(SLIDES.length); };

  const bg = current?.bg || "#f5f3ff";

  return (
    <div style={{
      minHeight: "92vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(165deg, ${bg} 0%, #ffffff 100%)`,
      transition: "background .7s ease", padding: "1rem",
    }}>
      {!isChoice && (
        <div style={{ display: "flex", gap: ".4rem", marginBottom: "1.2rem" }}>
          {SLIDES.map((_, i) => (
            <span key={i} style={{ width: i === step ? 26 : 10, height: 10, borderRadius: 99, background: i === step ? "#38bdf8" : "#cbd5e1", transition: "all .35s" }} />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait" initial={false} custom={dir}>
        {!isChoice ? (
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)", x: 140, rotate: 2 }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)", x: 0, rotate: 0 }}
            exit={{ opacity: 0, clipPath: "inset(0 0 0 100%)", x: -120, rotate: -2 }}
            transition={{ type: "spring", stiffness: 230, damping: 27 }}
            style={{ maxWidth: 640, width: "100%", background: "#fff", borderRadius: 26, border: "2px solid #e2e8f0", padding: "1.6rem 1.8rem", boxShadow: "0 14px 40px rgba(2,132,199,.18)", textAlign: "center" }}
          >
            <div style={{ fontSize: "3.2rem", lineHeight: 1 }}>{current.emoji}</div>
            <h1 style={{ margin: ".4rem 0 .1rem", fontSize: "1.7rem", color: "#0c4a6e" }}>{current.title}</h1>
            <p style={{ color: "#0369a1", fontWeight: 800, margin: ".2rem 0 .7rem", fontSize: ".95rem" }}>“{current.analogi}”</p>
            <p style={{ color: "#334155", lineHeight: 1.7, margin: 0 }}>{current.text}</p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.2rem" }}>
              <button className="btn" onClick={skipAll}>⏭️ Lewati Dasar</button>
              <span style={{ fontSize: ".72rem", color: "#64748b" }}>{step + 1} / {SLIDES.length}</span>
              <button className="done-btn" onClick={next}>{step === SLIDES.length - 1 ? "Selesai ➡️" : "Lanjut ➡️"}</button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="choice"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            style={{ maxWidth: 620, width: "100%", background: "#fff", borderRadius: 26, border: "2px solid #e2e8f0", padding: "1.6rem 1.8rem", boxShadow: "0 14px 40px rgba(2,132,199,.18)", textAlign: "center" }}
          >
            <div style={{ fontSize: "3.2rem" }}>🎉</div>
            <h1 style={{ margin: ".3rem 0 .2rem", fontSize: "1.5rem", color: "#0c4a6e" }}>Kamu sudah paham dasarnya!</h1>
            <p style={{ color: "#64748b", margin: "0 0 1.1rem" }}>Mau langsung belajar di Beranda, atau perdalam bab dasar dulu?</p>
            <div style={{ display: "flex", gap: ".7rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button className="done-btn" style={{ fontSize: "1rem", padding: ".8rem 1.4rem" }} onClick={() => onDone("home")}>🏠 Ke Beranda</button>
              <button className="pill active" style={{ fontSize: "1rem", padding: ".8rem 1.4rem", textDecoration: "none" }} onClick={() => onDone("dasar")}>📚 Pelajari Bab Dasar</button>
            </div>
            <p style={{ fontSize: ".7rem", color: "#94a3b8", marginTop: ".9rem" }}>Bab dasar bisa dibuka kapan pun lewat menu “Dasar”.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
