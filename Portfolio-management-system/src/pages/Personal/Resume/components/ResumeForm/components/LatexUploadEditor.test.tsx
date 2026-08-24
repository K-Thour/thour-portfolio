import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LatexUploadEditor } from "./LatexUploadEditor";

describe("LatexUploadEditor component", () => {
  it("renders textarea and upload dropzone", () => {
    render(
      <LatexUploadEditor
        latexCode=""
        isDark={false}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByPlaceholderText(/paste or write your latex code/i)).toBeDefined();
    expect(screen.getByText(/upload \.tex or \.txt file/i)).toBeDefined();
  });

  it("calls onChange when typing in textarea", () => {
    const onChangeMock = vi.fn();
    render(
      <LatexUploadEditor
        latexCode=""
        isDark={false}
        onChange={onChangeMock}
      />,
    );
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "\\documentclass{article}" } });
    expect(onChangeMock).toHaveBeenCalledWith("\\documentclass{article}");
  });

  it("resets to default template when clicking reset button", () => {
    const onChangeMock = vi.fn();
    render(
      <LatexUploadEditor
        latexCode="custom code"
        isDark={false}
        onChange={onChangeMock}
      />,
    );
    const resetBtn = screen.getByRole("button", { name: /reset template/i });
    fireEvent.click(resetBtn);
    expect(onChangeMock).toHaveBeenCalled();
  });
});
