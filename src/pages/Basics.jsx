import React from "react";
import { Link } from "react-router-dom";
import { BASICS } from "../data/basics.js";

export default function Basics() {
  return (
    <div className="panel">
      <div className="breadcrumb">🏠 Beranda › <b>Dasar-Dasar HTML</b></div>
      <h2 style={{ marginTop: 0 }}>🌱 Dasar-Dasar HTML</h2>
      <p style={{ fontSize: ".85rem", color: "#0369a1" }}>12 materi penting sebelum mulai menulis tag — dibaca berurutan lebih baik.</p>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
        {BASICS.map((b) => (
          <Link key={b.slug} to={`/dasar/${b.slug}`} className="card" style={{ textDecoration: "none" }}>
            <span className="emoji" aria-hidden="true">{b.emoji}</span>
            <b>{b.title}</b>
            <span>{b.summary}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
