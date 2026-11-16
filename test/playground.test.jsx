import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Playground from "../src/components/Playground.jsx";

describe("Playground", () => {
  it("iframe hasil render WAJIB punya sandbox tanpa allow-scripts", () => {
    const { container } = render(<Playground initialCode='<p>Halo</p>' />);
    const iframe = container.querySelector("iframe");
    expect(iframe).toBeTruthy();
    expect(iframe.getAttribute("sandbox")).toBe("");
    expect(iframe.getAttribute("sandbox") || "").not.toContain("allow-scripts");
  });

  it("bagian parent tidak mengeksekusi kode dari srcDoc", () => {
    render(<Playground initialCode={'<img src=x onerror="window.__xss=1">'} />);
    expect(window.__xss).toBeUndefined();
  });
});
