import { useAppSelector } from "../../../../../hooks/useRedux";

interface FormActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function FormActions({
  onSubmit,
  onCancel,
  isEditing = false,
}: FormActionsProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="flex gap-3 pt-4">
      <button
        type="button"
        onClick={onCancel}
        className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
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
        className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
          isDark
            ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
            : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
        }`}
      >
        {isEditing ? "Update Technology" : "Add Technology"}
      </button>
    </div>
  );
}
