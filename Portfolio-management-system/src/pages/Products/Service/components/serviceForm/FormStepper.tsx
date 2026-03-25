import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useAppSelector } from "../../../../../hooks/useRedux";
import type { RootState } from "../../../../../store/store";
import type { FormStepperProps } from "../types";

export function FormStepper({ steps, currentStep }: FormStepperProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep > step.id
                    ? isDark
                      ? "bg-gradient-to-br from-green-600 to-green-500"
                      : "bg-gradient-to-br from-green-600 to-green-500"
                    : currentStep === step.id
                      ? isDark
                        ? "bg-gradient-to-br from-red-600 to-yellow-500"
                        : "bg-gradient-to-br from-blue-600 to-blue-500"
                      : isDark
                        ? "bg-slate-700 border-2 border-slate-600"
                        : "bg-gray-200 border-2 border-gray-300"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <span
                    className={
                      currentStep >= step.id
                        ? "text-white"
                        : isDark
                          ? "text-gray-400"
                          : "text-gray-600"
                    }
                  >
                    {step.id}
                  </span>
                )}
              </motion.div>

              {/* Step Label */}
              <div className="mt-2 text-center">
                <p
                  className={`text-sm font-medium ${
                    currentStep >= step.id
                      ? isDark
                        ? "text-white"
                        : "text-gray-900"
                      : isDark
                        ? "text-gray-500"
                        : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
                <p
                  className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}
                >
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 mb-12 ${
                  currentStep > step.id
                    ? isDark
                      ? "bg-green-600"
                      : "bg-green-600"
                    : isDark
                      ? "bg-slate-700"
                      : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
