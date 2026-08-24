import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProjectRoleSelector } from "./ProjectRoleSelector";
import { fetchProjects } from "../../../../../../services/api";

vi.mock("../../../../../../services/api", () => ({
  fetchProjects: vi.fn(),
}));

describe("ProjectRoleSelector component", () => {
  const mockProjects = [
    {
      _id: "p1",
      title: "React Portfolio Design System",
      description: "Interactive portfolio with Tailwind and Redux",
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      role: "Frontend Engineer",
    },
    {
      _id: "p2",
      title: "Node.js Microservices API",
      description: "Scalable backend microservices with MongoDB and Docker",
      techStack: ["Node.js", "Express", "MongoDB"],
      role: "Backend Engineer",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetchProjects).mockResolvedValue(mockProjects as any);
  });

  it("renders role presets and triggers onRoleChange when clicking a preset", () => {
    const onRoleChange = vi.fn();
    const onProjectsChange = vi.fn();

    render(
      <ProjectRoleSelector
        targetRole="Full Stack Engineer"
        jobDescription="Looking for React developer"
        selectedProjectIds={[]}
        isDark={false}
        onRoleChange={onRoleChange}
        onProjectsChange={onProjectsChange}
      />,
    );

    expect(screen.getByText("Full Stack Engineer")).toBeDefined();
    expect(screen.getByText("Frontend / React Developer")).toBeDefined();

    fireEvent.click(screen.getByText("Frontend / React Developer"));
    expect(onRoleChange).toHaveBeenCalledWith("Frontend / React Developer");
  });

  it("fetches and renders project list with match scores", async () => {
    const onRoleChange = vi.fn();
    const onProjectsChange = vi.fn();

    render(
      <ProjectRoleSelector
        targetRole="Frontend / React Developer"
        jobDescription="React TypeScript developer"
        selectedProjectIds={["p1"]}
        isDark={true}
        onRoleChange={onRoleChange}
        onProjectsChange={onProjectsChange}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("React Portfolio Design System")).toBeDefined();
      expect(screen.getByText("Node.js Microservices API")).toBeDefined();
    });

    // Clicking a project toggles selection
    fireEvent.click(screen.getByText("Node.js Microservices API"));
    expect(onProjectsChange).toHaveBeenCalledWith(["p1", "p2"]);
  });
});
