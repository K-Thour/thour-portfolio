import { FormStepper } from "./FormStepper";
import { BasicInfoStep } from "./steps/BasicInfoStep";
import { DetailsStep } from "./steps/DetailsStep";
import { AchievementsStep } from "./steps/AchievementsStep";
import { useEducationForm } from "../hooks/useEducationForm";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { EducationFormProps } from "../types";
import { steps } from "../constraints/constraints";
import { navBtn } from "../utils/utils";

export function EducationForm({
  onSubmit,
  onCancel,
  initialData,
}: EducationFormProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";
  const {
    currentStep,
    setCurrentStep,
    formData,
    errors,
    validateStep,
    updateField,
    addAchievement,
    removeAchievement,
  } = useEducationForm(initialData);

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        onSubmit(formData);
      }
    }
  };

  const handlePrevious = () =>
    currentStep > 1 && setCurrentStep(currentStep - 1);

  return (
    <div>
      <FormStepper steps={steps} currentStep={currentStep} />
      {currentStep === 1 && (
        <BasicInfoStep
          formData={formData}
          errors={errors}
          isDark={isDark}
          onUpdate={updateField}
        />
      )}
      {currentStep === 2 && (
        <DetailsStep
          formData={formData}
          errors={errors}
          isDark={isDark}
          onUpdate={updateField}
        />
      )}
      {currentStep === 3 && (
        <AchievementsStep
          achievements={formData.achievements}
          isDark={isDark}
          onAdd={addAchievement}
          onRemove={removeAchievement}
        />
      )}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-inherit">
        <button
          type="button"
          onClick={currentStep === 1 ? onCancel : handlePrevious}
          className={navBtn(isDark, "secondary")}
        >
          {currentStep === 1 ? "Cancel" : "Previous"}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className={navBtn(isDark, "primary")}
        >
          {currentStep === 3 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
