import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FloatingShapes from "./components/FloatingShapes.jsx";
import UpdateChecker from "./components/UpdateChecker.jsx";
import KesalahanCount from "./components/KesalahanCount.jsx";
import Splash from "./pages/Splash.jsx";
import IntroBasics from "./pages/IntroBasics.jsx";
import BgmPlayer from "./components/BgmPlayer.jsx";
import FloatingMusicButton from "./components/FloatingMusicButton.jsx";
import { playClick } from "./lib/sounds.js";
import { useAuth } from "./hooks/useAuth.js";
import { pullMergePush } from "./lib/progressSync.js";
import { getProfile, touchLastSeen } from "./lib/profiles.js";
import { isSupabaseConfigured, supabase } from "./lib/supabase.js";
import Login, { LoadingScreen, NotConfiguredScreen } from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Anggota from "./pages/Anggota.jsx";
import Saran from "./pages/Saran.jsx";
import SaranAdmin from "./pages/SaranAdmin.jsx";
import Ngoding from "./pages/Ngoding.jsx";
import Profile from "./pages/Profile.jsx";
import Privasi from "./pages/Privasi.jsx";
import Syarat from "./pages/Syarat.jsx";
import Home from "./pages/Home.jsx";
import Resources from "./pages/Resources.jsx";
import About from "./pages/About.jsx";
import Basics from "./pages/Basics.jsx";
import BasicsDetail from "./pages/BasicsDetail.jsx";
import TagIndex from "./pages/TagIndex.jsx";
import TagDetail from "./pages/TagDetail.jsx";
import Quiz from "./pages/Quiz.jsx";
import Review from "./pages/Review.jsx";
import Kesalahan from "./pages/Kesalahan.jsx";
import Proyek from "./pages/Proyek.jsx";

function Navbar({ bgmOn, onToggleBgm, userEmail, onLogout, isOwner }) {
  return (
    <nav className="nav">
      <Link to="/" className="logo text-shimmer" style={{ textDecoration: "none" }} onClick={playClick}>🍡 HTMLpedia</Link>
      <div className="nav-pills">
        <NavLink to="/" end onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Beranda</NavLink>
        <NavLink to="/tag" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Tag</NavLink>
        <NavLink to="/dasar" onClick={playClick}
          className="pill"
          style={{ background: "linear-gradient(135deg,#fda4af,#f472b6)", border: "none", color: "#fff", boxShadow: "0 4px 0 #ec4899", fontWeight: 800 }}>
          📚 Bab Dasar
        </NavLink>
        <NavLink to="/kuis" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Kuis</NavLink>
        <NavLink to="/kesalahan" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>📓 Kesalahan<KesalahanCount /></NavLink>
        <NavLink to="/sumber" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>📺 Sumber</NavLink>
        <NavLink to="/ngoding" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>🧪 Ngoding</NavLink>
        <NavLink to="/saran" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>💬 Saran</NavLink>
        <NavLink to="/profil" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>👤 Profil</NavLink>
        {isOwner && (
          <NavLink to="/anggota" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>👥 Anggota</NavLink>
        )}
        <NavLink to="/tentang" onClick={playClick} className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>👨‍💻 Tentang</NavLink>
        <button
          className="pill"
          aria-pressed={bgmOn}
          title={bgmOn ? "Matikan musik" : "Nyalakan musik"}
          onClick={() => { onToggleBgm(); playClick(); }}
          style={{ fontSize: ".85rem" }}
        >
          {bgmOn ? "🎵 Musik: On" : "🔇 Musik: Off"}
        </button>
        <button
          className="pill"
          title={userEmail ? `Keluar dari ${userEmail}` : "Keluar"}
          onClick={onLogout}
          style={{ fontSize: ".78rem" }}
        >
          🚪 Keluar
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
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/kuis" element={<Quiz />} />
          <Route path="/review" element={<Review />} />
          <Route path="/kesalahan" element={<Kesalahan />} />
          <Route path="/proyek" element={<Proyek />} />
          <Route path="/tag" element={<TagIndex />} />
          <Route path="/tag/:slug" element={<TagDetail />} />
          <Route path="/dasar" element={<Basics />} />
          <Route path="/dasar/:slug" element={<BasicsDetail />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/anggota" element={<Anggota />} />
          <Route path="/saran" element={<Saran />} />
          <Route path="/saran/daftar" element={<SaranAdmin />} />
          <Route path="/ngoding" element={<Ngoding />} />
          <Route path="/privasi" element={<Privasi />} />
          <Route path="/syarat-ketentuan" element={<Syarat />} />
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
  const navigate = useNavigate();
  const location = useLocation();

  const start = () => setStage("intro");                 // MULAI → penjelasan singkat dulu

  const introDone = (target) => {
    setStage("app");
    if (target === "dasar") setTimeout(() => navigate("/dasar"), 60);
  };

  const [bgmOn, setBgmOn] = useState(() => localStorage.getItem("htmlpedia-bgm") !== "off");

  // ===== Auth wajib + progress tersimpan di akun =====
  const { session, user, loading: authLoading, isOwner } = useAuth();
  const [synced, setSynced] = useState(false);
  const userId = session?.user?.id ?? null;

  useEffect(() => {
    if (!userId) return;
    touchLastSeen(userId);
  }, [userId]);

  useEffect(() => {
    if (!userId) { setSynced(false); return; }
    let alive = true;
    pullMergePush().finally(() => { if (alive) setSynced(true); });
    return () => { alive = false; };
  }, [userId]);

  // Sudah login → buka situs langsung ke tampilan thumbnail (splash) seperti biasa

  // Pengguna baru (belum punya profil) → langsung ke /profil untuk onboarding
  useEffect(() => {
    if (!userId || !synced) return;
    getProfile(userId).then((p) => { if (!p) navigate("/profil"); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, synced]);

  const toggleBgm = () => {
    const next = !bgmOn;
    localStorage.setItem("htmlpedia-bgm", next ? "on" : "off");
    setBgmOn(next);
  };

  const logout = async () => {
    playClick();
    try { await supabase?.auth.signOut(); } catch { /* abaikan */ }
    setStage("splash");
  };

  // Gerbang wajib login — jangan render app sebelum session + sinkron selesai
  if (!isSupabaseConfigured) return <NotConfiguredScreen />;
  if (authLoading || (session && !synced)) return <LoadingScreen />;
  if (!session) {
    if (location.pathname === "/daftar") return <Register />;
    if (location.pathname === "/privasi") return <Privasi />;
    if (location.pathname === "/syarat-ketentuan") return <Syarat />;
    return <Login />;
  }

  return (
    <>
      {bgmOn && <BgmPlayer />}
      <FloatingMusicButton bgmOn={bgmOn} onToggleBgm={toggleBgm} />
      <FloatingShapes />
      <UpdateChecker />
      <AnimatePresence mode="wait" initial={false}>
      {stage === "splash" && (
        <motion.div key="splash" exit={{ opacity: 0, transition: { duration: 0.22, ease: "easeOut" } }}>
          <div className="app splash-screen">
            <Splash onStart={start} />
          </div>
        </motion.div>
      )}

      {stage === "intro" && (
        <motion.div key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.22, ease: "easeOut" } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="intro-root"
        >
          <IntroBasics onDone={introDone} />
        </motion.div>
      )}

      {stage === "app" && (
        <motion.div key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="app app-root"
        >
          <Navbar bgmOn={bgmOn} onToggleBgm={toggleBgm} userEmail={user?.email} onLogout={logout} isOwner={isOwner} />
          <AnimatedRoutes />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

