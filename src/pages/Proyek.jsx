import React, { useEffect, useState } from "react";
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

const PROJECTS = [
  {
    id: "biodata",
    emoji: "🧍",
    name: "Halaman Biodata",
    need: 5,
    tag: "HTML",
    desc: "Ceritakan dirimu di web. Ikuti tahapan — tempel kodemu di sini, sistem yang menilai.",
  },
  {
    id: "jadwal",
    emoji: "📅",
    name: "Jadwal Pelajaran",
    need: 20,
    tag: "HTML + CSS",
    desc: "Tabel jadwal yang berwarna dan hidup. Ikuti tahapan sampai tuntas.",
  },
  {
    id: "kuis",
    emoji: "⚡",
    name: "Kuis Interaktif",
    need: 50,
    tag: "JavaScript",
    desc: "Kuis pilihan ganda dengan skor akhir — logika asli. Ikuti tahapan sampai tuntas.",
  },
];

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
      <p style={{ fontSize: ".85rem", color: "#0369a1" }}>Buat kode kamu di <a href="https://codepen.io/" target="_blank" rel="noreferrer">CodePen</a> atau editor favoritmu → <b>tempel di sini</b> → sistem cek → centang otomatis → lanjut ke tahap berikutnya. 3 proyek, 5 tahap per proyek.</p>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: ".6rem" }}>
        <button className="btn" onClick={() => { const next = !unlockAll; localStorage.setItem("htmlpedia-unlock-all", next ? "1" : "0"); setUnlockAll(next); }}
          style={{ fontSize: ".7rem", opacity: 0.85 }}>
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

                {/* Area tempel kode — hanya untuk tahap yang sedang berjalan */}
                {!complete && (
                  <div style={{ marginTop: ".6rem" }}>
                    <label style={{ fontSize: ".75rem", fontWeight: 800, color: "#0369a1" }}>📋 Tempel kode kamu di sini (HTML lengkap + CSS/JS inline):</label>
                    <textarea
                      value={codes[p.id] || ""}
                      onChange={(e) => setCode(p.id, e.target.value)}
                      spellCheck={false}
                      placeholder={"<!DOCTYPE html>\n<html lang=\"id\">\n..."}
                      style={{ width: "100%", minHeight: 150, fontFamily: "Consolas, monospace", fontSize: ".8rem", border: "2px solid #bae6fd", borderRadius: 12, padding: ".6rem", background: "#0c4a6e", color: "#bae6fd", lineHeight: 1.6, marginTop: ".3rem" }}
                    />
                    <button className="btn primary" style={{ marginTop: ".4rem" }} onClick={() => runCheck(p.id)}>🔍 Cek Kode — Tahap {currentStage + 1}</button>
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
