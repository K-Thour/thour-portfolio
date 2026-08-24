import { describe, it, expect } from "vitest";
import taskQueueReducer, {
  addTask,
  updateTaskProgress,
  completeTask,
  failTask,
  removeTask,
  clearCompleted,
  toggleTaskManager,
  type TaskItem,
} from "./taskQueue.slice";

describe("taskQueueSlice", () => {
  const initialState = {
    tasks: [],
    isOpen: false,
  };

  const sampleTask: TaskItem = {
    id: "task_1",
    title: "Generating Resume",
    type: "resume_generation",
    status: "running",
    progress: 10,
    stageText: "Starting...",
    createdAt: new Date().toISOString(),
  };

  it("should add a task and open the task manager", () => {
    const state = taskQueueReducer(initialState, addTask(sampleTask));
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0].id).toBe("task_1");
    expect(state.isOpen).toBe(true);
  });

  it("should update task progress and stageText", () => {
    const stateWithTask = {
      tasks: [sampleTask],
      isOpen: true,
    };
    const state = taskQueueReducer(
      stateWithTask,
      updateTaskProgress({ id: "task_1", progress: 65, stageText: "Compiling LaTeX..." }),
    );
    expect(state.tasks[0].progress).toBe(65);
    expect(state.tasks[0].stageText).toBe("Compiling LaTeX...");
  });

  it("should mark task as completed with 100% progress", () => {
    const stateWithTask = {
      tasks: [sampleTask],
      isOpen: true,
    };
    const state = taskQueueReducer(
      stateWithTask,
      completeTask({ id: "task_1", result: { resumeUrl: "http://pdf.com" } }),
    );
    expect(state.tasks[0].status).toBe("completed");
    expect(state.tasks[0].progress).toBe(100);
    expect(state.tasks[0].result).toEqual({ resumeUrl: "http://pdf.com" });
  });

  it("should mark task as failed with error", () => {
    const stateWithTask = {
      tasks: [sampleTask],
      isOpen: true,
    };
    const state = taskQueueReducer(
      stateWithTask,
      failTask({ id: "task_1", error: "Network timeout" }),
    );
    expect(state.tasks[0].status).toBe("failed");
    expect(state.tasks[0].error).toBe("Network timeout");
  });

  it("should remove task and clear completed tasks", () => {
    const stateWithMultiple = {
      tasks: [
        { ...sampleTask, id: "task_1", status: "completed" as const },
        { ...sampleTask, id: "task_2", status: "running" as const },
      ],
      isOpen: true,
    };

    const stateAfterRemove = taskQueueReducer(stateWithMultiple, removeTask("task_1"));
    expect(stateAfterRemove.tasks).toHaveLength(1);
    expect(stateAfterRemove.tasks[0].id).toBe("task_2");

    const stateAfterClear = taskQueueReducer(stateWithMultiple, clearCompleted());
    expect(stateAfterClear.tasks).toHaveLength(1);
    expect(stateAfterClear.tasks[0].id).toBe("task_2");
  });

  it("should toggle task manager panel state", () => {
    const state1 = taskQueueReducer(initialState, toggleTaskManager(true));
    expect(state1.isOpen).toBe(true);

    const state2 = taskQueueReducer(state1, toggleTaskManager());
    expect(state2.isOpen).toBe(false);
  });
});
