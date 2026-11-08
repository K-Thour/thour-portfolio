import React from "react";
import utils from "../../../utils/index";
import type { LucideIcon } from "lucide-react";

const { cn } = utils.tailwindUtils;

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

interface WizardStepperProps {
  steps: Step[];
  currentStep: number;
  isDark: boolean;
  onStepClick: (stepId: number) => void;
}

export const WizardStepper: React.FC<WizardStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="px-6 py-5 border-b border-border/40 shrink-0 bg-card/30">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <button
                type="button"
                onClick={() => onStepClick(step.id)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl p-1"
                disabled={step.id > currentStep}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
                      : isCompleted
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                        : "bg-accent/60 text-muted-foreground border border-border/40",
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div className="text-center">
                  <p
                    className={cn(
                      "text-xs font-semibold",
                      isActive
                        ? "text-foreground font-bold"
                        : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground/80 hidden sm:block">
                    {step.subtitle}
                  </p>
                </div>
              </button>

              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-3 transition-colors",
                    step.id < currentStep ? "bg-emerald-500/40" : "bg-border/60",
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WizardStepper;
