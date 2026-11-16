import React from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/categories.js";
import { useProgress } from "../hooks/useProgress.js";
import { TAGS } from "../data/tags.js";
import ProgressBar from "../components/ProgressBar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CategoryCard from "../components/CategoryCard.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const { count, total } = useProgress(TAGS.length);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/tag?q=${encodeURIComponent(q)}` : "/tag");
  };

  return (
    <>
      <header className="hero">
        <span className="badge">✨ ENSIKLOPEDIA HTML INTERAKTIF ✨</span>
        <h1>Belajar Tag HTML,<br /><span className="grad">Raih &amp; Buat Web Kamu Sendiri</span> 🚀</h1>
        <p>Dari nol sampai bisa bikin halaman web — satu tag, satu langkah.</p>
        <form onSubmit={submitSearch}>
          <SearchBar value={query} onChange={setQuery} />
        </form>
        <div className="meta">🍬 {TAGS.length || "100+"} tag &nbsp;•&nbsp; 9 kategori &nbsp;•&nbsp; demo hidup di tiap halaman</div>
        <ProgressBar done={count} total={total} label />
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
