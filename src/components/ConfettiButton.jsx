import React from "react";
import confetti from "canvas-confetti";

export default function ConfettiButton({ label, doneLabel, done, onToggle, className = "done-btn" }) {
  const handle = () => {
    const next = !done;
    if (next) {
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 }, colors: ["#38bdf8", "#818cf8", "#22d3ee", "#fbcfe8", "#fde68a"] });
    }
    onToggle?.(next);
  };
  return (
    <button className={className} onClick={handle} aria-pressed={done}>
      {done ? (doneLabel || "✓ Selesai!") : (label || "Tandai Selesai")}
    </button>
  );
}

