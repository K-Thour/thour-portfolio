import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../../../../store/slices/theme.slice";
import taskQueueReducer from "../../../../store/slices/taskQueue.slice";
import { useResumes } from "./useResumes";
import { useResumeOperations } from "./useResumeOperations";

vi.mock("./useResumeOperations", () => ({
  useResumeOperations: vi.fn(),
}));

function createWrapper() {
  const store = configureStore({
    reducer: {
      theme: themeReducer,
      taskQueue: taskQueueReducer,
    } as any,
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(Provider, { store, children });
}

describe("useResumes hook", () => {
  const createResumeMock = vi.fn();
  const addResumeMock = vi.fn();
  const deleteResumeMock = vi.fn();
  const downloadResumeMock = vi.fn();
  const toggleResumeDeletingMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useResumeOperations).mockReturnValue({
      resumes: [],
      loading: false,
      deletingId: null,
      toggleResumeDeleting: toggleResumeDeletingMock,
      setDeletingId: vi.fn(),
      createResume: createResumeMock,
      addResume: addResumeMock,
      refreshResumes: vi.fn(),
      deleteResume: deleteResumeMock,
      downloadResume: downloadResumeMock,
      toggleActiveResume: vi.fn(),
      togglingActiveId: null,
    });
  });

  it("handles opening and closing the modal", () => {
    const { result } = renderHook(() => useResumes(), {
      wrapper: createWrapper(),
    });
    expect(result.current.isModalOpen).toBe(false);

    act(() => {
      result.current.handlers.handleOpenModal();
    });
    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.handlers.handleCloseModal();
    });
    expect(result.current.isModalOpen).toBe(false);
  });

  it("submits passed form data and closes modal immediately", async () => {
    const { result } = renderHook(() => useResumes(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handlers.handleOpenModal();
    });
    expect(result.current.isModalOpen).toBe(true);

    await act(async () => {
      await result.current.handlers.handleSubmit({
        name: "Full Stack Resume",
        description: "Focus on React/Node",
        jobLink: "https://linkedin.com/jobs/1",
        designType: "latex",
      });
    });

    expect(result.current.isModalOpen).toBe(false);
  });
});
