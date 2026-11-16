import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import Cubby from "../components/Cubby.jsx";
import { useProgress } from "../hooks/useProgress.js";
import { ALL_ORDERED } from "../data/all.js";
import { PROJECT_CHECKS } from "../lib/codeCheck.js";
import { playCorrect, playWrong } from "../lib/sounds.js";

const KEY = "htmlpedia-projects";
const CODE_KEY = "htmlpedia-code";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; } };
const loadCode = () => { try { return JSON.parse(localStorage.getItem(CODE_KEY) || "{}"); } catch { return {}; } };

/* ===== Langkah kerja yang sama untuk semua proyek ===== */
const STEPS = [
  { emoji: "📋", title: "Baca misinya & lihat target hasil", desc: "Pahami apa yang harus dibuat dan seperti apa hasil jadinya." },
  { emoji: "✍️", title: "Tulis kodemu di CodePen", desc: "Buka CodePen → klik 'New Pen' → tulis kode (atau copy starter template di bawah)." },
  { emoji: "📤", title: "Tempel kodemu di bawah", desc: "Copy semua kode HTML kamu → paste ke kotak 'Tempel kode' di halaman ini." },
  { emoji: "🔍", title: "Klik 'Cek Kode'", desc: "Sistem menilai → kalau lulus tahap tercentang → lanjut tahap berikutnya sampai tuntas!" },
];

