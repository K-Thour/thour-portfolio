import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ExperienceSelector } from "./ExperienceSelector";
import { fetchExperiences } from "../../../../../../services/api";

vi.mock("../../../../../../services/api", () => ({
  fetchExperiences: vi.fn(),
}));

describe("ExperienceSelector component", () => {
  const mockExperiences = [
    {
      _id: "e1",
      position: "Associate Full Stack Web Developer",
      companyName: "Devronins Private Limited",
      stillWorking: true,
      dateOfJoining: "2025-02-01",
      description: "Architected full stack features",
    },
    {
      _id: "e2",
      position: "Frontend Engineer Intern",
      companyName: "Tech Solutions",
      stillWorking: false,
      dateOfJoining: "2024-01-01",
      dateOfLeaving: "2024-12-31",
      description: "Built UI components",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetchExperiences).mockResolvedValue(mockExperiences as any);
  });

  it("renders experience selector and loads experiences", async () => {
    const onExperiencesChange = vi.fn();

    render(
      <ExperienceSelector
        selectedExperienceIds={[]}
        isDark={false}
        onExperiencesChange={onExperiencesChange}
      />,
    );

    expect(screen.getByText(/Work Experience Selection/i)).toBeDefined();
    expect(screen.getByText(/Auto \(2 Latest Experiences\)/i)).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText("Associate Full Stack Web Developer")).toBeDefined();
      expect(screen.getByText("Frontend Engineer Intern")).toBeDefined();
    });
  });

  it("toggles experience selection when clicked", async () => {
    const onExperiencesChange = vi.fn();

    render(
      <ExperienceSelector
        selectedExperienceIds={["e1"]}
        isDark={true}
        onExperiencesChange={onExperiencesChange}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("Associate Full Stack Web Developer")).toBeDefined();
    });

    fireEvent.click(screen.getByText("Associate Full Stack Web Developer"));
    expect(onExperiencesChange).toHaveBeenCalledWith([]);
  });
});
