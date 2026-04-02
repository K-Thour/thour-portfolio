import type { ConnectorLineProps } from "../../../types";

export function ConnectorLine({ isCompleted, isDark }: ConnectorLineProps) {
  return (
    <div
      className={`h-0.5 flex-1 mx-2 mb-12 ${
        isCompleted ? "bg-green-600" : isDark ? "bg-slate-700" : "bg-gray-300"
      }`}
    />
  );
}
