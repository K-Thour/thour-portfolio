import { Download, RotateCw, Trash2 } from "lucide-react";
import type { Resume } from "../../../types";

interface Props {
  resume: Resume;
  isDark: boolean;
  onDownload: (resume: Resume) => void;
  onDelete: (id: string) => void;
  onRegenerate?: (resume: Resume) => void;
  isRegenerating?: boolean;
}

export function CardActions({
  resume,
  onDownload,
  onDelete,
  onRegenerate,
  isRegenerating = false,
}: Props) {
  return (
    <div className="flex items-center gap-1.5">
      {onRegenerate && (
        <button
          type="button"
          onClick={() => onRegenerate(resume)}
          disabled={isRegenerating}
          title="Regenerate resume with fresh AI tailoring"
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium border border-border/60 hover:bg-accent/60 text-foreground active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <RotateCw
            className={`w-3.5 h-3.5 ${isRegenerating ? "animate-spin" : ""}`}
          />
          <span>{isRegenerating ? "Regenerating..." : "Regenerate"}</span>
        </button>
      )}
      {resume.status === "completed" && resume.generatedFileUrl && (
        <button
          type="button"
          onClick={() => onDownload(resume)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 active:scale-95 hover:bg-emerald-500/25 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </button>
      )}
      <button
        type="button"
        onClick={() => onDelete(resume.id)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-destructive/30 hover:bg-destructive/10 text-destructive active:scale-95 transition-all cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Delete</span>
      </button>
    </div>
  );
}
