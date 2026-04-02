import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { StepCircleProps } from "../../../types";

export function StepCircle({ stepId, currentStep, isDark }: StepCircleProps) {
  const isCompleted = currentStep > stepId;
  const isActive = currentStep === stepId;

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
        isCompleted
          ? "bg-linear-to-br from-green-600 to-green-500"
          : isActive
            ? isDark
              ? "bg-linear-to-br from-red-600 to-yellow-500"
              : "bg-linear-to-br from-blue-600 to-blue-500"
            : isDark
              ? "bg-slate-700 border-2 border-slate-600"
              : "bg-gray-200 border-2 border-gray-300"
      }`}
    >
      {isCompleted ? (
        <Check className="w-6 h-6 text-white" />
      ) : (
        <span
          className={
            isActive ? "text-white" : isDark ? "text-gray-400" : "text-gray-600"
          }
        >
          {stepId}
        </span>
      )}
    </motion.div>
  );
}
