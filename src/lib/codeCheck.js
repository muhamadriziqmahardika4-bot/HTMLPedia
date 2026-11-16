// ===== Code Checker untuk Proyek Mini (client-side, tanpa menjalankan kode) =====
// HTML diparse dengan DOMParser (tidak mengeksekusi script), lalu tiap
// checklist diuji dengan fungsi validasi yang mengembalikan { ok, message }.

function parse(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const styleText = [...doc.querySelectorAll("style")].map((s) => s.textContent).join("\n");
  const scriptText = [...doc.querySelectorAll("script")].map((s) => s.textContent).join("\n");
  // juga ambil inline style dari atribut style
  const inlineStyles = [...doc.querySelectorAll("[style]")].map((el) => el.getAttribute("style") || "").join("\n");
  return { doc, styleText: `${styleText}\n${inlineStyles}`, scriptText };
}

const text = (el) => (el?.textContent || "").trim();
const has = (doc, sel) => doc.querySelector(sel) !== null;

// ===== Proyek 1 — Biodata =====
export const BIODATA_CHECKS = [
  {
    id: "biodata-1",
    label: "Ada 1 <h1> dengan nama kamu",
    hint: "Contoh: <h1>Mahardika</h1>",
    run: ({ doc }) => {
      const h = doc.querySelector("h1");
      if (!h) return { ok: false, message: "Tidak ada <h1> di kode kamu." };
      if (text(h).length < 2) return { ok: false, message: "<h1> kamu kosong — isi dengan nama kamu." };
      return { ok: true, message: "✓ <h1> dengan isi nama ditemukan." };
    },
  },
  {
    id: "biodata-2",
    label: "Ada foto/emoji profil besar",
    hint: "Emoji: <div style=\"font-size:5rem\">🧑‍💻</div> — atau <img src='...' alt='foto aku'>",
    run: ({ doc }) => {
      const img = doc.querySelector("img");
      if (img && (img.getAttribute("src") || "").trim() && (img.getAttribute("alt") || "").trim())
        return { ok: true, message: "✓ <img> dengan src & alt ditemukan." };
      if (img)
        return { ok: false, message: "<img> kamu tidak punya src atau alt yang terisi." };
      // emoji besar: elemen yang font-size-nya besar atau mengandung emoji
      const big = [...doc.querySelectorAll("div, span, p, h1, h2, figure")].find((el) =>
        /(font-size\s*:\s*(3|4|5|6|7|8|9)rem)|(font-size\s*:\s*\d{3,}px)/.test(el.getAttribute("style") || "")
      );
      if (big) return { ok: true, message: "✓ Emoji/foto profil besar ditemukan." };
      return { ok: false, message: "Belum ada foto/emoji besar — pakai <img> atau emoji dengan font-size besar." };
    },
  },
  {
    id: "biodata-3",
    label: "Ada <ul> daftar hobi minimal 3",
    hint: "<ul><li>Ngoding</li><li>Main game</li><li>Mancing</li></ul>",
    run: ({ doc }) => {
      const ul = doc.querySelector("ul");
      if (!ul) return { ok: false, message: "Tidak ada <ul> (daftar hobi) di kode kamu." };
      const items = ul.querySelectorAll("li");
      if (items.length < 3) return { ok: false, message: `<li> kamu baru ${items.length}, minimal 3.` };
      return { ok: true, message: `✓ Daftar hobi berisi ${items.length} item.` };
    },
  },
  {
    id: "biodata-4",
    label: "Ada <a> ke Instagram kamu (target _blank)",
    hint: "<a href='https://instagram.com/...' target='_blank'>@akun</a>",
    run: ({ doc }) => {
      const links = [...doc.querySelectorAll("a")];
      if (links.length === 0) return { ok: false, message: "Tidak ada <a> (link) di kode kamu." };
      const ig = links.find((a) => /instagram\.com/i.test(a.getAttribute("href") || ""));
      if (!ig) return { ok: false, message: "Link Instagram tidak ditemukan (href harus mengandung instagram.com)." };
      if ((ig.getAttribute("target") || "").toLowerCase() !== "_blank")
        return { ok: false, message: "Link Instagram kamu belum pakai target=\"_blank\"." };
      return { ok: true, message: "✓ Link Instagram dengan target _blank ditemukan." };
    },
  },
  {
    id: "biodata-5",
    label: "Ada <p> perkenalan singkat",
    hint: "<p>Halo, aku mahasiswa ...</p>",
    run: ({ doc }) => {
      const p = [...doc.querySelectorAll("p")].find((el) => text(el).length >= 10);
      if (!p) return { ok: false, message: "Belum ada <p> perkenalan — tulis minimal 1 kalimat (±10 karakter)." };
      return { ok: true, message: "✓ Perkenalan ditemukan." };
    },
  },
];