const PROJECTS = [
  {
    id: "biodata",
    emoji: "🧍",
    name: "Halaman Biodata",
    need: 5,
    tag: "HTML",
    desc: "Ceritakan dirimu di web. Ikuti tahapan — tempel kodemu di sini, sistem yang menilai.",
    template: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Biodata Saya</title>
  <style>
    body { font-family: sans-serif; max-width: 480px; margin: 2rem auto; text-align: center; }
  </style>
</head>
<body>
  <!-- TODO 1: <h1>nama kamu</h1> -->

  <!-- TODO 2: emoji/foto profil besar -->

  <!-- TODO 3: <p>perkenalan singkat</p> -->

  <!-- TODO 4: <ul> daftar 3+ hobi -->

  <!-- TODO 5: <a> link instagram, target="_blank" -->

</body>
</html>`,
    sampleCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Biodata Mahardika</title>
  <style>
    body { font-family: sans-serif; max-width: 480px; margin: 2rem auto; text-align: center; }
  </style>
</head>
<body>
  <h1>Mahardika</h1>
  <div style="font-size:5rem">🧑‍💻</div>
  <p>Halo, aku mahasiswa Universitas BumiGora yang suka ngoprek web dan ngopi sore.</p>
  <h2>Hobiku</h2>
  <ul>
    <li>Ngoding</li>
    <li>Main game</li>
    <li>Mancing</li>
  </ul>
  <a href="https://instagram.com/mhmdrziqmhrdika" target="_blank">@mhmdrziqmhrdika</a>
</body>
</html>`,
    preview: (
      <div style={{ background: "#fff", border: "2px solid #e2e8f0", borderRadius: 16, padding: ".6rem .9rem", maxWidth: 260, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "2.2rem" }}>🧑‍💻</div>
        <div style={{ fontWeight: 800, color: "#0c4a6e", fontSize: ".85rem" }}>Mahardika</div>
        <div style={{ fontSize: ".62rem", color: "#64748b", margin: ".2rem 0" }}>Mahasiswa Universitas BumiGora…</div>
        <ul style={{ fontSize: ".62rem", color: "#64748b", paddingLeft: 18, margin: ".2rem 0", textAlign: "left", display: "inline-block" }}>
          <li>Ngoding</li><li>Main game</li><li>Mancing</li>
        </ul>
        <div style={{ fontSize: ".68rem", color: "#c13584", fontWeight: 800 }}>@mhmdrziqmhrdika</div>
      </div>
    ),
  },
  {
    id: "jadwal",
    emoji: "📅",
    name: "Jadwal Pelajaran",
    need: 20,
    tag: "HTML + CSS",
    desc: "Tabel jadwal yang berwarna dan hidup. Ikuti tahapan sampai tuntas.",
    template: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Jadwal Pelajaran</title>
  <style>
    table { border-collapse: collapse; width: 100%; }
    /* TODO 3: th { background: …; color: …; } */
    /* TODO 4: border-radius … */
    /* TODO 5: tr:hover … */
  </style>
</head>
<body>
  <h1>Jadwal Belajarku</h1>
  <table>
    <!-- TODO 1: <thead> dengan <th scope="col">Hari</th> dst -->
    <!-- TODO 2: <tbody> dengan baris isi -->
  </table>
</body>
</html>`,
    sampleCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Jadwal Pelajaran</title>
  <style>
    table { border-collapse: collapse; border-radius: 12px; overflow: hidden; width: 100%; }
    th { background: #38bdf8; color: #fff; padding: .5rem; }
    td { border: 1px solid #e2e8f0; padding: .35rem .5rem; }
    tr:hover { background: #e0f2fe; }
  </style>
</head>
<body>
  <h1>Jadwal Belajarku</h1>
  <table>
    <thead>
      <tr><th scope="col">Hari</th><th scope="col">Jam</th><th scope="col">Mapel</th></tr>
    </thead>
    <tbody>
      <tr><td>Senin</td><td>07.00</td><td>Matematika</td></tr>
      <tr><td>Selasa</td><td>09.00</td><td>IPA</td></tr>
    </tbody>
  </table>
</body>
</html>`,
    preview: (
      <table style={{ fontSize: ".68rem", borderCollapse: "collapse", maxWidth: 260, margin: "0 auto" }}>
        <thead><tr style={{ background: "#38bdf8", color: "#fff" }}><th style={{ padding: ".2rem .5rem" }}>Hari</th><th>Jam</th><th>Mapel</th></tr></thead>
        <tbody>
          <tr><td style={{ padding: ".2rem .5rem", border: "1px solid #e2e8f0" }}>Senin</td><td style={{ border: "1px solid #e2e8f0" }}>07.00</td><td style={{ border: "1px solid #e2e8f0" }}>Matematika</td></tr>
          <tr><td style={{ padding: ".2rem .5rem", border: "1px solid #e2e8f0" }}>Selasa</td><td style={{ border: "1px solid #e2e8f0" }}>09.00</td><td style={{ border: "1px solid #e2e8f0" }}>IPA</td></tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "kuis",
    emoji: "⚡",
    name: "Kuis Interaktif",
    need: 50,
    tag: "JavaScript",
    desc: "Kuis pilihan ganda dengan skor akhir — logika asli. Ikuti tahapan sampai tuntas.",
    template: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kuis Saya</title>
</head>
<body>
  <h1>Kuis Seru</h1>
  <p>Ibu kota Indonesia adalah?</p>
  <button>Jakarta</button>
  <button>Bandung</button>
  <button>Surabaya</button>
  <div id="skor"></div>

  <script>
    // TODO 1: ambil tombol & elemen skor (querySelector / getElementById)
    // TODO 2: addEventListener('click', …) di tiap tombol
    // TODO 3: if/else cek jawaban benar, tambah skor
    // TODO 4: tulis skor akhir ke halaman (textContent)
  </script>
</body>
</html>`,
    sampleCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kuis Saya</title>
</head>
<body>
  <h1>Kuis Seru</h1>
  <p>Ibu kota Indonesia adalah?</p>
  <button>Jakarta</button>
  <button>Bandung</button>
  <button>Surabaya</button>
  <div id="skor"></div>

  <script>
    let skor = 0;
    const tombol = document.querySelectorAll("button");
    const hasil = document.getElementById("skor");
    tombol.forEach(function(btn) {
      btn.addEventListener("click", function() {
        if (btn.textContent === "Jakarta") {
          skor++;
          hasil.textContent = "Skor kamu: " + skor;
        } else {
          hasil.textContent = "Salah! Skor kamu: " + skor;
        }
      });
    });
  </script>
</body>
</html>`,
    preview: (
      <div style={{ background: "#fff", border: "2px solid #e2e8f0", borderRadius: 16, padding: ".6rem .9rem", maxWidth: 260, margin: "0 auto" }}>
        <div style={{ fontSize: ".68rem", color: "#64748b" }}>Pertanyaan 1/3</div>
        <div style={{ fontWeight: 800, fontSize: ".78rem", color: "#0c4a6e", margin: ".15rem 0" }}>Ibu kota Indonesia?</div>
        {["Jakarta", "Bandung", "Surabaya"].map((o) => <div key={o} style={{ border: "1.5px solid #e2e8f0", borderRadius: 8, padding: ".15rem .4rem", fontSize: ".68rem", margin: ".15rem 0", color: "#475569" }}>{o}</div>)}
        <div style={{ fontSize: ".7rem", color: "#0369a1", fontWeight: 800, marginTop: ".3rem" }}>Skor kamu: 1</div>
      </div>
    ),
  },
];

function CopyBtn({ text, label }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); } catch { /* fallback diam */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return <button className="btn" style={{ fontSize: ".7rem" }} onClick={copy}>{copied ? "✅ Disalin!" : label}</button>;
}

