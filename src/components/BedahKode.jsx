import React from "react";

// ===== Bedah Kode — mesin penjelas baris per baris =====
// Menghasilkan penjelasan untuk setiap baris kode contoh,
// memakai pengetahuan tag HTML, properti CSS, dan token JavaScript.

const HTML_TAG_EXPLAIN = {
  doctype: "Deklarasi DOCTYPE — memberi tahu browser bahwa dokumen ini HTML5 (mode standar, bukan mode kuno).",
  html: "Pembungkus seluruh halaman web — semua elemen lain berada di dalamnya.",
  head: "Kepala dokumen — berisi informasi tentang halaman (tidak tampil di layar).",
  body: "Badan dokumen — semua yang benar-benar tampil di layar browser.",
  title: "Judul halaman — teks yang muncul di tab browser & hasil pencarian Google.",
  meta: "Metadata — informasi tentang halaman (charset, viewport, deskripsi) dibaca browser & mesin pencari.",
  link: "Menghubungkan resource eksternal — biasanya untuk memuat file CSS atau favicon.",
  style: "Blok CSS internal — menulis gaya untuk halaman langsung di dalamnya.",
  script: "Blok JavaScript — menulis atau memuat kode yang membuat halaman hidup.",
  h1: "Heading level 1 — judul utama halaman. Gunakan HANYA SATU per halaman.",
  h2: "Heading level 2 — sub-judul di bawah h1, membagi halaman jadi bagian-bagian.",
  h3: "Heading level 3 — sub-judul di bawah h2, untuk detail per bagian.",
  p: "Paragraf — wadah teks biasa.",
  br: "Baris baru (line break) — paksa teks pindah baris di dalam paragraf.",
  hr: "Garis pemisah horizontal — menandai perpisahan tema.",
  a: "Hyperlink — tautan ke halaman lain/lokasi lain. Paling penting di seluruh web!",
  img: "Gambar — menampilkan gambar dari URL. Ingat: alt wajib untuk aksesibilitas.",
  figure: "Wadah gambar + caption — gambar yang bisa berdiri sendiri dari alur teks.",
  figcaption: "Keterangan/judul untuk gambar di dalam <figure>.",
  ul: "Daftar tak berurutan (bullet) — urutan tidak penting.",
  ol: "Daftar berurutan (bernomor) — urutan penting, misalnya resep/tutorial.",
  li: "Item daftar — satu item di dalam <ul> atau <ol>.",
  dl: "Daftar definisi — pasangan istilah dan penjelasannya (kamus/FAQ).",
  dt: "Istilah yang didefinisikan — diikuti oleh <dd> sebagai penjelasan.",
  dd: "Penjelasan untuk istilah <dt> sebelumnya.",
  table: "Tabel — menampilkan data dalam baris dan kolom.",
  thead: "Bagian kepala tabel — berisi baris judul kolom (<th>).",
  tbody: "Isi utama tabel — baris-baris data.",
  tfoot: "Bagian kaki tabel — baris rangkuman/total.",
  tr: "Baris tabel — satu baris berisi sel th/td.",
  th: "Sel judul tabel — tampil tebal. Pakai scope=\"col\" untuk aksesibilitas.",
  td: "Sel data tabel — isi biasa.",
  caption: "Judul/keterangan untuk tabel — dibaca screen reader lebih dulu.",
  form: "Formulir — tempat mengumpulkan input dari pengguna ke server.",
  input: "Kolom isian — teks, email, password, tanggal, checkbox, dan banyak lagi.",
  label: "Keterangan untuk input — klik label = klik input-nya.",
  button: "Tombol — klik untuk aksi (kirim form, dll.).",
  textarea: "Kolom teks multi-baris — untuk komentar/alamat/bio.",
  select: "Dropdown pilihan — pilih satu (atau beberapa) dari daftar.",
  option: "Satu opsi di dalam <select>.",
  div: "Wadah generik tanpa makna — dipakai untuk mengelompokkan saat tidak ada elemen semantic yang cocok.",
  span: "Rentang teks tanpa makna — untuk styling sebagian teks.",
  header: "Kepala halaman/bagian — berisi logo, judul, navigasi.",
  nav: "Navigasi — kumpulan link menjelajahi situs.",
  main: "Konten utama halaman — hanya boleh satu per halaman.",
  section: "Bagian bertema — satu kelompok konten dengan judul sendiri.",
  article: "Konten mandiri — bisa berdiri sendiri (artikel blog, produk).",
  aside: "Konten samping — tidak inti tapi relevan (sidebar, iklan).",
  footer: "Kaki halaman — berisi info kontak/hak cipta/navigasi bawah.",
  strong: "Menekankan PENTINGNYA teks — dibaca tegas oleh screen reader.",
  em: "Menekankan teks — dibaca dengan intonasi khusus oleh screen reader.",
  code: "Menandai kode program — tampil monospace.",
  pre: "Teks pra-format — spasi dan enter kamu tampil apa adanya.",
  blockquote: "Kutipan panjang dari sumber lain.",
  summary: "Judul yang bisa diklik untuk buka/tutup <details>.",
  details: "Konten yang bisa dilipat — buka/tutup tanpa JavaScript!",
  dialog: "Kotak dialog/modal — tampil di atas segalanya.",
  video: "Pemutar video di dalam halaman.",
  audio: "Pemutar audio di dalam halaman.",
  canvas: "Kanvas piksel — gambar yang digambar & dianimasikan dengan JavaScript.",
  svg: "Grafik vektor — logo/ikon/ilustrasi yang tidak pecah bila diperbesar.",
  iframe: "Halaman lain di dalam halamanmu — misalnya peta/embed YouTube.",
  time: "Waktu/tanggal — dalam format yang bisa dibaca mesin.",
  mark: "Menyorot teks seperti stabilo.",
  small: "Teks kecil — untuk catatan kaki/hak cipta.",
  hr: "Garis pemisah.",
};

