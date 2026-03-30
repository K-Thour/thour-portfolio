import { FormStepper } from "./FormStepper";
import { StepRenderer } from "./StepRenderer";
import { FormNavigation } from "./FormNavigation";
import { useServiceForm } from "./hooks/useServiceForm";
import { useFileHandlers } from "./hooks/useFileHandlers";
import { useArrayHandlers } from "./hooks/useArrayHandlers";
import { STEPS, CATEGORIES, EMOJI_OPTIONS } from "./constants";
import type { ServiceFormProps, ServiceFormData } from "../types";

export function ServiceForm({
  onSubmit,
  onCancel,
  initialData,
}: ServiceFormProps) {
  const {
    currentStep,
    errors,
    formData,
    photoType,
    iconType,
    setFormData,
    setPhotoType,
    setIconType,
    handleNext,
    handlePrevious,
  } = useServiceForm(initialData);

  const { handlePhotoFileChange, handleIconFileChange } = useFileHandlers(
    (data: Partial<ServiceFormData>) =>
      setFormData((prev) => ({ ...prev, ...data })),
  );
  const { addArrayItem, removeArrayItem } = useArrayHandlers(
    formData,
    (data: Partial<ServiceFormData>) =>
      setFormData((prev) => ({ ...prev, ...data })),
  );

  return (
    <div>
      <FormStepper steps={STEPS} currentStep={currentStep} />

      <StepRenderer
        currentStep={currentStep}
        formData={formData}
        errors={errors}
        photoType={photoType}
        iconType={iconType}
        categories={CATEGORIES}
        emojiOptions={EMOJI_OPTIONS}
        onFormDataChange={(data) =>
          setFormData((prev) => ({ ...prev, ...data }))
        }
        onPhotoTypeChange={setPhotoType}
        onIconTypeChange={setIconType}
        onPhotoFileChange={handlePhotoFileChange}
        onIconFileChange={handleIconFileChange}
        onAddArrayItem={addArrayItem}
        onRemoveArrayItem={removeArrayItem}
      />

      <FormNavigation
        currentStep={currentStep}
        onPrevious={handlePrevious}
        onNext={() => handleNext(onSubmit)}
        onCancel={onCancel}
      />
    </div>
  );
}
