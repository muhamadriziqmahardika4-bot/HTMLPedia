import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { ALL_ORDERED } from "../data/all.js";
import { useProgress } from "../hooks/useProgress.js";
import { buildQuestionsForStage } from "../lib/reviewBank.js";
import Cubby from "../components/Cubby.jsx";
import { playCorrect, playWrong, playFinish } from "../lib/sounds.js";
import { addMistake } from "../lib/mistakes.js";

const MIN_TAGS = 5;
const Q_PER_STAGE = 5;
const PASS_NEEDED = 3; // minimal benar 3 dari 5 untuk lanjut

const STAGE_INFO = [
  { n: 1, name: "Dasar", emoji: "🌱", desc: "Kenali tag & kegunaannya" },
  { n: 2, name: "Fungsi", emoji: "🔍", desc: "Pahami fungsi tiap atribut" },
  { n: 3, name: "Tentukan & Lengkapi", emoji: "🔧", desc: "Tentukan pernyataan mana yang benar" },
];

function pickRandom(arr, n) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

export default function Review() {
  const navigate = useNavigate();
  const { done } = useProgress(ALL_ORDERED.length);
  const doneSet = useMemo(() => new Set(done), [done]);
  const pool = useMemo(() => ALL_ORDERED.filter((t) => doneSet.has(t.slug)), [doneSet]);

  const [run, setRun] = useState(0);          // pemicu reshuffle
  const [stage, setStage] = useState(1);      // tahap sekarang
  const [answers, setAnswers] = useState({}); // jawaban per soal di tahap ini
  const [stageResults, setStageResults] = useState({}); // hasil per tahap
  const [finishedAll, setFinishedAll] = useState(false);

  // 5 materi acak dipakai untuk KETIGA tahap — drill dalam 3 tingkat
  const picked = useMemo(() => pickRandom(pool, Math.min(pool.length, Q_PER_STAGE)), [run, pool]);
  const questions = useMemo(() => buildQuestionsForStage(stage, picked, ALL_ORDERED), [stage, picked]);

  const answered = Object.keys(answers).length;
  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  const stageDone = questions.length > 0 && answered === questions.length;
  const stagePassed = stageDone && score >= PASS_NEEDED;

  useEffect(() => {
    if (stageDone && !stageResults[stage]) {
      setStageResults((r) => ({ ...r, [stage]: { score, total: questions.length, passed: stagePassed } }));
      if (stagePassed) confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ["#38bdf8", "#818cf8", "#22d3ee", "#fde68a"] });
      playFinish(stagePassed);
    }
  }, [stageDone, stageResults, stage, score, questions.length, stagePassed]);

  const resetAll = () => {
    setStage(1);
    setAnswers({});
    setStageResults({});
    setFinishedAll(false);
    setRun((r) => r + 1);
  };

  const nextStage = () => {
    setStage((s) => Math.min(3, s + 1));
    setAnswers({});
  };

  if (pool.length < MIN_TAGS) {
    return (
      <div className="panel" style={{ textAlign: "center" }}>
        <Cubby size={120} />
        <h2 style={{ marginTop: ".5rem" }}>🔒 Review Kilat Terkunci</h2>
        <p style={{ color: "#64748b" }}>Selesaikan minimal <b>{MIN_TAGS} materi</b> dulu untuk membuka Review Kilat.</p>
        <p style={{ color: "#0369a1", fontWeight: 800 }}>Progresmu sekarang: {done.length} / {MIN_TAGS} — ayo sedikit lagi!</p>
        <div className="progress" style={{ maxWidth: 320, margin: "0 auto" }}><div style={{ width: `${Math.min(100, (done.length / MIN_TAGS) * 100)}%` }} /></div>
        <div style={{ marginTop: "1rem" }}><button className="btn primary" onClick={() => navigate("/tag")}>📚 Pelajari Tag Dulu</button></div>
      </div>
    );
  }

  const totalScore = Object.entries(stageResults).reduce((acc, [, r]) => acc + r.score, 0);
  const totalQ = Object.values(stageResults).reduce((acc, r) => acc + r.total, 0);

  return (
    <div className="panel">
      <div className="breadcrumb">🏠 Beranda › <b>Review Kilat</b> › Tahap {stage}: {STAGE_INFO[stage - 1].name}</div>
      <h2 style={{ marginTop: 0 }}><span className="title-underline">⚡ Review Kilat — 3 Tahap</span></h2>
      <p style={{ fontSize: ".82rem", color: "#0369a1" }}>Naik bertahap: Dasar → Fungsi → Tentukan &amp; Lengkapi. Lulus tiap tahap untuk membuka berikutnya!</p>

      {/* Stepper tahap */}
      <div style={{ display: "flex", gap: ".4rem", margin: ".6rem 0 1rem", flexWrap: "wrap" }}>
        {STAGE_INFO.map((s) => {
          const doneStage = stageResults[s.n]?.passed;
          const active = stage === s.n;
          return (
            <div key={s.n} style={{
              display: "flex", alignItems: "center", gap: ".4rem",
              border: `2px solid ${doneStage ? "#86efac" : active ? "#38bdf8" : "#e2e8f0"}`,
              background: doneStage ? "#dcfce7" : active ? "#e0f2fe" : "#f8fafc",
              borderRadius: 12, padding: ".35rem .6rem",
            }}>
              <span style={{ fontWeight: 900, color: doneStage ? "#15803d" : active ? "#0369a1" : "#94a3b8" }}>{doneStage ? "✓" : s.n}</span>
              <div style={{ lineHeight: 1.15 }}>
                <div style={{ fontSize: ".72rem", fontWeight: 800, color: "#0c4a6e" }}>{s.emoji} {s.name}</div>
                <div style={{ fontSize: ".6rem", color: "#64748b" }}>{s.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pertanyaan tahap ini */}
      {!finishedAll && questions.map((item, i) => (
        <div key={i} style={{ marginBottom: ".8rem" }}>
          <div style={{ fontWeight: 700, fontSize: ".85rem" }}>
            <span className="chip" style={{ fontSize: ".65rem", padding: ".1rem .45rem", marginRight: ".4rem" }}>{item.tag}</span>
            {i + 1}. {item.q}
          </div>
          {item.options.map((opt, j) => {
            const chosen = answers[i];
            let cls = "quiz-opt";
            if (chosen !== undefined) {
              if (j === item.answer) cls += " correct";
              else if (j === chosen) cls += " wrong";
            }
            return (
              <button key={j} className={cls}
                onClick={() => {
                  if (answers[i] !== undefined) return;
                  const ok = j === item.answer;
                  (ok ? playCorrect : playWrong)();
                  if (!ok) addMistake({ q: item.q, options: item.options, answer: item.answer, picked: j, source: "review", tag: item.tag });
                  setAnswers({ ...answers, [i]: j });
                }}>
                {opt}
              </button>
            );
          })}
        </div>
      ))}

      {/* Hasil tahap / naik / tamat */}
      {stageDone && !finishedAll && (
        <div style={{ textAlign: "center", marginTop: ".6rem" }}>
          {stagePassed ? (
            <>
              <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#15803d" }}>✅ Tahap {stage} Lulus! ({score}/{questions.length})</div>
              {stage < 3
                ? <button className="btn primary" style={{ fontSize: ".95rem", padding: ".6rem 1.4rem", marginTop: ".4rem" }} onClick={nextStage}>➡️ Lanjut ke Tahap {stage + 1}: {STAGE_INFO[stage].name}</button>
                : <button className="btn primary" style={{ fontSize: ".95rem", padding: ".6rem 1.4rem", marginTop: ".4rem" }} onClick={() => { setFinishedAll(true); confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 }, colors: ["#f472b6", "#fde047", "#38bdf8", "#a78bfa", "#86efac"] }); }}>🏁 Lihat Hasil Akhir</button>}
            </>
          ) : (
            <>
              <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#b91c1c" }}>😅 Tahap {stage} Belum Lulus ({score}/{questions.length})</div>
              <p style={{ color: "#64748b", margin: ".3rem 0" }}>Minimal 3 jawaban benar untuk lanjut. Pelajari materinya lagi!</p>
              <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
                <button className="btn primary" onClick={() => setAnswers({})}>🔄 Ulangi Tahap {stage}</button>
                <button className="btn" onClick={() => navigate(`/tag`)}>📚 Pelajari Lagi</button>
              </div>
            </>
          )}
        </div>
      )}

      {finishedAll && (
        <div className="confetti" style={{ background: "#dcfce7", textAlign: "center" }}>
          <div style={{ fontSize: "2.6rem" }}>🏆</div>
          <h3 style={{ margin: ".2rem 0" }}>Review Kilat Selesai!</h3>
          <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#15803d" }}>Total skor kamu: {totalScore}/{totalQ}</p>
          <p style={{ color: "#334155" }}>Kamu berhasil melewati ke-3 tahap: Dasar, Fungsi, dan Tentukan &amp; Lengkapi. Memori kamu tajam! ⚡</p>
          <div style={{ marginTop: ".6rem", display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn primary" onClick={resetAll}>🔄 Review Lagi</button>
            <button className="btn" onClick={() => navigate("/")}>🏠 Kembali ke Beranda</button>
          </div>
        </div>
      )}
    </div>
  );
}
