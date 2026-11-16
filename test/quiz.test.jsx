import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Quiz from "../src/pages/Quiz.jsx";
import { QUIZZES } from "../src/data/quizzes.js";

beforeEach(() => localStorage.clear());

// Klik opsi yang benar untuk setiap soal yang sedang tampil (berdasarkan teks soal).
function answerAllCorrectly(topic, mode) {
  const pool = QUIZZES[topic][mode];
  const containers = [...document.querySelectorAll(".quiz-opt")].map((b) => b.parentElement);
  const seen = new Set();
  for (const parent of containers) {
    const qText = parent.querySelector("div")?.textContent.replace(/^\d+\.\s*/, "").trim();
    if (!qText || seen.has(qText)) continue;
    seen.add(qText);
    const found = pool.find((p) => p.q === qText);
    if (!found) continue;
    const buttons = [...parent.querySelectorAll(".quiz-opt")];
    fireEvent.click(buttons[found.answer]);
  }
}

describe("Alur Kuis stage", () => {
  it("pilih HTML → Latihan → jawab semua benar → LULUS → Kuis 2 tersedia & tersimpan", () => {
    render(<MemoryRouter><Quiz /></MemoryRouter>);
    fireEvent.click(screen.getByText("🌐 HTML"));
    fireEvent.click(screen.getByText("Latihan"));

    expect(JSON.parse(localStorage.getItem("htmlpedia-quiz") || "{}")["HTML:latihan"]).toBeUndefined();

    answerAllCorrectly("HTML", "latihan");

    expect(screen.getByText(/LULUS/)).toBeTruthy();
    expect(screen.getByText(/Lanjut ke Kuis 2/)).toBeTruthy();
    expect(JSON.parse(localStorage.getItem("htmlpedia-quiz"))["HTML:latihan"]).toBe(1);
  });

  it("klik Lanjut ke Kuis 2 memuat stage 2", () => {
    render(<MemoryRouter><Quiz /></MemoryRouter>);
    fireEvent.click(screen.getByText("🌐 HTML"));
    fireEvent.click(screen.getByText("Latihan"));
    answerAllCorrectly("HTML", "latihan");

    fireEvent.click(screen.getByText(/Lanjut ke Kuis 2/));
    expect(screen.getByText(/KUIS 2/)).toBeTruthy();
  });
});
