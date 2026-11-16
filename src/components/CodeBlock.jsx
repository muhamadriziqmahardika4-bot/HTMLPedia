import React from "react";

// CodeBlock — menampilkan contoh kode sebagai TEKS literal (aman dari XSS).
export default function CodeBlock({ code, label }) {
  return (
    <div className="code" role="region" aria-label={label || "Contoh kode"}>
      <pre style={{ margin: 0, whiteSpace: "pre", overflowX: "auto" }}>{code}</pre>
    </div>
  );
}
