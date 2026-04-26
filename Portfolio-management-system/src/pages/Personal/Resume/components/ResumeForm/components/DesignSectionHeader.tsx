import { Palette, Plus } from "lucide-react";

interface Props {
  isDark: boolean;
  onAddClick: () => void;
}

export function DesignSectionHeader({ isDark, onAddClick }: Props) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Palette
          className={`w-4 h-4 ${isDark ? "text-red-400" : "text-blue-500"}`}
        />
        <label
          className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Resume Design (Optional)
        </label>
      </div>
      <button
        type="button"
        onClick={onAddClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          isDark
            ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
        }`}
      >
        <Plus className="w-3.5 h-3.5" />
        Add Design
      </button>
    </div>
  );
}
