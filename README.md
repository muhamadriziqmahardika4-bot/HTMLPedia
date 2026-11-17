# HTMLpedia

Ensiklopedia interaktif **HTML, CSS & JavaScript** berbahasa Indonesia — belajar dari nol sampai bisa membuat web sendiri. Penjelasan bahasa Indonesia, demo hidup, playground "coba sendiri", kuis, proyek mini, dan kurasi channel YouTube.

Situs live: **https://htmlpedia-mahardika.vercel.app**

## Fitur

- **141 materi** dalam 11 kategori — pencarian instan, filter kategori, urutan belajar logis
- **Demo hidup** per tag kunci (tabel, form, canvas, dialog, dsb.) + playground sandbox
- **Alur belajar terpandu**: Baca → Praktik → Kuis Mini → lulus (tombol "Tandai Selesai")
- **Kuis** (`/kuis`) — Latihan / Greget / Gacor untuk HTML/CSS/JS, skor tersimpan
- **Review Kilat** (`/review`) — tes ingatan 3 tahap
- **Buku Kesalahan** (`/kesalahan`) — ulang soal-soal yang pernah salah
- **Progress belajar** — centang materi selesai, tersimpan & tersinkron ke akun
- **Streak harian**, **Proyek Mini** (`/proyek`) dengan auto-check, **Tempat Ngoding** (`/ngoding`)
- **Wajib login** — magic link email atau akun username+password (tanpa email)
- **19 avatar kartun** original + 10 gaya border yang bisa dipilih
- **Kotak Saran & Masukan** (`/saran`) — saran anggota masuk ke halaman laporan pemilik (`/saran/daftar`)

## Menjalankan secara lokal

```bash
npm install
npm run dev       # dev server → http://localhost:5173
npm run build     # build produksi ke dist/ (menulis public/version.json)
npm run preview   # pratinjau hasil build → http://localhost:4173
npm test          # Vitest
npm run audit     # audit otomatis 141 contoh kode
```

## Deploy

Push ke branch `main` → GitHub Actions otomatis build & deploy ke **Vercel** (`.github/workflows/deploy.yml`, memakai `scripts/deploy-vercel.mjs`). Setiap push langsung tayang di `https://htmlpedia-mahardika.vercel.app`.

## Struktur folder

```
src/
  data/        # konten materi (tags, css, js, basics, kuis, video) + validasi
  demos/       # preset demo hidup per tag kunci
  components/  # komponen UI (Navbar, Playground, QuizFlow, dll.)
  hooks/       # hooks kecil (useProgress, useQuiz, useAuth)
  lib/         # helper (progressSync, profiles, supabase, feedback, dll.)
  pages/       # halaman-halaman aplikasi
public/
  avatars/     # 19 avatar kartun original (licenci sendiri)
scripts/       # build, audit, deploy (vercel & legacy netlify)
docs/          # dokumen desain & panduan setup Supabase
test/          # unit test (Vitest)
```

## Kontribusi & saran

Kirim saran/laporan lewat menu **💬 Saran** di aplikasi. Data sensitif akun tidak pernah ditulis di repositori ini.

---

Dibuat oleh **M Riziq Mahardika** (Universitas BumiGora) — IG: [@mhmdrziqmhrdika](https://www.instagram.com/mhmdrziqmhrdika)
