# HTMLpedia — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bangun HTMLpedia — web edukasi interaktif berbahasa Indonesia berisi ensiklopedia semua tag HTML (±110 tag), bagian Dasar-Dasar HTML, kuis (Latihan/Greget/Gacor × HTML/CSS/JavaScript), halaman Sumber (link YouTube), Tentang pembuat — semua dengan gaya visual "candy soft blue", maskot Cubby, dan animasi yang halus.

**Architecture:** Situs statis React + Vite. Konten tag/kuis/basics sebagai modul data JS terstruktur; satu set komponen me-render semua tag (pola seragam). Routing HashRouter. State progress di localStorage. Tidak ada backend.

**Tech Stack:** React 18, Vite, react-router-dom v6 (HashRouter), framer-motion, canvas-confetti, Vitest (test integritas data).

**Spec:** `C:\HTMLpedia\docs\2026-11-16-htmlpedia-design.md`
**Visual reference:** `C:\HTMLpedia-preview` (preview interaktif yang sudah disetujui Mahardika — tiru tampilan, animasi, dan alur persis).

## Global Constraints

- Project root: `C:\HTMLpedia` (baru, belum ada kode apa pun kecuali `docs/`).
- Bahasa konten: **Indonesia**, gaya santai, contoh relevan konteks Indonesia.
- Palet: latar gradasi `#f0f9ff → #e0f2fe → #eef2ff → #f0fdfa`; aksen `#38bdf8 / #0ea5e9 / #818cf8 / #22d3ee`; teks `#0c4a6e`; border `#bae6fd / #c7d2fe`; radius besar + hard shadow `0 4px 0 <warna border>`.
- Font: `"Segoe UI Rounded", "Segoe UI", system-ui, sans-serif`; mono: `Consolas, monospace`.
- `zoom: 1.32` pada `.app` (sesuai preview); layout responsif; breakpoint 768px → 1 kolom, dekorasi background dikurangi.
- Offline-friendly: semua aset media **lokal** di `public/assets/` (SVG/gambar kecil buatan sendiri); dilarang hotlink.
- Tanpa dependency berat tanpa alasan; Tailwind/Bootstrap **tidak** dipakai — CSS murni di `styles/global.css`.
- Tag deprecated (`<font>`, `<center>`, `<marquee>`, `<acronym>`, dll.) **ikut disertakan** dengan label `⚠️ Deprecated` + penjelasan penggantinya. Sumber kebenaran: HTML Living Standard / MDN.
- Router: `HashRouter`. Build harus `vite build` sukses tanpa error.
- Tidak ada Kuis untuk CSS/JS dengan konten penuh — struktur & soal contoh boleh ada, konten penuh HTML saja; halaman Sumber & Tentang sesuai spesifikasi.
- Nama pembuat yang ditampilkan: **M Riziq Mahardika**, IG **@mhmdrziqmhrdika**, mahasiswa **Universitas BumiGora**. Nama asisten AI **tidak** ditampilkan.

## Review Focus

1. **`<script>`/`<iframe>`/`srcDoc` di playground** — satu tag salah sandbox bisa menjalankan JS user di origin utama. → Task 8 (Playground) mewajibkan iframe `sandbox=""` (tanpa `allow-scripts`) untuk konten review biasa, dan test yang memastikan atribut `sandbox` selalu ada; tag scripting/demo memakai iframe tersandbox terpisah dengan `allow-scripts`.
2. **Data tag tidak lengkap/duplikat** — 110 entri ditulis manual; satu slug ganda atau field kosong merusak route & pencarian. → Task 3–5 (batch konten) memakai test validasi skema (unique slug, field wajib non-kosong, kategori valid) yang **harus hijau setiap batch**.
3. **localStorage rusak/berisi sampah** (user edit, versi lama) → progress crash dan halaman putih. → Task 6 (`useProgress`) mewajibkan test: data tidak valid/terpotong → fallback array kosong, tidak throw.
4. **Zoom 1.32 + `position: fixed`** — fixed di dalam ancestor ber-zoom menjadi fixed relatif ke ancestor, bukan viewport; dekorasi bisa "ikut scroll". → Task 9 mewajibkan dekorasi background di luar elemen ber-zoom atau memakai `position: absolute` dalam container, dan test manual: scroll di beranda tidak boleh ada elemen fixed ikut bergerak.
5. **XSS lewat render konten/demo** — contoh kode tag yang dimasukkan lewat `dangerouslySetInnerHTML` tanpa escape menyuntik HTML/JS. → Task 7 (`CodeBlock`/`TagDetail`) dilarang `dangerouslySetInnerHTML` kecuali untuk string yang sudah di-escape sendiri; test memastikan contoh kode yang mengandung `<img onerror>` tampil sebagai teks, bukan dieksekusi.

