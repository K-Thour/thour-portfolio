import { motion } from "motion/react";
import type { AdditionalInfoStepProps } from "../types";
import { SocialInputs } from "./SocialInputs";
import { HobbiesInput } from "./HobbiesInput";
import { LanguagesInput } from "./LanguagesInput";

export function AdditionalInfoStep({
  formData,
  isDark,
  onSocialChange,
  onAddHobby,
  onRemoveHobby,
  onAddLanguage,
  onRemoveLanguage,
}: AdditionalInfoStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <SocialInputs
        formData={formData}
        isDark={isDark}
        onSocialChange={onSocialChange}
      />
      <HobbiesInput
        formData={formData}
        isDark={isDark}
        onAddHobby={onAddHobby}
        onRemoveHobby={onRemoveHobby}
      />
      <LanguagesInput
        formData={formData}
        isDark={isDark}
        onAddLanguage={onAddLanguage}
        onRemoveLanguage={onRemoveLanguage}
      />
    </motion.div>
  );
}
