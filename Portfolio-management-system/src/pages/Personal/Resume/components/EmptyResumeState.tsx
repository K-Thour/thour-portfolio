import { FileText, Plus } from "lucide-react";
import type { EmptyResumeStateProps } from "../types/props";

export function EmptyResumeState({
  onAddResume,
}: EmptyResumeStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-dashed border-border/60 bg-card/40 backdrop-blur-md text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 text-primary border border-primary/20 shadow-xs">
        <FileText className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground mb-1">
        No Resumes Yet
      </h3>
      <p className="text-center text-sm text-muted-foreground max-w-md mb-6">
        Get started by generating your first targeted resume using the AI Resume Builder with customizable design templates.
      </p>
      <button
        type="button"
        onClick={onAddResume}
        className="flex items-center gap-2 px-6 py-2.5 h-11 rounded-xl font-medium text-sm transition-all bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.97] shadow-sm cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        Generate Your First Resume
      </button>
    </div>
  );
}