export default function Proyek() {
  const { done } = useProgress(ALL_ORDERED.length);
  const [checked, setChecked] = useState(load);
  const [unlockAll, setUnlockAll] = useState(() => localStorage.getItem("htmlpedia-unlock-all") === "1");
  const [codes, setCodes] = useState(loadCode);
  const [feedback, setFeedback] = useState({});

  const doneCount = done.length;
  const saveChecked = (next) => { setChecked(next); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* abaikan */ } };
  const saveCodes = (next) => { setCodes(next); try { localStorage.setItem(CODE_KEY, JSON.stringify(next)); } catch { /* abaikan */ } };
  const setCode = (id, v) => saveCodes({ ...codes, [id]: v });

  const runCheck = (projectId) => {
    const html = codes[projectId] || "";
    const passed = checked[projectId] || [];
    const currentStage = passed.length;
    const checks = PROJECT_CHECKS[projectId];
    if (currentStage >= checks.length) return;
    const check = checks[currentStage];
    const doc = new DOMParser().parseFromString(html, "text/html");
    const styleText = [...doc.querySelectorAll("style")].map((s) => s.textContent).join("\n")
      + "\n" + [...doc.querySelectorAll("[style]")].map((el) => el.getAttribute("style") || "").join("\n");
    const scriptText = [...doc.querySelectorAll("script")].map((s) => s.textContent).join("\n");
    const ctxResult = check.run({ doc, styleText, scriptText });
    if (ctxResult.ok) {
      playCorrect();
      const next = { ...checked, [projectId]: [...passed, currentStage] };
      saveChecked(next);
      setFeedback({ ...feedback, [projectId]: { ok: true, message: ctxResult.message } });
      if (next[projectId].length === checks.length) {
        confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 }, colors: ["#f472b6", "#fde047", "#38bdf8", "#a78bfa", "#86efac"] });
      }
    } else {
      playWrong();
      setFeedback({ ...feedback, [projectId]: { ok: false, message: ctxResult.message, hint: check.hint } });
    }
  };

  return (
    <div className="panel">
      <div className="breadcrumb">🏠 Beranda › <b>Proyek Mini</b></div>
      <h2 style={{ marginTop: 0 }}><span className="title-underline">🏗️ Proyek Mini</span></h2>

      {/* Cara main — sama untuk semua proyek */}
      <div className="info" style={{ borderColor: "#bbf7d0", background: "#f0fdf4" }}>
        <b style={{ color: "#15803d" }}>📖 Cara Main (4 Langkah)</b>
        <ol style={{ margin: ".35rem 0 0", paddingLeft: "1.3rem", fontSize: ".8rem", lineHeight: 1.9, color: "#166534" }}>
          {STEPS.map((s, i) => <li key={i}><b>{s.emoji} {s.title}</b> — {s.desc}</li>)}
        </ol>
      </div>

      <p style={{ fontSize: ".82rem", color: "#0369a1" }}>3 proyek, 5 tahap per proyek. Sistem <b>auto-cek</b> kodemu — tahap tercentang otomatis kalau kodenya benar.</p>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: ".6rem" }}>
        <button className="btn" style={{ fontSize: ".7rem", opacity: 0.85 }}
          onClick={() => { const next = !unlockAll; localStorage.setItem("htmlpedia-unlock-all", next ? "1" : "0"); setUnlockAll(next); }}>
          {unlockAll ? "🔒 Tutup Semua (kunci lagi)" : "🔓 Buka Semua (cek — sementara)"}
        </button>
      </div>

      {PROJECTS.map((p) => {
        const unlocked = unlockAll || doneCount >= p.need;
        const passed = checked[p.id] || [];
        const totalStages = PROJECT_CHECKS[p.id].length;
        const currentStage = passed.length;
        const complete = passed.length === totalStages;
        const pct = Math.round((passed.length / totalStages) * 100);

        return (
          <div key={p.id} style={{
            border: `3px solid ${complete ? "#86efac" : unlocked ? "#a78bfa" : "#e2e8f0"}`,
            background: complete ? "#f0fdf4" : unlocked ? "#faf5ff" : "#f8fafc",
            borderRadius: 20, padding: "1rem 1.2rem", marginBottom: "1rem",
            opacity: unlocked ? 1 : 0.75,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".7rem", flexWrap: "wrap" }}>
              <div style={{ fontSize: "2.2rem" }}>{p.emoji}</div>
              <div>
                <div style={{ fontWeight: 900, color: "#0c4a6e" }}>{p.name} <span style={{ fontSize: ".65rem", background: "#ede9fe", color: "#6d28d9", borderRadius: 6, padding: ".1rem .4rem", verticalAlign: "middle" }}>{p.tag}</span></div>
                <div style={{ fontSize: ".72rem", color: "#64748b" }}>{complete ? "🏆 TUNTAS!" : unlocked ? `Terbuka ✓ — Tahap ${Math.min(currentStage + 1, totalStages)} dari ${totalStages}` : `🔒 Butuh ${p.need} materi selesai (kamu: ${doneCount})`}</div>
              </div>
              {unlocked && <div style={{ marginLeft: "auto", fontWeight: 800, color: complete ? "#15803d" : "#6d28d9" }}>{complete ? "100% 🎉" : `${pct}%`}</div>}
            </div>

            {unlocked && (
              <>
                <p style={{ fontSize: ".85rem", color: "#334155", margin: ".5rem 0 .4rem" }}>{p.desc}</p>

                {/* Target hasil (mockup) */}
                <div style={{ background: "#f8fafc", border: "2px dashed #cbd5e1", borderRadius: 14, padding: ".5rem .7rem", marginBottom: ".6rem" }}>
                  <div style={{ fontSize: ".72rem", fontWeight: 800, color: "#0369a1", marginBottom: ".3rem" }}>🎯 Target Hasil (contoh)</div>
                  {p.preview}
                </div>

                {/* Starter template */}
                <div style={{ marginBottom: ".6rem" }}>
                  <div style={{ fontSize: ".72rem", fontWeight: 800, color: "#4f46e5", marginBottom: ".3rem" }}>📋 Starter Template (salin ke CodePen)</div>
                  <pre className="code" style={{ margin: 0, fontSize: ".68rem", maxHeight: 150, overflow: "auto" }}>{p.template}</pre>
                  <div style={{ marginTop: ".3rem" }}><CopyBtn text={p.template} label="📋 Salin Starter" /></div>
                </div>

                {/* Daftar tahap */}
                {PROJECT_CHECKS[p.id].map((c, i) => {
                  const doneItem = passed.includes(i);
                  const isCurrent = i === currentStage;
                  const locked = i > currentStage;
                  return (
                    <div key={c.id} style={{
                      display: "flex", gap: ".5rem", alignItems: "flex-start",
                      padding: ".4rem .5rem", borderRadius: 10, marginBottom: ".35rem",
                      background: doneItem ? "#dcfce7" : isCurrent ? "#fffbeb" : "#f1f5f9",
                      border: doneItem ? "2px solid #86efac" : isCurrent ? "2px dashed #f59e0b" : "2px solid transparent",
                    }}>
                      <span style={{ fontSize: "1rem" }}>{doneItem ? "✅" : isCurrent ? "👉" : "🔒"}</span>
                      <div style={{ fontSize: ".8rem", color: locked ? "#94a3b8" : "#334155" }}>
                        <b>Tahap {i + 1}:</b> {c.label}
                        {isCurrent && <div style={{ fontSize: ".68rem", color: "#b45309", marginTop: ".2rem" }}>💡 {c.hint}</div>}
                      </div>
                    </div>
                  );
                })}

                {/* Area tempel kode — hanya tahap aktif */}
                {!complete && (
                  <div style={{ marginTop: ".6rem" }}>
                    <label style={{ fontSize: ".75rem", fontWeight: 800, color: "#0369a1" }}>📤 Tempel kode kamu di sini (HTML lengkap + CSS/JS inline):</label>
                    <textarea
                      value={codes[p.id] || ""}
                      onChange={(e) => setCode(p.id, e.target.value)}
                      spellCheck={false}
                      placeholder={"<!DOCTYPE html>\n<html lang=\"id\">\n..."}
                      style={{ width: "100%", minHeight: 150, fontFamily: "Consolas, monospace", fontSize: ".8rem", border: "2px solid #bae6fd", borderRadius: 12, padding: ".6rem", background: "#0c4a6e", color: "#bae6fd", lineHeight: 1.6, marginTop: ".3rem" }}
                    />
                    <div style={{ display: "flex", gap: ".4rem", marginTop: ".4rem", flexWrap: "wrap" }}>
                      <button className="btn primary" onClick={() => runCheck(p.id)}>🔍 Cek Kode — Tahap {currentStage + 1}</button>
                      <button className="btn" onClick={() => { setCode(p.id, p.sampleCode); setFeedback({ ...feedback, [p.id]: undefined }); }}>✨ Isi Contoh Kode</button>
                    </div>
                    {feedback[p.id] && (
                      <div style={{ marginTop: ".4rem", padding: ".5rem .7rem", borderRadius: 12, fontSize: ".8rem", background: feedback[p.id].ok ? "#dcfce7" : "#fee2e2", color: feedback[p.id].ok ? "#15803d" : "#b91c1c", border: `2px solid ${feedback[p.id].ok ? "#86efac" : "#fca5a5"}` }}>
                        {feedback[p.id].message}
                        {!feedback[p.id].ok && feedback[p.id].hint && <div style={{ marginTop: ".3rem", fontSize: ".72rem", color: "#92400e" }}>💡 Contoh: <code>{feedback[p.id].hint}</code></div>}
                      </div>
                    )}
                  </div>
                )}

                {complete && <div style={{ textAlign: "center", fontSize: "1.1rem", fontWeight: 900, color: "#15803d", padding: ".5rem" }}>🏆 Semua tahap selesai — proyek tuntas!</div>}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
