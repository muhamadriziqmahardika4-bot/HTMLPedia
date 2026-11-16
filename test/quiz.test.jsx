import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Quiz from "../src/pages/Quiz.jsx";
import { useQuiz } from "../src/hooks/useQuiz.js";

beforeEach(() => localStorage.clear());

describe("Alur Kuis", () => {
  it("pilih HTML → Latihan → materi → jawab 3 soal → skor akhir tampil", () => {
    render(<MemoryRouter><Quiz /></MemoryRouter>);

    // Langkah 1: topik
    fireEvent.click(screen.getByText("🌐 HTML"));
    // Langkah 2: mode
    fireEvent.click(screen.getByText("Latihan"));
    // Langkah 3: materi
    fireEvent.click(screen.getByText("<table>"));
    // Langkah 4: jawab benar semua (jawaban: 1,1,2)
    const opsi = ["<table>", "<h1>", "src"];
    fireEvent.click(screen.getByText("<table>"));
    fireEvent.click(screen.getByText("<h1>"));
    fireEvent.click(screen.getByText("src"));
    expect(screen.getByText(/LULUS/)).toBeTruthy();
    expect(JSON.parse(localStorage.getItem("htmlpedia-quiz"))["HTML:latihan"]).toBe(3);
  });
});
