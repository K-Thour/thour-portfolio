interface ModalActionsProps {
  isDark: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

export function ModalActions({
  isDark,
  isEditing,
  onCancel,
}: ModalActionsProps) {
  return (
    <div className="flex gap-3 pt-4">
      <button
        type="button"
        onClick={onCancel}
        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
          isDark
            ? "bg-slate-800 text-gray-300 hover:bg-slate-700"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Cancel
      </button>
      <button
        type="submit"
        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
          isDark
            ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
            : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
        }`}
      >
        {isEditing ? "Update" : "Create"}
      </button>
    </div>
  );
}
