import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { ALL_ORDERED } from "../data/all.js";
import { useProgress } from "../hooks/useProgress.js";
import { questionsForTag } from "../data/quizzes.js";
import { CATEGORIES } from "../data/categories.js";
import CodeBlock from "./CodeBlock.jsx";
import DemoRenderer from "./DemoRenderer.jsx";
import LivePlayground from "./LivePlayground.jsx";
import { playCorrect, playWrong, playFinish } from "../lib/sounds.js";
import { addMistake } from "../lib/mistakes.js";

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

function checkGeneric(code, entry) {
  const c = tokensOf(code);
  const ch = CHALLENGES[entry.slug];
  if (ch) {
    // Token dengan tanda kutip opsional — ketik value=70 tetap dianggap benar (valid HTML)
    return ch.must.every((t) => {
      // Pecah token di tiap tanda kutip, escape tiap segmen, lalu gabung dengan kutip opsional
      const pattern = t.split('"').map((seg) => seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join('["\\\']?');
      try { return new RegExp(pattern, "i").test(code); } catch { return c.includes(t.toLowerCase()); }
    });
  }
  // CSS / JavaScript: minimal 60% token penting dari contoh kode harus ada di kodemu
  if (entry.category === "css" || entry.category === "javascript") {
    const tokens = entry.contohKode
      .toLowerCase()
      .split(/[^a-z0-9_#.-]+/)
      .filter((t) => t.length > 3);
    if (tokens.length === 0) return code.trim().length >= 8;
    const hits = tokens.filter((t) => c.includes(t)).length;
    return hits / tokens.length >= 0.6;
  }
  // HTML: cek nama tag sebenarnya (bukan slug — mis. script-meta bertag <script>)
  const tagName = entry.tag.replace(/[</>]/g, "").split(/\s/)[0].toLowerCase();
  if (!c.includes(`<${tagName}`)) return false;
  return code.trim().length >= 8;
}

function instructionFor(entry) {
  return CHALLENGES[entry.slug]?.instruction || `Ketik ulang contoh kode berikut ke editor, lalu klik "🔍 Cek Kode":`;
}

const STEP_LABELS = ["📖 Baca", "⌨️ Praktik", "⚡ Kuis Mini", "🎉 Selesai"];

/* ---------- Bagian ber-efek mengetik ---------- */
function TypedText({ text, speed = 12, skip, onDone, className, style }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (skip) { setCount(text.length); onDone?.(); return; }
    setCount(0);
    const iv = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) { clearInterval(iv); onDone?.(); return c; }
        return c + 2;
      });
    }, speed);
    return () => clearInterval(iv);
  }, [text, skip]); // eslint-disable-line
  const done = count >= text.length;
  return (
    <div className={className} style={style}>
      {text.slice(0, count)}
      {!done && <span aria-hidden="true" style={{ animation: "blink 1s infinite" }}>▌</span>}
    </div>
  );
}

