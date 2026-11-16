// Bank soal kuis HTMLpedia — diperbanyak untuk mode endless (Panggung/Stage tanpa batas).
// Struktur: QUIZZES[topik][mode] = array soal { q, options, answer }
// TAG_QUIZZES: soal singkat per tag (kuis mini di halaman detail tag).
// pickStageQuestions: pilih soal untuk sebuah tahap secara deterministik (seeded shuffle).

export const MODES = [
  { id: "latihan", emoji: "🌱", name: "Latihan", desc: "3 soal per stage, santai, cocok untuk pemula", cls: "mode-latihan", count: 3 },
  { id: "greget", emoji: "🔥", name: "Greget", desc: "5 soal per stage, menantang", cls: "mode-greget", count: 5 },
  { id: "gacor", emoji: "💀", name: "Gacor", desc: "6 soal per stage, ekstrem", cls: "mode-gacor", count: 6 },
];

export const QUIZZES = {
  HTML: {
    latihan: [
      { q: "Tag apa yang dipakai membuat tabel?", options: ["<list>", "<table>", "<grid>"], answer: 1 },
      { q: "Untuk teks paling besar dipakai…", options: ["<p>", "<h1>", "<small>"], answer: 1 },
      { q: "Atribut gambar adalah…", options: ["href", "alt", "src"], answer: 2 },
      { q: "Tag paragraf adalah…", options: ["<para>", "<p>", "<text>"], answer: 1 },
      { q: "Tag untuk membuat link adalah…", options: ["<link>", "<a>", "<href>"], answer: 1 },
      { q: "Untuk membuat daftar bernomor dipakai…", options: ["<ul>", "<dl>", "<ol>"], answer: 2 },
      { q: "Tag gambar tanpa penutup adalah…", options: ["<img>", "<image>", "<pic>"], answer: 0 },
      { q: "Judul halaman yang muncul di tab adalah…", options: ["<head>", "<title>", "<meta>"], answer: 1 },
      { q: "Untuk teks tebal sederhana dipakai…", options: ["<b>", "<strong>", "keduanya benar"], answer: 2 },
    ],
    greget: [
      { q: "Elemen untuk sel judul kolom adalah…", options: ["<td>", "<th>", "<thead>", "<caption>"], answer: 1 },
      { q: "colspan=\"2\" artinya…", options: ["gabung 2 baris", "gabung 2 kolom", "2 tabel", "lebar 2px"], answer: 1 },
      { q: "Tag untuk daftar bernomor adalah…", options: ["<ul>", "<li>", "<ol>", "<dl>"], answer: 2 },
      { q: "Input yang wajib diisi memakai atribut…", options: ["required", "placeholder", "value", "name"], answer: 0 },
      { q: "Elemen semantic untuk navigasi adalah…", options: ["<div>", "<nav>", "<aside>", "<section>"], answer: 1 },
      { q: "Atribut alt pada <img> dipakai untuk…", options: ["judul gambar", "teks alternatif untuk aksesibilitas", "link gambar", "ukuran gambar"], answer: 1 },
      { q: "rowspan=\"3\" artinya…", options: ["gabung 3 kolom", "gabung 3 baris", "3 baris baru", "tinggi 3px"], answer: 1 },
      { q: "<br> berfungsi untuk…", options: ["garis horizontal", "pindah baris", "bold teks", "spasi antar kata"], answer: 1 },
      { q: "Tag untuk kutipan panjang adalah…", options: ["<q>", "<blockquote>", "<cite>", "<quote>"], answer: 1 },
      { q: "<meta charset=\"UTF-8\"> sebaiknya diletakkan di…", options: ["body", "head", "footer", "mana saja"], answer: 1 },
      { q: "Atribut href pada <a> berisi…", options: ["teks link", "URL tujuan", "judul link", "target"], answer: 1 },
      { q: "Elemen untuk mengelompokkan isi artikel adalah…", options: ["<div>", "<article>", "<p>", "<section>"], answer: 1 },
    ],
    gacor: [
      { q: "Bedanya <section> dan <div> adalah…", options: ["tidak ada beda", "section punya makna semantic", "div lebih cepat", "section hanya untuk form"], answer: 1 },
      { q: "Atribut sandbox pada <iframe> berguna untuk…", options: ["membatasi kemampuan konten di dalamnya", "memperbesar iframe", "memuat iframe lebih cepat", "menghapus border iframe"], answer: 0 },
      { q: "<meta charset=\"UTF-8\"> berfungsi untuk…", options: ["enkripsi halaman", "menentukan encoding karakter", "memuat font", "kompresi halaman"], answer: 1 },
      { q: "Elemen yang TIDAK boleh di dalam <p> adalah…", options: ["<strong>", "<em>", "<div>", "<a>"], answer: 2 },
      { q: "loading=\"lazy\" pada <img> artinya…", options: ["gambar dimuat saat dibutuhkan", "gambar gagal dimuat", "gambar di-cache", "gambar dikompresi"], answer: 0 },
      { q: "Untuk aksesibilitas, <img> sebaiknya selalu punya…", options: ["title", "alt", "longdesc", "role"], answer: 1 },
      { q: "<template> berfungsi untuk…", options: ["menampilkan konten langsung", "cetakan konten yang tidak tampil sampai di-clone JS", "membuat tabel", "styling komponen"], answer: 1 },
      { q: "col elemen di dalam <colgroup> hanya bisa diberi…", options: ["semua CSS", "style, width, visibility", "class saja", "warna teks"], answer: 1 },
      { q: "<dialog> ditutup dengan menekan…", options: ["Enter", "Escape", "Tab", "Spasi"], answer: 1 },
      { q: "Elemen kosong (void) TIDAK punya…", options: ["atribut", "tag penutup", "id", "class"], answer: 1 },
      { q: "srcset pada <img> dipakai untuk…", options: ["lazy loading", "gambar responsif berbagai ukuran", "gambar dari URL eksternal", "kompresi gambar"], answer: 1 },
      { q: "<datalist> berbeda dengan <select> karena…", options: ["datalist hanya untuk angka", "datalist menyarankan tapi boleh mengetik nilai lain", "datalist wajib dipilih", "datalist tidak butuh option"], answer: 1 },
      { q: "Atribut rel=\"noopener\" pada <a> berguna untuk…", options: ["mempercepat link", "keamanan: halaman baru tidak bisa mengakses window.opener", "membuka di tab sama", "mengunduh file"], answer: 1 },
      { q: "Perbedaan <b> dan <strong>…", options: ["tidak ada", "strong = penting secara makna, b = hanya tebal visual", "b = penting, strong = visual", "strong untuk heading saja"], answer: 1 },
      { q: "<figure> biasanya dipasangkan dengan…", options: ["<picture>", "<figcaption>", "<aside>", "<caption>"], answer: 1 },
    ],
  },
  CSS: {
    latihan: [
      { q: "Properti untuk warna teks adalah…", options: ["background", "color", "font"], answer: 1 },
      { q: "display: flex dipakai untuk…", options: ["layout", "warna", "animasi"], answer: 0 },
      { q: "Satuan relatif terhadap font adalah…", options: ["px", "cm", "em"], answer: 2 },
      { q: "Selector untuk class adalah…", options: ["#card", ".card", "card"], answer: 1 },
      { q: "Selector untuk id adalah…", options: [".hero", "#hero", "hero"], answer: 1 },
      { q: "Properti untuk membuat teks rata tengah…", options: ["text-align: center", "align: middle", "center: true"], answer: 0 },
      { q: "Warna latar diatur dengan…", options: ["color", "background-color", "background: teks"], answer: 1 },
      { q: "margin: 0 auto pada elemen block berfungsi untuk…", options: ["membuat rata kanan", "memusatkan horizontal", "menghilangkan padding"], answer: 1 },
      { q: "Satuan relatif terhadap lebar viewport…", options: ["vh", "vw", "rem"], answer: 1 },
    ],
    greget: [
      { q: "justify-content: center memusatkan item secara…", options: ["vertikal", "horizontal", "diagonal", "acak"], answer: 1 },
      { q: "z-index hanya bekerja pada elemen…", options: ["semua elemen", "positioned (bukan static)", "display: block", "inline"], answer: 1 },
      { q: "box-sizing: border-box membuat…", options: ["border masuk dalam hitungan width", "border hilang", "margin hilang", "padding hilang"], answer: 0 },
      { q: "Selector .card memilih…", options: ["id card", "elemen <card>", "class card", "semua div"], answer: 2 },
      { q: "position: sticky adalah gabungan…", options: ["fixed + absolute", "relative + fixed", "static + relative", "absolute + fixed"], answer: 1 },
      { q: "gap pada flexbox mengatur…", options: ["jarak antar item", "jarak tepi container", "ukuran item", "urutan item"], answer: 0 },
      { q: "flex-wrap: wrap membuat item flex…", options: ["tidak bisa dibungkus", "pindah baris saat penuh", "mengecil otomatis", "menghilang"], answer: 1 },
      { q: "align-items: center pada flexbox memusatkan…", options: ["horizontal", "vertikal", "keduanya", "diagonal"], answer: 1 },
      { q: "Pseudo-class :hover aktif saat…", options: ["elemen diklik", "elemen disorot mouse", "elemen difokus", "elemen disabled"], answer: 1 },
      { q: "border-radius: 50% membuat…", options: ["kotak rounded", "lingkaran sempurna", "segitiga", "elips"], answer: 1 },
      { q: "display: none berbeda dengan visibility: hidden karena…", options: ["keduanya sama", "display:none menghilangkan dari layout", "visibility menghilangkan dari layout", "display:none transparan saja"], answer: 1 },
      { q: "Satuan rem relatif terhadap…", options: ["elemen induk", "font-size root (html)", "viewport", "parent div"], answer: 1 },
    ],
    gacor: [
      { q: "Specificity tertinggi dimiliki oleh…", options: [".kelas", "#id", "elemen", "*"], answer: 1 },
      { q: "grid-template-columns: repeat(3, 1fr) membuat…", options: ["3 baris sama tinggi", "3 kolom sama lebar", "3 kolom otomatis", "grid 3px"], answer: 1 },
      { q: "Pseudo-class :nth-child(2n) memilih…", options: ["anak genap", "anak ganjil", "anak ke-2 saja", "2 anak pertama"], answer: 0 },
      { q: "@media (min-width: 768px) berarti…", options: ["gaya berlaku di layar ≥768px", "hanya di HP", "gaya berlaku di semua layar", "sama dengan max-width"], answer: 0 },
      { q: "Properti yang TIDAK diwariskan (inherited) adalah…", options: ["color", "font-family", "margin", "line-height"], answer: 2 },
      { q: "gap pada flexbox berfungsi untuk…", options: ["jarak antar item", "jarak ke tepi container", "lebar item", "tinggi item"], answer: 0 },
      { q: "clamp(1rem, 5vw, 2rem) artinya…", options: ["selalu 5vw", "nilai fluid antara 1rem–2rem", "maks 1rem", "min 5vw"], answer: 1 },
      { q: "position: absolute diposisikan relatif ke…", options: ["viewport", "ancestor positioned terdekat", "body", "parent langsung selalu"], answer: 1 },
      { q: "Grid areas didefinisikan dengan…", options: ["grid-template-areas", "grid-areas", "grid-template-rows", "areas"], answer: 0 },
      { q: "object-fit: cover pada <img> membuat…", options: ["gambar di-stretch", "gambar memenuhi kotak tanpa distorsi (terpotong)", "gambar penuh dengan letterbox", "gambar hilang"], answer: 1 },
      { q: "prefers-color-scheme dipakai untuk…", options: ["memilih font otomatis", "dark mode sesuai preferensi sistem", "kompresi CSS", "caching media"], answer: 1 },
      { q: "Houdini / @supports menguji…", options: ["kecepatan render", "dukungan fitur CSS di browser", "ukuran file CSS", "validitas CSS"], answer: 1 },
      { q: "Selector .card > p memilih…", options: ["semua p di dalam .card, sedalam apa pun", "p anak langsung dari .card", "p pertama saja", "p berdampingan dengan .card"], answer: 1 },
      { q: "Custom property (--warna) didefinisikan di…", options: ["mana saja", ":root atau selektor, dipakai dengan var()", "@property saja", "head"], answer: 1 },
      { q: "z-index: auto vs 0 pada positioned element…", options: ["sama persis", "auto tidak membuat stacking context", "0 tidak membuat stacking context", "auto selalu di atas"], answer: 1 },
    ],
  },
  JavaScript: {
    latihan: [
      { q: "Cara menulis variabel di JS modern adalah…", options: ["var x = 1", "const x = 1", "let x == 1"], answer: 1 },
      { q: "console.log dipakai untuk…", options: ["mencetak ke console", "memberi warna teks", "membuat alert"], answer: 0 },
      { q: "Tanda === artinya…", options: ["sama nilai", "sama nilai & tipe", "assignment"], answer: 1 },
      { q: "Fungsi ditulis dengan kata kunci…", options: ["func", "function", "def"], answer: 1 },
      { q: "Array membuat daftar dengan…", options: ["{}", "()", "[]"], answer: 2 },
      { q: "document.getElementById mengambil elemen lewat…", options: ["class", "id", "tag"], answer: 1 },
      { q: "if (x > 5) dibaca…", options: ["jalankan jika x kurang dari 5", "jalankan jika x lebih besar dari 5", "jalankan selalu"], answer: 1 },
      { q: "addEventListener dipakai untuk…", options: ["memuat file", "mendengarkan event (klik, dll.)", "membuat elemen"], answer: 1 },
      { q: "typeof \"halo\" menghasilkan…", options: ["string", "text", "char"], answer: 0 },
    ],
    greget: [
      { q: "document.querySelector('.btn') memilih…", options: ["id btn", "semua .btn", ".btn pertama", "elemen btn"], answer: 2 },
      { q: "addEventListener('click', fn) artinya…", options: ["jalankan fn saat diklik", "hapus fn", "buat tombol", "disable klik"], answer: 0 },
      { q: "Array.push() berfungsi untuk…", options: ["menghapus item", "menambah item di akhir", "mengurutkan", "membalik array"], answer: 1 },
      { q: "JSON.parse() mengubah…", options: ["objek jadi teks", "teks jadi objek", "array jadi objek", "teks jadi array"], answer: 1 },
      { q: "=== null && === undefined bisa disingkat dengan…", options: ["??", "?.", "== null", "!"], answer: 2 },
      { q: "map() mengembalikan…", options: ["array baru hasil transformasi", "elemen pertama", "jumlah elemen", "boolean"], answer: 0 },
      { q: "filter() mengembalikan…", options: ["elemen pertama yang cocok", "array berisi elemen yang lolos uji", "indeks elemen", "boolean"], answer: 1 },
      { q: "const vs let: const…", options: ["tidak bisa di-reassign", "tidak bisa diubah isinya sama sekali", "hanya untuk angka", "sama dengan var"], answer: 0 },
      { q: "event.preventDefault() dipakai untuk…", options: ["menghentikan event bubbling", "mencegah aksi default (mis. reload form)", "menghapus event listener", "menyerupai stopPropagation"], answer: 1 },
      { q: "setTimeout(fn, 1000) menjalankan fn…", options: ["setiap 1 detik", "setelah 1 detik", "segera", "setiap klik"], answer: 1 },
      { q: "Arrow function (x) => x * 2…", options: ["sama dengan function deklarasi", "tidak punya this sendiri", "tidak bisa menerima parameter", "hanya untuk satu baris"], answer: 1 },
      { q: "Spread operator [...arr]…", options: ["menghapus isi array", "menyalin/menggabung array", "membalik array", "mengurutkan array"], answer: 1 },
    ],
    gacor: [
      { q: "Closure adalah…", options: ["fungsi yang mengakses scope luarnya", "fungsi tanpa nama", "metode menutup tab", "callback async"], answer: 0 },
      { q: "Event delegation memanfaatkan…", options: ["bubbling event", "capturing event", "stopPropagation", "preventDefault"], answer: 0 },
      { q: "async/await dipakai untuk…", options: ["menjalankan kode paralel", "menangani Promise dengan sintaks sinkron", "membuat thread baru", "delay setTimeout"], answer: 1 },
      { q: "this di dalam arrow function merujuk ke…", options: ["object pemanggilnya", "scope tempatnya ditulis", "window selalu", "undefined selalu"], answer: 1 },
      { q: "localStorage menyimpan data sebagai…", options: ["objek", "teks (string)", "JSON otomatis", "cookie"], answer: 1 },
      { q: "debounce berguna untuk…", options: ["membatasi frekuensi pemanggilan fungsi", "mempercepat fungsi", "menunda semua fungsi", "membatalkan request"], answer: 0 },
      { q: "Promise.all() gagal jika…", options: ["semua promise gagal", "satu promise saja gagal", "tidak ada yang gagal", "semua promise sukses"], answer: 1 },
      { q: "try/catch menangkap error dari…", options: ["kode sinkron di dalam try", "semua kode di halaman", "kode di luar try saja", "error CSS"], answer: 0 },
      { q: "queueMicrotask vs setTimeout(0)…", options: ["sama persis", "microtask jalan sebelum macrotask", "setTimeout(0) jalan lebih dulu", "keduanya paralel"], answer: 1 },
      { q: "MutationObserver mengamati…", options: ["perubahan atribut CSS", "perubahan DOM (node ditambah/dihapus)", "perubahan URL", "klik pengguna"], answer: 1 },
      { q: "structuredClone() untuk…", options: ["kloning dangkal", "deep copy object", "kloning DOM", "kloning function"], answer: 1 },
      { q: "weakMap berbeda dari Map karena…", options: ["lebih cepat selalu", "key bisa di-GC otomatis", "key harus string", "hanya untuk DOM"], answer: 1 },
      { q: "import dinamis import() mengembalikan…", options: ["module langsung", "Promise<module>", "callback", "undefined"], answer: 1 },
      { q: "AbortController dipakai untuk…", options: ["membatalkan fetch/request", "membatalkan setInterval saja", "membatalkan event listener", "memblokir CORS"], answer: 0 },
      { q: "Intl.NumberFormat('id-ID') menghasilkan…", options: ["teks tanggal Indonesia", "format angka khas Indonesia (titik ribuan)", "teks waktu", "sorting locale"], answer: 1 },
    ],
  },
};

