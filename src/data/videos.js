// Link video tutorial per kelompok materi — semua terverifikasi ada.
// Catatan: link umumnya mengarah ke PLAYLIST kursus yang mencakup tag ini
// (karena tidak ada satu video khusus per tag); sekali buka langsung langsung belajar dari awal.

export const VIDEO_MAP = {
  html: {
    label: "HTML Dasar — Web Programming UNPAS (playlist)",
    url: "https://www.youtube.com/playlist?list=PLFIM0718LjIVuONHysfOK0ZtiqUWvrx4F",
    channel: "WPU (Web Programming UNPAS)",
  },
  css: {
    label: "HTML & CSS Tutorials — freeCodeCamp (playlist)",
    url: "https://www.youtube.com/playlist?list=PLWKjhJtqVAbnSe1qUNMG7AbPmjIG54u88",
    channel: "freeCodeCamp",
  },
  js: {
    label: "Basic JavaScript — freeCodeCamp (playlist)",
    url: "https://www.youtube.com/playlist?list=PLUvKRKFIL7gt3hvh5SZJ9TrlcIRaM_AfJ",
    channel: "freeCodeCamp",
  },
  "css-display-flex": {
    label: "Learn flexbox the easy way — Kevin Powell",
    url: "https://www.youtube.com/watch?v=u044iM9xsWU",
    channel: "Kevin Powell",
  },
};

// Kembalikan { label, url, channel } untuk sebuah entry pelajaran
export function videoFor(entry) {
  const lang = entry.category === "css" ? "css" : entry.category === "javascript" ? "js" : "html";
  // tag CSS flexbox mendapatkan link langsung ke video Kevin Powell
  if (entry.slug === "css-display-flex") return VIDEO_MAP["css-display-flex"];
  return VIDEO_MAP[lang];
}
