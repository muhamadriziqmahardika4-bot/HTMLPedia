import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { TAGS } from "../data/tags.js";
import { useProgress } from "../hooks/useProgress.js";
import { questionsForTag } from "../data/quizzes.js";
import { CATEGORIES } from "../data/categories.js";
import CodeBlock from "./CodeBlock.jsx";
import DemoRenderer from "./DemoRenderer.jsx";
import { playCorrect, playWrong, playFinish } from "../lib/sounds.js";

/* ---------- Tantangan praktik per tag kunci ---------- */
const CHALLENGES = {
  table: { instruction: "Buat tabel 2 kolom (Nama & Nilai) dengan 1 baris data: kamu dan nilai 100.", must: ["<table", "<tr", "<th", "<td", "100"] },
  a: { instruction: 'Buat link ke https://contoh.com dengan teks "Klik di sini".', must: ["<a", "href", "contoh.com"] },
  img: { instruction: 'Tampilkan gambar "foto.jpg" dengan alt "Foto aku".', must: ["<img", "src", "alt", "foto"] },
  form: { instruction: "Buat form berisi 1 input nama (required) dan tombol submit.", must: ["<form", "<input", "required", "<button"] },
  input: { instruction: 'Buat input email dengan placeholder "nama@email.com" dan required.', must: ["<input", 'type="email"', "placeholder", "required"] },
  ul: { instruction: "Buat daftar 2 item: Nasi dan Rendang.", must: ["<ul", "<li", "Nasi", "Rendang"] },
  progress: { instruction: 'Buat progress bar dengan value="70" max="100".', must: ["<progress", 'value="70"', 'max="100"'] },
  details: { instruction: "Buat details dengan summary 'Pertanyaan' dan isi jawaban.", must: ["<details", "<summary", "Pertanyaan"] },
};

function tokensOf(code) {
  return code.toLowerCase();
}

// Cek generik: semua token wajib ada di kode pengguna (case-insensitive)
function checkGeneric(code, entry) {
  const c = tokensOf(code);
  const ch = CHALLENGES[entry.slug];
  if (ch) return ch.must.every((t) => c.includes(t.toLowerCase()));
  // generik: harus mengandung nama tag + minimal struktur balasan tag
  const tagName = entry.slug.toLowerCase();
  if (!c.includes(`<${tagName}`)) return false;
  // butuh minimal 8 karakter & tidak kosong
  return code.trim().length >= 8;
}

function instructionFor(entry) {
  return CHALLENGES[entry.slug]?.instruction || `Ketik ulang contoh kode berikut ke editor, lalu klik "🔍 Cek Kode":`;
}

const STEP_LABELS = ["📖 Baca", "⌨️ Praktik", "⚡ Kuis Mini", "🎉 Selesai"];

