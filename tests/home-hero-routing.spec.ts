import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vite-plus/test";

const heroBannerSource = readFileSync(
  resolve(process.cwd(), "app/components/home/hero-banner.vue"),
  "utf8",
);

describe("home hero data and asset routing", () => {
  it("loads hero content from the local Nitro API instead of calling Strapi directly in the client bundle", () => {
    expect(heroBannerSource).toContain("$fetch('/api/home-hero')");
    expect(heroBannerSource).not.toContain("find('home-hero'");
  });

  it("defines a local API route for the homepage hero payload", () => {
    expect(existsSync(resolve(process.cwd(), "server/api/home-hero/index.get.ts"))).toBe(true);
  });

  it("ships a service worker asset so /sw.js is not routed through Vue Router", () => {
    expect(existsSync(resolve(process.cwd(), "public/sw.js"))).toBe(true);
  });
});
