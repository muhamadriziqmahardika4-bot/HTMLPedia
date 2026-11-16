# HTMLpedia — Desain Web Ensiklopedia HTML Interaktif

Tanggal: 2026-11-16
Pemilik: Mahardika (Keenan)
Lokasi project: `C:\HTMLpedia` (baru, dibuat di drive C)

## Intent & Why

Web edukasi interaktif tentang HTML (nanti menyusul CSS & JavaScript) untuk **dibagikan ke orang lain**, bukan hanya catatan pribadi. Tujuannya membuat belajar HTML tidak membosankan: setiap tag dijelaskan dengan bahasa mudah, disertai demo hidup dan animasi yang menarik ("candy style"), sehingga pemula betah dan paham.

## Goals

- Ensiklopedia **semua tag HTML** (±110 tag), dikelompokkan per kategori.
- Setiap tag punya halaman penjelasan dengan pola seragam:
  1. Badge nama tag + kategori + tingkat kesulitan + status "sudah dipelajari"
  2. "Apa itu?" — penjelasan bahasa sehari-hari
  3. Atribut/elemen penting yang terkait
  4. Contoh kode
  5. **Demo hidup** — elemen interaktif yang bisa diklik dan berubah dengan animasi
  6. **Coba sendiri** — editor kecil; hasil render tampil langsung
  7. Navigasi tag sebelumnya/berikutnya + tag terkait
- Bagian **Dasar-Dasar HTML**: dokumen/DOCTYPE, struktur head/body, atribut global, entitas karakter, komentar, meta tag, dll. — juga dengan animasi.
- Pencarian tag (instan), filter per kategori, daftar A–Z.
- Progress belajar tersimpan di `localStorage` + confetti saat menandai tag selesai.
- Konten Bahasa Indonesia.
- Dibangun dengan **React + Vite + Framer Motion**.
- Project dibuka di VS Code Mahardika setelah selesai (`code C:\HTMLpedia`).

- **Kuis & latihan (DIKONFIRMASI 2026-11-16, menggantikan "kuis fase 2")**:
  - Kuis per tag: 2–3 soal pilihan ganda di akhir halaman detail tag (soal tentang fungsi tag, atribut, atau output kode), muncul setelah tag ditandai selesai.
  - Mode **"Uji Kemampuan"** di `/kuis` dengan alur 4 langkah: **(1) Pilih topik** — HTML / CSS / JavaScript (CSS & JS disiapkan strukturnya, konten menyusul setelah rilis HTML), **(2) Pilih mode** — 🌱 **Latihan** (3 soal pemanasan), 🔥 **Greget** (5 soal menantang), 💀 **Gacor** (6 soal ekstrem), **(3) Pilih materi** — tag/konsep spesifik per topik atau "🎲 Campuran semua", **(4) Kerjakan** dengan pembahasan benar/salah dan skor akhir.
  - Skor terbaik per topik+mode disimpan di `localStorage` (`htmlpedia-quiz`), ditampilkan di beranda di samping progress tag.
  - Data soal di `data/quizzes.js`: minimal 3 soal per kategori saat rilis, target ±150 soal, ditulis langsung (bukan generator acak).
  - Navbar menampilkan item "Kuis" (menggantikan keputusan sebelumnya).