// Soal kuis mini per tag (2-3 soal).
export const TAG_QUIZZES = {
  table: [
    { q: "colspan=\"2\" pada <td> artinya…", options: ["gabung 2 baris", "gabung 2 kolom", "2 tabel"], answer: 1 },
    { q: "Sel judul kolom sebaiknya memakai…", options: ["<td>", "<tr>", "<th>"], answer: 2 },
  ],
  a: [
    { q: "Atribut tujuan link adalah…", options: ["src", "href", "link"], answer: 1 },
    { q: "Supaya link terbuka di tab baru…", options: ["target=\"_blank\"", "tab=\"new\"", "open=\"tab\""], answer: 0 },
  ],
  img: [
    { q: "Atribut wajib untuk aksesibilitas gambar…", options: ["title", "alt", "longdesc"], answer: 1 },
    { q: "loading=\"lazy\" berarti…", options: ["gambar dimuat saat dibutuhkan", "gambar gagal dimuat", "gambar di-cache"], answer: 0 },
  ],
  form: [
    { q: "Data form dikirim ke…", options: ["method", "action", "name"], answer: 1 },
    { q: "Method yang aman untuk data sensitif…", options: ["get", "post", "put"], answer: 1 },
  ],
  input: [
    { q: "input wajib diisi memakai…", options: ["placeholder", "required", "value"], answer: 1 },
    { q: "Tipe input untuk email adalah…", options: ["text", "mail", "email"], answer: 2 },
  ],
  progress: [
    { q: "progress tanpa value menampilkan…", options: ["0%", "100%", "mode indeterminate"], answer: 2 },
  ],
  details: [
    { q: "<details> terbuka default memakai atribut…", options: ["open", "show", "expanded"], answer: 0 },
  ],
};

