interface Props {
  isDark: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export function FormActions({ isDark, onCancel, onSubmit }: Props) {
  return (
    <div className="flex gap-3 pt-4 border-t border-inherit">
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
        type="button"
        onClick={onSubmit}
        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
          isDark
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Generate Resume
      </button>
    </div>
  );
}
