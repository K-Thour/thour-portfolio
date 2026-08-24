import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { JobLinkInput } from "./JobLinkInput";

describe("JobLinkInput component", () => {
  it("renders input field with label and placeholder", () => {
    render(
      <JobLinkInput
        value=""
        isDark={false}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByLabelText(/target job posting link/i)).toBeDefined();
    expect(
      screen.getByPlaceholderText(/linkedin.com\/jobs/i),
    ).toBeDefined();
  });

  it("detects LinkedIn domain and displays badge", () => {
    render(
      <JobLinkInput
        value="https://www.linkedin.com/jobs/view/12345678"
        isDark={false}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText(/linkedin job/i)).toBeDefined();
    expect(screen.getByText(/test/i)).toBeDefined();
  });

  it("detects Greenhouse portal domain and displays badge", () => {
    render(
      <JobLinkInput
        value="https://boards.greenhouse.io/company/jobs/123"
        isDark={true}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText(/greenhouse portal/i)).toBeDefined();
  });

  it("calls onChange when typing", () => {
    const onChangeMock = vi.fn();
    render(
      <JobLinkInput
        value=""
        isDark={false}
        onChange={onChangeMock}
      />,
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "https://indeed.com/job/1" } });
    expect(onChangeMock).toHaveBeenCalledWith("https://indeed.com/job/1");
  });

  it("displays error message when error prop is provided", () => {
    render(
      <JobLinkInput
        value="invalid-url"
        error="Please enter a valid URL"
        isDark={false}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText("Please enter a valid URL")).toBeDefined();
  });
});
