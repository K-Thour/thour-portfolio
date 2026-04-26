import { FileText, Plus } from "lucide-react";
import type { ResumeHeaderProps } from "../types/props";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";

export function ResumeHeader({
  isDark,
  onAddResume,
  resumeLimit,
}: ResumeHeaderProps) {
  const AiSettingsEnabled = useSelector(
    (state: RootState) => state.resume.AiSettingsEnabled,
  );
  const resumeLimitState = useSelector(
    (state: RootState) => state.resume.resumeLimit,
  );
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isDark
              ? "bg-linear-to-br from-red-600 to-yellow-500"
              : "bg-linear-to-br from-blue-600 to-blue-400"
          }`}
        >
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Resume Manager
          </h1>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Generate and manage your professional resumes
          </p>
        </div>
      </div>

      {AiSettingsEnabled && resumeLimit < resumeLimitState && (
        <button
          type="button"
          onClick={onAddResume}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
            isDark
              ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
              : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
          }`}
        >
          <Plus className="w-5 h-5" />
          Generate Resume
        </button>
      )}
    </div>
  );
}
