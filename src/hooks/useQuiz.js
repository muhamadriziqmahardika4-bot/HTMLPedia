import { useCallback, useEffect, useState } from "react";

const KEY = "htmlpedia-quiz";

function readStored() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed;
  } catch {
    return {};
  }
}

// Menyimpan stage terjauh yang dicapai per "topik:mode" (angka stage, mulai dari 1).
export function useQuiz() {
  const [best, setBest] = useState(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(best));
    } catch {
      // abaikan
    }
  }, [best]);

  const saveStage = useCallback((topic, mode, stage) => {
    const key = `${topic}:${mode}`;
    setBest((prev) => {
      const current = typeof prev[key] === "number" ? prev[key] : 0;
      if (stage <= current) return prev;
      return { ...prev, [key]: stage };
    });
  }, []);

  return { best, saveStage };
}
