import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { ALL_ORDERED } from "../data/all.js";
import { questionsForEntry } from "../data/quizzes.js";
import { useProgress } from "../hooks/useProgress.js";
import Cubby from "../components/Cubby.jsx";
import { playCorrect, playWrong, playFinish } from "../lib/sounds.js";

const MIN_TAGS = 5;
const QUESTIONS_PER_TAG = 1;

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
  const [run, setRun] = useState(0);
  const [answers, setAnswers] = useState({});

  const doneSet = useMemo(() => new Set(done), [done]);
  const pool = useMemo(() => ALL_ORDERED.filter((t) => doneSet.has(t.slug)), [doneSet]);

  const questions = useMemo(
    () =>
      pickRandom(pool, Math.min(pool.length, 5)).map((entry) => {
        const tagQ = questionsForEntry(entry);
        const q = tagQ[Math.floor(Math.random() * tagQ.length)];
        return { entry, ...q };
      }),
    // run memicu reshuffle
    [run, pool]
  );

  const answered = Object.keys(answers).length;
  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  const finished = questions.length > 0 && answered === questions.length;
  const passed = finished && score / questions.length >= 0.8;

  useEffect(() => {
    if (finished && passed) {
      confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 }, colors: ["#38bdf8", "#818cf8", "#22d3ee", "#fde68a", "#fbcfe8"] });
      playFinish(true);
    } else if (finished) {
      playFinish(false);
    }
  }, [finished]);

  const reset = () => { setAnswers({}); setRun((r) => r + 1); };

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

  return (
    <div className="panel">
      <div className="breadcrumb">🏠 Beranda › <b>Review Kilat</b>{finished ? " › Hasil" : ""}</div>
      <h2 style={{ marginTop: 0 }}><span className="title-underline">⚡ Review Kilat</span></h2>
      <p style={{ fontSize: ".85rem", color: "#0369a1" }}>5 soal singkat dari materi yang sudah kamu pelajari. Ayo lihat seberapa ingat kamu!</p>

      {!finished && questions.map((item, i) => (
        <div key={i} style={{ marginBottom: ".8rem" }}>
          <div style={{ fontWeight: 700, fontSize: ".85rem" }}>
            <span className="chip" style={{ fontSize: ".68rem", padding: ".1rem .45rem", marginRight: ".4rem" }}>{item.entry.tag}</span>
            {i + 1}. {item.q}
          </div>
          {item.options.map((opt, j) => {
            const chosen = answers[i];
            let cls = "quiz-opt";
            if (chosen !== undefined) {
              if (j === item.answer) cls += " correct";
              else if (j === chosen) cls += " wrong";
            }
            return <button key={j} className={cls} onClick={() => { if (answers[i] !== undefined) return; (j === item.answer ? playCorrect : playWrong)(); setAnswers({ ...answers, [i]: j }); }}>{opt}</button>;
          })}
        </div>
      ))}

      {finished && (
        <div className="confetti" style={{ background: passed ? "#dcfce7" : "#fee2e2" }}>
          {passed
            ? `🎉 Hebat! Skor kamu ${score}/${questions.length} — kamu benar-benar paham!`
            : `😅 Skor ${score}/${questions.length} — materi-materi ini butuh diulang. Coba lagi!`}
          <div style={{ marginTop: ".7rem", display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn primary" onClick={reset}>🔄 Review Lagi</button>
            <button className="btn" onClick={() => navigate("/")}>🏠 Kembali ke Beranda</button>
          </div>
        </div>
      )}
    </div>
  );
}
