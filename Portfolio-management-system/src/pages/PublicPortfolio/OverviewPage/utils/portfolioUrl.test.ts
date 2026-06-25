import { describe, expect, it } from "vitest";
import { buildPortfolioPublicUrl } from "./portfolioUrl";

describe("buildPortfolioPublicUrl", () => {
  it("builds the public overview route for a portfolio id", () => {
    expect(
      buildPortfolioPublicUrl("https://example.com", "portfolio-123"),
    ).toBe("https://example.com/publicPortfolio/overviewPage/portfolio-123");
  });
});
