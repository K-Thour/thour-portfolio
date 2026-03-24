import React from "react";
import utils from "../../../../../utils/index";
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
  isDark,
  onStepClick,
}) => {
  return (
    <div
      className={cn(
        "px-6 py-6 border-b",
        isDark ? "border-slate-700" : "border-slate-200",
      )}
    >
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => onStepClick(step.id)}
                className="flex flex-col items-center gap-2 group"
                disabled={step.id > currentStep}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                    isActive
                      ? `bg-linear-to-r ${isDark ? "from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25" : "bg-blue-500 text-white shadow-lg shadow-blue-500/30"} `
                      : isCompleted
                        ? isDark
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-green-100 text-green-600 border border-green-200"
                        : isDark
                          ? "bg-slate-700 text-slate-400 border border-slate-600"
                          : "bg-slate-100 text-slate-400 border border-slate-200",
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
                      "text-sm font-medium",
                      isActive
                        ? isDark
                          ? "text-white"
                          : "text-slate-900"
                        : isDark
                          ? "text-slate-400"
                          : "text-slate-500",
                    )}
                  >
                    {step.title}
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      isDark ? "text-slate-500" : "text-slate-400",
                    )}
                  >
                    {step.subtitle}
                  </p>
                </div>
              </button>

              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-colors",
                    step.id < currentStep
                      ? isDark
                        ? "bg-green-500/30"
                        : "bg-green-200"
                      : isDark
                        ? "bg-slate-700"
                        : "bg-slate-200",
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
