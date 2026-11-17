// Halaman daftar — username + password + nama + pilih avatar & border + import foto
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import { validateUsername, usernameToEmail, createProfile } from "../lib/profiles.js";
import Avatar, { AVATAR_CHOICES } from "../components/Avatar.jsx";
import AvatarPicker from "../components/AvatarPicker.jsx";
import BorderPicker from "../components/BorderPicker.jsx";
import PhotoCropper from "../components/PhotoCropper.jsx";
import AuthDecor from "../components/AuthDecor.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(AVATAR_CHOICES[0].id);
  const [border, setBorder] = useState("classic");
  const [cropFile, setCropFile] = useState(null);
  const [notice, setNotice] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [message, setMessage] = useState("");

  const pickPhoto = (e) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!f.type.startsWith("image/")) { setNotice(`File ini tidak dikenali sebagai gambar (tipe: ${f.type || "kosong"}) — coba JPG/PNG/WebP.`); return; }
    if (f.size > 5 * 1024 * 1024) { setNotice("Ukuran maksimal 5 MB."); return; }
    const reader = new FileReader();
    reader.onerror = () => setNotice("Gagal membaca file — coba salin foto ke folder lain lalu pilih lagi.");
    reader.onload = () => {
      const url = String(reader.result || "");
      const test = new Image();
      test.onload = () => setCropFile(url);
      test.onerror = () => setNotice("Browser tidak bisa membuka foto ini — simpan ulang sebagai JPG/PNG (bukan HEIC/WEBP aneh).");
      test.src = url;
    };
    reader.readAsDataURL(f);
  };

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
          await createProfile({ id: userId, username: uname, full_name: fullName.trim(), avatar, border_style: border });
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
        <div className="panel" style={{ maxWidth: 440, width: "100%", padding: "1.3rem 1.1rem", textAlign: "center", position: "relative", overflow: "hidden", paddingTop: "1.5rem", paddingBottom: "1.4rem" }}>
          <AuthDecor />
          {cropFile && (
            <PhotoCropper
              src={cropFile}
              onCancel={() => setCropFile(null)}
              onApply={(dataUrl) => { setAvatar(dataUrl); setCropFile(null); setNotice("Foto diimpor ✅"); }}
            />
          )}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div className="avatar-frame" style={{ marginBottom: ".55rem", width: 104, height: 104 }}>
              <Avatar id={avatar} size="100%" border="none" title="Avatar kamu" style={{ borderRadius: 0 }} />

            </div>
            <h1 style={{ fontSize: "1.2rem", color: "var(--deep)", margin: ".15rem 0 .15rem" }}>Buat akun HTMLpedia</h1>
            <p style={{ fontSize: ".78rem", color: "var(--text)", margin: "0 0 .6rem" }}>
              Tanpa email — cukup username & password. Progress belajarmu tersimpan di akunmu.
            </p>

            <form onSubmit={submit}>
              <div style={{ marginBottom: ".45rem" }}><AvatarPicker value={avatar} onChange={setAvatar} columns={2} border={border} /></div>

              <label className="btn" style={{ display: "inline-flex", alignItems: "center", gap: ".35rem", fontSize: ".74rem", padding: ".4rem .75rem", borderRadius: 10, cursor: "pointer", marginBottom: ".45rem" }}>
                📁 Import foto sendiri
                <input type="file" accept="image/*" onChange={pickPhoto} style={{ display: "none" }} />
              </label>
              {notice && <p style={{ fontSize: ".7rem", color: "#0284c7", fontWeight: 700, margin: "-.15rem 0 .35rem" }}>{notice}</p>}

              <BorderPicker value={border} onChange={setBorder} avatarId={avatar} />

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20))}
                placeholder="username (huruf kecil/angka/_)"
                autoFocus
                required
                style={{
                  width: "100%", boxSizing: "border-box", fontSize: ".95rem",
                  padding: ".6rem .85rem", borderRadius: 12, border: "2px solid var(--border)",
                  outline: "none", fontFamily: "inherit", margin: ".5rem 0 .5rem",
                }}
              />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="nama panggilan"
                required
                style={{
                  width: "100%", boxSizing: "border-box", fontSize: ".95rem",
                  padding: ".6rem .85rem", borderRadius: 12, border: "2px solid var(--border)",
                  outline: "none", fontFamily: "inherit", marginBottom: ".5rem",
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password (min. 6 karakter)"
                required
                style={{
                  width: "100%", boxSizing: "border-box", fontSize: ".95rem",
                  padding: ".6rem .85rem", borderRadius: 12, border: "2px solid var(--border)",
                  outline: "none", fontFamily: "inherit", marginBottom: ".6rem",
                }}
              />
              <button
                type="submit"
                className="btn primary"
                disabled={status === "sending"}
                style={{ width: "100%", fontSize: ".92rem", padding: ".65rem", borderRadius: 12, fontWeight: 800 }}
              >
                {status === "sending" ? "Membuat akun…" : "🎉 Buat akun"}
              </button>
              {status === "error" && (
                <p style={{ color: "#dc2626", fontSize: ".78rem", marginTop: ".55rem", fontWeight: 700 }}>{message}</p>
              )}
            </form>

            <p style={{ fontSize: ".74rem", color: "var(--text)", marginTop: ".7rem" }}>
              Sudah punya akun? <Link to="/" style={{ color: "var(--sky)", fontWeight: 800, textDecoration: "none" }}>Masuk di sini</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
