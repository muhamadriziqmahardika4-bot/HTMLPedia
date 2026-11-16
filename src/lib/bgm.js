// BGM generatif ala lofi/study beats — Web Audio API, tanpa file audio.
// Chord-chord lembut (vi–IV–I–V), tempo santai, gain rendah. Bisa di-toggle & tersimpan di localStorage.

let ctx = null;
let master = null;
let timer = null;
let step = 0;

const CHORDS = [
  [261.63, 329.63, 392.0, 493.88],   // Cmaj7
  [220.0, 261.63, 329.63, 392.0],    // Am7
  [174.61, 220.0, 261.63, 329.63],   // Fmaj7
  [196.0, 246.94, 293.66, 392.0],    // G6/sus
];

const KEY = "htmlpedia-bgm";
const BASE_GAIN = 0.055;

function audio() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.0001;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1400;
    filter.Q.value = 0.7;
    master.connect(filter).connect(ctx.destination);
  }
  return ctx;
}

function playChord(freqs) {
  const t = ctx.currentTime;
  const stepDur = 6; // tiap chord 6 detik

  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = i % 2 ? "sine" : "triangle";
    osc.frequency.value = f;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 1.2);   // attack lembut
    g.gain.setValueAtTime(0.5, t + stepDur - 1.4);        // sustain
    g.gain.exponentialRampToValueAtTime(0.0001, t + stepDur + 0.6); // release

    osc.connect(g).connect(master);
    osc.start(t);
    osc.stop(t + stepDur + 1);
  });

  // Bass lembut satu nada per chord
  const bass = ctx.createOscillator();
  bass.type = "sine";
  bass.frequency.value = freqs[0] / 2;
  const bg = ctx.createGain();
  bg.gain.setValueAtTime(0.0001, t);
  bg.gain.exponentialRampToValueAtTime(0.35, t + 0.8);
  bg.gain.exponentialRampToValueAtTime(0.0001, t + stepDur + 0.5);
  bass.connect(bg).connect(master);
  bass.start(t);
  bass.stop(t + stepDur + 1);
}

function loop() {
  playChord(CHORDS[step % CHORDS.length]);
  step += 1;
  timer = setTimeout(loop, 5200); // chord berikutnya sedikit overlap
}

export function startBgm() {
  try {
    const a = audio();
    if (a.state === "suspended") a.resume();
    // fade-in halus
    master.gain.cancelScheduledValues(a.currentTime);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), a.currentTime);
    master.gain.exponentialRampToValueAtTime(BASE_GAIN, a.currentTime + 1.2);
    if (!timer) loop();
    localStorage.setItem(KEY, "on");
  } catch {
    // abaikan — BGM tidak wajib
  }
}

export function stopBgm() {
  try {
    if (!ctx || !master) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    clearTimeout(timer);
    timer = null;
    localStorage.setItem(KEY, "off");
  } catch {
    // abaikan
  }
}

export function toggleBgm() {
  const on = localStorage.getItem(KEY) === "on";
  if (on) stopBgm(); else startBgm();
  return !on;
}

export function bgmEnabled() {
  return localStorage.getItem(KEY) === "on";
}
