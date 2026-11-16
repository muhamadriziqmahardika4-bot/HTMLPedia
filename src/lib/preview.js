// ===== Live Preview wrapper =====
// HTML: kalau kodenya belum dokumen lengkap, bungkus dengan kerangka minimal.
// CSS:  bungkus dengan halaman contoh berisi h1, p, tombol, kartu, tabel, list, link, input.
// JS:   bungkus dengan halaman contoh + elemen yang bisa diajak interaksi.

export function isFullHtml(code) {
  return /<html[\s>]|<!doctype|<body[\s>]/i.test(code);
}

function wrapTableFragment(code) {
  // Fragment tabel (<thead>/<tr>/dst. tanpa <table>) tidak akan dirender browser —
  // bungkus dalam <table> agar tayang sebagai tabel.
  if (/<(thead|tbody|tfoot|tr|th|td|caption|col\b|colgroup)[\s>/i.test(code) && !/<table[\s>]/i.test(code)) {
    return `<table border="1">${code}</table>`;
  }
  return code;
}

export function wrapPreview(code, lang) {
  if (lang === "html") {
    const body = wrapTableFragment(code);
    if (isFullHtml(code)) return code;
    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <style>body{font-family:sans-serif;padding:1rem}</style>
</head>
<body>
${body}
</body>
</html>`;
  }

  if (lang === "css") {
    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <style>
    body{font-family:sans-serif;padding:1rem}
    h1,h2,p{color:#334155}
    a{color:#2563eb}
    button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}
    .kartu{border:1px solid #cbd5e1;border-radius:12px;padding:.5rem;margin:.4rem 0}
    li{margin:.15rem 0}
  </style>
  <style>
${code}
  </style>
</head>
<body>
  <h1 class="judul">Halo, ini teks contoh</h1>
  <h2>Sub-judul teks</h2>
  <p class="contoh">Paragraf contoh. <a href="#">Ini link</a>.</p>
  <button class="tombol">Tombol</button>
  <div class="kartu">Kotak / kartu contoh</div>
  <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>
  <table border="1"><tr><th>Kolom</th><th>Kolom</th></tr><tr><td>1</td><td>2</td></tr></table>
  <input type="text" placeholder="Kolom isian">
</body>
</html>`;
  }

  // JavaScript
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <style>
    body{font-family:sans-serif;padding:1rem}
    button{padding:.4rem .8rem;border-radius:8px;border:1px solid #cbd5e1;background:#e2e8f0;cursor:pointer}
    #out{font-weight:700;color:#0c4a6e}
  </style>
</head>
<body>
  <h1>Contoh Interaktif</h1>
  <p>Klik tombol di bawah, lihat hasilnya di bawah ini:</p>
  <button class="btn">Klik Aku!</button>
  <p id="out">Belum ada aksi</p>
  <script>
${code}
  </script>
</body>
</html>`;
}
