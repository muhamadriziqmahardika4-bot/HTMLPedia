import React, { useState } from "react";

export default function FormValidate() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const errs = [];
    if (nama.trim().length < 3) errs.push("Nama minimal 3 karakter");
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.push("Email belum valid");
    setMsg(errs.length ? { ok: false, text: errs.join(" · ") } : { ok: true, text: `Mantap, ${nama.trim()}! Data kamu tersimpan 🎉` });
  };

  return (
    <form className="info" style={{ background: "#fff" }} onSubmit={submit}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP — Validasi Form</b>
      <div style={{ display: "flex", flexDirection: "column", gap: ".4rem", margin: ".5rem 0" }}>
        <input className="search" style={{ width: "100%", fontSize: ".85rem", padding: ".5rem .8rem" }} placeholder="Nama lengkap" value={nama} onChange={(e) => setNama(e.target.value)} required />
        <input className="search" style={{ width: "100%", fontSize: ".85rem", padding: ".5rem .8rem" }} type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit" className="btn primary" style={{ alignSelf: "flex-start" }}>Daftar</button>
      </div>
      {msg && <div style={{ fontSize: ".78rem", padding: ".4rem .6rem", borderRadius: 10, background: msg.ok ? "#dcfce7" : "#fee2e2", color: msg.ok ? "#15803d" : "#b91c1c" }}>{msg.text}</div>}
    </form>
  );
}
