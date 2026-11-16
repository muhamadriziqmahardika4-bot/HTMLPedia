import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../data/categories.js";
import SearchSuggest from "../components/SearchSuggest.jsx";
import { ALL_ENTRIES, langOf, LANG_META, learningIndex } from "../data/all.js";

const SHOW_ALL = new Set(["tag", "semua", "all"]);

export default function TagIndex() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const kategori = params.get("kategori") || "";
  const navigate = useNavigate();

  const showAll = SHOW_ALL.has(q.trim().toLowerCase());
  const filtered = ALL_ENTRIES.filter((t) => {
    if (kategori && t.category !== kategori) return false;
    if (showAll) return true;
    if (!q.trim()) return true;
    const s = `${t.slug} ${t.tag} ${t.name} ${t.summary}`.toLowerCase();
    return s.includes(q.trim().toLowerCase());
  }).sort((a, b) => learningIndex(a) - learningIndex(b));

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <div className="panel">
      <div className="breadcrumb">🏠 Beranda › <b>Semua Tag</b>{kategori ? ` › ${CATEGORIES.find((c) => c.id === kategori)?.name}` : ""}</div>
      <h2 style={{ marginTop: 0 }}><span className="title-underline">📚 Semua Materi ({filtered.length})</span></h2>

      <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", alignItems: "center", marginBottom: ".8rem" }}>
        <div style={{ flex: "1 1 240px" }}>
          <SearchSuggest value={q} onChange={(v) => setParam("q", v)} onPick={(entry) => navigate(`/tag/${entry.slug}`)} />
        </div>
        <select className="search" style={{ width: "auto" }} value={kategori} onChange={(e) => setParam("kategori", e.target.value)} aria-label="Filter kategori">
          <option value="">Semua kategori</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
        </select>
        {(q || kategori) && <button className="btn" onClick={() => navigate("/tag")}>↺ Reset</button>}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "#64748b" }}>Tidak ada materi yang cocok{q ? ` dengan "${q}"` : ""}. Coba kata lain.</p>
      ) : (
        ["html", "css", "js"].map((lang) => {
          const group = filtered.filter((t) => langOf(t.category) === lang);
          if (group.length === 0) return null;
          const meta = LANG_META[lang];
          return (
            <div key={lang} style={{ marginBottom: "1.2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".6rem", margin: ".4rem 0 .6rem", padding: ".35rem .8rem", borderRadius: 12, background: lang === "html" ? "#e0f2fe" : lang === "css" ? "#eef2ff" : "#fefce8", border: `2px solid ${lang === "html" ? "#7dd3fc" : lang === "css" ? "#c7d2fe" : "#fde68a"}` }}>
                <span style={{ fontSize: "1.1rem" }}>{meta.emoji}</span>
                <b style={{ color: "#0c4a6e" }}>{meta.label}</b>
                <span style={{ fontSize: ".75rem", color: "#0369a1", marginLeft: "auto" }}>{group.length} materi</span>
              </div>
              <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
                {group.map((t) => (
                  <Link key={t.slug} to={`/tag/${t.slug}`} className="card scroll-card" style={{ textDecoration: "none" }}>
                    <span className={`tag-badge ${meta.badgeClass}`} style={{ fontSize: ".85rem", padding: ".25rem .6rem" }}>{t.tag}</span>
                    <b style={{ marginTop: ".4rem" }}>{t.name}</b>
                    <span>{t.level}{t.deprecated ? " · ⚠️ Deprecated" : ""}</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
