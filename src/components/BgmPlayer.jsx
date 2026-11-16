import React, { useEffect, useRef } from "react";

// BGM dari YouTube (lagu pilihan pembuat).
// Saat web dibuka: autoplay dalam kondisi muted (diizinkan browser),
// lalu unmute otomatis pada interaksi pertama (mis. klik MULAI).
const VIDEO_ID = "FjHGZj2IjBk";

export default function BgmPlayer() {
  const frameRef = useRef(null);

  useEffect(() => {
    const unmute = () => {
      try {
        frameRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "unMute", args: "" }), "*"
        );
        frameRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: "" }), "*"
        );
      } catch {
        // abaikan
      }
    };
    unmute(); // coba langsung (berguna setelah gesture)
    window.addEventListener("pointerdown", unmute);
    window.addEventListener("keydown", unmute);
    return () => {
      window.removeEventListener("pointerdown", unmute);
      window.removeEventListener("keydown", unmute);
    };
  }, []);

  const src = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&rel=0&enablejsapi=1&modestbranding=1`;
  return (
    <iframe
      id="bgm-frame"
      ref={frameRef}
      title="Musik latar"
      src={src}
      allow="autoplay; encrypted-media; picture-in-picture"
      style={{ position: "fixed", width: 0, height: 0, border: 0, pointerEvents: "none", opacity: 0 }}
      aria-hidden="true"
    />
  );
}
