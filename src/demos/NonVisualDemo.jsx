import React, { useState } from "react";

/* ===== Mock kecil per tag ===== */

function MockFrame({ title, children }) {
  return (
    <div style={{ border: "2px solid #cbd5e1", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ background: "#e2e8f0", padding: ".3rem .6rem", fontSize: ".7rem", fontFamily: "Consolas, monospace" }}>{title}</div>
      <div style={{ padding: ".6rem .7rem", fontSize: ".8rem" }}>{children}</div>
    </div>
  );
}

function HtmlVisual() {
  return (
    <MockFrame title="🌐 index.html">
      <div style={{ fontFamily: "Consolas, monospace", fontSize: ".75rem", lineHeight: 1.7 }}>
        <span style={{ color: "#7dd3fc" }}>&lt;html</span> <span style={{ color: "#fbbf24" }}>lang=</span><span style={{ color: "#86efac" }}>"id"</span>&gt;<br />
        &nbsp;&nbsp;...isi halaman...<br />
        <span style={{ color: "#7dd3fc" }}>&lt;/html&gt;</span>
      </div>
      <div style={{ marginTop: ".4rem", fontSize: ".78rem", color: "#075985" }}>🇮🇩 Browser tahu halaman ini berbahasa <b>Indonesia</b> → screen reader baca dengan aksen benar, Google menampilkannya ke pengguna Indonesia.</div>
    </MockFrame>
  );
}

function HeadVisual() {
  return (
    <MockFrame title="🧠 &lt;head&gt; — tidak tampil, tapi ini isinya">
      <div style={{ fontFamily: "Consolas, monospace", fontSize: ".72rem", lineHeight: 1.8 }}>
        <div><span style={{ color: "#fbbf24" }}>charset</span> = UTF-8 ✅</div>
        <div><span style={{ color: "#fbbf24" }}>viewport</span> = lebar sesuai HP 📱</div>
        <div><span style={{ color: "#fbbf24" }}>title</span> → tab browser</div>
        <div><span style={{ color: "#fbbf24" }}>description</span> → hasil Google</div>
        <div><span style={{ color: "#fbbf24" }}>icon</span> → 🍡 favicon</div>
      </div>
    </MockFrame>
  );
}

function TitleVisual() {
  return (
    <MockFrame title="📑 Tab browser">
      <div style={{ display: "flex", gap: ".4rem", alignItems: "center" }}>
        <div style={{ background: "#fff", border: "2px solid #cbd5e1", borderRadius: "10px 10px 0 0", padding: ".3rem .7rem", fontSize: ".75rem" }}>🍡 Blog Masakku — Resep Rendang</div>
        <div style={{ background: "#e2e8f0", borderRadius: "10px 10px 0 0", padding: ".3rem .7rem", fontSize: ".75rem", color: "#64748b" }}>Tab lain</div>
      </div>
      <div style={{ fontSize: ".72rem", color: "#64748b", marginTop: ".4rem" }}>Teks ini berasal dari <code>&lt;title&gt;</code> yang kamu tulis!</div>
    </MockFrame>
  );
}

function MetaVisual() {
  return (
    <MockFrame title="🔎 Hasil pencarian Google">
      <div style={{ fontSize: ".85rem" }}>
        <div style={{ color: "#1a0dab", fontWeight: 700 }}>Blog Masakku — Resep Rendang &amp; Sate</div>
        <div style={{ color: "#006621", fontSize: ".75rem" }}>https://masakku.id/resep/rendang</div>
        <div style={{ color: "#545454", fontSize: ".78rem", marginTop: ".15rem" }}>Resep rendang empuk 3 jam dengan bumbu rempah pilihan — dijamin lezat untuk keluarga...</div>
      </div>
      <div style={{ fontSize: ".72rem", color: "#64748b", marginTop: ".4rem" }}>Teks abu-abu itu isi <code>&lt;meta name="description"&gt;</code>.</div>
    </MockFrame>
  );
}

function LinkVisual() {
  const [on, setOn] = useState(false);
  return (
    <MockFrame title="🎨 Muat CSS lewat &lt;link&gt;">
      <div style={{ borderRadius: 10, padding: ".6rem", background: on ? "#fef3c7" : "#f1f5f9", border: "2px dashed #cbd5e1", transition: "all .3s" }}>
        <b style={{ color: on ? "#b45309" : "#64748b" }}>{on ? "🌮 Halaman jadi berwarna & cantik!" : "📄 Halaman polos tanpa CSS"}</b>
      </div>
      <button className="btn primary" style={{ marginTop: ".4rem" }} onClick={() => setOn((v) => !v)}>
        {on ? "✖ Copot CSS" : "▶ Muat style.css"}
      </button>
    </MockFrame>
  );
}

