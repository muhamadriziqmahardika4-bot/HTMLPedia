// Halaman profil pengguna — avatar, nama, username, tanggal gabung + statistik belajar
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { getProfile, updateProfile } from "../lib/profiles.js";
import { getStreak } from "../lib/streak.js";
import { ALL_ORDERED } from "../data/all.js";
import { PROJECT_CHECKS } from "../lib/codeCheck.js";

const AVATARS = ["🧝", "🦊", "🐱", "🐼", "🐸", "🤖", "🦄", "🐯", "🐳", "🦉", "🐲", "👾"];

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : fallback;
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(undefined); // undefined = memuat
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("🧝");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!user?.id) return;
    let alive = true;
    getProfile(user.id).then((p) => {
      if (!alive) return;
      setProfile(p);
      setFullName(p?.full_name || "");
      setAvatar(p?.avatar || "🧝");
    });
    return () => { alive = false; };
  }, [user?.id]);

  // ===== Statistik belajar (dari data lokal yang sudah tersinkron di akun) =====
  const done = readJSON("htmlpedia-progress", []).filter((s) => typeof s === "string");
  const totalMateri = Array.isArray(ALL_ORDERED) ? ALL_ORDERED.length : 141;
  const streak = getStreak();
  const quiz = readJSON("htmlpedia-quiz", {});
  const bestStages = Object.values(quiz).filter((v) => typeof v === "number").reduce((a, b) => a + b, 0);
  const projects = readJSON("htmlpedia-projects", {});
  const proyTuntas = Object.entries(projects).filter(([id, stages]) => {
    const total = PROJECT_CHECKS[id]?.length ?? 0;
    return total > 0 && Array.isArray(stages) && stages.length >= total;
  }).length;
  const totalProyek = Object.keys(PROJECT_CHECKS).length;

  const save = async () => {
    if (!user?.id) return;
    setSaving(true);
    setNotice("");
    try {
      await updateProfile({ id: user.id, full_name: fullName.trim(), avatar });
      setProfile((p) => ({ ...(p || {}), full_name: fullName.trim(), avatar }));
      setEditing(false);
      setNotice("Profil tersimpan ✨");
    } catch (e) {
      setNotice("Gagal menyimpan: " + (e?.message || e));
    } finally {
      setSaving(false);
    }
  };

  if (profile === undefined) {
    return (
      <div className="panel" style={{ textAlign: "center", padding: "2rem" }}>
        <p style={{ color: "var(--deep)", fontWeight: 800 }}>Memuat profil…</p>
      </div>
    );
  }

  const joined = profile?.created_at ? new Date(profile.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "—";
  const shownName = profile?.full_name || "Pengguna HTMLpedia";
  const shownUsername = profile?.username || (user?.email ? user.email.split("@")[0] : "");

  return (
    <div className="panel" style={{ padding: "1.4rem 1.3rem" }}>
      {/* ===== Kepala profil ===== */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ fontSize: "4rem", lineHeight: 1, background: "#e0f2fe", border: "2.5px solid var(--sky)", borderRadius: 20, padding: ".5rem .7rem" }}>
          {avatar}
        </div>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ fontSize: "1.5rem", color: "var(--deep)", margin: 0 }}>{shownName}</h1>
          <p style={{ fontSize: ".82rem", color: "#0284c7", fontWeight: 800, margin: ".15rem 0" }}>@{shownUsername}</p>
          <p style={{ fontSize: ".72rem", color: "#64748b", margin: 0 }}>Bergabung sejak {joined}</p>
        </div>
        <button className="btn" style={{ marginLeft: "auto", fontSize: ".78rem" }} onClick={() => setEditing((v) => !v)}>
          {editing ? "✕ Tutup" : "✏️ Edit profil"}
        </button>
      </div>

      {/* ===== Edit ===== */}
      {editing && (
        <div style={{ marginTop: "1rem", background: "#f8fafc", border: "1.5px solid var(--border)", borderRadius: 14, padding: ".8rem" }}>
          <p style={{ fontSize: ".78rem", fontWeight: 800, color: "var(--deep)", margin: "0 0 .4rem" }}>Pilih avatar</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: ".6rem" }}>
            {AVATARS.map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                aria-pressed={avatar === a}
                style={{
                  fontSize: "1.4rem", padding: ".3rem .5rem", borderRadius: 10, cursor: "pointer",
                  border: avatar === a ? "2.5px solid var(--sky)" : "2px solid transparent",
                  background: avatar === a ? "#e0f2fe" : "#fff",
                }}
              >
                {a}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nama panggilan"
            style={{
              width: "100%", boxSizing: "border-box", fontSize: ".95rem",
              padding: ".6rem .8rem", borderRadius: 10, border: "2px solid var(--border)",
              outline: "none", fontFamily: "inherit", marginBottom: ".5rem",
            }}
          />
          <button className="btn primary" onClick={save} disabled={saving} style={{ fontSize: ".82rem", padding: ".5rem 1.1rem", borderRadius: 10 }}>
            {saving ? "Menyimpan…" : "💾 Simpan"}
          </button>
          {notice && <span style={{ fontSize: ".75rem", marginLeft: ".6rem", color: "#0284c7", fontWeight: 700 }}>{notice}</span>}
        </div>
      )}

      {/* ===== Statistik ===== */}
      <p className="section-title" style={{ marginTop: "1.4rem" }}>Statistik belajarmu</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: ".6rem" }}>
        {[
          { emoji: "📚", label: "Materi selesai", value: `${done.length}/${totalMateri}` },
          { emoji: "🔥", label: "Streak terbaik", value: `${streak.best} hari` },
          { emoji: "⚡", label: "Streak sekarang", value: `${streak.current} hari` },
          { emoji: "🎯", label: "Kuis stage (total)", value: bestStages },
          { emoji: "🏗️", label: "Proyek Mini tuntas", value: `${proyTuntas}/${totalProyek}` },
        ].map((s) => (
          <div key={s.label} style={{ background: "#f0f9ff", border: "1.5px solid var(--border)", borderRadius: 14, padding: ".7rem .6rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.6rem" }}>{s.emoji}</div>
            <div style={{ fontSize: "1.15rem", fontWeight: 900, color: "var(--deep)" }}>{s.value}</div>
            <div style={{ fontSize: ".62rem", color: "#64748b", fontWeight: 700 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {!editing && notice && (
        <p style={{ fontSize: ".75rem", color: "#0284c7", fontWeight: 700, marginTop: ".7rem" }}>{notice}</p>
      )}
    </div>
  );
}
