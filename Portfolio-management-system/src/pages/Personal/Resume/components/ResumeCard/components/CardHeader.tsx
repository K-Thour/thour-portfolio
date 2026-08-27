import { useResumeCard } from "../hooks/useResumeCard";
import type { Resume } from "../../../types";

interface Props {
  resume: Resume;
  isDark: boolean;
  onToggleActive?: (resume: Resume) => void;
}

export function CardHeader({ resume, isDark, onToggleActive }: Props) {
  const { DesignIcon, StatusIcon, statusColor, formatDate } = useResumeCard(
    resume,
    isDark,
  );
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? "bg-slate-800" : "bg-gray-100"}`}
        >
          <DesignIcon className="w-5 h-5" />
        </div>
        <div>
          <h3
            className={`font-semibold text-lg ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {resume.name}
          </h3>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Created {formatDate(resume.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {onToggleActive && (
          <button
            type="button"
            onClick={() => onToggleActive(resume)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all shadow-sm ${
              resume.isActive
                ? isDark
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
                  : "bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200"
                : isDark
                  ? "bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200 hover:border-slate-600"
                  : "bg-gray-100 text-gray-500 border border-gray-200 hover:text-gray-700 hover:border-gray-300"
            }`}
            title={
              resume.isActive
                ? "Active resume (click to deactivate)"
                : "Click to set as primary active resume"
            }
          >
            <span
              className={`w-2 h-2 rounded-full transition-all ${
                resume.isActive
                  ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                  : "bg-gray-400"
              }`}
            />
            {resume.isActive ? "Active" : "Inactive"}
          </button>
        )}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          <StatusIcon
            className={`w-4 h-4 ${resume.status === "generating" ? "animate-spin" : ""}`}
          />
          <span className="capitalize">{resume.status}</span>
        </div>
      </div>
    </div>
  );
}
