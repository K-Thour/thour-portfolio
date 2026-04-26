import { Download, Trash2 } from "lucide-react";
import type { Resume } from "../../../types";

interface Props {
  resume: Resume;
  isDark: boolean;
  onDownload: (resume: Resume) => void;
  onDelete: (id: string) => void;
}

export function CardActions({ resume, isDark, onDownload, onDelete }: Props) {
  return (
    <div className="flex items-center gap-2">
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
