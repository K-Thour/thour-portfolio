import { useAppSelector } from "../../../../../hooks/useRedux";
import type { RootState } from "../../../../../store/store";
import type { FormNavigationProps } from "../types";

export function FormNavigation({
  currentStep,
  onPrevious,
  onNext,
  onCancel,
}: FormNavigationProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-inherit">
      <button
        type="button"
        onClick={currentStep === 1 ? onCancel : onPrevious}
        className={`px-6 py-3 rounded-xl font-medium transition-all ${
          isDark
            ? "bg-slate-700/50 text-white hover:bg-slate-700"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        {currentStep === 1 ? "Cancel" : "Previous"}
      </button>
      <button
        type="button"
        onClick={onNext}
        className={`px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
          isDark
            ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
            : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
        }`}
      >
        {currentStep === 4 ? "Submit" : "Next"}
      </button>
    </div>
  );
}
