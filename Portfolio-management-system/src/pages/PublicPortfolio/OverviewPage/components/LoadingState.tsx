import type { LoadingStateProps } from "../types";

export function LoadingState({ isDark }: LoadingStateProps) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark
          ? "bg-linear-to-br from-slate-950 to-slate-900"
          : "bg-linear-to-br from-slate-50 to-blue-50"
      }`}
    >
      <div
        className={`text-xl font-bold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Loading...
      </div>
    </div>
  );
}
