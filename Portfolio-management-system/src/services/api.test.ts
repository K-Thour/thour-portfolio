import { describe, expect, it } from "vitest";
import { normalizePortfolioPayload } from "./api";

describe("normalizePortfolioPayload", () => {
  it("maps the frontend projects field to the backend project field", () => {
    const payload = normalizePortfolioPayload({
      name: "My Portfolio",
      projects: ["project-1", "project-2"],
    });

    expect(payload).toEqual({
      name: "My Portfolio",
      project: ["project-1", "project-2"],
    });
  });

  it("supports projectIds submissions as well", () => {
    const payload = normalizePortfolioPayload({
      name: "My Portfolio",
      projectIds: ["project-3"],
    });

    expect(payload).toEqual({
      name: "My Portfolio",
      project: ["project-3"],
    });
  });
});
