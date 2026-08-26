import { Loader2 } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  isDark: boolean;
  isEditing: boolean;
  isLoading?: boolean;
  onCancel: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function FormNavigation({
  currentStep,
  isDark,
  isEditing,
  isLoading = false,
  onCancel,
  onPrevious,
  onNext,
}: FormNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === 4;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-inherit">
      <button
        type="button"
        disabled={isLoading}
        onClick={isFirstStep ? onCancel : onPrevious}
        className={`px-6 py-3 rounded-xl font-medium transition-all ${
          isDark
            ? "bg-slate-700/50 text-white hover:bg-slate-700 disabled:opacity-50"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50"
        }`}
      >
        {isFirstStep ? "Cancel" : "Previous"}
      </button>
      <button
        type="button"
        disabled={isLoading}
        onClick={onNext}
        className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 ${
          isDark
            ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
            : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{isEditing ? "Updating..." : "Adding..."}</span>
          </>
        ) : isLastStep ? (
          isEditing ? (
            "Update Contact"
          ) : (
            "Add Contact"
          )
        ) : (
          "Next"
        )}
      </button>
    </div>
  );
}
