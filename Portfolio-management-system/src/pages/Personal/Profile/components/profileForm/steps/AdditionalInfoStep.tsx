import React from "react";
import { motion } from "motion/react";
import { SocialInputs } from "./SocialInputs";
import { HobbiesInput } from "./HobbiesInput";
import { LanguagesInput } from "./LanguagesInput";

interface AdditionalInfoStepProps {
  form: any;
  isDark: boolean;
}

export const AdditionalInfoStep: React.FC<AdditionalInfoStepProps> = ({
  form,
  isDark,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <SocialInputs form={form} isDark={isDark} />
      <HobbiesInput form={form} isDark={isDark} />
      <LanguagesInput form={form} isDark={isDark} />
    </motion.div>
  );
};

export default AdditionalInfoStep;
