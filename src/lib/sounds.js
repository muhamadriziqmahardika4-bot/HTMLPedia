// Sound effect sederhana lewat Web Audio API — tanpa file audio eksternal.
// Semua bunyi pendek; menyesal yang panjang tidak dipakai biar tidak mengganggu.

let ctx = null;
function audio() {
  try {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq, start, dur, type = "sine", peak = 0.12) {
  const a = audio();
  if (!a) return;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, a.currentTime + start);
  g.gain.exponentialRampToValueAtTime(peak, a.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + start + dur);
  o.connect(g).connect(a.destination);
  o.start(a.currentTime + start);
  o.stop(a.currentTime + start + dur + 0.05);
}

export function playCorrect() {
  // ding-ding ceria naik
  tone(523.25, 0, 0.16, "triangle");
  tone(659.25, 0.12, 0.16, "triangle");
  tone(880.0, 0.24, 0.3, "triangle");
}

export function playWrong() {
  // buzz rendah turun
  tone(220.0, 0, 0.18, "sawtooth", 0.08);
  tone(164.81, 0.14, 0.3, "sawtooth", 0.08);
}

export function playFinish(passed) {
  if (passed) {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.12, 0.22, "triangle"));
  } else {
    tone(392.0, 0, 0.25, "sine");
    tone(329.63, 0.2, 0.35, "sine");
  }
}
