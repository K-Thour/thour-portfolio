import { X } from "lucide-react";
import type { ProjectMultiSelectProps } from "../../types";
import Multiselect from "../../../../../components/ui/multiSelect/MultiSelect";

export function ProjectMultiSelect({
  isDark,
  projects,
  selectedIds,
  onToggle,
}: ProjectMultiSelectProps) {
  const selectedProjects = projects.filter((p) => selectedIds.includes(p.id));
  const unselectedProjects = projects.filter(
    (p) => !selectedIds.includes(p.id),
  );
  const labelClass = isDark ? "text-white" : "text-gray-900";
  const chipClass = isDark
    ? "bg-red-600/30 text-white border-red-500/50"
    : "bg-blue-100 text-gray-900 border-blue-300";
  const btnClass = isDark
    ? "bg-slate-800 text-white hover:bg-slate-700"
    : "bg-white text-gray-900 hover:bg-gray-50";
  const menuBg = isDark ? "bg-slate-700" : "bg-white";
  const itemBg = isDark ? "hover:bg-slate-600" : "hover:bg-gray-100";
  const scrollClass = isDark
    ? "scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
    : "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100";

  return (
    <div className="space-y-3">
      <label className={`block text-sm font-medium ${labelClass}`}>
        Select Projects * ({selectedIds.length} selected)
      </label>
      {selectedProjects.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedProjects.map((project) => (
            <span
              key={project.id}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${chipClass}`}
            >
              {project.title}
              <button
                type="button"
                onClick={() => onToggle(project.id)}
                className="p-0.5 rounded-full hover:bg-black/20 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className={btnClass}>
        <Multiselect
          Heading={`Choose Projects (${unselectedProjects.length} available)`}
          className={
            isDark
              ? "[&_button]:bg-slate-700! [&_button]:text-white! [&_button]:border-slate-600! z-60 [&>div]:bg-slate-700 [&>div]:p-0 [&>div]:border-0"
              : "[&_button]:bg-white! [&_button]:text-gray-900! [&_button]:border-gray-300! z-60 [&>div]:bg-white [&>div]:p-0 [&>div]:border-0"
          }
        >
          <div className={`${menuBg} rounded-lg overflow-hidden`}>
            {unselectedProjects.length > 0 && (
              <div className={`max-h-48 overflow-y-auto ${scrollClass}`}>
                {unselectedProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => {
                      onToggle(project.id);
                      document.dispatchEvent(
                        new MouseEvent("mousedown", { bubbles: true }),
                      );
                    }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors border-b ${isDark ? "border-slate-600" : "border-gray-100"} last:border-b-0 ${isDark ? "text-gray-200" : "text-gray-700"} ${itemBg}`}
                  >
                    <div className="font-medium">{project.title}</div>
                    <div
                      className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {project.category}
                    </div>
                  </button>
                ))}
              </div>
            )}
            {unselectedProjects.length === 0 && (
              <div
                className={`px-4 py-3 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                No projects available
              </div>
            )}
          </div>
        </Multiselect>
      </div>
    </div>
  );
}
