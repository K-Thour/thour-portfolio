import { FormStepper } from "./FormStepper";
import type { RootState } from "../../../../../store/store";
import { useAppSelector } from "../../../../../hooks/useRedux";
import { FORM_STEPS, type ProfileFormProps } from "./types";
import { FormSteps } from "./FormSteps";
import { FormNavigation } from "./FormNavigation";
import { useProfileForm } from "./hooks/useProfileForm";

export function ProfileForm({
  onSubmit,
  onCancel,
  initialData,
}: ProfileFormProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  const {
    currentStep,
    errors,
    imageType,
    formData,
    setImageType,
    setField,
    setImageField,
    clearError,
    validateStep,
    handleImageFileChange,
    addHobby,
    removeHobby,
    addLanguage,
    removeLanguage,
    goToNext,
    goToPrevious,
    getSubmitData,
  } = useProfileForm(initialData);

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        goToNext();
      } else {
        onSubmit(getSubmitData());
      }
    }
  };

  const handlePrevious = () => {
    goToPrevious();
  };

  return (
    <div>
      <FormStepper steps={FORM_STEPS} currentStep={currentStep} />
      <FormSteps
        currentStep={currentStep}
        formData={formData}
        imageType={imageType}
        errors={errors}
        isDark={isDark}
        setField={setField}
        setImageField={setImageField}
        setImageType={setImageType}
        clearError={clearError}
        handleImageFileChange={handleImageFileChange}
        addHobby={addHobby}
        removeHobby={removeHobby}
        addLanguage={addLanguage}
        removeLanguage={removeLanguage}
      />
      <FormNavigation
        currentStep={currentStep}
        onCancel={onCancel}
        onPrevious={handlePrevious}
        onNext={handleNext}
        initialData={initialData}
        isDark={isDark}
      />
    </div>
  );
}
