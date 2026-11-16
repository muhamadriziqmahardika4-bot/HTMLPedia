import React, { useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FloatingShapes from "./components/FloatingShapes.jsx";
import CandySweep from "./components/CandySweep.jsx";
import Splash from "./pages/Splash.jsx";
import IntroBasics from "./pages/IntroBasics.jsx";
import { startBgm, stopBgm, bgmEnabled } from "./lib/bgm.js";
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
  const [bgm, setBgm] = useState(() => bgmEnabled());
  return (
    <nav className="nav">
      <Link to="/" className="logo" style={{ textDecoration: "none" }} onClick={playClick}>🍡 HTMLpedia</Link>
      <div className="nav-pills">
        <NavLink to="/" end onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Beranda</NavLink>
        <NavLink to="/tag" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Tag</NavLink>
        <NavLink to="/dasar" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Dasar</NavLink>
        <NavLink to="/kuis" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Kuis</NavLink>
        <NavLink to="/sumber" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>📺 Sumber</NavLink>
        <NavLink to="/tentang" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>👨‍💻 Tentang</NavLink>
        <button
          className="pill"
          aria-pressed={bgm}
          title={bgm ? "Matikan musik belajar" : "Nyalakan musik belajar"}
          onClick={() => { const next = bgm ? (stopBgm(), false) : (startBgm(), true); setBgm(Boolean(next)); }}
          style={{ fontSize: ".85rem" }}
        >
          {bgm ? "🎵 Musik: On" : "🔇 Musik: Off"}
        </button>
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
    startBgm();           // musik belajar menyala begitu masuk aplikasi
    setStage("app");
    if (target === "dasar") setTimeout(() => navigate("/dasar"), 60);
  };

  if (stage === "splash") {
    return (
      <div className="app splash-screen">
        <FloatingShapes />
        <Splash onStart={start} leaving={leaving} />
      </div>
    );
  }

  if (stage === "intro") {
    return (
      <div className="app" style={{ padding: 0, maxWidth: "none" }}>
        <IntroBasics onDone={introDone} />
      </div>
    );
  }

  return (
    <>
      <FloatingShapes />
      <div className="app">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </>
  );
}