export default function GuidedLesson({ entry }) {
  const navigate = useNavigate();
  const { toggle, isDone } = useProgress(ALL_ORDERED.length);
  const done = isDone(entry.slug);

  const [stage, setStage] = useState(0);
  const [readPhase, setReadPhase] = useState(0);   // 0 analogi, 1 apaitu, 2 atribut, 3 contoh, 4 demo
  const [skipAll, setSkipAll] = useState(false);
  const [code, setCode] = useState("<!-- ketik kodemu di sini -->\n");
  const [practiceState, setPracticeState] = useState("idle");
  const [answers, setAnswers] = useState({});

  const hasDemo = entry.demo !== "generic";
  const codeLineCount = entry.contohKode.split("\n").length;
  const lang = entry.category === "css" ? "css" : entry.category === "javascript" ? "js" : "html";
  const isVisibleHtml = /<(p|h[1-6]|table|form|input|button|img|ul|ol|li|details|dialog|div|span|a|pre|mark|video|audio|progress|meter|svg|canvas|figure|main|header|footer|section|article|aside|nav|blockquote)[\s>]/i.test(entry.contohKode);

  // Maju otomatis antar bagian baca (atribut → contoh → demo → selesai)
  useEffect(() => {
    let t;
    if (readPhase === 2) t = setTimeout(() => setReadPhase(3), 750);
    else if (readPhase === 3) t = setTimeout(() => setReadPhase(hasDemo ? 4 : 5), codeLineCount * 90 + 500);
    else if (readPhase === 4) t = setTimeout(() => setReadPhase(5), 800);
    return () => clearTimeout(t);
  }, [readPhase, hasDemo, codeLineCount]);
  const readDone = readPhase >= 5;

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

  const checkCode = () => {
    const ok = checkGeneric(code, entry);
    setPracticeState(ok ? "ok" : "wrong");
    if (ok) playCorrect(); else playWrong();
  };

  const answeredCount = Object.keys(answers).length;
  const quizDone = answeredCount === questions.length;
  const quizScore = questions.filter((q, i) => answers[i] === q.answer).length;

  const idx = ALL_ORDERED.findIndex((t) => t.slug === entry.slug);
  const next = ALL_ORDERED[idx + 1];
  const advanceRef = useRef(false);

  useEffect(() => {
    if (!quizDone || advanceRef.current) return;
    advanceRef.current = true;
    if (!done) toggle(entry.slug);
    playFinish(true);
    confetti({ particleCount: 130, spread: 85, origin: { y: 0.6 }, colors: ["#38bdf8", "#818cf8", "#22d3ee", "#fde68a", "#fbcfe8"] });
    setStage(3);
  }, [quizDone]);

  useEffect(() => {
    if (stage !== 3) return;
    const t = setTimeout(() => navigate(next ? `/tag/${next.slug}` : "/tag"), 3400);
    return () => clearTimeout(t);
  }, [stage]);

  const goNext = () => navigate(next ? `/tag/${next.slug}` : "/tag");

  const partBadge = (n) => (
    <span style={{ fontSize: ".62rem", fontWeight: 800, letterSpacing: ".08em", background: "#e0f2fe", color: "#0369a1", borderRadius: 6, padding: ".15rem .4rem" }}>
      BAGIAN {n}/{hasDemo ? 5 : 4}
    </span>
  );

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
      {/* Stepper — tetap diam, konten di bawahnya yang berganti dengan fade halus */}
      <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", alignItems: "center", marginBottom: ".8rem", borderBottom: "2px dashed var(--border)", paddingBottom: ".6rem" }}>
        {[0, 1, 2, 3].map(stepDot)}
      </div>

      {/* Konten langkah: standar — fade + sedikit naik */}
      <div key={stage} style={{ animation: "stepFade .35s ease both" }}>
      {/* ===== LANGKAH 1: BACA & PAHAMI (per bagian, ber-efek mengetik) ===== */}
      {stage === 0 && (
        <section>
          <p className="section-title">📖 Langkah 1 — Baca &amp; Pahami</p>

          {/* BAGIAN 1 — Kenalan dulu (analogi) */}
          <div className="info" style={{ borderColor: "#bbf7d0", background: "#f0fdf4" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".2rem" }}>
              <b style={{ color: "#15803d" }}>🌱 Kenalan dulu (analogi)</b>{partBadge(1)}
            </div>
            <TypedText text={entry.analogi || "Tag ini bagian dari kerangka HTML."} skip={skipAll} onDone={() => setReadPhase((p) => (p === 0 ? 1 : p))} style={{ fontSize: ".92rem", lineHeight: 1.6, minHeight: "1.5em" }} />
          </div>

          {/* BAGIAN 2 — Apa itu sebenarnya? */}
          {readPhase >= 1 && (
            <div className="info">
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".2rem" }}>
                <b style={{ color: "#0e7490" }}>📖 Apa itu sebenarnya?</b>{partBadge(2)}
              </div>
              <TypedText text={entry.summary} skip={skipAll} onDone={() => setReadPhase((p) => (p === 1 ? 2 : p))} style={{ fontSize: ".92rem", lineHeight: 1.7, minHeight: "1.5em" }} />
            </div>
          )}

          {/* BAGIAN 3 — Atribut penting */}
          {readPhase >= 2 && (
            <div className="info" style={{ borderColor: "#c7d2fe", background: "#eef2ff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".2rem" }}>
                <b style={{ color: "#4338ca" }}>🧩 Atribut penting</b>{partBadge(3)}
              </div>
              {entry.atribut.map((a, i) => (
                <div key={a.name} style={{ animation: "popIn .4s ease both", animationDelay: `${i * 110}ms` }}><code>{a.name}</code> — {a.desc}</div>
              ))}
            </div>
          )}

          {/* BAGIAN 4 — Contoh kode + hasil langsung (live) */}
          {readPhase >= 3 && (
            <div className="info" style={{ background: "#f0f9ff", borderColor: "#7dd3fc" }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".2rem" }}>
                <b style={{ color: "#0369a1" }}>💻 Contoh Kode — lihat hasilnya</b>{partBadge(4)}
              </div>
              {isVisibleHtml || lang !== "html"
                ? <LivePlayground initialCode={entry.contohKode} lang={lang} />
                : <div style={{ fontSize: ".8rem", color: "#0369a1", background: "#e0f2fe", borderRadius: 12, padding: ".6rem .8rem", border: "2px dashed #7dd3fc" }}>🪞 Tag ini <b>tidak menampilkan apa-apa di layar</b> — kamu bisa baca bagian “Kapan &amp; di mana dipakai” di atas untuk tahu gunanya.</div>}
            </div>
          )}

          {/* BAGIAN 5 — Lihat langsung (demo) */}
          {readPhase >= 4 && hasDemo && (
            <div style={{ animation: "popIn .5s ease both", marginTop: ".6rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".2rem" }}>
                <b style={{ color: "#0f766e" }}>🎬 Lihat langsung</b>{partBadge(5)}
              </div>
              <DemoRenderer demo={entry.demo} entry={entry} />
            </div>
          )}

          <div style={{ display: "flex", gap: ".5rem", marginTop: ".5rem", flexWrap: "wrap" }}>
            {!readDone && <button className="btn" onClick={() => setSkipAll(true)}>⏭️ Lewati Semua</button>}
            {readDone && <button className="btn primary" onClick={() => { setStage(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Selanjutnya ➡️ — Praktik</button>}
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
                ✅ Benar! Kodemu lolos. Ini contoh hasil yang benar 👇
              </div>
              <iframe title="Hasil praktik" sandbox="" srcDoc={entry.contohKode} style={{ width: "100%", minHeight: 120, border: "2px dashed #5eead4", borderRadius: 12, background: "#fff", marginTop: ".4rem" }} />
              <div style={{ marginTop: ".5rem" }}>
                <button className="btn primary" onClick={() => { setStage(2); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Selanjutnya ➡️ — Kuis Mini</button>
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
                  <button key={j} className={cls} onClick={() => { if (answers[i] !== undefined) return; const ok = j === item.answer; (ok ? playCorrect : playWrong)(); if (!ok) addMistake({ q: item.q, options: item.options, answer: item.answer, picked: j, source: "kuis-mini", tag: entry.tag }); setAnswers({ ...answers, [i]: j }); }}>
                    {opt}
                  </button>
                );
              })}
            </div>
          ))}
          {quizDone && (
            <div style={{ animation: "popIn .4s ease both" }}>
              <p style={{ fontWeight: 800, color: quizScore === questions.length ? "#15803d" : "#b45309" }}>
                Skor: {quizScore}/{questions.length} {quizScore === questions.length ? "— SEMPURNA! 🎉" : "— lumayan! 🎊"} Menyiapkan latihan berikutnya…
              </p>
            </div>
          )}
        </section>
      )}

      {/* ===== LANGKAH 4: SELESAI (auto-lanjut) ===== */}
      {stage === 3 && (
        <section style={{ textAlign: "center", padding: "1rem 0" }}>
          <div style={{ fontSize: "3.5rem", animation: "popIn .5s ease both" }}>🏆</div>
          <h3 style={{ margin: ".3rem 0" }}>Mantap! Tag {entry.tag} selesai 🎉</h3>
          <p style={{ color: "#64748b", fontSize: ".9rem" }}>
            {next ? <>Progresmu tersimpan. Lanjut otomatis ke <b>{next.tag}</b>…</> : "Semua tag sudah kamu selesaikan — kamu luar biasa!"}
          </p>
          <button className="btn primary" style={{ fontSize: "1rem", padding: ".7rem 1.6rem" }} onClick={goNext}>
            {next ? `➡️ Lanjut sekarang ke ${next.tag}` : "📚 Kembali ke Daftar Tag"}
          </button>
        </section>
      )}
      </div>
    </div>
  );
}
