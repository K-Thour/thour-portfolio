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
  isDark,
  onDownload,
  onDelete,
  onRegenerate,
  isRegenerating = false,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      {onRegenerate && (
        <button
          type="button"
          onClick={() => onRegenerate(resume)}
          disabled={isRegenerating}
          title="Regenerate resume with fresh AI tailoring"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            isRegenerating
              ? "opacity-60 cursor-not-allowed"
              : isDark
                ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          <RotateCw
            className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`}
          />
          {isRegenerating ? "Regenerating..." : "Regenerate"}
        </button>
      )}
      {resume.status === "completed" && resume.generatedFileUrl && (
        <button
          type="button"
          onClick={() => onDownload(resume)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isDark ? "bg-green-600/20 text-green-400 hover:bg-green-600/30" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
        >
          <Download className="w-4 h-4" /> Download
        </button>
      )}
      <button
        type="button"
        onClick={() => onDelete(resume.id)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isDark ? "bg-red-600/20 text-red-400 hover:bg-red-600/30" : "bg-red-100 text-red-700 hover:bg-red-200"}`}
      >
        <Trash2 className="w-4 h-4" /> Delete
      </button>
    </div>
  );
}