---

### Task 1: Scaffold + git + gaya global

**Files:**
- Create: `C:\HTMLpedia\package.json`, `vite.config.js`, `index.html`, `.gitignore`
- Create: `src/main.jsx`, `src/App.jsx` (placeholder Routes), `src/styles/global.css`
- Create: `README.md`

**Interfaces:**
- Produces: `npm run dev` jalan di port 5173; `npm run build` sukses; `.app { zoom: 1.32 }` tersedia; variabel CSS palet; keyframes `floaty`, `floaty2`, `twinkle`, `shimmer`, `marquee`, `rowIn`, `popIn` tersedia untuk dipakai semua task berikutnya.

- [ ] **Step 1:** `git init` di `C:\HTMLpedia`; tulis `.gitignore` (`node_modules/`, `dist/`, `.superpowers/`).
- [ ] **Step 2:** `npm create vite@latest . -- --template react` (di folder kosong-ish `C:\HTMLpedia`; dokumen di `docs/` dipertahankan) lalu `npm i react-router-dom framer-motion canvas-confetti` dan `npm i -D vitest jsdom @testing-library/react`.
- [ ] **Step 3:** `index.html` — judul "HTMLpedia — Ensiklopedia Interaktif Tag HTML", `lang="id"`, favicon emoji 🍡 (inline SVG data URI).
- [ ] **Step 4:** `src/styles/global.css` — port **persis** variabel & komponen dari `C:\HTMLpedia-preview\src\index.css` (palet, `.app` zoom 1.32, `.shapes`, `.node`, `.cloud`, `.sparkle`, `.float-tag`, `.marquee`, `.progress`, `.card`, `.panel`, `.sticker`, `.chip`, `.mode-card`, `.quiz-opt`, `.res-card`, `.reveal`, `.cubby-bubble` dll.) plus responsif 768px (grid 1 kolom, sembunyikan beberapa `.shape`).
- [ ] **Step 5:** `src/App.jsx` — `HashRouter` + `Routes` kosong placeholder, `<Navbar />` render di atas. `npm run build` → sukses.
- [ ] **Step 6:** Commit `feat: scaffold HTMLpedia (Vite + React + router + global styles)`.

### Task 2: Data kategori + skema tag + test validasi

**Files:**
- Create: `src/data/categories.js`
- Create: `src/data/tags.js` (array kosong dulu + konstanta `REQUIRED_FIELDS`)
- Create: `test/tags.test.js` (Vitest)

**Interfaces:**
- Produces: `CATEGORIES` — array 9 objek `{ id, name, emoji, desc, color, border }` dengan id: `struktur`, `teks`, `link-media`, `list-tabel`, `form`, `semantic`, `metadata`, `scripting`, `interaktif`.
- Produces: entri tag wajib berbentuk `{ slug, tag, name, category, level ('Pemula'|'Menengah'), summary, atribut: [{name, desc}], contohKode, related: [slug], demo }`; `demo` = string id preset atau `'generic'`.
- Produces: fungsi `validateTags(tags)` di `src/data/validate.js` → `string[]` (daftar error); test memanggilnya dan mengharapkan `[]`.

