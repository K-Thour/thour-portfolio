import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { StepCircleProps } from "../../../types";

export function StepCircle({ stepId, currentStep, onClick }: StepCircleProps) {
  const isCompleted = currentStep > stepId;
  const isActive = currentStep === stepId;

  return (
    <motion.button
      type="button"
      onClick={isCompleted ? onClick : undefined}
      disabled={!isCompleted && !isActive}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", damping: 26, stiffness: 320 }}
      className={`relative w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
        isCompleted
          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 cursor-pointer hover:bg-emerald-500/25 active:scale-95"
          : isActive
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
            : "bg-accent/60 text-muted-foreground border border-border/40 cursor-default"
      }`}
      aria-label={`Step ${stepId}`}
    >
      {isCompleted ? (
        <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <span>{stepId}</span>
      )}
    </motion.button>
  );
}
