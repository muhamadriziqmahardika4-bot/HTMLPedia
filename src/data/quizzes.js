// Bank soal kuis HTMLpedia.
// Struktur: QUIZZES[topik][mode] = array soal { q, options, answer }
// TOPIC_TAGS: daftar materi yang bisa dipilih per topik.
// TAG_QUIZZES: soal singkat per tag (untuk kuis mini di halaman detail tag).

export const TOPIC_TAGS = {
  HTML: ["<table>", "<a>", "<img>", "<form>", "<input>", "<ul>"],
  CSS: ["flexbox", "grid", "selector", "box-model", "position", "warna"],
  JavaScript: ["variabel", "fungsi", "DOM", "array", "event", "async"],
};

export const MODES = [
  { id: "latihan", emoji: "🌱", name: "Latihan", desc: "3 soal pemanasan, santai, cocok untuk pemula", cls: "mode-latihan" },
  { id: "greget", emoji: "🔥", name: "Greget", desc: "5 soal menantang, uji pemahamanmu lebih dalam", cls: "mode-greget" },
  { id: "gacor", emoji: "💀", name: "Gacor", desc: "6 soal ekstrem untuk yang benar-benar jago", cls: "mode-gacor" },
];

export const QUIZZES = {
  HTML: {
    latihan: [
      { q: "Tag apa yang dipakai membuat tabel?", options: ["<list>", "<table>", "<grid>"], answer: 1 },
      { q: "Untuk teks paling besar dipakai…", options: ["<p>", "<h1>", "<small>"], answer: 1 },
      { q: "Atribut gambar adalah…", options: ["href", "alt", "src"], answer: 2 },
    ],
    greget: [
      { q: "Elemen untuk sel judul kolom adalah…", options: ["<td>", "<th>", "<thead>", "<caption>"], answer: 1 },
      { q: "colspan=\"2\" artinya…", options: ["gabung 2 baris", "gabung 2 kolom", "2 tabel", "lebar 2px"], answer: 1 },
      { q: "Tag untuk daftar bernomor adalah…", options: ["<ul>", "<li>", "<ol>", "<dl>"], answer: 2 },
      { q: "Input yang wajib diisi memakai atribut…", options: ["required", "placeholder", "value", "name"], answer: 0 },
      { q: "Elemen semantic untuk navigasi adalah…", options: ["<div>", "<nav>", "<aside>", "<section>"], answer: 1 },
    ],
    gacor: [
      { q: "Bedanya <section> dan <div> adalah…", options: ["tidak ada beda", "section punya makna semantic", "div lebih cepat", "section hanya untuk form"], answer: 1 },
      { q: "Atribut sandbox pada <iframe> berguna untuk…", options: ["membatasi kemampuan konten di dalamnya", "memperbesar iframe", "memuat iframe lebih cepat", "menghapus border iframe"], answer: 0 },
      { q: "<meta charset=\"UTF-8\"> berfungsi untuk…", options: ["enkripsi halaman", "menentukan encoding karakter", "memuat font", "kompresi halaman"], answer: 1 },
      { q: "Elemen yang TIDAK boleh di dalam <p> adalah…", options: ["<strong>", "<em>", "<div>", "<a>"], answer: 2 },
      { q: "loading=\"lazy\" pada <img> artinya…", options: ["gambar dimuat saat dibutuhkan", "gambar gagal dimuat", "gambar di-cache", "gambar dikompresi"], answer: 0 },
      { q: "Untuk aksesibilitas, <img> sebaiknya selalu punya…", options: ["title", "alt", "longdesc", "role"], answer: 1 },
    ],
  },
  CSS: {
    latihan: [
      { q: "Properti untuk warna teks adalah…", options: ["background", "color", "font"], answer: 1 },
      { q: "display: flex dipakai untuk…", options: ["layout", "warna", "animasi"], answer: 0 },
      { q: "Satuan relatif terhadap font adalah…", options: ["px", "cm", "em"], answer: 2 },
    ],
    greget: [
      { q: "justify-content: center memusatkan item secara…", options: ["vertikal", "horizontal", "diagonal", "acak"], answer: 1 },
      { q: "z-index hanya bekerja pada elemen…", options: ["semua elemen", "positioned (bukan static)", "display: block", "inline"], answer: 1 },
      { q: "box-sizing: border-box membuat…", options: ["border masuk dalam hitungan width", "border hilang", "margin hilang", "padding hilang"], answer: 0 },
      { q: "Selector .card memilih…", options: ["id card", "elemen <card>", "class card", "semua div"], answer: 2 },
      { q: "position: sticky adalah gabungan…", options: ["fixed + absolute", "relative + fixed", "static + relative", "absolute + fixed"], answer: 1 },
    ],
    gacor: [
      { q: "Specificity tertinggi dimiliki oleh…", options: [".kelas", "#id", "elemen", "*"], answer: 1 },
      { q: "grid-template-columns: repeat(3, 1fr) membuat…", options: ["3 baris sama tinggi", "3 kolom sama lebar", "3 kolom otomatis", "grid 3px"], answer: 1 },
      { q: "Pseudo-class :nth-child(2n) memilih…", options: ["anak genap", "anak ganjil", "anak ke-2 saja", "2 anak pertama"], answer: 0 },
      { q: "@media (min-width: 768px) berarti…", options: ["gaya berlaku di layar ≥768px", "hanya di HP", "gaya berlaku di semua layar", "sama dengan max-width"], answer: 0 },
      { q: "Properti yang TIDAK diwariskan (inherited) adalah…", options: ["color", "font-family", "margin", "line-height"], answer: 2 },
      { q: "gap pada flexbox berfungsi untuk…", options: ["jarak antar item", "jarak ke tepi container", "lebar item", "tinggi item"], answer: 0 },
    ],
  },
  JavaScript: {
    latihan: [
      { q: "Cara menulis variabel di JS modern adalah…", options: ["var x = 1", "const x = 1", "let x == 1"], answer: 1 },
      { q: "console.log dipakai untuk…", options: ["mencetak ke console", "memberi warna teks", "membuat alert"], answer: 0 },
      { q: "Tanda === artinya…", options: ["sama nilai", "sama nilai & tipe", "assignment"], answer: 1 },
    ],
    greget: [
      { q: "document.querySelector('.btn') memilih…", options: ["id btn", "semua .btn", ".btn pertama", "elemen btn"], answer: 2 },
      { q: "addEventListener('click', fn) artinya…", options: ["jalankan fn saat diklik", "hapus fn", "buat tombol", "disable klik"], answer: 0 },
      { q: "Array.push() berfungsi untuk…", options: ["menghapus item", "menambah item di akhir", "mengurutkan", "membalik array"], answer: 1 },
      { q: "JSON.parse() mengubah…", options: ["objek jadi teks", "teks jadi objek", "array jadi objek", "teks jadi array"], answer: 1 },
      { q: "=== null && === undefined bisa disingkat dengan…", options: ["??", "?.", "== null", "!"], answer: 2 },
    ],
    gacor: [
      { q: "Closure adalah…", options: ["fungsi yang mengakses scope luarnya", "fungsi tanpa nama", "metode menutup tab", "callback async"], answer: 0 },
      { q: "Event delegation memanfaatkan…", options: ["bubbling event", "capturing event", "stopPropagation", "preventDefault"], answer: 0 },
      { q: "async/await dipakai untuk…", options: ["menjalankan kode paralel", "menangani Promise dengan sintaks sinkron", "membuat thread baru", "delay setTimeout"], answer: 1 },
      { q: "this di dalam arrow function merujuk ke…", options: ["object pemanggilnya", "scope tempatnya ditulis", "window selalu", "undefined selalu"], answer: 1 },
      { q: "localStorage menyimpan data sebagai…", options: ["objek", "teks (string)", "JSON otomatis", "cookie"], answer: 1 },
      { q: "debounce berguna untuk…", options: ["membatasi frekuensi pemanggilan fungsi", "mempercepat fungsi", "menunda semua fungsi", "membatalkan request"], answer: 0 },
    ],
  },
};

// Soal kuis mini per tag (2-3 soal). Tag tanpa entri dapat soal generik dari summary-nya.
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

// Soal kuis mini per tag. Tag tanpa entri khusus memakai soal generik dari data tag (lihat TagQuiz).
export function questionsForTag(tagSlug) {
  return TAG_QUIZZES[tagSlug] || [];
}
