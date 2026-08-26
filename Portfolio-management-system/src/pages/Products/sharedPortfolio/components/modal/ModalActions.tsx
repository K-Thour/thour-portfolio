import { Loader2 } from "lucide-react";

interface ModalActionsProps {
  isDark: boolean;
  isEditing: boolean;
  isLoading?: boolean;
  onCancel: () => void;
}

export function ModalActions({
  isDark,
  isEditing,
  isLoading = false,
  onCancel,
}: ModalActionsProps) {
  return (
    <div className="flex gap-3 pt-4">
      <button
        type="button"
        disabled={isLoading}
        onClick={onCancel}
        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
          isDark
            ? "bg-slate-800 text-gray-300 hover:bg-slate-700 disabled:opacity-50"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        }`}
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
          isDark
            ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50 disabled:opacity-50"
            : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50"
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{isEditing ? "Updating..." : "Creating..."}</span>
          </>
        ) : isEditing ? (
          "Update"
        ) : (
          "Create"
        )}
      </button>
    </div>
  );
}
