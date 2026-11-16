import React, { useState } from "react";

// Media demo memakai tone.js? Tidak — pakai Web Audio API sederhana lewat inline <audio> fallback.
// Tanpa aset eksternal: bikin nada dengan Web Audio saat diklik.
export default function MediaDemo() {
  const [playing, setPlaying] = useState(false);
  const nada = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [523.25, 659.25, 783.99].forEach((f, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "triangle";
        o.frequency.value = f;
        g.gain.value = 0.08;
        o.connect(g).connect(ctx.destination);
        o.start(ctx.currentTime + i * 0.18);
        o.stop(ctx.currentTime + i * 0.18 + 0.22);
      });
      setPlaying(true);
      setTimeout(() => setPlaying(false), 800);
    } catch {
      setPlaying(false);
    }
  };
  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP — Media &amp; Audio</b>
      <p style={{ fontSize: ".8rem", color: "#075985", margin: ".4rem 0" }}>Klik untuk mendengar nada (Web Audio API — tanpa file eksternal):</p>
      <button className="btn primary" onClick={nada} disabled={playing}>{playing ? "♪ Sedang berbunyi…" : "▶ Mainkan nada"}</button>
      <p style={{ fontSize: ".72rem", color: "#64748b", marginTop: ".5rem" }}>Untuk tag &lt;audio&gt;/&lt;video&gt; beneran, pakai atribut controls + beberapa &lt;source&gt;.</p>
    </div>
  );
}
