import { FormStepper } from "./FormStepper";
import { useAppSelector } from "../../../../../hooks/useRedux";
import type { RootState } from "../../../../../store/store";
import type { ContactFormProps } from "../../types";
import { useContactForm } from "./hooks/useContactForm";
import { FormStepBasic } from "./steps/FormStepBasic";
import { FormStepLocation } from "./steps/FormStepLocation";
import { FormStepAvailability } from "./steps/FormStepAvailability";
import { FormStepSocial } from "./steps/FormStepSocial";
import { FormNavigation } from "./FormNavigation";
import { steps } from "./steps/constraints/steps";

export function ContactForm({
  onSubmit,
  onCancel,
  initialData,
}: ContactFormProps) {
  const { theme } = useAppSelector((store: RootState) => store.theme);
  const isDark = theme === "dark";

  const { currentStep, formData, errors, updateField, goToNext, goToPrevious } =
    useContactForm(initialData);

  const handleNext = () => {
    if (currentStep === 4) {
      onSubmit(formData);
    } else {
      goToNext();
    }
  };

  return (
    <div>
      <FormStepper steps={steps} currentStep={currentStep} />

      {currentStep === 1 && (
        <FormStepBasic
          formData={formData}
          errors={errors}
          isDark={isDark}
          onUpdate={updateField}
        />
      )}

      {currentStep === 2 && (
        <FormStepLocation
          formData={formData}
          isDark={isDark}
          onUpdate={updateField}
        />
      )}

      {currentStep === 3 && (
        <FormStepAvailability
          formData={formData}
          isDark={isDark}
          onUpdate={updateField}
        />
      )}

      {currentStep === 4 && (
        <FormStepSocial
          formData={formData}
          isDark={isDark}
          onUpdate={updateField}
        />
      )}

      <FormNavigation
        currentStep={currentStep}
        isDark={isDark}
        isEditing={!!initialData}
        onCancel={onCancel}
        onPrevious={goToPrevious}
        onNext={handleNext}
      />
    </div>
  );
}
