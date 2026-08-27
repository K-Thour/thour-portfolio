import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import type { RootState } from "../store/store";
import {
  addTask,
  updateTaskProgress,
  completeTask,
  failTask,
  removeTask,
  clearCompleted,
  toggleTaskManager,
  type TaskItem,
} from "../store/slices/taskQueue.slice";
import { generateResumeAI } from "../services/api";

export function useTaskQueue() {
  const dispatch = useAppDispatch();
  const taskQueueState = useAppSelector(
    (state: RootState) => state.taskQueue,
  ) || {
    tasks: [],
    isOpen: false,
  };
  const { tasks, isOpen } = taskQueueState;

  const activeTasks = tasks.filter(
    (t) => t.status === "running" || t.status === "pending",
  );
  const activeTasksCount = activeTasks.length;

  const enqueueResumeGeneration = useCallback(
    async (
      formData: {
        name: string;
        description: string;
        jobLink?: string;
        targetRole?: string;
        selectedProjectIds?: string[];
        designType?: string | null;
        latexCode?: string;
        designUrl?: string;
        designFile?: File;
      },
      onSuccess?: (createdResume: any) => void,
    ) => {
      const taskId = `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const newTask: TaskItem = {
        id: taskId,
        title: `Generating "${formData.name}"`,
        description: formData.jobLink || "Custom AI Resume",
        type: "resume_generation",
        status: "running",
        progress: 15,
        stageText: "Parsing job description & role requirements...",
        createdAt: new Date().toISOString(),
      };

      dispatch(addTask(newTask));

      // Timed progressive stage updates while generation runs
      const timer1 = setTimeout(() => {
        dispatch(
          updateTaskProgress({
            id: taskId,
            progress: 40,
            stageText:
              "Selecting relevant projects, experience & skill stack...",
          }),
        );
      }, 1200);

      const timer2 = setTimeout(() => {
        dispatch(
          updateTaskProgress({
            id: taskId,
            progress: 75,
            stageText: "Compiling LaTeX styling & typesetting document...",
          }),
        );
      }, 2500);

      try {
        const response = await generateResumeAI({
          name: formData.name,
          description: formData.description,
          jobLink: formData.jobLink,
          targetRole: formData.targetRole,
          selectedProjectIds: formData.selectedProjectIds,
          designType: formData.designType || "latex",
          latexCode: formData.latexCode,
          designFileUrl: formData.designUrl,
        });

        clearTimeout(timer1);
        clearTimeout(timer2);

        dispatch(
          completeTask({
            id: taskId,
            result: response,
            stageText: "Resume generated and ready to use!",
          }),
        );

        if (onSuccess) {
          onSuccess(response);
        }

        return response;
      } catch (err: any) {
        clearTimeout(timer1);
        clearTimeout(timer2);
        const errorMessage = err?.message || "Failed to generate resume";
        dispatch(
          failTask({
            id: taskId,
            error: errorMessage,
            stageText: `Generation failed: ${errorMessage}`,
          }),
        );
        throw err;
      }
    },
    [dispatch],
  );

  return {
    tasks,
    activeTasks,
    activeTasksCount,
    isOpen,
    addTask: (task: TaskItem) => dispatch(addTask(task)),
    updateTaskProgress: (id: string, progress: number, stageText?: string) =>
      dispatch(updateTaskProgress({ id, progress, stageText })),
    completeTask: (id: string, result?: any, stageText?: string) =>
      dispatch(completeTask({ id, result, stageText })),
    failTask: (id: string, error: string, stageText?: string) =>
      dispatch(failTask({ id, error, stageText })),
    removeTask: (id: string) => dispatch(removeTask(id)),
    clearCompleted: () => dispatch(clearCompleted()),
    toggleTaskManager: (open?: boolean) => dispatch(toggleTaskManager(open)),
    enqueueResumeGeneration,
  };
}
