import { useResumeCard } from "../hooks/useResumeCard";
import type { Resume } from "../../../types";

interface Props {
  resume: Resume;
  isDark: boolean;
}

export function CardHeader({ resume, isDark }: Props) {
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
      <div
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
      >
        <StatusIcon
          className={`w-4 h-4 ${resume.status === "generating" ? "animate-spin" : ""}`}
        />
        <span className="capitalize">{resume.status}</span>
      </div>
    </div>
  );
}
