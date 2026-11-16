import React, { useEffect, useState } from "react";

// Tombol musik mengambang — penting untuk HP/iOS, di mana autoplay bersuara diblokir.
// Menekan tombol ini dianggap "interaksi pengguna", jadi audio bisa dihidupkan.
export default function FloatingMusicButton() {
  const [on, setOn] = useState(() => localStorage.getItem("htmlpedia-bgm") !== "off");

  useEffect(() => {
    const h = (e) => setOn(Boolean(e.detail));
    window.addEventListener("bgm-change", h);
    return () => window.removeEventListener("bgm-change", h);
  }, []);

  const toggle = () => {
    const next = !on;
    localStorage.setItem("htmlpedia-bgm", next ? "on" : "off");
    window.dispatchEvent(new CustomEvent("bgm-change", { detail: next }));
    // Trigger pointer event supaya BgmPlayer bisa unMute
    window.dispatchEvent(new PointerEvent("pointerdown"));
  };

  return (
    <button
      className="music-fab"
      aria-pressed={on}
      title={on ? "Matikan musik" : "Nyalakan musik"}
      onClick={toggle}
    >
      {on ? "🔇" : "🎵"}
    </button>
  );
}
