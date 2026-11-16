import React, { useState } from "react";
import { questionsForTag } from "../data/quizzes.js";
import { CATEGORIES } from "../data/categories.js";

function shuffleDeterministic(arr, seed) {
  const a = [...arr];
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  for (let i = a.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function genericQuestions(entry) {
  const others = CATEGORIES.filter((c) => c.id !== entry.category).slice(0, 2);
  const options = shuffleDeterministic(
    [CATEGORIES.find((c) => c.id === entry.category).name, ...others.map((c) => c.name)],
    entry.slug
  );
  const answer = options.indexOf(CATEGORIES.find((c) => c.id === entry.category).name);
  const levelOpts = ["Pemula", "Menengah", "Ahli"];
  const levelAnswer = entry.level === "Menengah" ? 1 : 0;
  return [
    { q: `🏷️ Kategori tag ${entry.tag} adalah…`, options, answer },
    { q: `📈 Tingkat kesulitan ${entry.tag} adalah…`, options: levelOpts, answer: levelAnswer },
  ];
}

export default function TagQuiz({ entry }) {
  const custom = questionsForTag(entry.slug);
  const questions = (custom.length ? custom : genericQuestions(entry)).slice(0, 3);
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
            return <button key={j} className={cls} style={{ fontSize: ".8rem", padding: ".45rem .7rem" }} onClick={() => setAnswers({ ...answers, [i]: j })}>{opt}</button>;
          })}
        </div>
      ))}
      {finished && <div style={{ fontSize: ".85rem", fontWeight: 800, color: score === questions.length ? "#15803d" : "#b91c1c" }}>Skor kamu: {score}/{questions.length} {score === questions.length ? "🎉 Sempurna!" : "— coba lagi yuk!"}</div>}
    </div>
  );
}
