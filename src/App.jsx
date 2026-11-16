import React, { useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FloatingShapes from "./components/FloatingShapes.jsx";
import CandySweep from "./components/CandySweep.jsx";
import Splash from "./pages/Splash.jsx";
import IntroBasics from "./pages/IntroBasics.jsx";
import { startBgm, stopBgm, getBgmState, TRACKS } from "./lib/bgm.js";
import { playClick } from "./lib/sounds.js";
import Home from "./pages/Home.jsx";
import Resources from "./pages/Resources.jsx";
import About from "./pages/About.jsx";
import Basics from "./pages/Basics.jsx";
import BasicsDetail from "./pages/BasicsDetail.jsx";
import TagIndex from "./pages/TagIndex.jsx";
import TagDetail from "./pages/TagDetail.jsx";
import Quiz from "./pages/Quiz.jsx";

function Navbar() {
  const [bgmState, setBgmState] = useState(() => getBgmState());
  return (
    <nav className="nav">
      <Link to="/" className="logo" style={{ textDecoration: "none" }} onClick={playClick}>🍡 HTMLpedia</Link>
      <div className="nav-pills">
        <NavLink to="/" end onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Beranda</NavLink>
        <NavLink to="/tag" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Tag</NavLink>
        <NavLink to="/dasar" onClick={playClick}
          className="pill"
          style={{ background: "linear-gradient(135deg,#fda4af,#f472b6)", border: "none", color: "#fff", boxShadow: "0 4px 0 #ec4899", fontWeight: 800 }}>
          📚 Bab Dasar
        </NavLink>
        <NavLink to="/kuis" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Kuis</NavLink>
        <NavLink to="/sumber" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>📺 Sumber</NavLink>
        <NavLink to="/tentang" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>👨‍💻 Tentang</NavLink>
        <select
          aria-label="Pilih musik belajar"
          value={bgmState.enabled ? String(bgmState.track) : "off"}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "off") { stopBgm(); setBgmState({ enabled: false, track: 0 }); }
            else { const idx = Number(v); startBgm(idx); setBgmState({ enabled: true, track: idx }); }
          }}
          style={{
            fontSize: ".78rem", fontWeight: 800, color: "#0369a1", background: "#fff",
            border: "2px solid var(--border)", borderRadius: 999, padding: ".3rem .7rem",
            cursor: "pointer", fontFamily: "inherit",
          }}
        >
          <option value="off">🔇 Musik: Off</option>
          {TRACKS.map((t, i) => <option key={i} value={String(i)}>{t.name}</option>)}
        </select>
      </div>
    </nav>
  );
}

function NotFound() {
  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <div style={{ fontSize: "3rem" }}>🤖</div>
      <h2>Halaman tidak ditemukan</h2>
      <p style={{ color: "#64748b" }}>Cubby tidak menemukan alamat itu. Coba kembali ke beranda.</p>
      <Link to="/" className="pill active" style={{ display: "inline-block", textDecoration: "none" }}>🏠 Kembali ke Beranda</Link>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <CandySweep key={`sweep-${location.pathname}`} />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)", x: 120, scale: 0.96 }}
        animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)", x: 0, scale: 1 }}
        exit={{ opacity: 0, clipPath: "inset(0 0 0 100%)", x: -90, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 210, damping: 26, mass: 0.9 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/kuis" element={<Quiz />} />
          <Route path="/tag" element={<TagIndex />} />
          <Route path="/tag/:slug" element={<TagDetail />} />
          <Route path="/dasar" element={<Basics />} />
          <Route path="/dasar/:slug" element={<BasicsDetail />} />
          <Route path="/sumber" element={<Resources />} />
          <Route path="/tentang" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  const [stage, setStage] = useState("splash");   // splash → intro → app
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();

  const start = () => {
    setLeaving(true);
    setTimeout(() => setStage("intro"), 1100);
  };

  const introDone = (target) => {
    const s = getBgmState();
    // Mulai musik otomatis hanya jika belum pernah dimatikan
    if (localStorage.getItem("htmlpedia-bgm") !== "off") startBgm(s.track ?? 0);
    setStage("app");
    if (target === "dasar") setTimeout(() => navigate("/dasar"), 60);
  };

  return (
    <>
      <FloatingShapes />
      <AnimatePresence mode="wait" initial={false}>
      {stage === "splash" && (
        <motion.div key="splash" exit={{ opacity: 0, clipPath: "inset(0 0 0 100%)", x: -140, scale: 0.92, filter: "blur(6px)", transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}>
          <div className="app splash-screen">
            <FloatingShapes />
            <Splash onStart={start} leaving={leaving} />
          </div>
        </motion.div>
      )}

      {stage === "intro" && (
        <motion.div key="intro"
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)", x: 160, scale: 0.94 }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)", x: 0, scale: 1 }}
          exit={{ opacity: 0, clipPath: "inset(0 0 0 100%)", x: -140, filter: "blur(6px)", transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] } }}
          transition={{ type: "spring", stiffness: 210, damping: 26 }}
          className="app" style={{ padding: 0, maxWidth: "none" }}
        >
          <CandySweep key="intro-sweep" />
          <IntroBasics onDone={introDone} />
        </motion.div>
      )}

      {stage === "app" && (
        <motion.div key="app"
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)", x: 160, scale: 0.94 }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)", x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 210, damping: 26 }}
          className="app app-root"
        >
          <Navbar />
          <AnimatedRoutes />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

