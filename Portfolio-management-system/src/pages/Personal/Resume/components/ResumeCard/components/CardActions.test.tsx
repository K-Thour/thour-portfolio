import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CardActions } from "./CardActions";
import type { Resume } from "../../../types";

describe("CardActions component", () => {
  const mockResume: Resume = {
    id: "1",
    name: "React Developer",
    description: "Sample Resume",
    jobLink: "https://example.com/job",
    designType: "ats",
    status: "completed",
    isActive: true,
    createdAt: "2026-06-16T12:00:00Z",
    updatedAt: "2026-06-16T12:00:00Z",
    generatedFileUrl: "https://example.com/resume.pdf",
  };

  it("renders Regenerate, Download, and Delete buttons", () => {
    const onDownload = vi.fn();
    const onDelete = vi.fn();
    const onRegenerate = vi.fn();

    render(
      <CardActions
        resume={mockResume}
        isDark={false}
        onDownload={onDownload}
        onDelete={onDelete}
        onRegenerate={onRegenerate}
      />,
    );

    expect(screen.getByText("Regenerate")).toBeDefined();
    expect(screen.getByText("Download")).toBeDefined();
    expect(screen.getByText("Delete")).toBeDefined();
  });

  it("triggers onRegenerate when Regenerate button is clicked", () => {
    const onDownload = vi.fn();
    const onDelete = vi.fn();
    const onRegenerate = vi.fn();

    render(
      <CardActions
        resume={mockResume}
        isDark={false}
        onDownload={onDownload}
        onDelete={onDelete}
        onRegenerate={onRegenerate}
      />,
    );

    fireEvent.click(screen.getByText("Regenerate"));
    expect(onRegenerate).toHaveBeenCalledWith(mockResume);
  });

  it("shows spinning indicator when isRegenerating is true", () => {
    const onDownload = vi.fn();
    const onDelete = vi.fn();
    const onRegenerate = vi.fn();

    render(
      <CardActions
        resume={mockResume}
        isDark={false}
        onDownload={onDownload}
        onDelete={onDelete}
        onRegenerate={onRegenerate}
        isRegenerating={true}
      />,
    );

    expect(screen.getByText("Regenerating...")).toBeDefined();
  });
});
