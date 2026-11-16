import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cubby from "../components/Cubby.jsx";
import { getMistakes, removeMistake, clearMistakes } from "../lib/mistakes.js";
import { playCorrect, playWrong } from "../lib/sounds.js";

export default function Kesalahan() {
  const [list, setList] = useState(getMistakes());
  const [answers, setAnswers] = useState({});

  const answer = (m, j) => {
    if (answers[m.q] !== undefined) return;
    const ok = j === m.answer;
    (ok ? playCorrect : playWrong)();
    setAnswers({ ...answers, [m.q]: j });
    if (ok) {
      setTimeout(() => { removeMistake(m.q); setList(getMistakes()); }, 1200);
    }
  };

  if (list.length === 0) {
    return (
      <div className="panel" style={{ textAlign: "center" }}>
        <Cubby size={130} />
        <h2 style={{ marginTop: ".4rem" }}>📓 Buku Kesalahan Kosong</h2>
        <p style={{ color: "#64748b" }}>Belum ada soal yang kamu jawab salah — atau kamu sudah menghabisi semuanya. Hebat! 🎉</p>
        <Link to="/kuis" className="pill active" style={{ display: "inline-block", textDecoration: "none", marginTop: ".5rem" }}>🧠 Uji Lagi di Kuis</Link>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="breadcrumb">🏠 Beranda › <b>Buku Kesalahan</b></div>
      <h2 style={{ marginTop: 0 }}><span className="title-underline">📓 Buku Kesalahan ({list.length})</span></h2>
      <p style={{ fontSize: ".85rem", color: "#0369a1" }}>Soal-soal yang pernah kamu jawab salah. Jawab benar untuk menghapusnya dari buku — semakin sedikit, semakin paham kamu!</p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".5rem", flexWrap: "wrap", marginBottom: ".8rem" }}>
        <span style={{ fontSize: ".75rem", color: "#64748b" }}>Jawab benar → soal otomatis dihapus dari buku.</span>
        <button className="btn danger" onClick={() => { if (window.confirm("Hapus SEMUA catatan kesalahan?")) { clearMistakes(); setList([]); } }}>🗑️ Kosongkan Buku</button>
      </div>

      {list.map((m) => (
        <div key={m.q} style={{ background: "#fffbeb", border: "2px solid #fde68a", borderRadius: 14, padding: ".6rem .8rem", marginBottom: ".6rem" }}>
          <div style={{ fontWeight: 700, fontSize: ".85rem" }}>
            {m.tag && <span className="chip" style={{ fontSize: ".65rem", padding: ".1rem .4rem", marginRight: ".4rem" }}>{m.tag}</span>}
            <span style={{ fontSize: ".65rem", color: "#b45309", textTransform: "uppercase" }}>{m.source}</span>
            <div style={{ marginTop: ".25rem" }}>{m.q}</div>
          </div>
          {m.options.map((opt, j) => {
            const chosen = answers[m.q];
            let cls = "quiz-opt";
            if (chosen !== undefined) {
              if (j === m.answer) cls += " correct";
              else if (j === chosen) cls += " wrong";
            }
            return (
              <button key={j} className={cls} style={{ fontSize: ".8rem", padding: ".4rem .7rem" }} onClick={() => answer(m, j)}>
                {opt}
              </button>
            );
          })}
          {answers[m.q] !== undefined && answers[m.q] === m.answer && (
            <div style={{ fontSize: ".78rem", color: "#15803d", fontWeight: 700, marginTop: ".3rem" }}>✅ Benar! Menghapus dari buku…</div>
          )}
        </div>
      ))}
    </div>
  );
}
