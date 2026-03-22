import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vite-plus/test";

describe("vercel nuxt plugin wiring", () => {
  it("does not keep a redundant Vercel Nuxt plugin file", () => {
    expect(existsSync(resolve(process.cwd(), "app/plugins/vercel.ts"))).toBe(false);
  });
});
