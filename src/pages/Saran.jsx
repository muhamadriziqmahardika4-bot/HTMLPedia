// Kotak Saran & Masukan — semua anggota bisa kirim saran/laporan
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { submitFeedback } from "../lib/feedback.js";
import { getProfile } from "../lib/profiles.js";
import { OWNER_EMAIL } from "../lib/supabase.js";

export default function Saran() {
  const { user } = useAuth();
  const isOwner = Boolean(user?.email && OWNER_EMAIL && user.email.toLowerCase() === OWNER_EMAIL);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.id) return;
    let alive = true;
    getProfile(user.id).then((p) => {
      if (!alive) return;
      setUsername(p?.username || (user?.email ? user.email.split("@")[0] : "anonim"));
    });
    return () => { alive = false; };
  }, [user?.id]);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await submitFeedback({ userId: user?.id, username, message });
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err?.message || "Gagal mengirim saran. Coba lagi.");
    }
  };

  return (
    <div className="panel" style={{ padding: "1.3rem 1.2rem", maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: "2.4rem" }}>💬</div>
      <h1 style={{ fontSize: "1.35rem", color: "var(--deep)", margin: ".3rem 0 .1rem" }}>Kotak Saran & Masukan</h1>
      <p style={{ fontSize: ".82rem", color: "var(--text)", margin: "0 0 1rem" }}>
        Ada kritik, ide, atau laporan error? Tulis di sini — setiap saran akan dibaca pemilik HTMLpedia 🙏
      </p>

      {status === "done" ? (
        <div>
          <div style={{ fontSize: "2.6rem" }}>🎉</div>
          <p style={{ fontWeight: 900, color: "var(--deep)", fontSize: "1rem" }}>Terima kasih, masukannya sudah diterima!</p>
          <p style={{ fontSize: ".8rem", color: "#64748b" }}>Setiap laporan akan kami baca & jadikan perbaikan.</p>
          <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", marginTop: ".7rem", flexWrap: "wrap" }}>
            <button className="btn" onClick={() => { setMessage(""); setStatus("idle"); }}>✏️ Kirim lagi</button>
            <Link to="/" className="pill active" style={{ textDecoration: "none" }}>🏠 Beranda</Link>
            {isOwner && <Link to="/saran/daftar" className="pill" style={{ textDecoration: "none" }}>📬 Lihat laporan</Link>}
          </div>
        </div>
      ) : (
        <form onSubmit={submit}>
          <p style={{ fontSize: ".72rem", color: "#64748b", margin: "0 0 .4rem" }}>
            Kamu mengirim sebagai <b style={{ color: "#0284c7" }}>@{username || "…"}</b>
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Contoh: Tombol Kuis di HP nggak bisa diklik / avatar Alan kurang rapi / tolong tambahin materi tentang tabel…"
            required
            maxLength={2000}
            rows={6}
            style={{
              width: "100%", boxSizing: "border-box", fontSize: ".9rem",
              padding: ".7rem .8rem", borderRadius: 14, border: "2px solid var(--border)",
              outline: "none", fontFamily: "inherit", lineHeight: 1.6, resize: "vertical",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: ".35rem", fontSize: ".68rem", color: "#94a3b8" }}>
            <span>{message.length}/2000 karakter</span>
            <span>Jujur aja, kami baca semuanya 😄</span>
          </div>
          <button
            type="submit"
            className="btn primary"
            disabled={status === "sending" || !message.trim()}
            style={{ width: "100%", marginTop: ".6rem", fontSize: ".92rem", padding: ".7rem", borderRadius: 12, fontWeight: 800 }}
          >
            {status === "sending" ? "Mengirim…" : "📮 Kirim saran"}
          </button>
          {status === "error" && (
            <p style={{ color: "#dc2626", fontSize: ".8rem", marginTop: ".55rem", fontWeight: 700 }}>{error}</p>
          )}
          {isOwner && (
            <p style={{ marginTop: ".7rem" }}>
              <Link to="/saran/daftar" className="pill" style={{ textDecoration: "none", fontSize: ".78rem" }}>📬 Lihat semua laporan (khusus pemilik)</Link>
            </p>
          )}
        </form>
      )}
    </div>
  );
}
