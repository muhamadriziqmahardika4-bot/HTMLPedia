import React, { useRef } from "react";

export default function DialogModal() {
  const ref = useRef(null);
  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP — Dialog Modal</b>
      <p style={{ fontSize: ".8rem", color: "#075985", margin: ".4rem 0" }}>Dialog asli HTML: fokus terjebak di dalam, Escape untuk menutup.</p>
      <button className="btn primary" onClick={() => ref.current?.showModal()}>🗑️ Hapus akun</button>
      <dialog ref={ref} style={{ border: "2px solid #fca5a5", borderRadius: 16, padding: "1rem 1.2rem", maxWidth: 320 }}>
        <p style={{ fontWeight: 800, marginTop: 0 }}>Yakin hapus akun?</p>
        <p style={{ fontSize: ".82rem", color: "#64748b" }}>Semua datamu akan hilang selamanya.</p>
        <div style={{ display: "flex", gap: ".5rem", justifyContent: "flex-end" }}>
          <button className="btn" onClick={() => ref.current?.close()}>Batal</button>
          <button className="btn danger" onClick={() => ref.current?.close()}>Hapus</button>
        </div>
      </dialog>
    </div>
  );
}
