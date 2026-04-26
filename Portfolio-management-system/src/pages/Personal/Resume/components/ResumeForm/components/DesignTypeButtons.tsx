import { FileText, Image as ImageIcon, File, FileCode } from "lucide-react";
import type { ResumeDesignType } from "../../../types";

interface Props {
  selectedType: ResumeDesignType;
  isDark: boolean;
  onChange: (type: ResumeDesignType) => void;
}

const options = [
  { type: null as ResumeDesignType, icon: FileText, label: "Default" },
  { type: "image" as ResumeDesignType, icon: ImageIcon, label: "Image" },
  { type: "pdf" as ResumeDesignType, icon: File, label: "PDF" },
  { type: "latex" as ResumeDesignType, icon: FileCode, label: "LaTeX" },
];

export function DesignTypeButtons({ selectedType, isDark, onChange }: Props) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-800"}`}
      >
        Design Type
      </span>
      <div
        className={`flex gap-1.5 p-1 rounded-lg ${isDark ? "bg-slate-800/50" : "bg-gray-100"}`}
      >
        {options.map(({ type, icon: Icon, label }) => {
          const isSelected = selectedType === type;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onChange(type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isSelected
                  ? isDark
                    ? "bg-red-600 text-white shadow-sm"
                    : "bg-white text-blue-600 shadow-sm"
                  : isDark
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
