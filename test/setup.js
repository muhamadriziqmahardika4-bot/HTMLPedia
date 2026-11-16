import { vi } from "vitest";

// jsdom tidak bisa membuat canvas 2d — mock confetti agar tidak error.
vi.mock("canvas-confetti", () => ({ default: () => {} }));
