import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CodeBlock from "../src/components/CodeBlock.jsx";

describe("CodeBlock", () => {
  it("menampilkan kode sebagai teks literal, tidak mengeksekusi HTML", () => {
    const kode = '<img src=x onerror="window.__xss=1">';
    render(<CodeBlock code={kode} />);
    expect(window.__xss).toBeUndefined();
    expect(screen.getByText(/onerror/)).toBeTruthy();
  });

  it("menampilkan tag yang kompleks dengan benar", () => {
    render(<CodeBlock code={'<table>\n  <tr><td>Halo</td></tr>\n</table>'} />);
    expect(screen.getByText(/<table>/)).toBeTruthy();
  });
});
