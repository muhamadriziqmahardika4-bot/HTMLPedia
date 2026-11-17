// Halaman daftar — username + password + nama + pilih avatar emoji
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import { validateUsername, usernameToEmail, createProfile } from "../lib/profiles.js";
import Avatar, { AVATAR_CHOICES } from "../components/Avatar.jsx";
import AvatarPicker from "../components/AvatarPicker.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(AVATAR_CHOICES[0].id);
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const uname = username.trim().toLowerCase();
    const uErr = validateUsername(uname);
    if (uErr) { setStatus("error"); setMessage(uErr); return; }
    if (!fullName.trim()) { setStatus("error"); setMessage("Isi nama panggilanmu dulu ya 🙂"); return; }
    if (password.length < 6) { setStatus("error"); setMessage("Password minimal 6 karakter ya."); return; }

    setStatus("sending");
    setMessage("");
    try {
      const { data, error } = await supabase.auth.signUp({
        email: usernameToEmail(uname),
        password,
      });
      if (error) {
        if (/already registered|already been registered/i.test(error.message)) {
          throw new Error("Username itu sudah dipakai orang. Coba yang lain.");
        }
        throw error;
      }
      const userId = data?.user?.id;
      if (userId) {
        try {
          await createProfile({ id: userId, username: uname, full_name: fullName.trim(), avatar });
        } catch (pErr) {
          console.warn("Profil gagal dibuat:", pErr?.message || pErr);
        }
      }
      navigate("/profil", { replace: true });
    } catch (err) {
      setStatus("error");
      setMessage(err?.message || "Gagal membuat akun. Coba lagi.");
    }
  };

  return (
    <div className="app splash-screen">
      <div className="splash-wrap">
        <div className="panel" style={{ maxWidth: 460, width: "100%", padding: "1.8rem 1.6rem", textAlign: "center" }}>
          <div style={{ lineHeight: 1 }}><Avatar id={avatar} size={96} title="Avatar kamu" /></div>
          <h1 style={{ fontSize: "1.4rem", color: "var(--deep)", margin: ".4rem 0 .2rem" }}>Buat akun HTMLpedia</h1>
          <p style={{ fontSize: ".83rem", color: "var(--text)", marginBottom: "1rem" }}>
            Tanpa email — cukup username & password. Progress belajarmu tersimpan di akunmu.
          </p>

          <form onSubmit={submit}>
            <AvatarPicker value={avatar} onChange={setAvatar} columns={2} />


            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20))}
              placeholder="username (huruf kecil/angka/_)"
              autoFocus
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
                outline: "none", fontFamily: "inherit", marginBottom: ".6rem",
              }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password (min. 6 karakter)"
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
              disabled={status === "sending"}
              style={{ width: "100%", fontSize: ".95rem", padding: ".7rem", borderRadius: 12, fontWeight: 800 }}
            >
              {status === "sending" ? "Membuat akun…" : "🎉 Buat akun"}
            </button>
            {status === "error" && (
              <p style={{ color: "#dc2626", fontSize: ".8rem", marginTop: ".6rem", fontWeight: 700 }}>{message}</p>
            )}
          </form>

          <p style={{ fontSize: ".78rem", color: "var(--text)", marginTop: ".9rem" }}>
            Sudah punya akun? <Link to="/" style={{ color: "var(--sky)", fontWeight: 800, textDecoration: "none" }}>Masuk di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
