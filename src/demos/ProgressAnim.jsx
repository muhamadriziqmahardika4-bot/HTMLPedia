import React, { useEffect, useState } from "react";

export default function ProgressAnim() {
  const [value, setValue] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (!run) return;
    if (value >= 100) { setRun(false); return; }
    const t = setTimeout(() => setValue((v) => Math.min(100, v + 5)), 60);
    return () => clearTimeout(t);
  }, [run, value]);

  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO HIDUP — Bar Kemajuan</b>
      <div style={{ margin: ".5rem 0" }}>
        <progress value={value} max={100} style={{ width: "100%", height: 18 }}>{value}%</progress>
      </div>
      <div style={{ fontSize: ".82rem", color: "#075985", marginBottom: ".4rem" }}>Mengunggah… {value}%</div>
      <button className="btn primary" onClick={() => { setValue(0); setRun(true); }}>▶ Mulai unggah</button>
    </div>
  );
}
