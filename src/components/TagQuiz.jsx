import React, { useState } from "react";
import { questionsForEntry } from "../data/quizzes.js";
import { playCorrect, playWrong } from "../lib/sounds.js";
import { addMistake } from "../lib/mistakes.js";

export default function TagQuiz({ entry }) {
  const questions = questionsForEntry(entry);
  const [answers, setAnswers] = useState({});
  const answered = Object.keys(answers).length;
  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  const finished = answered === questions.length;

  return (
    <div className="info" style={{ background: "#fffbeb", borderColor: "#fde68a", marginTop: ".8rem" }}>
      <b style={{ color: "#b45309" }}>⚡ Kuis Mini — {entry.tag}</b>
      {questions.map((item, i) => (
        <div key={i} style={{ margin: ".5rem 0" }}>
          <div style={{ fontWeight: 700, fontSize: ".82rem" }}>{i + 1}. {item.q}</div>
          {item.options.map((opt, j) => {
            const chosen = answers[i];
            let cls = "quiz-opt";
            if (chosen !== undefined) {
              if (j === item.answer) cls += " correct";
              else if (j === chosen) cls += " wrong";
            }
            return <button key={j} className={cls} style={{ fontSize: ".8rem", padding: ".45rem .7rem" }} onClick={() => { if (answers[i] !== undefined) return; const ok = j === item.answer; (ok ? playCorrect : playWrong)(); if (!ok) addMistake({ q: item.q, options: item.options, answer: item.answer, picked: j, source: "kuis-mini", tag: entry.tag }); setAnswers({ ...answers, [i]: j }); }}>{opt}</button>;
          })}
        </div>
      ))}
      {finished && <div style={{ fontSize: ".85rem", fontWeight: 800, color: score === questions.length ? "#15803d" : "#b91c1c" }}>Skor kamu: {score}/{questions.length} {score === questions.length ? "🎉 Sempurna!" : "— coba lagi yuk!"}</div>}
    </div>
  );
}
