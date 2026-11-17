// Gerbang login — aplikasi wajib login (magic link email via Supabase).
import React, { useState } from "react";
import { supabase } from "../lib/supabase.js";

export function LoadingScreen() {
  return (
    <div className="app splash-screen">
      <div className="splash-wrap">
        <div className="panel" style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "2rem" }}>🍡</div>
          <p style={{ fontWeight: 800, color: "var(--deep)", marginTop: ".5rem" }}>Memuat HTMLpedia…</p>
        </div>
      </div>
    </div>
  );
}

export function NotConfiguredScreen() {
  return (
    <div className="app splash-screen">
      <div className="splash-wrap">
        <div className="panel" style={{ maxWidth: 520, padding: "1.6rem 1.4rem" }}>
          <h2 style={{ fontSize: "1.2rem", color: "var(--deep)", margin: "0 0 .6rem" }}>⚙️ Belum siap dipakai</h2>
          <p style={{ fontSize: ".85rem", color: "var(--text)", lineHeight: 1.6 }}>
            HTMLpedia sekarang memakai <strong>wajib login</strong>, tapi koneksi ke Supabase
            belum dikonfigurasi di build ini. Buat project Supabase, lalu jalankan build
            dengan environment berikut:
          </p>
          <pre style={{ background: "#f0f9ff", border: "1.5px solid var(--border)", borderRadius: 10, padding: ".7rem .8rem", fontSize: ".72rem", overflowX: "auto" }}>
{`VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_OWNER_EMAIL=emailkamu@example.com`}
          </pre>
          <p style={{ fontSize: ".78rem", color: "#64748b", marginTop: ".6rem" }}>
            Panduan lengkap ada di <code>docs/supabase-setup.md</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setStatus("error");
      setMessage("Masukkan alamat email yang valid, ya.");
      return;
    }
    setStatus("sending");
    setMessage("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: clean,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) throw error;
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setMessage(err?.message || "Gagal mengirim magic link. Coba lagi sebentar.");
    }
  };

  const signInWithGoogle = async () => {
    setStatus("sending");
    setMessage("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
      // browser akan redirect ke halaman Google — tidak perlu set status
    } catch (err) {
      setStatus("error");
      setMessage(err?.message || "Gagal masuk dengan Google. Pastikan login Google sudah diaktifkan di Supabase.");
    }
  };

  return (
    <div className="app splash-screen">
      <div className="splash-wrap">
        <div className="panel" style={{ maxWidth: 460, width: "100%", padding: "1.8rem 1.6rem", textAlign: "center" }}>
          <div style={{ fontSize: "2.6rem" }}>🍡</div>
          <h1 style={{ fontSize: "1.5rem", color: "var(--deep)", margin: ".4rem 0 .2rem" }}>
            <span className="text-shimmer">HTMLpedia</span>
          </h1>
          <p style={{ fontSize: ".85rem", color: "var(--text)", marginBottom: "1.1rem" }}>
            Masuk dulu dengan email — progress belajarmu akan tersimpan rapi di akunmu.
          </p>

          {status === "sent" ? (
            <div>
              <div style={{ fontSize: "2rem" }}>📬</div>
              <p style={{ fontWeight: 800, color: "var(--deep)" }}>Cek emailmu!</p>
              <p style={{ fontSize: ".83rem", color: "var(--text)", lineHeight: 1.6 }}>
                Kami sudah mengirim <strong>magic link</strong> ke <strong>{email.trim().toLowerCase()}</strong>.
                Klik link di email itu — kamu langsung masuk, tanpa password.
              </p>
              <button className="btn" style={{ marginTop: ".8rem" }} onClick={() => { setStatus("idle"); setEmail(""); }}>
                ← Pakai email lain
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                autoFocus
                required
                style={{
                  width: "100%", boxSizing: "border-box", fontSize: "1rem",
                  padding: ".7rem .9rem", borderRadius: 12, border: "2px solid var(--border)",
                  outline: "none", fontFamily: "inherit", marginBottom: ".7rem",
                }}
              />
              <button
                type="submit"
                className="btn primary"
                disabled={status === "sending"}
                style={{ width: "100%", fontSize: ".95rem", padding: ".7rem", borderRadius: 12, fontWeight: 800 }}
              >
                {status === "sending" ? "Mengirim…" : "✉️ Kirim magic link"}
              </button>
              {status === "error" && (
                <p style={{ color: "#dc2626", fontSize: ".8rem", marginTop: ".6rem", fontWeight: 700 }}>{message}</p>
              )}
            </form>
          ) : null}

          <div style={{ display: "flex", alignItems: "center", gap: ".6rem", margin: ".9rem 0" }}>
            <div style={{ flex: 1, height: 1.5, background: "var(--border)" }} />
            <span style={{ fontSize: ".68rem", color: "#94a3b8", fontWeight: 700 }}>ATAU</span>
            <div style={{ flex: 1, height: 1.5, background: "var(--border)" }} />
          </div>
          <button
            onClick={signInWithGoogle}
            disabled={status === "sending"}
            style={{
              width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: ".6rem",
              background: "#fff", border: "2px solid #cbd5e1", borderRadius: 12, padding: ".68rem",
              fontWeight: 800, fontSize: ".9rem", color: "#1f2937", cursor: "pointer", fontFamily: "inherit",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.2 35.1 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4 5.7l6.3 5.2C36.9 36.6 44 31.4 44 24c0-1.3-.1-2.6-.4-3.9z"/>
            </svg>
            Masuk dengan Google
          </button>
          <p style={{ fontSize: ".68rem", color: "#94a3b8", marginTop: "1rem" }}>
            Tanpa password · Progress tersimpan di akun · Aman & gratis
          </p>
        </div>
      </div>
    </div>
  );
}