- [ ] **Step 1:** Tulis `test/tags.test.js`: import `TAGS` dari `src/data/tags.js`; assert (a) tiap entri punya semua field wajib & non-kosong, (b) `slug` unik, (c) `category` ada di `CATEGORIES`, (d) `related` menunjuk slug yang ada, (e) `level` valid.
- [ ] **Step 2:** Run → FAIL (file belum ada). Buat `src/data/validate.js` dengan `validateTags` mengimplementasikan semua assert di atas; buat `tags.js` berisi `export const TAGS = []` dan `categories.js` lengkap 9 kategori.
- [ ] **Step 3:** Run → PASS (array kosong valid).
- [ ] **Step 4:** Commit `feat: kategori + validator skema data tag`.

### Task 3: Konten tag — batch 1 (Struktur, Teks, Link & Media)

**Files:**
- Modify: `src/data/tags.js`
- Test: `test/tags.test.js` (dipakai apa adanya)

**Interfaces:**
- Consumes: skema Task 2.

- [ ] **Step 1:** Tambah entri lengkap untuk kategori `struktur` (±12 tag: `html`, `head`, `body`, `title`, `meta`, `link`, `style`, `base`, `!DOCTYPE` sebagai pseudo-entri dokumentasi, dll.), `teks` (±25 tag: `h1`–`h6`, `p`, `br`, `hr`, `strong`, `em`, `b`, `i`, `u`, `s`, `mark`, `small`, `sub`, `sup`, `abbr`, `cite`, `q`, `blockquote`, `code`, `pre`, `kbd`, `samp`, `var`, `time`, `data`, `dfn`, `ins`, `del`), `link-media` (±14: `a`, `img`, `picture`, `source`, `figure`, `figcaption`, `audio`, `video`, `track`, `map`, `area`, `svg`, `math`, `iframe`, `embed`, `object`).
  - Setiap tag: `summary` 3–6 kalimat Bahasa Indonesia santai; `atribut` minimal 3 (atau semua yang penting); `contohKode` contoh nyata (nama orang Indonesia); `related` terisi; `demo: 'generic'` kecuali tag kunci: `a`, `img`, `iframe`, `video`, `audio` (demo id: `'link'`, `'img-fallback'`, `'iframe-sandbox'`, `'media'`).
  - Tag deprecated ditandai `deprecated: true` + field `replacedBy: '<css-property>'` di summary.
- [ ] **Step 2:** `npx vitest run` → PASS (validator hijau).
- [ ] **Step 3:** Commit `content: tag batch 1 (struktur, teks, link & media)`.

### Task 4: Konten tag — batch 2 (List & Tabel, Form)

- [ ] **Step 1:** Tambah ±14 tag `list-tabel` (`ul`, `ol`, `li`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `caption`, `colgroup`, `col`) — `table`, `tr`, `td`, `th` pakai `demo: 'table-live'`.
- [ ] **Step 2:** Tambah ±20 tag `form` (`form`, `input`, `textarea`, `select`, `option`, `optgroup`, `label`, `button`, `fieldset`, `legend`, `datalist`, `output`, `progress`, `meter`, `details`, `summary`, `dialog`, `menu`? — `menu` masuk `interaktif`) — `form`, `input`, `select`, `textarea`, `progress`, `meter`, `details`, `dialog` pakai demo khusus (`form-validate`, `input-types`, `select-live`, `textarea-counter`, `progress-anim`, `meter-anim`, `details-toggle`, `dialog-modal`).
- [ ] **Step 3:** `npx vitest run` → PASS. Commit `content: tag batch 2 (list/tabel, form)`.

### Task 5: Konten tag — batch 3 (Semantic, Metadata, Scripting, Interaktif)

