import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useResumeOperations } from "./useResumeOperations";
import {
  fetchResumes,
  deleteResume as deleteResumeApi,
  updateResume as updateResumeApi,
  generateResumeAI,
} from "../../../../services/api";

vi.mock("../../../../services/api", () => ({
  fetchResumes: vi.fn(),
  deleteResume: vi.fn(),
  updateResume: vi.fn(),
  generateResumeAI: vi.fn(),
}));

describe("useResumeOperations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should load resumes on mount", async () => {
    const mockResumesList = [
      {
        _id: "1",
        name: "React Developer",
        description: "React Resume",
        jobUrl: "http://example.com/job",
        designType: "latex",
        latexCode: "LaTeX",
        isActive: true,
        createdAt: "2026-06-16T12:00:00Z",
        updatedAt: "2026-06-16T12:00:00Z",
        resumeUrl: "http://example.com/file.pdf",
      },
    ];

    vi.mocked(fetchResumes).mockResolvedValueOnce(mockResumesList);

    const { result } = renderHook(() => useResumeOperations());

    // Allow the useEffect to load resumes
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(fetchResumes).toHaveBeenCalledTimes(1);
    expect(result.current.resumes).toHaveLength(1);
    expect(result.current.resumes[0]).toEqual({
      id: "1",
      name: "React Developer",
      description: "React Resume",
      jobLink: "http://example.com/job",
      targetRole: undefined,
      selectedProjectIds: [],
      selectedExperienceIds: [],
      designType: "latex",
      latexCode: "LaTeX",
      isActive: true,
      status: "completed",
      createdAt: "2026-06-16T12:00:00Z",
      updatedAt: "2026-06-16T12:00:00Z",
      generatedFileUrl: "http://example.com/file.pdf",
    });
  });

  it("should generate a new resume and add to state", async () => {
    vi.mocked(fetchResumes).mockResolvedValueOnce([]);
    vi.mocked(generateResumeAI).mockResolvedValueOnce({
      _id: "new-id",
      name: "Tailored Resume",
      description: "Desc",
      jobUrl: "http://job.com",
      designType: "latex",
      latexCode: "LaTeX Code",
      createdAt: "2026-06-16T12:30:00Z",
      updatedAt: "2026-06-16T12:30:00Z",
      resumeUrl: "http://resume.com/file.pdf",
    });

    const { result } = renderHook(() => useResumeOperations());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    let newResume;
    await act(async () => {
      newResume = await result.current.createResume({
        name: "Tailored Resume",
        description: "Desc",
        jobLink: "http://job.com",
        targetRole: "Full Stack Engineer",
        selectedProjectIds: ["p1", "p2"],
        designType: "latex",
      });
    });

    expect(generateResumeAI).toHaveBeenCalledWith({
      name: "Tailored Resume",
      description: "Desc",
      jobLink: "http://job.com",
      targetRole: "Full Stack Engineer",
      selectedProjectIds: ["p1", "p2"],
      designType: "latex",
      latexCode: undefined,
      designFileUrl: undefined,
    });
    expect(newResume).toBeDefined();
    expect(result.current.resumes).toHaveLength(1);
    expect(result.current.resumes[0].id).toBe("new-id");
  });

  it("should handle delete resume", async () => {
    const mockResumesList = [
      {
        _id: "1",
        name: "React Developer",
        description: "React Resume",
        isActive: true,
      },
    ];
    vi.mocked(fetchResumes).mockResolvedValueOnce(mockResumesList);
    vi.mocked(deleteResumeApi).mockResolvedValueOnce({} as any);

    const { result } = renderHook(() => useResumeOperations());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.resumes).toHaveLength(1);

    await act(async () => {
      await result.current.deleteResume("1");
    });

    expect(deleteResumeApi).toHaveBeenCalledWith("1");
    expect(result.current.resumes).toHaveLength(0);
  });

  it("should toggle active state and ensure only one resume is active", async () => {
    const mockResumesList = [
      {
        _id: "1",
        name: "Resume 1",
        isActive: true,
      },
      {
        _id: "2",
        name: "Resume 2",
        isActive: false,
      },
    ];
    vi.mocked(fetchResumes).mockResolvedValueOnce(mockResumesList);
    vi.mocked(updateResumeApi).mockResolvedValueOnce({} as any);

    const { result } = renderHook(() => useResumeOperations());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.resumes[0].isActive).toBe(true);
    expect(result.current.resumes[1].isActive).toBe(false);

    // Toggle Resume 2 to active
    await act(async () => {
      await result.current.toggleActiveResume(result.current.resumes[1]);
    });

    expect(updateResumeApi).toHaveBeenCalledWith("2", { isActive: true });
    // Optimistic state: Resume 2 active, Resume 1 inactive
    expect(result.current.resumes[1].isActive).toBe(true);
    expect(result.current.resumes[0].isActive).toBe(false);
  });
});
