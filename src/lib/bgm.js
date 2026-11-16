// BGM generatif — beberapa pilihan tema musik belajar (Web Audio API, tanpa file eksternal).
// Tersimpan di localStorage 'htmlpedia-bgm': "off" atau index track ("0","1","2").

let ctx = null;
let master = null;
let timer = null;
let step = 0;
let currentTrack = 0;

const KEY = "htmlpedia-bgm";

export const TRACKS = [
  {
    name: "🌙 Lofi Santai",
    chords: [
      [261.63, 329.63, 392.0, 493.88],   // Cmaj7
      [220.0, 261.63, 329.63, 392.0],    // Am7
      [174.61, 220.0, 261.63, 329.63],   // Fmaj7
      [196.0, 246.94, 293.66, 392.0],    // G6/sus
    ],
    stepMs: 5200,
    chordLen: 6.2,
    filterFreq: 1400,
    gain: 0.05,
  },
  {
    name: "🎹 Fokus Hening",
    chords: [
      [146.83, 174.61, 220.0, 261.63],   // Dm7
      [196.0, 246.94, 293.66, 349.23],   // G7
      [130.81, 164.81, 196.0, 246.94],   // Cmaj7
      [110.0, 138.59, 164.81, 196.0],    // Am7
    ],
    stepMs: 6000,
    chordLen: 7,
    filterFreq: 1100,
    gain: 0.05,
  },
  {
    name: "☀️ Ceria Pop",
    chords: [
      [261.63, 329.63, 392.0],           // C
      [196.0, 246.94, 293.66],           // G
      [220.0, 261.63, 329.63],           // Am
      [174.61, 220.0, 261.63],           // F
    ],
    stepMs: 4400,
    chordLen: 5,
    filterFreq: 1700,
    gain: 0.052,
  },
];

function audio() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1400;
    filter.Q.value = 0.7;
    master.connect(filter).connect(ctx.destination);
  }
  return ctx;
}

function playChord(track, freqs) {
  const t0 = ctx.currentTime;
  const stepDur = track.chordLen;

  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = i % 2 ? "sine" : "triangle";
    osc.frequency.value = f;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.5, t0 + 1.2);
    g.gain.setValueAtTime(0.5, t0 + stepDur - 1.4);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + stepDur + 0.6);

    osc.connect(g).connect(master);
    osc.start(t0);
    osc.stop(t0 + stepDur + 1);
  });

  const bass = ctx.createOscillator();
  bass.type = "sine";
  bass.frequency.value = freqs[0] / 2;
  const bg = ctx.createGain();
  bg.gain.setValueAtTime(0.0001, t0);
  bg.gain.exponentialRampToValueAtTime(0.35, t0 + 0.8);
  bg.gain.exponentialRampToValueAtTime(0.0001, t0 + stepDur + 0.5);
  bass.connect(bg).connect(master);
  bass.start(t0);
  bass.stop(t0 + stepDur + 1);
}

function loop() {
  const track = TRACKS[currentTrack];
  playChord(track, track.chords[step % track.chords.length]);
  step += 1;
  timer = setTimeout(loop, track.stepMs);
}

function fadeTo(value, seconds) {
  const a = audio();
  master.gain.cancelScheduledValues(a.currentTime);
  master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), a.currentTime);
  master.gain.exponentialRampToValueAtTime(Math.max(value, 0.0001), a.currentTime + seconds);
}

export function getBgmState() {
  const raw = localStorage.getItem(KEY);
  if (raw === null || raw === "off") return { enabled: false, track: 0 };
  const idx = Number(raw);
  return { enabled: !Number.isNaN(idx) && TRACKS[idx], track: Number.isNaN(idx) ? 0 : idx };
}

export function startBgm(trackIndex = 0) {
  try {
    const a = audio();
    if (a.state === "suspended") a.resume();
    currentTrack = trackIndex;
    step = 0;
    const track = TRACKS[currentTrack];
    const filter = a.createBiquadFilter();
    // filter dibuat sekali di audio(); cukup set dari sini
    fadeTo(track.gain, 1.2);
    if (!timer) loop();
    localStorage.setItem(KEY, String(currentTrack));
  } catch {
    // abaikan
  }
}

export function stopBgm() {
  try {
    if (!ctx || !master) { localStorage.setItem(KEY, "off"); return; }
    fadeTo(0.0001, 0.6);
    clearTimeout(timer);
    timer = null;
    localStorage.setItem(KEY, "off");
  } catch {
    localStorage.setItem(KEY, "off");
  }
}

export function setTrack(trackIndex) {
  startBgm(trackIndex);
}
