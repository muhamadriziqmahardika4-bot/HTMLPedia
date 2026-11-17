// [Pemilik] Daftar semua saran & masukan yang masuk
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listFeedback, deleteFeedback } from "../lib/feedback.js";
import { OWNER_EMAIL } from "../lib/supabase.js";
import { useAuth } from "../hooks/useAuth.js";

export default function SaranAdmin() {
  const { user } = useAuth();
  const isOwner = Boolean(user?.email && OWNER_EMAIL && user.email.toLowerCase() === OWNER_EMAIL);
  const [items, setItems] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOwner) return;
    let alive = true;
    listFeedback()
      .then((d) => { if (alive) setItems(d); })
      .catch((e) => { if (alive) setError(e?.message || "Gagal memuat laporan."); });
    return () => { alive = false; };
  }, [isOwner]);

  if (!isOwner) {
    return (
      <div className="panel" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
        <div style={{ fontSize: "2.5rem" }}>🔒</div>
        <h2 style={{ color: "var(--deep)" }}>Halaman khusus pemilik</h2>
        <p style={{ color: "#64748b" }}>Hanya pemilik HTMLpedia yang bisa melihat laporan saran.</p>
        <Link to="/saran" className="pill active" style={{ display: "inline-block", textDecoration: "none", marginTop: ".6rem" }}>💬 Kirim saran</Link>
      </div>
    );
  }

  const remove = async (id) => {
    try {
      await deleteFeedback(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setConfirmId(null);
    } catch (e) {
      setError(e?.message || "Gagal menghapus.");
    }
  };

  return (
    <div className="panel" style={{ padding: "1.2rem 1.1rem", maxWidth: 640, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: ".5rem", flexWrap: "wrap", marginBottom: ".3rem" }}>
        <h1 style={{ fontSize: "1.35rem", color: "var(--deep)", margin: 0 }}>📬 Laporan Saran & Masukan</h1>
        <Link to="/saran" className="pill" style={{ textDecoration: "none", fontSize: ".75rem" }}>💬 Kirim saran</Link>
      </div>
      <p style={{ fontSize: ".8rem", color: "#64748b", margin: "0 0 .8rem" }}>
        {items ? `${items.length} laporan masuk` : "…"} — semua yang dikirim lewat Kotak Saran terkumpul di sini.
      </p>

      {error && <p style={{ color: "#dc2626", fontWeight: 700, fontSize: ".8rem" }}>{error}</p>}

      {items === null ? (
        <p style={{ color: "var(--deep)", fontWeight: 800 }}>Memuat laporan…</p>
      ) : items.length === 0 ? (
        <p style={{ color: "#64748b" }}>Belum ada saran masuk. Bagikan link situsmu biar teman-teman nulis 😄</p>
      ) : (
        <div style={{ display: "grid", gap: ".55rem" }}>
          {items.map((i) => {
            const d = new Date(i.created_at);
            return (
              <div key={i.id} style={{
                background: "linear-gradient(160deg, #f0f9ff, #fdf4ff 65%, #fef9c3)",
                border: "2px solid #ffffff",
                borderRadius: 16,
                padding: ".55rem .65rem",
                boxShadow: "0 4px 12px rgba(12,74,110,.18)",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: ".5rem", flexWrap: "wrap", marginBottom: ".2rem" }}>
                  <p style={{ margin: 0, fontSize: ".78rem", fontWeight: 900, color: "#0284c7" }}>@{i.username || "anonim"}</p>
                  <span style={{ fontSize: ".62rem", color: "#64748b", fontWeight: 700 }}>
                    {d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} · {d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: ".82rem", color: "#0c4a6e", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{i.message}</p>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: ".4rem" }}>
                  {confirmId === i.id ? (
                    <span style={{ display: "inline-flex", gap: ".4rem", alignItems: "center" }}>
                      <span style={{ fontSize: ".7rem", fontWeight: 700, color: "#b91c1c" }}>Hapus laporan ini?</span>
                      <button className="btn danger" style={{ fontSize: ".68rem", padding: ".25rem .6rem" }} onClick={() => remove(i.id)}>Ya, hapus</button>
                      <button className="btn" style={{ fontSize: ".68rem", padding: ".25rem .6rem" }} onClick={() => setConfirmId(null)}>Batal</button>
                    </span>
                  ) : (
                    <button className="btn danger" style={{ fontSize: ".68rem", padding: ".25rem .6rem", opacity: .85 }} onClick={() => setConfirmId(i.id)}>🗑️ Hapus</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
