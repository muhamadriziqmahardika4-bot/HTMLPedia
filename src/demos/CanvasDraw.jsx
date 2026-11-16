import React, { useRef, useEffect } from "react";

export default function CanvasDraw() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) return;
    const draw = () => {
      ctx.clearRect(0, 0, 220, 110);
      ctx.fillStyle = "#0c4a6e";
      ctx.fillRect(0, 0, 220, 110);
      const t = Date.now() / 600;
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(60 + Math.sin(t) * 40, 55, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fde047";
      ctx.beginPath();
      ctx.arc(160 + Math.cos(t * 1.3) * 30, 40, 10, 0, Math.PI * 2);
      ctx.fill();
      raf = requestAnimationFrame(draw);
    };
    let raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="info demo-box" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP — Canvas bergerak</b>
      <canvas ref={ref} width={220} height={110} style={{ width: "100%", maxWidth: 220, borderRadius: 12, marginTop: ".4rem", border: "2px solid #bae6fd" }} />
    </div>
  );
}
