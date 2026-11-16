# 🍡 HTMLpedia

Ensiklopedia interaktif **semua tag HTML** (114 entri, termasuk tag deprecated dengan label ⚠️) — belajar dari nol sampai bisa bikin web sendiri. Penjelasan Bahasa Indonesia, demo hidup, playground "coba sendiri", kuis 3 mode, dan kurasi channel YouTube.

## Fitur

- **141 materi** dalam 11 kategori — search instan, filter kategori, daftar A–Z
- **Dasar-Dasar HTML** (`/dasar`) — 18 materi penting untuk pemula
- **Demo hidup** per tag kunci (tabel, form, canvas, dialog, dll.) + playground sandboxed
- **Kuis** (`/kuis`) — 🌱 Latihan / 🔥 Greget / 💀 Gacor × HTML / CSS / JavaScript, dengan skor terbaik tersimpan
- **Progress belajar** — centang tag selesai, tersimpan di localStorage + confetti 🎉
- **Sumber** (`/sumber`) — kurasi YouTube belajar web (🇮🇩 Indonesia & 🇺🇸 US)
- **Tentang** (`/tentang`) — profil pembuat

## Menjalankan

```bash
npm install
npm run dev       # dev server → http://localhost:5173
npm run build     # build produksi ke dist/
npm run preview   # pratinjau hasil build → http://localhost:4173
npm test          # Vitest
```

## Struktur

- `src/data/` — konten: `tags.js` (data tag HTML, `categories.js`, `quizzes.js`, `basics.js`
- `src/demos/` — preset demo hidup per tag kunci
- `src/components/` — Navbar, Playground, DemoRenderer, QuizFlow, dst.
- `src/hooks/` — `useProgress`, `useQuiz` (localStorage, tahan data rusak)
- `src/pages/` — Splash, Home, TagIndex, TagDetail, Quiz, Resources, About, Basics
- `src/styles/global.css` — palet "candy soft blue"

Dibuat dengan 💙 oleh **M Riziq Mahardika** (Universitas BumiGora) · IG: [@mhmdrziqmhrdika](https://www.instagram.com/mhmdrziqmhrdika)
