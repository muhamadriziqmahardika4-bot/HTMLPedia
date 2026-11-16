import { useCallback, useEffect, useState } from "react";

const KEY = "htmlpedia-progress";

function readStored() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s) => typeof s === "string");
  } catch {
    return [];
  }
}

export function useProgress(total = 0) {
  const [done, setDone] = useState(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(done));
    } catch {
      // penyimpanan penuh/ditolak — abaikan, jangan crash
    }
  }, [done]);

  const toggle = useCallback((slug) => {
    setDone((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const isDone = useCallback((slug) => done.includes(slug), [done]);

  return { done, toggle, isDone, count: done.length, total };
}
