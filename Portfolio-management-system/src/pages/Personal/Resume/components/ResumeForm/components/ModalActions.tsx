interface Props {
  isDark: boolean;
  isSaveDisabled: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export function ModalActions({
  isDark,
  isSaveDisabled,
  onCancel,
  onSave,
}: Props) {
  return (
    <div className="flex gap-3 pt-2">
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
        onClick={onSave}
        disabled={isSaveDisabled}
        className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
          isDark
            ? "bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:text-gray-500 text-white"
            : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white"
        }`}
      >
        Save Design
      </button>
    </div>
  );
}
