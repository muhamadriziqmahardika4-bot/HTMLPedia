// Materi JavaScript — skema sama dengan tag HTML.
export const JS_TAGS = [
  {
    slug: "js-const-let",
    tag: "const / let",
    name: "Variabel: const & let",
    category: "javascript",
    level: "Pemula",
    analogi: "Const itu kotak yang dikunci (nilainya tidak bisa diganti), let itu kotak biasa yang isinya bisa ditukar.",
    summary: "const dan let mendeklarasikan variabel. const untuk nilai yang tidak di-reassign, let untuk yang boleh di-reassign. Hindari var (bisa bocor scope).",
    atribut: [
      { name: "const", desc: "Tidak bisa di-reassign (isi objek masih bisa diubah)" },
      { name: "let", desc: "Bisa di-reassign" },
      { name: "var", desc: "Legacy — hindari di kode modern" },
    ],
    contohKode: `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>const & let</title>
<style>body{font-family:sans-serif;padding:1rem}#out{font-weight:700;color:#0c4a6e}button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}</style>
</head>
<body>
<div id="out">Menghitung...</div>
<script>
const nama = "Mahardika";
let umur = 20;
umur = 21;   // let boleh di-reassign
document.getElementById("out").textContent = nama + " berumur " + umur + " tahun";
</script>
</body>
</html>`,
    related: ["js-function", "js-if-else"],
    demo: "generic",
  },
  {
    slug: "js-function",
    tag: "function",
    name: "Fungsi",
    category: "javascript",
    level: "Pemula",
    analogi: "Fungsi itu resep masakan — tulis sekali, pakai berkali-kali dengan bahan berbeda.",
    summary: "Fungsi mengemas sekumpulan perintah jadi satu nama yang bisa dipanggil kapan pun dengan input (parameter) dan output (return).",
    atribut: [
      { name: "parameter", desc: "Input yang diterima fungsi" },
      { name: "return", desc: "Nilai yang dikembalikan fungsi" },
      { name: "arrow function", desc: "(x) => x * 2 — sintaks ringkas" },
    ],
    contohKode: `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>function</title>
<style>body{font-family:sans-serif;padding:1rem}#out{font-weight:700;color:#0c4a6e}button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}</style>
</head>
<body>
<div id="out"></div>
<script>
function sapa(nama) {
  return "Halo, " + nama + "! Selamat belajar.";
}
document.getElementById("out").textContent = sapa("Mahardika");
</script>
</body>
</html>`,
    related: ["js-const-let", "js-arrow-function"],
    demo: "generic",
  },
  {
    slug: "js-arrow-function",
    tag: "() => {}",
    name: "Arrow Function",
    category: "javascript",
    level: "Pemula",
    analogi: "Arrow function itu fungsi versi ekspres kilat — lebih ringkas, dan tidak punya 'diri' (this) sendiri.",
    summary: "Arrow function adalah cara ringkas menulis fungsi: (parameter) => ekspresi. Tidak punya this sendiri — this-nya mengikuti scope tempatnya ditulis.",
    atribut: [
      { name: "() => {}", desc: "Tanpa parameter" },
      { name: "(x) => x * 2", desc: "Satu parameter, return implisit" },
      { name: "(a, b) => { ... }", desc: "Banyak baris — butuh return eksplisit" },
    ],
    contohKode: `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>arrow function</title>
<style>body{font-family:sans-serif;padding:1rem}#out{font-weight:700;color:#0c4a6e}button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}</style>
</head>
<body>
<div id="out"></div>
<script>
const duaKali = (x) => x * 2;
const tambah = (a, b) => a + b;
document.getElementById("out").textContent = "duaKali(21) = " + duaKali(21) + ", tambah(3, 4) = " + tambah(3, 4);
</script>
</body>
</html>`,
    related: ["js-function", "js-array-map"],
    demo: "generic",
  },
  {
    slug: "js-if-else",
    tag: "if / else",
    name: "Percabangan",
    category: "javascript",
    level: "Pemula",
    analogi: "If/else itu persimpangan jalan — kalau hujan bawa payung, kalau tidak bawa topi.",
    summary: "if/else menjalankan kode berbeda berdasarkan kondisi. Bisa dirangkai dengan else if. Untuk banyak pilihan, switch sering lebih rapi.",
    atribut: [
      { name: "if (kondisi)", desc: "Jalankan jika benar" },
      { name: "else if", desc: "Kondisi tambahan" },
      { name: "else", desc: "Default jika semua salah" },
      { name: "&& / ||", desc: "Gabung kondisi" },
    ],
    contohKode: `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>if / else</title>
<style>body{font-family:sans-serif;padding:1rem}#out{font-weight:700;color:#0c4a6e}button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}</style>
</head>
<body>
<div id="out"></div>
<script>
const nilai = 85;
let predikat;
if (nilai >= 80) {
  predikat = "A — Hebat!";
} else if (nilai >= 70) {
  predikat = "B — Baik";
} else {
  predikat = "C — Perlu belajar lagi";
}
document.getElementById("out").textContent = "Nilai kamu " + nilai + " → " + predikat;
</script>
</body>
</html>`,
    related: ["js-const-let", "js-for-loop"],
    demo: "generic",
  },
  {
    slug: "js-for-loop",
    tag: "for / of",
    name: "Perulangan",
    category: "javascript",
    level: "Pemula",
    analogi: "Loop itu mesin fotokopi — ulangi langkah yang sama untuk setiap item.",
    summary: "Perulangan menjalankan kode berulang. for...of paling nyaman untuk array, for...in untuk object, for biasa saat butuh indeks.",
    atribut: [
      { name: "for...of", desc: "Iterasi array: for (const item of list)" },
      { name: "for...in", desc: "Iterasi key object" },
      { name: "for (let i = 0; ...)", desc: "Dengan indeks manual" },
      { name: "break / continue", desc: "Hentikan / lewati iterasi" },
    ],
    contohKode: `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>for loop</title>
<style>body{font-family:sans-serif;padding:1rem}#out{font-weight:700;color:#0c4a6e}button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}</style>
</head>
<body>
<div id="out"></div>
<script>
const buah = ["Apel", "Jeruk", "Anggur"];
let isi = "<ul>";
for (const b of buah) {
  isi += "<li>" + b + "</li>";
}
isi += "</ul>";
document.getElementById("out").innerHTML = isi;
</script>
</body>
</html>`,
    related: ["js-if-else", "js-array-map"],
    demo: "generic",
  },
  {
    slug: "js-querySelector",
    tag: "querySelector",
    name: "Mengambil Elemen",
    category: "javascript",
    level: "Pemula",
    analogi: "QuerySelector itu senter yang menunjuk satu elemen di halaman — kamu pilih pakai selector CSS.",
    summary: "document.querySelector(selector) mengambil elemen PERTAMA yang cocok dengan selector CSS. Pakai querySelectorAll untuk semua (hasil: NodeList).",
    atribut: [
      { name: "querySelector('.kelas')", desc: "Elemen pertama dengan class" },
      { name: "querySelectorAll('li')", desc: "Semua elemen (NodeList)" },
      { name: "getElementById('id')", desc: "Langsung lewat id — lebih cepat" },
    ],
    contohKode: `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>querySelector</title>
<style>body{font-family:sans-serif;padding:1rem}#out{font-weight:700;color:#0c4a6e}button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}</style>
</head>
<body>
<button class="btn">Klik Aku!</button>
<div id="out">Belum ada aksi</div>
<script>
const tombol = document.querySelector(".btn");
document.getElementById("out").textContent = "Tombol ditemukan dengan teks: " + tombol.textContent;
</script>
</body>
</html>`,
    related: ["js-addEventListener", "js-const-let"],
    demo: "generic",
  },
  {
    slug: "js-addEventListener",
    tag: "addEventListener",
    name: "Mendengarkan Event",
    category: "javascript",
    level: "Pemula",
    analogi: "AddEventListener itu satpam yang selalu siaga — begitu ada klik, dia bereaksi.",
    summary: "element.addEventListener('event', handler) menjalankan handler saat event terjadi — 'click', 'input', 'submit', 'keydown', dll.",
    atribut: [
      { name: "click", desc: "Elemen diklik" },
      { name: "input", desc: "Isi input berubah" },
      { name: "submit", desc: "Form dikirim" },
      { name: "DOMContentLoaded", desc: "HTML selesai diparse" },
    ],
    contohKode: `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>addEventListener</title>
<style>body{font-family:sans-serif;padding:1rem}#out{font-weight:700;color:#0c4a6e}button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}</style>
</head>
<body>
<button class="btn">Klik Aku!</button>
<div id="out">Belum ada aksi</div>
<script>
const tombol = document.querySelector(".btn");
const out = document.getElementById("out");
tombol.addEventListener("click", function () {
  out.textContent = "Tombol diklik! 🎉 (klik lagi!)";
});
</script>
</body>
</html>`,
    related: ["js-querySelector", "js-function"],
    demo: "generic",
  },
  {
    slug: "js-array-map",
    tag: "array.map()",
    name: "Transformasi Array",
    category: "javascript",
    level: "Pemula",
    analogi: "Map itu mesin pengubah apel jadi jus — setiap item berubah jadi sesuatu yang baru.",
    summary: "array.map(fn) membuat array BARU berisi hasil transformasi tiap item — cara paling bersih mengubah data.",
    atribut: [
      { name: "map(fn)", desc: "Array baru, panjang sama" },
      { name: "filter(fn)", desc: "Hanya item yang lolos uji" },
      { name: "find(fn)", desc: "Item pertama yang cocok" },
      { name: "reduce(fn)", desc: "Lipat semua jadi satu nilai" },
    ],
    contohKode: `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>array.map()</title>
<style>body{font-family:sans-serif;padding:1rem}#out{font-weight:700;color:#0c4a6e}button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}</style>
</head>
<body>
<div id="out"></div>
<script>
const harga = [1000, 2000, 3000];
const diskon = harga.map((h) => h * 0.8);
document.getElementById("out").textContent = "Setelah diskon 20%: " + diskon.join(", ");
</script>
</body>
</html>`,
    related: ["js-array-filter", "js-for-loop"],
    demo: "generic",
  },
  {
    slug: "js-array-filter",
    tag: "array.filter()",
    name: "Menyaring Array",
    category: "javascript",
    level: "Pemula",
    analogi: "Filter itu saringan — hanya data yang lolos syarat yang tetap ada.",
    summary: "array.filter(fn) membuat array baru berisi item-item yang lolos pengujian — item yang tidak lolos dibuang.",
    atribut: [
      { name: "filter(fn)", desc: "Array baru berisi item yang lolos" },
      { name: "includes(x)", desc: "Cek apakah x ada di array" },
      { name: "some / every", desc: "Ada satu yang lolos / semua lolos" },
    ],
    contohKode: `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>array.filter()</title>
<style>body{font-family:sans-serif;padding:1rem}#out{font-weight:700;color:#0c4a6e}button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}</style>
</head>
<body>
<div id="out"></div>
<script>
const nilai = [80, 60, 90, 40, 75];
const lulus = nilai.filter((n) => n >= 70);
document.getElementById("out").textContent = "Yang lulus (>=70): " + lulus.join(", ");
</script>
</body>
</html>`,
    related: ["js-array-map"],
    demo: "generic",
  },
  {
    slug: "js-promise",
    tag: "new Promise()",
    name: "Promise",
    category: "javascript",
    level: "Menengah",
    analogi: "Promise itu struk pesanan — barangnya belum jadi, tapi kamu diberi tanda bahwa nanti akan selesai atau gagal.",
    summary: "Promise mewakili operasi asinkron yang hasilnya belum ada sekarang. Pakai .then() / .catch(), atau async/await untuk sintaks yang lebih enak dibaca.",
    atribut: [
      { name: "resolve", desc: "Panggil saat berhasil" },
      { name: "reject", desc: "Panggil saat gagal" },
      { name: ".then / .catch", desc: "Menangani hasil / error" },
      { name: "Promise.all", desc: "Tunggu semua promise sekaligus" },
    ],
    contohKode: `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Promise</title>
<style>body{font-family:sans-serif;padding:1rem}#out{font-weight:700;color:#0c4a6e}button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}</style>
</head>
<body>
<div id="out">Memproses…</div>
<script>
Promise.resolve("Data diterima! ✅").then((v) => {
  document.getElementById("out").textContent = v;
});
</script>
</body>
</html>`,
    related: ["js-async-await"],
    demo: "generic",
  },
  {
    slug: "js-async-await",
    tag: "async / await",
    name: "async/await",
    category: "javascript",
    level: "Menengah",
    analogi: "Async/await itu antre dengan sabar — selesaikan satu urusan dulu, baru lanjut.",
    summary: "async menandai fungsi asinkron; await 'menghentikan' eksekusi sampai promise selesai — kode terlihat seperti sinkron tapi tidak memblokir.",
    atribut: [
      { name: "async function", desc: "Fungsi yang selalu mengembalikan Promise" },
      { name: "await expr", desc: "Tunggu promise selesai" },
      { name: "try/catch", desc: "Menangani error dari await" },
    ],
    contohKode: `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>async / await</title>
<style>body{font-family:sans-serif;padding:1rem}#out{font-weight:700;color:#0c4a6e}button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}</style>
</head>
<body>
<div id="out">Memuat…</div>
<script>
(async function () {
  const hasil = await new Promise((resolve) => setTimeout(() => resolve("Data diterima! ✅"), 600));
  document.getElementById("out").textContent = hasil;
})();
</script>
</body>
</html>`,
    related: ["js-promise", "js-addEventListener"],
    demo: "generic",
  },
  {
    slug: "js-localStorage",
    tag: "localStorage",
    name: "localStorage",
    category: "javascript",
    level: "Menengah",
    analogi: "localStorage itu laci di meja komputermu — data tetap ada walau browser ditutup.",
    summary: "localStorage menyimpan data (teks) secara permanen di browser pengguna — dipakai HTMLpedia untuk progress belajarmu. Batas ±5MB, khusus teks.",
    atribut: [
      { name: "setItem(k, v)", desc: "Simpan nilai (v harus string)" },
      { name: "getItem(k)", desc: "Ambil nilai" },
      { name: "JSON.parse / stringify", desc: "Simpan object sebagai teks" },
      { name: "removeItem(k)", desc: "Hapus satu kunci" },
    ],
    contohKode: `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>localStorage</title>
<style>body{font-family:sans-serif;padding:1rem}#out{font-weight:700;color:#0c4a6e}button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}</style>
</head>
<body>
<div id="out"></div>
<script>
localStorage.setItem("nama", "Mahardika");
const simpan = localStorage.getItem("nama");
document.getElementById("out").textContent = "Tersimpan di localStorage: " + simpan;
</script>
</body>
</html>`,
    related: ["js-const-let", "js-async-await"],
    demo: "generic",
  },
];
