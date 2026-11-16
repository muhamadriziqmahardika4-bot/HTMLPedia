import React, { useEffect, useState } from "react";

export default function FloatingMusicButton() {
  const [on, setOn] = useState(() => localStorage.getItem("htmlpedia-bgm") !== "off");

  useEffect(() => {
    const h = (e) => setOn(Boolean(e.detail));
    window.addEventListener("bgm-change", h);
    return () => window.removeEventListener("bgm-change", h);
  }, []);

  const postToFrame = (func) => {
    const frame = document.getElementById("bgm-frame");
    frame?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: "" }),
      "*"
    );
  };

  const toggle = () => {
    const next = !on;
    localStorage.setItem("htmlpedia-bgm", next ? "on" : "off");
    window.dispatchEvent(new CustomEvent("bgm-change", { detail: next }));
    if (next) {
      // iOS/Safari: perintah ini dikirim langsung dari gesture (klik)
      setTimeout(() => {
        postToFrame("unMute");
        postToFrame("playVideo");
      }, 200);
    } else {
      postToFrame("pauseVideo");
    }
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
