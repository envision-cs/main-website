import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vite-plus/test";

const bannerSource = readFileSync(resolve(process.cwd(), "app/components/banner-b.vue"), "utf8");

describe("banner-b accessibility", () => {
  it("uses the primary banner title as the h1", () => {
    expect(bannerSource).toMatch(/id="banner-title"[\s\S]*tag="h1"/);
  });

  it("renders eyebrow content as non-heading text", () => {
    expect(bannerSource).toMatch(/v-if="hasEyebrow"[\s\S]*tag="p"/);
  });

  it("only describes the banner when body content exists", () => {
    expect(bannerSource).toContain(":aria-describedby=\"hasBody ? 'banner-body' : undefined\"");
    expect(bannerSource).toMatch(/v-if="hasBody"[\s\S]*id="banner-body"/);
  });
});
