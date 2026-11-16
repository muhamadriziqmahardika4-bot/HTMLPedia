import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import TagDetail from "../src/pages/TagDetail.jsx";

beforeEach(() => localStorage.clear());

describe("TagDetail", () => {
  it("halaman /tag/table menampilkan judul 'Membuat Tabel Data'", () => {
    render(
      <MemoryRouter initialEntries={["/tag/table"]}>
        <Routes>
          <Route path="/tag/:slug" element={<TagDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Membuat Tabel Data")).toBeTruthy();
  });

  it("tombol Tandai Selesai mengubah status menjadi Selesai", () => {
    render(
      <MemoryRouter initialEntries={["/tag/table"]}>
        <Routes>
          <Route path="/tag/:slug" element={<TagDetail />} />
        </Routes>
      </MemoryRouter>
    );
    const btn = screen.getByRole("button", { name: /Tandai Selesai/i });
    fireEvent.click(btn);
    expect(screen.getByRole("button", { name: /Selesai/i })).toBeTruthy();
    expect(JSON.parse(localStorage.getItem("htmlpedia-progress"))).toContain("table");
  });

  it("tag tidak dikenal menampilkan halaman 404", () => {
    render(
      <MemoryRouter initialEntries={["/tag/tag-entah-apa"]}>
        <Routes>
          <Route path="/tag/:slug" element={<TagDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/tidak ditemukan/i)).toBeTruthy();
  });
});
