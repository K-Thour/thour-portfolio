import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { FormStepperProps } from "../types";

export function FormStepper({ steps, currentStep }: FormStepperProps) {
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
                className={`relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-xs ${
                  currentStep > step.id
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : currentStep === step.id
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
                      : "bg-accent/60 text-muted-foreground border border-border/40"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <span>{step.id}</span>
                )}
              </motion.div>

              {/* Step Label */}
              <div className="mt-2 text-center">
                <p
                  className={`text-xs font-semibold ${
                    currentStep >= step.id
                      ? "text-foreground font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-[11px] text-muted-foreground/80 hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 mb-8 transition-colors ${
                  currentStep > step.id ? "bg-emerald-500/40" : "bg-border/60"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