export default function GuidedLesson({ entry }) {
  const navigate = useNavigate();
  const { toggle, isDone } = useProgress(TAGS.length);
  const done = isDone(entry.slug);

  const [stage, setStage] = useState(0);          // 0 baca, 1 praktik, 2 kuis, 3 selesai
  const [typed, setTyped] = useState(0);          // jumlah karakter penjelasan yang tampil
  const [typingDone, setTypingDone] = useState(false);
  const [code, setCode] = useState("<!-- ketik kodemu di sini -->\n");
  const [practiceState, setPracticeState] = useState("idle"); // idle | wrong | ok
  const [answers, setAnswers] = useState({});

  const summary = entry.summary;
  const questions = useMemo(() => {
    const custom = questionsForTag(entry.slug);
    if (custom.length) return custom.slice(0, 3);
    const others = CATEGORIES.filter((c) => c.id !== entry.category).slice(0, 2);
    const opts = [CATEGORIES.find((c) => c.id === entry.category).name, ...others.map((c) => c.name)];
    const answer = opts.indexOf(CATEGORIES.find((c) => c.id === entry.category).name);
    const levelOpts = ["Pemula", "Menengah", "Ahli"];
    const levelAnswer = entry.level === "Menengah" ? 1 : 0;
    return [
      { q: `🏷️ Kategori tag ${entry.tag} adalah…`, options: opts, answer },
      { q: `📈 Tingkat kesulitan ${entry.tag} adalah…`, options: levelOpts, answer: levelAnswer },
    ];
  }, [entry]);

  /* ===== Efek mengetik penjelasan ===== */
  useEffect(() => {
    setTyped(0);
    setTypingDone(false);
    const interval = setInterval(() => {
      setTyped((t) => {
        if (t >= summary.length) { clearInterval(interval); setTypingDone(true); return t; }
        return t + 2;
      });
    }, 12);
    return () => clearInterval(interval);
  }, [summary]);

  const skipTyping = () => { setTyped(summary.length); setTypingDone(true); };

  /* ===== Praktik ===== */
  const checkCode = () => {
    const ok = checkGeneric(code, entry);
    setPracticeState(ok ? "ok" : "wrong");
    if (ok) playCorrect(); else playWrong();
  };

  /* ===== Kuis mini ===== */
  const answeredCount = Object.keys(answers).length;
  const quizDone = answeredCount === questions.length;
  const quizScore = questions.filter((q, i) => answers[i] === q.answer).length;

  const markDoneAndNext = () => {
    toggle(entry.slug);
    confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 }, colors: ["#38bdf8", "#818cf8", "#22d3ee", "#fde68a", "#fbcfe8"] });
    playFinish(true);
    const idx = TAGS.findIndex((t) => t.slug === entry.slug);
    const next = TAGS[idx + 1];
    setTimeout(() => navigate(next ? `/tag/${next.slug}` : "/tag"), 900);
  };

  const stepDot = (i) => (
    <div key={i} style={{ display: "flex", alignItems: "center", gap: ".35rem", opacity: stage >= i ? 1 : 0.45 }}>
      <span style={{ width: 26, height: 26, borderRadius: "50%", background: stage > i ? "#22c55e" : stage === i ? "#38bdf8" : "#e0f2fe", color: stage >= i ? "#fff" : "#7dd3fc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".78rem", fontWeight: 800 }}>
        {stage > i ? "✓" : i + 1}
      </span>
      <span style={{ fontSize: ".7rem", fontWeight: 700, color: "#0369a1" }}>{STEP_LABELS[i]}</span>
    </div>
  );

  return (
    <div>
      {/* Stepper */}
      <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", alignItems: "center", marginBottom: ".8rem", borderBottom: "2px dashed var(--border)", paddingBottom: ".6rem" }}>
        {[0, 1, 2, 3].map(stepDot)}
      </div>

      {/* ===== LANGKAH 1: BACA & PAHAMI ===== */}
      {stage === 0 && (
        <section>
          <p className="section-title">📖 Langkah 1 — Baca &amp; Pahami</p>
          <div className="info" style={{ minHeight: 70, fontSize: ".95rem", lineHeight: 1.7 }}>
            {summary.slice(0, typed)}
            {!typingDone && <span aria-hidden="true" style={{ animation: "blink 1s infinite" }}>▌</span>}
          </div>
          {typingDone && (
            <>
              <div className="info" style={{ borderColor: "#c7d2fe", background: "#eef2ff", animation: "popIn .4s ease both" }}>
                <b>🧩 Atribut penting</b><br />
                {entry.atribut.map((a) => <div key={a.name}><code>{a.name}</code> — {a.desc}</div>)}
              </div>
              <div className="info" style={{ animation: "popIn .5s ease both" }}>
                <b>💻 Contoh kode</b>
                <CodeBlock code={entry.contohKode} />
              </div>
              {entry.kapan && (
                <div className="info" style={{ borderColor: "#fde68a", background: "#fffbeb", animation: "popIn .52s ease both" }}>
                  <b>⏰ Kapan &amp; di mana dipakai</b><br />{entry.kapan}
                  <div style={{ marginTop: ".35rem" }}><b>🖼️ Contoh hasil / output</b><br />{entry.output}</div>
                </div>
              )}
              {entry.demo !== "generic" && (
                <div style={{ animation: "popIn .55s ease both", marginTop: ".6rem" }}>
                  <DemoRenderer demo={entry.demo} entry={entry} />
                </div>
              )}
            </>
          )}
          <div style={{ display: "flex", gap: ".5rem", marginTop: ".6rem" }}>
            {!typingDone && <button className="btn" onClick={skipTyping}>⏭️ Lewati</button>}
            {typingDone && <button className="btn primary" onClick={() => { setStage(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Selanjutnya ➡️</button>}
          </div>
        </section>
      )}

      {/* ===== LANGKAH 2: PRAKTIK ===== */}
      {stage === 1 && (
        <section>
          <p className="section-title">⌨️ Langkah 2 — Praktik Kode</p>
          <p style={{ fontWeight: 700, color: "#075985" }}>{instructionFor(entry)}</p>
          {!CHALLENGES[entry.slug] && <CodeBlock code={entry.contohKode} label="Contoh untuk ditiru" />}
          <textarea
            value={code}
            onChange={(e) => { setCode(e.target.value); setPracticeState("idle"); }}
            spellCheck={false}
            aria-label="Editor kode praktik"
            style={{ width: "100%", minHeight: 130, fontFamily: "Consolas, monospace", fontSize: ".85rem", border: "2px solid #bae6fd", borderRadius: 12, padding: ".6rem", background: "#0c4a6e", color: "#bae6fd", lineHeight: 1.6 }}
          />
          <div style={{ display: "flex", gap: ".5rem", alignItems: "center", flexWrap: "wrap", marginTop: ".5rem" }}>
            <button className="btn primary" onClick={checkCode}>🔍 Cek Kode</button>
            <button className="btn" onClick={() => setCode("<!-- ketik kodemu di sini -->\n")}>↺ Reset</button>
          </div>

          {practiceState === "wrong" && (
            <div style={{ marginTop: ".5rem", background: "#fee2e2", border: "2px solid #fca5a5", color: "#b91c1c", borderRadius: 12, padding: ".5rem .7rem", fontSize: ".82rem", animation: "popIn .3s ease both" }}>
              ❌ Belum tepat. {CHALLENGES[entry.slug] ? `Petunjuk: pastikan kodemu mengandung: ${CHALLENGES[entry.slug].must.join(", ")}.` : "Petunjuk: pastikan kamu menulis tag yang benar."}
            </div>
          )}

          {practiceState === "ok" && (
            <>
              <div style={{ marginTop: ".5rem", background: "#dcfce7", border: "2px solid #86efac", color: "#15803d", borderRadius: 12, padding: ".5rem .7rem", fontSize: ".82rem", animation: "popIn .3s ease both" }}>
                ✅ Benar! Kodemu valid. Ini hasilnya:
              </div>
              <iframe title="Hasil praktik" sandbox="" srcDoc={code} style={{ width: "100%", minHeight: 120, border: "2px dashed #5eead4", borderRadius: 12, background: "#fff", marginTop: ".4rem" }} />
              <div style={{ marginTop: ".5rem" }}>
                <button className="btn primary" onClick={() => { setStage(2); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Selanjutnya ➡️</button>
              </div>
            </>
          )}
        </section>
      )}

      {/* ===== LANGKAH 3: KUIS MINI ===== */}
      {stage === 2 && (
        <section>
          <p className="section-title">⚡ Langkah 3 — Kuis Mini</p>
          {questions.map((item, i) => (
            <div key={i} style={{ marginBottom: ".7rem" }}>
              <div style={{ fontWeight: 700, fontSize: ".88rem" }}>{i + 1}. {item.q}</div>
              {item.options.map((opt, j) => {
                const chosen = answers[i];
                let cls = "quiz-opt";
                if (chosen !== undefined) {
                  if (j === item.answer) cls += " correct";
                  else if (j === chosen) cls += " wrong";
                }
                return (
                  <button key={j} className={cls} onClick={() => { if (answers[i] !== undefined) return; (j === item.answer ? playCorrect : playWrong)(); setAnswers({ ...answers, [i]: j }); }}>
                    {opt}
                  </button>
                );
              })}
            </div>
          ))}
          {quizDone && (
            <div style={{ animation: "popIn .4s ease both" }}>
              <p style={{ fontWeight: 800, color: quizScore === questions.length ? "#15803d" : "#b45309" }}>
                Skor: {quizScore}/{questions.length} {quizScore === questions.length ? "— SEMPURNA! 🎉" : "— lumayan! Kamu tetap boleh lanjut."}
              </p>
              <button className="btn primary" onClick={() => setStage(3)}>Selanjutnya ➡️</button>
            </div>
          )}
        </section>
      )}

      {/* ===== LANGKAH 4: SELESAI ===== */}
      {stage === 3 && (
        <section style={{ textAlign: "center", padding: "1rem 0" }}>
          <div style={{ fontSize: "3.5rem", animation: "popIn .5s ease both" }}>{done ? "🏆" : "🎉"}</div>
          <h3 style={{ margin: ".3rem 0" }}>{done ? "Tag ini sudah kamu kuasai!" : "Selamat, kamu menyelesaikan materi ini!"}</h3>
          <p style={{ color: "#64748b", fontSize: ".9rem" }}>Tandai selesai untuk menyimpan progresmu, lalu lanjut ke tag berikutnya.</p>
          <button className="btn primary" style={{ fontSize: "1rem", padding: ".7rem 1.6rem" }} onClick={markDoneAndNext}>
            ✅ {done ? "Lanjut" : "Tandai Selesai & Lanjut"} ke Tag Berikutnya ➡️
          </button>
        </section>
      )}
    </div>
  );
}
