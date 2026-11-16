import React, { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import { QUIZZES, MODES, pickStageQuestions } from "../data/quizzes.js";
import { useQuiz } from "../hooks/useQuiz.js";
import { playCorrect, playWrong, playFinish } from "../lib/sounds.js";
import { addMistake } from "../lib/mistakes.js";

export default function Quiz() {
  const [topic, setTopic] = useState(null);
  const [mode, setMode] = useState(null);
  const [stage, setStage] = useState(1);
  const [answers, setAnswers] = useState({});
  const { best, saveStage } = useQuiz();

  const modeDef = MODES.find((m) => m.id === mode);
  const questions = useMemo(
    () => (topic && mode ? pickStageQuestions(QUIZZES[topic][mode], `${topic}|${mode}|${stage}`, modeDef.count) : []),
    [topic, mode, stage]
  );
  const answeredCount = Object.keys(answers).filter((k) => k !== "saved").length;
  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  const finished = questions.length > 0 && answeredCount === questions.length;
  const passed = finished && score / questions.length >= 0.7;

  React.useEffect(() => {
    if (!finished || answers.saved) return;
    if (passed) saveStage(topic, mode, stage);
    playFinish(passed);
    if (passed) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#38bdf8", "#818cf8", "#22d3ee", "#fde68a", "#fbcfe8"] });
    }
    setAnswers((a) => ({ ...a, saved: true }));
  }, [finished]);

  const resetAll = () => { setTopic(null); setMode(null); setStage(1); setAnswers({}); };
  const nextStage = () => { setStage((s) => s + 1); setAnswers({}); };

  const modeName = (id) => MODES.find((m) => m.id === id)?.name;

  return (
    <div className="panel">
      <div className="breadcrumb">🏠 Beranda › <b>Kuis</b>{topic ? ` › ${topic}` : ""}{mode ? ` › ${modeName(mode)}` : ""}{mode ? ` › Kuis ${stage}` : ""}</div>
      <h2 style={{ marginTop: 0 }}><span className="title-underline">🧠 Kuis — Mau tes apa hari ini?</span></h2>
      {best && Object.keys(best).length > 0 && (
        <p style={{ fontSize: ".72rem", color: "#0369a1", marginTop: "-.4rem" }}>
          🏆 Rekor stage terbaikmu: {Object.entries(best).map(([k, v]) => `${k.replace(":", " · ")} → Kuis ${v}`).join(" • ")}
        </p>
      )}

      <div className="stepper"><span><b>1</b> Pilih topik</span> → <span><b>2</b> Pilih mode</span> → <span><b>3</b> Kerjakan Kuis {stage}!</span></div>

      {/* Langkah 1: topik */}
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: ".8rem" }}>
        <button className={`chip ${topic === "HTML" ? "active" : ""}`} onClick={() => { setTopic("HTML"); setMode(null); setStage(1); setAnswers({}); }}>🌐 HTML</button>
        <button className={`chip css ${topic === "CSS" ? "active" : ""}`} onClick={() => { setTopic("CSS"); setMode(null); setStage(1); setAnswers({}); }}>🎨 CSS</button>
        <button className={`chip js ${topic === "JavaScript" ? "active" : ""}`} onClick={() => { setTopic("JavaScript"); setMode(null); setStage(1); setAnswers({}); }}>⚡ JavaScript</button>
      </div>

      {/* Langkah 2: mode */}
      {topic && !finished && (
        <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {MODES.map((m) => (
            <button key={m.id} className={`mode-card ${m.cls}`} onClick={() => { setMode(m.id); setStage(1); setAnswers({}); }}
              style={mode === m.id ? { outline: "4px solid #38bdf8" } : {}}>
              <div className="mode-emoji">{m.emoji}</div>
              <div className="mode-name">{m.name}</div>
              <div className="mode-desc">{m.desc}</div>
            </button>
          ))}
        </div>
      )}

      {/* Langkah 3: soal stage ini */}
      {topic && mode && !finished && (
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem", margin: ".2rem 0 .6rem" }}>
          <span className="sticker" style={{ background: "#e0f2fe", borderColor: "#7dd3fc", color: "#0369a1" }}>🎯 KUIS {stage} · {topic} · {modeName(mode)}</span>
          <span style={{ fontSize: ".72rem", color: "#64748b" }}>Stage {stage} — {questions.length} soal, tanpa batas!</span>
        </div>
      )}

      {topic && mode && !finished && questions.map((item, i) => (
        <div key={i} style={{ marginBottom: ".8rem" }}>
          <div style={{ fontWeight: 700, fontSize: ".88rem" }}>{i + 1}. {item.q}</div>
          {item.options.map((opt, j) => {
            const chosen = answers[i];
            let cls = "quiz-opt";
            if (chosen !== undefined) {
              if (j === item.answer) cls += " correct";
              else if (j === chosen) cls += " wrong";
            }
            return <button key={j} className={cls} onClick={() => { if (answers[i] !== undefined) return; const ok = j === item.answer; (ok ? playCorrect : playWrong)(); if (!ok) addMistake({ q: item.q, options: item.options, answer: item.answer, picked: j, source: "kuis" }); setAnswers({ ...answers, [i]: j }); }}>{opt}</button>;
          })}
        </div>
      ))}

      {finished && (
        <div className="confetti" style={{ background: passed ? "#dcfce7" : "#fee2e2", marginTop: ".6rem" }}>
          {passed
            ? `🎉 KUIS ${stage} LULUS! Skor ${score}/${questions.length} — rekor kamu: Kuis ${Math.max(stage, best[`${topic}:${mode}`] || 0)}`
            : `😅 Skor ${score}/${questions.length} — stage belum terlewati, coba lagi!`}
          <div style={{ marginTop: ".7rem", display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {passed
              ? <button className="btn primary" onClick={nextStage}>➡️ Lanjut ke Kuis {stage + 1}</button>
              : <button className="btn primary" onClick={() => setAnswers({})}>🔄 Ulangi Kuis {stage}</button>}
            <button className="btn" onClick={resetAll}>🏠 Menu / ganti topik</button>
          </div>
        </div>
      )}
    </div>
  );
}
