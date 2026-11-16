# 🍡 HTMLpedia

Ensiklopedia interaktif **semua tag HTML** — belajar dari nol sampai bisa bikin web sendiri. Berisi penjelasan Bahasa Indonesia, demo hidup, playground "coba sendiri", kuis (🌱 Latihan / 🔥 Greget / 💀 Gacor), dan kurasi channel YouTube belajar web.

## Menjalankan

```bash
npm install
npm run dev       # dev server (default http://localhost:5173)
npm run build     # build produksi ke dist/
npm run preview   # pratinjau hasil build
npm test          # menjalankan test (Vitest)
```

## Struktur

- `src/data/` — konten (tag, kategori, kuis, dasar-dasar HTML) sebagai modul data
- `src/components/` — komponen UI (Navbar, DemoRenderer, Playground, dst.)
- `src/demos/` — preset demo hidup per tag kunci
- `src/hooks/` — hooks (`useProgress`, `useQuiz`) dengan proteksi localStorage
- `src/pages/` — halaman (Splash, Beranda, TagIndex, TagDetail, Kuis, Sumber, Tentang, Dasar)
- `src/styles/global.css` — palet "candy soft blue" + semua gaya

Dibuat dengan 💙 oleh M Riziq Mahardika.
