import React from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/categories.js";
import { useProgress } from "../hooks/useProgress.js";
import ProgressBar from "../components/ProgressBar.jsx";
import SearchSuggest from "../components/SearchSuggest.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import { ALL_ENTRIES } from "../data/all.js";

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const { count, total } = useProgress(ALL_ENTRIES.length);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/tag?q=${encodeURIComponent(q)}` : "/tag");
  };

  return (
    <>
      <header className="hero">
        <span className="badge badge-glow">✨ ENSIKLOPEDIA HTML INTERAKTIF ✨</span>
        <h1>Belajar Tag HTML,<br /><span className="text-shimmer">Raih &amp; Buat Web Kamu Sendiri</span> 🚀</h1>
        <p>Dari nol sampai bisa bikin halaman web — satu tag, satu langkah.</p>
        <form onSubmit={submitSearch}>
          <SearchSuggest value={query} onChange={setQuery} onPick={(entry) => navigate(`/tag/${entry.slug}`)} />
        </form>
        <div className="meta">🍬 {ALL_ENTRIES.length} materi HTML · CSS · JS &nbsp;•&nbsp; filter per kategori &nbsp;•&nbsp; demo hidup</div>
        <ProgressBar done={count} total={total} label />
        <button
          onClick={() => navigate("/dasar")}
          style={{
            marginTop: ".9rem", display: "inline-flex", alignItems: "center", gap: ".5rem",
            background: "linear-gradient(135deg,#fda4af,#f472b6)", border: "none",
            color: "#fff", fontWeight: 800, fontSize: ".85rem", padding: ".55rem 1.3rem",
            borderRadius: 999, cursor: "pointer", boxShadow: "0 4px 0 #ec4899",
          }}>
          📚 Bab Dasar — domain, hosting &amp; dasar-dasar web ➡️
        </button>
      </header>

      <div style={{ textAlign: "center", margin: "1.6rem 0 0" }}><span className="sticker">100% GRATIS · TANPA DAFTAR ✨</span></div>
      <p className="section-title" style={{ marginTop: ".8rem" }}>Kategori</p>
      <div className="grid">
        {CATEGORIES.map((c) => (
          <CategoryCard key={c.id} {...c} onClick={() => navigate(`/tag?kategori=${c.id}`)} />
        ))}
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-inner">
          {["<html>", "<head>", "<body>", "<h1>", "<p>", "<a>", "<img>", "<ul>", "<ol>", "<table>", "<form>", "<input>", "<header>", "<nav>", "<main>", "<section>", "<article>", "<footer>", "<details>", "<dialog>"].join("  •  ") + "  •  " + ["<html>", "<head>", "<body>", "<h1>", "<p>", "<a>", "<img>", "<ul>", "<ol>", "<table>", "<form>", "<input>", "<header>", "<nav>", "<main>", "<section>", "<article>", "<footer>", "<details>", "<dialog>"].join("  •  ") + "  •  "}
        </div>
      </div>

      <footer style={{ textAlign: "center", fontSize: ".78rem", color: "#0369a1", borderTop: "2px dashed #bae6fd", paddingTop: ".9rem", marginTop: "1rem" }}>
        Dibuat dengan 💙 oleh <b>M Riziq Mahardika</b> · IG:{" "}
        <a href="https://www.instagram.com/mhmdrziqmhrdika?mdxt=MWR4dnMzaTRjZ25pYw==" target="_blank" rel="noreferrer" style={{ color: "#c13584", fontWeight: 800, textDecoration: "none" }}>@mhmdrziqmhrdika</a>
      </footer>
    </>
  );
}
