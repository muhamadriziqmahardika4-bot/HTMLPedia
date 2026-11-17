# Setup Supabase untuk HTMLpedia — Login Email + Progress Tersimpan

Total waktu ±10 menit. Gratis (tier Free Supabase + Netlify).

## 1. Buat project
1. Buka [supabase.com](https://supabase.com) → **Sign up / Log in**
2. Klik **New project** → Name: `htmlpedia` (bebas) → Region: terserah (pilih yang dekat, misal **Southeast Asia (Singapore)**)
3. Set **Database Password** — catat, tapi HTMLpedia tidak memakainya (yang dipakai anon key)
4. Klik **Create new project**, tunggu ±1 menit

## 2. Aktifkan login Email (magic link)
Biasanya sudah aktif default. Cek:
**Authentication → Sign In / Providers → Email** → pastikan aktif,
lalu **Authentication → Configuration → Email** → aktifkan **Enable Magic Link** (atau biarkan default, `signInWithOtp` tetap bisa kirim link).

## 3. Izinkan URL situs (WAJIB — kalau tidak, magic link gagal redirect)
**Authentication → URL Configuration**
- **Site URL**: `https://htmlpedia-mahardika.netlify.app`
- **Redirect URLs** → Add: `https://htmlpedia-mahardika.netlify.app` dan `http://localhost:4180`
  (tambahkan domain lain kalau nanti pakai custom domain)

## 4. Buat tabel progress
**SQL Editor → New query** → tempel isi `docs/supabase-setup.sql` → **Run**
(Tabel `user_progress` + Row Level Security: tiap pengguna hanya bisa baca/tulis datanya sendiri.)

## 5. Ambil kredensial API
**Project Settings → API**
- **Project URL** → contoh `https://xxxx.supabase.co`
- **anon public** key (kunci panjang `eyJ...`)

Kunci anon memang untuk frontend — aman dipublikasikan.
Yang TIDAK boleh dibagikan: `service_role` key.

## 6. Build & deploy dengan env
Buat file `.env.local` di root proyek (file ini tidak ter-commit — cek `.gitignore`: `*.local`):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
VITE_OWNER_EMAIL=emailkamu@example.com
```

- `VITE_OWNER_EMAIL` = email kamu → otomatis jadi **👑 Mode Pemilik** di Proyek Mini (semua proyek terbuka)

Lalu build & deploy seperti biasa:

```bash
npm run build
NETLIFY_TOKEN=... SITE_NAME=htmlpedia-mahardika node deploy-netlify.mjs
```

## Yang didapat pengguna
- Wajib login dengan magic link (tanpa password)
- Progress (materi selesai, stage kuis, streak, Buku Kesalahan, Proyek Mini) **tersimpan di akunnya**,
  dan **tersinkron antar perangkat** — HP & laptop menampilkan progress yang sama
- Data lama di browser (localStorage) otomatis ikut tergabung saat pertama login (merge union, tidak ada yang hilang)

## Troubleshooting
- **"Belum siap dipakai"** di situs → env belum masuk saat build → ulangi langkah 6
- **Magic link tidak redirect** → Site URL / Redirect URLs salah → langkah 3
- **"relation public.user_progress does not exist"** → SQL belum dijalankan → langkah 4
- **Email tidak masuk** → cek folder Spam; gratis tier Supabase membatasi ±4 email/jam
