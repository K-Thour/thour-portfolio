import { File, FileCode } from "lucide-react";
import type { DesignModalType } from "../types";

interface Props {
  selectedType: DesignModalType;
  isDark: boolean;
  onChange: (type: DesignModalType) => void;
}

export function ModalTypeSelector({ selectedType, isDark, onChange }: Props) {
  const btnClass = (isSelected: boolean) =>
    `flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 font-medium transition-all ${
      isSelected
        ? isDark
          ? "border-red-500 bg-red-500/20 text-white"
          : "border-blue-500 bg-blue-100 text-gray-900"
        : isDark
          ? "border-slate-700 text-gray-400"
          : "border-gray-300 text-gray-600"
    }`;

  return (
    <div>
      <label
        className={`block text-sm font-medium mb-3 ${isDark ? "text-gray-300" : "text-gray-800"}`}
      >
        Design Type *
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange("file")}
          className={btnClass(selectedType === "file")}
        >
          <File className="w-6 h-6" />
          <span className="text-sm">File Upload</span>
        </button>
        <button
          type="button"
          onClick={() => onChange("latex")}
          className={btnClass(selectedType === "latex")}
        >
          <FileCode className="w-6 h-6" />
          <span className="text-sm">LaTeX Code</span>
        </button>
      </div>
    </div>
  );
}
