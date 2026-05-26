import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vite-plus/test";

const teamDetailSource = readFileSync(
  resolve(process.cwd(), "server/api/team/[id].get.ts"),
  "utf8",
);
const contentTypesSource = readFileSync(
  resolve(process.cwd(), "shared/types/content-types.d.ts"),
  "utf8",
);

describe("team detail API hardening", () => {
  it("does not assume every team member has a populated team relation", () => {
    expect(teamDetailSource).toContain("teamMember.team?.name");
    expect(teamDetailSource).toContain("member.team?.name");
    expect(teamDetailSource).not.toContain("member.team.name");
  });

  it("models Strapi team relations as nullable", () => {
    expect(contentTypesSource).toContain("team: Team | null");
  });
});
