import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { BASICS } from "../data/basics.js";
import CodeBlock from "../components/CodeBlock.jsx";

export default function BasicsDetail() {
  const { slug } = useParams();
  const idx = BASICS.findIndex((b) => b.slug === slug);
  if (idx === -1) return <Navigate to="/dasar" replace />;
  const b = BASICS[idx];
  const prev = BASICS[idx - 1];
  const next = BASICS[idx + 1];

  return (
    <div className="panel">
      <div className="breadcrumb">🏠 Beranda › <Link to="/dasar">Dasar-Dasar</Link> › <b>{b.title}</b></div>
      <div className="tag-header">
        <span className="tag-badge" style={{ fontSize: "1.6rem", padding: ".3rem .6rem" }}>{b.emoji}</span>
        <div>
          <div style={{ fontWeight: 800 }}>{b.title}</div>
          <div style={{ fontSize: ".72rem", color: "#0369a1" }}>Dasar-Dasar HTML · {idx + 1} dari {BASICS.length}</div>
        </div>
      </div>
      <p style={{ color: "#075985" }}>{b.summary}</p>
      <ul style={{ lineHeight: 1.9, color: "#075985" }}>
        {b.poin.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
      <CodeBlock code={b.contoh} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", fontSize: ".8rem" }}>
        <span>{prev && <Link to={`/dasar/${prev.slug}`}>← {prev.title}</Link>}</span>
        <span>{next && <Link to={`/dasar/${next.slug}`}>{next.title} →</Link>}</span>
      </div>
    </div>
  );
}
