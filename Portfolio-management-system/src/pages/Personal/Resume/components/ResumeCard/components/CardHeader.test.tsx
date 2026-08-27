import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CardHeader } from "./CardHeader";
import type { Resume } from "../../../types";

describe("CardHeader component", () => {
  const mockActiveResume: Resume = {
    id: "1",
    name: "Senior Frontend Engineer",
    description: "Sample description",
    jobLink: "https://example.com/job",
    designType: "ats",
    status: "completed",
    isActive: true,
    createdAt: "2026-06-16T12:00:00Z",
    updatedAt: "2026-06-16T12:00:00Z",
  };

  const mockInactiveResume: Resume = {
    ...mockActiveResume,
    id: "2",
    name: "Backend Engineer",
    isActive: false,
  };

  it("renders active toggle switch with Active state", () => {
    const onToggleActive = vi.fn();

    render(
      <CardHeader
        resume={mockActiveResume}
        isDark={false}
        onToggleActive={onToggleActive}
      />,
    );

    expect(screen.getByText("Senior Frontend Engineer")).toBeDefined();
    expect(screen.getByText("Active")).toBeDefined();
  });

  it("renders Inactive state and triggers onToggleActive when clicked", () => {
    const onToggleActive = vi.fn();

    render(
      <CardHeader
        resume={mockInactiveResume}
        isDark={false}
        onToggleActive={onToggleActive}
      />,
    );

    const toggleButton = screen.getByText("Inactive");
    expect(toggleButton).toBeDefined();

    fireEvent.click(toggleButton);
    expect(onToggleActive).toHaveBeenCalledWith(mockInactiveResume);
  });
});
