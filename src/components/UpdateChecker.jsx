// Deteksi deploy baru saat app terbuka — tampilkan tombol "Muat ulang" bila versi berubah.
import React, { useEffect, useState } from "react";

const APP_VERSION = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev";

export default function UpdateChecker() {
  const [stale, setStale] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const r = await fetch(`/version.json?t=${Date.now()}`, { cache: "no-store" });
        if (!r.ok) return;
        const data = await r.json();
        if (data?.v && String(data.v) !== String(APP_VERSION)) setStale(true);
      } catch {
        // offline / gagal fetch — abaikan
      }
    };
    check();
    const t = setInterval(check, 45000);
    const onFocus = () => check();
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(t);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  if (!stale) return null;
  return (
    <button
      onClick={() => window.location.reload()}
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 130,
        background: "linear-gradient(135deg,#0ea5e9,#0284c7)",
        color: "#fff",
        border: "none",
        borderRadius: 999,
        padding: ".6rem 1.1rem",
        fontSize: ".78rem",
        fontWeight: 800,
        cursor: "pointer",
        boxShadow: "0 6px 0 #075985, 0 8px 18px rgba(2,132,199,.45)",
        fontFamily: "inherit",
      }}
    >
      ✨ Versi baru tersedia — tap untuk memuat ulang
    </button>
  );
}
