import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../src/pages/Home.jsx";
import { CATEGORIES } from "../src/data/categories.js";

beforeEach(() => localStorage.clear());

describe("Home", () => {
  it("menampilkan headline utama", () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByText(/Raih & Buat Web Kamu Sendiri/)).toBeTruthy();
  });

  it("menampilkan semua 9 kartu kategori", () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    for (const c of CATEGORIES) {
      expect(screen.getByText(c.name)).toBeTruthy();
    }
  });
});
