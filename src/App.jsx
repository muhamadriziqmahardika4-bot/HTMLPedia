import React, { useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FloatingShapes from "./components/FloatingShapes.jsx";
import Splash from "./pages/Splash.jsx";
import Home from "./pages/Home.jsx";
import Resources from "./pages/Resources.jsx";
import About from "./pages/About.jsx";
import Basics from "./pages/Basics.jsx";
import BasicsDetail from "./pages/BasicsDetail.jsx";
import TagIndex from "./pages/TagIndex.jsx";
import TagDetail from "./pages/TagDetail.jsx";
import Quiz from "./pages/Quiz.jsx";

function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="logo" style={{ textDecoration: "none" }}>🍡 HTMLpedia</Link>
      <div className="nav-pills">
        <NavLink to="/" end className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Beranda</NavLink>
        <NavLink to="/tag" className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Tag</NavLink>
        <NavLink to="/dasar" className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Dasar</NavLink>
        <NavLink to="/kuis" className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Kuis</NavLink>
        <NavLink to="/sumber" className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>📺 Sumber</NavLink>
        <NavLink to="/tentang" className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>👨‍💻 Tentang</NavLink>
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
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, x: 64, filter: "blur(6px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -48, filter: "blur(6px)" }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
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
  const [started, setStarted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const start = () => {
    setLeaving(true);
    setTimeout(() => setStarted(true), 1100);
  };

  if (!started) {
    return (
      <div className="app splash-screen">
        <FloatingShapes />
        <Splash onStart={start} leaving={leaving} />
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
