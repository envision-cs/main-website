import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vite-plus/test";

const navSource = readFileSync(
  resolve(process.cwd(), "app/components/projects/categories-nav.vue"),
  "utf8",
);

describe("project categories nav normalization", () => {
  it("uses the light-mode token system for the select surface", () => {
    expect(navSource).toContain("background: var(--color-white)");
    expect(navSource).toContain("border: 1px solid var(--ui-border)");
    expect(navSource).toContain("color: var(--color-envision-gray-900)");
    expect(navSource).toContain("outline: 2px solid var(--ui-secondary)");
  });

  it("does not use hard-coded dark RGB selector colors", () => {
    expect(navSource).not.toMatch(/rgb\(/);
    expect(navSource).not.toContain("background: var(--color-envision-gray-900)");
    expect(navSource).not.toMatch(/color-mix\(in srgb,.*black/);
    expect(navSource).not.toMatch(/color-mix\(in srgb,.*white/);
  });
});
