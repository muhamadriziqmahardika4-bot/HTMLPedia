// Sound effect ala aplikasi belajar modern — cerah & bersemangat saat benar, turun & lesu saat salah.
// Murni Web Audio API, tanpa file eksternal.

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

function tone(freq, start, dur, type = "triangle", peak = 0.14, glideTo = null) {
  const a = audio();
  if (!a) return;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, a.currentTime + start);
  if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, a.currentTime + start + dur);
  g.gain.setValueAtTime(0.0001, a.currentTime + start);
  g.gain.exponentialRampToValueAtTime(peak, a.currentTime + start + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + start + dur);
  o.connect(g).connect(a.destination);
  o.start(a.currentTime + start);
  o.stop(a.currentTime + start + dur + 0.05);
}

// ✅ Benar — naik ceria seperti "ding-ding!" aplikasi belajar
export function playCorrect() {
  tone(659.25, 0, 0.14, "triangle", 0.16);      // E5
  tone(880.0, 0.09, 0.14, "triangle", 0.16);    // A5
  tone(1318.5, 0.18, 0.3, "sine", 0.14);        // E6 shimmer
}

// ❌ Salah — turun lesu seperti "womp womp"
export function playWrong() {
  tone(196.0, 0, 0.16, "sawtooth", 0.09, 174.61);   // G3 → F3
  tone(155.56, 0.16, 0.28, "sawtooth", 0.09, 130.81); // D#3 → C3
}

// 🎉 Selesai kuis
export function playFinish(passed) {
  if (passed) {
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => tone(f, i * 0.1, 0.22, "triangle", 0.14));
  } else {
    tone(329.63, 0, 0.25, "sine", 0.12);
    tone(261.63, 0.22, 0.35, "sine", 0.12);
  }
}

// 🔔 Klik UI umum — tick halus
export function playClick() {
  tone(1200, 0, 0.04, "sine", 0.05);
}
