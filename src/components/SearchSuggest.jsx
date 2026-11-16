import React, { useEffect, useRef, useState } from "react";
import { ALL_ENTRIES } from "../data/all.js";
import { CATEGORIES } from "../data/categories.js";

const SHOW_ALL = new Set(["tag", "semua", "all"]);
const catEmoji = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.emoji]));

function matchEntries(q) {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  if (SHOW_ALL.has(query)) return ALL_ENTRIES;
  return ALL_ENTRIES.filter((t) =>
    `${t.slug} ${t.tag} ${t.name} ${t.summary}`.toLowerCase().includes(query)
  );
}

export default function SearchSuggest({ value, onChange, onPick, placeholder, autoFocus }) {
  const [focused, setFocused] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const wrapRef = useRef(null);

  const matches = matchEntries(value);
  const visible = matches.slice(0, 8);
  const showAllMatches = SHOW_ALL.has(value.trim().toLowerCase());

  useEffect(() => { setHighlight(-1); }, [value]);

  const pick = (entry) => {
    onChange("");
    setFocused(false);
    onPick(entry);
  };

  const onKeyDown = (e) => {
    if (!visible.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlight((h) => Math.min(visible.length - 1, h + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlight((h) => Math.max(0, h - 1)); }
    else if (e.key === "Enter" && highlight >= 0) { e.preventDefault(); pick(visible[highlight]); }
    else if (e.key === "Escape") setFocused(false);
  };

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%" }}>
      <input
        className="search"
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        onKeyDown={onKeyDown}
        placeholder={placeholder || "🔍 Cari tag kamu… misal <table>"}
        aria-label="Cari tag"
        aria-expanded={focused && visible.length > 0}
        aria-autocomplete="list"
        role="combobox"
      />
      {focused && visible.length > 0 && (
        <ul role="listbox" style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, margin: 0, padding: ".35rem",
          background: "#fff", border: "2px solid var(--border)", borderRadius: 16, listStyle: "none",
          boxShadow: "0 10px 30px rgba(2,132,199,.25)", zIndex: 40, maxHeight: 320, overflowY: "auto",
        }}>
          {showAllMatches && <li style={{ fontSize: ".68rem", color: "#64748b", padding: ".2rem .5rem" }}>Menampilkan semua {visible.length}+ materi HTML · CSS · JS</li>}
          {visible.map((t, i) => (
            <li key={t.slug} role="option" aria-selected={i === highlight}
              onMouseDown={(e) => { e.preventDefault(); pick(t); }}
              onMouseEnter={() => setHighlight(i)}
              style={{
                display: "flex", alignItems: "center", gap: ".5rem",
                padding: ".4rem .55rem", borderRadius: 10, cursor: "pointer",
                background: i === highlight ? "#e0f2fe" : "transparent",
              }}>
              <span aria-hidden="true">{catEmoji[t.category] || "🏷️"}</span>
              <span style={{ fontFamily: "Consolas, monospace", fontSize: ".78rem", fontWeight: 800, color: "#0369a1" }}>{t.tag}</span>
              <span style={{ fontSize: ".78rem", color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
