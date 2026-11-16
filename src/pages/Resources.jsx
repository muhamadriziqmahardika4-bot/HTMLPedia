import React, { useEffect, useRef, useState } from "react";

const RESOURCES = [
  { flag: "🇮🇩", name: "Web Programming UNPAS — Sandhika Galih", desc: "Pemula → mahir. HTML, CSS, JavaScript, roadmap jelas, penjelasan runtut", url: "https://www.youtube.com/channel/UCkXmLjEr95LVtGuIm3l2dPg", tags: ["HTML", "CSS", "JS"] },
  { flag: "🇮🇩", name: "Dicoding", desc: "Channel resmi Dicoding — materi terstruktur + kelas gratis", url: "https://www.youtube.com/@DicodingIndonesia", tags: ["HTML", "CSS", "JS"] },
  { flag: "🇮🇩", name: "Programmer Zaman Now", desc: "Eko Kurniawan — sudut pandang industri, serius & mendalam", url: "https://www.youtube.com/@ProgrammerZamanNow", tags: ["JS", "Backend"] },
  { flag: "🇮🇩", name: "Sekolah Koding", desc: "Pelopor edukasi coding Indonesia, dasar sampai menengah", url: "https://www.youtube.com/@SekolahKoding", tags: ["HTML", "JS"] },
  { flag: "🇮🇩", name: "Kelas Terbuka", desc: "Gaya santai & humoris, cocok untuk pemula total", url: "https://www.youtube.com/@KelasTerbuka", tags: ["HTML", "CSS"] },
  { flag: "🇺🇸", name: "freeCodeCamp", desc: "Kursus lengkap 4–10 jam gratis — standar emas belajar gratis", url: "https://www.youtube.com/@freecodecamp", tags: ["HTML", "CSS", "JS"] },
  { flag: "🇺🇸", name: "Traversy Media", desc: "Brad Traversy — crash course berbasis proyek, sangat praktis", url: "https://www.youtube.com/@TraversyMedia", tags: ["HTML", "CSS", "JS"] },
  { flag: "🇺🇸", name: "The Net Ninja", desc: "Tutorial bertahap & rapi, dari dasar sampai framework", url: "https://www.youtube.com/@NetNinja", tags: ["JS", "React"] },
  { flag: "🇺🇸", name: "Kevin Powell", desc: "Spesialis CSS — layout, responsive, dan desain web modern", url: "https://www.youtube.com/@KevinPowell", tags: ["CSS"] },
  { flag: "🇺🇸", name: "Programming with Mosh", desc: "Penjelasan jernih & sabar, sangat ramah untuk pemula", url: "https://www.youtube.com/@programmingwithmosh", tags: ["JS"] },
  { flag: "🇺🇸", name: "Fireship", desc: "Konsep padat dalam ±100 detik — untuk memperluas wawasan cepat", url: "https://www.youtube.com/@Fireship", tags: ["JS", "Web"] },
];

function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }); },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const { className, style, ...restProps } = rest;
  return (
    <Tag ref={ref} {...restProps} className={`reveal ${visible ? "reveal-visible" : ""} ${className || ""}`}
      style={{ ...(style || {}), transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export default function Resources() {
  const indonesia = RESOURCES.filter((r) => r.flag === "🇮🇩");
  const luar = RESOURCES.filter((r) => r.flag === "🇺🇸");
  const Card = ({ r, i }) => (
    <Reveal as="a" className="res-card" href={r.url} target="_blank" rel="noreferrer" delay={(i % 6) * 90}>
      <div><span className="res-tag">▶ YouTube</span><span className="res-tag id">{r.flag}</span></div>
      <b>{r.name}</b>
      <small>{r.desc}</small>
      <div style={{ marginTop: ".3rem" }}>{r.tags.map((t) => <span key={t} className="res-tag id" style={{ background: "#e0f2fe", color: "#0369a1" }}>{t}</span>)}</div>
    </Reveal>
  );
  return (
    <div className="panel">
      <div className="breadcrumb">🏠 Beranda › <b>Sumber Belajar</b></div>
      <h2 style={{ marginTop: 0 }}><span className="title-underline">📺 Belajar dari yang Terbaik</span></h2>
      <p style={{ fontSize: ".85rem", color: "#0369a1" }}>Kurasi channel YouTube (Indonesia &amp; US) dari pemula sampai profesional. Klik kartu untuk membuka di YouTube.</p>

      <Reveal delay={0}><p className="section-title">🇮🇩 Channel Indonesia</p></Reveal>
      <div className="res-grid">{indonesia.map((r, i) => <Card key={r.name} r={r} i={i} />)}</div>

      <Reveal delay={0}><p className="section-title">🇺🇸 Channel Internasional (English)</p></Reveal>
      <div className="res-grid">{luar.map((r, i) => <Card key={r.name} r={r} i={i} />)}</div>
    </div>
  );
}