- [ ] **Step 1:** `semantic` (±18: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `address`, `hgroup`, `search`, `div`, `span`, `em`-related sudah ada — skip duplikat) ; `metadata` (±12: `meta` sudah ada — `title` done, tambah `base`, `link` variants, `style`, `script` basics, `noscript`, `template`, `slot`) ; `scripting` (±8: `script`, `noscript`, `template`, `slot`, `canvas`, `svg` done? — `svg` di batch 1, `canvas` `scripting` demo `canvas-draw`) ; `interaktif` (±12: `details`, `summary`, `dialog`, `progress`, `meter`, `output`, `menu`, `menuitem`(deprecated), `marquee` (deprecated), `center`, `font`, `acronym`).
- [ ] **Step 2:** Total tag harus **≥ 100**; test tambahan: `expect(TAGS.length).toBeGreaterThanOrEqual(100)`.
- [ ] **Step 3:** `npx vitest run` → PASS. Commit `content: tag batch 3 (semantic, metadata, scripting, interaktif)`.

### Task 6: useProgress + useQuiz (localStorage aman)

**Files:**
- Create: `src/hooks/useProgress.js`, `src/hooks/useQuiz.js`
- Test: `test/useProgress.test.js`, `test/useQuiz.test.js`

**Interfaces:**
- Produces: `useProgress()` → `{ done: string[], toggle(slug), isDone(slug), count, total }`; key `htmlpedia-progress`.
- Produces: `useQuiz()` → `{ best: Record<string, number> (key `${topic}:${mode}`), saveResult(topic, mode, score, total) }`; key `htmlpedia-quiz`.

- [ ] **Step 1:** Test: (a) toggle menambah/menghapus slug + tersimpan; (b) localStorage berisi `"{rusak"` → hook kembali `done=[]`, tidak throw; (c) `saveResult` menyimpan max, tidak menimpa dengan nilai lebih kecil.
- [ ] **Step 2:** Run → FAIL. Implementasikan hooks (`try/catch` JSON.parse, validasi `Array.isArray`, dsb.).
- [ ] **Step 3:** Run → PASS. Commit `feat: hooks progress & kuis dengan proteksi data rusak`.

### Task 7: Komponen dasar (Navbar, shapes, CodeBlock, badge)

**Files:**
- Create: `src/components/Navbar.jsx`, `FloatingShapes.jsx`, `CodeBlock.jsx`, `TagBadge.jsx`, `ConfettiButton.jsx`, `ProgressBar.jsx`, `SearchBar.jsx`, `CategoryCard.jsx`
- Test: `test/codeblock.test.jsx`

**Interfaces:**
- Consumes: palet global.css; `useProgress`.
- Produces: `<CodeBlock code={string} />` — render contoh kode sebagai **teks** (escape lewat textContent), highlight baris sederhana opsional; **dilarang** `dangerouslySetInnerHTML` tanpa escape internal.
- Produces: `<ConfettiButton onDone label>` memanggil `canvas-confetti` saat diklik (dipakai di TagDetail & Kuis).

- [ ] **Step 1:** Test: `CodeBlock` dengan kode `<img src=x onerror=window.__xss=1>` → `window.__xss` undefined; teks tampil literal.
- [ ] **Step 2:** Run → FAIL → implement → PASS.
- [ ] **Step 3:** Komponen lain port dari preview (Navbar: Beranda/Kuis/Sumber/Tentang + logo gradient; FloatingShapes: 3 shape default; CategoryCard: emoji+nama+desc, hard shadow hover; SearchBar: input pill; ProgressBar shimmer; TagBadge gradient). Visual harus setara preview.
- [ ] **Step 4:** Commit `feat: komponen dasar`.

### Task 8: Playground + DemoRenderer + demo preset

**Files:**
- Create: `src/components/Playground.jsx`, `src/components/DemoRenderer.jsx`
- Create: `src/demos/*.jsx` (satu file per preset: `TableLive`, `FormValidate`, `InputTypes`, `SelectLive`, `TextareaCounter`, `ProgressAnim`, `MeterAnim`, `DetailsToggle`, `DialogModal`, `LinkDemo`, `ImgFallback`, `MediaDemo`, `CanvasDraw`, `GenericDemo`)

