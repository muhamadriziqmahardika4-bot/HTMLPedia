import React from "react";
import { useParams, Link } from "react-router-dom";
import { ALL_ENTRIES, findEntry } from "../data/all.js";
import { CATEGORIES } from "../data/categories.js";
import { useProgress } from "../hooks/useProgress.js";
import TagBadge from "../components/TagBadge.jsx";
import ConfettiButton from "../components/ConfettiButton.jsx";
import GuidedLesson from "../components/GuidedLesson.jsx";

export default function TagDetail() {
  const { slug } = useParams();
  const idx = ALL_ENTRIES.findIndex((t) => t.slug === slug);
  const { isDone, toggle } = useProgress(ALL_ENTRIES.length);

  if (idx === -1) {
    return (
      <div className="panel" style={{ textAlign: "center" }}>
        <div style={{ fontSize: "3rem" }}>🤖</div>
        <h2>Tag tidak ditemukan</h2>
        <p style={{ color: "#64748b" }}>Tag "{slug}" tidak ada di ensiklopedia.</p>
        <Link to="/tag" className="pill active" style={{ display: "inline-block", textDecoration: "none" }}>📚 Lihat Semua Tag</Link>
      </div>
    );
  }

  const entry = ALL_ENTRIES[idx];
  const kategori = CATEGORIES.find((c) => c.id === entry.category);
  const prev = ALL_ENTRIES[idx - 1];
  const next = ALL_ENTRIES[idx + 1];
  const done = isDone(entry.slug);

  return (
    <div className="panel">
      <div className="breadcrumb">🏠 Beranda › <Link to="/tag">Tag</Link> › {kategori?.name} › <b>{entry.tag}</b></div>

      <div className="tag-header">
        <TagBadge tag={entry.tag} />
        <div>
          <div style={{ fontWeight: 800 }}>{entry.name}{entry.deprecated && <span style={{ marginLeft: ".5rem", fontSize: ".65rem", background: "#fef3c7", color: "#b45309", padding: ".1rem .45rem", borderRadius: 6, verticalAlign: "middle" }}>⚠️ DEPRECATED</span>}</div>
          <div style={{ fontSize: ".72rem", color: "#0369a1" }}>Kategori: {kategori?.name} • Tingkat: {entry.level}</div>
        </div>
        <ConfettiButton label="Tandai Selesai" doneLabel="✓ Selesai!" done={done} onToggle={() => toggle(entry.slug)} className="done-btn" />
      </div>
      {entry.deprecated && <p className="info" style={{ borderColor: "#fde68a", background: "#fffbeb", color: "#92400e" }}>⚠️ Tag ini <b>deprecated</b> — tidak disarankan untuk kode baru. {entry.replacedBy ? <>Penggantinya: <code>{entry.replacedBy}</code>.</> : null}</p>}

      {/* Alur belajar terpandu: Baca → Praktik → Kuis Mini → Selesai */}
      <GuidedLesson entry={entry} />

      <div style={{ display: "flex", justifyContent: "space-between", gap: ".5rem", marginTop: "1.1rem", fontSize: ".78rem", flexWrap: "wrap", borderTop: "2px dashed var(--border)", paddingTop: ".7rem" }}>
        <span>{prev && <Link to={`/tag/${prev.slug}`}>← {prev.tag}</Link>}</span>
        <span>Tag terkait: {entry.related.map((r) => <Link key={r} to={`/tag/${r}`} style={{ margin: "0 .3rem" }}>{`<${r}>`}</Link>)}</span>
        <span>{next && <Link to={`/tag/${next.slug}`}>{next.tag} →</Link>}</span>
      </div>
    </div>
  );
}
