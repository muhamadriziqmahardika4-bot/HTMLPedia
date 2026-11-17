// Gerbang login — aplikasi wajib login (magic link email via Supabase).
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import { usernameToEmail, validateUsername } from "../lib/profiles.js";

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
  const [mode, setMode] = useState("email"); // "email" | "username"
  const [email, setEmail] = useState("");
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [message, setMessage] = useState("");

  const submitUsername = async (e) => {
    e.preventDefault();
    const u = uname.trim().toLowerCase();
    const uErr = validateUsername(u);
    if (uErr) { setStatus("error"); setMessage(uErr); return; }
    setStatus("sending");
    setMessage("");
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: usernameToEmail(u),
        password,
      });
      if (error) throw error;
      // sesi tercipta — onAuthStateChange membawa masuk otomatis
    } catch {
      setStatus("error");
      setMessage("Username atau password salah.");
    }
  };

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

  const [code, setCode] = useState("");
  const [verifyErr, setVerifyErr] = useState("");

  const verifyCode = async (e) => {
    e.preventDefault();
    const clean = code.trim();
    if (!/^\d{8}$/.test(clean)) {
      setVerifyErr("Masukkan 8 angka kode dari email, ya.");
      return;
    }
    setVerifyErr("");
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: clean,
        type: "email",
      });
      if (error) throw error;
      // sesi tercipta — onAuthStateChange akan membawa pengguna masuk otomatis
    } catch (err) {
      setVerifyErr(err?.message || "Kode salah atau kedaluwarsa. Coba kode yang baru.");
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
          <p style={{ fontSize: ".85rem", color: "var(--text)", marginBottom: ".7rem" }}>
            Masuk dulu — progress belajarmu akan tersimpan rapi di akunmu.
          </p>

          {status !== "sent" && (
            <div style={{ display: "flex", gap: ".4rem", marginBottom: ".9rem" }} role="tablist">
              {[
                { key: "email", label: "📧 Email" },
                { key: "username", label: "👤 Username" },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={mode === t.key}
                  onClick={() => { setMode(t.key); setStatus("idle"); setMessage(""); }}
                  style={{
                    flex: 1, padding: ".5rem", borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
                    fontWeight: 800, fontSize: ".85rem",
                    border: mode === t.key ? "2px solid var(--sky)" : "2px solid var(--border)",
                    background: mode === t.key ? "#e0f2fe" : "#fff",
                    color: mode === t.key ? "#0369a1" : "#64748b",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {status === "sent" ? (
            <div>
              <div style={{ fontSize: "2rem" }}>📬</div>
              <p style={{ fontWeight: 800, color: "var(--deep)" }}>Cek emailmu!</p>
              <p style={{ fontSize: ".83rem", color: "var(--text)", lineHeight: 1.6 }}>
                Kami sudah mengirim email ke <strong>{email.trim().toLowerCase()}</strong>.<br />
                Klik link di email — <strong>atau</strong> ketik kode 8 angka di bawah di sini:
              </p>
              <form onSubmit={verifyCode} style={{ marginTop: ".7rem" }}>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  placeholder="Kode 8 angka"
                  autoFocus
                  style={{
                    width: "100%", boxSizing: "border-box", fontSize: "1.6rem",
                    letterSpacing: ".45rem", textAlign: "center", fontFamily: "monospace",
                    padding: ".6rem .5rem .6rem 1rem", borderRadius: 12,
                    border: "2px solid var(--border)", outline: "none", marginBottom: ".6rem",
                  }}
                />
                <button type="submit" className="btn primary" style={{ width: "100%", fontSize: ".9rem", padding: ".7rem", borderRadius: 12, fontWeight: 800 }}>
                  ✅ Masuk dengan kode
                </button>
                {verifyErr && (
                  <p style={{ color: "#dc2626", fontSize: ".8rem", marginTop: ".5rem", fontWeight: 700 }}>{verifyErr}</p>
                )}
              </form>
              <button className="btn" style={{ marginTop: ".7rem" }} onClick={() => { setStatus("idle"); setEmail(""); setCode(""); }}>
                ← Pakai email lain
              </button>
            </div>
          ) : mode === "email" ? (
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
          ) : (
            <form onSubmit={submitUsername}>
              <input
                type="text"
                value={uname}
                onChange={(e) => setUname(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20))}
                placeholder="username"
                autoFocus
                autoComplete="username"
                required
                style={{
                  width: "100%", boxSizing: "border-box", fontSize: "1rem",
                  padding: ".7rem .9rem", borderRadius: 12, border: "2px solid var(--border)",
                  outline: "none", fontFamily: "inherit", marginBottom: ".6rem",
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                autoComplete="current-password"
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
                {status === "sending" ? "Memeriksa…" : "👤 Masuk"}
              </button>
              {status === "error" && (
                <p style={{ color: "#dc2626", fontSize: ".8rem", marginTop: ".6rem", fontWeight: 700 }}>{message}</p>
              )}
            </form>
          )}

          {status !== "sent" && (
            <>
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
              <p style={{ fontSize: ".78rem", color: "var(--text)", marginTop: ".7rem" }}>
                Belum punya akun?{" "}
                <Link to="/daftar" style={{ color: "var(--sky)", fontWeight: 800, textDecoration: "none" }}>Buat akun di sini</Link>
              </p>
            </>
          )}
          <p style={{ fontSize: ".68rem", color: "#94a3b8", marginTop: "1rem" }}>
            Tanpa password · Progress tersimpan di akun · Aman & gratis
          </p>
        </div>
      </div>
    </div>
  );
}
