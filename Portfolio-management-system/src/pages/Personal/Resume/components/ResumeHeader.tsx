import { FileText, Plus } from "lucide-react";
import type { ResumeHeaderProps } from "../types/props";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";

export function ResumeHeader({
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-0.5">
            AI Resume Manager
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Generate and manage your targeted professional resumes
          </p>
        </div>
      </div>

      {AiSettingsEnabled && resumeLimit < resumeLimitState && (
        <button
          type="button"
          onClick={onAddResume}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.97] shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Generate Resume
        </button>
      )}
    </div>
  );
}
