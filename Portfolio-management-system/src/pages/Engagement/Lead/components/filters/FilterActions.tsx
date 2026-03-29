import { X } from "lucide-react";

interface FilterActionsProps {
  isDark: boolean;
  hasActiveFilters: boolean;
  onClear: () => void;
}

export function FilterActions({
  isDark,
  hasActiveFilters,
  onClear,
}: FilterActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            isDark
              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          <X className="w-4 h-4" />
          Clear
        </button>
      )}
    </div>
  );
}
