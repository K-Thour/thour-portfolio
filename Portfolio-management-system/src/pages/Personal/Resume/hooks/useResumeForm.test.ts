import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useResumeForm } from "./useResumeForm";

describe("useResumeForm", () => {
  it("initializes with default values", () => {
    const { result } = renderHook(() => useResumeForm());
    expect(result.current.formData.name).toBe("");
    expect(result.current.formData.designType).toBe("ats");
    expect(result.current.formData.jobLink).toBe("");
  });

  it("validates successfully when jobLink is omitted or empty", () => {
    const { result } = renderHook(() => useResumeForm());

    act(() => {
      result.current.updateField("name", "Software Engineer");
      result.current.updateField(
        "description",
        "Experienced Full Stack Developer",
      );
      result.current.updateField("jobLink", "");
      result.current.updateField("designType", "ats");
    });

    let isValid = false;
    act(() => {
      isValid = result.current.validateForm();
    });

    expect(isValid).toBe(true);
    expect(result.current.errors.jobLink).toBeUndefined();
    expect(result.current.errors.name).toBeUndefined();
    expect(result.current.errors.description).toBeUndefined();
  });

  it("validates successfully when jobLink has a valid URL", () => {
    const { result } = renderHook(() => useResumeForm());

    act(() => {
      result.current.updateField("name", "React Developer");
      result.current.updateField(
        "description",
        "Specialized in React & Next.js",
      );
      result.current.updateField(
        "jobLink",
        "https://www.linkedin.com/jobs/view/12345",
      );
      result.current.updateField("designType", "ats");
    });

    let isValid = false;
    act(() => {
      isValid = result.current.validateForm();
    });

    expect(isValid).toBe(true);
    expect(result.current.errors.jobLink).toBeUndefined();
  });

  it("fails validation when jobLink is provided but is invalid", () => {
    const { result } = renderHook(() => useResumeForm());

    act(() => {
      result.current.updateField("name", "React Developer");
      result.current.updateField(
        "description",
        "Specialized in React & Next.js",
      );
      result.current.updateField("jobLink", "invalid-url");
    });

    let isValid = false;
    act(() => {
      isValid = result.current.validateForm();
    });

    expect(isValid).toBe(false);
    expect(result.current.errors.jobLink).toBe(
      "Please enter a valid URL (e.g., https://...)",
    );
  });

  it("fails validation when name or description are missing", () => {
    const { result } = renderHook(() => useResumeForm());

    act(() => {
      result.current.updateField("name", "");
      result.current.updateField("description", "");
    });

    let isValid = false;
    act(() => {
      isValid = result.current.validateForm();
    });

    expect(isValid).toBe(false);
    expect(result.current.errors.name).toBe("Resume title is required");
    expect(result.current.errors.description).toBe(
      "Summary or focus area is required",
    );
  });

  it("requires latexCode when designType is latex", () => {
    const { result } = renderHook(() => useResumeForm());

    act(() => {
      result.current.updateField("name", "LaTeX Resume");
      result.current.updateField("description", "LaTeX focus");
      result.current.updateField("designType", "latex");
      result.current.updateField("latexCode", "");
    });

    let isValid = false;
    act(() => {
      isValid = result.current.validateForm();
    });

    expect(isValid).toBe(false);
    expect(result.current.errors.latexCode).toBe(
      "LaTeX code is required for LaTeX template",
    );
  });
});