function StyleVisual() {
  const [color, setColor] = useState("#38bdf8");
  return (
    <MockFrame title="🎨 &lt;style&gt; — CSS di dalam halaman">
      <div style={{ height: 40, borderRadius: 10, background: color, transition: "background .3s" }} />
      <button className="btn" style={{ marginTop: ".4rem" }} onClick={() => setColor(["#38bdf8", "#f472b6", "#4ade80", "#fde047"][Math.floor(Math.random() * 4)])}>🎲 Ganti warna</button>
    </MockFrame>
  );
}

function BodyVisual() {
  return (
    <MockFrame title="📦 Semua yang kamu lihat ada di &lt;body&gt;">
      <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
        {["Judul", "Teks", "Gambar", "Tombol", "Form", "Tabel"].map((x) => (
          <span key={x} style={{ background: "#e0f2fe", borderRadius: 8, padding: ".25rem .5rem", fontSize: ".72rem", fontWeight: 700, color: "#0369a1" }}>{x}</span>
        ))}
      </div>
      <div style={{ fontSize: ".72rem", color: "#64748b", marginTop: ".4rem" }}>Elemen-elemen ini hanya bisa tampil karena berada di dalam <code>&lt;body&gt;</code>.</div>
    </MockFrame>
  );
}

function ScriptVisual() {
  const [n, setN] = useState(0);
  return (
    <MockFrame title="⚡ &lt;script&gt; — klik aku, JS yang jalan">
      <button className="btn primary" onClick={() => setN(n + 1)}>🎉 Klik: {n} kali</button>
      <div style={{ fontSize: ".72rem", color: "#64748b", marginTop: ".4rem" }}>Tombol ini bekerja karena ada JavaScript yang mendengarkan kliknya.</div>
    </MockFrame>
  );
}

function NoscriptVisual() {
  const [jsOff, setJsOff] = useState(false);
  return (
    <MockFrame title="🛡️ &lt;noscript&gt; — tampil saat JS mati">
      <div style={{ borderRadius: 10, padding: ".5rem", background: jsOff ? "#fffbeb" : "#f0fdf4", border: "2px dashed #cbd5e1" }}>
        {jsOff ? <span style={{ color: "#b45309" }}>⚠️ JavaScript dimatikan — tampil konten alternatif dari &lt;noscript&gt;</span> : <span style={{ color: "#15803d" }}>✅ JavaScript aktif — halaman interaktif</span>}
      </div>
      <button className="btn" style={{ marginTop: ".4rem" }} onClick={() => setJsOff((v) => !v)}>{jsOff ? "Nyalakan JS" : "Matikan JS (simulasi)"}</button>
    </MockFrame>
  );
}

function TemplateVisual() {
  const [cards, setCards] = useState(1);
  return (
    <MockFrame title="🧩 &lt;template&gt; — cetakan lalu clone">
      <div style={{ display: "flex", gap: ".35rem", flexWrap: "wrap" }}>
        {Array.from({ length: cards }, (_, i) => (
          <div key={i} style={{ border: "2px solid #bae6fd", borderRadius: 10, padding: ".3rem .5rem", fontSize: ".7rem", background: "#fff" }}>🃏 Kartu {i + 1}</div>
        ))}
      </div>
      <button className="btn" style={{ marginTop: ".4rem" }} onClick={() => setCards(Math.min(cards + 1, 8))}>➕ Clone dari template</button>
    </MockFrame>
  );
}

function SlotVisual() {
  const [isi, setIsi] = useState("Mahardika");
  return (
    <MockFrame title="🕳️ &lt;slot&gt; — lubang di komponen">
      <div style={{ border: "2px solid #c7d2fe", borderRadius: 12, padding: ".5rem", background: "#eef2ff" }}>
        <div style={{ fontSize: ".68rem", color: "#6366f1", fontWeight: 800 }}>&lt;kartu-profil&gt;</div>
        <div style={{ fontSize: ".85rem", fontWeight: 800, color: "#312e81" }}>👤 {isi}</div>
        <div style={{ fontSize: ".68rem", color: "#6366f1" }}>&lt;/kartu-profil&gt;</div>
      </div>
      <input className="search" style={{ width: "100%", marginTop: ".4rem", fontSize: ".8rem", padding: ".35rem .6rem" }} value={isi} onChange={(e) => setIsi(e.target.value)} placeholder="Isi slot…" />
    </MockFrame>
  );
}

const VISUALS = {
  html: HtmlVisual,
  head: HeadVisual,
  title: TitleVisual,
  meta: MetaVisual,
  link: LinkVisual,
  style: StyleVisual,
  body: BodyVisual,
  script: ScriptVisual,
  "script-meta": ScriptVisual,
  noscript: NoscriptVisual,
  template: TemplateVisual,
  slot: SlotVisual,
};

export default function NonVisualDemo({ entry }) {
  const Visual = VISUALS[entry?.slug];
  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🎬 DEMO — {entry?.tag} tidak tampil, tapi efeknya nyata</b>
      {Visual
        ? <div style={{ marginTop: ".5rem" }}><Visual /></div>
        : <p style={{ fontSize: ".82rem", color: "#075985" }}>{entry?.output || "Tag ini bekerja di balik layar."}</p>}
    </div>
  );
}
