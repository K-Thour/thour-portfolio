import { useState } from "react";
import { FileCode, FileText, Upload } from "lucide-react";

interface Props {
  latexCode?: string;
  fileName?: string;
  isDark: boolean;
  onCodeChange: (code: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ModalLatexSection({
  latexCode,
  fileName,
  isDark,
  onCodeChange,
  onFileChange,
}: Props) {
  const [mode, setMode] = useState<"code" | "file">("code");
  const btnClass = (isActive: boolean) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
      isActive
        ? isDark
          ? "bg-red-600 text-white"
          : "bg-blue-600 text-white"
        : isDark
          ? "bg-slate-800 text-gray-400 hover:bg-slate-700"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
    }`;
  const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 resize-none font-mono text-sm ${
    isDark
      ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
      : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
  }`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          LaTeX Code
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode("code")}
            className={btnClass(mode === "code")}
          >
            <FileText className="w-3.5 h-3.5" /> Code
          </button>
          <button
            type="button"
            onClick={() => setMode("file")}
            className={btnClass(mode === "file")}
          >
            <Upload className="w-3.5 h-3.5" /> File
          </button>
        </div>
      </div>

      {mode === "code" ? (
        <textarea
          value={latexCode}
          onChange={(e) => onCodeChange(e.target.value)}
          rows={6}
          className={inputClass}
          placeholder={`\\documentclass{article}\n\\begin{document}\n\\section{Resume}\nYour LaTeX code here...\n\\end{document}`}
        />
      ) : (
        <label
          className={`block w-full cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition-all ${
            isDark
              ? "border-red-500/20 hover:border-red-500/50 bg-slate-900/50"
              : "border-blue-300/50 hover:border-blue-500/70 bg-gray-50"
          }`}
        >
          <FileCode
            className={`w-8 h-8 mx-auto mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          />
          <p
            className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            {fileName?.endsWith(".tex")
              ? fileName
              : "Click to upload .tex file"}
          </p>
          <input
            type="file"
            accept=".tex"
            onChange={onFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
