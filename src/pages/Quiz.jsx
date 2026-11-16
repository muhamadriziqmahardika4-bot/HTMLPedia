import React, { useState } from "react";
import confetti from "canvas-confetti";
import { QUIZZES, TOPIC_TAGS, MODES } from "../data/quizzes.js";
import { useQuiz } from "../hooks/useQuiz.js";

export default function Quiz() {
  const [topic, setTopic] = useState(null);
  const [mode, setMode] = useState(null);
  const [tag, setTag] = useState(null);
  const [answers, setAnswers] = useState({});
  const { best, saveResult } = useQuiz();

  const reset = () => { setTopic(null); setMode(null); setTag(null); setAnswers({}); };
  const questions = topic && mode ? QUIZZES[topic][mode] : [];
  const answeredCount = Object.keys(answers).filter((k) => k !== "saved").length;
  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  const finished = questions.length > 0 && answeredCount === questions.length;
  const passed = finished && score / questions.length >= 0.7;

  React.useEffect(() => {
    if (!finished || answers.saved) return;
    saveResult(topic, mode, score);
    if (score / questions.length >= 0.7) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#38bdf8", "#818cf8", "#22d3ee", "#fde68a", "#fbcfe8"] });
    }
    setAnswers((a) => ({ ...a, saved: true }));
  }, [finished]);

  const modeName = (id) => MODES.find((m) => m.id === id)?.name;

  return (
    <div className="panel">
      <div className="breadcrumb">🏠 Beranda › <b>Kuis</b>{topic ? ` › ${topic}` : ""}{mode ? ` › ${modeName(mode)}` : ""}</div>
      <h2 style={{ marginTop: 0 }}>🧠 Kuis — Mau tes apa hari ini?</h2>
      {best && Object.keys(best).length > 0 && (
        <p style={{ fontSize: ".72rem", color: "#0369a1", marginTop: "-.4rem" }}>
          🏆 Skor terbaikmu: {Object.entries(best).map(([k, v]) => `${k.replace(":", " · ")}: ${v}`).join(" • ")}
        </p>
      )}

      <div className="stepper"><span><b>1</b> Pilih topik</span> → <span><b>2</b> Pilih mode</span> → <span><b>3</b> Pilih materi</span> → <span><b>4</b> Kerjakan!</span></div>

      {/* Langkah 1: topik */}
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: ".8rem" }}>
        <button className={`chip ${topic === "HTML" ? "active" : ""}`} onClick={() => { setTopic("HTML"); setMode(null); setTag(null); setAnswers({}); }}>🌐 HTML</button>
        <button className={`chip css ${topic === "CSS" ? "active" : ""}`} onClick={() => { setTopic("CSS"); setMode(null); setTag(null); setAnswers({}); }}>🎨 CSS</button>
        <button className={`chip js ${topic === "JavaScript" ? "active" : ""}`} onClick={() => { setTopic("JavaScript"); setMode(null); setTag(null); setAnswers({}); }}>⚡ JavaScript</button>
      </div>

      {/* Langkah 2: mode */}
      {topic && !finished && (
        <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {MODES.map((m) => (
            <button key={m.id} className={`mode-card ${m.cls}`} onClick={() => { setMode(m.id); setTag(null); setAnswers({}); }}
              style={mode === m.id ? { outline: "4px solid #38bdf8" } : {}}>
              <div className="mode-emoji">{m.emoji}</div>
              <div className="mode-name">{m.name}</div>
              <div className="mode-desc">{m.desc}</div>
            </button>
          ))}
        </div>
      )}

      {/* Langkah 3: pilih materi */}
      {topic && mode && !tag && !finished && (
        <>
          <p className="section-title">Mau latih bagian mana dari {topic}?</p>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            {TOPIC_TAGS[topic].map((t) => (
              <button key={t} className="chip" onClick={() => { setTag(t); setAnswers({}); }}>{t}</button>
            ))}
            <button className="chip" style={{ borderColor: "#fbcfe8", color: "#be185d" }} onClick={() => { setTag("Campuran"); setAnswers({}); }}>🎲 Campuran semua</button>
          </div>
        </>
      )}

      {/* Langkah 4: soal */}
      {tag && !finished && questions.map((item, i) => (
        <div key={i} style={{ marginBottom: ".8rem" }}>
          <div style={{ fontWeight: 700, fontSize: ".88rem" }}>{i + 1}. {item.q}</div>
          {item.options.map((opt, j) => {
            const chosen = answers[i];
            let cls = "quiz-opt";
            if (chosen !== undefined) {
              if (j === item.answer) cls += " correct";
              else if (j === chosen) cls += " wrong";
            }
            return <button key={j} className={cls} onClick={() => setAnswers({ ...answers, [i]: j })}>{opt}</button>;
          })}
        </div>
      ))}

      {finished && (
        <div className="confetti" style={{ background: passed ? "#dcfce7" : "#fee2e2", marginTop: ".6rem" }}>
          {passed ? `🎉 LULUS! Skor kamu ${score}/${questions.length} di mode ${modeName(mode)}` : `😅 Skor ${score}/${questions.length} — coba lagi, kamu pasti bisa!`}
          <div style={{ marginTop: ".6rem" }}><button className="btn primary" onClick={reset}>🔄 Main lagi / ganti topik</button></div>
        </div>
      )}
    </div>
  );
}
