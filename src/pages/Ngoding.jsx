// Tempat Ngoding — bebas menulis HTML/CSS/JS dan langsung melihat hasilnya.
// Mirip CodePen mini: 3 tab editor, preview langsung, bisa disalin & diunduh.
import React, { useEffect, useState } from "react";

const STARTER_HTML = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Proyek Ngoding — HTMLpedia</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Selamat datang di Tempat Ngoding!</h1>
  <p>Ubah kode ini sesuka hati kamu 🍡</p>
  <button id="tombol">Klik aku 🎉</button>
</body>
</html>`;

const STARTER_CSS = `body {
  font-family: sans-serif;
  text-align: center;
  padding: 1.2rem;
  background: #e0f2fe;
}
h1 { color: #0369a1; margin-bottom: .3rem; }
p { color: #334155; }
button {
  font-size: 1.1rem;
  padding: .65rem 1.6rem;
  border: none;
  border-radius: 999px;
  background: #38bdf8;
  color: #082f49;
  font-weight: 800;
  cursor: pointer;
}
button:hover { background: #7dd3fc; }`;

const STARTER_JS = `document.getElementById("tombol").addEventListener("click", () => {
  document.body.style.background = "hsl(" + Math.random() * 360 + ", 90%, 85%)";
});`;

const buildDoc = (html, css, js) => {
  // Kalau tab HTML sudah berisi dokumen lengkap → pakai apa adanya, sisipkan CSS & JS
  let doc = html;
  if (!/<html[\s>]|<!doctype/i.test(doc)) {
    doc = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Proyek Ngoding — HTMLpedia</title>
</head>
<body>
${html}
</body>
</html>`;
  }
  // Tab CSS → <style> di dalam <head>
  if (css.trim()) {
    if (/<\/head>/i.test(doc)) doc = doc.replace(/<\/head>/i, `  <style>\n${css}\n  </style>\n</head>`);
    else doc = `<style>\n${css}\n</style>\n` + doc;
  }
  // Tab JS → <script> sebelum </body>
  const safe = js.replace(/<\/script>/g, "<\\/script>");
  if (safe.trim()) {
    if (/<\/body>/i.test(doc)) doc = doc.replace(/<\/body>/i, `  <script>\n${safe}\n  </script>\n</body>`);
    else doc += `\n<script>\n${safe}\n</script>`;
  }
  return doc;
};

export default function Ngoding() {
  const [html, setHtml] = useState(() => { try { return localStorage.getItem("htmlpedia-ngoding-html") ?? STARTER_HTML; } catch { return STARTER_HTML; } });
  const [css, setCss] = useState(() => { try { return localStorage.getItem("htmlpedia-ngoding-css") ?? STARTER_CSS; } catch { return STARTER_CSS; } });
  const [js, setJs] = useState(() => { try { return localStorage.getItem("htmlpedia-ngoding-js") ?? STARTER_JS; } catch { return STARTER_JS; } });
  const [tab, setTab] = useState("html");
  const [srcDoc, setSrcDoc] = useState(() => buildDoc(html, css, js));
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("htmlpedia-ngoding-html", html);
      localStorage.setItem("htmlpedia-ngoding-css", css);
      localStorage.setItem("htmlpedia-ngoding-js", js);
    } catch { /* abaikan */ }
    const t = setTimeout(() => setSrcDoc(buildDoc(html, css, js)), 350);
    return () => clearTimeout(t);
  }, [html, css, js]);

  const reset = () => {
    setHtml(STARTER_HTML); setCss(STARTER_CSS); setJs(STARTER_JS); setTab("html");
    setNotice("Kembali ke template awal ✨");
    setTimeout(() => setNotice(""), 1800);
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(buildDoc(html, css, js));
      setNotice("Kode disalin ke clipboard 📋");
    } catch {
      setNotice("Gagal menyalin — coba tombol Unduh");
    }
    setTimeout(() => setNotice(""), 1800);
  };

  const download = () => {
    const blob = new Blob([buildDoc(html, css, js)], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "htmlpedia-ngoding.html";
    a.click();
    URL.revokeObjectURL(url);
    setNotice("File diunduh 💾");
    setTimeout(() => setNotice(""), 1800);
  };

  const TABS = [
    { key: "html", label: "🧱 HTML", value: html, onChange: setHtml },
    { key: "css", label: "🎨 CSS", value: css, onChange: setCss },
    { key: "js", label: "⚡ JS", value: js, onChange: setJs },
  ];
  const active = TABS.find((t) => t.key === tab);

  return (
    <div className="panel" style={{ padding: "1.3rem 1.2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".6rem", flexWrap: "wrap", marginBottom: ".2rem" }}>
        <h1 style={{ fontSize: "1.5rem", color: "var(--deep)", margin: 0 }}>🧪 Tempat Ngoding</h1>
        <div style={{ display: "flex", gap: ".35rem", flexWrap: "wrap" }}>
          <button className="btn" style={{ fontSize: ".72rem" }} onClick={copyAll}>📋 Salin</button>
          <button className="btn" style={{ fontSize: ".72rem" }} onClick={download}>⬇️ Unduh</button>
          <button className="btn" style={{ fontSize: ".72rem" }} onClick={reset}>↺ Reset</button>
        </div>
      </div>
      <p style={{ fontSize: ".8rem", color: "#64748b", margin: "0 0 .7rem" }}>
        Tulis HTML lengkap di tab HTML (struktur lengkap: doctype, head, body), CSS di tab CSS, dan JavaScript di tab JS — hasilnya langsung tampil di sebelah kanan, tersimpan otomatis di perangkat ini.
      </p>

      <div style={{ display: "flex", gap: ".35rem", marginBottom: ".5rem" }} role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            style={{
              flex: 1, padding: ".45rem .3rem", borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
              fontWeight: 800, fontSize: ".82rem",
              border: tab === t.key ? "2px solid var(--sky)" : "2px solid var(--border)",
              background: tab === t.key ? "#e0f2fe" : "#fff",
              color: tab === t.key ? "#0369a1" : "#64748b",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".6rem" }} className="live-cols">
        <textarea
          value={active.value}
          onChange={(e) => active.onChange(e.target.value)}
          spellCheck={false}
          aria-label={`Editor ${tab.toUpperCase()}`}
          style={{
            width: "100%", minHeight: 340, fontFamily: "Consolas, monospace", fontSize: ".78rem",
            border: "2px solid #38bdf8", borderRadius: 10, padding: ".6rem",
            background: "#082f49", color: "#bae6fd", lineHeight: 1.55, resize: "vertical", boxSizing: "border-box",
          }}
        />
        <iframe
          title="Hasil Tempat Ngoding"
          sandbox="allow-scripts"
          srcDoc={srcDoc}
          style={{ width: "100%", minHeight: 340, border: "2px solid #5eead4", borderRadius: 10, background: "#fff", boxSizing: "border-box" }}
        />
      </div>
      {notice && (
        <p style={{ fontSize: ".78rem", color: "#0284c7", fontWeight: 800, marginTop: ".55rem" }}>{notice}</p>
      )}
    </div>
  );
}
