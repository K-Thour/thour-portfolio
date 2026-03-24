import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BasicInfoStep,
  DescriptionStep,
  TechFeaturesStep,
  LinksStep,
} from "../steps";

interface WizardContentProps {
  currentStep: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isDark: boolean;
}

export const WizardContent: React.FC<WizardContentProps> = ({
  currentStep,
  form,
  isDark,
}) => {
  return (
    <div className="px-6 py-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep === 1 && <BasicInfoStep form={form} isDark={isDark} />}
          {currentStep === 2 && <DescriptionStep form={form} isDark={isDark} />}
          {currentStep === 3 && (
            <TechFeaturesStep form={form} isDark={isDark} />
          )}
          {currentStep === 4 && <LinksStep form={form} isDark={isDark} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WizardContent;
