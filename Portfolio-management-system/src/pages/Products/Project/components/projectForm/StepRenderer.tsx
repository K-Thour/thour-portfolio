import { BasicInfoStep } from "./steps/BasicInfoStep";
import { DescriptionStep } from "./steps/DescriptionStep";
import { TechFeaturesStep } from "./steps/TechFeaturesStep";
import { LinksStep } from "./steps/LinksStep";
import type { ProjectFormData } from "../types";

interface StepRendererProps {
  currentStep: number;
  formData: ProjectFormData;
  errors: Record<string, string>;
  onFormDataChange: (data: Partial<ProjectFormData>) => void;
  onAddArrayItem: (field: "technologies" | "features", value: string) => void;
  onRemoveArrayItem: (
    field: "technologies" | "features",
    index: number,
  ) => void;
}

export function StepRenderer({
  currentStep,
  formData,
  errors,
  onFormDataChange,
  onAddArrayItem,
  onRemoveArrayItem,
}: StepRendererProps) {
  switch (currentStep) {
    case 1:
      return (
        <BasicInfoStep
          formData={formData}
          errors={errors}
          onFormDataChange={onFormDataChange}
        />
      );
    case 2:
      return (
        <DescriptionStep
          formData={formData}
          errors={errors}
          onFormDataChange={onFormDataChange}
        />
      );
    case 3:
      return (
        <TechFeaturesStep
          formData={formData}
          errors={errors}
          onAddArrayItem={onAddArrayItem}
          onRemoveArrayItem={onRemoveArrayItem}
        />
      );
    case 4:
      return (
        <LinksStep
          formData={formData}
          errors={errors}
          onFormDataChange={onFormDataChange}
        />
      );
    default:
      return null;
  }
}
