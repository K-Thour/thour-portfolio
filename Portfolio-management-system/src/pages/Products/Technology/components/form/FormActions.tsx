import { useAppSelector } from "../../../../../hooks/useRedux";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
  isEditing?: boolean;
  isLoading?: boolean;
}

export function FormActions({
  onSubmit,
  onCancel,
  isEditing = false,
  isLoading = false,
}: FormActionsProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="flex gap-3 pt-4">
      <button
        type="button"
        onClick={onCancel}
        disabled={isLoading}
        className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
          isDark
            ? "bg-slate-700/50 text-white hover:bg-slate-700"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading}
        className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 ${
          isDark
            ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
            : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{isEditing ? "Updating..." : "Adding..."}</span>
          </>
        ) : (
          <span>{isEditing ? "Update Technology" : "Add Technology"}</span>
        )}
      </button>
    </div>
  );
}
