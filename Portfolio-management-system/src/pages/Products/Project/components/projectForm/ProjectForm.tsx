import { useProjectForm } from "./hooks/useProjectForm";
import { useArrayHandlers } from "./hooks/useArrayHandlers";
import { FormStepper } from "./FormStepper";
import { StepRenderer } from "./StepRenderer";
import { FormNavigation } from "./FormNavigation";
import type { ProjectFormProps } from "../types";

export function ProjectForm({
  onSubmit,
  onCancel,
  initialData,
}: ProjectFormProps) {
  const {
    currentStep,
    errors,
    formData,
    steps,
    handleNext,
    handlePrevious,
    updateFormData,
  } = useProjectForm(initialData);

  const { addArrayItem, removeArrayItem } = useArrayHandlers(
    formData,
    updateFormData,
  );

  return (
    <div>
      <FormStepper steps={steps} currentStep={currentStep} />

      <StepRenderer
        currentStep={currentStep}
        formData={formData}
        errors={errors}
        onFormDataChange={updateFormData}
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
