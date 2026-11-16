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

export function useQuiz() {
  const [best, setBest] = useState(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(best));
    } catch {
      // abaikan
    }
  }, [best]);

  const saveResult = useCallback((topic, mode, score) => {
    const key = `${topic}:${mode}`;
    setBest((prev) => {
      const current = typeof prev[key] === "number" ? prev[key] : 0;
      if (score <= current) return prev;
      return { ...prev, [key]: score };
    });
  }, []);

  return { best, saveResult };
}
