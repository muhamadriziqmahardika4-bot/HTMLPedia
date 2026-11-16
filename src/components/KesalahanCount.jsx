import React, { useEffect, useState } from "react";
import { mistakesCount } from "../lib/mistakes.js";

// Menampilkan jumlah buku kesalahan di navbar (dibaca live dari localStorage)
export default function KesalahanCount() {
  const [n, setN] = useState(() => mistakesCount());
  useEffect(() => {
    const t = setInterval(() => setN(mistakesCount()), 800);
    return () => clearInterval(t);
  }, []);
  if (n === 0) return null;
  return <span style={{ background: "#ef4444", color: "#fff", borderRadius: 99, fontSize: ".62rem", padding: ".05rem .35rem", marginLeft: ".35rem", fontWeight: 800 }}>{n}</span>;
}
