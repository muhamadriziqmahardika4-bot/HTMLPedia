// Modal crop foto — pengguna geser & zoom untuk menyesuaikan potongan lingkaran.
import React, { useEffect, useRef, useState } from "react";

const PREVIEW = 240; // ukuran preview (px)
const OUT = 224;     // ukuran hasil akhir

export default function PhotoCropper({ file, onCancel, onApply }) {
  const [img, setImg] = useState(null);
  const [loadErr, setLoadErr] = useState(false);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef(null);

  useEffect(() => {
    const i = new Image();
    const url = URL.createObjectURL(file);
    i.onload = () => setImg(i);
    i.onerror = () => setLoadErr(true);
    i.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Skala dasar agar gambar selalu menutupi lingkaran
  const base = img ? Math.max(PREVIEW / img.width, PREVIEW / img.height) : 1;
  const effective = base * scale;
  const w = img ? Math.round(img.width * effective) : 0;
  const h = img ? Math.round(img.height * effective) : 0;

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, base: { ...pos } };
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    setPos({ x: drag.current.base.x + dx, y: drag.current.base.y + dy });
  };
  const onPointerUp = () => { drag.current = null; };

  const apply = () => {
    if (!img) return;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = OUT;
    const ctx = canvas.getContext("2d");
    const f = OUT / PREVIEW;
    const cx = PREVIEW / 2 + pos.x, cy = PREVIEW / 2 + pos.y;
    ctx.drawImage(img, (cx - w / 2) * f, (cy - h / 2) * f, w * f, h * f);
    onApply(canvas.toDataURL("image/jpeg", 0.85));
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Potong foto profil"
      style={{ position: "fixed", inset: 0, zIndex: 120, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,47,73,.72)", backdropFilter: "blur(2px)" }}
      onClick={onCancel}
    >
      <div className="panel" style={{ padding: "1rem 1rem 1.1rem", maxWidth: 330, width: "92%", textAlign: "center", position: "relative" }} onClick={(e) => e.stopPropagation()}>
        <p style={{ fontWeight: 900, color: "var(--deep)", margin: "0 0 .55rem", fontSize: ".9rem" }}>✂️ Potong foto profil</p>

        {loadErr ? (
          <p style={{ color: "#dc2626", fontWeight: 700, fontSize: ".82rem", padding: ".8rem" }}>
            ❌ Gambar ini tidak bisa dibuka — coba file lain (JPG/PNG/WebP).
          </p>
        ) : (
        <>
        <div
          style={{ width: PREVIEW, height: PREVIEW, margin: "0 auto", borderRadius: "50%", overflow: "hidden", border: "3px solid #fff", boxShadow: "0 8px 22px rgba(2,132,199,.45)", background: "#0c4a6e", touchAction: "none", cursor: "grab" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {img && (
            <img
              src={img.src}
              alt="Foto yang akan dipakai"
              draggable={false}
              style={{ position: "absolute", left: PREVIEW / 2 + pos.x - w / 2, top: PREVIEW / 2 + pos.y - h / 2, width: w, height: h, maxWidth: "none", userSelect: "none", pointerEvents: "none" }}
            />
          )}
        </div>

        <label style={{ fontSize: ".68rem", fontWeight: 800, color: "var(--deep)", display: "block", margin: ".6rem 0 .15rem" }}>
          Zoom {Math.round(scale * 100)}%
        </label>
        <input type="range" min={1} max={3} step={0.02} value={scale} onChange={(e) => setScale(Number(e.target.value))} style={{ width: "90%" }} aria-label="Perbesar foto" />

        <div style={{ display: "flex", gap: ".4rem", justifyContent: "center", marginTop: ".6rem" }}>
          <button className="btn" onClick={onCancel} style={{ fontSize: ".78rem", padding: ".45rem .9rem" }}>Batal</button>
          <button className="btn primary" onClick={apply} style={{ fontSize: ".78rem", padding: ".45rem 1.1rem" }}>✅ Pakai foto</button>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
