interface FormNavigationProps {
  currentStep: number;
  isDark: boolean;
  isEditing: boolean;
  onCancel: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function FormNavigation({
  currentStep,
  isDark,
  isEditing,
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
        onClick={isFirstStep ? onCancel : onPrevious}
        className={`px-6 py-3 rounded-xl font-medium transition-all ${
          isDark
            ? "bg-slate-700/50 text-white hover:bg-slate-700"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        {isFirstStep ? "Cancel" : "Previous"}
      </button>
      <button
        type="button"
        onClick={onNext}
        className={`px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
          isDark
            ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
            : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
        }`}
      >
        {isLastStep ? (isEditing ? "Update Contact" : "Add Contact") : "Next"}
      </button>
    </div>
  );
}
