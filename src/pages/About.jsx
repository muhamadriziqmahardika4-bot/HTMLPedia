import React from "react";

export default function About() {
  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <div className="breadcrumb" style={{ textAlign: "left" }}>🏠 Beranda › <b>Tentang Developer</b></div>
      <div style={{ fontSize: "3.5rem" }}>👨‍💻</div>
      <h2 style={{ margin: ".2rem 0" }}>M Riziq Mahardika</h2>
      <div style={{ display: "flex", gap: ".4rem", justifyContent: "center", flexWrap: "wrap", margin: ".4rem 0 1rem" }}>
        <span className="chip active">🎓 Mahasiswa Universitas BumiGora</span>
        <span className="chip css active">🎨 ex-Designer</span>
        <span className="chip js active">✂️ ex-Editor</span>
        <span className="chip">🌐 Web Developer</span>
      </div>
      <p style={{ maxWidth: 560, margin: "0 auto", fontSize: ".9rem", lineHeight: 1.7, color: "#075985" }}>
        Halo! Aku <b>Mahardika</b> — mahasiswa <b>Universitas BumiGora</b> yang sedang menempuh perjalanan menjadi{" "}
        <b>programmer &amp; web developer</b>. Aku berawal dari dunia <b>desain</b> dan{" "}
        <b>editing</b>, dan sekarang menyalurkan sisi kreatif itu ke layar lewat kode:
        membangun web yang nggak cuma jalan, tapi juga enak dipandang. HTMLpedia ini
        lahir dari perjalananku sendiri belajar HTML dari nol — semoga bisa jadi
        teman belajar yang seru buat kamu juga. 🚀
      </p>
      <a className="pill" href="https://www.instagram.com/mhmdrziqmhrdika?mdxt=MWR4dnMzaTRjZ25pYw==" target="_blank" rel="noreferrer"
        style={{ display: "inline-block", marginTop: ".6rem", textDecoration: "none" }}>
        📸 Ikuti di Instagram: @mhmdrziqmhrdika
      </a>
    </div>
  );
}
