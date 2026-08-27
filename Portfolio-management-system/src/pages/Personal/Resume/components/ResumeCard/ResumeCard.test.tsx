import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ResumeCard } from "./index";
import type { Resume } from "../../types";

describe("ResumeCard component", () => {
  const mockResume: Resume = {
    id: "res-1",
    name: "Full Stack Engineer",
    description: "MERN Stack Specialist",
    jobLink: "https://linkedin.com/jobs/123",
    designType: "ats",
    status: "completed",
    isActive: true,
    createdAt: "2026-06-16T12:00:00Z",
    updatedAt: "2026-06-16T12:00:00Z",
    generatedFileUrl: "https://example.com/resume.pdf",
  };

  it("renders card content, active status, and action buttons", () => {
    const onDownload = vi.fn();
    const onDelete = vi.fn();
    const onRegenerate = vi.fn();
    const onToggleActive = vi.fn();

    render(
      <ResumeCard
        resume={mockResume}
        isDark={false}
        onDownload={onDownload}
        onDelete={onDelete}
        onRegenerate={onRegenerate}
        onToggleActive={onToggleActive}
      />,
    );

    expect(screen.getByText("Full Stack Engineer")).toBeDefined();
    expect(screen.getByText("MERN Stack Specialist")).toBeDefined();
    expect(screen.getByText("Active")).toBeDefined();
    expect(screen.getByText("Regenerate")).toBeDefined();
    expect(screen.getByText("Download")).toBeDefined();
    expect(screen.getByText("Delete")).toBeDefined();
  });

  it("triggers onRegenerate and onToggleActive from child buttons", () => {
    const onDownload = vi.fn();
    const onDelete = vi.fn();
    const onRegenerate = vi.fn();
    const onToggleActive = vi.fn();

    render(
      <ResumeCard
        resume={mockResume}
        isDark={false}
        onDownload={onDownload}
        onDelete={onDelete}
        onRegenerate={onRegenerate}
        onToggleActive={onToggleActive}
      />,
    );

    fireEvent.click(screen.getByText("Regenerate"));
    expect(onRegenerate).toHaveBeenCalledWith(mockResume);

    fireEvent.click(screen.getByText("Active"));
    expect(onToggleActive).toHaveBeenCalledWith(mockResume);
  });
});
