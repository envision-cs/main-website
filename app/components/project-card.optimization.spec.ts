import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vite-plus/test";

const cardSource = readFileSync(resolve(process.cwd(), "app/components/project-card.vue"), "utf8");

describe("project-card rendering optimization", () => {
  it("only applies will-change while image scale interaction is active", () => {
    const imageRule = cardSource.match(/\.reveal-card__image\s*\{[\s\S]*?\n\}/)?.[0] ?? "";
    const interactionRule =
      cardSource.match(
        /\.reveal-card__wrapper:hover \.reveal-card__image,[\s\S]*?\.reveal-card--overlay:focus-within \.reveal-card__image\s*\{[\s\S]*?\n\}/,
      )?.[0] ?? "";

    expect(imageRule).not.toContain("will-change");
    expect(interactionRule).toContain("will-change: transform");
  });
});
