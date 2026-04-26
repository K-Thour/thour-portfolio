import { ExternalLink } from "lucide-react";
import { useResumeCard } from "./hooks/useResumeCard";
import { CardHeader } from "./components/CardHeader";
import { CardActions } from "./components/CardActions";
import type { ResumeCardProps } from "../../types/props";

export function ResumeCard({
  resume,
  isDark,
  onDownload,
  onDelete,
}: ResumeCardProps) {
  const { DesignIcon } = useResumeCard(resume, isDark);
  return (
    <div
      className={`rounded-2xl border p-6 transition-all hover:shadow-lg ${isDark ? "bg-slate-900/50 border-red-500/20 hover:border-red-500/40" : "bg-white border-gray-200 hover:border-blue-300"}`}
    >
      <CardHeader resume={resume} isDark={isDark} />
      <p
        className={`text-sm mb-4 line-clamp-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}
      >
        {resume.description}
      </p>
      <div className="flex items-center gap-2 mb-4">
        <ExternalLink
          className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
        />
        <a
          href={resume.jobLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm truncate hover:underline ${isDark ? "text-red-400" : "text-blue-600"}`}
        >
          {resume.jobLink}
        </a>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-dashed">
        <div
          className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
        >
          {resume.designType ? (
            <span className="flex items-center gap-1.5">
              <DesignIcon className="w-3.5 h-3.5" /> Design:{" "}
              {resume.designType.toUpperCase()}
            </span>
          ) : (
            "Default Template"
          )}
        </div>
        <CardActions
          resume={resume}
          isDark={isDark}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default ResumeCard;
