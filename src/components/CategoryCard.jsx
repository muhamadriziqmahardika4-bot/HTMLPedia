import React from "react";
export default function CategoryCard({ emoji, name, desc, color, border, onClick }) {
  return (
    <button className="card" style={{ borderColor: border, boxShadow: `0 4px 0 ${border}` }} onClick={onClick}>
      <span className="emoji" aria-hidden="true">{emoji}</span>
      <b style={{ color }}>{name}</b>
      <span>{desc}</span>
    </button>
  );
}

