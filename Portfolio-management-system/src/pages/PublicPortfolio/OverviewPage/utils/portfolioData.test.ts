import { describe, expect, it } from "vitest";
import { buildPublicPortfolioData } from "./portfolioData";

describe("buildPublicPortfolioData", () => {
  it("maps selected project ids to actual project records", () => {
    const portfolio = {
      _id: "portfolio-1",
      name: "My Portfolio",
      project: ["project-1", "project-2"],
      createdAt: "2024-01-01",
    };

    const projects = [
      {
        _id: "project-1",
        title: "Alpha",
        category: "Web",
        image: { url: "" },
        description: "",
        techStack: [{ name: "React" }],
        workingUrl: "",
        githubUrl: "",
        year: 2024,
      },
      {
        _id: "project-2",
        title: "Beta",
        category: "Mobile",
        image: { url: "" },
        description: "",
        techStack: [{ name: "React Native" }],
        workingUrl: "",
        githubUrl: "",
        year: 2024,
      },
      {
        _id: "project-3",
        title: "Gamma",
        category: "AI",
        image: { url: "" },
        description: "",
        techStack: [],
        workingUrl: "",
        githubUrl: "",
        year: 2024,
      },
    ];

    const result = buildPublicPortfolioData(portfolio, projects);

    expect(result.name).toBe("My Portfolio");
    expect(result.projects).toHaveLength(2);
    expect(result.projects[0].title).toBe("Alpha");
    expect(result.projects[1].title).toBe("Beta");
  });
});
