import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const pageSource = readFileSync(resolve(process.cwd(), "app/pages/index.vue"), "utf8");

describe("home page featured project wiring", () => {
  it("reads separate featured project sections from the homepage endpoint response", () => {
    expect(pageSource).toContain("sectionOne: []");
    expect(pageSource).toContain("sectionTwo: []");
    expect(pageSource).toContain(':cards="featuredProjectCards.sectionOne"');
    expect(pageSource).toContain(':cards="featuredProjectCards.sectionTwo"');
  });
});