- **Splash/thumbnail pembuka (dikonfirmasi 2026-11-16)**: sebelum masuk beranda, pengunjung melihat layar pembuka bertema candy yang sama — badge "SELAMAT DATANG", **maskot robot "Cubby"** (karakter SVG lucu: kepala membulat, antena dengan lampu pink berdenyut, layar dada bersimbol `</>`) di atas box putih-biru lembut dengan **awan-awan SVG melayang** — 4 di dalam box (kiri/kanan atas & bawah) dan 2 di luar box (tengah atas & tengah bawah layar). Latar langit penuh dan matahari **tidak** dipakai; hanya elemen awan yang diambil. Tombol "🚀 MULAI — LANGSUNG GASS!" gradasi biru-ungu; kalimat deskripsi di bawah tombol. Elemen pendukung: **speech bubble Cubby** (teks berganti tiap ±2,6 dtk: "Halo! Aku Cubby 🤖" → "Siap belajar HTML?" → "Gas, langsung gass! 🚀"), **6 tag HTML mini melayang** di dalam box (`<h1>`, `<a>`, `<img>`, `<table>`, `<form>`, `<input>`), **sparkle ✦ berkedip** (twinkle kuning, 6 titik mengelilingi robot & judul), dan **transisi splash → beranda** (splash membesar + blur + fade-out 0,55 dtk, beranda masuk dengan zoom bounce `cubic-bezier(.2,1.4,.4,1)`). Masuk ke beranda hanya setelah tombol ditekan.
- **Halaman "👨‍💻 Tentang" (`/tentang`), item nav sendiri (dikonfirmasi 2026-11-16)**: profil pembuat — **M Riziq Mahardika** (IG: [@mhmdrziqmhrdika](https://www.instagram.com/mhmdrziqmhrdika?mdxt=MWR4dnMzaTRjZ25pYw==)), mahasiswa <b>Universitas BumiGora</b> yang sedang belajar menjadi programmer & web developer, berlatar desainer dan editor. Kredit "Dibuat dengan 💙 oleh M Riziq Mahardika · @mhmdrziqmhrdika" tampil di footer beranda dan splash. (Nama asisten AI **tidak** ditampilkan di situs, sesuai permintaan pemilik.)
- **Halaman "📺 Sumber" (`/sumber`), item nav sendiri (dikonfirmasi 2026-11-16)**: kurasi channel YouTube belajar HTML/CSS/JS dari pemula sampai profesional, dipisah Indonesia 🇮🇩 (Web Programming UNPAS, Dicoding, Programmer Zaman Now, Sekolah Koding, Kelas Terbuka) dan internasional US 🇺🇸 (freeCodeCamp, Traversy Media, The Net Ninja, Kevin Powell [CSS], Programming with Mosh, Fireship). Kartu taut ke channel YouTube masing-masing.

## Non-Goals / Anti-Goals

- **Bukan** ensiklopedia CSS/JS penuh pada rilis pertama — arsitektur data-driven disiapkan agar CSS & JS bisa ditambahkan setelahnya tanpa rombak struktur.
- Bukan backend/database — situs statis, tanpa login, tanpa server.
- Bukan pixel-perfect framework UI — komponen dibuat sendiri dengan CSS (tanpa Tailwind/Bootstrap) agar ringan dan khas.
- Tidak perlu PWA/offline eksplisit, tapi hasil build statis harus bisa dibuka dari hosting statis mana pun (mis. Vercel/Netlify/GitHub Pages).

## Constraints

- Komputer: Windows, Node v24.16.0, npm 11.13.0 tersedia.
- Offline-friendly saat development; tidak ada dependency besar tanpa alasan (hemat storage).
- Bahasa konten: Indonesia. Gaya: santai, mudah dipahami pemula.
- Harus bisa dibangun (`npm run build`) tanpa error dan jalan di `npm run dev`.

## Pendekatan yang Dipertimbangkan

1. **Vite + React + Framer Motion (dipilih)** — data tag sebagai modul terstruktur, satu komponen `TagPage` me-render semua tag; animasi per-tag seragam; pencarian & filter mudah. Trade-off: perlu build tooling (sudah tersedia).
2. **Astro** — bagus untuk konten, tapi animasi interaktif per tag tetap butuh pulau React; setup lebih rumit untuk kebutuhan ini.
3. **HTML statis + vanilla JS** — paling sederhana, tapi ±110 halaman dengan animasi seragam akan cepat berantakan dan sulit dirawat.

## Keputusan Desain (hasil diskusi)

- **Vibe visual: "Candy"** — warna pastel, bentuk membulat, bayangan tebal (hard shadow) gaya permen, gradasi lembut.
- **Palet: biru muda soft** — latar gradasi `#f0f9ff → #e0f2fe → #eef2ff → #f0fdfa`; aksen sky/cyan/indigo (`#38bdf8`, `#0ea5e9`, `#818cf8`, `#22d3ee`); teks gelap `#0c4a6e`.
- **Hero**: badge "ENSIKLOPEDIA HTML INTERAKTIF", judul besar "Belajar Tag HTML, **Raih & Buat Web Kamu Sendiri 🚀**", sub-teks "Dari nol sampai bisa bikin halaman web — satu tag, satu langkah."
- **Background dekoratif**: lingkaran outline besar di pojok, lingkaran solid pastel kecil, rounded-rectangle putih semi-transparan miring, aksen "✚" dan pola titik; semua absolute-position di belakang konten dan mengambang pelan (animasi float), `pointer-events: none`.
- **Kartu kategori**: putih, border warna-warni per kategori, radius 18px, hard shadow 4px sewarna border; hover terangkat + shadow menebal; klik = bounce.
- **Progress bar**: gradasi sky→indigo dengan shimmer bergerak; label "🚀 Progresmu: N / total tag".
- **Confetti** saat menandai tag selesai (canvas-confetti).
- Nama project: **HTMLpedia**, folder `C:\HTMLpedia`.
- Mockup (di `C:\HTMLpedia\.superpowers\brainstorm\309-1794821250\content\`): beranda v4 disetujui; pola halaman detail tag disetujui.

## Arsitektur & Bagian-bagian

```
C:\HTMLpedia\
  index.html
  package.json  vite.config.js
  src\
    main.jsx  App.jsx
    data\tags.js          # array semua tag: slug, nama, kategori, level, ringkasan, atribut[], contohKode, demo (id preset), tagTerkait[]
    data\basics.js        # materi "Dasar-Dasar HTML"
    data\categories.js    # 9 kategori + warna + ikon
    components\           # Navbar, Hero, SearchBar, CategoryCard, TagBadge, CodeBlock, DemoRenderer, Playground, ProgressRing, ConfettiButton, FloatingShapes
    pages\Home.jsx  TagIndex.jsx  TagDetail.jsx  Basics.jsx  BasicsDetail.jsx  Quiz? (opsional, lihat di bawah)
    hooks\useProgress.js  # localStorage
    styles\global.css     # variabel palet candy + keyframes (float, shimmer, blink, bounce)
  public\
```

- Routing: `react-router-dom` HashRouter (`/`, `/tag`, `/tag/:slug`, `/dasar`, `/dasar/:slug`, `/kuis`, `/sumber`, `/tentang`).
- Demo hidup: registry preset demo per tag (komponen kecil per jenis demo) dipilih lewat field `demo` di data; tag tanpa demo khusus memakai demo generik (render contoh + highlight).
- Playground "Coba sendiri": `<textarea>` + iframe `srcDoc` sandbox untuk render live (tanpa `allow-scripts` kecuali diperlukan; untuk tag scripting pakai `allow-scripts` di iframe tersandbox terpisah).
- Progress: `localStorage` key `htmlpedia-progress` berisi array slug selesai.
- Kuis dibangun di rilis 1 (lihat bagian Keputusan Kuis).
- Konten: semua teks ditulis langsung ke `data/*.js` (bukan CMS). Target kualitas: tiap tag minimal 3–6 kalimat penjelasan + contoh kode nyata + atribut penting.

## Kategori (9)

Struktur Dokumen • Teks & Heading • Link & Media • List & Tabel • Form & Input • Semantic & Layout • Metadata & Head • Scripting & Embedded • Elemen Interaktif (details/dialog/progress dsb.)

## Verifikasi Selesai

- `npm run dev` jalan; beranda, daftar tag, detail beberapa tag (mis. `table`, `a`, `img`, `input`), dan `/dasar` tampil benar.
- Pencarian mengembalikan hasil yang benar; filter kategori bekerja.
- Demo hidup & playground bekerja untuk minimal 5 tag berbeda.
- Progress tersimpan setelah reload; confetti muncul saat tandai selesai.
- Kuis per tag muncul setelah tag ditandai selesai; mode `/kuis` bisa memilih cakupan & jumlah soal, menampilkan skor + pembahasan, confetti saat lulus, skor tersimpan setelah reload.
- `npm run build` sukses.
- Project dibuka di VS Code (`code C:\HTMLpedia`).

## Keputusan Builder-Check (2026-11-16)

- **Sumber kebenaran tag**: HTML Living Standard / MDN. Tag usang (`<font>`, `<center>`, `<marquee>`, `<acronym>`, dll.) **ikut disertakan** dengan label "⚠️ Deprecated" dan penjelasan penggantinya.
- **Kedalaman demo**: custom interaktif untuk ±15–20 tag kunci (`a`, `img`, `table`, `form`, `input`, `select`, `details`, `dialog`, `progress`, `meter`, `video`, `audio`, `ul/ol`, `iframe`, `canvas`/`svg` minimal, dll.); sisanya demo generik yang konsisten.
- **Router**: `HashRouter` (aman untuk static hosting mana pun; keputusan deploy ditunda — belum tahu targetnya).
- **Dasar-Dasar HTML**: entri lebih sederhana dari tag — penjelasan + contoh kode + poin penting, tanpa playground; **tidak dihitung** di progress (progress hanya menghitung tag). Label progress: "🚀 Progresmu: N / 110 tag".
- **Responsif**: ya, mobile termasuk kriteria selesai (breakpoint utama: <768px menumpuk 1 kolom; dekorasi background dikurangi di mobile).
- **Media demo**: aset **lokal** di `public/assets/` (SVG/gambar kecil buatan sendiri, emoji, atau placeholder ringan) — tanpa hotlink eksternal; tetap offline-friendly.
- **Navbar**: item "Kuis" tampil sejak rilis 1 (lihat bagian Kuis).

## Yang Tersisa untuk Builder

- Detail implementasi komponen, nama file persis, urutan pengerjaan.
- Copywriting final tiap tag (ikuti gaya: santai, Bahasa Indonesia, contoh relevan konteks Indonesia).
