import React from "react";

export default function FloatingMusicButton({ bgmOn, onToggleBgm }) {
  return (
    <button
      className="music-fab"
      aria-pressed={bgmOn}
      title={bgmOn ? "Matikan musik" : "Nyalakan musik"}
      onClick={onToggleBgm}
    >
      {bgmOn ? "🎵" : "🔇"}
    </button>
  );
}
