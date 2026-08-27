import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResumeDesignPreview } from "./ResumeDesignPreview";
import type { ResumeFormData } from "../../../types";

describe("ResumeDesignPreview component", () => {
  const mockFormData: ResumeFormData = {
    name: "Senior Frontend Engineer",
    targetRole: "Senior Frontend Engineer",
    description: "Expert in building high performance React web apps",
    jobLink: "https://www.linkedin.com/jobs/view/999",
    designType: "ats",
  };

  it("renders live preview container with title, education, and languages sections", () => {
    render(<ResumeDesignPreview formData={mockFormData} isDark={false} />);
    expect(screen.getByTestId("resume-design-preview")).toBeDefined();
    expect(
      screen.getAllByText("Senior Frontend Engineer").length,
    ).toBeGreaterThan(0);
    expect(screen.getByText("Professional Summary")).toBeDefined();
    expect(screen.getByText("Technical Skills")).toBeDefined();
    expect(screen.getByText("Education & Credentials")).toBeDefined();
    expect(screen.getByText("Languages")).toBeDefined();
    expect(screen.getByText(/Punjabi \(Mother tongue\)/i)).toBeDefined();
  });

  it("displays target role and ATS scored badge", () => {
    render(<ResumeDesignPreview formData={mockFormData} isDark={true} />);
    expect(screen.getByText("98% ATS Scored")).toBeDefined();
    expect(screen.getByText(/Role:/i)).toBeDefined();
  });

  it("renders LaTeX template indicator when designType is latex", () => {
    const latexFormData: ResumeFormData = {
      ...mockFormData,
      designType: "latex",
      latexCode:
        "\\documentclass{article}\n\\begin{document}\nHello\n\\end{document}",
    };
    render(<ResumeDesignPreview formData={latexFormData} isDark={true} />);
    expect(screen.getByText(/LaTeX Academic/i)).toBeDefined();
    expect(screen.getByText(/LaTeX Code/i)).toBeDefined();
  });
});
