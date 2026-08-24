import { useState } from "react";
import { useTaskQueue } from "../../../hooks/useTaskQueue";
import { useAppSelector } from "../../../hooks/useRedux";
import type { RootState } from "../../../store/store";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  Trash2,
  ExternalLink,
  Layers,
} from "lucide-react";

export function UniversalTaskQueue() {
  const { theme } = useAppSelector((store: RootState) => store.theme);
  const isDark = theme === "dark";
  const {
    tasks,
    activeTasksCount,
    isOpen,
    toggleTaskManager,
    removeTask,
    clearCompleted,
  } = useTaskQueue();

  const [minimized, setMinimized] = useState(false);

  // If there are no tasks ever created, do not clutter screen
  if (tasks.length === 0) {
    return null;
  }

  const completedCount = tasks.filter(
    (t) => t.status === "completed" || t.status === "failed",
  ).length;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Collapsed Pill Trigger (when closed) */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => toggleTaskManager(true)}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-xl border backdrop-blur-md transition-all ${
            isDark
              ? "bg-slate-900/90 border-slate-700 text-slate-100 hover:border-blue-500/50 shadow-blue-950/40"
              : "bg-white/95 border-slate-200 text-slate-800 hover:border-blue-400 shadow-blue-100/80"
          }`}
        >
          <div className="relative flex items-center justify-center">
            {activeTasksCount > 0 ? (
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
            ) : (
              <Layers className="w-4 h-4 text-emerald-500" />
            )}
            {activeTasksCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            )}
          </div>

          <span className="text-xs font-semibold">
            {activeTasksCount > 0
              ? `${activeTasksCount} Task${activeTasksCount > 1 ? "s" : ""} Running`
              : `${tasks.length} Background Task${tasks.length > 1 ? "s" : ""}`}
          </span>

          <span
            className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
              activeTasksCount > 0
                ? "bg-blue-500/20 text-blue-400"
                : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {activeTasksCount > 0
              ? `${tasks[0]?.progress || 0}%`
              : "Done"}
          </span>
        </motion.button>
      )}

      {/* Expanded Floating Task Manager Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`w-[360px] sm:w-[400px] rounded-2xl shadow-2xl border backdrop-blur-xl overflow-hidden flex flex-col ${
              isDark
                ? "bg-slate-900/95 border-slate-700/80 shadow-black/60"
                : "bg-white/95 border-slate-200/90 shadow-slate-300/60"
            }`}
          >
            {/* Header */}
            <div
              className={`p-3.5 px-4 flex items-center justify-between border-b ${
                isDark
                  ? "bg-slate-950/60 border-slate-800"
                  : "bg-slate-50/80 border-slate-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    activeTasksCount > 0
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-emerald-500/10 text-emerald-500"
                  }`}
                >
                  {activeTasksCount > 0 ? (
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                </div>
                <div>
                  <h4
                    className={`text-xs font-bold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Task Manager
                  </h4>
                  <p
                    className={`text-[10px] ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {activeTasksCount > 0
                      ? `${activeTasksCount} active background job${activeTasksCount > 1 ? "s" : ""}`
                      : "All background tasks completed"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {completedCount > 0 && (
                  <button
                    type="button"
                    onClick={clearCompleted}
                    title="Clear finished tasks"
                    className={`p-1.5 rounded-lg text-xs transition-colors ${
                      isDark
                        ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setMinimized(!minimized)}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    isDark
                      ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {minimized ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => toggleTaskManager(false)}
                  className={`p-1.5 rounded-lg text-xs transition-colors ${
                    isDark
                      ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Task List Body */}
            {!minimized && (
              <div className="max-h-[360px] overflow-y-auto p-3 space-y-2.5">
                {tasks.map((task) => {
                  const isRunning = task.status === "running" || task.status === "pending";
                  const isSuccess = task.status === "completed";
                  const isError = task.status === "failed";

                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-xl border transition-all ${
                        isDark
                          ? "bg-slate-800/50 border-slate-700/60"
                          : "bg-slate-50 border-slate-200/70 shadow-xs"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          {isRunning && (
                            <Loader2 className="w-4 h-4 text-blue-500 animate-spin shrink-0" />
                          )}
                          {isSuccess && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                          {isError && (
                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                          )}
                          <div className="min-w-0">
                            <p
                              className={`text-xs font-semibold truncate ${
                                isDark ? "text-slate-200" : "text-slate-800"
                              }`}
                            >
                              {task.title}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                              isRunning
                                ? "bg-blue-500/20 text-blue-400"
                                : isSuccess
                                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                  : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {task.progress}%
                          </span>
                          <button
                            type="button"
                            onClick={() => removeTask(task.id)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Animated Progress Bar */}
                      <div
                        className={`w-full h-1.5 rounded-full overflow-hidden mb-2 ${
                          isDark ? "bg-slate-700/60" : "bg-slate-200"
                        }`}
                      >
                        <motion.div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isError
                              ? "bg-red-500"
                              : isSuccess
                                ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                                : "bg-gradient-to-r from-blue-600 to-indigo-400"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${task.progress}%` }}
                        />
                      </div>

                      {/* Stage description & action link */}
                      <div className="flex items-center justify-between text-[10.5px]">
                        <span
                          className={`truncate mr-2 ${
                            isError
                              ? "text-red-400"
                              : isDark
                                ? "text-slate-400"
                                : "text-slate-500"
                          }`}
                        >
                          {task.stageText}
                        </span>

                        {isSuccess && task.result?.resumeUrl && (
                          <a
                            href={task.result.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-500 hover:underline shrink-0 font-medium"
                          >
                            Open <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UniversalTaskQueue;
