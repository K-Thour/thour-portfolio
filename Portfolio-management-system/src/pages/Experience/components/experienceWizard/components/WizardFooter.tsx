import Button from "../../../../../components/ui/button/Button";
import utils from "../../../../../utils/index";
import { ChevronLeft, ChevronRight } from "lucide-react";

const { cn } = utils.tailwindUtils;

interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  isEditing: boolean;
  isDark: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const WizardFooter: React.FC<WizardFooterProps> = ({
  currentStep,
  totalSteps,
  isEditing,
  isDark,
  onBack,
  onNext,
  onSubmit,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-t",
        isDark ? "border-slate-700" : "border-slate-200",
      )}
    >
      <Button
        onClick={onBack}
        disabled={currentStep === 1}
        variant="outline"
        className={cn(
          isDark &&
            "border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white",
        )}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {currentStep < totalSteps ? (
        <Button
          onClick={onNext}
          className={cn(
            "bg-linear-to-r shadow-lg shadow-orange-500/25",
            isDark
              ? "from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
              : "bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:blue-600",
          )}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          className={cn(
            "bg-linear-to-r shadow-lg shadow-orange-500/25",
            isDark
              ? "from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
              : "bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:blue-600",
          )}
        >
          {isEditing ? "Save Changes" : "Add Experience"}
        </Button>
      )}
    </div>
  );
};

export default WizardFooter;
