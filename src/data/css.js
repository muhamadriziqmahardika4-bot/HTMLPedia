// Materi CSS — skema sama dengan tag HTML: slug, tag, name, category ('css'), level,
// summary, atribut, contohKode, related, demo, analogi.
export const CSS_TAGS = [
  {
    slug: "css-display-flex",
    tag: "display: flex",
    name: "Flexbox Layout",
    category: "css",
    level: "Pemula",
    analogi: "Flexbox itu rak piring yang bisa kamu atur jaraknya — taruh, rapikan, dan bagi ruang dengan mudah.",
    summary: "Flexbox membuat elemen-elemen di dalamnya tersusun dalam satu baris/kolom secara otomatis, dan bisa kamu atur perataan, jarak, dan urutannya dengan properti yang simpel.",
    atribut: [
      { name: "justify-content", desc: "Perataan mendatar (flex-start, center, space-between, space-evenly)" },
      { name: "align-items", desc: "Perataan vertikal (stretch, center, flex-start, flex-end)" },
      { name: "gap", desc: "Jarak antar item flex" },
      { name: "flex-wrap", desc: "wrap = pindah baris kalau penuh" },
    ],
    contohKode: `ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
}
ul li {
  background: #e0f2fe;
  padding: .5rem 1rem;
  border-radius: 10px;
  border: 2px solid #7dd3fc;
}`,
    related: ["css-display-grid", "css-position", "css-gap"],
    demo: "generic",
  },
  {
    slug: "css-display-grid",
    tag: "display: grid",
    name: "CSS Grid Layout",
    category: "css",
    level: "Pemula",
    analogi: "Grid itu papan catur — kamu tentukan berapa kolom dan baris, lalu taruh elemen di petak-petaknya.",
    summary: "CSS Grid membuat layout dua dimensi (baris & kolom sekaligus) dengan baris/kolom yang kamu tentukan — sangat cocok untuk dashboard, galeri, dan halaman utama.",
    atribut: [
      { name: "grid-template-columns", desc: "Definisi kolom, misal repeat(3, 1fr)" },
      { name: "grid-template-rows", desc: "Definisi baris" },
      { name: "gap", desc: "Jarak antar sel grid" },
      { name: "grid-area", desc: "Nama area untuk penempatan eksplisit" },
    ],
    contohKode: `ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: .6rem;
  list-style: none;
  padding: 0;
}
ul li {
  background: #ede9fe;
  padding: .7rem;
  text-align: center;
  border-radius: 10px;
  border: 2px solid #c4b5fd;
}`,
    related: ["css-display-flex", "css-gap"],
    demo: "generic",
  },
  {
    slug: "css-gap",
    tag: "gap",
    name: "Jarak antar item",
    category: "css",
    level: "Pemula",
    analogi: "Gap itu jarak antar kursi di bioskop — rapi tanpa perlu margin manual satu-satu.",
    summary: "gap mengatur jarak antar item di flex dan grid — lebih rapi daripada memberi margin ke tiap anak, dan tidak menimbulkan masalah margin ganda di tepi.",
    atribut: [
      { name: "row-gap", desc: "Jarak vertikal antar item" },
      { name: "column-gap", desc: "Jarak horizontal antar item" },
    ],
    contohKode: `ul {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  padding: 0;
}
ul li {
  background: #fef9c3;
  padding: .6rem 1.2rem;
  border-radius: 8px;
  border: 2px solid #fde047;
}`,
    related: ["css-display-flex", "css-display-grid"],
    demo: "generic",
  },
  {
    slug: "css-position",
    tag: "position",
    name: "Positioning",
    category: "css",
    level: "Pemula",
    analogi: "Position itu cara kamu menaruh stiker di halaman — nempel biasa, nempel relatif, nempel di jendela, atau dilepas melayang.",
    summary: "position menentukan cara elemen diposisikan: static (normal), relative (digeser dari posisinya), absolute (menempel ke induk yang positioned), fixed (menempel di layar), sticky (menempel saat discroll).",
    atribut: [
      { name: "relative", desc: "Digeser dari posisi normalnya" },
      { name: "absolute", desc: "Menempel ke ancestor positioned terdekat" },
      { name: "fixed", desc: "Menempel di viewport, tidak ikut scroll" },
      { name: "sticky", desc: "Ikut scroll sampai batas tertentu, lalu menempel" },
    ],
    contohKode: `.kartu { position: relative; padding-top: 1.4rem; }
.kartu h2 {
  position: absolute;
  top: -12px;
  left: 12px;
  background: #38bdf8;
  color: #fff;
  padding: .1rem .7rem;
  border-radius: 8px;
  margin: 0;
}`,
    related: ["css-z-index", "css-display-flex"],
    demo: "generic",
  },
  {
    slug: "css-z-index",
    tag: "z-index",
    name: "Urutan tumpukan",
    category: "css",
    level: "Menengah",
    analogi: "Z-index itu nomor halaman buku yang menumpuk — yang angkanya lebih besar tampil di atas.",
    summary: "z-index menentukan urutan elemen bertumpuk. Hanya bekerja pada elemen yang positioned (bukan static). Bikin stacking context baru dengan transform/opacity/dll.",
    atribut: [
      { name: "auto", desc: "Tidak membuat stacking context baru" },
      { name: "angka", desc: "Semakin besar, semakin di depan" },
    ],
    contohKode: `.kartu { position: relative; z-index: 1; background: #f0f9ff; }
.kartu h2 {
  position: absolute;
  top: -12px;
  right: -12px;
  z-index: 5;
  background: #f472b6;
  color: #fff;
  padding: .15rem .7rem;
  border-radius: 99px;
  margin: 0;
}`,
    related: ["css-position"],
    demo: "generic",
  },
  {
    slug: "css-box-sizing",
    tag: "box-sizing",
    name: "Ukuran kotak",
    category: "css",
    level: "Pemula",
    analogi: "Box-sizing itu apakah kotak kardus diukur dari luar atau dari dalam.",
    summary: "box-sizing: border-box membuat width/height termasuk padding dan border — jauh lebih mudah diprediksi daripada content-box bawaan.",
    atribut: [
      { name: "content-box", desc: "width/height hanya isi (bawaan)" },
      { name: "border-box", desc: "width/height termasuk padding & border" },
    ],
    contohKode: `.kartu {
  width: 180px;
  padding: 20px;
  border: 6px solid #38bdf8;
  box-sizing: border-box;   /* lebar tetap 180px */
  background: #f0f9ff;
}`,
    related: ["css-padding", "css-margin"],
    demo: "generic",
  },
  {
    slug: "css-margin",
    tag: "margin",
    name: "Jarak luar",
    category: "css",
    level: "Pemula",
    analogi: "Margin itu ruang kosong di sekeliling rumah — tetangganya tidak boleh nempel.",
    summary: "margin memberi jarak di luar elemen — memisahkan elemen dari tetangganya. Shorthand: 1-4 nilai (atas kanan bawah kiri / vertikal horizontal).",
    atribut: [
      { name: "margin: auto", desc: "Memusatkan elemen block secara horizontal" },
      { name: "margin-top / right / bottom / left", desc: "Jarak per sisi" },
      { name: "margin: 0 auto", desc: "Hilangkan margin vertikal, tengah horizontal" },
    ],
    contohKode: `.judul { margin-bottom: 2rem; color: #7c3aed; }
.kartu { margin: 2rem auto; max-width: 280px; text-align: center; }`,
    related: ["css-padding", "css-gap"],
    demo: "generic",
  },
  {
    slug: "css-padding",
    tag: "padding",
    name: "Jarak dalam",
    category: "css",
    level: "Pemula",
    analogi: "Padding itu jarak antara isi tas dengan dinding tasnya — biar isi tidak mentok.",
    summary: "padding memberi jarak di dalam elemen — antara konten dan tepi elemen. Membuat tombol dan kartu terasa lega.",
    atribut: [
      { name: "padding", desc: "Shorthand 1-4 nilai" },
      { name: "padding-top / right / bottom / left", desc: "Per sisi" },
    ],
    contohKode: `.kartu { padding: 2rem; }
.tombol { padding: .9rem 2rem; font-size: 1rem; }`,
    related: ["css-margin", "css-box-sizing"],
    demo: "generic",
  },
  {
    slug: "css-color",
    tag: "color",
    name: "Warna teks",
    category: "css",
    level: "Pemula",
    analogi: "Color itu warna tinta yang kamu pakai menulis — hitam, merah, biru, sesuai selera.",
    summary: "color mengatur warna teks. Bisa pakai nama (red), hex (#38bdf8), rgb(…) / rgba(…), hsl(…), atau CSS variables var(--biru).",
    atribut: [
      { name: "hex", desc: "#rrggbb, misal #38bdf8" },
      { name: "rgb / rgba", desc: "rgb(56, 189, 248) dengan alpha (transparansi)" },
      { name: "hsl", desc: "hsl(199, 93%, 60%) — mudah diputar hue-nya" },
      { name: "currentColor", desc: "Mengikuti warna teks induk" },
    ],
    contohKode: `.judul { color: #e11d48; }
.contoh { color: #0ea5e9; }`,
    related: ["css-background", "css-border"],
    demo: "generic",
  },
  {
    slug: "css-background",
    tag: "background",
    name: "Latar belakang",
    category: "css",
    level: "Pemula",
    analogi: "Background itu cat dinding rumah — warna, gambar, bahkan gradasi, semua boleh.",
    summary: "background adalah shorthand untuk warna latar, gambar, posisi, ukuran, dan perulangan. Bisa juga pakai linear-gradient untuk gradasi.",
    atribut: [
      { name: "background-color", desc: "Warna latar" },
      { name: "background-image", desc: "url(…) atau linear-gradient(…)" },
      { name: "background-size", desc: "cover / contain / auto" },
      { name: "background-repeat", desc: "no-repeat untuk gambar latar" },
    ],
    contohKode: `body { background: linear-gradient(160deg, #fff7ed 0%, #fdf4ff 55%, #eff6ff 100%); }
.kartu { background: linear-gradient(135deg, #fda4af, #f472b6); color: #fff; padding: 1rem; border: none; }`,
    related: ["css-color", "css-border"],
    demo: "generic",
  },
  {
    slug: "css-border",
    tag: "border",
    name: "Garis tepi",
    category: "css",
    level: "Pemula",
    analogi: "Border itu bingkai foto — membungkus dan mempertegas batas halaman.",
    summary: "border adalah shorthand dari border-width, border-style (solid/dashed/dotted), dan border-color. border-radius membuat sudut membulat atau lingkaran.",
    atribut: [
      { name: "border", desc: "width style color, misal 2px solid #bae6fd" },
      { name: "border-radius", desc: "radius sudut; 50% = lingkaran" },
      { name: "border-style", desc: "solid, dashed, dotted, double, none" },
    ],
    contohKode: `.kartu { border: 4px solid #f472b6; border-radius: 20px; background: #fdf2f8; }
.tombol { border: 3px solid #0ea5e9; border-radius: 999px; background: #fff; color: #0ea5e9; }`,
    related: ["css-box-sizing", "css-background"],
    demo: "generic",
  },
  {
    slug: "css-font-family",
    tag: "font-family",
    name: "Jenis huruf",
    category: "css",
    level: "Pemula",
    analogi: "Font-family itu memilih jenis tulisan tangan — gaya berbeda, pesan terasa berbeda.",
    summary: "font-family menentukan jenis huruf. Selalu sediakan fallback: nama font utama, lalu font umum (sans-serif / serif / monospace).",
    atribut: [
      { name: "generic family", desc: "sans-serif, serif, monospace" },
      { name: "web font", desc: "Google Fonts lewat <link> atau @import" },
      { name: "system font stack", desc: "\"Segoe UI\", system-ui, sans-serif" },
    ],
    contohKode: `body { font-family: Georgia, serif; }
.judul { font-family: 'Courier New', monospace; letter-spacing: 2px; }`,
    related: ["css-font-size", "css-color"],
    demo: "generic",
  },
  {
    slug: "css-font-size",
    tag: "font-size",
    name: "Ukuran huruf",
    category: "css",
    level: "Pemula",
    analogi: "Font-size itu ukuran huruf di buku — judul besar, isi sedang, catatan kecil.",
    summary: "font-size menentukan besar huruf. Pakai rem untuk ukuran yang ikut skala, em untuk relatif terhadap induk, px untuk tetap, dan clamp() untuk responsif.",
    atribut: [
      { name: "rem", desc: "Relatif terhadap root (html) — paling direkomendasikan" },
      { name: "em", desc: "Relatif terhadap induk" },
      { name: "px", desc: "Ukuran tetap" },
      { name: "clamp(min, fluid, max)", desc: "Responsif: clamp(1rem, 5vw, 2rem)" },
    ],
    contohKode: `.judul { font-size: 2rem; }
.contoh { font-size: .75rem; color: #64748b; }`,
    related: ["css-font-family"],
    demo: "generic",
  },
  {
    slug: "css-hover",
    tag: ":hover",
    name: "Pseudo-class hover",
    category: "css",
    level: "Pemula",
    analogi: "Hover itu tombol yang 'terbangun' saat jari/mouse melayang di atasnya.",
    summary: ":hover menerapkan gaya saat kursor berada di atas elemen — membuat tombol dan kartu terasa hidup. Kombinasikan dengan transition supaya halus.",
    atribut: [
      { name: ":hover", desc: "Saat disorot mouse" },
      { name: ":focus", desc: "Saat elemen fokus (keyboard)" },
      { name: ":active", desc: "Saat ditekan/diklik" },
      { name: "transition", desc: "animasi perubahan yang halus" },
    ],
    contohKode: `button.tombol:hover { background: #0ea5e9; color: #fff; transform: scale(1.08); }
.kartu:hover { background: #fef3c7; border-color: #f59e0b; }
table tr:hover { background: #e0f2fe; }
.judul { transition: color .3s; }
.judul:hover { color: #f472b6; }`,
    related: ["css-position", "css-border"],
    demo: "generic",
  },
  {
    slug: "css-media-queries",
    tag: "@media",
    name: "Media Queries",
    category: "css",
    level: "Menengah",
    analogi: "Media query itu outfit berbeda untuk cuaca berbeda — tampilan HP beda dengan laptop.",
    summary: "@media menerapkan CSS berdasarkan kondisi seperti lebar layar, orientasi, atau preferensi tema (dark mode) — kunci dari desain responsif.",
    atribut: [
      { name: "min-width / max-width", desc: "Berdasarkan lebar layar" },
      { name: "prefers-color-scheme", desc: "dark / light sesuai sistem" },
      { name: "prefers-reduced-motion", desc: "Hormati pengguna yang tidak suka animasi" },
    ],
    contohKode: `@media (min-width: 250px) {
  h1.judul { color: #16a34a; }
  .kartu { background: #dcfce7; border-color: #4ade80; }
}
@media (min-width: 600px) {
  .judul { letter-spacing: 3px; }
}`,
    related: ["css-display-grid", "css-font-size"],
    demo: "generic",
  },
];