**Interfaces:**
- Produces: `<Playground initialCode onChange?>` — textarea mono + iframe `sandbox=""` (**tanpa** `allow-scripts`), `srcDoc` dari kode user, update debounce 300ms; **test memastikan atribut `sandbox` ada & kosong**.
- Produces: `<DemoRenderer demo={id} tag={entry} />` switch ke preset; `generic` render contohKode di kotak + highlight tanpa interaksi.
- Review Focus #1: `DialogModal` memakai elemen `<dialog>` asli (bukan createPortal) supaya aman.

- [ ] **Step 1:** Test Playground: render dengan kode apapun → iframe punya `sandbox=""`; kode mengandung `<script>` tetap tampil sebagai teks di srcDoc (tidak dieksekusi di ortu).
- [ ] **Step 2:** Implement Playground → PASS.
- [ ] **Step 3:** Implement semua preset demo (animasi sesuai spec: rowIn untuk baris tabel, confetti tidak di sini). Verifikasi manual lewat dev server untuk `table-live`, `form-validate`, `dialog-modal`, `canvas-draw`.
- [ ] **Step 4:** Commit `feat: playground & 20 demo preset`.

### Task 9: Halaman Splash + Beranda + Sumber + Tentang + Dasar

**Files:**
- Create: `src/pages/Splash.jsx` (port preview: Cubby SVG, Cloud, Sparkle, FloatTag, CubbyBubble, wave top/bottom, transisi beruntun pieceOut → panelOut → wrapOut, `sessionStorage`? tidak — splash tiap load, tombol MULAI)
- Create: `src/pages/Home.jsx` (hero + search + progress + sticker + grid kategori + marquee tags + footer kredit)
- Create: `src/pages/Resources.jsx` (daftar channel dari preview, Reveal scroll-driven bolak-balik `animation-timeline: view()`, heading + kartu)
- Create: `src/pages/About.jsx` (port preview + Universitas BumiGora, IG @mhmdrziqmhrdika)
- Create: `src/data/basics.js` + `src/pages/Basics.jsx`, `src/pages/BasicsDetail.jsx` (halaman dasar sederhana: penjelasan + contoh + poin, tanpa playground, **tidak** dihitung di progress)
- Test: `test/home.test.jsx` (render Home dengan MemoryRouter → heading "Raih & Buat Web Kamu Sendiri" ada; grid 9 kategori render)

**Interfaces:**
- Consumes: komponen Task 7; `useProgress`.

- [ ] **Step 1:** Test Home → FAIL → implement Splash/Home/Resources/About/Basics → PASS.
- [ ] **Step 2:** Review Focus #4: pastikan `.shapes`/dekorasi **di luar** `.app` (bukan fixed di dalam ancestor zoom); scroll di beranda tidak menggeser/fixed elemen apa pun — cek manual dengan devtools (scrollHeight > 100vh).
- [ ] **Step 3:** Commit `feat: splash, beranda, sumber, tentang, dasar HTML`.

### Task 10: TagIndex (A–Z + search + filter) & TagDetail

**Files:**
- Create: `src/pages/TagIndex.jsx`, `src/pages/TagDetail.jsx`
- Modify: `src/App.jsx` (routes)
- Test: `test/tagdetail.test.jsx`

**Interfaces:**
- Consumes: `TAGS`, `useProgress`, `DemoRenderer`, `Playground`, `CodeBlock`, `ConfettiButton`.
- Route: `/tag` (daftar, search `?q=`, filter kategori via query param), `/tag/:slug`.
- TagDetail memakai pola preview persis: breadcrumb → header badge + tombol "Tandai Selesai" (confetti saat ditandai) → kolom kiri (Apa itu / Atribut / Contoh kode) → kolom kanan (Demo hidup + Coba sendiri) → prev/next + tag terkait.
- Tag tidak dikenal → tampilkan 404 manis dengan Cubby + link balik.
- Tombol "Tandai Selesai" hanya untuk halaman tag; label progress "🚀 Progresmu: N / 100+ tag".

