import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TaskStatus = "pending" | "running" | "completed" | "failed";
export type TaskType = "resume_generation" | "image_upload" | "portfolio_export" | "general";

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  status: TaskStatus;
  progress: number; // 0 to 100
  stageText: string;
  createdAt: string;
  completedAt?: string;
  result?: any;
  error?: string;
}

interface TaskQueueState {
  tasks: TaskItem[];
  isOpen: boolean; // whether task manager panel is expanded
}

const initialState: TaskQueueState = {
  tasks: [],
  isOpen: false,
};

export const taskQueueSlice = createSlice({
  name: "taskQueue",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskItem>) => {
      // Prepend so latest task is at the top
      state.tasks = [action.payload, ...state.tasks.filter((t) => t.id !== action.payload.id)];
      state.isOpen = true; // Auto-open manager when a new task starts
    },
    updateTaskProgress: (
      state,
      action: PayloadAction<{
        id: string;
        progress: number;
        stageText?: string;
        status?: TaskStatus;
      }>,
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.progress = Math.min(100, Math.max(0, action.payload.progress));
        if (action.payload.stageText !== undefined) {
          task.stageText = action.payload.stageText;
        }
        if (action.payload.status) {
          task.status = action.payload.status;
        }
      }
    },
    completeTask: (
      state,
      action: PayloadAction<{
        id: string;
        result?: any;
        stageText?: string;
      }>,
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = "completed";
        task.progress = 100;
        task.stageText = action.payload.stageText || "Completed successfully!";
        task.completedAt = new Date().toISOString();
        if (action.payload.result !== undefined) {
          task.result = action.payload.result;
        }
      }
    },
    failTask: (
      state,
      action: PayloadAction<{
        id: string;
        error: string;
        stageText?: string;
      }>,
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = "failed";
        task.error = action.payload.error;
        task.stageText = action.payload.stageText || "Failed to complete task";
        task.completedAt = new Date().toISOString();
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter((t) => t.status === "running" || t.status === "pending");
    },
    toggleTaskManager: (state, action: PayloadAction<boolean | undefined>) => {
      state.isOpen = action.payload !== undefined ? action.payload : !state.isOpen;
    },
  },
});

export const {
  addTask,
  updateTaskProgress,
  completeTask,
  failTask,
  removeTask,
  clearCompleted,
  toggleTaskManager,
} = taskQueueSlice.actions;

export default taskQueueSlice.reducer;
