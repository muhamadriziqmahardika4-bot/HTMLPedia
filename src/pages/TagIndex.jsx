import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../data/categories.js";
import SearchSuggest from "../components/SearchSuggest.jsx";
import { ALL_ENTRIES } from "../data/all.js";

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
  }).sort((a, b) => a.slug.localeCompare(b.slug));

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <div className="panel">
      <div className="breadcrumb">🏠 Beranda › <b>Semua Tag</b>{kategori ? ` › ${CATEGORIES.find((c) => c.id === kategori)?.name}` : ""}</div>
      <h2 style={{ marginTop: 0 }}>📚 Semua Materi ({filtered.length})</h2>

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
        <p style={{ color: "#64748b" }}>Tidak ada tag yang cocok{q ? ` dengan "${q}"` : ""}. Coba kata lain.</p>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
          {filtered.map((t) => (
            <Link key={t.slug} to={`/tag/${t.slug}`} className="card" style={{ textDecoration: "none" }}>
              <span className="tag-badge" style={{ fontSize: ".85rem", padding: ".2rem .5rem" }}>{t.tag}</span>
              <b style={{ marginTop: ".4rem" }}>{t.name}</b>
              <span>{t.level}{t.deprecated ? " · ⚠️ Deprecated" : ""}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