// Contoh import CATEGORIES untuk membangun soal generik
import { CATEGORIES } from "./categories.js";

function shuffleDeterministic(arr, seed) {
  const a = [...arr];
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  for (let i = a.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) >>> 0;
    const j = h % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function genericQuestions(entry) {
  const others = CATEGORIES.filter((c) => c.id !== entry.category).slice(0, 2);
  const options = shuffleDeterministic(
    [CATEGORIES.find((c) => c.id === entry.category).name, ...others.map((c) => c.name)],
    entry.slug
  );
  const answer = options.indexOf(CATEGORIES.find((c) => c.id === entry.category).name);
  const levelOpts = ["Pemula", "Menengah", "Ahli"];
  const levelAnswer = entry.level === "Menengah" ? 1 : 0;
  return [
    { q: `🏷️ Kategori tag ${entry.tag} adalah…`, options, answer },
    { q: `📈 Tingkat kesulitan ${entry.tag} adalah…`, options: levelOpts, answer: levelAnswer },
  ];
}

// Soal untuk satu entry — custom kalau ada, generik dari data tag kalau tidak
export function questionsForEntry(entry) {
  const custom = TAG_QUIZZES[entry.slug];
  if (custom && custom.length >= 2) return custom.slice(0, 3);
  return genericQuestions(entry).slice(0, 3);
}

export function questionsForTag(tagSlug) {
  return TAG_QUIZZES[tagSlug] || [];
}

// Seeded shuffle (deterministik) — untuk memilih soal stage tanpa mengulang pola.
function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function pickStageQuestions(pool, seedStr, count) {
  const seed = hashSeed(seedStr);
  const arr = [...pool];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = Math.imul(s ^ (s >>> 13), 1103515245) + 12345;
    s = s >>> 0;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const out = [];
  for (let i = 0; i < count; i++) out.push(arr[i % arr.length]);
  return out;
}
