// Daftar anggota HTMLpedia — khusus pemilik
import React, { useEffect, useState } from "react";
import { supabase, OWNER_EMAIL } from "../lib/supabase.js";
import Avatar from "../components/Avatar.jsx";
import { useAuth } from "../hooks/useAuth.js";

function formatDate(s) {
  if (!s) return "—";
  const d = new Date(s);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}
function formatDateTime(s) {
  if (!s) return "Belum pernah";
  const d = new Date(s);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) +
    " · " + d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
}

export default function Anggota() {
  const { user } = useAuth();
  const isOwner = Boolean(user?.email && OWNER_EMAIL && user.email.toLowerCase() === OWNER_EMAIL);
  const [rows, setRows] = useState(null);

  useEffect(() => {
    if (!isOwner) return;
    let alive = true;
    (async () => {
      const { data: profiles } = await supabase.from("profiles").select("*").order("created_at", { ascending: true });
      const { data: progs } = await supabase.from("user_progress").select("user_id, data");
      if (!alive) return;
      const progMap = {};
      for (const p of progs || []) {
        const arr = p?.data?.["htmlpedia-progress"];
        progMap[p.user_id] = Array.isArray(arr) ? arr.length : 0;
      }
      setRows((profiles || []).map((p) => ({ ...p, selesai: progMap[p.id] ?? 0 })));
    })();
    return () => { alive = false; };
  }, [isOwner]);

  if (!isOwner) {
    return (
      <div className="panel" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
        <div style={{ fontSize: "2.5rem" }}>🔒</div>
        <h2 style={{ color: "var(--deep)" }}>Halaman khusus pemilik</h2>
        <p style={{ color: "#64748b" }}>Hanya pemilik HTMLpedia yang bisa membuka daftar anggota.</p>
      </div>
    );
  }

  return (
    <div className="panel" style={{ padding: "1rem 1rem", maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.4rem", color: "var(--deep)", margin: "0 0 .1rem" }}>👥 Anggota HTMLpedia</h1>
      <p style={{ fontSize: ".8rem", color: "#64748b", margin: "0 0 .8rem" }}>
        {rows ? rows.length : "…"} anggota terdaftar
      </p>

      {rows === null ? (
        <p style={{ color: "var(--deep)", fontWeight: 800 }}>Memuat daftar anggota…</p>
      ) : rows.length === 0 ? (
        <p style={{ color: "#64748b" }}>Belum ada yang daftar — bagikan link situsmu dulu 😄</p>
      ) : (
        <div style={{ display: "grid", gap: ".55rem" }}>
          {rows.map((p) => {
            const online = p.last_seen && Date.now() - new Date(p.last_seen).getTime() < 15 * 60 * 1000;
            return (
              <div key={p.id} style={{
                display: "flex",
                alignItems: "center",
                gap: ".7rem",
                background: "linear-gradient(155deg, #f0f9ff, #fdf4ff 62%, #fef9c3)",
                border: "2.5px solid #ffffff",
                borderRadius: 16,
                padding: ".55rem .65rem",
                boxShadow: "0 4px 14px rgba(12,74,110,.2), inset 0 2px 5px rgba(255,255,255,.9)",
              }}>
                {/* Avatar dengan border yang sama dipakai di profilnya */}
                <Avatar id={p.avatar} border={p.border_style || "classic"} size={58} title={p.full_name || "avatar"} />

                {/* Identitas */}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".4rem", flexWrap: "wrap" }}>
                    <p style={{ fontWeight: 900, color: "var(--deep)", margin: 0, fontSize: ".88rem" }}>{p.full_name || "Pengguna HTMLpedia"}</p>
                    <span style={{
                      fontSize: ".6rem", fontWeight: 800, borderRadius: 999, padding: ".15rem .45rem",
                      color: online ? "#15803d" : "#64748b",
                      background: online ? "#dcfce7" : "#f1f5f9",
                    }}>
                      {online ? "● Online" : "○ Offline"}
                    </span>
                  </div>
                  <p style={{ fontSize: ".68rem", color: "#0284c7", fontWeight: 800, margin: ".1rem 0 .25rem" }}>@{p.username}</p>
                  <div style={{ fontSize: ".64rem", color: "#475569", lineHeight: 1.55 }}>
                    <div>📅 <b>Bergabung:</b> {formatDate(p.created_at)}</div>
                    <div>🕐 <b>Terakhir login:</b> {formatDateTime(p.last_seen)}</div>
                  </div>
                </div>

                {/* Statistik */}
                <div style={{ flexShrink: 0, textAlign: "center" }}>
                  <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "var(--deep)" }}>{p.selesai}</div>
                  <div style={{ fontSize: ".55rem", fontWeight: 800, color: "#0369a1", background: "#e0f2fe", borderRadius: 8, padding: ".15rem .4rem" }}>materi selesai</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p style={{ fontSize: ".68rem", color: "#94a3b8", marginTop: "1rem" }}>
        Email tidak ditampilkan demi privasi — daftar email tersedia di Supabase → Authentication → Users.
      </p>
    </div>
  );
}
