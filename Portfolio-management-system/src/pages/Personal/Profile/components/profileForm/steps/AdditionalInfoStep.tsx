import React from "react";
import { motion } from "motion/react";
import { SocialInputs } from "./SocialInputs";
import { HobbiesInput } from "./HobbiesInput";
import { LanguagesInput } from "./LanguagesInput";

interface AdditionalInfoStepProps {
  form: any;
  isDark?: boolean;
}

export const AdditionalInfoStep: React.FC<AdditionalInfoStepProps> = ({
  form,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 280 }}
      className="space-y-6"
    >
      <SocialInputs form={form} />
      <HobbiesInput form={form} />
      <LanguagesInput form={form} />
    </motion.div>
  );
};

export default AdditionalInfoStep;
