import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Playground from "../src/components/Playground.jsx";

describe("Playground", () => {
  it("iframe hasil render WAJIB punya sandbox dengan allow-scripts tapi TANPA allow-same-origin", () => {
    const { container } = render(<Playground initialCode='<p>Halo</p>' />);
    const iframe = container.querySelector("iframe");
    expect(iframe).toBeTruthy();
    const sandbox = iframe.getAttribute("sandbox") || "";
    expect(sandbox).toContain("allow-scripts");
    expect(sandbox).not.toContain("allow-same-origin");
  });

  it("bagian parent tidak mengeksekusi kode dari srcDoc", () => {
    render(<Playground initialCode={'<img src=x onerror="window.__xss=1">'} />);
    expect(window.__xss).toBeUndefined();
  });
});
