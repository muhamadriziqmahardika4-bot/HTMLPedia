// ===== Bank soal Review Kilat — 3 tahap =====
// Tahap 1 (Dasar):   "Tag ini dipakai untuk apa?" → pilih kegunaan yang tepat
// Tahap 2 (Fungsi):  "Apa fungsi atribut ini?" → uji pemahaman deeper
// Tahap 3 (Tentukan & Lengkapi): Pernyataan Benar/Salah tentang tag ini

function pickRandom(arr, n, exclude = []) {
  const pool = arr.filter((x) => !exclude.includes(x));
  const a = [...pool];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const catName = (id) => id;

// ---------- TAHAP 1 — DASAR ----------
export function buildStage1(entry, allEntries) {
  const distractors = pickRandom(allEntries, 2, [entry.slug]).map((e) => e.name);
  const options = shuffle([entry.name, ...distractors]);
  return {
    kind: "dasar",
    q: `${entry.tag} dipakai untuk apa?`,
    options,
    answer: options.indexOf(entry.name),
    tag: entry.tag,
  };
}

// ---------- TAHAP 2 — FUNGSI ----------
export function buildStage2(entry, allEntries) {
  const mine = (entry.atribut || []).filter((a) => a.name);
  const others = allEntries.flatMap((e) => (e.atribut || []).map((a) => ({ tag: e.tag, ...a })));

  if (mine.length >= 1 && others.length >= 2) {
    const target = mine[Math.floor(Math.random() * mine.length)];
    // jawaban "lain" dari tag lain yang deskripsinya berbeda
    const othersPick = pickRandom(others, 2, [target.desc]).filter((o) => o.desc !== target.desc && o.name !== target.name);
    if (othersPick.length >= 2) {
      const options = shuffle([target.desc, othersPick[0].desc, othersPick[1].desc]);
      return {
        kind: "fungsi",
        q: `Apa fungsi atribut ${target.name} pada ${entry.tag}?`,
        options,
        answer: options.indexOf(target.desc),
        tag: entry.tag,
      };
    }
  }

  // Fallback: soal kategori
  const catOpts = shuffle([entry.category, ...pickRandom(["struktur", "teks", "link-media", "semantic", "form", "list-tabel"], 2, [entry.category])]);
  return {
    kind: "fungsi",
    q: `${entry.tag} termasuk kategori apa?`,
    options: catOpts,
    answer: catOpts.indexOf(entry.category),
    tag: entry.tag,
  };
}

// ---------- TAHAP 3 — TENTUKAN & LENGKAPI ----------
export function buildStage3(entry, allEntries) {
  const mine = (entry.atribut || []).filter((a) => a.name && a.desc);
  const pool = allEntries.flatMap((e) => (e.atribut || []).map((a) => ({ tag: e.tag, ...a })));

  if (mine.length >= 1 && pool.length >= 3) {
    const target = mine[Math.floor(Math.random() * mine.length)];
    // benar / salah secara acak (50/50)
    const sayTrue = Math.random() < 0.5;
    if (sayTrue) {
      return {
        kind: "tentukan",
        q: `Benar atau Salah: "Atribut ${target.name} pada ${entry.tag} berfungsi ${target.desc}."`,
        options: ["✅ Benar", "❌ Salah"],
        answer: 0,
        tag: entry.tag,
      };
    }
    // tukar dengan deskripsi acak dari tag lain
    const randomOther = pickRandom(pool, 1, [target.desc]).filter((o) => o.desc !== target.desc)[0];
    const wrongDesc = randomOther ? randomOther.desc : "tidak berfungsi apa-apa";
    return {
      kind: "tentukan",
      q: `Benar atau Salah: "Atribut ${target.name} pada ${entry.tag} berfungsi ${wrongDesc}."`,
      options: ["✅ Benar", "❌ Salah"],
      answer: 1,
      tag: entry.tag,
    };
  }

  // Fallback: tag mana yang dipakai untuk ini?
  const distractors = pickRandom(allEntries, 2, [entry.slug]).map((e) => e.tag);
  const options = shuffle([entry.tag, ...distractors]);
  return {
    kind: "tentukan",
    q: `Menurut kamu, tag mana yang ${entry.name.toLowerCase()}?`,
    options,
    answer: options.indexOf(entry.tag),
    tag: entry.tag,
  };
}

export function buildQuestionsForStage(stage, entries, allEntries) {
  const builders = [buildStage1, buildStage2, buildStage3];
  const build = builders[stage - 1] || buildStage1;
  return entries.map((e) => build(e, allEntries));
}