- [ ] **Step 1:** Test: `/tag/table` render heading "Membuat Tabel Data"; tombol toggle mengubah status jadi "✓ Selesai!" (dengan `localStorage` stub).
- [ ] **Step 2:** Implement → PASS.
- [ ] **Step 3:** Commit `feat: daftar tag A-Z + halaman detail tag`.

### Task 11: Kuis (per-tag + mode Latihan/Greget/Gacor, topik HTML/CSS/JS)

**Files:**
- Create: `src/data/quizzes.js`, `src/components/QuizFlow.jsx`, `src/pages/Quiz.jsx`, `src/components/TagQuiz.jsx`
- Modify: `src/pages/TagDetail.jsx` (sisipkan TagQuiz setelah tag ditandai selesai)
- Test: `test/quiz.test.jsx`

**Interfaces:**
- Produces: `QUIZZES = { HTML: { latihan: [...], greget: [...], gacor: [...] }, CSS: {...}, JavaScript: {...} }` — minimal **3 latihan + 5 greget + 6 gacor per topik** (port contoh dari preview), HTML wajib lengkap; CSS/JS boleh contoh + sisanya soal HTML dipakai? **Tidak** — sediakan soal CSS & JS secukupnya; sisanya boleh reuse soal HTML? **Tidak boleh** — tulis minimal untuk 3 mode × 3 topik (port dari preview: HTML 3/5/6, CSS 3/5/6, JS 3/5/6 = 57 soal minimal) + tambah soal HTML tambahan sampai ±40 soal HTML. Target akhir ±90 soal; sisanya menyusul.
- Alur `/kuis`: pilih topik → pilih mode → pilih materi (chip per tag/konsep atau "🎲 Campuran semua") → soal dikerjakan (jawaban langsung diwarnai + skor akhir + confetti bila ≥70%) → skor terbaik tersimpan via `useQuiz`.
- `TagQuiz`: 2–3 soal PG dari tag bersangkutan, muncul setelah `isDone(slug)`.

- [ ] **Step 1:** Test: alur kuis — pilih HTML → Latihan → pilih materi → jawab 3 soal → skor akhir tampil; `useQuiz.saveResult` dipanggil; jawaban benar diberi kelas `correct`.
- [ ] **Step 2:** Implement QuizFlow + TagQuiz + Quiz page + quizzes.js → PASS.
- [ ] **Step 3:** Commit `feat: kuis 3 mode × 3 topik + kuis per tag`.

### Task 12: Routing final + 404 + build + README + buka VS Code

**Files:**
- Modify: `src/App.jsx` (semua route final), `index.html`
- Modify: `README.md` (cara jalan: `npm i`, `npm run dev`, `npm run build`, struktur folder)
- Delete: tidak ada

- [ ] **Step 1:** 404 route (`*`) → halaman Cubby + tombol "Kembali ke Beranda".
- [ ] **Step 2:** `npm run build` → sukses; `npm run preview` → buka & smoke-test beranda, /tag, /tag/table, /kuis (alur lengkap), /dasar, /sumber, /tentang, halaman tag tak dikenal.
- [ ] **Step 3:** `npx vitest run` → semua hijau.
- [ ] **Step 4:** Commit `chore: final wiring, 404, build terverifikasi`.
- [ ] **Step 5:** Buka project di VS Code: `code C:\HTMLpedia`.

---

## Self-Review Notes

- Spec coverage: Splash ✓ (T9), Beranda ✓ (T9), Tag A–Z/search/filter ✓ (T10), Dasar-Dasar ✓ (T9), Kuis per-tag + 3 mode ✓ (T11), Sumber ✓ (T9), Tentang + kredit + Universitas BumiGora ✓ (T9), Ensiklopedia 100+ tag ✓ (T2–5), Demo hidup & playground ✓ (T8), progress localStorage ✓ (T6), animasi candy & Cubby ✓ (T1,T7,T9), responsif ✓ (T1,T9), VS Code dibuka ✓ (T12).
- Kuis CSS/JS konten penuh = bukan target rilis (sesuai spec); struktur & soal contoh ada di T11.
