import React from "react";
import Button from "../../ui/button/Button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  isDark: boolean;
  submitText: string;
  isLoading?: boolean;
  loadingText?: string;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const WizardFooter: React.FC<WizardFooterProps> = ({
  currentStep,
  totalSteps,
  submitText,
  isLoading = false,
  loadingText = "Saving...",
  onBack,
  onNext,
  onSubmit,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-border/40 shrink-0 bg-card/50">
      <Button
        onClick={onBack}
        disabled={currentStep === 1 || isLoading}
        variant="outline"
        className="rounded-xl border-border/60 hover:bg-accent/60 text-foreground active:scale-[0.97] transition-all cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 mr-1.5" />
        Back
      </Button>

      {currentStep < totalSteps ? (
        <Button
          onClick={onNext}
          disabled={isLoading}
          className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm active:scale-[0.97] transition-all cursor-pointer"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1.5" />
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm active:scale-[0.97] transition-all flex items-center justify-center gap-2 min-w-[120px] cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{loadingText}</span>
            </>
          ) : (
            submitText
          )}
        </Button>
      )}
    </div>
  );
};

export default WizardFooter;
