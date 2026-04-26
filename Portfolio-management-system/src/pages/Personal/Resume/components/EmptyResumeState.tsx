import { FileText, Plus } from "lucide-react";
import type { EmptyResumeStateProps } from "../types/props";

export function EmptyResumeState({
  isDark,
  onAddResume,
}: EmptyResumeStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 rounded-2xl border-2 border-dashed ${isDark ? "border-red-500/20 bg-slate-900/30" : "border-blue-300/50 bg-gray-50"}`}
    >
      <div
        className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${isDark ? "bg-slate-800 border border-red-500/20" : "bg-white border border-blue-200"}`}
      >
        <FileText
          className={`w-10 h-10 ${isDark ? "text-red-400" : "text-blue-500"}`}
        />
      </div>
      <h3
        className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        No Resumes Yet
      </h3>
      <p
        className={`text-center max-w-md mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        Get started by generating your first professional resume. Upload a
        design or provide LaTeX code for customization.
      </p>
      <button
        type="button"
        onClick={onAddResume}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${isDark ? "bg-red-600 hover:bg-red-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
      >
        <Plus className="w-5 h-5" />
        Generate Your First Resume
      </button>
    </div>
  );
}