const CSS_PROP_EXPLAIN = {
  color: "Mengatur warna teks.",
  background: "Shorthand warna/gambar/gradasi latar belakang.",
  "background-color": "Warna latar belakang elemen.",
  "background-image": "Gambar/gradasi sebagai latar belakang.",
  margin: "Jarak di LUAR elemen — memisahkannya dari tetangganya.",
  padding: "Jarak di DALAM elemen — antara konten dan tepinya.",
  border: "Garis tepi elemen (tebal, gaya, warna).",
  "border-radius": "Lengkung sudut elemen — 50% = lingkaran sempurna.",
  width: "Lebar elemen.",
  height: "Tinggi elemen.",
  "max-width": "Lebar maksimal — elemen tidak akan lebih lebar dari ini.",
  "box-sizing": "Cara menghitung width: border-box termasuk padding & border.",
  display: "Jenis tampilan elemen (block, inline, flex, grid, none).",
  "grid-template-columns": "Definisi kolom-kolom grid (misal repeat(3, 1fr) = 3 kolom sama lebar).",
  gap: "Jarak antar item (flex/grid).",
  "flex-direction": "Arah susunan item flex (row/column).",
  "justify-content": "Perataan mendatar item flex.",
  "align-items": "Perataan vertikal item flex.",
  position: "Cara posisi elemen (static/relative/absolute/fixed/sticky).",
  top: "Jarak dari tepi atas (berfungsi saat position != static).",
  left: "Jarak dari tepi kiri.",
  right: "Jarak dari tepi kanan.",
  bottom: "Jarak dari tepi bawah.",
  "z-index": "Urutan tumpukan — angka lebih besar tampil di atas.",
  "font-family": "Jenis huruf yang dipakai.",
  "font-size": "Ukuran huruf.",
  "font-weight": "Ketebalan huruf (bold/normal).",
  "line-height": "Tinggi baris teks — jarak antar baris.",
  "text-align": "Perataan teks (left/center/right/justify).",
  "letter-spacing": "Jarak antar huruf.",
  transform: "Transformasi (rotate, scale, translate) — memutar/memperbesar/memindah elemen.",
  transition: "Animasi perubahan properti — tampil mulus saat berubah.",
  "list-style": "Gaya marker daftar (none menghilangkan bullet).",
  overflow: "Perilaku saat konten meluap (hidden/auto/scroll).",
  opacity: "Transparansi (0 = tak terlihat, 1 = penuh).",
  cursor: "Bentuk kursor saat di atas elemen.",
  "box-shadow": "Bayangan elemen.",
  "outline": "Garis di luar border — sering untuk fokus aksesibilitas.",
  content: "Isi yang ditambahkan lewat pseudo-element (::before/::after).",
  "aspect-ratio": "Perbandingan lebar:tinggi elemen.",
  "object-fit": "Cara gambar mengisi kotaknya (cover/contain).",
};

function explainHtmlLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return null;
  if (/^<!--/.test(trimmed)) return "Komentar — catatan untuk programmer, tidak tampil di browser.";
  if (/^<!DOCTYPE/i.test(trimmed)) return HTML_TAG_EXPLAIN.doctype;
  if (/^<\/?html/i.test(trimmed)) return HTML_TAG_EXPLAIN.html;
  if (/^<body/i.test(trimmed)) return HTML_TAG_EXPLAIN.body;
  const tagMatch = trimmed.match(/^<\/?([a-zA-Z][\w-]*)/);
  if (tagMatch) {
    const tag = tagMatch[1].toLowerCase();
    if (HTML_TAG_EXPLAIN[tag]) return HTML_TAG_EXPLAIN[tag];
    return `Elemen <${tag}>.`;
  }
  if (/<[a-zA-Z]/.test(trimmed)) {
    const tags = [...trimmed.matchAll(/<\/?([a-zA-Z][\w-]*)/g)].map((m) => m[1].toLowerCase());
    const unique = [...new Set(tags)].slice(0, 3);
    const parts = unique.map((t) => (HTML_TAG_EXPLAIN[t] ? `<${t}> — ${HTML_TAG_EXPLAIN[t]}` : `<${t}>`));
    return parts.join(" ");
  }
  return "Konten teks yang tampil di halaman.";
}

function explainCssLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return null;
  if (/^\/\*/.test(trimmed)) return "Komentar CSS — catatan, bukan bagian dari gaya.";
  if (/^@media/.test(trimmed)) return "Media query — gaya yang hanya berlaku saat layar memenuhi kondisi tertentu (misal lebar minimal).";
  if (/^[^\{@]+\{[^}]*$/.test(trimmed) && trimmed.endsWith("{")) return `Selektor "${trimmed.slice(0, -1).trim()}" — memilih elemen yang akan diberi gaya.`;
  const propMatch = trimmed.match(/^([a-zA-Z-]+)\s*:/);
  if (propMatch) {
    const prop = propMatch[1];
    return CSS_PROP_EXPLAIN[prop] ? `${prop} — ${CSS_PROP_EXPLAIN[prop]}` : `Properti ${prop}.`;
  }
  if (trimmed === "}" || trimmed === "};") return "Tutup blok gaya.";
  return null;
}

function explainJsLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return null;
  if (/^\/\//.test(trimmed)) return "Komentar — tidak dijalankan oleh JavaScript.";
  if (/^\/\*/.test(trimmed)) return "Komentar multi-baris — tidak dijalankan.";
  if (/\bconst\b/.test(trimmed)) return "const — membuat variabel yang nilainya tidak bisa di-reassign.";
  if (/\blet\b/.test(trimmed)) return "let — membuat variabel yang boleh di-reassign.";
  if (/document\.getElementById/.test(trimmed)) return "document.getElementById — mengambil elemen HTML berdasarkan id-nya.";
  if (/querySelector/.test(trimmed)) return "querySelector — mengambil elemen HTML dengan selector CSS (class/id/tag).";
  if (/addEventListener/.test(trimmed)) return "addEventListener — menjalankan fungsi saat event terjadi (misal klik).";
  if (/\.textContent\s*=/.test(trimmed)) return "textContent — menulis teks ke dalam elemen halaman.";
  if (/\.innerHTML\s*=/.test(trimmed)) return "innerHTML — menulis HTML ke dalam elemen halaman.";
  if (/\bif\s*\(/.test(trimmed)) return "if — percabangan: jalankan kode hanya bila kondisi benar.";
  if (/\belse if\b/.test(trimmed)) return "else if — cabang kedua bila kondisi pertama salah.";
  if (/\belse\b/.test(trimmed)) return "else — jalankan bila semua kondisi sebelumnya salah.";
  if (/\bfor\s*\(/.test(trimmed)) return "for — perulangan: jalankan kode berulang kali.";
  if (/\.map\(/.test(trimmed)) return ".map() — membuat array baru dengan mengubah setiap item.";
  if (/\.filter\(/.test(trimmed)) return ".filter() — mengambil hanya item yang lolos kondisi.";
  if (/\.then\(/.test(trimmed)) return ".then() — jalankan fungsi setelah Promise selesai.";
  if (/\bPromise\b/.test(trimmed)) return "Promise — operasi asinkron yang hasilnya nanti.";
  if (/\basync\b/.test(trimmed)) return "async — fungsi asinkron, boleh berisi await.";
  if (/\bawait\b/.test(trimmed)) return "await — menunggu Promise selesai sebelum lanjut.";
  if (/localStorage/.test(trimmed)) return "localStorage — tempat menyimpan data di browser (tetap ada walau ditutup).";
  if (/console\.log/.test(trimmed)) return "console.log — mencetak nilai ke DevTools Console.";
  if (/function\s+\w+/.test(trimmed)) return "Deklarasi fungsi — kode yang bisa dipanggil berkali-kali.";
  if (/=>/.test(trimmed)) return "Arrow function — cara ringkas menulis fungsi (param) => ...";
  if (/\breturn\b/.test(trimmed)) return "return — mengembalikan nilai dari fungsi.";
  if (/\{\s*\}?\s*$/.test(trimmed)) return "Kurung kurawal — batas blok kode.";
  if (/\)\s*;?\s*$/.test(trimmed)) return "Tutup pernyataan.";
  return null;
}

export function bedahForLine(line, lang) {
  if (lang === "css") return explainCssLine(line);
  if (lang === "js") return explainJsLine(line);
  return explainHtmlLine(line);
}

// ===== Komponen Bedah Kode =====
export default function BedahKode({ code, lang }) {
  const lines = code.split("\n");
  const rows = lines.map((line, i) => ({ line, i, explanation: line.trim() ? bedahForLine(line, lang) : null }));

  return (
    <div className="info" style={{ background: "#fff" }}>
      <b style={{ color: "#0e7490" }}>🔬 Bedah Kode — baris per baris</b>
      <div style={{ marginTop: ".4rem" }}>
        {rows.map((r) => (
          <div key={r.i} style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: ".5rem", padding: ".28rem .3rem", borderBottom: "1px dashed #e2e8f0", animation: "popIn .3s ease both", animationDelay: `${r.i * 60}ms` }}>
            <div style={{ fontSize: ".65rem", color: "#94a3b8", fontFamily: "Consolas, monospace", textAlign: "right", paddingTop: ".15rem" }}>{r.i + 1}</div>
            <div>
              <code style={{ fontSize: ".72rem", whiteSpace: "pre-wrap", display: "block" }}>{r.line || " "}</code>
              {r.explanation && <div style={{ fontSize: ".7rem", color: "#0f766e", marginTop: ".1rem" }}>↳ {r.explanation}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
