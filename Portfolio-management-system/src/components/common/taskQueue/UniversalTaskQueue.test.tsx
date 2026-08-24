import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../../../store/slices/theme.slice";
import taskQueueReducer, { addTask, type TaskItem } from "../../../store/slices/taskQueue.slice";
import { UniversalTaskQueue } from "./UniversalTaskQueue";

function createMockStore(preloadedState?: any) {
  return configureStore({
    reducer: {
      theme: themeReducer,
      taskQueue: taskQueueReducer,
    } as any,
    preloadedState,
  });
}

describe("UniversalTaskQueue component", () => {
  it("renders nothing when no tasks exist", () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <UniversalTaskQueue />
      </Provider>,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders task manager when open with running task", () => {
    const sampleTask: TaskItem = {
      id: "task_1",
      title: 'Generating "Frontend Resume"',
      type: "resume_generation",
      status: "running",
      progress: 45,
      stageText: "Compiling LaTeX styling...",
      createdAt: new Date().toISOString(),
    };

    const store = createMockStore({
      theme: { theme: "dark" },
      taskQueue: {
        tasks: [sampleTask],
        isOpen: true,
      },
    });

    render(
      <Provider store={store}>
        <UniversalTaskQueue />
      </Provider>,
    );

    expect(screen.getByText("Task Manager")).toBeDefined();
    expect(screen.getByText('Generating "Frontend Resume"')).toBeDefined();
    expect(screen.getByText("45%")).toBeDefined();
    expect(screen.getByText("Compiling LaTeX styling...")).toBeDefined();
  });
});
