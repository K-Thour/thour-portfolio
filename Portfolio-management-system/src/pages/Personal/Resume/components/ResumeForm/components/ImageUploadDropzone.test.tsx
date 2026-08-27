import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImageUploadDropzone } from "./ImageUploadDropzone";

describe("ImageUploadDropzone component", () => {
  it("renders upload dropzone when no image is selected", () => {
    render(<ImageUploadDropzone isDark={false} onFileChange={vi.fn()} />);
    expect(
      screen.getByText(/click or drag & drop resume mockup/i),
    ).toBeDefined();
    expect(screen.getByText(/png, jpg, or webp up to 10mb/i)).toBeDefined();
  });

  it("renders preview card when previewUrl is present", () => {
    render(
      <ImageUploadDropzone
        previewUrl="data:image/png;base64,mock"
        file={new File([""], "mockup.png", { type: "image/png" })}
        isDark={true}
        onFileChange={vi.fn()}
      />,
    );
    expect(screen.getByText("mockup.png")).toBeDefined();
    expect(screen.getByText(/ready for ai parsing/i)).toBeDefined();
  });
});
