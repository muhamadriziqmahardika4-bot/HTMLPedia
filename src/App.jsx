import React from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="logo" style={{ textDecoration: "none" }}>🍡 HTMLpedia</Link>
      <div className="nav-pills">
        <NavLink to="/" end className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Beranda</NavLink>
        <NavLink to="/kuis" className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>Kuis</NavLink>
        <NavLink to="/sumber" className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>📺 Sumber</NavLink>
        <NavLink to="/tentang" className={({ isActive }) => `pill ${isActive ? "active" : ""}`}>👨‍💻 Tentang</NavLink>
      </div>
    </nav>
  );
}

function Placeholder({ title }) {
  return <div className="panel"><h1>{title}</h1></div>;
}

export default function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Placeholder title="🍡 HTMLpedia — segera: beranda" />} />
          <Route path="/kuis" element={<Placeholder title="Kuis" />} />
          <Route path="/sumber" element={<Placeholder title="Sumber Belajar" />} />
          <Route path="/tentang" element={<Placeholder title="Tentang Developer" />} />
        </Routes>
      </div>
    </>
  );
}

