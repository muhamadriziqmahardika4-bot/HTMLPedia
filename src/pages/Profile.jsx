// Halaman profil pengguna — avatar, nama, username, tanggal gabung + statistik belajar
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { getProfile, updateProfile, createProfile, validateUsername } from "../lib/profiles.js";
import { getStreak } from "../lib/streak.js";
import { ALL_ORDERED } from "../data/all.js";
import { PROJECT_CHECKS } from "../lib/codeCheck.js";

import Avatar from "../components/Avatar.jsx";
import AvatarPicker from "../components/AvatarPicker.jsx";

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
  const [avatar, setAvatar] = useState("alan");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [creating, setCreating] = useState(false);
  const [createErr, setCreateErr] = useState("");

  const create = async (e) => {
    e.preventDefault();
    const u = newUsername.trim().toLowerCase();
    const err = validateUsername(u);
    if (err) { setCreateErr(err); return; }
    if (!fullName.trim()) { setCreateErr("Isi nama panggilanmu dulu 🙂"); return; }
    setCreating(true);
    setCreateErr("");
    try {
      await createProfile({ id: user.id, username: u, full_name: fullName.trim(), avatar });
      setProfile({ id: user.id, username: u, full_name: fullName.trim(), avatar, created_at: new Date().toISOString() });
    } catch (e2) {
      const msg = String(e2?.message || e2);
      setCreateErr(/duplicate|unique/i.test(msg) ? "Username itu sudah dipakai orang. Coba yang lain." : "Gagal menyimpan: " + msg);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    let alive = true;
    getProfile(user.id).then((p) => {
      if (!alive) return;
      setProfile(p);
      setFullName(p?.full_name || "");
      setAvatar(p?.avatar || "alan");
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

  // ===== Onboarding: belum punya profil → lengkapi dulu =====
  if (profile === null) {
    return (
      <div className="panel" style={{ padding: "1.15rem 1.1rem", maxWidth: 430, textAlign: "center" }}>
        <div style={{ fontSize: "2.2rem" }}>👋</div>
        <h1 style={{ fontSize: "1.2rem", color: "var(--deep)", margin: ".2rem 0" }}>Hai, selamat datang!</h1>
        <p style={{ fontSize: ".85rem", color: "var(--text)", margin: "0 0 1rem" }}>
          Bikin profilmu dulu biar nanti bisa progres belajarmu tampil lengkap — pilih avatar, nama & username kamu 🍡
        </p>
        <form onSubmit={create}>
          <AvatarPicker value={avatar} onChange={setAvatar} columns={2} />

          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20))}
            placeholder="username (huruf kecil/angka/_)"
            required
            style={{
              width: "100%", boxSizing: "border-box", fontSize: "1rem",
              padding: ".65rem .9rem", borderRadius: 12, border: "2px solid var(--border)",
              outline: "none", fontFamily: "inherit", marginBottom: ".6rem",
            }}
          />
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="nama panggilan"
            required
            style={{
              width: "100%", boxSizing: "border-box", fontSize: "1rem",
              padding: ".65rem .9rem", borderRadius: 12, border: "2px solid var(--border)",
              outline: "none", fontFamily: "inherit", marginBottom: ".7rem",
            }}
          />
          <button
            type="submit"
            className="btn primary"
            disabled={creating}
            style={{ width: "100%", fontSize: ".95rem", padding: ".75rem", borderRadius: 12, fontWeight: 800 }}
          >
            {creating ? "Menyimpan…" : "🚀 Mulai belajar"}
          </button>
          {createErr && (
            <p style={{ color: "#dc2626", fontSize: ".8rem", marginTop: ".6rem", fontWeight: 700 }}>{createErr}</p>
          )}
        </form>
      </div>
    );
  }

  const joined = profile?.created_at ? new Date(profile.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "—";
  const shownName = profile?.full_name || "Pengguna HTMLpedia";
  const shownUsername = profile?.username || (user?.email ? user.email.split("@")[0] : "");

  return (
    <div className="panel" style={{ padding: ".9rem 1rem", maxWidth: 540, margin: "0 auto" }}>
      {/* ===== Kepala profil ===== */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: ".35rem" }}>
        <div style={{ lineHeight: 1 }}>
          <Avatar id={avatar} size={60} title="Avatar kamu" />
        </div>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ fontSize: "1.12rem", color: "var(--deep)", margin: 0 }}>{shownName}</h1>
          <p style={{ fontSize: ".74rem", color: "#0284c7", fontWeight: 800, margin: ".12rem 0" }}>@{shownUsername}</p>
          <p style={{ fontSize: ".66rem", color: "#64748b", margin: 0 }}>Bergabung sejak {joined}</p>
        </div>
        <button className="btn" style={{ fontSize: ".7rem", padding: ".32rem .7rem", marginTop: ".15rem" }} onClick={() => setEditing((v) => !v)}>
          {editing ? "✕ Tutup" : "✏️ Edit profil"}
        </button>
      </div>

      {/* ===== Edit ===== */}
      {editing && (
        <div style={{ marginTop: ".6rem", background: "#f8fafc", border: "1.5px solid var(--border)", borderRadius: 12, padding: ".55rem .55rem" }}>
          <p style={{ fontSize: ".78rem", fontWeight: 800, color: "var(--deep)", margin: "0 0 .4rem" }}>Pilih avatar</p>
          <AvatarPicker value={avatar} onChange={setAvatar} columns={2} />
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
      <p className="section-title" style={{ marginTop: ".9rem", marginBottom: ".4rem" }}>Statistik belajarmu</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(88px, 1fr))", gap: ".4rem" }}>
        {[
          { emoji: "📚", label: "Materi selesai", value: `${done.length}/${totalMateri}` },
          { emoji: "🔥", label: "Streak terbaik", value: `${streak.best} hari` },
          { emoji: "⚡", label: "Streak sekarang", value: `${streak.current} hari` },
          { emoji: "🎯", label: "Kuis stage (total)", value: bestStages },
          { emoji: "🏗️", label: "Proyek Mini tuntas", value: `${proyTuntas}/${totalProyek}` },
        ].map((s) => (
          <div key={s.label} style={{ background: "#f0f9ff", border: "1.5px solid var(--border)", borderRadius: 12, padding: ".42rem .35rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.1rem" }}>{s.emoji}</div>
            <div style={{ fontSize: ".88rem", fontWeight: 900, color: "var(--deep)" }}>{s.value}</div>
            <div style={{ fontSize: ".56rem", color: "#64748b", fontWeight: 700 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {!editing && notice && (
        <p style={{ fontSize: ".75rem", color: "#0284c7", fontWeight: 700, marginTop: ".7rem" }}>{notice}</p>
      )}
    </div>
  );
}
