// Streak harian — dihitung dari hari-hari saat kamu menyelesaikan minimal 1 materi.
const KEY = "htmlpedia-activity";

function readDates() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? [...new Set(arr)].sort() : [];
  } catch {
    return [];
  }
}

function todayStr() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function recordActiveToday() {
  try {
    const dates = readDates();
    const t = todayStr();
    if (!dates.includes(t)) {
      localStorage.setItem(KEY, JSON.stringify([...dates, t].sort()));
    }
  } catch {
    // abaikan
  }
}

export function getStreak() {
  const dates = readDates();
  if (dates.length === 0) return { current: 0, best: 0, activeToday: false };

  const toTime = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d).getTime(); };
  const DAY = 86400000;

  // current: hitung mundur dari hari ini (atau kemarin kalau hari ini belum aktif)
  const set = new Set(dates);
  let cursor = new Date();
  const today = todayStr();
  if (!set.has(today)) cursor = new Date(cursor.getTime() - DAY);
  let current = 0;
  while (true) {
    const p = (n) => String(n).padStart(2, "0");
    const key = `${cursor.getFullYear()}-${p(cursor.getMonth() + 1)}-${p(cursor.getDate())}`;
    if (set.has(key)) { current += 1; cursor = new Date(cursor.getTime() - DAY); } else break;
  }

  // best: runtunan terpanjang
  let best = 1, run = 1;
  for (let i = 1; i < dates.length; i++) {
    if (toTime(dates[i]) - toTime(dates[i - 1]) === DAY) { run += 1; best = Math.max(best, run); }
    else run = 1;
  }

  return { current, best, activeToday: set.has(today) };
}