// ===== Proyek 2 — Jadwal Pelajaran =====
export const JADWAL_CHECKS = [
  {
    id: "jadwal-1",
    label: "Pakai <table> + <thead> + <tbody>",
    hint: "<table><thead>…</thead><tbody>…</tbody></table>",
    run: ({ doc }) => {
      if (!has(doc, "table")) return { ok: false, message: "Tidak ada <table> di kode kamu." };
      if (!has(doc, "thead")) return { ok: false, message: "<thead> tidak ditemukan — bungkus baris judul kolom dengan <thead>." };
      if (!has(doc, "tbody")) return { ok: false, message: "<tbody> tidak ditemukan — bungkus baris isi dengan <tbody>." };
      return { ok: true, message: "✓ <table> dengan <thead> & <tbody> ditemukan." };
    },
  },
  {
    id: "jadwal-2",
    label: "Ada <th scope='col'> untuk kolom",
    hint: "<th scope='col'>Senin</th>",
    run: ({ doc }) => {
      const th = [...doc.querySelectorAll("th")].find((el) => (el.getAttribute("scope") || "").toLowerCase() === "col");
      if (!th) return { ok: false, message: "Tidak ada <th scope='col'> — tandai sel judul kolom dengan scope=\"col\"." };
      return { ok: true, message: "✓ <th scope='col'> ditemukan." };
    },
  },
  {
    id: "jadwal-3",
    label: "Warna header berbeda (CSS background)",
    hint: "th { background: #38bdf8; color: #fff; }",
    run: ({ styleText }) => {
      if (!/background(-color)?\s*:[^;}]+/i.test(styleText)) return { ok: false, message: "Belum ada deklarasi background di CSS (mis. th { background: #38bdf8; })." };
      if (!/th\b/.test(styleText)) return { ok: false, message: "CSS kamu belum men-style <th> — beri background ke sel header." };
      return { ok: true, message: "✓ Header tabel diberi warna background." };
    },
  },
  {
    id: "jadwal-4",
    label: "border-radius di tabel (CSS)",
    hint: "table { border-radius: 12px; overflow: hidden; }",
    run: ({ styleText }) => {
      if (!/border-radius\s*:/i.test(styleText)) return { ok: false, message: "Belum ada border-radius di CSS — beri sudut membulat pada tabel/sel." };
      return { ok: true, message: "✓ border-radius ditemukan." };
    },
  },
  {
    id: "jadwal-5",
    label: "Baris disorot saat disentuh mouse (:hover)",
    hint: "tr:hover { background: #e0f2fe; }",
    run: ({ styleText }) => {
      if (!/tr:hover/i.test(styleText)) return { ok: false, message: "Belum ada aturan tr:hover — misalnya tr:hover { background: #f0f9ff; }" };
      return { ok: true, message: "✓ tr:hover ditemukan." };
    },
  },
];

// ===== Proyek 3 — Kuis Interaktif (JavaScript) =====
export const KUIS_CHECKS = [
  {
    id: "kuis-1",
    label: "HTML punya pertanyaan + <button> jawaban",
    hint: "<p>Pertanyaan?</p><button>A</button><button>B</button>",
    run: ({ doc }) => {
      const buttons = doc.querySelectorAll("button");
      if (buttons.length < 2) return { ok: false, message: `Tombol kamu baru ${buttons.length} — minimal 2 untuk pilihan ganda.` };
      const q = [...doc.querySelectorAll("p, h1, h2, li, div")].find((el) => /\?/.test(text(el)));
      if (!q) return { ok: false, message: "Tidak ada pertanyaan (teks dengan tanda '?') ditemukan." };
      return { ok: true, message: `✓ ${buttons.length} tombol & pertanyaan ditemukan.` };
    },
  },
  {
    id: "kuis-2",
    label: "JS ambil elemen dengan querySelector/getElementById",
    hint: "const btn = document.querySelector('.btn');",
    run: ({ scriptText }) => {
      if (!/querySelector|getElementById/.test(scriptText)) return { ok: false, message: "JS kamu belum mengambil elemen (querySelector / getElementById)." };
      return { ok: true, message: "✓ Elemen diambil lewat JS." };
    },
  },
  {
    id: "kuis-3",
    label: "addEventListener('click', …) di tombol",
    hint: "btn.addEventListener('click', jawaban);",
    run: ({ scriptText }) => {
      if (!/addEventListener\s*\(\s*['"`]click/.test(scriptText)) return { ok: false, message: "Belum ada addEventListener('click', …) di JS kamu." };
      return { ok: true, message: "✓ Listener klik ditemukan." };
    },
  },
  {
    id: "kuis-4",
    label: "if/else untuk cek jawaban benar",
    hint: "if (jawabanBenar) { skor++; }",
    run: ({ scriptText }) => {
      if (!/\bif\s*\(/.test(scriptText)) return { ok: false, message: "Tidak ada if(...) — kamu butuh percabangan untuk cek jawaban." };
      return { ok: true, message: "✓ Percabangan if ditemukan." };
    },
  },
  {
    id: "kuis-5",
    label: "Skor akhir ditampilkan di halaman",
    hint: "hasil.textContent = 'Skor kamu: ' + skor;",
    run: ({ doc, scriptText }) => {
      const writesDom = /textContent|innerHTML|innerText/.test(scriptText);
      if (!writesDom) return { ok: false, message: "Skor belum ditulis ke halaman (pakai textContent/innerHTML)." };
      if (!/skor|score|nilai|hasil/i.test(scriptText)) return { ok: false, message: "Variabel skor/nilai belum terlihat di JS kamu." };
      const target = doc.querySelector("#skor, #hasil, #nilai, #result, .skor, .hasil");
      if (target) return { ok: true, message: "✓ Skor ditampilkan ke elemen halaman." };
      return { ok: true, message: "✓ Skor ditulis ke DOM (elemen skor ditemukan lewat JS)." };
    },
  },
];

export const PROJECT_CHECKS = {
  biodata: BIODATA_CHECKS,
  jadwal: JADWAL_CHECKS,
  kuis: KUIS_CHECKS,
};

export function checkProject(projectId, html) {
  const checks = PROJECT_CHECKS[projectId];
  if (!checks) return [];
  const ctx = parse(html);
  return checks.map((c) => ({ id: c.id, label: c.label, hint: c.hint, ...c.run(ctx) }));
}
