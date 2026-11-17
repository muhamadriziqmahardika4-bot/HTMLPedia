// Daftar anggota HTMLpedia — khusus pemilik
import React, { useEffect, useState } from "react";
import { supabase, OWNER_EMAIL } from "../lib/supabase.js";
import Avatar from "../components/Avatar.jsx";
import { useAuth } from "../hooks/useAuth.js";

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
    <div className="panel" style={{ padding: "1.3rem 1.2rem" }}>
      <h1 style={{ fontSize: "1.5rem", color: "var(--deep)", margin: "0 0 .2rem" }}>👥 Anggota HTMLpedia</h1>
      <p style={{ fontSize: ".8rem", color: "#64748b", margin: "0 0 1rem" }}>
        {rows ? rows.length : "…"} anggota terdaftar · progress mereka tersimpan di akun masing-masing
      </p>

      {rows === null ? (
        <p style={{ color: "var(--deep)", fontWeight: 800 }}>Memuat daftar anggota…</p>
      ) : rows.length === 0 ? (
        <p style={{ color: "#64748b" }}>Belum ada yang daftar — bagikan link situsmu dulu 😄</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: ".7rem" }}>
          {rows.map((p) => {
            const joined = p.created_at ? new Date(p.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "—";
            return (
              <div key={p.id} style={{ background: "#f0f9ff", border: "1.5px solid var(--border)", borderRadius: 16, padding: ".85rem .8rem", textAlign: "center" }}>
                <Avatar id={p.avatar} size={50} title={p.full_name || "avatar"} />
                <p style={{ fontWeight: 900, color: "var(--deep)", margin: ".25rem 0 .1rem", fontSize: ".85rem" }}>{p.full_name || "Pengguna HTMLpedia"}</p>
                <p style={{ fontSize: ".72rem", color: "#0284c7", fontWeight: 800, margin: "0 0 .3rem" }}>@{p.username}</p>
                <p style={{ fontSize: ".66rem", color: "#64748b", margin: 0 }}>Bergabung {joined}</p>
                <div style={{ marginTop: ".5rem", fontSize: ".72rem", fontWeight: 800, color: "#0369a1", background: "#e0f2fe", borderRadius: 999, display: "inline-block", padding: ".25rem .7rem" }}>
                  📚 {p.selesai} materi selesai
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p style={{ fontSize: ".68rem", color: "#94a3b8", marginTop: "1rem" }}>
        Email anggota tidak ditampilkan di sini demi privasi — daftar email lengkap tersedia di Supabase → Authentication → Users.
      </p>
    </div>
  );
}
