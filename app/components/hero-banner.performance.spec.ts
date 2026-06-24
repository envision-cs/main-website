import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vite-plus/test";

const heroSource = readFileSync(resolve(process.cwd(), "app/components/hero-banner.vue"), "utf8");
const globalCss = readFileSync(resolve(process.cwd(), "app/assets/css/main.css"), "utf8");

describe("homepage hero LCP", () => {
  it("keeps the LCP heading immediately paintable", () => {
    const titleRule = heroSource.match(/\.hero-title\s*\{[\s\S]*?\n\}/)?.[0] ?? "";

    expect(titleRule).toContain("'Proxima Nova Hero'");
    expect(titleRule).not.toContain("animation:");
    expect(globalCss).toContain("font-family: 'Proxima Nova Hero'");
    expect(globalCss).toContain("font-display: optional");
  });
});
