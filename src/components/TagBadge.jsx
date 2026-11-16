import React from "react";

export default function TagBadge({ tag, lang = "html" }) {
  const cls = lang === "css" ? "badge-css" : lang === "js" ? "badge-js" : "badge-html";
  return <span className={`tag-badge ${cls}`}>{tag}</span>;
}
