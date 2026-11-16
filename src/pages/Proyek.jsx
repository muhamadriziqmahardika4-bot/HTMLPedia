import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProgress } from "../hooks/useProgress.js";
import { ALL_ORDERED } from "../data/all.js";
import Cubby from "../components/Cubby.jsx";

const KEY = "htmlpedia-projects";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; } };

const PROJECTS = [
  {
    id: "biodata",
    emoji: "🧍",
    name: "Halaman Biodata",
    need: 5,
    tag: "HTML",
    desc: "Buat halaman yang menceritakan dirimu: nama, foto (emoji boleh!), hobi, dan link media sosial.",
    checklist: [
      "Ada 1 <h1> dengan nama kamu",
      "Ada foto/emoji profil besar",
      "Ada <ul> daftar hobi minimal 3",
      "Ada <a> ke Instagram kamu (target _blank)",
      "Ada <p> perkenalan singkat",
    ],
    hint: "Ingat: <img src='...' alt='...'> dan <a target='_blank'>.",
  },
  {
    id: "jadwal",
    emoji: "📅",
    name: "Jadwal Pelajaran",
    need: 20,
    tag: "HTML + CSS",
    desc: "Buat tabel jadwal sekolah minggu ini. Boleh lucu, boleh rapi — yang penting semua terbaca dan berwarna.",
    checklist: [
      "Pakai <table> + <thead> + <tbody>",
      "Ada <th scope='col'> untuk kolom",
      "Warna header berbeda (CSS)",
      "border-radius di tabel (CSS)",
      "Baris disorot saat disentuh mouse (:hover)",
    ],
    hint: "Ingat: <table>, <th scope='col'>, border-collapse: collapse; hover: tr:hover { background: … }",
  },
  {
    id: "kuis",
    emoji: "⚡",
    name: "Kuis Interaktif",
    need: 50,
    tag: "JavaScript",
    desc: "Buat kuis 3 pertanyaan pilihan ganda yang menampilkan skor akhir. Ini puncak belajar kamu — menulis logika sendiri!",
    checklist: [
      "HTML punya 3 pertanyaan + <button> jawaban",
      "JS ambil elemen dengan querySelector",
      "addEventListener('click', …) di tiap tombol",
      "if/else cek jawaban benar/salah",
      "Skor akhir ditampilkan di halaman",
    ],
    hint: "querySelector('.btn'), addEventListener('click', handler), let skor = 0; if (benar) skor++.",
  },
];

export default function Proyek() {
  const { done } = useProgress(ALL_ORDERED.length);
  const [checked, setChecked] = useState(load);
  const toggle = (id, idx) => {
    setChecked((prev) => {
      const cur = prev[id] ? [...prev[id]] : [];
      const next = cur.includes(idx) ? cur.filter((i) => i !== idx) : [...cur, idx];
      const out = { ...prev, [id]: next };
      try { localStorage.setItem(KEY, JSON.stringify(out)); } catch { /* abaikan */ }
      return out;
    });
  };

  const doneSet = new Set(done);
  const doneCount = doneSet.size;

  return (
    <div className="panel">
      <div className="breadcrumb">🏠 Beranda › <b>Proyek Mini</b></div>
      <h2 style={{ marginTop: 0 }}><span className="title-underline">🏗️ Proyek Mini</span></h2>
      <p style={{ fontSize: ".85rem", color: "#0369a1" }}>Belajar sambil membuat sesuatu yang nyata. Selesaikan checklist-nya satu-satu — hasilnya kamu yang miliki. Proyek terbuka otomatis saat kamu cukup menyelesaikan materi.</p>

      {PROJECTS.map((p) => {
        const unlocked = doneCount >= p.need;
        const got = checked[p.id] || [];
        const pct = p.checklist.length ? Math.round((got.length / p.checklist.length) * 100) : 0;
        return (
          <div key={p.id} style={{
            border: `3px solid ${unlocked ? "#a78bfa" : "#e2e8f0"}`,
            background: unlocked ? "#faf5ff" : "#f8fafc",
            borderRadius: 20, padding: "1rem 1.2rem", marginBottom: "1rem",
            opacity: unlocked ? 1 : 0.75,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".7rem", flexWrap: "wrap" }}>
              <div style={{ fontSize: "2.2rem" }}>{p.emoji}</div>
              <div>
                <div style={{ fontWeight: 900, color: "#0c4a6e" }}>{p.name} <span style={{ fontSize: ".65rem", background: "#ede9fe", color: "#6d28d9", borderRadius: 6, padding: ".1rem .4rem", verticalAlign: "middle" }}>{p.tag}</span></div>
                <div style={{ fontSize: ".72rem", color: "#64748b" }}>{unlocked ? "Terbuka ✓" : `🔒 Butuh ${p.need} materi selesai (kamu: ${doneCount})`}</div>
              </div>
              {unlocked && <div style={{ marginLeft: "auto", fontWeight: 800, color: pct === 100 ? "#15803d" : "#6d28d9" }}>{pct === 100 ? "Tuntas! 🎉" : `${pct}%`}</div>}
            </div>

            {unlocked && (
              <>
                <p style={{ fontSize: ".85rem", color: "#334155", margin: ".5rem 0" }}>{p.desc}</p>
                <div style={{ fontSize: ".78rem", color: "#4f46e5", marginBottom: ".5rem" }}>💡 {p.hint}</div>
                {p.checklist.map((c, i) => (
                  <label key={i} style={{ display: "flex", alignItems: "center", gap: ".45rem", fontSize: ".82rem", padding: ".22rem 0", cursor: "pointer", color: got.includes(i) ? "#15803d" : "#475569" }}>
                    <input type="checkbox" checked={got.includes(i)} onChange={() => toggle(p.id, i)} />
                    <span style={{ textDecoration: got.includes(i) ? "line-through" : "none" }}>{c}</span>
                  </label>
                ))}
                <div style={{ marginTop: ".6rem" }}>
                  <a className="btn primary" href="https://codepen.io/pen/" target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "inline-block" }}>💻 Buka di CodePen — mulai buat!</a>
                </div>
              </>
            )}
          </div>
        );
      })}

      <p style={{ fontSize: ".72rem", color: "#64748b", textAlign: "center", marginTop: "1rem" }}>Proyek bawa kamu dari "tahu tag" ke "bisa membuat". Kerjakan berurutan — biodata dulu, baru jadwal, baru kuis.</p>
    </div>
  );
}
