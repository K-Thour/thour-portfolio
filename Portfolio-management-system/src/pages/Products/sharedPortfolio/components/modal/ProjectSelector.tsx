import { CheckCircle } from "lucide-react";
import type { ProjectSelectorProps } from "../../types";

export function ProjectSelector({
  isDark,
  projects,
  selectedIds,
  onToggle,
}: ProjectSelectorProps) {
  const labelClass = (isDark: boolean) =>
    isDark ? "text-white" : "text-gray-900";
  const getCardClass = (selected: boolean) =>
    selected
      ? isDark
        ? "border-red-500 bg-red-500/10"
        : "border-blue-500 bg-blue-50"
      : isDark
        ? "border-slate-700 hover:border-red-500/50 bg-slate-900/50"
        : "border-gray-300 hover:border-blue-400 bg-gray-50";
  const inputClass = isDark
    ? "border-slate-600 text-red-600 focus:ring-red-500"
    : "border-gray-400 text-blue-600 focus:ring-blue-500";
  return (
    <div>
      <label className={`block text-sm font-medium mb-3 ${labelClass(isDark)}`}>
        Select Projects * ({selectedIds.length} selected)
      </label>
      <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
        {projects.map((project) => {
          const isSelected = selectedIds.includes(project.id);
          return (
            <label
              key={project.id}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${getCardClass(isSelected)}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(project.id)}
                className={`w-5 h-5 rounded border-2 ${inputClass}`}
              />
              <div className="flex-1">
                <div className={`font-medium ${labelClass(isDark)}`}>
                  {project.title}
                </div>
                <div
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                >
                  {project.category}
                </div>
              </div>
              {isSelected && (
                <CheckCircle
                  className={`w-5 h-5 ${isDark ? "text-red-400" : "text-blue-600"}`}
                />
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
