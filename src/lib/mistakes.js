// Buku Kesalahan — mencatat soal yang pernah kamu jawab salah agar bisa diulang.
const KEY = "htmlpedia-mistakes";

function readAll() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeAll(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // abaikan
  }
}

export function addMistake(item) {
  const list = readAll();
  // jangan dobel: kalau soal sama sudah ada, ganti saja
  const idx = list.findIndex((m) => m.q === item.q);
  const entry = { ...item, date: Date.now() };
  if (idx >= 0) list[idx] = entry;
  else list.unshift(entry);
  writeAll(list);
}

export function getMistakes() {
  return readAll();
}

export function removeMistake(q) {
  writeAll(readAll().filter((m) => m.q !== q));
}

export function clearMistakes() {
  writeAll([]);
}

export function mistakesCount() {
  return readAll().length;
}
